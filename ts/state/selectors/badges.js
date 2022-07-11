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
var badges_exports = {};
__export(badges_exports, {
  getBadgesById: () => getBadgesById,
  getBadgesSelector: () => getBadgesSelector,
  getPreferredBadgeSelector: () => getPreferredBadgeSelector
});
module.exports = __toCommonJS(badges_exports);
var import_reselect = require("reselect");
var import_lodash = require("lodash");
var log = __toESM(require("../../logging/log"));
var import_getOwn = require("../../util/getOwn");
const getBadgeState = /* @__PURE__ */ __name((state) => state.badges, "getBadgeState");
const getBadgesById = (0, import_reselect.createSelector)(getBadgeState, (state) => (0, import_lodash.mapValues)(state.byId, (badge) => ({
  ...badge,
  images: badge.images.map((image) => (0, import_lodash.mapValues)(image, (imageFile) => imageFile.localPath ? {
    ...imageFile,
    localPath: window.Signal.Migrations.getAbsoluteBadgeImageFilePath(imageFile.localPath)
  } : imageFile))
})));
const getBadgesSelector = (0, import_reselect.createSelector)(getBadgesById, (badgesById) => (conversationBadges) => {
  const result = [];
  for (const { id } of conversationBadges) {
    const badge = (0, import_getOwn.getOwn)(badgesById, id);
    if (!badge) {
      log.error("getBadgesSelector: conversation badge was not found");
      continue;
    }
    result.push(badge);
  }
  return result;
});
const getPreferredBadgeSelector = (0, import_reselect.createSelector)(getBadgesById, (badgesById) => (conversationBadges) => {
  const firstId = conversationBadges[0]?.id;
  if (!firstId) {
    return void 0;
  }
  const badge = (0, import_getOwn.getOwn)(badgesById, firstId);
  if (!badge) {
    log.error("getPreferredBadgeSelector: conversation badge was not found");
    return void 0;
  }
  return badge;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getBadgesById,
  getBadgesSelector,
  getPreferredBadgeSelector
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYmFkZ2VzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHsgbWFwVmFsdWVzIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi8uLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHR5cGUgeyBCYWRnZXNTdGF0ZVR5cGUgfSBmcm9tICcuLi9kdWNrcy9iYWRnZXMnO1xuaW1wb3J0IHR5cGUgeyBCYWRnZVR5cGUgfSBmcm9tICcuLi8uLi9iYWRnZXMvdHlwZXMnO1xuaW1wb3J0IHsgZ2V0T3duIH0gZnJvbSAnLi4vLi4vdXRpbC9nZXRPd24nO1xuXG5jb25zdCBnZXRCYWRnZVN0YXRlID0gKHN0YXRlOiBSZWFkb25seTxTdGF0ZVR5cGU+KTogQmFkZ2VzU3RhdGVUeXBlID0+XG4gIHN0YXRlLmJhZGdlcztcblxuZXhwb3J0IGNvbnN0IGdldEJhZGdlc0J5SWQgPSBjcmVhdGVTZWxlY3RvcihnZXRCYWRnZVN0YXRlLCBzdGF0ZSA9PlxuICBtYXBWYWx1ZXMoc3RhdGUuYnlJZCwgYmFkZ2UgPT4gKHtcbiAgICAuLi5iYWRnZSxcbiAgICBpbWFnZXM6IGJhZGdlLmltYWdlcy5tYXAoaW1hZ2UgPT5cbiAgICAgIG1hcFZhbHVlcyhpbWFnZSwgaW1hZ2VGaWxlID0+XG4gICAgICAgIGltYWdlRmlsZS5sb2NhbFBhdGhcbiAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgLi4uaW1hZ2VGaWxlLFxuICAgICAgICAgICAgICBsb2NhbFBhdGg6IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5nZXRBYnNvbHV0ZUJhZGdlSW1hZ2VGaWxlUGF0aChcbiAgICAgICAgICAgICAgICBpbWFnZUZpbGUubG9jYWxQYXRoXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICB9XG4gICAgICAgICAgOiBpbWFnZUZpbGVcbiAgICAgIClcbiAgICApLFxuICB9KSlcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRCYWRnZXNTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRCYWRnZXNCeUlkLFxuICBiYWRnZXNCeUlkID0+XG4gICAgKFxuICAgICAgY29udmVyc2F0aW9uQmFkZ2VzOiBSZWFkb25seUFycmF5PFBpY2s8QmFkZ2VUeXBlLCAnaWQnPj5cbiAgICApOiBBcnJheTxCYWRnZVR5cGU+ID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdDogQXJyYXk8QmFkZ2VUeXBlPiA9IFtdO1xuXG4gICAgICBmb3IgKGNvbnN0IHsgaWQgfSBvZiBjb252ZXJzYXRpb25CYWRnZXMpIHtcbiAgICAgICAgY29uc3QgYmFkZ2UgPSBnZXRPd24oYmFkZ2VzQnlJZCwgaWQpO1xuICAgICAgICBpZiAoIWJhZGdlKSB7XG4gICAgICAgICAgbG9nLmVycm9yKCdnZXRCYWRnZXNTZWxlY3RvcjogY29udmVyc2F0aW9uIGJhZGdlIHdhcyBub3QgZm91bmQnKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaChiYWRnZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuKTtcblxuZXhwb3J0IHR5cGUgUHJlZmVycmVkQmFkZ2VTZWxlY3RvclR5cGUgPSAoXG4gIGNvbnZlcnNhdGlvbkJhZGdlczogUmVhZG9ubHlBcnJheTxQaWNrPEJhZGdlVHlwZSwgJ2lkJz4+XG4pID0+IHVuZGVmaW5lZCB8IEJhZGdlVHlwZTtcblxuZXhwb3J0IGNvbnN0IGdldFByZWZlcnJlZEJhZGdlU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0QmFkZ2VzQnlJZCxcbiAgKGJhZGdlc0J5SWQpOiBQcmVmZXJyZWRCYWRnZVNlbGVjdG9yVHlwZSA9PlxuICAgIGNvbnZlcnNhdGlvbkJhZGdlcyA9PiB7XG4gICAgICBjb25zdCBmaXJzdElkOiB1bmRlZmluZWQgfCBzdHJpbmcgPSBjb252ZXJzYXRpb25CYWRnZXNbMF0/LmlkO1xuICAgICAgaWYgKCFmaXJzdElkKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJhZGdlID0gZ2V0T3duKGJhZGdlc0J5SWQsIGZpcnN0SWQpO1xuICAgICAgaWYgKCFiYWRnZSkge1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgJ2dldFByZWZlcnJlZEJhZGdlU2VsZWN0b3I6IGNvbnZlcnNhdGlvbiBiYWRnZSB3YXMgbm90IGZvdW5kJ1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYmFkZ2U7XG4gICAgfVxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esc0JBQStCO0FBQy9CLG9CQUEwQjtBQUMxQixVQUFxQjtBQUlyQixvQkFBdUI7QUFFdkIsTUFBTSxnQkFBZ0Isd0JBQUMsVUFDckIsTUFBTSxRQURjO0FBR2YsTUFBTSxnQkFBZ0Isb0NBQWUsZUFBZSxXQUN6RCw2QkFBVSxNQUFNLE1BQU0sV0FBVTtBQUFBLEtBQzNCO0FBQUEsRUFDSCxRQUFRLE1BQU0sT0FBTyxJQUFJLFdBQ3ZCLDZCQUFVLE9BQU8sZUFDZixVQUFVLFlBQ047QUFBQSxPQUNLO0FBQUEsSUFDSCxXQUFXLE9BQU8sT0FBTyxXQUFXLDhCQUNsQyxVQUFVLFNBQ1o7QUFBQSxFQUNGLElBQ0EsU0FDTixDQUNGO0FBQ0YsRUFBRSxDQUNKO0FBRU8sTUFBTSxvQkFBb0Isb0NBQy9CLGVBQ0EsZ0JBQ0UsQ0FDRSx1QkFDcUI7QUFDckIsUUFBTSxTQUEyQixDQUFDO0FBRWxDLGFBQVcsRUFBRSxRQUFRLG9CQUFvQjtBQUN2QyxVQUFNLFFBQVEsMEJBQU8sWUFBWSxFQUFFO0FBQ25DLFFBQUksQ0FBQyxPQUFPO0FBQ1YsVUFBSSxNQUFNLHFEQUFxRDtBQUMvRDtBQUFBLElBQ0Y7QUFDQSxXQUFPLEtBQUssS0FBSztBQUFBLEVBQ25CO0FBRUEsU0FBTztBQUNULENBQ0o7QUFNTyxNQUFNLDRCQUE0QixvQ0FDdkMsZUFDQSxDQUFDLGVBQ0Msd0JBQXNCO0FBQ3BCLFFBQU0sVUFBOEIsbUJBQW1CLElBQUk7QUFDM0QsTUFBSSxDQUFDLFNBQVM7QUFDWixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sUUFBUSwwQkFBTyxZQUFZLE9BQU87QUFDeEMsTUFBSSxDQUFDLE9BQU87QUFDVixRQUFJLE1BQ0YsNkRBQ0Y7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU87QUFDVCxDQUNKOyIsCiAgIm5hbWVzIjogW10KfQo=
