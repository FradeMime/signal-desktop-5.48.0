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
var CDSI_exports = {};
__export(CDSI_exports, {
  CDSI: () => CDSI
});
module.exports = __toCommonJS(CDSI_exports);
var Bytes = __toESM(require("../../Bytes"));
var import_CDSISocket = require("./CDSISocket");
var import_CDSSocketManagerBase = require("./CDSSocketManagerBase");
class CDSI extends import_CDSSocketManagerBase.CDSSocketManagerBase {
  constructor(options) {
    super(options);
    this.mrenclave = Buffer.from(Bytes.fromHex(options.mrenclave));
    this.trustedCaCert = Buffer.from(options.root);
  }
  getSocketUrl() {
    const { mrenclave } = this.options;
    return `${this.options.url}/v1/${mrenclave}/discovery`;
  }
  createSocket(socket) {
    return new import_CDSISocket.CDSISocket({
      logger: this.logger,
      socket,
      mrenclave: this.mrenclave,
      trustedCaCert: this.trustedCaCert
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CDSI
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ0RTSS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IGNvbm5lY3Rpb24gYXMgV2ViU29ja2V0IH0gZnJvbSAnd2Vic29ja2V0JztcblxuaW1wb3J0ICogYXMgQnl0ZXMgZnJvbSAnLi4vLi4vQnl0ZXMnO1xuaW1wb3J0IHsgQ0RTSVNvY2tldCB9IGZyb20gJy4vQ0RTSVNvY2tldCc7XG5pbXBvcnQgdHlwZSB7IENEU1NvY2tldE1hbmFnZXJCYXNlT3B0aW9uc1R5cGUgfSBmcm9tICcuL0NEU1NvY2tldE1hbmFnZXJCYXNlJztcbmltcG9ydCB7IENEU1NvY2tldE1hbmFnZXJCYXNlIH0gZnJvbSAnLi9DRFNTb2NrZXRNYW5hZ2VyQmFzZSc7XG5cbmV4cG9ydCB0eXBlIENEU0lPcHRpb25zVHlwZSA9IFJlYWRvbmx5PHtcbiAgbXJlbmNsYXZlOiBzdHJpbmc7XG4gIHJvb3Q6IHN0cmluZztcbn0+ICZcbiAgQ0RTU29ja2V0TWFuYWdlckJhc2VPcHRpb25zVHlwZTtcblxuZXhwb3J0IGNsYXNzIENEU0kgZXh0ZW5kcyBDRFNTb2NrZXRNYW5hZ2VyQmFzZTxDRFNJU29ja2V0LCBDRFNJT3B0aW9uc1R5cGU+IHtcbiAgcHJpdmF0ZSByZWFkb25seSBtcmVuY2xhdmU6IEJ1ZmZlcjtcblxuICBwcml2YXRlIHJlYWRvbmx5IHRydXN0ZWRDYUNlcnQ6IEJ1ZmZlcjtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBDRFNJT3B0aW9uc1R5cGUpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcblxuICAgIHRoaXMubXJlbmNsYXZlID0gQnVmZmVyLmZyb20oQnl0ZXMuZnJvbUhleChvcHRpb25zLm1yZW5jbGF2ZSkpO1xuICAgIHRoaXMudHJ1c3RlZENhQ2VydCA9IEJ1ZmZlci5mcm9tKG9wdGlvbnMucm9vdCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgZ2V0U29ja2V0VXJsKCk6IHN0cmluZyB7XG4gICAgY29uc3QgeyBtcmVuY2xhdmUgfSA9IHRoaXMub3B0aW9ucztcblxuICAgIHJldHVybiBgJHt0aGlzLm9wdGlvbnMudXJsfS92MS8ke21yZW5jbGF2ZX0vZGlzY292ZXJ5YDtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBjcmVhdGVTb2NrZXQoc29ja2V0OiBXZWJTb2NrZXQpOiBDRFNJU29ja2V0IHtcbiAgICByZXR1cm4gbmV3IENEU0lTb2NrZXQoe1xuICAgICAgbG9nZ2VyOiB0aGlzLmxvZ2dlcixcbiAgICAgIHNvY2tldCxcbiAgICAgIG1yZW5jbGF2ZTogdGhpcy5tcmVuY2xhdmUsXG4gICAgICB0cnVzdGVkQ2FDZXJ0OiB0aGlzLnRydXN0ZWRDYUNlcnQsXG4gICAgfSk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSxZQUF1QjtBQUN2Qix3QkFBMkI7QUFFM0Isa0NBQXFDO0FBUTlCLE1BQU0sYUFBYSxpREFBa0Q7QUFBQSxFQUsxRSxZQUFZLFNBQTBCO0FBQ3BDLFVBQU0sT0FBTztBQUViLFNBQUssWUFBWSxPQUFPLEtBQUssTUFBTSxRQUFRLFFBQVEsU0FBUyxDQUFDO0FBQzdELFNBQUssZ0JBQWdCLE9BQU8sS0FBSyxRQUFRLElBQUk7QUFBQSxFQUMvQztBQUFBLEVBRW1CLGVBQXVCO0FBQ3hDLFVBQU0sRUFBRSxjQUFjLEtBQUs7QUFFM0IsV0FBTyxHQUFHLEtBQUssUUFBUSxVQUFVO0FBQUEsRUFDbkM7QUFBQSxFQUVtQixhQUFhLFFBQStCO0FBQzdELFdBQU8sSUFBSSw2QkFBVztBQUFBLE1BQ3BCLFFBQVEsS0FBSztBQUFBLE1BQ2I7QUFBQSxNQUNBLFdBQVcsS0FBSztBQUFBLE1BQ2hCLGVBQWUsS0FBSztBQUFBLElBQ3RCLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUExQk8iLAogICJuYW1lcyI6IFtdCn0K
