import { Component, OnInit } from '@angular/core';
import { hostViewClassName } from '@angular/compiler';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './Auth/_services/authentication.service';
import { User } from './Auth/_models/user';
import { ToDosRepository } from './rxdb/repositories/todos.repository';
import { DatabaseProvider } from './rxdb/DatabaseProvider';
import { ToDoService } from './todo.service';



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
    private authenticationService: AuthenticationService,
    private databaseProvider: DatabaseProvider) {

  }

  async logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    await this.databaseProvider.clearDatabase();
  }
}
