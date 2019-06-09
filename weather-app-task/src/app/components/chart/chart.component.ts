import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { ProcessDataService } from 'src/app/services/process-datas.service';
import { WeatherData } from 'src/app/interfaces/weatherData';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  private transformedDatas: object;
  private days: Array<string>;
  private temps: object;
  private chartDetails = {
    type: null,
    data: null,
    options: null
  }

  constructor(private datasService: ProcessDataService, private http: HttpClient, private activeRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.http.get<WeatherData>('http://api.openweathermap.org/data/2.5/forecast?id=616051&units=metric&APPID=e5b429c8af590e57af6169763f99a705')
      .subscribe(res => {

        this.transformedDatas = this.datasService.transformDatas(res);
        this.days = Object.keys(this.transformedDatas);

        this.activeRoute.params.subscribe(params => {
          this.datasService.currentDay = params.day;
          this.getChartDatas(params.day);
        })

      })

  }

  getChartDatas(day: string) {
    this.chartDetails = this.datasService.getDatasForChart(this.transformedDatas[day])
  }

}
