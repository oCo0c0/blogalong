package run.blog.app.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.SpecVersion;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    OpenAPI blogOpenApi() {
        return new OpenAPI(SpecVersion.V30)
            // See https://swagger.io/docs/specification/authentication/ for more.
            .components(new Components()
                .addSecuritySchemes("BasicAuth", new SecurityScheme()
                    .type(SecurityScheme.Type.HTTP).scheme("basic"))
                .addSecuritySchemes("BearerAuth", new SecurityScheme()
                    .type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT"))
            )
            .addSecurityItem(new SecurityRequirement().addList("BasicAuth").addList("BearerAuth"))
            .info(new Info().title("Blog Next API")
                .version("2.0.0"));
    }

    @Bean
    GroupedOpenApi extensionCoreApi() {
        return GroupedOpenApi.builder()
            .group("core-api")
            .displayName("Core APIs")
            .pathsToMatch("/api/**")
            .build();
    }

    @Bean
    GroupedOpenApi extensionApi() {
        return GroupedOpenApi.builder()
            .group("extension-api")
            .displayName("Extension APIs")
            .pathsToMatch("/apis/**")
            .pathsToExclude("/apis/api.console.blog.run/**", "/apis/api.blog.run/**",
                "/apis/api.plugin.blog.run/**")
            .build();
    }

    @Bean
    GroupedOpenApi systemCustomApi() {
        return GroupedOpenApi.builder()
            .group("core-custom-api")
            .displayName("Custom APIs in Core")
            .pathsToMatch("/apis/api.console.blog.run/**")
            .build();
    }

    @Bean
    GroupedOpenApi customApi() {
        return GroupedOpenApi.builder()
            .group("api.blog.run")
            .displayName("api.blog.run")
            .pathsToMatch("/apis/api.blog.run/**")
            .build();
    }

    @Bean
    GroupedOpenApi pluginCustomApi() {
        return GroupedOpenApi.builder()
            .group("plugin-custom-api")
            .displayName("Custom APIs in Plugin")
            .pathsToMatch("/apis/api.plugin.blog.run/**")
            .build();
    }

    @Bean
    GroupedOpenApi userCenterApi() {
        return GroupedOpenApi.builder()
            .group("uc.api")
            .displayName("User center APIs.")
            .pathsToMatch("/apis/uc.api.*/**")
            .build();
    }

    @Bean
    GroupedOpenApi allApi() {
        return GroupedOpenApi.builder()
            .group("all-api")
            .displayName("All APIs")
            .pathsToMatch("/api/**", "/apis/**", "/login/**")
            .build();
    }

}
