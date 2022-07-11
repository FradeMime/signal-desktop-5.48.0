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
var ExpireTimer_stories_exports = {};
__export(ExpireTimer_stories_exports, {
  ExpirationTooFarOut: () => ExpirationTooFarOut,
  Expired: () => Expired,
  ImageNoCaption: () => ImageNoCaption,
  InProgress: () => InProgress,
  Incoming: () => Incoming,
  Sticker: () => Sticker,
  TapToViewExpired: () => TapToViewExpired,
  _2Minutes: () => _2Minutes,
  _30Seconds: () => _30Seconds,
  default: () => ExpireTimer_stories_default
});
module.exports = __toCommonJS(ExpireTimer_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_ExpireTimer = require("./ExpireTimer");
var ExpireTimer_stories_default = {
  title: "Components/Conversation/ExpireTimer"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  direction: overrideProps.direction || "outgoing",
  expirationLength: (0, import_addon_knobs.number)("expirationLength", overrideProps.expirationLength || 30 * 1e3),
  expirationTimestamp: (0, import_addon_knobs.number)("expirationTimestamp", overrideProps.expirationTimestamp || Date.now() + 30 * 1e3),
  withImageNoCaption: (0, import_addon_knobs.boolean)("withImageNoCaption", overrideProps.withImageNoCaption || false),
  withSticker: (0, import_addon_knobs.boolean)("withSticker", overrideProps.withSticker || false),
  withTapToViewExpired: (0, import_addon_knobs.boolean)("withTapToViewExpired", overrideProps.withTapToViewExpired || false)
}), "createProps");
const _30Seconds = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_ExpireTimer.ExpireTimer, {
    ...props
  });
}, "_30Seconds");
_30Seconds.story = {
  name: "30 seconds"
};
const _2Minutes = /* @__PURE__ */ __name(() => {
  const twoMinutes = 60 * 1e3 * 2;
  const props = createProps({
    expirationTimestamp: Date.now() + twoMinutes,
    expirationLength: twoMinutes
  });
  return /* @__PURE__ */ React.createElement(import_ExpireTimer.ExpireTimer, {
    ...props
  });
}, "_2Minutes");
_2Minutes.story = {
  name: "2 minutes"
};
const InProgress = /* @__PURE__ */ __name(() => {
  const props = createProps({
    expirationTimestamp: Date.now() + 15 * 1e3
  });
  return /* @__PURE__ */ React.createElement(import_ExpireTimer.ExpireTimer, {
    ...props
  });
}, "InProgress");
const Expired = /* @__PURE__ */ __name(() => {
  const props = createProps({
    expirationTimestamp: Date.now() - 30 * 1e3
  });
  return /* @__PURE__ */ React.createElement(import_ExpireTimer.ExpireTimer, {
    ...props
  });
}, "Expired");
const Sticker = /* @__PURE__ */ __name(() => {
  const props = createProps({
    withSticker: true
  });
  return /* @__PURE__ */ React.createElement(import_ExpireTimer.ExpireTimer, {
    ...props
  });
}, "Sticker");
const TapToViewExpired = /* @__PURE__ */ __name(() => {
  const props = createProps({
    withTapToViewExpired: true
  });
  return /* @__PURE__ */ React.createElement(import_ExpireTimer.ExpireTimer, {
    ...props
  });
}, "TapToViewExpired");
const ImageNoCaption = /* @__PURE__ */ __name(() => {
  const props = createProps({
    withImageNoCaption: true
  });
  return /* @__PURE__ */ React.createElement("div", {
    style: { backgroundColor: "darkgreen" }
  }, /* @__PURE__ */ React.createElement(import_ExpireTimer.ExpireTimer, {
    ...props
  }));
}, "ImageNoCaption");
const Incoming = /* @__PURE__ */ __name(() => {
  const props = createProps({
    direction: "incoming"
  });
  return /* @__PURE__ */ React.createElement("div", {
    style: { backgroundColor: "darkgreen" }
  }, /* @__PURE__ */ React.createElement(import_ExpireTimer.ExpireTimer, {
    ...props
  }));
}, "Incoming");
const ExpirationTooFarOut = /* @__PURE__ */ __name(() => {
  const props = createProps({
    expirationTimestamp: Date.now() + 150 * 1e3
  });
  return /* @__PURE__ */ React.createElement(import_ExpireTimer.ExpireTimer, {
    ...props
  });
}, "ExpirationTooFarOut");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExpirationTooFarOut,
  Expired,
  ImageNoCaption,
  InProgress,
  Incoming,
  Sticker,
  TapToViewExpired,
  _2Minutes,
  _30Seconds
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRXhwaXJlVGltZXIuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBib29sZWFuLCBudW1iZXIgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vRXhwaXJlVGltZXInO1xuaW1wb3J0IHsgRXhwaXJlVGltZXIgfSBmcm9tICcuL0V4cGlyZVRpbWVyJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL0V4cGlyZVRpbWVyJyxcbn07XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHM+ID0ge30pOiBQcm9wcyA9PiAoe1xuICBkaXJlY3Rpb246IG92ZXJyaWRlUHJvcHMuZGlyZWN0aW9uIHx8ICdvdXRnb2luZycsXG4gIGV4cGlyYXRpb25MZW5ndGg6IG51bWJlcihcbiAgICAnZXhwaXJhdGlvbkxlbmd0aCcsXG4gICAgb3ZlcnJpZGVQcm9wcy5leHBpcmF0aW9uTGVuZ3RoIHx8IDMwICogMTAwMFxuICApLFxuICBleHBpcmF0aW9uVGltZXN0YW1wOiBudW1iZXIoXG4gICAgJ2V4cGlyYXRpb25UaW1lc3RhbXAnLFxuICAgIG92ZXJyaWRlUHJvcHMuZXhwaXJhdGlvblRpbWVzdGFtcCB8fCBEYXRlLm5vdygpICsgMzAgKiAxMDAwXG4gICksXG4gIHdpdGhJbWFnZU5vQ2FwdGlvbjogYm9vbGVhbihcbiAgICAnd2l0aEltYWdlTm9DYXB0aW9uJyxcbiAgICBvdmVycmlkZVByb3BzLndpdGhJbWFnZU5vQ2FwdGlvbiB8fCBmYWxzZVxuICApLFxuICB3aXRoU3RpY2tlcjogYm9vbGVhbignd2l0aFN0aWNrZXInLCBvdmVycmlkZVByb3BzLndpdGhTdGlja2VyIHx8IGZhbHNlKSxcbiAgd2l0aFRhcFRvVmlld0V4cGlyZWQ6IGJvb2xlYW4oXG4gICAgJ3dpdGhUYXBUb1ZpZXdFeHBpcmVkJyxcbiAgICBvdmVycmlkZVByb3BzLndpdGhUYXBUb1ZpZXdFeHBpcmVkIHx8IGZhbHNlXG4gICksXG59KTtcblxuZXhwb3J0IGNvbnN0IF8zMFNlY29uZHMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKCk7XG5cbiAgcmV0dXJuIDxFeHBpcmVUaW1lciB7Li4ucHJvcHN9IC8+O1xufTtcblxuXzMwU2Vjb25kcy5zdG9yeSA9IHtcbiAgbmFtZTogJzMwIHNlY29uZHMnLFxufTtcblxuZXhwb3J0IGNvbnN0IF8yTWludXRlcyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHR3b01pbnV0ZXMgPSA2MCAqIDEwMDAgKiAyO1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBleHBpcmF0aW9uVGltZXN0YW1wOiBEYXRlLm5vdygpICsgdHdvTWludXRlcyxcbiAgICBleHBpcmF0aW9uTGVuZ3RoOiB0d29NaW51dGVzLFxuICB9KTtcblxuICByZXR1cm4gPEV4cGlyZVRpbWVyIHsuLi5wcm9wc30gLz47XG59O1xuXG5fMk1pbnV0ZXMuc3RvcnkgPSB7XG4gIG5hbWU6ICcyIG1pbnV0ZXMnLFxufTtcblxuZXhwb3J0IGNvbnN0IEluUHJvZ3Jlc3MgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBleHBpcmF0aW9uVGltZXN0YW1wOiBEYXRlLm5vdygpICsgMTUgKiAxMDAwLFxuICB9KTtcblxuICByZXR1cm4gPEV4cGlyZVRpbWVyIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgRXhwaXJlZCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGV4cGlyYXRpb25UaW1lc3RhbXA6IERhdGUubm93KCkgLSAzMCAqIDEwMDAsXG4gIH0pO1xuXG4gIHJldHVybiA8RXhwaXJlVGltZXIgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBTdGlja2VyID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgd2l0aFN0aWNrZXI6IHRydWUsXG4gIH0pO1xuXG4gIHJldHVybiA8RXhwaXJlVGltZXIgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBUYXBUb1ZpZXdFeHBpcmVkID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgd2l0aFRhcFRvVmlld0V4cGlyZWQ6IHRydWUsXG4gIH0pO1xuXG4gIHJldHVybiA8RXhwaXJlVGltZXIgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBJbWFnZU5vQ2FwdGlvbiA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHdpdGhJbWFnZU5vQ2FwdGlvbjogdHJ1ZSxcbiAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogJ2RhcmtncmVlbicgfX0+XG4gICAgICA8RXhwaXJlVGltZXIgey4uLnByb3BzfSAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IEluY29taW5nID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgZGlyZWN0aW9uOiAnaW5jb21pbmcnLFxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiAnZGFya2dyZWVuJyB9fT5cbiAgICAgIDxFeHBpcmVUaW1lciB7Li4ucHJvcHN9IC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgRXhwaXJhdGlvblRvb0Zhck91dCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGV4cGlyYXRpb25UaW1lc3RhbXA6IERhdGUubm93KCkgKyAxNTAgKiAxMDAwLFxuICB9KTtcblxuICByZXR1cm4gPEV4cGlyZVRpbWVyIHsuLi5wcm9wc30gLz47XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLHlCQUFnQztBQUdoQyx5QkFBNEI7QUFFNUIsSUFBTyw4QkFBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxjQUFjLHdCQUFDLGdCQUFnQyxDQUFDLE1BQWM7QUFBQSxFQUNsRSxXQUFXLGNBQWMsYUFBYTtBQUFBLEVBQ3RDLGtCQUFrQiwrQkFDaEIsb0JBQ0EsY0FBYyxvQkFBb0IsS0FBSyxHQUN6QztBQUFBLEVBQ0EscUJBQXFCLCtCQUNuQix1QkFDQSxjQUFjLHVCQUF1QixLQUFLLElBQUksSUFBSSxLQUFLLEdBQ3pEO0FBQUEsRUFDQSxvQkFBb0IsZ0NBQ2xCLHNCQUNBLGNBQWMsc0JBQXNCLEtBQ3RDO0FBQUEsRUFDQSxhQUFhLGdDQUFRLGVBQWUsY0FBYyxlQUFlLEtBQUs7QUFBQSxFQUN0RSxzQkFBc0IsZ0NBQ3BCLHdCQUNBLGNBQWMsd0JBQXdCLEtBQ3hDO0FBQ0YsSUFuQm9CO0FBcUJiLE1BQU0sYUFBYSw2QkFBbUI7QUFDM0MsUUFBTSxRQUFRLFlBQVk7QUFFMUIsU0FBTyxvQ0FBQztBQUFBLE9BQWdCO0FBQUEsR0FBTztBQUNqQyxHQUowQjtBQU0xQixXQUFXLFFBQVE7QUFBQSxFQUNqQixNQUFNO0FBQ1I7QUFFTyxNQUFNLFlBQVksNkJBQW1CO0FBQzFDLFFBQU0sYUFBYSxLQUFLLE1BQU87QUFDL0IsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixxQkFBcUIsS0FBSyxJQUFJLElBQUk7QUFBQSxJQUNsQyxrQkFBa0I7QUFBQSxFQUNwQixDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQWdCO0FBQUEsR0FBTztBQUNqQyxHQVJ5QjtBQVV6QixVQUFVLFFBQVE7QUFBQSxFQUNoQixNQUFNO0FBQ1I7QUFFTyxNQUFNLGFBQWEsNkJBQW1CO0FBQzNDLFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIscUJBQXFCLEtBQUssSUFBSSxJQUFJLEtBQUs7QUFBQSxFQUN6QyxDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQWdCO0FBQUEsR0FBTztBQUNqQyxHQU4wQjtBQVFuQixNQUFNLFVBQVUsNkJBQW1CO0FBQ3hDLFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIscUJBQXFCLEtBQUssSUFBSSxJQUFJLEtBQUs7QUFBQSxFQUN6QyxDQUFDO0FBRUQsU0FBTyxvQ0FBQztBQUFBLE9BQWdCO0FBQUEsR0FBTztBQUNqQyxHQU51QjtBQVFoQixNQUFNLFVBQVUsNkJBQW1CO0FBQ3hDLFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsYUFBYTtBQUFBLEVBQ2YsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFnQjtBQUFBLEdBQU87QUFDakMsR0FOdUI7QUFRaEIsTUFBTSxtQkFBbUIsNkJBQW1CO0FBQ2pELFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsc0JBQXNCO0FBQUEsRUFDeEIsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFnQjtBQUFBLEdBQU87QUFDakMsR0FOZ0M7QUFRekIsTUFBTSxpQkFBaUIsNkJBQW1CO0FBQy9DLFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsb0JBQW9CO0FBQUEsRUFDdEIsQ0FBQztBQUVELFNBQ0Usb0NBQUM7QUFBQSxJQUFJLE9BQU8sRUFBRSxpQkFBaUIsWUFBWTtBQUFBLEtBQ3pDLG9DQUFDO0FBQUEsT0FBZ0I7QUFBQSxHQUFPLENBQzFCO0FBRUosR0FWOEI7QUFZdkIsTUFBTSxXQUFXLDZCQUFtQjtBQUN6QyxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLFdBQVc7QUFBQSxFQUNiLENBQUM7QUFFRCxTQUNFLG9DQUFDO0FBQUEsSUFBSSxPQUFPLEVBQUUsaUJBQWlCLFlBQVk7QUFBQSxLQUN6QyxvQ0FBQztBQUFBLE9BQWdCO0FBQUEsR0FBTyxDQUMxQjtBQUVKLEdBVndCO0FBWWpCLE1BQU0sc0JBQXNCLDZCQUFtQjtBQUNwRCxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLHFCQUFxQixLQUFLLElBQUksSUFBSSxNQUFNO0FBQUEsRUFDMUMsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFnQjtBQUFBLEdBQU87QUFDakMsR0FObUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
