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
var writeUsername_exports = {};
__export(writeUsername_exports, {
  writeUsername: () => writeUsername
});
module.exports = __toCommonJS(writeUsername_exports);
var import_singleProtoJobQueue = require("../jobs/singleProtoJobQueue");
var import_Client = __toESM(require("../sql/Client"));
var import_updateOurUsername = require("../util/updateOurUsername");
var Errors = __toESM(require("../types/errors"));
var log = __toESM(require("../logging/log"));
var import_SendMessage = __toESM(require("../textsecure/SendMessage"));
async function writeUsername({
  username,
  previousUsername
}) {
  const { messaging } = window.textsecure;
  if (!messaging) {
    throw new Error("messaging interface is not available!");
  }
  const me = window.ConversationController.getOurConversationOrThrow();
  await (0, import_updateOurUsername.updateOurUsername)();
  if (me.get("username") !== previousUsername) {
    throw new Error("Username has changed on another device");
  }
  if (username) {
    await messaging.putUsername(username);
  } else {
    await messaging.deleteUsername();
  }
  me.set({
    username
  });
  import_Client.default.updateConversation(me.attributes);
  try {
    await import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getFetchLocalProfileSyncMessage());
  } catch (error) {
    log.error("writeUsername: Failed to queue sync message", Errors.toLogFormat(error));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  writeUsername
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid3JpdGVVc2VybmFtZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IHNpbmdsZVByb3RvSm9iUXVldWUgfSBmcm9tICcuLi9qb2JzL3NpbmdsZVByb3RvSm9iUXVldWUnO1xuaW1wb3J0IGRhdGFJbnRlcmZhY2UgZnJvbSAnLi4vc3FsL0NsaWVudCc7XG5pbXBvcnQgeyB1cGRhdGVPdXJVc2VybmFtZSB9IGZyb20gJy4uL3V0aWwvdXBkYXRlT3VyVXNlcm5hbWUnO1xuaW1wb3J0ICogYXMgRXJyb3JzIGZyb20gJy4uL3R5cGVzL2Vycm9ycyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IE1lc3NhZ2VTZW5kZXIgZnJvbSAnLi4vdGV4dHNlY3VyZS9TZW5kTWVzc2FnZSc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3cml0ZVVzZXJuYW1lKHtcbiAgdXNlcm5hbWUsXG4gIHByZXZpb3VzVXNlcm5hbWUsXG59OiB7XG4gIHVzZXJuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByZXZpb3VzVXNlcm5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbn0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgeyBtZXNzYWdpbmcgfSA9IHdpbmRvdy50ZXh0c2VjdXJlO1xuICBpZiAoIW1lc3NhZ2luZykge1xuICAgIHRocm93IG5ldyBFcnJvcignbWVzc2FnaW5nIGludGVyZmFjZSBpcyBub3QgYXZhaWxhYmxlIScpO1xuICB9XG5cbiAgY29uc3QgbWUgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRPdXJDb252ZXJzYXRpb25PclRocm93KCk7XG4gIGF3YWl0IHVwZGF0ZU91clVzZXJuYW1lKCk7XG5cbiAgaWYgKG1lLmdldCgndXNlcm5hbWUnKSAhPT0gcHJldmlvdXNVc2VybmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVXNlcm5hbWUgaGFzIGNoYW5nZWQgb24gYW5vdGhlciBkZXZpY2UnKTtcbiAgfVxuXG4gIGlmICh1c2VybmFtZSkge1xuICAgIGF3YWl0IG1lc3NhZ2luZy5wdXRVc2VybmFtZSh1c2VybmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgYXdhaXQgbWVzc2FnaW5nLmRlbGV0ZVVzZXJuYW1lKCk7XG4gIH1cblxuICAvLyBVcGRhdGUgYmFja2JvbmUsIHVwZGF0ZSBEQiwgdGhlbiB0ZWxsIGxpbmtlZCBkZXZpY2VzIGFib3V0IHByb2ZpbGUgdXBkYXRlXG4gIG1lLnNldCh7XG4gICAgdXNlcm5hbWUsXG4gIH0pO1xuXG4gIGRhdGFJbnRlcmZhY2UudXBkYXRlQ29udmVyc2F0aW9uKG1lLmF0dHJpYnV0ZXMpO1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgc2luZ2xlUHJvdG9Kb2JRdWV1ZS5hZGQoXG4gICAgICBNZXNzYWdlU2VuZGVyLmdldEZldGNoTG9jYWxQcm9maWxlU3luY01lc3NhZ2UoKVxuICAgICk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nLmVycm9yKFxuICAgICAgJ3dyaXRlVXNlcm5hbWU6IEZhaWxlZCB0byBxdWV1ZSBzeW5jIG1lc3NhZ2UnLFxuICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKVxuICAgICk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxpQ0FBb0M7QUFDcEMsb0JBQTBCO0FBQzFCLCtCQUFrQztBQUNsQyxhQUF3QjtBQUN4QixVQUFxQjtBQUNyQix5QkFBMEI7QUFFMUIsNkJBQW9DO0FBQUEsRUFDbEM7QUFBQSxFQUNBO0FBQUEsR0FJZ0I7QUFDaEIsUUFBTSxFQUFFLGNBQWMsT0FBTztBQUM3QixNQUFJLENBQUMsV0FBVztBQUNkLFVBQU0sSUFBSSxNQUFNLHVDQUF1QztBQUFBLEVBQ3pEO0FBRUEsUUFBTSxLQUFLLE9BQU8sdUJBQXVCLDBCQUEwQjtBQUNuRSxRQUFNLGdEQUFrQjtBQUV4QixNQUFJLEdBQUcsSUFBSSxVQUFVLE1BQU0sa0JBQWtCO0FBQzNDLFVBQU0sSUFBSSxNQUFNLHdDQUF3QztBQUFBLEVBQzFEO0FBRUEsTUFBSSxVQUFVO0FBQ1osVUFBTSxVQUFVLFlBQVksUUFBUTtBQUFBLEVBQ3RDLE9BQU87QUFDTCxVQUFNLFVBQVUsZUFBZTtBQUFBLEVBQ2pDO0FBR0EsS0FBRyxJQUFJO0FBQUEsSUFDTDtBQUFBLEVBQ0YsQ0FBQztBQUVELHdCQUFjLG1CQUFtQixHQUFHLFVBQVU7QUFFOUMsTUFBSTtBQUNGLFVBQU0sK0NBQW9CLElBQ3hCLDJCQUFjLGdDQUFnQyxDQUNoRDtBQUFBLEVBQ0YsU0FBUyxPQUFQO0FBQ0EsUUFBSSxNQUNGLCtDQUNBLE9BQU8sWUFBWSxLQUFLLENBQzFCO0FBQUEsRUFDRjtBQUNGO0FBMUNzQiIsCiAgIm5hbWVzIjogW10KfQo=
