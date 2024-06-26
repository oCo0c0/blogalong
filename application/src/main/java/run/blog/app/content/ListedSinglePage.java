package run.blog.app.content;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Data;
import lombok.experimental.Accessors;
import run.blog.app.core.extension.content.SinglePage;


/**
 * An aggregate object of {@link SinglePage} and {@link Contributor} single page list.
 *
 * @author guqing
 * @since 2.0.0
 */
@Data
@Accessors(chain = true)
public class ListedSinglePage {

    @Schema(requiredMode = REQUIRED)
    private SinglePage page;

    @Schema(requiredMode = REQUIRED)
    private List<Contributor> contributors;

    @Schema(requiredMode = REQUIRED)
    private Contributor owner;

    @Schema(requiredMode = REQUIRED)
    private Stats stats;
}
