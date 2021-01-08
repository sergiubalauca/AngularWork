import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import { IEmployee } from "../employee";


export interface ToDoState{
    todos:IEmployee[];
    isLoaded:boolean;
}

/* Set the initial state */
export const getInitialState = () => {
    return{
        todos:[],
        isLoaded: false
    }
}

/* Create the store */
@Injectable({providedIn: 'root'})
@StoreConfig({name: 'todo'})
export class ToDoStore extends Store<ToDoState>{
    constructor(){
        super(getInitialState());
    }
}