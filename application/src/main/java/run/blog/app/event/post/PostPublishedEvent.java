package run.blog.app.event.post;

import org.springframework.context.ApplicationEvent;
import run.blog.app.plugin.SharedEvent;

@SharedEvent
public class PostPublishedEvent extends ApplicationEvent implements PostEvent {

    private final String postName;

    public PostPublishedEvent(Object source, String postName) {
        super(source);
        this.postName = postName;
    }

    @Override
    public String getName() {
        return postName;
    }

}
