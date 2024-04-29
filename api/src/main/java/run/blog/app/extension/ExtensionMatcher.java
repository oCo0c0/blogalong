package run.blog.app.extension;

import run.blog.app.extension.router.selector.FieldSelector;
import run.blog.app.extension.router.selector.LabelSelector;

public interface ExtensionMatcher {
    GroupVersionKind getGvk();

    LabelSelector getLabelSelector();

    FieldSelector getFieldSelector();

    boolean match(Extension extension);
}
