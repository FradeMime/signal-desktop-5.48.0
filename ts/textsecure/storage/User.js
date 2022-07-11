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
var User_exports = {};
__export(User_exports, {
  User: () => User
});
module.exports = __toCommonJS(User_exports);
var import_assert = require("../../util/assert");
var import_UUID = require("../../types/UUID");
var log = __toESM(require("../../logging/log"));
var import_Helpers = __toESM(require("../Helpers"));
class User {
  constructor(storage) {
    this.storage = storage;
  }
  async setUuidAndDeviceId(uuid, deviceId) {
    await this.storage.put("uuid_id", `${uuid}.${deviceId}`);
    log.info("storage.user: uuid and device id changed");
  }
  async setNumber(number) {
    if (this.getNumber() === number) {
      return;
    }
    const deviceId = this.getDeviceId();
    (0, import_assert.strictAssert)(deviceId !== void 0, "Cannot update device number without knowing device id");
    log.info("storage.user: number changed");
    await Promise.all([
      this.storage.put("number_id", `${number}.${deviceId}`),
      this.storage.remove("senderCertificate")
    ]);
    window.Whisper.events.trigger("userChanged", true);
  }
  getNumber() {
    const numberId = this.storage.get("number_id");
    if (numberId === void 0)
      return void 0;
    return import_Helpers.default.unencodeNumber(numberId)[0];
  }
  getUuid(uuidKind = import_UUID.UUIDKind.ACI) {
    if (uuidKind === import_UUID.UUIDKind.PNI) {
      const pni = this.storage.get("pni");
      if (pni === void 0)
        return void 0;
      return new import_UUID.UUID(pni);
    }
    (0, import_assert.strictAssert)(uuidKind === import_UUID.UUIDKind.ACI, `Unsupported uuid kind: ${uuidKind}`);
    const uuid = this.storage.get("uuid_id");
    if (uuid === void 0)
      return void 0;
    return new import_UUID.UUID(import_Helpers.default.unencodeNumber(uuid.toLowerCase())[0]);
  }
  getCheckedUuid(uuidKind) {
    const uuid = this.getUuid(uuidKind);
    (0, import_assert.strictAssert)(uuid !== void 0, "Must have our own uuid");
    return uuid;
  }
  async setPni(pni) {
    await this.storage.put("pni", import_UUID.UUID.cast(pni));
  }
  getOurUuidKind(uuid) {
    const ourUuid = this.getUuid();
    if (ourUuid?.toString() === uuid.toString()) {
      return import_UUID.UUIDKind.ACI;
    }
    const pni = this.getUuid(import_UUID.UUIDKind.PNI);
    if (pni?.toString() === uuid.toString()) {
      return import_UUID.UUIDKind.PNI;
    }
    return import_UUID.UUIDKind.Unknown;
  }
  getDeviceId() {
    const value = this._getDeviceIdFromUuid() || this._getDeviceIdFromNumber();
    if (value === void 0) {
      return void 0;
    }
    return parseInt(value, 10);
  }
  getDeviceName() {
    return this.storage.get("device_name");
  }
  async setDeviceNameEncrypted() {
    return this.storage.put("deviceNameEncrypted", true);
  }
  getDeviceNameEncrypted() {
    return this.storage.get("deviceNameEncrypted");
  }
  async removeSignalingKey() {
    return this.storage.remove("signaling_key");
  }
  async setCredentials(credentials) {
    const { uuid, pni, number, deviceId, deviceName, password } = credentials;
    await Promise.all([
      this.storage.put("number_id", `${number}.${deviceId}`),
      this.storage.put("uuid_id", `${uuid}.${deviceId}`),
      this.storage.put("password", password),
      this.setPni(pni),
      deviceName ? this.storage.put("device_name", deviceName) : Promise.resolve()
    ]);
  }
  async removeCredentials() {
    log.info("storage.user: removeCredentials");
    await Promise.all([
      this.storage.remove("number_id"),
      this.storage.remove("uuid_id"),
      this.storage.remove("password"),
      this.storage.remove("device_name")
    ]);
  }
  getWebAPICredentials() {
    return {
      username: this.storage.get("uuid_id") || this.storage.get("number_id") || "",
      password: this.storage.get("password", "")
    };
  }
  _getDeviceIdFromUuid() {
    const uuid = this.storage.get("uuid_id");
    if (uuid === void 0)
      return void 0;
    return import_Helpers.default.unencodeNumber(uuid)[1];
  }
  _getDeviceIdFromNumber() {
    const numberId = this.storage.get("number_id");
    if (numberId === void 0)
      return void 0;
    return import_Helpers.default.unencodeNumber(numberId)[1];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  User
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVXNlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFdlYkFQSUNyZWRlbnRpYWxzIH0gZnJvbSAnLi4vVHlwZXMuZCc7XG5cbmltcG9ydCB7IHN0cmljdEFzc2VydCB9IGZyb20gJy4uLy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB0eXBlIHsgU3RvcmFnZUludGVyZmFjZSB9IGZyb20gJy4uLy4uL3R5cGVzL1N0b3JhZ2UuZCc7XG5pbXBvcnQgeyBVVUlELCBVVUlES2luZCB9IGZyb20gJy4uLy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uLy4uL2xvZ2dpbmcvbG9nJztcblxuaW1wb3J0IEhlbHBlcnMgZnJvbSAnLi4vSGVscGVycyc7XG5cbmV4cG9ydCB0eXBlIFNldENyZWRlbnRpYWxzT3B0aW9ucyA9IHtcbiAgdXVpZDogc3RyaW5nO1xuICBwbmk6IHN0cmluZztcbiAgbnVtYmVyOiBzdHJpbmc7XG4gIGRldmljZUlkOiBudW1iZXI7XG4gIGRldmljZU5hbWU/OiBzdHJpbmc7XG4gIHBhc3N3b3JkOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgVXNlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgc3RvcmFnZTogU3RvcmFnZUludGVyZmFjZSkge31cblxuICBwdWJsaWMgYXN5bmMgc2V0VXVpZEFuZERldmljZUlkKFxuICAgIHV1aWQ6IHN0cmluZyxcbiAgICBkZXZpY2VJZDogbnVtYmVyXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5wdXQoJ3V1aWRfaWQnLCBgJHt1dWlkfS4ke2RldmljZUlkfWApO1xuXG4gICAgbG9nLmluZm8oJ3N0b3JhZ2UudXNlcjogdXVpZCBhbmQgZGV2aWNlIGlkIGNoYW5nZWQnKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXROdW1iZXIobnVtYmVyOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5nZXROdW1iZXIoKSA9PT0gbnVtYmVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZGV2aWNlSWQgPSB0aGlzLmdldERldmljZUlkKCk7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgZGV2aWNlSWQgIT09IHVuZGVmaW5lZCxcbiAgICAgICdDYW5ub3QgdXBkYXRlIGRldmljZSBudW1iZXIgd2l0aG91dCBrbm93aW5nIGRldmljZSBpZCdcbiAgICApO1xuXG4gICAgbG9nLmluZm8oJ3N0b3JhZ2UudXNlcjogbnVtYmVyIGNoYW5nZWQnKTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuc3RvcmFnZS5wdXQoJ251bWJlcl9pZCcsIGAke251bWJlcn0uJHtkZXZpY2VJZH1gKSxcbiAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUoJ3NlbmRlckNlcnRpZmljYXRlJyksXG4gICAgXSk7XG5cbiAgICAvLyBOb3RpZnkgcmVkdXggYWJvdXQgcGhvbmUgbnVtYmVyIGNoYW5nZVxuICAgIHdpbmRvdy5XaGlzcGVyLmV2ZW50cy50cmlnZ2VyKCd1c2VyQ2hhbmdlZCcsIHRydWUpO1xuICB9XG5cbiAgcHVibGljIGdldE51bWJlcigpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IG51bWJlcklkID0gdGhpcy5zdG9yYWdlLmdldCgnbnVtYmVyX2lkJyk7XG4gICAgaWYgKG51bWJlcklkID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIEhlbHBlcnMudW5lbmNvZGVOdW1iZXIobnVtYmVySWQpWzBdO1xuICB9XG5cbiAgcHVibGljIGdldFV1aWQodXVpZEtpbmQgPSBVVUlES2luZC5BQ0kpOiBVVUlEIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodXVpZEtpbmQgPT09IFVVSURLaW5kLlBOSSkge1xuICAgICAgY29uc3QgcG5pID0gdGhpcy5zdG9yYWdlLmdldCgncG5pJyk7XG4gICAgICBpZiAocG5pID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICByZXR1cm4gbmV3IFVVSUQocG5pKTtcbiAgICB9XG5cbiAgICBzdHJpY3RBc3NlcnQoXG4gICAgICB1dWlkS2luZCA9PT0gVVVJREtpbmQuQUNJLFxuICAgICAgYFVuc3VwcG9ydGVkIHV1aWQga2luZDogJHt1dWlkS2luZH1gXG4gICAgKTtcbiAgICBjb25zdCB1dWlkID0gdGhpcy5zdG9yYWdlLmdldCgndXVpZF9pZCcpO1xuICAgIGlmICh1dWlkID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIG5ldyBVVUlEKEhlbHBlcnMudW5lbmNvZGVOdW1iZXIodXVpZC50b0xvd2VyQ2FzZSgpKVswXSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q2hlY2tlZFV1aWQodXVpZEtpbmQ/OiBVVUlES2luZCk6IFVVSUQge1xuICAgIGNvbnN0IHV1aWQgPSB0aGlzLmdldFV1aWQodXVpZEtpbmQpO1xuICAgIHN0cmljdEFzc2VydCh1dWlkICE9PSB1bmRlZmluZWQsICdNdXN0IGhhdmUgb3VyIG93biB1dWlkJyk7XG4gICAgcmV0dXJuIHV1aWQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0UG5pKHBuaTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5zdG9yYWdlLnB1dCgncG5pJywgVVVJRC5jYXN0KHBuaSkpO1xuICB9XG5cbiAgcHVibGljIGdldE91clV1aWRLaW5kKHV1aWQ6IFVVSUQpOiBVVUlES2luZCB7XG4gICAgY29uc3Qgb3VyVXVpZCA9IHRoaXMuZ2V0VXVpZCgpO1xuXG4gICAgaWYgKG91clV1aWQ/LnRvU3RyaW5nKCkgPT09IHV1aWQudG9TdHJpbmcoKSkge1xuICAgICAgcmV0dXJuIFVVSURLaW5kLkFDSTtcbiAgICB9XG5cbiAgICBjb25zdCBwbmkgPSB0aGlzLmdldFV1aWQoVVVJREtpbmQuUE5JKTtcbiAgICBpZiAocG5pPy50b1N0cmluZygpID09PSB1dWlkLnRvU3RyaW5nKCkpIHtcbiAgICAgIHJldHVybiBVVUlES2luZC5QTkk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFVVSURLaW5kLlVua25vd247XG4gIH1cblxuICBwdWJsaWMgZ2V0RGV2aWNlSWQoKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2dldERldmljZUlkRnJvbVV1aWQoKSB8fCB0aGlzLl9nZXREZXZpY2VJZEZyb21OdW1iZXIoKTtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0RGV2aWNlTmFtZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0KCdkZXZpY2VfbmFtZScpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldERldmljZU5hbWVFbmNyeXB0ZWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5wdXQoJ2RldmljZU5hbWVFbmNyeXB0ZWQnLCB0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXREZXZpY2VOYW1lRW5jcnlwdGVkKCk6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0KCdkZXZpY2VOYW1lRW5jcnlwdGVkJyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVtb3ZlU2lnbmFsaW5nS2V5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UucmVtb3ZlKCdzaWduYWxpbmdfa2V5Jyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0Q3JlZGVudGlhbHMoXG4gICAgY3JlZGVudGlhbHM6IFNldENyZWRlbnRpYWxzT3B0aW9uc1xuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IHV1aWQsIHBuaSwgbnVtYmVyLCBkZXZpY2VJZCwgZGV2aWNlTmFtZSwgcGFzc3dvcmQgfSA9IGNyZWRlbnRpYWxzO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5zdG9yYWdlLnB1dCgnbnVtYmVyX2lkJywgYCR7bnVtYmVyfS4ke2RldmljZUlkfWApLFxuICAgICAgdGhpcy5zdG9yYWdlLnB1dCgndXVpZF9pZCcsIGAke3V1aWR9LiR7ZGV2aWNlSWR9YCksXG4gICAgICB0aGlzLnN0b3JhZ2UucHV0KCdwYXNzd29yZCcsIHBhc3N3b3JkKSxcbiAgICAgIHRoaXMuc2V0UG5pKHBuaSksXG4gICAgICBkZXZpY2VOYW1lXG4gICAgICAgID8gdGhpcy5zdG9yYWdlLnB1dCgnZGV2aWNlX25hbWUnLCBkZXZpY2VOYW1lKVxuICAgICAgICA6IFByb21pc2UucmVzb2x2ZSgpLFxuICAgIF0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlbW92ZUNyZWRlbnRpYWxzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5pbmZvKCdzdG9yYWdlLnVzZXI6IHJlbW92ZUNyZWRlbnRpYWxzJyk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKCdudW1iZXJfaWQnKSxcbiAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUoJ3V1aWRfaWQnKSxcbiAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUoJ3Bhc3N3b3JkJyksXG4gICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKCdkZXZpY2VfbmFtZScpLFxuICAgIF0pO1xuICB9XG5cbiAgcHVibGljIGdldFdlYkFQSUNyZWRlbnRpYWxzKCk6IFdlYkFQSUNyZWRlbnRpYWxzIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXNlcm5hbWU6XG4gICAgICAgIHRoaXMuc3RvcmFnZS5nZXQoJ3V1aWRfaWQnKSB8fCB0aGlzLnN0b3JhZ2UuZ2V0KCdudW1iZXJfaWQnKSB8fCAnJyxcbiAgICAgIHBhc3N3b3JkOiB0aGlzLnN0b3JhZ2UuZ2V0KCdwYXNzd29yZCcsICcnKSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0RGV2aWNlSWRGcm9tVXVpZCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHV1aWQgPSB0aGlzLnN0b3JhZ2UuZ2V0KCd1dWlkX2lkJyk7XG4gICAgaWYgKHV1aWQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gSGVscGVycy51bmVuY29kZU51bWJlcih1dWlkKVsxXTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldERldmljZUlkRnJvbU51bWJlcigpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IG51bWJlcklkID0gdGhpcy5zdG9yYWdlLmdldCgnbnVtYmVyX2lkJyk7XG4gICAgaWYgKG51bWJlcklkID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIEhlbHBlcnMudW5lbmNvZGVOdW1iZXIobnVtYmVySWQpWzFdO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0Esb0JBQTZCO0FBRTdCLGtCQUErQjtBQUMvQixVQUFxQjtBQUVyQixxQkFBb0I7QUFXYixNQUFNLEtBQUs7QUFBQSxFQUNoQixZQUE2QixTQUEyQjtBQUEzQjtBQUFBLEVBQTRCO0FBQUEsUUFFNUMsbUJBQ1gsTUFDQSxVQUNlO0FBQ2YsVUFBTSxLQUFLLFFBQVEsSUFBSSxXQUFXLEdBQUcsUUFBUSxVQUFVO0FBRXZELFFBQUksS0FBSywwQ0FBMEM7QUFBQSxFQUNyRDtBQUFBLFFBRWEsVUFBVSxRQUErQjtBQUNwRCxRQUFJLEtBQUssVUFBVSxNQUFNLFFBQVE7QUFDL0I7QUFBQSxJQUNGO0FBRUEsVUFBTSxXQUFXLEtB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
