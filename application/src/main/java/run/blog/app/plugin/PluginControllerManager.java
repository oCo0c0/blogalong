package run.blog.app.plugin;

import static org.springframework.core.ResolvableType.forClassWithGenerics;

import java.util.concurrent.ConcurrentHashMap;
import org.springframework.context.event.EventListener;
import reactor.core.Disposable;
import run.blog.app.extension.ExtensionClient;
import run.blog.app.extension.controller.Controller;
import run.blog.app.extension.controller.ControllerBuilder;
import run.blog.app.extension.controller.Reconciler;
import run.blog.app.plugin.event.SpringPluginStartedEvent;
import run.blog.app.plugin.event.SpringPluginStoppingEvent;

public class PluginControllerManager {

    private final ConcurrentHashMap<String, Controller> controllers;

    private final ExtensionClient client;

    public PluginControllerManager(ExtensionClient client) {
        this.client = client;
        controllers = new ConcurrentHashMap<>();
    }

    @EventListener
    public void onApplicationEvent(SpringPluginStartedEvent event) {
        event.getSpringPlugin().getApplicationContext()
            .<Reconciler<Reconciler.Request>>getBeanProvider(
                forClassWithGenerics(Reconciler.class, Reconciler.Request.class))
            .orderedStream()
            .forEach(this::start);
    }

    @EventListener
    public void onApplicationEvent(SpringPluginStoppingEvent event) throws Exception {
        controllers.values()
            .forEach(Disposable::dispose);
        controllers.clear();
    }

    private void start(Reconciler<Reconciler.Request> reconciler) {
        var builder = new ControllerBuilder(reconciler, client);
        var controller = reconciler.setupWith(builder);
        controllers.put(reconciler.getClass().getName(), controller);
        controller.start();
    }

}
