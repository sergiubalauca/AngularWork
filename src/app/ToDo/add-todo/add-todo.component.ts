import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { filter, switchMap, take } from 'rxjs/internal/operators';
import { ToDoQuery } from 'src/app/State/query';
import { ToDoStore } from 'src/app/State/store';
import { ToDo, ToDoStatus } from 'src/app/ToDo';
import { ToDoService } from 'src/app/todo.service';
import { MaintainTodoComponent } from '../maintain-todo/maintain-todo.component';
import { CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
/* DragDropModule for the ToDo List */
import { Observable, Subscription } from 'rxjs';
import { ToDosRepository } from 'src/app/rxdb/repositories';
import { Connectivity } from 'src/app/shared/network/connectivity.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  loading: boolean = false;

  public todos: ToDo[] = [];

  public toDoD: ToDo[];
  public doneD: ToDo[];

  public rxToDos: ToDo[];

  private toDoSubscription: Subscription;

  public rxitems: ToDo;
  public todosRxDB$: Observable<ToDo[]>;

  public toDoComplete: boolean = false;
  public toDoStatus: string = "Mark as completed";

  constructor(private dialog: MatDialog,
    private todoQuery: ToDoQuery,
    private todoStore: ToDoStore,
    private _toDoService: ToDoService,
    private todosRepo: ToDosRepository,
    private connectionService: Connectivity) { }


  private canCloseDialog: boolean;

  public async refreshRxDB(ToDos: ToDo[]) {
    // this.todosRepo.insertToDos(ToDos);
    // await this.todosRepo.bulkUpsert(ToDos);
    this.todosRxDB$ = this.todosRepo.getAllToDos$();
    // this.todosRxDB$.subscribe(res => {
    //   this.rxToDos = res.map(t => {
    //     return {
    //       toDoID: t.toDoID,
    //       title: t.title,
    //       description: t.description,
    //       employeeID: t.employeeID,
    //       status: t.status
    //     }
    //   });
    //   console.log("bla bla " + this.rxToDos);
    // });

  }

  ngOnInit(): void {
    this.canCloseDialog = false;
    this.connectionService.connectionStatus();
    /* Get the loading and todos array values first */
    this.todoQuery.getLoading().subscribe(res => this.loading = res);
    this.toDoSubscription = this.todoQuery.getToDos().subscribe(res => {
      this.todos = res;
      this.toDoD = [...res.filter(t => t.status === 'open')];
      this.doneD = [...res.filter(t => t.status === 'completed')];
    });



    /* Fetch the todos from the database .
     * First we check if the getLoaded is false. If so, get the todos */
    this.todoQuery.getLoaded().pipe(
      take(1), /* Fetch the value from the store only once */
      filter(res => !res), /* Only when the response is false then the code will be executed because of ! */
      switchMap(() => {
        this.todoStore.setLoading(true);
        // console.time('/TODOS START api duration');
        // console.timeEnd('/TODOS END api duration');
        return this._toDoService.getToDos();

      })
    ).subscribe(res => { /* Get all the todos */
      this.todoStore.update(_toDoState => {
        console.log("res");
        console.log(res);
        return {
          todos: res,
          toDoD: [...res.filter(t => t.status === 'open')],
          doneD: [...res.filter(t => t.status === 'completed')]
        };
      });
      this.todoStore.setLoading(false);

    }, err => {
      console.log("Err store: " + err);
      this.todoStore.setLoading(false);
    });
    /* Update the other toDos arrays for the drag and drop */
    // this.toDoD = [...this.todos.filter(t => t.status === 'open')];
    // this.doneD = [...this.todos.filter(t => t.status === 'completed')];
    this.refreshRxDB(this.toDoD);
  }

  /* Open the dialog method */
  addToDo() {
    const dialogConfig = new MatDialogConfig();
    /* With disableclose = true, the user can exit the dialog by clicking outside of it */
    dialogConfig.disableClose = false;
    /* The focus will be set automatically on the first form field of the dialog */
    dialogConfig.autoFocus = true;

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
        this.refreshRxDB(this.todos);
      },
      err => { console.log(err) }
    );
  }

  deleteToDo(toDoID: number) {
    this._toDoService.deleteToDo(toDoID).subscribe(res => {

      /* REDUCER FUNCTION !!! */
      console.log("Reduce function result: " + [1, 2, 3, 4].reduce((accumulator, currentValue, currentIndex, array) => {
        return accumulator * currentValue
      }, 1));
      this.refreshRxDB(this.todos);
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

  /* ============================= drag and drop stuff =============================== */
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      /* Update the store with the new statuses */
      if (event.item.data['status'] === 'open')
        this.updateStore(event.item.data['toDoID'], ToDoStatus.COMPLETED);
      else
        this.updateStore(event.item.data['toDoID'], ToDoStatus.OPEN);
    }
  }

  /* With these I can actually get notified about the items being moved in/out of the drop zone */
  enteredOpen(event: CdkDragEnter<string[]>) {
    //console.log("enteredOpen");
    // this.updateStore(event.item.data['toDoID'], ToDoStatus.OPEN);
  }

  exitedOpen(event: CdkDragExit<string[]>) {
    //console.log("exitOpen");
    // this.updateStore(event.item.data['toDoID'], ToDoStatus.COMPLETED);
  }

  enteredCompleted(event: CdkDragEnter<string[]>) {
    // console.log("enteredCompleted");
    // this.updateStore(event.item.data['toDoID'], ToDoStatus.COMPLETED);
  }

  exitedCompleted(event: CdkDragExit<string[]>) {
    // console.log("exitCompleted");
    // this.updateStore(event.item.data['toDoID'], ToDoStatus.OPEN);
  }

  private updateStore(toDoID: number, toDoStatus: ToDoStatus) {
    this._toDoService.updateStatus(toDoID, { status: toDoStatus }).subscribe(
      res => {
        // this.toDoComplete = true;
        // this.toDoStatus = "Completed";
        /* Also update the store. We pass a callback which will receive the previous state and return a new one  */
        this.todoStore.setLoading(true);
        this.todoStore.update(state => {
          /* First we fetch the todos and we create a copy of them, return a new state which is immutable */
          const todos = [...state.todos];
          const toDoDs = [...state.todos.filter(t => t.status == 'open')];
          const dones = [...state.todos.filter(t => t.status == 'completed')];

          /* Then we need to find the matching toDo index by id using findIndex */
          const toDoIndex = todos.findIndex(t => t.toDoID == toDoID);
          /* Next we are updating the ToDo at that index. I could have done it by using the data from res as it is already updated */
          todos[toDoIndex] = {
            ...todos[toDoIndex],
            status: toDoStatus
          };
          toDoDs[toDoIndex] = {
            ...toDoDs[toDoIndex],
            status: toDoStatus
          };
          dones[toDoIndex] = {
            ...dones[toDoIndex],
            status: toDoStatus
          };
          /* Return the new state */
          return {
            state, /* or ...state */
            toDoDs,
            dones,
            todos
          }
        })
        this.todoStore.setLoading(false);
        this.refreshRxDB(this.todos);
      },
      err => { console.log(err) }
    );
  }
  /* ============================= END drag and drop stuff =============================== */
  ngOnDestroy() {
    this.toDoSubscription.unsubscribe()
  }
}
