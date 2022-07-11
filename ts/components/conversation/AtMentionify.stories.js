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
var AtMentionify_stories_exports = {};
__export(AtMentionify_stories_exports, {
  ComplexMentions: () => ComplexMentions,
  MultipleMentions: () => MultipleMentions,
  NoMentions: () => NoMentions,
  default: () => AtMentionify_stories_default
});
module.exports = __toCommonJS(AtMentionify_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_AtMentionify = require("./AtMentionify");
var AtMentionify_stories_default = {
  title: "Components/Conversation/AtMentionify"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  bodyRanges: overrideProps.bodyRanges,
  direction: (0, import_addon_knobs.select)("direction", { incoming: "incoming", outgoing: "outgoing" }, overrideProps.direction || "incoming"),
  openConversation: (0, import_addon_actions.action)("openConversation"),
  text: (0, import_addon_knobs.text)("text", overrideProps.text || "")
}), "createProps");
const NoMentions = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "Hello World"
  });
  return /* @__PURE__ */ React.createElement(import_AtMentionify.AtMentionify, {
    ...props
  });
}, "NoMentions");
NoMentions.story = {
  name: "No @mentions"
};
const MultipleMentions = /* @__PURE__ */ __name(() => {
  const bodyRanges = [
    {
      start: 4,
      length: 1,
      mentionUuid: "abc",
      replacementText: "Professor Farnsworth"
    },
    {
      start: 2,
      length: 1,
      mentionUuid: "def",
      replacementText: "Philip J Fry"
    },
    {
      start: 0,
      length: 1,
      mentionUuid: "xyz",
      replacementText: "Yancy Fry"
    }
  ];
  const props = createProps({
    bodyRanges,
    direction: "outgoing",
    text: import_AtMentionify.AtMentionify.preprocessMentions("\uFFFC \uFFFC \uFFFC", bodyRanges)
  });
  return /* @__PURE__ */ React.createElement(import_AtMentionify.AtMentionify, {
    ...props
  });
}, "MultipleMentions");
MultipleMentions.story = {
  name: "Multiple @Mentions"
};
const ComplexMentions = /* @__PURE__ */ __name(() => {
  const bodyRanges = [
    {
      start: 80,
      length: 1,
      mentionUuid: "ioe",
      replacementText: "Cereal Killer"
    },
    {
      start: 78,
      length: 1,
      mentionUuid: "fdr",
      replacementText: "Acid Burn"
    },
    {
      start: 4,
      length: 1,
      mentionUuid: "ope",
      replacementText: "Zero Cool"
    }
  ];
  const props = createProps({
    bodyRanges,
    text: import_AtMentionify.AtMentionify.preprocessMentions("Hey \uFFFC\nCheck out https://www.signal.org I think you will really like it \u{1F60D}\n\ncc \uFFFC \uFFFC", bodyRanges)
  });
  return /* @__PURE__ */ React.createElement(import_AtMentionify.AtMentionify, {
    ...props
  });
}, "ComplexMentions");
ComplexMentions.story = {
  name: "Complex @mentions"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ComplexMentions,
  MultipleMentions,
  NoMentions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXRNZW50aW9uaWZ5LnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcbmltcG9ydCB7IHNlbGVjdCwgdGV4dCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi9BdE1lbnRpb25pZnknO1xuaW1wb3J0IHsgQXRNZW50aW9uaWZ5IH0gZnJvbSAnLi9BdE1lbnRpb25pZnknO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vQXRNZW50aW9uaWZ5Jyxcbn07XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHM+ID0ge30pOiBQcm9wcyA9PiAoe1xuICBib2R5UmFuZ2VzOiBvdmVycmlkZVByb3BzLmJvZHlSYW5nZXMsXG4gIGRpcmVjdGlvbjogc2VsZWN0KFxuICAgICdkaXJlY3Rpb24nLFxuICAgIHsgaW5jb21pbmc6ICdpbmNvbWluZycsIG91dGdvaW5nOiAnb3V0Z29pbmcnIH0sXG4gICAgb3ZlcnJpZGVQcm9wcy5kaXJlY3Rpb24gfHwgJ2luY29taW5nJ1xuICApLFxuICBvcGVuQ29udmVyc2F0aW9uOiBhY3Rpb24oJ29wZW5Db252ZXJzYXRpb24nKSxcbiAgdGV4dDogdGV4dCgndGV4dCcsIG92ZXJyaWRlUHJvcHMudGV4dCB8fCAnJyksXG59KTtcblxuZXhwb3J0IGNvbnN0IE5vTWVudGlvbnMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0ZXh0OiAnSGVsbG8gV29ybGQnLFxuICB9KTtcblxuICByZXR1cm4gPEF0TWVudGlvbmlmeSB7Li4ucHJvcHN9IC8+O1xufTtcblxuTm9NZW50aW9ucy5zdG9yeSA9IHtcbiAgbmFtZTogJ05vIEBtZW50aW9ucycsXG59O1xuXG5leHBvcnQgY29uc3QgTXVsdGlwbGVNZW50aW9ucyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGJvZHlSYW5nZXMgPSBbXG4gICAge1xuICAgICAgc3RhcnQ6IDQsXG4gICAgICBsZW5ndGg6IDEsXG4gICAgICBtZW50aW9uVXVpZDogJ2FiYycsXG4gICAgICByZXBsYWNlbWVudFRleHQ6ICdQcm9mZXNzb3IgRmFybnN3b3J0aCcsXG4gICAgfSxcbiAgICB7XG4gICAgICBzdGFydDogMixcbiAgICAgIGxlbmd0aDogMSxcbiAgICAgIG1lbnRpb25VdWlkOiAnZGVmJyxcbiAgICAgIHJlcGxhY2VtZW50VGV4dDogJ1BoaWxpcCBKIEZyeScsXG4gICAgfSxcbiAgICB7XG4gICAgICBzdGFydDogMCxcbiAgICAgIGxlbmd0aDogMSxcbiAgICAgIG1lbnRpb25VdWlkOiAneHl6JyxcbiAgICAgIHJlcGxhY2VtZW50VGV4dDogJ1lhbmN5IEZyeScsXG4gICAgfSxcbiAgXTtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYm9keVJhbmdlcyxcbiAgICBkaXJlY3Rpb246ICdvdXRnb2luZycsXG4gICAgdGV4dDogQXRNZW50aW9uaWZ5LnByZXByb2Nlc3NNZW50aW9ucygnXFx1RkZGQyBcXHVGRkZDIFxcdUZGRkMnLCBib2R5UmFuZ2VzKSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxBdE1lbnRpb25pZnkgey4uLnByb3BzfSAvPjtcbn07XG5cbk11bHRpcGxlTWVudGlvbnMuc3RvcnkgPSB7XG4gIG5hbWU6ICdNdWx0aXBsZSBATWVudGlvbnMnLFxufTtcblxuZXhwb3J0IGNvbnN0IENvbXBsZXhNZW50aW9ucyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGJvZHlSYW5nZXMgPSBbXG4gICAge1xuICAgICAgc3RhcnQ6IDgwLFxuICAgICAgbGVuZ3RoOiAxLFxuICAgICAgbWVudGlvblV1aWQ6ICdpb2UnLFxuICAgICAgcmVwbGFjZW1lbnRUZXh0OiAnQ2VyZWFsIEtpbGxlcicsXG4gICAgfSxcbiAgICB7XG4gICAgICBzdGFydDogNzgsXG4gICAgICBsZW5ndGg6IDEsXG4gICAgICBtZW50aW9uVXVpZDogJ2ZkcicsXG4gICAgICByZXBsYWNlbWVudFRleHQ6ICdBY2lkIEJ1cm4nLFxuICAgIH0sXG4gICAge1xuICAgICAgc3RhcnQ6IDQsXG4gICAgICBsZW5ndGg6IDEsXG4gICAgICBtZW50aW9uVXVpZDogJ29wZScsXG4gICAgICByZXBsYWNlbWVudFRleHQ6ICdaZXJvIENvb2wnLFxuICAgIH0sXG4gIF07XG5cbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYm9keVJhbmdlcyxcbiAgICB0ZXh0OiBBdE1lbnRpb25pZnkucHJlcHJvY2Vzc01lbnRpb25zKFxuICAgICAgJ0hleSBcXHVGRkZDXFxuQ2hlY2sgb3V0IGh0dHBzOi8vd3d3LnNpZ25hbC5vcmcgSSB0aGluayB5b3Ugd2lsbCByZWFsbHkgbGlrZSBpdCBcdUQ4M0RcdURFMERcXG5cXG5jYyBcXHVGRkZDIFxcdUZGRkMnLFxuICAgICAgYm9keVJhbmdlc1xuICAgICksXG4gIH0pO1xuXG4gIHJldHVybiA8QXRNZW50aW9uaWZ5IHsuLi5wcm9wc30gLz47XG59O1xuXG5Db21wbGV4TWVudGlvbnMuc3RvcnkgPSB7XG4gIG5hbWU6ICdDb21wbGV4IEBtZW50aW9ucycsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLDJCQUF1QjtBQUN2Qix5QkFBNkI7QUFHN0IsMEJBQTZCO0FBRTdCLElBQU8sK0JBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0sY0FBYyx3QkFBQyxnQkFBZ0MsQ0FBQyxNQUFjO0FBQUEsRUFDbEUsWUFBWSxjQUFjO0FBQUEsRUFDMUIsV0FBVywrQkFDVCxhQUNBLEVBQUUsVUFBVSxZQUFZLFVBQVUsV0FBVyxHQUM3QyxjQUFjLGFBQWEsVUFDN0I7QUFBQSxFQUNBLGtCQUFrQixpQ0FBTyxrQkFBa0I7QUFBQSxFQUMzQyxNQUFNLDZCQUFLLFFBQVEsY0FBYyxRQUFRLEVBQUU7QUFDN0MsSUFUb0I7QUFXYixNQUFNLGFBQWEsNkJBQW1CO0FBQzNDLFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFpQjtBQUFBLEdBQU87QUFDbEMsR0FOMEI7QUFRMUIsV0FBVyxRQUFRO0FBQUEsRUFDakIsTUFBTTtBQUNSO0FBRU8sTUFBTSxtQkFBbUIsNkJBQW1CO0FBQ2pELFFBQU0sYUFBYTtBQUFBLElBQ2pCO0FBQUEsTUFDRSxPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxJQUNuQjtBQUFBLElBQ0E7QUFBQSxNQUNFLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLElBQ25CO0FBQUEsSUFDQTtBQUFBLE1BQ0UsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsSUFDbkI7QUFBQSxFQUNGO0FBQ0EsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QjtBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsTUFBTSxpQ0FBYSxtQkFBbUIsd0JBQXdCLFVBQVU7QUFBQSxFQUMxRSxDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQWlCO0FBQUEsR0FBTztBQUNsQyxHQTVCZ0M7QUE4QmhDLGlCQUFpQixRQUFRO0FBQUEsRUFDdkIsTUFBTTtBQUNSO0FBRU8sTUFBTSxrQkFBa0IsNkJBQW1CO0FBQ2hELFFBQU0sYUFBYTtBQUFBLElBQ2pCO0FBQUEsTUFDRSxPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixhQUFhO0FBQUEsTUFDYixpQkFBaUI7QUFBQSxJQUNuQjtBQUFBLElBQ0E7QUFBQSxNQUNFLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLGFBQWE7QUFBQSxNQUNiLGlCQUFpQjtBQUFBLElBQ25CO0FBQUEsSUFDQTtBQUFBLE1BQ0UsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsSUFDbkI7QUFBQSxFQUNGO0FBRUEsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QjtBQUFBLElBQ0EsTUFBTSxpQ0FBYSxtQkFDakIsOEdBQ0EsVUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFpQjtBQUFBLEdBQU87QUFDbEMsR0EvQitCO0FBaUMvQixnQkFBZ0IsUUFBUTtBQUFBLEVBQ3RCLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
