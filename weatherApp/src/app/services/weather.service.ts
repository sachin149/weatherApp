import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  API_KEY = '8dc359639793236ff723bb36614f341c';
  BASE_URL = 'https://api.openweathermap.org/data/2.5'
  constructor(private http: HttpClient) {
   
   }
   getWeatherDetails(reqObj: any){
    let params = new HttpParams();
    params = params.append('q', reqObj.city );
    params = params.append('appid', this.API_KEY);
    return this.http.get(this.BASE_URL+ '/weather', {params: params});
  }
  getForecastData(reqObj: any) {
    
    let params = new HttpParams();
    params = params.append('lat',reqObj.lat);
    params = params.append('lon',reqObj.lon);
    params = params.append('exclude','current,minutely,hourly,alerts');
    params = params.append('appid', this.API_KEY);
    return this.http.get(this.BASE_URL+ '/onecall', {params: params});
  }
}
