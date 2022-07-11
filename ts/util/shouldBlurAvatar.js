var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var shouldBlurAvatar_exports = {};
__export(shouldBlurAvatar_exports, {
  shouldBlurAvatar: () => shouldBlurAvatar
});
module.exports = __toCommonJS(shouldBlurAvatar_exports);
const shouldBlurAvatar = /* @__PURE__ */ __name(({
  acceptedMessageRequest,
  avatarPath,
  isMe,
  sharedGroupNames,
  unblurredAvatarPath
}) => Boolean(!isMe && !acceptedMessageRequest && !sharedGroupNames.length && avatarPath && avatarPath !== unblurredAvatarPath), "shouldBlurAvatar");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  shouldBlurAvatar
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2hvdWxkQmx1ckF2YXRhci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcblxuZXhwb3J0IGNvbnN0IHNob3VsZEJsdXJBdmF0YXIgPSAoe1xuICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0LFxuICBhdmF0YXJQYXRoLFxuICBpc01lLFxuICBzaGFyZWRHcm91cE5hbWVzLFxuICB1bmJsdXJyZWRBdmF0YXJQYXRoLFxufTogUmVhZG9ubHk8XG4gIFBpY2s8XG4gICAgQ29udmVyc2F0aW9uVHlwZSxcbiAgICB8ICdhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0J1xuICAgIHwgJ2F2YXRhclBhdGgnXG4gICAgfCAnaXNNZSdcbiAgICB8ICdzaGFyZWRHcm91cE5hbWVzJ1xuICAgIHwgJ3VuYmx1cnJlZEF2YXRhclBhdGgnXG4gID5cbj4pOiBib29sZWFuID0+XG4gIEJvb2xlYW4oXG4gICAgIWlzTWUgJiZcbiAgICAgICFhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0ICYmXG4gICAgICAhc2hhcmVkR3JvdXBOYW1lcy5sZW5ndGggJiZcbiAgICAgIGF2YXRhclBhdGggJiZcbiAgICAgIGF2YXRhclBhdGggIT09IHVuYmx1cnJlZEF2YXRhclBhdGhcbiAgKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLTyxNQUFNLG1CQUFtQix3QkFBQztBQUFBLEVBQy9CO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BV0EsUUFDRSxDQUFDLFFBQ0MsQ0FBQywwQkFDRCxDQUFDLGlCQUFpQixVQUNsQixjQUNBLGVBQWUsbUJBQ25CLEdBdEI4QjsiLAogICJuYW1lcyI6IFtdCn0K
