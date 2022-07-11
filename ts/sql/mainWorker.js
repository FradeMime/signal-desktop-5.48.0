var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_worker_threads = require("worker_threads");
var import_Server = __toESM(require("./Server"));
if (!import_worker_threads.parentPort) {
  throw new Error("Must run as a worker thread");
}
const port = import_worker_threads.parentPort;
function respond(seq, error, response) {
  const wrappedResponse = {
    type: "response",
    seq,
    error: error?.stack,
    response
  };
  port.postMessage(wrappedResponse);
}
const log = /* @__PURE__ */ __name((level, args) => {
  const wrappedResponse = {
    type: "log",
    level,
    args
  };
  port.postMessage(wrappedResponse);
}, "log");
const logger = {
  fatal(...args) {
    log("fatal", args);
  },
  error(...args) {
    log("error", args);
  },
  warn(...args) {
    log("warn", args);
  },
  info(...args) {
    log("info", args);
  },
  debug(...args) {
    log("debug", args);
  },
  trace(...args) {
    log("trace", args);
  }
};
port.on("message", async ({ seq, request }) => {
  try {
    if (request.type === "init") {
      await import_Server.default.initialize({
        ...request.options,
        logger
      });
      respond(seq, void 0, void 0);
      return;
    }
    if (request.type === "close") {
      await import_Server.default.close();
      respond(seq, void 0, void 0);
      process.exit(0);
      return;
    }
    if (request.type === "removeDB") {
      await import_Server.default.removeDB();
      respond(seq, void 0, void 0);
      return;
    }
    if (request.type === "sqlCall") {
      const method = import_Server.default[request.method];
      if (typeof method !== "function") {
        throw new Error(`Invalid sql method: ${method}`);
      }
      const start = Date.now();
      const result = await method.apply(import_Server.default, request.args);
      const end = Date.now();
      respond(seq, void 0, { result, duration: end - start });
    } else {
      throw new Error("Unexpected request type");
    }
  } catch (error) {
    respond(seq, error, void 0);
  }
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbldvcmtlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBwYXJlbnRQb3J0IH0gZnJvbSAnd29ya2VyX3RocmVhZHMnO1xuXG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi90eXBlcy9Mb2dnaW5nJztcbmltcG9ydCB0eXBlIHtcbiAgV3JhcHBlZFdvcmtlclJlcXVlc3QsXG4gIFdyYXBwZWRXb3JrZXJSZXNwb25zZSxcbiAgV3JhcHBlZFdvcmtlckxvZ0VudHJ5LFxufSBmcm9tICcuL21haW4nO1xuaW1wb3J0IGRiIGZyb20gJy4vU2VydmVyJztcblxuaWYgKCFwYXJlbnRQb3J0KSB7XG4gIHRocm93IG5ldyBFcnJvcignTXVzdCBydW4gYXMgYSB3b3JrZXIgdGhyZWFkJyk7XG59XG5cbmNvbnN0IHBvcnQgPSBwYXJlbnRQb3J0O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZnVuY3Rpb24gcmVzcG9uZChzZXE6IG51bWJlciwgZXJyb3I6IEVycm9yIHwgdW5kZWZpbmVkLCByZXNwb25zZT86IGFueSkge1xuICBjb25zdCB3cmFwcGVkUmVzcG9uc2U6IFdyYXBwZWRXb3JrZXJSZXNwb25zZSA9IHtcbiAgICB0eXBlOiAncmVzcG9uc2UnLFxuICAgIHNlcSxcbiAgICBlcnJvcjogZXJyb3I/LnN0YWNrLFxuICAgIHJlc3BvbnNlLFxuICB9O1xuICBwb3J0LnBvc3RNZXNzYWdlKHdyYXBwZWRSZXNwb25zZSk7XG59XG5cbmNvbnN0IGxvZyA9IChcbiAgbGV2ZWw6IFdyYXBwZWRXb3JrZXJMb2dFbnRyeVsnbGV2ZWwnXSxcbiAgYXJnczogQXJyYXk8dW5rbm93bj5cbik6IHZvaWQgPT4ge1xuICBjb25zdCB3cmFwcGVkUmVzcG9uc2U6IFdyYXBwZWRXb3JrZXJSZXNwb25zZSA9IHtcbiAgICB0eXBlOiAnbG9nJyxcbiAgICBsZXZlbCxcbiAgICBhcmdzLFxuICB9O1xuICBwb3J0LnBvc3RNZXNzYWdlKHdyYXBwZWRSZXNwb25zZSk7XG59O1xuXG5jb25zdCBsb2dnZXI6IExvZ2dlclR5cGUgPSB7XG4gIGZhdGFsKC4uLmFyZ3M6IEFycmF5PHVua25vd24+KSB7XG4gICAgbG9nKCdmYXRhbCcsIGFyZ3MpO1xuICB9LFxuICBlcnJvciguLi5hcmdzOiBBcnJheTx1bmtub3duPikge1xuICAgIGxvZygnZXJyb3InLCBhcmdzKTtcbiAgfSxcbiAgd2FybiguLi5hcmdzOiBBcnJheTx1bmtub3duPikge1xuICAgIGxvZygnd2FybicsIGFyZ3MpO1xuICB9LFxuICBpbmZvKC4uLmFyZ3M6IEFycmF5PHVua25vd24+KSB7XG4gICAgbG9nKCdpbmZvJywgYXJncyk7XG4gIH0sXG4gIGRlYnVnKC4uLmFyZ3M6IEFycmF5PHVua25vd24+KSB7XG4gICAgbG9nKCdkZWJ1ZycsIGFyZ3MpO1xuICB9LFxuICB0cmFjZSguLi5hcmdzOiBBcnJheTx1bmtub3duPikge1xuICAgIGxvZygndHJhY2UnLCBhcmdzKTtcbiAgfSxcbn07XG5cbnBvcnQub24oJ21lc3NhZ2UnLCBhc3luYyAoeyBzZXEsIHJlcXVlc3QgfTogV3JhcHBlZFdvcmtlclJlcXVlc3QpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAocmVxdWVzdC50eXBlID09PSAnaW5pdCcpIHtcbiAgICAgIGF3YWl0IGRiLmluaXRpYWxpemUoe1xuICAgICAgICAuLi5yZXF1ZXN0Lm9wdGlvbnMsXG4gICAgICAgIGxvZ2dlcixcbiAgICAgIH0pO1xuXG4gICAgICByZXNwb25kKHNlcSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0LnR5cGUgPT09ICdjbG9zZScpIHtcbiAgICAgIGF3YWl0IGRiLmNsb3NlKCk7XG5cbiAgICAgIHJlc3BvbmQoc2VxLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG4gICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3QudHlwZSA9PT0gJ3JlbW92ZURCJykge1xuICAgICAgYXdhaXQgZGIucmVtb3ZlREIoKTtcblxuICAgICAgcmVzcG9uZChzZXEsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdC50eXBlID09PSAnc3FsQ2FsbCcpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICBjb25zdCBtZXRob2QgPSAoZGIgYXMgYW55KVtyZXF1ZXN0Lm1ldGhvZF07XG4gICAgICBpZiAodHlwZW9mIG1ldGhvZCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc3FsIG1ldGhvZDogJHttZXRob2R9YCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG1ldGhvZC5hcHBseShkYiwgcmVxdWVzdC5hcmdzKTtcbiAgICAgIGNvbnN0IGVuZCA9IERhdGUubm93KCk7XG5cbiAgICAgIHJlc3BvbmQoc2VxLCB1bmRlZmluZWQsIHsgcmVzdWx0LCBkdXJhdGlvbjogZW5kIC0gc3RhcnQgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCByZXF1ZXN0IHR5cGUnKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzcG9uZChzZXEsIGVycm9yLCB1bmRlZmluZWQpO1xuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSw0QkFBMkI7QUFRM0Isb0JBQWU7QUFFZixJQUFJLENBQUMsa0NBQVk7QUFDZixRQUFNLElBQUksTUFBTSw2QkFBNkI7QUFDL0M7QUFFQSxNQUFNLE9BQU87QUFHYixpQkFBaUIsS0FBYSxPQUEwQixVQUFnQjtBQUN0RSxRQUFNLGtCQUF5QztBQUFBLElBQzdDLE1BQU07QUFBQSxJQUNOO0FBQUEsSUFDQSxPQUFPLE9BQU87QUFBQSxJQUNkO0FBQUEsRUFDRjtBQUNBLE9BQUssWUFBWSxlQUFlO0FBQ2xDO0FBUlMsQUFVVCxNQUFNLE1BQU0sd0JBQ1YsT0FDQSxTQUNTO0FBQ1QsUUFBTSxrQkFBeUM7QUFBQSxJQUM3QyxNQUFNO0FBQUEsSUFDTjtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0EsT0FBSyxZQUFZLGVBQWU7QUFDbEMsR0FWWTtBQVlaLE1BQU0sU0FBcUI7QUFBQSxFQUN6QixTQUFTLE1BQXNCO0FBQzdCLFFBQUksU0FBUyxJQUFJO0FBQUEsRUFDbkI7QUFBQSxFQUNBLFNBQVMsTUFBc0I7QUFDN0IsUUFBSSxTQUFTLElBQUk7QUFBQSxFQUNuQjtBQUFBLEVBQ0EsUUFBUSxNQUFzQjtBQUM1QixRQUFJLFFBQVEsSUFBSTtBQUFBLEVBQ2xCO0FBQUEsRUFDQSxRQUFRLE1BQXNCO0FBQzVCLFFBQUksUUFBUSxJQUFJO0FBQUEsRUFDbEI7QUFBQSxFQUNBLFNBQVMsTUFBc0I7QUFDN0IsUUFBSSxTQUFTLElBQUk7QUFBQSxFQUNuQjtBQUFBLEVBQ0EsU0FBUyxNQUFzQjtBQUM3QixRQUFJLFNBQVMsSUFBSTtBQUFBLEVBQ25CO0FBQ0Y7QUFFQSxLQUFLLEdBQUcsV0FBVyxPQUFPLEVBQUUsS0FBSyxjQUFvQztBQUNuRSxNQUFJO0FBQ0YsUUFBSSxRQUFRLFNBQVMsUUFBUTtBQUMzQixZQUFNLHNCQUFHLFdBQVc7QUFBQSxXQUNmLFFBQVE7QUFBQSxRQUNYO0FBQUEsTUFDRixDQUFDO0FBRUQsY0FBUSxLQUFLLFFBQVcsTUFBUztBQUNqQztBQUFBLElBQ0Y7QUFFQSxRQUFJLFFBQVEsU0FBUyxTQUFTO0FBQzVCLFlBQU0sc0JBQUcsTUFBTTtBQUVmLGNBQVEsS0FBSyxRQUFXLE1BQVM7QUFDakMsY0FBUSxLQUFLLENBQUM7QUFDZDtBQUFBLElBQ0Y7QUFFQSxRQUFJLFFBQVEsU0FBUyxZQUFZO0FBQy9CLFlBQU0sc0JBQUcsU0FBUztBQUVsQixjQUFRLEtBQUssUUFBVyxNQUFTO0FBQ2pDO0FBQUEsSUFDRjtBQUVBLFFBQUksUUFBUSxTQUFTLFdBQVc7QUFFOUIsWUFBTSxTQUFVLHNCQUFXLFFBQVE7QUFDbkMsVUFBSSxPQUFPLFdBQVcsWUFBWTtBQUNoQyxjQUFNLElBQUksTUFBTSx1QkFBdUIsUUFBUTtBQUFBLE1BQ2pEO0FBRUEsWUFBTSxRQUFRLEtBQUssSUFBSTtBQUN2QixZQUFNLFNBQVMsTUFBTSxPQUFPLE1BQU0sdUJBQUksUUFBUSxJQUFJO0FBQ2xELFlBQU0sTUFBTSxLQUFLLElBQUk7QUFFckIsY0FBUSxLQUFLLFFBQVcsRUFBRSxRQUFRLFVBQVUsTUFBTSxNQUFNLENBQUM7QUFBQSxJQUMzRCxPQUFPO0FBQ0wsWUFBTSxJQUFJLE1BQU0seUJBQXlCO0FBQUEsSUFDM0M7QUFBQSxFQUNGLFNBQVMsT0FBUDtBQUNBLFlBQVEsS0FBSyxPQUFPLE1BQVM7QUFBQSxFQUMvQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
