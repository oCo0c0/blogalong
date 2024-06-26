package run.blog.app.extension.index;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(callSuper = true)
public class IndexDescriptor {

    private final IndexSpec spec;

    /**
     * Record whether the index is ready, managed by {@link IndexBuilder}.
     */
    private boolean ready;

    public IndexDescriptor(IndexSpec spec) {
        this.spec = spec;
    }
}
