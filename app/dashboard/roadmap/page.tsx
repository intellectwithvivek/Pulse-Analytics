import type { Metadata } from 'next'
import { Heading, Text } from '@the_viveksingh/vivek-ui'

import { RoadmapBoard } from '@/components/dashboard/roadmap-board'

export const metadata: Metadata = {
  title: 'Roadmap — a Kanban board a keyboard can use',
  description:
    'The Pulse roadmap: a VivekUI KanbanBoard with four columns, drag-and-drop, WIP limits and a full keyboard path — pick up with Space, move with the arrow keys, announced through a live region.',
  alternates: { canonical: '/dashboard/roadmap' },
}

export default function RoadmapPage() {
  return (
    <>
      <div className="dash-row" style={{ marginBlockEnd: 'var(--vk-space-6)' }}>
        <div>
          <Heading level={1} size="xl">
            Roadmap
          </Heading>
          <Text tone="muted" style={{ marginBlockStart: 'var(--vk-space-1)' }}>
            What is shipping this quarter. In progress and Review carry WIP limits.
          </Text>
        </div>
      </div>

      <RoadmapBoard />
    </>
  )
}
