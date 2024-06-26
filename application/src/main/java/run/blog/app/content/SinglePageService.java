package run.blog.app.content;

import reactor.core.publisher.Mono;
import run.blog.app.core.extension.content.SinglePage;
import run.blog.app.extension.ListResult;

/**
 * Single page service.
 *
 * @author guqing
 * @since 2.0.0
 */
public interface SinglePageService {

    Mono<ContentWrapper> getHeadContent(String singlePageName);

    Mono<ContentWrapper> getReleaseContent(String singlePageName);

    Mono<ContentWrapper> getContent(String snapshotName, String baseSnapshotName);

    Mono<ListResult<ListedSinglePage>> list(SinglePageQuery listRequest);

    Mono<SinglePage> draft(SinglePageRequest pageRequest);

    Mono<SinglePage> update(SinglePageRequest pageRequest);
}
