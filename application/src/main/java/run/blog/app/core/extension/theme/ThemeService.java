package run.blog.app.core.extension.theme;

import org.reactivestreams.Publisher;
import org.springframework.core.io.buffer.DataBuffer;
import reactor.core.publisher.Mono;
import run.blog.app.core.extension.Theme;
import run.blog.app.extension.ConfigMap;

public interface ThemeService {

    Mono<Theme> install(Publisher<DataBuffer> content);

    Mono<Theme> upgrade(String themeName, Publisher<DataBuffer> content);

    Mono<Theme> reloadTheme(String name);

    Mono<ConfigMap> resetSettingConfig(String name);
    // TODO Migrate other useful methods in ThemeEndpoint in the future.

}
