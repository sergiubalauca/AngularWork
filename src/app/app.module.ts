import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './Auth/_helpers';
import { CatsListComponent } from './cats-list/cats-list.component';
import { CatsRegisterComponent } from './cats-register/cats-register.component';
import { CatsService } from './cats.service';
import { ChildComponentComponent } from './child-component/child-component.component';
/*import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';*/
import { EmployeeService } from './employee.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { SensorListComponent } from './sensor-list/sensor-list.component';
import { TestComponent } from './test/test.component';



@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    routingComponents,
    /*EmployeeListComponent,
    EmployeeDetailComponent,*/ /* Not needed to import the components because they are included in the const routingComponents */
    CatsListComponent,
    PageNotFoundComponent,
    SensorListComponent,
    ChildComponentComponent,
    CatsRegisterComponent,
    ReactiveFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, /* This is for the ngDirective - two way binding */
    /* For the http calls and observables we are going to use 
     * we are using it in employee.service.ts as private http:HttpClient in the constructor 
     */
    HttpClientModule,
    ChartsModule,
    ReactiveFormsModule
  ],
  providers: [EmployeeService, CatsService, AuthGuard], /* Registered (linked) the service at module level, in order for it to be
                                 * available for all the sub hierarchy classes and components - step 2 for using a service.
                                 Also AuthGuard needs to be added here, in order to be available for the app
                                 */
  bootstrap: [AppComponent]
})
export class AppModule { }
