import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Section,
  Stack,
  Table,
  Text,
} from '@the_viveksingh/vivek-ui'

import { JsonLd, breadcrumbs } from '@/components/site/json-ld'
import { PromoInstall } from '@/components/site/promo-install'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteNavbar } from '@/components/site/site-navbar'
import { CHART_COUNT, COMPONENT_COUNT, INVENTORY } from '@/lib/inventory'
import { PACKAGE, SITE, chartDocs, componentDocs, promo } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Built with VivekUI — every component on this site',
  description:
    'A section-by-section map of the components behind this free Next.js SaaS template. Every chart renders from @the_viveksingh/vivek-ui — no chart library is installed.',
  alternates: { canonical: '/built-with' },
  openGraph: {
    title: 'Built with VivekUI',
    description:
      'Every section of this template mapped to the component that draws it, each one deep-linked to its docs.',
    url: '/built-with',
  },
}

export default function BuiltWithPage() {
  const charts = INVENTORY.filter((entry) => entry.kind === 'chart')
  const components = INVENTORY.filter((entry) => entry.kind === 'component')

  return (
    <>
      <a className="pulse-skip" href="#main">
        Skip to content
      </a>
      <SiteNavbar />

      <main id="main">
        <Section size="xl" padding="xl">
          <Stack gap={6}>
            <Badge variant="soft" tone="primary" pill>
              Component map
            </Badge>

            {/* One h1 per page. */}
            <Heading level={1} size="2xl">
              Built with VivekUI
            </Heading>

            <Text size="lg">
              This entire website is built with VivekUI, a free React component library
              with zero runtime dependencies.
            </Text>

            <Text tone="muted">
              Not a wrapper around Tailwind, not a copy-paste kit you now maintain, and not
              a chart library in a trench coat. One install, one CSS import, no config
              file — and {COMPONENT_COUNT} of its exports plus all {CHART_COUNT} of its
              charts are on the pages you just clicked through.
            </Text>

            <PromoInstall size="md" />

            <Flex gap={3} wrap>
              <Button asChild>
                <a
                  href={promo(PACKAGE.docs, 'builtwith')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the Docs
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={PACKAGE.github} target="_blank" rel="noopener noreferrer">
                  Star on GitHub
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={SITE.repo} target="_blank" rel="noopener noreferrer">
                  Use this template
                </a>
              </Button>
            </Flex>
          </Stack>
        </Section>

        {/* ------------------------------------------------ The charts claim */}
        <Section background="muted" size="xl">
          <Stack gap={4}>
            <Heading level={2} size="lg">
              No chart library is installed
            </Heading>
            <Text size="lg">
              Every chart on this site renders from{' '}
              <code className="pulse-mono">@the_viveksingh/vivek-ui</code> — no chart
              library installed.
            </Text>
            <Text tone="muted">
              There is no Recharts, no Chart.js and no D3 in <code className="pulse-mono">package.json</code>
              . All six charts are pure SVG with no measurement step, which is why they
              render on the server: view source on the dashboard and the paths are already
              there. Each one also ships a visually hidden data table, so a screen reader
              gets the numbers rather than the word &ldquo;graphic&rdquo;, and series are
              told apart by dash pattern and marker shape as well as colour.
            </Text>

            <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap={4}>
              {charts.map((chart) => (
                <Card key={chart.name} variant="outline" padding="md">
                  <Stack gap={2}>
                    <a
                      className="builtwith-component"
                      href={chartDocs(chart.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`<${chart.name} />`}
                    </a>
                    <Text size="sm" tone="muted">
                      {chart.where}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Section>

        {/* ------------------------------------------------ Full map */}
        <Section size="xl">
          <Section.Header
            headingLevel={2}
            title="Section by section"
            description="Every component this template imports, what it draws, and a link straight to its documentation."
          />

          <div style={{ marginBlockStart: 'var(--vk-space-6)' }}>
            {/* Table renders its own scroll container, so a wide map scrolls inside
                itself instead of making the page scroll sideways. */}
            <Table striped hoverable size="sm">
              <Table.Caption visuallyHidden>
                Each VivekUI component used by this template and where it appears
              </Table.Caption>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell scope="col">Component</Table.HeaderCell>
                  <Table.HeaderCell scope="col">Where it appears on this site</Table.HeaderCell>
                  <Table.HeaderCell scope="col">Docs</Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {[...charts, ...components].map((entry) => {
                  const href =
                    entry.kind === 'chart' ? chartDocs(entry.slug) : componentDocs(entry.slug)
                  return (
                    <Table.Row key={entry.name}>
                      <Table.HeaderCell scope="row" className="builtwith-component">
                        {entry.name}
                        {entry.kind === 'chart' ? (
                          <>
                            {' '}
                            <Badge variant="soft" tone="primary" size="sm">
                              chart
                            </Badge>
                          </>
                        ) : null}
                      </Table.HeaderCell>
                      <Table.Cell label="Where">{entry.where}</Table.Cell>
                      <Table.Cell label="Docs">
                        <a href={href} target="_blank" rel="noopener noreferrer">
                          Docs
                          <span className="vk-visually-hidden"> for {entry.name}</span>
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          </div>
        </Section>

        {/* ------------------------------------------------ What is NOT here */}
        <Section background="muted" size="xl">
          <Stack gap={4}>
            <Heading level={2} size="lg">
              What this template does not contain
            </Heading>
            <Grid cols={{ base: 1, md: 2 }} gap={4}>
              {[
                {
                  title: 'No Tailwind, no PostCSS plugin',
                  body: 'The styling is one imported stylesheet plus this project’s own globals.css. Every library selector is wrapped in :where(), so a single flat class of yours wins with no !important anywhere.',
                },
                {
                  title: 'No chart library',
                  body: 'Six chart types, all SVG, all from the same package as the buttons. That is roughly 100 kB of Recharts not shipped.',
                },
                {
                  title: 'No runtime dependencies',
                  body: 'The UI package pulls in nothing at runtime — no clsx, no CVA, no Radix, no Emotion. Check package.json; it is next, react and react-dom.',
                },
                {
                  title: 'No provider you must remember',
                  body: 'ThemeProvider is here because this site has a theme toggle. Every component works without it.',
                },
              ].map((item) => (
                <Card key={item.title} variant="outline" padding="md">
                  <Stack gap={2}>
                    <Heading level={3} size="sm">
                      {item.title}
                    </Heading>
                    <Text size="sm" tone="muted">
                      {item.body}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Section>

        <Section size="xl" align="center">
          <Stack gap={4} align="center">
            <Heading level={2} size="lg">
              Take it from here
            </Heading>
            <Text tone="muted">
              MIT licensed, credit removable, star appreciated.
            </Text>
            <Flex gap={3} wrap justify="center">
              <Button asChild size="lg">
                <a href={SITE.repo} target="_blank" rel="noopener noreferrer">
                  Use this template
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/dashboard">Back to the dashboard</Link>
              </Button>
            </Flex>
          </Stack>
        </Section>
      </main>

      <SiteFooter />

      <JsonLd
        data={breadcrumbs(SITE.url, [
          { name: 'Home', path: '/' },
          { name: 'Built with VivekUI', path: '/built-with' },
        ])}
      />
    </>
  )
}
