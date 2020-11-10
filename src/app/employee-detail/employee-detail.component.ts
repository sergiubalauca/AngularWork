import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { EmployeeService } from '../employee.service';

@Component({
  selector: '[app-employee-detail]',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  public employees = [];
  public selectedID: number;
  public subscription1: Subscription;
  public subscription2: Subscription;
  public navigationSubscription: Subscription;

  constructor(private _employeeService: EmployeeService, private router: Router, private activateRoute: ActivatedRoute) {
    /* This is for refreshing the content on the page - reacts on NavigationEnd of the router and gets the data again  */
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  ngOnInit(): void {

    this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.selectedID = id;
    })
    /* gets called once the compoenents has been initialized
     * I am going to fetch the emplyee data here, declare the dependency mentioned in the constructor 
     */
    // this.subscription1 = this._employeeService.getEmployees()
    //   .subscribe(data => this.employees = data); /* assign the data  received from the observable to the local employees property */

    /* Another way of calling the observable by using an observer; send it to the observable with the next, error, complete properties
     * as callbacks. If not, like done above, only the first callback is sent 'next' <=> data
     */
    const observer = {
      next: x => {
        console.log('Observer got a next value');
        x => this.employees = x
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };

    this.subscription1 = this._employeeService.getEmployees().subscribe(observer);

    const subject = new Subject<number>();

    subject.subscribe({
      next: (v) => console.log('Subject observerA: ${v}')
    });
    subject.subscribe({
      next: (v) => console.log('Subject observerB: ${v}')
    });

    // subject.next(1);
    // subject.next(2);

  }

  onSelect(employee) {
    const observable = new Observable(function subscribe(subscriber) {
      subscriber.next("hi1");
      subscriber.next("hi2");
      subscriber.next("hi3");
      // const id = setInterval(() => {
      //   subscriber.next('hi1')
      //   subscriber.next('hi2')
      // }, 1000);

      // Provide a way of canceling and disposing the interval resource
      return function unsubscribe() {
        //clearInterval(id);
      };
    });

    //observable.subscribe(x => { console.log(x) });

    this.router.navigate(['/employees', employee.id])
    /* 
     * Replaced the above line with the following: added relative navigation for flexibility.
     * Basically, it sais: I don't care about the path, just add to the current route the id
     */
    //this.router.navigate([employee.id], {relativeTo:this.activateRoute})
  }

  public isSelected(employee) {
    return employee.id === this.selectedID;
  }



  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    //console.log("new stuff");
    this.subscription2 = this._employeeService.getEmployees()
      .subscribe(data => this.employees = data);
    /* We can add a subscription into another and unsubscribe all of them at once */
    //this.subscription1.add(this.subscription2);
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.navigationSubscription.unsubscribe();
  }

}
