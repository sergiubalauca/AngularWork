import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from './employee';
import { Observable } from 'rxjs';

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

    return this.http.get<IEmployee[]>(this._url);
  }
}
