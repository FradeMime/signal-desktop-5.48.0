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
var CDSSocketBase_exports = {};
__export(CDSSocketBase_exports, {
  CDSSocketBase: () => CDSSocketBase,
  CDSSocketState: () => CDSSocketState
});
module.exports = __toCommonJS(CDSSocketBase_exports);
var import_events = require("events");
var import_stream = require("stream");
var import_lodash = require("lodash");
var import_long = __toESM(require("long"));
var import_assert = require("../../util/assert");
var import_dropNull = require("../../util/dropNull");
var import_UUID = require("../../types/UUID");
var Bytes = __toESM(require("../../Bytes"));
var import_Crypto = require("../../Crypto");
var import_protobuf = require("../../protobuf");
var CDSSocketState = /* @__PURE__ */ ((CDSSocketState2) => {
  CDSSocketState2["Open"] = "Open";
  CDSSocketState2["Handshake"] = "Handshake";
  CDSSocketState2["Established"] = "Established";
  CDSSocketState2["Closed"] = "Closed";
  return CDSSocketState2;
})(CDSSocketState || {});
const MAX_E164_COUNT = 5e3;
const E164_BYTE_SIZE = 8;
const TRIPLE_BYTE_SIZE = import_UUID.UUID_BYTE_SIZE * 2 + E164_BYTE_SIZE;
class CDSSocketBase extends import_events.EventEmitter {
  constructor(options) {
    super();
    this.options = options;
    this.state = "Open" /* Open */;
    this.logger = options.logger;
    this.socket = options.socket;
    this.socketIterator = this.iterateSocket();
  }
  async close(code, reason) {
    return this.socket.close(code, reason);
  }
  async request({
    e164s,
    acis,
    accessKeys
  }) {
    const log = this.logger;
    (0, import_assert.strictAssert)(e164s.length < MAX_E164_COUNT, "CDSSocket does not support paging. Use this for one-off requests");
    (0, import_assert.strictAssert)(this.state === "Established" /* Established */, "CDS Connection not established");
    const aciUakPairs = new Array();
    let version;
    if (acis) {
      (0, import_assert.strictAssert)(accessKeys, "accessKeys are required when acis are present");
      (0, import_assert.strictAssert)(acis.length === accessKeys.length, `Number of ACIs ${acis.length} is different from number of access keys ${accessKeys.length}`);
      version = 2;
      for (let i = 0; i < acis.length; i += 1) {
        aciUakPairs.push(Bytes.concatenate([
          (0, import_Crypto.uuidToBytes)(acis[i]),
          Bytes.fromBase64(accessKeys[i])
        ]));
      }
    } else {
      version = 1;
    }
    const request = import_protobuf.SignalService.CDSClientRequest.encode({
      newE164s: Buffer.concat(e164s.map((e164) => {
        return new Uint8Array(import_long.default.fromString(e164).toBytesBE());
      })),
      aciUakPairs: Buffer.concat(aciUakPairs)
    }).finish();
    log.info(`CDSSocket.request(): sending version=${version} request`);
    await this.sendRequest(version, Buffer.from(request));
    const resultMap = /* @__PURE__ */ new Map();
    let retryAfterSecs;
    while (true) {
      const { done, value: ciphertext } = await this.socketIterator.next();
      if (done) {
        this.state = "Closed" /* Closed */;
        break;
      }
      const message = await this.decryptResponse(ciphertext);
      log.info("CDSSocket.request(): processing response message");
      const response = import_protobuf.SignalService.CDSClientResponse.decode(message);
      const newRetryAfterSecs = (0, import_dropNull.dropNull)(response.retryAfterSecs);
      decodeSingleResponse(resultMap, response);
      if (newRetryAfterSecs) {
        retryAfterSecs = Math.max(newRetryAfterSecs, retryAfterSecs ?? 0);
      }
    }
    log.info("CDSSocket.request(): done");
    return {
      response: resultMap,
      retryAfterSecs
    };
  }
  on(type, listener) {
    return super.on(type, listener);
  }
  emit(type, ...args) {
    return super.emit(type, ...args);
  }
  iterateSocket() {
    const stream = new import_stream.Readable({ read: import_lodash.noop, objectMode: true });
    this.socket.on("message", ({ type, binaryData }) => {
      (0, import_assert.strictAssert)(type === "binary", "Invalid CDS socket packet");
      (0, import_assert.strictAssert)(binaryData, "Invalid CDS socket packet");
      stream.push(binaryData);
    });
    this.socket.on("close", (code, reason) => {
      if (code === 1e3) {
        stream.push(null);
      } else {
        stream.destroy(new Error(`Socket closed with code ${code} and reason ${reason}`));
      }
    });
    this.socket.on("error", (error) => stream.destroy(error));
    return stream[Symbol.asyncIterator]();
  }
}
function decodeSingleResponse(resultMap, response) {
  for (let i = 0; i < response.e164PniAciTriples.length; i += TRIPLE_BYTE_SIZE) {
    const tripleBytes = response.e164PniAciTriples.slice(i, i + TRIPLE_BYTE_SIZE);
    (0, import_assert.strictAssert)(tripleBytes.length === TRIPLE_BYTE_SIZE, "Invalid size of CDS response triple");
    let offset = 0;
    const e164Bytes = tripleBytes.slice(offset, offset + E164_BYTE_SIZE);
    offset += E164_BYTE_SIZE;
    const pniBytes = tripleBytes.slice(offset, offset + import_UUID.UUID_BYTE_SIZE);
    offset += import_UUID.UUID_BYTE_SIZE;
    const aciBytes = tripleBytes.slice(offset, offset + import_UUID.UUID_BYTE_SIZE);
    offset += import_UUID.UUID_BYTE_SIZE;
    const e164Long = import_long.default.fromBytesBE(Array.from(e164Bytes));
    if (e164Long.isZero()) {
      continue;
    }
    const e164 = `+${e164Long.toString()}`;
    const pni = (0, import_Crypto.bytesToUuid)(pniBytes);
    const aci = (0, import_Crypto.bytesToUuid)(aciBytes);
    resultMap.set(e164, { pni, aci });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CDSSocketBase,
  CDSSocketState
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ0RTU29ja2V0QmFzZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgeyBSZWFkYWJsZSB9IGZyb20gJ3N0cmVhbSc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB0eXBlIHsgY29ubmVjdGlvbiBhcyBXZWJTb2NrZXQgfSBmcm9tICd3ZWJzb2NrZXQnO1xuaW1wb3J0IExvbmcgZnJvbSAnbG9uZyc7XG5cbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0xvZ2dpbmcnO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgZHJvcE51bGwgfSBmcm9tICcuLi8uLi91dGlsL2Ryb3BOdWxsJztcbmltcG9ydCB7IFVVSURfQllURV9TSVpFIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgKiBhcyBCeXRlcyBmcm9tICcuLi8uLi9CeXRlcyc7XG5pbXBvcnQgeyB1dWlkVG9CeXRlcywgYnl0ZXNUb1V1aWQgfSBmcm9tICcuLi8uLi9DcnlwdG8nO1xuaW1wb3J0IHsgU2lnbmFsU2VydmljZSBhcyBQcm90byB9IGZyb20gJy4uLy4uL3Byb3RvYnVmJztcbmltcG9ydCB0eXBlIHtcbiAgQ0RTUmVxdWVzdE9wdGlvbnNUeXBlLFxuICBDRFNSZXNwb25zZUVudHJ5VHlwZSxcbiAgQ0RTUmVzcG9uc2VUeXBlLFxufSBmcm9tICcuL1R5cGVzLmQnO1xuXG5leHBvcnQgdHlwZSBDRFNTb2NrZXRCYXNlT3B0aW9uc1R5cGUgPSBSZWFkb25seTx7XG4gIGxvZ2dlcjogTG9nZ2VyVHlwZTtcbiAgc29ja2V0OiBXZWJTb2NrZXQ7XG59PjtcblxuZXhwb3J0IHR5cGUgQ0RTU29ja2V0UmVzcG9uc2VUeXBlID0gUmVhZG9ubHk8e1xuICByZXNwb25zZTogQ0RTUmVzcG9uc2VUeXBlO1xuICByZXRyeUFmdGVyU2Vjcz86IG51bWJlcjtcbn0+O1xuXG5leHBvcnQgZW51bSBDRFNTb2NrZXRTdGF0ZSB7XG4gIE9wZW4gPSAnT3BlbicsXG4gIEhhbmRzaGFrZSA9ICdIYW5kc2hha2UnLFxuICBFc3RhYmxpc2hlZCA9ICdFc3RhYmxpc2hlZCcsXG4gIENsb3NlZCA9ICdDbG9zZWQnLFxufVxuXG5jb25zdCBNQVhfRTE2NF9DT1VOVCA9IDUwMDA7XG5jb25zdCBFMTY0X0JZVEVfU0laRSA9IDg7XG5jb25zdCBUUklQTEVfQllURV9TSVpFID0gVVVJRF9CWVRFX1NJWkUgKiAyICsgRTE2NF9CWVRFX1NJWkU7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDRFNTb2NrZXRCYXNlPFxuICBPcHRpb25zIGV4dGVuZHMgQ0RTU29ja2V0QmFzZU9wdGlvbnNUeXBlID0gQ0RTU29ja2V0QmFzZU9wdGlvbnNUeXBlXG4+IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgcHJvdGVjdGVkIHN0YXRlID0gQ0RTU29ja2V0U3RhdGUuT3BlbjtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc29ja2V0OiBXZWJTb2NrZXQ7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGxvZ2dlcjogTG9nZ2VyVHlwZTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc29ja2V0SXRlcmF0b3I6IEFzeW5jSXRlcmF0b3I8QnVmZmVyPjtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgb3B0aW9uczogT3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvLyBGb3IgZWFzaWVyIGFjY2Vzc1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXI7XG4gICAgdGhpcy5zb2NrZXQgPSBvcHRpb25zLnNvY2tldDtcblxuICAgIHRoaXMuc29ja2V0SXRlcmF0b3IgPSB0aGlzLml0ZXJhdGVTb2NrZXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjbG9zZShjb2RlOiBudW1iZXIsIHJlYXNvbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0LmNsb3NlKGNvZGUsIHJlYXNvbik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVxdWVzdCh7XG4gICAgZTE2NHMsXG4gICAgYWNpcyxcbiAgICBhY2Nlc3NLZXlzLFxuICB9OiBDRFNSZXF1ZXN0T3B0aW9uc1R5cGUpOiBQcm9taXNlPENEU1NvY2tldFJlc3BvbnNlVHlwZT4ge1xuICAgIGNvbnN0IGxvZyA9IHRoaXMubG9nZ2VyO1xuXG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgZTE2NHMubGVuZ3RoIDwgTUFYX0UxNjRfQ09VTlQsXG4gICAgICAnQ0RTU29ja2V0IGRvZXMgbm90IHN1cHBvcnQgcGFnaW5nLiBVc2UgdGhpcyBmb3Igb25lLW9mZiByZXF1ZXN0cydcbiAgICApO1xuXG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgdGhpcy5zdGF0ZSA9PT0gQ0RTU29ja2V0U3RhdGUuRXN0YWJsaXNoZWQsXG4gICAgICAnQ0RTIENvbm5lY3Rpb24gbm90IGVzdGFibGlzaGVkJ1xuICAgICk7XG5cbiAgICBjb25zdCBhY2lVYWtQYWlycyA9IG5ldyBBcnJheTxVaW50OEFycmF5PigpO1xuXG4gICAgbGV0IHZlcnNpb246IDEgfCAyO1xuICAgIGlmIChhY2lzKSB7XG4gICAgICBzdHJpY3RBc3NlcnQoYWNjZXNzS2V5cywgJ2FjY2Vzc0tleXMgYXJlIHJlcXVpcmVkIHdoZW4gYWNpcyBhcmUgcHJlc2VudCcpO1xuXG4gICAgICBzdHJpY3RBc3NlcnQoXG4gICAgICAgIGFjaXMubGVuZ3RoID09PSBhY2Nlc3NLZXlzLmxlbmd0aCxcbiAgICAgICAgYE51bWJlciBvZiBBQ0lzICR7YWNpcy5sZW5ndGh9IGlzIGRpZmZlcmVudCBgICtcbiAgICAgICAgICBgZnJvbSBudW1iZXIgb2YgYWNjZXNzIGtleXMgJHthY2Nlc3NLZXlzLmxlbmd0aH1gXG4gICAgICApO1xuXG4gICAgICB2ZXJzaW9uID0gMjtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY2lzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGFjaVVha1BhaXJzLnB1c2goXG4gICAgICAgICAgQnl0ZXMuY29uY2F0ZW5hdGUoW1xuICAgICAgICAgICAgdXVpZFRvQnl0ZXMoYWNpc1tpXSksXG4gICAgICAgICAgICBCeXRlcy5mcm9tQmFzZTY0KGFjY2Vzc0tleXNbaV0pLFxuICAgICAgICAgIF0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZlcnNpb24gPSAxO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3QgPSBQcm90by5DRFNDbGllbnRSZXF1ZXN0LmVuY29kZSh7XG4gICAgICBuZXdFMTY0czogQnVmZmVyLmNvbmNhdChcbiAgICAgICAgZTE2NHMubWFwKGUxNjQgPT4ge1xuICAgICAgICAgIC8vIExvbmcuZnJvbVN0cmluZyBoYW5kbGVzIG51bWJlcnMgd2l0aCBvciB3aXRob3V0IGEgbGVhZGluZyAnKydcbiAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoTG9uZy5mcm9tU3RyaW5nKGUxNjQpLnRvQnl0ZXNCRSgpKTtcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICBhY2lVYWtQYWlyczogQnVmZmVyLmNvbmNhdChhY2lVYWtQYWlycyksXG4gICAgfSkuZmluaXNoKCk7XG5cbiAgICBsb2cuaW5mbyhgQ0RTU29ja2V0LnJlcXVlc3QoKTogc2VuZGluZyB2ZXJzaW9uPSR7dmVyc2lvbn0gcmVxdWVzdGApO1xuICAgIGF3YWl0IHRoaXMuc2VuZFJlcXVlc3QodmVyc2lvbiwgQnVmZmVyLmZyb20ocmVxdWVzdCkpO1xuXG4gICAgY29uc3QgcmVzdWx0TWFwOiBNYXA8c3RyaW5nLCBDRFNSZXNwb25zZUVudHJ5VHlwZT4gPSBuZXcgTWFwKCk7XG4gICAgbGV0IHJldHJ5QWZ0ZXJTZWNzOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICBjb25zdCB7IGRvbmUsIHZhbHVlOiBjaXBoZXJ0ZXh0IH0gPSBhd2FpdCB0aGlzLnNvY2tldEl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIGlmIChkb25lKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBDRFNTb2NrZXRTdGF0ZS5DbG9zZWQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IHRoaXMuZGVjcnlwdFJlc3BvbnNlKGNpcGhlcnRleHQpO1xuXG4gICAgICBsb2cuaW5mbygnQ0RTU29ja2V0LnJlcXVlc3QoKTogcHJvY2Vzc2luZyByZXNwb25zZSBtZXNzYWdlJyk7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gUHJvdG8uQ0RTQ2xpZW50UmVzcG9uc2UuZGVjb2RlKG1lc3NhZ2UpO1xuICAgICAgY29uc3QgbmV3UmV0cnlBZnRlclNlY3MgPSBkcm9wTnVsbChyZXNwb25zZS5yZXRyeUFmdGVyU2Vjcyk7XG5cbiAgICAgIGRlY29kZVNpbmdsZVJlc3BvbnNlKHJlc3VsdE1hcCwgcmVzcG9uc2UpO1xuXG4gICAgICBpZiAobmV3UmV0cnlBZnRlclNlY3MpIHtcbiAgICAgICAgcmV0cnlBZnRlclNlY3MgPSBNYXRoLm1heChuZXdSZXRyeUFmdGVyU2VjcywgcmV0cnlBZnRlclNlY3MgPz8gMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbG9nLmluZm8oJ0NEU1NvY2tldC5yZXF1ZXN0KCk6IGRvbmUnKTtcblxuICAgIHJldHVybiB7XG4gICAgICByZXNwb25zZTogcmVzdWx0TWFwLFxuICAgICAgcmV0cnlBZnRlclNlY3MsXG4gICAgfTtcbiAgfVxuXG4gIC8vIEFic3RyYWN0IG1ldGhvZHNcblxuICBwdWJsaWMgYWJzdHJhY3QgaGFuZHNoYWtlKCk6IFByb21pc2U8dm9pZD47XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IHNlbmRSZXF1ZXN0KHZlcnNpb246IG51bWJlciwgZGF0YTogQnVmZmVyKTogUHJvbWlzZTx2b2lkPjtcblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgZGVjcnlwdFJlc3BvbnNlKGNpcGhlcnRleHQ6IEJ1ZmZlcik6IFByb21pc2U8QnVmZmVyPjtcblxuICAvLyBFdmVudEVtaXR0ZXIgdHlwZXNcblxuICBwdWJsaWMgb3ZlcnJpZGUgb24oXG4gICAgdHlwZTogJ2Nsb3NlJyxcbiAgICBjYWxsYmFjazogKGNvZGU6IG51bWJlciwgcmVhc29uPzogc3RyaW5nKSA9PiB2b2lkXG4gICk6IHRoaXM7XG4gIHB1YmxpYyBvdmVycmlkZSBvbih0eXBlOiAnZXJyb3InLCBjYWxsYmFjazogKGVycm9yOiBFcnJvcikgPT4gdm9pZCk6IHRoaXM7XG5cbiAgcHVibGljIG92ZXJyaWRlIG9uKFxuICAgIHR5cGU6IHN0cmluZyB8IHN5bWJvbCxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGxpc3RlbmVyOiAoLi4uYXJnczogQXJyYXk8YW55PikgPT4gdm9pZFxuICApOiB0aGlzIHtcbiAgICByZXR1cm4gc3VwZXIub24odHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcHVibGljIG92ZXJyaWRlIGVtaXQodHlwZTogJ2Nsb3NlJywgY29kZTogbnVtYmVyLCByZWFzb24/OiBzdHJpbmcpOiBib29sZWFuO1xuICBwdWJsaWMgb3ZlcnJpZGUgZW1pdCh0eXBlOiAnZXJyb3InLCBlcnJvcjogRXJyb3IpOiBib29sZWFuO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIHB1YmxpYyBvdmVycmlkZSBlbWl0KHR5cGU6IHN0cmluZyB8IHN5bWJvbCwgLi4uYXJnczogQXJyYXk8YW55Pik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzdXBlci5lbWl0KHR5cGUsIC4uLmFyZ3MpO1xuICB9XG5cbiAgLy9cbiAgLy8gUHJpdmF0ZVxuICAvL1xuXG4gIHByaXZhdGUgaXRlcmF0ZVNvY2tldCgpOiBBc3luY0l0ZXJhdG9yPEJ1ZmZlcj4ge1xuICAgIGNvbnN0IHN0cmVhbSA9IG5ldyBSZWFkYWJsZSh7IHJlYWQ6IG5vb3AsIG9iamVjdE1vZGU6IHRydWUgfSk7XG5cbiAgICB0aGlzLnNvY2tldC5vbignbWVzc2FnZScsICh7IHR5cGUsIGJpbmFyeURhdGEgfSkgPT4ge1xuICAgICAgc3RyaWN0QXNzZXJ0KHR5cGUgPT09ICdiaW5hcnknLCAnSW52YWxpZCBDRFMgc29ja2V0IHBhY2tldCcpO1xuICAgICAgc3RyaWN0QXNzZXJ0KGJpbmFyeURhdGEsICdJbnZhbGlkIENEUyBzb2NrZXQgcGFja2V0Jyk7XG5cbiAgICAgIHN0cmVhbS5wdXNoKGJpbmFyeURhdGEpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zb2NrZXQub24oJ2Nsb3NlJywgKGNvZGUsIHJlYXNvbikgPT4ge1xuICAgICAgaWYgKGNvZGUgPT09IDEwMDApIHtcbiAgICAgICAgc3RyZWFtLnB1c2gobnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHJlYW0uZGVzdHJveShcbiAgICAgICAgICBuZXcgRXJyb3IoYFNvY2tldCBjbG9zZWQgd2l0aCBjb2RlICR7Y29kZX0gYW5kIHJlYXNvbiAke3JlYXNvbn1gKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc29ja2V0Lm9uKCdlcnJvcicsIChlcnJvcjogRXJyb3IpID0+IHN0cmVhbS5kZXN0cm95KGVycm9yKSk7XG5cbiAgICByZXR1cm4gc3RyZWFtW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlY29kZVNpbmdsZVJlc3BvbnNlKFxuICByZXN1bHRNYXA6IE1hcDxzdHJpbmcsIENEU1Jlc3BvbnNlRW50cnlUeXBlPixcbiAgcmVzcG9uc2U6IFByb3RvLkNEU0NsaWVudFJlc3BvbnNlXG4pOiB2b2lkIHtcbiAgZm9yIChcbiAgICBsZXQgaSA9IDA7XG4gICAgaSA8IHJlc3BvbnNlLmUxNjRQbmlBY2lUcmlwbGVzLmxlbmd0aDtcbiAgICBpICs9IFRSSVBMRV9CWVRFX1NJWkVcbiAgKSB7XG4gICAgY29uc3QgdHJpcGxlQnl0ZXMgPSByZXNwb25zZS5lMTY0UG5pQWNpVHJpcGxlcy5zbGljZShcbiAgICAgIGksXG4gICAgICBpICsgVFJJUExFX0JZVEVfU0laRVxuICAgICk7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgdHJpcGxlQnl0ZXMubGVuZ3RoID09PSBUUklQTEVfQllURV9TSVpFLFxuICAgICAgJ0ludmFsaWQgc2l6ZSBvZiBDRFMgcmVzcG9uc2UgdHJpcGxlJ1xuICAgICk7XG5cbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBjb25zdCBlMTY0Qnl0ZXMgPSB0cmlwbGVCeXRlcy5zbGljZShvZmZzZXQsIG9mZnNldCArIEUxNjRfQllURV9TSVpFKTtcbiAgICBvZmZzZXQgKz0gRTE2NF9CWVRFX1NJWkU7XG5cbiAgICBjb25zdCBwbmlCeXRlcyA9IHRyaXBsZUJ5dGVzLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgVVVJRF9CWVRFX1NJWkUpO1xuICAgIG9mZnNldCArPSBVVUlEX0JZVEVfU0laRTtcblxuICAgIGNvbnN0IGFjaUJ5dGVzID0gdHJpcGxlQnl0ZXMuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBVVUlEX0JZVEVfU0laRSk7XG4gICAgb2Zmc2V0ICs9IFVVSURfQllURV9TSVpFO1xuXG4gICAgY29uc3QgZTE2NExvbmcgPSBMb25nLmZyb21CeXRlc0JFKEFycmF5LmZyb20oZTE2NEJ5dGVzKSk7XG4gICAgaWYgKGUxNjRMb25nLmlzWmVybygpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBjb25zdCBlMTY0ID0gYCske2UxNjRMb25nLnRvU3RyaW5nKCl9YDtcbiAgICBjb25zdCBwbmkgPSBieXRlc1RvVXVpZChwbmlCeXRlcyk7XG4gICAgY29uc3QgYWNpID0gYnl0ZXNUb1V1aWQoYWNpQnl0ZXMpO1xuXG4gICAgcmVzdWx0TWFwLnNldChlMTY0LCB7IHBuaSwgYWNpIH0pO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBNkI7QUFDN0Isb0JBQXlCO0FBQ3pCLG9CQUFxQjtBQUVyQixrQkFBaUI7QUFHakIsb0JBQTZCO0FBQzdCLHNCQUF5QjtBQUN6QixrQkFBK0I7QUFDL0IsWUFBdUI7QUFDdkIsb0JBQXlDO0FBQ3pDLHNCQUF1QztBQWlCaEMsSUFBSyxpQkFBTCxrQkFBSyxvQkFBTDtBQUNMLDRCQUFPO0FBQ1AsaUNBQVk7QUFDWixtQ0FBYztBQUNkLDhCQUFTO0FBSkM7QUFBQTtBQU9aLE1BQU0saUJBQWlCO0FBQ3ZCLE1BQU0saUJBQWlCO0FBQ3ZCLE1BQU0sbUJBQW1CLDZCQUFpQixJQUFJO0FBRXZDLE1BQWUsc0JBRVosMkJBQWE7QUFBQSxFQVNyQixZQUErQixTQUFrQjtBQUMvQyxVQUFNO0FBRHVCO0FBUnJCLGlCQUFRO0FBWWhCLFNBQUssU0FBUyxRQUFRO0FBQ3RCLFNBQUssU0FBUyxRQUFRO0FBRXRCLFNBQUssaUJBQWlCLEtBQUssY0FBYztBQUFBLEVBQzNDO0FBQUEsUUFFYSxNQUFNLE1BQWMsUUFBK0I7QUFDOUQsV0FBTyxLQUFLLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFBQSxFQUN2QztBQUFBLFFBRWEsUUFBUTtBQUFBLElBQ25CO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxLQUN3RDtBQUN4RCxVQUFN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
