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
var getFakeBadge_exports = {};
__export(getFakeBadge_exports, {
  getFakeBadge: () => getFakeBadge,
  getFakeBadges: () => getFakeBadges
});
module.exports = __toCommonJS(getFakeBadge_exports);
var import_lodash = require("lodash");
var import_BadgeCategory = require("../../badges/BadgeCategory");
var import_BadgeImageTheme = require("../../badges/BadgeImageTheme");
var import_iterables = require("../../util/iterables");
function getFakeBadge({
  alternate = false,
  id = "test-badge"
} = {}) {
  const imageFile = {
    localPath: `/fixtures/${alternate ? "blue" : "orange"}-heart.svg`,
    url: "https://example.com/ignored.svg"
  };
  return {
    id,
    category: alternate ? import_BadgeCategory.BadgeCategory.Other : import_BadgeCategory.BadgeCategory.Donor,
    name: `Test Badge ${alternate ? "B" : "A"}`,
    descriptionTemplate: "{short_name} got this badge because they're cool. Signal is a nonprofit with no advertisers or investors, supported only by people like you.",
    images: [
      ...Array(3).fill((0, import_iterables.zipObject)(Object.values(import_BadgeImageTheme.BadgeImageTheme), (0, import_iterables.repeat)(imageFile))),
      { [import_BadgeImageTheme.BadgeImageTheme.Transparent]: imageFile }
    ]
  };
}
const getFakeBadges = /* @__PURE__ */ __name((count) => (0, import_lodash.times)(count, (index) => getFakeBadge({
  alternate: index % 2 !== 0,
  id: `test-badge-${index}`
})), "getFakeBadges");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFakeBadge,
  getFakeBadges
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0RmFrZUJhZGdlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IHRpbWVzIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB0eXBlIHsgQmFkZ2VUeXBlIH0gZnJvbSAnLi4vLi4vYmFkZ2VzL3R5cGVzJztcbmltcG9ydCB7IEJhZGdlQ2F0ZWdvcnkgfSBmcm9tICcuLi8uLi9iYWRnZXMvQmFkZ2VDYXRlZ29yeSc7XG5pbXBvcnQgeyBCYWRnZUltYWdlVGhlbWUgfSBmcm9tICcuLi8uLi9iYWRnZXMvQmFkZ2VJbWFnZVRoZW1lJztcbmltcG9ydCB7IHJlcGVhdCwgemlwT2JqZWN0IH0gZnJvbSAnLi4vLi4vdXRpbC9pdGVyYWJsZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmFrZUJhZGdlKHtcbiAgYWx0ZXJuYXRlID0gZmFsc2UsXG4gIGlkID0gJ3Rlc3QtYmFkZ2UnLFxufTogUmVhZG9ubHk8e1xuICBhbHRlcm5hdGU/OiBib29sZWFuO1xuICBpZD86IHN0cmluZztcbn0+ID0ge30pOiBCYWRnZVR5cGUge1xuICBjb25zdCBpbWFnZUZpbGUgPSB7XG4gICAgbG9jYWxQYXRoOiBgL2ZpeHR1cmVzLyR7YWx0ZXJuYXRlID8gJ2JsdWUnIDogJ29yYW5nZSd9LWhlYXJ0LnN2Z2AsXG4gICAgdXJsOiAnaHR0cHM6Ly9leGFtcGxlLmNvbS9pZ25vcmVkLnN2ZycsXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpZCxcbiAgICBjYXRlZ29yeTogYWx0ZXJuYXRlID8gQmFkZ2VDYXRlZ29yeS5PdGhlciA6IEJhZGdlQ2F0ZWdvcnkuRG9ub3IsXG4gICAgbmFtZTogYFRlc3QgQmFkZ2UgJHthbHRlcm5hdGUgPyAnQicgOiAnQSd9YCxcbiAgICBkZXNjcmlwdGlvblRlbXBsYXRlOlxuICAgICAgXCJ7c2hvcnRfbmFtZX0gZ290IHRoaXMgYmFkZ2UgYmVjYXVzZSB0aGV5J3JlIGNvb2wuIFNpZ25hbCBpcyBhIG5vbnByb2ZpdCB3aXRoIG5vIGFkdmVydGlzZXJzIG9yIGludmVzdG9ycywgc3VwcG9ydGVkIG9ubHkgYnkgcGVvcGxlIGxpa2UgeW91LlwiLFxuICAgIGltYWdlczogW1xuICAgICAgLi4uQXJyYXkoMykuZmlsbChcbiAgICAgICAgemlwT2JqZWN0KE9iamVjdC52YWx1ZXMoQmFkZ2VJbWFnZVRoZW1lKSwgcmVwZWF0KGltYWdlRmlsZSkpXG4gICAgICApLFxuICAgICAgeyBbQmFkZ2VJbWFnZVRoZW1lLlRyYW5zcGFyZW50XTogaW1hZ2VGaWxlIH0sXG4gICAgXSxcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldEZha2VCYWRnZXMgPSAoY291bnQ6IG51bWJlcik6IEFycmF5PEJhZGdlVHlwZT4gPT5cbiAgdGltZXMoY291bnQsIGluZGV4ID0+XG4gICAgZ2V0RmFrZUJhZGdlKHtcbiAgICAgIGFsdGVybmF0ZTogaW5kZXggJSAyICE9PSAwLFxuICAgICAgaWQ6IGB0ZXN0LWJhZGdlLSR7aW5kZXh9YCxcbiAgICB9KVxuICApO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXNCO0FBRXRCLDJCQUE4QjtBQUM5Qiw2QkFBZ0M7QUFDaEMsdUJBQWtDO0FBRTNCLHNCQUFzQjtBQUFBLEVBQzNCLFlBQVk7QUFBQSxFQUNaLEtBQUs7QUFBQSxJQUlGLENBQUMsR0FBYztBQUNsQixRQUFNLFlBQVk7QUFBQSxJQUNoQixXQUFXLGFBQWEsWUFBWSxTQUFTO0FBQUEsSUFDN0MsS0FBSztBQUFBLEVBQ1A7QUFFQSxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsVUFBVSxZQUFZLG1DQUFjLFFBQVEsbUNBQWM7QUFBQSxJQUMxRCxNQUFNLGNBQWMsWUFBWSxNQUFNO0FBQUEsSUFDdEMscUJBQ0U7QUFBQSxJQUNGLFFBQVE7QUFBQSxNQUNOLEdBQUcsTUFBTSxDQUFDLEVBQUUsS0FDVixnQ0FBVSxPQUFPLE9BQU8sc0NBQWUsR0FBRyw2QkFBTyxTQUFTLENBQUMsQ0FDN0Q7QUFBQSxNQUNBLEdBQUcsdUNBQWdCLGNBQWMsVUFBVTtBQUFBLElBQzdDO0FBQUEsRUFDRjtBQUNGO0FBekJnQixBQTJCVCxNQUFNLGdCQUFnQix3QkFBQyxVQUM1Qix5QkFBTSxPQUFPLFdBQ1gsYUFBYTtBQUFBLEVBQ1gsV0FBVyxRQUFRLE1BQU07QUFBQSxFQUN6QixJQUFJLGNBQWM7QUFDcEIsQ0FBQyxDQUNILEdBTjJCOyIsCiAgIm5hbWVzIjogW10KfQo=
