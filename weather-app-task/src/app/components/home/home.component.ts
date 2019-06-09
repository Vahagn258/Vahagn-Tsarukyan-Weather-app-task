import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { ProcessDataService } from 'src/app/services/process-datas.service';
import { WeatherData } from 'src/app/interfaces/weatherData';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private transformedDatas: object;
  private days: Array<string>;
  private temps: object;
  private chartDetails = {
    type: null,
    data: null,
    options: null
  }
  private selectedDay: string;

  constructor(private datasService: ProcessDataService, 
              private http: HttpClient, 
              private router: Router) {

  }

  ngOnInit() {
    this.http.get<WeatherData>('http://api.openweathermap.org/data/2.5/forecast?id=616051&units=metric&APPID=e5b429c8af590e57af6169763f99a705')
      .subscribe(res => {

        this.transformedDatas = this.datasService.transformDatas(res);
        this.days = Object.keys(this.transformedDatas);
        this.temps = this.datasService.getMinMaxTemp(this.transformedDatas);

        this.router.navigate([`home/${this.days[0]}`])

      })

  }

  showDetails(day: string) {
    this.router.navigate([`home/${day}`]);
  }

}
