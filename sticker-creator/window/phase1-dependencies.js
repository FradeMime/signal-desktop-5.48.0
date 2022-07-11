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
var import_p_queue = __toESM(require("p-queue"));
var import_backbone = __toESM(require("backbone"));
var import_electron = require("electron");
var import_context = require("../../ts/windows/context");
var import_environment = require("../../ts/environment");
import_context.SignalContext.log.info("sticker-creator starting up...");
window.ROOT_PATH = window.location.href.startsWith("file") ? "../../" : "/";
window.getEnvironment = import_environment.getEnvironment;
window.getVersion = () => window.SignalContext.config.version;
window.PQueue = import_p_queue.default;
window.Backbone = import_backbone.default;
window.localeMessages = import_electron.ipcRenderer.sendSync("locale-data");
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGhhc2UxLWRlcGVuZGVuY2llcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUFF1ZXVlIGZyb20gJ3AtcXVldWUnO1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcblxuaW1wb3J0IHsgaXBjUmVuZGVyZXIgYXMgaXBjIH0gZnJvbSAnZWxlY3Ryb24nO1xuXG4vLyBJdCBpcyBpbXBvcnRhbnQgdG8gY2FsbCB0aGlzIGFzIGVhcmx5IGFzIHBvc3NpYmxlXG5pbXBvcnQgeyBTaWduYWxDb250ZXh0IH0gZnJvbSAnLi4vLi4vdHMvd2luZG93cy9jb250ZXh0JztcblxuaW1wb3J0IHsgZ2V0RW52aXJvbm1lbnQgfSBmcm9tICcuLi8uLi90cy9lbnZpcm9ubWVudCc7XG5cblNpZ25hbENvbnRleHQubG9nLmluZm8oJ3N0aWNrZXItY3JlYXRvciBzdGFydGluZyB1cC4uLicpO1xuXG53aW5kb3cuUk9PVF9QQVRIID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3RhcnRzV2l0aCgnZmlsZScpID8gJy4uLy4uLycgOiAnLyc7XG53aW5kb3cuZ2V0RW52aXJvbm1lbnQgPSBnZXRFbnZpcm9ubWVudDtcbndpbmRvdy5nZXRWZXJzaW9uID0gKCkgPT4gd2luZG93LlNpZ25hbENvbnRleHQuY29uZmlnLnZlcnNpb247XG5cbndpbmRvdy5QUXVldWUgPSBQUXVldWU7XG53aW5kb3cuQmFja2JvbmUgPSBCYWNrYm9uZTtcblxud2luZG93LmxvY2FsZU1lc3NhZ2VzID0gaXBjLnNlbmRTeW5jKCdsb2NhbGUtZGF0YScpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7O0FBR0EscUJBQW1CO0FBQ25CLHNCQUFxQjtBQUVyQixzQkFBbUM7QUFHbkMscUJBQThCO0FBRTlCLHlCQUErQjtBQUUvQiw2QkFBYyxJQUFJLEtBQUssZ0NBQWdDO0FBRXZELE9BQU8sWUFBWSxPQUFPLFNBQVMsS0FBSyxXQUFXLE1BQU0sSUFBSSxXQUFXO0FBQ3hFLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sYUFBYSxNQUFNLE9BQU8sY0FBYyxPQUFPO0FBRXRELE9BQU8sU0FBUztBQUNoQixPQUFPLFdBQVc7QUFFbEIsT0FBTyxpQkFBaUIsNEJBQUksU0FBUyxhQUFhOyIsCiAgIm5hbWVzIjogW10KfQo=
