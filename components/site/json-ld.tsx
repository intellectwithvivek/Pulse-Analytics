/**
 * Structured data, emitted as a `<script type="application/ld+json">`.
 *
 * A server component with no state, so the JSON is in the served HTML where crawlers
 * and answer engines read it, rather than appearing after hydration.
 */

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is authored in this repo, never user input, so there is nothing
      // here to escape beyond the `</script>` guard below.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}

/** One `BreadcrumbList` per page, so a result shows its place in the site. */
export function breadcrumbs(
  base: string,
  trail: readonly { name: string; path: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${base}${crumb.path}`,
    })),
  }
}

/** `FAQPage`, built from the same array that renders the visible FAQ. */
export function faqPage(
  items: readonly { question: string; answerText: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answerText },
    })),
  }
}
