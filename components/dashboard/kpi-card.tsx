import { Card, Flex, Stack, Text } from '@the_viveksingh/vivek-ui'
import { Sparkline } from '@the_viveksingh/vivek-ui/charts'

import { type Kpi, fmt } from '@/data/analytics'

/**
 * One KPI: a figure, its change, and a fourteen-day sparkline.
 *
 * A server component — `Card`, `Text` and `Sparkline` all render without a client
 * boundary, so the whole KPI row is in the served HTML.
 *
 * The change chip carries an arrow as well as a colour. Colour alone would put the only
 * copy of "this went the wrong way" somewhere a third of red-green colourblind readers
 * cannot see it.
 */
export function KpiCard({ kpi }: { kpi: Kpi }) {
  const rising = kpi.delta > 0
  const arrow = rising ? '↑' : '↓'
  const magnitude = Math.abs(kpi.delta)

  return (
    <Card variant="outline" padding="md">
      <Stack gap={2}>
        <Text as="p" size="sm" tone="muted">
          {kpi.label}
        </Text>

        <Flex gap={2} align="baseline" wrap>
          <span className="pulse-figure" style={{ fontSize: '1.75rem', fontWeight: 700 }}>
            {kpi.value}
          </span>
          <span className="dash-delta" data-intent={kpi.intent}>
            <span aria-hidden="true">{arrow}</span>
            {magnitude}
            {kpi.id === 'nps' ? ' pts' : '%'}
            <span className="vk-visually-hidden">
              {rising ? 'up' : 'down'}, which is{' '}
              {kpi.intent === 'positive' ? 'good' : 'bad'}
            </span>
          </span>
        </Flex>

        <Sparkline
          data={kpi.trend}
          height={34}
          fill
          showLastPoint
          curve="smooth"
          title={`${kpi.label}, last 14 days`}
          description={`Trend from ${kpi.trend[0]} to ${kpi.trend[kpi.trend.length - 1]}.`}
          xLabel="Day"
          yLabel={kpi.label}
          formatValue={fmt.plain}
        />

        <Text as="p" size="sm" tone="muted">
          {kpi.hint}
        </Text>
      </Stack>
    </Card>
  )
}
