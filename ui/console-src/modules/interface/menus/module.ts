import { definePlugin } from "@blogalong/console-shared";
import BasicLayout from "@console/layouts/BasicLayout.vue";
import Menus from "./Menus.vue";
import { IconListSettings } from "@blogalong/components";
import { markRaw } from "vue";

export default definePlugin({
  components: {},
  routes: [
    {
      path: "/menus",
      name: "MenusRoot",
      component: BasicLayout,
      meta: {
        title: "core.menu.title",
        searchable: true,
        permissions: ["system:menus:view"],
        menu: {
          name: "core.sidebar.menu.items.menus",
          group: "interface",
          icon: markRaw(IconListSettings),
          priority: 1,
        },
      },
      children: [
        {
          path: "",
          name: "Menus",
          component: Menus,
        },
      ],
    },
  ],
});
