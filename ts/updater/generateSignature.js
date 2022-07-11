var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_path = require("path");
var import_fs = require("fs");
var import_pify = __toESM(require("pify"));
var Errors = __toESM(require("../types/errors"));
var import_common = require("./common");
var import_signature = require("./signature");
var packageJson = __toESM(require("../../package.json"));
const readdir = (0, import_pify.default)(import_fs.readdir);
const OPTIONS = [
  {
    names: ["help", "h"],
    type: "bool",
    help: "Print this help and exit."
  },
  {
    names: ["private", "p"],
    type: "string",
    help: "Path to private key file (default: ./private.key)",
    default: "private.key"
  },
  {
    names: ["update", "u"],
    type: "string",
    help: "Path to the update package (default: the .exe or .zip in ./release)"
  },
  {
    names: ["version", "v"],
    type: "string",
    help: `Version number of this package (default: ${packageJson.version})`,
    default: packageJson.version
  }
];
const cliOptions = (0, import_common.getCliOptions)(OPTIONS);
go(cliOptions).catch((error) => {
  console.error("Something went wrong!", Errors.toLogFormat(error));
});
async function go(options) {
  const { private: privateKeyPath, version } = options;
  let updatePaths;
  if (options.update) {
    updatePaths = [options.update];
  } else {
    updatePaths = await findUpdatePaths();
  }
  await Promise.all(updatePaths.map(async (updatePath) => {
    console.log("Signing with...");
    console.log(`  version: ${version}`);
    console.log(`  update file: ${updatePath}`);
    console.log(`  private key file: ${privateKeyPath}`);
    await (0, import_signature.writeSignature)(updatePath, version, privateKeyPath);
  }));
}
const IS_EXE = /\.exe$/;
const IS_ZIP = /\.zip$/;
async function findUpdatePaths() {
  const releaseDir = (0, import_path.resolve)("release");
  const files = await readdir(releaseDir);
  const max = files.length;
  const results = new Array();
  for (let i = 0; i < max; i += 1) {
    const file = files[i];
    const fullPath = (0, import_path.join)(releaseDir, file);
    if (IS_EXE.test(file) || IS_ZIP.test(file)) {
      results.push(fullPath);
    }
  }
  if (results.length === 0) {
    throw new Error("No suitable file found in 'release' folder!");
  }
  return results;
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2VuZXJhdGVTaWduYXR1cmUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5pbXBvcnQgeyBqb2luLCByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyByZWFkZGlyIGFzIHJlYWRkaXJDYWxsYmFjayB9IGZyb20gJ2ZzJztcblxuaW1wb3J0IHBpZnkgZnJvbSAncGlmeSc7XG5cbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tICcuLi90eXBlcy9lcnJvcnMnO1xuaW1wb3J0IHsgZ2V0Q2xpT3B0aW9ucyB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IHdyaXRlU2lnbmF0dXJlIH0gZnJvbSAnLi9zaWduYXR1cmUnO1xuaW1wb3J0ICogYXMgcGFja2FnZUpzb24gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcblxuY29uc3QgcmVhZGRpciA9IHBpZnkocmVhZGRpckNhbGxiYWNrKTtcblxuY29uc3QgT1BUSU9OUyA9IFtcbiAge1xuICAgIG5hbWVzOiBbJ2hlbHAnLCAnaCddLFxuICAgIHR5cGU6ICdib29sJyxcbiAgICBoZWxwOiAnUHJpbnQgdGhpcyBoZWxwIGFuZCBleGl0LicsXG4gIH0sXG4gIHtcbiAgICBuYW1lczogWydwcml2YXRlJywgJ3AnXSxcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBoZWxwOiAnUGF0aCB0byBwcml2YXRlIGtleSBmaWxlIChkZWZhdWx0OiAuL3ByaXZhdGUua2V5KScsXG4gICAgZGVmYXVsdDogJ3ByaXZhdGUua2V5JyxcbiAgfSxcbiAge1xuICAgIG5hbWVzOiBbJ3VwZGF0ZScsICd1J10sXG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgaGVscDogJ1BhdGggdG8gdGhlIHVwZGF0ZSBwYWNrYWdlIChkZWZhdWx0OiB0aGUgLmV4ZSBvciAuemlwIGluIC4vcmVsZWFzZSknLFxuICB9LFxuICB7XG4gICAgbmFtZXM6IFsndmVyc2lvbicsICd2J10sXG4gICAgdHlwZTogJ3N0cmluZycsXG4gICAgaGVscDogYFZlcnNpb24gbnVtYmVyIG9mIHRoaXMgcGFja2FnZSAoZGVmYXVsdDogJHtwYWNrYWdlSnNvbi52ZXJzaW9ufSlgLFxuICAgIGRlZmF1bHQ6IHBhY2thZ2VKc29uLnZlcnNpb24sXG4gIH0sXG5dO1xuXG50eXBlIE9wdGlvbnNUeXBlID0ge1xuICBwcml2YXRlOiBzdHJpbmc7XG4gIHVwZGF0ZTogc3RyaW5nO1xuICB2ZXJzaW9uOiBzdHJpbmc7XG59O1xuXG5jb25zdCBjbGlPcHRpb25zID0gZ2V0Q2xpT3B0aW9uczxPcHRpb25zVHlwZT4oT1BUSU9OUyk7XG5nbyhjbGlPcHRpb25zKS5jYXRjaChlcnJvciA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoJ1NvbWV0aGluZyB3ZW50IHdyb25nIScsIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcikpO1xufSk7XG5cbmFzeW5jIGZ1bmN0aW9uIGdvKG9wdGlvbnM6IE9wdGlvbnNUeXBlKSB7XG4gIGNvbnN0IHsgcHJpdmF0ZTogcHJpdmF0ZUtleVBhdGgsIHZlcnNpb24gfSA9IG9wdGlvbnM7XG5cbiAgbGV0IHVwZGF0ZVBhdGhzOiBBcnJheTxzdHJpbmc+O1xuICBpZiAob3B0aW9ucy51cGRhdGUpIHtcbiAgICB1cGRhdGVQYXRocyA9IFtvcHRpb25zLnVwZGF0ZV07XG4gIH0gZWxzZSB7XG4gICAgdXBkYXRlUGF0aHMgPSBhd2FpdCBmaW5kVXBkYXRlUGF0aHMoKTtcbiAgfVxuXG4gIGF3YWl0IFByb21pc2UuYWxsKFxuICAgIHVwZGF0ZVBhdGhzLm1hcChhc3luYyB1cGRhdGVQYXRoID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdTaWduaW5nIHdpdGguLi4nKTtcbiAgICAgIGNvbnNvbGUubG9nKGAgIHZlcnNpb246ICR7dmVyc2lvbn1gKTtcbiAgICAgIGNvbnNvbGUubG9nKGAgIHVwZGF0ZSBmaWxlOiAke3VwZGF0ZVBhdGh9YCk7XG4gICAgICBjb25zb2xlLmxvZyhgICBwcml2YXRlIGtleSBmaWxlOiAke3ByaXZhdGVLZXlQYXRofWApO1xuXG4gICAgICBhd2FpdCB3cml0ZVNpZ25hdHVyZSh1cGRhdGVQYXRoLCB2ZXJzaW9uLCBwcml2YXRlS2V5UGF0aCk7XG4gICAgfSlcbiAgKTtcbn1cblxuY29uc3QgSVNfRVhFID0gL1xcLmV4ZSQvO1xuY29uc3QgSVNfWklQID0gL1xcLnppcCQvO1xuYXN5bmMgZnVuY3Rpb24gZmluZFVwZGF0ZVBhdGhzKCk6IFByb21pc2U8QXJyYXk8c3RyaW5nPj4ge1xuICBjb25zdCByZWxlYXNlRGlyID0gcmVzb2x2ZSgncmVsZWFzZScpO1xuICBjb25zdCBmaWxlczogQXJyYXk8c3RyaW5nPiA9IGF3YWl0IHJlYWRkaXIocmVsZWFzZURpcik7XG5cbiAgY29uc3QgbWF4ID0gZmlsZXMubGVuZ3RoO1xuICBjb25zdCByZXN1bHRzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXg7IGkgKz0gMSkge1xuICAgIGNvbnN0IGZpbGUgPSBmaWxlc1tpXTtcbiAgICBjb25zdCBmdWxsUGF0aCA9IGpvaW4ocmVsZWFzZURpciwgZmlsZSk7XG5cbiAgICBpZiAoSVNfRVhFLnRlc3QoZmlsZSkgfHwgSVNfWklQLnRlc3QoZmlsZSkpIHtcbiAgICAgIHJlc3VsdHMucHVzaChmdWxsUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHJlc3VsdHMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VpdGFibGUgZmlsZSBmb3VuZCBpbiAncmVsZWFzZScgZm9sZGVyIVwiKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHRzO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLGtCQUE4QjtBQUM5QixnQkFBMkM7QUFFM0Msa0JBQWlCO0FBRWpCLGFBQXdCO0FBQ3hCLG9CQUE4QjtBQUM5Qix1QkFBK0I7QUFDL0Isa0JBQTZCO0FBRTdCLE1BQU0sVUFBVSx5QkFBSyxpQkFBZTtBQUVwQyxNQUFNLFVBQVU7QUFBQSxFQUNkO0FBQUEsSUFDRSxPQUFPLENBQUMsUUFBUSxHQUFHO0FBQUEsSUFDbkIsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBO0FBQUEsSUFDRSxPQUFPLENBQUMsV0FBVyxHQUFHO0FBQUEsSUFDdEIsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ1g7QUFBQSxFQUNBO0FBQUEsSUFDRSxPQUFPLENBQUMsVUFBVSxHQUFHO0FBQUEsSUFDckIsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBO0FBQUEsSUFDRSxPQUFPLENBQUMsV0FBVyxHQUFHO0FBQUEsSUFDdEIsTUFBTTtBQUFBLElBQ04sTUFBTSw0Q0FBNEMsWUFBWTtBQUFBLElBQzlELFNBQVMsWUFBWTtBQUFBLEVBQ3ZCO0FBQ0Y7QUFRQSxNQUFNLGFBQWEsaUNBQTJCLE9BQU87QUFDckQsR0FBRyxVQUFVLEVBQUUsTUFBTSxXQUFTO0FBQzVCLFVBQVEsTUFBTSx5QkFBeUIsT0FBTyxZQUFZLEtBQUssQ0FBQztBQUNsRSxDQUFDO0FBRUQsa0JBQWtCLFNBQXNCO0FBQ3RDLFFBQU0sRUFBRSxTQUFTLGdCQUFnQixZQUFZO0FBRTdDLE1BQUk7QUFDSixNQUFJLFFBQVEsUUFBUTtBQUNsQixrQkFBYyxDQUFDLFFBQVEsTUFBTTtBQUFBLEVBQy9CLE9BQU87QUFDTCxrQkFBYyxNQUFNLGdCQUFnQjtBQUFBLEVBQ3RDO0FBRUEsUUFBTSxRQUFRLElBQ1osWUFBWSxJQUFJLE9BQU0sZUFBYztBQUNsQyxZQUFRLElBQUksaUJBQWlCO0FBQzdCLFlBQVEsSUFBSSxjQUFjLFNBQVM7QUFDbkMsWUFBUSxJQUFJLGtCQUFrQixZQUFZO0FBQzFDLFlBQVEsSUFBSSx1QkFBdUIsZ0JBQWdCO0FBRW5ELFVBQU0scUNBQWUsWUFBWSxTQUFTLGNBQWM7QUFBQSxFQUMxRCxDQUFDLENBQ0g7QUFDRjtBQXBCZSxBQXNCZixNQUFNLFNBQVM7QUFDZixNQUFNLFNBQVM7QUFDZixpQ0FBeUQ7QUFDdkQsUUFBTSxhQUFhLHlCQUFRLFNBQVM7QUFDcEMsUUFBTSxRQUF1QixNQUFNLFFBQVEsVUFBVTtBQUVyRCxRQUFNLE1BQU0sTUFBTTtBQUNsQixRQUFNLFVBQVUsSUFBSSxNQUFjO0FBQ2xDLFdBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxLQUFLLEdBQUc7QUFDL0IsVUFBTSxPQUFPLE1BQU07QUFDbkIsVUFBTSxXQUFXLHNCQUFLLFlBQVksSUFBSTtBQUV0QyxRQUFJLE9BQU8sS0FBSyxJQUFJLEtBQUssT0FBTyxLQUFLLElBQUksR0FBRztBQUMxQyxjQUFRLEtBQUssUUFBUTtBQUFBLElBQ3ZCO0FBQUEsRUFDRjtBQUVBLE1BQUksUUFBUSxXQUFXLEdBQUc7QUFDeEIsVUFBTSxJQUFJLE1BQU0sNkNBQTZDO0FBQUEsRUFDL0Q7QUFFQSxTQUFPO0FBQ1Q7QUFwQmUiLAogICJuYW1lcyI6IFtdCn0K
