var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var consoleLogger_exports = {};
__export(consoleLogger_exports, {
  consoleLogger: () => consoleLogger
});
module.exports = __toCommonJS(consoleLogger_exports);
const consoleLogger = {
  fatal(...args) {
    console.error(...args);
  },
  error(...args) {
    console.error(...args);
  },
  warn(...args) {
    console.warn(...args);
  },
  info(...args) {
    console.info(...args);
  },
  debug(...args) {
    console.debug(...args);
  },
  trace(...args) {
    console.log(...args);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  consoleLogger
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29uc29sZUxvZ2dlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi90eXBlcy9Mb2dnaW5nJztcblxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuZXhwb3J0IGNvbnN0IGNvbnNvbGVMb2dnZXI6IExvZ2dlclR5cGUgPSB7XG4gIGZhdGFsKC4uLmFyZ3M6IEFycmF5PHVua25vd24+KSB7XG4gICAgY29uc29sZS5lcnJvciguLi5hcmdzKTtcbiAgfSxcbiAgZXJyb3IoLi4uYXJnczogQXJyYXk8dW5rbm93bj4pIHtcbiAgICBjb25zb2xlLmVycm9yKC4uLmFyZ3MpO1xuICB9LFxuICB3YXJuKC4uLmFyZ3M6IEFycmF5PHVua25vd24+KSB7XG4gICAgY29uc29sZS53YXJuKC4uLmFyZ3MpO1xuICB9LFxuICBpbmZvKC4uLmFyZ3M6IEFycmF5PHVua25vd24+KSB7XG4gICAgY29uc29sZS5pbmZvKC4uLmFyZ3MpO1xuICB9LFxuICBkZWJ1ZyguLi5hcmdzOiBBcnJheTx1bmtub3duPikge1xuICAgIGNvbnNvbGUuZGVidWcoLi4uYXJncyk7XG4gIH0sXG4gIHRyYWNlKC4uLmFyZ3M6IEFycmF5PHVua25vd24+KSB7XG4gICAgY29uc29sZS5sb2coLi4uYXJncyk7XG4gIH0sXG59O1xuLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNTyxNQUFNLGdCQUE0QjtBQUFBLEVBQ3ZDLFNBQVMsTUFBc0I7QUFDN0IsWUFBUSxNQUFNLEdBQUcsSUFBSTtBQUFBLEVBQ3ZCO0FBQUEsRUFDQSxTQUFTLE1BQXNCO0FBQzdCLFlBQVEsTUFBTSxHQUFHLElBQUk7QUFBQSxFQUN2QjtBQUFBLEVBQ0EsUUFBUSxNQUFzQjtBQUM1QixZQUFRLEtBQUssR0FBRyxJQUFJO0FBQUEsRUFDdEI7QUFBQSxFQUNBLFFBQVEsTUFBc0I7QUFDNUIsWUFBUSxLQUFLLEdBQUcsSUFBSTtBQUFBLEVBQ3RCO0FBQUEsRUFDQSxTQUFTLE1BQXNCO0FBQzdCLFlBQVEsTUFBTSxHQUFHLElBQUk7QUFBQSxFQUN2QjtBQUFBLEVBQ0EsU0FBUyxNQUFzQjtBQUM3QixZQUFRLElBQUksR0FBRyxJQUFJO0FBQUEsRUFDckI7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
