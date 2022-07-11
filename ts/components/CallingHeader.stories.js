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
var CallingHeader_stories_exports = {};
__export(CallingHeader_stories_exports, {
  Default: () => Default,
  LobbyStyle: () => LobbyStyle,
  LongTitle: () => LongTitle,
  TitleWithMessage: () => TitleWithMessage,
  WithParticipants: () => WithParticipants,
  WithParticipantsShown: () => WithParticipantsShown,
  default: () => CallingHeader_stories_default
});
module.exports = __toCommonJS(CallingHeader_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_CallingHeader = require("./CallingHeader");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  isGroupCall: (0, import_addon_knobs.boolean)("isGroupCall", Boolean(overrideProps.isGroupCall)),
  message: overrideProps.message,
  participantCount: (0, import_addon_knobs.number)("participantCount", overrideProps.participantCount || 0),
  showParticipantsList: (0, import_addon_knobs.boolean)("showParticipantsList", Boolean(overrideProps.showParticipantsList)),
  title: overrideProps.title || "With Someone",
  toggleParticipants: () => (0, import_addon_actions.action)("toggle-participants"),
  togglePip: () => (0, import_addon_actions.action)("toggle-pip"),
  toggleSettings: () => (0, import_addon_actions.action)("toggle-settings")
}), "createProps");
var CallingHeader_stories_default = {
  title: "Components/CallingHeader"
};
const Default = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingHeader.CallingHeader, {
  ...createProps()
}), "Default");
const LobbyStyle = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingHeader.CallingHeader, {
  ...createProps(),
  title: void 0,
  togglePip: void 0,
  onCancel: (0, import_addon_actions.action)("onClose")
}), "LobbyStyle");
LobbyStyle.story = {
  name: "Lobby style"
};
const WithParticipants = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingHeader.CallingHeader, {
  ...createProps({
    isGroupCall: true,
    participantCount: 10
  })
}), "WithParticipants");
const WithParticipantsShown = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingHeader.CallingHeader, {
  ...createProps({
    isGroupCall: true,
    participantCount: 10,
    showParticipantsList: true
  })
}), "WithParticipantsShown");
WithParticipantsShown.story = {
  name: "With Participants (shown)"
};
const LongTitle = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingHeader.CallingHeader, {
  ...createProps({
    title: "What do I got to, what do I got to do to wake you up? To shake you up, to break the structure up?"
  })
}), "LongTitle");
const TitleWithMessage = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingHeader.CallingHeader, {
  ...createProps({
    title: "Hello world",
    message: "Goodbye earth"
  })
}), "TitleWithMessage");
TitleWithMessage.story = {
  name: "Title with message"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default,
  LobbyStyle,
  LongTitle,
  TitleWithMessage,
  WithParticipants,
  WithParticipantsShown
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ0hlYWRlci5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGJvb2xlYW4sIG51bWJlciB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL0NhbGxpbmdIZWFkZXInO1xuaW1wb3J0IHsgQ2FsbGluZ0hlYWRlciB9IGZyb20gJy4vQ2FsbGluZ0hlYWRlcic7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wc1R5cGU+ID0ge30pOiBQcm9wc1R5cGUgPT4gKHtcbiAgaTE4bixcbiAgaXNHcm91cENhbGw6IGJvb2xlYW4oJ2lzR3JvdXBDYWxsJywgQm9vbGVhbihvdmVycmlkZVByb3BzLmlzR3JvdXBDYWxsKSksXG4gIG1lc3NhZ2U6IG92ZXJyaWRlUHJvcHMubWVzc2FnZSxcbiAgcGFydGljaXBhbnRDb3VudDogbnVtYmVyKFxuICAgICdwYXJ0aWNpcGFudENvdW50JyxcbiAgICBvdmVycmlkZVByb3BzLnBhcnRpY2lwYW50Q291bnQgfHwgMFxuICApLFxuICBzaG93UGFydGljaXBhbnRzTGlzdDogYm9vbGVhbihcbiAgICAnc2hvd1BhcnRpY2lwYW50c0xpc3QnLFxuICAgIEJvb2xlYW4ob3ZlcnJpZGVQcm9wcy5zaG93UGFydGljaXBhbnRzTGlzdClcbiAgKSxcbiAgdGl0bGU6IG92ZXJyaWRlUHJvcHMudGl0bGUgfHwgJ1dpdGggU29tZW9uZScsXG4gIHRvZ2dsZVBhcnRpY2lwYW50czogKCkgPT4gYWN0aW9uKCd0b2dnbGUtcGFydGljaXBhbnRzJyksXG4gIHRvZ2dsZVBpcDogKCkgPT4gYWN0aW9uKCd0b2dnbGUtcGlwJyksXG4gIHRvZ2dsZVNldHRpbmdzOiAoKSA9PiBhY3Rpb24oJ3RvZ2dsZS1zZXR0aW5ncycpLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NhbGxpbmdIZWFkZXInLFxufTtcblxuZXhwb3J0IGNvbnN0IERlZmF1bHQgPSAoKTogSlNYLkVsZW1lbnQgPT4gPENhbGxpbmdIZWFkZXIgey4uLmNyZWF0ZVByb3BzKCl9IC8+O1xuXG5leHBvcnQgY29uc3QgTG9iYnlTdHlsZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsaW5nSGVhZGVyXG4gICAgey4uLmNyZWF0ZVByb3BzKCl9XG4gICAgdGl0bGU9e3VuZGVmaW5lZH1cbiAgICB0b2dnbGVQaXA9e3VuZGVmaW5lZH1cbiAgICBvbkNhbmNlbD17YWN0aW9uKCdvbkNsb3NlJyl9XG4gIC8+XG4pO1xuXG5Mb2JieVN0eWxlLnN0b3J5ID0ge1xuICBuYW1lOiAnTG9iYnkgc3R5bGUnLFxufTtcblxuZXhwb3J0IGNvbnN0IFdpdGhQYXJ0aWNpcGFudHMgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q2FsbGluZ0hlYWRlclxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBpc0dyb3VwQ2FsbDogdHJ1ZSxcbiAgICAgIHBhcnRpY2lwYW50Q291bnQ6IDEwLFxuICAgIH0pfVxuICAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IFdpdGhQYXJ0aWNpcGFudHNTaG93biA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsaW5nSGVhZGVyXG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIGlzR3JvdXBDYWxsOiB0cnVlLFxuICAgICAgcGFydGljaXBhbnRDb3VudDogMTAsXG4gICAgICBzaG93UGFydGljaXBhbnRzTGlzdDogdHJ1ZSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbldpdGhQYXJ0aWNpcGFudHNTaG93bi5zdG9yeSA9IHtcbiAgbmFtZTogJ1dpdGggUGFydGljaXBhbnRzIChzaG93biknLFxufTtcblxuZXhwb3J0IGNvbnN0IExvbmdUaXRsZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsaW5nSGVhZGVyXG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIHRpdGxlOlxuICAgICAgICAnV2hhdCBkbyBJIGdvdCB0bywgd2hhdCBkbyBJIGdvdCB0byBkbyB0byB3YWtlIHlvdSB1cD8gVG8gc2hha2UgeW91IHVwLCB0byBicmVhayB0aGUgc3RydWN0dXJlIHVwPycsXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgVGl0bGVXaXRoTWVzc2FnZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsaW5nSGVhZGVyXG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIHRpdGxlOiAnSGVsbG8gd29ybGQnLFxuICAgICAgbWVzc2FnZTogJ0dvb2RieWUgZWFydGgnLFxuICAgIH0pfVxuICAvPlxuKTtcblxuVGl0bGVXaXRoTWVzc2FnZS5zdG9yeSA9IHtcbiAgbmFtZTogJ1RpdGxlIHdpdGggbWVzc2FnZScsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHlCQUFnQztBQUNoQywyQkFBdUI7QUFHdkIsMkJBQThCO0FBQzlCLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFFdkIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsTUFBTSxjQUFjLHdCQUFDLGdCQUFvQyxDQUFDLE1BQWtCO0FBQUEsRUFDMUU7QUFBQSxFQUNBLGFBQWEsZ0NBQVEsZUFBZSxRQUFRLGNBQWMsV0FBVyxDQUFDO0FBQUEsRUFDdEUsU0FBUyxjQUFjO0FBQUEsRUFDdkIsa0JBQWtCLCtCQUNoQixvQkFDQSxjQUFjLG9CQUFvQixDQUNwQztBQUFBLEVBQ0Esc0JBQXNCLGdDQUNwQix3QkFDQSxRQUFRLGNBQWMsb0JBQW9CLENBQzVDO0FBQUEsRUFDQSxPQUFPLGNBQWMsU0FBUztBQUFBLEVBQzlCLG9CQUFvQixNQUFNLGlDQUFPLHFCQUFxQjtBQUFBLEVBQ3RELFdBQVcsTUFBTSxpQ0FBTyxZQUFZO0FBQUEsRUFDcEMsZ0JBQWdCLE1BQU0saUNBQU8saUJBQWlCO0FBQ2hELElBaEJvQjtBQWtCcEIsSUFBTyxnQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxVQUFVLDZCQUFtQixvQ0FBQztBQUFBLEtBQWtCLFlBQVk7QUFBQSxDQUFHLEdBQXJEO0FBRWhCLE1BQU0sYUFBYSw2QkFDeEIsb0NBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxFQUNoQixPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQUEsRUFDWCxVQUFVLGlDQUFPLFNBQVM7QUFBQSxDQUM1QixHQU53QjtBQVMxQixXQUFXLFFBQVE7QUFBQSxFQUNqQixNQUFNO0FBQ1I7QUFFTyxNQUFNLG1CQUFtQiw2QkFDOUIsb0NBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGtCQUFrQjtBQUFBLEVBQ3BCLENBQUM7QUFBQSxDQUNILEdBTjhCO0FBU3pCLE1BQU0sd0JBQXdCLDZCQUNuQyxvQ0FBQztBQUFBLEtBQ0ssWUFBWTtBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2Isa0JBQWtCO0FBQUEsSUFDbEIsc0JBQXNCO0FBQUEsRUFDeEIsQ0FBQztBQUFBLENBQ0gsR0FQbUM7QUFVckMsc0JBQXNCLFFBQVE7QUFBQSxFQUM1QixNQUFNO0FBQ1I7QUFFTyxNQUFNLFlBQVksNkJBQ3ZCLG9DQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxPQUNFO0FBQUEsRUFDSixDQUFDO0FBQUEsQ0FDSCxHQU51QjtBQVNsQixNQUFNLG1CQUFtQiw2QkFDOUIsb0NBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxFQUNYLENBQUM7QUFBQSxDQUNILEdBTjhCO0FBU2hDLGlCQUFpQixRQUFRO0FBQUEsRUFDdkIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
