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
var registration_exports = {};
__export(registration_exports, {
  everDone: () => everDone,
  isDone: () => isDone,
  markDone: () => markDone,
  markEverDone: () => markEverDone,
  remove: () => remove
});
module.exports = __toCommonJS(registration_exports);
function markEverDone() {
  window.storage.put("chromiumRegistrationDoneEver", "");
}
function markDone() {
  markEverDone();
  window.storage.put("chromiumRegistrationDone", "");
}
async function remove() {
  await window.storage.remove("chromiumRegistrationDone");
}
function isDone() {
  return window.storage.get("chromiumRegistrationDone") === "";
}
function everDone() {
  return window.storage.get("chromiumRegistrationDoneEver") === "" || isDone();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  everDone,
  isDone,
  markDone,
  markEverDone,
  remove
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVnaXN0cmF0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXJrRXZlckRvbmUoKTogdm9pZCB7XG4gIHdpbmRvdy5zdG9yYWdlLnB1dCgnY2hyb21pdW1SZWdpc3RyYXRpb25Eb25lRXZlcicsICcnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcmtEb25lKCk6IHZvaWQge1xuICBtYXJrRXZlckRvbmUoKTtcbiAgd2luZG93LnN0b3JhZ2UucHV0KCdjaHJvbWl1bVJlZ2lzdHJhdGlvbkRvbmUnLCAnJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW1vdmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IHdpbmRvdy5zdG9yYWdlLnJlbW92ZSgnY2hyb21pdW1SZWdpc3RyYXRpb25Eb25lJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RvbmUoKTogYm9vbGVhbiB7XG4gIHJldHVybiB3aW5kb3cuc3RvcmFnZS5nZXQoJ2Nocm9taXVtUmVnaXN0cmF0aW9uRG9uZScpID09PSAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV2ZXJEb25lKCk6IGJvb2xlYW4ge1xuICByZXR1cm4gd2luZG93LnN0b3JhZ2UuZ2V0KCdjaHJvbWl1bVJlZ2lzdHJhdGlvbkRvbmVFdmVyJykgPT09ICcnIHx8IGlzRG9uZSgpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR08sd0JBQThCO0FBQ25DLFNBQU8sUUFBUSxJQUFJLGdDQUFnQyxFQUFFO0FBQ3ZEO0FBRmdCLEFBSVQsb0JBQTBCO0FBQy9CLGVBQWE7QUFDYixTQUFPLFFBQVEsSUFBSSw0QkFBNEIsRUFBRTtBQUNuRDtBQUhnQixBQUtoQix3QkFBOEM7QUFDNUMsUUFBTSxPQUFPLFFBQVEsT0FBTywwQkFBMEI7QUFDeEQ7QUFGc0IsQUFJZixrQkFBMkI7QUFDaEMsU0FBTyxPQUFPLFFBQVEsSUFBSSwwQkFBMEIsTUFBTTtBQUM1RDtBQUZnQixBQUlULG9CQUE2QjtBQUNsQyxTQUFPLE9BQU8sUUFBUSxJQUFJLDhCQUE4QixNQUFNLE1BQU0sT0FBTztBQUM3RTtBQUZnQiIsCiAgIm5hbWVzIjogW10KfQo=
