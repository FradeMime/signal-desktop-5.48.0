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
var markAllAsApproved_exports = {};
__export(markAllAsApproved_exports, {
  markAllAsApproved: () => markAllAsApproved
});
module.exports = __toCommonJS(markAllAsApproved_exports);
async function markAllAsApproved(untrusted) {
  await Promise.all(untrusted.map((contact) => contact.setApproved()));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  markAllAsApproved
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFya0FsbEFzQXBwcm92ZWQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25Nb2RlbCB9IGZyb20gJy4uL21vZGVscy9jb252ZXJzYXRpb25zJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1hcmtBbGxBc0FwcHJvdmVkKFxuICB1bnRydXN0ZWQ6IFJlYWRvbmx5QXJyYXk8Q29udmVyc2F0aW9uTW9kZWw+XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgUHJvbWlzZS5hbGwodW50cnVzdGVkLm1hcChjb250YWN0ID0+IGNvbnRhY3Quc2V0QXBwcm92ZWQoKSkpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBLGlDQUNFLFdBQ2U7QUFDZixRQUFNLFFBQVEsSUFBSSxVQUFVLElBQUksYUFBVyxRQUFRLFlBQVksQ0FBQyxDQUFDO0FBQ25FO0FBSnNCIiwKICAibmFtZXMiOiBbXQp9Cg==
