import { Plugin } from "vite";
import yaml from "js-yaml";
import type { Plugin as BlogPlugin } from "@blogalong/api-client";
import fs from "fs";

export function BlogUIPluginBundlerKit(): Plugin {
  return {
    name: "blog-ui-plugin-bundler-kit",
    config(config, env) {
      const isProduction = env.mode === "production";

      // fixme: allow user to config outDir
      const outDir = isProduction
        ? "../src/main/resources/console"
        : "../build/resources/main/console";

      // fixme: allow user to config manifest path
      const manifest = yaml.load(
        fs.readFileSync("../src/main/resources/plugin.yaml", "utf8")
      ) as BlogPlugin;

      return {
        ...config,
        define: {
          "process.env": process.env,
        },
        build: {
          outDir,
          emptyOutDir: true,
          lib: {
            entry: "src/index.ts",
            name: manifest.metadata.name,
            formats: ["iife"],
            fileName: () => "main.js",
          },
          rollupOptions: {
            external: [
              "vue",
              "vue-router",
              "@vueuse/core",
              "@vueuse/components",
              "@vueuse/router",
              "@blogalong/shared",
              "@blogalong/components",
              "@blogalong/richtext-editor",
            ],
            output: {
              globals: {
                vue: "Vue",
                "vue-router": "VueRouter",
                "@vueuse/core": "VueUse",
                "@vueuse/components": "VueUse",
                "@vueuse/router": "VueUse",
                "@blogalong/console-shared": "HaloConsoleShared",
                "@blogalong/components": "HaloComponents",
                "@blogalong/richtext-editor": "RichTextEditor",
              },
              extend: true,
            },
          },
        },
      };
    },
  };
}
