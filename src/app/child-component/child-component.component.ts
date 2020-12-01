import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css']
})
export class ChildComponentComponent implements OnInit {

  public id: number;
  employee = {};
  public subscription: Subscription;
  private subscriptionUpdate: Subscription;
  private subscriptionCreate: Subscription;

  serverErrorMessage = '';
  registerEmployee = new Employee(null, "", "", "", null, null);

  constructor(private employeeService: EmployeeService, private rout: Router, private route: ActivatedRoute) { }

  onSubmit() {
    if (!isNaN(this.id)) {
      /* === Update mode === */

      this.subscriptionUpdate = this.employeeService.updateEmployee(this.registerEmployee)
        .subscribe(
          data => console.log("Successfully updated employee!"),
          error => this.serverErrorMessage = error
        )
      //delay(1);
      if (this.serverErrorMessage == '')
        this.rout.navigate(['/employee-details/']);
    }
    /* === Create mode === */
    else {
      this.subscriptionCreate = this.employeeService.addEmployee(this.registerEmployee)
        .subscribe(
          data => console.log("Succes!", data),
          error => this.serverErrorMessage = error
        )

      if (this.serverErrorMessage == '')
        this.rout.navigate(['/employee-details/']);
    }
  }

  /* Get the employee for the editing section */
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    //console.log(this.id);
    if (!isNaN(this.id)) {
      this.subscription = this.employeeService.getEmployee(this.id)
        .subscribe(data => {
          this.employee = data;
          //console.log(this.employee);

          /* Update the binded object to the template */
          this.registerEmployee.id = data.id;
          this.registerEmployee.name = data.name;
          this.registerEmployee.email = data.email;
          this.registerEmployee.birthdate = data.birthdate;
          this.registerEmployee.groupId = data.groupId;
          this.registerEmployee.addressID = data.addressID;
        });
    }
    else {

    }
    //console.log(this.employee); // this is empty!! interesting lifecycle
  }

  ngOnDestroy() {
    if (!isNaN(this.id))
      this.subscription.unsubscribe();

    // if (!isNaN(this.id))
    //   //console.log("unsubscribing from update")
    //   this.subscriptionUpdate.unsubscribe();
    // else if (isNaN(this.id))
    // //console.log("unsubscribing from create")
    //   this.subscriptionCreate.unsubscribe();
  }

}
