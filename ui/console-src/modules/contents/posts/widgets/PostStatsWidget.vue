<script lang="ts" setup>
import { VCard, IconBookRead } from "@blogalong/components";
import { useDashboardStats } from "@console/composables/use-dashboard-stats";

const { data: stats } = useDashboardStats();
</script>
<template>
  <VCard class="h-full" :body-class="['h-full']">
    <div class="flex h-full">
      <div class="flex items-center gap-4">
        <span
          class="hidden rounded-full bg-gray-100 p-2.5 text-gray-600 sm:block"
        >
          <IconBookRead class="h-5 w-5" />
        </span>

        <div>
          <span class="text-sm text-gray-500">
            {{ $t("core.dashboard.widgets.presets.post_stats.title") }}
          </span>
          <p class="text-2xl font-medium text-gray-900">
            {{ stats?.posts || 0 }}
          </p>
        </div>
      </div>
    </div>
  </VCard>
</template>
