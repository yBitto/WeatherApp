export interface Root {
    latitude: number
    longitude: number
    generationtime_ms: number
    utc_offset_seconds: number
    timezone: string
    timezone_abbreviation: string
    elevation: number
    current_units: CurrentUnits
    current: Current
  }
  
  export interface CurrentUnits {
    time: string
    interval: string
    temperature_2m: string
    relative_humidity_2m: string
    is_day: string
    precipitation: string
    weather_code: string
    wind_speed_10m: string
  }
  
  export interface Current {
    time: string
    interval: number
    temperature_2m: number
    relative_humidity_2m: number
    is_day: number
    precipitation: number
    weather_code: number
    wind_speed_10m: number
  }
  