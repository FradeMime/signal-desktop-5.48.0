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
var safetyNumber_exports = {};
__export(safetyNumber_exports, {
  generateSecurityNumber: () => generateSecurityNumber,
  generateSecurityNumberBlock: () => generateSecurityNumberBlock
});
module.exports = __toCommonJS(safetyNumber_exports);
var import_libsignal_client = require("@signalapp/libsignal-client");
var import_UUID = require("../types/UUID");
var import_assert = require("./assert");
var log = __toESM(require("../logging/log"));
async function generateSecurityNumber(ourNumber, ourKey, theirNumber, theirKey) {
  const ourNumberBuf = Buffer.from(ourNumber);
  const ourKeyObj = import_libsignal_client.PublicKey.deserialize(Buffer.from(ourKey));
  const theirNumberBuf = Buffer.from(theirNumber);
  const theirKeyObj = import_libsignal_client.PublicKey.deserialize(Buffer.from(theirKey));
  const fingerprint = import_libsignal_client.Fingerprint.new(5200, 2, ourNumberBuf, ourKeyObj, theirNumberBuf, theirKeyObj);
  const fingerprintString = fingerprint.displayableFingerprint().toString();
  return Promise.resolve(fingerprintString);
}
async function generateSecurityNumberBlock(contact) {
  const { storage } = window.textsecure;
  const ourNumber = storage.user.getNumber();
  const ourUuid = storage.user.getCheckedUuid();
  const us = storage.protocol.getIdentityRecord(ourUuid);
  const ourKey = us ? us.publicKey : null;
  const theirUuid = import_UUID.UUID.lookup(contact.id);
  const them = theirUuid ? await storage.protocol.getOrMigrateIdentityRecord(theirUuid) : void 0;
  const theirKey = them?.publicKey;
  if (!ourKey) {
    throw new Error("Could not load our key");
  }
  if (!theirKey) {
    throw new Error("Could not load their key");
  }
  if (!contact.e164) {
    log.error("generateSecurityNumberBlock: Attempted to generate security number for contact with no e164");
    return [];
  }
  (0, import_assert.assert)(ourNumber, "Should have our number");
  const securityNumber = await generateSecurityNumber(ourNumber, ourKey, contact.e164, theirKey);
  const chunks = [];
  for (let i = 0; i < securityNumber.length; i += 5) {
    chunks.push(securityNumber.substring(i, i + 5));
  }
  return chunks;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateSecurityNumber,
  generateSecurityNumberBlock
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2FmZXR5TnVtYmVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IFB1YmxpY0tleSwgRmluZ2VycHJpbnQgfSBmcm9tICdAc2lnbmFsYXBwL2xpYnNpZ25hbC1jbGllbnQnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vdHlwZXMvVVVJRCc7XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4vYXNzZXJ0JztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZVNlY3VyaXR5TnVtYmVyKFxuICBvdXJOdW1iZXI6IHN0cmluZyxcbiAgb3VyS2V5OiBVaW50OEFycmF5LFxuICB0aGVpck51bWJlcjogc3RyaW5nLFxuICB0aGVpcktleTogVWludDhBcnJheVxuKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3Qgb3VyTnVtYmVyQnVmID0gQnVmZmVyLmZyb20ob3VyTnVtYmVyKTtcbiAgY29uc3Qgb3VyS2V5T2JqID0gUHVibGljS2V5LmRlc2VyaWFsaXplKEJ1ZmZlci5mcm9tKG91cktleSkpO1xuICBjb25zdCB0aGVpck51bWJlckJ1ZiA9IEJ1ZmZlci5mcm9tKHRoZWlyTnVtYmVyKTtcbiAgY29uc3QgdGhlaXJLZXlPYmogPSBQdWJsaWNLZXkuZGVzZXJpYWxpemUoQnVmZmVyLmZyb20odGhlaXJLZXkpKTtcblxuICBjb25zdCBmaW5nZXJwcmludCA9IEZpbmdlcnByaW50Lm5ldyhcbiAgICA1MjAwLFxuICAgIDIsXG4gICAgb3VyTnVtYmVyQnVmLFxuICAgIG91cktleU9iaixcbiAgICB0aGVpck51bWJlckJ1ZixcbiAgICB0aGVpcktleU9ialxuICApO1xuXG4gIGNvbnN0IGZpbmdlcnByaW50U3RyaW5nID0gZmluZ2VycHJpbnQuZGlzcGxheWFibGVGaW5nZXJwcmludCgpLnRvU3RyaW5nKCk7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmluZ2VycHJpbnRTdHJpbmcpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVTZWN1cml0eU51bWJlckJsb2NrKFxuICBjb250YWN0OiBDb252ZXJzYXRpb25UeXBlXG4pOiBQcm9taXNlPEFycmF5PHN0cmluZz4+IHtcbiAgY29uc3QgeyBzdG9yYWdlIH0gPSB3aW5kb3cudGV4dHNlY3VyZTtcbiAgY29uc3Qgb3VyTnVtYmVyID0gc3RvcmFnZS51c2VyLmdldE51bWJlcigpO1xuICBjb25zdCBvdXJVdWlkID0gc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCk7XG5cbiAgY29uc3QgdXMgPSBzdG9yYWdlLnByb3RvY29sLmdldElkZW50aXR5UmVjb3JkKG91clV1aWQpO1xuICBjb25zdCBvdXJLZXkgPSB1cyA/IHVzLnB1YmxpY0tleSA6IG51bGw7XG5cbiAgY29uc3QgdGhlaXJVdWlkID0gVVVJRC5sb29rdXAoY29udGFjdC5pZCk7XG4gIGNvbnN0IHRoZW0gPSB0aGVpclV1aWRcbiAgICA/IGF3YWl0IHN0b3JhZ2UucHJvdG9jb2wuZ2V0T3JNaWdyYXRlSWRlbnRpdHlSZWNvcmQodGhlaXJVdWlkKVxuICAgIDogdW5kZWZpbmVkO1xuICBjb25zdCB0aGVpcktleSA9IHRoZW0/LnB1YmxpY0tleTtcblxuICBpZiAoIW91cktleSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGxvYWQgb3VyIGtleScpO1xuICB9XG5cbiAgaWYgKCF0aGVpcktleSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGxvYWQgdGhlaXIga2V5Jyk7XG4gIH1cblxuICBpZiAoIWNvbnRhY3QuZTE2NCkge1xuICAgIGxvZy5lcnJvcihcbiAgICAgICdnZW5lcmF0ZVNlY3VyaXR5TnVtYmVyQmxvY2s6IEF0dGVtcHRlZCB0byBnZW5lcmF0ZSBzZWN1cml0eSBudW1iZXIgZm9yIGNvbnRhY3Qgd2l0aCBubyBlMTY0J1xuICAgICk7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgYXNzZXJ0KG91ck51bWJlciwgJ1Nob3VsZCBoYXZlIG91ciBudW1iZXInKTtcbiAgY29uc3Qgc2VjdXJpdHlOdW1iZXIgPSBhd2FpdCBnZW5lcmF0ZVNlY3VyaXR5TnVtYmVyKFxuICAgIG91ck51bWJlcixcbiAgICBvdXJLZXksXG4gICAgY29udGFjdC5lMTY0LFxuICAgIHRoZWlyS2V5XG4gICk7XG5cbiAgY29uc3QgY2h1bmtzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2VjdXJpdHlOdW1iZXIubGVuZ3RoOyBpICs9IDUpIHtcbiAgICBjaHVua3MucHVzaChzZWN1cml0eU51bWJlci5zdWJzdHJpbmcoaSwgaSArIDUpKTtcbiAgfVxuXG4gIHJldHVybiBjaHVua3M7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSw4QkFBdUM7QUFFdkMsa0JBQXFCO0FBRXJCLG9CQUF1QjtBQUN2QixVQUFxQjtBQUVyQixzQ0FDRSxXQUNBLFFBQ0EsYUFDQSxVQUNpQjtBQUNqQixRQUFNLGVBQWUsT0FBTyxLQUFLLFNBQVM7QUFDMUMsUUFBTSxZQUFZLGtDQUFVLFlBQVksT0FBTyxLQUFLLE1BQU0sQ0FBQztBQUMzRCxRQUFNLGlCQUFpQixPQUFPLEtBQUssV0FBVztBQUM5QyxRQUFNLGNBQWMsa0NBQVUsWUFBWSxPQUFPLEtBQUssUUFBUSxDQUFDO0FBRS9ELFFBQU0sY0FBYyxvQ0FBWSxJQUM5QixNQUNBLEdBQ0EsY0FDQSxXQUNBLGdCQUNBLFdBQ0Y7QUFFQSxRQUFNLG9CQUFvQixZQUFZLHVCQUF1QixFQUFFLFNBQVM7QUFDeEUsU0FBTyxRQUFRLFFBQVEsaUJBQWlCO0FBQzFDO0FBdEJzQixBQXdCdEIsMkNBQ0UsU0FDd0I7QUFDeEIsUUFBTSxFQUFFLFlBQVksT0FBTztBQUMzQixRQUFNLFlBQVksUUFBUSxLQUFLLFVBQVU7QUFDekMsUUFBTSxVQUFVLFFBQVEsS0FBSyxlQUFlO0FBRTVDLFFBQU0sS0FBSyxRQUFRLFNBQVMsa0JBQWtCLE9BQU87QUFDckQsUUFBTSxTQUFTLEtBQUssR0FBRyxZQUFZO0FBRW5DLFFBQU0sWUFBWSxpQkFBSyxPQUFPLFFBQVEsRUFBRTtBQUN4QyxRQUFNLE9BQU8sWUFDVCxNQUFNLFFBQVEsU0FBUywyQkFBMkIsU0FBUyxJQUMzRDtBQUNKLFFBQU0sV0FBVyxNQUFNO0FBRXZCLE1BQUksQ0FBQyxRQUFRO0FBQ1gsVUFBTSxJQUFJLE1BQU0sd0JBQXdCO0FBQUEsRUFDMUM7QUFFQSxNQUFJLENBQUMsVUFBVTtBQUNiLFVBQU0sSUFBSSxNQUFNLDBCQUEwQjtBQUFBLEVBQzVDO0FBRUEsTUFBSSxDQUFDLFFBQVEsTUFBTTtBQUNqQixRQUFJLE1BQ0YsNkZBQ0Y7QUFDQSxXQUFPLENBQUM7QUFBQSxFQUNWO0FBRUEsNEJBQU8sV0FBVyx3QkFBd0I7QUFDMUMsUUFBTSxpQkFBaUIsTUFBTSx1QkFDM0IsV0FDQSxRQUNBLFFBQVEsTUFDUixRQUNGO0FBRUEsUUFBTSxTQUFTLENBQUM7QUFDaEIsV0FBUyxJQUFJLEdBQUcsSUFBSSxlQUFlLFFBQVEsS0FBSyxHQUFHO0FBQ2pELFdBQU8sS0FBSyxlQUFlLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUFBLEVBQ2hEO0FBRUEsU0FBTztBQUNUO0FBN0NzQiIsCiAgIm5hbWVzIjogW10KfQo=
