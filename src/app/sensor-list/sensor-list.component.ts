import { Component, OnInit } from '@angular/core';
import { CatsService } from '../cats.service';
import { interval, pipe, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SensorService } from '../sensor.service';

@Component({
  selector: '[app-sensor-detail]',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css']
})
export class SensorListComponent implements OnInit {

  public sensors =[];
  public errorMsg: any;
  public secondsCounter = interval(10000);
  public timePassed: number;
  headers = ["id", "sensor-name", "sensor-value"];

  constructor(private _sensorService: SensorService, private http: HttpClient) { }

  ngOnInit(): void {
         
    this.getSensorsList();

    // Subscribe to begin publishing values
    const subscription = this.secondsCounter.subscribe(n => {//console.log(`It's been ${n + 1} seconds since subscribing!`);
      this.timePassed = n + 100;
      this.getSensorsList();
    });
  }

  getSensorsList() {
    this._sensorService
      .getSensors()
      .subscribe((data: any) => {
        console.log(data);
         this.sensors = data;
        // console.log(this.cats2);
      });
  }

}
