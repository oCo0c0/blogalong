import { defineStore } from "pinia";
import type { UserPermission } from "@blogalong/api-client";
import { ref } from "vue";

export const useRoleStore = defineStore("role", () => {
  const permissions = ref<UserPermission>({
    roles: [],
    permissions: [],
    uiPermissions: [],
  });

  return { permissions };
});
