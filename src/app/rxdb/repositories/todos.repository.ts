import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ToDo } from "../models/ToDo.model";
import { DatabaseProvider } from "../rxdb-create";

@Injectable()
export class ToDosRepository {
    constructor(private dbProvider: DatabaseProvider) { }

    public getAllJobs$(): Observable<ToDo[]> {
        return this.dbProvider.get().todos.find().$;
    }
}