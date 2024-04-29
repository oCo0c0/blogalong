package run.blog.app.core.extension.attachment.endpoint;

import run.blog.app.core.extension.attachment.Attachment;
import run.blog.app.core.extension.attachment.Policy;
import run.blog.app.extension.ConfigMap;

public record DeleteOption(Attachment attachment, Policy policy, ConfigMap configMap)
    implements AttachmentHandler.DeleteContext {
}
