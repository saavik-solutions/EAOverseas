import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "EA Overseas Documentation",
  description: "Official internal documentation for the EA Overseas Platform",
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/setup' },
      { text: 'Architecture', link: '/architecture/overview' },
      { text: 'API Docs', link: '/api/v1' }
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Local Setup', link: '/guide/setup' },
          { text: 'Architecture Overview', link: '/architecture/overview' },
          { text: 'Folder Structure', link: '/architecture/folders' },
          { text: 'Security & RBAC', link: '/guide/rbac' }
        ]
      },
      {
        text: 'Modules',
        items: [
          { text: 'Auth Module', link: '/modules/auth' },
          { text: 'Profile Builder', link: '/modules/profile' },
          { text: 'Global Feed', link: '/modules/feed' },
          { text: 'College Feed', link: '/modules/college' },
          { text: 'Admin Panel', link: '/modules/admin' }
        ]
      },
      {
        text: 'Database',
        items: [
          { text: 'Schema Design', link: '/database/schema' },
          { text: 'Seeding Data', link: '/database/seeding' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ea-overseas' }
    ]
  }
})
