package run.blog.app.extension.index.query;

import java.util.NavigableSet;

public class All extends SimpleQuery {

    public All(String fieldName) {
        super(fieldName, null);
    }

    @Override
    public NavigableSet<String> matches(QueryIndexView indexView) {
        return indexView.getAllIdsForField(fieldName);
    }
}
