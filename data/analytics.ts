/**
 * Mock product-analytics data for the Pulse demo.
 *
 * Every value is hand-written rather than generated, so a build is reproducible and the
 * charts never shift between `next build` runs. The shapes here are exactly the shapes
 * the VivekUI charts accept — `ChartDatum[]` for axed charts, a bare `number[]` for
 * sparklines, `PieDatum[]` for the plan mix — so nothing is transformed at render time.
 */

import type { ChartDatum, ChartSeries, PieDatum } from '@the_viveksingh/vivek-ui/charts'

/* ------------------------------------------------------------------ KPI headline */

export interface Kpi {
  id: string
  label: string
  /** Pre-formatted headline figure. */
  value: string
  /** Period-over-period change, already signed. */
  delta: number
  /** A rise is good for MRR and bad for churn, so the card has to be told which. */
  intent: 'positive' | 'negative'
  /** 14 points, one per day. Feeds the card's Sparkline. */
  trend: number[]
  hint: string
}

export const KPIS: readonly Kpi[] = [
  {
    id: 'mrr',
    label: 'Monthly recurring revenue',
    value: '$148.2k',
    delta: 12.4,
    intent: 'positive',
    trend: [118, 121, 119, 126, 130, 128, 134, 137, 135, 141, 144, 143, 146, 148],
    hint: 'vs. $131.9k last month',
  },
  {
    id: 'users',
    label: 'Weekly active users',
    value: '38,914',
    delta: 8.1,
    intent: 'positive',
    trend: [31.2, 32, 31.6, 33.4, 34.1, 33.8, 35.2, 35.9, 35.4, 36.8, 37.5, 37.2, 38.4, 38.9],
    hint: 'vs. 36,001 last week',
  },
  {
    id: 'churn',
    label: 'Net revenue churn',
    value: '1.8%',
    delta: -0.6,
    intent: 'positive',
    trend: [3.1, 3, 2.9, 2.9, 2.7, 2.6, 2.6, 2.4, 2.3, 2.2, 2.1, 2, 1.9, 1.8],
    hint: 'down from 2.4% in Q1',
  },
  {
    id: 'nps',
    label: 'Net promoter score',
    value: '61',
    delta: 4,
    intent: 'positive',
    trend: [48, 49, 51, 50, 52, 54, 53, 55, 57, 56, 58, 59, 60, 61],
    hint: '1,204 responses this quarter',
  },
]

/* ------------------------------------------------------- Revenue, last 30 days */

/** Daily recognised revenue in thousands of USD. Weekends dip: the sales cycle is B2B. */
export const REVENUE_30D: readonly ChartDatum[] = [
  { x: 'Jul 26', y: 4.1 }, { x: 'Jul 27', y: 4.4 }, { x: 'Jul 28', y: 2.6 },
  { x: 'Jul 29', y: 2.3 }, { x: 'Jul 30', y: 4.8 }, { x: 'Jul 31', y: 5.1 },
  { x: 'Aug 1', y: 5.4 }, { x: 'Aug 2', y: 5.2 }, { x: 'Aug 3', y: 5.6 },
  { x: 'Aug 4', y: 3.1 }, { x: 'Aug 5', y: 2.8 }, { x: 'Aug 6', y: 5.9 },
  { x: 'Aug 7', y: 6.2 }, { x: 'Aug 8', y: 6 }, { x: 'Aug 9', y: 6.4 },
  { x: 'Aug 10', y: 6.7 }, { x: 'Aug 11', y: 3.6 }, { x: 'Aug 12', y: 3.2 },
  { x: 'Aug 13', y: 6.9 }, { x: 'Aug 14', y: 7.2 }, { x: 'Aug 15', y: 7 },
  { x: 'Aug 16', y: 7.5 }, { x: 'Aug 17', y: 7.8 }, { x: 'Aug 18', y: 4.1 },
  { x: 'Aug 19', y: 3.7 }, { x: 'Aug 20', y: 8 }, { x: 'Aug 21', y: 8.3 },
  { x: 'Aug 22', y: 8.1 }, { x: 'Aug 23', y: 8.6 }, { x: 'Aug 24', y: 9 },
]

/** The hero panel shows a shorter, punchier window than the dashboard does. */
export const REVENUE_HERO: readonly ChartDatum[] = REVENUE_30D.slice(-14)

/* ------------------------------------------------------- Signups by channel */

