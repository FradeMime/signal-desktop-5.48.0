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
var Alert_stories_exports = {};
__export(Alert_stories_exports, {
  BodyIsAReactNode: () => BodyIsAReactNode,
  LongBodyWithTitle: () => LongBodyWithTitle,
  LongBodyWithoutTitle: () => LongBodyWithoutTitle,
  TitleAndBodyAreStrings: () => TitleAndBodyAreStrings,
  default: () => Alert_stories_default
});
module.exports = __toCommonJS(Alert_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_Alert = require("./Alert");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var Alert_stories_default = {
  title: "Components/Alert"
};
const defaultProps = {
  i18n,
  onClose: (0, import_addon_actions.action)("onClose")
};
const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.";
const TitleAndBodyAreStrings = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Alert.Alert, {
  ...defaultProps,
  title: "Hello world",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus."
}), "TitleAndBodyAreStrings");
TitleAndBodyAreStrings.story = {
  name: "Title and body are strings"
};
const BodyIsAReactNode = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Alert.Alert, {
  ...defaultProps,
  title: "Hello world",
  body: /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("span", {
    style: { color: "red" }
  }, "Hello"), " ", /* @__PURE__ */ import_react.default.createElement("span", {
    style: { color: "green", fontWeight: "bold" }
  }, "world"), "!")
}), "BodyIsAReactNode");
BodyIsAReactNode.story = {
  name: "Body is a ReactNode"
};
const LongBodyWithoutTitle = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Alert.Alert, {
  ...defaultProps,
  body: /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM))
}), "LongBodyWithoutTitle");
LongBodyWithoutTitle.story = {
  name: "Long body (without title)"
};
const LongBodyWithTitle = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Alert.Alert, {
  ...defaultProps,
  title: "Hello world",
  body: /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM), /* @__PURE__ */ import_react.default.createElement("p", null, LOREM_IPSUM))
}), "LongBodyWithTitle");
LongBodyWithTitle.story = {
  name: "Long body (with title)"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BodyIsAReactNode,
  LongBodyWithTitle,
  LongBodyWithoutTitle,
  TitleAndBodyAreStrings
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQWxlcnQuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBBbGVydCB9IGZyb20gJy4vQWxlcnQnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9BbGVydCcsXG59O1xuXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XG4gIGkxOG4sXG4gIG9uQ2xvc2U6IGFjdGlvbignb25DbG9zZScpLFxufTtcblxuY29uc3QgTE9SRU1fSVBTVU0gPVxuICAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gRG9uZWMgYSBkaWFtIGxlY3R1cy4gU2VkIHNpdCBhbWV0IGlwc3VtIG1hdXJpcy4gTWFlY2VuYXMgY29uZ3VlIGxpZ3VsYSBhYyBxdWFtIHZpdmVycmEgbmVjIGNvbnNlY3RldHVyIGFudGUgaGVuZHJlcml0LiBEb25lYyBldCBtb2xsaXMgZG9sb3IuIFByYWVzZW50IGV0IGRpYW0gZWdldCBsaWJlcm8gZWdlc3RhcyBtYXR0aXMgc2l0IGFtZXQgdml0YWUgYXVndWUuIE5hbSB0aW5jaWR1bnQgY29uZ3VlIGVuaW0sIHV0IHBvcnRhIGxvcmVtIGxhY2luaWEgY29uc2VjdGV0dXIuIERvbmVjIHV0IGxpYmVybyBzZWQgYXJjdSB2ZWhpY3VsYSB1bHRyaWNpZXMgYSBub24gdG9ydG9yLiBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBBZW5lYW4gdXQgZ3JhdmlkYSBsb3JlbS4gVXQgdHVycGlzIGZlbGlzLCBwdWx2aW5hciBhIHNlbXBlciBzZWQsIGFkaXBpc2NpbmcgaWQgZG9sb3IuIFBlbGxlbnRlc3F1ZSBhdWN0b3IgbmlzaSBpZCBtYWduYSBjb25zZXF1YXQgc2FnaXR0aXMuIEN1cmFiaXR1ciBkYXBpYnVzIGVuaW0gc2l0IGFtZXQgZWxpdCBwaGFyZXRyYSB0aW5jaWR1bnQgZmV1Z2lhdCBuaXNsIGltcGVyZGlldC4gVXQgY29udmFsbGlzIGxpYmVybyBpbiB1cm5hIHVsdHJpY2VzIGFjY3Vtc2FuLiBEb25lYyBzZWQgb2RpbyBlcm9zLiBEb25lYyB2aXZlcnJhIG1pIHF1aXMgcXVhbSBwdWx2aW5hciBhdCBtYWxlc3VhZGEgYXJjdSByaG9uY3VzLiBDdW0gc29jaWlzIG5hdG9xdWUgcGVuYXRpYnVzIGV0IG1hZ25pcyBkaXMgcGFydHVyaWVudCBtb250ZXMsIG5hc2NldHVyIHJpZGljdWx1cyBtdXMuIEluIHJ1dHJ1bSBhY2N1bXNhbiB1bHRyaWNpZXMuIE1hdXJpcyB2aXRhZSBuaXNpIGF0IHNlbSBmYWNpbGlzaXMgc2VtcGVyIGFjIGluIGVzdC4nO1xuXG5leHBvcnQgY29uc3QgVGl0bGVBbmRCb2R5QXJlU3RyaW5ncyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxBbGVydFxuICAgIHsuLi5kZWZhdWx0UHJvcHN9XG4gICAgdGl0bGU9XCJIZWxsbyB3b3JsZFwiXG4gICAgYm9keT1cIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQuIERvbmVjIGEgZGlhbSBsZWN0dXMuXCJcbiAgLz5cbik7XG5cblRpdGxlQW5kQm9keUFyZVN0cmluZ3Muc3RvcnkgPSB7XG4gIG5hbWU6ICdUaXRsZSBhbmQgYm9keSBhcmUgc3RyaW5ncycsXG59O1xuXG5leHBvcnQgY29uc3QgQm9keUlzQVJlYWN0Tm9kZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxBbGVydFxuICAgIHsuLi5kZWZhdWx0UHJvcHN9XG4gICAgdGl0bGU9XCJIZWxsbyB3b3JsZFwiXG4gICAgYm9keT17XG4gICAgICA8PlxuICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogJ3JlZCcgfX0+SGVsbG88L3NwYW4+eycgJ31cbiAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICdncmVlbicsIGZvbnRXZWlnaHQ6ICdib2xkJyB9fT53b3JsZDwvc3Bhbj4hXG4gICAgICA8Lz5cbiAgICB9XG4gIC8+XG4pO1xuXG5Cb2R5SXNBUmVhY3ROb2RlLnN0b3J5ID0ge1xuICBuYW1lOiAnQm9keSBpcyBhIFJlYWN0Tm9kZScsXG59O1xuXG5leHBvcnQgY29uc3QgTG9uZ0JvZHlXaXRob3V0VGl0bGUgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8QWxlcnRcbiAgICB7Li4uZGVmYXVsdFByb3BzfVxuICAgIGJvZHk9e1xuICAgICAgPD5cbiAgICAgICAgPHA+e0xPUkVNX0lQU1VNfTwvcD5cbiAgICAgICAgPHA+e0xPUkVNX0lQU1VNfTwvcD5cbiAgICAgICAgPHA+e0xPUkVNX0lQU1VNfTwvcD5cbiAgICAgICAgPHA+e0xPUkVNX0lQU1VNfTwvcD5cbiAgICAgIDwvPlxuICAgIH1cbiAgLz5cbik7XG5cbkxvbmdCb2R5V2l0aG91dFRpdGxlLnN0b3J5ID0ge1xuICBuYW1lOiAnTG9uZyBib2R5ICh3aXRob3V0IHRpdGxlKScsXG59O1xuXG5leHBvcnQgY29uc3QgTG9uZ0JvZHlXaXRoVGl0bGUgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8QWxlcnRcbiAgICB7Li4uZGVmYXVsdFByb3BzfVxuICAgIHRpdGxlPVwiSGVsbG8gd29ybGRcIlxuICAgIGJvZHk9e1xuICAgICAgPD5cbiAgICAgICAgPHA+e0xPUkVNX0lQU1VNfTwvcD5cbiAgICAgICAgPHA+e0xPUkVNX0lQU1VNfTwvcD5cbiAgICAgICAgPHA+e0xPUkVNX0lQU1VNfTwvcD5cbiAgICAgICAgPHA+e0xPUkVNX0lQU1VNfTwvcD5cbiAgICAgIDwvPlxuICAgIH1cbiAgLz5cbik7XG5cbkxvbmdCb2R5V2l0aFRpdGxlLnN0b3J5ID0ge1xuICBuYW1lOiAnTG9uZyBib2R5ICh3aXRoIHRpdGxlKScsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBRWxCLDJCQUF1QjtBQUV2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLG1CQUFzQjtBQUV0QixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLHdCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLGVBQWU7QUFBQSxFQUNuQjtBQUFBLEVBQ0EsU0FBUyxpQ0FBTyxTQUFTO0FBQzNCO0FBRUEsTUFBTSxjQUNKO0FBRUssTUFBTSx5QkFBeUIsNkJBQ3BDLG1EQUFDO0FBQUEsS0FDSztBQUFBLEVBQ0osT0FBTTtBQUFBLEVBQ04sTUFBSztBQUFBLENBQ1AsR0FMb0M7QUFRdEMsdUJBQXVCLFFBQVE7QUFBQSxFQUM3QixNQUFNO0FBQ1I7QUFFTyxNQUFNLG1CQUFtQiw2QkFDOUIsbURBQUM7QUFBQSxLQUNLO0FBQUEsRUFDSixPQUFNO0FBQUEsRUFDTixNQUNFLHdGQUNFLG1EQUFDO0FBQUEsSUFBSyxPQUFPLEVBQUUsT0FBTyxNQUFNO0FBQUEsS0FBRyxPQUFLLEdBQVEsS0FDNUMsbURBQUM7QUFBQSxJQUFLLE9BQU8sRUFBRSxPQUFPLFNBQVMsWUFBWSxPQUFPO0FBQUEsS0FBRyxPQUFLLEdBQU8sR0FDbkU7QUFBQSxDQUVKLEdBVjhCO0FBYWhDLGlCQUFpQixRQUFRO0FBQUEsRUFDdkIsTUFBTTtBQUNSO0FBRU8sTUFBTSx1QkFBdUIsNkJBQ2xDLG1EQUFDO0FBQUEsS0FDSztBQUFBLEVBQ0osTUFDRSx3RkFDRSxtREFBQyxXQUFHLFdBQVksR0FDaEIsbURBQUMsV0FBRyxXQUFZLEdBQ2hCLG1EQUFDLFdBQUcsV0FBWSxHQUNoQixtREFBQyxXQUFHLFdBQVksQ0FDbEI7QUFBQSxDQUVKLEdBWGtDO0FBY3BDLHFCQUFxQixRQUFRO0FBQUEsRUFDM0IsTUFBTTtBQUNSO0FBRU8sTUFBTSxvQkFBb0IsNkJBQy9CLG1EQUFDO0FBQUEsS0FDSztBQUFBLEVBQ0osT0FBTTtBQUFBLEVBQ04sTUFDRSx3RkFDRSxtREFBQyxXQUFHLFdBQVksR0FDaEIsbURBQUMsV0FBRyxXQUFZLEdBQ2hCLG1EQUFDLFdBQUcsV0FBWSxHQUNoQixtREFBQyxXQUFHLFdBQVksQ0FDbEI7QUFBQSxDQUVKLEdBWitCO0FBZWpDLGtCQUFrQixRQUFRO0FBQUEsRUFDeEIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
