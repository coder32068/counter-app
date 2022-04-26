import { Dexie } from "dexie";
export const db = new Dexie("StoreDB");
db.version(1).stores({
  counter: "++id,name,color,currCount,created,lastUpdated",
});

window.db = db;
