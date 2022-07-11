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
var CDSH_exports = {};
__export(CDSH_exports, {
  CDSH: () => CDSH
});
module.exports = __toCommonJS(CDSH_exports);
var import_libsignal_client = require("@signalapp/libsignal-client");
var Bytes = __toESM(require("../../Bytes"));
var import_CDSHSocket = require("./CDSHSocket");
var import_CDSSocketManagerBase = require("./CDSSocketManagerBase");
class CDSH extends import_CDSSocketManagerBase.CDSSocketManagerBase {
  constructor(options) {
    super(options);
    this.publicKey = Buffer.from(Bytes.fromHex(options.publicKey));
    this.codeHashes = options.codeHashes.map((hash) => Buffer.from(Bytes.fromHex(hash)));
  }
  getSocketUrl() {
    const { publicKey: publicKeyHex, codeHashes } = this.options;
    return `${this.options.url}/discovery/${publicKeyHex}/${codeHashes.join(",")}`;
  }
  createSocket(socket) {
    const enclaveClient = import_libsignal_client.HsmEnclaveClient.new(this.publicKey, this.codeHashes);
    return new import_CDSHSocket.CDSHSocket({
      logger: this.logger,
      socket,
      enclaveClient
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CDSH
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ0RTSC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IEhzbUVuY2xhdmVDbGllbnQgfSBmcm9tICdAc2lnbmFsYXBwL2xpYnNpZ25hbC1jbGllbnQnO1xuaW1wb3J0IHR5cGUgeyBjb25uZWN0aW9uIGFzIFdlYlNvY2tldCB9IGZyb20gJ3dlYnNvY2tldCc7XG5cbmltcG9ydCAqIGFzIEJ5dGVzIGZyb20gJy4uLy4uL0J5dGVzJztcbmltcG9ydCB7IENEU0hTb2NrZXQgfSBmcm9tICcuL0NEU0hTb2NrZXQnO1xuaW1wb3J0IHR5cGUgeyBDRFNTb2NrZXRNYW5hZ2VyQmFzZU9wdGlvbnNUeXBlIH0gZnJvbSAnLi9DRFNTb2NrZXRNYW5hZ2VyQmFzZSc7XG5pbXBvcnQgeyBDRFNTb2NrZXRNYW5hZ2VyQmFzZSB9IGZyb20gJy4vQ0RTU29ja2V0TWFuYWdlckJhc2UnO1xuXG5leHBvcnQgdHlwZSBDRFNIT3B0aW9uc1R5cGUgPSBSZWFkb25seTx7XG4gIHB1YmxpY0tleTogc3RyaW5nO1xuICBjb2RlSGFzaGVzOiBSZWFkb25seUFycmF5PHN0cmluZz47XG59PiAmXG4gIENEU1NvY2tldE1hbmFnZXJCYXNlT3B0aW9uc1R5cGU7XG5cbmV4cG9ydCBjbGFzcyBDRFNIIGV4dGVuZHMgQ0RTU29ja2V0TWFuYWdlckJhc2U8Q0RTSFNvY2tldCwgQ0RTSE9wdGlvbnNUeXBlPiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgcHVibGljS2V5OiBCdWZmZXI7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBjb2RlSGFzaGVzOiBBcnJheTxCdWZmZXI+O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IENEU0hPcHRpb25zVHlwZSkge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgdGhpcy5wdWJsaWNLZXkgPSBCdWZmZXIuZnJvbShCeXRlcy5mcm9tSGV4KG9wdGlvbnMucHVibGljS2V5KSk7XG4gICAgdGhpcy5jb2RlSGFzaGVzID0gb3B0aW9ucy5jb2RlSGFzaGVzLm1hcChoYXNoID0+XG4gICAgICBCdWZmZXIuZnJvbShCeXRlcy5mcm9tSGV4KGhhc2gpKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgZ2V0U29ja2V0VXJsKCk6IHN0cmluZyB7XG4gICAgY29uc3QgeyBwdWJsaWNLZXk6IHB1YmxpY0tleUhleCwgY29kZUhhc2hlcyB9ID0gdGhpcy5vcHRpb25zO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIGAke3RoaXMub3B0aW9ucy51cmx9L2Rpc2NvdmVyeS8ke3B1YmxpY0tleUhleH0vYCArXG4gICAgICBgJHtjb2RlSGFzaGVzLmpvaW4oJywnKX1gXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBjcmVhdGVTb2NrZXQoc29ja2V0OiBXZWJTb2NrZXQpOiBDRFNIU29ja2V0IHtcbiAgICBjb25zdCBlbmNsYXZlQ2xpZW50ID0gSHNtRW5jbGF2ZUNsaWVudC5uZXcodGhpcy5wdWJsaWNLZXksIHRoaXMuY29kZUhhc2hlcyk7XG5cbiAgICByZXR1cm4gbmV3IENEU0hTb2NrZXQoe1xuICAgICAgbG9nZ2VyOiB0aGlzLmxvZ2dlcixcbiAgICAgIHNvY2tldCxcbiAgICAgIGVuY2xhdmVDbGllbnQsXG4gICAgfSk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSw4QkFBaUM7QUFHakMsWUFBdUI7QUFDdkIsd0JBQTJCO0FBRTNCLGtDQUFxQztBQVE5QixNQUFNLGFBQWEsaURBQWtEO0FBQUEsRUFLMUUsWUFBWSxTQUEwQjtBQUNwQyxVQUFNLE9BQU87QUFFYixTQUFLLFlBQVksT0FBTyxLQUFLLE1BQU0sUUFBUSxRQUFRLFNBQVMsQ0FBQztBQUM3RCxTQUFLLGFBQWEsUUFBUSxXQUFXLElBQUksVUFDdkMsT0FBTyxLQUFLLE1BQU0sUUFBUSxJQUFJLENBQUMsQ0FDakM7QUFBQSxFQUNGO0FBQUEsRUFFbUIsZUFBdUI7QUFDeEMsVUFBTSxFQUFFLFdBQVcsY0FBYyxlQUFlLEtBQUs7QUFFckQsV0FDRSxHQUFHLEtBQUssUUFBUSxpQkFBaUIsZ0JBQzlCLFdBQVcsS0FBSyxHQUFHO0FBQUEsRUFFMUI7QUFBQSxFQUVtQixhQUFhLFFBQStCO0FBQzdELFVBQU0sZ0JBQWdCLHlDQUFpQixJQUFJLEtBQUssV0FBVyxLQUFLLFVBQVU7QUFFMUUsV0FBTyxJQUFJLDZCQUFXO0FBQUEsTUFDcEIsUUFBUSxLQUFLO0FBQUEsTUFDYjtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUFoQ08iLAogICJuYW1lcyI6IFtdCn0K
