import { Component, OnInit } from '@angular/core';
import { CatsService } from '../cats.service';
import { interval, pipe, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IGetCatTable } from '../cat';

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

  constructor(private _catService: CatsService, private http: HttpClient) { }

  ngOnInit(): void {
    /* gets called once the compoenents has been initialized
     * I am going to fetch the emplyee data here, declare the dependency mentioned in the constructor 
     */
    this._catService.getCats()
      .pipe(map(res => res['response']))
      .subscribe(data => {
        this.cats = data; /* assign the data  received from the observable to the local employees property */
        //console.log(data);
        //console.log(this.cats2);
      },
        error => { this.errorMsg = error });

    this.getCatsList();

    // Subscribe to begin publishing values
    const subscription = this.secondsCounter.subscribe(n => {//console.log(`It's been ${n + 1} seconds since subscribing!`);
      this.timePassed = n + 100;
      this.getCatsList();
    });
    
    // this.getCatsList();

  }

  getCatsList() {
    this._catService
      .getCats2()
      .subscribe((data: any) => {
        console.log(data);
         this.cats2 = data;
        // console.log(this.cats2);
      });
  }

}
