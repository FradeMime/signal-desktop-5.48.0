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
var GroupTitleInput_exports = {};
__export(GroupTitleInput_exports, {
  GroupTitleInput: () => GroupTitleInput
});
module.exports = __toCommonJS(GroupTitleInput_exports);
var import_react = __toESM(require("react"));
var import_Input = require("./Input");
const GroupTitleInput = (0, import_react.forwardRef)(({ i18n, disabled = false, onChangeValue, value }, ref) => {
  return /* @__PURE__ */ import_react.default.createElement(import_Input.Input, {
    disabled,
    i18n,
    onChange: onChangeValue,
    placeholder: i18n("setGroupMetadata__group-name-placeholder"),
    maxLengthCount: 32,
    ref,
    value
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupTitleInput
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBUaXRsZUlucHV0LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tICcuL0lucHV0JztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBvbkNoYW5nZVZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgdmFsdWU6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cFRpdGxlSW5wdXQgPSBmb3J3YXJkUmVmPEhUTUxJbnB1dEVsZW1lbnQsIFByb3BzVHlwZT4oXG4gICh7IGkxOG4sIGRpc2FibGVkID0gZmFsc2UsIG9uQ2hhbmdlVmFsdWUsIHZhbHVlIH0sIHJlZikgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICA8SW5wdXRcbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2VWYWx1ZX1cbiAgICAgICAgcGxhY2Vob2xkZXI9e2kxOG4oJ3NldEdyb3VwTWV0YWRhdGFfX2dyb3VwLW5hbWUtcGxhY2Vob2xkZXInKX1cbiAgICAgICAgbWF4TGVuZ3RoQ291bnQ9ezMyfVxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgLz5cbiAgICApO1xuICB9XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtDO0FBRWxDLG1CQUFzQjtBQVVmLE1BQU0sa0JBQWtCLDZCQUM3QixDQUFDLEVBQUUsTUFBTSxXQUFXLE9BQU8sZUFBZSxTQUFTLFFBQVE7QUFDekQsU0FDRSxtREFBQztBQUFBLElBQ0M7QUFBQSxJQUNBO0FBQUEsSUFDQSxVQUFVO0FBQUEsSUFDVixhQUFhLEtBQUssMENBQTBDO0FBQUEsSUFDNUQsZ0JBQWdCO0FBQUEsSUFDaEI7QUFBQSxJQUNBO0FBQUEsR0FDRjtBQUVKLENBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
