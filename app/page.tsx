import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AnimatedCounter,
  Badge,
  Button,
  CTA,
  FAQ,
  FeatureGrid,
  Hero,
  LogoCloud,
  Pricing,
  Section,
  Stats,
  Testimonials,
  Text,
} from '@the_viveksingh/vivek-ui'

import { CUSTOMER_LOGOS } from '@/components/marketing/customer-logos'
import { HeroPanel } from '@/components/marketing/hero-panel'
import { NewsletterSignup } from '@/components/marketing/newsletter-signup'
import { JsonLd, breadcrumbs, faqPage } from '@/components/site/json-ld'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteNavbar } from '@/components/site/site-navbar'
import { FAQ_ITEMS, PLANS } from '@/lib/content'
import { PACKAGE, SITE } from '@/lib/site'

export const metadata: Metadata = {
  // The homepage keeps the root title verbatim; `title.absolute` skips the template.
  title: {
    absolute: 'Free Next.js SaaS Template with Dashboard & Charts — Pulse | VivekUI',
  },
  description:
    'A free, open-source Next.js 16 SaaS template: marketing site plus a working dashboard with all six VivekUI charts. React 19, TypeScript, zero runtime UI dependencies, MIT licensed.',
  alternates: { canonical: '/' },
}

const FEATURES = [
  {
    id: 'autocapture',
    icon: '◎',
    title: 'Autocapture, then narrow',
    description:
      'Track every click and pageview on day one, then define the twelve events that actually matter once you know what people do.',
  },
  {
    id: 'funnels',
    icon: '⤸',
    title: 'Funnels that explain themselves',
    description:
      'Every step breaks down by plan, country or campaign without leaving the chart, so "why did it drop" takes one click, not a query.',
  },
  {
    id: 'cohorts',
    icon: '⊞',
    title: 'Retention by cohort',
    description:
      'Compare the month you shipped onboarding against the month before it. Three cohorts on one axis, no spreadsheet export.',
  },
  {
    id: 'alerts',
    icon: '◬',
    title: 'Alerts without thresholds',
    description:
      'Pulse learns each metric baseline and flags the spike or the drop. You set no numbers and get no 3am false positives.',
  },
  {
    id: 'replay',
    icon: '▷',
    title: 'Replay the session behind a number',
    description:
      'Click any point on any chart to watch the sessions that produced it. The number stops being an abstraction.',
  },
  {
    id: 'warehouse',
    icon: '⇄',
    title: 'Your warehouse stays the source',
    description:
      'Two-way sync with Snowflake and BigQuery. Cohorts you define in Pulse land back in your own tables.',
  },
]

const STAT_ITEMS = [
  {
    id: 'events',
    value: (
      <AnimatedCounter value={4.2} locale="en-US" suffix="B" format={{ minimumFractionDigits: 1 }} />
    ),
    label: 'Events ingested each month',
    description: 'Across every workspace on the platform.',
  },
  {
    id: 'teams',
    value: <AnimatedCounter value={38914} locale="en-US" />,
    label: 'Weekly active users',
    description: 'Product managers, engineers and analysts.',
  },
  {
    id: 'latency',
    value: <AnimatedCounter value={94} locale="en-US" suffix="ms" />,
    label: 'Median query latency',
    description: 'p50 across all dashboard reads.',
  },
  {
    id: 'uptime',
    value: <AnimatedCounter value={99.98} locale="en-US" suffix="%" format={{ minimumFractionDigits: 2 }} />,
    label: 'Uptime last 90 days',
    description: 'Measured from outside our own network.',
  },
]

const TESTIMONIALS = [
  {
    id: 't1',
    quote:
      'We replaced a dashboard nobody opened with four charts everybody argues about. That is the upgrade — the arguments are now about the product instead of about the data.',
    author: 'Mei Lin Chen',
    role: 'VP Product, Aster Financial',
    avatar: 'https://i.pravatar.cc/96?img=63',
  },
  {
    id: 't2',
    quote:
      'The cohort view found our onboarding regression in about nine minutes. Our previous tool had the same data and took a fortnight and a data scientist.',
    author: 'Jonas Weber',
    role: 'Head of Growth, Fathom Robotics',
    avatar: 'https://i.pravatar.cc/96?img=24',
  },
  {
    id: 't3',
    quote:
      'Anomaly alerts with no thresholds sounded like marketing. Six weeks in it has paged us twice, and both times it was right.',
    author: 'Amara Okafor',
    role: 'Staff Engineer, Northwind Labs',
    avatar: 'https://i.pravatar.cc/96?img=12',
  },
]

