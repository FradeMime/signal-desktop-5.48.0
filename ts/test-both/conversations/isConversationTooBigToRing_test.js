var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_lodash = require("lodash");
var import_RemoteConfigStub = require("../helpers/RemoteConfigStub");
var import_UUID = require("../../types/UUID");
var import_isConversationTooBigToRing = require("../../conversations/isConversationTooBigToRing");
const CONFIG_KEY = "global.calling.maxGroupCallRingSize";
describe("isConversationTooBigToRing", () => {
  const fakeMemberships = /* @__PURE__ */ __name((count) => (0, import_lodash.times)(count, () => ({ uuid: import_UUID.UUID.generate().toString(), isAdmin: false })), "fakeMemberships");
  it("returns false if there are no memberships (i.e., for a direct conversation)", () => {
    import_chai.assert.isFalse((0, import_isConversationTooBigToRing.isConversationTooBigToRing)({}));
    import_chai.assert.isFalse((0, import_isConversationTooBigToRing.isConversationTooBigToRing)({ memberships: [] }));
  });
  const textMaximum = /* @__PURE__ */ __name((max) => {
    for (let count = 1; count < max; count += 1) {
      const memberships = fakeMemberships(count);
      import_chai.assert.isFalse((0, import_isConversationTooBigToRing.isConversationTooBigToRing)({ memberships }));
    }
    for (let count = max; count < max + 5; count += 1) {
      const memberships = fakeMemberships(count);
      import_chai.assert.isTrue((0, import_isConversationTooBigToRing.isConversationTooBigToRing)({ memberships }));
    }
  }, "textMaximum");
  it("returns whether there are 16 or more people in the group, if there is nothing in remote config", async () => {
    await (0, import_RemoteConfigStub.updateRemoteConfig)([]);
    textMaximum(16);
  });
  it("returns whether there are 16 or more people in the group, if the remote config value is bogus", async () => {
    await (0, import_RemoteConfigStub.updateRemoteConfig)([
      { name: CONFIG_KEY, value: "uh oh", enabled: true }
    ]);
    textMaximum(16);
  });
  it("returns whether there are 9 or more people in the group, if the remote config value is 9", async () => {
    await (0, import_RemoteConfigStub.updateRemoteConfig)([{ name: CONFIG_KEY, value: "9", enabled: true }]);
    textMaximum(9);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNDb252ZXJzYXRpb25Ub29CaWdUb1JpbmdfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgdGltZXMgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdXBkYXRlUmVtb3RlQ29uZmlnIH0gZnJvbSAnLi4vaGVscGVycy9SZW1vdGVDb25maWdTdHViJztcbmltcG9ydCB7IFVVSUQgfSBmcm9tICcuLi8uLi90eXBlcy9VVUlEJztcblxuaW1wb3J0IHsgaXNDb252ZXJzYXRpb25Ub29CaWdUb1JpbmcgfSBmcm9tICcuLi8uLi9jb252ZXJzYXRpb25zL2lzQ29udmVyc2F0aW9uVG9vQmlnVG9SaW5nJztcblxuY29uc3QgQ09ORklHX0tFWSA9ICdnbG9iYWwuY2FsbGluZy5tYXhHcm91cENhbGxSaW5nU2l6ZSc7XG5cbmRlc2NyaWJlKCdpc0NvbnZlcnNhdGlvblRvb0JpZ1RvUmluZycsICgpID0+IHtcbiAgY29uc3QgZmFrZU1lbWJlcnNoaXBzID0gKGNvdW50OiBudW1iZXIpID0+XG4gICAgdGltZXMoY291bnQsICgpID0+ICh7IHV1aWQ6IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpLCBpc0FkbWluOiBmYWxzZSB9KSk7XG5cbiAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlcmUgYXJlIG5vIG1lbWJlcnNoaXBzIChpLmUuLCBmb3IgYSBkaXJlY3QgY29udmVyc2F0aW9uKScsICgpID0+IHtcbiAgICBhc3NlcnQuaXNGYWxzZShpc0NvbnZlcnNhdGlvblRvb0JpZ1RvUmluZyh7fSkpO1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzQ29udmVyc2F0aW9uVG9vQmlnVG9SaW5nKHsgbWVtYmVyc2hpcHM6IFtdIH0pKTtcbiAgfSk7XG5cbiAgY29uc3QgdGV4dE1heGltdW0gPSAobWF4OiBudW1iZXIpOiB2b2lkID0+IHtcbiAgICBmb3IgKGxldCBjb3VudCA9IDE7IGNvdW50IDwgbWF4OyBjb3VudCArPSAxKSB7XG4gICAgICBjb25zdCBtZW1iZXJzaGlwcyA9IGZha2VNZW1iZXJzaGlwcyhjb3VudCk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc0NvbnZlcnNhdGlvblRvb0JpZ1RvUmluZyh7IG1lbWJlcnNoaXBzIH0pKTtcbiAgICB9XG4gICAgZm9yIChsZXQgY291bnQgPSBtYXg7IGNvdW50IDwgbWF4ICsgNTsgY291bnQgKz0gMSkge1xuICAgICAgY29uc3QgbWVtYmVyc2hpcHMgPSBmYWtlTWVtYmVyc2hpcHMoY291bnQpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0NvbnZlcnNhdGlvblRvb0JpZ1RvUmluZyh7IG1lbWJlcnNoaXBzIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgaXQoJ3JldHVybnMgd2hldGhlciB0aGVyZSBhcmUgMTYgb3IgbW9yZSBwZW9wbGUgaW4gdGhlIGdyb3VwLCBpZiB0aGVyZSBpcyBub3RoaW5nIGluIHJlbW90ZSBjb25maWcnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgdXBkYXRlUmVtb3RlQ29uZmlnKFtdKTtcbiAgICB0ZXh0TWF4aW11bSgxNik7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHdoZXRoZXIgdGhlcmUgYXJlIDE2IG9yIG1vcmUgcGVvcGxlIGluIHRoZSBncm91cCwgaWYgdGhlIHJlbW90ZSBjb25maWcgdmFsdWUgaXMgYm9ndXMnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgdXBkYXRlUmVtb3RlQ29uZmlnKFtcbiAgICAgIHsgbmFtZTogQ09ORklHX0tFWSwgdmFsdWU6ICd1aCBvaCcsIGVuYWJsZWQ6IHRydWUgfSxcbiAgICBdKTtcbiAgICB0ZXh0TWF4aW11bSgxNik7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHdoZXRoZXIgdGhlcmUgYXJlIDkgb3IgbW9yZSBwZW9wbGUgaW4gdGhlIGdyb3VwLCBpZiB0aGUgcmVtb3RlIGNvbmZpZyB2YWx1ZSBpcyA5JywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHVwZGF0ZVJlbW90ZUNvbmZpZyhbeyBuYW1lOiBDT05GSUdfS0VZLCB2YWx1ZTogJzknLCBlbmFibGVkOiB0cnVlIH1dKTtcbiAgICB0ZXh0TWF4aW11bSg5KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBR0Esa0JBQXVCO0FBQ3ZCLG9CQUFzQjtBQUN0Qiw4QkFBbUM7QUFDbkMsa0JBQXFCO0FBRXJCLHdDQUEyQztBQUUzQyxNQUFNLGFBQWE7QUFFbkIsU0FBUyw4QkFBOEIsTUFBTTtBQUMzQyxRQUFNLGtCQUFrQix3QkFBQyxVQUN2Qix5QkFBTSxPQUFPLE1BQU8sR0FBRSxNQUFNLGlCQUFLLFNBQVMsRUFBRSxTQUFTLEdBQUcsU0FBUyxNQUFNLEVBQUUsR0FEbkQ7QUFHeEIsS0FBRywrRUFBK0UsTUFBTTtBQUN0Rix1QkFBTyxRQUFRLGtFQUEyQixDQUFDLENBQUMsQ0FBQztBQUM3Qyx1QkFBTyxRQUFRLGtFQUEyQixFQUFFLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUFBLEVBQ2hFLENBQUM7QUFFRCxRQUFNLGNBQWMsd0JBQUMsUUFBc0I7QUFDekMsYUFBUyxRQUFRLEdBQUcsUUFBUSxLQUFLLFNBQVMsR0FBRztBQUMzQyxZQUFNLGNBQWMsZ0JBQWdCLEtBQUs7QUFDekMseUJBQU8sUUFBUSxrRUFBMkIsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUFBLElBQzVEO0FBQ0EsYUFBUyxRQUFRLEtBQUssUUFBUSxNQUFNLEdBQUcsU0FBUyxHQUFHO0FBQ2pELFlBQU0sY0FBYyxnQkFBZ0IsS0FBSztBQUN6Qyx5QkFBTyxPQUFPLGtFQUEyQixFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQUEsSUFDM0Q7QUFBQSxFQUNGLEdBVG9CO0FBV3BCLEtBQUcsa0dBQWtHLFlBQVk7QUFDL0csVUFBTSxnREFBbUIsQ0FBQyxDQUFDO0FBQzNCLGdCQUFZLEVBQUU7QUFBQSxFQUNoQixDQUFDO0FBRUQsS0FBRyxpR0FBaUcsWUFBWTtBQUM5RyxVQUFNLGdEQUFtQjtBQUFBLE1BQ3ZCLEVBQUUsTUFBTSxZQUFZLE9BQU8sU0FBUyxTQUFTLEtBQUs7QUFBQSxJQUNwRCxDQUFDO0FBQ0QsZ0JBQVksRUFBRTtBQUFBLEVBQ2hCLENBQUM7QUFFRCxLQUFHLDRGQUE0RixZQUFZO0FBQ3pHLFVBQU0sZ0RBQW1CLENBQUMsRUFBRSxNQUFNLFlBQVksT0FBTyxLQUFLLFNBQVMsS0FBSyxDQUFDLENBQUM7QUFDMUUsZ0JBQVksQ0FBQztBQUFBLEVBQ2YsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
