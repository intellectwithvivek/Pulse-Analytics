'use client'

import { Newsletter } from '@the_viveksingh/vivek-ui'

/**
 * The changelog signup.
 *
 * A client component because `onSubscribe` is a function, and returning a promise from
 * it is what makes `Newsletter` hold its busy state until the request settles — which is
 * how it prevents a double submission. There is no backend in a template, so the promise
 * here just resolves after a beat.
 */
export function NewsletterSignup() {
  return (
    <Newsletter
      layout="inline"
      title="Product changelog, once a fortnight"
      description="What shipped, what broke, and the numbers behind both. No drip campaign."
      placeholder="you@company.com"
      buttonLabel="Subscribe"
      note="No backend in this template — the form resolves locally so you can see the states."
      successMessage="Subscribed. Nothing was actually sent anywhere."
      onSubscribe={() =>
        new Promise<void>((resolve) => {
          setTimeout(resolve, 600)
        })
      }
    />
  )
}
