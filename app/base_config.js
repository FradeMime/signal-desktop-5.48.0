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
var base_config_exports = {};
__export(base_config_exports, {
  start: () => start
});
module.exports = __toCommonJS(base_config_exports);
var import_fs = require("fs");
var import_lodash = require("lodash");
var import_fp = require("lodash/fp");
var import_assert = require("../ts/util/assert");
const ENCODING = "utf8";
function start({
  name,
  targetPath,
  throwOnFilesystemErrors
}) {
  let cachedValue = /* @__PURE__ */ Object.create(null);
  let incomingJson;
  try {
    incomingJson = (0, import_fs.readFileSync)(targetPath, ENCODING);
    cachedValue = incomingJson ? JSON.parse(incomingJson) : void 0;
    console.log(`config/get: Successfully read ${name} config file`);
    if (!cachedValue) {
      console.log(`config/start: ${name} config value was falsy, cache is now empty object`);
      cachedValue = /* @__PURE__ */ Object.create(null);
    }
  } catch (error) {
    if (throwOnFilesystemErrors && error.code !== "ENOENT") {
      throw error;
    }
    if (incomingJson) {
      console.log(`config/start: ${name} config file was malformed, starting afresh`);
    } else {
      console.log(`config/start: Did not find ${name} config file (or it was empty), cache is now empty object`);
    }
    cachedValue = /* @__PURE__ */ Object.create(null);
  }
  function ourGet(keyPath) {
    return (0, import_lodash.get)(cachedValue, keyPath);
  }
  function ourSet(keyPath, value) {
    const newCachedValue = (0, import_fp.set)(keyPath, value, cachedValue);
    console.log(`config/set: Saving ${name} config to disk`);
    if (!throwOnFilesystemErrors) {
      cachedValue = newCachedValue;
    }
    const outgoingJson = JSON.stringify(newCachedValue, null, "  ");
    try {
      (0, import_fs.writeFileSync)(targetPath, outgoingJson, ENCODING);
      console.log(`config/set: Saved ${name} config to disk`);
      cachedValue = newCachedValue;
    } catch (err) {
      if (throwOnFilesystemErrors) {
        throw err;
      } else {
        console.warn(`config/set: Failed to save ${name} config to disk; only updating in-memory data`);
      }
    }
  }
  function remove() {
    console.log(`config/remove: Deleting ${name} config from disk`);
    try {
      (0, import_fs.unlinkSync)(targetPath);
      console.log(`config/remove: Deleted ${name} config from disk`);
    } catch (err) {
      const errCode = (0, import_lodash.get)(err, "code");
      if (throwOnFilesystemErrors) {
        (0, import_assert.strictAssert)(errCode === "ENOENT", "Expected deletion of no file");
        console.log(`config/remove: No ${name} config on disk, did nothing`);
      } else {
        console.warn(`config/remove: Got ${String(errCode)} when removing ${name} config from disk`);
      }
    }
    cachedValue = /* @__PURE__ */ Object.create(null);
  }
  return {
    set: ourSet,
    get: ourGet,
    remove,
    _getCachedValue: () => cachedValue
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  start
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYmFzZV9jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyByZWFkRmlsZVN5bmMsIHdyaXRlRmlsZVN5bmMsIHVubGlua1N5bmMgfSBmcm9tICdmcyc7XG5cbmltcG9ydCB7IGdldCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBzZXQgfSBmcm9tICdsb2Rhc2gvZnAnO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vdHMvdXRpbC9hc3NlcnQnO1xuXG4vLyBpbXBvcnQgdGhpbmdGdW5jQSBmcm9tICcuLi9hc3NldHMvanNDbGFzcyc7XG4vLyBpbXBvcnQgeyByZWFkeUZvclNodXRkb3duMSB9IGZyb20gJy4uL2Fzc2V0cy90c0NsYXNzJztcbi8vIGltcG9ydCB7IHRoaW5nQXBwIH0gZnJvbSAnLi4vYXNzZXRzL2pzQ2xhc3MnO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9leHRlbnNpb25zXG4vLyBpbXBvcnQgaGVsbG8gZnJvbSAnLi4vYXNzZXRzL3RzX3Rlc3QnO1xuXG5jb25zdCBFTkNPRElORyA9ICd1dGY4JztcblxudHlwZSBJbnRlcm5hbENvbmZpZ1R5cGUgPSBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcblxuZXhwb3J0IHR5cGUgQ29uZmlnVHlwZSA9IHtcbiAgc2V0OiAoa2V5UGF0aDogc3RyaW5nLCB2YWx1ZTogdW5rbm93bikgPT4gdm9pZDtcbiAgZ2V0OiAoa2V5UGF0aDogc3RyaW5nKSA9PiB1bmtub3duO1xuICByZW1vdmU6ICgpID0+IHZvaWQ7XG5cbiAgLy8gVGVzdC1vbmx5XG4gIF9nZXRDYWNoZWRWYWx1ZTogKCkgPT4gSW50ZXJuYWxDb25maWdUeXBlIHwgdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0KHtcbiAgbmFtZSxcbiAgdGFyZ2V0UGF0aCxcbiAgdGhyb3dPbkZpbGVzeXN0ZW1FcnJvcnMsXG59OiBSZWFkb25seTx7XG4gIG5hbWU6IHN0cmluZztcbiAgdGFyZ2V0UGF0aDogc3RyaW5nO1xuICB0aHJvd09uRmlsZXN5c3RlbUVycm9yczogYm9vbGVhbjtcbn0+KTogQ29uZmlnVHlwZSB7XG4gIC8vIGhlbGxvKCk7XG4gIGxldCBjYWNoZWRWYWx1ZTogSW50ZXJuYWxDb25maWdUeXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgbGV0IGluY29taW5nSnNvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgaW5jb21pbmdKc29uID0gcmVhZEZpbGVTeW5jKHRhcmdldFBhdGgsIEVOQ09ESU5HKTtcbiAgICBjYWNoZWRWYWx1ZSA9IGluY29taW5nSnNvbiA/IEpTT04ucGFyc2UoaW5jb21pbmdKc29uKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zb2xlLmxvZyhgY29uZmlnL2dldDogU3VjY2Vzc2Z1bGx5IHJlYWQgJHtuYW1lfSBjb25maWcgZmlsZWApO1xuXG4gICAgaWYgKCFjYWNoZWRWYWx1ZSkge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBjb25maWcvc3RhcnQ6ICR7bmFtZX0gY29uZmlnIHZhbHVlIHdhcyBmYWxzeSwgY2FjaGUgaXMgbm93IGVtcHR5IG9iamVjdGBcbiAgICAgICk7XG4gICAgICBjYWNoZWRWYWx1ZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmICh0aHJvd09uRmlsZXN5c3RlbUVycm9ycyAmJiBlcnJvci5jb2RlICE9PSAnRU5PRU5UJykge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKGluY29taW5nSnNvbikge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBjb25maWcvc3RhcnQ6ICR7bmFtZX0gY29uZmlnIGZpbGUgd2FzIG1hbGZvcm1lZCwgc3RhcnRpbmcgYWZyZXNoYFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBjb25maWcvc3RhcnQ6IERpZCBub3QgZmluZCAke25hbWV9IGNvbmZpZyBmaWxlIChvciBpdCB3YXMgZW1wdHkpLCBjYWNoZSBpcyBub3cgZW1wdHkgb2JqZWN0YFxuICAgICAgKTtcbiAgICB9XG4gICAgY2FjaGVkVmFsdWUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gb3VyR2V0KGtleVBhdGg6IHN0cmluZyk6IHVua25vd24ge1xuICAgIHJldHVybiBnZXQoY2FjaGVkVmFsdWUsIGtleVBhdGgpO1xuICB9XG5cbiAgZnVuY3Rpb24gb3VyU2V0KGtleVBhdGg6IHN0cmluZywgdmFsdWU6IHVua25vd24pOiB2b2lkIHtcbiAgICBjb25zdCBuZXdDYWNoZWRWYWx1ZSA9IHNldChrZXlQYXRoLCB2YWx1ZSwgY2FjaGVkVmFsdWUpO1xuXG4gICAgY29uc29sZS5sb2coYGNvbmZpZy9zZXQ6IFNhdmluZyAke25hbWV9IGNvbmZpZyB0byBkaXNrYCk7XG5cbiAgICBpZiAoIXRocm93T25GaWxlc3lzdGVtRXJyb3JzKSB7XG4gICAgICBjYWNoZWRWYWx1ZSA9IG5ld0NhY2hlZFZhbHVlO1xuICAgIH1cbiAgICBjb25zdCBvdXRnb2luZ0pzb24gPSBKU09OLnN0cmluZ2lmeShuZXdDYWNoZWRWYWx1ZSwgbnVsbCwgJyAgJyk7XG4gICAgdHJ5IHtcbiAgICAgIHdyaXRlRmlsZVN5bmModGFyZ2V0UGF0aCwgb3V0Z29pbmdKc29uLCBFTkNPRElORyk7XG4gICAgICBjb25zb2xlLmxvZyhgY29uZmlnL3NldDogU2F2ZWQgJHtuYW1lfSBjb25maWcgdG8gZGlza2ApO1xuICAgICAgY2FjaGVkVmFsdWUgPSBuZXdDYWNoZWRWYWx1ZTtcbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGlmICh0aHJvd09uRmlsZXN5c3RlbUVycm9ycykge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYGNvbmZpZy9zZXQ6IEZhaWxlZCB0byBzYXZlICR7bmFtZX0gY29uZmlnIHRvIGRpc2s7IG9ubHkgdXBkYXRpbmcgaW4tbWVtb3J5IGRhdGFgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlKCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKGBjb25maWcvcmVtb3ZlOiBEZWxldGluZyAke25hbWV9IGNvbmZpZyBmcm9tIGRpc2tgKTtcbiAgICB0cnkge1xuICAgICAgdW5saW5rU3luYyh0YXJnZXRQYXRoKTtcbiAgICAgIGNvbnNvbGUubG9nKGBjb25maWcvcmVtb3ZlOiBEZWxldGVkICR7bmFtZX0gY29uZmlnIGZyb20gZGlza2ApO1xuICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgY29uc3QgZXJyQ29kZTogdW5rbm93biA9IGdldChlcnIsICdjb2RlJyk7XG4gICAgICBpZiAodGhyb3dPbkZpbGVzeXN0ZW1FcnJvcnMpIHtcbiAgICAgICAgc3RyaWN0QXNzZXJ0KGVyckNvZGUgPT09ICdFTk9FTlQnLCAnRXhwZWN0ZWQgZGVsZXRpb24gb2Ygbm8gZmlsZScpO1xuICAgICAgICBjb25zb2xlLmxvZyhgY29uZmlnL3JlbW92ZTogTm8gJHtuYW1lfSBjb25maWcgb24gZGlzaywgZGlkIG5vdGhpbmdgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgY29uZmlnL3JlbW92ZTogR290ICR7U3RyaW5nKFxuICAgICAgICAgICAgZXJyQ29kZVxuICAgICAgICAgICl9IHdoZW4gcmVtb3ZpbmcgJHtuYW1lfSBjb25maWcgZnJvbSBkaXNrYFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBjYWNoZWRWYWx1ZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNldDogb3VyU2V0LFxuICAgIGdldDogb3VyR2V0LFxuICAgIHJlbW92ZSxcbiAgICBfZ2V0Q2FjaGVkVmFsdWU6ICgpID0+IGNhY2hlZFZhbHVlLFxuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGdCQUF3RDtBQUV4RCxvQkFBb0I7QUFDcEIsZ0JBQW9CO0FBQ3BCLG9CQUE2QjtBQVE3QixNQUFNLFdBQVc7QUFhVixlQUFlO0FBQUEsRUFDcEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBS2M7QUFFZCxNQUFJLGNBQWtDLHVCQUFPLE9BQU8sSUFBSTtBQUN4RCxNQUFJO0FBRUosTUFBSTtBQUNGLG1CQUFlLDRCQUFhLFlBQVksUUFBUTtBQUNoRCxrQkFBYyxlQUFlLEtBQUssTUFBTSxZQUFZLElBQUk7QUFDeEQsWUFBUSxJQUFJLGlDQUFpQyxrQkFBa0I7QUFFL0QsUUFBSSxDQUFDLGFBQWE7QUFDaEIsY0FBUSxJQUNOLGlCQUFpQix3REFDbkI7QUFDQSxvQkFBYyx1QkFBTyxPQUFPLElBQUk7QUFBQSxJQUNsQztBQUFBLEVBQ0YsU0FBUyxPQUFQO0FBQ0EsUUFBSSwyQkFBMkIsTUFBTSxTQUFTLFVBQVU7QUFDdEQsWUFBTTtBQUFBLElBQ1I7QUFFQSxRQUFJLGNBQWM7QUFDaEIsY0FBUSxJQUNOLGlCQUFpQixpREFDbkI7QUFBQSxJQUNGLE9BQU87QUFDTCxjQUFRLElBQ04sOEJBQThCLCtEQUNoQztBQUFBLElBQ0Y7QUFDQSxrQkFBYyx1QkFBTyxPQUFPLElBQUk7QUFBQSxFQUNsQztBQUVBLGtCQUFnQixTQUEwQjtBQUN4QyxXQUFPLHVCQUFJLGFBQWEsT0FBTztBQUFBLEVBQ2pDO0FBRlMsQUFJVCxrQkFBZ0IsU0FBaUIsT0FBc0I7QUFDckQsVUFBTSxpQkFBaUIsbUJBQUksU0FBUyxPQUFPLFdBQVc7QUFFdEQsWUFBUSxJQUFJLHNCQUFzQixxQkFBcUI7QUFFdkQsUUFBSSxDQUFDLHlCQUF5QjtBQUM1QixvQkFBYztBQUFBLElBQ2hCO0FBQ0EsVUFBTSxlQUFlLEtBQUssVUFBVSxnQkFBZ0IsTUFBTSxJQUFJO0FBQzlELFFBQUk7QUFDRixtQ0FBYyxZQUFZLGNBQWMsUUFBUTtBQUNoRCxjQUFRLElBQUkscUJBQXFCLHFCQUFxQjtBQUN0RCxvQkFBYztBQUFBLElBQ2hCLFNBQVMsS0FBUDtBQUNBLFVBQUkseUJBQXlCO0FBQzNCLGNBQU07QUFBQSxNQUNSLE9BQU87QUFDTCxnQkFBUSxLQUNOLDhCQUE4QixtREFDaEM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUF0QlMsQUF3QlQsb0JBQXdCO0FBQ3RCLFlBQVEsSUFBSSwyQkFBMkIsdUJBQXVCO0FBQzlELFFBQUk7QUFDRixnQ0FBVyxVQUFVO0FBQ3JCLGNBQVEsSUFBSSwwQkFBMEIsdUJBQXVCO0FBQUEsSUFDL0QsU0FBUyxLQUFQO0FBQ0EsWUFBTSxVQUFtQix1QkFBSSxLQUFLLE1BQU07QUFDeEMsVUFBSSx5QkFBeUI7QUFDM0Isd0NBQWEsWUFBWSxVQUFVLDhCQUE4QjtBQUNqRSxnQkFBUSxJQUFJLHFCQUFxQixrQ0FBa0M7QUFBQSxNQUNyRSxPQUFPO0FBQ0wsZ0JBQVEsS0FDTixzQkFBc0IsT0FDcEIsT0FDRixtQkFBbUIsdUJBQ3JCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxrQkFBYyx1QkFBTyxPQUFPLElBQUk7QUFBQSxFQUNsQztBQW5CUyxBQXFCVCxTQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTDtBQUFBLElBQ0EsaUJBQWlCLE1BQU07QUFBQSxFQUN6QjtBQUNGO0FBaEdnQiIsCiAgIm5hbWVzIjogW10KfQo=
