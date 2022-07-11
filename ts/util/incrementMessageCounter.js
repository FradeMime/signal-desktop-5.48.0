var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var incrementMessageCounter_exports = {};
__export(incrementMessageCounter_exports, {
  flushMessageCounter: () => flushMessageCounter,
  incrementMessageCounter: () => incrementMessageCounter,
  initializeMessageCounter: () => initializeMessageCounter
});
module.exports = __toCommonJS(incrementMessageCounter_exports);
var import_lodash = require("lodash");
var import_assert = require("./assert");
var import_Client = __toESM(require("../sql/Client"));
var log = __toESM(require("../logging/log"));
let receivedAtCounter;
async function initializeMessageCounter() {
  (0, import_assert.strictAssert)(receivedAtCounter === void 0, "incrementMessageCounter: already initialized");
  const storedCounter = Number(localStorage.getItem("lastReceivedAtCounter"));
  const dbCounter = await import_Client.default.getMaxMessageCounter();
  if ((0, import_lodash.isNumber)(dbCounter) && (0, import_lodash.isNumber)(storedCounter)) {
    log.info("initializeMessageCounter: picking max of db/stored counters");
    receivedAtCounter = Math.max(dbCounter, storedCounter);
    if (receivedAtCounter !== storedCounter) {
      log.warn("initializeMessageCounter: mismatch between db/stored counters");
    }
  } else if ((0, import_lodash.isNumber)(storedCounter)) {
    log.info("initializeMessageCounter: picking stored counter");
    receivedAtCounter = storedCounter;
  } else if ((0, import_lodash.isNumber)(dbCounter)) {
    log.info("initializeMessageCounter: picking fallback counter from the database");
    receivedAtCounter = dbCounter;
  } else {
    log.info("initializeMessageCounter: defaulting to Date.now()");
    receivedAtCounter = Date.now();
  }
  if (storedCounter !== receivedAtCounter) {
    localStorage.setItem("lastReceivedAtCounter", String(receivedAtCounter));
  }
}
function incrementMessageCounter() {
  (0, import_assert.strictAssert)(receivedAtCounter !== void 0, "incrementMessageCounter: not initialized");
  receivedAtCounter += 1;
  debouncedUpdateLastReceivedAt();
  return receivedAtCounter;
}
function flushMessageCounter() {
  debouncedUpdateLastReceivedAt.flush();
}
const debouncedUpdateLastReceivedAt = (0, import_lodash.debounce)(() => {
  localStorage.setItem("lastReceivedAtCounter", String(receivedAtCounter));
}, 25, {
  maxWait: 25
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  flushMessageCounter,
  incrementMessageCounter,
  initializeMessageCounter
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaW5jcmVtZW50TWVzc2FnZUNvdW50ZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgZGVib3VuY2UsIGlzTnVtYmVyIH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi9hc3NlcnQnO1xuaW1wb3J0IERhdGEgZnJvbSAnLi4vc3FsL0NsaWVudCc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuXG5sZXQgcmVjZWl2ZWRBdENvdW50ZXI6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemVNZXNzYWdlQ291bnRlcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgc3RyaWN0QXNzZXJ0KFxuICAgIHJlY2VpdmVkQXRDb3VudGVyID09PSB1bmRlZmluZWQsXG4gICAgJ2luY3JlbWVudE1lc3NhZ2VDb3VudGVyOiBhbHJlYWR5IGluaXRpYWxpemVkJ1xuICApO1xuXG4gIGNvbnN0IHN0b3JlZENvdW50ZXIgPSBOdW1iZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhc3RSZWNlaXZlZEF0Q291bnRlcicpKTtcbiAgY29uc3QgZGJDb3VudGVyID0gYXdhaXQgRGF0YS5nZXRNYXhNZXNzYWdlQ291bnRlcigpO1xuXG4gIGlmIChpc051bWJlcihkYkNvdW50ZXIpICYmIGlzTnVtYmVyKHN0b3JlZENvdW50ZXIpKSB7XG4gICAgbG9nLmluZm8oJ2luaXRpYWxpemVNZXNzYWdlQ291bnRlcjogcGlja2luZyBtYXggb2YgZGIvc3RvcmVkIGNvdW50ZXJzJyk7XG4gICAgcmVjZWl2ZWRBdENvdW50ZXIgPSBNYXRoLm1heChkYkNvdW50ZXIsIHN0b3JlZENvdW50ZXIpO1xuXG4gICAgaWYgKHJlY2VpdmVkQXRDb3VudGVyICE9PSBzdG9yZWRDb3VudGVyKSB7XG4gICAgICBsb2cud2FybignaW5pdGlhbGl6ZU1lc3NhZ2VDb3VudGVyOiBtaXNtYXRjaCBiZXR3ZWVuIGRiL3N0b3JlZCBjb3VudGVycycpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc051bWJlcihzdG9yZWRDb3VudGVyKSkge1xuICAgIGxvZy5pbmZvKCdpbml0aWFsaXplTWVzc2FnZUNvdW50ZXI6IHBpY2tpbmcgc3RvcmVkIGNvdW50ZXInKTtcbiAgICByZWNlaXZlZEF0Q291bnRlciA9IHN0b3JlZENvdW50ZXI7XG4gIH0gZWxzZSBpZiAoaXNOdW1iZXIoZGJDb3VudGVyKSkge1xuICAgIGxvZy5pbmZvKFxuICAgICAgJ2luaXRpYWxpemVNZXNzYWdlQ291bnRlcjogcGlja2luZyBmYWxsYmFjayBjb3VudGVyIGZyb20gdGhlIGRhdGFiYXNlJ1xuICAgICk7XG4gICAgcmVjZWl2ZWRBdENvdW50ZXIgPSBkYkNvdW50ZXI7XG4gIH0gZWxzZSB7XG4gICAgbG9nLmluZm8oJ2luaXRpYWxpemVNZXNzYWdlQ291bnRlcjogZGVmYXVsdGluZyB0byBEYXRlLm5vdygpJyk7XG4gICAgcmVjZWl2ZWRBdENvdW50ZXIgPSBEYXRlLm5vdygpO1xuICB9XG5cbiAgaWYgKHN0b3JlZENvdW50ZXIgIT09IHJlY2VpdmVkQXRDb3VudGVyKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhc3RSZWNlaXZlZEF0Q291bnRlcicsIFN0cmluZyhyZWNlaXZlZEF0Q291bnRlcikpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmNyZW1lbnRNZXNzYWdlQ291bnRlcigpOiBudW1iZXIge1xuICBzdHJpY3RBc3NlcnQoXG4gICAgcmVjZWl2ZWRBdENvdW50ZXIgIT09IHVuZGVmaW5lZCxcbiAgICAnaW5jcmVtZW50TWVzc2FnZUNvdW50ZXI6IG5vdCBpbml0aWFsaXplZCdcbiAgKTtcblxuICByZWNlaXZlZEF0Q291bnRlciArPSAxO1xuICBkZWJvdW5jZWRVcGRhdGVMYXN0UmVjZWl2ZWRBdCgpO1xuXG4gIHJldHVybiByZWNlaXZlZEF0Q291bnRlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsdXNoTWVzc2FnZUNvdW50ZXIoKTogdm9pZCB7XG4gIGRlYm91bmNlZFVwZGF0ZUxhc3RSZWNlaXZlZEF0LmZsdXNoKCk7XG59XG5cbmNvbnN0IGRlYm91bmNlZFVwZGF0ZUxhc3RSZWNlaXZlZEF0ID0gZGVib3VuY2UoXG4gICgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGFzdFJlY2VpdmVkQXRDb3VudGVyJywgU3RyaW5nKHJlY2VpdmVkQXRDb3VudGVyKSk7XG4gIH0sXG4gIDI1LFxuICB7XG4gICAgbWF4V2FpdDogMjUsXG4gIH1cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUFtQztBQUVuQyxvQkFBNkI7QUFDN0Isb0JBQWlCO0FBQ2pCLFVBQXFCO0FBRXJCLElBQUk7QUFFSiwwQ0FBZ0U7QUFDOUQsa0NBQ0Usc0JBQXNCLFFBQ3RCLDhDQUNGO0FBRUEsUUFBTSxnQkFBZ0IsT0FBTyxhQUFhLFFBQVEsdUJBQXVCLENBQUM7QUFDMUUsUUFBTSxZQUFZLE1BQU0sc0JBQUsscUJBQXFCO0FBRWxELE1BQUksNEJBQVMsU0FBUyxLQUFLLDRCQUFTLGFBQWEsR0FBRztBQUNsRCxRQUFJLEtBQUssNkRBQTZEO0FBQ3RFLHdCQUFvQixLQUFLLElBQUksV0FBVyxhQUFhO0FBRXJELFFBQUksc0JBQXNCLGVBQWU7QUFDdkMsVUFBSSxLQUFLLCtEQUErRDtBQUFBLElBQzFFO0FBQUEsRUFDRixXQUFXLDRCQUFTLGFBQWEsR0FBRztBQUNsQyxRQUFJLEtBQUssa0RBQWtEO0FBQzNELHdCQUFvQjtBQUFBLEVBQ3RCLFdBQVcsNEJBQVMsU0FBUyxHQUFHO0FBQzlCLFFBQUksS0FDRixzRUFDRjtBQUNBLHdCQUFvQjtBQUFBLEVBQ3RCLE9BQU87QUFDTCxRQUFJLEtBQUssb0RBQW9EO0FBQzdELHdCQUFvQixLQUFLLElBQUk7QUFBQSxFQUMvQjtBQUVBLE1BQUksa0JBQWtCLG1CQUFtQjtBQUN2QyxpQkFBYSxRQUFRLHlCQUF5QixPQUFPLGlCQUFpQixDQUFDO0FBQUEsRUFDekU7QUFDRjtBQWhDc0IsQUFrQ2YsbUNBQTJDO0FBQ2hELGtDQUNFLHNCQUFzQixRQUN0QiwwQ0FDRjtBQUVBLHVCQUFxQjtBQUNyQixnQ0FBOEI7QUFFOUIsU0FBTztBQUNUO0FBVmdCLEFBWVQsK0JBQXFDO0FBQzFDLGdDQUE4QixNQUFNO0FBQ3RDO0FBRmdCLEFBSWhCLE1BQU0sZ0NBQWdDLDRCQUNwQyxNQUFNO0FBQ0osZUFBYSxRQUFRLHlCQUF5QixPQUFPLGlCQUFpQixDQUFDO0FBQ3pFLEdBQ0EsSUFDQTtBQUFBLEVBQ0UsU0FBUztBQUNYLENBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
