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
var AvatarPreview_exports = {};
__export(AvatarPreview_exports, {
  AvatarPreview: () => AvatarPreview
});
module.exports = __toCommonJS(AvatarPreview_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var log = __toESM(require("../logging/log"));
var import_Spinner = require("./Spinner");
var import_Colors = require("../types/Colors");
var import_getInitials = require("../util/getInitials");
var import_imagePathToBytes = require("../util/imagePathToBytes");
var ImageStatus = /* @__PURE__ */ ((ImageStatus2) => {
  ImageStatus2["Nothing"] = "nothing";
  ImageStatus2["Loading"] = "loading";
  ImageStatus2["HasImage"] = "has-image";
  return ImageStatus2;
})(ImageStatus || {});
const AvatarPreview = /* @__PURE__ */ __name(({
  avatarColor = import_Colors.AvatarColors[0],
  avatarPath,
  avatarValue,
  conversationTitle,
  i18n,
  isEditable,
  isGroup,
  onAvatarLoaded,
  onClear,
  onClick,
  style = {}
}) => {
  const [avatarPreview, setAvatarPreview] = (0, import_react.useState)();
  (0, import_react.useEffect)(() => {
    if (!isEditable) {
      return;
    }
    if (!avatarPath) {
      return import_lodash.noop;
    }
    let shouldCancel = false;
    (async () => {
      try {
        const buffer = await (0, import_imagePathToBytes.imagePathToBytes)(avatarPath);
        if (shouldCancel) {
          return;
        }
        setAvatarPreview(buffer);
        onAvatarLoaded?.(buffer);
      } catch (err) {
        if (shouldCancel) {
          return;
        }
        log.warn(`Failed to convert image URL to array buffer. Error message: ${err && err.message}`);
      }
    })();
    return () => {
      shouldCancel = true;
    };
  }, [avatarPath, onAvatarLoaded, isEditable]);
  (0, import_react.useEffect)(() => {
    if (avatarValue) {
      setAvatarPreview(avatarValue);
    } else {
      setAvatarPreview(void 0);
    }
  }, [avatarValue]);
  const [objectUrl, setObjectUrl] = (0, import_react.useState)();
  (0, import_react.useEffect)(() => {
    if (!avatarPreview) {
      setObjectUrl(void 0);
      return import_lodash.noop;
    }
    const url = URL.createObjectURL(new Blob([avatarPreview]));
    setObjectUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [avatarPreview]);
  let imageStatus;
  let encodedPath;
  if (avatarValue && !objectUrl) {
    imageStatus = "loading" /* Loading */;
  } else if (objectUrl) {
    encodedPath = objectUrl;
    imageStatus = "has-image" /* HasImage */;
  } else if (avatarPath) {
    encodedPath = encodeURI(avatarPath);
    imageStatus = "has-image" /* HasImage */;
  } else {
    imageStatus = "nothing" /* Nothing */;
  }
  const isLoading = imageStatus === "loading" /* Loading */;
  const clickProps = onClick ? {
    role: "button",
    onClick,
    tabIndex: 0,
    onKeyDown: (event) => {
      if (event.key === "Enter" || event.key === " ") {
        onClick();
      }
    }
  } : {};
  const componentStyle = {
    ...style
  };
  if (onClick) {
    componentStyle.cursor = "pointer";
  }
  if (imageStatus === "nothing" /* Nothing */) {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "AvatarPreview"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: `AvatarPreview__avatar BetterAvatarBubble--${avatarColor}`,
      ...clickProps,
      style: componentStyle
    }, isGroup ? /* @__PURE__ */ import_react.default.createElement("div", {
      className: `BetterAvatarBubble--${avatarColor}--icon AvatarPreview__group`
    }) : (0, import_getInitials.getInitials)(conversationTitle), isEditable && /* @__PURE__ */ import_react.default.createElement("div", {
      className: "AvatarPreview__upload"
    })));
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "AvatarPreview"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: `AvatarPreview__avatar AvatarPreview__avatar--${imageStatus}`,
    ...clickProps,
    style: imageStatus === "has-image" /* HasImage */ && encodedPath ? {
      ...componentStyle,
      backgroundImage: `url('${encodedPath}')`
    } : componentStyle
  }, isLoading && /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
    size: "70px",
    svgSize: "normal",
    direction: "on-avatar"
  }), imageStatus === "has-image" /* HasImage */ && onClear && /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("delete"),
    className: "AvatarPreview__clear",
    onClick: onClear,
    tabIndex: -1,
    type: "button"
  }), isEditable && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "AvatarPreview__upload"
  })));
}, "AvatarPreview");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AvatarPreview
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyUHJldmlldy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBDU1NQcm9wZXJ0aWVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJy4vU3Bpbm5lcic7XG5pbXBvcnQgdHlwZSB7IEF2YXRhckNvbG9yVHlwZSB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgeyBBdmF0YXJDb2xvcnMgfSBmcm9tICcuLi90eXBlcy9Db2xvcnMnO1xuaW1wb3J0IHsgZ2V0SW5pdGlhbHMgfSBmcm9tICcuLi91dGlsL2dldEluaXRpYWxzJztcbmltcG9ydCB7IGltYWdlUGF0aFRvQnl0ZXMgfSBmcm9tICcuLi91dGlsL2ltYWdlUGF0aFRvQnl0ZXMnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGF2YXRhckNvbG9yPzogQXZhdGFyQ29sb3JUeXBlO1xuICBhdmF0YXJQYXRoPzogc3RyaW5nO1xuICBhdmF0YXJWYWx1ZT86IFVpbnQ4QXJyYXk7XG4gIGNvbnZlcnNhdGlvblRpdGxlPzogc3RyaW5nO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBpc0VkaXRhYmxlPzogYm9vbGVhbjtcbiAgaXNHcm91cD86IGJvb2xlYW47XG4gIG9uQXZhdGFyTG9hZGVkPzogKGF2YXRhckJ1ZmZlcjogVWludDhBcnJheSkgPT4gdW5rbm93bjtcbiAgb25DbGVhcj86ICgpID0+IHVua25vd247XG4gIG9uQ2xpY2s/OiAoKSA9PiB1bmtub3duO1xuICBzdHlsZT86IENTU1Byb3BlcnRpZXM7XG59O1xuXG5lbnVtIEltYWdlU3RhdHVzIHtcbiAgTm90aGluZyA9ICdub3RoaW5nJyxcbiAgTG9hZGluZyA9ICdsb2FkaW5nJyxcbiAgSGFzSW1hZ2UgPSAnaGFzLWltYWdlJyxcbn1cblxuZXhwb3J0IGNvbnN0IEF2YXRhclByZXZpZXcgPSAoe1xuICBhdmF0YXJDb2xvciA9IEF2YXRhckNvbG9yc1swXSxcbiAgYXZhdGFyUGF0aCxcbiAgYXZhdGFyVmFsdWUsXG4gIGNvbnZlcnNhdGlvblRpdGxlLFxuICBpMThuLFxuICBpc0VkaXRhYmxlLFxuICBpc0dyb3VwLFxuICBvbkF2YXRhckxvYWRlZCxcbiAgb25DbGVhcixcbiAgb25DbGljayxcbiAgc3R5bGUgPSB7fSxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgW2F2YXRhclByZXZpZXcsIHNldEF2YXRhclByZXZpZXddID0gdXNlU3RhdGU8VWludDhBcnJheSB8IHVuZGVmaW5lZD4oKTtcblxuICAvLyBMb2FkcyB0aGUgaW5pdGlhbCBhdmF0YXJQYXRoIGlmIG9uZSBpcyBwcm92aWRlZCwgYnV0IG9ubHkgaWYgd2UncmUgaW4gZWRpdGFibGUgbW9kZS5cbiAgLy8gICBJZiB3ZSdyZSBub3QgZWRpdGFibGUsIHdlIGFzc3VtZSB0aGF0IHdlIGVpdGhlciBoYXZlIGFuIGF2YXRhclBhdGggb3Igd2Ugc2hvdyBhXG4gIC8vICAgZGVmYXVsdCBhdmF0YXIuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc0VkaXRhYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFhdmF0YXJQYXRoKSB7XG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9XG5cbiAgICBsZXQgc2hvdWxkQ2FuY2VsID0gZmFsc2U7XG5cbiAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYnVmZmVyID0gYXdhaXQgaW1hZ2VQYXRoVG9CeXRlcyhhdmF0YXJQYXRoKTtcbiAgICAgICAgaWYgKHNob3VsZENhbmNlbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRBdmF0YXJQcmV2aWV3KGJ1ZmZlcik7XG4gICAgICAgIG9uQXZhdGFyTG9hZGVkPy4oYnVmZmVyKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAoc2hvdWxkQ2FuY2VsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgIGBGYWlsZWQgdG8gY29udmVydCBpbWFnZSBVUkwgdG8gYXJyYXkgYnVmZmVyLiBFcnJvciBtZXNzYWdlOiAke1xuICAgICAgICAgICAgZXJyICYmIGVyci5tZXNzYWdlXG4gICAgICAgICAgfWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KSgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHNob3VsZENhbmNlbCA9IHRydWU7XG4gICAgfTtcbiAgfSwgW2F2YXRhclBhdGgsIG9uQXZhdGFyTG9hZGVkLCBpc0VkaXRhYmxlXSk7XG5cbiAgLy8gRW5zdXJlcyB0aGF0IHdoZW4gYXZhdGFyVmFsdWUgY2hhbmdlcyB3ZSBnZW5lcmF0ZSBuZXcgVVJMc1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChhdmF0YXJWYWx1ZSkge1xuICAgICAgc2V0QXZhdGFyUHJldmlldyhhdmF0YXJWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEF2YXRhclByZXZpZXcodW5kZWZpbmVkKTtcbiAgICB9XG4gIH0sIFthdmF0YXJWYWx1ZV0pO1xuXG4gIC8vIENyZWF0ZXMgdGhlIG9iamVjdCBVUkwgdG8gcmVuZGVyIHRoZSBVaW50OEFycmF5IGltYWdlXG4gIGNvbnN0IFtvYmplY3RVcmwsIHNldE9iamVjdFVybF0gPSB1c2VTdGF0ZTx1bmRlZmluZWQgfCBzdHJpbmc+KCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWF2YXRhclByZXZpZXcpIHtcbiAgICAgIHNldE9iamVjdFVybCh1bmRlZmluZWQpO1xuICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfVxuXG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbYXZhdGFyUHJldmlld10pKTtcbiAgICBzZXRPYmplY3RVcmwodXJsKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgfTtcbiAgfSwgW2F2YXRhclByZXZpZXddKTtcblxuICBsZXQgaW1hZ2VTdGF0dXM6IEltYWdlU3RhdHVzO1xuICBsZXQgZW5jb2RlZFBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgaWYgKGF2YXRhclZhbHVlICYmICFvYmplY3RVcmwpIHtcbiAgICBpbWFnZVN0YXR1cyA9IEltYWdlU3RhdHVzLkxvYWRpbmc7XG4gIH0gZWxzZSBpZiAob2JqZWN0VXJsKSB7XG4gICAgZW5jb2RlZFBhdGggPSBvYmplY3RVcmw7XG4gICAgaW1hZ2VTdGF0dXMgPSBJbWFnZVN0YXR1cy5IYXNJbWFnZTtcbiAgfSBlbHNlIGlmIChhdmF0YXJQYXRoKSB7XG4gICAgZW5jb2RlZFBhdGggPSBlbmNvZGVVUkkoYXZhdGFyUGF0aCk7XG4gICAgaW1hZ2VTdGF0dXMgPSBJbWFnZVN0YXR1cy5IYXNJbWFnZTtcbiAgfSBlbHNlIHtcbiAgICBpbWFnZVN0YXR1cyA9IEltYWdlU3RhdHVzLk5vdGhpbmc7XG4gIH1cblxuICBjb25zdCBpc0xvYWRpbmcgPSBpbWFnZVN0YXR1cyA9PT0gSW1hZ2VTdGF0dXMuTG9hZGluZztcblxuICBjb25zdCBjbGlja1Byb3BzID0gb25DbGlja1xuICAgID8ge1xuICAgICAgICByb2xlOiAnYnV0dG9uJyxcbiAgICAgICAgb25DbGljayxcbiAgICAgICAgdGFiSW5kZXg6IDAsXG4gICAgICAgIG9uS2V5RG93bjogKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgfHwgZXZlbnQua2V5ID09PSAnICcpIHtcbiAgICAgICAgICAgIG9uQ2xpY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgOiB7fTtcbiAgY29uc3QgY29tcG9uZW50U3R5bGUgPSB7XG4gICAgLi4uc3R5bGUsXG4gIH07XG4gIGlmIChvbkNsaWNrKSB7XG4gICAgY29tcG9uZW50U3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICB9XG5cbiAgaWYgKGltYWdlU3RhdHVzID09PSBJbWFnZVN0YXR1cy5Ob3RoaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQXZhdGFyUHJldmlld1wiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgQXZhdGFyUHJldmlld19fYXZhdGFyIEJldHRlckF2YXRhckJ1YmJsZS0tJHthdmF0YXJDb2xvcn1gfVxuICAgICAgICAgIHsuLi5jbGlja1Byb3BzfVxuICAgICAgICAgIHN0eWxlPXtjb21wb25lbnRTdHlsZX1cbiAgICAgICAgPlxuICAgICAgICAgIHtpc0dyb3VwID8gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BCZXR0ZXJBdmF0YXJCdWJibGUtLSR7YXZhdGFyQ29sb3J9LS1pY29uIEF2YXRhclByZXZpZXdfX2dyb3VwYH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIGdldEluaXRpYWxzKGNvbnZlcnNhdGlvblRpdGxlKVxuICAgICAgICAgICl9XG4gICAgICAgICAge2lzRWRpdGFibGUgJiYgPGRpdiBjbGFzc05hbWU9XCJBdmF0YXJQcmV2aWV3X191cGxvYWRcIiAvPn1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIkF2YXRhclByZXZpZXdcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgQXZhdGFyUHJldmlld19fYXZhdGFyIEF2YXRhclByZXZpZXdfX2F2YXRhci0tJHtpbWFnZVN0YXR1c31gfVxuICAgICAgICB7Li4uY2xpY2tQcm9wc31cbiAgICAgICAgc3R5bGU9e1xuICAgICAgICAgIGltYWdlU3RhdHVzID09PSBJbWFnZVN0YXR1cy5IYXNJbWFnZSAmJiBlbmNvZGVkUGF0aFxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgLi4uY29tcG9uZW50U3R5bGUsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCcke2VuY29kZWRQYXRofScpYCxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBjb21wb25lbnRTdHlsZVxuICAgICAgICB9XG4gICAgICA+XG4gICAgICAgIHtpc0xvYWRpbmcgJiYgKFxuICAgICAgICAgIDxTcGlubmVyIHNpemU9XCI3MHB4XCIgc3ZnU2l6ZT1cIm5vcm1hbFwiIGRpcmVjdGlvbj1cIm9uLWF2YXRhclwiIC8+XG4gICAgICAgICl9XG4gICAgICAgIHtpbWFnZVN0YXR1cyA9PT0gSW1hZ2VTdGF0dXMuSGFzSW1hZ2UgJiYgb25DbGVhciAmJiAoXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignZGVsZXRlJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJBdmF0YXJQcmV2aWV3X19jbGVhclwiXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsZWFyfVxuICAgICAgICAgICAgdGFiSW5kZXg9ey0xfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge2lzRWRpdGFibGUgJiYgPGRpdiBjbGFzc05hbWU9XCJBdmF0YXJQcmV2aWV3X191cGxvYWRcIiAvPn1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBMkM7QUFDM0Msb0JBQXFCO0FBRXJCLFVBQXFCO0FBRXJCLHFCQUF3QjtBQUV4QixvQkFBNkI7QUFDN0IseUJBQTRCO0FBQzVCLDhCQUFpQztBQWdCakMsSUFBSyxjQUFMLGtCQUFLLGlCQUFMO0FBQ0UsNEJBQVU7QUFDViw0QkFBVTtBQUNWLDZCQUFXO0FBSFI7QUFBQTtBQU1FLE1BQU0sZ0JBQWdCLHdCQUFDO0FBQUEsRUFDNUIsY0FBYywyQkFBYTtBQUFBLEVBQzNCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFFBQVEsQ0FBQztBQUFBLE1BQ21CO0FBQzVCLFFBQU0sQ0FBQyxlQUFlLG9CQUFvQiwyQkFBaUM7QUFLM0UsOEJBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxZQUFZO0FBQ2Y7QUFBQSxJQUNGO0FBRUEsUUFBSSxDQUFDLFlBQVk7QUFDZixhQUFPO0FBQUEsSUFDVDtBQUVBLFFBQUksZUFBZTtBQUVuQixJQUFDLGFBQVk7QUFDWCxVQUFJO0FBQ0YsY0FBTSxTQUFTLE1BQU0sOENBQWlCLFVBQVU7QUFDaEQsWUFBSSxjQUFjO0FBQ2hCO0FBQUEsUUFDRjtBQUNBLHlCQUFpQixNQUFNO0FBQ3ZCLHlCQUFpQixNQUFNO0FBQUEsTUFDekIsU0FBUyxLQUFQO0FBQ0EsWUFBSSxjQUFjO0FBQ2hCO0FBQUEsUUFDRjtBQUNBLFlBQUksS0FDRiwrREFDRSxPQUFPLElBQUksU0FFZjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLEdBQUc7QUFFSCxXQUFPLE1BQU07QUFDWCxxQkFBZTtBQUFBLElBQ2pCO0FBQUEsRUFDRixHQUFHLENBQUMs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
