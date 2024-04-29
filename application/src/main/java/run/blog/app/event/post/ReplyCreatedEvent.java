package run.blog.app.event.post;

import run.blog.app.core.extension.content.Reply;

/**
 * Reply created event.
 *
 * @author guqing
 * @since 2.9.0
 */
public class ReplyCreatedEvent extends ReplyEvent {

    public ReplyCreatedEvent(Object source, Reply reply) {
        super(source, reply);
    }
}
