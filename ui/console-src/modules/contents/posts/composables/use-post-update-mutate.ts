import { useMutation } from "@tanstack/vue-query";
import type { Post } from "@blogalong/api-client";
import { apiClient } from "@/utils/api-client";
import { Toast } from "@blogalong/components";
import { useI18n } from "vue-i18n";

export function usePostUpdateMutate() {
  const { t } = useI18n();

  return useMutation({
    mutationKey: ["post-update"],
    mutationFn: async (post: Post) => {
      const { data: latestPost } =
        await apiClient.extension.post.getcontentBlogRunV1alpha1Post({
          name: post.metadata.name,
        });

      return await apiClient.extension.post.updatecontentBlogRunV1alpha1Post(
        {
          name: post.metadata.name,
          post: {
            ...latestPost,
            spec: post.spec,
            metadata: {
              ...latestPost.metadata,
              annotations: post.metadata.annotations,
            },
          },
        },
        {
          mute: true,
        }
      );
    },
    retry: 3,
    onError: (error) => {
      console.error("Failed to update post", error);
      Toast.error(t("core.common.toast.server_internal_error"));
    },
  });
}
