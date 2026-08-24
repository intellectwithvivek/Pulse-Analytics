'use client'

import { useState } from 'react'
import {
  Badge,
  Button,
  KanbanBoard,
  type KanbanColumn,
  type KanbanMove,
  Text,
  useToast,
} from '@the_viveksingh/vivek-ui'

import { ROADMAP_COLUMNS } from '@/data/roadmap'

/**
 * The roadmap board.
 *
 * `KanbanBoard` reports an intended move and mutates nothing itself, which is the only
 * shape that works when a move might be rejected. So the reducer below owns the state,
 * and a move that would breach a column's WIP limit is refused here rather than in the
 * component.
 *
 * Both input paths work: drag with a pointer, or focus a card and press Space to pick it
 * up, then arrow it across and Space again to drop. The keyboard path exists because the
 * HTML5 drag-and-drop API has no keyboard equivalent at all, so a board built only on
 * dragging is unusable for anyone who cannot drag.
 */
export function RoadmapBoard() {
  const { toast } = useToast()
  const [columns, setColumns] = useState<KanbanColumn[]>(() =>
    ROADMAP_COLUMNS.map((column) => ({ ...column, cards: [...column.cards] })),
  )

  function handleMove({ cardId, fromColumnId, toColumnId, toIndex }: KanbanMove) {
    setColumns((current) => {
      const from = current.find((column) => column.id === fromColumnId)
      const to = current.find((column) => column.id === toColumnId)
      const card = from?.cards.find((item) => item.id === cardId)
      if (!from || !to || !card) return current

      // A WIP limit that only shows in the header is decoration. Moving within a column
      // is always allowed; arriving into a full one is not.
      if (
        fromColumnId !== toColumnId &&
        typeof to.limit === 'number' &&
        to.cards.length >= to.limit
      ) {
        toast({
          title: `${to.title} is at its limit`,
          description: `${to.title} holds ${to.limit} cards. Move something out before moving this in.`,
          tone: 'warning',
        })
        return current
      }

      return current.map((column) => {
        if (column.id === fromColumnId && column.id === toColumnId) {
          const without = column.cards.filter((item) => item.id !== cardId)
          without.splice(toIndex, 0, card)
          return { ...column, cards: without }
        }
        if (column.id === fromColumnId) {
          return { ...column, cards: column.cards.filter((item) => item.id !== cardId) }
        }
        if (column.id === toColumnId) {
          const next = [...column.cards]
          next.splice(toIndex, 0, card)
          return { ...column, cards: next }
        }
        return column
      })
    })
  }

  const total = columns.reduce((sum, column) => sum + column.cards.length, 0)

  return (
    <>
      <div className="dash-row" style={{ marginBlockEnd: 'var(--vk-space-4)' }}>
        <Text size="sm" tone="muted">
          {total} items · drag a card, or focus one and press{' '}
          <kbd className="pulse-mono">Space</kbd> to pick it up
        </Text>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setColumns(ROADMAP_COLUMNS.map((column) => ({ ...column, cards: [...column.cards] })))
            toast({ title: 'Board reset', tone: 'info' })
          }}
        >
          Reset board
        </Button>
      </div>

      <KanbanBoard
        columns={columns}
        label="Product roadmap"
        onMove={handleMove}
        renderCard={(card) => (
          <div>
            <div
              style={{
                display: 'flex',
                gap: 'var(--vk-space-2)',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              <Text as="span" weight="medium">
                {card.title}
              </Text>
              {card.badge ? (
                <Badge variant="soft" tone="neutral" size="sm">
                  {card.badge}
                </Badge>
              ) : null}
            </div>
            {card.description ? (
              <Text as="p" size="sm" tone="muted" style={{ marginBlockStart: 'var(--vk-space-2)' }}>
                {card.description}
              </Text>
            ) : null}
          </div>
        )}
      />
    </>
  )
}
