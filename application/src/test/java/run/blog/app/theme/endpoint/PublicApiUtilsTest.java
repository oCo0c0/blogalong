package run.blog.app.theme.endpoint;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.jupiter.api.Test;
import run.blog.app.extension.AbstractExtension;
import run.blog.app.extension.GVK;
import run.blog.app.extension.GroupVersion;

/**
 * Tests for {@link PublicApiUtils}.
 *
 * @author guqing
 * @since 2.5.0
 */
class PublicApiUtilsTest {

    @Test
    void groupVersion() {
        GroupVersion groupVersion = PublicApiUtils.groupVersion(new FakExtension());
        assertThat(groupVersion.toString()).isEqualTo("api.blog.run/v1alpha1");

        groupVersion = PublicApiUtils.groupVersion(new FakeGroupExtension());
        assertThat(groupVersion.toString()).isEqualTo("api.fake.blog.run/v1");
    }

    @Test
    void containsElement() {
        assertThat(PublicApiUtils.containsElement(null, null)).isFalse();
        assertThat(PublicApiUtils.containsElement(null, "test")).isFalse();
        assertThat(PublicApiUtils.containsElement(List.of("test"), null)).isFalse();
        assertThat(PublicApiUtils.containsElement(List.of("test"), "test")).isTrue();
        assertThat(PublicApiUtils.containsElement(List.of("test"), "test1")).isFalse();
    }

    @GVK(group = "fake.blog.run", version = "v1", kind = "FakeGroupExtension", plural =
        "fakegroupextensions", singular = "fakegroupextension")
    static class FakeGroupExtension extends AbstractExtension {

    }

    @GVK(group = "", version = "v1alpha1", kind = "FakeExtension", plural =
        "fakeextensions", singular = "fakeextension")
    static class FakExtension extends AbstractExtension {

    }
}