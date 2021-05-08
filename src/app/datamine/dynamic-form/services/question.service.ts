import { Injectable } from '@angular/core';

import { DropdownQuestion } from '../question-dropdown';
import { QuestionBase } from '../question-base';
import { TextboxQuestion } from '../question-textbox';
import { of } from 'rxjs';
import { CheckBoxQuestion } from '../question-checkbox';

@Injectable({ providedIn: 'root' })
export class QuestionService {

  // TODO: get from a remote source of question metadata
  getQuestions() {

    const questions: QuestionBase<any>[] = [

      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' }
        ],
        order: 4
      }),

      new CheckBoxQuestion({
        key: 'checkbox',
        label: 'Check the box',
        order: 5,
        type: 'checkbox',
        // value: true,
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'lastName',
        label: 'Last name',
        value: 'Default',
        required: true,
        order: 2
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 3
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
