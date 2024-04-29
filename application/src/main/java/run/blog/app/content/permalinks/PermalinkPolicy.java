package run.blog.app.content.permalinks;

import org.springframework.util.PropertyPlaceholderHelper;
import run.blog.app.extension.AbstractExtension;

/**
 * @author guqing
 * @since 2.0.0
 */
public interface PermalinkPolicy<T extends AbstractExtension> {

    PropertyPlaceholderHelper PROPERTY_PLACEHOLDER_HELPER =
        new PropertyPlaceholderHelper("{", "}");

    String permalink(T extension);
}
