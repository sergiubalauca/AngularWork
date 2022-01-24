import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { FormBase } from '../form-models/form-base';

@Injectable({ providedIn: 'root' })
export class FormBuilderService {
  public constructor() { }

  public toFormGroup(formControls: FormBase<any>[]) {
    const group: any = {};
    formControls.forEach(formControl => {
      group[formControl.key] = new FormControl(formControl.value || '');
    });
    return new FormGroup(group);
  }
}
