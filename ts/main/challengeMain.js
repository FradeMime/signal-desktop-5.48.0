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
var challengeMain_exports = {};
__export(challengeMain_exports, {
  ChallengeMainHandler: () => ChallengeMainHandler
});
module.exports = __toCommonJS(challengeMain_exports);
var import_electron = require("electron");
class ChallengeMainHandler {
  constructor() {
    this.handlers = [];
    this.initialize();
  }
  handleCaptcha(captcha) {
    const response = { captcha };
    const { handlers } = this;
    this.handlers = [];
    for (const resolve of handlers) {
      resolve(response);
    }
  }
  async onRequest(event, request) {
    console.log("Received challenge request, waiting for response");
    const data = await new Promise((resolve) => {
      this.handlers.push(resolve);
    });
    console.log("Sending challenge response", data);
    const ipcResponse = {
      seq: request.seq,
      data
    };
    event.sender.send("challenge:response", ipcResponse);
  }
  initialize() {
    import_electron.ipcMain.on("challenge:request", (event, request) => {
      this.onRequest(event, request);
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChallengeMainHandler
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2hhbGxlbmdlTWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuXG5pbXBvcnQgdHlwZSB7IElwY01haW5FdmVudCB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCB7IGlwY01haW4gYXMgaXBjIH0gZnJvbSAnZWxlY3Ryb24nO1xuXG5pbXBvcnQgdHlwZSB7IElQQ1JlcXVlc3QsIElQQ1Jlc3BvbnNlLCBDaGFsbGVuZ2VSZXNwb25zZSB9IGZyb20gJy4uL2NoYWxsZW5nZSc7XG5cbmV4cG9ydCBjbGFzcyBDaGFsbGVuZ2VNYWluSGFuZGxlciB7XG4gIHByaXZhdGUgaGFuZGxlcnM6IEFycmF5PChyZXNwb25zZTogQ2hhbGxlbmdlUmVzcG9uc2UpID0+IHZvaWQ+ID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlQ2FwdGNoYShjYXB0Y2hhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCByZXNwb25zZTogQ2hhbGxlbmdlUmVzcG9uc2UgPSB7IGNhcHRjaGEgfTtcblxuICAgIGNvbnN0IHsgaGFuZGxlcnMgfSA9IHRoaXM7XG4gICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIGZvciAoY29uc3QgcmVzb2x2ZSBvZiBoYW5kbGVycykge1xuICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBvblJlcXVlc3QoXG4gICAgZXZlbnQ6IElwY01haW5FdmVudCxcbiAgICByZXF1ZXN0OiBJUENSZXF1ZXN0XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnNvbGUubG9nKCdSZWNlaXZlZCBjaGFsbGVuZ2UgcmVxdWVzdCwgd2FpdGluZyBmb3IgcmVzcG9uc2UnKTtcblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBuZXcgUHJvbWlzZTxDaGFsbGVuZ2VSZXNwb25zZT4ocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZXJzLnB1c2gocmVzb2x2ZSk7XG4gICAgfSk7XG5cbiAgICBjb25zb2xlLmxvZygnU2VuZGluZyBjaGFsbGVuZ2UgcmVzcG9uc2UnLCBkYXRhKTtcblxuICAgIGNvbnN0IGlwY1Jlc3BvbnNlOiBJUENSZXNwb25zZSA9IHtcbiAgICAgIHNlcTogcmVxdWVzdC5zZXEsXG4gICAgICBkYXRhLFxuICAgIH07XG4gICAgZXZlbnQuc2VuZGVyLnNlbmQoJ2NoYWxsZW5nZTpyZXNwb25zZScsIGlwY1Jlc3BvbnNlKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcbiAgICBpcGMub24oJ2NoYWxsZW5nZTpyZXF1ZXN0JywgKGV2ZW50LCByZXF1ZXN0KSA9PiB7XG4gICAgICB0aGlzLm9uUmVxdWVzdChldmVudCwgcmVxdWVzdCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSxzQkFBK0I7QUFJeEIsTUFBTSxxQkFBcUI7QUFBQSxFQUdoQyxjQUFjO0FBRk4sb0JBQXlELENBQUM7QUFHaEUsU0FBSyxXQUFXO0FBQUEsRUFDbEI7QUFBQSxFQUVPLGNBQWMsU0FBdUI7QUFDMUMsVUFBTSxXQUE4QixFQUFFLFFBQVE7QUFFOUMsVUFBTSxFQUFFLGFBQWE7QUFDckIsU0FBSyxXQUFXLENBQUM7QUFDakIsZUFBVyxXQUFXLFVBQVU7QUFDOUIsY0FBUSxRQUFRO0FBQUEsSUFDbEI7QUFBQSxFQUNGO0FBQUEsUUFFYyxVQUNaLE9BQ0EsU0FDZTtBQUNmLFlBQVEsSUFBSSxrREFBa0Q7QUFFOUQsVUFBTSxPQUFPLE1BQU0sSUFBSSxRQUEyQixhQUFXO0FBQzNELFdBQUssU0FBUyxLQUFLLE9BQU87QUFBQSxJQUM1QixDQUFDO0FBRUQsWUFBUSxJQUFJLDhCQUE4QixJQUFJO0FBRTlDLFVBQU0sY0FBMkI7QUFBQSxNQUMvQixLQUFLLFFBQVE7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUNBLFVBQU0sT0FBTyxLQUFLLHNCQUFzQixXQUFXO0FBQUEsRUFDckQ7QUFBQSxFQUVRLGFBQW1CO0FBQ3pCLDRCQUFJLEdBQUcscUJBQXFCLENBQUMsT0FBTyxZQUFZO0FBQzlDLFdBQUssVUFBVSxPQUFPLE9BQU87QUFBQSxJQUMvQixDQUFDO0FBQUEsRUFDSDtBQUNGO0FBekNPIiwKICAibmFtZXMiOiBbXQp9Cg==
