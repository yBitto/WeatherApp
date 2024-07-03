export interface Root {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  daily_units: DailyUnits
  daily: Daily
  }
  
  export interface DailyUnits {
    time: string
    weather_code: string
    temperature_2m_max: string
    temperature_2m_min: string
    sunrise: string
    sunset: string
    sunshine_duration: string
    rain_sum: string
    precipitation_probability_max: string
    wind_speed_10m_max: string
  }
  
  export interface Daily {
    time: string[]
  weather_code: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  sunrise: string[]
  sunset: string[]
  sunshine_duration: number[]
  rain_sum: number[]
  precipitation_probability_max: number[]
  wind_speed_10m_max: number[]
  }