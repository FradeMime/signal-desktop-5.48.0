var import_chai = require("chai");
var import_InMemoryQueues = require("../../../jobs/helpers/InMemoryQueues");
describe("InMemoryQueues", () => {
  describe("get", () => {
    it("returns a new PQueue for each key", () => {
      const queues = new import_InMemoryQueues.InMemoryQueues();
      import_chai.assert.strictEqual(queues.get("a"), queues.get("a"));
      import_chai.assert.notStrictEqual(queues.get("a"), queues.get("b"));
      import_chai.assert.notStrictEqual(queues.get("b"), queues.get("c"));
    });
    it("returns a queue that only executes one thing at a time", () => {
      const queue = new import_InMemoryQueues.InMemoryQueues().get("foo");
      import_chai.assert.strictEqual(queue.concurrency, 1);
    });
    it("cleans up the queues when all tasks have run", async () => {
      const queues = new import_InMemoryQueues.InMemoryQueues();
      const originalQueue = queues.get("foo");
      originalQueue.pause();
      const tasksPromise = originalQueue.addAll([
        async () => {
          import_chai.assert.strictEqual(queues.get("foo"), originalQueue);
        },
        async () => {
          import_chai.assert.strictEqual(queues.get("foo"), originalQueue);
        }
      ]);
      originalQueue.start();
      await tasksPromise;
      import_chai.assert.notStrictEqual(queues.get("foo"), originalQueue);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW5NZW1vcnlRdWV1ZXNfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHsgSW5NZW1vcnlRdWV1ZXMgfSBmcm9tICcuLi8uLi8uLi9qb2JzL2hlbHBlcnMvSW5NZW1vcnlRdWV1ZXMnO1xuXG5kZXNjcmliZSgnSW5NZW1vcnlRdWV1ZXMnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdnZXQnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgYSBuZXcgUFF1ZXVlIGZvciBlYWNoIGtleScsICgpID0+IHtcbiAgICAgIGNvbnN0IHF1ZXVlcyA9IG5ldyBJbk1lbW9yeVF1ZXVlcygpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocXVldWVzLmdldCgnYScpLCBxdWV1ZXMuZ2V0KCdhJykpO1xuICAgICAgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKHF1ZXVlcy5nZXQoJ2EnKSwgcXVldWVzLmdldCgnYicpKTtcbiAgICAgIGFzc2VydC5ub3RTdHJpY3RFcXVhbChxdWV1ZXMuZ2V0KCdiJyksIHF1ZXVlcy5nZXQoJ2MnKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIHF1ZXVlIHRoYXQgb25seSBleGVjdXRlcyBvbmUgdGhpbmcgYXQgYSB0aW1lJywgKCkgPT4ge1xuICAgICAgY29uc3QgcXVldWUgPSBuZXcgSW5NZW1vcnlRdWV1ZXMoKS5nZXQoJ2ZvbycpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocXVldWUuY29uY3VycmVuY3ksIDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NsZWFucyB1cCB0aGUgcXVldWVzIHdoZW4gYWxsIHRhc2tzIGhhdmUgcnVuJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcXVldWVzID0gbmV3IEluTWVtb3J5UXVldWVzKCk7XG5cbiAgICAgIGNvbnN0IG9yaWdpbmFsUXVldWUgPSBxdWV1ZXMuZ2V0KCdmb28nKTtcblxuICAgICAgb3JpZ2luYWxRdWV1ZS5wYXVzZSgpO1xuICAgICAgY29uc3QgdGFza3NQcm9taXNlID0gb3JpZ2luYWxRdWV1ZS5hZGRBbGwoW1xuICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHF1ZXVlcy5nZXQoJ2ZvbycpLCBvcmlnaW5hbFF1ZXVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChxdWV1ZXMuZ2V0KCdmb28nKSwgb3JpZ2luYWxRdWV1ZSk7XG4gICAgICAgIH0sXG4gICAgICBdKTtcbiAgICAgIG9yaWdpbmFsUXVldWUuc3RhcnQoKTtcbiAgICAgIGF3YWl0IHRhc2tzUHJvbWlzZTtcblxuICAgICAgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKHF1ZXVlcy5nZXQoJ2ZvbycpLCBvcmlnaW5hbFF1ZXVlKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICJBQUdBLGtCQUF1QjtBQUV2Qiw0QkFBK0I7QUFFL0IsU0FBUyxrQkFBa0IsTUFBTTtBQUMvQixXQUFTLE9BQU8sTUFBTTtBQUNwQixPQUFHLHFDQUFxQyxNQUFNO0FBQzVDLFlBQU0sU0FBUyxJQUFJLHFDQUFlO0FBRWxDLHlCQUFPLFlBQVksT0FBTyxJQUFJLEdBQUcsR0FBRyxPQUFPLElBQUksR0FBRyxDQUFDO0FBQ25ELHlCQUFPLGVBQWUsT0FBTyxJQUFJLEdBQUcsR0FBRyxPQUFPLElBQUksR0FBRyxDQUFDO0FBQ3RELHlCQUFPLGVBQWUsT0FBTyxJQUFJLEdBQUcsR0FBRyxPQUFPLElBQUksR0FBRyxDQUFDO0FBQUEsSUFDeEQsQ0FBQztBQUVELE9BQUcsMERBQTBELE1BQU07QUFDakUsWUFBTSxRQUFRLElBQUkscUNBQWUsRUFBRSxJQUFJLEtBQUs7QUFFNUMseUJBQU8sWUFBWSxNQUFNLGFBQWEsQ0FBQztBQUFBLElBQ3pDLENBQUM7QUFFRCxPQUFHLGdEQUFnRCxZQUFZO0FBQzdELFlBQU0sU0FBUyxJQUFJLHFDQUFlO0FBRWxDLFlBQU0sZ0JBQWdCLE9BQU8sSUFBSSxLQUFLO0FBRXRDLG9CQUFjLE1BQU07QUFDcEIsWUFBTSxlQUFlLGNBQWMsT0FBTztBQUFBLFFBQ3hDLFlBQVk7QUFDViw2QkFBTyxZQUFZLE9BQU8sSUFBSSxLQUFLLEdBQUcsYUFBYTtBQUFBLFFBQ3JEO0FBQUEsUUFDQSxZQUFZO0FBQ1YsNkJBQU8sWUFBWSxPQUFPLElBQUksS0FBSyxHQUFHLGFBQWE7QUFBQSxRQUNyRDtBQUFBLE1BQ0YsQ0FBQztBQUNELG9CQUFjLE1BQU07QUFDcEIsWUFBTTtBQUVOLHlCQUFPLGVBQWUsT0FBTyxJQUFJLEtBQUssR0FBRyxhQUFhO0FBQUEsSUFDeEQsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
