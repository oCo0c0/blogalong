package run.blog.app.content.comment;

import static run.blog.app.extension.index.query.QueryFactory.and;
import static run.blog.app.extension.index.query.QueryFactory.equal;
import static run.blog.app.extension.index.query.QueryFactory.isNull;

import java.time.Instant;
import java.util.Set;
import java.util.function.Function;
import org.apache.commons.lang3.BooleanUtils;
import org.springframework.data.domain.Sort;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import run.blog.app.core.extension.User;
import run.blog.app.core.extension.content.Comment;
import run.blog.app.core.extension.service.RoleService;
import run.blog.app.core.extension.service.UserService;
import run.blog.app.extension.Extension;
import run.blog.app.extension.ListOptions;
import run.blog.app.extension.ListResult;
import run.blog.app.extension.PageRequest;
import run.blog.app.extension.PageRequestImpl;
import run.blog.app.extension.ReactiveExtensionClient;
import run.blog.app.extension.Ref;
import run.blog.app.extension.router.selector.FieldSelector;
import run.blog.app.infra.SystemConfigurableEnvironmentFetcher;
import run.blog.app.infra.exception.AccessDeniedException;
import run.blog.app.metrics.CounterService;
import run.blog.app.metrics.MeterUtils;
import run.blog.app.plugin.ExtensionComponentsFinder;
import run.blog.app.security.authorization.AuthorityUtils;

/**
 * Comment service implementation.
 *
 * @author guqing
 * @since 2.0.0
 */
@Component
public class CommentServiceImpl implements CommentService {

    private final ReactiveExtensionClient client;
    private final UserService userService;
    private final RoleService roleService;
    private final ExtensionComponentsFinder extensionComponentsFinder;

    private final SystemConfigurableEnvironmentFetcher environmentFetcher;
    private final CounterService counterService;

    public CommentServiceImpl(ReactiveExtensionClient client,
        UserService userService, ExtensionComponentsFinder extensionComponentsFinder,
        SystemConfigurableEnvironmentFetcher environmentFetcher,
        CounterService counterService, RoleService roleService
    ) {
        this.client = client;
        this.userService = userService;
        this.extensionComponentsFinder = extensionComponentsFinder;
        this.environmentFetcher = environmentFetcher;
        this.counterService = counterService;
        this.roleService = roleService;
    }

    @Override
    public Mono<ListResult<ListedComment>> listComment(CommentQuery commentQuery) {
        return this.client.listBy(Comment.class, commentQuery.toListOptions(),
                commentQuery.toPageRequest())
            .flatMap(comments -> Flux.fromStream(comments.get()
                    .map(this::toListedComment))
                .concatMap(Function.identity())
                .collectList()
                .map(list -> new ListResult<>(comments.getPage(), comments.getSize(),
                    comments.getTotal(), list)
                )
            );
    }

    @Override
    public Mono<Comment> create(Comment comment) {
        return environmentFetcher.fetchComment()
            .flatMap(commentSetting -> {
                if (Boolean.FALSE.equals(commentSetting.getEnable())) {
                    return Mono.error(
                        new AccessDeniedException("The comment function has been turned off.",
                            "problemDetail.comment.turnedOff", null));
                }
                if (checkCommentOwner(comment, commentSetting.getSystemUserOnly())) {
                    return Mono.error(
                        new AccessDeniedException("Allow only system users to comment.",
                            "problemDetail.comment.systemUsersOnly", null));
                }

                if (comment.getSpec().getTop() == null) {
                    comment.getSpec().setTop(false);
                }
                if (comment.getSpec().getPriority() == null) {
                    comment.getSpec().setPriority(0);
                }
                comment.getSpec()
                    .setApproved(Boolean.FALSE.equals(commentSetting.getRequireReviewForNew()));

                if (BooleanUtils.isTrue(comment.getSpec().getApproved())
                    && comment.getSpec().getApprovedTime() == null) {
                    comment.getSpec().setApprovedTime(Instant.now());
                }

                if (comment.getSpec().getCreationTime() == null) {
                    comment.getSpec().setCreationTime(Instant.now());
                }

                comment.getSpec().setHidden(false);

                // return if the comment owner is not null
                if (comment.getSpec().getOwner() != null) {
                    return Mono.just(comment);
                }
                // populate owner from current user
                return fetchCurrentUser()
                    .flatMap(currentUser -> ReactiveSecurityContextHolder.getContext()
                        .flatMap(securityContext -> {
                            var authentication = securityContext.getAuthentication();
                            var roles = AuthorityUtils.authoritiesToRoles(
                                authentication.getAuthorities());
                            return roleService.contains(roles,
                                    Set.of(AuthorityUtils.COMMENT_MANAGEMENT_ROLE_NAME))
                                .doOnNext(result -> {
                                    if (result) {
                                        comment.getSpec().setApproved(true);
                                        comment.getSpec().setApprovedTime(Instant.now());
                                    }
                                })
                                .thenReturn(toCommentOwner(currentUser));
                        }))
                    .map(owner -> {
                        comment.getSpec().setOwner(owner);
                        return comment;
                    })
                    .switchIfEmpty(
                        Mono.error(new IllegalStateException("The owner must not be null.")));
            })
            .flatMap(client::create);
    }

