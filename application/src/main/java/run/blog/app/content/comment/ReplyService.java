package run.blog.app.content.comment;

import reactor.core.publisher.Mono;
import run.blog.app.core.extension.content.Reply;
import run.blog.app.extension.ListResult;

/**
 * An application service for {@link Reply}.
 *
 * @author guqing
 * @since 2.0.0
 */
public interface ReplyService {

    Mono<Reply> create(String commentName, Reply reply);

    Mono<ListResult<ListedReply>> list(ReplyQuery query);

    Mono<Void> removeAllByComment(String commentName);
}
