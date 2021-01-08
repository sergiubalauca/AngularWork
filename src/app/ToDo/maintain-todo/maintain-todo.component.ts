import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-maintain-todo',
  templateUrl: './maintain-todo.component.html',
  styleUrls: ['./maintain-todo.component.css']
})
export class MaintainTodoComponent implements OnInit {

  form: FormGroup;
  description: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MaintainTodoComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.description = data.description;
  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []]
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    console.log("trying to close the dialog from the dialog");
    this.dialogRef.close();
  }
}
