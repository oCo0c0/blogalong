package run.blog.app.infra.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static run.blog.app.infra.utils.FileNameUtils.randomFileName;
import static run.blog.app.infra.utils.FileNameUtils.removeFileExtension;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class FileNameUtilsTest {

    @Nested
    class RemoveFileExtensionTest {

        @Test
        public void shouldNotRemoveExtIfNoExt() {
            assertEquals("blog", removeFileExtension("blog", true));
            assertEquals("blog", removeFileExtension("blog", false));
        }

        @Test
        public void shouldRemoveExtIfHasOnlyOneExt() {
            assertEquals("blog", removeFileExtension("blog.run", true));
            assertEquals("blog", removeFileExtension("blog.run", false));
        }

        @Test
        public void shouldNotRemoveExtIfDotfile() {
            assertEquals(".blog", removeFileExtension(".blog", true));
            assertEquals(".blog", removeFileExtension(".blog", false));
        }

        @Test
        public void shouldRemoveExtIfDotfileHasOneExt() {
            assertEquals(".blog", removeFileExtension(".blog.run", true));
            assertEquals(".blog", removeFileExtension(".blog.run", false));
        }

        @Test
        public void shouldRemoveExtIfHasTwoExt() {
            assertEquals("blog", removeFileExtension("blog.tar.gz", true));
            assertEquals("blog.tar", removeFileExtension("blog.tar.gz", false));
        }

        @Test
        public void shouldRemoveExtIfDotfileHasTwoExt() {
            assertEquals(".blog", removeFileExtension(".blog.tar.gz", true));
            assertEquals(".blog.tar", removeFileExtension(".blog.tar.gz", false));
        }

        @Test
        void shouldReturnNullIfFilenameIsNull() {
            assertNull(removeFileExtension(null, true));
            assertNull(removeFileExtension(null, false));
        }
    }

    @Nested
    class AppendRandomFileNameTest {
        @Test
        void normalFileName() {
            String randomFileName = randomFileName("blog.run", 3);
            assertEquals(12, randomFileName.length());
            assertTrue(randomFileName.startsWith("blog-"));
            assertTrue(randomFileName.endsWith(".run"));

            randomFileName = randomFileName(".run", 3);
            assertEquals(7, randomFileName.length());
            assertTrue(randomFileName.endsWith(".run"));

            randomFileName = randomFileName("blog", 3);
            assertEquals(8, randomFileName.length());
            assertTrue(randomFileName.startsWith("blog-"));
        }
    }
}
