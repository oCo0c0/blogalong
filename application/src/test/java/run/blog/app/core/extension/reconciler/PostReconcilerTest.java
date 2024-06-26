package run.blog.app.core.extension.reconciler;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.assertArg;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
import reactor.core.publisher.Mono;
import run.blog.app.content.ContentWrapper;
import run.blog.app.content.NotificationReasonConst;
import run.blog.app.content.PostService;
import run.blog.app.content.TestPost;
import run.blog.app.content.permalinks.PostPermalinkPolicy;
import run.blog.app.core.extension.content.Post;
import run.blog.app.core.extension.content.Snapshot;
import run.blog.app.core.extension.notification.Subscription;
import run.blog.app.event.post.PostPublishedEvent;
import run.blog.app.extension.ExtensionClient;
import run.blog.app.extension.controller.Reconciler;
import run.blog.app.notification.NotificationCenter;

/**
 * Tests for {@link PostReconciler}.
 *
 * @author guqing
 * @since 2.0.0
 */
@ExtendWith(MockitoExtension.class)
class PostReconcilerTest {

    @Mock
    private ExtensionClient client;

    @Mock
    private PostPermalinkPolicy postPermalinkPolicy;

    @Mock
    private PostService postService;

    @Mock
    private ApplicationEventPublisher eventPublisher;

    @Mock
    private NotificationCenter notificationCenter;

    @InjectMocks
    private PostReconciler postReconciler;

    @BeforeEach
    void setUp() {
        lenient().when(notificationCenter.subscribe(any(), any())).thenReturn(Mono.empty());
    }

    @Test
    void reconcile() {
        String name = "post-A";
        Post post = TestPost.postV1();
        post.getSpec().setPublish(false);
        post.getSpec().setHeadSnapshot("post-A-head-snapshot");
        when(client.fetch(eq(Post.class), eq(name)))
            .thenReturn(Optional.of(post));
        when(postService.getContent(eq(post.getSpec().getReleaseSnapshot()),
            eq(post.getSpec().getBaseSnapshot())))
            .thenReturn(Mono.empty());

        Snapshot snapshotV1 = TestPost.snapshotV1();
        Snapshot snapshotV2 = TestPost.snapshotV2();
        snapshotV1.getSpec().setContributors(Set.of("guqing"));
        snapshotV2.getSpec().setContributors(Set.of("guqing", "zhangsan"));
        when(client.listAll(eq(Snapshot.class), any(), any()))
            .thenReturn(List.of(snapshotV1, snapshotV2));

        ArgumentCaptor<Post> captor = ArgumentCaptor.forClass(Post.class);
        postReconciler.reconcile(new Reconciler.Request(name));

        verify(client, times(1)).update(captor.capture());

        verify(postPermalinkPolicy, times(1)).permalink(any());

        Post value = captor.getValue();
        assertThat(value.getStatus().getExcerpt()).isNull();
        assertThat(value.getStatus().getContributors()).isEqualTo(List.of("guqing", "zhangsan"));
    }

    @Test
    void reconcileExcerpt() {
        // https://github.com/oCo0c0/blogalong/issues/2452
        String name = "post-A";
        Post post = TestPost.postV1();
        post.getSpec().setPublish(true);
        post.getSpec().setHeadSnapshot("post-A-head-snapshot");
        post.getSpec().setReleaseSnapshot("post-fake-released-snapshot");
        when(client.fetch(eq(Post.class), eq(name)))
            .thenReturn(Optional.of(post));
        when(postService.getContent(eq(post.getSpec().getReleaseSnapshot()),
            eq(post.getSpec().getBaseSnapshot())))
            .thenReturn(Mono.just(ContentWrapper.builder()
                .snapshotName(post.getSpec().getHeadSnapshot())
                .raw("hello world")
                .content("<p>hello world</p>")
                .rawType("markdown")
                .build()));

        Snapshot snapshotV2 = TestPost.snapshotV2();
        snapshotV2.getMetadata().setLabels(new HashMap<>());
        snapshotV2.getSpec().setContributors(Set.of("guqing", "zhangsan"));

        Snapshot snapshotV1 = TestPost.snapshotV1();
        snapshotV1.getSpec().setContributors(Set.of("guqing"));

        when(client.listAll(eq(Snapshot.class), any(), any()))
            .thenReturn(List.of(snapshotV1, snapshotV2));

        ArgumentCaptor<Post> captor = ArgumentCaptor.forClass(Post.class);
        postReconciler.reconcile(new Reconciler.Request(name));

        verify(client, times(1)).update(captor.capture());
        Post value = captor.getValue();
        assertThat(value.getStatus().getExcerpt()).isEqualTo("hello world");
    }

