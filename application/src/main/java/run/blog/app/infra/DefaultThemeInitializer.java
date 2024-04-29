package run.blog.app.infra;

import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StreamUtils;
import run.blog.app.core.extension.theme.ThemeService;
import run.blog.app.infra.properties.BlogProperties;
import run.blog.app.infra.properties.ThemeProperties;
import run.blog.app.infra.utils.FileUtils;

@Slf4j
@Component
public class DefaultThemeInitializer implements ApplicationListener<ApplicationStartedEvent> {

    private final ThemeService themeService;

    private final ThemeRootGetter themeRoot;

    private final ThemeProperties themeProps;

    public DefaultThemeInitializer(ThemeService themeService, ThemeRootGetter themeRoot,
        BlogProperties blogProperties) {
        this.themeService = themeService;
        this.themeRoot = themeRoot;
        this.themeProps = blogProperties.getTheme();
    }

    @Override
    public void onApplicationEvent(ApplicationStartedEvent event) {
        if (themeProps.getInitializer().isDisabled()) {
            log.debug("Skipped initializing default theme due to disabled");
            return;
        }
        var themeRoot = this.themeRoot.get();
        var location = themeProps.getInitializer().getLocation();
        try {
            // TODO Checking if any themes are installed here in the future might be better?
            if (!FileUtils.isEmpty(themeRoot)) {
                log.debug("Skipped initializing default theme because there are themes "
                          + "inside theme root");
                return;
            }
            log.info("Initializing default theme from {}", location);
            var themeUrl = ResourceUtils.getURL(location);
            var content = DataBufferUtils.read(new UrlResource(themeUrl),
                DefaultDataBufferFactory.sharedInstance,
                StreamUtils.BUFFER_SIZE);
            var theme = themeService.install(content).block();
            log.info("Initialized default theme: {}", theme);
            // Because default active theme is default, we don't need to enabled it manually.
        } catch (IOException e) {
            // we should skip the initialization error at here
            log.warn("Failed to initialize theme from " + location, e);
        }
    }


}
