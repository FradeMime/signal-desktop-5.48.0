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
var signal_clipboard_exports = {};
__export(signal_clipboard_exports, {
  SignalClipboard: () => SignalClipboard
});
module.exports = __toCommonJS(signal_clipboard_exports);
var import_quill_delta = __toESM(require("quill-delta"));
var import_util = require("../util");
const getSelectionHTML = /* @__PURE__ */ __name(() => {
  const selection = window.getSelection();
  if (selection === null) {
    return "";
  }
  const range = selection.getRangeAt(0);
  const contents = range.cloneContents();
  const div = document.createElement("div");
  div.appendChild(contents);
  return div.innerHTML;
}, "getSelectionHTML");
const replaceAngleBrackets = /* @__PURE__ */ __name((text) => {
  const entities = [
    [/&/g, "&amp;"],
    [/</g, "&lt;"],
    [/>/g, "&gt;"]
  ];
  return entities.reduce((acc, [re, replaceValue]) => acc.replace(re, replaceValue), text);
}, "replaceAngleBrackets");
class SignalClipboard {
  constructor(quill) {
    this.quill = quill;
    this.quill.root.addEventListener("copy", (e) => this.onCaptureCopy(e, false));
    this.quill.root.addEventListener("cut", (e) => this.onCaptureCopy(e, true));
    this.quill.root.addEventListener("paste", (e) => this.onCapturePaste(e));
  }
  onCaptureCopy(event, isCut = false) {
    event.preventDefault();
    if (event.clipboardData === null) {
      return;
    }
    const range = this.quill.getSelection();
    if (range === null) {
      return;
    }
    const contents = this.quill.getContents(range.index, range.length);
    if (contents === null) {
      return;
    }
    const { ops } = contents;
    if (ops === void 0) {
      return;
    }
    const text = (0, import_util.getTextFromOps)(ops);
    const html = getSelectionHTML();
    event.clipboardData.setData("text/plain", text);
    event.clipboardData.setData("text/signal", html);
    if (isCut) {
      this.quill.deleteText(range.index, range.length, "user");
    }
  }
  onCapturePaste(event) {
    if (event.clipboardData === null) {
      return;
    }
    this.quill.focus();
    const clipboard = this.quill.getModule("clipboard");
    const selection = this.quill.getSelection();
    if (selection === null) {
      return;
    }
    const text = event.clipboardData.getData("text/plain");
    const html = event.clipboardData.getData("text/signal");
    const clipboardDelta = html ? clipboard.convert(html) : clipboard.convert(replaceAngleBrackets(text));
    const { scrollTop } = this.quill.scrollingContainer;
    this.quill.selection.update("silent");
    if (selection) {
      setTimeout(() => {
        const delta = new import_quill_delta.default().retain(selection.index).concat(clipboardDelta);
        this.quill.updateContents(delta, "user");
        this.quill.setSelection(delta.length(), 0, "silent");
        this.quill.scrollingContainer.scrollTop = scrollTop;
      }, 1);
    }
    event.preventDefault();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SignalClipboard
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgUXVpbGwgZnJvbSAncXVpbGwnO1xuaW1wb3J0IERlbHRhIGZyb20gJ3F1aWxsLWRlbHRhJztcblxuaW1wb3J0IHsgZ2V0VGV4dEZyb21PcHMgfSBmcm9tICcuLi91dGlsJztcblxuY29uc3QgZ2V0U2VsZWN0aW9uSFRNTCA9ICgpID0+IHtcbiAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXG4gIGlmIChzZWxlY3Rpb24gPT09IG51bGwpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBjb25zdCByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuICBjb25zdCBjb250ZW50cyA9IHJhbmdlLmNsb25lQ29udGVudHMoKTtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgZGl2LmFwcGVuZENoaWxkKGNvbnRlbnRzKTtcblxuICByZXR1cm4gZGl2LmlubmVySFRNTDtcbn07XG5cbmNvbnN0IHJlcGxhY2VBbmdsZUJyYWNrZXRzID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICBjb25zdCBlbnRpdGllczogQXJyYXk8W1JlZ0V4cCwgc3RyaW5nXT4gPSBbXG4gICAgWy8mL2csICcmYW1wOyddLFxuICAgIFsvPC9nLCAnJmx0OyddLFxuICAgIFsvPi9nLCAnJmd0OyddLFxuICBdO1xuXG4gIHJldHVybiBlbnRpdGllcy5yZWR1Y2UoXG4gICAgKGFjYywgW3JlLCByZXBsYWNlVmFsdWVdKSA9PiBhY2MucmVwbGFjZShyZSwgcmVwbGFjZVZhbHVlKSxcbiAgICB0ZXh0XG4gICk7XG59O1xuXG5leHBvcnQgY2xhc3MgU2lnbmFsQ2xpcGJvYXJkIHtcbiAgcXVpbGw6IFF1aWxsO1xuXG4gIGNvbnN0cnVjdG9yKHF1aWxsOiBRdWlsbCkge1xuICAgIHRoaXMucXVpbGwgPSBxdWlsbDtcblxuICAgIHRoaXMucXVpbGwucm9vdC5hZGRFdmVudExpc3RlbmVyKCdjb3B5JywgZSA9PiB0aGlzLm9uQ2FwdHVyZUNvcHkoZSwgZmFsc2UpKTtcbiAgICB0aGlzLnF1aWxsLnJvb3QuYWRkRXZlbnRMaXN0ZW5lcignY3V0JywgZSA9PiB0aGlzLm9uQ2FwdHVyZUNvcHkoZSwgdHJ1ZSkpO1xuICAgIHRoaXMucXVpbGwucm9vdC5hZGRFdmVudExpc3RlbmVyKCdwYXN0ZScsIGUgPT4gdGhpcy5vbkNhcHR1cmVQYXN0ZShlKSk7XG4gIH1cblxuICBvbkNhcHR1cmVDb3B5KGV2ZW50OiBDbGlwYm9hcmRFdmVudCwgaXNDdXQgPSBmYWxzZSk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoZXZlbnQuY2xpcGJvYXJkRGF0YSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJhbmdlID0gdGhpcy5xdWlsbC5nZXRTZWxlY3Rpb24oKTtcblxuICAgIGlmIChyYW5nZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRlbnRzID0gdGhpcy5xdWlsbC5nZXRDb250ZW50cyhyYW5nZS5pbmRleCwgcmFuZ2UubGVuZ3RoKTtcblxuICAgIGlmIChjb250ZW50cyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgb3BzIH0gPSBjb250ZW50cztcblxuICAgIGlmIChvcHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPSBnZXRUZXh0RnJvbU9wcyhvcHMpO1xuICAgIGNvbnN0IGh0bWwgPSBnZXRTZWxlY3Rpb25IVE1MKCk7XG5cbiAgICBldmVudC5jbGlwYm9hcmREYXRhLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0ZXh0KTtcbiAgICBldmVudC5jbGlwYm9hcmREYXRhLnNldERhdGEoJ3RleHQvc2lnbmFsJywgaHRtbCk7XG5cbiAgICBpZiAoaXNDdXQpIHtcbiAgICAgIHRoaXMucXVpbGwuZGVsZXRlVGV4dChyYW5nZS5pbmRleCwgcmFuZ2UubGVuZ3RoLCAndXNlcicpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2FwdHVyZVBhc3RlKGV2ZW50OiBDbGlwYm9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC5jbGlwYm9hcmREYXRhID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5xdWlsbC5mb2N1cygpO1xuXG4gICAgY29uc3QgY2xpcGJvYXJkID0gdGhpcy5xdWlsbC5nZXRNb2R1bGUoJ2NsaXBib2FyZCcpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMucXVpbGwuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICBpZiAoc2VsZWN0aW9uID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dCA9IGV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xuICAgIGNvbnN0IGh0bWwgPSBldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQvc2lnbmFsJyk7XG5cbiAgICBjb25zdCBjbGlwYm9hcmREZWx0YSA9IGh0bWxcbiAgICAgID8gY2xpcGJvYXJkLmNvbnZlcnQoaHRtbClcbiAgICAgIDogY2xpcGJvYXJkLmNvbnZlcnQocmVwbGFjZUFuZ2xlQnJhY2tldHModGV4dCkpO1xuXG4gICAgY29uc3QgeyBzY3JvbGxUb3AgfSA9IHRoaXMucXVpbGwuc2Nyb2xsaW5nQ29udGFpbmVyO1xuXG4gICAgdGhpcy5xdWlsbC5zZWxlY3Rpb24udXBkYXRlKCdzaWxlbnQnKTtcblxuICAgIGlmIChzZWxlY3Rpb24pIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBkZWx0YSA9IG5ldyBEZWx0YSgpXG4gICAgICAgICAgLnJldGFpbihzZWxlY3Rpb24uaW5kZXgpXG4gICAgICAgICAgLmNvbmNhdChjbGlwYm9hcmREZWx0YSk7XG4gICAgICAgIHRoaXMucXVpbGwudXBkYXRlQ29udGVudHMoZGVsdGEsICd1c2VyJyk7XG4gICAgICAgIHRoaXMucXVpbGwuc2V0U2VsZWN0aW9uKGRlbHRhLmxlbmd0aCgpLCAwLCAnc2lsZW50Jyk7XG4gICAgICAgIHRoaXMucXVpbGwuc2Nyb2xsaW5nQ29udGFpbmVyLnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICAgIH0sIDEpO1xuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSx5QkFBa0I7QUFFbEIsa0JBQStCO0FBRS9CLE1BQU0sbUJBQW1CLDZCQUFNO0FBQzdCLFFBQU0sWUFBWSxPQUFPLGFBQWE7QUFFdEMsTUFBSSxjQUFjLE1BQU07QUFDdEIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFFBQVEsVUFBVSxXQUFXLENBQUM7QUFDcEMsUUFBTSxXQUFXLE1BQU0sY0FBYztBQUNyQyxRQUFNLE1BQU0sU0FBUyxjQUFjLEtBQUs7QUFFeEMsTUFBSSxZQUFZLFFBQVE7QUFFeEIsU0FBTyxJQUFJO0FBQ2IsR0FkeUI7QUFnQnpCLE1BQU0sdUJBQXVCLHdCQUFDLFNBQWlCO0FBQzdDLFFBQU0sV0FBb0M7QUFBQSxJQUN4QyxDQUFDLE1BQU0sT0FBTztBQUFBLElBQ2QsQ0FBQyxNQUFNLE1BQU07QUFBQSxJQUNiLENBQUMsTUFBTSxNQUFNO0FBQUEsRUFDZjtBQUVBLFNBQU8sU0FBUyxPQUNkLENBQUMsS0FBSyxDQUFDLElBQUksa0JBQWtCLElBQUksUUFBUSxJQUFJLFlBQVksR0FDekQsSUFDRjtBQUNGLEdBWDZCO0FBYXRCLE1BQU0sZ0JBQWdCO0FBQUEsRUFHM0IsWUFBWSxPQUFjO0FBQ3hCLFNBQUssUUFBUTtBQUViLFNBQUssTUFBTSxLQUFLLGlCQUFpQixRQUFRLE9BQUssS0FBSyxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBQzFFLFNBQUssTUFBTSxLQUFLLGlCQUFpQixPQUFPLE9BQUssS0FBSyxjQUFjLEdBQUcsSUFBSSxDQUFDO0FBQ3hFLFNBQUssTUFBTSxLQUFLLGlCQUFpQixTQUFTLE9BQUssS0FBSyxlQUFlLENBQUMsQ0FBQztBQUFBLEVBQ3ZFO0FBQUEsRUFFQSxjQUFjLE9BQXVCLFFBQVEsT0FBYTtBQUN4RCxVQUFNLGVBQWU7QUFFckIsUUFBSSxNQUFNLGtCQUFrQixNQUFNO0FBQ2hDO0FBQUEsSUFDRjtBQUVBLFVBQU0sUUFBUSxLQUFLLE1BQU0sYUFBYTtBQUV0QyxRQUFJLFVBQVUsTUFBTTtBQUNsQjtBQUFBLElBQ0Y7QUFFQSxVQUFNLFdBQVcsS0FBSyxNQUFNLFlBQVksTUFBTSxPQUFPLE1BQU0sTUFBTTtBQUVqRSxRQUFJLGFBQWEsTUFBTTtBQUNyQjtBQUFBLElBQ0Y7QUFFQSxVQUFNLEVBQUUsUUFBUTtBQUVoQixRQUFJLFFBQVEsUUFBVztBQUNyQjtBQUFBLElBQ0Y7QUFFQSxVQUFNLE9BQU8sZ0NBQWUsR0FBRztBQUMvQixVQUFNLE9BQU8saUJBQWlCO0FBRTlCLFVBQU0sY0FBYyxRQUFRLGNBQWMsSUFBSTtBQUM5QyxVQUFNLGNBQWMsUUFBUSxlQUFlLElBQUk7QUFFL0MsUUFBSSxPQUFPO0FBQ1QsV0FBSyxNQUFNLFdBQVcsTUFBTSxPQUFPLE1BQU0sUUFBUSxNQUFNO0FBQUEsSUFDekQ7QUFBQSxFQUNGO0FBQUEsRUFFQSxlQUFlLE9BQTZCO0FBQzFDLFFBQUksTUFBTSxrQkFBa0IsTUFBTTtBQUNoQztBQUFBLElBQ0Y7QUFFQSxTQUFLLE1BQU0sTUFBTTtBQUVqQixVQUFNLFlBQVksS0FBSyxNQUFNLFVBQVUsV0FBVztBQUNsRCxVQUFNLFlBQVksS0FBSyxNQUFNLGFBQWE7QUFFMUMsUUFBSSxjQUFjLE1BQU07QUFDdEI7QUFBQSxJQUNGO0FBRUEsVUFBTSxPQUFPLE1BQU0sY0FBYyxRQUFRLFlBQVk7QUFDckQsVUFBTSxPQUFPLE1BQU0sY0FBYyxRQUFRLGFBQWE7QUFFdEQsVUFBTSxpQkFBaUIsT0FDbkIsVUFBVSxRQUFRLElBQUksSUFDdEIsVUFBVSxRQUFRLHFCQUFxQixJQUFJLENBQUM7QUFFaEQsVUFBTSxFQUFFLGNBQWMsS0FBSyxNQUFNO0FBRWpDLFNBQUssTUFBTSxVQUFVLE9BQU8sUUFBUTtBQUVwQyxRQUFJLFdBQVc7QUFDYixpQkFBVyxNQUFNO0FBQ2YsY0FBTSxRQUFRLElBQUksMkJBQU0sRUFDckIsT0FBTyxVQUFVLEtBQUssRUFDdEIsT0FBTyxjQUFjO0FBQ3hCLGFBQUssTUFBTSxlQUFlLE9BQU8sTUFBTTtBQUN2QyxhQUFLLE1BQU0sYUFBYSxNQUFNLE9BQU8sR0FBRyxHQUFHLFFBQVE7QUFDbkQsYUFBSyxNQUFNLG1CQUFtQixZQUFZO0FBQUEsTUFDNUMsR0FBRyxDQUFDO0FBQUEsSUFDTjtBQUVBLFVBQU0sZUFBZTtBQUFBLEVBQ3ZCO0FBQ0Y7QUFyRk8iLAogICJuYW1lcyI6IFtdCn0K
