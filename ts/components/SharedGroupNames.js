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
var SharedGroupNames_exports = {};
__export(SharedGroupNames_exports, {
  SharedGroupNames: () => SharedGroupNames
});
module.exports = __toCommonJS(SharedGroupNames_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_Emojify = require("./conversation/Emojify");
var import_Intl = require("./Intl");
const SharedGroupNames = /* @__PURE__ */ __name(({
  i18n,
  nameClassName,
  sharedGroupNames
}) => {
  const firstThreeGroups = (0, import_lodash.take)(sharedGroupNames, 3).map((group, i) => /* @__PURE__ */ import_react.default.createElement("strong", {
    key: i,
    className: nameClassName
  }, /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
    text: group
  })));
  if (sharedGroupNames.length >= 5) {
    const remainingCount = sharedGroupNames.length - 3;
    return /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      i18n,
      id: "member-of-more-than-3-groups--multiple-more",
      components: {
        group1: firstThreeGroups[0],
        group2: firstThreeGroups[1],
        group3: firstThreeGroups[2],
        remainingCount: remainingCount.toString()
      }
    });
  }
  if (sharedGroupNames.length === 4) {
    return /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      i18n,
      id: "member-of-more-than-3-groups--one-more",
      components: {
        group1: firstThreeGroups[0],
        group2: firstThreeGroups[1],
        group3: firstThreeGroups[2]
      }
    });
  }
  if (firstThreeGroups.length === 3) {
    return /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      i18n,
      id: "member-of-3-groups",
      components: {
        group1: firstThreeGroups[0],
        group2: firstThreeGroups[1],
        group3: firstThreeGroups[2]
      }
    });
  }
  if (firstThreeGroups.length >= 2) {
    return /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      i18n,
      id: "member-of-2-groups",
      components: {
        group1: firstThreeGroups[0],
        group2: firstThreeGroups[1]
      }
    });
  }
  if (firstThreeGroups.length >= 1) {
    return /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      i18n,
      id: "member-of-1-group",
      components: {
        group: firstThreeGroups[0]
      }
    });
  }
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, i18n("no-groups-in-common"));
}, "SharedGroupNames");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SharedGroupNames
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2hhcmVkR3JvdXBOYW1lcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgRW1vamlmeSB9IGZyb20gJy4vY29udmVyc2F0aW9uL0Vtb2ppZnknO1xuaW1wb3J0IHsgSW50bCB9IGZyb20gJy4vSW50bCc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcblxudHlwZSBQcm9wc1R5cGUgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIG5hbWVDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHNoYXJlZEdyb3VwTmFtZXM6IEFycmF5PHN0cmluZz47XG59O1xuXG5leHBvcnQgY29uc3QgU2hhcmVkR3JvdXBOYW1lczogRnVuY3Rpb25Db21wb25lbnQ8UHJvcHNUeXBlPiA9ICh7XG4gIGkxOG4sXG4gIG5hbWVDbGFzc05hbWUsXG4gIHNoYXJlZEdyb3VwTmFtZXMsXG59KSA9PiB7XG4gIGNvbnN0IGZpcnN0VGhyZWVHcm91cHMgPSB0YWtlKHNoYXJlZEdyb3VwTmFtZXMsIDMpLm1hcCgoZ3JvdXAsIGkpID0+IChcbiAgICAvLyBXZSBjYW5ub3QgZ3VhcmFudGVlIHVuaXF1ZW5lc3Mgb2YgZ3JvdXAgbmFtZXNcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tYXJyYXktaW5kZXgta2V5XG4gICAgPHN0cm9uZyBrZXk9e2l9IGNsYXNzTmFtZT17bmFtZUNsYXNzTmFtZX0+XG4gICAgICA8RW1vamlmeSB0ZXh0PXtncm91cH0gLz5cbiAgICA8L3N0cm9uZz5cbiAgKSk7XG5cbiAgaWYgKHNoYXJlZEdyb3VwTmFtZXMubGVuZ3RoID49IDUpIHtcbiAgICBjb25zdCByZW1haW5pbmdDb3VudCA9IHNoYXJlZEdyb3VwTmFtZXMubGVuZ3RoIC0gMztcbiAgICByZXR1cm4gKFxuICAgICAgPEludGxcbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgaWQ9XCJtZW1iZXItb2YtbW9yZS10aGFuLTMtZ3JvdXBzLS1tdWx0aXBsZS1tb3JlXCJcbiAgICAgICAgY29tcG9uZW50cz17e1xuICAgICAgICAgIGdyb3VwMTogZmlyc3RUaHJlZUdyb3Vwc1swXSxcbiAgICAgICAgICBncm91cDI6IGZpcnN0VGhyZWVHcm91cHNbMV0sXG4gICAgICAgICAgZ3JvdXAzOiBmaXJzdFRocmVlR3JvdXBzWzJdLFxuICAgICAgICAgIHJlbWFpbmluZ0NvdW50OiByZW1haW5pbmdDb3VudC50b1N0cmluZygpLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICApO1xuICB9XG4gIGlmIChzaGFyZWRHcm91cE5hbWVzLmxlbmd0aCA9PT0gNCkge1xuICAgIHJldHVybiAoXG4gICAgICA8SW50bFxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBpZD1cIm1lbWJlci1vZi1tb3JlLXRoYW4tMy1ncm91cHMtLW9uZS1tb3JlXCJcbiAgICAgICAgY29tcG9uZW50cz17e1xuICAgICAgICAgIGdyb3VwMTogZmlyc3RUaHJlZUdyb3Vwc1swXSxcbiAgICAgICAgICBncm91cDI6IGZpcnN0VGhyZWVHcm91cHNbMV0sXG4gICAgICAgICAgZ3JvdXAzOiBmaXJzdFRocmVlR3JvdXBzWzJdLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICApO1xuICB9XG4gIGlmIChmaXJzdFRocmVlR3JvdXBzLmxlbmd0aCA9PT0gMykge1xuICAgIHJldHVybiAoXG4gICAgICA8SW50bFxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBpZD1cIm1lbWJlci1vZi0zLWdyb3Vwc1wiXG4gICAgICAgIGNvbXBvbmVudHM9e3tcbiAgICAgICAgICBncm91cDE6IGZpcnN0VGhyZWVHcm91cHNbMF0sXG4gICAgICAgICAgZ3JvdXAyOiBmaXJzdFRocmVlR3JvdXBzWzFdLFxuICAgICAgICAgIGdyb3VwMzogZmlyc3RUaHJlZUdyb3Vwc1syXSxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuICBpZiAoZmlyc3RUaHJlZUdyb3Vwcy5sZW5ndGggPj0gMikge1xuICAgIHJldHVybiAoXG4gICAgICA8SW50bFxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBpZD1cIm1lbWJlci1vZi0yLWdyb3Vwc1wiXG4gICAgICAgIGNvbXBvbmVudHM9e3tcbiAgICAgICAgICBncm91cDE6IGZpcnN0VGhyZWVHcm91cHNbMF0sXG4gICAgICAgICAgZ3JvdXAyOiBmaXJzdFRocmVlR3JvdXBzWzFdLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICApO1xuICB9XG4gIGlmIChmaXJzdFRocmVlR3JvdXBzLmxlbmd0aCA+PSAxKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxJbnRsXG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIGlkPVwibWVtYmVyLW9mLTEtZ3JvdXBcIlxuICAgICAgICBjb21wb25lbnRzPXt7XG4gICAgICAgICAgZ3JvdXA6IGZpcnN0VGhyZWVHcm91cHNbMF0sXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gPD57aTE4bignbm8tZ3JvdXBzLWluLWNvbW1vbicpfTwvPjtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWtCO0FBQ2xCLG9CQUFxQjtBQUVyQixxQkFBd0I7QUFDeEIsa0JBQXFCO0FBU2QsTUFBTSxtQkFBaUQsd0JBQUM7QUFBQSxFQUM3RDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDSTtBQUNKLFFBQU0sbUJBQW1CLHdCQUFLLGtCQUFrQixDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sTUFHN0QsbURBQUM7QUFBQSxJQUFPLEtBQUs7QUFBQSxJQUFHLFdBQVc7QUFBQSxLQUN6QixtREFBQztBQUFBLElBQVEsTUFBTTtBQUFBLEdBQU8sQ0FDeEIsQ0FDRDtBQUVELE1BQUksaUJBQWlCLFVBQVUsR0FBRztBQUNoQyxVQUFNLGlCQUFpQixpQkFBaUIsU0FBUztBQUNqRCxXQUNFLG1EQUFDO0FBQUEsTUFDQztBQUFBLE1BQ0EsSUFBRztBQUFBLE1BQ0gsWUFBWTtBQUFBLFFBQ1YsUUFBUSxpQkFBaUI7QUFBQSxRQUN6QixRQUFRLGlCQUFpQjtBQUFBLFFBQ3pCLFFBQVEsaUJBQWlCO0FBQUEsUUFDekIsZ0JBQWdCLGVBQWUsU0FBUztBQUFBLE1BQzFDO0FBQUEsS0FDRjtBQUFBLEVBRUo7QUFDQSxNQUFJLGlCQUFpQixXQUFXLEdBQUc7QUFDakMsV0FDRSxtREFBQztBQUFBLE1BQ0M7QUFBQSxNQUNBLElBQUc7QUFBQSxNQUNILFlBQVk7QUFBQSxRQUNWLFFBQVEsaUJBQWlCO0FBQUEsUUFDekIsUUFBUSxpQkFBaUI7QUFBQSxRQUN6QixRQUFRLGlCQUFpQjtBQUFBLE1BQzNCO0FBQUEsS0FDRjtBQUFBLEVBRUo7QUFDQSxNQUFJLGlCQUFpQixXQUFXLEdBQUc7QUFDakMsV0FDRSxtREFBQztBQUFBLE1BQ0M7QUFBQSxNQUNBLElBQUc7QUFBQSxNQUNILFlBQVk7QUFBQSxRQUNWLFFBQVEsaUJBQWlCO0FBQUEsUUFDekIsUUFBUSxpQkFBaUI7QUFBQSxRQUN6QixRQUFRLGlCQUFpQjtBQUFBLE1BQzNCO0FBQUEsS0FDRjtBQUFBLEVBRUo7QUFDQSxNQUFJLGlCQUFpQixVQUFVLEdBQUc7QUFDaEMsV0FDRSxtREFBQztBQUFBLE1BQ0M7QUFBQSxNQUNBLElBQUc7QUFBQSxNQUNILFlBQVk7QUFBQSxRQUNWLFFBQVEsaUJBQWlCO0FBQUEsUUFDekIsUUFBUSxpQkFBaUI7QUFBQSxNQUMzQjtBQUFBLEtBQ0Y7QUFBQSxFQUVKO0FBQ0EsTUFBSSxpQkFBaUIsVUFBVSxHQUFHO0FBQ2hDLFdBQ0UsbURBQUM7QUFBQSxNQUNDO0FBQUEsTUFDQSxJQUFHO0FBQUEsTUFDSCxZQUFZO0FBQUEsUUFDVixPQUFPLGlCQUFpQjtBQUFBLE1BQzFCO0FBQUEsS0FDRjtBQUFBLEVBRUo7QUFFQSxTQUFPLHdGQUFHLEtBQUsscUJBQXFCLENBQUU7QUFDeEMsR0EvRThEOyIsCiAgIm5hbWVzIjogW10KfQo=
