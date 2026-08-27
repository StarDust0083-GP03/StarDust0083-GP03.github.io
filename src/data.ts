export const languages = ["zh", "en"] as const
export type Lang = (typeof languages)[number]

export const categories = ["learning-notes", "random-thoughts"] as const
export type Category = (typeof categories)[number]

export const copy = {
  zh: {
    languageName: "中文",
    switchLanguage: "English",
    brand: "星尘笔记",
    strapline: "学习笔记与随机思绪",
    home: "首页",
    allNotes: "全部",
    categories: {
      "learning-notes": "学习笔记",
      "random-thoughts": "随机思绪",
    },
    heroKicker: "个人记录 · 持续生长",
    heroTitle: "把正在思考的事，留在这里。",
    heroText: "一些学习之后留下来的结构，也有路上突然冒出来的念头。没有结论也没关系，先把它们写下来。",
    latest: "最近记录",
    read: "阅读",
    empty: "这里还没有公开记录。",
    back: "返回列表",
    translated: "AI 翻译",
    source: "原文",
    translationUnavailable: "另一种语言的版本尚未发布。",
    published: "发布于",
    footer: "写给未来的自己，也写给偶然路过的人。",
  },
  en: {
    languageName: "English",
    switchLanguage: "中文",
    brand: "Stardust Notes",
    strapline: "Learning notes & random thoughts",
    home: "Home",
    allNotes: "All notes",
    categories: {
      "learning-notes": "Learning Notes",
      "random-thoughts": "Random Thoughts",
    },
    heroKicker: "Personal record · still becoming",
    heroTitle: "Keeping the things I am thinking about.",
    heroText: "Some structure left behind by learning, and some thoughts that appeared on the way somewhere. They do not need to be finished before they are written down.",
    latest: "Latest notes",
    read: "Read",
    empty: "There are no public notes here yet.",
    back: "Back to notes",
    translated: "AI translation",
    source: "Original",
    translationUnavailable: "A version in the other language has not been published yet.",
    published: "Published",
    footer: "Written for a future self, and for whoever happens to pass by.",
  },
} satisfies Record<Lang, object>

export function pathSegment(value: string) {
  return encodeURIComponent(value)
}

export function postPath(lang: Lang, category: Category, slug: string) {
  return `/${lang}/${pathSegment(category)}/${pathSegment(slug)}/`
}

export function categoryPath(lang: Lang, category: Category) {
  return `/${lang}/${pathSegment(category)}/`
}

export function formatDate(date: Date, lang: Lang) {
  return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date)
}
