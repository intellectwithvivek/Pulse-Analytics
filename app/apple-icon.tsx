import { ImageResponse } from 'next/og'

/**
 * The iOS home-screen icon, generated at build time.
 *
 * iOS will not render an SVG here and it does not apply a rounded mask of its own, so
 * this is a PNG that draws its own corner radius. It is generated rather than committed
 * as a binary so the one place the brand colour lives is still CSS-adjacent code.
 */
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
          borderRadius: 40,
        }}
      >
        {/* The same ECG geometry as app/icon.svg, scaled up. */}
        <svg width="132" height="132" viewBox="0 0 32 32" fill="none">
          <path
            d="M4 18h4.5l2.5-6 3 11 3.5-14 3 9H28"
            stroke="#ffffff"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  )
}
