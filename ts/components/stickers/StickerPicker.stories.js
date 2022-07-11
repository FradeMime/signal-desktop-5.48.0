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
var StickerPicker_stories_exports = {};
__export(StickerPicker_stories_exports, {
  Empty: () => Empty,
  Error: () => Error2,
  Full: () => Full,
  NoCover: () => NoCover,
  NoRecentStickers: () => NoRecentStickers,
  PendingDownload: () => PendingDownload,
  PickerHint: () => PickerHint,
  abeSticker: () => abeSticker,
  createPack: () => createPack,
  default: () => StickerPicker_stories_default,
  sticker1: () => sticker1,
  sticker2: () => sticker2,
  sticker3: () => sticker3,
  tallSticker: () => tallSticker,
  wideSticker: () => wideSticker
});
module.exports = __toCommonJS(StickerPicker_stories_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_StickerPicker = require("./StickerPicker");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var StickerPicker_stories_default = {
  title: "Components/Stickers/StickerPicker"
};
const sticker1 = {
  id: 1,
  url: "/fixtures/kitten-1-64-64.jpg",
  packId: "foo",
  emoji: ""
};
const sticker2 = {
  id: 2,
  url: "/fixtures/kitten-2-64-64.jpg",
  packId: "bar",
  emoji: ""
};
const sticker3 = {
  id: 3,
  url: "/fixtures/kitten-3-64-64.jpg",
  packId: "baz",
  emoji: ""
};
const abeSticker = {
  id: 4,
  url: "/fixtures/512x515-thumbs-up-lincoln.webp",
  packId: "abe",
  emoji: ""
};
const wideSticker = {
  id: 5,
  url: "/fixtures/1000x50-green.jpeg",
  packId: "wide",
  emoji: ""
};
const tallSticker = {
  id: 6,
  url: "/fixtures/50x1000-teal.jpeg",
  packId: "tall",
  emoji: ""
};
const choosableStickers = [sticker1, sticker2, sticker3, abeSticker];
const createPack = /* @__PURE__ */ __name((props, sticker) => ({
  id: "",
  title: props.id ? `${props.id} title` : "title",
  key: "",
  author: "",
  isBlessed: false,
  lastUsed: 0,
  status: "known",
  cover: sticker,
  stickerCount: 101,
  stickers: sticker ? Array(101).fill(0).map((_, id) => ({ ...sticker, id })) : [],
  ...props
}), "createPack");
const packs = [
  createPack({ id: "tall" }, tallSticker),
  createPack({ id: "wide" }, wideSticker),
  ...Array(20).fill(0).map((_, n) => createPack({ id: `pack-${n}` }, (0, import_lodash.sample)(choosableStickers)))
];
const recentStickers = [
  abeSticker,
  sticker1,
  sticker2,
  sticker3,
  tallSticker,
  wideSticker,
  { ...sticker2, id: 9999 }
];
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  onClickAddPack: (0, import_addon_actions.action)("onClickAddPack"),
  onClose: (0, import_addon_actions.action)("onClose"),
  onPickSticker: (0, import_addon_actions.action)("onPickSticker"),
  packs: overrideProps.packs || [],
  recentStickers: overrideProps.recentStickers || [],
  showPickerHint: (0, import_addon_knobs.boolean)("showPickerHint", overrideProps.showPickerHint || false)
}), "createProps");
const Full = /* @__PURE__ */ __name(() => {
  const props = createProps({ packs, recentStickers });
  return /* @__PURE__ */ React.createElement(import_StickerPicker.StickerPicker, {
    ...props
  });
}, "Full");
const PickerHint = /* @__PURE__ */ __name(() => {
  const props = createProps({ packs, recentStickers, showPickerHint: true });
  return /* @__PURE__ */ React.createElement(import_StickerPicker.StickerPicker, {
    ...props
  });
}, "PickerHint");
const NoRecentStickers = /* @__PURE__ */ __name(() => {
  const props = createProps({ packs });
  return /* @__PURE__ */ React.createElement(import_StickerPicker.StickerPicker, {
    ...props
  });
}, "NoRecentStickers");
const Empty = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_StickerPicker.StickerPicker, {
    ...props
  });
}, "Empty");
const PendingDownload = /* @__PURE__ */ __name(() => {
  const pack = createPack({ status: "pending", stickers: [abeSticker] }, abeSticker);
  const props = createProps({ packs: [pack] });
  return /* @__PURE__ */ React.createElement(import_StickerPicker.StickerPicker, {
    ...props
  });
}, "PendingDownload");
const Error2 = /* @__PURE__ */ __name(() => {
  const pack = createPack({ status: "error", stickers: [abeSticker] }, abeSticker);
  const props = createProps({ packs: [pack] });
  return /* @__PURE__ */ React.createElement(import_StickerPicker.StickerPicker, {
    ...props
  });
}, "Error");
const NoCover = /* @__PURE__ */ __name(() => {
  const pack = createPack({ status: "error", stickers: [abeSticker] });
  const props = createProps({ packs: [pack] });
  return /* @__PURE__ */ React.createElement(import_StickerPicker.StickerPicker, {
    ...props
  });
}, "NoCover");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Empty,
  Error,
  Full,
  NoCover,
  NoRecentStickers,
  PendingDownload,
  PickerHint,
  abeSticker,
  createPack,
  sticker1,
  sticker2,
  sticker3,
  tallSticker,
  wideSticker
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlclBpY2tlci5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzYW1wbGUgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcbmltcG9ydCB7IGJvb2xlYW4gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi9TdGlja2VyUGlja2VyJztcbmltcG9ydCB7IFN0aWNrZXJQaWNrZXIgfSBmcm9tICcuL1N0aWNrZXJQaWNrZXInO1xuaW1wb3J0IHR5cGUgeyBTdGlja2VyUGFja1R5cGUsIFN0aWNrZXJUeXBlIH0gZnJvbSAnLi4vLi4vc3RhdGUvZHVja3Mvc3RpY2tlcnMnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9TdGlja2Vycy9TdGlja2VyUGlja2VyJyxcbn07XG5cbmV4cG9ydCBjb25zdCBzdGlja2VyMTogU3RpY2tlclR5cGUgPSB7XG4gIGlkOiAxLFxuICB1cmw6ICcvZml4dHVyZXMva2l0dGVuLTEtNjQtNjQuanBnJyxcbiAgcGFja0lkOiAnZm9vJyxcbiAgZW1vamk6ICcnLFxufTtcblxuZXhwb3J0IGNvbnN0IHN0aWNrZXIyOiBTdGlja2VyVHlwZSA9IHtcbiAgaWQ6IDIsXG4gIHVybDogJy9maXh0dXJlcy9raXR0ZW4tMi02NC02NC5qcGcnLFxuICBwYWNrSWQ6ICdiYXInLFxuICBlbW9qaTogJycsXG59O1xuXG5leHBvcnQgY29uc3Qgc3RpY2tlcjM6IFN0aWNrZXJUeXBlID0ge1xuICBpZDogMyxcbiAgdXJsOiAnL2ZpeHR1cmVzL2tpdHRlbi0zLTY0LTY0LmpwZycsXG4gIHBhY2tJZDogJ2JheicsXG4gIGVtb2ppOiAnJyxcbn07XG5cbmV4cG9ydCBjb25zdCBhYmVTdGlja2VyOiBTdGlja2VyVHlwZSA9IHtcbiAgaWQ6IDQsXG4gIHVybDogJy9maXh0dXJlcy81MTJ4NTE1LXRodW1icy11cC1saW5jb2xuLndlYnAnLFxuICBwYWNrSWQ6ICdhYmUnLFxuICBlbW9qaTogJycsXG59O1xuXG5leHBvcnQgY29uc3Qgd2lkZVN0aWNrZXI6IFN0aWNrZXJUeXBlID0ge1xuICBpZDogNSxcbiAgdXJsOiAnL2ZpeHR1cmVzLzEwMDB4NTAtZ3JlZW4uanBlZycsXG4gIHBhY2tJZDogJ3dpZGUnLFxuICBlbW9qaTogJycsXG59O1xuXG5leHBvcnQgY29uc3QgdGFsbFN0aWNrZXI6IFN0aWNrZXJUeXBlID0ge1xuICBpZDogNixcbiAgdXJsOiAnL2ZpeHR1cmVzLzUweDEwMDAtdGVhbC5qcGVnJyxcbiAgcGFja0lkOiAndGFsbCcsXG4gIGVtb2ppOiAnJyxcbn07XG5cbmNvbnN0IGNob29zYWJsZVN0aWNrZXJzID0gW3N0aWNrZXIxLCBzdGlja2VyMiwgc3RpY2tlcjMsIGFiZVN0aWNrZXJdO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUGFjayA9IChcbiAgcHJvcHM6IFBhcnRpYWw8U3RpY2tlclBhY2tUeXBlPixcbiAgc3RpY2tlcj86IFN0aWNrZXJUeXBlXG4pOiBTdGlja2VyUGFja1R5cGUgPT4gKHtcbiAgaWQ6ICcnLFxuICB0aXRsZTogcHJvcHMuaWQgPyBgJHtwcm9wcy5pZH0gdGl0bGVgIDogJ3RpdGxlJyxcbiAga2V5OiAnJyxcbiAgYXV0aG9yOiAnJyxcbiAgaXNCbGVzc2VkOiBmYWxzZSxcbiAgbGFzdFVzZWQ6IDAsXG4gIHN0YXR1czogJ2tub3duJyxcbiAgY292ZXI6IHN0aWNrZXIsXG4gIHN0aWNrZXJDb3VudDogMTAxLFxuICBzdGlja2Vyczogc3RpY2tlclxuICAgID8gQXJyYXkoMTAxKVxuICAgICAgICAuZmlsbCgwKVxuICAgICAgICAubWFwKChfLCBpZCkgPT4gKHsgLi4uc3RpY2tlciwgaWQgfSkpXG4gICAgOiBbXSxcbiAgLi4ucHJvcHMsXG59KTtcblxuY29uc3QgcGFja3MgPSBbXG4gIGNyZWF0ZVBhY2soeyBpZDogJ3RhbGwnIH0sIHRhbGxTdGlja2VyKSxcbiAgY3JlYXRlUGFjayh7IGlkOiAnd2lkZScgfSwgd2lkZVN0aWNrZXIpLFxuICAuLi5BcnJheSgyMClcbiAgICAuZmlsbCgwKVxuICAgIC5tYXAoKF8sIG4pID0+XG4gICAgICBjcmVhdGVQYWNrKHsgaWQ6IGBwYWNrLSR7bn1gIH0sIHNhbXBsZShjaG9vc2FibGVTdGlja2VycykgYXMgU3RpY2tlclR5cGUpXG4gICAgKSxcbl07XG5cbmNvbnN0IHJlY2VudFN0aWNrZXJzID0gW1xuICBhYmVTdGlja2VyLFxuICBzdGlja2VyMSxcbiAgc3RpY2tlcjIsXG4gIHN0aWNrZXIzLFxuICB0YWxsU3RpY2tlcixcbiAgd2lkZVN0aWNrZXIsXG4gIHsgLi4uc3RpY2tlcjIsIGlkOiA5OTk5IH0sXG5dO1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzPiA9IHt9KTogUHJvcHMgPT4gKHtcbiAgaTE4bixcbiAgb25DbGlja0FkZFBhY2s6IGFjdGlvbignb25DbGlja0FkZFBhY2snKSxcbiAgb25DbG9zZTogYWN0aW9uKCdvbkNsb3NlJyksXG4gIG9uUGlja1N0aWNrZXI6IGFjdGlvbignb25QaWNrU3RpY2tlcicpLFxuICBwYWNrczogb3ZlcnJpZGVQcm9wcy5wYWNrcyB8fCBbXSxcbiAgcmVjZW50U3RpY2tlcnM6IG92ZXJyaWRlUHJvcHMucmVjZW50U3RpY2tlcnMgfHwgW10sXG4gIHNob3dQaWNrZXJIaW50OiBib29sZWFuKFxuICAgICdzaG93UGlja2VySGludCcsXG4gICAgb3ZlcnJpZGVQcm9wcy5zaG93UGlja2VySGludCB8fCBmYWxzZVxuICApLFxufSk7XG5cbmV4cG9ydCBjb25zdCBGdWxsID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7IHBhY2tzLCByZWNlbnRTdGlja2VycyB9KTtcblxuICByZXR1cm4gPFN0aWNrZXJQaWNrZXIgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBQaWNrZXJIaW50ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7IHBhY2tzLCByZWNlbnRTdGlja2Vycywgc2hvd1BpY2tlckhpbnQ6IHRydWUgfSk7XG5cbiAgcmV0dXJuIDxTdGlja2VyUGlja2VyIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgTm9SZWNlbnRTdGlja2VycyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoeyBwYWNrcyB9KTtcblxuICByZXR1cm4gPFN0aWNrZXJQaWNrZXIgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBFbXB0eSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoKTtcblxuICByZXR1cm4gPFN0aWNrZXJQaWNrZXIgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBQZW5kaW5nRG93bmxvYWQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwYWNrID0gY3JlYXRlUGFjayhcbiAgICB7IHN0YXR1czogJ3BlbmRpbmcnLCBzdGlja2VyczogW2FiZVN0aWNrZXJdIH0sXG4gICAgYWJlU3RpY2tlclxuICApO1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHsgcGFja3M6IFtwYWNrXSB9KTtcblxuICByZXR1cm4gPFN0aWNrZXJQaWNrZXIgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBFcnJvciA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHBhY2sgPSBjcmVhdGVQYWNrKFxuICAgIHsgc3RhdHVzOiAnZXJyb3InLCBzdGlja2VyczogW2FiZVN0aWNrZXJdIH0sXG4gICAgYWJlU3RpY2tlclxuICApO1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHsgcGFja3M6IFtwYWNrXSB9KTtcblxuICByZXR1cm4gPFN0aWNrZXJQaWNrZXIgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBOb0NvdmVyID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcGFjayA9IGNyZWF0ZVBhY2soeyBzdGF0dXM6ICdlcnJvcicsIHN0aWNrZXJzOiBbYWJlU3RpY2tlcl0gfSk7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoeyBwYWNrczogW3BhY2tdIH0pO1xuXG4gIHJldHVybiA8U3RpY2tlclBpY2tlciB7Li4ucHJvcHN9IC8+O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsb0JBQXVCO0FBQ3ZCLDJCQUF1QjtBQUN2Qix5QkFBd0I7QUFFeEIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QiwyQkFBOEI7QUFHOUIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTyxnQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxXQUF3QjtBQUFBLEVBQ25DLElBQUk7QUFBQSxFQUNKLEtBQUs7QUFBQSxFQUNMLFFBQVE7QUFB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
