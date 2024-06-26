package run.blog.app.theme.finders.impl;

import java.time.Instant;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import run.blog.app.core.extension.content.Category;
import run.blog.app.extension.ListOptions;
import run.blog.app.extension.ListResult;
import run.blog.app.extension.PageRequestImpl;
import run.blog.app.extension.ReactiveExtensionClient;
import run.blog.app.extension.index.query.QueryFactory;
import run.blog.app.extension.router.selector.FieldSelector;
import run.blog.app.theme.finders.CategoryFinder;
import run.blog.app.theme.finders.Finder;
import run.blog.app.theme.finders.vo.CategoryTreeVo;
import run.blog.app.theme.finders.vo.CategoryVo;

/**
 * A default implementation of {@link CategoryFinder}.
 *
 * @author guqing
 * @since 2.0.0
 */
@Slf4j
@Finder("categoryFinder")
public class CategoryFinderImpl implements CategoryFinder {
    private final ReactiveExtensionClient client;

    public CategoryFinderImpl(ReactiveExtensionClient client) {
        this.client = client;
    }

    @Override
    public Mono<CategoryVo> getByName(String name) {
        return client.fetch(Category.class, name)
            .map(CategoryVo::from);
    }

    @Override
    public Flux<CategoryVo> getByNames(List<String> names) {
        if (names == null) {
            return Flux.empty();
        }
        return Flux.fromIterable(names)
            .flatMap(this::getByName);
    }

    static Sort defaultSort() {
        return Sort.by(Sort.Order.desc("spec.priority"),
            Sort.Order.desc("metadata.creationTimestamp"),
            Sort.Order.desc("metadata.name"));
    }

    @Override
    public Mono<ListResult<CategoryVo>> list(Integer page, Integer size) {
        return client.listBy(Category.class, new ListOptions(),
                PageRequestImpl.of(pageNullSafe(page), sizeNullSafe(size), defaultSort())
            )
            .map(list -> {
                List<CategoryVo> categoryVos = list.get()
                    .map(CategoryVo::from)
                    .collect(Collectors.toList());
                return new ListResult<>(list.getPage(), list.getSize(), list.getTotal(),
                    categoryVos);
            })
            .defaultIfEmpty(new ListResult<>(page, size, 0L, List.of()));
    }

    @Override
    public Flux<CategoryTreeVo> listAsTree() {
        return this.toCategoryTreeVoFlux(null);
    }

    @Override
    public Flux<CategoryTreeVo> listAsTree(String name) {
        return this.toCategoryTreeVoFlux(name);
    }

    @Override
    public Flux<CategoryVo> listAll() {
        return client.listAll(Category.class, new ListOptions(), defaultSort())
            .map(CategoryVo::from);
    }

    Flux<CategoryTreeVo> toCategoryTreeVoFlux(String name) {
        return listAll()
            .collectList()
            .flatMapIterable(categoryVos -> {
                Map<String, CategoryTreeVo> nameIdentityMap = categoryVos.stream()
                    .map(CategoryTreeVo::from)
                    .collect(Collectors.toMap(categoryVo -> categoryVo.getMetadata().getName(),
                        Function.identity()));

                nameIdentityMap.forEach((nameKey, value) -> {
                    List<String> children = value.getSpec().getChildren();
                    if (children == null) {
                        return;
                    }
                    for (String child : children) {
                        CategoryTreeVo childNode = nameIdentityMap.get(child);
                        if (childNode != null) {
                            childNode.setParentName(nameKey);
                        }
                    }
                });
                return listToTree(nameIdentityMap.values(), name);
            });
    }

    static List<CategoryTreeVo> listToTree(Collection<CategoryTreeVo> list, String name) {
        Map<String, List<CategoryTreeVo>> parentNameIdentityMap = list.stream()
            .filter(categoryTreeVo -> categoryTreeVo.getParentName() != null)
            .collect(Collectors.groupingBy(CategoryTreeVo::getParentName));

        list.forEach(node -> {
            // sort children
            List<CategoryTreeVo> children =
                parentNameIdentityMap.getOrDefault(node.getMetadata().getName(), List.of())
                    .stream()
                    .sorted(defaultTreeNodeComparator())
                    .toList();
            node.setChildren(children);
        });
        return list.stream()
            .filter(v -> StringUtils.isEmpty(name) ? v.getParentName() == null
                : StringUtils.equals(v.getMetadata().getName(), name))
            .sorted(defaultTreeNodeComparator())
            .collect(Collectors.toList());
    }

    static Comparator<CategoryTreeVo> defaultTreeNodeComparator() {
        Function<CategoryTreeVo, Integer> priority =
            category -> Objects.requireNonNullElse(category.getSpec().getPriority(), 0);
        Function<CategoryTreeVo, Instant> creationTimestamp =
            category -> category.getMetadata().getCreationTimestamp();
        Function<CategoryTreeVo, String> name =
            category -> category.getMetadata().getName();
        return Comparator.comparing(priority)
            .thenComparing(creationTimestamp)
            .thenComparing(name);
    }

    static Comparator<Category> defaultComparator() {
        Function<Category, Integer> priority =
            category -> Objects.requireNonNullElse(category.getSpec().getPriority(), 0);
        Function<Category, Instant> creationTimestamp =
            category -> category.getMetadata().getCreationTimestamp();
        Function<Category, String> name =
            category -> category.getMetadata().getName();
        return Comparator.comparing(priority)
            .thenComparing(creationTimestamp)
            .thenComparing(name)
            .reversed();
    }

    @Override
    public Mono<CategoryVo> getParentByName(String name) {
        if (StringUtils.isBlank(name)) {
            return Mono.empty();
        }
        var listOptions = new ListOptions();
        listOptions.setFieldSelector(FieldSelector.of(
            QueryFactory.equal("spec.children", name)
        ));
        return client.listBy(Category.class, listOptions,
                PageRequestImpl.of(1, 1, defaultSort())
            )
            .map(ListResult::first)
            .mapNotNull(item -> item.map(CategoryVo::from).orElse(null));
    }

    int pageNullSafe(Integer page) {
        return ObjectUtils.defaultIfNull(page, 1);
    }

    int sizeNullSafe(Integer page) {
        return ObjectUtils.defaultIfNull(page, 10);
    }
}
