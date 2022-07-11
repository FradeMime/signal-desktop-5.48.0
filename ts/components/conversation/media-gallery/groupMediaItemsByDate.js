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
var groupMediaItemsByDate_exports = {};
__export(groupMediaItemsByDate_exports, {
  groupMediaItemsByDate: () => groupMediaItemsByDate
});
module.exports = __toCommonJS(groupMediaItemsByDate_exports);
var import_moment = __toESM(require("moment"));
var import_lodash = require("lodash");
var log = __toESM(require("../../../logging/log"));
var import_getMessageTimestamp = require("../../../util/getMessageTimestamp");
var import_missingCaseError = require("../../../util/missingCaseError");
const groupMediaItemsByDate = /* @__PURE__ */ __name((timestamp, mediaItems) => {
  const referenceDateTime = import_moment.default.utc(timestamp);
  const sortedMediaItem = (0, import_lodash.sortBy)(mediaItems, (mediaItem) => {
    const { message } = mediaItem;
    return -message.received_at;
  });
  const messagesWithSection = sortedMediaItem.map(withSection(referenceDateTime));
  const groupedMediaItem = (0, import_lodash.groupBy)(messagesWithSection, "type");
  const yearMonthMediaItem = Object.values((0, import_lodash.groupBy)(groupedMediaItem.yearMonth, "order")).reverse();
  return (0, import_lodash.compact)([
    toSection(groupedMediaItem.today),
    toSection(groupedMediaItem.yesterday),
    toSection(groupedMediaItem.thisWeek),
    toSection(groupedMediaItem.thisMonth),
    ...yearMonthMediaItem.map(toSection)
  ]);
}, "groupMediaItemsByDate");
const toSection = /* @__PURE__ */ __name((messagesWithSection) => {
  if (!messagesWithSection || messagesWithSection.length === 0) {
    return void 0;
  }
  const firstMediaItemWithSection = messagesWithSection[0];
  if (!firstMediaItemWithSection) {
    return void 0;
  }
  const mediaItems = messagesWithSection.map((messageWithSection) => messageWithSection.mediaItem);
  switch (firstMediaItemWithSection.type) {
    case "today":
    case "yesterday":
    case "thisWeek":
    case "thisMonth":
      return {
        type: firstMediaItemWithSection.type,
        mediaItems
      };
    case "yearMonth":
      return {
        type: firstMediaItemWithSection.type,
        year: firstMediaItemWithSection.year,
        month: firstMediaItemWithSection.month,
        mediaItems
      };
    default:
      log.error((0, import_missingCaseError.missingCaseError)(firstMediaItemWithSection));
      return void 0;
  }
}, "toSection");
const withSection = /* @__PURE__ */ __name((referenceDateTime) => (mediaItem) => {
  const today = (0, import_moment.default)(referenceDateTime).startOf("day");
  const yesterday = (0, import_moment.default)(referenceDateTime).subtract(1, "day").startOf("day");
  const thisWeek = (0, import_moment.default)(referenceDateTime).startOf("isoWeek");
  const thisMonth = (0, import_moment.default)(referenceDateTime).startOf("month");
  const { message } = mediaItem;
  const mediaItemReceivedDate = import_moment.default.utc((0, import_getMessageTimestamp.getMessageTimestamp)(message));
  if (mediaItemReceivedDate.isAfter(today)) {
    return {
      order: 0,
      type: "today",
      mediaItem
    };
  }
  if (mediaItemReceivedDate.isAfter(yesterday)) {
    return {
      order: 1,
      type: "yesterday",
      mediaItem
    };
  }
  if (mediaItemReceivedDate.isAfter(thisWeek)) {
    return {
      order: 2,
      type: "thisWeek",
      mediaItem
    };
  }
  if (mediaItemReceivedDate.isAfter(thisMonth)) {
    return {
      order: 3,
      type: "thisMonth",
      mediaItem
    };
  }
  const month = mediaItemReceivedDate.month();
  const year = mediaItemReceivedDate.year();
  return {
    order: year * 100 + month,
    type: "yearMonth",
    month,
    year,
    mediaItem
  };
}, "withSection");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  groupMediaItemsByDate
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ3JvdXBNZWRpYUl0ZW1zQnlEYXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgY29tcGFjdCwgZ3JvdXBCeSwgc29ydEJ5IH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uLy4uLy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB0eXBlIHsgTWVkaWFJdGVtVHlwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL01lZGlhSXRlbSc7XG5pbXBvcnQgeyBnZXRNZXNzYWdlVGltZXN0YW1wIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9nZXRNZXNzYWdlVGltZXN0YW1wJztcblxuaW1wb3J0IHsgbWlzc2luZ0Nhc2VFcnJvciB9IGZyb20gJy4uLy4uLy4uL3V0aWwvbWlzc2luZ0Nhc2VFcnJvcic7XG5cbnR5cGUgU3RhdGljU2VjdGlvblR5cGUgPSAndG9kYXknIHwgJ3llc3RlcmRheScgfCAndGhpc1dlZWsnIHwgJ3RoaXNNb250aCc7XG50eXBlIFllYXJNb250aFNlY3Rpb25UeXBlID0gJ3llYXJNb250aCc7XG5cbnR5cGUgR2VuZXJpY1NlY3Rpb248VD4gPSB7XG4gIHR5cGU6IFQ7XG4gIG1lZGlhSXRlbXM6IEFycmF5PE1lZGlhSXRlbVR5cGU+O1xufTtcbnR5cGUgU3RhdGljU2VjdGlvbiA9IEdlbmVyaWNTZWN0aW9uPFN0YXRpY1NlY3Rpb25UeXBlPjtcbnR5cGUgWWVhck1vbnRoU2VjdGlvbiA9IEdlbmVyaWNTZWN0aW9uPFllYXJNb250aFNlY3Rpb25UeXBlPiAmIHtcbiAgeWVhcjogbnVtYmVyO1xuICBtb250aDogbnVtYmVyO1xufTtcbmV4cG9ydCB0eXBlIFNlY3Rpb24gPSBTdGF0aWNTZWN0aW9uIHwgWWVhck1vbnRoU2VjdGlvbjtcbmV4cG9ydCBjb25zdCBncm91cE1lZGlhSXRlbXNCeURhdGUgPSAoXG4gIHRpbWVzdGFtcDogbnVtYmVyLFxuICBtZWRpYUl0ZW1zOiBBcnJheTxNZWRpYUl0ZW1UeXBlPlxuKTogQXJyYXk8U2VjdGlvbj4gPT4ge1xuICBjb25zdCByZWZlcmVuY2VEYXRlVGltZSA9IG1vbWVudC51dGModGltZXN0YW1wKTtcblxuICBjb25zdCBzb3J0ZWRNZWRpYUl0ZW0gPSBzb3J0QnkobWVkaWFJdGVtcywgbWVkaWFJdGVtID0+IHtcbiAgICBjb25zdCB7IG1lc3NhZ2UgfSA9IG1lZGlhSXRlbTtcblxuICAgIHJldHVybiAtbWVzc2FnZS5yZWNlaXZlZF9hdDtcbiAgfSk7XG4gIGNvbnN0IG1lc3NhZ2VzV2l0aFNlY3Rpb24gPSBzb3J0ZWRNZWRpYUl0ZW0ubWFwKFxuICAgIHdpdGhTZWN0aW9uKHJlZmVyZW5jZURhdGVUaW1lKVxuICApO1xuICBjb25zdCBncm91cGVkTWVkaWFJdGVtID0gZ3JvdXBCeShtZXNzYWdlc1dpdGhTZWN0aW9uLCAndHlwZScpO1xuICBjb25zdCB5ZWFyTW9udGhNZWRpYUl0ZW0gPSBPYmplY3QudmFsdWVzKFxuICAgIGdyb3VwQnkoZ3JvdXBlZE1lZGlhSXRlbS55ZWFyTW9udGgsICdvcmRlcicpXG4gICkucmV2ZXJzZSgpO1xuXG4gIHJldHVybiBjb21wYWN0KFtcbiAgICB0b1NlY3Rpb24oZ3JvdXBlZE1lZGlhSXRlbS50b2RheSksXG4gICAgdG9TZWN0aW9uKGdyb3VwZWRNZWRpYUl0ZW0ueWVzdGVyZGF5KSxcbiAgICB0b1NlY3Rpb24oZ3JvdXBlZE1lZGlhSXRlbS50aGlzV2VlayksXG4gICAgdG9TZWN0aW9uKGdyb3VwZWRNZWRpYUl0ZW0udGhpc01vbnRoKSxcbiAgICAuLi55ZWFyTW9udGhNZWRpYUl0ZW0ubWFwKHRvU2VjdGlvbiksXG4gIF0pO1xufTtcblxuY29uc3QgdG9TZWN0aW9uID0gKFxuICBtZXNzYWdlc1dpdGhTZWN0aW9uOiBBcnJheTxNZWRpYUl0ZW1XaXRoU2VjdGlvbj4gfCB1bmRlZmluZWRcbik6IFNlY3Rpb24gfCB1bmRlZmluZWQgPT4ge1xuICBpZiAoIW1lc3NhZ2VzV2l0aFNlY3Rpb24gfHwgbWVzc2FnZXNXaXRoU2VjdGlvbi5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgZmlyc3RNZWRpYUl0ZW1XaXRoU2VjdGlvbjogdW5kZWZpbmVkIHwgTWVkaWFJdGVtV2l0aFNlY3Rpb24gPVxuICAgIG1lc3NhZ2VzV2l0aFNlY3Rpb25bMF07XG4gIGlmICghZmlyc3RNZWRpYUl0ZW1XaXRoU2VjdGlvbikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBtZWRpYUl0ZW1zID0gbWVzc2FnZXNXaXRoU2VjdGlvbi5tYXAoXG4gICAgbWVzc2FnZVdpdGhTZWN0aW9uID0+IG1lc3NhZ2VXaXRoU2VjdGlvbi5tZWRpYUl0ZW1cbiAgKTtcbiAgc3dpdGNoIChmaXJzdE1lZGlhSXRlbVdpdGhTZWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICd0b2RheSc6XG4gICAgY2FzZSAneWVzdGVyZGF5JzpcbiAgICBjYXNlICd0aGlzV2Vlayc6XG4gICAgY2FzZSAndGhpc01vbnRoJzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGZpcnN0TWVkaWFJdGVtV2l0aFNlY3Rpb24udHlwZSxcbiAgICAgICAgbWVkaWFJdGVtcyxcbiAgICAgIH07XG4gICAgY2FzZSAneWVhck1vbnRoJzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IGZpcnN0TWVkaWFJdGVtV2l0aFNlY3Rpb24udHlwZSxcbiAgICAgICAgeWVhcjogZmlyc3RNZWRpYUl0ZW1XaXRoU2VjdGlvbi55ZWFyLFxuICAgICAgICBtb250aDogZmlyc3RNZWRpYUl0ZW1XaXRoU2VjdGlvbi5tb250aCxcbiAgICAgICAgbWVkaWFJdGVtcyxcbiAgICAgIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZy5lcnJvcihtaXNzaW5nQ2FzZUVycm9yKGZpcnN0TWVkaWFJdGVtV2l0aFNlY3Rpb24pKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn07XG5cbnR5cGUgR2VuZXJpY01lZGlhSXRlbVdpdGhTZWN0aW9uPFQ+ID0ge1xuICBvcmRlcjogbnVtYmVyO1xuICB0eXBlOiBUO1xuICBtZWRpYUl0ZW06IE1lZGlhSXRlbVR5cGU7XG59O1xudHlwZSBNZWRpYUl0ZW1XaXRoU3RhdGljU2VjdGlvbiA9XG4gIEdlbmVyaWNNZWRpYUl0ZW1XaXRoU2VjdGlvbjxTdGF0aWNTZWN0aW9uVHlwZT47XG50eXBlIE1lZGlhSXRlbVdpdGhZZWFyTW9udGhTZWN0aW9uID1cbiAgR2VuZXJpY01lZGlhSXRlbVdpdGhTZWN0aW9uPFllYXJNb250aFNlY3Rpb25UeXBlPiAmIHtcbiAgICB5ZWFyOiBudW1iZXI7XG4gICAgbW9udGg6IG51bWJlcjtcbiAgfTtcbnR5cGUgTWVkaWFJdGVtV2l0aFNlY3Rpb24gPVxuICB8IE1lZGlhSXRlbVdpdGhTdGF0aWNTZWN0aW9uXG4gIHwgTWVkaWFJdGVtV2l0aFllYXJNb250aFNlY3Rpb247XG5cbmNvbnN0IHdpdGhTZWN0aW9uID1cbiAgKHJlZmVyZW5jZURhdGVUaW1lOiBtb21lbnQuTW9tZW50KSA9PlxuICAobWVkaWFJdGVtOiBNZWRpYUl0ZW1UeXBlKTogTWVkaWFJdGVtV2l0aFNlY3Rpb24gPT4ge1xuICAgIGNvbnN0IHRvZGF5ID0gbW9tZW50KHJlZmVyZW5jZURhdGVUaW1lKS5zdGFydE9mKCdkYXknKTtcbiAgICBjb25zdCB5ZXN0ZXJkYXkgPSBtb21lbnQocmVmZXJlbmNlRGF0ZVRpbWUpXG4gICAgICAuc3VidHJhY3QoMSwgJ2RheScpXG4gICAgICAuc3RhcnRPZignZGF5Jyk7XG4gICAgY29uc3QgdGhpc1dlZWsgPSBtb21lbnQocmVmZXJlbmNlRGF0ZVRpbWUpLnN0YXJ0T2YoJ2lzb1dlZWsnKTtcbiAgICBjb25zdCB0aGlzTW9udGggPSBtb21lbnQocmVmZXJlbmNlRGF0ZVRpbWUpLnN0YXJ0T2YoJ21vbnRoJyk7XG5cbiAgICBjb25zdCB7IG1lc3NhZ2UgfSA9IG1lZGlhSXRlbTtcbiAgICBjb25zdCBtZWRpYUl0ZW1SZWNlaXZlZERhdGUgPSBtb21lbnQudXRjKGdldE1lc3NhZ2VUaW1lc3RhbXAobWVzc2FnZSkpO1xuICAgIGlmIChtZWRpYUl0ZW1SZWNlaXZlZERhdGUuaXNBZnRlcih0b2RheSkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG9yZGVyOiAwLFxuICAgICAgICB0eXBlOiAndG9kYXknLFxuICAgICAgICBtZWRpYUl0ZW0sXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAobWVkaWFJdGVtUmVjZWl2ZWREYXRlLmlzQWZ0ZXIoeWVzdGVyZGF5KSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb3JkZXI6IDEsXG4gICAgICAgIHR5cGU6ICd5ZXN0ZXJkYXknLFxuICAgICAgICBtZWRpYUl0ZW0sXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAobWVkaWFJdGVtUmVjZWl2ZWREYXRlLmlzQWZ0ZXIodGhpc1dlZWspKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBvcmRlcjogMixcbiAgICAgICAgdHlwZTogJ3RoaXNXZWVrJyxcbiAgICAgICAgbWVkaWFJdGVtLFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKG1lZGlhSXRlbVJlY2VpdmVkRGF0ZS5pc0FmdGVyKHRoaXNNb250aCkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG9yZGVyOiAzLFxuICAgICAgICB0eXBlOiAndGhpc01vbnRoJyxcbiAgICAgICAgbWVkaWFJdGVtLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCBtb250aDogbnVtYmVyID0gbWVkaWFJdGVtUmVjZWl2ZWREYXRlLm1vbnRoKCk7XG4gICAgY29uc3QgeWVhcjogbnVtYmVyID0gbWVkaWFJdGVtUmVjZWl2ZWREYXRlLnllYXIoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBvcmRlcjogeWVhciAqIDEwMCArIG1vbnRoLFxuICAgICAgdHlwZTogJ3llYXJNb250aCcsXG4gICAgICBtb250aCxcbiAgICAgIHllYXIsXG4gICAgICBtZWRpYUl0ZW0sXG4gICAgfTtcbiAgfTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBbUI7QUFDbkIsb0JBQXlDO0FBRXpDLFVBQXFCO0FBRXJCLGlDQUFvQztBQUVwQyw4QkFBaUM7QUFlMUIsTUFBTSx3QkFBd0Isd0JBQ25DLFdBQ0EsZUFDbUI7QUFDbkIsUUFBTSxvQkFBb0Isc0JBQU8sSUFBSSxTQUFTO0FBRTlDLFFBQU0sa0JBQWtCLDBCQUFPLFlBQVksZUFBYTtBQUN0RCxVQUFNLEVBQUUsWUFBWTtBQUVwQixXQUFPLENBQUMsUUFBUTtBQUFBLEVBQ2xCLENBQUM7QUFDRCxRQUFNLHNCQUFzQixnQkFBZ0IsSUFDMUMsWUFBWSxpQkFBaUIsQ0FDL0I7QUFDQSxRQUFNLG1CQUFtQiwyQkFBUSxxQkFBcUIsTUFBTTtBQUM1RCxRQUFNLHFCQUFxQixPQUFPLE9BQ2hDLDJCQUFRLGlCQUFpQixXQUFXLE9BQU8sQ0FDN0MsRUFBRSxRQUFRO0FBRVYsU0FBTywyQkFBUTtBQUFBLElBQ2IsVUFBVSxpQkFBaUIsS0FBSztBQUFBLElBQ2hDLFVBQVUsaUJBQWlCLFNBQVM7QUFBQSxJQUNwQyxVQUFVLGlCQUFpQixRQUFRO0FBQUEsSUFDbkMsVUFBVSxpQkFBaUIsU0FBUztBQUFBLElBQ3BDLEdBQUcsbUJBQW1CLElBQUksU0FBUztBQUFBLEVBQ3JDLENBQUM7QUFDSCxHQTFCcUM7QUE0QnJDLE1BQU0sWUFBWSx3QkFDaEIsd0JBQ3dCO0FBQ3hCLE1BQUksQ0FBQyx1QkFBdUIsb0JBQW9CLFdBQVcsR0FBRztBQUM1RCxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sNEJBQ0osb0JBQW9CO0FBQ3RCLE1BQUksQ0FBQywyQkFBMkI7QUFDOUIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLGFBQWEsb0JBQW9CLElBQ3JDLHdCQUFzQixtQkFBbUIsU0FDM0M7QUFDQSxVQUFRLDBCQUEwQjtBQUFBLFNBQzNCO0FBQUEsU0FDQTtBQUFBLFNBQ0E7QUFBQSxTQUNBO0FBQ0gsYUFBTztBQUFBLFFBQ0wsTUFBTSwwQkFBMEI7QUFBQSxRQUNoQztBQUFBLE1BQ0Y7QUFBQSxTQUNHO0FBQ0gsYUFBTztBQUFBLFFBQ0wsTUFBTSwwQkFBMEI7QUFBQSxRQUNoQyxNQUFNLDBCQUEwQjtBQUFBLFFBQ2hDLE9BQU8sMEJBQTBCO0FBQUEsUUFDakM7QUFBQSxNQUNGO0FBQUE7QUFFQSxVQUFJLE1BQU0sOENBQWlCLHlCQUF5QixDQUFDO0FBQ3JELGFBQU87QUFBQTtBQUViLEdBcENrQjtBQXNEbEIsTUFBTSxjQUNKLHdCQUFDLHNCQUNELENBQUMsY0FBbUQ7QUFDbEQsUUFBTSxRQUFRLDJCQUFPLGlCQUFpQixFQUFFLFFBQVEsS0FBSztBQUNyRCxRQUFNLFlBQVksMkJBQU8saUJBQWlCLEVBQ3ZDLFNBQVMsR0FBRyxLQUFLLEVBQ2pCLFFBQVEsS0FBSztBQUNoQixRQUFNLFdBQVcsMkJBQU8saUJBQWlCLEVBQUUsUUFBUSxTQUFTO0FBQzVELFFBQU0sWUFBWSwyQkFBTyxpQkFBaUIsRUFBRSxRQUFRLE9BQU87QUFFM0QsUUFBTSxFQUFFLFlBQVk7QUFDcEIsUUFBTSx3QkFBd0Isc0JBQU8sSUFBSSxvREFBb0IsT0FBTyxDQUFDO0FBQ3JFLE1BQUksc0JBQXNCLFFBQVEsS0FBSyxHQUFHO0FBQ3hDLFdBQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDQSxNQUFJLHNCQUFzQixRQUFRLFNBQVMsR0FBRztBQUM1QyxXQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0EsTUFBSSxzQkFBc0IsUUFBUSxRQUFRLEdBQUc7QUFDM0MsV0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ047QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNBLE1BQUksc0JBQXNCLFFBQVEsU0FBUyxHQUFHO0FBQzVDLFdBQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLFFBQWdCLHNCQUFzQixNQUFNO0FBQ2xELFFBQU0sT0FBZSxzQkFBc0IsS0FBSztBQUVoRCxTQUFPO0FBQUEsSUFDTCxPQUFPLE9BQU8sTUFBTTtBQUFBLElBQ3BCLE1BQU07QUFBQSxJQUNOO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0YsR0FsREE7IiwKICAibmFtZXMiOiBbXQp9Cg==
