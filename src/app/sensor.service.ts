import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISensorServiceResponse} from './sensor';

import { throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private _urlEmea: string = "http://localhost:8080/Cat2/rest/sensor/sensor/";

  constructor(private http: HttpClient) { }

  getSensors() {
    return this.http.get(this._urlEmea).
      pipe(map((result:ISensorServiceResponse) => {
        console.log(result);
        return result.response.getSensor.getSensor;
      }));
  }
  

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server error");
  }
}
