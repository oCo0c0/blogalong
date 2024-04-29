package run.blog.app.notification;

import static run.blog.app.extension.index.query.QueryFactory.and;
import static run.blog.app.extension.index.query.QueryFactory.contains;
import static run.blog.app.extension.index.query.QueryFactory.equal;
import static run.blog.app.extension.index.query.QueryFactory.or;
import static run.blog.app.extension.router.selector.SelectorUtil.labelAndFieldSelectorToListOptions;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.lang.Nullable;
import org.springframework.web.server.ServerWebExchange;
import run.blog.app.core.extension.endpoint.SortResolver;
import run.blog.app.extension.ListOptions;
import run.blog.app.extension.PageRequest;
import run.blog.app.extension.PageRequestImpl;
import run.blog.app.extension.router.IListRequest;
import run.blog.app.extension.router.selector.FieldSelector;

/**
 * Notification query object for authenticated user.
 *
 * @author guqing
 * @since 2.10.0
 */
public class UserNotificationQuery extends IListRequest.QueryListRequest {

    private final ServerWebExchange exchange;

    private final String username;

    public UserNotificationQuery(ServerWebExchange exchange, String username) {
        super(exchange.getRequest().getQueryParams());
        this.exchange = exchange;
        this.username = username;
    }

    @Nullable
    public String getKeyword() {
        return StringUtils.defaultIfBlank(queryParams.getFirst("keyword"), null);
    }

    @ArraySchema(uniqueItems = true,
        arraySchema = @Schema(name = "sort",
            description = "Sort property and direction of the list result. Supported fields: "
                + "metadata.creationTimestamp"),
        schema = @Schema(description = "like field,asc or field,desc",
            implementation = String.class,
            example = "creationTimestamp,desc"))
    public Sort getSort() {
        var sort = SortResolver.defaultInstance.resolve(exchange);
        return sort.and(Sort.by(
            Sort.Order.desc("metadata.creationTimestamp"),
            Sort.Order.desc("metadata.name"))
        );
    }

    /**
     * Build a list options from the query object.
     */
    public ListOptions toListOptions() {
        var listOptions =
            labelAndFieldSelectorToListOptions(getLabelSelector(), getFieldSelector());
        var filedQuery = listOptions.getFieldSelector().query();
        if (StringUtils.isNotBlank(getKeyword())) {
            filedQuery = and(filedQuery,
                or(
                    contains("spec.title", getKeyword()),
                    contains("spec.rawContent", getKeyword())
                )
            );
        }
        if (StringUtils.isNotBlank(username)) {
            filedQuery = and(filedQuery, equal("spec.recipient", username));
        }
        listOptions.setFieldSelector(FieldSelector.of(filedQuery));
        return listOptions;
    }

    public PageRequest toPageRequest() {
        return PageRequestImpl.of(getPage(), getSize(), getSort());
    }
}
