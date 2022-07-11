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
var AddNewLines_exports = {};
__export(AddNewLines_exports, {
  AddNewLines: () => AddNewLines
});
module.exports = __toCommonJS(AddNewLines_exports);
var import_react = __toESM(require("react"));
class AddNewLines extends import_react.default.Component {
  render() {
    const { text, renderNonNewLine } = this.props;
    const results = [];
    const FIND_NEWLINES = /\n/g;
    if (!renderNonNewLine) {
      return null;
    }
    let match = FIND_NEWLINES.exec(text);
    let last = 0;
    let count = 1;
    if (!match) {
      return renderNonNewLine({ text, key: 0 });
    }
    while (match) {
      if (last < match.index) {
        const textWithNoNewline = text.slice(last, match.index);
        count += 1;
        results.push(renderNonNewLine({ text: textWithNoNewline, key: count }));
      }
      count += 1;
      results.push(/* @__PURE__ */ import_react.default.createElement("br", {
        key: count
      }));
      last = FIND_NEWLINES.lastIndex;
      match = FIND_NEWLINES.exec(text);
    }
    if (last < text.length) {
      count += 1;
      results.push(renderNonNewLine({ text: text.slice(last), key: count }));
    }
    return results;
  }
}
AddNewLines.defaultProps = {
  renderNonNewLine: ({ text }) => text
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddNewLines
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQWRkTmV3TGluZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBSZW5kZXJUZXh0Q2FsbGJhY2tUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICB0ZXh0OiBzdHJpbmc7XG4gIC8qKiBBbGxvd3MgeW91IHRvIGN1c3RvbWl6ZSBub3cgbm9uLW5ld2xpbmVzIGFyZSByZW5kZXJlZC4gU2ltcGxlc3QgaXMganVzdCBhIDxzcGFuPi4gKi9cbiAgcmVuZGVyTm9uTmV3TGluZT86IFJlbmRlclRleHRDYWxsYmFja1R5cGU7XG59O1xuXG5leHBvcnQgY2xhc3MgQWRkTmV3TGluZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UHJvcHM+IHtcbiAgcHVibGljIHN0YXRpYyBkZWZhdWx0UHJvcHM6IFBhcnRpYWw8UHJvcHM+ID0ge1xuICAgIHJlbmRlck5vbk5ld0xpbmU6ICh7IHRleHQgfSkgPT4gdGV4dCxcbiAgfTtcblxuICBwdWJsaWMgb3ZlcnJpZGUgcmVuZGVyKCk6XG4gICAgfCBKU1guRWxlbWVudFxuICAgIHwgc3RyaW5nXG4gICAgfCBudWxsXG4gICAgfCBBcnJheTxKU1guRWxlbWVudCB8IHN0cmluZyB8IG51bGw+IHtcbiAgICBjb25zdCB7IHRleHQsIHJlbmRlck5vbk5ld0xpbmUgfSA9IHRoaXMucHJvcHM7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBjb25zdCByZXN1bHRzOiBBcnJheTxhbnk+ID0gW107XG4gICAgY29uc3QgRklORF9ORVdMSU5FUyA9IC9cXG4vZztcblxuICAgIC8vIFdlIGhhdmUgdG8gZG8gdGhpcywgYmVjYXVzZSByZW5kZXJOb25OZXdMaW5lIGlzIG5vdCByZXF1aXJlZCBpbiBvdXIgUHJvcHMgb2JqZWN0LFxuICAgIC8vICBidXQgaXQgaXMgYWx3YXlzIHByb3ZpZGVkIHZpYSBkZWZhdWx0UHJvcHMuXG4gICAgaWYgKCFyZW5kZXJOb25OZXdMaW5lKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgbWF0Y2ggPSBGSU5EX05FV0xJTkVTLmV4ZWModGV4dCk7XG4gICAgbGV0IGxhc3QgPSAwO1xuICAgIGxldCBjb3VudCA9IDE7XG5cbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICByZXR1cm4gcmVuZGVyTm9uTmV3TGluZSh7IHRleHQsIGtleTogMCB9KTtcbiAgICB9XG5cbiAgICB3aGlsZSAobWF0Y2gpIHtcbiAgICAgIGlmIChsYXN0IDwgbWF0Y2guaW5kZXgpIHtcbiAgICAgICAgY29uc3QgdGV4dFdpdGhOb05ld2xpbmUgPSB0ZXh0LnNsaWNlKGxhc3QsIG1hdGNoLmluZGV4KTtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHJlbmRlck5vbk5ld0xpbmUoeyB0ZXh0OiB0ZXh0V2l0aE5vTmV3bGluZSwga2V5OiBjb3VudCB9KSk7XG4gICAgICB9XG5cbiAgICAgIGNvdW50ICs9IDE7XG4gICAgICByZXN1bHRzLnB1c2goPGJyIGtleT17Y291bnR9IC8+KTtcblxuICAgICAgbGFzdCA9IEZJTkRfTkVXTElORVMubGFzdEluZGV4O1xuICAgICAgbWF0Y2ggPSBGSU5EX05FV0xJTkVTLmV4ZWModGV4dCk7XG4gICAgfVxuXG4gICAgaWYgKGxhc3QgPCB0ZXh0Lmxlbmd0aCkge1xuICAgICAgY291bnQgKz0gMTtcbiAgICAgIHJlc3VsdHMucHVzaChyZW5kZXJOb25OZXdMaW5lKHsgdGV4dDogdGV4dC5zbGljZShsYXN0KSwga2V5OiBjb3VudCB9KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFVWCxNQUFNLG9CQUFvQixxQkFBTSxVQUFpQjtBQUFBLEVBS3RDLFNBSXVCO0FBQ3JDLFVBQU0sRUFBRSxNQUFNLHFCQUFxQixLQUFLO0FBRXhDLFVBQU0sVUFBc0IsQ0FBQztBQUM3QixVQUFNLGdCQUFnQjtBQUl0QixRQUFJLENBQUMsa0JBQWtCO0FBQ3JCLGFBQU87QUFBQSxJQUNUO0FBRUEsUUFBSSxRQUFRLGNBQWMsS0FBSyxJQUFJO0FBQ25DLFFBQUksT0FBTztBQUNYLFFBQUksUUFBUTtBQUVaLFFBQUksQ0FBQyxPQUFPO0FBQ1YsYUFBTyxpQkFBaUIsRUFBRSxNQUFNLEtBQUssRUFBRSxDQUFDO0FBQUEsSUFDMUM7QUFFQSxXQUFPLE9BQU87QUFDWixVQUFJLE9BQU8sTUFBTSxPQUFPO0FBQ3RCLGNBQU0sb0JBQW9CLEtBQUssTUFBTSxNQUFNLE1BQU0sS0FBSztBQUN0RCxpQkFBUztBQUNULGdCQUFRLEtBQUssaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsS0FBSyxNQUFNLENBQUMsQ0FBQztBQUFBLE1BQ3hFO0FBRUEsZUFBUztBQUNULGNBQVEsS0FBSyxtREFBQztBQUFBLFFBQUcsS0FBSztBQUFBLE9BQU8sQ0FBRTtBQUUvQixhQUFPLGNBQWM7QUFDckIsY0FBUSxjQUFjLEtBQUssSUFBSTtBQUFBLElBQ2pDO0FBRUEsUUFBSSxPQUFPLEtBQUssUUFBUTtBQUN0QixlQUFTO0FBQ1QsY0FBUSxLQUFLLGlCQUFpQixFQUFFLE1BQU0sS0FBSyxNQUFNLElBQUksR0FBRyxLQUFLLE1BQU0sQ0FBQyxDQUFDO0FBQUEsSUFDdkU7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUNGO0FBbERPLEFBQ1MsQUFEVCxZQUNTLGVBQStCO0FBQUEsRUFDM0Msa0JBQWtCLENBQUMsRUFBRSxXQUFXO0FBQ2xDOyIsCiAgIm5hbWVzIjogW10KfQo=
