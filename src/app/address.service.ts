import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Address } from './address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private _url: string = "https://localhost:44348/api/Addresses/";
  
  constructor(private http:HttpClient) { }

  getAddress(id:number):Observable<Address>{
    return this.http.get<Address>(this._url + id).pipe((catchError(this.errorHandler)));
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error.message || "Server error");
    return throwError(error.message || "Server error");
  }
  
}
