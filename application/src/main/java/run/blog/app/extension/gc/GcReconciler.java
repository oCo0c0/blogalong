package run.blog.app.extension.gc;

import java.time.Duration;
import java.time.Instant;
import java.util.function.Predicate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import run.blog.app.extension.Extension;
import run.blog.app.extension.ExtensionClient;
import run.blog.app.extension.ExtensionConverter;
import run.blog.app.extension.SchemeManager;
import run.blog.app.extension.SchemeWatcherManager;
import run.blog.app.extension.controller.Controller;
import run.blog.app.extension.controller.ControllerBuilder;
import run.blog.app.extension.controller.DefaultController;
import run.blog.app.extension.controller.DefaultQueue;
import run.blog.app.extension.controller.Reconciler;
import run.blog.app.extension.index.IndexerFactory;
import run.blog.app.extension.store.ExtensionStoreClient;

@Slf4j
@Component
class GcReconciler implements Reconciler<GcRequest> {

    private final ExtensionClient client;

    private final ExtensionStoreClient storeClient;

    private final ExtensionConverter converter;

    private final SchemeManager schemeManager;

    private final IndexerFactory indexerFactory;

    private final SchemeWatcherManager schemeWatcherManager;

    GcReconciler(ExtensionClient client,
        ExtensionStoreClient storeClient,
        ExtensionConverter converter,
        SchemeManager schemeManager, IndexerFactory indexerFactory,
        SchemeWatcherManager schemeWatcherManager) {
        this.client = client;
        this.storeClient = storeClient;
        this.converter = converter;
        this.schemeManager = schemeManager;
        this.indexerFactory = indexerFactory;
        this.schemeWatcherManager = schemeWatcherManager;
    }

    @Override
    public Result reconcile(GcRequest request) {
        log.debug("Extension {} is being deleted", request);

        client.fetch(request.gvk(), request.name())
            .filter(deletable())
            .ifPresent(extension -> {
                var extensionStore = converter.convertTo(extension);
                storeClient.delete(extensionStore.getName(), extensionStore.getVersion());
                // drop index for this extension
                var indexer = indexerFactory.getIndexer(extension.groupVersionKind());
                indexer.unIndexRecord(request.name());
                log.debug("Extension {} was deleted", request);
            });

        return null;
    }

    @Override
    public Controller setupWith(ControllerBuilder builder) {
        var queue = new DefaultQueue<GcRequest>(Instant::now, Duration.ofMillis(500));
        var synchronizer = new GcSynchronizer(client, queue, schemeManager, schemeWatcherManager);
        return new DefaultController<>(
            "garbage-collector-controller",
            this,
            queue,
            synchronizer,
            Duration.ofMillis(500),
            Duration.ofSeconds(1000),
            // TODO Make it configurable
            10);
    }

    private Predicate<Extension> deletable() {
        return extension -> CollectionUtils.isEmpty(extension.getMetadata().getFinalizers())
            && extension.getMetadata().getDeletionTimestamp() != null;
    }
}
