var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var locale_exports = {};
__export(locale_exports, {
  load: () => load
});
module.exports = __toCommonJS(locale_exports);
var import_path = require("path");
var import_fs = require("fs");
var import_lodash = require("lodash");
var import_setupI18n = require("../ts/util/setupI18n");
function normalizeLocaleName(locale) {
  if (/^en-/.test(locale)) {
    return "en";
  }
  return locale;
}
function getLocaleMessages(locale) {
  const onDiskLocale = locale.replace("-", "_");
  const targetFile = (0, import_path.join)(__dirname, "..", "_locales", onDiskLocale, "messages.json");
  return JSON.parse((0, import_fs.readFileSync)(targetFile, "utf-8"));
}
function load({
  appLocale,
  logger
}) {
  if (!appLocale) {
    throw new TypeError("`appLocale` is required");
  }
  if (!logger || !logger.error) {
    throw new TypeError("`logger.error` is required");
  }
  const english = getLocaleMessages("en");
  let localeName = normalizeLocaleName(appLocale);
  let messages;
  try {
    messages = getLocaleMessages(localeName);
    messages = (0, import_lodash.merge)(english, messages);
  } catch (e) {
    logger.error(`Problem loading messages for locale ${localeName} ${e.stack}`);
    logger.error("Falling back to en locale");
    localeName = "en";
    messages = english;
  }
  const i18n = (0, import_setupI18n.setupI18n)(appLocale, messages);
  return {
    i18n,
    name: localeName,
    messages
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  load
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibG9jYWxlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxNy0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdHMvdXRpbC9zZXR1cEkxOG4nO1xuXG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi90cy90eXBlcy9Mb2dnaW5nJztcbmltcG9ydCB0eXBlIHsgTG9jYWxlTWVzc2FnZXNUeXBlIH0gZnJvbSAnLi4vdHMvdHlwZXMvSTE4Tic7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90cy90eXBlcy9VdGlsJztcblxuZnVuY3Rpb24gbm9ybWFsaXplTG9jYWxlTmFtZShsb2NhbGU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICgvXmVuLS8udGVzdChsb2NhbGUpKSB7XG4gICAgcmV0dXJuICdlbic7XG4gIH1cblxuICByZXR1cm4gbG9jYWxlO1xufVxuXG5mdW5jdGlvbiBnZXRMb2NhbGVNZXNzYWdlcyhsb2NhbGU6IHN0cmluZyk6IExvY2FsZU1lc3NhZ2VzVHlwZSB7XG4gIGNvbnN0IG9uRGlza0xvY2FsZSA9IGxvY2FsZS5yZXBsYWNlKCctJywgJ18nKTtcblxuICBjb25zdCB0YXJnZXRGaWxlID0gam9pbihcbiAgICBfX2Rpcm5hbWUsXG4gICAgJy4uJyxcbiAgICAnX2xvY2FsZXMnLFxuICAgIG9uRGlza0xvY2FsZSxcbiAgICAnbWVzc2FnZXMuanNvbidcbiAgKTtcblxuICByZXR1cm4gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmModGFyZ2V0RmlsZSwgJ3V0Zi04JykpO1xufVxuXG5leHBvcnQgdHlwZSBMb2NhbGVUeXBlID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBuYW1lOiBzdHJpbmc7XG4gIG1lc3NhZ2VzOiBMb2NhbGVNZXNzYWdlc1R5cGU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZCh7XG4gIGFwcExvY2FsZSxcbiAgbG9nZ2VyLFxufToge1xuICBhcHBMb2NhbGU6IHN0cmluZztcbiAgbG9nZ2VyOiBQaWNrPExvZ2dlclR5cGUsICdlcnJvcic+O1xufSk6IExvY2FsZVR5cGUge1xuICBpZiAoIWFwcExvY2FsZSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2BhcHBMb2NhbGVgIGlzIHJlcXVpcmVkJyk7XG4gIH1cblxuICBpZiAoIWxvZ2dlciB8fCAhbG9nZ2VyLmVycm9yKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYGxvZ2dlci5lcnJvcmAgaXMgcmVxdWlyZWQnKTtcbiAgfVxuXG4gIGNvbnN0IGVuZ2xpc2ggPSBnZXRMb2NhbGVNZXNzYWdlcygnZW4nKTtcblxuICAvLyBMb2FkIGxvY2FsZSAtIGlmIHdlIGNhbid0IGxvYWQgbWVzc2FnZXMgZm9yIHRoZSBjdXJyZW50IGxvY2FsZSwgd2VcbiAgLy8gZGVmYXVsdCB0byAnZW4nXG4gIC8vXG4gIC8vIHBvc3NpYmxlIGxvY2FsZXM6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJvbi9lbGVjdHJvbi9ibG9iL21hc3Rlci9kb2NzL2FwaS9sb2NhbGVzLm1kXG4gIGxldCBsb2NhbGVOYW1lID0gbm9ybWFsaXplTG9jYWxlTmFtZShhcHBMb2NhbGUpO1xuICBsZXQgbWVzc2FnZXM7XG5cbiAgdHJ5IHtcbiAgICBtZXNzYWdlcyA9IGdldExvY2FsZU1lc3NhZ2VzKGxvY2FsZU5hbWUpO1xuXG4gICAgLy8gV2Ugc3RhcnQgd2l0aCBlbmdsaXNoLCB0aGVuIG92ZXJ3cml0ZSB0aGF0IHdpdGggYW55dGhpbmcgcHJlc2VudCBpbiBsb2NhbGVcbiAgICBtZXNzYWdlcyA9IG1lcmdlKGVuZ2xpc2gsIG1lc3NhZ2VzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5lcnJvcihcbiAgICAgIGBQcm9ibGVtIGxvYWRpbmcgbWVzc2FnZXMgZm9yIGxvY2FsZSAke2xvY2FsZU5hbWV9ICR7ZS5zdGFja31gXG4gICAgKTtcbiAgICBsb2dnZXIuZXJyb3IoJ0ZhbGxpbmcgYmFjayB0byBlbiBsb2NhbGUnKTtcblxuICAgIGxvY2FsZU5hbWUgPSAnZW4nO1xuICAgIG1lc3NhZ2VzID0gZW5nbGlzaDtcbiAgfVxuXG4gIGNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oYXBwTG9jYWxlLCBtZXNzYWdlcyk7XG5cbiAgcmV0dXJuIHtcbiAgICBpMThuLFxuICAgIG5hbWU6IGxvY2FsZU5hbWUsXG4gICAgbWVzc2FnZXMsXG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esa0JBQXFCO0FBQ3JCLGdCQUE2QjtBQUM3QixvQkFBc0I7QUFDdEIsdUJBQTBCO0FBTTFCLDZCQUE2QixRQUF3QjtBQUNuRCxNQUFJLE9BQU8sS0FBSyxNQUFNLEdBQUc7QUFDdkIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPO0FBQ1Q7QUFOUyxBQVFULDJCQUEyQixRQUFvQztBQUM3RCxRQUFNLGVBQWUsT0FBTyxRQUFRLEtBQUssR0FBRztBQUU1QyxRQUFNLGFBQWEsc0JBQ2pCLFdBQ0EsTUFDQSxZQUNBLGNBQ0EsZUFDRjtBQUVBLFNBQU8sS0FBSyxNQUFNLDRCQUFhLFlBQVksT0FBTyxDQUFDO0FBQ3JEO0FBWlMsQUFvQkYsY0FBYztBQUFBLEVBQ25CO0FBQUEsRUFDQTtBQUFBLEdBSWE7QUFDYixNQUFJLENBQUMsV0FBVztBQUNkLFVBQU0sSUFBSSxVQUFVLHlCQUF5QjtBQUFBLEVBQy9DO0FBRUEsTUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLE9BQU87QUFDNUIsVUFBTSxJQUFJLFVBQVUsNEJBQTRCO0FBQUEsRUFDbEQ7QUFFQSxRQUFNLFVBQVUsa0JBQWtCLElBQUk7QUFPdEMsTUFBSSxhQUFhLG9CQUFvQixTQUFTO0FBQzlDLE1BQUk7QUFFSixNQUFJO0FBQ0YsZUFBVyxrQkFBa0IsVUFBVTtBQUd2QyxlQUFXLHlCQUFNLFNBQVMsUUFBUTtBQUFBLEVBQ3BDLFNBQVMsR0FBUDtBQUNBLFdBQU8sTUFDTCx1Q0FBdUMsY0FBYyxFQUFFLE9BQ3pEO0FBQ0EsV0FBTyxNQUFNLDJCQUEyQjtBQUV4QyxpQkFBYTtBQUNiLGVBQVc7QUFBQSxFQUNiO0FBRUEsUUFBTSxPQUFPLGdDQUFVLFdBQVcsUUFBUTtBQUUxQyxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsTUFBTTtBQUFBLElBQ047QUFBQSxFQUNGO0FBQ0Y7QUEvQ2dCIiwKICAibmFtZXMiOiBbXQp9Cg==
