import type { Metadata } from 'next'
import { FAQ, Section } from '@the_viveksingh/vivek-ui'

import { PricingTiers } from '@/components/marketing/pricing-tiers'
import { JsonLd, breadcrumbs, faqPage } from '@/components/site/json-ld'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteNavbar } from '@/components/site/site-navbar'
import { FAQ_ITEMS, PLANS } from '@/lib/content'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Pricing — three plans, all six charts included',
  description:
    'Pulse pricing: Free, Pro at $49/month and Team at $149/month, with two months free on yearly billing. Every plan includes all six VivekUI chart types. The template itself is MIT licensed and free.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing — Pulse',
    description: 'Free, Pro and Team. Two months free yearly. The template is MIT licensed.',
    url: '/pricing',
  },
}

/** Pricing-page FAQ: the billing questions, then the template licence question. */
const PRICING_FAQ = [
  {
    id: 'switch',
    question: 'What does yearly billing actually save?',
    answerText:
      'Two months. Pro is $49 per month billed monthly and $41 per month billed yearly, and Team is $149 versus $124. The switch above the plans recalculates every price, and the badge is not doing anything clever — twelve months at the yearly rate costs the same as ten at the monthly one.',
  },
  {
    id: 'overage',
    question: 'What happens if we go over the event allowance?',
    answerText:
      'Nothing breaks and nothing is dropped. Events above the plan allowance are metered and billed at the end of the period, and you get an alert at 80 percent so the invoice is never a surprise.',
  },
  ...FAQ_ITEMS,
]

const offerSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Pulse Analytics',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: `${SITE.url}/pricing`,
  offers: PLANS.map((plan) => ({
    '@type': 'Offer',
    name: `${plan.name} plan`,
    price: String(plan.monthly),
    priceCurrency: 'USD',
    description: plan.description,
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: String(plan.monthly),
      priceCurrency: 'USD',
      unitText: 'MONTH',
    },
  })),
}

export default function PricingPage() {
  return (
    <>
      <a className="pulse-skip" href="#main">
        Skip to content
      </a>
      <SiteNavbar />

      <main id="main">
        <Section size="xl" padding="xl" align="center">
          <Section.Header
            headingLevel={1}
            titleSize="2xl"
            eyebrow="Pricing"
            title="Priced per event, not per seat"
            description="Because charging for seats is how a company ends up with one login shared by six people, and then nobody knows who changed the dashboard."
          />
          <div style={{ marginBlockStart: 'var(--vk-space-10)' }}>
            <PricingTiers />
          </div>
        </Section>

        <FAQ
          background="muted"
          name="pricing-faq"
          defaultOpen={0}
          eyebrow="FAQ"
          title="Billing and licensing"
          items={PRICING_FAQ.map((item) => ({
            id: item.id,
            question: item.question,
            answer: item.answerText,
          }))}
        />
      </main>

      <SiteFooter />

      <JsonLd data={offerSchema} />
      <JsonLd data={faqPage(PRICING_FAQ)} />
      <JsonLd
        data={breadcrumbs(SITE.url, [
          { name: 'Home', path: '/' },
          { name: 'Pricing', path: '/pricing' },
        ])}
      />
    </>
  )
}
