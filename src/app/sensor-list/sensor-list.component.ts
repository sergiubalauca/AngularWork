import { Component, OnInit } from '@angular/core';
import { CatsService } from '../cats.service';
import { interval, pipe, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SensorService } from '../sensor.service';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: '[app-sensor-detail]',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css']
})
export class SensorListComponent implements OnInit {
  /* variables for clearing up the subscriptions, thus avoiding memory leaks */
  public subscription: Subscription;

  public sensors = [];
  public errorMsg: any;
  public secondsCounter = interval(10000);
  public timePassed: number;
  headers = ["id", "sensor-name", "sensor-value"];
  private graphData: any = [];
  private avgData = [];
  private average: number;
  private averageArray = [];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Read 10', 'Read 9', 'Read 8', 'Read 7', 'Read 6', 'Read 5', 'Read 4', 'Read 3', 'Read 2', 'Read 1'];
  public barChartType: string = 'line';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    // { data:this.graphData, label: 'Series A' },
    // { data: [280, 480, 400, 190, 860, 207, 900], label: 'Series B' }
  ];

  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
    //console.log(e);
  }

  constructor(private _sensorService: SensorService, private http: HttpClient) { }

  ngOnInit(): void {

    this.getSensorsList();

    // Subscribe to begin publishing values
    this.subscription = this.secondsCounter.subscribe(n => {//console.log(`It's been ${n + 1} seconds since subscribing!`);
      this.timePassed = n + 100;
      this.getSensorsList();
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  getSensorsList() {
    this._sensorService
      .getSensors()
      .subscribe((data: any) => {
        //console.log(data);
        this.sensors = data;
        this.graphData.length = 0;
        this.avgData.length = 0;

        this.sensors.forEach(element => {
          this.graphData.push(element['sensor-value']);

          this.average = Math.round(this.graphData.map(function (x, i, arr) { return x / arr.length })
                                                  .reduce(function (a, b) { return a + b }));
          this.avgData.push(this.average);
        });
        //console.log(this.avgData); data(5).fill(2)
        ///this.averageArray(10).fill(this.average);
       
        this.barChartData = [
          // { data: [this.average, this.average, this.average, this.average, this.average, this.average, this.average, this.average, this.average, this.average], label: 'Floating line 1' },
          { data: Array(10).fill(this.average), label: 'Average' },
          { data: this.avgData, label: 'Step avg' },
          { data: this.graphData, label: 'Sensor1' }
        ];


        //console.log(this.graphData);
      });
  }
}
