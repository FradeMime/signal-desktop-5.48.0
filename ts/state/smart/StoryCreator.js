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
var StoryCreator_exports = {};
__export(StoryCreator_exports, {
  SmartStoryCreator: () => SmartStoryCreator
});
module.exports = __toCommonJS(StoryCreator_exports);
var import_react = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_lodash = require("lodash");
var import_LinkPreview = require("../../types/LinkPreview");
var import_StoryCreator = require("../../components/StoryCreator");
var import_user = require("../selectors/user");
var import_linkPreviews = require("../selectors/linkPreviews");
var import_linkPreviews2 = require("../ducks/linkPreviews");
function SmartStoryCreator({ onClose }) {
  const { debouncedMaybeGrabLinkPreview } = (0, import_linkPreviews2.useLinkPreviewActions)();
  const i18n = (0, import_react_redux.useSelector)(import_user.getIntl);
  const linkPreviewForSource = (0, import_react_redux.useSelector)(import_linkPreviews.getLinkPreview);
  return /* @__PURE__ */ import_react.default.createElement(import_StoryCreator.StoryCreator, {
    debouncedMaybeGrabLinkPreview,
    i18n,
    linkPreview: linkPreviewForSource(import_LinkPreview.LinkPreviewSourceType.StoryCreator),
    onClose,
    onNext: import_lodash.noop
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartStoryCreator
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RvcnlDcmVhdG9yLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHsgTGlua1ByZXZpZXdTb3VyY2VUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvTGlua1ByZXZpZXcnO1xuaW1wb3J0IHsgU3RvcnlDcmVhdG9yIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9TdG9yeUNyZWF0b3InO1xuaW1wb3J0IHsgZ2V0SW50bCB9IGZyb20gJy4uL3NlbGVjdG9ycy91c2VyJztcbmltcG9ydCB7IGdldExpbmtQcmV2aWV3IH0gZnJvbSAnLi4vc2VsZWN0b3JzL2xpbmtQcmV2aWV3cyc7XG5pbXBvcnQgeyB1c2VMaW5rUHJldmlld0FjdGlvbnMgfSBmcm9tICcuLi9kdWNrcy9saW5rUHJldmlld3MnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIG9uQ2xvc2U6ICgpID0+IHVua25vd247XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gU21hcnRTdG9yeUNyZWF0b3IoeyBvbkNsb3NlIH06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50IHwgbnVsbCB7XG4gIGNvbnN0IHsgZGVib3VuY2VkTWF5YmVHcmFiTGlua1ByZXZpZXcgfSA9IHVzZUxpbmtQcmV2aWV3QWN0aW9ucygpO1xuXG4gIGNvbnN0IGkxOG4gPSB1c2VTZWxlY3RvcjxTdGF0ZVR5cGUsIExvY2FsaXplclR5cGU+KGdldEludGwpO1xuICBjb25zdCBsaW5rUHJldmlld0ZvclNvdXJjZSA9IHVzZVNlbGVjdG9yKGdldExpbmtQcmV2aWV3KTtcblxuICByZXR1cm4gKFxuICAgIDxTdG9yeUNyZWF0b3JcbiAgICAgIGRlYm91bmNlZE1heWJlR3JhYkxpbmtQcmV2aWV3PXtkZWJvdW5jZWRNYXliZUdyYWJMaW5rUHJldmlld31cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBsaW5rUHJldmlldz17bGlua1ByZXZpZXdGb3JTb3VyY2UoTGlua1ByZXZpZXdTb3VyY2VUeXBlLlN0b3J5Q3JlYXRvcil9XG4gICAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgb25OZXh0PXtub29wfVxuICAgIC8+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLHlCQUE0QjtBQUM1QixvQkFBcUI7QUFJckIseUJBQXNDO0FBQ3RDLDBCQUE2QjtBQUM3QixrQkFBd0I7QUFDeEIsMEJBQStCO0FBQy9CLDJCQUFzQztBQU0vQiwyQkFBMkIsRUFBRSxXQUEwQztBQUM1RSxRQUFNLEVBQUUsa0NBQWtDLGdEQUFzQjtBQUVoRSxRQUFNLE9BQU8sb0NBQXNDLG1CQUFPO0FBQzFELFFBQU0sdUJBQXVCLG9DQUFZLGtDQUFjO0FBRXZELFNBQ0UsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0EsYUFBYSxxQkFBcUIseUNBQXNCLFlBQVk7QUFBQSxJQUNwRTtBQUFBLElBQ0EsUUFBUTtBQUFBLEdBQ1Y7QUFFSjtBQWZnQiIsCiAgIm5hbWVzIjogW10KfQo=
