var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var util_exports = {};
__export(util_exports, {
  TableIterator: () => TableIterator,
  batchMultiVarQuery: () => batchMultiVarQuery,
  bulkAdd: () => bulkAdd,
  createOrUpdate: () => createOrUpdate,
  getAllFromTable: () => getAllFromTable,
  getById: () => getById,
  getCountFromTable: () => getCountFromTable,
  getSQLCipherVersion: () => getSQLCipherVersion,
  getSQLiteVersion: () => getSQLiteVersion,
  getSchemaVersion: () => getSchemaVersion,
  getUserVersion: () => getUserVersion,
  jsonToObject: () => jsonToObject,
  objectToJSON: () => objectToJSON,
  removeAllFromTable: () => removeAllFromTable,
  removeById: () => removeById,
  setUserVersion: () => setUserVersion
});
module.exports = __toCommonJS(util_exports);
var import_lodash = require("lodash");
const MAX_VARIABLE_COUNT = 100;
function objectToJSON(data) {
  return JSON.stringify(data);
}
function jsonToObject(json) {
  return JSON.parse(json);
}
function getSQLiteVersion(db) {
  const { sqlite_version: version } = db.prepare("select sqlite_version() AS sqlite_version").get();
  return version;
}
function getSchemaVersion(db) {
  return db.pragma("schema_version", { simple: true });
}
function setUserVersion(db, version) {
  if (!(0, import_lodash.isNumber)(version)) {
    throw new Error(`setUserVersion: version ${version} is not a number`);
  }
  db.pragma(`user_version = ${version}`);
}
function getUserVersion(db) {
  return db.pragma("user_version", { simple: true });
}
function getSQLCipherVersion(db) {
  return db.pragma("cipher_version", { simple: true });
}
function batchMultiVarQuery(db, values, query) {
  if (values.length > MAX_VARIABLE_COUNT) {
    const result2 = [];
    db.transaction(() => {
      for (let i = 0; i < values.length; i += MAX_VARIABLE_COUNT) {
        const batch = values.slice(i, i + MAX_VARIABLE_COUNT);
        const batchResult = query(batch);
        if (Array.isArray(batchResult)) {
          result2.push(...batchResult);
        }
      }
    })();
    return result2;
  }
  const result = query(values);
  return Array.isArray(result) ? result : [];
}
function createOrUpdate(db, table, data) {
  const { id } = data;
  if (!id) {
    throw new Error("createOrUpdate: Provided data did not have a truthy id");
  }
  db.prepare(`
    INSERT OR REPLACE INTO ${table} (
      id,
      json
    ) values (
      $id,
      $json
    )
    `).run({
    id,
    json: objectToJSON(data)
  });
}
function bulkAdd(db, table, array) {
  db.transaction(() => {
    for (const data of array) {
      createOrUpdate(db, table, data);
    }
  })();
}
function getById(db, table, id) {
  const row = db.prepare(`
      SELECT *
      FROM ${table}
      WHERE id = $id;
      `).get({
    id
  });
  if (!row) {
    return void 0;
  }
  return jsonToObject(row.json);
}
function removeById(db, table, id) {
  if (!Array.isArray(id)) {
    db.prepare(`
      DELETE FROM ${table}
      WHERE id = $id;
      `).run({ id });
    return;
  }
  if (!id.length) {
    throw new Error("removeById: No ids to delete!");
  }
  const removeByIdsSync = /* @__PURE__ */ __name((ids) => {
    db.prepare(`
      DELETE FROM ${table}
      WHERE id IN ( ${id.map(() => "?").join(", ")} );
      `).run(ids);
  }, "removeByIdsSync");
  batchMultiVarQuery(db, id, removeByIdsSync);
}
function removeAllFromTable(db, table) {
  db.prepare(`DELETE FROM ${table};`).run();
}
function getAllFromTable(db, table) {
  const rows = db.prepare(`SELECT json FROM ${table};`).all();
  return rows.map((row) => jsonToObject(row.json));
}
function getCountFromTable(db, table) {
  const result = db.prepare(`SELECT count(*) from ${table};`).pluck(true).get();
  if ((0, import_lodash.isNumber)(result)) {
    return result;
  }
  throw new Error(`getCountFromTable: Unable to get count from table ${table}`);
}
class TableIterator {
  constructor(db, table, pageSize = 500) {
    this.db = db;
    this.table = table;
    this.pageSize = pageSize;
  }
  *[Symbol.iterator]() {
    const fetchObject = this.db.prepare(`
        SELECT json FROM ${this.table}
        WHERE id > $id
        ORDER BY id ASC
        LIMIT $pageSize;
      `);
    let complete = false;
    let id = "";
    while (!complete) {
      const rows = fetchObject.all({
        id,
        pageSize: this.pageSize
      });
      const messages = rows.map((row) => jsonToObject(row.json));
      yield* messages;
      const lastMessage = (0, import_lodash.last)(messages);
      if (lastMessage) {
        ({ id } = lastMessage);
      }
      complete = messages.length < this.pageSize;
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TableIterator,
  batchMultiVarQuery,
  bulkAdd,
  createOrUpdate,
  getAllFromTable,
  getById,
  getCountFromTable,
  getSQLCipherVersion,
  getSQLiteVersion,
  getSchemaVersion,
  getUserVersion,
  jsonToObject,
  objectToJSON,
  removeAllFromTable,
  removeById,
  setUserVersion
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXRpbC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IERhdGFiYXNlIH0gZnJvbSAnYmV0dGVyLXNxbGl0ZTMnO1xuaW1wb3J0IHsgaXNOdW1iZXIsIGxhc3QgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgdHlwZSBFbXB0eVF1ZXJ5ID0gW107XG5leHBvcnQgdHlwZSBBcnJheVF1ZXJ5ID0gQXJyYXk8QXJyYXk8bnVsbCB8IG51bWJlciB8IGJpZ2ludCB8IHN0cmluZz4+O1xuZXhwb3J0IHR5cGUgUXVlcnkgPSB7IFtrZXk6IHN0cmluZ106IG51bGwgfCBudW1iZXIgfCBiaWdpbnQgfCBzdHJpbmcgfCBCdWZmZXIgfTtcbmV4cG9ydCB0eXBlIEpTT05Sb3dzID0gQXJyYXk8eyByZWFkb25seSBqc29uOiBzdHJpbmcgfT47XG5cbmV4cG9ydCB0eXBlIFRhYmxlVHlwZSA9XG4gIHwgJ2F0dGFjaG1lbnRfZG93bmxvYWRzJ1xuICB8ICdjb252ZXJzYXRpb25zJ1xuICB8ICdpZGVudGl0eUtleXMnXG4gIHwgJ2l0ZW1zJ1xuICB8ICdtZXNzYWdlcydcbiAgfCAncHJlS2V5cydcbiAgfCAnc2VuZGVyS2V5cydcbiAgfCAnc2Vzc2lvbnMnXG4gIHwgJ3NpZ25lZFByZUtleXMnXG4gIHwgJ3N0aWNrZXJzJ1xuICB8ICd1bnByb2Nlc3NlZCc7XG5cbi8vIFRoaXMgdmFsdWUgbmVlZHMgdG8gYmUgYmVsb3cgU1FMSVRFX01BWF9WQVJJQUJMRV9OVU1CRVIuXG5jb25zdCBNQVhfVkFSSUFCTEVfQ09VTlQgPSAxMDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RUb0pTT048VD4oZGF0YTogVCk6IHN0cmluZyB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGpzb25Ub09iamVjdDxUPihqc29uOiBzdHJpbmcpOiBUIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoanNvbik7XG59XG5cbi8vXG4vLyBEYXRhYmFzZSBoZWxwZXJzXG4vL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U1FMaXRlVmVyc2lvbihkYjogRGF0YWJhc2UpOiBzdHJpbmcge1xuICBjb25zdCB7IHNxbGl0ZV92ZXJzaW9uOiB2ZXJzaW9uIH0gPSBkYlxuICAgIC5wcmVwYXJlPEVtcHR5UXVlcnk+KCdzZWxlY3Qgc3FsaXRlX3ZlcnNpb24oKSBBUyBzcWxpdGVfdmVyc2lvbicpXG4gICAgLmdldCgpO1xuXG4gIHJldHVybiB2ZXJzaW9uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NoZW1hVmVyc2lvbihkYjogRGF0YWJhc2UpOiBudW1iZXIge1xuICByZXR1cm4gZGIucHJhZ21hKCdzY2hlbWFfdmVyc2lvbicsIHsgc2ltcGxlOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VXNlclZlcnNpb24oZGI6IERhdGFiYXNlLCB2ZXJzaW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgaWYgKCFpc051bWJlcih2ZXJzaW9uKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgc2V0VXNlclZlcnNpb246IHZlcnNpb24gJHt2ZXJzaW9ufSBpcyBub3QgYSBudW1iZXJgKTtcbiAgfVxuICBkYi5wcmFnbWEoYHVzZXJfdmVyc2lvbiA9ICR7dmVyc2lvbn1gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJWZXJzaW9uKGRiOiBEYXRhYmFzZSk6IG51bWJlciB7XG4gIHJldHVybiBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbicsIHsgc2ltcGxlOiB0cnVlIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U1FMQ2lwaGVyVmVyc2lvbihkYjogRGF0YWJhc2UpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICByZXR1cm4gZGIucHJhZ21hKCdjaXBoZXJfdmVyc2lvbicsIHsgc2ltcGxlOiB0cnVlIH0pO1xufVxuXG4vL1xuLy8gVmFyaW91cyB0YWJsZSBoZWxwZXJzXG4vL1xuXG5leHBvcnQgZnVuY3Rpb24gYmF0Y2hNdWx0aVZhclF1ZXJ5PFZhbHVlVD4oXG4gIGRiOiBEYXRhYmFzZSxcbiAgdmFsdWVzOiBBcnJheTxWYWx1ZVQ+LFxuICBxdWVyeTogKGJhdGNoOiBBcnJheTxWYWx1ZVQ+KSA9PiB2b2lkXG4pOiBbXTtcbmV4cG9ydCBmdW5jdGlvbiBiYXRjaE11bHRpVmFyUXVlcnk8VmFsdWVULCBSZXN1bHRUPihcbiAgZGI6IERhdGFiYXNlLFxuICB2YWx1ZXM6IEFycmF5PFZhbHVlVD4sXG4gIHF1ZXJ5OiAoYmF0Y2g6IEFycmF5PFZhbHVlVD4pID0+IEFycmF5PFJlc3VsdFQ+XG4pOiBBcnJheTxSZXN1bHRUPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGJhdGNoTXVsdGlWYXJRdWVyeTxWYWx1ZVQsIFJlc3VsdFQ+KFxuICBkYjogRGF0YWJhc2UsXG4gIHZhbHVlczogQXJyYXk8VmFsdWVUPixcbiAgcXVlcnk6XG4gICAgfCAoKGJhdGNoOiBBcnJheTxWYWx1ZVQ+KSA9PiB2b2lkKVxuICAgIHwgKChiYXRjaDogQXJyYXk8VmFsdWVUPikgPT4gQXJyYXk8UmVzdWx0VD4pXG4pOiBBcnJheTxSZXN1bHRUPiB7XG4gIGlmICh2YWx1ZXMubGVuZ3RoID4gTUFYX1ZBUklBQkxFX0NPVU5UKSB7XG4gICAgY29uc3QgcmVzdWx0OiBBcnJheTxSZXN1bHRUPiA9IFtdO1xuICAgIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSBNQVhfVkFSSUFCTEVfQ09VTlQpIHtcbiAgICAgICAgY29uc3QgYmF0Y2ggPSB2YWx1ZXMuc2xpY2UoaSwgaSArIE1BWF9WQVJJQUJMRV9DT1VOVCk7XG4gICAgICAgIGNvbnN0IGJhdGNoUmVzdWx0ID0gcXVlcnkoYmF0Y2gpO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShiYXRjaFJlc3VsdCkpIHtcbiAgICAgICAgICByZXN1bHQucHVzaCguLi5iYXRjaFJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KSgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBxdWVyeSh2YWx1ZXMpO1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShyZXN1bHQpID8gcmVzdWx0IDogW107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPclVwZGF0ZTxLZXkgZXh0ZW5kcyBzdHJpbmcgfCBudW1iZXI+KFxuICBkYjogRGF0YWJhc2UsXG4gIHRhYmxlOiBUYWJsZVR5cGUsXG4gIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ICYgeyBpZDogS2V5IH1cbik6IHZvaWQge1xuICBjb25zdCB7IGlkIH0gPSBkYXRhO1xuICBpZiAoIWlkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjcmVhdGVPclVwZGF0ZTogUHJvdmlkZWQgZGF0YSBkaWQgbm90IGhhdmUgYSB0cnV0aHkgaWQnKTtcbiAgfVxuXG4gIGRiLnByZXBhcmU8UXVlcnk+KFxuICAgIGBcbiAgICBJTlNFUlQgT1IgUkVQTEFDRSBJTlRPICR7dGFibGV9IChcbiAgICAgIGlkLFxuICAgICAganNvblxuICAgICkgdmFsdWVzIChcbiAgICAgICRpZCxcbiAgICAgICRqc29uXG4gICAgKVxuICAgIGBcbiAgKS5ydW4oe1xuICAgIGlkLFxuICAgIGpzb246IG9iamVjdFRvSlNPTihkYXRhKSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWxrQWRkKFxuICBkYjogRGF0YWJhc2UsXG4gIHRhYmxlOiBUYWJsZVR5cGUsXG4gIGFycmF5OiBBcnJheTxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiAmIHsgaWQ6IHN0cmluZyB8IG51bWJlciB9PlxuKTogdm9pZCB7XG4gIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBmb3IgKGNvbnN0IGRhdGEgb2YgYXJyYXkpIHtcbiAgICAgIGNyZWF0ZU9yVXBkYXRlKGRiLCB0YWJsZSwgZGF0YSk7XG4gICAgfVxuICB9KSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QnlJZDxLZXkgZXh0ZW5kcyBzdHJpbmcgfCBudW1iZXIsIFJlc3VsdCA9IHVua25vd24+KFxuICBkYjogRGF0YWJhc2UsXG4gIHRhYmxlOiBUYWJsZVR5cGUsXG4gIGlkOiBLZXlcbik6IFJlc3VsdCB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IHJvdyA9IGRiXG4gICAgLnByZXBhcmU8UXVlcnk+KFxuICAgICAgYFxuICAgICAgU0VMRUNUICpcbiAgICAgIEZST00gJHt0YWJsZX1cbiAgICAgIFdIRVJFIGlkID0gJGlkO1xuICAgICAgYFxuICAgIClcbiAgICAuZ2V0KHtcbiAgICAgIGlkLFxuICAgIH0pO1xuXG4gIGlmICghcm93KSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiBqc29uVG9PYmplY3Qocm93Lmpzb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQnlJZDxLZXkgZXh0ZW5kcyBzdHJpbmcgfCBudW1iZXI+KFxuICBkYjogRGF0YWJhc2UsXG4gIHRhYmxlOiBUYWJsZVR5cGUsXG4gIGlkOiBLZXkgfCBBcnJheTxLZXk+XG4pOiB2b2lkIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGlkKSkge1xuICAgIGRiLnByZXBhcmU8UXVlcnk+KFxuICAgICAgYFxuICAgICAgREVMRVRFIEZST00gJHt0YWJsZX1cbiAgICAgIFdIRVJFIGlkID0gJGlkO1xuICAgICAgYFxuICAgICkucnVuKHsgaWQgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCFpZC5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3JlbW92ZUJ5SWQ6IE5vIGlkcyB0byBkZWxldGUhJyk7XG4gIH1cblxuICBjb25zdCByZW1vdmVCeUlkc1N5bmMgPSAoaWRzOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KTogdm9pZCA9PiB7XG4gICAgZGIucHJlcGFyZTxBcnJheVF1ZXJ5PihcbiAgICAgIGBcbiAgICAgIERFTEVURSBGUk9NICR7dGFibGV9XG4gICAgICBXSEVSRSBpZCBJTiAoICR7aWQubWFwKCgpID0+ICc/Jykuam9pbignLCAnKX0gKTtcbiAgICAgIGBcbiAgICApLnJ1bihpZHMpO1xuICB9O1xuXG4gIGJhdGNoTXVsdGlWYXJRdWVyeShkYiwgaWQsIHJlbW92ZUJ5SWRzU3luYyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBbGxGcm9tVGFibGUoZGI6IERhdGFiYXNlLCB0YWJsZTogVGFibGVUeXBlKTogdm9pZCB7XG4gIGRiLnByZXBhcmU8RW1wdHlRdWVyeT4oYERFTEVURSBGUk9NICR7dGFibGV9O2ApLnJ1bigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxsRnJvbVRhYmxlPFQ+KGRiOiBEYXRhYmFzZSwgdGFibGU6IFRhYmxlVHlwZSk6IEFycmF5PFQ+IHtcbiAgY29uc3Qgcm93czogSlNPTlJvd3MgPSBkYlxuICAgIC5wcmVwYXJlPEVtcHR5UXVlcnk+KGBTRUxFQ1QganNvbiBGUk9NICR7dGFibGV9O2ApXG4gICAgLmFsbCgpO1xuXG4gIHJldHVybiByb3dzLm1hcChyb3cgPT4ganNvblRvT2JqZWN0KHJvdy5qc29uKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb3VudEZyb21UYWJsZShkYjogRGF0YWJhc2UsIHRhYmxlOiBUYWJsZVR5cGUpOiBudW1iZXIge1xuICBjb25zdCByZXN1bHQ6IG51bGwgfCBudW1iZXIgPSBkYlxuICAgIC5wcmVwYXJlPEVtcHR5UXVlcnk+KGBTRUxFQ1QgY291bnQoKikgZnJvbSAke3RhYmxlfTtgKVxuICAgIC5wbHVjayh0cnVlKVxuICAgIC5nZXQoKTtcbiAgaWYgKGlzTnVtYmVyKHJlc3VsdCkpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihgZ2V0Q291bnRGcm9tVGFibGU6IFVuYWJsZSB0byBnZXQgY291bnQgZnJvbSB0YWJsZSAke3RhYmxlfWApO1xufVxuXG5leHBvcnQgY2xhc3MgVGFibGVJdGVyYXRvcjxPYmplY3RUeXBlIGV4dGVuZHMgeyBpZDogc3RyaW5nIH0+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBkYjogRGF0YWJhc2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSB0YWJsZTogVGFibGVUeXBlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcGFnZVNpemUgPSA1MDBcbiAgKSB7fVxuXG4gICpbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYXRvcjxPYmplY3RUeXBlPiB7XG4gICAgY29uc3QgZmV0Y2hPYmplY3QgPSB0aGlzLmRiLnByZXBhcmU8UXVlcnk+KFxuICAgICAgYFxuICAgICAgICBTRUxFQ1QganNvbiBGUk9NICR7dGhpcy50YWJsZX1cbiAgICAgICAgV0hFUkUgaWQgPiAkaWRcbiAgICAgICAgT1JERVIgQlkgaWQgQVNDXG4gICAgICAgIExJTUlUICRwYWdlU2l6ZTtcbiAgICAgIGBcbiAgICApO1xuXG4gICAgbGV0IGNvbXBsZXRlID0gZmFsc2U7XG4gICAgbGV0IGlkID0gJyc7XG4gICAgd2hpbGUgKCFjb21wbGV0ZSkge1xuICAgICAgY29uc3Qgcm93czogSlNPTlJvd3MgPSBmZXRjaE9iamVjdC5hbGwoe1xuICAgICAgICBpZCxcbiAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgbWVzc2FnZXM6IEFycmF5PE9iamVjdFR5cGU+ID0gcm93cy5tYXAocm93ID0+XG4gICAgICAgIGpzb25Ub09iamVjdChyb3cuanNvbilcbiAgICAgICk7XG4gICAgICB5aWVsZCogbWVzc2FnZXM7XG5cbiAgICAgIGNvbnN0IGxhc3RNZXNzYWdlOiBPYmplY3RUeXBlIHwgdW5kZWZpbmVkID0gbGFzdChtZXNzYWdlcyk7XG4gICAgICBpZiAobGFzdE1lc3NhZ2UpIHtcbiAgICAgICAgKHsgaWQgfSA9IGxhc3RNZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIGNvbXBsZXRlID0gbWVzc2FnZXMubGVuZ3RoIDwgdGhpcy5wYWdlU2l6ZTtcbiAgICB9XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxvQkFBK0I7QUFxQi9CLE1BQU0scUJBQXFCO0FBRXBCLHNCQUF5QixNQUFpQjtBQUMvQyxTQUFPLEtBQUssVUFBVSxJQUFJO0FBQzVCO0FBRmdCLEFBSVQsc0JBQXlCLE1BQWlCO0FBQy9DLFNBQU8sS0FBSyxNQUFNLElBQUk7QUFDeEI7QUFGZ0IsQUFRVCwwQkFBMEIsSUFBc0I7QUFDckQsUUFBTSxFQUFFLGdCQUFnQixZQUFZLEdBQ2pDLFFBQW9CLDJDQUEyQyxFQUMvRCxJQUFJO0FBRVAsU0FBTztBQUNUO0FBTmdCLEFBUVQsMEJBQTBCLElBQXNCO0FBQ3JELFNBQU8sR0FBRyxPQUFPLGtCQUFrQixFQUFFLFFBQVEsS0FBSyxDQUFDO0FBQ3JEO0FBRmdCLEFBSVQsd0JBQXdCLElBQWMsU0FBdUI7QUFDbEUsTUFBSSxDQUFDLDRCQUFTLE9BQU8sR0FBRztBQUN0QixVQUFNLElBQUksTUFBTSwyQkFBMkIseUJBQXlCO0FBQUEsRUFDdEU7QUFDQSxLQUFHLE9BQU8sa0JBQWtCLFNBQVM7QUFDdkM7QUFMZ0IsQUFPVCx3QkFBd0IsSUFBc0I7QUFDbkQsU0FBTyxHQUFHLE9BQU8sZ0JBQWdCLEVBQUUsUUFBUSxLQUFLLENBQUM7QUFDbkQ7QUFGZ0IsQUFJVCw2QkFBNkIsSUFBa0M7QUFDcEUsU0FBTyxHQUFHLE9BQU8sa0JBQWtCLEVBQUUsUUFBUSxLQUFLLENBQUM7QUFDckQ7QUFGZ0IsQUFtQlQsNEJBQ0wsSUFDQSxRQUNBLE9BR2dCO0FBQ2hCLE1BQUksT0FBTyxTQUFTLG9CQUFvQjtBQUN0QyxVQUFNLFVBQXlCLENB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
