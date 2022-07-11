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
var setupI18n_exports = {};
__export(setupI18n_exports, {
  setupI18n: () => setupI18n
});
module.exports = __toCommonJS(setupI18n_exports);
var log = __toESM(require("../logging/log"));
function setupI18n(locale, messages) {
  if (!locale) {
    throw new Error("i18n: locale parameter is required");
  }
  if (!messages) {
    throw new Error("i18n: messages parameter is required");
  }
  const getMessage = /* @__PURE__ */ __name((key, substitutions) => {
    const entry = messages[key];
    if (!entry) {
      log.error(`i18n: Attempted to get translation for nonexistent key '${key}'`);
      return "";
    }
    if (Array.isArray(substitutions) && substitutions.length > 1) {
      throw new Error("Array syntax is not supported with more than one placeholder");
    }
    if (typeof substitutions === "string" || typeof substitutions === "number") {
      throw new Error("You must provide either a map or an array");
    }
    const { message } = entry;
    if (!substitutions) {
      return message;
    }
    if (Array.isArray(substitutions)) {
      return substitutions.reduce((result, substitution) => result.replace(/\$.+?\$/, substitution), message);
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
        log.error(`i18n: Value not provided for placeholder ${placeholderName} in key '${key}'`);
      }
      builder += value || "";
      lastTextIndex = FIND_REPLACEMENTS.lastIndex;
      match = FIND_REPLACEMENTS.exec(message);
    }
    if (lastTextIndex < message.length) {
      builder += message.slice(lastTextIndex);
    }
    return builder;
  }, "getMessage");
  getMessage.getLocale = () => locale;
  return getMessage;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setupI18n
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2V0dXBJMThuLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGVNZXNzYWdlc1R5cGUgfSBmcm9tICcuLi90eXBlcy9JMThOJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwSTE4bihcbiAgbG9jYWxlOiBzdHJpbmcsXG4gIG1lc3NhZ2VzOiBMb2NhbGVNZXNzYWdlc1R5cGVcbik6IExvY2FsaXplclR5cGUge1xuICBpZiAoIWxvY2FsZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignaTE4bjogbG9jYWxlIHBhcmFtZXRlciBpcyByZXF1aXJlZCcpO1xuICB9XG4gIGlmICghbWVzc2FnZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2kxOG46IG1lc3NhZ2VzIHBhcmFtZXRlciBpcyByZXF1aXJlZCcpO1xuICB9XG5cbiAgY29uc3QgZ2V0TWVzc2FnZTogTG9jYWxpemVyVHlwZSA9IChrZXksIHN1YnN0aXR1dGlvbnMpID0+IHtcbiAgICBjb25zdCBlbnRyeSA9IG1lc3NhZ2VzW2tleV07XG4gICAgaWYgKCFlbnRyeSkge1xuICAgICAgbG9nLmVycm9yKFxuICAgICAgICBgaTE4bjogQXR0ZW1wdGVkIHRvIGdldCB0cmFuc2xhdGlvbiBmb3Igbm9uZXhpc3RlbnQga2V5ICcke2tleX0nYFxuICAgICAgKTtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3Vic3RpdHV0aW9ucykgJiYgc3Vic3RpdHV0aW9ucy5sZW5ndGggPiAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdBcnJheSBzeW50YXggaXMgbm90IHN1cHBvcnRlZCB3aXRoIG1vcmUgdGhhbiBvbmUgcGxhY2Vob2xkZXInXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICB0eXBlb2Ygc3Vic3RpdHV0aW9ucyA9PT0gJ3N0cmluZycgfHxcbiAgICAgIHR5cGVvZiBzdWJzdGl0dXRpb25zID09PSAnbnVtYmVyJ1xuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBwcm92aWRlIGVpdGhlciBhIG1hcCBvciBhbiBhcnJheScpO1xuICAgIH1cblxuICAgIGNvbnN0IHsgbWVzc2FnZSB9ID0gZW50cnk7XG4gICAgaWYgKCFzdWJzdGl0dXRpb25zKSB7XG4gICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3Vic3RpdHV0aW9ucykpIHtcbiAgICAgIHJldHVybiBzdWJzdGl0dXRpb25zLnJlZHVjZShcbiAgICAgICAgKHJlc3VsdCwgc3Vic3RpdHV0aW9uKSA9PiByZXN1bHQucmVwbGFjZSgvXFwkLis/XFwkLywgc3Vic3RpdHV0aW9uKSxcbiAgICAgICAgbWVzc2FnZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBGSU5EX1JFUExBQ0VNRU5UUyA9IC9cXCQoW14kXSspXFwkL2c7XG5cbiAgICBsZXQgbWF0Y2ggPSBGSU5EX1JFUExBQ0VNRU5UUy5leGVjKG1lc3NhZ2UpO1xuICAgIGxldCBidWlsZGVyID0gJyc7XG4gICAgbGV0IGxhc3RUZXh0SW5kZXggPSAwO1xuXG4gICAgd2hpbGUgKG1hdGNoKSB7XG4gICAgICBpZiAobGFzdFRleHRJbmRleCA8IG1hdGNoLmluZGV4KSB7XG4gICAgICAgIGJ1aWxkZXIgKz0gbWVzc2FnZS5zbGljZShsYXN0VGV4dEluZGV4LCBtYXRjaC5pbmRleCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBsYWNlaG9sZGVyTmFtZSA9IG1hdGNoWzFdO1xuICAgICAgY29uc3QgdmFsdWUgPSBzdWJzdGl0dXRpb25zW3BsYWNlaG9sZGVyTmFtZV07XG4gICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICBgaTE4bjogVmFsdWUgbm90IHByb3ZpZGVkIGZvciBwbGFjZWhvbGRlciAke3BsYWNlaG9sZGVyTmFtZX0gaW4ga2V5ICcke2tleX0nYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgYnVpbGRlciArPSB2YWx1ZSB8fCAnJztcblxuICAgICAgbGFzdFRleHRJbmRleCA9IEZJTkRfUkVQTEFDRU1FTlRTLmxhc3RJbmRleDtcbiAgICAgIG1hdGNoID0gRklORF9SRVBMQUNFTUVOVFMuZXhlYyhtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBpZiAobGFzdFRleHRJbmRleCA8IG1lc3NhZ2UubGVuZ3RoKSB7XG4gICAgICBidWlsZGVyICs9IG1lc3NhZ2Uuc2xpY2UobGFzdFRleHRJbmRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1aWxkZXI7XG4gIH07XG5cbiAgZ2V0TWVzc2FnZS5nZXRMb2NhbGUgPSAoKSA9PiBsb2NhbGU7XG5cbiAgcmV0dXJuIGdldE1lc3NhZ2U7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0EsVUFBcUI7QUFFZCxtQkFDTCxRQUNBLFVBQ2U7QUFDZixNQUFJLENBQUMsUUFBUTtBQUNYLFVBQU0sSUFBSSxNQUFNLG9DQUFvQztBQUFBLEVBQ3REO0FBQ0EsTUFBSSxDQUFDLFVBQVU7QUFDYixVQUFNLElBQUksTUFBTSxzQ0FBc0M7QUFBQSxFQUN4RDtBQUVBLFFBQU0sYUFBNEIsd0JBQUMsS0FBSyxrQkFBa0I7QUFDeEQsVUFBTSxRQUFRLFNBQVM7QUFDdkIsUUFBSSxDQUFDLE9BQU87QUFDVixVQUFJLE1BQ0YsMkRBQTJELE1BQzdEO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFDQSxRQUFJLE1BQU0sUUFBUSxhQUFhLEtBQUssY0FBYyxTQUFTLEdBQUc7QUFDNUQsWUFBTSxJQUFJLE1BQ1IsOERBQ0Y7QUFBQSxJQUNGO0FBQ0EsUUFDRSxPQUFPLGtCQUFrQixZQUN6QixPQUFPLGtCQUFrQixVQUN6QjtBQUNBLFlBQU0sSUFBSSxNQUFNLDJDQUEyQztBQUFBLElBQzdEO0FBRUEsVUFBTSxFQUFFLFlBQVk7QUFDcEIsUUFBSSxDQUFDLGVBQWU7QUFDbEIsYUFBTztBQUFBLElBQ1Q7QUFDQSxRQUFJLE1BQU0sUUFBUSxhQUFhLEdBQUc7QUFDaEMsYUFBTyxjQUFjLE9BQ25CLENBQUMsUUFBUSxpQkFBaUIsT0FBTyxRQUFRLFdBQVcsWUFBWSxHQUNoRSxPQUNGO0FBQUEsSUFDRjtBQUVBLFVBQU0sb0JBQW9CO0FBRTFCLFFBQUksUUFBUSxrQkFBa0IsS0FBSyxPQUFPO0FBQzFDLFFBQUksVUFBVTtBQUNkLFFBQUksZ0JBQWdCO0FBRXBCLFdBQU8sT0FBTztBQUNaLFVBQUksZ0JBQWdCLE1BQU0sT0FBTztBQUMvQixtQkFBVyxRQUFRLE1BQU0sZUFBZSxNQUFNLEtBQUs7QUFBQSxNQUNyRDtBQUVBLFlBQU0sa0JBQWtCLE1BQU07QUFDOUIsWUFBTSxRQUFRLGNBQWM7QUFDNUIsVUFBSSxDQUFDLE9BQU87QUFDVixZQUFJLE1BQ0YsNENBQTRDLDJCQUEyQixNQUN6RTtBQUFBLE1BQ0Y7QUFDQSxpQkFBVyxTQUFTO0FBRXBCLHNCQUFnQixrQkFBa0I7QUFDbEMsY0FBUSxrQkFBa0IsS0FBSyxPQUFPO0FBQUEsSUFDeEM7QUFFQSxRQUFJLGdCQUFnQixRQUFRLFFBQVE7QUFDbEMsaUJBQVcsUUFBUSxNQUFNLGFBQWE7QUFBQSxJQUN4QztBQUVBLFdBQU87QUFBQSxFQUNULEdBNURrQztBQThEbEMsYUFBVyxZQUFZLE1BQU07QUFFN0IsU0FBTztBQUNUO0FBNUVnQiIsCiAgIm5hbWVzIjogW10KfQo=
