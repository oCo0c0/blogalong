import { definePlugin } from "@blogalong/console-shared";
import BasicLayout from "@console/layouts/BasicLayout.vue";
import Backups from "./Backups.vue";
import { IconServerLine } from "@blogalong/components";
import { markRaw } from "vue";

export default definePlugin({
  components: {},
  routes: [
    {
      path: "/backup",
      name: "BackupRoot",
      component: BasicLayout,
      meta: {
        title: "core.backup.title",
        searchable: true,
        permissions: ["system:migrations:manage"],
        menu: {
          name: "core.sidebar.menu.items.backup",
          group: "system",
          icon: markRaw(IconServerLine),
          priority: 4,
        },
      },
      children: [
        {
          path: "",
          name: "Backup",
          component: Backups,
        },
      ],
    },
  ],
});
