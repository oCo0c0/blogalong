package run.blog.app.theme.engine;

import run.blog.app.theme.ThemeContext;

public interface ThemeTemplateAvailabilityProvider {

    boolean isTemplateAvailable(ThemeContext themeContext, String viewName);

}
