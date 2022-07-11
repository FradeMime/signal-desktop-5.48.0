var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_electron = require("electron");
var import_package = __toESM(require("../package.json"));
var GlobalErrors = __toESM(require("./global_errors"));
GlobalErrors.addHandler();
process.umask(63);
const appUserModelId = `org.whispersystems.${import_package.default.name}`;
console.log("Set Windows Application User Model ID (AUMID)", {
  appUserModelId
});
import_electron.app.setAppUserModelId(appUserModelId);
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RhcnR1cF9jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXBwIH0gZnJvbSAnZWxlY3Ryb24nO1xuXG5pbXBvcnQgcGFja2FnZUpzb24gZnJvbSAnLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCAqIGFzIEdsb2JhbEVycm9ycyBmcm9tICcuL2dsb2JhbF9lcnJvcnMnO1xuXG5HbG9iYWxFcnJvcnMuYWRkSGFuZGxlcigpO1xuXG4vLyBTZXQgdW1hc2sgZWFybHkgb24gaW4gdGhlIHByb2Nlc3MgbGlmZWN5Y2xlIHRvIGVuc3VyZSBmaWxlIHBlcm1pc3Npb25zIGFyZVxuLy8gc2V0IHN1Y2ggdGhhdCBvbmx5IHdlIGhhdmUgcmVhZCBhY2Nlc3MgdG8gb3VyIGZpbGVzXG5wcm9jZXNzLnVtYXNrKDBvMDc3KTtcblxuY29uc3QgYXBwVXNlck1vZGVsSWQgPSBgb3JnLndoaXNwZXJzeXN0ZW1zLiR7cGFja2FnZUpzb24ubmFtZX1gO1xuY29uc29sZS5sb2coJ1NldCBXaW5kb3dzIEFwcGxpY2F0aW9uIFVzZXIgTW9kZWwgSUQgKEFVTUlEKScsIHtcbiAgYXBwVXNlck1vZGVsSWQsXG59KTtcbmFwcC5zZXRBcHBVc2VyTW9kZWxJZChhcHBVc2VyTW9kZWxJZCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQSxzQkFBb0I7QUFFcEIscUJBQXdCO0FBQ3hCLG1CQUE4QjtBQUU5QixhQUFhLFdBQVc7QUFJeEIsUUFBUSxNQUFNLEVBQUs7QUFFbkIsTUFBTSxpQkFBaUIsc0JBQXNCLHVCQUFZO0FBQ3pELFFBQVEsSUFBSSxpREFBaUQ7QUFBQSxFQUMzRDtBQUNGLENBQUM7QUFDRCxvQkFBSSxrQkFBa0IsY0FBYzsiLAogICJuYW1lcyI6IFtdCn0K
