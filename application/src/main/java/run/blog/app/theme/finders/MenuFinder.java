package run.blog.app.theme.finders;

import reactor.core.publisher.Mono;
import run.blog.app.theme.finders.vo.MenuVo;

/**
 * A finder for {@link run.blog.app.core.extension.Menu}.
 *
 * @author guqing
 * @since 2.0.0
 */
public interface MenuFinder {

    Mono<MenuVo> getByName(String name);

    Mono<MenuVo> getPrimary();
}
