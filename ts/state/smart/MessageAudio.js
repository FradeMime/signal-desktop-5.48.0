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
var MessageAudio_exports = {};
__export(MessageAudio_exports, {
  SmartMessageAudio: () => SmartMessageAudio
});
module.exports = __toCommonJS(MessageAudio_exports);
var import_react_redux = require("react-redux");
var import_MessageAudio = require("../../components/conversation/MessageAudio");
var import_actions = require("../actions");
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  return {
    ...props,
    ...state.audioPlayer
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartMessageAudio = smart(import_MessageAudio.MessageAudio);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartMessageAudio
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZUF1ZGlvLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IE1lc3NhZ2VBdWRpbyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL01lc3NhZ2VBdWRpbyc7XG5pbXBvcnQgdHlwZSB7IENvbXB1dGVQZWFrc1Jlc3VsdCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvR2xvYmFsQXVkaW9Db250ZXh0JztcblxuaW1wb3J0IHsgbWFwRGlzcGF0Y2hUb1Byb3BzIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgdHlwZSB7IEF0dGFjaG1lbnRUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgdHlwZSB7XG4gIERpcmVjdGlvblR5cGUsXG4gIE1lc3NhZ2VTdGF0dXNUeXBlLFxufSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbnZlcnNhdGlvbi9NZXNzYWdlJztcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSB7XG4gIGF1ZGlvOiBIVE1MQXVkaW9FbGVtZW50O1xuXG4gIHJlbmRlcmluZ0NvbnRleHQ6IHN0cmluZztcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgYXR0YWNobWVudDogQXR0YWNobWVudFR5cGU7XG4gIGNvbGxhcHNlTWV0YWRhdGE6IGJvb2xlYW47XG4gIHdpdGhDb250ZW50QWJvdmU6IGJvb2xlYW47XG4gIHdpdGhDb250ZW50QmVsb3c6IGJvb2xlYW47XG5cbiAgZGlyZWN0aW9uOiBEaXJlY3Rpb25UeXBlO1xuICBleHBpcmF0aW9uTGVuZ3RoPzogbnVtYmVyO1xuICBleHBpcmF0aW9uVGltZXN0YW1wPzogbnVtYmVyO1xuICBpZDogc3RyaW5nO1xuICBwbGF5ZWQ6IGJvb2xlYW47XG4gIHNob3dNZXNzYWdlRGV0YWlsOiAoaWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgc3RhdHVzPzogTWVzc2FnZVN0YXR1c1R5cGU7XG4gIHRleHRQZW5kaW5nPzogYm9vbGVhbjtcbiAgdGltZXN0YW1wOiBudW1iZXI7XG5cbiAgYnV0dG9uUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEJ1dHRvbkVsZW1lbnQ+O1xuXG4gIGNvbXB1dGVQZWFrcyh1cmw6IHN0cmluZywgYmFyQ291bnQ6IG51bWJlcik6IFByb21pc2U8Q29tcHV0ZVBlYWtzUmVzdWx0PjtcbiAga2lja09mZkF0dGFjaG1lbnREb3dubG9hZCgpOiB2b2lkO1xuICBvbkNvcnJ1cHRlZCgpOiB2b2lkO1xuICBvbkZpcnN0UGxheWVkKCk6IHZvaWQ7XG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGU6IFN0YXRlVHlwZSwgcHJvcHM6IFByb3BzKSA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4ucHJvcHMsXG4gICAgLi4uc3RhdGUuYXVkaW9QbGF5ZXIsXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuZXhwb3J0IGNvbnN0IFNtYXJ0TWVzc2FnZUF1ZGlvID0gc21hcnQoTWVzc2FnZUF1ZGlvKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSx5QkFBd0I7QUFFeEIsMEJBQTZCO0FBRzdCLHFCQUFtQztBQXFDbkMsTUFBTSxrQkFBa0Isd0JBQUMsT0FBa0IsVUFBaUI7QUFDMUQsU0FBTztBQUFBLE9BQ0Y7QUFBQSxPQUNBLE1BQU07QUFBQSxFQUNYO0FBQ0YsR0FMd0I7QUFPeEIsTUFBTSxRQUFRLGdDQUFRLGlCQUFpQixpQ0FBa0I7QUFDbEQsTUFBTSxvQkFBb0IsTUFBTSxnQ0FBWTsiLAogICJuYW1lcyI6IFtdCn0K
