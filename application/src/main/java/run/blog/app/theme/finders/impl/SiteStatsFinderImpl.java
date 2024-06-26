package run.blog.app.theme.finders.impl;

import static run.blog.app.extension.index.query.QueryFactory.and;
import static run.blog.app.extension.index.query.QueryFactory.equal;
import static run.blog.app.extension.index.query.QueryFactory.isNull;

import lombok.AllArgsConstructor;
import reactor.core.publisher.Mono;
import run.blog.app.core.extension.Counter;
import run.blog.app.core.extension.content.Category;
import run.blog.app.core.extension.content.Post;
import run.blog.app.extension.ListOptions;
import run.blog.app.extension.ListResult;
import run.blog.app.extension.PageRequestImpl;
import run.blog.app.extension.ReactiveExtensionClient;
import run.blog.app.extension.router.selector.FieldSelector;
import run.blog.app.extension.router.selector.LabelSelector;
import run.blog.app.theme.finders.Finder;
import run.blog.app.theme.finders.SiteStatsFinder;
import run.blog.app.theme.finders.vo.SiteStatsVo;

/**
 * A default implementation of {@link SiteStatsFinder}.
 *
 * @author guqing
 * @since 2.0.0
 */
@AllArgsConstructor
@Finder("siteStatsFinder")
public class SiteStatsFinderImpl implements SiteStatsFinder {
    private final ReactiveExtensionClient client;

    @Override
    public Mono<SiteStatsVo> getStats() {
        return client.list(Counter.class, null, null)
            .reduce(SiteStatsVo.empty(), (stats, counter) -> {
                stats.setVisit(stats.getVisit() + counter.getVisit());
                stats.setComment(stats.getComment() + counter.getApprovedComment());
                stats.setUpvote(stats.getUpvote() + counter.getUpvote());
                return stats;
            })
            .flatMap(siteStatsVo -> postCount()
                .doOnNext(siteStatsVo::setPost)
                .thenReturn(siteStatsVo)
            )
            .flatMap(siteStatsVo -> categoryCount()
                .doOnNext(siteStatsVo::setCategory)
                .thenReturn(siteStatsVo));
    }

    Mono<Integer> postCount() {
        var listOptions = new ListOptions();
        listOptions.setLabelSelector(LabelSelector.builder()
            .eq(Post.PUBLISHED_LABEL, "true")
            .build());
        var fieldQuery = and(
            isNull("metadata.deletionTimestamp"),
            equal("spec.deleted", "false")
        );
        listOptions.setFieldSelector(FieldSelector.of(fieldQuery));
        return client.listBy(Post.class, listOptions, PageRequestImpl.ofSize(1))
            .map(result -> (int) result.getTotal());
    }

    Mono<Integer> categoryCount() {
        return client.listBy(Category.class, new ListOptions(), PageRequestImpl.ofSize(1))
            .map(ListResult::getTotal)
            .map(Long::intValue);
    }

}
