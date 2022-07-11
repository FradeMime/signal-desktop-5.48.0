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
var accounts_exports = {};
__export(accounts_exports, {
  getAccountSelector: () => getAccountSelector,
  getAccounts: () => getAccounts
});
module.exports = __toCommonJS(accounts_exports);
var import_reselect = require("reselect");
const getAccounts = /* @__PURE__ */ __name((state) => state.accounts, "getAccounts");
const getAccountSelector = (0, import_reselect.createSelector)(getAccounts, (accounts) => {
  return (identifier) => {
    if (!identifier) {
      return void 0;
    }
    return accounts.accounts[identifier] || void 0;
  };
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAccountSelector,
  getAccounts
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYWNjb3VudHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ3Jlc2VsZWN0JztcblxuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgfSBmcm9tICcuLi9yZWR1Y2VyJztcbmltcG9ydCB0eXBlIHsgQWNjb3VudHNTdGF0ZVR5cGUgfSBmcm9tICcuLi9kdWNrcy9hY2NvdW50cyc7XG5pbXBvcnQgdHlwZSB7IFVVSURTdHJpbmdUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5cbmV4cG9ydCBjb25zdCBnZXRBY2NvdW50cyA9IChzdGF0ZTogU3RhdGVUeXBlKTogQWNjb3VudHNTdGF0ZVR5cGUgPT5cbiAgc3RhdGUuYWNjb3VudHM7XG5cbmV4cG9ydCB0eXBlIEFjY291bnRTZWxlY3RvclR5cGUgPSAoXG4gIGlkZW50aWZpZXI/OiBzdHJpbmdcbikgPT4gVVVJRFN0cmluZ1R5cGUgfCB1bmRlZmluZWQ7XG5leHBvcnQgY29uc3QgZ2V0QWNjb3VudFNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldEFjY291bnRzLFxuICAoYWNjb3VudHM6IEFjY291bnRzU3RhdGVUeXBlKTogQWNjb3VudFNlbGVjdG9yVHlwZSA9PiB7XG4gICAgcmV0dXJuIChpZGVudGlmaWVyPzogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoIWlkZW50aWZpZXIpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjY291bnRzLmFjY291bnRzW2lkZW50aWZpZXJdIHx8IHVuZGVmaW5lZDtcbiAgICB9O1xuICB9XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esc0JBQStCO0FBTXhCLE1BQU0sY0FBYyx3QkFBQyxVQUMxQixNQUFNLFVBRG1CO0FBTXBCLE1BQU0scUJBQXFCLG9DQUNoQyxhQUNBLENBQUMsYUFBcUQ7QUFDcEQsU0FBTyxDQUFDLGVBQXdCO0FBQzlCLFFBQUksQ0FBQyxZQUFZO0FBQ2YsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPLFNBQVMsU0FBUyxlQUFlO0FBQUEsRUFDMUM7QUFDRixDQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
