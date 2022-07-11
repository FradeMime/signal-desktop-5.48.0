var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var import_wrap = __toESM(require("../protobuf/wrap"));
var Bytes = __toESM(require("../Bytes"));
var import_protobuf = require("../protobuf");
var import_ContactsParser = require("../textsecure/ContactsParser");
const { Writer } = import_wrap.default;
describe("ContactsParser", () => {
  function generateAvatar() {
    const result = new Uint8Array(255);
    for (let i = 0; i < result.length; i += 1) {
      result[i] = i;
    }
    return result;
  }
  describe("ContactBuffer", () => {
    function getTestBuffer() {
      const avatarBuffer = generateAvatar();
      const contactInfoBuffer = import_protobuf.SignalService.ContactDetails.encode({
        name: "Zero Cool",
        number: "+10000000000",
        uuid: "7198E1BD-1293-452A-A098-F982FF201902",
        avatar: { contentType: "image/jpeg", length: avatarBuffer.length }
      }).finish();
      const writer = new Writer();
      writer.bytes(contactInfoBuffer);
      const prefixedContact = writer.finish();
      const chunks = [];
      for (let i = 0; i < 3; i += 1) {
        chunks.push(prefixedContact);
        chunks.push(avatarBuffer);
      }
      return Bytes.concatenate(chunks);
    }
    it("parses an array buffer of contacts", () => {
      const bytes = getTestBuffer();
      const contactBuffer = new import_ContactsParser.ContactBuffer(bytes);
      let contact = contactBuffer.next();
      let count = 0;
      while (contact !== void 0) {
        count += 1;
        import_chai.assert.strictEqual(contact.name, "Zero Cool");
        import_chai.assert.strictEqual(contact.number, "+10000000000");
        import_chai.assert.strictEqual(contact.uuid, "7198e1bd-1293-452a-a098-f982ff201902");
        import_chai.assert.strictEqual(contact.avatar?.contentType, "image/jpeg");
        import_chai.assert.strictEqual(contact.avatar?.length, 255);
        import_chai.assert.strictEqual(contact.avatar?.data.byteLength, 255);
        const avatarBytes = new Uint8Array(contact.avatar?.data || new Uint8Array(0));
        for (let j = 0; j < 255; j += 1) {
          import_chai.assert.strictEqual(avatarBytes[j], j);
        }
        contact = contactBuffer.next();
      }
      import_chai.assert.strictEqual(count, 3);
    });
  });
  describe("GroupBuffer", () => {
    function getTestBuffer() {
      const avatarBuffer = generateAvatar();
      const groupInfoBuffer = import_protobuf.SignalService.GroupDetails.encode({
        id: new Uint8Array([1, 3, 3, 7]),
        name: "Hackers",
        membersE164: ["cereal", "burn", "phreak", "joey"],
        avatar: { contentType: "image/jpeg", length: avatarBuffer.length }
      }).finish();
      const writer = new Writer();
      writer.bytes(groupInfoBuffer);
      const prefixedGroup = writer.finish();
      const chunks = [];
      for (let i = 0; i < 3; i += 1) {
        chunks.push(prefixedGroup);
        chunks.push(avatarBuffer);
      }
      return Bytes.concatenate(chunks);
    }
    it("parses an array buffer of groups", () => {
      const bytes = getTestBuffer();
      const groupBuffer = new import_ContactsParser.GroupBuffer(bytes);
      let group = groupBuffer.next();
      let count = 0;
      while (group !== void 0) {
        count += 1;
        import_chai.assert.strictEqual(group.name, "Hackers");
        import_chai.assert.deepEqual(group.id, new Uint8Array([1, 3, 3, 7]));
        import_chai.assert.sameMembers(group.membersE164, [
          "cereal",
          "burn",
          "phreak",
          "joey"
        ]);
        import_chai.assert.strictEqual(group.avatar?.contentType, "image/jpeg");
        import_chai.assert.strictEqual(group.avatar?.length, 255);
        import_chai.assert.strictEqual(group.avatar?.data.byteLength, 255);
        const avatarBytes = new Uint8Array(group.avatar?.data || new Uint8Array(0));
        for (let j = 0; j < 255; j += 1) {
          import_chai.assert.strictEqual(avatarBytes[j], j);
        }
        group = groupBuffer.next();
      }
      import_chai.assert.strictEqual(count, 3);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdHNQYXJzZXJfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTUtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHByb3RvYnVmIGZyb20gJy4uL3Byb3RvYnVmL3dyYXAnO1xuXG5pbXBvcnQgKiBhcyBCeXRlcyBmcm9tICcuLi9CeXRlcyc7XG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vcHJvdG9idWYnO1xuaW1wb3J0IHsgQ29udGFjdEJ1ZmZlciwgR3JvdXBCdWZmZXIgfSBmcm9tICcuLi90ZXh0c2VjdXJlL0NvbnRhY3RzUGFyc2VyJztcblxuY29uc3QgeyBXcml0ZXIgfSA9IHByb3RvYnVmO1xuXG5kZXNjcmliZSgnQ29udGFjdHNQYXJzZXInLCAoKSA9PiB7XG4gIGZ1bmN0aW9uIGdlbmVyYXRlQXZhdGFyKCk6IFVpbnQ4QXJyYXkge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KDI1NSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHJlc3VsdFtpXSA9IGk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBkZXNjcmliZSgnQ29udGFjdEJ1ZmZlcicsICgpID0+IHtcbiAgICBmdW5jdGlvbiBnZXRUZXN0QnVmZmVyKCk6IFVpbnQ4QXJyYXkge1xuICAgICAgY29uc3QgYXZhdGFyQnVmZmVyID0gZ2VuZXJhdGVBdmF0YXIoKTtcblxuICAgICAgY29uc3QgY29udGFjdEluZm9CdWZmZXIgPSBQcm90by5Db250YWN0RGV0YWlscy5lbmNvZGUoe1xuICAgICAgICBuYW1lOiAnWmVybyBDb29sJyxcbiAgICAgICAgbnVtYmVyOiAnKzEwMDAwMDAwMDAwJyxcbiAgICAgICAgdXVpZDogJzcxOThFMUJELTEyOTMtNDUyQS1BMDk4LUY5ODJGRjIwMTkwMicsXG4gICAgICAgIGF2YXRhcjogeyBjb250ZW50VHlwZTogJ2ltYWdlL2pwZWcnLCBsZW5ndGg6IGF2YXRhckJ1ZmZlci5sZW5ndGggfSxcbiAgICAgIH0pLmZpbmlzaCgpO1xuXG4gICAgICBjb25zdCB3cml0ZXIgPSBuZXcgV3JpdGVyKCk7XG4gICAgICB3cml0ZXIuYnl0ZXMoY29udGFjdEluZm9CdWZmZXIpO1xuICAgICAgY29uc3QgcHJlZml4ZWRDb250YWN0ID0gd3JpdGVyLmZpbmlzaCgpO1xuXG4gICAgICBjb25zdCBjaHVua3M6IEFycmF5PFVpbnQ4QXJyYXk+ID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkgKz0gMSkge1xuICAgICAgICBjaHVua3MucHVzaChwcmVmaXhlZENvbnRhY3QpO1xuICAgICAgICBjaHVua3MucHVzaChhdmF0YXJCdWZmZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQnl0ZXMuY29uY2F0ZW5hdGUoY2h1bmtzKTtcbiAgICB9XG5cbiAgICBpdCgncGFyc2VzIGFuIGFycmF5IGJ1ZmZlciBvZiBjb250YWN0cycsICgpID0+IHtcbiAgICAgIGNvbnN0IGJ5dGVzID0gZ2V0VGVzdEJ1ZmZlcigpO1xuICAgICAgY29uc3QgY29udGFjdEJ1ZmZlciA9IG5ldyBDb250YWN0QnVmZmVyKGJ5dGVzKTtcbiAgICAgIGxldCBjb250YWN0ID0gY29udGFjdEJ1ZmZlci5uZXh0KCk7XG4gICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgd2hpbGUgKGNvbnRhY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb3VudCArPSAxO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY29udGFjdC5uYW1lLCAnWmVybyBDb29sJyk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb250YWN0Lm51bWJlciwgJysxMDAwMDAwMDAwMCcpO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgY29udGFjdC51dWlkLFxuICAgICAgICAgICc3MTk4ZTFiZC0xMjkzLTQ1MmEtYTA5OC1mOTgyZmYyMDE5MDInXG4gICAgICAgICk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb250YWN0LmF2YXRhcj8uY29udGVudFR5cGUsICdpbWFnZS9qcGVnJyk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb250YWN0LmF2YXRhcj8ubGVuZ3RoLCAyNTUpO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY29udGFjdC5hdmF0YXI/LmRhdGEuYnl0ZUxlbmd0aCwgMjU1KTtcbiAgICAgICAgY29uc3QgYXZhdGFyQnl0ZXMgPSBuZXcgVWludDhBcnJheShcbiAgICAgICAgICBjb250YWN0LmF2YXRhcj8uZGF0YSB8fCBuZXcgVWludDhBcnJheSgwKVxuICAgICAgICApO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDI1NTsgaiArPSAxKSB7XG4gICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGF2YXRhckJ5dGVzW2pdLCBqKTtcbiAgICAgICAgfVxuICAgICAgICBjb250YWN0ID0gY29udGFjdEJ1ZmZlci5uZXh0KCk7XG4gICAgICB9XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY291bnQsIDMpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnR3JvdXBCdWZmZXInLCAoKSA9PiB7XG4gICAgZnVuY3Rpb24gZ2V0VGVzdEJ1ZmZlcigpOiBVaW50OEFycmF5IHtcbiAgICAgIGNvbnN0IGF2YXRhckJ1ZmZlciA9IGdlbmVyYXRlQXZhdGFyKCk7XG5cbiAgICAgIGNvbnN0IGdyb3VwSW5mb0J1ZmZlciA9IFByb3RvLkdyb3VwRGV0YWlscy5lbmNvZGUoe1xuICAgICAgICBpZDogbmV3IFVpbnQ4QXJyYXkoWzEsIDMsIDMsIDddKSxcbiAgICAgICAgbmFtZTogJ0hhY2tlcnMnLFxuICAgICAgICBtZW1iZXJzRTE2NDogWydjZXJlYWwnLCAnYnVybicsICdwaHJlYWsnLCAnam9leSddLFxuICAgICAgICBhdmF0YXI6IHsgY29udGVudFR5cGU6ICdpbWFnZS9qcGVnJywgbGVuZ3RoOiBhdmF0YXJCdWZmZXIubGVuZ3RoIH0sXG4gICAgICB9KS5maW5pc2goKTtcblxuICAgICAgY29uc3Qgd3JpdGVyID0gbmV3IFdyaXRlcigpO1xuICAgICAgd3JpdGVyLmJ5dGVzKGdyb3VwSW5mb0J1ZmZlcik7XG4gICAgICBjb25zdCBwcmVmaXhlZEdyb3VwID0gd3JpdGVyLmZpbmlzaCgpO1xuXG4gICAgICBjb25zdCBjaHVua3M6IEFycmF5PFVpbnQ4QXJyYXk+ID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkgKz0gMSkge1xuICAgICAgICBjaHVua3MucHVzaChwcmVmaXhlZEdyb3VwKTtcbiAgICAgICAgY2h1bmtzLnB1c2goYXZhdGFyQnVmZmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIEJ5dGVzLmNvbmNhdGVuYXRlKGNodW5rcyk7XG4gICAgfVxuXG4gICAgaXQoJ3BhcnNlcyBhbiBhcnJheSBidWZmZXIgb2YgZ3JvdXBzJywgKCkgPT4ge1xuICAgICAgY29uc3QgYnl0ZXMgPSBnZXRUZXN0QnVmZmVyKCk7XG4gICAgICBjb25zdCBncm91cEJ1ZmZlciA9IG5ldyBHcm91cEJ1ZmZlcihieXRlcyk7XG4gICAgICBsZXQgZ3JvdXAgPSBncm91cEJ1ZmZlci5uZXh0KCk7XG4gICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgd2hpbGUgKGdyb3VwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdyb3VwLm5hbWUsICdIYWNrZXJzJyk7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoZ3JvdXAuaWQsIG5ldyBVaW50OEFycmF5KFsxLCAzLCAzLCA3XSkpO1xuICAgICAgICBhc3NlcnQuc2FtZU1lbWJlcnMoZ3JvdXAubWVtYmVyc0UxNjQsIFtcbiAgICAgICAgICAnY2VyZWFsJyxcbiAgICAgICAgICAnYnVybicsXG4gICAgICAgICAgJ3BocmVhaycsXG4gICAgICAgICAgJ2pvZXknLFxuICAgICAgICBdKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdyb3VwLmF2YXRhcj8uY29udGVudFR5cGUsICdpbWFnZS9qcGVnJyk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChncm91cC5hdmF0YXI/Lmxlbmd0aCwgMjU1KTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdyb3VwLmF2YXRhcj8uZGF0YS5ieXRlTGVuZ3RoLCAyNTUpO1xuICAgICAgICBjb25zdCBhdmF0YXJCeXRlcyA9IG5ldyBVaW50OEFycmF5KFxuICAgICAgICAgIGdyb3VwLmF2YXRhcj8uZGF0YSB8fCBuZXcgVWludDhBcnJheSgwKVxuICAgICAgICApO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDI1NTsgaiArPSAxKSB7XG4gICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGF2YXRhckJ5dGVzW2pdLCBqKTtcbiAgICAgICAgfVxuICAgICAgICBncm91cCA9IGdyb3VwQnVmZmVyLm5leHQoKTtcbiAgICAgIH1cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb3VudCwgMyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLGtCQUFxQjtBQUVyQixZQUF1QjtBQUN2QixzQkFBdUM7QUFDdkMsNEJBQTJDO0FBRTNDLE1BQU0sRUFBRSxXQUFXO0FBRW5CLFNBQVMsa0JBQWtCLE1BQU07QUFDL0IsNEJBQXNDO0FBQ3BDLFVBQU0sU0FBUyxJQUFJLFdBQVcsR0FBRztBQUNqQyxhQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUSxLQUFLLEdBQUc7QUFDekMsYUFBTyxLQUFLO0FBQUEsSUFDZDtBQUNBLFdB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
