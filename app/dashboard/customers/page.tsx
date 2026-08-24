import type { Metadata } from 'next'
import { Card, Heading, Text } from '@the_viveksingh/vivek-ui'

import { CustomersTable } from '@/components/dashboard/customers-table'

export const metadata: Metadata = {
  title: 'Customers — sortable, searchable DataTable',
  description:
    'The Pulse customers view: a VivekUI DataTable with sortable columns, status badges, avatars, search, pagination, row actions and an empty state — one semantic table, no grid library.',
  alternates: { canonical: '/dashboard/customers' },
}

export default function CustomersPage() {
  return (
    <>
      <div className="dash-row" style={{ marginBlockEnd: 'var(--vk-space-6)' }}>
        <div>
          <Heading level={1} size="xl">
            Customers
          </Heading>
          <Text tone="muted" style={{ marginBlockStart: 'var(--vk-space-1)' }}>
            20 accounts · $18,380 combined MRR · sorted by revenue
          </Text>
        </div>
      </div>

      <Card variant="outline" padding="md">
        <CustomersTable />
      </Card>

      <Text size="sm" tone="muted" style={{ marginBlockStart: 'var(--vk-space-4)' }}>
        Search for something that does not exist — <em>zzz</em>, say — to see the empty
        state, and narrow the window to watch each row fold into a labelled card.
      </Text>
    </>
  )
}
