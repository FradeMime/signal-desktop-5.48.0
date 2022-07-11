var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_fixtures = require("./fixtures");
const CONVERSATION_SIZE = 1e3;
const DELAY = 50;
(async () => {
  const bootstrap = new import_fixtures.Bootstrap({
    benchmark: true
  });
  await bootstrap.init();
  const app = await bootstrap.link();
  try {
    const { server, contacts, phone, desktop } = bootstrap;
    const [first, second] = contacts;
    const messages = new Array();
    (0, import_fixtures.debug)("encrypting");
    for (const contact of [second, first]) {
      for (let i = 0; i < CONVERSATION_SIZE; i += 1) {
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
    }
    const sendQueue = /* @__PURE__ */ __name(async () => {
      await Promise.all(messages.map((message) => server.send(desktop, message)));
    }, "sendQueue");
    const measure = /* @__PURE__ */ __name(async () => {
      const window = await app.getWindow();
      const leftPane = window.locator(".left-pane-wrapper");
      const openConvo = /* @__PURE__ */ __name(async (contact) => {
        (0, import_fixtures.debug)("opening conversation", contact.profileName);
        const item = leftPane.locator(`_react=BaseConversationListItem[title = ${JSON.stringify(contact.profileName)}]`);
        await item.click();
      }, "openConvo");
      const deltaList = new Array();
      for (let runId = 0; runId < import_fixtures.RUN_COUNT + import_fixtures.DISCARD_COUNT; runId += 1) {
        await openConvo(runId % 2 === 0 ? first : second);
        (0, import_fixtures.debug)("waiting for timing from the app");
        const { delta } = await app.waitForConversationOpen();
        await new Promise((resolve) => setTimeout(resolve, DELAY));
        if (runId >= import_fixtures.DISCARD_COUNT) {
          deltaList.push(delta);
          console.log("run=%d info=%j", runId - import_fixtures.DISCARD_COUNT, { delta });
        } else {
          console.log("discarded=%d info=%j", runId, { delta });
        }
      }
      console.log("stats info=%j", { delta: (0, import_fixtures.stats)(deltaList, [99, 99.8]) });
    }, "measure");
    await Promise.all([sendQueue(), measure()]);
  } catch (error) {
    await (0, import_fixtures.saveLogs)(bootstrap);
    throw error;
  } finally {
    await app.close();
    await bootstrap.teardown();
  }
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29udm9fb3Blbl9iZW5jaC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuLyogZXNsaW50LWRpc2FibGUgbm8tYXdhaXQtaW4tbG9vcCwgbm8tY29uc29sZSAqL1xuXG5pbXBvcnQgdHlwZSB7IFByaW1hcnlEZXZpY2UgfSBmcm9tICdAc2lnbmFsYXBwL21vY2stc2VydmVyJztcblxuaW1wb3J0IHtcbiAgQm9vdHN0cmFwLFxuICBkZWJ1ZyxcbiAgc2F2ZUxvZ3MsXG4gIHN0YXRzLFxuICBSVU5fQ09VTlQsXG4gIERJU0NBUkRfQ09VTlQsXG59IGZyb20gJy4vZml4dHVyZXMnO1xuXG5jb25zdCBDT05WRVJTQVRJT05fU0laRSA9IDEwMDA7IC8vIG1lc3NhZ2VzXG5jb25zdCBERUxBWSA9IDUwOyAvLyBtaWxsaXNlY29uZHNcblxuKGFzeW5jICgpID0+IHtcbiAgY29uc3QgYm9vdHN0cmFwID0gbmV3IEJvb3RzdHJhcCh7XG4gICAgYmVuY2htYXJrOiB0cnVlLFxuICB9KTtcblxuICBhd2FpdCBib290c3RyYXAuaW5pdCgpO1xuICBjb25zdCBhcHAgPSBhd2FpdCBib290c3RyYXAubGluaygpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgeyBzZXJ2ZXIsIGNvbnRhY3RzLCBwaG9uZSwgZGVza3RvcCB9ID0gYm9vdHN0cmFwO1xuXG4gICAgY29uc3QgW2ZpcnN0LCBzZWNvbmRdID0gY29udGFjdHM7XG5cbiAgICBjb25zdCBtZXNzYWdlcyA9IG5ldyBBcnJheTxCdWZmZXI+KCk7XG4gICAgZGVidWcoJ2VuY3J5cHRpbmcnKTtcbiAgICAvLyBTZW5kIG1lc3NhZ2VzIGZyb20ganVzdCB0d28gY29udGFjdHNcbiAgICBmb3IgKGNvbnN0IGNvbnRhY3Qgb2YgW3NlY29uZCwgZmlyc3RdKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IENPTlZFUlNBVElPTl9TSVpFOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZVRpbWVzdGFtcCA9IGJvb3RzdHJhcC5nZXRUaW1lc3RhbXAoKTtcbiAgICAgICAgbWVzc2FnZXMucHVzaChcbiAgICAgICAgICBhd2FpdCBjb250YWN0LmVuY3J5cHRUZXh0KFxuICAgICAgICAgICAgZGVza3RvcCxcbiAgICAgICAgICAgIGBoZWxsbyBmcm9tOiAke2NvbnRhY3QucHJvZmlsZU5hbWV9YCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGltZXN0YW1wOiBtZXNzYWdlVGltZXN0YW1wLFxuICAgICAgICAgICAgICBzZWFsZWQ6IHRydWUsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIG1lc3NhZ2VzLnB1c2goXG4gICAgICAgICAgYXdhaXQgcGhvbmUuZW5jcnlwdFN5bmNSZWFkKGRlc2t0b3AsIHtcbiAgICAgICAgICAgIHRpbWVzdGFtcDogYm9vdHN0cmFwLmdldFRpbWVzdGFtcCgpLFxuICAgICAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbmRlclVVSUQ6IGNvbnRhY3QuZGV2aWNlLnV1aWQsXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiBtZXNzYWdlVGltZXN0YW1wLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNlbmRRdWV1ZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKG1lc3NhZ2VzLm1hcChtZXNzYWdlID0+IHNlcnZlci5zZW5kKGRlc2t0b3AsIG1lc3NhZ2UpKSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG1lYXN1cmUgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICBjb25zdCB3aW5kb3cgPSBhd2FpdCBhcHAuZ2V0V2luZG93KCk7XG5cbiAgICAgIGNvbnN0IGxlZnRQYW5lID0gd2luZG93LmxvY2F0b3IoJy5sZWZ0LXBhbmUtd3JhcHBlcicpO1xuXG4gICAgICBjb25zdCBvcGVuQ29udm8gPSBhc3luYyAoY29udGFjdDogUHJpbWFyeURldmljZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBkZWJ1Zygnb3BlbmluZyBjb252ZXJzYXRpb24nLCBjb250YWN0LnByb2ZpbGVOYW1lKTtcbiAgICAgICAgY29uc3QgaXRlbSA9IGxlZnRQYW5lLmxvY2F0b3IoXG4gICAgICAgICAgJ19yZWFjdD1CYXNlQ29udmVyc2F0aW9uTGlzdEl0ZW0nICtcbiAgICAgICAgICAgIGBbdGl0bGUgPSAke0pTT04uc3RyaW5naWZ5KGNvbnRhY3QucHJvZmlsZU5hbWUpfV1gXG4gICAgICAgICk7XG5cbiAgICAgICAgYXdhaXQgaXRlbS5jbGljaygpO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgZGVsdGFMaXN0ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcbiAgICAgIGZvciAobGV0IHJ1bklkID0gMDsgcnVuSWQgPCBSVU5fQ09VTlQgKyBESVNDQVJEX0NPVU5UOyBydW5JZCArPSAxKSB7XG4gICAgICAgIGF3YWl0IG9wZW5Db252byhydW5JZCAlIDIgPT09IDAgPyBmaXJzdCA6IHNlY29uZCk7XG5cbiAgICAgICAgZGVidWcoJ3dhaXRpbmcgZm9yIHRpbWluZyBmcm9tIHRoZSBhcHAnKTtcbiAgICAgICAgY29uc3QgeyBkZWx0YSB9ID0gYXdhaXQgYXBwLndhaXRGb3JDb252ZXJzYXRpb25PcGVuKCk7XG5cbiAgICAgICAgLy8gTGV0IHJlbmRlciBjb21wbGV0ZVxuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgREVMQVkpKTtcblxuICAgICAgICBpZiAocnVuSWQgPj0gRElTQ0FSRF9DT1VOVCkge1xuICAgICAgICAgIGRlbHRhTGlzdC5wdXNoKGRlbHRhKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygncnVuPSVkIGluZm89JWonLCBydW5JZCAtIERJU0NBUkRfQ09VTlQsIHsgZGVsdGEgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2Rpc2NhcmRlZD0lZCBpbmZvPSVqJywgcnVuSWQsIHsgZGVsdGEgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coJ3N0YXRzIGluZm89JWonLCB7IGRlbHRhOiBzdGF0cyhkZWx0YUxpc3QsIFs5OSwgOTkuOF0pIH0pO1xuICAgIH07XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChbc2VuZFF1ZXVlKCksIG1lYXN1cmUoKV0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGF3YWl0IHNhdmVMb2dzKGJvb3RzdHJhcCk7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH0gZmluYWxseSB7XG4gICAgYXdhaXQgYXBwLmNsb3NlKCk7XG4gICAgYXdhaXQgYm9vdHN0cmFwLnRlYXJkb3duKCk7XG4gIH1cbn0pKCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQU1BLHNCQU9PO0FBRVAsTUFBTSxvQkFBb0I7QUFDMUIsTUFBTSxRQUFRO0FBRWQsQUFBQyxhQUFZO0FBQ1gsUUFBTSxZQUFZLElBQUksMEJBQVU7QUFBQSxJQUM5QixXQUFXO0FBQUEsRUFDYixDQUFDO0FBRUQsUUFBTSxVQUFVLEtBQUs7QUFDckIsUUFBTSxNQUFNLE1BQU0sVUFBVSxLQUFLO0FBRWpDLE1BQUk7QUFDRixVQUFNLEVBQUUsUUFBUSxVQUFVLE9BQU8sWUFBWTtBQUU3QyxVQUFNLENBQUMsT0FBTyxVQUFVO0FBRXhCLFVBQU0sV0FBVyxJQUFJLE1BQWM7QUFDbkMsK0JBQU0sWUFBWTtBQUVsQixlQUFXLFdBQVcsQ0FBQyxRQUFRLEtBQUssR0FBRztBQUNyQyxlQUFTLElBQUksR0FBRyxJQUFJLG1CQUFtQixLQUFLLEdBQUc7QUFDN0MsY0FBTSxtQkFBbUIsVUFBVSxhQUFhO0FBQ2hELGlCQUFTLEtBQ1AsTUFBTSxRQUFRLFlBQ1osU0FDQSxlQUFlLFFBQVEsZUFDdkI7QUFBQSxVQUNFLFdBQVc7QUFBQSxVQUNYLFFBQVE7QUFBQSxRQUNWLENBQ0YsQ0FDRjtBQUVBLGlCQUFTLEtBQ1AsTUFBTSxNQUFNLGdCQUFnQixTQUFTO0FBQUEsVUFDbkMsV0FBVyxVQUFVLGFBQWE7QUFBQSxVQUNsQyxVQUFVO0FBQUEsWUFDUjtBQUFBLGNBQ0UsWUFBWSxRQUFRLE9BQU87QUFBQSxjQUMzQixXQUFXO0FBQUEsWUFDYjtBQUFBLFVBQ0Y7QUFBQSxRQUNGLENBQUMsQ0FDSDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsVUFBTSxZQUFZLG1DQUEyQjtBQUMzQyxZQUFNLFFBQVEsSUFBSSxTQUFTLElBQUksYUFBVyxPQUFPLEtBQUssU0FBUyxPQUFPLENBQUMsQ0FBQztBQUFBLElBQzFFLEdBRmtCO0FBSWxCLFVBQU0sVUFBVSxtQ0FBMkI7QUFDekMsWUFBTSxTQUFTLE1BQU0sSUFBSSxVQUFVO0FBRW5DLFlBQU0sV0FBVyxPQUFPLFFBQVEsb0JBQW9CO0FBRXBELFlBQU0sWUFBWSw4QkFBTyxZQUEwQztBQUNqRSxtQ0FBTSx3QkFBd0IsUUFBUSxXQUFXO0FBQ2pELGNBQU0sT0FBTyxTQUFTLFFBQ3BCLDJDQUNjLEtBQUssVUFBVSxRQUFRLFdBQVcsSUFDbEQ7QUFFQSxjQUFNLEtBQUssTUFBTTtBQUFBLE1BQ25CLEdBUmtCO0FBVWxCLFlBQU0sWUFBWSxJQUFJLE1BQWM7QUFDcEMsZUFBUyxRQUFRLEdBQUcsUUFBUSw0QkFBWSwrQkFBZSxTQUFTLEdBQUc7QUFDakUsY0FBTSxVQUFVLFFBQVEsTUFBTSxJQUFJLFFBQVEsTUFBTTtBQUVoRCxtQ0FBTSxpQ0FBaUM7QUFDdkMsY0FBTSxFQUFFLFVBQVUsTUFBTSxJQUFJLHdCQUF3QjtBQUdwRCxjQUFNLElBQUksUUFBUSxhQUFXLFdBQVcsU0FBUyxLQUFLLENBQUM7QUFFdkQsWUFBSSxTQUFTLCtCQUFlO0FBQzFCLG9CQUFVLEtBQUssS0FBSztBQUNwQixrQkFBUSxJQUFJLGtCQUFrQixRQUFRLCtCQUFlLEVBQUUsTUFBTSxDQUFDO0FBQUEsUUFDaEUsT0FBTztBQUNMLGtCQUFRLElBQUksd0JBQXdCLE9BQU8sRUFBRSxNQUFNLENBQUM7QUFBQSxRQUN0RDtBQUFBLE1BQ0Y7QUFFQSxjQUFRLElBQUksaUJBQWlCLEVBQUUsT0FBTywyQkFBTSxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQUEsSUFDdEUsR0FsQ2dCO0FBb0NoQixVQUFNLFFBQVEsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsQ0FBQztBQUFBLEVBQzVDLFNBQVMsT0FBUDtBQUNBLFVBQU0sOEJBQVMsU0FBUztBQUN4QixVQUFNO0FBQUEsRUFDUixVQUFFO0FBQ0EsVUFBTSxJQUFJLE1BQU07QUFDaEIsVUFBTSxVQUFVLFNBQVM7QUFBQSxFQUMzQjtBQUNGLEdBQUc7IiwKICAibmFtZXMiOiBbXQp9Cg==
