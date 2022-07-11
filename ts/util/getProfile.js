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
var getProfile_exports = {};
__export(getProfile_exports, {
  getProfile: () => getProfile
});
module.exports = __toCommonJS(getProfile_exports);
var import_SealedSender = require("../types/SealedSender");
var Errors = __toESM(require("../types/errors"));
var import_Errors = require("../textsecure/Errors");
var import_Address = require("../types/Address");
var import_QualifiedAddress = require("../types/QualifiedAddress");
var Bytes = __toESM(require("../Bytes"));
var import_Crypto = require("../Crypto");
var import_zkgroup = require("./zkgroup");
var import_whatTypeOfConversation = require("./whatTypeOfConversation");
var log = __toESM(require("../logging/log"));
var import_userLanguages = require("./userLanguages");
var import_parseBadgesFromServer = require("../badges/parseBadgesFromServer");
var import_assert = require("./assert");
async function doGetProfile(c) {
  const idForLogging = c.idForLogging();
  const { messaging } = window.textsecure;
  (0, import_assert.strictAssert)(messaging, "getProfile: window.textsecure.messaging not available");
  const { updatesUrl } = window.SignalContext.config;
  (0, import_assert.strictAssert)(typeof updatesUrl === "string", "getProfile: expected updatesUrl to be a defined string");
  const clientZkProfileCipher = (0, import_zkgroup.getClientZkProfileOperations)(window.getServerPublicParams());
  const userLanguages = (0, import_userLanguages.getUserLanguages)(navigator.languages, window.getLocale());
  let profile;
  c.deriveAccessKeyIfNeeded();
  const profileKey = c.get("profileKey");
  const profileKeyVersion = c.deriveProfileKeyVersion();
  const uuid = c.getCheckedUuid("getProfile");
  const existingProfileKeyCredential = c.get("profileKeyCredential");
  const lastProfile = c.get("lastProfile");
  let profileCredentialRequestContext;
  let getProfileOptions;
  let accessKey = c.get("accessKey");
  if (profileKey) {
    (0, import_assert.strictAssert)(profileKeyVersion && accessKey, "profileKeyVersion and accessKey are derived from profileKey");
    if (existingProfileKeyCredential) {
      getProfileOptions = {
        accessKey,
        profileKeyVersion,
        userLanguages
      };
    } else {
      log.info(`getProfile: generating profile key credential request for conversation ${idForLogging}`);
      let profileKeyCredentialRequestHex;
      ({
        requestHex: profileKeyCredentialRequestHex,
        context: profileCredentialRequestContext
      } = (0, import_zkgroup.generateProfileKeyCredentialRequest)(clientZkProfileCipher, uuid.toString(), profileKey));
      getProfileOptions = {
        accessKey,
        userLanguages,
        profileKeyVersion,
        profileKeyCredentialRequest: profileKeyCredentialRequestHex
      };
    }
  } else {
    (0, import_assert.strictAssert)(!accessKey, "accessKey have to be absent because there is no profileKey");
    if (lastProfile?.profileKeyVersion) {
      getProfileOptions = {
        userLanguages,
        profileKeyVersion: lastProfile.profileKeyVersion
      };
    } else {
      getProfileOptions = { userLanguages };
    }
  }
  const isVersioned = Boolean(getProfileOptions.profileKeyVersion);
  log.info(`getProfile: getting ${isVersioned ? "versioned" : "unversioned"} profile for conversation ${idForLogging}`);
  try {
    if (getProfileOptions.accessKey) {
      try {
        profile = await messaging.getProfile(uuid, getProfileOptions);
      } catch (error) {
        if (!(error instanceof import_Errors.HTTPError)) {
          throw error;
        }
        if (error.code === 401 || error.code === 403) {
          if ((0, import_whatTypeOfConversation.isMe)(c.attributes)) {
            throw error;
          }
          await c.setProfileKey(void 0);
          return doGetProfile(c);
        }
        if (error.code === 404) {
          await c.removeLastProfile(lastProfile);
        }
        throw error;
      }
    } else {
      try {
        profile = await messaging.getProfile(uuid, getProfileOptions);
      } catch (error) {
        if (error instanceof import_Errors.HTTPError && error.code === 404) {
          log.info(`getProfile: failed to find a profile for ${idForLogging}`);
          await c.removeLastProfile(lastProfile);
          if (!isVersioned) {
            log.info(`getProfile: marking ${idForLogging} as unregistered`);
            c.setUnregistered();
          }
        }
        throw error;
      }
    }
    if (profile.identityKey) {
      const identityKey = Bytes.fromBase64(profile.identityKey);
      const changed = await window.textsecure.storage.protocol.saveIdentity(new import_Address.Address(uuid, 1), identityKey, false);
      if (changed) {
        const ourUuid = window.textsecure.storage.user.getCheckedUuid();
        await window.textsecure.storage.protocol.archiveSession(new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(uuid, 1)));
      }
    }
    accessKey = c.get("accessKey");
    if (profile.unrestrictedUnidentifiedAccess && profile.unidentifiedAccess) {
      log.info(`getProfile: setting sealedSender to UNRESTRICTED for conversation ${idForLogging}`);
      c.set({
        sealedSender: import_SealedSender.SEALED_SENDER.UNRESTRICTED
      });
    } else if (accessKey && profile.unidentifiedAccess) {
      const haveCorrectKey = (0, import_Crypto.verifyAccessKey)(Bytes.fromBase64(accessKey), Bytes.fromBase64(profile.unidentifiedAccess));
      if (haveCorrectKey) {
        log.info(`getProfile: setting sealedSender to ENABLED for conversation ${idForLogging}`);
        c.set({
          sealedSender: import_SealedSender.SEALED_SENDER.ENABLED
        });
      } else {
        log.warn(`getProfile: setting sealedSender to DISABLED for conversation ${idForLogging}`);
        c.set({
          sealedSender: import_SealedSender.SEALED_SENDER.DISABLED
        });
      }
    } else {
      log.info(`getProfile: setting sealedSender to DISABLED for conversation ${idForLogging}`);
      c.set({
        sealedSender: import_SealedSender.SEALED_SENDER.DISABLED
      });
    }
    const rawDecryptionKey = c.get("profileKey") || lastProfile?.profileKey;
    const decryptionKey2 = rawDecryptionKey ? Bytes.fromBase64(rawDecryptionKey) : void 0;
    if (profile.about) {
      if (decryptionKey2) {
        const decrypted = (0, import_Crypto.decryptProfile)(Bytes.fromBase64(profile.about), decryptionKey2);
        c.set("about", Bytes.toString((0, import_Crypto.trimForDisplay)(decrypted)));
      }
    } else {
      c.unset("about");
    }
    if (profile.aboutEmoji) {
      if (decryptionKey2) {
        const decrypted = (0, import_Crypto.decryptProfile)(Bytes.fromBase64(profile.aboutEmoji), decryptionKey2);
        c.set("aboutEmoji", Bytes.toString((0, import_Crypto.trimForDisplay)(decrypted)));
      }
    } else {
      c.unset("aboutEmoji");
    }
    if (profile.paymentAddress && (0, import_whatTypeOfConversation.isMe)(c.attributes)) {
      window.storage.put("paymentAddress", profile.paymentAddress);
    }
    if (profile.capabilities) {
      c.set({ capabilities: profile.capabilities });
    } else {
      c.unset("capabilities");
    }
    const badges = (0, import_parseBadgesFromServer.parseBadgesFromServer)(profile.badges, updatesUrl);
    if (badges.length) {
      await window.reduxActions.badges.updateOrCreate(badges);
      c.set({
        badges: badges.map((badge) => ({
          id: badge.id,
          ..."expiresAt" in badge ? {
            expiresAt: badge.expiresAt,
            isVisible: badge.isVisible
          } : {}
        }))
      });
    } else {
      c.unset("badges");
    }
    if (profileCredentialRequestContext) {
      if (profile.credential) {
        const profileKeyCredential = (0, import_zkgroup.handleProfileKeyCredential)(clientZkProfileCipher, profileCredentialRequestContext, profile.credential);
        c.set({ profileKeyCredential });
      } else {
        c.unset("profileKeyCredential");
      }
    }
  } catch (error) {
    if (!(error instanceof import_Errors.HTTPError)) {
      throw error;
    }
    switch (error.code) {
      case 401:
      case 403:
        if (c.get("sealedSender") === import_SealedSender.SEALED_SENDER.ENABLED || c.get("sealedSender") === import_SealedSender.SEALED_SENDER.UNRESTRICTED) {
          log.warn(`getProfile: Got 401/403 when using accessKey for ${idForLogging}, removing profileKey`);
          if (!(0, import_whatTypeOfConversation.isMe)(c.attributes)) {
            await c.setProfileKey(void 0);
          }
        }
        if (c.get("sealedSender") === import_SealedSender.SEALED_SENDER.UNKNOWN) {
          log.warn(`getProfile: Got 401/403 when using accessKey for ${idForLogging}, setting sealedSender = DISABLED`);
          c.set("sealedSender", import_SealedSender.SEALED_SENDER.DISABLED);
        }
        return;
      default:
        log.warn("getProfile failure:", idForLogging, Errors.toLogFormat(error));
        return;
    }
  }
  const decryptionKeyString = profileKey || lastProfile?.profileKey;
  const decryptionKey = decryptionKeyString ? Bytes.fromBase64(decryptionKeyString) : void 0;
  let isSuccessfullyDecrypted = true;
  if (profile.name) {
    if (decryptionKey) {
      try {
        await c.setEncryptedProfileName(profile.name, decryptionKey);
      } catch (error) {
        log.warn("getProfile decryption failure:", idForLogging, Errors.toLogFormat(error));
        isSuccessfullyDecrypted = false;
        await c.set({
          profileName: void 0,
          profileFamilyName: void 0
        });
      }
    }
  } else {
    c.set({
      profileName: void 0,
      profileFamilyName: void 0
    });
  }
  try {
    if (decryptionKey) {
      await c.setProfileAvatar(profile.avatar, decryptionKey);
    }
  } catch (error) {
    if (error instanceof import_Errors.HTTPError) {
      if (error.code === 403 || error.code === 404) {
        log.warn(`getProfile: profile avatar is missing for conversation ${idForLogging}`);
      }
    } else {
      log.warn(`getProfile: failed to decrypt avatar for conversation ${idForLogging}`, Errors.toLogFormat(error));
      isSuccessfullyDecrypted = false;
    }
  }
  c.set("profileLastFetchedAt", Date.now());
  if (isSuccessfullyDecrypted && profileKey && getProfileOptions.profileKeyVersion) {
    await c.updateLastProfile(lastProfile, {
      profileKey,
      profileKeyVersion: getProfileOptions.profileKeyVersion
    });
  }
  window.Signal.Data.updateConversation(c.attributes);
}
async function getProfile(providedUuid, providedE164) {
  const id = window.ConversationController.ensureContactIds({
    uuid: providedUuid,
    e164: providedE164
  });
  const c = window.ConversationController.get(id);
  if (!c) {
    log.error("getProfile: failed to find conversation; doing nothing");
    return;
  }
  await doGetProfile(c);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getProfile
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0UHJvZmlsZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUHJvZmlsZUtleUNyZWRlbnRpYWxSZXF1ZXN0Q29udGV4dCB9IGZyb20gJ0BzaWduYWxhcHAvbGlic2lnbmFsLWNsaWVudC96a2dyb3VwJztcbmltcG9ydCB7IFNFQUxFRF9TRU5ERVIgfSBmcm9tICcuLi90eXBlcy9TZWFsZWRTZW5kZXInO1xuaW1wb3J0ICogYXMgRXJyb3JzIGZyb20gJy4uL3R5cGVzL2Vycm9ycyc7XG5pbXBvcnQgdHlwZSB7XG4gIEdldFByb2ZpbGVPcHRpb25zVHlwZSxcbiAgR2V0UHJvZmlsZVVuYXV0aE9wdGlvbnNUeXBlLFxufSBmcm9tICcuLi90ZXh0c2VjdXJlL1dlYkFQSSc7XG5pbXBvcnQgeyBIVFRQRXJyb3IgfSBmcm9tICcuLi90ZXh0c2VjdXJlL0Vycm9ycyc7XG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSAnLi4vdHlwZXMvQWRkcmVzcyc7XG5pbXBvcnQgeyBRdWFsaWZpZWRBZGRyZXNzIH0gZnJvbSAnLi4vdHlwZXMvUXVhbGlmaWVkQWRkcmVzcyc7XG5pbXBvcnQgKiBhcyBCeXRlcyBmcm9tICcuLi9CeXRlcyc7XG5pbXBvcnQgeyB0cmltRm9yRGlzcGxheSwgdmVyaWZ5QWNjZXNzS2V5LCBkZWNyeXB0UHJvZmlsZSB9IGZyb20gJy4uL0NyeXB0byc7XG5pbXBvcnQge1xuICBnZW5lcmF0ZVByb2ZpbGVLZXlDcmVkZW50aWFsUmVxdWVzdCxcbiAgZ2V0Q2xpZW50WmtQcm9maWxlT3BlcmF0aW9ucyxcbiAgaGFuZGxlUHJvZmlsZUtleUNyZWRlbnRpYWwsXG59IGZyb20gJy4vemtncm91cCc7XG5pbXBvcnQgeyBpc01lIH0gZnJvbSAnLi93aGF0VHlwZU9mQ29udmVyc2F0aW9uJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgZ2V0VXNlckxhbmd1YWdlcyB9IGZyb20gJy4vdXNlckxhbmd1YWdlcyc7XG5pbXBvcnQgeyBwYXJzZUJhZGdlc0Zyb21TZXJ2ZXIgfSBmcm9tICcuLi9iYWRnZXMvcGFyc2VCYWRnZXNGcm9tU2VydmVyJztcbmltcG9ydCB7IHN0cmljdEFzc2VydCB9IGZyb20gJy4vYXNzZXJ0JztcblxuYXN5bmMgZnVuY3Rpb24gZG9HZXRQcm9maWxlKGM6IENvbnZlcnNhdGlvbk1vZGVsKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGlkRm9yTG9nZ2luZyA9IGMuaWRGb3JMb2dnaW5nKCk7XG4gIGNvbnN0IHsgbWVzc2FnaW5nIH0gPSB3aW5kb3cudGV4dHNlY3VyZTtcbiAgc3RyaWN0QXNzZXJ0KFxuICAgIG1lc3NhZ2luZyxcbiAgICAnZ2V0UHJvZmlsZTogd2luZG93LnRleHRzZWN1cmUubWVzc2FnaW5nIG5vdCBhdmFpbGFibGUnXG4gICk7XG5cbiAgY29uc3QgeyB1cGRhdGVzVXJsIH0gPSB3aW5kb3cuU2lnbmFsQ29udGV4dC5jb25maWc7XG4gIHN0cmljdEFzc2VydChcbiAgICB0eXBlb2YgdXBkYXRlc1VybCA9PT0gJ3N0cmluZycsXG4gICAgJ2dldFByb2ZpbGU6IGV4cGVjdGVkIHVwZGF0ZXNVcmwgdG8gYmUgYSBkZWZpbmVkIHN0cmluZydcbiAgKTtcblxuICBjb25zdCBjbGllbnRaa1Byb2ZpbGVDaXBoZXIgPSBnZXRDbGllbnRaa1Byb2ZpbGVPcGVyYXRpb25zKFxuICAgIHdpbmRvdy5nZXRTZXJ2ZXJQdWJsaWNQYXJhbXMoKVxuICApO1xuXG4gIGNvbnN0IHVzZXJMYW5ndWFnZXMgPSBnZXRVc2VyTGFuZ3VhZ2VzKFxuICAgIG5hdmlnYXRvci5sYW5ndWFnZXMsXG4gICAgd2luZG93LmdldExvY2FsZSgpXG4gICk7XG5cbiAgbGV0IHByb2ZpbGU7XG5cbiAgYy5kZXJpdmVBY2Nlc3NLZXlJZk5lZWRlZCgpO1xuXG4gIGNvbnN0IHByb2ZpbGVLZXkgPSBjLmdldCgncHJvZmlsZUtleScpO1xuICBjb25zdCBwcm9maWxlS2V5VmVyc2lvbiA9IGMuZGVyaXZlUHJvZmlsZUtleVZlcnNpb24oKTtcbiAgY29uc3QgdXVpZCA9IGMuZ2V0Q2hlY2tlZFV1aWQoJ2dldFByb2ZpbGUnKTtcbiAgY29uc3QgZXhpc3RpbmdQcm9maWxlS2V5Q3JlZGVudGlhbCA9IGMuZ2V0KCdwcm9maWxlS2V5Q3JlZGVudGlhbCcpO1xuICBjb25zdCBsYXN0UHJvZmlsZSA9IGMuZ2V0KCdsYXN0UHJvZmlsZScpO1xuXG4gIGxldCBwcm9maWxlQ3JlZGVudGlhbFJlcXVlc3RDb250ZXh0OlxuICAgIHwgdW5kZWZpbmVkXG4gICAgfCBQcm9maWxlS2V5Q3JlZGVudGlhbFJlcXVlc3RDb250ZXh0O1xuXG4gIGxldCBnZXRQcm9maWxlT3B0aW9uczogR2V0UHJvZmlsZU9wdGlvbnNUeXBlIHwgR2V0UHJvZmlsZVVuYXV0aE9wdGlvbnNUeXBlO1xuXG4gIGxldCBhY2Nlc3NLZXkgPSBjLmdldCgnYWNjZXNzS2V5Jyk7XG4gIGlmIChwcm9maWxlS2V5KSB7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgcHJvZmlsZUtleVZlcnNpb24gJiYgYWNjZXNzS2V5LFxuICAgICAgJ3Byb2ZpbGVLZXlWZXJzaW9uIGFuZCBhY2Nlc3NLZXkgYXJlIGRlcml2ZWQgZnJvbSBwcm9maWxlS2V5J1xuICAgICk7XG5cbiAgICBpZiAoZXhpc3RpbmdQcm9maWxlS2V5Q3JlZGVudGlhbCkge1xuICAgICAgZ2V0UHJvZmlsZU9wdGlvbnMgPSB7XG4gICAgICAgIGFjY2Vzc0tleSxcbiAgICAgICAgcHJvZmlsZUtleVZlcnNpb24sXG4gICAgICAgIHVzZXJMYW5ndWFnZXMsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgJ2dldFByb2ZpbGU6IGdlbmVyYXRpbmcgcHJvZmlsZSBrZXkgY3JlZGVudGlhbCByZXF1ZXN0IGZvciAnICtcbiAgICAgICAgICBgY29udmVyc2F0aW9uICR7aWRGb3JMb2dnaW5nfWBcbiAgICAgICk7XG5cbiAgICAgIGxldCBwcm9maWxlS2V5Q3JlZGVudGlhbFJlcXVlc3RIZXg6IHVuZGVmaW5lZCB8IHN0cmluZztcbiAgICAgICh7XG4gICAgICAgIHJlcXVlc3RIZXg6IHByb2ZpbGVLZXlDcmVkZW50aWFsUmVxdWVzdEhleCxcbiAgICAgICAgY29udGV4dDogcHJvZmlsZUNyZWRlbnRpYWxSZXF1ZXN0Q29udGV4dCxcbiAgICAgIH0gPSBnZW5lcmF0ZVByb2ZpbGVLZXlDcmVkZW50aWFsUmVxdWVzdChcbiAgICAgICAgY2xpZW50WmtQcm9maWxlQ2lwaGVyLFxuICAgICAgICB1dWlkLnRvU3RyaW5nKCksXG4gICAgICAgIHByb2ZpbGVLZXlcbiAgICAgICkpO1xuXG4gICAgICBnZXRQcm9maWxlT3B0aW9ucyA9IHtcbiAgICAgICAgYWNjZXNzS2V5LFxuICAgICAgICB1c2VyTGFuZ3VhZ2VzLFxuICAgICAgICBwcm9maWxlS2V5VmVyc2lvbixcbiAgICAgICAgcHJvZmlsZUtleUNyZWRlbnRpYWxSZXF1ZXN0OiBwcm9maWxlS2V5Q3JlZGVudGlhbFJlcXVlc3RIZXgsXG4gICAgICB9O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzdHJpY3RBc3NlcnQoXG4gICAgICAhYWNjZXNzS2V5LFxuICAgICAgJ2FjY2Vzc0tleSBoYXZlIHRvIGJlIGFic2VudCBiZWNhdXNlIHRoZXJlIGlzIG5vIHByb2ZpbGVLZXknXG4gICAgKTtcblxuICAgIGlmIChsYXN0UHJvZmlsZT8ucHJvZmlsZUtleVZlcnNpb24pIHtcbiAgICAgIGdldFByb2ZpbGVPcHRpb25zID0ge1xuICAgICAgICB1c2VyTGFuZ3VhZ2VzLFxuICAgICAgICBwcm9maWxlS2V5VmVyc2lvbjogbGFzdFByb2ZpbGUucHJvZmlsZUtleVZlcnNpb24sXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBnZXRQcm9maWxlT3B0aW9ucyA9IHsgdXNlckxhbmd1YWdlcyB9O1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGlzVmVyc2lvbmVkID0gQm9vbGVhbihnZXRQcm9maWxlT3B0aW9ucy5wcm9maWxlS2V5VmVyc2lvbik7XG4gIGxvZy5pbmZvKFxuICAgIGBnZXRQcm9maWxlOiBnZXR0aW5nICR7aXNWZXJzaW9uZWQgPyAndmVyc2lvbmVkJyA6ICd1bnZlcnNpb25lZCd9IGAgK1xuICAgICAgYHByb2ZpbGUgZm9yIGNvbnZlcnNhdGlvbiAke2lkRm9yTG9nZ2luZ31gXG4gICk7XG5cbiAgdHJ5IHtcbiAgICBpZiAoZ2V0UHJvZmlsZU9wdGlvbnMuYWNjZXNzS2V5KSB7XG4gICAgICB0cnkge1xuICAgICAgICBwcm9maWxlID0gYXdhaXQgbWVzc2FnaW5nLmdldFByb2ZpbGUodXVpZCwgZ2V0UHJvZmlsZU9wdGlvbnMpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBIVFRQRXJyb3IpKSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT09IDQwMSB8fCBlcnJvci5jb2RlID09PSA0MDMpIHtcbiAgICAgICAgICBpZiAoaXNNZShjLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhd2FpdCBjLnNldFByb2ZpbGVLZXkodW5kZWZpbmVkKTtcblxuICAgICAgICAgIC8vIFJldHJ5IGZldGNoIHVzaW5nIGxhc3Qga25vd24gcHJvZmlsZUtleVZlcnNpb24gb3IgZmV0Y2hcbiAgICAgICAgICAvLyB1bnZlcnNpb25lZCBwcm9maWxlLlxuICAgICAgICAgIHJldHVybiBkb0dldFByb2ZpbGUoYyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXJyb3IuY29kZSA9PT0gNDA0KSB7XG4gICAgICAgICAgYXdhaXQgYy5yZW1vdmVMYXN0UHJvZmlsZShsYXN0UHJvZmlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gV2Ugd29uJ3QgZ2V0IHRoZSBjcmVkZW50aWFsLCBidXQgbGV0cyBlaXRoZXIgZmV0Y2g6XG4gICAgICAgIC8vIC0gYSB2ZXJzaW9uZWQgcHJvZmlsZSB1c2luZyBsYXN0IGtub3duIHByb2ZpbGVLZXlWZXJzaW9uXG4gICAgICAgIC8vIC0gc29tZSBiYXNpYyBwcm9maWxlIGluZm9ybWF0aW9uIChjYXBhYmlsaXRpZXMsIGJhZGdlcywgZXRjKS5cbiAgICAgICAgcHJvZmlsZSA9IGF3YWl0IG1lc3NhZ2luZy5nZXRQcm9maWxlKHV1aWQsIGdldFByb2ZpbGVPcHRpb25zKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEhUVFBFcnJvciAmJiBlcnJvci5jb2RlID09PSA0MDQpIHtcbiAgICAgICAgICBsb2cuaW5mbyhgZ2V0UHJvZmlsZTogZmFpbGVkIHRvIGZpbmQgYSBwcm9maWxlIGZvciAke2lkRm9yTG9nZ2luZ31gKTtcblxuICAgICAgICAgIGF3YWl0IGMucmVtb3ZlTGFzdFByb2ZpbGUobGFzdFByb2ZpbGUpO1xuICAgICAgICAgIGlmICghaXNWZXJzaW9uZWQpIHtcbiAgICAgICAgICAgIGxvZy5pbmZvKGBnZXRQcm9maWxlOiBtYXJraW5nICR7aWRGb3JMb2dnaW5nfSBhcyB1bnJlZ2lzdGVyZWRgKTtcbiAgICAgICAgICAgIGMuc2V0VW5yZWdpc3RlcmVkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcm9maWxlLmlkZW50aXR5S2V5KSB7XG4gICAgICBjb25zdCBpZGVudGl0eUtleSA9IEJ5dGVzLmZyb21CYXNlNjQocHJvZmlsZS5pZGVudGl0eUtleSk7XG4gICAgICBjb25zdCBjaGFuZ2VkID0gYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5zYXZlSWRlbnRpdHkoXG4gICAgICAgIG5ldyBBZGRyZXNzKHV1aWQsIDEpLFxuICAgICAgICBpZGVudGl0eUtleSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAvLyBzYXZlIGlkZW50aXR5IHdpbGwgY2xvc2UgYWxsIHNlc3Npb25zIGV4Y2VwdCBmb3IgLjEsIHNvIHdlXG4gICAgICAgIC8vIG11c3QgY2xvc2UgdGhhdCBvbmUgbWFudWFsbHkuXG4gICAgICAgIGNvbnN0IG91clV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKTtcbiAgICAgICAgYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5hcmNoaXZlU2Vzc2lvbihcbiAgICAgICAgICBuZXcgUXVhbGlmaWVkQWRkcmVzcyhvdXJVdWlkLCBuZXcgQWRkcmVzcyh1dWlkLCAxKSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgYWNjZXNzS2V5IHRvIHByZXZlbnQgcmFjZSBjb25kaXRpb25zLiBTaW5jZSB3ZSBydW4gYXN5bmNocm9ub3VzXG4gICAgLy8gcmVxdWVzdHMgYWJvdmUgLSBpdCBpcyBwb3NzaWJsZSB0aGF0IHNvbWVvbmUgdXBkYXRlcyBvciBlcmFzZXNcbiAgICAvLyB0aGUgcHJvZmlsZSBrZXkgZnJvbSB1bmRlciB1cy5cbiAgICBhY2Nlc3NLZXkgPSBjLmdldCgnYWNjZXNzS2V5Jyk7XG5cbiAgICBpZiAocHJvZmlsZS51bnJlc3RyaWN0ZWRVbmlkZW50aWZpZWRBY2Nlc3MgJiYgcHJvZmlsZS51bmlkZW50aWZpZWRBY2Nlc3MpIHtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICBgZ2V0UHJvZmlsZTogc2V0dGluZyBzZWFsZWRTZW5kZXIgdG8gVU5SRVNUUklDVEVEIGZvciBjb252ZXJzYXRpb24gJHtpZEZvckxvZ2dpbmd9YFxuICAgICAgKTtcbiAgICAgIGMuc2V0KHtcbiAgICAgICAgc2VhbGVkU2VuZGVyOiBTRUFMRURfU0VOREVSLlVOUkVTVFJJQ1RFRCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoYWNjZXNzS2V5ICYmIHByb2ZpbGUudW5pZGVudGlmaWVkQWNjZXNzKSB7XG4gICAgICBjb25zdCBoYXZlQ29ycmVjdEtleSA9IHZlcmlmeUFjY2Vzc0tleShcbiAgICAgICAgQnl0ZXMuZnJvbUJhc2U2NChhY2Nlc3NLZXkpLFxuICAgICAgICBCeXRlcy5mcm9tQmFzZTY0KHByb2ZpbGUudW5pZGVudGlmaWVkQWNjZXNzKVxuICAgICAgKTtcblxuICAgICAgaWYgKGhhdmVDb3JyZWN0S2V5KSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIGBnZXRQcm9maWxlOiBzZXR0aW5nIHNlYWxlZFNlbmRlciB0byBFTkFCTEVEIGZvciBjb252ZXJzYXRpb24gJHtpZEZvckxvZ2dpbmd9YFxuICAgICAgICApO1xuICAgICAgICBjLnNldCh7XG4gICAgICAgICAgc2VhbGVkU2VuZGVyOiBTRUFMRURfU0VOREVSLkVOQUJMRUQsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgYGdldFByb2ZpbGU6IHNldHRpbmcgc2VhbGVkU2VuZGVyIHRvIERJU0FCTEVEIGZvciBjb252ZXJzYXRpb24gJHtpZEZvckxvZ2dpbmd9YFxuICAgICAgICApO1xuICAgICAgICBjLnNldCh7XG4gICAgICAgICAgc2VhbGVkU2VuZGVyOiBTRUFMRURfU0VOREVSLkRJU0FCTEVELFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgIGBnZXRQcm9maWxlOiBzZXR0aW5nIHNlYWxlZFNlbmRlciB0byBESVNBQkxFRCBmb3IgY29udmVyc2F0aW9uICR7aWRGb3JMb2dnaW5nfWBcbiAgICAgICk7XG4gICAgICBjLnNldCh7XG4gICAgICAgIHNlYWxlZFNlbmRlcjogU0VBTEVEX1NFTkRFUi5ESVNBQkxFRCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHJhd0RlY3J5cHRpb25LZXkgPSBjLmdldCgncHJvZmlsZUtleScpIHx8IGxhc3RQcm9maWxlPy5wcm9maWxlS2V5O1xuICAgIGNvbnN0IGRlY3J5cHRpb25LZXkgPSByYXdEZWNyeXB0aW9uS2V5XG4gICAgICA/IEJ5dGVzLmZyb21CYXNlNjQocmF3RGVjcnlwdGlvbktleSlcbiAgICAgIDogdW5kZWZpbmVkO1xuICAgIGlmIChwcm9maWxlLmFib3V0KSB7XG4gICAgICBpZiAoZGVjcnlwdGlvbktleSkge1xuICAgICAgICBjb25zdCBkZWNyeXB0ZWQgPSBkZWNyeXB0UHJvZmlsZShcbiAgICAgICAgICBCeXRlcy5mcm9tQmFzZTY0KHByb2ZpbGUuYWJvdXQpLFxuICAgICAgICAgIGRlY3J5cHRpb25LZXlcbiAgICAgICAgKTtcbiAgICAgICAgYy5zZXQoJ2Fib3V0JywgQnl0ZXMudG9TdHJpbmcodHJpbUZvckRpc3BsYXkoZGVjcnlwdGVkKSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjLnVuc2V0KCdhYm91dCcpO1xuICAgIH1cblxuICAgIGlmIChwcm9maWxlLmFib3V0RW1vamkpIHtcbiAgICAgIGlmIChkZWNyeXB0aW9uS2V5KSB7XG4gICAgICAgIGNvbnN0IGRlY3J5cHRlZCA9IGRlY3J5cHRQcm9maWxlKFxuICAgICAgICAgIEJ5dGVzLmZyb21CYXNlNjQocHJvZmlsZS5hYm91dEVtb2ppKSxcbiAgICAgICAgICBkZWNyeXB0aW9uS2V5XG4gICAgICAgICk7XG4gICAgICAgIGMuc2V0KCdhYm91dEVtb2ppJywgQnl0ZXMudG9TdHJpbmcodHJpbUZvckRpc3BsYXkoZGVjcnlwdGVkKSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjLnVuc2V0KCdhYm91dEVtb2ppJyk7XG4gICAgfVxuXG4gICAgaWYgKHByb2ZpbGUucGF5bWVudEFkZHJlc3MgJiYgaXNNZShjLmF0dHJpYnV0ZXMpKSB7XG4gICAgICB3aW5kb3cuc3RvcmFnZS5wdXQoJ3BheW1lbnRBZGRyZXNzJywgcHJvZmlsZS5wYXltZW50QWRkcmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKHByb2ZpbGUuY2FwYWJpbGl0aWVzKSB7XG4gICAgICBjLnNldCh7IGNhcGFiaWxpdGllczogcHJvZmlsZS5jYXBhYmlsaXRpZXMgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGMudW5zZXQoJ2NhcGFiaWxpdGllcycpO1xuICAgIH1cblxuICAgIGNvbnN0IGJhZGdlcyA9IHBhcnNlQmFkZ2VzRnJvbVNlcnZlcihwcm9maWxlLmJhZGdlcywgdXBkYXRlc1VybCk7XG4gICAgaWYgKGJhZGdlcy5sZW5ndGgpIHtcbiAgICAgIGF3YWl0IHdpbmRvdy5yZWR1eEFjdGlvbnMuYmFkZ2VzLnVwZGF0ZU9yQ3JlYXRlKGJhZGdlcyk7XG4gICAgICBjLnNldCh7XG4gICAgICAgIGJhZGdlczogYmFkZ2VzLm1hcChiYWRnZSA9PiAoe1xuICAgICAgICAgIGlkOiBiYWRnZS5pZCxcbiAgICAgICAgICAuLi4oJ2V4cGlyZXNBdCcgaW4gYmFkZ2VcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIGV4cGlyZXNBdDogYmFkZ2UuZXhwaXJlc0F0LFxuICAgICAgICAgICAgICAgIGlzVmlzaWJsZTogYmFkZ2UuaXNWaXNpYmxlLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHt9KSxcbiAgICAgICAgfSkpLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGMudW5zZXQoJ2JhZGdlcycpO1xuICAgIH1cblxuICAgIGlmIChwcm9maWxlQ3JlZGVudGlhbFJlcXVlc3RDb250ZXh0KSB7XG4gICAgICBpZiAocHJvZmlsZS5jcmVkZW50aWFsKSB7XG4gICAgICAgIGNvbnN0IHByb2ZpbGVLZXlDcmVkZW50aWFsID0gaGFuZGxlUHJvZmlsZUtleUNyZWRlbnRpYWwoXG4gICAgICAgICAgY2xpZW50WmtQcm9maWxlQ2lwaGVyLFxuICAgICAgICAgIHByb2ZpbGVDcmVkZW50aWFsUmVxdWVzdENvbnRleHQsXG4gICAgICAgICAgcHJvZmlsZS5jcmVkZW50aWFsXG4gICAgICAgICk7XG4gICAgICAgIGMuc2V0KHsgcHJvZmlsZUtleUNyZWRlbnRpYWwgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjLnVuc2V0KCdwcm9maWxlS2V5Q3JlZGVudGlhbCcpO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoIShlcnJvciBpbnN0YW5jZW9mIEhUVFBFcnJvcikpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZXJyb3IuY29kZSkge1xuICAgICAgY2FzZSA0MDE6XG4gICAgICBjYXNlIDQwMzpcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGMuZ2V0KCdzZWFsZWRTZW5kZXInKSA9PT0gU0VBTEVEX1NFTkRFUi5FTkFCTEVEIHx8XG4gICAgICAgICAgYy5nZXQoJ3NlYWxlZFNlbmRlcicpID09PSBTRUFMRURfU0VOREVSLlVOUkVTVFJJQ1RFRFxuICAgICAgICApIHtcbiAgICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAgIGBnZXRQcm9maWxlOiBHb3QgNDAxLzQwMyB3aGVuIHVzaW5nIGFjY2Vzc0tleSBmb3IgJHtpZEZvckxvZ2dpbmd9LCByZW1vdmluZyBwcm9maWxlS2V5YFxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKCFpc01lKGMuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIGF3YWl0IGMuc2V0UHJvZmlsZUtleSh1bmRlZmluZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYy5nZXQoJ3NlYWxlZFNlbmRlcicpID09PSBTRUFMRURfU0VOREVSLlVOS05PV04pIHtcbiAgICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAgIGBnZXRQcm9maWxlOiBHb3QgNDAxLzQwMyB3aGVuIHVzaW5nIGFjY2Vzc0tleSBmb3IgJHtpZEZvckxvZ2dpbmd9LCBzZXR0aW5nIHNlYWxlZFNlbmRlciA9IERJU0FCTEVEYFxuICAgICAgICAgICk7XG4gICAgICAgICAgYy5zZXQoJ3NlYWxlZFNlbmRlcicsIFNFQUxFRF9TRU5ERVIuRElTQUJMRUQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgICdnZXRQcm9maWxlIGZhaWx1cmU6JyxcbiAgICAgICAgICBpZEZvckxvZ2dpbmcsXG4gICAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGVjcnlwdGlvbktleVN0cmluZyA9IHByb2ZpbGVLZXkgfHwgbGFzdFByb2ZpbGU/LnByb2ZpbGVLZXk7XG4gIGNvbnN0IGRlY3J5cHRpb25LZXkgPSBkZWNyeXB0aW9uS2V5U3RyaW5nXG4gICAgPyBCeXRlcy5mcm9tQmFzZTY0KGRlY3J5cHRpb25LZXlTdHJpbmcpXG4gICAgOiB1bmRlZmluZWQ7XG5cbiAgbGV0IGlzU3VjY2Vzc2Z1bGx5RGVjcnlwdGVkID0gdHJ1ZTtcbiAgaWYgKHByb2ZpbGUubmFtZSkge1xuICAgIGlmIChkZWNyeXB0aW9uS2V5KSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBjLnNldEVuY3J5cHRlZFByb2ZpbGVOYW1lKHByb2ZpbGUubmFtZSwgZGVjcnlwdGlvbktleSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAnZ2V0UHJvZmlsZSBkZWNyeXB0aW9uIGZhaWx1cmU6JyxcbiAgICAgICAgICBpZEZvckxvZ2dpbmcsXG4gICAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKVxuICAgICAgICApO1xuICAgICAgICBpc1N1Y2Nlc3NmdWxseURlY3J5cHRlZCA9IGZhbHNlO1xuICAgICAgICBhd2FpdCBjLnNldCh7XG4gICAgICAgICAgcHJvZmlsZU5hbWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICBwcm9maWxlRmFtaWx5TmFtZTogdW5kZWZpbmVkLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYy5zZXQoe1xuICAgICAgcHJvZmlsZU5hbWU6IHVuZGVmaW5lZCxcbiAgICAgIHByb2ZpbGVGYW1pbHlOYW1lOiB1bmRlZmluZWQsXG4gICAgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIGlmIChkZWNyeXB0aW9uS2V5KSB7XG4gICAgICBhd2FpdCBjLnNldFByb2ZpbGVBdmF0YXIocHJvZmlsZS5hdmF0YXIsIGRlY3J5cHRpb25LZXkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBIVFRQRXJyb3IpIHtcbiAgICAgIGlmIChlcnJvci5jb2RlID09PSA0MDMgfHwgZXJyb3IuY29kZSA9PT0gNDA0KSB7XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgIGBnZXRQcm9maWxlOiBwcm9maWxlIGF2YXRhciBpcyBtaXNzaW5nIGZvciBjb252ZXJzYXRpb24gJHtpZEZvckxvZ2dpbmd9YFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYGdldFByb2ZpbGU6IGZhaWxlZCB0byBkZWNyeXB0IGF2YXRhciBmb3IgY29udmVyc2F0aW9uICR7aWRGb3JMb2dnaW5nfWAsXG4gICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICk7XG4gICAgICBpc1N1Y2Nlc3NmdWxseURlY3J5cHRlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGMuc2V0KCdwcm9maWxlTGFzdEZldGNoZWRBdCcsIERhdGUubm93KCkpO1xuXG4gIC8vIEFmdGVyIHdlIHN1Y2Nlc3NmdWxseSBkZWNyeXB0ZWQgLSB1cGRhdGUgbGFzdFByb2ZpbGUgcHJvcGVydHlcbiAgaWYgKFxuICAgIGlzU3VjY2Vzc2Z1bGx5RGVjcnlwdGVkICYmXG4gICAgcHJvZmlsZUtleSAmJlxuICAgIGdldFByb2ZpbGVPcHRpb25zLnByb2ZpbGVLZXlWZXJzaW9uXG4gICkge1xuICAgIGF3YWl0IGMudXBkYXRlTGFzdFByb2ZpbGUobGFzdFByb2ZpbGUsIHtcbiAgICAgIHByb2ZpbGVLZXksXG4gICAgICBwcm9maWxlS2V5VmVyc2lvbjogZ2V0UHJvZmlsZU9wdGlvbnMucHJvZmlsZUtleVZlcnNpb24sXG4gICAgfSk7XG4gIH1cblxuICB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQ29udmVyc2F0aW9uKGMuYXR0cmlidXRlcyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQcm9maWxlKFxuICBwcm92aWRlZFV1aWQ/OiBzdHJpbmcsXG4gIHByb3ZpZGVkRTE2ND86IHN0cmluZ1xuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGlkID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZW5zdXJlQ29udGFjdElkcyh7XG4gICAgdXVpZDogcHJvdmlkZWRVdWlkLFxuICAgIGUxNjQ6IHByb3ZpZGVkRTE2NCxcbiAgfSk7XG4gIGNvbnN0IGMgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoaWQpO1xuICBpZiAoIWMpIHtcbiAgICBsb2cuZXJyb3IoJ2dldFByb2ZpbGU6IGZhaWxlZCB0byBmaW5kIGNvbnZlcnNhdGlvbjsgZG9pbmcgbm90aGluZycpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGF3YWl0IGRvR2V0UHJvZmlsZShjKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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c0IsY0FBYyxhQUFhO0FBQ3ZELFFBQU0sZ0JBQWdCLHNCQUNsQixNQUFNLFdBQVcsbUJBQW1CLElBQ3BDO0FBRUosTUFBSSwwQkFBMEI7QUFDOUIsTUFBSSxRQUFRLE1BQU07QUFDaEIsUUFBSSxlQUFlO0FBQ2pCLFVBQUk7QUFDRixjQUFNLEVBQUUsd0JBQXdCLFFBQVEsTUFBTSxhQUFhO0FBQUEsTUFDN0QsU0FBUyxPQUFQO0FBQ0EsWUFBSSxLQUNGLGtDQUNBLGNBQ0EsT0FBTyxZQUFZLEtBQUssQ0FDMUI7QUFDQSxrQ0FBMEI7QUFDMUIsY0FBTSxFQUFFLElBQUk7QUFBQSxVQUNWLGFBQWE7QUFBQSxVQUNiLG1CQUFtQjtBQUFBLFFBQ3JCLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLEVBQ0YsT0FBTztBQUNMLE1BQUUsSUFBSTtBQUFBLE1BQ0osYUFBYTtBQUFBLE1BQ2IsbUJBQW1CO0FBQUEsSUFDckIsQ0FBQztBQUFBLEVBQ0g7QUFFQSxNQUFJO0FBQ0YsUUFBSSxlQUFlO0FBQ2pCLFlBQU0sRUFBRSxpQkFBaUIsUUFBUSxRQUFRLGFBQWE7QUFBQSxJQUN4RDtBQUFBLEVBQ0YsU0FBUyxPQUFQO0FBQ0EsUUFBSSxpQkFBaUIseUJBQVc7QUFDOUIsVUFBSSxNQUFNLFNBQVMsT0FBTyxNQUFNLFNBQVMsS0FBSztBQUM1QyxZQUFJLEtBQ0YsMERBQTBELGNBQzVEO0FBQUEsTUFDRjtBQUFBLElBQ0YsT0FBTztBQUNMLFVBQUksS0FDRix5REFBeUQsZ0JBQ3pELE9BQU8sWUFBWSxLQUFLLENBQzFCO0FBQ0EsZ0NBQTBCO0FBQUEsSUFDNUI7QUFBQSxFQUNGO0FBRUEsSUFBRSxJQUFJLHdCQUF3QixLQUFLLElBQUksQ0FBQztBQUd4QyxNQUNFLDJCQUNBLGNBQ0Esa0JBQWtCLG1CQUNsQjtBQUNBLFVBQU0sRUFBRSxrQkFBa0IsYUFBYTtBQUFBLE1BQ3JDO0FBQUEsTUFDQSxtQkFBbUIsa0JBQWtCO0FBQUEsSUFDdkMsQ0FBQztBQUFBLEVBQ0g7QUFFQSxTQUFPLE9BQU8sS0FBSyxtQkFBbUIsRUFBRSxVQUFVO0FBQ3BEO0FBblhlLEFBcVhmLDBCQUNFLGNBQ0EsY0FDZTtBQUNmLFFBQU0sS0FBSyxPQUFPLHVCQUF1QixpQkFBaUI7QUFBQSxJQUN4RCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUixDQUFDO0FBQ0QsUUFBTSxJQUFJLE9BQU8sdUJBQXVCLElBQUksRUFBRTtBQUM5QyxNQUFJLENBQUMsR0FBRztBQUNOLFFBQUksTUFBTSx3REFBd0Q7QUFDbEU7QUFBQSxFQUNGO0FBRUEsUUFBTSxhQUFhLENBQUM7QUFDdEI7QUFmc0IiLAogICJuYW1lcyI6IFtdCn0K
