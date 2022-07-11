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
var GroupV1DisabledActions_stories_exports = {};
__export(GroupV1DisabledActions_stories_exports, {
  Default: () => Default,
  default: () => GroupV1DisabledActions_stories_default
});
module.exports = __toCommonJS(GroupV1DisabledActions_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_GroupV1DisabledActions = require("./GroupV1DisabledActions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name(() => ({
  i18n,
  onStartGroupMigration: (0, import_addon_actions.action)("onStartGroupMigration")
}), "createProps");
var GroupV1DisabledActions_stories_default = {
  title: "Components/Conversation/GroupV1DisabledActions"
};
const Default = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_GroupV1DisabledActions.GroupV1DisabledActions, {
    ...createProps()
  });
}, "Default");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBWMURpc2FibGVkQWN0aW9ucy5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSBhcyBHcm91cFYxRGlzYWJsZWRBY3Rpb25zUHJvcHNUeXBlIH0gZnJvbSAnLi9Hcm91cFYxRGlzYWJsZWRBY3Rpb25zJztcbmltcG9ydCB7IEdyb3VwVjFEaXNhYmxlZEFjdGlvbnMgfSBmcm9tICcuL0dyb3VwVjFEaXNhYmxlZEFjdGlvbnMnO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKCk6IEdyb3VwVjFEaXNhYmxlZEFjdGlvbnNQcm9wc1R5cGUgPT4gKHtcbiAgaTE4bixcbiAgb25TdGFydEdyb3VwTWlncmF0aW9uOiBhY3Rpb24oJ29uU3RhcnRHcm91cE1pZ3JhdGlvbicpLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9Hcm91cFYxRGlzYWJsZWRBY3Rpb25zJyxcbn07XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIDxHcm91cFYxRGlzYWJsZWRBY3Rpb25zIHsuLi5jcmVhdGVQcm9wcygpfSAvPjtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QiwyQkFBdUI7QUFHdkIsb0NBQXVDO0FBQ3ZDLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFFdkIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsTUFBTSxjQUFjLDZCQUF3QztBQUFBLEVBQzFEO0FBQUEsRUFDQSx1QkFBdUIsaUNBQU8sdUJBQXVCO0FBQ3ZELElBSG9CO0FBS3BCLElBQU8seUNBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sVUFBVSw2QkFBbUI7QUFDeEMsU0FBTyxvQ0FBQztBQUFBLE9BQTJCLFlBQVk7QUFBQSxHQUFHO0FBQ3BELEdBRnVCOyIsCiAgIm5hbWVzIjogW10KfQo=
