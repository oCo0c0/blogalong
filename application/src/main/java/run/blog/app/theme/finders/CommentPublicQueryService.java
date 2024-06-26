package run.blog.app.theme.finders;

import org.springframework.lang.Nullable;
import reactor.core.publisher.Mono;
import run.blog.app.extension.ListResult;
import run.blog.app.extension.PageRequest;
import run.blog.app.extension.Ref;
import run.blog.app.theme.finders.vo.CommentVo;
import run.blog.app.theme.finders.vo.CommentWithReplyVo;
import run.blog.app.theme.finders.vo.ReplyVo;

/**
 * comment finder.
 *
 * @author LIlGG
 */
public interface CommentPublicQueryService {
    Mono<CommentVo> getByName(String name);

    Mono<ListResult<CommentVo>> list(Ref ref, @Nullable Integer page,
        @Nullable Integer size);

    Mono<ListResult<CommentVo>> list(Ref ref, @Nullable PageRequest pageRequest);

    Mono<ListResult<CommentWithReplyVo>> convertToWithReplyVo(ListResult<CommentVo> comments,
        int replySize);

    Mono<ListResult<ReplyVo>> listReply(String commentName, @Nullable Integer page,
        @Nullable Integer size);

    Mono<ListResult<ReplyVo>> listReply(String commentName, PageRequest pageRequest);
}
