import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { WeatherData } from '../interfaces/weatherData';
import { transformedWeatherData } from '../interfaces/transformedWeatherData';

@Injectable({
  providedIn: 'root'
})
export class ProcessDataService {

  currentDay: string = null;

  private days: Array<string> = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
  ];

  constructor() {

  }


  transformDatas(data: WeatherData): object {
    const newDatas: object = {};
    data.list.forEach(elem => {
      let date = new Date(elem.dt_txt);
      if (!newDatas[this.days[date.getDay()]]) {
        newDatas[this.days[date.getDay()]] = [];
      }
      let transformedObject = {
        dt_txt: elem.dt_txt,
        main: elem.main,
        weather: elem.weather,
        src: `http://openweathermap.org/img/w/${elem.weather[0].icon as string}.png`,
        wind: elem.wind
      }
      newDatas[this.days[date.getDay()]].push(transformedObject);
    });
    return newDatas;
  }

  getMinMaxTemp(datas: object): object {
    const daysWithMinMaxTemps: object = {};
    for (let day of Object.keys(datas)) {
      let temps: Array<number> = [];
      datas[day].forEach(currentDay => {
        temps.push(currentDay.main.temp);
      })
      if (!daysWithMinMaxTemps[day]) {
        daysWithMinMaxTemps[day] = {};
      }
      daysWithMinMaxTemps[day].min = Math.round(Math.min(...temps));
      daysWithMinMaxTemps[day].max = Math.round(Math.max(...temps));
    }

    return daysWithMinMaxTemps;
  }

  getDatasForChart(currentDayDatas: Array<transformedWeatherData>) {
    const hours = [];
    const temps = [];
    const windDatas = [];
    currentDayDatas.forEach(dayData => {
      hours.push(dayData.dt_txt.split(' ')[1]);
      temps.push(dayData.main.temp);
      windDatas.push(dayData.wind.speed);
    })

    return {
      type: 'line',
      data: {
        labels: hours,
        datasets: [
          {
            label: 'Temperature',
            data: temps,
            backgroundColor: 'rgba(184, 99, 99, 0.2)',
            borderColor: 'red',
            pointBackgroundColor: 'rgba(185, 88, 88, 1)',
          },
          {
            label: 'Wind speed',
            data: windDatas,
            backgroundColor: 'rgba(89, 89, 201, 0.2)',
            borderColor: 'blue',
            pointBackgroundColor: 'rgba(60, 60, 196,1)',
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }

  }


}
