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
var MainHeader_exports = {};
__export(MainHeader_exports, {
  MainHeader: () => MainHeader
});
module.exports = __toCommonJS(MainHeader_exports);
var import_react = __toESM(require("react"));
var import_react_popper = require("react-popper");
var import_react_dom = require("react-dom");
var import_Whisper = require("../shims/Whisper");
var import_Avatar = require("./Avatar");
var import_AvatarPopup = require("./AvatarPopup");
class MainHeader extends import_react.default.Component {
  constructor(props) {
    super(props);
    this.containerRef = import_react.default.createRef();
    this.handleOutsideClick = /* @__PURE__ */ __name(({ target }) => {
      const { popperRoot, showingAvatarPopup } = this.state;
      if (showingAvatarPopup && popperRoot && !popperRoot.contains(target) && !this.containerRef.current?.contains(target)) {
        this.hideAvatarPopup();
      }
    }, "handleOutsideClick");
    this.showAvatarPopup = /* @__PURE__ */ __name(() => {
      const popperRoot = document.createElement("div");
      document.body.appendChild(popperRoot);
      this.setState({
        showingAvatarPopup: true,
        popperRoot
      });
      document.addEventListener("click", this.handleOutsideClick);
    }, "showAvatarPopup");
    this.hideAvatarPopup = /* @__PURE__ */ __name(() => {
      const { popperRoot } = this.state;
      document.removeEventListener("click", this.handleOutsideClick);
      this.setState({
        showingAvatarPopup: false,
        popperRoot: null
      });
      if (popperRoot && document.body.contains(popperRoot)) {
        document.body.removeChild(popperRoot);
      }
    }, "hideAvatarPopup");
    this.handleGlobalKeyDown = /* @__PURE__ */ __name((event) => {
      const { showingAvatarPopup } = this.state;
      const { key } = event;
      if (showingAvatarPopup && key === "Escape") {
        this.hideAvatarPopup();
      }
    }, "handleGlobalKeyDown");
    this.state = {
      showingAvatarPopup: false,
      popperRoot: null
    };
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleGlobalKeyDown);
  }
  componentWillUnmount() {
    const { popperRoot } = this.state;
    document.removeEventListener("click", this.handleOutsideClick);
    document.removeEventListener("keydown", this.handleGlobalKeyDown);
    if (popperRoot && document.body.contains(popperRoot)) {
      document.body.removeChild(popperRoot);
    }
  }
  render() {
    const {
      areStoriesEnabled,
      avatarPath,
      badge,
      color,
      hasPendingUpdate,
      i18n,
      name,
      phoneNumber,
      profileName,
      showArchivedConversations,
      startComposing,
      startUpdate,
      theme,
      title,
      toggleProfileEditor,
      toggleStoriesView
    } = this.props;
    const { showingAvatarPopup, popperRoot } = this.state;
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-main-header"
    }, /* @__PURE__ */ import_react.default.createElement(import_react_popper.Manager, null, /* @__PURE__ */ import_react.default.createElement(import_react_popper.Reference, null, ({ ref }) => /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-main-header__avatar--container",
      ref: this.containerRef
    }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
      acceptedMessageRequest: true,
      avatarPath,
      badge,
      className: "module-main-header__avatar",
      color,
      conversationType: "direct",
      i18n,
      isMe: true,
      name,
      phoneNumber,
      profileName,
      theme,
      title,
      sharedGroupNames: [],
      size: 28,
      innerRef: ref,
      onClick: this.showAvatarPopup
    }), hasPendingUpdate && /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-main-header__avatar--badged"
    }))), showingAvatarPopup && popperRoot ? (0, import_react_dom.createPortal)(/* @__PURE__ */ import_react.default.createElement(import_react_popper.Popper, {
      placement: "bottom-end"
    }, ({ ref, style }) => /* @__PURE__ */ import_react.default.createElement(import_AvatarPopup.AvatarPopup, {
      acceptedMessageRequest: true,
      badge,
      innerRef: ref,
      i18n,
      isMe: true,
      style: { ...style, zIndex: 10 },
      color,
      conversationType: "direct",
      name,
      phoneNumber,
      profileName,
      theme,
      title,
      avatarPath,
      size: 28,
      hasPendingUpdate,
      startUpdate,
      sharedGroupNames: [],
      onEditProfile: () => {
        toggleProfileEditor();
        this.hideAvatarPopup();
      },
      onViewPreferences: () => {
        (0, import_Whisper.showSettings)();
        this.hideAvatarPopup();
      },
      onViewArchive: () => {
        showArchivedConversations();
        this.hideAvatarPopup();
      }
    })), popperRoot) : null), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-main-header__icon-container"
    }, areStoriesEnabled && /* @__PURE__ */ import_react.default.createElement("button", {
      "aria-label": i18n("stories"),
      className: "module-main-header__stories-icon",
      onClick: toggleStoriesView,
      title: i18n("stories"),
      type: "button"
    }), /* @__PURE__ */ import_react.default.createElement("button", {
      "aria-label": i18n("newConversation"),
      className: "module-main-header__compose-icon",
      onClick: startComposing,
      title: i18n("newConversation"),
      type: "button"
    })));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MainHeader
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWFpbkhlYWRlci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFuYWdlciwgUG9wcGVyLCBSZWZlcmVuY2UgfSBmcm9tICdyZWFjdC1wb3BwZXInO1xuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IHsgc2hvd1NldHRpbmdzIH0gZnJvbSAnLi4vc2hpbXMvV2hpc3Blcic7XG5pbXBvcnQgeyBBdmF0YXIgfSBmcm9tICcuL0F2YXRhcic7XG5pbXBvcnQgeyBBdmF0YXJQb3B1cCB9IGZyb20gJy4vQXZhdGFyUG9wdXAnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlLCBUaGVtZVR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgQXZhdGFyQ29sb3JUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB0eXBlIHsgQmFkZ2VUeXBlIH0gZnJvbSAnLi4vYmFkZ2VzL3R5cGVzJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBhcmVTdG9yaWVzRW5hYmxlZDogYm9vbGVhbjtcbiAgYXZhdGFyUGF0aD86IHN0cmluZztcbiAgYmFkZ2U/OiBCYWRnZVR5cGU7XG4gIGNvbG9yPzogQXZhdGFyQ29sb3JUeXBlO1xuICBoYXNQZW5kaW5nVXBkYXRlOiBib29sZWFuO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBpc01lPzogYm9vbGVhbjtcbiAgaXNWZXJpZmllZD86IGJvb2xlYW47XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHBob25lTnVtYmVyPzogc3RyaW5nO1xuICBwcm9maWxlTmFtZT86IHN0cmluZztcbiAgdGhlbWU6IFRoZW1lVHlwZTtcbiAgdGl0bGU6IHN0cmluZztcblxuICBzaG93QXJjaGl2ZWRDb252ZXJzYXRpb25zOiAoKSA9PiB2b2lkO1xuICBzdGFydENvbXBvc2luZzogKCkgPT4gdm9pZDtcbiAgc3RhcnRVcGRhdGU6ICgpID0+IHVua25vd247XG4gIHRvZ2dsZVByb2ZpbGVFZGl0b3I6ICgpID0+IHZvaWQ7XG4gIHRvZ2dsZVN0b3JpZXNWaWV3OiAoKSA9PiB1bmtub3duO1xufTtcblxudHlwZSBTdGF0ZVR5cGUgPSB7XG4gIHNob3dpbmdBdmF0YXJQb3B1cDogYm9vbGVhbjtcbiAgcG9wcGVyUm9vdDogSFRNTERpdkVsZW1lbnQgfCBudWxsO1xufTtcblxuZXhwb3J0IGNsYXNzIE1haW5IZWFkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UHJvcHNUeXBlLCBTdGF0ZVR5cGU+IHtcbiAgcHVibGljIGNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50PiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBQcm9wc1R5cGUpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2hvd2luZ0F2YXRhclBvcHVwOiBmYWxzZSxcbiAgICAgIHBvcHBlclJvb3Q6IG51bGwsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVPdXRzaWRlQ2xpY2sgPSAoeyB0YXJnZXQgfTogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHsgcG9wcGVyUm9vdCwgc2hvd2luZ0F2YXRhclBvcHVwIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgaWYgKFxuICAgICAgc2hvd2luZ0F2YXRhclBvcHVwICYmXG4gICAgICBwb3BwZXJSb290ICYmXG4gICAgICAhcG9wcGVyUm9vdC5jb250YWlucyh0YXJnZXQgYXMgTm9kZSkgJiZcbiAgICAgICF0aGlzLmNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyh0YXJnZXQgYXMgTm9kZSlcbiAgICApIHtcbiAgICAgIHRoaXMuaGlkZUF2YXRhclBvcHVwKCk7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBzaG93QXZhdGFyUG9wdXAgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3QgcG9wcGVyUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wcGVyUm9vdCk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dpbmdBdmF0YXJQb3B1cDogdHJ1ZSxcbiAgICAgIHBvcHBlclJvb3QsXG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljayk7XG4gIH07XG5cbiAgcHVibGljIGhpZGVBdmF0YXJQb3B1cCA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCB7IHBvcHBlclJvb3QgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlT3V0c2lkZUNsaWNrKTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd2luZ0F2YXRhclBvcHVwOiBmYWxzZSxcbiAgICAgIHBvcHBlclJvb3Q6IG51bGwsXG4gICAgfSk7XG5cbiAgICBpZiAocG9wcGVyUm9vdCAmJiBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKHBvcHBlclJvb3QpKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHBvcHBlclJvb3QpO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgb3ZlcnJpZGUgY29tcG9uZW50RGlkTW91bnQoKTogdm9pZCB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlR2xvYmFsS2V5RG93bik7XG4gIH1cblxuICBwdWJsaWMgb3ZlcnJpZGUgY29tcG9uZW50V2lsbFVubW91bnQoKTogdm9pZCB7XG4gICAgY29uc3QgeyBwb3BwZXJSb290IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU91dHNpZGVDbGljayk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlR2xvYmFsS2V5RG93bik7XG5cbiAgICBpZiAocG9wcGVyUm9vdCAmJiBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKHBvcHBlclJvb3QpKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHBvcHBlclJvb3QpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVHbG9iYWxLZXlEb3duID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XG4gICAgY29uc3QgeyBzaG93aW5nQXZhdGFyUG9wdXAgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBrZXkgfSA9IGV2ZW50O1xuXG4gICAgaWYgKHNob3dpbmdBdmF0YXJQb3B1cCAmJiBrZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICB0aGlzLmhpZGVBdmF0YXJQb3B1cCgpO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgb3ZlcnJpZGUgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcbiAgICBjb25zdCB7XG4gICAgICBhcmVTdG9yaWVzRW5hYmxlZCxcbiAgICAgIGF2YXRhclBhdGgsXG4gICAgICBiYWRnZSxcbiAgICAgIGNvbG9yLFxuICAgICAgaGFzUGVuZGluZ1VwZGF0ZSxcbiAgICAgIGkxOG4sXG4gICAgICBuYW1lLFxuICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICBwcm9maWxlTmFtZSxcbiAgICAgIHNob3dBcmNoaXZlZENvbnZlcnNhdGlvbnMsXG4gICAgICBzdGFydENvbXBvc2luZyxcbiAgICAgIHN0YXJ0VXBkYXRlLFxuICAgICAgdGhlbWUsXG4gICAgICB0aXRsZSxcbiAgICAgIHRvZ2dsZVByb2ZpbGVFZGl0b3IsXG4gICAgICB0b2dnbGVTdG9yaWVzVmlldyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHNob3dpbmdBdmF0YXJQb3B1cCwgcG9wcGVyUm9vdCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tYWluLWhlYWRlclwiPlxuICAgICAgICA8TWFuYWdlcj5cbiAgICAgICAgICA8UmVmZXJlbmNlPlxuICAgICAgICAgICAgeyh7IHJlZiB9KSA9PiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtbWFpbi1oZWFkZXJfX2F2YXRhci0tY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgICByZWY9e3RoaXMuY29udGFpbmVyUmVmfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEF2YXRhclxuICAgICAgICAgICAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdFxuICAgICAgICAgICAgICAgICAgYXZhdGFyUGF0aD17YXZhdGFyUGF0aH1cbiAgICAgICAgICAgICAgICAgIGJhZGdlPXtiYWRnZX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1tYWluLWhlYWRlcl9fYXZhdGFyXCJcbiAgICAgICAgICAgICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAgIGlzTWVcbiAgICAgICAgICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgICAgICAgICBwaG9uZU51bWJlcj17cGhvbmVOdW1iZXJ9XG4gICAgICAgICAgICAgICAgICBwcm9maWxlTmFtZT17cHJvZmlsZU5hbWV9XG4gICAgICAgICAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgICAgICAgICAgICAvLyBgc2hhcmVkR3JvdXBOYW1lc2AgbWFrZXMgbm8gc2Vuc2UgZm9yIHlvdXJzZWxmLCBidXRcbiAgICAgICAgICAgICAgICAgIC8vIGA8QXZhdGFyPmAgbmVlZHMgaXQgdG8gZGV0ZXJtaW5lIGJsdXJyaW5nLlxuICAgICAgICAgICAgICAgICAgc2hhcmVkR3JvdXBOYW1lcz17W119XG4gICAgICAgICAgICAgICAgICBzaXplPXsyOH1cbiAgICAgICAgICAgICAgICAgIGlubmVyUmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNob3dBdmF0YXJQb3B1cH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHtoYXNQZW5kaW5nVXBkYXRlICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLW1haW4taGVhZGVyX19hdmF0YXItLWJhZGdlZFwiIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvUmVmZXJlbmNlPlxuICAgICAgICAgIHtzaG93aW5nQXZhdGFyUG9wdXAgJiYgcG9wcGVyUm9vdFxuICAgICAgICAgICAgPyBjcmVhdGVQb3J0YWwoXG4gICAgICAgICAgICAgICAgPFBvcHBlciBwbGFjZW1lbnQ9XCJib3R0b20tZW5kXCI+XG4gICAgICAgICAgICAgICAgICB7KHsgcmVmLCBzdHlsZSB9KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxBdmF0YXJQb3B1cFxuICAgICAgICAgICAgICAgICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgICBiYWRnZT17YmFkZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgaW5uZXJSZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICAgICAgICAgIGlzTWVcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZSwgekluZGV4OiAxMCB9fVxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgICAgICAgICAgICAgICBjb252ZXJzYXRpb25UeXBlPVwiZGlyZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICAgICAgICAgICAgICAgIHBob25lTnVtYmVyPXtwaG9uZU51bWJlcn1cbiAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlTmFtZT17cHJvZmlsZU5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJQYXRoPXthdmF0YXJQYXRofVxuICAgICAgICAgICAgICAgICAgICAgIHNpemU9ezI4fVxuICAgICAgICAgICAgICAgICAgICAgIGhhc1BlbmRpbmdVcGRhdGU9e2hhc1BlbmRpbmdVcGRhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgc3RhcnRVcGRhdGU9e3N0YXJ0VXBkYXRlfVxuICAgICAgICAgICAgICAgICAgICAgIC8vIFNlZSB0aGUgY29tbWVudCBhYm92ZSBhYm91dCBgc2hhcmVkR3JvdXBOYW1lc2AuXG4gICAgICAgICAgICAgICAgICAgICAgc2hhcmVkR3JvdXBOYW1lcz17W119XG4gICAgICAgICAgICAgICAgICAgICAgb25FZGl0UHJvZmlsZT17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlUHJvZmlsZUVkaXRvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlQXZhdGFyUG9wdXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIG9uVmlld1ByZWZlcmVuY2VzPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93U2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUF2YXRhclBvcHVwKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICBvblZpZXdBcmNoaXZlPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93QXJjaGl2ZWRDb252ZXJzYXRpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVBdmF0YXJQb3B1cCgpO1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvUG9wcGVyPixcbiAgICAgICAgICAgICAgICBwb3BwZXJSb290XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogbnVsbH1cbiAgICAgICAgPC9NYW5hZ2VyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tYWluLWhlYWRlcl9faWNvbi1jb250YWluZXJcIj5cbiAgICAgICAgICB7YXJlU3Rvcmllc0VuYWJsZWQgJiYgKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdzdG9yaWVzJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1tYWluLWhlYWRlcl9fc3Rvcmllcy1pY29uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17dG9nZ2xlU3Rvcmllc1ZpZXd9XG4gICAgICAgICAgICAgIHRpdGxlPXtpMThuKCdzdG9yaWVzJyl9XG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ25ld0NvbnZlcnNhdGlvbicpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLW1haW4taGVhZGVyX19jb21wb3NlLWljb25cIlxuICAgICAgICAgICAgb25DbGljaz17c3RhcnRDb21wb3Npbmd9XG4gICAgICAgICAgICB0aXRsZT17aTE4bignbmV3Q29udmVyc2F0aW9uJyl9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsMEJBQTJDO0FBQzNDLHVCQUE2QjtBQUU3QixxQkFBNkI7QUFDN0Isb0JBQXVCO0FBQ3ZCLHlCQUE0QjtBQWdDckIsTUFBTSxtQkFBbUIscUJBQU0sVUFBZ0M7QUFBQSxFQUdwRSxZQUFZLE9BQWtCO0FBQzVCLFVBQU0sS0FBSztBQUhOLHdCQUFnRCxxQkFBTSxVQUFVO0FBV2hFLDhCQUFxQix3QkFBQyxFQUFFLGFBQStCO0FBQzVELFlBQU0sRUFBRSxZQUFZLHVCQUF1QixLQUFLO0FBRWhELFVBQ0Usc0JBQ0EsY0FDQSxDQUFDLFdBQVcsU0FBUyxNQUFjLEtBQ25DLENBQUMsS0FBSyxhQUFhLFNBQVMsU0FBUyxNQUFjLEdBQ25EO0FBQ0EsYUFBSyxnQkFBZ0I7QUFBQSxNQUN2QjtBQUFBLElBQ0YsR0FYNEI7QUFhckIsMkJBQWtCLDZCQUFZO0FBQ25DLFlBQU0sYUFBYSxTQUFTLGNBQWMsS0FBSztBQUMvQyxlQUFTLEtBQUssWUFBWSxVQUFVO0FBRXBDLFdBQUssU0FBUztBQUFBLFFBQ1osb0JBQW9CO0FBQUEsUUFDcEI7QUFBQSxNQUNGLENBQUM7QUFDRCxlQUFTLGlCQUFpQixTQUFTLEtBQUssa0JBQWtCO0FBQUEsSUFDNUQsR0FUeUI7QUFXbEIsMkJBQWtCLDZCQUFZO0FBQ25DLFlBQU0sRUFBRSxlQUFlLEtBQUs7QUFFNUIsZUFBUyxvQkFBb0IsU0FBUyxL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
