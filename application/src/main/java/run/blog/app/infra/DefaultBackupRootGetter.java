package run.blog.app.infra;

import java.nio.file.Path;
import org.springframework.stereotype.Component;
import run.blog.app.infra.properties.BlogProperties;

@Component
public class DefaultBackupRootGetter implements BackupRootGetter {

    private final BlogProperties blogProperties;

    public DefaultBackupRootGetter(BlogProperties blogProperties) {
        this.blogProperties = blogProperties;
    }

    @Override
    public Path get() {
        return blogProperties.getWorkDir().resolve("backups");
    }
}
