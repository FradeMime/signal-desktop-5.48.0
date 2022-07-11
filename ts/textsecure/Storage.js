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
var Storage_exports = {};
__export(Storage_exports, {
  Storage: () => Storage
});
module.exports = __toCommonJS(Storage_exports);
var import_User = require("./storage/User");
var import_Blocked = require("./storage/Blocked");
var import_assert = require("../util/assert");
var import_Client = __toESM(require("../sql/Client"));
var log = __toESM(require("../logging/log"));
class Storage {
  constructor() {
    this.ready = false;
    this.readyCallbacks = [];
    this.items = /* @__PURE__ */ Object.create(null);
    this.user = new import_User.User(this);
    this.blocked = new import_Blocked.Blocked(this);
    window.storage = this;
  }
  get protocol() {
    (0, import_assert.assert)(this.privProtocol !== void 0, "SignalProtocolStore not initialized");
    return this.privProtocol;
  }
  set protocol(value) {
    this.privProtocol = value;
  }
  get(key, defaultValue) {
    if (!this.ready) {
      log.warn("Called storage.get before storage is ready. key:", key);
    }
    const item = this.items[key];
    if (item === void 0) {
      return defaultValue;
    }
    return item;
  }
  async put(key, value) {
    if (!this.ready) {
      log.warn("Called storage.put before storage is ready. key:", key);
    }
    this.items[key] = value;
    await window.Signal.Data.createOrUpdateItem({ id: key, value });
    window.reduxActions?.items.putItemExternal(key, value);
  }
  async remove(key) {
    if (!this.ready) {
      log.warn("Called storage.remove before storage is ready. key:", key);
    }
    delete this.items[key];
    await import_Client.default.removeItemById(key);
    window.reduxActions?.items.removeItemExternal(key);
  }
  onready(callback) {
    if (this.ready) {
      callback();
    } else {
      this.readyCallbacks.push(callback);
    }
  }
  async fetch() {
    this.reset();
    Object.assign(this.items, await import_Client.default.getAllItems());
    this.ready = true;
    this.callListeners();
  }
  reset() {
    this.ready = false;
    this.items = /* @__PURE__ */ Object.create(null);
  }
  getItemsState() {
    const state = /* @__PURE__ */ Object.create(null);
    const { items } = this;
    const allKeys = Object.keys(items);
    for (const key of allKeys) {
      state[key] = items[key];
    }
    return state;
  }
  callListeners() {
    if (!this.ready) {
      return;
    }
    const callbacks = this.readyCallbacks;
    this.readyCallbacks = [];
    callbacks.forEach((callback) => callback());
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Storage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RvcmFnZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHtcbiAgU3RvcmFnZUFjY2Vzc1R5cGUgYXMgQWNjZXNzLFxuICBTdG9yYWdlSW50ZXJmYWNlLFxufSBmcm9tICcuLi90eXBlcy9TdG9yYWdlLmQnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vc3RvcmFnZS9Vc2VyJztcbmltcG9ydCB7IEJsb2NrZWQgfSBmcm9tICcuL3N0b3JhZ2UvQmxvY2tlZCc7XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCBEYXRhIGZyb20gJy4uL3NxbC9DbGllbnQnO1xuaW1wb3J0IHR5cGUgeyBTaWduYWxQcm90b2NvbFN0b3JlIH0gZnJvbSAnLi4vU2lnbmFsUHJvdG9jb2xTdG9yZSc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuXG5leHBvcnQgY2xhc3MgU3RvcmFnZSBpbXBsZW1lbnRzIFN0b3JhZ2VJbnRlcmZhY2Uge1xuICBwdWJsaWMgcmVhZG9ubHkgdXNlcjogVXNlcjtcblxuICBwdWJsaWMgcmVhZG9ubHkgYmxvY2tlZDogQmxvY2tlZDtcblxuICBwcml2YXRlIHJlYWR5ID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSByZWFkeUNhbGxiYWNrczogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcblxuICBwcml2YXRlIGl0ZW1zOiBQYXJ0aWFsPEFjY2Vzcz4gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIHByaXZhdGUgcHJpdlByb3RvY29sOiBTaWduYWxQcm90b2NvbFN0b3JlIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudXNlciA9IG5ldyBVc2VyKHRoaXMpO1xuICAgIHRoaXMuYmxvY2tlZCA9IG5ldyBCbG9ja2VkKHRoaXMpO1xuXG4gICAgd2luZG93LnN0b3JhZ2UgPSB0aGlzO1xuICB9XG5cbiAgZ2V0IHByb3RvY29sKCk6IFNpZ25hbFByb3RvY29sU3RvcmUge1xuICAgIGFzc2VydChcbiAgICAgIHRoaXMucHJpdlByb3RvY29sICE9PSB1bmRlZmluZWQsXG4gICAgICAnU2lnbmFsUHJvdG9jb2xTdG9yZSBub3QgaW5pdGlhbGl6ZWQnXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy5wcml2UHJvdG9jb2w7XG4gIH1cblxuICBzZXQgcHJvdG9jb2wodmFsdWU6IFNpZ25hbFByb3RvY29sU3RvcmUpIHtcbiAgICB0aGlzLnByaXZQcm90b2NvbCA9IHZhbHVlO1xuICB9XG5cbiAgLy8gYFN0b3JhZ2VJbnRlcmZhY2VgIGltcGxlbWVudGF0aW9uXG5cbiAgcHVibGljIGdldDxLIGV4dGVuZHMga2V5b2YgQWNjZXNzLCBWIGV4dGVuZHMgQWNjZXNzW0tdPihcbiAgICBrZXk6IEtcbiAgKTogViB8IHVuZGVmaW5lZDtcblxuICBwdWJsaWMgZ2V0PEsgZXh0ZW5kcyBrZXlvZiBBY2Nlc3MsIFYgZXh0ZW5kcyBBY2Nlc3NbS10+KFxuICAgIGtleTogSyxcbiAgICBkZWZhdWx0VmFsdWU6IFZcbiAgKTogVjtcblxuICBwdWJsaWMgZ2V0PEsgZXh0ZW5kcyBrZXlvZiBBY2Nlc3MsIFYgZXh0ZW5kcyBBY2Nlc3NbS10+KFxuICAgIGtleTogSyxcbiAgICBkZWZhdWx0VmFsdWU/OiBWXG4gICk6IFYgfCB1bmRlZmluZWQge1xuICAgIGlmICghdGhpcy5yZWFkeSkge1xuICAgICAgbG9nLndhcm4oJ0NhbGxlZCBzdG9yYWdlLmdldCBiZWZvcmUgc3RvcmFnZSBpcyByZWFkeS4ga2V5OicsIGtleSk7XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXNba2V5XTtcbiAgICBpZiAoaXRlbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtIGFzIFY7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHV0PEsgZXh0ZW5kcyBrZXlvZiBBY2Nlc3M+KFxuICAgIGtleTogSyxcbiAgICB2YWx1ZTogQWNjZXNzW0tdXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy5yZWFkeSkge1xuICAgICAgbG9nLndhcm4oJ0NhbGxlZCBzdG9yYWdlLnB1dCBiZWZvcmUgc3RvcmFnZSBpcyByZWFkeS4ga2V5OicsIGtleSk7XG4gICAgfVxuXG4gICAgdGhpcy5pdGVtc1trZXldID0gdmFsdWU7XG4gICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmNyZWF0ZU9yVXBkYXRlSXRlbSh7IGlkOiBrZXksIHZhbHVlIH0pO1xuXG4gICAgd2luZG93LnJlZHV4QWN0aW9ucz8uaXRlbXMucHV0SXRlbUV4dGVybmFsKGtleSwgdmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlbW92ZTxLIGV4dGVuZHMga2V5b2YgQWNjZXNzPihrZXk6IEspOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMucmVhZHkpIHtcbiAgICAgIGxvZy53YXJuKCdDYWxsZWQgc3RvcmFnZS5yZW1vdmUgYmVmb3JlIHN0b3JhZ2UgaXMgcmVhZHkuIGtleTonLCBrZXkpO1xuICAgIH1cblxuICAgIGRlbGV0ZSB0aGlzLml0ZW1zW2tleV07XG4gICAgYXdhaXQgRGF0YS5yZW1vdmVJdGVtQnlJZChrZXkpO1xuXG4gICAgd2luZG93LnJlZHV4QWN0aW9ucz8uaXRlbXMucmVtb3ZlSXRlbUV4dGVybmFsKGtleSk7XG4gIH1cblxuICAvLyBSZWd1bGFyIG1ldGhvZHNcblxuICBwdWJsaWMgb25yZWFkeShjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlYWR5KSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlYWR5Q2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBmZXRjaCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMuaXRlbXMsIGF3YWl0IERhdGEuZ2V0QWxsSXRlbXMoKSk7XG5cbiAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICB0aGlzLmNhbGxMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgdGhpcy5pdGVtcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0SXRlbXNTdGF0ZSgpOiBQYXJ0aWFsPEFjY2Vzcz4ge1xuICAgIGNvbnN0IHN0YXRlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIC8vIFR5cGVTY3JpcHQgaXNuJ3Qgc21hcnQgZW5vdWdoIHRvIGZpZ3VyZSBvdXQgdGhlIHR5cGVzIGF1dG9tYXRpY2FsbHkuXG4gICAgY29uc3QgeyBpdGVtcyB9ID0gdGhpcztcbiAgICBjb25zdCBhbGxLZXlzID0gT2JqZWN0LmtleXMoaXRlbXMpIGFzIEFycmF5PGtleW9mIHR5cGVvZiBpdGVtcz47XG5cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBhbGxLZXlzKSB7XG4gICAgICBzdGF0ZVtrZXldID0gaXRlbXNba2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBwcml2YXRlIGNhbGxMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlYWR5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMucmVhZHlDYWxsYmFja3M7XG4gICAgdGhpcy5yZWFkeUNhbGxiYWNrcyA9IFtdO1xuICAgIGNhbGxiYWNrcy5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKCkpO1xuICB9XG59XG4iXSwKICAibWFwcGlu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
