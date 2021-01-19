import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ToDo } from "../models/ToDo.model";
import { DatabaseProvider } from "../rxdb-create";

@Injectable()
export class ToDosRepository {
    constructor(private dbProvider: DatabaseProvider) { }

    

    // public getAllJobs$(): Observable<ToDo[]> {
    //     // return this.dbProvider.get().todos.find().$;
    //     // this.dbProvider.get().collections.$.subscribe(changeEvent => console.dir(changeEvent));
        
       
    //     // console.log(this.todoColl);
    //     // return this.todoColl.find().$;

    //     // return this.dbProvider.get().collections.todos.find().$;
    // }

    public async insertToDo() {
        // const todo = this.dbProvider.get().collections;
        

        this.dbProvider.createDB();
        
        const todoColl = this.dbProvider.getCollection();
        console.log("Before inserting stuff in rxdb --- " + todoColl);
        console.log("Inserting stuff in rxdb");
        const todoDoc = await todoColl.insert([{
            id: 123,
            employeeID: 439,
            title: 'Inserted title',
            description: 'Inserted description',
            status: ['open']
        }])
    }
}