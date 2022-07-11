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
var import_chai = require("chai");
var import_callingNotification = require("../../util/callingNotification");
var import_Calling = require("../../types/Calling");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
describe("calling notification helpers", () => {
  const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
  describe("getCallingNotificationText", () => {
    it("says that the call has ended", () => {
      import_chai.assert.strictEqual((0, import_callingNotification.getCallingNotificationText)({
        callMode: import_Calling.CallMode.Group,
        conversationId: "abc123",
        ended: true,
        deviceCount: 1,
        maxDevices: 23,
        startedTime: Date.now()
      }, i18n), "The group call has ended");
    });
    it("includes the creator's first name when describing a call", () => {
      import_chai.assert.strictEqual((0, import_callingNotification.getCallingNotificationText)({
        callMode: import_Calling.CallMode.Group,
        conversationId: "abc123",
        creator: {
          firstName: "Luigi",
          isMe: false,
          title: "Luigi Mario"
        },
        ended: false,
        deviceCount: 1,
        maxDevices: 23,
        startedTime: Date.now()
      }, i18n), "Luigi started a group call");
    });
    it("if the creator doesn't have a first name, falls back to their title", () => {
      import_chai.assert.strictEqual((0, import_callingNotification.getCallingNotificationText)({
        callMode: import_Calling.CallMode.Group,
        conversationId: "abc123",
        creator: {
          isMe: false,
          title: "Luigi Mario"
        },
        ended: false,
        deviceCount: 1,
        maxDevices: 23,
        startedTime: Date.now()
      }, i18n), "Luigi Mario started a group call");
    });
    it("has a special message if you were the one to start the call", () => {
      import_chai.assert.strictEqual((0, import_callingNotification.getCallingNotificationText)({
        callMode: import_Calling.CallMode.Group,
        conversationId: "abc123",
        creator: {
          firstName: "ShouldBeIgnored",
          isMe: true,
          title: "ShouldBeIgnored Smith"
        },
        ended: false,
        deviceCount: 1,
        maxDevices: 23,
        startedTime: Date.now()
      }, i18n), "You started a group call");
    });
    it("handles an unknown creator", () => {
      import_chai.assert.strictEqual((0, import_callingNotification.getCallingNotificationText)({
        callMode: import_Calling.CallMode.Group,
        conversationId: "abc123",
        ended: false,
        deviceCount: 1,
        maxDevices: 23,
        startedTime: Date.now()
      }, i18n), "A group call was started");
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2FsbGluZ05vdGlmaWNhdGlvbl90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgZ2V0Q2FsbGluZ05vdGlmaWNhdGlvblRleHQgfSBmcm9tICcuLi8uLi91dGlsL2NhbGxpbmdOb3RpZmljYXRpb24nO1xuaW1wb3J0IHsgQ2FsbE1vZGUgfSBmcm9tICcuLi8uLi90eXBlcy9DYWxsaW5nJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5kZXNjcmliZSgnY2FsbGluZyBub3RpZmljYXRpb24gaGVscGVycycsICgpID0+IHtcbiAgY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuICBkZXNjcmliZSgnZ2V0Q2FsbGluZ05vdGlmaWNhdGlvblRleHQnLCAoKSA9PiB7XG4gICAgLy8gRGlyZWN0IGNhbGwgYmVoYXZpb3IgaXMgbm90IHRlc3RlZCBoZXJlLlxuXG4gICAgaXQoJ3NheXMgdGhhdCB0aGUgY2FsbCBoYXMgZW5kZWQnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGdldENhbGxpbmdOb3RpZmljYXRpb25UZXh0KFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5Hcm91cCxcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnYWJjMTIzJyxcbiAgICAgICAgICAgIGVuZGVkOiB0cnVlLFxuICAgICAgICAgICAgZGV2aWNlQ291bnQ6IDEsXG4gICAgICAgICAgICBtYXhEZXZpY2VzOiAyMyxcbiAgICAgICAgICAgIHN0YXJ0ZWRUaW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaTE4blxuICAgICAgICApLFxuICAgICAgICAnVGhlIGdyb3VwIGNhbGwgaGFzIGVuZGVkJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KFwiaW5jbHVkZXMgdGhlIGNyZWF0b3IncyBmaXJzdCBuYW1lIHdoZW4gZGVzY3JpYmluZyBhIGNhbGxcIiwgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBnZXRDYWxsaW5nTm90aWZpY2F0aW9uVGV4dChcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuR3JvdXAsXG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2FiYzEyMycsXG4gICAgICAgICAgICBjcmVhdG9yOiB7XG4gICAgICAgICAgICAgIGZpcnN0TmFtZTogJ0x1aWdpJyxcbiAgICAgICAgICAgICAgaXNNZTogZmFsc2UsXG4gICAgICAgICAgICAgIHRpdGxlOiAnTHVpZ2kgTWFyaW8nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGRldmljZUNvdW50OiAxLFxuICAgICAgICAgICAgbWF4RGV2aWNlczogMjMsXG4gICAgICAgICAgICBzdGFydGVkVGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGkxOG5cbiAgICAgICAgKSxcbiAgICAgICAgJ0x1aWdpIHN0YXJ0ZWQgYSBncm91cCBjYWxsJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KFwiaWYgdGhlIGNyZWF0b3IgZG9lc24ndCBoYXZlIGEgZmlyc3QgbmFtZSwgZmFsbHMgYmFjayB0byB0aGVpciB0aXRsZVwiLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGdldENhbGxpbmdOb3RpZmljYXRpb25UZXh0KFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5Hcm91cCxcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnYWJjMTIzJyxcbiAgICAgICAgICAgIGNyZWF0b3I6IHtcbiAgICAgICAgICAgICAgaXNNZTogZmFsc2UsXG4gICAgICAgICAgICAgIHRpdGxlOiAnTHVpZ2kgTWFyaW8nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGRldmljZUNvdW50OiAxLFxuICAgICAgICAgICAgbWF4RGV2aWNlczogMjMsXG4gICAgICAgICAgICBzdGFydGVkVGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGkxOG5cbiAgICAgICAgKSxcbiAgICAgICAgJ0x1aWdpIE1hcmlvIHN0YXJ0ZWQgYSBncm91cCBjYWxsJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdoYXMgYSBzcGVjaWFsIG1lc3NhZ2UgaWYgeW91IHdlcmUgdGhlIG9uZSB0byBzdGFydCB0aGUgY2FsbCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgZ2V0Q2FsbGluZ05vdGlmaWNhdGlvblRleHQoXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkdyb3VwLFxuICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdhYmMxMjMnLFxuICAgICAgICAgICAgY3JlYXRvcjoge1xuICAgICAgICAgICAgICBmaXJzdE5hbWU6ICdTaG91bGRCZUlnbm9yZWQnLFxuICAgICAgICAgICAgICBpc01lOiB0cnVlLFxuICAgICAgICAgICAgICB0aXRsZTogJ1Nob3VsZEJlSWdub3JlZCBTbWl0aCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5kZWQ6IGZhbHNlLFxuICAgICAgICAgICAgZGV2aWNlQ291bnQ6IDEsXG4gICAgICAgICAgICBtYXhEZXZpY2VzOiAyMyxcbiAgICAgICAgICAgIHN0YXJ0ZWRUaW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaTE4blxuICAgICAgICApLFxuICAgICAgICAnWW91IHN0YXJ0ZWQgYSBncm91cCBjYWxsJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdoYW5kbGVzIGFuIHVua25vd24gY3JlYXRvcicsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgZ2V0Q2FsbGluZ05vdGlmaWNhdGlvblRleHQoXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkdyb3VwLFxuICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdhYmMxMjMnLFxuICAgICAgICAgICAgZW5kZWQ6IGZhbHNlLFxuICAgICAgICAgICAgZGV2aWNlQ291bnQ6IDEsXG4gICAgICAgICAgICBtYXhEZXZpY2VzOiAyMyxcbiAgICAgICAgICAgIHN0YXJ0ZWRUaW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaTE4blxuICAgICAgICApLFxuICAgICAgICAnQSBncm91cCBjYWxsIHdhcyBzdGFydGVkJ1xuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUN2QixpQ0FBMkM7QUFDM0MscUJBQXlCO0FBQ3pCLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFFdkIsU0FBUyxnQ0FBZ0MsTUFBTTtBQUM3QyxRQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxXQUFTLDhCQUE4QixNQUFNO0FBRzNDLE9BQUcsZ0NBQWdDLE1BQU07QUFDdkMseUJBQU8sWUFDTCwyREFDRTtBQUFBLFFBQ0UsVUFBVSx3QkFBUztBQUFBLFFBQ25CLGdCQUFnQjtBQUFBLFFBQ2hCLE9BQU87QUFBQSxRQUNQLGFBQWE7QUFBQSxRQUNiLFlBQVk7QUFBQSxRQUNaLGFBQWEsS0FBSyxJQUFJO0FBQUEsTUFDeEIsR0FDQSxJQUNGLEdBQ0EsMEJBQ0Y7QUFBQSxJQUNGLENBQUM7QUFFRCxPQUFHLDREQUE0RCxNQUFNO0FBQ25FLHlCQUFPLFlBQ0wsMkRBQ0U7QUFBQSxRQUNFLFVBQVUsd0JBQVM7QUFBQSxRQUNuQixnQkFBZ0I7QUFBQSxRQUNoQixTQUFTO0FBQUEsVUFDUCxXQUFXO0FBQUEsVUFDWCxNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsUUFDVDtBQUFBLFFBQ0EsT0FBTztBQUFBLFFBQ1AsYUFBYTtBQUFBLFFBQ2IsWUFBWTtBQUFBLFFBQ1osYUFBYSxLQUFLLElBQUk7QUFBQSxNQUN4QixHQUNBLElBQ0YsR0FDQSw0QkFDRjtBQUFBLElBQ0YsQ0FBQztBQUVELE9BQUcsdUVBQXVFLE1BQU07QUFDOUUseUJBQU8sWUFDTCwyREFDRTtBQUFBLFFBQ0UsVUFBVSx3QkFBUztBQUFBLFFBQ25CLGdCQUFnQjtBQUFBLFFBQ2hCLFNBQVM7QUFBQSxVQUNQLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxRQUNUO0FBQUEsUUFDQSxPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsUUFDYixZQUFZO0FBQUEsUUFDWixhQUFhLEtBQUssSUFBSTtBQUFBLE1BQ3hCLEdBQ0EsSUFDRixHQUNBLGtDQUNGO0FBQUEsSUFDRixDQUFDO0FBRUQsT0FBRywrREFBK0QsTUFBTTtBQUN0RSx5QkFBTyxZQUNMLDJEQUNFO0FBQUEsUUFDRSxVQUFVLHdCQUFTO0FBQUEsUUFDbkIsZ0JBQWdCO0FBQUEsUUFDaEIsU0FBUztBQUFBLFVBQ1AsV0FBVztBQUFBLFVBQ1gsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFFBQ1Q7QUFBQSxRQUNBLE9BQU87QUFBQSxRQUNQLGFBQWE7QUFBQSxRQUNiLFlBQVk7QUFBQSxRQUNaLGFBQWEsS0FBSyxJQUFJO0FBQUEsTUFDeEIsR0FDQSxJQUNGLEdBQ0EsMEJBQ0Y7QUFBQSxJQUNGLENBQUM7QUFFRCxPQUFHLDhCQUE4QixNQUFNO0FBQ3JDLHlCQUFPLFlBQ0wsMkRBQ0U7QUFBQSxRQUNFLFVBQVUsd0JBQVM7QUFBQSxRQUNuQixnQkFBZ0I7QUFBQSxRQUNoQixPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsUUFDYixZQUFZO0FBQUEsUUFDWixhQUFhLEtBQUssSUFBSTtBQUFBLE1BQ3hCLEdBQ0EsSUFDRixHQUNBLDBCQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
