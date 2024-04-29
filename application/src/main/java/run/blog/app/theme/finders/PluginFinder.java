package run.blog.app.theme.finders;

/**
 * A finder for {@link run.blog.app.core.extension.Plugin}.
 *
 * @author guqing
 * @since 2.0.0
 */
public interface PluginFinder {

    boolean available(String pluginName);
}
