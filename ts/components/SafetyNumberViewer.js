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
var SafetyNumberViewer_exports = {};
__export(SafetyNumberViewer_exports, {
  SafetyNumberViewer: () => SafetyNumberViewer
});
module.exports = __toCommonJS(SafetyNumberViewer_exports);
var import_react = __toESM(require("react"));
var import_Button = require("./Button");
var import_Intl = require("./Intl");
const SafetyNumberViewer = /* @__PURE__ */ __name(({
  contact,
  generateSafetyNumber,
  i18n,
  onClose,
  safetyNumber,
  toggleVerified,
  verificationDisabled
}) => {
  import_react.default.useEffect(() => {
    if (!contact) {
      return;
    }
    generateSafetyNumber(contact);
  }, [contact, generateSafetyNumber, safetyNumber]);
  if (!contact) {
    return null;
  }
  if (!contact.phoneNumber) {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-SafetyNumberViewer"
    }, /* @__PURE__ */ import_react.default.createElement("div", null, i18n("cannotGenerateSafetyNumber")), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-SafetyNumberViewer__buttons"
    }, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
      className: "module-SafetyNumberViewer__button",
      onClick: () => onClose?.(),
      variant: import_Button.ButtonVariant.Primary
    }, i18n("ok"))));
  }
  const showNumber = Boolean(contact.name || contact.profileName);
  const numberFragment = showNumber && contact.phoneNumber ? ` \xB7 ${contact.phoneNumber}` : "";
  const name = `${contact.title}${numberFragment}`;
  const boldName = /* @__PURE__ */ import_react.default.createElement("span", {
    className: "module-SafetyNumberViewer__bold-name"
  }, name);
  const { isVerified } = contact;
  const verifiedStatusKey = isVerified ? "isVerified" : "isNotVerified";
  const verifyButtonText = isVerified ? i18n("unverify") : i18n("verify");
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-SafetyNumberViewer"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-SafetyNumberViewer__number"
  }, safetyNumber || getPlaceholder()), /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
    i18n,
    id: "verifyHelp",
    components: [boldName]
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-SafetyNumberViewer__verification-status"
  }, isVerified ? /* @__PURE__ */ import_react.default.createElement("span", {
    className: "module-SafetyNumberViewer__icon--verified"
  }) : /* @__PURE__ */ import_react.default.createElement("span", {
    className: "module-SafetyNumberViewer__icon--shield"
  }), /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
    i18n,
    id: verifiedStatusKey,
    components: [boldName]
  })), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-SafetyNumberViewer__button"
  }, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    disabled: verificationDisabled,
    onClick: () => {
      toggleVerified(contact);
    },
    variant: import_Button.ButtonVariant.Secondary
  }, verifyButtonText)));
}, "SafetyNumberViewer");
function getPlaceholder() {
  return Array.from(Array(12)).map(() => "XXXXX").join(" ");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SafetyNumberViewer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2FmZXR5TnVtYmVyVmlld2VyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQnV0dG9uLCBCdXR0b25WYXJpYW50IH0gZnJvbSAnLi9CdXR0b24nO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBJbnRsIH0gZnJvbSAnLi9JbnRsJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGNvbnRhY3Q6IENvbnZlcnNhdGlvblR5cGU7XG4gIGdlbmVyYXRlU2FmZXR5TnVtYmVyOiAoY29udGFjdDogQ29udmVyc2F0aW9uVHlwZSkgPT4gdm9pZDtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgc2FmZXR5TnVtYmVyOiBzdHJpbmc7XG4gIHRvZ2dsZVZlcmlmaWVkOiAoY29udGFjdDogQ29udmVyc2F0aW9uVHlwZSkgPT4gdm9pZDtcbiAgdmVyaWZpY2F0aW9uRGlzYWJsZWQ6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgY29uc3QgU2FmZXR5TnVtYmVyVmlld2VyID0gKHtcbiAgY29udGFjdCxcbiAgZ2VuZXJhdGVTYWZldHlOdW1iZXIsXG4gIGkxOG4sXG4gIG9uQ2xvc2UsXG4gIHNhZmV0eU51bWJlcixcbiAgdG9nZ2xlVmVyaWZpZWQsXG4gIHZlcmlmaWNhdGlvbkRpc2FibGVkLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgfCBudWxsID0+IHtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWNvbnRhY3QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZVNhZmV0eU51bWJlcihjb250YWN0KTtcbiAgfSwgW2NvbnRhY3QsIGdlbmVyYXRlU2FmZXR5TnVtYmVyLCBzYWZldHlOdW1iZXJdKTtcblxuICBpZiAoIWNvbnRhY3QpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmICghY29udGFjdC5waG9uZU51bWJlcikge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1TYWZldHlOdW1iZXJWaWV3ZXJcIj5cbiAgICAgICAgPGRpdj57aTE4bignY2Fubm90R2VuZXJhdGVTYWZldHlOdW1iZXInKX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtU2FmZXR5TnVtYmVyVmlld2VyX19idXR0b25zXCI+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLVNhZmV0eU51bWJlclZpZXdlcl9fYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2xvc2U/LigpfVxuICAgICAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5QcmltYXJ5fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpMThuKCdvaycpfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBjb25zdCBzaG93TnVtYmVyID0gQm9vbGVhbihjb250YWN0Lm5hbWUgfHwgY29udGFjdC5wcm9maWxlTmFtZSk7XG4gIGNvbnN0IG51bWJlckZyYWdtZW50ID1cbiAgICBzaG93TnVtYmVyICYmIGNvbnRhY3QucGhvbmVOdW1iZXIgPyBgIFx1MDBCNyAke2NvbnRhY3QucGhvbmVOdW1iZXJ9YCA6ICcnO1xuICBjb25zdCBuYW1lID0gYCR7Y29udGFjdC50aXRsZX0ke251bWJlckZyYWdtZW50fWA7XG4gIGNvbnN0IGJvbGROYW1lID0gKFxuICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1vZHVsZS1TYWZldHlOdW1iZXJWaWV3ZXJfX2JvbGQtbmFtZVwiPntuYW1lfTwvc3Bhbj5cbiAgKTtcblxuICBjb25zdCB7IGlzVmVyaWZpZWQgfSA9IGNvbnRhY3Q7XG4gIGNvbnN0IHZlcmlmaWVkU3RhdHVzS2V5ID0gaXNWZXJpZmllZCA/ICdpc1ZlcmlmaWVkJyA6ICdpc05vdFZlcmlmaWVkJztcbiAgY29uc3QgdmVyaWZ5QnV0dG9uVGV4dCA9IGlzVmVyaWZpZWQgPyBpMThuKCd1bnZlcmlmeScpIDogaTE4bigndmVyaWZ5Jyk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1TYWZldHlOdW1iZXJWaWV3ZXJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLVNhZmV0eU51bWJlclZpZXdlcl9fbnVtYmVyXCI+XG4gICAgICAgIHtzYWZldHlOdW1iZXIgfHwgZ2V0UGxhY2Vob2xkZXIoKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPEludGwgaTE4bj17aTE4bn0gaWQ9XCJ2ZXJpZnlIZWxwXCIgY29tcG9uZW50cz17W2JvbGROYW1lXX0gLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLVNhZmV0eU51bWJlclZpZXdlcl9fdmVyaWZpY2F0aW9uLXN0YXR1c1wiPlxuICAgICAgICB7aXNWZXJpZmllZCA/IChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtb2R1bGUtU2FmZXR5TnVtYmVyVmlld2VyX19pY29uLS12ZXJpZmllZFwiIC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibW9kdWxlLVNhZmV0eU51bWJlclZpZXdlcl9faWNvbi0tc2hpZWxkXCIgLz5cbiAgICAgICAgKX1cbiAgICAgICAgPEludGwgaTE4bj17aTE4bn0gaWQ9e3ZlcmlmaWVkU3RhdHVzS2V5fSBjb21wb25lbnRzPXtbYm9sZE5hbWVdfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1TYWZldHlOdW1iZXJWaWV3ZXJfX2J1dHRvblwiPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgZGlzYWJsZWQ9e3ZlcmlmaWNhdGlvbkRpc2FibGVkfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIHRvZ2dsZVZlcmlmaWVkKGNvbnRhY3QpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5TZWNvbmRhcnl9XG4gICAgICAgID5cbiAgICAgICAgICB7dmVyaWZ5QnV0dG9uVGV4dH1cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmZ1bmN0aW9uIGdldFBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gIHJldHVybiBBcnJheS5mcm9tKEFycmF5KDEyKSlcbiAgICAubWFwKCgpID0+ICdYWFhYWCcpXG4gICAgLmpvaW4oJyAnKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsb0JBQXNDO0FBRXRDLGtCQUFxQjtBQWFkLE1BQU0scUJBQXFCLHdCQUFDO0FBQUEsRUFDakM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUNtQztBQUNuQyx1QkFBTSxVQUFVLE1BQU07QUFDcEIsUUFBSSxDQUFDLFNBQVM7QUFDWjtBQUFBLElBQ0Y7QUFFQSx5QkFBcUIsT0FBTztBQUFBLEVBQzlCLEdBQUcsQ0FBQyxTQUFTLHNCQUFzQixZQUFZLENBQUM7QUFFaEQsTUFBSSxDQUFDLFNBQVM7QUFDWixXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksQ0FBQyxRQUFRLGFBQWE7QUFDeEIsV0FDRSxtREFBQztBQUFBLE1BQUksV0FBVTtBQUFBLE9BQ2IsbURBQUMsYUFBSyxLQUFLLDRCQUE0QixDQUFFLEdBQ3pDLG1EQUFDO0FBQUEsTUFBSSxXQUFVO0FBQUEsT0FDYixtREFBQztBQUFBLE1BQ0MsV0FBVTtBQUFBLE1BQ1YsU0FBUyxNQUFNLFVBQVU7QUFBQSxNQUN6QixTQUFTLDRCQUFjO0FBQUEsT0FFdEIsS0FBSyxJQUFJLENBQ1osQ0FDRixDQUNGO0FBQUEsRUFFSjtBQUVBLFFBQU0sYUFBYSxRQUFRLFFBQVEsUUFBUSxRQUFRLFdBQVc7QUFDOUQsUUFBTSxpQkFDSixjQUFjLFFBQVEsY0FBYyxTQUFNLFFBQVEsZ0JBQWdCO0FBQ3BFLFFBQU0sT0FBTyxHQUFHLFFBQVEsUUFBUTtBQUNoQyxRQUFNLFdBQ0osbURBQUM7QUFBQSxJQUFLLFdBQVU7QUFBQSxLQUF3QyxJQUFLO0FBRy9ELFFBQU0sRUFBRSxlQUFlO0FBQ3ZCLFFBQU0sb0JBQW9CLGFBQWEsZUFBZTtBQUN0RCxRQUFNLG1CQUFtQixhQUFhLEtBQUssVUFBVSxJQUFJLEtBQUssUUFBUTtBQUV0RSxTQUNFLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ1osZ0JBQWdCLGVBQWUsQ0FDbEMsR0FDQSxtREFBQztBQUFBLElBQUs7QUFBQSxJQUFZLElBQUc7QUFBQSxJQUFhLFlBQVksQ0FBQyxRQUFRO0FBQUEsR0FBRyxHQUMxRCxtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ1osYUFDQyxtREFBQztBQUFBLElBQUssV0FBVTtBQUFBLEdBQTRDLElBRTVELG1EQUFDO0FBQUEsSUFBSyxXQUFVO0FBQUEsR0FBMEMsR0FFNUQsbURBQUM7QUFBQSxJQUFLO0FBQUEsSUFBWSxJQUFJO0FBQUEsSUFBbUIsWUFBWSxDQUFDLFFBQVE7QUFBQSxHQUFHLENBQ25FLEdBQ0EsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFDQyxVQUFVO0FBQUEsSUFDVixTQUFTLE1BQU07QUFDYixxQkFBZSxPQUFPO0FBQUEsSUFDeEI7QUFBQSxJQUNBLFNBQVMsNEJBQWM7QUFBQSxLQUV0QixnQkFDSCxDQUNGLENBQ0Y7QUFFSixHQTdFa0M7QUErRWxDLDBCQUFrQztBQUNoQyxTQUFPLE1BQU0sS0FBSyxNQUFNLEVBQUUsQ0FBQyxFQUN4QixJQUFJLE1BQU0sT0FBTyxFQUNqQixLQUFLLEdBQUc7QUFDYjtBQUpTIiwKICAibmFtZXMiOiBbXQp9Cg==
