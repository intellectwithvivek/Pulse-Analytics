import { AreaChart, Sparkline } from '@the_viveksingh/vivek-ui/charts'

import { KPIS, REVENUE_HERO, fmt } from '@/data/analytics'

/**
 * The hero "screenshot" — except nothing here is an image.
 *
 * This is the real `AreaChart` and the real `Sparkline` from the library, rendering the
 * same mock series the dashboard uses, inside a frame that gives them the chrome a
 * screenshot would have had. Both charts are pure SVG with no measurement step, so the
 * whole panel is server-rendered: it is in the HTML before any JavaScript arrives, and
 * it cannot go stale the way a captured PNG does.
 */
export function HeroPanel() {
  return (
    <div className="pulse-panel">
      <div className="pulse-panel-bar">
        {/* Decorative window furniture — hidden, because it says nothing. */}
        <span className="pulse-panel-dot" aria-hidden="true" />
        <span className="pulse-panel-dot" aria-hidden="true" />
        <span className="pulse-panel-dot" aria-hidden="true" />
        <span className="pulse-panel-title">pulse.app/dashboard</span>
      </div>

      <div className="pulse-panel-body">
        <div className="dash-row" style={{ marginBlockEnd: 'var(--vk-space-4)' }}>
          <div>
            <p className="pulse-kpi-mini-label">Revenue · last 14 days</p>
            <p className="pulse-figure" style={{ fontSize: '1.75rem', fontWeight: 700 }}>
              $96.4k
            </p>
          </div>
          <span className="pulse-live">live</span>
        </div>

        <AreaChart
          data={REVENUE_HERO}
          height={200}
          curve="smooth"
          showGrid
          showAxes
          strokeWidth={2}
          title="Daily revenue over the last fourteen days"
          description="Recognised revenue in thousands of US dollars, rising from $6.9k to $9.0k with weekend dips."
          xLabel="Day"
          yLabel="Revenue"
          formatValue={fmt.usdK}
        />

        <div className="pulse-kpi-strip">
          {KPIS.map((kpi) => (
            <div key={kpi.id} className="pulse-kpi-mini">
              <p className="pulse-kpi-mini-label">{shortLabel(kpi.id)}</p>
              <p className="pulse-figure" style={{ fontSize: '1.0625rem', fontWeight: 700 }}>
                {kpi.value}
              </p>
              <Sparkline
                data={kpi.trend}
                height={22}
                fill
                showLastPoint
                curve="smooth"
                title={`${kpi.label} trend`}
                formatValue={fmt.plain}
                // The figure above already names the metric; a second announcement of
                // the same fourteen numbers is noise, so the table is off here and on
                // in the dashboard cards where the trend is the point.
                accessibleTable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** The panel is tight, so the strip uses the short form of each metric name. */
function shortLabel(id: string): string {
  switch (id) {
    case 'mrr':
      return 'MRR'
    case 'users':
      return 'Active users'
    case 'churn':
      return 'Churn'
    default:
      return 'NPS'
  }
}
