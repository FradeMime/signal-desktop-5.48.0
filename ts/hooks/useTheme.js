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
var useTheme_exports = {};
__export(useTheme_exports, {
  useTheme: () => useTheme
});
module.exports = __toCommonJS(useTheme_exports);
var import_react = require("react");
var import_Util = require("../types/Util");
const useTheme = /* @__PURE__ */ __name(() => {
  const [theme, updateTheme] = (0, import_react.useState)(import_Util.ThemeType.light);
  const { SignalContext } = window;
  (0, import_react.useEffect)(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    async function applyTheme() {
      let newTheme = await SignalContext.Settings.themeSetting.getValue();
      if (newTheme === "system") {
        newTheme = SignalContext.nativeThemeListener.getSystemTheme();
      }
      if (signal.aborted) {
        return;
      }
      if (newTheme === "dark") {
        updateTheme(import_Util.ThemeType.dark);
      } else {
        updateTheme(import_Util.ThemeType.light);
      }
    }
    async function loop() {
      while (!signal.aborted) {
        await applyTheme();
        await SignalContext.Settings.waitForChange();
      }
    }
    SignalContext.nativeThemeListener.subscribe(applyTheme);
    loop();
    return () => {
      abortController.abort();
      SignalContext.nativeThemeListener.unsubscribe(applyTheme);
    };
  }, [updateTheme, SignalContext.Settings, SignalContext.nativeThemeListener]);
  return theme;
}, "useTheme");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useTheme
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlVGhlbWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgVGhlbWVUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5cbi8vIE5vdGUgdGhhdCB0aGlzIGhvb2sgaXMgdXNlZCBpbiBub24tbWFpbiB3aW5kb3dzIChlLmcuIFwiQWJvdXRcIiBhbmRcbi8vIFwiRGVidWcgTG9nXCIgd2luZG93cyksIGFuZCB0aHVzIGNhbid0IGFjY2VzcyByZWR1eCBzdGF0ZS5cbmV4cG9ydCBjb25zdCB1c2VUaGVtZSA9ICgpOiBUaGVtZVR5cGUgPT4ge1xuICBjb25zdCBbdGhlbWUsIHVwZGF0ZVRoZW1lXSA9IHVzZVN0YXRlKFRoZW1lVHlwZS5saWdodCk7XG5cbiAgLy8gU3Rvcnlib29rIHN1cHBvcnRcbiAgY29uc3QgeyBTaWduYWxDb250ZXh0IH0gPSB3aW5kb3c7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBhYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgICBjb25zdCB7IHNpZ25hbCB9ID0gYWJvcnRDb250cm9sbGVyO1xuXG4gICAgYXN5bmMgZnVuY3Rpb24gYXBwbHlUaGVtZSgpIHtcbiAgICAgIGxldCBuZXdUaGVtZSA9IGF3YWl0IFNpZ25hbENvbnRleHQuU2V0dGluZ3MudGhlbWVTZXR0aW5nLmdldFZhbHVlKCk7XG4gICAgICBpZiAobmV3VGhlbWUgPT09ICdzeXN0ZW0nKSB7XG4gICAgICAgIG5ld1RoZW1lID0gU2lnbmFsQ29udGV4dC5uYXRpdmVUaGVtZUxpc3RlbmVyLmdldFN5c3RlbVRoZW1lKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzaWduYWwuYWJvcnRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdUaGVtZSA9PT0gJ2RhcmsnKSB7XG4gICAgICAgIHVwZGF0ZVRoZW1lKFRoZW1lVHlwZS5kYXJrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZVRoZW1lKFRoZW1lVHlwZS5saWdodCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gbG9vcCgpIHtcbiAgICAgIHdoaWxlICghc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgICAgYXdhaXQgYXBwbHlUaGVtZSgpO1xuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICAgIGF3YWl0IFNpZ25hbENvbnRleHQuU2V0dGluZ3Mud2FpdEZvckNoYW5nZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIFNpZ25hbENvbnRleHQubmF0aXZlVGhlbWVMaXN0ZW5lci5zdWJzY3JpYmUoYXBwbHlUaGVtZSk7XG4gICAgbG9vcCgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuICAgICAgU2lnbmFsQ29udGV4dC5uYXRpdmVUaGVtZUxpc3RlbmVyLnVuc3Vic2NyaWJlKGFwcGx5VGhlbWUpO1xuICAgIH07XG4gIH0sIFt1cGRhdGVUaGVtZSwgU2lnbmFsQ29udGV4dC5TZXR0aW5ncywgU2lnbmFsQ29udGV4dC5uYXRpdmVUaGVtZUxpc3RlbmVyXSk7XG5cbiAgcmV0dXJuIHRoZW1lO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBb0M7QUFFcEMsa0JBQTBCO0FBSW5CLE1BQU0sV0FBVyw2QkFBaUI7QUFDdkMsUUFBTSxDQUFDLE9BQU8sZUFBZSwyQkFBUyxzQkFBVSxLQUFLO0FBR3JELFFBQU0sRUFBRSxrQkFBa0I7QUFFMUIsOEJBQVUsTUFBTTtBQUNkLFVBQU0sa0JBQWtCLElBQUksZ0JBQWdCO0FBRTVDLFVBQU0sRUFBRSxXQUFXO0FBRW5CLGdDQUE0QjtBQUMxQixVQUFJLFdBQVcsTUFBTSxjQUFjLFNBQVMsYUFBYSxTQUFTO0FBQ2xFLFVBQUksYUFBYSxVQUFVO0FBQ3pCLG1CQUFXLGNBQWMsb0JBQW9CLGVBQWU7QUFBQSxNQUM5RDtBQUVBLFVBQUksT0FBTyxTQUFTO0FBQ2xCO0FBQUEsTUFDRjtBQUVBLFVBQUksYUFBYSxRQUFRO0FBQ3ZCLG9CQUFZLHNCQUFVLElBQUk7QUFBQSxNQUM1QixPQUFPO0FBQ0wsb0JBQVksc0JBQVUsS0FBSztBQUFBLE1BQzdCO0FBQUEsSUFDRjtBQWZlLEFBaUJmLDBCQUFzQjtBQUNwQixhQUFPLENBQUMsT0FBTyxTQUFTO0FBRXRCLGNBQU0sV0FBVztBQUdqQixjQUFNLGNBQWMsU0FBUyxjQUFjO0FBQUEsTUFDN0M7QUFBQSxJQUNGO0FBUmUsQUFVZixrQkFBYyxvQkFBb0IsVUFBVSxVQUFVO0FBQ3RELFNBQUs7QUFFTCxXQUFPLE1BQU07QUFDWCxzQkFBZ0IsTUFBTTtBQUN0QixvQkFBYyxvQkFBb0IsWUFBWSxVQUFVO0FBQUEsSUFDMUQ7QUFBQSxFQUNGLEdBQUcsQ0FBQyxhQUFhLGNBQWMsVUFBVSxjQUFjLG1CQUFtQixDQUFDO0FBRTNFLFNBQU87QUFDVCxHQWhEd0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
