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
var cleanDataForIpc_exports = {};
__export(cleanDataForIpc_exports, {
  cleanDataForIpc: () => cleanDataForIpc
});
module.exports = __toCommonJS(cleanDataForIpc_exports);
var import_lodash = require("lodash");
var import_iterables = require("../util/iterables");
function cleanDataForIpc(data) {
  const pathsChanged = [];
  const cleaned = cleanDataInner(data, "root", pathsChanged);
  return { cleaned, pathsChanged };
}
function cleanDataInner(data, path, pathsChanged) {
  switch (typeof data) {
    case "undefined":
    case "boolean":
    case "number":
    case "string":
      return data;
    case "bigint":
      pathsChanged.push(path);
      return data.toString();
    case "function":
      return void 0;
    case "object": {
      if (data === null) {
        return null;
      }
      if (Array.isArray(data)) {
        const result2 = [];
        data.forEach((item, index) => {
          const indexPath = `${path}.${index}`;
          if (item === void 0 || item === null) {
            pathsChanged.push(indexPath);
          } else {
            result2.push(cleanDataInner(item, indexPath, pathsChanged));
          }
        });
        return result2;
      }
      if (data instanceof Map) {
        const result2 = {};
        pathsChanged.push(path);
        data.forEach((value, key) => {
          if (typeof key === "string") {
            result2[key] = cleanDataInner(value, `${path}.<map value at ${key}>`, pathsChanged);
          } else {
            pathsChanged.push(`${path}.<map key ${String(key)}>`);
          }
        });
        return result2;
      }
      if (data instanceof Date) {
        pathsChanged.push(path);
        return Number.isNaN(data.valueOf()) ? void 0 : data.toISOString();
      }
      if (data instanceof ArrayBuffer) {
        pathsChanged.push(path);
        return void 0;
      }
      if (data instanceof Uint8Array) {
        return data;
      }
      const dataAsRecord = data;
      if ("toNumber" in dataAsRecord && typeof dataAsRecord.toNumber === "function") {
        return cleanDataInner(dataAsRecord.toNumber(), path, pathsChanged);
      }
      if ((0, import_iterables.isIterable)(dataAsRecord)) {
        const result2 = [];
        let index = 0;
        pathsChanged.push(path);
        for (const value of dataAsRecord) {
          result2.push(cleanDataInner(value, `${path}.<iterator index ${index}>`, pathsChanged));
          index += 1;
        }
        return result2;
      }
      if (!(0, import_lodash.isPlainObject)(data)) {
        pathsChanged.push(path);
      }
      const result = {};
      Object.entries(dataAsRecord).forEach(([key, value]) => {
        result[key] = cleanDataInner(value, `${path}.${key}`, pathsChanged);
      });
      return result;
    }
    default: {
      pathsChanged.push(path);
      return void 0;
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cleanDataForIpc
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2xlYW5EYXRhRm9ySXBjLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGlzUGxhaW5PYmplY3QgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBpc0l0ZXJhYmxlIH0gZnJvbSAnLi4vdXRpbC9pdGVyYWJsZXMnO1xuXG4vKipcbiAqIElQQyBhcmd1bWVudHMgYXJlIHNlcmlhbGl6ZWQgd2l0aCB0aGUgW3N0cnVjdHVyZWQgY2xvbmUgYWxnb3JpdGhtXVswXSwgYnV0IHdlIGNhbiBvbmx5XG4gKiBzYXZlIHNvbWUgZGF0YSB0eXBlcyB0byBkaXNrLlxuICpcbiAqIFRoaXMgY2xlYW5zIHRoZSBkYXRhIHNvIGl0J3Mgcm91Z2hseSBKU09OLXNlcmlhbGl6YWJsZSwgdGhvdWdoIGl0IGRvZXMgbm90IGhhbmRsZVxuICogZXZlcnkgY2FzZS4gWW91IGNhbiBzZWUgdGhlIGV4cGVjdGVkIGJlaGF2aW9yIGluIHRoZSB0ZXN0cy4gTm90YWJseSwgd2UgdHJ5IHRvIGNvbnZlcnRcbiAqIHByb3RvYnVmanMgbnVtYmVycyB0byBKYXZhU2NyaXB0IG51bWJlcnMsIGFuZCB3ZSBkb24ndCB0b3VjaCBBcnJheUJ1ZmZlcnMuXG4gKlxuICogWzBdOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViX1dvcmtlcnNfQVBJL1N0cnVjdHVyZWRfY2xvbmVfYWxnb3JpdGhtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhbkRhdGFGb3JJcGMoZGF0YTogdW5rbm93bik6IHtcbiAgLy8gYGFueWBzIGFyZSBkYW5nZXJvdXMgYnV0IGl0J3MgZGlmZmljdWx0IChpbXBvc3NpYmxlPykgdG8gdHlwZSB0aGlzIHdpdGggZ2VuZXJpY3MuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIGNsZWFuZWQ6IGFueTtcbiAgcGF0aHNDaGFuZ2VkOiBBcnJheTxzdHJpbmc+O1xufSB7XG4gIGNvbnN0IHBhdGhzQ2hhbmdlZDogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBjb25zdCBjbGVhbmVkID0gY2xlYW5EYXRhSW5uZXIoZGF0YSwgJ3Jvb3QnLCBwYXRoc0NoYW5nZWQpO1xuICByZXR1cm4geyBjbGVhbmVkLCBwYXRoc0NoYW5nZWQgfTtcbn1cblxuLy8gVGhlc2UgdHlwZSBkZWZpbml0aW9ucyBhcmUgbGlmdGVkIGZyb20gW3RoaXMgR2l0SHViIGNvbW1lbnRdWzFdLlxuLy9cbi8vIFsxXTogaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8zNDk2I2lzc3VlY29tbWVudC0xMjg1NTM1NDBcbnR5cGUgQ2xlYW5lZERhdGFWYWx1ZSA9XG4gIHwgc3RyaW5nXG4gIHwgbnVtYmVyXG4gIHwgYm9vbGVhblxuICB8IG51bGxcbiAgfCB1bmRlZmluZWRcbiAgfCBVaW50OEFycmF5XG4gIHwgQ2xlYW5lZE9iamVjdFxuICB8IENsZWFuZWRBcnJheTtcbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG5pbnRlcmZhY2UgQ2xlYW5lZE9iamVjdCB7XG4gIFt4OiBzdHJpbmddOiBDbGVhbmVkRGF0YVZhbHVlO1xufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1pbnRlcmZhY2VcbmludGVyZmFjZSBDbGVhbmVkQXJyYXkgZXh0ZW5kcyBBcnJheTxDbGVhbmVkRGF0YVZhbHVlPiB7fVxuLyogZXNsaW50LWVuYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuXG5mdW5jdGlvbiBjbGVhbkRhdGFJbm5lcihcbiAgZGF0YTogdW5rbm93bixcbiAgcGF0aDogc3RyaW5nLFxuICBwYXRoc0NoYW5nZWQ6IEFycmF5PHN0cmluZz5cbik6IENsZWFuZWREYXRhVmFsdWUge1xuICBzd2l0Y2ggKHR5cGVvZiBkYXRhKSB7XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICBjYXNlICdudW1iZXInOlxuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICBjYXNlICdiaWdpbnQnOlxuICAgICAgcGF0aHNDaGFuZ2VkLnB1c2gocGF0aCk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgIC8vIEZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB3aXRoIHByZXZpb3VzIHZlcnNpb25zIG9mIHRoaXMgZnVuY3Rpb24sIHdlIGNsZWFuXG4gICAgICAvLyAgIGZ1bmN0aW9ucyBidXQgZG9uJ3QgbWFyayB0aGVtIGFzIGNsZWFuZWQuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNhc2UgJ29iamVjdCc6IHtcbiAgICAgIGlmIChkYXRhID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICBjb25zdCByZXN1bHQ6IENsZWFuZWRBcnJheSA9IFtdO1xuICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgaW5kZXhQYXRoID0gYCR7cGF0aH0uJHtpbmRleH1gO1xuICAgICAgICAgIGlmIChpdGVtID09PSB1bmRlZmluZWQgfHwgaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcGF0aHNDaGFuZ2VkLnB1c2goaW5kZXhQYXRoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goY2xlYW5EYXRhSW5uZXIoaXRlbSwgaW5kZXhQYXRoLCBwYXRoc0NoYW5nZWQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuXG4gICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICBjb25zdCByZXN1bHQ6IENsZWFuZWRPYmplY3QgPSB7fTtcbiAgICAgICAgcGF0aHNDaGFuZ2VkLnB1c2gocGF0aCk7XG4gICAgICAgIGRhdGEuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBjbGVhbkRhdGFJbm5lcihcbiAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgIGAke3BhdGh9LjxtYXAgdmFsdWUgYXQgJHtrZXl9PmAsXG4gICAgICAgICAgICAgIHBhdGhzQ2hhbmdlZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF0aHNDaGFuZ2VkLnB1c2goYCR7cGF0aH0uPG1hcCBrZXkgJHtTdHJpbmcoa2V5KX0+YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHBhdGhzQ2hhbmdlZC5wdXNoKHBhdGgpO1xuICAgICAgICByZXR1cm4gTnVtYmVyLmlzTmFOKGRhdGEudmFsdWVPZigpKSA/IHVuZGVmaW5lZCA6IGRhdGEudG9JU09TdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgICBwYXRoc0NoYW5nZWQucHVzaChwYXRoKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhQXNSZWNvcmQgPSBkYXRhIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuXG4gICAgICBpZiAoXG4gICAgICAgICd0b051bWJlcicgaW4gZGF0YUFzUmVjb3JkICYmXG4gICAgICAgIHR5cGVvZiBkYXRhQXNSZWNvcmQudG9OdW1iZXIgPT09ICdmdW5jdGlvbidcbiAgICAgICkge1xuICAgICAgICAvLyBXZSBjbGVhbiB0aGlzIGp1c3QgaW4gY2FzZSBgdG9OdW1iZXJgIHJldHVybnMgc29tZXRoaW5nIGJvZ3VzLlxuICAgICAgICByZXR1cm4gY2xlYW5EYXRhSW5uZXIoZGF0YUFzUmVjb3JkLnRvTnVtYmVyKCksIHBhdGgsIHBhdGhzQ2hhbmdlZCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0l0ZXJhYmxlKGRhdGFBc1JlY29yZCkpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0OiBDbGVhbmVkQXJyYXkgPSBbXTtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgcGF0aHNDaGFuZ2VkLnB1c2gocGF0aCk7XG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgZGF0YUFzUmVjb3JkKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgICBjbGVhbkRhdGFJbm5lcihcbiAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgIGAke3BhdGh9LjxpdGVyYXRvciBpbmRleCAke2luZGV4fT5gLFxuICAgICAgICAgICAgICBwYXRoc0NoYW5nZWRcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cblxuICAgICAgLy8gV2UnbGwgc3RpbGwgdHJ5IHRvIGNsZWFuIG5vbi1wbGFpbiBvYmplY3RzLCBidXQgd2Ugd2FudCB0byBtYXJrIHRoYXQgdGhleSd2ZVxuICAgICAgLy8gICBjaGFuZ2VkLlxuICAgICAgaWYgKCFpc1BsYWluT2JqZWN0KGRhdGEpKSB7XG4gICAgICAgIHBhdGhzQ2hhbmdlZC5wdXNoKHBhdGgpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXN1bHQ6IENsZWFuZWRPYmplY3QgPSB7fTtcblxuICAgICAgLy8gQ29udmVuaWVudGx5LCBgT2JqZWN0LmVudHJpZXNgIHJlbW92ZXMgc3ltYm9sIGtleXMuXG4gICAgICBPYmplY3QuZW50cmllcyhkYXRhQXNSZWNvcmQpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICByZXN1bHRba2V5XSA9IGNsZWFuRGF0YUlubmVyKHZhbHVlLCBgJHtwYXRofS4ke2tleX1gLCBwYXRoc0NoYW5nZWQpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHBhdGhzQ2hhbmdlZC5wdXNoKHBhdGgpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBOEI7QUFFOUIsdUJBQTJCO0FBWXBCLHlCQUF5QixNQUs5QjtBQUNBLFFBQU0sZUFBOEIsQ0FBQztBQUNyQyxRQUFNLFVBQVUsZUFBZSxNQUFNLFFBQVEsWUFBWTtBQUN6RCxTQUFPLEVBQUUsU0FBUyxhQUFhO0FBQ2pDO0FBVGdCLEFBK0JoQix3QkFDRSxNQUNBLE1BQ0EsY0FDa0I7QUFDbEIsVUFBUSxPQUFPO0FBQUEsU0FDUjtBQUFBLFNBQ0E7QUFBQSxTQUNBO0FBQUEsU0FDQTtBQUNILGFBQU87QUFBQSxTQUNKO0FBQ0gsbUJBQWEsS0FBSyxJQUFJO0FBQ3RCLGFBQU8sS0FBSyxTQUFTO0FBQUEsU0FDbEI7QUFHSCxhQUFPO0FBQUEsU0FDSixVQUFVO0FBQ2IsVUFBSSxTQUFTLE1BQU07QUFDakIsZUFBTztBQUFBLE1BQ1Q7QUFFQSxVQUFJLE1BQU0sUUFBUSxJQUFJLEdBQUc7QUFDdkIsY0FBTSxVQUF1QixDQUFDO0FBQzlCLGFBQUssUUFBUSxDQUFDLE1BQU0sVUFBVTtBQUM1QixnQkFBTSxZQUFZLEdBQUcsUUFBUTtBQUM3QixjQUFJLFNBQVMsVUFBYSxTQUFTLE1BQU07QUFDdkMseUJBQWEsS0FBSyxTQUFTO0FBQUEsVUFDN0IsT0FBTztBQUNMLG9CQUFPLEtBQUssZUFBZSxNQUFNLFdBQVcsWUFBWSxDQUFDO0FBQUEsVUFDM0Q7QUFBQSxRQUNGLENBQUM7QUFDRCxlQUFPO0FBQUEsTUFDVDtBQUVBLFVBQUksZ0JBQWdCLEtBQUs7QUFDdkIsY0FBTSxVQUF3QixDQUFDO0FBQy9CLHFCQUFhLEtBQUssSUFBSTtBQUN0QixhQUFLLFFBQVEsQ0FBQyxPQUFPLFFBQVE7QUFDM0IsY0FBSSxPQUFPLFFBQVEsVUFBVTtBQUMzQixvQkFBTyxPQUFPLGVBQ1osT0FDQSxHQUFHLHNCQUFzQixRQUN6QixZQUNGO0FBQUEsVUFDRixPQUFPO0FBQ0wseUJBQWEsS0FBSyxHQUFHLGlCQUFpQixPQUFPLEdBQUcsSUFBSTtBQUFBLFVBQ3REO0FBQUEsUUFDRixDQUFDO0FBQ0QsZUFBTztBQUFBLE1BQ1Q7QUFFQSxVQUFJLGdCQUFnQixNQUFNO0FBQ3hCLHFCQUFhLEtBQUssSUFBSTtBQUN0QixlQUFPLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxJQUFJLFNBQVksS0FBSyxZQUFZO0FBQUEsTUFDckU7QUFFQSxVQUFJLGdCQUFnQixhQUFhO0FBQy9CLHFCQUFhLEtBQUssSUFBSTtBQUN0QixlQUFPO0FBQUEsTUFDVDtBQUVBLFVBQUksZ0JBQWdCLFlBQVk7QUFDOUIsZUFBTztBQUFBLE1BQ1Q7QUFFQSxZQUFNLGVBQWU7QUFFckIsVUFDRSxjQUFjLGdCQUNkLE9BQU8sYUFBYSxhQUFhLFlBQ2pDO0FBRUEsZUFBTyxlQUFlLGFBQWEsU0FBUyxHQUFHLE1BQU0sWUFBWTtBQUFBLE1BQ25FO0FBRUEsVUFBSSxpQ0FBVyxZQUFZLEdBQUc7QUFDNUIsY0FBTSxVQUF1QixDQUFDO0FBQzlCLFlBQUksUUFBUTtBQUNaLHFCQUFhLEtBQUssSUFBSTtBQUN0QixtQkFBVyxTQUFTLGNBQWM7QUFDaEMsa0JBQU8sS0FDTCxlQUNFLE9BQ0EsR0FBRyx3QkFBd0IsVUFDM0IsWUFDRixDQUNGO0FBQ0EsbUJBQVM7QUFBQSxRQUNYO0FBQ0EsZUFBTztBQUFBLE1BQ1Q7QUFJQSxVQUFJLENBQUMsaUNBQWMsSUFBSSxHQUFHO0FBQ3hCLHFCQUFhLEtBQUssSUFBSTtBQUFBLE1BQ3hCO0FBRUEsWUFBTSxTQUF3QixDQUFDO0FBRy9CLGFBQU8sUUFBUSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUMsS0FBSyxXQUFXO0FBQ3JELGVBQU8sT0FBTyxlQUFlLE9BQU8sR0FBRyxRQUFRLE9BQU8sWUFBWTtBQUFBLE1BQ3BFLENBQUM7QUFFRCxhQUFPO0FBQUEsSUFDVDtBQUFBLGFBQ1M7QUFDUCxtQkFBYSxLQUFLLElBQUk7QUFDdEIsYUFBTztBQUFBLElBQ1Q7QUFBQTtBQUVKO0FBbEhTIiwKICAibmFtZXMiOiBbXQp9Cg==
