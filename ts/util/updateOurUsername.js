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
var updateOurUsername_exports = {};
__export(updateOurUsername_exports, {
  updateOurUsername: () => updateOurUsername
});
module.exports = __toCommonJS(updateOurUsername_exports);
async function updateOurUsername() {
  if (!window.textsecure.messaging) {
    throw new Error("updateOurUsername: window.textsecure.messaging not available");
  }
  const me = window.ConversationController.getOurConversationOrThrow();
  const { username } = await window.textsecure.messaging.whoami();
  me.set({ username });
  window.Signal.Data.updateConversation(me.attributes);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateOurUsername
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXBkYXRlT3VyVXNlcm5hbWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZU91clVzZXJuYW1lKCk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoIXdpbmRvdy50ZXh0c2VjdXJlLm1lc3NhZ2luZykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICd1cGRhdGVPdXJVc2VybmFtZTogd2luZG93LnRleHRzZWN1cmUubWVzc2FnaW5nIG5vdCBhdmFpbGFibGUnXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IG1lID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3VyQ29udmVyc2F0aW9uT3JUaHJvdygpO1xuICBjb25zdCB7IHVzZXJuYW1lIH0gPSBhd2FpdCB3aW5kb3cudGV4dHNlY3VyZS5tZXNzYWdpbmcud2hvYW1pKCk7XG5cbiAgbWUuc2V0KHsgdXNlcm5hbWUgfSk7XG4gIHdpbmRvdy5TaWduYWwuRGF0YS51cGRhdGVDb252ZXJzYXRpb24obWUuYXR0cmlidXRlcyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUNBQXlEO0FBQ3ZELE1BQUksQ0FBQyxPQUFPLFdBQVcsV0FBVztBQUNoQyxVQUFNLElBQUksTUFDUiw4REFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLEtBQUssT0FBTyx1QkFBdUIsMEJBQTBCO0FBQ25FLFFBQU0sRUFBRSxhQUFhLE1BQU0sT0FBTyxXQUFXLFVBQVUsT0FBTztBQUU5RCxLQUFHLElBQUksRUFBRSxTQUFTLENBQUM7QUFDbkIsU0FBTyxPQUFPLEtBQUssbUJBQW1CLEdBQUcsVUFBVTtBQUNyRDtBQVpzQiIsCiAgIm5hbWVzIjogW10KfQo=
