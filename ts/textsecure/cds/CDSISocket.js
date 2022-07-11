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
var CDSISocket_exports = {};
__export(CDSISocket_exports, {
  CDSISocket: () => CDSISocket
});
module.exports = __toCommonJS(CDSISocket_exports);
var import_libsignal_client = require("@signalapp/libsignal-client");
var import_assert = require("../../util/assert");
var import_durations = require("../../util/durations");
var import_protobuf = require("../../protobuf");
var import_CDSSocketBase = require("./CDSSocketBase");
class CDSISocket extends import_CDSSocketBase.CDSSocketBase {
  async handshake() {
    (0, import_assert.strictAssert)(this.state === import_CDSSocketBase.CDSSocketState.Open, "CDSI handshake called twice");
    this.state = import_CDSSocketBase.CDSSocketState.Handshake;
    {
      const { done, value: attestationMessage } = await this.socketIterator.next();
      (0, import_assert.strictAssert)(!done, "CDSI socket closed before handshake");
      const earliestValidTimestamp = new Date(Date.now() - import_durations.DAY);
      (0, import_assert.strictAssert)(this.privCdsClient === void 0, "CDSI handshake called twice");
      this.privCdsClient = import_libsignal_client.Cds2Client.new_NOT_FOR_PRODUCTION(this.options.mrenclave, this.options.trustedCaCert, attestationMessage, earliestValidTimestamp);
    }
    this.socket.sendBytes(this.cdsClient.initialRequest());
    {
      const { done, value: message } = await this.socketIterator.next();
      (0, import_assert.strictAssert)(!done, "CDSI socket expected handshake data");
      this.cdsClient.completeHandshake(message);
    }
    this.state = import_CDSSocketBase.CDSSocketState.Established;
  }
  async sendRequest(_version, request) {
    this.socket.sendBytes(this.cdsClient.establishedSend(request));
    const { done, value: ciphertext } = await this.socketIterator.next();
    (0, import_assert.strictAssert)(!done, "CDSISocket.sendRequest(): expected token message");
    const message = await this.decryptResponse(ciphertext);
    this.logger.info("CDSISocket.sendRequest(): processing token message");
    const { token } = import_protobuf.SignalService.CDSClientResponse.decode(message);
    (0, import_assert.strictAssert)(token, "CDSISocket.sendRequest(): expected token");
    this.socket.sendBytes(this.cdsClient.establishedSend(Buffer.from(import_protobuf.SignalService.CDSClientRequest.encode({
      tokenAck: true
    }).finish())));
  }
  async decryptResponse(ciphertext) {
    return this.cdsClient.establishedRecv(ciphertext);
  }
  get cdsClient() {
    (0, import_assert.strictAssert)(this.privCdsClient, "CDSISocket did not start handshake");
    return this.privCdsClient;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CDSISocket
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ0RTSVNvY2tldC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBDZHMyQ2xpZW50IH0gZnJvbSAnQHNpZ25hbGFwcC9saWJzaWduYWwtY2xpZW50JztcblxuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgREFZIH0gZnJvbSAnLi4vLi4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0IHsgU2lnbmFsU2VydmljZSBhcyBQcm90byB9IGZyb20gJy4uLy4uL3Byb3RvYnVmJztcbmltcG9ydCB7IENEU1NvY2tldEJhc2UsIENEU1NvY2tldFN0YXRlIH0gZnJvbSAnLi9DRFNTb2NrZXRCYXNlJztcbmltcG9ydCB0eXBlIHsgQ0RTU29ja2V0QmFzZU9wdGlvbnNUeXBlIH0gZnJvbSAnLi9DRFNTb2NrZXRCYXNlJztcblxuZXhwb3J0IHR5cGUgQ0RTSVNvY2tldE9wdGlvbnNUeXBlID0gUmVhZG9ubHk8e1xuICBtcmVuY2xhdmU6IEJ1ZmZlcjtcbiAgdHJ1c3RlZENhQ2VydDogQnVmZmVyO1xufT4gJlxuICBDRFNTb2NrZXRCYXNlT3B0aW9uc1R5cGU7XG5cbmV4cG9ydCBjbGFzcyBDRFNJU29ja2V0IGV4dGVuZHMgQ0RTU29ja2V0QmFzZTxDRFNJU29ja2V0T3B0aW9uc1R5cGU+IHtcbiAgcHJpdmF0ZSBwcml2Q2RzQ2xpZW50OiBDZHMyQ2xpZW50IHwgdW5kZWZpbmVkO1xuXG4gIHB1YmxpYyBvdmVycmlkZSBhc3luYyBoYW5kc2hha2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgdGhpcy5zdGF0ZSA9PT0gQ0RTU29ja2V0U3RhdGUuT3BlbixcbiAgICAgICdDRFNJIGhhbmRzaGFrZSBjYWxsZWQgdHdpY2UnXG4gICAgKTtcbiAgICB0aGlzLnN0YXRlID0gQ0RTU29ja2V0U3RhdGUuSGFuZHNoYWtlO1xuXG4gICAge1xuICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZTogYXR0ZXN0YXRpb25NZXNzYWdlIH0gPVxuICAgICAgICBhd2FpdCB0aGlzLnNvY2tldEl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIHN0cmljdEFzc2VydCghZG9uZSwgJ0NEU0kgc29ja2V0IGNsb3NlZCBiZWZvcmUgaGFuZHNoYWtlJyk7XG5cbiAgICAgIGNvbnN0IGVhcmxpZXN0VmFsaWRUaW1lc3RhbXAgPSBuZXcgRGF0ZShEYXRlLm5vdygpIC0gREFZKTtcblxuICAgICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgICB0aGlzLnByaXZDZHNDbGllbnQgPT09IHVuZGVmaW5lZCxcbiAgICAgICAgJ0NEU0kgaGFuZHNoYWtlIGNhbGxlZCB0d2ljZSdcbiAgICAgICk7XG4gICAgICB0aGlzLnByaXZDZHNDbGllbnQgPSBDZHMyQ2xpZW50Lm5ld19OT1RfRk9SX1BST0RVQ1RJT04oXG4gICAgICAgIHRoaXMub3B0aW9ucy5tcmVuY2xhdmUsXG4gICAgICAgIHRoaXMub3B0aW9ucy50cnVzdGVkQ2FDZXJ0LFxuICAgICAgICBhdHRlc3RhdGlvbk1lc3NhZ2UsXG4gICAgICAgIGVhcmxpZXN0VmFsaWRUaW1lc3RhbXBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5zb2NrZXQuc2VuZEJ5dGVzKHRoaXMuY2RzQ2xpZW50LmluaXRpYWxSZXF1ZXN0KCkpO1xuXG4gICAge1xuICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZTogbWVzc2FnZSB9ID0gYXdhaXQgdGhpcy5zb2NrZXRJdGVyYXRvci5uZXh0KCk7XG4gICAgICBzdHJpY3RBc3NlcnQoIWRvbmUsICdDRFNJIHNvY2tldCBleHBlY3RlZCBoYW5kc2hha2UgZGF0YScpO1xuXG4gICAgICB0aGlzLmNkc0NsaWVudC5jb21wbGV0ZUhhbmRzaGFrZShtZXNzYWdlKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0gQ0RTU29ja2V0U3RhdGUuRXN0YWJsaXNoZWQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYXN5bmMgc2VuZFJlcXVlc3QoXG4gICAgX3ZlcnNpb246IG51bWJlcixcbiAgICByZXF1ZXN0OiBCdWZmZXJcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5zb2NrZXQuc2VuZEJ5dGVzKHRoaXMuY2RzQ2xpZW50LmVzdGFibGlzaGVkU2VuZChyZXF1ZXN0KSk7XG5cbiAgICBjb25zdCB7IGRvbmUsIHZhbHVlOiBjaXBoZXJ0ZXh0IH0gPSBhd2FpdCB0aGlzLnNvY2tldEl0ZXJhdG9yLm5leHQoKTtcbiAgICBzdHJpY3RBc3NlcnQoIWRvbmUsICdDRFNJU29ja2V0LnNlbmRSZXF1ZXN0KCk6IGV4cGVjdGVkIHRva2VuIG1lc3NhZ2UnKTtcblxuICAgIGNvbnN0IG1lc3NhZ2UgPSBhd2FpdCB0aGlzLmRlY3J5cHRSZXNwb25zZShjaXBoZXJ0ZXh0KTtcblxuICAgIHRoaXMubG9nZ2VyLmluZm8oJ0NEU0lTb2NrZXQuc2VuZFJlcXVlc3QoKTogcHJvY2Vzc2luZyB0b2tlbiBtZXNzYWdlJyk7XG5cbiAgICBjb25zdCB7IHRva2VuIH0gPSBQcm90by5DRFNDbGllbnRSZXNwb25zZS5kZWNvZGUobWVzc2FnZSk7XG4gICAgc3RyaWN0QXNzZXJ0KHRva2VuLCAnQ0RTSVNvY2tldC5zZW5kUmVxdWVzdCgpOiBleHBlY3RlZCB0b2tlbicpO1xuXG4gICAgdGhpcy5zb2NrZXQuc2VuZEJ5dGVzKFxuICAgICAgdGhpcy5jZHNDbGllbnQuZXN0YWJsaXNoZWRTZW5kKFxuICAgICAgICBCdWZmZXIuZnJvbShcbiAgICAgICAgICBQcm90by5DRFNDbGllbnRSZXF1ZXN0LmVuY29kZSh7XG4gICAgICAgICAgICB0b2tlbkFjazogdHJ1ZSxcbiAgICAgICAgICB9KS5maW5pc2goKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBhc3luYyBkZWNyeXB0UmVzcG9uc2UoXG4gICAgY2lwaGVydGV4dDogQnVmZmVyXG4gICk6IFByb21pc2U8QnVmZmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuY2RzQ2xpZW50LmVzdGFibGlzaGVkUmVjdihjaXBoZXJ0ZXh0KTtcbiAgfVxuXG4gIC8vXG4gIC8vIFByaXZhdGVcbiAgLy9cblxuICBwcml2YXRlIGdldCBjZHNDbGllbnQoKTogQ2RzMkNsaWVudCB7XG4gICAgc3RyaWN0QXNzZXJ0KHRoaXMucHJpdkNkc0NsaWVudCwgJ0NEU0lTb2NrZXQgZGlkIG5vdCBzdGFydCBoYW5kc2hha2UnKTtcbiAgICByZXR1cm4gdGhpcy5wcml2Q2RzQ2xpZW50O1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsOEJBQTJCO0FBRTNCLG9CQUE2QjtBQUM3Qix1QkFBb0I7QUFDcEIsc0JBQXVDO0FBQ3ZDLDJCQUE4QztBQVN2QyxNQUFNLG1CQUFtQixtQ0FBcUM7QUFBQSxRQUc3QyxZQUEyQjtBQUMvQyxvQ0FDRSxLQUFLLFVBQVUsb0NBQWUsTUFDOUIsNkJBQ0Y7QUFDQSxTQUFLLFFBQVEsb0NBQWU7QUFFNUI7QUFDRSxZQUFNLEVBQUUsTUFBTSxPQUFPLHVCQUNuQixNQUFNLEtBQUssZUFBZSxLQUFLO0FBQ2pDLHNDQUFhLENBQUMsTUFBTSxxQ0FBcUM7QUFFekQsWUFBTSx5QkFBeUIsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLG9CQUFHO0FBRXhELHNDQUNFLEtBQUssa0JBQWtCLFFBQ3ZCLDZCQUNGO0FBQ0EsV0FBSyxnQkFBZ0IsbUNBQVcsdUJBQzlCLEtBQUssUUFBUSxXQUNiLEtBQUssUUFBUSxlQUNiLG9CQUNBLHNCQUNGO0FBQUEsSUFDRjtBQUVBLFNBQUssT0FBTyxVQUFVLEtBQUssVUFBVSxlQUFlLENBQUM7QUFFckQ7QUFDRSxZQUFNLEVBQUUsTUFBTSxPQUFPLFlBQVksTUFBTSxLQUFLLGVBQWUsS0FBSztBQUNoRSxzQ0FBYSxDQUFDLE1BQU0scUNBQXFDO0FBRXpELFdBQUssVUFBVSxrQkFBa0IsT0FBTztBQUFBLElBQzFDO0FBRUEsU0FBSyxRQUFRLG9DQUFlO0FBQUEsRUFDOUI7QUFBQSxRQUV5QixZQUN2QixVQUNBLFNBQ2U7QUFDZixTQUFLLE9BQU8sVUFBVSxLQUFLLFVBQVUsZ0JBQWdCLE9BQU8sQ0FBQztBQUU3RCxVQUFNLEVBQUUsTUFBTSxPQUFPLGVBQWUsTUFBTSxLQUFLLGVBQWUsS0FBSztBQUNuRSxvQ0FBYSxDQUFDLE1BQU0sa0RBQWtEO0FBRXRFLFVBQU0sVUFBVSxNQUFNLEtBQUssZ0JBQWdCLFVBQVU7QUFFckQsU0FBSyxPQUFPLEtBQUssb0RBQW9EO0FBRXJFLFVBQU0sRUFBRSxVQUFVLDhCQUFNLGtCQUFrQixPQUFPLE9BQU87QUFDeEQsb0NBQWEsT0FBTywwQ0FBMEM7QUFFOUQsU0FBSyxPQUFPLFVBQ1YsS0FBSyxVQUFVLGdCQUNiLE9BQU8sS0FDTCw4QkFBTSxpQkFBaUIsT0FBTztBQUFBLE1BQzVCLFVBQVU7QUFBQSxJQUNaLENBQUMsRUFBRSxPQUFPLENBQ1osQ0FDRixDQUNGO0FBQUEsRUFDRjtBQUFBLFFBRXlCLGdCQUN2QixZQUNpQjtBQUNqQixXQUFPLEtBQUssVUFBVSxnQkFBZ0IsVUFBVTtBQUFBLEVBQ2xEO0FBQUEsTUFNWSxZQUF3QjtBQUNsQyxvQ0FBYSxLQUFLLGVBQWUsb0NBQW9DO0FBQ3JFLFdBQU8sS0FBSztBQUFBLEVBQ2Q7QUFDRjtBQWxGTyIsCiAgIm5hbWVzIjogW10KfQo=
