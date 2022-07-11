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
var createNativeThemeListener_exports = {};
__export(createNativeThemeListener_exports, {
  createNativeThemeListener: () => createNativeThemeListener
});
module.exports = __toCommonJS(createNativeThemeListener_exports);
function createNativeThemeListener(ipc, holder) {
  const subscribers = new Array();
  let theme = ipc.sendSync("native-theme:init");
  let systemTheme;
  function update() {
    const nextSystemTheme = theme.shouldUseDarkColors ? "dark" : "light";
    holder.systemTheme = nextSystemTheme;
    return nextSystemTheme;
  }
  function subscribe(fn) {
    subscribers.push(fn);
  }
  function unsubscribe(fn) {
    const index = subscribers.indexOf(fn);
    if (index !== -1) {
      subscribers.splice(index, 1);
    }
  }
  ipc.on("native-theme:changed", (_event, change) => {
    theme = change;
    systemTheme = update();
    for (const fn of subscribers) {
      fn(change);
    }
  });
  systemTheme = update();
  return {
    getSystemTheme: () => systemTheme,
    subscribe,
    unsubscribe,
    update
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createNativeThemeListener
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3JlYXRlTmF0aXZlVGhlbWVMaXN0ZW5lci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cblxuaW1wb3J0IHR5cGUgeyBOYXRpdmVUaGVtZVN0YXRlIH0gZnJvbSAnLi4vdHlwZXMvTmF0aXZlVGhlbWVOb3RpZmllci5kJztcblxuZXhwb3J0IHR5cGUgQ2FsbGJhY2sgPSAoY2hhbmdlOiBOYXRpdmVUaGVtZVN0YXRlKSA9PiB2b2lkO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1pbmltYWxJUEMge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBzZW5kKGNoYW5uZWw6IHN0cmluZywgLi4uYXJnczogUmVhZG9ubHlBcnJheTxhbnk+KTogdm9pZDtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBzZW5kU3luYyhjaGFubmVsOiBzdHJpbmcpOiBhbnk7XG5cbiAgb24oXG4gICAgY2hhbm5lbDogc3RyaW5nLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgbGlzdGVuZXI6IChldmVudDogdW5rbm93biwgLi4uYXJnczogUmVhZG9ubHlBcnJheTxhbnk+KSA9PiB2b2lkXG4gICk6IHRoaXM7XG59XG5cbnR5cGUgU3lzdGVtVGhlbWVUeXBlID0gJ2RhcmsnIHwgJ2xpZ2h0JztcblxuZXhwb3J0IHR5cGUgU3lzdGVtVGhlbWVIb2xkZXIgPSB7IHN5c3RlbVRoZW1lOiBTeXN0ZW1UaGVtZVR5cGUgfTtcblxuZXhwb3J0IHR5cGUgTmF0aXZlVGhlbWVUeXBlID0ge1xuICBnZXRTeXN0ZW1UaGVtZTogKCkgPT4gU3lzdGVtVGhlbWVUeXBlO1xuICBzdWJzY3JpYmU6IChmbjogQ2FsbGJhY2spID0+IHZvaWQ7XG4gIHVuc3Vic2NyaWJlOiAoZm46IENhbGxiYWNrKSA9PiB2b2lkO1xuICB1cGRhdGU6ICgpID0+IFN5c3RlbVRoZW1lVHlwZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOYXRpdmVUaGVtZUxpc3RlbmVyKFxuICBpcGM6IE1pbmltYWxJUEMsXG4gIGhvbGRlcjogU3lzdGVtVGhlbWVIb2xkZXJcbik6IE5hdGl2ZVRoZW1lVHlwZSB7XG4gIGNvbnN0IHN1YnNjcmliZXJzID0gbmV3IEFycmF5PENhbGxiYWNrPigpO1xuXG4gIGxldCB0aGVtZSA9IGlwYy5zZW5kU3luYygnbmF0aXZlLXRoZW1lOmluaXQnKTtcbiAgbGV0IHN5c3RlbVRoZW1lOiBTeXN0ZW1UaGVtZVR5cGU7XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCk6IFN5c3RlbVRoZW1lVHlwZSB7XG4gICAgY29uc3QgbmV4dFN5c3RlbVRoZW1lID0gdGhlbWUuc2hvdWxkVXNlRGFya0NvbG9ycyA/ICdkYXJrJyA6ICdsaWdodCc7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgaG9sZGVyLnN5c3RlbVRoZW1lID0gbmV4dFN5c3RlbVRoZW1lO1xuICAgIHJldHVybiBuZXh0U3lzdGVtVGhlbWU7XG4gIH1cblxuICBmdW5jdGlvbiBzdWJzY3JpYmUoZm46IENhbGxiYWNrKTogdm9pZCB7XG4gICAgc3Vic2NyaWJlcnMucHVzaChmbik7XG4gIH1cblxuICBmdW5jdGlvbiB1bnN1YnNjcmliZShmbjogQ2FsbGJhY2spOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHN1YnNjcmliZXJzLmluZGV4T2YoZm4pO1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgc3Vic2NyaWJlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBpcGMub24oXG4gICAgJ25hdGl2ZS10aGVtZTpjaGFuZ2VkJyxcbiAgICAoX2V2ZW50OiB1bmtub3duLCBjaGFuZ2U6IE5hdGl2ZVRoZW1lU3RhdGUpID0+IHtcbiAgICAgIHRoZW1lID0gY2hhbmdlO1xuICAgICAgc3lzdGVtVGhlbWUgPSB1cGRhdGUoKTtcblxuICAgICAgZm9yIChjb25zdCBmbiBvZiBzdWJzY3JpYmVycykge1xuICAgICAgICBmbihjaGFuZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICBzeXN0ZW1UaGVtZSA9IHVwZGF0ZSgpO1xuXG4gIHJldHVybiB7XG4gICAgZ2V0U3lzdGVtVGhlbWU6ICgpID0+IHN5c3RlbVRoZW1lLFxuICAgIHN1YnNjcmliZSxcbiAgICB1bnN1YnNjcmliZSxcbiAgICB1cGRhdGUsXG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBaUNPLG1DQUNMLEtBQ0EsUUFDaUI7QUFDakIsUUFBTSxjQUFjLElBQUksTUFBZ0I7QUFFeEMsTUFBSSxRQUFRLElBQUksU0FBUyxtQkFBbUI7QUFDNUMsTUFBSTtBQUVKLG9CQUFtQztBQUNqQyxVQUFNLGtCQUFrQixNQUFNLHNCQUFzQixTQUFTO0FBRTdELFdBQU8sY0FBYztBQUNyQixXQUFPO0FBQUEsRUFDVDtBQUxTLEFBT1QscUJBQW1CLElBQW9CO0FBQ3JDLGdCQUFZLEtBQUssRUFBRTtBQUFBLEVBQ3JCO0FBRlMsQUFJVCx1QkFBcUIsSUFBb0I7QUFDdkMsVUFBTSxRQUFRLFlBQVksUUFBUSxFQUFFO0FBRXBDLFFBQUksVUFBVSxJQUFJO0FBQ2hCLGtCQUFZLE9BQU8sT0FBTyxDQUFDO0FBQUEsSUFDN0I7QUFBQSxFQUNGO0FBTlMsQUFRVCxNQUFJLEdBQ0Ysd0JBQ0EsQ0FBQyxRQUFpQixXQUE2QjtBQUM3QyxZQUFRO0FBQ1Isa0JBQWMsT0FBTztBQUVyQixlQUFXLE1BQU0sYUFBYTtBQUM1QixTQUFHLE1BQU07QUFBQSxJQUNYO0FBQUEsRUFDRixDQUNGO0FBRUEsZ0JBQWMsT0FBTztBQUVyQixTQUFPO0FBQUEsSUFDTCxnQkFBZ0IsTUFBTTtBQUFBLElBQ3RCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7QUFoRGdCIiwKICAibmFtZXMiOiBbXQp9Cg==
