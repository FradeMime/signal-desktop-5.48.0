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
var markAllAsVerifiedDefault_exports = {};
__export(markAllAsVerifiedDefault_exports, {
  markAllAsVerifiedDefault: () => markAllAsVerifiedDefault
});
module.exports = __toCommonJS(markAllAsVerifiedDefault_exports);
async function markAllAsVerifiedDefault(unverified) {
  await Promise.all(unverified.map((contact) => {
    if (contact.isUnverified()) {
      return contact.setVerifiedDefault();
    }
    return null;
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  markAllAsVerifiedDefault
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFya0FsbEFzVmVyaWZpZWREZWZhdWx0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvY29udmVyc2F0aW9ucyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYXJrQWxsQXNWZXJpZmllZERlZmF1bHQoXG4gIHVudmVyaWZpZWQ6IFJlYWRvbmx5QXJyYXk8Q29udmVyc2F0aW9uTW9kZWw+XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgdW52ZXJpZmllZC5tYXAoY29udGFjdCA9PiB7XG4gICAgICBpZiAoY29udGFjdC5pc1VudmVyaWZpZWQoKSkge1xuICAgICAgICByZXR1cm4gY29udGFjdC5zZXRWZXJpZmllZERlZmF1bHQoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSlcbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSx3Q0FDRSxZQUNlO0FBQ2YsUUFBTSxRQUFRLElBQ1osV0FBVyxJQUFJLGFBQVc7QUFDeEIsUUFBSSxRQUFRLGFBQWEsR0FBRztBQUMxQixhQUFPLFFBQVEsbUJBQW1CO0FBQUEsSUFDcEM7QUFFQSxXQUFPO0FBQUEsRUFDVCxDQUFDLENBQ0g7QUFDRjtBQVpzQiIsCiAgIm5hbWVzIjogW10KfQo=
