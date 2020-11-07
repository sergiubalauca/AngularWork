import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css']
})
export class ChildComponentComponent implements OnInit {

  employee = {};
  public subscription: Subscription;
  serverErrorMessage = '';
  registerEmployee = new Employee(null,"", "", "", null);

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) { }

  onSubmit() {
    //console.log(this.registerCat);
    this.employeeService.updateEmployee(this.registerEmployee)
      .subscribe(
        data => console.log("Succes!", data),
        //error => console.log("Error!", error),
        error => this.serverErrorMessage = error

      )

    // this._enrollmentService.postCat(this.registerCat)
    // .subscribe(
    //   data => console.log("Succes!", data),
    //   error => console.log("Error!", error)
    // )
  }

  /* Get the employee for the editing section */
  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    //console.log(id);

    this.subscription = this.employeeService.getEmployee(id)
      .subscribe(data => {
        this.employee = data;
        //console.log(this.employee);
        
        /* Update the binded object to the template */
        this.registerEmployee.id =data.id;
        this.registerEmployee.name = data.name;
        this.registerEmployee.email = data.email;
        this.registerEmployee.birthdate = data.birthdate;
        this.registerEmployee.groupId = data.groupId;
      });

    //console.log(this.employee); // this is empty!! interesting lifecycle
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
