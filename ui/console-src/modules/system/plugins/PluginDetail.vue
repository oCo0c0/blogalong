<script lang="ts" setup>
// core libs
import { provide, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { apiClient } from "@/utils/api-client";

// libs
import { cloneDeep } from "lodash-es";

// components
import { VCard, VPageHeader, VTabbar, VAvatar } from "@blogalong/components";

// types
import type { Ref } from "vue";
import type { Plugin, Setting, SettingForm } from "@blogalong/api-client";
import { usePermission } from "@/utils/permission";
import { useI18n } from "vue-i18n";
import { useQuery } from "@tanstack/vue-query";
import type { PluginTab } from "@blogalong/console-shared";
import { markRaw } from "vue";
import DetailTab from "./tabs/Detail.vue";
import SettingTab from "./tabs/Setting.vue";
import { useRouteQuery } from "@vueuse/router";
import { usePluginModuleStore } from "@/stores/plugin";

const { currentUserHasPermission } = usePermission();
const { t } = useI18n();

const initialTabs = ref<PluginTab[]>([
  {
    id: "detail",
    label: t("core.plugin.tabs.detail"),
    component: markRaw(DetailTab),
  },
]);

const route = useRoute();

const tabs = ref<PluginTab[]>(cloneDeep(initialTabs.value));
const activeTab = useRouteQuery<string>("tab", tabs.value[0].id);

provide<Ref<string>>("activeTab", activeTab);

const { data: plugin } = useQuery({
  queryKey: ["plugin", route.params.name],
  queryFn: async () => {
    const { data } =
      await apiClient.extension.plugin.getpluginBlogRunV1alpha1Plugin({
        name: route.params.name as string,
      });
    return data;
  },
  onSuccess(data) {
    if (
      !data.spec.settingName ||
      !currentUserHasPermission(["system:plugins:manage"])
    ) {
      tabs.value = [...initialTabs.value, ...getTabsFromExtensions()];
    }
  },
});

provide<Ref<Plugin | undefined>>("plugin", plugin);

const { data: setting } = useQuery({
  queryKey: ["plugin-setting", plugin],
  queryFn: async () => {
    const { data } = await apiClient.plugin.fetchPluginSetting({
      name: plugin.value?.metadata.name as string,
    });
    return data;
  },
  enabled: computed(() => {
    return (
      !!plugin.value &&
      !!plugin.value.spec.settingName &&
      currentUserHasPermission(["system:plugins:manage"])
    );
  }),
  async onSuccess(data) {
    if (data) {
      const { forms } = data.spec;
      tabs.value = [
        ...initialTabs.value,
        ...getTabsFromExtensions(),
        ...forms.map((item: SettingForm) => {
          return {
            id: item.group,
            label: item.label || "",
            component: markRaw(SettingTab),
          };
        }),
      ] as PluginTab[];
    }
  },
});

provide<Ref<Setting | undefined>>("setting", setting);

function getTabsFromExtensions(): PluginTab[] {
  const { pluginModuleMap } = usePluginModuleStore();

  const currentPluginModule = pluginModuleMap[route.params.name as string];

  if (!currentPluginModule) {
    return [];
  }

  const { extensionPoints } = currentPluginModule;

  if (!extensionPoints?.["plugin:self:tabs:create"]) {
    return [];
  }

  const pluginTabs = extensionPoints[
    "plugin:self:tabs:create"
  ]() as PluginTab[];

  return pluginTabs.filter((tab) => {
    return currentUserHasPermission(tab.permissions);
  });
}
</script>
<template>
  <VPageHeader :title="plugin?.spec?.displayName">
    <template #icon>
      <VAvatar
        v-if="plugin"
        :src="plugin.status?.logo"
        :alt="plugin.spec.displayName"
        class="mr-2"
        size="sm"
      />
    </template>
  </VPageHeader>

  <div class="m-0 md:m-4">
    <VCard :body-class="['!p-0', '!overflow-visible']">
      <template #header>
        <VTabbar
          v-model:active-id="activeTab"
          :items="tabs.map((item) => ({ id: item.id, label: item.label }))"
          class="w-full !rounded-none"
          type="outline"
        ></VTabbar>
      </template>
      <div class="rounded-b-base bg-white">
        <template v-for="tab in tabs" :key="tab.id">
          <component :is="tab.component" v-if="activeTab === tab.id" />
        </template>
      </div>
    </VCard>
  </div>
</template>
