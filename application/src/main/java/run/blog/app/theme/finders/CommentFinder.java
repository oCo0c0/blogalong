package run.blog.app.theme.finders;

import java.util.Map;
import org.springframework.lang.Nullable;
import reactor.core.publisher.Mono;
import run.blog.app.core.extension.content.Comment;
import run.blog.app.extension.ListResult;
import run.blog.app.theme.finders.vo.CommentVo;
import run.blog.app.theme.finders.vo.ReplyVo;

/**
 * A finder for finding {@link Comment comments} in template.
 *
 * @author guqing
 * @since 2.0.0
 */
public interface CommentFinder {

    Mono<CommentVo> getByName(String name);

    Mono<ListResult<CommentVo>> list(@Nullable Map<String, String> ref, @Nullable Integer page,
        @Nullable Integer size);

    Mono<ListResult<ReplyVo>> listReply(String commentName, @Nullable Integer page,
        @Nullable Integer size);
}
