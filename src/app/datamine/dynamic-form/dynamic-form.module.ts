import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderService} from './services/form-builder.service';
import { FormElementsBuilderService } from './services/form-elements-builder.service';
import { DynamicFormComponent } from './dynamic-form-element/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DynamicFormComponent],
  providers: [FormBuilderService, FormElementsBuilderService],
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  exports: [DynamicFormComponent]
})
export class DynamicFormModule { }
