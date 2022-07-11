var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var CallingScreenSharingController_stories_exports = {};
__export(CallingScreenSharingController_stories_exports, {
  Controller: () => Controller,
  ReallyLongAppName: () => ReallyLongAppName,
  default: () => CallingScreenSharingController_stories_default
});
module.exports = __toCommonJS(CallingScreenSharingController_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_CallingScreenSharingController = require("./CallingScreenSharingController");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  onCloseController: (0, import_addon_actions.action)("on-close-controller"),
  onStopSharing: (0, import_addon_actions.action)("on-stop-sharing"),
  presentedSourceName: overrideProps.presentedSourceName || "Application"
}), "createProps");
var CallingScreenSharingController_stories_default = {
  title: "Components/CallingScreenSharingController"
};
const Controller = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ import_react.default.createElement(import_CallingScreenSharingController.CallingScreenSharingController, {
    ...createProps()
  });
}, "Controller");
const ReallyLongAppName = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ import_react.default.createElement(import_CallingScreenSharingController.CallingScreenSharingController, {
    ...createProps({
      presentedSourceName: "A really long application name that is super long"
    })
  });
}, "ReallyLongAppName");
ReallyLongAppName.story = {
  name: "Really long app name"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Controller,
  ReallyLongAppName
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ1NjcmVlblNoYXJpbmdDb250cm9sbGVyLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vQ2FsbGluZ1NjcmVlblNoYXJpbmdDb250cm9sbGVyJztcbmltcG9ydCB7IENhbGxpbmdTY3JlZW5TaGFyaW5nQ29udHJvbGxlciB9IGZyb20gJy4vQ2FsbGluZ1NjcmVlblNoYXJpbmdDb250cm9sbGVyJztcblxuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHNUeXBlPiA9IHt9KTogUHJvcHNUeXBlID0+ICh7XG4gIGkxOG4sXG4gIG9uQ2xvc2VDb250cm9sbGVyOiBhY3Rpb24oJ29uLWNsb3NlLWNvbnRyb2xsZXInKSxcbiAgb25TdG9wU2hhcmluZzogYWN0aW9uKCdvbi1zdG9wLXNoYXJpbmcnKSxcbiAgcHJlc2VudGVkU291cmNlTmFtZTogb3ZlcnJpZGVQcm9wcy5wcmVzZW50ZWRTb3VyY2VOYW1lIHx8ICdBcHBsaWNhdGlvbicsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ2FsbGluZ1NjcmVlblNoYXJpbmdDb250cm9sbGVyJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb250cm9sbGVyID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIDxDYWxsaW5nU2NyZWVuU2hhcmluZ0NvbnRyb2xsZXIgey4uLmNyZWF0ZVByb3BzKCl9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IFJlYWxseUxvbmdBcHBOYW1lID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Q2FsbGluZ1NjcmVlblNoYXJpbmdDb250cm9sbGVyXG4gICAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgICBwcmVzZW50ZWRTb3VyY2VOYW1lOlxuICAgICAgICAgICdBIHJlYWxseSBsb25nIGFwcGxpY2F0aW9uIG5hbWUgdGhhdCBpcyBzdXBlciBsb25nJyxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG5SZWFsbHlMb25nQXBwTmFtZS5zdG9yeSA9IHtcbiAgbmFtZTogJ1JlYWxseSBsb25nIGFwcCBuYW1lJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQiwyQkFBdUI7QUFHdkIsNENBQStDO0FBRS9DLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFFdkIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsTUFBTSxjQUFjLHdCQUFDLGdCQUFvQyxDQUFDLE1BQWtCO0FBQUEsRUFDMUU7QUFBQSxFQUNBLG1CQUFtQixpQ0FBTyxxQkFBcUI7QUFBQSxFQUMvQyxlQUFlLGlDQUFPLGlCQUFpQjtBQUFBLEVBQ3ZDLHFCQUFxQixjQUFjLHVCQUF1QjtBQUM1RCxJQUxvQjtBQU9wQixJQUFPLGlEQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLGFBQWEsNkJBQW1CO0FBQzNDLFNBQU8sbURBQUM7QUFBQSxPQUFtQyxZQUFZO0FBQUEsR0FBRztBQUM1RCxHQUYwQjtBQUluQixNQUFNLG9CQUFvQiw2QkFBbUI7QUFDbEQsU0FDRSxtREFBQztBQUFBLE9BQ0ssWUFBWTtBQUFBLE1BQ2QscUJBQ0U7QUFBQSxJQUNKLENBQUM7QUFBQSxHQUNIO0FBRUosR0FUaUM7QUFXakMsa0JBQWtCLFFBQVE7QUFBQSxFQUN4QixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
