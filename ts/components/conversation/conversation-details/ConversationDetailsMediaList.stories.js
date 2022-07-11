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
var ConversationDetailsMediaList_stories_exports = {};
__export(ConversationDetailsMediaList_stories_exports, {
  Basic: () => Basic,
  default: () => ConversationDetailsMediaList_stories_default
});
module.exports = __toCommonJS(ConversationDetailsMediaList_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../../util/setupI18n");
var import_messages = __toESM(require("../../../../_locales/en/messages.json"));
var import_ConversationDetailsMediaList = require("./ConversationDetailsMediaList");
var import_AttachmentSection = require("../media-gallery/AttachmentSection.stories");
var import_getDefaultConversation = require("../../../test-both/helpers/getDefaultConversation");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ConversationDetailsMediaList_stories_default = {
  title: "Components/Conversation/ConversationDetails/ConversationMediaList"
};
const createProps = /* @__PURE__ */ __name((mediaItems) => ({
  conversation: (0, import_getDefaultConversation.getDefaultConversation)({
    recentMediaItems: mediaItems || []
  }),
  i18n,
  loadRecentMediaItems: (0, import_addon_actions.action)("loadRecentMediaItems"),
  showAllMedia: (0, import_addon_actions.action)("showAllMedia"),
  showLightboxForMedia: (0, import_addon_actions.action)("showLightboxForMedia")
}), "createProps");
const Basic = /* @__PURE__ */ __name(() => {
  const mediaItems = (0, import_AttachmentSection.createPreparedMediaItems)(import_AttachmentSection.createRandomMedia);
  const props = createProps(mediaItems);
  return /* @__PURE__ */ React.createElement(import_ConversationDetailsMediaList.ConversationDetailsMediaList, {
    ...props
  });
}, "Basic");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Basic
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uRGV0YWlsc01lZGlhTGlzdC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi9Db252ZXJzYXRpb25EZXRhaWxzTWVkaWFMaXN0JztcbmltcG9ydCB7IENvbnZlcnNhdGlvbkRldGFpbHNNZWRpYUxpc3QgfSBmcm9tICcuL0NvbnZlcnNhdGlvbkRldGFpbHNNZWRpYUxpc3QnO1xuaW1wb3J0IHtcbiAgY3JlYXRlUHJlcGFyZWRNZWRpYUl0ZW1zLFxuICBjcmVhdGVSYW5kb21NZWRpYSxcbn0gZnJvbSAnLi4vbWVkaWEtZ2FsbGVyeS9BdHRhY2htZW50U2VjdGlvbi5zdG9yaWVzJztcbmltcG9ydCB0eXBlIHsgTWVkaWFJdGVtVHlwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL01lZGlhSXRlbSc7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9Db252ZXJzYXRpb25EZXRhaWxzL0NvbnZlcnNhdGlvbk1lZGlhTGlzdCcsXG59O1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChtZWRpYUl0ZW1zPzogQXJyYXk8TWVkaWFJdGVtVHlwZT4pOiBQcm9wcyA9PiAoe1xuICBjb252ZXJzYXRpb246IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgIHJlY2VudE1lZGlhSXRlbXM6IG1lZGlhSXRlbXMgfHwgW10sXG4gIH0pLFxuICBpMThuLFxuICBsb2FkUmVjZW50TWVkaWFJdGVtczogYWN0aW9uKCdsb2FkUmVjZW50TWVkaWFJdGVtcycpLFxuICBzaG93QWxsTWVkaWE6IGFjdGlvbignc2hvd0FsbE1lZGlhJyksXG4gIHNob3dMaWdodGJveEZvck1lZGlhOiBhY3Rpb24oJ3Nob3dMaWdodGJveEZvck1lZGlhJyksXG59KTtcblxuZXhwb3J0IGNvbnN0IEJhc2ljID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgbWVkaWFJdGVtcyA9IGNyZWF0ZVByZXBhcmVkTWVkaWFJdGVtcyhjcmVhdGVSYW5kb21NZWRpYSk7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMobWVkaWFJdGVtcyk7XG5cbiAgcmV0dXJuIDxDb252ZXJzYXRpb25EZXRhaWxzTWVkaWFMaXN0IHsuLi5wcm9wc30gLz47XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFFdkIsMkJBQXVCO0FBRXZCLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFHdkIsMENBQTZDO0FBQzdDLCtCQUdPO0FBRVAsb0NBQXVDO0FBRXZDLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8sK0NBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0sY0FBYyx3QkFBQyxlQUE4QztBQUFBLEVBQ2pFLGNBQWMsMERBQXVCO0FBQUEsSUFDbkMsa0JBQWtCLGNBQWMsQ0FBQztBQUFBLEVBQ25DLENBQUM7QUFBQSxFQUNEO0FBQUEsRUFDQSxzQkFBc0IsaUNBQU8sc0JBQXNCO0FBQUEsRUFDbkQsY0FBYyxpQ0FBTyxjQUFjO0FBQUEsRUFDbkMsc0JBQXNCLGlDQUFPLHNCQUFzQjtBQUNyRCxJQVJvQjtBQVViLE1BQU0sUUFBUSw2QkFBbUI7QUFDdEMsUUFBTSxhQUFhLHVEQUF5QiwwQ0FBaUI7QUFDN0QsUUFBTSxRQUFRLFlBQVksVUFBVTtBQUVwQyxTQUFPLG9DQUFDO0FBQUEsT0FBaUM7QUFBQSxHQUFPO0FBQ2xELEdBTHFCOyIsCiAgIm5hbWVzIjogW10KfQo=
