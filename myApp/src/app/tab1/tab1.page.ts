import { Component } from '@angular/core';
import { element } from 'protractor';
import { Subscription } from 'rxjs/internal/Subscription';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public employees: Employee[];

  private subscription2: Subscription;
  public name = "gsb";
  constructor(private _employeeService: EmployeeServiceService) {

  }

  ngOnInit() {
    this.employees = this._employeeService.getEmployees();
    //console.log("In page: " + this.employees);
    this.employees.forEach(value =>
      console.log("for each" + value)
    );

    // this.employees.push(this._employeeService.getEmployees());
    // console.log(this._employeeService.getEmployees());
  }

  ngOnDestroy() {
    // this.subscription1.unsubscribe();
    //this.subscription2.unsubscribe();
    // this.navigationSubscription.unsubscribe();
  }

}
