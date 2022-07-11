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
var license_comments_exports = {};
__export(license_comments_exports, {
  forEachRelevantFile: () => forEachRelevantFile,
  getExtension: () => getExtension,
  readFirstLines: () => readFirstLines
});
module.exports = __toCommonJS(license_comments_exports);
var import_assert = __toESM(require("assert"));
var readline = __toESM(require("readline"));
var path = __toESM(require("path"));
var fs = __toESM(require("fs"));
var import_util = require("util");
var childProcess = __toESM(require("child_process"));
var import_p_map = __toESM(require("p-map"));
const exec = (0, import_util.promisify)(childProcess.exec);
const rootPath = path.join(__dirname, "..", "..", "..");
const EXTENSIONS_TO_CHECK = /* @__PURE__ */ new Set([
  ".eslintignore",
  ".gitattributes",
  ".gitignore",
  ".nvmrc",
  ".prettierignore",
  ".sh",
  ".snyk",
  ".yarnclean",
  ".yml",
  ".js",
  ".scss",
  ".ts",
  ".tsx",
  ".html",
  ".md",
  ".plist"
]);
const FILES_TO_IGNORE = new Set([
  ".github/ISSUE_TEMPLATE/bug_report.md",
  ".github/PULL_REQUEST_TEMPLATE.md",
  "components/mp3lameencoder/lib/Mp3LameEncoder.js",
  "components/recorderjs/recorder.js",
  "components/recorderjs/recorderWorker.js",
  "components/webaudiorecorder/lib/WebAudioRecorder.js",
  "components/webaudiorecorder/lib/WebAudioRecorderMp3.js",
  "js/Mp3LameEncoder.min.js",
  "js/WebAudioRecorderMp3.js"
].map(path.normalize));
function getExtension(file) {
  if (file.startsWith(".")) {
    return getExtension(`x.${file}`);
  }
  return path.extname(file);
}
async function forEachRelevantFile(fn) {
  const gitFiles = (await exec("git ls-files", { cwd: rootPath, env: {} })).stdout.split(/\n/g).map((line) => line.trim()).filter(Boolean).map((file) => path.join(rootPath, file));
  await (0, import_p_map.default)(gitFiles, async (file) => {
    const repoPath = path.relative(rootPath, file);
    if (FILES_TO_IGNORE.has(repoPath)) {
      return;
    }
    const extension = getExtension(file);
    if (!EXTENSIONS_TO_CHECK.has(extension)) {
      return;
    }
    await fn(file);
  }, { concurrency: 100 });
}
function readFirstLines(file, count) {
  return new Promise((resolve) => {
    const lines = [];
    const lineReader = readline.createInterface({
      input: fs.createReadStream(file)
    });
    lineReader.on("line", (line) => {
      lines.push(line);
      if (lines.length >= count) {
        lineReader.close();
      }
    });
    lineReader.on("close", () => {
      resolve(lines);
    });
  });
}
async function getLatestCommitYearForFile(file) {
  const dateString = (await new Promise((resolve, reject) => {
    let result2 = "";
    const gitLog = childProcess.spawn("git", ["log", "-1", "--format=%as", file], {
      cwd: rootPath,
      env: { PATH: process.env.PATH }
    });
    gitLog.stdout?.on("data", (data) => {
      result2 += data.toString("utf8");
    });
    gitLog.on("close", (code) => {
      if (code === 0) {
        resolve(result2);
      } else {
        reject(new Error(`git log failed with exit code ${code}`));
      }
    });
  })).trim();
  const result = new Date(dateString).getFullYear();
  (0, import_assert.default)(!Number.isNaN(result), `Could not read commit year for ${file}`);
  return result;
}
async function main() {
  const currentYear = new Date().getFullYear() + 1;
  await forEachRelevantFile(async (file) => {
    const [firstLine] = await readFirstLines(file, 1);
    const { groups = {} } = firstLine.match(/(?:\d{4}-)?(?<endYearString>\d{4})/) || [];
    const { endYearString } = groups;
    const endYear = Number(endYearString);
    (0, import_assert.default)(endYear === currentYear || endYear === await getLatestCommitYearForFile(file), `${file} has an invalid end license year`);
  });
}
if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  forEachRelevantFile,
  getExtension,
  readFirstLines
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGljZW5zZV9jb21tZW50cy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbi8vIFRoaXMgZmlsZSBkb2Vzbid0IGNoZWNrIHRoZSBmb3JtYXQgb2YgbGljZW5zZSBmaWxlcywganVzdCB0aGUgZW5kIHllYXIuIFNlZVxuLy8gICBgbGljZW5zZV9jb21tZW50c190ZXN0LnRzYCBmb3IgdGhvc2UgY2hlY2tzLCB3aGljaCBhcmUgbWVhbnQgdG8gYmUgcnVuIG1vcmUgb2Z0ZW4uXG5cbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCAqIGFzIHJlYWRsaW5lIGZyb20gJ3JlYWRsaW5lJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgeyBwcm9taXNpZnkgfSBmcm9tICd1dGlsJztcbmltcG9ydCAqIGFzIGNoaWxkUHJvY2VzcyBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCBwTWFwIGZyb20gJ3AtbWFwJztcblxuY29uc3QgZXhlYyA9IHByb21pc2lmeShjaGlsZFByb2Nlc3MuZXhlYyk7XG5cbmNvbnN0IHJvb3RQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJy4uJywgJy4uJyk7XG5cbmNvbnN0IEVYVEVOU0lPTlNfVE9fQ0hFQ0sgPSBuZXcgU2V0KFtcbiAgJy5lc2xpbnRpZ25vcmUnLFxuICAnLmdpdGF0dHJpYnV0ZXMnLFxuICAnLmdpdGlnbm9yZScsXG4gICcubnZtcmMnLFxuICAnLnByZXR0aWVyaWdub3JlJyxcbiAgJy5zaCcsXG4gICcuc255aycsXG4gICcueWFybmNsZWFuJyxcbiAgJy55bWwnLFxuICAnLmpzJyxcbiAgJy5zY3NzJyxcbiAgJy50cycsXG4gICcudHN4JyxcbiAgJy5odG1sJyxcbiAgJy5tZCcsXG4gICcucGxpc3QnLFxuXSk7XG5jb25zdCBGSUxFU19UT19JR05PUkUgPSBuZXcgU2V0KFxuICBbXG4gICAgJy5naXRodWIvSVNTVUVfVEVNUExBVEUvYnVnX3JlcG9ydC5tZCcsXG4gICAgJy5naXRodWIvUFVMTF9SRVFVRVNUX1RFTVBMQVRFLm1kJyxcbiAgICAnY29tcG9uZW50cy9tcDNsYW1lZW5jb2Rlci9saWIvTXAzTGFtZUVuY29kZXIuanMnLFxuICAgICdjb21wb25lbnRzL3JlY29yZGVyanMvcmVjb3JkZXIuanMnLFxuICAgICdjb21wb25lbnRzL3JlY29yZGVyanMvcmVjb3JkZXJXb3JrZXIuanMnLFxuICAgICdjb21wb25lbnRzL3dlYmF1ZGlvcmVjb3JkZXIvbGliL1dlYkF1ZGlvUmVjb3JkZXIuanMnLFxuICAgICdjb21wb25lbnRzL3dlYmF1ZGlvcmVjb3JkZXIvbGliL1dlYkF1ZGlvUmVjb3JkZXJNcDMuanMnLFxuICAgICdqcy9NcDNMYW1lRW5jb2Rlci5taW4uanMnLFxuICAgICdqcy9XZWJBdWRpb1JlY29yZGVyTXAzLmpzJyxcbiAgXS5tYXAoXG4gICAgLy8gVGhpcyBtYWtlcyBzdXJlIHRoZSBmaWxlcyBhcmUgY29ycmVjdCBvbiBXaW5kb3dzLlxuICAgIHBhdGgubm9ybWFsaXplXG4gIClcbik7XG5cbi8vIFRoaXMgaXMgbm90IHRlY2huaWNhbGx5IHRoZSByZWFsIGV4dGVuc2lvbi5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFeHRlbnNpb24oZmlsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKGZpbGUuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgcmV0dXJuIGdldEV4dGVuc2lvbihgeC4ke2ZpbGV9YCk7XG4gIH1cbiAgcmV0dXJuIHBhdGguZXh0bmFtZShmaWxlKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZvckVhY2hSZWxldmFudEZpbGUoXG4gIGZuOiAoXzogc3RyaW5nKSA9PiBQcm9taXNlPHVua25vd24+XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZ2l0RmlsZXMgPSAoXG4gICAgYXdhaXQgZXhlYygnZ2l0IGxzLWZpbGVzJywgeyBjd2Q6IHJvb3RQYXRoLCBlbnY6IHt9IH0pXG4gICkuc3Rkb3V0XG4gICAgLnNwbGl0KC9cXG4vZylcbiAgICAubWFwKGxpbmUgPT4gbGluZS50cmltKCkpXG4gICAgLmZpbHRlcihCb29sZWFuKVxuICAgIC5tYXAoZmlsZSA9PiBwYXRoLmpvaW4ocm9vdFBhdGgsIGZpbGUpKTtcblxuICBhd2FpdCBwTWFwKFxuICAgIGdpdEZpbGVzLFxuICAgIGFzeW5jIChmaWxlOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHJlcG9QYXRoID0gcGF0aC5yZWxhdGl2ZShyb290UGF0aCwgZmlsZSk7XG4gICAgICBpZiAoRklMRVNfVE9fSUdOT1JFLmhhcyhyZXBvUGF0aCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBleHRlbnNpb24gPSBnZXRFeHRlbnNpb24oZmlsZSk7XG4gICAgICBpZiAoIUVYVEVOU0lPTlNfVE9fQ0hFQ0suaGFzKGV4dGVuc2lvbikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCBmbihmaWxlKTtcbiAgICB9LFxuICAgIC8vIFdpdGhvdXQgdGhpcywgd2UgbWF5IHJ1biBpbnRvIFwidG9vIG1hbnkgb3BlbiBmaWxlc1wiIGVycm9ycy5cbiAgICB7IGNvbmN1cnJlbmN5OiAxMDAgfVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZEZpcnN0TGluZXMoXG4gIGZpbGU6IHN0cmluZyxcbiAgY291bnQ6IG51bWJlclxuKTogUHJvbWlzZTxBcnJheTxzdHJpbmc+PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBjb25zdCBsaW5lczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gICAgY29uc3QgbGluZVJlYWRlciA9IHJlYWRsaW5lLmNyZWF0ZUludGVyZmFjZSh7XG4gICAgICBpbnB1dDogZnMuY3JlYXRlUmVhZFN0cmVhbShmaWxlKSxcbiAgICB9KTtcbiAgICBsaW5lUmVhZGVyLm9uKCdsaW5lJywgbGluZSA9PiB7XG4gICAgICBsaW5lcy5wdXNoKGxpbmUpO1xuICAgICAgaWYgKGxpbmVzLmxlbmd0aCA+PSBjb3VudCkge1xuICAgICAgICBsaW5lUmVhZGVyLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgbGluZVJlYWRlci5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICByZXNvbHZlKGxpbmVzKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldExhdGVzdENvbW1pdFllYXJGb3JGaWxlKGZpbGU6IHN0cmluZyk6IFByb21pc2U8bnVtYmVyPiB7XG4gIGNvbnN0IGRhdGVTdHJpbmcgPSAoXG4gICAgYXdhaXQgbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICAvLyBXZSB1c2UgdGhlIG1vcmUgdmVyYm9zZSBgc3Bhd25gIHRvIGF2b2lkIGNvbW1hbmQgaW5qZWN0aW9uLCBpbiBjYXNlIHRoZSBmaWxlbmFtZVxuICAgICAgLy8gICBoYXMgc3RyYW5nZSBjaGFyYWN0ZXJzLlxuICAgICAgY29uc3QgZ2l0TG9nID0gY2hpbGRQcm9jZXNzLnNwYXduKFxuICAgICAgICAnZ2l0JyxcbiAgICAgICAgWydsb2cnLCAnLTEnLCAnLS1mb3JtYXQ9JWFzJywgZmlsZV0sXG4gICAgICAgIHtcbiAgICAgICAgICBjd2Q6IHJvb3RQYXRoLFxuICAgICAgICAgIGVudjogeyBQQVRIOiBwcm9jZXNzLmVudi5QQVRIIH0sXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICBnaXRMb2cuc3Rkb3V0Py5vbignZGF0YScsIGRhdGEgPT4ge1xuICAgICAgICByZXN1bHQgKz0gZGF0YS50b1N0cmluZygndXRmOCcpO1xuICAgICAgfSk7XG4gICAgICBnaXRMb2cub24oJ2Nsb3NlJywgY29kZSA9PiB7XG4gICAgICAgIGlmIChjb2RlID09PSAwKSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYGdpdCBsb2cgZmFpbGVkIHdpdGggZXhpdCBjb2RlICR7Y29kZX1gKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pXG4gICkudHJpbSgpO1xuXG4gIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpLmdldEZ1bGxZZWFyKCk7XG4gIGFzc2VydCghTnVtYmVyLmlzTmFOKHJlc3VsdCksIGBDb3VsZCBub3QgcmVhZCBjb21taXQgeWVhciBmb3IgJHtmaWxlfWApO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCBjdXJyZW50WWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSArIDE7XG5cbiAgYXdhaXQgZm9yRWFjaFJlbGV2YW50RmlsZShhc3luYyBmaWxlID0+IHtcbiAgICBjb25zdCBbZmlyc3RMaW5lXSA9IGF3YWl0IHJlYWRGaXJzdExpbmVzKGZpbGUsIDEpO1xuICAgIGNvbnN0IHsgZ3JvdXBzID0ge30gfSA9XG4gICAgICBmaXJzdExpbmUubWF0Y2goLyg/OlxcZHs0fS0pPyg/PGVuZFllYXJTdHJpbmc+XFxkezR9KS8pIHx8IFtdO1xuICAgIGNvbnN0IHsgZW5kWWVhclN0cmluZyB9ID0gZ3JvdXBzO1xuICAgIGNvbnN0IGVuZFllYXIgPSBOdW1iZXIoZW5kWWVhclN0cmluZyk7XG5cbiAgICBhc3NlcnQoXG4gICAgICBlbmRZZWFyID09PSBjdXJyZW50WWVhciB8fFxuICAgICAgICBlbmRZZWFyID09PSAoYXdhaXQgZ2V0TGF0ZXN0Q29tbWl0WWVhckZvckZpbGUoZmlsZSkpLFxuICAgICAgYCR7ZmlsZX0gaGFzIGFuIGludmFsaWQgZW5kIGxpY2Vuc2UgeWVhcmBcbiAgICApO1xuICB9KTtcbn1cblxuLy8gTm90ZTogdGhpcyBjaGVjayB3aWxsIGZhaWwgaWYgd2Ugc3dpdGNoIHRvIEVTIG1vZHVsZXMuIFNlZVxuLy8gIDxodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjAzMDk2ODI+LlxuaWYgKHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlKSB7XG4gIG1haW4oKS5jYXRjaChlcnIgPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1BLG9CQUFtQjtBQUNuQixlQUEwQjtBQUMxQixXQUFzQjtBQUN0QixTQUFvQjtBQUNwQixrQkFBMEI7QUFDMUIsbUJBQThCO0FBQzlCLG1CQUFpQjtBQUVqQixNQUFNLE9BQU8sMkJBQVUsYUFBYSxJQUFJO0FBRXhDLE1BQU0sV0FBVyxLQUFLLEtBQUssV0FBVyxNQUFNLE1BQU0sSUFBSTtBQUV0RCxNQUFNLHNCQUFzQixvQkFBSSxJQUFJO0FBQUEsRUFDbEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixDQUFDO0FBQ0QsTUFBTSxrQkFBa0IsSUFBSSxJQUMxQjtBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLEVBQUUsSUFFQSxLQUFLLFNBQ1AsQ0FDRjtBQUdPLHNCQUFzQixNQUFzQjtBQUNqRCxNQUFJLEtB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
