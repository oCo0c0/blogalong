package run.blog.app.notification;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;
import run.blog.app.core.extension.User;
import run.blog.app.core.extension.notification.Subscription;
import run.blog.app.extension.Metadata;
import run.blog.app.extension.ReactiveExtensionClient;
import run.blog.app.infra.AnonymousUserConst;

/**
 * Tests for {@link DefaultSubscriberEmailResolver}.
 *
 * @author guqing
 * @since 2.9.0
 */
@ExtendWith(MockitoExtension.class)
class DefaultSubscriberEmailResolverTest {

    @Mock
    private ReactiveExtensionClient client;

    @InjectMocks
    DefaultSubscriberEmailResolver subscriberEmailResolver;

    @Test
    void testResolve() {
        var subscriber = new Subscription.Subscriber();
        subscriber.setName(AnonymousUserConst.PRINCIPAL + "#test@example.com");
        subscriberEmailResolver.resolve(subscriber)
            .as(StepVerifier::create)
            .expectNext("test@example.com")
            .verifyComplete();

        subscriber.setName(AnonymousUserConst.PRINCIPAL + "#");
        subscriberEmailResolver.resolve(subscriber)
            .as(StepVerifier::create)
            .verifyErrorMessage("The subscriber does not have an email");

        var user = new User();
        user.setMetadata(new Metadata());
        user.getMetadata().setName("fake-user");
        user.setSpec(new User.UserSpec());
        user.getSpec().setEmail("test@blog.run");
        when(client.fetch(eq(User.class), eq("fake-user"))).thenReturn(Mono.just(user));

        subscriber.setName("fake-user");
        subscriberEmailResolver.resolve(subscriber)
            .as(StepVerifier::create)
            .expectNext("test@blog.run")
            .verifyComplete();
    }
}
