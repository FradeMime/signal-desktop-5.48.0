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
var Signal = __toESM(require("../../ts/signal"));
var import_textsecure = require("../../ts/textsecure");
var Attachments = __toESM(require("../../ts/windows/attachments"));
var import_SignalProtocolStore = require("../../ts/SignalProtocolStore");
var import_context = require("../../ts/windows/context");
window.Signal = Signal.setup({
  Attachments,
  getRegionCode: () => {
    throw new Error("Sticker Creator preload: Not implemented!");
  },
  logger: import_context.SignalContext.log,
  userDataPath: import_context.SignalContext.config.userDataPath
});
window.textsecure = import_textsecure.textsecure;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGhhc2UyLXNpZ25hbC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBTaWduYWwgZnJvbSAnLi4vLi4vdHMvc2lnbmFsJztcbmltcG9ydCB7IHRleHRzZWN1cmUgfSBmcm9tICcuLi8uLi90cy90ZXh0c2VjdXJlJztcblxuaW1wb3J0ICogYXMgQXR0YWNobWVudHMgZnJvbSAnLi4vLi4vdHMvd2luZG93cy9hdHRhY2htZW50cyc7XG5pbXBvcnQgJy4uLy4uL3RzL1NpZ25hbFByb3RvY29sU3RvcmUnO1xuXG5pbXBvcnQgeyBTaWduYWxDb250ZXh0IH0gZnJvbSAnLi4vLi4vdHMvd2luZG93cy9jb250ZXh0Jztcblxud2luZG93LlNpZ25hbCA9IFNpZ25hbC5zZXR1cCh7XG4gIEF0dGFjaG1lbnRzLFxuICBnZXRSZWdpb25Db2RlOiAoKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTdGlja2VyIENyZWF0b3IgcHJlbG9hZDogTm90IGltcGxlbWVudGVkIScpO1xuICB9LFxuICBsb2dnZXI6IFNpZ25hbENvbnRleHQubG9nLFxuICB1c2VyRGF0YVBhdGg6IFNpZ25hbENvbnRleHQuY29uZmlnLnVzZXJEYXRhUGF0aCxcbn0pO1xud2luZG93LnRleHRzZWN1cmUgPSB0ZXh0c2VjdXJlO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsYUFBd0I7QUFDeEIsd0JBQTJCO0FBRTNCLGtCQUE2QjtBQUM3QixpQ0FBTztBQUVQLHFCQUE4QjtBQUU5QixPQUFPLFNBQVMsT0FBTyxNQUFNO0FBQUEsRUFDM0I7QUFBQSxFQUNBLGVBQWUsTUFBTTtBQUNuQixVQUFNLElBQUksTUFBTSwyQ0FBMkM7QUFBQSxFQUM3RDtBQUFBLEVBQ0EsUUFBUSw2QkFBYztBQUFBLEVBQ3RCLGNBQWMsNkJBQWMsT0FBTztBQUNyQyxDQUFDO0FBQ0QsT0FBTyxhQUFhOyIsCiAgIm5hbWVzIjogW10KfQo=
