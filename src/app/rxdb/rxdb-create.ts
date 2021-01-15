import { createRxDatabase } from 'rxdb';
const db = await createRxDatabase({
  name: 'todos_db',           // <- name
  adapter: 'idb',          // <- storage-adapter
  password: 'test',     // <- password (optional)
  multiInstance: true,         // <- multiInstance (optional, default: true)
  eventReduce: false // <- eventReduce (optional, default: true)
});
console.dir(db);