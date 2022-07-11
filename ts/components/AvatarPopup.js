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
var AvatarPopup_exports = {};
__export(AvatarPopup_exports, {
  AvatarPopup: () => AvatarPopup
});
module.exports = __toCommonJS(AvatarPopup_exports);
var React = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_Avatar = require("./Avatar");
var import_useRestoreFocus = require("../hooks/useRestoreFocus");
const AvatarPopup = /* @__PURE__ */ __name((props) => {
  const {
    hasPendingUpdate,
    i18n,
    name,
    onEditProfile,
    onViewArchive,
    onViewPreferences,
    phoneNumber,
    profileName,
    startUpdate,
    style,
    title
  } = props;
  const shouldShowNumber = Boolean(name || profileName);
  const [focusRef] = (0, import_useRestoreFocus.useRestoreFocus)();
  return /* @__PURE__ */ React.createElement("div", {
    style,
    className: "module-avatar-popup"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "module-avatar-popup__profile",
    onClick: onEditProfile,
    ref: focusRef,
    type: "button"
  }, /* @__PURE__ */ React.createElement(import_Avatar.Avatar, {
    ...props,
    size: 52
  }), /* @__PURE__ */ React.createElement("div", {
    className: "module-avatar-popup__profile__text"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "module-avatar-popup__profile__name"
  }, profileName || title), shouldShowNumber ? /* @__PURE__ */ React.createElement("div", {
    className: "module-avatar-popup__profile__number"
  }, phoneNumber) : null)), /* @__PURE__ */ React.createElement("hr", {
    className: "module-avatar-popup__divider"
  }), /* @__PURE__ */ React.createElement("button", {
    type: "button",
    className: "module-avatar-popup__item",
    onClick: onViewPreferences
  }, /* @__PURE__ */ React.createElement("div", {
    className: (0, import_classnames.default)("module-avatar-popup__item__icon", "module-avatar-popup__item__icon-settings")
  }), /* @__PURE__ */ React.createElement("div", {
    className: "module-avatar-popup__item__text"
  }, i18n("mainMenuSettings"))), /* @__PURE__ */ React.createElement("button", {
    type: "button",
    className: "module-avatar-popup__item",
    onClick: onViewArchive
  }, /* @__PURE__ */ React.createElement("div", {
    className: (0, import_classnames.default)("module-avatar-popup__item__icon", "module-avatar-popup__item__icon-archive")
  }), /* @__PURE__ */ React.createElement("div", {
    className: "module-avatar-popup__item__text"
  }, i18n("avatarMenuViewArchive"))), hasPendingUpdate && /* @__PURE__ */ React.createElement("button", {
    type: "button",
    className: "module-avatar-popup__item",
    onClick: startUpdate
  }, /* @__PURE__ */ React.createElement("div", {
    className: (0, import_classnames.default)("module-avatar-popup__item__icon", "module-avatar-popup__item__icon--update")
  }), /* @__PURE__ */ React.createElement("div", {
    className: "module-avatar-popup__item__text"
  }, i18n("avatarMenuUpdateAvailable")), /* @__PURE__ */ React.createElement("div", {
    className: "module-avatar-popup__item--badge"
  })));
}, "AvatarPopup");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AvatarPopup
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyUG9wdXAudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHMgYXMgQXZhdGFyUHJvcHMgfSBmcm9tICcuL0F2YXRhcic7XG5pbXBvcnQgeyBBdmF0YXIgfSBmcm9tICcuL0F2YXRhcic7XG5pbXBvcnQgeyB1c2VSZXN0b3JlRm9jdXMgfSBmcm9tICcuLi9ob29rcy91c2VSZXN0b3JlRm9jdXMnO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUsIFRoZW1lVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgcmVhZG9ubHkgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgcmVhZG9ubHkgdGhlbWU6IFRoZW1lVHlwZTtcblxuICBoYXNQZW5kaW5nVXBkYXRlOiBib29sZWFuO1xuICBzdGFydFVwZGF0ZTogKCkgPT4gdW5rbm93bjtcblxuICBvbkVkaXRQcm9maWxlOiAoKSA9PiB1bmtub3duO1xuICBvblZpZXdQcmVmZXJlbmNlczogKCkgPT4gdW5rbm93bjtcbiAgb25WaWV3QXJjaGl2ZTogKCkgPT4gdW5rbm93bjtcblxuICAvLyBNYXRjaGVzIFBvcHBlcidzIFJlZkhhbmRsZXIgdHlwZVxuICBpbm5lclJlZj86IFJlYWN0LlJlZjxIVE1MRGl2RWxlbWVudD47XG4gIHN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzO1xufSAmIE9taXQ8QXZhdGFyUHJvcHMsICdvbkNsaWNrJz47XG5cbmV4cG9ydCBjb25zdCBBdmF0YXJQb3B1cCA9IChwcm9wczogUHJvcHMpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHtcbiAgICBoYXNQZW5kaW5nVXBkYXRlLFxuICAgIGkxOG4sXG4gICAgbmFtZSxcbiAgICBvbkVkaXRQcm9maWxlLFxuICAgIG9uVmlld0FyY2hpdmUsXG4gICAgb25WaWV3UHJlZmVyZW5jZXMsXG4gICAgcGhvbmVOdW1iZXIsXG4gICAgcHJvZmlsZU5hbWUsXG4gICAgc3RhcnRVcGRhdGUsXG4gICAgc3R5bGUsXG4gICAgdGl0bGUsXG4gIH0gPSBwcm9wcztcblxuICBjb25zdCBzaG91bGRTaG93TnVtYmVyID0gQm9vbGVhbihuYW1lIHx8IHByb2ZpbGVOYW1lKTtcblxuICAvLyBOb3RlOiBtZWNoYW5pc21zIHRvIGRpc21pc3MgdGhpcyB2aWV3IGFyZSBhbGwgaW4gaXRzIGhvc3QsIE1haW5IZWFkZXJcblxuICAvLyBGb2N1cyBmaXJzdCBidXR0b24gYWZ0ZXIgaW5pdGlhbCByZW5kZXIsIHJlc3RvcmUgZm9jdXMgb24gdGVhcmRvd25cbiAgY29uc3QgW2ZvY3VzUmVmXSA9IHVzZVJlc3RvcmVGb2N1cygpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT1cIm1vZHVsZS1hdmF0YXItcG9wdXBcIj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWF2YXRhci1wb3B1cF9fcHJvZmlsZVwiXG4gICAgICAgIG9uQ2xpY2s9e29uRWRpdFByb2ZpbGV9XG4gICAgICAgIHJlZj17Zm9jdXNSZWZ9XG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgPlxuICAgICAgICA8QXZhdGFyIHsuLi5wcm9wc30gc2l6ZT17NTJ9IC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWF2YXRhci1wb3B1cF9fcHJvZmlsZV9fdGV4dFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWF2YXRhci1wb3B1cF9fcHJvZmlsZV9fbmFtZVwiPlxuICAgICAgICAgICAge3Byb2ZpbGVOYW1lIHx8IHRpdGxlfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtzaG91bGRTaG93TnVtYmVyID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtYXZhdGFyLXBvcHVwX19wcm9maWxlX19udW1iZXJcIj5cbiAgICAgICAgICAgICAge3Bob25lTnVtYmVyfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9idXR0b24+XG4gICAgICA8aHIgY2xhc3NOYW1lPVwibW9kdWxlLWF2YXRhci1wb3B1cF9fZGl2aWRlclwiIC8+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtYXZhdGFyLXBvcHVwX19pdGVtXCJcbiAgICAgICAgb25DbGljaz17b25WaWV3UHJlZmVyZW5jZXN9XG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAnbW9kdWxlLWF2YXRhci1wb3B1cF9faXRlbV9faWNvbicsXG4gICAgICAgICAgICAnbW9kdWxlLWF2YXRhci1wb3B1cF9faXRlbV9faWNvbi1zZXR0aW5ncydcbiAgICAgICAgICApfVxuICAgICAgICAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1hdmF0YXItcG9wdXBfX2l0ZW1fX3RleHRcIj5cbiAgICAgICAgICB7aTE4bignbWFpbk1lbnVTZXR0aW5ncycpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWF2YXRhci1wb3B1cF9faXRlbVwiXG4gICAgICAgIG9uQ2xpY2s9e29uVmlld0FyY2hpdmV9XG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAnbW9kdWxlLWF2YXRhci1wb3B1cF9faXRlbV9faWNvbicsXG4gICAgICAgICAgICAnbW9kdWxlLWF2YXRhci1wb3B1cF9faXRlbV9faWNvbi1hcmNoaXZlJ1xuICAgICAgICAgICl9XG4gICAgICAgIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWF2YXRhci1wb3B1cF9faXRlbV9fdGV4dFwiPlxuICAgICAgICAgIHtpMThuKCdhdmF0YXJNZW51Vmlld0FyY2hpdmUnKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIHtoYXNQZW5kaW5nVXBkYXRlICYmIChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1hdmF0YXItcG9wdXBfX2l0ZW1cIlxuICAgICAgICAgIG9uQ2xpY2s9e3N0YXJ0VXBkYXRlfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAnbW9kdWxlLWF2YXRhci1wb3B1cF9faXRlbV9faWNvbicsXG4gICAgICAgICAgICAgICdtb2R1bGUtYXZhdGFyLXBvcHVwX19pdGVtX19pY29uLS11cGRhdGUnXG4gICAgICAgICAgICApfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtYXZhdGFyLXBvcHVwX19pdGVtX190ZXh0XCI+XG4gICAgICAgICAgICB7aTE4bignYXZhdGFyTWVudVVwZGF0ZUF2YWlsYWJsZScpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWF2YXRhci1wb3B1cF9faXRlbS0tYmFkZ2VcIiAvPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHdCQUF1QjtBQUd2QixvQkFBdUI7QUFDdkIsNkJBQWdDO0FBb0J6QixNQUFNLGNBQWMsd0JBQUMsVUFBOEI7QUFDeEQsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUVKLFFBQU0sbUJBQW1CLFFBQVEsUUFBUSxXQUFXO0FBS3BELFFBQU0sQ0FBQyxZQUFZLDRDQUFnQjtBQUVuQyxTQUNFLG9DQUFDO0FBQUEsSUFBSTtBQUFBLElBQWMsV0FBVTtBQUFBLEtBQzNCLG9DQUFDO0FBQUEsSUFDQyxXQUFVO0FBQUEsSUFDVixTQUFTO0FBQUEsSUFDVCxLQUFLO0FBQUEsSUFDTCxNQUFLO0FBQUEsS0FFTCxvQ0FBQztBQUFBLE9BQVc7QUFBQSxJQUFPLE1BQU07QUFBQSxHQUFJLEdBQzdCLG9DQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixvQ0FBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ1osZUFBZSxLQUNsQixHQUNDLG1CQUNDLG9DQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDWixXQUNILElBQ0UsSUFDTixDQUNGLEdBQ0Esb0NBQUM7QUFBQSxJQUFHLFdBQVU7QUFBQSxHQUErQixHQUM3QyxvQ0FBQztBQUFBLElBQ0MsTUFBSztBQUFBLElBQ0wsV0FBVTtBQUFBLElBQ1YsU0FBUztBQUFBLEtBRVQsb0NBQUM7QUFBQSxJQUNDLFdBQVcsK0JBQ1QsbUNBQ0EsMENBQ0Y7QUFBQSxHQUNGLEdBQ0Esb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNaLEtBQUssa0JBQWtCLENBQzFCLENBQ0YsR0FDQSxvQ0FBQztBQUFBLElBQ0MsTUFBSztBQUFBLElBQ0wsV0FBVTtBQUFBLElBQ1YsU0FBUztBQUFBLEtBRVQsb0NBQUM7QUFBQSxJQUNDLFdBQVcsK0JBQ1QsbUNBQ0EseUNBQ0Y7QUFBQSxHQUNGLEdBQ0Esb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNaLEtBQUssdUJBQXVCLENBQy9CLENBQ0YsR0FDQyxvQkFDQyxvQ0FBQztBQUFBLElBQ0MsTUFBSztBQUFBLElBQ0wsV0FBVTtBQUFBLElBQ1YsU0FBUztBQUFBLEtBRVQsb0NBQUM7QUFBQSxJQUNDLFdBQVcsK0JBQ1QsbUNBQ0EseUNBQ0Y7QUFBQSxHQUNGLEdBQ0Esb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNaLEtBQUssMkJBQTJCLENBQ25DLEdBQ0Esb0NBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxHQUFtQyxDQUNwRCxDQUVKO0FBRUosR0E3RjJCOyIsCiAgIm5hbWVzIjogW10KfQo=
