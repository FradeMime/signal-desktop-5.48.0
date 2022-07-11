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
var copy_language_packs_exports = {};
__export(copy_language_packs_exports, {
  afterPack: () => afterPack
});
module.exports = __toCommonJS(copy_language_packs_exports);
var import_fs_extra = __toESM(require("fs-extra"));
var import_path = __toESM(require("path"));
async function afterPack({
  appOutDir,
  packager,
  electronPlatformName
}) {
  let defaultLocale;
  let ourLocales = await import_fs_extra.default.readdir(import_path.default.join(__dirname, "..", "..", "_locales"));
  let localesPath;
  if (electronPlatformName === "darwin") {
    const { productFilename } = packager.appInfo;
    defaultLocale = "en.lproj";
    ourLocales = ourLocales.map((locale) => `${locale}.lproj`);
    localesPath = import_path.default.join(appOutDir, `${productFilename}.app`, "Contents", "Resources");
  } else if (electronPlatformName === "linux" || electronPlatformName === "win32") {
    defaultLocale = "en-US.pak";
    ourLocales = ourLocales.map((locale) => {
      if (locale === "en") {
        return defaultLocale;
      }
      return `${locale.replace(/_/g, "-")}.pak`;
    });
    localesPath = import_path.default.join(appOutDir, "locales");
  } else {
    console.error(`Unsupported platform: ${electronPlatformName}, not copying pak files`);
    return;
  }
  const electronLocales = new Set(await import_fs_extra.default.readdir(localesPath));
  const promises = new Array();
  for (const locale of ourLocales) {
    if (electronLocales.has(locale)) {
      continue;
    }
    console.log(`Copying ${defaultLocale} to ${locale}`);
    promises.push(import_fs_extra.default.copy(import_path.default.join(localesPath, defaultLocale), import_path.default.join(localesPath, locale)));
  }
  await Promise.all(promises);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  afterPack
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29weS1sYW5ndWFnZS1wYWNrcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgZnNlIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHR5cGUgeyBBZnRlclBhY2tDb250ZXh0IH0gZnJvbSAnZWxlY3Ryb24tYnVpbGRlcic7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZnRlclBhY2soe1xuICBhcHBPdXREaXIsXG4gIHBhY2thZ2VyLFxuICBlbGVjdHJvblBsYXRmb3JtTmFtZSxcbn06IEFmdGVyUGFja0NvbnRleHQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgbGV0IGRlZmF1bHRMb2NhbGU6IHN0cmluZztcbiAgbGV0IG91ckxvY2FsZXMgPSBhd2FpdCBmc2UucmVhZGRpcihcbiAgICBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nLCAnLi4nLCAnX2xvY2FsZXMnKVxuICApO1xuXG4gIGxldCBsb2NhbGVzUGF0aDogc3RyaW5nO1xuICBpZiAoZWxlY3Ryb25QbGF0Zm9ybU5hbWUgPT09ICdkYXJ3aW4nKSB7XG4gICAgY29uc3QgeyBwcm9kdWN0RmlsZW5hbWUgfSA9IHBhY2thZ2VyLmFwcEluZm87XG5cbiAgICAvLyBlbi5scHJvai9sb2NhbGUucGFrXG4gICAgLy8gemhfQ04ubHByb2ovbG9jYWxlLnBha1xuICAgIGRlZmF1bHRMb2NhbGUgPSAnZW4ubHByb2onO1xuICAgIG91ckxvY2FsZXMgPSBvdXJMb2NhbGVzLm1hcChsb2NhbGUgPT4gYCR7bG9jYWxlfS5scHJvamApO1xuXG4gICAgbG9jYWxlc1BhdGggPSBwYXRoLmpvaW4oXG4gICAgICBhcHBPdXREaXIsXG4gICAgICBgJHtwcm9kdWN0RmlsZW5hbWV9LmFwcGAsXG4gICAgICAnQ29udGVudHMnLFxuICAgICAgJ1Jlc291cmNlcydcbiAgICApO1xuICB9IGVsc2UgaWYgKFxuICAgIGVsZWN0cm9uUGxhdGZvcm1OYW1lID09PSAnbGludXgnIHx8XG4gICAgZWxlY3Ryb25QbGF0Zm9ybU5hbWUgPT09ICd3aW4zMidcbiAgKSB7XG4gICAgLy8gU2hhcmVkIGJldHdlZW4gd2luZG93cyBhbmQgbGludXhcbiAgICBkZWZhdWx0TG9jYWxlID0gJ2VuLVVTLnBhayc7XG4gICAgb3VyTG9jYWxlcyA9IG91ckxvY2FsZXMubWFwKGxvY2FsZSA9PiB7XG4gICAgICBpZiAobG9jYWxlID09PSAnZW4nKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0TG9jYWxlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYCR7bG9jYWxlLnJlcGxhY2UoL18vZywgJy0nKX0ucGFrYDtcbiAgICB9KTtcblxuICAgIGxvY2FsZXNQYXRoID0gcGF0aC5qb2luKGFwcE91dERpciwgJ2xvY2FsZXMnKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgYFVuc3VwcG9ydGVkIHBsYXRmb3JtOiAke2VsZWN0cm9uUGxhdGZvcm1OYW1lfSwgbm90IGNvcHlpbmcgcGFrIGZpbGVzYFxuICAgICk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZWxlY3Ryb25Mb2NhbGVzID0gbmV3IFNldChhd2FpdCBmc2UucmVhZGRpcihsb2NhbGVzUGF0aCkpO1xuICBjb25zdCBwcm9taXNlcyA9IG5ldyBBcnJheTxQcm9taXNlPHZvaWQ+PigpO1xuICBmb3IgKGNvbnN0IGxvY2FsZSBvZiBvdXJMb2NhbGVzKSB7XG4gICAgaWYgKGVsZWN0cm9uTG9jYWxlcy5oYXMobG9jYWxlKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coYENvcHlpbmcgJHtkZWZhdWx0TG9jYWxlfSB0byAke2xvY2FsZX1gKTtcbiAgICBwcm9taXNlcy5wdXNoKFxuICAgICAgZnNlLmNvcHkoXG4gICAgICAgIHBhdGguam9pbihsb2NhbGVzUGF0aCwgZGVmYXVsdExvY2FsZSksXG4gICAgICAgIHBhdGguam9pbihsb2NhbGVzUGF0aCwgbG9jYWxlKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esc0JBQWdCO0FBQ2hCLGtCQUFpQjtBQUdqQix5QkFBZ0M7QUFBQSxFQUM5QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FDa0M7QUFDbEMsTUFBSTtBQUNKLE1BQUksYUFBYSxNQUFNLHdCQUFJLFFBQ3pCLG9CQUFLLEtBQUssV0FBVyxNQUFNLE1BQU0sVUFBVSxDQUM3QztBQUVBLE1BQUk7QUFDSixNQUFJLHlCQUF5QixVQUFVO0FBQ3JDLFVBQU0sRUFBRSxvQkFBb0IsU0FBUztBQUlyQyxvQkFBZ0I7QUFDaEIsaUJBQWEsV0FBVyxJQUFJLFlBQVUsR0FBRyxjQUFjO0FBRXZELGtCQUFjLG9CQUFLLEtBQ2pCLFdBQ0EsR0FBRyx1QkFDSCxZQUNBLFdBQ0Y7QUFBQSxFQUNGLFdBQ0UseUJBQXlCLFdBQ3pCLHlCQUF5QixTQUN6QjtBQUVBLG9CQUFnQjtBQUNoQixpQkFBYSxXQUFXLElBQUksWUFBVTtBQUNwQyxVQUFJLFdBQVcsTUFBTTtBQUNuQixlQUFPO0FBQUEsTUFDVDtBQUVBLGFBQU8sR0FBRyxPQUFPLFFBQVEsTUFBTSxHQUFHO0FBQUEsSUFDcEMsQ0FBQztBQUVELGtCQUFjLG9CQUFLLEtBQUssV0FBVyxTQUFTO0FBQUEsRUFDOUMsT0FBTztBQUNMLFlBQVEsTUFDTix5QkFBeUIsNkNBQzNCO0FBQ0E7QUFBQSxFQUNGO0FBRUEsUUFBTSxrQkFBa0IsSUFBSSxJQUFJLE1BQU0sd0JBQUksUUFBUSxXQUFXLENBQUM7QUFDOUQsUUFBTSxXQUFXLElBQUksTUFBcUI7QUFDMUMsYUFBVyxVQUFVLFlBQVk7QUFDL0IsUUFBSSxnQkFBZ0IsSUFBSSxNQUFNLEdBQUc7QUFDL0I7QUFBQSxJQUNGO0FBRUEsWUFBUSxJQUFJLFdBQVcsb0JBQW9CLFFBQVE7QUFDbkQsYUFBUyxLQUNQLHdCQUFJLEtBQ0Ysb0JBQUssS0FBSyxhQUFhLGFBQWEsR0FDcEMsb0JBQUssS0FBSyxhQUFhLE1BQU0sQ0FDL0IsQ0FDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLFFBQVEsSUFBSSxRQUFRO0FBQzVCO0FBaEVzQiIsCiAgIm5hbWVzIjogW10KfQo=
