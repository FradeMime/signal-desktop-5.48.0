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
var InstallScreen_exports = {};
__export(InstallScreen_exports, {
  InstallScreen: () => InstallScreen,
  InstallScreenStep: () => InstallScreenStep
});
module.exports = __toCommonJS(InstallScreen_exports);
var import_react = __toESM(require("react"));
var import_missingCaseError = require("../util/missingCaseError");
var import_InstallScreenErrorStep = require("./installScreen/InstallScreenErrorStep");
var import_InstallScreenChoosingDeviceNameStep = require("./installScreen/InstallScreenChoosingDeviceNameStep");
var import_InstallScreenLinkInProgressStep = require("./installScreen/InstallScreenLinkInProgressStep");
var import_InstallScreenQrCodeNotScannedStep = require("./installScreen/InstallScreenQrCodeNotScannedStep");
var InstallScreenStep = /* @__PURE__ */ ((InstallScreenStep2) => {
  InstallScreenStep2[InstallScreenStep2["Error"] = 0] = "Error";
  InstallScreenStep2[InstallScreenStep2["QrCodeNotScanned"] = 1] = "QrCodeNotScanned";
  InstallScreenStep2[InstallScreenStep2["ChoosingDeviceName"] = 2] = "ChoosingDeviceName";
  InstallScreenStep2[InstallScreenStep2["LinkInProgress"] = 3] = "LinkInProgress";
  return InstallScreenStep2;
})(InstallScreenStep || {});
function InstallScreen(props) {
  switch (props.step) {
    case 0 /* Error */:
      return /* @__PURE__ */ import_react.default.createElement(import_InstallScreenErrorStep.InstallScreenErrorStep, {
        ...props.screenSpecificProps
      });
    case 1 /* QrCodeNotScanned */:
      return /* @__PURE__ */ import_react.default.createElement(import_InstallScreenQrCodeNotScannedStep.InstallScreenQrCodeNotScannedStep, {
        ...props.screenSpecificProps
      });
    case 2 /* ChoosingDeviceName */:
      return /* @__PURE__ */ import_react.default.createElement(import_InstallScreenChoosingDeviceNameStep.InstallScreenChoosingDeviceNameStep, {
        ...props.screenSpecificProps
      });
    case 3 /* LinkInProgress */:
      return /* @__PURE__ */ import_react.default.createElement(import_InstallScreenLinkInProgressStep.InstallScreenLinkInProgressStep, {
        ...props.screenSpecificProps
      });
    default:
      throw (0, import_missingCaseError.missingCaseError)(props);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InstallScreen,
  InstallScreenStep
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW5zdGFsbFNjcmVlbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBDb21wb25lbnRQcm9wcywgUmVhY3RFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgbWlzc2luZ0Nhc2VFcnJvciB9IGZyb20gJy4uL3V0aWwvbWlzc2luZ0Nhc2VFcnJvcic7XG5pbXBvcnQgeyBJbnN0YWxsU2NyZWVuRXJyb3JTdGVwIH0gZnJvbSAnLi9pbnN0YWxsU2NyZWVuL0luc3RhbGxTY3JlZW5FcnJvclN0ZXAnO1xuaW1wb3J0IHsgSW5zdGFsbFNjcmVlbkNob29zaW5nRGV2aWNlTmFtZVN0ZXAgfSBmcm9tICcuL2luc3RhbGxTY3JlZW4vSW5zdGFsbFNjcmVlbkNob29zaW5nRGV2aWNlTmFtZVN0ZXAnO1xuaW1wb3J0IHsgSW5zdGFsbFNjcmVlbkxpbmtJblByb2dyZXNzU3RlcCB9IGZyb20gJy4vaW5zdGFsbFNjcmVlbi9JbnN0YWxsU2NyZWVuTGlua0luUHJvZ3Jlc3NTdGVwJztcbmltcG9ydCB7IEluc3RhbGxTY3JlZW5RckNvZGVOb3RTY2FubmVkU3RlcCB9IGZyb20gJy4vaW5zdGFsbFNjcmVlbi9JbnN0YWxsU2NyZWVuUXJDb2RlTm90U2Nhbm5lZFN0ZXAnO1xuXG5leHBvcnQgZW51bSBJbnN0YWxsU2NyZWVuU3RlcCB7XG4gIEVycm9yLFxuICBRckNvZGVOb3RTY2FubmVkLFxuICBDaG9vc2luZ0RldmljZU5hbWUsXG4gIExpbmtJblByb2dyZXNzLFxufVxuXG4vLyBXZSBjYW4ndCBhbHdheXMgdXNlIGRlc3RydWN0dXJpbmcgYXNzaWdubWVudCBiZWNhdXNlIG9mIHRoZSBjb21wbGV4aXR5IG9mIHRoaXMgcHJvcHNcbi8vICAgdHlwZS5cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L2Rlc3RydWN0dXJpbmctYXNzaWdubWVudCAqL1xudHlwZSBQcm9wc1R5cGUgPVxuICB8IHtcbiAgICAgIHN0ZXA6IEluc3RhbGxTY3JlZW5TdGVwLkVycm9yO1xuICAgICAgc2NyZWVuU3BlY2lmaWNQcm9wczogQ29tcG9uZW50UHJvcHM8dHlwZW9mIEluc3RhbGxTY3JlZW5FcnJvclN0ZXA+O1xuICAgIH1cbiAgfCB7XG4gICAgICBzdGVwOiBJbnN0YWxsU2NyZWVuU3RlcC5RckNvZGVOb3RTY2FubmVkO1xuICAgICAgc2NyZWVuU3BlY2lmaWNQcm9wczogQ29tcG9uZW50UHJvcHM8XG4gICAgICAgIHR5cGVvZiBJbnN0YWxsU2NyZWVuUXJDb2RlTm90U2Nhbm5lZFN0ZXBcbiAgICAgID47XG4gICAgfVxuICB8IHtcbiAgICAgIHN0ZXA6IEluc3RhbGxTY3JlZW5TdGVwLkNob29zaW5nRGV2aWNlTmFtZTtcbiAgICAgIHNjcmVlblNwZWNpZmljUHJvcHM6IENvbXBvbmVudFByb3BzPFxuICAgICAgICB0eXBlb2YgSW5zdGFsbFNjcmVlbkNob29zaW5nRGV2aWNlTmFtZVN0ZXBcbiAgICAgID47XG4gICAgfVxuICB8IHtcbiAgICAgIHN0ZXA6IEluc3RhbGxTY3JlZW5TdGVwLkxpbmtJblByb2dyZXNzO1xuICAgICAgc2NyZWVuU3BlY2lmaWNQcm9wczogQ29tcG9uZW50UHJvcHM8XG4gICAgICAgIHR5cGVvZiBJbnN0YWxsU2NyZWVuTGlua0luUHJvZ3Jlc3NTdGVwXG4gICAgICA+O1xuICAgIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBJbnN0YWxsU2NyZWVuKHByb3BzOiBSZWFkb25seTxQcm9wc1R5cGU+KTogUmVhY3RFbGVtZW50IHtcbiAgc3dpdGNoIChwcm9wcy5zdGVwKSB7XG4gICAgY2FzZSBJbnN0YWxsU2NyZWVuU3RlcC5FcnJvcjpcbiAgICAgIHJldHVybiA8SW5zdGFsbFNjcmVlbkVycm9yU3RlcCB7Li4ucHJvcHMuc2NyZWVuU3BlY2lmaWNQcm9wc30gLz47XG4gICAgY2FzZSBJbnN0YWxsU2NyZWVuU3RlcC5RckNvZGVOb3RTY2FubmVkOlxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEluc3RhbGxTY3JlZW5RckNvZGVOb3RTY2FubmVkU3RlcCB7Li4ucHJvcHMuc2NyZWVuU3BlY2lmaWNQcm9wc30gLz5cbiAgICAgICk7XG4gICAgY2FzZSBJbnN0YWxsU2NyZWVuU3RlcC5DaG9vc2luZ0RldmljZU5hbWU6XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8SW5zdGFsbFNjcmVlbkNob29zaW5nRGV2aWNlTmFtZVN0ZXAgey4uLnByb3BzLnNjcmVlblNwZWNpZmljUHJvcHN9IC8+XG4gICAgICApO1xuICAgIGNhc2UgSW5zdGFsbFNjcmVlblN0ZXAuTGlua0luUHJvZ3Jlc3M6XG4gICAgICByZXR1cm4gPEluc3RhbGxTY3JlZW5MaW5rSW5Qcm9ncmVzc1N0ZXAgey4uLnByb3BzLnNjcmVlblNwZWNpZmljUHJvcHN9IC8+O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKHByb3BzKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWtCO0FBRWxCLDhCQUFpQztBQUNqQyxvQ0FBdUM7QUFDdkMsaURBQW9EO0FBQ3BELDZDQUFnRDtBQUNoRCwrQ0FBa0Q7QUFFM0MsSUFBSyxvQkFBTCxrQkFBSyx1QkFBTDtBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBSlU7QUFBQTtBQWtDTCx1QkFBdUIsT0FBMEM7QUFDdEUsVUFBUSxNQUFNO0FBQUEsU0FDUDtBQUNILGFBQU8sbURBQUM7QUFBQSxXQUEyQixNQUFNO0FBQUEsT0FBcUI7QUFBQSxTQUMzRDtBQUNILGFBQ0UsbURBQUM7QUFBQSxXQUFzQyxNQUFNO0FBQUEsT0FBcUI7QUFBQSxTQUVqRTtBQUNILGFBQ0UsbURBQUM7QUFBQSxXQUF3QyxNQUFNO0FBQUEsT0FBcUI7QUFBQSxTQUVuRTtBQUNILGFBQU8sbURBQUM7QUFBQSxXQUFvQyxNQUFNO0FBQUEsT0FBcUI7QUFBQTtBQUV2RSxZQUFNLDhDQUFpQixLQUFLO0FBQUE7QUFFbEM7QUFqQmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
