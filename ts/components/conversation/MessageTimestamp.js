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
var MessageTimestamp_exports = {};
__export(MessageTimestamp_exports, {
  MessageTimestamp: () => MessageTimestamp
});
module.exports = __toCommonJS(MessageTimestamp_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_timestamp = require("../../util/timestamp");
var import_Time = require("../Time");
var import_useNowThatUpdatesEveryMinute = require("../../hooks/useNowThatUpdatesEveryMinute");
function MessageTimestamp({
  deletedForEveryone,
  direction,
  i18n,
  isRelativeTime,
  module: module2,
  timestamp,
  withImageNoCaption,
  withSticker,
  withTapToViewExpired
}) {
  const now = (0, import_useNowThatUpdatesEveryMinute.useNowThatUpdatesEveryMinute)();
  const moduleName = module2 || "module-timestamp";
  return /* @__PURE__ */ import_react.default.createElement(import_Time.Time, {
    className: (0, import_classnames.default)(moduleName, direction ? `${moduleName}--${direction}` : null, withTapToViewExpired && direction ? `${moduleName}--${direction}-with-tap-to-view-expired` : null, withImageNoCaption ? `${moduleName}--with-image-no-caption` : null, withSticker ? `${moduleName}--with-sticker` : null, deletedForEveryone ? `${moduleName}--deleted-for-everyone` : null),
    timestamp
  }, (0, import_timestamp.formatTime)(i18n, timestamp, now, isRelativeTime));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessageTimestamp
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZVRpbWVzdGFtcC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IHsgZm9ybWF0VGltZSB9IGZyb20gJy4uLy4uL3V0aWwvdGltZXN0YW1wJztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBUaW1lIH0gZnJvbSAnLi4vVGltZSc7XG5pbXBvcnQgeyB1c2VOb3dUaGF0VXBkYXRlc0V2ZXJ5TWludXRlIH0gZnJvbSAnLi4vLi4vaG9va3MvdXNlTm93VGhhdFVwZGF0ZXNFdmVyeU1pbnV0ZSc7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBkZWxldGVkRm9yRXZlcnlvbmU/OiBib29sZWFuO1xuICBkaXJlY3Rpb24/OiAnaW5jb21pbmcnIHwgJ291dGdvaW5nJztcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNSZWxhdGl2ZVRpbWU/OiBib29sZWFuO1xuICBtb2R1bGU/OiBzdHJpbmc7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xuICB3aXRoSW1hZ2VOb0NhcHRpb24/OiBib29sZWFuO1xuICB3aXRoU3RpY2tlcj86IGJvb2xlYW47XG4gIHdpdGhUYXBUb1ZpZXdFeHBpcmVkPzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBNZXNzYWdlVGltZXN0YW1wKHtcbiAgZGVsZXRlZEZvckV2ZXJ5b25lLFxuICBkaXJlY3Rpb24sXG4gIGkxOG4sXG4gIGlzUmVsYXRpdmVUaW1lLFxuICBtb2R1bGUsXG4gIHRpbWVzdGFtcCxcbiAgd2l0aEltYWdlTm9DYXB0aW9uLFxuICB3aXRoU3RpY2tlcixcbiAgd2l0aFRhcFRvVmlld0V4cGlyZWQsXG59OiBSZWFkb25seTxQcm9wcz4pOiBSZWFjdEVsZW1lbnQge1xuICBjb25zdCBub3cgPSB1c2VOb3dUaGF0VXBkYXRlc0V2ZXJ5TWludXRlKCk7XG4gIGNvbnN0IG1vZHVsZU5hbWUgPSBtb2R1bGUgfHwgJ21vZHVsZS10aW1lc3RhbXAnO1xuXG4gIHJldHVybiAoXG4gICAgPFRpbWVcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgbW9kdWxlTmFtZSxcbiAgICAgICAgZGlyZWN0aW9uID8gYCR7bW9kdWxlTmFtZX0tLSR7ZGlyZWN0aW9ufWAgOiBudWxsLFxuICAgICAgICB3aXRoVGFwVG9WaWV3RXhwaXJlZCAmJiBkaXJlY3Rpb25cbiAgICAgICAgICA/IGAke21vZHVsZU5hbWV9LS0ke2RpcmVjdGlvbn0td2l0aC10YXAtdG8tdmlldy1leHBpcmVkYFxuICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgd2l0aEltYWdlTm9DYXB0aW9uID8gYCR7bW9kdWxlTmFtZX0tLXdpdGgtaW1hZ2Utbm8tY2FwdGlvbmAgOiBudWxsLFxuICAgICAgICB3aXRoU3RpY2tlciA/IGAke21vZHVsZU5hbWV9LS13aXRoLXN0aWNrZXJgIDogbnVsbCxcbiAgICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lID8gYCR7bW9kdWxlTmFtZX0tLWRlbGV0ZWQtZm9yLWV2ZXJ5b25lYCA6IG51bGxcbiAgICAgICl9XG4gICAgICB0aW1lc3RhbXA9e3RpbWVzdGFtcH1cbiAgICA+XG4gICAgICB7Zm9ybWF0VGltZShpMThuLCB0aW1lc3RhbXAsIG5vdywgaXNSZWxhdGl2ZVRpbWUpfVxuICAgIDwvVGltZT5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFDbEIsd0JBQXVCO0FBRXZCLHVCQUEyQjtBQUczQixrQkFBcUI7QUFDckIsMENBQTZDO0FBY3RDLDBCQUEwQjtBQUFBLEVBQy9CO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUNnQztBQUNoQyxRQUFNLE1BQU0sc0VBQTZCO0FBQ3pDLFFBQU0sYUFBYSxXQUFVO0FBRTdCLFNBQ0UsbURBQUM7QUFBQSxJQUNDLFdBQVcsK0JBQ1QsWUFDQSxZQUFZLEdBQUcsZUFBZSxjQUFjLE1BQzVDLHdCQUF3QixZQUNwQixHQUFHLGVBQWUsdUNBQ2xCLE1BQ0oscUJBQXFCLEdBQUcsc0NBQXNDLE1BQzlELGNBQWMsR0FBRyw2QkFBNkIsTUFDOUMscUJBQXFCLEdBQUcscUNBQXFDLElBQy9EO0FBQUEsSUFDQTtBQUFBLEtBRUMsaUNBQVcsTUFBTSxXQUFXLEtBQUssY0FBYyxDQUNsRDtBQUVKO0FBL0JnQiIsCiAgIm5hbWVzIjogW10KfQo=
