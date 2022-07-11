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
var expiration_exports = {};
__export(expiration_exports, {
  actions: () => actions,
  getEmptyState: () => getEmptyState,
  reducer: () => reducer
});
module.exports = __toCommonJS(expiration_exports);
const HYDRATE_EXPIRATION_STATUS = "expiration/HYDRATE_EXPIRATION_STATUS";
function hydrateExpirationStatus(hasExpired) {
  return {
    type: HYDRATE_EXPIRATION_STATUS,
    payload: hasExpired
  };
}
const actions = {
  hydrateExpirationStatus
};
function getEmptyState() {
  return {
    hasExpired: false
  };
}
function reducer(state = getEmptyState(), action) {
  if (action.type === HYDRATE_EXPIRATION_STATUS) {
    return {
      hasExpired: action.payload
    };
  }
  return state;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  actions,
  getEmptyState,
  reducer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXhwaXJhdGlvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vLyBTdGF0ZVxuXG5leHBvcnQgdHlwZSBFeHBpcmF0aW9uU3RhdGVUeXBlID0ge1xuICBoYXNFeHBpcmVkOiBib29sZWFuO1xufTtcblxuLy8gQWN0aW9uc1xuXG5jb25zdCBIWURSQVRFX0VYUElSQVRJT05fU1RBVFVTID0gJ2V4cGlyYXRpb24vSFlEUkFURV9FWFBJUkFUSU9OX1NUQVRVUyc7XG5cbnR5cGUgSHlyZGF0ZUV4cGlyYXRpb25TdGF0dXNBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnZXhwaXJhdGlvbi9IWURSQVRFX0VYUElSQVRJT05fU1RBVFVTJztcbiAgcGF5bG9hZDogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIEV4cGlyYXRpb25BY3Rpb25UeXBlID0gSHlyZGF0ZUV4cGlyYXRpb25TdGF0dXNBY3Rpb25UeXBlO1xuXG4vLyBBY3Rpb24gQ3JlYXRvcnNcblxuZnVuY3Rpb24gaHlkcmF0ZUV4cGlyYXRpb25TdGF0dXMoaGFzRXhwaXJlZDogYm9vbGVhbik6IEV4cGlyYXRpb25BY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBIWURSQVRFX0VYUElSQVRJT05fU1RBVFVTLFxuICAgIHBheWxvYWQ6IGhhc0V4cGlyZWQsXG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBhY3Rpb25zID0ge1xuICBoeWRyYXRlRXhwaXJhdGlvblN0YXR1cyxcbn07XG5cbi8vIFJlZHVjZXJcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVtcHR5U3RhdGUoKTogRXhwaXJhdGlvblN0YXRlVHlwZSB7XG4gIHJldHVybiB7XG4gICAgaGFzRXhwaXJlZDogZmFsc2UsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2VyKFxuICBzdGF0ZTogUmVhZG9ubHk8RXhwaXJhdGlvblN0YXRlVHlwZT4gPSBnZXRFbXB0eVN0YXRlKCksXG4gIGFjdGlvbjogUmVhZG9ubHk8RXhwaXJhdGlvbkFjdGlvblR5cGU+XG4pOiBFeHBpcmF0aW9uU3RhdGVUeXBlIHtcbiAgaWYgKGFjdGlvbi50eXBlID09PSBIWURSQVRFX0VYUElSQVRJT05fU1RBVFVTKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc0V4cGlyZWQ6IGFjdGlvbi5wYXlsb2FkLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVdBLE1BQU0sNEJBQTRCO0FBV2xDLGlDQUFpQyxZQUEyQztBQUMxRSxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsRUFDWDtBQUNGO0FBTFMsQUFPRixNQUFNLFVBQVU7QUFBQSxFQUNyQjtBQUNGO0FBSU8seUJBQThDO0FBQ25ELFNBQU87QUFBQSxJQUNMLFlBQVk7QUFBQSxFQUNkO0FBQ0Y7QUFKZ0IsQUFNVCxpQkFDTCxRQUF1QyxjQUFjLEdBQ3JELFFBQ3FCO0FBQ3JCLE1BQUksT0FBTyxTQUFTLDJCQUEyQjtBQUM3QyxXQUFPO0FBQUEsTUFDTCxZQUFZLE9BQU87QUFBQSxJQUNyQjtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7QUFYZ0IiLAogICJuYW1lcyI6IFtdCn0K
