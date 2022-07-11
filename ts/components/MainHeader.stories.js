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
var MainHeader_stories_exports = {};
__export(MainHeader_stories_exports, {
  Basic: () => Basic,
  Name: () => Name,
  PhoneNumber: () => PhoneNumber,
  Stories: () => Stories,
  UpdateAvailable: () => UpdateAvailable,
  default: () => MainHeader_stories_default
});
module.exports = __toCommonJS(MainHeader_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_MainHeader = require("./MainHeader");
var import_Util = require("../types/Util");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var MainHeader_stories_default = {
  title: "Components/MainHeader"
};
const requiredText = /* @__PURE__ */ __name((name, value) => (0, import_addon_knobs.text)(name, value || ""), "requiredText");
const optionalText = /* @__PURE__ */ __name((name, value) => (0, import_addon_knobs.text)(name, value || "") || void 0, "optionalText");
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  areStoriesEnabled: false,
  theme: import_Util.ThemeType.light,
  phoneNumber: optionalText("phoneNumber", overrideProps.phoneNumber),
  title: requiredText("title", overrideProps.title),
  name: optionalText("name", overrideProps.name),
  avatarPath: optionalText("avatarPath", overrideProps.avatarPath),
  hasPendingUpdate: Boolean(overrideProps.hasPendingUpdate),
  i18n,
  startUpdate: (0, import_addon_actions.action)("startUpdate"),
  showArchivedConversations: (0, import_addon_actions.action)("showArchivedConversations"),
  startComposing: (0, import_addon_actions.action)("startComposing"),
  toggleProfileEditor: (0, import_addon_actions.action)("toggleProfileEditor"),
  toggleStoriesView: (0, import_addon_actions.action)("toggleStoriesView")
}), "createProps");
const Basic = /* @__PURE__ */ __name(() => {
  const props = createProps({});
  return /* @__PURE__ */ React.createElement(import_MainHeader.MainHeader, {
    ...props
  });
}, "Basic");
const Name = /* @__PURE__ */ __name(() => {
  const props = createProps({
    name: "John Smith",
    title: "John Smith"
  });
  return /* @__PURE__ */ React.createElement(import_MainHeader.MainHeader, {
    ...props
  });
}, "Name");
const PhoneNumber = /* @__PURE__ */ __name(() => {
  const props = createProps({
    name: "John Smith",
    phoneNumber: "+15553004000"
  });
  return /* @__PURE__ */ React.createElement(import_MainHeader.MainHeader, {
    ...props
  });
}, "PhoneNumber");
const UpdateAvailable = /* @__PURE__ */ __name(() => {
  const props = createProps({ hasPendingUpdate: true });
  return /* @__PURE__ */ React.createElement(import_MainHeader.MainHeader, {
    ...props
  });
}, "UpdateAvailable");
const Stories = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_MainHeader.MainHeader, {
  ...createProps({}),
  areStoriesEnabled: true
}), "Stories");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Basic,
  Name,
  PhoneNumber,
  Stories,
  UpdateAvailable
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWFpbkhlYWRlci5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHRleHQgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL01haW5IZWFkZXInO1xuaW1wb3J0IHsgTWFpbkhlYWRlciB9IGZyb20gJy4vTWFpbkhlYWRlcic7XG5pbXBvcnQgeyBUaGVtZVR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvTWFpbkhlYWRlcicsXG59O1xuXG5jb25zdCByZXF1aXJlZFRleHQgPSAobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PlxuICB0ZXh0KG5hbWUsIHZhbHVlIHx8ICcnKTtcbmNvbnN0IG9wdGlvbmFsVGV4dCA9IChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQpID0+XG4gIHRleHQobmFtZSwgdmFsdWUgfHwgJycpIHx8IHVuZGVmaW5lZDtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wc1R5cGU+ID0ge30pOiBQcm9wc1R5cGUgPT4gKHtcbiAgYXJlU3Rvcmllc0VuYWJsZWQ6IGZhbHNlLFxuICB0aGVtZTogVGhlbWVUeXBlLmxpZ2h0LFxuXG4gIHBob25lTnVtYmVyOiBvcHRpb25hbFRleHQoJ3Bob25lTnVtYmVyJywgb3ZlcnJpZGVQcm9wcy5waG9uZU51bWJlciksXG4gIHRpdGxlOiByZXF1aXJlZFRleHQoJ3RpdGxlJywgb3ZlcnJpZGVQcm9wcy50aXRsZSksXG4gIG5hbWU6IG9wdGlvbmFsVGV4dCgnbmFtZScsIG92ZXJyaWRlUHJvcHMubmFtZSksXG4gIGF2YXRhclBhdGg6IG9wdGlvbmFsVGV4dCgnYXZhdGFyUGF0aCcsIG92ZXJyaWRlUHJvcHMuYXZhdGFyUGF0aCksXG4gIGhhc1BlbmRpbmdVcGRhdGU6IEJvb2xlYW4ob3ZlcnJpZGVQcm9wcy5oYXNQZW5kaW5nVXBkYXRlKSxcblxuICBpMThuLFxuXG4gIHN0YXJ0VXBkYXRlOiBhY3Rpb24oJ3N0YXJ0VXBkYXRlJyksXG5cbiAgc2hvd0FyY2hpdmVkQ29udmVyc2F0aW9uczogYWN0aW9uKCdzaG93QXJjaGl2ZWRDb252ZXJzYXRpb25zJyksXG4gIHN0YXJ0Q29tcG9zaW5nOiBhY3Rpb24oJ3N0YXJ0Q29tcG9zaW5nJyksXG4gIHRvZ2dsZVByb2ZpbGVFZGl0b3I6IGFjdGlvbigndG9nZ2xlUHJvZmlsZUVkaXRvcicpLFxuICB0b2dnbGVTdG9yaWVzVmlldzogYWN0aW9uKCd0b2dnbGVTdG9yaWVzVmlldycpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBCYXNpYyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe30pO1xuXG4gIHJldHVybiA8TWFpbkhlYWRlciB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE5hbWUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBuYW1lOiAnSm9obiBTbWl0aCcsXG4gICAgdGl0bGU6ICdKb2huIFNtaXRoJyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxNYWluSGVhZGVyIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgUGhvbmVOdW1iZXIgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBuYW1lOiAnSm9obiBTbWl0aCcsXG4gICAgcGhvbmVOdW1iZXI6ICcrMTU1NTMwMDQwMDAnLFxuICB9KTtcblxuICByZXR1cm4gPE1haW5IZWFkZXIgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBVcGRhdGVBdmFpbGFibGUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHsgaGFzUGVuZGluZ1VwZGF0ZTogdHJ1ZSB9KTtcblxuICByZXR1cm4gPE1haW5IZWFkZXIgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBTdG9yaWVzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPE1haW5IZWFkZXIgey4uLmNyZWF0ZVByb3BzKHt9KX0gYXJlU3Rvcmllc0VuYWJsZWQgLz5cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHlCQUFxQjtBQUNyQiwyQkFBdUI7QUFFdkIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2Qix3QkFBMkI7QUFDM0Isa0JBQTBCO0FBRTFCLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8sNkJBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0sZUFBZSx3QkFBQyxNQUFjLFVBQ2xDLDZCQUFLLE1BQU0sU0FBUyxFQUFFLEdBREg7QUFFckIsTUFBTSxlQUFlLHdCQUFDLE1BQWMsVUFDbEMsNkJBQUssTUFBTSxTQUFTLEVBQUUsS0FBSyxRQURSO0FBR3JCLE1BQU0sY0FBYyx3QkFBQyxnQkFBb0MsQ0FBQyxNQUFrQjtBQUFBLEVBQzFFLG1CQUFtQjtBQUFBLEVBQ25CLE9BQU8sc0JBQVU7QUFBQSxFQUVqQixhQUFhLGFBQWEsZUFBZSxjQUFjLFdBQVc7QUFBQSxFQUNsRSxPQUFPLGFBQWEsU0FBUyxjQUFjLEtBQUs7QUFBQSxFQUNoRCxNQUFNLGFBQWEsUUFBUSxjQUFjLElBQUk7QUFBQSxFQUM3QyxZQUFZLGFBQWEsY0FBYyxjQUFjLFVBQVU7QUFBQSxFQUMvRCxrQkFBa0IsUUFBUSxjQUFjLGdCQUFnQjtBQUFBLEVBRXhEO0FBQUEsRUFFQSxhQUFhLGlDQUFPLGFBQWE7QUFBQSxFQUVqQywyQkFBMkIsaUNBQU8sMkJBQTJCO0FBQUEsRUFDN0QsZ0JBQWdCLGlDQUFPLGdCQUFnQjtBQUFBLEVBQ3ZDLHFCQUFxQixpQ0FBTyxxQkFBcUI7QUFBQSxFQUNqRCxtQkFBbUIsaUNBQU8sbUJBQW1CO0FBQy9DLElBbEJvQjtBQW9CYixNQUFNLFFBQVEsNkJBQW1CO0FBQ3RDLFFBQU0sUUFBUSxZQUFZLENBQUMsQ0FBQztBQUU1QixTQUFPLG9DQUFDO0FBQUEsT0FBZTtBQUFBLEdBQU87QUFDaEMsR0FKcUI7QUFNZCxNQUFNLE9BQU8sNkJBQW1CO0FBQ3JDLFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFlO0FBQUEsR0FBTztBQUNoQyxHQVBvQjtBQVNiLE1BQU0sY0FBYyw2QkFBbUI7QUFDNUMsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixNQUFNO0FBQUEsSUFDTixhQUFhO0FBQUEsRUFDZixDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQWU7QUFBQSxHQUFPO0FBQ2hDLEdBUDJCO0FBU3BCLE1BQU0sa0JBQWtCLDZCQUFtQjtBQUNoRCxRQUFNLFFBQVEsWUFBWSxFQUFFLGtCQUFrQixLQUFLLENBQUM7QUFFcEQsU0FBTyxvQ0FBQztBQUFBLE9BQWU7QUFBQSxHQUFPO0FBQ2hDLEdBSitCO0FBTXhCLE1BQU0sVUFBVSw2QkFDckIsb0NBQUM7QUFBQSxLQUFlLFlBQVksQ0FBQyxDQUFDO0FBQUEsRUFBRyxtQkFBaUI7QUFBQSxDQUFDLEdBRDlCOyIsCiAgIm5hbWVzIjogW10KfQo=
