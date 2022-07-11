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
var SystemTrayService_exports = {};
__export(SystemTrayService_exports, {
  SystemTrayService: () => SystemTrayService
});
module.exports = __toCommonJS(SystemTrayService_exports);
var import_path = require("path");
var import_electron = require("electron");
var log = __toESM(require("../ts/logging/log"));
class SystemTrayService {
  constructor({ messages, createTrayInstance }) {
    this.isEnabled = false;
    this.isQuitting = false;
    this.unreadCount = 0;
    log.info("System tray service: created");
    this.messages = messages;
    this.boundRender = this.render.bind(this);
    this.createTrayInstance = createTrayInstance || ((icon) => new import_electron.Tray(icon));
  }
  setMainWindow(newBrowserWindow) {
    const oldBrowserWindow = this.browserWindow;
    if (oldBrowserWindow === newBrowserWindow) {
      return;
    }
    log.info(`System tray service: updating main window. Previously, there was ${oldBrowserWindow ? "" : "not "}a window, and now there is${newBrowserWindow ? "" : " not"}`);
    if (oldBrowserWindow) {
      oldBrowserWindow.off("show", this.boundRender);
      oldBrowserWindow.off("hide", this.boundRender);
    }
    if (newBrowserWindow) {
      newBrowserWindow.on("show", this.boundRender);
      newBrowserWindow.on("hide", this.boundRender);
    }
    this.browserWindow = newBrowserWindow;
    this.render();
  }
  setEnabled(isEnabled) {
    if (this.isEnabled === isEnabled) {
      return;
    }
    log.info(`System tray service: ${isEnabled ? "enabling" : "disabling"}`);
    this.isEnabled = isEnabled;
    this.render();
  }
  setUnreadCount(unreadCount) {
    if (this.unreadCount === unreadCount) {
      return;
    }
    log.info(`System tray service: setting unread count to ${unreadCount}`);
    this.unreadCount = unreadCount;
    this.render();
  }
  markShouldQuit() {
    log.info("System tray service: markShouldQuit");
    this.tray = void 0;
    this.isQuitting = true;
  }
  render() {
    if (this.isEnabled && this.browserWindow) {
      this.renderEnabled();
      return;
    }
    this.renderDisabled();
  }
  renderEnabled() {
    if (this.isQuitting) {
      log.info("System tray service: not rendering the tray, quitting");
      return;
    }
    log.info("System tray service: rendering the tray");
    this.tray = this.tray || this.createTray();
    const { browserWindow, tray } = this;
    try {
      tray.setImage(getIcon(this.unreadCount));
    } catch (err) {
      log.warn("System tray service: failed to set preferred image. Falling back...");
      tray.setImage(getDefaultIcon());
    }
    tray.setContextMenu(import_electron.Menu.buildFromTemplate([
      {
        id: "toggleWindowVisibility",
        ...browserWindow?.isVisible() ? {
          label: this.messages.hide.message,
          click: () => {
            log.info("System tray service: hiding the window from the context menu");
            this.browserWindow?.hide();
          }
        } : {
          label: this.messages.show.message,
          click: () => {
            log.info("System tray service: showing the window from the context menu");
            if (this.browserWindow) {
              this.browserWindow.show();
              forceOnTop(this.browserWindow);
            }
          }
        }
      },
      {
        id: "quit",
        label: this.messages.quit.message,
        click: () => {
          log.info("System tray service: quitting the app from the context menu");
          import_electron.app.quit();
        }
      }
    ]));
  }
  renderDisabled() {
    log.info("System tray service: rendering no tray");
    if (!this.tray) {
      return;
    }
    this.tray.destroy();
    this.tray = void 0;
  }
  createTray() {
    log.info("System tray service: creating the tray");
    const result = this.createTrayInstance(getDefaultIcon());
    result.on("click", () => {
      const { browserWindow } = this;
      if (!browserWindow) {
        return;
      }
      if (!browserWindow.isVisible()) {
        browserWindow.show();
      }
      forceOnTop(browserWindow);
    });
    result.setToolTip(this.messages.signalDesktop.message);
    return result;
  }
  _getTray() {
    return this.tray;
  }
}
function getIcon(unreadCount) {
  let iconSize;
  switch (process.platform) {
    case "darwin":
      iconSize = "16";
      break;
    case "win32":
      iconSize = "32";
      break;
    default:
      iconSize = "256";
      break;
  }
  if (unreadCount > 0) {
    const filename = `${String(unreadCount >= 10 ? 10 : unreadCount)}.png`;
    return (0, import_path.join)(__dirname, "..", "images", "alert", iconSize, filename);
  }
  return (0, import_path.join)(__dirname, "..", "images", `icon_${iconSize}.png`);
}
let defaultIcon;
function getDefaultIcon() {
  defaultIcon ?? (defaultIcon = import_electron.nativeImage.createFromPath(getIcon(0)));
  return defaultIcon;
}
function forceOnTop(browserWindow) {
  browserWindow.setAlwaysOnTop(true);
  browserWindow.focus();
  browserWindow.setAlwaysOnTop(false);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SystemTrayService
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3lzdGVtVHJheVNlcnZpY2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE3LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgdHlwZSB7IEJyb3dzZXJXaW5kb3csIE5hdGl2ZUltYWdlIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHsgTWVudSwgVHJheSwgYXBwLCBuYXRpdmVJbWFnZSB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi90cy9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgdHlwZSB7IExvY2FsZU1lc3NhZ2VzVHlwZSB9IGZyb20gJy4uL3RzL3R5cGVzL0kxOE4nO1xuXG5leHBvcnQgdHlwZSBTeXN0ZW1UcmF5U2VydmljZU9wdGlvbnNUeXBlID0gUmVhZG9ubHk8e1xuICBtZXNzYWdlczogTG9jYWxlTWVzc2FnZXNUeXBlO1xuXG4gIC8vIEZvciB0ZXN0aW5nXG4gIGNyZWF0ZVRyYXlJbnN0YW5jZT86IChpY29uOiBOYXRpdmVJbWFnZSkgPT4gVHJheTtcbn0+O1xuXG4vKipcbiAqIEEgY2xhc3MgdGhhdCBtYW5hZ2VzIGFuIFtFbGVjdHJvbiBgVHJheWAgaW5zdGFuY2VdWzBdLiBJdCdzIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZ1xuICogYW5kIGRlc3Ryb3lpbmcgYSBgVHJheWAsIGFuZCBsaXN0ZW5pbmcgdG8gdGhlIGFzc29jaWF0ZWQgYEJyb3dzZXJXaW5kb3dgJ3MgdmlzaWJpbGl0eVxuICogc3RhdGUuXG4gKlxuICogWzBdOiBodHRwczovL3d3dy5lbGVjdHJvbmpzLm9yZy9kb2NzL2FwaS90cmF5XG4gKi9cbmV4cG9ydCBjbGFzcyBTeXN0ZW1UcmF5U2VydmljZSB7XG4gIHByaXZhdGUgYnJvd3NlcldpbmRvdz86IEJyb3dzZXJXaW5kb3c7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBtZXNzYWdlczogTG9jYWxlTWVzc2FnZXNUeXBlO1xuXG4gIHByaXZhdGUgdHJheT86IFRyYXk7XG5cbiAgcHJpdmF0ZSBpc0VuYWJsZWQgPSBmYWxzZTtcblxuICBwcml2YXRlIGlzUXVpdHRpbmcgPSBmYWxzZTtcblxuICBwcml2YXRlIHVucmVhZENvdW50ID0gMDtcblxuICBwcml2YXRlIGJvdW5kUmVuZGVyOiB0eXBlb2YgU3lzdGVtVHJheVNlcnZpY2UucHJvdG90eXBlLnJlbmRlcjtcblxuICBwcml2YXRlIGNyZWF0ZVRyYXlJbnN0YW5jZTogKGljb246IE5hdGl2ZUltYWdlKSA9PiBUcmF5O1xuXG4gIGNvbnN0cnVjdG9yKHsgbWVzc2FnZXMsIGNyZWF0ZVRyYXlJbnN0YW5jZSB9OiBTeXN0ZW1UcmF5U2VydmljZU9wdGlvbnNUeXBlKSB7XG4gICAgbG9nLmluZm8oJ1N5c3RlbSB0cmF5IHNlcnZpY2U6IGNyZWF0ZWQnKTtcbiAgICB0aGlzLm1lc3NhZ2VzID0gbWVzc2FnZXM7XG4gICAgdGhpcy5ib3VuZFJlbmRlciA9IHRoaXMucmVuZGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jcmVhdGVUcmF5SW5zdGFuY2UgPSBjcmVhdGVUcmF5SW5zdGFuY2UgfHwgKGljb24gPT4gbmV3IFRyYXkoaWNvbikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBvciBjbGVhciB0aGUgYXNzb2NpYXRlZCBgQnJvd3NlcldpbmRvd2AuIFRoaXMgaXMgdXNlZCBmb3IgdGhlIGhpZGUvc2hvd1xuICAgKiBmdW5jdGlvbmFsaXR5LiBJdCBhdHRhY2hlcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIHdpbmRvdyB0byBtYW5hZ2UgdGhlIGhpZGUvc2hvd1xuICAgKiB0b2dnbGUgaW4gdGhlIHRyYXkncyBjb250ZXh0IG1lbnUuXG4gICAqL1xuICBzZXRNYWluV2luZG93KG5ld0Jyb3dzZXJXaW5kb3c6IHVuZGVmaW5lZCB8IEJyb3dzZXJXaW5kb3cpOiB2b2lkIHtcbiAgICBjb25zdCBvbGRCcm93c2VyV2luZG93ID0gdGhpcy5icm93c2VyV2luZG93O1xuICAgIGlmIChvbGRCcm93c2VyV2luZG93ID09PSBuZXdCcm93c2VyV2luZG93KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9nLmluZm8oXG4gICAgICBgU3lzdGVtIHRyYXkgc2VydmljZTogdXBkYXRpbmcgbWFpbiB3aW5kb3cuIFByZXZpb3VzbHksIHRoZXJlIHdhcyAke1xuICAgICAgICBvbGRCcm93c2VyV2luZG93ID8gJycgOiAnbm90ICdcbiAgICAgIH1hIHdpbmRvdywgYW5kIG5vdyB0aGVyZSBpcyR7bmV3QnJvd3NlcldpbmRvdyA/ICcnIDogJyBub3QnfWBcbiAgICApO1xuXG4gICAgaWYgKG9sZEJyb3dzZXJXaW5kb3cpIHtcbiAgICAgIG9sZEJyb3dzZXJXaW5kb3cub2ZmKCdzaG93JywgdGhpcy5ib3VuZFJlbmRlcik7XG4gICAgICBvbGRCcm93c2VyV2luZG93Lm9mZignaGlkZScsIHRoaXMuYm91bmRSZW5kZXIpO1xuICAgIH1cblxuICAgIGlmIChuZXdCcm93c2VyV2luZG93KSB7XG4gICAgICBuZXdCcm93c2VyV2luZG93Lm9uKCdzaG93JywgdGhpcy5ib3VuZFJlbmRlcik7XG4gICAgICBuZXdCcm93c2VyV2luZG93Lm9uKCdoaWRlJywgdGhpcy5ib3VuZFJlbmRlcik7XG4gICAgfVxuXG4gICAgdGhpcy5icm93c2VyV2luZG93ID0gbmV3QnJvd3NlcldpbmRvdztcblxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogRW5hYmxlIG9yIGRpc2FibGUgdGhlIHRyYXkgaWNvbi4gTm90ZTogaWYgdGhlcmUgaXMgbm8gYXNzb2NpYXRlZCBicm93c2VyIHdpbmRvdyAoc2VlXG4gICAqIGBzZXRNYWluV2luZG93YCksIHRoZSB0cmF5IGljb24gd2lsbCBub3QgYmUgc2hvd24sIGV2ZW4gaWYgZW5hYmxlZC5cbiAgICovXG4gIHNldEVuYWJsZWQoaXNFbmFibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSBpc0VuYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsb2cuaW5mbyhgU3lzdGVtIHRyYXkgc2VydmljZTogJHtpc0VuYWJsZWQgPyAnZW5hYmxpbmcnIDogJ2Rpc2FibGluZyd9YCk7XG4gICAgdGhpcy5pc0VuYWJsZWQgPSBpc0VuYWJsZWQ7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHVucmVhZCBjb3VudCwgd2hpY2ggdXBkYXRlcyB0aGUgdHJheSBpY29uIGlmIGl0J3MgdmlzaWJsZS5cbiAgICovXG4gIHNldFVucmVhZENvdW50KHVucmVhZENvdW50OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51bnJlYWRDb3VudCA9PT0gdW5yZWFkQ291bnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsb2cuaW5mbyhgU3lzdGVtIHRyYXkgc2VydmljZTogc2V0dGluZyB1bnJlYWQgY291bnQgdG8gJHt1bnJlYWRDb3VudH1gKTtcbiAgICB0aGlzLnVucmVhZENvdW50ID0gdW5yZWFkQ291bnQ7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXb3JrYXJvdW5kIGZvcjogaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cm9uL2VsZWN0cm9uL2lzc3Vlcy8zMjU4MSNpc3N1ZWNvbW1lbnQtMTAyMDM1OTkzMVxuICAgKlxuICAgKiBUcmF5IGlzIGF1dG9tYXRpY2FsbHkgZGVzdHJveWVkIHdoZW4gYXBwIHF1aXRzIHNvIHdlIHNob3VsZG4ndCBkZXN0cm95IGl0XG4gICAqIHR3aWNlIHdoZW4gYWxsIHdpbmRvd3Mgd2lsbCBjbG9zZS5cbiAgICovXG4gIG1hcmtTaG91bGRRdWl0KCk6IHZvaWQge1xuICAgIGxvZy5pbmZvKCdTeXN0ZW0gdHJheSBzZXJ2aWNlOiBtYXJrU2hvdWxkUXVpdCcpO1xuXG4gICAgdGhpcy50cmF5ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuaXNRdWl0dGluZyA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0VuYWJsZWQgJiYgdGhpcy5icm93c2VyV2luZG93KSB7XG4gICAgICB0aGlzLnJlbmRlckVuYWJsZWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJEaXNhYmxlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJFbmFibGVkKCkge1xuICAgIGlmICh0aGlzLmlzUXVpdHRpbmcpIHtcbiAgICAgIGxvZy5pbmZvKCdTeXN0ZW0gdHJheSBzZXJ2aWNlOiBub3QgcmVuZGVyaW5nIHRoZSB0cmF5LCBxdWl0dGluZycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZy5pbmZvKCdTeXN0ZW0gdHJheSBzZXJ2aWNlOiByZW5kZXJpbmcgdGhlIHRyYXknKTtcblxuICAgIHRoaXMudHJheSA9IHRoaXMudHJheSB8fCB0aGlzLmNyZWF0ZVRyYXkoKTtcbiAgICBjb25zdCB7IGJyb3dzZXJXaW5kb3csIHRyYXkgfSA9IHRoaXM7XG5cbiAgICB0cnkge1xuICAgICAgdHJheS5zZXRJbWFnZShnZXRJY29uKHRoaXMudW5yZWFkQ291bnQpKTtcbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICAnU3lzdGVtIHRyYXkgc2VydmljZTogZmFpbGVkIHRvIHNldCBwcmVmZXJyZWQgaW1hZ2UuIEZhbGxpbmcgYmFjay4uLidcbiAgICAgICk7XG4gICAgICB0cmF5LnNldEltYWdlKGdldERlZmF1bHRJY29uKCkpO1xuICAgIH1cblxuICAgIC8vIE5PVEU6IHdlIHdhbnQgdG8gaGF2ZSB0aGUgc2hvdy9oaWRlIGVudHJ5IGF2YWlsYWJsZSBpbiB0aGUgdHJheSBpY29uXG4gICAgLy8gY29udGV4dCBtZW51LCBzaW5jZSB0aGUgJ2NsaWNrJyBldmVudCBtYXkgbm90IHdvcmsgb24gYWxsIHBsYXRmb3Jtcy5cbiAgICAvLyBGb3IgZGV0YWlscyBwbGVhc2UgcmVmZXIgdG86XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cm9uL2VsZWN0cm9uL2Jsb2IvbWFzdGVyL2RvY3MvYXBpL3RyYXkubWQuXG4gICAgdHJheS5zZXRDb250ZXh0TWVudShcbiAgICAgIE1lbnUuYnVpbGRGcm9tVGVtcGxhdGUoW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICd0b2dnbGVXaW5kb3dWaXNpYmlsaXR5JyxcbiAgICAgICAgICAuLi4oYnJvd3NlcldpbmRvdz8uaXNWaXNpYmxlKClcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLm1lc3NhZ2VzLmhpZGUubWVzc2FnZSxcbiAgICAgICAgICAgICAgICBjbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICAgICAgICAgICdTeXN0ZW0gdHJheSBzZXJ2aWNlOiBoaWRpbmcgdGhlIHdpbmRvdyBmcm9tIHRoZSBjb250ZXh0IG1lbnUnXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgLy8gV2UgcmUtZmV0Y2ggYHRoaXMuYnJvd3NlcldpbmRvd2AgaGVyZSBqdXN0IGluIGNhc2UgdGhlIGJyb3dzZXIgd2luZG93XG4gICAgICAgICAgICAgICAgICAvLyAgIGhhcyBjaGFuZ2VkIHdoaWxlIHRoZSBjb250ZXh0IG1lbnUgd2FzIG9wZW4uIFNhbWUgYXBwbGllcyBpbiB0aGVcbiAgICAgICAgICAgICAgICAgIC8vICAgXCJzaG93XCIgY2FzZSBiZWxvdy5cbiAgICAgICAgICAgICAgICAgIHRoaXMuYnJvd3NlcldpbmRvdz8uaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLm1lc3NhZ2VzLnNob3cubWVzc2FnZSxcbiAgICAgICAgICAgICAgICBjbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICAgICAgICAgICdTeXN0ZW0gdHJheSBzZXJ2aWNlOiBzaG93aW5nIHRoZSB3aW5kb3cgZnJvbSB0aGUgY29udGV4dCBtZW51J1xuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJyb3dzZXJXaW5kb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5icm93c2VyV2luZG93LnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yY2VPblRvcCh0aGlzLmJyb3dzZXJXaW5kb3cpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdxdWl0JyxcbiAgICAgICAgICBsYWJlbDogdGhpcy5tZXNzYWdlcy5xdWl0Lm1lc3NhZ2UsXG4gICAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICAgICAnU3lzdGVtIHRyYXkgc2VydmljZTogcXVpdHRpbmcgdGhlIGFwcCBmcm9tIHRoZSBjb250ZXh0IG1lbnUnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYXBwLnF1aXQoKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJEaXNhYmxlZCgpIHtcbiAgICBsb2cuaW5mbygnU3lzdGVtIHRyYXkgc2VydmljZTogcmVuZGVyaW5nIG5vIHRyYXknKTtcblxuICAgIGlmICghdGhpcy50cmF5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudHJheS5kZXN0cm95KCk7XG4gICAgdGhpcy50cmF5ID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVUcmF5KCk6IFRyYXkge1xuICAgIGxvZy5pbmZvKCdTeXN0ZW0gdHJheSBzZXJ2aWNlOiBjcmVhdGluZyB0aGUgdHJheScpO1xuXG4gICAgLy8gVGhpcyBpY29uIG1heSBiZSBzd2lmdGx5IG92ZXJ3cml0dGVuLlxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY3JlYXRlVHJheUluc3RhbmNlKGdldERlZmF1bHRJY29uKCkpO1xuXG4gICAgLy8gTm90ZTogXCJXaGVuIGFwcCBpbmRpY2F0b3IgaXMgdXNlZCBvbiBMaW51eCwgdGhlIGNsaWNrIGV2ZW50IGlzIGlnbm9yZWQuXCIgVGhpc1xuICAgIC8vICAgZG9lc24ndCBtZWFuIHRoYXQgdGhlIGNsaWNrIGV2ZW50IGlzIGFsd2F5cyBpZ25vcmVkIG9uIExpbnV4OyBpdCBkZXBlbmRzIG9uIGhvd1xuICAgIC8vICAgdGhlIGFwcCBpbmRpY2F0b3IgaXMgc2V0IHVwLlxuICAgIC8vXG4gICAgLy8gU2VlIDxodHRwczovL2dpdGh1Yi5jb20vZWxlY3Ryb24vZWxlY3Ryb24vYmxvYi92MTMuMS4zL2RvY3MvYXBpL3RyYXkubWQjY2xhc3MtdHJheT4uXG4gICAgcmVzdWx0Lm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IHsgYnJvd3NlcldpbmRvdyB9ID0gdGhpcztcbiAgICAgIGlmICghYnJvd3NlcldpbmRvdykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIWJyb3dzZXJXaW5kb3cuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgYnJvd3NlcldpbmRvdy5zaG93KCk7XG4gICAgICB9XG4gICAgICBmb3JjZU9uVG9wKGJyb3dzZXJXaW5kb3cpO1xuICAgIH0pO1xuXG4gICAgcmVzdWx0LnNldFRvb2xUaXAodGhpcy5tZXNzYWdlcy5zaWduYWxEZXNrdG9wLm1lc3NhZ2UpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGlzIGV4cG9ydGVkIGZvciB0ZXN0aW5nLCBiZWNhdXNlIEVsZWN0cm9uIGRvZXNuJ3QgaGF2ZSBhbnkgZWFzeSB3YXkgdG8gaG9va1xuICAgKiBpbnRvIHRoZSBleGlzdGluZyB0cmF5IGluc3RhbmNlcy4gSXQgc2hvdWxkIG5vdCBiZSB1c2VkIGJ5IFwicmVhbFwiIGNvZGUuXG4gICAqL1xuICBfZ2V0VHJheSgpOiB1bmRlZmluZWQgfCBUcmF5IHtcbiAgICByZXR1cm4gdGhpcy50cmF5O1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEljb24odW5yZWFkQ291bnQ6IG51bWJlcikge1xuICBsZXQgaWNvblNpemU6IHN0cmluZztcbiAgc3dpdGNoIChwcm9jZXNzLnBsYXRmb3JtKSB7XG4gICAgY2FzZSAnZGFyd2luJzpcbiAgICAgIGljb25TaXplID0gJzE2JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3dpbjMyJzpcbiAgICAgIGljb25TaXplID0gJzMyJztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpY29uU2l6ZSA9ICcyNTYnO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICBpZiAodW5yZWFkQ291bnQgPiAwKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBgJHtTdHJpbmcodW5yZWFkQ291bnQgPj0gMTAgPyAxMCA6IHVucmVhZENvdW50KX0ucG5nYDtcbiAgICByZXR1cm4gam9pbihfX2Rpcm5hbWUsICcuLicsICdpbWFnZXMnLCAnYWxlcnQnLCBpY29uU2l6ZSwgZmlsZW5hbWUpO1xuICB9XG5cbiAgcmV0dXJuIGpvaW4oX19kaXJuYW1lLCAnLi4nLCAnaW1hZ2VzJywgYGljb25fJHtpY29uU2l6ZX0ucG5nYCk7XG59XG5cbmxldCBkZWZhdWx0SWNvbjogdW5kZWZpbmVkIHwgTmF0aXZlSW1hZ2U7XG5mdW5jdGlvbiBnZXREZWZhdWx0SWNvbigpOiBOYXRpdmVJbWFnZSB7XG4gIGRlZmF1bHRJY29uID8/PSBuYXRpdmVJbWFnZS5jcmVhdGVGcm9tUGF0aChnZXRJY29uKDApKTtcbiAgcmV0dXJuIGRlZmF1bHRJY29uO1xufVxuXG5mdW5jdGlvbiBmb3JjZU9uVG9wKGJyb3dzZXJXaW5kb3c6IEJyb3dzZXJXaW5kb3cpIHtcbiAgLy8gT24gc29tZSB2ZXJzaW9ucyBvZiBHTk9NRSB0aGUgd2luZG93IG1heSBub3QgYmUgb24gdG9wIHdoZW4gcmVzdG9yZWQuXG4gIC8vIFRoaXMgdHJpY2sgc2hvdWxkIGZpeCBpdC5cbiAgLy8gVGhhbmtzIHRvOiBodHRwczovL2dpdGh1Yi5jb20vRW5yaWNvMjA0L1doYXRzYXBwLURlc2t0b3AvY29tbWl0LzZiMGRjODZiNjRlNDgxYjQ1NWY4ZmNlOWI0ZDc5N2U4NmQwMDBkYzFcbiAgYnJvd3NlcldpbmRvdy5zZXRBbHdheXNPblRvcCh0cnVlKTtcbiAgYnJvd3NlcldpbmRvdy5mb2N1cygpO1xuICBicm93c2VyV2luZG93LnNldEFsd2F5c09uVG9wKGZhbHNlKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxrQkFBcUI7QUFFckIsc0JBQTZDO0FBQzdDLFVBQXFCO0FBaUJkLE1BQU0sa0JBQWtCO0FBQUEsRUFpQjdCLFlBQVksRUFBRSxVQUFVLHNCQUFvRDtBQVZwRSxxQkFBWTtBQUVaLHNCQUFhO0FBRWIsdUJBQWM7QUFPcEIsUUFBSSxLQUFLLDhCQUE4QjtBQUN2QyxTQUFLLFdBQVc7QUFDaEIsU0FBSyxjQUFjLEtBQUssT0FBTyxLQUFLLElBQUk7QUFDeEMsU0FBSyxxQkFBcUIsc0JBQXVCLFdBQVEsSUFBSSxxQkFBSyxJQUFJO0FBQUEsRUFDeEU7QUFBQSxFQU9BLGNBQWMsa0JBQW1EO0FBQy9ELFVBQU0sbUJBQW1CLEtBQUs7QUFDOUIsUUFBSSxxQkFBcUIsa0JBQWtCO0FBQ3pDO0FBQUEsSUFDRjtBQUVBLFFBQUksS0FDRixvRUFDRSxtQkFBbUIsS0FBSyxtQ0FDRyxtQkFBbUIsS0FBSyxRQUN2RDtBQUVBLFFBQUksa0JBQWtCO0FBQ3BCLHVCQUFpQixJQUFJLFFBQVEs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
