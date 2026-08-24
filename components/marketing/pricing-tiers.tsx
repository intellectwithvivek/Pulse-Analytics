'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Badge,
  Button,
  Flex,
  Heading,
  Pricing,
  Switch,
  Table,
  Text,
} from '@the_viveksingh/vivek-ui'

import { COMPARISON, PLANS } from '@/lib/content'

/**
 * The plan grid plus the billing-period switch and the comparison table.
 *
 * A client component because the period is state. `Switch` is a native checkbox with
 * `role="switch"`, so it announces "on"/"off" and takes effect immediately, which is
 * the right control for something that has no submit step.
 */
export function PricingTiers() {
  const [yearly, setYearly] = useState(false)

  return (
    <>
      <Flex
        gap={3}
        align="center"
        justify="center"
        wrap
        style={{ marginBlockEnd: 'var(--vk-space-8)' }}
      >
        <Switch
          checked={yearly}
          onChange={(event) => setYearly(event.currentTarget.checked)}
          label="Bill yearly"
          labelPosition="start"
        />
        <Badge variant="soft" tone="success" pill>
          2 months free
        </Badge>
      </Flex>

      <Pricing
        padding="none"
        plans={PLANS.map((plan) => {
          const price = yearly ? plan.yearly : plan.monthly
          return {
            id: plan.id,
            name: plan.name,
            price: price === 0 ? '$0' : `$${price}`,
            period: price === 0 ? 'forever' : yearly ? '/month, billed yearly' : '/month',
            description: plan.description,
            features: plan.features,
            highlighted: plan.highlighted,
            badge: plan.badge,
            cta: (
              <Button asChild fullWidth variant={plan.highlighted ? 'solid' : 'outline'}>
                <Link href="/dashboard">{plan.cta}</Link>
              </Button>
            ),
          }
        })}
        columns={{ base: 1, md: 3 }}
      />

      <div style={{ marginBlockStart: 'var(--vk-space-16)' }}>
        <Heading level={2} size="lg" align="center">
          Every feature, side by side
        </Heading>
        <Text tone="muted" align="center" style={{ marginBlockStart: 'var(--vk-space-2)' }}>
          {yearly
            ? 'Yearly billing — two months free on Pro and Team.'
            : 'Monthly billing, cancel any time.'}
        </Text>

        <div style={{ marginBlockStart: 'var(--vk-space-6)' }}>
          {/* Named by its caption, not an aria-label: an aria-label would win the
              accessible name and silence the caption that says the same thing. */}
          <Table striped hoverable size="md">
            <Table.Caption>
              Feature comparison across the Free, Pro and Team plans
            </Table.Caption>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell scope="col">Feature</Table.HeaderCell>
                {PLANS.map((plan) => (
                  <Table.HeaderCell key={plan.id} scope="col" align="center">
                    {plan.name}
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {COMPARISON.map((row) => (
                <Table.Row key={row.feature}>
                  <Table.HeaderCell scope="row">{row.feature}</Table.HeaderCell>
                  <Table.Cell align="center" label="Free">
                    <Availability value={row.free} plan="Free" feature={row.feature} />
                  </Table.Cell>
                  <Table.Cell align="center" label="Pro">
                    <Availability value={row.pro} plan="Pro" feature={row.feature} />
                  </Table.Cell>
                  <Table.Cell align="center" label="Team">
                    <Availability value={row.team} plan="Team" feature={row.feature} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  )
}

/**
 * A cell in the comparison grid.
 *
 * A bare tick glyph is announced as "check mark" at best and skipped at worst, so the
 * glyph is decorative and a visually hidden phrase carries the meaning.
 */
function Availability({
  value,
  plan,
  feature,
}: {
  value: string | boolean
  plan: string
  feature: string
}) {
  if (typeof value === 'string') return <>{value}</>

  return (
    <>
      <span aria-hidden="true" style={{ color: value ? 'var(--vk-color-success)' : 'var(--vk-color-muted)' }}>
        {value ? '✓' : '—'}
      </span>
      <span className="vk-visually-hidden">
        {feature} {value ? 'included' : 'not included'} on {plan}
      </span>
    </>
  )
}
