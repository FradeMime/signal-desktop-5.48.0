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
var memberRepository_exports = {};
__export(memberRepository_exports, {
  MemberRepository: () => MemberRepository
});
module.exports = __toCommonJS(memberRepository_exports);
var import_fuse = __toESM(require("fuse.js"));
var import_lodash = require("lodash");
var import_iterables = require("../util/iterables");
const FUSE_OPTIONS = {
  location: 0,
  shouldSort: true,
  threshold: 0,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["name", "firstName", "profileName", "title"],
  getFn(conversation, path) {
    const rawValue = (0, import_lodash.get)(conversation, path);
    if (typeof rawValue !== "string") {
      return "";
    }
    const segmenter = new Intl.Segmenter(void 0, { granularity: "word" });
    const segments = segmenter.segment(rawValue);
    const wordlikeSegments = (0, import_iterables.filter)(segments, (segment) => segment.isWordLike);
    const wordlikes = (0, import_iterables.map)(wordlikeSegments, (segment) => segment.segment);
    return Array.from(wordlikes);
  }
};
class MemberRepository {
  constructor(members = []) {
    this.members = members;
    this.isFuseReady = false;
    this.fuse = new import_fuse.default([], FUSE_OPTIONS);
  }
  updateMembers(members) {
    this.members = members;
    this.isFuseReady = false;
  }
  getMembers(omit) {
    if (omit) {
      return this.members.filter(({ id }) => id !== omit.id);
    }
    return this.members;
  }
  getMemberById(id) {
    return id ? this.members.find(({ id: memberId }) => memberId === id) : void 0;
  }
  getMemberByUuid(uuid) {
    return uuid ? this.members.find(({ uuid: memberUuid }) => memberUuid === uuid) : void 0;
  }
  search(pattern, omit) {
    if (!this.isFuseReady) {
      this.fuse.setCollection(this.members);
      this.isFuseReady = true;
    }
    const results = this.fuse.search(pattern).map((result) => result.item);
    if (omit) {
      return results.filter(({ id }) => id !== omit.id);
    }
    return results;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MemberRepository
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWVtYmVyUmVwb3NpdG9yeS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBGdXNlIGZyb20gJ2Z1c2UuanMnO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJy4uL3V0aWwvaXRlcmFibGVzJztcblxuY29uc3QgRlVTRV9PUFRJT05TID0ge1xuICBsb2NhdGlvbjogMCxcbiAgc2hvdWxkU29ydDogdHJ1ZSxcbiAgdGhyZXNob2xkOiAwLFxuICBtYXhQYXR0ZXJuTGVuZ3RoOiAzMixcbiAgbWluTWF0Y2hDaGFyTGVuZ3RoOiAxLFxuICBrZXlzOiBbJ25hbWUnLCAnZmlyc3ROYW1lJywgJ3Byb2ZpbGVOYW1lJywgJ3RpdGxlJ10sXG4gIGdldEZuKFxuICAgIGNvbnZlcnNhdGlvbjogUmVhZG9ubHk8Q29udmVyc2F0aW9uVHlwZT4sXG4gICAgcGF0aDogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPlxuICApOiBSZWFkb25seUFycmF5PHN0cmluZz4gfCBzdHJpbmcge1xuICAgIC8vIEl0J2QgYmUgbmljZSB0byBhdm9pZCB0aGlzIGNhc3QsIGJ1dCBGdXNlJ3MgdHlwZXMgZG9uJ3QgYWxsb3cgaXQuXG4gICAgY29uc3QgcmF3VmFsdWUgPSBnZXQoY29udmVyc2F0aW9uIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBwYXRoKTtcblxuICAgIGlmICh0eXBlb2YgcmF3VmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBJdCBtaWdodCBtYWtlIG1vcmUgc2Vuc2UgdG8gcmV0dXJuIGB1bmRlZmluZWRgIGhlcmUsIGJ1dCBbRnVzZSdzIHR5cGVzIGRvbid0XG4gICAgICAvLyAgIGFsbG93IGl0IGluIG5ld2VyIHZlcnNpb25zXVswXSBzbyB3ZSBqdXN0IHJldHVybiB0aGUgZW1wdHkgc3RyaW5nLlxuICAgICAgLy9cbiAgICAgIC8vIFswXTogaHR0cHM6Ly9naXRodWIuY29tL2tyaXNrL0Z1c2UvYmxvYi9lNWUzYWJiNDRlMDA0NjYyYzk4NzUwZDA5NjRkMmQ5YTczYjg3ODQ4L3NyYy9pbmRleC5kLnRzI0wxMTdcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBjb25zdCBzZWdtZW50ZXIgPSBuZXcgSW50bC5TZWdtZW50ZXIodW5kZWZpbmVkLCB7IGdyYW51bGFyaXR5OiAnd29yZCcgfSk7XG4gICAgY29uc3Qgc2VnbWVudHMgPSBzZWdtZW50ZXIuc2VnbWVudChyYXdWYWx1ZSk7XG4gICAgY29uc3Qgd29yZGxpa2VTZWdtZW50cyA9IGZpbHRlcihzZWdtZW50cywgc2VnbWVudCA9PiBzZWdtZW50LmlzV29yZExpa2UpO1xuICAgIGNvbnN0IHdvcmRsaWtlcyA9IG1hcCh3b3JkbGlrZVNlZ21lbnRzLCBzZWdtZW50ID0+IHNlZ21lbnQuc2VnbWVudCk7XG4gICAgcmV0dXJuIEFycmF5LmZyb20od29yZGxpa2VzKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBjbGFzcyBNZW1iZXJSZXBvc2l0b3J5IHtcbiAgcHJpdmF0ZSBpc0Z1c2VSZWFkeSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgZnVzZTogRnVzZTxDb252ZXJzYXRpb25UeXBlPiA9IG5ldyBGdXNlPENvbnZlcnNhdGlvblR5cGU+KFxuICAgIFtdLFxuICAgIEZVU0VfT1BUSU9OU1xuICApO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWVtYmVyczogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4gPSBbXSkge31cblxuICB1cGRhdGVNZW1iZXJzKG1lbWJlcnM6IEFycmF5PENvbnZlcnNhdGlvblR5cGU+KTogdm9pZCB7XG4gICAgdGhpcy5tZW1iZXJzID0gbWVtYmVycztcbiAgICB0aGlzLmlzRnVzZVJlYWR5ID0gZmFsc2U7XG4gIH1cblxuICBnZXRNZW1iZXJzKG9taXQ/OiBDb252ZXJzYXRpb25UeXBlKTogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4ge1xuICAgIGlmIChvbWl0KSB7XG4gICAgICByZXR1cm4gdGhpcy5tZW1iZXJzLmZpbHRlcigoeyBpZCB9KSA9PiBpZCAhPT0gb21pdC5pZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubWVtYmVycztcbiAgfVxuXG4gIGdldE1lbWJlckJ5SWQoaWQ/OiBzdHJpbmcpOiBDb252ZXJzYXRpb25UeXBlIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gaWRcbiAgICAgID8gdGhpcy5tZW1iZXJzLmZpbmQoKHsgaWQ6IG1lbWJlcklkIH0pID0+IG1lbWJlcklkID09PSBpZClcbiAgICAgIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgZ2V0TWVtYmVyQnlVdWlkKHV1aWQ/OiBzdHJpbmcpOiBDb252ZXJzYXRpb25UeXBlIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdXVpZFxuICAgICAgPyB0aGlzLm1lbWJlcnMuZmluZCgoeyB1dWlkOiBtZW1iZXJVdWlkIH0pID0+IG1lbWJlclV1aWQgPT09IHV1aWQpXG4gICAgICA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHNlYXJjaChwYXR0ZXJuOiBzdHJpbmcsIG9taXQ/OiBDb252ZXJzYXRpb25UeXBlKTogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4ge1xuICAgIGlmICghdGhpcy5pc0Z1c2VSZWFkeSkge1xuICAgICAgdGhpcy5mdXNlLnNldENvbGxlY3Rpb24odGhpcy5tZW1iZXJzKTtcbiAgICAgIHRoaXMuaXNGdXNlUmVhZHkgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdHMgPSB0aGlzLmZ1c2Uuc2VhcmNoKHBhdHRlcm4pLm1hcChyZXN1bHQgPT4gcmVzdWx0Lml0ZW0pO1xuXG4gICAgaWYgKG9taXQpIHtcbiAgICAgIHJldHVybiByZXN1bHRzLmZpbHRlcigoeyBpZCB9KSA9PiBpZCAhPT0gb21pdC5pZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxrQkFBaUI7QUFDakIsb0JBQW9CO0FBR3BCLHVCQUE0QjtBQUU1QixNQUFNLGVBQWU7QUFBQSxFQUNuQixVQUFVO0FBQUEsRUFDVixZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxrQkFBa0I7QUFBQSxFQUNsQixvQkFBb0I7QUFBQSxFQUNwQixNQUFNLENBQUMsUUFBUSxhQUFhLGVBQWUsT0FBTztBQUFBLEVBQ2xELE1BQ0UsY0FDQSxNQUNnQztBQUVoQyxVQUFNLFdBQVcsdUJBQUksY0FBeUMsSUFBSTtBQUVsRSxRQUFJLE9BQU8sYUFBYSxVQUFVO0FBS2hDLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxZQUFZLElBQUksS0FBSyxVQUFVLFFBQVcsRUFBRSxhQUFhLE9BQU8sQ0FBQztBQUN2RSxVQUFNLFdBQVcsVUFBVSxRQUFRLFFBQVE7QUFDM0MsVUFBTSxtQkFBbUIsNkJBQU8sVUFBVSxhQUFXLFFBQVEsVUFBVTtBQUN2RSxVQUFNLFlBQVksMEJBQUksa0JBQWtCLGFBQVcsUUFBUSxPQUFPO0FBQ2xFLFdBQU8sTUFBTSxLQUFLLFNBQVM7QUFBQSxFQUM3QjtBQUNGO0FBRU8sTUFBTSxpQkFBaUI7QUFBQSxFQVE1QixZQUFvQixVQUFtQyxDQUFDLEdBQUc7QUFBdkM7QUFQWix1QkFBYztBQUVkLGdCQUErQixJQUFJLG9CQUN6QyxDQUFDLEdBQ0QsWUFDRjtBQUFBLEVBRTREO0FBQUEsRUFFNUQsY0FBYyxTQUF3QztBQUNwRCxTQUFLLFVBQVU7QUFDZixTQUFLLGNBQWM7QUFBQSxFQUNyQjtBQUFBLEVBRUEsV0FBVyxNQUFrRDtBQUMzRCxRQUFJLE1BQU07QUFDUixhQUFPLEtBQUssUUFBUSxPQUFPLENBQUMsRUFBRSxTQUFTLE9BQU8sS0FBSyxFQUFFO0FBQUEsSUFDdkQ7QUFFQSxXQUFPLEtBQUs7QUFBQSxFQUNkO0FBQUEsRUFFQSxjQUFjLElBQTJDO0FBQ3ZELFdBQU8sS0FDSCxLQUFLLFFBQVEsS0FBSyxDQUFDLEVBQUUsSUFBSSxlQUFlLGFBQWEsRUFBRSxJQUN2RDtBQUFBLEVBQ047QUFBQSxFQUVBLGdCQUFnQixNQUE2QztBQUMzRCxXQUFPLE9BQ0gsS0FBSyxRQUFRLEtBQUssQ0FBQyxFQUFFLE1BQU0saUJBQWlCLGVBQWUsSUFBSSxJQUMvRDtBQUFBLEVBQ047QUFBQSxFQUVBLE9BQU8sU0FBaUIsTUFBa0Q7QUFDeEUsUUFBSSxDQUFDLEtBQUssYUFBYTtBQUNyQixXQUFLLEtBQUssY0FBYyxLQUFLLE9BQU87QUFDcEMsV0FBSyxjQUFjO0FBQUEsSUFDckI7QUFFQSxVQUFNLFVBQVUsS0FBSyxLQUFLLE9BQU8sT0FBTyxFQUFFLElBQUksWUFBVSxPQUFPLElBQUk7QUFFbkUsUUFBSSxNQUFNO0FBQ1IsYUFBTyxRQUFRLE9BQU8sQ0FBQyxFQUFFLFNBQVMsT0FBTyxLQUFLLEVBQUU7QUFBQSxJQUNsRDtBQUVBLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUFqRE8iLAogICJuYW1lcyI6IFtdCn0K
