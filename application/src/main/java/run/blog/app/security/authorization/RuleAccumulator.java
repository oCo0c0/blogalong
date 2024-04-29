package run.blog.app.security.authorization;

import run.blog.app.core.extension.Role;

/**
 * @author guqing
 * @since 2.0.0
 */
public interface RuleAccumulator {
    boolean visit(String source, Role.PolicyRule rule, Throwable err);
}
