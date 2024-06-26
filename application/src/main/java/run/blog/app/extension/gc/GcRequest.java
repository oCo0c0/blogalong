package run.blog.app.extension.gc;

import org.springframework.util.Assert;
import run.blog.app.extension.GroupVersionKind;

record GcRequest(GroupVersionKind gvk, String name) {

    public GcRequest {
        Assert.notNull(gvk, "Group, version and kind must not be null");
        Assert.hasText(name, "Extension name must not be blank");
    }
}
