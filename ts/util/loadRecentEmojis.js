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
var loadRecentEmojis_exports = {};
__export(loadRecentEmojis_exports, {
  getEmojiReducerState: () => getEmojiReducerState,
  loadRecentEmojis: () => loadRecentEmojis
});
module.exports = __toCommonJS(loadRecentEmojis_exports);
var import_lodash = require("lodash");
var import_Client = __toESM(require("../sql/Client"));
let initialState;
async function getRecentEmojisForRedux() {
  const recent = await import_Client.default.getRecentEmojis();
  return recent.map((e) => e.shortName);
}
async function loadRecentEmojis() {
  const recents = await getRecentEmojisForRedux();
  initialState = {
    recents: (0, import_lodash.take)(recents, 32)
  };
}
function getEmojiReducerState() {
  return initialState;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getEmojiReducerState,
  loadRecentEmojis
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibG9hZFJlY2VudEVtb2ppcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IHRha2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGRhdGFJbnRlcmZhY2UgZnJvbSAnLi4vc3FsL0NsaWVudCc7XG5cbnR5cGUgUmVjZW50RW1vamlPYmplY3RUeXBlID0ge1xuICByZWNlbnRzOiBBcnJheTxzdHJpbmc+O1xufTtcblxubGV0IGluaXRpYWxTdGF0ZTogUmVjZW50RW1vamlPYmplY3RUeXBlO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRSZWNlbnRFbW9qaXNGb3JSZWR1eCgpIHtcbiAgY29uc3QgcmVjZW50ID0gYXdhaXQgZGF0YUludGVyZmFjZS5nZXRSZWNlbnRFbW9qaXMoKTtcbiAgcmV0dXJuIHJlY2VudC5tYXAoZSA9PiBlLnNob3J0TmFtZSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkUmVjZW50RW1vamlzKCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCByZWNlbnRzID0gYXdhaXQgZ2V0UmVjZW50RW1vamlzRm9yUmVkdXgoKTtcblxuICBpbml0aWFsU3RhdGUgPSB7XG4gICAgcmVjZW50czogdGFrZShyZWNlbnRzLCAzMiksXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbW9qaVJlZHVjZXJTdGF0ZSgpOiBSZWNlbnRFbW9qaU9iamVjdFR5cGUge1xuICByZXR1cm4gaW5pdGlhbFN0YXRlO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXFCO0FBQ3JCLG9CQUEwQjtBQU0xQixJQUFJO0FBRUoseUNBQXlDO0FBQ3ZDLFFBQU0sU0FBUyxNQUFNLHNCQUFjLGdCQUFnQjtBQUNuRCxTQUFPLE9BQU8sSUFBSSxPQUFLLEVBQUUsU0FBUztBQUNwQztBQUhlLEFBS2Ysa0NBQXdEO0FBQ3RELFFBQU0sVUFBVSxNQUFNLHdCQUF3QjtBQUU5QyxpQkFBZTtBQUFBLElBQ2IsU0FBUyx3QkFBSyxTQUFTLEVBQUU7QUFBQSxFQUMzQjtBQUNGO0FBTnNCLEFBUWYsZ0NBQXVEO0FBQzVELFNBQU87QUFDVDtBQUZnQiIsCiAgIm5hbWVzIjogW10KfQo=
