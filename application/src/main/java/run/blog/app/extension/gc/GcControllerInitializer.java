package run.blog.app.extension.gc;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import run.blog.app.extension.controller.Controller;
import run.blog.app.infra.ExtensionInitializedEvent;

@Component
public class GcControllerInitializer
    implements ApplicationListener<ExtensionInitializedEvent>, DisposableBean {

    private final Controller gcController;

    public GcControllerInitializer(GcReconciler gcReconciler) {
        this.gcController = gcReconciler.setupWith(null);
    }

    @Override
    public void onApplicationEvent(ExtensionInitializedEvent event) {
        gcController.start();
    }

    @Override
    public void destroy() throws Exception {
        gcController.dispose();
    }
}
