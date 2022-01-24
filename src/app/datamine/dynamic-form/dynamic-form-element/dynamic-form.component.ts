import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormBase } from '../form-models/form-base';

@Component({
  selector: 'app-form-control',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  @Input() public formElement: FormBase<any>;
  @Input() public form: FormGroup;

  public check: any;
  public formValidationMessages = {};

  public constructor() {
    console.log(this.formElement);
  }
}
