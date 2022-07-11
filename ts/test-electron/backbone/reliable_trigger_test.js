var import_chai = require("chai");
var import_backbone = require("backbone");
describe("reliable trigger", () => {
  describe("trigger", () => {
    let model;
    beforeEach(() => {
      model = new import_backbone.Model();
    });
    it("returns successfully if this._events is falsey", () => {
      model._events = null;
      model.trigger("click");
    });
    it("handles space-separated list of events to trigger", () => {
      let a = false;
      let b = false;
      model.on("a", () => {
        a = true;
      });
      model.on("b", () => {
        b = true;
      });
      model.trigger("a b");
      import_chai.assert.strictEqual(a, true);
      import_chai.assert.strictEqual(b, true);
    });
    it('calls all clients registered for "all" event', () => {
      let count = 0;
      model.on("all", () => {
        count += 1;
      });
      model.trigger("left");
      model.trigger("right");
      import_chai.assert.strictEqual(count, 2);
    });
    it("calls all clients registered for target event", () => {
      let a = false;
      let b = false;
      model.on("event", () => {
        a = true;
      });
      model.on("event", () => {
        b = true;
      });
      model.trigger("event");
      import_chai.assert.strictEqual(a, true);
      import_chai.assert.strictEqual(b, true);
    });
    it("successfully returns and calls all clients even if first failed", () => {
      let a = false;
      let b = false;
      model.on("event", () => {
        a = true;
        throw new Error("a is set, but exception is thrown");
      });
      model.on("event", () => {
        b = true;
      });
      model.trigger("event");
      import_chai.assert.strictEqual(a, true);
      import_chai.assert.strictEqual(b, true);
    });
    it("calls clients with no args", () => {
      let called = false;
      model.on("event", () => {
        called = true;
      });
      model.trigger("event");
      import_chai.assert.strictEqual(called, true);
    });
    it("calls clients with 1 arg", () => {
      let args = [];
      model.on("event", (...eventArgs) => {
        args = eventArgs;
      });
      model.trigger("event", 1);
      import_chai.assert.strictEqual(args[0], 1);
    });
    it("calls clients with 2 args", () => {
      let args = [];
      model.on("event", (...eventArgs) => {
        args = eventArgs;
      });
      model.trigger("event", 1, 2);
      import_chai.assert.strictEqual(args[0], 1);
      import_chai.assert.strictEqual(args[1], 2);
    });
    it("calls clients with 3 args", () => {
      let args = [];
      model.on("event", (...eventArgs) => {
        args = eventArgs;
      });
      model.trigger("event", 1, 2, 3);
      import_chai.assert.strictEqual(args[0], 1);
      import_chai.assert.strictEqual(args[1], 2);
      import_chai.assert.strictEqual(args[2], 3);
    });
    it("calls clients with 4+ args", () => {
      let args = [];
      model.on("event", (...eventArgs) => {
        args = eventArgs;
      });
      model.trigger("event", 1, 2, 3, 4);
      import_chai.assert.strictEqual(args[0], 1);
      import_chai.assert.strictEqual(args[1], 2);
      import_chai.assert.strictEqual(args[2], 3);
      import_chai.assert.strictEqual(args[3], 4);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVsaWFibGVfdHJpZ2dlcl90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxNy0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJ2JhY2tib25lJztcblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuXG5kZXNjcmliZSgncmVsaWFibGUgdHJpZ2dlcicsICgpID0+IHtcbiAgZGVzY3JpYmUoJ3RyaWdnZXInLCAoKSA9PiB7XG4gICAgbGV0IG1vZGVsOiBNb2RlbDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9kZWwgPSBuZXcgTW9kZWwoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHN1Y2Nlc3NmdWxseSBpZiB0aGlzLl9ldmVudHMgaXMgZmFsc2V5JywgKCkgPT4ge1xuICAgICAgKG1vZGVsIGFzIGFueSkuX2V2ZW50cyA9IG51bGw7XG4gICAgICBtb2RlbC50cmlnZ2VyKCdjbGljaycpO1xuICAgIH0pO1xuICAgIGl0KCdoYW5kbGVzIHNwYWNlLXNlcGFyYXRlZCBsaXN0IG9mIGV2ZW50cyB0byB0cmlnZ2VyJywgKCkgPT4ge1xuICAgICAgbGV0IGEgPSBmYWxzZTtcbiAgICAgIGxldCBiID0gZmFsc2U7XG5cbiAgICAgIG1vZGVsLm9uKCdhJywgKCkgPT4ge1xuICAgICAgICBhID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgbW9kZWwub24oJ2InLCAoKSA9PiB7XG4gICAgICAgIGIgPSB0cnVlO1xuICAgICAgfSk7XG5cbiAgICAgIG1vZGVsLnRyaWdnZXIoJ2EgYicpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYSwgdHJ1ZSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYiwgdHJ1ZSk7XG4gICAgfSk7XG4gICAgaXQoJ2NhbGxzIGFsbCBjbGllbnRzIHJlZ2lzdGVyZWQgZm9yIFwiYWxsXCIgZXZlbnQnLCAoKSA9PiB7XG4gICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgbW9kZWwub24oJ2FsbCcsICgpID0+IHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgIH0pO1xuXG4gICAgICBtb2RlbC50cmlnZ2VyKCdsZWZ0Jyk7XG4gICAgICBtb2RlbC50cmlnZ2VyKCdyaWdodCcpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY291bnQsIDIpO1xuICAgIH0pO1xuICAgIGl0KCdjYWxscyBhbGwgY2xpZW50cyByZWdpc3RlcmVkIGZvciB0YXJnZXQgZXZlbnQnLCAoKSA9PiB7XG4gICAgICBsZXQgYSA9IGZhbHNlO1xuICAgICAgbGV0IGIgPSBmYWxzZTtcblxuICAgICAgbW9kZWwub24oJ2V2ZW50JywgKCkgPT4ge1xuICAgICAgICBhID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgbW9kZWwub24oJ2V2ZW50JywgKCkgPT4ge1xuICAgICAgICBiID0gdHJ1ZTtcbiAgICAgIH0pO1xuXG4gICAgICBtb2RlbC50cmlnZ2VyKCdldmVudCcpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYSwgdHJ1ZSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYiwgdHJ1ZSk7XG4gICAgfSk7XG4gICAgaXQoJ3N1Y2Nlc3NmdWxseSByZXR1cm5zIGFuZCBjYWxscyBhbGwgY2xpZW50cyBldmVuIGlmIGZpcnN0IGZhaWxlZCcsICgpID0+IHtcbiAgICAgIGxldCBhID0gZmFsc2U7XG4gICAgICBsZXQgYiA9IGZhbHNlO1xuXG4gICAgICBtb2RlbC5vbignZXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIGEgPSB0cnVlO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2EgaXMgc2V0LCBidXQgZXhjZXB0aW9uIGlzIHRocm93bicpO1xuICAgICAgfSk7XG4gICAgICBtb2RlbC5vbignZXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIGIgPSB0cnVlO1xuICAgICAgfSk7XG5cbiAgICAgIG1vZGVsLnRyaWdnZXIoJ2V2ZW50Jyk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhLCB0cnVlKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChiLCB0cnVlKTtcbiAgICB9KTtcbiAgICBpdCgnY2FsbHMgY2xpZW50cyB3aXRoIG5vIGFyZ3MnLCAoKSA9PiB7XG4gICAgICBsZXQgY2FsbGVkID0gZmFsc2U7XG4gICAgICBtb2RlbC5vbignZXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICB9KTtcblxuICAgICAgbW9kZWwudHJpZ2dlcignZXZlbnQnKTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNhbGxlZCwgdHJ1ZSk7XG4gICAgfSk7XG4gICAgaXQoJ2NhbGxzIGNsaWVudHMgd2l0aCAxIGFyZycsICgpID0+IHtcbiAgICAgIGxldCBhcmdzOiBBcnJheTx1bmtub3duPiA9IFtdO1xuICAgICAgbW9kZWwub24oJ2V2ZW50JywgKC4uLmV2ZW50QXJncykgPT4ge1xuICAgICAgICBhcmdzID0gZXZlbnRBcmdzO1xuICAgICAgfSk7XG5cbiAgICAgIG1vZGVsLnRyaWdnZXIoJ2V2ZW50JywgMSk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhcmdzWzBdLCAxKTtcbiAgICB9KTtcbiAgICBpdCgnY2FsbHMgY2xpZW50cyB3aXRoIDIgYXJncycsICgpID0+IHtcbiAgICAgIGxldCBhcmdzOiBBcnJheTx1bmtub3duPiA9IFtdO1xuICAgICAgbW9kZWwub24oJ2V2ZW50JywgKC4uLmV2ZW50QXJncykgPT4ge1xuICAgICAgICBhcmdzID0gZXZlbnRBcmdzO1xuICAgICAgfSk7XG5cbiAgICAgIG1vZGVsLnRyaWdnZXIoJ2V2ZW50JywgMSwgMik7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhcmdzWzBdLCAxKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhcmdzWzFdLCAyKTtcbiAgICB9KTtcbiAgICBpdCgnY2FsbHMgY2xpZW50cyB3aXRoIDMgYXJncycsICgpID0+IHtcbiAgICAgIGxldCBhcmdzOiBBcnJheTx1bmtub3duPiA9IFtdO1xuICAgICAgbW9kZWwub24oJ2V2ZW50JywgKC4uLmV2ZW50QXJncykgPT4ge1xuICAgICAgICBhcmdzID0gZXZlbnRBcmdzO1xuICAgICAgfSk7XG5cbiAgICAgIG1vZGVsLnRyaWdnZXIoJ2V2ZW50JywgMSwgMiwgMyk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhcmdzWzBdLCAxKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhcmdzWzFdLCAyKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhcmdzWzJdLCAzKTtcbiAgICB9KTtcbiAgICBpdCgnY2FsbHMgY2xpZW50cyB3aXRoIDQrIGFyZ3MnLCAoKSA9PiB7XG4gICAgICBsZXQgYXJnczogQXJyYXk8dW5rbm93bj4gPSBbXTtcbiAgICAgIG1vZGVsLm9uKCdldmVudCcsICguLi5ldmVudEFyZ3MpID0+IHtcbiAgICAgICAgYXJncyA9IGV2ZW50QXJncztcbiAgICAgIH0pO1xuXG4gICAgICBtb2RlbC50cmlnZ2VyKCdldmVudCcsIDEsIDIsIDMsIDQpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYXJnc1swXSwgMSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYXJnc1sxXSwgMik7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYXJnc1syXSwgMyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYXJnc1szXSwgNCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFDdkIsc0JBQXNCO0FBSXRCLFNBQVMsb0JBQW9CLE1BQU07QUFDakMsV0FBUyxXQUFXLE1BQU07QUFDeEIsUUFBSTtBQUVK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
