package run.blog.app.extension;

import lombok.Data;
import lombok.experimental.Accessors;
import run.blog.app.extension.router.selector.FieldSelector;
import run.blog.app.extension.router.selector.LabelSelector;

@Data
@Accessors(chain = true)
public class ListOptions {
    private LabelSelector labelSelector;
    private FieldSelector fieldSelector;
}