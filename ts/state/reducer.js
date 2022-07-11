var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var reducer_exports = {};
__export(reducer_exports, {
  reducer: () => reducer
});
module.exports = __toCommonJS(reducer_exports);
var import_redux = require("redux");
var import_accounts = require("./ducks/accounts");
var import_app = require("./ducks/app");
var import_audioPlayer = require("./ducks/audioPlayer");
var import_audioRecorder = require("./ducks/audioRecorder");
var import_badges = require("./ducks/badges");
var import_calling = require("./ducks/calling");
var import_composer = require("./ducks/composer");
var import_conversations = require("./ducks/conversations");
var import_crashReports = require("./ducks/crashReports");
var import_emojis = require("./ducks/emojis");
var import_expiration = require("./ducks/expiration");
var import_globalModals = require("./ducks/globalModals");
var import_items = require("./ducks/items");
var import_linkPreviews = require("./ducks/linkPreviews");
var import_network = require("./ducks/network");
var import_preferredReactions = require("./ducks/preferredReactions");
var import_safetyNumber = require("./ducks/safetyNumber");
var import_search = require("./ducks/search");
var import_stickers = require("./ducks/stickers");
var import_stories = require("./ducks/stories");
var import_updates = require("./ducks/updates");
var import_user = require("./ducks/user");
const reducer = (0, import_redux.combineReducers)({
  accounts: import_accounts.reducer,
  app: import_app.reducer,
  audioPlayer: import_audioPlayer.reducer,
  audioRecorder: import_audioRecorder.reducer,
  badges: import_badges.reducer,
  calling: import_calling.reducer,
  composer: import_composer.reducer,
  conversations: import_conversations.reducer,
  crashReports: import_crashReports.reducer,
  emojis: import_emojis.reducer,
  expiration: import_expiration.reducer,
  globalModals: import_globalModals.reducer,
  items: import_items.reducer,
  linkPreviews: import_linkPreviews.reducer,
  network: import_network.reducer,
  preferredReactions: import_preferredReactions.reducer,
  safetyNumber: import_safetyNumber.reducer,
  search: import_search.reducer,
  stickers: import_stickers.reducer,
  stories: import_stories.reducer,
  updates: import_updates.reducer,
  user: import_user.reducer
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  reducer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVkdWNlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcblxuaW1wb3J0IHsgcmVkdWNlciBhcyBhY2NvdW50cyB9IGZyb20gJy4vZHVja3MvYWNjb3VudHMnO1xuaW1wb3J0IHsgcmVkdWNlciBhcyBhcHAgfSBmcm9tICcuL2R1Y2tzL2FwcCc7XG5pbXBvcnQgeyByZWR1Y2VyIGFzIGF1ZGlvUGxheWVyIH0gZnJvbSAnLi9kdWNrcy9hdWRpb1BsYXllcic7XG5pbXBvcnQgeyByZWR1Y2VyIGFzIGF1ZGlvUmVjb3JkZXIgfSBmcm9tICcuL2R1Y2tzL2F1ZGlvUmVjb3JkZXInO1xuaW1wb3J0IHsgcmVkdWNlciBhcyBiYWRnZXMgfSBmcm9tICcuL2R1Y2tzL2JhZGdlcyc7XG5pbXBvcnQgeyByZWR1Y2VyIGFzIGNhbGxpbmcgfSBmcm9tICcuL2R1Y2tzL2NhbGxpbmcnO1xuaW1wb3J0IHsgcmVkdWNlciBhcyBjb21wb3NlciB9IGZyb20gJy4vZHVja3MvY29tcG9zZXInO1xuaW1wb3J0IHsgcmVkdWNlciBhcyBjb252ZXJzYXRpb25zIH0gZnJvbSAnLi9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7IHJlZHVjZXIgYXMgY3Jhc2hSZXBvcnRzIH0gZnJvbSAnLi9kdWNrcy9jcmFzaFJlcG9ydHMnO1xuaW1wb3J0IHsgcmVkdWNlciBhcyBlbW9qaXMgfSBmcm9tICcuL2R1Y2tzL2Vtb2ppcyc7XG5pbXBvcnQgeyByZWR1Y2VyIGFzIGV4cGlyYXRpb24gfSBmcm9tICcuL2R1Y2tzL2V4cGlyYXRpb24nO1xuaW1wb3J0IHsgcmVkdWNlciBhcyBnbG9iYWxNb2RhbHMgfSBmcm9tICcuL2R1Y2tzL2dsb2JhbE1vZGFscyc7XG5pbXBvcnQgeyByZWR1Y2VyIGFzIGl0ZW1zIH0gZnJvbSAnLi9kdWNrcy9pdGVtcyc7XG5pbXBvcnQgeyByZWR1Y2VyIGFzIGxpbmtQcmV2aWV3cyB9IGZyb20gJy4vZHVja3MvbGlua1ByZXZpZXdzJztcbmltcG9ydCB7IHJlZHVjZXIgYXMgbmV0d29yayB9IGZyb20gJy4vZHVja3MvbmV0d29yayc7XG5pbXBvcnQgeyByZWR1Y2VyIGFzIHByZWZlcnJlZFJlYWN0aW9ucyB9IGZyb20gJy4vZHVja3MvcHJlZmVycmVkUmVhY3Rpb25zJztcbmltcG9ydCB7IHJlZHVjZXIgYXMgc2FmZXR5TnVtYmVyIH0gZnJvbSAnLi9kdWNrcy9zYWZldHlOdW1iZXInO1xuaW1wb3J0IHsgcmVkdWNlciBhcyBzZWFyY2ggfSBmcm9tICcuL2R1Y2tzL3NlYXJjaCc7XG5pbXBvcnQgeyByZWR1Y2VyIGFzIHN0aWNrZXJzIH0gZnJvbSAnLi9kdWNrcy9zdGlja2Vycyc7XG5pbXBvcnQgeyByZWR1Y2VyIGFzIHN0b3JpZXMgfSBmcm9tICcuL2R1Y2tzL3N0b3JpZXMnO1xuaW1wb3J0IHsgcmVkdWNlciBhcyB1cGRhdGVzIH0gZnJvbSAnLi9kdWNrcy91cGRhdGVzJztcbmltcG9ydCB7IHJlZHVjZXIgYXMgdXNlciB9IGZyb20gJy4vZHVja3MvdXNlcic7XG5cbmV4cG9ydCBjb25zdCByZWR1Y2VyID0gY29tYmluZVJlZHVjZXJzKHtcbiAgYWNjb3VudHMsXG4gIGFwcCxcbiAgYXVkaW9QbGF5ZXIsXG4gIGF1ZGlvUmVjb3JkZXIsXG4gIGJhZGdlcyxcbiAgY2FsbGluZyxcbiAgY29tcG9zZXIsXG4gIGNvbnZlcnNhdGlvbnMsXG4gIGNyYXNoUmVwb3J0cyxcbiAgZW1vamlzLFxuICBleHBpcmF0aW9uLFxuICBnbG9iYWxNb2RhbHMsXG4gIGl0ZW1zLFxuICBsaW5rUHJldmlld3MsXG4gIG5ldHdvcmssXG4gIHByZWZlcnJlZFJlYWN0aW9ucyxcbiAgc2FmZXR5TnVtYmVyLFxuICBzZWFyY2gsXG4gIHN0aWNrZXJzLFxuICBzdG9yaWVzLFxuICB1cGRhdGVzLFxuICB1c2VyLFxufSk7XG5cbmV4cG9ydCB0eXBlIFN0YXRlVHlwZSA9IFJldHVyblR5cGU8dHlwZW9mIHJlZHVjZXI+O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWdDO0FBRWhDLHNCQUFvQztBQUNwQyxpQkFBK0I7QUFDL0IseUJBQXVDO0FBQ3ZDLDJCQUF5QztBQUN6QyxvQkFBa0M7QUFDbEMscUJBQW1DO0FBQ25DLHNCQUFvQztBQUNwQywyQkFBeUM7QUFDekMsMEJBQXdDO0FBQ3hDLG9CQUFrQztBQUNsQyx3QkFBc0M7QUFDdEMsMEJBQXdDO0FBQ3hDLG1CQUFpQztBQUNqQywwQkFBd0M7QUFDeEMscUJBQW1DO0FBQ25DLGdDQUE4QztBQUM5QywwQkFBd0M7QUFDeEMsb0JBQWtDO0FBQ2xDLHNCQUFvQztBQUNwQyxxQkFBbUM7QUFDbkMscUJBQW1DO0FBQ25DLGtCQUFnQztBQUV6QixNQUFNLFVBQVUsa0NBQWdCO0FBQUEsRUFDckM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
