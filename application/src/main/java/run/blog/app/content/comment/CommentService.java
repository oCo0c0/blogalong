package run.blog.app.content.comment;

import org.springframework.lang.NonNull;
import reactor.core.publisher.Mono;
import run.blog.app.core.extension.content.Comment;
import run.blog.app.extension.ListResult;
import run.blog.app.extension.Ref;

/**
 * An application service for {@link Comment}.
 *
 * @author guqing
 * @since 2.0.0
 */
public interface CommentService {

    Mono<ListResult<ListedComment>> listComment(CommentQuery query);

    Mono<Comment> create(Comment comment);

    Mono<Void> removeBySubject(@NonNull Ref subjectRef);
}
