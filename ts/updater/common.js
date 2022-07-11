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
var common_exports = {};
__export(common_exports, {
  Updater: () => Updater,
  createTempDir: () => createTempDir,
  createUpdateCacheDirIfNeeded: () => createUpdateCacheDirIfNeeded,
  deleteTempDir: () => deleteTempDir,
  getCliOptions: () => getCliOptions,
  getTempDir: () => getTempDir,
  getUpdateCheckUrl: () => getUpdateCheckUrl,
  getUpdateFileName: () => getUpdateFileName,
  getUpdatesBase: () => getUpdatesBase,
  getUpdatesFileName: () => getUpdatesFileName,
  getVersion: () => getVersion,
  isUpdateFileNameValid: () => isUpdateFileNameValid,
  parseYaml: () => parseYaml,
  validatePath: () => validatePath
});
module.exports = __toCommonJS(common_exports);
var import_fs = require("fs");
var import_fs_extra = require("fs-extra");
var import_promises = require("fs/promises");
var import_util = require("util");
var import_child_process = require("child_process");
var import_path = require("path");
var import_os = require("os");
var import_lodash = require("lodash");
var import_dashdash = require("dashdash");
var import_js_yaml = require("js-yaml");
var import_semver = require("semver");
var import_config = __toESM(require("config"));
var import_got = __toESM(require("got"));
var import_uuid = require("uuid");
var import_pify = __toESM(require("pify"));
var import_mkdirp = __toESM(require("mkdirp"));
var import_rimraf = __toESM(require("rimraf"));
var import_electron = require("electron");
var durations = __toESM(require("../util/durations"));
var import_attachments = require("../util/attachments");
var import_Dialogs = require("../types/Dialogs");
var Errors = __toESM(require("../types/errors"));
var import_version = require("../util/version");
var import_assert = require("../util/assert");
var packageJson = __toESM(require("../../package.json"));
var import_signature = require("./signature");
var import_isPathInside = require("../util/isPathInside");
var import_got2 = require("./got");
var import_util2 = require("./util");
var import_differential = require("./differential");
const mkdirpPromise = (0, import_pify.default)(import_mkdirp.default);
const rimrafPromise = (0, import_pify.default)(import_rimraf.default);
const INTERVAL = 30 * durations.MINUTE;
var DownloadMode = /* @__PURE__ */ ((DownloadMode2) => {
  DownloadMode2["DifferentialOnly"] = "DifferentialOnly";
  DownloadMode2["FullOnly"] = "FullOnly";
  DownloadMode2["Automatic"] = "Automatic";
  return DownloadMode2;
})(DownloadMode || {});
class Updater {
  constructor(logger, settingsChannel, getMainWindow) {
    this.logger = logger;
    this.settingsChannel = settingsChannel;
    this.getMainWindow = getMainWindow;
    this.markedCannotUpdate = false;
    this.throttledSendDownloadingUpdate = (0, import_lodash.throttle)((downloadedSize) => {
      const mainWindow = this.getMainWindow();
      mainWindow?.webContents.send("show-update-dialog", import_Dialogs.DialogType.Downloading, { downloadedSize });
    }, 500);
  }
  async force() {
    return this.checkForUpdatesMaybeInstall(true);
  }
  async start() {
    this.logger.info("updater/start: starting checks...");
    setInterval(async () => {
      try {
        await this.checkForUpdatesMaybeInstall();
      } catch (error) {
        this.logger.error(`updater/start: ${Errors.toLogFormat(error)}`);
      }
    }, INTERVAL);
    await this.deletePreviousInstallers();
    await this.checkForUpdatesMaybeInstall();
  }
  setUpdateListener(performUpdateCallback) {
    import_electron.ipcMain.removeHandler("start-update");
    import_electron.ipcMain.handleOnce("start-update", performUpdateCallback);
  }
  markCannotUpdate(error, dialogType = import_Dialogs.DialogType.Cannot_Update) {
    if (this.markedCannotUpdate) {
      this.logger.warn("updater/markCannotUpdate: already marked", Errors.toLogFormat(error));
      return;
    }
    this.markedCannotUpdate = true;
    this.logger.error(`updater/markCannotUpdate: marking due to error: ${Errors.toLogFormat(error)}, dialogType: ${dialogType}`);
    const mainWindow = this.getMainWindow();
    mainWindow?.webContents.send("show-update-dialog", dialogType);
    this.setUpdateListener(async () => {
      this.logger.info("updater/markCannotUpdate: retrying after user action");
      this.markedCannotUpdate = false;
      await this.checkForUpdatesMaybeInstall();
    });
  }
  async downloadAndInstall(updateInfo, mode) {
    if (this.activeDownload) {
      return this.activeDownload;
    }
    try {
      this.activeDownload = this.doDownloadAndInstall(updateInfo, mode);
      return await this.activeDownload;
    } finally {
      this.activeDownload = void 0;
    }
  }
  async doDownloadAndInstall(updateInfo, mode) {
    const { logger } = this;
    const { fileName: newFileName, version: newVersion } = updateInfo;
    try {
      const oldVersion = this.version;
      this.version = newVersion;
      let downloadResult;
      try {
        downloadResult = await this.downloadUpdate(updateInfo, mode);
      } catch (error) {
        this.version = oldVersion;
        throw error;
      }
      if (!downloadResult) {
        logger.warn("downloadAndInstall: no update was downloaded");
        (0, import_assert.strictAssert)(mode !== "Automatic" /* Automatic */ && mode !== "FullOnly" /* FullOnly */, "Automatic and full mode downloads are guaranteed to happen or error");
        return false;
      }
      const { updateFilePath, signature } = downloadResult;
      const publicKey = (0, import_signature.hexToBinary)(import_config.default.get("updatesPublicKey"));
      const verified = await (0, import_signature.verifySignature)(updateFilePath, this.version, signature, publicKey);
      if (!verified) {
        throw new Error(`Downloaded update did not pass signature verification (version: '${this.version}'; fileName: '${newFileName}')`);
      }
      await this.installUpdate(updateFilePath);
      const mainWindow = this.getMainWindow();
      if (mainWindow) {
        mainWindow.webContents.send("show-update-dialog", import_Dialogs.DialogType.Update, {
          version: this.version
        });
      } else {
        logger.warn("downloadAndInstall: no mainWindow, cannot show update dialog");
      }
      return true;
    } catch (error) {
      logger.error(`downloadAndInstall: ${Errors.toLogFormat(error)}`);
      this.markCannotUpdate(error);
      throw error;
    }
  }
  async checkForUpdatesMaybeInstall(force = false) {
    const { logger } = this;
    logger.info("checkForUpdatesMaybeInstall: checking for update...");
    const updateInfo = await this.checkForUpdates(force);
    if (!updateInfo) {
      return;
    }
    const { version: newVersion } = updateInfo;
    if (!force && this.version && !(0, import_semver.gt)(newVersion, this.version)) {
      return;
    }
    const autoDownloadUpdates = await this.getAutoDownloadUpdateSetting();
    if (autoDownloadUpdates) {
      await this.downloadAndInstall(updateInfo, "Automatic" /* Automatic */);
      return;
    }
    let mode = "FullOnly" /* FullOnly */;
    if (updateInfo.differentialData) {
      mode = "DifferentialOnly" /* DifferentialOnly */;
    }
    await this.offerUpdate(updateInfo, mode, 0);
  }
  async offerUpdate(updateInfo, mode, attempt) {
    const { logger } = this;
    this.setUpdateListener(async () => {
      logger.info("offerUpdate: have not downloaded update, going to download");
      const didDownload = await this.downloadAndInstall(updateInfo, mode);
      if (!didDownload && mode === "DifferentialOnly" /* DifferentialOnly */) {
        this.logger.warn("offerUpdate: Failed to download differential update, offering full");
        return this.offerUpdate(updateInfo, "FullOnly" /* FullOnly */, attempt + 1);
      }
      (0, import_assert.strictAssert)(didDownload, "FullOnly must always download update");
    });
    const mainWindow = this.getMainWindow();
    if (!mainWindow) {
      logger.warn("offerUpdate: no mainWindow, cannot show update dialog");
      return;
    }
    let downloadSize;
    if (mode === "DifferentialOnly" /* DifferentialOnly */) {
      (0, import_assert.strictAssert)(updateInfo.differentialData, "Must have differential data in DifferentialOnly mode");
      downloadSize = updateInfo.differentialData.downloadSize;
    } else {
      downloadSize = updateInfo.size;
    }
    logger.info(`offerUpdate: offering ${mode} update`);
    mainWindow.webContents.send("show-update-dialog", attempt === 0 ? import_Dialogs.DialogType.DownloadReady : import_Dialogs.DialogType.FullDownloadReady, {
      downloadSize,
      downloadMode: mode,
      version: updateInfo.version
    });
  }
  async checkForUpdates(forceUpdate = false) {
    const yaml = await getUpdateYaml();
    const parsedYaml = parseYaml(yaml);
    if (parsedYaml.requireManualUpdate) {
      this.logger.warn("checkForUpdates: manual update required");
      this.markCannotUpdate(new Error("yaml file has requireManualUpdate flag"), import_Dialogs.DialogType.Cannot_Update_Require_Manual);
      return;
    }
    const version = getVersion(parsedYaml);
    if (!version) {
      this.logger.warn("checkForUpdates: no version extracted from downloaded yaml");
      return;
    }
    if (!forceUpdate && !isVersionNewer(version)) {
      this.logger.info(`checkForUpdates: ${version} is not newer than ${packageJson.version}; no new update available`);
      return;
    }
    this.logger.info(`checkForUpdates: found newer version ${version} forceUpdate=${forceUpdate}`);
    const fileName = getUpdateFileName(parsedYaml, process.platform, await this.getArch());
    const sha512 = getSHA512(parsedYaml, fileName);
    (0, import_assert.strictAssert)(sha512 !== void 0, "Missing required hash");
    const latestInstaller = await this.getLatestCachedInstaller((0, import_path.extname)(fileName));
    let differentialData;
    if (latestInstaller) {
      this.logger.info(`checkForUpdates: Found local installer ${latestInstaller}`);
      const diffOptions = {
        oldFile: latestInstaller,
        newUrl: `${getUpdatesBase()}/${fileName}`,
        sha512
      };
      if (this.cachedDifferentialData && (0, import_differential.isValidPreparedData)(this.cachedDifferentialData, diffOptions)) {
        this.logger.info("checkForUpdates: using cached differential data");
        differentialData = this.cachedDifferentialData;
      } else {
        try {
          differentialData = await (0, import_differential.prepareDownload)(diffOptions);
          this.cachedDifferentialData = differentialData;
          this.logger.info("checkForUpdates: differential download size", differentialData.downloadSize);
        } catch (error) {
          this.logger.error("checkForUpdates: Failed to prepare differential update", Errors.toLogFormat(error));
          this.cachedDifferentialData = void 0;
        }
      }
    }
    return {
      fileName,
      size: getSize(parsedYaml, fileName),
      version,
      sha512,
      differentialData
    };
  }
  async getLatestCachedInstaller(extension) {
    const cacheDir = await createUpdateCacheDirIfNeeded();
    const oldFiles = (await (0, import_promises.readdir)(cacheDir)).map((fileName) => {
      return (0, import_path.join)(cacheDir, fileName);
    });
    return oldFiles.find((fileName) => (0, import_path.extname)(fileName) === extension);
  }
  async downloadUpdate({ fileName, sha512, differentialData }, mode) {
    const baseUrl = getUpdatesBase();
    const updateFileUrl = `${baseUrl}/${fileName}`;
    const updateOnProgress = mode !== "Automatic" /* Automatic */;
    const signatureFileName = (0, import_signature.getSignatureFileName)(fileName);
    const blockMapFileName = (0, import_differential.getBlockMapFileName)(fileName);
    const signatureUrl = `${baseUrl}/${signatureFileName}`;
    const blockMapUrl = `${baseUrl}/${blockMapFileName}`;
    let cacheDir = await createUpdateCacheDirIfNeeded();
    const targetUpdatePath = (0, import_path.join)(cacheDir, fileName);
    const tempDir = await createTempDir();
    const tempUpdatePath = (0, import_path.join)(tempDir, fileName);
    const tempBlockMapPath = (0, import_path.join)(tempDir, blockMapFileName);
    let tempPathFailover = false;
    try {
      validatePath(cacheDir, targetUpdatePath);
      validatePath(tempDir, tempUpdatePath);
      validatePath(tempDir, tempBlockMapPath);
      this.logger.info(`downloadUpdate: Downloading signature ${signatureUrl}`);
      const signature = Buffer.from(await (0, import_got.default)(signatureUrl, (0, import_got2.getGotOptions)()).text(), "hex");
      if (differentialData) {
        this.logger.info(`downloadUpdate: Saving blockmap ${blockMapUrl}`);
        await (0, import_promises.writeFile)(tempBlockMapPath, differentialData.newBlockMap);
      } else {
        try {
          this.logger.info(`downloadUpdate: Downloading blockmap ${blockMapUrl}`);
          const blockMap = await (0, import_got.default)(blockMapUrl, (0, import_got2.getGotOptions)()).buffer();
          await (0, import_promises.writeFile)(tempBlockMapPath, blockMap);
        } catch (error) {
          this.logger.warn("downloadUpdate: Failed to download blockmap, continuing", Errors.toLogFormat(error));
        }
      }
      let gotUpdate = false;
      if (!gotUpdate && await (0, import_fs_extra.pathExists)(targetUpdatePath)) {
        const checkResult = await (0, import_util2.checkIntegrity)(targetUpdatePath, sha512);
        if (checkResult.ok) {
          this.logger.info(`downloadUpdate: Not downloading update ${updateFileUrl}, local file has the same hash`);
          try {
            await (0, import_util2.gracefulRename)(this.logger, targetUpdatePath, tempUpdatePath);
            gotUpdate = true;
          } catch (error) {
            this.logger.error("downloadUpdate: failed to move already downloaded file", Errors.toLogFormat(error));
          }
        } else {
          this.logger.error("downloadUpdate: integrity check failure", checkResult.error);
        }
      }
      const isDifferentialEnabled = differentialData && mode !== "FullOnly" /* FullOnly */;
      if (!gotUpdate && isDifferentialEnabled) {
        this.logger.info(`downloadUpdate: Downloading differential update ${updateFileUrl}`);
        try {
          await (0, import_differential.download)(tempUpdatePath, differentialData, {
            statusCallback: updateOnProgress ? this.throttledSendDownloadingUpdate : void 0,
            logger: this.logger
          });
          gotUpdate = true;
        } catch (error) {
          this.logger.error("downloadUpdate: Failed to apply differential update", Errors.toLogFormat(error));
        }
      }
      const isFullEnabled = mode !== "DifferentialOnly" /* DifferentialOnly */;
      if (!gotUpdate && isFullEnabled) {
        this.logger.info(`downloadUpdate: Downloading full update ${updateFileUrl}`);
        await rimrafPromise(cacheDir);
        cacheDir = await createUpdateCacheDirIfNeeded();
        await this.downloadAndReport(updateFileUrl, tempUpdatePath, updateOnProgress);
        gotUpdate = true;
      }
      if (!gotUpdate) {
        return void 0;
      }
      this.logger.info("downloadUpdate: Downloaded update, moving into cache dir");
      const restoreDir = await getTempDir();
      await (0, import_util2.gracefulRename)(this.logger, cacheDir, restoreDir);
      try {
        await (0, import_util2.gracefulRename)(this.logger, tempDir, cacheDir);
      } catch (error) {
        try {
          await (0, import_util2.gracefulRename)(this.logger, restoreDir, cacheDir);
        } catch (restoreError) {
          this.logger.warn("downloadUpdate: Failed to restore from backup folder, ignoring", Errors.toLogFormat(restoreError));
        }
        this.logger.warn("downloadUpdate: running update from a temporary folder due to error", Errors.toLogFormat(error));
        tempPathFailover = true;
        return { updateFilePath: tempUpdatePath, signature };
      }
      try {
        await deleteTempDir(restoreDir);
      } catch (error) {
        this.logger.warn("downloadUpdate: Failed to remove backup folder, ignoring", Errors.toLogFormat(error));
      }
      return { updateFilePath: targetUpdatePath, signature };
    } finally {
      if (!tempPathFailover) {
        await deleteTempDir(tempDir);
      }
    }
  }
  async downloadAndReport(updateFileUrl, targetUpdatePath, updateOnProgress = false) {
    const downloadStream = import_got.default.stream(updateFileUrl, (0, import_got2.getGotOptions)());
    const writeStream = (0, import_fs.createWriteStream)(targetUpdatePath);
    await new Promise((resolve, reject) => {
      if (updateOnProgress) {
        let downloadedSize = 0;
        downloadStream.on("data", (data) => {
          downloadedSize += data.length;
          this.throttledSendDownloadingUpdate(downloadedSize);
        });
      }
      downloadStream.on("error", (error) => {
        reject(error);
      });
      downloadStream.on("end", () => {
        resolve();
      });
      writeStream.on("error", (error) => {
        reject(error);
      });
      downloadStream.pipe(writeStream);
    });
  }
  async getAutoDownloadUpdateSetting() {
    try {
      return await this.settingsChannel.getSettingFromMainWindow("autoDownloadUpdate");
    } catch (error) {
      this.logger.warn("getAutoDownloadUpdateSetting: Failed to fetch, returning false", Errors.toLogFormat(error));
      return false;
    }
  }
  async getArch() {
    if (process.platform !== "darwin" || process.arch === "arm64") {
      return process.arch;
    }
    try {
      const flag = "sysctl.proc_translated";
      const { stdout } = await (0, import_util.promisify)(import_child_process.execFile)("sysctl", ["-i", flag]);
      if (stdout.includes(`${flag}: 1`)) {
        this.logger.info("updater: running under Rosetta");
        return "arm64";
      }
    } catch (error) {
      this.logger.warn(`updater: Rosetta detection failed with ${Errors.toLogFormat(error)}`);
    }
    this.logger.info("updater: not running under Rosetta");
    return process.arch;
  }
}
function validatePath(basePath, targetPath) {
  const normalized = (0, import_path.normalize)(targetPath);
  if (!(0, import_isPathInside.isPathInside)(normalized, basePath)) {
    throw new Error(`validatePath: Path ${normalized} is not under base path ${basePath}`);
  }
}
function getUpdateCheckUrl() {
  return `${getUpdatesBase()}/${getUpdatesFileName()}`;
}
function getUpdatesBase() {
  return import_config.default.get("updatesUrl");
}
function getUpdatesFileName() {
  const prefix = getChannel();
  if (process.platform === "darwin") {
    return `${prefix}-mac.yml`;
  }
  return `${prefix}.yml`;
}
function getChannel() {
  const { version } = packageJson;
  if ((0, import_version.isStaging)(version)) {
    return "staging";
  }
  if ((0, import_version.isAlpha)(version)) {
    return "alpha";
  }
  if ((0, import_version.isBeta)(version)) {
    return "beta";
  }
  return "latest";
}
function isVersionNewer(newVersion) {
  const { version } = packageJson;
  return (0, import_semver.gt)(newVersion, version);
}
function getVersion(info) {
  return info && info.version;
}
const validFile = /^[A-Za-z0-9.-]+$/;
function isUpdateFileNameValid(name) {
  return validFile.test(name);
}
function getUpdateFileName(info, platform, arch) {
  if (!info || !info.path) {
    throw new Error("getUpdateFileName: No path present in YAML file");
  }
  let path;
  if (platform === "darwin") {
    const { files } = info;
    const candidates = files.filter(({ url }) => url.includes(arch) && url.endsWith(".zip"));
    if (candidates.length === 1) {
      path = candidates[0].url;
    }
  }
  path = path ?? info.path;
  if (!isUpdateFileNameValid(path)) {
    throw new Error(`getUpdateFileName: Path '${path}' contains invalid characters`);
  }
  return path;
}
function getSHA512(info, fileName) {
  if (!info || !info.files) {
    throw new Error("getSHA512: No files present in YAML file");
  }
  const foundFile = info.files.find((file) => file.url === fileName);
  return foundFile?.sha512;
}
function getSize(info, fileName) {
  if (!info || !info.files) {
    throw new Error("getSize: No files present in YAML file");
  }
  const foundFile = info.files.find((file) => file.url === fileName);
  return Number(foundFile?.size) || 0;
}
function parseYaml(yaml) {
  return (0, import_js_yaml.safeLoad)(yaml, { schema: import_js_yaml.FAILSAFE_SCHEMA, json: true });
}
async function getUpdateYaml() {
  const targetUrl = getUpdateCheckUrl();
  const body = await (0, import_got.default)(targetUrl, (0, import_got2.getGotOptions)()).text();
  if (!body) {
    throw new Error("Got unexpected response back from update check");
  }
  return body;
}
function getBaseTempDir() {
  return import_electron.app ? (0, import_attachments.getTempPath)(import_electron.app.getPath("userData")) : (0, import_os.tmpdir)();
}
async function createTempDir() {
  const targetDir = await getTempDir();
  await mkdirpPromise(targetDir);
  return targetDir;
}
async function getTempDir() {
  const baseTempDir = getBaseTempDir();
  const uniqueName = (0, import_uuid.v4)();
  if (!await (0, import_fs_extra.pathExists)(baseTempDir)) {
    await mkdirpPromise(baseTempDir);
  }
  return (0, import_path.join)(baseTempDir, uniqueName);
}
function getUpdateCacheDir() {
  return import_electron.app ? (0, import_attachments.getUpdateCachePath)(import_electron.app.getPath("userData")) : (0, import_os.tmpdir)();
}
async function createUpdateCacheDirIfNeeded() {
  const targetDir = getUpdateCacheDir();
  await mkdirpPromise(targetDir);
  return targetDir;
}
async function deleteTempDir(targetDir) {
  if (await (0, import_fs_extra.pathExists)(targetDir)) {
    const pathInfo = await (0, import_promises.stat)(targetDir);
    if (!pathInfo.isDirectory()) {
      throw new Error(`deleteTempDir: Cannot delete path '${targetDir}' because it is not a directory`);
    }
  }
  const baseTempDir = getBaseTempDir();
  if (!(0, import_isPathInside.isPathInside)(targetDir, baseTempDir)) {
    throw new Error(`deleteTempDir: Cannot delete path '${targetDir}' since it is not within base temp dir`);
  }
  await rimrafPromise(targetDir);
}
function getCliOptions(options) {
  const parser = (0, import_dashdash.createParser)({ options });
  const cliOptions = parser.parse(process.argv);
  if (cliOptions.help) {
    const help = parser.help().trimRight();
    console.log(help);
    process.exit(0);
  }
  return cliOptions;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Updater,
  createTempDir,
  createUpdateCacheDirIfNeeded,
  deleteTempDir,
  getCliOptions,
  getTempDir,
  getUpdateCheckUrl,
  getUpdateFileName,
  getUpdatesBase,
  getUpdatesFileName,
  getVersion,
  isUpdateFileNameValid,
  parseYaml,
  validatePath
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29tbW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuaW1wb3J0IHsgY3JlYXRlV3JpdGVTdHJlYW0gfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBwYXRoRXhpc3RzIH0gZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHsgcmVhZGRpciwgc3RhdCwgd3JpdGVGaWxlIH0gZnJvbSAnZnMvcHJvbWlzZXMnO1xuaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBleGVjRmlsZSB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IHsgam9pbiwgbm9ybWFsaXplLCBleHRuYW1lIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyB0bXBkaXIgfSBmcm9tICdvcyc7XG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB0eXBlIHsgUGFyc2VyQ29uZmlndXJhdGlvbiB9IGZyb20gJ2Rhc2hkYXNoJztcbmltcG9ydCB7IGNyZWF0ZVBhcnNlciB9IGZyb20gJ2Rhc2hkYXNoJztcbmltcG9ydCB7IEZBSUxTQUZFX1NDSEVNQSwgc2FmZUxvYWQgfSBmcm9tICdqcy15YW1sJztcbmltcG9ydCB7IGd0IH0gZnJvbSAnc2VtdmVyJztcbmltcG9ydCBjb25maWcgZnJvbSAnY29uZmlnJztcbmltcG9ydCBnb3QgZnJvbSAnZ290JztcbmltcG9ydCB7IHY0IGFzIGdldEd1aWQgfSBmcm9tICd1dWlkJztcbmltcG9ydCBwaWZ5IGZyb20gJ3BpZnknO1xuaW1wb3J0IG1rZGlycCBmcm9tICdta2RpcnAnO1xuaW1wb3J0IHJpbXJhZiBmcm9tICdyaW1yYWYnO1xuaW1wb3J0IHR5cGUgeyBCcm93c2VyV2luZG93IH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHsgYXBwLCBpcGNNYWluIH0gZnJvbSAnZWxlY3Ryb24nO1xuXG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0VGVtcFBhdGgsIGdldFVwZGF0ZUNhY2hlUGF0aCB9IGZyb20gJy4uL3V0aWwvYXR0YWNobWVudHMnO1xuaW1wb3J0IHsgRGlhbG9nVHlwZSB9IGZyb20gJy4uL3R5cGVzL0RpYWxvZ3MnO1xuaW1wb3J0ICogYXMgRXJyb3JzIGZyb20gJy4uL3R5cGVzL2Vycm9ycyc7XG5pbXBvcnQgeyBpc0FscGhhLCBpc0JldGEsIGlzU3RhZ2luZyB9IGZyb20gJy4uL3V0aWwvdmVyc2lvbic7XG5pbXBvcnQgeyBzdHJpY3RBc3NlcnQgfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5cbmltcG9ydCAqIGFzIHBhY2thZ2VKc29uIGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQge1xuICBoZXhUb0JpbmFyeSxcbiAgdmVyaWZ5U2lnbmF0dXJlLFxuICBnZXRTaWduYXR1cmVGaWxlTmFtZSxcbn0gZnJvbSAnLi9zaWduYXR1cmUnO1xuaW1wb3J0IHsgaXNQYXRoSW5zaWRlIH0gZnJvbSAnLi4vdXRpbC9pc1BhdGhJbnNpZGUnO1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5nc0NoYW5uZWwgfSBmcm9tICcuLi9tYWluL3NldHRpbmdzQ2hhbm5lbCc7XG5cbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uL3R5cGVzL0xvZ2dpbmcnO1xuaW1wb3J0IHsgZ2V0R290T3B0aW9ucyB9IGZyb20gJy4vZ290JztcbmltcG9ydCB7IGNoZWNrSW50ZWdyaXR5LCBncmFjZWZ1bFJlbmFtZSB9IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgdHlwZSB7IFByZXBhcmVEb3dubG9hZFJlc3VsdFR5cGUgYXMgRGlmZmVyZW50aWFsRG93bmxvYWREYXRhVHlwZSB9IGZyb20gJy4vZGlmZmVyZW50aWFsJztcbmltcG9ydCB7XG4gIHByZXBhcmVEb3dubG9hZCBhcyBwcmVwYXJlRGlmZmVyZW50aWFsRG93bmxvYWQsXG4gIGRvd25sb2FkIGFzIGRvd25sb2FkRGlmZmVyZW50aWFsRGF0YSxcbiAgZ2V0QmxvY2tNYXBGaWxlTmFtZSxcbiAgaXNWYWxpZFByZXBhcmVkRGF0YSBhcyBpc1ZhbGlkRGlmZmVyZW50aWFsRGF0YSxcbn0gZnJvbSAnLi9kaWZmZXJlbnRpYWwnO1xuXG5jb25zdCBta2RpcnBQcm9taXNlID0gcGlmeShta2RpcnApO1xuY29uc3QgcmltcmFmUHJvbWlzZSA9IHBpZnkocmltcmFmKTtcblxuY29uc3QgSU5URVJWQUwgPSAzMCAqIGR1cmF0aW9ucy5NSU5VVEU7XG5cbnR5cGUgSlNPTlVwZGF0ZVNjaGVtYSA9IHtcbiAgdmVyc2lvbjogc3RyaW5nO1xuICBmaWxlczogQXJyYXk8e1xuICAgIHVybDogc3RyaW5nO1xuICAgIHNoYTUxMjogc3RyaW5nO1xuICAgIHNpemU6IHN0cmluZztcbiAgICBibG9ja01hcFNpemU/OiBzdHJpbmc7XG4gIH0+O1xuICBwYXRoOiBzdHJpbmc7XG4gIHNoYTUxMjogc3RyaW5nO1xuICByZWxlYXNlRGF0ZTogc3RyaW5nO1xuICByZXF1aXJlTWFudWFsVXBkYXRlPzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZUluZm9ybWF0aW9uVHlwZSA9IHtcbiAgZmlsZU5hbWU6IHN0cmluZztcbiAgc2l6ZTogbnVtYmVyO1xuICB2ZXJzaW9uOiBzdHJpbmc7XG4gIHNoYTUxMjogc3RyaW5nO1xuICBkaWZmZXJlbnRpYWxEYXRhOiBEaWZmZXJlbnRpYWxEb3dubG9hZERhdGFUeXBlIHwgdW5kZWZpbmVkO1xufTtcblxuZW51bSBEb3dubG9hZE1vZGUge1xuICBEaWZmZXJlbnRpYWxPbmx5ID0gJ0RpZmZlcmVudGlhbE9ubHknLFxuICBGdWxsT25seSA9ICdGdWxsT25seScsXG4gIEF1dG9tYXRpYyA9ICdBdXRvbWF0aWMnLFxufVxuXG50eXBlIERvd25sb2FkVXBkYXRlUmVzdWx0VHlwZSA9IFJlYWRvbmx5PHtcbiAgdXBkYXRlRmlsZVBhdGg6IHN0cmluZztcbiAgc2lnbmF0dXJlOiBCdWZmZXI7XG59PjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFVwZGF0ZXIge1xuICBwcm90ZWN0ZWQgZmlsZU5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBwcm90ZWN0ZWQgdmVyc2lvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIHByb3RlY3RlZCBjYWNoZWREaWZmZXJlbnRpYWxEYXRhOiBEaWZmZXJlbnRpYWxEb3dubG9hZERhdGFUeXBlIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgdGhyb3R0bGVkU2VuZERvd25sb2FkaW5nVXBkYXRlOiAoZG93bmxvYWRlZFNpemU6IG51bWJlcikgPT4gdm9pZDtcblxuICBwcml2YXRlIGFjdGl2ZURvd25sb2FkOiBQcm9taXNlPGJvb2xlYW4+IHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgbWFya2VkQ2Fubm90VXBkYXRlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGxvZ2dlcjogTG9nZ2VyVHlwZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNldHRpbmdzQ2hhbm5lbDogU2V0dGluZ3NDaGFubmVsLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBnZXRNYWluV2luZG93OiAoKSA9PiBCcm93c2VyV2luZG93IHwgdW5kZWZpbmVkXG4gICkge1xuICAgIHRoaXMudGhyb3R0bGVkU2VuZERvd25sb2FkaW5nVXBkYXRlID0gdGhyb3R0bGUoKGRvd25sb2FkZWRTaXplOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG1haW5XaW5kb3cgPSB0aGlzLmdldE1haW5XaW5kb3coKTtcbiAgICAgIG1haW5XaW5kb3c/LndlYkNvbnRlbnRzLnNlbmQoXG4gICAgICAgICdzaG93LXVwZGF0ZS1kaWFsb2cnLFxuICAgICAgICBEaWFsb2dUeXBlLkRvd25sb2FkaW5nLFxuICAgICAgICB7IGRvd25sb2FkZWRTaXplIH1cbiAgICAgICk7XG4gICAgfSwgNTAwKTtcbiAgfVxuXG4gIC8vXG4gIC8vIFB1YmxpYyBBUElzXG4gIC8vXG5cbiAgcHVibGljIGFzeW5jIGZvcmNlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrRm9yVXBkYXRlc01heWJlSW5zdGFsbCh0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzdGFydCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKCd1cGRhdGVyL3N0YXJ0OiBzdGFydGluZyBjaGVja3MuLi4nKTtcblxuICAgIHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMuY2hlY2tGb3JVcGRhdGVzTWF5YmVJbnN0YWxsKCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgdXBkYXRlci9zdGFydDogJHtFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpfWApO1xuICAgICAgfVxuICAgIH0sIElOVEVSVkFMKTtcblxuICAgIGF3YWl0IHRoaXMuZGVsZXRlUHJldmlvdXNJbnN0YWxsZXJzKCk7XG4gICAgYXdhaXQgdGhpcy5jaGVja0ZvclVwZGF0ZXNNYXliZUluc3RhbGwoKTtcbiAgfVxuXG4gIC8vXG4gIC8vIEFic3RyYWN0IG1ldGhvZHNcbiAgLy9cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgZGVsZXRlUHJldmlvdXNJbnN0YWxsZXJzKCk6IFByb21pc2U8dm9pZD47XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGluc3RhbGxVcGRhdGUodXBkYXRlRmlsZVBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XG5cbiAgLy9cbiAgLy8gUHJvdGVjdGVkIG1ldGhvZHNcbiAgLy9cblxuICBwcm90ZWN0ZWQgc2V0VXBkYXRlTGlzdGVuZXIoXG4gICAgcGVyZm9ybVVwZGF0ZUNhbGxiYWNrOiAoKSA9PiBQcm9taXNlPHZvaWQ+XG4gICk6IHZvaWQge1xuICAgIGlwY01haW4ucmVtb3ZlSGFuZGxlcignc3RhcnQtdXBkYXRlJyk7XG4gICAgaXBjTWFpbi5oYW5kbGVPbmNlKCdzdGFydC11cGRhdGUnLCBwZXJmb3JtVXBkYXRlQ2FsbGJhY2spO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcmtDYW5ub3RVcGRhdGUoXG4gICAgZXJyb3I6IEVycm9yLFxuICAgIGRpYWxvZ1R5cGUgPSBEaWFsb2dUeXBlLkNhbm5vdF9VcGRhdGVcbiAgKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWFya2VkQ2Fubm90VXBkYXRlKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKFxuICAgICAgICAndXBkYXRlci9tYXJrQ2Fubm90VXBkYXRlOiBhbHJlYWR5IG1hcmtlZCcsXG4gICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubWFya2VkQ2Fubm90VXBkYXRlID0gdHJ1ZTtcblxuICAgIHRoaXMubG9nZ2VyLmVycm9yKFxuICAgICAgJ3VwZGF0ZXIvbWFya0Nhbm5vdFVwZGF0ZTogbWFya2luZyBkdWUgdG8gZXJyb3I6ICcgK1xuICAgICAgICBgJHtFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpfSwgYCArXG4gICAgICAgIGBkaWFsb2dUeXBlOiAke2RpYWxvZ1R5cGV9YFxuICAgICk7XG5cbiAgICBjb25zdCBtYWluV2luZG93ID0gdGhpcy5nZXRNYWluV2luZG93KCk7XG4gICAgbWFpbldpbmRvdz8ud2ViQ29udGVudHMuc2VuZCgnc2hvdy11cGRhdGUtZGlhbG9nJywgZGlhbG9nVHlwZSk7XG5cbiAgICB0aGlzLnNldFVwZGF0ZUxpc3RlbmVyKGFzeW5jICgpID0+IHtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ3VwZGF0ZXIvbWFya0Nhbm5vdFVwZGF0ZTogcmV0cnlpbmcgYWZ0ZXIgdXNlciBhY3Rpb24nKTtcblxuICAgICAgdGhpcy5tYXJrZWRDYW5ub3RVcGRhdGUgPSBmYWxzZTtcbiAgICAgIGF3YWl0IHRoaXMuY2hlY2tGb3JVcGRhdGVzTWF5YmVJbnN0YWxsKCk7XG4gICAgfSk7XG4gIH1cblxuICAvL1xuICAvLyBQcml2YXRlIG1ldGhvZHNcbiAgLy9cblxuICBwcml2YXRlIGFzeW5jIGRvd25sb2FkQW5kSW5zdGFsbChcbiAgICB1cGRhdGVJbmZvOiBVcGRhdGVJbmZvcm1hdGlvblR5cGUsXG4gICAgbW9kZTogRG93bmxvYWRNb2RlXG4gICk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICh0aGlzLmFjdGl2ZURvd25sb2FkKSB7XG4gICAgICByZXR1cm4gdGhpcy5hY3RpdmVEb3dubG9hZDtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgdGhpcy5hY3RpdmVEb3dubG9hZCA9IHRoaXMuZG9Eb3dubG9hZEFuZEluc3RhbGwodXBkYXRlSW5mbywgbW9kZSk7XG5cbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmFjdGl2ZURvd25sb2FkO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLmFjdGl2ZURvd25sb2FkID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZG9Eb3dubG9hZEFuZEluc3RhbGwoXG4gICAgdXBkYXRlSW5mbzogVXBkYXRlSW5mb3JtYXRpb25UeXBlLFxuICAgIG1vZGU6IERvd25sb2FkTW9kZVxuICApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCB7IGxvZ2dlciB9ID0gdGhpcztcblxuICAgIGNvbnN0IHsgZmlsZU5hbWU6IG5ld0ZpbGVOYW1lLCB2ZXJzaW9uOiBuZXdWZXJzaW9uIH0gPSB1cGRhdGVJbmZvO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG9sZFZlcnNpb24gPSB0aGlzLnZlcnNpb247XG4gICAgICB0aGlzLnZlcnNpb24gPSBuZXdWZXJzaW9uO1xuXG4gICAgICBsZXQgZG93bmxvYWRSZXN1bHQ6IERvd25sb2FkVXBkYXRlUmVzdWx0VHlwZSB8IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZG93bmxvYWRSZXN1bHQgPSBhd2FpdCB0aGlzLmRvd25sb2FkVXBkYXRlKHVwZGF0ZUluZm8sIG1vZGUpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gUmVzdG9yZSBzdGF0ZSBpbiBjYXNlIG9mIGRvd25sb2FkIGVycm9yXG4gICAgICAgIHRoaXMudmVyc2lvbiA9IG9sZFZlcnNpb247XG5cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGlmICghZG93bmxvYWRSZXN1bHQpIHtcbiAgICAgICAgbG9nZ2VyLndhcm4oJ2Rvd25sb2FkQW5kSW5zdGFsbDogbm8gdXBkYXRlIHdhcyBkb3dubG9hZGVkJyk7XG4gICAgICAgIHN0cmljdEFzc2VydChcbiAgICAgICAgICBtb2RlICE9PSBEb3dubG9hZE1vZGUuQXV0b21hdGljICYmIG1vZGUgIT09IERvd25sb2FkTW9kZS5GdWxsT25seSxcbiAgICAgICAgICAnQXV0b21hdGljIGFuZCBmdWxsIG1vZGUgZG93bmxvYWRzIGFyZSBndWFyYW50ZWVkIHRvIGhhcHBlbiBvciBlcnJvcidcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IHVwZGF0ZUZpbGVQYXRoLCBzaWduYXR1cmUgfSA9IGRvd25sb2FkUmVzdWx0O1xuXG4gICAgICBjb25zdCBwdWJsaWNLZXkgPSBoZXhUb0JpbmFyeShjb25maWcuZ2V0KCd1cGRhdGVzUHVibGljS2V5JykpO1xuICAgICAgY29uc3QgdmVyaWZpZWQgPSBhd2FpdCB2ZXJpZnlTaWduYXR1cmUoXG4gICAgICAgIHVwZGF0ZUZpbGVQYXRoLFxuICAgICAgICB0aGlzLnZlcnNpb24sXG4gICAgICAgIHNpZ25hdHVyZSxcbiAgICAgICAgcHVibGljS2V5XG4gICAgICApO1xuICAgICAgaWYgKCF2ZXJpZmllZCkge1xuICAgICAgICAvLyBOb3RlOiBXZSBkb24ndCBkZWxldGUgdGhlIGNhY2hlIGhlcmUsIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0byBjb250aW51YWxseVxuICAgICAgICAvLyAgIHJlLWRvd25sb2FkIHRoZSBicm9rZW4gcmVsZWFzZS4gV2Ugd2lsbCBkb3dubG9hZCBpdCBvbmx5IG9uY2UgcGVyIGxhdW5jaC5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdEb3dubG9hZGVkIHVwZGF0ZSBkaWQgbm90IHBhc3Mgc2lnbmF0dXJlIHZlcmlmaWNhdGlvbiAnICtcbiAgICAgICAgICAgIGAodmVyc2lvbjogJyR7dGhpcy52ZXJzaW9ufSc7IGZpbGVOYW1lOiAnJHtuZXdGaWxlTmFtZX0nKWBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgdGhpcy5pbnN0YWxsVXBkYXRlKHVwZGF0ZUZpbGVQYXRoKTtcblxuICAgICAgY29uc3QgbWFpbldpbmRvdyA9IHRoaXMuZ2V0TWFpbldpbmRvdygpO1xuICAgICAgaWYgKG1haW5XaW5kb3cpIHtcbiAgICAgICAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5zZW5kKCdzaG93LXVwZGF0ZS1kaWFsb2cnLCBEaWFsb2dUeXBlLlVwZGF0ZSwge1xuICAgICAgICAgIHZlcnNpb246IHRoaXMudmVyc2lvbixcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2dnZXIud2FybihcbiAgICAgICAgICAnZG93bmxvYWRBbmRJbnN0YWxsOiBubyBtYWluV2luZG93LCBjYW5ub3Qgc2hvdyB1cGRhdGUgZGlhbG9nJ1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyLmVycm9yKGBkb3dubG9hZEFuZEluc3RhbGw6ICR7RXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKX1gKTtcbiAgICAgIHRoaXMubWFya0Nhbm5vdFVwZGF0ZShlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGNoZWNrRm9yVXBkYXRlc01heWJlSW5zdGFsbChmb3JjZSA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBsb2dnZXIgfSA9IHRoaXM7XG5cbiAgICBsb2dnZXIuaW5mbygnY2hlY2tGb3JVcGRhdGVzTWF5YmVJbnN0YWxsOiBjaGVja2luZyBmb3IgdXBkYXRlLi4uJyk7XG4gICAgY29uc3QgdXBkYXRlSW5mbyA9IGF3YWl0IHRoaXMuY2hlY2tGb3JVcGRhdGVzKGZvcmNlKTtcbiAgICBpZiAoIXVwZGF0ZUluZm8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IHZlcnNpb246IG5ld1ZlcnNpb24gfSA9IHVwZGF0ZUluZm87XG5cbiAgICBpZiAoIWZvcmNlICYmIHRoaXMudmVyc2lvbiAmJiAhZ3QobmV3VmVyc2lvbiwgdGhpcy52ZXJzaW9uKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGF1dG9Eb3dubG9hZFVwZGF0ZXMgPSBhd2FpdCB0aGlzLmdldEF1dG9Eb3dubG9hZFVwZGF0ZVNldHRpbmcoKTtcbiAgICBpZiAoYXV0b0Rvd25sb2FkVXBkYXRlcykge1xuICAgICAgYXdhaXQgdGhpcy5kb3dubG9hZEFuZEluc3RhbGwodXBkYXRlSW5mbywgRG93bmxvYWRNb2RlLkF1dG9tYXRpYyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG1vZGUgPSBEb3dubG9hZE1vZGUuRnVsbE9ubHk7XG4gICAgaWYgKHVwZGF0ZUluZm8uZGlmZmVyZW50aWFsRGF0YSkge1xuICAgICAgbW9kZSA9IERvd25sb2FkTW9kZS5EaWZmZXJlbnRpYWxPbmx5O1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMub2ZmZXJVcGRhdGUodXBkYXRlSW5mbywgbW9kZSwgMCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIG9mZmVyVXBkYXRlKFxuICAgIHVwZGF0ZUluZm86IFVwZGF0ZUluZm9ybWF0aW9uVHlwZSxcbiAgICBtb2RlOiBEb3dubG9hZE1vZGUsXG4gICAgYXR0ZW1wdDogbnVtYmVyXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgbG9nZ2VyIH0gPSB0aGlzO1xuXG4gICAgdGhpcy5zZXRVcGRhdGVMaXN0ZW5lcihhc3luYyAoKSA9PiB7XG4gICAgICBsb2dnZXIuaW5mbygnb2ZmZXJVcGRhdGU6IGhhdmUgbm90IGRvd25sb2FkZWQgdXBkYXRlLCBnb2luZyB0byBkb3dubG9hZCcpO1xuXG4gICAgICBjb25zdCBkaWREb3dubG9hZCA9IGF3YWl0IHRoaXMuZG93bmxvYWRBbmRJbnN0YWxsKHVwZGF0ZUluZm8sIG1vZGUpO1xuICAgICAgaWYgKCFkaWREb3dubG9hZCAmJiBtb2RlID09PSBEb3dubG9hZE1vZGUuRGlmZmVyZW50aWFsT25seSkge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKFxuICAgICAgICAgICdvZmZlclVwZGF0ZTogRmFpbGVkIHRvIGRvd25sb2FkIGRpZmZlcmVudGlhbCB1cGRhdGUsIG9mZmVyaW5nIGZ1bGwnXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub2ZmZXJVcGRhdGUodXBkYXRlSW5mbywgRG93bmxvYWRNb2RlLkZ1bGxPbmx5LCBhdHRlbXB0ICsgMSk7XG4gICAgICB9XG5cbiAgICAgIHN0cmljdEFzc2VydChkaWREb3dubG9hZCwgJ0Z1bGxPbmx5IG11c3QgYWx3YXlzIGRvd25sb2FkIHVwZGF0ZScpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbWFpbldpbmRvdyA9IHRoaXMuZ2V0TWFpbldpbmRvdygpO1xuICAgIGlmICghbWFpbldpbmRvdykge1xuICAgICAgbG9nZ2VyLndhcm4oJ29mZmVyVXBkYXRlOiBubyBtYWluV2luZG93LCBjYW5ub3Qgc2hvdyB1cGRhdGUgZGlhbG9nJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGRvd25sb2FkU2l6ZTogbnVtYmVyO1xuICAgIGlmIChtb2RlID09PSBEb3dubG9hZE1vZGUuRGlmZmVyZW50aWFsT25seSkge1xuICAgICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgICB1cGRhdGVJbmZvLmRpZmZlcmVudGlhbERhdGEsXG4gICAgICAgICdNdXN0IGhhdmUgZGlmZmVyZW50aWFsIGRhdGEgaW4gRGlmZmVyZW50aWFsT25seSBtb2RlJ1xuICAgICAgKTtcbiAgICAgIGRvd25sb2FkU2l6ZSA9IHVwZGF0ZUluZm8uZGlmZmVyZW50aWFsRGF0YS5kb3dubG9hZFNpemU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvd25sb2FkU2l6ZSA9IHVwZGF0ZUluZm8uc2l6ZTtcbiAgICB9XG5cbiAgICBsb2dnZXIuaW5mbyhgb2ZmZXJVcGRhdGU6IG9mZmVyaW5nICR7bW9kZX0gdXBkYXRlYCk7XG4gICAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5zZW5kKFxuICAgICAgJ3Nob3ctdXBkYXRlLWRpYWxvZycsXG4gICAgICBhdHRlbXB0ID09PSAwID8gRGlhbG9nVHlwZS5Eb3dubG9hZFJlYWR5IDogRGlhbG9nVHlwZS5GdWxsRG93bmxvYWRSZWFkeSxcbiAgICAgIHtcbiAgICAgICAgZG93bmxvYWRTaXplLFxuICAgICAgICBkb3dubG9hZE1vZGU6IG1vZGUsXG4gICAgICAgIHZlcnNpb246IHVwZGF0ZUluZm8udmVyc2lvbixcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjaGVja0ZvclVwZGF0ZXMoXG4gICAgZm9yY2VVcGRhdGUgPSBmYWxzZVxuICApOiBQcm9taXNlPFVwZGF0ZUluZm9ybWF0aW9uVHlwZSB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IHlhbWwgPSBhd2FpdCBnZXRVcGRhdGVZYW1sKCk7XG4gICAgY29uc3QgcGFyc2VkWWFtbCA9IHBhcnNlWWFtbCh5YW1sKTtcblxuICAgIGlmIChwYXJzZWRZYW1sLnJlcXVpcmVNYW51YWxVcGRhdGUpIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ2NoZWNrRm9yVXBkYXRlczogbWFudWFsIHVwZGF0ZSByZXF1aXJlZCcpO1xuICAgICAgdGhpcy5tYXJrQ2Fubm90VXBkYXRlKFxuICAgICAgICBuZXcgRXJyb3IoJ3lhbWwgZmlsZSBoYXMgcmVxdWlyZU1hbnVhbFVwZGF0ZSBmbGFnJyksXG4gICAgICAgIERpYWxvZ1R5cGUuQ2Fubm90X1VwZGF0ZV9SZXF1aXJlX01hbnVhbFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJzaW9uID0gZ2V0VmVyc2lvbihwYXJzZWRZYW1sKTtcblxuICAgIGlmICghdmVyc2lvbikge1xuICAgICAgdGhpcy5sb2dnZXIud2FybihcbiAgICAgICAgJ2NoZWNrRm9yVXBkYXRlczogbm8gdmVyc2lvbiBleHRyYWN0ZWQgZnJvbSBkb3dubG9hZGVkIHlhbWwnXG4gICAgICApO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFmb3JjZVVwZGF0ZSAmJiAhaXNWZXJzaW9uTmV3ZXIodmVyc2lvbikpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oXG4gICAgICAgIGBjaGVja0ZvclVwZGF0ZXM6ICR7dmVyc2lvbn0gaXMgbm90IG5ld2VyIHRoYW4gJHtwYWNrYWdlSnNvbi52ZXJzaW9ufTsgYCArXG4gICAgICAgICAgJ25vIG5ldyB1cGRhdGUgYXZhaWxhYmxlJ1xuICAgICAgKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmluZm8oXG4gICAgICBgY2hlY2tGb3JVcGRhdGVzOiBmb3VuZCBuZXdlciB2ZXJzaW9uICR7dmVyc2lvbn0gYCArXG4gICAgICAgIGBmb3JjZVVwZGF0ZT0ke2ZvcmNlVXBkYXRlfWBcbiAgICApO1xuXG4gICAgY29uc3QgZmlsZU5hbWUgPSBnZXRVcGRhdGVGaWxlTmFtZShcbiAgICAgIHBhcnNlZFlhbWwsXG4gICAgICBwcm9jZXNzLnBsYXRmb3JtLFxuICAgICAgYXdhaXQgdGhpcy5nZXRBcmNoKClcbiAgICApO1xuXG4gICAgY29uc3Qgc2hhNTEyID0gZ2V0U0hBNTEyKHBhcnNlZFlhbWwsIGZpbGVOYW1lKTtcbiAgICBzdHJpY3RBc3NlcnQoc2hhNTEyICE9PSB1bmRlZmluZWQsICdNaXNzaW5nIHJlcXVpcmVkIGhhc2gnKTtcblxuICAgIGNvbnN0IGxhdGVzdEluc3RhbGxlciA9IGF3YWl0IHRoaXMuZ2V0TGF0ZXN0Q2FjaGVkSW5zdGFsbGVyKFxuICAgICAgZXh0bmFtZShmaWxlTmFtZSlcbiAgICApO1xuXG4gICAgbGV0IGRpZmZlcmVudGlhbERhdGE6IERpZmZlcmVudGlhbERvd25sb2FkRGF0YVR5cGUgfCB1bmRlZmluZWQ7XG4gICAgaWYgKGxhdGVzdEluc3RhbGxlcikge1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcbiAgICAgICAgYGNoZWNrRm9yVXBkYXRlczogRm91bmQgbG9jYWwgaW5zdGFsbGVyICR7bGF0ZXN0SW5zdGFsbGVyfWBcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGRpZmZPcHRpb25zID0ge1xuICAgICAgICBvbGRGaWxlOiBsYXRlc3RJbnN0YWxsZXIsXG4gICAgICAgIG5ld1VybDogYCR7Z2V0VXBkYXRlc0Jhc2UoKX0vJHtmaWxlTmFtZX1gLFxuICAgICAgICBzaGE1MTIsXG4gICAgICB9O1xuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuY2FjaGVkRGlmZmVyZW50aWFsRGF0YSAmJlxuICAgICAgICBpc1ZhbGlkRGlmZmVyZW50aWFsRGF0YSh0aGlzLmNhY2hlZERpZmZlcmVudGlhbERhdGEsIGRpZmZPcHRpb25zKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ2NoZWNrRm9yVXBkYXRlczogdXNpbmcgY2FjaGVkIGRpZmZlcmVudGlhbCBkYXRhJyk7XG5cbiAgICAgICAgZGlmZmVyZW50aWFsRGF0YSA9IHRoaXMuY2FjaGVkRGlmZmVyZW50aWFsRGF0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZGlmZmVyZW50aWFsRGF0YSA9IGF3YWl0IHByZXBhcmVEaWZmZXJlbnRpYWxEb3dubG9hZChkaWZmT3B0aW9ucyk7XG5cbiAgICAgICAgICB0aGlzLmNhY2hlZERpZmZlcmVudGlhbERhdGEgPSBkaWZmZXJlbnRpYWxEYXRhO1xuXG4gICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcbiAgICAgICAgICAgICdjaGVja0ZvclVwZGF0ZXM6IGRpZmZlcmVudGlhbCBkb3dubG9hZCBzaXplJyxcbiAgICAgICAgICAgIGRpZmZlcmVudGlhbERhdGEuZG93bmxvYWRTaXplXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgICdjaGVja0ZvclVwZGF0ZXM6IEZhaWxlZCB0byBwcmVwYXJlIGRpZmZlcmVudGlhbCB1cGRhdGUnLFxuICAgICAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKVxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5jYWNoZWREaWZmZXJlbnRpYWxEYXRhID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGZpbGVOYW1lLFxuICAgICAgc2l6ZTogZ2V0U2l6ZShwYXJzZWRZYW1sLCBmaWxlTmFtZSksXG4gICAgICB2ZXJzaW9uLFxuICAgICAgc2hhNTEyLFxuICAgICAgZGlmZmVyZW50aWFsRGF0YSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRMYXRlc3RDYWNoZWRJbnN0YWxsZXIoXG4gICAgZXh0ZW5zaW9uOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxzdHJpbmcgfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCBjYWNoZURpciA9IGF3YWl0IGNyZWF0ZVVwZGF0ZUNhY2hlRGlySWZOZWVkZWQoKTtcbiAgICBjb25zdCBvbGRGaWxlcyA9IChhd2FpdCByZWFkZGlyKGNhY2hlRGlyKSkubWFwKGZpbGVOYW1lID0+IHtcbiAgICAgIHJldHVybiBqb2luKGNhY2hlRGlyLCBmaWxlTmFtZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2xkRmlsZXMuZmluZChmaWxlTmFtZSA9PiBleHRuYW1lKGZpbGVOYW1lKSA9PT0gZXh0ZW5zaW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZG93bmxvYWRVcGRhdGUoXG4gICAgeyBmaWxlTmFtZSwgc2hhNTEyLCBkaWZmZXJlbnRpYWxEYXRhIH06IFVwZGF0ZUluZm9ybWF0aW9uVHlwZSxcbiAgICBtb2RlOiBEb3dubG9hZE1vZGVcbiAgKTogUHJvbWlzZTxEb3dubG9hZFVwZGF0ZVJlc3VsdFR5cGUgfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCBiYXNlVXJsID0gZ2V0VXBkYXRlc0Jhc2UoKTtcbiAgICBjb25zdCB1cGRhdGVGaWxlVXJsID0gYCR7YmFzZVVybH0vJHtmaWxlTmFtZX1gO1xuXG4gICAgY29uc3QgdXBkYXRlT25Qcm9ncmVzcyA9IG1vZGUgIT09IERvd25sb2FkTW9kZS5BdXRvbWF0aWM7XG5cbiAgICBjb25zdCBzaWduYXR1cmVGaWxlTmFtZSA9IGdldFNpZ25hdHVyZUZpbGVOYW1lKGZpbGVOYW1lKTtcbiAgICBjb25zdCBibG9ja01hcEZpbGVOYW1lID0gZ2V0QmxvY2tNYXBGaWxlTmFtZShmaWxlTmFtZSk7XG4gICAgY29uc3Qgc2lnbmF0dXJlVXJsID0gYCR7YmFzZVVybH0vJHtzaWduYXR1cmVGaWxlTmFtZX1gO1xuICAgIGNvbnN0IGJsb2NrTWFwVXJsID0gYCR7YmFzZVVybH0vJHtibG9ja01hcEZpbGVOYW1lfWA7XG5cbiAgICBsZXQgY2FjaGVEaXIgPSBhd2FpdCBjcmVhdGVVcGRhdGVDYWNoZURpcklmTmVlZGVkKCk7XG4gICAgY29uc3QgdGFyZ2V0VXBkYXRlUGF0aCA9IGpvaW4oY2FjaGVEaXIsIGZpbGVOYW1lKTtcblxuICAgIGNvbnN0IHRlbXBEaXIgPSBhd2FpdCBjcmVhdGVUZW1wRGlyKCk7XG5cbiAgICBjb25zdCB0ZW1wVXBkYXRlUGF0aCA9IGpvaW4odGVtcERpciwgZmlsZU5hbWUpO1xuICAgIGNvbnN0IHRlbXBCbG9ja01hcFBhdGggPSBqb2luKHRlbXBEaXIsIGJsb2NrTWFwRmlsZU5hbWUpO1xuXG4gICAgLy8gSWYgdHJ1ZSAtIHdlIHdpbGwgYXR0ZW1wdCB0byBpbnN0YWxsIGZyb20gYSB0ZW1wb3JhcnkgZGlyZWN0b3J5LlxuICAgIGxldCB0ZW1wUGF0aEZhaWxvdmVyID0gZmFsc2U7XG5cbiAgICB0cnkge1xuICAgICAgdmFsaWRhdGVQYXRoKGNhY2hlRGlyLCB0YXJnZXRVcGRhdGVQYXRoKTtcblxuICAgICAgdmFsaWRhdGVQYXRoKHRlbXBEaXIsIHRlbXBVcGRhdGVQYXRoKTtcbiAgICAgIHZhbGlkYXRlUGF0aCh0ZW1wRGlyLCB0ZW1wQmxvY2tNYXBQYXRoKTtcblxuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgZG93bmxvYWRVcGRhdGU6IERvd25sb2FkaW5nIHNpZ25hdHVyZSAke3NpZ25hdHVyZVVybH1gKTtcbiAgICAgIGNvbnN0IHNpZ25hdHVyZSA9IEJ1ZmZlci5mcm9tKFxuICAgICAgICBhd2FpdCBnb3Qoc2lnbmF0dXJlVXJsLCBnZXRHb3RPcHRpb25zKCkpLnRleHQoKSxcbiAgICAgICAgJ2hleCdcbiAgICAgICk7XG5cbiAgICAgIGlmIChkaWZmZXJlbnRpYWxEYXRhKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYGRvd25sb2FkVXBkYXRlOiBTYXZpbmcgYmxvY2ttYXAgJHtibG9ja01hcFVybH1gKTtcbiAgICAgICAgYXdhaXQgd3JpdGVGaWxlKHRlbXBCbG9ja01hcFBhdGgsIGRpZmZlcmVudGlhbERhdGEubmV3QmxvY2tNYXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKFxuICAgICAgICAgICAgYGRvd25sb2FkVXBkYXRlOiBEb3dubG9hZGluZyBibG9ja21hcCAke2Jsb2NrTWFwVXJsfWBcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IGJsb2NrTWFwID0gYXdhaXQgZ290KGJsb2NrTWFwVXJsLCBnZXRHb3RPcHRpb25zKCkpLmJ1ZmZlcigpO1xuICAgICAgICAgIGF3YWl0IHdyaXRlRmlsZSh0ZW1wQmxvY2tNYXBQYXRoLCBibG9ja01hcCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2FybihcbiAgICAgICAgICAgICdkb3dubG9hZFVwZGF0ZTogRmFpbGVkIHRvIGRvd25sb2FkIGJsb2NrbWFwLCBjb250aW51aW5nJyxcbiAgICAgICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBnb3RVcGRhdGUgPSBmYWxzZTtcbiAgICAgIGlmICghZ290VXBkYXRlICYmIChhd2FpdCBwYXRoRXhpc3RzKHRhcmdldFVwZGF0ZVBhdGgpKSkge1xuICAgICAgICBjb25zdCBjaGVja1Jlc3VsdCA9IGF3YWl0IGNoZWNrSW50ZWdyaXR5KHRhcmdldFVwZGF0ZVBhdGgsIHNoYTUxMik7XG4gICAgICAgIGlmIChjaGVja1Jlc3VsdC5vaykge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oXG4gICAgICAgICAgICBgZG93bmxvYWRVcGRhdGU6IE5vdCBkb3dubG9hZGluZyB1cGRhdGUgJHt1cGRhdGVGaWxlVXJsfSwgYCArXG4gICAgICAgICAgICAgICdsb2NhbCBmaWxlIGhhcyB0aGUgc2FtZSBoYXNoJ1xuICAgICAgICAgICk7XG5cbiAgICAgICAgICAvLyBNb3ZlIGZpbGUgaW50byBkb3dubG9hZHMgZGlyZWN0b3J5XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IGdyYWNlZnVsUmVuYW1lKHRoaXMubG9nZ2VyLCB0YXJnZXRVcGRhdGVQYXRoLCB0ZW1wVXBkYXRlUGF0aCk7XG4gICAgICAgICAgICBnb3RVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgICAgJ2Rvd25sb2FkVXBkYXRlOiBmYWlsZWQgdG8gbW92ZSBhbHJlYWR5IGRvd25sb2FkZWQgZmlsZScsXG4gICAgICAgICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFxuICAgICAgICAgICAgJ2Rvd25sb2FkVXBkYXRlOiBpbnRlZ3JpdHkgY2hlY2sgZmFpbHVyZScsXG4gICAgICAgICAgICBjaGVja1Jlc3VsdC5lcnJvclxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNEaWZmZXJlbnRpYWxFbmFibGVkID1cbiAgICAgICAgZGlmZmVyZW50aWFsRGF0YSAmJiBtb2RlICE9PSBEb3dubG9hZE1vZGUuRnVsbE9ubHk7XG4gICAgICBpZiAoIWdvdFVwZGF0ZSAmJiBpc0RpZmZlcmVudGlhbEVuYWJsZWQpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcbiAgICAgICAgICBgZG93bmxvYWRVcGRhdGU6IERvd25sb2FkaW5nIGRpZmZlcmVudGlhbCB1cGRhdGUgJHt1cGRhdGVGaWxlVXJsfWBcbiAgICAgICAgKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IGRvd25sb2FkRGlmZmVyZW50aWFsRGF0YSh0ZW1wVXBkYXRlUGF0aCwgZGlmZmVyZW50aWFsRGF0YSwge1xuICAgICAgICAgICAgc3RhdHVzQ2FsbGJhY2s6IHVwZGF0ZU9uUHJvZ3Jlc3NcbiAgICAgICAgICAgICAgPyB0aGlzLnRocm90dGxlZFNlbmREb3dubG9hZGluZ1VwZGF0ZVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGxvZ2dlcjogdGhpcy5sb2dnZXIsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBnb3RVcGRhdGUgPSB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFxuICAgICAgICAgICAgJ2Rvd25sb2FkVXBkYXRlOiBGYWlsZWQgdG8gYXBwbHkgZGlmZmVyZW50aWFsIHVwZGF0ZScsXG4gICAgICAgICAgICBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpc0Z1bGxFbmFibGVkID0gbW9kZSAhPT0gRG93bmxvYWRNb2RlLkRpZmZlcmVudGlhbE9ubHk7XG4gICAgICBpZiAoIWdvdFVwZGF0ZSAmJiBpc0Z1bGxFbmFibGVkKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oXG4gICAgICAgICAgYGRvd25sb2FkVXBkYXRlOiBEb3dubG9hZGluZyBmdWxsIHVwZGF0ZSAke3VwZGF0ZUZpbGVVcmx9YFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIFdlIGNvdWxkIGhhdmUgZmFpbGVkIHRvIHVwZGF0ZSBkaWZmZXJlbnRpYWxseSBkdWUgdG8gbG93IGZyZWUgZGlza1xuICAgICAgICAvLyBzcGFjZS4gUmVtb3ZlIGFsbCBjYWNoZWQgdXBkYXRlcyBzaW5jZSB3ZSBhcmUgZG9pbmcgYSBmdWxsIGRvd25sb2FkXG4gICAgICAgIC8vIGFueXdheS5cbiAgICAgICAgYXdhaXQgcmltcmFmUHJvbWlzZShjYWNoZURpcik7XG4gICAgICAgIGNhY2hlRGlyID0gYXdhaXQgY3JlYXRlVXBkYXRlQ2FjaGVEaXJJZk5lZWRlZCgpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMuZG93bmxvYWRBbmRSZXBvcnQoXG4gICAgICAgICAgdXBkYXRlRmlsZVVybCxcbiAgICAgICAgICB0ZW1wVXBkYXRlUGF0aCxcbiAgICAgICAgICB1cGRhdGVPblByb2dyZXNzXG4gICAgICAgICk7XG4gICAgICAgIGdvdFVwZGF0ZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghZ290VXBkYXRlKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oXG4gICAgICAgICdkb3dubG9hZFVwZGF0ZTogRG93bmxvYWRlZCB1cGRhdGUsIG1vdmluZyBpbnRvIGNhY2hlIGRpcidcbiAgICAgICk7XG5cbiAgICAgIC8vIEJhY2t1cCBvbGQgZmlsZXNcbiAgICAgIGNvbnN0IHJlc3RvcmVEaXIgPSBhd2FpdCBnZXRUZW1wRGlyKCk7XG4gICAgICBhd2FpdCBncmFjZWZ1bFJlbmFtZSh0aGlzLmxvZ2dlciwgY2FjaGVEaXIsIHJlc3RvcmVEaXIpO1xuXG4gICAgICAvLyBNb3ZlIHRoZSBmaWxlcyBpbnRvIHRoZSBmaW5hbCBwb3NpdGlvblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgZ3JhY2VmdWxSZW5hbWUodGhpcy5sb2dnZXIsIHRlbXBEaXIsIGNhY2hlRGlyKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gQXR0ZW1wdCB0byByZXN0b3JlIG9sZCBmaWxlc1xuICAgICAgICAgIGF3YWl0IGdyYWNlZnVsUmVuYW1lKHRoaXMubG9nZ2VyLCByZXN0b3JlRGlyLCBjYWNoZURpcik7XG4gICAgICAgIH0gY2F0Y2ggKHJlc3RvcmVFcnJvcikge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXG4gICAgICAgICAgICAnZG93bmxvYWRVcGRhdGU6IEZhaWxlZCB0byByZXN0b3JlIGZyb20gYmFja3VwIGZvbGRlciwgaWdub3JpbmcnLFxuICAgICAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KHJlc3RvcmVFcnJvcilcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihcbiAgICAgICAgICAnZG93bmxvYWRVcGRhdGU6IHJ1bm5pbmcgdXBkYXRlIGZyb20gYSB0ZW1wb3JhcnkgZm9sZGVyIGR1ZSB0byBlcnJvcicsXG4gICAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKVxuICAgICAgICApO1xuICAgICAgICB0ZW1wUGF0aEZhaWxvdmVyID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHsgdXBkYXRlRmlsZVBhdGg6IHRlbXBVcGRhdGVQYXRoLCBzaWduYXR1cmUgfTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgZGVsZXRlVGVtcERpcihyZXN0b3JlRGlyKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXG4gICAgICAgICAgJ2Rvd25sb2FkVXBkYXRlOiBGYWlsZWQgdG8gcmVtb3ZlIGJhY2t1cCBmb2xkZXIsIGlnbm9yaW5nJyxcbiAgICAgICAgICBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7IHVwZGF0ZUZpbGVQYXRoOiB0YXJnZXRVcGRhdGVQYXRoLCBzaWduYXR1cmUgfTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKCF0ZW1wUGF0aEZhaWxvdmVyKSB7XG4gICAgICAgIGF3YWl0IGRlbGV0ZVRlbXBEaXIodGVtcERpcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBkb3dubG9hZEFuZFJlcG9ydChcbiAgICB1cGRhdGVGaWxlVXJsOiBzdHJpbmcsXG4gICAgdGFyZ2V0VXBkYXRlUGF0aDogc3RyaW5nLFxuICAgIHVwZGF0ZU9uUHJvZ3Jlc3MgPSBmYWxzZVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBkb3dubG9hZFN0cmVhbSA9IGdvdC5zdHJlYW0odXBkYXRlRmlsZVVybCwgZ2V0R290T3B0aW9ucygpKTtcbiAgICBjb25zdCB3cml0ZVN0cmVhbSA9IGNyZWF0ZVdyaXRlU3RyZWFtKHRhcmdldFVwZGF0ZVBhdGgpO1xuXG4gICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHVwZGF0ZU9uUHJvZ3Jlc3MpIHtcbiAgICAgICAgbGV0IGRvd25sb2FkZWRTaXplID0gMDtcblxuICAgICAgICBkb3dubG9hZFN0cmVhbS5vbignZGF0YScsIGRhdGEgPT4ge1xuICAgICAgICAgIGRvd25sb2FkZWRTaXplICs9IGRhdGEubGVuZ3RoO1xuICAgICAgICAgIHRoaXMudGhyb3R0bGVkU2VuZERvd25sb2FkaW5nVXBkYXRlKGRvd25sb2FkZWRTaXplKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGRvd25sb2FkU3RyZWFtLm9uKCdlcnJvcicsIGVycm9yID0+IHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0pO1xuICAgICAgZG93bmxvYWRTdHJlYW0ub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHdyaXRlU3RyZWFtLm9uKCdlcnJvcicsIGVycm9yID0+IHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0pO1xuXG4gICAgICBkb3dubG9hZFN0cmVhbS5waXBlKHdyaXRlU3RyZWFtKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZ2V0QXV0b0Rvd25sb2FkVXBkYXRlU2V0dGluZygpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2V0dGluZ3NDaGFubmVsLmdldFNldHRpbmdGcm9tTWFpbldpbmRvdyhcbiAgICAgICAgJ2F1dG9Eb3dubG9hZFVwZGF0ZSdcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oXG4gICAgICAgICdnZXRBdXRvRG93bmxvYWRVcGRhdGVTZXR0aW5nOiBGYWlsZWQgdG8gZmV0Y2gsIHJldHVybmluZyBmYWxzZScsXG4gICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRBcmNoKCk6IFByb21pc2U8dHlwZW9mIHByb2Nlc3MuYXJjaD4ge1xuICAgIGlmIChwcm9jZXNzLnBsYXRmb3JtICE9PSAnZGFyd2luJyB8fCBwcm9jZXNzLmFyY2ggPT09ICdhcm02NCcpIHtcbiAgICAgIHJldHVybiBwcm9jZXNzLmFyY2g7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vIFdlIG1pZ2h0IGJlIHJ1bm5pbmcgdW5kZXIgUm9zZXR0YVxuICAgICAgY29uc3QgZmxhZyA9ICdzeXNjdGwucHJvY190cmFuc2xhdGVkJztcbiAgICAgIGNvbnN0IHsgc3Rkb3V0IH0gPSBhd2FpdCBwcm9taXNpZnkoZXhlY0ZpbGUpKCdzeXNjdGwnLCBbJy1pJywgZmxhZ10pO1xuXG4gICAgICBpZiAoc3Rkb3V0LmluY2x1ZGVzKGAke2ZsYWd9OiAxYCkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygndXBkYXRlcjogcnVubmluZyB1bmRlciBSb3NldHRhJyk7XG4gICAgICAgIHJldHVybiAnYXJtNjQnO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKFxuICAgICAgICBgdXBkYXRlcjogUm9zZXR0YSBkZXRlY3Rpb24gZmFpbGVkIHdpdGggJHtFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5sb2dnZXIuaW5mbygndXBkYXRlcjogbm90IHJ1bm5pbmcgdW5kZXIgUm9zZXR0YScpO1xuICAgIHJldHVybiBwcm9jZXNzLmFyY2g7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlUGF0aChiYXNlUGF0aDogc3RyaW5nLCB0YXJnZXRQYXRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZSh0YXJnZXRQYXRoKTtcblxuICBpZiAoIWlzUGF0aEluc2lkZShub3JtYWxpemVkLCBiYXNlUGF0aCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgdmFsaWRhdGVQYXRoOiBQYXRoICR7bm9ybWFsaXplZH0gaXMgbm90IHVuZGVyIGJhc2UgcGF0aCAke2Jhc2VQYXRofWBcbiAgICApO1xuICB9XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbnNcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVwZGF0ZUNoZWNrVXJsKCk6IHN0cmluZyB7XG4gIHJldHVybiBgJHtnZXRVcGRhdGVzQmFzZSgpfS8ke2dldFVwZGF0ZXNGaWxlTmFtZSgpfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVcGRhdGVzQmFzZSgpOiBzdHJpbmcge1xuICByZXR1cm4gY29uZmlnLmdldCgndXBkYXRlc1VybCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXBkYXRlc0ZpbGVOYW1lKCk6IHN0cmluZyB7XG4gIGNvbnN0IHByZWZpeCA9IGdldENoYW5uZWwoKTtcblxuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2RhcndpbicpIHtcbiAgICByZXR1cm4gYCR7cHJlZml4fS1tYWMueW1sYDtcbiAgfVxuXG4gIHJldHVybiBgJHtwcmVmaXh9LnltbGA7XG59XG5cbmZ1bmN0aW9uIGdldENoYW5uZWwoKTogc3RyaW5nIHtcbiAgY29uc3QgeyB2ZXJzaW9uIH0gPSBwYWNrYWdlSnNvbjtcblxuICBpZiAoaXNTdGFnaW5nKHZlcnNpb24pKSB7XG4gICAgcmV0dXJuICdzdGFnaW5nJztcbiAgfVxuICBpZiAoaXNBbHBoYSh2ZXJzaW9uKSkge1xuICAgIHJldHVybiAnYWxwaGEnO1xuICB9XG4gIGlmIChpc0JldGEodmVyc2lvbikpIHtcbiAgICByZXR1cm4gJ2JldGEnO1xuICB9XG4gIHJldHVybiAnbGF0ZXN0Jztcbn1cblxuZnVuY3Rpb24gaXNWZXJzaW9uTmV3ZXIobmV3VmVyc2lvbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IHsgdmVyc2lvbiB9ID0gcGFja2FnZUpzb247XG5cbiAgcmV0dXJuIGd0KG5ld1ZlcnNpb24sIHZlcnNpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmVyc2lvbihpbmZvOiBKU09OVXBkYXRlU2NoZW1hKTogc3RyaW5nIHwgbnVsbCB7XG4gIHJldHVybiBpbmZvICYmIGluZm8udmVyc2lvbjtcbn1cblxuY29uc3QgdmFsaWRGaWxlID0gL15bQS1aYS16MC05Li1dKyQvO1xuZXhwb3J0IGZ1bmN0aW9uIGlzVXBkYXRlRmlsZU5hbWVWYWxpZChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIHZhbGlkRmlsZS50ZXN0KG5hbWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXBkYXRlRmlsZU5hbWUoXG4gIGluZm86IEpTT05VcGRhdGVTY2hlbWEsXG4gIHBsYXRmb3JtOiB0eXBlb2YgcHJvY2Vzcy5wbGF0Zm9ybSxcbiAgYXJjaDogdHlwZW9mIHByb2Nlc3MuYXJjaFxuKTogc3RyaW5nIHtcbiAgaWYgKCFpbmZvIHx8ICFpbmZvLnBhdGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFVwZGF0ZUZpbGVOYW1lOiBObyBwYXRoIHByZXNlbnQgaW4gWUFNTCBmaWxlJyk7XG4gIH1cblxuICBsZXQgcGF0aDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBpZiAocGxhdGZvcm0gPT09ICdkYXJ3aW4nKSB7XG4gICAgY29uc3QgeyBmaWxlcyB9ID0gaW5mbztcblxuICAgIGNvbnN0IGNhbmRpZGF0ZXMgPSBmaWxlcy5maWx0ZXIoXG4gICAgICAoeyB1cmwgfSkgPT4gdXJsLmluY2x1ZGVzKGFyY2gpICYmIHVybC5lbmRzV2l0aCgnLnppcCcpXG4gICAgKTtcblxuICAgIGlmIChjYW5kaWRhdGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcGF0aCA9IGNhbmRpZGF0ZXNbMF0udXJsO1xuICAgIH1cbiAgfVxuXG4gIHBhdGggPSBwYXRoID8/IGluZm8ucGF0aDtcblxuICBpZiAoIWlzVXBkYXRlRmlsZU5hbWVWYWxpZChwYXRoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBnZXRVcGRhdGVGaWxlTmFtZTogUGF0aCAnJHtwYXRofScgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzYFxuICAgICk7XG4gIH1cblxuICByZXR1cm4gcGF0aDtcbn1cblxuZnVuY3Rpb24gZ2V0U0hBNTEyKFxuICBpbmZvOiBKU09OVXBkYXRlU2NoZW1hLFxuICBmaWxlTmFtZTogc3RyaW5nXG4pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBpZiAoIWluZm8gfHwgIWluZm8uZmlsZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFNIQTUxMjogTm8gZmlsZXMgcHJlc2VudCBpbiBZQU1MIGZpbGUnKTtcbiAgfVxuXG4gIGNvbnN0IGZvdW5kRmlsZSA9IGluZm8uZmlsZXMuZmluZChmaWxlID0+IGZpbGUudXJsID09PSBmaWxlTmFtZSk7XG5cbiAgcmV0dXJuIGZvdW5kRmlsZT8uc2hhNTEyO1xufVxuXG5mdW5jdGlvbiBnZXRTaXplKGluZm86IEpTT05VcGRhdGVTY2hlbWEsIGZpbGVOYW1lOiBzdHJpbmcpOiBudW1iZXIge1xuICBpZiAoIWluZm8gfHwgIWluZm8uZmlsZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFNpemU6IE5vIGZpbGVzIHByZXNlbnQgaW4gWUFNTCBmaWxlJyk7XG4gIH1cblxuICBjb25zdCBmb3VuZEZpbGUgPSBpbmZvLmZpbGVzLmZpbmQoZmlsZSA9PiBmaWxlLnVybCA9PT0gZmlsZU5hbWUpO1xuXG4gIHJldHVybiBOdW1iZXIoZm91bmRGaWxlPy5zaXplKSB8fCAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VZYW1sKHlhbWw6IHN0cmluZyk6IEpTT05VcGRhdGVTY2hlbWEge1xuICByZXR1cm4gc2FmZUxvYWQoeWFtbCwgeyBzY2hlbWE6IEZBSUxTQUZFX1NDSEVNQSwganNvbjogdHJ1ZSB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VXBkYXRlWWFtbCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCB0YXJnZXRVcmwgPSBnZXRVcGRhdGVDaGVja1VybCgpO1xuICBjb25zdCBib2R5ID0gYXdhaXQgZ290KHRhcmdldFVybCwgZ2V0R290T3B0aW9ucygpKS50ZXh0KCk7XG5cbiAgaWYgKCFib2R5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdHb3QgdW5leHBlY3RlZCByZXNwb25zZSBiYWNrIGZyb20gdXBkYXRlIGNoZWNrJyk7XG4gIH1cblxuICByZXR1cm4gYm9keTtcbn1cblxuZnVuY3Rpb24gZ2V0QmFzZVRlbXBEaXIoKSB7XG4gIC8vIFdlIG9ubHkgdXNlIHRtcGRpcigpIHdoZW4gdGhpcyBjb2RlIGlzIHJ1biBvdXRzaWRlIG9mIGFuIEVsZWN0cm9uIGFwcCAoYXMgaW46IHRlc3RzKVxuICByZXR1cm4gYXBwID8gZ2V0VGVtcFBhdGgoYXBwLmdldFBhdGgoJ3VzZXJEYXRhJykpIDogdG1wZGlyKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVUZW1wRGlyKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHRhcmdldERpciA9IGF3YWl0IGdldFRlbXBEaXIoKTtcblxuICBhd2FpdCBta2RpcnBQcm9taXNlKHRhcmdldERpcik7XG5cbiAgcmV0dXJuIHRhcmdldERpcjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRlbXBEaXIoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgYmFzZVRlbXBEaXIgPSBnZXRCYXNlVGVtcERpcigpO1xuICBjb25zdCB1bmlxdWVOYW1lID0gZ2V0R3VpZCgpO1xuXG4gIC8vIENyZWF0ZSBwYXJlbnQgZm9sZGVyIGlmIG5vdCBhbHJlYWR5IHByZXNlbnRcbiAgaWYgKCEoYXdhaXQgcGF0aEV4aXN0cyhiYXNlVGVtcERpcikpKSB7XG4gICAgYXdhaXQgbWtkaXJwUHJvbWlzZShiYXNlVGVtcERpcik7XG4gIH1cblxuICByZXR1cm4gam9pbihiYXNlVGVtcERpciwgdW5pcXVlTmFtZSk7XG59XG5cbmZ1bmN0aW9uIGdldFVwZGF0ZUNhY2hlRGlyKCkge1xuICAvLyBXZSBvbmx5IHVzZSB0bXBkaXIoKSB3aGVuIHRoaXMgY29kZSBpcyBydW4gb3V0c2lkZSBvZiBhbiBFbGVjdHJvbiBhcHAgKGFzIGluOiB0ZXN0cylcbiAgcmV0dXJuIGFwcCA/IGdldFVwZGF0ZUNhY2hlUGF0aChhcHAuZ2V0UGF0aCgndXNlckRhdGEnKSkgOiB0bXBkaXIoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVVwZGF0ZUNhY2hlRGlySWZOZWVkZWQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgdGFyZ2V0RGlyID0gZ2V0VXBkYXRlQ2FjaGVEaXIoKTtcbiAgYXdhaXQgbWtkaXJwUHJvbWlzZSh0YXJnZXREaXIpO1xuXG4gIHJldHVybiB0YXJnZXREaXI7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVUZW1wRGlyKHRhcmdldERpcjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmIChhd2FpdCBwYXRoRXhpc3RzKHRhcmdldERpcikpIHtcbiAgICBjb25zdCBwYXRoSW5mbyA9IGF3YWl0IHN0YXQodGFyZ2V0RGlyKTtcbiAgICBpZiAoIXBhdGhJbmZvLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYGRlbGV0ZVRlbXBEaXI6IENhbm5vdCBkZWxldGUgcGF0aCAnJHt0YXJnZXREaXJ9JyBiZWNhdXNlIGl0IGlzIG5vdCBhIGRpcmVjdG9yeWBcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYmFzZVRlbXBEaXIgPSBnZXRCYXNlVGVtcERpcigpO1xuICBpZiAoIWlzUGF0aEluc2lkZSh0YXJnZXREaXIsIGJhc2VUZW1wRGlyKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBkZWxldGVUZW1wRGlyOiBDYW5ub3QgZGVsZXRlIHBhdGggJyR7dGFyZ2V0RGlyfScgc2luY2UgaXQgaXMgbm90IHdpdGhpbiBiYXNlIHRlbXAgZGlyYFxuICAgICk7XG4gIH1cblxuICBhd2FpdCByaW1yYWZQcm9taXNlKHRhcmdldERpcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGlPcHRpb25zPFQ+KG9wdGlvbnM6IFBhcnNlckNvbmZpZ3VyYXRpb25bJ29wdGlvbnMnXSk6IFQge1xuICBjb25zdCBwYXJzZXIgPSBjcmVhdGVQYXJzZXIoeyBvcHRpb25zIH0pO1xuICBjb25zdCBjbGlPcHRpb25zID0gcGFyc2VyLnBhcnNlKHByb2Nlc3MuYXJndik7XG5cbiAgaWYgKGNsaU9wdGlvbnMuaGVscCkge1xuICAgIGNvbnN0IGhlbHAgPSBwYXJzZXIuaGVscCgpLnRyaW1SaWdodCgpO1xuICAgIGNvbnNvbGUubG9nKGhlbHApO1xuICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgfVxuXG4gIHJldHVybiBjbGlPcHRpb25zIGFzIHVua25vd24gYXMgVDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLGdCQUFrQztBQUNsQyxzQkFBMkI7QUFDM0Isc0JBQXlDO0FBQ3pDLGtCQUEwQjtBQUMxQiwyQkFBeUI7QUFDekIsa0JBQXlDO0FBQ3pDLGdCQUF1QjtBQUN2QixvQkFBeUI7QUFHekIsc0JBQTZCO0FBQzdCLHFCQUEwQztBQUMxQyxvQkFBbUI7QUFDbkIsb0JBQW1CO0FBQ25CLGlCQUFnQjtBQUNoQixrQkFBOEI7QUFDOUIsa0JBQWlCO0FBQ2pCLG9CQUFtQjtBQUNuQixvQkFBbUI7QUFFbkIsc0JBQTZCO0FBRTdCLGdCQUEyQjtBQUMzQix5QkFBZ0Q7QUFDaEQscUJBQTJCO0FBQzNCLGFBQXdCO0FBQ3hCLHFCQUEyQztBQUMzQyxvQkFBNkI7QUFFN0Isa0JBQTZCO0FBQzdCLHVCQUlPO0FBQ1AsMEJBQTZCO0FBSTdCLGtCQUE4QjtBQUM5QixtQkFBK0M7QUFFL0MsMEJBS087QUFFUCxNQUFNLGdCQUFnQix5QkFBSyxxQkFBTTtBQUNqQyxNQUFNLGdCQUFnQix5QkFBSyxxQkFBTTtBQUVqQyxNQUFNLFdBQVcsS0FBSyxVQUFVO0FBd0JoQyxJQUFLLGVBQUwsa0JBQUssa0JBQUw7QUFDRSxzQ0FBbUI7QUFDbkIsOEJBQVc7QUFDWCwrQkFBWTtBQUhUO0FBQUE7QUFXRSxNQUFlLFFBQVE7QUFBQSxFQWE1QixZQUNxQixRQUNGLGlCQUNFLGVBQ25CO0FBSG1CO0FBQ0Y7QUFDRTtBQUxiLDhCQUFxQjtBQU8zQixTQUFLLGlDQUFpQyw0QkFBUyxDQUFDLG1CQUEyQjtBQUN6RSxZQUFNLGFBQWEsS0FBSyxjQUFjO0FBQ3RDLGtCQUFZLFlBQVksS0FDdEIsc0JBQ0EsMEJBQVcsYUFDWCxFQUFFLGVBQWUsQ0FDbkI7QUFBQSxJQUNGLEdBQUcsR0FBRztBQUFBLEVBQ1I7QUFBQSxRQU1hLFFBQXVCO0FBQ2xDLFdBQU8sS0FBSyw0QkFBNEIsSUFBSTtBQUFBLEVBQzlDO0FBQUEsUUFFYSxRQUF1QjtBQUNsQyxTQUFLLE9BQU8sS0FBSyxtQ0FBbUM7QUFFcEQsZ0JBQVksWUFBWTtBQUN0QixVQUFJO0FBQ0YsY0FBTSxLQUFLLDRCQUE0QjtBQUFBLE1BQ3pDLFNBQVMsT0FBUDtBQUNBLGFBQUssT0FBTyxNQUFNLGtCQUFrQixPQUFPLFlBQVksS0FBSyxHQUFHO0FBQUEsTUFDakU7QUFBQSxJQUNGLEdBQUcsUUFBUTtBQUVYLFVBQU0sS0FBSyx5QkFBeUI7QUFDcEMsVUFBTSxLQUFLLDRCQUE0QjtBQUFBLEVBQ3pDO0FBQUEsRUFjVSxrQkFDUix1QkFDTTtBQUNOLDRCQUFRLGNBQWMsY0FBYztBQUNwQyw0QkFBUSxXQUFXLGdCQUFnQixxQkFBcUI7QUFBQSxFQUMxRDtBQUFBLEVBRVUsaUJBQ1IsT0FDQSxhQUFhLDBCQUFXLGVBQ2xCO0FBQ04sUUFBSSxLQUFLLG9CQUFvQjtBQUMzQixXQUFLLE9BQU8sS0FDViw0Q0FDQSxPQUFPLFlBQVksS0FBSyxDQUMxQjtBQUNBO0FBQUEsSUFDRjtBQUNBLFNBQUsscUJBQXFCO0FBRTFCLFNBQUssT0FBTyxNQUNWLG1EQUNLLE9BQU8sWUFBWSxLQUFLLGtCQUNaLFlBQ25CO0FBRUEsVUFBTSxhQUFhLEtBQUssY0FBYztBQUN0QyxnQkFBWSxZQUFZLEtBQUssc0JBQXNCLFVBQVU7QUFFN0QsU0FBSyxrQkFBa0IsWUFBWTtBQUNqQyxXQUFLLE9BQU8sS0FBSyxzREFBc0Q7QUFFdkUsV0FBSyxxQkFBcUI7QUFDMUIsWUFBTSxLQUFLLDRCQUE0QjtBQUFBLElBQ3pDLENBQUM7QUFBQSxFQUNIO0FBQUEsUUFNYyxtQkFDWixZQUNBLE1BQ2tCO0FBQ2xCLFFBQUksS0FBSyxnQkFBZ0I7QUFDdkIsYUFBTyxLQUFLO0FBQUEsSUFDZDtBQUVBLFFBQUk7QUFDRixXQUFLLGlCQUFpQixLQUFLLHFCQUFxQixZQUFZLElBQUk7QUFFaEUsYUFBTyxNQUFNLEtBQUs7QUFBQSxJQUNwQixVQUFFO0FBQ0EsV0FBSyxpQkFBaUI7QUFBQSxJQUN4QjtBQUFBLEVBQ0Y7QUFBQSxRQUVjLHFCQUNaLFlBQ0EsTUFDa0I7QUFDbEIsVUFBTSxFQUFFLFdBQVc7QUFFbkIsVUFBTSxFQUFFLFVBQVUsYUFBYSxTQUFTLGVBQWU7QUFFdkQsUUFBSTtBQUNGLFlBQU0sYUFBYSxLQUFLO0FBQ3hCLFdBQUssVUFBVTtBQUVmLFVBQUk7QUFFSixVQUFJO0FBQ0YseUJBQWlCLE1BQU0sS0FBSyxlQUFlLFlBQVksSUFBSTtBQUFBLE1BQzdELFNBQVMsT0FBUDtBQUVBLGFBQUssVUFBVTtBQUVmLGNBQU07QUFBQSxNQUNSO0FBRUEsVUFBSSxDQUFDLGdCQUFnQjtBQUNuQixlQUFPLEtBQUssOENBQThDO0FBQzFELHdDQUNFLFNBQVMsK0JBQTBCLFNBQVMsMkJBQzVDLHFFQUNGO0FBQ0EsZUFBTztBQUFBLE1BQ1Q7QUFFQSxZQUFNLEVBQUUsZ0JBQWdCLGNBQWM7QUFFdEMsWUFBTSxZQUFZLGtDQUFZLHNCQUFPLElBQUksa0JBQWtCLENBQUM7QUFDNUQsWUFBTSxXQUFXLE1BQU0sc0NBQ3JCLGdCQUNBLEtBQUssU0FDTCxXQUNBLFNBQ0Y7QUFDQSxVQUFJLENBQUMsVUFBVTtBQUdiLGNBQU0sSUFBSSxNQUNSLG9FQUNnQixLQUFLLHdCQUF3QixlQUMvQztBQUFBLE1BQ0Y7QUFFQSxZQUFNLEtBQUssY0FBYyxjQUFjO0FBRXZDLFlBQU0sYUFBYSxLQUFLLGNBQWM7QUFDdEMsVUFBSSxZQUFZO0FBQ2QsbUJBQVcsWUFBWSxLQUFLLHNCQUFzQiwwQkFBVyxRQUFRO0FBQUEsVUFDbkUsU0FBUyxLQUFLO0FBQUEsUUFDaEIsQ0FBQztBQUFBLE1BQ0gsT0FBTztBQUNMLGVBQU8sS0FDTCw4REFDRjtBQUFBLE1BQ0Y7QUFFQSxhQUFPO0FBQUEsSUFDVCxTQUFTLE9BQVA7QUFDQSxhQUFPLE1BQU0sdUJBQXVCLE9BQU8sWUFBWSxLQUFLLEdBQUc7QUFDL0QsV0FBSyxpQkFBaUIsS0FBSztBQUMzQixZQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFBQSxRQUVjLDRCQUE0QixRQUFRLE9BQXNCO0FBQ3RFLFVBQU0sRUFBRSxXQUFXO0FBRW5CLFdBQU8sS0FBSyxxREFBcUQ7QUFDakUsVUFBTSxhQUFhLE1BQU0sS0FBSyxnQkFBZ0IsS0FBSztBQUNuRCxRQUFJLENBQUMsWUFBWTtBQUNmO0FBQUEsSUFDRjtBQUVBLFVBQU0sRUFBRSxTQUFTLGVBQWU7QUFFaEMsUUFBSSxDQUFDLFNBQVMsS0FBSyxXQUFXLENBQUMsc0JBQUcsWUFBWSxLQUFLLE9BQU8sR0FBRztBQUMzRDtBQUFBLElBQ0Y7QUFFQSxVQUFNLHNCQUFzQixNQUFNLEtBQUssNkJBQTZCO0FBQ3BFLFFBQUkscUJBQXFCO0FBQ3ZCLFlBQU0sS0FBSyxtQkFBbUIsWUFBWSwyQkFBc0I7QUFDaEU7QUFBQSxJQUNGO0FBRUEsUUFBSSxPQUFPO0FBQ1gsUUFBSSxXQUFXLGtCQUFrQjtBQUMvQixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sS0FBSyxZQUFZLFlBQVksTUFBTSxDQUFDO0FBQUEsRUFDNUM7QUFBQSxRQUVjLFlBQ1osWUFDQSxNQUNBLFNBQ2U7QUFDZixVQUFNLEVBQUUsV0FBVztBQUVuQixTQUFLLGtCQUFrQixZQUFZO0FBQ2pDLGFBQU8sS0FBSyw0REFBNEQ7QUFFeEUsWUFBTSxjQUFjLE1BQU0sS0FBSyxtQkFBbUIsWUFBWSxJQUFJO0FBQ2xFLFVBQUksQ0FBQyxlQUFlLFNBQVMsMkNBQStCO0FBQzFELGFBQUssT0FBTyxLQUNWLG9FQUNGO0FBRUEsZUFBTyxLQUFLLFlBQVksWUFBWSwyQkFBdUIsVUFBVSxDQUFDO0FBQUEsTUFDeEU7QUFFQSxzQ0FBYSxhQUFhLHNDQUFzQztBQUFBLElBQ2xFLENBQUM7QUFFRCxVQUFNLGFBQWEsS0FBSyxjQUFjO0FBQ3RDLFFBQUksQ0FBQyxZQUFZO0FBQ2YsYUFBTyxLQUFLLHVEQUF1RDtBQUNuRTtBQUFBLElBQ0Y7QUFFQSxRQUFJO0FBQ0osUUFBSSxTQUFTLDJDQUErQjtBQUMxQyxzQ0FDRSxXQUFXLGtCQUNYLHNEQUNGO0FBQ0EscUJBQWUsV0FBVyxpQkFBaUI7QUFBQSxJQUM3QyxPQUFPO0FBQ0wscUJBQWUsV0FBVztBQUFBLElBQzVCO0FBRUEsV0FBTyxLQUFLLHlCQUF5QixhQUFhO0FBQ2xELGVBQVcsWUFBWSxLQUNyQixzQkFDQSxZQUFZLElBQUksMEJBQVcsZ0JBQWdCLDBCQUFXLG1CQUN0RDtBQUFBLE1BQ0U7QUFBQSxNQUNBLGNBQWM7QUFBQSxNQUNkLFNBQVMsV0FBVztBQUFBLElBQ3RCLENBQ0Y7QUFBQSxFQUNGO0FBQUEsUUFFYyxnQkFDWixjQUFjLE9BQzhCO0FBQzVDLFVBQU0sT0FBTyxNQUFNLGNBQWM7QUFDakMsVUFBTSxhQUFhLFVBQVUsSUFBSTtBQUVqQyxRQUFJLFdBQVcscUJBQXFCO0FBQ2xDLFdBQUssT0FBTyxLQUFLLHlDQUF5QztBQUMxRCxXQUFLLGlCQUNILElBQUksTUFBTSx3Q0FBd0MsR0FDbEQsMEJBQVcsNEJBQ2I7QUFDQTtBQUFBLElBQ0Y7QUFFQSxVQUFNLFVBQVUsV0FBVyxVQUFVO0FBRXJDLFFBQUksQ0FBQyxTQUFTO0FBQ1osV0FBSyxPQUFPLEtBQ1YsNERBQ0Y7QUFFQTtBQUFBLElBQ0Y7QUFFQSxRQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsT0FBTyxHQUFHO0FBQzVDLFdBQUssT0FBTyxLQUNWLG9CQUFvQiw2QkFBNkIsWUFBWSxrQ0FFL0Q7QUFFQTtBQUFBLElBQ0Y7QUFFQSxTQUFLLE9BQU8sS0FDVix3Q0FBd0MsdUJBQ3ZCLGFBQ25CO0FBRUEsVUFBTSxXQUFXLGtCQUNmLFlBQ0EsUUFBUSxVQUNSLE1BQU0sS0FBSyxRQUFRLENBQ3JCO0FBRUEsVUFBTSxTQUFTLFVBQVUsWUFBWSxRQUFRO0FBQzdDLG9DQUFhLFdBQVcsUUFBVyx1QkFBdUI7QUFFMUQsVUFBTSxrQkFBa0IsTUFBTSxLQUFLLHlCQUNqQyx5QkFBUSxRQUFRLENBQ2xCO0FBRUEsUUFBSTtBQUNKLFFBQUksaUJBQWlCO0FBQ25CLFdBQUssT0FBTyxLQUNWLDBDQUEwQyxpQkFDNUM7QUFFQSxZQUFNLGNBQWM7QUFBQSxRQUNsQixTQUFTO0FBQUEsUUFDVCxRQUFRLEdBQUcsZUFBZSxLQUFLO0FBQUEsUUFDL0I7QUFBQSxNQUNGO0FBRUEsVUFDRSxLQUFLLDBCQUNMLDZDQUF3QixLQUFLLHdCQUF3QixXQUFXLEdBQ2hFO0FBQ0EsYUFBSyxPQUFPLEtBQUssaURBQWlEO0FBRWxFLDJCQUFtQixLQUFLO0FBQUEsTUFDMUIsT0FBTztBQUNMLFlBQUk7QUFDRiw2QkFBbUIsTUFBTSx5Q0FBNEIsV0FBVztBQUVoRSxlQUFLLHlCQUF5QjtBQUU5QixlQUFLLE9BQU8sS0FDViwrQ0FDQSxpQkFBaUIsWUFDbkI7QUFBQSxRQUNGLFNBQVMsT0FBUDtBQUNBLGVBQUssT0FBTyxNQUNWLDBEQUNBLE9BQU8sWUFBWSxLQUFLLENBQzFCO0FBQ0EsZUFBSyx5QkFBeUI7QUFBQSxRQUNoQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsV0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBLE1BQU0sUUFBUSxZQUFZLFFBQVE7QUFBQSxNQUNsQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxRQUVjLHlCQUNaLFdBQzZCO0FBQzdCLFVBQU0sV0FBVyxNQUFNLDZCQUE2QjtBQUNwRCxVQUFNLFdBQVksT0FBTSw2QkFBUSxRQUFRLEdBQUcsSUFBSSxjQUFZO0FBQ3pELGFBQU8sc0JBQUssVUFBVSxRQUFRO0FBQUEsSUFDaEMsQ0FBQztBQUVELFdBQU8sU0FBUyxLQUFLLGNBQVkseUJBQVEsUUFBUSxNQUFNLFNBQVM7QUFBQSxFQUNsRTtBQUFBLFFBRWMsZUFDWixFQUFFLFVBQVUsUUFBUSxvQkFDcEIsTUFDK0M7QUFDL0MsVUFBTSxVQUFVLGVBQWU7QUFDL0IsVUFBTSxnQkFBZ0IsR0FBRyxXQUFXO0FBRXBDLFVBQU0sbUJBQW1CLFNBQVM7QUFFbEMsVUFBTSxvQkFBb0IsMkNBQXFCLFFBQVE7QUFDdkQsVUFBTSxtQkFBbUIsNkNBQW9CLFFBQVE7QUFDckQsVUFBTSxlQUFlLEdBQUcsV0FBVztBQUNuQyxVQUFNLGNBQWMsR0FBRyxXQUFXO0FBRWxDLFFBQUksV0FBVyxNQUFNLDZCQUE2QjtBQUNsRCxVQUFNLG1CQUFtQixzQkFBSyxVQUFVLFFBQVE7QUFFaEQsVUFBTSxVQUFVLE1BQU0sY0FBYztBQUVwQyxVQUFNLGlCQUFpQixzQkFBSyxTQUFTLFFBQVE7QUFDN0MsVUFBTSxtQkFBbUIsc0JBQUssU0FBUyxnQkFBZ0I7QUFHdkQsUUFBSSxtQkFBbUI7QUFFdkIsUUFBSTtBQUNGLG1CQUFhLFVBQVUsZ0JBQWdCO0FBRXZDLG1CQUFhLFNBQVMsY0FBYztBQUNwQyxtQkFBYSxTQUFTLGdCQUFnQjtBQUV0QyxXQUFLLE9BQU8sS0FBSyx5Q0FBeUMsY0FBYztBQUN4RSxZQUFNLFlBQVksT0FBTyxLQUN2QixNQUFNLHdCQUFJLGNBQWMsK0JBQWMsQ0FBQyxFQUFFLEtBQUssR0FDOUMsS0FDRjtBQUVBLFVBQUksa0JBQWtCO0FBQ3BCLGFBQUssT0FBTyxLQUFLLG1DQUFtQyxhQUFhO0FBQ2pFLGNBQU0sK0JBQVUsa0JBQWtCLGlCQUFpQixXQUFXO0FBQUEsTUFDaEUsT0FBTztBQUNMLFlBQUk7QUFDRixlQUFLLE9BQU8sS0FDVix3Q0FBd0MsYUFDMUM7QUFDQSxnQkFBTSxXQUFXLE1BQU0sd0JBQUksYUFBYSwrQkFBYyxDQUFDLEVBQUUsT0FBTztBQUNoRSxnQkFBTSwrQkFBVSxrQkFBa0IsUUFBUTtBQUFBLFFBQzVDLFNBQVMsT0FBUDtBQUNBLGVBQUssT0FBTyxLQUNWLDJEQUNBLE9BQU8sWUFBWSxLQUFLLENBQzFCO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFFQSxVQUFJLFlBQVk7QUFDaEIsVUFBSSxDQUFDLGFBQWMsTUFBTSxnQ0FBVyxnQkFBZ0IsR0FBSTtBQUN0RCxjQUFNLGNBQWMsTUFBTSxpQ0FBZSxrQkFBa0IsTUFBTTtBQUNqRSxZQUFJLFlBQVksSUFBSTtBQUNsQixlQUFLLE9BQU8sS0FDViwwQ0FBMEMsNkNBRTVDO0FBR0EsY0FBSTtBQUNGLGtCQUFNLGlDQUFlLEtBQUssUUFBUSxrQkFBa0IsY0FBYztBQUNsRSx3QkFBWTtBQUFBLFVBQ2QsU0FBUyxPQUFQO0FBQ0EsaUJBQUssT0FBTyxNQUNWLDBEQUNBLE9BQU8sWUFBWSxLQUFLLENBQzFCO0FBQUEsVUFDRjtBQUFBLFFBQ0YsT0FBTztBQUNMLGVBQUssT0FBTyxNQUNWLDJDQUNBLFlBQVksS0FDZDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUEsWUFBTSx3QkFDSixvQkFBb0IsU0FBUztBQUMvQixVQUFJLENBQUMsYUFBYSx1QkFBdUI7QUFDdkMsYUFBSyxPQUFPLEtBQ1YsbURBQW1ELGVBQ3JEO0FBRUEsWUFBSTtBQUNGLGdCQUFNLGtDQUF5QixnQkFBZ0Isa0JBQWtCO0FBQUEsWUFDL0QsZ0JBQWdCLG1CQUNaLEtBQUssaUNBQ0w7QUFBQSxZQUNKLFFBQVEsS0FBSztBQUFBLFVBQ2YsQ0FBQztBQUVELHNCQUFZO0FBQUEsUUFDZCxTQUFTLE9BQVA7QUFDQSxlQUFLLE9BQU8sTUFDVix1REFDQSxPQUFPLFlBQVksS0FBSyxDQUMxQjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUEsWUFBTSxnQkFBZ0IsU0FBUztBQUMvQixVQUFJLENBQUMsYUFBYSxlQUFlO0FBQy9CLGFBQUssT0FBTyxLQUNWLDJDQUEyQyxlQUM3QztBQUtBLGNBQU0sY0FBYyxRQUFRO0FBQzVCLG1CQUFXLE1BQU0sNkJBQTZCO0FBRTlDLGNBQU0sS0FBSyxrQkFDVCxlQUNBLGdCQUNBLGdCQUNGO0FBQ0Esb0JBQVk7QUFBQSxNQUNkO0FBRUEsVUFBSSxDQUFDLFdBQVc7QUFDZCxlQUFPO0FBQUEsTUFDVDtBQUVBLFdBQUssT0FBTyxLQUNWLDBEQUNGO0FBR0EsWUFBTSxhQUFhLE1BQU0sV0FBVztBQUNwQyxZQUFNLGlDQUFlLEtBQUssUUFBUSxVQUFVLFVBQVU7QUFHdEQsVUFBSTtBQUNGLGNBQU0saUNBQWUsS0FBSyxRQUFRLFNBQVMsUUFBUTtBQUFBLE1BQ3JELFNBQVMsT0FBUDtBQUNBLFlBQUk7QUFFRixnQkFBTSxpQ0FBZSxLQUFLLFFBQVEsWUFBWSxRQUFRO0FBQUEsUUFDeEQsU0FBUyxjQUFQO0FBQ0EsZUFBSyxPQUFPLEtBQ1Ysa0VBQ0EsT0FBTyxZQUFZLFlBQVksQ0FDakM7QUFBQSxRQUNGO0FBRUEsYUFBSyxPQUFPLEtBQ1YsdUVBQ0EsT0FBTyxZQUFZLEtBQUssQ0FDMUI7QUFDQSwyQkFBbUI7QUFDbkIsZUFBTyxFQUFFLGdCQUFnQixnQkFBZ0IsVUFBVTtBQUFBLE1BQ3JEO0FBRUEsVUFBSTtBQUNGLGNBQU0sY0FBYyxVQUFVO0FBQUEsTUFDaEMsU0FBUyxPQUFQO0FBQ0EsYUFBSyxPQUFPLEtBQ1YsNERBQ0EsT0FBTyxZQUFZLEtBQUssQ0FDMUI7QUFBQSxNQUNGO0FBRUEsYUFBTyxFQUFFLGdCQUFnQixrQkFBa0IsVUFBVTtBQUFBLElBQ3ZELFVBQUU7QUFDQSxVQUFJLENBQUMsa0JBQWtCO0FBQ3JCLGNBQU0sY0FBYyxPQUFPO0FBQUEsTUFDN0I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLFFBRWMsa0JBQ1osZUFDQSxrQkFDQSxtQkFBbUIsT0FDSjtBQUNmLFVBQU0saUJBQWlCLG1CQUFJLE9BQU8sZUFBZSwrQkFBYyxDQUFDO0FBQ2hFLFVBQU0sY0FBYyxpQ0FBa0IsZ0JBQWdCO0FBRXRELFVBQU0sSUFBSSxRQUFjLENBQUMsU0FBUyxXQUFXO0FBQzNDLFVBQUksa0JBQWtCO0FBQ3BCLFlBQUksaUJBQWlCO0FBRXJCLHVCQUFlLEdBQUcsUUFBUSxVQUFRO0FBQ2hDLDRCQUFrQixLQUFLO0FBQ3ZCLGVBQUssK0JBQStCLGNBQWM7QUFBQSxRQUNwRCxDQUFDO0FBQUEsTUFDSDtBQUVBLHFCQUFlLEdBQUcsU0FBUyxXQUFTO0FBQ2xDLGVBQU8sS0FBSztBQUFBLE1BQ2QsQ0FBQztBQUNELHFCQUFlLEdBQUcsT0FBTyxNQUFNO0FBQzdCLGdCQUFRO0FBQUEsTUFDVixDQUFDO0FBRUQsa0JBQVksR0FBRyxTQUFTLFdBQVM7QUFDL0IsZUFBTyxLQUFLO0FBQUEsTUFDZCxDQUFDO0FBRUQscUJBQWUsS0FBSyxXQUFXO0FBQUEsSUFDakMsQ0FBQztBQUFBLEVBQ0g7QUFBQSxRQUVjLCtCQUFpRDtBQUM3RCxRQUFJO0FBQ0YsYUFBTyxNQUFNLEtBQUssZ0JBQWdCLHlCQUNoQyxvQkFDRjtBQUFBLElBQ0YsU0FBUyxPQUFQO0FBQ0EsV0FBSyxPQUFPLEtBQ1Ysa0VBQ0EsT0FBTyxZQUFZLEtBQUssQ0FDMUI7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFBQSxRQUVjLFVBQXdDO0FBQ3BELFFBQUksUUFBUSxhQUFhLFlBQVksUUFBUSxTQUFTLFNBQVM7QUFDN0QsYUFBTyxRQUFRO0FBQUEsSUFDakI7QUFFQSxRQUFJO0FBRUYsWUFBTSxPQUFPO0FBQ2IsWUFBTSxFQUFFLFdBQVcsTUFBTSwyQkFBVSw2QkFBUSxFQUFFLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQztBQUVuRSxVQUFJLE9BQU8sU0FBUyxHQUFHLFNBQVMsR0FBRztBQUNqQyxhQUFLLE9BQU8sS0FBSyxnQ0FBZ0M7QUFDakQsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGLFNBQVMsT0FBUDtBQUNBLFdBQUssT0FBTyxLQUNWLDBDQUEwQyxPQUFPLFlBQVksS0FBSyxHQUNwRTtBQUFBLElBQ0Y7QUFFQSxTQUFLLE9BQU8sS0FBSyxvQ0FBb0M7QUFDckQsV0FBTyxRQUFRO0FBQUEsRUFDakI7QUFDRjtBQXRuQk8sQUF3bkJBLHNCQUFzQixVQUFrQixZQUEwQjtBQUN2RSxRQUFNLGFBQWEsMkJBQVUsVUFBVTtBQUV2QyxNQUFJLENBQUMsc0NBQWEsWUFBWSxRQUFRLEdBQUc7QUFDdkMsVUFBTSxJQUFJLE1BQ1Isc0JBQXNCLHFDQUFxQyxVQUM3RDtBQUFBLEVBQ0Y7QUFDRjtBQVJnQixBQVlULDZCQUFxQztBQUMxQyxTQUFPLEdBQUcsZUFBZSxLQUFLLG1CQUFtQjtBQUNuRDtBQUZnQixBQUlULDBCQUFrQztBQUN2QyxTQUFPLHNCQUFPLElBQUksWUFBWTtBQUNoQztBQUZnQixBQUlULDhCQUFzQztBQUMzQyxRQUFNLFNBQVMsV0FBVztBQUUxQixNQUFJLFFBQVEsYUFBYSxVQUFVO0FBQ2pDLFdBQU8sR0FBRztBQUFBLEVBQ1o7QUFFQSxTQUFPLEdBQUc7QUFDWjtBQVJnQixBQVVoQixzQkFBOEI7QUFDNUIsUUFBTSxFQUFFLFlBQVk7QUFFcEIsTUFBSSw4QkFBVSxPQUFPLEdBQUc7QUFDdEIsV0FBTztBQUFBLEVBQ1Q7QUFDQSxNQUFJLDRCQUFRLE9BQU8sR0FBRztBQUNwQixXQUFPO0FBQUEsRUFDVDtBQUNBLE1BQUksMkJBQU8sT0FBTyxHQUFHO0FBQ25CLFdBQU87QUFBQSxFQUNUO0FBQ0EsU0FBTztBQUNUO0FBYlMsQUFlVCx3QkFBd0IsWUFBNkI7QUFDbkQsUUFBTSxFQUFFLFlBQVk7QUFFcEIsU0FBTyxzQkFBRyxZQUFZLE9BQU87QUFDL0I7QUFKUyxBQU1GLG9CQUFvQixNQUF1QztBQUNoRSxTQUFPLFFBQVEsS0FBSztBQUN0QjtBQUZnQixBQUloQixNQUFNLFlBQVk7QUFDWCwrQkFBK0IsTUFBdUI7QUFDM0QsU0FBTyxVQUFVLEtBQUssSUFBSTtBQUM1QjtBQUZnQixBQUlULDJCQUNMLE1BQ0EsVUFDQSxNQUNRO0FBQ1IsTUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLE1BQU07QUFDdkIsVUFBTSxJQUFJLE1BQU0saURBQWlEO0FBQUEsRUFDbkU7QUFFQSxNQUFJO0FBQ0osTUFBSSxhQUFhLFVBQVU7QUFDekIsVUFBTSxFQUFFLFVBQVU7QUFFbEIsVUFBTSxhQUFhLE1BQU0sT0FDdkIsQ0FBQyxFQUFFLFVBQVUsSUFBSSxTQUFTLElBQUksS0FBSyxJQUFJLFNBQVMsTUFBTSxDQUN4RDtBQUVBLFFBQUksV0FBVyxXQUFXLEdBQUc7QUFDM0IsYUFBTyxXQUFXLEdBQUc7QUFBQSxJQUN2QjtBQUFBLEVBQ0Y7QUFFQSxTQUFPLFFBQVEsS0FBSztBQUVwQixNQUFJLENBQUMsc0JBQXNCLElBQUksR0FBRztBQUNoQyxVQUFNLElBQUksTUFDUiw0QkFBNEIsbUNBQzlCO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDtBQS9CZ0IsQUFpQ2hCLG1CQUNFLE1BQ0EsVUFDb0I7QUFDcEIsTUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLE9BQU87QUFDeEIsVUFBTSxJQUFJLE1BQU0sMENBQTBDO0FBQUEsRUFDNUQ7QUFFQSxRQUFNLFlBQVksS0FBSyxNQUFNLEtBQUssVUFBUSxLQUFLLFFBQVEsUUFBUTtBQUUvRCxTQUFPLFdBQVc7QUFDcEI7QUFYUyxBQWFULGlCQUFpQixNQUF3QixVQUEwQjtBQUNqRSxNQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssT0FBTztBQUN4QixVQUFNLElBQUksTUFBTSx3Q0FBd0M7QUFBQSxFQUMxRDtBQUVBLFFBQU0sWUFBWSxLQUFLLE1BQU0sS0FBSyxVQUFRLEtBQUssUUFBUSxRQUFRO0FBRS9ELFNBQU8sT0FBTyxXQUFXLElBQUksS0FBSztBQUNwQztBQVJTLEFBVUYsbUJBQW1CLE1BQWdDO0FBQ3hELFNBQU8sNkJBQVMsTUFBTSxFQUFFLFFBQVEsZ0NBQWlCLE1BQU0sS0FBSyxDQUFDO0FBQy9EO0FBRmdCLEFBSWhCLCtCQUFnRDtBQUM5QyxRQUFNLFlBQVksa0JBQWtCO0FBQ3BDLFFBQU0sT0FBTyxNQUFNLHdCQUFJLFdBQVcsK0JBQWMsQ0FBQyxFQUFFLEtBQUs7QUFFeEQsTUFBSSxDQUFDLE1BQU07QUFDVCxVQUFNLElBQUksTUFBTSxnREFBZ0Q7QUFBQSxFQUNsRTtBQUVBLFNBQU87QUFDVDtBQVRlLEFBV2YsMEJBQTBCO0FBRXhCLFNBQU8sc0JBQU0sb0NBQVksb0JBQUksUUFBUSxVQUFVLENBQUMsSUFBSSxzQkFBTztBQUM3RDtBQUhTLEFBS1QsK0JBQXVEO0FBQ3JELFFBQU0sWUFBWSxNQUFNLFdBQVc7QUFFbkMsUUFBTSxjQUFjLFNBQVM7QUFFN0IsU0FBTztBQUNUO0FBTnNCLEFBUXRCLDRCQUFvRDtBQUNsRCxRQUFNLGNBQWMsZUFBZTtBQUNuQyxRQUFNLGFBQWEsb0JBQVE7QUFHM0IsTUFBSSxDQUFFLE1BQU0sZ0NBQVcsV0FBVyxHQUFJO0FBQ3BDLFVBQU0sY0FBYyxXQUFXO0FBQUEsRUFDakM7QUFFQSxTQUFPLHNCQUFLLGFBQWEsVUFBVTtBQUNyQztBQVZzQixBQVl0Qiw2QkFBNkI7QUFFM0IsU0FBTyxzQkFBTSwyQ0FBbUIsb0JBQUksUUFBUSxVQUFVLENBQUMsSUFBSSxzQkFBTztBQUNwRTtBQUhTLEFBS1QsOENBQXNFO0FBQ3BFLFFBQU0sWUFBWSxrQkFBa0I7QUFDcEMsUUFBTSxjQUFjLFNBQVM7QUFFN0IsU0FBTztBQUNUO0FBTHNCLEFBT3RCLDZCQUFvQyxXQUFrQztBQUNwRSxNQUFJLE1BQU0sZ0NBQVcsU0FBUyxHQUFHO0FBQy9CLFVBQU0sV0FBVyxNQUFNLDBCQUFLLFNBQVM7QUFDckMsUUFBSSxDQUFDLFNBQVMsWUFBWSxHQUFHO0FBQzNCLFlBQU0sSUFBSSxNQUNSLHNDQUFzQywwQ0FDeEM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFFBQU0sY0FBYyxlQUFlO0FBQ25DLE1BQUksQ0FBQyxzQ0FBYSxXQUFXLFdBQVcsR0FBRztBQUN6QyxVQUFNLElBQUksTUFDUixzQ0FBc0MsaURBQ3hDO0FBQUEsRUFDRjtBQUVBLFFBQU0sY0FBYyxTQUFTO0FBQy9CO0FBbEJzQixBQW9CZix1QkFBMEIsU0FBNEM7QUFDM0UsUUFBTSxTQUFTLGtDQUFhLEVBQUUsUUFBUSxDQUFDO0FBQ3ZDLFFBQU0sYUFBYSxPQUFPLE1BQU0sUUFBUSxJQUFJO0FBRTVDLE1BQUksV0FBVyxNQUFNO0FBQ25CLFVBQU0sT0FBTyxPQUFPLEtBQUssRUFBRSxVQUFVO0FBQ3JDLFlBQVEsSUFBSSxJQUFJO0FBQ2hCLFlBQVEsS0FBSyxDQUFDO0FBQUEsRUFDaEI7QUFFQSxTQUFPO0FBQ1Q7QUFYZ0IiLAogICJuYW1lcyI6IFtdCn0K
