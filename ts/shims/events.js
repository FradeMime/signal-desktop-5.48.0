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
var events_exports = {};
__export(events_exports, {
  trigger: () => trigger
});
module.exports = __toCommonJS(events_exports);
function trigger(name, ...rest) {
  window.Whisper.events.trigger(name, ...rest);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  trigger
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXZlbnRzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLy8gTWF0Y2hpbmcgV2hpc3Blci5ldmVudHMudHJpZ2dlciBBUElcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5leHBvcnQgZnVuY3Rpb24gdHJpZ2dlcihuYW1lOiBzdHJpbmcsIC4uLnJlc3Q6IEFycmF5PGFueT4pOiB2b2lkIHtcbiAgd2luZG93LldoaXNwZXIuZXZlbnRzLnRyaWdnZXIobmFtZSwgLi4ucmVzdCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS08saUJBQWlCLFNBQWlCLE1BQXdCO0FBQy9ELFNBQU8sUUFBUSxPQUFPLFFBQVEsTUFBTSxHQUFHLElBQUk7QUFDN0M7QUFGZ0IiLAogICJuYW1lcyI6IFtdCn0K
