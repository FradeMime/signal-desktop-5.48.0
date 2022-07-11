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
var ErrorModal_stories_exports = {};
__export(ErrorModal_stories_exports, {
  CustomStrings: () => CustomStrings,
  Normal: () => Normal,
  default: () => ErrorModal_stories_default
});
module.exports = __toCommonJS(ErrorModal_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_ErrorModal = require("./ErrorModal");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  title: (0, import_addon_knobs.text)("title", overrideProps.title || ""),
  description: (0, import_addon_knobs.text)("description", overrideProps.description || ""),
  buttonText: (0, import_addon_knobs.text)("buttonText", overrideProps.buttonText || ""),
  i18n,
  onClose: (0, import_addon_actions.action)("onClick")
}), "createProps");
var ErrorModal_stories_default = {
  title: "Components/ErrorModal"
};
const Normal = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_ErrorModal.ErrorModal, {
    ...createProps()
  });
}, "Normal");
const CustomStrings = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_ErrorModal.ErrorModal, {
    ...createProps({
      title: "Real bad!",
      description: "Just avoid that next time, kay?",
      buttonText: "Fine"
    })
  });
}, "CustomStrings");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomStrings,
  Normal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRXJyb3JNb2RhbC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vRXJyb3JNb2RhbCc7XG5pbXBvcnQgeyBFcnJvck1vZGFsIH0gZnJvbSAnLi9FcnJvck1vZGFsJztcblxuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHNUeXBlPiA9IHt9KTogUHJvcHNUeXBlID0+ICh7XG4gIHRpdGxlOiB0ZXh0KCd0aXRsZScsIG92ZXJyaWRlUHJvcHMudGl0bGUgfHwgJycpLFxuICBkZXNjcmlwdGlvbjogdGV4dCgnZGVzY3JpcHRpb24nLCBvdmVycmlkZVByb3BzLmRlc2NyaXB0aW9uIHx8ICcnKSxcbiAgYnV0dG9uVGV4dDogdGV4dCgnYnV0dG9uVGV4dCcsIG92ZXJyaWRlUHJvcHMuYnV0dG9uVGV4dCB8fCAnJyksXG4gIGkxOG4sXG4gIG9uQ2xvc2U6IGFjdGlvbignb25DbGljaycpLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0Vycm9yTW9kYWwnLFxufTtcblxuZXhwb3J0IGNvbnN0IE5vcm1hbCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiA8RXJyb3JNb2RhbCB7Li4uY3JlYXRlUHJvcHMoKX0gLz47XG59O1xuXG5leHBvcnQgY29uc3QgQ3VzdG9tU3RyaW5ncyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPEVycm9yTW9kYWxcbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICAgIHRpdGxlOiAnUmVhbCBiYWQhJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdKdXN0IGF2b2lkIHRoYXQgbmV4dCB0aW1lLCBrYXk/JyxcbiAgICAgICAgYnV0dG9uVGV4dDogJ0ZpbmUnLFxuICAgICAgfSl9XG4gICAgLz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHlCQUFxQjtBQUNyQiwyQkFBdUI7QUFHdkIsd0JBQTJCO0FBRTNCLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFFdkIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsTUFBTSxjQUFjLHdCQUFDLGdCQUFvQyxDQUFDLE1BQWtCO0FBQUEsRUFDMUUsT0FBTyw2QkFBSyxTQUFTLGNBQWMsU0FBUyxFQUFFO0FBQUEsRUFDOUMsYUFBYSw2QkFBSyxlQUFlLGNBQWMsZUFBZSxFQUFFO0FBQUEsRUFDaEUsWUFBWSw2QkFBSyxjQUFjLGNBQWMsY0FBYyxFQUFFO0FBQUEsRUFDN0Q7QUFBQSxFQUNBLFNBQVMsaUNBQU8sU0FBUztBQUMzQixJQU5vQjtBQVFwQixJQUFPLDZCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLFNBQVMsNkJBQW1CO0FBQ3ZDLFNBQU8sb0NBQUM7QUFBQSxPQUFlLFlBQVk7QUFBQSxHQUFHO0FBQ3hDLEdBRnNCO0FBSWYsTUFBTSxnQkFBZ0IsNkJBQW1CO0FBQzlDLFNBQ0Usb0NBQUM7QUFBQSxPQUNLLFlBQVk7QUFBQSxNQUNkLE9BQU87QUFBQSxNQUNQLGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxJQUNkLENBQUM7QUFBQSxHQUNIO0FBRUosR0FWNkI7IiwKICAibmFtZXMiOiBbXQp9Cg==
