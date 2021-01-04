import { Component } from '@angular/core';
import { hostViewClassName } from '@angular/compiler';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './Auth/_services/authentication.service';
import { User } from './Auth/_models/user';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  /* Data to be sent to the child component */
  public name = "Sergiu";
  public messageFromChild: string;
  public windowLocation = window.location.href;
  currentUser: User;

  public constructor(private router: Router,
    private authenticationService: AuthenticationService) {
    //this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
