var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var StickerManager_exports = {};
__export(StickerManager_exports, {
  StickerManager: () => StickerManager
});
module.exports = __toCommonJS(StickerManager_exports);
var React = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_StickerManagerPackRow = require("./StickerManagerPackRow");
var import_StickerPreviewModal = require("./StickerPreviewModal");
const StickerManager = React.memo(({
  installedPacks,
  receivedPacks,
  knownPacks,
  blessedPacks,
  downloadStickerPack,
  installStickerPack,
  uninstallStickerPack,
  i18n
}) => {
  const focusRef = React.createRef();
  const [packToPreview, setPackToPreview] = React.useState(null);
  React.useEffect(() => {
    if (!knownPacks) {
      return;
    }
    knownPacks.forEach((pack) => {
      downloadStickerPack(pack.id, pack.key);
    });
    setTimeout(() => {
      if (focusRef.current) {
        focusRef.current.focus();
      }
    });
  }, []);
  const clearPackToPreview = React.useCallback(() => {
    setPackToPreview(null);
  }, [setPackToPreview]);
  const previewPack = React.useCallback((pack) => {
    setPackToPreview(pack);
  }, []);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, packToPreview ? /* @__PURE__ */ React.createElement(import_StickerPreviewModal.StickerPreviewModal, {
    i18n,
    pack: packToPreview,
    onClose: clearPackToPreview,
    downloadStickerPack,
    installStickerPack,
    uninstallStickerPack
  }) : null, /* @__PURE__ */ React.createElement("div", {
    className: "module-sticker-manager",
    tabIndex: -1,
    ref: focusRef
  }, [
    {
      i18nKey: "stickers--StickerManager--InstalledPacks",
      i18nEmptyKey: "stickers--StickerManager--InstalledPacks--Empty",
      packs: installedPacks,
      hideIfEmpty: false
    },
    {
      i18nKey: "stickers--StickerManager--BlessedPacks",
      i18nEmptyKey: "stickers--StickerManager--BlessedPacks--Empty",
      packs: blessedPacks,
      hideIfEmpty: true
    },
    {
      i18nKey: "stickers--StickerManager--ReceivedPacks",
      i18nEmptyKey: "stickers--StickerManager--ReceivedPacks--Empty",
      packs: receivedPacks,
      hideIfEmpty: false
    }
  ].map((section) => {
    if (section.hideIfEmpty && section.packs.length === 0) {
      return null;
    }
    return /* @__PURE__ */ React.createElement(React.Fragment, {
      key: section.i18nKey
    }, /* @__PURE__ */ React.createElement("h2", {
      className: (0, import_classnames.default)("module-sticker-manager__text", "module-sticker-manager__text--heading")
    }, i18n(section.i18nKey)), section.packs.length > 0 ? section.packs.map((pack) => /* @__PURE__ */ React.createElement(import_StickerManagerPackRow.StickerManagerPackRow, {
      key: pack.id,
      pack,
      i18n,
      onClickPreview: previewPack,
      installStickerPack,
      uninstallStickerPack
    })) : /* @__PURE__ */ React.createElement("div", {
      className: "module-sticker-manager__empty"
    }, i18n(section.i18nEmptyKey)));
  })));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StickerManager
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlck1hbmFnZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBTdGlja2VyTWFuYWdlclBhY2tSb3cgfSBmcm9tICcuL1N0aWNrZXJNYW5hZ2VyUGFja1Jvdyc7XG5pbXBvcnQgeyBTdGlja2VyUHJldmlld01vZGFsIH0gZnJvbSAnLi9TdGlja2VyUHJldmlld01vZGFsJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBTdGlja2VyUGFja1R5cGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9kdWNrcy9zdGlja2Vycyc7XG5cbmV4cG9ydCB0eXBlIE93blByb3BzID0ge1xuICByZWFkb25seSBpbnN0YWxsZWRQYWNrczogUmVhZG9ubHlBcnJheTxTdGlja2VyUGFja1R5cGU+O1xuICByZWFkb25seSByZWNlaXZlZFBhY2tzOiBSZWFkb25seUFycmF5PFN0aWNrZXJQYWNrVHlwZT47XG4gIHJlYWRvbmx5IGJsZXNzZWRQYWNrczogUmVhZG9ubHlBcnJheTxTdGlja2VyUGFja1R5cGU+O1xuICByZWFkb25seSBrbm93blBhY2tzPzogUmVhZG9ubHlBcnJheTxTdGlja2VyUGFja1R5cGU+O1xuICByZWFkb25seSBkb3dubG9hZFN0aWNrZXJQYWNrOiAocGFja0lkOiBzdHJpbmcsIHBhY2tLZXk6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgcmVhZG9ubHkgaW5zdGFsbFN0aWNrZXJQYWNrOiAocGFja0lkOiBzdHJpbmcsIHBhY2tLZXk6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgcmVhZG9ubHkgdW5pbnN0YWxsU3RpY2tlclBhY2s6IChwYWNrSWQ6IHN0cmluZywgcGFja0tleTogc3RyaW5nKSA9PiB1bmtub3duO1xuICByZWFkb25seSBpMThuOiBMb2NhbGl6ZXJUeXBlO1xufTtcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSBPd25Qcm9wcztcblxuZXhwb3J0IGNvbnN0IFN0aWNrZXJNYW5hZ2VyID0gUmVhY3QubWVtbyhcbiAgKHtcbiAgICBpbnN0YWxsZWRQYWNrcyxcbiAgICByZWNlaXZlZFBhY2tzLFxuICAgIGtub3duUGFja3MsXG4gICAgYmxlc3NlZFBhY2tzLFxuICAgIGRvd25sb2FkU3RpY2tlclBhY2ssXG4gICAgaW5zdGFsbFN0aWNrZXJQYWNrLFxuICAgIHVuaW5zdGFsbFN0aWNrZXJQYWNrLFxuICAgIGkxOG4sXG4gIH06IFByb3BzKSA9PiB7XG4gICAgY29uc3QgZm9jdXNSZWYgPSBSZWFjdC5jcmVhdGVSZWY8SFRNTERpdkVsZW1lbnQ+KCk7XG4gICAgY29uc3QgW3BhY2tUb1ByZXZpZXcsIHNldFBhY2tUb1ByZXZpZXddID1cbiAgICAgIFJlYWN0LnVzZVN0YXRlPFN0aWNrZXJQYWNrVHlwZSB8IG51bGw+KG51bGwpO1xuXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGlmICgha25vd25QYWNrcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBrbm93blBhY2tzLmZvckVhY2gocGFjayA9PiB7XG4gICAgICAgIGRvd25sb2FkU3RpY2tlclBhY2socGFjay5pZCwgcGFjay5rZXkpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFdoZW4gdGhpcyBjb21wb25lbnQgaXMgY3JlYXRlZCwgaXQncyBpbml0aWFsbHkgbm90IHBhcnQgb2YgdGhlIERPTSwgYW5kIHRoZW4gaXQnc1xuICAgICAgLy8gICBhZGRlZCBvZmYtc2NyZWVuIGFuZCBhbmltYXRlZCBpbi4gVGhpcyBlbnN1cmVzIHRoYXQgdGhlIGZvY3VzIHRha2VzLlxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChmb2N1c1JlZi5jdXJyZW50KSB7XG4gICAgICAgICAgZm9jdXNSZWYuY3VycmVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIFdlIG9ubHkgd2FudCB0byBhdHRlbXB0IGRvd25sb2FkcyBvbiBpbml0aWFsIGxvYWRcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBjbGVhclBhY2tUb1ByZXZpZXcgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICBzZXRQYWNrVG9QcmV2aWV3KG51bGwpO1xuICAgIH0sIFtzZXRQYWNrVG9QcmV2aWV3XSk7XG5cbiAgICBjb25zdCBwcmV2aWV3UGFjayA9IFJlYWN0LnVzZUNhbGxiYWNrKChwYWNrOiBTdGlja2VyUGFja1R5cGUpID0+IHtcbiAgICAgIHNldFBhY2tUb1ByZXZpZXcocGFjayk7XG4gICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIHtwYWNrVG9QcmV2aWV3ID8gKFxuICAgICAgICAgIDxTdGlja2VyUHJldmlld01vZGFsXG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgcGFjaz17cGFja1RvUHJldmlld31cbiAgICAgICAgICAgIG9uQ2xvc2U9e2NsZWFyUGFja1RvUHJldmlld31cbiAgICAgICAgICAgIGRvd25sb2FkU3RpY2tlclBhY2s9e2Rvd25sb2FkU3RpY2tlclBhY2t9XG4gICAgICAgICAgICBpbnN0YWxsU3RpY2tlclBhY2s9e2luc3RhbGxTdGlja2VyUGFja31cbiAgICAgICAgICAgIHVuaW5zdGFsbFN0aWNrZXJQYWNrPXt1bmluc3RhbGxTdGlja2VyUGFja31cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtc3RpY2tlci1tYW5hZ2VyXCIgdGFiSW5kZXg9ey0xfSByZWY9e2ZvY3VzUmVmfT5cbiAgICAgICAgICB7W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpMThuS2V5OiAnc3RpY2tlcnMtLVN0aWNrZXJNYW5hZ2VyLS1JbnN0YWxsZWRQYWNrcycsXG4gICAgICAgICAgICAgIGkxOG5FbXB0eUtleTogJ3N0aWNrZXJzLS1TdGlja2VyTWFuYWdlci0tSW5zdGFsbGVkUGFja3MtLUVtcHR5JyxcbiAgICAgICAgICAgICAgcGFja3M6IGluc3RhbGxlZFBhY2tzLFxuICAgICAgICAgICAgICBoaWRlSWZFbXB0eTogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpMThuS2V5OiAnc3RpY2tlcnMtLVN0aWNrZXJNYW5hZ2VyLS1CbGVzc2VkUGFja3MnLFxuICAgICAgICAgICAgICBpMThuRW1wdHlLZXk6ICdzdGlja2Vycy0tU3RpY2tlck1hbmFnZXItLUJsZXNzZWRQYWNrcy0tRW1wdHknLFxuICAgICAgICAgICAgICBwYWNrczogYmxlc3NlZFBhY2tzLFxuICAgICAgICAgICAgICBoaWRlSWZFbXB0eTogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGkxOG5LZXk6ICdzdGlja2Vycy0tU3RpY2tlck1hbmFnZXItLVJlY2VpdmVkUGFja3MnLFxuICAgICAgICAgICAgICBpMThuRW1wdHlLZXk6ICdzdGlja2Vycy0tU3RpY2tlck1hbmFnZXItLVJlY2VpdmVkUGFja3MtLUVtcHR5JyxcbiAgICAgICAgICAgICAgcGFja3M6IHJlY2VpdmVkUGFja3MsXG4gICAgICAgICAgICAgIGhpZGVJZkVtcHR5OiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXS5tYXAoc2VjdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5oaWRlSWZFbXB0eSAmJiBzZWN0aW9uLnBhY2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17c2VjdGlvbi5pMThuS2V5fT5cbiAgICAgICAgICAgICAgICA8aDJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgJ21vZHVsZS1zdGlja2VyLW1hbmFnZXJfX3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAnbW9kdWxlLXN0aWNrZXItbWFuYWdlcl9fdGV4dC0taGVhZGluZydcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2kxOG4oc2VjdGlvbi5pMThuS2V5KX1cbiAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgIHtzZWN0aW9uLnBhY2tzLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgICBzZWN0aW9uLnBhY2tzLm1hcChwYWNrID0+IChcbiAgICAgICAgICAgICAgICAgICAgPFN0aWNrZXJNYW5hZ2VyUGFja1Jvd1xuICAgICAgICAgICAgICAgICAgICAgIGtleT17cGFjay5pZH1cbiAgICAgICAgICAgICAgICAgICAgICBwYWNrPXtwYWNrfVxuICAgICAgICAgICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGlja1ByZXZpZXc9e3ByZXZpZXdQYWNrfVxuICAgICAgICAgICAgICAgICAgICAgIGluc3RhbGxTdGlja2VyUGFjaz17aW5zdGFsbFN0aWNrZXJQYWNrfVxuICAgICAgICAgICAgICAgICAgICAgIHVuaW5zdGFsbFN0aWNrZXJQYWNrPXt1bmluc3RhbGxTdGlja2VyUGFja31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICkpXG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLXN0aWNrZXItbWFuYWdlcl9fZW1wdHlcIj5cbiAgICAgICAgICAgICAgICAgICAge2kxOG4oc2VjdGlvbi5pMThuRW1wdHlLZXkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC8+XG4gICAgKTtcbiAgfVxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHdCQUF1QjtBQUN2QixtQ0FBc0M7QUFDdEMsaUNBQW9DO0FBaUI3QixNQUFNLGlCQUFpQixNQUFNLEtBQ2xDLENBQUM7QUFBQSxFQUNDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQ1c7QUFDWCxRQUFNLFdBQVcsTUFBTSxVQUEwQjtBQUNqRCxRQUFNLENBQUMsZUFBZSxvQkFDcEIsTUFBTSxTQUFpQyxJQUFJO0FBRTdDLFFBQU0sVUFBVSxNQUFNO0FBQ3BCLFFBQUksQ0FBQyxZQUFZO0FBQ2Y7QUFBQSxJQUNGO0FBQ0EsZUFBVyxRQUFRLFVBQVE7QUFDekIsMEJBQW9CLEtBQUssSUFBSSxLQUFLLEdBQUc7QUFBQSxJQUN2QyxDQUFDO0FBSUQsZUFBVyxNQUFNO0FBQ2YsVUFBSSxTQUFTLFNBQVM7QUFDcEIsaUJBQVMsUUFBUSxNQUFNO0FBQUEsTUFDekI7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUdILEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxxQkFBcUIsTUFBTSxZQUFZLE1BQU07QUFDakQscUJBQWlCLElBQUk7QUFBQSxFQUN2QixHQUFHLENBQUMsZ0JBQWdCLENBQUM7QUFFckIsUUFBTSxjQUFjLE1BQU0sWUFBWSxDQUFDLFNBQTBCO0FBQy9ELHFCQUFpQixJQUFJO0FBQUEsRUFDdkIsR0FBRyxDQUFDLENBQUM7QUFFTCxTQUNFLDBEQUNHLGdCQUNDLG9DQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLElBQ1Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEdBQ0YsSUFDRSxNQUNKLG9DQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsSUFBeUIsVUFBVTtBQUFBLElBQUksS0FBSztBQUFBLEtBQ3hEO0FBQUEsSUFDQztBQUFBLE1BQ0UsU0FBUztBQUFBLE1BQ1QsY0FBYztBQUFBLE1BQ2QsT0FBTztBQUFBLE1BQ1AsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxTQUFTO0FBQUEsTUFDVCxjQUFjO0FBQUEsTUFDZCxPQUFPO0FBQUEsTUFDUCxhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNFLFNBQVM7QUFBQSxNQUNULGNBQWM7QUFBQSxNQUNkLE9BQU87QUFBQSxNQUNQLGFBQWE7QUFBQSxJQUNmO0FBQUEsRUFDRixFQUFFLElBQUksYUFBVztBQUNmLFFBQUksUUFBUSxlQUFlLFFBQVEsTUFBTSxXQUFXLEdBQUc7QUFDckQsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUNFLG9DQUFDLE1BQU0sVUFBTjtBQUFBLE1BQWUsS0FBSyxRQUFRO0FBQUEsT0FDM0Isb0NBQUM7QUFBQSxNQUNDLFdBQVcsK0JBQ1QsZ0NBQ0EsdUNBQ0Y7QUFBQSxPQUVDLEtBQUssUUFBUSxPQUFPLENBQ3ZCLEdBQ0MsUUFBUSxNQUFNLFNBQVMsSUFDdEIsUUFBUSxNQUFNLElBQUksVUFDaEIsb0NBQUM7QUFBQSxNQUNDLEtBQUssS0FBSztBQUFBLE1BQ1Y7QUFBQSxNQUNBO0FBQUEsTUFDQSxnQkFBZ0I7QUFBQSxNQUNoQjtBQUFBLE1BQ0E7QUFBQSxLQUNGLENBQ0QsSUFFRCxvQ0FBQztBQUFBLE1BQUksV0FBVTtBQUFBLE9BQ1osS0FBSyxRQUFRLFlBQVksQ0FDNUIsQ0FFSjtBQUFBLEVBRUosQ0FBQyxDQUNILENBQ0Y7QUFFSixDQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
