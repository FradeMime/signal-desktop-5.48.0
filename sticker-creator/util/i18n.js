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
var i18n_exports = {};
__export(i18n_exports, {
  I18n: () => I18n,
  useI18n: () => useI18n
});
module.exports = __toCommonJS(i18n_exports);
var React = __toESM(require("react"));
const placeholder = /* @__PURE__ */ __name(() => "NO LOCALE LOADED", "placeholder");
placeholder.getLocale = () => "none";
const I18nContext = React.createContext(placeholder);
const I18n = /* @__PURE__ */ __name(({
  messages,
  locale,
  children
}) => {
  const callback = /* @__PURE__ */ __name((key, substitutions) => {
    if (Array.isArray(substitutions) && substitutions.length > 1) {
      throw new Error("Array syntax is not supported with more than one placeholder");
    }
    const stringInfo = messages[key];
    if (!stringInfo) {
      window.SignalContext.log.warn(`getMessage: No string found for key ${key}`);
      return "";
    }
    const { message } = stringInfo;
    if (!substitutions) {
      return message;
    }
    if (Array.isArray(substitutions)) {
      return substitutions.reduce((result, substitution) => result.toString().replace(/\$.+?\$/, substitution.toString()), message);
    }
    const FIND_REPLACEMENTS = /\$([^$]+)\$/g;
    let match = FIND_REPLACEMENTS.exec(message);
    let builder = "";
    let lastTextIndex = 0;
    while (match) {
      if (lastTextIndex < match.index) {
        builder += message.slice(lastTextIndex, match.index);
      }
      const placeholderName = match[1];
      const value = substitutions[placeholderName];
      if (!value) {
        console.error(`i18n: Value not provided for placeholder ${placeholderName} in key '${key}'`);
      }
      builder += value || "";
      lastTextIndex = FIND_REPLACEMENTS.lastIndex;
      match = FIND_REPLACEMENTS.exec(message);
    }
    if (lastTextIndex < message.length) {
      builder += message.slice(lastTextIndex);
    }
    return builder;
  }, "callback");
  callback.getLocale = () => locale;
  const getMessage = React.useCallback(callback, [messages]);
  return /* @__PURE__ */ React.createElement(I18nContext.Provider, {
    value: getMessage
  }, children);
}, "I18n");
const useI18n = /* @__PURE__ */ __name(() => React.useContext(I18nContext), "useI18n");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  I18n,
  useI18n
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaTE4bi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUsIFJlcGxhY2VtZW50VmFsdWVzVHlwZSB9IGZyb20gJy4uLy4uL3RzL3R5cGVzL1V0aWwnO1xuXG5jb25zdCBwbGFjZWhvbGRlciA9ICgpID0+ICdOTyBMT0NBTEUgTE9BREVEJztcbnBsYWNlaG9sZGVyLmdldExvY2FsZSA9ICgpID0+ICdub25lJztcblxuY29uc3QgSTE4bkNvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0PExvY2FsaXplclR5cGU+KHBsYWNlaG9sZGVyKTtcblxuZXhwb3J0IHR5cGUgSTE4blByb3BzID0ge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICBsb2NhbGU6IHN0cmluZztcbiAgbWVzc2FnZXM6IHsgW2tleTogc3RyaW5nXTogeyBtZXNzYWdlOiBzdHJpbmcgfSB9O1xufTtcblxuZXhwb3J0IGNvbnN0IEkxOG4gPSAoe1xuICBtZXNzYWdlcyxcbiAgbG9jYWxlLFxuICBjaGlsZHJlbixcbn06IEkxOG5Qcm9wcyk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgY2FsbGJhY2sgPSAoa2V5OiBzdHJpbmcsIHN1YnN0aXR1dGlvbnM/OiBSZXBsYWNlbWVudFZhbHVlc1R5cGUpID0+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdWJzdGl0dXRpb25zKSAmJiBzdWJzdGl0dXRpb25zLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0FycmF5IHN5bnRheCBpcyBub3Qgc3VwcG9ydGVkIHdpdGggbW9yZSB0aGFuIG9uZSBwbGFjZWhvbGRlcidcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RyaW5nSW5mbyA9IG1lc3NhZ2VzW2tleV07XG4gICAgaWYgKCFzdHJpbmdJbmZvKSB7XG4gICAgICB3aW5kb3cuU2lnbmFsQ29udGV4dC5sb2cud2FybihcbiAgICAgICAgYGdldE1lc3NhZ2U6IE5vIHN0cmluZyBmb3VuZCBmb3Iga2V5ICR7a2V5fWBcbiAgICAgICk7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgY29uc3QgeyBtZXNzYWdlIH0gPSBzdHJpbmdJbmZvO1xuICAgIGlmICghc3Vic3RpdHV0aW9ucykge1xuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHN1YnN0aXR1dGlvbnMpKSB7XG4gICAgICByZXR1cm4gc3Vic3RpdHV0aW9ucy5yZWR1Y2UoXG4gICAgICAgIChyZXN1bHQsIHN1YnN0aXR1dGlvbikgPT5cbiAgICAgICAgICByZXN1bHQudG9TdHJpbmcoKS5yZXBsYWNlKC9cXCQuKz9cXCQvLCBzdWJzdGl0dXRpb24udG9TdHJpbmcoKSksXG4gICAgICAgIG1lc3NhZ2VcbiAgICAgICkgYXMgc3RyaW5nO1xuICAgIH1cblxuICAgIGNvbnN0IEZJTkRfUkVQTEFDRU1FTlRTID0gL1xcJChbXiRdKylcXCQvZztcblxuICAgIGxldCBtYXRjaCA9IEZJTkRfUkVQTEFDRU1FTlRTLmV4ZWMobWVzc2FnZSk7XG4gICAgbGV0IGJ1aWxkZXIgPSAnJztcbiAgICBsZXQgbGFzdFRleHRJbmRleCA9IDA7XG5cbiAgICB3aGlsZSAobWF0Y2gpIHtcbiAgICAgIGlmIChsYXN0VGV4dEluZGV4IDwgbWF0Y2guaW5kZXgpIHtcbiAgICAgICAgYnVpbGRlciArPSBtZXNzYWdlLnNsaWNlKGxhc3RUZXh0SW5kZXgsIG1hdGNoLmluZGV4KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGxhY2Vob2xkZXJOYW1lID0gbWF0Y2hbMV07XG4gICAgICBjb25zdCB2YWx1ZSA9IHN1YnN0aXR1dGlvbnNbcGxhY2Vob2xkZXJOYW1lXTtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBgaTE4bjogVmFsdWUgbm90IHByb3ZpZGVkIGZvciBwbGFjZWhvbGRlciAke3BsYWNlaG9sZGVyTmFtZX0gaW4ga2V5ICcke2tleX0nYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgYnVpbGRlciArPSB2YWx1ZSB8fCAnJztcblxuICAgICAgbGFzdFRleHRJbmRleCA9IEZJTkRfUkVQTEFDRU1FTlRTLmxhc3RJbmRleDtcbiAgICAgIG1hdGNoID0gRklORF9SRVBMQUNFTUVOVFMuZXhlYyhtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBpZiAobGFzdFRleHRJbmRleCA8IG1lc3NhZ2UubGVuZ3RoKSB7XG4gICAgICBidWlsZGVyICs9IG1lc3NhZ2Uuc2xpY2UobGFzdFRleHRJbmRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1aWxkZXI7XG4gIH07XG4gIGNhbGxiYWNrLmdldExvY2FsZSA9ICgpID0+IGxvY2FsZTtcblxuICBjb25zdCBnZXRNZXNzYWdlID0gUmVhY3QudXNlQ2FsbGJhY2s8TG9jYWxpemVyVHlwZT4oY2FsbGJhY2ssIFttZXNzYWdlc10pO1xuXG4gIHJldHVybiAoXG4gICAgPEkxOG5Db250ZXh0LlByb3ZpZGVyIHZhbHVlPXtnZXRNZXNzYWdlfT57Y2hpbGRyZW59PC9JMThuQ29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VJMThuID0gKCk6IExvY2FsaXplclR5cGUgPT4gUmVhY3QudXNlQ29udGV4dChJMThuQ29udGV4dCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUd2QixNQUFNLGNBQWMsNkJBQU0sb0JBQU47QUFDcEIsWUFBWSxZQUFZLE1BQU07QUFFOUIsTUFBTSxjQUFjLE1BQU0sY0FBNkIsV0FBVztBQVEzRCxNQUFNLE9BQU8sd0JBQUM7QUFBQSxFQUNuQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDNEI7QUFDNUIsUUFBTSxXQUFXLHdCQUFDLEtBQWEsa0JBQTBDO0FBQ3ZFLFFBQUksTUFBTSxRQUFRLGFBQWEsS0FBSyxjQUFjLFNBQVMsR0FBRztBQUM1RCxZQUFNLElBQUksTUFDUiw4REFDRjtBQUFBLElBQ0Y7QUFFQSxVQUFNLGFBQWEsU0FBUztBQUM1QixRQUFJLENBQUMsWUFBWTtBQUNmLGFBQU8sY0FBYyxJQUFJLEtBQ3ZCLHVDQUF1QyxLQUN6QztBQUNBLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxFQUFFLFlBQVk7QUFDcEIsUUFBSSxDQUFDLGVBQWU7QUFDbEIsYUFBTztBQUFBLElBQ1Q7QUFDQSxRQUFJLE1BQU0sUUFBUSxhQUFhLEdBQUc7QUFDaEMsYUFBTyxjQUFjLE9BQ25CLENBQUMsUUFBUSxpQkFDUCxPQUFPLFNBQVMsRUFBRSxRQUFRLFdBQVcsYUFBYSxTQUFTLENBQUMsR0FDOUQsT0FDRjtBQUFBLElBQ0Y7QUFFQSxVQUFNLG9CQUFvQjtBQUUxQixRQUFJLFFBQVEsa0JBQWtCLEtBQUssT0FBTztBQUMxQyxRQUFJLFVBQVU7QUFDZCxRQUFJLGdCQUFnQjtBQUVwQixXQUFPLE9BQU87QUFDWixVQUFJLGdCQUFnQixNQUFNLE9BQU87QUFDL0IsbUJBQVcsUUFBUSxNQUFNLGVBQWUsTUFBTSxLQUFLO0FBQUEsTUFDckQ7QUFFQSxZQUFNLGtCQUFrQixNQUFNO0FBQzlCLFlBQU0sUUFBUSxjQUFjO0FBQzVCLFVBQUksQ0FBQyxPQUFPO0FBRVYsZ0JBQVEsTUFDTiw0Q0FBNEMsMkJBQTJCLE1BQ3pFO0FBQUEsTUFDRjtBQUNBLGlCQUFXLFNBQVM7QUFFcEIsc0JBQWdCLGtCQUFrQjtBQUNsQyxjQUFRLGtCQUFrQixLQUFLLE9BQU87QUFBQSxJQUN4QztBQUVBLFFBQUksZ0JBQWdCLFFBQVEsUUFBUTtBQUNsQyxpQkFBVyxRQUFRLE1BQU0sYUFBYTtBQUFBLElBQ3hDO0FBRUEsV0FBTztBQUFBLEVBQ1QsR0F6RGlCO0FBMERqQixXQUFTLFlBQVksTUFBTTtBQUUzQixRQUFNLGFBQWEsTUFBTSxZQUEyQixVQUFVLENBQUMsUUFBUSxDQUFDO0FBRXhFLFNBQ0Usb0NBQUMsWUFBWSxVQUFaO0FBQUEsSUFBcUIsT0FBTztBQUFBLEtBQWEsUUFBUztBQUV2RCxHQXRFb0I7QUF3RWIsTUFBTSxVQUFVLDZCQUFxQixNQUFNLFdBQVcsV0FBVyxHQUFqRDsiLAogICJuYW1lcyI6IFtdCn0K
