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
var DisappearingTimeDialog_exports = {};
__export(DisappearingTimeDialog_exports, {
  DisappearingTimeDialog: () => DisappearingTimeDialog
});
module.exports = __toCommonJS(DisappearingTimeDialog_exports);
var import_react = __toESM(require("react"));
var import_ConfirmationDialog = require("./ConfirmationDialog");
var import_Select = require("./Select");
const CSS_MODULE = "module-disappearing-time-dialog";
const DEFAULT_VALUE = 60;
const UNITS = ["seconds", "minutes", "hours", "days", "weeks"];
const UNIT_TO_MS = /* @__PURE__ */ new Map([
  ["seconds", 1],
  ["minutes", 60],
  ["hours", 60 * 60],
  ["days", 24 * 60 * 60],
  ["weeks", 7 * 24 * 60 * 60]
]);
const RANGES = /* @__PURE__ */ new Map([
  ["seconds", [1, 60]],
  ["minutes", [1, 60]],
  ["hours", [1, 24]],
  ["days", [1, 7]],
  ["weeks", [1, 5]]
]);
function DisappearingTimeDialog(props) {
  const {
    i18n,
    theme,
    initialValue = DEFAULT_VALUE,
    onSubmit,
    onClose
  } = props;
  let initialUnit = "seconds";
  let initialUnitValue = 1;
  for (const unit2 of UNITS) {
    const ms = UNIT_TO_MS.get(unit2) || 1;
    if (initialValue < ms) {
      break;
    }
    initialUnit = unit2;
    initialUnitValue = Math.floor(initialValue / ms);
  }
  const [unitValue, setUnitValue] = (0, import_react.useState)(initialUnitValue);
  const [unit, setUnit] = (0, import_react.useState)(initialUnit);
  const range = RANGES.get(unit) || [1, 1];
  const values = [];
  for (let i = range[0]; i < range[1]; i += 1) {
    values.push(i);
  }
  return /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    moduleClassName: CSS_MODULE,
    i18n,
    theme,
    onClose,
    title: i18n("DisappearingTimeDialog__title"),
    hasXButton: true,
    actions: [
      {
        text: i18n("DisappearingTimeDialog__set"),
        style: "affirmative",
        action() {
          onSubmit(unitValue * (UNIT_TO_MS.get(unit) || 1));
        }
      }
    ]
  }, /* @__PURE__ */ import_react.default.createElement("p", null, i18n("DisappearingTimeDialog__body")), /* @__PURE__ */ import_react.default.createElement("section", {
    className: `${CSS_MODULE}__time-boxes`
  }, /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
    ariaLabel: i18n("DisappearingTimeDialog__label--value"),
    moduleClassName: `${CSS_MODULE}__time-boxes__value`,
    value: unitValue,
    onChange: (newValue) => setUnitValue(parseInt(newValue, 10)),
    options: values.map((value) => ({ value, text: value.toString() }))
  }), /* @__PURE__ */ import_react.default.createElement(import_Select.Select, {
    ariaLabel: i18n("DisappearingTimeDialog__label--units"),
    moduleClassName: `${CSS_MODULE}__time-boxes__units`,
    value: unit,
    onChange: (newUnit) => {
      setUnit(newUnit);
      const ranges = RANGES.get(newUnit);
      if (!ranges) {
        return;
      }
      const [min, max] = ranges;
      setUnitValue(Math.max(min, Math.min(max - 1, unitValue)));
    },
    options: UNITS.map((unitName) => {
      return {
        value: unitName,
        text: i18n(`DisappearingTimeDialog__${unitName}`)
      };
    })
  })));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DisappearingTimeDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGlzYXBwZWFyaW5nVGltZURpYWxvZy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IENvbmZpcm1hdGlvbkRpYWxvZyB9IGZyb20gJy4vQ29uZmlybWF0aW9uRGlhbG9nJztcbmltcG9ydCB7IFNlbGVjdCB9IGZyb20gJy4vU2VsZWN0JztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBUaGVtZSB9IGZyb20gJy4uL3V0aWwvdGhlbWUnO1xuXG5jb25zdCBDU1NfTU9EVUxFID0gJ21vZHVsZS1kaXNhcHBlYXJpbmctdGltZS1kaWFsb2cnO1xuXG5jb25zdCBERUZBVUxUX1ZBTFVFID0gNjA7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IFJlYWRvbmx5PHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgdGhlbWU/OiBUaGVtZTtcbiAgaW5pdGlhbFZhbHVlPzogbnVtYmVyO1xuICBvblN1Ym1pdDogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQ7XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG59PjtcblxuY29uc3QgVU5JVFMgPSBbJ3NlY29uZHMnLCAnbWludXRlcycsICdob3VycycsICdkYXlzJywgJ3dlZWtzJ107XG5cbmNvbnN0IFVOSVRfVE9fTVMgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPihbXG4gIFsnc2Vjb25kcycsIDFdLFxuICBbJ21pbnV0ZXMnLCA2MF0sXG4gIFsnaG91cnMnLCA2MCAqIDYwXSxcbiAgWydkYXlzJywgMjQgKiA2MCAqIDYwXSxcbiAgWyd3ZWVrcycsIDcgKiAyNCAqIDYwICogNjBdLFxuXSk7XG5cbmNvbnN0IFJBTkdFUyA9IG5ldyBNYXA8c3RyaW5nLCBbbnVtYmVyLCBudW1iZXJdPihbXG4gIFsnc2Vjb25kcycsIFsxLCA2MF1dLFxuICBbJ21pbnV0ZXMnLCBbMSwgNjBdXSxcbiAgWydob3VycycsIFsxLCAyNF1dLFxuICBbJ2RheXMnLCBbMSwgN11dLFxuICBbJ3dlZWtzJywgWzEsIDVdXSxcbl0pO1xuXG5leHBvcnQgZnVuY3Rpb24gRGlzYXBwZWFyaW5nVGltZURpYWxvZyhwcm9wczogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQge1xuICBjb25zdCB7XG4gICAgaTE4bixcbiAgICB0aGVtZSxcbiAgICBpbml0aWFsVmFsdWUgPSBERUZBVUxUX1ZBTFVFLFxuICAgIG9uU3VibWl0LFxuICAgIG9uQ2xvc2UsXG4gIH0gPSBwcm9wcztcblxuICBsZXQgaW5pdGlhbFVuaXQgPSAnc2Vjb25kcyc7XG4gIGxldCBpbml0aWFsVW5pdFZhbHVlID0gMTtcbiAgZm9yIChjb25zdCB1bml0IG9mIFVOSVRTKSB7XG4gICAgY29uc3QgbXMgPSBVTklUX1RPX01TLmdldCh1bml0KSB8fCAxO1xuXG4gICAgaWYgKGluaXRpYWxWYWx1ZSA8IG1zKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpbml0aWFsVW5pdCA9IHVuaXQ7XG4gICAgaW5pdGlhbFVuaXRWYWx1ZSA9IE1hdGguZmxvb3IoaW5pdGlhbFZhbHVlIC8gbXMpO1xuICB9XG5cbiAgY29uc3QgW3VuaXRWYWx1ZSwgc2V0VW5pdFZhbHVlXSA9IHVzZVN0YXRlKGluaXRpYWxVbml0VmFsdWUpO1xuICBjb25zdCBbdW5pdCwgc2V0VW5pdF0gPSB1c2VTdGF0ZShpbml0aWFsVW5pdCk7XG5cbiAgY29uc3QgcmFuZ2UgPSBSQU5HRVMuZ2V0KHVuaXQpIHx8IFsxLCAxXTtcblxuICBjb25zdCB2YWx1ZXM6IEFycmF5PG51bWJlcj4gPSBbXTtcbiAgZm9yIChsZXQgaSA9IHJhbmdlWzBdOyBpIDwgcmFuZ2VbMV07IGkgKz0gMSkge1xuICAgIHZhbHVlcy5wdXNoKGkpO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Q29uZmlybWF0aW9uRGlhbG9nXG4gICAgICBtb2R1bGVDbGFzc05hbWU9e0NTU19NT0RVTEV9XG4gICAgICBpMThuPXtpMThufVxuICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICAgIHRpdGxlPXtpMThuKCdEaXNhcHBlYXJpbmdUaW1lRGlhbG9nX190aXRsZScpfVxuICAgICAgaGFzWEJ1dHRvblxuICAgICAgYWN0aW9ucz17W1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogaTE4bignRGlzYXBwZWFyaW5nVGltZURpYWxvZ19fc2V0JyksXG4gICAgICAgICAgc3R5bGU6ICdhZmZpcm1hdGl2ZScsXG4gICAgICAgICAgYWN0aW9uKCkge1xuICAgICAgICAgICAgb25TdWJtaXQodW5pdFZhbHVlICogKFVOSVRfVE9fTVMuZ2V0KHVuaXQpIHx8IDEpKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXX1cbiAgICA+XG4gICAgICA8cD57aTE4bignRGlzYXBwZWFyaW5nVGltZURpYWxvZ19fYm9keScpfTwvcD5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT17YCR7Q1NTX01PRFVMRX1fX3RpbWUtYm94ZXNgfT5cbiAgICAgICAgPFNlbGVjdFxuICAgICAgICAgIGFyaWFMYWJlbD17aTE4bignRGlzYXBwZWFyaW5nVGltZURpYWxvZ19fbGFiZWwtLXZhbHVlJyl9XG4gICAgICAgICAgbW9kdWxlQ2xhc3NOYW1lPXtgJHtDU1NfTU9EVUxFfV9fdGltZS1ib3hlc19fdmFsdWVgfVxuICAgICAgICAgIHZhbHVlPXt1bml0VmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9e25ld1ZhbHVlID0+IHNldFVuaXRWYWx1ZShwYXJzZUludChuZXdWYWx1ZSwgMTApKX1cbiAgICAgICAgICBvcHRpb25zPXt2YWx1ZXMubWFwKHZhbHVlID0+ICh7IHZhbHVlLCB0ZXh0OiB2YWx1ZS50b1N0cmluZygpIH0pKX1cbiAgICAgICAgLz5cbiAgICAgICAgPFNlbGVjdFxuICAgICAgICAgIGFyaWFMYWJlbD17aTE4bignRGlzYXBwZWFyaW5nVGltZURpYWxvZ19fbGFiZWwtLXVuaXRzJyl9XG4gICAgICAgICAgbW9kdWxlQ2xhc3NOYW1lPXtgJHtDU1NfTU9EVUxFfV9fdGltZS1ib3hlc19fdW5pdHNgfVxuICAgICAgICAgIHZhbHVlPXt1bml0fVxuICAgICAgICAgIG9uQ2hhbmdlPXtuZXdVbml0ID0+IHtcbiAgICAgICAgICAgIHNldFVuaXQobmV3VW5pdCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHJhbmdlcyA9IFJBTkdFUy5nZXQobmV3VW5pdCk7XG4gICAgICAgICAgICBpZiAoIXJhbmdlcykge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IFttaW4sIG1heF0gPSByYW5nZXM7XG4gICAgICAgICAgICBzZXRVbml0VmFsdWUoTWF0aC5tYXgobWluLCBNYXRoLm1pbihtYXggLSAxLCB1bml0VmFsdWUpKSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvcHRpb25zPXtVTklUUy5tYXAodW5pdE5hbWUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgdmFsdWU6IHVuaXROYW1lLFxuICAgICAgICAgICAgICB0ZXh0OiBpMThuKGBEaXNhcHBlYXJpbmdUaW1lRGlhbG9nX18ke3VuaXROYW1lfWApLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgLz5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICA8L0NvbmZpcm1hdGlvbkRpYWxvZz5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBZ0M7QUFFaEMsZ0NBQW1DO0FBQ25DLG9CQUF1QjtBQUl2QixNQUFNLGFBQWE7QUFFbkIsTUFBTSxnQkFBZ0I7QUFVdEIsTUFBTSxRQUFRLENBQUMsV0FBVyxXQUFXLFNBQVMsUUFBUSxPQUFPO0FBRTdELE1BQU0sYUFBYSxvQkFBSSxJQUFvQjtBQUFBLEVBQ3pDLENBQUMsV0FBVyxDQUFDO0FBQUEsRUFDYixDQUFDLFdBQVcsRUFBRTtBQUFBLEVBQ2QsQ0FBQyxTQUFTLEtBQUssRUFBRTtBQUFBLEVBQ2pCLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtBQUFBLEVBQ3JCLENBQUMsU0FBUyxJQUFJLEtBQUssS0FBSyxFQUFFO0FBQzVCLENBQUM7QUFFRCxNQUFNLFNBQVMsb0JBQUksSUFBOEI7QUFBQSxFQUMvQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUFBLEVBQ25CLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQUEsRUFDbkIsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7QUFBQSxFQUNqQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUFBLEVBQ2YsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEIsQ0FBQztBQUVNLGdDQUFnQyxPQUErQjtBQUNwRSxRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBLGVBQWU7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFFSixNQUFJLGNBQWM7QUFDbEIsTUFBSSxtQkFBbUI7QUFDdkIsYUFBVyxTQUFRLE9BQU87QUFDeEIsVUFBTSxLQUFLLFdBQVcsSUFBSSxLQUFJLEtBQUs7QUFFbkMsUUFBSSxlQUFlLElBQUk7QUFDckI7QUFBQSxJQUNGO0FBRUEsa0JBQWM7QUFDZCx1QkFBbUIsS0FBSyxNQUFNLGVBQWUsRUFBRTtBQUFBLEVBQ2pEO0FBRUEsUUFBTSxDQUFDLFdBQVcsZ0JBQWdCLDJCQUFTLGdCQUFnQjtBQUMzRCxRQUFNLENBQUMsTUFBTSxXQUFXLDJCQUFTLFdBQVc7QUFFNUMsUUFBTSxRQUFRLE9BQU8sSUFBSSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFFdkMsUUFBTSxTQUF3QixDQUFDO0FBQy9CLFdBQVMsSUFBSSxNQUFNLElBQUksSUFBSSxNQUFNLElBQUksS0FBSyxHQUFHO0FBQzNDLFdBQU8sS0FBSyxDQUFDO0FBQUEsRUFDZjtBQUVBLFNBQ0UsbURBQUM7QUFBQSxJQUNDLGlCQUFpQjtBQUFBLElBQ2pCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLE9BQU8sS0FBSywrQkFBK0I7QUFBQSxJQUMzQyxZQUFVO0FBQUEsSUFDVixTQUFTO0FBQUEsTUFDUDtBQUFBLFFBQ0UsTUFBTSxLQUFLLDZCQUE2QjtBQUFBLFFBQ3hDLE9BQU87QUFBQSxRQUNQLFNBQVM7QUFDUCxtQkFBUyxZQUFhLFlBQVcsSUFBSSxJQUFJLEtBQUssRUFBRTtBQUFBLFFBQ2xEO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxLQUVBLG1EQUFDLFdBQUcsS0FBSyw4QkFBOEIsQ0FBRSxHQUN6QyxtREFBQztBQUFBLElBQVEsV0FBVyxHQUFHO0FBQUEsS0FDckIsbURBQUM7QUFBQSxJQUNDLFdBQVcsS0FBSyxzQ0FBc0M7QUFBQSxJQUN0RCxpQkFBaUIsR0FBRztBQUFBLElBQ3BCLE9BQU87QUFBQSxJQUNQLFVBQVUsY0FBWSxhQUFhLFNBQVMsVUFBVSxFQUFFLENBQUM7QUFBQSxJQUN6RCxTQUFTLE9BQU8sSUFBSSxXQUFVLEdBQUUsT0FBTyxNQUFNLE1BQU0sU0FBUyxFQUFFLEVBQUU7QUFBQSxHQUNsRSxHQUNBLG1EQUFDO0FBQUEsSUFDQyxXQUFXLEtBQUssc0NBQXNDO0FBQUEsSUFDdEQsaUJBQWlCLEdBQUc7QUFBQSxJQUNwQixPQUFPO0FBQUEsSUFDUCxVQUFVLGFBQVc7QUFDbkIsY0FBUSxPQUFPO0FBRWYsWUFBTSxTQUFTLE9BQU8sSUFBSSxPQUFPO0FBQ2pDLFVBQUksQ0FBQyxRQUFRO0FBQ1g7QUFBQSxNQUNGO0FBRUEsWUFBTSxDQUFDLEtBQUssT0FBTztBQUNuQixtQkFBYSxLQUFLLElBQUksS0FBSyxLQUFLLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDO0FBQUEsSUFDMUQ7QUFBQSxJQUNBLFNBQVMsTUFBTSxJQUFJLGNBQVk7QUFDN0IsYUFBTztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTSxLQUFLLDJCQUEyQixVQUFVO0FBQUEsTUFDbEQ7QUFBQSxJQUNGLENBQUM7QUFBQSxHQUNILENBQ0YsQ0FDRjtBQUVKO0FBcEZnQiIsCiAgIm5hbWVzIjogW10KfQo=