/** `SoftwareApplication` with the three plans as `Offer`s. */
const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pulse Analytics',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Product analytics with funnels, retention cohorts, session replay and anomaly alerts. Shipped as a free open-source Next.js template built with VivekUI.',
  url: SITE.url,
  softwareVersion: '1.0.0',
  license: 'https://opensource.org/licenses/MIT',
  isAccessibleForFree: true,
  author: { '@type': 'Person', name: 'Vivek Kumar Singh', url: PACKAGE.author },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '127',
    bestRating: '5',
  },
  offers: PLANS.map((plan) => ({
    '@type': 'Offer',
    name: plan.name,
    price: String(plan.monthly),
    priceCurrency: 'USD',
    description: plan.description,
    url: `${SITE.url}/pricing`,
    availability: 'https://schema.org/InStock',
  })),
}

export default function HomePage() {
  return (
    <>
      <a className="pulse-skip" href="#main">
        Skip to content
      </a>
      <SiteNavbar />

      <main id="main">
        {/*
          The hero's media slot holds a live panel of real charts rather than a
          screenshot — the product demo IS the hero. `layout="split"` is a container
          query on the hero itself, so the panel drops below the copy when there is no
          room for it beside.
        */}
        <Hero
          className="pulse-hero"
          size="xl"
          padding="xl"
          align="start"
          layout="split"
          eyebrow="Free & open source · MIT"
          title="Product analytics you can read at a glance"
          description="Pulse turns your event stream into the four numbers your team actually argues about — and the six charts that explain them. This entire site, dashboard included, is a free Next.js template."
          actions={
            <>
              <Button asChild size="lg">
                <Link href="/dashboard">Open the live dashboard</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/built-with">See how it is built</Link>
              </Button>
            </>
          }
          media={<HeroPanel />}
        />

        <LogoCloud title="Trusted by product teams at" logos={CUSTOMER_LOGOS} />

        <FeatureGrid
          eyebrow="Why Pulse"
          title="Six things that make a metric useful"
          description="A number without context is trivia. Everything here exists to put a number next to the reason it moved."
          features={FEATURES}
          columns={{ base: 1, md: 2, lg: 3 }}
        />

        <Stats
          background="muted"
          eyebrow="By the numbers"
          title="Running quietly at scale"
          description="Figures count up once when they scroll into view, and stay put under reduced-motion."
          items={STAT_ITEMS}
          columns={{ base: 2, lg: 4 }}
        />

        <Testimonials
          eyebrow="Customers"
          title="What teams say once they have shipped with it"
          items={TESTIMONIALS}
          columns={{ base: 1, md: 3 }}
        />

        <Pricing
          eyebrow="Pricing"
          title="Three plans, no sales call to see the price"
          description="Billed monthly or yearly. Every plan includes all six chart types — they are part of the component library, not an add-on."
          plans={PLANS.map((plan) => ({
            id: plan.id,
            name: plan.name,
            price: plan.monthly === 0 ? '$0' : `$${plan.monthly}`,
            period: plan.monthly === 0 ? 'forever' : '/month',
            description: plan.description,
            features: plan.features,
            highlighted: plan.highlighted,
            badge: plan.badge,
            cta: (
              <Button asChild fullWidth variant={plan.highlighted ? 'solid' : 'outline'}>
                <Link href="/pricing">{plan.cta}</Link>
              </Button>
            ),
          }))}
          columns={{ base: 1, md: 3 }}
        />

        <Section align="center" padding="sm">
          <Text tone="muted">
            Need the yearly discount, the feature-by-feature comparison, or the FAQ?{' '}
            <Link href="/pricing">See full pricing</Link>.
          </Text>
        </Section>

        <FAQ
          background="muted"
          // A shared `name` makes the group mutually exclusive natively — no JS.
          name="home-faq"
          defaultOpenIndex={0}
          eyebrow="FAQ"
          title="Questions about the template"
          items={FAQ_ITEMS.map((item) => ({
            id: item.id,
            question: item.question,
            answer: item.answerText,
          }))}
        />

        <CTA
          background="primary"
          eyebrow="Take the whole thing"
          title="Clone it, rename it, ship it"
          description="Marketing site, dashboard, six charts, sitemap, structured data and a README. MIT licensed."
          actions={
            <>
              <Button asChild size="lg" variant="outline">
                <a href={SITE.repo} target="_blank" rel="noopener noreferrer">
                  Use this template
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/built-with">Component map</Link>
              </Button>
            </>
          }
        />

        <Section align="center">
          <Badge variant="soft" tone="primary" pill>
            Changelog
          </Badge>
          <div style={{ marginBlockStart: 'var(--vk-space-6)' }}>
            <NewsletterSignup />
          </div>
        </Section>
      </main>

      <SiteFooter />

      <JsonLd data={appSchema} />
      <JsonLd data={faqPage(FAQ_ITEMS.map((f) => ({ question: f.question, answerText: f.answerText })))} />
      <JsonLd data={breadcrumbs(SITE.url, [{ name: 'Home', path: '/' }])} />
    </>
  )
}
