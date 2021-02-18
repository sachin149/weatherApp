import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private chartData = new BehaviorSubject<any>({});
  chart = this.chartData.asObservable();
  constructor() { }

  convertToDate(date){
    return new Date(date * 1000);
  }
  covertToDayDate(date) {
    return new Date(date * 1000).toDateString().substr(4,6);
  }
  convertKelvinToCelsius(temp){
    return Math.round(temp - 273.15);
  }
  convertToTime(date){
    return new Date(date*1000).toString().slice(16,21);
  }
  chartDataChanged(data){
    this.chartData.next(data);
  }
}
