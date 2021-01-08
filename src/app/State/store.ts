import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import { IEmployee } from "../employee";
import { ToDo } from "../ToDo";


export interface ToDoState{
    todos:ToDo[];
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