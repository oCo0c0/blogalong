import { viteExternalsPlugin as ViteExternals } from "vite-plugin-externals";
import {
  viteStaticCopy as ViteStaticCopy,
  type Target,
} from "vite-plugin-static-copy";
import { createHtmlPlugin as VitePluginHtml } from "vite-plugin-html";
import randomstring from "randomstring";
import type { HtmlTagDescriptor } from "vite";

/**
 * It copies the external libraries to the `assets` folder, and injects the script tags into the HTML
 *
 * @param {boolean} isProduction - boolean
 * @param {string} baseUrl - The base url of the application.
 * @returns An array of plugins
 */
export const setupLibraryExternal = (
  isProduction: boolean,
  baseUrl: string,
  entry: string
) => {
  const staticSuffix = randomstring.generate({
    length: 8,
    charset: "hex",
  });

  const staticTargets: Target[] = [
    {
      src: `./node_modules/vue/dist/vue.global${
        isProduction ? ".prod" : ""
      }.js`,
      dest: "assets/vue",
      rename: `vue.global.${staticSuffix}.js`,
    },
    {
      src: `./node_modules/vue-router/dist/vue-router.global${
        isProduction ? ".prod" : ""
      }.js`,
      dest: "assets/vue-router",
      rename: `vue-router.global.${staticSuffix}.js`,
    },
    {
      src: `./node_modules/vue-demi/lib/index.iife.js`,
      dest: "assets/vue-demi",
      rename: `vue-demi.${staticSuffix}.js`,
    },
    {
      src: "./node_modules/@vueuse/shared/index.iife.min.js",
      dest: "assets/vueuse",
      rename: `vueuse.shared.iife.${staticSuffix}.js`,
    },
    {
      src: "./node_modules/@vueuse/core/index.iife.min.js",
      dest: "assets/vueuse",
      rename: `vueuse.core.iife.${staticSuffix}.js`,
    },
    {
      src: "./node_modules/@vueuse/components/index.iife.min.js",
      dest: "assets/vueuse",
      rename: `vueuse.components.iife.${staticSuffix}.js`,
    },
    {
      src: "./node_modules/@vueuse/router/index.iife.min.js",
      dest: "assets/vueuse",
      rename: `vueuse.router.iife.${staticSuffix}.js`,
    },
    {
      src: "./node_modules/@blogalong/components/dist/blog-components.iife.js",
      dest: "assets/components",
      rename: `blog-components.iife.${staticSuffix}.js`,
    },
    {
      src: "./node_modules/@blogalong/console-shared/dist/blog-console-shared.iife.js",
      dest: "assets/console-shared",
      rename: `blog-console-shared.iife.${staticSuffix}.js`,
    },
    {
      src: "./node_modules/@blogalong/richtext-editor/dist/rich-text-editor.iife.js",
      dest: "assets/richtext-editor",
      rename: `blog-rich-text-editor.iife.${staticSuffix}.js`,
    },
  ];

  const injectTags = staticTargets
    .map((target) => {
      return {
        injectTo: "head",
        tag: "script",
        attrs: {
          src: `${isProduction ? baseUrl : "/"}${target.dest}/${target.rename}`,
          type: "text/javascript",
        },
      };
    })
    .filter(Boolean) as HtmlTagDescriptor[];

  return [
    ViteExternals({
      vue: "Vue",
      "vue-router": "VueRouter",
      "@blogalong/shared": "BlogConsoleShared",
      "@blogalong/components": "BlogComponents",
      "@vueuse/core": "VueUse",
      "@vueuse/components": "VueUse",
      "@vueuse/router": "VueUse",
      "vue-demi": "VueDemi",
      "@blogalong/richtext-editor": "RichTextEditor",
    }),
    ViteStaticCopy({
      targets: staticTargets,
    }),
    VitePluginHtml({
      minify: false,
      inject: {
        tags: injectTags,
        data: {
          entry: entry,
        },
      },
    }),
  ];
};
