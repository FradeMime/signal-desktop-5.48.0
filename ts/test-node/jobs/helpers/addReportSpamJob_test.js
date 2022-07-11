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
var sinon = __toESM(require("sinon"));
var import_getDefaultConversation = require("../../../test-both/helpers/getDefaultConversation");
var import_Job = require("../../../jobs/Job");
var import_addReportSpamJob = require("../../../jobs/helpers/addReportSpamJob");
describe("addReportSpamJob", () => {
  let getMessageServerGuidsForSpam;
  let jobQueue;
  beforeEach(() => {
    getMessageServerGuidsForSpam = sinon.stub().resolves(["abc", "xyz"]);
    jobQueue = {
      add: sinon.stub().callsFake(async (data) => new import_Job.Job("fake-job-id", Date.now(), "fake job queue type", data, Promise.resolve()))
    };
  });
  it("does nothing if the conversation lacks a UUID", async () => {
    await (0, import_addReportSpamJob.addReportSpamJob)({
      conversation: (0, import_getDefaultConversation.getDefaultConversation)({ uuid: void 0 }),
      getMessageServerGuidsForSpam,
      jobQueue
    });
    sinon.assert.notCalled(getMessageServerGuidsForSpam);
    sinon.assert.notCalled(jobQueue.add);
  });
  it("doesn't enqueue a job if there are no messages with server GUIDs", async () => {
    getMessageServerGuidsForSpam.resolves([]);
    await (0, import_addReportSpamJob.addReportSpamJob)({
      conversation: (0, import_getDefaultConversation.getDefaultConversation)(),
      getMessageServerGuidsForSpam,
      jobQueue
    });
    sinon.assert.notCalled(jobQueue.add);
  });
  it("enqueues a job", async () => {
    const conversation = (0, import_getDefaultConversation.getDefaultConversation)();
    await (0, import_addReportSpamJob.addReportSpamJob)({
      conversation,
      getMessageServerGuidsForSpam,
      jobQueue
    });
    sinon.assert.calledOnce(getMessageServerGuidsForSpam);
    sinon.assert.calledWith(getMessageServerGuidsForSpam, conversation.id);
    sinon.assert.calledOnce(jobQueue.add);
    sinon.assert.calledWith(jobQueue.add, {
      uuid: conversation.uuid,
      serverGuids: ["abc", "xyz"]
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYWRkUmVwb3J0U3BhbUpvYl90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCB7IGdldERlZmF1bHRDb252ZXJzYXRpb24gfSBmcm9tICcuLi8uLi8uLi90ZXN0LWJvdGgvaGVscGVycy9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcbmltcG9ydCB7IEpvYiB9IGZyb20gJy4uLy4uLy4uL2pvYnMvSm9iJztcblxuaW1wb3J0IHsgYWRkUmVwb3J0U3BhbUpvYiB9IGZyb20gJy4uLy4uLy4uL2pvYnMvaGVscGVycy9hZGRSZXBvcnRTcGFtSm9iJztcblxuZGVzY3JpYmUoJ2FkZFJlcG9ydFNwYW1Kb2InLCAoKSA9PiB7XG4gIGxldCBnZXRNZXNzYWdlU2VydmVyR3VpZHNGb3JTcGFtOiBzaW5vbi5TaW5vblN0dWI7XG4gIGxldCBqb2JRdWV1ZTogeyBhZGQ6IHNpbm9uLlNpbm9uU3R1YiB9O1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGdldE1lc3NhZ2VTZXJ2ZXJHdWlkc0ZvclNwYW0gPSBzaW5vbi5zdHViKCkucmVzb2x2ZXMoWydhYmMnLCAneHl6J10pO1xuICAgIGpvYlF1ZXVlID0ge1xuICAgICAgYWRkOiBzaW5vblxuICAgICAgICAuc3R1YigpXG4gICAgICAgIC5jYWxsc0Zha2UoXG4gICAgICAgICAgYXN5bmMgZGF0YSA9PlxuICAgICAgICAgICAgbmV3IEpvYjx1bmtub3duPihcbiAgICAgICAgICAgICAgJ2Zha2Utam9iLWlkJyxcbiAgICAgICAgICAgICAgRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgJ2Zha2Ugam9iIHF1ZXVlIHR5cGUnLFxuICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgICAgKVxuICAgICAgICApLFxuICAgIH07XG4gIH0pO1xuXG4gIGl0KCdkb2VzIG5vdGhpbmcgaWYgdGhlIGNvbnZlcnNhdGlvbiBsYWNrcyBhIFVVSUQnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgYWRkUmVwb3J0U3BhbUpvYih7XG4gICAgICBjb252ZXJzYXRpb246IGdldERlZmF1bHRDb252ZXJzYXRpb24oeyB1dWlkOiB1bmRlZmluZWQgfSksXG4gICAgICBnZXRNZXNzYWdlU2VydmVyR3VpZHNGb3JTcGFtLFxuICAgICAgam9iUXVldWUsXG4gICAgfSk7XG5cbiAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGdldE1lc3NhZ2VTZXJ2ZXJHdWlkc0ZvclNwYW0pO1xuICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoam9iUXVldWUuYWRkKTtcbiAgfSk7XG5cbiAgaXQoXCJkb2Vzbid0IGVucXVldWUgYSBqb2IgaWYgdGhlcmUgYXJlIG5vIG1lc3NhZ2VzIHdpdGggc2VydmVyIEdVSURzXCIsIGFzeW5jICgpID0+IHtcbiAgICBnZXRNZXNzYWdlU2VydmVyR3VpZHNGb3JTcGFtLnJlc29sdmVzKFtdKTtcblxuICAgIGF3YWl0IGFkZFJlcG9ydFNwYW1Kb2Ioe1xuICAgICAgY29udmVyc2F0aW9uOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICBnZXRNZXNzYWdlU2VydmVyR3VpZHNGb3JTcGFtLFxuICAgICAgam9iUXVldWUsXG4gICAgfSk7XG5cbiAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGpvYlF1ZXVlLmFkZCk7XG4gIH0pO1xuXG4gIGl0KCdlbnF1ZXVlcyBhIGpvYicsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjb252ZXJzYXRpb24gPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCk7XG5cbiAgICBhd2FpdCBhZGRSZXBvcnRTcGFtSm9iKHtcbiAgICAgIGNvbnZlcnNhdGlvbixcbiAgICAgIGdldE1lc3NhZ2VTZXJ2ZXJHdWlkc0ZvclNwYW0sXG4gICAgICBqb2JRdWV1ZSxcbiAgICB9KTtcblxuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGdldE1lc3NhZ2VTZXJ2ZXJHdWlkc0ZvclNwYW0pO1xuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGdldE1lc3NhZ2VTZXJ2ZXJHdWlkc0ZvclNwYW0sIGNvbnZlcnNhdGlvbi5pZCk7XG5cbiAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShqb2JRdWV1ZS5hZGQpO1xuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGpvYlF1ZXVlLmFkZCwge1xuICAgICAgdXVpZDogY29udmVyc2F0aW9uLnV1aWQsXG4gICAgICBzZXJ2ZXJHdWlkczogWydhYmMnLCAneHl6J10sXG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQSxZQUF1QjtBQUN2QixvQ0FBdUM7QUFDdkMsaUJBQW9CO0FBRXBCLDhCQUFpQztBQUVqQyxTQUFTLG9CQUFvQixNQUFNO0FBQ2pDLE1BQUk7QUFDSixNQUFJO0FBRUosYUFBVyxNQUFNO0FBQ2YsbUNBQStCLE1BQU0sS0FBSyxFQUFFLFNBQVMsQ0FBQyxPQUFPLEtBQUssQ0FBQztBQUNuRSxlQUFXO0FBQUEsTUFDVCxLQUFLLE1BQ0YsS0FBSyxFQUNMLFVBQ0MsT0FBTSxTQUNKLElBQUksZUFDRixlQUNBLEtBQUssSUFBSSxHQUNULHVCQUNBLE1BQ0EsUUFBUSxRQUFRLENBQ2xCLENBQ0o7QUFBQSxJQUNKO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRyxpREFBaUQsWUFBWTtBQUM5RCxVQUFNLDhDQUFpQjtBQUFBLE1BQ3JCLGNBQWMsMERBQXVCLEVBQUUsTUFBTSxPQUFVLENBQUM7QUFBQSxNQUN4RDtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFFRCxVQUFNLE9BQU8sVUFBVSw0QkFBNEI7QUFDbkQsVUFBTSxPQUFPLFVBQVUsU0FBUyxHQUFHO0FBQUEsRUFDckMsQ0FBQztBQUVELEtBQUcsb0VBQW9FLFlBQVk7QUFDakYsaUNBQTZCLFNBQVMsQ0FBQyxDQUFDO0FBRXhDLFVBQU0sOENBQWlCO0FBQUEsTUFDckIsY0FBYywwREFBdUI7QUFBQSxNQUNyQztBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFFRCxVQUFNLE9BQU8sVUFBVSxTQUFTLEdBQUc7QUFBQSxFQUNyQyxDQUFDO0FBRUQsS0FBRyxrQkFBa0IsWUFBWTtBQUMvQixVQUFNLGVBQWUsMERBQXVCO0FBRTVDLFVBQU0sOENBQWlCO0FBQUEsTUFDckI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUVELFVBQU0sT0FBTyxXQUFXLDRCQUE0QjtBQUNwRCxVQUFNLE9BQU8sV0FBVyw4QkFBOEIsYUFBYSxFQUFFO0FBRXJFLFVBQU0sT0FBTyxXQUFXLFNBQVMsR0FBRztBQUNwQyxVQUFNLE9BQU8sV0FBVyxTQUFTLEtBQUs7QUFBQSxNQUNwQyxNQUFNLGFBQWE7QUFBQSxNQUNuQixhQUFhLENBQUMsT0FBTyxLQUFLO0FBQUEsSUFDNUIsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
