'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Avatar,
  Badge,
  CommandPalette,
  Divider,
  Drawer,
  DropdownMenu,
  IconButton,
  Kbd,
  Sidebar,
  Text,
  ThemeToggle,
  ToastProvider,
  useTheme,
} from '@the_viveksingh/vivek-ui'

import { Logo } from '@/components/site/logo'
import {
  IconCustomers,
  IconMenu,
  IconOverview,
  IconReports,
  IconRoadmap,
  IconSearch,
} from '@/components/dashboard/icons'
import { PACKAGE, promo } from '@/lib/site'

const NAV = [
  { href: '/dashboard', label: 'Overview', Icon: IconOverview, badge: undefined },
  { href: '/dashboard/customers', label: 'Customers', Icon: IconCustomers, badge: '20' },
  { href: '/dashboard/roadmap', label: 'Roadmap', Icon: IconRoadmap, badge: '12' },
  { href: '/dashboard/reports', label: 'Reports', Icon: IconReports, badge: undefined },
] as const

const PALETTE_ITEMS = [
  {
    heading: 'Navigate',
    items: [
      { id: '/dashboard', label: 'Overview', description: 'KPIs and all six charts', keywords: ['home', 'kpi', 'charts'] },
      { id: '/dashboard/customers', label: 'Customers', description: 'Accounts, plans and MRR', keywords: ['accounts', 'table', 'mrr'] },
      { id: '/dashboard/roadmap', label: 'Roadmap', description: 'Kanban board of what is shipping', keywords: ['kanban', 'board', 'tickets'] },
      { id: '/dashboard/reports', label: 'Reports', description: 'Date range and export', keywords: ['export', 'csv', 'date'] },
    ],
  },
  {
    heading: 'Marketing site',
    items: [
      { id: '/', label: 'Homepage', description: 'The landing page and hero panel' },
      { id: '/pricing', label: 'Pricing', description: 'Plans, comparison table and FAQ' },
      { id: '/built-with', label: 'Built with VivekUI', description: 'Every component on this site' },
    ],
  },
]

/**
 * The dashboard shell: a persistent rail, a sticky topbar, and the overlays that belong
 * to the whole area rather than to one page.
 *
 * ### Why the theme is handled the way it is
 *
 * The marketing pages are light-first and the dashboard is dark-first, but there is one
 * `ThemeProvider` for the site and it writes to `<html>`. So the dashboard takes the
 * global theme unless the visitor has expressed no preference at all — `'system'` — in
 * which case it goes dark. An explicit light or dark choice from the toggle always wins,
 * which is the point of having a toggle.
 *
 * That override is applied in two places on purpose. The wrapper element carries it so
 * the server-rendered HTML is already dark and there is no flash and no JS requirement.
 * An effect mirrors it onto `<body>` because `Drawer`, `CommandPalette` and the toast
 * stack all portal out to the body — `ToastProvider` unconditionally, with no `container`
 * escape hatch — and without it a dark dashboard would raise a light command palette.
 */
