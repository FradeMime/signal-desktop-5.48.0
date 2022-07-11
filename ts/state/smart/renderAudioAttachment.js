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
var renderAudioAttachment_exports = {};
__export(renderAudioAttachment_exports, {
  renderAudioAttachment: () => renderAudioAttachment
});
module.exports = __toCommonJS(renderAudioAttachment_exports);
var import_react = __toESM(require("react"));
var import_GlobalAudioContext = require("../../components/GlobalAudioContext");
var import_MessageAudio = require("./MessageAudio");
function renderAudioAttachment(props) {
  return /* @__PURE__ */ import_react.default.createElement(import_GlobalAudioContext.GlobalAudioContext.Consumer, null, (globalAudioProps) => {
    return globalAudioProps && /* @__PURE__ */ import_react.default.createElement(import_MessageAudio.SmartMessageAudio, {
      ...props,
      ...globalAudioProps
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  renderAudioAttachment
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVuZGVyQXVkaW9BdHRhY2htZW50LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBHbG9iYWxBdWRpb0NvbnRleHQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0dsb2JhbEF1ZGlvQ29udGV4dCc7XG5pbXBvcnQgdHlwZSB7IFByb3BzIGFzIE1lc3NhZ2VBdWRpb1Byb3BzIH0gZnJvbSAnLi9NZXNzYWdlQXVkaW8nO1xuaW1wb3J0IHsgU21hcnRNZXNzYWdlQXVkaW8gfSBmcm9tICcuL01lc3NhZ2VBdWRpbyc7XG5cbnR5cGUgQXVkaW9BdHRhY2htZW50UHJvcHMgPSBPbWl0PE1lc3NhZ2VBdWRpb1Byb3BzLCAnYXVkaW8nIHwgJ2NvbXB1dGVQZWFrcyc+O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQXVkaW9BdHRhY2htZW50KFxuICBwcm9wczogQXVkaW9BdHRhY2htZW50UHJvcHNcbik6IFJlYWN0RWxlbWVudCB7XG4gIHJldHVybiAoXG4gICAgPEdsb2JhbEF1ZGlvQ29udGV4dC5Db25zdW1lcj5cbiAgICAgIHtnbG9iYWxBdWRpb1Byb3BzID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBnbG9iYWxBdWRpb1Byb3BzICYmIChcbiAgICAgICAgICAgIDxTbWFydE1lc3NhZ2VBdWRpbyB7Li4ucHJvcHN9IHsuLi5nbG9iYWxBdWRpb1Byb3BzfSAvPlxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH19XG4gICAgPC9HbG9iYWxBdWRpb0NvbnRleHQuQ29uc3VtZXI+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWtCO0FBQ2xCLGdDQUFtQztBQUVuQywwQkFBa0M7QUFJM0IsK0JBQ0wsT0FDYztBQUNkLFNBQ0UsbURBQUMsNkNBQW1CLFVBQW5CLE1BQ0Usc0JBQW9CO0FBQ25CLFdBQ0Usb0JBQ0UsbURBQUM7QUFBQSxTQUFzQjtBQUFBLFNBQVc7QUFBQSxLQUFrQjtBQUFBLEVBRzFELENBQ0Y7QUFFSjtBQWRnQiIsCiAgIm5hbWVzIjogW10KfQo=
