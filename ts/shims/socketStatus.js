var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var socketStatus_exports = {};
__export(socketStatus_exports, {
  getSocketStatus: () => getSocketStatus
});
module.exports = __toCommonJS(socketStatus_exports);
function getSocketStatus() {
  const { getSocketStatus: getMessageReceiverStatus } = window;
  return getMessageReceiverStatus();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getSocketStatus
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic29ja2V0U3RhdHVzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBTb2NrZXRTdGF0dXMgfSBmcm9tICcuLi90eXBlcy9Tb2NrZXRTdGF0dXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U29ja2V0U3RhdHVzKCk6IFNvY2tldFN0YXR1cyB7XG4gIGNvbnN0IHsgZ2V0U29ja2V0U3RhdHVzOiBnZXRNZXNzYWdlUmVjZWl2ZXJTdGF0dXMgfSA9IHdpbmRvdztcblxuICByZXR1cm4gZ2V0TWVzc2FnZVJlY2VpdmVyU3RhdHVzKCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS08sMkJBQXlDO0FBQzlDLFFBQU0sRUFBRSxpQkFBaUIsNkJBQTZCO0FBRXRELFNBQU8seUJBQXlCO0FBQ2xDO0FBSmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
