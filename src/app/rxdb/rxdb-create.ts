import { Injectable } from '@angular/core';
import { addRxPlugin, createRxDatabase, RxCollection, RxDatabase, removeRxDatabase } from 'rxdb';
import { rxdb, RxDBKeyCompressionPlugin } from 'rxdb/dist/types/plugins/key-compression';
import { map } from 'rxjs/operators';
import { RxDBContext } from './models/RxDB.db-context';
import { ToDo } from './models/ToDo.model';
import toDoSchema from './schemas/todo.schema';



@Injectable()
export class DatabaseProvider {

  private database: RxDatabase/*<RxDBContext>*/;
  private dbCollection: RxCollection<ToDo[]>;

  public getDatabase() {
    return this.database;
  }

  public getCollection() {
    this.dbCollection = this.database.todoscollection;
    return this.dbCollection;
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
    // first remove the database in case there is a change in the schema. For prod mode, just change the version on the schema
    // removeRxDatabase('myrxdb', 'adapter');
    if (this.getDatabase())
      return;

    addRxPlugin(require('pouchdb-adapter-idb'));
    console.log("creating rxdb...");
    try {
      this.database = await createRxDatabase({
        name: 'myrxdb2',           // <- name
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

    this.addDBCollection()

    return this.database;
  }

  async addDBCollection() {
    console.log("creating collection ...");
    if (this.getCollection()) {
      console.log("collection already exist...");
      return;
    }
    const myCollection = await this.database.addCollections({
      todoscollection: {
        schema: toDoSchema,
        migrationStrategies: {
          // 1 means, this transforms data from version 0 to version 1
          // 1: function (oldDoc) {
          //   //oldDoc.properties = "";  //new Date(oldDoc.time).getTime(); // string to unix
          //   return oldDoc;
          // },
          // 2: function (oldDoc) {
          //   //oldDoc.properties = "";  //new Date(oldDoc.time).getTime(); // string to unix
          //   return oldDoc;
          // }
        }
      }
    });
    // console.log("Collection from rxdb-create: " + myCollection.todos.$.subscribe(res => console.log(res.collectionName)));
    console.log("Created collection!");


    return myCollection;
  }


  async insertIntoDB(collectionName: RxCollection) {
    console.log("Inserting into db...");
    const doc = await collectionName.insert({
      employeeID: 439,
      title: 'RxDBtitle',
      description: 'RxDBdescription',
      status: 'open'
    });

    return doc;
  }

}