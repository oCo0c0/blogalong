package run.blog.app.theme.finders.vo;

import org.springframework.lang.NonNull;
import run.blog.app.extension.MetadataOperator;

/**
 * An operator for extension value object.
 *
 * @author guqing
 * @since 2.0.0
 */
public interface ExtensionVoOperator {

    @NonNull
    MetadataOperator getMetadata();
}
