package run.blog.app.extension.exception;

import org.springframework.http.HttpStatus;
import run.blog.app.extension.GroupVersionKind;

public class ExtensionNotFoundException extends ExtensionException {

    public ExtensionNotFoundException(GroupVersionKind gvk, String name) {
        super(HttpStatus.NOT_FOUND, "Extension " + gvk + "/" + name + " was not found.",
            null, null, new Object[] {gvk, name});
    }

}
