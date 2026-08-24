import type { MetadataRoute } from 'next'

import { SITE } from '@/lib/site'

/**
 * Web app manifest, served at `/manifest.webmanifest`.
 *
 * The icons are the same SVG mark as the favicon, from `public/`. A manifest icon has to
 * be fetchable at a stable path, and the `app/icon.svg` convention is served from a
 * hashed URL that only Next knows — so the public copy is the one referenced here.
 *
 * `purpose: 'maskable'` is listed separately from `'any'` rather than combined: a
 * launcher that crops a maskable icon to a circle would clip a mark that was not drawn
 * with the safe zone in mind, and the two purposes want different artwork.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.legalName} — free Next.js SaaS dashboard template`,
    short_name: SITE.name,
    description:
      'A free, open-source Next.js 16 SaaS template: marketing site plus a working analytics dashboard with all six VivekUI charts.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#0a0a0b',
    theme_color: '#6d28d9',
    categories: ['business', 'productivity', 'developer'],
    lang: 'en',
    dir: 'ltr',
    icons: [
      // `public/logo-mark.svg`, not `/icon.svg`: the app/icon.svg convention already
      // owns that route, and a public file at the same path is a collision.
      { src: '/logo-mark.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png', purpose: 'any' },
    ],
  }
}
