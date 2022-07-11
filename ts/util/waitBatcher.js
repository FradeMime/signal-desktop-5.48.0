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
var waitBatcher_exports = {};
__export(waitBatcher_exports, {
  createWaitBatcher: () => createWaitBatcher
});
module.exports = __toCommonJS(waitBatcher_exports);
var import_p_queue = __toESM(require("p-queue"));
var import_sleep = require("./sleep");
var log = __toESM(require("../logging/log"));
var Errors = __toESM(require("../types/errors"));
var import_clearTimeoutIfNecessary = require("./clearTimeoutIfNecessary");
window.waitBatchers = [];
window.flushAllWaitBatchers = async () => {
  log.info("waitBatcher#flushAllWaitBatchers");
  try {
    await Promise.all(window.waitBatchers.map((item) => item.flushAndWait()));
  } catch (error) {
    log.error("flushAllWaitBatchers: Error flushing all", Errors.toLogFormat(error));
  }
};
window.waitForAllWaitBatchers = async () => {
  log.info("waitBatcher#waitForAllWaitBatchers");
  try {
    await Promise.all(window.waitBatchers.map((item) => item.onIdle()));
  } catch (error) {
    log.error("waitForAllWaitBatchers: Error waiting for all", Errors.toLogFormat(error));
  }
};
function createWaitBatcher(options) {
  let waitBatcher;
  let timeout;
  let items = [];
  const queue = new import_p_queue.default({
    concurrency: 1,
    timeout: 1e3 * 60 * 2,
    throwOnTimeout: true
  });
  async function _kickBatchOff() {
    const itemsRef = items;
    items = [];
    await queue.add(async () => {
      try {
        await options.processBatch(itemsRef.map((item) => item.item));
        itemsRef.forEach((item) => {
          if (item.resolve) {
            item.resolve();
          }
        });
      } catch (error) {
        itemsRef.forEach((item) => {
          if (item.reject) {
            item.reject(error);
          }
        });
      }
    });
  }
  function _makeExplodedPromise() {
    let resolve;
    let reject;
    const promise = new Promise((resolveParam, rejectParam) => {
      resolve = resolveParam;
      reject = rejectParam;
    });
    return { promise, resolve, reject };
  }
  async function add(item) {
    const { promise, resolve, reject } = _makeExplodedPromise();
    items.push({
      resolve,
      reject,
      item
    });
    if (items.length === 1) {
      timeout = setTimeout(() => {
        timeout = null;
        _kickBatchOff();
      }, options.wait);
    }
    if (items.length >= options.maxSize) {
      (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(timeout);
      timeout = null;
      _kickBatchOff();
    }
    await promise;
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
    window.waitBatchers = window.waitBatchers.filter((item) => item !== waitBatcher);
  }
  async function flushAndWait() {
    log.info(`Flushing start ${options.name} for waitBatcher items.length=${items.length}`);
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(timeout);
    timeout = null;
    while (anyPending()) {
      await _kickBatchOff();
      if (queue.size > 0 || queue.pending > 0) {
        await queue.onIdle();
      }
    }
    log.info(`Flushing complete ${options.name} for waitBatcher`);
  }
  waitBatcher = {
    add,
    anyPending,
    onIdle,
    unregister,
    flushAndWait
  };
  window.waitBatchers.push(waitBatcher);
  return waitBatcher;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createWaitBatcher
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid2FpdEJhdGNoZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUFF1ZXVlIGZyb20gJ3AtcXVldWUnO1xuXG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJy4vc2xlZXAnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tICcuLi90eXBlcy9lcnJvcnMnO1xuaW1wb3J0IHsgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkgfSBmcm9tICcuL2NsZWFyVGltZW91dElmTmVjZXNzYXJ5JztcblxuZGVjbGFyZSBnbG9iYWwge1xuICAvLyBXZSB3YW50IHRvIGV4dGVuZCBgd2luZG93YCdzIHByb3BlcnRpZXMsIHNvIHdlIG5lZWQgYW4gaW50ZXJmYWNlLlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICB3YWl0QmF0Y2hlcnM6IEFycmF5PEJhdGNoZXJUeXBlPGFueT4+O1xuICAgIHdhaXRGb3JBbGxXYWl0QmF0Y2hlcnM6ICgpID0+IFByb21pc2U8dW5rbm93bj47XG4gICAgZmx1c2hBbGxXYWl0QmF0Y2hlcnM6ICgpID0+IFByb21pc2U8dW5rbm93bj47XG4gIH1cbn1cblxud2luZG93LndhaXRCYXRjaGVycyA9IFtdO1xuXG53aW5kb3cuZmx1c2hBbGxXYWl0QmF0Y2hlcnMgPSBhc3luYyAoKSA9PiB7XG4gIGxvZy5pbmZvKCd3YWl0QmF0Y2hlciNmbHVzaEFsbFdhaXRCYXRjaGVycycpO1xuICB0cnkge1xuICAgIGF3YWl0IFByb21pc2UuYWxsKHdpbmRvdy53YWl0QmF0Y2hlcnMubWFwKGl0ZW0gPT4gaXRlbS5mbHVzaEFuZFdhaXQoKSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZy5lcnJvcihcbiAgICAgICdmbHVzaEFsbFdhaXRCYXRjaGVyczogRXJyb3IgZmx1c2hpbmcgYWxsJyxcbiAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICApO1xuICB9XG59O1xuXG53aW5kb3cud2FpdEZvckFsbFdhaXRCYXRjaGVycyA9IGFzeW5jICgpID0+IHtcbiAgbG9nLmluZm8oJ3dhaXRCYXRjaGVyI3dhaXRGb3JBbGxXYWl0QmF0Y2hlcnMnKTtcbiAgdHJ5IHtcbiAgICBhd2FpdCBQcm9taXNlLmFsbCh3aW5kb3cud2FpdEJhdGNoZXJzLm1hcChpdGVtID0+IGl0ZW0ub25JZGxlKCkpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2cuZXJyb3IoXG4gICAgICAnd2FpdEZvckFsbFdhaXRCYXRjaGVyczogRXJyb3Igd2FpdGluZyBmb3IgYWxsJyxcbiAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICApO1xuICB9XG59O1xuXG50eXBlIEl0ZW1Ib2xkZXJUeXBlPEl0ZW1UeXBlPiA9IHtcbiAgcmVzb2x2ZT86ICh2YWx1ZT86IHVua25vd24pID0+IHZvaWQ7XG4gIHJlamVjdD86IChlcnJvcjogRXJyb3IpID0+IHZvaWQ7XG4gIGl0ZW06IEl0ZW1UeXBlO1xufTtcblxudHlwZSBFeHBsb2RlZFByb21pc2VUeXBlID0ge1xuICByZXNvbHZlPzogKHZhbHVlPzogdW5rbm93bikgPT4gdm9pZDtcbiAgcmVqZWN0PzogKGVycm9yOiBFcnJvcikgPT4gdm9pZDtcbiAgcHJvbWlzZTogUHJvbWlzZTx1bmtub3duPjtcbn07XG5cbnR5cGUgQmF0Y2hlck9wdGlvbnNUeXBlPEl0ZW1UeXBlPiA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICB3YWl0OiBudW1iZXI7XG4gIG1heFNpemU6IG51bWJlcjtcbiAgcHJvY2Vzc0JhdGNoOiAoaXRlbXM6IEFycmF5PEl0ZW1UeXBlPikgPT4gUHJvbWlzZTx2b2lkPjtcbn07XG5cbnR5cGUgQmF0Y2hlclR5cGU8SXRlbVR5cGU+ID0ge1xuICBhZGQ6IChpdGVtOiBJdGVtVHlwZSkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgYW55UGVuZGluZzogKCkgPT4gYm9vbGVhbjtcbiAgb25JZGxlOiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuICB1bnJlZ2lzdGVyOiAoKSA9PiB2b2lkO1xuICBmbHVzaEFuZFdhaXQ6ICgpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV2FpdEJhdGNoZXI8SXRlbVR5cGU+KFxuICBvcHRpb25zOiBCYXRjaGVyT3B0aW9uc1R5cGU8SXRlbVR5cGU+XG4pOiBCYXRjaGVyVHlwZTxJdGVtVHlwZT4ge1xuICBsZXQgd2FpdEJhdGNoZXI6IEJhdGNoZXJUeXBlPEl0ZW1UeXBlPjtcbiAgbGV0IHRpbWVvdXQ6IE5vZGVKUy5UaW1lb3V0IHwgbnVsbDtcbiAgbGV0IGl0ZW1zOiBBcnJheTxJdGVtSG9sZGVyVHlwZTxJdGVtVHlwZT4+ID0gW107XG4gIGNvbnN0IHF1ZXVlID0gbmV3IFBRdWV1ZSh7XG4gICAgY29uY3VycmVuY3k6IDEsXG4gICAgdGltZW91dDogMTAwMCAqIDYwICogMixcbiAgICB0aHJvd09uVGltZW91dDogdHJ1ZSxcbiAgfSk7XG5cbiAgYXN5bmMgZnVuY3Rpb24gX2tpY2tCYXRjaE9mZigpIHtcbiAgICBjb25zdCBpdGVtc1JlZiA9IGl0ZW1zO1xuICAgIGl0ZW1zID0gW107XG4gICAgYXdhaXQgcXVldWUuYWRkKGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IG9wdGlvbnMucHJvY2Vzc0JhdGNoKGl0ZW1zUmVmLm1hcChpdGVtID0+IGl0ZW0uaXRlbSkpO1xuICAgICAgICBpdGVtc1JlZi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGlmIChpdGVtLnJlc29sdmUpIHtcbiAgICAgICAgICAgIGl0ZW0ucmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpdGVtc1JlZi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGlmIChpdGVtLnJlamVjdCkge1xuICAgICAgICAgICAgaXRlbS5yZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBfbWFrZUV4cGxvZGVkUHJvbWlzZSgpOiBFeHBsb2RlZFByb21pc2VUeXBlIHtcbiAgICBsZXQgcmVzb2x2ZTtcbiAgICBsZXQgcmVqZWN0O1xuXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlUGFyYW0sIHJlamVjdFBhcmFtKSA9PiB7XG4gICAgICByZXNvbHZlID0gcmVzb2x2ZVBhcmFtO1xuICAgICAgcmVqZWN0ID0gcmVqZWN0UGFyYW07XG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBwcm9taXNlLCByZXNvbHZlLCByZWplY3QgfTtcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGFkZChpdGVtOiBJdGVtVHlwZSkge1xuICAgIGNvbnN0IHsgcHJvbWlzZSwgcmVzb2x2ZSwgcmVqZWN0IH0gPSBfbWFrZUV4cGxvZGVkUHJvbWlzZSgpO1xuXG4gICAgaXRlbXMucHVzaCh7XG4gICAgICByZXNvbHZlLFxuICAgICAgcmVqZWN0LFxuICAgICAgaXRlbSxcbiAgICB9KTtcblxuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIC8vIFNldCB0aW1lb3V0IG9uY2Ugd2hlbiB3ZSBqdXN0IHB1c2hlZCB0aGUgZmlyc3QgaXRlbSBzbyB0aGF0IHRoZSB3YWl0XG4gICAgICAvLyB0aW1lIGlzIGJvdW5kZWQgYnkgYG9wdGlvbnMud2FpdGAgYW5kIG5vdCBleHRlbmRlZCBieSBmdXJ0aGVyIHB1c2hlcy5cbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIF9raWNrQmF0Y2hPZmYoKTtcbiAgICAgIH0sIG9wdGlvbnMud2FpdCk7XG4gICAgfVxuICAgIGlmIChpdGVtcy5sZW5ndGggPj0gb3B0aW9ucy5tYXhTaXplKSB7XG4gICAgICBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSh0aW1lb3V0KTtcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xuXG4gICAgICBfa2lja0JhdGNoT2ZmKCk7XG4gICAgfVxuXG4gICAgYXdhaXQgcHJvbWlzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFueVBlbmRpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHF1ZXVlLnNpemUgPiAwIHx8IHF1ZXVlLnBlbmRpbmcgPiAwIHx8IGl0ZW1zLmxlbmd0aCA+IDA7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBvbklkbGUoKSB7XG4gICAgd2hpbGUgKGFueVBlbmRpbmcoKSkge1xuICAgICAgaWYgKHF1ZXVlLnNpemUgPiAwIHx8IHF1ZXVlLnBlbmRpbmcgPiAwKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICAgIGF3YWl0IHF1ZXVlLm9uSWRsZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgICBhd2FpdCBzbGVlcChvcHRpb25zLndhaXQgKiAyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1bnJlZ2lzdGVyKCkge1xuICAgIHdpbmRvdy53YWl0QmF0Y2hlcnMgPSB3aW5kb3cud2FpdEJhdGNoZXJzLmZpbHRlcihcbiAgICAgIGl0ZW0gPT4gaXRlbSAhPT0gd2FpdEJhdGNoZXJcbiAgICApO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gZmx1c2hBbmRXYWl0KCkge1xuICAgIGxvZy5pbmZvKFxuICAgICAgYEZsdXNoaW5nIHN0YXJ0ICR7b3B0aW9ucy5uYW1lfSBmb3Igd2FpdEJhdGNoZXIgYCArXG4gICAgICAgIGBpdGVtcy5sZW5ndGg9JHtpdGVtcy5sZW5ndGh9YFxuICAgICk7XG4gICAgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkodGltZW91dCk7XG4gICAgdGltZW91dCA9IG51bGw7XG5cbiAgICB3aGlsZSAoYW55UGVuZGluZygpKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgYXdhaXQgX2tpY2tCYXRjaE9mZigpO1xuXG4gICAgICBpZiAocXVldWUuc2l6ZSA+IDAgfHwgcXVldWUucGVuZGluZyA+IDApIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgICAgYXdhaXQgcXVldWUub25JZGxlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbG9nLmluZm8oYEZsdXNoaW5nIGNvbXBsZXRlICR7b3B0aW9ucy5uYW1lfSBmb3Igd2FpdEJhdGNoZXJgKTtcbiAgfVxuXG4gIHdhaXRCYXRjaGVyID0ge1xuICAgIGFkZCxcbiAgICBhbnlQZW5kaW5nLFxuICAgIG9uSWRsZSxcbiAgICB1bnJlZ2lzdGVyLFxuICAgIGZsdXNoQW5kV2FpdCxcbiAgfTtcblxuICB3aW5kb3cud2FpdEJhdGNoZXJzLnB1c2god2FpdEJhdGNoZXIpO1xuXG4gIHJldHVybiB3YWl0QmF0Y2hlcjtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxxQkFBbUI7QUFFbkIsbUJBQXNCO0FBQ3RCLFVBQXFCO0FBQ3JCLGFBQXdCO0FBQ3hCLHFDQUF3QztBQWF4QyxPQUFPLGVBQWUsQ0FBQztBQUV2QixPQUFPLHVCQUF1QixZQUFZO0FBQ3hDLE1BQUks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
