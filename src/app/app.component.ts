import { Component } from '@angular/core';
import { hostViewClassName } from '@angular/compiler';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  /* Data to be sent to the child component */
  public name = "Sergiu"; 
  public messageFromChild:string;
  public windowLocation = window.location.href;

  public constructor(private router:Router){

  }

  public logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
