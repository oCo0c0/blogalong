package run.blog.app.search.post;

import java.util.List;
import java.util.Set;
import org.pf4j.ExtensionPoint;
import run.blog.app.search.SearchParam;
import run.blog.app.search.SearchResult;

public interface PostSearchService extends ExtensionPoint {

    SearchResult<PostHit> search(SearchParam searchParam) throws Exception;

    void addDocuments(List<PostDoc> posts) throws Exception;

    void removeDocuments(Set<String> postNames) throws Exception;

    void removeAllDocuments() throws Exception;

}
