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
var sinon = __toESM(require("sinon"));
var import_path = __toESM(require("path"));
var import_chai = require("chai");
var import_uuid = require("uuid");
var import_MIME = require("../../../types/MIME");
var import_stories = require("../../../state/ducks/stories");
var import_noop = require("../../../state/ducks/noop");
var import_reducer = require("../../../state/reducer");
describe("both/state/ducks/stories", () => {
  const getEmptyRootState = /* @__PURE__ */ __name(() => ({
    ...(0, import_reducer.reducer)(void 0, (0, import_noop.noopAction)()),
    stories: (0, import_stories.getEmptyState)()
  }), "getEmptyRootState");
  function getStoryMessage(id) {
    const now = Date.now();
    return {
      conversationId: (0, import_uuid.v4)(),
      id,
      received_at: now,
      sent_at: now,
      timestamp: now,
      type: "story"
    };
  }
  describe("queueStoryDownload", () => {
    const { queueStoryDownload } = import_stories.actions;
    it("no attachment, no dispatch", async function test() {
      const storyId = (0, import_uuid.v4)();
      const messageAttributes = getStoryMessage(storyId);
      window.MessageController.register(storyId, messageAttributes);
      const dispatch = sinon.spy();
      await queueStoryDownload(storyId)(dispatch, getEmptyRootState, null);
      sinon.assert.notCalled(dispatch);
    });
    it("downloading, no dispatch", async function test() {
      const storyId = (0, import_uuid.v4)();
      const messageAttributes = {
        ...getStoryMessage(storyId),
        attachments: [
          {
            contentType: import_MIME.IMAGE_JPEG,
            downloadJobId: (0, import_uuid.v4)(),
            pending: true,
            size: 0
          }
        ]
      };
      window.MessageController.register(storyId, messageAttributes);
      const dispatch = sinon.spy();
      await queueStoryDownload(storyId)(dispatch, getEmptyRootState, null);
      sinon.assert.notCalled(dispatch);
    });
    it("downloaded, no dispatch", async function test() {
      const storyId = (0, import_uuid.v4)();
      const messageAttributes = {
        ...getStoryMessage(storyId),
        attachments: [
          {
            contentType: import_MIME.IMAGE_JPEG,
            path: "image.jpg",
            url: "/path/to/image.jpg",
            size: 0
          }
        ]
      };
      window.MessageController.register(storyId, messageAttributes);
      const dispatch = sinon.spy();
      await queueStoryDownload(storyId)(dispatch, getEmptyRootState, null);
      sinon.assert.notCalled(dispatch);
    });
    it("downloaded, but unresolved, we should resolve the path", async function test() {
      const storyId = (0, import_uuid.v4)();
      const attachment = {
        contentType: import_MIME.IMAGE_JPEG,
        path: "image.jpg",
        size: 0
      };
      const messageAttributes = {
        ...getStoryMessage(storyId),
        attachments: [attachment]
      };
      window.MessageController.register(storyId, messageAttributes);
      const dispatch = sinon.spy();
      await queueStoryDownload(storyId)(dispatch, getEmptyRootState, null);
      const action = dispatch.getCall(0).args[0];
      sinon.assert.calledWith(dispatch, {
        type: import_stories.RESOLVE_ATTACHMENT_URL,
        payload: {
          messageId: storyId,
          attachmentUrl: action.payload.attachmentUrl
        }
      });
      import_chai.assert.equal(attachment.path, import_path.default.basename(action.payload.attachmentUrl));
      const stateWithStory = {
        ...getEmptyRootState().stories,
        stories: [
          {
            ...messageAttributes,
            messageId: storyId,
            attachment
          }
        ]
      };
      const nextState = (0, import_stories.reducer)(stateWithStory, action);
      import_chai.assert.isDefined(nextState.stories);
      import_chai.assert.equal(nextState.stories[0].attachment?.url, action.payload.attachmentUrl);
      const state = getEmptyRootState().stories;
      const sameState = (0, import_stories.reducer)(state, action);
      import_chai.assert.isDefined(sameState.stories);
      import_chai.assert.equal(sameState, state);
    });
    it("not downloaded, queued for download", async function test() {
      const storyId = (0, import_uuid.v4)();
      const messageAttributes = {
        ...getStoryMessage(storyId),
        attachments: [
          {
            contentType: import_MIME.IMAGE_JPEG,
            size: 0
          }
        ]
      };
      window.MessageController.register(storyId, messageAttributes);
      const dispatch = sinon.spy();
      await queueStoryDownload(storyId)(dispatch, getEmptyRootState, null);
      sinon.assert.calledWith(dispatch, {
        type: "NOOP",
        payload: null
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3Rvcmllc190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCc7XG5cbmltcG9ydCB0eXBlIHsgU3Rvcmllc1N0YXRlVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL3N0b3JpZXMnO1xuaW1wb3J0IHR5cGUgeyBNZXNzYWdlQXR0cmlidXRlc1R5cGUgfSBmcm9tICcuLi8uLi8uLi9tb2RlbC10eXBlcy5kJztcbmltcG9ydCB7IElNQUdFX0pQRUcgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9NSU1FJztcbmltcG9ydCB7XG4gIGFjdGlvbnMsXG4gIGdldEVtcHR5U3RhdGUsXG4gIHJlZHVjZXIsXG4gIFJFU09MVkVfQVRUQUNITUVOVF9VUkwsXG59IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL3N0b3JpZXMnO1xuaW1wb3J0IHsgbm9vcEFjdGlvbiB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL25vb3AnO1xuaW1wb3J0IHsgcmVkdWNlciBhcyByb290UmVkdWNlciB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL3JlZHVjZXInO1xuXG5kZXNjcmliZSgnYm90aC9zdGF0ZS9kdWNrcy9zdG9yaWVzJywgKCkgPT4ge1xuICBjb25zdCBnZXRFbXB0eVJvb3RTdGF0ZSA9ICgpID0+ICh7XG4gICAgLi4ucm9vdFJlZHVjZXIodW5kZWZpbmVkLCBub29wQWN0aW9uKCkpLFxuICAgIHN0b3JpZXM6IGdldEVtcHR5U3RhdGUoKSxcbiAgfSk7XG5cbiAgZnVuY3Rpb24gZ2V0U3RvcnlNZXNzYWdlKGlkOiBzdHJpbmcpOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY29udmVyc2F0aW9uSWQ6IHV1aWQoKSxcbiAgICAgIGlkLFxuICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyxcbiAgICAgIHNlbnRfYXQ6IG5vdyxcbiAgICAgIHRpbWVzdGFtcDogbm93LFxuICAgICAgdHlwZTogJ3N0b3J5JyxcbiAgICB9O1xuICB9XG5cbiAgZGVzY3JpYmUoJ3F1ZXVlU3RvcnlEb3dubG9hZCcsICgpID0+IHtcbiAgICBjb25zdCB7IHF1ZXVlU3RvcnlEb3dubG9hZCB9ID0gYWN0aW9ucztcblxuICAgIGl0KCdubyBhdHRhY2htZW50LCBubyBkaXNwYXRjaCcsIGFzeW5jIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgICBjb25zdCBzdG9yeUlkID0gdXVpZCgpO1xuICAgICAgY29uc3QgbWVzc2FnZUF0dHJpYnV0ZXMgPSBnZXRTdG9yeU1lc3NhZ2Uoc3RvcnlJZCk7XG5cbiAgICAgIHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5yZWdpc3RlcihzdG9yeUlkLCBtZXNzYWdlQXR0cmlidXRlcyk7XG5cbiAgICAgIGNvbnN0IGRpc3BhdGNoID0gc2lub24uc3B5KCk7XG4gICAgICBhd2FpdCBxdWV1ZVN0b3J5RG93bmxvYWQoc3RvcnlJZCkoZGlzcGF0Y2gsIGdldEVtcHR5Um9vdFN0YXRlLCBudWxsKTtcblxuICAgICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZChkaXNwYXRjaCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG93bmxvYWRpbmcsIG5vIGRpc3BhdGNoJywgYXN5bmMgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICAgIGNvbnN0IHN0b3J5SWQgPSB1dWlkKCk7XG4gICAgICBjb25zdCBtZXNzYWdlQXR0cmlidXRlcyA9IHtcbiAgICAgICAgLi4uZ2V0U3RvcnlNZXNzYWdlKHN0b3J5SWQpLFxuICAgICAgICBhdHRhY2htZW50czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9KUEVHLFxuICAgICAgICAgICAgZG93bmxvYWRKb2JJZDogdXVpZCgpLFxuICAgICAgICAgICAgcGVuZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIHNpemU6IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH07XG5cbiAgICAgIHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5yZWdpc3RlcihzdG9yeUlkLCBtZXNzYWdlQXR0cmlidXRlcyk7XG5cbiAgICAgIGNvbnN0IGRpc3BhdGNoID0gc2lub24uc3B5KCk7XG4gICAgICBhd2FpdCBxdWV1ZVN0b3J5RG93bmxvYWQoc3RvcnlJZCkoZGlzcGF0Y2gsIGdldEVtcHR5Um9vdFN0YXRlLCBudWxsKTtcblxuICAgICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZChkaXNwYXRjaCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG93bmxvYWRlZCwgbm8gZGlzcGF0Y2gnLCBhc3luYyBmdW5jdGlvbiB0ZXN0KCkge1xuICAgICAgY29uc3Qgc3RvcnlJZCA9IHV1aWQoKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VBdHRyaWJ1dGVzID0ge1xuICAgICAgICAuLi5nZXRTdG9yeU1lc3NhZ2Uoc3RvcnlJZCksXG4gICAgICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gICAgICAgICAgICBwYXRoOiAnaW1hZ2UuanBnJyxcbiAgICAgICAgICAgIHVybDogJy9wYXRoL3RvL2ltYWdlLmpwZycsXG4gICAgICAgICAgICBzaXplOiAwLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9O1xuXG4gICAgICB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIucmVnaXN0ZXIoc3RvcnlJZCwgbWVzc2FnZUF0dHJpYnV0ZXMpO1xuXG4gICAgICBjb25zdCBkaXNwYXRjaCA9IHNpbm9uLnNweSgpO1xuICAgICAgYXdhaXQgcXVldWVTdG9yeURvd25sb2FkKHN0b3J5SWQpKGRpc3BhdGNoLCBnZXRFbXB0eVJvb3RTdGF0ZSwgbnVsbCk7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZGlzcGF0Y2gpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2Rvd25sb2FkZWQsIGJ1dCB1bnJlc29sdmVkLCB3ZSBzaG91bGQgcmVzb2x2ZSB0aGUgcGF0aCcsIGFzeW5jIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgICBjb25zdCBzdG9yeUlkID0gdXVpZCgpO1xuICAgICAgY29uc3QgYXR0YWNobWVudCA9IHtcbiAgICAgICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gICAgICAgIHBhdGg6ICdpbWFnZS5qcGcnLFxuICAgICAgICBzaXplOiAwLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VBdHRyaWJ1dGVzID0ge1xuICAgICAgICAuLi5nZXRTdG9yeU1lc3NhZ2Uoc3RvcnlJZCksXG4gICAgICAgIGF0dGFjaG1lbnRzOiBbYXR0YWNobWVudF0sXG4gICAgICB9O1xuXG4gICAgICB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIucmVnaXN0ZXIoc3RvcnlJZCwgbWVzc2FnZUF0dHJpYnV0ZXMpO1xuXG4gICAgICBjb25zdCBkaXNwYXRjaCA9IHNpbm9uLnNweSgpO1xuICAgICAgYXdhaXQgcXVldWVTdG9yeURvd25sb2FkKHN0b3J5SWQpKGRpc3BhdGNoLCBnZXRFbXB0eVJvb3RTdGF0ZSwgbnVsbCk7XG5cbiAgICAgIGNvbnN0IGFjdGlvbiA9IGRpc3BhdGNoLmdldENhbGwoMCkuYXJnc1swXTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoZGlzcGF0Y2gsIHtcbiAgICAgICAgdHlwZTogUkVTT0xWRV9BVFRBQ0hNRU5UX1VSTCxcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIG1lc3NhZ2VJZDogc3RvcnlJZCxcbiAgICAgICAgICBhdHRhY2htZW50VXJsOiBhY3Rpb24ucGF5bG9hZC5hdHRhY2htZW50VXJsLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZXF1YWwoXG4gICAgICAgIGF0dGFjaG1lbnQucGF0aCxcbiAgICAgICAgcGF0aC5iYXNlbmFtZShhY3Rpb24ucGF5bG9hZC5hdHRhY2htZW50VXJsKVxuICAgICAgKTtcblxuICAgICAgY29uc3Qgc3RhdGVXaXRoU3Rvcnk6IFN0b3JpZXNTdGF0ZVR5cGUgPSB7XG4gICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCkuc3RvcmllcyxcbiAgICAgICAgc3RvcmllczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIC4uLm1lc3NhZ2VBdHRyaWJ1dGVzLFxuICAgICAgICAgICAgbWVzc2FnZUlkOiBzdG9yeUlkLFxuICAgICAgICAgICAgYXR0YWNobWVudCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgbmV4dFN0YXRlID0gcmVkdWNlcihzdGF0ZVdpdGhTdG9yeSwgYWN0aW9uKTtcbiAgICAgIGFzc2VydC5pc0RlZmluZWQobmV4dFN0YXRlLnN0b3JpZXMpO1xuICAgICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgICBuZXh0U3RhdGUuc3Rvcmllc1swXS5hdHRhY2htZW50Py51cmwsXG4gICAgICAgIGFjdGlvbi5wYXlsb2FkLmF0dGFjaG1lbnRVcmxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHN0YXRlID0gZ2V0RW1wdHlSb290U3RhdGUoKS5zdG9yaWVzO1xuXG4gICAgICBjb25zdCBzYW1lU3RhdGUgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuICAgICAgYXNzZXJ0LmlzRGVmaW5lZChzYW1lU3RhdGUuc3Rvcmllcyk7XG4gICAgICBhc3NlcnQuZXF1YWwoc2FtZVN0YXRlLCBzdGF0ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnbm90IGRvd25sb2FkZWQsIHF1ZXVlZCBmb3IgZG93bmxvYWQnLCBhc3luYyBmdW5jdGlvbiB0ZXN0KCkge1xuICAgICAgY29uc3Qgc3RvcnlJZCA9IHV1aWQoKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VBdHRyaWJ1dGVzID0ge1xuICAgICAgICAuLi5nZXRTdG9yeU1lc3NhZ2Uoc3RvcnlJZCksXG4gICAgICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gICAgICAgICAgICBzaXplOiAwLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9O1xuXG4gICAgICB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIucmVnaXN0ZXIoc3RvcnlJZCwgbWVzc2FnZUF0dHJpYnV0ZXMpO1xuXG4gICAgICBjb25zdCBkaXNwYXRjaCA9IHNpbm9uLnNweSgpO1xuICAgICAgYXdhaXQgcXVldWVTdG9yeURvd25sb2FkKHN0b3J5SWQpKGRpc3BhdGNoLCBnZXRFbXB0eVJvb3RTdGF0ZSwgbnVsbCk7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGRpc3BhdGNoLCB7XG4gICAgICAgIHR5cGU6ICdOT09QJyxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLFlBQXVCO0FBQ3ZCLGtCQUFpQjtBQUNqQixrQkFBdUI7QUFDdkIsa0JBQTJCO0FBSTNCLGtCQUEyQjtBQUMzQixxQkFLTztBQUNQLGtCQUEyQjtBQUMzQixxQkFBdUM7QUFFdkMsU0FBUyw0QkFBNEIsTUFBTTtBQUN6QyxRQUFNLG9CQUFvQiw2QkFBTztBQUFBLE9BQzVCLDRCQUFZLFFBQVcsNEJBQVcsQ0FBQztBQUFBLElBQ3RDLFNBQVMsa0NBQWM7QUFBQSxFQUN6QixJQUgwQjtBQUsxQiwyQkFBeUIsSUFBbUM7QUFDMUQsVUFBTSxNQUFNLEtBQUssSUFBSTtBQUVyQixXQUFPO0FBQUEsTUFDTCxnQkFBZ0Isb0JBQUs7QUFB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
