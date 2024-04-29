package run.blog.app.security;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.Instant;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import run.blog.app.extension.AbstractExtension;
import run.blog.app.extension.GVK;

@Data
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@GVK(group = "security.blog.run", version = "v1alpha1", kind = PersonalAccessToken.KIND,
    plural = "personalaccesstokens", singular = "personalaccesstoken")
public class PersonalAccessToken extends AbstractExtension {

    public static final String KIND = "PersonalAccessToken";

    private Spec spec = new Spec();

    @Data
    @Schema(name = "PatSpec")
    public static class Spec {

        @Schema(requiredMode = REQUIRED)
        private String name;

        private String description;

        private Instant expiresAt;

        private List<String> roles;

        private List<String> scopes;

        @Schema(requiredMode = REQUIRED)
        private String username;

        private boolean revoked;

        private Instant revokesAt;

        private Instant lastUsed;

        @Schema(requiredMode = REQUIRED)
        private String tokenId;

    }
}
