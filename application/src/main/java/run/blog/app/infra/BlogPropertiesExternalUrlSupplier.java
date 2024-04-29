package run.blog.app.infra;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import org.springframework.boot.autoconfigure.web.reactive.WebFluxProperties;
import org.springframework.http.HttpRequest;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import run.blog.app.infra.properties.BlogProperties;

/**
 * Default implementation for getting external url from blog properties.
 *
 * @author johnniang
 */
@Component
public class BlogPropertiesExternalUrlSupplier implements ExternalUrlSupplier {

    private final BlogProperties blogProperties;

    private final WebFluxProperties webFluxProperties;

    public BlogPropertiesExternalUrlSupplier(BlogProperties blogProperties,
        WebFluxProperties webFluxProperties) {
        this.blogProperties = blogProperties;
        this.webFluxProperties = webFluxProperties;
    }

    @Override
    public URI get() {
        if (!blogProperties.isUseAbsolutePermalink()) {
            return URI.create(getBasePath());
        }

        try {
            return blogProperties.getExternalUrl().toURI();
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public URL getURL(HttpRequest request) {
        var externalUrl = blogProperties.getExternalUrl();
        if (externalUrl == null) {
            try {
                externalUrl = request.getURI().resolve(getBasePath()).toURL();
            } catch (MalformedURLException e) {
                throw new RuntimeException("Cannot parse request URI to URL.", e);
            }
        }
        return externalUrl;
    }

    @Nullable
    @Override
    public URL getRaw() {
        return blogProperties.getExternalUrl();
    }

    private String getBasePath() {
        var basePath = webFluxProperties.getBasePath();
        if (!StringUtils.hasText(basePath)) {
            basePath = "/";
        }
        return basePath;
    }
}
