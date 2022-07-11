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
var Modal_stories_exports = {};
__export(Modal_stories_exports, {
  BareBonesLong: () => BareBonesLong,
  BareBonesLongWithButton: () => BareBonesLongWithButton,
  BareBonesShort: () => BareBonesShort,
  LongBodyWithLongTitleAndXButton: () => LongBodyWithLongTitleAndXButton,
  LongBodyWithTitle: () => LongBodyWithTitle,
  LongBodyWithTitleAndButton: () => LongBodyWithTitleAndButton,
  LotsOfButtonsInTheFooter: () => LotsOfButtonsInTheFooter,
  StickyFooterLotsOfButtons: () => StickyFooterLotsOfButtons,
  TitleXButtonBodyAndButtonFooter: () => TitleXButtonBodyAndButtonFooter,
  WithStickyButtonsLongBody: () => WithStickyButtonsLongBody,
  WithStickyButtonsShortBody: () => WithStickyButtonsShortBody,
  default: () => Modal_stories_default
});
module.exports = __toCommonJS(Modal_stories_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_Button = require("./Button");
var import_Modal = require("./Modal");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var Modal_stories_default = {
  title: "Components/Modal"
};
const onClose = (0, import_addon_actions.action)("onClose");
const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.";
const BareBonesShort = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
  i18n
}, "Hello world!"), "BareBonesShort");
BareBonesShort.story = {
  name: "Bare bones, short"
};
const BareBonesLong = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
  i18n
}, /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM)), "BareBonesLong");
BareBonesLong.story = {
  name: "Bare bones, long"
};
const BareBonesLongWithButton = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
  i18n
}, /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "Okay"))), "BareBonesLongWithButton");
BareBonesLongWithButton.story = {
  name: "Bare bones, long, with button"
};
const TitleXButtonBodyAndButtonFooter = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
  i18n,
  title: "Hello world",
  onClose,
  hasXButton: true
}, LOREM_IPSUM, /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "Okay"))), "TitleXButtonBodyAndButtonFooter");
TitleXButtonBodyAndButtonFooter.story = {
  name: "Title, X button, body, and button footer"
};
const LotsOfButtonsInTheFooter = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
  i18n,
  onClose
}, "Hello world!", /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "Okay"), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "Okay"), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "Okay"), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "This is a button with a fairly large amount of text"), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "Okay"), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "This is a button with a fairly large amount of text"), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "Okay"))), "LotsOfButtonsInTheFooter");
LotsOfButtonsInTheFooter.story = {
  name: "Lots of buttons in the footer"
};
const LongBodyWithTitle = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
  i18n,
  title: "Hello world",
  onClose
}, /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM)), "LongBodyWithTitle");
LongBodyWithTitle.story = {
  name: "Long body with title"
};
const LongBodyWithTitleAndButton = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
  i18n,
  title: "Hello world",
  onClose
}, /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "Okay"))), "LongBodyWithTitleAndButton");
LongBodyWithTitleAndButton.story = {
  name: "Long body with title and button"
};
const LongBodyWithLongTitleAndXButton = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
  i18n,
  title: LOREM_IPSUM.slice(0, 104),
  hasXButton: true,
  onClose
}, /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM)), "LongBodyWithLongTitleAndXButton");
LongBodyWithLongTitleAndXButton.story = {
  name: "Long body with long title and X button"
};
const WithStickyButtonsLongBody = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
  hasStickyButtons: true,
  hasXButton: true,
  i18n,
  onClose
}, /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "Okay"), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "Okay"))), "WithStickyButtonsLongBody");
WithStickyButtonsLongBody.story = {
  name: "With sticky buttons long body"
};
const WithStickyButtonsShortBody = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
  hasStickyButtons: true,
  hasXButton: true,
  i18n,
  onClose
}, /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM.slice(0, 140)), /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "Okay"), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "Okay"))), "WithStickyButtonsShortBody");
WithStickyButtonsShortBody.story = {
  name: "With sticky buttons short body"
};
const StickyFooterLotsOfButtons = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
  hasStickyButtons: true,
  i18n,
  onClose,
  title: "OK"
}, /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal.ButtonFooter, null, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "Okay"), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "Okay"), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "Okay"), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "This is a button with a fairly large amount of text"), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "Okay"), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "This is a button with a fairly large amount of text"), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
  onClick: import_lodash.noop
}, "Okay"))), "StickyFooterLotsOfButtons");
StickyFooterLotsOfButtons.story = {
  name: "Sticky footer, Lots of buttons"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BareBonesLong,
  BareBonesLongWithButton,
  BareBonesShort,
  LongBodyWithLongTitleAndXButton,
  LongBodyWithTitle,
  LongBodyWithTitleAndButton,
  LotsOfButtonsInTheFooter,
  StickyFooterLotsOfButtons,
  TitleXButtonBodyAndButtonFooter,
  WithStickyButtonsLongBody,
  WithStickyButtonsShortBody
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTW9kYWwuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4vQnV0dG9uJztcbmltcG9ydCB7IE1vZGFsIH0gZnJvbSAnLi9Nb2RhbCc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL01vZGFsJyxcbn07XG5cbmNvbnN0IG9uQ2xvc2UgPSBhY3Rpb24oJ29uQ2xvc2UnKTtcblxuY29uc3QgTE9SRU1fSVBTVU0gPVxuICAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gRG9uZWMgYSBkaWFtIGxlY3R1cy4gU2VkIHNpdCBhbWV0IGlwc3VtIG1hdXJpcy4gTWFlY2VuYXMgY29uZ3VlIGxpZ3VsYSBhYyBxdWFtIHZpdmVycmEgbmVjIGNvbnNlY3RldHVyIGFudGUgaGVuZHJlcml0LiBEb25lYyBldCBtb2xsaXMgZG9sb3IuIFByYWVzZW50IGV0IGRpYW0gZWdldCBsaWJlcm8gZWdlc3RhcyBtYXR0aXMgc2l0IGFtZXQgdml0YWUgYXVndWUuIE5hbSB0aW5jaWR1bnQgY29uZ3VlIGVuaW0sIHV0IHBvcnRhIGxvcmVtIGxhY2luaWEgY29uc2VjdGV0dXIuIERvbmVjIHV0IGxpYmVybyBzZWQgYXJjdSB2ZWhpY3VsYSB1bHRyaWNpZXMgYSBub24gdG9ydG9yLiBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBBZW5lYW4gdXQgZ3JhdmlkYSBsb3JlbS4gVXQgdHVycGlzIGZlbGlzLCBwdWx2aW5hciBhIHNlbXBlciBzZWQsIGFkaXBpc2NpbmcgaWQgZG9sb3IuIFBlbGxlbnRlc3F1ZSBhdWN0b3IgbmlzaSBpZCBtYWduYSBjb25zZXF1YXQgc2FnaXR0aXMuIEN1cmFiaXR1ciBkYXBpYnVzIGVuaW0gc2l0IGFtZXQgZWxpdCBwaGFyZXRyYSB0aW5jaWR1bnQgZmV1Z2lhdCBuaXNsIGltcGVyZGlldC4gVXQgY29udmFsbGlzIGxpYmVybyBpbiB1cm5hIHVsdHJpY2VzIGFjY3Vtc2FuLiBEb25lYyBzZWQgb2RpbyBlcm9zLiBEb25lYyB2aXZlcnJhIG1pIHF1aXMgcXVhbSBwdWx2aW5hciBhdCBtYWxlc3VhZGEgYXJjdSByaG9uY3VzLiBDdW0gc29jaWlzIG5hdG9xdWUgcGVuYXRpYnVzIGV0IG1hZ25pcyBkaXMgcGFydHVyaWVudCBtb250ZXMsIG5hc2NldHVyIHJpZGljdWx1cyBtdXMuIEluIHJ1dHJ1bSBhY2N1bXNhbiB1bHRyaWNpZXMuIE1hdXJpcyB2aXRhZSBuaXNpIGF0IHNlbSBmYWNpbGlzaXMgc2VtcGVyIGFjIGluIGVzdC4nO1xuXG5leHBvcnQgY29uc3QgQmFyZUJvbmVzU2hvcnQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TW9kYWwgaTE4bj17aTE4bn0+SGVsbG8gd29ybGQhPC9Nb2RhbD5cbik7XG5cbkJhcmVCb25lc1Nob3J0LnN0b3J5ID0ge1xuICBuYW1lOiAnQmFyZSBib25lcywgc2hvcnQnLFxufTtcblxuZXhwb3J0IGNvbnN0IEJhcmVCb25lc0xvbmcgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TW9kYWwgaTE4bj17aTE4bn0+XG4gICAgPHA+e0xPUkVNX0lQU1VNfTwvcD5cbiAgICA8cD57TE9SRU1fSVBTVU19PC9wPlxuICAgIDxwPntMT1JFTV9JUFNVTX08L3A+XG4gICAgPHA+e0xPUkVNX0lQU1VNfTwvcD5cbiAgPC9Nb2RhbD5cbik7XG5cbkJhcmVCb25lc0xvbmcuc3RvcnkgPSB7XG4gIG5hbWU6ICdCYXJlIGJvbmVzLCBsb25nJyxcbn07XG5cbmV4cG9ydCBjb25zdCBCYXJlQm9uZXNMb25nV2l0aEJ1dHRvbiA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxNb2RhbCBpMThuPXtpMThufT5cbiAgICA8cD57TE9SRU1fSVBTVU19PC9wPlxuICAgIDxwPntMT1JFTV9JUFNVTX08L3A+XG4gICAgPHA+e0xPUkVNX0lQU1VNfTwvcD5cbiAgICA8cD57TE9SRU1fSVBTVU19PC9wPlxuICAgIDxNb2RhbC5CdXR0b25Gb290ZXI+XG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e25vb3B9Pk9rYXk8L0J1dHRvbj5cbiAgICA8L01vZGFsLkJ1dHRvbkZvb3Rlcj5cbiAgPC9Nb2RhbD5cbik7XG5cbkJhcmVCb25lc0xvbmdXaXRoQnV0dG9uLnN0b3J5ID0ge1xuICBuYW1lOiAnQmFyZSBib25lcywgbG9uZywgd2l0aCBidXR0b24nLFxufTtcblxuZXhwb3J0IGNvbnN0IFRpdGxlWEJ1dHRvbkJvZHlBbmRCdXR0b25Gb290ZXIgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TW9kYWwgaTE4bj17aTE4bn0gdGl0bGU9XCJIZWxsbyB3b3JsZFwiIG9uQ2xvc2U9e29uQ2xvc2V9IGhhc1hCdXR0b24+XG4gICAge0xPUkVNX0lQU1VNfVxuICAgIDxNb2RhbC5CdXR0b25Gb290ZXI+XG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e25vb3B9Pk9rYXk8L0J1dHRvbj5cbiAgICA8L01vZGFsLkJ1dHRvbkZvb3Rlcj5cbiAgPC9Nb2RhbD5cbik7XG5cblRpdGxlWEJ1dHRvbkJvZHlBbmRCdXR0b25Gb290ZXIuc3RvcnkgPSB7XG4gIG5hbWU6ICdUaXRsZSwgWCBidXR0b24sIGJvZHksIGFuZCBidXR0b24gZm9vdGVyJyxcbn07XG5cbmV4cG9ydCBjb25zdCBMb3RzT2ZCdXR0b25zSW5UaGVGb290ZXIgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TW9kYWwgaTE4bj17aTE4bn0gb25DbG9zZT17b25DbG9zZX0+XG4gICAgSGVsbG8gd29ybGQhXG4gICAgPE1vZGFsLkJ1dHRvbkZvb3Rlcj5cbiAgICAgIDxCdXR0b24gb25DbGljaz17bm9vcH0+T2theTwvQnV0dG9uPlxuICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtub29wfT5Pa2F5PC9CdXR0b24+XG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e25vb3B9Pk9rYXk8L0J1dHRvbj5cbiAgICAgIDxCdXR0b24gb25DbGljaz17bm9vcH0+XG4gICAgICAgIFRoaXMgaXMgYSBidXR0b24gd2l0aCBhIGZhaXJseSBsYXJnZSBhbW91bnQgb2YgdGV4dFxuICAgICAgPC9CdXR0b24+XG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e25vb3B9Pk9rYXk8L0J1dHRvbj5cbiAgICAgIDxCdXR0b24gb25DbGljaz17bm9vcH0+XG4gICAgICAgIFRoaXMgaXMgYSBidXR0b24gd2l0aCBhIGZhaXJseSBsYXJnZSBhbW91bnQgb2YgdGV4dFxuICAgICAgPC9CdXR0b24+XG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e25vb3B9Pk9rYXk8L0J1dHRvbj5cbiAgICA8L01vZGFsLkJ1dHRvbkZvb3Rlcj5cbiAgPC9Nb2RhbD5cbik7XG5cbkxvdHNPZkJ1dHRvbnNJblRoZUZvb3Rlci5zdG9yeSA9IHtcbiAgbmFtZTogJ0xvdHMgb2YgYnV0dG9ucyBpbiB0aGUgZm9vdGVyJyxcbn07XG5cbmV4cG9ydCBjb25zdCBMb25nQm9keVdpdGhUaXRsZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxNb2RhbCBpMThuPXtpMThufSB0aXRsZT1cIkhlbGxvIHdvcmxkXCIgb25DbG9zZT17b25DbG9zZX0+XG4gICAgPHA+e0xPUkVNX0lQU1VNfTwvcD5cbiAgICA8cD57TE9SRU1fSVBTVU19PC9wPlxuICAgIDxwPntMT1JFTV9JUFNVTX08L3A+XG4gICAgPHA+e0xPUkVNX0lQU1VNfTwvcD5cbiAgPC9Nb2RhbD5cbik7XG5cbkxvbmdCb2R5V2l0aFRpdGxlLnN0b3J5ID0ge1xuICBuYW1lOiAnTG9uZyBib2R5IHdpdGggdGl0bGUnLFxufTtcblxuZXhwb3J0IGNvbnN0IExvbmdCb2R5V2l0aFRpdGxlQW5kQnV0dG9uID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPE1vZGFsIGkxOG49e2kxOG59IHRpdGxlPVwiSGVsbG8gd29ybGRcIiBvbkNsb3NlPXtvbkNsb3NlfT5cbiAgICA8cD57TE9SRU1fSVBTVU19PC9wPlxuICAgIDxwPntMT1JFTV9JUFNVTX08L3A+XG4gICAgPHA+e0xPUkVNX0lQU1VNfTwvcD5cbiAgICA8cD57TE9SRU1fSVBTVU19PC9wPlxuICAgIDxNb2RhbC5CdXR0b25Gb290ZXI+XG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e25vb3B9Pk9rYXk8L0J1dHRvbj5cbiAgICA8L01vZGFsLkJ1dHRvbkZvb3Rlcj5cbiAgPC9Nb2RhbD5cbik7XG5cbkxvbmdCb2R5V2l0aFRpdGxlQW5kQnV0dG9uLnN0b3J5ID0ge1xuICBuYW1lOiAnTG9uZyBib2R5IHdpdGggdGl0bGUgYW5kIGJ1dHRvbicsXG59O1xuXG5leHBvcnQgY29uc3QgTG9uZ0JvZHlXaXRoTG9uZ1RpdGxlQW5kWEJ1dHRvbiA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxNb2RhbFxuICAgIGkxOG49e2kxOG59XG4gICAgdGl0bGU9e0xPUkVNX0lQU1VNLnNsaWNlKDAsIDEwNCl9XG4gICAgaGFzWEJ1dHRvblxuICAgIG9uQ2xvc2U9e29uQ2xvc2V9XG4gID5cbiAgICA8cD57TE9SRU1fSVBTVU19PC9wPlxuICAgIDxwPntMT1JFTV9JUFNVTX08L3A+XG4gICAgPHA+e0xPUkVNX0lQU1VNfTwvcD5cbiAgICA8cD57TE9SRU1fSVBTVU19PC9wPlxuICA8L01vZGFsPlxuKTtcblxuTG9uZ0JvZHlXaXRoTG9uZ1RpdGxlQW5kWEJ1dHRvbi5zdG9yeSA9IHtcbiAgbmFtZTogJ0xvbmcgYm9keSB3aXRoIGxvbmcgdGl0bGUgYW5kIFggYnV0dG9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBXaXRoU3RpY2t5QnV0dG9uc0xvbmdCb2R5ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPE1vZGFsIGhhc1N0aWNreUJ1dHRvbnMgaGFzWEJ1dHRvbiBpMThuPXtpMThufSBvbkNsb3NlPXtvbkNsb3NlfT5cbiAgICA8cD57TE9SRU1fSVBTVU19PC9wPlxuICAgIDxwPntMT1JFTV9JUFNVTX08L3A+XG4gICAgPHA+e0xPUkVNX0lQU1VNfTwvcD5cbiAgICA8cD57TE9SRU1fSVBTVU19PC9wPlxuICAgIDxNb2RhbC5CdXR0b25Gb290ZXI+XG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e25vb3B9Pk9rYXk8L0J1dHRvbj5cbiAgICAgIDxCdXR0b24gb25DbGljaz17bm9vcH0+T2theTwvQnV0dG9uPlxuICAgIDwvTW9kYWwuQnV0dG9uRm9vdGVyPlxuICA8L01vZGFsPlxuKTtcblxuV2l0aFN0aWNreUJ1dHRvbnNMb25nQm9keS5zdG9yeSA9IHtcbiAgbmFtZTogJ1dpdGggc3RpY2t5IGJ1dHRvbnMgbG9uZyBib2R5Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBXaXRoU3RpY2t5QnV0dG9uc1Nob3J0Qm9keSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxNb2RhbCBoYXNTdGlja3lCdXR0b25zIGhhc1hCdXR0b24gaTE4bj17aTE4bn0gb25DbG9zZT17b25DbG9zZX0+XG4gICAgPHA+e0xPUkVNX0lQU1VNLnNsaWNlKDAsIDE0MCl9PC9wPlxuICAgIDxNb2RhbC5CdXR0b25Gb290ZXI+XG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e25vb3B9Pk9rYXk8L0J1dHRvbj5cbiAgICAgIDxCdXR0b24gb25DbGljaz17bm9vcH0+T2theTwvQnV0dG9uPlxuICAgIDwvTW9kYWwuQnV0dG9uRm9vdGVyPlxuICA8L01vZGFsPlxuKTtcblxuV2l0aFN0aWNreUJ1dHRvbnNTaG9ydEJvZHkuc3RvcnkgPSB7XG4gIG5hbWU6ICdXaXRoIHN0aWNreSBidXR0b25zIHNob3J0IGJvZHknLFxufTtcblxuZXhwb3J0IGNvbnN0IFN0aWNreUZvb3RlckxvdHNPZkJ1dHRvbnMgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TW9kYWwgaGFzU3RpY2t5QnV0dG9ucyBpMThuPXtpMThufSBvbkNsb3NlPXtvbkNsb3NlfSB0aXRsZT1cIk9LXCI+XG4gICAgPHA+e0xPUkVNX0lQU1VNfTwvcD5cbiAgICA8TW9kYWwuQnV0dG9uRm9vdGVyPlxuICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtub29wfT5Pa2F5PC9CdXR0b24+XG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e25vb3B9Pk9rYXk8L0J1dHRvbj5cbiAgICAgIDxCdXR0b24gb25DbGljaz17bm9vcH0+T2theTwvQnV0dG9uPlxuICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtub29wfT5cbiAgICAgICAgVGhpcyBpcyBhIGJ1dHRvbiB3aXRoIGEgZmFpcmx5IGxhcmdlIGFtb3VudCBvZiB0ZXh0XG4gICAgICA8L0J1dHRvbj5cbiAgICAgIDxCdXR0b24gb25DbGljaz17bm9vcH0+T2theTwvQnV0dG9uPlxuICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtub29wfT5cbiAgICAgICAgVGhpcyBpcyBhIGJ1dHRvbiB3aXRoIGEgZmFpcmx5IGxhcmdlIGFtb3VudCBvZiB0ZXh0XG4gICAgICA8L0J1dHRvbj5cbiAgICAgIDxCdXR0b24gb25DbGljaz17bm9vcH0+T2theTwvQnV0dG9uPlxuICAgIDwvTW9kYWwuQnV0dG9uRm9vdGVyPlxuICA8L01vZGFsPlxuKTtcblxuU3RpY2t5Rm9vdGVyTG90c09mQnV0dG9ucy5zdG9yeSA9IHtcbiAgbmFtZTogJ1N0aWNreSBmb290ZXIsIExvdHMgb2YgYnV0dG9ucycsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7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
