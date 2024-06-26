package run.blog.app.content;

import static org.apache.commons.lang3.ObjectUtils.defaultIfNull;
import static run.blog.app.extension.index.query.QueryFactory.and;
import static run.blog.app.extension.index.query.QueryFactory.equal;
import static run.blog.app.extension.index.query.QueryFactory.isNull;

import com.google.common.collect.Sets;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.SmartLifecycle;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import run.blog.app.core.extension.content.Post;
import run.blog.app.core.extension.content.Tag;
import run.blog.app.core.extension.content.Tag.TagStatus;
import run.blog.app.event.post.PostDeletedEvent;
import run.blog.app.event.post.PostEvent;
import run.blog.app.event.post.PostUpdatedEvent;
import run.blog.app.extension.ExtensionClient;
import run.blog.app.extension.ListOptions;
import run.blog.app.extension.MetadataUtil;
import run.blog.app.extension.PageRequestImpl;
import run.blog.app.extension.controller.Controller;
import run.blog.app.extension.controller.ControllerBuilder;
import run.blog.app.extension.controller.DefaultController;
import run.blog.app.extension.controller.DefaultQueue;
import run.blog.app.extension.controller.Reconciler;
import run.blog.app.extension.controller.RequestQueue;
import run.blog.app.extension.router.selector.FieldSelector;
import run.blog.app.extension.router.selector.LabelSelector;
import run.blog.app.infra.utils.JsonUtils;

/**
 * Update {@link TagStatus#postCount} when post related to tag is updated.
 *
 * @author guqing
 * @since 2.13.0
 */
@Component
public class TagPostCountUpdater
    implements Reconciler<TagPostCountUpdater.PostRelatedTags>, SmartLifecycle {

    private final RequestQueue<PostRelatedTags> tagQueue;

    private final Controller postEventController;

    private final ExtensionClient client;

    private volatile boolean running = false;

    /**
     * Construct a {@link TagPostCountUpdater} with the given {@link ExtensionClient}.
     */
    public TagPostCountUpdater(ExtensionClient client) {
        this.client = client;

        this.tagQueue = new DefaultQueue<>(Instant::now);
        this.postEventController = this.setupWith(null);
    }

    @Override
    public Result reconcile(PostRelatedTags postRelatedTags) {
        for (var tag : postRelatedTags.tags()) {
            updateTagRelatedPostCount(tag);
        }

        // Update last associated tags when handled
        client.fetch(Post.class, postRelatedTags.postName()).ifPresent(post -> {
            var tags = defaultIfNull(post.getSpec().getTags(), List.<String>of());
            var annotations = MetadataUtil.nullSafeAnnotations(post);
            var tagAnno = JsonUtils.objectToJson(tags);
            var oldTagAnno = annotations.get(Post.LAST_ASSOCIATED_TAGS_ANNO);

            if (!tagAnno.equals(oldTagAnno)) {
                annotations.put(Post.LAST_ASSOCIATED_TAGS_ANNO, tagAnno);
                client.update(post);
            }
        });
        return Result.doNotRetry();
    }


    @Override
    public Controller setupWith(ControllerBuilder builder) {
        return new DefaultController<>(
            this.getClass().getName(),
            this,
            tagQueue,
            null,
            Duration.ofMillis(100),
            Duration.ofMinutes(10)
        );
    }

    @Override
    public void start() {
        postEventController.start();
        running = true;
    }

    @Override
    public void stop() {
        running = false;
        postEventController.dispose();
    }

    @Override
    public boolean isRunning() {
        return running;
    }

    /**
     * Listen to post event to calculate post related to tag for updating.
     */
    @EventListener(PostEvent.class)
    public void onPostUpdated(PostEvent postEvent) {
        var postName = postEvent.getName();
        if (postEvent instanceof PostUpdatedEvent) {
            var tagsToUpdate = calcTagsToUpdate(postEvent.getName());
            tagQueue.addImmediately(new PostRelatedTags(postName, tagsToUpdate));
            return;
        }

        if (postEvent instanceof PostDeletedEvent deletedEvent) {
            var tags = defaultIfNull(deletedEvent.getPost().getSpec().getTags(),
                List.<String>of());
            tagQueue.addImmediately(new PostRelatedTags(postName, Sets.newHashSet(tags)));
        }
    }

    private Set<String> calcTagsToUpdate(String postName) {
        var post = client.fetch(Post.class, postName).orElseThrow();
        var annotations = MetadataUtil.nullSafeAnnotations(post);
        var oldTags = Optional.ofNullable(annotations.get(Post.LAST_ASSOCIATED_TAGS_ANNO))
            .filter(StringUtils::isNotBlank)
            .map(tagsJson -> JsonUtils.jsonToObject(tagsJson, String[].class))
            .orElse(new String[0]);

        var tagsToUpdate = Sets.newHashSet(oldTags);
        var newTags = post.getSpec().getTags();
        if (newTags != null) {
            tagsToUpdate.addAll(newTags);
        }
        return tagsToUpdate;
    }

    public record PostRelatedTags(String postName, Set<String> tags) {
    }

    private void updateTagRelatedPostCount(String tagName) {
        client.fetch(Tag.class, tagName).ifPresent(tag -> {
            var commonFieldQuery = and(
                equal("spec.tags", tag.getMetadata().getName()),
                isNull("metadata.deletionTimestamp")
            );
            // Update post count
            var allPostOptions = new ListOptions();
            allPostOptions.setFieldSelector(FieldSelector.of(commonFieldQuery));
            var result = client.listBy(Post.class, allPostOptions, PageRequestImpl.ofSize(1));
            tag.getStatusOrDefault().setPostCount((int) result.getTotal());

            // Update visible post count
            var publicPostOptions = new ListOptions();
            publicPostOptions.setLabelSelector(LabelSelector.builder()
                .eq(Post.PUBLISHED_LABEL, "true")
                .build());
            publicPostOptions.setFieldSelector(FieldSelector.of(
                and(
                    commonFieldQuery,
                    equal("spec.deleted", "false"),
                    equal("spec.visible", Post.VisibleEnum.PUBLIC.name())
                )
            ));
            var publicPosts =
                client.listBy(Post.class, publicPostOptions, PageRequestImpl.ofSize(1));
            tag.getStatusOrDefault().setVisiblePostCount((int) publicPosts.getTotal());

            client.update(tag);
        });
    }
}
