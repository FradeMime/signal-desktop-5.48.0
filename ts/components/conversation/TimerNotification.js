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
var TimerNotification_exports = {};
__export(TimerNotification_exports, {
  TimerNotification: () => TimerNotification
});
module.exports = __toCommonJS(TimerNotification_exports);
var import_react = __toESM(require("react"));
var import_ContactName = require("./ContactName");
var import_SystemMessage = require("./SystemMessage");
var import_Intl = require("../Intl");
var expirationTimer = __toESM(require("../../util/expirationTimer"));
var log = __toESM(require("../../logging/log"));
const TimerNotification = /* @__PURE__ */ __name((props) => {
  const { disabled, i18n, title, type } = props;
  let changeKey;
  let timespan;
  if (props.disabled) {
    changeKey = "disabledDisappearingMessages";
    timespan = "";
  } else {
    changeKey = "theyChangedTheTimer";
    timespan = expirationTimer.format(i18n, props.expireTimer);
  }
  let message;
  switch (type) {
    case "fromOther":
      message = /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
        i18n,
        id: changeKey,
        components: {
          name: /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
            key: "external-1",
            title
          }),
          time: timespan
        }
      });
      break;
    case "fromMe":
      message = disabled ? i18n("youDisabledDisappearingMessages") : i18n("youChangedTheTimer", [timespan]);
      break;
    case "fromSync":
      message = disabled ? i18n("disappearingMessagesDisabled") : i18n("timerSetOnSync", [timespan]);
      break;
    case "fromMember":
      message = disabled ? i18n("disappearingMessagesDisabledByMember") : i18n("timerSetByMember", [timespan]);
      break;
    default:
      log.warn("TimerNotification: unsupported type provided:", type);
      break;
  }
  const icon = disabled ? "timer-disabled" : "timer";
  return /* @__PURE__ */ import_react.default.createElement(import_SystemMessage.SystemMessage, {
    icon,
    contents: message
  });
}, "TimerNotification");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TimerNotification
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGltZXJOb3RpZmljYXRpb24udHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBGdW5jdGlvbkNvbXBvbmVudCwgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgQ29udGFjdE5hbWUgfSBmcm9tICcuL0NvbnRhY3ROYW1lJztcbmltcG9ydCB7IFN5c3RlbU1lc3NhZ2UgfSBmcm9tICcuL1N5c3RlbU1lc3NhZ2UnO1xuaW1wb3J0IHsgSW50bCB9IGZyb20gJy4uL0ludGwnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgKiBhcyBleHBpcmF0aW9uVGltZXIgZnJvbSAnLi4vLi4vdXRpbC9leHBpcmF0aW9uVGltZXInO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uLy4uL2xvZ2dpbmcvbG9nJztcblxuZXhwb3J0IHR5cGUgVGltZXJOb3RpZmljYXRpb25UeXBlID1cbiAgfCAnZnJvbU90aGVyJ1xuICB8ICdmcm9tTWUnXG4gIHwgJ2Zyb21TeW5jJ1xuICB8ICdmcm9tTWVtYmVyJztcblxuLy8gV2UgY2FuJ3QgYWx3YXlzIHVzZSBkZXN0cnVjdHVyaW5nIGFzc2lnbm1lbnQgYmVjYXVzZSBvZiB0aGUgY29tcGxleGl0eSBvZiB0aGlzIHByb3BzXG4vLyAgIHR5cGUuXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9kZXN0cnVjdHVyaW5nLWFzc2lnbm1lbnQgKi9cbmV4cG9ydCB0eXBlIFByb3BzRGF0YSA9IHtcbiAgdHlwZTogVGltZXJOb3RpZmljYXRpb25UeXBlO1xuICB0aXRsZTogc3RyaW5nO1xufSAmIChcbiAgfCB7IGRpc2FibGVkOiB0cnVlIH1cbiAgfCB7XG4gICAgICBkaXNhYmxlZDogZmFsc2U7XG4gICAgICBleHBpcmVUaW1lcjogbnVtYmVyO1xuICAgIH1cbik7XG5cbnR5cGUgUHJvcHNIb3VzZWtlZXBpbmcgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IFByb3BzRGF0YSAmIFByb3BzSG91c2VrZWVwaW5nO1xuXG5leHBvcnQgY29uc3QgVGltZXJOb3RpZmljYXRpb246IEZ1bmN0aW9uQ29tcG9uZW50PFByb3BzPiA9IHByb3BzID0+IHtcbiAgY29uc3QgeyBkaXNhYmxlZCwgaTE4biwgdGl0bGUsIHR5cGUgfSA9IHByb3BzO1xuXG4gIGxldCBjaGFuZ2VLZXk6IHN0cmluZztcbiAgbGV0IHRpbWVzcGFuOiBzdHJpbmc7XG4gIGlmIChwcm9wcy5kaXNhYmxlZCkge1xuICAgIGNoYW5nZUtleSA9ICdkaXNhYmxlZERpc2FwcGVhcmluZ01lc3NhZ2VzJztcbiAgICB0aW1lc3BhbiA9ICcnOyAvLyBTZXQgdG8gdGhlIGVtcHR5IHN0cmluZyB0byBzYXRpc2Z5IHR5cGVzXG4gIH0gZWxzZSB7XG4gICAgY2hhbmdlS2V5ID0gJ3RoZXlDaGFuZ2VkVGhlVGltZXInO1xuICAgIHRpbWVzcGFuID0gZXhwaXJhdGlvblRpbWVyLmZvcm1hdChpMThuLCBwcm9wcy5leHBpcmVUaW1lcik7XG4gIH1cblxuICBsZXQgbWVzc2FnZTogUmVhY3ROb2RlO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdmcm9tT3RoZXInOlxuICAgICAgbWVzc2FnZSA9IChcbiAgICAgICAgPEludGxcbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIGlkPXtjaGFuZ2VLZXl9XG4gICAgICAgICAgY29tcG9uZW50cz17e1xuICAgICAgICAgICAgbmFtZTogPENvbnRhY3ROYW1lIGtleT1cImV4dGVybmFsLTFcIiB0aXRsZT17dGl0bGV9IC8+LFxuICAgICAgICAgICAgdGltZTogdGltZXNwYW4sXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdmcm9tTWUnOlxuICAgICAgbWVzc2FnZSA9IGRpc2FibGVkXG4gICAgICAgID8gaTE4bigneW91RGlzYWJsZWREaXNhcHBlYXJpbmdNZXNzYWdlcycpXG4gICAgICAgIDogaTE4bigneW91Q2hhbmdlZFRoZVRpbWVyJywgW3RpbWVzcGFuXSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdmcm9tU3luYyc6XG4gICAgICBtZXNzYWdlID0gZGlzYWJsZWRcbiAgICAgICAgPyBpMThuKCdkaXNhcHBlYXJpbmdNZXNzYWdlc0Rpc2FibGVkJylcbiAgICAgICAgOiBpMThuKCd0aW1lclNldE9uU3luYycsIFt0aW1lc3Bhbl0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZnJvbU1lbWJlcic6XG4gICAgICBtZXNzYWdlID0gZGlzYWJsZWRcbiAgICAgICAgPyBpMThuKCdkaXNhcHBlYXJpbmdNZXNzYWdlc0Rpc2FibGVkQnlNZW1iZXInKVxuICAgICAgICA6IGkxOG4oJ3RpbWVyU2V0QnlNZW1iZXInLCBbdGltZXNwYW5dKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBsb2cud2FybignVGltZXJOb3RpZmljYXRpb246IHVuc3VwcG9ydGVkIHR5cGUgcHJvdmlkZWQ6JywgdHlwZSk7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIGNvbnN0IGljb24gPSBkaXNhYmxlZCA/ICd0aW1lci1kaXNhYmxlZCcgOiAndGltZXInO1xuXG4gIHJldHVybiA8U3lzdGVtTWVzc2FnZSBpY29uPXtpY29ufSBjb250ZW50cz17bWVzc2FnZX0gLz47XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUVsQix5QkFBNEI7QUFDNUIsMkJBQThCO0FBQzlCLGtCQUFxQjtBQUVyQixzQkFBaUM7QUFDakMsVUFBcUI7QUE0QmQsTUFBTSxvQkFBOEMsa0NBQVM7QUFDbEUsUUFBTSxFQUFFLFVBQVUsTUFBTSxPQUFPLFNBQVM7QUFFeEMsTUFBSTtBQUNKLE1BQUk7QUFDSixNQUFJLE1BQU0sVUFBVTtBQUNsQixnQkFBWTtBQUNaLGVBQVc7QUFBQSxFQUNiLE9BQU87QUFDTCxnQkFBWTtBQUNaLGVBQVcsZ0JBQWdCLE9BQU8sTUFBTSxNQUFNLFdBQVc7QUFBQSxFQUMzRDtBQUVBLE1BQUk7QUFDSixVQUFRO0FBQUEsU0FDRDtBQUNILGdCQUNFLG1EQUFDO0FBQUEsUUFDQztBQUFBLFFBQ0EsSUFBSTtBQUFBLFFBQ0osWUFBWTtBQUFBLFVBQ1YsTUFBTSxtREFBQztBQUFBLFlBQVksS0FBSTtBQUFBLFlBQWE7QUFBQSxXQUFjO0FBQUEsVUFDbEQsTUFBTTtBQUFBLFFBQ1I7QUFBQSxPQUNGO0FBRUY7QUFBQSxTQUNHO0FBQ0gsZ0JBQVUsV0FDTixLQUFLLGlDQUFpQyxJQUN0QyxLQUFLLHNCQUFzQixDQUFDLFFBQVEsQ0FBQztBQUN6QztBQUFBLFNBQ0c7QUFDSCxnQkFBVSxXQUNOLEtBQUssOEJBQThCLElBQ25DLEtBQUssa0JBQWtCLENBQUMsUUFBUSxDQUFDO0FBQ3JDO0FBQUEsU0FDRztBQUNILGdCQUFVLFdBQ04sS0FBSyxzQ0FBc0MsSUFDM0MsS0FBSyxvQkFBb0IsQ0FBQyxRQUFRLENBQUM7QUFDdkM7QUFBQTtBQUVBLFVBQUksS0FBSyxpREFBaUQsSUFBSTtBQUM5RDtBQUFBO0FBR0osUUFBTSxPQUFPLFdBQVcsbUJBQW1CO0FBRTNDLFNBQU8sbURBQUM7QUFBQSxJQUFjO0FBQUEsSUFBWSxVQUFVO0FBQUEsR0FBUztBQUN2RCxHQWxEMkQ7IiwKICAibmFtZXMiOiBbXQp9Cg==