export const SIGNUPS_BY_CHANNEL: readonly ChartDatum[] = [
  { x: 'Organic', y: 1840 },
  { x: 'Docs', y: 1265 },
  { x: 'Referral', y: 902 },
  { x: 'Product Hunt', y: 618 },
  { x: 'Paid', y: 441 },
  { x: 'Partners', y: 287 },
]

/* ------------------------------------------------------- Retention cohorts */

/** Percentage of each signup cohort still active, by month since signup. */
export const RETENTION_COHORTS: readonly ChartSeries[] = [
  {
    name: 'May cohort',
    data: [
      { x: 'M0', y: 100 }, { x: 'M1', y: 74 }, { x: 'M2', y: 63 },
      { x: 'M3', y: 57 }, { x: 'M4', y: 54 }, { x: 'M5', y: 52 },
    ],
  },
  {
    name: 'Jun cohort',
    data: [
      { x: 'M0', y: 100 }, { x: 'M1', y: 79 }, { x: 'M2', y: 70 },
      { x: 'M3', y: 65 }, { x: 'M4', y: 62 }, { x: 'M5', y: 61 },
    ],
  },
  {
    name: 'Jul cohort',
    data: [
      { x: 'M0', y: 100 }, { x: 'M1', y: 86 }, { x: 'M2', y: 78 },
      { x: 'M3', y: 74 }, { x: 'M4', y: 72 }, { x: 'M5', y: 71 },
    ],
  },
]

/* ------------------------------------------------------- Plan mix */

export const PLAN_MIX: readonly PieDatum[] = [
  { label: 'Free', value: 24610 },
  { label: 'Pro', value: 9840 },
  { label: 'Team', value: 4464 },
]

export const PLAN_MIX_TOTAL = PLAN_MIX.reduce((sum, slice) => sum + slice.value, 0)

/* ------------------------------------------------------- Quarterly goals */

export interface Goal {
  id: string
  label: string
  value: number
  max: number
  /** Shown inside the ring, under the big number. */
  caption: string
}

export const QUARTERLY_GOALS: readonly Goal[] = [
  { id: 'arr', label: 'ARR target', value: 78, max: 100, caption: '$1.78M of $2.28M' },
  { id: 'expansion', label: 'Expansion revenue', value: 64, max: 100, caption: '$412k of $644k' },
  { id: 'activation', label: 'Activation rate', value: 91, max: 100, caption: '91% of 100% goal' },
]

/* ------------------------------------------------------- Reports page series */

export const EVENTS_BY_WEEK: readonly ChartSeries[] = [
  {
    name: 'Tracked events',
    data: [
      { x: 'W31', y: 8.4 }, { x: 'W32', y: 9.1 }, { x: 'W33', y: 9.6 },
      { x: 'W34', y: 10.8 }, { x: 'W35', y: 11.4 }, { x: 'W36', y: 12.9 },
    ],
  },
  {
    name: 'Identified users',
    data: [
      { x: 'W31', y: 3.1 }, { x: 'W32', y: 3.4 }, { x: 'W33', y: 3.8 },
      { x: 'W34', y: 4.1 }, { x: 'W35', y: 4.6 }, { x: 'W36', y: 5.2 },
    ],
  },
]

export const FEATURE_ADOPTION: readonly ChartDatum[] = [
  { x: 'Funnels', y: 72 },
  { x: 'Cohorts', y: 61 },
  { x: 'Session replay', y: 54 },
  { x: 'Dashboards', y: 88 },
  { x: 'Alerts', y: 39 },
]

export const TRAFFIC_SOURCES: readonly PieDatum[] = [
  { label: 'Direct', value: 4820 },
  { label: 'Search', value: 3610 },
  { label: 'Social', value: 1240 },
  { label: 'Email', value: 980 },
]

/* ------------------------------------------------------- Formatters */

/**
 * Chart value formatters must be locale-stable or they become a hydration mismatch, so
 * these are plain string maths rather than `Intl.NumberFormat` with a runtime default
 * locale.
 */
export const fmt = {
  usdK: (value: number) => `$${value.toFixed(1)}k`,
  plain: (value: number) => String(Math.round(value)),
  percent: (value: number) => `${Math.round(value)}%`,
  thousands: (value: number) => {
    const rounded = Math.round(value)
    return rounded >= 1000 ? `${(rounded / 1000).toFixed(1)}k` : String(rounded)
  },
  millions: (value: number) => `${value.toFixed(1)}M`,
}
