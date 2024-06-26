package run.blog.app.plugin.resources;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.pf4j.PluginManager;
import org.springframework.context.ApplicationContext;
import run.blog.app.core.extension.ReverseProxy;
import run.blog.app.extension.Metadata;
import run.blog.app.plugin.PluginConst;

/**
 * Tests for {@link ReverseProxyRouterFunctionFactory}.
 *
 * @author guqing
 * @since 2.0.0
 */
@ExtendWith(MockitoExtension.class)
class ReverseProxyRouterFunctionFactoryTest {

    @Mock
    private PluginManager pluginManager;

    @Mock
    private ApplicationContext applicationContext;

    @InjectMocks
    private ReverseProxyRouterFunctionFactory reverseProxyRouterFunctionFactory;

    @Test
    void create() {
        var routerFunction = reverseProxyRouterFunctionFactory.create(mockReverseProxy(), "fakeA");
        assertNotNull(routerFunction);
    }

    private ReverseProxy mockReverseProxy() {
        ReverseProxy.ReverseProxyRule reverseProxyRule =
            new ReverseProxy.ReverseProxyRule("/static/**",
                new ReverseProxy.FileReverseProxyProvider("static", ""));
        ReverseProxy reverseProxy = new ReverseProxy();
        Metadata metadata = new Metadata();
        metadata.setLabels(
            Map.of(PluginConst.PLUGIN_NAME_LABEL_NAME, "fakeA"));
        reverseProxy.setMetadata(metadata);
        reverseProxy.setRules(List.of(reverseProxyRule));
        return reverseProxy;
    }
}
