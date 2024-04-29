package run.blog.app.theme.finders;

import java.util.List;
import org.springframework.lang.Nullable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import run.blog.app.core.extension.content.Category;
import run.blog.app.extension.ListResult;
import run.blog.app.theme.finders.vo.CategoryTreeVo;
import run.blog.app.theme.finders.vo.CategoryVo;

/**
 * A finder for {@link Category}.
 *
 * @author guqing
 * @since 2.0.0
 */
public interface CategoryFinder {

    Mono<CategoryVo> getByName(String name);

    Flux<CategoryVo> getByNames(List<String> names);

    Mono<ListResult<CategoryVo>> list(@Nullable Integer page, @Nullable Integer size);

    Flux<CategoryVo> listAll();

    Flux<CategoryTreeVo> listAsTree();

    Flux<CategoryTreeVo> listAsTree(String name);

    Mono<CategoryVo> getParentByName(String name);
}
