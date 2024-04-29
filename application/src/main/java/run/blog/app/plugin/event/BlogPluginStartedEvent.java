package run.blog.app.plugin.event;

import lombok.Getter;
import org.pf4j.PluginWrapper;
import org.springframework.context.ApplicationEvent;
import org.springframework.util.Assert;

/**
 * This event will be published to <b>application context</b> once plugin is started.
 *
 * @author guqing
 */
@Getter
public class BlogPluginStartedEvent extends ApplicationEvent {

    private final PluginWrapper plugin;

    public BlogPluginStartedEvent(Object source, PluginWrapper plugin) {
        super(source);
        Assert.notNull(plugin, "Plugin must not be null.");
        this.plugin = plugin;
    }
}
