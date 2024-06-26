package run.blog.app.theme.router.factories;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;

import java.util.Map;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.HandlerFunction;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import run.blog.app.theme.DefaultTemplateEnum;
import run.blog.app.theme.finders.CategoryFinder;
import run.blog.app.theme.router.ModelConst;

/**
 * The {@link CategoriesRouteFactory} for generate {@link RouterFunction} specific to the
 * template
 * <code>categories.html</code>.
 *
 * @author guqing
 * @since 2.0.0
 */
@Component
@AllArgsConstructor
public class CategoriesRouteFactory implements RouteFactory {

    private final CategoryFinder categoryFinder;

    @Override
    public RouterFunction<ServerResponse> create(String prefix) {
        return RouterFunctions.route(GET(StringUtils.prependIfMissing(prefix, "/")),
            handlerFunction());
    }

    HandlerFunction<ServerResponse> handlerFunction() {
        return request -> ServerResponse.ok()
            .render(DefaultTemplateEnum.CATEGORIES.getValue(),
                Map.of("categories", categoryFinder.listAsTree(),
                    ModelConst.TEMPLATE_ID, DefaultTemplateEnum.CATEGORIES.getValue()));
    }
}
