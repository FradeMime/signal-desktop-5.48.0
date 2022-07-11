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
var areWeASubscriber_exports = {};
__export(areWeASubscriber_exports, {
  AreWeASubscriberService: () => AreWeASubscriberService,
  areWeASubscriberService: () => areWeASubscriberService
});
module.exports = __toCommonJS(areWeASubscriber_exports);
var import_LatestQueue = require("../util/LatestQueue");
var import_waitForOnline = require("../util/waitForOnline");
class AreWeASubscriberService {
  constructor() {
    this.queue = new import_LatestQueue.LatestQueue();
  }
  update(storage, server) {
    this.queue.add(async () => {
      await new Promise((resolve) => storage.onready(resolve));
      const subscriberId = storage.get("subscriberId");
      if (!subscriberId || !subscriberId.byteLength) {
        storage.put("areWeASubscriber", false);
        return;
      }
      await (0, import_waitForOnline.waitForOnline)(navigator, window);
      storage.put("areWeASubscriber", await server.getHasSubscription(subscriberId));
    });
  }
}
const areWeASubscriberService = new AreWeASubscriberService();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AreWeASubscriberService,
  areWeASubscriberService
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXJlV2VBU3Vic2NyaWJlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFN0b3JhZ2VJbnRlcmZhY2UgfSBmcm9tICcuLi90eXBlcy9TdG9yYWdlLmQnO1xuaW1wb3J0IHR5cGUgeyBXZWJBUElUeXBlIH0gZnJvbSAnLi4vdGV4dHNlY3VyZS9XZWJBUEknO1xuaW1wb3J0IHsgTGF0ZXN0UXVldWUgfSBmcm9tICcuLi91dGlsL0xhdGVzdFF1ZXVlJztcbmltcG9ydCB7IHdhaXRGb3JPbmxpbmUgfSBmcm9tICcuLi91dGlsL3dhaXRGb3JPbmxpbmUnO1xuXG4vLyBUaGlzIGlzIG9ubHkgZXhwb3J0ZWQgZm9yIHRlc3RpbmcuXG5leHBvcnQgY2xhc3MgQXJlV2VBU3Vic2NyaWJlclNlcnZpY2Uge1xuICBwcml2YXRlIHJlYWRvbmx5IHF1ZXVlID0gbmV3IExhdGVzdFF1ZXVlKCk7XG5cbiAgdXBkYXRlKFxuICAgIHN0b3JhZ2U6IFBpY2s8U3RvcmFnZUludGVyZmFjZSwgJ2dldCcgfCAncHV0JyB8ICdvbnJlYWR5Jz4sXG4gICAgc2VydmVyOiBQaWNrPFdlYkFQSVR5cGUsICdnZXRIYXNTdWJzY3JpcHRpb24nPlxuICApOiB2b2lkIHtcbiAgICB0aGlzLnF1ZXVlLmFkZChhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHN0b3JhZ2Uub25yZWFkeShyZXNvbHZlKSk7XG5cbiAgICAgIGNvbnN0IHN1YnNjcmliZXJJZCA9IHN0b3JhZ2UuZ2V0KCdzdWJzY3JpYmVySWQnKTtcbiAgICAgIGlmICghc3Vic2NyaWJlcklkIHx8ICFzdWJzY3JpYmVySWQuYnl0ZUxlbmd0aCkge1xuICAgICAgICBzdG9yYWdlLnB1dCgnYXJlV2VBU3Vic2NyaWJlcicsIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCB3YWl0Rm9yT25saW5lKG5hdmlnYXRvciwgd2luZG93KTtcblxuICAgICAgc3RvcmFnZS5wdXQoXG4gICAgICAgICdhcmVXZUFTdWJzY3JpYmVyJyxcbiAgICAgICAgYXdhaXQgc2VydmVyLmdldEhhc1N1YnNjcmlwdGlvbihzdWJzY3JpYmVySWQpXG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBhcmVXZUFTdWJzY3JpYmVyU2VydmljZSA9IG5ldyBBcmVXZUFTdWJzY3JpYmVyU2VydmljZSgpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0EseUJBQTRCO0FBQzVCLDJCQUE4QjtBQUd2QixNQUFNLHdCQUF3QjtBQUFBLEVBQTlCO0FBQ1ksaUJBQVEsSUFBSSwrQkFBWTtBQUFBO0FBQUEsRUFFekMsT0FDRSxTQUNBLFFBQ007QUFDTixTQUFLLE1BQU0sSUFBSSxZQUFZO0FBQ3pCLFlBQU0sSUFBSSxRQUFjLGFBQVcsUUFBUSxRQUFRLE9BQU8sQ0FBQztBQUUzRCxZQUFNLGVBQWUsUUFBUSxJQUFJLGNBQWM7QUFDL0MsVUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsWUFBWTtBQUM3QyxnQkFBUSxJQUFJLG9CQUFvQixLQUFLO0FBQ3JDO0FBQUEsTUFDRjtBQUVBLFlBQU0sd0NBQWMsV0FBVyxNQUFNO0FBRXJDLGNBQVEsSUFDTixvQkFDQSxNQUFNLE9BQU8sbUJBQW1CLFlBQVksQ0FDOUM7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUF4Qk8sQUEwQkEsTUFBTSwwQkFBMEIsSUFBSSx3QkFBd0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
