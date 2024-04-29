package run.blog.app.core.extension.attachment;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;
import static run.blog.app.core.extension.attachment.Group.KIND;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.Instant;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import run.blog.app.extension.AbstractExtension;
import run.blog.app.extension.GVK;

@Data
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@GVK(group = Constant.GROUP, version = Constant.VERSION, kind = KIND,
    plural = "groups", singular = "group")
public class Group extends AbstractExtension {

    public static final String KIND = "Group";
    public static final String HIDDEN_LABEL = "blog.run/hidden";

    @Schema(requiredMode = REQUIRED)
    private GroupSpec spec;

    private GroupStatus status;

    @Data
    public static class GroupSpec {

        @Schema(requiredMode = REQUIRED, description = "Display name of group")
        private String displayName;

    }

    @Data
    public static class GroupStatus {

        @Schema(description = "Update timestamp of the group")
        private Instant updateTimestamp;

        @Schema(description = "Total of attachments under the current group", minimum = "0")
        private Long totalAttachments;

    }

}
