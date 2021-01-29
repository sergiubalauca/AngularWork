import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { AuthGuard } from './Auth/_helpers/auth.guard';
import { CatsListComponent } from './cats-list/cats-list.component';
import { CatsRegisterComponent } from './cats-register/cats-register.component';
import { ChildComponentComponent } from './child-component/child-component.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LearningComponent } from './learning/learning.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { SensorListComponent } from './sensor-list/sensor-list.component';
import { AddTodoComponent } from './ToDo/add-todo/add-todo.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  /* Used for redirecting the user to a default page:: full because otherwise prefix will not work */
  { path: '', redirectTo: '/employee-details', pathMatch: 'full', canActivate: [AuthGuard] },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employees/:id',
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
    /* Added child routes */
    children: [
      { path: 'child', component: ChildComponentComponent, canActivate: [AuthGuard] },
      { path: 'reactive-form', component: ReactiveFormComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'employee-details', component: EmployeeDetailComponent, runGuardsAndResolvers: 'always', canActivate: [AuthGuard] },
  { path: 'cats', component: CatsListComponent, canActivate: [AuthGuard] },
  { path: 'cats-register', component: CatsRegisterComponent, canActivate: [AuthGuard] },
  { path: 'sensors', component: SensorListComponent, canActivate: [AuthGuard] },
  { path: 'add-todo', component: AddTodoComponent, data: { animations: 'add-todo' }, canActivate: [AuthGuard] },
  { path: 'learning', component: LearningComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent } /* Used for displaying page not found */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [EmployeeListComponent,
  EmployeeDetailComponent,
  CatsListComponent,
  CatsRegisterComponent,
  SensorListComponent,
  PageNotFoundComponent,
  ChildComponentComponent,
  ReactiveFormComponent,
  LoginComponent,
  AddTodoComponent];