<script lang="ts" setup>
import { VAvatar, VEntityField } from "@blogalong/components";
import type { Plugin } from "@blogalong/api-client";
withDefaults(
  defineProps<{
    plugin: Plugin;
  }>(),
  {}
);
</script>

<template>
  <VEntityField>
    <template #description>
      <VAvatar
        :alt="plugin.spec.displayName"
        :src="plugin.status?.logo"
        size="md"
      ></VAvatar>
    </template>
  </VEntityField>
</template>
