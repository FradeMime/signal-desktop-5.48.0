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
var ContactSpoofingReviewDialogPerson_exports = {};
__export(ContactSpoofingReviewDialogPerson_exports, {
  ContactSpoofingReviewDialogPerson: () => ContactSpoofingReviewDialogPerson
});
module.exports = __toCommonJS(ContactSpoofingReviewDialogPerson_exports);
var import_react = __toESM(require("react"));
var import_assert = require("../../util/assert");
var import_Avatar = require("../Avatar");
var import_ContactName = require("./ContactName");
var import_SharedGroupNames = require("../SharedGroupNames");
const ContactSpoofingReviewDialogPerson = /* @__PURE__ */ __name(({ children, conversation, getPreferredBadge, i18n, onClick, theme }) => {
  (0, import_assert.assert)(conversation.type === "direct", "<ContactSpoofingReviewDialogPerson> expected a direct conversation");
  const contents = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
    ...conversation,
    badge: getPreferredBadge(conversation.badges),
    conversationType: conversation.type,
    size: import_Avatar.AvatarSize.FIFTY_TWO,
    className: "module-ContactSpoofingReviewDialogPerson__avatar",
    i18n,
    theme
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ContactSpoofingReviewDialogPerson__info"
  }, /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
    module: "module-ContactSpoofingReviewDialogPerson__info__contact-name",
    title: conversation.title
  }), conversation.phoneNumber ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ContactSpoofingReviewDialogPerson__info__property"
  }, conversation.phoneNumber) : null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ContactSpoofingReviewDialogPerson__info__property"
  }, /* @__PURE__ */ import_react.default.createElement(import_SharedGroupNames.SharedGroupNames, {
    i18n,
    sharedGroupNames: conversation.sharedGroupNames || []
  })), children));
  if (onClick) {
    return /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      className: "module-ContactSpoofingReviewDialogPerson",
      onClick
    }, contents);
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ContactSpoofingReviewDialogPerson"
  }, contents);
}, "ContactSpoofingReviewDialogPerson");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContactSpoofingReviewDialogPerson
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nUGVyc29uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEZ1bmN0aW9uQ29tcG9uZW50LCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSwgVGhlbWVUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgdHlwZSB7IFByZWZlcnJlZEJhZGdlU2VsZWN0b3JUeXBlIH0gZnJvbSAnLi4vLi4vc3RhdGUvc2VsZWN0b3JzL2JhZGdlcyc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5cbmltcG9ydCB7IEF2YXRhciwgQXZhdGFyU2l6ZSB9IGZyb20gJy4uL0F2YXRhcic7XG5pbXBvcnQgeyBDb250YWN0TmFtZSB9IGZyb20gJy4vQ29udGFjdE5hbWUnO1xuaW1wb3J0IHsgU2hhcmVkR3JvdXBOYW1lcyB9IGZyb20gJy4uL1NoYXJlZEdyb3VwTmFtZXMnO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uVHlwZTtcbiAgZ2V0UHJlZmVycmVkQmFkZ2U6IFByZWZlcnJlZEJhZGdlU2VsZWN0b3JUeXBlO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcbiAgdGhlbWU6IFRoZW1lVHlwZTtcbn07XG5cbmV4cG9ydCBjb25zdCBDb250YWN0U3Bvb2ZpbmdSZXZpZXdEaWFsb2dQZXJzb246IEZ1bmN0aW9uQ29tcG9uZW50PFxuICBQcm9wc1R5cGVcbj4gPSAoeyBjaGlsZHJlbiwgY29udmVyc2F0aW9uLCBnZXRQcmVmZXJyZWRCYWRnZSwgaTE4biwgb25DbGljaywgdGhlbWUgfSkgPT4ge1xuICBhc3NlcnQoXG4gICAgY29udmVyc2F0aW9uLnR5cGUgPT09ICdkaXJlY3QnLFxuICAgICc8Q29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nUGVyc29uPiBleHBlY3RlZCBhIGRpcmVjdCBjb252ZXJzYXRpb24nXG4gICk7XG5cbiAgY29uc3QgY29udGVudHMgPSAoXG4gICAgPD5cbiAgICAgIDxBdmF0YXJcbiAgICAgICAgey4uLmNvbnZlcnNhdGlvbn1cbiAgICAgICAgYmFkZ2U9e2dldFByZWZlcnJlZEJhZGdlKGNvbnZlcnNhdGlvbi5iYWRnZXMpfVxuICAgICAgICBjb252ZXJzYXRpb25UeXBlPXtjb252ZXJzYXRpb24udHlwZX1cbiAgICAgICAgc2l6ZT17QXZhdGFyU2l6ZS5GSUZUWV9UV099XG4gICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1Db250YWN0U3Bvb2ZpbmdSZXZpZXdEaWFsb2dQZXJzb25fX2F2YXRhclwiXG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1Db250YWN0U3Bvb2ZpbmdSZXZpZXdEaWFsb2dQZXJzb25fX2luZm9cIj5cbiAgICAgICAgPENvbnRhY3ROYW1lXG4gICAgICAgICAgbW9kdWxlPVwibW9kdWxlLUNvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZ1BlcnNvbl9faW5mb19fY29udGFjdC1uYW1lXCJcbiAgICAgICAgICB0aXRsZT17Y29udmVyc2F0aW9uLnRpdGxlfVxuICAgICAgICAvPlxuICAgICAgICB7Y29udmVyc2F0aW9uLnBob25lTnVtYmVyID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUNvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZ1BlcnNvbl9faW5mb19fcHJvcGVydHlcIj5cbiAgICAgICAgICAgIHtjb252ZXJzYXRpb24ucGhvbmVOdW1iZXJ9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1Db250YWN0U3Bvb2ZpbmdSZXZpZXdEaWFsb2dQZXJzb25fX2luZm9fX3Byb3BlcnR5XCI+XG4gICAgICAgICAgPFNoYXJlZEdyb3VwTmFtZXNcbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtjb252ZXJzYXRpb24uc2hhcmVkR3JvdXBOYW1lcyB8fCBbXX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG5cbiAgaWYgKG9uQ2xpY2spIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLUNvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZ1BlcnNvblwiXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICA+XG4gICAgICAgIHtjb250ZW50c31cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUNvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZ1BlcnNvblwiPntjb250ZW50c308L2Rpdj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWtCO0FBS2xCLG9CQUF1QjtBQUV2QixvQkFBbUM7QUFDbkMseUJBQTRCO0FBQzVCLDhCQUFpQztBQVcxQixNQUFNLG9DQUVULHdCQUFDLEVBQUUsVUFBVSxjQUFjLG1CQUFtQixNQUFNLFNBQVMsWUFBWTtBQUMzRSw0QkFDRSxhQUFhLFNBQVMsVUFDdEIsb0VBQ0Y7QUFFQSxRQUFNLFdBQ0osd0ZBQ0UsbURBQUM7QUFBQSxPQUNLO0FBQUEsSUFDSixPQUFPLGtCQUFrQixhQUFhLE1BQU07QUFBQSxJQUM1QyxrQkFBa0IsYUFBYTtBQUFBLElBQy9CLE1BQU0seUJBQVc7QUFBQSxJQUNqQixXQUFVO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxHQUNGLEdBQ0EsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFDQyxRQUFPO0FBQUEsSUFDUCxPQUFPLGFBQWE7QUFBQSxHQUN0QixHQUNDLGFBQWEsY0FDWixtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ1osYUFBYSxXQUNoQixJQUNFLE1BQ0osbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0Esa0JBQWtCLGFBQWEsb0JBQW9CLENBQUM7QUFBQSxHQUN0RCxDQUNGLEdBQ0MsUUFDSCxDQUNGO0FBR0YsTUFBSSxTQUFTO0FBQ1gsV0FDRSxtREFBQztBQUFBLE1BQ0MsTUFBSztBQUFBLE1BQ0wsV0FBVTtBQUFBLE1BQ1Y7QUFBQSxPQUVDLFFBQ0g7QUFBQSxFQUVKO0FBRUEsU0FDRSxtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQTRDLFFBQVM7QUFFeEUsR0FyREk7IiwKICAibmFtZXMiOiBbXQp9Cg==
