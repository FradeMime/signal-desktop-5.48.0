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
var ContextMenu_stories_exports = {};
__export(ContextMenu_stories_exports, {
  Default: () => Default,
  default: () => ContextMenu_stories_default
});
module.exports = __toCommonJS(ContextMenu_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_ContextMenu = require("./ContextMenu");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_setupI18n = require("../util/setupI18n");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ContextMenu_stories_default = {
  title: "Components/ContextMenu"
};
const getDefaultProps = /* @__PURE__ */ __name(() => ({
  i18n,
  menuOptions: [
    {
      label: "1",
      onClick: (0, import_addon_actions.action)("1")
    },
    {
      label: "2",
      onClick: (0, import_addon_actions.action)("2")
    },
    {
      label: "3",
      onClick: (0, import_addon_actions.action)("3")
    }
  ]
}), "getDefaultProps");
const Default = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ import_react.default.createElement(import_ContextMenu.ContextMenu, {
    ...getDefaultProps()
  });
}, "Default");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGV4dE1lbnUuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL0NvbnRleHRNZW51JztcbmltcG9ydCB7IENvbnRleHRNZW51IH0gZnJvbSAnLi9Db250ZXh0TWVudSc7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udGV4dE1lbnUnLFxufTtcblxuY29uc3QgZ2V0RGVmYXVsdFByb3BzID0gKCk6IFByb3BzVHlwZTxudW1iZXI+ID0+ICh7XG4gIGkxOG4sXG4gIG1lbnVPcHRpb25zOiBbXG4gICAge1xuICAgICAgbGFiZWw6ICcxJyxcbiAgICAgIG9uQ2xpY2s6IGFjdGlvbignMScpLFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICcyJyxcbiAgICAgIG9uQ2xpY2s6IGFjdGlvbignMicpLFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICczJyxcbiAgICAgIG9uQ2xpY2s6IGFjdGlvbignMycpLFxuICAgIH0sXG4gIF0sXG59KTtcblxuZXhwb3J0IGNvbnN0IERlZmF1bHQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gPENvbnRleHRNZW51IHsuLi5nZXREZWZhdWx0UHJvcHMoKX0gLz47XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLDJCQUF1QjtBQUd2Qix5QkFBNEI7QUFDNUIsc0JBQXVCO0FBQ3ZCLHVCQUEwQjtBQUUxQixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLDhCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLGtCQUFrQiw2QkFBMEI7QUFBQSxFQUNoRDtBQUFBLEVBQ0EsYUFBYTtBQUFBLElBQ1g7QUFBQSxNQUNFLE9BQU87QUFBQSxNQUNQLFNBQVMsaUNBQU8sR0FBRztBQUFBLElBQ3JCO0FBQUEsSUFDQTtBQUFBLE1BQ0UsT0FBTztBQUFBLE1BQ1AsU0FBUyxpQ0FBTyxHQUFHO0FBQUEsSUFDckI7QUFBQSxJQUNBO0FBQUEsTUFDRSxPQUFPO0FBQUEsTUFDUCxTQUFTLGlDQUFPLEdBQUc7QUFBQSxJQUNyQjtBQUFBLEVBQ0Y7QUFDRixJQWhCd0I7QUFrQmpCLE1BQU0sVUFBVSw2QkFBbUI7QUFDeEMsU0FBTyxtREFBQztBQUFBLE9BQWdCLGdCQUFnQjtBQUFBLEdBQUc7QUFDN0MsR0FGdUI7IiwKICAibmFtZXMiOiBbXQp9Cg==
