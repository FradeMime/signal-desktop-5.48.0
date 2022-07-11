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
var commonShouldJobContinue_exports = {};
__export(commonShouldJobContinue_exports, {
  commonShouldJobContinue: () => commonShouldJobContinue
});
module.exports = __toCommonJS(commonShouldJobContinue_exports);
var import_waitForOnline = require("../../util/waitForOnline");
var import_sleep = require("../../util/sleep");
var import_exponentialBackoff = require("../../util/exponentialBackoff");
var import_registration = require("../../util/registration");
async function commonShouldJobContinue({
  attempt,
  log,
  timeRemaining,
  skipWait
}) {
  if (timeRemaining <= 0) {
    log.info("giving up because it's been too long");
    return false;
  }
  try {
    await (0, import_waitForOnline.waitForOnline)(window.navigator, window, { timeout: timeRemaining });
  } catch (err) {
    log.info("didn't come online in time, giving up");
    return false;
  }
  await new Promise((resolve) => {
    window.storage.onready(resolve);
  });
  if (!(0, import_registration.isDone)()) {
    log.info("skipping this job because we're unlinked");
    return false;
  }
  if (skipWait) {
    return true;
  }
  const sleepTime = (0, import_exponentialBackoff.exponentialBackoffSleepTime)(attempt);
  log.info(`sleeping for ${sleepTime}`);
  await (0, import_sleep.sleep)(sleepTime);
  return true;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  commonShouldJobContinue
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29tbW9uU2hvdWxkSm9iQ29udGludWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvTG9nZ2luZyc7XG5pbXBvcnQgeyB3YWl0Rm9yT25saW5lIH0gZnJvbSAnLi4vLi4vdXRpbC93YWl0Rm9yT25saW5lJztcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi4vLi4vdXRpbC9zbGVlcCc7XG5pbXBvcnQgeyBleHBvbmVudGlhbEJhY2tvZmZTbGVlcFRpbWUgfSBmcm9tICcuLi8uLi91dGlsL2V4cG9uZW50aWFsQmFja29mZic7XG5pbXBvcnQgeyBpc0RvbmUgYXMgaXNEZXZpY2VMaW5rZWQgfSBmcm9tICcuLi8uLi91dGlsL3JlZ2lzdHJhdGlvbic7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21tb25TaG91bGRKb2JDb250aW51ZSh7XG4gIGF0dGVtcHQsXG4gIGxvZyxcbiAgdGltZVJlbWFpbmluZyxcbiAgc2tpcFdhaXQsXG59OiBSZWFkb25seTx7XG4gIGF0dGVtcHQ6IG51bWJlcjtcbiAgbG9nOiBMb2dnZXJUeXBlO1xuICB0aW1lUmVtYWluaW5nOiBudW1iZXI7XG4gIHNraXBXYWl0OiBib29sZWFuO1xufT4pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgaWYgKHRpbWVSZW1haW5pbmcgPD0gMCkge1xuICAgIGxvZy5pbmZvKFwiZ2l2aW5nIHVwIGJlY2F1c2UgaXQncyBiZWVuIHRvbyBsb25nXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgYXdhaXQgd2FpdEZvck9ubGluZSh3aW5kb3cubmF2aWdhdG9yLCB3aW5kb3csIHsgdGltZW91dDogdGltZVJlbWFpbmluZyB9KTtcbiAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgbG9nLmluZm8oXCJkaWRuJ3QgY29tZSBvbmxpbmUgaW4gdGltZSwgZ2l2aW5nIHVwXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4ge1xuICAgIHdpbmRvdy5zdG9yYWdlLm9ucmVhZHkocmVzb2x2ZSk7XG4gIH0pO1xuXG4gIGlmICghaXNEZXZpY2VMaW5rZWQoKSkge1xuICAgIGxvZy5pbmZvKFwic2tpcHBpbmcgdGhpcyBqb2IgYmVjYXVzZSB3ZSdyZSB1bmxpbmtlZFwiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoc2tpcFdhaXQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IHNsZWVwVGltZSA9IGV4cG9uZW50aWFsQmFja29mZlNsZWVwVGltZShhdHRlbXB0KTtcbiAgbG9nLmluZm8oYHNsZWVwaW5nIGZvciAke3NsZWVwVGltZX1gKTtcbiAgYXdhaXQgc2xlZXAoc2xlZXBUaW1lKTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSwyQkFBOEI7QUFDOUIsbUJBQXNCO0FBQ3RCLGdDQUE0QztBQUM1QywwQkFBeUM7QUFFekMsdUNBQThDO0FBQUEsRUFDNUM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQU1vQjtBQUNwQixNQUFJLGlCQUFpQixHQUFHO0FBQ3RCLFFBQUksS0FBSyxzQ0FBc0M7QUFDL0MsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJO0FBQ0YsVUFBTSx3Q0FBYyxPQUFPLFdBQVcsUUFBUSxFQUFFLFNBQVMsY0FBYyxDQUFDO0FBQUEsRUFDMUUsU0FBUyxLQUFQO0FBQ0EsUUFBSSxLQUFLLHVDQUF1QztBQUNoRCxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sSUFBSSxRQUFjLGFBQVc7QUFDakMsV0FBTyxRQUFRLFFBQVEsT0FBTztBQUFBLEVBQ2hDLENBQUM7QUFFRCxNQUFJLENBQUMsZ0NBQWUsR0FBRztBQUNyQixRQUFJLEtBQUssMENBQTBDO0FBQ25ELFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxVQUFVO0FBQ1osV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFlBQVksMkRBQTRCLE9BQU87QUFDckQsTUFBSSxLQUFLLGdCQUFnQixXQUFXO0FBQ3BDLFFBQU0sd0JBQU0sU0FBUztBQUVyQixTQUFPO0FBQ1Q7QUF6Q3NCIiwKICAibmFtZXMiOiBbXQp9Cg==
