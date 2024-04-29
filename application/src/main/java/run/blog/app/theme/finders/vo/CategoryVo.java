package run.blog.app.theme.finders.vo;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Value;
import run.blog.app.core.extension.content.Category;
import run.blog.app.extension.MetadataOperator;

/**
 * A value object for {@link Category}.
 *
 * @author guqing
 * @since 2.0.0
 */
@Value
@Builder
@EqualsAndHashCode
public class CategoryVo implements ExtensionVoOperator {

    MetadataOperator metadata;

    Category.CategorySpec spec;

    Category.CategoryStatus status;

    Integer postCount;

    /**
     * Convert {@link Category} to {@link CategoryVo}.
     *
     * @param category category extension
     * @return category value object
     */
    public static CategoryVo from(Category category) {
        return CategoryVo.builder()
            .metadata(category.getMetadata())
            .spec(category.getSpec())
            .status(category.getStatus())
            .postCount(category.getStatusOrDefault().visiblePostCount)
            .build();
    }
}
