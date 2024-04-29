package run.blog.app.plugin;

/**
 * Plugin constants.
 *
 * @author guqing
 * @since 2.0.0
 */
public interface PluginConst {
    /**
     * Plugin metadata labels key.
     */
    String PLUGIN_NAME_LABEL_NAME = "plugin.blog.run/plugin-name";

    String SYSTEM_PLUGIN_NAME = "system";

    String RELOAD_ANNO = "plugin.blog.run/reload";

    String PLUGIN_PATH = "plugin.blog.run/plugin-path";

    String RUNTIME_MODE_ANNO = "plugin.blog.run/runtime-mode";

    static String assertsRoutePrefix(String pluginName) {
        return "/plugins/" + pluginName + "/assets/";
    }

}
