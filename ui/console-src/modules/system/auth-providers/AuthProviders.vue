<script lang="ts" setup>
import {
  VPageHeader,
  IconLockPasswordLine,
  VCard,
  VLoading,
} from "@blogalong/components";
import { useQuery } from "@tanstack/vue-query";
import { apiClient } from "@/utils/api-client";
import type { ListedAuthProvider } from "@blogalong/api-client";
import AuthProviderListItem from "./components/AuthProviderListItem.vue";
import { computed, ref } from "vue";
import Fuse from "fuse.js";

const {
  data: authProviders,
  isLoading,
  refetch,
} = useQuery<ListedAuthProvider[]>({
  queryKey: ["auth-providers"],
  queryFn: async () => {
    const { data } = await apiClient.authProvider.listAuthProviders();
    return data;
  },
  onSuccess(data) {
    fuse = new Fuse(data, {
      keys: ["name", "displayName"],
      useExtendedSearch: true,
      threshold: 0.2,
    });
  },
});

const keyword = ref("");
let fuse: Fuse<ListedAuthProvider> | undefined = undefined;

const searchResults = computed(() => {
  if (!fuse || !keyword.value) {
    return authProviders.value;
  }

  return fuse?.search(keyword.value).map((item) => item.item);
});
</script>

<template>
  <VPageHeader :title="$t('core.identity_authentication.title')">
    <template #icon>
      <IconLockPasswordLine class="mr-2 self-center" />
    </template>
  </VPageHeader>

  <div class="m-0 md:m-4">
    <VCard :body-class="['!p-0']">
      <template #header>
        <div class="block w-full bg-gray-50 px-4 py-3">
          <div
            class="relative flex flex-col items-start sm:flex-row sm:items-center"
          >
            <div class="flex w-full flex-1 sm:w-auto">
              <FormKit
                v-model="keyword"
                :placeholder="$t('core.common.placeholder.search')"
                type="text"
              ></FormKit>
            </div>
          </div>
        </div>
      </template>
      <VLoading v-if="isLoading" />
      <Transition v-else appear name="fade">
        <ul
          class="box-border h-full w-full divide-y divide-gray-100"
          role="list"
        >
          <li v-for="(authProvider, index) in searchResults" :key="index">
            <AuthProviderListItem
              :auth-provider="authProvider"
              @reload="refetch"
            />
          </li>
        </ul>
      </Transition>
    </VCard>
  </div>
</template>
