package run.blog.app.plugin.event;

import org.springframework.context.ApplicationEvent;
import run.blog.app.plugin.SpringPlugin;

public class SpringPluginStoppedEvent extends ApplicationEvent {

    private final SpringPlugin springPlugin;

    public SpringPluginStoppedEvent(Object source, SpringPlugin springPlugin) {
        super(source);
        this.springPlugin = springPlugin;
    }

    public SpringPlugin getSpringPlugin() {
        return springPlugin;
    }
}
