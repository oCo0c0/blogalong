import { definePlugin } from "@blogalong/console-shared";
import BasicLayout from "@uc/layouts/BasicLayout.vue";
import { IconBookRead } from "@blogalong/components";
import PostList from "./PostList.vue";
import { markRaw } from "vue";
import PostEditor from "./PostEditor.vue";

export default definePlugin({
  ucRoutes: [
    {
      path: "/posts",
      name: "PostsRoot",
      component: BasicLayout,
      meta: {
        title: "core.uc_post.title",
        searchable: true,
        permissions: ["uc:posts:manage"],
        menu: {
          name: "core.uc_sidebar.menu.items.posts",
          group: "content",
          icon: markRaw(IconBookRead),
          priority: 0,
          mobile: true,
        },
      },
      children: [
        {
          path: "",
          name: "Posts",
          component: PostList,
        },
        {
          path: "editor",
          name: "PostEditor",
          component: PostEditor,
          meta: {
            title: "core.post_editor.title",
            searchable: true,
            hideFooter: true,
            permissions: ["uc:posts:manage"],
          },
        },
      ],
    },
  ],
});
