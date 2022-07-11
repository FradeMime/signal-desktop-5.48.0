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
var getAvatarData_exports = {};
__export(getAvatarData_exports, {
  getAvatarData: () => getAvatarData
});
module.exports = __toCommonJS(getAvatarData_exports);
var import_Avatar = require("../types/Avatar");
var import_whatTypeOfConversation = require("./whatTypeOfConversation");
function getAvatarData(conversationAttrs) {
  const { avatars } = conversationAttrs;
  if (avatars && avatars.length) {
    return avatars;
  }
  const isGroup = !(0, import_whatTypeOfConversation.isDirectConversation)(conversationAttrs);
  return (0, import_Avatar.getDefaultAvatars)(isGroup);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAvatarData
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0QXZhdGFyRGF0YS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEF2YXRhckRhdGFUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQXZhdGFyJztcbmltcG9ydCB7IGdldERlZmF1bHRBdmF0YXJzIH0gZnJvbSAnLi4vdHlwZXMvQXZhdGFyJztcbmltcG9ydCB7IGlzRGlyZWN0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi93aGF0VHlwZU9mQ29udmVyc2F0aW9uJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGUgfSBmcm9tICcuLi9tb2RlbC10eXBlcy5kJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEF2YXRhckRhdGEoXG4gIGNvbnZlcnNhdGlvbkF0dHJzOiBQaWNrPENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlLCAnYXZhdGFycycgfCAndHlwZSc+XG4pOiBBcnJheTxBdmF0YXJEYXRhVHlwZT4ge1xuICBjb25zdCB7IGF2YXRhcnMgfSA9IGNvbnZlcnNhdGlvbkF0dHJzO1xuXG4gIGlmIChhdmF0YXJzICYmIGF2YXRhcnMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGF2YXRhcnM7XG4gIH1cblxuICBjb25zdCBpc0dyb3VwID0gIWlzRGlyZWN0Q29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbkF0dHJzKTtcblxuICByZXR1cm4gZ2V0RGVmYXVsdEF2YXRhcnMoaXNHcm91cCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsb0JBQWtDO0FBQ2xDLG9DQUFxQztBQUc5Qix1QkFDTCxtQkFDdUI7QUFDdkIsUUFBTSxFQUFFLFlBQVk7QUFFcEIsTUFBSSxXQUFXLFFBQVEsUUFBUTtBQUM3QixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sVUFBVSxDQUFDLHdEQUFxQixpQkFBaUI7QUFFdkQsU0FBTyxxQ0FBa0IsT0FBTztBQUNsQztBQVpnQiIsCiAgIm5hbWVzIjogW10KfQo=
