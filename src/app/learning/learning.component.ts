import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit {

  constructor(private http: HttpClient) { }
  public googleTrendsRes: any;

  ngOnInit(): void {
    this.triggerPromise();
    this.triggerSomeMethod();
    this.getAll();
  }

  getAll() {
    return this.http.get(`${'http://localhost:4000'}/googleTrends/googletrends`)
      .subscribe(res => {
        console.log(res);
        this.googleTrendsRes = res;
      });
  }

  private triggerPromise() {
    var momsPromise = new Promise(function (resolve, reject) {
      let momsSavings = 30000;
      let priceOfPhone = 20000;

      if (momsSavings > priceOfPhone) {
        resolve({
          brand: "iphone",
          model: "6s"
        });
      } else {
        reject("We donot have enough savings. Let us save some more money.");
      }
    });
    momsPromise.then(function (value) {
      console.log("Hurray I got this phone as a gift ", JSON.stringify(value));
    });
    momsPromise.catch(function (reason) {
      console.log("Mom coudn't buy me the phone because ", reason);
    });
    momsPromise.finally(function () {
      console.log(
        "Irrespecitve of whether my mom can buy me a phone or not, I still love her"
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
    console.log("Returned value1 is : " + retval);

    var retval = [12, 5, 8, 1, 4].some(this.someMethod);
    console.log("Returned value2 is : " + retval);
  }
}
