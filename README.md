# Stardust Notes

StarDust's personal desktop homepage, built with Astro. The existing bilingual notes, generated from published notes in the private `StarDust0083-GP03/Note` vault, remain at `/zh/` and `/en/`.

- Homepage: `/`, rendered from the self-contained `src/templates/desk.html` template. Its reading, bookmark, music, and repository records are demo data; no personal accounts are connected.
- Chinese: `/zh/`
- English: `/en/`
- Production: <https://stardust0083-gp03.github.io/>

The public repository contains only the normalized, explicitly published notes and their generated translations. The private repository owns the allowlist and translation workflow.

Translations are generated with the configured OpenAI-compatible model in the private publishing workflow before this site is deployed.

## Local development

```sh
npm install
npm run dev
npm run build
```
