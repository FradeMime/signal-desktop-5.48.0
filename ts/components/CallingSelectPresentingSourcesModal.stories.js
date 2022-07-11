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
var CallingSelectPresentingSourcesModal_stories_exports = {};
__export(CallingSelectPresentingSourcesModal_stories_exports, {
  Modal: () => Modal,
  default: () => CallingSelectPresentingSourcesModal_stories_default
});
module.exports = __toCommonJS(CallingSelectPresentingSourcesModal_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_CallingSelectPresentingSourcesModal = require("./CallingSelectPresentingSourcesModal");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name(() => ({
  i18n,
  presentingSourcesAvailable: [
    {
      id: "screen",
      name: "Entire Screen",
      isScreen: true,
      thumbnail: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P/1PwAF8AL1sEVIPAAAAABJRU5ErkJggg=="
    },
    {
      id: "window:123",
      name: "Bozirro Airhorse",
      isScreen: false,
      thumbnail: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z1D4HwAF5wJxzsNOIAAAAABJRU5ErkJggg=="
    },
    {
      id: "window:456",
      name: "Discoverer",
      isScreen: false,
      thumbnail: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8HwHwAFHQIIj4yLtgAAAABJRU5ErkJggg=="
    },
    {
      id: "window:789",
      name: "Signal Beta",
      isScreen: false,
      thumbnail: ""
    },
    {
      id: "window:xyz",
      name: "Window that has a really long name and overflows",
      isScreen: false,
      thumbnail: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+O/wHwAEhgJAyqFnAgAAAABJRU5ErkJggg=="
    }
  ],
  setPresenting: (0, import_addon_actions.action)("set-presenting")
}), "createProps");
var CallingSelectPresentingSourcesModal_stories_default = {
  title: "Components/CallingSelectPresentingSourcesModal"
};
const Modal = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ import_react.default.createElement(import_CallingSelectPresentingSourcesModal.CallingSelectPresentingSourcesModal, {
    ...createProps()
  });
}, "Modal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Modal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ1NlbGVjdFByZXNlbnRpbmdTb3VyY2VzTW9kYWwuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi9DYWxsaW5nU2VsZWN0UHJlc2VudGluZ1NvdXJjZXNNb2RhbCc7XG5pbXBvcnQgeyBDYWxsaW5nU2VsZWN0UHJlc2VudGluZ1NvdXJjZXNNb2RhbCB9IGZyb20gJy4vQ2FsbGluZ1NlbGVjdFByZXNlbnRpbmdTb3VyY2VzTW9kYWwnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAoKTogUHJvcHNUeXBlID0+ICh7XG4gIGkxOG4sXG4gIHByZXNlbnRpbmdTb3VyY2VzQXZhaWxhYmxlOiBbXG4gICAge1xuICAgICAgaWQ6ICdzY3JlZW4nLFxuICAgICAgbmFtZTogJ0VudGlyZSBTY3JlZW4nLFxuICAgICAgaXNTY3JlZW46IHRydWUsXG4gICAgICB0aHVtYm5haWw6XG4gICAgICAgICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBQUJDQVlBQUFBZkZjU0pBQUFBRFVsRVFWUjQybU5rK1AvMVB3QUY4QUwxc0VWSVBBQUFBQUJKUlU1RXJrSmdnZz09JyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAnd2luZG93OjEyMycsXG4gICAgICBuYW1lOiAnQm96aXJybyBBaXJob3JzZScsXG4gICAgICBpc1NjcmVlbjogZmFsc2UsXG4gICAgICB0aHVtYm5haWw6XG4gICAgICAgICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBQUJDQVlBQUFBZkZjU0pBQUFBRFVsRVFWUjQybVA4ejFENEh3QUY1d0p4enNOT0lBQUFBQUJKUlU1RXJrSmdnZz09JyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAnd2luZG93OjQ1NicsXG4gICAgICBuYW1lOiAnRGlzY292ZXJlcicsXG4gICAgICBpc1NjcmVlbjogZmFsc2UsXG4gICAgICB0aHVtYm5haWw6XG4gICAgICAgICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBQUJDQVlBQUFBZkZjU0pBQUFBRFVsRVFWUjQybVA4ejhId0h3QUZIUUlJajR5THRnQUFBQUJKUlU1RXJrSmdnZz09JyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAnd2luZG93Ojc4OScsXG4gICAgICBuYW1lOiAnU2lnbmFsIEJldGEnLFxuICAgICAgaXNTY3JlZW46IGZhbHNlLFxuICAgICAgdGh1bWJuYWlsOiAnJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAnd2luZG93Onh5eicsXG4gICAgICBuYW1lOiAnV2luZG93IHRoYXQgaGFzIGEgcmVhbGx5IGxvbmcgbmFtZSBhbmQgb3ZlcmZsb3dzJyxcbiAgICAgIGlzU2NyZWVuOiBmYWxzZSxcbiAgICAgIHRodW1ibmFpbDpcbiAgICAgICAgJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQUVBQUFBQkNBWUFBQUFmRmNTSkFBQUFEVWxFUVZSNDJtTmsrTy93SHdBRWhnSkF5cUZuQWdBQUFBQkpSVTVFcmtKZ2dnPT0nLFxuICAgIH0sXG4gIF0sXG4gIHNldFByZXNlbnRpbmc6IGFjdGlvbignc2V0LXByZXNlbnRpbmcnKSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9DYWxsaW5nU2VsZWN0UHJlc2VudGluZ1NvdXJjZXNNb2RhbCcsXG59O1xuXG5leHBvcnQgY29uc3QgTW9kYWwgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gPENhbGxpbmdTZWxlY3RQcmVzZW50aW5nU291cmNlc01vZGFsIHsuLi5jcmVhdGVQcm9wcygpfSAvPjtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsMkJBQXVCO0FBR3ZCLGlEQUFvRDtBQUVwRCx1QkFBMEI7QUFDMUIsc0JBQXVCO0FBRXZCLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLE1BQU0sY0FBYyw2QkFBa0I7QUFBQSxFQUNwQztBQUFBLEVBQ0EsNEJBQTRCO0FBQUEsSUFDMUI7QUFBQSxNQUNFLElBQUk7QUFBQSxNQUNKLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFdBQ0U7QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLE1BQ0UsSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsV0FDRTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsTUFDRSxJQUFJO0FBQUEsTUFDSixNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixXQUNFO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxNQUNFLElBQUk7QUFBQSxNQUNKLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFdBQVc7QUFBQSxJQUNiO0FBQUEsSUFDQTtBQUFBLE1BQ0UsSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsV0FDRTtBQUFBLElBQ0o7QUFBQSxFQUNGO0FBQUEsRUFDQSxlQUFlLGlDQUFPLGdCQUFnQjtBQUN4QyxJQXZDb0I7QUF5Q3BCLElBQU8sc0RBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sUUFBUSw2QkFBbUI7QUFDdEMsU0FBTyxtREFBQztBQUFBLE9BQXdDLFlBQVk7QUFBQSxHQUFHO0FBQ2pFLEdBRnFCOyIsCiAgIm5hbWVzIjogW10KfQo=
