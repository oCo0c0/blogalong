package run.blog.app.extension.router;

import static run.blog.app.extension.router.ExtensionRouterFunctionFactory.PathPatternGenerator.buildExtensionPathPattern;

import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import run.blog.app.extension.ReactiveExtensionClient;
import run.blog.app.extension.Scheme;
import run.blog.app.extension.router.ExtensionRouterFunctionFactory.DeleteHandler;

class ExtensionDeleteHandler implements DeleteHandler {

    private final Scheme scheme;

    private final ReactiveExtensionClient client;

    ExtensionDeleteHandler(Scheme scheme, ReactiveExtensionClient client) {
        this.scheme = scheme;
        this.client = client;
    }

    @Override
    public Mono<ServerResponse> handle(ServerRequest request) {
        var name = request.pathVariable("name");
        return client.get(scheme.type(), name)
            .flatMap(client::delete)
            .flatMap(deleted -> ServerResponse
                .ok()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(deleted));
    }

    @Override
    public String pathPattern() {
        return buildExtensionPathPattern(scheme) + "/{name}";
    }

}
