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
var CompositionInput_stories_exports = {};
__export(CompositionInput_stories_exports, {
  Default: () => Default,
  Disabled: () => Disabled,
  Emojis: () => Emojis,
  Large: () => Large,
  Mentions: () => Mentions,
  MultilineText: () => MultilineText,
  StartingText: () => StartingText,
  default: () => CompositionInput_stories_default
});
module.exports = __toCommonJS(CompositionInput_stories_exports);
var React = __toESM(require("react"));
var import_quill_core = require("react-quill/dist/quill.core.css");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_CompositionInput = require("./CompositionInput");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_StorybookThemeContext = require("../../.storybook/StorybookThemeContext");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var CompositionInput_stories_default = {
  title: "Components/CompositionInput"
};
const useProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  disabled: (0, import_addon_knobs.boolean)("disabled", overrideProps.disabled || false),
  onSubmit: (0, import_addon_actions.action)("onSubmit"),
  onEditorStateChange: (0, import_addon_actions.action)("onEditorStateChange"),
  onTextTooLong: (0, import_addon_actions.action)("onTextTooLong"),
  draftText: overrideProps.draftText || void 0,
  draftBodyRanges: overrideProps.draftBodyRanges || [],
  clearQuotedMessage: (0, import_addon_actions.action)("clearQuotedMessage"),
  getPreferredBadge: () => void 0,
  getQuotedMessage: (0, import_addon_actions.action)("getQuotedMessage"),
  onPickEmoji: (0, import_addon_actions.action)("onPickEmoji"),
  large: (0, import_addon_knobs.boolean)("large", overrideProps.large || false),
  sortedGroupMembers: overrideProps.sortedGroupMembers || [],
  skinTone: (0, import_addon_knobs.select)("skinTone", {
    skinTone0: 0,
    skinTone1: 1,
    skinTone2: 2,
    skinTone3: 3,
    skinTone4: 4,
    skinTone5: 5
  }, overrideProps.skinTone || void 0),
  theme: React.useContext(import_StorybookThemeContext.StorybookThemeContext)
}), "useProps");
const Default = /* @__PURE__ */ __name(() => {
  const props = useProps();
  return /* @__PURE__ */ React.createElement(import_CompositionInput.CompositionInput, {
    ...props
  });
}, "Default");
const Large = /* @__PURE__ */ __name(() => {
  const props = useProps({
    large: true
  });
  return /* @__PURE__ */ React.createElement(import_CompositionInput.CompositionInput, {
    ...props
  });
}, "Large");
const Disabled = /* @__PURE__ */ __name(() => {
  const props = useProps({
    disabled: true
  });
  return /* @__PURE__ */ React.createElement(import_CompositionInput.CompositionInput, {
    ...props
  });
}, "Disabled");
const StartingText = /* @__PURE__ */ __name(() => {
  const props = useProps({
    draftText: "here's some starting text"
  });
  return /* @__PURE__ */ React.createElement(import_CompositionInput.CompositionInput, {
    ...props
  });
}, "StartingText");
const MultilineText = /* @__PURE__ */ __name(() => {
  const props = useProps({
    draftText: `here's some starting text
and more on another line
and yet another line
and yet another line
and yet another line
and yet another line
and yet another line
and yet another line
and we're done`
  });
  return /* @__PURE__ */ React.createElement(import_CompositionInput.CompositionInput, {
    ...props
  });
}, "MultilineText");
const Emojis = /* @__PURE__ */ __name(() => {
  const props = useProps({
    draftText: `\u2063\u{1F610}\u{1F610}\u{1F610}\u{1F610}\u{1F610}\u{1F610}\u{1F610}
\u{1F610}\u{1F610}\u{1F610}\u{1F610}\u{1F610}\u{1F610}\u{1F610}
\u{1F610}\u{1F610}\u{1F610}\u{1F602}\u2063\u{1F610}\u{1F610}\u{1F610}
\u{1F610}\u{1F610}\u{1F610}\u{1F610}\u{1F610}\u{1F610}\u{1F610}
\u{1F610}\u{1F610}\u{1F610}\u{1F610}\u{1F610}\u{1F610}\u{1F610}`
  });
  return /* @__PURE__ */ React.createElement(import_CompositionInput.CompositionInput, {
    ...props
  });
}, "Emojis");
const Mentions = /* @__PURE__ */ __name(() => {
  const props = useProps({
    sortedGroupMembers: [
      (0, import_getDefaultConversation.getDefaultConversation)({
        title: "Kate Beaton"
      }),
      (0, import_getDefaultConversation.getDefaultConversation)({
        title: "Parry Gripp"
      })
    ],
    draftText: "send _ a message",
    draftBodyRanges: [
      {
        start: 5,
        length: 1,
        mentionUuid: "0",
        replacementText: "Kate Beaton"
      }
    ]
  });
  return /* @__PURE__ */ React.createElement(import_CompositionInput.CompositionInput, {
    ...props
  });
}, "Mentions");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default,
  Disabled,
  Emojis,
  Large,
  Mentions,
  MultilineText,
  StartingText
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29tcG9zaXRpb25JbnB1dC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0ICdyZWFjdC1xdWlsbC9kaXN0L3F1aWxsLmNvcmUuY3NzJztcbmltcG9ydCB7IGJvb2xlYW4sIHNlbGVjdCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbiB9IGZyb20gJy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vQ29tcG9zaXRpb25JbnB1dCc7XG5pbXBvcnQgeyBDb21wb3NpdGlvbklucHV0IH0gZnJvbSAnLi9Db21wb3NpdGlvbklucHV0JztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHsgU3Rvcnlib29rVGhlbWVDb250ZXh0IH0gZnJvbSAnLi4vLi4vLnN0b3J5Ym9vay9TdG9yeWJvb2tUaGVtZUNvbnRleHQnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db21wb3NpdGlvbklucHV0Jyxcbn07XG5cbmNvbnN0IHVzZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHM+ID0ge30pOiBQcm9wcyA9PiAoe1xuICBpMThuLFxuICBkaXNhYmxlZDogYm9vbGVhbignZGlzYWJsZWQnLCBvdmVycmlkZVByb3BzLmRpc2FibGVkIHx8IGZhbHNlKSxcbiAgb25TdWJtaXQ6IGFjdGlvbignb25TdWJtaXQnKSxcbiAgb25FZGl0b3JTdGF0ZUNoYW5nZTogYWN0aW9uKCdvbkVkaXRvclN0YXRlQ2hhbmdlJyksXG4gIG9uVGV4dFRvb0xvbmc6IGFjdGlvbignb25UZXh0VG9vTG9uZycpLFxuICBkcmFmdFRleHQ6IG92ZXJyaWRlUHJvcHMuZHJhZnRUZXh0IHx8IHVuZGVmaW5lZCxcbiAgZHJhZnRCb2R5UmFuZ2VzOiBvdmVycmlkZVByb3BzLmRyYWZ0Qm9keVJhbmdlcyB8fCBbXSxcbiAgY2xlYXJRdW90ZWRNZXNzYWdlOiBhY3Rpb24oJ2NsZWFyUXVvdGVkTWVzc2FnZScpLFxuICBnZXRQcmVmZXJyZWRCYWRnZTogKCkgPT4gdW5kZWZpbmVkLFxuICBnZXRRdW90ZWRNZXNzYWdlOiBhY3Rpb24oJ2dldFF1b3RlZE1lc3NhZ2UnKSxcbiAgb25QaWNrRW1vamk6IGFjdGlvbignb25QaWNrRW1vamknKSxcbiAgbGFyZ2U6IGJvb2xlYW4oJ2xhcmdlJywgb3ZlcnJpZGVQcm9wcy5sYXJnZSB8fCBmYWxzZSksXG4gIHNvcnRlZEdyb3VwTWVtYmVyczogb3ZlcnJpZGVQcm9wcy5zb3J0ZWRHcm91cE1lbWJlcnMgfHwgW10sXG4gIHNraW5Ub25lOiBzZWxlY3QoXG4gICAgJ3NraW5Ub25lJyxcbiAgICB7XG4gICAgICBza2luVG9uZTA6IDAsXG4gICAgICBza2luVG9uZTE6IDEsXG4gICAgICBza2luVG9uZTI6IDIsXG4gICAgICBza2luVG9uZTM6IDMsXG4gICAgICBza2luVG9uZTQ6IDQsXG4gICAgICBza2luVG9uZTU6IDUsXG4gICAgfSxcbiAgICBvdmVycmlkZVByb3BzLnNraW5Ub25lIHx8IHVuZGVmaW5lZFxuICApLFxuICB0aGVtZTogUmVhY3QudXNlQ29udGV4dChTdG9yeWJvb2tUaGVtZUNvbnRleHQpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSB1c2VQcm9wcygpO1xuXG4gIHJldHVybiA8Q29tcG9zaXRpb25JbnB1dCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IExhcmdlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSB1c2VQcm9wcyh7XG4gICAgbGFyZ2U6IHRydWUsXG4gIH0pO1xuXG4gIHJldHVybiA8Q29tcG9zaXRpb25JbnB1dCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IERpc2FibGVkID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSB1c2VQcm9wcyh7XG4gICAgZGlzYWJsZWQ6IHRydWUsXG4gIH0pO1xuXG4gIHJldHVybiA8Q29tcG9zaXRpb25JbnB1dCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IFN0YXJ0aW5nVGV4dCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gdXNlUHJvcHMoe1xuICAgIGRyYWZ0VGV4dDogXCJoZXJlJ3Mgc29tZSBzdGFydGluZyB0ZXh0XCIsXG4gIH0pO1xuXG4gIHJldHVybiA8Q29tcG9zaXRpb25JbnB1dCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE11bHRpbGluZVRleHQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IHVzZVByb3BzKHtcbiAgICBkcmFmdFRleHQ6IGBoZXJlJ3Mgc29tZSBzdGFydGluZyB0ZXh0XG5hbmQgbW9yZSBvbiBhbm90aGVyIGxpbmVcbmFuZCB5ZXQgYW5vdGhlciBsaW5lXG5hbmQgeWV0IGFub3RoZXIgbGluZVxuYW5kIHlldCBhbm90aGVyIGxpbmVcbmFuZCB5ZXQgYW5vdGhlciBsaW5lXG5hbmQgeWV0IGFub3RoZXIgbGluZVxuYW5kIHlldCBhbm90aGVyIGxpbmVcbmFuZCB3ZSdyZSBkb25lYCxcbiAgfSk7XG5cbiAgcmV0dXJuIDxDb21wb3NpdGlvbklucHV0IHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgRW1vamlzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSB1c2VQcm9wcyh7XG4gICAgZHJhZnRUZXh0OiBgXHUyMDYzXHVEODNEXHVERTEwXHVEODNEXHVERTEwXHVEODNEXHVERTEwXHVEODNEXHVERTEwXHVEODNEXHVERTEwXHVEODNEXHVERTEwXHVEODNEXHVERTEwXG5cdUQ4M0RcdURFMTBcdUQ4M0RcdURFMTBcdUQ4M0RcdURFMTBcdUQ4M0RcdURFMTBcdUQ4M0RcdURFMTBcdUQ4M0RcdURFMTBcdUQ4M0RcdURFMTBcblx1RDgzRFx1REUxMFx1RDgzRFx1REUxMFx1RDgzRFx1REUxMFx1RDgzRFx1REUwMlx1MjA2M1x1RDgzRFx1REUxMFx1RDgzRFx1REUxMFx1RDgzRFx1REUxMFxuXHVEODNEXHVERTEwXHVEODNEXHVERTEwXHVEODNEXHVERTEwXHVEODNEXHVERTEwXHVEODNEXHVERTEwXHVEODNEXHVERTEwXHVEODNEXHVERTEwXG5cdUQ4M0RcdURFMTBcdUQ4M0RcdURFMTBcdUQ4M0RcdURFMTBcdUQ4M0RcdURFMTBcdUQ4M0RcdURFMTBcdUQ4M0RcdURFMTBcdUQ4M0RcdURFMTBgLFxuICB9KTtcblxuICByZXR1cm4gPENvbXBvc2l0aW9uSW5wdXQgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBNZW50aW9ucyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gdXNlUHJvcHMoe1xuICAgIHNvcnRlZEdyb3VwTWVtYmVyczogW1xuICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgIHRpdGxlOiAnS2F0ZSBCZWF0b24nLFxuICAgICAgfSksXG4gICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgdGl0bGU6ICdQYXJyeSBHcmlwcCcsXG4gICAgICB9KSxcbiAgICBdLFxuICAgIGRyYWZ0VGV4dDogJ3NlbmQgXyBhIG1lc3NhZ2UnLFxuICAgIGRyYWZ0Qm9keVJhbmdlczogW1xuICAgICAge1xuICAgICAgICBzdGFydDogNSxcbiAgICAgICAgbGVuZ3RoOiAxLFxuICAgICAgICBtZW50aW9uVXVpZDogJzAnLFxuICAgICAgICByZXBsYWNlbWVudFRleHQ6ICdLYXRlIEJlYXRvbicsXG4gICAgICB9LFxuICAgIF0sXG4gIH0pO1xuXG4gIHJldHVybiA8Q29tcG9zaXRpb25JbnB1dCB7Li4ucHJvcHN9IC8+O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLHdCQUFPO0FBQ1AseUJBQWdDO0FBQ2hDLDJCQUF1QjtBQUV2QixvQ0FBdUM7QUFFdkMsOEJBQWlDO0FBQ2pDLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFDdkIsbUNBQXNDO0FBRXRDLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8sbUNBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0sV0FBVyx3QkFBQyxnQkFBZ0MsQ0FBQyxNQUFjO0FBQUEsRUFDL0Q7QUFBQSxFQUNBLFVBQVUsZ0NBQVEsWUFBWSxjQUFjLFlBQVksS0FBSztBQUFBLEVBQzdELFVBQVUsaUNBQU8sVUFBVTtBQUFBLEVBQzNCLHFCQUFxQixpQ0FBTyxxQkFBcUI7QUFBQSxFQUNqRCxlQUFlLGlDQUFPLGVBQWU7QUFBQSxFQUNyQyxXQUFXLGNBQWMsYUFBYTtBQUFBLEVBQ3RDLGlCQUFpQixjQUFjLG1CQUFtQixDQUFDO0FBQUEsRUFDbkQsb0JBQW9CLGlDQUFPLG9CQUFvQjtBQUFBLEVBQy9DLG1CQUFtQixNQUFNO0FBQUEsRUFDekIsa0JBQWtCLGlDQUFPLGtCQUFrQjtBQUFBLEVBQzNDLGFBQWEsaUNBQU8sYUFBYTtBQUFBLEVBQ2pDLE9BQU8sZ0NBQVEsU0FBUyxjQUFjLFNBQVMsS0FBSztBQUFBLEVBQ3BELG9CQUFvQixjQUFjLHNCQUFzQixDQUFDO0FBQUEsRUFDekQsVUFBVSwrQkFDUixZQUNBO0FBQUEsSUFDRSxXQUFXO0FBQUEsSUFDWCxXQUFXO0FBQUEsSUFDWCxXQUFXO0FBQUEsSUFDWCxXQUFXO0FBQUEsSUFDWCxXQUFXO0FBQUEsSUFDWCxXQUFXO0FBQUEsRUFDYixHQUNBLGNBQWMsWUFBWSxNQUM1QjtBQUFBLEVBQ0EsT0FBTyxNQUFNLFdBQVcsa0RBQXFCO0FBQy9DLElBM0JpQjtBQTZCVixNQUFNLFVBQVUsNkJBQW1CO0FBQ3hDLFFBQU0sUUFBUSxTQUFTO0FBRXZCLFNBQU8sb0NBQUM7QUFBQSxPQUFxQjtBQUFBLEdBQU87QUFDdEMsR0FKdUI7QUFNaEIsTUFBTSxRQUFRLDZCQUFtQjtBQUN0QyxRQUFNLFFBQVEsU0FBUztBQUFBLElBQ3JCLE9BQU87QUFBQSxFQUNULENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBcUI7QUFBQSxHQUFPO0FBQ3RDLEdBTnFCO0FBUWQsTUFBTSxXQUFXLDZCQUFtQjtBQUN6QyxRQUFNLFFBQVEsU0FBUztBQUFBLElBQ3JCLFVBQVU7QUFBQSxFQUNaLENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBcUI7QUFBQSxHQUFPO0FBQ3RDLEdBTndCO0FBUWpCLE1BQU0sZUFBZSw2QkFBbUI7QUFDN0MsUUFBTSxRQUFRLFNBQVM7QUFBQSxJQUNyQixXQUFXO0FBQUEsRUFDYixDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQXFCO0FBQUEsR0FBTztBQUN0QyxHQU40QjtBQVFyQixNQUFNLGdCQUFnQiw2QkFBbUI7QUFDOUMsUUFBTSxRQUFRLFNBQVM7QUFBQSxJQUNyQixXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBU2IsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFxQjtBQUFBLEdBQU87QUFDdEMsR0FkNkI7QUFnQnRCLE1BQU0sU0FBUyw2QkFBbUI7QUFDdkMsUUFBTSxRQUFRLFNBQVM7QUFBQSxJQUNyQixXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtiLENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBcUI7QUFBQSxHQUFPO0FBQ3RDLEdBVnNCO0FBWWYsTUFBTSxXQUFXLDZCQUFtQjtBQUN6QyxRQUFNLFFBQVEsU0FBUztBQUFBLElBQ3JCLG9CQUFvQjtBQUFBLE1BQ2xCLDBEQUF1QjtBQUFBLFFBQ3JCLE9BQU87QUFBQSxNQUNULENBQUM7QUFBQSxNQUNELDBEQUF1QjtBQUFBLFFBQ3JCLE9BQU87QUFBQSxNQUNULENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxpQkFBaUI7QUFBQSxNQUNmO0FBQUEsUUFDRSxPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixhQUFhO0FBQUEsUUFDYixpQkFBaUI7QUFBQSxNQUNuQjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBcUI7QUFBQSxHQUFPO0FBQ3RDLEdBdEJ3QjsiLAogICJuYW1lcyI6IFtdCn0K
