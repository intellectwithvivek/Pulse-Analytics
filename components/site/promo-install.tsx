import { Code, CopyButton } from '@the_viveksingh/vivek-ui'

import { PACKAGE } from '@/lib/site'

/**
 * The install line, with a working copy button.
 *
 * A server component: `CopyButton` carries its own client boundary, so nothing here
 * needs one. It also announces the result in a live region, which is the part a
 * hand-rolled copy button always drops.
 */
export function PromoInstall({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <div className="promo-install">
      <Code size="sm">{PACKAGE.install}</Code>
      <CopyButton value={PACKAGE.install} variant="outline" size={size} />
    </div>
  )
}
