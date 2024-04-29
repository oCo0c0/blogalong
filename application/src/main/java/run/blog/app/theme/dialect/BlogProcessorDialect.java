package run.blog.app.theme.dialect;

import java.util.HashSet;
import java.util.Set;
import org.thymeleaf.dialect.AbstractProcessorDialect;
import org.thymeleaf.dialect.IExpressionObjectDialect;
import org.thymeleaf.expression.IExpressionObjectFactory;
import org.thymeleaf.processor.IProcessor;
import org.thymeleaf.standard.StandardDialect;

/**
 * Thymeleaf processor dialect for Blog.
 *
 * @author guqing
 * @since 2.0.0
 */
public class BlogProcessorDialect extends AbstractProcessorDialect implements
    IExpressionObjectDialect {
    private static final String DIALECT_NAME = "blogThemeProcessorDialect";

    private static final IExpressionObjectFactory BLOG_EXPRESSION_OBJECTS_FACTORY =
        new BlogExpressionObjectFactory();

    public BlogProcessorDialect() {
        // We will set this dialect the same "dialect processor" precedence as
        // the Standard Dialect, so that processor executions can interleave.
        super(DIALECT_NAME, "blog", StandardDialect.PROCESSOR_PRECEDENCE);
    }

    @Override
    public Set<IProcessor> getProcessors(String dialectPrefix) {
        final Set<IProcessor> processors = new HashSet<IProcessor>();
        // add more processors
        processors.add(new GlobalHeadInjectionProcessor(dialectPrefix));
        processors.add(new TemplateFooterElementTagProcessor(dialectPrefix));
        processors.add(new JsonNodePropertyAccessorBoundariesProcessor());
        processors.add(new CommentElementTagProcessor(dialectPrefix));
        processors.add(new CommentEnabledVariableProcessor());
        return processors;
    }

    @Override
    public IExpressionObjectFactory getExpressionObjectFactory() {
        return BLOG_EXPRESSION_OBJECTS_FACTORY;
    }
}
