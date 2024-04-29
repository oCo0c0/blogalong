package run.blog.app.console;

import static run.blog.app.console.WebSocketUtils.isWebSocketUpgrade;

import org.springframework.web.reactive.function.server.RequestPredicate;
import org.springframework.web.reactive.function.server.ServerRequest;

public class WebSocketRequestPredicate implements RequestPredicate {

    @Override
    public boolean test(ServerRequest request) {
        var httpHeaders = request.exchange().getRequest().getHeaders();
        return isWebSocketUpgrade(httpHeaders);
    }
}
