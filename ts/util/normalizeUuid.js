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
var normalizeUuid_exports = {};
__export(normalizeUuid_exports, {
  normalizeUuid: () => normalizeUuid
});
module.exports = __toCommonJS(normalizeUuid_exports);
var import_UUID = require("../types/UUID");
var log = __toESM(require("../logging/log"));
function normalizeUuid(uuid, context, logger = log) {
  const result = uuid.toLowerCase();
  if (!(0, import_UUID.isValidUuid)(uuid) || !(0, import_UUID.isValidUuid)(result)) {
    logger.warn(`Normalizing invalid uuid: ${uuid} to ${result} in context "${context}"`);
    return result;
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  normalizeUuid
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9ybWFsaXplVXVpZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFVVSURTdHJpbmdUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgeyBpc1ZhbGlkVXVpZCB9IGZyb20gJy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvTG9nZ2luZyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplVXVpZChcbiAgdXVpZDogc3RyaW5nLFxuICBjb250ZXh0OiBzdHJpbmcsXG4gIGxvZ2dlcjogUGljazxMb2dnZXJUeXBlLCAnd2Fybic+ID0gbG9nXG4pOiBVVUlEU3RyaW5nVHlwZSB7XG4gIGNvbnN0IHJlc3VsdCA9IHV1aWQudG9Mb3dlckNhc2UoKTtcblxuICBpZiAoIWlzVmFsaWRVdWlkKHV1aWQpIHx8ICFpc1ZhbGlkVXVpZChyZXN1bHQpKSB7XG4gICAgbG9nZ2VyLndhcm4oXG4gICAgICBgTm9ybWFsaXppbmcgaW52YWxpZCB1dWlkOiAke3V1aWR9IHRvICR7cmVzdWx0fSBpbiBjb250ZXh0IFwiJHtjb250ZXh0fVwiYFxuICAgICk7XG5cbiAgICAvLyBDYXN0IGFueXdheSB3ZSBkb24ndCB3YW50IHRvIHRocm93IGhlcmVcbiAgICByZXR1cm4gcmVzdWx0IGFzIHVua25vd24gYXMgVVVJRFN0cmluZ1R5cGU7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLGtCQUE0QjtBQUU1QixVQUFxQjtBQUVkLHVCQUNMLE1BQ0EsU0FDQSxTQUFtQyxLQUNuQjtBQUNoQixRQUFNLFNBQVMsS0FBSyxZQUFZO0FBRWhDLE1BQUksQ0FBQyw2QkFBWSxJQUFJLEtBQUssQ0FBQyw2QkFBWSxNQUFNLEdBQUc7QUFDOUMsV0FBTyxLQUNMLDZCQUE2QixXQUFXLHNCQUFzQixVQUNoRTtBQUdBLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FBTztBQUNUO0FBakJnQiIsCiAgIm5hbWVzIjogW10KfQo=
