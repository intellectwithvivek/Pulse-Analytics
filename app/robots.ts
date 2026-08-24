import type { MetadataRoute } from 'next'

import { SITE } from '@/lib/site'

/**
 * Nothing here is private, so nothing is disallowed. `/_next/` is excluded only because
 * build assets in a crawl budget are wasted requests, not because they are secret.
 *
 * ### Why the AI crawlers are named explicitly
 *
 * `User-agent: *` already allows them, so these blocks change no behaviour. They are here
 * because the opposite is now the common default — plenty of hosts and boilerplates ship
 * a blanket AI-crawler block — and for a free template that wants to be *found*, being
 * quotable by an answer engine is the point, not a leak. Naming them makes the intent
 * explicit and survives someone later pasting in a restrictive template.
 *
 * `Google-Extended` is not a crawler: it is the opt-in that governs whether content
 * Googlebot already fetched may be used for Gemini and AI Overviews grounding. Allowing
 * it is what keeps this site eligible to be cited there.
 */
const AI_AGENTS = [
  'GPTBot', // OpenAI, training and browsing
  'OAI-SearchBot', // ChatGPT search results
  'ChatGPT-User', // a user asking ChatGPT to open this page
  'ClaudeBot', // Anthropic
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended', // Gemini / AI Overviews grounding opt-in
  'Applebot-Extended',
  'CCBot', // Common Crawl, which most open datasets derive from
  'Bytespider',
  'Meta-ExternalAgent',
  'cohere-ai',
  'DuckAssistBot',
  'YouBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/_next/'],
      },
      {
        userAgent: AI_AGENTS,
        allow: '/',
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
