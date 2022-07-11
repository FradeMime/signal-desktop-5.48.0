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
var getConversationColorAttributes_exports = {};
__export(getConversationColorAttributes_exports, {
  getConversationColorAttributes: () => getConversationColorAttributes
});
module.exports = __toCommonJS(getConversationColorAttributes_exports);
function getConversationColorAttributes(conversationColors) {
  const defaultConversationColor = window.Events.getDefaultConversationColor();
  const conversationColor = conversationColors.conversationColor || defaultConversationColor.color;
  const customColor = conversationColor !== "custom" ? void 0 : conversationColors.customColor || defaultConversationColor.customColorData?.value;
  const customColorId = conversationColor !== "custom" ? void 0 : conversationColors.customColorId || defaultConversationColor.customColorData?.id;
  return {
    conversationColor,
    customColor,
    customColorId
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getConversationColorAttributes
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0Q29udmVyc2F0aW9uQ29sb3JBdHRyaWJ1dGVzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uQ29sb3JUeXBlLCBDdXN0b21Db2xvclR5cGUgfSBmcm9tICcuLi90eXBlcy9Db2xvcnMnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb252ZXJzYXRpb25Db2xvckF0dHJpYnV0ZXMoXG4gIGNvbnZlcnNhdGlvbkNvbG9yczogUGljazxcbiAgICBDb252ZXJzYXRpb25UeXBlLFxuICAgICdjb252ZXJzYXRpb25Db2xvcicgfCAnY3VzdG9tQ29sb3JJZCcgfCAnY3VzdG9tQ29sb3InXG4gID5cbik6IHtcbiAgY29udmVyc2F0aW9uQ29sb3I6IENvbnZlcnNhdGlvbkNvbG9yVHlwZTtcbiAgY3VzdG9tQ29sb3I6IEN1c3RvbUNvbG9yVHlwZSB8IHVuZGVmaW5lZDtcbiAgY3VzdG9tQ29sb3JJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xufSB7XG4gIGNvbnN0IGRlZmF1bHRDb252ZXJzYXRpb25Db2xvciA9IHdpbmRvdy5FdmVudHMuZ2V0RGVmYXVsdENvbnZlcnNhdGlvbkNvbG9yKCk7XG5cbiAgY29uc3QgY29udmVyc2F0aW9uQ29sb3IgPVxuICAgIGNvbnZlcnNhdGlvbkNvbG9ycy5jb252ZXJzYXRpb25Db2xvciB8fCBkZWZhdWx0Q29udmVyc2F0aW9uQ29sb3IuY29sb3I7XG4gIGNvbnN0IGN1c3RvbUNvbG9yID1cbiAgICBjb252ZXJzYXRpb25Db2xvciAhPT0gJ2N1c3RvbSdcbiAgICAgID8gdW5kZWZpbmVkXG4gICAgICA6IGNvbnZlcnNhdGlvbkNvbG9ycy5jdXN0b21Db2xvciB8fFxuICAgICAgICBkZWZhdWx0Q29udmVyc2F0aW9uQ29sb3IuY3VzdG9tQ29sb3JEYXRhPy52YWx1ZTtcbiAgY29uc3QgY3VzdG9tQ29sb3JJZCA9XG4gICAgY29udmVyc2F0aW9uQ29sb3IgIT09ICdjdXN0b20nXG4gICAgICA/IHVuZGVmaW5lZFxuICAgICAgOiBjb252ZXJzYXRpb25Db2xvcnMuY3VzdG9tQ29sb3JJZCB8fFxuICAgICAgICBkZWZhdWx0Q29udmVyc2F0aW9uQ29sb3IuY3VzdG9tQ29sb3JEYXRhPy5pZDtcblxuICByZXR1cm4ge1xuICAgIGNvbnZlcnNhdGlvbkNvbG9yLFxuICAgIGN1c3RvbUNvbG9yLFxuICAgIGN1c3RvbUNvbG9ySWQsXG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTU8sd0NBQ0wsb0JBUUE7QUFDQSxRQUFNLDJCQUEyQixPQUFPLE9BQU8sNEJBQTRCO0FBRTNFLFFBQU0sb0JBQ0osbUJBQW1CLHFCQUFxQix5QkFBeUI7QUFDbkUsUUFBTSxjQUNKLHNCQUFzQixXQUNsQixTQUNBLG1CQUFtQixlQUNuQix5QkFBeUIsaUJBQWlCO0FBQ2hELFFBQU0sZ0JBQ0osc0JBQXNCLFdBQ2xCLFNBQ0EsbUJBQW1CLGlCQUNuQix5QkFBeUIsaUJBQWlCO0FBRWhELFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7QUE5QmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
