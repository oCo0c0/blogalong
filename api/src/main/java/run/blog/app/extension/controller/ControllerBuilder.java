package run.blog.app.extension.controller;

import java.time.Duration;
import java.time.Instant;
import java.util.function.Supplier;
import org.springframework.util.Assert;
import run.blog.app.extension.Extension;
import run.blog.app.extension.ExtensionClient;
import run.blog.app.extension.ExtensionMatcher;
import run.blog.app.extension.WatcherExtensionMatchers;
import run.blog.app.extension.controller.Reconciler.Request;

public class ControllerBuilder {

    private final String name;

    private Duration minDelay;

    private Duration maxDelay;

    private final Reconciler<Request> reconciler;

    private Supplier<Instant> nowSupplier;

    private Extension extension;

    private ExtensionMatcher onAddMatcher;

    private ExtensionMatcher onDeleteMatcher;

    private ExtensionMatcher onUpdateMatcher;

    private final ExtensionClient client;

    private boolean syncAllOnStart = true;

    private int workerCount = 1;

    public ControllerBuilder(Reconciler<Request> reconciler, ExtensionClient client) {
        Assert.notNull(reconciler, "Reconciler must not be null");
        Assert.notNull(client, "Extension client must not be null");
        this.name = reconciler.getClass().getName();
        this.reconciler = reconciler;
        this.client = client;
    }

    public ControllerBuilder minDelay(Duration minDelay) {
        this.minDelay = minDelay;
        return this;
    }

    public ControllerBuilder maxDelay(Duration maxDelay) {
        this.maxDelay = maxDelay;
        return this;
    }

    public ControllerBuilder nowSupplier(Supplier<Instant> nowSupplier) {
        this.nowSupplier = nowSupplier;
        return this;
    }

    public ControllerBuilder extension(Extension extension) {
        this.extension = extension;
        return this;
    }

    public ControllerBuilder onAddMatcher(ExtensionMatcher onAddMatcher) {
        this.onAddMatcher = onAddMatcher;
        return this;
    }

    public ControllerBuilder onDeleteMatcher(ExtensionMatcher onDeleteMatcher) {
        this.onDeleteMatcher = onDeleteMatcher;
        return this;
    }

    public ControllerBuilder onUpdateMatcher(ExtensionMatcher extensionMatcher) {
        this.onUpdateMatcher = extensionMatcher;
        return this;
    }

    public ControllerBuilder syncAllOnStart(boolean syncAllAtStart) {
        this.syncAllOnStart = syncAllAtStart;
        return this;
    }

    public ControllerBuilder workerCount(int workerCount) {
        this.workerCount = workerCount;
        return this;
    }

    public Controller build() {
        if (nowSupplier == null) {
            nowSupplier = Instant::now;
        }
        if (minDelay == null || minDelay.isNegative() || minDelay.isZero()) {
            minDelay = Duration.ofMillis(5);
        }
        if (maxDelay == null || maxDelay.isNegative() || maxDelay.isZero()) {
            maxDelay = Duration.ofSeconds(1000);
        }
        Assert.isTrue(minDelay.compareTo(maxDelay) <= 0,
            "Min delay must be less than or equal to max delay");
        Assert.notNull(extension, "Extension must not be null");
        Assert.notNull(reconciler, "Reconciler must not be null");

        var queue = new DefaultQueue<Request>(nowSupplier, minDelay);
        var extensionMatchers = WatcherExtensionMatchers.builder(client,
                extension.groupVersionKind())
            .onAddMatcher(onAddMatcher)
            .onUpdateMatcher(onUpdateMatcher)
            .onDeleteMatcher(onDeleteMatcher)
            .build();
        var watcher = new ExtensionWatcher(queue, extensionMatchers);
        var synchronizer = new RequestSynchronizer(syncAllOnStart,
            client,
            extension,
            watcher,
            extensionMatchers.onAddMatcher());
        return new DefaultController<>(name, reconciler, queue, synchronizer, minDelay, maxDelay,
            workerCount);
    }
}
