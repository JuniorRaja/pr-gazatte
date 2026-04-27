// Chennai coords: 13.0827° N, 80.2707° E
const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=13.0827&longitude=80.2707&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code&wind_speed_unit=kmh&timezone=Asia%2FKolkata'

const WMO_DESC: Record<number, string> = {
  0: 'Clear', 1: 'Mostly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
  45: 'Foggy', 48: 'Foggy', 51: 'Drizzle', 53: 'Drizzle', 55: 'Drizzle',
  61: 'Rain', 63: 'Rain', 65: 'Heavy Rain',
  80: 'Showers', 81: 'Showers', 82: 'Heavy Showers',
  95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm',
}

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
function windDir(deg: number) {
  return DIRECTIONS[Math.round(deg / 45) % 8]
}

export default async function WeatherWidget() {
  try {
    console.log('[WeatherWidget] Fetching:', WEATHER_URL)
    const res = await fetch(WEATHER_URL, { next: { revalidate: 1800 } })
    const data = await res.json()
    console.log('[WeatherWidget] Response:', JSON.stringify(data.current))
    const c = data.current
    const desc = WMO_DESC[c.weather_code] ?? 'Unknown'
    const dir = windDir(c.wind_direction_10m)

    return (
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', textAlign: 'right', color: 'var(--fg)' }}>
        <div style={{ fontWeight: 700, color: 'var(--accent)' }}>WEATHER</div>
        <div>Chennai · {Math.round(c.temperature_2m)}°C</div>
        <div>{desc} · Winds {dir}</div>
      </div>
    )
  } catch (err) {
    console.error('[WeatherWidget] Error:', err)
    return (
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', textAlign: 'right', color: 'var(--fg)' }}>
        <div style={{ fontWeight: 700, color: 'var(--accent)' }}>WEATHER</div>
        <div>Chennai</div>
        <div>Unavailable</div>
      </div>
    )
  }
}
