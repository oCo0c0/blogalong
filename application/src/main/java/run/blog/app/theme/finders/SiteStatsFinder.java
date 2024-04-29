package run.blog.app.theme.finders;

import reactor.core.publisher.Mono;
import run.blog.app.theme.finders.vo.SiteStatsVo;

/**
 * Site statistics finder.
 *
 * @author guqing
 * @since 2.0.0
 */
public interface SiteStatsFinder {

    Mono<SiteStatsVo> getStats();
}
