/**
 * A handful of inline SVG glyphs for the dashboard chrome.
 *
 * VivekUI ships no icon set, and pulling one in would put a runtime dependency into a
 * template whose whole point is not having any. Six paths is cheaper than a package.
 *
 * Every one is `aria-hidden`: they sit next to a text label in the sidebar, or inside an
 * `IconButton` whose `aria-label` is required at the type level. A glyph that is the only
 * label is never one of these.
 */

function Glyph({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export const IconOverview = () => (
  <Glyph>
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
  </Glyph>
)

export const IconCustomers = () => (
  <Glyph>
    <circle cx="9" cy="8" r="3.25" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
    <path d="M16 5.5a3 3 0 0 1 0 5.8M17.5 20a5.4 5.4 0 0 0-1.6-3.8" />
  </Glyph>
)

export const IconRoadmap = () => (
  <Glyph>
    <rect x="3" y="4" width="5" height="13" rx="1.5" />
    <rect x="10" y="4" width="5" height="9" rx="1.5" />
    <rect x="17" y="4" width="4" height="16" rx="1.5" />
  </Glyph>
)

export const IconReports = () => (
  <Glyph>
    <path d="M5 20V10M12 20V5M19 20v-7" />
    <path d="M3 20h18" />
  </Glyph>
)

export const IconSearch = () => (
  <Glyph>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </Glyph>
)

export const IconMenu = () => (
  <Glyph>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Glyph>
)

export const IconExport = () => (
  <Glyph>
    <path d="M12 3v11M8 10.5l4 3.5 4-3.5" />
    <path d="M4 17v2.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V17" />
  </Glyph>
)

export const IconDots = () => (
  <Glyph>
    <circle cx="12" cy="5.5" r="1.25" fill="currentColor" />
    <circle cx="12" cy="12" r="1.25" fill="currentColor" />
    <circle cx="12" cy="18.5" r="1.25" fill="currentColor" />
  </Glyph>
)
