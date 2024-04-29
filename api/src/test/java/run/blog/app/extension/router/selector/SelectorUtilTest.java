package run.blog.app.extension.router.selector;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static run.blog.app.extension.router.selector.SelectorUtil.labelAndFieldSelectorToPredicate;

import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import run.blog.app.extension.Extension;
import run.blog.app.extension.FakeExtension;
import run.blog.app.extension.Metadata;

class SelectorUtilTest {

    @Test
    void shouldConvertCorrectlyIfSelectorsAreNull() {
        var predicate = labelAndFieldSelectorToPredicate(null, null);
        assertTrue(predicate.test(mock(Extension.class)));
    }

    @Test
    void shouldConvertCorrectlyIfSelectorsAreNotNull() {
        var predicate = labelAndFieldSelectorToPredicate(List.of("label-name=label-value"),
            List.of("name=fake-name"));
        assertNotNull(predicate);

        var fake = new FakeExtension();
        var metadata = new Metadata();
        fake.setMetadata(metadata);
        assertFalse(predicate.test(fake));

        metadata.setName("fake-name");
        assertFalse(predicate.test(fake));

        metadata.setLabels(Map.of("label-name", "label-value"));
        assertTrue(predicate.test(fake));

        metadata.setName("invalid-name");
        assertFalse(predicate.test(fake));
    }
}