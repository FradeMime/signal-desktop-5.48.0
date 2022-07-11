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
var user_exports = {};
__export(user_exports, {
  actions: () => actions,
  getEmptyState: () => getEmptyState,
  reducer: () => reducer
});
module.exports = __toCommonJS(user_exports);
var import_events = require("../../shims/events");
var import_Util = require("../../types/Util");
const actions = {
  userChanged,
  manualReconnect
};
function userChanged(attributes) {
  return {
    type: "USER_CHANGED",
    payload: attributes
  };
}
function manualReconnect() {
  (0, import_events.trigger)("manualConnect");
  return {
    type: "NOOP",
    payload: null
  };
}
function getEmptyState() {
  return {
    attachmentsPath: "missing",
    stickersPath: "missing",
    tempPath: "missing",
    ourConversationId: "missing",
    ourDeviceId: 0,
    ourUuid: "00000000-0000-4000-8000-000000000000",
    ourNumber: "missing",
    regionCode: "missing",
    platform: "missing",
    interactionMode: "mouse",
    isMainWindowMaximized: false,
    isMainWindowFullScreen: false,
    menuOptions: {
      development: false,
      devTools: false,
      includeSetup: false,
      isProduction: true,
      platform: "unknown"
    },
    theme: import_Util.ThemeType.light,
    i18n: Object.assign(() => {
      throw new Error("i18n not yet set up");
    }, {
      getLocale() {
        throw new Error("i18n not yet set up");
      }
    }),
    localeMessages: {},
    version: "0.0.0"
  };
}
function reducer(state = getEmptyState(), action) {
  if (!state) {
    return getEmptyState();
  }
  if (action.type === "USER_CHANGED") {
    const { payload } = action;
    return {
      ...state,
      ...payload
    };
  }
  return state;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  actions,
  getEmptyState,
  reducer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IHRyaWdnZXIgfSBmcm9tICcuLi8uLi9zaGltcy9ldmVudHMnO1xuXG5pbXBvcnQgdHlwZSB7IE5vb3BBY3Rpb25UeXBlIH0gZnJvbSAnLi9ub29wJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGVNZXNzYWdlc1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9JMThOJztcbmltcG9ydCB7IFRoZW1lVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBVVUlEU3RyaW5nVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHR5cGUgeyBNZW51T3B0aW9uc1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9tZW51JztcblxuLy8gU3RhdGVcblxuZXhwb3J0IHR5cGUgVXNlclN0YXRlVHlwZSA9IHtcbiAgYXR0YWNobWVudHNQYXRoOiBzdHJpbmc7XG4gIHN0aWNrZXJzUGF0aDogc3RyaW5nO1xuICB0ZW1wUGF0aDogc3RyaW5nO1xuICBvdXJDb252ZXJzYXRpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBvdXJEZXZpY2VJZDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBvdXJVdWlkOiBVVUlEU3RyaW5nVHlwZSB8IHVuZGVmaW5lZDtcbiAgb3VyTnVtYmVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHBsYXRmb3JtOiBzdHJpbmc7XG4gIHJlZ2lvbkNvZGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgbG9jYWxlTWVzc2FnZXM6IExvY2FsZU1lc3NhZ2VzVHlwZTtcbiAgaW50ZXJhY3Rpb25Nb2RlOiAnbW91c2UnIHwgJ2tleWJvYXJkJztcbiAgaXNNYWluV2luZG93TWF4aW1pemVkOiBib29sZWFuO1xuICBpc01haW5XaW5kb3dGdWxsU2NyZWVuOiBib29sZWFuO1xuICBtZW51T3B0aW9uczogTWVudU9wdGlvbnNUeXBlO1xuICB0aGVtZTogVGhlbWVUeXBlO1xuICB2ZXJzaW9uOiBzdHJpbmc7XG59O1xuXG4vLyBBY3Rpb25zXG5cbnR5cGUgVXNlckNoYW5nZWRBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnVVNFUl9DSEFOR0VEJztcbiAgcGF5bG9hZDoge1xuICAgIG91ckNvbnZlcnNhdGlvbklkPzogc3RyaW5nO1xuICAgIG91ckRldmljZUlkPzogbnVtYmVyO1xuICAgIG91clV1aWQ/OiBVVUlEU3RyaW5nVHlwZTtcbiAgICBvdXJOdW1iZXI/OiBzdHJpbmc7XG4gICAgcmVnaW9uQ29kZT86IHN0cmluZztcbiAgICBpbnRlcmFjdGlvbk1vZGU/OiAnbW91c2UnIHwgJ2tleWJvYXJkJztcbiAgICB0aGVtZT86IFRoZW1lVHlwZTtcbiAgICBpc01haW5XaW5kb3dNYXhpbWl6ZWQ/OiBib29sZWFuO1xuICAgIGlzTWFpbldpbmRvd0Z1bGxTY3JlZW4/OiBib29sZWFuO1xuICAgIG1lbnVPcHRpb25zPzogTWVudU9wdGlvbnNUeXBlO1xuICB9O1xufTtcblxuZXhwb3J0IHR5cGUgVXNlckFjdGlvblR5cGUgPSBVc2VyQ2hhbmdlZEFjdGlvblR5cGU7XG5cbi8vIEFjdGlvbiBDcmVhdG9yc1xuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IHtcbiAgdXNlckNoYW5nZWQsXG4gIG1hbnVhbFJlY29ubmVjdCxcbn07XG5cbmZ1bmN0aW9uIHVzZXJDaGFuZ2VkKGF0dHJpYnV0ZXM6IHtcbiAgaW50ZXJhY3Rpb25Nb2RlPzogJ21vdXNlJyB8ICdrZXlib2FyZCc7XG4gIG91ckNvbnZlcnNhdGlvbklkPzogc3RyaW5nO1xuICBvdXJEZXZpY2VJZD86IG51bWJlcjtcbiAgb3VyTnVtYmVyPzogc3RyaW5nO1xuICBvdXJVdWlkPzogVVVJRFN0cmluZ1R5cGU7XG4gIHJlZ2lvbkNvZGU/OiBzdHJpbmc7XG4gIHRoZW1lPzogVGhlbWVUeXBlO1xuICBpc01haW5XaW5kb3dNYXhpbWl6ZWQ/OiBib29sZWFuO1xuICBpc01haW5XaW5kb3dGdWxsU2NyZWVuPzogYm9vbGVhbjtcbiAgbWVudU9wdGlvbnM/OiBNZW51T3B0aW9uc1R5cGU7XG59KTogVXNlckNoYW5nZWRBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnVVNFUl9DSEFOR0VEJyxcbiAgICBwYXlsb2FkOiBhdHRyaWJ1dGVzLFxuICB9O1xufVxuXG5mdW5jdGlvbiBtYW51YWxSZWNvbm5lY3QoKTogTm9vcEFjdGlvblR5cGUge1xuICB0cmlnZ2VyKCdtYW51YWxDb25uZWN0Jyk7XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnTk9PUCcsXG4gICAgcGF5bG9hZDogbnVsbCxcbiAgfTtcbn1cblxuLy8gUmVkdWNlclxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW1wdHlTdGF0ZSgpOiBVc2VyU3RhdGVUeXBlIHtcbiAgcmV0dXJuIHtcbiAgICBhdHRhY2htZW50c1BhdGg6ICdtaXNzaW5nJyxcbiAgICBzdGlja2Vyc1BhdGg6ICdtaXNzaW5nJyxcbiAgICB0ZW1wUGF0aDogJ21pc3NpbmcnLFxuICAgIG91ckNvbnZlcnNhdGlvbklkOiAnbWlzc2luZycsXG4gICAgb3VyRGV2aWNlSWQ6IDAsXG4gICAgb3VyVXVpZDogJzAwMDAwMDAwLTAwMDAtNDAwMC04MDAwLTAwMDAwMDAwMDAwMCcsXG4gICAgb3VyTnVtYmVyOiAnbWlzc2luZycsXG4gICAgcmVnaW9uQ29kZTogJ21pc3NpbmcnLFxuICAgIHBsYXRmb3JtOiAnbWlzc2luZycsXG4gICAgaW50ZXJhY3Rpb25Nb2RlOiAnbW91c2UnLFxuICAgIGlzTWFpbldpbmRvd01heGltaXplZDogZmFsc2UsXG4gICAgaXNNYWluV2luZG93RnVsbFNjcmVlbjogZmFsc2UsXG4gICAgbWVudU9wdGlvbnM6IHtcbiAgICAgIGRldmVsb3BtZW50OiBmYWxzZSxcbiAgICAgIGRldlRvb2xzOiBmYWxzZSxcbiAgICAgIGluY2x1ZGVTZXR1cDogZmFsc2UsXG4gICAgICBpc1Byb2R1Y3Rpb246IHRydWUsXG4gICAgICBwbGF0Zm9ybTogJ3Vua25vd24nLFxuICAgIH0sXG4gICAgdGhlbWU6IFRoZW1lVHlwZS5saWdodCxcbiAgICBpMThuOiBPYmplY3QuYXNzaWduKFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2kxOG4gbm90IHlldCBzZXQgdXAnKTtcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGdldExvY2FsZSgpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2kxOG4gbm90IHlldCBzZXQgdXAnKTtcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApLFxuICAgIGxvY2FsZU1lc3NhZ2VzOiB7fSxcbiAgICB2ZXJzaW9uOiAnMC4wLjAnLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlcihcbiAgc3RhdGU6IFJlYWRvbmx5PFVzZXJTdGF0ZVR5cGU+ID0gZ2V0RW1wdHlTdGF0ZSgpLFxuICBhY3Rpb246IFJlYWRvbmx5PFVzZXJBY3Rpb25UeXBlPlxuKTogVXNlclN0YXRlVHlwZSB7XG4gIGlmICghc3RhdGUpIHtcbiAgICByZXR1cm4gZ2V0RW1wdHlTdGF0ZSgpO1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnVVNFUl9DSEFOR0VEJykge1xuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgLi4ucGF5bG9hZCxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBd0I7QUFLeEIsa0JBQTBCO0FBZ0RuQixNQUFNLFVBQVU7QUFBQSxFQUNyQjtBQUFBLEVBQ0E7QUFDRjtBQUVBLHFCQUFxQixZQVdLO0FBQ3hCLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxFQUNYO0FBQ0Y7QUFoQlMsQUFrQlQsMkJBQTJDO0FBQ3pDLDZCQUFRLGVBQWU7QUFFdkIsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ1g7QUFDRjtBQVBTLEFBV0YseUJBQXdDO0FBQzdDLFNBQU87QUFBQSxJQUNMLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLFVBQVU7QUFBQSxJQUNWLG1CQUFtQjtBQUFBLElBQ25CLGFBQWE7QUFBQSxJQUNiLFNBQVM7QUFBQSxJQUNULFdBQVc7QUFBQSxJQUNYLFlBQVk7QUFBQSxJQUNaLFVBQVU7QUFBQSxJQUNWLGlCQUFpQjtBQUFBLElBQ2pCLHVCQUF1QjtBQUFBLElBQ3ZCLHdCQUF3QjtBQUFBLElBQ3hCLGFBQWE7QUFBQSxNQUNYLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxNQUNWLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxPQUFPLHNCQUFVO0FBQUEsSUFDakIsTUFBTSxPQUFPLE9BQ1gsTUFBTTtBQUNKLFlBQU0sSUFBSSxNQUFNLHFCQUFxQjtBQUFBLElBQ3ZDLEdBQ0E7QUFBQSxNQUNFLFlBQVk7QUFDVixjQUFNLElBQUksTUFBTSxxQkFBcUI7QUFBQSxNQUN2QztBQUFBLElBQ0YsQ0FDRjtBQUFBLElBQ0EsZ0JBQWdCLENBQUM7QUFBQSxJQUNqQixTQUFTO0FBQUEsRUFDWDtBQUNGO0FBbkNnQixBQXFDVCxpQkFDTCxRQUFpQyxjQUFjLEdBQy9DLFFBQ2U7QUFDZixNQUFJLENBQUMsT0FBTztBQUNWLFdBQU8sY0FBYztBQUFBLEVBQ3ZCO0FBRUEsTUFBSSxPQUFPLFNBQVMsZ0JBQWdCO0FBQ2xDLFVBQU0sRUFBRSxZQUFZO0FBRXBCLFdBQU87QUFBQSxTQUNGO0FBQUEsU0FDQTtBQUFBLElBQ0w7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUO0FBbEJnQiIsCiAgIm5hbWVzIjogW10KfQo=
