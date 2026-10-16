/**
 * The UI's read-request timeout and how the server's `OPENCODE_REQUEST_TIMEOUT_MS`
 * override reaches it.
 *
 * Without a bound, a socket that neither resolves nor rejects (the half-open
 * state described in #2470) keeps the bootstrap concurrency slot busy forever
 * and the UI stays on "loading sessions". The web, desktop and VS Code shells
 * stamp the override into the document before its module scripts run, so it
 * applies to the first requests. Long-lived streams (prompts, the event SSE,
 * session logs) are excluded at the request site.
 */

/** Used when the server did not inject an override. */
export const OPENCODE_REQUEST_TIMEOUT_DEFAULT_MS = 30_000

type RequestTimeoutScope = { window?: { __OPENCHAMBER_OPENCODE_REQUEST_TIMEOUT_MS__?: number } }

/** The injected override in milliseconds, or null when absent or invalid. */
export const readInjectedOpencodeRequestTimeoutMs = (scope?: RequestTimeoutScope): number | null => {
  const raw = scope?.window?.__OPENCHAMBER_OPENCODE_REQUEST_TIMEOUT_MS__
  if (raw === undefined || !Number.isFinite(raw) || raw <= 0) return null
  return Math.max(1, Math.floor(raw))
}
