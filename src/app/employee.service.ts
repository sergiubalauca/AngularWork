import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee, IEmployee } from './employee';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/* In case we want to inject a service into this service - required only for a service */
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  private _url: string = "https://localhost:44348/api/Students/";
  
  constructor(private http:HttpClient) { }

  /* I receive the observable (the item from the GET request) and cast it into an employee array with IEmployee */
  getEmployees():Observable<IEmployee[]>{
    /*return[
      {"id": 1, "name": "Andrew", "age": 30},
      {"id": 2, "name": "Brandon", "age": 25},
      {"id": 3, "name": "Christina", "age": 26},
      {"id": 4, "name": "Elena", "age": 28}
    ];*/
    
    return this.http.get<IEmployee[]>(this._url).pipe((catchError(this.errorHandler)));
  }

  getEmployee(id:number):Observable<Employee>{
    //console.log("id:" + id);
    // const observable = new Observable((subscriber) => {
    //   subscriber.next("initial hi")
    //   const id = setInterval(() => {
    //     subscriber.next('hi1')
    //     subscriber.next('this.http.get<Employee>(this._url + id)')
    //   }, 1000);
    // });

    // observable.subscribe(x => {console.log(x)});
    return this.http.get<Employee>(this._url + id).pipe((catchError(this.errorHandler)));
  }

  updateEmployee(employee: Employee){
    const requestBody = {id:employee.id, name:employee.name, email:employee.email, birthdate:employee.birthdate, groupId:employee.groupId, addressID:employee.addressID};
    //console.log(requestBody);
    //console.log(employee);
    return this.http.put(this._url + requestBody.id, requestBody).pipe((catchError(this.errorHandler)));
  }

  deleteEmployee(id:number){
    return this.http.delete<any>(this._url + id);
  }

  addEmployee(employee: Employee){
    const requestBody = {name:employee.name, email:employee.email, birthdate:employee.birthdate, groupId:employee.groupId, addressID:employee.addressID};
    //console.log("I am sending: " + requestBody);
    return this.http.post(this._url, requestBody).pipe((catchError(this.errorHandler)));
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error.message || "Server error");
    return throwError(error.message || "Server error");
  }

}
