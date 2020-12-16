import { Injectable } from '@angular/core';

import { Employee, IEmployee } from './employee';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  private _url: string = "https://localhost:44348/api/Students/";
  emps$ = new Observable<Employee[]>();
  public employees = [];

  constructor(private http: HTTP) { }

  getEmployees(): Employee[] {


    this.http.get(this._url, {}, {}).then(res => {
       console.log(res.data);
       this.employees = res.data;
      // console.log(this.emps);
    });
    console.log("In service: " + this.emps$);
    return this.employees;
  }
}
