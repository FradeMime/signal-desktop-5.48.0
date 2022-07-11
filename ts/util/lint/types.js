var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var types_exports = {};
__export(types_exports, {
  REASONS: () => REASONS
});
module.exports = __toCommonJS(types_exports);
const REASONS = [
  "falseMatch",
  "testCode",
  "exampleCode",
  "otherUtilityCode",
  "regexMatchedSafeCode",
  "notExercisedByOurApp",
  "ruleNeeded",
  "usageTrusted"
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  REASONS
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHlwZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vLyBUb29sIHJlcXVpcmVtZW50czpcbi8vICAgLSBGZWVkIGl0IGEgc2V0IG9mIHJlZ3VsYXIgZXhwcmVzc2lvbnMgd2l0aCBkZXNjcmlwdGlvbnMgYXMgdG8gd2hhdCB0aGUgcmlza3MgYXJlXG4vLyAgIC0gRmVlZCBpdCBhbHNvIGEgc2V0IG9mIGV4Y2VwdGlvbnNcbi8vICAgLSBJdCB3b3VsZCB0ZWxsIHVzIGlmIHRoZXJlIHdlcmUgYW55IG5ldyBtYXRjaGVzIHRoYXQgZGlkbid0IGFscmVhZHkgaGF2ZSBleGNlcHRpb25zXG4vL1xuLy8gUnVsZXM6XG4vLyB7XG4vLyAgIFwibmFtZVwiOiBcInJ1bGUtbmFtZVwiLFxuLy8gICBcImV4cHJlc3Npb25cIjogXCJecmVnZXgtYXMtc3RyaW5nJFwiLFxuLy8gICBcInJlYXNvblwiOiBcIlJlYXNvbiB0aGF0IHRoaXMgZXhwcmVzc2lvbiBpcyBkYW5nZXJvdXNcIlxuLy8gfVxuLy9cbi8vIENhdGVnb3JpZXMgb2YgcmVhc29ucyAtIGxvdyB0byBoaWdoIHJpc2s6XG4vLyAgIFwiZmFsc2VNYXRjaFwiXG4vLyAgIFwidGVzdENvZGVcIlxuLy8gICBcImV4YW1wbGVDb2RlXCJcbi8vICAgXCJvdGhlclV0aWxpdHlDb2RlXCJcbi8vICAgXCJyZWdleE1hdGNoZWRTYWZlQ29kZVwiXG4vLyAgIFwibm90RXhlcmNpc2VkQnlPdXJBcHBcIlxuLy8gICBcInJ1bGVOZWVkZWRcIlxuLy8gICBcInVzYWdlVHJ1c3RlZFwiXG4vL1xuLy8gRXhjZXB0aW9uczpcbi8vIFt7XG4vLyAgIFwicnVsZVwiOiBcInJ1bGUtbmFtZVwiLFxuLy8gICBcInBhdGhcIjogXCJwYXRoL3RvL2ZpbGVuYW1lLmpzXCIsXG4vLyAgIFwibGluZU51bWJlclwiOiA0NSxcbi8vICAgXCJyZWFzb25DYXRlZ29yeVwiOiBcIjxjYXRlZ29yeSBmcm9tIGxpc3QgYWJvdmU+XCIsXG4vLyAgIFwidXBkYXRlZFwiOiBcIjIwMTgtMDktMDhUMDA6MjE6MTMuMTgwWlwiLFxuLy8gICBcInJlYXNvbkRldGFpbFwiOiBcIjxPcHRpb25hbCBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIGFib3V0IHdoeSB0aGlzIGlzIG9rYXk+XCJcbi8vIH1dXG4vL1xuLy8gV2hlbiB0aGUgdG9vbCBmaW5kcyBpc3N1ZXMgaXQgb3V0cHV0cyB0aGVtIGluIGV4Y2VwdGlvbiBmb3JtYXQgdG8gbWFrZSBpdCBlYXN5IHRvIGFkZFxuLy8gICB0byB0aGUgZXhjZXB0aW9ucy5qc29uIGZpbGVcblxuZXhwb3J0IGNvbnN0IFJFQVNPTlMgPSBbXG4gICdmYWxzZU1hdGNoJyxcbiAgJ3Rlc3RDb2RlJyxcbiAgJ2V4YW1wbGVDb2RlJyxcbiAgJ290aGVyVXRpbGl0eUNvZGUnLFxuICAncmVnZXhNYXRjaGVkU2FmZUNvZGUnLFxuICAnbm90RXhlcmNpc2VkQnlPdXJBcHAnLFxuICAncnVsZU5lZWRlZCcsXG4gICd1c2FnZVRydXN0ZWQnLFxuXTtcblxuZXhwb3J0IHR5cGUgUnVsZVR5cGUgPSB7XG4gIG5hbWU6IHN0cmluZztcbiAgZXhwcmVzc2lvbj86IHN0cmluZztcbiAgcmVhc29uOiBzdHJpbmc7XG4gIHJlZ2V4OiBSZWdFeHA7XG4gIGV4Y2x1ZGVkTW9kdWxlcz86IEFycmF5PHN0cmluZz47XG59O1xuXG5leHBvcnQgdHlwZSBFeGNlcHRpb25UeXBlID0ge1xuICBydWxlOiBzdHJpbmc7XG4gIHBhdGg6IHN0cmluZztcbiAgbGluZT86IHN0cmluZztcbiAgcmVhc29uQ2F0ZWdvcnk6IHN0cmluZztcbiAgdXBkYXRlZDogc3RyaW5nO1xuICByZWFzb25EZXRhaWw6IHN0cmluZztcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFzQ08sTUFBTSxVQUFVO0FBQUEsRUFDckI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