    @Nested
    class LastModifyTimeTest {
        @Test
        void reconcileLastModifyTimeWhenPostIsPublished() {
            String name = "post-A";
            Post post = TestPost.postV1();
            post.getSpec().setPublish(true);
            post.getSpec().setHeadSnapshot("post-A-head-snapshot");
            post.getSpec().setReleaseSnapshot("post-fake-released-snapshot");
            when(client.fetch(eq(Post.class), eq(name)))
                .thenReturn(Optional.of(post));
            when(postService.getContent(eq(post.getSpec().getReleaseSnapshot()),
                    eq(post.getSpec().getBaseSnapshot())))
                .thenReturn(Mono.just(ContentWrapper.builder()
                    .snapshotName(post.getSpec().getHeadSnapshot())
                    .raw("hello world")
                    .content("<p>hello world</p>")
                    .rawType("markdown")
                    .build()));
            Instant lastModifyTime = Instant.now();
            Snapshot snapshotV2 = TestPost.snapshotV2();
            snapshotV2.getSpec().setLastModifyTime(lastModifyTime);
            when(client.fetch(eq(Snapshot.class), eq(post.getSpec().getReleaseSnapshot())))
                .thenReturn(Optional.of(snapshotV2));

            when(client.listAll(eq(Snapshot.class), any(), any()))
                .thenReturn(List.of());

            ArgumentCaptor<Post> captor = ArgumentCaptor.forClass(Post.class);
            postReconciler.reconcile(new Reconciler.Request(name));

            verify(client, times(1)).update(captor.capture());
            Post value = captor.getValue();
            assertThat(value.getStatus().getLastModifyTime()).isEqualTo(lastModifyTime);
            verify(eventPublisher).publishEvent(any(PostPublishedEvent.class));
        }

        @Test
        void reconcileLastModifyTimeWhenPostIsNotPublished() {
            String name = "post-A";
            Post post = TestPost.postV1();
            post.getSpec().setPublish(false);
            post.getSpec().setHeadSnapshot("post-A-head-snapshot");
            when(client.fetch(eq(Post.class), eq(name)))
                .thenReturn(Optional.of(post));
            when(postService.getContent(eq(post.getSpec().getReleaseSnapshot()),
                eq(post.getSpec().getBaseSnapshot())))
                .thenReturn(Mono.just(ContentWrapper.builder()
                    .snapshotName(post.getSpec().getHeadSnapshot())
                    .raw("hello world")
                    .content("<p>hello world</p>")
                    .rawType("markdown")
                    .build()));

            when(client.listAll(eq(Snapshot.class), any(), any()))
                .thenReturn(List.of());

            ArgumentCaptor<Post> captor = ArgumentCaptor.forClass(Post.class);
            postReconciler.reconcile(new Reconciler.Request(name));

            verify(client, times(1)).update(captor.capture());
            Post value = captor.getValue();
            assertThat(value.getStatus().getLastModifyTime()).isNull();
        }
    }

    @Test
    void subscribeNewCommentNotificationTest() {
        Post post = TestPost.postV1();

        postReconciler.subscribeNewCommentNotification(post);

        verify(notificationCenter).subscribe(
            assertArg(subscriber -> assertThat(subscriber.getName())
                .isEqualTo(post.getSpec().getOwner())),
            assertArg(argReason -> {
                var interestReason = new Subscription.InterestReason();
                interestReason.setReasonType(NotificationReasonConst.NEW_COMMENT_ON_POST);
                interestReason.setSubject(Subscription.ReasonSubject.builder()
                    .apiVersion(post.getApiVersion())
                    .kind(post.getKind())
                    .name(post.getMetadata().getName())
                    .build());
                assertThat(argReason).isEqualTo(interestReason);
            }));
    }
}