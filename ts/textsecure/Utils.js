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
var Utils_exports = {};
__export(Utils_exports, {
  handleStatusCode: () => handleStatusCode,
  translateError: () => translateError
});
module.exports = __toCommonJS(Utils_exports);
var log = __toESM(require("../logging/log"));
async function handleStatusCode(status) {
  if (status === 499) {
    log.error("Got 499 from Signal Server. Build is expired.");
    await window.storage.put("remoteBuildExpiration", Date.now());
    window.reduxActions.expiration.hydrateExpirationStatus(true);
  }
}
function translateError(error) {
  const { code } = error;
  if (code === 200) {
    return void 0;
  }
  let message;
  switch (code) {
    case -1:
      message = "Failed to connect to the server, please check your network connection.";
      break;
    case 413:
    case 429:
      message = "Rate limit exceeded, please try again later.";
      break;
    case 403:
      message = "Invalid code, please try again.";
      break;
    case 417:
      message = "Number already registered.";
      break;
    case 401:
      message = "Invalid authentication, most likely someone re-registered and invalidated our registration.";
      break;
    case 404:
      message = "Number is not registered.";
      break;
    default:
      message = "The server rejected our query, please file a bug report.";
  }
  error.message = `${message} (original: ${error.message})`;
  return error;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleStatusCode,
  translateError
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVXRpbHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHR5cGUgeyBIVFRQRXJyb3IgfSBmcm9tICcuL0Vycm9ycyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVTdGF0dXNDb2RlKHN0YXR1czogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmIChzdGF0dXMgPT09IDQ5OSkge1xuICAgIGxvZy5lcnJvcignR290IDQ5OSBmcm9tIFNpZ25hbCBTZXJ2ZXIuIEJ1aWxkIGlzIGV4cGlyZWQuJyk7XG4gICAgYXdhaXQgd2luZG93LnN0b3JhZ2UucHV0KCdyZW1vdGVCdWlsZEV4cGlyYXRpb24nLCBEYXRlLm5vdygpKTtcbiAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmV4cGlyYXRpb24uaHlkcmF0ZUV4cGlyYXRpb25TdGF0dXModHJ1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZUVycm9yKGVycm9yOiBIVFRQRXJyb3IpOiBIVFRQRXJyb3IgfCB1bmRlZmluZWQge1xuICBjb25zdCB7IGNvZGUgfSA9IGVycm9yO1xuICBpZiAoY29kZSA9PT0gMjAwKSB7XG4gICAgLy8gSGFwcGVucyBzb21ldGltZXMgd2hlbiB3ZSBnZXQgbm8gcmVzcG9uc2UuIE1pZ2h0IGJlIG5pY2UgdG8gZ2V0IDIwNCBpbnN0ZWFkLlxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgbGV0IG1lc3NhZ2U6IHN0cmluZztcbiAgc3dpdGNoIChjb2RlKSB7XG4gICAgY2FzZSAtMTpcbiAgICAgIG1lc3NhZ2UgPVxuICAgICAgICAnRmFpbGVkIHRvIGNvbm5lY3QgdG8gdGhlIHNlcnZlciwgcGxlYXNlIGNoZWNrIHlvdXIgbmV0d29yayBjb25uZWN0aW9uLic7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDQxMzpcbiAgICBjYXNlIDQyOTpcbiAgICAgIG1lc3NhZ2UgPSAnUmF0ZSBsaW1pdCBleGNlZWRlZCwgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlci4nO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA0MDM6XG4gICAgICBtZXNzYWdlID0gJ0ludmFsaWQgY29kZSwgcGxlYXNlIHRyeSBhZ2Fpbi4nO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA0MTc6XG4gICAgICBtZXNzYWdlID0gJ051bWJlciBhbHJlYWR5IHJlZ2lzdGVyZWQuJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNDAxOlxuICAgICAgbWVzc2FnZSA9XG4gICAgICAgICdJbnZhbGlkIGF1dGhlbnRpY2F0aW9uLCBtb3N0IGxpa2VseSBzb21lb25lIHJlLXJlZ2lzdGVyZWQgYW5kIGludmFsaWRhdGVkIG91ciByZWdpc3RyYXRpb24uJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNDA0OlxuICAgICAgbWVzc2FnZSA9ICdOdW1iZXIgaXMgbm90IHJlZ2lzdGVyZWQuJztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBtZXNzYWdlID0gJ1RoZSBzZXJ2ZXIgcmVqZWN0ZWQgb3VyIHF1ZXJ5LCBwbGVhc2UgZmlsZSBhIGJ1ZyByZXBvcnQuJztcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZXJyb3IubWVzc2FnZSA9IGAke21lc3NhZ2V9IChvcmlnaW5hbDogJHtlcnJvci5tZXNzYWdlfSlgO1xuICByZXR1cm4gZXJyb3I7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxVQUFxQjtBQUdyQixnQ0FBdUMsUUFBK0I7QUFDcEUsTUFBSSxXQUFXLEtBQUs7QUFDbEIsUUFBSSxNQUFNLCtDQUErQztBQUN6RCxVQUFNLE9BQU8sUUFBUSxJQUFJLHlCQUF5QixLQUFLLElBQUksQ0FBQztBQUM1RCxXQUFPLGFBQWEsV0FBVyx3QkFBd0IsSUFBSTtBQUFBLEVBQzdEO0FBQ0Y7QUFOc0IsQUFRZix3QkFBd0IsT0FBeUM7QUFDdEUsUUFBTSxFQUFFLFNBQVM7QUFDakIsTUFBSSxTQUFTLEtBQUs7QUFFaEIsV0FBTztBQUFBLEVBQ1Q7QUFDQSxNQUFJO0FBQ0osVUFBUTtBQUFBLFNBQ0Q7QUFDSCxnQkFDRTtBQUNGO0FBQUEsU0FDRztBQUFBLFNBQ0E7QUFDSCxnQkFBVTtBQUNWO0FBQUEsU0FDRztBQUNILGdCQUFVO0FBQ1Y7QUFBQSxTQUNHO0FBQ0gsZ0JBQVU7QUFDVjtBQUFBLFNBQ0c7QUFDSCxnQkFDRTtBQUNGO0FBQUEsU0FDRztBQUNILGdCQUFVO0FBQ1Y7QUFBQTtBQUVBLGdCQUFVO0FBQUE7QUFHZCxRQUFNLFVBQVUsR0FBRyxzQkFBc0IsTUFBTTtBQUMvQyxTQUFPO0FBQ1Q7QUFuQ2dCIiwKICAibmFtZXMiOiBbXQp9Cg==
