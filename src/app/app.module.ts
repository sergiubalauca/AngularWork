import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard, ErrorInterceptor, JwtInterceptor } from './Auth/_helpers';
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
import { AddTodoComponent } from './ToDo/add-todo/add-todo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MaintainTodoComponent } from './ToDo/maintain-todo/maintain-todo.component';
import { ToDoQuery } from './State/query';
import { ToDoStore } from './State/store';
import { ToDoService } from './todo.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DatabaseModule } from './rxdb/database.module';
import { ToDosRepository } from './rxdb/repositories/todos.repository';
import { Connectivity } from './shared/network/connectivity.service';
import { LearningComponent } from './learning/learning.component';
import { DynamicFormQuestionComponent } from './datamine/dynamic-form/components/dynamic-form-question/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './datamine/dynamic-form/components/dynamic-form/dynamic-form.component';

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
    ReactiveFormComponent,
    AddTodoComponent,
    MaintainTodoComponent,
    LearningComponent,
    DynamicFormQuestionComponent,
    DynamicFormComponent
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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    DragDropModule,
    DatabaseModule
  ],
  /* Registered (linked) the service at module level, in order for it to be
  * available for all the sub hierarchy classes and components - step 2 for using a service.
  Also AuthGuard needs to be added here, in order to be available for the app.
  Added JwtHelper for checking if the token is expired or not along with the JWT_OPTIONS as per stackoverflow.
  Added HTTP_INTERCEPTORS as well, in order to intercept calls.
  */
  providers: [EmployeeService,
    ToDoQuery,
    ToDoStore,
    ToDoService,
    CatsService,
    Connectivity,
    ToDosRepository,
    AuthGuard,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [MaintainTodoComponent]
})
export class AppModule { }
