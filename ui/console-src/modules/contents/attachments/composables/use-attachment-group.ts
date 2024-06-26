import type { Ref } from "vue";
import type { Group } from "@blogalong/api-client";
import { apiClient } from "@/utils/api-client";
import { useQuery } from "@tanstack/vue-query";

interface useFetchAttachmentGroupReturn {
  groups: Ref<Group[] | undefined>;
  isLoading: Ref<boolean>;
  handleFetchGroups: () => void;
}

export function useFetchAttachmentGroup(): useFetchAttachmentGroupReturn {
  const { data, isLoading, refetch } = useQuery<Group[]>({
    queryKey: ["attachment-groups"],
    queryFn: async () => {
      const { data } =
        await apiClient.extension.storage.group.liststorageBlogRunV1alpha1Group(
          {
            labelSelector: ["!blog.run/hidden"],
            sort: ["metadata.creationTimestamp,asc"],
          }
        );
      return data.items;
    },
    refetchInterval(data) {
      const deletingGroups = data?.filter(
        (group) => !!group.metadata.deletionTimestamp
      );

      return deletingGroups?.length ? 1000 : false;
    },
  });

  return {
    groups: data,
    isLoading,
    handleFetchGroups: refetch,
  };
}
