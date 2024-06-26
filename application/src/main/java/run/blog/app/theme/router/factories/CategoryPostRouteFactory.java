package run.blog.app.theme.router.factories;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;
import static run.blog.app.theme.router.PageUrlUtils.totalPage;

import java.util.HashMap;
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
import run.blog.app.core.extension.content.Category;
import run.blog.app.extension.ListOptions;
import run.blog.app.extension.ListResult;
import run.blog.app.extension.PageRequestImpl;
import run.blog.app.extension.ReactiveExtensionClient;
import run.blog.app.extension.index.query.QueryFactory;
import run.blog.app.extension.router.selector.FieldSelector;
import run.blog.app.infra.SystemConfigurableEnvironmentFetcher;
import run.blog.app.infra.SystemSetting;
import run.blog.app.infra.exception.NotFoundException;
import run.blog.app.infra.utils.PathUtils;
import run.blog.app.theme.DefaultTemplateEnum;
import run.blog.app.theme.ViewNameResolver;
import run.blog.app.theme.finders.PostFinder;
import run.blog.app.theme.finders.vo.CategoryVo;
import run.blog.app.theme.finders.vo.ListedPostVo;
import run.blog.app.theme.router.ModelConst;
import run.blog.app.theme.router.PageUrlUtils;
import run.blog.app.theme.router.TitleVisibilityIdentifyCalculator;
import run.blog.app.theme.router.UrlContextListResult;

/**
 * The {@link CategoryPostRouteFactory} for generate {@link RouterFunction} specific to the template
 * <code>category.html</code>.
 *
 * @author guqing
 * @since 2.0.0
 */
@Component
@AllArgsConstructor
public class CategoryPostRouteFactory implements RouteFactory {

    private final PostFinder postFinder;

    private final SystemConfigurableEnvironmentFetcher environmentFetcher;
    private final ReactiveExtensionClient client;
    private final ViewNameResolver viewNameResolver;

    private final TitleVisibilityIdentifyCalculator titleVisibilityIdentifyCalculator;

    private final LocaleContextResolver localeContextResolver;

    @Override
    public RouterFunction<ServerResponse> create(String prefix) {
        return RouterFunctions.route(GET(PathUtils.combinePath(prefix, "/{slug}"))
            .or(GET(PathUtils.combinePath(prefix, "/{slug}/page/{page:\\d+}")))
            .and(accept(MediaType.TEXT_HTML)), handlerFunction());
    }

    HandlerFunction<ServerResponse> handlerFunction() {
        return request -> {
            String slug = request.pathVariable("slug");
            return fetchBySlug(slug)
                .flatMap(categoryVo -> {
                    Map<String, Object> model = new HashMap<>();
                    model.put(ModelConst.TEMPLATE_ID, DefaultTemplateEnum.CATEGORY.getValue());
                    model.put("posts",
                        postListByCategoryName(categoryVo.getMetadata().getName(), request));
                    model.put("category", categoryVo);
                    String template = categoryVo.getSpec().getTemplate();
                    return viewNameResolver.resolveViewNameOrDefault(request, template,
                            DefaultTemplateEnum.CATEGORY.getValue())
                        .flatMap(viewName -> ServerResponse.ok().render(viewName, model));
                })
                .switchIfEmpty(
                    Mono.error(new NotFoundException("Category not found with slug: " + slug)));
        };
    }

    Mono<CategoryVo> fetchBySlug(String slug) {
        var listOptions = new ListOptions();
        listOptions.setFieldSelector(FieldSelector.of(
            QueryFactory.and(
                QueryFactory.equal("spec.slug", slug),
                QueryFactory.isNull("metadata.deletionTimestamp")
            )
        ));
        return client.listBy(Category.class, listOptions, PageRequestImpl.ofSize(1))
            .mapNotNull(result -> ListResult.first(result)
                .map(CategoryVo::from)
                .orElse(null)
            );
    }

    private Mono<UrlContextListResult<ListedPostVo>> postListByCategoryName(String name,
        ServerRequest request) {
        String path = request.path();
        int pageNum = pageNumInPathVariable(request);
        return configuredPageSize(environmentFetcher, SystemSetting.Post::getCategoryPageSize)
            .flatMap(pageSize -> postFinder.listByCategory(pageNum, pageSize, name))
            .doOnNext(list -> list.forEach(postVo -> postVo.getSpec().setTitle(
                    titleVisibilityIdentifyCalculator.calculateTitle(
                        postVo.getSpec().getTitle(),
                        postVo.getSpec().getVisible(),
                        localeContextResolver.resolveLocaleContext(request.exchange())
                            .getLocale()
                    )
                )
            ))
            .map(list -> new UrlContextListResult.Builder<ListedPostVo>()
                .listResult(list)
                .nextUrl(PageUrlUtils.nextPageUrl(path, totalPage(list)))
                .prevUrl(PageUrlUtils.prevPageUrl(path))
                .build()
            );
    }
}
