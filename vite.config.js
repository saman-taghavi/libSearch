import { createVuePlugin } from "vite-plugin-vue2";
import viteComponents, { VuetifyResolver } from "vite-plugin-components";
import path from "path";
import { createI18nPlugin } from "@yfwz100/vite-plugin-vue2-i18n";

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  resolve: {
    alias: [
      {
        find: "@/",
        replacement: `${path.resolve(__dirname, "./src")}/`,
      },
      {
        find: "src/",
        replacement: `${path.resolve(__dirname, "./src")}/`,
      },
    ],
  },
  plugins: [
    createVuePlugin(),
    viteComponents({
      customComponentResolvers: [VuetifyResolver()],
    }),
    createI18nPlugin(),
  ],
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: [
          // vuetify variable overrides
          '@import "@/styles/variables"',
          "",
        ].join("\n"),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
};
