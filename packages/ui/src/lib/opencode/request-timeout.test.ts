import { describe, expect, test } from "bun:test"
import { OPENCODE_REQUEST_TIMEOUT_DEFAULT_MS, readInjectedOpencodeRequestTimeoutMs } from "./request-timeout"

describe("readInjectedOpencodeRequestTimeoutMs", () => {
  test("reads a positive injected value and floors fractions", () => {
    expect(readInjectedOpencodeRequestTimeoutMs({ window: { __OPENCHAMBER_OPENCODE_REQUEST_TIMEOUT_MS__: 45_000 } })).toBe(45_000)
    expect(readInjectedOpencodeRequestTimeoutMs({ window: { __OPENCHAMBER_OPENCODE_REQUEST_TIMEOUT_MS__: 1_500.9 } })).toBe(1_500)
  })

  test("returns null when the value is absent or unusable", () => {
    expect(readInjectedOpencodeRequestTimeoutMs({ window: {} })).toBeNull()
    expect(readInjectedOpencodeRequestTimeoutMs({})).toBeNull()
    expect(readInjectedOpencodeRequestTimeoutMs()).toBeNull()
    for (const bad of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(readInjectedOpencodeRequestTimeoutMs({ window: { __OPENCHAMBER_OPENCODE_REQUEST_TIMEOUT_MS__: bad } })).toBeNull()
    }
  })

  test("keeps the documented default", () => {
    expect(OPENCODE_REQUEST_TIMEOUT_DEFAULT_MS).toBe(30_000)
  })
})
