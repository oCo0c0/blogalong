package run.blog.app.content;

import static run.blog.app.extension.router.selector.SelectorUtil.labelAndFieldSelectorToListOptions;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.lang.Nullable;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.server.ServerWebExchange;
import run.blog.app.core.extension.content.Post;
import run.blog.app.core.extension.endpoint.SortResolver;
import run.blog.app.extension.ListOptions;
import run.blog.app.extension.index.query.QueryFactory;
import run.blog.app.extension.router.IListRequest;
import run.blog.app.extension.router.selector.FieldSelector;
import run.blog.app.extension.router.selector.LabelSelector;

/**
 * A query object for {@link Post} list.
 *
 * @author guqing
 * @since 2.0.0
 */
public class PostQuery extends IListRequest.QueryListRequest {

    private final ServerWebExchange exchange;

    private final String username;

    public PostQuery(ServerRequest request) {
        this(request, null);
    }

    public PostQuery(ServerRequest request, @Nullable String username) {
        super(request.queryParams());
        this.exchange = request.exchange();
        this.username = username;
    }

    @Schema(hidden = true)
    @JsonIgnore
    public String getUsername() {
        return username;
    }

    @Nullable
    public Post.PostPhase getPublishPhase() {
        String publishPhase = queryParams.getFirst("publishPhase");
        return Post.PostPhase.from(publishPhase);
    }

    @Nullable
    @Schema(description = "Posts filtered by keyword.")
    public String getKeyword() {
        return StringUtils.defaultIfBlank(queryParams.getFirst("keyword"), null);
    }

    @ArraySchema(uniqueItems = true,
        arraySchema = @Schema(name = "sort",
            description = "Sort property and direction of the list result. Supported fields: "
                + "creationTimestamp,publishTime"),
        schema = @Schema(description = "like field,asc or field,desc",
            implementation = String.class,
            example = "creationTimestamp,desc"))
    public Sort getSort() {
        var sort = SortResolver.defaultInstance.resolve(exchange);
        sort = sort.and(Sort.by(Sort.Direction.DESC, "metadata.creationTimestamp"));
        sort = sort.and(Sort.by(Sort.Direction.DESC, "metadata.name"));
        return sort;
    }

    /**
     * Build a list options from the query object.
     *
     * @return a list options
     */
    public ListOptions toListOptions() {
        var listOptions =
            labelAndFieldSelectorToListOptions(getLabelSelector(), getFieldSelector());
        if (listOptions.getFieldSelector() == null) {
            listOptions.setFieldSelector(FieldSelector.all());
        }
        var labelSelectorBuilder = LabelSelector.builder();
        var fieldQuery = QueryFactory.all();

        String keyword = getKeyword();
        if (keyword != null) {
            fieldQuery = QueryFactory.and(fieldQuery, QueryFactory.or(
                QueryFactory.contains("status.excerpt", keyword),
                QueryFactory.contains("spec.slug", keyword),
                QueryFactory.contains("spec.title", keyword)
            ));
        }

        Post.PostPhase publishPhase = getPublishPhase();
        if (publishPhase != null) {
            if (Post.PostPhase.PENDING_APPROVAL.equals(publishPhase)) {
                fieldQuery = QueryFactory.and(fieldQuery, QueryFactory.equal(
                    "status.phase", Post.PostPhase.PENDING_APPROVAL.name())
                );
                labelSelectorBuilder.eq(Post.PUBLISHED_LABEL, BooleanUtils.FALSE);
            } else if (Post.PostPhase.PUBLISHED.equals(publishPhase)) {
                labelSelectorBuilder.eq(Post.PUBLISHED_LABEL, BooleanUtils.TRUE);
            } else {
                labelSelectorBuilder.eq(Post.PUBLISHED_LABEL, BooleanUtils.FALSE);
            }
        }

        if (StringUtils.isNotBlank(username)) {
            fieldQuery = QueryFactory.and(fieldQuery, QueryFactory.equal(
                "spec.owner", username)
            );
        }

        listOptions.setFieldSelector(listOptions.getFieldSelector().andQuery(fieldQuery));
        listOptions.setLabelSelector(
            listOptions.getLabelSelector().and(labelSelectorBuilder.build()));
        return listOptions;
    }
}
