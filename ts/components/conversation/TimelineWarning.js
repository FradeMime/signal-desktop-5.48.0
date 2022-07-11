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
var TimelineWarning_exports = {};
__export(TimelineWarning_exports, {
  TimelineWarning: () => TimelineWarning
});
module.exports = __toCommonJS(TimelineWarning_exports);
var import_react = __toESM(require("react"));
const CLASS_NAME = "module-TimelineWarning";
const ICON_CONTAINER_CLASS_NAME = `${CLASS_NAME}__icon-container`;
const GENERIC_ICON_CLASS_NAME = `${CLASS_NAME}__generic-icon`;
const TEXT_CLASS_NAME = `${CLASS_NAME}__text`;
const LINK_CLASS_NAME = `${TEXT_CLASS_NAME}__link`;
const CLOSE_BUTTON_CLASS_NAME = `${CLASS_NAME}__close-button`;
function TimelineWarning({
  children,
  i18n,
  onClose
}) {
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: CLASS_NAME
  }, children, /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("close"),
    className: CLOSE_BUTTON_CLASS_NAME,
    onClick: onClose,
    type: "button"
  }));
}
TimelineWarning.IconContainer = ({
  children
}) => /* @__PURE__ */ import_react.default.createElement("div", {
  className: ICON_CONTAINER_CLASS_NAME
}, children);
TimelineWarning.GenericIcon = () => /* @__PURE__ */ import_react.default.createElement("div", {
  className: GENERIC_ICON_CLASS_NAME
});
TimelineWarning.Text = ({
  children
}) => /* @__PURE__ */ import_react.default.createElement("div", {
  className: TEXT_CLASS_NAME
}, children);
TimelineWarning.Link = ({
  children,
  onClick
}) => /* @__PURE__ */ import_react.default.createElement("button", {
  className: LINK_CLASS_NAME,
  onClick,
  type: "button"
}, children);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TimelineWarning
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGltZWxpbmVXYXJuaW5nLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuXG5jb25zdCBDTEFTU19OQU1FID0gJ21vZHVsZS1UaW1lbGluZVdhcm5pbmcnO1xuY29uc3QgSUNPTl9DT05UQUlORVJfQ0xBU1NfTkFNRSA9IGAke0NMQVNTX05BTUV9X19pY29uLWNvbnRhaW5lcmA7XG5jb25zdCBHRU5FUklDX0lDT05fQ0xBU1NfTkFNRSA9IGAke0NMQVNTX05BTUV9X19nZW5lcmljLWljb25gO1xuY29uc3QgVEVYVF9DTEFTU19OQU1FID0gYCR7Q0xBU1NfTkFNRX1fX3RleHRgO1xuY29uc3QgTElOS19DTEFTU19OQU1FID0gYCR7VEVYVF9DTEFTU19OQU1FfV9fbGlua2A7XG5jb25zdCBDTE9TRV9CVVRUT05fQ0xBU1NfTkFNRSA9IGAke0NMQVNTX05BTUV9X19jbG9zZS1idXR0b25gO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBUaW1lbGluZVdhcm5pbmcoe1xuICBjaGlsZHJlbixcbiAgaTE4bixcbiAgb25DbG9zZSxcbn06IFJlYWRvbmx5PFByb3BzVHlwZT4pOiBKU1guRWxlbWVudCB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e0NMQVNTX05BTUV9PlxuICAgICAge2NoaWxkcmVufVxuICAgICAgPGJ1dHRvblxuICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdjbG9zZScpfVxuICAgICAgICBjbGFzc05hbWU9e0NMT1NFX0JVVFRPTl9DTEFTU19OQU1FfVxuICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cblRpbWVsaW5lV2FybmluZy5JY29uQ29udGFpbmVyID0gKHtcbiAgY2hpbGRyZW4sXG59OiBSZWFkb25seTx7IGNoaWxkcmVuOiBSZWFjdE5vZGUgfT4pOiBKU1guRWxlbWVudCA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPXtJQ09OX0NPTlRBSU5FUl9DTEFTU19OQU1FfT57Y2hpbGRyZW59PC9kaXY+XG4pO1xuXG5UaW1lbGluZVdhcm5pbmcuR2VuZXJpY0ljb24gPSAoKSA9PiA8ZGl2IGNsYXNzTmFtZT17R0VORVJJQ19JQ09OX0NMQVNTX05BTUV9IC8+O1xuXG5UaW1lbGluZVdhcm5pbmcuVGV4dCA9ICh7XG4gIGNoaWxkcmVuLFxufTogUmVhZG9ubHk8eyBjaGlsZHJlbjogUmVhY3ROb2RlIH0+KTogSlNYLkVsZW1lbnQgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT17VEVYVF9DTEFTU19OQU1FfT57Y2hpbGRyZW59PC9kaXY+XG4pO1xuXG50eXBlIExpbmtQcm9wcyA9IHtcbiAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcbiAgb25DbGljazogKCkgPT4gdm9pZDtcbn07XG5cblRpbWVsaW5lV2FybmluZy5MaW5rID0gKHtcbiAgY2hpbGRyZW4sXG4gIG9uQ2xpY2ssXG59OiBSZWFkb25seTxMaW5rUHJvcHM+KTogSlNYLkVsZW1lbnQgPT4gKFxuICA8YnV0dG9uIGNsYXNzTmFtZT17TElOS19DTEFTU19OQU1FfSBvbkNsaWNrPXtvbkNsaWNrfSB0eXBlPVwiYnV0dG9uXCI+XG4gICAge2NoaWxkcmVufVxuICA8L2J1dHRvbj5cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWtCO0FBSWxCLE1BQU0sYUFBYTtBQUNuQixNQUFNLDRCQUE0QixHQUFHO0FBQ3JDLE1BQU0sMEJBQTBCLEdBQUc7QUFDbkMsTUFBTSxrQkFBa0IsR0FBRztBQUMzQixNQUFNLGtCQUFrQixHQUFHO0FBQzNCLE1BQU0sMEJBQTBCLEdBQUc7QUFRNUIseUJBQXlCO0FBQUEsRUFDOUI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBQ21DO0FBQ25DLFNBQ0UsbURBQUM7QUFBQSxJQUFJLFdBQVc7QUFBQSxLQUNiLFVBQ0QsbURBQUM7QUFBQSxJQUNDLGNBQVksS0FBSyxPQUFPO0FBQUEsSUFDeEIsV0FBVztBQUFBLElBQ1gsU0FBUztBQUFBLElBQ1QsTUFBSztBQUFBLEdBQ1AsQ0FDRjtBQUVKO0FBaEJnQixBQWtCaEIsZ0JBQWdCLGdCQUFnQixDQUFDO0FBQUEsRUFDL0I7QUFBQSxNQUVBLG1EQUFDO0FBQUEsRUFBSSxXQUFXO0FBQUEsR0FBNEIsUUFBUztBQUd2RCxnQkFBZ0IsY0FBYyxNQUFNLG1EQUFDO0FBQUEsRUFBSSxXQUFXO0FBQUEsQ0FBeUI7QUFFN0UsZ0JBQWdCLE9BQU8sQ0FBQztBQUFBLEVBQ3RCO0FBQUEsTUFFQSxtREFBQztBQUFBLEVBQUksV0FBVztBQUFBLEdBQWtCLFFBQVM7QUFRN0MsZ0JBQWdCLE9BQU8sQ0FBQztBQUFBLEVBQ3RCO0FBQUEsRUFDQTtBQUFBLE1BRUEsbURBQUM7QUFBQSxFQUFPLFdBQVc7QUFBQSxFQUFpQjtBQUFBLEVBQWtCLE1BQUs7QUFBQSxHQUN4RCxRQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
