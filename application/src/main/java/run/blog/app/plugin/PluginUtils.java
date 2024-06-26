package run.blog.app.plugin;

import java.util.Objects;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.Assert;
import org.springframework.web.server.ServerWebInputException;
import run.blog.app.core.extension.Plugin;

@UtilityClass
public class PluginUtils {

    public static String generateFileName(Plugin plugin) {
        Assert.notNull(plugin, "The plugin must not be null.");
        Assert.notNull(plugin.getMetadata(), "The plugin metadata must not be null.");
        Assert.notNull(plugin.getSpec(), "The plugin spec must not be null.");
        String version = plugin.getSpec().getVersion();
        if (StringUtils.isBlank(version)) {
            throw new ServerWebInputException("The plugin version must not be blank.");
        }
        return String.format("%s-%s.jar", plugin.getMetadata().getName(), version);
    }

    /**
     * Determine if the plugin is in development mode. Currently, we detect it from annotations.
     *
     * @param plugin is a manifest about plugin.
     * @return true if the plugin  is in development mode; false otherwise.
     */
    public static boolean isDevelopmentMode(Plugin plugin) {
        var annotations = plugin.getMetadata().getAnnotations();
        return annotations != null
            && Objects.equals("dev", annotations.get(PluginConst.RUNTIME_MODE_ANNO));
    }
}
