import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AI Demo",
  description: "Demo site for AI assignement from Valsoft",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Plans', link: '/junie-plans' },
      { text: 'Conversion Logs', link: '/conversion-logs/ctrl-button' }
    ],

    sidebar: [
      {
        text: 'Documentation',
        items: [
          { text: 'Home', link: '/' },
          { text: 'Junie Plans', link: '/junie-plans' }
        ]
      },
      {
        text: 'Conversion Logs',
        items: [
          { text: 'Button Component', link: '/conversion-logs/ctrl-button' },
          { text: 'Select Component', link: '/conversion-logs/ctrl-select' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
