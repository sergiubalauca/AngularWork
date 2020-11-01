import { Component, OnInit } from '@angular/core';
import { CatsService } from '../cats.service';
import { RegisterCat } from '../register-cat';

@Component({
  selector: 'app-cats-register',
  templateUrl: './cats-register.component.html',
  styleUrls: ['./cats-register.component.css']
})
export class CatsRegisterComponent implements OnInit {

  /* Angular forms */
  public colors = ['red', 'green', 'blue'];
  /* Two way binding with [(catname)] in the template - instead of using name = "catname ngModel" */
  public catname = "";
  /* Declare a variable of type RegisterCat, in order to instantiate it with data from the template */
  registerCat = new RegisterCat('', 'default', null, 'evening', true);
  
  
  //registerCatPostI = new ICatServiceResponsePost
  //registerCatPostInterface = new ICatServiceResponsePost

  catColorHasError = true;

  /* Subscribed to the CatService service, so that I can post and read the returned Observable */
  constructor(private _enrollmentService: CatsService) { }

  validateCatColor(value) {
    if (value === 'default')
      this.catColorHasError = true;
    else
      this.catColorHasError = false;
  }

  onSubmit(){
    //console.log(this.registerCat);
    this._enrollmentService.createEmptyUser(this.registerCat.CatName, this.registerCat.CatColor);
    this._enrollmentService.enroll(this.registerCat)
      .subscribe(
        data => console.log("Succes!", data),
        error => console.log("Error!", error)
      )
      

    // this._enrollmentService.postCat(this.registerCat)
    // .subscribe(
    //   data => console.log("Succes!", data),
    //   error => console.log("Error!", error)
    // )
  }

  ngOnInit(): void {
    
  }

}
