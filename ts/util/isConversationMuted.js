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
var isConversationMuted_exports = {};
__export(isConversationMuted_exports, {
  isConversationMuted: () => isConversationMuted
});
module.exports = __toCommonJS(isConversationMuted_exports);
const isConversationMuted = /* @__PURE__ */ __name(({
  muteExpiresAt
}) => Boolean(muteExpiresAt && Date.now() < muteExpiresAt), "isConversationMuted");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isConversationMuted
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNDb252ZXJzYXRpb25NdXRlZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGUgfSBmcm9tICcuLi9tb2RlbC10eXBlcy5kJztcblxuZXhwb3J0IGNvbnN0IGlzQ29udmVyc2F0aW9uTXV0ZWQgPSAoe1xuICBtdXRlRXhwaXJlc0F0LFxufTogUmVhZG9ubHk8UGljazxDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZSwgJ211dGVFeHBpcmVzQXQnPj4pOiBib29sZWFuID0+XG4gIEJvb2xlYW4obXV0ZUV4cGlyZXNBdCAmJiBEYXRlLm5vdygpIDwgbXV0ZUV4cGlyZXNBdCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS08sTUFBTSxzQkFBc0Isd0JBQUM7QUFBQSxFQUNsQztBQUFBLE1BRUEsUUFBUSxpQkFBaUIsS0FBSyxJQUFJLElBQUksYUFBYSxHQUhsQjsiLAogICJuYW1lcyI6IFtdCn0K
