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
var getKeysForIdentifier_exports = {};
__export(getKeysForIdentifier_exports, {
  getKeysForIdentifier: () => getKeysForIdentifier
});
module.exports = __toCommonJS(getKeysForIdentifier_exports);
var import_libsignal_client = require("@signalapp/libsignal-client");
var import_Errors = require("./Errors");
var import_LibSignalStores = require("../LibSignalStores");
var import_Address = require("../types/Address");
var import_QualifiedAddress = require("../types/QualifiedAddress");
var import_UUID = require("../types/UUID");
var log = __toESM(require("../logging/log"));
var import_isRecord = require("../util/isRecord");
async function getKeysForIdentifier(identifier, server, devicesToUpdate, accessKey) {
  try {
    const { keys, accessKeyFailed } = await getServerKeys(identifier, server, accessKey);
    await handleServerKeys(identifier, keys, devicesToUpdate);
    return {
      accessKeyFailed
    };
  } catch (error) {
    if (error instanceof import_Errors.HTTPError && error.code === 404) {
      const theirUuid = import_UUID.UUID.lookup(identifier);
      if (theirUuid) {
        await window.textsecure.storage.protocol.archiveAllSessions(theirUuid);
      }
      throw new import_Errors.UnregisteredUserError(identifier, error);
    }
    throw error;
  }
}
async function getServerKeys(identifier, server, accessKey) {
  try {
    if (!accessKey) {
      return {
        keys: await server.getKeysForIdentifier(identifier)
      };
    }
    return {
      keys: await server.getKeysForIdentifierUnauth(identifier, void 0, {
        accessKey
      })
    };
  } catch (error) {
    if (error instanceof Error && error.message.includes("untrusted identity")) {
      throw new import_Errors.OutgoingIdentityKeyError(identifier);
    }
    if (accessKey && (0, import_isRecord.isRecord)(error) && typeof error.code === "number" && (error.code === 401 || error.code === 403)) {
      return {
        accessKeyFailed: true,
        keys: await server.getKeysForIdentifier(identifier)
      };
    }
    throw error;
  }
}
async function handleServerKeys(identifier, response, devicesToUpdate) {
  const ourUuid = window.textsecure.storage.user.getCheckedUuid();
  const sessionStore = new import_LibSignalStores.Sessions({ ourUuid });
  const identityKeyStore = new import_LibSignalStores.IdentityKeys({ ourUuid });
  await Promise.all(response.devices.map(async (device) => {
    const { deviceId, registrationId, preKey, signedPreKey } = device;
    if (devicesToUpdate !== void 0 && !devicesToUpdate.includes(deviceId)) {
      return;
    }
    if (device.registrationId === 0) {
      log.info(`handleServerKeys/${identifier}: Got device registrationId zero!`);
    }
    if (!signedPreKey) {
      throw new Error(`getKeysForIdentifier/${identifier}: Missing signed prekey for deviceId ${deviceId}`);
    }
    const theirUuid = import_UUID.UUID.checkedLookup(identifier);
    const protocolAddress = import_libsignal_client.ProtocolAddress.new(theirUuid.toString(), deviceId);
    const preKeyId = preKey?.keyId || null;
    const preKeyObject = preKey ? import_libsignal_client.PublicKey.deserialize(Buffer.from(preKey.publicKey)) : null;
    const signedPreKeyObject = import_libsignal_client.PublicKey.deserialize(Buffer.from(signedPreKey.publicKey));
    const identityKey = import_libsignal_client.PublicKey.deserialize(Buffer.from(response.identityKey));
    const preKeyBundle = import_libsignal_client.PreKeyBundle.new(registrationId, deviceId, preKeyId, preKeyObject, signedPreKey.keyId, signedPreKeyObject, Buffer.from(signedPreKey.signature), identityKey);
    const address = new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, deviceId));
    await window.textsecure.storage.protocol.enqueueSessionJob(address, () => (0, import_libsignal_client.processPreKeyBundle)(preKeyBundle, protocolAddress, sessionStore, identityKeyStore)).catch((error) => {
      if (error?.message?.includes("untrusted identity for address")) {
        error.identityKey = response.identityKey;
      }
      throw error;
    });
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getKeysForIdentifier
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0S2V5c0ZvcklkZW50aWZpZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHtcbiAgUHJlS2V5QnVuZGxlLFxuICBwcm9jZXNzUHJlS2V5QnVuZGxlLFxuICBQcm90b2NvbEFkZHJlc3MsXG4gIFB1YmxpY0tleSxcbn0gZnJvbSAnQHNpZ25hbGFwcC9saWJzaWduYWwtY2xpZW50JztcblxuaW1wb3J0IHtcbiAgVW5yZWdpc3RlcmVkVXNlckVycm9yLFxuICBIVFRQRXJyb3IsXG4gIE91dGdvaW5nSWRlbnRpdHlLZXlFcnJvcixcbn0gZnJvbSAnLi9FcnJvcnMnO1xuaW1wb3J0IHsgU2Vzc2lvbnMsIElkZW50aXR5S2V5cyB9IGZyb20gJy4uL0xpYlNpZ25hbFN0b3Jlcyc7XG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSAnLi4vdHlwZXMvQWRkcmVzcyc7XG5pbXBvcnQgeyBRdWFsaWZpZWRBZGRyZXNzIH0gZnJvbSAnLi4vdHlwZXMvUXVhbGlmaWVkQWRkcmVzcyc7XG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgdHlwZSB7IFNlcnZlcktleXNUeXBlLCBXZWJBUElUeXBlIH0gZnJvbSAnLi9XZWJBUEknO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB7IGlzUmVjb3JkIH0gZnJvbSAnLi4vdXRpbC9pc1JlY29yZCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRLZXlzRm9ySWRlbnRpZmllcihcbiAgaWRlbnRpZmllcjogc3RyaW5nLFxuICBzZXJ2ZXI6IFdlYkFQSVR5cGUsXG4gIGRldmljZXNUb1VwZGF0ZT86IEFycmF5PG51bWJlcj4sXG4gIGFjY2Vzc0tleT86IHN0cmluZ1xuKTogUHJvbWlzZTx7IGFjY2Vzc0tleUZhaWxlZD86IGJvb2xlYW4gfT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsga2V5cywgYWNjZXNzS2V5RmFpbGVkIH0gPSBhd2FpdCBnZXRTZXJ2ZXJLZXlzKFxuICAgICAgaWRlbnRpZmllcixcbiAgICAgIHNlcnZlcixcbiAgICAgIGFjY2Vzc0tleVxuICAgICk7XG5cbiAgICBhd2FpdCBoYW5kbGVTZXJ2ZXJLZXlzKGlkZW50aWZpZXIsIGtleXMsIGRldmljZXNUb1VwZGF0ZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgYWNjZXNzS2V5RmFpbGVkLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgSFRUUEVycm9yICYmIGVycm9yLmNvZGUgPT09IDQwNCkge1xuICAgICAgY29uc3QgdGhlaXJVdWlkID0gVVVJRC5sb29rdXAoaWRlbnRpZmllcik7XG5cbiAgICAgIGlmICh0aGVpclV1aWQpIHtcbiAgICAgICAgYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5hcmNoaXZlQWxsU2Vzc2lvbnModGhlaXJVdWlkKTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IFVucmVnaXN0ZXJlZFVzZXJFcnJvcihpZGVudGlmaWVyLCBlcnJvcik7XG4gICAgfVxuXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0U2VydmVyS2V5cyhcbiAgaWRlbnRpZmllcjogc3RyaW5nLFxuICBzZXJ2ZXI6IFdlYkFQSVR5cGUsXG4gIGFjY2Vzc0tleT86IHN0cmluZ1xuKTogUHJvbWlzZTx7IGFjY2Vzc0tleUZhaWxlZD86IGJvb2xlYW47IGtleXM6IFNlcnZlcktleXNUeXBlIH0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoIWFjY2Vzc0tleSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5czogYXdhaXQgc2VydmVyLmdldEtleXNGb3JJZGVudGlmaWVyKGlkZW50aWZpZXIpLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAga2V5czogYXdhaXQgc2VydmVyLmdldEtleXNGb3JJZGVudGlmaWVyVW5hdXRoKGlkZW50aWZpZXIsIHVuZGVmaW5lZCwge1xuICAgICAgICBhY2Nlc3NLZXksXG4gICAgICB9KSxcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgIGlmIChcbiAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiZcbiAgICAgIGVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoJ3VudHJ1c3RlZCBpZGVudGl0eScpXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgT3V0Z29pbmdJZGVudGl0eUtleUVycm9yKGlkZW50aWZpZXIpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGFjY2Vzc0tleSAmJlxuICAgICAgaXNSZWNvcmQoZXJyb3IpICYmXG4gICAgICB0eXBlb2YgZXJyb3IuY29kZSA9PT0gJ251bWJlcicgJiZcbiAgICAgIChlcnJvci5jb2RlID09PSA0MDEgfHwgZXJyb3IuY29kZSA9PT0gNDAzKVxuICAgICkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWNjZXNzS2V5RmFpbGVkOiB0cnVlLFxuICAgICAgICBrZXlzOiBhd2FpdCBzZXJ2ZXIuZ2V0S2V5c0ZvcklkZW50aWZpZXIoaWRlbnRpZmllciksXG4gICAgICB9O1xuICAgIH1cblxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVNlcnZlcktleXMoXG4gIGlkZW50aWZpZXI6IHN0cmluZyxcbiAgcmVzcG9uc2U6IFNlcnZlcktleXNUeXBlLFxuICBkZXZpY2VzVG9VcGRhdGU/OiBBcnJheTxudW1iZXI+XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpO1xuICBjb25zdCBzZXNzaW9uU3RvcmUgPSBuZXcgU2Vzc2lvbnMoeyBvdXJVdWlkIH0pO1xuICBjb25zdCBpZGVudGl0eUtleVN0b3JlID0gbmV3IElkZW50aXR5S2V5cyh7IG91clV1aWQgfSk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgcmVzcG9uc2UuZGV2aWNlcy5tYXAoYXN5bmMgZGV2aWNlID0+IHtcbiAgICAgIGNvbnN0IHsgZGV2aWNlSWQsIHJlZ2lzdHJhdGlvbklkLCBwcmVLZXksIHNpZ25lZFByZUtleSB9ID0gZGV2aWNlO1xuICAgICAgaWYgKFxuICAgICAgICBkZXZpY2VzVG9VcGRhdGUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAhZGV2aWNlc1RvVXBkYXRlLmluY2x1ZGVzKGRldmljZUlkKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGRldmljZS5yZWdpc3RyYXRpb25JZCA9PT0gMCkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICBgaGFuZGxlU2VydmVyS2V5cy8ke2lkZW50aWZpZXJ9OiBHb3QgZGV2aWNlIHJlZ2lzdHJhdGlvbklkIHplcm8hYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKCFzaWduZWRQcmVLZXkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBnZXRLZXlzRm9ySWRlbnRpZmllci8ke2lkZW50aWZpZXJ9OiBNaXNzaW5nIHNpZ25lZCBwcmVrZXkgZm9yIGRldmljZUlkICR7ZGV2aWNlSWR9YFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY29uc3QgdGhlaXJVdWlkID0gVVVJRC5jaGVja2VkTG9va3VwKGlkZW50aWZpZXIpO1xuICAgICAgY29uc3QgcHJvdG9jb2xBZGRyZXNzID0gUHJvdG9jb2xBZGRyZXNzLm5ldyhcbiAgICAgICAgdGhlaXJVdWlkLnRvU3RyaW5nKCksXG4gICAgICAgIGRldmljZUlkXG4gICAgICApO1xuICAgICAgY29uc3QgcHJlS2V5SWQgPSBwcmVLZXk/LmtleUlkIHx8IG51bGw7XG4gICAgICBjb25zdCBwcmVLZXlPYmplY3QgPSBwcmVLZXlcbiAgICAgICAgPyBQdWJsaWNLZXkuZGVzZXJpYWxpemUoQnVmZmVyLmZyb20ocHJlS2V5LnB1YmxpY0tleSkpXG4gICAgICAgIDogbnVsbDtcbiAgICAgIGNvbnN0IHNpZ25lZFByZUtleU9iamVjdCA9IFB1YmxpY0tleS5kZXNlcmlhbGl6ZShcbiAgICAgICAgQnVmZmVyLmZyb20oc2lnbmVkUHJlS2V5LnB1YmxpY0tleSlcbiAgICAgICk7XG4gICAgICBjb25zdCBpZGVudGl0eUtleSA9IFB1YmxpY0tleS5kZXNlcmlhbGl6ZShcbiAgICAgICAgQnVmZmVyLmZyb20ocmVzcG9uc2UuaWRlbnRpdHlLZXkpXG4gICAgICApO1xuXG4gICAgICBjb25zdCBwcmVLZXlCdW5kbGUgPSBQcmVLZXlCdW5kbGUubmV3KFxuICAgICAgICByZWdpc3RyYXRpb25JZCxcbiAgICAgICAgZGV2aWNlSWQsXG4gICAgICAgIHByZUtleUlkLFxuICAgICAgICBwcmVLZXlPYmplY3QsXG4gICAgICAgIHNpZ25lZFByZUtleS5rZXlJZCxcbiAgICAgICAgc2lnbmVkUHJlS2V5T2JqZWN0LFxuICAgICAgICBCdWZmZXIuZnJvbShzaWduZWRQcmVLZXkuc2lnbmF0dXJlKSxcbiAgICAgICAgaWRlbnRpdHlLZXlcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGFkZHJlc3MgPSBuZXcgUXVhbGlmaWVkQWRkcmVzcyhcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgICAgbmV3IEFkZHJlc3ModGhlaXJVdWlkLCBkZXZpY2VJZClcbiAgICAgICk7XG4gICAgICBhd2FpdCB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sXG4gICAgICAgIC5lbnF1ZXVlU2Vzc2lvbkpvYihhZGRyZXNzLCAoKSA9PlxuICAgICAgICAgIHByb2Nlc3NQcmVLZXlCdW5kbGUoXG4gICAgICAgICAgICBwcmVLZXlCdW5kbGUsXG4gICAgICAgICAgICBwcm90b2NvbEFkZHJlc3MsXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmUsXG4gICAgICAgICAgICBpZGVudGl0eUtleVN0b3JlXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yPy5tZXNzYWdlPy5pbmNsdWRlcygndW50cnVzdGVkIGlkZW50aXR5IGZvciBhZGRyZXNzJykpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICAgICAgZXJyb3IuaWRlbnRpdHlLZXkgPSByZXNwb25zZS5pZGVudGl0eUtleTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH0pO1xuICAgIH0pXG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsOEJBS087QUFFUCxvQkFJTztBQUNQLDZCQUF1QztBQUN2QyxxQkFBd0I7QUFDeEIsOEJBQWlDO0FBQ2pDLGtCQUFxQjtBQUVyQixVQUFxQjtBQUNyQixzQkFBeUI7QUFFekIsb0NBQ0UsWUFDQSxRQUNBLGlCQUNBLFdBQ3dDO0FBQ3hDLE1BQUk7QUFDRixVQUFNLEVBQUUsTUFBTSxvQkFBb0IsTUFBTSxjQUN0QyxZQUNBLFFBQ0EsU0FDRjtBQUVBLFVBQU0saUJBQWlCLFlBQVksTUFBTSxlQUFlO0FBRXhELFdBQU87QUFBQSxNQUNMO0FBQUEsSUFDRjtBQUFBLEVBQ0YsU0FBUyxPQUFQO0FBQ0EsUUFBSSxpQkFBaUIsMkJBQWEsTUFBTSxTQUFTLEtBQUs7QUFDcEQsWUFBTSxZQUFZLGlCQUFLLE9BQU8sVUFBVTtBQUV4QyxVQUFJLFdBQVc7QUFDYixjQUFNLE9BQU8sV0FBVyxRQUFRLFNBQVMsbUJBQW1CLFNBQVM7QUFBQSxNQUN2RTtBQUVBLFlBQU0sSUFBSSxvQ0FBc0IsWUFBWSxLQUFLO0FBQUEsSUFD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
