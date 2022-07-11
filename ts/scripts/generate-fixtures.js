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
var import_promises = __toESM(require("fs/promises"));
var import_path = __toESM(require("path"));
var import_crypto = __toESM(require("crypto"));
var import_child_process = require("child_process");
const FIXTURES = import_path.default.join(__dirname, "..", "..", "fixtures");
const SIZE = 256 * 1024;
async function main() {
  const original = import_crypto.default.randomBytes(SIZE);
  const originalPath = import_path.default.join(FIXTURES, "diff-original.bin");
  await import_promises.default.writeFile(originalPath, original);
  for (let i = 0; i < 3; i += 1) {
    original[Math.floor(Math.random() * original.length)] = 0;
  }
  const modifiedPath = import_path.default.join(FIXTURES, "diff-modified.bin");
  await import_promises.default.writeFile(modifiedPath, original);
  const appBuilder = import_path.default.join(__dirname, "..", "..", "node_modules", "app-builder-bin", "mac", "app-builder_amd64");
  for (const filePath of [originalPath, modifiedPath]) {
    console.log("Adding blockmap to", filePath);
    console.log((0, import_child_process.execFileSync)(appBuilder, [
      "blockmap",
      "--input",
      filePath,
      "--output",
      `${filePath}.blockmap`
    ]).toString());
  }
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2VuZXJhdGUtZml4dHVyZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IGZzIGZyb20gJ2ZzL3Byb21pc2VzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IHsgZXhlY0ZpbGVTeW5jIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5cbmNvbnN0IEZJWFRVUkVTID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJy4uJywgJ2ZpeHR1cmVzJyk7XG5jb25zdCBTSVpFID0gMjU2ICogMTAyNDtcblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3Qgb3JpZ2luYWwgPSBjcnlwdG8ucmFuZG9tQnl0ZXMoU0laRSk7XG5cbiAgY29uc3Qgb3JpZ2luYWxQYXRoID0gcGF0aC5qb2luKEZJWFRVUkVTLCAnZGlmZi1vcmlnaW5hbC5iaW4nKTtcbiAgYXdhaXQgZnMud3JpdGVGaWxlKG9yaWdpbmFsUGF0aCwgb3JpZ2luYWwpO1xuXG4gIC8vIEFkZCBhIGZldyBicm9rZW4gYnl0ZXMgdG8gaGVscCBjcmVhdGUgdXNlZnVsIGJsb2NrbWFwc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkgKz0gMSkge1xuICAgIG9yaWdpbmFsW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9yaWdpbmFsLmxlbmd0aCldID0gMDtcbiAgfVxuXG4gIGNvbnN0IG1vZGlmaWVkUGF0aCA9IHBhdGguam9pbihGSVhUVVJFUywgJ2RpZmYtbW9kaWZpZWQuYmluJyk7XG4gIGF3YWl0IGZzLndyaXRlRmlsZShtb2RpZmllZFBhdGgsIG9yaWdpbmFsKTtcblxuICBjb25zdCBhcHBCdWlsZGVyID0gcGF0aC5qb2luKFxuICAgIF9fZGlybmFtZSxcbiAgICAnLi4nLFxuICAgICcuLicsXG4gICAgJ25vZGVfbW9kdWxlcycsXG4gICAgJ2FwcC1idWlsZGVyLWJpbicsXG4gICAgJ21hYycsXG4gICAgJ2FwcC1idWlsZGVyX2FtZDY0J1xuICApO1xuXG4gIGZvciAoY29uc3QgZmlsZVBhdGggb2YgW29yaWdpbmFsUGF0aCwgbW9kaWZpZWRQYXRoXSkge1xuICAgIGNvbnNvbGUubG9nKCdBZGRpbmcgYmxvY2ttYXAgdG8nLCBmaWxlUGF0aCk7XG5cbiAgICAvLyBQdXQgYmxvY2ttYXAgaW50byBhIHNlcGFyYXRlIGZpbGVcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGV4ZWNGaWxlU3luYyhhcHBCdWlsZGVyLCBbXG4gICAgICAgICdibG9ja21hcCcsXG4gICAgICAgICctLWlucHV0JyxcbiAgICAgICAgZmlsZVBhdGgsXG4gICAgICAgICctLW91dHB1dCcsXG4gICAgICAgIGAke2ZpbGVQYXRofS5ibG9ja21hcGAsXG4gICAgICBdKS50b1N0cmluZygpXG4gICAgKTtcbiAgfVxufVxuXG5tYWluKCkuY2F0Y2goZXJyID0+IHtcbiAgY29uc29sZS5lcnJvcihlcnIpO1xuICBwcm9jZXNzLmV4aXQoMSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxzQkFBZTtBQUNmLGtCQUFpQjtBQUNqQixvQkFBbUI7QUFDbkIsMkJBQTZCO0FBRTdCLE1BQU0sV0FBVyxvQkFBSyxLQUFLLFdBQVcsTUFBTSxNQUFNLFVBQVU7QUFDNUQsTUFBTSxPQUFPLE1BQU07QUFFbkIsc0JBQXNCO0FBQ3BCLFFBQU0sV0FBVyxzQkFBTyxZQUFZLElBQUk7QUFFeEMsUUFBTSxlQUFlLG9CQUFLLEtBQUssVUFBVSxtQkFBbUI7QUFDNUQsUUFBTSx3QkFBRyxVQUFVLGNBQWMsUUFBUTtBQUd6QyxXQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHO0FBQzdCLGFBQVMsS0FBSyxNQUFNLEtBQUssT0FBTyxJQUFJLFNBQVMsTUFBTSxLQUFLO0FBQUEsRUFDMUQ7QUFFQSxRQUFNLGVBQWUsb0JBQUssS0FBSyxVQUFVLG1CQUFtQjtBQUM1RCxRQUFNLHdCQUFHLFVBQVUsY0FBYyxRQUFRO0FBRXpDLFFBQU0sYUFBYSxvQkFBSyxLQUN0QixXQUNBLE1BQ0EsTUFDQSxnQkFDQSxtQkFDQSxPQUNBLG1CQUNGO0FBRUEsYUFBVyxZQUFZLENBQUMsY0FBYyxZQUFZLEdBQUc7QUFDbkQsWUFBUSxJQUFJLHNCQUFzQixRQUFRO0FBRzFDLFlBQVEsSUFDTix1Q0FBYSxZQUFZO0FBQUEsTUFDdkI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLEdBQUc7QUFBQSxJQUNMLENBQUMsRUFBRSxTQUFTLENBQ2Q7QUFBQSxFQUNGO0FBQ0Y7QUF0Q2UsQUF3Q2YsS0FBSyxFQUFFLE1BQU0sU0FBTztBQUNsQixVQUFRLE1BQU0sR0FBRztBQUNqQixVQUFRLEtBQUssQ0FBQztBQUNoQixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
