import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { FormsModule } from '@angular/forms';
/*import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';*/
import { EmployeeService } from './employee.service';
import { HttpClientModule } from '@angular/common/http';
import { CatsListComponent } from './cats-list/cats-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SensorListComponent } from './sensor-list/sensor-list.component';
import { ChartsModule } from 'ng2-charts';
/*********** For the http calls and observables we are going to use */

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    routingComponents,
    /*EmployeeListComponent,
    EmployeeDetailComponent,*/ /* Not needed to import the components because they are included in the const routingComponents */
    CatsListComponent,
    PageNotFoundComponent,
    SensorListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, /* This is for the ngDirective - two way binding */
    /* For the http calls and observables we are going to use 
     * we are using it in employee.service.ts as private http:HttpClient in the constructor 
     */
    HttpClientModule,
    ChartsModule
  ],
  providers: [EmployeeService], /* Registered (linked) the service at module level, in order for it to be
                                 * available for all the sub hierarchy classes and components - step 2 for using a service
                                 */
  bootstrap: [AppComponent]
})
export class AppModule { }
