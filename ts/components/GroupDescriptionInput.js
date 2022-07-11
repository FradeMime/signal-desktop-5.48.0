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
var GroupDescriptionInput_exports = {};
__export(GroupDescriptionInput_exports, {
  GroupDescriptionInput: () => GroupDescriptionInput
});
module.exports = __toCommonJS(GroupDescriptionInput_exports);
var import_react = __toESM(require("react"));
var import_Input = require("./Input");
const GroupDescriptionInput = (0, import_react.forwardRef)(({ i18n, disabled = false, onChangeValue, value }, ref) => {
  return /* @__PURE__ */ import_react.default.createElement(import_Input.Input, {
    disabled,
    expandable: true,
    i18n,
    onChange: onChangeValue,
    placeholder: i18n("setGroupMetadata__group-description-placeholder"),
    maxLengthCount: 480,
    maxByteCount: 8192,
    ref,
    value,
    whenToShowRemainingCount: 380
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupDescriptionInput
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBEZXNjcmlwdGlvbklucHV0LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tICcuL0lucHV0JztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBvbkNoYW5nZVZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgdmFsdWU6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cERlc2NyaXB0aW9uSW5wdXQgPSBmb3J3YXJkUmVmPEhUTUxJbnB1dEVsZW1lbnQsIFByb3BzVHlwZT4oXG4gICh7IGkxOG4sIGRpc2FibGVkID0gZmFsc2UsIG9uQ2hhbmdlVmFsdWUsIHZhbHVlIH0sIHJlZikgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICA8SW5wdXRcbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICBleHBhbmRhYmxlXG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZVZhbHVlfVxuICAgICAgICBwbGFjZWhvbGRlcj17aTE4bignc2V0R3JvdXBNZXRhZGF0YV9fZ3JvdXAtZGVzY3JpcHRpb24tcGxhY2Vob2xkZXInKX1cbiAgICAgICAgbWF4TGVuZ3RoQ291bnQ9ezQ4MH1cbiAgICAgICAgbWF4Qnl0ZUNvdW50PXs4MTkyfVxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICB3aGVuVG9TaG93UmVtYWluaW5nQ291bnQ9ezM4MH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQztBQUVsQyxtQkFBc0I7QUFVZixNQUFNLHdCQUF3Qiw2QkFDbkMsQ0FBQyxFQUFFLE1BQU0sV0FBVyxPQUFPLGVBQWUsU0FBUyxRQUFRO0FBQ3pELFNBQ0UsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQSxZQUFVO0FBQUEsSUFDVjtBQUFBLElBQ0EsVUFBVTtBQUFBLElBQ1YsYUFBYSxLQUFLLGlEQUFpRDtBQUFBLElBQ25FLGdCQUFnQjtBQUFBLElBQ2hCLGNBQWM7QUFBQSxJQUNkO0FBQUEsSUFDQTtBQUFBLElBQ0EsMEJBQTBCO0FBQUEsR0FDNUI7QUFFSixDQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
