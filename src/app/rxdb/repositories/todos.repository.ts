import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ToDo } from "../models/ToDo.model";
import { DatabaseProvider } from "../DatabaseProvider";

@Injectable()
export class ToDosRepository {
    constructor(private dbProvider: DatabaseProvider) { }

    public getAllToDos$(): Observable<ToDo[]> {
        const dbColl = this.dbProvider.getCollection().find().$;
        // this.dbProvider.get().collections.$.subscribe(changeEvent => console.dir(changeEvent));


        dbColl.subscribe(res => console.log(res));
        return dbColl;
        // return this.dbProvider.get().collections.todos.find().$;
    }

    public getAllToDos() {
        const dbColl = this.dbProvider.getCollection().find();
        // this.dbProvider.get().collections.$.subscribe(changeEvent => console.dir(changeEvent));


        console.log(dbColl);
        // return dbColl.exec;
        // return this.dbProvider.get().collections.todos.find().$;
    }

    public async insertToDo(rxToDo: ToDo[]) {
        // const todo = this.dbProvider.get().collections;
        // let todoID = new Date().getTime().toString();

        
        // const ToDoItem: ToDo[] = [{
        //     id: todoID,
        //     employeeID: 439,
        //     title: 'Inserted title',
        //     description: 'Inserted description',
        //     status: 'open'
        // },
        // {
        //     id: todoID,
        //     employeeID: 439,
        //     title: 'Inserted title2',
        //     description: 'Inserted description2',
        //     status: 'open'
        // }
        // ]

        // this.dbProvider.createDB();

        const todoColl = this.dbProvider.getCollection();
        console.log("Inserting stuff in rxdb");
        const todoDoc = await todoColl.bulkInsert(rxToDo)
        return todoColl;
    }
}