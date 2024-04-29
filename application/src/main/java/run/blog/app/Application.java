package run.blog.app;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.integration.IntegrationAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.metrics.buffering.BufferingApplicationStartup;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;
import run.blog.app.infra.properties.BlogProperties;

/**
 * Blog main class.
 *
 * @author ryanwang
 * @author JohnNiang
 * @author guqing
 * @date 2017-11-14
 */
@EnableScheduling
@SpringBootApplication(scanBasePackages = "run.blog.app", exclude =
    IntegrationAutoConfiguration.class)
@EnableConfigurationProperties({BlogProperties.class})
public class Application {

    public static void main(String[] args) {
        new SpringApplicationBuilder(Application.class)
            .applicationStartup(new BufferingApplicationStartup(1024))
            .run(args);
    }

}
