package run.blog.app.infra;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.nio.file.Path;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import run.blog.app.infra.properties.BlogProperties;

@ExtendWith(MockitoExtension.class)
class DefaultBackupRootGetterTest {

    @Mock
    BlogProperties blogProperties;

    @InjectMocks
    DefaultBackupRootGetter backupRootGetter;

    @Test
    void shouldGetBackupRootFromWorkDir() {
        when(blogProperties.getWorkDir()).thenReturn(Path.of("workdir"));
        var backupRoot = this.backupRootGetter.get();
        assertEquals(Path.of("workdir", "backups"), backupRoot);
        verify(blogProperties).getWorkDir();
    }


}