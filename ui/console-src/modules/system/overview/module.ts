import { definePlugin } from "@blogalong/console-shared";
import { IconTerminalBoxLine } from "@blogalong/components";
import BasicLayout from "@console/layouts/BasicLayout.vue";
import Overview from "./Overview.vue";
import { markRaw } from "vue";

export default definePlugin({
  components: {},
  routes: [
    {
      path: "/overview",
      name: "OverviewRoot",
      component: BasicLayout,
      meta: {
        title: "core.overview.title",
        searchable: true,
        permissions: ["system:actuator:manage"],
        menu: {
          name: "core.sidebar.menu.items.overview",
          group: "system",
          icon: markRaw(IconTerminalBoxLine),
          priority: 3,
        },
      },
      children: [
        {
          path: "",
          name: "Overview",
          component: Overview,
        },
      ],
    },
  ],
});
