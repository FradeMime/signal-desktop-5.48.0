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
var indexeddb_exports = {};
__export(indexeddb_exports, {
  doesDatabaseExist: () => doesDatabaseExist,
  removeDatabase: () => removeDatabase
});
module.exports = __toCommonJS(indexeddb_exports);
const LEGACY_DATABASE_ID = "signal";
async function doesDatabaseExist() {
  window.SignalContext.log.info("Checking for the existence of IndexedDB data...");
  return new Promise((resolve, reject) => {
    const req = window.indexedDB.open(LEGACY_DATABASE_ID);
    let existed = true;
    let timer = setTimeout(() => {
      window.SignalContext.log.warn("doesDatabaseExist: Timed out attempting to check IndexedDB status");
      return resolve(false);
    }, 1e3);
    const clearTimer = /* @__PURE__ */ __name(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        timer = void 0;
      }
    }, "clearTimer");
    req.onerror = (error) => {
      clearTimer();
      reject(error);
    };
    req.onsuccess = () => {
      clearTimer();
      req.result.close();
      resolve(existed);
    };
    req.onupgradeneeded = () => {
      if (req.result.version === 1) {
        existed = false;
        window.indexedDB.deleteDatabase(LEGACY_DATABASE_ID);
      }
    };
  });
}
function removeDatabase() {
  window.SignalContext.log.info(`Deleting IndexedDB database '${LEGACY_DATABASE_ID}'`);
  window.indexedDB.deleteDatabase(LEGACY_DATABASE_ID);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  doesDatabaseExist,
  removeDatabase
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaW5kZXhlZGRiLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuY29uc3QgTEVHQUNZX0RBVEFCQVNFX0lEID0gJ3NpZ25hbCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb2VzRGF0YWJhc2VFeGlzdCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgd2luZG93LlNpZ25hbENvbnRleHQubG9nLmluZm8oXG4gICAgJ0NoZWNraW5nIGZvciB0aGUgZXhpc3RlbmNlIG9mIEluZGV4ZWREQiBkYXRhLi4uJ1xuICApO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHJlcSA9IHdpbmRvdy5pbmRleGVkREIub3BlbihMRUdBQ1lfREFUQUJBU0VfSUQpO1xuXG4gICAgbGV0IGV4aXN0ZWQgPSB0cnVlO1xuXG4gICAgbGV0IHRpbWVyOiB1bmRlZmluZWQgfCBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgd2luZG93LlNpZ25hbENvbnRleHQubG9nLndhcm4oXG4gICAgICAgICdkb2VzRGF0YWJhc2VFeGlzdDogVGltZWQgb3V0IGF0dGVtcHRpbmcgdG8gY2hlY2sgSW5kZXhlZERCIHN0YXR1cydcbiAgICAgICk7XG4gICAgICByZXR1cm4gcmVzb2x2ZShmYWxzZSk7XG4gICAgfSwgMTAwMCk7XG5cbiAgICBjb25zdCBjbGVhclRpbWVyID0gKCkgPT4ge1xuICAgICAgaWYgKHRpbWVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgdGltZXIgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJlcS5vbmVycm9yID0gZXJyb3IgPT4ge1xuICAgICAgY2xlYXJUaW1lcigpO1xuICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICB9O1xuICAgIHJlcS5vbnN1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVyKCk7XG4gICAgICByZXEucmVzdWx0LmNsb3NlKCk7XG4gICAgICByZXNvbHZlKGV4aXN0ZWQpO1xuICAgIH07XG4gICAgcmVxLm9udXBncmFkZW5lZWRlZCA9ICgpID0+IHtcbiAgICAgIGlmIChyZXEucmVzdWx0LnZlcnNpb24gPT09IDEpIHtcbiAgICAgICAgZXhpc3RlZCA9IGZhbHNlO1xuICAgICAgICB3aW5kb3cuaW5kZXhlZERCLmRlbGV0ZURhdGFiYXNlKExFR0FDWV9EQVRBQkFTRV9JRCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVEYXRhYmFzZSgpOiB2b2lkIHtcbiAgd2luZG93LlNpZ25hbENvbnRleHQubG9nLmluZm8oXG4gICAgYERlbGV0aW5nIEluZGV4ZWREQiBkYXRhYmFzZSAnJHtMRUdBQ1lfREFUQUJBU0VfSUR9J2BcbiAgKTtcbiAgd2luZG93LmluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShMRUdBQ1lfREFUQUJBU0VfSUQpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsTUFBTSxxQkFBcUI7QUFFM0IsbUNBQTREO0FBQzFELFNBQU8sY0FBYyxJQUFJLEtBQ3ZCLGlEQUNGO0FBQ0EsU0FBTyxJQUFJLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFDdEMsVUFBTSxNQUFNLE9BQU8sVUFBVSxLQUFLLGtCQUFrQjtBQUVwRCxRQUFJLFVBQVU7QUFFZCxRQUFJLFFBQW1ELFdBQVcsTUFBTTtBQUN0RSxhQUFPLGNBQWMsSUFBSSxLQUN2QixtRUFDRjtBQUNBLGFBQU8sUUFBUSxLQUFLO0FBQUEsSUFDdEIsR0FBRyxHQUFJO0FBRVAsVUFBTSxhQUFhLDZCQUFNO0FBQ3ZCLFVBQUksVUFBVSxRQUFXO0FBQ3ZCLHFCQUFhLEtBQUs7QUFDbEIsZ0JBQVE7QUFBQSxNQUNWO0FBQUEsSUFDRixHQUxtQjtBQU9uQixRQUFJLFVBQVUsV0FBUztBQUNyQixpQkFBVztBQUNYLGFBQU8sS0FBSztBQUFBLElBQ2Q7QUFDQSxRQUFJLFlBQVksTUFBTTtBQUNwQixpQkFBVztBQUNYLFVBQUksT0FBTyxNQUFNO0FBQ2pCLGNBQVEsT0FBTztBQUFBLElBQ2pCO0FBQ0EsUUFBSSxrQkFBa0IsTUFBTTtBQUMxQixVQUFJLElBQUksT0FBTyxZQUFZLEdBQUc7QUFDNUIsa0JBQVU7QUFDVixlQUFPLFVBQVUsZUFBZSxrQkFBa0I7QUFBQSxNQUNwRDtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFDSDtBQXZDc0IsQUF5Q2YsMEJBQWdDO0FBQ3JDLFNBQU8sY0FBYyxJQUFJLEtBQ3ZCLGdDQUFnQyxxQkFDbEM7QUFDQSxTQUFPLFVBQVUsZUFBZSxrQkFBa0I7QUFDcEQ7QUFMZ0IiLAogICJuYW1lcyI6IFtdCn0K
