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
var assignWithNoUnnecessaryAllocation_exports = {};
__export(assignWithNoUnnecessaryAllocation_exports, {
  assignWithNoUnnecessaryAllocation: () => assignWithNoUnnecessaryAllocation
});
module.exports = __toCommonJS(assignWithNoUnnecessaryAllocation_exports);
var import_lodash = require("lodash");
function assignWithNoUnnecessaryAllocation(obj, source) {
  for (const key in source) {
    if (!(0, import_lodash.has)(source, key)) {
      continue;
    }
    if (!(key in obj) || obj[key] !== source[key]) {
      return { ...obj, ...source };
    }
  }
  return obj;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assignWithNoUnnecessaryAllocation
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXNzaWduV2l0aE5vVW5uZWNlc3NhcnlBbGxvY2F0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgaGFzIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYE9iamVjdC5hc3NpZ25gIGJ1dCB3b24ndCBjcmVhdGUgYSBuZXcgb2JqZWN0IGlmIHdlIGRvbid0IG5lZWRcbiAqIHRvLiBUaGlzIGlzIHB1cmVseSBhIHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbi5cbiAqXG4gKiBUaGlzIGlzIHVzZWZ1bCBpbiBwbGFjZXMgd2hlcmUgd2UgZG9uJ3Qgd2FudCB0byBjcmVhdGUgYSBuZXcgb2JqZWN0IHVubmVjZXNzYXJpbHksXG4gKiBsaWtlIGluIHJlZHVjZXJzIHdoZXJlIHdlIG1pZ2h0IGNhdXNlIGFuIHVubmVjZXNzYXJ5IHJlLXJlbmRlci5cbiAqXG4gKiBTZWUgdGhlIHRlc3RzIGZvciB0aGUgc3BlY2lmaWNzIG9mIGhvdyB0aGlzIHdvcmtzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduV2l0aE5vVW5uZWNlc3NhcnlBbGxvY2F0aW9uPFQgZXh0ZW5kcyBvYmplY3Q+KFxuICBvYmo6IFJlYWRvbmx5PFQ+LFxuICBzb3VyY2U6IFJlYWRvbmx5PFBhcnRpYWw8VD4+XG4pOiBUIHtcbiAgLy8gV2Ugd2FudCB0byBiYWlsIGVhcmx5IHNvIHdlIHVzZSBgZm9yIC4uIGluYCBpbnN0ZWFkIG9mIGBPYmplY3Qua2V5c2Agb3Igc2ltaWxhci5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gIGZvciAoY29uc3Qga2V5IGluIHNvdXJjZSkge1xuICAgIGlmICghaGFzKHNvdXJjZSwga2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICghKGtleSBpbiBvYmopIHx8IG9ialtrZXldICE9PSBzb3VyY2Vba2V5XSkge1xuICAgICAgcmV0dXJuIHsgLi4ub2JqLCAuLi5zb3VyY2UgfTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBb0I7QUFXYiwyQ0FDTCxLQUNBLFFBQ0c7QUFHSCxhQUFXLE9BQU8sUUFBUTtBQUN4QixRQUFJLENBQUMsdUJBQUksUUFBUSxHQUFHLEdBQUc7QUFDckI7QUFBQSxJQUNGO0FBQ0EsUUFBSSxDQUFFLFFBQU8sUUFBUSxJQUFJLFNBQVMsT0FBTyxNQUFNO0FBQzdDLGFBQU8sS0FBSyxRQUFRLE9BQU87QUFBQSxJQUM3QjtBQUFBLEVBQ0Y7QUFDQSxTQUFPO0FBQ1Q7QUFmZ0IiLAogICJuYW1lcyI6IFtdCn0K
