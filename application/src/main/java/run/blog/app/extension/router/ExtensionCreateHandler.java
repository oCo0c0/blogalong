package run.blog.app.extension.router;

import static run.blog.app.extension.router.ExtensionRouterFunctionFactory.PathPatternGenerator.buildExtensionPathPattern;

import java.net.URI;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import run.blog.app.extension.ReactiveExtensionClient;
import run.blog.app.extension.Scheme;
import run.blog.app.extension.Unstructured;
import run.blog.app.extension.exception.ExtensionConvertException;
import run.blog.app.extension.router.ExtensionRouterFunctionFactory.CreateHandler;

class ExtensionCreateHandler implements CreateHandler {

    private final Scheme scheme;

    private final ReactiveExtensionClient client;

    public ExtensionCreateHandler(Scheme scheme, ReactiveExtensionClient client) {
        this.scheme = scheme;
        this.client = client;
    }

    @Override
    @NonNull
    public Mono<ServerResponse> handle(@NonNull ServerRequest request) {
        return request.bodyToMono(Unstructured.class)
            .switchIfEmpty(Mono.error(() -> new ExtensionConvertException(
                "Cannot read body to " + scheme.groupVersionKind())))
            .flatMap(client::create)
            .flatMap(createdExt -> ServerResponse
                .created(URI.create(pathPattern() + "/" + createdExt.getMetadata().getName()))
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(createdExt));
    }

    @Override
    public String pathPattern() {
        return buildExtensionPathPattern(scheme);
    }
}
