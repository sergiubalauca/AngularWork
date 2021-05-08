import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { Observable } from 'rxjs';
import { QuestionBase } from '../datamine/dynamic-form/question-base';
import { QuestionService } from '../datamine/dynamic-form/services/question.service';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit {

  constructor(
    private http: HttpClient,
    service: QuestionService) {
    this.questions$ = service.getQuestions();
  }

  questions$: Observable<QuestionBase<any>[]>;

  ngOnInit(): void {
    this.triggerPromise();
    this.triggerSomeMethod();
  }

  private triggerPromise() {
    const momsPromise = new Promise((resolve, reject) => {
      const momsSavings = 30000;
      const priceOfPhone = 20000;

      if (momsSavings > priceOfPhone) {
        resolve({
          brand: 'iphone',
          model: '6s'
        });
      } else {
        reject('We donot have enough savings. Let us save some more money.');
      }
    });
    momsPromise.then((value) => {
      console.log('Hurray I got this phone as a gift ', JSON.stringify(value));
    });
    momsPromise.catch((reason) => {
      console.log(`Mom coudn't buy me the phone because `, reason);
    });
    momsPromise.finally(() => {
      console.log(
        'Irrespecitve of whether my mom can buy me a phone or not, I still love her'
      );
    });
  }

  private someMethod(element, index, array) {
    let res: boolean;
    res = element >= 10;
    return res;
  }

  private triggerSomeMethod() {
    var retval = [2, 5, 8, 1, 4].some(this.someMethod);
    console.log('Returned value1 is : ' + retval);

    var retval = [12, 5, 8, 1, 4].some(this.someMethod);
    console.log('Returned value2 is : ' + retval);
  }
}
