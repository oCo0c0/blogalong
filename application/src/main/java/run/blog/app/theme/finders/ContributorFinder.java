package run.blog.app.theme.finders;

import java.util.List;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import run.blog.app.core.extension.User;
import run.blog.app.theme.finders.vo.ContributorVo;

/**
 * A finder for {@link User}.
 */
public interface ContributorFinder {

    Mono<ContributorVo> getContributor(String name);

    Flux<ContributorVo> getContributors(List<String> names);
}
