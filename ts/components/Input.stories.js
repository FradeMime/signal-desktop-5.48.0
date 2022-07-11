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
var Input_stories_exports = {};
__export(Input_stories_exports, {
  CharacterCount: () => CharacterCount,
  CharacterCountCustomizableShow: () => CharacterCountCustomizableShow,
  Disabled: () => Disabled,
  Expandable: () => Expandable,
  ExpandableWCount: () => ExpandableWCount,
  HasClearButton: () => HasClearButton,
  Simple: () => Simple,
  SpellcheckDisabled: () => SpellcheckDisabled,
  default: () => Input_stories_default
});
module.exports = __toCommonJS(Input_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_Input = require("./Input");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var Input_stories_default = {
  title: "Components/Input"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  disabled: Boolean(overrideProps.disabled),
  disableSpellcheck: overrideProps.disableSpellcheck,
  expandable: Boolean(overrideProps.expandable),
  hasClearButton: Boolean(overrideProps.hasClearButton),
  i18n,
  icon: overrideProps.icon,
  maxLengthCount: overrideProps.maxLengthCount,
  onChange: (0, import_addon_actions.action)("onChange"),
  placeholder: (0, import_addon_knobs.text)("placeholder", overrideProps.placeholder || "Enter some text here"),
  value: (0, import_addon_knobs.text)("value", overrideProps.value || ""),
  whenToShowRemainingCount: overrideProps.whenToShowRemainingCount
}), "createProps");
function Controller(props) {
  const { value: initialValue } = props;
  const [value, setValue] = (0, import_react.useState)(initialValue);
  return /* @__PURE__ */ import_react.default.createElement(import_Input.Input, {
    ...props,
    onChange: setValue,
    value
  });
}
const Simple = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Controller, {
  ...createProps()
}), "Simple");
const HasClearButton = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Controller, {
  ...createProps({
    hasClearButton: true
  })
}), "HasClearButton");
HasClearButton.story = {
  name: "hasClearButton"
};
const CharacterCount = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Controller, {
  ...createProps({
    maxLengthCount: 10
  })
}), "CharacterCount");
CharacterCount.story = {
  name: "character count"
};
const CharacterCountCustomizableShow = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Controller, {
  ...createProps({
    maxLengthCount: 64,
    whenToShowRemainingCount: 32
  })
}), "CharacterCountCustomizableShow");
CharacterCountCustomizableShow.story = {
  name: "character count (customizable show)"
};
const Expandable = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Controller, {
  ...createProps({
    expandable: true
  })
}), "Expandable");
Expandable.story = {
  name: "expandable"
};
const ExpandableWCount = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Controller, {
  ...createProps({
    expandable: true,
    hasClearButton: true,
    maxLengthCount: 140,
    whenToShowRemainingCount: 0
  })
}), "ExpandableWCount");
ExpandableWCount.story = {
  name: "expandable w/count"
};
const Disabled = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Controller, {
  ...createProps({
    disabled: true
  })
}), "Disabled");
Disabled.story = {
  name: "disabled"
};
const SpellcheckDisabled = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Controller, {
  ...createProps({
    disableSpellcheck: true
  })
}), "SpellcheckDisabled");
SpellcheckDisabled.story = {
  name: "spellcheck disabled"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CharacterCount,
  CharacterCountCustomizableShow,
  Disabled,
  Expandable,
  ExpandableWCount,
  HasClearButton,
  Simple,
  SpellcheckDisabled
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW5wdXQuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHRleHQgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi9JbnB1dCc7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gJy4vSW5wdXQnO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0lucHV0Jyxcbn07XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHNUeXBlPiA9IHt9KTogUHJvcHNUeXBlID0+ICh7XG4gIGRpc2FibGVkOiBCb29sZWFuKG92ZXJyaWRlUHJvcHMuZGlzYWJsZWQpLFxuICBkaXNhYmxlU3BlbGxjaGVjazogb3ZlcnJpZGVQcm9wcy5kaXNhYmxlU3BlbGxjaGVjayxcbiAgZXhwYW5kYWJsZTogQm9vbGVhbihvdmVycmlkZVByb3BzLmV4cGFuZGFibGUpLFxuICBoYXNDbGVhckJ1dHRvbjogQm9vbGVhbihvdmVycmlkZVByb3BzLmhhc0NsZWFyQnV0dG9uKSxcbiAgaTE4bixcbiAgaWNvbjogb3ZlcnJpZGVQcm9wcy5pY29uLFxuICBtYXhMZW5ndGhDb3VudDogb3ZlcnJpZGVQcm9wcy5tYXhMZW5ndGhDb3VudCxcbiAgb25DaGFuZ2U6IGFjdGlvbignb25DaGFuZ2UnKSxcbiAgcGxhY2Vob2xkZXI6IHRleHQoXG4gICAgJ3BsYWNlaG9sZGVyJyxcbiAgICBvdmVycmlkZVByb3BzLnBsYWNlaG9sZGVyIHx8ICdFbnRlciBzb21lIHRleHQgaGVyZSdcbiAgKSxcbiAgdmFsdWU6IHRleHQoJ3ZhbHVlJywgb3ZlcnJpZGVQcm9wcy52YWx1ZSB8fCAnJyksXG4gIHdoZW5Ub1Nob3dSZW1haW5pbmdDb3VudDogb3ZlcnJpZGVQcm9wcy53aGVuVG9TaG93UmVtYWluaW5nQ291bnQsXG59KTtcblxuZnVuY3Rpb24gQ29udHJvbGxlcihwcm9wczogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQge1xuICBjb25zdCB7IHZhbHVlOiBpbml0aWFsVmFsdWUgfSA9IHByb3BzO1xuICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IHVzZVN0YXRlKGluaXRpYWxWYWx1ZSk7XG5cbiAgcmV0dXJuIDxJbnB1dCB7Li4ucHJvcHN9IG9uQ2hhbmdlPXtzZXRWYWx1ZX0gdmFsdWU9e3ZhbHVlfSAvPjtcbn1cblxuZXhwb3J0IGNvbnN0IFNpbXBsZSA9ICgpOiBKU1guRWxlbWVudCA9PiA8Q29udHJvbGxlciB7Li4uY3JlYXRlUHJvcHMoKX0gLz47XG5cbmV4cG9ydCBjb25zdCBIYXNDbGVhckJ1dHRvbiA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDb250cm9sbGVyXG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIGhhc0NsZWFyQnV0dG9uOiB0cnVlLFxuICAgIH0pfVxuICAvPlxuKTtcblxuSGFzQ2xlYXJCdXR0b24uc3RvcnkgPSB7XG4gIG5hbWU6ICdoYXNDbGVhckJ1dHRvbicsXG59O1xuXG5leHBvcnQgY29uc3QgQ2hhcmFjdGVyQ291bnQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q29udHJvbGxlclxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBtYXhMZW5ndGhDb3VudDogMTAsXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5DaGFyYWN0ZXJDb3VudC5zdG9yeSA9IHtcbiAgbmFtZTogJ2NoYXJhY3RlciBjb3VudCcsXG59O1xuXG5leHBvcnQgY29uc3QgQ2hhcmFjdGVyQ291bnRDdXN0b21pemFibGVTaG93ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENvbnRyb2xsZXJcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgbWF4TGVuZ3RoQ291bnQ6IDY0LFxuICAgICAgd2hlblRvU2hvd1JlbWFpbmluZ0NvdW50OiAzMixcbiAgICB9KX1cbiAgLz5cbik7XG5cbkNoYXJhY3RlckNvdW50Q3VzdG9taXphYmxlU2hvdy5zdG9yeSA9IHtcbiAgbmFtZTogJ2NoYXJhY3RlciBjb3VudCAoY3VzdG9taXphYmxlIHNob3cpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBFeHBhbmRhYmxlID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENvbnRyb2xsZXJcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgZXhwYW5kYWJsZTogdHJ1ZSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkV4cGFuZGFibGUuc3RvcnkgPSB7XG4gIG5hbWU6ICdleHBhbmRhYmxlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBFeHBhbmRhYmxlV0NvdW50ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENvbnRyb2xsZXJcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgZXhwYW5kYWJsZTogdHJ1ZSxcbiAgICAgIGhhc0NsZWFyQnV0dG9uOiB0cnVlLFxuICAgICAgbWF4TGVuZ3RoQ291bnQ6IDE0MCxcbiAgICAgIHdoZW5Ub1Nob3dSZW1haW5pbmdDb3VudDogMCxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkV4cGFuZGFibGVXQ291bnQuc3RvcnkgPSB7XG4gIG5hbWU6ICdleHBhbmRhYmxlIHcvY291bnQnLFxufTtcblxuZXhwb3J0IGNvbnN0IERpc2FibGVkID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENvbnRyb2xsZXJcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5EaXNhYmxlZC5zdG9yeSA9IHtcbiAgbmFtZTogJ2Rpc2FibGVkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBTcGVsbGNoZWNrRGlzYWJsZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q29udHJvbGxlclxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBkaXNhYmxlU3BlbGxjaGVjazogdHJ1ZSxcbiAgICB9KX1cbiAgLz5cbik7XG5cblNwZWxsY2hlY2tEaXNhYmxlZC5zdG9yeSA9IHtcbiAgbmFtZTogJ3NwZWxsY2hlY2sgZGlzYWJsZWQnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWdDO0FBRWhDLHlCQUFxQjtBQUNyQiwyQkFBdUI7QUFHdkIsbUJBQXNCO0FBQ3RCLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFFdkIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTyx3QkFBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxjQUFjLHdCQUFDLGdCQUFvQyxDQUFDLE1BQWtCO0FBQUEsRUFDMUUsVUFBVSxRQUFRLGNBQWMsUUFBUTtBQUFBLEVBQ3hDLG1CQUFtQixjQUFjO0FBQUEsRUFDakMsWUFBWSxRQUFRLGNBQWMsVUFBVTtBQUFBLEVBQzVDLGdCQUFnQixRQUFRLGNBQWMsY0FBYztBQUFBLEVBQ3BEO0FBQUEsRUFDQSxNQUFNLGNBQWM7QUFBQSxFQUNwQixnQkFBZ0IsY0FBYztBQUFBLEVBQzlCLFVBQVUsaUNBQU8sVUFBVTtBQUFBLEVBQzNCLGFBQWEsNkJBQ1gsZUFDQSxjQUFjLGVBQWUsc0JBQy9CO0FBQUEsRUFDQSxPQUFPLDZCQUFLLFNBQVMsY0FBYyxTQUFTLEVBQUU7QUFBQSxFQUM5QywwQkFBMEIsY0FBYztBQUMxQyxJQWZvQjtBQWlCcEIsb0JBQW9CLE9BQStCO0FBQ2pELFFBQU0sRUFBRSxPQUFPLGlCQUFpQjtBQUNoQyxRQUFNLENBQUMsT0FBTyxZQUFZLDJCQUFTLFlBQVk7QUFFL0MsU0FBTyxtREFBQztBQUFBLE9BQVU7QUFBQSxJQUFPLFVBQVU7QUFBQSxJQUFVO0FBQUEsR0FBYztBQUM3RDtBQUxTLEFBT0YsTUFBTSxTQUFTLDZCQUFtQixtREFBQztBQUFBLEtBQWUsWUFBWTtBQUFBLENBQUcsR0FBbEQ7QUFFZixNQUFNLGlCQUFpQiw2QkFDNUIsbURBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLEVBQ2xCLENBQUM7QUFBQSxDQUNILEdBTDRCO0FBUTlCLGVBQWUsUUFBUTtBQUFBLEVBQ3JCLE1BQU07QUFDUjtBQUVPLE1BQU0saUJBQWlCLDZCQUM1QixtREFBQztBQUFBLEtBQ0ssWUFBWTtBQUFBLElBQ2QsZ0JBQWdCO0FBQUEsRUFDbEIsQ0FBQztBQUFBLENBQ0gsR0FMNEI7QUFROUIsZUFBZSxRQUFRO0FBQUEsRUFDckIsTUFBTTtBQUNSO0FBRU8sTUFBTSxpQ0FBaUMsNkJBQzVDLG1EQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxnQkFBZ0I7QUFBQSxJQUNoQiwwQkFBMEI7QUFBQSxFQUM1QixDQUFDO0FBQUEsQ0FDSCxHQU40QztBQVM5QywrQkFBK0IsUUFBUTtBQUFBLEVBQ3JDLE1BQU07QUFDUjtBQUVPLE1BQU0sYUFBYSw2QkFDeEIsbURBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLFlBQVk7QUFBQSxFQUNkLENBQUM7QUFBQSxDQUNILEdBTHdCO0FBUTFCLFdBQVcsUUFBUTtBQUFBLEVBQ2pCLE1BQU07QUFDUjtBQUVPLE1BQU0sbUJBQW1CLDZCQUM5QixtREFBQztBQUFBLEtBQ0ssWUFBWTtBQUFBLElBQ2QsWUFBWTtBQUFBLElBQ1osZ0JBQWdCO0FBQUEsSUFDaEIsZ0JBQWdCO0FBQUEsSUFDaEIsMEJBQTBCO0FBQUEsRUFDNUIsQ0FBQztBQUFBLENBQ0gsR0FSOEI7QUFXaEMsaUJBQWlCLFFBQVE7QUFBQSxFQUN2QixNQUFNO0FBQ1I7QUFFTyxNQUFNLFdBQVcsNkJBQ3RCLG1EQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxVQUFVO0FBQUEsRUFDWixDQUFDO0FBQUEsQ0FDSCxHQUxzQjtBQVF4QixTQUFTLFFBQVE7QUFBQSxFQUNmLE1BQU07QUFDUjtBQUVPLE1BQU0scUJBQXFCLDZCQUNoQyxtREFBQztBQUFBLEtBQ0ssWUFBWTtBQUFBLElBQ2QsbUJBQW1CO0FBQUEsRUFDckIsQ0FBQztBQUFBLENBQ0gsR0FMZ0M7QUFRbEMsbUJBQW1CLFFBQVE7QUFBQSxFQUN6QixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
