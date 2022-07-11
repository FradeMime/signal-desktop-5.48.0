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
var report_message_aci_exports = {};
__export(report_message_aci_exports, {
  default: () => updateToSchemaVersion55
});
module.exports = __toCommonJS(report_message_aci_exports);
var import_Server = require("../Server");
var import_isRecord = require("../../util/isRecord");
var import_iterables = require("../../util/iterables");
function updateToSchemaVersion55(currentVersion, db, logger) {
  if (currentVersion >= 55) {
    return;
  }
  db.transaction(() => {
    const deleteJobsInQueue = db.prepare("DELETE FROM jobs WHERE queueType = $queueType");
    const reportSpamJobs = (0, import_Server.getJobsInQueueSync)(db, "report spam");
    deleteJobsInQueue.run({ queueType: "report spam" });
    reportSpamJobs.forEach((job) => {
      const { data, id } = job;
      if (!(0, import_isRecord.isRecord)(data)) {
        logger.warn(`updateToSchemaVersion55: report spam queue job ${id} was missing valid data`);
        return;
      }
      const { e164, serverGuids } = data;
      if (typeof e164 !== "string") {
        logger.warn(`updateToSchemaVersion55: report spam queue job ${id} had a non-string e164`);
        return;
      }
      if (!(0, import_iterables.isIterable)(serverGuids)) {
        logger.warn(`updateToSchemaVersion55: report spam queue job ${id} had a non-iterable serverGuids`);
        return;
      }
      const newJob = {
        ...job,
        queueType: "report spam",
        data: {
          uuid: e164,
          serverGuids
        }
      };
      (0, import_Server.insertJobSync)(db, newJob);
    });
    db.pragma("user_version = 55");
  })();
  logger.info("updateToSchemaVersion55: success!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiNTUtcmVwb3J0LW1lc3NhZ2UtYWNpLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRGF0YWJhc2UgfSBmcm9tICdiZXR0ZXItc3FsaXRlMyc7XG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Mb2dnaW5nJztcbmltcG9ydCB7IGdldEpvYnNJblF1ZXVlU3luYywgaW5zZXJ0Sm9iU3luYyB9IGZyb20gJy4uL1NlcnZlcic7XG5pbXBvcnQgeyBpc1JlY29yZCB9IGZyb20gJy4uLy4uL3V0aWwvaXNSZWNvcmQnO1xuaW1wb3J0IHsgaXNJdGVyYWJsZSB9IGZyb20gJy4uLy4uL3V0aWwvaXRlcmFibGVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uNTUoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDU1KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGNvbnN0IGRlbGV0ZUpvYnNJblF1ZXVlID0gZGIucHJlcGFyZShcbiAgICAgICdERUxFVEUgRlJPTSBqb2JzIFdIRVJFIHF1ZXVlVHlwZSA9ICRxdWV1ZVR5cGUnXG4gICAgKTtcblxuICAgIC8vIEZpcnN0LCBtYWtlIHN1cmUgdGhhdCByZXBvcnQgc3BhbSBqb2IgZGF0YSBoYXMgZTE2NCBhbmQgc2VydmVyR3VpZHNcbiAgICBjb25zdCByZXBvcnRTcGFtSm9icyA9IGdldEpvYnNJblF1ZXVlU3luYyhkYiwgJ3JlcG9ydCBzcGFtJyk7XG4gICAgZGVsZXRlSm9ic0luUXVldWUucnVuKHsgcXVldWVUeXBlOiAncmVwb3J0IHNwYW0nIH0pO1xuXG4gICAgcmVwb3J0U3BhbUpvYnMuZm9yRWFjaChqb2IgPT4ge1xuICAgICAgY29uc3QgeyBkYXRhLCBpZCB9ID0gam9iO1xuXG4gICAgICBpZiAoIWlzUmVjb3JkKGRhdGEpKSB7XG4gICAgICAgIGxvZ2dlci53YXJuKFxuICAgICAgICAgIGB1cGRhdGVUb1NjaGVtYVZlcnNpb241NTogcmVwb3J0IHNwYW0gcXVldWUgam9iICR7aWR9IHdhcyBtaXNzaW5nIHZhbGlkIGRhdGFgXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBlMTY0LCBzZXJ2ZXJHdWlkcyB9ID0gZGF0YTtcbiAgICAgIGlmICh0eXBlb2YgZTE2NCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgbG9nZ2VyLndhcm4oXG4gICAgICAgICAgYHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjU1OiByZXBvcnQgc3BhbSBxdWV1ZSBqb2IgJHtpZH0gaGFkIGEgbm9uLXN0cmluZyBlMTY0YFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNJdGVyYWJsZShzZXJ2ZXJHdWlkcykpIHtcbiAgICAgICAgbG9nZ2VyLndhcm4oXG4gICAgICAgICAgYHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjU1OiByZXBvcnQgc3BhbSBxdWV1ZSBqb2IgJHtpZH0gaGFkIGEgbm9uLWl0ZXJhYmxlIHNlcnZlckd1aWRzYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5ld0pvYiA9IHtcbiAgICAgICAgLi4uam9iLFxuICAgICAgICBxdWV1ZVR5cGU6ICdyZXBvcnQgc3BhbScsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB1dWlkOiBlMTY0LCAvLyB0aGlzIGxvb2tzIG9kZCwgYnV0IHRoZXkgYXJlIGJvdGggc3RyaW5ncyBhbmQgaW50ZXJjaGFuZ2VhYmxlIGluIHRoZSBzZXJ2ZXIgQVBJXG4gICAgICAgICAgc2VydmVyR3VpZHMsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBpbnNlcnRKb2JTeW5jKGRiLCBuZXdKb2IpO1xuICAgIH0pO1xuXG4gICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSA1NScpO1xuICB9KSgpO1xuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uNTU6IHN1Y2Nlc3MhJyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0Esb0JBQWtEO0FBQ2xELHNCQUF5QjtBQUN6Qix1QkFBMkI7QUFFWixpQ0FDYixnQkFDQSxJQUNBLFFBQ007QUFDTixNQUFJLGtCQUFrQixJQUFJO0FBQ3hCO0FBQUEsRUFDRjtBQUVBLEtBQUcsWUFBWSxNQUFNO0FBQ25CLFVBQU0sb0JBQW9CLEdBQUcsUUFDM0IsK0NBQ0Y7QUFHQSxVQUFNLGlCQUFpQixzQ0FBbUIsSUFBSSxhQUFhO0FBQzNELHNCQUFrQixJQUFJLEVBQUUsV0FBVyxjQUFjLENBQUM7QUFFbEQsbUJBQWUsUUFBUSxTQUFPO0FBQzVCLFlBQU0sRUFBRSxNQUFNLE9BQU87QUFFckIsVUFBSSxDQUFDLDhCQUFTLElBQUksR0FBRztBQUNuQixlQUFPLEtBQ0wsa0RBQWtELDJCQUNwRDtBQUNBO0FBQUEsTUFDRjtBQUVBLFlBQU0sRUFBRSxNQUFNLGdCQUFnQjtBQUM5QixVQUFJLE9BQU8sU0FBUyxVQUFVO0FBQzVCLGVBQU8sS0FDTCxrREFBa0QsMEJBQ3BEO0FBQ0E7QUFBQSxNQUNGO0FBRUEsVUFBSSxDQUFDLGlDQUFXLFdBQVcsR0FBRztBQUM1QixlQUFPLEtBQ0wsa0RBQWtELG1DQUNwRDtBQUNBO0FBQUEsTUFDRjtBQUVBLFlBQU0sU0FBUztBQUFBLFdBQ1Y7QUFBQSxRQUNILFdBQVc7QUFBQSxRQUNYLE1BQU07QUFBQSxVQUNKLE1BQU07QUFBQSxVQUNOO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFFQSx1Q0FBYyxJQUFJLE1BQU07QUFBQSxJQUMxQixDQUFDO0FBRUQsT0FBRyxPQUFPLG1CQUFtQjtBQUFBLEVBQy9CLENBQUMsRUFBRTtBQUNILFNBQU8sS0FBSyxtQ0FBbUM7QUFDakQ7QUExRHdCIiwKICAibmFtZXMiOiBbXQp9Cg==
