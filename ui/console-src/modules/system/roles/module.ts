import { definePlugin } from "@blogalong/console-shared";
import BasicLayout from "@console/layouts/BasicLayout.vue";
import RoleList from "./RoleList.vue";
import RoleDetail from "./RoleDetail.vue";

export default definePlugin({
  components: {},
  routes: [
    {
      path: "/users/roles",
      component: BasicLayout,
      children: [
        {
          path: "",
          name: "Roles",
          component: RoleList,
          meta: {
            title: "core.role.title",
            searchable: true,
            permissions: ["system:roles:view"],
          },
        },
        {
          path: ":name",
          name: "RoleDetail",
          component: RoleDetail,
          meta: {
            title: "core.role.detail.title",
            permissions: ["system:roles:view"],
          },
        },
      ],
    },
  ],
});
