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
var getMuteOptions_exports = {};
__export(getMuteOptions_exports, {
  getMuteOptions: () => getMuteOptions
});
module.exports = __toCommonJS(getMuteOptions_exports);
var durations = __toESM(require("./durations"));
var import_getMutedUntilText = require("./getMutedUntilText");
var import_isConversationMuted = require("./isConversationMuted");
function getMuteOptions(muteExpiresAt, i18n) {
  return [
    ...muteExpiresAt && (0, import_isConversationMuted.isConversationMuted)({ muteExpiresAt }) ? [
      {
        name: (0, import_getMutedUntilText.getMutedUntilText)(muteExpiresAt, i18n),
        disabled: true,
        value: -1
      },
      {
        name: i18n("unmute"),
        value: 0
      }
    ] : [],
    {
      name: i18n("muteHour"),
      value: durations.HOUR
    },
    {
      name: i18n("muteEightHours"),
      value: 8 * durations.HOUR
    },
    {
      name: i18n("muteDay"),
      value: durations.DAY
    },
    {
      name: i18n("muteWeek"),
      value: durations.WEEK
    },
    {
      name: i18n("muteAlways"),
      value: Number.MAX_SAFE_INTEGER
    }
  ];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getMuteOptions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0TXV0ZU9wdGlvbnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi9kdXJhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBnZXRNdXRlZFVudGlsVGV4dCB9IGZyb20gJy4vZ2V0TXV0ZWRVbnRpbFRleHQnO1xuaW1wb3J0IHsgaXNDb252ZXJzYXRpb25NdXRlZCB9IGZyb20gJy4vaXNDb252ZXJzYXRpb25NdXRlZCc7XG5cbmV4cG9ydCB0eXBlIE11dGVPcHRpb24gPSB7XG4gIG5hbWU6IHN0cmluZztcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICB2YWx1ZTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldE11dGVPcHRpb25zKFxuICBtdXRlRXhwaXJlc0F0OiB1bmRlZmluZWQgfCBudW1iZXIsXG4gIGkxOG46IExvY2FsaXplclR5cGVcbik6IEFycmF5PE11dGVPcHRpb24+IHtcbiAgcmV0dXJuIFtcbiAgICAuLi4obXV0ZUV4cGlyZXNBdCAmJiBpc0NvbnZlcnNhdGlvbk11dGVkKHsgbXV0ZUV4cGlyZXNBdCB9KVxuICAgICAgPyBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogZ2V0TXV0ZWRVbnRpbFRleHQobXV0ZUV4cGlyZXNBdCwgaTE4biksXG4gICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IGkxOG4oJ3VubXV0ZScpLFxuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgICAgOiBbXSksXG4gICAge1xuICAgICAgbmFtZTogaTE4bignbXV0ZUhvdXInKSxcbiAgICAgIHZhbHVlOiBkdXJhdGlvbnMuSE9VUixcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IGkxOG4oJ211dGVFaWdodEhvdXJzJyksXG4gICAgICB2YWx1ZTogOCAqIGR1cmF0aW9ucy5IT1VSLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogaTE4bignbXV0ZURheScpLFxuICAgICAgdmFsdWU6IGR1cmF0aW9ucy5EQVksXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBpMThuKCdtdXRlV2VlaycpLFxuICAgICAgdmFsdWU6IGR1cmF0aW9ucy5XRUVLLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogaTE4bignbXV0ZUFsd2F5cycpLFxuICAgICAgdmFsdWU6IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLFxuICAgIH0sXG4gIF07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsZ0JBQTJCO0FBRTNCLCtCQUFrQztBQUNsQyxpQ0FBb0M7QUFRN0Isd0JBQ0wsZUFDQSxNQUNtQjtBQUNuQixTQUFPO0FBQUEsSUFDTCxHQUFJLGlCQUFpQixvREFBb0IsRUFBRSxjQUFjLENBQUMsSUFDdEQ7QUFBQSxNQUNFO0FBQUEsUUFDRSxNQUFNLGdEQUFrQixlQUFlLElBQUk7QUFBQSxRQUMzQyxVQUFVO0FBQUEsUUFDVixPQUFPO0FBQUEsTUFDVDtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU0sS0FBSyxRQUFRO0FBQUEsUUFDbkIsT0FBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGLElBQ0EsQ0FBQztBQUFBLElBQ0w7QUFBQSxNQUNFLE1BQU0sS0FBSyxVQUFVO0FBQUEsTUFDckIsT0FBTyxVQUFVO0FBQUEsSUFDbkI7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNLEtBQUssZ0JBQWdCO0FBQUEsTUFDM0IsT0FBTyxJQUFJLFVBQVU7QUFBQSxJQUN2QjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU0sS0FBSyxTQUFTO0FBQUEsTUFDcEIsT0FBTyxVQUFVO0FBQUEsSUFDbkI7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNLEtBQUssVUFBVTtBQUFBLE1BQ3JCLE9BQU8sVUFBVTtBQUFBLElBQ25CO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTSxLQUFLLFlBQVk7QUFBQSxNQUN2QixPQUFPLE9BQU87QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFDRjtBQXZDZ0IiLAogICJuYW1lcyI6IFtdCn0K
