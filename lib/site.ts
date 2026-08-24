/**
 * One place for the strings that appear in metadata, JSON-LD, the footer and the
 * promotion kit. Everything that ships a UTM tag is built from `promo()` so the
 * campaign can never drift between the navbar, the footer and /built-with.
 */

export const SITE = {
  name: 'Pulse',
  legalName: 'Pulse Analytics',
  tagline: 'Product analytics you can read at a glance',
  url: 'https://pulseanalytics.vivekkumarsingh.in',
  locale: 'en_US',
  repo: 'https://github.com/intellectwithvivek/Pulse-Analytics',
  templateName: 'Pulse-Analytics',
  /** Used in the README clone command and the /built-with call to action. */
  cloneUrl: 'https://github.com/intellectwithvivek/Pulse-Analytics.git',
} as const

export const PACKAGE = {
  name: '@the_viveksingh/vivek-ui',
  install: 'npm i @the_viveksingh/vivek-ui',
  docs: 'https://ui.vivekkumarsingh.in/docs',
  npm: 'https://www.npmjs.com/package/@the_viveksingh/vivek-ui',
  github: 'https://github.com/intellectwithvivek/vivek_UI',
  author: 'https://vivekkumarsingh.in/',
  componentCount: 91,
  chartCount: 6,
} as const

/** UTM medium slots used across the promotion kit. */
export type PromoMedium = 'navbar' | 'footer' | 'builtwith' | 'readme' | 'hero' | 'llms'

/**
 * Tag an outbound VivekUI link. `utm_campaign` is fixed to this template's vertical
 * slug so every site in the family reports separately.
 */
export function promo(url: string, medium: PromoMedium): string {
  const target = new URL(url)
  target.searchParams.set('utm_source', 'vivekui-template')
  target.searchParams.set('utm_campaign', 'saas')
  target.searchParams.set('utm_medium', medium)
  return target.toString()
}

/** Deep link to a component's docs page, for the /built-with table. */
export function componentDocs(slug: string): string {
  return promo(`https://ui.vivekkumarsingh.in/docs/components/${slug}`, 'builtwith')
}

/** Deep link to a chart's docs page. Charts live under /docs/charts, not /docs/components. */
export function chartDocs(slug: string): string {
  return promo(`https://ui.vivekkumarsingh.in/docs/charts/${slug}`, 'builtwith')
}

export const ROUTES = [
  { href: '/', label: 'Home' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/built-with', label: 'Built with' },
] as const
