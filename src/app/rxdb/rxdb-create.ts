import { Injectable } from '@angular/core';
import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb';
import { RxDBContext } from './models/RxDB.db-context';
import toDoSchema from './todo.schema';



@Injectable()
export class DatabaseProvider {

  private database: RxDatabase<RxDBContext>;

  public get() {
    return this.database;
  }

  constructor() { }

  public async clearDatabase(): Promise<void> {
    if (this.database) {
      await this.database.requestIdlePromise();
      await this.database.remove();
      this.database = null;
      await this.createDB();
    }
  }

  public async createDB() {
    // addRxPlugin(require('pouchdb-adapter-idb'));
    try {
      this.database = await createRxDatabase({
        name: 'myRxDB',           // <- name
        adapter: 'idb',          // <- storage-adapter
        // password: 'test',     // <- password (optional)
        multiInstance: true,         // <- multiInstance (optional, default: true)
        eventReduce: false // <- eventReduce (optional, default: true)
      })/*.then((dbInstance) => {
        console.log("End of promise --- ");
        return dbInstance.todo;
      })*/

      /* With this dump I will know everything that happends in the DB */
      this.database.dump().then(console.log);
    }
    catch (error) {
      console.error(error);
    }

    await this.database.addCollections({
      todos: {
        schema: toDoSchema
      }
    });

    return this.database;
  }
}