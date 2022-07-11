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
var ConversationDetailsHeader_stories_exports = {};
__export(ConversationDetailsHeader_stories_exports, {
  Basic: () => Basic,
  BasicNoDescription: () => BasicNoDescription,
  Editable: () => Editable,
  EditableNoDescription: () => EditableNoDescription,
  NoteToSelf: () => NoteToSelf,
  _11: () => _11,
  default: () => ConversationDetailsHeader_stories_default
});
module.exports = __toCommonJS(ConversationDetailsHeader_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_getDefaultConversation = require("../../../test-both/helpers/getDefaultConversation");
var import_getFakeBadge = require("../../../test-both/helpers/getFakeBadge");
var import_setupI18n = require("../../../util/setupI18n");
var import_messages = __toESM(require("../../../../_locales/en/messages.json"));
var import_StorybookThemeContext = require("../../../../.storybook/StorybookThemeContext");
var import_ConversationDetailsHeader = require("./ConversationDetailsHeader");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ConversationDetailsHeader_stories_default = {
  title: "Components/Conversation/ConversationDetails/ConversationDetailsHeader"
};
const createConversation = /* @__PURE__ */ __name(() => (0, import_getDefaultConversation.getDefaultConversation)({
  id: "",
  type: "group",
  lastUpdated: 0,
  title: (0, import_addon_knobs.text)("conversation title", "Some Conversation"),
  groupDescription: (0, import_addon_knobs.text)("description", "This is a group description. https://www.signal.org")
}), "createConversation");
const Wrapper = /* @__PURE__ */ __name((overrideProps) => {
  const theme = React.useContext(import_StorybookThemeContext.StorybookThemeContext);
  return /* @__PURE__ */ React.createElement(import_ConversationDetailsHeader.ConversationDetailsHeader, {
    areWeASubscriber: false,
    conversation: createConversation(),
    i18n,
    canEdit: false,
    startEditing: (0, import_addon_actions.action)("startEditing"),
    memberships: new Array((0, import_addon_knobs.number)("conversation members length", 0)),
    isGroup: true,
    isMe: false,
    theme,
    ...overrideProps
  });
}, "Wrapper");
const Basic = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(Wrapper, null), "Basic");
const Editable = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(Wrapper, {
  canEdit: true
}), "Editable");
const BasicNoDescription = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(Wrapper, {
  conversation: (0, import_getDefaultConversation.getDefaultConversation)({
    title: "My Group",
    type: "group"
  })
}), "BasicNoDescription");
BasicNoDescription.story = {
  name: "Basic no-description"
};
const EditableNoDescription = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(Wrapper, {
  conversation: (0, import_getDefaultConversation.getDefaultConversation)({
    title: "My Group",
    type: "group"
  })
}), "EditableNoDescription");
EditableNoDescription.story = {
  name: "Editable no-description"
};
const _11 = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(Wrapper, {
  isGroup: false,
  badges: (0, import_getFakeBadge.getFakeBadges)(3)
}), "_11");
_11.story = {
  name: "1:1"
};
const NoteToSelf = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(Wrapper, {
  isMe: true
}), "NoteToSelf");
NoteToSelf.story = {
  name: "Note to self"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Basic,
  BasicNoDescription,
  Editable,
  EditableNoDescription,
  NoteToSelf,
  _11
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uRGV0YWlsc0hlYWRlci5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBudW1iZXIsIHRleHQgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbiB9IGZyb20gJy4uLy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgZ2V0RmFrZUJhZGdlcyB9IGZyb20gJy4uLy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldEZha2VCYWRnZSc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7IFN0b3J5Ym9va1RoZW1lQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uLy4uLy5zdG9yeWJvb2svU3Rvcnlib29rVGhlbWVDb250ZXh0JztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi9Db252ZXJzYXRpb25EZXRhaWxzSGVhZGVyJztcbmltcG9ydCB7IENvbnZlcnNhdGlvbkRldGFpbHNIZWFkZXIgfSBmcm9tICcuL0NvbnZlcnNhdGlvbkRldGFpbHNIZWFkZXInO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOlxuICAgICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9Db252ZXJzYXRpb25EZXRhaWxzL0NvbnZlcnNhdGlvbkRldGFpbHNIZWFkZXInLFxufTtcblxuY29uc3QgY3JlYXRlQ29udmVyc2F0aW9uID0gKCk6IENvbnZlcnNhdGlvblR5cGUgPT5cbiAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgaWQ6ICcnLFxuICAgIHR5cGU6ICdncm91cCcsXG4gICAgbGFzdFVwZGF0ZWQ6IDAsXG4gICAgdGl0bGU6IHRleHQoJ2NvbnZlcnNhdGlvbiB0aXRsZScsICdTb21lIENvbnZlcnNhdGlvbicpLFxuICAgIGdyb3VwRGVzY3JpcHRpb246IHRleHQoXG4gICAgICAnZGVzY3JpcHRpb24nLFxuICAgICAgJ1RoaXMgaXMgYSBncm91cCBkZXNjcmlwdGlvbi4gaHR0cHM6Ly93d3cuc2lnbmFsLm9yZydcbiAgICApLFxuICB9KTtcblxuY29uc3QgV3JhcHBlciA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzPikgPT4ge1xuICBjb25zdCB0aGVtZSA9IFJlYWN0LnVzZUNvbnRleHQoU3Rvcnlib29rVGhlbWVDb250ZXh0KTtcblxuICByZXR1cm4gKFxuICAgIDxDb252ZXJzYXRpb25EZXRhaWxzSGVhZGVyXG4gICAgICBhcmVXZUFTdWJzY3JpYmVyPXtmYWxzZX1cbiAgICAgIGNvbnZlcnNhdGlvbj17Y3JlYXRlQ29udmVyc2F0aW9uKCl9XG4gICAgICBpMThuPXtpMThufVxuICAgICAgY2FuRWRpdD17ZmFsc2V9XG4gICAgICBzdGFydEVkaXRpbmc9e2FjdGlvbignc3RhcnRFZGl0aW5nJyl9XG4gICAgICBtZW1iZXJzaGlwcz17bmV3IEFycmF5KG51bWJlcignY29udmVyc2F0aW9uIG1lbWJlcnMgbGVuZ3RoJywgMCkpfVxuICAgICAgaXNHcm91cFxuICAgICAgaXNNZT17ZmFsc2V9XG4gICAgICB0aGVtZT17dGhlbWV9XG4gICAgICB7Li4ub3ZlcnJpZGVQcm9wc31cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IEJhc2ljID0gKCk6IEpTWC5FbGVtZW50ID0+IDxXcmFwcGVyIC8+O1xuZXhwb3J0IGNvbnN0IEVkaXRhYmxlID0gKCk6IEpTWC5FbGVtZW50ID0+IDxXcmFwcGVyIGNhbkVkaXQgLz47XG5cbmV4cG9ydCBjb25zdCBCYXNpY05vRGVzY3JpcHRpb24gPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8V3JhcHBlclxuICAgIGNvbnZlcnNhdGlvbj17Z2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICB0aXRsZTogJ015IEdyb3VwJyxcbiAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5CYXNpY05vRGVzY3JpcHRpb24uc3RvcnkgPSB7XG4gIG5hbWU6ICdCYXNpYyBuby1kZXNjcmlwdGlvbicsXG59O1xuXG5leHBvcnQgY29uc3QgRWRpdGFibGVOb0Rlc2NyaXB0aW9uID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFdyYXBwZXJcbiAgICBjb252ZXJzYXRpb249e2dldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgdGl0bGU6ICdNeSBHcm91cCcsXG4gICAgICB0eXBlOiAnZ3JvdXAnLFxuICAgIH0pfVxuICAvPlxuKTtcblxuRWRpdGFibGVOb0Rlc2NyaXB0aW9uLnN0b3J5ID0ge1xuICBuYW1lOiAnRWRpdGFibGUgbm8tZGVzY3JpcHRpb24nLFxufTtcblxuZXhwb3J0IGNvbnN0IF8xMSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxXcmFwcGVyIGlzR3JvdXA9e2ZhbHNlfSBiYWRnZXM9e2dldEZha2VCYWRnZXMoMyl9IC8+XG4pO1xuXG5fMTEuc3RvcnkgPSB7XG4gIG5hbWU6ICcxOjEnLFxufTtcblxuZXhwb3J0IGNvbnN0IE5vdGVUb1NlbGYgPSAoKTogSlNYLkVsZW1lbnQgPT4gPFdyYXBwZXIgaXNNZSAvPjtcblxuTm90ZVRvU2VsZi5zdG9yeSA9IHtcbiAgbmFtZTogJ05vdGUgdG8gc2VsZicsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLDJCQUF1QjtBQUN2Qix5QkFBNkI7QUFFN0Isb0NBQXVDO0FBQ3ZDLDBCQUE4QjtBQUM5Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLG1DQUFzQztBQUl0Qyx1Q0FBMEM7QUFFMUMsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTyw0Q0FBUTtBQUFBLEVBQ2IsT0FDRTtBQUNKO0FBRUEsTUFBTSxxQkFBcUIsNkJBQ3pCLDBEQUF1QjtBQUFBLEVBQ3JCLElBQUk7QUFBQSxFQUNKLE1BQU07QUFBQSxFQUNOLGFBQWE7QUFBQSxFQUNiLE9BQU8sNkJBQUssc0JBQXNCLG1CQUFtQjtBQUFBLEVBQ3JELGtCQUFrQiw2QkFDaEIsZUFDQSxxREFDRjtBQUNGLENBQUMsR0FWd0I7QUFZM0IsTUFBTSxVQUFVLHdCQUFDLGtCQUFrQztBQUNqRCxRQUFNLFFBQVEsTUFBTSxXQUFXLGtEQUFxQjtBQUVwRCxTQUNFLG9DQUFDO0FBQUEsSUFDQyxrQkFBa0I7QUFBQSxJQUNsQixjQUFjLG1CQUFtQjtBQUFBLElBQ2pDO0FBQUEsSUFDQSxTQUFTO0FBQUEsSUFDVCxjQUFjLGlDQUFPLGNBQWM7QUFBQSxJQUNuQyxhQUFhLElBQUksTUFBTSwrQkFBTywrQkFBK0IsQ0FBQyxDQUFDO0FBQUEsSUFDL0QsU0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ047QUFBQSxPQUNJO0FBQUEsR0FDTjtBQUVKLEdBakJnQjtBQW1CVCxNQUFNLFFBQVEsNkJBQW1CLG9DQUFDLGFBQVEsR0FBNUI7QUFDZCxNQUFNLFdBQVcsNkJBQW1CLG9DQUFDO0FBQUEsRUFBUSxTQUFPO0FBQUEsQ0FBQyxHQUFwQztBQUVqQixNQUFNLHFCQUFxQiw2QkFDaEMsb0NBQUM7QUFBQSxFQUNDLGNBQWMsMERBQXVCO0FBQUEsSUFDbkMsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUFBLENBQ0gsR0FOZ0M7QUFTbEMsbUJBQW1CLFFBQVE7QUFBQSxFQUN6QixNQUFNO0FBQ1I7QUFFTyxNQUFNLHdCQUF3Qiw2QkFDbkMsb0NBQUM7QUFBQSxFQUNDLGNBQWMsMERBQXVCO0FBQUEsSUFDbkMsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUFBLENBQ0gsR0FObUM7QUFTckMsc0JBQXNCLFFBQVE7QUFBQSxFQUM1QixNQUFNO0FBQ1I7QUFFTyxNQUFNLE1BQU0sNkJBQ2pCLG9DQUFDO0FBQUEsRUFBUSxTQUFTO0FBQUEsRUFBTyxRQUFRLHVDQUFjLENBQUM7QUFBQSxDQUFHLEdBRGxDO0FBSW5CLElBQUksUUFBUTtBQUFBLEVBQ1YsTUFBTTtBQUNSO0FBRU8sTUFBTSxhQUFhLDZCQUFtQixvQ0FBQztBQUFBLEVBQVEsTUFBSTtBQUFBLENBQUMsR0FBakM7QUFFMUIsV0FBVyxRQUFRO0FBQUEsRUFDakIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
