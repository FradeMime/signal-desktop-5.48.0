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
var Intl_stories_exports = {};
__export(Intl_stories_exports, {
  CustomRender: () => CustomRender,
  MultipleStringReplacement: () => MultipleStringReplacement,
  MultipleTagReplacement: () => MultipleTagReplacement,
  NoReplacements: () => NoReplacements,
  SingleStringReplacement: () => SingleStringReplacement,
  SingleTagReplacement: () => SingleTagReplacement,
  default: () => Intl_stories_default
});
module.exports = __toCommonJS(Intl_stories_exports);
var React = __toESM(require("react"));
var import_Intl = require("./Intl");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var Intl_stories_default = {
  title: "Components/Intl",
  component: import_Intl.Intl
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  id: overrideProps.id || "",
  components: overrideProps.components,
  renderText: overrideProps.renderText
}), "createProps");
const Template = /* @__PURE__ */ __name((args) => /* @__PURE__ */ React.createElement(import_Intl.Intl, {
  ...args
}), "Template");
const NoReplacements = Template.bind({});
NoReplacements.args = createProps({
  id: "deleteAndRestart"
});
const SingleStringReplacement = Template.bind({});
SingleStringReplacement.args = createProps({
  id: "leftTheGroup",
  components: ["Theodora"]
});
const SingleTagReplacement = Template.bind({});
SingleTagReplacement.args = createProps({
  id: "leftTheGroup",
  components: [
    /* @__PURE__ */ React.createElement("button", {
      type: "button",
      key: "a-button"
    }, "Theodora")
  ]
});
const MultipleStringReplacement = Template.bind({});
MultipleStringReplacement.args = createProps({
  id: "changedRightAfterVerify",
  components: {
    name1: "Fred",
    name2: "The Fredster"
  }
});
const MultipleTagReplacement = Template.bind({});
MultipleTagReplacement.args = createProps({
  id: "changedRightAfterVerify",
  components: {
    name1: /* @__PURE__ */ React.createElement("b", null, "Fred"),
    name2: /* @__PURE__ */ React.createElement("b", null, "The Fredster")
  }
});
const CustomRender = Template.bind({});
CustomRender.args = createProps({
  id: "deleteAndRestart",
  renderText: ({ text: theText, key }) => /* @__PURE__ */ React.createElement("div", {
    style: { backgroundColor: "purple", color: "orange" },
    key
  }, theText)
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomRender,
  MultipleStringReplacement,
  MultipleTagReplacement,
  NoReplacements,
  SingleStringReplacement,
  SingleTagReplacement
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW50bC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IE1ldGEsIFN0b3J5IH0gZnJvbSAnQHN0b3J5Ym9vay9yZWFjdCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL0ludGwnO1xuaW1wb3J0IHsgSW50bCB9IGZyb20gJy4vSW50bCc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvSW50bCcsXG4gIGNvbXBvbmVudDogSW50bCxcbn0gYXMgTWV0YTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wcz4gPSB7fSk6IFByb3BzID0+ICh7XG4gIGkxOG4sXG4gIGlkOiBvdmVycmlkZVByb3BzLmlkIHx8ICcnLFxuICBjb21wb25lbnRzOiBvdmVycmlkZVByb3BzLmNvbXBvbmVudHMsXG4gIHJlbmRlclRleHQ6IG92ZXJyaWRlUHJvcHMucmVuZGVyVGV4dCxcbn0pO1xuXG5jb25zdCBUZW1wbGF0ZTogU3Rvcnk8UHJvcHM+ID0gYXJncyA9PiA8SW50bCB7Li4uYXJnc30gLz47XG5cbmV4cG9ydCBjb25zdCBOb1JlcGxhY2VtZW50cyA9IFRlbXBsYXRlLmJpbmQoe30pO1xuTm9SZXBsYWNlbWVudHMuYXJncyA9IGNyZWF0ZVByb3BzKHtcbiAgaWQ6ICdkZWxldGVBbmRSZXN0YXJ0Jyxcbn0pO1xuXG5leHBvcnQgY29uc3QgU2luZ2xlU3RyaW5nUmVwbGFjZW1lbnQgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcblNpbmdsZVN0cmluZ1JlcGxhY2VtZW50LmFyZ3MgPSBjcmVhdGVQcm9wcyh7XG4gIGlkOiAnbGVmdFRoZUdyb3VwJyxcbiAgY29tcG9uZW50czogWydUaGVvZG9yYSddLFxufSk7XG5cbmV4cG9ydCBjb25zdCBTaW5nbGVUYWdSZXBsYWNlbWVudCA9IFRlbXBsYXRlLmJpbmQoe30pO1xuU2luZ2xlVGFnUmVwbGFjZW1lbnQuYXJncyA9IGNyZWF0ZVByb3BzKHtcbiAgaWQ6ICdsZWZ0VGhlR3JvdXAnLFxuICBjb21wb25lbnRzOiBbXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIga2V5PVwiYS1idXR0b25cIj5cbiAgICAgIFRoZW9kb3JhXG4gICAgPC9idXR0b24+LFxuICBdLFxufSk7XG5cbmV4cG9ydCBjb25zdCBNdWx0aXBsZVN0cmluZ1JlcGxhY2VtZW50ID0gVGVtcGxhdGUuYmluZCh7fSk7XG5NdWx0aXBsZVN0cmluZ1JlcGxhY2VtZW50LmFyZ3MgPSBjcmVhdGVQcm9wcyh7XG4gIGlkOiAnY2hhbmdlZFJpZ2h0QWZ0ZXJWZXJpZnknLFxuICBjb21wb25lbnRzOiB7XG4gICAgbmFtZTE6ICdGcmVkJyxcbiAgICBuYW1lMjogJ1RoZSBGcmVkc3RlcicsXG4gIH0sXG59KTtcblxuZXhwb3J0IGNvbnN0IE11bHRpcGxlVGFnUmVwbGFjZW1lbnQgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbk11bHRpcGxlVGFnUmVwbGFjZW1lbnQuYXJncyA9IGNyZWF0ZVByb3BzKHtcbiAgaWQ6ICdjaGFuZ2VkUmlnaHRBZnRlclZlcmlmeScsXG4gIGNvbXBvbmVudHM6IHtcbiAgICBuYW1lMTogPGI+RnJlZDwvYj4sXG4gICAgbmFtZTI6IDxiPlRoZSBGcmVkc3RlcjwvYj4sXG4gIH0sXG59KTtcblxuZXhwb3J0IGNvbnN0IEN1c3RvbVJlbmRlciA9IFRlbXBsYXRlLmJpbmQoe30pO1xuQ3VzdG9tUmVuZGVyLmFyZ3MgPSBjcmVhdGVQcm9wcyh7XG4gIGlkOiAnZGVsZXRlQW5kUmVzdGFydCcsXG4gIHJlbmRlclRleHQ6ICh7IHRleHQ6IHRoZVRleHQsIGtleSB9KSA9PiAoXG4gICAgPGRpdiBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6ICdwdXJwbGUnLCBjb2xvcjogJ29yYW5nZScgfX0ga2V5PXtrZXl9PlxuICAgICAge3RoZVRleHR9XG4gICAgPC9kaXY+XG4gICksXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxZQUF1QjtBQUd2QixrQkFBcUI7QUFDckIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLHVCQUFRO0FBQUEsRUFDYixPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQ2I7QUFFQSxNQUFNLGNBQWMsd0JBQUMsZ0JBQWdDLENBQUMsTUFBYztBQUFBLEVBQ2xFO0FBQUEsRUFDQSxJQUFJLGNBQWMsTUFBTTtBQUFBLEVBQ3hCLFlBQVksY0FBYztBQUFBLEVBQzFCLFlBQVksY0FBYztBQUM1QixJQUxvQjtBQU9wQixNQUFNLFdBQXlCLGlDQUFRLG9DQUFDO0FBQUEsS0FBUztBQUFBLENBQU0sR0FBeEI7QUFFeEIsTUFBTSxpQkFBaUIsU0FBUyxLQUFLLENBQUMsQ0FBQztBQUM5QyxlQUFlLE9BQU8sWUFBWTtBQUFBLEVBQ2hDLElBQUk7QUFDTixDQUFDO0FBRU0sTUFBTSwwQkFBMEIsU0FBUyxLQUFLLENBQUMsQ0FBQztBQUN2RCx3QkFBd0IsT0FBTyxZQUFZO0FBQUEsRUFDekMsSUFBSTtBQUFBLEVBQ0osWUFBWSxDQUFDLFVBQVU7QUFDekIsQ0FBQztBQUVNLE1BQU0sdUJBQXVCLFNBQVMsS0FBSyxDQUFDLENBQUM7QUFDcEQscUJBQXFCLE9BQU8sWUFBWTtBQUFBLEVBQ3RDLElBQUk7QUFBQSxFQUNKLFlBQVk7QUFBQSxJQUNWLG9DQUFDO0FBQUEsTUFBTyxNQUFLO0FBQUEsTUFBUyxLQUFJO0FBQUEsT0FBVyxVQUVyQztBQUFBLEVBQ0Y7QUFDRixDQUFDO0FBRU0sTUFBTSw0QkFBNEIsU0FBUyxLQUFLLENBQUMsQ0FBQztBQUN6RCwwQkFBMEIsT0FBTyxZQUFZO0FBQUEsRUFDM0MsSUFBSTtBQUFBLEVBQ0osWUFBWTtBQUFBLElBQ1YsT0FBTztBQUFBLElBQ1AsT0FBTztBQUFBLEVBQ1Q7QUFDRixDQUFDO0FBRU0sTUFBTSx5QkFBeUIsU0FBUyxLQUFLLENBQUMsQ0FBQztBQUN0RCx1QkFBdUIsT0FBTyxZQUFZO0FBQUEsRUFDeEMsSUFBSTtBQUFBLEVBQ0osWUFBWTtBQUFBLElBQ1YsT0FBTyxvQ0FBQyxXQUFFLE1BQUk7QUFBQSxJQUNkLE9BQU8sb0NBQUMsV0FBRSxjQUFZO0FBQUEsRUFDeEI7QUFDRixDQUFDO0FBRU0sTUFBTSxlQUFlLFNBQVMsS0FBSyxDQUFDLENBQUM7QUFDNUMsYUFBYSxPQUFPLFlBQVk7QUFBQSxFQUM5QixJQUFJO0FBQUEsRUFDSixZQUFZLENBQUMsRUFBRSxNQUFNLFNBQVMsVUFDNUIsb0NBQUM7QUFBQSxJQUFJLE9BQU8sRUFBRSxpQkFBaUIsVUFBVSxPQUFPLFNBQVM7QUFBQSxJQUFHO0FBQUEsS0FDekQsT0FDSDtBQUVKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
