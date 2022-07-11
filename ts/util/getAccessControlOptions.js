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
var getAccessControlOptions_exports = {};
__export(getAccessControlOptions_exports, {
  getAccessControlOptions: () => getAccessControlOptions
});
module.exports = __toCommonJS(getAccessControlOptions_exports);
var import_protobuf = require("../protobuf");
const AccessControlEnum = import_protobuf.SignalService.AccessControl.AccessRequired;
function getAccessControlOptions(i18n) {
  return [
    {
      text: i18n("GroupV2--all-members"),
      value: AccessControlEnum.MEMBER
    },
    {
      text: i18n("GroupV2--only-admins"),
      value: AccessControlEnum.ADMINISTRATOR
    }
  ];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAccessControlOptions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0QWNjZXNzQ29udHJvbE9wdGlvbnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vcHJvdG9idWYnO1xuXG5jb25zdCBBY2Nlc3NDb250cm9sRW51bSA9IFByb3RvLkFjY2Vzc0NvbnRyb2wuQWNjZXNzUmVxdWlyZWQ7XG5cbnR5cGUgQWNjZXNzQ29udHJvbE9wdGlvbiA9IHtcbiAgdGV4dDogc3RyaW5nO1xuICB2YWx1ZTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFjY2Vzc0NvbnRyb2xPcHRpb25zKFxuICBpMThuOiBMb2NhbGl6ZXJUeXBlXG4pOiBBcnJheTxBY2Nlc3NDb250cm9sT3B0aW9uPiB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgdGV4dDogaTE4bignR3JvdXBWMi0tYWxsLW1lbWJlcnMnKSxcbiAgICAgIHZhbHVlOiBBY2Nlc3NDb250cm9sRW51bS5NRU1CRVIsXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBpMThuKCdHcm91cFYyLS1vbmx5LWFkbWlucycpLFxuICAgICAgdmFsdWU6IEFjY2Vzc0NvbnRyb2xFbnVtLkFETUlOSVNUUkFUT1IsXG4gICAgfSxcbiAgXTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxzQkFBdUM7QUFFdkMsTUFBTSxvQkFBb0IsOEJBQU0sY0FBYztBQU92QyxpQ0FDTCxNQUM0QjtBQUM1QixTQUFPO0FBQUEsSUFDTDtBQUFBLE1BQ0UsTUFBTSxLQUFLLHNCQUFzQjtBQUFBLE1BQ2pDLE9BQU8sa0JBQWtCO0FBQUEsSUFDM0I7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNLEtBQUssc0JBQXNCO0FBQUEsTUFDakMsT0FBTyxrQkFBa0I7QUFBQSxJQUMzQjtBQUFBLEVBQ0Y7QUFDRjtBQWJnQiIsCiAgIm5hbWVzIjogW10KfQo=
