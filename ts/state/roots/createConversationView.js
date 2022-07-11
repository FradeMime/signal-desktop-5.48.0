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
var createConversationView_exports = {};
__export(createConversationView_exports, {
  createConversationView: () => createConversationView
});
module.exports = __toCommonJS(createConversationView_exports);
var import_react = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_ConversationView = require("../smart/ConversationView");
const createConversationView = /* @__PURE__ */ __name((store, props) => /* @__PURE__ */ import_react.default.createElement(import_react_redux.Provider, {
  store
}, /* @__PURE__ */ import_react.default.createElement(import_ConversationView.SmartConversationView, {
  ...props
})), "createConversationView");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createConversationView
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3JlYXRlQ29udmVyc2F0aW9uVmlldy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB0eXBlIHsgU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi4vc21hcnQvQ29udmVyc2F0aW9uVmlldyc7XG5pbXBvcnQgeyBTbWFydENvbnZlcnNhdGlvblZpZXcgfSBmcm9tICcuLi9zbWFydC9Db252ZXJzYXRpb25WaWV3JztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbnZlcnNhdGlvblZpZXcgPSAoXG4gIHN0b3JlOiBTdG9yZSxcbiAgcHJvcHM6IFByb3BzVHlwZVxuKTogUmVhY3QuUmVhY3RFbGVtZW50ID0+IChcbiAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgPFNtYXJ0Q29udmVyc2F0aW9uVmlldyB7Li4ucHJvcHN9IC8+XG4gIDwvUHJvdmlkZXI+XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQix5QkFBeUI7QUFLekIsOEJBQXNDO0FBRS9CLE1BQU0seUJBQXlCLHdCQUNwQyxPQUNBLFVBRUEsbURBQUM7QUFBQSxFQUFTO0FBQUEsR0FDUixtREFBQztBQUFBLEtBQTBCO0FBQUEsQ0FBTyxDQUNwQyxHQU5vQzsiLAogICJuYW1lcyI6IFtdCn0K
