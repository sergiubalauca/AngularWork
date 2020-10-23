import { Component, OnInit } from '@angular/core';
import { CatsService } from '../cats.service';
import { interval, pipe, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IGetCatTable } from '../cat';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@Component({
  selector: '[app-cats-detail]',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.css']
})
export class CatsListComponent implements OnInit {

  public cats = [];
  public cats2 =[];
  public errorMsg: any;
  public secondsCounter = interval(10000);
  public timePassed: number;
  headers = ["Id", "Name", "Colour"];

  public graphData:any = [];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Read 10', 'Read 9', 'Read 8', 'Read 7', 'Read 6', 'Read 5', 'Read 4', 'Read 3', 'Read 2', 'Read 1'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [];

  // events
  public chartClicked(e: any): void {
      //console.log(e);
  }

  public chartHovered(e: any): void {
      //console.log(e);
  }

  constructor(private _catService: CatsService, private http: HttpClient) { }

  ngOnInit(): void {
    /* gets called once the compoenents has been initialized
     * I am going to fetch the emplyee data here, declare the dependency mentioned in the constructor 
     */
    // this._catService.getCats()
    //   .pipe(map(res => res['response']))
    //   .subscribe(data => {
    //     /* assign the data  received from the observable to the local employees property */
    //     this.cats = data; 
    //     //console.log(data);
    //     //console.log(this.cats2);
    //   },
    //     error => { this.errorMsg = error });

    this.getCatsList();

    // Subscribe to begin publishing values
    const subscription = this.secondsCounter.subscribe(n => {//console.log(`It's been ${n + 1} seconds since subscribing!`);
      this.timePassed = n + 100;
      this.getCatsList();   
        
    });
    
  }

  getCatsList() {
    this._catService
      .getCats2()
      .subscribe((data: any) => {
        console.log("Retrieving cats...");
         this.cats2 = data;
         this.graphData.length = 0;

         this.cats2.forEach(element => {
          this.graphData.push(element['Id']);
          
        });
        
        this.barChartData =[
          { data:this.graphData, label: 'Series A' },
          //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];

        // this.graphData.forEach(elem => {
        //   console.log(elem); 
        // })
        
         
      });
  }
}
