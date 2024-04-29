package run.blog.app.extension.store;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@ExtendWith(MockitoExtension.class)
class ReactiveExtensionStoreClientImplTest {

    @Mock
    ExtensionStoreRepository repository;

    @InjectMocks
    ReactiveExtensionStoreClientImpl client;

    @Test
    void listByNamePrefix() {
        var expectedExtensions = List.of(
            new ExtensionStore("/registry/posts/hello-world", "this is post".getBytes(), 1L),
            new ExtensionStore("/registry/posts/hello-blog", "this is post".getBytes(), 1L)
        );

        when(repository.findAllByNameStartingWith("/registry/posts"))
            .thenReturn(Flux.fromIterable(expectedExtensions));

        var gotExtensions = client.listByNamePrefix("/registry/posts").collectList().block();
        assertEquals(expectedExtensions, gotExtensions);
    }

    @Test
    void fetchByName() {
        var expectedExtension =
            new ExtensionStore("/registry/posts/hello-world", "this is post".getBytes(), 1L);

        when(repository.findById("/registry/posts/hello-blog"))
            .thenReturn(Mono.just(expectedExtension));

        var gotExtension = client.fetchByName("/registry/posts/hello-blog").blockOptional();
        assertTrue(gotExtension.isPresent());
        assertEquals(expectedExtension, gotExtension.get());
    }

    @Test
    void create() {
        var expectedExtension =
            new ExtensionStore("/registry/posts/hello-blog", "hello blog".getBytes(), 2L);

        when(repository.save(any()))
            .thenReturn(Mono.just(expectedExtension));

        var createdExtension =
            client.create("/registry/posts/hello-blog", "hello blog".getBytes())
                .block();

        assertEquals(expectedExtension, createdExtension);
    }

    @Test
    void update() {
        var expectedExtension =
            new ExtensionStore("/registry/posts/hello-blog", "hello blog".getBytes(), 2L);

        when(repository.save(any())).thenReturn(Mono.just(expectedExtension));

        var updatedExtension =
            client.update("/registry/posts/hello-blog", 1L, "hello blog".getBytes())
                .block();

        assertEquals(expectedExtension, updatedExtension);
    }

    @Test
    void shouldDoNotThrowExceptionWhenDeletingNonExistExt() {
        when(repository.findById(anyString())).thenReturn(Mono.empty());

        client.delete("/registry/posts/hello-blog", 1L).block();
    }

    @Test
    void shouldDeleteSuccessfully() {
        var expectedExtension =
            new ExtensionStore("/registry/posts/hello-blog", "hello blog".getBytes(), 2L);

        when(repository.findById(anyString())).thenReturn(Mono.just(expectedExtension));
        when(repository.delete(any())).thenReturn(Mono.empty());

        var deletedExtension = client.delete("/registry/posts/hello-blog", 2L).block();

        assertEquals(expectedExtension, deletedExtension);
    }
}