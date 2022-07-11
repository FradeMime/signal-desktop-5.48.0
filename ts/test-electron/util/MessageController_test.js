var import_chai = require("chai");
var import_messages = require("../../models/messages");
var import_MessageController = require("../../util/MessageController");
describe("MessageController", () => {
  describe("filterBySentAt", () => {
    it("returns an empty iterable if no messages match", () => {
      const mc = new import_MessageController.MessageController();
      import_chai.assert.isEmpty([...mc.filterBySentAt(123)]);
    });
    it("returns all messages that match the timestamp", () => {
      const mc = new import_MessageController.MessageController();
      const message1 = new import_messages.MessageModel({
        conversationId: "xyz",
        id: "abc",
        received_at: 1,
        sent_at: 1234,
        timestamp: 9999,
        type: "incoming"
      });
      const message2 = new import_messages.MessageModel({
        conversationId: "xyz",
        id: "def",
        received_at: 2,
        sent_at: 1234,
        timestamp: 9999,
        type: "outgoing"
      });
      const message3 = new import_messages.MessageModel({
        conversationId: "xyz",
        id: "ignored",
        received_at: 3,
        sent_at: 5678,
        timestamp: 9999,
        type: "outgoing"
      });
      mc.register(message1.id, message1);
      mc.register(message2.id, message2);
      mc.register(message2.id, message2);
      mc.register(message3.id, message3);
      import_chai.assert.sameMembers([...mc.filterBySentAt(1234)], [message1, message2]);
      mc.unregister(message2.id);
      import_chai.assert.sameMembers([...mc.filterBySentAt(1234)], [message1]);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZUNvbnRyb2xsZXJfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCB7IE1lc3NhZ2VNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9tZXNzYWdlcyc7XG5cbmltcG9ydCB7IE1lc3NhZ2VDb250cm9sbGVyIH0gZnJvbSAnLi4vLi4vdXRpbC9NZXNzYWdlQ29udHJvbGxlcic7XG5cbmRlc2NyaWJlKCdNZXNzYWdlQ29udHJvbGxlcicsICgpID0+IHtcbiAgZGVzY3JpYmUoJ2ZpbHRlckJ5U2VudEF0JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGFuIGVtcHR5IGl0ZXJhYmxlIGlmIG5vIG1lc3NhZ2VzIG1hdGNoJywgKCkgPT4ge1xuICAgICAgY29uc3QgbWMgPSBuZXcgTWVzc2FnZUNvbnRyb2xsZXIoKTtcblxuICAgICAgYXNzZXJ0LmlzRW1wdHkoWy4uLm1jLmZpbHRlckJ5U2VudEF0KDEyMyldKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGFsbCBtZXNzYWdlcyB0aGF0IG1hdGNoIHRoZSB0aW1lc3RhbXAnLCAoKSA9PiB7XG4gICAgICBjb25zdCBtYyA9IG5ldyBNZXNzYWdlQ29udHJvbGxlcigpO1xuICAgICAgY29uc3QgbWVzc2FnZTEgPSBuZXcgTWVzc2FnZU1vZGVsKHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6ICd4eXonLFxuICAgICAgICBpZDogJ2FiYycsXG4gICAgICAgIHJlY2VpdmVkX2F0OiAxLFxuICAgICAgICBzZW50X2F0OiAxMjM0LFxuICAgICAgICB0aW1lc3RhbXA6IDk5OTksXG4gICAgICAgIHR5cGU6ICdpbmNvbWluZycsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UyID0gbmV3IE1lc3NhZ2VNb2RlbCh7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiAneHl6JyxcbiAgICAgICAgaWQ6ICdkZWYnLFxuICAgICAgICByZWNlaXZlZF9hdDogMixcbiAgICAgICAgc2VudF9hdDogMTIzNCxcbiAgICAgICAgdGltZXN0YW1wOiA5OTk5LFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBtZXNzYWdlMyA9IG5ldyBNZXNzYWdlTW9kZWwoe1xuICAgICAgICBjb252ZXJzYXRpb25JZDogJ3h5eicsXG4gICAgICAgIGlkOiAnaWdub3JlZCcsXG4gICAgICAgIHJlY2VpdmVkX2F0OiAzLFxuICAgICAgICBzZW50X2F0OiA1Njc4LFxuICAgICAgICB0aW1lc3RhbXA6IDk5OTksXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICB9KTtcbiAgICAgIG1jLnJlZ2lzdGVyKG1lc3NhZ2UxLmlkLCBtZXNzYWdlMSk7XG4gICAgICBtYy5yZWdpc3RlcihtZXNzYWdlMi5pZCwgbWVzc2FnZTIpO1xuICAgICAgLy8gV2UgZGVsaWJlcmF0ZWx5IHJlZ2lzdGVyIHRoaXMgbWVzc2FnZSB0d2ljZSBmb3IgdGVzdGluZy5cbiAgICAgIG1jLnJlZ2lzdGVyKG1lc3NhZ2UyLmlkLCBtZXNzYWdlMik7XG4gICAgICBtYy5yZWdpc3RlcihtZXNzYWdlMy5pZCwgbWVzc2FnZTMpO1xuXG4gICAgICBhc3NlcnQuc2FtZU1lbWJlcnMoWy4uLm1jLmZpbHRlckJ5U2VudEF0KDEyMzQpXSwgW21lc3NhZ2UxLCBtZXNzYWdlMl0pO1xuXG4gICAgICBtYy51bnJlZ2lzdGVyKG1lc3NhZ2UyLmlkKTtcblxuICAgICAgYXNzZXJ0LnNhbWVNZW1iZXJzKFsuLi5tYy5maWx0ZXJCeVNlbnRBdCgxMjM0KV0sIFttZXNzYWdlMV0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBQ3ZCLHNCQUE2QjtBQUU3QiwrQkFBa0M7QUFFbEMsU0FBUyxxQkFBcUIsTUFBTTtBQUNsQyxXQUFTLGtCQUFrQixNQUFNO0FBQy9CLE9BQUcsa0RBQWtELE1BQU07QUFDekQsWUFBTSxLQUFLLElBQUksMkNBQWtCO0FBRWpDLHlCQUFPLFFBQVEsQ0FBQyxHQUFHLEdBQUcsZUFBZSxHQUFHLENBQUMsQ0FBQztBQUFBLElBQzVDLENBQUM7QUFFRCxPQUFHLGlEQUFpRCxNQUFNO0FBQ3hELFlBQU0sS0FBSyxJQUFJLDJDQUFrQjtBQUNqQyxZQUFNLFdBQVcsSUFBSSw2QkFBYTtBQUFBLFFBQ2hDLGdCQUFnQjtBQUFBLFFBQ2hCLElBQUk7QUFBQSxRQUNKLGFBQWE7QUFBQSxRQUNiLFNBQVM7QUFBQSxRQUNULFdBQVc7QUFBQSxRQUNYLE1BQU07QUFBQSxNQUNSLENBQUM7QUFDRCxZQUFNLFdBQVcsSUFBSSw2QkFBYTtBQUFBLFFBQ2hDLGdCQUFnQjtBQUFBLFFBQ2hCLElBQUk7QUFBQSxRQUNKLGFBQWE7QUFBQSxRQUNiLFNBQVM7QUFBQSxRQUNULFdBQVc7QUFBQSxRQUNYLE1BQU07QUFBQSxNQUNSLENBQUM7QUFDRCxZQUFNLFdBQVcsSUFBSSw2QkFBYTtBQUFBLFFBQ2hDLGdCQUFnQjtBQUFBLFFBQ2hCLElBQUk7QUFBQSxRQUNKLGFBQWE7QUFBQSxRQUNiLFNBQVM7QUFBQSxRQUNULFdBQVc7QUFBQSxRQUNYLE1BQU07QUFBQSxNQUNSLENBQUM7QUFDRCxTQUFHLFNBQVMsU0FBUyxJQUFJLFFBQVE7QUFDakMsU0FBRyxTQUFTLFNBQVMsSUFBSSxRQUFRO0FBRWpDLFNBQUcsU0FBUyxTQUFTLElBQUksUUFBUTtBQUNqQyxTQUFHLFNBQVMsU0FBUyxJQUFJLFFBQVE7QUFFakMseUJBQU8sWUFBWSxDQUFDLEdBQUcsR0FBRyxlQUFlLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxRQUFRLENBQUM7QUFFckUsU0FBRyxXQUFXLFNBQVMsRUFBRTtBQUV6Qix5QkFBTyxZQUFZLENBQUMsR0FBRyxHQUFHLGVBQWUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7QUFBQSxJQUM3RCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
