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
var wrapEventEmitterOnce_exports = {};
__export(wrapEventEmitterOnce_exports, {
  wrapEventEmitterOnce: () => wrapEventEmitterOnce
});
module.exports = __toCommonJS(wrapEventEmitterOnce_exports);
var import_events = require("events");
async function wrapEventEmitterOnce(emitter, eventName) {
  const abortController = new AbortController();
  const maybeRejection = (async () => {
    const [error] = await (0, import_events.once)(emitter, "error", {
      signal: abortController.signal
    });
    throw error;
  })();
  try {
    return await Promise.race([maybeRejection, (0, import_events.once)(emitter, eventName)]);
  } finally {
    abortController.abort();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  wrapEventEmitterOnce
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid3JhcEV2ZW50RW1pdHRlck9uY2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IHsgb25jZSB9IGZyb20gJ2V2ZW50cyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3cmFwRXZlbnRFbWl0dGVyT25jZShcbiAgZW1pdHRlcjogRXZlbnRFbWl0dGVyLFxuICBldmVudE5hbWU6IHN0cmluZ1xuKTogUHJvbWlzZTxSZXR1cm5UeXBlPHR5cGVvZiBvbmNlPj4ge1xuICBjb25zdCBhYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gIGNvbnN0IG1heWJlUmVqZWN0aW9uID0gKGFzeW5jICgpOiBQcm9taXNlPFJldHVyblR5cGU8dHlwZW9mIG9uY2U+PiA9PiB7XG4gICAgY29uc3QgW2Vycm9yXSA9IGF3YWl0IG9uY2UoZW1pdHRlciwgJ2Vycm9yJywge1xuICAgICAgc2lnbmFsOiBhYm9ydENvbnRyb2xsZXIuc2lnbmFsLFxuICAgIH0pO1xuXG4gICAgdGhyb3cgZXJyb3I7XG4gIH0pKCk7XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5yYWNlKFttYXliZVJlamVjdGlvbiwgb25jZShlbWl0dGVyLCBldmVudE5hbWUpXSk7XG4gIH0gZmluYWxseSB7XG4gICAgYWJvcnRDb250cm9sbGVyLmFib3J0KCk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxvQkFBcUI7QUFFckIsb0NBQ0UsU0FDQSxXQUNrQztBQUNsQyxRQUFNLGtCQUFrQixJQUFJLGdCQUFnQjtBQUM1QyxRQUFNLGlCQUFrQixhQUE4QztBQUNwRSxVQUFNLENBQUMsU0FBUyxNQUFNLHdCQUFLLFNBQVMsU0FBUztBQUFBLE1BQzNDLFFBQVEsZ0JBQWdCO0FBQUEsSUFDMUIsQ0FBQztBQUVELFVBQU07QUFBQSxFQUNSLEdBQUc7QUFFSCxNQUFJO0FBQ0YsV0FBTyxNQUFNLFFBQVEsS0FBSyxDQUFDLGdCQUFnQix3QkFBSyxTQUFTLFNBQVMsQ0FBQyxDQUFDO0FBQUEsRUFDdEUsVUFBRTtBQUNBLG9CQUFnQixNQUFNO0FBQUEsRUFDeEI7QUFDRjtBQWxCc0IiLAogICJuYW1lcyI6IFtdCn0K
