import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: '[app-employee-detail]',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  public employees = [];

  constructor(private _employeeService:EmployeeService, private router:Router) { }

  ngOnInit(): void {
    /* gets called once the compoenents has been initialized
     * I am going to fetch the emplyee data here, declare the dependency mentioned in the constructor 
     */
    this._employeeService.getEmployees()
        .subscribe(data => this.employees = data); /* assign the data  received from the observable to the local employees property */
  }

  onSelect(employee){
    this.router.navigate(['/employees',employee.id])
  }

}
