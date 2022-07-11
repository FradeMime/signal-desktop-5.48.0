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
var MandatoryProfileSharingActions_stories_exports = {};
__export(MandatoryProfileSharingActions_stories_exports, {
  Direct: () => Direct,
  Group: () => Group,
  default: () => MandatoryProfileSharingActions_stories_default
});
module.exports = __toCommonJS(MandatoryProfileSharingActions_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_MandatoryProfileSharingActions = require("./MandatoryProfileSharingActions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const getBaseProps = /* @__PURE__ */ __name((isGroup = false) => ({
  i18n,
  conversationType: isGroup ? "group" : "direct",
  firstName: (0, import_addon_knobs.text)("firstName", "Cayce"),
  title: isGroup ? (0, import_addon_knobs.text)("title", "NYC Rock Climbers") : (0, import_addon_knobs.text)("title", "Cayce Bollard"),
  onBlock: (0, import_addon_actions.action)("block"),
  onBlockAndReportSpam: (0, import_addon_actions.action)("onBlockAndReportSpam"),
  onDelete: (0, import_addon_actions.action)("delete"),
  onAccept: (0, import_addon_actions.action)("accept")
}), "getBaseProps");
var MandatoryProfileSharingActions_stories_default = {
  title: "Components/Conversation/MandatoryProfileSharingActions"
};
const Direct = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(import_MandatoryProfileSharingActions.MandatoryProfileSharingActions, {
    ...getBaseProps()
  }));
}, "Direct");
const Group = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(import_MandatoryProfileSharingActions.MandatoryProfileSharingActions, {
    ...getBaseProps(true)
  }));
}, "Group");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Direct,
  Group
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWFuZGF0b3J5UHJvZmlsZVNoYXJpbmdBY3Rpb25zLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdGV4dCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wcyBhcyBNYW5kYXRvcnlQcm9maWxlU2hhcmluZ0FjdGlvbnNQcm9wcyB9IGZyb20gJy4vTWFuZGF0b3J5UHJvZmlsZVNoYXJpbmdBY3Rpb25zJztcbmltcG9ydCB7IE1hbmRhdG9yeVByb2ZpbGVTaGFyaW5nQWN0aW9ucyB9IGZyb20gJy4vTWFuZGF0b3J5UHJvZmlsZVNoYXJpbmdBY3Rpb25zJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5jb25zdCBnZXRCYXNlUHJvcHMgPSAoXG4gIGlzR3JvdXAgPSBmYWxzZVxuKTogTWFuZGF0b3J5UHJvZmlsZVNoYXJpbmdBY3Rpb25zUHJvcHMgPT4gKHtcbiAgaTE4bixcbiAgY29udmVyc2F0aW9uVHlwZTogaXNHcm91cCA/ICdncm91cCcgOiAnZGlyZWN0JyxcbiAgZmlyc3ROYW1lOiB0ZXh0KCdmaXJzdE5hbWUnLCAnQ2F5Y2UnKSxcbiAgdGl0bGU6IGlzR3JvdXBcbiAgICA/IHRleHQoJ3RpdGxlJywgJ05ZQyBSb2NrIENsaW1iZXJzJylcbiAgICA6IHRleHQoJ3RpdGxlJywgJ0NheWNlIEJvbGxhcmQnKSxcbiAgb25CbG9jazogYWN0aW9uKCdibG9jaycpLFxuICBvbkJsb2NrQW5kUmVwb3J0U3BhbTogYWN0aW9uKCdvbkJsb2NrQW5kUmVwb3J0U3BhbScpLFxuICBvbkRlbGV0ZTogYWN0aW9uKCdkZWxldGUnKSxcbiAgb25BY2NlcHQ6IGFjdGlvbignYWNjZXB0JyksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL01hbmRhdG9yeVByb2ZpbGVTaGFyaW5nQWN0aW9ucycsXG59O1xuXG5leHBvcnQgY29uc3QgRGlyZWN0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnNDgwcHgnIH19PlxuICAgICAgPE1hbmRhdG9yeVByb2ZpbGVTaGFyaW5nQWN0aW9ucyB7Li4uZ2V0QmFzZVByb3BzKCl9IC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgR3JvdXAgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICc0ODBweCcgfX0+XG4gICAgICA8TWFuZGF0b3J5UHJvZmlsZVNoYXJpbmdBY3Rpb25zIHsuLi5nZXRCYXNlUHJvcHModHJ1ZSl9IC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2Qix5QkFBcUI7QUFDckIsMkJBQXVCO0FBR3ZCLDRDQUErQztBQUMvQyx1QkFBMEI7QUFDMUIsc0JBQXVCO0FBRXZCLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLE1BQU0sZUFBZSx3QkFDbkIsVUFBVSxVQUMrQjtBQUFBLEVBQ3pDO0FBQUEsRUFDQSxrQkFBa0IsVUFBVSxVQUFVO0FBQUEsRUFDdEMsV0FBVyw2QkFBSyxhQUFhLE9BQU87QUFBQSxFQUNwQyxPQUFPLFVBQ0gsNkJBQUssU0FBUyxtQkFBbUIsSUFDakMsNkJBQUssU0FBUyxlQUFlO0FBQUEsRUFDakMsU0FBUyxpQ0FBTyxPQUFPO0FBQUEsRUFDdkIsc0JBQXNCLGlDQUFPLHNCQUFzQjtBQUFBLEVBQ25ELFVBQVUsaUNBQU8sUUFBUTtBQUFBLEVBQ3pCLFVBQVUsaUNBQU8sUUFBUTtBQUMzQixJQWJxQjtBQWVyQixJQUFPLGlEQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLFNBQVMsNkJBQW1CO0FBQ3ZDLFNBQ0Usb0NBQUM7QUFBQSxJQUFJLE9BQU8sRUFBRSxPQUFPLFFBQVE7QUFBQSxLQUMzQixvQ0FBQztBQUFBLE9BQW1DLGFBQWE7QUFBQSxHQUFHLENBQ3REO0FBRUosR0FOc0I7QUFRZixNQUFNLFFBQVEsNkJBQW1CO0FBQ3RDLFNBQ0Usb0NBQUM7QUFBQSxJQUFJLE9BQU8sRUFBRSxPQUFPLFFBQVE7QUFBQSxLQUMzQixvQ0FBQztBQUFBLE9BQW1DLGFBQWEsSUFBSTtBQUFBLEdBQUcsQ0FDMUQ7QUFFSixHQU5xQjsiLAogICJuYW1lcyI6IFtdCn0K
