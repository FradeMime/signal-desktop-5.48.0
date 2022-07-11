var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_chai = require("chai");
var import_uuid = require("uuid");
var import_Crypto = require("../../Crypto");
var import_Address = require("../../types/Address");
var import_UUID = require("../../types/UUID");
var import_SignalProtocolStore = require("../../SignalProtocolStore");
var KeyChangeListener = __toESM(require("../../textsecure/KeyChangeListener"));
describe("KeyChangeListener", () => {
  let oldNumberId;
  let oldUuidId;
  const ourUuid = (0, import_uuid.v4)();
  const uuidWithKeyChange = (0, import_uuid.v4)();
  const address = import_Address.Address.create(uuidWithKeyChange, 1);
  const oldKey = (0, import_Crypto.getRandomBytes)(33);
  const newKey = (0, import_Crypto.getRandomBytes)(33);
  let store;
  before(async () => {
    window.ConversationController.reset();
    await window.ConversationController.load();
    const { storage } = window.textsecure;
    oldNumberId = storage.get("number_id");
    oldUuidId = storage.get("uuid_id");
    await storage.put("number_id", "+14155555556.2");
    await storage.put("uuid_id", `${ourUuid}.2`);
  });
  after(async () => {
    await window.Signal.Data.removeAll();
    const { storage } = window.textsecure;
    await storage.fetch();
    if (oldNumberId) {
      await storage.put("number_id", oldNumberId);
    }
    if (oldUuidId) {
      await storage.put("uuid_id", oldUuidId);
    }
  });
  let convo;
  beforeEach(async () => {
    window.ConversationController.reset();
    await window.ConversationController.load();
    convo = window.ConversationController.dangerouslyCreateAndAdd({
      id: uuidWithKeyChange,
      type: "private"
    });
    await window.Signal.Data.saveConversation(convo.attributes);
    store = new import_SignalProtocolStore.SignalProtocolStore();
    await store.hydrateCaches();
    KeyChangeListener.init(store);
    return store.saveIdentity(address, oldKey);
  });
  afterEach(async () => {
    await window.Signal.Data.removeAllMessagesInConversation(convo.id, {
      logId: uuidWithKeyChange
    });
    await window.Signal.Data.removeConversation(convo.id);
    await store.removeIdentityKey(new import_UUID.UUID(uuidWithKeyChange));
  });
  describe("When we have a conversation with this contact", () => {
    it("generates a key change notice in the private conversation with this contact", (done) => {
      const original = convo.addKeyChange;
      convo.addKeyChange = async (keyChangedId) => {
        import_chai.assert.equal(uuidWithKeyChange, keyChangedId.toString());
        convo.addKeyChange = original;
        done();
      };
      store.saveIdentity(address, newKey);
    });
  });
  describe("When we have a group with this contact", () => {
    let groupConvo;
    beforeEach(async () => {
      groupConvo = window.ConversationController.dangerouslyCreateAndAdd({
        id: "groupId",
        type: "group",
        members: [convo.id]
      });
      await window.Signal.Data.saveConversation(groupConvo.attributes);
    });
    afterEach(async () => {
      await window.Signal.Data.removeAllMessagesInConversation(groupConvo.id, {
        logId: uuidWithKeyChange
      });
      await window.Signal.Data.removeConversation(groupConvo.id);
    });
    it("generates a key change notice in the group conversation with this contact", (done) => {
      const original = groupConvo.addKeyChange;
      groupConvo.addKeyChange = async (keyChangedId) => {
        import_chai.assert.equal(uuidWithKeyChange, keyChangedId.toString());
        groupConvo.addKeyChange = original;
        done();
      };
      store.saveIdentity(address, newKey);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiS2V5Q2hhbmdlTGlzdGVuZXJfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTctMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgdjQgYXMgZ2V0R3VpZCB9IGZyb20gJ3V1aWQnO1xuXG5pbXBvcnQgeyBnZXRSYW5kb21CeXRlcyB9IGZyb20gJy4uLy4uL0NyeXB0byc7XG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSAnLi4vLi4vdHlwZXMvQWRkcmVzcyc7XG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgeyBTaWduYWxQcm90b2NvbFN0b3JlIH0gZnJvbSAnLi4vLi4vU2lnbmFsUHJvdG9jb2xTdG9yZSc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvbk1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0ICogYXMgS2V5Q2hhbmdlTGlzdGVuZXIgZnJvbSAnLi4vLi4vdGV4dHNlY3VyZS9LZXlDaGFuZ2VMaXN0ZW5lcic7XG5cbmRlc2NyaWJlKCdLZXlDaGFuZ2VMaXN0ZW5lcicsICgpID0+IHtcbiAgbGV0IG9sZE51bWJlcklkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGxldCBvbGRVdWlkSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBjb25zdCBvdXJVdWlkID0gZ2V0R3VpZCgpO1xuICBjb25zdCB1dWlkV2l0aEtleUNoYW5nZSA9IGdldEd1aWQoKTtcbiAgY29uc3QgYWRkcmVzcyA9IEFkZHJlc3MuY3JlYXRlKHV1aWRXaXRoS2V5Q2hhbmdlLCAxKTtcbiAgY29uc3Qgb2xkS2V5ID0gZ2V0UmFuZG9tQnl0ZXMoMzMpO1xuICBjb25zdCBuZXdLZXkgPSBnZXRSYW5kb21CeXRlcygzMyk7XG4gIGxldCBzdG9yZTogU2lnbmFsUHJvdG9jb2xTdG9yZTtcblxuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLnJlc2V0KCk7XG4gICAgYXdhaXQgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIubG9hZCgpO1xuXG4gICAgY29uc3QgeyBzdG9yYWdlIH0gPSB3aW5kb3cudGV4dHNlY3VyZTtcblxuICAgIG9sZE51bWJlcklkID0gc3RvcmFnZS5nZXQoJ251bWJlcl9pZCcpO1xuICAgIG9sZFV1aWRJZCA9IHN0b3JhZ2UuZ2V0KCd1dWlkX2lkJyk7XG4gICAgYXdhaXQgc3RvcmFnZS5wdXQoJ251bWJlcl9pZCcsICcrMTQxNTU1NTU1NTYuMicpO1xuICAgIGF3YWl0IHN0b3JhZ2UucHV0KCd1dWlkX2lkJywgYCR7b3VyVXVpZH0uMmApO1xuICB9KTtcblxuICBhZnRlcihhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnJlbW92ZUFsbCgpO1xuXG4gICAgY29uc3QgeyBzdG9yYWdlIH0gPSB3aW5kb3cudGV4dHNlY3VyZTtcbiAgICBhd2FpdCBzdG9yYWdlLmZldGNoKCk7XG5cbiAgICBpZiAob2xkTnVtYmVySWQpIHtcbiAgICAgIGF3YWl0IHN0b3JhZ2UucHV0KCdudW1iZXJfaWQnLCBvbGROdW1iZXJJZCk7XG4gICAgfVxuICAgIGlmIChvbGRVdWlkSWQpIHtcbiAgICAgIGF3YWl0IHN0b3JhZ2UucHV0KCd1dWlkX2lkJywgb2xkVXVpZElkKTtcbiAgICB9XG4gIH0pO1xuXG4gIGxldCBjb252bzogQ29udmVyc2F0aW9uTW9kZWw7XG5cbiAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIucmVzZXQoKTtcbiAgICBhd2FpdCB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5sb2FkKCk7XG5cbiAgICBjb252byA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmRhbmdlcm91c2x5Q3JlYXRlQW5kQWRkKHtcbiAgICAgIGlkOiB1dWlkV2l0aEtleUNoYW5nZSxcbiAgICAgIHR5cGU6ICdwcml2YXRlJyxcbiAgICB9KTtcbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZUNvbnZlcnNhdGlvbihjb252by5hdHRyaWJ1dGVzKTtcblxuICAgIHN0b3JlID0gbmV3IFNpZ25hbFByb3RvY29sU3RvcmUoKTtcbiAgICBhd2FpdCBzdG9yZS5oeWRyYXRlQ2FjaGVzKCk7XG4gICAgS2V5Q2hhbmdlTGlzdGVuZXIuaW5pdChzdG9yZSk7XG4gICAgcmV0dXJuIHN0b3JlLnNhdmVJZGVudGl0eShhZGRyZXNzLCBvbGRLZXkpO1xuICB9KTtcblxuICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5yZW1vdmVBbGxNZXNzYWdlc0luQ29udmVyc2F0aW9uKGNvbnZvLmlkLCB7XG4gICAgICBsb2dJZDogdXVpZFdpdGhLZXlDaGFuZ2UsXG4gICAgfSk7XG4gICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnJlbW92ZUNvbnZlcnNhdGlvbihjb252by5pZCk7XG5cbiAgICBhd2FpdCBzdG9yZS5yZW1vdmVJZGVudGl0eUtleShuZXcgVVVJRCh1dWlkV2l0aEtleUNoYW5nZSkpO1xuICB9KTtcblxuICBkZXNjcmliZSgnV2hlbiB3ZSBoYXZlIGEgY29udmVyc2F0aW9uIHdpdGggdGhpcyBjb250YWN0JywgKCkgPT4ge1xuICAgIGl0KCdnZW5lcmF0ZXMgYSBrZXkgY2hhbmdlIG5vdGljZSBpbiB0aGUgcHJpdmF0ZSBjb252ZXJzYXRpb24gd2l0aCB0aGlzIGNvbnRhY3QnLCBkb25lID0+IHtcbiAgICAgIGNvbnN0IG9yaWdpbmFsID0gY29udm8uYWRkS2V5Q2hhbmdlO1xuICAgICAgY29udm8uYWRkS2V5Q2hhbmdlID0gYXN5bmMga2V5Q2hhbmdlZElkID0+IHtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKHV1aWRXaXRoS2V5Q2hhbmdlLCBrZXlDaGFuZ2VkSWQudG9TdHJpbmcoKSk7XG4gICAgICAgIGNvbnZvLmFkZEtleUNoYW5nZSA9IG9yaWdpbmFsO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9O1xuICAgICAgc3RvcmUuc2F2ZUlkZW50aXR5KGFkZHJlc3MsIG5ld0tleSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdXaGVuIHdlIGhhdmUgYSBncm91cCB3aXRoIHRoaXMgY29udGFjdCcsICgpID0+IHtcbiAgICBsZXQgZ3JvdXBDb252bzogQ29udmVyc2F0aW9uTW9kZWw7XG5cbiAgICBiZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcbiAgICAgIGdyb3VwQ29udm8gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5kYW5nZXJvdXNseUNyZWF0ZUFuZEFkZCh7XG4gICAgICAgIGlkOiAnZ3JvdXBJZCcsXG4gICAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICAgIG1lbWJlcnM6IFtjb252by5pZF0sXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5zYXZlQ29udmVyc2F0aW9uKGdyb3VwQ29udm8uYXR0cmlidXRlcyk7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnJlbW92ZUFsbE1lc3NhZ2VzSW5Db252ZXJzYXRpb24oZ3JvdXBDb252by5pZCwge1xuICAgICAgICBsb2dJZDogdXVpZFdpdGhLZXlDaGFuZ2UsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5yZW1vdmVDb252ZXJzYXRpb24oZ3JvdXBDb252by5pZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZ2VuZXJhdGVzIGEga2V5IGNoYW5nZSBub3RpY2UgaW4gdGhlIGdyb3VwIGNvbnZlcnNhdGlvbiB3aXRoIHRoaXMgY29udGFjdCcsIGRvbmUgPT4ge1xuICAgICAgY29uc3Qgb3JpZ2luYWwgPSBncm91cENvbnZvLmFkZEtleUNoYW5nZTtcbiAgICAgIGdyb3VwQ29udm8uYWRkS2V5Q2hhbmdlID0gYXN5bmMga2V5Q2hhbmdlZElkID0+IHtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKHV1aWRXaXRoS2V5Q2hhbmdlLCBrZXlDaGFuZ2VkSWQudG9TdHJpbmcoKSk7XG4gICAgICAgIGdyb3VwQ29udm8uYWRkS2V5Q2hhbmdlID0gb3JpZ2luYWw7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH07XG5cbiAgICAgIHN0b3JlLnNhdmVJZGVudGl0eShhZGRyZXNzLCBuZXdLZXkpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLGtCQUE4QjtBQUU5QixvQkFBK0I7QUFDL0IscUJBQXdCO0FBQ3hCLGtCQUFxQjtBQUNyQixpQ0FBb0M7QUFFcEMsd0JBQW1DO0FBRW5DLFNBQVMscUJBQXFCLE1BQU07QUFDbEMsTUFBSTtBQUNKLE1BQUk7QUFFSixRQUFNLFVBQVUsb0JBQVE7QUFDeEIsUUFBTSxvQkFBb0Isb0JBQVE7QUFDbEMsUUFBTSxVQUFVLHVCQUFRLE9BQU8sbUJBQW1CLENBQUM7QUFDbkQsUUFBTSxTQUFTLGtDQUFlLEVBQUU7QUFDaEMsUUFBTSxTQUFTLGtDQUFlLEVBQUU7QUFDaEMsTUFBSTtBQUVKLFNBQU8sWUFBWTtBQUNqQixXQUFPLHVCQUF1QixNQUFNO0FBQ3BDLFVBQU0sT0FBTyx1QkFBdUIsS0FBSztBQUV6QyxVQUFNLEVBQUUsWUFBWSxPQUFPO0FBRTNCLGtCQUFjLFFBQVEsSUFBSSxXQUFXO0FBQ3JDLGdCQUFZLFFBQVEsSUFBSSxTQUFTO0FBQ2pDLFVBQU0sUUFBUSxJQUFJLGFBQWEsZ0JBQWdCO0FBQy9DLFVBQU0sUUFBUSxJQUFJLFdBQVcsR0FBRyxXQUFXO0FBQUEsRUFDN0MsQ0FBQztBQUVELFFBQU0sWUFBWTtBQUNoQixVQUFNLE9BQU8s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
