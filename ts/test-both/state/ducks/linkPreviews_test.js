var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_linkPreviews = require("../../../state/ducks/linkPreviews");
describe("both/state/ducks/linkPreviews", () => {
  function getMockLinkPreview() {
    return {
      title: "Hello World",
      domain: "signal.org",
      url: "https://www.signal.org",
      isStickerPack: false
    };
  }
  describe("addLinkPreview", () => {
    const { addLinkPreview } = import_linkPreviews.actions;
    it("updates linkPreview", () => {
      const state = (0, import_linkPreviews.getEmptyState)();
      const linkPreview = getMockLinkPreview();
      const nextState = (0, import_linkPreviews.reducer)(state, addLinkPreview(linkPreview, 0));
      import_chai.assert.strictEqual(nextState.linkPreview, linkPreview);
    });
  });
  describe("removeLinkPreview", () => {
    const { removeLinkPreview } = import_linkPreviews.actions;
    it("removes linkPreview", () => {
      const state = {
        ...(0, import_linkPreviews.getEmptyState)(),
        linkPreview: getMockLinkPreview()
      };
      const nextState = (0, import_linkPreviews.reducer)(state, removeLinkPreview());
      import_chai.assert.isUndefined(nextState.linkPreview);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGlua1ByZXZpZXdzX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7XG4gIGFjdGlvbnMsXG4gIGdldEVtcHR5U3RhdGUsXG4gIHJlZHVjZXIsXG59IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL2xpbmtQcmV2aWV3cyc7XG5pbXBvcnQgdHlwZSB7IExpbmtQcmV2aWV3VHlwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL21lc3NhZ2UvTGlua1ByZXZpZXdzJztcblxuZGVzY3JpYmUoJ2JvdGgvc3RhdGUvZHVja3MvbGlua1ByZXZpZXdzJywgKCkgPT4ge1xuICBmdW5jdGlvbiBnZXRNb2NrTGlua1ByZXZpZXcoKTogTGlua1ByZXZpZXdUeXBlIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICdIZWxsbyBXb3JsZCcsXG4gICAgICBkb21haW46ICdzaWduYWwub3JnJyxcbiAgICAgIHVybDogJ2h0dHBzOi8vd3d3LnNpZ25hbC5vcmcnLFxuICAgICAgaXNTdGlja2VyUGFjazogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGRlc2NyaWJlKCdhZGRMaW5rUHJldmlldycsICgpID0+IHtcbiAgICBjb25zdCB7IGFkZExpbmtQcmV2aWV3IH0gPSBhY3Rpb25zO1xuXG4gICAgaXQoJ3VwZGF0ZXMgbGlua1ByZXZpZXcnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGdldEVtcHR5U3RhdGUoKTtcbiAgICAgIGNvbnN0IGxpbmtQcmV2aWV3ID0gZ2V0TW9ja0xpbmtQcmV2aWV3KCk7XG4gICAgICBjb25zdCBuZXh0U3RhdGUgPSByZWR1Y2VyKHN0YXRlLCBhZGRMaW5rUHJldmlldyhsaW5rUHJldmlldywgMCkpO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobmV4dFN0YXRlLmxpbmtQcmV2aWV3LCBsaW5rUHJldmlldyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdyZW1vdmVMaW5rUHJldmlldycsICgpID0+IHtcbiAgICBjb25zdCB7IHJlbW92ZUxpbmtQcmV2aWV3IH0gPSBhY3Rpb25zO1xuXG4gICAgaXQoJ3JlbW92ZXMgbGlua1ByZXZpZXcnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICBsaW5rUHJldmlldzogZ2V0TW9ja0xpbmtQcmV2aWV3KCksXG4gICAgICB9O1xuICAgICAgY29uc3QgbmV4dFN0YXRlID0gcmVkdWNlcihzdGF0ZSwgcmVtb3ZlTGlua1ByZXZpZXcoKSk7XG5cbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChuZXh0U3RhdGUubGlua1ByZXZpZXcpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFHQSxrQkFBdUI7QUFFdkIsMEJBSU87QUFHUCxTQUFTLGlDQUFpQyxNQUFNO0FBQzlDLGdDQUErQztBQUM3QyxXQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixLQUFLO0FBQUEsTUFDTCxlQUFlO0FBQUEsSUFDakI7QUFBQSxFQUNGO0FBUFMsQUFTVCxXQUFTLGtCQUFrQixNQUFNO0FBQy9CLFVBQU0sRUFBRSxtQkFBbUI7QUFFM0IsT0FBRyx1QkFBdUIsTUFBTTtBQUM5QixZQUFNLFFBQVEsdUNBQWM7QUFDNUIsWUFBTSxjQUFjLG1CQUFtQjtBQUN2QyxZQUFNLFlBQVksaUNBQVEsT0FBTyxlQUFlLGFBQWEsQ0FBQyxDQUFDO0FBRS9ELHlCQUFPLFlBQVksVUFBVSxhQUFhLFdBQVc7QUFBQSxJQUN2RCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUyxxQkFBcUIsTUFBTTtBQUNsQyxVQUFNLEVBQUUsc0JBQXNCO0FBRTlCLE9BQUcsdUJBQXVCLE1BQU07QUFDOUIsWUFBTSxRQUFRO0FBQUEsV0FDVCx1Q0FBYztBQUFBLFFBQ2pCLGFBQWEsbUJBQW1CO0FBQUEsTUFDbEM7QUFDQSxZQUFNLFlBQVksaUNBQVEsT0FBTyxrQkFBa0IsQ0FBQztBQUVwRCx5QkFBTyxZQUFZLFVBQVUsV0FBVztBQUFBLElBQzFDLENBQUM7QUFBQSxFQUNILENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
