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
var ReactionPickerPicker_exports = {};
__export(ReactionPickerPicker_exports, {
  ReactionPickerPicker: () => ReactionPickerPicker,
  ReactionPickerPickerEmojiButton: () => ReactionPickerPickerEmojiButton,
  ReactionPickerPickerMoreButton: () => ReactionPickerPickerMoreButton,
  ReactionPickerPickerStyle: () => ReactionPickerPickerStyle
});
module.exports = __toCommonJS(ReactionPickerPicker_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_Emoji = require("./emoji/Emoji");
var ReactionPickerPickerStyle = /* @__PURE__ */ ((ReactionPickerPickerStyle2) => {
  ReactionPickerPickerStyle2[ReactionPickerPickerStyle2["Picker"] = 0] = "Picker";
  ReactionPickerPickerStyle2[ReactionPickerPickerStyle2["Menu"] = 1] = "Menu";
  return ReactionPickerPickerStyle2;
})(ReactionPickerPickerStyle || {});
const ReactionPickerPickerEmojiButton = import_react.default.forwardRef(({ emoji, onClick, isSelected, title }, ref) => /* @__PURE__ */ import_react.default.createElement("button", {
  type: "button",
  ref,
  tabIndex: 0,
  className: (0, import_classnames.default)("module-ReactionPickerPicker__button", "module-ReactionPickerPicker__button--emoji", isSelected && "module-ReactionPickerPicker__button--selected"),
  onClick: (event) => {
    event.stopPropagation();
    onClick();
  }
}, /* @__PURE__ */ import_react.default.createElement(import_Emoji.Emoji, {
  size: 48,
  emoji,
  title
})));
const ReactionPickerPickerMoreButton = /* @__PURE__ */ __name(({
  i18n,
  onClick
}) => /* @__PURE__ */ import_react.default.createElement("button", {
  "aria-label": i18n("Reactions--more"),
  className: "module-ReactionPickerPicker__button module-ReactionPickerPicker__button--more",
  onClick: (event) => {
    event.stopPropagation();
    onClick();
  },
  tabIndex: 0,
  title: i18n("Reactions--more"),
  type: "button"
}, /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-ReactionPickerPicker__button--more__dot"
}), /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-ReactionPickerPicker__button--more__dot"
}), /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-ReactionPickerPicker__button--more__dot"
})), "ReactionPickerPickerMoreButton");
const ReactionPickerPicker = (0, import_react.forwardRef)(({ children, isSomethingSelected, pickerStyle, style }, ref) => /* @__PURE__ */ import_react.default.createElement("div", {
  className: (0, import_classnames.default)("module-ReactionPickerPicker", isSomethingSelected && "module-ReactionPickerPicker--something-selected", {
    "module-ReactionPickerPicker--picker-style": pickerStyle === 0 /* Picker */,
    "module-ReactionPickerPicker--menu-style": pickerStyle === 1 /* Menu */
  }),
  ref,
  style
}, children));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReactionPickerPicker,
  ReactionPickerPickerEmojiButton,
  ReactionPickerPickerMoreButton,
  ReactionPickerPickerStyle
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUmVhY3Rpb25QaWNrZXJQaWNrZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBDU1NQcm9wZXJ0aWVzLCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgeyBFbW9qaSB9IGZyb20gJy4vZW1vamkvRW1vamknO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5cbmV4cG9ydCBlbnVtIFJlYWN0aW9uUGlja2VyUGlja2VyU3R5bGUge1xuICBQaWNrZXIsXG4gIE1lbnUsXG59XG5cbmV4cG9ydCBjb25zdCBSZWFjdGlvblBpY2tlclBpY2tlckVtb2ppQnV0dG9uID0gUmVhY3QuZm9yd2FyZFJlZjxcbiAgSFRNTEJ1dHRvbkVsZW1lbnQsXG4gIHtcbiAgICBlbW9qaTogc3RyaW5nO1xuICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW47XG4gICAgb25DbGljazogKCkgPT4gdW5rbm93bjtcbiAgICB0aXRsZT86IHN0cmluZztcbiAgfVxuPigoeyBlbW9qaSwgb25DbGljaywgaXNTZWxlY3RlZCwgdGl0bGUgfSwgcmVmKSA9PiAoXG4gIDxidXR0b25cbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICByZWY9e3JlZn1cbiAgICB0YWJJbmRleD17MH1cbiAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAnbW9kdWxlLVJlYWN0aW9uUGlja2VyUGlja2VyX19idXR0b24nLFxuICAgICAgJ21vZHVsZS1SZWFjdGlvblBpY2tlclBpY2tlcl9fYnV0dG9uLS1lbW9qaScsXG4gICAgICBpc1NlbGVjdGVkICYmICdtb2R1bGUtUmVhY3Rpb25QaWNrZXJQaWNrZXJfX2J1dHRvbi0tc2VsZWN0ZWQnXG4gICAgKX1cbiAgICBvbkNsaWNrPXtldmVudCA9PiB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIG9uQ2xpY2soKTtcbiAgICB9fVxuICA+XG4gICAgPEVtb2ppIHNpemU9ezQ4fSBlbW9qaT17ZW1vaml9IHRpdGxlPXt0aXRsZX0gLz5cbiAgPC9idXR0b24+XG4pKTtcblxuZXhwb3J0IGNvbnN0IFJlYWN0aW9uUGlja2VyUGlja2VyTW9yZUJ1dHRvbiA9ICh7XG4gIGkxOG4sXG4gIG9uQ2xpY2ssXG59OiBSZWFkb25seTx7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIG9uQ2xpY2s6ICgpID0+IHVua25vd247XG59Pik6IEpTWC5FbGVtZW50ID0+IChcbiAgPGJ1dHRvblxuICAgIGFyaWEtbGFiZWw9e2kxOG4oJ1JlYWN0aW9ucy0tbW9yZScpfVxuICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1SZWFjdGlvblBpY2tlclBpY2tlcl9fYnV0dG9uIG1vZHVsZS1SZWFjdGlvblBpY2tlclBpY2tlcl9fYnV0dG9uLS1tb3JlXCJcbiAgICBvbkNsaWNrPXtldmVudCA9PiB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIG9uQ2xpY2soKTtcbiAgICB9fVxuICAgIHRhYkluZGV4PXswfVxuICAgIHRpdGxlPXtpMThuKCdSZWFjdGlvbnMtLW1vcmUnKX1cbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLVJlYWN0aW9uUGlja2VyUGlja2VyX19idXR0b24tLW1vcmVfX2RvdFwiIC8+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtUmVhY3Rpb25QaWNrZXJQaWNrZXJfX2J1dHRvbi0tbW9yZV9fZG90XCIgLz5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1SZWFjdGlvblBpY2tlclBpY2tlcl9fYnV0dG9uLS1tb3JlX19kb3RcIiAvPlxuICA8L2J1dHRvbj5cbik7XG5cbmV4cG9ydCBjb25zdCBSZWFjdGlvblBpY2tlclBpY2tlciA9IGZvcndhcmRSZWY8XG4gIEhUTUxEaXZFbGVtZW50LFxuICB7XG4gICAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcbiAgICBpc1NvbWV0aGluZ1NlbGVjdGVkOiBib29sZWFuO1xuICAgIHBpY2tlclN0eWxlOiBSZWFjdGlvblBpY2tlclBpY2tlclN0eWxlO1xuICAgIHN0eWxlPzogQ1NTUHJvcGVydGllcztcbiAgfVxuPigoeyBjaGlsZHJlbiwgaXNTb21ldGhpbmdTZWxlY3RlZCwgcGlja2VyU3R5bGUsIHN0eWxlIH0sIHJlZikgPT4gKFxuICA8ZGl2XG4gICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgJ21vZHVsZS1SZWFjdGlvblBpY2tlclBpY2tlcicsXG4gICAgICBpc1NvbWV0aGluZ1NlbGVjdGVkICYmICdtb2R1bGUtUmVhY3Rpb25QaWNrZXJQaWNrZXItLXNvbWV0aGluZy1zZWxlY3RlZCcsXG4gICAgICB7XG4gICAgICAgICdtb2R1bGUtUmVhY3Rpb25QaWNrZXJQaWNrZXItLXBpY2tlci1zdHlsZSc6XG4gICAgICAgICAgcGlja2VyU3R5bGUgPT09IFJlYWN0aW9uUGlja2VyUGlja2VyU3R5bGUuUGlja2VyLFxuICAgICAgICAnbW9kdWxlLVJlYWN0aW9uUGlja2VyUGlja2VyLS1tZW51LXN0eWxlJzpcbiAgICAgICAgICBwaWNrZXJTdHlsZSA9PT0gUmVhY3Rpb25QaWNrZXJQaWNrZXJTdHlsZS5NZW51LFxuICAgICAgfVxuICAgICl9XG4gICAgcmVmPXtyZWZ9XG4gICAgc3R5bGU9e3N0eWxlfVxuICA+XG4gICAge2NoaWxkcmVufVxuICA8L2Rpdj5cbikpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQztBQUNsQyx3QkFBdUI7QUFFdkIsbUJBQXNCO0FBR2YsSUFBSyw0QkFBTCxrQkFBSywrQkFBTDtBQUNMO0FBQ0E7QUFGVTtBQUFBO0FBS0wsTUFBTSxrQ0FBa0MscUJBQU0sV0FRbkQsQ0FBQyxFQUFFLE9BQU8sU0FBUyxZQUFZLFNBQVMsUUFDeEMsbURBQUM7QUFBQSxFQUNDLE1BQUs7QUFBQSxFQUNMO0FBQUEsRUFDQSxVQUFVO0FBQUEsRUFDVixXQUFXLCtCQUNULHVDQUNBLDhDQUNBLGNBQWMsK0NBQ2hCO0FBQUEsRUFDQSxTQUFTLFdBQVM7QUFDaEIsVUFBTSxnQkFBZ0I7QUFDdEIsWUFBUTtBQUFBLEVBQ1Y7QUFBQSxHQUVBLG1EQUFDO0FBQUEsRUFBTSxNQUFNO0FBQUEsRUFBSTtBQUFBLEVBQWM7QUFBQSxDQUFjLENBQy9DLENBQ0Q7QUFFTSxNQUFNLGlDQUFpQyx3QkFBQztBQUFBLEVBQzdDO0FBQUEsRUFDQTtBQUFBLE1BS0EsbURBQUM7QUFBQSxFQUNDLGNBQVksS0FBSyxpQkFBaUI7QUFBQSxFQUNsQyxXQUFVO0FBQUEsRUFDVixTQUFTLFdBQVM7QUFDaEIsVUFBTSxnQkFBZ0I7QUFDdEIsWUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFVBQVU7QUFBQSxFQUNWLE9BQU8sS0FBSyxpQkFBaUI7QUFBQSxFQUM3QixNQUFLO0FBQUEsR0FFTCxtREFBQztBQUFBLEVBQUksV0FBVTtBQUFBLENBQWlELEdBQ2hFLG1EQUFDO0FBQUEsRUFBSSxXQUFVO0FBQUEsQ0FBaUQsR0FDaEUsbURBQUM7QUFBQSxFQUFJLFdBQVU7QUFBQSxDQUFpRCxDQUNsRSxHQXJCNEM7QUF3QnZDLE1BQU0sdUJBQXVCLDZCQVFsQyxDQUFDLEVBQUUsVUFBVSxxQkFBcUIsYUFBYSxTQUFTLFFBQ3hELG1EQUFDO0FBQUEsRUFDQyxXQUFXLCtCQUNULCtCQUNBLHVCQUF1QixtREFDdkI7QUFBQSxJQUNFLDZDQUNFLGdCQUFnQjtBQUFBLElBQ2xCLDJDQUNFLGdCQUFnQjtBQUFBLEVBQ3BCLENBQ0Y7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBRUMsUUFDSCxDQUNEOyIsCiAgIm5hbWVzIjogW10KfQo=
