package run.blog.app.theme.router;

import static run.blog.app.extension.index.query.QueryFactory.and;
import static run.blog.app.extension.index.query.QueryFactory.equal;
import static run.blog.app.extension.index.query.QueryFactory.isNull;
import static run.blog.app.extension.index.query.QueryFactory.or;

import java.security.Principal;
import java.util.Objects;
import java.util.function.Predicate;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import run.blog.app.core.extension.content.Post;
import run.blog.app.extension.ExtensionUtil;
import run.blog.app.extension.ListOptions;
import run.blog.app.extension.router.selector.FieldSelector;
import run.blog.app.extension.router.selector.LabelSelector;
import run.blog.app.infra.AnonymousUserConst;

/**
 * The default implementation of {@link ReactiveQueryPostPredicateResolver}.
 *
 * @author guqing
 * @since 2.9.0
 */
@Component
public class DefaultQueryPostPredicateResolver implements ReactiveQueryPostPredicateResolver {

    @Override
    public Mono<Predicate<Post>> getPredicate() {
        Predicate<Post> predicate = post -> post.isPublished()
            && !ExtensionUtil.isDeleted(post)
            && Objects.equals(false, post.getSpec().getDeleted());
        Predicate<Post> visiblePredicate =
            post -> Post.VisibleEnum.PUBLIC.equals(post.getSpec().getVisible());
        return currentUserName()
            .map(username -> predicate.and(
                visiblePredicate.or(post -> username.equals(post.getSpec().getOwner())))
            )
            .defaultIfEmpty(predicate.and(visiblePredicate));
    }

    @Override
    public Mono<ListOptions> getListOptions() {
        var listOptions = new ListOptions();
        listOptions.setLabelSelector(LabelSelector.builder()
            .eq(Post.PUBLISHED_LABEL, "true").build());

        var fieldQuery = and(
            isNull("metadata.deletionTimestamp"),
            equal("spec.deleted", "false")
        );
        var visibleQuery = equal("spec.visible", Post.VisibleEnum.PUBLIC.name());
        return currentUserName()
            .map(username -> and(fieldQuery,
                or(visibleQuery, equal("spec.owner", username)))
            )
            .defaultIfEmpty(and(fieldQuery, visibleQuery))
            .map(query -> {
                listOptions.setFieldSelector(FieldSelector.of(query));
                return listOptions;
            });
    }

    Mono<String> currentUserName() {
        return ReactiveSecurityContextHolder.getContext()
            .map(SecurityContext::getAuthentication)
            .map(Principal::getName)
            .filter(name -> !AnonymousUserConst.isAnonymousUser(name));
    }
}
