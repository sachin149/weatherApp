import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { CommonService } from '../services/common.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm : FormGroup;
  options = [];
  location: string;
  weatherDescription;
  currentTemp;
  highTemp: number;
  lowTemp: number;
  country: string;
  latitude: number;
  longitude: number;
  windSpeed;
  humidity;
  pressure;
  sunrise;
  sunset;
  coordinates = {};
  data;
  forecastData = [];
  cols: any[];
  toggleButton: string = 'Show More';
  chartDataX = [];
  minTempData = [];
  maxTempData = [];
  chartData;
  constructor(private weatherservice: WeatherService, private commonservice: CommonService) { 
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
    this.chartData = new BehaviorSubject<any>({})
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'dt', header: 'Date' },
      { field: 'max', header: 'Max Temperature' },
      { field: 'min', header: 'Min Temperature' },
      { field: 'description', header: 'Weather Description' }
  ];
    this.getWeatherDetails();
    //this.getForecastData();
  }
  getWeatherDetails(city = 'Pune'){
    const reqObj = { city: city }
    this.weatherservice.getWeatherDetails(reqObj).subscribe((response) =>{
      this.location = response["name"];
      this.country = response["sys"].country;
      let responseMain = response["main"];
      this.currentTemp = this.commonservice.convertKelvinToCelsius(responseMain.temp);
      this.highTemp = this.commonservice.convertKelvinToCelsius(responseMain.temp_max);
      this.lowTemp = this.commonservice.convertKelvinToCelsius(responseMain.temp_min);
      this.humidity = responseMain.humidity;
      this.pressure = responseMain.pressure;
      this.weatherDescription = response["weather"][0].description.toUpperCase();
      let date = response["dt"];
      this.coordinates["lat"] = response["coord"].lat;
      this.coordinates["lon"] = response["coord"].lon;
      this.windSpeed  = response["wind"].speed;
      this.sunrise = this.commonservice.convertToTime(response["sys"].sunrise);
      this.sunset = this.commonservice.convertToTime(response["sys"].sunset);
      this.latitude = response["coord"].lat;
      this.longitude = response["coord"].lon;
      this.getForecastData(this.latitude,this.longitude);
    },) 
  }
  getForecastData(latitude,longitude){
    const reqObj = {
      lat: latitude,
      lon: longitude
    }
    this.weatherservice.getForecastData(reqObj).subscribe((response) => {
     
     let responseData = response["daily"];
     this.chartDataX = responseData.map( ele => this.commonservice.covertToDayDate(ele.dt));
     this.minTempData = responseData.map(ele => this.commonservice.convertKelvinToCelsius(ele.temp.min));
     this.maxTempData = responseData.map(ele => this.commonservice.convertKelvinToCelsius(ele.temp.max));
     this.commonservice.chartDataChanged({
        chartDataX: this.chartDataX,
        minTempData: this.minTempData,
        maxTempData: this.maxTempData})
    this.forecastData = responseData.map((ele) => {
        return {
          dt: this.commonservice.covertToDayDate(ele.dt),
          min: this.commonservice.convertKelvinToCelsius(ele["temp"].min),
          max: this.commonservice.convertKelvinToCelsius(ele["temp"].max),
          description: ele.weather[0].description.toString().toUpperCase()
        }
      });
    }, (error) => {

    })
  }
  search() {
    if(this.searchForm.valid) {
      this.getWeatherDetails(this.searchForm.get('search').value);
    }
  }
  toggleBtn() {
    if(this.toggleButton === 'Show More') {
      this.toggleButton = 'Show Less'
    }else {
      this.toggleButton = 'Show More'
    }
  }
}
