package run.blog.app.core.extension.reconciler;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import run.blog.app.core.extension.ReverseProxy;
import run.blog.app.extension.ExtensionClient;
import run.blog.app.extension.Metadata;
import run.blog.app.extension.controller.Reconciler;
import run.blog.app.plugin.PluginConst;
import run.blog.app.plugin.resources.ReverseProxyRouterFunctionRegistry;

/**
 * Tests for {@link ReverseProxyReconciler}.
 *
 * @author guqing
 * @since 2.0.1
 */
@ExtendWith(MockitoExtension.class)
class ReverseProxyReconcilerTest {

    @Mock
    private ExtensionClient client;

    @Mock
    private ReverseProxyRouterFunctionRegistry routerFunctionRegistry;

    @InjectMocks
    private ReverseProxyReconciler reverseProxyReconciler;

    @Test
    void reconcileRemoval() {
        // fix gh-2937
        ReverseProxy reverseProxy = new ReverseProxy();
        reverseProxy.setMetadata(new Metadata());
        reverseProxy.getMetadata().setName("fake-reverse-proxy");
        reverseProxy.getMetadata().setDeletionTimestamp(Instant.now());
        reverseProxy.getMetadata()
            .setLabels(Map.of(PluginConst.PLUGIN_NAME_LABEL_NAME, "fake-plugin"));
        reverseProxy.setRules(List.of());

        doNothing().when(routerFunctionRegistry).remove(anyString(), anyString());
        when(client.fetch(ReverseProxy.class, "fake-reverse-proxy"))
            .thenReturn(Optional.of(reverseProxy));

        reverseProxyReconciler.reconcile(new Reconciler.Request("fake-reverse-proxy"));

        verify(routerFunctionRegistry, never()).register(anyString(), any(ReverseProxy.class));

        verify(routerFunctionRegistry, times(1))
            .remove(eq("fake-plugin"), eq("fake-reverse-proxy"));
    }
}