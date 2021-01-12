import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ToDoQuery } from 'src/app/State/query';
import { ToDoStore } from 'src/app/State/store';
import { ToDo } from 'src/app/ToDo';
import { ToDoService } from 'src/app/todo.service';


@Component({
  selector: 'app-maintain-todo',
  templateUrl: './maintain-todo.component.html',
  styleUrls: ['./maintain-todo.component.css']
})
export class MaintainTodoComponent implements OnInit {

  form: FormGroup;
  header: string;

  todo: ToDo = new ToDo(439, "", "", "open");

  get toDoTitle() {
    return this.form.get('title');
  }

  get toDoDescription() {
    return this.form.get('description');
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MaintainTodoComponent>,
    /* This is an injection token for the data to be available in the dialog */
    @Inject(MAT_DIALOG_DATA) data,
    private ToDoService: ToDoService,
    private toDoStore: ToDoStore,
    private toDoQuery: ToDoQuery
  ) {

    this.header = data.header;
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
  }

  save() {
    // console.log(this.form.value);
    this.dialogRef.close(this.form.value);
    this.buildToDo();
    // console.log(this.todo)
    this.ToDoService.addToDo(this.todo).subscribe(res => {
      console.log(res);
      /* We are going to update the store with the value returned from the API */
      this.toDoStore.update(state => {
        return {
          /* ... means returning all elements of an array from index 0 to i-1. Something like  
           * let Array1 = [ 1, 2, 3]; let copyArra = [...Array1];
           */
          todos: [
            ...state.todos,
            res
          ]
        }
      });
      this.toDoStore.setLoading(false);

      err => console.log(err);
    });
  }

  close() {
    console.log("trying to close the dialog from the dialog");
    this.dialogRef.close();
  }

  buildToDo() {
    this.todo.title = this.toDoTitle.value;
    this.todo.description = this.toDoDescription.value;
  }
}
