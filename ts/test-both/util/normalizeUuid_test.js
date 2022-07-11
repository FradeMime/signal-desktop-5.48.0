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
var import_uuid = require("uuid");
var sinon = __toESM(require("sinon"));
var import_normalizeUuid = require("../../util/normalizeUuid");
describe("normalizeUuid", () => {
  let warn;
  let logger;
  beforeEach(() => {
    warn = sinon.stub();
    logger = { warn };
  });
  it("converts uuid to lower case", () => {
    const uuid = (0, import_uuid.v4)();
    import_chai.assert.strictEqual((0, import_normalizeUuid.normalizeUuid)(uuid, "context 1", logger), uuid);
    import_chai.assert.strictEqual((0, import_normalizeUuid.normalizeUuid)(uuid.toUpperCase(), "context 2", logger), uuid);
    sinon.assert.notCalled(warn);
  });
  it("warns if passed a string that's not a UUID", () => {
    (0, import_normalizeUuid.normalizeUuid)("not-UUID-at-all", "context 3", logger);
    sinon.assert.calledOnce(warn);
    sinon.assert.calledWith(warn, 'Normalizing invalid uuid: not-UUID-at-all to not-uuid-at-all in context "context 3"');
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9ybWFsaXplVXVpZF90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgdjQgYXMgZ2VuZXJhdGVVdWlkIH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgKiBhcyBzaW5vbiBmcm9tICdzaW5vbic7XG5cbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0xvZ2dpbmcnO1xuaW1wb3J0IHsgbm9ybWFsaXplVXVpZCB9IGZyb20gJy4uLy4uL3V0aWwvbm9ybWFsaXplVXVpZCc7XG5cbmRlc2NyaWJlKCdub3JtYWxpemVVdWlkJywgKCkgPT4ge1xuICBsZXQgd2Fybjogc2lub24uU2lub25TdHViO1xuICBsZXQgbG9nZ2VyOiBQaWNrPExvZ2dlclR5cGUsICd3YXJuJz47XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgd2FybiA9IHNpbm9uLnN0dWIoKTtcbiAgICBsb2dnZXIgPSB7IHdhcm4gfTtcbiAgfSk7XG5cbiAgaXQoJ2NvbnZlcnRzIHV1aWQgdG8gbG93ZXIgY2FzZScsICgpID0+IHtcbiAgICBjb25zdCB1dWlkID0gZ2VuZXJhdGVVdWlkKCk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKG5vcm1hbGl6ZVV1aWQodXVpZCwgJ2NvbnRleHQgMScsIGxvZ2dlciksIHV1aWQpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgIG5vcm1hbGl6ZVV1aWQodXVpZC50b1VwcGVyQ2FzZSgpLCAnY29udGV4dCAyJywgbG9nZ2VyKSxcbiAgICAgIHV1aWRcbiAgICApO1xuXG4gICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZCh3YXJuKTtcbiAgfSk7XG5cbiAgaXQoXCJ3YXJucyBpZiBwYXNzZWQgYSBzdHJpbmcgdGhhdCdzIG5vdCBhIFVVSURcIiwgKCkgPT4ge1xuICAgIG5vcm1hbGl6ZVV1aWQoJ25vdC1VVUlELWF0LWFsbCcsICdjb250ZXh0IDMnLCBsb2dnZXIpO1xuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHdhcm4pO1xuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgd2FybixcbiAgICAgICdOb3JtYWxpemluZyBpbnZhbGlkIHV1aWQ6IG5vdC1VVUlELWF0LWFsbCB0byBub3QtdXVpZC1hdC1hbGwgaW4gJyArXG4gICAgICAgICdjb250ZXh0IFwiY29udGV4dCAzXCInXG4gICAgKTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUN2QixrQkFBbUM7QUFDbkMsWUFBdUI7QUFHdkIsMkJBQThCO0FBRTlCLFNBQVMsaUJBQWlCLE1BQU07QUFDOUIsTUFBSTtBQUNKLE1BQUk7QUFFSixhQUFXLE1BQU07QUFDZixXQUFPLE1BQU0sS0FBSztBQUNsQixhQUFTLEVBQUUsS0FBSztBQUFBLEVBQ2xCLENBQUM7QUFFRCxLQUFHLCtCQUErQixNQUFNO0FBQ3RDLFVBQU0sT0FBTyxvQkFBYTtBQUMxQix1QkFBTyxZQUFZLHdDQUFjLE1BQU0sYUFBYSxNQUFNLEdBQUcsSUFBSTtBQUNqRSx1QkFBTyxZQUNMLHdDQUFjLEtBQUssWUFBWSxHQUFHLGFBQWEsTUFBTSxHQUNyRCxJQUNGO0FBRUEsVUFBTSxPQUFPLFVBQVUsSUFBSTtBQUFBLEVBQzdCLENBQUM7QUFFRCxLQUFHLDhDQUE4QyxNQUFNO0FBQ3JELDRDQUFjLG1CQUFtQixhQUFhLE1BQU07QUFDcEQsVUFBTSxPQUFPLFdBQVcsSUFBSTtBQUM1QixVQUFNLE9BQU8sV0FDWCxNQUNBLHFGQUVGO0FBQUEsRUFDRixDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
