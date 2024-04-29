package run.blog.app.extension.controller;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isA;
import static org.mockito.ArgumentMatchers.same;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import run.blog.app.extension.ExtensionClient;
import run.blog.app.extension.ExtensionMatcher;
import run.blog.app.extension.FakeExtension;
import run.blog.app.extension.GroupVersionKind;
import run.blog.app.extension.ListOptions;
import run.blog.app.extension.Watcher;
import run.blog.app.extension.index.IndexedQueryEngine;

@ExtendWith(MockitoExtension.class)
class RequestSynchronizerTest {

    @Mock
    ExtensionClient client;

    @Mock
    IndexedQueryEngine indexedQueryEngine;

    @Mock
    Watcher watcher;

    @Mock
    ExtensionMatcher listMatcher;

    RequestSynchronizer synchronizer;

    @BeforeEach
    void setUp() {
        when(client.indexedQueryEngine()).thenReturn(indexedQueryEngine);
        synchronizer =
            new RequestSynchronizer(true, client, new FakeExtension(), watcher, listMatcher);
        assertFalse(synchronizer.isDisposed());
        assertFalse(synchronizer.isStarted());
    }

    @Test
    void shouldStartCorrectlyWhenSyncingAllOnStart() {
        var type = GroupVersionKind.fromExtension(FakeExtension.class);
        when(indexedQueryEngine.retrieveAll(eq(type), isA(ListOptions.class)))
            .thenReturn(List.of("fake-01", "fake-02"));

        synchronizer.start();

        assertTrue(synchronizer.isStarted());
        assertFalse(synchronizer.isDisposed());

        verify(indexedQueryEngine, times(1)).retrieveAll(eq(type),
            isA(ListOptions.class));
        verify(watcher, times(2)).onAdd(isA(Reconciler.Request.class));
        verify(client, times(1)).watch(same(watcher));
    }

    @Test
    void shouldStartCorrectlyWhenNotSyncingAllOnStart() {
        synchronizer =
            new RequestSynchronizer(false, client, new FakeExtension(), watcher, listMatcher);
        assertFalse(synchronizer.isDisposed());
        assertFalse(synchronizer.isStarted());

        synchronizer.start();

        assertTrue(synchronizer.isStarted());
        assertFalse(synchronizer.isDisposed());

        verify(client, times(0)).list(any(), any(), any());
        verify(watcher, times(0)).onAdd(isA(Reconciler.Request.class));
        verify(client, times(1)).watch(any(Watcher.class));
    }

    @Test
    void shouldDisposeCorrectly() {
        synchronizer.start();
        assertFalse(synchronizer.isDisposed());
        assertTrue(synchronizer.isStarted());

        synchronizer.dispose();

        assertTrue(synchronizer.isDisposed());
        assertTrue(synchronizer.isStarted());
        verify(watcher, times(1)).dispose();
    }

    @Test
    void shouldNotStartAfterDisposing() {
        synchronizer.dispose();
        synchronizer.start();

        verify(client, times(0)).list(any(), any(), any());
        verify(watcher, times(0)).onAdd(isA(Reconciler.Request.class));
        verify(client, times(0)).watch(any());
    }

}