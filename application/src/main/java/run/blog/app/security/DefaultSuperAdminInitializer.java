package run.blog.app.security;

import java.time.Instant;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import run.blog.app.core.extension.Role;
import run.blog.app.core.extension.RoleBinding;
import run.blog.app.core.extension.RoleBinding.RoleRef;
import run.blog.app.core.extension.RoleBinding.Subject;
import run.blog.app.core.extension.User;
import run.blog.app.core.extension.User.UserSpec;
import run.blog.app.extension.Metadata;
import run.blog.app.extension.ReactiveExtensionClient;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultSuperAdminInitializer implements SuperAdminInitializer {

    private final ReactiveExtensionClient client;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Mono<Void> initialize(InitializationParam param) {
        return client.fetch(User.class, param.getUsername())
            .switchIfEmpty(Mono.defer(() -> client.create(
                    createAdmin(param.getUsername(), param.getPassword(), param.getEmail())))
                .flatMap(admin -> {
                    var binding = bindAdminAndSuperRole(admin);
                    return client.create(binding).thenReturn(admin);
                })
            )
            .then();
    }

    RoleBinding bindAdminAndSuperRole(User admin) {
        String adminUserName = admin.getMetadata().getName();
        var metadata = new Metadata();
        String name =
            String.join("-", adminUserName, SUPER_ROLE_NAME, "binding");
        metadata.setName(name);
        var roleRef = new RoleRef();
        roleRef.setName(SUPER_ROLE_NAME);
        roleRef.setApiGroup(Role.GROUP);
        roleRef.setKind(Role.KIND);

        var subject = new Subject();
        subject.setName(adminUserName);
        subject.setApiGroup(admin.groupVersionKind().group());
        subject.setKind(admin.groupVersionKind().kind());

        var roleBinding = new RoleBinding();
        roleBinding.setMetadata(metadata);
        roleBinding.setRoleRef(roleRef);
        roleBinding.setSubjects(List.of(subject));

        return roleBinding;
    }

    User createAdmin(String username, String password, String email) {
        var metadata = new Metadata();
        metadata.setName(username);

        var spec = new UserSpec();
        spec.setDisplayName("Administrator");
        spec.setDisabled(false);
        spec.setRegisteredAt(Instant.now());
        spec.setTwoFactorAuthEnabled(false);
        spec.setEmail(email);
        spec.setPassword(passwordEncoder.encode(password));

        var user = new User();
        user.setMetadata(metadata);
        user.setSpec(spec);
        return user;
    }
}
