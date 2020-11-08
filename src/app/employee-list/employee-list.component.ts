import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import { Router } from '@angular/router';
import {ParamMap} from '@angular/router';

@Component({
  selector: '[app-employee-list]',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public employees  = [];
  public employeeId:number;
  
  
  constructor(private _employeeService:EmployeeService, private route1:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    /* gets called once the compoenents has been initialized
     * I am going to fetch the emplyee data here, declare the dependency mentioned in the constructor 
     */
    this._employeeService.getEmployees()
        .subscribe(data => this.employees = data); /* assign the data  received from the observable to the local employees property */
    /* we read the route parameter: from the route, we get the snapshot of the courrent route, getting the param from the url 
     * BUT if we navigate from this componenet to the same one, it will not work using snapshot - navigatenext, prev.
     * Angular just reuses the compoenent and not initialises the page.
     */
    //let id = parseInt(this.route.snapshot.paramMap.get('id'));
    /* Any time the param value changes, navigating back and forw will make it so that param map observable will detect and read id */
    this.route.paramMap.subscribe((params:ParamMap) => {
      let id = parseInt(params.get('id'));
      this.employeeId = id;
    })
    
  }

  goPrevious(){
    let previousId = this.employeeId - 1;
    this.route1.navigate(['/employees',previousId]);
  }

  goNext(){
    let nextId = this.employeeId + 1;
    this.route1.navigate(['/employees',nextId]);
  }

  goToEmployees(){
    let selectedID = this.employeeId;
    /* Send optional route parameter with key-value pairs {} */
    this.route1.navigate(['/employee-details', {id:selectedID, extraTestParam: "testPAram"}]);
    /* 
     * Replaced the above line with the following: added relative navigation for flexibility.
     * Basically, it sais: I don't care about the path, just add to the current route the id
     */
    //this.route1.navigate(['../', {id:selectedID, extraTestPAram:"testParam"}],{relativeTo:this.route});
  }
  /* The child component will be displayed when button 'Go to child' is pressed, only here */
  showChild(){
    let selectedID = this.employeeId;
    this.route1.navigate(['child', {id:selectedID}], {relativeTo:this.route});
  }

  addEmployee(){
    let selectedID = this.employeeId;
    this.route1.navigate(['child'], {relativeTo:this.route});
  }

  deleteEmployee(){
    this._employeeService.deleteEmployee(this.employeeId)
        .subscribe(data => console.log(data));
  }
}
