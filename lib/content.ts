/**
 * Copy that has to exist twice — once for a reader, once for a crawler.
 *
 * Each FAQ entry carries a plain-text `answerText` alongside the rendered answer, so the
 * `FAQPage` JSON-LD and the visible `Faq` are generated from one array and cannot drift
 * apart. Answer text that disagrees with the page is exactly what a structured-data
 * penalty is for.
 */

export interface FaqEntry {
  id: string
  question: string
  answerText: string
}

export const FAQ_ITEMS: readonly FaqEntry[] = [
  {
    id: 'charts',
    question: 'Does this template include charts?',
    answerText:
      'Yes — all six of them, and no chart library is installed. The area, bar, line, pie, progress ring and sparkline charts on this site all come from @the_viveksingh/vivek-ui, which has zero runtime dependencies. They are pure SVG with no measurement step, so they render on the server and appear in the HTML before any JavaScript loads. There is no Recharts, no Chart.js and no D3 in package.json.',
  },
  {
    id: 'responsive',
    question: 'Is the dashboard responsive?',
    answerText:
      'Yes, the dashboard as well as the marketing pages. The sidebar collapses to icons and then out of the way, the chart grid reflows on an auto-fit track rather than at fixed breakpoints, and the customers table can collapse each row into a labelled card. Several of those switches are container queries, so a component reflows based on the space it actually has rather than the width of the window.',
  },
  {
    id: 'backend',
    question: 'Can I connect a real backend?',
    answerText:
      'That is the intended next step. Every number on the site comes from typed modules in /data, so swapping them for your own fetch calls is a one-file change per view. The DataTable also has a manual mode with onSortChange, onSearchChange and onPageChange callbacks for server-driven sorting and pagination, and there is no auth to unpick — the Login button simply routes to /dashboard.',
  },
  {
    id: 'licence',
    question: 'Is it free for commercial use?',
    answerText:
      'Yes. Both this template and VivekUI itself are MIT licensed, so you can use them in commercial and client work with no fee and no attribution requirement. The "Built with VivekUI" credit in the footer is removable — a star on the GitHub repository is appreciated instead.',
  },
]

/* ------------------------------------------------------------------ Pricing */

export interface Plan {
  id: string
  name: string
  /** Monthly price in USD when billed monthly. */
  monthly: number
  /** Monthly price in USD when billed yearly — two months free. */
  yearly: number
  description: string
  features: string[]
  highlighted?: boolean
  badge?: string
  cta: string
}

export const PLANS: readonly Plan[] = [
  {
    id: 'free',
    name: 'Free',
    monthly: 0,
    yearly: 0,
    description: 'For a side project, or for finding out whether the numbers add up.',
    features: [
      '10,000 tracked events / month',
      '3 team members',
      '30-day data retention',
      'All six chart types',
      'Community support',
    ],
    cta: 'Start free',
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 49,
    yearly: 41,
    description: 'For a product team that needs to answer questions the same day.',
    features: [
      '1M tracked events / month',
      'Unlimited team members',
      '12-month data retention',
      'Funnels, cohorts and session replay',
      'Anomaly alerts on any metric',
      'Email and chat support',
    ],
    highlighted: true,
    badge: 'Most popular',
    cta: 'Start 14-day trial',
  },
  {
    id: 'team',
    name: 'Team',
    monthly: 149,
    yearly: 124,
    description: 'For several product teams sharing one source of truth.',
    features: [
      '10M tracked events / month',
      'SAML single sign-on',
      'Unlimited data retention',
      'Warehouse sync and raw event export',
      'Audit log and role-based access',
      'Dedicated Slack channel',
    ],
    cta: 'Talk to sales',
  },
]

/** Comparison rows for the /pricing table. `true` renders a tick, a string renders as-is. */
export interface ComparisonRow {
  feature: string
  free: string | boolean
  pro: string | boolean
  team: string | boolean
}

export const COMPARISON: readonly ComparisonRow[] = [
  { feature: 'Tracked events / month', free: '10,000', pro: '1,000,000', team: '10,000,000' },
  { feature: 'Team members', free: '3', pro: 'Unlimited', team: 'Unlimited' },
  { feature: 'Data retention', free: '30 days', pro: '12 months', team: 'Unlimited' },
  { feature: 'All six chart types', free: true, pro: true, team: true },
  { feature: 'Funnels and cohorts', free: false, pro: true, team: true },
  { feature: 'Session replay', free: false, pro: true, team: true },
  { feature: 'Anomaly alerts', free: false, pro: true, team: true },
  { feature: 'Warehouse sync', free: false, pro: false, team: true },
  { feature: 'SAML single sign-on', free: false, pro: false, team: true },
  { feature: 'Audit log', free: false, pro: false, team: true },
  { feature: 'Support', free: 'Community', pro: 'Email and chat', team: 'Dedicated Slack' },
]
