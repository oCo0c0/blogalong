<script lang="ts" setup>
// core libs
import { computed, nextTick, ref, watch } from "vue";
import { apiClient } from "@/utils/api-client";

// components
import {
  IconRefreshLine,
  Toast,
  VButton,
  VModal,
  VSpace,
} from "@blogalong/components";
import SubmitButton from "@/components/button/SubmitButton.vue";

// types
import type { Category } from "@blogalong/api-client";

// libs
import { cloneDeep } from "lodash-es";
import { reset } from "@formkit/core";
import { setFocus } from "@/formkit/utils/focus";
import { useThemeCustomTemplates } from "@console/modules/interface/themes/composables/use-theme";
import AnnotationsForm from "@/components/form/AnnotationsForm.vue";
import useSlugify from "@console/composables/use-slugify";
import { useI18n } from "vue-i18n";
import { FormType } from "@/types/slug";

const props = withDefaults(
  defineProps<{
    visible: boolean;
    category?: Category;
    parentCategory?: Category;
  }>(),
  {
    visible: false,
    category: undefined,
    parentCategory: undefined,
  }
);

const emit = defineEmits<{
  (event: "update:visible", visible: boolean): void;
  (event: "close"): void;
}>();

const { t } = useI18n();

const initialFormState: Category = {
  spec: {
    displayName: "",
    slug: "",
    description: "",
    cover: "",
    template: "",
    priority: 0,
    children: [],
  },
  status: {},
  apiVersion: "content.blog.run/v1alpha1",
  kind: "Category",
  metadata: {
    name: "",
    generateName: "category-",
  },
};

const formState = ref<Category>(cloneDeep(initialFormState));
const selectedParentCategory = ref("");
const saving = ref(false);

const isUpdateMode = computed(() => {
  return !!formState.value.metadata.creationTimestamp;
});

const modalTitle = computed(() => {
  return isUpdateMode.value
    ? t("core.post_category.editing_modal.titles.update")
    : t("core.post_category.editing_modal.titles.create");
});

const annotationsFormRef = ref<InstanceType<typeof AnnotationsForm>>();

const handleSaveCategory = async () => {
  annotationsFormRef.value?.handleSubmit();
  await nextTick();

  const { customAnnotations, annotations, customFormInvalid, specFormInvalid } =
    annotationsFormRef.value || {};
  if (customFormInvalid || specFormInvalid) {
    return;
  }

  formState.value.metadata.annotations = {
    ...annotations,
    ...customAnnotations,
  };

  try {
    saving.value = true;
    if (isUpdateMode.value) {
      await apiClient.extension.category.updatecontentBlogRunV1alpha1Category({
        name: formState.value.metadata.name,
        category: formState.value,
      });
    } else {
      // Gets parent category, calculates priority and updates it.
      let parentCategory: Category | undefined = undefined;

      if (selectedParentCategory.value) {
        const { data } =
          await apiClient.extension.category.getcontentBlogRunV1alpha1Category({
            name: selectedParentCategory.value,
          });
        parentCategory = data;
      }

      const priority = parentCategory?.spec.children
        ? parentCategory.spec.children.length + 1
        : 0;

      formState.value.spec.priority = priority;

      const { data: createdCategory } =
        await apiClient.extension.category.createcontentBlogRunV1alpha1Category(
          {
            category: formState.value,
          }
        );

      if (parentCategory) {
        parentCategory.spec.children = Array.from(
          new Set([
            ...(parentCategory.spec.children || []),
            createdCategory.metadata.name,
          ])
        );

        await apiClient.extension.category.updatecontentBlogRunV1alpha1Category(
          {
            name: selectedParentCategory.value,
            category: parentCategory,
          }
        );
      }
    }
    onVisibleChange(false);

    Toast.success(t("core.common.toast.save_success"));
  } catch (e) {
    console.error("Failed to create category", e);
  } finally {
    saving.value = false;
  }
};

const onVisibleChange = (visible: boolean) => {
  emit("update:visible", visible);
  if (!visible) {
    emit("close");
  }
};

const handleResetForm = () => {
  selectedParentCategory.value = "";
  formState.value = cloneDeep(initialFormState);
  reset("category-form");
};

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      if (props.parentCategory) {
        selectedParentCategory.value = props.parentCategory.metadata.name;
      }

      if (props.category) {
        formState.value = cloneDeep(props.category);
      }

      setFocus("displayNameInput");
    } else {
      handleResetForm();
    }
  }
);

