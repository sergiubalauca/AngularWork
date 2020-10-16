import { Component } from '@angular/core';
import { hostViewClassName } from '@angular/compiler';
import {FormsModule} from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'intro2angular';
  /* Data to be sent to the child component */
  public name = "Sergiu"; 
  public messageFromChild;
  public windowLocation = window.location.href;
}
