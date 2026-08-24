import { Card, Skeleton } from '@the_viveksingh/vivek-ui'

/**
 * The dashboard's loading state, matched to the real layout so nothing jumps when the
 * content arrives — four KPI cards, then the chart grid.
 *
 * `Skeleton` is hidden from assistive technology on purpose: a screen reader user gets
 * the route change announcement, not eleven shimmering rectangles. The visible-only
 * placeholder is for the people who can see the layout settle.
 */
export default function DashboardLoading() {
  return (
    <>
      <Skeleton width="12rem" height="2rem" />

      <div className="dash-kpis" style={{ marginBlockStart: 'var(--vk-space-6)' }}>
        {[0, 1, 2, 3].map((index) => (
          <Card key={index} variant="outline" padding="md">
            <Skeleton width="60%" height="0.875rem" />
            <div style={{ marginBlockStart: 'var(--vk-space-3)' }}>
              <Skeleton width="45%" height="1.75rem" />
            </div>
            <div style={{ marginBlockStart: 'var(--vk-space-3)' }}>
              <Skeleton height="2.125rem" />
            </div>
          </Card>
        ))}
      </div>

      <div className="dash-grid" style={{ marginBlockStart: 'var(--vk-space-6)' }}>
        <Card variant="outline" padding="md" className="dash-grid-wide">
          <Skeleton width="8rem" height="1rem" />
          <div style={{ marginBlockStart: 'var(--vk-space-4)' }}>
            <Skeleton height="16.25rem" />
          </div>
        </Card>
        {[0, 1, 2].map((index) => (
          <Card key={index} variant="outline" padding="md">
            <Skeleton width="9rem" height="1rem" />
            <div style={{ marginBlockStart: 'var(--vk-space-4)' }}>
              <Skeleton height="15rem" />
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
