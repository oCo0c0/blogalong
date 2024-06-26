package run.blog.app.content;

import java.time.Instant;
import run.blog.app.core.extension.content.Post;
import run.blog.app.core.extension.content.Snapshot;
import run.blog.app.extension.AbstractExtension;
import run.blog.app.extension.GVK;
import run.blog.app.extension.Metadata;
import run.blog.app.extension.MetadataUtil;

/**
 * @author guqing
 * @since 2.0.0
 */
public class TestPost {
    public static Post postV1() {
        Post post = new Post();
        post.setKind(Post.KIND);
        post.setApiVersion(getApiVersion(Post.class));
        Metadata metadata = new Metadata();
        metadata.setName("post-A");
        metadata.setVersion(1L);
        post.setMetadata(metadata);

        Post.PostSpec postSpec = new Post.PostSpec();
        post.setSpec(postSpec);

        postSpec.setTitle("post-A");
        postSpec.setBaseSnapshot(snapshotV1().getMetadata().getName());
        postSpec.setHeadSnapshot("base-snapshot");
        postSpec.setReleaseSnapshot(null);

        return post;
    }

    public static Snapshot snapshotV1() {
        Snapshot snapshot = new Snapshot();
        snapshot.setKind(Snapshot.KIND);
        snapshot.setApiVersion(getApiVersion(Snapshot.class));
        Metadata metadata = new Metadata();
        metadata.setName("snapshot-A");
        metadata.setVersion(1L);
        metadata.setCreationTimestamp(Instant.now());
        snapshot.setMetadata(metadata);
        MetadataUtil.nullSafeAnnotations(snapshot).put(Snapshot.KEEP_RAW_ANNO, "true");
        Snapshot.SnapShotSpec spec = new Snapshot.SnapShotSpec();
        snapshot.setSpec(spec);

        Snapshot.addContributor(snapshot, "guqing");
        spec.setRawType("MARKDOWN");
        spec.setRawPatch("A");
        spec.setContentPatch("<p>A</p>");

        return snapshot;
    }

    public static Snapshot snapshotV2() {
        Snapshot snapshot = new Snapshot();
        snapshot.setKind(Snapshot.KIND);
        snapshot.setApiVersion(getApiVersion(Snapshot.class));
        Metadata metadata = new Metadata();
        metadata.setCreationTimestamp(Instant.now().plusSeconds(10));
        metadata.setName("snapshot-B");
        snapshot.setMetadata(metadata);
        Snapshot.SnapShotSpec spec = new Snapshot.SnapShotSpec();
        snapshot.setSpec(spec);
        Snapshot.addContributor(snapshot, "guqing");
        spec.setRawType("MARKDOWN");
        spec.setRawPatch(PatchUtils.diffToJsonPatch("A", "B"));
        spec.setContentPatch(PatchUtils.diffToJsonPatch("<p>A</p>", "<p>B</p>"));

        return snapshot;
    }

    public static Snapshot snapshotV3() {
        Snapshot snapshotV3 = snapshotV2();
        snapshotV3.getMetadata().setName("snapshot-C");
        snapshotV3.getMetadata().setCreationTimestamp(Instant.now().plusSeconds(20));
        Snapshot.SnapShotSpec spec = snapshotV3.getSpec();
        Snapshot.addContributor(snapshotV3, "guqing");
        spec.setRawType("MARKDOWN");
        spec.setRawPatch(PatchUtils.diffToJsonPatch("B", "C"));
        spec.setContentPatch(PatchUtils.diffToJsonPatch("<p>B</p>", "<p>C</p>"));

        return snapshotV3;
    }

    public static String getApiVersion(Class<? extends AbstractExtension> extension) {
        GVK annotation = extension.getAnnotation(GVK.class);
        return annotation.group() + "/" + annotation.version();
    }
}
