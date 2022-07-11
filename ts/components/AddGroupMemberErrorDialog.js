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
var AddGroupMemberErrorDialog_exports = {};
__export(AddGroupMemberErrorDialog_exports, {
  AddGroupMemberErrorDialog: () => AddGroupMemberErrorDialog,
  AddGroupMemberErrorDialogMode: () => AddGroupMemberErrorDialogMode
});
module.exports = __toCommonJS(AddGroupMemberErrorDialog_exports);
var import_react = __toESM(require("react"));
var import_Alert = require("./Alert");
var import_missingCaseError = require("../util/missingCaseError");
var AddGroupMemberErrorDialogMode = /* @__PURE__ */ ((AddGroupMemberErrorDialogMode2) => {
  AddGroupMemberErrorDialogMode2[AddGroupMemberErrorDialogMode2["MaximumGroupSize"] = 0] = "MaximumGroupSize";
  AddGroupMemberErrorDialogMode2[AddGroupMemberErrorDialogMode2["RecommendedMaximumGroupSize"] = 1] = "RecommendedMaximumGroupSize";
  return AddGroupMemberErrorDialogMode2;
})(AddGroupMemberErrorDialogMode || {});
const AddGroupMemberErrorDialog = /* @__PURE__ */ __name((props) => {
  const { i18n, onClose } = props;
  let title;
  let body;
  switch (props.mode) {
    case 0 /* MaximumGroupSize */: {
      const { maximumNumberOfContacts } = props;
      title = i18n("chooseGroupMembers__maximum-group-size__title");
      body = i18n("chooseGroupMembers__maximum-group-size__body", [
        maximumNumberOfContacts.toString()
      ]);
      break;
    }
    case 1 /* RecommendedMaximumGroupSize */: {
      const { recommendedMaximumNumberOfContacts } = props;
      title = i18n("chooseGroupMembers__maximum-recommended-group-size__title");
      body = i18n("chooseGroupMembers__maximum-recommended-group-size__body", [
        recommendedMaximumNumberOfContacts.toString()
      ]);
      break;
    }
    default:
      throw (0, import_missingCaseError.missingCaseError)(props);
  }
  return /* @__PURE__ */ import_react.default.createElement(import_Alert.Alert, {
    body,
    i18n,
    onClose,
    title
  });
}, "AddGroupMemberErrorDialog");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddGroupMemberErrorDialog,
  AddGroupMemberErrorDialogMode
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQWRkR3JvdXBNZW1iZXJFcnJvckRpYWxvZy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEZ1bmN0aW9uQ29tcG9uZW50LCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IEFsZXJ0IH0gZnJvbSAnLi9BbGVydCc7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcblxuZXhwb3J0IGVudW0gQWRkR3JvdXBNZW1iZXJFcnJvckRpYWxvZ01vZGUge1xuICBNYXhpbXVtR3JvdXBTaXplLFxuICBSZWNvbW1lbmRlZE1heGltdW1Hcm91cFNpemUsXG59XG5cbnR5cGUgUHJvcHNEYXRhVHlwZSA9XG4gIHwge1xuICAgICAgbW9kZTogQWRkR3JvdXBNZW1iZXJFcnJvckRpYWxvZ01vZGUuTWF4aW11bUdyb3VwU2l6ZTtcbiAgICAgIG1heGltdW1OdW1iZXJPZkNvbnRhY3RzOiBudW1iZXI7XG4gICAgfVxuICB8IHtcbiAgICAgIG1vZGU6IEFkZEdyb3VwTWVtYmVyRXJyb3JEaWFsb2dNb2RlLlJlY29tbWVuZGVkTWF4aW11bUdyb3VwU2l6ZTtcbiAgICAgIHJlY29tbWVuZGVkTWF4aW11bU51bWJlck9mQ29udGFjdHM6IG51bWJlcjtcbiAgICB9O1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbn0gJiBQcm9wc0RhdGFUeXBlO1xuXG5leHBvcnQgY29uc3QgQWRkR3JvdXBNZW1iZXJFcnJvckRpYWxvZzogRnVuY3Rpb25Db21wb25lbnQ8XG4gIFByb3BzVHlwZVxuPiA9IHByb3BzID0+IHtcbiAgY29uc3QgeyBpMThuLCBvbkNsb3NlIH0gPSBwcm9wcztcblxuICBsZXQgdGl0bGU6IHN0cmluZztcbiAgbGV0IGJvZHk6IFJlYWN0Tm9kZTtcbiAgc3dpdGNoIChwcm9wcy5tb2RlKSB7XG4gICAgY2FzZSBBZGRHcm91cE1lbWJlckVycm9yRGlhbG9nTW9kZS5NYXhpbXVtR3JvdXBTaXplOiB7XG4gICAgICBjb25zdCB7IG1heGltdW1OdW1iZXJPZkNvbnRhY3RzIH0gPSBwcm9wcztcbiAgICAgIHRpdGxlID0gaTE4bignY2hvb3NlR3JvdXBNZW1iZXJzX19tYXhpbXVtLWdyb3VwLXNpemVfX3RpdGxlJyk7XG4gICAgICBib2R5ID0gaTE4bignY2hvb3NlR3JvdXBNZW1iZXJzX19tYXhpbXVtLWdyb3VwLXNpemVfX2JvZHknLCBbXG4gICAgICAgIG1heGltdW1OdW1iZXJPZkNvbnRhY3RzLnRvU3RyaW5nKCksXG4gICAgICBdKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIEFkZEdyb3VwTWVtYmVyRXJyb3JEaWFsb2dNb2RlLlJlY29tbWVuZGVkTWF4aW11bUdyb3VwU2l6ZToge1xuICAgICAgY29uc3QgeyByZWNvbW1lbmRlZE1heGltdW1OdW1iZXJPZkNvbnRhY3RzIH0gPSBwcm9wcztcbiAgICAgIHRpdGxlID0gaTE4bignY2hvb3NlR3JvdXBNZW1iZXJzX19tYXhpbXVtLXJlY29tbWVuZGVkLWdyb3VwLXNpemVfX3RpdGxlJyk7XG4gICAgICBib2R5ID0gaTE4bignY2hvb3NlR3JvdXBNZW1iZXJzX19tYXhpbXVtLXJlY29tbWVuZGVkLWdyb3VwLXNpemVfX2JvZHknLCBbXG4gICAgICAgIHJlY29tbWVuZGVkTWF4aW11bU51bWJlck9mQ29udGFjdHMudG9TdHJpbmcoKSxcbiAgICAgIF0pO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKHByb3BzKTtcbiAgfVxuXG4gIHJldHVybiA8QWxlcnQgYm9keT17Ym9keX0gaTE4bj17aTE4bn0gb25DbG9zZT17b25DbG9zZX0gdGl0bGU9e3RpdGxlfSAvPjtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFHbEIsbUJBQXNCO0FBQ3RCLDhCQUFpQztBQUUxQixJQUFLLGdDQUFMLGtCQUFLLG1DQUFMO0FBQ0w7QUFDQTtBQUZVO0FBQUE7QUFvQkwsTUFBTSw0QkFFVCxrQ0FBUztBQUNYLFFBQU0sRUFBRSxNQUFNLFlBQVk7QUFFMUIsTUFBSTtBQUNKLE1BQUk7QUFDSixVQUFRLE1BQU07QUFBQSxTQUNQLDBCQUFnRDtBQUNuRCxZQUFNLEVBQUUsNEJBQTRCO0FBQ3BDLGNBQVEsS0FBSywrQ0FBK0M7QUFDNUQsYUFBTyxLQUFLLGdEQUFnRDtBQUFBLFFBQzFELHdCQUF3QixTQUFTO0FBQUEsTUFDbkMsQ0FBQztBQUNEO0FBQUEsSUFDRjtBQUFBLFNBQ0sscUNBQTJEO0FBQzlELFlBQU0sRUFBRSx1Q0FBdUM7QUFDL0MsY0FBUSxLQUFLLDJEQUEyRDtBQUN4RSxhQUFPLEtBQUssNERBQTREO0FBQUEsUUFDdEUsbUNBQW1DLFNBQVM7QUFBQSxNQUM5QyxDQUFDO0FBQ0Q7QUFBQSxJQUNGO0FBQUE7QUFFRSxZQUFNLDhDQUFpQixLQUFLO0FBQUE7QUFHaEMsU0FBTyxtREFBQztBQUFBLElBQU07QUFBQSxJQUFZO0FBQUEsSUFBWTtBQUFBLElBQWtCO0FBQUEsR0FBYztBQUN4RSxHQTNCSTsiLAogICJuYW1lcyI6IFtdCn0K
