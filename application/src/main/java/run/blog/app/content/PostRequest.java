package run.blog.app.content;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.lang.NonNull;
import run.blog.app.core.extension.content.Post;
import run.blog.app.extension.Ref;

/**
 * Post and content data for creating and updating post.
 *
 * @author guqing
 * @since 2.0.0
 */
public record PostRequest(@Schema(requiredMode = REQUIRED) @NonNull Post post,
                          Content content) {

    public ContentRequest contentRequest() {
        Ref subjectRef = Ref.of(post);
        return new ContentRequest(subjectRef, post.getSpec().getHeadSnapshot(), content.raw(),
            content.content(), content.rawType());
    }

}
