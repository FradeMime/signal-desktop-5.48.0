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
var fileToBytes_exports = {};
__export(fileToBytes_exports, {
  fileToBytes: () => fileToBytes
});
module.exports = __toCommonJS(fileToBytes_exports);
function fileToBytes(file) {
  return new Promise((resolve, rejectPromise) => {
    const FR = new FileReader();
    FR.onload = () => {
      if (!FR.result || typeof FR.result === "string") {
        rejectPromise(new Error("bytesFromFile: No result!"));
        return;
      }
      resolve(new Uint8Array(FR.result));
    };
    FR.onerror = rejectPromise;
    FR.onabort = rejectPromise;
    FR.readAsArrayBuffer(file);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fileToBytes
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZmlsZVRvQnl0ZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbGVUb0J5dGVzKGZpbGU6IEJsb2IpOiBQcm9taXNlPFVpbnQ4QXJyYXk+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3RQcm9taXNlKSA9PiB7XG4gICAgY29uc3QgRlIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIEZSLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGlmICghRlIucmVzdWx0IHx8IHR5cGVvZiBGUi5yZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJlamVjdFByb21pc2UobmV3IEVycm9yKCdieXRlc0Zyb21GaWxlOiBObyByZXN1bHQhJykpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXNvbHZlKG5ldyBVaW50OEFycmF5KEZSLnJlc3VsdCkpO1xuICAgIH07XG4gICAgRlIub25lcnJvciA9IHJlamVjdFByb21pc2U7XG4gICAgRlIub25hYm9ydCA9IHJlamVjdFByb21pc2U7XG4gICAgRlIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSk7XG4gIH0pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdPLHFCQUFxQixNQUFpQztBQUMzRCxTQUFPLElBQUksUUFBUSxDQUFDLFNBQVMsa0JBQWtCO0FBQzdDLFVBQU0sS0FBSyxJQUFJLFdBQVc7QUFDMUIsT0FBRyxTQUFTLE1BQU07QUFDaEIsVUFBSSxDQUFDLEdBQUcsVUFBVSxPQUFPLEdBQUcsV0FBVyxVQUFVO0FBQy9DLHNCQUFjLElBQUksTUFBTSwyQkFBMkIsQ0FBQztBQUNwRDtBQUFBLE1BQ0Y7QUFDQSxjQUFRLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQztBQUFBLElBQ25DO0FBQ0EsT0FBRyxVQUFVO0FBQ2IsT0FBRyxVQUFVO0FBQ2IsT0FBRyxrQkFBa0IsSUFBSTtBQUFBLEVBQzNCLENBQUM7QUFDSDtBQWRnQiIsCiAgIm5hbWVzIjogW10KfQo=
