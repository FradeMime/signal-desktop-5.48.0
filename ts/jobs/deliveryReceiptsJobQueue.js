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
var deliveryReceiptsJobQueue_exports = {};
__export(deliveryReceiptsJobQueue_exports, {
  DeliveryReceiptsJobQueue: () => DeliveryReceiptsJobQueue,
  deliveryReceiptsJobQueue: () => deliveryReceiptsJobQueue
});
module.exports = __toCommonJS(deliveryReceiptsJobQueue_exports);
var import_zod = require("zod");
var import_exponentialBackoff = require("../util/exponentialBackoff");
var import_Receipt = require("../types/Receipt");
var import_receiptHelpers = require("./helpers/receiptHelpers");
var import_JobQueue = require("./JobQueue");
var import_JobQueueDatabaseStore = require("./JobQueueDatabaseStore");
const deliveryReceiptsJobDataSchema = import_zod.z.object({
  deliveryReceipts: import_Receipt.receiptSchema.array()
});
class DeliveryReceiptsJobQueue extends import_JobQueue.JobQueue {
  parseData(data) {
    return deliveryReceiptsJobDataSchema.parse(data);
  }
  async run({
    data,
    timestamp
  }, { attempt, log }) {
    await (0, import_receiptHelpers.runReceiptJob)({
      attempt,
      log,
      timestamp,
      receipts: data.deliveryReceipts,
      type: import_Receipt.ReceiptType.Delivery
    });
  }
}
const deliveryReceiptsJobQueue = new DeliveryReceiptsJobQueue({
  store: import_JobQueueDatabaseStore.jobQueueDatabaseStore,
  queueType: "delivery receipts",
  maxAttempts: (0, import_exponentialBackoff.exponentialBackoffMaxAttempts)(import_receiptHelpers.MAX_RETRY_TIME)
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeliveryReceiptsJobQueue,
  deliveryReceiptsJobQueue
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGVsaXZlcnlSZWNlaXB0c0pvYlF1ZXVlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IHogfSBmcm9tICd6b2QnO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvTG9nZ2luZyc7XG5pbXBvcnQgeyBleHBvbmVudGlhbEJhY2tvZmZNYXhBdHRlbXB0cyB9IGZyb20gJy4uL3V0aWwvZXhwb25lbnRpYWxCYWNrb2ZmJztcbmltcG9ydCB7IHJlY2VpcHRTY2hlbWEsIFJlY2VpcHRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvUmVjZWlwdCc7XG5pbXBvcnQgeyBNQVhfUkVUUllfVElNRSwgcnVuUmVjZWlwdEpvYiB9IGZyb20gJy4vaGVscGVycy9yZWNlaXB0SGVscGVycyc7XG5cbmltcG9ydCB7IEpvYlF1ZXVlIH0gZnJvbSAnLi9Kb2JRdWV1ZSc7XG5pbXBvcnQgeyBqb2JRdWV1ZURhdGFiYXNlU3RvcmUgfSBmcm9tICcuL0pvYlF1ZXVlRGF0YWJhc2VTdG9yZSc7XG5cbmNvbnN0IGRlbGl2ZXJ5UmVjZWlwdHNKb2JEYXRhU2NoZW1hID0gei5vYmplY3Qoe1xuICBkZWxpdmVyeVJlY2VpcHRzOiByZWNlaXB0U2NoZW1hLmFycmF5KCksXG59KTtcblxudHlwZSBEZWxpdmVyeVJlY2VpcHRzSm9iRGF0YSA9IHouaW5mZXI8dHlwZW9mIGRlbGl2ZXJ5UmVjZWlwdHNKb2JEYXRhU2NoZW1hPjtcblxuZXhwb3J0IGNsYXNzIERlbGl2ZXJ5UmVjZWlwdHNKb2JRdWV1ZSBleHRlbmRzIEpvYlF1ZXVlPERlbGl2ZXJ5UmVjZWlwdHNKb2JEYXRhPiB7XG4gIHByb3RlY3RlZCBwYXJzZURhdGEoZGF0YTogdW5rbm93bik6IERlbGl2ZXJ5UmVjZWlwdHNKb2JEYXRhIHtcbiAgICByZXR1cm4gZGVsaXZlcnlSZWNlaXB0c0pvYkRhdGFTY2hlbWEucGFyc2UoZGF0YSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgcnVuKFxuICAgIHtcbiAgICAgIGRhdGEsXG4gICAgICB0aW1lc3RhbXAsXG4gICAgfTogUmVhZG9ubHk8eyBkYXRhOiBEZWxpdmVyeVJlY2VpcHRzSm9iRGF0YTsgdGltZXN0YW1wOiBudW1iZXIgfT4sXG4gICAgeyBhdHRlbXB0LCBsb2cgfTogUmVhZG9ubHk8eyBhdHRlbXB0OiBudW1iZXI7IGxvZzogTG9nZ2VyVHlwZSB9PlxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBydW5SZWNlaXB0Sm9iKHtcbiAgICAgIGF0dGVtcHQsXG4gICAgICBsb2csXG4gICAgICB0aW1lc3RhbXAsXG4gICAgICByZWNlaXB0czogZGF0YS5kZWxpdmVyeVJlY2VpcHRzLFxuICAgICAgdHlwZTogUmVjZWlwdFR5cGUuRGVsaXZlcnksXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRlbGl2ZXJ5UmVjZWlwdHNKb2JRdWV1ZSA9IG5ldyBEZWxpdmVyeVJlY2VpcHRzSm9iUXVldWUoe1xuICBzdG9yZTogam9iUXVldWVEYXRhYmFzZVN0b3JlLFxuICBxdWV1ZVR5cGU6ICdkZWxpdmVyeSByZWNlaXB0cycsXG4gIG1heEF0dGVtcHRzOiBleHBvbmVudGlhbEJhY2tvZmZNYXhBdHRlbXB0cyhNQVhfUkVUUllfVElNRSksXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGlCQUFrQjtBQUVsQixnQ0FBOEM7QUFDOUMscUJBQTJDO0FBQzNDLDRCQUE4QztBQUU5QyxzQkFBeUI7QUFDekIsbUNBQXNDO0FBRXRDLE1BQU0sZ0NBQWdDLGFBQUUsT0FBTztBQUFBLEVBQzdDLGtCQUFrQiw2QkFBYyxNQUFNO0FBQ3hDLENBQUM7QUFJTSxNQUFNLGlDQUFpQyx5QkFBa0M7QUFBQSxFQUNwRSxVQUFVLE1BQXdDO0FBQzFELFdBQU8sOEJBQThCLE1BQU0sSUFBSTtBQUFBLEVBQ2pEO0FBQUEsUUFFZ0IsSUFDZDtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsS0FFRixFQUFFLFNBQVMsT0FDSTtBQUNmLFVBQU0seUNBQWM7QUFBQSxNQUNsQjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxVQUFVLEtBQUs7QUFBQSxNQUNmLE1BQU0sMkJBQVk7QUFBQSxJQUNwQixDQUFDO0FBQUEsRUFDSDtBQUNGO0FBcEJPLEFBc0JBLE1BQU0sMkJBQTJCLElBQUkseUJBQXlCO0FBQUEsRUFDbkUsT0FBTztBQUFBLEVBQ1AsV0FBVztBQUFBLEVBQ1gsYUFBYSw2REFBOEIsb0NBQWM7QUFDM0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
