import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
/*
 * Also imported FormBuilder for not creating multiple form instances manually.
 * Imported Validator class for managing the validations for the form.
 */
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddressService } from '../address.service';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { forbiddenNameValidator2 } from '../shared/name.validator';
import { PasswordValidator } from '../shared/password.validator';

/* CTRL + SHIFT + P = organize imports */

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit, AfterViewInit {
  private id: number;
  private addressID: number;
  private subscription: Subscription;
  private subscriptionAddresses: Subscription;
  private subscriptionUpdate: Subscription;
  private subscriptionSubject: Subscription;

  serverErrorMessage = '';
  /* ViewChildDecorator stuff - this is a property representing the #studentName template ref variable from the DOM */
  @ViewChild('studentName') studentElementRef: ElementRef;

  registrationForm: FormGroup;

  constructor(private employeeService: EmployeeService,
    private addressService: AddressService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private rout: Router) { }

  /* The ViewChild decorator only works in this lifecycle hook - this is where the dom elements are available */
  ngAfterViewInit(): void {
    this.studentElementRef.nativeElement.focus();
    //console.log(this.studentElementRef); --- /* With this I can see all the properties of the element  */
  }

  private registerEmployee = new Employee(null, "", "", "", null, null);


  /* A getter for retrieving the name value, in order to use it in the template */
  get studentName() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get groupId() {
    return this.registrationForm.get('groupId');
  }

  get AddressID() {
    return this.registrationForm.get('AddressID');
  }

  get birthdate() {
    return this.registrationForm.get('birthdate');
  }

  get alternateEmails() {
    /* I type asserted it to FormArray -- why?? */
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  /* Method for pushing new controls into the FormArray */
  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }
  /* This is for removing unnecessary emails controls */
  removeAlternateEmail(i) {
    this.alternateEmails.removeAt(this.alternateEmails.length - 1);
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
    this.subscriptionSubject = this.employeeService.studentListMessage$.subscribe(
      message => {
        if (message === "Reactive edit")
          alert("You are about to reactively edit the employee");
        this.subscriptionSubject.unsubscribe();
      }
    );

    /* 2nd way of doing it by using an injected service of type FormBuilder, so no need for new instances of FormControl/Group */
    this.registrationForm = this.fb.group({
      /* Applied the required validators rule for this field as second argument.
       * For multiple validations applied, we use an array
       */
      name: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator2(/password/)]],
      email: ['', [Validators.required]],
      password: [''],
      birthdate: [''],
      groupId: [''],
      AddressID: [''],
      confirmPassword: [''],
      subscribe: [false],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      /* I added the alternateEmail control by using FormArray, in order to play around with dynamic form control */
      alternateEmails: this.fb.array([])
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
            email: data.email,
            birthdate: data.birthdate,
            groupId: data.groupId,
            AddressID: data.addressID,
          })

          this.subscriptionAddresses = this.addressService.getAddress(data.addressID)
            .subscribe(data => {
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

  onSubmit() {
    this.buildEmployee();
    //console.log(this.registerEmployee);
    this.subscriptionUpdate = this.employeeService.updateEmployee(this.registerEmployee)
      .subscribe(
        data => console.log("Successfully updated employee!"),
        error => this.serverErrorMessage = error
      )
    //delay(1);
    if (this.serverErrorMessage == '')
      this.rout.navigate(['/employee-details/']);
  }

  buildEmployee() {
    this.registerEmployee.id = this.id;
    this.registerEmployee.name = this.studentName.value;
    this.registerEmployee.birthdate = this.birthdate.value;
    this.registerEmployee.addressID = this.AddressID.value;
    this.registerEmployee.groupId = this.groupId.value;
    this.registerEmployee.email = this.email.value;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    //this.subscriptionUpdate.unsubscribe();

  }
}
