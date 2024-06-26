package run.blog.app.plugin.resources;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.lenient;

import java.net.MalformedURLException;
import java.net.URL;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.pf4j.PluginClassLoader;
import org.pf4j.PluginWrapper;
import org.springframework.core.io.Resource;
import run.blog.app.infra.exception.AccessDeniedException;
import run.blog.app.plugin.BlogPluginManager;

/**
 * Tests for {@link BundleResourceUtils}.
 *
 * @author guqing
 * @since 2.0.0
 */
@ExtendWith(MockitoExtension.class)
class BundleResourceUtilsTest {

    @Mock
    private BlogPluginManager pluginManager;

    @BeforeEach
    void setUp() throws MalformedURLException {
        PluginWrapper pluginWrapper = Mockito.mock(PluginWrapper.class);
        PluginClassLoader pluginClassLoader = Mockito.mock(PluginClassLoader.class);
        lenient().when(pluginWrapper.getPluginClassLoader()).thenReturn(pluginClassLoader);
        lenient().when(pluginManager.getPlugin(eq("fake-plugin"))).thenReturn(pluginWrapper);

        lenient().when(pluginClassLoader.getResource(eq("console/main.js"))).thenReturn(
            new URL("file://console/main.js"));
        lenient().when(pluginClassLoader.getResource(eq("console/style.css"))).thenReturn(
            new URL("file://console/style.css"));
    }

    @Test
    void getJsBundleResource() {
        Resource jsBundleResource =
            BundleResourceUtils.getJsBundleResource(pluginManager, "fake-plugin", "main.js");
        assertThat(jsBundleResource).isNotNull();
        assertThat(jsBundleResource.exists()).isTrue();

        jsBundleResource =
            BundleResourceUtils.getJsBundleResource(pluginManager, "fake-plugin", "test.js");
        assertThat(jsBundleResource).isNull();

        jsBundleResource =
            BundleResourceUtils.getJsBundleResource(pluginManager, "nothing-plugin", "main.js");
        assertThat(jsBundleResource).isNull();

        assertThatThrownBy(() -> {
            BundleResourceUtils.getJsBundleResource(pluginManager, "fake-plugin",
                "../test/main.js");
        }).isInstanceOf(AccessDeniedException.class);
    }
}
