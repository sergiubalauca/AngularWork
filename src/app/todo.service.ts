import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToDo } from './ToDo';
import { Title } from '@angular/platform-browser';
import { ToDoQuery } from './State/query';

/* In case we want to inject a service into this service - required only for a service */
@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private _url: string = "https://localhost:44348/api/ToDos/";
  private _envUrl = environment.baseUrl;

  constructor(private http: HttpClient,
    private toDoQuery: ToDoQuery) { }

  /* I receive the observable (the item from the GET request) and cast it into an employee array with IEmployee */
  getToDos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${this._envUrl}/ToDos`).pipe((catchError(this.errorHandler)));
  }

  getToDo(id: number): Observable<ToDo> {
    return this.http.get<ToDo>(this._url + id).pipe((catchError(this.errorHandler)));
  }

  updateStatus(toDoID: number, changes: any) {
    // const requestBody = { ToDoID: todo.toDoID, employeeID: todo.employeeID, Title: todo.title, Description: todo.description };
    let todos = [];
    this.toDoQuery.getToDos().subscribe(res => {
      todos = res;
      // console.log("gsbres");
      // console.log(todos)
    });

    const toDoIndex = todos.findIndex(t => t.toDoID == toDoID);
    // console.log(toDoID);
    // console.log(todos[toDoIndex]);

    const requestBody = {
      ...todos[toDoIndex]
    }

    if (requestBody.hasOwnProperty(changes.data)) {
      console.log("found field")
    }

    requestBody.status = changes.status;
    console.log("In ToDoService " + changes);
    console.log(requestBody);
    // todos[toDoIndex] = {
    //   ...todos[toDoIndex],
    //   status: ToDoStatus.COMPLETED
    // }
    // const requestBody = changes.pipe(map( res => res.toDoStatus.value))
    // console.log(todos.map(res => res.toDoID));
    // console.log(todos.findIndex(t => t.toDoID == todos.map(res => res.toDoID)));
    return this.http.put<any>(`${this._envUrl}/ToDos/${toDoID}`, requestBody).pipe((catchError(this.errorHandler)));
  }

  deleteToDo(id: number) {
    return this.http.delete<ToDo>(this._url + id);
  }

  addToDo(todo: ToDo) {
    const requestBody = { employeeID: todo.employeeID, title: todo.title, description: todo.description };
    // console.log(requestBody);
    return this.http.post<ToDo>(this._url, todo).pipe((catchError(this.errorHandler)));
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error.message || "Server error");
    return throwError(error.message || "Server error");
  }

}
