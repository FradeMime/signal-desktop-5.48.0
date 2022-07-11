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
  it("should archive/unarchive contacts", async () => {
    const { phone, contacts } = bootstrap;
    const [firstContact] = contacts;
    const window = await app.getWindow();
    const leftPane = window.locator(".left-pane-wrapper");
    const conversationStack = window.locator(".conversation-stack");
    (0, import_fixtures.debug)("archiving contact");
    {
      const state = await phone.expectStorageState("consistency check");
      await phone.setStorageState(state.updateContact(firstContact, { archived: true }).unpin(firstContact));
      await phone.sendFetchStorage({
        timestamp: bootstrap.getTimestamp()
      });
      await leftPane.locator(`_react=ConversationListItem[title = ${JSON.stringify(firstContact.profileName)}]`).waitFor({ state: "hidden" });
      await leftPane.locator("button.module-conversation-list__item--archive-button").waitFor();
    }
    (0, import_fixtures.debug)("unarchiving pinned contact");
    {
      const state = await phone.expectStorageState("consistency check");
      await phone.setStorageState(state.updateContact(firstContact, { archived: false }).pin(firstContact));
      await phone.sendFetchStorage({
        timestamp: bootstrap.getTimestamp()
      });
      await leftPane.locator(`_react=ConversationListItem[isPinned = true][title = ${JSON.stringify(firstContact.profileName)}]`).waitFor();
      await leftPane.locator("button.module-conversation-list__item--archive-button").waitFor({ state: "hidden" });
    }
    (0, import_fixtures.debug)("archive pinned contact in the app");
    {
      const state = await phone.expectStorageState("consistency check");
      await leftPane.locator(`_react=ConversationListItem[title = ${JSON.stringify(firstContact.profileName)}]`).click();
      const moreButton = conversationStack.locator("button.module-ConversationHeader__button--more");
      await moreButton.click();
      const archiveButton = conversationStack.locator('.react-contextmenu-item >> "Archive"');
      await archiveButton.click();
      const newState = await phone.waitForStorageState({
        after: state
      });
      import_chai.assert.ok(!await newState.isPinned(firstContact), "contact not pinned");
      const record = await newState.getContact(firstContact);
      import_chai.assert.ok(record, "contact record not found");
      import_chai.assert.ok(record?.archived, "contact archived");
      const { added, removed } = newState.diff(state);
      import_chai.assert.strictEqual(added.length, 2, "only two records must be added");
      import_chai.assert.strictEqual(removed.length, 2, "only two records must be removed");
    }
    (0, import_fixtures.debug)("Verifying the final manifest version");
    const finalState = await phone.expectStorageState("consistency check");
    import_chai.assert.strictEqual(finalState.version, 4);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXJjaGl2ZV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi4vLi4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBBcHAsIEJvb3RzdHJhcCB9IGZyb20gJy4vZml4dHVyZXMnO1xuaW1wb3J0IHsgaW5pdFN0b3JhZ2UsIGRlYnVnIH0gZnJvbSAnLi9maXh0dXJlcyc7XG5cbmRlc2NyaWJlKCdzdG9yYWdlIHNlcnZpY2UnLCBmdW5jdGlvbiBuZWVkc05hbWUoKSB7XG4gIHRoaXMudGltZW91dChkdXJhdGlvbnMuTUlOVVRFKTtcblxuICBsZXQgYm9vdHN0cmFwOiBCb290c3RyYXA7XG4gIGxldCBhcHA6IEFwcDtcblxuICBiZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcbiAgICAoeyBib290c3RyYXAsIGFwcCB9ID0gYXdhaXQgaW5pdFN0b3JhZ2UoKSk7XG4gIH0pO1xuXG4gIGFmdGVyRWFjaChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgYXBwLmNsb3NlKCk7XG4gICAgYXdhaXQgYm9vdHN0cmFwLnRlYXJkb3duKCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgYXJjaGl2ZS91bmFyY2hpdmUgY29udGFjdHMnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgeyBwaG9uZSwgY29udGFjdHMgfSA9IGJvb3RzdHJhcDtcbiAgICBjb25zdCBbZmlyc3RDb250YWN0XSA9IGNvbnRhY3RzO1xuXG4gICAgY29uc3Qgd2luZG93ID0gYXdhaXQgYXBwLmdldFdpbmRvdygpO1xuXG4gICAgY29uc3QgbGVmdFBhbmUgPSB3aW5kb3cubG9jYXRvcignLmxlZnQtcGFuZS13cmFwcGVyJyk7XG4gICAgY29uc3QgY29udmVyc2F0aW9uU3RhY2sgPSB3aW5kb3cubG9jYXRvcignLmNvbnZlcnNhdGlvbi1zdGFjaycpO1xuXG4gICAgZGVidWcoJ2FyY2hpdmluZyBjb250YWN0Jyk7XG4gICAge1xuICAgICAgY29uc3Qgc3RhdGUgPSBhd2FpdCBwaG9uZS5leHBlY3RTdG9yYWdlU3RhdGUoJ2NvbnNpc3RlbmN5IGNoZWNrJyk7XG5cbiAgICAgIGF3YWl0IHBob25lLnNldFN0b3JhZ2VTdGF0ZShcbiAgICAgICAgc3RhdGVcbiAgICAgICAgICAudXBkYXRlQ29udGFjdChmaXJzdENvbnRhY3QsIHsgYXJjaGl2ZWQ6IHRydWUgfSlcbiAgICAgICAgICAudW5waW4oZmlyc3RDb250YWN0KVxuICAgICAgKTtcbiAgICAgIGF3YWl0IHBob25lLnNlbmRGZXRjaFN0b3JhZ2Uoe1xuICAgICAgICB0aW1lc3RhbXA6IGJvb3RzdHJhcC5nZXRUaW1lc3RhbXAoKSxcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCBsZWZ0UGFuZVxuICAgICAgICAubG9jYXRvcihcbiAgICAgICAgICAnX3JlYWN0PUNvbnZlcnNhdGlvbkxpc3RJdGVtJyArXG4gICAgICAgICAgICBgW3RpdGxlID0gJHtKU09OLnN0cmluZ2lmeShmaXJzdENvbnRhY3QucHJvZmlsZU5hbWUpfV1gXG4gICAgICAgIClcbiAgICAgICAgLndhaXRGb3IoeyBzdGF0ZTogJ2hpZGRlbicgfSk7XG5cbiAgICAgIGF3YWl0IGxlZnRQYW5lXG4gICAgICAgIC5sb2NhdG9yKCdidXR0b24ubW9kdWxlLWNvbnZlcnNhdGlvbi1saXN0X19pdGVtLS1hcmNoaXZlLWJ1dHRvbicpXG4gICAgICAgIC53YWl0Rm9yKCk7XG4gICAgfVxuXG4gICAgZGVidWcoJ3VuYXJjaGl2aW5nIHBpbm5lZCBjb250YWN0Jyk7XG4gICAge1xuICAgICAgY29uc3Qgc3RhdGUgPSBhd2FpdCBwaG9uZS5leHBlY3RTdG9yYWdlU3RhdGUoJ2NvbnNpc3RlbmN5IGNoZWNrJyk7XG5cbiAgICAgIGF3YWl0IHBob25lLnNldFN0b3JhZ2VTdGF0ZShcbiAgICAgICAgc3RhdGUudXBkYXRlQ29udGFjdChmaXJzdENvbnRhY3QsIHsgYXJjaGl2ZWQ6IGZhbHNlIH0pLnBpbihmaXJzdENvbnRhY3QpXG4gICAgICApO1xuICAgICAgYXdhaXQgcGhvbmUuc2VuZEZldGNoU3RvcmFnZSh7XG4gICAgICAgIHRpbWVzdGFtcDogYm9vdHN0cmFwLmdldFRpbWVzdGFtcCgpLFxuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IGxlZnRQYW5lXG4gICAgICAgIC5sb2NhdG9yKFxuICAgICAgICAgICdfcmVhY3Q9Q29udmVyc2F0aW9uTGlzdEl0ZW0nICtcbiAgICAgICAgICAgICdbaXNQaW5uZWQgPSB0cnVlXScgK1xuICAgICAgICAgICAgYFt0aXRsZSA9ICR7SlNPTi5zdHJpbmdpZnkoZmlyc3RDb250YWN0LnByb2ZpbGVOYW1lKX1dYFxuICAgICAgICApXG4gICAgICAgIC53YWl0Rm9yKCk7XG5cbiAgICAgIGF3YWl0IGxlZnRQYW5lXG4gICAgICAgIC5sb2NhdG9yKCdidXR0b24ubW9kdWxlLWNvbnZlcnNhdGlvbi1saXN0X19pdGVtLS1hcmNoaXZlLWJ1dHRvbicpXG4gICAgICAgIC53YWl0Rm9yKHsgc3RhdGU6ICdoaWRkZW4nIH0pO1xuICAgIH1cblxuICAgIGRlYnVnKCdhcmNoaXZlIHBpbm5lZCBjb250YWN0IGluIHRoZSBhcHAnKTtcbiAgICB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGF3YWl0IHBob25lLmV4cGVjdFN0b3JhZ2VTdGF0ZSgnY29uc2lzdGVuY3kgY2hlY2snKTtcblxuICAgICAgYXdhaXQgbGVmdFBhbmVcbiAgICAgICAgLmxvY2F0b3IoXG4gICAgICAgICAgJ19yZWFjdD1Db252ZXJzYXRpb25MaXN0SXRlbScgK1xuICAgICAgICAgICAgYFt0aXRsZSA9ICR7SlNPTi5zdHJpbmdpZnkoZmlyc3RDb250YWN0LnByb2ZpbGVOYW1lKX1dYFxuICAgICAgICApXG4gICAgICAgIC5jbGljaygpO1xuXG4gICAgICBjb25zdCBtb3JlQnV0dG9uID0gY29udmVyc2F0aW9uU3RhY2subG9jYXRvcihcbiAgICAgICAgJ2J1dHRvbi5tb2R1bGUtQ29udmVyc2F0aW9uSGVhZGVyX19idXR0b24tLW1vcmUnXG4gICAgICApO1xuICAgICAgYXdhaXQgbW9yZUJ1dHRvbi5jbGljaygpO1xuXG4gICAgICBjb25zdCBhcmNoaXZlQnV0dG9uID0gY29udmVyc2F0aW9uU3RhY2subG9jYXRvcihcbiAgICAgICAgJy5yZWFjdC1jb250ZXh0bWVudS1pdGVtID4+IFwiQXJjaGl2ZVwiJ1xuICAgICAgKTtcbiAgICAgIGF3YWl0IGFyY2hpdmVCdXR0b24uY2xpY2soKTtcblxuICAgICAgY29uc3QgbmV3U3RhdGUgPSBhd2FpdCBwaG9uZS53YWl0Rm9yU3RvcmFnZVN0YXRlKHtcbiAgICAgICAgYWZ0ZXI6IHN0YXRlLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQub2soIShhd2FpdCBuZXdTdGF0ZS5pc1Bpbm5lZChmaXJzdENvbnRhY3QpKSwgJ2NvbnRhY3Qgbm90IHBpbm5lZCcpO1xuICAgICAgY29uc3QgcmVjb3JkID0gYXdhaXQgbmV3U3RhdGUuZ2V0Q29udGFjdChmaXJzdENvbnRhY3QpO1xuICAgICAgYXNzZXJ0Lm9rKHJlY29yZCwgJ2NvbnRhY3QgcmVjb3JkIG5vdCBmb3VuZCcpO1xuICAgICAgYXNzZXJ0Lm9rKHJlY29yZD8uYXJjaGl2ZWQsICdjb250YWN0IGFyY2hpdmVkJyk7XG5cbiAgICAgIC8vIEFjY291bnRSZWNvcmQgKyBDb250YWN0UmVjb3JkXG4gICAgICBjb25zdCB7IGFkZGVkLCByZW1vdmVkIH0gPSBuZXdTdGF0ZS5kaWZmKHN0YXRlKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhZGRlZC5sZW5ndGgsIDIsICdvbmx5IHR3byByZWNvcmRzIG11c3QgYmUgYWRkZWQnKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZW1vdmVkLmxlbmd0aCwgMiwgJ29ubHkgdHdvIHJlY29yZHMgbXVzdCBiZSByZW1vdmVkJyk7XG4gICAgfVxuXG4gICAgZGVidWcoJ1ZlcmlmeWluZyB0aGUgZmluYWwgbWFuaWZlc3QgdmVyc2lvbicpO1xuICAgIGNvbnN0IGZpbmFsU3RhdGUgPSBhd2FpdCBwaG9uZS5leHBlY3RTdG9yYWdlU3RhdGUoJ2NvbnNpc3RlbmN5IGNoZWNrJyk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZmluYWxTdGF0ZS52ZXJzaW9uLCA0KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFFdkIsZ0JBQTJCO0FBRTNCLHNCQUFtQztBQUVuQyxTQUFTLG1CQUFtQixxQkFBcUI7QUFDL0MsT0FBSyxRQUFRLFVBQVUsTUFBTTtBQUU3QixNQUFJO0FBQ0osTUFBSTtBQUVKLGFBQVcsWUFBWTtBQUNyQixJQUFDLEdBQUUsV0FBVyxJQUFJLElBQUksTUFBTSxpQ0FBWTtBQUFBLEVBQzFDLENBQUM7QUFFRCxZQUFVLFlBQVk7QUFDcEIsVUFBTSxJQUFJLE1BQU07QUFDaEIsVUFBTSxVQUFVLFNBQVM7QUFBQSxFQUMzQixDQUFDO0FBRUQsS0FBRyxxQ0FBcUMsWUFBWTtBQUNsRCxVQUFNLEVBQUUsT0FBTyxhQUFhO0FBQzVCLFVBQU0sQ0FBQyxnQkFBZ0I7QUFFdkIsVUFBTSxTQUFTLE1BQU0sSUFBSSxVQUFVO0FBRW5DLFVBQU0sV0FBVyxPQUFPLFFBQVEsb0JBQW9CO0FBQ3BELFVBQU0sb0JBQW9CLE9BQU8sUUFBUSxxQkFBcUI7QUFFOUQsK0JBQU0sbUJBQW1CO0FBQ3pCO0FBQ0UsWUFBTSxRQUFRLE1BQU0sTUFBTSxtQkFBbUIsbUJBQW1CO0FBRWhFLFlBQU0sTUFBTSxnQkFDVixNQUNHLGNBQWMsY0FBYyxFQUFFLFVBQVUsS0FBSyxDQUFDLEVBQzlDLE1BQU0sWUFBWSxDQUN2QjtBQUNBLFlBQU0sTUFBTSxpQkFBaUI7QUFBQSxRQUMzQixXQUFXLFVBQVUsYUFBYTtBQUFBLE1BQ3BDLENBQUM7QUFFRCxZQUFNLFNBQ0gsUUFDQyx1Q0FDYyxLQUFLLFVBQVUsYUFBYSxXQUFXLElBQ3ZELEVBQ0MsUUFBUSxFQUFFLE9BQU8sU0FBUyxDQUFDO0FBRTlCLFlBQU0sU0FDSCxRQUFRLHVEQUF1RCxFQUMvRCxRQUFRO0FBQUEsSUFDYjtBQUVBLCtCQUFNLDRCQUE0QjtBQUNsQztBQUNFLFlBQU0sUUFBUSxNQUFNLE1BQU0sbUJBQW1CLG1CQUFtQjtBQUVoRSxZQUFNLE1BQU0sZ0JBQ1YsTUFBTSxjQUFjLGNBQWMsRUFBRSxVQUFVLE1BQU0sQ0FBQyxFQUFFLElBQUksWUFBWSxDQUN6RTtBQUNBLFlBQU0sTUFBTSxpQkFBaUI7QUFBQSxRQUMzQixXQUFXLFVBQVUsYUFBYTtBQUFBLE1BQ3BDLENBQUM7QUFFRCxZQUFNLFNBQ0gsUUFDQyx3REFFYyxLQUFLLFVBQVUsYUFBYSxXQUFXLElBQ3ZELEVBQ0MsUUFBUTtBQUVYLFlBQU0sU0FDSCxRQUFRLHVEQUF1RCxFQUMvRCxRQUFRLEVBQUUsT0FBTyxTQUFTLENBQUM7QUFBQSxJQUNoQztBQUVBLCtCQUFNLG1DQUFtQztBQUN6QztBQUNFLFlBQU0sUUFBUSxNQUFNLE1BQU0sbUJBQW1CLG1CQUFtQjtBQUVoRSxZQUFNLFNBQ0gsUUFDQyx1Q0FDYyxLQUFLLFVBQVUsYUFBYSxXQUFXLElBQ3ZELEVBQ0MsTUFBTTtBQUVULFlBQU0sYUFBYSxrQkFBa0IsUUFDbkMsZ0RBQ0Y7QUFDQSxZQUFNLFdBQVcsTUFBTTtBQUV2QixZQUFNLGdCQUFnQixrQkFBa0IsUUFDdEMsc0NBQ0Y7QUFDQSxZQUFNLGNBQWMsTUFBTTtBQUUxQixZQUFNLFdBQVcsTUFBTSxNQUFNLG9CQUFvQjtBQUFBLFFBQy9DLE9BQU87QUFBQSxNQUNULENBQUM7QUFDRCx5QkFBTyxHQUFHLENBQUUsTUFBTSxTQUFTLFNBQVMsWUFBWSxHQUFJLG9CQUFvQjtBQUN4RSxZQUFNLFNBQVMsTUFBTSxTQUFTLFdBQVcsWUFBWTtBQUNyRCx5QkFBTyxHQUFHLFFBQVEsMEJBQTBCO0FBQzVDLHlCQUFPLEdBQUcsUUFBUSxVQUFVLGtCQUFrQjtBQUc5QyxZQUFNLEVBQUUsT0FBTyxZQUFZLFNBQVMsS0FBSyxLQUFLO0FBQzlDLHlCQUFPLFlBQVksTUFBTSxRQUFRLEdBQUcsZ0NBQWdDO0FBQ3BFLHlCQUFPLFlBQVksUUFBUSxRQUFRLEdBQUcsa0NBQWtDO0FBQUEsSUFDMUU7QUFFQSwrQkFBTSxzQ0FBc0M7QUFDNUMsVUFBTSxhQUFhLE1BQU0sTUFBTSxtQkFBbUIsbUJBQW1CO0FBRXJFLHVCQUFPLFlBQVksV0FBVyxTQUFTLENBQUM7QUFBQSxFQUMxQyxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
