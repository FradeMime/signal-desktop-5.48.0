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
var StickerManager_stories_exports = {};
__export(StickerManager_stories_exports, {
  Empty: () => Empty,
  Full: () => Full,
  InstalledKnownPacks: () => InstalledKnownPacks,
  InstalledPacks: () => InstalledPacks,
  ReceivedPacks: () => ReceivedPacks,
  default: () => StickerManager_stories_default
});
module.exports = __toCommonJS(StickerManager_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_StickerManager = require("./StickerManager");
var import_StickerPicker = require("./StickerPicker.stories");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var StickerManager_stories_default = {
  title: "Components/Stickers/StickerManager"
};
const receivedPacks = [
  (0, import_StickerPicker.createPack)({ id: "received-pack-1", status: "downloaded" }, import_StickerPicker.sticker1),
  (0, import_StickerPicker.createPack)({ id: "received-pack-2", status: "downloaded" }, import_StickerPicker.sticker2)
];
const installedPacks = [
  (0, import_StickerPicker.createPack)({ id: "installed-pack-1", status: "installed" }, import_StickerPicker.sticker1),
  (0, import_StickerPicker.createPack)({ id: "installed-pack-2", status: "installed" }, import_StickerPicker.sticker2)
];
const blessedPacks = [
  (0, import_StickerPicker.createPack)({ id: "blessed-pack-1", status: "downloaded", isBlessed: true }, import_StickerPicker.sticker1),
  (0, import_StickerPicker.createPack)({ id: "blessed-pack-2", status: "downloaded", isBlessed: true }, import_StickerPicker.sticker2)
];
const knownPacks = [
  (0, import_StickerPicker.createPack)({ id: "known-pack-1", status: "known" }, import_StickerPicker.sticker1),
  (0, import_StickerPicker.createPack)({ id: "known-pack-2", status: "known" }, import_StickerPicker.sticker2)
];
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  blessedPacks: overrideProps.blessedPacks || [],
  downloadStickerPack: (0, import_addon_actions.action)("downloadStickerPack"),
  i18n,
  installStickerPack: (0, import_addon_actions.action)("installStickerPack"),
  installedPacks: overrideProps.installedPacks || [],
  knownPacks: overrideProps.knownPacks || [],
  receivedPacks: overrideProps.receivedPacks || [],
  uninstallStickerPack: (0, import_addon_actions.action)("uninstallStickerPack")
}), "createProps");
const Full = /* @__PURE__ */ __name(() => {
  const props = createProps({ installedPacks, receivedPacks, blessedPacks });
  return /* @__PURE__ */ React.createElement(import_StickerManager.StickerManager, {
    ...props
  });
}, "Full");
const InstalledPacks = /* @__PURE__ */ __name(() => {
  const props = createProps({ installedPacks });
  return /* @__PURE__ */ React.createElement(import_StickerManager.StickerManager, {
    ...props
  });
}, "InstalledPacks");
const ReceivedPacks = /* @__PURE__ */ __name(() => {
  const props = createProps({ receivedPacks });
  return /* @__PURE__ */ React.createElement(import_StickerManager.StickerManager, {
    ...props
  });
}, "ReceivedPacks");
const InstalledKnownPacks = /* @__PURE__ */ __name(() => {
  const props = createProps({ installedPacks, knownPacks });
  return /* @__PURE__ */ React.createElement(import_StickerManager.StickerManager, {
    ...props
  });
}, "InstalledKnownPacks");
InstalledKnownPacks.story = {
  name: "Installed + Known Packs"
};
const Empty = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_StickerManager.StickerManager, {
    ...props
  });
}, "Empty");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Empty,
  Full,
  InstalledKnownPacks,
  InstalledPacks,
  ReceivedPacks
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlck1hbmFnZXIuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi9TdGlja2VyTWFuYWdlcic7XG5pbXBvcnQgeyBTdGlja2VyTWFuYWdlciB9IGZyb20gJy4vU3RpY2tlck1hbmFnZXInO1xuaW1wb3J0IHsgY3JlYXRlUGFjaywgc3RpY2tlcjEsIHN0aWNrZXIyIH0gZnJvbSAnLi9TdGlja2VyUGlja2VyLnN0b3JpZXMnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9TdGlja2Vycy9TdGlja2VyTWFuYWdlcicsXG59O1xuXG5jb25zdCByZWNlaXZlZFBhY2tzID0gW1xuICBjcmVhdGVQYWNrKHsgaWQ6ICdyZWNlaXZlZC1wYWNrLTEnLCBzdGF0dXM6ICdkb3dubG9hZGVkJyB9LCBzdGlja2VyMSksXG4gIGNyZWF0ZVBhY2soeyBpZDogJ3JlY2VpdmVkLXBhY2stMicsIHN0YXR1czogJ2Rvd25sb2FkZWQnIH0sIHN0aWNrZXIyKSxcbl07XG5cbmNvbnN0IGluc3RhbGxlZFBhY2tzID0gW1xuICBjcmVhdGVQYWNrKHsgaWQ6ICdpbnN0YWxsZWQtcGFjay0xJywgc3RhdHVzOiAnaW5zdGFsbGVkJyB9LCBzdGlja2VyMSksXG4gIGNyZWF0ZVBhY2soeyBpZDogJ2luc3RhbGxlZC1wYWNrLTInLCBzdGF0dXM6ICdpbnN0YWxsZWQnIH0sIHN0aWNrZXIyKSxcbl07XG5cbmNvbnN0IGJsZXNzZWRQYWNrcyA9IFtcbiAgY3JlYXRlUGFjayhcbiAgICB7IGlkOiAnYmxlc3NlZC1wYWNrLTEnLCBzdGF0dXM6ICdkb3dubG9hZGVkJywgaXNCbGVzc2VkOiB0cnVlIH0sXG4gICAgc3RpY2tlcjFcbiAgKSxcbiAgY3JlYXRlUGFjayhcbiAgICB7IGlkOiAnYmxlc3NlZC1wYWNrLTInLCBzdGF0dXM6ICdkb3dubG9hZGVkJywgaXNCbGVzc2VkOiB0cnVlIH0sXG4gICAgc3RpY2tlcjJcbiAgKSxcbl07XG5cbmNvbnN0IGtub3duUGFja3MgPSBbXG4gIGNyZWF0ZVBhY2soeyBpZDogJ2tub3duLXBhY2stMScsIHN0YXR1czogJ2tub3duJyB9LCBzdGlja2VyMSksXG4gIGNyZWF0ZVBhY2soeyBpZDogJ2tub3duLXBhY2stMicsIHN0YXR1czogJ2tub3duJyB9LCBzdGlja2VyMiksXG5dO1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzPiA9IHt9KTogUHJvcHMgPT4gKHtcbiAgYmxlc3NlZFBhY2tzOiBvdmVycmlkZVByb3BzLmJsZXNzZWRQYWNrcyB8fCBbXSxcbiAgZG93bmxvYWRTdGlja2VyUGFjazogYWN0aW9uKCdkb3dubG9hZFN0aWNrZXJQYWNrJyksXG4gIGkxOG4sXG4gIGluc3RhbGxTdGlja2VyUGFjazogYWN0aW9uKCdpbnN0YWxsU3RpY2tlclBhY2snKSxcbiAgaW5zdGFsbGVkUGFja3M6IG92ZXJyaWRlUHJvcHMuaW5zdGFsbGVkUGFja3MgfHwgW10sXG4gIGtub3duUGFja3M6IG92ZXJyaWRlUHJvcHMua25vd25QYWNrcyB8fCBbXSxcbiAgcmVjZWl2ZWRQYWNrczogb3ZlcnJpZGVQcm9wcy5yZWNlaXZlZFBhY2tzIHx8IFtdLFxuICB1bmluc3RhbGxTdGlja2VyUGFjazogYWN0aW9uKCd1bmluc3RhbGxTdGlja2VyUGFjaycpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBGdWxsID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7IGluc3RhbGxlZFBhY2tzLCByZWNlaXZlZFBhY2tzLCBibGVzc2VkUGFja3MgfSk7XG5cbiAgcmV0dXJuIDxTdGlja2VyTWFuYWdlciB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IEluc3RhbGxlZFBhY2tzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7IGluc3RhbGxlZFBhY2tzIH0pO1xuXG4gIHJldHVybiA8U3RpY2tlck1hbmFnZXIgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBSZWNlaXZlZFBhY2tzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7IHJlY2VpdmVkUGFja3MgfSk7XG5cbiAgcmV0dXJuIDxTdGlja2VyTWFuYWdlciB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IEluc3RhbGxlZEtub3duUGFja3MgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHsgaW5zdGFsbGVkUGFja3MsIGtub3duUGFja3MgfSk7XG5cbiAgcmV0dXJuIDxTdGlja2VyTWFuYWdlciB7Li4ucHJvcHN9IC8+O1xufTtcblxuSW5zdGFsbGVkS25vd25QYWNrcy5zdG9yeSA9IHtcbiAgbmFtZTogJ0luc3RhbGxlZCArIEtub3duIFBhY2tzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBFbXB0eSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoKTtcblxuICByZXR1cm4gPFN0aWNrZXJNYW5hZ2VyIHsuLi5w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
