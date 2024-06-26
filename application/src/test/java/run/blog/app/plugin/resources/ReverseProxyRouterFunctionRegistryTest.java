package run.blog.app.plugin.resources;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import run.blog.app.core.extension.ReverseProxy;
import run.blog.app.extension.Metadata;
import run.blog.app.plugin.PluginRouterFunctionRegistry;

/**
 * Tests for {@link ReverseProxyRouterFunctionRegistry}.
 *
 * @author guqing
 * @since 2.0.0
 */
@ExtendWith(MockitoExtension.class)
class ReverseProxyRouterFunctionRegistryTest {

    @InjectMocks
    ReverseProxyRouterFunctionRegistry registry;

    @Mock
    ReverseProxyRouterFunctionFactory reverseProxyRouterFunctionFactory;

    @Mock
    PluginRouterFunctionRegistry pluginRouterFunctionRegistry;

    @Test
    void register() {
        ReverseProxy mock = getMockReverseProxy();
        registry.register("fake-plugin", mock);

        assertThat(registry.reverseProxySize("fake-plugin")).isEqualTo(1);

        // repeat register a same reverse proxy
        registry.register("fake-plugin", mock);

        assertThat(registry.reverseProxySize("fake-plugin")).isEqualTo(1);

        verify(reverseProxyRouterFunctionFactory, times(2)).create(any(), any());
    }

    @Test
    void removeByKeyValue() {
        ReverseProxy mock = getMockReverseProxy();
        registry.register("fake-plugin", mock);

        registry.remove("fake-plugin", "test-reverse-proxy");

        assertThat(registry.reverseProxySize("fake-plugin")).isEqualTo(0);
    }

    private ReverseProxy getMockReverseProxy() {
        ReverseProxy mock = Mockito.mock(ReverseProxy.class);
        Metadata metadata = new Metadata();
        metadata.setName("test-reverse-proxy");
        when(mock.getMetadata()).thenReturn(metadata);
        RouterFunction<ServerResponse> routerFunction = request -> Mono.empty();

        when(reverseProxyRouterFunctionFactory.create(any(), any()))
            .thenReturn(routerFunction);
        return mock;
    }
}