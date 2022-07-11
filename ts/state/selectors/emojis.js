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
var emojis_exports = {};
__export(emojis_exports, {
  selectRecentEmojis: () => selectRecentEmojis,
  useRecentEmojis: () => useRecentEmojis
});
module.exports = __toCommonJS(emojis_exports);
var import_reselect = require("reselect");
var import_react_redux = require("react-redux");
var import_lib = require("../../components/emoji/lib");
const selectRecentEmojis = (0, import_reselect.createSelector)(({ emojis }) => emojis.recents, (recents) => recents.filter(import_lib.isShortName));
const useRecentEmojis = /* @__PURE__ */ __name(() => (0, import_react_redux.useSelector)(selectRecentEmojis), "useRecentEmojis");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  selectRecentEmojis,
  useRecentEmojis
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZW1vamlzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgeyBpc1Nob3J0TmFtZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZW1vamkvbGliJztcblxuZXhwb3J0IGNvbnN0IHNlbGVjdFJlY2VudEVtb2ppcyA9IGNyZWF0ZVNlbGVjdG9yKFxuICAoeyBlbW9qaXMgfTogU3RhdGVUeXBlKSA9PiBlbW9qaXMucmVjZW50cyxcbiAgcmVjZW50cyA9PiByZWNlbnRzLmZpbHRlcihpc1Nob3J0TmFtZSlcbik7XG5cbmV4cG9ydCBjb25zdCB1c2VSZWNlbnRFbW9qaXMgPSAoKTogQXJyYXk8c3RyaW5nPiA9PlxuICB1c2VTZWxlY3RvcihzZWxlY3RSZWNlbnRFbW9qaXMpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esc0JBQStCO0FBQy9CLHlCQUE0QjtBQUc1QixpQkFBNEI7QUFFckIsTUFBTSxxQkFBcUIsb0NBQ2hDLENBQUMsRUFBRSxhQUF3QixPQUFPLFNBQ2xDLGFBQVcsUUFBUSxPQUFPLHNCQUFXLENBQ3ZDO0FBRU8sTUFBTSxrQkFBa0IsNkJBQzdCLG9DQUFZLGtCQUFrQixHQUREOyIsCiAgIm5hbWVzIjogW10KfQo=
