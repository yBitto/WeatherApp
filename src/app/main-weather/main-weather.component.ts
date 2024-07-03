import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../Services/weather-data.service';
import { Cities } from '../Interfaces/CityInterface';
import { Current } from '../Interfaces/CurrentInterface';
import { Hourly } from '../Interfaces/HourlyInterface';
import { FormBuilder } from '@angular/forms';
import { Daily } from '../Interfaces/WeeklyInterface';

@Component({
  selector: 'app-main-weather',
  templateUrl: './main-weather.component.html',
  styleUrl: './main-weather.component.css'
})
export class MainWeatherComponent implements OnInit{

  searchText = '';
  CurrentCity: any;

  CurrentWeatherData: any;

  HourlyWeatherData: any;

  WeeklyWeatherData: any;

  CitiesResult: Cities[] = []; 
  CitySearch = this.form.nonNullable.group({searchText: ''});

  time = new Date();
  CurrentHour: any;
  CurrentDate: any;
  CurrentDayIndex: any;
  SelectedDate: any;

  constructor(private WeatherService: WeatherDataService, private form: FormBuilder) {}

  ngOnInit(): void 
  {
      this.getCity();
      this.CurrentDayIndex = 0;
  }

  getCity(): void
  {
    this.WeatherService.getCitySearch(this.searchText).subscribe((cities: Cities[]) => {
      this.CitiesResult = cities;
    });
  }

  OnCitySearch(): void
  {
    this.searchText = this.CitySearch.value.searchText ?? '';
    this.getCity();
  }

  selectCity(city: Cities): void
  {
    this.CitySearch.setValue({searchText: ''});

    this.getCurrentWeather(city);
    this.getHourlyForecast(city);
    this.getWeeklyForecast(city);

    this.CurrentCity = city;
  }

  selectDay(date: Date, index: number): void
  {
    this.CurrentDate = date;
    this.CurrentDayIndex = index;
  }

   getCurrentWeather(city: Cities): void
  {
    this.WeatherService.getCurrentWeatherData(city).subscribe({
      next: (CurrentData: Current) => { this.CurrentWeatherData = CurrentData,this.CurrentDate = this.CurrentWeatherData.current.time, console.log(this.CurrentWeatherData)},

      complete: () => console.info('Current Weather completed')})
  }

  getHourlyForecast(city: Cities): void
  {
    this.WeatherService.getHourlyWeatherData(city).subscribe({
      next: (HourlyData: Hourly) => { this.HourlyWeatherData = HourlyData, console.log(this.HourlyWeatherData)},

      complete: () => console.info('Hourly Weather completed')});

      var date = new Date();
      this.CurrentHour = date.getHours();
      this.CurrentDate = date.getDate();
      console.log(this.CurrentDate, this.CurrentHour)
  }

  getWeeklyForecast(city: Cities): void
  {
    this.WeatherService.getWeeklyWeatherData(city).subscribe({
      next: (WeeklyData: Daily) => { this.WeeklyWeatherData= WeeklyData, console.log(this.WeeklyWeatherData)},

      complete: () => console.info('Weekly Weather completed')})
  }

  getWeatherType(WeatherCode: number): string
  {
    var code= "";

    switch(WeatherCode)
    {
      case 0: case 1:
        code = "clear";
        break;
      case 2:
        code = "cloudy";
        break;
      case 3:
        code= "overcast";
        break;
      case 45: case 48:
        code = "fog";
        break;
      case 51: case 53: case 55:
        code = "drizzle";
        break;
      case 56: case 57:
        code = "freezing drizzle"
        break;
      case 61: case 63: case 65:
        code = "rain";
        break;
      case 66: case 67:
        code = "freezing rain";
        break;
      case 71: case 73: case 75:
        code = "snow fall";
        break;
      case 77:
        code = "snow grains"
        break;
      case 80: case 81: case 82:
        code = "rain showers"
        break;
      case 85: case 86:
        code = "snow showers";
        break;
      case 95: 
        code = "thunderstorm";
        break;
      case 96: case 99:
        code = "thunderstorm with hail";
        break;
      default:
        code = "";
    }

    return code;
  }

  getWeatherIntensity(WeatherCode: number): string
  {
    var code= "";

    switch(WeatherCode)
    {
      case 1:
        code = "mainly";
        break;

      case 2:
        code = "partly";
        break;
  
      case 51: case 56: case 61: case 66: 
      case 71: case 80: case 85:
        code = "light";
        break;

      case 53: case 63: case 73: case 81:
        code = "moderate";
        break;

      case 55: case 57: case 65: case 67: case 75: case 82: case 86:
        code = "heavy";
        break;

      default:
        code = "";
    }

    return code;
  }

  getWeatherIcon(WeatherCode: number, daynight: number): string
  {
    var icon= "";

    switch(WeatherCode + "|" + daynight)
    {
      case "0|1": case "1|1":
        icon = "bi-sun-fill";
        break;

      case "0|0": case "1|0":
        icon = "bi-moon-stars-fill";
        break;

      case "2|1":
        icon = "bi-cloud-sun-fill";
        break;

      case "2|0":
        icon = "bi-cloud-moon-fill";
        break;  

      case "3|0": case "3|1":
        icon = "bi-clouds-fill";
        break;  

      case "45|0": case "45|1": case "48|0": case "48|1":
        icon = "bi-cloud-haze2-fill";
        break;

      case "51|0": case "51|1": case "53|0": case "53|1": case "55|0": case "55|1":
        icon = "bi-cloud-drizzle-fill";
        break;

      case "56|0": case "56|1": case "57|0": case "57|1": case "66|0": case "66|1": case "67|0": case "67|1":
        icon = "bi-cloud-sleet-fill";
        break;
      
      case "61|0": case "61|1": case "63|0": case "63|1":  case "80|0": case "80|1":  case "81|0": case "81|1":
        icon = "bi-cloud-rain-fill";
        break;
      
      case "71|0": case "71|1": case "73|0": case "73|1":  case "75|0": case "75|1":  case "77|0": case "77|1": case "85|0": case "85|1": case "86|0": case "86|1":
        icon = "bi-snow-2";
        break;

      case "95|0": case "95|1": case "96|0": case "96|1":  case "99|0": case "99|1":
        icon = "bi-cloud-lightning-rain-fill";
        break;
      
      default:
        icon = "bi-sun-fill"
    }
    return icon;
  }

  getIconColor(WeatherCode: number, daynight: number): string
  {
    var color= "";

    switch(WeatherCode + "|" + daynight)
    {
      case "0|1": case "1|1":
        color = "yellow";
        break;

      case "0|0": case "1|0":
        color = "grey";
        break;

      default: 
        color = "var(--White)";
    }
    return color;
  }
}
