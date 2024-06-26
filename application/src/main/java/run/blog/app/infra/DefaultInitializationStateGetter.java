package run.blog.app.infra;

import static org.apache.commons.lang3.BooleanUtils.isTrue;
import static run.blog.app.extension.index.query.QueryFactory.isNull;

import java.util.concurrent.atomic.AtomicBoolean;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import run.blog.app.core.extension.User;
import run.blog.app.extension.ConfigMap;
import run.blog.app.extension.ListOptions;
import run.blog.app.extension.PageRequestImpl;
import run.blog.app.extension.ReactiveExtensionClient;
import run.blog.app.extension.router.selector.FieldSelector;
import run.blog.app.extension.router.selector.LabelSelector;

/**
 * <p>A cache that caches system setup state.</p>
 * when setUp state changed, the cache will be updated.
 *
 * @author guqing
 * @since 2.5.2
 */
@Component
@RequiredArgsConstructor
public class DefaultInitializationStateGetter implements InitializationStateGetter {
    private final ReactiveExtensionClient client;
    private final AtomicBoolean userInitialized = new AtomicBoolean(false);
    private final AtomicBoolean dataInitialized = new AtomicBoolean(false);

    @Override
    public Mono<Boolean> userInitialized() {
        // If user is initialized, return true directly.
        if (userInitialized.get()) {
            return Mono.just(true);
        }
        return hasUser()
            .doOnNext(userInitialized::set);
    }

    @Override
    public Mono<Boolean> dataInitialized() {
        if (dataInitialized.get()) {
            return Mono.just(true);
        }
        return client.fetch(ConfigMap.class, SystemState.SYSTEM_STATES_CONFIGMAP)
            .map(config -> {
                SystemState systemState = SystemState.deserialize(config);
                return isTrue(systemState.getIsSetup());
            })
            .defaultIfEmpty(false)
            .doOnNext(dataInitialized::set);
    }

    private Mono<Boolean> hasUser() {
        var listOptions = new ListOptions();
        listOptions.setLabelSelector(LabelSelector.builder()
            .notEq(User.HIDDEN_USER_LABEL, "true")
            .build()
        );
        listOptions.setFieldSelector(
            FieldSelector.of(isNull("metadata.deletionTimestamp")));
        return client.listBy(User.class, listOptions, PageRequestImpl.ofSize(1))
            .map(result -> result.getTotal() > 0)
            .defaultIfEmpty(false);
    }
}
