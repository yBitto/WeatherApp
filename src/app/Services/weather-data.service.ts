import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cities } from '../Interfaces/CityInterface';

import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  private ForecastBaseUrl: String = 'https://api.open-meteo.com/v1/forecast?'
  private GeocodingBaseUrl: String = 'https://geocoding-api.open-meteo.com/v1/search?name='

  constructor(private http: HttpClient) { }

 getCurrentWeatherData(city: Cities): Observable<any> 
 {
  return this.http.get(`${this.ForecastBaseUrl}latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`);
 }

 getHourlyWeatherData(city: Cities): Observable<any>
 {
  return this.http.get(`${this.ForecastBaseUrl}latitude=${city.latitude}&longitude=${city.longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m,is_day&timezone=auto`).pipe(map((response: any) => response.hourly));
 }

 getWeeklyWeatherData(city: Cities): Observable<any>
 {
  return this.http.get(`${this.ForecastBaseUrl}latitude=${city.latitude}&longitude=${city.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,sunshine_duration,rain_sum,precipitation_probability_max,wind_speed_10m_max&timezone=auto`).pipe(map((response: any) => response.daily));;
 }

 getCitySearch(CityName: string): Observable<Cities[]>
 {
  return this.http.get<Cities[]>(`${this.GeocodingBaseUrl}${CityName}&count=10&language=en&format=json`).pipe(map((response: any) => response.results));
 }
}
