/**
 * Every VivekUI export this site renders, and where it renders.
 *
 * This is the source for the /built-with table and for the list at the bottom of the
 * README. `slug` is the directory name inside the package's own `dist/components`, which
 * is what the docs URLs are built from, so a component that exists here has a docs page.
 */

export interface InventoryEntry {
  /** Exported name, as imported. */
  name: string
  /** Docs slug. */
  slug: string
  /** Charts live under /docs/charts, everything else under /docs/components. */
  kind: 'component' | 'chart'
  /** Where on this site it appears. */
  where: string
}

export const INVENTORY: readonly InventoryEntry[] = [
  // ---------------------------------------------------------------- Charts
  { name: 'AreaChart', slug: 'area-chart', kind: 'chart', where: 'Hero panel · Dashboard revenue · Reports' },
  { name: 'BarChart', slug: 'bar-chart', kind: 'chart', where: 'Dashboard signups by channel · Reports feature adoption' },
  { name: 'LineChart', slug: 'line-chart', kind: 'chart', where: 'Dashboard retention cohorts · Reports volume by week' },
  { name: 'PieChart', slug: 'pie-chart', kind: 'chart', where: 'Dashboard plan mix (donut) · Reports traffic sources' },
  { name: 'ProgressRing', slug: 'progress-ring', kind: 'chart', where: 'Dashboard quarterly goals' },
  { name: 'Sparkline', slug: 'sparkline', kind: 'chart', where: 'Hero KPI strip · all four dashboard KPI cards' },

  // ---------------------------------------------------------------- Page sections
  { name: 'Hero', slug: 'hero', kind: 'component', where: 'Homepage hero, with the live chart panel in its media slot' },
  { name: 'LogoCloud', slug: 'logo-cloud', kind: 'component', where: 'Homepage customer logos' },
  { name: 'FeatureGrid', slug: 'feature-grid', kind: 'component', where: 'Homepage six features' },
  { name: 'Stats', slug: 'stats', kind: 'component', where: 'Homepage by-the-numbers band' },
  { name: 'Testimonials', slug: 'testimonials', kind: 'component', where: 'Homepage customer quotes' },
  { name: 'Pricing', slug: 'pricing', kind: 'component', where: 'Homepage preview · /pricing plan grid' },
  { name: 'FAQ', slug: 'faq', kind: 'component', where: 'Homepage and /pricing — also the FAQPage schema source' },
  { name: 'CTA', slug: 'cta', kind: 'component', where: 'Homepage closing ask' },
  { name: 'Newsletter', slug: 'newsletter', kind: 'component', where: 'Homepage changelog signup' },
  { name: 'Footer', slug: 'footer', kind: 'component', where: 'Every marketing page' },
  { name: 'Navbar', slug: 'navbar', kind: 'component', where: 'Every marketing page, with the collapse sheet' },
  { name: 'Section', slug: 'section', kind: 'component', where: 'Page bands on /pricing and /built-with' },

  // ---------------------------------------------------------------- Dashboard
  { name: 'Sidebar', slug: 'sidebar', kind: 'component', where: 'Dashboard rail and mobile drawer' },
  { name: 'CommandPalette', slug: 'command-palette', kind: 'component', where: 'Dashboard topbar, ⌘K' },
  { name: 'DataTable', slug: 'data-table', kind: 'component', where: '/dashboard/customers — sort, search, paginate, select' },
  { name: 'KanbanBoard', slug: 'kanban-board', kind: 'component', where: '/dashboard/roadmap, with a keyboard move path' },
  { name: 'DatePicker', slug: 'date-picker', kind: 'component', where: '/dashboard/reports range, two fields' },
  { name: 'Timeline', slug: 'timeline', kind: 'component', where: 'Dashboard recent activity' },
  { name: 'RelativeTime', slug: 'relative-time', kind: 'component', where: 'Timestamps in the activity feed' },
  { name: 'Drawer', slug: 'drawer', kind: 'component', where: 'Dashboard navigation below 960px' },
  { name: 'DropdownMenu', slug: 'dropdown-menu', kind: 'component', where: 'Account menu · customer row actions' },
  { name: 'Toast', slug: 'toast', kind: 'component', where: 'Export, row actions and WIP-limit warnings' },
  { name: 'EmptyState', slug: 'empty-state', kind: 'component', where: 'Customers table, filtered-out view' },
  { name: 'Skeleton', slug: 'skeleton', kind: 'component', where: 'Dashboard loading state' },
  { name: 'Table', slug: 'table', kind: 'component', where: '/pricing comparison · this component map' },
  { name: 'Field', slug: 'field', kind: 'component', where: 'Labels the two report date inputs' },
  // DataTable is itself built out of these, so they are on the page without being
  // imported here. It pages with its own prev/next footer rather than composing the
  // standalone Pagination component, which is why Pagination is not in this list.
  { name: 'Input', slug: 'input', kind: 'component', where: 'The customers search field — rendered by DataTable' },
  { name: 'Checkbox', slug: 'checkbox', kind: 'component', where: 'Row selection in the customers table — rendered by DataTable' },

  // ---------------------------------------------------------------- Primitives
  { name: 'Button', slug: 'button', kind: 'component', where: 'Every call to action, via asChild for links' },
  { name: 'IconButton', slug: 'icon-button', kind: 'component', where: 'Mobile nav trigger · table toolbar' },
  { name: 'Badge', slug: 'badge', kind: 'component', where: 'Navbar credit · statuses · plan tags' },
  { name: 'Card', slug: 'card', kind: 'component', where: 'Every KPI and chart panel' },
  { name: 'Avatar', slug: 'avatar', kind: 'component', where: 'Account menu · customer rows · testimonials' },
  { name: 'Heading', slug: 'heading', kind: 'component', where: 'Dashboard page and card titles' },
  { name: 'Text', slug: 'text', kind: 'component', where: 'Body copy throughout' },
  { name: 'Code', slug: 'code', kind: 'component', where: 'The install command, in the footer and here' },
  { name: 'CopyButton', slug: 'copy-button', kind: 'component', where: 'Beside every install command' },
  { name: 'Kbd', slug: 'kbd', kind: 'component', where: '⌘K hint and the palette footer legend' },
  { name: 'Divider', slug: 'divider', kind: 'component', where: 'Sidebar section rules' },
  { name: 'Switch', slug: 'switch', kind: 'component', where: '/pricing monthly-yearly toggle' },
  { name: 'Stack', slug: 'stack', kind: 'component', where: 'Vertical rhythm on /built-with and the KPI cards' },
  { name: 'Flex', slug: 'stack', kind: 'component', where: 'Horizontal rows — toolbars, figure-plus-delta, the pricing switch' },
  { name: 'Grid', slug: 'grid', kind: 'component', where: 'The /built-with promo tiles' },
  { name: 'Container', slug: 'container', kind: 'component', where: 'Width cap inside Navbar and every Section' },
  { name: 'AnimatedCounter', slug: 'animated-counter', kind: 'component', where: 'Homepage stats, counting up on scroll' },
  { name: 'ThemeProvider', slug: 'theme-provider', kind: 'component', where: 'Root layout, plus the anti-flash themeScript' },
  { name: 'ThemeToggle', slug: 'theme-toggle', kind: 'component', where: 'Marketing navbar and dashboard topbar' },
]

export const CHART_COUNT = INVENTORY.filter((entry) => entry.kind === 'chart').length
export const COMPONENT_COUNT = INVENTORY.filter((entry) => entry.kind === 'component').length
