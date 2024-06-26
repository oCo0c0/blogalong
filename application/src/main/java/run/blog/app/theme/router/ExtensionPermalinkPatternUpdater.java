package run.blog.app.theme.router;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.ApplicationListener;
import org.springframework.data.domain.Sort;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import run.blog.app.core.extension.content.Category;
import run.blog.app.core.extension.content.Constant;
import run.blog.app.core.extension.content.Post;
import run.blog.app.core.extension.content.Tag;
import run.blog.app.extension.AbstractExtension;
import run.blog.app.extension.Extension;
import run.blog.app.extension.ExtensionClient;
import run.blog.app.extension.ListOptions;
import run.blog.app.extension.MetadataOperator;
import run.blog.app.extension.MetadataUtil;
import run.blog.app.theme.DefaultTemplateEnum;

/**
 * {@link ExtensionPermalinkPatternUpdater} to update the value of key
 * {@link Constant#PERMALINK_PATTERN_ANNO} in {@link MetadataOperator#getAnnotations()}
 * of {@link Extension} when the pattern changed.
 *
 * @author guqing
 * @see Post
 * @see Category
 * @see Tag
 * @since 2.0.0
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ExtensionPermalinkPatternUpdater
    implements ApplicationListener<PermalinkRuleChangedEvent> {
    private final ExtensionClient client;

    @Override
    public void onApplicationEvent(@NonNull PermalinkRuleChangedEvent event) {
        DefaultTemplateEnum template = event.getTemplate();
        log.debug("Refresh permalink for template [{}]", template.getValue());
        String pattern = event.getRule();
        switch (template) {
            case POST -> updatePostPermalink(pattern);
            case CATEGORY -> updateCategoryPermalink(pattern);
            case TAG -> updateTagPermalink(pattern);
            default -> {
            }
        }
    }

    private void updatePostPermalink(String pattern) {
        log.debug("Update post permalink by new policy [{}]", pattern);
        client.listAll(Post.class, new ListOptions(), Sort.unsorted())
            .forEach(post -> updateIfPermalinkPatternChanged(post, pattern));
    }

    private void updateIfPermalinkPatternChanged(AbstractExtension extension, String pattern) {
        Map<String, String> annotations = MetadataUtil.nullSafeAnnotations(extension);
        String oldPattern = annotations.get(Constant.PERMALINK_PATTERN_ANNO);
        annotations.put(Constant.PERMALINK_PATTERN_ANNO, pattern);

        if (StringUtils.equals(oldPattern, pattern) && StringUtils.isNotBlank(oldPattern)) {
            return;
        }
        // update permalink pattern annotation
        client.update(extension);
    }

    private void updateCategoryPermalink(String pattern) {
        log.debug("Update category and categories permalink by new policy [{}]", pattern);
        client.listAll(Category.class, new ListOptions(), Sort.unsorted())
            .forEach(category -> updateIfPermalinkPatternChanged(category, pattern));
    }

    private void updateTagPermalink(String pattern) {
        log.debug("Update tag and tags permalink by new policy [{}]", pattern);
        client.listAll(Tag.class, new ListOptions(), Sort.unsorted())
            .forEach(tag -> updateIfPermalinkPatternChanged(tag, pattern));
    }
}
