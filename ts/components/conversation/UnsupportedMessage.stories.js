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
var UnsupportedMessage_stories_exports = {};
__export(UnsupportedMessage_stories_exports, {
  AfterUpgrade: () => AfterUpgrade,
  FromSomeone: () => FromSomeone,
  FromYourself: () => FromYourself,
  FromYourselfAfterUpgrade: () => FromYourselfAfterUpgrade,
  default: () => UnsupportedMessage_stories_default
});
module.exports = __toCommonJS(UnsupportedMessage_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_UnsupportedMessage = require("./UnsupportedMessage");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var UnsupportedMessage_stories_default = {
  title: "Components/Conversation/UnsupportedMessage"
};
const createContact = /* @__PURE__ */ __name((props = {}) => ({
  id: "",
  title: (0, import_addon_knobs.text)("contact title", props.title || ""),
  isMe: (0, import_addon_knobs.boolean)("contact isMe", props.isMe || false)
}), "createContact");
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  canProcessNow: (0, import_addon_knobs.boolean)("canProcessNow", overrideProps.canProcessNow || false),
  contact: overrideProps.contact || {},
  downloadNewVersion: (0, import_addon_actions.action)("downloadNewVersion")
}), "createProps");
const FromSomeone = /* @__PURE__ */ __name(() => {
  const contact = createContact({
    title: "Alice",
    name: "Alice"
  });
  const props = createProps({ contact });
  return /* @__PURE__ */ React.createElement(import_UnsupportedMessage.UnsupportedMessage, {
    ...props
  });
}, "FromSomeone");
const AfterUpgrade = /* @__PURE__ */ __name(() => {
  const contact = createContact({
    title: "Alice",
    name: "Alice"
  });
  const props = createProps({ contact, canProcessNow: true });
  return /* @__PURE__ */ React.createElement(import_UnsupportedMessage.UnsupportedMessage, {
    ...props
  });
}, "AfterUpgrade");
const FromYourself = /* @__PURE__ */ __name(() => {
  const contact = createContact({
    title: "Alice",
    name: "Alice",
    isMe: true
  });
  const props = createProps({ contact });
  return /* @__PURE__ */ React.createElement(import_UnsupportedMessage.UnsupportedMessage, {
    ...props
  });
}, "FromYourself");
const FromYourselfAfterUpgrade = /* @__PURE__ */ __name(() => {
  const contact = createContact({
    title: "Alice",
    name: "Alice",
    isMe: true
  });
  const props = createProps({ contact, canProcessNow: true });
  return /* @__PURE__ */ React.createElement(import_UnsupportedMessage.UnsupportedMessage, {
    ...props
  });
}, "FromYourselfAfterUpgrade");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AfterUpgrade,
  FromSomeone,
  FromYourself,
  FromYourselfAfterUpgrade
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVW5zdXBwb3J0ZWRNZXNzYWdlLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGJvb2xlYW4sIHRleHQgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHR5cGUgeyBDb250YWN0VHlwZSwgUHJvcHMgfSBmcm9tICcuL1Vuc3VwcG9ydGVkTWVzc2FnZSc7XG5pbXBvcnQgeyBVbnN1cHBvcnRlZE1lc3NhZ2UgfSBmcm9tICcuL1Vuc3VwcG9ydGVkTWVzc2FnZSc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9VbnN1cHBvcnRlZE1lc3NhZ2UnLFxufTtcblxuY29uc3QgY3JlYXRlQ29udGFjdCA9IChwcm9wczogUGFydGlhbDxDb250YWN0VHlwZT4gPSB7fSk6IENvbnRhY3RUeXBlID0+ICh7XG4gIGlkOiAnJyxcbiAgdGl0bGU6IHRleHQoJ2NvbnRhY3QgdGl0bGUnLCBwcm9wcy50aXRsZSB8fCAnJyksXG4gIGlzTWU6IGJvb2xlYW4oJ2NvbnRhY3QgaXNNZScsIHByb3BzLmlzTWUgfHwgZmFsc2UpLFxufSk7XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHM+ID0ge30pOiBQcm9wcyA9PiAoe1xuICBpMThuLFxuICBjYW5Qcm9jZXNzTm93OiBib29sZWFuKCdjYW5Qcm9jZXNzTm93Jywgb3ZlcnJpZGVQcm9wcy5jYW5Qcm9jZXNzTm93IHx8IGZhbHNlKSxcbiAgY29udGFjdDogb3ZlcnJpZGVQcm9wcy5jb250YWN0IHx8ICh7fSBhcyBDb250YWN0VHlwZSksXG4gIGRvd25sb2FkTmV3VmVyc2lvbjogYWN0aW9uKCdkb3dubG9hZE5ld1ZlcnNpb24nKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgRnJvbVNvbWVvbmUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBjb250YWN0ID0gY3JlYXRlQ29udGFjdCh7XG4gICAgdGl0bGU6ICdBbGljZScsXG4gICAgbmFtZTogJ0FsaWNlJyxcbiAgfSk7XG5cbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7IGNvbnRhY3QgfSk7XG5cbiAgcmV0dXJuIDxVbnN1cHBvcnRlZE1lc3NhZ2Ugey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBBZnRlclVwZ3JhZGUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBjb250YWN0ID0gY3JlYXRlQ29udGFjdCh7XG4gICAgdGl0bGU6ICdBbGljZScsXG4gICAgbmFtZTogJ0FsaWNlJyxcbiAgfSk7XG5cbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7IGNvbnRhY3QsIGNhblByb2Nlc3NOb3c6IHRydWUgfSk7XG5cbiAgcmV0dXJuIDxVbnN1cHBvcnRlZE1lc3NhZ2Ugey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBGcm9tWW91cnNlbGYgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBjb250YWN0ID0gY3JlYXRlQ29udGFjdCh7XG4gICAgdGl0bGU6ICdBbGljZScsXG4gICAgbmFtZTogJ0FsaWNlJyxcbiAgICBpc01lOiB0cnVlLFxuICB9KTtcblxuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHsgY29udGFjdCB9KTtcblxuICByZXR1cm4gPFVuc3VwcG9ydGVkTWVzc2FnZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IEZyb21Zb3Vyc2VsZkFmdGVyVXBncmFkZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGNvbnRhY3QgPSBjcmVhdGVDb250YWN0KHtcbiAgICB0aXRsZTogJ0FsaWNlJyxcbiAgICBuYW1lOiAnQWxpY2UnLFxuICAgIGlzTWU6IHRydWUsXG4gIH0pO1xuXG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoeyBjb250YWN0LCBjYW5Qcm9jZXNzTm93OiB0cnVlIH0pO1xuXG4gIHJldHVybiA8VW5zdXBwb3J0ZWRNZXNzYWdlIHsuLi5wcm9wc30gLz47XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIseUJBQThCO0FBQzlCLDJCQUF1QjtBQUV2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBRXZCLGdDQUFtQztBQUVuQyxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLHFDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLGdCQUFnQix3QkFBQyxRQUE4QixDQUFDLE1BQW9CO0FBQUEsRUFDeEUsSUFBSTtBQUFBLEVBQ0osT0FBTyw2QkFBSyxpQkFBaUIsTUFBTSxTQUFTLEVBQUU7QUFBQSxFQUM5QyxNQUFNLGdDQUFRLGdCQUFnQixNQUFNLFFBQVEsS0FBSztBQUNuRCxJQUpzQjtBQU10QixNQUFNLGNBQWMsd0JBQUMsZ0JBQWdDLENBQUMsTUFBYztBQUFBLEVBQ2xFO0FBQUEsRUFDQSxlQUFlLGdDQUFRLGlCQUFpQixjQUFjLGlCQUFpQixLQUFLO0FBQUEsRUFDNUUsU0FBUyxjQUFjLFdBQVksQ0FBQztBQUFBLEVBQ3BDLG9CQUFvQixpQ0FBTyxvQkFBb0I7QUFDakQsSUFMb0I7QUFPYixNQUFNLGNBQWMsNkJBQW1CO0FBQzVDLFFBQU0sVUFBVSxjQUFjO0FBQUEsSUFDNUIsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELFFBQU0sUUFBUSxZQUFZLEVBQUUsUUFBUSxDQUFDO0FBRXJDLFNBQU8sb0NBQUM7QUFBQSxPQUF1QjtBQUFBLEdBQU87QUFDeEMsR0FUMkI7QUFXcEIsTUFBTSxlQUFlLDZCQUFtQjtBQUM3QyxRQUFNLFVBQVUsY0FBYztBQUFBLElBQzVCLE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNSLENBQUM7QUFFRCxRQUFNLFFBQVEsWUFBWSxFQUFFLFNBQVMsZUFBZSxLQUFLLENBQUM7QUFFMUQsU0FBTyxvQ0FBQztBQUFBLE9BQXVCO0FBQUEsR0FBTztBQUN4QyxHQVQ0QjtBQVdyQixNQUFNLGVBQWUsNkJBQW1CO0FBQzdDLFFBQU0sVUFBVSxjQUFjO0FBQUEsSUFDNUIsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELFFBQU0sUUFBUSxZQUFZLEVBQUUsUUFBUSxDQUFDO0FBRXJDLFNBQU8sb0NBQUM7QUFBQSxPQUF1QjtBQUFBLEdBQU87QUFDeEMsR0FWNEI7QUFZckIsTUFBTSwyQkFBMkIsNkJBQW1CO0FBQ3pELFFBQU0sVUFBVSxjQUFjO0FBQUEsSUFDNUIsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELFFBQU0sUUFBUSxZQUFZLEVBQUUsU0FBUyxlQUFlLEtBQUssQ0FBQztBQUUxRCxTQUFPLG9DQUFDO0FBQUEsT0FBdUI7QUFBQSxHQUFPO0FBQ3hDLEdBVndDOyIsCiAgIm5hbWVzIjogW10KfQo=
