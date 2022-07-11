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
var useActivateSpeakerViewOnPresenting_exports = {};
__export(useActivateSpeakerViewOnPresenting_exports, {
  useActivateSpeakerViewOnPresenting: () => useActivateSpeakerViewOnPresenting
});
module.exports = __toCommonJS(useActivateSpeakerViewOnPresenting_exports);
var import_react = require("react");
var import_usePrevious = require("./usePrevious");
function useActivateSpeakerViewOnPresenting({
  remoteParticipants,
  switchToPresentationView,
  switchFromPresentationView
}) {
  const presenterUuid = remoteParticipants.find((participant) => participant.presenting)?.uuid;
  const prevPresenterUuid = (0, import_usePrevious.usePrevious)(presenterUuid, presenterUuid);
  (0, import_react.useEffect)(() => {
    if (prevPresenterUuid !== presenterUuid && presenterUuid) {
      switchToPresentationView();
    } else if (prevPresenterUuid && !presenterUuid) {
      switchFromPresentationView();
    }
  }, [
    presenterUuid,
    prevPresenterUuid,
    switchToPresentationView,
    switchFromPresentationView
  ]);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useActivateSpeakerViewOnPresenting
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlQWN0aXZhdGVTcGVha2VyVmlld09uUHJlc2VudGluZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VQcmV2aW91cyB9IGZyb20gJy4vdXNlUHJldmlvdXMnO1xuXG50eXBlIFJlbW90ZVBhcnRpY2lwYW50ID0ge1xuICBoYXNSZW1vdGVWaWRlbzogYm9vbGVhbjtcbiAgcHJlc2VudGluZzogYm9vbGVhbjtcbiAgdGl0bGU6IHN0cmluZztcbiAgdXVpZD86IHN0cmluZztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VBY3RpdmF0ZVNwZWFrZXJWaWV3T25QcmVzZW50aW5nKHtcbiAgcmVtb3RlUGFydGljaXBhbnRzLFxuICBzd2l0Y2hUb1ByZXNlbnRhdGlvblZpZXcsXG4gIHN3aXRjaEZyb21QcmVzZW50YXRpb25WaWV3LFxufToge1xuICByZW1vdGVQYXJ0aWNpcGFudHM6IFJlYWRvbmx5QXJyYXk8UmVtb3RlUGFydGljaXBhbnQ+O1xuICBzd2l0Y2hUb1ByZXNlbnRhdGlvblZpZXc6ICgpID0+IHZvaWQ7XG4gIHN3aXRjaEZyb21QcmVzZW50YXRpb25WaWV3OiAoKSA9PiB2b2lkO1xufSk6IHZvaWQge1xuICBjb25zdCBwcmVzZW50ZXJVdWlkID0gcmVtb3RlUGFydGljaXBhbnRzLmZpbmQoXG4gICAgcGFydGljaXBhbnQgPT4gcGFydGljaXBhbnQucHJlc2VudGluZ1xuICApPy51dWlkO1xuICBjb25zdCBwcmV2UHJlc2VudGVyVXVpZCA9IHVzZVByZXZpb3VzKHByZXNlbnRlclV1aWQsIHByZXNlbnRlclV1aWQpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHByZXZQcmVzZW50ZXJVdWlkICE9PSBwcmVzZW50ZXJVdWlkICYmIHByZXNlbnRlclV1aWQpIHtcbiAgICAgIHN3aXRjaFRvUHJlc2VudGF0aW9uVmlldygpO1xuICAgIH0gZWxzZSBpZiAocHJldlByZXNlbnRlclV1aWQgJiYgIXByZXNlbnRlclV1aWQpIHtcbiAgICAgIHN3aXRjaEZyb21QcmVzZW50YXRpb25WaWV3KCk7XG4gICAgfVxuICB9LCBbXG4gICAgcHJlc2VudGVyVXVpZCxcbiAgICBwcmV2UHJlc2VudGVyVXVpZCxcbiAgICBzd2l0Y2hUb1ByZXNlbnRhdGlvblZpZXcsXG4gICAgc3dpdGNoRnJvbVByZXNlbnRhdGlvblZpZXcsXG4gIF0pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUEwQjtBQUMxQix5QkFBNEI7QUFTckIsNENBQTRDO0FBQUEsRUFDakQ7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBS087QUFDUCxRQUFNLGdCQUFnQixtQkFBbUIsS0FDdkMsaUJBQWUsWUFBWSxVQUM3QixHQUFHO0FBQ0gsUUFBTSxvQkFBb0Isb0NBQVksZUFBZSxhQUFhO0FBRWxFLDhCQUFVLE1BQU07QUFDZCxRQUFJLHNCQUFzQixpQkFBaUIsZUFBZTtBQUN4RCwrQkFBeUI7QUFBQSxJQUMzQixXQUFXLHFCQUFxQixDQUFDLGVBQWU7QUFDOUMsaUNBQTJCO0FBQUEsSUFDN0I7QUFBQSxFQUNGLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBQ0g7QUExQmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
