<template>
  <Story title="Tag">
    <Variant title="Theme">
      <template #default>
        <VSpace>
          <VTag theme="default">Blog</VTag>
          <VTag theme="primary">Blog</VTag>
          <VTag theme="secondary">Blog</VTag>
          <VTag theme="danger">Blog</VTag>
        </VSpace>
      </template>
    </Variant>
    <Variant title="Icon">
      <template #default>
        <VSpace>
          <VTag rounded theme="default">
            <template #leftIcon>
              <IconSettings />
            </template>
            Blog
          </VTag>
          <VTag rounded theme="primary">
            <template #leftIcon>
              <IconSettings />
            </template>
            Blog
          </VTag>
          <VTag theme="secondary">
            <template #leftIcon>
              <IconSettings />
            </template>
            Blog
          </VTag>
          <VTag theme="danger">
            <template #leftIcon>
              <IconSettings />
            </template>
            Blog
          </VTag>
        </VSpace>
      </template>
    </Variant>
  </Story>
</template>
<script lang="ts" setup>
import { VTag } from "../../components/tag";
import { VSpace } from "../../components/space";
import { IconSettings } from "../../icons/icons";
</script>
