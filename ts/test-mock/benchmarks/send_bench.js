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
var import_assert = __toESM(require("assert"));
var import_mock_server = require("@signalapp/mock-server");
var import_fixtures = require("./fixtures");
const CONVERSATION_SIZE = 500;
const LAST_MESSAGE = "start sending messages now";
(async () => {
  const bootstrap = new import_fixtures.Bootstrap({
    benchmark: true
  });
  await bootstrap.init();
  const app = await bootstrap.link();
  try {
    const { server, contacts, phone, desktop } = bootstrap;
    const [first] = contacts;
    const messages = new Array();
    (0, import_fixtures.debug)("encrypting");
    for (const contact of contacts.slice().reverse()) {
      let count = 1;
      if (contact === first) {
        count = CONVERSATION_SIZE;
      }
      for (let i = 0; i < count; i += 1) {
        const messageTimestamp = bootstrap.getTimestamp();
        const isLast = i === count - 1;
        messages.push(await contact.encryptText(desktop, isLast ? LAST_MESSAGE : `#${i} from: ${contact.profileName}`, {
          timestamp: messageTimestamp,
          sealed: true
        }));
        messages.push(await phone.encryptSyncRead(desktop, {
          timestamp: bootstrap.getTimestamp(),
          messages: [
            {
              senderUUID: contact.device.uuid,
              timestamp: messageTimestamp
            }
          ]
        }));
      }
    }
    await Promise.all(messages.map((message) => server.send(desktop, message)));
    const window = await app.getWindow();
    (0, import_fixtures.debug)("opening conversation");
    {
      const leftPane = window.locator(".left-pane-wrapper");
      const item = leftPane.locator(`_react=BaseConversationListItem[title = ${JSON.stringify(first.profileName)}]>> ${JSON.stringify(LAST_MESSAGE)}`);
      await item.click();
    }
    const timeline = window.locator(".timeline-wrapper, .ConversationView__template .react-wrapper");
    const deltaList = new Array();
    for (let runId = 0; runId < import_fixtures.RUN_COUNT + import_fixtures.DISCARD_COUNT; runId += 1) {
      (0, import_fixtures.debug)("finding composition input and clicking it");
      const composeArea = window.locator(".composition-area-wrapper, .ConversationView__template .react-wrapper");
      const input = composeArea.locator("_react=CompositionInput");
      (0, import_fixtures.debug)("entering message text");
      await input.type(`my message ${runId}`);
      await input.press("Enter");
      (0, import_fixtures.debug)("waiting for message on server side");
      const { body, source } = await first.waitForMessage();
      import_assert.default.strictEqual(body, `my message ${runId}`);
      import_assert.default.strictEqual(source, desktop);
      (0, import_fixtures.debug)("waiting for timing from the app");
      const { timestamp, delta } = await app.waitForMessageSend();
      (0, import_fixtures.debug)("sending delivery receipt");
      const delivery = await first.encryptReceipt(desktop, {
        timestamp: timestamp + 1,
        messageTimestamps: [timestamp],
        type: import_mock_server.ReceiptType.Delivery
      });
      await server.send(desktop, delivery);
      (0, import_fixtures.debug)("waiting for message state change");
      const message = timeline.locator(`_react=Message[timestamp = ${timestamp}][status = "delivered"]`);
      await message.waitFor();
      if (runId >= import_fixtures.DISCARD_COUNT) {
        deltaList.push(delta);
        console.log("run=%d info=%j", runId - import_fixtures.DISCARD_COUNT, { delta });
      } else {
        console.log("discarded=%d info=%j", runId, { delta });
      }
    }
    console.log("stats info=%j", { delta: (0, import_fixtures.stats)(deltaList, [99, 99.8]) });
  } catch (error) {
    await (0, import_fixtures.saveLogs)(bootstrap);
    throw error;
  } finally {
    await app.close();
    await bootstrap.teardown();
  }
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2VuZF9iZW5jaC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuLyogZXNsaW50LWRpc2FibGUgbm8tYXdhaXQtaW4tbG9vcCwgbm8tY29uc29sZSAqL1xuXG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5cbmltcG9ydCB7IFJlY2VpcHRUeXBlIH0gZnJvbSAnQHNpZ25hbGFwcC9tb2NrLXNlcnZlcic7XG5cbmltcG9ydCB7XG4gIEJvb3RzdHJhcCxcbiAgZGVidWcsXG4gIHNhdmVMb2dzLFxuICBzdGF0cyxcbiAgUlVOX0NPVU5ULFxuICBESVNDQVJEX0NPVU5ULFxufSBmcm9tICcuL2ZpeHR1cmVzJztcblxuY29uc3QgQ09OVkVSU0FUSU9OX1NJWkUgPSA1MDA7IC8vIG1lc3NhZ2VzXG5cbmNvbnN0IExBU1RfTUVTU0FHRSA9ICdzdGFydCBzZW5kaW5nIG1lc3NhZ2VzIG5vdyc7XG5cbihhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGJvb3RzdHJhcCA9IG5ldyBCb290c3RyYXAoe1xuICAgIGJlbmNobWFyazogdHJ1ZSxcbiAgfSk7XG5cbiAgYXdhaXQgYm9vdHN0cmFwLmluaXQoKTtcbiAgY29uc3QgYXBwID0gYXdhaXQgYm9vdHN0cmFwLmxpbmsoKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHsgc2VydmVyLCBjb250YWN0cywgcGhvbmUsIGRlc2t0b3AgfSA9IGJvb3RzdHJhcDtcblxuICAgIGNvbnN0IFtmaXJzdF0gPSBjb250YWN0cztcblxuICAgIGNvbnN0IG1lc3NhZ2VzID0gbmV3IEFycmF5PEJ1ZmZlcj4oKTtcbiAgICBkZWJ1ZygnZW5jcnlwdGluZycpO1xuICAgIC8vIE5vdGU6IG1ha2UgaXQgc28gdGhhdCB3ZSByZWNlaXZlIHRoZSBsYXRlc3QgbWVzc2FnZSBmcm9tIHRoZSBmaXJzdFxuICAgIC8vIGNvbnRhY3QuXG4gICAgZm9yIChjb25zdCBjb250YWN0IG9mIGNvbnRhY3RzLnNsaWNlKCkucmV2ZXJzZSgpKSB7XG4gICAgICBsZXQgY291bnQgPSAxO1xuICAgICAgaWYgKGNvbnRhY3QgPT09IGZpcnN0KSB7XG4gICAgICAgIGNvdW50ID0gQ09OVkVSU0FUSU9OX1NJWkU7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlVGltZXN0YW1wID0gYm9vdHN0cmFwLmdldFRpbWVzdGFtcCgpO1xuXG4gICAgICAgIGNvbnN0IGlzTGFzdCA9IGkgPT09IGNvdW50IC0gMTtcblxuICAgICAgICBtZXNzYWdlcy5wdXNoKFxuICAgICAgICAgIGF3YWl0IGNvbnRhY3QuZW5jcnlwdFRleHQoXG4gICAgICAgICAgICBkZXNrdG9wLFxuICAgICAgICAgICAgaXNMYXN0ID8gTEFTVF9NRVNTQUdFIDogYCMke2l9IGZyb206ICR7Y29udGFjdC5wcm9maWxlTmFtZX1gLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0aW1lc3RhbXA6IG1lc3NhZ2VUaW1lc3RhbXAsXG4gICAgICAgICAgICAgIHNlYWxlZDogdHJ1ZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIG1lc3NhZ2VzLnB1c2goXG4gICAgICAgICAgYXdhaXQgcGhvbmUuZW5jcnlwdFN5bmNSZWFkKGRlc2t0b3AsIHtcbiAgICAgICAgICAgIHRpbWVzdGFtcDogYm9vdHN0cmFwLmdldFRpbWVzdGFtcCgpLFxuICAgICAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbmRlclVVSUQ6IGNvbnRhY3QuZGV2aWNlLnV1aWQsXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiBtZXNzYWdlVGltZXN0YW1wLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGF3YWl0IFByb21pc2UuYWxsKG1lc3NhZ2VzLm1hcChtZXNzYWdlID0+IHNlcnZlci5zZW5kKGRlc2t0b3AsIG1lc3NhZ2UpKSk7XG5cbiAgICBjb25zdCB3aW5kb3cgPSBhd2FpdCBhcHAuZ2V0V2luZG93KCk7XG5cbiAgICBkZWJ1Zygnb3BlbmluZyBjb252ZXJzYXRpb24nKTtcbiAgICB7XG4gICAgICBjb25zdCBsZWZ0UGFuZSA9IHdpbmRvdy5sb2NhdG9yKCcubGVmdC1wYW5lLXdyYXBwZXInKTtcbiAgICAgIGNvbnN0IGl0ZW0gPSBsZWZ0UGFuZS5sb2NhdG9yKFxuICAgICAgICAnX3JlYWN0PUJhc2VDb252ZXJzYXRpb25MaXN0SXRlbScgK1xuICAgICAgICAgIGBbdGl0bGUgPSAke0pTT04uc3RyaW5naWZ5KGZpcnN0LnByb2ZpbGVOYW1lKX1dYCArXG4gICAgICAgICAgYD4+ICR7SlNPTi5zdHJpbmdpZnkoTEFTVF9NRVNTQUdFKX1gXG4gICAgICApO1xuICAgICAgYXdhaXQgaXRlbS5jbGljaygpO1xuICAgIH1cblxuICAgIGNvbnN0IHRpbWVsaW5lID0gd2luZG93LmxvY2F0b3IoXG4gICAgICAnLnRpbWVsaW5lLXdyYXBwZXIsIC5Db252ZXJzYXRpb25WaWV3X190ZW1wbGF0ZSAucmVhY3Qtd3JhcHBlcidcbiAgICApO1xuXG4gICAgY29uc3QgZGVsdGFMaXN0ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcbiAgICBmb3IgKGxldCBydW5JZCA9IDA7IHJ1bklkIDwgUlVOX0NPVU5UICsgRElTQ0FSRF9DT1VOVDsgcnVuSWQgKz0gMSkge1xuICAgICAgZGVidWcoJ2ZpbmRpbmcgY29tcG9zaXRpb24gaW5wdXQgYW5kIGNsaWNraW5nIGl0Jyk7XG4gICAgICBjb25zdCBjb21wb3NlQXJlYSA9IHdpbmRvdy5sb2NhdG9yKFxuICAgICAgICAnLmNvbXBvc2l0aW9uLWFyZWEtd3JhcHBlciwgJyArXG4gICAgICAgICAgJy5Db252ZXJzYXRpb25WaWV3X190ZW1wbGF0ZSAucmVhY3Qtd3JhcHBlcidcbiAgICAgICk7XG4gICAgICBjb25zdCBpbnB1dCA9IGNvbXBvc2VBcmVhLmxvY2F0b3IoJ19yZWFjdD1Db21wb3NpdGlvbklucHV0Jyk7XG5cbiAgICAgIGRlYnVnKCdlbnRlcmluZyBtZXNzYWdlIHRleHQnKTtcbiAgICAgIGF3YWl0IGlucHV0LnR5cGUoYG15IG1lc3NhZ2UgJHtydW5JZH1gKTtcbiAgICAgIGF3YWl0IGlucHV0LnByZXNzKCdFbnRlcicpO1xuXG4gICAgICBkZWJ1Zygnd2FpdGluZyBmb3IgbWVzc2FnZSBvbiBzZXJ2ZXIgc2lkZScpO1xuICAgICAgY29uc3QgeyBib2R5LCBzb3VyY2UgfSA9IGF3YWl0IGZpcnN0LndhaXRGb3JNZXNzYWdlKCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYm9keSwgYG15IG1lc3NhZ2UgJHtydW5JZH1gKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzb3VyY2UsIGRlc2t0b3ApO1xuXG4gICAgICBkZWJ1Zygnd2FpdGluZyBmb3IgdGltaW5nIGZyb20gdGhlIGFwcCcpO1xuICAgICAgY29uc3QgeyB0aW1lc3RhbXAsIGRlbHRhIH0gPSBhd2FpdCBhcHAud2FpdEZvck1lc3NhZ2VTZW5kKCk7XG5cbiAgICAgIGRlYnVnKCdzZW5kaW5nIGRlbGl2ZXJ5IHJlY2VpcHQnKTtcbiAgICAgIGNvbnN0IGRlbGl2ZXJ5ID0gYXdhaXQgZmlyc3QuZW5jcnlwdFJlY2VpcHQoZGVza3RvcCwge1xuICAgICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcCArIDEsXG4gICAgICAgIG1lc3NhZ2VUaW1lc3RhbXBzOiBbdGltZXN0YW1wXSxcbiAgICAgICAgdHlwZTogUmVjZWlwdFR5cGUuRGVsaXZlcnksXG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgc2VydmVyLnNlbmQoZGVza3RvcCwgZGVsaXZlcnkpO1xuXG4gICAgICBkZWJ1Zygnd2FpdGluZyBmb3IgbWVzc2FnZSBzdGF0ZSBjaGFuZ2UnKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aW1lbGluZS5sb2NhdG9yKFxuICAgICAgICBgX3JlYWN0PU1lc3NhZ2VbdGltZXN0YW1wID0gJHt0aW1lc3RhbXB9XVtzdGF0dXMgPSBcImRlbGl2ZXJlZFwiXWBcbiAgICAgICk7XG4gICAgICBhd2FpdCBtZXNzYWdlLndhaXRGb3IoKTtcblxuICAgICAgaWYgKHJ1bklkID49IERJU0NBUkRfQ09VTlQpIHtcbiAgICAgICAgZGVsdGFMaXN0LnB1c2goZGVsdGEpO1xuICAgICAgICBjb25zb2xlLmxvZygncnVuPSVkIGluZm89JWonLCBydW5JZCAtIERJU0NBUkRfQ09VTlQsIHsgZGVsdGEgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnZGlzY2FyZGVkPSVkIGluZm89JWonLCBydW5JZCwgeyBkZWx0YSB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygnc3RhdHMgaW5mbz0laicsIHsgZGVsdGE6IHN0YXRzKGRlbHRhTGlzdCwgWzk5LCA5OS44XSkgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgYXdhaXQgc2F2ZUxvZ3MoYm9vdHN0cmFwKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCBhcHAuY2xvc2UoKTtcbiAgICBhd2FpdCBib290c3RyYXAudGVhcmRvd24oKTtcbiAgfVxufSkoKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7OztBQUlBLG9CQUFtQjtBQUVuQix5QkFBNEI7QUFFNUIsc0JBT087QUFFUCxNQUFNLG9CQUFvQjtBQUUxQixNQUFNLGVBQWU7QUFFckIsQUFBQyxhQUFZO0FBQ1gsUUFBTSxZQUFZLElBQUksMEJBQVU7QUFBQSxJQUM5QixXQUFXO0FBQUEsRUFDYixDQUFDO0FBRUQsUUFBTSxVQUFVLEtBQUs7QUFDckIsUUFBTSxNQUFNLE1BQU0sVUFBVSxLQUFLO0FBRWpDLE1BQUk7QUFDRixVQUFNLEVBQUUsUUFBUSxVQUFVLE9BQU8sWUFBWTtBQUU3QyxVQUFNLENBQUMsU0FBUztBQUVoQixVQUFNLFdBQVcsSUFBSSxNQUFjO0FBQ25DLCtCQUFNLFlBQVk7QUFHbEIsZUFBVyxXQUFXLFNBQVMsTUFBTSxFQUFFLFFBQVEsR0FBRztBQUNoRCxVQUFJLFFBQVE7QUFDWixVQUFJLFlBQVksT0FBTztBQUNyQixnQkFBUTtBQUFBLE1BQ1Y7QUFFQSxlQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sS0FBSyxHQUFHO0FBQ2pDLGNBQU0sbUJBQW1CLFVBQVUsYUFBYTtBQUVoRCxjQUFNLFNBQVMsTUFBTSxRQUFRO0FBRTdCLGlCQUFTLEtBQ1AsTUFBTSxRQUFRLFlBQ1osU0FDQSxTQUFTLGVBQWUsSUFBSSxXQUFXLFFBQVEsZUFDL0M7QUFBQSxVQUNFLFdBQVc7QUFBQSxVQUNYLFFBQVE7QUFBQSxRQUNWLENBQ0YsQ0FDRjtBQUNBLGlCQUFTLEtBQ1AsTUFBTSxNQUFNLGdCQUFnQixTQUFTO0FBQUEsVUFDbkMsV0FBVyxVQUFVLGFBQWE7QUFBQSxVQUNsQyxVQUFVO0FBQUEsWUFDUjtBQUFBLGNBQ0UsWUFBWSxRQUFRLE9BQU87QUFBQSxjQUMzQixXQUFXO0FBQUEsWUFDYjtBQUFBLFVBQ0Y7QUFBQSxRQUNGLENBQUMsQ0FDSDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsVUFBTSxRQUFRLElBQUksU0FBUyxJQUFJLGFBQVcsT0FBTyxLQUFLLFNBQVMsT0FBTyxDQUFDLENBQUM7QUFFeEUsVUFBTSxTQUFTLE1BQU0sSUFBSSxVQUFVO0FBRW5DLCtCQUFNLHNCQUFzQjtBQUM1QjtBQUNFLFlBQU0sV0FBVyxPQUFPLFFBQVEsb0JBQW9CO0FBQ3BELFlBQU0sT0FBTyxTQUFTLFFBQ3BCLDJDQUNjLEtBQUssVUFBVSxNQUFNLFdBQVcsUUFDdEMsS0FBSyxVQUFVLFlBQVksR0FDckM7QUFDQSxZQUFNLEtBQUssTUFBTTtBQUFBLElBQ25CO0FBRUEsVUFBTSxXQUFXLE9BQU8sUUFDdEIsK0RBQ0Y7QUFFQSxVQUFNLFlBQVksSUFBSSxNQUFjO0FBQ3BDLGFBQVMsUUFBUSxHQUFHLFFBQVEsNEJBQVksK0JBQWUsU0FBUyxHQUFHO0FBQ2pFLGlDQUFNLDJDQUEyQztBQUNqRCxZQUFNLGNBQWMsT0FBTyxRQUN6Qix1RUFFRjtBQUNBLFlBQU0sUUFBUSxZQUFZLFFBQVEseUJBQXlCO0FBRTNELGlDQUFNLHVCQUF1QjtBQUM3QixZQUFNLE1BQU0sS0FBSyxjQUFjLE9BQU87QUFDdEMsWUFBTSxNQUFNLE1BQU0sT0FBTztBQUV6QixpQ0FBTSxvQ0FBb0M7QUFDMUMsWUFBTSxFQUFFLE1BQU0sV0FBVyxNQUFNLE1BQU0sZUFBZTtBQUNwRCw0QkFBTyxZQUFZLE1BQU0sY0FBYyxPQUFPO0FBQzlDLDRCQUFPLFlBQVksUUFBUSxPQUFPO0FBRWxDLGlDQUFNLGlDQUFpQztBQUN2QyxZQUFNLEVBQUUsV0FBVyxVQUFVLE1BQU0sSUFBSSxtQkFBbUI7QUFFMUQsaUNBQU0sMEJBQTBCO0FBQ2hDLFlBQU0sV0FBVyxNQUFNLE1BQU0sZUFBZSxTQUFTO0FBQUEsUUFDbkQsV0FBVyxZQUFZO0FBQUEsUUFDdkIsbUJBQW1CLENBQUMsU0FBUztBQUFBLFFBQzdCLE1BQU0sK0JBQVk7QUFBQSxNQUNwQixDQUFDO0FBRUQsWUFBTSxPQUFPLEtBQUssU0FBUyxRQUFRO0FBRW5DLGlDQUFNLGtDQUFrQztBQUN4QyxZQUFNLFVBQVUsU0FBUyxRQUN2Qiw4QkFBOEIsa0NBQ2hDO0FBQ0EsWUFBTSxRQUFRLFFBQVE7QUFFdEIsVUFBSSxTQUFTLCtCQUFlO0FBQzFCLGtCQUFVLEtBQUssS0FBSztBQUNwQixnQkFBUSxJQUFJLGtCQUFrQixRQUFRLCtCQUFlLEVBQUUsTUFBTSxDQUFDO0FBQUEsTUFDaEUsT0FBTztBQUNMLGdCQUFRLElBQUksd0JBQXdCLE9BQU8sRUFBRSxNQUFNLENBQUM7QUFBQSxNQUN0RDtBQUFBLElBQ0Y7QUFFQSxZQUFRLElBQUksaUJBQWlCLEVBQUUsT0FBTywyQkFBTSxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQUEsRUFDdEUsU0FBUyxPQUFQO0FBQ0EsVUFBTSw4QkFBUyxTQUFTO0FBQ3hCLFVBQU07QUFBQSxFQUNSLFVBQUU7QUFDQSxVQUFNLElBQUksTUFBTTtBQUNoQixVQUFNLFVBQVUsU0FBUztBQUFBLEVBQzNCO0FBQ0YsR0FBRzsiLAogICJuYW1lcyI6IFtdCn0K
