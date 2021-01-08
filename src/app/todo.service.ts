import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToDo } from './ToDo';
import { Title } from '@angular/platform-browser';

/* In case we want to inject a service into this service - required only for a service */
@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private _url: string = "https://localhost:44348/api/ToDo/";
  private _envUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  /* I receive the observable (the item from the GET request) and cast it into an employee array with IEmployee */
  getToDos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${this._envUrl}/ToDo`).pipe((catchError(this.errorHandler)));
  }

  getToDo(id: number): Observable<ToDo> {
    return this.http.get<ToDo>(this._url + id).pipe((catchError(this.errorHandler)));
  }

  updateToDo(todo: ToDo) {
    const requestBody = { ToDoID: todo.toDoID, employeeID: todo.employeeID, Title: todo.title, Description: todo.description };
  
    return this.http.put(this._url + requestBody.ToDoID, requestBody).pipe((catchError(this.errorHandler)));
  }

  deleteToDo(id: number) {
    return this.http.delete<any>(this._url + id);
  }

  addToDo(todo: ToDo) {
    const requestBody = { ToDoID: todo.toDoID, employeeID: todo.employeeID, Title: todo.title, Description: todo.description };
    //console.log("I am sending: " + requestBody);
    return this.http.post(this._url, requestBody).pipe((catchError(this.errorHandler)));
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error.message || "Server error");
    return throwError(error.message || "Server error");
  }

}
