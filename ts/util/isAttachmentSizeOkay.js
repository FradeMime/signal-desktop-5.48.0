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
var isAttachmentSizeOkay_exports = {};
__export(isAttachmentSizeOkay_exports, {
  isAttachmentSizeOkay: () => isAttachmentSizeOkay
});
module.exports = __toCommonJS(isAttachmentSizeOkay_exports);
var import_Attachment = require("../types/Attachment");
var import_showToast = require("./showToast");
var import_ToastFileSize = require("../components/ToastFileSize");
function isAttachmentSizeOkay(attachment) {
  const limitKb = (0, import_Attachment.getMaximumAttachmentSize)();
  if ((attachment.data.byteLength / 1024).toFixed(4) >= limitKb) {
    const units = ["kB", "MB", "GB"];
    let u = -1;
    let limit = limitKb * 1e3;
    do {
      limit /= 1e3;
      u += 1;
    } while (limit >= 1e3 && u < units.length - 1);
    (0, import_showToast.showToast)(import_ToastFileSize.ToastFileSize, {
      limit,
      units: units[u]
    });
    return false;
  }
  return true;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isAttachmentSizeOkay
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNBdHRhY2htZW50U2l6ZU9rYXkudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBBdHRhY2htZW50VHlwZSB9IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHsgZ2V0TWF4aW11bUF0dGFjaG1lbnRTaXplIH0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgeyBzaG93VG9hc3QgfSBmcm9tICcuL3Nob3dUb2FzdCc7XG5pbXBvcnQgeyBUb2FzdEZpbGVTaXplIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ub2FzdEZpbGVTaXplJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXR0YWNobWVudFNpemVPa2F5KFxuICBhdHRhY2htZW50OiBSZWFkb25seTxBdHRhY2htZW50VHlwZT5cbik6IGJvb2xlYW4ge1xuICBjb25zdCBsaW1pdEtiID0gZ2V0TWF4aW11bUF0dGFjaG1lbnRTaXplKCk7XG4gIC8vIHRoaXMgbmVlZHMgdG8gYmUgY2FzdCBwcm9wZXJseVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4gIC8vIEB0cy1pZ25vcmVcbiAgaWYgKChhdHRhY2htZW50LmRhdGEuYnl0ZUxlbmd0aCAvIDEwMjQpLnRvRml4ZWQoNCkgPj0gbGltaXRLYikge1xuICAgIGNvbnN0IHVuaXRzID0gWydrQicsICdNQicsICdHQiddO1xuICAgIGxldCB1ID0gLTE7XG4gICAgbGV0IGxpbWl0ID0gbGltaXRLYiAqIDEwMDA7XG4gICAgZG8ge1xuICAgICAgbGltaXQgLz0gMTAwMDtcbiAgICAgIHUgKz0gMTtcbiAgICB9IHdoaWxlIChsaW1pdCA+PSAxMDAwICYmIHUgPCB1bml0cy5sZW5ndGggLSAxKTtcbiAgICBzaG93VG9hc3QoVG9hc3RGaWxlU2l6ZSwge1xuICAgICAgbGltaXQsXG4gICAgICB1bml0czogdW5pdHNbdV0sXG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsd0JBQXlDO0FBQ3pDLHVCQUEwQjtBQUMxQiwyQkFBOEI7QUFFdkIsOEJBQ0wsWUFDUztBQUNULFFBQU0sVUFBVSxnREFBeUI7QUFJekMsTUFBSyxZQUFXLEtBQUssYUFBYSxNQUFNLFFBQVEsQ0FBQyxLQUFLLFNBQVM7QUFDN0QsVUFBTSxRQUFRLENBQUMsTUFBTSxNQUFNLElBQUk7QUFDL0IsUUFBSSxJQUFJO0FBQ1IsUUFBSSxRQUFRLFVBQVU7QUFDdEIsT0FBRztBQUNELGVBQVM7QUFDVCxXQUFLO0FBQUEsSUFDUCxTQUFTLFNBQVMsT0FBUSxJQUFJLE1BQU0sU0FBUztBQUM3QyxvQ0FBVSxvQ0FBZTtBQUFBLE1BQ3ZCO0FBQUEsTUFDQSxPQUFPLE1BQU07QUFBQSxJQUNmLENBQUM7QUFDRCxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU87QUFDVDtBQXZCZ0IiLAogICJuYW1lcyI6IFtdCn0K
