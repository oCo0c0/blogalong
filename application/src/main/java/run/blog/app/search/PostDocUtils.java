package run.blog.app.search;

import run.blog.app.search.post.PostDoc;
import run.blog.app.theme.finders.vo.PostVo;

public enum PostDocUtils {
    ;

    // TODO Move this static method to other place.
    public static PostDoc from(PostVo postVo) {
        return new PostDoc(
            postVo.getMetadata().getName(),
            postVo.getSpec().getTitle(),
            postVo.getStatus().getExcerpt(),
            postVo.getContent().getContent(),
            postVo.getSpec().getPublishTime(),
            postVo.getStatus().getPermalink()
        );
    }
}
