// plugin
export enum pluginAnnotations {
  DISPLAY_NAME = "plugin.blog.run/display-name",
}

// rbac
export enum rbacAnnotations {
  MODULE = "rbac.authorization.blog.run/module",
  ROLE_NAMES = "rbac.authorization.blog.run/role-names",
  DISPLAY_NAME = "rbac.authorization.blog.run/display-name",
  DEPENDENCIES = "rbac.authorization.blog.run/dependencies",
  AVATAR_ATTACHMENT_NAME = "blog.run/avatar-attachment-name",
  LAST_AVATAR_ATTACHMENT_NAME = "blog.run/last-avatar-attachment-name",
  REDIRECT_ON_LOGIN = "rbac.authorization.blog.run/redirect-on-login",
  DISALLOW_ACCESS_CONSOLE = "rbac.authorization.blog.run/disallow-access-console",
}

// content

export enum contentAnnotations {
  PREFERRED_EDITOR = "content.blog.run/preferred-editor",
  PATCHED_CONTENT = "content.blog.run/patched-content",
  PATCHED_RAW = "content.blog.run/patched-raw",
  CONTENT_JSON = "content.blog.run/content-json",
}

// pat
export enum patAnnotations {
  ACCESS_TOKEN = "security.blog.run/access-token",
}
