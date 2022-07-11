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
var createGroupV2JoinModal_exports = {};
__export(createGroupV2JoinModal_exports, {
  createGroupV2JoinModal: () => createGroupV2JoinModal
});
module.exports = __toCommonJS(createGroupV2JoinModal_exports);
var import_react = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_ModalHost = require("../../components/ModalHost");
var import_GroupV2JoinDialog = require("../smart/GroupV2JoinDialog");
const createGroupV2JoinModal = /* @__PURE__ */ __name((store, props) => {
  const { onClose } = props;
  return /* @__PURE__ */ import_react.default.createElement(import_react_redux.Provider, {
    store
  }, /* @__PURE__ */ import_react.default.createElement(import_ModalHost.ModalHost, {
    onClose
  }, /* @__PURE__ */ import_react.default.createElement(import_GroupV2JoinDialog.SmartGroupV2JoinDialog, {
    ...props
  })));
}, "createGroupV2JoinModal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createGroupV2JoinModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3JlYXRlR3JvdXBWMkpvaW5Nb2RhbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgdHlwZSB7IFN0b3JlIH0gZnJvbSAncmVkdXgnO1xuXG5pbXBvcnQgeyBNb2RhbEhvc3QgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL01vZGFsSG9zdCc7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4uL3NtYXJ0L0dyb3VwVjJKb2luRGlhbG9nJztcbmltcG9ydCB7IFNtYXJ0R3JvdXBWMkpvaW5EaWFsb2cgfSBmcm9tICcuLi9zbWFydC9Hcm91cFYySm9pbkRpYWxvZyc7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVHcm91cFYySm9pbk1vZGFsID0gKFxuICBzdG9yZTogU3RvcmUsXG4gIHByb3BzOiBQcm9wc1R5cGVcbik6IFJlYWN0LlJlYWN0RWxlbWVudCA9PiB7XG4gIGNvbnN0IHsgb25DbG9zZSB9ID0gcHJvcHM7XG5cbiAgcmV0dXJuIChcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgIDxNb2RhbEhvc3Qgb25DbG9zZT17b25DbG9zZX0+XG4gICAgICAgIDxTbWFydEdyb3VwVjJKb2luRGlhbG9nIHsuLi5wcm9wc30gLz5cbiAgICAgIDwvTW9kYWxIb3N0PlxuICAgIDwvUHJvdmlkZXI+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQix5QkFBeUI7QUFJekIsdUJBQTBCO0FBRTFCLCtCQUF1QztBQUVoQyxNQUFNLHlCQUF5Qix3QkFDcEMsT0FDQSxVQUN1QjtBQUN2QixRQUFNLEVBQUUsWUFBWTtBQUVwQixTQUNFLG1EQUFDO0FBQUEsSUFBUztBQUFBLEtBQ1IsbURBQUM7QUFBQSxJQUFVO0FBQUEsS0FDVCxtREFBQztBQUFBLE9BQTJCO0FBQUEsR0FBTyxDQUNyQyxDQUNGO0FBRUosR0Fic0M7IiwKICAibmFtZXMiOiBbXQp9Cg==
