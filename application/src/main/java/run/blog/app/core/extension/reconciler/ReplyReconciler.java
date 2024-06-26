package run.blog.app.core.extension.reconciler;

import static org.apache.commons.lang3.ObjectUtils.defaultIfNull;
import static run.blog.app.extension.ExtensionUtil.addFinalizers;

import java.util.Set;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import run.blog.app.content.comment.ReplyNotificationSubscriptionHelper;
import run.blog.app.core.extension.content.Reply;
import run.blog.app.event.post.ReplyChangedEvent;
import run.blog.app.event.post.ReplyCreatedEvent;
import run.blog.app.event.post.ReplyDeletedEvent;
import run.blog.app.extension.ExtensionClient;
import run.blog.app.extension.controller.Controller;
import run.blog.app.extension.controller.ControllerBuilder;
import run.blog.app.extension.controller.Reconciler;

/**
 * Reconciler for {@link Reply}.
 *
 * @author guqing
 * @since 2.0.0
 */
@Component
@AllArgsConstructor
public class ReplyReconciler implements Reconciler<Reconciler.Request> {
    protected static final String FINALIZER_NAME = "reply-protection";

    private final ExtensionClient client;
    private final ApplicationEventPublisher eventPublisher;

    private final ReplyNotificationSubscriptionHelper replyNotificationSubscriptionHelper;

    @Override
    public Result reconcile(Request request) {
        client.fetch(Reply.class, request.name())
            .ifPresent(reply -> {
                if (reply.getMetadata().getDeletionTimestamp() != null) {
                    cleanUpResourcesAndRemoveFinalizer(request.name());
                    return;
                }
                if (addFinalizers(reply.getMetadata(), Set.of(FINALIZER_NAME))) {
                    client.update(reply);
                    eventPublisher.publishEvent(new ReplyCreatedEvent(this, reply));
                }

                if (reply.getSpec().getCreationTime() == null) {
                    reply.getSpec().setCreationTime(
                        defaultIfNull(reply.getSpec().getApprovedTime(),
                            reply.getMetadata().getCreationTimestamp()
                        )
                    );
                }
                client.update(reply);

                replyNotificationSubscriptionHelper.subscribeNewReplyReasonForReply(reply);

                eventPublisher.publishEvent(new ReplyChangedEvent(this, reply));
            });
        return new Result(false, null);
    }

    private void cleanUpResourcesAndRemoveFinalizer(String replyName) {
        client.fetch(Reply.class, replyName).ifPresent(reply -> {
            if (reply.getMetadata().getFinalizers() != null) {
                reply.getMetadata().getFinalizers().remove(FINALIZER_NAME);
            }
            client.update(reply);

            // on reply removing
            eventPublisher.publishEvent(new ReplyDeletedEvent(this, reply));
        });
    }

    @Override
    public Controller setupWith(ControllerBuilder builder) {
        return builder
            .extension(new Reply())
            .build();
    }
}
