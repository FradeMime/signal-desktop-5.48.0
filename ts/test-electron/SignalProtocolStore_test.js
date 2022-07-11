var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_chai = __toESM(require("chai"));
var import_chai_as_promised = __toESM(require("chai-as-promised"));
var import_libsignal_client = require("@signalapp/libsignal-client");
var import_compiled = require("../protobuf/compiled");
var import_sessionTranslation = require("../util/sessionTranslation");
var durations = __toESM(require("../util/durations"));
var import_Zone = require("../util/Zone");
var Bytes = __toESM(require("../Bytes"));
var import_Crypto = require("../Crypto");
var import_Curve = require("../Curve");
var import_SignalProtocolStore = require("../SignalProtocolStore");
var import_Address = require("../types/Address");
var import_QualifiedAddress = require("../types/QualifiedAddress");
var import_UUID = require("../types/UUID");
import_chai.default.use(import_chai_as_promised.default);
const {
  RecordStructure,
  SessionStructure,
  SenderKeyRecordStructure,
  SenderKeyStateStructure
} = import_compiled.signal.proto.storage;
describe("SignalProtocolStore", () => {
  const ourUuid = import_UUID.UUID.generate();
  const theirUuid = import_UUID.UUID.generate();
  let store;
  let identityKey;
  let testKey;
  function getSessionRecord(isOpen) {
    const proto = new RecordStructure();
    proto.previousSessions = [];
    if (isOpen) {
      proto.currentSession = new SessionStructure();
      proto.currentSession.aliceBaseKey = getPublicKey();
      proto.currentSession.localIdentityPublic = getPublicKey();
      proto.currentSession.localRegistrationId = 435;
      proto.currentSession.previousCounter = 1;
      proto.currentSession.remoteIdentityPublic = getPublicKey();
      proto.currentSession.remoteRegistrationId = 243;
      proto.currentSession.rootKey = getPrivateKey();
      proto.currentSession.sessionVersion = 3;
    }
    return import_libsignal_client.SessionRecord.deserialize(Buffer.from((0, import_sessionTranslation.sessionStructureToBytes)(proto)));
  }
  function getSenderKeyRecord() {
    const proto = new SenderKeyRecordStructure();
    const state = new SenderKeyStateStructure();
    state.senderKeyId = 4;
    const senderChainKey = new SenderKeyStateStructure.SenderChainKey();
    senderChainKey.iteration = 10;
    senderChainKey.seed = getPublicKey();
    state.senderChainKey = senderChainKey;
    const senderSigningKey = new SenderKeyStateStructure.SenderSigningKey();
    senderSigningKey.public = getPublicKey();
    senderSigningKey.private = getPrivateKey();
    state.senderSigningKey = senderSigningKey;
    state.senderMessageKeys = [];
    const messageKey = new SenderKeyStateStructure.SenderMessageKey();
    messageKey.iteration = 234;
    messageKey.seed = getPublicKey();
    state.senderMessageKeys.push(messageKey);
    proto.senderKeyStates = [];
    proto.senderKeyStates.push(state);
    return import_libsignal_client.SenderKeyRecord.deserialize(Buffer.from(import_compiled.signal.proto.storage.SenderKeyRecordStructure.encode(proto).finish()));
  }
  function getPrivateKey() {
    const key = (0, import_Crypto.getRandomBytes)(32);
    (0, import_Curve.clampPrivateKey)(key);
    return key;
  }
  function getPublicKey() {
    const key = (0, import_Crypto.getRandomBytes)(33);
    (0, import_Curve.setPublicKeyTypeByte)(key);
    return key;
  }
  before(async () => {
    store = window.textsecure.storage.protocol;
    store.hydrateCaches();
    identityKey = {
      pubKey: getPublicKey(),
      privKey: getPrivateKey()
    };
    testKey = {
      pubKey: getPublicKey(),
      privKey: getPrivateKey()
    };
    (0, import_Curve.setPublicKeyTypeByte)(identityKey.pubKey);
    (0, import_Curve.setPublicKeyTypeByte)(testKey.pubKey);
    (0, import_Curve.clampPrivateKey)(identityKey.privKey);
    (0, import_Curve.clampPrivateKey)(testKey.privKey);
    window.storage.put("registrationIdMap", { [ourUuid.toString()]: 1337 });
    window.storage.put("identityKeyMap", {
      [ourUuid.toString()]: {
        privKey: Bytes.toBase64(identityKey.privKey),
        pubKey: Bytes.toBase64(identityKey.pubKey)
      }
    });
    await window.storage.fetch();
    window.ConversationController.reset();
    await window.ConversationController.load();
    await window.ConversationController.getOrCreateAndWait(theirUuid.toString(), "private");
  });
  describe("getLocalRegistrationId", () => {
    it("retrieves my registration id", async () => {
      await store.hydrateCaches();
      const id = await store.getLocalRegistrationId(ourUuid);
      import_chai.assert.strictEqual(id, 1337);
    });
  });
  describe("getIdentityKeyPair", () => {
    it("retrieves my identity key", async () => {
      await store.hydrateCaches();
      const key = await store.getIdentityKeyPair(ourUuid);
      if (!key) {
        throw new Error("Missing key!");
      }
      import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(key.pubKey, identityKey.pubKey));
      import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(key.privKey, identityKey.privKey));
    });
  });
  describe("senderKeys", () => {
    it("roundtrips in memory", async () => {
      const distributionId = import_UUID.UUID.generate().toString();
      const expected = getSenderKeyRecord();
      const deviceId = 1;
      const qualifiedAddress = new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, deviceId));
      await store.saveSenderKey(qualifiedAddress, distributionId, expected);
      const actual = await store.getSenderKey(qualifiedAddress, distributionId);
      if (!actual) {
        throw new Error("getSenderKey returned nothing!");
      }
      import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(expected.serialize(), actual.serialize()));
      await store.removeSenderKey(qualifiedAddress, distributionId);
      const postDeleteGet = await store.getSenderKey(qualifiedAddress, distributionId);
      import_chai.assert.isUndefined(postDeleteGet);
    });
    it("roundtrips through database", async () => {
      const distributionId = import_UUID.UUID.generate().toString();
      const expected = getSenderKeyRecord();
      const deviceId = 1;
      const qualifiedAddress = new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, deviceId));
      await store.saveSenderKey(qualifiedAddress, distributionId, expected);
      await store.hydrateCaches();
      const actual = await store.getSenderKey(qualifiedAddress, distributionId);
      if (!actual) {
        throw new Error("getSenderKey returned nothing!");
      }
      import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(expected.serialize(), actual.serialize()));
      await store.removeSenderKey(qualifiedAddress, distributionId);
      await store.hydrateCaches();
      const postDeleteGet = await store.getSenderKey(qualifiedAddress, distributionId);
      import_chai.assert.isUndefined(postDeleteGet);
    });
  });
  describe("saveIdentity", () => {
    const identifier = new import_Address.Address(theirUuid, 1);
    it("stores identity keys", async () => {
      await store.saveIdentity(identifier, testKey.pubKey);
      const key = await store.loadIdentityKey(theirUuid);
      if (!key) {
        throw new Error("Missing key!");
      }
      import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(key, testKey.pubKey));
    });
    it("allows key changes", async () => {
      const newIdentity = getPublicKey();
      await store.saveIdentity(identifier, testKey.pubKey);
      await store.saveIdentity(identifier, newIdentity);
    });
    describe("When there is no existing key (first use)", () => {
      before(async () => {
        await store.removeIdentityKey(theirUuid);
        await store.saveIdentity(identifier, testKey.pubKey);
      });
      it("marks the key firstUse", async () => {
        const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
        if (!identity) {
          throw new Error("Missing identity!");
        }
        (0, import_chai.assert)(identity.firstUse);
      });
      it("sets the timestamp", async () => {
        const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
        if (!identity) {
          throw new Error("Missing identity!");
        }
        (0, import_chai.assert)(identity.timestamp);
      });
      it("sets the verified status to DEFAULT", async () => {
        const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
        if (!identity) {
          throw new Error("Missing identity!");
        }
        import_chai.assert.strictEqual(identity.verified, store.VerifiedStatus.DEFAULT);
      });
    });
    describe("When there is a different existing key (non first use)", () => {
      const newIdentity = getPublicKey();
      const oldTimestamp = Date.now();
      before(async () => {
        await window.Signal.Data.createOrUpdateIdentityKey({
          id: theirUuid.toString(),
          publicKey: testKey.pubKey,
          firstUse: true,
          timestamp: oldTimestamp,
          nonblockingApproval: false,
          verified: store.VerifiedStatus.DEFAULT
        });
        await store.hydrateCaches();
        await store.saveIdentity(identifier, newIdentity);
      });
      it("marks the key not firstUse", async () => {
        const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
        if (!identity) {
          throw new Error("Missing identity!");
        }
        (0, import_chai.assert)(!identity.firstUse);
      });
      it("updates the timestamp", async () => {
        const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
        if (!identity) {
          throw new Error("Missing identity!");
        }
        import_chai.assert.notEqual(identity.timestamp, oldTimestamp);
      });
      describe("The previous verified status was DEFAULT", () => {
        before(async () => {
          await window.Signal.Data.createOrUpdateIdentityKey({
            id: theirUuid.toString(),
            publicKey: testKey.pubKey,
            firstUse: true,
            timestamp: oldTimestamp,
            nonblockingApproval: false,
            verified: store.VerifiedStatus.DEFAULT
          });
          await store.hydrateCaches();
          await store.saveIdentity(identifier, newIdentity);
        });
        it("sets the new key to default", async () => {
          const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
          if (!identity) {
            throw new Error("Missing identity!");
          }
          import_chai.assert.strictEqual(identity.verified, store.VerifiedStatus.DEFAULT);
        });
      });
      describe("The previous verified status was VERIFIED", () => {
        before(async () => {
          await window.Signal.Data.createOrUpdateIdentityKey({
            id: theirUuid.toString(),
            publicKey: testKey.pubKey,
            firstUse: true,
            timestamp: oldTimestamp,
            nonblockingApproval: false,
            verified: store.VerifiedStatus.VERIFIED
          });
          await store.hydrateCaches();
          await store.saveIdentity(identifier, newIdentity);
        });
        it("sets the new key to unverified", async () => {
          const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
          if (!identity) {
            throw new Error("Missing identity!");
          }
          import_chai.assert.strictEqual(identity.verified, store.VerifiedStatus.UNVERIFIED);
        });
      });
      describe("The previous verified status was UNVERIFIED", () => {
        before(async () => {
          await window.Signal.Data.createOrUpdateIdentityKey({
            id: theirUuid.toString(),
            publicKey: testKey.pubKey,
            firstUse: true,
            timestamp: oldTimestamp,
            nonblockingApproval: false,
            verified: store.VerifiedStatus.UNVERIFIED
          });
          await store.hydrateCaches();
          await store.saveIdentity(identifier, newIdentity);
        });
        it("sets the new key to unverified", async () => {
          const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
          if (!identity) {
            throw new Error("Missing identity!");
          }
          import_chai.assert.strictEqual(identity.verified, store.VerifiedStatus.UNVERIFIED);
        });
      });
    });
    describe("When the key has not changed", () => {
      const oldTimestamp = Date.now();
      before(async () => {
        await window.Signal.Data.createOrUpdateIdentityKey({
          id: theirUuid.toString(),
          publicKey: testKey.pubKey,
          timestamp: oldTimestamp,
          nonblockingApproval: false,
          firstUse: false,
          verified: store.VerifiedStatus.DEFAULT
        });
        await store.hydrateCaches();
      });
      describe("If it is marked firstUse", () => {
        before(async () => {
          const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
          if (!identity) {
            throw new Error("Missing identity!");
          }
          identity.firstUse = true;
          await window.Signal.Data.createOrUpdateIdentityKey(identity);
          await store.hydrateCaches();
        });
        it("nothing changes", async () => {
          await store.saveIdentity(identifier, testKey.pubKey, true);
          const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
          if (!identity) {
            throw new Error("Missing identity!");
          }
          (0, import_chai.assert)(!identity.nonblockingApproval);
          import_chai.assert.strictEqual(identity.timestamp, oldTimestamp);
        });
      });
      describe("If it is not marked firstUse", () => {
        before(async () => {
          const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
          if (!identity) {
            throw new Error("Missing identity!");
          }
          identity.firstUse = false;
          await window.Signal.Data.createOrUpdateIdentityKey(identity);
          await store.hydrateCaches();
        });
        describe("If nonblocking approval is required", () => {
          let now;
          before(async () => {
            now = Date.now();
            const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
            if (!identity) {
              throw new Error("Missing identity!");
            }
            identity.timestamp = now;
            await window.Signal.Data.createOrUpdateIdentityKey(identity);
            await store.hydrateCaches();
          });
          it("sets non-blocking approval", async () => {
            await store.saveIdentity(identifier, testKey.pubKey, true);
            const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
            if (!identity) {
              throw new Error("Missing identity!");
            }
            import_chai.assert.strictEqual(identity.nonblockingApproval, true);
            import_chai.assert.strictEqual(identity.timestamp, now);
            import_chai.assert.strictEqual(identity.firstUse, false);
          });
        });
      });
    });
  });
  describe("saveIdentityWithAttributes", () => {
    let now;
    let validAttributes;
    before(async () => {
      now = Date.now();
      validAttributes = {
        id: theirUuid.toString(),
        publicKey: testKey.pubKey,
        firstUse: true,
        timestamp: now,
        verified: store.VerifiedStatus.VERIFIED,
        nonblockingApproval: false
      };
      await store.removeIdentityKey(theirUuid);
    });
    describe("with valid attributes", () => {
      before(async () => {
        await store.saveIdentityWithAttributes(theirUuid, validAttributes);
      });
      it("publicKey is saved", async () => {
        const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
        if (!identity) {
          throw new Error("Missing identity!");
        }
        import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(identity.publicKey, testKey.pubKey));
      });
      it("firstUse is saved", async () => {
        const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
        if (!identity) {
          throw new Error("Missing identity!");
        }
        import_chai.assert.strictEqual(identity.firstUse, true);
      });
      it("timestamp is saved", async () => {
        const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
        if (!identity) {
          throw new Error("Missing identity!");
        }
        import_chai.assert.strictEqual(identity.timestamp, now);
      });
      it("verified is saved", async () => {
        const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
        if (!identity) {
          throw new Error("Missing identity!");
        }
        import_chai.assert.strictEqual(identity.verified, store.VerifiedStatus.VERIFIED);
      });
      it("nonblockingApproval is saved", async () => {
        const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
        if (!identity) {
          throw new Error("Missing identity!");
        }
        import_chai.assert.strictEqual(identity.nonblockingApproval, false);
      });
    });
    describe("with invalid attributes", () => {
      let attributes;
      beforeEach(() => {
        attributes = window._.clone(validAttributes);
      });
      async function testInvalidAttributes() {
        try {
          await store.saveIdentityWithAttributes(theirUuid, attributes);
          throw new Error("saveIdentityWithAttributes should have failed");
        } catch (error) {
        }
      }
      it("rejects an invalid publicKey", async () => {
        attributes.publicKey = "a string";
        await testInvalidAttributes();
      });
      it("rejects invalid firstUse", async () => {
        attributes.firstUse = 0;
        await testInvalidAttributes();
      });
      it("rejects invalid timestamp", async () => {
        attributes.timestamp = NaN;
        await testInvalidAttributes();
      });
      it("rejects invalid verified", async () => {
        attributes.verified = null;
        await testInvalidAttributes();
      });
      it("rejects invalid nonblockingApproval", async () => {
        attributes.nonblockingApproval = 0;
        await testInvalidAttributes();
      });
    });
  });
  describe("setApproval", () => {
    it("sets nonblockingApproval", async () => {
      await store.setApproval(theirUuid, true);
      const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
      if (!identity) {
        throw new Error("Missing identity!");
      }
      import_chai.assert.strictEqual(identity.nonblockingApproval, true);
    });
  });
  describe("setVerified", () => {
    async function saveRecordDefault() {
      await window.Signal.Data.createOrUpdateIdentityKey({
        id: theirUuid.toString(),
        publicKey: testKey.pubKey,
        firstUse: true,
        timestamp: Date.now(),
        verified: store.VerifiedStatus.DEFAULT,
        nonblockingApproval: false
      });
      await store.hydrateCaches();
    }
    describe("with no public key argument", () => {
      before(saveRecordDefault);
      it("updates the verified status", async () => {
        await store.setVerified(theirUuid, store.VerifiedStatus.VERIFIED);
        const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
        if (!identity) {
          throw new Error("Missing identity!");
        }
        import_chai.assert.strictEqual(identity.verified, store.VerifiedStatus.VERIFIED);
        import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(identity.publicKey, testKey.pubKey));
      });
    });
    describe("with the current public key", () => {
      before(saveRecordDefault);
      it("updates the verified status", async () => {
        await store.setVerified(theirUuid, store.VerifiedStatus.VERIFIED, testKey.pubKey);
        const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
        if (!identity) {
          throw new Error("Missing identity!");
        }
        import_chai.assert.strictEqual(identity.verified, store.VerifiedStatus.VERIFIED);
        import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(identity.publicKey, testKey.pubKey));
      });
    });
    describe("with a mismatching public key", () => {
      const newIdentity = getPublicKey();
      before(saveRecordDefault);
      it("does not change the record.", async () => {
        await store.setVerified(theirUuid, store.VerifiedStatus.VERIFIED, newIdentity);
        const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
        if (!identity) {
          throw new Error("Missing identity!");
        }
        import_chai.assert.strictEqual(identity.verified, store.VerifiedStatus.DEFAULT);
        import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(identity.publicKey, testKey.pubKey));
      });
    });
  });
  describe("processVerifiedMessage", () => {
    const newIdentity = getPublicKey();
    let keychangeTriggered;
    beforeEach(() => {
      keychangeTriggered = 0;
      store.bind("keychange", () => {
        keychangeTriggered += 1;
      });
    });
    afterEach(() => {
      store.unbind("keychange");
    });
    describe("when the new verified status is DEFAULT", () => {
      describe("when there is no existing record", () => {
        before(async () => {
          await window.Signal.Data.removeIdentityKeyById(theirUuid.toString());
          await store.hydrateCaches();
        });
        it("sets the identity key", async () => {
          await store.processVerifiedMessage(theirUuid, store.VerifiedStatus.DEFAULT, newIdentity);
          const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
          import_chai.assert.isTrue(identity?.publicKey && (0, import_Crypto.constantTimeEqual)(identity.publicKey, newIdentity));
          import_chai.assert.strictEqual(keychangeTriggered, 0);
        });
      });
      describe("when the record exists", () => {
        describe("when the existing key is different", () => {
          before(async () => {
            await window.Signal.Data.createOrUpdateIdentityKey({
              id: theirUuid.toString(),
              publicKey: testKey.pubKey,
              firstUse: true,
              timestamp: Date.now(),
              verified: store.VerifiedStatus.VERIFIED,
              nonblockingApproval: false
            });
            await store.hydrateCaches();
          });
          it("updates the identity", async () => {
            await store.processVerifiedMessage(theirUuid, store.VerifiedStatus.DEFAULT, newIdentity);
            const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
            if (!identity) {
              throw new Error("Missing identity!");
            }
            import_chai.assert.strictEqual(identity.verified, store.VerifiedStatus.DEFAULT);
            import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(identity.publicKey, newIdentity));
            import_chai.assert.strictEqual(keychangeTriggered, 1);
          });
        });
        describe("when the existing key is the same but VERIFIED", () => {
          before(async () => {
            await window.Signal.Data.createOrUpdateIdentityKey({
              id: theirUuid.toString(),
              publicKey: testKey.pubKey,
              firstUse: true,
              timestamp: Date.now(),
              verified: store.VerifiedStatus.VERIFIED,
              nonblockingApproval: false
            });
            await store.hydrateCaches();
          });
          it("updates the verified status", async () => {
            await store.processVerifiedMessage(theirUuid, store.VerifiedStatus.DEFAULT, testKey.pubKey);
            const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
            if (!identity) {
              throw new Error("Missing identity!");
            }
            import_chai.assert.strictEqual(identity.verified, store.VerifiedStatus.DEFAULT);
            import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(identity.publicKey, testKey.pubKey));
            import_chai.assert.strictEqual(keychangeTriggered, 0);
          });
        });
        describe("when the existing key is the same and already DEFAULT", () => {
          before(async () => {
            await window.Signal.Data.createOrUpdateIdentityKey({
              id: theirUuid.toString(),
              publicKey: testKey.pubKey,
              firstUse: true,
              timestamp: Date.now(),
              verified: store.VerifiedStatus.DEFAULT,
              nonblockingApproval: false
            });
            await store.hydrateCaches();
          });
          it("does not hang", async () => {
            await store.processVerifiedMessage(theirUuid, store.VerifiedStatus.DEFAULT, testKey.pubKey);
            import_chai.assert.strictEqual(keychangeTriggered, 0);
          });
        });
      });
    });
    describe("when the new verified status is UNVERIFIED", () => {
      describe("when there is no existing record", () => {
        before(async () => {
          await window.Signal.Data.removeIdentityKeyById(theirUuid.toString());
          await store.hydrateCaches();
        });
        it("saves the new identity and marks it UNVERIFIED", async () => {
          await store.processVerifiedMessage(theirUuid, store.VerifiedStatus.UNVERIFIED, newIdentity);
          const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
          if (!identity) {
            throw new Error("Missing identity!");
          }
          import_chai.assert.strictEqual(identity.verified, store.VerifiedStatus.UNVERIFIED);
          import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(identity.publicKey, newIdentity));
          import_chai.assert.strictEqual(keychangeTriggered, 0);
        });
      });
      describe("when the record exists", () => {
        describe("when the existing key is different", () => {
          before(async () => {
            await window.Signal.Data.createOrUpdateIdentityKey({
              id: theirUuid.toString(),
              publicKey: testKey.pubKey,
              firstUse: true,
              timestamp: Date.now(),
              verified: store.VerifiedStatus.VERIFIED,
              nonblockingApproval: false
            });
            await store.hydrateCaches();
          });
          it("saves the new identity and marks it UNVERIFIED", async () => {
            await store.processVerifiedMessage(theirUuid, store.VerifiedStatus.UNVERIFIED, newIdentity);
            const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
            if (!identity) {
              throw new Error("Missing identity!");
            }
            import_chai.assert.strictEqual(identity.verified, store.VerifiedStatus.UNVERIFIED);
            import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(identity.publicKey, newIdentity));
            import_chai.assert.strictEqual(keychangeTriggered, 1);
          });
        });
        describe("when the key exists and is DEFAULT", () => {
          before(async () => {
            await window.Signal.Data.createOrUpdateIdentityKey({
              id: theirUuid.toString(),
              publicKey: testKey.pubKey,
              firstUse: true,
              timestamp: Date.now(),
              verified: store.VerifiedStatus.DEFAULT,
              nonblockingApproval: false
            });
            await store.hydrateCaches();
          });
          it("updates the verified status", async () => {
            await store.processVerifiedMessage(theirUuid, store.VerifiedStatus.UNVERIFIED, testKey.pubKey);
            const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
            if (!identity) {
              throw new Error("Missing identity!");
            }
            import_chai.assert.strictEqual(identity.verified, store.VerifiedStatus.UNVERIFIED);
            import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(identity.publicKey, testKey.pubKey));
            import_chai.assert.strictEqual(keychangeTriggered, 0);
          });
        });
        describe("when the key exists and is already UNVERIFIED", () => {
          before(async () => {
            await window.Signal.Data.createOrUpdateIdentityKey({
              id: theirUuid.toString(),
              publicKey: testKey.pubKey,
              firstUse: true,
              timestamp: Date.now(),
              verified: store.VerifiedStatus.UNVERIFIED,
              nonblockingApproval: false
            });
            await store.hydrateCaches();
          });
          it("does not hang", async () => {
            await store.processVerifiedMessage(theirUuid, store.VerifiedStatus.UNVERIFIED, testKey.pubKey);
            import_chai.assert.strictEqual(keychangeTriggered, 0);
          });
        });
      });
    });
    describe("when the new verified status is VERIFIED", () => {
      describe("when there is no existing record", () => {
        before(async () => {
          await window.Signal.Data.removeIdentityKeyById(theirUuid.toString());
          await store.hydrateCaches();
        });
        it("saves the new identity and marks it verified", async () => {
          await store.processVerifiedMessage(theirUuid, store.VerifiedStatus.VERIFIED, newIdentity);
          const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
          if (!identity) {
            throw new Error("Missing identity!");
          }
          import_chai.assert.strictEqual(identity.verified, store.VerifiedStatus.VERIFIED);
          import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(identity.publicKey, newIdentity));
          import_chai.assert.strictEqual(keychangeTriggered, 0);
        });
      });
      describe("when the record exists", () => {
        describe("when the existing key is different", () => {
          before(async () => {
            await window.Signal.Data.createOrUpdateIdentityKey({
              id: theirUuid.toString(),
              publicKey: testKey.pubKey,
              firstUse: true,
              timestamp: Date.now(),
              verified: store.VerifiedStatus.VERIFIED,
              nonblockingApproval: false
            });
            await store.hydrateCaches();
          });
          it("saves the new identity and marks it VERIFIED", async () => {
            await store.processVerifiedMessage(theirUuid, store.VerifiedStatus.VERIFIED, newIdentity);
            const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
            if (!identity) {
              throw new Error("Missing identity!");
            }
            import_chai.assert.strictEqual(identity.verified, store.VerifiedStatus.VERIFIED);
            import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(identity.publicKey, newIdentity));
            import_chai.assert.strictEqual(keychangeTriggered, 1);
          });
        });
        describe("when the existing key is the same but UNVERIFIED", () => {
          before(async () => {
            await window.Signal.Data.createOrUpdateIdentityKey({
              id: theirUuid.toString(),
              publicKey: testKey.pubKey,
              firstUse: true,
              timestamp: Date.now(),
              verified: store.VerifiedStatus.UNVERIFIED,
              nonblockingApproval: false
            });
            await store.hydrateCaches();
          });
          it("saves the identity and marks it verified", async () => {
            await store.processVerifiedMessage(theirUuid, store.VerifiedStatus.VERIFIED, testKey.pubKey);
            const identity = await window.Signal.Data.getIdentityKeyById(theirUuid.toString());
            if (!identity) {
              throw new Error("Missing identity!");
            }
            import_chai.assert.strictEqual(identity.verified, store.VerifiedStatus.VERIFIED);
            import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(identity.publicKey, testKey.pubKey));
            import_chai.assert.strictEqual(keychangeTriggered, 0);
          });
        });
        describe("when the existing key is the same and already VERIFIED", () => {
          before(async () => {
            await window.Signal.Data.createOrUpdateIdentityKey({
              id: theirUuid.toString(),
              publicKey: testKey.pubKey,
              firstUse: true,
              timestamp: Date.now(),
              verified: store.VerifiedStatus.VERIFIED,
              nonblockingApproval: false
            });
            await store.hydrateCaches();
          });
          it("does not hang", async () => {
            await store.processVerifiedMessage(theirUuid, store.VerifiedStatus.VERIFIED, testKey.pubKey);
            import_chai.assert.strictEqual(keychangeTriggered, 0);
          });
        });
      });
    });
  });
  describe("isUntrusted", () => {
    it("returns false if identity key old enough", async () => {
      await window.Signal.Data.createOrUpdateIdentityKey({
        id: theirUuid.toString(),
        publicKey: testKey.pubKey,
        timestamp: Date.now() - 10 * 1e3 * 60,
        verified: store.VerifiedStatus.DEFAULT,
        firstUse: false,
        nonblockingApproval: false
      });
      await store.hydrateCaches();
      const untrusted = await store.isUntrusted(theirUuid);
      import_chai.assert.strictEqual(untrusted, false);
    });
    it("returns false if new but nonblockingApproval is true", async () => {
      await window.Signal.Data.createOrUpdateIdentityKey({
        id: theirUuid.toString(),
        publicKey: testKey.pubKey,
        timestamp: Date.now(),
        verified: store.VerifiedStatus.DEFAULT,
        firstUse: false,
        nonblockingApproval: true
      });
      await store.hydrateCaches();
      const untrusted = await store.isUntrusted(theirUuid);
      import_chai.assert.strictEqual(untrusted, false);
    });
    it("returns false if new but firstUse is true", async () => {
      await window.Signal.Data.createOrUpdateIdentityKey({
        id: theirUuid.toString(),
        publicKey: testKey.pubKey,
        timestamp: Date.now(),
        verified: store.VerifiedStatus.DEFAULT,
        firstUse: true,
        nonblockingApproval: false
      });
      await store.hydrateCaches();
      const untrusted = await store.isUntrusted(theirUuid);
      import_chai.assert.strictEqual(untrusted, false);
    });
    it("returns true if new, and no flags are set", async () => {
      await window.Signal.Data.createOrUpdateIdentityKey({
        id: theirUuid.toString(),
        publicKey: testKey.pubKey,
        timestamp: Date.now(),
        verified: store.VerifiedStatus.DEFAULT,
        firstUse: false,
        nonblockingApproval: false
      });
      await store.hydrateCaches();
      const untrusted = await store.isUntrusted(theirUuid);
      import_chai.assert.strictEqual(untrusted, true);
    });
  });
  describe("getVerified", () => {
    before(async () => {
      await store.setVerified(theirUuid, store.VerifiedStatus.VERIFIED);
    });
    it("resolves to the verified status", async () => {
      const result = await store.getVerified(theirUuid);
      import_chai.assert.strictEqual(result, store.VerifiedStatus.VERIFIED);
    });
  });
  describe("isTrustedIdentity", () => {
    const identifier = new import_Address.Address(theirUuid, 1);
    describe("When invalid direction is given", () => {
      it("should fail", async () => {
        await import_chai.assert.isRejected(store.isTrustedIdentity(identifier, testKey.pubKey, "dir"));
      });
    });
    describe("When direction is RECEIVING", () => {
      it("always returns true", async () => {
        const newIdentity = getPublicKey();
        await store.saveIdentity(identifier, testKey.pubKey);
        const trusted = await store.isTrustedIdentity(identifier, newIdentity, import_libsignal_client.Direction.Receiving);
        if (!trusted) {
          throw new Error("isTrusted returned false when receiving");
        }
      });
    });
    describe("When direction is SENDING", () => {
      describe("When there is no existing key (first use)", () => {
        before(async () => {
          await store.removeIdentityKey(theirUuid);
        });
        it("returns true", async () => {
          const newIdentity = getPublicKey();
          const trusted = await store.isTrustedIdentity(identifier, newIdentity, import_libsignal_client.Direction.Sending);
          if (!trusted) {
            throw new Error("isTrusted returned false on first use");
          }
        });
      });
      describe("When there is an existing key", () => {
        before(async () => {
          await store.saveIdentity(identifier, testKey.pubKey);
        });
        describe("When the existing key is different", () => {
          it("returns false", async () => {
            const newIdentity = getPublicKey();
            const trusted = await store.isTrustedIdentity(identifier, newIdentity, import_libsignal_client.Direction.Sending);
            if (trusted) {
              throw new Error("isTrusted returned true on untrusted key");
            }
          });
        });
        describe("When the existing key matches the new key", () => {
          const newIdentity = getPublicKey();
          before(async () => {
            await store.saveIdentity(identifier, newIdentity);
          });
          it("returns false if keys match but we just received this new identiy", async () => {
            const trusted = await store.isTrustedIdentity(identifier, newIdentity, import_libsignal_client.Direction.Sending);
            if (trusted) {
              throw new Error("isTrusted returned true on untrusted key");
            }
          });
          it("returns true if we have already approved identity", async () => {
            await store.saveIdentity(identifier, newIdentity, true);
            const trusted = await store.isTrustedIdentity(identifier, newIdentity, import_libsignal_client.Direction.Sending);
            if (!trusted) {
              throw new Error("isTrusted returned false on an approved key");
            }
          });
        });
      });
    });
  });
  describe("storePreKey", () => {
    it("stores prekeys", async () => {
      await store.storePreKey(ourUuid, 1, testKey);
      const key = await store.loadPreKey(ourUuid, 1);
      if (!key) {
        throw new Error("Missing key!");
      }
      const keyPair = {
        pubKey: key.publicKey().serialize(),
        privKey: key.privateKey().serialize()
      };
      import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(keyPair.pubKey, testKey.pubKey));
      import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(keyPair.privKey, testKey.privKey));
    });
  });
  describe("removePreKey", () => {
    before(async () => {
      await store.storePreKey(ourUuid, 2, testKey);
    });
    it("deletes prekeys", async () => {
      await store.removePreKey(ourUuid, 2);
      const key = await store.loadPreKey(ourUuid, 2);
      import_chai.assert.isUndefined(key);
    });
  });
  describe("storeSignedPreKey", () => {
    it("stores signed prekeys", async () => {
      await store.storeSignedPreKey(ourUuid, 3, testKey);
      const key = await store.loadSignedPreKey(ourUuid, 3);
      if (!key) {
        throw new Error("Missing key!");
      }
      const keyPair = {
        pubKey: key.publicKey().serialize(),
        privKey: key.privateKey().serialize()
      };
      import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(keyPair.pubKey, testKey.pubKey));
      import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(keyPair.privKey, testKey.privKey));
    });
  });
  describe("removeSignedPreKey", () => {
    before(async () => {
      await store.storeSignedPreKey(ourUuid, 4, testKey);
    });
    it("deletes signed prekeys", async () => {
      await store.removeSignedPreKey(ourUuid, 4);
      const key = await store.loadSignedPreKey(ourUuid, 4);
      import_chai.assert.isUndefined(key);
    });
  });
  describe("storeSession", () => {
    it("stores sessions", async () => {
      const testRecord = getSessionRecord();
      const id = new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, 1));
      await store.storeSession(id, testRecord);
      const record = await store.loadSession(id);
      if (!record) {
        throw new Error("Missing record!");
      }
      import_chai.assert.equal(record, testRecord);
    });
  });
  describe("removeAllSessions", () => {
    it("removes all sessions for a uuid", async () => {
      const devices = [1, 2, 3].map((deviceId) => new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, deviceId)));
      await Promise.all(devices.map(async (encodedAddress) => {
        await store.storeSession(encodedAddress, getSessionRecord());
      }));
      await store.removeAllSessions(theirUuid.toString());
      const records = await Promise.all(devices.map((device) => store.loadSession(device)));
      for (let i = 0, max = records.length; i < max; i += 1) {
        import_chai.assert.isUndefined(records[i]);
      }
    });
  });
  describe("clearSessionStore", () => {
    it("clears the session store", async () => {
      const testRecord = getSessionRecord();
      const id = new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, 1));
      await store.storeSession(id, testRecord);
      await store.clearSessionStore();
      const record = await store.loadSession(id);
      import_chai.assert.isUndefined(record);
    });
  });
  describe("getDeviceIds", () => {
    it("returns deviceIds for a uuid", async () => {
      const openRecord = getSessionRecord(true);
      const openDevices = [1, 2, 3, 10].map((deviceId) => new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, deviceId)));
      await Promise.all(openDevices.map(async (address) => {
        await store.storeSession(address, openRecord);
      }));
      const closedRecord = getSessionRecord(false);
      await store.storeSession(new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, 11)), closedRecord);
      const deviceIds = await store.getDeviceIds({
        ourUuid,
        identifier: theirUuid.toString()
      });
      import_chai.assert.sameMembers(deviceIds, [1, 2, 3, 10]);
    });
    it("returns empty array for a uuid with no device ids", async () => {
      const deviceIds = await store.getDeviceIds({
        ourUuid,
        identifier: "foo"
      });
      import_chai.assert.sameMembers(deviceIds, []);
    });
  });
  describe("getOpenDevices", () => {
    it("returns all open devices for a uuid", async () => {
      const openRecord = getSessionRecord(true);
      const openDevices = [1, 2, 3, 10].map((deviceId) => new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, deviceId)));
      await Promise.all(openDevices.map(async (address) => {
        await store.storeSession(address, openRecord);
      }));
      const closedRecord = getSessionRecord(false);
      await store.storeSession(new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, 11)), closedRecord);
      const result = await store.getOpenDevices(ourUuid, [
        theirUuid.toString(),
        "blah",
        "blah2"
      ]);
      import_chai.assert.deepStrictEqual({
        ...result,
        devices: result.devices.map(({ id, identifier, registrationId }) => ({
          id,
          identifier: identifier.toString(),
          registrationId
        }))
      }, {
        devices: [
          {
            id: 1,
            identifier: theirUuid.toString(),
            registrationId: 243
          },
          {
            id: 2,
            identifier: theirUuid.toString(),
            registrationId: 243
          },
          {
            id: 3,
            identifier: theirUuid.toString(),
            registrationId: 243
          },
          {
            id: 10,
            identifier: theirUuid.toString(),
            registrationId: 243
          }
        ],
        emptyIdentifiers: ["blah", "blah2"]
      });
    });
    it("returns empty array for a uuid with no device ids", async () => {
      const result = await store.getOpenDevices(ourUuid, ["foo"]);
      import_chai.assert.deepEqual(result, {
        devices: [],
        emptyIdentifiers: ["foo"]
      });
    });
  });
  describe("zones", () => {
    const distributionId = import_UUID.UUID.generate().toString();
    const zone = new import_Zone.Zone("zone", {
      pendingSenderKeys: true,
      pendingSessions: true,
      pendingUnprocessed: true
    });
    beforeEach(async () => {
      await store.removeAllUnprocessed();
      await store.removeAllSessions(theirUuid.toString());
      await store.removeAllSenderKeys();
    });
    it("should not store pending sessions in global zone", async () => {
      const id = new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, 1));
      const testRecord = getSessionRecord();
      await import_chai.assert.isRejected(store.withZone(import_SignalProtocolStore.GLOBAL_ZONE, "test", async () => {
        await store.storeSession(id, testRecord);
        throw new Error("Failure");
      }), "Failure");
      import_chai.assert.equal(await store.loadSession(id), testRecord);
    });
    it("should not store pending sender keys in global zone", async () => {
      const id = new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, 1));
      const testRecord = getSenderKeyRecord();
      await import_chai.assert.isRejected(store.withZone(import_SignalProtocolStore.GLOBAL_ZONE, "test", async () => {
        await store.saveSenderKey(id, distributionId, testRecord);
        throw new Error("Failure");
      }), "Failure");
      import_chai.assert.equal(await store.getSenderKey(id, distributionId), testRecord);
    });
    it("commits sender keys, sessions and unprocessed on success", async () => {
      const id = new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, 1));
      const testSession = getSessionRecord();
      const testSenderKey = getSenderKeyRecord();
      await store.withZone(zone, "test", async () => {
        await store.storeSession(id, testSession, { zone });
        await store.saveSenderKey(id, distributionId, testSenderKey, { zone });
        await store.addUnprocessed({
          id: "2-two",
          envelope: "second",
          timestamp: Date.now() + 2,
          receivedAtCounter: 0,
          version: 2,
          attempts: 0
        }, { zone });
        import_chai.assert.equal(await store.loadSession(id, { zone }), testSession);
        import_chai.assert.equal(await store.getSenderKey(id, distributionId, { zone }), testSenderKey);
      });
      import_chai.assert.equal(await store.loadSession(id), testSession);
      import_chai.assert.equal(await store.getSenderKey(id, distributionId), testSenderKey);
      const allUnprocessed = await store.getAllUnprocessedAndIncrementAttempts();
      import_chai.assert.deepEqual(allUnprocessed.map(({ envelope }) => envelope), ["second"]);
    });
    it("reverts sender keys, sessions and unprocessed on error", async () => {
      const id = new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, 1));
      const testSession = getSessionRecord();
      const failedSession = getSessionRecord();
      const testSenderKey = getSenderKeyRecord();
      const failedSenderKey = getSenderKeyRecord();
      await store.storeSession(id, testSession);
      import_chai.assert.equal(await store.loadSession(id), testSession);
      await store.saveSenderKey(id, distributionId, testSenderKey);
      import_chai.assert.equal(await store.getSenderKey(id, distributionId), testSenderKey);
      await import_chai.assert.isRejected(store.withZone(zone, "test", async () => {
        await store.storeSession(id, failedSession, { zone });
        import_chai.assert.equal(await store.loadSession(id, { zone }), failedSession);
        await store.saveSenderKey(id, distributionId, failedSenderKey, {
          zone
        });
        import_chai.assert.equal(await store.getSenderKey(id, distributionId, { zone }), failedSenderKey);
        await store.addUnprocessed({
          id: "2-two",
          envelope: "second",
          timestamp: 2,
          receivedAtCounter: 0,
          version: 2,
          attempts: 0
        }, { zone });
        throw new Error("Failure");
      }), "Failure");
      import_chai.assert.equal(await store.loadSession(id), testSession);
      import_chai.assert.equal(await store.getSenderKey(id, distributionId), testSenderKey);
      import_chai.assert.deepEqual(await store.getAllUnprocessedAndIncrementAttempts(), []);
    });
    it("can be re-entered", async () => {
      const id = new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, 1));
      const testRecord = getSessionRecord();
      await store.withZone(zone, "test", async () => {
        await store.withZone(zone, "nested", async () => {
          await store.storeSession(id, testRecord, { zone });
          import_chai.assert.equal(await store.loadSession(id, { zone }), testRecord);
        });
        import_chai.assert.equal(await store.loadSession(id, { zone }), testRecord);
      });
      import_chai.assert.equal(await store.loadSession(id), testRecord);
    });
    it("can be re-entered after waiting", async () => {
      const a = new import_Zone.Zone("a");
      const b = new import_Zone.Zone("b");
      const order = [];
      const promises = [];
      promises.push(store.withZone(a, "a", async () => order.push(1)));
      promises.push(store.withZone(b, "b", async () => order.push(2)));
      await Promise.resolve();
      await Promise.resolve();
      promises.push(store.withZone(a, "a again", async () => order.push(3)));
      await Promise.all(promises);
      import_chai.assert.deepEqual(order, [1, 2, 3]);
    });
    it("should not deadlock in archiveSiblingSessions", async () => {
      const id = new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, 1));
      const sibling = new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, 2));
      await store.storeSession(id, getSessionRecord(true));
      await store.storeSession(sibling, getSessionRecord(true));
      await store.archiveSiblingSessions(id.address, { zone });
    });
    it("can be concurrently re-entered after waiting", async () => {
      const a = new import_Zone.Zone("a");
      const b = new import_Zone.Zone("b");
      const order = [];
      const promises = [];
      promises.push(store.withZone(a, "a", async () => order.push(1)));
      promises.push(store.withZone(b, "b", async () => {
        order.push(2);
        await Promise.resolve();
        order.push(22);
      }));
      promises.push(store.withZone(b, "b", async () => {
        order.push(3);
        await Promise.resolve();
        order.push(33);
      }));
      await Promise.resolve();
      await Promise.resolve();
      await Promise.all(promises);
      import_chai.assert.deepEqual(order, [1, 2, 3, 22, 33]);
    });
  });
  describe("Not yet processed messages", () => {
    const NOW = Date.now();
    beforeEach(async () => {
      await store.removeAllUnprocessed();
      const items = await store.getAllUnprocessedAndIncrementAttempts();
      import_chai.assert.strictEqual(items.length, 0);
    });
    it("adds three and gets them back", async () => {
      await Promise.all([
        store.addUnprocessed({
          id: "0-dropped",
          envelope: "old envelope",
          timestamp: NOW - 2 * durations.MONTH,
          receivedAtCounter: -1,
          version: 2,
          attempts: 0
        }),
        store.addUnprocessed({
          id: "2-two",
          envelope: "second",
          timestamp: NOW + 2,
          receivedAtCounter: 1,
          version: 2,
          attempts: 0
        }),
        store.addUnprocessed({
          id: "3-three",
          envelope: "third",
          timestamp: NOW + 3,
          receivedAtCounter: 2,
          version: 2,
          attempts: 0
        }),
        store.addUnprocessed({
          id: "1-one",
          envelope: "first",
          timestamp: NOW + 1,
          receivedAtCounter: 0,
          version: 2,
          attempts: 0
        })
      ]);
      const items = await store.getAllUnprocessedAndIncrementAttempts();
      import_chai.assert.strictEqual(items.length, 3);
      import_chai.assert.strictEqual(items[0].envelope, "first");
      import_chai.assert.strictEqual(items[1].envelope, "second");
      import_chai.assert.strictEqual(items[2].envelope, "third");
    });
    it("can updates items", async () => {
      const id = "1-one";
      await store.addUnprocessed({
        id,
        envelope: "first",
        timestamp: NOW + 1,
        receivedAtCounter: 0,
        version: 2,
        attempts: 0
      });
      await store.updateUnprocessedWithData(id, { decrypted: "updated" });
      const items = await store.getAllUnprocessedAndIncrementAttempts();
      import_chai.assert.strictEqual(items.length, 1);
      import_chai.assert.strictEqual(items[0].decrypted, "updated");
      import_chai.assert.strictEqual(items[0].timestamp, NOW + 1);
      import_chai.assert.strictEqual(items[0].attempts, 1);
    });
    it("removeUnprocessed successfully deletes item", async () => {
      const id = "1-one";
      await store.addUnprocessed({
        id,
        envelope: "first",
        timestamp: NOW + 1,
        receivedAtCounter: 0,
        version: 2,
        attempts: 0
      });
      await store.removeUnprocessed(id);
      const items = await store.getAllUnprocessedAndIncrementAttempts();
      import_chai.assert.strictEqual(items.length, 0);
    });
    it("getAllUnprocessedAndIncrementAttempts deletes items", async () => {
      await store.addUnprocessed({
        id: "1-one",
        envelope: "first",
        timestamp: NOW + 1,
        receivedAtCounter: 0,
        version: 2,
        attempts: 3
      });
      const items = await store.getAllUnprocessedAndIncrementAttempts();
      import_chai.assert.strictEqual(items.length, 0);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2lnbmFsUHJvdG9jb2xTdG9yZV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxNS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuXG5pbXBvcnQgY2hhaSwgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCB7XG4gIERpcmVjdGlvbixcbiAgU2VuZGVyS2V5UmVjb3JkLFxuICBTZXNzaW9uUmVjb3JkLFxufSBmcm9tICdAc2lnbmFsYXBwL2xpYnNpZ25hbC1jbGllbnQnO1xuXG5pbXBvcnQgeyBzaWduYWwgfSBmcm9tICcuLi9wcm90b2J1Zi9jb21waWxlZCc7XG5pbXBvcnQgeyBzZXNzaW9uU3RydWN0dXJlVG9CeXRlcyB9IGZyb20gJy4uL3V0aWwvc2Vzc2lvblRyYW5zbGF0aW9uJztcbmltcG9ydCAqIGFzIGR1cmF0aW9ucyBmcm9tICcuLi91dGlsL2R1cmF0aW9ucyc7XG5pbXBvcnQgeyBab25lIH0gZnJvbSAnLi4vdXRpbC9ab25lJztcblxuaW1wb3J0ICogYXMgQnl0ZXMgZnJvbSAnLi4vQnl0ZXMnO1xuaW1wb3J0IHsgZ2V0UmFuZG9tQnl0ZXMsIGNvbnN0YW50VGltZUVxdWFsIH0gZnJvbSAnLi4vQ3J5cHRvJztcbmltcG9ydCB7IGNsYW1wUHJpdmF0ZUtleSwgc2V0UHVibGljS2V5VHlwZUJ5dGUgfSBmcm9tICcuLi9DdXJ2ZSc7XG5pbXBvcnQgdHlwZSB7IFNpZ25hbFByb3RvY29sU3RvcmUgfSBmcm9tICcuLi9TaWduYWxQcm90b2NvbFN0b3JlJztcbmltcG9ydCB7IEdMT0JBTF9aT05FIH0gZnJvbSAnLi4vU2lnbmFsUHJvdG9jb2xTdG9yZSc7XG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSAnLi4vdHlwZXMvQWRkcmVzcyc7XG5pbXBvcnQgeyBRdWFsaWZpZWRBZGRyZXNzIH0gZnJvbSAnLi4vdHlwZXMvUXVhbGlmaWVkQWRkcmVzcyc7XG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgdHlwZSB7IElkZW50aXR5S2V5VHlwZSwgS2V5UGFpclR5cGUgfSBmcm9tICcuLi90ZXh0c2VjdXJlL1R5cGVzLmQnO1xuXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmNvbnN0IHtcbiAgUmVjb3JkU3RydWN0dXJlLFxuICBTZXNzaW9uU3RydWN0dXJlLFxuICBTZW5kZXJLZXlSZWNvcmRTdHJ1Y3R1cmUsXG4gIFNlbmRlcktleVN0YXRlU3RydWN0dXJlLFxufSA9IHNpZ25hbC5wcm90by5zdG9yYWdlO1xuXG5kZXNjcmliZSgnU2lnbmFsUHJvdG9jb2xTdG9yZScsICgpID0+IHtcbiAgY29uc3Qgb3VyVXVpZCA9IFVVSUQuZ2VuZXJhdGUoKTtcbiAgY29uc3QgdGhlaXJVdWlkID0gVVVJRC5nZW5lcmF0ZSgpO1xuICBsZXQgc3RvcmU6IFNpZ25hbFByb3RvY29sU3RvcmU7XG4gIGxldCBpZGVudGl0eUtleTogS2V5UGFpclR5cGU7XG4gIGxldCB0ZXN0S2V5OiBLZXlQYWlyVHlwZTtcblxuICBmdW5jdGlvbiBnZXRTZXNzaW9uUmVjb3JkKGlzT3Blbj86IGJvb2xlYW4pOiBTZXNzaW9uUmVjb3JkIHtcbiAgICBjb25zdCBwcm90byA9IG5ldyBSZWNvcmRTdHJ1Y3R1cmUoKTtcblxuICAgIHByb3RvLnByZXZpb3VzU2Vzc2lvbnMgPSBbXTtcblxuICAgIGlmIChpc09wZW4pIHtcbiAgICAgIHByb3RvLmN1cnJlbnRTZXNzaW9uID0gbmV3IFNlc3Npb25TdHJ1Y3R1cmUoKTtcblxuICAgICAgcHJvdG8uY3VycmVudFNlc3Npb24uYWxpY2VCYXNlS2V5ID0gZ2V0UHVibGljS2V5KCk7XG4gICAgICBwcm90by5jdXJyZW50U2Vzc2lvbi5sb2NhbElkZW50aXR5UHVibGljID0gZ2V0UHVibGljS2V5KCk7XG4gICAgICBwcm90by5jdXJyZW50U2Vzc2lvbi5sb2NhbFJlZ2lzdHJhdGlvbklkID0gNDM1O1xuXG4gICAgICBwcm90by5jdXJyZW50U2Vzc2lvbi5wcmV2aW91c0NvdW50ZXIgPSAxO1xuICAgICAgcHJvdG8uY3VycmVudFNlc3Npb24ucmVtb3RlSWRlbnRpdHlQdWJsaWMgPSBnZXRQdWJsaWNLZXkoKTtcbiAgICAgIHByb3RvLmN1cnJlbnRTZXNzaW9uLnJlbW90ZVJlZ2lzdHJhdGlvbklkID0gMjQzO1xuXG4gICAgICBwcm90by5jdXJyZW50U2Vzc2lvbi5yb290S2V5ID0gZ2V0UHJpdmF0ZUtleSgpO1xuICAgICAgcHJvdG8uY3VycmVudFNlc3Npb24uc2Vzc2lvblZlcnNpb24gPSAzO1xuICAgIH1cblxuICAgIHJldHVybiBTZXNzaW9uUmVjb3JkLmRlc2VyaWFsaXplKFxuICAgICAgQnVmZmVyLmZyb20oc2Vzc2lvblN0cnVjdHVyZVRvQnl0ZXMocHJvdG8pKVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTZW5kZXJLZXlSZWNvcmQoKTogU2VuZGVyS2V5UmVjb3JkIHtcbiAgICBjb25zdCBwcm90byA9IG5ldyBTZW5kZXJLZXlSZWNvcmRTdHJ1Y3R1cmUoKTtcblxuICAgIGNvbnN0IHN0YXRlID0gbmV3IFNlbmRlcktleVN0YXRlU3RydWN0dXJlKCk7XG5cbiAgICBzdGF0ZS5zZW5kZXJLZXlJZCA9IDQ7XG5cbiAgICBjb25zdCBzZW5kZXJDaGFpbktleSA9IG5ldyBTZW5kZXJLZXlTdGF0ZVN0cnVjdHVyZS5TZW5kZXJDaGFpbktleSgpO1xuXG4gICAgc2VuZGVyQ2hhaW5LZXkuaXRlcmF0aW9uID0gMTA7XG4gICAgc2VuZGVyQ2hhaW5LZXkuc2VlZCA9IGdldFB1YmxpY0tleSgpO1xuICAgIHN0YXRlLnNlbmRlckNoYWluS2V5ID0gc2VuZGVyQ2hhaW5LZXk7XG5cbiAgICBjb25zdCBzZW5kZXJTaWduaW5nS2V5ID0gbmV3IFNlbmRlcktleVN0YXRlU3RydWN0dXJlLlNlbmRlclNpZ25pbmdLZXkoKTtcbiAgICBzZW5kZXJTaWduaW5nS2V5LnB1YmxpYyA9IGdldFB1YmxpY0tleSgpO1xuICAgIHNlbmRlclNpZ25pbmdLZXkucHJpdmF0ZSA9IGdldFByaXZhdGVLZXkoKTtcblxuICAgIHN0YXRlLnNlbmRlclNpZ25pbmdLZXkgPSBzZW5kZXJTaWduaW5nS2V5O1xuXG4gICAgc3RhdGUuc2VuZGVyTWVzc2FnZUtleXMgPSBbXTtcbiAgICBjb25zdCBtZXNzYWdlS2V5ID0gbmV3IFNlbmRlcktleVN0YXRlU3RydWN0dXJlLlNlbmRlck1lc3NhZ2VLZXkoKTtcbiAgICBtZXNzYWdlS2V5Lml0ZXJhdGlvbiA9IDIzNDtcbiAgICBtZXNzYWdlS2V5LnNlZWQgPSBnZXRQdWJsaWNLZXkoKTtcbiAgICBzdGF0ZS5zZW5kZXJNZXNzYWdlS2V5cy5wdXNoKG1lc3NhZ2VLZXkpO1xuXG4gICAgcHJvdG8uc2VuZGVyS2V5U3RhdGVzID0gW107XG4gICAgcHJvdG8uc2VuZGVyS2V5U3RhdGVzLnB1c2goc3RhdGUpO1xuXG4gICAgcmV0dXJuIFNlbmRlcktleVJlY29yZC5kZXNlcmlhbGl6ZShcbiAgICAgIEJ1ZmZlci5mcm9tKFxuICAgICAgICBzaWduYWwucHJvdG8uc3RvcmFnZS5TZW5kZXJLZXlSZWNvcmRTdHJ1Y3R1cmUuZW5jb2RlKHByb3RvKS5maW5pc2goKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQcml2YXRlS2V5KCkge1xuICAgIGNvbnN0IGtleSA9IGdldFJhbmRvbUJ5dGVzKDMyKTtcbiAgICBjbGFtcFByaXZhdGVLZXkoa2V5KTtcbiAgICByZXR1cm4ga2V5O1xuICB9XG4gIGZ1bmN0aW9uIGdldFB1YmxpY0tleSgpIHtcbiAgICBjb25zdCBrZXkgPSBnZXRSYW5kb21CeXRlcygzMyk7XG4gICAgc2V0UHVibGljS2V5VHlwZUJ5dGUoa2V5KTtcbiAgICByZXR1cm4ga2V5O1xuICB9XG5cbiAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICBzdG9yZSA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UucHJvdG9jb2w7XG4gICAgc3RvcmUuaHlkcmF0ZUNhY2hlcygpO1xuICAgIGlkZW50aXR5S2V5ID0ge1xuICAgICAgcHViS2V5OiBnZXRQdWJsaWNLZXkoKSxcbiAgICAgIHByaXZLZXk6IGdldFByaXZhdGVLZXkoKSxcbiAgICB9O1xuICAgIHRlc3RLZXkgPSB7XG4gICAgICBwdWJLZXk6IGdldFB1YmxpY0tleSgpLFxuICAgICAgcHJpdktleTogZ2V0UHJpdmF0ZUtleSgpLFxuICAgIH07XG5cbiAgICBzZXRQdWJsaWNLZXlUeXBlQnl0ZShpZGVudGl0eUtleS5wdWJLZXkpO1xuICAgIHNldFB1YmxpY0tleVR5cGVCeXRlKHRlc3RLZXkucHViS2V5KTtcblxuICAgIGNsYW1wUHJpdmF0ZUtleShpZGVudGl0eUtleS5wcml2S2V5KTtcbiAgICBjbGFtcFByaXZhdGVLZXkodGVzdEtleS5wcml2S2V5KTtcblxuICAgIHdpbmRvdy5zdG9yYWdlLnB1dCgncmVnaXN0cmF0aW9uSWRNYXAnLCB7IFtvdXJVdWlkLnRvU3RyaW5nKCldOiAxMzM3IH0pO1xuICAgIHdpbmRvdy5zdG9yYWdlLnB1dCgnaWRlbnRpdHlLZXlNYXAnLCB7XG4gICAgICBbb3VyVXVpZC50b1N0cmluZygpXToge1xuICAgICAgICBwcml2S2V5OiBCeXRlcy50b0Jhc2U2NChpZGVudGl0eUtleS5wcml2S2V5KSxcbiAgICAgICAgcHViS2V5OiBCeXRlcy50b0Jhc2U2NChpZGVudGl0eUtleS5wdWJLZXkpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBhd2FpdCB3aW5kb3cuc3RvcmFnZS5mZXRjaCgpO1xuXG4gICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIucmVzZXQoKTtcbiAgICBhd2FpdCB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5sb2FkKCk7XG4gICAgYXdhaXQgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3JDcmVhdGVBbmRXYWl0KFxuICAgICAgdGhlaXJVdWlkLnRvU3RyaW5nKCksXG4gICAgICAncHJpdmF0ZSdcbiAgICApO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0TG9jYWxSZWdpc3RyYXRpb25JZCcsICgpID0+IHtcbiAgICBpdCgncmV0cmlldmVzIG15IHJlZ2lzdHJhdGlvbiBpZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHN0b3JlLmh5ZHJhdGVDYWNoZXMoKTtcbiAgICAgIGNvbnN0IGlkID0gYXdhaXQgc3RvcmUuZ2V0TG9jYWxSZWdpc3RyYXRpb25JZChvdXJVdWlkKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChpZCwgMTMzNyk7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZ2V0SWRlbnRpdHlLZXlQYWlyJywgKCkgPT4ge1xuICAgIGl0KCdyZXRyaWV2ZXMgbXkgaWRlbnRpdHkga2V5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgc3RvcmUuaHlkcmF0ZUNhY2hlcygpO1xuICAgICAgY29uc3Qga2V5ID0gYXdhaXQgc3RvcmUuZ2V0SWRlbnRpdHlLZXlQYWlyKG91clV1aWQpO1xuICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGtleSEnKTtcbiAgICAgIH1cblxuICAgICAgYXNzZXJ0LmlzVHJ1ZShjb25zdGFudFRpbWVFcXVhbChrZXkucHViS2V5LCBpZGVudGl0eUtleS5wdWJLZXkpKTtcbiAgICAgIGFzc2VydC5pc1RydWUoY29uc3RhbnRUaW1lRXF1YWwoa2V5LnByaXZLZXksIGlkZW50aXR5S2V5LnByaXZLZXkpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3NlbmRlcktleXMnLCAoKSA9PiB7XG4gICAgaXQoJ3JvdW5kdHJpcHMgaW4gbWVtb3J5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZGlzdHJpYnV0aW9uSWQgPSBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gZ2V0U2VuZGVyS2V5UmVjb3JkKCk7XG5cbiAgICAgIGNvbnN0IGRldmljZUlkID0gMTtcbiAgICAgIGNvbnN0IHF1YWxpZmllZEFkZHJlc3MgPSBuZXcgUXVhbGlmaWVkQWRkcmVzcyhcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgICAgbmV3IEFkZHJlc3ModGhlaXJVdWlkLCBkZXZpY2VJZClcbiAgICAgICk7XG5cbiAgICAgIGF3YWl0IHN0b3JlLnNhdmVTZW5kZXJLZXkocXVhbGlmaWVkQWRkcmVzcywgZGlzdHJpYnV0aW9uSWQsIGV4cGVjdGVkKTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gYXdhaXQgc3RvcmUuZ2V0U2VuZGVyS2V5KHF1YWxpZmllZEFkZHJlc3MsIGRpc3RyaWJ1dGlvbklkKTtcbiAgICAgIGlmICghYWN0dWFsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZ2V0U2VuZGVyS2V5IHJldHVybmVkIG5vdGhpbmchJyk7XG4gICAgICB9XG5cbiAgICAgIGFzc2VydC5pc1RydWUoXG4gICAgICAgIGNvbnN0YW50VGltZUVxdWFsKGV4cGVjdGVkLnNlcmlhbGl6ZSgpLCBhY3R1YWwuc2VyaWFsaXplKCkpXG4gICAgICApO1xuXG4gICAgICBhd2FpdCBzdG9yZS5yZW1vdmVTZW5kZXJLZXkocXVhbGlmaWVkQWRkcmVzcywgZGlzdHJpYnV0aW9uSWQpO1xuXG4gICAgICBjb25zdCBwb3N0RGVsZXRlR2V0ID0gYXdhaXQgc3RvcmUuZ2V0U2VuZGVyS2V5KFxuICAgICAgICBxdWFsaWZpZWRBZGRyZXNzLFxuICAgICAgICBkaXN0cmlidXRpb25JZFxuICAgICAgKTtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChwb3N0RGVsZXRlR2V0KTtcbiAgICB9KTtcblxuICAgIGl0KCdyb3VuZHRyaXBzIHRocm91Z2ggZGF0YWJhc2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBkaXN0cmlidXRpb25JZCA9IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBnZXRTZW5kZXJLZXlSZWNvcmQoKTtcblxuICAgICAgY29uc3QgZGV2aWNlSWQgPSAxO1xuICAgICAgY29uc3QgcXVhbGlmaWVkQWRkcmVzcyA9IG5ldyBRdWFsaWZpZWRBZGRyZXNzKFxuICAgICAgICBvdXJVdWlkLFxuICAgICAgICBuZXcgQWRkcmVzcyh0aGVpclV1aWQsIGRldmljZUlkKVxuICAgICAgKTtcblxuICAgICAgYXdhaXQgc3RvcmUuc2F2ZVNlbmRlcktleShxdWFsaWZpZWRBZGRyZXNzLCBkaXN0cmlidXRpb25JZCwgZXhwZWN0ZWQpO1xuXG4gICAgICAvLyBSZS1mZXRjaCBmcm9tIHRoZSBkYXRhYmFzZSB0byBlbnN1cmUgd2UgZ2V0IHRoZSBsYXRlc3QgZGF0YWJhc2UgdmFsdWVcbiAgICAgIGF3YWl0IHN0b3JlLmh5ZHJhdGVDYWNoZXMoKTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gYXdhaXQgc3RvcmUuZ2V0U2VuZGVyS2V5KHF1YWxpZmllZEFkZHJlc3MsIGRpc3RyaWJ1dGlvbklkKTtcbiAgICAgIGlmICghYWN0dWFsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZ2V0U2VuZGVyS2V5IHJldHVybmVkIG5vdGhpbmchJyk7XG4gICAgICB9XG5cbiAgICAgIGFzc2VydC5pc1RydWUoXG4gICAgICAgIGNvbnN0YW50VGltZUVxdWFsKGV4cGVjdGVkLnNlcmlhbGl6ZSgpLCBhY3R1YWwuc2VyaWFsaXplKCkpXG4gICAgICApO1xuXG4gICAgICBhd2FpdCBzdG9yZS5yZW1vdmVTZW5kZXJLZXkocXVhbGlmaWVkQWRkcmVzcywgZGlzdHJpYnV0aW9uSWQpO1xuXG4gICAgICAvLyBSZS1mZXRjaCBmcm9tIHRoZSBkYXRhYmFzZSB0byBlbnN1cmUgd2UgZ2V0IHRoZSBsYXRlc3QgZGF0YWJhc2UgdmFsdWVcbiAgICAgIGF3YWl0IHN0b3JlLmh5ZHJhdGVDYWNoZXMoKTtcblxuICAgICAgY29uc3QgcG9zdERlbGV0ZUdldCA9IGF3YWl0IHN0b3JlLmdldFNlbmRlcktleShcbiAgICAgICAgcXVhbGlmaWVkQWRkcmVzcyxcbiAgICAgICAgZGlzdHJpYnV0aW9uSWRcbiAgICAgICk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQocG9zdERlbGV0ZUdldCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdzYXZlSWRlbnRpdHknLCAoKSA9PiB7XG4gICAgY29uc3QgaWRlbnRpZmllciA9IG5ldyBBZGRyZXNzKHRoZWlyVXVpZCwgMSk7XG5cbiAgICBpdCgnc3RvcmVzIGlkZW50aXR5IGtleXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBzdG9yZS5zYXZlSWRlbnRpdHkoaWRlbnRpZmllciwgdGVzdEtleS5wdWJLZXkpO1xuICAgICAgY29uc3Qga2V5ID0gYXdhaXQgc3RvcmUubG9hZElkZW50aXR5S2V5KHRoZWlyVXVpZCk7XG4gICAgICBpZiAoIWtleSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcga2V5IScpO1xuICAgICAgfVxuXG4gICAgICBhc3NlcnQuaXNUcnVlKGNvbnN0YW50VGltZUVxdWFsKGtleSwgdGVzdEtleS5wdWJLZXkpKTtcbiAgICB9KTtcbiAgICBpdCgnYWxsb3dzIGtleSBjaGFuZ2VzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgbmV3SWRlbnRpdHkgPSBnZXRQdWJsaWNLZXkoKTtcbiAgICAgIGF3YWl0IHN0b3JlLnNhdmVJZGVudGl0eShpZGVudGlmaWVyLCB0ZXN0S2V5LnB1YktleSk7XG4gICAgICBhd2FpdCBzdG9yZS5zYXZlSWRlbnRpdHkoaWRlbnRpZmllciwgbmV3SWRlbnRpdHkpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ1doZW4gdGhlcmUgaXMgbm8gZXhpc3Rpbmcga2V5IChmaXJzdCB1c2UpJywgKCkgPT4ge1xuICAgICAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgc3RvcmUucmVtb3ZlSWRlbnRpdHlLZXkodGhlaXJVdWlkKTtcbiAgICAgICAgYXdhaXQgc3RvcmUuc2F2ZUlkZW50aXR5KGlkZW50aWZpZXIsIHRlc3RLZXkucHViS2V5KTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ21hcmtzIHRoZSBrZXkgZmlyc3RVc2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmdldElkZW50aXR5S2V5QnlJZChcbiAgICAgICAgICB0aGVpclV1aWQudG9TdHJpbmcoKVxuICAgICAgICApO1xuICAgICAgICBpZiAoIWlkZW50aXR5KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGlkZW50aXR5IScpO1xuICAgICAgICB9XG4gICAgICAgIGFzc2VydChpZGVudGl0eS5maXJzdFVzZSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzZXRzIHRoZSB0aW1lc3RhbXAnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmdldElkZW50aXR5S2V5QnlJZChcbiAgICAgICAgICB0aGVpclV1aWQudG9TdHJpbmcoKVxuICAgICAgICApO1xuICAgICAgICBpZiAoIWlkZW50aXR5KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGlkZW50aXR5IScpO1xuICAgICAgICB9XG4gICAgICAgIGFzc2VydChpZGVudGl0eS50aW1lc3RhbXApO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2V0cyB0aGUgdmVyaWZpZWQgc3RhdHVzIHRvIERFRkFVTFQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmdldElkZW50aXR5S2V5QnlJZChcbiAgICAgICAgICB0aGVpclV1aWQudG9TdHJpbmcoKVxuICAgICAgICApO1xuICAgICAgICBpZiAoIWlkZW50aXR5KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGlkZW50aXR5IScpO1xuICAgICAgICB9XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChpZGVudGl0eS52ZXJpZmllZCwgc3RvcmUuVmVyaWZpZWRTdGF0dXMuREVGQVVMVCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnV2hlbiB0aGVyZSBpcyBhIGRpZmZlcmVudCBleGlzdGluZyBrZXkgKG5vbiBmaXJzdCB1c2UpJywgKCkgPT4ge1xuICAgICAgY29uc3QgbmV3SWRlbnRpdHkgPSBnZXRQdWJsaWNLZXkoKTtcbiAgICAgIGNvbnN0IG9sZFRpbWVzdGFtcCA9IERhdGUubm93KCk7XG5cbiAgICAgIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5jcmVhdGVPclVwZGF0ZUlkZW50aXR5S2V5KHtcbiAgICAgICAgICBpZDogdGhlaXJVdWlkLnRvU3RyaW5nKCksXG4gICAgICAgICAgcHVibGljS2V5OiB0ZXN0S2V5LnB1YktleSxcbiAgICAgICAgICBmaXJzdFVzZTogdHJ1ZSxcbiAgICAgICAgICB0aW1lc3RhbXA6IG9sZFRpbWVzdGFtcCxcbiAgICAgICAgICBub25ibG9ja2luZ0FwcHJvdmFsOiBmYWxzZSxcbiAgICAgICAgICB2ZXJpZmllZDogc3RvcmUuVmVyaWZpZWRTdGF0dXMuREVGQVVMVCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXdhaXQgc3RvcmUuaHlkcmF0ZUNhY2hlcygpO1xuICAgICAgICBhd2FpdCBzdG9yZS5zYXZlSWRlbnRpdHkoaWRlbnRpZmllciwgbmV3SWRlbnRpdHkpO1xuICAgICAgfSk7XG4gICAgICBpdCgnbWFya3MgdGhlIGtleSBub3QgZmlyc3RVc2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmdldElkZW50aXR5S2V5QnlJZChcbiAgICAgICAgICB0aGVpclV1aWQudG9TdHJpbmcoKVxuICAgICAgICApO1xuICAgICAgICBpZiAoIWlkZW50aXR5KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGlkZW50aXR5IScpO1xuICAgICAgICB9XG4gICAgICAgIGFzc2VydCghaWRlbnRpdHkuZmlyc3RVc2UpO1xuICAgICAgfSk7XG4gICAgICBpdCgndXBkYXRlcyB0aGUgdGltZXN0YW1wJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRJZGVudGl0eUtleUJ5SWQoXG4gICAgICAgICAgdGhlaXJVdWlkLnRvU3RyaW5nKClcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKCFpZGVudGl0eSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBpZGVudGl0eSEnKTtcbiAgICAgICAgfVxuICAgICAgICBhc3NlcnQubm90RXF1YWwoaWRlbnRpdHkudGltZXN0YW1wLCBvbGRUaW1lc3RhbXApO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdUaGUgcHJldmlvdXMgdmVyaWZpZWQgc3RhdHVzIHdhcyBERUZBVUxUJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5jcmVhdGVPclVwZGF0ZUlkZW50aXR5S2V5KHtcbiAgICAgICAgICAgIGlkOiB0aGVpclV1aWQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIHB1YmxpY0tleTogdGVzdEtleS5wdWJLZXksXG4gICAgICAgICAgICBmaXJzdFVzZTogdHJ1ZSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogb2xkVGltZXN0YW1wLFxuICAgICAgICAgICAgbm9uYmxvY2tpbmdBcHByb3ZhbDogZmFsc2UsXG4gICAgICAgICAgICB2ZXJpZmllZDogc3RvcmUuVmVyaWZpZWRTdGF0dXMuREVGQVVMVCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBhd2FpdCBzdG9yZS5oeWRyYXRlQ2FjaGVzKCk7XG5cbiAgICAgICAgICBhd2FpdCBzdG9yZS5zYXZlSWRlbnRpdHkoaWRlbnRpZmllciwgbmV3SWRlbnRpdHkpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3NldHMgdGhlIG5ldyBrZXkgdG8gZGVmYXVsdCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRJZGVudGl0eUtleUJ5SWQoXG4gICAgICAgICAgICB0aGVpclV1aWQudG9TdHJpbmcoKVxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKCFpZGVudGl0eSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGlkZW50aXR5IScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaWRlbnRpdHkudmVyaWZpZWQsIHN0b3JlLlZlcmlmaWVkU3RhdHVzLkRFRkFVTFQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgZGVzY3JpYmUoJ1RoZSBwcmV2aW91cyB2ZXJpZmllZCBzdGF0dXMgd2FzIFZFUklGSUVEJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5jcmVhdGVPclVwZGF0ZUlkZW50aXR5S2V5KHtcbiAgICAgICAgICAgIGlkOiB0aGVpclV1aWQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIHB1YmxpY0tleTogdGVzdEtleS5wdWJLZXksXG4gICAgICAgICAgICBmaXJzdFVzZTogdHJ1ZSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogb2xkVGltZXN0YW1wLFxuICAgICAgICAgICAgbm9uYmxvY2tpbmdBcHByb3ZhbDogZmFsc2UsXG4gICAgICAgICAgICB2ZXJpZmllZDogc3RvcmUuVmVyaWZpZWRTdGF0dXMuVkVSSUZJRUQsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBhd2FpdCBzdG9yZS5oeWRyYXRlQ2FjaGVzKCk7XG4gICAgICAgICAgYXdhaXQgc3RvcmUuc2F2ZUlkZW50aXR5KGlkZW50aWZpZXIsIG5ld0lkZW50aXR5KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzZXRzIHRoZSBuZXcga2V5IHRvIHVudmVyaWZpZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgaWRlbnRpdHkgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0SWRlbnRpdHlLZXlCeUlkKFxuICAgICAgICAgICAgdGhlaXJVdWlkLnRvU3RyaW5nKClcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmICghaWRlbnRpdHkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBpZGVudGl0eSEnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgaWRlbnRpdHkudmVyaWZpZWQsXG4gICAgICAgICAgICBzdG9yZS5WZXJpZmllZFN0YXR1cy5VTlZFUklGSUVEXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGRlc2NyaWJlKCdUaGUgcHJldmlvdXMgdmVyaWZpZWQgc3RhdHVzIHdhcyBVTlZFUklGSUVEJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5jcmVhdGVPclVwZGF0ZUlkZW50aXR5S2V5KHtcbiAgICAgICAgICAgIGlkOiB0aGVpclV1aWQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIHB1YmxpY0tleTogdGVzdEtleS5wdWJLZXksXG4gICAgICAgICAgICBmaXJzdFVzZTogdHJ1ZSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogb2xkVGltZXN0YW1wLFxuICAgICAgICAgICAgbm9uYmxvY2tpbmdBcHByb3ZhbDogZmFsc2UsXG4gICAgICAgICAgICB2ZXJpZmllZDogc3RvcmUuVmVyaWZpZWRTdGF0dXMuVU5WRVJJRklFRCxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGF3YWl0IHN0b3JlLmh5ZHJhdGVDYWNoZXMoKTtcbiAgICAgICAgICBhd2FpdCBzdG9yZS5zYXZlSWRlbnRpdHkoaWRlbnRpZmllciwgbmV3SWRlbnRpdHkpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3NldHMgdGhlIG5ldyBrZXkgdG8gdW52ZXJpZmllZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRJZGVudGl0eUtleUJ5SWQoXG4gICAgICAgICAgICB0aGVpclV1aWQudG9TdHJpbmcoKVxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKCFpZGVudGl0eSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGlkZW50aXR5IScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICBpZGVudGl0eS52ZXJpZmllZCxcbiAgICAgICAgICAgIHN0b3JlLlZlcmlmaWVkU3RhdHVzLlVOVkVSSUZJRURcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdXaGVuIHRoZSBrZXkgaGFzIG5vdCBjaGFuZ2VkJywgKCkgPT4ge1xuICAgICAgY29uc3Qgb2xkVGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5jcmVhdGVPclVwZGF0ZUlkZW50aXR5S2V5KHtcbiAgICAgICAgICBpZDogdGhlaXJVdWlkLnRvU3RyaW5nKCksXG4gICAgICAgICAgcHVibGljS2V5OiB0ZXN0S2V5LnB1YktleSxcbiAgICAgICAgICB0aW1lc3RhbXA6IG9sZFRpbWVzdGFtcCxcbiAgICAgICAgICBub25ibG9ja2luZ0FwcHJvdmFsOiBmYWxzZSxcbiAgICAgICAgICBmaXJzdFVzZTogZmFsc2UsXG4gICAgICAgICAgdmVyaWZpZWQ6IHN0b3JlLlZlcmlmaWVkU3RhdHVzLkRFRkFVTFQsXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCBzdG9yZS5oeWRyYXRlQ2FjaGVzKCk7XG4gICAgICB9KTtcbiAgICAgIGRlc2NyaWJlKCdJZiBpdCBpcyBtYXJrZWQgZmlyc3RVc2UnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgaWRlbnRpdHkgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0SWRlbnRpdHlLZXlCeUlkKFxuICAgICAgICAgICAgdGhlaXJVdWlkLnRvU3RyaW5nKClcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmICghaWRlbnRpdHkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBpZGVudGl0eSEnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWRlbnRpdHkuZmlyc3RVc2UgPSB0cnVlO1xuICAgICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5jcmVhdGVPclVwZGF0ZUlkZW50aXR5S2V5KGlkZW50aXR5KTtcbiAgICAgICAgICBhd2FpdCBzdG9yZS5oeWRyYXRlQ2FjaGVzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnbm90aGluZyBjaGFuZ2VzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IHN0b3JlLnNhdmVJZGVudGl0eShpZGVudGlmaWVyLCB0ZXN0S2V5LnB1YktleSwgdHJ1ZSk7XG5cbiAgICAgICAgICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRJZGVudGl0eUtleUJ5SWQoXG4gICAgICAgICAgICB0aGVpclV1aWQudG9TdHJpbmcoKVxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKCFpZGVudGl0eSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGlkZW50aXR5IScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhc3NlcnQoIWlkZW50aXR5Lm5vbmJsb2NraW5nQXBwcm92YWwpO1xuICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChpZGVudGl0eS50aW1lc3RhbXAsIG9sZFRpbWVzdGFtcCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBkZXNjcmliZSgnSWYgaXQgaXMgbm90IG1hcmtlZCBmaXJzdFVzZScsICgpID0+IHtcbiAgICAgICAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRJZGVudGl0eUtleUJ5SWQoXG4gICAgICAgICAgICB0aGVpclV1aWQudG9TdHJpbmcoKVxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKCFpZGVudGl0eSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGlkZW50aXR5IScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZGVudGl0eS5maXJzdFVzZSA9IGZhbHNlO1xuICAgICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5jcmVhdGVPclVwZGF0ZUlkZW50aXR5S2V5KGlkZW50aXR5KTtcbiAgICAgICAgICBhd2FpdCBzdG9yZS5oeWRyYXRlQ2FjaGVzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZSgnSWYgbm9uYmxvY2tpbmcgYXBwcm92YWwgaXMgcmVxdWlyZWQnLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IG5vdzogbnVtYmVyO1xuICAgICAgICAgIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgY29uc3QgaWRlbnRpdHkgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0SWRlbnRpdHlLZXlCeUlkKFxuICAgICAgICAgICAgICB0aGVpclV1aWQudG9TdHJpbmcoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICghaWRlbnRpdHkpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGlkZW50aXR5IScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWRlbnRpdHkudGltZXN0YW1wID0gbm93O1xuICAgICAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmNyZWF0ZU9yVXBkYXRlSWRlbnRpdHlLZXkoaWRlbnRpdHkpO1xuICAgICAgICAgICAgYXdhaXQgc3RvcmUuaHlkcmF0ZUNhY2hlcygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGl0KCdzZXRzIG5vbi1ibG9ja2luZyBhcHByb3ZhbCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHN0b3JlLnNhdmVJZGVudGl0eShpZGVudGlmaWVyLCB0ZXN0S2V5LnB1YktleSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmdldElkZW50aXR5S2V5QnlJZChcbiAgICAgICAgICAgICAgdGhlaXJVdWlkLnRvU3RyaW5nKClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoIWlkZW50aXR5KSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBpZGVudGl0eSEnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGlkZW50aXR5Lm5vbmJsb2NraW5nQXBwcm92YWwsIHRydWUpO1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGlkZW50aXR5LnRpbWVzdGFtcCwgbm93KTtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChpZGVudGl0eS5maXJzdFVzZSwgZmFsc2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3NhdmVJZGVudGl0eVdpdGhBdHRyaWJ1dGVzJywgKCkgPT4ge1xuICAgIGxldCBub3c6IG51bWJlcjtcbiAgICBsZXQgdmFsaWRBdHRyaWJ1dGVzOiBJZGVudGl0eUtleVR5cGU7XG5cbiAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgIHZhbGlkQXR0cmlidXRlcyA9IHtcbiAgICAgICAgaWQ6IHRoZWlyVXVpZC50b1N0cmluZygpLFxuICAgICAgICBwdWJsaWNLZXk6IHRlc3RLZXkucHViS2V5LFxuICAgICAgICBmaXJzdFVzZTogdHJ1ZSxcbiAgICAgICAgdGltZXN0YW1wOiBub3csXG4gICAgICAgIHZlcmlmaWVkOiBzdG9yZS5WZXJpZmllZFN0YXR1cy5WRVJJRklFRCxcbiAgICAgICAgbm9uYmxvY2tpbmdBcHByb3ZhbDogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgICBhd2FpdCBzdG9yZS5yZW1vdmVJZGVudGl0eUtleSh0aGVpclV1aWQpO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCd3aXRoIHZhbGlkIGF0dHJpYnV0ZXMnLCAoKSA9PiB7XG4gICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBzdG9yZS5zYXZlSWRlbnRpdHlXaXRoQXR0cmlidXRlcyh0aGVpclV1aWQsIHZhbGlkQXR0cmlidXRlcyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3B1YmxpY0tleSBpcyBzYXZlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgaWRlbnRpdHkgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0SWRlbnRpdHlLZXlCeUlkKFxuICAgICAgICAgIHRoZWlyVXVpZC50b1N0cmluZygpXG4gICAgICAgICk7XG4gICAgICAgIGlmICghaWRlbnRpdHkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgaWRlbnRpdHkhJyk7XG4gICAgICAgIH1cbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShjb25zdGFudFRpbWVFcXVhbChpZGVudGl0eS5wdWJsaWNLZXksIHRlc3RLZXkucHViS2V5KSk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdmaXJzdFVzZSBpcyBzYXZlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgaWRlbnRpdHkgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0SWRlbnRpdHlLZXlCeUlkKFxuICAgICAgICAgIHRoZWlyVXVpZC50b1N0cmluZygpXG4gICAgICAgICk7XG4gICAgICAgIGlmICghaWRlbnRpdHkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgaWRlbnRpdHkhJyk7XG4gICAgICAgIH1cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGlkZW50aXR5LmZpcnN0VXNlLCB0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3RpbWVzdGFtcCBpcyBzYXZlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgaWRlbnRpdHkgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0SWRlbnRpdHlLZXlCeUlkKFxuICAgICAgICAgIHRoZWlyVXVpZC50b1N0cmluZygpXG4gICAgICAgICk7XG4gICAgICAgIGlmICghaWRlbnRpdHkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgaWRlbnRpdHkhJyk7XG4gICAgICAgIH1cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGlkZW50aXR5LnRpbWVzdGFtcCwgbm93KTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3ZlcmlmaWVkIGlzIHNhdmVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRJZGVudGl0eUtleUJ5SWQoXG4gICAgICAgICAgdGhlaXJVdWlkLnRvU3RyaW5nKClcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKCFpZGVudGl0eSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBpZGVudGl0eSEnKTtcbiAgICAgICAgfVxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaWRlbnRpdHkudmVyaWZpZWQsIHN0b3JlLlZlcmlmaWVkU3RhdHVzLlZFUklGSUVEKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ25vbmJsb2NraW5nQXBwcm92YWwgaXMgc2F2ZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmdldElkZW50aXR5S2V5QnlJZChcbiAgICAgICAgICB0aGVpclV1aWQudG9TdHJpbmcoKVxuICAgICAgICApO1xuICAgICAgICBpZiAoIWlkZW50aXR5KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGlkZW50aXR5IScpO1xuICAgICAgICB9XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChpZGVudGl0eS5ub25ibG9ja2luZ0FwcHJvdmFsLCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnd2l0aCBpbnZhbGlkIGF0dHJpYnV0ZXMnLCAoKSA9PiB7XG4gICAgICBsZXQgYXR0cmlidXRlczogSWRlbnRpdHlLZXlUeXBlO1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGF0dHJpYnV0ZXMgPSB3aW5kb3cuXy5jbG9uZSh2YWxpZEF0dHJpYnV0ZXMpO1xuICAgICAgfSk7XG5cbiAgICAgIGFzeW5jIGZ1bmN0aW9uIHRlc3RJbnZhbGlkQXR0cmlidXRlcygpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBzdG9yZS5zYXZlSWRlbnRpdHlXaXRoQXR0cmlidXRlcyh0aGVpclV1aWQsIGF0dHJpYnV0ZXMpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc2F2ZUlkZW50aXR5V2l0aEF0dHJpYnV0ZXMgc2hvdWxkIGhhdmUgZmFpbGVkJyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgLy8gZ29vZC4gd2UgZXhwZWN0IHRvIGZhaWwgd2l0aCBpbnZhbGlkIGF0dHJpYnV0ZXMuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaXQoJ3JlamVjdHMgYW4gaW52YWxpZCBwdWJsaWNLZXknLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF0dHJpYnV0ZXMucHVibGljS2V5ID0gJ2Egc3RyaW5nJyBhcyBhbnk7XG4gICAgICAgIGF3YWl0IHRlc3RJbnZhbGlkQXR0cmlidXRlcygpO1xuICAgICAgfSk7XG4gICAgICBpdCgncmVqZWN0cyBpbnZhbGlkIGZpcnN0VXNlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhdHRyaWJ1dGVzLmZpcnN0VXNlID0gMCBhcyBhbnk7XG4gICAgICAgIGF3YWl0IHRlc3RJbnZhbGlkQXR0cmlidXRlcygpO1xuICAgICAgfSk7XG4gICAgICBpdCgncmVqZWN0cyBpbnZhbGlkIHRpbWVzdGFtcCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXR0cmlidXRlcy50aW1lc3RhbXAgPSBOYU4gYXMgYW55O1xuICAgICAgICBhd2FpdCB0ZXN0SW52YWxpZEF0dHJpYnV0ZXMoKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3JlamVjdHMgaW52YWxpZCB2ZXJpZmllZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXR0cmlidXRlcy52ZXJpZmllZCA9IG51bGwgYXMgYW55O1xuICAgICAgICBhd2FpdCB0ZXN0SW52YWxpZEF0dHJpYnV0ZXMoKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3JlamVjdHMgaW52YWxpZCBub25ibG9ja2luZ0FwcHJvdmFsJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhdHRyaWJ1dGVzLm5vbmJsb2NraW5nQXBwcm92YWwgPSAwIGFzIGFueTtcbiAgICAgICAgYXdhaXQgdGVzdEludmFsaWRBdHRyaWJ1dGVzKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdzZXRBcHByb3ZhbCcsICgpID0+IHtcbiAgICBpdCgnc2V0cyBub25ibG9ja2luZ0FwcHJvdmFsJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgc3RvcmUuc2V0QXBwcm92YWwodGhlaXJVdWlkLCB0cnVlKTtcbiAgICAgIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmdldElkZW50aXR5S2V5QnlJZChcbiAgICAgICAgdGhlaXJVdWlkLnRvU3RyaW5nKClcbiAgICAgICk7XG4gICAgICBpZiAoIWlkZW50aXR5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBpZGVudGl0eSEnKTtcbiAgICAgIH1cblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGlkZW50aXR5Lm5vbmJsb2NraW5nQXBwcm92YWwsIHRydWUpO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3NldFZlcmlmaWVkJywgKCkgPT4ge1xuICAgIGFzeW5jIGZ1bmN0aW9uIHNhdmVSZWNvcmREZWZhdWx0KCkge1xuICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmNyZWF0ZU9yVXBkYXRlSWRlbnRpdHlLZXkoe1xuICAgICAgICBpZDogdGhlaXJVdWlkLnRvU3RyaW5nKCksXG4gICAgICAgIHB1YmxpY0tleTogdGVzdEtleS5wdWJLZXksXG4gICAgICAgIGZpcnN0VXNlOiB0cnVlLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgIHZlcmlmaWVkOiBzdG9yZS5WZXJpZmllZFN0YXR1cy5ERUZBVUxULFxuICAgICAgICBub25ibG9ja2luZ0FwcHJvdmFsOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgc3RvcmUuaHlkcmF0ZUNhY2hlcygpO1xuICAgIH1cbiAgICBkZXNjcmliZSgnd2l0aCBubyBwdWJsaWMga2V5IGFyZ3VtZW50JywgKCkgPT4ge1xuICAgICAgYmVmb3JlKHNhdmVSZWNvcmREZWZhdWx0KTtcbiAgICAgIGl0KCd1cGRhdGVzIHRoZSB2ZXJpZmllZCBzdGF0dXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHN0b3JlLnNldFZlcmlmaWVkKHRoZWlyVXVpZCwgc3RvcmUuVmVyaWZpZWRTdGF0dXMuVkVSSUZJRUQpO1xuXG4gICAgICAgIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmdldElkZW50aXR5S2V5QnlJZChcbiAgICAgICAgICB0aGVpclV1aWQudG9TdHJpbmcoKVxuICAgICAgICApO1xuICAgICAgICBpZiAoIWlkZW50aXR5KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGlkZW50aXR5IScpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGlkZW50aXR5LnZlcmlmaWVkLCBzdG9yZS5WZXJpZmllZFN0YXR1cy5WRVJJRklFRCk7XG4gICAgICAgIGFzc2VydC5pc1RydWUoY29uc3RhbnRUaW1lRXF1YWwoaWRlbnRpdHkucHVibGljS2V5LCB0ZXN0S2V5LnB1YktleSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJ3dpdGggdGhlIGN1cnJlbnQgcHVibGljIGtleScsICgpID0+IHtcbiAgICAgIGJlZm9yZShzYXZlUmVjb3JkRGVmYXVsdCk7XG4gICAgICBpdCgndXBkYXRlcyB0aGUgdmVyaWZpZWQgc3RhdHVzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBzdG9yZS5zZXRWZXJpZmllZChcbiAgICAgICAgICB0aGVpclV1aWQsXG4gICAgICAgICAgc3RvcmUuVmVyaWZpZWRTdGF0dXMuVkVSSUZJRUQsXG4gICAgICAgICAgdGVzdEtleS5wdWJLZXlcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRJZGVudGl0eUtleUJ5SWQoXG4gICAgICAgICAgdGhlaXJVdWlkLnRvU3RyaW5nKClcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKCFpZGVudGl0eSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBpZGVudGl0eSEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChpZGVudGl0eS52ZXJpZmllZCwgc3RvcmUuVmVyaWZpZWRTdGF0dXMuVkVSSUZJRUQpO1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGNvbnN0YW50VGltZUVxdWFsKGlkZW50aXR5LnB1YmxpY0tleSwgdGVzdEtleS5wdWJLZXkpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCd3aXRoIGEgbWlzbWF0Y2hpbmcgcHVibGljIGtleScsICgpID0+IHtcbiAgICAgIGNvbnN0IG5ld0lkZW50aXR5ID0gZ2V0UHVibGljS2V5KCk7XG4gICAgICBiZWZvcmUoc2F2ZVJlY29yZERlZmF1bHQpO1xuICAgICAgaXQoJ2RvZXMgbm90IGNoYW5nZSB0aGUgcmVjb3JkLicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgc3RvcmUuc2V0VmVyaWZpZWQoXG4gICAgICAgICAgdGhlaXJVdWlkLFxuICAgICAgICAgIHN0b3JlLlZlcmlmaWVkU3RhdHVzLlZFUklGSUVELFxuICAgICAgICAgIG5ld0lkZW50aXR5XG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgaWRlbnRpdHkgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0SWRlbnRpdHlLZXlCeUlkKFxuICAgICAgICAgIHRoZWlyVXVpZC50b1N0cmluZygpXG4gICAgICAgICk7XG4gICAgICAgIGlmICghaWRlbnRpdHkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgaWRlbnRpdHkhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaWRlbnRpdHkudmVyaWZpZWQsIHN0b3JlLlZlcmlmaWVkU3RhdHVzLkRFRkFVTFQpO1xuICAgICAgICBhc3NlcnQuaXNUcnVlKGNvbnN0YW50VGltZUVxdWFsKGlkZW50aXR5LnB1YmxpY0tleSwgdGVzdEtleS5wdWJLZXkpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3Byb2Nlc3NWZXJpZmllZE1lc3NhZ2UnLCAoKSA9PiB7XG4gICAgY29uc3QgbmV3SWRlbnRpdHkgPSBnZXRQdWJsaWNLZXkoKTtcbiAgICBsZXQga2V5Y2hhbmdlVHJpZ2dlcmVkOiBudW1iZXI7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGtleWNoYW5nZVRyaWdnZXJlZCA9IDA7XG4gICAgICBzdG9yZS5iaW5kKCdrZXljaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIGtleWNoYW5nZVRyaWdnZXJlZCArPSAxO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgIHN0b3JlLnVuYmluZCgna2V5Y2hhbmdlJyk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnd2hlbiB0aGUgbmV3IHZlcmlmaWVkIHN0YXR1cyBpcyBERUZBVUxUJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3doZW4gdGhlcmUgaXMgbm8gZXhpc3RpbmcgcmVjb3JkJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5yZW1vdmVJZGVudGl0eUtleUJ5SWQodGhlaXJVdWlkLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIGF3YWl0IHN0b3JlLmh5ZHJhdGVDYWNoZXMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NldHMgdGhlIGlkZW50aXR5IGtleScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBhd2FpdCBzdG9yZS5wcm9jZXNzVmVyaWZpZWRNZXNzYWdlKFxuICAgICAgICAgICAgdGhlaXJVdWlkLFxuICAgICAgICAgICAgc3RvcmUuVmVyaWZpZWRTdGF0dXMuREVGQVVMVCxcbiAgICAgICAgICAgIG5ld0lkZW50aXR5XG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmdldElkZW50aXR5S2V5QnlJZChcbiAgICAgICAgICAgIHRoZWlyVXVpZC50b1N0cmluZygpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICAgICAgaWRlbnRpdHk/LnB1YmxpY0tleSAmJlxuICAgICAgICAgICAgICBjb25zdGFudFRpbWVFcXVhbChpZGVudGl0eS5wdWJsaWNLZXksIG5ld0lkZW50aXR5KVxuICAgICAgICAgICk7XG4gICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGtleWNoYW5nZVRyaWdnZXJlZCwgMCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBkZXNjcmliZSgnd2hlbiB0aGUgcmVjb3JkIGV4aXN0cycsICgpID0+IHtcbiAgICAgICAgZGVzY3JpYmUoJ3doZW4gdGhlIGV4aXN0aW5nIGtleSBpcyBkaWZmZXJlbnQnLCAoKSA9PiB7XG4gICAgICAgICAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5jcmVhdGVPclVwZGF0ZUlkZW50aXR5S2V5KHtcbiAgICAgICAgICAgICAgaWQ6IHRoZWlyVXVpZC50b1N0cmluZygpLFxuICAgICAgICAgICAgICBwdWJsaWNLZXk6IHRlc3RLZXkucHViS2V5LFxuICAgICAgICAgICAgICBmaXJzdFVzZTogdHJ1ZSxcbiAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICB2ZXJpZmllZDogc3RvcmUuVmVyaWZpZWRTdGF0dXMuVkVSSUZJRUQsXG4gICAgICAgICAgICAgIG5vbmJsb2NraW5nQXBwcm92YWw6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhd2FpdCBzdG9yZS5oeWRyYXRlQ2FjaGVzKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgndXBkYXRlcyB0aGUgaWRlbnRpdHknLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCBzdG9yZS5wcm9jZXNzVmVyaWZpZWRNZXNzYWdlKFxuICAgICAgICAgICAgICB0aGVpclV1aWQsXG4gICAgICAgICAgICAgIHN0b3JlLlZlcmlmaWVkU3RhdHVzLkRFRkFVTFQsXG4gICAgICAgICAgICAgIG5ld0lkZW50aXR5XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRJZGVudGl0eUtleUJ5SWQoXG4gICAgICAgICAgICAgIHRoZWlyVXVpZC50b1N0cmluZygpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKCFpZGVudGl0eSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgaWRlbnRpdHkhJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChpZGVudGl0eS52ZXJpZmllZCwgc3RvcmUuVmVyaWZpZWRTdGF0dXMuREVGQVVMVCk7XG4gICAgICAgICAgICBhc3NlcnQuaXNUcnVlKGNvbnN0YW50VGltZUVxdWFsKGlkZW50aXR5LnB1YmxpY0tleSwgbmV3SWRlbnRpdHkpKTtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChrZXljaGFuZ2VUcmlnZ2VyZWQsIDEpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoJ3doZW4gdGhlIGV4aXN0aW5nIGtleSBpcyB0aGUgc2FtZSBidXQgVkVSSUZJRUQnLCAoKSA9PiB7XG4gICAgICAgICAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5jcmVhdGVPclVwZGF0ZUlkZW50aXR5S2V5KHtcbiAgICAgICAgICAgICAgaWQ6IHRoZWlyVXVpZC50b1N0cmluZygpLFxuICAgICAgICAgICAgICBwdWJsaWNLZXk6IHRlc3RLZXkucHViS2V5LFxuICAgICAgICAgICAgICBmaXJzdFVzZTogdHJ1ZSxcbiAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICB2ZXJpZmllZDogc3RvcmUuVmVyaWZpZWRTdGF0dXMuVkVSSUZJRUQsXG4gICAgICAgICAgICAgIG5vbmJsb2NraW5nQXBwcm92YWw6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhd2FpdCBzdG9yZS5oeWRyYXRlQ2FjaGVzKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgndXBkYXRlcyB0aGUgdmVyaWZpZWQgc3RhdHVzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgc3RvcmUucHJvY2Vzc1ZlcmlmaWVkTWVzc2FnZShcbiAgICAgICAgICAgICAgdGhlaXJVdWlkLFxuICAgICAgICAgICAgICBzdG9yZS5WZXJpZmllZFN0YXR1cy5ERUZBVUxULFxuICAgICAgICAgICAgICB0ZXN0S2V5LnB1YktleVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgaWRlbnRpdHkgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0SWRlbnRpdHlLZXlCeUlkKFxuICAgICAgICAgICAgICB0aGVpclV1aWQudG9TdHJpbmcoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICghaWRlbnRpdHkpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGlkZW50aXR5IScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaWRlbnRpdHkudmVyaWZpZWQsIHN0b3JlLlZlcmlmaWVkU3RhdHVzLkRFRkFVTFQpO1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgICAgICAgY29uc3RhbnRUaW1lRXF1YWwoaWRlbnRpdHkucHVibGljS2V5LCB0ZXN0S2V5LnB1YktleSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoa2V5Y2hhbmdlVHJpZ2dlcmVkLCAwKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKCd3aGVuIHRoZSBleGlzdGluZyBrZXkgaXMgdGhlIHNhbWUgYW5kIGFscmVhZHkgREVGQVVMVCcsICgpID0+IHtcbiAgICAgICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmNyZWF0ZU9yVXBkYXRlSWRlbnRpdHlLZXkoe1xuICAgICAgICAgICAgICBpZDogdGhlaXJVdWlkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgIHB1YmxpY0tleTogdGVzdEtleS5wdWJLZXksXG4gICAgICAgICAgICAgIGZpcnN0VXNlOiB0cnVlLFxuICAgICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgICAgIHZlcmlmaWVkOiBzdG9yZS5WZXJpZmllZFN0YXR1cy5ERUZBVUxULFxuICAgICAgICAgICAgICBub25ibG9ja2luZ0FwcHJvdmFsOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgc3RvcmUuaHlkcmF0ZUNhY2hlcygpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ2RvZXMgbm90IGhhbmcnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCBzdG9yZS5wcm9jZXNzVmVyaWZpZWRNZXNzYWdlKFxuICAgICAgICAgICAgICB0aGVpclV1aWQsXG4gICAgICAgICAgICAgIHN0b3JlLlZlcmlmaWVkU3RhdHVzLkRFRkFVTFQsXG4gICAgICAgICAgICAgIHRlc3RLZXkucHViS2V5XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoa2V5Y2hhbmdlVHJpZ2dlcmVkLCAwKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnd2hlbiB0aGUgbmV3IHZlcmlmaWVkIHN0YXR1cyBpcyBVTlZFUklGSUVEJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ3doZW4gdGhlcmUgaXMgbm8gZXhpc3RpbmcgcmVjb3JkJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5yZW1vdmVJZGVudGl0eUtleUJ5SWQodGhlaXJVdWlkLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIGF3YWl0IHN0b3JlLmh5ZHJhdGVDYWNoZXMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NhdmVzIHRoZSBuZXcgaWRlbnRpdHkgYW5kIG1hcmtzIGl0IFVOVkVSSUZJRUQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgYXdhaXQgc3RvcmUucHJvY2Vzc1ZlcmlmaWVkTWVzc2FnZShcbiAgICAgICAgICAgIHRoZWlyVXVpZCxcbiAgICAgICAgICAgIHN0b3JlLlZlcmlmaWVkU3RhdHVzLlVOVkVSSUZJRUQsXG4gICAgICAgICAgICBuZXdJZGVudGl0eVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRJZGVudGl0eUtleUJ5SWQoXG4gICAgICAgICAgICB0aGVpclV1aWQudG9TdHJpbmcoKVxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKCFpZGVudGl0eSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGlkZW50aXR5IScpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgIGlkZW50aXR5LnZlcmlmaWVkLFxuICAgICAgICAgICAgc3RvcmUuVmVyaWZpZWRTdGF0dXMuVU5WRVJJRklFRFxuICAgICAgICAgICk7XG4gICAgICAgICAgYXNzZXJ0LmlzVHJ1ZShjb25zdGFudFRpbWVFcXVhbChpZGVudGl0eS5wdWJsaWNLZXksIG5ld0lkZW50aXR5KSk7XG4gICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGtleWNoYW5nZVRyaWdnZXJlZCwgMCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBkZXNjcmliZSgnd2hlbiB0aGUgcmVjb3JkIGV4aXN0cycsICgpID0+IHtcbiAgICAgICAgZGVzY3JpYmUoJ3doZW4gdGhlIGV4aXN0aW5nIGtleSBpcyBkaWZmZXJlbnQnLCAoKSA9PiB7XG4gICAgICAgICAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5jcmVhdGVPclVwZGF0ZUlkZW50aXR5S2V5KHtcbiAgICAgICAgICAgICAgaWQ6IHRoZWlyVXVpZC50b1N0cmluZygpLFxuICAgICAgICAgICAgICBwdWJsaWNLZXk6IHRlc3RLZXkucHViS2V5LFxuICAgICAgICAgICAgICBmaXJzdFVzZTogdHJ1ZSxcbiAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICB2ZXJpZmllZDogc3RvcmUuVmVyaWZpZWRTdGF0dXMuVkVSSUZJRUQsXG4gICAgICAgICAgICAgIG5vbmJsb2NraW5nQXBwcm92YWw6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhd2FpdCBzdG9yZS5oeWRyYXRlQ2FjaGVzKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgnc2F2ZXMgdGhlIG5ldyBpZGVudGl0eSBhbmQgbWFya3MgaXQgVU5WRVJJRklFRCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHN0b3JlLnByb2Nlc3NWZXJpZmllZE1lc3NhZ2UoXG4gICAgICAgICAgICAgIHRoZWlyVXVpZCxcbiAgICAgICAgICAgICAgc3RvcmUuVmVyaWZpZWRTdGF0dXMuVU5WRVJJRklFRCxcbiAgICAgICAgICAgICAgbmV3SWRlbnRpdHlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmdldElkZW50aXR5S2V5QnlJZChcbiAgICAgICAgICAgICAgdGhlaXJVdWlkLnRvU3RyaW5nKClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoIWlkZW50aXR5KSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBpZGVudGl0eSEnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgICBpZGVudGl0eS52ZXJpZmllZCxcbiAgICAgICAgICAgICAgc3RvcmUuVmVyaWZpZWRTdGF0dXMuVU5WRVJJRklFRFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGFzc2VydC5pc1RydWUoY29uc3RhbnRUaW1lRXF1YWwoaWRlbnRpdHkucHVibGljS2V5LCBuZXdJZGVudGl0eSkpO1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGtleWNoYW5nZVRyaWdnZXJlZCwgMSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZSgnd2hlbiB0aGUga2V5IGV4aXN0cyBhbmQgaXMgREVGQVVMVCcsICgpID0+IHtcbiAgICAgICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmNyZWF0ZU9yVXBkYXRlSWRlbnRpdHlLZXkoe1xuICAgICAgICAgICAgICBpZDogdGhlaXJVdWlkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgIHB1YmxpY0tleTogdGVzdEtleS5wdWJLZXksXG4gICAgICAgICAgICAgIGZpcnN0VXNlOiB0cnVlLFxuICAgICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgICAgIHZlcmlmaWVkOiBzdG9yZS5WZXJpZmllZFN0YXR1cy5ERUZBVUxULFxuICAgICAgICAgICAgICBub25ibG9ja2luZ0FwcHJvdmFsOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgc3RvcmUuaHlkcmF0ZUNhY2hlcygpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ3VwZGF0ZXMgdGhlIHZlcmlmaWVkIHN0YXR1cycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHN0b3JlLnByb2Nlc3NWZXJpZmllZE1lc3NhZ2UoXG4gICAgICAgICAgICAgIHRoZWlyVXVpZCxcbiAgICAgICAgICAgICAgc3RvcmUuVmVyaWZpZWRTdGF0dXMuVU5WRVJJRklFRCxcbiAgICAgICAgICAgICAgdGVzdEtleS5wdWJLZXlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRJZGVudGl0eUtleUJ5SWQoXG4gICAgICAgICAgICAgIHRoZWlyVXVpZC50b1N0cmluZygpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKCFpZGVudGl0eSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgaWRlbnRpdHkhJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgaWRlbnRpdHkudmVyaWZpZWQsXG4gICAgICAgICAgICAgIHN0b3JlLlZlcmlmaWVkU3RhdHVzLlVOVkVSSUZJRURcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICAgICAgICBjb25zdGFudFRpbWVFcXVhbChpZGVudGl0eS5wdWJsaWNLZXksIHRlc3RLZXkucHViS2V5KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChrZXljaGFuZ2VUcmlnZ2VyZWQsIDApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoJ3doZW4gdGhlIGtleSBleGlzdHMgYW5kIGlzIGFscmVhZHkgVU5WRVJJRklFRCcsICgpID0+IHtcbiAgICAgICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmNyZWF0ZU9yVXBkYXRlSWRlbnRpdHlLZXkoe1xuICAgICAgICAgICAgICBpZDogdGhlaXJVdWlkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgIHB1YmxpY0tleTogdGVzdEtleS5wdWJLZXksXG4gICAgICAgICAgICAgIGZpcnN0VXNlOiB0cnVlLFxuICAgICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgICAgIHZlcmlmaWVkOiBzdG9yZS5WZXJpZmllZFN0YXR1cy5VTlZFUklGSUVELFxuICAgICAgICAgICAgICBub25ibG9ja2luZ0FwcHJvdmFsOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgc3RvcmUuaHlkcmF0ZUNhY2hlcygpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaXQoJ2RvZXMgbm90IGhhbmcnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCBzdG9yZS5wcm9jZXNzVmVyaWZpZWRNZXNzYWdlKFxuICAgICAgICAgICAgICB0aGVpclV1aWQsXG4gICAgICAgICAgICAgIHN0b3JlLlZlcmlmaWVkU3RhdHVzLlVOVkVSSUZJRUQsXG4gICAgICAgICAgICAgIHRlc3RLZXkucHViS2V5XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoa2V5Y2hhbmdlVHJpZ2dlcmVkLCAwKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnd2hlbiB0aGUgbmV3IHZlcmlmaWVkIHN0YXR1cyBpcyBWRVJJRklFRCcsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCd3aGVuIHRoZXJlIGlzIG5vIGV4aXN0aW5nIHJlY29yZCcsICgpID0+IHtcbiAgICAgICAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEucmVtb3ZlSWRlbnRpdHlLZXlCeUlkKHRoZWlyVXVpZC50b1N0cmluZygpKTtcbiAgICAgICAgICBhd2FpdCBzdG9yZS5oeWRyYXRlQ2FjaGVzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzYXZlcyB0aGUgbmV3IGlkZW50aXR5IGFuZCBtYXJrcyBpdCB2ZXJpZmllZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBhd2FpdCBzdG9yZS5wcm9jZXNzVmVyaWZpZWRNZXNzYWdlKFxuICAgICAgICAgICAgdGhlaXJVdWlkLFxuICAgICAgICAgICAgc3RvcmUuVmVyaWZpZWRTdGF0dXMuVkVSSUZJRUQsXG4gICAgICAgICAgICBuZXdJZGVudGl0eVxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgaWRlbnRpdHkgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0SWRlbnRpdHlLZXlCeUlkKFxuICAgICAgICAgICAgdGhlaXJVdWlkLnRvU3RyaW5nKClcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmICghaWRlbnRpdHkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBpZGVudGl0eSEnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaWRlbnRpdHkudmVyaWZpZWQsIHN0b3JlLlZlcmlmaWVkU3RhdHVzLlZFUklGSUVEKTtcbiAgICAgICAgICBhc3NlcnQuaXNUcnVlKGNvbnN0YW50VGltZUVxdWFsKGlkZW50aXR5LnB1YmxpY0tleSwgbmV3SWRlbnRpdHkpKTtcbiAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoa2V5Y2hhbmdlVHJpZ2dlcmVkLCAwKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGRlc2NyaWJlKCd3aGVuIHRoZSByZWNvcmQgZXhpc3RzJywgKCkgPT4ge1xuICAgICAgICBkZXNjcmliZSgnd2hlbiB0aGUgZXhpc3Rpbmcga2V5IGlzIGRpZmZlcmVudCcsICgpID0+IHtcbiAgICAgICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmNyZWF0ZU9yVXBkYXRlSWRlbnRpdHlLZXkoe1xuICAgICAgICAgICAgICBpZDogdGhlaXJVdWlkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgIHB1YmxpY0tleTogdGVzdEtleS5wdWJLZXksXG4gICAgICAgICAgICAgIGZpcnN0VXNlOiB0cnVlLFxuICAgICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgICAgIHZlcmlmaWVkOiBzdG9yZS5WZXJpZmllZFN0YXR1cy5WRVJJRklFRCxcbiAgICAgICAgICAgICAgbm9uYmxvY2tpbmdBcHByb3ZhbDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGF3YWl0IHN0b3JlLmh5ZHJhdGVDYWNoZXMoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCdzYXZlcyB0aGUgbmV3IGlkZW50aXR5IGFuZCBtYXJrcyBpdCBWRVJJRklFRCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHN0b3JlLnByb2Nlc3NWZXJpZmllZE1lc3NhZ2UoXG4gICAgICAgICAgICAgIHRoZWlyVXVpZCxcbiAgICAgICAgICAgICAgc3RvcmUuVmVyaWZpZWRTdGF0dXMuVkVSSUZJRUQsXG4gICAgICAgICAgICAgIG5ld0lkZW50aXR5XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRJZGVudGl0eUtleUJ5SWQoXG4gICAgICAgICAgICAgIHRoZWlyVXVpZC50b1N0cmluZygpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKCFpZGVudGl0eSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgaWRlbnRpdHkhJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgaWRlbnRpdHkudmVyaWZpZWQsXG4gICAgICAgICAgICAgIHN0b3JlLlZlcmlmaWVkU3RhdHVzLlZFUklGSUVEXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHJ1ZShjb25zdGFudFRpbWVFcXVhbChpZGVudGl0eS5wdWJsaWNLZXksIG5ld0lkZW50aXR5KSk7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoa2V5Y2hhbmdlVHJpZ2dlcmVkLCAxKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKCd3aGVuIHRoZSBleGlzdGluZyBrZXkgaXMgdGhlIHNhbWUgYnV0IFVOVkVSSUZJRUQnLCAoKSA9PiB7XG4gICAgICAgICAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5jcmVhdGVPclVwZGF0ZUlkZW50aXR5S2V5KHtcbiAgICAgICAgICAgICAgaWQ6IHRoZWlyVXVpZC50b1N0cmluZygpLFxuICAgICAgICAgICAgICBwdWJsaWNLZXk6IHRlc3RLZXkucHViS2V5LFxuICAgICAgICAgICAgICBmaXJzdFVzZTogdHJ1ZSxcbiAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICB2ZXJpZmllZDogc3RvcmUuVmVyaWZpZWRTdGF0dXMuVU5WRVJJRklFRCxcbiAgICAgICAgICAgICAgbm9uYmxvY2tpbmdBcHByb3ZhbDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGF3YWl0IHN0b3JlLmh5ZHJhdGVDYWNoZXMoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCdzYXZlcyB0aGUgaWRlbnRpdHkgYW5kIG1hcmtzIGl0IHZlcmlmaWVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgc3RvcmUucHJvY2Vzc1ZlcmlmaWVkTWVzc2FnZShcbiAgICAgICAgICAgICAgdGhlaXJVdWlkLFxuICAgICAgICAgICAgICBzdG9yZS5WZXJpZmllZFN0YXR1cy5WRVJJRklFRCxcbiAgICAgICAgICAgICAgdGVzdEtleS5wdWJLZXlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRJZGVudGl0eUtleUJ5SWQoXG4gICAgICAgICAgICAgIHRoZWlyVXVpZC50b1N0cmluZygpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKCFpZGVudGl0eSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgaWRlbnRpdHkhJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgICAgaWRlbnRpdHkudmVyaWZpZWQsXG4gICAgICAgICAgICAgIHN0b3JlLlZlcmlmaWVkU3RhdHVzLlZFUklGSUVEXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgICAgICAgY29uc3RhbnRUaW1lRXF1YWwoaWRlbnRpdHkucHVibGljS2V5LCB0ZXN0S2V5LnB1YktleSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoa2V5Y2hhbmdlVHJpZ2dlcmVkLCAwKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlc2NyaWJlKCd3aGVuIHRoZSBleGlzdGluZyBrZXkgaXMgdGhlIHNhbWUgYW5kIGFscmVhZHkgVkVSSUZJRUQnLCAoKSA9PiB7XG4gICAgICAgICAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5jcmVhdGVPclVwZGF0ZUlkZW50aXR5S2V5KHtcbiAgICAgICAgICAgICAgaWQ6IHRoZWlyVXVpZC50b1N0cmluZygpLFxuICAgICAgICAgICAgICBwdWJsaWNLZXk6IHRlc3RLZXkucHViS2V5LFxuICAgICAgICAgICAgICBmaXJzdFVzZTogdHJ1ZSxcbiAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICB2ZXJpZmllZDogc3RvcmUuVmVyaWZpZWRTdGF0dXMuVkVSSUZJRUQsXG4gICAgICAgICAgICAgIG5vbmJsb2NraW5nQXBwcm92YWw6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhd2FpdCBzdG9yZS5oeWRyYXRlQ2FjaGVzKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgnZG9lcyBub3QgaGFuZycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHN0b3JlLnByb2Nlc3NWZXJpZmllZE1lc3NhZ2UoXG4gICAgICAgICAgICAgIHRoZWlyVXVpZCxcbiAgICAgICAgICAgICAgc3RvcmUuVmVyaWZpZWRTdGF0dXMuVkVSSUZJRUQsXG4gICAgICAgICAgICAgIHRlc3RLZXkucHViS2V5XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoa2V5Y2hhbmdlVHJpZ2dlcmVkLCAwKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2lzVW50cnVzdGVkJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIGlkZW50aXR5IGtleSBvbGQgZW5vdWdoJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmNyZWF0ZU9yVXBkYXRlSWRlbnRpdHlLZXkoe1xuICAgICAgICBpZDogdGhlaXJVdWlkLnRvU3RyaW5nKCksXG4gICAgICAgIHB1YmxpY0tleTogdGVzdEtleS5wdWJLZXksXG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSAtIDEwICogMTAwMCAqIDYwLFxuICAgICAgICB2ZXJpZmllZDogc3RvcmUuVmVyaWZpZWRTdGF0dXMuREVGQVVMVCxcbiAgICAgICAgZmlyc3RVc2U6IGZhbHNlLFxuICAgICAgICBub25ibG9ja2luZ0FwcHJvdmFsOiBmYWxzZSxcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCBzdG9yZS5oeWRyYXRlQ2FjaGVzKCk7XG4gICAgICBjb25zdCB1bnRydXN0ZWQgPSBhd2FpdCBzdG9yZS5pc1VudHJ1c3RlZCh0aGVpclV1aWQpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHVudHJ1c3RlZCwgZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgbmV3IGJ1dCBub25ibG9ja2luZ0FwcHJvdmFsIGlzIHRydWUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuY3JlYXRlT3JVcGRhdGVJZGVudGl0eUtleSh7XG4gICAgICAgIGlkOiB0aGVpclV1aWQudG9TdHJpbmcoKSxcbiAgICAgICAgcHVibGljS2V5OiB0ZXN0S2V5LnB1YktleSxcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICB2ZXJpZmllZDogc3RvcmUuVmVyaWZpZWRTdGF0dXMuREVGQVVMVCxcbiAgICAgICAgZmlyc3RVc2U6IGZhbHNlLFxuICAgICAgICBub25ibG9ja2luZ0FwcHJvdmFsOiB0cnVlLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBzdG9yZS5oeWRyYXRlQ2FjaGVzKCk7XG5cbiAgICAgIGNvbnN0IHVudHJ1c3RlZCA9IGF3YWl0IHN0b3JlLmlzVW50cnVzdGVkKHRoZWlyVXVpZCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwodW50cnVzdGVkLCBmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBuZXcgYnV0IGZpcnN0VXNlIGlzIHRydWUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuY3JlYXRlT3JVcGRhdGVJZGVudGl0eUtleSh7XG4gICAgICAgIGlkOiB0aGVpclV1aWQudG9TdHJpbmcoKSxcbiAgICAgICAgcHVibGljS2V5OiB0ZXN0S2V5LnB1YktleSxcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICB2ZXJpZmllZDogc3RvcmUuVmVyaWZpZWRTdGF0dXMuREVGQVVMVCxcbiAgICAgICAgZmlyc3RVc2U6IHRydWUsXG4gICAgICAgIG5vbmJsb2NraW5nQXBwcm92YWw6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBzdG9yZS5oeWRyYXRlQ2FjaGVzKCk7XG5cbiAgICAgIGNvbnN0IHVudHJ1c3RlZCA9IGF3YWl0IHN0b3JlLmlzVW50cnVzdGVkKHRoZWlyVXVpZCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwodW50cnVzdGVkLCBmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGlmIG5ldywgYW5kIG5vIGZsYWdzIGFyZSBzZXQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuY3JlYXRlT3JVcGRhdGVJZGVudGl0eUtleSh7XG4gICAgICAgIGlkOiB0aGVpclV1aWQudG9TdHJpbmcoKSxcbiAgICAgICAgcHVibGljS2V5OiB0ZXN0S2V5LnB1YktleSxcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICB2ZXJpZmllZDogc3RvcmUuVmVyaWZpZWRTdGF0dXMuREVGQVVMVCxcbiAgICAgICAgZmlyc3RVc2U6IGZhbHNlLFxuICAgICAgICBub25ibG9ja2luZ0FwcHJvdmFsOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgc3RvcmUuaHlkcmF0ZUNhY2hlcygpO1xuXG4gICAgICBjb25zdCB1bnRydXN0ZWQgPSBhd2FpdCBzdG9yZS5pc1VudHJ1c3RlZCh0aGVpclV1aWQpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHVudHJ1c3RlZCwgdHJ1ZSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRWZXJpZmllZCcsICgpID0+IHtcbiAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgc3RvcmUuc2V0VmVyaWZpZWQodGhlaXJVdWlkLCBzdG9yZS5WZXJpZmllZFN0YXR1cy5WRVJJRklFRCk7XG4gICAgfSk7XG4gICAgaXQoJ3Jlc29sdmVzIHRvIHRoZSB2ZXJpZmllZCBzdGF0dXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzdG9yZS5nZXRWZXJpZmllZCh0aGVpclV1aWQpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdCwgc3RvcmUuVmVyaWZpZWRTdGF0dXMuVkVSSUZJRUQpO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ2lzVHJ1c3RlZElkZW50aXR5JywgKCkgPT4ge1xuICAgIGNvbnN0IGlkZW50aWZpZXIgPSBuZXcgQWRkcmVzcyh0aGVpclV1aWQsIDEpO1xuXG4gICAgZGVzY3JpYmUoJ1doZW4gaW52YWxpZCBkaXJlY3Rpb24gaXMgZ2l2ZW4nLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGZhaWwnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IGFzc2VydC5pc1JlamVjdGVkKFxuICAgICAgICAgIHN0b3JlLmlzVHJ1c3RlZElkZW50aXR5KGlkZW50aWZpZXIsIHRlc3RLZXkucHViS2V5LCAnZGlyJyBhcyBhbnkpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnV2hlbiBkaXJlY3Rpb24gaXMgUkVDRUlWSU5HJywgKCkgPT4ge1xuICAgICAgaXQoJ2Fsd2F5cyByZXR1cm5zIHRydWUnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0lkZW50aXR5ID0gZ2V0UHVibGljS2V5KCk7XG4gICAgICAgIGF3YWl0IHN0b3JlLnNhdmVJZGVudGl0eShpZGVudGlmaWVyLCB0ZXN0S2V5LnB1YktleSk7XG5cbiAgICAgICAgY29uc3QgdHJ1c3RlZCA9IGF3YWl0IHN0b3JlLmlzVHJ1c3RlZElkZW50aXR5KFxuICAgICAgICAgIGlkZW50aWZpZXIsXG4gICAgICAgICAgbmV3SWRlbnRpdHksXG4gICAgICAgICAgRGlyZWN0aW9uLlJlY2VpdmluZ1xuICAgICAgICApO1xuXG4gICAgICAgIGlmICghdHJ1c3RlZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaXNUcnVzdGVkIHJldHVybmVkIGZhbHNlIHdoZW4gcmVjZWl2aW5nJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGRlc2NyaWJlKCdXaGVuIGRpcmVjdGlvbiBpcyBTRU5ESU5HJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ1doZW4gdGhlcmUgaXMgbm8gZXhpc3Rpbmcga2V5IChmaXJzdCB1c2UpJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IHN0b3JlLnJlbW92ZUlkZW50aXR5S2V5KHRoZWlyVXVpZCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgncmV0dXJucyB0cnVlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld0lkZW50aXR5ID0gZ2V0UHVibGljS2V5KCk7XG4gICAgICAgICAgY29uc3QgdHJ1c3RlZCA9IGF3YWl0IHN0b3JlLmlzVHJ1c3RlZElkZW50aXR5KFxuICAgICAgICAgICAgaWRlbnRpZmllcixcbiAgICAgICAgICAgIG5ld0lkZW50aXR5LFxuICAgICAgICAgICAgRGlyZWN0aW9uLlNlbmRpbmdcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmICghdHJ1c3RlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpc1RydXN0ZWQgcmV0dXJuZWQgZmFsc2Ugb24gZmlyc3QgdXNlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgZGVzY3JpYmUoJ1doZW4gdGhlcmUgaXMgYW4gZXhpc3Rpbmcga2V5JywgKCkgPT4ge1xuICAgICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IHN0b3JlLnNhdmVJZGVudGl0eShpZGVudGlmaWVyLCB0ZXN0S2V5LnB1YktleSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZXNjcmliZSgnV2hlbiB0aGUgZXhpc3Rpbmcga2V5IGlzIGRpZmZlcmVudCcsICgpID0+IHtcbiAgICAgICAgICBpdCgncmV0dXJucyBmYWxzZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0lkZW50aXR5ID0gZ2V0UHVibGljS2V5KCk7XG4gICAgICAgICAgICBjb25zdCB0cnVzdGVkID0gYXdhaXQgc3RvcmUuaXNUcnVzdGVkSWRlbnRpdHkoXG4gICAgICAgICAgICAgIGlkZW50aWZpZXIsXG4gICAgICAgICAgICAgIG5ld0lkZW50aXR5LFxuICAgICAgICAgICAgICBEaXJlY3Rpb24uU2VuZGluZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICh0cnVzdGVkKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaXNUcnVzdGVkIHJldHVybmVkIHRydWUgb24gdW50cnVzdGVkIGtleScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVzY3JpYmUoJ1doZW4gdGhlIGV4aXN0aW5nIGtleSBtYXRjaGVzIHRoZSBuZXcga2V5JywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld0lkZW50aXR5ID0gZ2V0UHVibGljS2V5KCk7XG4gICAgICAgICAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHN0b3JlLnNhdmVJZGVudGl0eShpZGVudGlmaWVyLCBuZXdJZGVudGl0eSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYga2V5cyBtYXRjaCBidXQgd2UganVzdCByZWNlaXZlZCB0aGlzIG5ldyBpZGVudGl5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJ1c3RlZCA9IGF3YWl0IHN0b3JlLmlzVHJ1c3RlZElkZW50aXR5KFxuICAgICAgICAgICAgICBpZGVudGlmaWVyLFxuICAgICAgICAgICAgICBuZXdJZGVudGl0eSxcbiAgICAgICAgICAgICAgRGlyZWN0aW9uLlNlbmRpbmdcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmICh0cnVzdGVkKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaXNUcnVzdGVkIHJldHVybmVkIHRydWUgb24gdW50cnVzdGVkIGtleScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgd2UgaGF2ZSBhbHJlYWR5IGFwcHJvdmVkIGlkZW50aXR5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgc3RvcmUuc2F2ZUlkZW50aXR5KGlkZW50aWZpZXIsIG5ld0lkZW50aXR5LCB0cnVlKTtcblxuICAgICAgICAgICAgY29uc3QgdHJ1c3RlZCA9IGF3YWl0IHN0b3JlLmlzVHJ1c3RlZElkZW50aXR5KFxuICAgICAgICAgICAgICBpZGVudGlmaWVyLFxuICAgICAgICAgICAgICBuZXdJZGVudGl0eSxcbiAgICAgICAgICAgICAgRGlyZWN0aW9uLlNlbmRpbmdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoIXRydXN0ZWQpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpc1RydXN0ZWQgcmV0dXJuZWQgZmFsc2Ugb24gYW4gYXBwcm92ZWQga2V5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnc3RvcmVQcmVLZXknLCAoKSA9PiB7XG4gICAgaXQoJ3N0b3JlcyBwcmVrZXlzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgc3RvcmUuc3RvcmVQcmVLZXkob3VyVXVpZCwgMSwgdGVzdEtleSk7XG4gICAgICBjb25zdCBrZXkgPSBhd2FpdCBzdG9yZS5sb2FkUHJlS2V5KG91clV1aWQsIDEpO1xuICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGtleSEnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qga2V5UGFpciA9IHtcbiAgICAgICAgcHViS2V5OiBrZXkucHVibGljS2V5KCkuc2VyaWFsaXplKCksXG4gICAgICAgIHByaXZLZXk6IGtleS5wcml2YXRlS2V5KCkuc2VyaWFsaXplKCksXG4gICAgICB9O1xuXG4gICAgICBhc3NlcnQuaXNUcnVlKGNvbnN0YW50VGltZUVxdWFsKGtleVBhaXIucHViS2V5LCB0ZXN0S2V5LnB1YktleSkpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShjb25zdGFudFRpbWVFcXVhbChrZXlQYWlyLnByaXZLZXksIHRlc3RLZXkucHJpdktleSkpO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3JlbW92ZVByZUtleScsICgpID0+IHtcbiAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgc3RvcmUuc3RvcmVQcmVLZXkob3VyVXVpZCwgMiwgdGVzdEtleSk7XG4gICAgfSk7XG4gICAgaXQoJ2RlbGV0ZXMgcHJla2V5cycsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHN0b3JlLnJlbW92ZVByZUtleShvdXJVdWlkLCAyKTtcblxuICAgICAgY29uc3Qga2V5ID0gYXdhaXQgc3RvcmUubG9hZFByZUtleShvdXJVdWlkLCAyKTtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChrZXkpO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3N0b3JlU2lnbmVkUHJlS2V5JywgKCkgPT4ge1xuICAgIGl0KCdzdG9yZXMgc2lnbmVkIHByZWtleXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBzdG9yZS5zdG9yZVNpZ25lZFByZUtleShvdXJVdWlkLCAzLCB0ZXN0S2V5KTtcbiAgICAgIGNvbnN0IGtleSA9IGF3YWl0IHN0b3JlLmxvYWRTaWduZWRQcmVLZXkob3VyVXVpZCwgMyk7XG4gICAgICBpZiAoIWtleSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcga2V5IScpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXlQYWlyID0ge1xuICAgICAgICBwdWJLZXk6IGtleS5wdWJsaWNLZXkoKS5zZXJpYWxpemUoKSxcbiAgICAgICAgcHJpdktleToga2V5LnByaXZhdGVLZXkoKS5zZXJpYWxpemUoKSxcbiAgICAgIH07XG5cbiAgICAgIGFzc2VydC5pc1RydWUoY29uc3RhbnRUaW1lRXF1YWwoa2V5UGFpci5wdWJLZXksIHRlc3RLZXkucHViS2V5KSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKGNvbnN0YW50VGltZUVxdWFsKGtleVBhaXIucHJpdktleSwgdGVzdEtleS5wcml2S2V5KSk7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgncmVtb3ZlU2lnbmVkUHJlS2V5JywgKCkgPT4ge1xuICAgIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBzdG9yZS5zdG9yZVNpZ25lZFByZUtleShvdXJVdWlkLCA0LCB0ZXN0S2V5KTtcbiAgICB9KTtcbiAgICBpdCgnZGVsZXRlcyBzaWduZWQgcHJla2V5cycsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHN0b3JlLnJlbW92ZVNpZ25lZFByZUtleShvdXJVdWlkLCA0KTtcblxuICAgICAgY29uc3Qga2V5ID0gYXdhaXQgc3RvcmUubG9hZFNpZ25lZFByZUtleShvdXJVdWlkLCA0KTtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChrZXkpO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3N0b3JlU2Vzc2lvbicsICgpID0+IHtcbiAgICBpdCgnc3RvcmVzIHNlc3Npb25zJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdGVzdFJlY29yZCA9IGdldFNlc3Npb25SZWNvcmQoKTtcbiAgICAgIGNvbnN0IGlkID0gbmV3IFF1YWxpZmllZEFkZHJlc3Mob3VyVXVpZCwgbmV3IEFkZHJlc3ModGhlaXJVdWlkLCAxKSk7XG4gICAgICBhd2FpdCBzdG9yZS5zdG9yZVNlc3Npb24oaWQsIHRlc3RSZWNvcmQpO1xuICAgICAgY29uc3QgcmVjb3JkID0gYXdhaXQgc3RvcmUubG9hZFNlc3Npb24oaWQpO1xuICAgICAgaWYgKCFyZWNvcmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHJlY29yZCEnKTtcbiAgICAgIH1cblxuICAgICAgYXNzZXJ0LmVxdWFsKHJlY29yZCwgdGVzdFJlY29yZCk7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgncmVtb3ZlQWxsU2Vzc2lvbnMnLCAoKSA9PiB7XG4gICAgaXQoJ3JlbW92ZXMgYWxsIHNlc3Npb25zIGZvciBhIHV1aWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBkZXZpY2VzID0gWzEsIDIsIDNdLm1hcChcbiAgICAgICAgZGV2aWNlSWQgPT5cbiAgICAgICAgICBuZXcgUXVhbGlmaWVkQWRkcmVzcyhvdXJVdWlkLCBuZXcgQWRkcmVzcyh0aGVpclV1aWQsIGRldmljZUlkKSlcbiAgICAgICk7XG5cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBkZXZpY2VzLm1hcChhc3luYyBlbmNvZGVkQWRkcmVzcyA9PiB7XG4gICAgICAgICAgYXdhaXQgc3RvcmUuc3RvcmVTZXNzaW9uKGVuY29kZWRBZGRyZXNzLCBnZXRTZXNzaW9uUmVjb3JkKCkpO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgYXdhaXQgc3RvcmUucmVtb3ZlQWxsU2Vzc2lvbnModGhlaXJVdWlkLnRvU3RyaW5nKCkpO1xuXG4gICAgICBjb25zdCByZWNvcmRzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGRldmljZXMubWFwKGRldmljZSA9PiBzdG9yZS5sb2FkU2Vzc2lvbihkZXZpY2UpKVxuICAgICAgKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IHJlY29yZHMubGVuZ3RoOyBpIDwgbWF4OyBpICs9IDEpIHtcbiAgICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKHJlY29yZHNbaV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ2NsZWFyU2Vzc2lvblN0b3JlJywgKCkgPT4ge1xuICAgIGl0KCdjbGVhcnMgdGhlIHNlc3Npb24gc3RvcmUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB0ZXN0UmVjb3JkID0gZ2V0U2Vzc2lvblJlY29yZCgpO1xuICAgICAgY29uc3QgaWQgPSBuZXcgUXVhbGlmaWVkQWRkcmVzcyhvdXJVdWlkLCBuZXcgQWRkcmVzcyh0aGVpclV1aWQsIDEpKTtcbiAgICAgIGF3YWl0IHN0b3JlLnN0b3JlU2Vzc2lvbihpZCwgdGVzdFJlY29yZCk7XG4gICAgICBhd2FpdCBzdG9yZS5jbGVhclNlc3Npb25TdG9yZSgpO1xuXG4gICAgICBjb25zdCByZWNvcmQgPSBhd2FpdCBzdG9yZS5sb2FkU2Vzc2lvbihpZCk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQocmVjb3JkKTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdnZXREZXZpY2VJZHMnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgZGV2aWNlSWRzIGZvciBhIHV1aWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBvcGVuUmVjb3JkID0gZ2V0U2Vzc2lvblJlY29yZCh0cnVlKTtcbiAgICAgIGNvbnN0IG9wZW5EZXZpY2VzID0gWzEsIDIsIDMsIDEwXS5tYXAoXG4gICAgICAgIGRldmljZUlkID0+XG4gICAgICAgICAgbmV3IFF1YWxpZmllZEFkZHJlc3Mob3VyVXVpZCwgbmV3IEFkZHJlc3ModGhlaXJVdWlkLCBkZXZpY2VJZCkpXG4gICAgICApO1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIG9wZW5EZXZpY2VzLm1hcChhc3luYyBhZGRyZXNzID0+IHtcbiAgICAgICAgICBhd2FpdCBzdG9yZS5zdG9yZVNlc3Npb24oYWRkcmVzcywgb3BlblJlY29yZCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBjb25zdCBjbG9zZWRSZWNvcmQgPSBnZXRTZXNzaW9uUmVjb3JkKGZhbHNlKTtcbiAgICAgIGF3YWl0IHN0b3JlLnN0b3JlU2Vzc2lvbihcbiAgICAgICAgbmV3IFF1YWxpZmllZEFkZHJlc3Mob3VyVXVpZCwgbmV3IEFkZHJlc3ModGhlaXJVdWlkLCAxMSkpLFxuICAgICAgICBjbG9zZWRSZWNvcmRcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGRldmljZUlkcyA9IGF3YWl0IHN0b3JlLmdldERldmljZUlkcyh7XG4gICAgICAgIG91clV1aWQsXG4gICAgICAgIGlkZW50aWZpZXI6IHRoZWlyVXVpZC50b1N0cmluZygpLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuc2FtZU1lbWJlcnMoZGV2aWNlSWRzLCBbMSwgMiwgMywgMTBdKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGVtcHR5IGFycmF5IGZvciBhIHV1aWQgd2l0aCBubyBkZXZpY2UgaWRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZGV2aWNlSWRzID0gYXdhaXQgc3RvcmUuZ2V0RGV2aWNlSWRzKHtcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgICAgaWRlbnRpZmllcjogJ2ZvbycsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5zYW1lTWVtYmVycyhkZXZpY2VJZHMsIFtdKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldE9wZW5EZXZpY2VzJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGFsbCBvcGVuIGRldmljZXMgZm9yIGEgdXVpZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IG9wZW5SZWNvcmQgPSBnZXRTZXNzaW9uUmVjb3JkKHRydWUpO1xuICAgICAgY29uc3Qgb3BlbkRldmljZXMgPSBbMSwgMiwgMywgMTBdLm1hcChcbiAgICAgICAgZGV2aWNlSWQgPT5cbiAgICAgICAgICBuZXcgUXVhbGlmaWVkQWRkcmVzcyhvdXJVdWlkLCBuZXcgQWRkcmVzcyh0aGVpclV1aWQsIGRldmljZUlkKSlcbiAgICAgICk7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgb3BlbkRldmljZXMubWFwKGFzeW5jIGFkZHJlc3MgPT4ge1xuICAgICAgICAgIGF3YWl0IHN0b3JlLnN0b3JlU2Vzc2lvbihhZGRyZXNzLCBvcGVuUmVjb3JkKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGNsb3NlZFJlY29yZCA9IGdldFNlc3Npb25SZWNvcmQoZmFsc2UpO1xuICAgICAgYXdhaXQgc3RvcmUuc3RvcmVTZXNzaW9uKFxuICAgICAgICBuZXcgUXVhbGlmaWVkQWRkcmVzcyhvdXJVdWlkLCBuZXcgQWRkcmVzcyh0aGVpclV1aWQsIDExKSksXG4gICAgICAgIGNsb3NlZFJlY29yZFxuICAgICAgKTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc3RvcmUuZ2V0T3BlbkRldmljZXMob3VyVXVpZCwgW1xuICAgICAgICB0aGVpclV1aWQudG9TdHJpbmcoKSxcbiAgICAgICAgJ2JsYWgnLFxuICAgICAgICAnYmxhaDInLFxuICAgICAgXSk7XG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKFxuICAgICAgICB7XG4gICAgICAgICAgLi4ucmVzdWx0LFxuICAgICAgICAgIGRldmljZXM6IHJlc3VsdC5kZXZpY2VzLm1hcCgoeyBpZCwgaWRlbnRpZmllciwgcmVnaXN0cmF0aW9uSWQgfSkgPT4gKHtcbiAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllci50b1N0cmluZygpLFxuICAgICAgICAgICAgcmVnaXN0cmF0aW9uSWQsXG4gICAgICAgICAgfSkpLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGV2aWNlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgICAgaWRlbnRpZmllcjogdGhlaXJVdWlkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgIHJlZ2lzdHJhdGlvbklkOiAyNDMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogMixcbiAgICAgICAgICAgICAgaWRlbnRpZmllcjogdGhlaXJVdWlkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgIHJlZ2lzdHJhdGlvbklkOiAyNDMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogMyxcbiAgICAgICAgICAgICAgaWRlbnRpZmllcjogdGhlaXJVdWlkLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgIHJlZ2lzdHJhdGlvbklkOiAyNDMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogMTAsXG4gICAgICAgICAgICAgIGlkZW50aWZpZXI6IHRoZWlyVXVpZC50b1N0cmluZygpLFxuICAgICAgICAgICAgICByZWdpc3RyYXRpb25JZDogMjQzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGVtcHR5SWRlbnRpZmllcnM6IFsnYmxhaCcsICdibGFoMiddLFxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZW1wdHkgYXJyYXkgZm9yIGEgdXVpZCB3aXRoIG5vIGRldmljZSBpZHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzdG9yZS5nZXRPcGVuRGV2aWNlcyhvdXJVdWlkLCBbJ2ZvbyddKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCB7XG4gICAgICAgIGRldmljZXM6IFtdLFxuICAgICAgICBlbXB0eUlkZW50aWZpZXJzOiBbJ2ZvbyddLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCd6b25lcycsICgpID0+IHtcbiAgICBjb25zdCBkaXN0cmlidXRpb25JZCA9IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpO1xuICAgIGNvbnN0IHpvbmUgPSBuZXcgWm9uZSgnem9uZScsIHtcbiAgICAgIHBlbmRpbmdTZW5kZXJLZXlzOiB0cnVlLFxuICAgICAgcGVuZGluZ1Nlc3Npb25zOiB0cnVlLFxuICAgICAgcGVuZGluZ1VucHJvY2Vzc2VkOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBzdG9yZS5yZW1vdmVBbGxVbnByb2Nlc3NlZCgpO1xuICAgICAgYXdhaXQgc3RvcmUucmVtb3ZlQWxsU2Vzc2lvbnModGhlaXJVdWlkLnRvU3RyaW5nKCkpO1xuICAgICAgYXdhaXQgc3RvcmUucmVtb3ZlQWxsU2VuZGVyS2V5cygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3Qgc3RvcmUgcGVuZGluZyBzZXNzaW9ucyBpbiBnbG9iYWwgem9uZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGlkID0gbmV3IFF1YWxpZmllZEFkZHJlc3Mob3VyVXVpZCwgbmV3IEFkZHJlc3ModGhlaXJVdWlkLCAxKSk7XG4gICAgICBjb25zdCB0ZXN0UmVjb3JkID0gZ2V0U2Vzc2lvblJlY29yZCgpO1xuXG4gICAgICBhd2FpdCBhc3NlcnQuaXNSZWplY3RlZChcbiAgICAgICAgc3RvcmUud2l0aFpvbmUoR0xPQkFMX1pPTkUsICd0ZXN0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IHN0b3JlLnN0b3JlU2Vzc2lvbihpZCwgdGVzdFJlY29yZCk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsdXJlJyk7XG4gICAgICAgIH0pLFxuICAgICAgICAnRmFpbHVyZSdcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5lcXVhbChhd2FpdCBzdG9yZS5sb2FkU2Vzc2lvbihpZCksIHRlc3RSZWNvcmQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3Qgc3RvcmUgcGVuZGluZyBzZW5kZXIga2V5cyBpbiBnbG9iYWwgem9uZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGlkID0gbmV3IFF1YWxpZmllZEFkZHJlc3Mob3VyVXVpZCwgbmV3IEFkZHJlc3ModGhlaXJVdWlkLCAxKSk7XG4gICAgICBjb25zdCB0ZXN0UmVjb3JkID0gZ2V0U2VuZGVyS2V5UmVjb3JkKCk7XG5cbiAgICAgIGF3YWl0IGFzc2VydC5pc1JlamVjdGVkKFxuICAgICAgICBzdG9yZS53aXRoWm9uZShHTE9CQUxfWk9ORSwgJ3Rlc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgYXdhaXQgc3RvcmUuc2F2ZVNlbmRlcktleShpZCwgZGlzdHJpYnV0aW9uSWQsIHRlc3RSZWNvcmQpO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbHVyZScpO1xuICAgICAgICB9KSxcbiAgICAgICAgJ0ZhaWx1cmUnXG4gICAgICApO1xuXG4gICAgICBhc3NlcnQuZXF1YWwoYXdhaXQgc3RvcmUuZ2V0U2VuZGVyS2V5KGlkLCBkaXN0cmlidXRpb25JZCksIHRlc3RSZWNvcmQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NvbW1pdHMgc2VuZGVyIGtleXMsIHNlc3Npb25zIGFuZCB1bnByb2Nlc3NlZCBvbiBzdWNjZXNzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaWQgPSBuZXcgUXVhbGlmaWVkQWRkcmVzcyhvdXJVdWlkLCBuZXcgQWRkcmVzcyh0aGVpclV1aWQsIDEpKTtcbiAgICAgIGNvbnN0IHRlc3RTZXNzaW9uID0gZ2V0U2Vzc2lvblJlY29yZCgpO1xuICAgICAgY29uc3QgdGVzdFNlbmRlcktleSA9IGdldFNlbmRlcktleVJlY29yZCgpO1xuXG4gICAgICBhd2FpdCBzdG9yZS53aXRoWm9uZSh6b25lLCAndGVzdCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgc3RvcmUuc3RvcmVTZXNzaW9uKGlkLCB0ZXN0U2Vzc2lvbiwgeyB6b25lIH0pO1xuICAgICAgICBhd2FpdCBzdG9yZS5zYXZlU2VuZGVyS2V5KGlkLCBkaXN0cmlidXRpb25JZCwgdGVzdFNlbmRlcktleSwgeyB6b25lIH0pO1xuXG4gICAgICAgIGF3YWl0IHN0b3JlLmFkZFVucHJvY2Vzc2VkKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnMi10d28nLFxuICAgICAgICAgICAgZW52ZWxvcGU6ICdzZWNvbmQnLFxuICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpICsgMixcbiAgICAgICAgICAgIHJlY2VpdmVkQXRDb3VudGVyOiAwLFxuICAgICAgICAgICAgdmVyc2lvbjogMixcbiAgICAgICAgICAgIGF0dGVtcHRzOiAwLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgeyB6b25lIH1cbiAgICAgICAgKTtcblxuICAgICAgICBhc3NlcnQuZXF1YWwoYXdhaXQgc3RvcmUubG9hZFNlc3Npb24oaWQsIHsgem9uZSB9KSwgdGVzdFNlc3Npb24pO1xuICAgICAgICBhc3NlcnQuZXF1YWwoXG4gICAgICAgICAgYXdhaXQgc3RvcmUuZ2V0U2VuZGVyS2V5KGlkLCBkaXN0cmlidXRpb25JZCwgeyB6b25lIH0pLFxuICAgICAgICAgIHRlc3RTZW5kZXJLZXlcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuZXF1YWwoYXdhaXQgc3RvcmUubG9hZFNlc3Npb24oaWQpLCB0ZXN0U2Vzc2lvbik7XG4gICAgICBhc3NlcnQuZXF1YWwoYXdhaXQgc3RvcmUuZ2V0U2VuZGVyS2V5KGlkLCBkaXN0cmlidXRpb25JZCksIHRlc3RTZW5kZXJLZXkpO1xuXG4gICAgICBjb25zdCBhbGxVbnByb2Nlc3NlZCA9XG4gICAgICAgIGF3YWl0IHN0b3JlLmdldEFsbFVucHJvY2Vzc2VkQW5kSW5jcmVtZW50QXR0ZW1wdHMoKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIGFsbFVucHJvY2Vzc2VkLm1hcCgoeyBlbnZlbG9wZSB9KSA9PiBlbnZlbG9wZSksXG4gICAgICAgIFsnc2Vjb25kJ11cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV2ZXJ0cyBzZW5kZXIga2V5cywgc2Vzc2lvbnMgYW5kIHVucHJvY2Vzc2VkIG9uIGVycm9yJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaWQgPSBuZXcgUXVhbGlmaWVkQWRkcmVzcyhvdXJVdWlkLCBuZXcgQWRkcmVzcyh0aGVpclV1aWQsIDEpKTtcbiAgICAgIGNvbnN0IHRlc3RTZXNzaW9uID0gZ2V0U2Vzc2lvblJlY29yZCgpO1xuICAgICAgY29uc3QgZmFpbGVkU2Vzc2lvbiA9IGdldFNlc3Npb25SZWNvcmQoKTtcbiAgICAgIGNvbnN0IHRlc3RTZW5kZXJLZXkgPSBnZXRTZW5kZXJLZXlSZWNvcmQoKTtcbiAgICAgIGNvbnN0IGZhaWxlZFNlbmRlcktleSA9IGdldFNlbmRlcktleVJlY29yZCgpO1xuXG4gICAgICBhd2FpdCBzdG9yZS5zdG9yZVNlc3Npb24oaWQsIHRlc3RTZXNzaW9uKTtcbiAgICAgIGFzc2VydC5lcXVhbChhd2FpdCBzdG9yZS5sb2FkU2Vzc2lvbihpZCksIHRlc3RTZXNzaW9uKTtcblxuICAgICAgYXdhaXQgc3RvcmUuc2F2ZVNlbmRlcktleShpZCwgZGlzdHJpYnV0aW9uSWQsIHRlc3RTZW5kZXJLZXkpO1xuICAgICAgYXNzZXJ0LmVxdWFsKGF3YWl0IHN0b3JlLmdldFNlbmRlcktleShpZCwgZGlzdHJpYnV0aW9uSWQpLCB0ZXN0U2VuZGVyS2V5KTtcblxuICAgICAgYXdhaXQgYXNzZXJ0LmlzUmVqZWN0ZWQoXG4gICAgICAgIHN0b3JlLndpdGhab25lKHpvbmUsICd0ZXN0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IHN0b3JlLnN0b3JlU2Vzc2lvbihpZCwgZmFpbGVkU2Vzc2lvbiwgeyB6b25lIH0pO1xuICAgICAgICAgIGFzc2VydC5lcXVhbChhd2FpdCBzdG9yZS5sb2FkU2Vzc2lvbihpZCwgeyB6b25lIH0pLCBmYWlsZWRTZXNzaW9uKTtcblxuICAgICAgICAgIGF3YWl0IHN0b3JlLnNhdmVTZW5kZXJLZXkoaWQsIGRpc3RyaWJ1dGlvbklkLCBmYWlsZWRTZW5kZXJLZXksIHtcbiAgICAgICAgICAgIHpvbmUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgICAgICAgYXdhaXQgc3RvcmUuZ2V0U2VuZGVyS2V5KGlkLCBkaXN0cmlidXRpb25JZCwgeyB6b25lIH0pLFxuICAgICAgICAgICAgZmFpbGVkU2VuZGVyS2V5XG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGF3YWl0IHN0b3JlLmFkZFVucHJvY2Vzc2VkKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogJzItdHdvJyxcbiAgICAgICAgICAgICAgZW52ZWxvcGU6ICdzZWNvbmQnLFxuICAgICAgICAgICAgICB0aW1lc3RhbXA6IDIsXG4gICAgICAgICAgICAgIHJlY2VpdmVkQXRDb3VudGVyOiAwLFxuICAgICAgICAgICAgICB2ZXJzaW9uOiAyLFxuICAgICAgICAgICAgICBhdHRlbXB0czogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IHpvbmUgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWx1cmUnKTtcbiAgICAgICAgfSksXG4gICAgICAgICdGYWlsdXJlJ1xuICAgICAgKTtcblxuICAgICAgYXNzZXJ0LmVxdWFsKGF3YWl0IHN0b3JlLmxvYWRTZXNzaW9uKGlkKSwgdGVzdFNlc3Npb24pO1xuICAgICAgYXNzZXJ0LmVxdWFsKGF3YWl0IHN0b3JlLmdldFNlbmRlcktleShpZCwgZGlzdHJpYnV0aW9uSWQpLCB0ZXN0U2VuZGVyS2V5KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYXdhaXQgc3RvcmUuZ2V0QWxsVW5wcm9jZXNzZWRBbmRJbmNyZW1lbnRBdHRlbXB0cygpLCBbXSk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2FuIGJlIHJlLWVudGVyZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBpZCA9IG5ldyBRdWFsaWZpZWRBZGRyZXNzKG91clV1aWQsIG5ldyBBZGRyZXNzKHRoZWlyVXVpZCwgMSkpO1xuICAgICAgY29uc3QgdGVzdFJlY29yZCA9IGdldFNlc3Npb25SZWNvcmQoKTtcblxuICAgICAgYXdhaXQgc3RvcmUud2l0aFpvbmUoem9uZSwgJ3Rlc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHN0b3JlLndpdGhab25lKHpvbmUsICduZXN0ZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgYXdhaXQgc3RvcmUuc3RvcmVTZXNzaW9uKGlkLCB0ZXN0UmVjb3JkLCB7IHpvbmUgfSk7XG5cbiAgICAgICAgICBhc3NlcnQuZXF1YWwoYXdhaXQgc3RvcmUubG9hZFNlc3Npb24oaWQsIHsgem9uZSB9KSwgdGVzdFJlY29yZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFzc2VydC5lcXVhbChhd2FpdCBzdG9yZS5sb2FkU2Vzc2lvbihpZCwgeyB6b25lIH0pLCB0ZXN0UmVjb3JkKTtcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuZXF1YWwoYXdhaXQgc3RvcmUubG9hZFNlc3Npb24oaWQpLCB0ZXN0UmVjb3JkKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYW4gYmUgcmUtZW50ZXJlZCBhZnRlciB3YWl0aW5nJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgYSA9IG5ldyBab25lKCdhJyk7XG4gICAgICBjb25zdCBiID0gbmV3IFpvbmUoJ2InKTtcblxuICAgICAgY29uc3Qgb3JkZXI6IEFycmF5PG51bWJlcj4gPSBbXTtcbiAgICAgIGNvbnN0IHByb21pc2VzOiBBcnJheTxQcm9taXNlPHVua25vd24+PiA9IFtdO1xuXG4gICAgICAvLyBXaGF0IGhhcHBlbnMgYmVsb3cgaXMgYnJpZWZseSBmb2xsb3dpbmc6XG4gICAgICAvLyAxLiBXZSBlbnRlciB6b25lIFwiYVwiXG4gICAgICAvLyAyLiBXZSB3YWl0IGZvciB6b25lIFwiYVwiIHRvIGJlIGxlZnQgdG8gZW50ZXIgem9uZSBcImJcIlxuICAgICAgLy8gMy4gU2tpcCBmZXcgdGlja3MgdG8gdHJpZ2dlciBsZWF2ZSBvZiB6b25lIFwiYVwiIGFuZCByZXNvbHZlIHRoZSB3YWl0aW5nXG4gICAgICAvLyAgICBxdWV1ZSBwcm9taXNlIGZvciB6b25lIFwiYlwiXG4gICAgICAvLyA0LiBFbnRlciB6b25lIFwiYVwiIHdoaWxlIHJlc29sdXRpb24gd2FzIHRoZSBwcm9taXNlIGFib3ZlIGlzIHF1ZXVlZCBpblxuICAgICAgLy8gICAgbWljcm90YXNrcyBxdWV1ZS5cblxuICAgICAgcHJvbWlzZXMucHVzaChzdG9yZS53aXRoWm9uZShhLCAnYScsIGFzeW5jICgpID0+IG9yZGVyLnB1c2goMSkpKTtcbiAgICAgIHByb21pc2VzLnB1c2goc3RvcmUud2l0aFpvbmUoYiwgJ2InLCBhc3luYyAoKSA9PiBvcmRlci5wdXNoKDIpKSk7XG4gICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgcHJvbWlzZXMucHVzaChzdG9yZS53aXRoWm9uZShhLCAnYSBhZ2FpbicsIGFzeW5jICgpID0+IG9yZGVyLnB1c2goMykpKTtcblxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKG9yZGVyLCBbMSwgMiwgM10pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgZGVhZGxvY2sgaW4gYXJjaGl2ZVNpYmxpbmdTZXNzaW9ucycsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGlkID0gbmV3IFF1YWxpZmllZEFkZHJlc3Mob3VyVXVpZCwgbmV3IEFkZHJlc3ModGhlaXJVdWlkLCAxKSk7XG4gICAgICBjb25zdCBzaWJsaW5nID0gbmV3IFF1YWxpZmllZEFkZHJlc3Mob3VyVXVpZCwgbmV3IEFkZHJlc3ModGhlaXJVdWlkLCAyKSk7XG5cbiAgICAgIGF3YWl0IHN0b3JlLnN0b3JlU2Vzc2lvbihpZCwgZ2V0U2Vzc2lvblJlY29yZCh0cnVlKSk7XG4gICAgICBhd2FpdCBzdG9yZS5zdG9yZVNlc3Npb24oc2libGluZywgZ2V0U2Vzc2lvblJlY29yZCh0cnVlKSk7XG5cbiAgICAgIGF3YWl0IHN0b3JlLmFyY2hpdmVTaWJsaW5nU2Vzc2lvbnMoaWQuYWRkcmVzcywgeyB6b25lIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbiBiZSBjb25jdXJyZW50bHkgcmUtZW50ZXJlZCBhZnRlciB3YWl0aW5nJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgYSA9IG5ldyBab25lKCdhJyk7XG4gICAgICBjb25zdCBiID0gbmV3IFpvbmUoJ2InKTtcblxuICAgICAgY29uc3Qgb3JkZXI6IEFycmF5PG51bWJlcj4gPSBbXTtcbiAgICAgIGNvbnN0IHByb21pc2VzOiBBcnJheTxQcm9taXNlPHVua25vd24+PiA9IFtdO1xuXG4gICAgICAvLyAxLiBFbnRlciB6b25lIFwiYVwiXG4gICAgICAvLyAyLiBXYWl0IGZvciB6b25lIFwiYVwiIHRvIGJlIGxlZnQgdG8gZW50ZXIgem9uZSBcImJcIiB0d2ljZVxuICAgICAgLy8gMy4gVmVyaWZ5IHRoYXQgYm90aCB6b25lIFwiYlwiIHRhc2tzIHJhbiBpbiBwYXJhbGxlbFxuXG4gICAgICBwcm9taXNlcy5wdXNoKHN0b3JlLndpdGhab25lKGEsICdhJywgYXN5bmMgKCkgPT4gb3JkZXIucHVzaCgxKSkpO1xuICAgICAgcHJvbWlzZXMucHVzaChcbiAgICAgICAgc3RvcmUud2l0aFpvbmUoYiwgJ2InLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgb3JkZXIucHVzaCgyKTtcbiAgICAgICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICBvcmRlci5wdXNoKDIyKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICBwcm9taXNlcy5wdXNoKFxuICAgICAgICBzdG9yZS53aXRoWm9uZShiLCAnYicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBvcmRlci5wdXNoKDMpO1xuICAgICAgICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgIG9yZGVyLnB1c2goMzMpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChvcmRlciwgWzEsIDIsIDMsIDIyLCAzM10pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnTm90IHlldCBwcm9jZXNzZWQgbWVzc2FnZXMnLCAoKSA9PiB7XG4gICAgY29uc3QgTk9XID0gRGF0ZS5ub3coKTtcblxuICAgIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgc3RvcmUucmVtb3ZlQWxsVW5wcm9jZXNzZWQoKTtcbiAgICAgIGNvbnN0IGl0ZW1zID0gYXdhaXQgc3RvcmUuZ2V0QWxsVW5wcm9jZXNzZWRBbmRJbmNyZW1lbnRBdHRlbXB0cygpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGl0ZW1zLmxlbmd0aCwgMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWRkcyB0aHJlZSBhbmQgZ2V0cyB0aGVtIGJhY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIHN0b3JlLmFkZFVucHJvY2Vzc2VkKHtcbiAgICAgICAgICBpZDogJzAtZHJvcHBlZCcsXG4gICAgICAgICAgZW52ZWxvcGU6ICdvbGQgZW52ZWxvcGUnLFxuICAgICAgICAgIHRpbWVzdGFtcDogTk9XIC0gMiAqIGR1cmF0aW9ucy5NT05USCxcbiAgICAgICAgICByZWNlaXZlZEF0Q291bnRlcjogLTEsXG4gICAgICAgICAgdmVyc2lvbjogMixcbiAgICAgICAgICBhdHRlbXB0czogMCxcbiAgICAgICAgfSksXG4gICAgICAgIHN0b3JlLmFkZFVucHJvY2Vzc2VkKHtcbiAgICAgICAgICBpZDogJzItdHdvJyxcbiAgICAgICAgICBlbnZlbG9wZTogJ3NlY29uZCcsXG4gICAgICAgICAgdGltZXN0YW1wOiBOT1cgKyAyLFxuICAgICAgICAgIHJlY2VpdmVkQXRDb3VudGVyOiAxLFxuICAgICAgICAgIHZlcnNpb246IDIsXG4gICAgICAgICAgYXR0ZW1wdHM6IDAsXG4gICAgICAgIH0pLFxuICAgICAgICBzdG9yZS5hZGRVbnByb2Nlc3NlZCh7XG4gICAgICAgICAgaWQ6ICczLXRocmVlJyxcbiAgICAgICAgICBlbnZlbG9wZTogJ3RoaXJkJyxcbiAgICAgICAgICB0aW1lc3RhbXA6IE5PVyArIDMsXG4gICAgICAgICAgcmVjZWl2ZWRBdENvdW50ZXI6IDIsXG4gICAgICAgICAgdmVyc2lvbjogMixcbiAgICAgICAgICBhdHRlbXB0czogMCxcbiAgICAgICAgfSksXG4gICAgICAgIHN0b3JlLmFkZFVucHJvY2Vzc2VkKHtcbiAgICAgICAgICBpZDogJzEtb25lJyxcbiAgICAgICAgICBlbnZlbG9wZTogJ2ZpcnN0JyxcbiAgICAgICAgICB0aW1lc3RhbXA6IE5PVyArIDEsXG4gICAgICAgICAgcmVjZWl2ZWRBdENvdW50ZXI6IDAsXG4gICAgICAgICAgdmVyc2lvbjogMixcbiAgICAgICAgICBhdHRlbXB0czogMCxcbiAgICAgICAgfSksXG4gICAgICBdKTtcblxuICAgICAgY29uc3QgaXRlbXMgPSBhd2FpdCBzdG9yZS5nZXRBbGxVbnByb2Nlc3NlZEFuZEluY3JlbWVudEF0dGVtcHRzKCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaXRlbXMubGVuZ3RoLCAzKTtcblxuICAgICAgLy8gdGhleSBhcmUgaW4gdGhlIHByb3BlciBvcmRlciBiZWNhdXNlIHRoZSBjb2xsZWN0aW9uIGNvbXBhcmF0b3IgaXNcbiAgICAgIC8vICdyZWNlaXZlZEF0Q291bnRlcidcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChpdGVtc1swXS5lbnZlbG9wZSwgJ2ZpcnN0Jyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaXRlbXNbMV0uZW52ZWxvcGUsICdzZWNvbmQnKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChpdGVtc1syXS5lbnZlbG9wZSwgJ3RoaXJkJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2FuIHVwZGF0ZXMgaXRlbXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBpZCA9ICcxLW9uZSc7XG4gICAgICBhd2FpdCBzdG9yZS5hZGRVbnByb2Nlc3NlZCh7XG4gICAgICAgIGlkLFxuICAgICAgICBlbnZlbG9wZTogJ2ZpcnN0JyxcbiAgICAgICAgdGltZXN0YW1wOiBOT1cgKyAxLFxuICAgICAgICByZWNlaXZlZEF0Q291bnRlcjogMCxcbiAgICAgICAgdmVyc2lvbjogMixcbiAgICAgICAgYXR0ZW1wdHM6IDAsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IHN0b3JlLnVwZGF0ZVVucHJvY2Vzc2VkV2l0aERhdGEoaWQsIHsgZGVjcnlwdGVkOiAndXBkYXRlZCcgfSk7XG5cbiAgICAgIGNvbnN0IGl0ZW1zID0gYXdhaXQgc3RvcmUuZ2V0QWxsVW5wcm9jZXNzZWRBbmRJbmNyZW1lbnRBdHRlbXB0cygpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGl0ZW1zLmxlbmd0aCwgMSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaXRlbXNbMF0uZGVjcnlwdGVkLCAndXBkYXRlZCcpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGl0ZW1zWzBdLnRpbWVzdGFtcCwgTk9XICsgMSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaXRlbXNbMF0uYXR0ZW1wdHMsIDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZVVucHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseSBkZWxldGVzIGl0ZW0nLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBpZCA9ICcxLW9uZSc7XG4gICAgICBhd2FpdCBzdG9yZS5hZGRVbnByb2Nlc3NlZCh7XG4gICAgICAgIGlkLFxuICAgICAgICBlbnZlbG9wZTogJ2ZpcnN0JyxcbiAgICAgICAgdGltZXN0YW1wOiBOT1cgKyAxLFxuICAgICAgICByZWNlaXZlZEF0Q291bnRlcjogMCxcbiAgICAgICAgdmVyc2lvbjogMixcbiAgICAgICAgYXR0ZW1wdHM6IDAsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IHN0b3JlLnJlbW92ZVVucHJvY2Vzc2VkKGlkKTtcblxuICAgICAgY29uc3QgaXRlbXMgPSBhd2FpdCBzdG9yZS5nZXRBbGxVbnByb2Nlc3NlZEFuZEluY3JlbWVudEF0dGVtcHRzKCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaXRlbXMubGVuZ3RoLCAwKTtcbiAgICB9KTtcblxuICAgIGl0KCdnZXRBbGxVbnByb2Nlc3NlZEFuZEluY3JlbWVudEF0dGVtcHRzIGRlbGV0ZXMgaXRlbXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBzdG9yZS5hZGRVbnByb2Nlc3NlZCh7XG4gICAgICAgIGlkOiAnMS1vbmUnLFxuICAgICAgICBlbnZlbG9wZTogJ2ZpcnN0JyxcbiAgICAgICAgdGltZXN0YW1wOiBOT1cgKyAxLFxuICAgICAgICByZWNlaXZlZEF0Q291bnRlcjogMCxcbiAgICAgICAgdmVyc2lvbjogMixcbiAgICAgICAgYXR0ZW1wdHM6IDMsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgaXRlbXMgPSBhd2FpdCBzdG9yZS5nZXRBbGxVbnByb2Nlc3NlZEFuZEluY3JlbWVudEF0dGVtcHRzKCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoaXRlbXMubGVuZ3RoLCAwKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQSxrQkFBNkI7QUFDN0IsOEJBQTJCO0FBQzNCLDhCQUlPO0FBRVAsc0JBQXVCO0FBQ3ZCLGdDQUF3QztBQUN4QyxnQkFBMkI7QUFDM0Isa0JBQXFCO0FBRXJCLFlBQXVCO0FBQ3ZCLG9CQUFrRDtBQUNsRCxtQkFBc0Q7QUFFdEQsaUNBQTRCO0FBQzVCLHFCQUF3QjtBQUN4Qiw4QkFBaUM7QUFDakMsa0JBQXFCO0FBR3JCLG9CQUFLLElBQUksK0JBQWM7QUFFdkIsTUFBTTtBQUFBLEVBQ0o7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxJQUNFLHVCQUFPLE1BQU07QUFFakIsU0FBUyx1QkFBdUIsTUFBTTtBQUNwQyxRQUFNLFVBQVUsaUJBQUssU0FBUztBQUM5QixRQUFNLFlBQVksaUJBQUssU0FBUztBQUNoQyxNQUFJO0FBQ0osTUFBSTtBQUNKLE1BQUk7QUFFSiw0QkFBMEIsUUFBaUM7QUFDekQsVUFBTSxRQUFRLElBQUksZ0JBQWdCO0FBRWxDLFVBQU0sbUJBQW1CLENBQUM7QUFFMUIsUUFBSSxRQUFRO0FBQ1YsWUFBTSxpQkFBaUIsSUFBSSxpQkFBaUI7QUFFNUMsWUFBTSxlQUFlLGVBQWUsYUFBYTtBQUNqRCxZQUFNLGVBQWUsc0JBQXNCLGFBQWE7QUFDeEQsWUFBTSxlQUFlLHNCQUFzQjtBQUUzQyxZQUFNLGVBQWUsa0JBQWtCO0FBQ3ZDLFlBQU0sZUFBZSx1QkFBdUIsYUFBYTtBQUN6RCxZQUFNLGVBQWUsdUJBQXVCO0FBRTVDLFlBQU0sZUFBZSxVQUFVLGNBQWM7QUFDN0MsWUFBTSxlQUFlLGlCQUFpQjtBQUFBLElBQ3hDO0FBRUEsV0FBTyxzQ0FBYyxZQUNuQixPQUFPLEtBQUssdURBQXdCLEtBQUssQ0FBQyxDQUM1QztBQUFBLEVBQ0Y7QUF2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
