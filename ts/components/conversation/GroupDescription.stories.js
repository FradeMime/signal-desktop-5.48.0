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
var GroupDescription_stories_exports = {};
__export(GroupDescription_stories_exports, {
  Default: () => Default,
  KitchenSink: () => KitchenSink,
  Long: () => Long,
  WithEmoji: () => WithEmoji,
  WithLink: () => WithLink,
  WithNewlines: () => WithNewlines,
  default: () => GroupDescription_stories_default
});
module.exports = __toCommonJS(GroupDescription_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_GroupDescription = require("./GroupDescription");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var GroupDescription_stories_default = {
  title: "Components/Conversation/GroupDescription"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  title: (0, import_addon_knobs.text)("title", overrideProps.title || "Sample Title"),
  text: (0, import_addon_knobs.text)("text", overrideProps.text || "Default group description")
}), "createProps");
const Default = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_GroupDescription.GroupDescription, {
  ...createProps()
}), "Default");
const Long = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_GroupDescription.GroupDescription, {
  ...createProps({
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed vehicula urna. Ut rhoncus, justo a vestibulum elementum, libero ligula molestie massa, et volutpat nibh ipsum sit amet enim. Vestibulum ac mi enim. Nulla fringilla justo justo, volutpat semper ex convallis quis. Proin posuere, mi at auctor tincidunt, magna turpis mattis nibh, ullamcorper vehicula lectus mauris in mauris. Nullam blandit sapien tortor, quis vehicula quam molestie nec. Nam sagittis dolor in eros dapibus scelerisque. Proin vitae ex sed magna lobortis tincidunt. Aenean dictum laoreet dolor, at suscipit ligula fermentum ac. Nam condimentum turpis quis sollicitudin rhoncus."
  })
}), "Long");
const WithNewlines = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_GroupDescription.GroupDescription, {
  ...createProps({
    text: "This is long\n\nSo many lines\n\nToo many lines?"
  })
}), "WithNewlines");
WithNewlines.story = {
  name: "With newlines"
};
const WithEmoji = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_GroupDescription.GroupDescription, {
  ...createProps({
    text: "\u{1F352}\u{1F369}\u{1F32D}"
  })
}), "WithEmoji");
WithEmoji.story = {
  name: "With emoji"
};
const WithLink = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_GroupDescription.GroupDescription, {
  ...createProps({
    text: "I love https://example.com and http://example.com and example.com, but not https://user:bar@example.com"
  })
}), "WithLink");
WithLink.story = {
  name: "With link"
};
const KitchenSink = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_GroupDescription.GroupDescription, {
  ...createProps({
    text: "\u{1F352} https://example.com this is a long thing\nhttps://example.com on another line\nhttps://example.com"
  })
}), "KitchenSink");
KitchenSink.story = {
  name: "Kitchen sink"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default,
  KitchenSink,
  Long,
  WithEmoji,
  WithLink,
  WithNewlines
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBEZXNjcmlwdGlvbi5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi9Hcm91cERlc2NyaXB0aW9uJztcbmltcG9ydCB7IEdyb3VwRGVzY3JpcHRpb24gfSBmcm9tICcuL0dyb3VwRGVzY3JpcHRpb24nO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9Hcm91cERlc2NyaXB0aW9uJyxcbn07XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHNUeXBlPiA9IHt9KTogUHJvcHNUeXBlID0+ICh7XG4gIGkxOG4sXG4gIHRpdGxlOiB0ZXh0KCd0aXRsZScsIG92ZXJyaWRlUHJvcHMudGl0bGUgfHwgJ1NhbXBsZSBUaXRsZScpLFxuICB0ZXh0OiB0ZXh0KCd0ZXh0Jywgb3ZlcnJpZGVQcm9wcy50ZXh0IHx8ICdEZWZhdWx0IGdyb3VwIGRlc2NyaXB0aW9uJyksXG59KTtcblxuZXhwb3J0IGNvbnN0IERlZmF1bHQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8R3JvdXBEZXNjcmlwdGlvbiB7Li4uY3JlYXRlUHJvcHMoKX0gLz5cbik7XG5cbmV4cG9ydCBjb25zdCBMb25nID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEdyb3VwRGVzY3JpcHRpb25cbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgdGV4dDogJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQuIE1hZWNlbmFzIHNlZCB2ZWhpY3VsYSB1cm5hLiBVdCByaG9uY3VzLCBqdXN0byBhIHZlc3RpYnVsdW0gZWxlbWVudHVtLCBsaWJlcm8gbGlndWxhIG1vbGVzdGllIG1hc3NhLCBldCB2b2x1dHBhdCBuaWJoIGlwc3VtIHNpdCBhbWV0IGVuaW0uIFZlc3RpYnVsdW0gYWMgbWkgZW5pbS4gTnVsbGEgZnJpbmdpbGxhIGp1c3RvIGp1c3RvLCB2b2x1dHBhdCBzZW1wZXIgZXggY29udmFsbGlzIHF1aXMuIFByb2luIHBvc3VlcmUsIG1pIGF0IGF1Y3RvciB0aW5jaWR1bnQsIG1hZ25hIHR1cnBpcyBtYXR0aXMgbmliaCwgdWxsYW1jb3JwZXIgdmVoaWN1bGEgbGVjdHVzIG1hdXJpcyBpbiBtYXVyaXMuIE51bGxhbSBibGFuZGl0IHNhcGllbiB0b3J0b3IsIHF1aXMgdmVoaWN1bGEgcXVhbSBtb2xlc3RpZSBuZWMuIE5hbSBzYWdpdHRpcyBkb2xvciBpbiBlcm9zIGRhcGlidXMgc2NlbGVyaXNxdWUuIFByb2luIHZpdGFlIGV4IHNlZCBtYWduYSBsb2JvcnRpcyB0aW5jaWR1bnQuIEFlbmVhbiBkaWN0dW0gbGFvcmVldCBkb2xvciwgYXQgc3VzY2lwaXQgbGlndWxhIGZlcm1lbnR1bSBhYy4gTmFtIGNvbmRpbWVudHVtIHR1cnBpcyBxdWlzIHNvbGxpY2l0dWRpbiByaG9uY3VzLicsXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgV2l0aE5ld2xpbmVzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEdyb3VwRGVzY3JpcHRpb25cbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgdGV4dDogJ1RoaXMgaXMgbG9uZ1xcblxcblNvIG1hbnkgbGluZXNcXG5cXG5Ub28gbWFueSBsaW5lcz8nLFxuICAgIH0pfVxuICAvPlxuKTtcblxuV2l0aE5ld2xpbmVzLnN0b3J5ID0ge1xuICBuYW1lOiAnV2l0aCBuZXdsaW5lcycsXG59O1xuXG5leHBvcnQgY29uc3QgV2l0aEVtb2ppID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEdyb3VwRGVzY3JpcHRpb25cbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgdGV4dDogJ1x1RDgzQ1x1REY1Mlx1RDgzQ1x1REY2OVx1RDgzQ1x1REYyRCcsXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5XaXRoRW1vamkuc3RvcnkgPSB7XG4gIG5hbWU6ICdXaXRoIGVtb2ppJyxcbn07XG5cbmV4cG9ydCBjb25zdCBXaXRoTGluayA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxHcm91cERlc2NyaXB0aW9uXG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIHRleHQ6ICdJIGxvdmUgaHR0cHM6Ly9leGFtcGxlLmNvbSBhbmQgaHR0cDovL2V4YW1wbGUuY29tIGFuZCBleGFtcGxlLmNvbSwgYnV0IG5vdCBodHRwczovL3VzZXI6YmFyQGV4YW1wbGUuY29tJyxcbiAgICB9KX1cbiAgLz5cbik7XG5cbldpdGhMaW5rLnN0b3J5ID0ge1xuICBuYW1lOiAnV2l0aCBsaW5rJyxcbn07XG5cbmV4cG9ydCBjb25zdCBLaXRjaGVuU2luayA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxHcm91cERlc2NyaXB0aW9uXG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIHRleHQ6ICdcdUQ4M0NcdURGNTIgaHR0cHM6Ly9leGFtcGxlLmNvbSB0aGlzIGlzIGEgbG9uZyB0aGluZ1xcbmh0dHBzOi8vZXhhbXBsZS5jb20gb24gYW5vdGhlciBsaW5lXFxuaHR0cHM6Ly9leGFtcGxlLmNvbScsXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5LaXRjaGVuU2luay5zdG9yeSA9IHtcbiAgbmFtZTogJ0tpdGNoZW4gc2luaycsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUVsQix5QkFBcUI7QUFHckIsOEJBQWlDO0FBQ2pDLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFFdkIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTyxtQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxjQUFjLHdCQUFDLGdCQUFvQyxDQUFDLE1BQWtCO0FBQUEsRUFDMUU7QUFBQSxFQUNBLE9BQU8sNkJBQUssU0FBUyxjQUFjLFNBQVMsY0FBYztBQUFBLEVBQzFELE1BQU0sNkJBQUssUUFBUSxjQUFjLFFBQVEsMkJBQTJCO0FBQ3RFLElBSm9CO0FBTWIsTUFBTSxVQUFVLDZCQUNyQixtREFBQztBQUFBLEtBQXFCLFlBQVk7QUFBQSxDQUFHLEdBRGhCO0FBSWhCLE1BQU0sT0FBTyw2QkFDbEIsbURBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLE1BQU07QUFBQSxFQUNSLENBQUM7QUFBQSxDQUNILEdBTGtCO0FBUWIsTUFBTSxlQUFlLDZCQUMxQixtREFBQztBQUFBLEtBQ0ssWUFBWTtBQUFBLElBQ2QsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUFBLENBQ0gsR0FMMEI7QUFRNUIsYUFBYSxRQUFRO0FBQUEsRUFDbkIsTUFBTTtBQUNSO0FBRU8sTUFBTSxZQUFZLDZCQUN2QixtREFBQztBQUFBLEtBQ0ssWUFBWTtBQUFBLElBQ2QsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUFBLENBQ0gsR0FMdUI7QUFRekIsVUFBVSxRQUFRO0FBQUEsRUFDaEIsTUFBTTtBQUNSO0FBRU8sTUFBTSxXQUFXLDZCQUN0QixtREFBQztBQUFBLEtBQ0ssWUFBWTtBQUFBLElBQ2QsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUFBLENBQ0gsR0FMc0I7QUFReEIsU0FBUyxRQUFRO0FBQUEsRUFDZixNQUFNO0FBQ1I7QUFFTyxNQUFNLGNBQWMsNkJBQ3pCLG1EQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxNQUFNO0FBQUEsRUFDUixDQUFDO0FBQUEsQ0FDSCxHQUx5QjtBQVEzQixZQUFZLFFBQVE7QUFBQSxFQUNsQixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
