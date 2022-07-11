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
var LastSeenIndicator_stories_exports = {};
__export(LastSeenIndicator_stories_exports, {
  MoreThanOne: () => MoreThanOne,
  One: () => One,
  default: () => LastSeenIndicator_stories_default
});
module.exports = __toCommonJS(LastSeenIndicator_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_LastSeenIndicator = require("./LastSeenIndicator");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var LastSeenIndicator_stories_default = {
  title: "Components/Conversation/LastSeenIndicator"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  count: (0, import_addon_knobs.number)("count", overrideProps.count || 1),
  i18n
}), "createProps");
const One = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_LastSeenIndicator.LastSeenIndicator, {
    ...props
  });
}, "One");
const MoreThanOne = /* @__PURE__ */ __name(() => {
  const props = createProps({
    count: 5
  });
  return /* @__PURE__ */ React.createElement(import_LastSeenIndicator.LastSeenIndicator, {
    ...props
  });
}, "MoreThanOne");
MoreThanOne.story = {
  name: "More than One"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MoreThanOne,
  One
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGFzdFNlZW5JbmRpY2F0b3Iuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBudW1iZXIgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vTGFzdFNlZW5JbmRpY2F0b3InO1xuaW1wb3J0IHsgTGFzdFNlZW5JbmRpY2F0b3IgfSBmcm9tICcuL0xhc3RTZWVuSW5kaWNhdG9yJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vTGFzdFNlZW5JbmRpY2F0b3InLFxufTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wcz4gPSB7fSk6IFByb3BzID0+ICh7XG4gIGNvdW50OiBudW1iZXIoJ2NvdW50Jywgb3ZlcnJpZGVQcm9wcy5jb3VudCB8fCAxKSxcbiAgaTE4bixcbn0pO1xuXG5leHBvcnQgY29uc3QgT25lID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcygpO1xuICByZXR1cm4gPExhc3RTZWVuSW5kaWNhdG9yIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgTW9yZVRoYW5PbmUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBjb3VudDogNSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxMYXN0U2VlbkluZGljYXRvciB7Li4ucHJvcHN9IC8+O1xufTtcblxuTW9yZVRoYW5PbmUuc3RvcnkgPSB7XG4gIG5hbWU6ICdNb3JlIHRoYW4gT25lJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLHlCQUF1QjtBQUd2QiwrQkFBa0M7QUFDbEMsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLG9DQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLGNBQWMsd0JBQUMsZ0JBQWdDLENBQUMsTUFBYztBQUFBLEVBQ2xFLE9BQU8sK0JBQU8sU0FBUyxjQUFjLFNBQVMsQ0FBQztBQUFBLEVBQy9DO0FBQ0YsSUFIb0I7QUFLYixNQUFNLE1BQU0sNkJBQW1CO0FBQ3BDLFFBQU0sUUFBUSxZQUFZO0FBQzFCLFNBQU8sb0NBQUM7QUFBQSxPQUFzQjtBQUFBLEdBQU87QUFDdkMsR0FIbUI7QUFLWixNQUFNLGNBQWMsNkJBQW1CO0FBQzVDLFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFzQjtBQUFBLEdBQU87QUFDdkMsR0FOMkI7QUFRM0IsWUFBWSxRQUFRO0FBQUEsRUFDbEIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
