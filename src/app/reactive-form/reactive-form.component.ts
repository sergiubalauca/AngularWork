import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  private id: number;
  private subscription: Subscription;

  /* We initialize a new FormGroup object with the FormControls from the html as input in the constructor */
  registrationForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    /* Added a new Formroup to map it to the fields which repres address in the html */
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl('')
    })
  });

  constructor(private employeeService: EmployeeService,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    //console.log(this.id);
    if (!isNaN(this.id)) {
      this.subscription = this.employeeService.getEmployee(this.id)
        .subscribe(data => {
          console.log(data.name)
          /* Update the binded object to the template by using patchValue for assigning just a couple of fields.
           * To assign them all, we use setValue() 
           */
          this.registrationForm.patchValue({
            name: data.name
          })
        })
    }
  }

  loadApi() {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    //console.log(this.id);
    if (!isNaN(this.id)) {
      this.subscription = this.employeeService.getEmployee(this.id)
        .subscribe(data => {
          console.log(data.name)
          /* Update the binded object to the template */
          this.registrationForm.patchValue({
            name: data.name
          })
        });
    }
  }
}
