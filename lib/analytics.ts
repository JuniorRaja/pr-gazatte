declare global {
  interface Window {
    umami?: {
      track(
        eventName: string,
        eventData?: Record<string, string | number | boolean>
      ): void
    }
  }
}

export function track(
  eventName: string,
  eventData?: Record<string, string | number | boolean>
): void {
  try {
    window.umami?.track(eventName, eventData)
  } catch {}
}
