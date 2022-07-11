var import_chai = require("chai");
var import_BackOff = require("../../util/BackOff");
describe("BackOff", () => {
  it("should return increasing timeouts", () => {
    const b = new import_BackOff.BackOff([1, 2, 3]);
    import_chai.assert.strictEqual(b.getIndex(), 0);
    import_chai.assert.strictEqual(b.isFull(), false);
    import_chai.assert.strictEqual(b.get(), 1);
    import_chai.assert.strictEqual(b.getAndIncrement(), 1);
    import_chai.assert.strictEqual(b.get(), 2);
    import_chai.assert.strictEqual(b.getIndex(), 1);
    import_chai.assert.strictEqual(b.isFull(), false);
    import_chai.assert.strictEqual(b.getAndIncrement(), 2);
    import_chai.assert.strictEqual(b.getIndex(), 2);
    import_chai.assert.strictEqual(b.isFull(), true);
    import_chai.assert.strictEqual(b.getAndIncrement(), 3);
    import_chai.assert.strictEqual(b.getIndex(), 2);
    import_chai.assert.strictEqual(b.isFull(), true);
    import_chai.assert.strictEqual(b.getAndIncrement(), 3);
    import_chai.assert.strictEqual(b.getIndex(), 2);
    import_chai.assert.strictEqual(b.isFull(), true);
  });
  it("should reset", () => {
    const b = new import_BackOff.BackOff([1, 2, 3]);
    import_chai.assert.strictEqual(b.getAndIncrement(), 1);
    import_chai.assert.strictEqual(b.getAndIncrement(), 2);
    b.reset();
    import_chai.assert.strictEqual(b.getAndIncrement(), 1);
    import_chai.assert.strictEqual(b.getAndIncrement(), 2);
  });
  it("should apply jitter", () => {
    const b = new import_BackOff.BackOff([1, 2, 3], {
      jitter: 1,
      random: () => 0.5
    });
    import_chai.assert.strictEqual(b.getIndex(), 0);
    import_chai.assert.strictEqual(b.isFull(), false);
    import_chai.assert.strictEqual(b.get(), 1);
    import_chai.assert.strictEqual(b.getAndIncrement(), 1);
    import_chai.assert.strictEqual(b.get(), 2.5);
    import_chai.assert.strictEqual(b.getIndex(), 1);
    import_chai.assert.strictEqual(b.isFull(), false);
    import_chai.assert.strictEqual(b.getAndIncrement(), 2.5);
    import_chai.assert.strictEqual(b.getIndex(), 2);
    import_chai.assert.strictEqual(b.isFull(), true);
    import_chai.assert.strictEqual(b.getAndIncrement(), 3.5);
    import_chai.assert.strictEqual(b.getIndex(), 2);
    import_chai.assert.strictEqual(b.isFull(), true);
    import_chai.assert.strictEqual(b.getAndIncrement(), 3.5);
    import_chai.assert.strictEqual(b.getIndex(), 2);
    import_chai.assert.strictEqual(b.isFull(), true);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQmFja09mZl90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgeyBCYWNrT2ZmIH0gZnJvbSAnLi4vLi4vdXRpbC9CYWNrT2ZmJztcblxuZGVzY3JpYmUoJ0JhY2tPZmYnLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgcmV0dXJuIGluY3JlYXNpbmcgdGltZW91dHMnLCAoKSA9PiB7XG4gICAgY29uc3QgYiA9IG5ldyBCYWNrT2ZmKFsxLCAyLCAzXSk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYi5nZXRJbmRleCgpLCAwKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYi5pc0Z1bGwoKSwgZmFsc2UpO1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGIuZ2V0KCksIDEpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChiLmdldEFuZEluY3JlbWVudCgpLCAxKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYi5nZXQoKSwgMik7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGIuZ2V0SW5kZXgoKSwgMSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGIuaXNGdWxsKCksIGZhbHNlKTtcblxuICAgIGFzc2VydC5zdHJpY3RFcXVhbChiLmdldEFuZEluY3JlbWVudCgpLCAyKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYi5nZXRJbmRleCgpLCAyKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYi5pc0Z1bGwoKSwgdHJ1ZSk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYi5nZXRBbmRJbmNyZW1lbnQoKSwgMyk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGIuZ2V0SW5kZXgoKSwgMik7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGIuaXNGdWxsKCksIHRydWUpO1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGIuZ2V0QW5kSW5jcmVtZW50KCksIDMpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChiLmdldEluZGV4KCksIDIpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChiLmlzRnVsbCgpLCB0cnVlKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZXNldCcsICgpID0+IHtcbiAgICBjb25zdCBiID0gbmV3IEJhY2tPZmYoWzEsIDIsIDNdKTtcblxuICAgIGFzc2VydC5zdHJpY3RFcXVhbChiLmdldEFuZEluY3JlbWVudCgpLCAxKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYi5nZXRBbmRJbmNyZW1lbnQoKSwgMik7XG5cbiAgICBiLnJlc2V0KCk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYi5nZXRBbmRJbmNyZW1lbnQoKSwgMSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGIuZ2V0QW5kSW5jcmVtZW50KCksIDIpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGFwcGx5IGppdHRlcicsICgpID0+IHtcbiAgICBjb25zdCBiID0gbmV3IEJhY2tPZmYoWzEsIDIsIDNdLCB7XG4gICAgICBqaXR0ZXI6IDEsXG4gICAgICByYW5kb206ICgpID0+IDAuNSxcbiAgICB9KTtcblxuICAgIGFzc2VydC5zdHJpY3RFcXVhbChiLmdldEluZGV4KCksIDApO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChiLmlzRnVsbCgpLCBmYWxzZSk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYi5nZXQoKSwgMSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGIuZ2V0QW5kSW5jcmVtZW50KCksIDEpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChiLmdldCgpLCAyLjUpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChiLmdldEluZGV4KCksIDEpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChiLmlzRnVsbCgpLCBmYWxzZSk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYi5nZXRBbmRJbmNyZW1lbnQoKSwgMi41KTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYi5nZXRJbmRleCgpLCAyKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYi5pc0Z1bGwoKSwgdHJ1ZSk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYi5nZXRBbmRJbmNyZW1lbnQoKSwgMy41KTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYi5nZXRJbmRleCgpLCAyKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYi5pc0Z1bGwoKSwgdHJ1ZSk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYi5nZXRBbmRJbmNyZW1lbnQoKSwgMy41KTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYi5nZXRJbmRleCgpLCAyKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYi5pc0Z1bGwoKSwgdHJ1ZSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIscUJBQXdCO0FBRXhCLFNBQVMsV0FBVyxNQUFNO0FBQ3hCLEtBQUcscUNBQXFDLE1BQU07QUFDNUMsVUFBTSxJQUFJLElBQUksdUJBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBRS9CLHVCQUFPLFlBQVksRUFBRSxTQUFTLEdBQUcsQ0FBQztBQUNsQyx1QkFBTyxZQUFZLEVBQUUsT0FBTyxHQUFHLEtBQUs7QUFFcEMsdUJBQU8sWUFBWSxFQUFFLElBQUksR0FBRyxDQUFDO0FBQzdCLHVCQUFPLFlBQVksRUFBRSxnQkFBZ0IsR0FBRyxDQUFDO0FBQ3pDLHVCQUFPLFlBQVksRUFBRSxJQUFJLEdBQUcsQ0FBQztBQUM3Qix1QkFBTyxZQUFZLEVBQUUsU0FBUyxHQUFHLENBQUM7QUFDbEMsdUJBQU8sWUFBWSxFQUFFLE9BQU8sR0FBRyxLQUFLO0FBRXBDLHVCQUFPLFlBQVksRUFBRSxnQkFBZ0IsR0FBRyxDQUFDO0FBQ3pDLHVCQUFPLFlBQVksRUFBRSxTQUFTLEdBQUcsQ0FBQztBQUNsQyx1QkFBTyxZQUFZLEVBQUUsT0FBTyxHQUFHLElBQUk7QUFFbkMsdUJBQU8sWUFBWSxFQUFFLGdCQUFnQixHQUFHLENBQUM7QUFDekMsdUJBQU8sWUFBWSxFQUFFLFNBQVMsR0FBRyxDQUFDO0FBQ2xDLHVCQUFPLFlBQVksRUFBRSxPQUFPLEdBQUcsSUFBSTtBQUVuQyx1QkFBTyxZQUFZLEVBQUUsZ0JBQWdCLEdBQUcsQ0FBQztBQUN6Qyx1QkFBTyxZQUFZLEVBQUUsU0FBUyxHQUFHLENBQUM7QUFDbEMsdUJBQU8sWUFBWSxFQUFFLE9BQU8sR0FBRyxJQUFJO0FBQUEsRUFDckMsQ0FBQztBQUVELEtBQUcsZ0JBQWdCLE1BQU07QUFDdkIsVUFBTSxJQUFJLElBQUksdUJBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBRS9CLHVCQUFPLFlBQVksRUFBRSxnQkFBZ0IsR0FBRyxDQUFDO0FBQ3pDLHVCQUFPLFlBQVksRUFBRSxnQkFBZ0IsR0FBRyxDQUFDO0FBRXpDLE1BQUUsTUFBTTtBQUVSLHVCQUFPLFlBQVksRUFBRSxnQkFBZ0IsR0FBRyxDQUFDO0FBQ3pDLHVCQUFPLFlBQVksRUFBRSxnQkFBZ0IsR0FBRyxDQUFDO0FBQUEsRUFDM0MsQ0FBQztBQUVELEtBQUcsdUJBQXVCLE1BQU07QUFDOUIsVUFBTSxJQUFJLElBQUksdUJBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHO0FBQUEsTUFDL0IsUUFBUTtBQUFBLE1BQ1IsUUFBUSxNQUFNO0FBQUEsSUFDaEIsQ0FBQztBQUVELHVCQUFPLFlBQVksRUFBRSxTQUFTLEdBQUcsQ0FBQztBQUNsQyx1QkFBTyxZQUFZLEVBQUUsT0FBTyxHQUFHLEtBQUs7QUFFcEMsdUJBQU8sWUFBWSxFQUFFLElBQUksR0FBRyxDQUFDO0FBQzdCLHVCQUFPLFlBQVksRUFBRSxnQkFBZ0IsR0FBRyxDQUFDO0FBQ3pDLHVCQUFPLFlBQVksRUFBRSxJQUFJLEdBQUcsR0FBRztBQUMvQix1QkFBTyxZQUFZLEVBQUUsU0FBUyxHQUFHLENBQUM7QUFDbEMsdUJBQU8sWUFBWSxFQUFFLE9BQU8sR0FBRyxLQUFLO0FBRXBDLHVCQUFPLFlBQVksRUFBRSxnQkFBZ0IsR0FBRyxHQUFHO0FBQzNDLHVCQUFPLFlBQVksRUFBRSxTQUFTLEdBQUcsQ0FBQztBQUNsQyx1QkFBTyxZQUFZLEVBQUUsT0FBTyxHQUFHLElBQUk7QUFFbkMsdUJBQU8sWUFBWSxFQUFFLGdCQUFnQixHQUFHLEdBQUc7QUFDM0MsdUJBQU8sWUFBWSxFQUFFLFNBQVMsR0FBRyxDQUFDO0FBQ2xDLHVCQUFPLFlBQVksRUFBRSxPQUFPLEdBQUcsSUFBSTtBQUVuQyx1QkFBTyxZQUFZLEVBQUUsZ0JBQWdCLEdBQUcsR0FBRztBQUMzQyx1QkFBTyxZQUFZLEVBQUUsU0FBUyxHQUFHLENBQUM7QUFDbEMsdUJBQU8sWUFBWSxFQUFFLE9BQU8sR0FBRyxJQUFJO0FBQUEsRUFDckMsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
