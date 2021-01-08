import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { filter } from 'rxjs/internal/operators/filter';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { take } from 'rxjs/internal/operators/take';
import { ToDoQuery } from 'src/app/State/query';
import { ToDoStore } from 'src/app/State/store';
import { ToDoService } from 'src/app/todo.service';
import { MaintainTodoComponent } from '../maintain-todo/maintain-todo.component';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  loading = false;
  todos = [];

  constructor(private dialog: MatDialog,
    private todoQuery: ToDoQuery,
    private todoStore: ToDoStore,
    private _toDoService: ToDoService) { }

  private canCloseDialog: boolean;

  ngOnInit(): void {
    this.canCloseDialog = false;

    this.todoQuery.getLoading().subscribe(res => this.loading = res);
    this.todoQuery.getToDos().subscribe(res => this.todos = res);
    this.todoQuery.getLoaded().pipe(
      take(1), /* Fetch the value from the store only once */
      filter(res => !res), /* Only when the response is false then the code will be executed because of ! */
      switchMap(() => {
        this.todoStore.setLoading(true);
        return this._toDoService.getToDos();
      })
    ).subscribe(res => { /* Get all the todos */
      this.todoStore.update(_state => {
        console.log("res");
        console.log(res);
        this.todos = res;
        return {
          todos: res
        };
      });
      this.todoStore.setLoading(false);
    }, err => {
      console.log("Err store: " + err);
      this.todoStore.setLoading(false);
    });
    console.log("the array");
    console.log(this.todos);
  }

  addToDo() {
    console.log("Adding ToDo");
    const dialogConfig = new MatDialogConfig();
    /* With disableclose = true, the user can exit the dialog by clicking outside of it */
    dialogConfig.disableClose = false;
    /* The focus will be set automatically on the first form field of the dialog */
    dialogConfig.autoFocus = true;

    /* OTHER CONFIGS THAT CAN BE OVERRIDDEN
    
    hasBackdrop: defines if the dialog should have a shadow backdrop, that blocks the user from clicking on the rest of the UI while the dialog is opened (default is true)
    panelClass: adds a list of custom CSS classes to the Dialog panel
    backdropClass: adds a list of custom CSS classes to the dialog backdrop
    position: defines a starting absolute position for the dialog. For example, this would show the dialog in top left corner of the page, instead of in the center:
    direction: this defines if the elements inside the dialog are right or left justified. The default is left-to-right (ltr), but we can also specify right-to-left (rtl). Here is what a right-to-left dialog looks like:
    closeOnNavigation: this property defines if the dialog should automatically close itself when we navigate to another route in our single page application, which defaults to true.
    */
    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners',
      description: 'initial description'
    };

    this.dialog.open(MaintainTodoComponent, dialogConfig);

    const dialogRef = this.dialog.open(MaintainTodoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        this.canCloseDialog = true;
      }
    );
    // if (this.canCloseDialog == true) {
    //   console.log("trying to close the dialog")
    //   this.dialog.closeAll();
    //   this.canCloseDialog = false;
    // }
  }

}
