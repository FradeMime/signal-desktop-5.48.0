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
var import_v4 = __toESM(require("uuid/v4"));
var import_processSyncMessage = require("../textsecure/processSyncMessage");
describe("processSyncMessage", () => {
  it("should normalize UUIDs in sent", () => {
    const destinationUuid = (0, import_v4.default)();
    const out = (0, import_processSyncMessage.processSyncMessage)({
      sent: {
        destinationUuid: destinationUuid.toUpperCase(),
        unidentifiedStatus: [
          {
            destinationUuid: destinationUuid.toUpperCase()
          }
        ]
      }
    });
    import_chai.assert.deepStrictEqual(out, {
      sent: {
        destinationUuid,
        unidentifiedStatus: [
          {
            destinationUuid
          }
        ]
      }
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJvY2Vzc1N5bmNNZXNzYWdlX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgZ2V0R3VpZCBmcm9tICd1dWlkL3Y0JztcblxuaW1wb3J0IHsgcHJvY2Vzc1N5bmNNZXNzYWdlIH0gZnJvbSAnLi4vdGV4dHNlY3VyZS9wcm9jZXNzU3luY01lc3NhZ2UnO1xuXG5kZXNjcmliZSgncHJvY2Vzc1N5bmNNZXNzYWdlJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIG5vcm1hbGl6ZSBVVUlEcyBpbiBzZW50JywgKCkgPT4ge1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uVXVpZCA9IGdldEd1aWQoKTtcblxuICAgIGNvbnN0IG91dCA9IHByb2Nlc3NTeW5jTWVzc2FnZSh7XG4gICAgICBzZW50OiB7XG4gICAgICAgIGRlc3RpbmF0aW9uVXVpZDogZGVzdGluYXRpb25VdWlkLnRvVXBwZXJDYXNlKCksXG5cbiAgICAgICAgdW5pZGVudGlmaWVkU3RhdHVzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGVzdGluYXRpb25VdWlkOiBkZXN0aW5hdGlvblV1aWQudG9VcHBlckNhc2UoKSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwob3V0LCB7XG4gICAgICBzZW50OiB7XG4gICAgICAgIGRlc3RpbmF0aW9uVXVpZCxcblxuICAgICAgICB1bmlkZW50aWZpZWRTdGF0dXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkZXN0aW5hdGlvblV1aWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsZ0JBQW9CO0FBRXBCLGdDQUFtQztBQUVuQyxTQUFTLHNCQUFzQixNQUFNO0FBQ25DLEtBQUcsa0NBQWtDLE1BQU07QUFDekMsVUFBTSxrQkFBa0IsdUJBQVE7QUFFaEMsVUFBTSxNQUFNLGtEQUFtQjtBQUFBLE1BQzdCLE1BQU07QUFBQSxRQUNKLGlCQUFpQixnQkFBZ0IsWUFBWTtBQUFBLFFBRTdDLG9CQUFvQjtBQUFBLFVBQ2xCO0FBQUEsWUFDRSxpQkFBaUIsZ0JBQWdCLFlBQVk7QUFBQSxVQUMvQztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBRUQsdUJBQU8sZ0JBQWdCLEtBQUs7QUFBQSxNQUMxQixNQUFNO0FBQUEsUUFDSjtBQUFBLFFBRUEsb0JBQW9CO0FBQUEsVUFDbEI7QUFBQSxZQUNFO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
