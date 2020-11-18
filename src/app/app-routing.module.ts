import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatsListComponent } from './cats-list/cats-list.component';
import { CatsRegisterComponent } from './cats-register/cats-register.component';
import { ChildComponentComponent } from './child-component/child-component.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { SensorListComponent } from './sensor-list/sensor-list.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  /*{path:'', component: EmployeeDetailComponent},*/
  /* Used for redirecting the user to a default page:: full because otherwise prefix will not work */
  {path:'', redirectTo: '/employee-details', pathMatch: 'full'},
  {
    path:'employees',
    component: EmployeeListComponent
  },
  {
    path:'employees/:id', 
    component:EmployeeListComponent,
    /* Added child routes */
    children:[
      {path:'child', component:ChildComponentComponent},
      {path:'reactive-form', component:ReactiveFormComponent}
    ]},
  {path:'employee-details', component: EmployeeDetailComponent, runGuardsAndResolvers: 'always'},
  {path:'cats', component: CatsListComponent},
  {path:'cats-register', component: CatsRegisterComponent},
  {path:'sensors', component: SensorListComponent},
  {path:'**', component: PageNotFoundComponent} /* Used for displaying page not found */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
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
                                  ReactiveFormComponent];