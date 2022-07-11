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
var createGroupV1MigrationModal_exports = {};
__export(createGroupV1MigrationModal_exports, {
  createGroupV1MigrationModal: () => createGroupV1MigrationModal
});
module.exports = __toCommonJS(createGroupV1MigrationModal_exports);
var import_react = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_ModalHost = require("../../components/ModalHost");
var import_GroupV1MigrationDialog = require("../smart/GroupV1MigrationDialog");
const createGroupV1MigrationModal = /* @__PURE__ */ __name((store, props) => {
  const { onClose } = props;
  return /* @__PURE__ */ import_react.default.createElement(import_react_redux.Provider, {
    store
  }, /* @__PURE__ */ import_react.default.createElement(import_ModalHost.ModalHost, {
    onClose
  }, /* @__PURE__ */ import_react.default.createElement(import_GroupV1MigrationDialog.SmartGroupV1MigrationDialog, {
    ...props
  })));
}, "createGroupV1MigrationModal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createGroupV1MigrationModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3JlYXRlR3JvdXBWMU1pZ3JhdGlvbk1vZGFsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB0eXBlIHsgU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB7IE1vZGFsSG9zdCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvTW9kYWxIb3N0JztcbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi4vc21hcnQvR3JvdXBWMU1pZ3JhdGlvbkRpYWxvZyc7XG5pbXBvcnQgeyBTbWFydEdyb3VwVjFNaWdyYXRpb25EaWFsb2cgfSBmcm9tICcuLi9zbWFydC9Hcm91cFYxTWlncmF0aW9uRGlhbG9nJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUdyb3VwVjFNaWdyYXRpb25Nb2RhbCA9IChcbiAgc3RvcmU6IFN0b3JlLFxuICBwcm9wczogUHJvcHNUeXBlXG4pOiBSZWFjdC5SZWFjdEVsZW1lbnQgPT4ge1xuICBjb25zdCB7IG9uQ2xvc2UgfSA9IHByb3BzO1xuXG4gIHJldHVybiAoXG4gICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICA8TW9kYWxIb3N0IG9uQ2xvc2U9e29uQ2xvc2V9PlxuICAgICAgICA8U21hcnRHcm91cFYxTWlncmF0aW9uRGlhbG9nIHsuLi5wcm9wc30gLz5cbiAgICAgIDwvTW9kYWxIb3N0PlxuICAgIDwvUHJvdmlkZXI+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQix5QkFBeUI7QUFJekIsdUJBQTBCO0FBRTFCLG9DQUE0QztBQUVyQyxNQUFNLDhCQUE4Qix3QkFDekMsT0FDQSxVQUN1QjtBQUN2QixRQUFNLEVBQUUsWUFBWTtBQUVwQixTQUNFLG1EQUFDO0FBQUEsSUFBUztBQUFBLEtBQ1IsbURBQUM7QUFBQSxJQUFVO0FBQUEsS0FDVCxtREFBQztBQUFBLE9BQWdDO0FBQUEsR0FBTyxDQUMxQyxDQUNGO0FBRUosR0FiMkM7IiwKICAibmFtZXMiOiBbXQp9Cg==
