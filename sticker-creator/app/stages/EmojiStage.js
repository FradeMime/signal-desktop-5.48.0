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
var EmojiStage_exports = {};
__export(EmojiStage_exports, {
  EmojiStage: () => EmojiStage
});
module.exports = __toCommonJS(EmojiStage_exports);
var React = __toESM(require("react"));
var import_AppStage = require("./AppStage");
var styles = __toESM(require("./DropStage.scss"));
var import_Typography = require("../../elements/Typography");
var import_StickerGrid = require("../../components/StickerGrid");
var import_store = require("../../store");
var import_i18n = require("../../util/i18n");
const EmojiStage = /* @__PURE__ */ __name(() => {
  const i18n = (0, import_i18n.useI18n)();
  const emojisReady = import_store.stickersDuck.useEmojisReady();
  return /* @__PURE__ */ React.createElement(import_AppStage.AppStage, {
    next: "/add-meta",
    prev: "/drop",
    nextActive: emojisReady
  }, /* @__PURE__ */ React.createElement(import_Typography.H2, null, i18n("StickerCreator--EmojiStage--title")), /* @__PURE__ */ React.createElement("div", {
    className: styles.info
  }, /* @__PURE__ */ React.createElement(import_Typography.Text, {
    className: styles.message
  }, i18n("StickerCreator--EmojiStage--help"))), /* @__PURE__ */ React.createElement("div", {
    className: styles.main
  }, /* @__PURE__ */ React.createElement(import_StickerGrid.StickerGrid, {
    mode: "pick-emoji"
  })));
}, "EmojiStage");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmojiStage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRW1vamlTdGFnZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBcHBTdGFnZSB9IGZyb20gJy4vQXBwU3RhZ2UnO1xuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vRHJvcFN0YWdlLnNjc3MnO1xuaW1wb3J0IHsgSDIsIFRleHQgfSBmcm9tICcuLi8uLi9lbGVtZW50cy9UeXBvZ3JhcGh5JztcbmltcG9ydCB7IFN0aWNrZXJHcmlkIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9TdGlja2VyR3JpZCc7XG5pbXBvcnQgeyBzdGlja2Vyc0R1Y2sgfSBmcm9tICcuLi8uLi9zdG9yZSc7XG5pbXBvcnQgeyB1c2VJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9pMThuJztcblxuZXhwb3J0IGNvbnN0IEVtb2ppU3RhZ2U6IFJlYWN0LkNvbXBvbmVudFR5cGUgPSAoKSA9PiB7XG4gIGNvbnN0IGkxOG4gPSB1c2VJMThuKCk7XG4gIGNvbnN0IGVtb2ppc1JlYWR5ID0gc3RpY2tlcnNEdWNrLnVzZUVtb2ppc1JlYWR5KCk7XG5cbiAgcmV0dXJuIChcbiAgICA8QXBwU3RhZ2UgbmV4dD1cIi9hZGQtbWV0YVwiIHByZXY9XCIvZHJvcFwiIG5leHRBY3RpdmU9e2Vtb2ppc1JlYWR5fT5cbiAgICAgIDxIMj57aTE4bignU3RpY2tlckNyZWF0b3ItLUVtb2ppU3RhZ2UtLXRpdGxlJyl9PC9IMj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuaW5mb30+XG4gICAgICAgIDxUZXh0IGNsYXNzTmFtZT17c3R5bGVzLm1lc3NhZ2V9PlxuICAgICAgICAgIHtpMThuKCdTdGlja2VyQ3JlYXRvci0tRW1vamlTdGFnZS0taGVscCcpfVxuICAgICAgICA8L1RleHQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWFpbn0+XG4gICAgICAgIDxTdGlja2VyR3JpZCBtb2RlPVwicGljay1lbW9qaVwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L0FwcFN0YWdlPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QixzQkFBeUI7QUFDekIsYUFBd0I7QUFDeEIsd0JBQXlCO0FBQ3pCLHlCQUE0QjtBQUM1QixtQkFBNkI7QUFDN0Isa0JBQXdCO0FBRWpCLE1BQU0sYUFBa0MsNkJBQU07QUFDbkQsUUFBTSxPQUFPLHlCQUFRO0FBQ3JCLFFBQU0sY0FBYywwQkFBYSxlQUFlO0FBRWhELFNBQ0Usb0NBQUM7QUFBQSxJQUFTLE1BQUs7QUFBQSxJQUFZLE1BQUs7QUFBQSxJQUFRLFlBQVk7QUFBQSxLQUNsRCxvQ0FBQyw0QkFBSSxLQUFLLG1DQUFtQyxDQUFFLEdBQy9DLG9DQUFDO0FBQUEsSUFBSSxXQUFXLE9BQU87QUFBQSxLQUNyQixvQ0FBQztBQUFBLElBQUssV0FBVyxPQUFPO0FBQUEsS0FDckIsS0FBSyxrQ0FBa0MsQ0FDMUMsQ0FDRixHQUNBLG9DQUFDO0FBQUEsSUFBSSxXQUFXLE9BQU87QUFBQSxLQUNyQixvQ0FBQztBQUFBLElBQVksTUFBSztBQUFBLEdBQWEsQ0FDakMsQ0FDRjtBQUVKLEdBakIrQzsiLAogICJuYW1lcyI6IFtdCn0K
