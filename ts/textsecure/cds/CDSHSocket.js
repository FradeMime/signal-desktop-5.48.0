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
var CDSHSocket_exports = {};
__export(CDSHSocket_exports, {
  CDSHSocket: () => CDSHSocket
});
module.exports = __toCommonJS(CDSHSocket_exports);
var import_assert = require("../../util/assert");
var import_CDSSocketBase = require("./CDSSocketBase");
class CDSHSocket extends import_CDSSocketBase.CDSSocketBase {
  async handshake() {
    (0, import_assert.strictAssert)(this.state === import_CDSSocketBase.CDSSocketState.Open, "CDSH handshake called twice");
    this.state = import_CDSSocketBase.CDSSocketState.Handshake;
    this.socket.sendBytes(this.options.enclaveClient.initialRequest());
    const { done, value: message } = await this.socketIterator.next();
    (0, import_assert.strictAssert)(!done, "Expected CDSH handshake response");
    this.options.enclaveClient.completeHandshake(message);
    this.state = import_CDSSocketBase.CDSSocketState.Established;
  }
  async sendRequest(version, request) {
    this.socket.sendBytes(this.options.enclaveClient.establishedSend(Buffer.concat([Buffer.from([version]), request])));
  }
  async decryptResponse(ciphertext) {
    return this.options.enclaveClient.establishedRecv(ciphertext);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CDSHSocket
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ0RTSFNvY2tldC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgSHNtRW5jbGF2ZUNsaWVudCB9IGZyb20gJ0BzaWduYWxhcHAvbGlic2lnbmFsLWNsaWVudCc7XG5cbmltcG9ydCB7IHN0cmljdEFzc2VydCB9IGZyb20gJy4uLy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7IENEU1NvY2tldEJhc2UsIENEU1NvY2tldFN0YXRlIH0gZnJvbSAnLi9DRFNTb2NrZXRCYXNlJztcbmltcG9ydCB0eXBlIHsgQ0RTU29ja2V0QmFzZU9wdGlvbnNUeXBlIH0gZnJvbSAnLi9DRFNTb2NrZXRCYXNlJztcblxuZXhwb3J0IHR5cGUgQ0RTSFNvY2tldE9wdGlvbnNUeXBlID0gUmVhZG9ubHk8e1xuICBlbmNsYXZlQ2xpZW50OiBIc21FbmNsYXZlQ2xpZW50O1xufT4gJlxuICBDRFNTb2NrZXRCYXNlT3B0aW9uc1R5cGU7XG5cbmV4cG9ydCBjbGFzcyBDRFNIU29ja2V0IGV4dGVuZHMgQ0RTU29ja2V0QmFzZTxDRFNIU29ja2V0T3B0aW9uc1R5cGU+IHtcbiAgcHVibGljIG92ZXJyaWRlIGFzeW5jIGhhbmRzaGFrZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBzdHJpY3RBc3NlcnQoXG4gICAgICB0aGlzLnN0YXRlID09PSBDRFNTb2NrZXRTdGF0ZS5PcGVuLFxuICAgICAgJ0NEU0ggaGFuZHNoYWtlIGNhbGxlZCB0d2ljZSdcbiAgICApO1xuICAgIHRoaXMuc3RhdGUgPSBDRFNTb2NrZXRTdGF0ZS5IYW5kc2hha2U7XG5cbiAgICAvLyBIYW5kc2hha2VcbiAgICB0aGlzLnNvY2tldC5zZW5kQnl0ZXModGhpcy5vcHRpb25zLmVuY2xhdmVDbGllbnQuaW5pdGlhbFJlcXVlc3QoKSk7XG5cbiAgICBjb25zdCB7IGRvbmUsIHZhbHVlOiBtZXNzYWdlIH0gPSBhd2FpdCB0aGlzLnNvY2tldEl0ZXJhdG9yLm5leHQoKTtcbiAgICBzdHJpY3RBc3NlcnQoIWRvbmUsICdFeHBlY3RlZCBDRFNIIGhhbmRzaGFrZSByZXNwb25zZScpO1xuXG4gICAgdGhpcy5vcHRpb25zLmVuY2xhdmVDbGllbnQuY29tcGxldGVIYW5kc2hha2UobWVzc2FnZSk7XG4gICAgdGhpcy5zdGF0ZSA9IENEU1NvY2tldFN0YXRlLkVzdGFibGlzaGVkO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGFzeW5jIHNlbmRSZXF1ZXN0KFxuICAgIHZlcnNpb246IG51bWJlcixcbiAgICByZXF1ZXN0OiBCdWZmZXJcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5zb2NrZXQuc2VuZEJ5dGVzKFxuICAgICAgdGhpcy5vcHRpb25zLmVuY2xhdmVDbGllbnQuZXN0YWJsaXNoZWRTZW5kKFxuICAgICAgICBCdWZmZXIuY29uY2F0KFtCdWZmZXIuZnJvbShbdmVyc2lvbl0pLCByZXF1ZXN0XSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGFzeW5jIGRlY3J5cHRSZXNwb25zZShcbiAgICBjaXBoZXJ0ZXh0OiBCdWZmZXJcbiAgKTogUHJvbWlzZTxCdWZmZXI+IHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmVuY2xhdmVDbGllbnQuZXN0YWJsaXNoZWRSZWN2KGNpcGhlcnRleHQpO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0Esb0JBQTZCO0FBQzdCLDJCQUE4QztBQVF2QyxNQUFNLG1CQUFtQixtQ0FBcUM7QUFBQSxRQUM3QyxZQUEyQjtBQUMvQyxvQ0FDRSxLQUFLLFVBQVUsb0NBQWUsTUFDOUIsNkJBQ0Y7QUFDQSxTQUFLLFFBQVEsb0NBQWU7QUFHNUIsU0FBSyxPQUFPLFVBQVUsS0FBSyxRQUFRLGNBQWMsZUFBZSxDQUFDO0FBRWpFLFVBQU0sRUFBRSxNQUFNLE9BQU8sWUFBWSxNQUFNLEtBQUssZUFBZSxLQUFLO0FBQ2hFLG9DQUFhLENBQUMsTUFBTSxrQ0FBa0M7QUFFdEQsU0FBSyxRQUFRLGNBQWMsa0JBQWtCLE9BQU87QUFDcEQsU0FBSyxRQUFRLG9DQUFlO0FBQUEsRUFDOUI7QUFBQSxRQUV5QixZQUN2QixTQUNBLFNBQ2U7QUFDZixTQUFLLE9BQU8sVUFDVixLQUFLLFFBQVEsY0FBYyxnQkFDekIsT0FBTyxPQUFPLENBQUMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQ2pELENBQ0Y7QUFBQSxFQUNGO0FBQUEsUUFFeUIsZ0JBQ3ZCLFlBQ2lCO0FBQ2pCLFdBQU8sS0FBSyxRQUFRLGNBQWMsZ0JBQWdCLFVBQVU7QUFBQSxFQUM5RDtBQUNGO0FBbENPIiwKICAibmFtZXMiOiBbXQp9Cg==
