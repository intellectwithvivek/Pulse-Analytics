import type { Metadata } from 'next'
import { Heading, Text } from '@the_viveksingh/vivek-ui'

import { ReportsView } from '@/components/dashboard/reports-view'

export const metadata: Metadata = {
  title: 'Reports — date range, chart grid and export',
  description:
    'The Pulse reports view: a VivekUI DatePicker range, a four-chart grid covering area, line, horizontal bar and pie, and an export button that reports back through a Toast.',
  alternates: { canonical: '/dashboard/reports' },
}

export default function ReportsPage() {
  return (
    <>
      <div className="dash-row" style={{ marginBlockEnd: 'var(--vk-space-6)' }}>
        <div>
          <Heading level={1} size="xl">
            Reports
          </Heading>
          <Text tone="muted" style={{ marginBlockStart: 'var(--vk-space-1)' }}>
            Pick a range, read the charts, export the lot.
          </Text>
        </div>
      </div>

      <ReportsView />
    </>
  )
}
