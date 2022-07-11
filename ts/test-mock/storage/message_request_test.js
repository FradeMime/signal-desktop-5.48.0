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
var durations = __toESM(require("../../util/durations"));
var import_fixtures = require("./fixtures");
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
  it("should handle message request state changes", async () => {
    const { phone, desktop, server } = bootstrap;
    const initialState = await phone.expectStorageState("initial state");
    (0, import_fixtures.debug)("Creating stranger");
    const stranger = await server.createPrimaryDevice({
      profileName: "Mysterious Stranger"
    });
    const ourKey = await desktop.popSingleUseKey();
    await stranger.addSingleUseKey(desktop, ourKey);
    (0, import_fixtures.debug)("Sending a message from a stranger");
    await stranger.sendText(desktop, "Hello!", {
      withProfileKey: true,
      timestamp: bootstrap.getTimestamp()
    });
    const window = await app.getWindow();
    const leftPane = window.locator(".left-pane-wrapper");
    const conversationStack = window.locator(".conversation-stack");
    (0, import_fixtures.debug)("Opening conversation with a stranger");
    await leftPane.locator(`_react=ConversationListItem[title = ${JSON.stringify(stranger.profileName)}]`).click();
    (0, import_fixtures.debug)("Verify that we stored stranger's profile key");
    const postMessageState = await phone.waitForStorageState({
      after: initialState
    });
    {
      import_chai.assert.strictEqual(postMessageState.version, 2);
      import_chai.assert.isFalse(postMessageState.getContact(stranger)?.whitelisted);
      import_chai.assert.strictEqual(postMessageState.getContact(stranger)?.profileKey?.length, 32);
      const { added, removed } = postMessageState.diff(initialState);
      import_chai.assert.strictEqual(added.length, 1, "only one record must be added");
      import_chai.assert.strictEqual(removed.length, 0, "no records should be removed");
    }
    (0, import_fixtures.debug)("Accept conversation from a stranger");
    await conversationStack.locator('.module-message-request-actions button >> "Accept"').click();
    (0, import_fixtures.debug)("Verify that storage state was updated");
    {
      const nextState = await phone.waitForStorageState({
        after: postMessageState
      });
      import_chai.assert.strictEqual(nextState.version, 3);
      import_chai.assert.isTrue(nextState.getContact(stranger)?.whitelisted);
      const { added, removed } = nextState.diff(postMessageState);
      import_chai.assert.strictEqual(added.length, 1, "only one record must be added");
      import_chai.assert.strictEqual(removed.length, 1, "only one record should be removed");
    }
    {
      const { body, source, dataMessage } = await stranger.waitForMessage();
      import_chai.assert.strictEqual(body, "", "profile key message has no body");
      import_chai.assert.strictEqual(source, desktop, "profile key message has valid source");
      import_chai.assert.isTrue(phone.profileKey.serialize().equals(dataMessage.profileKey ?? new Uint8Array(0)), "profile key message has correct profile key");
    }
    (0, import_fixtures.debug)("Enter message text");
    const composeArea = window.locator(".composition-area-wrapper, .ConversationView__template .react-wrapper");
    const input = composeArea.locator("_react=CompositionInput");
    await input.type("hello stranger!");
    await input.press("Enter");
    {
      const { body, source } = await stranger.waitForMessage();
      import_chai.assert.strictEqual(body, "hello stranger!", "text message has body");
      import_chai.assert.strictEqual(source, desktop, "text message has valid source");
    }
    (0, import_fixtures.debug)("Verifying the final manifest version");
    const finalState = await phone.expectStorageState("consistency check");
    import_chai.assert.strictEqual(finalState.version, 3);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWVzc2FnZV9yZXF1ZXN0X3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCAqIGFzIGR1cmF0aW9ucyBmcm9tICcuLi8uLi91dGlsL2R1cmF0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IEFwcCwgQm9vdHN0cmFwIH0gZnJvbSAnLi9maXh0dXJlcyc7XG5pbXBvcnQgeyBpbml0U3RvcmFnZSwgZGVidWcgfSBmcm9tICcuL2ZpeHR1cmVzJztcblxuZGVzY3JpYmUoJ3N0b3JhZ2Ugc2VydmljZScsIGZ1bmN0aW9uIG5lZWRzTmFtZSgpIHtcbiAgdGhpcy50aW1lb3V0KGR1cmF0aW9ucy5NSU5VVEUpO1xuXG4gIGxldCBib290c3RyYXA6IEJvb3RzdHJhcDtcbiAgbGV0IGFwcDogQXBwO1xuXG4gIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgICh7IGJvb3RzdHJhcCwgYXBwIH0gPSBhd2FpdCBpbml0U3RvcmFnZSgpKTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBhcHAuY2xvc2UoKTtcbiAgICBhd2FpdCBib290c3RyYXAudGVhcmRvd24oKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBoYW5kbGUgbWVzc2FnZSByZXF1ZXN0IHN0YXRlIGNoYW5nZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgeyBwaG9uZSwgZGVza3RvcCwgc2VydmVyIH0gPSBib290c3RyYXA7XG5cbiAgICBjb25zdCBpbml0aWFsU3RhdGUgPSBhd2FpdCBwaG9uZS5leHBlY3RTdG9yYWdlU3RhdGUoJ2luaXRpYWwgc3RhdGUnKTtcblxuICAgIGRlYnVnKCdDcmVhdGluZyBzdHJhbmdlcicpO1xuICAgIGNvbnN0IHN0cmFuZ2VyID0gYXdhaXQgc2VydmVyLmNyZWF0ZVByaW1hcnlEZXZpY2Uoe1xuICAgICAgcHJvZmlsZU5hbWU6ICdNeXN0ZXJpb3VzIFN0cmFuZ2VyJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IG91cktleSA9IGF3YWl0IGRlc2t0b3AucG9wU2luZ2xlVXNlS2V5KCk7XG4gICAgYXdhaXQgc3RyYW5nZXIuYWRkU2luZ2xlVXNlS2V5KGRlc2t0b3AsIG91cktleSk7XG5cbiAgICBkZWJ1ZygnU2VuZGluZyBhIG1lc3NhZ2UgZnJvbSBhIHN0cmFuZ2VyJyk7XG4gICAgYXdhaXQgc3RyYW5nZXIuc2VuZFRleHQoZGVza3RvcCwgJ0hlbGxvIScsIHtcbiAgICAgIHdpdGhQcm9maWxlS2V5OiB0cnVlLFxuICAgICAgdGltZXN0YW1wOiBib290c3RyYXAuZ2V0VGltZXN0YW1wKCksXG4gICAgfSk7XG5cbiAgICBjb25zdCB3aW5kb3cgPSBhd2FpdCBhcHAuZ2V0V2luZG93KCk7XG5cbiAgICBjb25zdCBsZWZ0UGFuZSA9IHdpbmRvdy5sb2NhdG9yKCcubGVmdC1wYW5lLXdyYXBwZXInKTtcbiAgICBjb25zdCBjb252ZXJzYXRpb25TdGFjayA9IHdpbmRvdy5sb2NhdG9yKCcuY29udmVyc2F0aW9uLXN0YWNrJyk7XG5cbiAgICBkZWJ1ZygnT3BlbmluZyBjb252ZXJzYXRpb24gd2l0aCBhIHN0cmFuZ2VyJyk7XG4gICAgYXdhaXQgbGVmdFBhbmVcbiAgICAgIC5sb2NhdG9yKFxuICAgICAgICAnX3JlYWN0PUNvbnZlcnNhdGlvbkxpc3RJdGVtJyArXG4gICAgICAgICAgYFt0aXRsZSA9ICR7SlNPTi5zdHJpbmdpZnkoc3RyYW5nZXIucHJvZmlsZU5hbWUpfV1gXG4gICAgICApXG4gICAgICAuY2xpY2soKTtcblxuICAgIGRlYnVnKFwiVmVyaWZ5IHRoYXQgd2Ugc3RvcmVkIHN0cmFuZ2VyJ3MgcHJvZmlsZSBrZXlcIik7XG4gICAgY29uc3QgcG9zdE1lc3NhZ2VTdGF0ZSA9IGF3YWl0IHBob25lLndhaXRGb3JTdG9yYWdlU3RhdGUoe1xuICAgICAgYWZ0ZXI6IGluaXRpYWxTdGF0ZSxcbiAgICB9KTtcbiAgICB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocG9zdE1lc3NhZ2VTdGF0ZS52ZXJzaW9uLCAyKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKHBvc3RNZXNzYWdlU3RhdGUuZ2V0Q29udGFjdChzdHJhbmdlcik/LndoaXRlbGlzdGVkKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgcG9zdE1lc3NhZ2VTdGF0ZS5nZXRDb250YWN0KHN0cmFuZ2VyKT8ucHJvZmlsZUtleT8ubGVuZ3RoLFxuICAgICAgICAzMlxuICAgICAgKTtcblxuICAgICAgLy8gQ29udGFjdFJlY29yZFxuICAgICAgY29uc3QgeyBhZGRlZCwgcmVtb3ZlZCB9ID0gcG9zdE1lc3NhZ2VTdGF0ZS5kaWZmKGluaXRpYWxTdGF0ZSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWRkZWQubGVuZ3RoLCAxLCAnb25seSBvbmUgcmVjb3JkIG11c3QgYmUgYWRkZWQnKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZW1vdmVkLmxlbmd0aCwgMCwgJ25vIHJlY29yZHMgc2hvdWxkIGJlIHJlbW92ZWQnKTtcbiAgICB9XG5cbiAgICBkZWJ1ZygnQWNjZXB0IGNvbnZlcnNhdGlvbiBmcm9tIGEgc3RyYW5nZXInKTtcbiAgICBhd2FpdCBjb252ZXJzYXRpb25TdGFja1xuICAgICAgLmxvY2F0b3IoJy5tb2R1bGUtbWVzc2FnZS1yZXF1ZXN0LWFjdGlvbnMgYnV0dG9uID4+IFwiQWNjZXB0XCInKVxuICAgICAgLmNsaWNrKCk7XG5cbiAgICBkZWJ1ZygnVmVyaWZ5IHRoYXQgc3RvcmFnZSBzdGF0ZSB3YXMgdXBkYXRlZCcpO1xuICAgIHtcbiAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IGF3YWl0IHBob25lLndhaXRGb3JTdG9yYWdlU3RhdGUoe1xuICAgICAgICBhZnRlcjogcG9zdE1lc3NhZ2VTdGF0ZSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG5leHRTdGF0ZS52ZXJzaW9uLCAzKTtcbiAgICAgIGFzc2VydC5pc1RydWUobmV4dFN0YXRlLmdldENvbnRhY3Qoc3RyYW5nZXIpPy53aGl0ZWxpc3RlZCk7XG5cbiAgICAgIC8vIENvbnRhY3RSZWNvcmRcbiAgICAgIGNvbnN0IHsgYWRkZWQsIHJlbW92ZWQgfSA9IG5leHRTdGF0ZS5kaWZmKHBvc3RNZXNzYWdlU3RhdGUpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGFkZGVkLmxlbmd0aCwgMSwgJ29ubHkgb25lIHJlY29yZCBtdXN0IGJlIGFkZGVkJyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIHJlbW92ZWQubGVuZ3RoLFxuICAgICAgICAxLFxuICAgICAgICAnb25seSBvbmUgcmVjb3JkIHNob3VsZCBiZSByZW1vdmVkJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBTdHJhbmdlciBzaG91bGQgcmVjZWl2ZSBvdXIgcHJvZmlsZSBrZXlcbiAgICB7XG4gICAgICBjb25zdCB7IGJvZHksIHNvdXJjZSwgZGF0YU1lc3NhZ2UgfSA9IGF3YWl0IHN0cmFuZ2VyLndhaXRGb3JNZXNzYWdlKCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYm9keSwgJycsICdwcm9maWxlIGtleSBtZXNzYWdlIGhhcyBubyBib2R5Jyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIHNvdXJjZSxcbiAgICAgICAgZGVza3RvcCxcbiAgICAgICAgJ3Byb2ZpbGUga2V5IG1lc3NhZ2UgaGFzIHZhbGlkIHNvdXJjZSdcbiAgICAgICk7XG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBwaG9uZS5wcm9maWxlS2V5XG4gICAgICAgICAgLnNlcmlhbGl6ZSgpXG4gICAgICAgICAgLmVxdWFscyhkYXRhTWVzc2FnZS5wcm9maWxlS2V5ID8/IG5ldyBVaW50OEFycmF5KDApKSxcbiAgICAgICAgJ3Byb2ZpbGUga2V5IG1lc3NhZ2UgaGFzIGNvcnJlY3QgcHJvZmlsZSBrZXknXG4gICAgICApO1xuICAgIH1cblxuICAgIGRlYnVnKCdFbnRlciBtZXNzYWdlIHRleHQnKTtcbiAgICBjb25zdCBjb21wb3NlQXJlYSA9IHdpbmRvdy5sb2NhdG9yKFxuICAgICAgJy5jb21wb3NpdGlvbi1hcmVhLXdyYXBwZXIsICcgK1xuICAgICAgICAnLkNvbnZlcnNhdGlvblZpZXdfX3RlbXBsYXRlIC5yZWFjdC13cmFwcGVyJ1xuICAgICk7XG4gICAgY29uc3QgaW5wdXQgPSBjb21wb3NlQXJlYS5sb2NhdG9yKCdfcmVhY3Q9Q29tcG9zaXRpb25JbnB1dCcpO1xuXG4gICAgYXdhaXQgaW5wdXQudHlwZSgnaGVsbG8gc3RyYW5nZXIhJyk7XG4gICAgYXdhaXQgaW5wdXQucHJlc3MoJ0VudGVyJyk7XG5cbiAgICB7XG4gICAgICBjb25zdCB7IGJvZHksIHNvdXJjZSB9ID0gYXdhaXQgc3RyYW5nZXIud2FpdEZvck1lc3NhZ2UoKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChib2R5LCAnaGVsbG8gc3RyYW5nZXIhJywgJ3RleHQgbWVzc2FnZSBoYXMgYm9keScpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNvdXJjZSwgZGVza3RvcCwgJ3RleHQgbWVzc2FnZSBoYXMgdmFsaWQgc291cmNlJyk7XG4gICAgfVxuXG4gICAgZGVidWcoJ1ZlcmlmeWluZyB0aGUgZmluYWwgbWFuaWZlc3QgdmVyc2lvbicpO1xuICAgIGNvbnN0IGZpbmFsU3RhdGUgPSBhd2FpdCBwaG9uZS5leHBlY3RTdG9yYWdlU3RhdGUoJ2NvbnNpc3RlbmN5IGNoZWNrJyk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGZpbmFsU3RhdGUudmVyc2lvbiwgMyk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBRXZCLGdCQUEyQjtBQUUzQixzQkFBbUM7QUFFbkMsU0FBUyxt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
