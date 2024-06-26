package run.blog.app.extension.router;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.same;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.http.server.reactive.MockServerHttpRequest;
import org.springframework.mock.web.reactive.function.server.MockServerRequest;
import org.springframework.mock.web.server.MockServerWebExchange;
import org.springframework.web.reactive.function.server.EntityResponse;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;
import run.blog.app.extension.FakeExtension;
import run.blog.app.extension.ListOptions;
import run.blog.app.extension.ListResult;
import run.blog.app.extension.ReactiveExtensionClient;
import run.blog.app.extension.Scheme;

@ExtendWith(MockitoExtension.class)
class ExtensionListHandlerTest {

    @Mock
    ReactiveExtensionClient client;

    @Test
    void shouldBuildPathPatternCorrectly() {
        var scheme = Scheme.buildFromType(FakeExtension.class);
        var listHandler = new ExtensionListHandler(scheme, client);
        var pathPattern = listHandler.pathPattern();
        assertEquals("/apis/fake.blog.run/v1alpha1/fakes", pathPattern);
    }

    @Test
    void shouldHandleCorrectly() {
        var scheme = Scheme.buildFromType(FakeExtension.class);
        var listHandler = new ExtensionListHandler(scheme, client);
        var exchange = MockServerWebExchange.from(MockServerHttpRequest.get("/fake")
            .queryParam("sort", "metadata.name,desc"));
        var serverRequest = MockServerRequest.builder().exchange(exchange).build();
        final var fake01 = FakeExtension.createFake("fake01");
        final var fake02 = FakeExtension.createFake("fake02");
        var fakeListResult = new ListResult<>(0, 0, 2, List.of(fake01, fake02));
        when(client.listBy(same(FakeExtension.class), any(ListOptions.class), any()))
            .thenReturn(Mono.just(fakeListResult));

        var responseMono = listHandler.handle(serverRequest);

        StepVerifier.create(responseMono)
            .consumeNextWith(response -> {
                assertEquals(HttpStatus.OK, response.statusCode());
                assertEquals(MediaType.APPLICATION_JSON, response.headers().getContentType());
                assertTrue(response instanceof EntityResponse<?>);
                assertEquals(fakeListResult, ((EntityResponse<?>) response).entity());
            })
            .verifyComplete();
        verify(client).listBy(same(FakeExtension.class), any(ListOptions.class), any());
    }

}
