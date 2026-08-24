import type { Logo } from '@the_viveksingh/vivek-ui'

/**
 * Placeholder customer marks for the logo cloud.
 *
 * These are inline SVG rather than hotlinked Logoipsum files on purpose: Logoipsum
 * serves its artwork for download and exposes no stable hotlink URL, so linking one
 * would ship a template whose logo row 404s the first time it is deployed. Inline SVG
 * costs no request, cannot break, and keeps the promise that the charts are the only
 * real visuals on the page.
 *
 * `LogoCloud` wraps a `node` in a `role="img"` labelled by `alt`, so each mark still
 * announces its company name instead of being an unlabelled graphic.
 */

function Mark({ children, glyph }: { children: string; glyph: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        gap: '0.5rem',
        alignItems: 'center',
        color: 'var(--vk-color-muted)',
        fontWeight: 700,
        fontSize: '1.0625rem',
        letterSpacing: '-0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {glyph}
      </svg>
      {children}
    </span>
  )
}

const STROKE = { stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const }

export const CUSTOMER_LOGOS: Logo[] = [
  {
    id: 'northwind',
    alt: 'Northwind Labs',
    node: (
      <Mark
        glyph={
          <>
            <path d="M4 18V6l16 12V6" {...STROKE} strokeLinejoin="round" />
          </>
        }
      >
        Northwind
      </Mark>
    ),
  },
  {
    id: 'aster',
    alt: 'Aster Financial',
    node: (
      <Mark
        glyph={
          <>
            <circle cx="12" cy="12" r="8" {...STROKE} />
            <path d="M12 4v16M4 12h16" {...STROKE} />
          </>
        }
      >
        Aster
      </Mark>
    ),
  },
  {
    id: 'fathom',
    alt: 'Fathom Robotics',
    node: (
      <Mark
        glyph={
          <>
            <rect x="4" y="4" width="16" height="16" rx="5" {...STROKE} />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </>
        }
      >
        Fathom
      </Mark>
    ),
  },
  {
    id: 'orchid',
    alt: 'Orchid Biotech',
    node: (
      <Mark
        glyph={
          <>
            <path d="M12 3c4 4 4 14 0 18-4-4-4-14 0-18Z" {...STROKE} strokeLinejoin="round" />
            <path d="M3 12h18" {...STROKE} />
          </>
        }
      >
        Orchid
      </Mark>
    ),
  },
  {
    id: 'meridian',
    alt: 'Meridian Legal',
    node: (
      <Mark
        glyph={
          <>
            <path d="M5 19h14M12 5v14M6 9h12l-2 5H8Z" {...STROKE} strokeLinejoin="round" />
          </>
        }
      >
        Meridian
      </Mark>
    ),
  },
  {
    id: 'juniper',
    alt: 'Juniper Retail',
    node: (
      <Mark
        glyph={
          <>
            <path d="M12 4 6 20h12L12 4Z" {...STROKE} strokeLinejoin="round" />
          </>
        }
      >
        Juniper
      </Mark>
    ),
  },
]
