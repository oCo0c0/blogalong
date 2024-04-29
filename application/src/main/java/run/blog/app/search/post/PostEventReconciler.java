package run.blog.app.search.post;

import static run.blog.app.core.extension.content.Post.VisibleEnum.PUBLIC;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.SmartLifecycle;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import reactor.core.Exceptions;
import run.blog.app.event.post.PostEvent;
import run.blog.app.event.post.PostPublishedEvent;
import run.blog.app.event.post.PostUnpublishedEvent;
import run.blog.app.event.post.PostUpdatedEvent;
import run.blog.app.event.post.PostVisibleChangedEvent;
import run.blog.app.extension.controller.Controller;
import run.blog.app.extension.controller.ControllerBuilder;
import run.blog.app.extension.controller.DefaultController;
import run.blog.app.extension.controller.DefaultQueue;
import run.blog.app.extension.controller.Reconciler;
import run.blog.app.extension.controller.RequestQueue;
import run.blog.app.plugin.extensionpoint.ExtensionGetter;
import run.blog.app.search.PostDocUtils;
import run.blog.app.theme.finders.PostFinder;

@Slf4j
@Component
public class PostEventReconciler implements Reconciler<PostEvent>, SmartLifecycle {

    private final ExtensionGetter extensionGetter;

    private final PostFinder postFinder;

    private final RequestQueue<PostEvent> postEventQueue;


    private final Controller postEventController;

    private boolean running = false;

    public PostEventReconciler(ExtensionGetter extensionGetter,
        PostFinder postFinder) {
        this.extensionGetter = extensionGetter;
        this.postFinder = postFinder;

        postEventQueue = new DefaultQueue<>(Instant::now);
        postEventController = this.setupWith(null);
    }

    @Override
    public Result reconcile(PostEvent postEvent) {
        if (postEvent instanceof PostPublishedEvent || postEvent instanceof PostUpdatedEvent) {
            addPostDoc(postEvent.getName());
        }
        if (postEvent instanceof PostUnpublishedEvent) {
            deletePostDoc(postEvent.getName());
        }
        if (postEvent instanceof PostVisibleChangedEvent visibleChangedEvent) {
            if (PUBLIC.equals(visibleChangedEvent.getOldVisible())) {
                deletePostDoc(postEvent.getName());
            } else if (PUBLIC.equals(visibleChangedEvent.getNewVisible())) {
                addPostDoc(postEvent.getName());
            }
        }
        return Result.doNotRetry();
    }

    @Override
    public Controller setupWith(ControllerBuilder builder) {
        return new DefaultController<>(
            this.getClass().getName(),
            this,
            postEventQueue,
            null,
            Duration.ofMillis(100),
            Duration.ofSeconds(1000)
        );
    }

    @EventListener(PostEvent.class)
    public void handlePostEvent(PostEvent event) {
        postEventQueue.addImmediately(event);
    }

    void addPostDoc(String postName) {
        postFinder.getByName(postName)
            .map(PostDocUtils::from)
            .flatMap(postDoc -> extensionGetter.getEnabledExtension(PostSearchService.class)
                .doOnNext(searchService -> {
                    try {
                        searchService.addDocuments(List.of(postDoc));
                    } catch (Exception e) {
                        throw Exceptions.propagate(e);
                    }
                })
            )
            .then()
            .block();
    }

    void deletePostDoc(String postName) {
        extensionGetter.getEnabledExtension(PostSearchService.class)
            .doOnNext(searchService -> {
                try {
                    searchService.removeDocuments(Set.of(postName));
                } catch (Exception e) {
                    throw Exceptions.propagate(e);
                }
            })
            .then()
            .block();
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
}
