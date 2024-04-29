package run.blog.app.core.extension.reconciler;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.BooleanUtils;
import org.springframework.stereotype.Component;
import run.blog.app.core.extension.AuthProvider;
import run.blog.app.extension.ExtensionClient;
import run.blog.app.extension.MetadataUtil;
import run.blog.app.extension.controller.Controller;
import run.blog.app.extension.controller.ControllerBuilder;
import run.blog.app.extension.controller.Reconciler;
import run.blog.app.security.AuthProviderService;

/**
 * Reconciler for {@link AuthProvider}.
 *
 * @author guqing
 * @since 2.4.0
 */
@Component
@RequiredArgsConstructor
public class AuthProviderReconciler implements Reconciler<Reconciler.Request> {
    private final ExtensionClient client;
    private final AuthProviderService authProviderService;

    @Override
    public Result reconcile(Request request) {
        client.fetch(AuthProvider.class, request.name())
            .ifPresent(this::handlePrivileged);
        return Result.doNotRetry();
    }

    @Override
    public Controller setupWith(ControllerBuilder builder) {
        return builder
            .extension(new AuthProvider())
            .build();
    }

    private void handlePrivileged(AuthProvider authProvider) {
        if (privileged(authProvider)) {
            authProviderService.enable(authProvider.getMetadata().getName()).block();
        }
    }

    private boolean privileged(AuthProvider authProvider) {
        return BooleanUtils.TRUE.equals(MetadataUtil.nullSafeLabels(authProvider)
            .get(AuthProvider.PRIVILEGED_LABEL));
    }
}
