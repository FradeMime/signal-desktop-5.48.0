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
var Button_exports = {};
__export(Button_exports, {
  Button: () => Button
});
module.exports = __toCommonJS(Button_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var styles = __toESM(require("./Button.scss"));
const getClassName = /* @__PURE__ */ __name(({ primary, pill }) => {
  if (pill && primary) {
    return styles.pillPrimary;
  }
  if (pill) {
    return styles.pill;
  }
  if (primary) {
    return styles.primary;
  }
  return styles.base;
}, "getClassName");
const Button = /* @__PURE__ */ __name(({
  className,
  children,
  ...otherProps
}) => {
  return /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: (0, import_classnames.default)(getClassName(otherProps), className),
    ...otherProps
  }, children);
}, "Button");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQnV0dG9uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vQnV0dG9uLnNjc3MnO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IFJlYWN0LkJ1dHRvbkhUTUxBdHRyaWJ1dGVzPEhUTUxCdXR0b25FbGVtZW50PiAmIHtcbiAgcGlsbD86IGJvb2xlYW47XG4gIHByaW1hcnk/OiBib29sZWFuO1xufTtcblxuY29uc3QgZ2V0Q2xhc3NOYW1lID0gKHsgcHJpbWFyeSwgcGlsbCB9OiBQcm9wcykgPT4ge1xuICBpZiAocGlsbCAmJiBwcmltYXJ5KSB7XG4gICAgcmV0dXJuIHN0eWxlcy5waWxsUHJpbWFyeTtcbiAgfVxuXG4gIGlmIChwaWxsKSB7XG4gICAgcmV0dXJuIHN0eWxlcy5waWxsO1xuICB9XG5cbiAgaWYgKHByaW1hcnkpIHtcbiAgICByZXR1cm4gc3R5bGVzLnByaW1hcnk7XG4gIH1cblxuICByZXR1cm4gc3R5bGVzLmJhc2U7XG59O1xuXG5leHBvcnQgY29uc3QgQnV0dG9uOiBSZWFjdC5Db21wb25lbnRUeXBlPFByb3BzPiA9ICh7XG4gIGNsYXNzTmFtZSxcbiAgY2hpbGRyZW4sXG4gIC4uLm90aGVyUHJvcHNcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhnZXRDbGFzc05hbWUob3RoZXJQcm9wcyksIGNsYXNzTmFtZSl9XG4gICAgICB7Li4ub3RoZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9idXR0b24+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQix3QkFBdUI7QUFFdkIsYUFBd0I7QUFPeEIsTUFBTSxlQUFlLHdCQUFDLEVBQUUsU0FBUyxXQUFrQjtBQUNqRCxNQUFJLFFBQVEsU0FBUztBQUNuQixXQUFPLE9BQU87QUFBQSxFQUNoQjtBQUVBLE1BQUksTUFBTTtBQUNSLFdBQU8sT0FBTztBQUFBLEVBQ2hCO0FBRUEsTUFBSSxTQUFTO0FBQ1gsV0FBTyxPQUFPO0FBQUEsRUFDaEI7QUFFQSxTQUFPLE9BQU87QUFDaEIsR0FkcUI7QUFnQmQsTUFBTSxTQUFxQyx3QkFBQztBQUFBLEVBQ2pEO0FBQUEsRUFDQTtBQUFBLEtBQ0c7QUFBQSxNQUNDO0FBQ0osU0FDRSxtREFBQztBQUFBLElBQ0MsTUFBSztBQUFBLElBQ0wsV0FBVywrQkFBVyxhQUFhLFVBQVUsR0FBRyxTQUFTO0FBQUEsT0FDckQ7QUFBQSxLQUVILFFBQ0g7QUFFSixHQWRrRDsiLAogICJuYW1lcyI6IFtdCn0K
