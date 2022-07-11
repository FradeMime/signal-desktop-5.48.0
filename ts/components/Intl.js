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
var Intl_exports = {};
__export(Intl_exports, {
  Intl: () => Intl
});
module.exports = __toCommonJS(Intl_exports);
var import_react = __toESM(require("react"));
var log = __toESM(require("../logging/log"));
class Intl extends import_react.default.Component {
  getComponent(index, placeholderName, key) {
    const { id, components } = this.props;
    if (!components) {
      log.error(`Error: Intl component prop not provided; Metadata: id '${id}', index ${index}, placeholder '${placeholderName}'`);
      return null;
    }
    if (Array.isArray(components)) {
      if (!components || !components.length || components.length <= index) {
        log.error(`Error: Intl missing provided component for id '${id}', index ${index}`);
        return null;
      }
      return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, {
        key
      }, components[index]);
    }
    const value = components[placeholderName];
    if (!value) {
      log.error(`Error: Intl missing provided component for id '${id}', placeholder '${placeholderName}'`);
      return null;
    }
    return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, {
      key
    }, value);
  }
  render() {
    const { components, id, i18n, renderText } = this.props;
    if (!id) {
      log.error("Error: Intl id prop not provided");
      return null;
    }
    const text = i18n(id);
    const results = [];
    const FIND_REPLACEMENTS = /\$([^$]+)\$/g;
    if (!renderText) {
      return null;
    }
    if (Array.isArray(components) && components.length > 1) {
      throw new Error("Array syntax is not supported with more than one placeholder");
    }
    let componentIndex = 0;
    let key = 0;
    let lastTextIndex = 0;
    let match = FIND_REPLACEMENTS.exec(text);
    if (!match) {
      return renderText({ text, key: 0 });
    }
    while (match) {
      if (lastTextIndex < match.index) {
        const textWithNoReplacements = text.slice(lastTextIndex, match.index);
        results.push(renderText({ text: textWithNoReplacements, key }));
        key += 1;
      }
      const placeholderName = match[1];
      results.push(this.getComponent(componentIndex, placeholderName, key));
      componentIndex += 1;
      key += 1;
      lastTextIndex = FIND_REPLACEMENTS.lastIndex;
      match = FIND_REPLACEMENTS.exec(text);
    }
    if (lastTextIndex < text.length) {
      results.push(renderText({ text: text.slice(lastTextIndex), key }));
      key += 1;
    }
    return results;
  }
}
Intl.defaultProps = {
  renderText: ({ text, key }) => /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, {
    key
  }, text)
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Intl
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW50bC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUsIFJlbmRlclRleHRDYWxsYmFja1R5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgUmVwbGFjZW1lbnRWYWx1ZXNUeXBlIH0gZnJvbSAnLi4vdHlwZXMvSTE4Tic7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuXG5leHBvcnQgdHlwZSBGdWxsSlNYVHlwZSA9IEFycmF5PEpTWC5FbGVtZW50IHwgc3RyaW5nPiB8IEpTWC5FbGVtZW50IHwgc3RyaW5nO1xuZXhwb3J0IHR5cGUgSW50bENvbXBvbmVudHNUeXBlID1cbiAgfCB1bmRlZmluZWRcbiAgfCBBcnJheTxGdWxsSlNYVHlwZT5cbiAgfCBSZXBsYWNlbWVudFZhbHVlc1R5cGU8RnVsbEpTWFR5cGU+O1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgLyoqIFRoZSB0cmFuc2xhdGlvbiBzdHJpbmcgaWQgKi9cbiAgaWQ6IHN0cmluZztcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgY29tcG9uZW50cz86IEludGxDb21wb25lbnRzVHlwZTtcbiAgcmVuZGVyVGV4dD86IFJlbmRlclRleHRDYWxsYmFja1R5cGU7XG59O1xuXG5leHBvcnQgY2xhc3MgSW50bCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxQcm9wcz4ge1xuICBwdWJsaWMgc3RhdGljIGRlZmF1bHRQcm9wczogUGFydGlhbDxQcm9wcz4gPSB7XG4gICAgcmVuZGVyVGV4dDogKHsgdGV4dCwga2V5IH0pID0+IChcbiAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2tleX0+e3RleHR9PC9SZWFjdC5GcmFnbWVudD5cbiAgICApLFxuICB9O1xuXG4gIHB1YmxpYyBnZXRDb21wb25lbnQoXG4gICAgaW5kZXg6IG51bWJlcixcbiAgICBwbGFjZWhvbGRlck5hbWU6IHN0cmluZyxcbiAgICBrZXk6IG51bWJlclxuICApOiBGdWxsSlNYVHlwZSB8IG51bGwge1xuICAgIGNvbnN0IHsgaWQsIGNvbXBvbmVudHMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIWNvbXBvbmVudHMpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgYEVycm9yOiBJbnRsIGNvbXBvbmVudCBwcm9wIG5vdCBwcm92aWRlZDsgTWV0YWRhdGE6IGlkICcke2lkfScsIGluZGV4ICR7aW5kZXh9LCBwbGFjZWhvbGRlciAnJHtwbGFjZWhvbGRlck5hbWV9J2BcbiAgICAgICk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb21wb25lbnRzKSkge1xuICAgICAgaWYgKCFjb21wb25lbnRzIHx8ICFjb21wb25lbnRzLmxlbmd0aCB8fCBjb21wb25lbnRzLmxlbmd0aCA8PSBpbmRleCkge1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgYEVycm9yOiBJbnRsIG1pc3NpbmcgcHJvdmlkZWQgY29tcG9uZW50IGZvciBpZCAnJHtpZH0nLCBpbmRleCAke2luZGV4fWBcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIDxSZWFjdC5GcmFnbWVudCBrZXk9e2tleX0+e2NvbXBvbmVudHNbaW5kZXhdfTwvUmVhY3QuRnJhZ21lbnQ+O1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlID0gY29tcG9uZW50c1twbGFjZWhvbGRlck5hbWVdO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgYEVycm9yOiBJbnRsIG1pc3NpbmcgcHJvdmlkZWQgY29tcG9uZW50IGZvciBpZCAnJHtpZH0nLCBwbGFjZWhvbGRlciAnJHtwbGFjZWhvbGRlck5hbWV9J2BcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiA8UmVhY3QuRnJhZ21lbnQga2V5PXtrZXl9Pnt2YWx1ZX08L1JlYWN0LkZyYWdtZW50PjtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIHB1YmxpYyBvdmVycmlkZSByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjb21wb25lbnRzLCBpZCwgaTE4biwgcmVuZGVyVGV4dCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghaWQpIHtcbiAgICAgIGxvZy5lcnJvcignRXJyb3I6IEludGwgaWQgcHJvcCBub3QgcHJvdmlkZWQnKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPSBpMThuKGlkKTtcbiAgICBjb25zdCByZXN1bHRzOiBBcnJheTxcbiAgICAgIHN0cmluZyB8IEpTWC5FbGVtZW50IHwgQXJyYXk8c3RyaW5nIHwgSlNYLkVsZW1lbnQ+IHwgbnVsbFxuICAgID4gPSBbXTtcbiAgICBjb25zdCBGSU5EX1JFUExBQ0VNRU5UUyA9IC9cXCQoW14kXSspXFwkL2c7XG5cbiAgICAvLyBXZSBoYXZlIHRvIGRvIHRoaXMsIGJlY2F1c2UgcmVuZGVyVGV4dCBpcyBub3QgcmVxdWlyZWQgaW4gb3VyIFByb3BzIG9iamVjdCxcbiAgICAvLyAgIGJ1dCBpdCBpcyBhbHdheXMgcHJvdmlkZWQgdmlhIGRlZmF1bHRQcm9wcy5cbiAgICBpZiAoIXJlbmRlclRleHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbXBvbmVudHMpICYmIGNvbXBvbmVudHMubGVuZ3RoID4gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQXJyYXkgc3ludGF4IGlzIG5vdCBzdXBwb3J0ZWQgd2l0aCBtb3JlIHRoYW4gb25lIHBsYWNlaG9sZGVyJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBsZXQgY29tcG9uZW50SW5kZXggPSAwO1xuICAgIGxldCBrZXkgPSAwO1xuICAgIGxldCBsYXN0VGV4dEluZGV4ID0gMDtcbiAgICBsZXQgbWF0Y2ggPSBGSU5EX1JFUExBQ0VNRU5UUy5leGVjKHRleHQpO1xuXG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgcmV0dXJuIHJlbmRlclRleHQoeyB0ZXh0LCBrZXk6IDAgfSk7XG4gICAgfVxuXG4gICAgd2hpbGUgKG1hdGNoKSB7XG4gICAgICBpZiAobGFzdFRleHRJbmRleCA8IG1hdGNoLmluZGV4KSB7XG4gICAgICAgIGNvbnN0IHRleHRXaXRoTm9SZXBsYWNlbWVudHMgPSB0ZXh0LnNsaWNlKGxhc3RUZXh0SW5kZXgsIG1hdGNoLmluZGV4KTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHJlbmRlclRleHQoeyB0ZXh0OiB0ZXh0V2l0aE5vUmVwbGFjZW1lbnRzLCBrZXkgfSkpO1xuICAgICAgICBrZXkgKz0gMTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGxhY2Vob2xkZXJOYW1lID0gbWF0Y2hbMV07XG4gICAgICByZXN1bHRzLnB1c2godGhpcy5nZXRDb21wb25lbnQoY29tcG9uZW50SW5kZXgsIHBsYWNlaG9sZGVyTmFtZSwga2V5KSk7XG4gICAgICBjb21wb25lbnRJbmRleCArPSAxO1xuICAgICAga2V5ICs9IDE7XG5cbiAgICAgIGxhc3RUZXh0SW5kZXggPSBGSU5EX1JFUExBQ0VNRU5UUy5sYXN0SW5kZXg7XG4gICAgICBtYXRjaCA9IEZJTkRfUkVQTEFDRU1FTlRTLmV4ZWModGV4dCk7XG4gICAgfVxuXG4gICAgaWYgKGxhc3RUZXh0SW5kZXggPCB0ZXh0Lmxlbmd0aCkge1xuICAgICAgcmVzdWx0cy5wdXNoKHJlbmRlclRleHQoeyB0ZXh0OiB0ZXh0LnNsaWNlKGxhc3RUZXh0SW5kZXgpLCBrZXkgfSkpO1xuICAgICAga2V5ICs9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFJbEIsVUFBcUI7QUFnQmQsTUFBTSxhQUFhLHFCQUFNLFVBQWlCO0FBQUEsRUFPeEMsYUFDTCxPQUNBLGlCQUNBLEtBQ29CO0FBQ3BCLFVBQU0sRUFBRSxJQUFJLGVBQWUsS0FBSztBQUVoQyxRQUFJLENBQUMsWUFBWTtBQUNmLFVBQUksTUFDRiwwREFBMEQsY0FBYyx1QkFBdUIsa0JBQ2pHO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFFQSxRQUFJLE1BQU0sUUFBUSxVQUFVLEdBQUc7QUFDN0IsVUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLFVBQVUsV0FBVyxVQUFVLE9BQU87QUFDbkUsWUFBSSxNQUNGLGtEQUFrRCxjQUFjLE9BQ2xFO0FBRUEsZUFBTztBQUFBLE1BQ1Q7QUFFQSxhQUFPLG1EQUFDLHFCQUFNLFVBQU47QUFBQSxRQUFlO0FBQUEsU0FBVyxXQUFXLE1BQU87QUFBQSxJQUN0RDtBQUVBLFVBQU0sUUFBUSxXQUFXO0FBQ3pCLFFBQUksQ0FBQyxPQUFPO0FBQ1YsVUFBSSxNQUNGLGtEQUFrRCxxQkFBcUIsa0JBQ3pFO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPLG1EQUFDLHFCQUFNLFVBQU47QUFBQSxNQUFlO0FBQUEsT0FBVyxLQUFNO0FBQUEsRUFDMUM7QUFBQSxFQUdnQixTQUFTO0FBQ3ZCLFVBQU0sRUFBRSxZQUFZLElBQUksTUFBTSxlQUFlLEtBQUs7QUFFbEQsUUFBSSxDQUFDLElBQUk7QUFDUCxVQUFJLE1BQU0sa0NBQWtDO0FBQzVDLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxPQUFPLEtBQUssRUFBRTtBQUNwQixVQUFNLFVBRUYsQ0FBQztBQUNMLFVBQU0sb0JBQW9CO0FBSTFCLFFBQUksQ0FBQyxZQUFZO0FBQ2YsYUFBTztBQUFBLElBQ1Q7QUFFQSxRQUFJLE1BQU0sUUFBUSxVQUFVLEtBQUssV0FBVyxTQUFTLEdBQUc7QUFDdEQsWUFBTSxJQUFJLE1BQ1IsOERBQ0Y7QUFBQSxJQUNGO0FBRUEsUUFBSSxpQkFBaUI7QUFDckIsUUFBSSxNQUFNO0FBQ1YsUUFBSSxnQkFBZ0I7QUFDcEIsUUFBSSxRQUFRLGtCQUFrQixLQUFLLElBQUk7QUFFdkMsUUFBSSxDQUFDLE9BQU87QUFDVixhQUFPLFdBQVcsRUFBRSxNQUFNLEtBQUssRUFBRSxDQUFDO0FBQUEsSUFDcEM7QUFFQSxXQUFPLE9BQU87QUFDWixVQUFJLGdCQUFnQixNQUFNLE9BQU87QUFDL0IsY0FBTSx5QkFBeUIsS0FBSyxNQUFNLGVBQWUsTUFBTSxLQUFLO0FBQ3BFLGdCQUFRLEtBQUssV0FBVyxFQUFFLE1BQU0sd0JBQXdCLElBQUksQ0FBQyxDQUFDO0FBQzlELGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxrQkFBa0IsTUFBTTtBQUM5QixjQUFRLEtBQUssS0FBSyxhQUFhLGdCQUFnQixpQkFBaUIsR0FBRyxDQUFDO0FBQ3BFLHdCQUFrQjtBQUNsQixhQUFPO0FBRVAsc0JBQWdCLGtCQUFrQjtBQUNsQyxjQUFRLGtCQUFrQixLQUFLLElBQUk7QUFBQSxJQUNyQztBQUVBLFFBQUksZ0JBQWdCLEtBQUssUUFBUTtBQUMvQixjQUFRLEtBQUssV0FBVyxFQUFFLE1BQU0sS0FBSyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNqRSxhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUF4R08sQUFDUyxBQURULEtBQ1MsZUFBK0I7QUFBQSxFQUMzQyxZQUFZLENBQUMsRUFBRSxNQUFNLFVBQ25CLG1EQUFDLHFCQUFNLFVBQU47QUFBQSxJQUFlO0FBQUEsS0FBVyxJQUFLO0FBRXBDOyIsCiAgIm5hbWVzIjogW10KfQo=
