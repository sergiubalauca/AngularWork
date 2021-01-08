import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { filter } from 'rxjs/internal/operators/filter';
import { take } from 'rxjs/internal/operators/take';
import { switchMap } from 'rxjs/operators';
import { ToDoQuery } from 'src/app/State/query';
import { ToDoStore } from 'src/app/State/store';
import { ToDoService } from 'src/app/todo.service';


@Component({
  selector: 'app-maintain-todo',
  templateUrl: './maintain-todo.component.html',
  styleUrls: ['./maintain-todo.component.css']
})
export class MaintainTodoComponent implements OnInit {

  form: FormGroup;
  description: string;
  title: string;
  

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MaintainTodoComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    ) {

    this.description = data.description;
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
  }

  save() {
    console.log(this.form.value);
    this.dialogRef.close(this.form.value);
  }

  close() {
    console.log("trying to close the dialog from the dialog");
    this.dialogRef.close();
  }
}
