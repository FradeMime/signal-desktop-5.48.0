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
var createStore_exports = {};
__export(createStore_exports, {
  createStore: () => createStore
});
module.exports = __toCommonJS(createStore_exports);
var import_redux = require("redux");
var import_redux_promise_middleware = __toESM(require("redux-promise-middleware"));
var import_redux_thunk = __toESM(require("redux-thunk"));
var import_redux_logger = require("redux-logger");
var import_reducer = require("./reducer");
var import_dispatchItemsMiddleware = require("../shims/dispatchItemsMiddleware");
const env = window.getEnvironment();
const directConsole = {
  log: console._log,
  groupCollapsed: console.groupCollapsed,
  group: console.group,
  groupEnd: console.groupEnd,
  warn: console.warn,
  error: console.error
};
const logger = (0, import_redux_logger.createLogger)({
  logger: directConsole,
  predicate: (_getState, action) => {
    if (action.type === "network/CHECK_NETWORK_STATUS") {
      return false;
    }
    return true;
  }
});
const middlewareList = [
  import_redux_promise_middleware.default,
  import_redux_thunk.default,
  import_dispatchItemsMiddleware.dispatchItemsMiddleware,
  ...env === "production" ? [] : [logger]
];
const enhancer = (0, import_redux.applyMiddleware)(...middlewareList);
const createStore = /* @__PURE__ */ __name((initialState) => (0, import_redux.createStore)(import_reducer.reducer, initialState, enhancer), "createStore");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createStore
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3JlYXRlU3RvcmUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5cbmltcG9ydCB0eXBlIHsgU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBhcHBseU1pZGRsZXdhcmUsIGNyZWF0ZVN0b3JlIGFzIHJlZHV4Q3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCBwcm9taXNlIGZyb20gJ3JlZHV4LXByb21pc2UtbWlkZGxld2FyZSc7XG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSAncmVkdXgtbG9nZ2VyJztcblxuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgfSBmcm9tICcuL3JlZHVjZXInO1xuaW1wb3J0IHsgcmVkdWNlciB9IGZyb20gJy4vcmVkdWNlcic7XG5pbXBvcnQgeyBkaXNwYXRjaEl0ZW1zTWlkZGxld2FyZSB9IGZyb20gJy4uL3NoaW1zL2Rpc3BhdGNoSXRlbXNNaWRkbGV3YXJlJztcblxuZGVjbGFyZSBnbG9iYWwge1xuICAvLyBXZSB3YW50IHRvIGV4dGVuZCBgd2luZG93YCdzIHByb3BlcnRpZXMsIHNvIHdlIG5lZWQgYW4gaW50ZXJmYWNlLlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgaW50ZXJmYWNlIENvbnNvbGUge1xuICAgIF9sb2c6IENvbnNvbGVbJ2xvZyddO1xuICB9XG59XG5cbmNvbnN0IGVudiA9IHdpbmRvdy5nZXRFbnZpcm9ubWVudCgpO1xuXG4vLyBTbyBSZWR1eCBsb2dnaW5nIGRvZXNuJ3QgZ28gdG8gZGlzaywgYW5kIHNvIHdlIGNhbiBnZXQgY29sb3JzL3N0eWxlc1xuY29uc3QgZGlyZWN0Q29uc29sZSA9IHtcbiAgbG9nOiBjb25zb2xlLl9sb2csXG4gIGdyb3VwQ29sbGFwc2VkOiBjb25zb2xlLmdyb3VwQ29sbGFwc2VkLFxuICBncm91cDogY29uc29sZS5ncm91cCxcbiAgZ3JvdXBFbmQ6IGNvbnNvbGUuZ3JvdXBFbmQsXG4gIHdhcm46IGNvbnNvbGUud2FybixcbiAgZXJyb3I6IGNvbnNvbGUuZXJyb3IsXG59O1xuXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoe1xuICBsb2dnZXI6IGRpcmVjdENvbnNvbGUsXG4gIHByZWRpY2F0ZTogKF9nZXRTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgaWYgKGFjdGlvbi50eXBlID09PSAnbmV0d29yay9DSEVDS19ORVRXT1JLX1NUQVRVUycpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG59KTtcblxuY29uc3QgbWlkZGxld2FyZUxpc3QgPSBbXG4gIHByb21pc2UsXG4gIHRodW5rLFxuICBkaXNwYXRjaEl0ZW1zTWlkZGxld2FyZSxcbiAgLi4uKGVudiA9PT0gJ3Byb2R1Y3Rpb24nID8gW10gOiBbbG9nZ2VyXSksXG5dO1xuXG5jb25zdCBlbmhhbmNlciA9IGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlTGlzdCk7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTdG9yZSA9IChcbiAgaW5pdGlhbFN0YXRlOiBSZWFkb25seTxTdGF0ZVR5cGU+XG4pOiBTdG9yZTxTdGF0ZVR5cGU+ID0+IHJlZHV4Q3JlYXRlU3RvcmUocmVkdWNlciwgaW5pdGlhbFN0YXRlLCBlbmhhbmNlcik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTUEsbUJBQWlFO0FBRWpFLHNDQUFvQjtBQUNwQix5QkFBa0I7QUFDbEIsMEJBQTZCO0FBRzdCLHFCQUF3QjtBQUN4QixxQ0FBd0M7QUFVeEMsTUFBTSxNQUFNLE9BQU8sZUFBZTtBQUdsQyxNQUFNLGdCQUFnQjtBQUFBLEVBQ3BCLEtBQUssUUFBUTtBQUFBLEVBQ2IsZ0JBQWdCLFFBQVE7QUFBQSxFQUN4QixPQUFPLFFBQVE7QUFBQSxFQUNmLFVBQVUsUUFBUTtBQUFBLEVBQ2xCLE1BQU0sUUFBUTtBQUFBLEVBQ2QsT0FBTyxRQUFRO0FBQ2pCO0FBRUEsTUFBTSxTQUFTLHNDQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLEVBQ1IsV0FBVyxDQUFDLFdBQVcsV0FBVztBQUNoQyxRQUFJLE9BQU8sU0FBUyxnQ0FBZ0M7QUFDbEQsYUFBTztBQUFBLElBQ1Q7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUNGLENBQUM7QUFFRCxNQUFNLGlCQUFpQjtBQUFBLEVBQ3JCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLEdBQUksUUFBUSxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU07QUFDekM7QUFFQSxNQUFNLFdBQVcsa0NBQWdCLEdBQUcsY0FBYztBQUUzQyxNQUFNLGNBQWMsd0JBQ3pCLGlCQUNxQiw4QkFBaUIsd0JBQVMsY0FBYyxRQUFRLEdBRjVDOyIsCiAgIm5hbWVzIjogW10KfQo=
