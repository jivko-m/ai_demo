import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AI Demo",
  description: "Demo site for AI assignement from Valsoft",

  // Disable the default theme's navigation elements
  themeConfig: {
    // Disable navigation bar
    nav: false,
    // Disable sidebar
    sidebar: false,
    // Disable footer
    footer: false,
    // Disable edit links
    editLink: false,
    // Disable last updated text
    lastUpdated: false,
    // Disable prev/next links
    docFooter: {
      prev: false,
      next: false
    }
  },

  // Disable layout components
  appearance: false, // Disable dark/light mode toggle

  // Use minimal head metadata
  head: [],

  // Disable search
  search: {
    provider: 'local',
    options: {
      disableDetailedView: true,
      disableQueryPersistence: true,
      locales: {
        root: {
          translations: {
            button: {
              buttonText: ''
            }
          }
        }
      }
    }
  },

  // Generate clean HTML
  cleanUrls: true,

  // Disable lastUpdated timestamp
  lastUpdated: false
})
