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
var playwright_exports = {};
__export(playwright_exports, {
  App: () => App
});
module.exports = __toCommonJS(playwright_exports);
var import_playwright = require("playwright");
class App {
  constructor(options) {
    this.options = options;
  }
  async start() {
    this.privApp = await import_playwright._electron.launch({
      executablePath: this.options.main,
      args: this.options.args.slice(),
      env: {
        ...process.env,
        SIGNAL_CI_CONFIG: this.options.config
      },
      locale: "en"
    });
  }
  async waitForProvisionURL() {
    return this.waitForEvent("provisioning-url");
  }
  async waitUntilLoaded() {
    return this.waitForEvent("app-loaded");
  }
  async waitForMessageSend() {
    return this.waitForEvent("message:send-complete");
  }
  async waitForConversationOpen() {
    return this.waitForEvent("conversation:open");
  }
  async close() {
    await this.app.close();
  }
  async getWindow() {
    return this.app.firstWindow();
  }
  async waitForEvent(event) {
    const window = await this.getWindow();
    const result = await window.evaluate(`window.CI.waitForEvent(${JSON.stringify(event)})`);
    return result;
  }
  get app() {
    if (!this.privApp) {
      throw new Error("Call ElectronWrap.start() first");
    }
    return this.privApp;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  App
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGxheXdyaWdodC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEVsZWN0cm9uQXBwbGljYXRpb24sIFBhZ2UgfSBmcm9tICdwbGF5d3JpZ2h0JztcbmltcG9ydCB7IF9lbGVjdHJvbiBhcyBlbGVjdHJvbiB9IGZyb20gJ3BsYXl3cmlnaHQnO1xuXG5leHBvcnQgdHlwZSBBcHBMb2FkZWRJbmZvVHlwZSA9IFJlYWRvbmx5PHtcbiAgbG9hZFRpbWU6IG51bWJlcjtcbiAgbWVzc2FnZXNQZXJTZWM6IG51bWJlcjtcbn0+O1xuXG5leHBvcnQgdHlwZSBNZXNzYWdlU2VuZEluZm9UeXBlID0gUmVhZG9ubHk8e1xuICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgZGVsdGE6IG51bWJlcjtcbn0+O1xuXG5leHBvcnQgdHlwZSBDb252ZXJzYXRpb25PcGVuSW5mb1R5cGUgPSBSZWFkb25seTx7XG4gIGRlbHRhOiBudW1iZXI7XG59PjtcblxuZXhwb3J0IHR5cGUgQXBwT3B0aW9uc1R5cGUgPSBSZWFkb25seTx7XG4gIG1haW46IHN0cmluZztcbiAgYXJnczogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xuICBjb25maWc6IHN0cmluZztcbn0+O1xuXG5leHBvcnQgY2xhc3MgQXBwIHtcbiAgcHJpdmF0ZSBwcml2QXBwOiBFbGVjdHJvbkFwcGxpY2F0aW9uIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgb3B0aW9uczogQXBwT3B0aW9uc1R5cGUpIHt9XG5cbiAgcHVibGljIGFzeW5jIHN0YXJ0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMucHJpdkFwcCA9IGF3YWl0IGVsZWN0cm9uLmxhdW5jaCh7XG4gICAgICBleGVjdXRhYmxlUGF0aDogdGhpcy5vcHRpb25zLm1haW4sXG4gICAgICBhcmdzOiB0aGlzLm9wdGlvbnMuYXJncy5zbGljZSgpLFxuICAgICAgZW52OiB7XG4gICAgICAgIC4uLnByb2Nlc3MuZW52LFxuICAgICAgICBTSUdOQUxfQ0lfQ09ORklHOiB0aGlzLm9wdGlvbnMuY29uZmlnLFxuICAgICAgfSxcbiAgICAgIGxvY2FsZTogJ2VuJyxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB3YWl0Rm9yUHJvdmlzaW9uVVJMKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMud2FpdEZvckV2ZW50KCdwcm92aXNpb25pbmctdXJsJyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgd2FpdFVudGlsTG9hZGVkKCk6IFByb21pc2U8QXBwTG9hZGVkSW5mb1R5cGU+IHtcbiAgICByZXR1cm4gdGhpcy53YWl0Rm9yRXZlbnQoJ2FwcC1sb2FkZWQnKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB3YWl0Rm9yTWVzc2FnZVNlbmQoKTogUHJvbWlzZTxNZXNzYWdlU2VuZEluZm9UeXBlPiB7XG4gICAgcmV0dXJuIHRoaXMud2FpdEZvckV2ZW50KCdtZXNzYWdlOnNlbmQtY29tcGxldGUnKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB3YWl0Rm9yQ29udmVyc2F0aW9uT3BlbigpOiBQcm9taXNlPENvbnZlcnNhdGlvbk9wZW5JbmZvVHlwZT4ge1xuICAgIHJldHVybiB0aGlzLndhaXRGb3JFdmVudCgnY29udmVyc2F0aW9uOm9wZW4nKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjbG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmFwcC5jbG9zZSgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFdpbmRvdygpOiBQcm9taXNlPFBhZ2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcHAuZmlyc3RXaW5kb3coKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgd2FpdEZvckV2ZW50PFQ+KGV2ZW50OiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcbiAgICBjb25zdCB3aW5kb3cgPSBhd2FpdCB0aGlzLmdldFdpbmRvdygpO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgd2luZG93LmV2YWx1YXRlKFxuICAgICAgYHdpbmRvdy5DSS53YWl0Rm9yRXZlbnQoJHtKU09OLnN0cmluZ2lmeShldmVudCl9KWBcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3VsdCBhcyBUO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgYXBwKCk6IEVsZWN0cm9uQXBwbGljYXRpb24ge1xuICAgIGlmICghdGhpcy5wcml2QXBwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbGwgRWxlY3Ryb25XcmFwLnN0YXJ0KCkgZmlyc3QnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wcml2QXBwO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsd0JBQXNDO0FBc0IvQixNQUFNLElBQUk7QUFBQSxFQUdmLFlBQTZCLFNBQXlCO0FBQXpCO0FBQUEsRUFBMEI7QUFBQSxRQUUxQyxRQUF1QjtBQUNsQyxTQUFLLFVBQVUsTUFBTSw0QkFBUyxPQUFPO0FBQUEsTUFDbkMsZ0JBQWdCLEtBQUssUUFBUTtBQUFBLE1BQzdCLE1BQU0sS0FBSyxRQUFRLEtBQUssTUFBTTtBQUFBLE1BQzlCLEtBQUs7QUFBQSxXQUNBLFFBQVE7QUFBQSxRQUNYLGtCQUFrQixLQUFLLFFBQVE7QUFBQSxNQUNqQztBQUFBLE1BQ0EsUUFBUTtBQUFBLElBQ1YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxRQUVhLHNCQUF1QztBQUNsRCxXQUFPLEtBQUssYUFBYSxrQkFBa0I7QUFBQSxFQUM3QztBQUFBLFFBRWEsa0JBQThDO0FBQ3pELFdBQU8sS0FBSyxhQUFhLFlBQVk7QUFBQSxFQUN2QztBQUFBLFFBRWEscUJBQW1EO0FBQzlELFdBQU8sS0FBSyxhQUFhLHVCQUF1QjtBQUFBLEVBQ2xEO0FBQUEsUUFFYSwwQkFBNkQ7QUFDeEUsV0FBTyxLQUFLLGFBQWEsbUJBQW1CO0FBQUEsRUFDOUM7QUFBQSxRQUVhLFFBQXVCO0FBQ2xDLFVBQU0sS0FBSyxJQUFJLE1BQU07QUFBQSxFQUN2QjtBQUFBLFFBRWEsWUFBMkI7QUFDdEMsV0FBTyxLQUFLLElBQUksWUFBWTtBQUFBLEVBQzlCO0FBQUEsUUFFYyxhQUFnQixPQUEyQjtBQUN2RCxVQUFNLFNBQVMsTUFBTSxLQUFLLFVBQVU7QUFFcEMsVUFBTSxTQUFTLE1BQU0sT0FBTyxTQUMxQiwwQkFBMEIsS0FBSyxVQUFVLEtBQUssSUFDaEQ7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLE1BRVksTUFBMkI7QUFDckMsUUFBSSxDQUFDLEtBQUssU0FBUztBQUNqQixZQUFNLElBQUksTUFBTSxpQ0FBaUM7QUFBQSxJQUNuRDtBQUVBLFdBQU8sS0FBSztBQUFBLEVBQ2Q7QUFDRjtBQTFETyIsCiAgIm5hbWVzIjogW10KfQo=
