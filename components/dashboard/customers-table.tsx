'use client'

import { useState } from 'react'
import {
  Avatar,
  Badge,
  Button,
  type Column,
  DataTable,
  DropdownMenu,
  EmptyState,
  Flex,
  IconButton,
  Text,
  useToast,
} from '@the_viveksingh/vivek-ui'

import { IconDots } from '@/components/dashboard/icons'
import {
  CUSTOMERS,
  type Customer,
  STATUS_LABEL,
  STATUS_TONE,
  avatarUrl,
} from '@/data/customers'

/**
 * The customers table.
 *
 * `DataTable` brings the search field, the sortable headings, the pagination and the
 * empty state, all as one semantic `<table>` with real `aria-sort` and real `<th scope>`.
 * Two details worth knowing:
 *
 * - `rowKey` is the account id, never the row index. Keying by index is the bug that
 *   makes a selected row appear to move when you sort.
 * - Computed columns get a `sortAccessor`. Without one, sorting the MRR column would
 *   sort `undefined`, because the value only exists inside `render`.
 */
export function CustomersTable() {
  const { toast } = useToast()
  const [search, setSearch] = useState('')

  const columns: Column<Customer>[] = [
    {
      key: 'company',
      header: 'Account',
      sortable: true,
      render: (row) => (
        <Flex as="span" gap={3} align="center">
          <Avatar src={avatarUrl(row.avatarSeed)} name={row.contact} size="sm" />
          <span>
            <Text as="span" weight="medium" style={{ display: 'block' }}>
              {row.company}
            </Text>
            <Text as="span" size="sm" tone="muted">
              {row.contact}
            </Text>
          </span>
        </Flex>
      ),
    },
    {
      key: 'plan',
      header: 'Plan',
      sortable: true,
      render: (row) => (
        <Badge variant="outline" tone={row.plan === 'Team' ? 'primary' : 'neutral'} size="sm">
          {row.plan}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      // Sorts and searches on the human label, so a search for "past due" matches the
      // row whose underlying value is `past_due`.
      sortAccessor: (row) => STATUS_LABEL[row.status],
      render: (row) => (
        <Badge variant="soft" tone={STATUS_TONE[row.status]} size="sm" pill>
          {STATUS_LABEL[row.status]}
        </Badge>
      ),
    },
    {
      key: 'mrr',
      header: 'MRR',
      sortable: true,
      numeric: true,
      render: (row) => (
        <span className="pulse-figure">
          {row.mrr === 0 ? '—' : `$${row.mrr.toLocaleString('en-US')}`}
        </span>
      ),
      sortAccessor: (row) => row.mrr,
    },
    { key: 'seats', header: 'Seats', sortable: true, numeric: true },
    { key: 'country', header: 'Country', sortable: true },
    {
      key: 'signedUp',
      header: 'Signed up',
      sortable: true,
      render: (row) => <span className="pulse-figure pulse-nowrap">{row.signedUp}</span>,
    },
    {
      key: 'actions',
      header: <span className="vk-visually-hidden">Row actions</span>,
      align: 'end',
      render: (row) => (
        <DropdownMenu align="end">
          <DropdownMenu.Trigger
            aria-label={`Actions for ${row.company}`}
            // The trigger is a plain button; IconButton would nest one inside another.
            style={{ display: 'inline-flex' }}
          >
            <IconDots />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>{row.company}</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              onSelect={() =>
                toast({ title: 'Account opened', description: row.email, tone: 'info' })
              }
            >
              View account
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={() =>
                toast({
                  title: 'Invoice sent',
                  description: `A copy is on its way to ${row.contact}.`,
                  tone: 'success',
                })
              }
            >
              Send invoice
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              onSelect={() =>
                toast({
                  title: 'Nothing was deleted',
                  description: 'This template has no backend — the row is still there.',
                  tone: 'warning',
                })
              }
            >
              Cancel subscription
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <DataTable<Customer>
      data={CUSTOMERS}
      columns={columns}
      rowKey="id"
      // Names each row's selection checkbox after the account, not "select row 4".
      rowLabel={(row) => row.company}
      rowHeader="company"
      caption="Customer accounts, their plan, status and monthly recurring revenue"
      hideCaption
      searchable
      search={search}
      onSearchChange={setSearch}
      searchKeys={['company', 'contact', 'email', 'country', 'plan', 'status']}
      defaultSort={{ key: 'mrr', direction: 'desc' }}
      pageSize={8}
      selectable
      hoverable
      striped
      /* `stack` collapses each row into a labelled card once the table's own container
         is narrow — a container query, so it follows the table's width, not the
         window's. */
      responsive="stack"
      labels={{
        searchPlaceholder: 'Search accounts, contacts or countries…',
      }}
      emptyState={
        <EmptyState
          icon="⌕"
          title="No accounts match that search"
          description={
            search
              ? `Nothing matches “${search}”. Clear the search to see all 20 accounts.`
              : 'There are no accounts to show.'
          }
          actions={
            <Button variant="outline" onClick={() => setSearch('')}>
              Clear search
            </Button>
          }
        />
      }
      toolbar={
        <Flex gap={2} align="center">
          <IconButton
            aria-label="Refresh accounts"
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                title: 'Accounts refreshed',
                description: '20 accounts, unchanged — the data is mocked.',
                tone: 'info',
              })
            }
          >
            ⟳
          </IconButton>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                title: 'Export queued',
                description: 'A real build would stream a CSV of the filtered rows.',
                tone: 'success',
              })
            }
          >
            Export CSV
          </Button>
        </Flex>
      }
    />
  )
}
