package run.blog.app.theme.router;

import java.util.function.Predicate;
import reactor.core.publisher.Mono;
import run.blog.app.core.extension.content.Post;
import run.blog.app.extension.ListOptions;

/**
 * The reactive query post predicate resolver.
 *
 * @author guqing
 * @since 2.9.0
 */
public interface ReactiveQueryPostPredicateResolver {

    Mono<Predicate<Post>> getPredicate();

    Mono<ListOptions> getListOptions();
}
