import type { Metadata } from 'next'
import { Badge, Card, Heading, RelativeTime, Text, Timeline } from '@the_viveksingh/vivek-ui'
import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  ProgressRing,
} from '@the_viveksingh/vivek-ui/charts'

import { KpiCard } from '@/components/dashboard/kpi-card'
import {
  KPIS,
  PLAN_MIX,
  PLAN_MIX_TOTAL,
  QUARTERLY_GOALS,
  RETENTION_COHORTS,
  REVENUE_30D,
  SIGNUPS_BY_CHANNEL,
  fmt,
} from '@/data/analytics'
import { ACTIVITY, activityDate } from '@/data/roadmap'

export const metadata: Metadata = {
  title: 'Dashboard — all six charts, server-rendered',
  description:
    'The Pulse demo dashboard: four KPI cards with sparklines, plus area, bar, line, pie and progress-ring charts. Every chart comes from VivekUI — no chart library is installed.',
  alternates: { canonical: '/dashboard' },
}

/**
 * The flagship charts page. All six VivekUI chart types appear here:
 *
 * | Chart          | What it shows                        |
 * | -------------- | ------------------------------------ |
 * | `Sparkline`    | one per KPI card, fourteen-day trend |
 * | `AreaChart`    | revenue, last thirty days            |
 * | `BarChart`     | signups by channel                   |
 * | `LineChart`    | retention, three cohorts             |
 * | `PieChart`     | plan mix as a donut                  |
 * | `ProgressRing` | three quarterly goals                |
 *
 * The whole page is a server component. The charts are pure SVG with no measurement
 * step, so none of them needs a client boundary and all of them are in the first byte
 * of HTML.
 */
export default function DashboardPage() {
  return (
    <>
      <div className="dash-row" style={{ marginBlockEnd: 'var(--vk-space-6)' }}>
        <div>
          {/* One h1 per page. */}
          <Heading level={1} size="xl">
            Overview
          </Heading>
          <Text tone="muted" style={{ marginBlockStart: 'var(--vk-space-1)' }}>
            26 July – 24 August · compared with the previous 30 days
          </Text>
        </div>
        <Badge variant="soft" tone="success" pill>
          All systems operational
        </Badge>
      </div>

      {/* ---------------------------------------------- KPI row: four Sparklines */}
      <section aria-label="Key metrics" className="dash-kpis">
        {KPIS.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </section>

      {/* ---------------------------------------------- Charts */}
      <div className="dash-grid" style={{ marginBlockStart: 'var(--vk-space-6)' }}>
        <Card variant="outline" padding="md" className="dash-grid-wide">
          <ChartHeading
            title="Revenue"
            note="Recognised daily, in thousands of USD"
            level={2}
          />
          <AreaChart
            data={REVENUE_30D}
            height={260}
            curve="smooth"
            showGrid
            showAxes
            strokeWidth={2}
            tooltip
            title="Daily revenue over the last thirty days"
            description="Rises from $4.1k to $9.0k, with a regular dip every weekend."
            xLabel="Day"
            yLabel="Revenue"
            formatValue={fmt.usdK}
          />
        </Card>

        <Card variant="outline" padding="md">
          <ChartHeading title="Signups by channel" note="Last 30 days" level={2} />
          <BarChart
            data={SIGNUPS_BY_CHANNEL}
            height={240}
            showGrid
            showAxes
            barRadius={4}
            showValues
            tooltip
            title="Signups by acquisition channel"
            description="Organic search leads with 1,840 signups; partners contribute 287."
            xLabel="Channel"
            yLabel="Signups"
            formatValue={fmt.thousands}
          />
        </Card>

        <Card variant="outline" padding="md">
          <ChartHeading title="Retention by cohort" note="Percent still active" level={2} />
          <LineChart
            series={RETENTION_COHORTS}
            height={240}
            showGrid
            showAxes
            showLegend
            /* A dashboard legend is a set of controls, which is exactly where the
               interactive variant belongs — and it works with no JavaScript. */
            interactiveLegend
            curve="smooth"
            tooltip
            title="Retention by signup cohort, months since signup"
            description="The July cohort holds 71% at month five, against 52% for May."
            xLabel="Months since signup"
            yLabel="Still active"
            formatValue={fmt.percent}
          />
        </Card>

        <Card variant="outline" padding="md">
          <ChartHeading title="Plan mix" note={`${PLAN_MIX_TOTAL.toLocaleString('en-US')} workspaces`} level={2} />
          <PieChart
            data={PLAN_MIX}
            donut
            innerRadius={0.62}
            size={240}
            showLabels
            showLegend
            centerLabel="38.9k"
            centerSublabel="workspaces"
            title="Workspaces by plan"
            description="Free holds 24,610 workspaces, Pro 9,840 and Team 4,464."
            xLabel="Plan"
            yLabel="Workspaces"
            formatValue={fmt.thousands}
          />
        </Card>

        <Card variant="outline" padding="md">
          <ChartHeading title="Quarterly goals" note="Q3 to date" level={2} />
          <div className="dash-goals" style={{ marginBlockStart: 'var(--vk-space-4)' }}>
            {QUARTERLY_GOALS.map((goal) => (
              <div key={goal.id} className="dash-goal">
                <ProgressRing
                  value={goal.value}
                  max={goal.max}
                  size={116}
                  thickness={10}
                  label={goal.label}
                  title={`${goal.label}: ${goal.value}% of target`}
                >
                  <span className="dash-ring-value">{goal.value}%</span>
                  <span className="dash-ring-caption">{goal.caption}</span>
                </ProgressRing>
                <Text as="p" size="sm" weight="medium" style={{ marginBlockStart: 'var(--vk-space-2)' }}>
                  {goal.label}
                </Text>
              </div>
            ))}
          </div>
        </Card>

        {/* ---------------------------------------------- Activity */}
        <Card variant="outline" padding="md" className="dash-grid-wide">
          <ChartHeading title="Recent activity" note="Across the workspace" level={2} />
          <div style={{ marginBlockStart: 'var(--vk-space-4)' }}>
            <Timeline>
              {ACTIVITY.map((entry) => (
                <Timeline.Item
                  key={entry.id}
                  title={entry.title}
                  description={entry.description}
                  status={entry.status}
                  headingLevel={3}
                  timestamp={
                    /*
                     * No `now` prop, deliberately. Without it the first render on both
                     * the server and the client shows the absolute time — which depends
                     * only on `date`, so the two agree — and the relative phrasing takes
                     * over on mount. It is also the no-JavaScript fallback: a real
                     * timestamp rather than an empty element.
                     */
                    <RelativeTime date={activityDate(entry.minutesAgo)} locale="en-US" />
                  }
                />
              ))}
            </Timeline>
          </div>
        </Card>
      </div>
    </>
  )
}

/** Shared card heading: a real heading plus a muted note, on one baseline. */
function ChartHeading({
  title,
  note,
  level,
}: {
  title: string
  note: string
  level: 2 | 3
}) {
  return (
    <div className="dash-row" style={{ marginBlockEnd: 'var(--vk-space-3)' }}>
      <Heading level={level} size="sm">
        {title}
      </Heading>
      <Text size="sm" tone="muted">
        {note}
      </Text>
    </div>
  )
}
