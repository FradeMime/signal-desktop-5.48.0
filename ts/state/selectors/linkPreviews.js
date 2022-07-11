var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var linkPreviews_exports = {};
__export(linkPreviews_exports, {
  getLinkPreview: () => getLinkPreview
});
module.exports = __toCommonJS(linkPreviews_exports);
var import_reselect = require("reselect");
var import_assert = require("../../util/assert");
var import_LinkPreview = require("../../types/LinkPreview");
const getLinkPreview = (0, import_reselect.createSelector)(({ linkPreviews }) => linkPreviews, ({ linkPreview, source }) => {
  return (fromSource) => {
    if (!linkPreview) {
      return;
    }
    if (source !== fromSource) {
      return;
    }
    const domain = (0, import_LinkPreview.getDomain)(linkPreview.url);
    (0, import_assert.assert)(domain !== void 0, "Domain of linkPreview can't be undefined");
    return {
      ...linkPreview,
      domain,
      isLoaded: true
    };
  };
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getLinkPreview
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGlua1ByZXZpZXdzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnO1xuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyBnZXREb21haW4gfSBmcm9tICcuLi8uLi90eXBlcy9MaW5rUHJldmlldyc7XG5cbmltcG9ydCB0eXBlIHsgTGlua1ByZXZpZXdTb3VyY2VUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvTGlua1ByZXZpZXcnO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgfSBmcm9tICcuLi9yZWR1Y2VyJztcblxuZXhwb3J0IGNvbnN0IGdldExpbmtQcmV2aWV3ID0gY3JlYXRlU2VsZWN0b3IoXG4gICh7IGxpbmtQcmV2aWV3cyB9OiBTdGF0ZVR5cGUpID0+IGxpbmtQcmV2aWV3cyxcbiAgKHsgbGlua1ByZXZpZXcsIHNvdXJjZSB9KSA9PiB7XG4gICAgcmV0dXJuIChmcm9tU291cmNlOiBMaW5rUHJldmlld1NvdXJjZVR5cGUpID0+IHtcbiAgICAgIGlmICghbGlua1ByZXZpZXcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoc291cmNlICE9PSBmcm9tU291cmNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZG9tYWluID0gZ2V0RG9tYWluKGxpbmtQcmV2aWV3LnVybCk7XG4gICAgICBhc3NlcnQoZG9tYWluICE9PSB1bmRlZmluZWQsIFwiRG9tYWluIG9mIGxpbmtQcmV2aWV3IGNhbid0IGJlIHVuZGVmaW5lZFwiKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ubGlua1ByZXZpZXcsXG4gICAgICAgIGRvbWFpbixcbiAgICAgICAgaXNMb2FkZWQ6IHRydWUsXG4gICAgICB9O1xuICAgIH07XG4gIH1cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxzQkFBK0I7QUFFL0Isb0JBQXVCO0FBQ3ZCLHlCQUEwQjtBQUtuQixNQUFNLGlCQUFpQixvQ0FDNUIsQ0FBQyxFQUFFLG1CQUE4QixjQUNqQyxDQUFDLEVBQUUsYUFBYSxhQUFhO0FBQzNCLFNBQU8sQ0FBQyxlQUFzQztBQUM1QyxRQUFJLENBQUMsYUFBYTtBQUNoQjtBQUFBLElBQ0Y7QUFFQSxRQUFJLFdBQVcsWUFBWTtBQUN6QjtBQUFBLElBQ0Y7QUFFQSxVQUFNLFNBQVMsa0NBQVUsWUFBWSxHQUFHO0FBQ3hDLDhCQUFPLFdBQVcsUUFBVywwQ0FBMEM7QUFFdkUsV0FBTztBQUFBLFNBQ0Y7QUFBQSxNQUNIO0FBQUEsTUFDQSxVQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFDRixDQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
