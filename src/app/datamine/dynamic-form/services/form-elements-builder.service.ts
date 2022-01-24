/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ColumnModel, DataModel } from '@shared';
import { FormBase, FormTextbox } from '../form-models';

@Injectable({ providedIn: 'root' })
export class FormElementsBuilderService {

  private dict: { [key: string]: string } = {
    NUMERIC: 'number',
    DATE: 'string',
    DATETIME: 'string',
    CHAR: 'string',
  };

  public constructor() { }

  public setElements(metadata: ColumnModel, dataObject?: string): Observable<FormBase<any>[]> {
    const questions: FormBase<any>[] = [];
    let internalDataObject: DataModel;
    console.log('DATA OBJECT: ', dataObject);
    console.log('METADATA: ', metadata);

    let columnNames: string[];
    let columnData: any[];

    // eslint-disable-next-line prefer-const
    internalDataObject = JSON.parse(dataObject);
    // eslint-disable-next-line prefer-const
    columnNames = Object.keys(metadata);
    // eslint-disable-next-line prefer-const
    columnData = Object.values(internalDataObject);
    let i = 0;
    columnNames.forEach(colName => {
      questions.push((
        new FormTextbox({
          key: colName,
          label: colName,
          value: internalDataObject[colName],
          required: true,
          disabled: metadata[colName].is_editable === 'N' ? true : false,
          // validators: this.validationRulesBuilderService.createValidationRules(metadata[colName]),
          type: this.dict[metadata[colName]['data_type']],
          order: i
        })
      ));

      i++;
    });

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
