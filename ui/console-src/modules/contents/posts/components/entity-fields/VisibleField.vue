<script lang="ts" setup>
import { apiClient } from "@/utils/api-client";
import type { ListedPost, Post } from "@blogalong/api-client";
import { IconEye, IconEyeOff, Toast, VEntityField } from "@blogalong/components";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useI18n } from "vue-i18n";

const queryClient = useQueryClient();
const { t } = useI18n();

withDefaults(
  defineProps<{
    post: ListedPost;
  }>(),
  {}
);

const { mutate: changeVisibleMutation } = useMutation({
  mutationFn: async (post: Post) => {
    const { data } =
      await apiClient.extension.post.getcontentBlogRunV1alpha1Post({
        name: post.metadata.name,
      });
    data.spec.visible = data.spec.visible === "PRIVATE" ? "PUBLIC" : "PRIVATE";
    await apiClient.extension.post.updatecontentBlogRunV1alpha1Post(
      {
        name: post.metadata.name,
        post: data,
      },
      {
        mute: true,
      }
    );
    await queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
  retry: 3,
  onSuccess: () => {
    Toast.success(t("core.common.toast.operation_success"));
  },
  onError: () => {
    Toast.error(t("core.common.toast.operation_failed"));
  },
});
</script>

<template>
  <VEntityField>
    <template #description>
      <IconEye
        v-if="post.post.spec.visible === 'PUBLIC'"
        v-tooltip="$t('core.post.filters.visible.items.public')"
        class="cursor-pointer text-sm transition-all hover:text-blue-600"
        @click="changeVisibleMutation(post.post)"
      />
      <IconEyeOff
        v-if="post.post.spec.visible === 'PRIVATE'"
        v-tooltip="$t('core.post.filters.visible.items.private')"
        class="cursor-pointer text-sm transition-all hover:text-blue-600"
        @click="changeVisibleMutation(post.post)"
      />
    </template>
  </VEntityField>
</template>
