'use client'

import { useState } from 'react'
import {
  Button,
  Card,
  DatePicker,
  Field,
  Flex,
  Heading,
  Text,
  useToast,
} from '@the_viveksingh/vivek-ui'
import { AreaChart, BarChart, LineChart, PieChart } from '@the_viveksingh/vivek-ui/charts'

import { IconExport } from '@/components/dashboard/icons'
import {
  EVENTS_BY_WEEK,
  FEATURE_ADOPTION,
  REVENUE_30D,
  TRAFFIC_SOURCES,
  fmt,
} from '@/data/analytics'

/** Fixed defaults, so the page prerenders identically on every build. */
const DEFAULT_FROM = new Date('2025-07-26T00:00:00Z')
const DEFAULT_TO = new Date('2025-08-24T00:00:00Z')

/**
 * The reports view: a date range, a grid of charts, and an export that reports back.
 *
 * ### On the date range
 *
 * `DatePicker` is a single-date control — `value` is one `Date | null` — so a range is
 * two of them, which is also the honest UI: two labelled fields you can type into
 * beat one field that has to guess which half of "03/04 - 05/06" you meant. Each one
 * accepts typed input in `YYYY-MM-DD` as a first-class path, not a fallback, and the
 * `min`/`max` props keep the two ends from crossing over.
 */
export function ReportsView() {
  const { toast } = useToast()
  const [from, setFrom] = useState<Date | null>(DEFAULT_FROM)
  const [to, setTo] = useState<Date | null>(DEFAULT_TO)
  const [exporting, setExporting] = useState(false)

  const rangeLabel =
    from && to ? `${iso(from)} → ${iso(to)}` : 'Pick both ends of the range'

  async function handleExport() {
    setExporting(true)
    // Stands in for the request a real build would make. The button is disabled while
    // it is in flight, so the export cannot be queued twice.
    await new Promise((resolve) => setTimeout(resolve, 700))
    setExporting(false)
    toast({
      title: 'Report exported',
      description: `${rangeLabel} · 4 charts, 1,284 rows. Nothing left your browser — this template has no backend.`,
      tone: 'success',
      duration: 6000,
      action: (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => toast({ title: 'Export cancelled', tone: 'info' })}
        >
          Undo
        </Button>
      ),
    })
  }

  return (
    <>
      <Card variant="outline" padding="md">
        <Flex gap={4} align="end" wrap>
          <Field label="From" help="YYYY-MM-DD">
            <DatePicker
              value={from}
              onValueChange={setFrom}
              max={to ?? undefined}
              name="from"
              size="sm"
            />
          </Field>

          <Field label="To" help="YYYY-MM-DD">
            <DatePicker
              value={to}
              onValueChange={setTo}
              min={from ?? undefined}
              name="to"
              size="sm"
            />
          </Field>

          <div style={{ marginInlineStart: 'auto' }}>
            <Button onClick={handleExport} loading={exporting}>
              <IconExport />
              <span style={{ marginInlineStart: 'var(--vk-space-2)' }}>Export</span>
            </Button>
          </div>
        </Flex>

        <Text size="sm" tone="muted" style={{ marginBlockStart: 'var(--vk-space-3)' }}>
          Showing {rangeLabel}. The charts below are mocked and do not refilter — the
          range is here to show the control.
        </Text>
      </Card>

      <div className="dash-grid" style={{ marginBlockStart: 'var(--vk-space-6)' }}>
        <Card variant="outline" padding="md" className="dash-grid-wide">
          <Heading level={2} size="sm">
            Revenue over the range
          </Heading>
          <div style={{ marginBlockStart: 'var(--vk-space-3)' }}>
            <AreaChart
              data={REVENUE_30D}
              height={220}
              curve="smooth"
              showGrid
              showAxes
              tooltip
              title="Revenue across the selected range"
              description="Daily recognised revenue in thousands of USD."
              xLabel="Day"
              yLabel="Revenue"
              formatValue={fmt.usdK}
            />
          </div>
        </Card>

        <Card variant="outline" padding="md">
          <Heading level={2} size="sm">
            Volume by week
          </Heading>
          <div style={{ marginBlockStart: 'var(--vk-space-3)' }}>
            <LineChart
              series={EVENTS_BY_WEEK}
              height={220}
              showGrid
              showAxes
              showLegend
              interactiveLegend
              curve="smooth"
              tooltip
              title="Tracked events and identified users by week"
              description="Both series in millions; events grow from 8.4M to 12.9M."
              xLabel="Week"
              yLabel="Millions"
              formatValue={fmt.millions}
            />
          </div>
        </Card>

        <Card variant="outline" padding="md">
          <Heading level={2} size="sm">
            Feature adoption
          </Heading>
          <div style={{ marginBlockStart: 'var(--vk-space-3)' }}>
            <BarChart
              data={FEATURE_ADOPTION}
              height={220}
              horizontal
              showGrid
              showAxes
              showValues
              barRadius={4}
              title="Feature adoption as a percentage of active workspaces"
              description="Dashboards lead at 88%; alerts trail at 39%."
              xLabel="Feature"
              yLabel="Adoption"
              formatValue={fmt.percent}
            />
          </div>
        </Card>

        <Card variant="outline" padding="md">
          <Heading level={2} size="sm">
            Traffic sources
          </Heading>
          <div style={{ marginBlockStart: 'var(--vk-space-3)' }}>
            <PieChart
              data={TRAFFIC_SOURCES}
              size={220}
              showLabels
              showLegend
              title="Sessions by traffic source"
              description="Direct leads with 4,820 sessions, then search at 3,610."
              xLabel="Source"
              yLabel="Sessions"
              formatValue={fmt.thousands}
            />
          </div>
        </Card>
      </div>
    </>
  )
}

/** `YYYY-MM-DD`, built from UTC parts so it cannot shift with the runtime's zone. */
function iso(date: Date): string {
  return date.toISOString().slice(0, 10)
}
