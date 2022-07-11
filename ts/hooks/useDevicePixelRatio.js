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
var useDevicePixelRatio_exports = {};
__export(useDevicePixelRatio_exports, {
  useDevicePixelRatio: () => useDevicePixelRatio
});
module.exports = __toCommonJS(useDevicePixelRatio_exports);
var import_react = require("react");
function useDevicePixelRatio() {
  const [result, setResult] = (0, import_react.useState)(window.devicePixelRatio);
  (0, import_react.useEffect)(() => {
    const update = /* @__PURE__ */ __name(() => {
      setResult(window.devicePixelRatio);
    }, "update");
    update();
    const mediaQuery = window.matchMedia(`screen and (resolution: ${result}dppx)`);
    mediaQuery.addEventListener("change", update);
    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, [result]);
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useDevicePixelRatio
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlRGV2aWNlUGl4ZWxSYXRpby50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlRGV2aWNlUGl4ZWxSYXRpbygpOiBudW1iZXIge1xuICBjb25zdCBbcmVzdWx0LCBzZXRSZXN1bHRdID0gdXNlU3RhdGUod2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgc2V0UmVzdWx0KHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICB9O1xuXG4gICAgdXBkYXRlKCk7XG5cbiAgICBjb25zdCBtZWRpYVF1ZXJ5ID0gd2luZG93Lm1hdGNoTWVkaWEoXG4gICAgICBgc2NyZWVuIGFuZCAocmVzb2x1dGlvbjogJHtyZXN1bHR9ZHBweClgXG4gICAgKTtcbiAgICBtZWRpYVF1ZXJ5LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgbWVkaWFRdWVyeS5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGUpO1xuICAgIH07XG4gIH0sIFtyZXN1bHRdKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFvQztBQUU3QiwrQkFBdUM7QUFDNUMsUUFBTSxDQUFDLFFBQVEsYUFBYSwyQkFBUyxPQUFPLGdCQUFnQjtBQUU1RCw4QkFBVSxNQUFNO0FBQ2QsVUFBTSxTQUFTLDZCQUFNO0FBQ25CLGdCQUFVLE9BQU8sZ0JBQWdCO0FBQUEsSUFDbkMsR0FGZTtBQUlmLFdBQU87QUFFUCxVQUFNLGFBQWEsT0FBTyxXQUN4QiwyQkFBMkIsYUFDN0I7QUFDQSxlQUFXLGlCQUFpQixVQUFVLE1BQU07QUFFNUMsV0FBTyxNQUFNO0FBQ1gsaUJBQVcsb0JBQW9CLFVBQVUsTUFBTTtBQUFBLElBQ2pEO0FBQUEsRUFDRixHQUFHLENBQUMsTUFBTSxDQUFDO0FBRVgsU0FBTztBQUNUO0FBckJnQiIsCiAgIm5hbWVzIjogW10KfQo=