    @Override
    public Mono<Void> removeBySubject(@NonNull Ref subjectRef) {
        Assert.notNull(subjectRef, "The subjectRef must not be null.");
        // ascending order by creation time and name
        var pageRequest = PageRequestImpl.of(1, 200,
            Sort.by("metadata.creationTimestamp", "metadata.name"));
        return Flux.defer(() -> listCommentsByRef(subjectRef, pageRequest))
            .expand(page -> page.hasNext()
                ? listCommentsByRef(subjectRef, pageRequest)
                : Mono.empty()
            )
            .flatMap(page -> Flux.fromIterable(page.getItems()))
            .flatMap(client::delete)
            .then();
    }

    Mono<ListResult<Comment>> listCommentsByRef(Ref subjectRef, PageRequest pageRequest) {
        var listOptions = new ListOptions();
        listOptions.setFieldSelector(FieldSelector.of(
            and(equal("spec.subjectRef", Comment.toSubjectRefKey(subjectRef)),
                isNull("metadata.deletionTimestamp"))
        ));
        return client.listBy(Comment.class, listOptions, pageRequest);
    }

    private boolean checkCommentOwner(Comment comment, Boolean onlySystemUser) {
        Comment.CommentOwner owner = comment.getSpec().getOwner();
        if (Boolean.TRUE.equals(onlySystemUser)) {
            return owner != null && Comment.CommentOwner.KIND_EMAIL.equals(owner.getKind());
        }
        return false;
    }

    private Comment.CommentOwner toCommentOwner(User user) {
        Comment.CommentOwner owner = new Comment.CommentOwner();
        owner.setKind(User.KIND);
        owner.setName(user.getMetadata().getName());
        owner.setDisplayName(user.getSpec().getDisplayName());
        return owner;
    }

    private Mono<User> fetchCurrentUser() {
        return ReactiveSecurityContextHolder.getContext()
            .map(securityContext -> securityContext.getAuthentication().getName())
            .flatMap(username -> client.fetch(User.class, username));
    }

    private Mono<ListedComment> toListedComment(Comment comment) {
        var builder = ListedComment.builder().comment(comment);
        // not empty
        var ownerInfoMono = getCommentOwnerInfo(comment.getSpec().getOwner())
            .doOnNext(builder::owner);
        var subjectMono = getCommentSubject(comment.getSpec().getSubjectRef())
            .doOnNext(builder::subject);
        var statsMono = fetchStats(comment.getMetadata().getName())
            .doOnNext(builder::stats);
        return Mono.when(ownerInfoMono, subjectMono, statsMono)
            .then(Mono.fromSupplier(builder::build));
    }

    Mono<CommentStats> fetchStats(String commentName) {
        Assert.notNull(commentName, "The commentName must not be null.");
        return counterService.getByName(MeterUtils.nameOf(Comment.class, commentName))
            .map(counter -> CommentStats.builder()
                .upvote(counter.getUpvote())
                .build()
            )
            .defaultIfEmpty(CommentStats.empty());
    }

    private Mono<OwnerInfo> getCommentOwnerInfo(Comment.CommentOwner owner) {
        if (User.KIND.equals(owner.getKind())) {
            return userService.getUserOrGhost(owner.getName())
                .map(OwnerInfo::from);
        }
        if (Comment.CommentOwner.KIND_EMAIL.equals(owner.getKind())) {
            return Mono.just(OwnerInfo.from(owner));
        }
        throw new IllegalStateException(
            "Unsupported owner kind: " + owner.getKind());
    }

    @SuppressWarnings("unchecked")
    Mono<Extension> getCommentSubject(Ref ref) {
        return extensionComponentsFinder.getExtensions(CommentSubject.class)
            .stream()
            .filter(commentSubject -> commentSubject.supports(ref))
            .findFirst()
            .map(commentSubject -> commentSubject.get(ref.getName()))
            .orElseGet(Mono::empty);
    }
}
