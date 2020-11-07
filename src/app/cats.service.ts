import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { ICatServiceResponse, ICatServiceResponsePost, IGetCatTable, IGetCatTablePost } from './cat';

import { throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import { RegisterCat } from './register-cat';


@Injectable({
  providedIn: 'root'
})
export class CatsService {

  private _urlEmea: string = "http://localhost:8080/Cat2/rest/CatService/CatService/";

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private options = { headers: this.headers };

  public cat2:IGetCatTablePost;
  public postModel:ICatServiceResponsePost;
  static postModel: ICatServiceResponsePost;

  constructor(private http: HttpClient) { }

  /* I receive the observable (the item from the GET request) and cast it into a cat array with ICat stuff */
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
      pipe(map((result: ICatServiceResponse) => {
        //console.log(result);
        return result.response.getCat.getCat;
      })
        // map((cat: Cats[]) => {
        //   return cat;
        // }), catchError(error => {
        //   return throwError('Something went wrong!');
        // })
      );
  }

  public createEmptyUser(catName:string, colour:string) /*: ICatServiceResponsePost*/ {
    this.cat2 = new IGetCatTablePost(catName, colour);
    this.postModel = new ICatServiceResponsePost(this.cat2);

    console.log(JSON.stringify(this.postModel));
    return this.postModel;
  }

  enroll(cat: RegisterCat):Observable<RegisterCat> {
    const requestBody = {request:{catName:cat.CatName, colour:cat.CatColor}};
    console.log(requestBody);
    return this.http.post(this._urlEmea, requestBody).
      pipe(map((result: any) => {
        //console.log(result);
        return result;
      })
        // map((cat: Cats[]) => {
        //   return cat;
        // }), catchError(error => {
        //   return throwError('Something went wrong!');
        // })
      ).pipe((catchError(this.errorHandler)));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server error");
  }
}
