package run.blog.app.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;
import run.blog.app.extension.ExtensionClient;
import run.blog.app.extension.ReactiveExtensionClient;
import run.blog.app.extension.SchemeManager;
import run.blog.app.extension.SchemeWatcherManager;
import run.blog.app.extension.controller.DefaultControllerManager;
import run.blog.app.extension.router.ExtensionCompositeRouterFunction;

@Configuration(proxyBeanMethods = false)
public class ExtensionConfiguration {

    @Bean
    RouterFunction<ServerResponse> extensionsRouterFunction(ReactiveExtensionClient client,
        SchemeWatcherManager watcherManager, SchemeManager schemeManager) {
        return new ExtensionCompositeRouterFunction(client, watcherManager, schemeManager);
    }

    @Configuration(proxyBeanMethods = false)
    @ConditionalOnProperty(name = "blog.extension.controller.disabled",
        havingValue = "false",
        matchIfMissing = true)
    static class ExtensionControllerConfiguration {

        @Bean
        DefaultControllerManager controllerManager(ExtensionClient client) {
            return new DefaultControllerManager(client);
        }

    }

}
