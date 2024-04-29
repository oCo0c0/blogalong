package run.blog.app.core.extension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Map;
import java.util.function.Function;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import run.blog.app.core.extension.content.Post;
import run.blog.app.extension.MetadataOperator;

class PostTest {

    @Test
    void staticIsPublishedTest() {
        var test = (Function<Map<String, String>, Boolean>) (labels) -> {
            var metadata = Mockito.mock(MetadataOperator.class);
            when(metadata.getLabels()).thenReturn(labels);
            return Post.isPublished(metadata);
        };
        assertEquals(false, test.apply(Map.of()));
        assertEquals(false, test.apply(Map.of("content.blog.run/published", "false")));
        assertEquals(false, test.apply(Map.of("content.blog.run/published", "False")));
        assertEquals(false, test.apply(Map.of("content.blog.run/published", "0")));
        assertEquals(false, test.apply(Map.of("content.blog.run/published", "1")));
        assertEquals(false, test.apply(Map.of("content.blog.run/published", "T")));
        assertEquals(false, test.apply(Map.of("content.blog.run/published", "")));
        assertEquals(true, test.apply(Map.of("content.blog.run/published", "true")));
        assertEquals(true, test.apply(Map.of("content.blog.run/published", "True")));
    }
}