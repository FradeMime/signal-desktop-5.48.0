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
  const { contacts, phone } = bootstrap;
  const members = [...contacts].slice(0, import_fixtures.GROUP_SIZE);
  const group = await phone.createGroup({
    title: "Mock Group",
    members: [phone, ...members]
  });
  await phone.setStorageState(import_mock_server.StorageState.getEmpty().addGroup(group, { whitelisted: true }).pinGroup(group));
  const app = await bootstrap.link();
  try {
    const { server, desktop } = bootstrap;
    const [first] = members;
    const messages = new Array();
    (0, import_fixtures.debug)("encrypting");
    for (const contact of members.slice().reverse()) {
      const messageTimestamp = bootstrap.getTimestamp();
      messages.push(await contact.encryptText(desktop, `hello from: ${contact.profileName}`, {
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
    for (let i = 0; i < CONVERSATION_SIZE; i += 1) {
      const contact = members[i % members.length];
      const messageTimestamp = bootstrap.getTimestamp();
      const isLast = i === CONVERSATION_SIZE - 1;
      messages.push(await contact.encryptText(desktop, isLast ? LAST_MESSAGE : `#${i} from: ${contact.profileName}`, {
        timestamp: messageTimestamp,
        sealed: true,
        group
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
    (0, import_fixtures.debug)("encrypted");
    await Promise.all(messages.map((message) => server.send(desktop, message)));
    const window = await app.getWindow();
    (0, import_fixtures.debug)("opening conversation");
    {
      const leftPane = window.locator(".left-pane-wrapper");
      const item = leftPane.locator(`_react=BaseConversationListItem[title = ${JSON.stringify(group.title)}]>> ${JSON.stringify(LAST_MESSAGE)}`);
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
      const { body, source, envelopeType } = await first.waitForMessage();
      import_assert.default.strictEqual(body, `my message ${runId}`);
      import_assert.default.strictEqual(source, desktop);
      import_assert.default.strictEqual(envelopeType, import_mock_server.EnvelopeType.SenderKey);
      (0, import_fixtures.debug)("waiting for timing from the app");
      const { timestamp, delta } = await app.waitForMessageSend();
      (0, import_fixtures.debug)("sending delivery receipts");
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ3JvdXBfc2VuZF9iZW5jaC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuLyogZXNsaW50LWRpc2FibGUgbm8tYXdhaXQtaW4tbG9vcCwgbm8tY29uc29sZSAqL1xuXG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5cbmltcG9ydCB7XG4gIFN0b3JhZ2VTdGF0ZSxcbiAgRW52ZWxvcGVUeXBlLFxuICBSZWNlaXB0VHlwZSxcbn0gZnJvbSAnQHNpZ25hbGFwcC9tb2NrLXNlcnZlcic7XG5pbXBvcnQge1xuICBCb290c3RyYXAsXG4gIGRlYnVnLFxuICBzYXZlTG9ncyxcbiAgc3RhdHMsXG4gIFJVTl9DT1VOVCxcbiAgR1JPVVBfU0laRSxcbiAgRElTQ0FSRF9DT1VOVCxcbn0gZnJvbSAnLi9maXh0dXJlcyc7XG5cbmNvbnN0IENPTlZFUlNBVElPTl9TSVpFID0gNTAwOyAvLyBtZXNzYWdlc1xuY29uc3QgTEFTVF9NRVNTQUdFID0gJ3N0YXJ0IHNlbmRpbmcgbWVzc2FnZXMgbm93JztcblxuKGFzeW5jICgpID0+IHtcbiAgY29uc3QgYm9vdHN0cmFwID0gbmV3IEJvb3RzdHJhcCh7XG4gICAgYmVuY2htYXJrOiB0cnVlLFxuICB9KTtcblxuICBhd2FpdCBib290c3RyYXAuaW5pdCgpO1xuXG4gIGNvbnN0IHsgY29udGFjdHMsIHBob25lIH0gPSBib290c3RyYXA7XG5cbiAgY29uc3QgbWVtYmVycyA9IFsuLi5jb250YWN0c10uc2xpY2UoMCwgR1JPVVBfU0laRSk7XG5cbiAgY29uc3QgZ3JvdXAgPSBhd2FpdCBwaG9uZS5jcmVhdGVHcm91cCh7XG4gICAgdGl0bGU6ICdNb2NrIEdyb3VwJyxcbiAgICBtZW1iZXJzOiBbcGhvbmUsIC4uLm1lbWJlcnNdLFxuICB9KTtcblxuICBhd2FpdCBwaG9uZS5zZXRTdG9yYWdlU3RhdGUoXG4gICAgU3RvcmFnZVN0YXRlLmdldEVtcHR5KClcbiAgICAgIC5hZGRHcm91cChncm91cCwgeyB3aGl0ZWxpc3RlZDogdHJ1ZSB9KVxuICAgICAgLnBpbkdyb3VwKGdyb3VwKVxuICApO1xuXG4gIGNvbnN0IGFwcCA9IGF3YWl0IGJvb3RzdHJhcC5saW5rKCk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB7IHNlcnZlciwgZGVza3RvcCB9ID0gYm9vdHN0cmFwO1xuICAgIGNvbnN0IFtmaXJzdF0gPSBtZW1iZXJzO1xuXG4gICAgY29uc3QgbWVzc2FnZXMgPSBuZXcgQXJyYXk8QnVmZmVyPigpO1xuICAgIGRlYnVnKCdlbmNyeXB0aW5nJyk7XG4gICAgLy8gRmlsbCBsZWZ0IHBhbmVcbiAgICBmb3IgKGNvbnN0IGNvbnRhY3Qgb2YgbWVtYmVycy5zbGljZSgpLnJldmVyc2UoKSkge1xuICAgICAgY29uc3QgbWVzc2FnZVRpbWVzdGFtcCA9IGJvb3RzdHJhcC5nZXRUaW1lc3RhbXAoKTtcblxuICAgICAgbWVzc2FnZXMucHVzaChcbiAgICAgICAgYXdhaXQgY29udGFjdC5lbmNyeXB0VGV4dChcbiAgICAgICAgICBkZXNrdG9wLFxuICAgICAgICAgIGBoZWxsbyBmcm9tOiAke2NvbnRhY3QucHJvZmlsZU5hbWV9YCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aW1lc3RhbXA6IG1lc3NhZ2VUaW1lc3RhbXAsXG4gICAgICAgICAgICBzZWFsZWQ6IHRydWUsXG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICApO1xuICAgICAgbWVzc2FnZXMucHVzaChcbiAgICAgICAgYXdhaXQgcGhvbmUuZW5jcnlwdFN5bmNSZWFkKGRlc2t0b3AsIHtcbiAgICAgICAgICB0aW1lc3RhbXA6IGJvb3RzdHJhcC5nZXRUaW1lc3RhbXAoKSxcbiAgICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZW5kZXJVVUlEOiBjb250YWN0LmRldmljZS51dWlkLFxuICAgICAgICAgICAgICB0aW1lc3RhbXA6IG1lc3NhZ2VUaW1lc3RhbXAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEZpbGwgZ3JvdXBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IENPTlZFUlNBVElPTl9TSVpFOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGNvbnRhY3QgPSBtZW1iZXJzW2kgJSBtZW1iZXJzLmxlbmd0aF07XG4gICAgICBjb25zdCBtZXNzYWdlVGltZXN0YW1wID0gYm9vdHN0cmFwLmdldFRpbWVzdGFtcCgpO1xuXG4gICAgICBjb25zdCBpc0xhc3QgPSBpID09PSBDT05WRVJTQVRJT05fU0laRSAtIDE7XG5cbiAgICAgIG1lc3NhZ2VzLnB1c2goXG4gICAgICAgIGF3YWl0IGNvbnRhY3QuZW5jcnlwdFRleHQoXG4gICAgICAgICAgZGVza3RvcCxcbiAgICAgICAgICBpc0xhc3QgPyBMQVNUX01FU1NBR0UgOiBgIyR7aX0gZnJvbTogJHtjb250YWN0LnByb2ZpbGVOYW1lfWAsXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGltZXN0YW1wOiBtZXNzYWdlVGltZXN0YW1wLFxuICAgICAgICAgICAgc2VhbGVkOiB0cnVlLFxuICAgICAgICAgICAgZ3JvdXAsXG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICApO1xuICAgICAgbWVzc2FnZXMucHVzaChcbiAgICAgICAgYXdhaXQgcGhvbmUuZW5jcnlwdFN5bmNSZWFkKGRlc2t0b3AsIHtcbiAgICAgICAgICB0aW1lc3RhbXA6IGJvb3RzdHJhcC5nZXRUaW1lc3RhbXAoKSxcbiAgICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZW5kZXJVVUlEOiBjb250YWN0LmRldmljZS51dWlkLFxuICAgICAgICAgICAgICB0aW1lc3RhbXA6IG1lc3NhZ2VUaW1lc3RhbXAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICBkZWJ1ZygnZW5jcnlwdGVkJyk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChtZXNzYWdlcy5tYXAobWVzc2FnZSA9PiBzZXJ2ZXIuc2VuZChkZXNrdG9wLCBtZXNzYWdlKSkpO1xuXG4gICAgY29uc3Qgd2luZG93ID0gYXdhaXQgYXBwLmdldFdpbmRvdygpO1xuXG4gICAgZGVidWcoJ29wZW5pbmcgY29udmVyc2F0aW9uJyk7XG4gICAge1xuICAgICAgY29uc3QgbGVmdFBhbmUgPSB3aW5kb3cubG9jYXRvcignLmxlZnQtcGFuZS13cmFwcGVyJyk7XG5cbiAgICAgIGNvbnN0IGl0ZW0gPSBsZWZ0UGFuZS5sb2NhdG9yKFxuICAgICAgICAnX3JlYWN0PUJhc2VDb252ZXJzYXRpb25MaXN0SXRlbScgK1xuICAgICAgICAgIGBbdGl0bGUgPSAke0pTT04uc3RyaW5naWZ5KGdyb3VwLnRpdGxlKX1dYCArXG4gICAgICAgICAgYD4+ICR7SlNPTi5zdHJpbmdpZnkoTEFTVF9NRVNTQUdFKX1gXG4gICAgICApO1xuICAgICAgYXdhaXQgaXRlbS5jbGljaygpO1xuICAgIH1cblxuICAgIGNvbnN0IHRpbWVsaW5lID0gd2luZG93LmxvY2F0b3IoXG4gICAgICAnLnRpbWVsaW5lLXdyYXBwZXIsIC5Db252ZXJzYXRpb25WaWV3X190ZW1wbGF0ZSAucmVhY3Qtd3JhcHBlcidcbiAgICApO1xuXG4gICAgY29uc3QgZGVsdGFMaXN0ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcbiAgICBmb3IgKGxldCBydW5JZCA9IDA7IHJ1bklkIDwgUlVOX0NPVU5UICsgRElTQ0FSRF9DT1VOVDsgcnVuSWQgKz0gMSkge1xuICAgICAgZGVidWcoJ2ZpbmRpbmcgY29tcG9zaXRpb24gaW5wdXQgYW5kIGNsaWNraW5nIGl0Jyk7XG4gICAgICBjb25zdCBjb21wb3NlQXJlYSA9IHdpbmRvdy5sb2NhdG9yKFxuICAgICAgICAnLmNvbXBvc2l0aW9uLWFyZWEtd3JhcHBlciwgJyArXG4gICAgICAgICAgJy5Db252ZXJzYXRpb25WaWV3X190ZW1wbGF0ZSAucmVhY3Qtd3JhcHBlcidcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGlucHV0ID0gY29tcG9zZUFyZWEubG9jYXRvcignX3JlYWN0PUNvbXBvc2l0aW9uSW5wdXQnKTtcblxuICAgICAgZGVidWcoJ2VudGVyaW5nIG1lc3NhZ2UgdGV4dCcpO1xuICAgICAgYXdhaXQgaW5wdXQudHlwZShgbXkgbWVzc2FnZSAke3J1bklkfWApO1xuICAgICAgYXdhaXQgaW5wdXQucHJlc3MoJ0VudGVyJyk7XG5cbiAgICAgIGRlYnVnKCd3YWl0aW5nIGZvciBtZXNzYWdlIG9uIHNlcnZlciBzaWRlJyk7XG4gICAgICBjb25zdCB7IGJvZHksIHNvdXJjZSwgZW52ZWxvcGVUeXBlIH0gPSBhd2FpdCBmaXJzdC53YWl0Rm9yTWVzc2FnZSgpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGJvZHksIGBteSBtZXNzYWdlICR7cnVuSWR9YCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc291cmNlLCBkZXNrdG9wKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChlbnZlbG9wZVR5cGUsIEVudmVsb3BlVHlwZS5TZW5kZXJLZXkpO1xuXG4gICAgICBkZWJ1Zygnd2FpdGluZyBmb3IgdGltaW5nIGZyb20gdGhlIGFwcCcpO1xuICAgICAgY29uc3QgeyB0aW1lc3RhbXAsIGRlbHRhIH0gPSBhd2FpdCBhcHAud2FpdEZvck1lc3NhZ2VTZW5kKCk7XG5cbiAgICAgIGRlYnVnKCdzZW5kaW5nIGRlbGl2ZXJ5IHJlY2VpcHRzJyk7XG4gICAgICBjb25zdCBkZWxpdmVyeSA9IGF3YWl0IGZpcnN0LmVuY3J5cHRSZWNlaXB0KGRlc2t0b3AsIHtcbiAgICAgICAgdGltZXN0YW1wOiB0aW1lc3RhbXAgKyAxLFxuICAgICAgICBtZXNzYWdlVGltZXN0YW1wczogW3RpbWVzdGFtcF0sXG4gICAgICAgIHR5cGU6IFJlY2VpcHRUeXBlLkRlbGl2ZXJ5LFxuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHNlcnZlci5zZW5kKGRlc2t0b3AsIGRlbGl2ZXJ5KTtcblxuICAgICAgZGVidWcoJ3dhaXRpbmcgZm9yIG1lc3NhZ2Ugc3RhdGUgY2hhbmdlJyk7XG4gICAgICBjb25zdCBtZXNzYWdlID0gdGltZWxpbmUubG9jYXRvcihcbiAgICAgICAgYF9yZWFjdD1NZXNzYWdlW3RpbWVzdGFtcCA9ICR7dGltZXN0YW1wfV1bc3RhdHVzID0gXCJkZWxpdmVyZWRcIl1gXG4gICAgICApO1xuICAgICAgYXdhaXQgbWVzc2FnZS53YWl0Rm9yKCk7XG5cbiAgICAgIGlmIChydW5JZCA+PSBESVNDQVJEX0NPVU5UKSB7XG4gICAgICAgIGRlbHRhTGlzdC5wdXNoKGRlbHRhKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3J1bj0lZCBpbmZvPSVqJywgcnVuSWQgLSBESVNDQVJEX0NPVU5ULCB7IGRlbHRhIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Rpc2NhcmRlZD0lZCBpbmZvPSVqJywgcnVuSWQsIHsgZGVsdGEgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ3N0YXRzIGluZm89JWonLCB7IGRlbHRhOiBzdGF0cyhkZWx0YUxpc3QsIFs5OSwgOTkuOF0pIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGF3YWl0IHNhdmVMb2dzKGJvb3RzdHJhcCk7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH0gZmluYWxseSB7XG4gICAgYXdhaXQgYXBwLmNsb3NlKCk7XG4gICAgYXdhaXQgYm9vdHN0cmFwLnRlYXJkb3duKCk7XG4gIH1cbn0pKCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQSxvQkFBbUI7QUFFbkIseUJBSU87QUFDUCxzQkFRTztBQUVQLE1BQU0sb0JBQW9CO0FBQzFCLE1BQU0sZUFBZTtBQUVyQixBQUFDLGFBQVk7QUFDWCxRQUFNLFlBQVksSUFB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
