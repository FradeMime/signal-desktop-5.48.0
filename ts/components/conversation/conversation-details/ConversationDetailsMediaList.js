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
var ConversationDetailsMediaList_exports = {};
__export(ConversationDetailsMediaList_exports, {
  ConversationDetailsMediaList: () => ConversationDetailsMediaList
});
module.exports = __toCommonJS(ConversationDetailsMediaList_exports);
var import_react = __toESM(require("react"));
var import_PanelSection = require("./PanelSection");
var import_util = require("./util");
var import_MediaGridItem = require("../media-gallery/MediaGridItem");
const MEDIA_ITEM_LIMIT = 6;
const bem = (0, import_util.bemGenerator)("ConversationDetails-media-list");
const ConversationDetailsMediaList = /* @__PURE__ */ __name(({
  conversation,
  i18n,
  loadRecentMediaItems,
  showAllMedia,
  showLightboxForMedia
}) => {
  const mediaItems = conversation.recentMediaItems || [];
  const mediaItemsLength = mediaItems.length;
  import_react.default.useEffect(() => {
    loadRecentMediaItems(MEDIA_ITEM_LIMIT);
  }, [loadRecentMediaItems, mediaItemsLength]);
  if (mediaItemsLength === 0) {
    return null;
  }
  return /* @__PURE__ */ import_react.default.createElement(import_PanelSection.PanelSection, {
    actions: /* @__PURE__ */ import_react.default.createElement("button", {
      className: bem("show-all"),
      onClick: showAllMedia,
      type: "button"
    }, i18n("ConversationDetailsMediaList--show-all")),
    title: i18n("ConversationDetailsMediaList--shared-media")
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: bem("root")
  }, mediaItems.slice(0, MEDIA_ITEM_LIMIT).map((mediaItem) => /* @__PURE__ */ import_react.default.createElement(import_MediaGridItem.MediaGridItem, {
    key: `${mediaItem.message.id}-${mediaItem.index}`,
    mediaItem,
    i18n,
    onClick: () => showLightboxForMedia(mediaItem, mediaItems)
  }))));
}, "ConversationDetailsMediaList");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationDetailsMediaList
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uRGV0YWlsc01lZGlhTGlzdC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvVXRpbCc7XG5cbmltcG9ydCB0eXBlIHsgTWVkaWFJdGVtVHlwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL01lZGlhSXRlbSc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcblxuaW1wb3J0IHsgUGFuZWxTZWN0aW9uIH0gZnJvbSAnLi9QYW5lbFNlY3Rpb24nO1xuaW1wb3J0IHsgYmVtR2VuZXJhdG9yIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IE1lZGlhR3JpZEl0ZW0gfSBmcm9tICcuLi9tZWRpYS1nYWxsZXJ5L01lZGlhR3JpZEl0ZW0nO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25UeXBlO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBsb2FkUmVjZW50TWVkaWFJdGVtczogKGxpbWl0OiBudW1iZXIpID0+IHZvaWQ7XG4gIHNob3dBbGxNZWRpYTogKCkgPT4gdm9pZDtcbiAgc2hvd0xpZ2h0Ym94Rm9yTWVkaWE6IChcbiAgICBzZWxlY3RlZE1lZGlhSXRlbTogTWVkaWFJdGVtVHlwZSxcbiAgICBtZWRpYTogQXJyYXk8TWVkaWFJdGVtVHlwZT5cbiAgKSA9PiB2b2lkO1xufTtcblxuY29uc3QgTUVESUFfSVRFTV9MSU1JVCA9IDY7XG5cbmNvbnN0IGJlbSA9IGJlbUdlbmVyYXRvcignQ29udmVyc2F0aW9uRGV0YWlscy1tZWRpYS1saXN0Jyk7XG5cbmV4cG9ydCBjb25zdCBDb252ZXJzYXRpb25EZXRhaWxzTWVkaWFMaXN0OiBSZWFjdC5Db21wb25lbnRUeXBlPFByb3BzPiA9ICh7XG4gIGNvbnZlcnNhdGlvbixcbiAgaTE4bixcbiAgbG9hZFJlY2VudE1lZGlhSXRlbXMsXG4gIHNob3dBbGxNZWRpYSxcbiAgc2hvd0xpZ2h0Ym94Rm9yTWVkaWEsXG59KSA9PiB7XG4gIGNvbnN0IG1lZGlhSXRlbXMgPSBjb252ZXJzYXRpb24ucmVjZW50TWVkaWFJdGVtcyB8fCBbXTtcblxuICBjb25zdCBtZWRpYUl0ZW1zTGVuZ3RoID0gbWVkaWFJdGVtcy5sZW5ndGg7XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2FkUmVjZW50TWVkaWFJdGVtcyhNRURJQV9JVEVNX0xJTUlUKTtcbiAgfSwgW2xvYWRSZWNlbnRNZWRpYUl0ZW1zLCBtZWRpYUl0ZW1zTGVuZ3RoXSk7XG5cbiAgaWYgKG1lZGlhSXRlbXNMZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPFBhbmVsU2VjdGlvblxuICAgICAgYWN0aW9ucz17XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBjbGFzc05hbWU9e2JlbSgnc2hvdy1hbGwnKX1cbiAgICAgICAgICBvbkNsaWNrPXtzaG93QWxsTWVkaWF9XG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgID5cbiAgICAgICAgICB7aTE4bignQ29udmVyc2F0aW9uRGV0YWlsc01lZGlhTGlzdC0tc2hvdy1hbGwnKX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICB9XG4gICAgICB0aXRsZT17aTE4bignQ29udmVyc2F0aW9uRGV0YWlsc01lZGlhTGlzdC0tc2hhcmVkLW1lZGlhJyl9XG4gICAgPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2JlbSgncm9vdCcpfT5cbiAgICAgICAge21lZGlhSXRlbXMuc2xpY2UoMCwgTUVESUFfSVRFTV9MSU1JVCkubWFwKG1lZGlhSXRlbSA9PiAoXG4gICAgICAgICAgPE1lZGlhR3JpZEl0ZW1cbiAgICAgICAgICAgIGtleT17YCR7bWVkaWFJdGVtLm1lc3NhZ2UuaWR9LSR7bWVkaWFJdGVtLmluZGV4fWB9XG4gICAgICAgICAgICBtZWRpYUl0ZW09e21lZGlhSXRlbX1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzaG93TGlnaHRib3hGb3JNZWRpYShtZWRpYUl0ZW0sIG1lZGlhSXRlbXMpfVxuICAgICAgICAgIC8+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgPC9QYW5lbFNlY3Rpb24+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQU9sQiwwQkFBNkI7QUFDN0Isa0JBQTZCO0FBQzdCLDJCQUE4QjtBQWE5QixNQUFNLG1CQUFtQjtBQUV6QixNQUFNLE1BQU0sOEJBQWEsZ0NBQWdDO0FBRWxELE1BQU0sK0JBQTJELHdCQUFDO0FBQUEsRUFDdkU7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDSTtBQUNKLFFBQU0sYUFBYSxhQUFhLG9CQUFvQixDQUFDO0FBRXJELFFBQU0sbUJBQW1CLFdBQVc7QUFFcEMsdUJBQU0sVUFBVSxNQUFNO0FBQ3BCLHlCQUFxQixnQkFBZ0I7QUFBQSxFQUN2QyxHQUFHLENBQUMsc0JBQXNCLGdCQUFnQixDQUFDO0FBRTNDLE1BQUkscUJBQXFCLEdBQUc7QUFDMUIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUNFLG1EQUFDO0FBQUEsSUFDQyxTQUNFLG1EQUFDO0FBQUEsTUFDQyxXQUFXLElBQUksVUFBVTtBQUFBLE1BQ3pCLFNBQVM7QUFBQSxNQUNULE1BQUs7QUFBQSxPQUVKLEtBQUssd0NBQXdDLENBQ2hEO0FBQUEsSUFFRixPQUFPLEtBQUssNENBQTRDO0FBQUEsS0FFeEQsbURBQUM7QUFBQSxJQUFJLFdBQVcsSUFBSSxNQUFNO0FBQUEsS0FDdkIsV0FBVyxNQUFNLEdBQUcsZ0JBQWdCLEVBQUUsSUFBSSxlQUN6QyxtREFBQztBQUFBLElBQ0MsS0FBSyxHQUFHLFVBQVUsUUFBUSxNQUFNLFVBQVU7QUFBQSxJQUMxQztBQUFBLElBQ0E7QUFBQSxJQUNBLFNBQVMsTUFBTSxxQkFBcUIsV0FBVyxVQUFVO0FBQUEsR0FDM0QsQ0FDRCxDQUNILENBQ0Y7QUFFSixHQTVDd0U7IiwKICAibmFtZXMiOiBbXQp9Cg==
