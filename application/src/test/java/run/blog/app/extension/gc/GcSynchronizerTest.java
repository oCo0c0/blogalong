package run.blog.app.extension.gc;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.isA;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import run.blog.app.extension.ExtensionClient;
import run.blog.app.extension.SchemeManager;
import run.blog.app.extension.SchemeWatcherManager;
import run.blog.app.extension.SchemeWatcherManager.SchemeWatcher;

@ExtendWith(MockitoExtension.class)
class GcSynchronizerTest {

    @Mock
    ExtensionClient client;

    @Mock
    SchemeManager schemeManager;

    @Mock
    SchemeWatcherManager schemeWatcherManager;

    @InjectMocks
    GcSynchronizer synchronizer;

    @Test
    void shouldStartNormally() {
        synchronizer.start();

        assertFalse(synchronizer.isDisposed());
        verify(schemeWatcherManager).register(any(SchemeWatcher.class));
        verify(client).watch(isA(GcWatcher.class));
        verify(schemeManager).schemes();
    }

    @Test
    void shouldDisposeSuccessfully() {
        assertFalse(synchronizer.isDisposed());

        synchronizer.dispose();

        assertTrue(synchronizer.isDisposed());
    }
}