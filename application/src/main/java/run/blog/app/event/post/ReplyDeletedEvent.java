package run.blog.app.event.post;

import run.blog.app.core.extension.content.Reply;

public class ReplyDeletedEvent extends ReplyEvent {

    public ReplyDeletedEvent(Object source, Reply reply) {
        super(source, reply);
    }
}
