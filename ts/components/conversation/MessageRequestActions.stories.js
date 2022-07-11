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
var MessageRequestActions_stories_exports = {};
__export(MessageRequestActions_stories_exports, {
  Direct: () => Direct,
  DirectBlocked: () => DirectBlocked,
  Group: () => Group,
  GroupBlocked: () => GroupBlocked,
  default: () => MessageRequestActions_stories_default
});
module.exports = __toCommonJS(MessageRequestActions_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_MessageRequestActions = require("./MessageRequestActions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const getBaseProps = /* @__PURE__ */ __name((isGroup = false) => ({
  i18n,
  conversationType: isGroup ? "group" : "direct",
  firstName: (0, import_addon_knobs.text)("firstName", "Cayce"),
  title: isGroup ? (0, import_addon_knobs.text)("title", "NYC Rock Climbers") : (0, import_addon_knobs.text)("title", "Cayce Bollard"),
  onBlock: (0, import_addon_actions.action)("block"),
  onDelete: (0, import_addon_actions.action)("delete"),
  onBlockAndReportSpam: (0, import_addon_actions.action)("blockAndReportSpam"),
  onUnblock: (0, import_addon_actions.action)("unblock"),
  onAccept: (0, import_addon_actions.action)("accept")
}), "getBaseProps");
var MessageRequestActions_stories_default = {
  title: "Components/Conversation/MessageRequestActions"
};
const Direct = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(import_MessageRequestActions.MessageRequestActions, {
    ...getBaseProps()
  }));
}, "Direct");
const DirectBlocked = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(import_MessageRequestActions.MessageRequestActions, {
    ...getBaseProps(),
    isBlocked: true
  }));
}, "DirectBlocked");
DirectBlocked.story = {
  name: "Direct (Blocked)"
};
const Group = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(import_MessageRequestActions.MessageRequestActions, {
    ...getBaseProps(true)
  }));
}, "Group");
const GroupBlocked = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement("div", {
    style: { width: "480px" }
  }, /* @__PURE__ */ React.createElement(import_MessageRequestActions.MessageRequestActions, {
    ...getBaseProps(true),
    isBlocked: true
  }));
}, "GroupBlocked");
GroupBlocked.story = {
  name: "Group (Blocked)"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Direct,
  DirectBlocked,
  Group,
  GroupBlocked
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZVJlcXVlc3RBY3Rpb25zLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdGV4dCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wcyBhcyBNZXNzYWdlUmVxdWVzdEFjdGlvbnNQcm9wcyB9IGZyb20gJy4vTWVzc2FnZVJlcXVlc3RBY3Rpb25zJztcbmltcG9ydCB7IE1lc3NhZ2VSZXF1ZXN0QWN0aW9ucyB9IGZyb20gJy4vTWVzc2FnZVJlcXVlc3RBY3Rpb25zJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5jb25zdCBnZXRCYXNlUHJvcHMgPSAoaXNHcm91cCA9IGZhbHNlKTogTWVzc2FnZVJlcXVlc3RBY3Rpb25zUHJvcHMgPT4gKHtcbiAgaTE4bixcbiAgY29udmVyc2F0aW9uVHlwZTogaXNHcm91cCA/ICdncm91cCcgOiAnZGlyZWN0JyxcbiAgZmlyc3ROYW1lOiB0ZXh0KCdmaXJzdE5hbWUnLCAnQ2F5Y2UnKSxcbiAgdGl0bGU6IGlzR3JvdXBcbiAgICA/IHRleHQoJ3RpdGxlJywgJ05ZQyBSb2NrIENsaW1iZXJzJylcbiAgICA6IHRleHQoJ3RpdGxlJywgJ0NheWNlIEJvbGxhcmQnKSxcbiAgb25CbG9jazogYWN0aW9uKCdibG9jaycpLFxuICBvbkRlbGV0ZTogYWN0aW9uKCdkZWxldGUnKSxcbiAgb25CbG9ja0FuZFJlcG9ydFNwYW06IGFjdGlvbignYmxvY2tBbmRSZXBvcnRTcGFtJyksXG4gIG9uVW5ibG9jazogYWN0aW9uKCd1bmJsb2NrJyksXG4gIG9uQWNjZXB0OiBhY3Rpb24oJ2FjY2VwdCcpLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9NZXNzYWdlUmVxdWVzdEFjdGlvbnMnLFxufTtcblxuZXhwb3J0IGNvbnN0IERpcmVjdCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzQ4MHB4JyB9fT5cbiAgICAgIDxNZXNzYWdlUmVxdWVzdEFjdGlvbnMgey4uLmdldEJhc2VQcm9wcygpfSAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IERpcmVjdEJsb2NrZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICc0ODBweCcgfX0+XG4gICAgICA8TWVzc2FnZVJlcXVlc3RBY3Rpb25zIHsuLi5nZXRCYXNlUHJvcHMoKX0gaXNCbG9ja2VkIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5EaXJlY3RCbG9ja2VkLnN0b3J5ID0ge1xuICBuYW1lOiAnRGlyZWN0IChCbG9ja2VkKScsXG59O1xuXG5leHBvcnQgY29uc3QgR3JvdXAgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICc0ODBweCcgfX0+XG4gICAgICA8TWVzc2FnZVJlcXVlc3RBY3Rpb25zIHsuLi5nZXRCYXNlUHJvcHModHJ1ZSl9IC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgR3JvdXBCbG9ja2VkID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnNDgwcHgnIH19PlxuICAgICAgPE1lc3NhZ2VSZXF1ZXN0QWN0aW9ucyB7Li4uZ2V0QmFzZVByb3BzKHRydWUpfSBpc0Jsb2NrZWQgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbkdyb3VwQmxvY2tlZC5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIChCbG9ja2VkKScsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIseUJBQXFCO0FBQ3JCLDJCQUF1QjtBQUd2QixtQ0FBc0M7QUFDdEMsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFNLGVBQWUsd0JBQUMsVUFBVSxVQUF1QztBQUFBLEVBQ3JFO0FBQUEsRUFDQSxrQkFBa0IsVUFBVSxVQUFVO0FBQUEsRUFDdEMsV0FBVyw2QkFBSyxhQUFhLE9BQU87QUFBQSxFQUNwQyxPQUFPLFVBQ0gsNkJBQUssU0FBUyxtQkFBbUIsSUFDakMsNkJBQUssU0FBUyxlQUFlO0FBQUEsRUFDakMsU0FBUyxpQ0FBTyxPQUFPO0FBQUEsRUFDdkIsVUFBVSxpQ0FBTyxRQUFRO0FBQUEsRUFDekIsc0JBQXNCLGlDQUFPLG9CQUFvQjtBQUFBLEVBQ2pELFdBQVcsaUNBQU8sU0FBUztBQUFBLEVBQzNCLFVBQVUsaUNBQU8sUUFBUTtBQUMzQixJQVpxQjtBQWNyQixJQUFPLHdDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLFNBQVMsNkJBQW1CO0FBQ3ZDLFNBQ0Usb0NBQUM7QUFBQSxJQUFJLE9BQU8sRUFBRSxPQUFPLFFBQVE7QUFBQSxLQUMzQixvQ0FBQztBQUFBLE9BQTBCLGFBQWE7QUFBQSxHQUFHLENBQzdDO0FBRUosR0FOc0I7QUFRZixNQUFNLGdCQUFnQiw2QkFBbUI7QUFDOUMsU0FDRSxvQ0FBQztBQUFBLElBQUksT0FBTyxFQUFFLE9BQU8sUUFBUTtBQUFBLEtBQzNCLG9DQUFDO0FBQUEsT0FBMEIsYUFBYTtBQUFBLElBQUcsV0FBUztBQUFBLEdBQUMsQ0FDdkQ7QUFFSixHQU42QjtBQVE3QixjQUFjLFFBQVE7QUFBQSxFQUNwQixNQUFNO0FBQ1I7QUFFTyxNQUFNLFFBQVEsNkJBQW1CO0FBQ3RDLFNBQ0Usb0NBQUM7QUFBQSxJQUFJLE9BQU8sRUFBRSxPQUFPLFFBQVE7QUFBQSxLQUMzQixvQ0FBQztBQUFBLE9BQTBCLGFBQWEsSUFBSTtBQUFBLEdBQUcsQ0FDakQ7QUFFSixHQU5xQjtBQVFkLE1BQU0sZUFBZSw2QkFBbUI7QUFDN0MsU0FDRSxvQ0FBQztBQUFBLElBQUksT0FBTyxFQUFFLE9BQU8sUUFBUTtBQUFBLEtBQzNCLG9DQUFDO0FBQUEsT0FBMEIsYUFBYSxJQUFJO0FBQUEsSUFBRyxXQUFTO0FBQUEsR0FBQyxDQUMzRDtBQUVKLEdBTjRCO0FBUTVCLGFBQWEsUUFBUTtBQUFBLEVBQ25CLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
