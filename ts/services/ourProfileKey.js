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
var ourProfileKey_exports = {};
__export(ourProfileKey_exports, {
  OurProfileKeyService: () => OurProfileKeyService,
  ourProfileKeyService: () => ourProfileKeyService
});
module.exports = __toCommonJS(ourProfileKey_exports);
var import_assert = require("../util/assert");
var log = __toESM(require("../logging/log"));
class OurProfileKeyService {
  constructor() {
    this.promisesBlockingGet = [];
  }
  initialize(storage) {
    log.info("Our profile key service: initializing");
    const storageReadyPromise = new Promise((resolve) => {
      storage.onready(() => {
        resolve();
      });
    });
    this.promisesBlockingGet = [storageReadyPromise];
    this.storage = storage;
  }
  get() {
    if (this.getPromise) {
      log.info("Our profile key service: was already fetching. Piggybacking off of that");
    } else {
      log.info("Our profile key service: kicking off a new fetch");
      this.getPromise = this.doGet();
    }
    return this.getPromise;
  }
  async set(newValue) {
    log.info("Our profile key service: updating profile key");
    (0, import_assert.assert)(this.storage, "OurProfileKeyService was not initialized");
    if (newValue) {
      await this.storage.put("profileKey", newValue);
    } else {
      await this.storage.remove("profileKey");
    }
  }
  blockGetWithPromise(promise) {
    this.promisesBlockingGet.push(promise);
  }
  async doGet() {
    log.info(`Our profile key service: waiting for ${this.promisesBlockingGet.length} promises before fetching`);
    await Promise.allSettled(this.promisesBlockingGet);
    this.promisesBlockingGet = [];
    delete this.getPromise;
    (0, import_assert.assert)(this.storage, "OurProfileKeyService was not initialized");
    log.info("Our profile key service: fetching profile key from storage");
    const result = this.storage.get("profileKey");
    if (result === void 0 || result instanceof Uint8Array) {
      return result;
    }
    (0, import_assert.assert)(false, "Profile key in storage was defined, but not an Uint8Array. Returning undefined");
    return void 0;
  }
}
const ourProfileKeyService = new OurProfileKeyService();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OurProfileKeyService,
  ourProfileKeyService
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsib3VyUHJvZmlsZUtleS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuXG5pbXBvcnQgdHlwZSB7IFN0b3JhZ2VJbnRlcmZhY2UgfSBmcm9tICcuLi90eXBlcy9TdG9yYWdlLmQnO1xuXG5leHBvcnQgY2xhc3MgT3VyUHJvZmlsZUtleVNlcnZpY2Uge1xuICBwcml2YXRlIGdldFByb21pc2U6IHVuZGVmaW5lZCB8IFByb21pc2U8dW5kZWZpbmVkIHwgVWludDhBcnJheT47XG5cbiAgcHJpdmF0ZSBwcm9taXNlc0Jsb2NraW5nR2V0OiBBcnJheTxQcm9taXNlPHVua25vd24+PiA9IFtdO1xuXG4gIHByaXZhdGUgc3RvcmFnZT86IFN0b3JhZ2VJbnRlcmZhY2U7XG5cbiAgaW5pdGlhbGl6ZShzdG9yYWdlOiBTdG9yYWdlSW50ZXJmYWNlKTogdm9pZCB7XG4gICAgbG9nLmluZm8oJ091ciBwcm9maWxlIGtleSBzZXJ2aWNlOiBpbml0aWFsaXppbmcnKTtcblxuICAgIGNvbnN0IHN0b3JhZ2VSZWFkeVByb21pc2UgPSBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICAgIHN0b3JhZ2Uub25yZWFkeSgoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMucHJvbWlzZXNCbG9ja2luZ0dldCA9IFtzdG9yYWdlUmVhZHlQcm9taXNlXTtcblxuICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XG4gIH1cblxuICBnZXQoKTogUHJvbWlzZTx1bmRlZmluZWQgfCBVaW50OEFycmF5PiB7XG4gICAgaWYgKHRoaXMuZ2V0UHJvbWlzZSkge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgICdPdXIgcHJvZmlsZSBrZXkgc2VydmljZTogd2FzIGFscmVhZHkgZmV0Y2hpbmcuIFBpZ2d5YmFja2luZyBvZmYgb2YgdGhhdCdcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy5pbmZvKCdPdXIgcHJvZmlsZSBrZXkgc2VydmljZToga2lja2luZyBvZmYgYSBuZXcgZmV0Y2gnKTtcbiAgICAgIHRoaXMuZ2V0UHJvbWlzZSA9IHRoaXMuZG9HZXQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0UHJvbWlzZTtcbiAgfVxuXG4gIGFzeW5jIHNldChuZXdWYWx1ZTogdW5kZWZpbmVkIHwgVWludDhBcnJheSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5pbmZvKCdPdXIgcHJvZmlsZSBrZXkgc2VydmljZTogdXBkYXRpbmcgcHJvZmlsZSBrZXknKTtcbiAgICBhc3NlcnQodGhpcy5zdG9yYWdlLCAnT3VyUHJvZmlsZUtleVNlcnZpY2Ugd2FzIG5vdCBpbml0aWFsaXplZCcpO1xuICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlLnB1dCgncHJvZmlsZUtleScsIG5ld1ZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlLnJlbW92ZSgncHJvZmlsZUtleScpO1xuICAgIH1cbiAgfVxuXG4gIGJsb2NrR2V0V2l0aFByb21pc2UocHJvbWlzZTogUHJvbWlzZTx1bmtub3duPik6IHZvaWQge1xuICAgIHRoaXMucHJvbWlzZXNCbG9ja2luZ0dldC5wdXNoKHByb21pc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBkb0dldCgpOiBQcm9taXNlPHVuZGVmaW5lZCB8IFVpbnQ4QXJyYXk+IHtcbiAgICBsb2cuaW5mbyhcbiAgICAgIGBPdXIgcHJvZmlsZSBrZXkgc2VydmljZTogd2FpdGluZyBmb3IgJHt0aGlzLnByb21pc2VzQmxvY2tpbmdHZXQubGVuZ3RofSBwcm9taXNlcyBiZWZvcmUgZmV0Y2hpbmdgXG4gICAgKTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZCh0aGlzLnByb21pc2VzQmxvY2tpbmdHZXQpO1xuICAgIHRoaXMucHJvbWlzZXNCbG9ja2luZ0dldCA9IFtdO1xuXG4gICAgZGVsZXRlIHRoaXMuZ2V0UHJvbWlzZTtcblxuICAgIGFzc2VydCh0aGlzLnN0b3JhZ2UsICdPdXJQcm9maWxlS2V5U2VydmljZSB3YXMgbm90IGluaXRpYWxpemVkJyk7XG5cbiAgICBsb2cuaW5mbygnT3VyIHByb2ZpbGUga2V5IHNlcnZpY2U6IGZldGNoaW5nIHByb2ZpbGUga2V5IGZyb20gc3RvcmFnZScpO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc3RvcmFnZS5nZXQoJ3Byb2ZpbGVLZXknKTtcbiAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQgfHwgcmVzdWx0IGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBhc3NlcnQoXG4gICAgICBmYWxzZSxcbiAgICAgICdQcm9maWxlIGtleSBpbiBzdG9yYWdlIHdhcyBkZWZpbmVkLCBidXQgbm90IGFuIFVpbnQ4QXJyYXkuIFJldHVybmluZyB1bmRlZmluZWQnXG4gICAgKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBvdXJQcm9maWxlS2V5U2VydmljZSA9IG5ldyBPdXJQcm9maWxlS2V5U2VydmljZSgpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXVCO0FBQ3ZCLFVBQXFCO0FBSWQsTUFBTSxxQkFBcUI7QUFBQSxFQUEzQjtBQUdHLCtCQUErQyxDQUFDO0FBQUE7QUFBQSxFQUl4RCxXQUFXLFNBQWlDO0FBQzFDLFFBQUksS0FBSyx1Q0FBdUM7QUFFaEQsVUFBTSxzQkFBc0IsSUFBSSxRQUFjLGFBQVc7QUFDdkQsY0FBUSxRQUFRLE1BQU07QUFDcEIsZ0JBQVE7QUFBQSxNQUNWLENBQUM7QUFBQSxJQUNILENBQUM7QUFDRCxTQUFLLHNCQUFzQixDQUFDLG1CQUFtQjtBQUUvQyxTQUFLLFVBQVU7QUFBQSxFQUNqQjtBQUFBLEVBRUEsTUFBdUM7QUFDckMsUUFBSSxLQUFLLFlBQVk7QUFDbkIsVUFBSSxLQUNGLHlFQUNGO0FBQUEsSUFDRixPQUFPO0FBQ0wsVUFBSSxLQUFLLGtEQUFrRDtBQUMzRCxXQUFLLGFBQWEsS0FBSyxNQUFNO0FBQUEsSUFDL0I7QUFDQSxXQUFPLEtBQUs7QUFBQSxFQUNkO0FBQUEsUUFFTSxJQUFJLFVBQWlEO0FBQ3pELFFBQUksS0FBSywrQ0FBK0M7QUFDeEQsOEJBQU8sS0FBSyxTQUFTLDBDQUEwQztBQUMvRCxRQUFJLFVBQVU7QUFDWixZQUFNLEtBQUssUUFBUSxJQUFJLGNBQWMsUUFBUTtBQUFBLElBQy9DLE9BQU87QUFDTCxZQUFNLEtBQUssUUFBUSxPQUFPLFlBQVk7QUFBQSxJQUN4QztBQUFBLEVBQ0Y7QUFBQSxFQUVBLG9CQUFvQixTQUFpQztBQUNuRCxTQUFLLG9CQUFvQixLQUFLLE9BQU87QUFBQSxFQUN2QztBQUFBLFFBRWMsUUFBeUM7QUFDckQsUUFBSSxLQUNGLHdDQUF3QyxLQUFLLG9CQUFvQixpQ0FDbkU7QUFFQSxVQUFNLFFBQVEsV0FBVyxLQUFLLG1CQUFtQjtBQUNqRCxTQUFLLHNCQUFzQixDQUFDO0FBRTVCLFdBQU8sS0FBSztBQUVaLDhCQUFPLEtBQUssU0FBUywwQ0FBMEM7QUFFL0QsUUFBSSxLQUFLLDREQUE0RDtBQUNyRSxVQUFNLFNBQVMsS0FBSyxRQUFRLElBQUksWUFBWTtBQUM1QyxRQUFJLFdBQVcsVUFBYSxrQkFBa0IsWUFBWTtBQUN4RCxhQUFPO0FBQUEsSUFDVDtBQUVBLDhCQUNFLE9BQ0EsZ0ZBQ0Y7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUNGO0FBdEVPLEFBd0VBLE1BQU0sdUJBQXVCLElBQUkscUJBQXFCOyIsCiAgIm5hbWVzIjogW10KfQo=
