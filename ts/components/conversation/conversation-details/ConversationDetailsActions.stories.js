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
var ConversationDetailsActions_stories_exports = {};
__export(ConversationDetailsActions_stories_exports, {
  Basic: () => Basic,
  BlockedAndLeftTheGroup: () => BlockedAndLeftTheGroup,
  CannotLeaveBecauseYouAreTheLastAdmin: () => CannotLeaveBecauseYouAreTheLastAdmin,
  LeftTheGroup: () => LeftTheGroup,
  _11: () => _11,
  _11Blocked: () => _11Blocked,
  default: () => ConversationDetailsActions_stories_default
});
module.exports = __toCommonJS(ConversationDetailsActions_stories_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../../util/setupI18n");
var import_messages = __toESM(require("../../../../_locales/en/messages.json"));
var import_ConversationDetailsActions = require("./ConversationDetailsActions");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ConversationDetailsActions_stories_default = {
  title: "Components/Conversation/ConversationDetails/ConversationDetailsActions"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  cannotLeaveBecauseYouAreLastAdmin: (0, import_lodash.isBoolean)(overrideProps.cannotLeaveBecauseYouAreLastAdmin) ? overrideProps.cannotLeaveBecauseYouAreLastAdmin : false,
  conversationTitle: overrideProps.conversationTitle || "",
  left: (0, import_lodash.isBoolean)(overrideProps.left) ? overrideProps.left : false,
  onBlock: (0, import_addon_actions.action)("onBlock"),
  onLeave: (0, import_addon_actions.action)("onLeave"),
  onUnblock: (0, import_addon_actions.action)("onUnblock"),
  i18n,
  isBlocked: (0, import_lodash.isBoolean)(overrideProps.isBlocked),
  isGroup: true
}), "createProps");
const Basic = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_ConversationDetailsActions.ConversationDetailsActions, {
    ...props
  });
}, "Basic");
const LeftTheGroup = /* @__PURE__ */ __name(() => {
  const props = createProps({ left: true });
  return /* @__PURE__ */ React.createElement(import_ConversationDetailsActions.ConversationDetailsActions, {
    ...props
  });
}, "LeftTheGroup");
LeftTheGroup.story = {
  name: "Left the group"
};
const BlockedAndLeftTheGroup = /* @__PURE__ */ __name(() => {
  const props = createProps({
    left: true,
    isBlocked: true,
    conversationTitle: "\u{1F638} Cat Snaps"
  });
  return /* @__PURE__ */ React.createElement(import_ConversationDetailsActions.ConversationDetailsActions, {
    ...props
  });
}, "BlockedAndLeftTheGroup");
BlockedAndLeftTheGroup.story = {
  name: "Blocked and left the group"
};
const CannotLeaveBecauseYouAreTheLastAdmin = /* @__PURE__ */ __name(() => {
  const props = createProps({ cannotLeaveBecauseYouAreLastAdmin: true });
  return /* @__PURE__ */ React.createElement(import_ConversationDetailsActions.ConversationDetailsActions, {
    ...props
  });
}, "CannotLeaveBecauseYouAreTheLastAdmin");
CannotLeaveBecauseYouAreTheLastAdmin.story = {
  name: "Cannot leave because you are the last admin"
};
const _11 = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_ConversationDetailsActions.ConversationDetailsActions, {
  ...createProps(),
  isGroup: false
}), "_11");
_11.story = {
  name: "1:1"
};
const _11Blocked = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_ConversationDetailsActions.ConversationDetailsActions, {
  ...createProps(),
  isGroup: false,
  isBlocked: true
}), "_11Blocked");
_11Blocked.story = {
  name: "1:1 Blocked"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Basic,
  BlockedAndLeftTheGroup,
  CannotLeaveBecauseYouAreTheLastAdmin,
  LeftTheGroup,
  _11,
  _11Blocked
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uRGV0YWlsc0FjdGlvbnMuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgaXNCb29sZWFuIH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi9Db252ZXJzYXRpb25EZXRhaWxzQWN0aW9ucyc7XG5pbXBvcnQgeyBDb252ZXJzYXRpb25EZXRhaWxzQWN0aW9ucyB9IGZyb20gJy4vQ29udmVyc2F0aW9uRGV0YWlsc0FjdGlvbnMnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOlxuICAgICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9Db252ZXJzYXRpb25EZXRhaWxzL0NvbnZlcnNhdGlvbkRldGFpbHNBY3Rpb25zJyxcbn07XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHM+ID0ge30pOiBQcm9wcyA9PiAoe1xuICBjYW5ub3RMZWF2ZUJlY2F1c2VZb3VBcmVMYXN0QWRtaW46IGlzQm9vbGVhbihcbiAgICBvdmVycmlkZVByb3BzLmNhbm5vdExlYXZlQmVjYXVzZVlvdUFyZUxhc3RBZG1pblxuICApXG4gICAgPyBvdmVycmlkZVByb3BzLmNhbm5vdExlYXZlQmVjYXVzZVlvdUFyZUxhc3RBZG1pblxuICAgIDogZmFsc2UsXG4gIGNvbnZlcnNhdGlvblRpdGxlOiBvdmVycmlkZVByb3BzLmNvbnZlcnNhdGlvblRpdGxlIHx8ICcnLFxuICBsZWZ0OiBpc0Jvb2xlYW4ob3ZlcnJpZGVQcm9wcy5sZWZ0KSA/IG92ZXJyaWRlUHJvcHMubGVmdCA6IGZhbHNlLFxuICBvbkJsb2NrOiBhY3Rpb24oJ29uQmxvY2snKSxcbiAgb25MZWF2ZTogYWN0aW9uKCdvbkxlYXZlJyksXG4gIG9uVW5ibG9jazogYWN0aW9uKCdvblVuYmxvY2snKSxcbiAgaTE4bixcbiAgaXNCbG9ja2VkOiBpc0Jvb2xlYW4ob3ZlcnJpZGVQcm9wcy5pc0Jsb2NrZWQpLFxuICBpc0dyb3VwOiB0cnVlLFxufSk7XG5cbmV4cG9ydCBjb25zdCBCYXNpYyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoKTtcblxuICByZXR1cm4gPENvbnZlcnNhdGlvbkRldGFpbHNBY3Rpb25zIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgTGVmdFRoZUdyb3VwID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7IGxlZnQ6IHRydWUgfSk7XG5cbiAgcmV0dXJuIDxDb252ZXJzYXRpb25EZXRhaWxzQWN0aW9ucyB7Li4ucHJvcHN9IC8+O1xufTtcblxuTGVmdFRoZUdyb3VwLnN0b3J5ID0ge1xuICBuYW1lOiAnTGVmdCB0aGUgZ3JvdXAnLFxufTtcblxuZXhwb3J0IGNvbnN0IEJsb2NrZWRBbmRMZWZ0VGhlR3JvdXAgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBsZWZ0OiB0cnVlLFxuICAgIGlzQmxvY2tlZDogdHJ1ZSxcbiAgICBjb252ZXJzYXRpb25UaXRsZTogJ1x1RDgzRFx1REUzOCBDYXQgU25hcHMnLFxuICB9KTtcblxuICByZXR1cm4gPENvbnZlcnNhdGlvbkRldGFpbHNBY3Rpb25zIHsuLi5wcm9wc30gLz47XG59O1xuXG5CbG9ja2VkQW5kTGVmdFRoZUdyb3VwLnN0b3J5ID0ge1xuICBuYW1lOiAnQmxvY2tlZCBhbmQgbGVmdCB0aGUgZ3JvdXAnLFxufTtcblxuZXhwb3J0IGNvbnN0IENhbm5vdExlYXZlQmVjYXVzZVlvdUFyZVRoZUxhc3RBZG1pbiA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoeyBjYW5ub3RMZWF2ZUJlY2F1c2VZb3VBcmVMYXN0QWRtaW46IHRydWUgfSk7XG5cbiAgcmV0dXJuIDxDb252ZXJzYXRpb25EZXRhaWxzQWN0aW9ucyB7Li4ucHJvcHN9IC8+O1xufTtcblxuQ2Fubm90TGVhdmVCZWNhdXNlWW91QXJlVGhlTGFzdEFkbWluLnN0b3J5ID0ge1xuICBuYW1lOiAnQ2Fubm90IGxlYXZlIGJlY2F1c2UgeW91IGFyZSB0aGUgbGFzdCBhZG1pbicsXG59O1xuXG5leHBvcnQgY29uc3QgXzExID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENvbnZlcnNhdGlvbkRldGFpbHNBY3Rpb25zIHsuLi5jcmVhdGVQcm9wcygpfSBpc0dyb3VwPXtmYWxzZX0gLz5cbik7XG5cbl8xMS5zdG9yeSA9IHtcbiAgbmFtZTogJzE6MScsXG59O1xuXG5leHBvcnQgY29uc3QgXzExQmxvY2tlZCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDb252ZXJzYXRpb25EZXRhaWxzQWN0aW9ucyB7Li4uY3JlYXRlUHJvcHMoKX0gaXNHcm91cD17ZmFsc2V9IGlzQmxvY2tlZCAvPlxuKTtcblxuXzExQmxvY2tlZC5zdG9yeSA9IHtcbiAgbmFtZTogJzE6MSBCbG9ja2VkJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsb0JBQTBCO0FBRTFCLDJCQUF1QjtBQUV2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBRXZCLHdDQUEyQztBQUUzQyxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLDZDQUFRO0FBQUEsRUFDYixPQUNFO0FBQ0o7QUFFQSxNQUFNLGNBQWMsd0JBQUMsZ0JBQWdDLENBQUMsTUFBYztBQUFBLEVBQ2xFLG1DQUFtQyw2QkFDakMsY0FBYyxpQ0FDaEIsSUFDSSxjQUFjLG9DQUNkO0FBQUEsRUFDSixtQkFBbUIsY0FBYyxxQkFBcUI7QUFBQSxFQUN0RCxNQUFNLDZCQUFVLGNBQWMsSUFBSSxJQUFJLGNBQWMsT0FBTztBQUFBLEVBQzNELFNBQVMsaUNBQU8sU0FBUztBQUFBLEVBQ3pCLFNBQVMsaUNBQU8sU0FBUztBQUFBLEVBQ3pCLFdBQVcsaUNBQU8sV0FBVztBQUFBLEVBQzdCO0FBQUEsRUFDQSxXQUFXLDZCQUFVLGNBQWMsU0FBUztBQUFBLEVBQzVDLFNBQVM7QUFDWCxJQWRvQjtBQWdCYixNQUFNLFFBQVEsNkJBQW1CO0FBQ3RDLFFBQU0sUUFBUSxZQUFZO0FBRTFCLFNBQU8sb0NBQUM7QUFBQSxPQUErQjtBQUFBLEdBQU87QUFDaEQsR0FKcUI7QUFNZCxNQUFNLGVBQWUsNkJBQW1CO0FBQzdDLFFBQU0sUUFBUSxZQUFZLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFeEMsU0FBTyxvQ0FBQztBQUFBLE9BQStCO0FBQUEsR0FBTztBQUNoRCxHQUo0QjtBQU01QixhQUFhLFFBQVE7QUFBQSxFQUNuQixNQUFNO0FBQ1I7QUFFTyxNQUFNLHlCQUF5Qiw2QkFBbUI7QUFDdkQsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixNQUFNO0FBQUEsSUFDTixXQUFXO0FBQUEsSUFDWCxtQkFBbUI7QUFBQSxFQUNyQixDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQStCO0FBQUEsR0FBTztBQUNoRCxHQVJzQztBQVV0Qyx1QkFBdUIsUUFBUTtBQUFBLEVBQzdCLE1BQU07QUFDUjtBQUVPLE1BQU0sdUNBQXVDLDZCQUFtQjtBQUNyRSxRQUFNLFFBQVEsWUFBWSxFQUFFLG1DQUFtQyxLQUFLLENBQUM7QUFFckUsU0FBTyxvQ0FBQztBQUFBLE9BQStCO0FBQUEsR0FBTztBQUNoRCxHQUpvRDtBQU1wRCxxQ0FBcUMsUUFBUTtBQUFBLEVBQzNDLE1BQU07QUFDUjtBQUVPLE1BQU0sTUFBTSw2QkFDakIsb0NBQUM7QUFBQSxLQUErQixZQUFZO0FBQUEsRUFBRyxTQUFTO0FBQUEsQ0FBTyxHQUQ5QztBQUluQixJQUFJLFFBQVE7QUFBQSxFQUNWLE1BQU07QUFDUjtBQUVPLE1BQU0sYUFBYSw2QkFDeEIsb0NBQUM7QUFBQSxLQUErQixZQUFZO0FBQUEsRUFBRyxTQUFTO0FBQUEsRUFBTyxXQUFTO0FBQUEsQ0FBQyxHQURqRDtBQUkxQixXQUFXLFFBQVE7QUFBQSxFQUNqQixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
