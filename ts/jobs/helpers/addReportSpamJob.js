var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var addReportSpamJob_exports = {};
__export(addReportSpamJob_exports, {
  addReportSpamJob: () => addReportSpamJob
});
module.exports = __toCommonJS(addReportSpamJob_exports);
var import_assert = require("../../util/assert");
var log = __toESM(require("../../logging/log"));
async function addReportSpamJob({
  conversation,
  getMessageServerGuidsForSpam,
  jobQueue
}) {
  (0, import_assert.assert)(conversation.type === "direct", "addReportSpamJob: cannot report spam for non-direct conversations");
  const { uuid } = conversation;
  if (!uuid) {
    log.info("addReportSpamJob got a conversation with no UUID, which the server does not support. Doing nothing");
    return;
  }
  const serverGuids = await getMessageServerGuidsForSpam(conversation.id);
  if (!serverGuids.length) {
    log.info("addReportSpamJob got no server GUIDs from the database. Doing nothing");
    return;
  }
  await jobQueue.add({ uuid, serverGuids });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addReportSpamJob
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYWRkUmVwb3J0U3BhbUpvYi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IHJlcG9ydFNwYW1Kb2JRdWV1ZSB9IGZyb20gJy4uL3JlcG9ydFNwYW1Kb2JRdWV1ZSc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRSZXBvcnRTcGFtSm9iKHtcbiAgY29udmVyc2F0aW9uLFxuICBnZXRNZXNzYWdlU2VydmVyR3VpZHNGb3JTcGFtLFxuICBqb2JRdWV1ZSxcbn06IFJlYWRvbmx5PHtcbiAgY29udmVyc2F0aW9uOiBSZWFkb25seTxDb252ZXJzYXRpb25UeXBlPjtcbiAgZ2V0TWVzc2FnZVNlcnZlckd1aWRzRm9yU3BhbTogKFxuICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmdcbiAgKSA9PiBQcm9taXNlPEFycmF5PHN0cmluZz4+O1xuICBqb2JRdWV1ZTogUGljazx0eXBlb2YgcmVwb3J0U3BhbUpvYlF1ZXVlLCAnYWRkJz47XG59Pik6IFByb21pc2U8dm9pZD4ge1xuICBhc3NlcnQoXG4gICAgY29udmVyc2F0aW9uLnR5cGUgPT09ICdkaXJlY3QnLFxuICAgICdhZGRSZXBvcnRTcGFtSm9iOiBjYW5ub3QgcmVwb3J0IHNwYW0gZm9yIG5vbi1kaXJlY3QgY29udmVyc2F0aW9ucydcbiAgKTtcblxuICBjb25zdCB7IHV1aWQgfSA9IGNvbnZlcnNhdGlvbjtcbiAgaWYgKCF1dWlkKSB7XG4gICAgbG9nLmluZm8oXG4gICAgICAnYWRkUmVwb3J0U3BhbUpvYiBnb3QgYSBjb252ZXJzYXRpb24gd2l0aCBubyBVVUlELCB3aGljaCB0aGUgc2VydmVyIGRvZXMgbm90IHN1cHBvcnQuIERvaW5nIG5vdGhpbmcnXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzZXJ2ZXJHdWlkcyA9IGF3YWl0IGdldE1lc3NhZ2VTZXJ2ZXJHdWlkc0ZvclNwYW0oY29udmVyc2F0aW9uLmlkKTtcbiAgaWYgKCFzZXJ2ZXJHdWlkcy5sZW5ndGgpIHtcbiAgICAvLyBUaGlzIGNhbiBoYXBwZW4gdW5kZXIgbm9ybWFsIGNvbmRpdGlvbnMuIFdlIGhhdmVuJ3QgYWx3YXlzIHN0b3JlZCBzZXJ2ZXIgR1VJRHMsIHNvXG4gICAgLy8gICBhIHVzZXIgbWlnaHQgdHJ5IHRvIHJlcG9ydCBzcGFtIGZvciBhIGNvbnZlcnNhdGlvbiB0aGF0IGRvZXNuJ3QgaGF2ZSB0aGVtLiAoSXRcbiAgICAvLyAgIG1heSBhbHNvIGluZGljYXRlIGRldmVsb3BlciBlcnJvciwgYnV0IHRoYXQncyBub3QgbmVjZXNzYXJpbHkgdGhlIGNhc2UuKVxuICAgIGxvZy5pbmZvKFxuICAgICAgJ2FkZFJlcG9ydFNwYW1Kb2IgZ290IG5vIHNlcnZlciBHVUlEcyBmcm9tIHRoZSBkYXRhYmFzZS4gRG9pbmcgbm90aGluZydcbiAgICApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGF3YWl0IGpvYlF1ZXVlLmFkZCh7IHV1aWQsIHNlcnZlckd1aWRzIH0pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUF1QjtBQUN2QixVQUFxQjtBQUlyQixnQ0FBdUM7QUFBQSxFQUNyQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FPaUI7QUFDakIsNEJBQ0UsYUFBYSxTQUFTLFVBQ3RCLG1FQUNGO0FBRUEsUUFBTSxFQUFFLFNBQVM7QUFDakIsTUFBSSxDQUFDLE1BQU07QUFDVCxRQUFJLEtBQ0Ysb0dBQ0Y7QUFDQTtBQUFBLEVBQ0Y7QUFFQSxRQUFNLGNBQWMsTUFBTSw2QkFBNkIsYUFBYSxFQUFFO0FBQ3RFLE1BQUksQ0FBQyxZQUFZLFFBQVE7QUFJdkIsUUFBSSxLQUNGLHVFQUNGO0FBQ0E7QUFBQSxFQUNGO0FBRUEsUUFBTSxTQUFTLElBQUksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMxQztBQXBDc0IiLAogICJuYW1lcyI6IFtdCn0K
