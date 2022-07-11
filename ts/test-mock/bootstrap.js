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
var bootstrap_exports = {};
__export(bootstrap_exports, {
  App: () => import_playwright.App,
  Bootstrap: () => Bootstrap
});
module.exports = __toCommonJS(bootstrap_exports);
var import_assert = __toESM(require("assert"));
var import_promises = __toESM(require("fs/promises"));
var import_path = __toESM(require("path"));
var import_os = __toESM(require("os"));
var import_debug = __toESM(require("debug"));
var import_mock_server = require("@signalapp/mock-server");
var import_storageConstants = require("../services/storageConstants");
var durations = __toESM(require("../util/durations"));
var import_playwright = require("./playwright");
const debug = (0, import_debug.default)("mock:bootstrap");
const ELECTRON = import_path.default.join(__dirname, "..", "..", "node_modules", ".bin", "electron");
const CI_SCRIPT = import_path.default.join(__dirname, "..", "..", "ci.js");
const CLOSE_TIMEOUT = 10 * 1e3;
const CONTACT_FIRST_NAMES = [
  "Alice",
  "Bob",
  "Charlie",
  "Paul",
  "Steve",
  "William"
];
const CONTACT_LAST_NAMES = [
  "Smith",
  "Brown",
  "Jones",
  "Miller",
  "Davis",
  "Lopez",
  "Gonazales"
];
const CONTACT_NAMES = new Array();
for (const firstName of CONTACT_FIRST_NAMES) {
  for (const lastName of CONTACT_LAST_NAMES) {
    CONTACT_NAMES.push(`${firstName} ${lastName}`);
  }
}
const MAX_CONTACTS = CONTACT_NAMES.length;
class Bootstrap {
  constructor(options = {}) {
    this.timestamp = Date.now() - durations.MONTH;
    this.server = new import_mock_server.Server({
      maxStorageReadKeys: import_storageConstants.MAX_READ_KEYS
    });
    this.options = {
      linkedDevices: 5,
      contactCount: MAX_CONTACTS,
      contactNames: CONTACT_NAMES,
      benchmark: false,
      ...options
    };
    (0, import_assert.default)(this.options.contactCount <= this.options.contactNames.length);
  }
  async init() {
    debug("initializing");
    await this.server.listen(0);
    const { port } = this.server.address();
    debug("started server on port=%d", port);
    const contactNames = this.options.contactNames.slice(0, this.options.contactCount);
    this.privContacts = await Promise.all(contactNames.map(async (profileName) => {
      const primary = await this.server.createPrimaryDevice({
        profileName
      });
      for (let i = 0; i < this.options.linkedDevices; i += 1) {
        await this.server.createSecondaryDevice(primary);
      }
      return primary;
    }));
    this.privPhone = await this.server.createPrimaryDevice({
      profileName: "Mock",
      contacts: this.contacts
    });
    this.storagePath = await import_promises.default.mkdtemp(import_path.default.join(import_os.default.tmpdir(), "mock-signal-"));
    debug("setting storage path=%j", this.storagePath);
  }
  get logsDir() {
    (0, import_assert.default)(this.storagePath !== void 0, "Bootstrap has to be initialized first, see: bootstrap.init()");
    return import_path.default.join(this.storagePath, "logs");
  }
  async teardown() {
    debug("tearing down");
    await Promise.race([
      this.storagePath ? import_promises.default.rm(this.storagePath, { recursive: true }) : Promise.resolve(),
      this.server.close(),
      new Promise((resolve) => setTimeout(resolve, CLOSE_TIMEOUT).unref())
    ]);
  }
  async link() {
    debug("linking");
    const app = await this.startApp();
    const provision = await this.server.waitForProvision();
    const provisionURL = await app.waitForProvisionURL();
    this.privDesktop = await provision.complete({
      provisionURL,
      primaryDevice: this.phone
    });
    debug("new desktop device %j", this.desktop.debugId);
    const desktopKey = await this.desktop.popSingleUseKey();
    await this.phone.addSingleUseKey(this.desktop, desktopKey);
    for (const contact of this.contacts) {
      const contactKey = await this.desktop.popSingleUseKey();
      await contact.addSingleUseKey(this.desktop, contactKey);
    }
    await this.phone.waitForSync(this.desktop);
    this.phone.resetSyncState(this.desktop);
    debug("synced with %j", this.desktop.debugId);
    return app;
  }
  async linkAndClose() {
    const app = await this.link();
    debug("closing the app after link");
    await app.close();
  }
  async startApp() {
    (0, import_assert.default)(this.storagePath !== void 0, "Bootstrap has to be initialized first, see: bootstrap.init()");
    debug("starting the app");
    const { port } = this.server.address();
    const app = new import_playwright.App({
      main: ELECTRON,
      args: [CI_SCRIPT],
      config: await this.generateConfig(port)
    });
    await app.start();
    return app;
  }
  getTimestamp() {
    const result = this.timestamp;
    this.timestamp += 1;
    return result;
  }
  get phone() {
    (0, import_assert.default)(this.privPhone, "Bootstrap has to be initialized first, see: bootstrap.init()");
    return this.privPhone;
  }
  get desktop() {
    (0, import_assert.default)(this.privDesktop, "Bootstrap has to be linked first, see: bootstrap.link()");
    return this.privDesktop;
  }
  get contacts() {
    (0, import_assert.default)(this.privContacts, "Bootstrap has to be initialized first, see: bootstrap.init()");
    return this.privContacts;
  }
  async generateConfig(port) {
    const url = `https://127.0.0.1:${port}`;
    return JSON.stringify({
      ...await (0, import_mock_server.loadCertificates)(),
      forcePreloadBundle: this.options.benchmark,
      enableCI: true,
      buildExpiration: Date.now() + durations.MONTH,
      storagePath: this.storagePath,
      storageProfile: "mock",
      serverUrl: url,
      storageUrl: url,
      directoryUrl: url,
      cdn: {
        "0": url,
        "2": url
      },
      updatesEnabled: false,
      ...this.options.extraConfig
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  App,
  Bootstrap
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYm9vdHN0cmFwLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCBmcyBmcm9tICdmcy9wcm9taXNlcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBvcyBmcm9tICdvcyc7XG5pbXBvcnQgY3JlYXRlRGVidWcgZnJvbSAnZGVidWcnO1xuXG5pbXBvcnQgdHlwZSB7IERldmljZSwgUHJpbWFyeURldmljZSB9IGZyb20gJ0BzaWduYWxhcHAvbW9jay1zZXJ2ZXInO1xuaW1wb3J0IHsgU2VydmVyLCBsb2FkQ2VydGlmaWNhdGVzIH0gZnJvbSAnQHNpZ25hbGFwcC9tb2NrLXNlcnZlcic7XG5pbXBvcnQgeyBNQVhfUkVBRF9LRVlTIGFzIE1BWF9TVE9SQUdFX1JFQURfS0VZUyB9IGZyb20gJy4uL3NlcnZpY2VzL3N0b3JhZ2VDb25zdGFudHMnO1xuaW1wb3J0ICogYXMgZHVyYXRpb25zIGZyb20gJy4uL3V0aWwvZHVyYXRpb25zJztcbmltcG9ydCB7IEFwcCB9IGZyb20gJy4vcGxheXdyaWdodCc7XG5cbmV4cG9ydCB7IEFwcCB9O1xuXG5jb25zdCBkZWJ1ZyA9IGNyZWF0ZURlYnVnKCdtb2NrOmJvb3RzdHJhcCcpO1xuXG5jb25zdCBFTEVDVFJPTiA9IHBhdGguam9pbihcbiAgX19kaXJuYW1lLFxuICAnLi4nLFxuICAnLi4nLFxuICAnbm9kZV9tb2R1bGVzJyxcbiAgJy5iaW4nLFxuICAnZWxlY3Ryb24nXG4pO1xuY29uc3QgQ0lfU0NSSVBUID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJy4uJywgJ2NpLmpzJyk7XG5cbmNvbnN0IENMT1NFX1RJTUVPVVQgPSAxMCAqIDEwMDA7XG5cbmNvbnN0IENPTlRBQ1RfRklSU1RfTkFNRVMgPSBbXG4gICdBbGljZScsXG4gICdCb2InLFxuICAnQ2hhcmxpZScsXG4gICdQYXVsJyxcbiAgJ1N0ZXZlJyxcbiAgJ1dpbGxpYW0nLFxuXTtcbmNvbnN0IENPTlRBQ1RfTEFTVF9OQU1FUyA9IFtcbiAgJ1NtaXRoJyxcbiAgJ0Jyb3duJyxcbiAgJ0pvbmVzJyxcbiAgJ01pbGxlcicsXG4gICdEYXZpcycsXG4gICdMb3BleicsXG4gICdHb25hemFsZXMnLFxuXTtcblxuY29uc3QgQ09OVEFDVF9OQU1FUyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XG5mb3IgKGNvbnN0IGZpcnN0TmFtZSBvZiBDT05UQUNUX0ZJUlNUX05BTUVTKSB7XG4gIGZvciAoY29uc3QgbGFzdE5hbWUgb2YgQ09OVEFDVF9MQVNUX05BTUVTKSB7XG4gICAgQ09OVEFDVF9OQU1FUy5wdXNoKGAke2ZpcnN0TmFtZX0gJHtsYXN0TmFtZX1gKTtcbiAgfVxufVxuXG5jb25zdCBNQVhfQ09OVEFDVFMgPSBDT05UQUNUX05BTUVTLmxlbmd0aDtcblxuZXhwb3J0IHR5cGUgQm9vdHN0cmFwT3B0aW9ucyA9IFJlYWRvbmx5PHtcbiAgZXh0cmFDb25maWc/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgYmVuY2htYXJrPzogYm9vbGVhbjtcblxuICBsaW5rZWREZXZpY2VzPzogbnVtYmVyO1xuICBjb250YWN0Q291bnQ/OiBudW1iZXI7XG4gIGNvbnRhY3ROYW1lcz86IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcbiAgY29udGFjdFByZUtleUNvdW50PzogbnVtYmVyO1xufT47XG5cbnR5cGUgQm9vdHN0cmFwSW50ZXJuYWxPcHRpb25zID0gUGljazxCb290c3RyYXBPcHRpb25zLCAnZXh0cmFDb25maWcnPiAmXG4gIFJlYWRvbmx5PHtcbiAgICBiZW5jaG1hcms6IGJvb2xlYW47XG4gICAgbGlua2VkRGV2aWNlczogbnVtYmVyO1xuICAgIGNvbnRhY3RDb3VudDogbnVtYmVyO1xuICAgIGNvbnRhY3ROYW1lczogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xuICB9PjtcblxuLy9cbi8vIEJvb3RzdHJhcCBpcyBhIGNsYXNzIHRoYXQgcHJlcGFyZXMgbW9jayBzZXJ2ZXIgYW5kIGRlc2t0b3AgZm9yIHJ1bm5pbmdcbi8vIHRlc3RzL2JlbmNobWFya3MuXG4vL1xuLy8gSW4gZ2VuZXJhbCwgdGhlIHVzYWdlIHBhdHRlcm4gaXM6XG4vL1xuLy8gICBjb25zdCBib290c3RyYXAgPSBuZXcgQm9vdHN0cmFwKCk7XG4vLyAgIGF3YWl0IGJvb3RzdHJhcC5pbml0KCk7XG4vLyAgIGNvbnN0IGFwcCA9IGF3YWl0IGJvb3RzdHJhcC5saW5rKCk7XG4vLyAgIGF3YWl0IGJvb3RzdHJhcC50ZWFyZG93bigpO1xuLy9cbi8vIE9uY2UgaW5pdGlhbGl6ZWQgYGJvb3RzdHJhcGAgdmFyaWFibGUgd2lsbCBoYXZlIGZvbGxvd2luZyB1c2VmdWwgcHJvcGVydGllczpcbi8vXG4vLyAtIGBzZXJ2ZXJgIC0gYSBtb2NrIHNlcnZlciBpbnN0YW5jZVxuLy8gLSBgZGVza3RvcGAgLSBhIGxpbmtlZCBkZXZpY2UgcmVwcmVzZW50aW5nIGN1cnJlbnRseSBydW5uaW5nIGRlc2t0b3AgaW5zdGFuY2Vcbi8vIC0gYHBob25lYCAtIGEgcHJpbWFyeSBkZXZpY2UgcmVwcmVzZW50aW5nIGRlc2t0b3AncyBwcmltYXJ5XG4vLyAtIGBjb250YWN0c2AgLSBhIGxpc3Qgb2YgcHJpbWFyeSBkZXZpY2VzIGZvciBjb250YWN0cyB0aGF0IGFyZSBzeW5jZWQgb3ZlclxuLy8gICB0aHJvdWdoIGNvbnRhY3Qgc3luY1xuLy9cbi8vIGBib290c3RyYXAuZ2V0VGltZXN0YW1wKClgIGNvdWxkIGJlIHVzZWQgdG8gZ2VuZXJhdGUgY29uc2VjdXRpdmUgdGltZXN0YW1wXG4vLyBmb3Igc2VuZGluZyBtZXNzYWdlcy5cbi8vXG4vLyBBbGwgcGhvbmUgbnVtYmVycyBhbmQgdXVpZHMgZm9yIGFsbCBjb250YWN0cyBhbmQgb3Vyc2VsdmVzIGFyZSByYW5kb20gYW5kIG5vdFxuLy8gdGhlIHNhbWUgYmV0d2VlbiBkaWZmZXJlbnQgdGVzdCBydW5zLlxuLy9cbmV4cG9ydCBjbGFzcyBCb290c3RyYXAge1xuICBwdWJsaWMgcmVhZG9ubHkgc2VydmVyOiBTZXJ2ZXI7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBvcHRpb25zOiBCb290c3RyYXBJbnRlcm5hbE9wdGlvbnM7XG4gIHByaXZhdGUgcHJpdkNvbnRhY3RzPzogUmVhZG9ubHlBcnJheTxQcmltYXJ5RGV2aWNlPjtcbiAgcHJpdmF0ZSBwcml2UGhvbmU/OiBQcmltYXJ5RGV2aWNlO1xuICBwcml2YXRlIHByaXZEZXNrdG9wPzogRGV2aWNlO1xuICBwcml2YXRlIHN0b3JhZ2VQYXRoPzogc3RyaW5nO1xuICBwcml2YXRlIHRpbWVzdGFtcDogbnVtYmVyID0gRGF0ZS5ub3coKSAtIGR1cmF0aW9ucy5NT05USDtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBCb290c3RyYXBPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLnNlcnZlciA9IG5ldyBTZXJ2ZXIoe1xuICAgICAgLy8gTGltaXQgbnVtYmVyIG9mIHN0b3JhZ2UgcmVhZCBrZXlzIGZvciBlYXNpZXIgdGVzdGluZ1xuICAgICAgbWF4U3RvcmFnZVJlYWRLZXlzOiBNQVhfU1RPUkFHRV9SRUFEX0tFWVMsXG4gICAgfSk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICBsaW5rZWREZXZpY2VzOiA1LFxuICAgICAgY29udGFjdENvdW50OiBNQVhfQ09OVEFDVFMsXG4gICAgICBjb250YWN0TmFtZXM6IENPTlRBQ1RfTkFNRVMsXG4gICAgICBiZW5jaG1hcms6IGZhbHNlLFxuXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH07XG5cbiAgICBhc3NlcnQodGhpcy5vcHRpb25zLmNvbnRhY3RDb3VudCA8PSB0aGlzLm9wdGlvbnMuY29udGFjdE5hbWVzLmxlbmd0aCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgaW5pdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBkZWJ1ZygnaW5pdGlhbGl6aW5nJyk7XG5cbiAgICBhd2FpdCB0aGlzLnNlcnZlci5saXN0ZW4oMCk7XG5cbiAgICBjb25zdCB7IHBvcnQgfSA9IHRoaXMuc2VydmVyLmFkZHJlc3MoKTtcbiAgICBkZWJ1Zygnc3RhcnRlZCBzZXJ2ZXIgb24gcG9ydD0lZCcsIHBvcnQpO1xuXG4gICAgY29uc3QgY29udGFjdE5hbWVzID0gdGhpcy5vcHRpb25zLmNvbnRhY3ROYW1lcy5zbGljZShcbiAgICAgIDAsXG4gICAgICB0aGlzLm9wdGlvbnMuY29udGFjdENvdW50XG4gICAgKTtcblxuICAgIHRoaXMucHJpdkNvbnRhY3RzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBjb250YWN0TmFtZXMubWFwKGFzeW5jIHByb2ZpbGVOYW1lID0+IHtcbiAgICAgICAgY29uc3QgcHJpbWFyeSA9IGF3YWl0IHRoaXMuc2VydmVyLmNyZWF0ZVByaW1hcnlEZXZpY2Uoe1xuICAgICAgICAgIHByb2ZpbGVOYW1lLFxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5saW5rZWREZXZpY2VzOyBpICs9IDEpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgICAgIGF3YWl0IHRoaXMuc2VydmVyLmNyZWF0ZVNlY29uZGFyeURldmljZShwcmltYXJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcmltYXJ5O1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5wcml2UGhvbmUgPSBhd2FpdCB0aGlzLnNlcnZlci5jcmVhdGVQcmltYXJ5RGV2aWNlKHtcbiAgICAgIHByb2ZpbGVOYW1lOiAnTW9jaycsXG4gICAgICBjb250YWN0czogdGhpcy5jb250YWN0cyxcbiAgICB9KTtcblxuICAgIHRoaXMuc3RvcmFnZVBhdGggPSBhd2FpdCBmcy5ta2R0ZW1wKHBhdGguam9pbihvcy50bXBkaXIoKSwgJ21vY2stc2lnbmFsLScpKTtcblxuICAgIGRlYnVnKCdzZXR0aW5nIHN0b3JhZ2UgcGF0aD0laicsIHRoaXMuc3RvcmFnZVBhdGgpO1xuICB9XG5cbiAgcHVibGljIGdldCBsb2dzRGlyKCk6IHN0cmluZyB7XG4gICAgYXNzZXJ0KFxuICAgICAgdGhpcy5zdG9yYWdlUGF0aCAhPT0gdW5kZWZpbmVkLFxuICAgICAgJ0Jvb3RzdHJhcCBoYXMgdG8gYmUgaW5pdGlhbGl6ZWQgZmlyc3QsIHNlZTogYm9vdHN0cmFwLmluaXQoKSdcbiAgICApO1xuXG4gICAgcmV0dXJuIHBhdGguam9pbih0aGlzLnN0b3JhZ2VQYXRoLCAnbG9ncycpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHRlYXJkb3duKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGRlYnVnKCd0ZWFyaW5nIGRvd24nKTtcblxuICAgIGF3YWl0IFByb21pc2UucmFjZShbXG4gICAgICB0aGlzLnN0b3JhZ2VQYXRoXG4gICAgICAgID8gZnMucm0odGhpcy5zdG9yYWdlUGF0aCwgeyByZWN1cnNpdmU6IHRydWUgfSlcbiAgICAgICAgOiBQcm9taXNlLnJlc29sdmUoKSxcbiAgICAgIHRoaXMuc2VydmVyLmNsb3NlKCksXG4gICAgICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgQ0xPU0VfVElNRU9VVCkudW5yZWYoKSksXG4gICAgXSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbGluaygpOiBQcm9taXNlPEFwcD4ge1xuICAgIGRlYnVnKCdsaW5raW5nJyk7XG5cbiAgICBjb25zdCBhcHAgPSBhd2FpdCB0aGlzLnN0YXJ0QXBwKCk7XG5cbiAgICBjb25zdCBwcm92aXNpb24gPSBhd2FpdCB0aGlzLnNlcnZlci53YWl0Rm9yUHJvdmlzaW9uKCk7XG5cbiAgICBjb25zdCBwcm92aXNpb25VUkwgPSBhd2FpdCBhcHAud2FpdEZvclByb3Zpc2lvblVSTCgpO1xuXG4gICAgdGhpcy5wcml2RGVza3RvcCA9IGF3YWl0IHByb3Zpc2lvbi5jb21wbGV0ZSh7XG4gICAgICBwcm92aXNpb25VUkwsXG4gICAgICBwcmltYXJ5RGV2aWNlOiB0aGlzLnBob25lLFxuICAgIH0pO1xuXG4gICAgZGVidWcoJ25ldyBkZXNrdG9wIGRldmljZSAlaicsIHRoaXMuZGVza3RvcC5kZWJ1Z0lkKTtcblxuICAgIGNvbnN0IGRlc2t0b3BLZXkgPSBhd2FpdCB0aGlzLmRlc2t0b3AucG9wU2luZ2xlVXNlS2V5KCk7XG4gICAgYXdhaXQgdGhpcy5waG9uZS5hZGRTaW5nbGVVc2VLZXkodGhpcy5kZXNrdG9wLCBkZXNrdG9wS2V5KTtcblxuICAgIGZvciAoY29uc3QgY29udGFjdCBvZiB0aGlzLmNvbnRhY3RzKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgY29uc3QgY29udGFjdEtleSA9IGF3YWl0IHRoaXMuZGVza3RvcC5wb3BTaW5nbGVVc2VLZXkoKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICBhd2FpdCBjb250YWN0LmFkZFNpbmdsZVVzZUtleSh0aGlzLmRlc2t0b3AsIGNvbnRhY3RLZXkpO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMucGhvbmUud2FpdEZvclN5bmModGhpcy5kZXNrdG9wKTtcbiAgICB0aGlzLnBob25lLnJlc2V0U3luY1N0YXRlKHRoaXMuZGVza3RvcCk7XG5cbiAgICBkZWJ1Zygnc3luY2VkIHdpdGggJWonLCB0aGlzLmRlc2t0b3AuZGVidWdJZCk7XG5cbiAgICByZXR1cm4gYXBwO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGxpbmtBbmRDbG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBhcHAgPSBhd2FpdCB0aGlzLmxpbmsoKTtcblxuICAgIGRlYnVnKCdjbG9zaW5nIHRoZSBhcHAgYWZ0ZXIgbGluaycpO1xuICAgIGF3YWl0IGFwcC5jbG9zZSgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHN0YXJ0QXBwKCk6IFByb21pc2U8QXBwPiB7XG4gICAgYXNzZXJ0KFxuICAgICAgdGhpcy5zdG9yYWdlUGF0aCAhPT0gdW5kZWZpbmVkLFxuICAgICAgJ0Jvb3RzdHJhcCBoYXMgdG8gYmUgaW5pdGlhbGl6ZWQgZmlyc3QsIHNlZTogYm9vdHN0cmFwLmluaXQoKSdcbiAgICApO1xuXG4gICAgZGVidWcoJ3N0YXJ0aW5nIHRoZSBhcHAnKTtcblxuICAgIGNvbnN0IHsgcG9ydCB9ID0gdGhpcy5zZXJ2ZXIuYWRkcmVzcygpO1xuXG4gICAgY29uc3QgYXBwID0gbmV3IEFwcCh7XG4gICAgICBtYWluOiBFTEVDVFJPTixcbiAgICAgIGFyZ3M6IFtDSV9TQ1JJUFRdLFxuICAgICAgY29uZmlnOiBhd2FpdCB0aGlzLmdlbmVyYXRlQ29uZmlnKHBvcnQpLFxuICAgIH0pO1xuXG4gICAgYXdhaXQgYXBwLnN0YXJ0KCk7XG5cbiAgICByZXR1cm4gYXBwO1xuICB9XG5cbiAgcHVibGljIGdldFRpbWVzdGFtcCgpOiBudW1iZXIge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudGltZXN0YW1wO1xuICAgIHRoaXMudGltZXN0YW1wICs9IDE7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vXG4gIC8vIEdldHRlcnNcbiAgLy9cblxuICBwdWJsaWMgZ2V0IHBob25lKCk6IFByaW1hcnlEZXZpY2Uge1xuICAgIGFzc2VydChcbiAgICAgIHRoaXMucHJpdlBob25lLFxuICAgICAgJ0Jvb3RzdHJhcCBoYXMgdG8gYmUgaW5pdGlhbGl6ZWQgZmlyc3QsIHNlZTogYm9vdHN0cmFwLmluaXQoKSdcbiAgICApO1xuICAgIHJldHVybiB0aGlzLnByaXZQaG9uZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZGVza3RvcCgpOiBEZXZpY2Uge1xuICAgIGFzc2VydChcbiAgICAgIHRoaXMucHJpdkRlc2t0b3AsXG4gICAgICAnQm9vdHN0cmFwIGhhcyB0byBiZSBsaW5rZWQgZmlyc3QsIHNlZTogYm9vdHN0cmFwLmxpbmsoKSdcbiAgICApO1xuICAgIHJldHVybiB0aGlzLnByaXZEZXNrdG9wO1xuICB9XG5cbiAgcHVibGljIGdldCBjb250YWN0cygpOiBSZWFkb25seUFycmF5PFByaW1hcnlEZXZpY2U+IHtcbiAgICBhc3NlcnQoXG4gICAgICB0aGlzLnByaXZDb250YWN0cyxcbiAgICAgICdCb290c3RyYXAgaGFzIHRvIGJlIGluaXRpYWxpemVkIGZpcnN0LCBzZWU6IGJvb3RzdHJhcC5pbml0KCknXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy5wcml2Q29udGFjdHM7XG4gIH1cblxuICAvL1xuICAvLyBQcml2YXRlXG4gIC8vXG5cbiAgcHJpdmF0ZSBhc3luYyBnZW5lcmF0ZUNvbmZpZyhwb3J0OiBudW1iZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHVybCA9IGBodHRwczovLzEyNy4wLjAuMToke3BvcnR9YDtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgLi4uKGF3YWl0IGxvYWRDZXJ0aWZpY2F0ZXMoKSksXG5cbiAgICAgIGZvcmNlUHJlbG9hZEJ1bmRsZTogdGhpcy5vcHRpb25zLmJlbmNobWFyayxcbiAgICAgIGVuYWJsZUNJOiB0cnVlLFxuXG4gICAgICBidWlsZEV4cGlyYXRpb246IERhdGUubm93KCkgKyBkdXJhdGlvbnMuTU9OVEgsXG4gICAgICBzdG9yYWdlUGF0aDogdGhpcy5zdG9yYWdlUGF0aCxcbiAgICAgIHN0b3JhZ2VQcm9maWxlOiAnbW9jaycsXG4gICAgICBzZXJ2ZXJVcmw6IHVybCxcbiAgICAgIHN0b3JhZ2VVcmw6IHVybCxcbiAgICAgIGRpcmVjdG9yeVVybDogdXJsLFxuICAgICAgY2RuOiB7XG4gICAgICAgICcwJzogdXJsLFxuICAgICAgICAnMic6IHVybCxcbiAgICAgIH0sXG4gICAgICB1cGRhdGVzRW5hYmxlZDogZmFsc2UsXG5cbiAgICAgIC4uLnRoaXMub3B0aW9ucy5leHRyYUNvbmZpZyxcbiAgICB9KTtcbiAgfVxufVxuIl0sCiAg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
