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
var EmbeddedContact_exports = {};
__export(EmbeddedContact_exports, {
  EmbeddedContact: () => EmbeddedContact
});
module.exports = __toCommonJS(EmbeddedContact_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_contactUtil = require("./contactUtil");
const EmbeddedContact = /* @__PURE__ */ __name((props) => {
  const {
    contact,
    i18n,
    isIncoming,
    onClick,
    tabIndex,
    withContentAbove,
    withContentBelow
  } = props;
  const module2 = "embedded-contact";
  const direction = isIncoming ? "incoming" : "outgoing";
  return /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: (0, import_classnames.default)("module-embedded-contact", `module-embedded-contact--${direction}`, withContentAbove ? "module-embedded-contact--with-content-above" : null, withContentBelow ? "module-embedded-contact--with-content-below" : null),
    onKeyDown: (event) => {
      if (event.key !== "Enter" && event.key !== "Space") {
        return;
      }
      if (onClick) {
        event.stopPropagation();
        event.preventDefault();
        onClick();
      }
    },
    onClick: (event) => {
      if (onClick) {
        event.stopPropagation();
        event.preventDefault();
        onClick();
      }
    },
    tabIndex
  }, (0, import_contactUtil.renderAvatar)({ contact, i18n, size: 52, direction }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-embedded-contact__text-container"
  }, (0, import_contactUtil.renderName)({ contact, isIncoming, module: module2 }), (0, import_contactUtil.renderContactShorthand)({ contact, isIncoming, module: module2 })));
}, "EmbeddedContact");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmbeddedContact
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRW1iZWRkZWRDb250YWN0LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IHR5cGUgeyBFbWJlZGRlZENvbnRhY3RUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvRW1iZWRkZWRDb250YWN0JztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQge1xuICByZW5kZXJBdmF0YXIsXG4gIHJlbmRlckNvbnRhY3RTaG9ydGhhbmQsXG4gIHJlbmRlck5hbWUsXG59IGZyb20gJy4vY29udGFjdFV0aWwnO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgY29udGFjdDogRW1iZWRkZWRDb250YWN0VHlwZTtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNJbmNvbWluZzogYm9vbGVhbjtcbiAgd2l0aENvbnRlbnRBYm92ZTogYm9vbGVhbjtcbiAgd2l0aENvbnRlbnRCZWxvdzogYm9vbGVhbjtcbiAgdGFiSW5kZXg6IG51bWJlcjtcbiAgb25DbGljaz86ICgpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgRW1iZWRkZWRDb250YWN0OiBSZWFjdC5GQzxQcm9wcz4gPSAocHJvcHM6IFByb3BzKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBjb250YWN0LFxuICAgIGkxOG4sXG4gICAgaXNJbmNvbWluZyxcbiAgICBvbkNsaWNrLFxuICAgIHRhYkluZGV4LFxuICAgIHdpdGhDb250ZW50QWJvdmUsXG4gICAgd2l0aENvbnRlbnRCZWxvdyxcbiAgfSA9IHByb3BzO1xuICBjb25zdCBtb2R1bGUgPSAnZW1iZWRkZWQtY29udGFjdCc7XG4gIGNvbnN0IGRpcmVjdGlvbiA9IGlzSW5jb21pbmcgPyAnaW5jb21pbmcnIDogJ291dGdvaW5nJztcblxuICByZXR1cm4gKFxuICAgIDxidXR0b25cbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAnbW9kdWxlLWVtYmVkZGVkLWNvbnRhY3QnLFxuICAgICAgICBgbW9kdWxlLWVtYmVkZGVkLWNvbnRhY3QtLSR7ZGlyZWN0aW9ufWAsXG4gICAgICAgIHdpdGhDb250ZW50QWJvdmUgPyAnbW9kdWxlLWVtYmVkZGVkLWNvbnRhY3QtLXdpdGgtY29udGVudC1hYm92ZScgOiBudWxsLFxuICAgICAgICB3aXRoQ29udGVudEJlbG93ID8gJ21vZHVsZS1lbWJlZGRlZC1jb250YWN0LS13aXRoLWNvbnRlbnQtYmVsb3cnIDogbnVsbFxuICAgICAgKX1cbiAgICAgIG9uS2V5RG93bj17KGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgIT09ICdFbnRlcicgJiYgZXZlbnQua2V5ICE9PSAnU3BhY2UnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9uQ2xpY2spIHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgb25DbGljaygpO1xuICAgICAgICB9XG4gICAgICB9fVxuICAgICAgb25DbGljaz17KGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChvbkNsaWNrKSB7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIG9uQ2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICA+XG4gICAgICB7cmVuZGVyQXZhdGFyKHsgY29udGFjdCwgaTE4biwgc2l6ZTogNTIsIGRpcmVjdGlvbiB9KX1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWVtYmVkZGVkLWNvbnRhY3RfX3RleHQtY29udGFpbmVyXCI+XG4gICAgICAgIHtyZW5kZXJOYW1lKHsgY29udGFjdCwgaXNJbmNvbWluZywgbW9kdWxlIH0pfVxuICAgICAgICB7cmVuZGVyQ29udGFjdFNob3J0aGFuZCh7IGNvbnRhY3QsIGlzSW5jb21pbmcsIG1vZHVsZSB9KX1cbiAgICAgIDwvZGl2PlxuICAgIDwvYnV0dG9uPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsd0JBQXVCO0FBS3ZCLHlCQUlPO0FBWUEsTUFBTSxrQkFBbUMsd0JBQUMsVUFBaUI7QUFDaEUsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQ0osUUFBTSxVQUFTO0FBQ2YsUUFBTSxZQUFZLGFBQWEsYUFBYTtBQUU1QyxTQUNFLG1EQUFDO0FBQUEsSUFDQyxNQUFLO0FBQUEsSUFDTCxXQUFXLCtCQUNULDJCQUNBLDRCQUE0QixhQUM1QixtQkFBbUIsZ0RBQWdELE1BQ25FLG1CQUFtQixnREFBZ0QsSUFDckU7QUFBQSxJQUNBLFdBQVcsQ0FBQyxVQUErQjtBQUN6QyxVQUFJLE1BQU0sUUFBUSxXQUFXLE1BQU0sUUFBUSxTQUFTO0FBQ2xEO0FBQUEsTUFDRjtBQUVBLFVBQUksU0FBUztBQUNYLGNBQU0sZ0JBQWdCO0FBQ3RCLGNBQU0sZUFBZTtBQUVyQixnQkFBUTtBQUFBLE1BQ1Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTLENBQUMsVUFBNEI7QUFDcEMsVUFBSSxTQUFTO0FBQ1gsY0FBTSxnQkFBZ0I7QUFDdEIsY0FBTSxlQUFlO0FBRXJCLGdCQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsS0FFQyxxQ0FBYSxFQUFFLFNBQVMsTUFBTSxNQUFNLElBQUksVUFBVSxDQUFDLEdBQ3BELG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDWixtQ0FBVyxFQUFFLFNBQVMsWUFBWSxnQkFBTyxDQUFDLEdBQzFDLCtDQUF1QixFQUFFLFNBQVMsWUFBWSxnQkFBTyxDQUFDLENBQ3pELENBQ0Y7QUFFSixHQW5EZ0Q7IiwKICAibmFtZXMiOiBbXQp9Cg==
