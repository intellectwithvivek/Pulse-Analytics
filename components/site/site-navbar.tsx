'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge, Button, Navbar, ThemeToggle } from '@the_viveksingh/vivek-ui'

import { Logo } from '@/components/site/logo'
import { PACKAGE, promo } from '@/lib/site'

const LINKS = [
  { href: '/', label: 'Product' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/built-with', label: 'Built with' },
] as const

/**
 * The marketing bar. A client component only so the current page can be marked with
 * `aria-current` — `Navbar` itself brings the collapse behaviour and the mobile sheet.
 */
export function SiteNavbar() {
  const pathname = usePathname()

  return (
    <Navbar sticky size="md" container="xl">
      {/* `asChild` hands the anchor to next/link, so client-side navigation, prefetch
          and middle-click all keep working. */}
      <Navbar.Brand asChild>
        <Link href="/">
          <Logo />
        </Link>
      </Navbar.Brand>

      <Navbar.Links>
        {LINKS.map((link) => (
          <Navbar.Link key={link.href} asChild active={pathname === link.href}>
            <Link href={link.href}>{link.label}</Link>
          </Navbar.Link>
        ))}
      </Navbar.Links>

      <Navbar.Actions>
        {/* Promotion kit: the navbar badge, deep-linked to the docs. */}
        <a
          className="pulse-badge-link"
          href={promo(PACKAGE.docs, 'navbar')}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Badge variant="soft" tone="primary" pill size="sm">
            ⚡ Built with VivekUI
          </Badge>
        </a>
        <ThemeToggle mode="cycle" size="sm" />
        <Button asChild size="sm">
          {/* No auth in a template: "Login" simply routes to the mock dashboard. */}
          <Link href="/dashboard">Login</Link>
        </Button>
      </Navbar.Actions>

      <Navbar.Toggle />
    </Navbar>
  )
}
