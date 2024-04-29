package run.blog.app.core.extension;

import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import run.blog.app.extension.AbstractExtension;
import run.blog.app.extension.GVK;

/**
 * <p>The reverse proxy custom resource is used to configure a path to proxy it to a directory or
 * file.</p>
 * <p>HTTP proxy may be added in the future.</p>
 *
 * @author guqing
 * @since 2.0.0
 */
@Data
@EqualsAndHashCode(callSuper = true)
@GVK(group = "plugin.blog.run", kind = "ReverseProxy", version = "v1alpha1",
    plural = "reverseproxies", singular = "reverseproxy")
public class ReverseProxy extends AbstractExtension {
    private List<ReverseProxyRule> rules;

    public record ReverseProxyRule(String path, FileReverseProxyProvider file) {
    }

    public record FileReverseProxyProvider(String directory, String filename) {
    }
}
