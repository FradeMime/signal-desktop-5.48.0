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
var ConversationController_exports = {};
__export(ConversationController_exports, {
  ConversationController: () => ConversationController,
  start: () => start
});
module.exports = __toCommonJS(ConversationController_exports);
var import_lodash = require("lodash");
var import_p_queue = __toESM(require("p-queue"));
var import_Client = __toESM(require("./sql/Client"));
var import_helpers = require("./messages/helpers");
var import_groups = require("./groups");
var import_assert = require("./util/assert");
var import_whatTypeOfConversation = require("./util/whatTypeOfConversation");
var import_getConversationUnreadCountForAppBadge = require("./util/getConversationUnreadCountForAppBadge");
var import_UUID = require("./types/UUID");
var import_Address = require("./types/Address");
var import_QualifiedAddress = require("./types/QualifiedAddress");
var log = __toESM(require("./logging/log"));
var import_sleep = require("./util/sleep");
var import_isNotNil = require("./util/isNotNil");
var import_durations = require("./util/durations");
const MAX_MESSAGE_BODY_LENGTH = 64 * 1024;
const {
  getAllConversations,
  getAllGroupsInvolvingUuid,
  getMessagesBySentAt,
  migrateConversationMessages,
  removeConversation,
  saveConversation,
  updateConversation
} = import_Client.default;
function start() {
  const conversations = new window.Whisper.ConversationCollection();
  window.getConversations = () => conversations;
  window.ConversationController = new ConversationController(conversations);
}
class ConversationController {
  constructor(_conversations) {
    this._conversations = _conversations;
    this._initialFetchComplete = false;
    this._conversationOpenStart = /* @__PURE__ */ new Map();
    this._hasQueueEmptied = false;
    const debouncedUpdateUnreadCount = (0, import_lodash.debounce)(this.updateUnreadCount.bind(this), import_durations.SECOND, {
      leading: true,
      maxWait: import_durations.SECOND,
      trailing: true
    });
    window.Whisper.events.on("updateUnreadCount", debouncedUpdateUnreadCount);
    this._conversations.on("add remove change:active_at change:unreadCount change:markedUnread change:isArchived change:muteExpiresAt", debouncedUpdateUnreadCount);
    this._conversations.on("add", (model) => {
      model.startMuteTimer();
    });
  }
  updateUnreadCount() {
    if (!this._hasQueueEmptied) {
      return;
    }
    const canCountMutedConversations = window.storage.get("badge-count-muted-conversations") || false;
    const newUnreadCount = this._conversations.reduce((result, conversation) => result + (0, import_getConversationUnreadCountForAppBadge.getConversationUnreadCountForAppBadge)(conversation.attributes, canCountMutedConversations), 0);
    window.storage.put("unreadCount", newUnreadCount);
    if (newUnreadCount > 0) {
      window.setBadgeCount(newUnreadCount);
      window.document.title = `${window.getTitle()} (${newUnreadCount})`;
    } else {
      window.setBadgeCount(0);
      window.document.title = window.getTitle();
    }
    window.updateTrayIcon(newUnreadCount);
  }
  onEmpty() {
    this._hasQueueEmptied = true;
    this.updateUnreadCount();
  }
  get(id) {
    if (!this._initialFetchComplete) {
      throw new Error("ConversationController.get() needs complete initial fetch");
    }
    return this._conversations.get(id);
  }
  getAll() {
    return this._conversations.models;
  }
  dangerouslyCreateAndAdd(attributes) {
    return this._conversations.add(attributes);
  }
  dangerouslyRemoveById(id) {
    this._conversations.remove(id);
    this._conversations.resetLookups();
  }
  getOrCreate(identifier, type, additionalInitialProps = {}) {
    if (typeof identifier !== "string") {
      throw new TypeError("'id' must be a string");
    }
    if (type !== "private" && type !== "group") {
      throw new TypeError(`'type' must be 'private' or 'group'; got: '${type}'`);
    }
    if (!this._initialFetchComplete) {
      throw new Error("ConversationController.get() needs complete initial fetch");
    }
    let conversation = this._conversations.get(identifier);
    if (conversation) {
      return conversation;
    }
    const id = import_UUID.UUID.generate().toString();
    if (type === "group") {
      conversation = this._conversations.add({
        id,
        uuid: null,
        e164: null,
        groupId: identifier,
        type,
        version: 2,
        ...additionalInitialProps
      });
    } else if ((0, import_UUID.isValidUuid)(identifier)) {
      conversation = this._conversations.add({
        id,
        uuid: identifier,
        e164: null,
        groupId: null,
        type,
        version: 2,
        ...additionalInitialProps
      });
    } else {
      conversation = this._conversations.add({
        id,
        uuid: null,
        e164: identifier,
        groupId: null,
        type,
        version: 2,
        ...additionalInitialProps
      });
    }
    const create = /* @__PURE__ */ __name(async () => {
      if (!conversation.isValid()) {
        const validationError = conversation.validationError || {};
        log.error("Contact is not valid. Not saving, but adding to collection:", conversation.idForLogging(), validationError.stack);
        return conversation;
      }
      try {
        if ((0, import_whatTypeOfConversation.isGroupV1)(conversation.attributes)) {
          (0, import_groups.maybeDeriveGroupV2Id)(conversation);
        }
        await saveConversation(conversation.attributes);
      } catch (error) {
        log.error("Conversation save failed! ", identifier, type, "Error:", error && error.stack ? error.stack : error);
        throw error;
      }
      return conversation;
    }, "create");
    conversation.initialPromise = create();
    return conversation;
  }
  async getOrCreateAndWait(id, type, additionalInitialProps = {}) {
    await this.load();
    const conversation = this.getOrCreate(id, type, additionalInitialProps);
    if (conversation) {
      await conversation.initialPromise;
      return conversation;
    }
    throw new Error("getOrCreateAndWait: did not get conversation");
  }
  getConversationId(address) {
    if (!address) {
      return null;
    }
    const [id] = window.textsecure.utils.unencodeNumber(address);
    const conv = this.get(id);
    if (conv) {
      return conv.get("id");
    }
    return null;
  }
  getOurConversationId() {
    const e164 = window.textsecure.storage.user.getNumber();
    const uuid = window.textsecure.storage.user.getUuid()?.toString();
    return this.ensureContactIds({
      e164,
      uuid,
      highTrust: true,
      reason: "getOurConversationId"
    });
  }
  getOurConversationIdOrThrow() {
    const conversationId = this.getOurConversationId();
    if (!conversationId) {
      throw new Error("getOurConversationIdOrThrow: Failed to fetch ourConversationId");
    }
    return conversationId;
  }
  getOurConversation() {
    const conversationId = this.getOurConversationId();
    return conversationId ? this.get(conversationId) : void 0;
  }
  getOurConversationOrThrow() {
    const conversation = this.getOurConversation();
    if (!conversation) {
      throw new Error("getOurConversationOrThrow: Failed to fetch our own conversation");
    }
    return conversation;
  }
  areWePrimaryDevice() {
    const ourDeviceId = window.textsecure.storage.user.getDeviceId();
    return ourDeviceId === 1;
  }
  ensureContactIds({
    e164,
    uuid,
    highTrust,
    reason
  }) {
    const normalizedUuid = uuid ? uuid.toLowerCase() : void 0;
    const identifier = normalizedUuid || e164;
    if (!e164 && !uuid || !identifier) {
      return void 0;
    }
    const convoE164 = this.get(e164);
    const convoUuid = this.get(normalizedUuid);
    if (!convoE164 && !convoUuid) {
      log.info("ensureContactIds: Creating new contact, no matches found", highTrust ? reason : "no reason");
      const newConvo = this.getOrCreate(identifier, "private");
      if (highTrust && e164) {
        newConvo.updateE164(e164);
      }
      if (normalizedUuid) {
        newConvo.updateUuid(normalizedUuid);
      }
      if (highTrust && e164 || normalizedUuid) {
        updateConversation(newConvo.attributes);
      }
      return newConvo.get("id");
    }
    if (convoE164 && !convoUuid) {
      const haveUuid = Boolean(normalizedUuid);
      log.info(`ensureContactIds: e164-only match found (have UUID: ${haveUuid})`);
      if (!normalizedUuid) {
        return convoE164.get("id");
      }
      if (normalizedUuid && !convoE164.get("uuid")) {
        if (highTrust) {
          log.info(`ensureContactIds: Adding UUID (${uuid}) to e164-only match (${e164}), reason: ${reason}`);
          convoE164.updateUuid(normalizedUuid);
          updateConversation(convoE164.attributes);
        }
        return convoE164.get("id");
      }
      log.info("ensureContactIds: e164 already had UUID, creating a new contact");
      const newConvo = this.getOrCreate(normalizedUuid, "private");
      if (highTrust) {
        log.info(`ensureContactIds: Moving e164 (${e164}) from old contact (${convoE164.get("uuid")}) to new (${uuid}), reason: ${reason}`);
        convoE164.set({ e164: void 0 });
        updateConversation(convoE164.attributes);
        newConvo.updateE164(e164);
        updateConversation(newConvo.attributes);
      }
      return newConvo.get("id");
    }
    if (!convoE164 && convoUuid) {
      if (e164 && highTrust) {
        log.info(`ensureContactIds: Adding e164 (${e164}) to UUID-only match (${uuid}), reason: ${reason}`);
        convoUuid.updateE164(e164);
        updateConversation(convoUuid.attributes);
      }
      return convoUuid.get("id");
    }
    if (!convoE164 || !convoUuid) {
      throw new Error("ensureContactIds: convoE164 or convoUuid are falsey!");
    }
    if (convoE164 === convoUuid) {
      return convoUuid.get("id");
    }
    if (highTrust) {
      if (convoE164.get("uuid") && convoE164.get("uuid") !== normalizedUuid) {
        log.info(`ensureContactIds: e164 match (${e164}) had different UUID(${convoE164.get("uuid")}) than incoming pair (${uuid}), removing its e164, reason: ${reason}`);
        convoE164.set({ e164: void 0 });
        updateConversation(convoE164.attributes);
        convoUuid.updateE164(e164);
        updateConversation(convoUuid.attributes);
        return convoUuid.get("id");
      }
      log.warn(`ensureContactIds: Found a split contact - UUID ${normalizedUuid} and E164 ${e164}. Merging.`);
      convoUuid.updateE164(e164);
      this.combineConversations(convoUuid, convoE164).then(() => {
        window.Whisper.events.trigger("refreshConversation", {
          newId: convoUuid.get("id"),
          oldId: convoE164.get("id")
        });
      }).catch((error) => {
        const errorText = error && error.stack ? error.stack : error;
        log.warn(`ensureContactIds error combining contacts: ${errorText}`);
      });
    }
    return convoUuid.get("id");
  }
  async checkForConflicts() {
    log.info("checkForConflicts: starting...");
    const byUuid = /* @__PURE__ */ Object.create(null);
    const byE164 = /* @__PURE__ */ Object.create(null);
    const byGroupV2Id = /* @__PURE__ */ Object.create(null);
    const { models } = this._conversations;
    for (let i = models.length - 1; i >= 0; i -= 1) {
      const conversation = models[i];
      (0, import_assert.assert)(conversation, "Expected conversation to be found in array during iteration");
      const uuid = conversation.get("uuid");
      const e164 = conversation.get("e164");
      if (uuid) {
        const existing = byUuid[uuid];
        if (!existing) {
          byUuid[uuid] = conversation;
        } else {
          log.warn(`checkForConflicts: Found conflict with uuid ${uuid}`);
          if (conversation.get("e164")) {
            await this.combineConversations(conversation, existing);
            byUuid[uuid] = conversation;
          } else {
            await this.combineConversations(existing, conversation);
          }
        }
      }
      if (e164) {
        const existing = byE164[e164];
        if (!existing) {
          byE164[e164] = conversation;
        } else {
          if (conversation.get("uuid") && existing.get("uuid") && conversation.get("uuid") !== existing.get("uuid")) {
            log.warn(`checkForConflicts: Found two matches on e164 ${e164} with different truthy UUIDs. Dropping e164 on older.`);
            existing.set({ e164: void 0 });
            updateConversation(existing.attributes);
            byE164[e164] = conversation;
            continue;
          }
          log.warn(`checkForConflicts: Found conflict with e164 ${e164}`);
          if (conversation.get("uuid")) {
            await this.combineConversations(conversation, existing);
            byE164[e164] = conversation;
          } else {
            await this.combineConversations(existing, conversation);
          }
        }
      }
      let groupV2Id;
      if ((0, import_whatTypeOfConversation.isGroupV1)(conversation.attributes)) {
        (0, import_groups.maybeDeriveGroupV2Id)(conversation);
        groupV2Id = conversation.get("derivedGroupV2Id");
        (0, import_assert.assert)(groupV2Id, "checkForConflicts: expected the group V2 ID to have been derived, but it was falsy");
      } else if ((0, import_whatTypeOfConversation.isGroupV2)(conversation.attributes)) {
        groupV2Id = conversation.get("groupId");
      }
      if (groupV2Id) {
        const existing = byGroupV2Id[groupV2Id];
        if (!existing) {
          byGroupV2Id[groupV2Id] = conversation;
        } else {
          const logParenthetical = (0, import_whatTypeOfConversation.isGroupV1)(conversation.attributes) ? " (derived from a GV1 group ID)" : "";
          log.warn(`checkForConflicts: Found conflict with group V2 ID ${groupV2Id}${logParenthetical}`);
          if ((0, import_whatTypeOfConversation.isGroupV2)(conversation.attributes) && !(0, import_whatTypeOfConversation.isGroupV2)(existing.attributes)) {
            await this.combineConversations(conversation, existing);
            byGroupV2Id[groupV2Id] = conversation;
          } else {
            await this.combineConversations(existing, conversation);
          }
        }
      }
    }
    log.info("checkForConflicts: complete!");
  }
  async combineConversations(current, obsolete) {
    const conversationType = current.get("type");
    if (obsolete.get("type") !== conversationType) {
      (0, import_assert.assert)(false, "combineConversations cannot combine a private and group conversation. Doing nothing");
      return;
    }
    const obsoleteId = obsolete.get("id");
    const obsoleteUuid = obsolete.getUuid();
    const currentId = current.get("id");
    log.warn("combineConversations: Combining two conversations", {
      obsolete: obsoleteId,
      current: currentId
    });
    if (conversationType === "private" && obsoleteUuid) {
      if (!current.get("profileKey") && obsolete.get("profileKey")) {
        log.warn("combineConversations: Copying profile key from old to new contact");
        const profileKey = obsolete.get("profileKey");
        if (profileKey) {
          await current.setProfileKey(profileKey);
        }
      }
      log.warn("combineConversations: Delete all sessions tied to old conversationId");
      const ourUuid = window.textsecure.storage.user.getCheckedUuid();
      const deviceIds = await window.textsecure.storage.protocol.getDeviceIds({
        ourUuid,
        identifier: obsoleteUuid.toString()
      });
      await Promise.all(deviceIds.map(async (deviceId) => {
        const addr = new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(obsoleteUuid, deviceId));
        await window.textsecure.storage.protocol.removeSession(addr);
      }));
      log.warn("combineConversations: Delete all identity information tied to old conversationId");
      if (obsoleteUuid) {
        await window.textsecure.storage.protocol.removeIdentityKey(obsoleteUuid);
      }
      log.warn("combineConversations: Ensure that all V1 groups have new conversationId instead of old");
      const groups = await this.getAllGroupsInvolvingUuid(obsoleteUuid);
      groups.forEach((group) => {
        const members = group.get("members");
        const withoutObsolete = (0, import_lodash.without)(members, obsoleteId);
        const currentAdded = (0, import_lodash.uniq)([...withoutObsolete, currentId]);
        group.set({
          members: currentAdded
        });
        updateConversation(group.attributes);
      });
    }
    log.warn("combineConversations: Delete the obsolete conversation from the database");
    await removeConversation(obsoleteId);
    log.warn("combineConversations: Update messages table");
    await migrateConversationMessages(obsoleteId, currentId);
    log.warn("combineConversations: Eliminate old conversation from ConversationController lookups");
    this._conversations.remove(obsolete);
    this._conversations.resetLookups();
    log.warn("combineConversations: Complete!", {
      obsolete: obsoleteId,
      current: currentId
    });
  }
  ensureGroup(groupId, additionalInitProps = {}) {
    return this.getOrCreate(groupId, "group", additionalInitProps).get("id");
  }
  async getConversationForTargetMessage(targetFromId, targetTimestamp) {
    const messages = await getMessagesBySentAt(targetTimestamp);
    const targetMessage = messages.find((m) => (0, import_helpers.getContactId)(m) === targetFromId);
    if (targetMessage) {
      return this.get(targetMessage.conversationId);
    }
    return null;
  }
  async getAllGroupsInvolvingUuid(uuid) {
    const groups = await getAllGroupsInvolvingUuid(uuid.toString());
    return groups.map((group) => {
      const existing = this.get(group.id);
      if (existing) {
        return existing;
      }
      return this._conversations.add(group);
    });
  }
  getByDerivedGroupV2Id(groupId) {
    return this._conversations.find((item) => item.get("derivedGroupV2Id") === groupId);
  }
  reset() {
    delete this._initialPromise;
    this._initialFetchComplete = false;
    this._conversations.reset([]);
  }
  load() {
    this._initialPromise || (this._initialPromise = this.doLoad());
    return this._initialPromise;
  }
  async forceRerender(identifiers) {
    let count = 0;
    const conversations = identifiers ? identifiers.map((identifier) => this.get(identifier)).filter(import_isNotNil.isNotNil) : this._conversations.models.slice();
    log.info(`forceRerender: Starting to loop through ${conversations.length} conversations`);
    for (let i = 0, max = conversations.length; i < max; i += 1) {
      const conversation = conversations[i];
      if (conversation.cachedProps) {
        conversation.oldCachedProps = conversation.cachedProps;
        conversation.cachedProps = null;
        conversation.trigger("props-change", conversation, false);
        count += 1;
      }
      if (count % 10 === 0) {
        await (0, import_sleep.sleep)(300);
      }
    }
    log.info(`forceRerender: Updated ${count} conversations`);
  }
  onConvoOpenStart(conversationId) {
    this._conversationOpenStart.set(conversationId, Date.now());
  }
  onConvoMessageMount(conversationId) {
    const loadStart = this._conversationOpenStart.get(conversationId);
    if (loadStart === void 0) {
      return;
    }
    this._conversationOpenStart.delete(conversationId);
    this.get(conversationId)?.onOpenComplete(loadStart);
  }
  repairPinnedConversations() {
    const pinnedIds = window.storage.get("pinnedConversationIds", []);
    for (const id of pinnedIds) {
      const convo = this.get(id);
      if (!convo || convo.get("isPinned")) {
        continue;
      }
      log.warn(`ConversationController: Repairing ${convo.idForLogging()}'s isPinned`);
      convo.set("isPinned", true);
      window.Signal.Data.updateConversation(convo.attributes);
    }
  }
  async doLoad() {
    log.info("ConversationController: starting initial fetch");
    if (this._conversations.length) {
      throw new Error("ConversationController: Already loaded!");
    }
    try {
      const collection = await getAllConversations();
      const temporaryConversations = collection.filter((conversation) => Boolean(conversation.isTemporary));
      if (temporaryConversations.length) {
        log.warn(`ConversationController: Removing ${temporaryConversations.length} temporary conversations`);
      }
      const queue = new import_p_queue.default({
        concurrency: 3,
        timeout: 1e3 * 60 * 2,
        throwOnTimeout: true
      });
      queue.addAll(temporaryConversations.map((item) => async () => {
        await removeConversation(item.id);
      }));
      await queue.onIdle();
      this._conversations.add(collection.filter((conversation) => !conversation.isTemporary));
      this._initialFetchComplete = true;
      await Promise.all(this._conversations.map(async (conversation) => {
        try {
          conversation.fetchContacts();
          const isChanged = (0, import_groups.maybeDeriveGroupV2Id)(conversation);
          if (isChanged) {
            updateConversation(conversation.attributes);
          }
          const draft = conversation.get("draft");
          if (draft && draft.length > MAX_MESSAGE_BODY_LENGTH) {
            conversation.set({
              draft: draft.slice(0, MAX_MESSAGE_BODY_LENGTH)
            });
            updateConversation(conversation.attributes);
          }
          const e164 = conversation.get("e164");
          const uuid = conversation.get("uuid");
          if ((0, import_UUID.isValidUuid)(e164) && uuid) {
            conversation.set({ e164: void 0 });
            updateConversation(conversation.attributes);
            log.info(`Cleaning up conversation(${uuid}) with invalid e164`);
          }
        } catch (error) {
          log.error("ConversationController.load/map: Failed to prepare a conversation", error && error.stack ? error.stack : error);
        }
      }));
      log.info("ConversationController: done with initial fetch");
    } catch (error) {
      log.error("ConversationController: initial fetch failed", error && error.stack ? error.stack : error);
      throw error;
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationController,
  start
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uQ29udHJvbGxlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGRlYm91bmNlLCB1bmlxLCB3aXRob3V0IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQUXVldWUgZnJvbSAncC1xdWV1ZSc7XG5cbmltcG9ydCBkYXRhSW50ZXJmYWNlIGZyb20gJy4vc3FsL0NsaWVudCc7XG5pbXBvcnQgdHlwZSB7XG4gIENvbnZlcnNhdGlvbk1vZGVsQ29sbGVjdGlvblR5cGUsXG4gIENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlLFxuICBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZVR5cGUsXG59IGZyb20gJy4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvbk1vZGVsIH0gZnJvbSAnLi9tb2RlbHMvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBnZXRDb250YWN0SWQgfSBmcm9tICcuL21lc3NhZ2VzL2hlbHBlcnMnO1xuaW1wb3J0IHsgbWF5YmVEZXJpdmVHcm91cFYySWQgfSBmcm9tICcuL2dyb3Vwcyc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7IGlzR3JvdXBWMSwgaXNHcm91cFYyIH0gZnJvbSAnLi91dGlsL3doYXRUeXBlT2ZDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgZ2V0Q29udmVyc2F0aW9uVW5yZWFkQ291bnRGb3JBcHBCYWRnZSB9IGZyb20gJy4vdXRpbC9nZXRDb252ZXJzYXRpb25VbnJlYWRDb3VudEZvckFwcEJhZGdlJztcbmltcG9ydCB7IFVVSUQsIGlzVmFsaWRVdWlkIH0gZnJvbSAnLi90eXBlcy9VVUlEJztcbmltcG9ydCB7IEFkZHJlc3MgfSBmcm9tICcuL3R5cGVzL0FkZHJlc3MnO1xuaW1wb3J0IHsgUXVhbGlmaWVkQWRkcmVzcyB9IGZyb20gJy4vdHlwZXMvUXVhbGlmaWVkQWRkcmVzcyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJy4vdXRpbC9zbGVlcCc7XG5pbXBvcnQgeyBpc05vdE5pbCB9IGZyb20gJy4vdXRpbC9pc05vdE5pbCc7XG5pbXBvcnQgeyBTRUNPTkQgfSBmcm9tICcuL3V0aWwvZHVyYXRpb25zJztcblxuY29uc3QgTUFYX01FU1NBR0VfQk9EWV9MRU5HVEggPSA2NCAqIDEwMjQ7XG5cbmNvbnN0IHtcbiAgZ2V0QWxsQ29udmVyc2F0aW9ucyxcbiAgZ2V0QWxsR3JvdXBzSW52b2x2aW5nVXVpZCxcbiAgZ2V0TWVzc2FnZXNCeVNlbnRBdCxcbiAgbWlncmF0ZUNvbnZlcnNhdGlvbk1lc3NhZ2VzLFxuICByZW1vdmVDb252ZXJzYXRpb24sXG4gIHNhdmVDb252ZXJzYXRpb24sXG4gIHVwZGF0ZUNvbnZlcnNhdGlvbixcbn0gPSBkYXRhSW50ZXJmYWNlO1xuXG4vLyBXZSBoYXZlIHRvIHJ1biB0aGlzIGluIGJhY2tncm91bmQuanMsIGFmdGVyIGFsbCBiYWNrYm9uZSBtb2RlbHMgYW5kIGNvbGxlY3Rpb25zIG9uXG4vLyAgIFdoaXNwZXIuKiBoYXZlIGJlZW4gY3JlYXRlZC4gT25jZSB0aG9zZSBhcmUgaW4gdHlwZXNjcmlwdCB3ZSBjYW4gdXNlIG1vcmUgcmVhc29uYWJsZVxuLy8gICByZXF1aXJlIHN0YXRlbWVudHMgZm9yIHJlZmVyZW5jaW5nIHRoZXNlIHRoaW5ncywgZ2l2aW5nIHVzIG1vcmUgZmxleGliaWxpdHkgaGVyZS5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydCgpOiB2b2lkIHtcbiAgY29uc3QgY29udmVyc2F0aW9ucyA9IG5ldyB3aW5kb3cuV2hpc3Blci5Db252ZXJzYXRpb25Db2xsZWN0aW9uKCk7XG5cbiAgd2luZG93LmdldENvbnZlcnNhdGlvbnMgPSAoKSA9PiBjb252ZXJzYXRpb25zO1xuICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlciA9IG5ldyBDb252ZXJzYXRpb25Db250cm9sbGVyKGNvbnZlcnNhdGlvbnMpO1xufVxuXG5leHBvcnQgY2xhc3MgQ29udmVyc2F0aW9uQ29udHJvbGxlciB7XG4gIHByaXZhdGUgX2luaXRpYWxGZXRjaENvbXBsZXRlID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfaW5pdGlhbFByb21pc2U6IHVuZGVmaW5lZCB8IFByb21pc2U8dm9pZD47XG5cbiAgcHJpdmF0ZSBfY29udmVyc2F0aW9uT3BlblN0YXJ0ID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcblxuICBwcml2YXRlIF9oYXNRdWV1ZUVtcHRpZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb252ZXJzYXRpb25zOiBDb252ZXJzYXRpb25Nb2RlbENvbGxlY3Rpb25UeXBlKSB7XG4gICAgY29uc3QgZGVib3VuY2VkVXBkYXRlVW5yZWFkQ291bnQgPSBkZWJvdW5jZShcbiAgICAgIHRoaXMudXBkYXRlVW5yZWFkQ291bnQuYmluZCh0aGlzKSxcbiAgICAgIFNFQ09ORCxcbiAgICAgIHtcbiAgICAgICAgbGVhZGluZzogdHJ1ZSxcbiAgICAgICAgbWF4V2FpdDogU0VDT05ELFxuICAgICAgICB0cmFpbGluZzogdHJ1ZSxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gQSBmZXcgdGhpbmdzIGNhbiBjYXVzZSB1cyB0byB1cGRhdGUgdGhlIGFwcC1sZXZlbCB1bnJlYWQgY291bnRcbiAgICB3aW5kb3cuV2hpc3Blci5ldmVudHMub24oJ3VwZGF0ZVVucmVhZENvdW50JywgZGVib3VuY2VkVXBkYXRlVW5yZWFkQ291bnQpO1xuICAgIHRoaXMuX2NvbnZlcnNhdGlvbnMub24oXG4gICAgICAnYWRkIHJlbW92ZSBjaGFuZ2U6YWN0aXZlX2F0IGNoYW5nZTp1bnJlYWRDb3VudCBjaGFuZ2U6bWFya2VkVW5yZWFkIGNoYW5nZTppc0FyY2hpdmVkIGNoYW5nZTptdXRlRXhwaXJlc0F0JyxcbiAgICAgIGRlYm91bmNlZFVwZGF0ZVVucmVhZENvdW50XG4gICAgKTtcblxuICAgIC8vIElmIHRoZSBjb252ZXJzYXRpb24gaXMgbXV0ZWQgd2Ugc2V0IGEgdGltZW91dCBzbyB3aGVuIHRoZSBtdXRlIGV4cGlyZXNcbiAgICAvLyB3ZSBjYW4gcmVzZXQgdGhlIG11dGUgc3RhdGUgb24gdGhlIG1vZGVsLiBJZiB0aGUgbXV0ZSBoYXMgYWxyZWFkeSBleHBpcmVkXG4gICAgLy8gdGhlbiB3ZSByZXNldCB0aGUgc3RhdGUgcmlnaHQgYXdheS5cbiAgICB0aGlzLl9jb252ZXJzYXRpb25zLm9uKCdhZGQnLCAobW9kZWw6IENvbnZlcnNhdGlvbk1vZGVsKTogdm9pZCA9PiB7XG4gICAgICBtb2RlbC5zdGFydE11dGVUaW1lcigpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlVW5yZWFkQ291bnQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9oYXNRdWV1ZUVtcHRpZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjYW5Db3VudE11dGVkQ29udmVyc2F0aW9ucyA9XG4gICAgICB3aW5kb3cuc3RvcmFnZS5nZXQoJ2JhZGdlLWNvdW50LW11dGVkLWNvbnZlcnNhdGlvbnMnKSB8fCBmYWxzZTtcblxuICAgIGNvbnN0IG5ld1VucmVhZENvdW50ID0gdGhpcy5fY29udmVyc2F0aW9ucy5yZWR1Y2UoXG4gICAgICAocmVzdWx0OiBudW1iZXIsIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTW9kZWwpID0+XG4gICAgICAgIHJlc3VsdCArXG4gICAgICAgIGdldENvbnZlcnNhdGlvblVucmVhZENvdW50Rm9yQXBwQmFkZ2UoXG4gICAgICAgICAgY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMsXG4gICAgICAgICAgY2FuQ291bnRNdXRlZENvbnZlcnNhdGlvbnNcbiAgICAgICAgKSxcbiAgICAgIDBcbiAgICApO1xuICAgIHdpbmRvdy5zdG9yYWdlLnB1dCgndW5yZWFkQ291bnQnLCBuZXdVbnJlYWRDb3VudCk7XG5cbiAgICBpZiAobmV3VW5yZWFkQ291bnQgPiAwKSB7XG4gICAgICB3aW5kb3cuc2V0QmFkZ2VDb3VudChuZXdVbnJlYWRDb3VudCk7XG4gICAgICB3aW5kb3cuZG9jdW1lbnQudGl0bGUgPSBgJHt3aW5kb3cuZ2V0VGl0bGUoKX0gKCR7bmV3VW5yZWFkQ291bnR9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5zZXRCYWRnZUNvdW50KDApO1xuICAgICAgd2luZG93LmRvY3VtZW50LnRpdGxlID0gd2luZG93LmdldFRpdGxlKCk7XG4gICAgfVxuICAgIHdpbmRvdy51cGRhdGVUcmF5SWNvbihuZXdVbnJlYWRDb3VudCk7XG4gIH1cblxuICBvbkVtcHR5KCk6IHZvaWQge1xuICAgIHRoaXMuX2hhc1F1ZXVlRW1wdGllZCA9IHRydWU7XG4gICAgdGhpcy51cGRhdGVVbnJlYWRDb3VudCgpO1xuICB9XG5cbiAgZ2V0KGlkPzogc3RyaW5nIHwgbnVsbCk6IENvbnZlcnNhdGlvbk1vZGVsIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIXRoaXMuX2luaXRpYWxGZXRjaENvbXBsZXRlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdDb252ZXJzYXRpb25Db250cm9sbGVyLmdldCgpIG5lZWRzIGNvbXBsZXRlIGluaXRpYWwgZmV0Y2gnXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gdGFrZXMgbnVsbCBqdXN0IGZpbmUuIEJhY2tib25lIHR5cGluZ3MgYXJlIHRvbyByZXN0cmljdGl2ZS5cbiAgICByZXR1cm4gdGhpcy5fY29udmVyc2F0aW9ucy5nZXQoaWQgYXMgc3RyaW5nKTtcbiAgfVxuXG4gIGdldEFsbCgpOiBBcnJheTxDb252ZXJzYXRpb25Nb2RlbD4ge1xuICAgIHJldHVybiB0aGlzLl9jb252ZXJzYXRpb25zLm1vZGVscztcbiAgfVxuXG4gIGRhbmdlcm91c2x5Q3JlYXRlQW5kQWRkKFxuICAgIGF0dHJpYnV0ZXM6IFBhcnRpYWw8Q29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGU+XG4gICk6IENvbnZlcnNhdGlvbk1vZGVsIHtcbiAgICByZXR1cm4gdGhpcy5fY29udmVyc2F0aW9ucy5hZGQoYXR0cmlidXRlcyk7XG4gIH1cblxuICBkYW5nZXJvdXNseVJlbW92ZUJ5SWQoaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnZlcnNhdGlvbnMucmVtb3ZlKGlkKTtcbiAgICB0aGlzLl9jb252ZXJzYXRpb25zLnJlc2V0TG9va3VwcygpO1xuICB9XG5cbiAgZ2V0T3JDcmVhdGUoXG4gICAgaWRlbnRpZmllcjogc3RyaW5nIHwgbnVsbCxcbiAgICB0eXBlOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZVR5cGUsXG4gICAgYWRkaXRpb25hbEluaXRpYWxQcm9wcyA9IHt9XG4gICk6IENvbnZlcnNhdGlvbk1vZGVsIHtcbiAgICBpZiAodHlwZW9mIGlkZW50aWZpZXIgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ2lkJyBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIGlmICh0eXBlICE9PSAncHJpdmF0ZScgJiYgdHlwZSAhPT0gJ2dyb3VwJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgYCd0eXBlJyBtdXN0IGJlICdwcml2YXRlJyBvciAnZ3JvdXAnOyBnb3Q6ICcke3R5cGV9J2BcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9pbml0aWFsRmV0Y2hDb21wbGV0ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoKSBuZWVkcyBjb21wbGV0ZSBpbml0aWFsIGZldGNoJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBsZXQgY29udmVyc2F0aW9uID0gdGhpcy5fY29udmVyc2F0aW9ucy5nZXQoaWRlbnRpZmllcik7XG4gICAgaWYgKGNvbnZlcnNhdGlvbikge1xuICAgICAgcmV0dXJuIGNvbnZlcnNhdGlvbjtcbiAgICB9XG5cbiAgICBjb25zdCBpZCA9IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpO1xuXG4gICAgaWYgKHR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgIGNvbnZlcnNhdGlvbiA9IHRoaXMuX2NvbnZlcnNhdGlvbnMuYWRkKHtcbiAgICAgICAgaWQsXG4gICAgICAgIHV1aWQ6IG51bGwsXG4gICAgICAgIGUxNjQ6IG51bGwsXG4gICAgICAgIGdyb3VwSWQ6IGlkZW50aWZpZXIsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIHZlcnNpb246IDIsXG4gICAgICAgIC4uLmFkZGl0aW9uYWxJbml0aWFsUHJvcHMsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzVmFsaWRVdWlkKGlkZW50aWZpZXIpKSB7XG4gICAgICBjb252ZXJzYXRpb24gPSB0aGlzLl9jb252ZXJzYXRpb25zLmFkZCh7XG4gICAgICAgIGlkLFxuICAgICAgICB1dWlkOiBpZGVudGlmaWVyLFxuICAgICAgICBlMTY0OiBudWxsLFxuICAgICAgICBncm91cElkOiBudWxsLFxuICAgICAgICB0eXBlLFxuICAgICAgICB2ZXJzaW9uOiAyLFxuICAgICAgICAuLi5hZGRpdGlvbmFsSW5pdGlhbFByb3BzLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnZlcnNhdGlvbiA9IHRoaXMuX2NvbnZlcnNhdGlvbnMuYWRkKHtcbiAgICAgICAgaWQsXG4gICAgICAgIHV1aWQ6IG51bGwsXG4gICAgICAgIGUxNjQ6IGlkZW50aWZpZXIsXG4gICAgICAgIGdyb3VwSWQ6IG51bGwsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIHZlcnNpb246IDIsXG4gICAgICAgIC4uLmFkZGl0aW9uYWxJbml0aWFsUHJvcHMsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGUgPSBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoIWNvbnZlcnNhdGlvbi5pc1ZhbGlkKCkpIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbkVycm9yID0gY29udmVyc2F0aW9uLnZhbGlkYXRpb25FcnJvciB8fCB7fTtcbiAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICdDb250YWN0IGlzIG5vdCB2YWxpZC4gTm90IHNhdmluZywgYnV0IGFkZGluZyB0byBjb2xsZWN0aW9uOicsXG4gICAgICAgICAgY29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpLFxuICAgICAgICAgIHZhbGlkYXRpb25FcnJvci5zdGFja1xuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBjb252ZXJzYXRpb247XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChpc0dyb3VwVjEoY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgbWF5YmVEZXJpdmVHcm91cFYySWQoY29udmVyc2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBzYXZlQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAnQ29udmVyc2F0aW9uIHNhdmUgZmFpbGVkISAnLFxuICAgICAgICAgIGlkZW50aWZpZXIsXG4gICAgICAgICAgdHlwZSxcbiAgICAgICAgICAnRXJyb3I6JyxcbiAgICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICAgKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb252ZXJzYXRpb247XG4gICAgfTtcblxuICAgIGNvbnZlcnNhdGlvbi5pbml0aWFsUHJvbWlzZSA9IGNyZWF0ZSgpO1xuXG4gICAgcmV0dXJuIGNvbnZlcnNhdGlvbjtcbiAgfVxuXG4gIGFzeW5jIGdldE9yQ3JlYXRlQW5kV2FpdChcbiAgICBpZDogc3RyaW5nIHwgbnVsbCxcbiAgICB0eXBlOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZVR5cGUsXG4gICAgYWRkaXRpb25hbEluaXRpYWxQcm9wcyA9IHt9XG4gICk6IFByb21pc2U8Q29udmVyc2F0aW9uTW9kZWw+IHtcbiAgICBhd2FpdCB0aGlzLmxvYWQoKTtcbiAgICBjb25zdCBjb252ZXJzYXRpb24gPSB0aGlzLmdldE9yQ3JlYXRlKGlkLCB0eXBlLCBhZGRpdGlvbmFsSW5pdGlhbFByb3BzKTtcblxuICAgIGlmIChjb252ZXJzYXRpb24pIHtcbiAgICAgIGF3YWl0IGNvbnZlcnNhdGlvbi5pbml0aWFsUHJvbWlzZTtcbiAgICAgIHJldHVybiBjb252ZXJzYXRpb247XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdnZXRPckNyZWF0ZUFuZFdhaXQ6IGRpZCBub3QgZ2V0IGNvbnZlcnNhdGlvbicpO1xuICB9XG5cbiAgZ2V0Q29udmVyc2F0aW9uSWQoYWRkcmVzczogc3RyaW5nIHwgbnVsbCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICghYWRkcmVzcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgW2lkXSA9IHdpbmRvdy50ZXh0c2VjdXJlLnV0aWxzLnVuZW5jb2RlTnVtYmVyKGFkZHJlc3MpO1xuICAgIGNvbnN0IGNvbnYgPSB0aGlzLmdldChpZCk7XG5cbiAgICBpZiAoY29udikge1xuICAgICAgcmV0dXJuIGNvbnYuZ2V0KCdpZCcpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0T3VyQ29udmVyc2F0aW9uSWQoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBlMTY0ID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldE51bWJlcigpO1xuICAgIGNvbnN0IHV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0VXVpZCgpPy50b1N0cmluZygpO1xuICAgIHJldHVybiB0aGlzLmVuc3VyZUNvbnRhY3RJZHMoe1xuICAgICAgZTE2NCxcbiAgICAgIHV1aWQsXG4gICAgICBoaWdoVHJ1c3Q6IHRydWUsXG4gICAgICByZWFzb246ICdnZXRPdXJDb252ZXJzYXRpb25JZCcsXG4gICAgfSk7XG4gIH1cblxuICBnZXRPdXJDb252ZXJzYXRpb25JZE9yVGhyb3coKTogc3RyaW5nIHtcbiAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IHRoaXMuZ2V0T3VyQ29udmVyc2F0aW9uSWQoKTtcbiAgICBpZiAoIWNvbnZlcnNhdGlvbklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdnZXRPdXJDb252ZXJzYXRpb25JZE9yVGhyb3c6IEZhaWxlZCB0byBmZXRjaCBvdXJDb252ZXJzYXRpb25JZCdcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBjb252ZXJzYXRpb25JZDtcbiAgfVxuXG4gIGdldE91ckNvbnZlcnNhdGlvbigpOiBDb252ZXJzYXRpb25Nb2RlbCB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSB0aGlzLmdldE91ckNvbnZlcnNhdGlvbklkKCk7XG4gICAgcmV0dXJuIGNvbnZlcnNhdGlvbklkID8gdGhpcy5nZXQoY29udmVyc2F0aW9uSWQpIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgZ2V0T3VyQ29udmVyc2F0aW9uT3JUaHJvdygpOiBDb252ZXJzYXRpb25Nb2RlbCB7XG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gdGhpcy5nZXRPdXJDb252ZXJzYXRpb24oKTtcbiAgICBpZiAoIWNvbnZlcnNhdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnZ2V0T3VyQ29udmVyc2F0aW9uT3JUaHJvdzogRmFpbGVkIHRvIGZldGNoIG91ciBvd24gY29udmVyc2F0aW9uJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29udmVyc2F0aW9uO1xuICB9XG5cbiAgYXJlV2VQcmltYXJ5RGV2aWNlKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG91ckRldmljZUlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldERldmljZUlkKCk7XG5cbiAgICByZXR1cm4gb3VyRGV2aWNlSWQgPT09IDE7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYSBVVUlEIGFuZC9vciBhbiBFMTY0LCByZXNvbHZlcyB0byBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGxvY2FsXG4gICAqIGRhdGFiYXNlIGlkIG9mIHRoZSBnaXZlbiBjb250YWN0LiBJbiBoaWdoIHRydXN0IG1vZGUsIGl0IG1heSBjcmVhdGUgbmV3IGNvbnRhY3RzLFxuICAgKiBhbmQgaXQgbWF5IG1lcmdlIGNvbnRhY3RzLlxuICAgKlxuICAgKiBoaWdoVHJ1c3QgPSB1dWlkL2UxNjQgcGFpcmluZyBjYW1lIGZyb20gQ0RTLCB0aGUgc2VydmVyLCBvciB5b3VyIG93biBkZXZpY2VcbiAgICovXG4gIGVuc3VyZUNvbnRhY3RJZHMoe1xuICAgIGUxNjQsXG4gICAgdXVpZCxcbiAgICBoaWdoVHJ1c3QsXG4gICAgcmVhc29uLFxuICB9OlxuICAgIHwge1xuICAgICAgICBlMTY0Pzogc3RyaW5nIHwgbnVsbDtcbiAgICAgICAgdXVpZD86IHN0cmluZyB8IG51bGw7XG4gICAgICAgIGhpZ2hUcnVzdD86IGZhbHNlO1xuICAgICAgICByZWFzb24/OiB2b2lkO1xuICAgICAgfVxuICAgIHwge1xuICAgICAgICBlMTY0Pzogc3RyaW5nIHwgbnVsbDtcbiAgICAgICAgdXVpZD86IHN0cmluZyB8IG51bGw7XG4gICAgICAgIGhpZ2hUcnVzdDogdHJ1ZTtcbiAgICAgICAgcmVhc29uOiBzdHJpbmc7XG4gICAgICB9KTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAvLyBDaGVjayBmb3IgYXQgbGVhc3Qgb25lIHBhcmFtZXRlciBiZWluZyBwcm92aWRlZC4gVGhpcyBpcyBuZWNlc3NhcnlcbiAgICAvLyBiZWNhdXNlIHRoaXMgcGF0aCBjYW4gYmUgY2FsbGVkIG9uIHN0YXJ0dXAgdG8gcmVzb2x2ZSBvdXIgb3duIElEIGJlZm9yZVxuICAgIC8vIG91ciBwaG9uZSBudW1iZXIgb3IgVVVJRCBhcmUga25vd24uIFRoZSBleGlzdGluZyBiZWhhdmlvciBpbiB0aGVzZVxuICAgIC8vIGNhc2VzIGNhbiBoYW5kbGUgYSByZXR1cm5lZCBgdW5kZWZpbmVkYCBpZCwgc28gd2UgZG8gdGhhdC5cbiAgICBjb25zdCBub3JtYWxpemVkVXVpZCA9IHV1aWQgPyB1dWlkLnRvTG93ZXJDYXNlKCkgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgaWRlbnRpZmllciA9IG5vcm1hbGl6ZWRVdWlkIHx8IGUxNjQ7XG5cbiAgICBpZiAoKCFlMTY0ICYmICF1dWlkKSB8fCAhaWRlbnRpZmllcikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBjb252b0UxNjQgPSB0aGlzLmdldChlMTY0KTtcbiAgICBjb25zdCBjb252b1V1aWQgPSB0aGlzLmdldChub3JtYWxpemVkVXVpZCk7XG5cbiAgICAvLyAxLiBIYW5kbGUgbm8gbWF0Y2ggYXQgYWxsXG4gICAgaWYgKCFjb252b0UxNjQgJiYgIWNvbnZvVXVpZCkge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgICdlbnN1cmVDb250YWN0SWRzOiBDcmVhdGluZyBuZXcgY29udGFjdCwgbm8gbWF0Y2hlcyBmb3VuZCcsXG4gICAgICAgIGhpZ2hUcnVzdCA/IHJlYXNvbiA6ICdubyByZWFzb24nXG4gICAgICApO1xuICAgICAgY29uc3QgbmV3Q29udm8gPSB0aGlzLmdldE9yQ3JlYXRlKGlkZW50aWZpZXIsICdwcml2YXRlJyk7XG4gICAgICBpZiAoaGlnaFRydXN0ICYmIGUxNjQpIHtcbiAgICAgICAgbmV3Q29udm8udXBkYXRlRTE2NChlMTY0KTtcbiAgICAgIH1cbiAgICAgIGlmIChub3JtYWxpemVkVXVpZCkge1xuICAgICAgICBuZXdDb252by51cGRhdGVVdWlkKG5vcm1hbGl6ZWRVdWlkKTtcbiAgICAgIH1cbiAgICAgIGlmICgoaGlnaFRydXN0ICYmIGUxNjQpIHx8IG5vcm1hbGl6ZWRVdWlkKSB7XG4gICAgICAgIHVwZGF0ZUNvbnZlcnNhdGlvbihuZXdDb252by5hdHRyaWJ1dGVzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ld0NvbnZvLmdldCgnaWQnKTtcblxuICAgICAgLy8gMi4gSGFuZGxlIG1hdGNoIG9uIG9ubHkgRTE2NFxuICAgIH1cbiAgICBpZiAoY29udm9FMTY0ICYmICFjb252b1V1aWQpIHtcbiAgICAgIGNvbnN0IGhhdmVVdWlkID0gQm9vbGVhbihub3JtYWxpemVkVXVpZCk7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgYGVuc3VyZUNvbnRhY3RJZHM6IGUxNjQtb25seSBtYXRjaCBmb3VuZCAoaGF2ZSBVVUlEOiAke2hhdmVVdWlkfSlgXG4gICAgICApO1xuICAgICAgLy8gSWYgd2UgYXJlIG9ubHkgc2VhcmNoaW5nIGJhc2VkIG9uIGUxNjQgYW55d2F5LCB0aGVuIHJldHVybiB0aGUgZmlyc3QgcmVzdWx0XG4gICAgICBpZiAoIW5vcm1hbGl6ZWRVdWlkKSB7XG4gICAgICAgIHJldHVybiBjb252b0UxNjQuZ2V0KCdpZCcpO1xuICAgICAgfVxuXG4gICAgICAvLyBGaWxsIGluIHRoZSBVVUlEIGZvciBhbiBlMTY0LW9ubHkgY29udGFjdFxuICAgICAgaWYgKG5vcm1hbGl6ZWRVdWlkICYmICFjb252b0UxNjQuZ2V0KCd1dWlkJykpIHtcbiAgICAgICAgaWYgKGhpZ2hUcnVzdCkge1xuICAgICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICAgYGVuc3VyZUNvbnRhY3RJZHM6IEFkZGluZyBVVUlEICgke3V1aWR9KSB0byBlMTY0LW9ubHkgbWF0Y2ggYCArXG4gICAgICAgICAgICAgIGAoJHtlMTY0fSksIHJlYXNvbjogJHtyZWFzb259YFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29udm9FMTY0LnVwZGF0ZVV1aWQobm9ybWFsaXplZFV1aWQpO1xuICAgICAgICAgIHVwZGF0ZUNvbnZlcnNhdGlvbihjb252b0UxNjQuYXR0cmlidXRlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnZvRTE2NC5nZXQoJ2lkJyk7XG4gICAgICB9XG5cbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICAnZW5zdXJlQ29udGFjdElkczogZTE2NCBhbHJlYWR5IGhhZCBVVUlELCBjcmVhdGluZyBhIG5ldyBjb250YWN0J1xuICAgICAgKTtcbiAgICAgIC8vIElmIGV4aXN0aW5nIGUxNjQgbWF0Y2ggYWxyZWFkeSBoYXMgVVVJRCwgY3JlYXRlIGEgbmV3IGNvbnRhY3QuLi5cbiAgICAgIGNvbnN0IG5ld0NvbnZvID0gdGhpcy5nZXRPckNyZWF0ZShub3JtYWxpemVkVXVpZCwgJ3ByaXZhdGUnKTtcblxuICAgICAgaWYgKGhpZ2hUcnVzdCkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICBgZW5zdXJlQ29udGFjdElkczogTW92aW5nIGUxNjQgKCR7ZTE2NH0pIGZyb20gb2xkIGNvbnRhY3QgYCArXG4gICAgICAgICAgICBgKCR7Y29udm9FMTY0LmdldCgndXVpZCcpfSkgdG8gbmV3ICgke3V1aWR9KSwgcmVhc29uOiAke3JlYXNvbn1gXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBlMTY0IGZyb20gdGhlIG9sZCBjb250YWN0Li4uXG4gICAgICAgIGNvbnZvRTE2NC5zZXQoeyBlMTY0OiB1bmRlZmluZWQgfSk7XG4gICAgICAgIHVwZGF0ZUNvbnZlcnNhdGlvbihjb252b0UxNjQuYXR0cmlidXRlcyk7XG5cbiAgICAgICAgLy8gLi4uYW5kIGFkZCBpdCB0byB0aGUgbmV3IG9uZS5cbiAgICAgICAgbmV3Q29udm8udXBkYXRlRTE2NChlMTY0KTtcbiAgICAgICAgdXBkYXRlQ29udmVyc2F0aW9uKG5ld0NvbnZvLmF0dHJpYnV0ZXMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3Q29udm8uZ2V0KCdpZCcpO1xuXG4gICAgICAvLyAzLiBIYW5kbGUgbWF0Y2ggb24gb25seSBVVUlEXG4gICAgfVxuICAgIGlmICghY29udm9FMTY0ICYmIGNvbnZvVXVpZCkge1xuICAgICAgaWYgKGUxNjQgJiYgaGlnaFRydXN0KSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIGBlbnN1cmVDb250YWN0SWRzOiBBZGRpbmcgZTE2NCAoJHtlMTY0fSkgdG8gVVVJRC1vbmx5IG1hdGNoIGAgK1xuICAgICAgICAgICAgYCgke3V1aWR9KSwgcmVhc29uOiAke3JlYXNvbn1gXG4gICAgICAgICk7XG4gICAgICAgIGNvbnZvVXVpZC51cGRhdGVFMTY0KGUxNjQpO1xuICAgICAgICB1cGRhdGVDb252ZXJzYXRpb24oY29udm9VdWlkLmF0dHJpYnV0ZXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnZvVXVpZC5nZXQoJ2lkJyk7XG4gICAgfVxuXG4gICAgLy8gRm9yIHNvbWUgcmVhc29uLCBUeXBlU2NyaXB0IGRvZXNuJ3QgYmVsaWV2ZSB0aGF0IHdlIGNhbiB0cnVzdCB0aGF0IHRoZXNlIHR3byB2YWx1ZXNcbiAgICAvLyAgIGFyZSB0cnV0aHkgYnkgdGhpcyBwb2ludC4gU28gd2UnbGwgdGhyb3cgaWYgd2UgZ2V0IHRoZXJlLlxuICAgIGlmICghY29udm9FMTY0IHx8ICFjb252b1V1aWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZW5zdXJlQ29udGFjdElkczogY29udm9FMTY0IG9yIGNvbnZvVXVpZCBhcmUgZmFsc2V5IScpO1xuICAgIH1cblxuICAgIC8vIE5vdywgd2Uga25vdyB0aGF0IHdlIGhhdmUgYSBtYXRjaCBmb3IgYm90aCBlMTY0IGFuZCB1dWlkIGNoZWNrc1xuXG4gICAgaWYgKGNvbnZvRTE2NCA9PT0gY29udm9VdWlkKSB7XG4gICAgICByZXR1cm4gY29udm9VdWlkLmdldCgnaWQnKTtcbiAgICB9XG5cbiAgICBpZiAoaGlnaFRydXN0KSB7XG4gICAgICAvLyBDb25mbGljdDogSWYgZTE2NCBtYXRjaCBhbHJlYWR5IGhhcyBhIFVVSUQsIHdlIHJlbW92ZSBpdHMgZTE2NC5cbiAgICAgIGlmIChjb252b0UxNjQuZ2V0KCd1dWlkJykgJiYgY29udm9FMTY0LmdldCgndXVpZCcpICE9PSBub3JtYWxpemVkVXVpZCkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICBgZW5zdXJlQ29udGFjdElkczogZTE2NCBtYXRjaCAoJHtlMTY0fSkgaGFkIGRpZmZlcmVudCBgICtcbiAgICAgICAgICAgIGBVVUlEKCR7Y29udm9FMTY0LmdldCgndXVpZCcpfSkgdGhhbiBpbmNvbWluZyBwYWlyICgke3V1aWR9KSwgYCArXG4gICAgICAgICAgICBgcmVtb3ZpbmcgaXRzIGUxNjQsIHJlYXNvbjogJHtyZWFzb259YFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgZTE2NCBmcm9tIHRoZSBvbGQgY29udGFjdC4uLlxuICAgICAgICBjb252b0UxNjQuc2V0KHsgZTE2NDogdW5kZWZpbmVkIH0pO1xuICAgICAgICB1cGRhdGVDb252ZXJzYXRpb24oY29udm9FMTY0LmF0dHJpYnV0ZXMpO1xuXG4gICAgICAgIC8vIC4uLmFuZCBhZGQgaXQgdG8gdGhlIG5ldyBvbmUuXG4gICAgICAgIGNvbnZvVXVpZC51cGRhdGVFMTY0KGUxNjQpO1xuICAgICAgICB1cGRhdGVDb252ZXJzYXRpb24oY29udm9VdWlkLmF0dHJpYnV0ZXMpO1xuXG4gICAgICAgIHJldHVybiBjb252b1V1aWQuZ2V0KCdpZCcpO1xuICAgICAgfVxuXG4gICAgICBsb2cud2FybihcbiAgICAgICAgYGVuc3VyZUNvbnRhY3RJZHM6IEZvdW5kIGEgc3BsaXQgY29udGFjdCAtIFVVSUQgJHtub3JtYWxpemVkVXVpZH0gYW5kIEUxNjQgJHtlMTY0fS4gTWVyZ2luZy5gXG4gICAgICApO1xuXG4gICAgICAvLyBDb25mbGljdDogSWYgZTE2NCBtYXRjaCBoYXMgbm8gVVVJRCwgd2UgbWVyZ2UuIFdlIHByZWZlciB0aGUgVVVJRCBtYXRjaC5cbiAgICAgIC8vIE5vdGU6IG5vIGF3YWl0IGhlcmUsIHdlIHdhbnQgdG8ga2VlcCB0aGlzIGZ1bmN0aW9uIHN5bmNocm9ub3VzXG4gICAgICBjb252b1V1aWQudXBkYXRlRTE2NChlMTY0KTtcbiAgICAgIC8vIGB0aGVuYCBpcyB1c2VkIHRvIHRyaWdnZXIgYXN5bmMgdXBkYXRlcywgbm90IGFmZmVjdGluZyByZXR1cm4gdmFsdWVcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtb3JlL25vLXRoZW5cbiAgICAgIHRoaXMuY29tYmluZUNvbnZlcnNhdGlvbnMoY29udm9VdWlkLCBjb252b0UxNjQpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAvLyBJZiB0aGUgb2xkIGNvbnZlcnNhdGlvbiB3YXMgY3VycmVudGx5IGRpc3BsYXllZCwgd2UgbG9hZCB0aGUgbmV3IG9uZVxuICAgICAgICAgIHdpbmRvdy5XaGlzcGVyLmV2ZW50cy50cmlnZ2VyKCdyZWZyZXNoQ29udmVyc2F0aW9uJywge1xuICAgICAgICAgICAgbmV3SWQ6IGNvbnZvVXVpZC5nZXQoJ2lkJyksXG4gICAgICAgICAgICBvbGRJZDogY29udm9FMTY0LmdldCgnaWQnKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBjb25zdCBlcnJvclRleHQgPSBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3I7XG4gICAgICAgICAgbG9nLndhcm4oYGVuc3VyZUNvbnRhY3RJZHMgZXJyb3IgY29tYmluaW5nIGNvbnRhY3RzOiAke2Vycm9yVGV4dH1gKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnZvVXVpZC5nZXQoJ2lkJyk7XG4gIH1cblxuICBhc3luYyBjaGVja0ZvckNvbmZsaWN0cygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsb2cuaW5mbygnY2hlY2tGb3JDb25mbGljdHM6IHN0YXJ0aW5nLi4uJyk7XG4gICAgY29uc3QgYnlVdWlkID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBjb25zdCBieUUxNjQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIGNvbnN0IGJ5R3JvdXBWMklkID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAvLyBXZSBhbHNvIHdhbnQgdG8gZmluZCBkdXBsaWNhdGUgR1YxIElEcy4gWW91IG1pZ2h0IGV4cGVjdCB0byBzZWUgYSBcImJ5R3JvdXBWMUlkXCIgbWFwXG4gICAgLy8gICBoZXJlLiBJbnN0ZWFkLCB3ZSBjaGVjayBmb3IgZHVwbGljYXRlcyBvbiB0aGUgZGVyaXZlZCBHVjIgSUQuXG5cbiAgICBjb25zdCB7IG1vZGVscyB9ID0gdGhpcy5fY29udmVyc2F0aW9ucztcblxuICAgIC8vIFdlIGl0ZXJhdGUgZnJvbSB0aGUgb2xkZXN0IGNvbnZlcnNhdGlvbnMgdG8gdGhlIG5ld2VzdC4gVGhpcyBhbGxvd3MgdXMsIGluIGFcbiAgICAvLyAgIGNvbmZsaWN0IGNhc2UsIHRvIGtlZXAgdGhlIG9uZSB3aXRoIGFjdGl2aXR5IHRoZSBtb3N0IHJlY2VudGx5LlxuICAgIGZvciAobGV0IGkgPSBtb2RlbHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC09IDEpIHtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IG1vZGVsc1tpXTtcbiAgICAgIGFzc2VydChcbiAgICAgICAgY29udmVyc2F0aW9uLFxuICAgICAgICAnRXhwZWN0ZWQgY29udmVyc2F0aW9uIHRvIGJlIGZvdW5kIGluIGFycmF5IGR1cmluZyBpdGVyYXRpb24nXG4gICAgICApO1xuXG4gICAgICBjb25zdCB1dWlkID0gY29udmVyc2F0aW9uLmdldCgndXVpZCcpO1xuICAgICAgY29uc3QgZTE2NCA9IGNvbnZlcnNhdGlvbi5nZXQoJ2UxNjQnKTtcblxuICAgICAgaWYgKHV1aWQpIHtcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBieVV1aWRbdXVpZF07XG4gICAgICAgIGlmICghZXhpc3RpbmcpIHtcbiAgICAgICAgICBieVV1aWRbdXVpZF0gPSBjb252ZXJzYXRpb247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nLndhcm4oYGNoZWNrRm9yQ29uZmxpY3RzOiBGb3VuZCBjb25mbGljdCB3aXRoIHV1aWQgJHt1dWlkfWApO1xuXG4gICAgICAgICAgLy8gS2VlcCB0aGUgbmV3ZXIgb25lIGlmIGl0IGhhcyBhbiBlMTY0LCBvdGhlcndpc2Uga2VlcCBleGlzdGluZ1xuICAgICAgICAgIGlmIChjb252ZXJzYXRpb24uZ2V0KCdlMTY0JykpIHtcbiAgICAgICAgICAgIC8vIEtlZXAgbmV3IG9uZVxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY29tYmluZUNvbnZlcnNhdGlvbnMoY29udmVyc2F0aW9uLCBleGlzdGluZyk7XG4gICAgICAgICAgICBieVV1aWRbdXVpZF0gPSBjb252ZXJzYXRpb247XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEtlZXAgZXhpc3RpbmcgLSBub3RlIHRoYXQgdGhpcyBhcHBsaWVzIGlmIG5laXRoZXIgaGFkIGFuIGUxNjRcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNvbWJpbmVDb252ZXJzYXRpb25zKGV4aXN0aW5nLCBjb252ZXJzYXRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZTE2NCkge1xuICAgICAgICBjb25zdCBleGlzdGluZyA9IGJ5RTE2NFtlMTY0XTtcbiAgICAgICAgaWYgKCFleGlzdGluZykge1xuICAgICAgICAgIGJ5RTE2NFtlMTY0XSA9IGNvbnZlcnNhdGlvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiB3ZSBoYXZlIHR3byBjb250YWN0cyB3aXRoIHRoZSBzYW1lIGUxNjQgYnV0IGRpZmZlcmVudCB0cnV0aHkgVVVJRHMsIHRoZW5cbiAgICAgICAgICAvLyAgIHdlJ2xsIGRlbGV0ZSB0aGUgZTE2NCBvbiB0aGUgb2xkZXIgb25lXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgY29udmVyc2F0aW9uLmdldCgndXVpZCcpICYmXG4gICAgICAgICAgICBleGlzdGluZy5nZXQoJ3V1aWQnKSAmJlxuICAgICAgICAgICAgY29udmVyc2F0aW9uLmdldCgndXVpZCcpICE9PSBleGlzdGluZy5nZXQoJ3V1aWQnKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgICAgIGBjaGVja0ZvckNvbmZsaWN0czogRm91bmQgdHdvIG1hdGNoZXMgb24gZTE2NCAke2UxNjR9IHdpdGggZGlmZmVyZW50IHRydXRoeSBVVUlEcy4gRHJvcHBpbmcgZTE2NCBvbiBvbGRlci5gXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBleGlzdGluZy5zZXQoeyBlMTY0OiB1bmRlZmluZWQgfSk7XG4gICAgICAgICAgICB1cGRhdGVDb252ZXJzYXRpb24oZXhpc3RpbmcuYXR0cmlidXRlcyk7XG5cbiAgICAgICAgICAgIGJ5RTE2NFtlMTY0XSA9IGNvbnZlcnNhdGlvbjtcblxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbG9nLndhcm4oYGNoZWNrRm9yQ29uZmxpY3RzOiBGb3VuZCBjb25mbGljdCB3aXRoIGUxNjQgJHtlMTY0fWApO1xuXG4gICAgICAgICAgLy8gS2VlcCB0aGUgbmV3ZXIgb25lIGlmIGl0IGhhcyBhIFVVSUQsIG90aGVyd2lzZSBrZWVwIGV4aXN0aW5nXG4gICAgICAgICAgaWYgKGNvbnZlcnNhdGlvbi5nZXQoJ3V1aWQnKSkge1xuICAgICAgICAgICAgLy8gS2VlcCBuZXcgb25lXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jb21iaW5lQ29udmVyc2F0aW9ucyhjb252ZXJzYXRpb24sIGV4aXN0aW5nKTtcbiAgICAgICAgICAgIGJ5RTE2NFtlMTY0XSA9IGNvbnZlcnNhdGlvbjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gS2VlcCBleGlzdGluZyAtIG5vdGUgdGhhdCB0aGlzIGFwcGxpZXMgaWYgbmVpdGhlciBoYWQgYSBVVUlEXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jb21iaW5lQ29udmVyc2F0aW9ucyhleGlzdGluZywgY29udmVyc2F0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGdyb3VwVjJJZDogdW5kZWZpbmVkIHwgc3RyaW5nO1xuICAgICAgaWYgKGlzR3JvdXBWMShjb252ZXJzYXRpb24uYXR0cmlidXRlcykpIHtcbiAgICAgICAgbWF5YmVEZXJpdmVHcm91cFYySWQoY29udmVyc2F0aW9uKTtcbiAgICAgICAgZ3JvdXBWMklkID0gY29udmVyc2F0aW9uLmdldCgnZGVyaXZlZEdyb3VwVjJJZCcpO1xuICAgICAgICBhc3NlcnQoXG4gICAgICAgICAgZ3JvdXBWMklkLFxuICAgICAgICAgICdjaGVja0ZvckNvbmZsaWN0czogZXhwZWN0ZWQgdGhlIGdyb3VwIFYyIElEIHRvIGhhdmUgYmVlbiBkZXJpdmVkLCBidXQgaXQgd2FzIGZhbHN5J1xuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChpc0dyb3VwVjIoY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIGdyb3VwVjJJZCA9IGNvbnZlcnNhdGlvbi5nZXQoJ2dyb3VwSWQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGdyb3VwVjJJZCkge1xuICAgICAgICBjb25zdCBleGlzdGluZyA9IGJ5R3JvdXBWMklkW2dyb3VwVjJJZF07XG4gICAgICAgIGlmICghZXhpc3RpbmcpIHtcbiAgICAgICAgICBieUdyb3VwVjJJZFtncm91cFYySWRdID0gY29udmVyc2F0aW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGxvZ1BhcmVudGhldGljYWwgPSBpc0dyb3VwVjEoY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpXG4gICAgICAgICAgICA/ICcgKGRlcml2ZWQgZnJvbSBhIEdWMSBncm91cCBJRCknXG4gICAgICAgICAgICA6ICcnO1xuICAgICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgICAgYGNoZWNrRm9yQ29uZmxpY3RzOiBGb3VuZCBjb25mbGljdCB3aXRoIGdyb3VwIFYyIElEICR7Z3JvdXBWMklkfSR7bG9nUGFyZW50aGV0aWNhbH1gXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIC8vIFByZWZlciB0aGUgR1YyIGdyb3VwLlxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGlzR3JvdXBWMihjb252ZXJzYXRpb24uYXR0cmlidXRlcykgJiZcbiAgICAgICAgICAgICFpc0dyb3VwVjIoZXhpc3RpbmcuYXR0cmlidXRlcylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNvbWJpbmVDb252ZXJzYXRpb25zKGNvbnZlcnNhdGlvbiwgZXhpc3RpbmcpO1xuICAgICAgICAgICAgYnlHcm91cFYySWRbZ3JvdXBWMklkXSA9IGNvbnZlcnNhdGlvbjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY29tYmluZUNvbnZlcnNhdGlvbnMoZXhpc3RpbmcsIGNvbnZlcnNhdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbG9nLmluZm8oJ2NoZWNrRm9yQ29uZmxpY3RzOiBjb21wbGV0ZSEnKTtcbiAgfVxuXG4gIGFzeW5jIGNvbWJpbmVDb252ZXJzYXRpb25zKFxuICAgIGN1cnJlbnQ6IENvbnZlcnNhdGlvbk1vZGVsLFxuICAgIG9ic29sZXRlOiBDb252ZXJzYXRpb25Nb2RlbFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBjb252ZXJzYXRpb25UeXBlID0gY3VycmVudC5nZXQoJ3R5cGUnKTtcblxuICAgIGlmIChvYnNvbGV0ZS5nZXQoJ3R5cGUnKSAhPT0gY29udmVyc2F0aW9uVHlwZSkge1xuICAgICAgYXNzZXJ0KFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgJ2NvbWJpbmVDb252ZXJzYXRpb25zIGNhbm5vdCBjb21iaW5lIGEgcHJpdmF0ZSBhbmQgZ3JvdXAgY29udmVyc2F0aW9uLiBEb2luZyBub3RoaW5nJ1xuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvYnNvbGV0ZUlkID0gb2Jzb2xldGUuZ2V0KCdpZCcpO1xuICAgIGNvbnN0IG9ic29sZXRlVXVpZCA9IG9ic29sZXRlLmdldFV1aWQoKTtcbiAgICBjb25zdCBjdXJyZW50SWQgPSBjdXJyZW50LmdldCgnaWQnKTtcbiAgICBsb2cud2FybignY29tYmluZUNvbnZlcnNhdGlvbnM6IENvbWJpbmluZyB0d28gY29udmVyc2F0aW9ucycsIHtcbiAgICAgIG9ic29sZXRlOiBvYnNvbGV0ZUlkLFxuICAgICAgY3VycmVudDogY3VycmVudElkLFxuICAgIH0pO1xuXG4gICAgaWYgKGNvbnZlcnNhdGlvblR5cGUgPT09ICdwcml2YXRlJyAmJiBvYnNvbGV0ZVV1aWQpIHtcbiAgICAgIGlmICghY3VycmVudC5nZXQoJ3Byb2ZpbGVLZXknKSAmJiBvYnNvbGV0ZS5nZXQoJ3Byb2ZpbGVLZXknKSkge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAnY29tYmluZUNvbnZlcnNhdGlvbnM6IENvcHlpbmcgcHJvZmlsZSBrZXkgZnJvbSBvbGQgdG8gbmV3IGNvbnRhY3QnXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgcHJvZmlsZUtleSA9IG9ic29sZXRlLmdldCgncHJvZmlsZUtleScpO1xuXG4gICAgICAgIGlmIChwcm9maWxlS2V5KSB7XG4gICAgICAgICAgYXdhaXQgY3VycmVudC5zZXRQcm9maWxlS2V5KHByb2ZpbGVLZXkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxvZy53YXJuKFxuICAgICAgICAnY29tYmluZUNvbnZlcnNhdGlvbnM6IERlbGV0ZSBhbGwgc2Vzc2lvbnMgdGllZCB0byBvbGQgY29udmVyc2F0aW9uSWQnXG4gICAgICApO1xuICAgICAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpO1xuICAgICAgY29uc3QgZGV2aWNlSWRzID0gYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5nZXREZXZpY2VJZHMoe1xuICAgICAgICBvdXJVdWlkLFxuICAgICAgICBpZGVudGlmaWVyOiBvYnNvbGV0ZVV1aWQudG9TdHJpbmcoKSxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGRldmljZUlkcy5tYXAoYXN5bmMgZGV2aWNlSWQgPT4ge1xuICAgICAgICAgIGNvbnN0IGFkZHIgPSBuZXcgUXVhbGlmaWVkQWRkcmVzcyhcbiAgICAgICAgICAgIG91clV1aWQsXG4gICAgICAgICAgICBuZXcgQWRkcmVzcyhvYnNvbGV0ZVV1aWQsIGRldmljZUlkKVxuICAgICAgICAgICk7XG4gICAgICAgICAgYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5yZW1vdmVTZXNzaW9uKGFkZHIpO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgbG9nLndhcm4oXG4gICAgICAgICdjb21iaW5lQ29udmVyc2F0aW9uczogRGVsZXRlIGFsbCBpZGVudGl0eSBpbmZvcm1hdGlvbiB0aWVkIHRvIG9sZCBjb252ZXJzYXRpb25JZCdcbiAgICAgICk7XG5cbiAgICAgIGlmIChvYnNvbGV0ZVV1aWQpIHtcbiAgICAgICAgYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5yZW1vdmVJZGVudGl0eUtleShcbiAgICAgICAgICBvYnNvbGV0ZVV1aWRcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgbG9nLndhcm4oXG4gICAgICAgICdjb21iaW5lQ29udmVyc2F0aW9uczogRW5zdXJlIHRoYXQgYWxsIFYxIGdyb3VwcyBoYXZlIG5ldyBjb252ZXJzYXRpb25JZCBpbnN0ZWFkIG9mIG9sZCdcbiAgICAgICk7XG4gICAgICBjb25zdCBncm91cHMgPSBhd2FpdCB0aGlzLmdldEFsbEdyb3Vwc0ludm9sdmluZ1V1aWQob2Jzb2xldGVVdWlkKTtcbiAgICAgIGdyb3Vwcy5mb3JFYWNoKGdyb3VwID0+IHtcbiAgICAgICAgY29uc3QgbWVtYmVycyA9IGdyb3VwLmdldCgnbWVtYmVycycpO1xuICAgICAgICBjb25zdCB3aXRob3V0T2Jzb2xldGUgPSB3aXRob3V0KG1lbWJlcnMsIG9ic29sZXRlSWQpO1xuICAgICAgICBjb25zdCBjdXJyZW50QWRkZWQgPSB1bmlxKFsuLi53aXRob3V0T2Jzb2xldGUsIGN1cnJlbnRJZF0pO1xuXG4gICAgICAgIGdyb3VwLnNldCh7XG4gICAgICAgICAgbWVtYmVyczogY3VycmVudEFkZGVkLFxuICAgICAgICB9KTtcbiAgICAgICAgdXBkYXRlQ29udmVyc2F0aW9uKGdyb3VwLmF0dHJpYnV0ZXMpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gTm90ZTogd2UgZXhwbGljaXRseSBkb24ndCB3YW50IHRvIHVwZGF0ZSBWMiBncm91cHNcblxuICAgIGxvZy53YXJuKFxuICAgICAgJ2NvbWJpbmVDb252ZXJzYXRpb25zOiBEZWxldGUgdGhlIG9ic29sZXRlIGNvbnZlcnNhdGlvbiBmcm9tIHRoZSBkYXRhYmFzZSdcbiAgICApO1xuICAgIGF3YWl0IHJlbW92ZUNvbnZlcnNhdGlvbihvYnNvbGV0ZUlkKTtcblxuICAgIGxvZy53YXJuKCdjb21iaW5lQ29udmVyc2F0aW9uczogVXBkYXRlIG1lc3NhZ2VzIHRhYmxlJyk7XG4gICAgYXdhaXQgbWlncmF0ZUNvbnZlcnNhdGlvbk1lc3NhZ2VzKG9ic29sZXRlSWQsIGN1cnJlbnRJZCk7XG5cbiAgICBsb2cud2FybihcbiAgICAgICdjb21iaW5lQ29udmVyc2F0aW9uczogRWxpbWluYXRlIG9sZCBjb252ZXJzYXRpb24gZnJvbSBDb252ZXJzYXRpb25Db250cm9sbGVyIGxvb2t1cHMnXG4gICAgKTtcbiAgICB0aGlzLl9jb252ZXJzYXRpb25zLnJlbW92ZShvYnNvbGV0ZSk7XG4gICAgdGhpcy5fY29udmVyc2F0aW9ucy5yZXNldExvb2t1cHMoKTtcblxuICAgIGxvZy53YXJuKCdjb21iaW5lQ29udmVyc2F0aW9uczogQ29tcGxldGUhJywge1xuICAgICAgb2Jzb2xldGU6IG9ic29sZXRlSWQsXG4gICAgICBjdXJyZW50OiBjdXJyZW50SWQsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYSBncm91cElkIGFuZCBvcHRpb25hbCBhZGRpdGlvbmFsIGluaXRpYWxpemF0aW9uIHByb3BlcnRpZXMsXG4gICAqIGVuc3VyZXMgdGhlIGV4aXN0ZW5jZSBvZiBhIGdyb3VwIGNvbnZlcnNhdGlvbiBhbmQgcmV0dXJucyBhIHN0cmluZ1xuICAgKiByZXByZXNlbnRpbmcgdGhlIGxvY2FsIGRhdGFiYXNlIElEIG9mIHRoZSBncm91cCBjb252ZXJzYXRpb24uXG4gICAqL1xuICBlbnN1cmVHcm91cChncm91cElkOiBzdHJpbmcsIGFkZGl0aW9uYWxJbml0UHJvcHMgPSB7fSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T3JDcmVhdGUoZ3JvdXBJZCwgJ2dyb3VwJywgYWRkaXRpb25hbEluaXRQcm9wcykuZ2V0KCdpZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGNlcnRhaW4gbWV0YWRhdGEgYWJvdXQgYSBtZXNzYWdlIChhbiBpZGVudGlmaWVyIG9mIHdobyB3cm90ZSB0aGVcbiAgICogbWVzc2FnZSBhbmQgdGhlIHNlbnRfYXQgdGltZXN0YW1wIG9mIHRoZSBtZXNzYWdlKSByZXR1cm5zIHRoZVxuICAgKiBjb252ZXJzYXRpb24gdGhlIG1lc3NhZ2UgYmVsb25ncyB0byBPUiBudWxsIGlmIGEgY29udmVyc2F0aW9uIGlzbid0XG4gICAqIGZvdW5kLlxuICAgKi9cbiAgYXN5bmMgZ2V0Q29udmVyc2F0aW9uRm9yVGFyZ2V0TWVzc2FnZShcbiAgICB0YXJnZXRGcm9tSWQ6IHN0cmluZyxcbiAgICB0YXJnZXRUaW1lc3RhbXA6IG51bWJlclxuICApOiBQcm9taXNlPENvbnZlcnNhdGlvbk1vZGVsIHwgbnVsbCB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IG1lc3NhZ2VzID0gYXdhaXQgZ2V0TWVzc2FnZXNCeVNlbnRBdCh0YXJnZXRUaW1lc3RhbXApO1xuICAgIGNvbnN0IHRhcmdldE1lc3NhZ2UgPSBtZXNzYWdlcy5maW5kKG0gPT4gZ2V0Q29udGFjdElkKG0pID09PSB0YXJnZXRGcm9tSWQpO1xuXG4gICAgaWYgKHRhcmdldE1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCh0YXJnZXRNZXNzYWdlLmNvbnZlcnNhdGlvbklkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGFzeW5jIGdldEFsbEdyb3Vwc0ludm9sdmluZ1V1aWQoXG4gICAgdXVpZDogVVVJRFxuICApOiBQcm9taXNlPEFycmF5PENvbnZlcnNhdGlvbk1vZGVsPj4ge1xuICAgIGNvbnN0IGdyb3VwcyA9IGF3YWl0IGdldEFsbEdyb3Vwc0ludm9sdmluZ1V1aWQodXVpZC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gZ3JvdXBzLm1hcChncm91cCA9PiB7XG4gICAgICBjb25zdCBleGlzdGluZyA9IHRoaXMuZ2V0KGdyb3VwLmlkKTtcbiAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICByZXR1cm4gZXhpc3Rpbmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9jb252ZXJzYXRpb25zLmFkZChncm91cCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRCeURlcml2ZWRHcm91cFYySWQoZ3JvdXBJZDogc3RyaW5nKTogQ29udmVyc2F0aW9uTW9kZWwgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9jb252ZXJzYXRpb25zLmZpbmQoXG4gICAgICBpdGVtID0+IGl0ZW0uZ2V0KCdkZXJpdmVkR3JvdXBWMklkJykgPT09IGdyb3VwSWRcbiAgICApO1xuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgZGVsZXRlIHRoaXMuX2luaXRpYWxQcm9taXNlO1xuICAgIHRoaXMuX2luaXRpYWxGZXRjaENvbXBsZXRlID0gZmFsc2U7XG4gICAgdGhpcy5fY29udmVyc2F0aW9ucy5yZXNldChbXSk7XG4gIH1cblxuICBsb2FkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuX2luaXRpYWxQcm9taXNlIHx8PSB0aGlzLmRvTG9hZCgpO1xuICAgIHJldHVybiB0aGlzLl9pbml0aWFsUHJvbWlzZTtcbiAgfVxuXG4gIC8vIEEgbnVtYmVyIG9mIHRoaW5ncyBvdXRzaWRlIGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzIGFmZmVjdCBjb252ZXJzYXRpb24gcmUtcmVuZGVyaW5nLlxuICAvLyAgIElmIGl0J3Mgc2NvcGVkIHRvIGEgZ2l2ZW4gY29udmVyc2F0aW9uLCBpdCdzIGVhc3kgdG8gdHJpZ2dlcignY2hhbmdlJykuIFRoZXJlIGFyZVxuICAvLyAgIGltcG9ydGFudCB2YWx1ZXMgaW4gc3RvcmFnZSBhbmQgdGhlIHN0b3JhZ2Ugc2VydmljZSB3aGljaCBjaGFuZ2UgcmVuZGVyaW5nIHByZXR0eVxuICAvLyAgIHJhZGljYWxseSwgc28gdGhpcyBmdW5jdGlvbiBpcyBuZWNlc3NhcnkgdG8gZm9yY2UgcmVnZW5lcmF0aW9uIG9mIHByb3BzLlxuICBhc3luYyBmb3JjZVJlcmVuZGVyKGlkZW50aWZpZXJzPzogQXJyYXk8c3RyaW5nPik6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgY29uc3QgY29udmVyc2F0aW9ucyA9IGlkZW50aWZpZXJzXG4gICAgICA/IGlkZW50aWZpZXJzLm1hcChpZGVudGlmaWVyID0+IHRoaXMuZ2V0KGlkZW50aWZpZXIpKS5maWx0ZXIoaXNOb3ROaWwpXG4gICAgICA6IHRoaXMuX2NvbnZlcnNhdGlvbnMubW9kZWxzLnNsaWNlKCk7XG4gICAgbG9nLmluZm8oXG4gICAgICBgZm9yY2VSZXJlbmRlcjogU3RhcnRpbmcgdG8gbG9vcCB0aHJvdWdoICR7Y29udmVyc2F0aW9ucy5sZW5ndGh9IGNvbnZlcnNhdGlvbnNgXG4gICAgKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBjb252ZXJzYXRpb25zLmxlbmd0aDsgaSA8IG1heDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb24gPSBjb252ZXJzYXRpb25zW2ldO1xuXG4gICAgICBpZiAoY29udmVyc2F0aW9uLmNhY2hlZFByb3BzKSB7XG4gICAgICAgIGNvbnZlcnNhdGlvbi5vbGRDYWNoZWRQcm9wcyA9IGNvbnZlcnNhdGlvbi5jYWNoZWRQcm9wcztcbiAgICAgICAgY29udmVyc2F0aW9uLmNhY2hlZFByb3BzID0gbnVsbDtcblxuICAgICAgICBjb252ZXJzYXRpb24udHJpZ2dlcigncHJvcHMtY2hhbmdlJywgY29udmVyc2F0aW9uLCBmYWxzZSk7XG4gICAgICAgIGNvdW50ICs9IDE7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb3VudCAlIDEwID09PSAwKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICAgIGF3YWl0IHNsZWVwKDMwMCk7XG4gICAgICB9XG4gICAgfVxuICAgIGxvZy5pbmZvKGBmb3JjZVJlcmVuZGVyOiBVcGRhdGVkICR7Y291bnR9IGNvbnZlcnNhdGlvbnNgKTtcbiAgfVxuXG4gIG9uQ29udm9PcGVuU3RhcnQoY29udmVyc2F0aW9uSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnZlcnNhdGlvbk9wZW5TdGFydC5zZXQoY29udmVyc2F0aW9uSWQsIERhdGUubm93KCkpO1xuICB9XG5cbiAgb25Db252b01lc3NhZ2VNb3VudChjb252ZXJzYXRpb25JZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgbG9hZFN0YXJ0ID0gdGhpcy5fY29udmVyc2F0aW9uT3BlblN0YXJ0LmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKGxvYWRTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fY29udmVyc2F0aW9uT3BlblN0YXJ0LmRlbGV0ZShjb252ZXJzYXRpb25JZCk7XG4gICAgdGhpcy5nZXQoY29udmVyc2F0aW9uSWQpPy5vbk9wZW5Db21wbGV0ZShsb2FkU3RhcnQpO1xuICB9XG5cbiAgcmVwYWlyUGlubmVkQ29udmVyc2F0aW9ucygpOiB2b2lkIHtcbiAgICBjb25zdCBwaW5uZWRJZHMgPSB3aW5kb3cuc3RvcmFnZS5nZXQoJ3Bpbm5lZENvbnZlcnNhdGlvbklkcycsIFtdKTtcblxuICAgIGZvciAoY29uc3QgaWQgb2YgcGlubmVkSWRzKSB7XG4gICAgICBjb25zdCBjb252byA9IHRoaXMuZ2V0KGlkKTtcblxuICAgICAgaWYgKCFjb252byB8fCBjb252by5nZXQoJ2lzUGlubmVkJykpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgQ29udmVyc2F0aW9uQ29udHJvbGxlcjogUmVwYWlyaW5nICR7Y29udm8uaWRGb3JMb2dnaW5nKCl9J3MgaXNQaW5uZWRgXG4gICAgICApO1xuICAgICAgY29udm8uc2V0KCdpc1Bpbm5lZCcsIHRydWUpO1xuXG4gICAgICB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQ29udmVyc2F0aW9uKGNvbnZvLmF0dHJpYnV0ZXMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZG9Mb2FkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5pbmZvKCdDb252ZXJzYXRpb25Db250cm9sbGVyOiBzdGFydGluZyBpbml0aWFsIGZldGNoJyk7XG5cbiAgICBpZiAodGhpcy5fY29udmVyc2F0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29udmVyc2F0aW9uQ29udHJvbGxlcjogQWxyZWFkeSBsb2FkZWQhJyk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBhd2FpdCBnZXRBbGxDb252ZXJzYXRpb25zKCk7XG5cbiAgICAgIC8vIEdldCByaWQgb2YgdGVtcG9yYXJ5IGNvbnZlcnNhdGlvbnNcbiAgICAgIGNvbnN0IHRlbXBvcmFyeUNvbnZlcnNhdGlvbnMgPSBjb2xsZWN0aW9uLmZpbHRlcihjb252ZXJzYXRpb24gPT5cbiAgICAgICAgQm9vbGVhbihjb252ZXJzYXRpb24uaXNUZW1wb3JhcnkpXG4gICAgICApO1xuXG4gICAgICBpZiAodGVtcG9yYXJ5Q29udmVyc2F0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgYENvbnZlcnNhdGlvbkNvbnRyb2xsZXI6IFJlbW92aW5nICR7dGVtcG9yYXJ5Q29udmVyc2F0aW9ucy5sZW5ndGh9IHRlbXBvcmFyeSBjb252ZXJzYXRpb25zYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY29uc3QgcXVldWUgPSBuZXcgUFF1ZXVlKHtcbiAgICAgICAgY29uY3VycmVuY3k6IDMsXG4gICAgICAgIHRpbWVvdXQ6IDEwMDAgKiA2MCAqIDIsXG4gICAgICAgIHRocm93T25UaW1lb3V0OiB0cnVlLFxuICAgICAgfSk7XG4gICAgICBxdWV1ZS5hZGRBbGwoXG4gICAgICAgIHRlbXBvcmFyeUNvbnZlcnNhdGlvbnMubWFwKGl0ZW0gPT4gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IHJlbW92ZUNvbnZlcnNhdGlvbihpdGVtLmlkKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICBhd2FpdCBxdWV1ZS5vbklkbGUoKTtcblxuICAgICAgLy8gSHlkcmF0ZSB0aGUgZmluYWwgc2V0IG9mIGNvbnZlcnNhdGlvbnNcbiAgICAgIHRoaXMuX2NvbnZlcnNhdGlvbnMuYWRkKFxuICAgICAgICBjb2xsZWN0aW9uLmZpbHRlcihjb252ZXJzYXRpb24gPT4gIWNvbnZlcnNhdGlvbi5pc1RlbXBvcmFyeSlcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuX2luaXRpYWxGZXRjaENvbXBsZXRlID0gdHJ1ZTtcblxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIHRoaXMuX2NvbnZlcnNhdGlvbnMubWFwKGFzeW5jIGNvbnZlcnNhdGlvbiA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEh5ZHJhdGUgY29udGFjdENvbGxlY3Rpb24sIG5vdyB0aGF0IGluaXRpYWwgZmV0Y2ggaXMgY29tcGxldGVcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbi5mZXRjaENvbnRhY3RzKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGlzQ2hhbmdlZCA9IG1heWJlRGVyaXZlR3JvdXBWMklkKGNvbnZlcnNhdGlvbik7XG4gICAgICAgICAgICBpZiAoaXNDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgIHVwZGF0ZUNvbnZlcnNhdGlvbihjb252ZXJzYXRpb24uYXR0cmlidXRlcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEluIGNhc2UgYSB0b28tbGFyZ2UgZHJhZnQgd2FzIHNhdmVkIHRvIHRoZSBkYXRhYmFzZVxuICAgICAgICAgICAgY29uc3QgZHJhZnQgPSBjb252ZXJzYXRpb24uZ2V0KCdkcmFmdCcpO1xuICAgICAgICAgICAgaWYgKGRyYWZ0ICYmIGRyYWZ0Lmxlbmd0aCA+IE1BWF9NRVNTQUdFX0JPRFlfTEVOR1RIKSB7XG4gICAgICAgICAgICAgIGNvbnZlcnNhdGlvbi5zZXQoe1xuICAgICAgICAgICAgICAgIGRyYWZ0OiBkcmFmdC5zbGljZSgwLCBNQVhfTUVTU0FHRV9CT0RZX0xFTkdUSCksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB1cGRhdGVDb252ZXJzYXRpb24oY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDbGVhbiB1cCB0aGUgY29udmVyc2F0aW9ucyB0aGF0IGhhdmUgVVVJRCBhcyB0aGVpciBlMTY0LlxuICAgICAgICAgICAgY29uc3QgZTE2NCA9IGNvbnZlcnNhdGlvbi5nZXQoJ2UxNjQnKTtcbiAgICAgICAgICAgIGNvbnN0IHV1aWQgPSBjb252ZXJzYXRpb24uZ2V0KCd1dWlkJyk7XG4gICAgICAgICAgICBpZiAoaXNWYWxpZFV1aWQoZTE2NCkgJiYgdXVpZCkge1xuICAgICAgICAgICAgICBjb252ZXJzYXRpb24uc2V0KHsgZTE2NDogdW5kZWZpbmVkIH0pO1xuICAgICAgICAgICAgICB1cGRhdGVDb252ZXJzYXRpb24oY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpO1xuXG4gICAgICAgICAgICAgIGxvZy5pbmZvKGBDbGVhbmluZyB1cCBjb252ZXJzYXRpb24oJHt1dWlkfSkgd2l0aCBpbnZhbGlkIGUxNjRgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICAgICAnQ29udmVyc2F0aW9uQ29udHJvbGxlci5sb2FkL21hcDogRmFpbGVkIHRvIHByZXBhcmUgYSBjb252ZXJzYXRpb24nLFxuICAgICAgICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIGxvZy5pbmZvKCdDb252ZXJzYXRpb25Db250cm9sbGVyOiBkb25lIHdpdGggaW5pdGlhbCBmZXRjaCcpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgICdDb252ZXJzYXRpb25Db250cm9sbGVyOiBpbml0aWFsIGZldGNoIGZhaWxlZCcsXG4gICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXdDO0FBQ3hDLHFCQUFtQjtBQUVuQixvQkFBMEI7QUFPMUIscUJBQTZCO0FBQzdCLG9CQUFxQztBQUNyQyxvQkFBdUI7QUFDdkIsb0NBQXFDO0FBQ3JDLG1EQUFzRDtBQUN0RCxrQkFBa0M7QUFDbEMscUJBQXdCO0FBQ3hCLDhCQUFpQztBQUNqQyxVQUFxQjtBQUNyQixtQkFBc0I7QUFDdEIsc0JBQXlCO0FBQ3pCLHVCQUF1QjtBQUV2QixNQUFNLDBCQUEwQixLQUFLO0FBRXJDLE1BQU07QUFBQSxFQUNKO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsSUFDRTtBQUtHLGlCQUF1QjtBQUM1QixRQUFNLGdCQUFnQixJQUFJLE9BQU8sUUFBUSx1QkFBdUI7QUFFaEUsU0FBTyxtQkFBbUIsTUFBTTtBQUNoQyxTQUFPLHlCQUF5QixJQUFJLHVCQUF1QixhQUFhO0FBQzFFO0FBTGdCLEFBT1QsTUFBTSx1QkFBdUI7QUFBQSxFQVNsQyxZQUFvQixnQkFBaUQ7QUFBakQ7QUFSWixpQ0FBd0I7QUFJeEIsa0NBQXlCLG9CQUFJLElBQW9CO0FBRWpELDRCQUFtQjtBQUd6QixVQUFNLDZCQUE2Qiw0QkFDakMsS0FBSyxrQkFBa0IsS0FBSyxJ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
