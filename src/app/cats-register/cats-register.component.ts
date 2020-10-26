import { Component, OnInit } from '@angular/core';
import { RegisterCat } from '../register-cat';

@Component({
  selector: 'app-cats-register',
  templateUrl: './cats-register.component.html',
  styleUrls: ['./cats-register.component.css']
})
export class CatsRegisterComponent implements OnInit {
  
  /* Angular forms */
  public colors = ['red','green','blue'];
  /* Two way binding with [(catname)] in the template - instead of using name = "catname ngModel" */
  public catname = "";
  /* Declare a variable of type RegisterCat, in order to instantiate it with data from the template */
  registerCat = new RegisterCat('','Green',null,'evening',true);

  constructor() { }

  ngOnInit(): void {
  }

}
