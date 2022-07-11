var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var centralize_conversation_jobs_exports = {};
__export(centralize_conversation_jobs_exports, {
  default: () => updateToSchemaVersion51
});
module.exports = __toCommonJS(centralize_conversation_jobs_exports);
var import_isRecord = require("../../util/isRecord");
var import_Server = require("../Server");
function updateToSchemaVersion51(currentVersion, db, logger) {
  if (currentVersion >= 51) {
    return;
  }
  db.transaction(() => {
    const deleteJobsInQueue = db.prepare("DELETE FROM jobs WHERE queueType = $queueType");
    const reactionsJobs = (0, import_Server.getJobsInQueueSync)(db, "reactions");
    deleteJobsInQueue.run({ queueType: "reactions" });
    reactionsJobs.forEach((job) => {
      const { data, id } = job;
      if (!(0, import_isRecord.isRecord)(data)) {
        logger.warn(`updateToSchemaVersion51: reactions queue job ${id} was missing valid data`);
        return;
      }
      const { messageId } = data;
      if (typeof messageId !== "string") {
        logger.warn(`updateToSchemaVersion51: reactions queue job ${id} had a non-string messageId`);
        return;
      }
      const message = (0, import_Server.getMessageByIdSync)(db, messageId);
      if (!message) {
        logger.warn(`updateToSchemaVersion51: Unable to find message for reaction job ${id}`);
        return;
      }
      const { conversationId } = message;
      if (typeof conversationId !== "string") {
        logger.warn(`updateToSchemaVersion51: reactions queue job ${id} had a non-string conversationId`);
        return;
      }
      const newJob = {
        ...job,
        queueType: "conversation",
        data: {
          ...data,
          type: "Reaction",
          conversationId
        }
      };
      (0, import_Server.insertJobSync)(db, newJob);
    });
    const normalSendJobs = (0, import_Server.getJobsInQueueSync)(db, "normal send");
    deleteJobsInQueue.run({ queueType: "normal send" });
    normalSendJobs.forEach((job) => {
      const { data, id } = job;
      if (!(0, import_isRecord.isRecord)(data)) {
        logger.warn(`updateToSchemaVersion51: normal send queue job ${id} was missing valid data`);
        return;
      }
      const newJob = {
        ...job,
        queueType: "conversation",
        data: {
          ...data,
          type: "NormalMessage"
        }
      };
      (0, import_Server.insertJobSync)(db, newJob);
    });
    db.pragma("user_version = 51");
  })();
  logger.info("updateToSchemaVersion51: success!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiNTEtY2VudHJhbGl6ZS1jb252ZXJzYXRpb24tam9icy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IERhdGFiYXNlIH0gZnJvbSAnYmV0dGVyLXNxbGl0ZTMnO1xuXG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Mb2dnaW5nJztcbmltcG9ydCB7IGlzUmVjb3JkIH0gZnJvbSAnLi4vLi4vdXRpbC9pc1JlY29yZCc7XG5pbXBvcnQge1xuICBnZXRKb2JzSW5RdWV1ZVN5bmMsXG4gIGdldE1lc3NhZ2VCeUlkU3luYyxcbiAgaW5zZXJ0Sm9iU3luYyxcbn0gZnJvbSAnLi4vU2VydmVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uNTEoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDUxKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGNvbnN0IGRlbGV0ZUpvYnNJblF1ZXVlID0gZGIucHJlcGFyZShcbiAgICAgICdERUxFVEUgRlJPTSBqb2JzIFdIRVJFIHF1ZXVlVHlwZSA9ICRxdWV1ZVR5cGUnXG4gICAgKTtcblxuICAgIC8vIEZpcnN0LCBtYWtlIHN1cmUgdGhhdCByZWFjdGlvbnMgam9iIGRhdGEgaGFzIGEgdHlwZSBhbmQgY29udmVyc2F0aW9uSWRcbiAgICBjb25zdCByZWFjdGlvbnNKb2JzID0gZ2V0Sm9ic0luUXVldWVTeW5jKGRiLCAncmVhY3Rpb25zJyk7XG4gICAgZGVsZXRlSm9ic0luUXVldWUucnVuKHsgcXVldWVUeXBlOiAncmVhY3Rpb25zJyB9KTtcblxuICAgIHJlYWN0aW9uc0pvYnMuZm9yRWFjaChqb2IgPT4ge1xuICAgICAgY29uc3QgeyBkYXRhLCBpZCB9ID0gam9iO1xuXG4gICAgICBpZiAoIWlzUmVjb3JkKGRhdGEpKSB7XG4gICAgICAgIGxvZ2dlci53YXJuKFxuICAgICAgICAgIGB1cGRhdGVUb1NjaGVtYVZlcnNpb241MTogcmVhY3Rpb25zIHF1ZXVlIGpvYiAke2lkfSB3YXMgbWlzc2luZyB2YWxpZCBkYXRhYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgbWVzc2FnZUlkIH0gPSBkYXRhO1xuICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlSWQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGxvZ2dlci53YXJuKFxuICAgICAgICAgIGB1cGRhdGVUb1NjaGVtYVZlcnNpb241MTogcmVhY3Rpb25zIHF1ZXVlIGpvYiAke2lkfSBoYWQgYSBub24tc3RyaW5nIG1lc3NhZ2VJZGBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtZXNzYWdlID0gZ2V0TWVzc2FnZUJ5SWRTeW5jKGRiLCBtZXNzYWdlSWQpO1xuICAgICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgIGxvZ2dlci53YXJuKFxuICAgICAgICAgIGB1cGRhdGVUb1NjaGVtYVZlcnNpb241MTogVW5hYmxlIHRvIGZpbmQgbWVzc2FnZSBmb3IgcmVhY3Rpb24gam9iICR7aWR9YFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgY29udmVyc2F0aW9uSWQgfSA9IG1lc3NhZ2U7XG4gICAgICBpZiAodHlwZW9mIGNvbnZlcnNhdGlvbklkICE9PSAnc3RyaW5nJykge1xuICAgICAgICBsb2dnZXIud2FybihcbiAgICAgICAgICBgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNTE6IHJlYWN0aW9ucyBxdWV1ZSBqb2IgJHtpZH0gaGFkIGEgbm9uLXN0cmluZyBjb252ZXJzYXRpb25JZGBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdKb2IgPSB7XG4gICAgICAgIC4uLmpvYixcbiAgICAgICAgcXVldWVUeXBlOiAnY29udmVyc2F0aW9uJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIC4uLmRhdGEsXG4gICAgICAgICAgdHlwZTogJ1JlYWN0aW9uJyxcbiAgICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGluc2VydEpvYlN5bmMoZGIsIG5ld0pvYik7XG4gICAgfSk7XG5cbiAgICAvLyBUaGVuIG1ha2Ugc3VyZSBhbGwgbm9ybWFsIHNlbmQgam9iIGRhdGEgaGFzIGEgdHlwZVxuICAgIGNvbnN0IG5vcm1hbFNlbmRKb2JzID0gZ2V0Sm9ic0luUXVldWVTeW5jKGRiLCAnbm9ybWFsIHNlbmQnKTtcbiAgICBkZWxldGVKb2JzSW5RdWV1ZS5ydW4oeyBxdWV1ZVR5cGU6ICdub3JtYWwgc2VuZCcgfSk7XG5cbiAgICBub3JtYWxTZW5kSm9icy5mb3JFYWNoKGpvYiA9PiB7XG4gICAgICBjb25zdCB7IGRhdGEsIGlkIH0gPSBqb2I7XG5cbiAgICAgIGlmICghaXNSZWNvcmQoZGF0YSkpIHtcbiAgICAgICAgbG9nZ2VyLndhcm4oXG4gICAgICAgICAgYHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjUxOiBub3JtYWwgc2VuZCBxdWV1ZSBqb2IgJHtpZH0gd2FzIG1pc3NpbmcgdmFsaWQgZGF0YWBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdKb2IgPSB7XG4gICAgICAgIC4uLmpvYixcbiAgICAgICAgcXVldWVUeXBlOiAnY29udmVyc2F0aW9uJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIC4uLmRhdGEsXG4gICAgICAgICAgdHlwZTogJ05vcm1hbE1lc3NhZ2UnLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgaW5zZXJ0Sm9iU3luYyhkYiwgbmV3Sm9iKTtcbiAgICB9KTtcblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gNTEnKTtcbiAgfSkoKTtcblxuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uNTE6IHN1Y2Nlc3MhJyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTUEsc0JBQXlCO0FBQ3pCLG9CQUlPO0FBRVEsaUNBQ2IsZ0JBQ0EsSUFDQSxRQUNNO0FBQ04sTUFBSSxrQkFBa0IsSUFBSTtBQUN4QjtBQUFBLEVBQ0Y7QUFFQSxLQUFHLFlBQVksTUFBTTtBQUNuQixVQUFNLG9CQUFvQixHQUFHLFFBQzNCLCtDQUNGO0FBR0EsVUFBTSxnQkFBZ0Isc0NBQW1CLElBQUksV0FBVztBQUN4RCxzQkFBa0IsSUFBSSxFQUFFLFdBQVcsWUFBWSxDQUFDO0FBRWhELGtCQUFjLFFBQVEsU0FBTztBQUMzQixZQUFNLEVBQUUsTUFBTSxPQUFPO0FBRXJCLFVBQUksQ0FBQyw4QkFBUyxJQUFJLEdBQUc7QUFDbkIsZUFBTyxLQUNMLGdEQUFnRCwyQkFDbEQ7QUFDQTtBQUFBLE1BQ0Y7QUFFQSxZQUFNLEVBQUUsY0FBYztBQUN0QixVQUFJLE9BQU8sY0FBYyxVQUFVO0FBQ2pDLGVBQU8sS0FDTCxnREFBZ0QsK0JBQ2xEO0FBQ0E7QUFBQSxNQUNGO0FBRUEsWUFBTSxVQUFVLHNDQUFtQixJQUFJLFNBQVM7QUFDaEQsVUFBSSxDQUFDLFNBQVM7QUFDWixlQUFPLEtBQ0wsb0VBQW9FLElBQ3RFO0FBQ0E7QUFBQSxNQUNGO0FBRUEsWUFBTSxFQUFFLG1CQUFtQjtBQUMzQixVQUFJLE9BQU8sbUJBQW1CLFVBQVU7QUFDdEMsZUFBTyxLQUNMLGdEQUFnRCxvQ0FDbEQ7QUFDQTtBQUFBLE1BQ0Y7QUFFQSxZQUFNLFNBQVM7QUFBQSxXQUNWO0FBQUEsUUFDSCxXQUFXO0FBQUEsUUFDWCxNQUFNO0FBQUEsYUFDRDtBQUFBLFVBQ0gsTUFBTTtBQUFBLFVBQ047QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVBLHVDQUFjLElBQUksTUFBTTtBQUFBLElBQzFCLENBQUM7QUFHRCxVQUFNLGlCQUFpQixzQ0FBbUIsSUFBSSxhQUFhO0FBQzNELHNCQUFrQixJQUFJLEVBQUUsV0FBVyxjQUFjLENBQUM7QUFFbEQsbUJBQWUsUUFBUSxTQUFPO0FBQzVCLFlBQU0sRUFBRSxNQUFNLE9BQU87QUFFckIsVUFBSSxDQUFDLDhCQUFTLElBQUksR0FBRztBQUNuQixlQUFPLEtBQ0wsa0RBQWtELDJCQUNwRDtBQUNBO0FBQUEsTUFDRjtBQUVBLFlBQU0sU0FBUztBQUFBLFdBQ1Y7QUFBQSxRQUNILFdBQVc7QUFBQSxRQUNYLE1BQU07QUFBQSxhQUNEO0FBQUEsVUFDSCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFFQSx1Q0FBYyxJQUFJLE1BQU07QUFBQSxJQUMxQixDQUFDO0FBRUQsT0FBRyxPQUFPLG1CQUFtQjtBQUFBLEVBQy9CLENBQUMsRUFBRTtBQUVILFNBQU8sS0FBSyxtQ0FBbUM7QUFDakQ7QUEvRndCIiwKICAibmFtZXMiOiBbXQp9Cg==
