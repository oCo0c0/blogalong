package run.blog.app.extension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Locale;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import run.blog.app.extension.exception.ExtensionConvertException;
import run.blog.app.extension.exception.SchemaViolationException;
import run.blog.app.extension.index.IndexSpecRegistry;
import run.blog.app.extension.store.ExtensionStore;

class JsonExtensionConverterTest {

    JSONExtensionConverter converter;

    ObjectMapper objectMapper;

    Locale localeDefault;

    @BeforeEach
    void setUp() {
        localeDefault = Locale.getDefault();
        Locale.setDefault(Locale.ENGLISH);
        var indexSpecRegistry = mock(IndexSpecRegistry.class);

        DefaultSchemeManager schemeManager = new DefaultSchemeManager(indexSpecRegistry, null);
        converter = new JSONExtensionConverter(schemeManager);
        objectMapper = converter.getObjectMapper();

        schemeManager.register(FakeExtension.class);
    }

    @AfterEach
    void cleanUp() {
        Locale.setDefault(localeDefault);
    }

    @Test
    void convertTo() throws IOException {
        var fake = createFakeExtension("fake", 10L);

        var extensionStore = converter.convertTo(fake);

        assertEquals("/registry/fake.blog.run/fakes/fake", extensionStore.getName());
        assertEquals(10L, extensionStore.getVersion());
        assertEquals(fake, objectMapper.readValue(extensionStore.getData(), FakeExtension.class));
    }

    @Test
    void convertFrom() throws JsonProcessingException {
        var fake = createFakeExtension("fake", 20L);

        var store = new ExtensionStore();
        store.setName("/registry/fake.blog.run/fakes/fake");
        store.setVersion(20L);
        store.setData(objectMapper.writeValueAsBytes(fake));

        FakeExtension gotFake = converter.convertFrom(FakeExtension.class, store);
        assertEquals(fake, gotFake);
    }

    @Test
    void shouldThrowConvertExceptionWhenDataIsInvalid() {
        var store = new ExtensionStore();
        store.setName("/registry/fake.blog.run/fakes/fake");
        store.setVersion(20L);
        store.setData("{".getBytes());

        assertThrows(ExtensionConvertException.class,
            () -> converter.convertFrom(FakeExtension.class, store));
    }

    @Test
    void shouldThrowSchemaViolationExceptionWhenNameNotSet() {
        var fake = new FakeExtension();
        Metadata metadata = new Metadata();
        fake.setMetadata(metadata);
        fake.setApiVersion("fake.blog.run/v1alpha1");
        fake.setKind("Fake");
        var error = assertThrows(SchemaViolationException.class, () -> converter.convertTo(fake));
        assertEquals(1, error.getErrors().size());
        var result = error.getErrors().items().get(0);
        assertEquals(1026, result.code());
        assertEquals("Field 'name' is required.", result.message());
    }

    FakeExtension createFakeExtension(String name, Long version) {
        var fake = new FakeExtension();
        fake.groupVersionKind(new GroupVersionKind("fake.blog.run", "v1alpha1", "Fake"));
        Metadata metadata = new Metadata();
        metadata.setName(name);
        metadata.setVersion(version);
        fake.setMetadata(metadata);

        return fake;
    }
}