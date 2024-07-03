export interface Root {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  hourly_units: HourlyUnits
  hourly: Hourly
}

export interface HourlyUnits {
  time: string
  temperature_2m: string
  relative_humidity_2m: string
  precipitation_probability: string
  weather_code: string
  wind_speed_10m: string
  is_day: string
}

export interface Hourly {
  time: string[]
  temperature_2m: number[]
  relative_humidity_2m: number[]
  precipitation_probability: number[]
  weather_code: number[]
  wind_speed_10m: number[]
  is_day: number[]
}