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
var ConversationDetailsIcon_exports = {};
__export(ConversationDetailsIcon_exports, {
  ConversationDetailsIcon: () => ConversationDetailsIcon,
  IconType: () => IconType
});
module.exports = __toCommonJS(ConversationDetailsIcon_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_Spinner = require("../../Spinner");
var import_util = require("./util");
var IconType = /* @__PURE__ */ ((IconType2) => {
  IconType2["block"] = "block";
  IconType2["unblock"] = "unblock";
  IconType2["color"] = "color";
  IconType2["down"] = "down";
  IconType2["invites"] = "invites";
  IconType2["leave"] = "leave";
  IconType2["link"] = "link";
  IconType2["lock"] = "lock";
  IconType2["mention"] = "mention";
  IconType2["mute"] = "mute";
  IconType2["notifications"] = "notifications";
  IconType2["reset"] = "reset";
  IconType2["share"] = "share";
  IconType2["spinner"] = "spinner";
  IconType2["timer"] = "timer";
  IconType2["trash"] = "trash";
  IconType2["verify"] = "verify";
  return IconType2;
})(IconType || {});
const bem = (0, import_util.bemGenerator)("ConversationDetails-icon");
const ConversationDetailsIcon = /* @__PURE__ */ __name(({
  ariaLabel,
  disabled,
  icon,
  fakeButton,
  onClick
}) => {
  let content;
  if (icon === "spinner" /* spinner */) {
    content = /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
      svgSize: "small",
      size: "24"
    });
  } else {
    const iconClassName = bem("icon", icon);
    content = /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)(iconClassName, disabled && `${iconClassName}--disabled`)
    });
  }
  if (onClick && fakeButton && !disabled) {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      "aria-label": ariaLabel,
      role: "button",
      className: bem("button"),
      tabIndex: 0,
      onClick: (event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      },
      onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          onClick();
        }
      }
    }, content);
  }
  if (onClick) {
    return /* @__PURE__ */ import_react.default.createElement("button", {
      "aria-label": ariaLabel,
      className: bem("button"),
      disabled,
      type: "button",
      onClick: (event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }
    }, content);
  }
  return content;
}, "ConversationDetailsIcon");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationDetailsIcon,
  IconType
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uRGV0YWlsc0ljb24udHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJy4uLy4uL1NwaW5uZXInO1xuaW1wb3J0IHsgYmVtR2VuZXJhdG9yIH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGVudW0gSWNvblR5cGUge1xuICAnYmxvY2snID0gJ2Jsb2NrJyxcbiAgJ3VuYmxvY2snID0gJ3VuYmxvY2snLFxuICAnY29sb3InID0gJ2NvbG9yJyxcbiAgJ2Rvd24nID0gJ2Rvd24nLFxuICAnaW52aXRlcycgPSAnaW52aXRlcycsXG4gICdsZWF2ZScgPSAnbGVhdmUnLFxuICAnbGluaycgPSAnbGluaycsXG4gICdsb2NrJyA9ICdsb2NrJyxcbiAgJ21lbnRpb24nID0gJ21lbnRpb24nLFxuICAnbXV0ZScgPSAnbXV0ZScsXG4gICdub3RpZmljYXRpb25zJyA9ICdub3RpZmljYXRpb25zJyxcbiAgJ3Jlc2V0JyA9ICdyZXNldCcsXG4gICdzaGFyZScgPSAnc2hhcmUnLFxuICAnc3Bpbm5lcicgPSAnc3Bpbm5lcicsXG4gICd0aW1lcicgPSAndGltZXInLFxuICAndHJhc2gnID0gJ3RyYXNoJyxcbiAgJ3ZlcmlmeScgPSAndmVyaWZ5Jyxcbn1cblxuZXhwb3J0IHR5cGUgUHJvcHMgPSB7XG4gIGFyaWFMYWJlbDogc3RyaW5nO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIGljb246IEljb25UeXBlO1xuICBmYWtlQnV0dG9uPzogYm9vbGVhbjtcbiAgb25DbGljaz86ICgpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBiZW0gPSBiZW1HZW5lcmF0b3IoJ0NvbnZlcnNhdGlvbkRldGFpbHMtaWNvbicpO1xuXG5leHBvcnQgY29uc3QgQ29udmVyc2F0aW9uRGV0YWlsc0ljb246IFJlYWN0LkNvbXBvbmVudFR5cGU8UHJvcHM+ID0gKHtcbiAgYXJpYUxhYmVsLFxuICBkaXNhYmxlZCxcbiAgaWNvbixcbiAgZmFrZUJ1dHRvbixcbiAgb25DbGljayxcbn0pID0+IHtcbiAgbGV0IGNvbnRlbnQ6IFJlYWN0LlJlYWN0Q2hpbGQ7XG5cbiAgaWYgKGljb24gPT09IEljb25UeXBlLnNwaW5uZXIpIHtcbiAgICBjb250ZW50ID0gPFNwaW5uZXIgc3ZnU2l6ZT1cInNtYWxsXCIgc2l6ZT1cIjI0XCIgLz47XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgaWNvbkNsYXNzTmFtZSA9IGJlbSgnaWNvbicsIGljb24pO1xuICAgIGNvbnRlbnQgPSAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICBpY29uQ2xhc3NOYW1lLFxuICAgICAgICAgIGRpc2FibGVkICYmIGAke2ljb25DbGFzc05hbWV9LS1kaXNhYmxlZGBcbiAgICAgICAgKX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIC8vIFdlIG5lZWQgdGhpcyBiZWNhdXNlIHNvbWV0aW1lcyB0aGlzIGNvbXBvbmVudCBpcyBpbnNpZGUgb3RoZXIgYnV0dG9uc1xuICBpZiAob25DbGljayAmJiBmYWtlQnV0dG9uICYmICFkaXNhYmxlZCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbH1cbiAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzTmFtZT17YmVtKCdidXR0b24nKX1cbiAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgIG9uQ2xpY2s9eyhldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudCwgTW91c2VFdmVudD4pID0+IHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIG9uQ2xpY2soKTtcbiAgICAgICAgfX1cbiAgICAgICAgb25LZXlEb3duPXsoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJyB8fCBldmVudC5rZXkgPT09ICcgJykge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgb25DbGljaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NvbnRlbnR9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgaWYgKG9uQ2xpY2spIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XG4gICAgICAgIGNsYXNzTmFtZT17YmVtKCdidXR0b24nKX1cbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgb25DbGljaz17KGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50LCBNb3VzZUV2ZW50PikgPT4ge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgb25DbGljaygpO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7Y29udGVudH1cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gY29udGVudDtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsd0JBQXVCO0FBRXZCLHFCQUF3QjtBQUN4QixrQkFBNkI7QUFFdEIsSUFBSyxXQUFMLGtCQUFLLGNBQUw7QUFDTCx1QkFBVTtBQUNWLHlCQUFZO0FBQ1osdUJBQVU7QUFDVixzQkFBUztBQUNULHlCQUFZO0FBQ1osdUJBQVU7QUFDVixzQkFBUztBQUNULHNCQUFTO0FBQ1QseUJBQVk7QUFDWixzQkFBUztBQUNULCtCQUFrQjtBQUNsQix1QkFBVTtBQUNWLHVCQUFVO0FBQ1YseUJBQVk7QUFDWix1QkFBVTtBQUNWLHVCQUFVO0FBQ1Ysd0JBQVc7QUFqQkQ7QUFBQTtBQTRCWixNQUFNLE1BQU0sOEJBQWEsMEJBQTBCO0FBRTVDLE1BQU0sMEJBQXNELHdCQUFDO0FBQUEsRUFDbEU7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDSTtBQUNKLE1BQUk7QUFFSixNQUFJLFNBQVMseUJBQWtCO0FBQzdCLGNBQVUsbURBQUM7QUFBQSxNQUFRLFNBQVE7QUFBQSxNQUFRLE1BQUs7QUFBQSxLQUFLO0FBQUEsRUFDL0MsT0FBTztBQUNMLFVBQU0sZ0JBQWdCLElBQUksUUFBUSxJQUFJO0FBQ3RDLGNBQ0UsbURBQUM7QUFBQSxNQUNDLFdBQVcsK0JBQ1QsZUFDQSxZQUFZLEdBQUcseUJBQ2pCO0FBQUEsS0FDRjtBQUFBLEVBRUo7QUFHQSxNQUFJLFdBQVcsY0FBYyxDQUFDLFVBQVU7QUFDdEMsV0FDRSxtREFBQztBQUFBLE1BQ0MsY0FBWTtBQUFBLE1BQ1osTUFBSztBQUFBLE1BQ0wsV0FBVyxJQUFJLFFBQVE7QUFBQSxNQUN2QixVQUFVO0FBQUEsTUFDVixTQUFTLENBQUMsVUFBd0Q7QUFDaEUsY0FBTSxlQUFlO0FBQ3JCLGNBQU0sZ0JBQWdCO0FBQ3RCLGdCQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0EsV0FBVyxDQUFDLFVBQStDO0FBQ3pELFlBQUksTUFBTSxRQUFRLFdBQVcsTUFBTSxRQUFRLEtBQUs7QUFDOUMsZ0JBQU0sZUFBZTtBQUNyQixnQkFBTSxnQkFBZ0I7QUFDdEIsa0JBQVE7QUFBQSxRQUNWO0FBQUEsTUFDRjtBQUFBLE9BRUMsT0FDSDtBQUFBLEVBRUo7QUFFQSxNQUFJLFNBQVM7QUFDWCxXQUNFLG1EQUFDO0FBQUEsTUFDQyxjQUFZO0FBQUEsTUFDWixXQUFXLElBQUksUUFBUTtBQUFBLE1BQ3ZCO0FBQUEsTUFDQSxNQUFLO0FBQUEsTUFDTCxTQUFTLENBQUMsVUFBMkQ7QUFDbkUsY0FBTSxlQUFlO0FBQ3JCLGNBQU0sZ0JBQWdCO0FBQ3RCLGdCQUFRO0FBQUEsTUFDVjtBQUFBLE9BRUMsT0FDSDtBQUFBLEVBRUo7QUFFQSxTQUFPO0FBQ1QsR0FwRW1FOyIsCiAgIm5hbWVzIjogW10KfQo=
