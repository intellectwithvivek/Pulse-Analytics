import { Footer, Text } from '@the_viveksingh/vivek-ui'

import { Logo } from '@/components/site/logo'
import { PromoInstall } from '@/components/site/promo-install'
import { PACKAGE, SITE, promo } from '@/lib/site'

/**
 * Site footer, including the mandatory attribution block.
 *
 * A server component — `Footer` needs no client boundary, and the only interactive
 * part is the `CopyButton` inside `PromoInstall`, which brings its own.
 */
export function SiteFooter() {
  return (
    <Footer
      // No `as` prop: Footer is always a real <footer>, the contentinfo landmark.
      background="muted"
      columns={[
        {
          title: 'Product',
          links: [
            { label: 'Overview', href: '/' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Dashboard demo', href: '/dashboard' },
            { label: 'Customers', href: '/dashboard/customers' },
          ],
        },
        {
          title: 'Template',
          links: [
            { label: 'Built with VivekUI', href: '/built-with' },
            { label: 'Roadmap board', href: '/dashboard/roadmap' },
            { label: 'Reports', href: '/dashboard/reports' },
            { label: 'Use this template', href: SITE.repo, target: '_blank' },
          ],
        },
        {
          title: 'VivekUI',
          links: [
            { label: 'Documentation', href: promo(PACKAGE.docs, 'footer'), target: '_blank' },
            { label: 'npm package', href: PACKAGE.npm, target: '_blank' },
            { label: 'GitHub', href: PACKAGE.github, target: '_blank' },
            { label: 'Vivek Kumar Singh', href: promo(PACKAGE.author, 'footer'), target: '_blank' },
          ],
        },
      ]}
      brand={
        <div>
          <Logo size={30} fontSize="1.25rem" />
          <Text as="p" tone="muted" size="sm" className="promo-footer-note">
            Built with ❤️ using VivekUI — {PACKAGE.componentCount} React components ·{' '}
            {PACKAGE.chartCount} SVG charts · zero runtime dependencies. One install, one
            CSS import, no config.
          </Text>
          <div style={{ marginBlockStart: 'var(--vk-space-4)' }}>
            <PromoInstall />
          </div>
        </div>
      }
      copyright={`MIT licensed. Free for commercial use — the credit is removable, a star is appreciated.`}
    />
  )
}
