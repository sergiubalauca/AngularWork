import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: '[app-test]', /* or with .app-test as a class an you use it with div class = "app-test in" */
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public name = "Sergiu";
  public myId = "testId";
  public isDisabled = true;
  public specialClass = "text-special";
  public hasError = false;
  public isSpecial = true;
  public greeting = "";
  /* Two way binding used -  ngModule in the view - banana in a box :D and imported forms in app.module.ts */
  public inputName = "";
  public showDirective = false; 
  public color = "";
  public colors = ["red", "blue", "green", "yellow"]
  public colorArray = [];
  public Person = {
    "firstname":"Sergiu",
    "lastname":"Balauca"
  }
  public date = new Date();

  /* Component interaction - send data TO the child to app.component.ts by using the input decorator
   * FROM THE CHILD TO THE PARENT - by using EVENTS!!!
   * Also imported it above in the import section.
   */
  @Input('parentData') public dataFromParent; // variable defined with alias;
  
  /* Data from child to parent - a bit more tricky, because I don't have the parent selector to use so easily <div parent...> */
  @Output()
  public childEvent = new EventEmitter();

  public messageClasses = {
    "text-succes":!this.hasError,
    "text-danger":this.hasError,
    "text-special":this.isSpecial
  }

  constructor() { }

  ngOnInit(): void {
  }

  onClick($event){
    console.log(event);
    this.greeting = this.greetUser();
  }

  greetUser(){
    return "Hello to you, user with name: " + this.name.toUpperCase() + " " + this.Person["lastname"].toUpperCase();
  }

  logMessage(value){
    console.log(value);
  }

  processShowDirective(inputName)
  {
    if (inputName != "")
      this.showDirective = true;
    else this.showDirective = false;

    return this.showDirective;
  }

  processSwitch(inputName){
    switch(inputName) { 
      case "red": { 
         this.color = "red";
         break; 
      } 
      case "blue": { 
         this.color = "blue";
         break; 
      } 
      case "green": { 
        this.color = "green"; 
        break; 
     } 
      default: { 
         this.color = "";
         break; 
      } 
   } 

  }

  processColors(inputName){
    this.colors.forEach(element => {
      if (element === inputName){
        this.colorArray[0] = element;
        this.colorArray[1] = element;
      }
    });
  }

  fireEvent(){
    this.childEvent.emit("Hello, from child!");
  }
}
