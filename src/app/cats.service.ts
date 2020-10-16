import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICatServiceResponse, IGetCatTable } from './cat';

import { throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CatsService {

  private _urlEmea: string = "http://localhost:8080/Cat2/rest/CatService/CatService/";

  constructor(private http: HttpClient) { }

  /* I receive the observable (the item from the GET request) and cast it into an employee array with IEmployee */
  getCats(): Observable<IGetCatTable[]> {
    return this.http.get<IGetCatTable[]>(this._urlEmea)
      .pipe((catchError(this.errorHandler))); // pipe is needed for this version of Angular
  }

  //data.getcat.getcat.map(cat => { Id = cat.Id etc})

  // getCats2() {
  //   return this.http.get(this._urlEmea).
  //     pipe(map((result:any) => {
  //       console.log(result);
  //       return result.response.getCat.getCat.map(cat => {
  //         return {
  //           ...cat,
  //           id:cat.Id
  //         }
  //       });
  //     })
  //       // map((cat: Cats[]) => {
  //       //   return cat;
  //       // }), catchError(error => {
  //       //   return throwError('Something went wrong!');
  //       // })
  //     );
  // }

  getCats2() {
    return this.http.get(this._urlEmea).
      pipe(map((result:ICatServiceResponse) => {
        console.log(result);
        return result.response.getCat.getCat;
      })
        // map((cat: Cats[]) => {
        //   return cat;
        // }), catchError(error => {
        //   return throwError('Something went wrong!');
        // })
      );
  }
  

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server error");
  }
}
