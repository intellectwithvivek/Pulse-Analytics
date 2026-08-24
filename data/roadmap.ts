/** Seed columns for the KanbanBoard on /dashboard/roadmap. */

import type { KanbanColumn } from '@the_viveksingh/vivek-ui'

/**
 * `limit` is a real work-in-progress cap: the board shows it in the column header and
 * refuses drops once the column is full, which is the whole point of a WIP limit.
 */
export const ROADMAP_COLUMNS: readonly KanbanColumn[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    cards: [
      { id: 'r-01', title: 'Warehouse sync for Snowflake', description: 'Two-way sync so cohorts defined in Pulse land back in the warehouse.', badge: 'Q4' },
      { id: 'r-02', title: 'Anomaly alerts on any metric', description: 'Flag a spike or a drop without someone having to configure a threshold.', badge: 'Q4' },
      { id: 'r-03', title: 'Mobile SDK for React Native', description: 'Autocapture parity with the web SDK.', badge: 'Later' },
      { id: 'r-04', title: 'Role-based dashboard sharing', description: 'Share a dashboard read-only outside the workspace.', badge: 'Later' },
    ],
  },
  {
    id: 'progress',
    title: 'In progress',
    limit: 4,
    cards: [
      { id: 'r-05', title: 'Session replay, 10x cheaper storage', description: 'Column-store the event stream and rebuild the DOM on demand.', badge: 'Eng' },
      { id: 'r-06', title: 'Funnel breakdown by property', description: 'Split any funnel step by plan, country or campaign.', badge: 'Eng' },
      { id: 'r-07', title: 'Self-serve SAML', description: 'Team plans configure SSO without a support ticket.', badge: 'Platform' },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    limit: 3,
    cards: [
      { id: 'r-08', title: 'Retention chart rewrite', description: 'Cohort grid replaced with the line view customers kept asking for.', badge: 'Design' },
      { id: 'r-09', title: 'Usage-based billing meter', description: 'Bill on tracked events above the plan allowance.', badge: 'Billing' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      { id: 'r-10', title: 'Command palette everywhere', description: 'One shortcut reaches every report, customer and setting.', badge: 'Shipped' },
      { id: 'r-11', title: 'Dark dashboard', description: 'The theme most of you were forcing with a browser extension anyway.', badge: 'Shipped' },
      { id: 'r-12', title: 'CSV export on every table', description: 'Respects the current filter and sort.', badge: 'Shipped' },
    ],
  },
]

/** Recent-activity feed for the dashboard Timeline. */
export interface ActivityEntry {
  id: string
  title: string
  description: string
  /** Minutes before page render. Turned into a Date at module load. */
  minutesAgo: number
  status: 'complete' | 'current' | 'pending'
}

export const ACTIVITY: readonly ActivityEntry[] = [
  { id: 'a-1', title: 'Aster Financial upgraded to Team', description: '55 seats, $2,140 MRR added by Mei Lin Chen.', minutesAgo: 4, status: 'current' },
  { id: 'a-2', title: 'Anomaly detected in signup funnel', description: 'Step 2 conversion fell 11% against the 7-day baseline.', minutesAgo: 38, status: 'complete' },
  { id: 'a-3', title: 'Weekly revenue report sent', description: 'Delivered to 14 recipients across 3 workspaces.', minutesAgo: 190, status: 'complete' },
  { id: 'a-4', title: 'Ridgeline Solar started a Team trial', description: '28 seats provisioned, trial ends in 12 days.', minutesAgo: 1450, status: 'complete' },
  { id: 'a-5', title: 'Q3 activation goal reached', description: '91% of new workspaces completed onboarding.', minutesAgo: 2880, status: 'complete' },
]

/**
 * Baked at module load, which for these statically prerendered pages means build time.
 * `RelativeTime` renders the absolute value first on both sides of hydration, so this
 * cannot become a mismatch.
 */
export const ACTIVITY_BASE = Date.now()

export function activityDate(minutesAgo: number): Date {
  return new Date(ACTIVITY_BASE - minutesAgo * 60_000)
}
