package run.blog.app.plugin.event;

import org.springframework.context.ApplicationEvent;
import run.blog.app.plugin.SpringPlugin;

public class SpringPluginStartingEvent extends ApplicationEvent {

    private final SpringPlugin springPlugin;

    public SpringPluginStartingEvent(Object source, SpringPlugin springPlugin) {
        super(source);
        this.springPlugin = springPlugin;
    }

    public SpringPlugin getSpringPlugin() {
        return springPlugin;
    }
}
