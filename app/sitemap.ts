import type { MetadataRoute } from 'next'

import { SITE } from '@/lib/site'

/**
 * Every route this template ships, dashboard included — it is a public demo with mock
 * data and it is the most persuasive page here, so there is no reason to hide it.
 *
 * `lastModified` is a fixed release date rather than `new Date()`. A sitemap that claims
 * every page changed the moment you deployed teaches crawlers to ignore the field.
 */
const RELEASED = new Date('2026-08-24T00:00:00Z')

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/built-with', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/dashboard', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/dashboard/customers', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/dashboard/roadmap', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/dashboard/reports', priority: 0.6, changeFrequency: 'monthly' },
  ]

  return routes.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified: RELEASED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
