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
var Avatar_exports = {};
__export(Avatar_exports, {
  GroupAvatarIcons: () => GroupAvatarIcons,
  PersonalAvatarIcons: () => PersonalAvatarIcons,
  getDefaultAvatars: () => getDefaultAvatars
});
module.exports = __toCommonJS(Avatar_exports);
var import_assert = require("../util/assert");
const PersonalAvatarIcons = [
  "abstract_01",
  "abstract_02",
  "abstract_03",
  "cat",
  "dog",
  "fox",
  "tucan",
  "pig",
  "dinosour",
  "sloth",
  "incognito",
  "ghost"
];
const GroupAvatarIcons = [
  "balloon",
  "book",
  "briefcase",
  "celebration",
  "drink",
  "football",
  "heart",
  "house",
  "melon",
  "soccerball",
  "sunset",
  "surfboard"
];
const groupIconColors = [
  "A180",
  "A120",
  "A110",
  "A170",
  "A100",
  "A210",
  "A100",
  "A180",
  "A120",
  "A110",
  "A130",
  "A210"
];
const personalIconColors = [
  "A130",
  "A120",
  "A170",
  "A190",
  "A140",
  "A190",
  "A120",
  "A160",
  "A130",
  "A180",
  "A210",
  "A100"
];
(0, import_assert.strictAssert)(groupIconColors.length === GroupAvatarIcons.length && personalIconColors.length === PersonalAvatarIcons.length, "colors.length !== icons.length");
const groupDefaultAvatars = GroupAvatarIcons.map((icon, index) => ({
  id: index,
  color: groupIconColors[index],
  icon
}));
const personalDefaultAvatars = PersonalAvatarIcons.map((icon, index) => ({
  id: index,
  color: personalIconColors[index],
  icon
}));
function getDefaultAvatars(isGroup) {
  if (isGroup) {
    return groupDefaultAvatars;
  }
  return personalDefaultAvatars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupAvatarIcons,
  PersonalAvatarIcons,
  getDefaultAvatars
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgQXZhdGFyQ29sb3JUeXBlIH0gZnJvbSAnLi9Db2xvcnMnO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuXG5leHBvcnQgY29uc3QgUGVyc29uYWxBdmF0YXJJY29ucyA9IFtcbiAgJ2Fic3RyYWN0XzAxJyxcbiAgJ2Fic3RyYWN0XzAyJyxcbiAgJ2Fic3RyYWN0XzAzJyxcbiAgJ2NhdCcsXG4gICdkb2cnLFxuICAnZm94JyxcbiAgJ3R1Y2FuJyxcbiAgJ3BpZycsXG4gICdkaW5vc291cicsXG4gICdzbG90aCcsXG4gICdpbmNvZ25pdG8nLFxuICAnZ2hvc3QnLFxuXSBhcyBjb25zdDtcblxuZXhwb3J0IGNvbnN0IEdyb3VwQXZhdGFySWNvbnMgPSBbXG4gICdiYWxsb29uJyxcbiAgJ2Jvb2snLFxuICAnYnJpZWZjYXNlJyxcbiAgJ2NlbGVicmF0aW9uJyxcbiAgJ2RyaW5rJyxcbiAgJ2Zvb3RiYWxsJyxcbiAgJ2hlYXJ0JyxcbiAgJ2hvdXNlJyxcbiAgJ21lbG9uJyxcbiAgJ3NvY2NlcmJhbGwnLFxuICAnc3Vuc2V0JyxcbiAgJ3N1cmZib2FyZCcsXG5dIGFzIGNvbnN0O1xuXG50eXBlIEdyb3VwQXZhdGFySWNvblR5cGUgPSB0eXBlb2YgR3JvdXBBdmF0YXJJY29uc1tudW1iZXJdO1xuXG50eXBlIFBlcnNvbmFsQXZhdGFySWNvblR5cGUgPSB0eXBlb2YgUGVyc29uYWxBdmF0YXJJY29uc1tudW1iZXJdO1xuXG5leHBvcnQgdHlwZSBBdmF0YXJJY29uVHlwZSA9IEdyb3VwQXZhdGFySWNvblR5cGUgfCBQZXJzb25hbEF2YXRhckljb25UeXBlO1xuXG5leHBvcnQgdHlwZSBBdmF0YXJEYXRhVHlwZSA9IHtcbiAgaWQ6IG51bWJlciB8IHN0cmluZztcbiAgYnVmZmVyPzogVWludDhBcnJheTtcbiAgY29sb3I/OiBBdmF0YXJDb2xvclR5cGU7XG4gIGljb24/OiBBdmF0YXJJY29uVHlwZTtcbiAgaW1hZ2VQYXRoPzogc3RyaW5nO1xuICB0ZXh0Pzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgRGVsZXRlQXZhdGFyRnJvbURpc2tBY3Rpb25UeXBlID0gKFxuICBhdmF0YXJEYXRhOiBBdmF0YXJEYXRhVHlwZSxcbiAgY29udmVyc2F0aW9uSWQ/OiBzdHJpbmdcbikgPT4gdW5rbm93bjtcblxuZXhwb3J0IHR5cGUgUmVwbGFjZUF2YXRhckFjdGlvblR5cGUgPSAoXG4gIGN1cnI6IEF2YXRhckRhdGFUeXBlLFxuICBwcmV2PzogQXZhdGFyRGF0YVR5cGUsXG4gIGNvbnZlcnNhdGlvbklkPzogc3RyaW5nXG4pID0+IHVua25vd247XG5cbmV4cG9ydCB0eXBlIFNhdmVBdmF0YXJUb0Rpc2tBY3Rpb25UeXBlID0gKFxuICBhdmF0YXJEYXRhOiBBdmF0YXJEYXRhVHlwZSxcbiAgY29udmVyc2F0aW9uSWQ/OiBzdHJpbmdcbikgPT4gdW5rbm93bjtcblxuZXhwb3J0IHR5cGUgQXZhdGFyVXBkYXRlVHlwZSA9IFJlYWRvbmx5PHtcbiAgb2xkQXZhdGFyOiBVaW50OEFycmF5IHwgdW5kZWZpbmVkO1xuICBuZXdBdmF0YXI6IFVpbnQ4QXJyYXkgfCB1bmRlZmluZWQ7XG59PjtcblxuY29uc3QgZ3JvdXBJY29uQ29sb3JzID0gW1xuICAnQTE4MCcsXG4gICdBMTIwJyxcbiAgJ0ExMTAnLFxuICAnQTE3MCcsXG4gICdBMTAwJyxcbiAgJ0EyMTAnLFxuICAnQTEwMCcsXG4gICdBMTgwJyxcbiAgJ0ExMjAnLFxuICAnQTExMCcsXG4gICdBMTMwJyxcbiAgJ0EyMTAnLFxuXTtcblxuY29uc3QgcGVyc29uYWxJY29uQ29sb3JzID0gW1xuICAnQTEzMCcsXG4gICdBMTIwJyxcbiAgJ0ExNzAnLFxuICAnQTE5MCcsXG4gICdBMTQwJyxcbiAgJ0ExOTAnLFxuICAnQTEyMCcsXG4gICdBMTYwJyxcbiAgJ0ExMzAnLFxuICAnQTE4MCcsXG4gICdBMjEwJyxcbiAgJ0ExMDAnLFxuXTtcblxuc3RyaWN0QXNzZXJ0KFxuICBncm91cEljb25Db2xvcnMubGVuZ3RoID09PSBHcm91cEF2YXRhckljb25zLmxlbmd0aCAmJlxuICAgIHBlcnNvbmFsSWNvbkNvbG9ycy5sZW5ndGggPT09IFBlcnNvbmFsQXZhdGFySWNvbnMubGVuZ3RoLFxuICAnY29sb3JzLmxlbmd0aCAhPT0gaWNvbnMubGVuZ3RoJ1xuKTtcblxuY29uc3QgZ3JvdXBEZWZhdWx0QXZhdGFycyA9IEdyb3VwQXZhdGFySWNvbnMubWFwKChpY29uLCBpbmRleCkgPT4gKHtcbiAgaWQ6IGluZGV4LFxuICBjb2xvcjogZ3JvdXBJY29uQ29sb3JzW2luZGV4XSxcbiAgaWNvbixcbn0pKTtcblxuY29uc3QgcGVyc29uYWxEZWZhdWx0QXZhdGFycyA9IFBlcnNvbmFsQXZhdGFySWNvbnMubWFwKChpY29uLCBpbmRleCkgPT4gKHtcbiAgaWQ6IGluZGV4LFxuICBjb2xvcjogcGVyc29uYWxJY29uQ29sb3JzW2luZGV4XSxcbiAgaWNvbixcbn0pKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRBdmF0YXJzKGlzR3JvdXA/OiBib29sZWFuKTogQXJyYXk8QXZhdGFyRGF0YVR5cGU+IHtcbiAgaWYgKGlzR3JvdXApIHtcbiAgICByZXR1cm4gZ3JvdXBEZWZhdWx0QXZhdGFycztcbiAgfVxuXG4gIHJldHVybiBwZXJzb25hbERlZmF1bHRBdmF0YXJzO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxvQkFBNkI7QUFFdEIsTUFBTSxzQkFBc0I7QUFBQSxFQUNqQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUFFTyxNQUFNLG1CQUFtQjtBQUFBLEVBQzlCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQXNDQSxNQUFNLGtCQUFrQjtBQUFBLEVBQ3RCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUVBLE1BQU0scUJBQXFCO0FBQUEsRUFDekI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBRUEsZ0NBQ0UsZ0JBQWdCLFdBQVcsaUJBQWlCLFVBQzFDLG1CQUFtQixXQUFXLG9CQUFvQixRQUNwRCxnQ0FDRjtBQUVBLE1BQU0sc0JBQXNCLGlCQUFpQixJQUFJLENBQUMsTUFBTSxVQUFXO0FBQUEsRUFDakUsSUFBSTtBQUFBLEVBQ0osT0FBTyxnQkFBZ0I7QUFBQSxFQUN2QjtBQUNGLEVBQUU7QUFFRixNQUFNLHlCQUF5QixvQkFBb0IsSUFBSSxDQUFDLE1BQU0sVUFBVztBQUFBLEVBQ3ZFLElBQUk7QUFBQSxFQUNKLE9BQU8sbUJBQW1CO0FBQUEsRUFDMUI7QUFDRixFQUFFO0FBRUssMkJBQTJCLFNBQTBDO0FBQzFFLE1BQUksU0FBUztBQUNYLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FBTztBQUNUO0FBTmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
