package run.blog.app.theme.finders;

import java.util.Comparator;
import java.util.function.Predicate;
import org.springframework.lang.Nullable;
import reactor.core.publisher.Mono;
import run.blog.app.core.extension.content.SinglePage;
import run.blog.app.extension.ListResult;
import run.blog.app.theme.finders.vo.ContentVo;
import run.blog.app.theme.finders.vo.ListedSinglePageVo;
import run.blog.app.theme.finders.vo.SinglePageVo;

/**
 * A finder for {@link SinglePage}.
 *
 * @author guqing
 * @since 2.0.0
 */
public interface SinglePageFinder {

    Mono<SinglePageVo> getByName(String pageName);

    Mono<ContentVo> content(String pageName);

    Mono<ListResult<ListedSinglePageVo>> list(@Nullable Integer page, @Nullable Integer size);

    Mono<ListResult<ListedSinglePageVo>> list(@Nullable Integer page, @Nullable Integer size,
        @Nullable Predicate<SinglePage> predicate, @Nullable Comparator<SinglePage> comparator);
}
