var import_chai = require("chai");
var import_MessageReadStatus = require("../../messages/MessageReadStatus");
var import_isMessageUnread = require("../../util/isMessageUnread");
describe("isMessageUnread", () => {
  it("returns false if the message's `readStatus` field is undefined", () => {
    import_chai.assert.isFalse((0, import_isMessageUnread.isMessageUnread)({}));
    import_chai.assert.isFalse((0, import_isMessageUnread.isMessageUnread)({ readStatus: void 0 }));
  });
  it("returns false if the message is read or viewed", () => {
    import_chai.assert.isFalse((0, import_isMessageUnread.isMessageUnread)({ readStatus: import_MessageReadStatus.ReadStatus.Read }));
    import_chai.assert.isFalse((0, import_isMessageUnread.isMessageUnread)({ readStatus: import_MessageReadStatus.ReadStatus.Viewed }));
  });
  it("returns true if the message is unread", () => {
    import_chai.assert.isTrue((0, import_isMessageUnread.isMessageUnread)({ readStatus: import_MessageReadStatus.ReadStatus.Unread }));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNNZXNzYWdlVW5yZWFkX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyBSZWFkU3RhdHVzIH0gZnJvbSAnLi4vLi4vbWVzc2FnZXMvTWVzc2FnZVJlYWRTdGF0dXMnO1xuXG5pbXBvcnQgeyBpc01lc3NhZ2VVbnJlYWQgfSBmcm9tICcuLi8uLi91dGlsL2lzTWVzc2FnZVVucmVhZCc7XG5cbmRlc2NyaWJlKCdpc01lc3NhZ2VVbnJlYWQnLCAoKSA9PiB7XG4gIGl0KFwicmV0dXJucyBmYWxzZSBpZiB0aGUgbWVzc2FnZSdzIGByZWFkU3RhdHVzYCBmaWVsZCBpcyB1bmRlZmluZWRcIiwgKCkgPT4ge1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzTWVzc2FnZVVucmVhZCh7fSkpO1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzTWVzc2FnZVVucmVhZCh7IHJlYWRTdGF0dXM6IHVuZGVmaW5lZCB9KSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBtZXNzYWdlIGlzIHJlYWQgb3Igdmlld2VkJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzTWVzc2FnZVVucmVhZCh7IHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuUmVhZCB9KSk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoaXNNZXNzYWdlVW5yZWFkKHsgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5WaWV3ZWQgfSkpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBtZXNzYWdlIGlzIHVucmVhZCcsICgpID0+IHtcbiAgICBhc3NlcnQuaXNUcnVlKGlzTWVzc2FnZVVucmVhZCh7IHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuVW5yZWFkIH0pKTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICJBQUdBLGtCQUF1QjtBQUN2QiwrQkFBMkI7QUFFM0IsNkJBQWdDO0FBRWhDLFNBQVMsbUJBQW1CLE1BQU07QUFDaEMsS0FBRyxrRUFBa0UsTUFBTTtBQUN6RSx1QkFBTyxRQUFRLDRDQUFnQixDQUFDLENBQUMsQ0FBQztBQUNsQyx1QkFBTyxRQUFRLDRDQUFnQixFQUFFLFlBQVksT0FBVSxDQUFDLENBQUM7QUFBQSxFQUMzRCxDQUFDO0FBRUQsS0FBRyxrREFBa0QsTUFBTTtBQUN6RCx1QkFBTyxRQUFRLDRDQUFnQixFQUFFLFlBQVksb0NBQVcsS0FBSyxDQUFDLENBQUM7QUFDL0QsdUJBQU8sUUFBUSw0Q0FBZ0IsRUFBRSxZQUFZLG9DQUFXLE9BQU8sQ0FBQyxDQUFDO0FBQUEsRUFDbkUsQ0FBQztBQUVELEtBQUcseUNBQXlDLE1BQU07QUFDaEQsdUJBQU8sT0FBTyw0Q0FBZ0IsRUFBRSxZQUFZLG9DQUFXLE9BQU8sQ0FBQyxDQUFDO0FBQUEsRUFDbEUsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==