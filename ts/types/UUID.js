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
var UUID_exports = {};
__export(UUID_exports, {
  UUID: () => UUID,
  UUIDKind: () => UUIDKind,
  UUID_BYTE_SIZE: () => UUID_BYTE_SIZE,
  isValidUuid: () => isValidUuid
});
module.exports = __toCommonJS(UUID_exports);
var import_uuid = require("uuid");
var import_assert = require("../util/assert");
var UUIDKind = /* @__PURE__ */ ((UUIDKind2) => {
  UUIDKind2["ACI"] = "ACI";
  UUIDKind2["PNI"] = "PNI";
  UUIDKind2["Unknown"] = "Unknown";
  return UUIDKind2;
})(UUIDKind || {});
const UUID_BYTE_SIZE = 16;
const isValidUuid = /* @__PURE__ */ __name((value) => typeof value === "string" && /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(value), "isValidUuid");
class UUID {
  constructor(value) {
    this.value = value;
    (0, import_assert.strictAssert)(isValidUuid(value), `Invalid UUID: ${value}`);
  }
  toString() {
    return this.value;
  }
  isEqual(other) {
    return this.value === other.value;
  }
  static parse(value) {
    return new UUID(value);
  }
  static lookup(identifier) {
    const conversation = window.ConversationController.get(identifier);
    const uuid = conversation?.get("uuid");
    if (uuid === void 0) {
      return void 0;
    }
    return new UUID(uuid);
  }
  static checkedLookup(identifier) {
    const uuid = UUID.lookup(identifier);
    (0, import_assert.strictAssert)(uuid !== void 0, `Conversation ${identifier} not found or has no uuid`);
    return uuid;
  }
  static generate() {
    return new UUID((0, import_uuid.v4)());
  }
  static cast(value) {
    return new UUID(value.toLowerCase()).toString();
  }
  static fromPrefix(value) {
    let padded = value;
    while (padded.length < 8) {
      padded += "0";
    }
    return new UUID(`${padded}-0000-4000-8000-${"0".repeat(12)}`);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UUID,
  UUIDKind,
  UUID_BYTE_SIZE,
  isValidUuid
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVVVJRC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyB2NCBhcyBnZW5lcmF0ZVVVSUQgfSBmcm9tICd1dWlkJztcblxuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuXG5leHBvcnQgdHlwZSBVVUlEU3RyaW5nVHlwZSA9XG4gIGAke3N0cmluZ30tJHtzdHJpbmd9LSR7c3RyaW5nfS0ke3N0cmluZ30tJHtzdHJpbmd9YDtcblxuZXhwb3J0IGVudW0gVVVJREtpbmQge1xuICBBQ0kgPSAnQUNJJyxcbiAgUE5JID0gJ1BOSScsXG4gIFVua25vd24gPSAnVW5rbm93bicsXG59XG5cbmV4cG9ydCBjb25zdCBVVUlEX0JZVEVfU0laRSA9IDE2O1xuXG5leHBvcnQgY29uc3QgaXNWYWxpZFV1aWQgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBVVUlEU3RyaW5nVHlwZSA9PlxuICB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmXG4gIC9eWzAtOUEtRl17OH0tWzAtOUEtRl17NH0tNFswLTlBLUZdezN9LVs4OUFCXVswLTlBLUZdezN9LVswLTlBLUZdezEyfSQvaS50ZXN0KFxuICAgIHZhbHVlXG4gICk7XG5cbmV4cG9ydCBjbGFzcyBVVUlEIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IHZhbHVlOiBzdHJpbmcpIHtcbiAgICBzdHJpY3RBc3NlcnQoaXNWYWxpZFV1aWQodmFsdWUpLCBgSW52YWxpZCBVVUlEOiAke3ZhbHVlfWApO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IFVVSURTdHJpbmdUeXBlIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZSBhcyBVVUlEU3RyaW5nVHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBpc0VxdWFsKG90aGVyOiBVVUlEKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWUgPT09IG90aGVyLnZhbHVlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBwYXJzZSh2YWx1ZTogc3RyaW5nKTogVVVJRCB7XG4gICAgcmV0dXJuIG5ldyBVVUlEKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgbG9va3VwKGlkZW50aWZpZXI6IHN0cmluZyk6IFVVSUQgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChpZGVudGlmaWVyKTtcbiAgICBjb25zdCB1dWlkID0gY29udmVyc2F0aW9uPy5nZXQoJ3V1aWQnKTtcbiAgICBpZiAodXVpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVVVJRCh1dWlkKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY2hlY2tlZExvb2t1cChpZGVudGlmaWVyOiBzdHJpbmcpOiBVVUlEIHtcbiAgICBjb25zdCB1dWlkID0gVVVJRC5sb29rdXAoaWRlbnRpZmllcik7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgdXVpZCAhPT0gdW5kZWZpbmVkLFxuICAgICAgYENvbnZlcnNhdGlvbiAke2lkZW50aWZpZXJ9IG5vdCBmb3VuZCBvciBoYXMgbm8gdXVpZGBcbiAgICApO1xuICAgIHJldHVybiB1dWlkO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZW5lcmF0ZSgpOiBVVUlEIHtcbiAgICByZXR1cm4gbmV3IFVVSUQoZ2VuZXJhdGVVVUlEKCkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjYXN0KHZhbHVlOiBVVUlEU3RyaW5nVHlwZSk6IG5ldmVyO1xuICBwdWJsaWMgc3RhdGljIGNhc3QodmFsdWU6IHN0cmluZyk6IFVVSURTdHJpbmdUeXBlO1xuXG4gIHB1YmxpYyBzdGF0aWMgY2FzdCh2YWx1ZTogc3RyaW5nKTogVVVJRFN0cmluZ1R5cGUge1xuICAgIHJldHVybiBuZXcgVVVJRCh2YWx1ZS50b0xvd2VyQ2FzZSgpKS50b1N0cmluZygpO1xuICB9XG5cbiAgLy8gRm9yIHRlc3RpbmdcbiAgcHVibGljIHN0YXRpYyBmcm9tUHJlZml4KHZhbHVlOiBzdHJpbmcpOiBVVUlEIHtcbiAgICBsZXQgcGFkZGVkID0gdmFsdWU7XG4gICAgd2hpbGUgKHBhZGRlZC5sZW5ndGggPCA4KSB7XG4gICAgICBwYWRkZWQgKz0gJzAnO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFVVSUQoYCR7cGFkZGVkfS0wMDAwLTQwMDAtODAwMC0keycwJy5yZXBlYXQoMTIpfWApO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esa0JBQW1DO0FBRW5DLG9CQUE2QjtBQUt0QixJQUFLLFdBQUwsa0JBQUssY0FBTDtBQUNMLHFCQUFNO0FBQ04scUJBQU07QUFDTix5QkFBVTtBQUhBO0FBQUE7QUFNTCxNQUFNLGlCQUFpQjtBQUV2QixNQUFNLGNBQWMsd0JBQUMsVUFDMUIsT0FBTyxVQUFVLFlBQ2pCLHlFQUF5RSxLQUN2RSxLQUNGLEdBSnlCO0FBTXBCLE1BQU0sS0FBSztBQUFBLEVBQ2hCLFlBQStCLE9BQWU7QUFBZjtBQUM3QixvQ0FBYSxZQUFZLEtBQUssR0FBRyxpQkFBaUIsT0FBTztBQUFBLEVBQzNEO0FBQUEsRUFFTyxXQUEyQjtBQUNoQyxXQUFPLEtBQUs7QUFBQSxFQUNkO0FBQUEsRUFFTyxRQUFRLE9BQXNCO0FBQ25DLFdBQU8sS0FBSyxVQUFVLE1BQU07QUFBQSxFQUM5QjtBQUFBLFNBRWMsTUFBTSxPQUFxQjtBQUN2QyxXQUFPLElBQUksS0FBSyxLQUFLO0FBQUEsRUFDdkI7QUFBQSxTQUVjLE9BQU8sWUFBc0M7QUFDekQsVUFBTSxlQUFlLE9BQU8sdUJBQXVCLElBQUksVUFBVTtBQUNqRSxVQUFNLE9BQU8sY0FBYyxJQUFJLE1BQU07QUFDckMsUUFBSSxTQUFTLFFBQVc7QUFDdEIsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPLElBQUksS0FBSyxJQUFJO0FBQUEsRUFDdEI7QUFBQSxTQUVjLGNBQWMsWUFBMEI7QUFDcEQsVUFBTSxPQUFPLEtBQUssT0FBTyxVQUFVO0FBQ25DLG9DQUNFLFNBQVMsUUFDVCxnQkFBZ0IscUNBQ2xCO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFBQSxTQUVjLFdBQWlCO0FBQzdCLFdBQU8sSUFBSSxLQUFLLG9CQUFhLENBQUM7QUFBQSxFQUNoQztBQUFBLFNBS2MsS0FBSyxPQUErQjtBQUNoRCxXQUFPLElBQUksS0FBSyxNQUFNLFlBQVksQ0FBQyxFQUFFLFNBQVM7QUFBQSxFQUNoRDtBQUFBLFNBR2MsV0FBVyxPQUFxQjtBQUM1QyxRQUFJLFNBQVM7QUFDYixXQUFPLE9BQU8sU0FBUyxHQUFHO0FBQ3hCLGdCQUFVO0FBQUEsSUFDWjtBQUNBLFdBQU8sSUFBSSxLQUFLLEdBQUcseUJBQXlCLElBQUksT0FBTyxFQUFFLEdBQUc7QUFBQSxFQUM5RDtBQUNGO0FBdkRPIiwKICAibmFtZXMiOiBbXQp9Cg==
