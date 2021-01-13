import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { filter, switchMap, take } from 'rxjs/internal/operators';
import { ToDoQuery } from 'src/app/State/query';
import { ToDoStore } from 'src/app/State/store';
import { ToDo, ToDoStatus } from 'src/app/ToDo';
import { ToDoService } from 'src/app/todo.service';
import { MaintainTodoComponent } from '../maintain-todo/maintain-todo.component';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  loading: boolean = false;
  todos: ToDo[] = [];
  public toDoComplete: boolean = false;
  public toDoStatus: string = "Mark as completed";

  public styleClass = {
    // "color:red": !this.complete,
    // "color:yellow": this.complete
  }

  constructor(private dialog: MatDialog,
    private todoQuery: ToDoQuery,
    private todoStore: ToDoStore,
    private _toDoService: ToDoService) { }

  private canCloseDialog: boolean;

  ngOnInit(): void {
    this.canCloseDialog = false;

    /* Get the loading and todos array values first */
    this.todoQuery.getLoading().subscribe(res => this.loading = res);
    this.todoQuery.getToDos().subscribe(res => this.todos = res);

    /* Fetch the todos from the database .
     * First we check if the getLoaded is false. If so, get the todos */
    this.todoQuery.getLoaded().pipe(
      take(1), /* Fetch the value from the store only once */
      filter(res => !res), /* Only when the response is false then the code will be executed because of ! */
      switchMap(() => {
        this.todoStore.setLoading(true);
        return this._toDoService.getToDos();
      })
    ).subscribe(res => { /* Get all the todos */
      this.todoStore.update(_toDoState => {
        console.log("res");
        console.log(res);
        // this.todos = res;
        return {
          todos: res
        };
      });
      this.todoStore.setLoading(false);
    }, err => {
      console.log("Err store: " + err);
      this.todoStore.setLoading(false);
    });
    // console.log("the array");
    // console.log(this.todos);
  }

  /* Open the dialog method */
  addToDo() {
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
      header: 'New ToDo'
    };

    /* The component which will be opened via the dialog must be included in the entryComponents array in app.module.ts !!! */
    let dialogRef = this.dialog.open(MaintainTodoComponent, dialogConfig);

    /* For getting the data back from the dialog here, ne use the afterClosed() observable for which ne need a 
     * reference to the dialog --- therefore we said let dialogRef = ... */
    dialogRef.afterClosed().subscribe(
      res => {
        //console.log("Dialog output:", res);
        this.canCloseDialog = true;
      }
    );


    // if (this.canCloseDialog == true) {
    //   console.log("trying to close the dialog")
    //   this.dialog.closeAll();
    //   this.canCloseDialog = false;
    // }
  }
  /* Only send the changes to be updated to the put method */
  completeToDo(toDoID: number) {
    this._toDoService.updateStatus(toDoID, { status: ToDoStatus.COMPLETED }).subscribe(
      res => {
        // this.toDoComplete = true;
        // this.toDoStatus = "Completed";
        /* Also update the store. We pass a callback which will receive the previous state and return a new one  */
        this.todoStore.update(state => {
          /* First we fetch the todos and we create a copy of them, return a new state which is immutable */
          const todos = [...state.todos];
          /* Then we need to find the matching toDo index by id using findIndex */
          const toDoIndex = todos.findIndex(t => t.toDoID == toDoID);
          /* Next we are updating the ToDo at that index. I could have done it by using the data from res as it is already updated */
          todos[toDoIndex] = {
            ...todos[toDoIndex],
            status: ToDoStatus.COMPLETED
          };
          /* Return the new state */
          return {
            state, /* or ...state */
            todos
          }
        })
        this.todoStore.setLoading(false);
      },
      err => { console.log(err) }
    );
  }

  deleteToDo(toDoID: number) {
    this._toDoService.deleteToDo(toDoID).subscribe(res => {

      /* REDUCER FUNCTION !!! */
      console.log([1, 2, 3, 4].reduce((accumulator, currentValue, currentIndex, array) => {
        return accumulator * currentValue
      }, 1));

      this.todoStore.update(state => {
        /* return a new state */
        return {
          ...state, /* With this we are spreading the previous state !!!!! */
          todos: state.todos.filter(t => t.toDoID !== toDoID) /* This will remove the todo with this id from the array */
        }
      })
    },
      err => console.log(err));
  }

}
