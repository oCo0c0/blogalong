package run.blog.app.plugin.event;

import org.pf4j.PluginState;
import org.pf4j.PluginWrapper;
import org.springframework.context.ApplicationEvent;

/**
 * This event will be published to <b>plugin application context</b> once plugin is stopped.
 *
 * @author guqing
 * @date 2021-11-02
 */
public class BlogPluginStoppedEvent extends ApplicationEvent {

    private final PluginWrapper plugin;

    public BlogPluginStoppedEvent(Object source, PluginWrapper plugin) {
        super(source);
        this.plugin = plugin;
    }

    public PluginWrapper getPlugin() {
        return plugin;
    }

    public PluginState getPluginState() {
        return plugin.getPluginState();
    }
}
