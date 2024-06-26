package run.blog.app.content;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Data;
import lombok.experimental.Accessors;
import run.blog.app.core.extension.content.Category;
import run.blog.app.core.extension.content.Post;
import run.blog.app.core.extension.content.Tag;

/**
 * An aggregate object of {@link Post} and {@link Category}
 * and {@link Tag} and more for post list.
 *
 * @author guqing
 * @since 2.0.0
 */
@Data
@Accessors(chain = true)
public class ListedPost {

    @Schema(requiredMode = REQUIRED)
    private Post post;

    @Schema(requiredMode = REQUIRED)
    private List<Category> categories;

    @Schema(requiredMode = REQUIRED)
    private List<Tag> tags;

    @Schema(requiredMode = REQUIRED)
    private List<Contributor> contributors;

    @Schema(requiredMode = REQUIRED)
    private Contributor owner;

    @Schema(requiredMode = REQUIRED)
    private Stats stats;
}
