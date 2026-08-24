import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * The social card, generated at build time.
 *
 * This replaces the stock photograph the template first shipped with. A stock gradient
 * says nothing; a card carrying the actual revenue series, the actual accent and the
 * actual claim is the whole pitch at a glance — and because it is generated from the
 * same data and tokens as the site, it cannot drift out of date the way an exported PNG
 * does.
 *
 * The two Geist weights are committed under `assets/` rather than fetched. `next/og`
 * bundles only Geist *Regular*, so without a real 700 face every `fontWeight: 700` here
 * silently renders as regular — the card looks limp and nobody can see why. Reading the
 * files also keeps the build offline; fetching a font during `next build` is a network
 * dependency in the one place you least want one.
 */
export const alt =
  'Pulse — a free Next.js SaaS dashboard template built with VivekUI, including all six charts'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const [geistRegular, geistBold] = await Promise.all([
  readFile(join(process.cwd(), 'assets/Geist-400.ttf')),
  readFile(join(process.cwd(), 'assets/Geist-700.ttf')),
])

/** The revenue series from data/analytics.ts, kept in step with the dashboard by hand. */
const SERIES = [
  4.1, 4.4, 2.6, 2.3, 4.8, 5.1, 5.4, 5.2, 5.6, 3.1, 2.8, 5.9, 6.2, 6.0, 6.4, 6.7, 3.6,
  3.2, 6.9, 7.2, 7.0, 7.5, 7.8, 4.1, 3.7, 8.0, 8.3, 8.1, 8.6, 9.0,
]

function sparkPath(width: number, height: number): string {
  const max = Math.max(...SERIES)
  const min = Math.min(...SERIES)
  const span = max - min || 1
  return SERIES.map((value, index) => {
    const x = (index / (SERIES.length - 1)) * width
    const y = height - ((value - min) / span) * height
    return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
}

export default function OpengraphImage() {
  const chartWidth = 1056
  const chartHeight = 150
  const line = sparkPath(chartWidth, chartHeight)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px 56px',
          background: '#0a0a0b',
          // The same violet aurora as the hero on the site itself.
          backgroundImage:
            'radial-gradient(900px 500px at 12% 0%, rgba(139,92,246,0.34), transparent 70%), radial-gradient(700px 420px at 100% 100%, rgba(109,40,217,0.26), transparent 70%)',
          color: '#f5f5f7',
          fontFamily: 'Geist',
        }}
      >
        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 68,
              height: 68,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 18,
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
            }}
          >
            <svg width="52" height="52" viewBox="0 0 32 32" fill="none">
              <path
                d="M4 18h4.5l2.5-6 3 11 3.5-14 3 9H28"
                stroke="#ffffff"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ display: 'flex', fontSize: 42, fontWeight: 700, letterSpacing: -1.4 }}>
            Pulse
          </div>
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              padding: '10px 24px',
              borderRadius: 999,
              border: '1px solid rgba(167,139,250,0.45)',
              background: 'rgba(139,92,246,0.16)',
              color: '#d3c4fe',
              fontSize: 23,
              fontWeight: 700,
            }}
          >
            Free &amp; open source · MIT
          </div>
        </div>

        {/*
          Claim. Each line is its own flex child rather than a <br />: Satori requires an
          explicit `display` on any element with more than one child, so text + <br /> +
          text is a build error rather than a line break. The two headline lines sit in a
          gapless column so they read as one sentence, not two paragraphs.
        */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 66, fontWeight: 700, letterSpacing: -2.6 }}>
            Free Next.js SaaS template
          </div>
          <div style={{ display: 'flex', fontSize: 66, fontWeight: 700, letterSpacing: -2.6 }}>
            with a dashboard and charts
          </div>
          <div style={{ display: 'flex', fontSize: 29, color: '#a8a8b0', marginTop: 22 }}>
            All six charts included. No chart library installed.
          </div>
        </div>

        {/* The revenue series, drawn the way the site draws it */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <svg
            width={chartWidth}
            height={chartHeight}
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          >
            <defs>
              <linearGradient
                id="og-fill"
                x1="0"
                y1="0"
                x2="0"
                y2={chartHeight}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#a78bfa" stopOpacity="0.40" />
                <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`${line} L${chartWidth} ${chartHeight} L0 ${chartHeight} Z`}
              fill="url(#og-fill)"
            />
            <path
              d={line}
              fill="none"
              stroke="#a78bfa"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ display: 'flex', fontSize: 23, color: '#8e8e93', marginTop: 18 }}>
            Next.js 16 · React 19 · TypeScript · VivekUI — 91 components, zero runtime
            dependencies
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Geist', data: geistRegular, style: 'normal', weight: 400 },
        { name: 'Geist', data: geistBold, style: 'normal', weight: 700 },
      ],
    },
  )
}
