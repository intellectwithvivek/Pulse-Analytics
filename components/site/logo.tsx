/**
 * The Pulse logo.
 *
 * The mark is an ECG trace inside a violet squircle — a pulse, which is the product
 * name, and a chart line, which is what the product draws. It is the same geometry as
 * `app/icon.svg` and the generated OG image, so the tab icon, the social card and the
 * navbar are recognisably one thing.
 *
 * Two deliberate choices:
 *
 * - The mark keeps its violet in both themes. A logo that changes colour with the
 *   theme stops being a logo.
 * - The wordmark uses `currentColor`, so it inherits from whatever it sits in — dark
 *   text on the marketing navbar, light text on the dashboard rail — with no props.
 *
 * Server-safe: pure SVG, no state, no client boundary.
 */

/**
 * The mark on its own. Decorative by default — the wordmark beside it carries the name.
 *
 * Solid violet rather than the gradient used by `app/icon.svg` and the OG card, and the
 * reason is duplicate ids. A `<linearGradient>` needs an id to be referenced, this mark
 * renders three times on a marketing page (navbar, mobile sheet, footer), and three
 * elements sharing one id is invalid HTML — every reference resolves to the first
 * definition. Minting a unique id per instance means `useId`, which means a hook, which
 * would drag a server-safe logo across the client boundary for an effect nobody can see
 * at 28px. The flat fill is the midpoint of that gradient.
 */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      style={{ flex: 'none' }}
    >
      <rect width="32" height="32" rx="8.5" fill="#7c3aed" />
      <path
        d="M4 18h4.5l2.5-6 3 11 3.5-14 3 9H28"
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Mark plus wordmark.
 *
 * `label` is the accessible name. Inside a link that already says "Pulse" this would be
 * a duplicate, so the text is real text rather than an `aria-label` on a graphic — the
 * wordmark is selectable, translatable and searchable, which an SVG wordmark is not.
 */
export function Logo({
  size = 28,
  fontSize = '1.125rem',
}: {
  size?: number
  fontSize?: string
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        gap: '0.5rem',
        alignItems: 'center',
        color: 'inherit',
        fontWeight: 700,
        fontSize,
        letterSpacing: '-0.03em',
        lineHeight: 1,
      }}
    >
      <LogoMark size={size} />
      Pulse
    </span>
  )
}
