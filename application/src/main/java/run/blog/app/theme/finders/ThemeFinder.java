package run.blog.app.theme.finders;

import reactor.core.publisher.Mono;
import run.blog.app.theme.finders.vo.ThemeVo;

/**
 * A finder for theme.
 *
 * @author guqing
 * @since 2.0.0
 */
public interface ThemeFinder {

    Mono<ThemeVo> activation();

    Mono<ThemeVo> getByName(String themeName);
}
