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
var getMessageById_exports = {};
__export(getMessageById_exports, {
  getMessageById: () => getMessageById
});
module.exports = __toCommonJS(getMessageById_exports);
var log = __toESM(require("../logging/log"));
var Errors = __toESM(require("../types/errors"));
async function getMessageById(messageId) {
  const message = window.MessageController.getById(messageId);
  if (message) {
    return message;
  }
  let found;
  try {
    found = await window.Signal.Data.getMessageById(messageId);
  } catch (err) {
    log.error(`failed to load message with id ${messageId} due to error ${Errors.toLogFormat(err)}`);
  }
  if (!found) {
    return void 0;
  }
  return window.MessageController.register(found.id, found);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getMessageById
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0TWVzc2FnZUJ5SWQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB0eXBlIHsgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlIH0gZnJvbSAnLi4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQgdHlwZSB7IE1lc3NhZ2VNb2RlbCB9IGZyb20gJy4uL21vZGVscy9tZXNzYWdlcyc7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi4vdHlwZXMvZXJyb3JzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldE1lc3NhZ2VCeUlkKFxuICBtZXNzYWdlSWQ6IHN0cmluZ1xuKTogUHJvbWlzZTxNZXNzYWdlTW9kZWwgfCB1bmRlZmluZWQ+IHtcbiAgY29uc3QgbWVzc2FnZSA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5nZXRCeUlkKG1lc3NhZ2VJZCk7XG4gIGlmIChtZXNzYWdlKSB7XG4gICAgcmV0dXJuIG1lc3NhZ2U7XG4gIH1cblxuICBsZXQgZm91bmQ6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSB8IHVuZGVmaW5lZDtcbiAgdHJ5IHtcbiAgICBmb3VuZCA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRNZXNzYWdlQnlJZChtZXNzYWdlSWQpO1xuICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICBsb2cuZXJyb3IoXG4gICAgICBgZmFpbGVkIHRvIGxvYWQgbWVzc2FnZSB3aXRoIGlkICR7bWVzc2FnZUlkfSBgICtcbiAgICAgICAgYGR1ZSB0byBlcnJvciAke0Vycm9ycy50b0xvZ0Zvcm1hdChlcnIpfWBcbiAgICApO1xuICB9XG5cbiAgaWYgKCFmb3VuZCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICByZXR1cm4gd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLnJlZ2lzdGVyKGZvdW5kLmlkLCBmb3VuZCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsVUFBcUI7QUFHckIsYUFBd0I7QUFFeEIsOEJBQ0UsV0FDbUM7QUFDbkMsUUFBTSxVQUFVLE9BQU8sa0JBQWtCLFFBQVEsU0FBUztBQUMxRCxNQUFJLFNBQVM7QUFDWCxXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUk7QUFDSixNQUFJO0FBQ0YsWUFBUSxNQUFNLE9BQU8sT0FBTyxLQUFLLGVBQWUsU0FBUztBQUFBLEVBQzNELFNBQVMsS0FBUDtBQUNBLFFBQUksTUFDRixrQ0FBa0MsMEJBQ2hCLE9BQU8sWUFBWSxHQUFHLEdBQzFDO0FBQUEsRUFDRjtBQUVBLE1BQUksQ0FBQyxPQUFPO0FBQ1YsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPLE9BQU8sa0JBQWtCLFNBQVMsTUFBTSxJQUFJLEtBQUs7QUFDMUQ7QUF2QnNCIiwKICAibmFtZXMiOiBbXQp9Cg==
