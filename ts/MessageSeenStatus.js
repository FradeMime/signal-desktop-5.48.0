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
var MessageSeenStatus_exports = {};
__export(MessageSeenStatus_exports, {
  SeenStatus: () => SeenStatus,
  maxSeenStatus: () => maxSeenStatus
});
module.exports = __toCommonJS(MessageSeenStatus_exports);
var SeenStatus = /* @__PURE__ */ ((SeenStatus2) => {
  SeenStatus2[SeenStatus2["NotApplicable"] = 0] = "NotApplicable";
  SeenStatus2[SeenStatus2["Unseen"] = 1] = "Unseen";
  SeenStatus2[SeenStatus2["Seen"] = 2] = "Seen";
  return SeenStatus2;
})(SeenStatus || {});
const STATUS_NUMBERS = {
  [0 /* NotApplicable */]: 0,
  [1 /* Unseen */]: 1,
  [2 /* Seen */]: 2
};
const maxSeenStatus = /* @__PURE__ */ __name((a, b) => STATUS_NUMBERS[a] > STATUS_NUMBERS[b] ? a : b, "maxSeenStatus");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SeenStatus,
  maxSeenStatus
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZVNlZW5TdGF0dXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyoqXG4gKiBgU2VlblN0YXR1c2AgcmVwcmVzZW50cyBlaXRoZXIgdGhlIGlkZWEgdGhhdCBhIG1lc3NhZ2UgZG9lc24ndCBuZWVkIHRvIHRyYWNrIGl0cyBzZWVuXG4gKiBzdGF0dXMsIG9yIHRoZSBzdGFuZGFyZCB1bnNlZW4vc2VlbiBzdGF0dXMgcGFpci5cbiAqXG4gKiBVbnNlZW4gaXMgYSBsb3QgbGlrZSB1bnJlYWQgLSBleGNlcHQgdGhhdCB1bnNlZW4gbWVzc2FnZXMgb25seSBhZmZlY3QgdGhlIHBsYWNlbWVudFxuICogb2YgdGhlIGxhc3Qgc2VlbiBpbmRpY2F0b3IgYW5kIHRoZSBjb3VudCBpdCBzaG93cy4gVW5yZWFkIG1lc3NhZ2VzIHdpbGwgYWZmZWN0IHRoZVxuICogbGVmdCBwYW5lIGJhZGdpbmcgZm9yIGNvbnZlcnNhdGlvbnMsIGFzIHdlbGwgYXMgdGhlIG92ZXJhbGwgYmFkZ2UgY291bnQgb24gdGhlIGFwcC5cbiAqL1xuZXhwb3J0IGVudW0gU2VlblN0YXR1cyB7XG4gIE5vdEFwcGxpY2FibGUgPSAwLFxuICBVbnNlZW4gPSAxLFxuICBTZWVuID0gMixcbn1cblxuY29uc3QgU1RBVFVTX05VTUJFUlM6IFJlY29yZDxTZWVuU3RhdHVzLCBudW1iZXI+ID0ge1xuICBbU2VlblN0YXR1cy5Ob3RBcHBsaWNhYmxlXTogMCxcbiAgW1NlZW5TdGF0dXMuVW5zZWVuXTogMSxcbiAgW1NlZW5TdGF0dXMuU2Vlbl06IDIsXG59O1xuXG5leHBvcnQgY29uc3QgbWF4U2VlblN0YXR1cyA9IChhOiBTZWVuU3RhdHVzLCBiOiBTZWVuU3RhdHVzKTogU2VlblN0YXR1cyA9PlxuICBTVEFUVVNfTlVNQkVSU1thXSA+IFNUQVRVU19OVU1CRVJTW2JdID8gYSA6IGI7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXTyxJQUFLLGFBQUwsa0JBQUssZ0JBQUw7QUFDTCw2Q0FBZ0IsS0FBaEI7QUFDQSxzQ0FBUyxLQUFUO0FBQ0Esb0NBQU8sS0FBUDtBQUhVO0FBQUE7QUFNWixNQUFNLGlCQUE2QztBQUFBLEdBQ2hELHdCQUEyQjtBQUFBLEdBQzNCLGlCQUFvQjtBQUFBLEdBQ3BCLGVBQWtCO0FBQ3JCO0FBRU8sTUFBTSxnQkFBZ0Isd0JBQUMsR0FBZSxNQUMzQyxlQUFlLEtBQUssZUFBZSxLQUFLLElBQUksR0FEakI7IiwKICAibmFtZXMiOiBbXQp9Cg==
