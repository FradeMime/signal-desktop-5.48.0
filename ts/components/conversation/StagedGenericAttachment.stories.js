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
var StagedGenericAttachment_stories_exports = {};
__export(StagedGenericAttachment_stories_exports, {
  LongExtension: () => LongExtension,
  LongName: () => LongName,
  TextFile: () => TextFile,
  default: () => StagedGenericAttachment_stories_default
});
module.exports = __toCommonJS(StagedGenericAttachment_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_MIME = require("../../types/MIME");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_StagedGenericAttachment = require("./StagedGenericAttachment");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var StagedGenericAttachment_stories_default = {
  title: "Components/Conversation/StagedGenericAttachment"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  attachment: overrideProps.attachment || {},
  i18n,
  onClose: (0, import_addon_actions.action)("onClose")
}), "createProps");
const createAttachment = /* @__PURE__ */ __name((props = {}) => ({
  contentType: (0, import_MIME.stringToMIMEType)((0, import_addon_knobs.text)("attachment contentType", props.contentType || "")),
  fileName: (0, import_addon_knobs.text)("attachment fileName", props.fileName || ""),
  url: "",
  size: 14243
}), "createAttachment");
const TextFile = /* @__PURE__ */ __name(() => {
  const attachment = createAttachment({
    contentType: (0, import_MIME.stringToMIMEType)("text/plain"),
    fileName: "manifesto.txt"
  });
  const props = createProps({ attachment });
  return /* @__PURE__ */ React.createElement(import_StagedGenericAttachment.StagedGenericAttachment, {
    ...props
  });
}, "TextFile");
const LongName = /* @__PURE__ */ __name(() => {
  const attachment = createAttachment({
    contentType: (0, import_MIME.stringToMIMEType)("text/plain"),
    fileName: "this-is-my-very-important-manifesto-you-must-read-it.txt"
  });
  const props = createProps({ attachment });
  return /* @__PURE__ */ React.createElement(import_StagedGenericAttachment.StagedGenericAttachment, {
    ...props
  });
}, "LongName");
const LongExtension = /* @__PURE__ */ __name(() => {
  const attachment = createAttachment({
    contentType: (0, import_MIME.stringToMIMEType)("text/plain"),
    fileName: "manifesto.reallylongtxt"
  });
  const props = createProps({ attachment });
  return /* @__PURE__ */ React.createElement(import_StagedGenericAttachment.StagedGenericAttachment, {
    ...props
  });
}, "LongExtension");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LongExtension,
  LongName,
  TextFile
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RhZ2VkR2VuZXJpY0F0dGFjaG1lbnQuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdGV4dCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHR5cGUgeyBBdHRhY2htZW50VHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHsgc3RyaW5nVG9NSU1FVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL01JTUUnO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi9TdGFnZWRHZW5lcmljQXR0YWNobWVudCc7XG5pbXBvcnQgeyBTdGFnZWRHZW5lcmljQXR0YWNobWVudCB9IGZyb20gJy4vU3RhZ2VkR2VuZXJpY0F0dGFjaG1lbnQnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vU3RhZ2VkR2VuZXJpY0F0dGFjaG1lbnQnLFxufTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wcz4gPSB7fSk6IFByb3BzID0+ICh7XG4gIGF0dGFjaG1lbnQ6IG92ZXJyaWRlUHJvcHMuYXR0YWNobWVudCB8fCAoe30gYXMgQXR0YWNobWVudFR5cGUpLFxuICBpMThuLFxuICBvbkNsb3NlOiBhY3Rpb24oJ29uQ2xvc2UnKSxcbn0pO1xuXG5jb25zdCBjcmVhdGVBdHRhY2htZW50ID0gKFxuICBwcm9wczogUGFydGlhbDxBdHRhY2htZW50VHlwZT4gPSB7fVxuKTogQXR0YWNobWVudFR5cGUgPT4gKHtcbiAgY29udGVudFR5cGU6IHN0cmluZ1RvTUlNRVR5cGUoXG4gICAgdGV4dCgnYXR0YWNobWVudCBjb250ZW50VHlwZScsIHByb3BzLmNvbnRlbnRUeXBlIHx8ICcnKVxuICApLFxuICBmaWxlTmFtZTogdGV4dCgnYXR0YWNobWVudCBmaWxlTmFtZScsIHByb3BzLmZpbGVOYW1lIHx8ICcnKSxcbiAgdXJsOiAnJyxcbiAgc2l6ZTogMTQyNDMsXG59KTtcblxuZXhwb3J0IGNvbnN0IFRleHRGaWxlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgYXR0YWNobWVudCA9IGNyZWF0ZUF0dGFjaG1lbnQoe1xuICAgIGNvbnRlbnRUeXBlOiBzdHJpbmdUb01JTUVUeXBlKCd0ZXh0L3BsYWluJyksXG4gICAgZmlsZU5hbWU6ICdtYW5pZmVzdG8udHh0JyxcbiAgfSk7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoeyBhdHRhY2htZW50IH0pO1xuXG4gIHJldHVybiA8U3RhZ2VkR2VuZXJpY0F0dGFjaG1lbnQgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBMb25nTmFtZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGF0dGFjaG1lbnQgPSBjcmVhdGVBdHRhY2htZW50KHtcbiAgICBjb250ZW50VHlwZTogc3RyaW5nVG9NSU1FVHlwZSgndGV4dC9wbGFpbicpLFxuICAgIGZpbGVOYW1lOiAndGhpcy1pcy1teS12ZXJ5LWltcG9ydGFudC1tYW5pZmVzdG8teW91LW11c3QtcmVhZC1pdC50eHQnLFxuICB9KTtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7IGF0dGFjaG1lbnQgfSk7XG5cbiAgcmV0dXJuIDxTdGFnZWRHZW5lcmljQXR0YWNobWVudCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IExvbmdFeHRlbnNpb24gPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBhdHRhY2htZW50ID0gY3JlYXRlQXR0YWNobWVudCh7XG4gICAgY29udGVudFR5cGU6IHN0cmluZ1RvTUlNRVR5cGUoJ3RleHQvcGxhaW4nKSxcbiAgICBmaWxlTmFtZTogJ21hbmlmZXN0by5yZWFsbHlsb25ndHh0JyxcbiAgfSk7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoeyBhdHRhY2htZW50IH0pO1xuXG4gIHJldHVybiA8U3RhZ2VkR2VuZXJpY0F0dGFjaG1lbnQgey4uLnByb3BzfSAvPjtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIseUJBQXFCO0FBQ3JCLDJCQUF1QjtBQUd2QixrQkFBaUM7QUFDakMsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixxQ0FBd0M7QUFFeEMsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTywwQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxjQUFjLHdCQUFDLGdCQUFnQyxDQUFDLE1BQWM7QUFBQSxFQUNsRSxZQUFZLGNBQWMsY0FBZSxDQUFDO0FBQUEsRUFDMUM7QUFBQSxFQUNBLFNBQVMsaUNBQU8sU0FBUztBQUMzQixJQUpvQjtBQU1wQixNQUFNLG1CQUFtQix3QkFDdkIsUUFBaUMsQ0FBQyxNQUNkO0FBQUEsRUFDcEIsYUFBYSxrQ0FDWCw2QkFBSywwQkFBMEIsTUFBTSxlQUFlLEVBQUUsQ0FDeEQ7QUFBQSxFQUNBLFVBQVUsNkJBQUssdUJBQXVCLE1BQU0sWUFBWSxFQUFFO0FBQUEsRUFDMUQsS0FBSztBQUFBLEVBQ0wsTUFBTTtBQUNSLElBVHlCO0FBV2xCLE1BQU0sV0FBVyw2QkFBbUI7QUFDekMsUUFBTSxhQUFhLGlCQUFpQjtBQUFBLElBQ2xDLGFBQWEsa0NBQWlCLFlBQVk7QUFBQSxJQUMxQyxVQUFVO0FBQUEsRUFDWixDQUFDO0FBQ0QsUUFBTSxRQUFRLFlBQVksRUFBRSxXQUFXLENBQUM7QUFFeEMsU0FBTyxvQ0FBQztBQUFBLE9BQTRCO0FBQUEsR0FBTztBQUM3QyxHQVJ3QjtBQVVqQixNQUFNLFdBQVcsNkJBQW1CO0FBQ3pDLFFBQU0sYUFBYSxpQkFBaUI7QUFBQSxJQUNsQyxhQUFhLGtDQUFpQixZQUFZO0FBQUEsSUFDMUMsVUFBVTtBQUFBLEVBQ1osQ0FBQztBQUNELFFBQU0sUUFBUSxZQUFZLEVBQUUsV0FBVyxDQUFDO0FBRXhDLFNBQU8sb0NBQUM7QUFBQSxPQUE0QjtBQUFBLEdBQU87QUFDN0MsR0FSd0I7QUFVakIsTUFBTSxnQkFBZ0IsNkJBQW1CO0FBQzlDLFFBQU0sYUFBYSxpQkFBaUI7QUFBQSxJQUNsQyxhQUFhLGtDQUFpQixZQUFZO0FBQUEsSUFDMUMsVUFBVTtBQUFBLEVBQ1osQ0FBQztBQUNELFFBQU0sUUFBUSxZQUFZLEVBQUUsV0FBVyxDQUFDO0FBRXhDLFNBQU8sb0NBQUM7QUFBQSxPQUE0QjtBQUFBLEdBQU87QUFDN0MsR0FSNkI7IiwKICAibmFtZXMiOiBbXQp9Cg==
