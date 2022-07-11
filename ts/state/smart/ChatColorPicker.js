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
var ChatColorPicker_exports = {};
__export(ChatColorPicker_exports, {
  SmartChatColorPicker: () => SmartChatColorPicker
});
module.exports = __toCommonJS(ChatColorPicker_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_ChatColorPicker = require("../../components/ChatColorPicker");
var import_conversations = require("../selectors/conversations");
var import_user = require("../selectors/user");
var import_getConversationColorAttributes = require("../../util/getConversationColorAttributes");
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  const conversation = props.conversationId ? (0, import_conversations.getConversationSelector)(state)(props.conversationId) : {};
  const colorValues = (0, import_getConversationColorAttributes.getConversationColorAttributes)(conversation);
  const { customColors } = state.items;
  return {
    ...props,
    customColors: customColors ? customColors.colors : {},
    getConversationsWithCustomColor: (colorId) => Promise.resolve((0, import_conversations.getConversationsWithCustomColorSelector)(state)(colorId)),
    i18n: (0, import_user.getIntl)(state),
    selectedColor: colorValues.conversationColor,
    selectedCustomColor: {
      id: colorValues.customColorId,
      value: colorValues.customColor
    }
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartChatColorPicker = smart(import_ChatColorPicker.ChatColorPicker);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartChatColorPicker
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2hhdENvbG9yUGlja2VyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBtYXBEaXNwYXRjaFRvUHJvcHMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB0eXBlIHsgUHJvcHNEYXRhVHlwZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2hhdENvbG9yUGlja2VyJztcbmltcG9ydCB7IENoYXRDb2xvclBpY2tlciB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2hhdENvbG9yUGlja2VyJztcbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQge1xuICBnZXRDb252ZXJzYXRpb25TZWxlY3RvcixcbiAgZ2V0Q29udmVyc2F0aW9uc1dpdGhDdXN0b21Db2xvclNlbGVjdG9yLFxufSBmcm9tICcuLi9zZWxlY3RvcnMvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBnZXRJbnRsIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3VzZXInO1xuaW1wb3J0IHsgZ2V0Q29udmVyc2F0aW9uQ29sb3JBdHRyaWJ1dGVzIH0gZnJvbSAnLi4vLi4vdXRpbC9nZXRDb252ZXJzYXRpb25Db2xvckF0dHJpYnV0ZXMnO1xuXG5leHBvcnQgdHlwZSBTbWFydENoYXRDb2xvclBpY2tlclByb3BzID0ge1xuICBjb252ZXJzYXRpb25JZD86IHN0cmluZztcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChcbiAgc3RhdGU6IFN0YXRlVHlwZSxcbiAgcHJvcHM6IFNtYXJ0Q2hhdENvbG9yUGlja2VyUHJvcHNcbik6IFByb3BzRGF0YVR5cGUgPT4ge1xuICBjb25zdCBjb252ZXJzYXRpb24gPSBwcm9wcy5jb252ZXJzYXRpb25JZFxuICAgID8gZ2V0Q29udmVyc2F0aW9uU2VsZWN0b3Ioc3RhdGUpKHByb3BzLmNvbnZlcnNhdGlvbklkKVxuICAgIDoge307XG4gIGNvbnN0IGNvbG9yVmFsdWVzID0gZ2V0Q29udmVyc2F0aW9uQ29sb3JBdHRyaWJ1dGVzKGNvbnZlcnNhdGlvbik7XG5cbiAgY29uc3QgeyBjdXN0b21Db2xvcnMgfSA9IHN0YXRlLml0ZW1zO1xuXG4gIHJldHVybiB7XG4gICAgLi4ucHJvcHMsXG4gICAgY3VzdG9tQ29sb3JzOiBjdXN0b21Db2xvcnMgPyBjdXN0b21Db2xvcnMuY29sb3JzIDoge30sXG4gICAgZ2V0Q29udmVyc2F0aW9uc1dpdGhDdXN0b21Db2xvcjogKGNvbG9ySWQ6IHN0cmluZykgPT5cbiAgICAgIFByb21pc2UucmVzb2x2ZShnZXRDb252ZXJzYXRpb25zV2l0aEN1c3RvbUNvbG9yU2VsZWN0b3Ioc3RhdGUpKGNvbG9ySWQpKSxcbiAgICBpMThuOiBnZXRJbnRsKHN0YXRlKSxcbiAgICBzZWxlY3RlZENvbG9yOiBjb2xvclZhbHVlcy5jb252ZXJzYXRpb25Db2xvcixcbiAgICBzZWxlY3RlZEN1c3RvbUNvbG9yOiB7XG4gICAgICBpZDogY29sb3JWYWx1ZXMuY3VzdG9tQ29sb3JJZCxcbiAgICAgIHZhbHVlOiBjb2xvclZhbHVlcy5jdXN0b21Db2xvcixcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3Qgc21hcnQgPSBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKTtcblxuZXhwb3J0IGNvbnN0IFNtYXJ0Q2hhdENvbG9yUGlja2VyID0gc21hcnQoQ2hhdENvbG9yUGlja2VyKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSx5QkFBd0I7QUFFeEIscUJBQW1DO0FBRW5DLDZCQUFnQztBQUVoQywyQkFHTztBQUNQLGtCQUF3QjtBQUN4Qiw0Q0FBK0M7QUFNL0MsTUFBTSxrQkFBa0Isd0JBQ3RCLE9BQ0EsVUFDa0I7QUFDbEIsUUFBTSxlQUFlLE1BQU0saUJBQ3ZCLGtEQUF3QixLQUFLLEVBQUUsTUFBTSxjQUFjLElBQ25ELENBQUM7QUFDTCxRQUFNLGNBQWMsMEVBQStCLFlBQVk7QUFFL0QsUUFBTSxFQUFFLGlCQUFpQixNQUFNO0FBRS9CLFNBQU87QUFBQSxPQUNGO0FBQUEsSUFDSCxjQUFjLGVBQWUsYUFBYSxTQUFTLENBQUM7QUFBQSxJQUNwRCxpQ0FBaUMsQ0FBQyxZQUNoQyxRQUFRLFFBQVEsa0VBQXdDLEtBQUssRUFBRSxPQUFPLENBQUM7QUFBQSxJQUN6RSxNQUFNLHlCQUFRLEtBQUs7QUFBQSxJQUNuQixlQUFlLFlBQVk7QUFBQSxJQUMzQixxQkFBcUI7QUFBQSxNQUNuQixJQUFJLFlBQVk7QUFBQSxNQUNoQixPQUFPLFlBQVk7QUFBQSxJQUNyQjtBQUFBLEVBQ0Y7QUFDRixHQXZCd0I7QUF5QnhCLE1BQU0sUUFBUSxnQ0FBUSxpQkFBaUIsaUNBQWtCO0FBRWxELE1BQU0sdUJBQXVCLE1BQU0sc0NBQWU7IiwKICAibmFtZXMiOiBbXQp9Cg==
