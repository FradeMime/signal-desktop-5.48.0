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
  let group;
  beforeEach(async () => {
    ({ bootstrap, app, group } = await (0, import_fixtures.initStorage)());
  });
  afterEach(async () => {
    await app.close();
    await bootstrap.teardown();
  });
  it("should pin/unpin groups", async () => {
    const { phone, desktop, contacts } = bootstrap;
    const window = await app.getWindow();
    const leftPane = window.locator(".left-pane-wrapper");
    const conversationStack = window.locator(".conversation-stack");
    (0, import_fixtures.debug)("Verifying that the group is pinned on startup");
    await leftPane.locator(`_react=ConversationListItem[isPinned = true] [title = ${JSON.stringify(group.title)}]`).waitFor();
    (0, import_fixtures.debug)("Unpinning group via storage service");
    {
      const state = await phone.expectStorageState("initial state");
      await phone.setStorageState(state.unpinGroup(group));
      await phone.sendFetchStorage({
        timestamp: bootstrap.getTimestamp()
      });
      await leftPane.locator(`_react=ConversationListItem[isPinned = false] [title = ${JSON.stringify(group.title)}]`).waitFor();
    }
    (0, import_fixtures.debug)("Pinning group in the app");
    {
      const state = await phone.expectStorageState("consistency check");
      const convo = leftPane.locator(`_react=ConversationListItem[isPinned = false] [title = ${JSON.stringify(group.title)}]`);
      await convo.click();
      const moreButton = conversationStack.locator("button.module-ConversationHeader__button--more");
      await moreButton.click();
      const pinButton = conversationStack.locator('.react-contextmenu-item >> "Pin Conversation"');
      await pinButton.click();
      const newState = await phone.waitForStorageState({
        after: state
      });
      import_chai.assert.isTrue(await newState.isGroupPinned(group), "group not pinned");
      const { added, removed } = newState.diff(state);
      import_chai.assert.strictEqual(added.length, 1, "only one record must be added");
      import_chai.assert.strictEqual(removed.length, 1, "only one record must be removed");
    }
    (0, import_fixtures.debug)("Pinning > 4 conversations");
    {
      const toPin = contacts.slice(1, 4);
      for (const [i, contact] of toPin.entries()) {
        const isLast = i === toPin.length - 1;
        (0, import_fixtures.debug)("sending a message to contact=%d", i);
        await contact.sendText(desktop, "Hello!", {
          timestamp: bootstrap.getTimestamp()
        });
        const state = await phone.expectStorageState("consistency check");
        (0, import_fixtures.debug)("pinning contact=%d", i);
        const convo = leftPane.locator(`_react=ConversationListItem[title = ${JSON.stringify(contact.profileName)}]`);
        await convo.click();
        const moreButton = conversationStack.locator("button.module-ConversationHeader__button--more");
        await moreButton.click();
        const pinButton = conversationStack.locator('.react-contextmenu-item >> "Pin Conversation"');
        await pinButton.click();
        if (isLast) {
          await window.locator('.Toast >> "You can only pin up to 4 chats"').waitFor();
          break;
        }
        (0, import_fixtures.debug)("verifying storage state change contact=%d", i);
        const newState = await phone.waitForStorageState({
          after: state
        });
        import_chai.assert.isTrue(await newState.isPinned(contact), "contact not pinned");
        const { added, removed } = newState.diff(state);
        import_chai.assert.strictEqual(added.length, 1, "only one record must be added");
        import_chai.assert.strictEqual(removed.length, 1, "only one record must be removed");
      }
    }
    (0, import_fixtures.debug)("Verifying the final manifest version");
    const finalState = await phone.expectStorageState("consistency check");
    import_chai.assert.strictEqual(finalState.version, 5);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGluX3VucGluX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcbi8qIGVzbGludC1kaXNhYmxlIG5vLWF3YWl0LWluLWxvb3AgKi9cblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB0eXBlIHsgR3JvdXAgfSBmcm9tICdAc2lnbmFsYXBwL21vY2stc2VydmVyJztcblxuaW1wb3J0ICogYXMgZHVyYXRpb25zIGZyb20gJy4uLy4uL3V0aWwvZHVyYXRpb25zJztcbmltcG9ydCB0eXBlIHsgQXBwLCBCb290c3RyYXAgfSBmcm9tICcuL2ZpeHR1cmVzJztcbmltcG9ydCB7IGluaXRTdG9yYWdlLCBkZWJ1ZyB9IGZyb20gJy4vZml4dHVyZXMnO1xuXG5kZXNjcmliZSgnc3RvcmFnZSBzZXJ2aWNlJywgZnVuY3Rpb24gbmVlZHNOYW1lKCkge1xuICB0aGlzLnRpbWVvdXQoZHVyYXRpb25zLk1JTlVURSk7XG5cbiAgbGV0IGJvb3RzdHJhcDogQm9vdHN0cmFwO1xuICBsZXQgYXBwOiBBcHA7XG4gIGxldCBncm91cDogR3JvdXA7XG5cbiAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgKHsgYm9vdHN0cmFwLCBhcHAsIGdyb3VwIH0gPSBhd2FpdCBpbml0U3RvcmFnZSgpKTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBhcHAuY2xvc2UoKTtcbiAgICBhd2FpdCBib290c3RyYXAudGVhcmRvd24oKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBwaW4vdW5waW4gZ3JvdXBzJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHsgcGhvbmUsIGRlc2t0b3AsIGNvbnRhY3RzIH0gPSBib290c3RyYXA7XG5cbiAgICBjb25zdCB3aW5kb3cgPSBhd2FpdCBhcHAuZ2V0V2luZG93KCk7XG5cbiAgICBjb25zdCBsZWZ0UGFuZSA9IHdpbmRvdy5sb2NhdG9yKCcubGVmdC1wYW5lLXdyYXBwZXInKTtcbiAgICBjb25zdCBjb252ZXJzYXRpb25TdGFjayA9IHdpbmRvdy5sb2NhdG9yKCcuY29udmVyc2F0aW9uLXN0YWNrJyk7XG5cbiAgICBkZWJ1ZygnVmVyaWZ5aW5nIHRoYXQgdGhlIGdyb3VwIGlzIHBpbm5lZCBvbiBzdGFydHVwJyk7XG4gICAgYXdhaXQgbGVmdFBhbmVcbiAgICAgIC5sb2NhdG9yKFxuICAgICAgICAnX3JlYWN0PUNvbnZlcnNhdGlvbkxpc3RJdGVtJyArXG4gICAgICAgICAgJ1tpc1Bpbm5lZCA9IHRydWVdICcgK1xuICAgICAgICAgIGBbdGl0bGUgPSAke0pTT04uc3RyaW5naWZ5KGdyb3VwLnRpdGxlKX1dYFxuICAgICAgKVxuICAgICAgLndhaXRGb3IoKTtcblxuICAgIGRlYnVnKCdVbnBpbm5pbmcgZ3JvdXAgdmlhIHN0b3JhZ2Ugc2VydmljZScpO1xuICAgIHtcbiAgICAgIGNvbnN0IHN0YXRlID0gYXdhaXQgcGhvbmUuZXhwZWN0U3RvcmFnZVN0YXRlKCdpbml0aWFsIHN0YXRlJyk7XG5cbiAgICAgIGF3YWl0IHBob25lLnNldFN0b3JhZ2VTdGF0ZShzdGF0ZS51bnBpbkdyb3VwKGdyb3VwKSk7XG4gICAgICBhd2FpdCBwaG9uZS5zZW5kRmV0Y2hTdG9yYWdlKHtcbiAgICAgICAgdGltZXN0YW1wOiBib290c3RyYXAuZ2V0VGltZXN0YW1wKCksXG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgbGVmdFBhbmVcbiAgICAgICAgLmxvY2F0b3IoXG4gICAgICAgICAgJ19yZWFjdD1Db252ZXJzYXRpb25MaXN0SXRlbScgK1xuICAgICAgICAgICAgJ1tpc1Bpbm5lZCA9IGZhbHNlXSAnICtcbiAgICAgICAgICAgIGBbdGl0bGUgPSAke0pTT04uc3RyaW5naWZ5KGdyb3VwLnRpdGxlKX1dYFxuICAgICAgICApXG4gICAgICAgIC53YWl0Rm9yKCk7XG4gICAgfVxuXG4gICAgZGVidWcoJ1Bpbm5pbmcgZ3JvdXAgaW4gdGhlIGFwcCcpO1xuICAgIHtcbiAgICAgIGNvbnN0IHN0YXRlID0gYXdhaXQgcGhvbmUuZXhwZWN0U3RvcmFnZVN0YXRlKCdjb25zaXN0ZW5jeSBjaGVjaycpO1xuXG4gICAgICBjb25zdCBjb252byA9IGxlZnRQYW5lLmxvY2F0b3IoXG4gICAgICAgICdfcmVhY3Q9Q29udmVyc2F0aW9uTGlzdEl0ZW0nICtcbiAgICAgICAgICAnW2lzUGlubmVkID0gZmFsc2VdICcgK1xuICAgICAgICAgIGBbdGl0bGUgPSAke0pTT04uc3RyaW5naWZ5KGdyb3VwLnRpdGxlKX1dYFxuICAgICAgKTtcbiAgICAgIGF3YWl0IGNvbnZvLmNsaWNrKCk7XG5cbiAgICAgIGNvbnN0IG1vcmVCdXR0b24gPSBjb252ZXJzYXRpb25TdGFjay5sb2NhdG9yKFxuICAgICAgICAnYnV0dG9uLm1vZHVsZS1Db252ZXJzYXRpb25IZWFkZXJfX2J1dHRvbi0tbW9yZSdcbiAgICAgICk7XG4gICAgICBhd2FpdCBtb3JlQnV0dG9uLmNsaWNrKCk7XG5cbiAgICAgIGNvbnN0IHBpbkJ1dHRvbiA9IGNvbnZlcnNhdGlvblN0YWNrLmxvY2F0b3IoXG4gICAgICAgICcucmVhY3QtY29udGV4dG1lbnUtaXRlbSA+PiBcIlBpbiBDb252ZXJzYXRpb25cIidcbiAgICAgICk7XG4gICAgICBhd2FpdCBwaW5CdXR0b24uY2xpY2soKTtcblxuICAgICAgY29uc3QgbmV3U3RhdGUgPSBhd2FpdCBwaG9uZS53YWl0Rm9yU3RvcmFnZVN0YXRlKHtcbiAgICAgICAgYWZ0ZXI6IHN0YXRlLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKGF3YWl0IG5ld1N0YXRlLmlzR3JvdXBQaW5uZWQoZ3JvdXApLCAnZ3JvdXAgbm90IHBpbm5lZCcpO1xuXG4gICAgICAvLyBBY2NvdW50UmVjb3JkXG4gICAgICBjb25zdCB7IGFkZGVkLCByZW1vdmVkIH0gPSBuZXdTdGF0ZS5kaWZmKHN0YXRlKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhZGRlZC5sZW5ndGgsIDEsICdvbmx5IG9uZSByZWNvcmQgbXVzdCBiZSBhZGRlZCcpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlbW92ZWQubGVuZ3RoLCAxLCAnb25seSBvbmUgcmVjb3JkIG11c3QgYmUgcmVtb3ZlZCcpO1xuICAgIH1cblxuICAgIGRlYnVnKCdQaW5uaW5nID4gNCBjb252ZXJzYXRpb25zJyk7XG4gICAge1xuICAgICAgLy8gV2UgYWxyZWFkeSBoYXZlIG9uZSBncm91cCBhbmQgZmlyc3QgY29udGFjdCBwaW5uZWQgc28gd2UgbmVlZCB0aHJlZVxuICAgICAgLy8gbW9yZS5cbiAgICAgIGNvbnN0IHRvUGluID0gY29udGFjdHMuc2xpY2UoMSwgNCk7XG5cbiAgICAgIC8vIFRvIGRvIHRoYXQgd2UgbmVlZCB0aGVtIHRvIGFwcGVhciBpbiB0aGUgbGVmdCBwYW5lLCB0aG91Z2guXG4gICAgICBmb3IgKGNvbnN0IFtpLCBjb250YWN0XSBvZiB0b1Bpbi5lbnRyaWVzKCkpIHtcbiAgICAgICAgY29uc3QgaXNMYXN0ID0gaSA9PT0gdG9QaW4ubGVuZ3RoIC0gMTtcblxuICAgICAgICBkZWJ1Zygnc2VuZGluZyBhIG1lc3NhZ2UgdG8gY29udGFjdD0lZCcsIGkpO1xuICAgICAgICBhd2FpdCBjb250YWN0LnNlbmRUZXh0KGRlc2t0b3AsICdIZWxsbyEnLCB7XG4gICAgICAgICAgdGltZXN0YW1wOiBib290c3RyYXAuZ2V0VGltZXN0YW1wKCksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHN0YXRlID0gYXdhaXQgcGhvbmUuZXhwZWN0U3RvcmFnZVN0YXRlKCdjb25zaXN0ZW5jeSBjaGVjaycpO1xuXG4gICAgICAgIGRlYnVnKCdwaW5uaW5nIGNvbnRhY3Q9JWQnLCBpKTtcbiAgICAgICAgY29uc3QgY29udm8gPSBsZWZ0UGFuZS5sb2NhdG9yKFxuICAgICAgICAgICdfcmVhY3Q9Q29udmVyc2F0aW9uTGlzdEl0ZW0nICtcbiAgICAgICAgICAgIGBbdGl0bGUgPSAke0pTT04uc3RyaW5naWZ5KGNvbnRhY3QucHJvZmlsZU5hbWUpfV1gXG4gICAgICAgICk7XG4gICAgICAgIGF3YWl0IGNvbnZvLmNsaWNrKCk7XG5cbiAgICAgICAgY29uc3QgbW9yZUJ1dHRvbiA9IGNvbnZlcnNhdGlvblN0YWNrLmxvY2F0b3IoXG4gICAgICAgICAgJ2J1dHRvbi5tb2R1bGUtQ29udmVyc2F0aW9uSGVhZGVyX19idXR0b24tLW1vcmUnXG4gICAgICAgICk7XG4gICAgICAgIGF3YWl0IG1vcmVCdXR0b24uY2xpY2soKTtcblxuICAgICAgICBjb25zdCBwaW5CdXR0b24gPSBjb252ZXJzYXRpb25TdGFjay5sb2NhdG9yKFxuICAgICAgICAgICcucmVhY3QtY29udGV4dG1lbnUtaXRlbSA+PiBcIlBpbiBDb252ZXJzYXRpb25cIidcbiAgICAgICAgKTtcbiAgICAgICAgYXdhaXQgcGluQnV0dG9uLmNsaWNrKCk7XG5cbiAgICAgICAgaWYgKGlzTGFzdCkge1xuICAgICAgICAgIC8vIFN0b3JhZ2Ugc3RhdGUgc2hvdWxkbid0IGJlIHVwZGF0ZWQgYmVjYXVzZSB3ZSBmYWlsZWQgdG8gcGluXG4gICAgICAgICAgYXdhaXQgd2luZG93XG4gICAgICAgICAgICAubG9jYXRvcignLlRvYXN0ID4+IFwiWW91IGNhbiBvbmx5IHBpbiB1cCB0byA0IGNoYXRzXCInKVxuICAgICAgICAgICAgLndhaXRGb3IoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGRlYnVnKCd2ZXJpZnlpbmcgc3RvcmFnZSBzdGF0ZSBjaGFuZ2UgY29udGFjdD0lZCcsIGkpO1xuICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IGF3YWl0IHBob25lLndhaXRGb3JTdG9yYWdlU3RhdGUoe1xuICAgICAgICAgIGFmdGVyOiBzdGF0ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGFzc2VydC5pc1RydWUoYXdhaXQgbmV3U3RhdGUuaXNQaW5uZWQoY29udGFjdCksICdjb250YWN0IG5vdCBwaW5uZWQnKTtcblxuICAgICAgICAvLyBBY2NvdW50UmVjb3JkXG4gICAgICAgIGNvbnN0IHsgYWRkZWQsIHJlbW92ZWQgfSA9IG5ld1N0YXRlLmRpZmYoc3RhdGUpO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWRkZWQubGVuZ3RoLCAxLCAnb25seSBvbmUgcmVjb3JkIG11c3QgYmUgYWRkZWQnKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIHJlbW92ZWQubGVuZ3RoLFxuICAgICAgICAgIDEsXG4gICAgICAgICAgJ29ubHkgb25lIHJlY29yZCBtdXN0IGJlIHJlbW92ZWQnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGVidWcoJ1ZlcmlmeWluZyB0aGUgZmluYWwgbWFuaWZlc3QgdmVyc2lvbicpO1xuICAgIGNvbnN0IGZpbmFsU3RhdGUgPSBhd2FpdCBwaG9uZS5leHBlY3RTdG9yYWdlU3RhdGUoJ2NvbnNpc3RlbmN5IGNoZWNrJyk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZmluYWxTdGF0ZS52ZXJzaW9uLCA1KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxrQkFBdUI7QUFJdkIsZ0JBQTJCO0FBRTNCLHNCQUFtQztBQUVuQyxTQUFTLG1CQUFtQixxQkFBcUI7QUFDL0MsT0FBSyxRQUFRLFVBQVUsTUFBTTtBQUU3QixNQUFJO0FBQ0osTUFBSTtBQUNKLE1BQUk7QUFFSixhQUFXLFlBQVk7QUFDckIsSUFBQyxHQUFFLFdBQVcsS0FBSyxNQUFNLElBQUksTUFBTSxpQ0FBWTtBQUFBLEVBQ2pELENBQUM7QUFFRCxZQUFVLFlBQVk7QUFDcEIsVUFBTSxJQUFJLE1BQU07QUFDaEIsVUFBTSxVQUFVLFNBQVM7QUFBQSxFQUMzQixDQUFDO0FBRUQsS0FBRywyQkFBMkIsWUFBWTtBQUN4QyxVQUFNLEVBQUUsT0FB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
