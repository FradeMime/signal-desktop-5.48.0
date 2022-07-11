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
var Zone_exports = {};
__export(Zone_exports, {
  Zone: () => Zone
});
module.exports = __toCommonJS(Zone_exports);
class Zone {
  constructor(name, options = {}) {
    this.name = name;
    this.options = options;
  }
  supportsPendingSenderKeys() {
    return this.options.pendingSenderKeys === true;
  }
  supportsPendingSessions() {
    return this.options.pendingSessions === true;
  }
  supportsPendingUnprocessed() {
    return this.options.pendingUnprocessed === true;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Zone
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiWm9uZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5leHBvcnQgdHlwZSBab25lT3B0aW9ucyA9IHtcbiAgcmVhZG9ubHkgcGVuZGluZ1NlbmRlcktleXM/OiBib29sZWFuO1xuICByZWFkb25seSBwZW5kaW5nU2Vzc2lvbnM/OiBib29sZWFuO1xuICByZWFkb25seSBwZW5kaW5nVW5wcm9jZXNzZWQ/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IGNsYXNzIFpvbmUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZTogc3RyaW5nLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgb3B0aW9uczogWm9uZU9wdGlvbnMgPSB7fVxuICApIHt9XG5cbiAgcHVibGljIHN1cHBvcnRzUGVuZGluZ1NlbmRlcktleXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5wZW5kaW5nU2VuZGVyS2V5cyA9PT0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzdXBwb3J0c1BlbmRpbmdTZXNzaW9ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnBlbmRpbmdTZXNzaW9ucyA9PT0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzdXBwb3J0c1BlbmRpbmdVbnByb2Nlc3NlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnBlbmRpbmdVbnByb2Nlc3NlZCA9PT0gdHJ1ZTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNPLE1BQU0sS0FBSztBQUFBLEVBQ2hCLFlBQ2tCLE1BQ0MsVUFBdUIsQ0FBQyxHQUN6QztBQUZnQjtBQUNDO0FBQUEsRUFDaEI7QUFBQSxFQUVJLDRCQUFxQztBQUMxQyxXQUFPLEtBQUssUUFBUSxzQkFBc0I7QUFBQSxFQUM1QztBQUFBLEVBRU8sMEJBQW1DO0FBQ3hDLFdBQU8sS0FBSyxRQUFRLG9CQUFvQjtBQUFBLEVBQzFDO0FBQUEsRUFFTyw2QkFBc0M7QUFDM0MsV0FBTyxLQUFLLFFBQVEsdUJBQXVCO0FBQUEsRUFDN0M7QUFDRjtBQWpCTyIsCiAgIm5hbWVzIjogW10KfQo=
