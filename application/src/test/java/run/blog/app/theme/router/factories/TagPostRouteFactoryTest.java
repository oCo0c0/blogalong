package run.blog.app.theme.router.factories;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;
import run.blog.app.core.extension.content.Tag;
import run.blog.app.extension.ListResult;
import run.blog.app.extension.Metadata;
import run.blog.app.extension.PageRequest;
import run.blog.app.extension.ReactiveExtensionClient;
import run.blog.app.theme.finders.PostFinder;
import run.blog.app.theme.finders.TagFinder;
import run.blog.app.theme.finders.vo.TagVo;

/**
 * Tests for @link TagPostRouteFactory}.
 *
 * @author guqing
 * @since 2.0.0
 */
@ExtendWith(MockitoExtension.class)
class TagPostRouteFactoryTest extends RouteFactoryTestSuite {
    @Mock
    private ReactiveExtensionClient client;
    @Mock
    private TagFinder tagFinder;
    @Mock
    private PostFinder postFinder;

    @InjectMocks
    TagPostRouteFactory tagPostRouteFactory;

    @Test
    void create() {
        when(client.listBy(eq(Tag.class), any(), any(PageRequest.class)))
            .thenReturn(Mono.just(ListResult.emptyResult()));
        WebTestClient webTestClient = getWebTestClient(tagPostRouteFactory.create("/new-tags"));

        webTestClient.get()
            .uri("/new-tags/tag-slug-1")
            .exchange()
            .expectStatus().isNotFound();

        Tag tag = new Tag();
        tag.setMetadata(new Metadata());
        tag.getMetadata().setName("fake-tag-name");
        tag.setSpec(new Tag.TagSpec());
        tag.getSpec().setSlug("tag-slug-2");
        when(client.listBy(eq(Tag.class), any(), any(PageRequest.class)))
            .thenReturn(Mono.just(new ListResult<>(List.of(tag))));
        when(tagFinder.getByName(eq(tag.getMetadata().getName())))
            .thenReturn(Mono.just(TagVo.from(tag)));
        webTestClient.get()
            .uri("/new-tags/tag-slug-2")
            .exchange()
            .expectStatus().isOk();

        webTestClient.get()
            .uri("/new-tags/tag-slug-2/page/1")
            .exchange()
            .expectStatus().isOk();
    }
}