// custom templates
const { templates } = useThemeCustomTemplates("category");

// slug
const { handleGenerateSlug } = useSlugify(
  computed(() => formState.value.spec.displayName),
  computed({
    get() {
      return formState.value.spec.slug;
    },
    set(value) {
      formState.value.spec.slug = value;
    },
  }),
  computed(() => !isUpdateMode.value),
  FormType.CATEGORY
);
</script>
<template>
  <VModal
    :title="modalTitle"
    :visible="visible"
    :width="700"
    @update:visible="onVisibleChange"
  >
    <FormKit
      id="category-form"
      type="form"
      name="category-form"
      :config="{ validationVisibility: 'submit' }"
      @submit="handleSaveCategory"
    >
      <div>
        <div class="md:grid md:grid-cols-4 md:gap-6">
          <div class="md:col-span-1">
            <div class="sticky top-0">
              <span class="text-base font-medium text-gray-900">
                {{ $t("core.post_category.editing_modal.groups.general") }}
              </span>
            </div>
          </div>
          <div class="mt-5 divide-y divide-gray-100 md:col-span-3 md:mt-0">
            <FormKit
              v-if="!isUpdateMode"
              v-model="selectedParentCategory"
              type="categorySelect"
              :label="
                $t('core.post_category.editing_modal.fields.parent.label')
              "
            ></FormKit>
            <FormKit
              id="displayNameInput"
              v-model="formState.spec.displayName"
              name="displayName"
              :label="
                $t('core.post_category.editing_modal.fields.display_name.label')
              "
              type="text"
              validation="required|length:0,50"
            ></FormKit>
            <FormKit
              v-model="formState.spec.slug"
              :help="$t('core.post_category.editing_modal.fields.slug.help')"
              name="slug"
              :label="$t('core.post_category.editing_modal.fields.slug.label')"
              type="text"
              validation="required|length:0,50"
            >
              <template #suffix>
                <div
                  v-tooltip="
                    $t(
                      'core.post_category.editing_modal.fields.slug.refresh_message'
                    )
                  "
                  class="group flex h-full cursor-pointer items-center border-l px-3 transition-all hover:bg-gray-100"
                  @click="handleGenerateSlug(true, FormType.CATEGORY)"
                >
                  <IconRefreshLine
                    class="h-4 w-4 text-gray-500 group-hover:text-gray-700"
                  />
                </div>
              </template>
            </FormKit>
            <FormKit
              v-model="formState.spec.template"
              :options="templates"
              :label="
                $t('core.post_category.editing_modal.fields.template.label')
              "
              type="select"
              name="template"
            ></FormKit>
            <FormKit
              v-model="formState.spec.cover"
              :help="$t('core.post_category.editing_modal.fields.cover.help')"
              name="cover"
              :label="$t('core.post_category.editing_modal.fields.cover.label')"
              type="attachment"
              :accepts="['image/*']"
              validation="length:0,1024"
            ></FormKit>
            <FormKit
              v-model="formState.spec.description"
              name="description"
              :help="
                $t('core.post_category.editing_modal.fields.description.help')
              "
              :label="
                $t('core.post_category.editing_modal.fields.description.label')
              "
              type="textarea"
              validation="length:0,200"
            ></FormKit>
          </div>
        </div>
      </div>
    </FormKit>

    <div class="py-5">
      <div class="border-t border-gray-200"></div>
    </div>

    <div class="md:grid md:grid-cols-4 md:gap-6">
      <div class="md:col-span-1">
        <div class="sticky top-0">
          <span class="text-base font-medium text-gray-900">
            {{ $t("core.post_category.editing_modal.groups.annotations") }}
          </span>
        </div>
      </div>
      <div class="mt-5 divide-y divide-gray-100 md:col-span-3 md:mt-0">
        <AnnotationsForm
          :key="formState.metadata.name"
          ref="annotationsFormRef"
          :value="formState.metadata.annotations"
          kind="Category"
          group="content.blog.run"
        />
      </div>
    </div>

    <template #footer>
      <VSpace>
        <SubmitButton
          v-if="visible"
          :loading="saving"
          type="secondary"
          :text="$t('core.common.buttons.submit')"
          @submit="$formkit.submit('category-form')"
        >
        </SubmitButton>
        <VButton @click="onVisibleChange(false)">
          {{ $t("core.common.buttons.cancel_and_shortcut") }}
        </VButton>
      </VSpace>
    </template>
  </VModal>
</template>
