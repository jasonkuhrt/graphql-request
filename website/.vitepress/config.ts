import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { ModuleKind, ModuleResolutionKind } from 'typescript'
import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { generateSidebar, SidebarItem, SidebarMulti } from 'vitepress-sidebar'

const prefixPattern = /\d+_/g

const sidebarMultiVisitItems = (sidebarMulti: SidebarMulti, visitor: (sidebarItem: SidebarItem) => void) => {
  Object.values(sidebarMulti).forEach(sidebar => sidebar.items.forEach(_ => sidebarItemVisitItems(_, visitor)))
  return sidebarMulti
}

const sidebarItemVisitItems = (sidebarItem: SidebarItem, visitor: (sidebarItem: SidebarItem) => void) => {
  visitor(sidebarItem)
  sidebarItem.items?.forEach(_ => sidebarItemVisitItems(_, visitor))
}

const fixLinks = (sidebarMulti: SidebarMulti) => {
  return sidebarMultiVisitItems(sidebarMulti, (sidebarItem) => {
    sidebarItem.link = sidebarItem.link?.replaceAll(prefixPattern, '')
  })
}

/**
 * @see https://vitepress-sidebar.cdget.com/guide/api
 */
const sidebars = fixLinks(generateSidebar([
  {
    scanStartPath: 'content/guides',
    resolvePath: '/guides/',
    prefixSeparator: '_',
    removePrefixAfterOrdering: true,
    useTitleFromFrontmatter: true,
    useTitleFromFileHeading: true,
    hyphenToSpace: true,
    capitalizeEachWords: true,
    keepMarkdownSyntaxFromTitle: true,
  },
  {
    hyphenToSpace: true,
    capitalizeEachWords: true,
    scanStartPath: 'content/examples',
    resolvePath: '/examples/',
    prefixSeparator: '_',
    removePrefixAfterOrdering: true,
    useTitleFromFrontmatter: true,
    useTitleFromFileHeading: true,
    keepMarkdownSyntaxFromTitle: true,
  },
]) as SidebarMulti)

sidebars['/examples/'].items.find(_ => _.text === 'About')!.items!.unshift({ text: 'Introduction', link: '/' })
sidebars['/guides/'].items.unshift({ text: 'Introduction', link: '/' })

const rootItems = sidebars['/guides/'].items.filter(_ => !_.items)

sidebars['/guides/'].items = sidebars['/guides/'].items.filter(_ => _.items && _.items.length > 0)
sidebars['/guides/'].items.unshift(...rootItems)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  /**
   * @see https://github.com/pillarjs/path-to-regexp/blob/8b7440438f726cce7a891f9325dd79a65978347f/Readme.md
   */
  // dprint-ignore
  rewrites: {
    ':section/{:_(\\d+_)}?:one/{:_(\\d+_)}?:two/{:_(\\d+_)}?:three'   : ':section/:one/:two/:three',
    ':section/{:_(\\d+_)}?:one/{:_(\\d+_)}?:two'                      : ':section/:one/:two',
    ':section/{:_(\\d+_)}?:one'                                       : ':section/:one'
  },
  title: 'Graffle',
  description: 'Minimalist Progressively Type Safe GraphQL Client For JavaScript.',
  cleanUrls: true,
  // TODO, remove before going live.
  ignoreDeadLinks: true,
  sitemap: {
    hostname: 'https://graffle.js.org',
  },
  head: [
    // <script defer data-domain="graffle.js.org" src="https://plausible.io/js/script.js"></script>
    ['script', {
      defer: 'true',
      'data-domain': 'graffle.js.org',
      src: 'https://plausible.io/js/script.js',
    }],
  ],
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    },
    codeTransformers: [
      // transformerTwoslash({
      //   twoslashOptions: {
      //     compilerOptions: {
      //       moduleResolution: ModuleResolutionKind.Bundler,
      //       module: ModuleKind.ESNext,
      //       noErrorTruncation: true,
      //     },
      //     // Instead of automatically putting underlines over every property and variable,
      //     // only do so for the ones we explicitly ask for in our markdown.
      //     // shouldGetHoverInfo: (x) => {
      //     //   return false
      //     // },
      //   },
      // }) as any,
    ],
  },
  srcDir: './content',
  themeConfig: {
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Jason Kuhrt',
    },
    // @see https://github.com/vuejs/vitepress/issues/4141
    logo: {
      light: '/_assets/logo-dark.svg',
      dark: '/_assets/logo-light.svg',
    },
    search: {
      provider: 'local',
    },
    docFooter: {
      next: false,
      prev: false,
    },
    aside: 'left',
    nav: [
      { text: 'Guides', link: '/guides' },
      { text: 'Examples', link: '/examples' },
    ],
    sidebar: {
      ...sidebars,
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jasonkuhrt/graffle' },
    ],
  },
})
