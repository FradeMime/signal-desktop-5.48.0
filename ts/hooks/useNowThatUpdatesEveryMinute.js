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
var useNowThatUpdatesEveryMinute_exports = {};
__export(useNowThatUpdatesEveryMinute_exports, {
  useNowThatUpdatesEveryMinute: () => useNowThatUpdatesEveryMinute
});
module.exports = __toCommonJS(useNowThatUpdatesEveryMinute_exports);
var import_events = require("events");
var import_react = require("react");
var import_durations = require("../util/durations");
const ev = new import_events.EventEmitter();
ev.setMaxListeners(Infinity);
setInterval(() => ev.emit("tick"), import_durations.MINUTE);
function useNowThatUpdatesEveryMinute() {
  const [now, setNow] = (0, import_react.useState)(Date.now());
  (0, import_react.useEffect)(() => {
    const updateNow = /* @__PURE__ */ __name(() => setNow(Date.now()), "updateNow");
    updateNow();
    ev.on("tick", updateNow);
    return () => {
      ev.off("tick", updateNow);
    };
  }, []);
  return now;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useNowThatUpdatesEveryMinute
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlTm93VGhhdFVwZGF0ZXNFdmVyeU1pbnV0ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgTUlOVVRFIH0gZnJvbSAnLi4vdXRpbC9kdXJhdGlvbnMnO1xuXG5jb25zdCBldiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbmV2LnNldE1heExpc3RlbmVycyhJbmZpbml0eSk7XG5zZXRJbnRlcnZhbCgoKSA9PiBldi5lbWl0KCd0aWNrJyksIE1JTlVURSk7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VOb3dUaGF0VXBkYXRlc0V2ZXJ5TWludXRlKCk6IG51bWJlciB7XG4gIGNvbnN0IFtub3csIHNldE5vd10gPSB1c2VTdGF0ZShEYXRlLm5vdygpKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVwZGF0ZU5vdyA9ICgpID0+IHNldE5vdyhEYXRlLm5vdygpKTtcbiAgICB1cGRhdGVOb3coKTtcblxuICAgIGV2Lm9uKCd0aWNrJywgdXBkYXRlTm93KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBldi5vZmYoJ3RpY2snLCB1cGRhdGVOb3cpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICByZXR1cm4gbm93O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUE2QjtBQUM3QixtQkFBb0M7QUFFcEMsdUJBQXVCO0FBRXZCLE1BQU0sS0FBSyxJQUFJLDJCQUFhO0FBQzVCLEdBQUcsZ0JBQWdCLFFBQVE7QUFDM0IsWUFBWSxNQUFNLEdBQUcsS0FBSyxNQUFNLEdBQUcsdUJBQU07QUFFbEMsd0NBQWdEO0FBQ3JELFFBQU0sQ0FBQyxLQUFLLFVBQVUsMkJBQVMsS0FBSyxJQUFJLENBQUM7QUFFekMsOEJBQVUsTUFBTTtBQUNkLFVBQU0sWUFBWSw2QkFBTSxPQUFPLEtBQUssSUFBSSxDQUFDLEdBQXZCO0FBQ2xCLGNBQVU7QUFFVixPQUFHLEdBQUcsUUFBUSxTQUFTO0FBRXZCLFdBQU8sTUFBTTtBQUNYLFNBQUcsSUFBSSxRQUFRLFNBQVM7QUFBQSxJQUMxQjtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxTQUFPO0FBQ1Q7QUFmZ0IiLAogICJuYW1lcyI6IFtdCn0K
