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
var StickerButton_stories_exports = {};
__export(StickerButton_stories_exports, {
  InstalledPackTooltip: () => InstalledPackTooltip,
  InstalledPackTooltipTall: () => InstalledPackTooltipTall,
  InstalledPackTooltipWide: () => InstalledPackTooltipWide,
  NewInstallTooltip: () => NewInstallTooltip,
  NoPacks: () => NoPacks,
  OnlyBlessed: () => OnlyBlessed,
  OnlyInstalled: () => OnlyInstalled,
  OnlyKnown: () => OnlyKnown,
  OnlyReceived: () => OnlyReceived,
  default: () => StickerButton_stories_default
});
module.exports = __toCommonJS(StickerButton_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_StickerButton = require("./StickerButton");
var import_StickerPicker = require("./StickerPicker.stories");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var StickerButton_stories_default = {
  title: "Components/Stickers/StickerButton",
  decorators: [
    (storyFn) => /* @__PURE__ */ React.createElement("div", {
      style: {
        height: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end"
      }
    }, storyFn())
  ]
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
  clearInstalledStickerPack: (0, import_addon_actions.action)("clearInstalledStickerPack"),
  clearShowIntroduction: (0, import_addon_actions.action)("clearShowIntroduction"),
  clearShowPickerHint: (0, import_addon_actions.action)("clearShowPickerHint"),
  i18n,
  installedPack: overrideProps.installedPack,
  installedPacks: overrideProps.installedPacks || [],
  knownPacks: overrideProps.knownPacks || [],
  onClickAddPack: (0, import_addon_actions.action)("onClickAddPack"),
  onPickSticker: (0, import_addon_actions.action)("onPickSticker"),
  receivedPacks: overrideProps.receivedPacks || [],
  recentStickers: [],
  showIntroduction: (0, import_addon_knobs.boolean)("showIntroduction", overrideProps.showIntroduction || false),
  showPickerHint: (0, import_addon_knobs.boolean)("showPickerHint", false)
}), "createProps");
const OnlyInstalled = /* @__PURE__ */ __name(() => {
  const props = createProps({ installedPacks });
  return /* @__PURE__ */ React.createElement(import_StickerButton.StickerButton, {
    ...props
  });
}, "OnlyInstalled");
const OnlyReceived = /* @__PURE__ */ __name(() => {
  const props = createProps({ receivedPacks });
  return /* @__PURE__ */ React.createElement(import_StickerButton.StickerButton, {
    ...props
  });
}, "OnlyReceived");
const OnlyKnown = /* @__PURE__ */ __name(() => {
  const props = createProps({ knownPacks });
  return /* @__PURE__ */ React.createElement(import_StickerButton.StickerButton, {
    ...props
  });
}, "OnlyKnown");
const OnlyBlessed = /* @__PURE__ */ __name(() => {
  const props = createProps({ blessedPacks });
  return /* @__PURE__ */ React.createElement(import_StickerButton.StickerButton, {
    ...props
  });
}, "OnlyBlessed");
const NoPacks = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_StickerButton.StickerButton, {
    ...props
  });
}, "NoPacks");
const InstalledPackTooltip = /* @__PURE__ */ __name(() => {
  const props = createProps({
    installedPacks,
    installedPack: installedPacks[0]
  });
  return /* @__PURE__ */ React.createElement(import_StickerButton.StickerButton, {
    ...props
  });
}, "InstalledPackTooltip");
const InstalledPackTooltipWide = /* @__PURE__ */ __name(() => {
  const installedPack = (0, import_StickerPicker.createPack)({ id: "installed-pack-wide" }, import_StickerPicker.wideSticker);
  const props = createProps({
    installedPacks: [installedPack],
    installedPack
  });
  return /* @__PURE__ */ React.createElement(import_StickerButton.StickerButton, {
    ...props
  });
}, "InstalledPackTooltipWide");
InstalledPackTooltipWide.story = {
  name: "Installed Pack Tooltip (Wide)"
};
const InstalledPackTooltipTall = /* @__PURE__ */ __name(() => {
  const installedPack = (0, import_StickerPicker.createPack)({ id: "installed-pack-tall" }, import_StickerPicker.tallSticker);
  const props = createProps({
    installedPacks: [installedPack],
    installedPack
  });
  return /* @__PURE__ */ React.createElement(import_StickerButton.StickerButton, {
    ...props
  });
}, "InstalledPackTooltipTall");
InstalledPackTooltipTall.story = {
  name: "Installed Pack Tooltip (Tall)"
};
const NewInstallTooltip = /* @__PURE__ */ __name(() => {
  const props = createProps({
    installedPacks,
    showIntroduction: true
  });
  return /* @__PURE__ */ React.createElement(import_StickerButton.StickerButton, {
    ...props
  });
}, "NewInstallTooltip");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InstalledPackTooltip,
  InstalledPackTooltipTall,
  InstalledPackTooltipWide,
  NewInstallTooltip,
  NoPacks,
  OnlyBlessed,
  OnlyInstalled,
  OnlyKnown,
  OnlyReceived
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlckJ1dHRvbi5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IERlY29yYXRvckZ1bmN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbnMnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcbmltcG9ydCB7IGJvb2xlYW4gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi9TdGlja2VyQnV0dG9uJztcbmltcG9ydCB7IFN0aWNrZXJCdXR0b24gfSBmcm9tICcuL1N0aWNrZXJCdXR0b24nO1xuaW1wb3J0IHtcbiAgY3JlYXRlUGFjayxcbiAgc3RpY2tlcjEsXG4gIHN0aWNrZXIyLFxuICB0YWxsU3RpY2tlcixcbiAgd2lkZVN0aWNrZXIsXG59IGZyb20gJy4vU3RpY2tlclBpY2tlci5zdG9yaWVzJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvU3RpY2tlcnMvU3RpY2tlckJ1dHRvbicsXG4gIGRlY29yYXRvcnM6IFtcbiAgICBzdG9yeUZuID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBoZWlnaHQ6ICc1MDBweCcsXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnLFxuICAgICAgICAgIGFsaWduSXRlbXM6ICdmbGV4LWVuZCcsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtzdG9yeUZuKCl9XG4gICAgICA8L2Rpdj5cbiAgICApLFxuICBdIGFzIEFycmF5PERlY29yYXRvckZ1bmN0aW9uPEpTWC5FbGVtZW50Pj4sXG59O1xuXG5jb25zdCByZWNlaXZlZFBhY2tzID0gW1xuICBjcmVhdGVQYWNrKHsgaWQ6ICdyZWNlaXZlZC1wYWNrLTEnLCBzdGF0dXM6ICdkb3dubG9hZGVkJyB9LCBzdGlja2VyMSksXG4gIGNyZWF0ZVBhY2soeyBpZDogJ3JlY2VpdmVkLXBhY2stMicsIHN0YXR1czogJ2Rvd25sb2FkZWQnIH0sIHN0aWNrZXIyKSxcbl07XG5cbmNvbnN0IGluc3RhbGxlZFBhY2tzID0gW1xuICBjcmVhdGVQYWNrKHsgaWQ6ICdpbnN0YWxsZWQtcGFjay0xJywgc3RhdHVzOiAnaW5zdGFsbGVkJyB9LCBzdGlja2VyMSksXG4gIGNyZWF0ZVBhY2soeyBpZDogJ2luc3RhbGxlZC1wYWNrLTInLCBzdGF0dXM6ICdpbnN0YWxsZWQnIH0sIHN0aWNrZXIyKSxcbl07XG5cbmNvbnN0IGJsZXNzZWRQYWNrcyA9IFtcbiAgY3JlYXRlUGFjayhcbiAgICB7IGlkOiAnYmxlc3NlZC1wYWNrLTEnLCBzdGF0dXM6ICdkb3dubG9hZGVkJywgaXNCbGVzc2VkOiB0cnVlIH0sXG4gICAgc3RpY2tlcjFcbiAgKSxcbiAgY3JlYXRlUGFjayhcbiAgICB7IGlkOiAnYmxlc3NlZC1wYWNrLTInLCBzdGF0dXM6ICdkb3dubG9hZGVkJywgaXNCbGVzc2VkOiB0cnVlIH0sXG4gICAgc3RpY2tlcjJcbiAgKSxcbl07XG5cbmNvbnN0IGtub3duUGFja3MgPSBbXG4gIGNyZWF0ZVBhY2soeyBpZDogJ2tub3duLXBhY2stMScsIHN0YXR1czogJ2tub3duJyB9LCBzdGlja2VyMSksXG4gIGNyZWF0ZVBhY2soeyBpZDogJ2tub3duLXBhY2stMicsIHN0YXR1czogJ2tub3duJyB9LCBzdGlja2VyMiksXG5dO1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzPiA9IHt9KTogUHJvcHMgPT4gKHtcbiAgYmxlc3NlZFBhY2tzOiBvdmVycmlkZVByb3BzLmJsZXNzZWRQYWNrcyB8fCBbXSxcbiAgY2xlYXJJbnN0YWxsZWRTdGlja2VyUGFjazogYWN0aW9uKCdjbGVhckluc3RhbGxlZFN0aWNrZXJQYWNrJyksXG4gIGNsZWFyU2hvd0ludHJvZHVjdGlvbjogYWN0aW9uKCdjbGVhclNob3dJbnRyb2R1Y3Rpb24nKSxcbiAgY2xlYXJTaG93UGlja2VySGludDogYWN0aW9uKCdjbGVhclNob3dQaWNrZXJIaW50JyksXG4gIGkxOG4sXG4gIGluc3RhbGxlZFBhY2s6IG92ZXJyaWRlUHJvcHMuaW5zdGFsbGVkUGFjayxcbiAgaW5zdGFsbGVkUGFja3M6IG92ZXJyaWRlUHJvcHMuaW5zdGFsbGVkUGFja3MgfHwgW10sXG4gIGtub3duUGFja3M6IG92ZXJyaWRlUHJvcHMua25vd25QYWNrcyB8fCBbXSxcbiAgb25DbGlja0FkZFBhY2s6IGFjdGlvbignb25DbGlja0FkZFBhY2snKSxcbiAgb25QaWNrU3RpY2tlcjogYWN0aW9uKCdvblBpY2tTdGlja2VyJyksXG4gIHJlY2VpdmVkUGFja3M6IG92ZXJyaWRlUHJvcHMucmVjZWl2ZWRQYWNrcyB8fCBbXSxcbiAgcmVjZW50U3RpY2tlcnM6IFtdLFxuICBzaG93SW50cm9kdWN0aW9uOiBib29sZWFuKFxuICAgICdzaG93SW50cm9kdWN0aW9uJyxcbiAgICBvdmVycmlkZVByb3BzLnNob3dJbnRyb2R1Y3Rpb24gfHwgZmFsc2VcbiAgKSxcbiAgc2hvd1BpY2tlckhpbnQ6IGJvb2xlYW4oJ3Nob3dQaWNrZXJIaW50JywgZmFsc2UpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBPbmx5SW5zdGFsbGVkID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7IGluc3RhbGxlZFBhY2tzIH0pO1xuXG4gIHJldHVybiA8U3RpY2tlckJ1dHRvbiB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE9ubHlSZWNlaXZlZCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoeyByZWNlaXZlZFBhY2tzIH0pO1xuXG4gIHJldHVybiA8U3RpY2tlckJ1dHRvbiB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE9ubHlLbm93biA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoeyBrbm93blBhY2tzIH0pO1xuXG4gIHJldHVybiA8U3RpY2tlckJ1dHRvbiB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE9ubHlCbGVzc2VkID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7IGJsZXNzZWRQYWNrcyB9KTtcblxuICByZXR1cm4gPFN0aWNrZXJCdXR0b24gey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBOb1BhY2tzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcygpO1xuXG4gIHJldHVybiA8U3RpY2tlckJ1dHRvbiB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IEluc3RhbGxlZFBhY2tUb29sdGlwID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgaW5zdGFsbGVkUGFja3MsXG4gICAgaW5zdGFsbGVkUGFjazogaW5zdGFsbGVkUGFja3NbMF0sXG4gIH0pO1xuXG4gIHJldHVybiA8U3RpY2tlckJ1dHRvbiB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IEluc3RhbGxlZFBhY2tUb29sdGlwV2lkZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGluc3RhbGxlZFBhY2sgPSBjcmVhdGVQYWNrKHsgaWQ6ICdpbnN0YWxsZWQtcGFjay13aWRlJyB9LCB3aWRlU3RpY2tlcik7XG5cbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgaW5zdGFsbGVkUGFja3M6IFtpbnN0YWxsZWRQYWNrXSxcbiAgICBpbnN0YWxsZWRQYWNrLFxuICB9KTtcblxuICByZXR1cm4gPFN0aWNrZXJCdXR0b24gey4uLnByb3BzfSAvPjtcbn07XG5cbkluc3RhbGxlZFBhY2tUb29sdGlwV2lkZS5zdG9yeSA9IHtcbiAgbmFtZTogJ0luc3RhbGxlZCBQYWNrIFRvb2x0aXAgKFdpZGUpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBJbnN0YWxsZWRQYWNrVG9vbHRpcFRhbGwgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBpbnN0YWxsZWRQYWNrID0gY3JlYXRlUGFjayh7IGlkOiAnaW5zdGFsbGVkLXBhY2stdGFsbCcgfSwgdGFsbFN0aWNrZXIpO1xuXG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGluc3RhbGxlZFBhY2tzOiBbaW5zdGFsbGVkUGFja10sXG4gICAgaW5zdGFsbGVkUGFjayxcbiAgfSk7XG5cbiAgcmV0dXJuIDxTdGlja2VyQnV0dG9uIHsuLi5wcm9wc30gLz47XG59O1xuXG5JbnN0YWxsZWRQYWNrVG9vbHRpcFRhbGwuc3RvcnkgPSB7XG4gIG5hbWU6ICdJbnN0YWxsZWQgUGFjayBUb29sdGlwIChUYWxsKScsXG59O1xuXG5leHBvcnQgY29uc3QgTmV3SW5zdGFsbFRvb2x0aXAgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBpbnN0YWxsZWRQYWNrcyxcbiAgICBzaG93SW50cm9kdWN0aW9uOiB0cnVlLFxu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
