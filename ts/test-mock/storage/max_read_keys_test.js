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
var import_UUID = require("../../types/UUID");
var import_storageConstants = require("../../services/storageConstants");
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
  it("should receive all contacts despite low read keys limit", async () => {
    (0, import_fixtures.debug)("prepare for a slow test");
    const { phone, contacts } = bootstrap;
    const firstContact = contacts[0];
    const lastContact = contacts[contacts.length - 1];
    const window = await app.getWindow();
    const leftPane = window.locator(".left-pane-wrapper");
    (0, import_fixtures.debug)("wait for first contact to be pinned in the left pane");
    await leftPane.locator(`_react=ConversationListItem[isPinned = true] [title = ${JSON.stringify(firstContact.profileName)}]`).waitFor();
    {
      let state = await phone.expectStorageState("consistency check");
      (0, import_fixtures.debug)("generating a lot of fake contacts");
      for (let i = 0; i < import_storageConstants.MAX_READ_KEYS + 1; i += 1) {
        state = state.addRecord({
          type: IdentifierType.CONTACT,
          record: {
            contact: {
              serviceUuid: import_UUID.UUID.generate().toString()
            }
          }
        });
      }
      (0, import_fixtures.debug)("pinning last contact");
      state = state.pin(lastContact);
      await phone.setStorageState(state);
      (0, import_fixtures.debug)("sending fetch storage");
      await phone.sendFetchStorage({
        timestamp: bootstrap.getTimestamp()
      });
    }
    (0, import_fixtures.debug)("wait for last contact to be pinned in the left pane");
    await leftPane.locator(`_react=ConversationListItem[isPinned = true] [title = ${JSON.stringify(lastContact.profileName)}]`).waitFor({ timeout: durations.MINUTE });
    (0, import_fixtures.debug)("Verifying the final manifest version");
    const finalState = await phone.expectStorageState("consistency check");
    import_chai.assert.strictEqual(finalState.version, 2);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWF4X3JlYWRfa2V5c190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgUHJvdG8gfSBmcm9tICdAc2lnbmFsYXBwL21vY2stc2VydmVyJztcblxuaW1wb3J0ICogYXMgZHVyYXRpb25zIGZyb20gJy4uLy4uL3V0aWwvZHVyYXRpb25zJztcbmltcG9ydCB7IFVVSUQgfSBmcm9tICcuLi8uLi90eXBlcy9VVUlEJztcbmltcG9ydCB7IE1BWF9SRUFEX0tFWVMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9zdG9yYWdlQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgQXBwLCBCb290c3RyYXAgfSBmcm9tICcuL2ZpeHR1cmVzJztcbmltcG9ydCB7IGluaXRTdG9yYWdlLCBkZWJ1ZyB9IGZyb20gJy4vZml4dHVyZXMnO1xuXG5jb25zdCBJZGVudGlmaWVyVHlwZSA9IFByb3RvLk1hbmlmZXN0UmVjb3JkLklkZW50aWZpZXIuVHlwZTtcblxuZGVzY3JpYmUoJ3N0b3JhZ2Ugc2VydmljZScsIGZ1bmN0aW9uIG5lZWRzTmFtZSgpIHtcbiAgdGhpcy50aW1lb3V0KGR1cmF0aW9ucy5NSU5VVEUpO1xuXG4gIGxldCBib290c3RyYXA6IEJvb3RzdHJhcDtcbiAgbGV0IGFwcDogQXBwO1xuXG4gIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgICh7IGJvb3RzdHJhcCwgYXBwIH0gPSBhd2FpdCBpbml0U3RvcmFnZSgpKTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBhcHAuY2xvc2UoKTtcbiAgICBhd2FpdCBib290c3RyYXAudGVhcmRvd24oKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZWNlaXZlIGFsbCBjb250YWN0cyBkZXNwaXRlIGxvdyByZWFkIGtleXMgbGltaXQnLCBhc3luYyAoKSA9PiB7XG4gICAgZGVidWcoJ3ByZXBhcmUgZm9yIGEgc2xvdyB0ZXN0Jyk7XG5cbiAgICBjb25zdCB7IHBob25lLCBjb250YWN0cyB9ID0gYm9vdHN0cmFwO1xuICAgIGNvbnN0IGZpcnN0Q29udGFjdCA9IGNvbnRhY3RzWzBdO1xuICAgIGNvbnN0IGxhc3RDb250YWN0ID0gY29udGFjdHNbY29udGFjdHMubGVuZ3RoIC0gMV07XG5cbiAgICBjb25zdCB3aW5kb3cgPSBhd2FpdCBhcHAuZ2V0V2luZG93KCk7XG5cbiAgICBjb25zdCBsZWZ0UGFuZSA9IHdpbmRvdy5sb2NhdG9yKCcubGVmdC1wYW5lLXdyYXBwZXInKTtcblxuICAgIGRlYnVnKCd3YWl0IGZvciBmaXJzdCBjb250YWN0IHRvIGJlIHBpbm5lZCBpbiB0aGUgbGVmdCBwYW5lJyk7XG4gICAgYXdhaXQgbGVmdFBhbmVcbiAgICAgIC5sb2NhdG9yKFxuICAgICAgICAnX3JlYWN0PUNvbnZlcnNhdGlvbkxpc3RJdGVtJyArXG4gICAgICAgICAgJ1tpc1Bpbm5lZCA9IHRydWVdICcgK1xuICAgICAgICAgIGBbdGl0bGUgPSAke0pTT04uc3RyaW5naWZ5KGZpcnN0Q29udGFjdC5wcm9maWxlTmFtZSl9XWBcbiAgICAgIClcbiAgICAgIC53YWl0Rm9yKCk7XG5cbiAgICB7XG4gICAgICBsZXQgc3RhdGUgPSBhd2FpdCBwaG9uZS5leHBlY3RTdG9yYWdlU3RhdGUoJ2NvbnNpc3RlbmN5IGNoZWNrJyk7XG5cbiAgICAgIGRlYnVnKCdnZW5lcmF0aW5nIGEgbG90IG9mIGZha2UgY29udGFjdHMnKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTUFYX1JFQURfS0VZUyArIDE7IGkgKz0gMSkge1xuICAgICAgICBzdGF0ZSA9IHN0YXRlLmFkZFJlY29yZCh7XG4gICAgICAgICAgdHlwZTogSWRlbnRpZmllclR5cGUuQ09OVEFDVCxcbiAgICAgICAgICByZWNvcmQ6IHtcbiAgICAgICAgICAgIGNvbnRhY3Q6IHtcbiAgICAgICAgICAgICAgc2VydmljZVV1aWQ6IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZGVidWcoJ3Bpbm5pbmcgbGFzdCBjb250YWN0Jyk7XG4gICAgICBzdGF0ZSA9IHN0YXRlLnBpbihsYXN0Q29udGFjdCk7XG5cbiAgICAgIGF3YWl0IHBob25lLnNldFN0b3JhZ2VTdGF0ZShzdGF0ZSk7XG5cbiAgICAgIGRlYnVnKCdzZW5kaW5nIGZldGNoIHN0b3JhZ2UnKTtcbiAgICAgIGF3YWl0IHBob25lLnNlbmRGZXRjaFN0b3JhZ2Uoe1xuICAgICAgICB0aW1lc3RhbXA6IGJvb3RzdHJhcC5nZXRUaW1lc3RhbXAoKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGRlYnVnKCd3YWl0IGZvciBsYXN0IGNvbnRhY3QgdG8gYmUgcGlubmVkIGluIHRoZSBsZWZ0IHBhbmUnKTtcbiAgICBhd2FpdCBsZWZ0UGFuZVxuICAgICAgLmxvY2F0b3IoXG4gICAgICAgICdfcmVhY3Q9Q29udmVyc2F0aW9uTGlzdEl0ZW0nICtcbiAgICAgICAgICAnW2lzUGlubmVkID0gdHJ1ZV0gJyArXG4gICAgICAgICAgYFt0aXRsZSA9ICR7SlNPTi5zdHJpbmdpZnkobGFzdENvbnRhY3QucHJvZmlsZU5hbWUpfV1gXG4gICAgICApXG4gICAgICAud2FpdEZvcih7IHRpbWVvdXQ6IGR1cmF0aW9ucy5NSU5VVEUgfSk7XG5cbiAgICBkZWJ1ZygnVmVyaWZ5aW5nIHRoZSBmaW5hbCBtYW5pZmVzdCB2ZXJzaW9uJyk7XG4gICAgY29uc3QgZmluYWxTdGF0ZSA9IGF3YWl0IHBob25lLmV4cGVjdFN0b3JhZ2VTdGF0ZSgnY29uc2lzdGVuY3kgY2hlY2snKTtcblxuICAgIGFzc2VydC5zdHJpY3RFcXVhbChmaW5hbFN0YXRlLnZlcnNpb24sIDIpO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUN2Qix5QkFBc0I7QUFFdEIsZ0JBQTJCO0FBQzNCLGtCQUFxQjtBQUNyQiw4QkFBOEI7QUFFOUIsc0JBQW1DO0FBRW5DLE1BQU0saUJBQWlCLHlCQUFNLGVBQWUsV0FBVztBQUV2RCxTQUFTLG1CQUFtQixxQkFBcUI7QUFDL0MsT0FBSyxRQUFRLFVBQVUsTUFBTTtBQUU3QixNQUFJO0FBQ0osTUFBSTtBQUVKLGFBQVcsWUFBWTtBQUNyQixJQUFDLEdBQUUsV0FBVyxJQUFJLElBQUksTUFBTSxpQ0FBWTtBQUFBLEVBQzFDLENBQUM7QUFFRCxZQUFVLFlBQVk7QUFDcEIsVUFBTSxJQUFJLE1BQU07QUFDaEIsVUFBTSxVQUFVLFNBQVM7QUFBQSxFQUMzQixDQUFDO0FBRUQsS0FBRywyREFBMkQsWUFBWTtBQUN4RSwrQkFBTSx5QkFBeUI7QUFFL0IsVUFBTSxFQUFFLE9BQU8sYUFBYTtBQUM1QixVQUFNLGVBQWUsU0FBUztBQUM5QixVQUFNLGNBQWMsU0FBUyxTQUFTLFNBQVM7QUFFL0MsVUFBTSxTQUFTLE1BQU0sSUFBSSxVQUFVO0FBRW5DLFVBQU0sV0FBVyxPQUFPLFFBQVEsb0JBQW9CO0FBRXBELCtCQUFNLHNEQUFzRDtBQUM1RCxVQUFNLFNBQ0gsUUFDQyx5REFFYyxLQUFLLFVBQVUsYUFBYSxXQUFXLElBQ3ZELEVBQ0MsUUFBUTtBQUVYO0FBQ0UsVUFBSSxRQUFRLE1BQU0sTUFBTSxtQkFBbUIsbUJBQW1CO0FBRTlELGlDQUFNLG1DQUFtQztBQUN6QyxlQUFTLElBQUksR0FBRyxJQUFJLHdDQUFnQixHQUFHLEtBQUssR0FBRztBQUM3QyxnQkFBUSxNQUFNLFVBQVU7QUFBQSxVQUN0QixNQUFNLGVBQWU7QUFBQSxVQUNyQixRQUFRO0FBQUEsWUFDTixTQUFTO0FBQUEsY0FDUCxhQUFhLGlCQUFLLFNBQVMsRUFBRSxTQUFTO0FBQUEsWUFDeEM7QUFBQSxVQUNGO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUVBLGlDQUFNLHNCQUFzQjtBQUM1QixjQUFRLE1BQU0sSUFBSSxXQUFXO0FBRTdCLFlBQU0sTUFBTSxnQkFBZ0IsS0FBSztBQUVqQyxpQ0FBTSx1QkFBdUI7QUFDN0IsWUFBTSxNQUFNLGlCQUFpQjtBQUFBLFFBQzNCLFdBQVcsVUFBVSxhQUFhO0FBQUEsTUFDcEMsQ0FBQztBQUFBLElBQ0g7QUFFQSwrQkFBTSxxREFBcUQ7QUFDM0QsVUFBTSxTQUNILFFBQ0MseURBRWMsS0FBSyxVQUFVLFlBQVksV0FBVyxJQUN0RCxFQUNDLFFBQVEsRUFBRSxTQUFTLFVBQVUsT0FBTyxDQUFDO0FBRXhDLCtCQUFNLHNDQUFzQztBQUM1QyxVQUFNLGFBQWEsTUFBTSxNQUFNLG1CQUFtQixtQkFBbUI7QUFFckUsdUJBQU8sWUFBWSxXQUFXLFNBQVMsQ0FBQztBQUFBLEVBQzFDLENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
