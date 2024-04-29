package run.blog.app.theme.router.factories;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;
import static run.blog.app.theme.router.PageUrlUtils.totalPage;

import java.util.Map;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.HandlerFunction;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.server.i18n.LocaleContextResolver;
import reactor.core.publisher.Mono;
import run.blog.app.core.extension.User;
import run.blog.app.extension.ReactiveExtensionClient;
import run.blog.app.infra.SystemConfigurableEnvironmentFetcher;
import run.blog.app.infra.SystemSetting;
import run.blog.app.infra.exception.NotFoundException;
import run.blog.app.theme.DefaultTemplateEnum;
import run.blog.app.theme.finders.PostFinder;
import run.blog.app.theme.finders.vo.ListedPostVo;
import run.blog.app.theme.finders.vo.UserVo;
import run.blog.app.theme.router.ModelConst;
import run.blog.app.theme.router.PageUrlUtils;
import run.blog.app.theme.router.TitleVisibilityIdentifyCalculator;
import run.blog.app.theme.router.UrlContextListResult;

/**
 * The {@link AuthorPostsRouteFactory} for generate {@link RouterFunction} specific to the template
 * <code>index.html</code>.
 *
 * @author guqing
 * @since 2.0.0
 */
@Component
@AllArgsConstructor
public class AuthorPostsRouteFactory implements RouteFactory {

    private final PostFinder postFinder;
    private final ReactiveExtensionClient client;
    private SystemConfigurableEnvironmentFetcher environmentFetcher;

    private final TitleVisibilityIdentifyCalculator titleVisibilityIdentifyCalculator;

    private final LocaleContextResolver localeContextResolver;

    @Override
    public RouterFunction<ServerResponse> create(String pattern) {
        return RouterFunctions
            .route(GET("/authors/{name}").or(GET("/authors/{name}/page/{page}"))
                .and(accept(MediaType.TEXT_HTML)), handlerFunction());
    }

    HandlerFunction<ServerResponse> handlerFunction() {
        return request -> {
            String name = request.pathVariable("name");
            return ServerResponse.ok()
                .render(DefaultTemplateEnum.AUTHOR.getValue(),
                    Map.of("author", getByName(name),
                        "posts", postList(request, name),
                        ModelConst.TEMPLATE_ID, DefaultTemplateEnum.AUTHOR.getValue()
                    )
                );
        };
    }

    private Mono<UrlContextListResult<ListedPostVo>> postList(ServerRequest request, String name) {
        String path = request.path();
        int pageNum = pageNumInPathVariable(request);
        return configuredPageSize(environmentFetcher, SystemSetting.Post::getPostPageSize)
            .flatMap(pageSize -> postFinder.listByOwner(pageNum, pageSize, name))
            .doOnNext(list -> {
                list.getItems().forEach(listedPostVo -> {
                    listedPostVo.getSpec().setTitle(
                        titleVisibilityIdentifyCalculator.calculateTitle(
                            listedPostVo.getSpec().getTitle(),
                            listedPostVo.getSpec().getVisible(),
                            localeContextResolver.resolveLocaleContext(request.exchange())
                                .getLocale())
                    );
                });
            })
            .map(list -> new UrlContextListResult.Builder<ListedPostVo>()
                .listResult(list)
                .nextUrl(PageUrlUtils.nextPageUrl(path, totalPage(list)))
                .prevUrl(PageUrlUtils.prevPageUrl(path))
                .build());
    }

    private Mono<UserVo> getByName(String name) {
        return client.fetch(User.class, name)
            .switchIfEmpty(Mono.error(() -> new NotFoundException("Author page not found.")))
            .map(UserVo::from);
    }
}
