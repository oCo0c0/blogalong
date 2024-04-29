package run.blog.app.content;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

import io.swagger.v3.oas.annotations.media.Schema;
import run.blog.app.core.extension.content.SinglePage;
import run.blog.app.extension.Ref;

/**
 * A request parameter for {@link SinglePage}.
 *
 * @author guqing
 * @since 2.0.0
 */
public record SinglePageRequest(@Schema(requiredMode = REQUIRED) SinglePage page,
                                @Schema(requiredMode = REQUIRED) Content content) {

    public ContentRequest contentRequest() {
        Ref subjectRef = Ref.of(page);
        return new ContentRequest(subjectRef, page.getSpec().getHeadSnapshot(), content.raw(),
            content.content(), content.rawType());
    }

}
