package run.blog.app.content.comment;

import static run.blog.app.extension.index.query.QueryFactory.equal;
import static run.blog.app.extension.router.selector.SelectorUtil.labelAndFieldSelectorToListOptions;

import io.swagger.v3.oas.annotations.media.Schema;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.ServerWebInputException;
import run.blog.app.core.extension.content.Reply;
import run.blog.app.extension.ListOptions;
import run.blog.app.extension.PageRequest;
import run.blog.app.extension.PageRequestImpl;
import run.blog.app.extension.router.SortableRequest;

/**
 * Query criteria for {@link Reply} list.
 *
 * @author guqing
 * @since 2.0.0
 */
public class ReplyQuery extends SortableRequest {

    public ReplyQuery(ServerWebExchange exchange) {
        super(exchange);
    }

    @Schema(description = "Replies filtered by commentName.")
    public String getCommentName() {
        String commentName = queryParams.getFirst("commentName");
        if (StringUtils.isBlank(commentName)) {
            throw new ServerWebInputException("The required parameter 'commentName' is missing.");
        }
        return commentName;
    }

    /**
     * Build list options from query criteria.
     */
    public ListOptions toListOptions() {
        var listOptions =
            labelAndFieldSelectorToListOptions(getLabelSelector(), getFieldSelector());
        var newFieldSelector = listOptions.getFieldSelector()
            .andQuery(equal("spec.commentName", getCommentName()));
        listOptions.setFieldSelector(newFieldSelector);
        return listOptions;
    }

    public PageRequest toPageRequest() {
        var sort = getSort().and(Sort.by("spec.creationTime").ascending());
        return PageRequestImpl.of(getPage(), getSize(), sort);
    }
}
