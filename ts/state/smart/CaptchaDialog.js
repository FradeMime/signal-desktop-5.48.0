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
var CaptchaDialog_exports = {};
__export(CaptchaDialog_exports, {
  SmartCaptchaDialog: () => SmartCaptchaDialog
});
module.exports = __toCommonJS(CaptchaDialog_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_CaptchaDialog = require("../../components/CaptchaDialog");
var import_user = require("../selectors/user");
var import_network = require("../selectors/network");
var import_challenge = require("../../challenge");
const mapStateToProps = /* @__PURE__ */ __name((state) => {
  return {
    ...state.updates,
    isPending: (0, import_network.isChallengePending)(state),
    i18n: (0, import_user.getIntl)(state),
    onContinue() {
      document.location.href = (0, import_challenge.getChallengeURL)();
    }
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartCaptchaDialog = smart(import_CaptchaDialog.CaptchaDialog);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartCaptchaDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FwdGNoYURpYWxvZy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG1hcERpc3BhdGNoVG9Qcm9wcyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgQ2FwdGNoYURpYWxvZyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2FwdGNoYURpYWxvZyc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHsgZ2V0SW50bCB9IGZyb20gJy4uL3NlbGVjdG9ycy91c2VyJztcbmltcG9ydCB7IGlzQ2hhbGxlbmdlUGVuZGluZyB9IGZyb20gJy4uL3NlbGVjdG9ycy9uZXR3b3JrJztcbmltcG9ydCB7IGdldENoYWxsZW5nZVVSTCB9IGZyb20gJy4uLy4uL2NoYWxsZW5nZSc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZTogU3RhdGVUeXBlKSA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUudXBkYXRlcyxcbiAgICBpc1BlbmRpbmc6IGlzQ2hhbGxlbmdlUGVuZGluZyhzdGF0ZSksXG4gICAgaTE4bjogZ2V0SW50bChzdGF0ZSksXG5cbiAgICBvbkNvbnRpbnVlKCkge1xuICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IGdldENoYWxsZW5nZVVSTCgpO1xuICAgIH0sXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5leHBvcnQgY29uc3QgU21hcnRDYXB0Y2hhRGlhbG9nID0gc21hcnQoQ2FwdGNoYURpYWxvZyk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXdCO0FBQ3hCLHFCQUFtQztBQUNuQywyQkFBOEI7QUFFOUIsa0JBQXdCO0FBQ3hCLHFCQUFtQztBQUNuQyx1QkFBZ0M7QUFFaEMsTUFBTSxrQkFBa0Isd0JBQUMsVUFBcUI7QUFDNUMsU0FBTztBQUFBLE9BQ0YsTUFBTTtBQUFBLElBQ1QsV0FBVyx1Q0FBbUIsS0FBSztBQUFBLElBQ25DLE1BQU0seUJBQVEsS0FBSztBQUFBLElBRW5CLGFBQWE7QUFDWCxlQUFTLFNBQVMsT0FBTyxzQ0FBZ0I7QUFBQSxJQUMzQztBQUFBLEVBQ0Y7QUFDRixHQVZ3QjtBQVl4QixNQUFNLFFBQVEsZ0NBQVEsaUJBQWlCLGlDQUFrQjtBQUVsRCxNQUFNLHFCQUFxQixNQUFNLGtDQUFhOyIsCiAgIm5hbWVzIjogW10KfQo=
