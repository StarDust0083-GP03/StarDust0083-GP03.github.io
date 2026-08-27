import { defineConfig } from "astro/config"

export default defineConfig({
  site: "https://stardust0083-gp03.github.io",
  trailingSlash: "always",
  i18n: {
    locales: ["zh", "en"],
    defaultLocale: "zh",
    routing: { prefixDefaultLocale: true },
  },
})
