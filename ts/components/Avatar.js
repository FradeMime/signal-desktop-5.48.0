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
var Avatar_exports = {};
__export(Avatar_exports, {
  Avatar: () => Avatar,
  AvatarBlur: () => AvatarBlur,
  AvatarSize: () => AvatarSize,
  AvatarStoryRing: () => AvatarStoryRing,
  _getBadgePlacement: () => _getBadgePlacement,
  _getBadgeSize: () => _getBadgeSize
});
module.exports = __toCommonJS(Avatar_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_lodash = require("lodash");
var import_Spinner = require("./Spinner");
var import_getInitials = require("../util/getInitials");
var import_Util = require("../types/Util");
var log = __toESM(require("../logging/log"));
var import_assert = require("../util/assert");
var import_shouldBlurAvatar = require("../util/shouldBlurAvatar");
var import_getBadgeImageFileLocalPath = require("../badges/getBadgeImageFileLocalPath");
var import_isBadgeVisible = require("../badges/isBadgeVisible");
var import_BadgeImageTheme = require("../badges/BadgeImageTheme");
var import_shouldShowBadges = require("../badges/shouldShowBadges");
var AvatarBlur = /* @__PURE__ */ ((AvatarBlur2) => {
  AvatarBlur2[AvatarBlur2["NoBlur"] = 0] = "NoBlur";
  AvatarBlur2[AvatarBlur2["BlurPicture"] = 1] = "BlurPicture";
  AvatarBlur2[AvatarBlur2["BlurPictureWithClickToView"] = 2] = "BlurPictureWithClickToView";
  return AvatarBlur2;
})(AvatarBlur || {});
var AvatarSize = /* @__PURE__ */ ((AvatarSize2) => {
  AvatarSize2[AvatarSize2["SIXTEEN"] = 16] = "SIXTEEN";
  AvatarSize2[AvatarSize2["TWENTY_EIGHT"] = 28] = "TWENTY_EIGHT";
  AvatarSize2[AvatarSize2["THIRTY_TWO"] = 32] = "THIRTY_TWO";
  AvatarSize2[AvatarSize2["THIRTY_SIX"] = 36] = "THIRTY_SIX";
  AvatarSize2[AvatarSize2["FORTY_EIGHT"] = 48] = "FORTY_EIGHT";
  AvatarSize2[AvatarSize2["FIFTY_TWO"] = 52] = "FIFTY_TWO";
  AvatarSize2[AvatarSize2["EIGHTY"] = 80] = "EIGHTY";
  AvatarSize2[AvatarSize2["NINETY_SIX"] = 96] = "NINETY_SIX";
  AvatarSize2[AvatarSize2["ONE_HUNDRED_TWELVE"] = 112] = "ONE_HUNDRED_TWELVE";
  return AvatarSize2;
})(AvatarSize || {});
var AvatarStoryRing = /* @__PURE__ */ ((AvatarStoryRing2) => {
  AvatarStoryRing2["Unread"] = "Unread";
  AvatarStoryRing2["Read"] = "Read";
  return AvatarStoryRing2;
})(AvatarStoryRing || {});
const BADGE_PLACEMENT_BY_SIZE = /* @__PURE__ */ new Map([
  [28, { bottom: -4, right: -2 }],
  [32, { bottom: -4, right: -2 }],
  [36, { bottom: -3, right: 0 }],
  [40, { bottom: -6, right: -4 }],
  [48, { bottom: -6, right: -4 }],
  [52, { bottom: -6, right: -2 }],
  [56, { bottom: -6, right: 0 }],
  [64, { bottom: -6, right: 0 }],
  [80, { bottom: -8, right: 0 }],
  [88, { bottom: -4, right: 3 }],
  [112, { bottom: -4, right: 3 }]
]);
const getDefaultBlur = /* @__PURE__ */ __name((...args) => (0, import_shouldBlurAvatar.shouldBlurAvatar)(...args) ? 1 /* BlurPicture */ : 0 /* NoBlur */, "getDefaultBlur");
const Avatar = /* @__PURE__ */ __name(({
  acceptedMessageRequest,
  avatarPath,
  badge,
  className,
  color = "A200",
  conversationType,
  i18n,
  isMe,
  innerRef,
  loading,
  noteToSelf,
  onClick,
  onClickBadge,
  sharedGroupNames,
  size,
  theme,
  title,
  unblurredAvatarPath,
  searchResult,
  storyRing,
  blur = getDefaultBlur({
    acceptedMessageRequest,
    avatarPath,
    isMe,
    sharedGroupNames,
    unblurredAvatarPath
  })
}) => {
  const [imageBroken, setImageBroken] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    setImageBroken(false);
  }, [avatarPath]);
  (0, import_react.useEffect)(() => {
    if (!avatarPath) {
      return import_lodash.noop;
    }
    const image = new Image();
    image.src = avatarPath;
    image.onerror = () => {
      log.warn("Avatar: Image failed to load; failing over to placeholder");
      setImageBroken(true);
    };
    return () => {
      image.onerror = import_lodash.noop;
    };
  }, [avatarPath]);
  const initials = (0, import_getInitials.getInitials)(title);
  const hasImage = !noteToSelf && avatarPath && !imageBroken;
  const shouldUseInitials = !hasImage && conversationType === "direct" && Boolean(initials);
  let contentsChildren;
  if (loading) {
    const svgSize = size < 40 ? "small" : "normal";
    contentsChildren = /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-Avatar__spinner-container"
    }, /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
      size: `${size - 8}px`,
      svgSize,
      direction: "on-avatar"
    }));
  } else if (hasImage) {
    (0, import_assert.assert)(avatarPath, "avatarPath should be defined here");
    (0, import_assert.assert)(blur !== 2 /* BlurPictureWithClickToView */ || size >= 100, 'Rendering "click to view" for a small avatar. This may not render correctly');
    const isBlurred = blur === 1 /* BlurPicture */ || blur === 2 /* BlurPictureWithClickToView */;
    contentsChildren = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-Avatar__image",
      style: {
        backgroundImage: `url('${encodeURI(avatarPath)}')`,
        ...isBlurred ? { filter: `blur(${Math.ceil(size / 2)}px)` } : {}
      }
    }), blur === 2 /* BlurPictureWithClickToView */ && /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-Avatar__click-to-view"
    }, i18n("view")));
  } else if (searchResult) {
    contentsChildren = /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-Avatar__icon", "module-Avatar__icon--search-result")
    });
  } else if (noteToSelf) {
    contentsChildren = /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-Avatar__icon", "module-Avatar__icon--note-to-self")
    });
  } else if (shouldUseInitials) {
    contentsChildren = /* @__PURE__ */ import_react.default.createElement("div", {
      "aria-hidden": "true",
      className: "module-Avatar__label",
      style: { fontSize: Math.ceil(size * 0.45) }
    }, initials);
  } else {
    contentsChildren = /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-Avatar__icon", `module-Avatar__icon--${conversationType}`)
    });
  }
  let contents;
  const contentsClassName = (0, import_classnames.default)("module-Avatar__contents", `module-Avatar__contents--${color}`);
  if (onClick) {
    contents = /* @__PURE__ */ import_react.default.createElement("button", {
      className: contentsClassName,
      type: "button",
      onClick
    }, contentsChildren);
  } else {
    contents = /* @__PURE__ */ import_react.default.createElement("div", {
      className: contentsClassName
    }, contentsChildren);
  }
  let badgeNode;
  const badgeSize = _getBadgeSize(size);
  if (badge && theme && !noteToSelf && badgeSize && (0, import_isBadgeVisible.isBadgeVisible)(badge) && (0, import_shouldShowBadges.shouldShowBadges)()) {
    const badgePlacement = _getBadgePlacement(size);
    const badgeTheme = theme === import_Util.ThemeType.light ? import_BadgeImageTheme.BadgeImageTheme.Light : import_BadgeImageTheme.BadgeImageTheme.Dark;
    const badgeImagePath = (0, import_getBadgeImageFileLocalPath.getBadgeImageFileLocalPath)(badge, badgeSize, badgeTheme);
    if (badgeImagePath) {
      const positionStyles = {
        width: badgeSize,
        height: badgeSize,
        ...badgePlacement
      };
      if (onClickBadge) {
        badgeNode = /* @__PURE__ */ import_react.default.createElement("button", {
          "aria-label": badge.name,
          className: "module-Avatar__badge module-Avatar__badge--button",
          onClick: onClickBadge,
          style: {
            backgroundImage: `url('${encodeURI(badgeImagePath)}')`,
            ...positionStyles
          },
          type: "button"
        });
      } else {
        badgeNode = /* @__PURE__ */ import_react.default.createElement("img", {
          alt: badge.name,
          className: "module-Avatar__badge module-Avatar__badge--static",
          src: badgeImagePath,
          style: positionStyles
        });
      }
    }
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    "aria-label": i18n("contactAvatarAlt", [title]),
    className: (0, import_classnames.default)("module-Avatar", hasImage ? "module-Avatar--with-image" : "module-Avatar--no-image", storyRing && "module-Avatar--with-story", storyRing === "Unread" /* Unread */ && "module-Avatar--with-story--unread", className),
    style: {
      minWidth: size,
      width: size,
      height: size
    },
    ref: innerRef
  }, contents, badgeNode);
}, "Avatar");
function _getBadgeSize(avatarSize) {
  if (avatarSize < 24) {
    return void 0;
  }
  if (avatarSize <= 36) {
    return 16;
  }
  if (avatarSize <= 64) {
    return 24;
  }
  if (avatarSize <= 112) {
    return 36;
  }
  return Math.round(avatarSize * 0.4);
}
function _getBadgePlacement(avatarSize) {
  return BADGE_PLACEMENT_BY_SIZE.get(avatarSize) || { bottom: 0, right: 0 };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Avatar,
  AvatarBlur,
  AvatarSize,
  AvatarStoryRing,
  _getBadgePlacement,
  _getBadgeSize
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHtcbiAgQ1NTUHJvcGVydGllcyxcbiAgRnVuY3Rpb25Db21wb25lbnQsXG4gIE1vdXNlRXZlbnQsXG4gIFJlYWN0Q2hpbGQsXG4gIFJlYWN0Tm9kZSxcbn0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSAnLi9TcGlubmVyJztcblxuaW1wb3J0IHsgZ2V0SW5pdGlhbHMgfSBmcm9tICcuLi91dGlsL2dldEluaXRpYWxzJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgVGhlbWVUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgdHlwZSB7IEF2YXRhckNvbG9yVHlwZSB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgdHlwZSB7IEJhZGdlVHlwZSB9IGZyb20gJy4uL2JhZGdlcy90eXBlcyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgc2hvdWxkQmx1ckF2YXRhciB9IGZyb20gJy4uL3V0aWwvc2hvdWxkQmx1ckF2YXRhcic7XG5pbXBvcnQgeyBnZXRCYWRnZUltYWdlRmlsZUxvY2FsUGF0aCB9IGZyb20gJy4uL2JhZGdlcy9nZXRCYWRnZUltYWdlRmlsZUxvY2FsUGF0aCc7XG5pbXBvcnQgeyBpc0JhZGdlVmlzaWJsZSB9IGZyb20gJy4uL2JhZGdlcy9pc0JhZGdlVmlzaWJsZSc7XG5pbXBvcnQgeyBCYWRnZUltYWdlVGhlbWUgfSBmcm9tICcuLi9iYWRnZXMvQmFkZ2VJbWFnZVRoZW1lJztcbmltcG9ydCB7IHNob3VsZFNob3dCYWRnZXMgfSBmcm9tICcuLi9iYWRnZXMvc2hvdWxkU2hvd0JhZGdlcyc7XG5cbmV4cG9ydCBlbnVtIEF2YXRhckJsdXIge1xuICBOb0JsdXIsXG4gIEJsdXJQaWN0dXJlLFxuICBCbHVyUGljdHVyZVdpdGhDbGlja1RvVmlldyxcbn1cblxuZXhwb3J0IGVudW0gQXZhdGFyU2l6ZSB7XG4gIFNJWFRFRU4gPSAxNixcbiAgVFdFTlRZX0VJR0hUID0gMjgsXG4gIFRISVJUWV9UV08gPSAzMixcbiAgVEhJUlRZX1NJWCA9IDM2LFxuICBGT1JUWV9FSUdIVCA9IDQ4LFxuICBGSUZUWV9UV08gPSA1MixcbiAgRUlHSFRZID0gODAsXG4gIE5JTkVUWV9TSVggPSA5NixcbiAgT05FX0hVTkRSRURfVFdFTFZFID0gMTEyLFxufVxuXG5leHBvcnQgZW51bSBBdmF0YXJTdG9yeVJpbmcge1xuICBVbnJlYWQgPSAnVW5yZWFkJyxcbiAgUmVhZCA9ICdSZWFkJyxcbn1cblxudHlwZSBCYWRnZVBsYWNlbWVudFR5cGUgPSB7IGJvdHRvbTogbnVtYmVyOyByaWdodDogbnVtYmVyIH07XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBhdmF0YXJQYXRoPzogc3RyaW5nO1xuICBibHVyPzogQXZhdGFyQmx1cjtcbiAgY29sb3I/OiBBdmF0YXJDb2xvclR5cGU7XG4gIGxvYWRpbmc/OiBib29sZWFuO1xuXG4gIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q6IGJvb2xlYW47XG4gIGNvbnZlcnNhdGlvblR5cGU6ICdncm91cCcgfCAnZGlyZWN0JztcbiAgaXNNZTogYm9vbGVhbjtcbiAgbmFtZT86IHN0cmluZztcbiAgbm90ZVRvU2VsZj86IGJvb2xlYW47XG4gIHBob25lTnVtYmVyPzogc3RyaW5nO1xuICBwcm9maWxlTmFtZT86IHN0cmluZztcbiAgc2hhcmVkR3JvdXBOYW1lczogQXJyYXk8c3RyaW5nPjtcbiAgc2l6ZTogQXZhdGFyU2l6ZTtcbiAgdGl0bGU6IHN0cmluZztcbiAgdW5ibHVycmVkQXZhdGFyUGF0aD86IHN0cmluZztcbiAgc2VhcmNoUmVzdWx0PzogYm9vbGVhbjtcbiAgc3RvcnlSaW5nPzogQXZhdGFyU3RvcnlSaW5nO1xuXG4gIG9uQ2xpY2s/OiAoZXZlbnQ6IE1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB1bmtub3duO1xuICBvbkNsaWNrQmFkZ2U/OiAoZXZlbnQ6IE1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB1bmtub3duO1xuXG4gIC8vIE1hdGNoZXMgUG9wcGVyJ3MgUmVmSGFuZGxlciB0eXBlXG4gIGlubmVyUmVmPzogUmVhY3QuUmVmPEhUTUxEaXZFbGVtZW50PjtcblxuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xufSAmIChcbiAgfCB7IGJhZGdlOiB1bmRlZmluZWQ7IHRoZW1lPzogVGhlbWVUeXBlIH1cbiAgfCB7IGJhZGdlOiBCYWRnZVR5cGU7IHRoZW1lOiBUaGVtZVR5cGUgfVxuKSAmXG4gIFBpY2s8UmVhY3QuSFRNTFByb3BzPEhUTUxEaXZFbGVtZW50PiwgJ2NsYXNzTmFtZSc+O1xuXG5jb25zdCBCQURHRV9QTEFDRU1FTlRfQllfU0laRSA9IG5ldyBNYXA8bnVtYmVyLCBCYWRnZVBsYWNlbWVudFR5cGU+KFtcbiAgWzI4LCB7IGJvdHRvbTogLTQsIHJpZ2h0OiAtMiB9XSxcbiAgWzMyLCB7IGJvdHRvbTogLTQsIHJpZ2h0OiAtMiB9XSxcbiAgWzM2LCB7IGJvdHRvbTogLTMsIHJpZ2h0OiAwIH1dLFxuICBbNDAsIHsgYm90dG9tOiAtNiwgcmlnaHQ6IC00IH1dLFxuICBbNDgsIHsgYm90dG9tOiAtNiwgcmlnaHQ6IC00IH1dLFxuICBbNTIsIHsgYm90dG9tOiAtNiwgcmlnaHQ6IC0yIH1dLFxuICBbNTYsIHsgYm90dG9tOiAtNiwgcmlnaHQ6IDAgfV0sXG4gIFs2NCwgeyBib3R0b206IC02LCByaWdodDogMCB9XSxcbiAgWzgwLCB7IGJvdHRvbTogLTgsIHJpZ2h0OiAwIH1dLFxuICBbODgsIHsgYm90dG9tOiAtNCwgcmlnaHQ6IDMgfV0sXG4gIFsxMTIsIHsgYm90dG9tOiAtNCwgcmlnaHQ6IDMgfV0sXG5dKTtcblxuY29uc3QgZ2V0RGVmYXVsdEJsdXIgPSAoXG4gIC4uLmFyZ3M6IFBhcmFtZXRlcnM8dHlwZW9mIHNob3VsZEJsdXJBdmF0YXI+XG4pOiBBdmF0YXJCbHVyID0+XG4gIHNob3VsZEJsdXJBdmF0YXIoLi4uYXJncykgPyBBdmF0YXJCbHVyLkJsdXJQaWN0dXJlIDogQXZhdGFyQmx1ci5Ob0JsdXI7XG5cbmV4cG9ydCBjb25zdCBBdmF0YXI6IEZ1bmN0aW9uQ29tcG9uZW50PFByb3BzPiA9ICh7XG4gIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3QsXG4gIGF2YXRhclBhdGgsXG4gIGJhZGdlLFxuICBjbGFzc05hbWUsXG4gIGNvbG9yID0gJ0EyMDAnLFxuICBjb252ZXJzYXRpb25UeXBlLFxuICBpMThuLFxuICBpc01lLFxuICBpbm5lclJlZixcbiAgbG9hZGluZyxcbiAgbm90ZVRvU2VsZixcbiAgb25DbGljayxcbiAgb25DbGlja0JhZGdlLFxuICBzaGFyZWRHcm91cE5hbWVzLFxuICBzaXplLFxuICB0aGVtZSxcbiAgdGl0bGUsXG4gIHVuYmx1cnJlZEF2YXRhclBhdGgsXG4gIHNlYXJjaFJlc3VsdCxcbiAgc3RvcnlSaW5nLFxuICBibHVyID0gZ2V0RGVmYXVsdEJsdXIoe1xuICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3QsXG4gICAgYXZhdGFyUGF0aCxcbiAgICBpc01lLFxuICAgIHNoYXJlZEdyb3VwTmFtZXMsXG4gICAgdW5ibHVycmVkQXZhdGFyUGF0aCxcbiAgfSksXG59KSA9PiB7XG4gIGNvbnN0IFtpbWFnZUJyb2tlbiwgc2V0SW1hZ2VCcm9rZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0SW1hZ2VCcm9rZW4oZmFsc2UpO1xuICB9LCBbYXZhdGFyUGF0aF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFhdmF0YXJQYXRoKSB7XG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9XG5cbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGltYWdlLnNyYyA9IGF2YXRhclBhdGg7XG4gICAgaW1hZ2Uub25lcnJvciA9ICgpID0+IHtcbiAgICAgIGxvZy53YXJuKCdBdmF0YXI6IEltYWdlIGZhaWxlZCB0byBsb2FkOyBmYWlsaW5nIG92ZXIgdG8gcGxhY2Vob2xkZXInKTtcbiAgICAgIHNldEltYWdlQnJva2VuKHRydWUpO1xuICAgIH07XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaW1hZ2Uub25lcnJvciA9IG5vb3A7XG4gICAgfTtcbiAgfSwgW2F2YXRhclBhdGhdKTtcblxuICBjb25zdCBpbml0aWFscyA9IGdldEluaXRpYWxzKHRpdGxlKTtcbiAgY29uc3QgaGFzSW1hZ2UgPSAhbm90ZVRvU2VsZiAmJiBhdmF0YXJQYXRoICYmICFpbWFnZUJyb2tlbjtcbiAgY29uc3Qgc2hvdWxkVXNlSW5pdGlhbHMgPVxuICAgICFoYXNJbWFnZSAmJiBjb252ZXJzYXRpb25UeXBlID09PSAnZGlyZWN0JyAmJiBCb29sZWFuKGluaXRpYWxzKTtcblxuICBsZXQgY29udGVudHNDaGlsZHJlbjogUmVhY3ROb2RlO1xuICBpZiAobG9hZGluZykge1xuICAgIGNvbnN0IHN2Z1NpemUgPSBzaXplIDwgNDAgPyAnc21hbGwnIDogJ25vcm1hbCc7XG4gICAgY29udGVudHNDaGlsZHJlbiA9IChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUF2YXRhcl9fc3Bpbm5lci1jb250YWluZXJcIj5cbiAgICAgICAgPFNwaW5uZXJcbiAgICAgICAgICBzaXplPXtgJHtzaXplIC0gOH1weGB9XG4gICAgICAgICAgc3ZnU2l6ZT17c3ZnU2l6ZX1cbiAgICAgICAgICBkaXJlY3Rpb249XCJvbi1hdmF0YXJcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSBlbHNlIGlmIChoYXNJbWFnZSkge1xuICAgIGFzc2VydChhdmF0YXJQYXRoLCAnYXZhdGFyUGF0aCBzaG91bGQgYmUgZGVmaW5lZCBoZXJlJyk7XG5cbiAgICBhc3NlcnQoXG4gICAgICBibHVyICE9PSBBdmF0YXJCbHVyLkJsdXJQaWN0dXJlV2l0aENsaWNrVG9WaWV3IHx8IHNpemUgPj0gMTAwLFxuICAgICAgJ1JlbmRlcmluZyBcImNsaWNrIHRvIHZpZXdcIiBmb3IgYSBzbWFsbCBhdmF0YXIuIFRoaXMgbWF5IG5vdCByZW5kZXIgY29ycmVjdGx5J1xuICAgICk7XG5cbiAgICBjb25zdCBpc0JsdXJyZWQgPVxuICAgICAgYmx1ciA9PT0gQXZhdGFyQmx1ci5CbHVyUGljdHVyZSB8fFxuICAgICAgYmx1ciA9PT0gQXZhdGFyQmx1ci5CbHVyUGljdHVyZVdpdGhDbGlja1RvVmlldztcbiAgICBjb250ZW50c0NoaWxkcmVuID0gKFxuICAgICAgPD5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1BdmF0YXJfX2ltYWdlXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCcke2VuY29kZVVSSShhdmF0YXJQYXRoKX0nKWAsXG4gICAgICAgICAgICAuLi4oaXNCbHVycmVkID8geyBmaWx0ZXI6IGBibHVyKCR7TWF0aC5jZWlsKHNpemUgLyAyKX1weClgIH0gOiB7fSksXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICAge2JsdXIgPT09IEF2YXRhckJsdXIuQmx1clBpY3R1cmVXaXRoQ2xpY2tUb1ZpZXcgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUF2YXRhcl9fY2xpY2stdG8tdmlld1wiPntpMThuKCd2aWV3Jyl9PC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8Lz5cbiAgICApO1xuICB9IGVsc2UgaWYgKHNlYXJjaFJlc3VsdCkge1xuICAgIGNvbnRlbnRzQ2hpbGRyZW4gPSAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAnbW9kdWxlLUF2YXRhcl9faWNvbicsXG4gICAgICAgICAgJ21vZHVsZS1BdmF0YXJfX2ljb24tLXNlYXJjaC1yZXN1bHQnXG4gICAgICAgICl9XG4gICAgICAvPlxuICAgICk7XG4gIH0gZWxzZSBpZiAobm90ZVRvU2VsZikge1xuICAgIGNvbnRlbnRzQ2hpbGRyZW4gPSAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAnbW9kdWxlLUF2YXRhcl9faWNvbicsXG4gICAgICAgICAgJ21vZHVsZS1BdmF0YXJfX2ljb24tLW5vdGUtdG8tc2VsZidcbiAgICAgICAgKX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSBlbHNlIGlmIChzaG91bGRVc2VJbml0aWFscykge1xuICAgIGNvbnRlbnRzQ2hpbGRyZW4gPSAoXG4gICAgICA8ZGl2XG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1BdmF0YXJfX2xhYmVsXCJcbiAgICAgICAgc3R5bGU9e3sgZm9udFNpemU6IE1hdGguY2VpbChzaXplICogMC40NSkgfX1cbiAgICAgID5cbiAgICAgICAge2luaXRpYWxzfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBjb250ZW50c0NoaWxkcmVuID0gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgJ21vZHVsZS1BdmF0YXJfX2ljb24nLFxuICAgICAgICAgIGBtb2R1bGUtQXZhdGFyX19pY29uLS0ke2NvbnZlcnNhdGlvblR5cGV9YFxuICAgICAgICApfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgbGV0IGNvbnRlbnRzOiBSZWFjdENoaWxkO1xuICBjb25zdCBjb250ZW50c0NsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXG4gICAgJ21vZHVsZS1BdmF0YXJfX2NvbnRlbnRzJyxcbiAgICBgbW9kdWxlLUF2YXRhcl9fY29udGVudHMtLSR7Y29sb3J9YFxuICApO1xuICBpZiAob25DbGljaykge1xuICAgIGNvbnRlbnRzID0gKFxuICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2NvbnRlbnRzQ2xhc3NOYW1lfSB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17b25DbGlja30+XG4gICAgICAgIHtjb250ZW50c0NoaWxkcmVufVxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBjb250ZW50cyA9IDxkaXYgY2xhc3NOYW1lPXtjb250ZW50c0NsYXNzTmFtZX0+e2NvbnRlbnRzQ2hpbGRyZW59PC9kaXY+O1xuICB9XG5cbiAgbGV0IGJhZGdlTm9kZTogUmVhY3ROb2RlO1xuICBjb25zdCBiYWRnZVNpemUgPSBfZ2V0QmFkZ2VTaXplKHNpemUpO1xuICBpZiAoXG4gICAgYmFkZ2UgJiZcbiAgICB0aGVtZSAmJlxuICAgICFub3RlVG9TZWxmICYmXG4gICAgYmFkZ2VTaXplICYmXG4gICAgaXNCYWRnZVZpc2libGUoYmFkZ2UpICYmXG4gICAgc2hvdWxkU2hvd0JhZGdlcygpXG4gICkge1xuICAgIGNvbnN0IGJhZGdlUGxhY2VtZW50ID0gX2dldEJhZGdlUGxhY2VtZW50KHNpemUpO1xuICAgIGNvbnN0IGJhZGdlVGhlbWUgPVxuICAgICAgdGhlbWUgPT09IFRoZW1lVHlwZS5saWdodCA/IEJhZGdlSW1hZ2VUaGVtZS5MaWdodCA6IEJhZGdlSW1hZ2VUaGVtZS5EYXJrO1xuICAgIGNvbnN0IGJhZGdlSW1hZ2VQYXRoID0gZ2V0QmFkZ2VJbWFnZUZpbGVMb2NhbFBhdGgoXG4gICAgICBiYWRnZSxcbiAgICAgIGJhZGdlU2l6ZSxcbiAgICAgIGJhZGdlVGhlbWVcbiAgICApO1xuICAgIGlmIChiYWRnZUltYWdlUGF0aCkge1xuICAgICAgY29uc3QgcG9zaXRpb25TdHlsZXM6IENTU1Byb3BlcnRpZXMgPSB7XG4gICAgICAgIHdpZHRoOiBiYWRnZVNpemUsXG4gICAgICAgIGhlaWdodDogYmFkZ2VTaXplLFxuICAgICAgICAuLi5iYWRnZVBsYWNlbWVudCxcbiAgICAgIH07XG4gICAgICBpZiAob25DbGlja0JhZGdlKSB7XG4gICAgICAgIGJhZGdlTm9kZSA9IChcbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtiYWRnZS5uYW1lfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLUF2YXRhcl9fYmFkZ2UgbW9kdWxlLUF2YXRhcl9fYmFkZ2UtLWJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrQmFkZ2V9XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJyR7ZW5jb2RlVVJJKGJhZGdlSW1hZ2VQYXRoKX0nKWAsXG4gICAgICAgICAgICAgIC4uLnBvc2l0aW9uU3R5bGVzLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiYWRnZU5vZGUgPSAoXG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgYWx0PXtiYWRnZS5uYW1lfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLUF2YXRhcl9fYmFkZ2UgbW9kdWxlLUF2YXRhcl9fYmFkZ2UtLXN0YXRpY1wiXG4gICAgICAgICAgICBzcmM9e2JhZGdlSW1hZ2VQYXRofVxuICAgICAgICAgICAgc3R5bGU9e3Bvc2l0aW9uU3R5bGVzfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBhcmlhLWxhYmVsPXtpMThuKCdjb250YWN0QXZhdGFyQWx0JywgW3RpdGxlXSl9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICdtb2R1bGUtQXZhdGFyJyxcbiAgICAgICAgaGFzSW1hZ2UgPyAnbW9kdWxlLUF2YXRhci0td2l0aC1pbWFnZScgOiAnbW9kdWxlLUF2YXRhci0tbm8taW1hZ2UnLFxuICAgICAgICBzdG9yeVJpbmcgJiYgJ21vZHVsZS1BdmF0YXItLXdpdGgtc3RvcnknLFxuICAgICAgICBzdG9yeVJpbmcgPT09IEF2YXRhclN0b3J5UmluZy5VbnJlYWQgJiZcbiAgICAgICAgICAnbW9kdWxlLUF2YXRhci0td2l0aC1zdG9yeS0tdW5yZWFkJyxcbiAgICAgICAgY2xhc3NOYW1lXG4gICAgICApfVxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgbWluV2lkdGg6IHNpemUsXG4gICAgICAgIHdpZHRoOiBzaXplLFxuICAgICAgICBoZWlnaHQ6IHNpemUsXG4gICAgICB9fVxuICAgICAgcmVmPXtpbm5lclJlZn1cbiAgICA+XG4gICAgICB7Y29udGVudHN9XG4gICAgICB7YmFkZ2VOb2RlfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gVGhpcyBpcyBvbmx5IGV4cG9ydGVkIGZvciB0ZXN0aW5nLlxuZXhwb3J0IGZ1bmN0aW9uIF9nZXRCYWRnZVNpemUoYXZhdGFyU2l6ZTogbnVtYmVyKTogdW5kZWZpbmVkIHwgbnVtYmVyIHtcbiAgaWYgKGF2YXRhclNpemUgPCAyNCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKGF2YXRhclNpemUgPD0gMzYpIHtcbiAgICByZXR1cm4gMTY7XG4gIH1cbiAgaWYgKGF2YXRhclNpemUgPD0gNjQpIHtcbiAgICByZXR1cm4gMjQ7XG4gIH1cbiAgaWYgKGF2YXRhclNpemUgPD0gMTEyKSB7XG4gICAgcmV0dXJuIDM2O1xuICB9XG4gIHJldHVybiBNYXRoLnJvdW5kKGF2YXRhclNpemUgKiAwLjQpO1xufVxuXG4vLyBUaGlzIGlzIG9ubHkgZXhwb3J0ZWQgZm9yIHRlc3RpbmcuXG5leHBvcnQgZnVuY3Rpb24gX2dldEJhZGdlUGxhY2VtZW50KFxuICBhdmF0YXJTaXplOiBudW1iZXJcbik6IFJlYWRvbmx5PEJhZGdlUGxhY2VtZW50VHlwZT4ge1xuICByZXR1cm4gQkFER0VfUExBQ0VNRU5UX0JZX1NJWkUuZ2V0KGF2YXRhclNpemUpIHx8IHsgYm90dG9tOiAwLCByaWdodDogMCB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVQSxtQkFBMkM7QUFDM0Msd0JBQXVCO0FBQ3ZCLG9CQUFxQjtBQUVyQixxQkFBd0I7QUFFeEIseUJBQTRCO0FBRTVCLGtCQUEwQjtBQUcxQixVQUFxQjtBQUNyQixvQkFBdUI7QUFDdkIsOEJBQWlDO0FBQ2pDLHdDQUEyQztBQUMzQyw0QkFBK0I7QUFDL0IsNkJBQWdDO0FBQ2hDLDhCQUFpQztBQUUxQixJQUFLLGFBQUwsa0JBQUssZ0JBQUw7QUFDTDtBQUNBO0FBQ0E7QUFIVTtBQUFBO0FBTUwsSUFBSyxhQUFMLGtCQUFLLGdCQUFMO0FBQ0wsdUNBQVUsTUFBVjtBQUNBLDRDQUFlLE1BQWY7QUFDQSwwQ0FBYSxNQUFiO0FBQ0EsMENBQWEsTUFBYjtBQUNBLDJDQUFjLE1BQWQ7QUFDQSx5Q0FBWSxNQUFaO0FBQ0Esc0NBQVMsTUFBVDtBQUNBLDBDQUFhLE1BQWI7QUFDQSxrREFBcUIsT0FBckI7QUFUVTtBQUFBO0FBWUwsSUFBSyxrQkFBTCxrQkFBSyxxQkFBTDtBQUNMLCtCQUFTO0FBQ1QsNkJBQU87QUFGRztBQUFBO0FBd0NaLE1BQU0sMEJBQTBCLG9CQUFJLElBQWdDO0FBQUEsRUFDbEUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxJQUFJLE9BQU8sR0FBRyxDQUFDO0FBQUEsRUFDOUIsQ0FBQyxJQUFJLEVB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
