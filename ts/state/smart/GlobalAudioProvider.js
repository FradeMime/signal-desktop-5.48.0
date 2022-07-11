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
var GlobalAudioProvider_exports = {};
__export(GlobalAudioProvider_exports, {
  SmartGlobalAudioProvider: () => SmartGlobalAudioProvider
});
module.exports = __toCommonJS(GlobalAudioProvider_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_GlobalAudioContext = require("../../components/GlobalAudioContext");
var import_audioPlayer = require("../selectors/audioPlayer");
var import_conversations = require("../selectors/conversations");
const mapStateToProps = /* @__PURE__ */ __name((state) => {
  return {
    conversationId: (0, import_conversations.getSelectedConversationId)(state),
    isPaused: (0, import_audioPlayer.isPaused)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartGlobalAudioProvider = smart(import_GlobalAudioContext.GlobalAudioProvider);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartGlobalAudioProvider
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR2xvYmFsQXVkaW9Qcm92aWRlci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG1hcERpc3BhdGNoVG9Qcm9wcyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgR2xvYmFsQXVkaW9Qcm92aWRlciB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvR2xvYmFsQXVkaW9Db250ZXh0JztcbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgeyBpc1BhdXNlZCB9IGZyb20gJy4uL3NlbGVjdG9ycy9hdWRpb1BsYXllcic7XG5pbXBvcnQgeyBnZXRTZWxlY3RlZENvbnZlcnNhdGlvbklkIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbnZlcnNhdGlvbnMnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGU6IFN0YXRlVHlwZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGNvbnZlcnNhdGlvbklkOiBnZXRTZWxlY3RlZENvbnZlcnNhdGlvbklkKHN0YXRlKSxcbiAgICBpc1BhdXNlZDogaXNQYXVzZWQoc3RhdGUpLFxuICB9O1xufTtcblxuY29uc3Qgc21hcnQgPSBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKTtcblxuZXhwb3J0IGNvbnN0IFNtYXJ0R2xvYmFsQXVkaW9Qcm92aWRlciA9IHNtYXJ0KEdsb2JhbEF1ZGlvUHJvdmlkZXIpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHlCQUF3QjtBQUN4QixxQkFBbUM7QUFDbkMsZ0NBQW9DO0FBRXBDLHlCQUF5QjtBQUN6QiwyQkFBMEM7QUFFMUMsTUFBTSxrQkFBa0Isd0JBQUMsVUFBcUI7QUFDNUMsU0FBTztBQUFBLElBQ0wsZ0JBQWdCLG9EQUEwQixLQUFLO0FBQUEsSUFDL0MsVUFBVSxpQ0FBUyxLQUFLO0FBQUEsRUFDMUI7QUFDRixHQUx3QjtBQU94QixNQUFNLFFBQVEsZ0NBQVEsaUJBQWlCLGlDQUFrQjtBQUVsRCxNQUFNLDJCQUEyQixNQUFNLDZDQUFtQjsiLAogICJuYW1lcyI6IFtdCn0K
