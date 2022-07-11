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
var retryPlaceholders_exports = {};
__export(retryPlaceholders_exports, {
  RetryPlaceholders: () => RetryPlaceholders,
  STORAGE_KEY: () => STORAGE_KEY,
  getDeltaIntoPast: () => getDeltaIntoPast,
  getItemId: () => getItemId
});
module.exports = __toCommonJS(retryPlaceholders_exports);
var import_zod = require("zod");
var import_lodash = require("lodash");
var log = __toESM(require("../logging/log"));
const retryItemSchema = import_zod.z.object({
  conversationId: import_zod.z.string(),
  sentAt: import_zod.z.number(),
  receivedAt: import_zod.z.number(),
  receivedAtCounter: import_zod.z.number(),
  senderUuid: import_zod.z.string(),
  wasOpened: import_zod.z.boolean().optional()
}).passthrough();
const retryItemListSchema = import_zod.z.array(retryItemSchema);
function getItemId(conversationId, sentAt) {
  return `${conversationId}--${sentAt}`;
}
const HOUR = 60 * 60 * 1e3;
const STORAGE_KEY = "retryPlaceholders";
function getDeltaIntoPast(delta) {
  return Date.now() - (delta || HOUR);
}
class RetryPlaceholders {
  constructor(options = {}) {
    if (!window.storage) {
      throw new Error("RetryPlaceholders.constructor: window.storage not available!");
    }
    const parsed = retryItemListSchema.safeParse(window.storage.get(STORAGE_KEY, new Array()));
    if (!parsed.success) {
      log.warn(`RetryPlaceholders.constructor: Data fetched from storage did not match schema: ${JSON.stringify(parsed.error.flatten())}`);
    }
    this.items = parsed.success ? parsed.data : [];
    this.sortByExpiresAtAsc();
    this.byConversation = this.makeByConversationLookup();
    this.byMessage = this.makeByMessageLookup();
    this.retryReceiptLifespan = options.retryReceiptLifespan || HOUR;
    log.info(`RetryPlaceholders.constructor: Started with ${this.items.length} items, lifespan of ${this.retryReceiptLifespan}`);
  }
  sortByExpiresAtAsc() {
    this.items.sort((left, right) => left.receivedAt - right.receivedAt);
  }
  makeByConversationLookup() {
    return (0, import_lodash.groupBy)(this.items, (item) => item.conversationId);
  }
  makeByMessageLookup() {
    const lookup = /* @__PURE__ */ new Map();
    this.items.forEach((item) => {
      lookup.set(getItemId(item.conversationId, item.sentAt), item);
    });
    return lookup;
  }
  makeLookups() {
    this.byConversation = this.makeByConversationLookup();
    this.byMessage = this.makeByMessageLookup();
  }
  async add(item) {
    const parsed = retryItemSchema.safeParse(item);
    if (!parsed.success) {
      throw new Error(`RetryPlaceholders.add: Item did not match schema ${JSON.stringify(parsed.error.flatten())}`);
    }
    this.items.push(item);
    this.sortByExpiresAtAsc();
    this.makeLookups();
    await this.save();
  }
  async save() {
    await window.storage.put(STORAGE_KEY, this.items);
  }
  getCount() {
    return this.items.length;
  }
  getNextToExpire() {
    return this.items[0];
  }
  async getExpiredAndRemove() {
    const expiration = getDeltaIntoPast(this.retryReceiptLifespan);
    const max = this.items.length;
    const result = [];
    for (let i = 0; i < max; i += 1) {
      const item = this.items[i];
      if (item.receivedAt <= expiration) {
        result.push(item);
      } else {
        break;
      }
    }
    log.info(`RetryPlaceholders.getExpiredAndRemove: Found ${result.length} expired items`);
    this.items.splice(0, result.length);
    this.makeLookups();
    await this.save();
    return result;
  }
  async findByConversationAndMarkOpened(conversationId) {
    let changed = 0;
    const items = this.byConversation[conversationId];
    (items || []).forEach((item) => {
      if (!item.wasOpened) {
        changed += 1;
        item.wasOpened = true;
      }
    });
    if (changed > 0) {
      log.info(`RetryPlaceholders.findByConversationAndMarkOpened: Updated ${changed} items for conversation ${conversationId}`);
      await this.save();
    }
  }
  async findByMessageAndRemove(conversationId, sentAt) {
    const result = this.byMessage.get(getItemId(conversationId, sentAt));
    if (!result) {
      return void 0;
    }
    const index = this.items.findIndex((item) => item === result);
    this.items.splice(index, 1);
    this.makeLookups();
    await this.save();
    return result;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RetryPlaceholders,
  STORAGE_KEY,
  getDeltaIntoPast,
  getItemId
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmV0cnlQbGFjZWhvbGRlcnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgeiB9IGZyb20gJ3pvZCc7XG5pbXBvcnQgeyBncm91cEJ5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5cbmNvbnN0IHJldHJ5SXRlbVNjaGVtYSA9IHpcbiAgLm9iamVjdCh7XG4gICAgY29udmVyc2F0aW9uSWQ6IHouc3RyaW5nKCksXG4gICAgc2VudEF0OiB6Lm51bWJlcigpLFxuICAgIHJlY2VpdmVkQXQ6IHoubnVtYmVyKCksXG4gICAgcmVjZWl2ZWRBdENvdW50ZXI6IHoubnVtYmVyKCksXG4gICAgc2VuZGVyVXVpZDogei5zdHJpbmcoKSxcbiAgICB3YXNPcGVuZWQ6IHouYm9vbGVhbigpLm9wdGlvbmFsKCksXG4gIH0pXG4gIC5wYXNzdGhyb3VnaCgpO1xuZXhwb3J0IHR5cGUgUmV0cnlJdGVtVHlwZSA9IHouaW5mZXI8dHlwZW9mIHJldHJ5SXRlbVNjaGVtYT47XG5cbmNvbnN0IHJldHJ5SXRlbUxpc3RTY2hlbWEgPSB6LmFycmF5KHJldHJ5SXRlbVNjaGVtYSk7XG5leHBvcnQgdHlwZSBSZXRyeUl0ZW1MaXN0VHlwZSA9IHouaW5mZXI8dHlwZW9mIHJldHJ5SXRlbUxpc3RTY2hlbWE+O1xuXG5leHBvcnQgdHlwZSBCeUNvbnZlcnNhdGlvbkxvb2t1cFR5cGUgPSB7XG4gIFtrZXk6IHN0cmluZ106IEFycmF5PFJldHJ5SXRlbVR5cGU+O1xufTtcbmV4cG9ydCB0eXBlIEJ5TWVzc2FnZUxvb2t1cFR5cGUgPSBNYXA8c3RyaW5nLCBSZXRyeUl0ZW1UeXBlPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEl0ZW1JZChjb252ZXJzYXRpb25JZDogc3RyaW5nLCBzZW50QXQ6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBgJHtjb252ZXJzYXRpb25JZH0tLSR7c2VudEF0fWA7XG59XG5cbmNvbnN0IEhPVVIgPSA2MCAqIDYwICogMTAwMDtcbmV4cG9ydCBjb25zdCBTVE9SQUdFX0tFWSA9ICdyZXRyeVBsYWNlaG9sZGVycyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWx0YUludG9QYXN0KGRlbHRhPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIERhdGUubm93KCkgLSAoZGVsdGEgfHwgSE9VUik7XG59XG5cbmV4cG9ydCBjbGFzcyBSZXRyeVBsYWNlaG9sZGVycyB7XG4gIHByaXZhdGUgaXRlbXM6IEFycmF5PFJldHJ5SXRlbVR5cGU+O1xuXG4gIHByaXZhdGUgYnlDb252ZXJzYXRpb246IEJ5Q29udmVyc2F0aW9uTG9va3VwVHlwZTtcblxuICBwcml2YXRlIGJ5TWVzc2FnZTogQnlNZXNzYWdlTG9va3VwVHlwZTtcblxuICBwcml2YXRlIHJldHJ5UmVjZWlwdExpZmVzcGFuOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogeyByZXRyeVJlY2VpcHRMaWZlc3Bhbj86IG51bWJlciB9ID0ge30pIHtcbiAgICBpZiAoIXdpbmRvdy5zdG9yYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdSZXRyeVBsYWNlaG9sZGVycy5jb25zdHJ1Y3Rvcjogd2luZG93LnN0b3JhZ2Ugbm90IGF2YWlsYWJsZSEnXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcnNlZCA9IHJldHJ5SXRlbUxpc3RTY2hlbWEuc2FmZVBhcnNlKFxuICAgICAgd2luZG93LnN0b3JhZ2UuZ2V0KFNUT1JBR0VfS0VZLCBuZXcgQXJyYXk8UmV0cnlJdGVtVHlwZT4oKSlcbiAgICApO1xuICAgIGlmICghcGFyc2VkLnN1Y2Nlc3MpIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgUmV0cnlQbGFjZWhvbGRlcnMuY29uc3RydWN0b3I6IERhdGEgZmV0Y2hlZCBmcm9tIHN0b3JhZ2UgZGlkIG5vdCBtYXRjaCBzY2hlbWE6ICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgcGFyc2VkLmVycm9yLmZsYXR0ZW4oKVxuICAgICAgICApfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5pdGVtcyA9IHBhcnNlZC5zdWNjZXNzID8gcGFyc2VkLmRhdGEgOiBbXTtcbiAgICB0aGlzLnNvcnRCeUV4cGlyZXNBdEFzYygpO1xuICAgIHRoaXMuYnlDb252ZXJzYXRpb24gPSB0aGlzLm1ha2VCeUNvbnZlcnNhdGlvbkxvb2t1cCgpO1xuICAgIHRoaXMuYnlNZXNzYWdlID0gdGhpcy5tYWtlQnlNZXNzYWdlTG9va3VwKCk7XG4gICAgdGhpcy5yZXRyeVJlY2VpcHRMaWZlc3BhbiA9IG9wdGlvbnMucmV0cnlSZWNlaXB0TGlmZXNwYW4gfHwgSE9VUjtcblxuICAgIGxvZy5pbmZvKFxuICAgICAgYFJldHJ5UGxhY2Vob2xkZXJzLmNvbnN0cnVjdG9yOiBTdGFydGVkIHdpdGggJHt0aGlzLml0ZW1zLmxlbmd0aH0gaXRlbXMsIGxpZmVzcGFuIG9mICR7dGhpcy5yZXRyeVJlY2VpcHRMaWZlc3Bhbn1gXG4gICAgKTtcbiAgfVxuXG4gIC8vIEFycmFuZ2luZyBsb2NhbCBkYXRhIGZvciBlZmZpY2llbmN5XG5cbiAgc29ydEJ5RXhwaXJlc0F0QXNjKCk6IHZvaWQge1xuICAgIHRoaXMuaXRlbXMuc29ydChcbiAgICAgIChsZWZ0OiBSZXRyeUl0ZW1UeXBlLCByaWdodDogUmV0cnlJdGVtVHlwZSkgPT5cbiAgICAgICAgbGVmdC5yZWNlaXZlZEF0IC0gcmlnaHQucmVjZWl2ZWRBdFxuICAgICk7XG4gIH1cblxuICBtYWtlQnlDb252ZXJzYXRpb25Mb29rdXAoKTogQnlDb252ZXJzYXRpb25Mb29rdXBUeXBlIHtcbiAgICByZXR1cm4gZ3JvdXBCeSh0aGlzLml0ZW1zLCBpdGVtID0+IGl0ZW0uY29udmVyc2F0aW9uSWQpO1xuICB9XG5cbiAgbWFrZUJ5TWVzc2FnZUxvb2t1cCgpOiBCeU1lc3NhZ2VMb29rdXBUeXBlIHtcbiAgICBjb25zdCBsb29rdXAgPSBuZXcgTWFwPHN0cmluZywgUmV0cnlJdGVtVHlwZT4oKTtcbiAgICB0aGlzLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBsb29rdXAuc2V0KGdldEl0ZW1JZChpdGVtLmNvbnZlcnNhdGlvbklkLCBpdGVtLnNlbnRBdCksIGl0ZW0pO1xuICAgIH0pO1xuICAgIHJldHVybiBsb29rdXA7XG4gIH1cblxuICBtYWtlTG9va3VwcygpOiB2b2lkIHtcbiAgICB0aGlzLmJ5Q29udmVyc2F0aW9uID0gdGhpcy5tYWtlQnlDb252ZXJzYXRpb25Mb29rdXAoKTtcbiAgICB0aGlzLmJ5TWVzc2FnZSA9IHRoaXMubWFrZUJ5TWVzc2FnZUxvb2t1cCgpO1xuICB9XG5cbiAgLy8gQmFzaWMgZGF0YSBtYW5hZ2VtZW50XG5cbiAgYXN5bmMgYWRkKGl0ZW06IFJldHJ5SXRlbVR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwYXJzZWQgPSByZXRyeUl0ZW1TY2hlbWEuc2FmZVBhcnNlKGl0ZW0pO1xuICAgIGlmICghcGFyc2VkLnN1Y2Nlc3MpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFJldHJ5UGxhY2Vob2xkZXJzLmFkZDogSXRlbSBkaWQgbm90IG1hdGNoIHNjaGVtYSAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgIHBhcnNlZC5lcnJvci5mbGF0dGVuKClcbiAgICAgICAgKX1gXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgICB0aGlzLnNvcnRCeUV4cGlyZXNBdEFzYygpO1xuICAgIHRoaXMubWFrZUxvb2t1cHMoKTtcbiAgICBhd2FpdCB0aGlzLnNhdmUoKTtcbiAgfVxuXG4gIGFzeW5jIHNhdmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgd2luZG93LnN0b3JhZ2UucHV0KFNUT1JBR0VfS0VZLCB0aGlzLml0ZW1zKTtcbiAgfVxuXG4gIC8vIEZpbmRpbmcgaXRlbXMgaW4gZGlmZmVyZW50IHdheXNcblxuICBnZXRDb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLml0ZW1zLmxlbmd0aDtcbiAgfVxuXG4gIGdldE5leHRUb0V4cGlyZSgpOiBSZXRyeUl0ZW1UeXBlIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtc1swXTtcbiAgfVxuXG4gIGFzeW5jIGdldEV4cGlyZWRBbmRSZW1vdmUoKTogUHJvbWlzZTxBcnJheTxSZXRyeUl0ZW1UeXBlPj4ge1xuICAgIGNvbnN0IGV4cGlyYXRpb24gPSBnZXREZWx0YUludG9QYXN0KHRoaXMucmV0cnlSZWNlaXB0TGlmZXNwYW4pO1xuICAgIGNvbnN0IG1heCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgIGNvbnN0IHJlc3VsdDogQXJyYXk8UmV0cnlJdGVtVHlwZT4gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4OyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zW2ldO1xuICAgICAgaWYgKGl0ZW0ucmVjZWl2ZWRBdCA8PSBleHBpcmF0aW9uKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbG9nLmluZm8oXG4gICAgICBgUmV0cnlQbGFjZWhvbGRlcnMuZ2V0RXhwaXJlZEFuZFJlbW92ZTogRm91bmQgJHtyZXN1bHQubGVuZ3RofSBleHBpcmVkIGl0ZW1zYFxuICAgICk7XG5cbiAgICB0aGlzLml0ZW1zLnNwbGljZSgwLCByZXN1bHQubGVuZ3RoKTtcbiAgICB0aGlzLm1ha2VMb29rdXBzKCk7XG4gICAgYXdhaXQgdGhpcy5zYXZlKCk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgYXN5bmMgZmluZEJ5Q29udmVyc2F0aW9uQW5kTWFya09wZW5lZChjb252ZXJzYXRpb25JZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IGNoYW5nZWQgPSAwO1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5ieUNvbnZlcnNhdGlvbltjb252ZXJzYXRpb25JZF07XG4gICAgKGl0ZW1zIHx8IFtdKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKCFpdGVtLndhc09wZW5lZCkge1xuICAgICAgICBjaGFuZ2VkICs9IDE7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBpdGVtLndhc09wZW5lZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoY2hhbmdlZCA+IDApIHtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICBgUmV0cnlQbGFjZWhvbGRlcnMuZmluZEJ5Q29udmVyc2F0aW9uQW5kTWFya09wZW5lZDogVXBkYXRlZCAke2NoYW5nZWR9IGl0ZW1zIGZvciBjb252ZXJzYXRpb24gJHtjb252ZXJzYXRpb25JZH1gXG4gICAgICApO1xuXG4gICAgICBhd2FpdCB0aGlzLnNhdmUoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBmaW5kQnlNZXNzYWdlQW5kUmVtb3ZlKFxuICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gICAgc2VudEF0OiBudW1iZXJcbiAgKTogUHJvbWlzZTxSZXRyeUl0ZW1UeXBlIHwgdW5kZWZpbmVkPiB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5ieU1lc3NhZ2UuZ2V0KGdldEl0ZW1JZChjb252ZXJzYXRpb25JZCwgc2VudEF0KSk7XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLml0ZW1zLmZpbmRJbmRleChpdGVtID0+IGl0ZW0gPT09IHJlc3VsdCk7XG5cbiAgICB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5tYWtlTG9va3VwcygpO1xuICAgIGF3YWl0IHRoaXMuc2F2ZSgpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGlCQUFrQjtBQUNsQixvQkFBd0I7QUFDeEIsVUFBcUI7QUFFckIsTUFBTSxrQkFBa0IsYUFDckIsT0FBTztBQUFBLEVBQ04sZ0JBQWdCLGFBQUUsT0FBTztBQUFBLEVBQ3pCLFFBQVEsYUFBRSxPQUFPO0FBQUEsRUFDakIsWUFBWSxhQUFFLE9BQU87QUFBQSxFQUNyQixtQkFBbUIsYUFBRSxPQUFPO0FBQUEsRUFDNUIsWUFBWSxhQUFFLE9BQU87QUFBQSxFQUNyQixXQUFXLGFBQUUsUUFBUSxFQUFFLFNBQVM7QUFDbEMsQ0FBQyxFQUNBLFlBQVk7QUFHZixNQUFNLHNCQUFzQixhQUFFLE1BQU0sZUFBZTtBQVE1QyxtQkFBbUIsZ0JBQXdCLFFBQXdCO0FBQ3hFLFNBQU8sR0FBRyxtQkFBbUI7QUFDL0I7QUFGZ0IsQUFJaEIsTUFBTSxPQUFPLEtBQUssS0FBSztBQUNoQixNQUFNLGNBQWM7QUFFcEIsMEJBQTBCLE9BQXdCO0FBQ3ZELFNBQU8sS0FBSyxJQUFJLElBQUssVUFBUztBQUNoQztBQUZnQixBQUlULE1BQU0sa0JBQWtCO0FBQUEsRUFTN0IsWUFBWSxVQUE2QyxDQUFDLEdBQUc7QUFDM0QsUUFBSSxDQUFDLE9BQU8sU0FBUztBQUNuQixZQUFNLElBQUksTUFDUiw4REFDRjtBQUFBLElBQ0Y7QUFFQSxVQUFNLFNBQVMsb0JBQW9CLFVBQ2pDLE9BQU8sUUFBUSxJQUFJLGFBQWEsSUFBSSxNQUFxQixDQUFDLENBQzVEO0FBQ0EsUUFBSSxDQUFDLE9BQU8sU0FBUztBQUNuQixVQUFJLEtBQ0Ysa0ZBQWtGLEtBQUssVUFDckYsT0FBTyxNQUFNLFFBQVEsQ0FDdkIsR0FDRjtBQUFBLElBQ0Y7QUFFQSxTQUFLLFFBQVEsT0FBTyxV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
