var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var textsecure_exports = {};
__export(textsecure_exports, {
  textsecure: () => textsecure
});
module.exports = __toCommonJS(textsecure_exports);
var import_EventTarget = __toESM(require("./EventTarget"));
var import_AccountManager = __toESM(require("./AccountManager"));
var import_MessageReceiver = __toESM(require("./MessageReceiver"));
var import_Helpers = __toESM(require("./Helpers"));
var import_ContactsParser = require("./ContactsParser");
var import_SyncRequest = __toESM(require("./SyncRequest"));
var import_SendMessage = __toESM(require("./SendMessage"));
var import_Storage = require("./Storage");
var WebAPI = __toESM(require("./WebAPI"));
var import_WebsocketResources = __toESM(require("./WebsocketResources"));
const textsecure = {
  utils: import_Helpers.default,
  storage: new import_Storage.Storage(),
  AccountManager: import_AccountManager.default,
  ContactBuffer: import_ContactsParser.ContactBuffer,
  EventTarget: import_EventTarget.default,
  GroupBuffer: import_ContactsParser.GroupBuffer,
  MessageReceiver: import_MessageReceiver.default,
  MessageSender: import_SendMessage.default,
  SyncRequest: import_SyncRequest.default,
  WebAPI,
  WebSocketResource: import_WebsocketResources.default
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  textsecure
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IEV2ZW50VGFyZ2V0IGZyb20gJy4vRXZlbnRUYXJnZXQnO1xuaW1wb3J0IEFjY291bnRNYW5hZ2VyIGZyb20gJy4vQWNjb3VudE1hbmFnZXInO1xuaW1wb3J0IE1lc3NhZ2VSZWNlaXZlciBmcm9tICcuL01lc3NhZ2VSZWNlaXZlcic7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi9IZWxwZXJzJztcbmltcG9ydCB7IENvbnRhY3RCdWZmZXIsIEdyb3VwQnVmZmVyIH0gZnJvbSAnLi9Db250YWN0c1BhcnNlcic7XG5pbXBvcnQgU3luY1JlcXVlc3QgZnJvbSAnLi9TeW5jUmVxdWVzdCc7XG5pbXBvcnQgTWVzc2FnZVNlbmRlciBmcm9tICcuL1NlbmRNZXNzYWdlJztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICcuL1N0b3JhZ2UnO1xuaW1wb3J0ICogYXMgV2ViQVBJIGZyb20gJy4vV2ViQVBJJztcbmltcG9ydCBXZWJTb2NrZXRSZXNvdXJjZSBmcm9tICcuL1dlYnNvY2tldFJlc291cmNlcyc7XG5cbmV4cG9ydCB0eXBlIFRleHRTZWN1cmVUeXBlID0ge1xuICB1dGlsczogdHlwZW9mIHV0aWxzO1xuICBzdG9yYWdlOiBTdG9yYWdlO1xuXG4gIEFjY291bnRNYW5hZ2VyOiB0eXBlb2YgQWNjb3VudE1hbmFnZXI7XG4gIENvbnRhY3RCdWZmZXI6IHR5cGVvZiBDb250YWN0QnVmZmVyO1xuICBFdmVudFRhcmdldDogdHlwZW9mIEV2ZW50VGFyZ2V0O1xuICBHcm91cEJ1ZmZlcjogdHlwZW9mIEdyb3VwQnVmZmVyO1xuICBNZXNzYWdlUmVjZWl2ZXI6IHR5cGVvZiBNZXNzYWdlUmVjZWl2ZXI7XG4gIE1lc3NhZ2VTZW5kZXI6IHR5cGVvZiBNZXNzYWdlU2VuZGVyO1xuICBTeW5jUmVxdWVzdDogdHlwZW9mIFN5bmNSZXF1ZXN0O1xuICBXZWJBUEk6IHR5cGVvZiBXZWJBUEk7XG4gIFdlYlNvY2tldFJlc291cmNlOiB0eXBlb2YgV2ViU29ja2V0UmVzb3VyY2U7XG5cbiAgc2VydmVyPzogV2ViQVBJLldlYkFQSVR5cGU7XG4gIG1lc3NhZ2luZz86IE1lc3NhZ2VTZW5kZXI7XG59O1xuXG5leHBvcnQgY29uc3QgdGV4dHNlY3VyZTogVGV4dFNlY3VyZVR5cGUgPSB7XG4gIHV0aWxzLFxuICBzdG9yYWdlOiBuZXcgU3RvcmFnZSgpLFxuXG4gIEFjY291bnRNYW5hZ2VyLFxuICBDb250YWN0QnVmZmVyLFxuICBFdmVudFRhcmdldCxcbiAgR3JvdXBCdWZmZXIsXG4gIE1lc3NhZ2VSZWNlaXZlcixcbiAgTWVzc2FnZVNlbmRlcixcbiAgU3luY1JlcXVlc3QsXG4gIFdlYkFQSSxcbiAgV2ViU29ja2V0UmVzb3VyY2UsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXdCO0FBQ3hCLDRCQUEyQjtBQUMzQiw2QkFBNEI7QUFDNUIscUJBQWtCO0FBQ2xCLDRCQUEyQztBQUMzQyx5QkFBd0I7QUFDeEIseUJBQTBCO0FBQzFCLHFCQUF3QjtBQUN4QixhQUF3QjtBQUN4QixnQ0FBOEI7QUFvQnZCLE1BQU0sYUFBNkI7QUFBQSxFQUN4QztBQUFBLEVBQ0EsU0FBUyxJQUFJLHVCQUFRO0FBQUEsRUFFckI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
