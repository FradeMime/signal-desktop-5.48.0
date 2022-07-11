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
var awaitObject_exports = {};
__export(awaitObject_exports, {
  awaitObject: () => awaitObject
});
module.exports = __toCommonJS(awaitObject_exports);
async function awaitObject(settings) {
  const keys = Object.keys(settings);
  const promises = new Array();
  for (const key of keys) {
    promises.push(settings[key]);
  }
  const values = await Promise.all(promises);
  const result = {};
  for (const [i, key] of keys.entries()) {
    result[key] = values[i];
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  awaitObject
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXdhaXRPYmplY3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGF3YWl0T2JqZWN0PFxuICBSZXN1bHQgZXh0ZW5kcyB7IFtrZXk6IHN0cmluZ106IHVua25vd24gfVxuPihzZXR0aW5nczoge1xuICBba2V5IGluIGtleW9mIFJlc3VsdF06IFByb21pc2U8UmVzdWx0W2tleV0+O1xufSk6IFByb21pc2U8UmVzdWx0PiB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzZXR0aW5ncyk7XG4gIGNvbnN0IHByb21pc2VzID0gbmV3IEFycmF5PFByb21pc2U8dW5rbm93bj4+KCk7XG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICBwcm9taXNlcy5wdXNoKHNldHRpbmdzW2tleSBhcyBrZXlvZiBSZXN1bHRdIGFzIFByb21pc2U8dW5rbm93bj4pO1xuICB9XG5cbiAgY29uc3QgdmFsdWVzID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIGNvbnN0IHJlc3VsdDogYW55ID0ge307XG4gIGZvciAoY29uc3QgW2ksIGtleV0gb2Yga2V5cy5lbnRyaWVzKCkpIHtcbiAgICByZXN1bHRba2V5XSA9IHZhbHVlc1tpXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLDJCQUVFLFVBRWtCO0FBQ2xCLFFBQU0sT0FBTyxPQUFPLEtBQUssUUFBUTtBQUNqQyxRQUFNLFdBQVcsSUFBSSxNQUF3QjtBQUM3QyxhQUFXLE9BQU8sTUFBTTtBQUN0QixhQUFTLEtBQUssU0FBUyxJQUF3QztBQUFBLEVBQ2pFO0FBRUEsUUFBTSxTQUFTLE1BQU0sUUFBUSxJQUFJLFFBQVE7QUFHekMsUUFBTSxTQUFjLENBQUM7QUFDckIsYUFBVyxDQUFDLEdBQUcsUUFBUSxLQUFLLFFBQVEsR0FBRztBQUNyQyxXQUFPLE9BQU8sT0FBTztBQUFBLEVBQ3ZCO0FBQ0EsU0FBTztBQUNUO0FBbkJzQiIsCiAgIm5hbWVzIjogW10KfQo=
