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
var DisappearingTimerSelect_exports = {};
__export(DisappearingTimerSelect_exports, {
  DisappearingTimerSelect: () => DisappearingTimerSelect
});
module.exports = __toCommonJS(DisappearingTimerSelect_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var expirationTimer = __toESM(require("../util/expirationTimer"));
var import_DisappearingTimeDialog = require("./DisappearingTimeDialog");
var import_Select = require("./Select");
const CSS_MODULE = "module-disappearing-timer-select";
const DisappearingTimerSelect = /* @__PURE__ */ __name((props) => {
  const { i18n, value = 0, onChange } = props;
  const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
  let expirationTimerOptions = expirationTimer.DEFAULT_DURATIONS_IN_SECONDS.map((seconds) => {
    const text = expirationTimer.format(i18n, seconds, {
      capitalizeOff: true
    });
    return {
      value: seconds,
      text
    };
  });
  const isCustomTimeSelected = !expirationTimer.DEFAULT_DURATIONS_SET.has(value);
  const onSelectChange = /* @__PURE__ */ __name((newValue) => {
    const intValue = parseInt(newValue, 10);
    if (intValue === -1) {
      setIsModalOpen(true);
    } else {
      onChange(intValue);
    }
  }, "onSelectChange");
  expirationTimerOptions = [
    ...expirationTimerOptions,
    {
      value: -1,
      text: i18n(isCustomTimeSelected ? "selectedCustomDisappearingTimeOption" : "customDisappearingTimeOption")
    }
  ];
  let modalNode = null;
  if (isModalOpen) {
    modalNode = /* @__PURE__ */ import_react.default.createElement(import_DisappearingTimeDialog.DisappearingTimeDialog, {
      i18n,
      initialValue: value,
      onSubmit: (newValue) => {
        setIsModalOpen(false);
        onChange(newValue);
      },
      onClose: () => setIsModalOpen(false)
    });
  }
  let info;
  if (isCustomTimeSelected) {
    info = /* @__PURE__ */ import_react.default.createElement("div", {
      className: `${CSS_MODULE}__info`
    }, expirationTimer.format(i18n, value));
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(CSS_MODULE, isCustomTimeSelected ? `${CSS_MODULE}--custom-time` : false)
  }, /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
    onChange: onSelectChange,
    value: isCustomTimeSelected ? -1 : value,
    options: expirationTimerOptions
  }), info, modalNode);
}, "DisappearingTimerSelect");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DisappearingTimerSelect
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGlzYXBwZWFyaW5nVGltZXJTZWxlY3QudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0ICogYXMgZXhwaXJhdGlvblRpbWVyIGZyb20gJy4uL3V0aWwvZXhwaXJhdGlvblRpbWVyJztcbmltcG9ydCB7IERpc2FwcGVhcmluZ1RpbWVEaWFsb2cgfSBmcm9tICcuL0Rpc2FwcGVhcmluZ1RpbWVEaWFsb2cnO1xuXG5pbXBvcnQgeyBTZWxlY3QgfSBmcm9tICcuL1NlbGVjdCc7XG5cbmNvbnN0IENTU19NT0RVTEUgPSAnbW9kdWxlLWRpc2FwcGVhcmluZy10aW1lci1zZWxlY3QnO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcblxuICB2YWx1ZT86IG51bWJlcjtcbiAgb25DaGFuZ2UodmFsdWU6IG51bWJlcik6IHZvaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgRGlzYXBwZWFyaW5nVGltZXJTZWxlY3Q6IFJlYWN0LkZDPFByb3BzPiA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgY29uc3QgeyBpMThuLCB2YWx1ZSA9IDAsIG9uQ2hhbmdlIH0gPSBwcm9wcztcblxuICBjb25zdCBbaXNNb2RhbE9wZW4sIHNldElzTW9kYWxPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBsZXQgZXhwaXJhdGlvblRpbWVyT3B0aW9uczogUmVhZG9ubHlBcnJheTx7XG4gICAgcmVhZG9ubHkgdmFsdWU6IG51bWJlcjtcbiAgICByZWFkb25seSB0ZXh0OiBzdHJpbmc7XG4gIH0+ID0gZXhwaXJhdGlvblRpbWVyLkRFRkFVTFRfRFVSQVRJT05TX0lOX1NFQ09ORFMubWFwKHNlY29uZHMgPT4ge1xuICAgIGNvbnN0IHRleHQgPSBleHBpcmF0aW9uVGltZXIuZm9ybWF0KGkxOG4sIHNlY29uZHMsIHtcbiAgICAgIGNhcGl0YWxpemVPZmY6IHRydWUsXG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiBzZWNvbmRzLFxuICAgICAgdGV4dCxcbiAgICB9O1xuICB9KTtcblxuICBjb25zdCBpc0N1c3RvbVRpbWVTZWxlY3RlZCA9XG4gICAgIWV4cGlyYXRpb25UaW1lci5ERUZBVUxUX0RVUkFUSU9OU19TRVQuaGFzKHZhbHVlKTtcblxuICBjb25zdCBvblNlbGVjdENoYW5nZSA9IChuZXdWYWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgaW50VmFsdWUgPSBwYXJzZUludChuZXdWYWx1ZSwgMTApO1xuICAgIGlmIChpbnRWYWx1ZSA9PT0gLTEpIHtcbiAgICAgIHNldElzTW9kYWxPcGVuKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvbkNoYW5nZShpbnRWYWx1ZSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIEN1c3RvbSB0aW1lLi4uXG4gIGV4cGlyYXRpb25UaW1lck9wdGlvbnMgPSBbXG4gICAgLi4uZXhwaXJhdGlvblRpbWVyT3B0aW9ucyxcbiAgICB7XG4gICAgICB2YWx1ZTogLTEsXG4gICAgICB0ZXh0OiBpMThuKFxuICAgICAgICBpc0N1c3RvbVRpbWVTZWxlY3RlZFxuICAgICAgICAgID8gJ3NlbGVjdGVkQ3VzdG9tRGlzYXBwZWFyaW5nVGltZU9wdGlvbidcbiAgICAgICAgICA6ICdjdXN0b21EaXNhcHBlYXJpbmdUaW1lT3B0aW9uJ1xuICAgICAgKSxcbiAgICB9LFxuICBdO1xuXG4gIGxldCBtb2RhbE5vZGU6IFJlYWN0Tm9kZSA9IG51bGw7XG4gIGlmIChpc01vZGFsT3Blbikge1xuICAgIG1vZGFsTm9kZSA9IChcbiAgICAgIDxEaXNhcHBlYXJpbmdUaW1lRGlhbG9nXG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIGluaXRpYWxWYWx1ZT17dmFsdWV9XG4gICAgICAgIG9uU3VibWl0PXtuZXdWYWx1ZSA9PiB7XG4gICAgICAgICAgc2V0SXNNb2RhbE9wZW4oZmFsc2UpO1xuICAgICAgICAgIG9uQ2hhbmdlKG5ld1ZhbHVlKTtcbiAgICAgICAgfX1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNNb2RhbE9wZW4oZmFsc2UpfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgbGV0IGluZm86IFJlYWN0Tm9kZTtcbiAgaWYgKGlzQ3VzdG9tVGltZVNlbGVjdGVkKSB7XG4gICAgaW5mbyA9IChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtDU1NfTU9EVUxFfV9faW5mb2B9PlxuICAgICAgICB7ZXhwaXJhdGlvblRpbWVyLmZvcm1hdChpMThuLCB2YWx1ZSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgIENTU19NT0RVTEUsXG4gICAgICAgIGlzQ3VzdG9tVGltZVNlbGVjdGVkID8gYCR7Q1NTX01PRFVMRX0tLWN1c3RvbS10aW1lYCA6IGZhbHNlXG4gICAgICApfVxuICAgID5cbiAgICAgIDxTZWxlY3RcbiAgICAgICAgb25DaGFuZ2U9e29uU2VsZWN0Q2hhbmdlfVxuICAgICAgICB2YWx1ZT17aXNDdXN0b21UaW1lU2VsZWN0ZWQgPyAtMSA6IHZhbHVlfVxuICAgICAgICBvcHRpb25zPXtleHBpcmF0aW9uVGltZXJPcHRpb25zfVxuICAgICAgLz5cbiAgICAgIHtpbmZvfVxuICAgICAge21vZGFsTm9kZX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWdDO0FBQ2hDLHdCQUF1QjtBQUd2QixzQkFBaUM7QUFDakMsb0NBQXVDO0FBRXZDLG9CQUF1QjtBQUV2QixNQUFNLGFBQWE7QUFTWixNQUFNLDBCQUEyQyx3QkFBQyxVQUFpQjtBQUN4RSxRQUFNLEVBQUUsTUFBTSxRQUFRLEdBQUcsYUFBYTtBQUV0QyxRQUFNLENBQUMsYUFBYSxrQkFBa0IsMkJBQVMsS0FBSztBQUVwRCxNQUFJLHlCQUdDLGdCQUFnQiw2QkFBNkIsSUFBSSxhQUFXO0FBQy9ELFVBQU0sT0FBTyxnQkFBZ0IsT0FBTyxNQUFNLFNBQVM7QUFBQSxNQUNqRCxlQUFlO0FBQUEsSUFDakIsQ0FBQztBQUNELFdBQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sdUJBQ0osQ0FBQyxnQkFBZ0Isc0JBQXNCLElBQUksS0FBSztBQUVsRCxRQUFNLGlCQUFpQix3QkFBQyxhQUFxQjtBQUMzQyxVQUFNLFdBQVcsU0FBUyxVQUFVLEVBQUU7QUFDdEMsUUFBSSxhQUFhLElBQUk7QUFDbkIscUJBQWUsSUFBSTtBQUFBLElBQ3JCLE9BQU87QUFDTCxlQUFTLFFBQVE7QUFBQSxJQUNuQjtBQUFBLEVBQ0YsR0FQdUI7QUFVdkIsMkJBQXlCO0FBQUEsSUFDdkIsR0FBRztBQUFBLElBQ0g7QUFBQSxNQUNFLE9BQU87QUFBQSxNQUNQLE1BQU0sS0FDSix1QkFDSSx5Q0FDQSw4QkFDTjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsTUFBSSxZQUF1QjtBQUMzQixNQUFJLGFBQWE7QUFDZixnQkFDRSxtREFBQztBQUFBLE1BQ0M7QUFBQSxNQUNBLGNBQWM7QUFBQSxNQUNkLFVBQVUsY0FBWTtBQUNwQix1QkFBZSxLQUFLO0FBQ3BCLGlCQUFTLFFBQVE7QUFBQSxNQUNuQjtBQUFBLE1BQ0EsU0FBUyxNQUFNLGVBQWUsS0FBSztBQUFBLEtBQ3JDO0FBQUEsRUFFSjtBQUVBLE1BQUk7QUFDSixNQUFJLHNCQUFzQjtBQUN4QixXQUNFLG1EQUFDO0FBQUEsTUFBSSxXQUFXLEdBQUc7QUFBQSxPQUNoQixnQkFBZ0IsT0FBTyxNQUFNLEtBQUssQ0FDckM7QUFBQSxFQUVKO0FBRUEsU0FDRSxtREFBQztBQUFBLElBQ0MsV0FBVywrQkFDVCxZQUNBLHVCQUF1QixHQUFHLDRCQUE0QixLQUN4RDtBQUFBLEtBRUEsbURBQUM7QUFBQSxJQUNDLFVBQVU7QUFBQSxJQUNWLE9BQU8sdUJBQXVCLEtBQUs7QUFBQSxJQUNuQyxTQUFTO0FBQUEsR0FDWCxHQUNDLE1BQ0EsU0FDSDtBQUVKLEdBbkZ3RDsiLAogICJuYW1lcyI6IFtdCn0K
