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
var import_chai = require("chai");
var import_mock_server = require("@signalapp/mock-server");
var durations = __toESM(require("../../util/durations"));
var import_fixtures = require("./fixtures");
const IdentifierType = import_mock_server.Proto.ManifestRecord.Identifier.Type;
describe("storage service", function needsName() {
  this.timeout(durations.MINUTE);
  let bootstrap;
  let app;
  beforeEach(async () => {
    ({ bootstrap, app } = await (0, import_fixtures.initStorage)());
  });
  afterEach(async () => {
    await app.close();
    await bootstrap.teardown();
  });
  it("should drop gv1 record if there is a matching gv2 record", async () => {
    const { phone } = bootstrap;
    (0, import_fixtures.debug)("adding both records");
    {
      const state = await phone.expectStorageState("consistency check");
      const groupV1Id = Buffer.from("Wi9258rCEp7AdSdp+jCMlQ==", "base64");
      const masterKey = Buffer.from("2+rdvzFGCOJI8POHcPNZHrYQWS/JXmT63R5OXKxhrPk=", "base64");
      const updatedState = await phone.setStorageState(state.addRecord({
        type: IdentifierType.GROUPV1,
        record: {
          groupV1: {
            id: groupV1Id
          }
        }
      }).addRecord({
        type: IdentifierType.GROUPV2,
        record: {
          groupV2: {
            masterKey
          }
        }
      }));
      (0, import_fixtures.debug)("sending fetch storage");
      await phone.sendFetchStorage({
        timestamp: bootstrap.getTimestamp()
      });
      (0, import_fixtures.debug)("waiting for next storage state");
      const nextState = await phone.waitForStorageState({
        after: updatedState
      });
      import_chai.assert.isFalse(nextState.hasRecord(({ type }) => {
        return type === IdentifierType.GROUPV1;
      }), "should not have gv1 record");
      import_chai.assert.isTrue(nextState.hasRecord(({ type, record }) => {
        if (type !== IdentifierType.GROUPV2) {
          return false;
        }
        if (!record.groupV2?.masterKey) {
          return false;
        }
        return Buffer.from(masterKey).equals(record.groupV2.masterKey);
      }), "should have gv2 record");
    }
  });
  it("should drop duplicate account record", async () => {
    const { phone } = bootstrap;
    (0, import_fixtures.debug)("duplicating account record");
    {
      const state = await phone.expectStorageState("consistency check");
      const oldAccount = state.findRecord(({ type }) => {
        return type === IdentifierType.ACCOUNT;
      });
      if (oldAccount === void 0) {
        throw new Error("should have initial account record");
      }
      const updatedState = await phone.setStorageState(state.addRecord({
        type: IdentifierType.ACCOUNT,
        record: oldAccount.record
      }));
      (0, import_fixtures.debug)("sending fetch storage");
      await phone.sendFetchStorage({
        timestamp: bootstrap.getTimestamp()
      });
      (0, import_fixtures.debug)("waiting for next storage state");
      const nextState = await phone.waitForStorageState({
        after: updatedState
      });
      import_chai.assert.isFalse(nextState.hasRecord(({ type, key }) => {
        return type === IdentifierType.ACCOUNT && key.equals(oldAccount.key);
      }), "should not have old account record");
      import_chai.assert.isTrue(nextState.hasRecord(({ type }) => {
        return type === IdentifierType.ACCOUNT;
      }), "should have new account record");
    }
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZHJvcF90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgUHJvdG8gfSBmcm9tICdAc2lnbmFsYXBwL21vY2stc2VydmVyJztcblxuaW1wb3J0ICogYXMgZHVyYXRpb25zIGZyb20gJy4uLy4uL3V0aWwvZHVyYXRpb25zJztcbmltcG9ydCB0eXBlIHsgQXBwLCBCb290c3RyYXAgfSBmcm9tICcuL2ZpeHR1cmVzJztcbmltcG9ydCB7IGluaXRTdG9yYWdlLCBkZWJ1ZyB9IGZyb20gJy4vZml4dHVyZXMnO1xuXG5jb25zdCBJZGVudGlmaWVyVHlwZSA9IFByb3RvLk1hbmlmZXN0UmVjb3JkLklkZW50aWZpZXIuVHlwZTtcblxuZGVzY3JpYmUoJ3N0b3JhZ2Ugc2VydmljZScsIGZ1bmN0aW9uIG5lZWRzTmFtZSgpIHtcbiAgdGhpcy50aW1lb3V0KGR1cmF0aW9ucy5NSU5VVEUpO1xuXG4gIGxldCBib290c3RyYXA6IEJvb3RzdHJhcDtcbiAgbGV0IGFwcDogQXBwO1xuXG4gIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgICh7IGJvb3RzdHJhcCwgYXBwIH0gPSBhd2FpdCBpbml0U3RvcmFnZSgpKTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBhcHAuY2xvc2UoKTtcbiAgICBhd2FpdCBib290c3RyYXAudGVhcmRvd24oKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBkcm9wIGd2MSByZWNvcmQgaWYgdGhlcmUgaXMgYSBtYXRjaGluZyBndjIgcmVjb3JkJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHsgcGhvbmUgfSA9IGJvb3RzdHJhcDtcblxuICAgIGRlYnVnKCdhZGRpbmcgYm90aCByZWNvcmRzJyk7XG4gICAge1xuICAgICAgY29uc3Qgc3RhdGUgPSBhd2FpdCBwaG9uZS5leHBlY3RTdG9yYWdlU3RhdGUoJ2NvbnNpc3RlbmN5IGNoZWNrJyk7XG5cbiAgICAgIGNvbnN0IGdyb3VwVjFJZCA9IEJ1ZmZlci5mcm9tKCdXaTkyNThyQ0VwN0FkU2RwK2pDTWxRPT0nLCAnYmFzZTY0Jyk7XG4gICAgICBjb25zdCBtYXN0ZXJLZXkgPSBCdWZmZXIuZnJvbShcbiAgICAgICAgJzIrcmR2ekZHQ09KSThQT0hjUE5aSHJZUVdTL0pYbVQ2M1I1T1hLeGhyUGs9JyxcbiAgICAgICAgJ2Jhc2U2NCdcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHVwZGF0ZWRTdGF0ZSA9IGF3YWl0IHBob25lLnNldFN0b3JhZ2VTdGF0ZShcbiAgICAgICAgc3RhdGVcbiAgICAgICAgICAuYWRkUmVjb3JkKHtcbiAgICAgICAgICAgIHR5cGU6IElkZW50aWZpZXJUeXBlLkdST1VQVjEsXG4gICAgICAgICAgICByZWNvcmQ6IHtcbiAgICAgICAgICAgICAgZ3JvdXBWMToge1xuICAgICAgICAgICAgICAgIGlkOiBncm91cFYxSWQsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmFkZFJlY29yZCh7XG4gICAgICAgICAgICB0eXBlOiBJZGVudGlmaWVyVHlwZS5HUk9VUFYyLFxuICAgICAgICAgICAgcmVjb3JkOiB7XG4gICAgICAgICAgICAgIGdyb3VwVjI6IHtcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBkZWJ1Zygnc2VuZGluZyBmZXRjaCBzdG9yYWdlJyk7XG4gICAgICBhd2FpdCBwaG9uZS5zZW5kRmV0Y2hTdG9yYWdlKHtcbiAgICAgICAgdGltZXN0YW1wOiBib290c3RyYXAuZ2V0VGltZXN0YW1wKCksXG4gICAgICB9KTtcblxuICAgICAgZGVidWcoJ3dhaXRpbmcgZm9yIG5leHQgc3RvcmFnZSBzdGF0ZScpO1xuICAgICAgY29uc3QgbmV4dFN0YXRlID0gYXdhaXQgcGhvbmUud2FpdEZvclN0b3JhZ2VTdGF0ZSh7XG4gICAgICAgIGFmdGVyOiB1cGRhdGVkU3RhdGUsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICAgIG5leHRTdGF0ZS5oYXNSZWNvcmQoKHsgdHlwZSB9KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHR5cGUgPT09IElkZW50aWZpZXJUeXBlLkdST1VQVjE7XG4gICAgICAgIH0pLFxuICAgICAgICAnc2hvdWxkIG5vdCBoYXZlIGd2MSByZWNvcmQnXG4gICAgICApO1xuXG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBuZXh0U3RhdGUuaGFzUmVjb3JkKCh7IHR5cGUsIHJlY29yZCB9KSA9PiB7XG4gICAgICAgICAgaWYgKHR5cGUgIT09IElkZW50aWZpZXJUeXBlLkdST1VQVjIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXJlY29yZC5ncm91cFYyPy5tYXN0ZXJLZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKG1hc3RlcktleSkuZXF1YWxzKHJlY29yZC5ncm91cFYyLm1hc3RlcktleSk7XG4gICAgICAgIH0pLFxuICAgICAgICAnc2hvdWxkIGhhdmUgZ3YyIHJlY29yZCdcbiAgICAgICk7XG4gICAgfVxuICB9KTtcblxuICBpdCgnc2hvdWxkIGRyb3AgZHVwbGljYXRlIGFjY291bnQgcmVjb3JkJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHsgcGhvbmUgfSA9IGJvb3RzdHJhcDtcblxuICAgIGRlYnVnKCdkdXBsaWNhdGluZyBhY2NvdW50IHJlY29yZCcpO1xuICAgIHtcbiAgICAgIGNvbnN0IHN0YXRlID0gYXdhaXQgcGhvbmUuZXhwZWN0U3RvcmFnZVN0YXRlKCdjb25zaXN0ZW5jeSBjaGVjaycpO1xuXG4gICAgICBjb25zdCBvbGRBY2NvdW50ID0gc3RhdGUuZmluZFJlY29yZCgoeyB0eXBlIH0pID0+IHtcbiAgICAgICAgcmV0dXJuIHR5cGUgPT09IElkZW50aWZpZXJUeXBlLkFDQ09VTlQ7XG4gICAgICB9KTtcbiAgICAgIGlmIChvbGRBY2NvdW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzaG91bGQgaGF2ZSBpbml0aWFsIGFjY291bnQgcmVjb3JkJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVwZGF0ZWRTdGF0ZSA9IGF3YWl0IHBob25lLnNldFN0b3JhZ2VTdGF0ZShcbiAgICAgICAgc3RhdGUuYWRkUmVjb3JkKHtcbiAgICAgICAgICB0eXBlOiBJZGVudGlmaWVyVHlwZS5BQ0NPVU5ULFxuICAgICAgICAgIHJlY29yZDogb2xkQWNjb3VudC5yZWNvcmQsXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBkZWJ1Zygnc2VuZGluZyBmZXRjaCBzdG9yYWdlJyk7XG4gICAgICBhd2FpdCBwaG9uZS5zZW5kRmV0Y2hTdG9yYWdlKHtcbiAgICAgICAgdGltZXN0YW1wOiBib290c3RyYXAuZ2V0VGltZXN0YW1wKCksXG4gICAgICB9KTtcblxuICAgICAgZGVidWcoJ3dhaXRpbmcgZm9yIG5leHQgc3RvcmFnZSBzdGF0ZScpO1xuICAgICAgY29uc3QgbmV4dFN0YXRlID0gYXdhaXQgcGhvbmUud2FpdEZvclN0b3JhZ2VTdGF0ZSh7XG4gICAgICAgIGFmdGVyOiB1cGRhdGVkU3RhdGUsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICAgIG5leHRTdGF0ZS5oYXNSZWNvcmQoKHsgdHlwZSwga2V5IH0pID0+IHtcbiAgICAgICAgICByZXR1cm4gdHlwZSA9PT0gSWRlbnRpZmllclR5cGUuQUNDT1VOVCAmJiBrZXkuZXF1YWxzKG9sZEFjY291bnQua2V5KTtcbiAgICAgICAgfSksXG4gICAgICAgICdzaG91bGQgbm90IGhhdmUgb2xkIGFjY291bnQgcmVjb3JkJ1xuICAgICAgKTtcblxuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgbmV4dFN0YXRlLmhhc1JlY29yZCgoeyB0eXBlIH0pID0+IHtcbiAgICAgICAgICByZXR1cm4gdHlwZSA9PT0gSWRlbnRpZmllclR5cGUuQUNDT1VOVDtcbiAgICAgICAgfSksXG4gICAgICAgICdzaG91bGQgaGF2ZSBuZXcgYWNjb3VudCByZWNvcmQnXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIseUJBQXNCO0FBRXRCLGdCQUEyQjtBQUUzQixzQkFBbUM7QUFFbkMsTUFBTSxpQkFBaUIseUJBQU0sZUFBZSxXQUFXO0FBRXZELFNBQVMsbUJBQW1CLHFCQUFxQjtBQUMvQyxPQUFLLFFBQVEsVUFBVSxNQUFNO0FBRTdCLE1BQUk7QUFDSixNQUFJO0FBRUosYUFBVyxZQUFZO0FBQ3JCLElBQUMsR0FBRSxXQUFXLElBQUksSUFBSSxNQUFNLGlDQUFZO0FBQUEsRUFDMUMsQ0FBQztBQUVELFlBQVUsWUFBWTtBQUNwQixVQUFNLElBQUksTUFBTTtBQUNoQixVQUFNLFVBQVUsU0FBUztBQUFBLEVBQzNCLENBQUM7QUFFRCxLQUFHLDREQUE0RCxZQUFZO0FBQ3pFLFVBQU0sRUFBRSxVQUFVO0FBRWxCLCtCQUFNLHFCQUFxQjtBQUMzQjtBQUNFLFlBQU0sUUFBUSxNQUFNLE1BQU0sbUJBQW1CLG1CQUFtQjtBQUVoRSxZQUFNLFlBQVksT0FBTyxLQUFLLDRCQUE0QixRQUFRO0FBQ2xFLFlBQU0sWUFBWSxPQUFPLEtBQ3ZCLGdEQUNBLFFBQ0Y7QUFFQSxZQUFNLGVBQWUsTUFBTSxNQUFNLGdCQUMvQixNQUNHLFVBQVU7QUFBQSxRQUNULE1BQU0sZUFBZTtBQUFBLFFBQ3JCLFFBQVE7QUFBQSxVQUNOLFNBQVM7QUFBQSxZQUNQLElBQUk7QUFBQSxVQUNOO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQyxFQUNBLFVBQVU7QUFBQSxRQUNULE1BQU0sZUFBZTtBQUFBLFFBQ3JCLFFBQVE7QUFBQSxVQUNOLFNBQVM7QUFBQSxZQUNQO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUMsQ0FDTDtBQUVBLGlDQUFNLHVCQUF1QjtBQUM3QixZQUFNLE1BQU0saUJBQWlCO0FBQUEsUUFDM0IsV0FBVyxVQUFVLGFBQWE7QUFBQSxNQUNwQyxDQUFDO0FBRUQsaUNBQU0sZ0NBQWdDO0FBQ3RDLFlBQU0sWUFBWSxNQUFNLE1BQU0sb0JBQW9CO0FBQUEsUUFDaEQsT0FBTztBQUFBLE1BQ1QsQ0FBQztBQUVELHlCQUFPLFFBQ0wsVUFBVSxVQUFVLENBQUMsRUFBRSxXQUFXO0FBQ2hDLGVBQU8sU0FBUyxlQUFlO0FBQUEsTUFDakMsQ0FBQyxHQUNELDRCQUNGO0FBRUEseUJBQU8sT0FDTCxVQUFVLFVBQVUsQ0FBQyxFQUFFLE1BQU0sYUFBYTtBQUN4QyxZQUFJLFNBQVMsZUFBZSxTQUFTO0FBQ25DLGlCQUFPO0FBQUEsUUFDVDtBQUVBLFlBQUksQ0FBQyxPQUFPLFNBQVMsV0FBVztBQUM5QixpQkFBTztBQUFBLFFBQ1Q7QUFDQSxlQUFPLE9BQU8sS0FBSyxTQUFTLEVBQUUsT0FBTyxPQUFPLFFBQVEsU0FBUztBQUFBLE1BQy9ELENBQUMsR0FDRCx3QkFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFFRCxLQUFHLHdDQUF3QyxZQUFZO0FBQ3JELFVBQU0sRUFBRSxVQUFVO0FBRWxCLCtCQUFNLDRCQUE0QjtBQUNsQztBQUNFLFlBQU0sUUFBUSxNQUFNLE1BQU0sbUJBQW1CLG1CQUFtQjtBQUVoRSxZQUFNLGFBQWEsTUFBTSxXQUFXLENBQUMsRUFBRSxXQUFXO0FBQ2hELGVBQU8sU0FBUyxlQUFlO0FBQUEsTUFDakMsQ0FBQztBQUNELFVBQUksZUFBZSxRQUFXO0FBQzVCLGNBQU0sSUFBSSxNQUFNLG9DQUFvQztBQUFBLE1BQ3REO0FBRUEsWUFBTSxlQUFlLE1BQU0sTUFBTSxnQkFDL0IsTUFBTSxVQUFVO0FBQUEsUUFDZCxNQUFNLGVBQWU7QUFBQSxRQUNyQixRQUFRLFdBQVc7QUFBQSxNQUNyQixDQUFDLENBQ0g7QUFFQSxpQ0FBTSx1QkFBdUI7QUFDN0IsWUFBTSxNQUFNLGlCQUFpQjtBQUFBLFFBQzNCLFdBQVcsVUFBVSxhQUFhO0FBQUEsTUFDcEMsQ0FBQztBQUVELGlDQUFNLGdDQUFnQztBQUN0QyxZQUFNLFlBQVksTUFBTSxNQUFNLG9CQUFvQjtBQUFBLFFBQ2hELE9BQU87QUFBQSxNQUNULENBQUM7QUFFRCx5QkFBTyxRQUNMLFVBQVUsVUFBVSxDQUFDLEVBQUUsTUFBTSxVQUFVO0FBQ3JDLGVBQU8sU0FBUyxlQUFlLFdBQVcsSUFBSSxPQUFPLFdBQVcsR0FBRztBQUFBLE1BQ3JFLENBQUMsR0FDRCxvQ0FDRjtBQUVBLHlCQUFPLE9BQ0wsVUFBVSxVQUFVLENBQUMsRUFBRSxXQUFXO0FBQ2hDLGVBQU8sU0FBUyxlQUFlO0FBQUEsTUFDakMsQ0FBQyxHQUNELGdDQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
