package run.blog.app.notification.endpoint;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import run.blog.app.core.extension.notification.NotifierDescriptor;
import run.blog.app.core.extension.notification.ReasonType;
import run.blog.app.extension.ReactiveExtensionClient;
import run.blog.app.notification.UserNotificationPreferenceService;

/**
 * Tests for {@link UserNotificationPreferencesEndpoint}.
 *
 * @author guqing
 * @since 2.10.0
 */
@ExtendWith(MockitoExtension.class)
class UserNotificationPreferencesEndpointTest {

    @Mock
    private ReactiveExtensionClient client;

    @Mock
    private UserNotificationPreferenceService userNotificationPreferenceService;

    @InjectMocks
    private UserNotificationPreferencesEndpoint userNotificationPreferencesEndpoint;

    private WebTestClient webTestClient;

    @BeforeEach
    void setUp() {
        webTestClient = WebTestClient
            .bindToRouterFunction(userNotificationPreferencesEndpoint.endpoint())
            .build();
    }

    @Test
    void listNotificationPreferences() {
        when(client.list(eq(ReasonType.class), eq(null), any())).thenReturn(Flux.empty());
        when(client.list(eq(NotifierDescriptor.class), eq(null), any())).thenReturn(Flux.empty());
        when(userNotificationPreferenceService.getByUser(any())).thenReturn(Mono.empty());
        webTestClient.post()
            .uri("/userspaces/{username}/notification-preferences", "guqing")
            .exchange()
            .expectStatus()
            .isOk();
    }

    @Test
    void saveNotificationPreferences() {
        when(client.list(eq(ReasonType.class), eq(null), any())).thenReturn(Flux.empty());
        when(client.list(eq(NotifierDescriptor.class), eq(null), any())).thenReturn(Flux.empty());
        when(userNotificationPreferenceService.getByUser(any())).thenReturn(Mono.empty());
        webTestClient.post()
            .uri("/userspaces/{username}/notification-preferences", "guqing")
            .exchange()
            .expectStatus()
            .isOk();
    }
}