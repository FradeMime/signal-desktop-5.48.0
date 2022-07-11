var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_mock_server = require("@signalapp/mock-server");
var import_fixtures = require("./fixtures");
const MESSAGE_BATCH_SIZE = 1e3;
const ENABLE_RECEIPTS = Boolean(process.env.ENABLE_RECEIPTS);
(async () => {
  const bootstrap = new import_fixtures.Bootstrap({
    benchmark: true
  });
  await bootstrap.init();
  await bootstrap.linkAndClose();
  try {
    const { server, contacts, phone, desktop } = bootstrap;
    const messagesPerSec = new Array();
    for (let runId = 0; runId < import_fixtures.RUN_COUNT; runId += 1) {
      const messagePromises = new Array();
      (0, import_fixtures.debug)("started generating messages");
      for (let i = 0; i < MESSAGE_BATCH_SIZE; i += 1) {
        const contact = contacts[Math.floor(i / 2) % contacts.length];
        const direction = i % 2 ? "message" : "reply";
        const messageTimestamp = bootstrap.getTimestamp();
        if (direction === "message") {
          messagePromises.push(contact.encryptText(desktop, `Ping from mock server ${i + 1} / ${MESSAGE_BATCH_SIZE}`, {
            timestamp: messageTimestamp,
            sealed: true
          }));
          if (ENABLE_RECEIPTS) {
            messagePromises.push(phone.encryptSyncRead(desktop, {
              timestamp: bootstrap.getTimestamp(),
              messages: [
                {
                  senderUUID: contact.device.uuid,
                  timestamp: messageTimestamp
                }
              ]
            }));
          }
          continue;
        }
        messagePromises.push(phone.encryptSyncSent(desktop, `Pong from mock server ${i + 1} / ${MESSAGE_BATCH_SIZE}`, {
          timestamp: messageTimestamp,
          destinationUUID: contact.device.uuid
        }));
        if (ENABLE_RECEIPTS) {
          messagePromises.push(contact.encryptReceipt(desktop, {
            timestamp: bootstrap.getTimestamp(),
            messageTimestamps: [messageTimestamp],
            type: import_mock_server.ReceiptType.Delivery
          }));
          messagePromises.push(contact.encryptReceipt(desktop, {
            timestamp: bootstrap.getTimestamp(),
            messageTimestamps: [messageTimestamp],
            type: import_mock_server.ReceiptType.Read
          }));
        }
      }
      (0, import_fixtures.debug)("ended generating messages");
      const messages = await Promise.all(messagePromises);
      {
        (0, import_fixtures.debug)("got synced, sending messages");
        const queue = /* @__PURE__ */ __name(async () => {
          await Promise.all(messages.map((message) => {
            return server.send(desktop, message);
          }));
        }, "queue");
        const run = /* @__PURE__ */ __name(async () => {
          const app = await bootstrap.startApp();
          const appLoadedInfo = await app.waitUntilLoaded();
          console.log("run=%d info=%j", runId, appLoadedInfo);
          messagesPerSec.push(appLoadedInfo.messagesPerSec);
          await app.close();
        }, "run");
        await Promise.all([queue(), run()]);
      }
    }
    if (messagesPerSec.length !== 0) {
      console.log("stats info=%j", { messagesPerSec: (0, import_fixtures.stats)(messagesPerSec) });
    }
  } catch (error) {
    await (0, import_fixtures.saveLogs)(bootstrap);
    throw error;
  } finally {
    await bootstrap.teardown();
  }
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RhcnR1cF9iZW5jaC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuLyogZXNsaW50LWRpc2FibGUgbm8tYXdhaXQtaW4tbG9vcCwgbm8tY29uc29sZSAqL1xuXG5pbXBvcnQgeyBSZWNlaXB0VHlwZSB9IGZyb20gJ0BzaWduYWxhcHAvbW9jay1zZXJ2ZXInO1xuXG5pbXBvcnQgeyBkZWJ1ZywgQm9vdHN0cmFwLCBzYXZlTG9ncywgc3RhdHMsIFJVTl9DT1VOVCB9IGZyb20gJy4vZml4dHVyZXMnO1xuXG5jb25zdCBNRVNTQUdFX0JBVENIX1NJWkUgPSAxMDAwOyAvLyBtZXNzYWdlc1xuXG5jb25zdCBFTkFCTEVfUkVDRUlQVFMgPSBCb29sZWFuKHByb2Nlc3MuZW52LkVOQUJMRV9SRUNFSVBUUyk7XG5cbihhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGJvb3RzdHJhcCA9IG5ldyBCb290c3RyYXAoe1xuICAgIGJlbmNobWFyazogdHJ1ZSxcbiAgfSk7XG5cbiAgYXdhaXQgYm9vdHN0cmFwLmluaXQoKTtcbiAgYXdhaXQgYm9vdHN0cmFwLmxpbmtBbmRDbG9zZSgpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgeyBzZXJ2ZXIsIGNvbnRhY3RzLCBwaG9uZSwgZGVza3RvcCB9ID0gYm9vdHN0cmFwO1xuXG4gICAgY29uc3QgbWVzc2FnZXNQZXJTZWMgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuXG4gICAgZm9yIChsZXQgcnVuSWQgPSAwOyBydW5JZCA8IFJVTl9DT1VOVDsgcnVuSWQgKz0gMSkge1xuICAgICAgLy8gR2VuZXJhdGUgbWVzc2FnZXNcbiAgICAgIGNvbnN0IG1lc3NhZ2VQcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPEJ1ZmZlcj4+KCk7XG4gICAgICBkZWJ1Zygnc3RhcnRlZCBnZW5lcmF0aW5nIG1lc3NhZ2VzJyk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTUVTU0FHRV9CQVRDSF9TSVpFOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgY29udGFjdCA9IGNvbnRhY3RzW01hdGguZmxvb3IoaSAvIDIpICUgY29udGFjdHMubGVuZ3RoXTtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gaSAlIDIgPyAnbWVzc2FnZScgOiAncmVwbHknO1xuXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VUaW1lc3RhbXAgPSBib290c3RyYXAuZ2V0VGltZXN0YW1wKCk7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ21lc3NhZ2UnKSB7XG4gICAgICAgICAgbWVzc2FnZVByb21pc2VzLnB1c2goXG4gICAgICAgICAgICBjb250YWN0LmVuY3J5cHRUZXh0KFxuICAgICAgICAgICAgICBkZXNrdG9wLFxuICAgICAgICAgICAgICBgUGluZyBmcm9tIG1vY2sgc2VydmVyICR7aSArIDF9IC8gJHtNRVNTQUdFX0JBVENIX1NJWkV9YCxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogbWVzc2FnZVRpbWVzdGFtcCxcbiAgICAgICAgICAgICAgICBzZWFsZWQ6IHRydWUsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKEVOQUJMRV9SRUNFSVBUUykge1xuICAgICAgICAgICAgbWVzc2FnZVByb21pc2VzLnB1c2goXG4gICAgICAgICAgICAgIHBob25lLmVuY3J5cHRTeW5jUmVhZChkZXNrdG9wLCB7XG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiBib290c3RyYXAuZ2V0VGltZXN0YW1wKCksXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc2VuZGVyVVVJRDogY29udGFjdC5kZXZpY2UudXVpZCxcbiAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBtZXNzYWdlVGltZXN0YW1wLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBtZXNzYWdlUHJvbWlzZXMucHVzaChcbiAgICAgICAgICBwaG9uZS5lbmNyeXB0U3luY1NlbnQoXG4gICAgICAgICAgICBkZXNrdG9wLFxuICAgICAgICAgICAgYFBvbmcgZnJvbSBtb2NrIHNlcnZlciAke2kgKyAxfSAvICR7TUVTU0FHRV9CQVRDSF9TSVpFfWAsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRpbWVzdGFtcDogbWVzc2FnZVRpbWVzdGFtcCxcbiAgICAgICAgICAgICAgZGVzdGluYXRpb25VVUlEOiBjb250YWN0LmRldmljZS51dWlkLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoRU5BQkxFX1JFQ0VJUFRTKSB7XG4gICAgICAgICAgbWVzc2FnZVByb21pc2VzLnB1c2goXG4gICAgICAgICAgICBjb250YWN0LmVuY3J5cHRSZWNlaXB0KGRlc2t0b3AsIHtcbiAgICAgICAgICAgICAgdGltZXN0YW1wOiBib290c3RyYXAuZ2V0VGltZXN0YW1wKCksXG4gICAgICAgICAgICAgIG1lc3NhZ2VUaW1lc3RhbXBzOiBbbWVzc2FnZVRpbWVzdGFtcF0sXG4gICAgICAgICAgICAgIHR5cGU6IFJlY2VpcHRUeXBlLkRlbGl2ZXJ5LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICAgIG1lc3NhZ2VQcm9taXNlcy5wdXNoKFxuICAgICAgICAgICAgY29udGFjdC5lbmNyeXB0UmVjZWlwdChkZXNrdG9wLCB7XG4gICAgICAgICAgICAgIHRpbWVzdGFtcDogYm9vdHN0cmFwLmdldFRpbWVzdGFtcCgpLFxuICAgICAgICAgICAgICBtZXNzYWdlVGltZXN0YW1wczogW21lc3NhZ2VUaW1lc3RhbXBdLFxuICAgICAgICAgICAgICB0eXBlOiBSZWNlaXB0VHlwZS5SZWFkLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRlYnVnKCdlbmRlZCBnZW5lcmF0aW5nIG1lc3NhZ2VzJyk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gYXdhaXQgUHJvbWlzZS5hbGwobWVzc2FnZVByb21pc2VzKTtcblxuICAgICAgLy8gT3BlbiB0aGUgZmxvb2QgZ2F0ZXNcbiAgICAgIHtcbiAgICAgICAgZGVidWcoJ2dvdCBzeW5jZWQsIHNlbmRpbmcgbWVzc2FnZXMnKTtcblxuICAgICAgICAvLyBRdWV1ZSBhbGwgbWVzc2FnZXNcbiAgICAgICAgY29uc3QgcXVldWUgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICBtZXNzYWdlcy5tYXAobWVzc2FnZSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBzZXJ2ZXIuc2VuZChkZXNrdG9wLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBydW4gPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgICAgY29uc3QgYXBwID0gYXdhaXQgYm9vdHN0cmFwLnN0YXJ0QXBwKCk7XG4gICAgICAgICAgY29uc3QgYXBwTG9hZGVkSW5mbyA9IGF3YWl0IGFwcC53YWl0VW50aWxMb2FkZWQoKTtcblxuICAgICAgICAgIGNvbnNvbGUubG9nKCdydW49JWQgaW5mbz0laicsIHJ1bklkLCBhcHBMb2FkZWRJbmZvKTtcblxuICAgICAgICAgIG1lc3NhZ2VzUGVyU2VjLnB1c2goYXBwTG9hZGVkSW5mby5tZXNzYWdlc1BlclNlYyk7XG5cbiAgICAgICAgICBhd2FpdCBhcHAuY2xvc2UoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbcXVldWUoKSwgcnVuKCldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDb21wdXRlIGh1bWFuLXJlYWRhYmxlIHN0YXRpc3RpY3NcbiAgICBpZiAobWVzc2FnZXNQZXJTZWMubGVuZ3RoICE9PSAwKSB7XG4gICAgICBjb25zb2xlLmxvZygnc3RhdHMgaW5mbz0laicsIHsgbWVzc2FnZXNQZXJTZWM6IHN0YXRzKG1lc3NhZ2VzUGVyU2VjKSB9KTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgYXdhaXQgc2F2ZUxvZ3MoYm9vdHN0cmFwKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCBib290c3RyYXAudGVhcmRvd24oKTtcbiAgfVxufSkoKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBSUEseUJBQTRCO0FBRTVCLHNCQUE2RDtBQUU3RCxNQUFNLHFCQUFxQjtBQUUzQixNQUFNLGtCQUFrQixRQUFRLFFBQVEsSUFBSSxlQUFlO0FBRTNELEFBQUMsYUFBWTtBQUNYLFFBQU0sWUFBWSxJQUFJLDBCQUFVO0FBQUEsSUFDOUIsV0FBVztBQUFBLEVBQ2IsQ0FBQztBQUVELFFBQU0sVUFBVSxLQUFLO0FBQ3JCLFFBQU0sVUFBVSxhQUFhO0FBRTdCLE1BQUk7QUFDRixVQUFNLEVBQUUsUUFBUSxVQUFVLE9BQU8sWUFBWTtBQUU3QyxVQUFNLGlCQUFpQixJQUFJLE1BQWM7QUFFekMsYUFBUyxRQUFRLEdBQUcsUUFBUSwyQkFBVyxTQUFTLEdBQUc7QUFFakQsWUFBTSxrQkFBa0IsSUFBSSxNQUF1QjtBQUNuRCxpQ0FBTSw2QkFBNkI7QUFFbkMsZUFBUyxJQUFJLEdBQUcsSUFBSSxvQkFBb0IsS0FBSyxHQUFHO0FBQzlDLGNBQU0sVUFBVSxTQUFTLEtBQUssTUFBTSxJQUFJLENBQUMsSUFBSSxTQUFTO0FBQ3RELGNBQU0sWUFBWSxJQUFJLElBQUksWUFBWTtBQUV0QyxjQUFNLG1CQUFtQixVQUFVLGFBQWE7QUFFaEQsWUFBSSxjQUFjLFdBQVc7QUFDM0IsMEJBQWdCLEtBQ2QsUUFBUSxZQUNOLFNBQ0EseUJBQXlCLElBQUksT0FBTyxzQkFDcEM7QUFBQSxZQUNFLFdBQVc7QUFBQSxZQUNYLFFBQVE7QUFBQSxVQUNWLENBQ0YsQ0FDRjtBQUVBLGNBQUksaUJBQWlCO0FBQ25CLDRCQUFnQixLQUNkLE1BQU0sZ0JBQWdCLFNBQVM7QUFBQSxjQUM3QixXQUFXLFVBQVUsYUFBYTtBQUFBLGNBQ2xDLFVBQVU7QUFBQSxnQkFDUjtBQUFBLGtCQUNFLFlBQVksUUFBUSxPQUFPO0FBQUEsa0JBQzNCLFdBQVc7QUFBQSxnQkFDYjtBQUFBLGNBQ0Y7QUFBQSxZQUNGLENBQUMsQ0FDSDtBQUFBLFVBQ0Y7QUFDQTtBQUFBLFFBQ0Y7QUFFQSx3QkFBZ0IsS0FDZCxNQUFNLGdCQUNKLFNBQ0EseUJBQXlCLElBQUksT0FBTyxzQkFDcEM7QUFBQSxVQUNFLFdBQVc7QUFBQSxVQUNYLGlCQUFpQixRQUFRLE9BQU87QUFBQSxRQUNsQyxDQUNGLENBQ0Y7QUFFQSxZQUFJLGlCQUFpQjtBQUNuQiwwQkFBZ0IsS0FDZCxRQUFRLGVBQWUsU0FBUztBQUFBLFlBQzlCLFdBQVcsVUFBVSxhQUFhO0FBQUEsWUFDbEMsbUJBQW1CLENBQUMsZ0JBQWdCO0FBQUEsWUFDcEMsTUFBTSwrQkFBWTtBQUFBLFVBQ3BCLENBQUMsQ0FDSDtBQUNBLDBCQUFnQixLQUNkLFFBQVEsZUFBZSxTQUFTO0FBQUEsWUFDOUIsV0FBVyxVQUFVLGFBQWE7QUFBQSxZQUNsQyxtQkFBbUIsQ0FBQyxnQkFBZ0I7QUFBQSxZQUNwQyxNQUFNLCtCQUFZO0FBQUEsVUFDcEIsQ0FBQyxDQUNIO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFFQSxpQ0FBTSwyQkFBMkI7QUFFakMsWUFBTSxXQUFXLE1BQU0sUUFBUSxJQUFJLGVBQWU7QUFHbEQ7QUFDRSxtQ0FBTSw4QkFBOEI7QUFHcEMsY0FBTSxRQUFRLG1DQUEyQjtBQUN2QyxnQkFBTSxRQUFRLElBQ1osU0FBUyxJQUFJLGFBQVc7QUFDdEIsbUJBQU8sT0FBTyxLQUFLLFNBQVMsT0FBTztBQUFBLFVBQ3JDLENBQUMsQ0FDSDtBQUFBLFFBQ0YsR0FOYztBQVFkLGNBQU0sTUFBTSxtQ0FBMkI7QUFDckMsZ0JBQU0sTUFBTSxNQUFNLFVBQVUsU0FBUztBQUNyQyxnQkFBTSxnQkFBZ0IsTUFBTSxJQUFJLGdCQUFnQjtBQUVoRCxrQkFBUSxJQUFJLGtCQUFrQixPQUFPLGFBQWE7QUFFbEQseUJBQWUsS0FBSyxjQUFjLGNBQWM7QUFFaEQsZ0JBQU0sSUFBSSxNQUFNO0FBQUEsUUFDbEIsR0FUWTtBQVdaLGNBQU0sUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQUEsTUFDcEM7QUFBQSxJQUNGO0FBR0EsUUFBSSxlQUFlLFdBQVcsR0FBRztBQUMvQixjQUFRLElBQUksaUJBQWlCLEVBQUUsZ0JBQWdCLDJCQUFNLGNBQWMsRUFBRSxDQUFDO0FBQUEsSUFDeEU7QUFBQSxFQUNGLFNBQVMsT0FBUDtBQUNBLFVBQU0sOEJBQVMsU0FBUztBQUN4QixVQUFNO0FBQUEsRUFDUixVQUFFO0FBQ0EsVUFBTSxVQUFVLFNBQVM7QUFBQSxFQUMzQjtBQUNGLEdBQUc7IiwKICAibmFtZXMiOiBbXQp9Cg==