export function DashShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { theme } = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const dashRef = useRef<HTMLDivElement>(null)

  const dashTheme = theme === 'system' ? 'dark' : theme

  useEffect(() => {
    const { body } = document
    const previous = body.getAttribute('data-theme')
    body.setAttribute('data-theme', dashTheme)
    return () => {
      // Restore rather than remove: another shell may have set it, and leaving a stale
      // dark body behind would follow the visitor back to the marketing pages.
      if (previous === null) body.removeAttribute('data-theme')
      else body.setAttribute('data-theme', previous)
    }
  }, [dashTheme])

  function go(href: string) {
    setPaletteOpen(false)
    setNavOpen(false)
    router.push(href)
  }

  const railNav = (
    <Sidebar label="Dashboard" collapsible={false} width="15rem">
      <div style={{ padding: 'var(--vk-space-4)' }}>
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <Logo />
        </Link>
        <Text as="p" size="sm" tone="muted" style={{ marginBlockStart: '0.125rem' }}>
          Acme Inc · Team plan
        </Text>
      </div>

      <Divider />

      <Sidebar.Section title="Workspace">
        {NAV.map(({ href, label, Icon, badge }) => (
          <Sidebar.Item
            key={href}
            asChild
            active={pathname === href}
            icon={<Icon />}
            badge={badge}
          >
            <Link href={href} onClick={() => setNavOpen(false)}>
              {label}
            </Link>
          </Sidebar.Item>
        ))}
      </Sidebar.Section>

      <Divider />

      <Sidebar.Section title="This template">
        <Sidebar.Item asChild icon={<IconOverview />}>
          <Link href="/built-with" onClick={() => setNavOpen(false)}>
            Built with VivekUI
          </Link>
        </Sidebar.Item>
        <Sidebar.Item
          href={promo(PACKAGE.docs, 'navbar')}
          target="_blank"
          rel="noopener noreferrer"
          icon={<IconReports />}
        >
          Component docs
        </Sidebar.Item>
      </Sidebar.Section>
    </Sidebar>
  )

  return (
    <div className="dash" data-theme={dashTheme} ref={dashRef}>
      <ToastProvider position="bottom-end" max={3}>
        <div className="dash-layout">
          <div className="dash-rail">{railNav}</div>

          <div className="dash-main">
            <header className="dash-topbar">
              {/* The rail is display:none below 60rem, so a drawer carries the nav there.
                  Hidden above that width by the same media query, so it never becomes a
                  duplicate tab stop. */}
              <span className="dash-only-narrow">
                <IconButton
                  aria-label="Open navigation"
                  variant="ghost"
                  size="sm"
                  onClick={() => setNavOpen(true)}
                >
                  <IconMenu />
                </IconButton>
              </span>

              {/* A button, not a fake input: it does not accept text, and an input that
                  swallows your keystrokes to open a dialog is worse than a button. */}
              <button
                type="button"
                className="dash-search"
                onClick={() => setPaletteOpen(true)}
              >
                <IconSearch />
                <span>Search or jump to…</span>
                <span className="dash-search-hint">
                  <Kbd size="sm">⌘K</Kbd>
                </span>
              </button>

              <Badge variant="soft" tone="primary" pill size="sm" className="dash-only-wide">
                Mock data
              </Badge>

              <ThemeToggle mode="cycle" size="sm" />

              <DropdownMenu align="end">
                <DropdownMenu.Trigger aria-label="Account menu">
                  <Avatar src="https://i.pravatar.cc/64?img=68" name="Riley Chen" size="sm" />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>Riley Chen · riley@acme.inc</DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item onSelect={() => go('/dashboard/reports')}>
                    Saved reports
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onSelect={() => setPaletteOpen(true)} shortcut={<Kbd size="sm">⌘K</Kbd>}>
                    Command palette
                  </DropdownMenu.Item>
                  <DropdownMenu.Item disabled>Workspace settings</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item onSelect={() => go('/')}>Sign out</DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu>
            </header>

            <main id="main" className="dash-content">
              {children}
            </main>
          </div>
        </div>

        {/* Portalled into the shell so overlays sit inside the dashboard's theme scope. */}
        <CommandPalette
          open={paletteOpen}
          onOpenChange={setPaletteOpen}
          items={PALETTE_ITEMS}
          placeholder="Search reports, customers and pages…"
          container={dashRef}
          onSelect={(item) => go(item.id)}
          footer={
            <Text size="sm" tone="muted">
              <Kbd size="sm">↑</Kbd> <Kbd size="sm">↓</Kbd> to move · <Kbd size="sm">↵</Kbd> to
              open · <Kbd size="sm">esc</Kbd> to close
            </Text>
          }
        />

        <Drawer
          open={navOpen}
          onOpenChange={setNavOpen}
          side="start"
          size="sm"
          title="Navigation"
          container={dashRef}
        >
          <Drawer.Body>{railNav}</Drawer.Body>
        </Drawer>
      </ToastProvider>
    </div>
  )
}
