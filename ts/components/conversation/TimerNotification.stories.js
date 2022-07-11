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
var TimerNotification_stories_exports = {};
__export(TimerNotification_stories_exports, {
  SetByOther: () => SetByOther,
  SetByOtherWithALongName: () => SetByOtherWithALongName,
  SetBySync: () => SetBySync,
  SetByYou: () => SetByYou,
  default: () => TimerNotification_stories_default
});
module.exports = __toCommonJS(TimerNotification_stories_exports);
var React = __toESM(require("react"));
var moment = __toESM(require("moment"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_TimerNotification = require("./TimerNotification");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var TimerNotification_stories_default = {
  title: "Components/Conversation/TimerNotification"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  type: (0, import_addon_knobs.select)("type", {
    fromOther: "fromOther",
    fromMe: "fromMe",
    fromSync: "fromSync"
  }, overrideProps.type || "fromOther"),
  title: (0, import_addon_knobs.text)("title", overrideProps.title || ""),
  ...(0, import_addon_knobs.boolean)("disabled", overrideProps.disabled || false) ? {
    disabled: true
  } : {
    disabled: false,
    expireTimer: (0, import_addon_knobs.number)("expireTimer", ("expireTimer" in overrideProps ? overrideProps.expireTimer : 0) || 0)
  }
}), "createProps");
const SetByOther = /* @__PURE__ */ __name(() => {
  const props = createProps({
    expireTimer: moment.duration(1, "hour").asSeconds(),
    type: "fromOther",
    title: "Mr. Fire"
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_TimerNotification.TimerNotification, {
    ...props
  }), /* @__PURE__ */ React.createElement("div", {
    style: { padding: "1em" }
  }), /* @__PURE__ */ React.createElement(import_TimerNotification.TimerNotification, {
    ...props,
    disabled: true
  }));
}, "SetByOther");
const SetByOtherWithALongName = /* @__PURE__ */ __name(() => {
  const longName = "\u{1F9B4}\u{1F9E9}\u{1F4F4}".repeat(50);
  const props = createProps({
    expireTimer: moment.duration(1, "hour").asSeconds(),
    type: "fromOther",
    title: longName
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_TimerNotification.TimerNotification, {
    ...props
  }), /* @__PURE__ */ React.createElement("div", {
    style: { padding: "1em" }
  }), /* @__PURE__ */ React.createElement(import_TimerNotification.TimerNotification, {
    ...props,
    disabled: true
  }));
}, "SetByOtherWithALongName");
SetByOtherWithALongName.story = {
  name: "Set By Other (with a long name)"
};
const SetByYou = /* @__PURE__ */ __name(() => {
  const props = createProps({
    expireTimer: moment.duration(1, "hour").asSeconds(),
    type: "fromMe",
    title: "Mr. Fire"
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_TimerNotification.TimerNotification, {
    ...props
  }), /* @__PURE__ */ React.createElement("div", {
    style: { padding: "1em" }
  }), /* @__PURE__ */ React.createElement(import_TimerNotification.TimerNotification, {
    ...props,
    disabled: true
  }));
}, "SetByYou");
const SetBySync = /* @__PURE__ */ __name(() => {
  const props = createProps({
    expireTimer: moment.duration(1, "hour").asSeconds(),
    type: "fromSync",
    title: "Mr. Fire"
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_TimerNotification.TimerNotification, {
    ...props
  }), /* @__PURE__ */ React.createElement("div", {
    style: { padding: "1em" }
  }), /* @__PURE__ */ React.createElement(import_TimerNotification.TimerNotification, {
    ...props,
    disabled: true
  }));
}, "SetBySync");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SetByOther,
  SetByOtherWithALongName,
  SetBySync,
  SetByYou
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGltZXJOb3RpZmljYXRpb24uc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IGJvb2xlYW4sIG51bWJlciwgc2VsZWN0LCB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vVGltZXJOb3RpZmljYXRpb24nO1xuaW1wb3J0IHsgVGltZXJOb3RpZmljYXRpb24gfSBmcm9tICcuL1RpbWVyTm90aWZpY2F0aW9uJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL1RpbWVyTm90aWZpY2F0aW9uJyxcbn07XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHM+ID0ge30pOiBQcm9wcyA9PiAoe1xuICBpMThuLFxuICB0eXBlOiBzZWxlY3QoXG4gICAgJ3R5cGUnLFxuICAgIHtcbiAgICAgIGZyb21PdGhlcjogJ2Zyb21PdGhlcicsXG4gICAgICBmcm9tTWU6ICdmcm9tTWUnLFxuICAgICAgZnJvbVN5bmM6ICdmcm9tU3luYycsXG4gICAgfSxcbiAgICBvdmVycmlkZVByb3BzLnR5cGUgfHwgJ2Zyb21PdGhlcidcbiAgKSxcbiAgdGl0bGU6IHRleHQoJ3RpdGxlJywgb3ZlcnJpZGVQcm9wcy50aXRsZSB8fCAnJyksXG4gIC4uLihib29sZWFuKCdkaXNhYmxlZCcsIG92ZXJyaWRlUHJvcHMuZGlzYWJsZWQgfHwgZmFsc2UpXG4gICAgPyB7XG4gICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgfVxuICAgIDoge1xuICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgIGV4cGlyZVRpbWVyOiBudW1iZXIoXG4gICAgICAgICAgJ2V4cGlyZVRpbWVyJyxcbiAgICAgICAgICAoJ2V4cGlyZVRpbWVyJyBpbiBvdmVycmlkZVByb3BzID8gb3ZlcnJpZGVQcm9wcy5leHBpcmVUaW1lciA6IDApIHx8IDBcbiAgICAgICAgKSxcbiAgICAgIH0pLFxufSk7XG5cbmV4cG9ydCBjb25zdCBTZXRCeU90aGVyID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgZXhwaXJlVGltZXI6IG1vbWVudC5kdXJhdGlvbigxLCAnaG91cicpLmFzU2Vjb25kcygpLFxuICAgIHR5cGU6ICdmcm9tT3RoZXInLFxuICAgIHRpdGxlOiAnTXIuIEZpcmUnLFxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8VGltZXJOb3RpZmljYXRpb24gey4uLnByb3BzfSAvPlxuICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMWVtJyB9fSAvPlxuICAgICAgPFRpbWVyTm90aWZpY2F0aW9uIHsuLi5wcm9wc30gZGlzYWJsZWQgLz5cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBTZXRCeU90aGVyV2l0aEFMb25nTmFtZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGxvbmdOYW1lID0gJ1x1RDgzRVx1RERCNFx1RDgzRVx1RERFOVx1RDgzRFx1RENGNCcucmVwZWF0KDUwKTtcblxuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBleHBpcmVUaW1lcjogbW9tZW50LmR1cmF0aW9uKDEsICdob3VyJykuYXNTZWNvbmRzKCksXG4gICAgdHlwZTogJ2Zyb21PdGhlcicsXG4gICAgdGl0bGU6IGxvbmdOYW1lLFxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8VGltZXJOb3RpZmljYXRpb24gey4uLnByb3BzfSAvPlxuICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMWVtJyB9fSAvPlxuICAgICAgPFRpbWVyTm90aWZpY2F0aW9uIHsuLi5wcm9wc30gZGlzYWJsZWQgLz5cbiAgICA8Lz5cbiAgKTtcbn07XG5cblNldEJ5T3RoZXJXaXRoQUxvbmdOYW1lLnN0b3J5ID0ge1xuICBuYW1lOiAnU2V0IEJ5IE90aGVyICh3aXRoIGEgbG9uZyBuYW1lKScsXG59O1xuXG5leHBvcnQgY29uc3QgU2V0QnlZb3UgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBleHBpcmVUaW1lcjogbW9tZW50LmR1cmF0aW9uKDEsICdob3VyJykuYXNTZWNvbmRzKCksXG4gICAgdHlwZTogJ2Zyb21NZScsXG4gICAgdGl0bGU6ICdNci4gRmlyZScsXG4gIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxUaW1lck5vdGlmaWNhdGlvbiB7Li4ucHJvcHN9IC8+XG4gICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxZW0nIH19IC8+XG4gICAgICA8VGltZXJOb3RpZmljYXRpb24gey4uLnByb3BzfSBkaXNhYmxlZCAvPlxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IFNldEJ5U3luYyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGV4cGlyZVRpbWVyOiBtb21lbnQuZHVyYXRpb24oMSwgJ2hvdXInKS5hc1NlY29uZHMoKSxcbiAgICB0eXBlOiAnZnJvbVN5bmMnLFxuICAgIHRpdGxlOiAnTXIuIEZpcmUnLFxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8VGltZXJOb3RpZmljYXRpb24gey4uLnByb3BzfSAvPlxuICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMWVtJyB9fSAvPlxuICAgICAgPFRpbWVyTm90aWZpY2F0aW9uIHsuLi5wcm9wc30gZGlzYWJsZWQgLz5cbiAgICA8Lz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QixhQUF3QjtBQUN4Qix5QkFBOEM7QUFFOUMsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QiwrQkFBa0M7QUFFbEMsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTyxvQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxjQUFjLHdCQUFDLGdCQUFnQyxDQUFDLE1BQWM7QUFBQSxFQUNsRTtBQUFBLEVBQ0EsTUFBTSwrQkFDSixRQUNBO0FBQUEsSUFDRSxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsRUFDWixHQUNBLGNBQWMsUUFBUSxXQUN4QjtBQUFBLEVBQ0EsT0FBTyw2QkFBSyxTQUFTLGNBQWMsU0FBUyxFQUFFO0FBQUEsS0FDMUMsZ0NBQVEsWUFBWSxjQUFjLFlBQVksS0FBSyxJQUNuRDtBQUFBLElBQ0UsVUFBVTtBQUFBLEVBQ1osSUFDQTtBQUFBLElBQ0UsVUFBVTtBQUFBLElBQ1YsYUFBYSwrQkFDWCxlQUNDLGtCQUFpQixnQkFBZ0IsY0FBYyxjQUFjLE1BQU0sQ0FDdEU7QUFBQSxFQUNGO0FBQ04sSUF2Qm9CO0FBeUJiLE1BQU0sYUFBYSw2QkFBbUI7QUFDM0MsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixhQUFhLE9BQU8sU0FBUyxHQUFHLE1BQU0sRUFBRSxVQUFVO0FBQUEsSUFDbEQsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUVELFNBQ0UsMERBQ0Usb0NBQUM7QUFBQSxPQUFzQjtBQUFBLEdBQU8sR0FDOUIsb0NBQUM7QUFBQSxJQUFJLE9BQU8sRUFBRSxTQUFTLE1BQU07QUFBQSxHQUFHLEdBQ2hDLG9DQUFDO0FBQUEsT0FBc0I7QUFBQSxJQUFPLFVBQVE7QUFBQSxHQUFDLENBQ3pDO0FBRUosR0FkMEI7QUFnQm5CLE1BQU0sMEJBQTBCLDZCQUFtQjtBQUN4RCxRQUFNLFdBQVcsOEJBQVMsT0FBTyxFQUFFO0FBRW5DLFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsYUFBYSxPQUFPLFNBQVMsR0FBRyxNQUFNLEVBQUUsVUFBVTtBQUFBLElBQ2xELE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxFQUNULENBQUM7QUFFRCxTQUNFLDBEQUNFLG9DQUFDO0FBQUEsT0FBc0I7QUFBQSxHQUFPLEdBQzlCLG9DQUFDO0FBQUEsSUFBSSxPQUFPLEVBQUUsU0FBUyxNQUFNO0FBQUEsR0FBRyxHQUNoQyxvQ0FBQztBQUFBLE9BQXNCO0FBQUEsSUFBTyxVQUFRO0FBQUEsR0FBQyxDQUN6QztBQUVKLEdBaEJ1QztBQWtCdkMsd0JBQXdCLFFBQVE7QUFBQSxFQUM5QixNQUFNO0FBQ1I7QUFFTyxNQUFNLFdBQVcsNkJBQW1CO0FBQ3pDLFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsYUFBYSxPQUFPLFNBQVMsR0FBRyxNQUFNLEVBQUUsVUFBVTtBQUFBLElBQ2xELE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxFQUNULENBQUM7QUFFRCxTQUNFLDBEQUNFLG9DQUFDO0FBQUEsT0FBc0I7QUFBQSxHQUFPLEdBQzlCLG9DQUFDO0FBQUEsSUFBSSxPQUFPLEVBQUUsU0FBUyxNQUFNO0FBQUEsR0FBRyxHQUNoQyxvQ0FBQztBQUFBLE9BQXNCO0FBQUEsSUFBTyxVQUFRO0FBQUEsR0FBQyxDQUN6QztBQUVKLEdBZHdCO0FBZ0JqQixNQUFNLFlBQVksNkJBQW1CO0FBQzFDLFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsYUFBYSxPQUFPLFNBQVMsR0FBRyxNQUFNLEVBQUUsVUFBVTtBQUFBLElBQ2xELE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxFQUNULENBQUM7QUFFRCxTQUNFLDBEQUNFLG9DQUFDO0FBQUEsT0FBc0I7QUFBQSxHQUFPLEdBQzlCLG9DQUFDO0FBQUEsSUFBSSxPQUFPLEVBQUUsU0FBUyxNQUFNO0FBQUEsR0FBRyxHQUNoQyxvQ0FBQztBQUFBLE9BQXNCO0FBQUEsSUFBTyxVQUFRO0FBQUEsR0FBQyxDQUN6QztBQUVKLEdBZHlCOyIsCiAgIm5hbWVzIjogW10KfQo=
