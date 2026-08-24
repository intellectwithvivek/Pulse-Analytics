import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider, themeScript } from '@the_viveksingh/vivek-ui'

// One install, two CSS imports: the core stylesheet and the chart stylesheet. Charts
// ship as a separate entry point, so `styles.css` alone leaves them unstyled.
import '@the_viveksingh/vivek-ui/styles.css'
import '@the_viveksingh/vivek-ui/charts.css'
import './globals.css'

import { JsonLd } from '@/components/site/json-ld'
import { PACKAGE, SITE } from '@/lib/site'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Free Next.js SaaS Template with Dashboard & Charts — Pulse | VivekUI',
    template: `%s | ${SITE.name}`,
  },
  description:
    'A free, open-source Next.js 16 SaaS template: marketing site plus a working dashboard with six charts. Built entirely with VivekUI — 91 React components, zero runtime dependencies, no chart library installed.',
  applicationName: SITE.legalName,
  authors: [{ name: 'Vivek Kumar Singh', url: PACKAGE.author }],
  creator: 'Vivek Kumar Singh',
  keywords: [
    'free nextjs saas template with dashboard',
    'nextjs saas template',
    'react dashboard template',
    'nextjs charts',
    'free react component library',
    'vivekui',
    'open source nextjs template',
    'app router dashboard',
  ],
  category: 'technology',
  alternates: { canonical: '/' },
  manifest: '/manifest.webmanifest',
  // No `images` here on purpose: `app/opengraph-image.tsx` is the source, and the file
  // convention emits the og:image/twitter:image tags with the right dimensions. Listing
  // them here as well is how the two drift apart.
  openGraph: {
    type: 'website',
    siteName: SITE.legalName,
    locale: SITE.locale,
    url: SITE.url,
    title: 'Free Next.js SaaS Template with Dashboard & Charts — Pulse | VivekUI',
    description:
      'Marketing site plus a working dashboard, all six VivekUI charts included. Free, MIT, zero runtime dependencies.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Next.js SaaS Template with Dashboard & Charts — Pulse',
    description:
      'Six charts, one dependency-free component library. MIT licensed, deploy in a click.',
    // Add `creator: '@yourhandle'` here to get the "by" attribution on the card.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Let Google show a full text snippet and a large image in results and in AI
      // Overviews. The defaults are conservative, and for a template that wants to be
      // found and quoted, a truncated snippet is a lost answer.
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

/**
 * Browser UI colour, per scheme. The values are the two `--vk-color-bg` tokens, so the
 * address bar matches the page instead of flashing white above a dark dashboard.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
  ],
  colorScheme: 'light dark',
}

/** The author, referenced by every other node so the graph has one identity for them. */
const AUTHOR = {
  '@type': 'Person',
  '@id': `${PACKAGE.author}#person`,
  name: 'Vivek Kumar Singh',
  url: PACKAGE.author,
  jobTitle: 'Software Engineer',
  sameAs: [
    'https://github.com/intellectwithvivek',
    'https://www.linkedin.com/in/singhvvk/',
    PACKAGE.npm,
  ],
}

/** Site-wide `WebSite` node. Page-level nodes are emitted by the pages themselves. */
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}#website`,
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.url,
  description: SITE.tagline,
  inLanguage: 'en',
  publisher: AUTHOR,
  license: 'https://opensource.org/licenses/MIT',
}

/**
 * `SoftwareSourceCode` — this site is a template someone clones, not only a product
 * brochure. Declaring the repository, the language and the runtime is what lets an
 * answer engine reply to "free Next.js SaaS dashboard template" with this repo rather
 * than with a listicle about it.
 */
const sourceCodeSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareSourceCode',
  '@id': `${SITE.url}#template`,
  name: 'Pulse Analytics — free Next.js SaaS dashboard template',
  description:
    'An open-source Next.js 16 App Router template: a marketing site plus a working analytics dashboard with six charts, built entirely with VivekUI and no chart library.',
  url: SITE.url,
  codeRepository: SITE.repo,
  programmingLanguage: [
    { '@type': 'ComputerLanguage', name: 'TypeScript' },
    { '@type': 'ComputerLanguage', name: 'CSS' },
  ],
  runtimePlatform: 'Node.js 20.9+',
  targetProduct: {
    '@type': 'SoftwareApplication',
    name: 'Next.js',
    applicationCategory: 'DeveloperApplication',
    softwareVersion: '16.3',
  },
  license: 'https://opensource.org/licenses/MIT',
  isAccessibleForFree: true,
  author: AUTHOR,
  maintainer: AUTHOR,
  keywords:
    'nextjs template, saas template, react dashboard, nextjs charts, free template, open source, vivekui, app router, typescript',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      // `themeScript` writes `data-theme` before React sees the document, which is a
      // deliberate server/client difference on this element and nowhere else.
      suppressHydrationWarning
    >
      <head>
        {/*
         * Synchronous and blocking, on purpose. By the time an effect could read
         * localStorage the browser has already painted, so no amount of React can
         * replace this one script tag.
         */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {/*
         * `system` is the default so the dashboard can be dark-first (see DashShell)
         * while the marketing pages follow the visitor's own preference.
         */}
        <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
        <JsonLd data={websiteSchema} />
        <JsonLd data={sourceCodeSchema} />
      </body>
    </html>
  )
}
