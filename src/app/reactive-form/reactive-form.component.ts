import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
/* 
 * Also imported FormBuilder for not creating multiple form instances manually. 
 * Imported Validator class for managing the validations for the form.
 */
import { FormControl, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddressService } from '../address.service';
import { EmployeeService } from '../employee.service';
import { forbiddenNameValidator, forbiddenNameValidator2 } from '../shared/name.validator';
import { PasswordValidator } from '../shared/password.validator';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  private id: number;
  private addressID: number;
  private subscription: Subscription;
  private subscriptionAddresses: Subscription;
  registrationForm: FormGroup;

  constructor(private employeeService: EmployeeService,
    private addressService: AddressService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) { }

  /* A getter for retrieving the name value, in order to use it in the template */
  get studentName() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  /* We initialize a new FormGroup object with the FormControls from the html as input in the constructor */
  registrationForm0 = new FormGroup({
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



  ngOnInit(): void {
    /* 2nd way of doing it by using an injected service of type FormBuilder, so no need for new instances of FormControl/Group */
    this.registrationForm = this.fb.group({
      /* Applied the required validators rule for this field as second argument.
       * For multiple validations applied, we use an array
       */
      name: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator2(/password/)]],
      email: [''],
      password: [''],
      confirmPassword: [''],
      subscribe: [false],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      })
    }, { validators: PasswordValidator }); /* I added the validator the the entire group, so that we can include both pass and confirm pass, not the separate controls*/

    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.addressID = parseInt(this.activatedRoute.snapshot.paramMap.get('adrsID'));
    //console.log(this.id);
    if (!isNaN(this.id)) {
      this.subscription = this.employeeService.getEmployee(this.id)
        .subscribe(data => {
          //console.log(data.name)
          /* Update the binded object to the template by using patchValue for assigning just a couple of fields.
           * To assign them all, we use setValue() 
           */
          this.registrationForm.patchValue({
            name: data.name,
            email: data.email
          })

          this.subscriptionAddresses = this.addressService.getAddress(data.addressID)
            .subscribe(data => {
              console.log(data);
              this.registrationForm.patchValue({
                address: {
                  city: data.city,
                  state: data.state,
                  postalCode: data.postalCode
                }
              })
            })
        })
    }

    /* For conditional validation - we make use of the valueChanges property which returns an Observable.
     * We subscribe to it and we get the check value as a parameter 
     */
    this.registrationForm.get('subscribe').valueChanges.subscribe(checkedValue => {
      /* We get a hold of the email form control */
      const email = this.registrationForm.get('email');
      if (checkedValue) {
        /* If the value is checked, we need to se the required validator */
        email.setValidators(Validators.required);
      }
      else
        email.clearValidators();
      /* In order to ensure the correct status is reflected, we call the updateValueAndValidity method */
      email.updateValueAndValidity();
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
