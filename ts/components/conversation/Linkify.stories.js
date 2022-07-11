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
var Linkify_stories_exports = {};
__export(Linkify_stories_exports, {
  BlockedProtocols: () => BlockedProtocols,
  CustomTextRender: () => CustomTextRender,
  LinksWithEmojiAndText: () => LinksWithEmojiAndText,
  LinksWithEmojiWithoutSpace: () => LinksWithEmojiWithoutSpace,
  LinksWithText: () => LinksWithText,
  MissingProtocols: () => MissingProtocols,
  NoLink: () => NoLink,
  OnlyLink: () => OnlyLink,
  default: () => Linkify_stories_default
});
module.exports = __toCommonJS(Linkify_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_Linkify = require("./Linkify");
var Linkify_stories_default = {
  title: "Components/Conversation/Linkify"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  renderNonLink: overrideProps.renderNonLink,
  text: (0, import_addon_knobs.text)("text", overrideProps.text || "")
}), "createProps");
const OnlyLink = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "https://www.signal.org"
  });
  return /* @__PURE__ */ React.createElement(import_Linkify.Linkify, {
    ...props
  });
}, "OnlyLink");
const LinksWithText = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "you should see this: https://www.signal.org - it is good. Also: https://placekitten.com!"
  });
  return /* @__PURE__ */ React.createElement(import_Linkify.Linkify, {
    ...props
  });
}, "LinksWithText");
LinksWithText.story = {
  name: "Links with Text"
};
const LinksWithEmojiWithoutSpace = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "\u{1F44D}https://www.signal.org\u{1F60E}"
  });
  return /* @__PURE__ */ React.createElement(import_Linkify.Linkify, {
    ...props
  });
}, "LinksWithEmojiWithoutSpace");
LinksWithEmojiWithoutSpace.story = {
  name: "Links with Emoji without space"
};
const LinksWithEmojiAndText = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "https://example.com \u26A0\uFE0F 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ https://example.com"
  });
  return /* @__PURE__ */ React.createElement(import_Linkify.Linkify, {
    ...props
  });
}, "LinksWithEmojiAndText");
LinksWithEmojiAndText.story = {
  name: "Links with Emoji and Text"
};
const NoLink = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "I am fond of cats"
  });
  return /* @__PURE__ */ React.createElement(import_Linkify.Linkify, {
    ...props
  });
}, "NoLink");
const BlockedProtocols = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "smailto:someone@somewhere.com - ftp://something.com - //local/share - \\localshare"
  });
  return /* @__PURE__ */ React.createElement(import_Linkify.Linkify, {
    ...props
  });
}, "BlockedProtocols");
const MissingProtocols = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "I love example.com. I also love \u043A\u0446.\u0440\u0444. I also love \u0645\u062B\u0627\u0644.\u062A\u0648\u0646\u0633. But I do not love test.example."
  });
  return /* @__PURE__ */ React.createElement(import_Linkify.Linkify, {
    ...props
  });
}, "MissingProtocols");
MissingProtocols.story = {
  name: "Missing protocols"
};
const CustomTextRender = /* @__PURE__ */ __name(() => {
  const props = createProps({
    text: "you should see this: https://www.signal.org - it is good. Also: https://placekitten.com!",
    renderNonLink: ({ text: theText, key }) => /* @__PURE__ */ React.createElement("div", {
      key,
      style: { backgroundColor: "aquamarine" }
    }, theText)
  });
  return /* @__PURE__ */ React.createElement(import_Linkify.Linkify, {
    ...props
  });
}, "CustomTextRender");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BlockedProtocols,
  CustomTextRender,
  LinksWithEmojiAndText,
  LinksWithEmojiWithoutSpace,
  LinksWithText,
  MissingProtocols,
  NoLink,
  OnlyLink
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGlua2lmeS5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHRleHQgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vTGlua2lmeSc7XG5pbXBvcnQgeyBMaW5raWZ5IH0gZnJvbSAnLi9MaW5raWZ5JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL0xpbmtpZnknLFxufTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wcz4gPSB7fSk6IFByb3BzID0+ICh7XG4gIHJlbmRlck5vbkxpbms6IG92ZXJyaWRlUHJvcHMucmVuZGVyTm9uTGluayxcbiAgdGV4dDogdGV4dCgndGV4dCcsIG92ZXJyaWRlUHJvcHMudGV4dCB8fCAnJyksXG59KTtcblxuZXhwb3J0IGNvbnN0IE9ubHlMaW5rID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgdGV4dDogJ2h0dHBzOi8vd3d3LnNpZ25hbC5vcmcnLFxuICB9KTtcblxuICByZXR1cm4gPExpbmtpZnkgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBMaW5rc1dpdGhUZXh0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgdGV4dDogJ3lvdSBzaG91bGQgc2VlIHRoaXM6IGh0dHBzOi8vd3d3LnNpZ25hbC5vcmcgLSBpdCBpcyBnb29kLiBBbHNvOiBodHRwczovL3BsYWNla2l0dGVuLmNvbSEnLFxuICB9KTtcblxuICByZXR1cm4gPExpbmtpZnkgey4uLnByb3BzfSAvPjtcbn07XG5cbkxpbmtzV2l0aFRleHQuc3RvcnkgPSB7XG4gIG5hbWU6ICdMaW5rcyB3aXRoIFRleHQnLFxufTtcblxuZXhwb3J0IGNvbnN0IExpbmtzV2l0aEVtb2ppV2l0aG91dFNwYWNlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgdGV4dDogJ1x1RDgzRFx1REM0RGh0dHBzOi8vd3d3LnNpZ25hbC5vcmdcdUQ4M0RcdURFMEUnLFxuICB9KTtcblxuICByZXR1cm4gPExpbmtpZnkgey4uLnByb3BzfSAvPjtcbn07XG5cbkxpbmtzV2l0aEVtb2ppV2l0aG91dFNwYWNlLnN0b3J5ID0ge1xuICBuYW1lOiAnTGlua3Mgd2l0aCBFbW9qaSB3aXRob3V0IHNwYWNlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBMaW5rc1dpdGhFbW9qaUFuZFRleHQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0ZXh0OiAnaHR0cHM6Ly9leGFtcGxlLmNvbSBcdTI2QTBcdUZFMEYgMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaIGh0dHBzOi8vZXhhbXBsZS5jb20nLFxuICB9KTtcblxuICByZXR1cm4gPExpbmtpZnkgey4uLnByb3BzfSAvPjtcbn07XG5cbkxpbmtzV2l0aEVtb2ppQW5kVGV4dC5zdG9yeSA9IHtcbiAgbmFtZTogJ0xpbmtzIHdpdGggRW1vamkgYW5kIFRleHQnLFxufTtcblxuZXhwb3J0IGNvbnN0IE5vTGluayA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHRleHQ6ICdJIGFtIGZvbmQgb2YgY2F0cycsXG4gIH0pO1xuXG4gIHJldHVybiA8TGlua2lmeSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IEJsb2NrZWRQcm90b2NvbHMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICB0ZXh0OiAnc21haWx0bzpzb21lb25lQHNvbWV3aGVyZS5jb20gLSBmdHA6Ly9zb21ldGhpbmcuY29tIC0gLy9sb2NhbC9zaGFyZSAtIFxcXFxsb2NhbHNoYXJlJyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxMaW5raWZ5IHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgTWlzc2luZ1Byb3RvY29scyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHRleHQ6ICdJIGxvdmUgZXhhbXBsZS5jb20uIEkgYWxzbyBsb3ZlIFx1MDQzQVx1MDQ0Ni5cdTA0NDBcdTA0NDQuIEkgYWxzbyBsb3ZlIFx1MDY0NVx1MDYyQlx1MDYyN1x1MDY0NC5cdTA2MkFcdTA2NDhcdTA2NDZcdTA2MzMuIEJ1dCBJIGRvIG5vdCBsb3ZlIHRlc3QuZXhhbXBsZS4nLFxuICB9KTtcblxuICByZXR1cm4gPExpbmtpZnkgey4uLnByb3BzfSAvPjtcbn07XG5cbk1pc3NpbmdQcm90b2NvbHMuc3RvcnkgPSB7XG4gIG5hbWU6ICdNaXNzaW5nIHByb3RvY29scycsXG59O1xuXG5leHBvcnQgY29uc3QgQ3VzdG9tVGV4dFJlbmRlciA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHRleHQ6ICd5b3Ugc2hvdWxkIHNlZSB0aGlzOiBodHRwczovL3d3dy5zaWduYWwub3JnIC0gaXQgaXMgZ29vZC4gQWxzbzogaHR0cHM6Ly9wbGFjZWtpdHRlbi5jb20hJyxcbiAgICByZW5kZXJOb25MaW5rOiAoeyB0ZXh0OiB0aGVUZXh0LCBrZXkgfSkgPT4gKFxuICAgICAgPGRpdiBrZXk9e2tleX0gc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiAnYXF1YW1hcmluZScgfX0+XG4gICAgICAgIHt0aGVUZXh0fVxuICAgICAgPC9kaXY+XG4gICAgKSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxMaW5raWZ5IHsuLi5wcm9wc30gLz47XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2Qix5QkFBcUI7QUFHckIscUJBQXdCO0FBRXhCLElBQU8sMEJBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0sY0FBYyx3QkFBQyxnQkFBZ0MsQ0FBQyxNQUFjO0FBQUEsRUFDbEUsZUFBZSxjQUFjO0FBQUEsRUFDN0IsTUFBTSw2QkFBSyxRQUFRLGNBQWMsUUFBUSxFQUFFO0FBQzdDLElBSG9CO0FBS2IsTUFBTSxXQUFXLDZCQUFtQjtBQUN6QyxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLE1BQU07QUFBQSxFQUNSLENBQUM7QUFFRCxTQUFPLG9DQUFDO0FBQUEsT0FBWTtBQUFBLEdBQU87QUFDN0IsR0FOd0I7QUFRakIsTUFBTSxnQkFBZ0IsNkJBQW1CO0FBQzlDLFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFZO0FBQUEsR0FBTztBQUM3QixHQU42QjtBQVE3QixjQUFjLFFBQVE7QUFBQSxFQUNwQixNQUFNO0FBQ1I7QUFFTyxNQUFNLDZCQUE2Qiw2QkFBbUI7QUFDM0QsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixNQUFNO0FBQUEsRUFDUixDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQVk7QUFBQSxHQUFPO0FBQzdCLEdBTjBDO0FBUTFDLDJCQUEyQixRQUFRO0FBQUEsRUFDakMsTUFBTTtBQUNSO0FBRU8sTUFBTSx3QkFBd0IsNkJBQW1CO0FBQ3RELFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFZO0FBQUEsR0FBTztBQUM3QixHQU5xQztBQVFyQyxzQkFBc0IsUUFBUTtBQUFBLEVBQzVCLE1BQU07QUFDUjtBQUVPLE1BQU0sU0FBUyw2QkFBbUI7QUFDdkMsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixNQUFNO0FBQUEsRUFDUixDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQVk7QUFBQSxHQUFPO0FBQzdCLEdBTnNCO0FBUWYsTUFBTSxtQkFBbUIsNkJBQW1CO0FBQ2pELFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFZO0FBQUEsR0FBTztBQUM3QixHQU5nQztBQVF6QixNQUFNLG1CQUFtQiw2QkFBbUI7QUFDakQsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixNQUFNO0FBQUEsRUFDUixDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQVk7QUFBQSxHQUFPO0FBQzdCLEdBTmdDO0FBUWhDLGlCQUFpQixRQUFRO0FBQUEsRUFDdkIsTUFBTTtBQUNSO0FBRU8sTUFBTSxtQkFBbUIsNkJBQW1CO0FBQ2pELFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsTUFBTTtBQUFBLElBQ04sZUFBZSxDQUFDLEVBQUUsTUFBTSxTQUFTLFVBQy9CLG9DQUFDO0FBQUEsTUFBSTtBQUFBLE1BQVUsT0FBTyxFQUFFLGlCQUFpQixhQUFhO0FBQUEsT0FDbkQsT0FDSDtBQUFBLEVBRUosQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFZO0FBQUEsR0FBTztBQUM3QixHQVhnQzsiLAogICJuYW1lcyI6IFtdCn0K
