var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var constants_exports = {};
__export(constants_exports, {
  AUDIO_LEVEL_INTERVAL_MS: () => AUDIO_LEVEL_INTERVAL_MS,
  FRAME_BUFFER_SIZE: () => FRAME_BUFFER_SIZE,
  MAX_FRAME_HEIGHT: () => MAX_FRAME_HEIGHT,
  MAX_FRAME_WIDTH: () => MAX_FRAME_WIDTH,
  REQUESTED_VIDEO_FRAMERATE: () => REQUESTED_VIDEO_FRAMERATE,
  REQUESTED_VIDEO_HEIGHT: () => REQUESTED_VIDEO_HEIGHT,
  REQUESTED_VIDEO_WIDTH: () => REQUESTED_VIDEO_WIDTH
});
module.exports = __toCommonJS(constants_exports);
const AUDIO_LEVEL_INTERVAL_MS = 200;
const REQUESTED_VIDEO_WIDTH = 640;
const REQUESTED_VIDEO_HEIGHT = 480;
const REQUESTED_VIDEO_FRAMERATE = 30;
const MAX_FRAME_WIDTH = 1920;
const MAX_FRAME_HEIGHT = 1080;
const FRAME_BUFFER_SIZE = MAX_FRAME_WIDTH * MAX_FRAME_HEIGHT * 4;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AUDIO_LEVEL_INTERVAL_MS,
  FRAME_BUFFER_SIZE,
  MAX_FRAME_HEIGHT,
  MAX_FRAME_WIDTH,
  REQUESTED_VIDEO_FRAMERATE,
  REQUESTED_VIDEO_HEIGHT,
  REQUESTED_VIDEO_WIDTH
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29uc3RhbnRzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLy8gU2VlIGBUSUNLX0lOVEVSVkFMYCBpbiBncm91cF9jYWxsLnJzIGluIFJpbmdSVENcbmV4cG9ydCBjb25zdCBBVURJT19MRVZFTF9JTlRFUlZBTF9NUyA9IDIwMDtcblxuZXhwb3J0IGNvbnN0IFJFUVVFU1RFRF9WSURFT19XSURUSCA9IDY0MDtcbmV4cG9ydCBjb25zdCBSRVFVRVNURURfVklERU9fSEVJR0hUID0gNDgwO1xuZXhwb3J0IGNvbnN0IFJFUVVFU1RFRF9WSURFT19GUkFNRVJBVEUgPSAzMDtcblxuZXhwb3J0IGNvbnN0IE1BWF9GUkFNRV9XSURUSCA9IDE5MjA7XG5leHBvcnQgY29uc3QgTUFYX0ZSQU1FX0hFSUdIVCA9IDEwODA7XG5leHBvcnQgY29uc3QgRlJBTUVfQlVGRkVSX1NJWkUgPSBNQVhfRlJBTUVfV0lEVEggKiBNQVhfRlJBTUVfSEVJR0hUICogNDtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlPLE1BQU0sMEJBQTBCO0FBRWhDLE1BQU0sd0JBQXdCO0FBQzlCLE1BQU0seUJBQXlCO0FBQy9CLE1BQU0sNEJBQTRCO0FBRWxDLE1BQU0sa0JBQWtCO0FBQ3hCLE1BQU0sbUJBQW1CO0FBQ3pCLE1BQU0sb0JBQW9CLGtCQUFrQixtQkFBbUI7IiwKICAibmFtZXMiOiBbXQp9Cg==
