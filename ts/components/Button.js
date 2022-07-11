var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var Button_exports = {};
__export(Button_exports, {
  Button: () => Button,
  ButtonIconType: () => ButtonIconType,
  ButtonSize: () => ButtonSize,
  ButtonVariant: () => ButtonVariant
});
module.exports = __toCommonJS(Button_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_assert = require("../util/assert");
var import_theme = require("../util/theme");
var ButtonSize = /* @__PURE__ */ ((ButtonSize2) => {
  ButtonSize2[ButtonSize2["Large"] = 0] = "Large";
  ButtonSize2[ButtonSize2["Medium"] = 1] = "Medium";
  ButtonSize2[ButtonSize2["Small"] = 2] = "Small";
  return ButtonSize2;
})(ButtonSize || {});
var ButtonVariant = /* @__PURE__ */ ((ButtonVariant2) => {
  ButtonVariant2["Calling"] = "Calling";
  ButtonVariant2["Destructive"] = "Destructive";
  ButtonVariant2["Details"] = "Details";
  ButtonVariant2["Primary"] = "Primary";
  ButtonVariant2["Secondary"] = "Secondary";
  ButtonVariant2["SecondaryAffirmative"] = "SecondaryAffirmative";
  ButtonVariant2["SecondaryDestructive"] = "SecondaryDestructive";
  ButtonVariant2["SystemMessage"] = "SystemMessage";
  return ButtonVariant2;
})(ButtonVariant || {});
var ButtonIconType = /* @__PURE__ */ ((ButtonIconType2) => {
  ButtonIconType2["audio"] = "audio";
  ButtonIconType2["muted"] = "muted";
  ButtonIconType2["photo"] = "photo";
  ButtonIconType2["search"] = "search";
  ButtonIconType2["text"] = "text";
  ButtonIconType2["unmuted"] = "unmuted";
  ButtonIconType2["video"] = "video";
  return ButtonIconType2;
})(ButtonIconType || {});
const SIZE_CLASS_NAMES = /* @__PURE__ */ new Map([
  [0 /* Large */, "module-Button--large"],
  [1 /* Medium */, "module-Button--medium"],
  [2 /* Small */, "module-Button--small"]
]);
const VARIANT_CLASS_NAMES = /* @__PURE__ */ new Map([
  ["Primary" /* Primary */, "module-Button--primary"],
  ["Secondary" /* Secondary */, "module-Button--secondary"],
  [
    "SecondaryAffirmative" /* SecondaryAffirmative */,
    "module-Button--secondary module-Button--secondary--affirmative"
  ],
  [
    "SecondaryDestructive" /* SecondaryDestructive */,
    "module-Button--secondary module-Button--secondary--destructive"
  ],
  ["Destructive" /* Destructive */, "module-Button--destructive"],
  ["Calling" /* Calling */, "module-Button--calling"],
  ["SystemMessage" /* SystemMessage */, "module-Button--system-message"],
  ["Details" /* Details */, "module-Button--details"]
]);
const Button = import_react.default.forwardRef((props, ref) => {
  const {
    children,
    className,
    disabled = false,
    icon,
    style,
    tabIndex,
    theme,
    variant = "Primary" /* Primary */,
    size = variant === "Details" /* Details */ ? 2 /* Small */ : 1 /* Medium */
  } = props;
  const ariaLabel = props["aria-label"];
  let onClick;
  let type;
  if ("onClick" in props) {
    ({ onClick } = props);
    type = "button";
  } else {
    onClick = void 0;
    ({ type } = props);
  }
  const sizeClassName = SIZE_CLASS_NAMES.get(size);
  (0, import_assert.assert)(sizeClassName, "<Button> size not found");
  const variantClassName = VARIANT_CLASS_NAMES.get(variant);
  (0, import_assert.assert)(variantClassName, "<Button> variant not found");
  const buttonElement = /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": ariaLabel,
    className: (0, import_classnames.default)("module-Button", sizeClassName, variantClassName, icon && `module-Button--icon--${icon}`, className),
    disabled,
    onClick,
    ref,
    style,
    tabIndex,
    type
  }, children);
  if (theme) {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_theme.themeClassName)(theme)
    }, buttonElement);
  }
  return buttonElement;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  ButtonIconType,
  ButtonSize,
  ButtonVariant
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQnV0dG9uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IENTU1Byb3BlcnRpZXMsIE1vdXNlRXZlbnRIYW5kbGVyLCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCB0eXBlIHsgVGhlbWUgfSBmcm9tICcuLi91dGlsL3RoZW1lJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7IHRoZW1lQ2xhc3NOYW1lIH0gZnJvbSAnLi4vdXRpbC90aGVtZSc7XG5cbmV4cG9ydCBlbnVtIEJ1dHRvblNpemUge1xuICBMYXJnZSxcbiAgTWVkaXVtLFxuICBTbWFsbCxcbn1cblxuZXhwb3J0IGVudW0gQnV0dG9uVmFyaWFudCB7XG4gIENhbGxpbmcgPSAnQ2FsbGluZycsXG4gIERlc3RydWN0aXZlID0gJ0Rlc3RydWN0aXZlJyxcbiAgRGV0YWlscyA9ICdEZXRhaWxzJyxcbiAgUHJpbWFyeSA9ICdQcmltYXJ5JyxcbiAgU2Vjb25kYXJ5ID0gJ1NlY29uZGFyeScsXG4gIFNlY29uZGFyeUFmZmlybWF0aXZlID0gJ1NlY29uZGFyeUFmZmlybWF0aXZlJyxcbiAgU2Vjb25kYXJ5RGVzdHJ1Y3RpdmUgPSAnU2Vjb25kYXJ5RGVzdHJ1Y3RpdmUnLFxuICBTeXN0ZW1NZXNzYWdlID0gJ1N5c3RlbU1lc3NhZ2UnLFxufVxuXG5leHBvcnQgZW51bSBCdXR0b25JY29uVHlwZSB7XG4gIGF1ZGlvID0gJ2F1ZGlvJyxcbiAgbXV0ZWQgPSAnbXV0ZWQnLFxuICBwaG90byA9ICdwaG90bycsXG4gIHNlYXJjaCA9ICdzZWFyY2gnLFxuICB0ZXh0ID0gJ3RleHQnLFxuICB1bm11dGVkID0gJ3VubXV0ZWQnLFxuICB2aWRlbyA9ICd2aWRlbycsXG59XG5cbnR5cGUgUHJvcHNUeXBlID0ge1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgaWNvbj86IEJ1dHRvbkljb25UeXBlO1xuICBzaXplPzogQnV0dG9uU2l6ZTtcbiAgc3R5bGU/OiBDU1NQcm9wZXJ0aWVzO1xuICB0YWJJbmRleD86IG51bWJlcjtcbiAgdGhlbWU/OiBUaGVtZTtcbiAgdmFyaWFudD86IEJ1dHRvblZhcmlhbnQ7XG59ICYgKFxuICB8IHtcbiAgICAgIG9uQ2xpY2s6IE1vdXNlRXZlbnRIYW5kbGVyPEhUTUxCdXR0b25FbGVtZW50PjtcbiAgICB9XG4gIHwge1xuICAgICAgdHlwZTogJ3N1Ym1pdCc7XG4gICAgfVxuKSAmXG4gIChcbiAgICB8IHtcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiBzdHJpbmc7XG4gICAgICAgIGNoaWxkcmVuOiBSZWFjdE5vZGU7XG4gICAgICB9XG4gICAgfCB7XG4gICAgICAgICdhcmlhLWxhYmVsJz86IHN0cmluZztcbiAgICAgICAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcbiAgICAgIH1cbiAgICB8IHtcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiBzdHJpbmc7XG4gICAgICAgIGNoaWxkcmVuPzogUmVhY3ROb2RlO1xuICAgICAgfVxuICApO1xuXG5jb25zdCBTSVpFX0NMQVNTX05BTUVTID0gbmV3IE1hcDxCdXR0b25TaXplLCBzdHJpbmc+KFtcbiAgW0J1dHRvblNpemUuTGFyZ2UsICdtb2R1bGUtQnV0dG9uLS1sYXJnZSddLFxuICBbQnV0dG9uU2l6ZS5NZWRpdW0sICdtb2R1bGUtQnV0dG9uLS1tZWRpdW0nXSxcbiAgW0J1dHRvblNpemUuU21hbGwsICdtb2R1bGUtQnV0dG9uLS1zbWFsbCddLFxuXSk7XG5cbmNvbnN0IFZBUklBTlRfQ0xBU1NfTkFNRVMgPSBuZXcgTWFwPEJ1dHRvblZhcmlhbnQsIHN0cmluZz4oW1xuICBbQnV0dG9uVmFyaWFudC5QcmltYXJ5LCAnbW9kdWxlLUJ1dHRvbi0tcHJpbWFyeSddLFxuICBbQnV0dG9uVmFyaWFudC5TZWNvbmRhcnksICdtb2R1bGUtQnV0dG9uLS1zZWNvbmRhcnknXSxcbiAgW1xuICAgIEJ1dHRvblZhcmlhbnQuU2Vjb25kYXJ5QWZmaXJtYXRpdmUsXG4gICAgJ21vZHVsZS1CdXR0b24tLXNlY29uZGFyeSBtb2R1bGUtQnV0dG9uLS1zZWNvbmRhcnktLWFmZmlybWF0aXZlJyxcbiAgXSxcbiAgW1xuICAgIEJ1dHRvblZhcmlhbnQuU2Vjb25kYXJ5RGVzdHJ1Y3RpdmUsXG4gICAgJ21vZHVsZS1CdXR0b24tLXNlY29uZGFyeSBtb2R1bGUtQnV0dG9uLS1zZWNvbmRhcnktLWRlc3RydWN0aXZlJyxcbiAgXSxcbiAgW0J1dHRvblZhcmlhbnQuRGVzdHJ1Y3RpdmUsICdtb2R1bGUtQnV0dG9uLS1kZXN0cnVjdGl2ZSddLFxuICBbQnV0dG9uVmFyaWFudC5DYWxsaW5nLCAnbW9kdWxlLUJ1dHRvbi0tY2FsbGluZyddLFxuICBbQnV0dG9uVmFyaWFudC5TeXN0ZW1NZXNzYWdlLCAnbW9kdWxlLUJ1dHRvbi0tc3lzdGVtLW1lc3NhZ2UnXSxcbiAgW0J1dHRvblZhcmlhbnQuRGV0YWlscywgJ21vZHVsZS1CdXR0b24tLWRldGFpbHMnXSxcbl0pO1xuXG5leHBvcnQgY29uc3QgQnV0dG9uID0gUmVhY3QuZm9yd2FyZFJlZjxIVE1MQnV0dG9uRWxlbWVudCwgUHJvcHNUeXBlPihcbiAgKHByb3BzLCByZWYpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIGRpc2FibGVkID0gZmFsc2UsXG4gICAgICBpY29uLFxuICAgICAgc3R5bGUsXG4gICAgICB0YWJJbmRleCxcbiAgICAgIHRoZW1lLFxuICAgICAgdmFyaWFudCA9IEJ1dHRvblZhcmlhbnQuUHJpbWFyeSxcbiAgICAgIHNpemUgPSB2YXJpYW50ID09PSBCdXR0b25WYXJpYW50LkRldGFpbHNcbiAgICAgICAgPyBCdXR0b25TaXplLlNtYWxsXG4gICAgICAgIDogQnV0dG9uU2l6ZS5NZWRpdW0sXG4gICAgfSA9IHByb3BzO1xuICAgIGNvbnN0IGFyaWFMYWJlbCA9IHByb3BzWydhcmlhLWxhYmVsJ107XG5cbiAgICBsZXQgb25DbGljazogdW5kZWZpbmVkIHwgTW91c2VFdmVudEhhbmRsZXI8SFRNTEJ1dHRvbkVsZW1lbnQ+O1xuICAgIGxldCB0eXBlOiAnYnV0dG9uJyB8ICdzdWJtaXQnO1xuICAgIGlmICgnb25DbGljaycgaW4gcHJvcHMpIHtcbiAgICAgICh7IG9uQ2xpY2sgfSA9IHByb3BzKTtcbiAgICAgIHR5cGUgPSAnYnV0dG9uJztcbiAgICB9IGVsc2Uge1xuICAgICAgb25DbGljayA9IHVuZGVmaW5lZDtcbiAgICAgICh7IHR5cGUgfSA9IHByb3BzKTtcbiAgICB9XG5cbiAgICBjb25zdCBzaXplQ2xhc3NOYW1lID0gU0laRV9DTEFTU19OQU1FUy5nZXQoc2l6ZSk7XG4gICAgYXNzZXJ0KHNpemVDbGFzc05hbWUsICc8QnV0dG9uPiBzaXplIG5vdCBmb3VuZCcpO1xuXG4gICAgY29uc3QgdmFyaWFudENsYXNzTmFtZSA9IFZBUklBTlRfQ0xBU1NfTkFNRVMuZ2V0KHZhcmlhbnQpO1xuICAgIGFzc2VydCh2YXJpYW50Q2xhc3NOYW1lLCAnPEJ1dHRvbj4gdmFyaWFudCBub3QgZm91bmQnKTtcblxuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSAoXG4gICAgICA8YnV0dG9uXG4gICAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbH1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICdtb2R1bGUtQnV0dG9uJyxcbiAgICAgICAgICBzaXplQ2xhc3NOYW1lLFxuICAgICAgICAgIHZhcmlhbnRDbGFzc05hbWUsXG4gICAgICAgICAgaWNvbiAmJiBgbW9kdWxlLUJ1dHRvbi0taWNvbi0tJHtpY29ufWAsXG4gICAgICAgICAgY2xhc3NOYW1lXG4gICAgICAgICl9XG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgICAvLyBUaGUgYHR5cGVgIHNob3VsZCBlaXRoZXIgYmUgXCJidXR0b25cIiBvciBcInN1Ym1pdFwiLCB3aGljaCBpcyBlZmZlY3RpdmVseSBzdGF0aWMuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9idXR0b24taGFzLXR5cGVcbiAgICAgICAgdHlwZT17dHlwZX1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9idXR0b24+XG4gICAgKTtcblxuICAgIGlmICh0aGVtZSkge1xuICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXt0aGVtZUNsYXNzTmFtZSh0aGVtZSl9PntidXR0b25FbGVtZW50fTwvZGl2PjtcbiAgICB9XG5cbiAgICByZXR1cm4gYnV0dG9uRWxlbWVudDtcbiAgfVxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUNsQix3QkFBdUI7QUFHdkIsb0JBQXVCO0FBQ3ZCLG1CQUErQjtBQUV4QixJQUFLLGFBQUwsa0JBQUssZ0JBQUw7QUFDTDtBQUNBO0FBQ0E7QUFIVTtBQUFBO0FBTUwsSUFBSyxnQkFBTCxrQkFBSyxtQkFBTDtBQUNMLDhCQUFVO0FBQ1Ysa0NBQWM7QUFDZCw4QkFBVTtBQUNWLDhCQUFVO0FBQ1YsZ0NBQVk7QUFDWiwyQ0FBdUI7QUFDdkIsMkNBQXVCO0FBQ3ZCLG9DQUFnQjtBQVJOO0FBQUE7QUFXTCxJQUFLLGlCQUFMLGtCQUFLLG9CQUFMO0FBQ0wsNkJBQVE7QUFDUiw2QkFBUTtBQUNSLDZCQUFRO0FBQ1IsOEJBQVM7QUFDVCw0QkFBTztBQUNQLCtCQUFVO0FBQ1YsNkJBQVE7QUFQRTtBQUFBO0FBMENaLE1BQU0sbUJBQW1CLG9CQUFJLElBQXdCO0FBQUEsRUFDbkQsQ0FBQyxlQUFrQixzQkFBc0I7QUFBQSxFQUN6QyxDQUFDLGdCQUFtQix1QkFBdUI7QUFBQSxFQUMzQyxDQUFDLGVBQWtCLHNCQUFzQjtBQUMzQyxDQUFDO0FBRUQsTUFBTSxzQkFBc0Isb0JBQUksSUFBMkI7QUFBQSxFQUN6RCxDQUFDLHlCQUF1Qix3QkFBd0I7QUFBQSxFQUNoRCxDQUFDLDZCQUF5QiwwQkFBMEI7QUFBQSxFQUNwRDtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLENBQUMsaUNBQTJCLDRCQUE0QjtBQUFBLEVBQ3hELENBQUMseUJBQXVCLHdCQUF3QjtBQUFBLEVBQ2hELENBQUMscUNBQTZCLCtCQUErQjtBQUFBLEVBQzdELENBQUMseUJBQXVCLHdCQUF3QjtBQUNsRCxDQUFDO0FBRU0sTUFBTSxTQUFTLHFCQUFNLFdBQzFCLENBQUMsT0FBTyxRQUFRO0FBQ2QsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsVUFBVTtBQUFBLElBQ1YsT0FBTyxZQUFZLDBCQUNmLGdCQUNBO0FBQUEsTUFDRjtBQUNKLFFBQU0sWUFBWSxNQUFNO0FBRXhCLE1BQUk7QUFDSixNQUFJO0FBQ0osTUFBSSxhQUFhLE9BQU87QUFDdEIsSUFBQyxHQUFFLFFBQVEsSUFBSTtBQUNmLFdBQU87QUFBQSxFQUNULE9BQU87QUFDTCxjQUFVO0FBQ1YsSUFBQyxHQUFFLEtBQUssSUFBSTtBQUFBLEVBQ2Q7QUFFQSxRQUFNLGdCQUFnQixpQkFBaUIsSUFBSSxJQUFJO0FBQy9DLDRCQUFPLGVBQWUseUJBQXlCO0FBRS9DLFFBQU0sbUJBQW1CLG9CQUFvQixJQUFJLE9BQU87QUFDeEQsNEJBQU8sa0JBQWtCLDRCQUE0QjtBQUVyRCxRQUFNLGdCQUNKLG1EQUFDO0FBQUEsSUFDQyxjQUFZO0FBQUEsSUFDWixXQUFXLCtCQUNULGlCQUNBLGVBQ0Esa0JBQ0EsUUFBUSx3QkFBd0IsUUFDaEMsU0FDRjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFHQTtBQUFBLEtBRUMsUUFDSDtBQUdGLE1BQUksT0FBTztBQUNULFdBQU8sbURBQUM7QUFBQSxNQUFJLFdBQVcsaUNBQWUsS0FBSztBQUFBLE9BQUksYUFBYztBQUFBLEVBQy9EO0FBRUEsU0FBTztBQUNULENBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
