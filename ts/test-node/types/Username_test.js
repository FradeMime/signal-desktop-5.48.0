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
var Username = __toESM(require("../../types/Username"));
describe("Username", () => {
  describe("getUsernameFromSearch", () => {
    const { getUsernameFromSearch } = Username;
    it("matches invalid username searches", () => {
      import_chai.assert.strictEqual(getUsernameFromSearch("username!"), "username!");
      import_chai.assert.strictEqual(getUsernameFromSearch("1username"), "1username");
      import_chai.assert.strictEqual(getUsernameFromSearch("use"), "use");
      import_chai.assert.strictEqual(getUsernameFromSearch("username9012345678901234567"), "username9012345678901234567");
    });
    it("matches valid username searches", () => {
      import_chai.assert.strictEqual(getUsernameFromSearch("username_34"), "username_34");
      import_chai.assert.strictEqual(getUsernameFromSearch("u5ername"), "u5ername");
      import_chai.assert.strictEqual(getUsernameFromSearch("user"), "user");
      import_chai.assert.strictEqual(getUsernameFromSearch("username901234567890123456"), "username901234567890123456");
    });
    it("matches valid and invalid usernames with @ prefix", () => {
      import_chai.assert.strictEqual(getUsernameFromSearch("@username!"), "username!");
      import_chai.assert.strictEqual(getUsernameFromSearch("@1username"), "1username");
      import_chai.assert.strictEqual(getUsernameFromSearch("@username_34"), "username_34");
      import_chai.assert.strictEqual(getUsernameFromSearch("@u5ername"), "u5ername");
    });
    it("matches valid and invalid usernames with @ suffix", () => {
      import_chai.assert.strictEqual(getUsernameFromSearch("username!@"), "username!");
      import_chai.assert.strictEqual(getUsernameFromSearch("1username@"), "1username");
      import_chai.assert.strictEqual(getUsernameFromSearch("username_34@"), "username_34");
      import_chai.assert.strictEqual(getUsernameFromSearch("u5ername@"), "u5ername");
    });
    it("does not match something that looks like a phone number", () => {
      import_chai.assert.isUndefined(getUsernameFromSearch("+"));
      import_chai.assert.isUndefined(getUsernameFromSearch("2223"));
      import_chai.assert.isUndefined(getUsernameFromSearch("+3"));
      import_chai.assert.isUndefined(getUsernameFromSearch("+234234234233"));
    });
  });
  describe("isValidUsername", () => {
    const { isValidUsername } = Username;
    it("does not match invalid username searches", () => {
      import_chai.assert.isFalse(isValidUsername("username!"));
      import_chai.assert.isFalse(isValidUsername("1username"));
      import_chai.assert.isFalse(isValidUsername("use"));
      import_chai.assert.isFalse(isValidUsername("username9012345678901234567"));
    });
    it("matches valid usernames", () => {
      import_chai.assert.isTrue(isValidUsername("username_34"));
      import_chai.assert.isTrue(isValidUsername("u5ername"));
      import_chai.assert.isTrue(isValidUsername("_username"));
      import_chai.assert.isTrue(isValidUsername("user"));
      import_chai.assert.isTrue(isValidUsername("username901234567890123456"));
    });
    it("does not match valid and invalid usernames with @ prefix or suffix", () => {
      import_chai.assert.isFalse(isValidUsername("@username_34"));
      import_chai.assert.isFalse(isValidUsername("@1username"));
      import_chai.assert.isFalse(isValidUsername("username_34@"));
      import_chai.assert.isFalse(isValidUsername("1username@"));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVXNlcm5hbWVfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0ICogYXMgVXNlcm5hbWUgZnJvbSAnLi4vLi4vdHlwZXMvVXNlcm5hbWUnO1xuXG5kZXNjcmliZSgnVXNlcm5hbWUnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdnZXRVc2VybmFtZUZyb21TZWFyY2gnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBnZXRVc2VybmFtZUZyb21TZWFyY2ggfSA9IFVzZXJuYW1lO1xuXG4gICAgaXQoJ21hdGNoZXMgaW52YWxpZCB1c2VybmFtZSBzZWFyY2hlcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRVc2VybmFtZUZyb21TZWFyY2goJ3VzZXJuYW1lIScpLCAndXNlcm5hbWUhJyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0VXNlcm5hbWVGcm9tU2VhcmNoKCcxdXNlcm5hbWUnKSwgJzF1c2VybmFtZScpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldFVzZXJuYW1lRnJvbVNlYXJjaCgndXNlJyksICd1c2UnKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgZ2V0VXNlcm5hbWVGcm9tU2VhcmNoKCd1c2VybmFtZTkwMTIzNDU2Nzg5MDEyMzQ1NjcnKSxcbiAgICAgICAgJ3VzZXJuYW1lOTAxMjM0NTY3ODkwMTIzNDU2NydcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnbWF0Y2hlcyB2YWxpZCB1c2VybmFtZSBzZWFyY2hlcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRVc2VybmFtZUZyb21TZWFyY2goJ3VzZXJuYW1lXzM0JyksICd1c2VybmFtZV8zNCcpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldFVzZXJuYW1lRnJvbVNlYXJjaCgndTVlcm5hbWUnKSwgJ3U1ZXJuYW1lJyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0VXNlcm5hbWVGcm9tU2VhcmNoKCd1c2VyJyksICd1c2VyJyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGdldFVzZXJuYW1lRnJvbVNlYXJjaCgndXNlcm5hbWU5MDEyMzQ1Njc4OTAxMjM0NTYnKSxcbiAgICAgICAgJ3VzZXJuYW1lOTAxMjM0NTY3ODkwMTIzNDU2J1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdtYXRjaGVzIHZhbGlkIGFuZCBpbnZhbGlkIHVzZXJuYW1lcyB3aXRoIEAgcHJlZml4JywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldFVzZXJuYW1lRnJvbVNlYXJjaCgnQHVzZXJuYW1lIScpLCAndXNlcm5hbWUhJyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0VXNlcm5hbWVGcm9tU2VhcmNoKCdAMXVzZXJuYW1lJyksICcxdXNlcm5hbWUnKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRVc2VybmFtZUZyb21TZWFyY2goJ0B1c2VybmFtZV8zNCcpLCAndXNlcm5hbWVfMzQnKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRVc2VybmFtZUZyb21TZWFyY2goJ0B1NWVybmFtZScpLCAndTVlcm5hbWUnKTtcbiAgICB9KTtcblxuICAgIGl0KCdtYXRjaGVzIHZhbGlkIGFuZCBpbnZhbGlkIHVzZXJuYW1lcyB3aXRoIEAgc3VmZml4JywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldFVzZXJuYW1lRnJvbVNlYXJjaCgndXNlcm5hbWUhQCcpLCAndXNlcm5hbWUhJyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0VXNlcm5hbWVGcm9tU2VhcmNoKCcxdXNlcm5hbWVAJyksICcxdXNlcm5hbWUnKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRVc2VybmFtZUZyb21TZWFyY2goJ3VzZXJuYW1lXzM0QCcpLCAndXNlcm5hbWVfMzQnKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRVc2VybmFtZUZyb21TZWFyY2goJ3U1ZXJuYW1lQCcpLCAndTVlcm5hbWUnKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIG5vdCBtYXRjaCBzb21ldGhpbmcgdGhhdCBsb29rcyBsaWtlIGEgcGhvbmUgbnVtYmVyJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGdldFVzZXJuYW1lRnJvbVNlYXJjaCgnKycpKTtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChnZXRVc2VybmFtZUZyb21TZWFyY2goJzIyMjMnKSk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoZ2V0VXNlcm5hbWVGcm9tU2VhcmNoKCcrMycpKTtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChnZXRVc2VybmFtZUZyb21TZWFyY2goJysyMzQyMzQyMzQyMzMnKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdpc1ZhbGlkVXNlcm5hbWUnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBpc1ZhbGlkVXNlcm5hbWUgfSA9IFVzZXJuYW1lO1xuXG4gICAgaXQoJ2RvZXMgbm90IG1hdGNoIGludmFsaWQgdXNlcm5hbWUgc2VhcmNoZXMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1ZhbGlkVXNlcm5hbWUoJ3VzZXJuYW1lIScpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzVmFsaWRVc2VybmFtZSgnMXVzZXJuYW1lJykpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNWYWxpZFVzZXJuYW1lKCd1c2UnKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1ZhbGlkVXNlcm5hbWUoJ3VzZXJuYW1lOTAxMjM0NTY3ODkwMTIzNDU2NycpKTtcbiAgICB9KTtcblxuICAgIGl0KCdtYXRjaGVzIHZhbGlkIHVzZXJuYW1lcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNWYWxpZFVzZXJuYW1lKCd1c2VybmFtZV8zNCcpKTtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNWYWxpZFVzZXJuYW1lKCd1NWVybmFtZScpKTtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNWYWxpZFVzZXJuYW1lKCdfdXNlcm5hbWUnKSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKGlzVmFsaWRVc2VybmFtZSgndXNlcicpKTtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNWYWxpZFVzZXJuYW1lKCd1c2VybmFtZTkwMTIzNDU2Nzg5MDEyMzQ1NicpKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIG5vdCBtYXRjaCB2YWxpZCBhbmQgaW52YWxpZCB1c2VybmFtZXMgd2l0aCBAIHByZWZpeCBvciBzdWZmaXgnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1ZhbGlkVXNlcm5hbWUoJ0B1c2VybmFtZV8zNCcpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzVmFsaWRVc2VybmFtZSgnQDF1c2VybmFtZScpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzVmFsaWRVc2VybmFtZSgndXNlcm5hbWVfMzRAJykpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNWYWxpZFVzZXJuYW1lKCcxdXNlcm5hbWVAJykpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBRXZCLGVBQTBCO0FBRTFCLFNBQVMsWUFBWSxNQUFNO0FBQ3pCLFdBQVMseUJBQXlCLE1BQU07QUFDdEMsVUFBTSxFQUFFLDBCQUEwQjtBQUVsQyxPQUFHLHFDQUFxQyxNQUFNO0FBQzVDLHlCQUFPLFlBQVksc0JBQXNCLFdBQVcsR0FBRyxXQUFXO0FBQ2xFLHlCQUFPLFlBQVksc0JBQXNCLFdBQVcsR0FBRyxXQUFXO0FBQ2xFLHlCQUFPLFlBQVksc0JB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
