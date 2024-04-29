package run.blog.app.content.comment;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import run.blog.app.core.extension.content.Reply;

/**
 * Listed reply for {@link Reply}.
 *
 * @author guqing
 * @since 2.0.0
 */
@Data
@Builder
public class ListedReply {

    @Schema(requiredMode = REQUIRED)
    private Reply reply;

    @Schema(requiredMode = REQUIRED)
    private OwnerInfo owner;

    @Schema(requiredMode = REQUIRED)
    private CommentStats stats;
}
