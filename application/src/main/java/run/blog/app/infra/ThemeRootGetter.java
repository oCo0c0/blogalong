package run.blog.app.infra;

import java.nio.file.Path;
import java.util.function.Supplier;

/**
 * ThemeRootGetter allows us to get root path of themes.
 *
 * @author johnniang
 */
public interface ThemeRootGetter extends Supplier<Path> {

}
