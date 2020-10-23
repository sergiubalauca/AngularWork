import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: '[app-employee-detail]',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  public employees = [];
  public selectedID:number;

  constructor(private _employeeService:EmployeeService, private router:Router, private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activateRoute.paramMap.subscribe((params:ParamMap) => {
      let id = parseInt(params.get('id'));
      this.selectedID = id;
    })
    /* gets called once the compoenents has been initialized
     * I am going to fetch the emplyee data here, declare the dependency mentioned in the constructor 
     */
    this._employeeService.getEmployees()
        .subscribe(data => this.employees = data); /* assign the data  received from the observable to the local employees property */
  }

  onSelect(employee){
    this.router.navigate(['/employees',employee.id])
  }

  public isSelected(employee){
    return employee.id === this.selectedID;
  }

}
