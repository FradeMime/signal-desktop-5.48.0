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
var Receipt_exports = {};
__export(Receipt_exports, {
  ReceiptType: () => ReceiptType,
  receiptSchema: () => receiptSchema
});
module.exports = __toCommonJS(Receipt_exports);
var import_zod = require("zod");
const receiptSchema = import_zod.z.object({
  messageId: import_zod.z.string(),
  senderE164: import_zod.z.string().optional(),
  senderUuid: import_zod.z.string().optional(),
  timestamp: import_zod.z.number()
});
var ReceiptType = /* @__PURE__ */ ((ReceiptType2) => {
  ReceiptType2["Delivery"] = "deliveryReceipt";
  ReceiptType2["Read"] = "readReceipt";
  ReceiptType2["Viewed"] = "viewedReceipt";
  return ReceiptType2;
})(ReceiptType || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReceiptType,
  receiptSchema
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUmVjZWlwdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJztcblxuZXhwb3J0IGNvbnN0IHJlY2VpcHRTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIG1lc3NhZ2VJZDogei5zdHJpbmcoKSxcbiAgc2VuZGVyRTE2NDogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBzZW5kZXJVdWlkOiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG4gIHRpbWVzdGFtcDogei5udW1iZXIoKSxcbn0pO1xuXG5leHBvcnQgZW51bSBSZWNlaXB0VHlwZSB7XG4gIERlbGl2ZXJ5ID0gJ2RlbGl2ZXJ5UmVjZWlwdCcsXG4gIFJlYWQgPSAncmVhZFJlY2VpcHQnLFxuICBWaWV3ZWQgPSAndmlld2VkUmVjZWlwdCcsXG59XG5cbmV4cG9ydCB0eXBlIFJlY2VpcHQgPSB6LmluZmVyPHR5cGVvZiByZWNlaXB0U2NoZW1hPjtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsaUJBQWtCO0FBRVgsTUFBTSxnQkFBZ0IsYUFBRSxPQUFPO0FBQUEsRUFDcEMsV0FBVyxhQUFFLE9BQU87QUFBQSxFQUNwQixZQUFZLGFBQUUsT0FBTyxFQUFFLFNBQVM7QUFBQSxFQUNoQyxZQUFZLGFBQUUsT0FBTyxFQUFFLFNBQVM7QUFBQSxFQUNoQyxXQUFXLGFBQUUsT0FBTztBQUN0QixDQUFDO0FBRU0sSUFBSyxjQUFMLGtCQUFLLGlCQUFMO0FBQ0wsNkJBQVc7QUFDWCx5QkFBTztBQUNQLDJCQUFTO0FBSEM7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K
