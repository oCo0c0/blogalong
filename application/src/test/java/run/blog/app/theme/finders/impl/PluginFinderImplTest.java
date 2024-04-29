package run.blog.app.theme.finders.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.pf4j.PluginState;
import org.pf4j.PluginWrapper;
import run.blog.app.plugin.BlogPluginManager;

/**
 * Tests for {@link PluginFinderImpl}.
 *
 * @author guqing
 * @since 2.0.0
 */
@ExtendWith(MockitoExtension.class)
class PluginFinderImplTest {
    @Mock
    private BlogPluginManager blogPluginManager;

    @InjectMocks
    private PluginFinderImpl pluginFinder;

    @Test
    void available() {
        assertThat(pluginFinder.available(null)).isFalse();

        boolean available = pluginFinder.available("fake-plugin");
        assertThat(available).isFalse();

        PluginWrapper mockPluginWrapper = Mockito.mock(PluginWrapper.class);
        when(blogPluginManager.getPlugin(eq("fake-plugin")))
            .thenReturn(mockPluginWrapper);

        when(mockPluginWrapper.getPluginState()).thenReturn(PluginState.RESOLVED);
        available = pluginFinder.available("fake-plugin");
        assertThat(available).isFalse();

        when(mockPluginWrapper.getPluginState()).thenReturn(PluginState.STARTED);
        available = pluginFinder.available("fake-plugin");
        assertThat(available).isTrue();
    }
}