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
var batcher_exports = {};
__export(batcher_exports, {
  createBatcher: () => createBatcher
});
module.exports = __toCommonJS(batcher_exports);
var import_p_queue = __toESM(require("p-queue"));
var import_sleep = require("./sleep");
var log = __toESM(require("../logging/log"));
var Errors = __toESM(require("../types/errors"));
var import_clearTimeoutIfNecessary = require("./clearTimeoutIfNecessary");
window.batchers = [];
window.waitForAllBatchers = async () => {
  log.info("batcher#waitForAllBatchers");
  try {
    await Promise.all(window.batchers.map((item) => item.flushAndWait()));
  } catch (error) {
    log.error("waitForAllBatchers: error flushing all", Errors.toLogFormat(error));
  }
};
function createBatcher(options) {
  let batcher;
  let timeout;
  let items = [];
  const queue = new import_p_queue.default({
    concurrency: 1,
    timeout: 1e3 * 60 * 2,
    throwOnTimeout: true
  });
  function _kickBatchOff() {
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(timeout);
    timeout = null;
    const itemsRef = items;
    items = [];
    queue.add(async () => {
      await options.processBatch(itemsRef);
    });
  }
  function add(item) {
    items.push(item);
    if (items.length === 1) {
      timeout = setTimeout(_kickBatchOff, options.wait);
    } else if (items.length >= options.maxSize) {
      _kickBatchOff();
    }
  }
  function removeAll(needle) {
    items = items.filter((item) => item !== needle);
  }
  function anyPending() {
    return queue.size > 0 || queue.pending > 0 || items.length > 0;
  }
  async function onIdle() {
    while (anyPending()) {
      if (queue.size > 0 || queue.pending > 0) {
        await queue.onIdle();
      }
      if (items.length > 0) {
        await (0, import_sleep.sleep)(options.wait * 2);
      }
    }
  }
  function unregister() {
    window.batchers = window.batchers.filter((item) => item !== batcher);
  }
  async function flushAndWait() {
    log.info(`Flushing ${options.name} batcher items.length=${items.length}`);
    while (anyPending()) {
      _kickBatchOff();
      if (queue.size > 0 || queue.pending > 0) {
        await queue.onIdle();
      }
    }
    log.info(`Flushing complete ${options.name} for batcher`);
  }
  batcher = {
    add,
    removeAll,
    anyPending,
    onIdle,
    flushAndWait,
    unregister
  };
  window.batchers.push(batcher);
  return batcher;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createBatcher
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYmF0Y2hlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBQUXVldWUgZnJvbSAncC1xdWV1ZSc7XG5cbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi9zbGVlcCc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0ICogYXMgRXJyb3JzIGZyb20gJy4uL3R5cGVzL2Vycm9ycyc7XG5pbXBvcnQgeyBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSB9IGZyb20gJy4vY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnknO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIC8vIFdlIHdhbnQgdG8gZXh0ZW5kIGB3aW5kb3dgJ3MgcHJvcGVydGllcywgc28gd2UgbmVlZCBhbiBpbnRlcmZhY2UuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGJhdGNoZXJzOiBBcnJheTxCYXRjaGVyVHlwZTxhbnk+PjtcbiAgICB3YWl0Rm9yQWxsQmF0Y2hlcnM6ICgpID0+IFByb21pc2U8dW5rbm93bj47XG4gIH1cbn1cblxud2luZG93LmJhdGNoZXJzID0gW107XG5cbndpbmRvdy53YWl0Rm9yQWxsQmF0Y2hlcnMgPSBhc3luYyAoKSA9PiB7XG4gIGxvZy5pbmZvKCdiYXRjaGVyI3dhaXRGb3JBbGxCYXRjaGVycycpO1xuICB0cnkge1xuICAgIGF3YWl0IFByb21pc2UuYWxsKHdpbmRvdy5iYXRjaGVycy5tYXAoaXRlbSA9PiBpdGVtLmZsdXNoQW5kV2FpdCgpKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nLmVycm9yKFxuICAgICAgJ3dhaXRGb3JBbGxCYXRjaGVyczogZXJyb3IgZmx1c2hpbmcgYWxsJyxcbiAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgdHlwZSBCYXRjaGVyT3B0aW9uc1R5cGU8SXRlbVR5cGU+ID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHdhaXQ6IG51bWJlcjtcbiAgbWF4U2l6ZTogbnVtYmVyO1xuICBwcm9jZXNzQmF0Y2g6IChpdGVtczogQXJyYXk8SXRlbVR5cGU+KSA9PiB2b2lkIHwgUHJvbWlzZTx2b2lkPjtcbn07XG5cbmV4cG9ydCB0eXBlIEJhdGNoZXJUeXBlPEl0ZW1UeXBlPiA9IHtcbiAgYWRkOiAoaXRlbTogSXRlbVR5cGUpID0+IHZvaWQ7XG4gIHJlbW92ZUFsbDogKG5lZWRsZTogSXRlbVR5cGUpID0+IHZvaWQ7XG4gIGFueVBlbmRpbmc6ICgpID0+IGJvb2xlYW47XG4gIG9uSWRsZTogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgZmx1c2hBbmRXYWl0OiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuICB1bnJlZ2lzdGVyOiAoKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJhdGNoZXI8SXRlbVR5cGU+KFxuICBvcHRpb25zOiBCYXRjaGVyT3B0aW9uc1R5cGU8SXRlbVR5cGU+XG4pOiBCYXRjaGVyVHlwZTxJdGVtVHlwZT4ge1xuICBsZXQgYmF0Y2hlcjogQmF0Y2hlclR5cGU8SXRlbVR5cGU+O1xuICBsZXQgdGltZW91dDogTm9kZUpTLlRpbWVvdXQgfCBudWxsO1xuICBsZXQgaXRlbXM6IEFycmF5PEl0ZW1UeXBlPiA9IFtdO1xuICBjb25zdCBxdWV1ZSA9IG5ldyBQUXVldWUoe1xuICAgIGNvbmN1cnJlbmN5OiAxLFxuICAgIHRpbWVvdXQ6IDEwMDAgKiA2MCAqIDIsXG4gICAgdGhyb3dPblRpbWVvdXQ6IHRydWUsXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIF9raWNrQmF0Y2hPZmYoKSB7XG4gICAgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkodGltZW91dCk7XG4gICAgdGltZW91dCA9IG51bGw7XG5cbiAgICBjb25zdCBpdGVtc1JlZiA9IGl0ZW1zO1xuICAgIGl0ZW1zID0gW107XG4gICAgcXVldWUuYWRkKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IG9wdGlvbnMucHJvY2Vzc0JhdGNoKGl0ZW1zUmVmKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZChpdGVtOiBJdGVtVHlwZSkge1xuICAgIGl0ZW1zLnB1c2goaXRlbSk7XG5cbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAvLyBTZXQgdGltZW91dCBvbmNlIHdoZW4gd2UganVzdCBwdXNoZWQgdGhlIGZpcnN0IGl0ZW0gc28gdGhhdCB0aGUgd2FpdFxuICAgICAgLy8gdGltZSBpcyBib3VuZGVkIGJ5IGBvcHRpb25zLndhaXRgIGFuZCBub3QgZXh0ZW5kZWQgYnkgZnVydGhlciBwdXNoZXMuXG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChfa2lja0JhdGNoT2ZmLCBvcHRpb25zLndhaXQpO1xuICAgIH0gZWxzZSBpZiAoaXRlbXMubGVuZ3RoID49IG9wdGlvbnMubWF4U2l6ZSkge1xuICAgICAgX2tpY2tCYXRjaE9mZigpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUFsbChuZWVkbGU6IEl0ZW1UeXBlKSB7XG4gICAgaXRlbXMgPSBpdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBuZWVkbGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYW55UGVuZGluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcXVldWUuc2l6ZSA+IDAgfHwgcXVldWUucGVuZGluZyA+IDAgfHwgaXRlbXMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIG9uSWRsZSgpIHtcbiAgICB3aGlsZSAoYW55UGVuZGluZygpKSB7XG4gICAgICBpZiAocXVldWUuc2l6ZSA+IDAgfHwgcXVldWUucGVuZGluZyA+IDApIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgICAgYXdhaXQgcXVldWUub25JZGxlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICAgIGF3YWl0IHNsZWVwKG9wdGlvbnMud2FpdCAqIDIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVucmVnaXN0ZXIoKSB7XG4gICAgd2luZG93LmJhdGNoZXJzID0gd2luZG93LmJhdGNoZXJzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGJhdGNoZXIpO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gZmx1c2hBbmRXYWl0KCkge1xuICAgIGxvZy5pbmZvKGBGbHVzaGluZyAke29wdGlvbnMubmFtZX0gYmF0Y2hlciBpdGVtcy5sZW5ndGg9JHtpdGVtcy5sZW5ndGh9YCk7XG5cbiAgICB3aGlsZSAoYW55UGVuZGluZygpKSB7XG4gICAgICBfa2lja0JhdGNoT2ZmKCk7XG5cbiAgICAgIGlmIChxdWV1ZS5zaXplID4gMCB8fCBxdWV1ZS5wZW5kaW5nID4gMCkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgICBhd2FpdCBxdWV1ZS5vbklkbGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbG9nLmluZm8oYEZsdXNoaW5nIGNvbXBsZXRlICR7b3B0aW9ucy5uYW1lfSBmb3IgYmF0Y2hlcmApO1xuICB9XG5cbiAgYmF0Y2hlciA9IHtcbiAgICBhZGQsXG4gICAgcmVtb3ZlQWxsLFxuICAgIGFueVBlbmRpbmcsXG4gICAgb25JZGxlLFxuICAgIGZsdXNoQW5kV2FpdCxcbiAgICB1bnJlZ2lzdGVyLFxuICB9O1xuXG4gIHdpbmRvdy5iYXRjaGVycy5wdXNoKGJhdGNoZXIpO1xuXG4gIHJldHVybiBiYXRjaGVyO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHFCQUFtQjtBQUVuQixtQkFBc0I7QUFDdEIsVUFBcUI7QUFDckIsYUFBd0I7QUFDeEIscUNBQXdDO0FBWXhDLE9BQU8sV0FBVyxDQUFDO0FBRW5CLE9BQU8scUJBQXFCLFlBQVk7QUFDdEMsTUFBSSxLQUFLLDRCQUE0QjtBQUNyQyxNQUFJO0FBQ0YsVUFBTSxRQUFRLElBQUksT0FBTyxTQUFTLElBQUksVUFBUSxLQUFLLGFBQWEsQ0FBQyxDQUFDO0FBQUEsRUFDcEUsU0FBUyxPQUFQO0FBQ0EsUUFBSSxNQUNGLDBDQUNBLE9BQU8sWUFBWSxLQUFLLENBQzFCO0FBQUEsRUFDRjtBQUNGO0FBa0JPLHVCQUNMLFNBQ3VCO0FBQ3ZCLE1BQUk7QUFDSixNQUFJO0FBQ0osTUFBSSxRQUF5QixDQUFDO0FBQzlCLFFBQU0sUUFBUSxJQUFJLHVCQUFPO0FBQUEsSUFDdkIsYUFBYTtBQUFBLElBQ2IsU0FBUyxNQUFPLEtBQUs7QUFBQSxJQUNyQixnQkFBZ0I7QUFBQSxFQUNsQixDQUFDO0FBRUQsMkJBQXlCO0FBQ3ZCLGdFQUF3QixPQUFPO0FBQy9CLGNBQVU7QUFFVixVQUFNLFdBQVc7QUFDakIsWUFBUSxDQUFDO0FBQ1QsVUFBTSxJQUFJLFlBQVk7QUFDcEIsWUFBTSxRQUFRLGFBQWEsUUFBUTtBQUFBLElBQ3JDLENBQUM7QUFBQSxFQUNIO0FBVFMsQUFXVCxlQUFhLE1BQWdCO0FBQzNCLFVBQU0sS0FBSyxJQUFJO0FBRWYsUUFBSSxNQUFNLFdBQVcsR0FBRztBQUd0QixnQkFBVSxXQUFXLGVBQWUsUUFBUSxJQUFJO0FBQUEsSUFDbEQsV0FBVyxNQUFNLFVBQVUsUUFBUSxTQUFTO0FBQzFDLG9CQUFjO0FBQUEsSUFDaEI7QUFBQSxFQUNGO0FBVlMsQUFZVCxxQkFBbUIsUUFBa0I7QUFDbkMsWUFBUSxNQUFNLE9BQU8sVUFBUSxTQUFTLE1BQU07QUFBQSxFQUM5QztBQUZTLEFBSVQsd0JBQStCO0FBQzdCLFdBQU8sTUFBTSxPQUFPLEtBQUssTUFBTSxVQUFVLEtBQUssTUFBTSxTQUFTO0FBQUEsRUFDL0Q7QUFGUyxBQUlULDBCQUF3QjtBQUN0QixXQUFPLFdBQVcsR0FBRztBQUNuQixVQUFJLE1BQU0sT0FBTyxLQUFLLE1BQU0sVUFBVSxHQUFHO0FBRXZDLGNBQU0sTUFBTSxPQUFPO0FBQUEsTUFDckI7QUFFQSxVQUFJLE1BQU0sU0FBUyxHQUFHO0FBRXBCLGNBQU0sd0JBQU0sUUFBUSxPQUFPLENBQUM7QUFBQSxNQUM5QjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBWmUsQUFjZix3QkFBc0I7QUFDcEIsV0FBTyxXQUFXLE9BQU8sU0FBUyxPQUFPLFVBQVEsU0FBUyxPQUFPO0FBQUEsRUFDbkU7QUFGUyxBQUlULGdDQUE4QjtBQUM1QixRQUFJLEtBQUssWUFBWSxRQUFRLDZCQUE2QixNQUFNLFFBQVE7QUFFeEUsV0FBTyxXQUFXLEdBQUc7QUFDbkIsb0JBQWM7QUFFZCxVQUFJLE1BQU0sT0FBTyxLQUFLLE1BQU0sVUFBVSxHQUFHO0FBRXZDLGNBQU0sTUFBTSxPQUFPO0FBQUEsTUFDckI7QUFBQSxJQUNGO0FBQ0EsUUFBSSxLQUFLLHFCQUFxQixRQUFRLGtCQUFrQjtBQUFBLEVBQzFEO0FBWmUsQUFjZixZQUFVO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUVBLFNBQU8sU0FBUyxLQUFLLE9BQU87QUFFNUIsU0FBTztBQUNUO0FBdkZnQiIsCiAgIm5hbWVzIjogW10KfQo=
