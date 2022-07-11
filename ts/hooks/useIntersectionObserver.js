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
var useIntersectionObserver_exports = {};
__export(useIntersectionObserver_exports, {
  useIntersectionObserver: () => useIntersectionObserver
});
module.exports = __toCommonJS(useIntersectionObserver_exports);
var import_react = require("react");
var log = __toESM(require("../logging/log"));
function useIntersectionObserver() {
  const [intersectionObserverEntry, setIntersectionObserverEntry] = (0, import_react.useState)(null);
  const unobserveRef = (0, import_react.useRef)(null);
  const setRef = (0, import_react.useCallback)((el) => {
    if (unobserveRef.current) {
      unobserveRef.current();
      unobserveRef.current = null;
    }
    if (!el) {
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.length !== 1) {
        log.error("IntersectionObserverWrapper was observing the wrong number of elements");
        return;
      }
      entries.forEach((entry) => {
        setIntersectionObserverEntry(entry);
      });
    });
    unobserveRef.current = observer.unobserve.bind(observer, el);
    observer.observe(el);
  }, []);
  return [setRef, intersectionObserverEntry];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useIntersectionObserver
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlSW50ZXJzZWN0aW9uT2JzZXJ2ZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5cbi8qKlxuICogQSBsaWdodCBob29rIHdyYXBwZXIgYXJvdW5kIGBJbnRlcnNlY3Rpb25PYnNlcnZlcmAuXG4gKlxuICogRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiAgICAgZnVuY3Rpb24gTXlDb21wb25lbnQoKSB7XG4gKiAgICAgICBjb25zdCBbaW50ZXJzZWN0aW9uUmVmLCBpbnRlcnNlY3Rpb25FbnRyeV0gPSB1c2VJbnRlcnNlY3Rpb25PYnNlcnZlcigpO1xuICogICAgICAgY29uc3QgaXNWaXNpYmxlID0gaW50ZXJzZWN0aW9uRW50cnlcbiAqICAgICAgICAgPyBpbnRlcnNlY3Rpb25FbnRyeS5pc0ludGVyc2VjdGluZ1xuICogICAgICAgICA6IHRydWU7XG4gKlxuICogICAgICAgcmV0dXJuIChcbiAqICAgICAgICAgPGRpdiByZWY9e2ludGVyc2VjdGlvblJlZn0+XG4gKiAgICAgICAgICAgSSBhbSB7aXNWaXNpYmxlID8gJ29uIHRoZSBzY3JlZW4nIDogJ2ludmlzaWJsZSd9XG4gKiAgICAgICAgIDwvZGl2PlxuICogICAgICAgKTtcbiAqICAgIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUludGVyc2VjdGlvbk9ic2VydmVyKCk6IFtcbiAgKGVsPzogRWxlbWVudCB8IG51bGwpID0+IHZvaWQsXG4gIEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkgfCBudWxsXG5dIHtcbiAgY29uc3QgW2ludGVyc2VjdGlvbk9ic2VydmVyRW50cnksIHNldEludGVyc2VjdGlvbk9ic2VydmVyRW50cnldID1cbiAgICB1c2VTdGF0ZTxJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgdW5vYnNlcnZlUmVmID0gdXNlUmVmPCgoKSA9PiB1bmtub3duKSB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IHNldFJlZiA9IHVzZUNhbGxiYWNrKChlbD86IEVsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgaWYgKHVub2JzZXJ2ZVJlZi5jdXJyZW50KSB7XG4gICAgICB1bm9ic2VydmVSZWYuY3VycmVudCgpO1xuICAgICAgdW5vYnNlcnZlUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICghZWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihlbnRyaWVzID0+IHtcbiAgICAgIGlmIChlbnRyaWVzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgJ0ludGVyc2VjdGlvbk9ic2VydmVyV3JhcHBlciB3YXMgb2JzZXJ2aW5nIHRoZSB3cm9uZyBudW1iZXIgb2YgZWxlbWVudHMnXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgIHNldEludGVyc2VjdGlvbk9ic2VydmVyRW50cnkoZW50cnkpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB1bm9ic2VydmVSZWYuY3VycmVudCA9IG9ic2VydmVyLnVub2JzZXJ2ZS5iaW5kKG9ic2VydmVyLCBlbCk7XG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKGVsKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiBbc2V0UmVmLCBpbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5XTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBOEM7QUFDOUMsVUFBcUI7QUFvQmQsbUNBR0w7QUFDQSxRQUFNLENBQUMsMkJBQTJCLGdDQUNoQywyQkFBMkMsSUFBSTtBQUVqRCxRQUFNLGVBQWUseUJBQStCLElBQUk7QUFFeEQsUUFBTSxTQUFTLDhCQUFZLENBQUMsT0FBd0I7QUFDbEQsUUFBSSxhQUFhLFNBQVM7QUFDeEIsbUJBQWEsUUFBUTtBQUNyQixtQkFBYSxVQUFVO0FBQUEsSUFDekI7QUFFQSxRQUFJLENBQUMsSUFBSTtBQUNQO0FBQUEsSUFDRjtBQUVBLFVBQU0sV0FBVyxJQUFJLHFCQUFxQixhQUFXO0FBQ25ELFVBQUksUUFBUSxXQUFXLEdBQUc7QUFDeEIsWUFBSSxNQUNGLHdFQUNGO0FBQ0E7QUFBQSxNQUNGO0FBQ0EsY0FBUSxRQUFRLFdBQVM7QUFDdkIscUNBQTZCLEtBQUs7QUFBQSxNQUNwQyxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsaUJBQWEsVUFBVSxTQUFTLFVBQVUsS0FBSyxVQUFVLEVBQUU7QUFFM0QsYUFBUyxRQUFRLEVBQUU7QUFBQSxFQUNyQixHQUFHLENBQUMsQ0FBQztBQUVMLFNBQU8sQ0FBQyxRQUFRLHlCQUF5QjtBQUMzQztBQXJDZ0IiLAogICJuYW1lcyI6IFtdCn0K
