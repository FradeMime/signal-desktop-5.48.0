var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var spell_check_exports = {};
__export(spell_check_exports, {
  getLanguages: () => getLanguages,
  setup: () => setup
});
module.exports = __toCommonJS(spell_check_exports);
var import_electron = require("electron");
var import_lodash = require("lodash");
var import_url = require("url");
var import_url2 = require("../ts/util/url");
function getLanguages(userLocale, availableLocales) {
  const baseLocale = userLocale.split("-")[0];
  const candidateLocales = (0, import_lodash.uniq)([userLocale, baseLocale]).filter((l) => availableLocales.includes(l));
  if (candidateLocales.length > 0) {
    return candidateLocales;
  }
  return (0, import_lodash.uniq)(availableLocales.filter((l) => l.startsWith(baseLocale)));
}
const setup = /* @__PURE__ */ __name((browserWindow, { name: userLocale, messages }) => {
  const { session } = browserWindow.webContents;
  const availableLocales = session.availableSpellCheckerLanguages;
  const languages = getLanguages(userLocale, availableLocales);
  console.log(`spellcheck: user locale: ${userLocale}`);
  console.log("spellcheck: available spellchecker languages: ", availableLocales);
  console.log("spellcheck: setting languages to: ", languages);
  session.setSpellCheckerLanguages(languages);
  browserWindow.webContents.on("context-menu", (_event, params) => {
    const { editFlags } = params;
    const isMisspelled = Boolean(params.misspelledWord);
    const isLink = Boolean(params.linkURL);
    const isImage = params.mediaType === "image" && params.hasImageContents && params.srcURL;
    const showMenu = params.isEditable || editFlags.canCopy || isLink || isImage;
    if (showMenu) {
      const template = [];
      if (isMisspelled) {
        if (params.dictionarySuggestions.length > 0) {
          template.push(...params.dictionarySuggestions.map((label) => ({
            label,
            click: () => {
              browserWindow.webContents.replaceMisspelling(label);
            }
          })));
        } else {
          template.push({
            label: messages.contextMenuNoSuggestions.message,
            enabled: false
          });
        }
        template.push({ type: "separator" });
      }
      if (params.isEditable) {
        if (editFlags.canUndo) {
          template.push({ label: messages.editMenuUndo.message, role: "undo" });
        }
        if (editFlags.canRedo) {
          template.push({ label: messages.editMenuRedo.message, role: "redo" });
        }
        if (editFlags.canUndo || editFlags.canRedo) {
          template.push({ type: "separator" });
        }
        if (editFlags.canCut) {
          template.push({ label: messages.editMenuCut.message, role: "cut" });
        }
      }
      if (editFlags.canCopy || isLink || isImage) {
        let click;
        let label;
        if (isLink) {
          click = /* @__PURE__ */ __name(() => {
            import_electron.clipboard.writeText(params.linkURL);
          }, "click");
          label = messages.contextMenuCopyLink.message;
        } else if (isImage) {
          click = /* @__PURE__ */ __name(() => {
            const parsedSrcUrl = (0, import_url2.maybeParseUrl)(params.srcURL);
            if (!parsedSrcUrl || parsedSrcUrl.protocol !== "file:") {
              return;
            }
            const image = import_electron.nativeImage.createFromPath((0, import_url.fileURLToPath)(params.srcURL));
            import_electron.clipboard.writeImage(image);
          }, "click");
          label = messages.contextMenuCopyImage.message;
        } else {
          label = messages.editMenuCopy.message;
        }
        template.push({
          label,
          role: isLink || isImage ? void 0 : "copy",
          click
        });
      }
      if (editFlags.canPaste && !isImage) {
        template.push({ label: messages.editMenuPaste.message, role: "paste" });
      }
      if (editFlags.canPaste && !isImage) {
        template.push({
          label: messages.editMenuPasteAndMatchStyle.message,
          role: "pasteAndMatchStyle"
        });
      }
      if (editFlags.canSelectAll && params.isEditable) {
        template.push({
          label: messages.editMenuSelectAll.message,
          role: "selectAll"
        });
      }
      const menu = import_electron.Menu.buildFromTemplate(template);
      menu.popup({
        window: browserWindow
      });
    }
  });
}, "setup");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getLanguages,
  setup
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3BlbGxfY2hlY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEJyb3dzZXJXaW5kb3cgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgeyBNZW51LCBjbGlwYm9hcmQsIG5hdGl2ZUltYWdlIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHsgdW5pcSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJztcblxuaW1wb3J0IHsgbWF5YmVQYXJzZVVybCB9IGZyb20gJy4uL3RzL3V0aWwvdXJsJztcbmltcG9ydCB0eXBlIHsgTG9jYWxlVHlwZSB9IGZyb20gJy4vbG9jYWxlJztcblxuaW1wb3J0IHR5cGUgeyBNZW51TGlzdFR5cGUgfSBmcm9tICcuLi90cy90eXBlcy9tZW51JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldExhbmd1YWdlcyhcbiAgdXNlckxvY2FsZTogc3RyaW5nLFxuICBhdmFpbGFibGVMb2NhbGVzOiBSZWFkb25seUFycmF5PHN0cmluZz5cbik6IEFycmF5PHN0cmluZz4ge1xuICBjb25zdCBiYXNlTG9jYWxlID0gdXNlckxvY2FsZS5zcGxpdCgnLScpWzBdO1xuICAvLyBBdHRlbXB0IHRvIGZpbmQgdGhlIGV4YWN0IGxvY2FsZVxuICBjb25zdCBjYW5kaWRhdGVMb2NhbGVzID0gdW5pcShbdXNlckxvY2FsZSwgYmFzZUxvY2FsZV0pLmZpbHRlcihsID0+XG4gICAgYXZhaWxhYmxlTG9jYWxlcy5pbmNsdWRlcyhsKVxuICApO1xuXG4gIGlmIChjYW5kaWRhdGVMb2NhbGVzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gY2FuZGlkYXRlTG9jYWxlcztcbiAgfVxuXG4gIC8vIElmIG5vIGxhbmd1YWdlcyB3ZXJlIGZvdW5kIHRoZW4ganVzdCByZXR1cm4gYWxsIGxvY2FsZXMgdGhhdCBzdGFydCB3aXRoIHRoZVxuICAvLyBiYXNlXG4gIHJldHVybiB1bmlxKGF2YWlsYWJsZUxvY2FsZXMuZmlsdGVyKGwgPT4gbC5zdGFydHNXaXRoKGJhc2VMb2NhbGUpKSk7XG59XG5cbmV4cG9ydCBjb25zdCBzZXR1cCA9IChcbiAgYnJvd3NlcldpbmRvdzogQnJvd3NlcldpbmRvdyxcbiAgeyBuYW1lOiB1c2VyTG9jYWxlLCBtZXNzYWdlcyB9OiBMb2NhbGVUeXBlXG4pOiB2b2lkID0+IHtcbiAgY29uc3QgeyBzZXNzaW9uIH0gPSBicm93c2VyV2luZG93LndlYkNvbnRlbnRzO1xuICBjb25zdCBhdmFpbGFibGVMb2NhbGVzID0gc2Vzc2lvbi5hdmFpbGFibGVTcGVsbENoZWNrZXJMYW5ndWFnZXM7XG4gIGNvbnN0IGxhbmd1YWdlcyA9IGdldExhbmd1YWdlcyh1c2VyTG9jYWxlLCBhdmFpbGFibGVMb2NhbGVzKTtcbiAgY29uc29sZS5sb2coYHNwZWxsY2hlY2s6IHVzZXIgbG9jYWxlOiAke3VzZXJMb2NhbGV9YCk7XG4gIGNvbnNvbGUubG9nKFxuICAgICdzcGVsbGNoZWNrOiBhdmFpbGFibGUgc3BlbGxjaGVja2VyIGxhbmd1YWdlczogJyxcbiAgICBhdmFpbGFibGVMb2NhbGVzXG4gICk7XG4gIGNvbnNvbGUubG9nKCdzcGVsbGNoZWNrOiBzZXR0aW5nIGxhbmd1YWdlcyB0bzogJywgbGFuZ3VhZ2VzKTtcbiAgc2Vzc2lvbi5zZXRTcGVsbENoZWNrZXJMYW5ndWFnZXMobGFuZ3VhZ2VzKTtcblxuICBicm93c2VyV2luZG93LndlYkNvbnRlbnRzLm9uKCdjb250ZXh0LW1lbnUnLCAoX2V2ZW50LCBwYXJhbXMpID0+IHtcbiAgICBjb25zdCB7IGVkaXRGbGFncyB9ID0gcGFyYW1zO1xuICAgIGNvbnN0IGlzTWlzc3BlbGxlZCA9IEJvb2xlYW4ocGFyYW1zLm1pc3NwZWxsZWRXb3JkKTtcbiAgICBjb25zdCBpc0xpbmsgPSBCb29sZWFuKHBhcmFtcy5saW5rVVJMKTtcbiAgICBjb25zdCBpc0ltYWdlID1cbiAgICAgIHBhcmFtcy5tZWRpYVR5cGUgPT09ICdpbWFnZScgJiYgcGFyYW1zLmhhc0ltYWdlQ29udGVudHMgJiYgcGFyYW1zLnNyY1VSTDtcbiAgICBjb25zdCBzaG93TWVudSA9XG4gICAgICBwYXJhbXMuaXNFZGl0YWJsZSB8fCBlZGl0RmxhZ3MuY2FuQ29weSB8fCBpc0xpbmsgfHwgaXNJbWFnZTtcblxuICAgIC8vIFBvcHVwIGVkaXRvciBtZW51XG4gICAgaWYgKHNob3dNZW51KSB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZTogTWVudUxpc3RUeXBlID0gW107XG5cbiAgICAgIGlmIChpc01pc3NwZWxsZWQpIHtcbiAgICAgICAgaWYgKHBhcmFtcy5kaWN0aW9uYXJ5U3VnZ2VzdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRlbXBsYXRlLnB1c2goXG4gICAgICAgICAgICAuLi5wYXJhbXMuZGljdGlvbmFyeVN1Z2dlc3Rpb25zLm1hcChsYWJlbCA9PiAoe1xuICAgICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBicm93c2VyV2luZG93LndlYkNvbnRlbnRzLnJlcGxhY2VNaXNzcGVsbGluZyhsYWJlbCk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRlbXBsYXRlLnB1c2goe1xuICAgICAgICAgICAgbGFiZWw6IG1lc3NhZ2VzLmNvbnRleHRNZW51Tm9TdWdnZXN0aW9ucy5tZXNzYWdlLFxuICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGVtcGxhdGUucHVzaCh7IHR5cGU6ICdzZXBhcmF0b3InIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLmlzRWRpdGFibGUpIHtcbiAgICAgICAgaWYgKGVkaXRGbGFncy5jYW5VbmRvKSB7XG4gICAgICAgICAgdGVtcGxhdGUucHVzaCh7IGxhYmVsOiBtZXNzYWdlcy5lZGl0TWVudVVuZG8ubWVzc2FnZSwgcm9sZTogJ3VuZG8nIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoaXMgaXMgb25seSBldmVyIGB0cnVlYCBpZiB1bmRvIHdhcyB0cmlnZ2VyZWQgdmlhIHRoZSBjb250ZXh0IG1lbnVcbiAgICAgICAgLy8gKG5vdCBjdHJsL2NtZCt6KVxuICAgICAgICBpZiAoZWRpdEZsYWdzLmNhblJlZG8pIHtcbiAgICAgICAgICB0ZW1wbGF0ZS5wdXNoKHsgbGFiZWw6IG1lc3NhZ2VzLmVkaXRNZW51UmVkby5tZXNzYWdlLCByb2xlOiAncmVkbycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVkaXRGbGFncy5jYW5VbmRvIHx8IGVkaXRGbGFncy5jYW5SZWRvKSB7XG4gICAgICAgICAgdGVtcGxhdGUucHVzaCh7IHR5cGU6ICdzZXBhcmF0b3InIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlZGl0RmxhZ3MuY2FuQ3V0KSB7XG4gICAgICAgICAgdGVtcGxhdGUucHVzaCh7IGxhYmVsOiBtZXNzYWdlcy5lZGl0TWVudUN1dC5tZXNzYWdlLCByb2xlOiAnY3V0JyB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZWRpdEZsYWdzLmNhbkNvcHkgfHwgaXNMaW5rIHx8IGlzSW1hZ2UpIHtcbiAgICAgICAgbGV0IGNsaWNrO1xuICAgICAgICBsZXQgbGFiZWw7XG5cbiAgICAgICAgaWYgKGlzTGluaykge1xuICAgICAgICAgIGNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgY2xpcGJvYXJkLndyaXRlVGV4dChwYXJhbXMubGlua1VSTCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBsYWJlbCA9IG1lc3NhZ2VzLmNvbnRleHRNZW51Q29weUxpbmsubWVzc2FnZTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0ltYWdlKSB7XG4gICAgICAgICAgY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWRTcmNVcmwgPSBtYXliZVBhcnNlVXJsKHBhcmFtcy5zcmNVUkwpO1xuICAgICAgICAgICAgaWYgKCFwYXJzZWRTcmNVcmwgfHwgcGFyc2VkU3JjVXJsLnByb3RvY29sICE9PSAnZmlsZTonKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBuYXRpdmVJbWFnZS5jcmVhdGVGcm9tUGF0aChcbiAgICAgICAgICAgICAgZmlsZVVSTFRvUGF0aChwYXJhbXMuc3JjVVJMKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNsaXBib2FyZC53cml0ZUltYWdlKGltYWdlKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGxhYmVsID0gbWVzc2FnZXMuY29udGV4dE1lbnVDb3B5SW1hZ2UubWVzc2FnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsYWJlbCA9IG1lc3NhZ2VzLmVkaXRNZW51Q29weS5tZXNzYWdlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGVtcGxhdGUucHVzaCh7XG4gICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgcm9sZTogaXNMaW5rIHx8IGlzSW1hZ2UgPyB1bmRlZmluZWQgOiAnY29weScsXG4gICAgICAgICAgY2xpY2ssXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWRpdEZsYWdzLmNhblBhc3RlICYmICFpc0ltYWdlKSB7XG4gICAgICAgIHRlbXBsYXRlLnB1c2goeyBsYWJlbDogbWVzc2FnZXMuZWRpdE1lbnVQYXN0ZS5tZXNzYWdlLCByb2xlOiAncGFzdGUnIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWRpdEZsYWdzLmNhblBhc3RlICYmICFpc0ltYWdlKSB7XG4gICAgICAgIHRlbXBsYXRlLnB1c2goe1xuICAgICAgICAgIGxhYmVsOiBtZXNzYWdlcy5lZGl0TWVudVBhc3RlQW5kTWF0Y2hTdHlsZS5tZXNzYWdlLFxuICAgICAgICAgIHJvbGU6ICdwYXN0ZUFuZE1hdGNoU3R5bGUnLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gT25seSBlbmFibGUgc2VsZWN0IGFsbCBpbiBlZGl0b3JzIGJlY2F1c2Ugc2VsZWN0IGFsbCBpbiBub24tZWRpdG9yc1xuICAgICAgLy8gcmVzdWx0cyBpbiBhbGwgdGhlIFVJIGJlaW5nIHNlbGVjdGVkXG4gICAgICBpZiAoZWRpdEZsYWdzLmNhblNlbGVjdEFsbCAmJiBwYXJhbXMuaXNFZGl0YWJsZSkge1xuICAgICAgICB0ZW1wbGF0ZS5wdXNoKHtcbiAgICAgICAgICBsYWJlbDogbWVzc2FnZXMuZWRpdE1lbnVTZWxlY3RBbGwubWVzc2FnZSxcbiAgICAgICAgICByb2xlOiAnc2VsZWN0QWxsJyxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1lbnUgPSBNZW51LmJ1aWxkRnJvbVRlbXBsYXRlKHRlbXBsYXRlKTtcbiAgICAgIG1lbnUucG9wdXAoe1xuICAgICAgICB3aW5kb3c6IGJyb3dzZXJXaW5kb3csXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLHNCQUE2QztBQUM3QyxvQkFBcUI7QUFDckIsaUJBQThCO0FBRTlCLGtCQUE4QjtBQUt2QixzQkFDTCxZQUNBLGtCQUNlO0FBQ2YsUUFBTSxhQUFhLFdBQVcsTUFBTSxHQUFHLEVBQUU7QUFFekMsUUFBTSxtQkFBbUIsd0JBQUssQ0FBQyxZQUFZLFVBQVUsQ0FBQyxFQUFFLE9BQU8sT0FDN0QsaUJBQWlCLFNBQVMsQ0FBQyxDQUM3QjtBQUVBLE1BQUksaUJBQWlCLFNBQVMsR0FBRztBQUMvQixXQUFPO0FBQUEsRUFDVDtBQUlBLFNBQU8sd0JBQUssaUJBQWlCLE9BQU8s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
