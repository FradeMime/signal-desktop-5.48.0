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
var Blocked_exports = {};
__export(Blocked_exports, {
  Blocked: () => Blocked
});
module.exports = __toCommonJS(Blocked_exports);
var import_lodash = require("lodash");
var log = __toESM(require("../../logging/log"));
const BLOCKED_NUMBERS_ID = "blocked";
const BLOCKED_UUIDS_ID = "blocked-uuids";
const BLOCKED_GROUPS_ID = "blocked-groups";
class Blocked {
  constructor(storage) {
    this.storage = storage;
  }
  getBlockedNumbers() {
    return this.storage.get(BLOCKED_NUMBERS_ID, new Array());
  }
  isBlocked(number) {
    return this.getBlockedNumbers().includes(number);
  }
  async addBlockedNumber(number) {
    const numbers = this.getBlockedNumbers();
    if (numbers.includes(number)) {
      return;
    }
    log.info("adding", number, "to blocked list");
    await this.storage.put(BLOCKED_NUMBERS_ID, numbers.concat(number));
  }
  async removeBlockedNumber(number) {
    const numbers = this.getBlockedNumbers();
    if (!numbers.includes(number)) {
      return;
    }
    log.info("removing", number, "from blocked list");
    await this.storage.put(BLOCKED_NUMBERS_ID, (0, import_lodash.without)(numbers, number));
  }
  getBlockedUuids() {
    return this.storage.get(BLOCKED_UUIDS_ID, new Array());
  }
  isUuidBlocked(uuid) {
    return this.getBlockedUuids().includes(uuid);
  }
  async addBlockedUuid(uuid) {
    const uuids = this.getBlockedUuids();
    if (uuids.includes(uuid)) {
      return;
    }
    log.info("adding", uuid, "to blocked list");
    await this.storage.put(BLOCKED_UUIDS_ID, uuids.concat(uuid));
  }
  async removeBlockedUuid(uuid) {
    const numbers = this.getBlockedUuids();
    if (!numbers.includes(uuid)) {
      return;
    }
    log.info("removing", uuid, "from blocked list");
    await this.storage.put(BLOCKED_UUIDS_ID, (0, import_lodash.without)(numbers, uuid));
  }
  getBlockedGroups() {
    return this.storage.get(BLOCKED_GROUPS_ID, new Array());
  }
  isGroupBlocked(groupId) {
    return this.getBlockedGroups().includes(groupId);
  }
  async addBlockedGroup(groupId) {
    const groupIds = this.getBlockedGroups();
    if (groupIds.includes(groupId)) {
      return;
    }
    log.info(`adding group(${groupId}) to blocked list`);
    await this.storage.put(BLOCKED_GROUPS_ID, groupIds.concat(groupId));
  }
  async removeBlockedGroup(groupId) {
    const groupIds = this.getBlockedGroups();
    if (!groupIds.includes(groupId)) {
      return;
    }
    log.info(`removing group(${groupId} from blocked list`);
    await this.storage.put(BLOCKED_GROUPS_ID, (0, import_lodash.without)(groupIds, groupId));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Blocked
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQmxvY2tlZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTYtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IHdpdGhvdXQgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgdHlwZSB7IFN0b3JhZ2VJbnRlcmZhY2UgfSBmcm9tICcuLi8uLi90eXBlcy9TdG9yYWdlLmQnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uLy4uL2xvZ2dpbmcvbG9nJztcblxuY29uc3QgQkxPQ0tFRF9OVU1CRVJTX0lEID0gJ2Jsb2NrZWQnO1xuY29uc3QgQkxPQ0tFRF9VVUlEU19JRCA9ICdibG9ja2VkLXV1aWRzJztcbmNvbnN0IEJMT0NLRURfR1JPVVBTX0lEID0gJ2Jsb2NrZWQtZ3JvdXBzJztcblxuZXhwb3J0IGNsYXNzIEJsb2NrZWQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHN0b3JhZ2U6IFN0b3JhZ2VJbnRlcmZhY2UpIHt9XG5cbiAgcHVibGljIGdldEJsb2NrZWROdW1iZXJzKCk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0KEJMT0NLRURfTlVNQkVSU19JRCwgbmV3IEFycmF5PHN0cmluZz4oKSk7XG4gIH1cblxuICBwdWJsaWMgaXNCbG9ja2VkKG51bWJlcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QmxvY2tlZE51bWJlcnMoKS5pbmNsdWRlcyhudW1iZXIpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGFkZEJsb2NrZWROdW1iZXIobnVtYmVyOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBudW1iZXJzID0gdGhpcy5nZXRCbG9ja2VkTnVtYmVycygpO1xuICAgIGlmIChudW1iZXJzLmluY2x1ZGVzKG51bWJlcikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsb2cuaW5mbygnYWRkaW5nJywgbnVtYmVyLCAndG8gYmxvY2tlZCBsaXN0Jyk7XG4gICAgYXdhaXQgdGhpcy5zdG9yYWdlLnB1dChCTE9DS0VEX05VTUJFUlNfSUQsIG51bWJlcnMuY29uY2F0KG51bWJlcikpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlbW92ZUJsb2NrZWROdW1iZXIobnVtYmVyOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBudW1iZXJzID0gdGhpcy5nZXRCbG9ja2VkTnVtYmVycygpO1xuICAgIGlmICghbnVtYmVycy5pbmNsdWRlcyhudW1iZXIpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9nLmluZm8oJ3JlbW92aW5nJywgbnVtYmVyLCAnZnJvbSBibG9ja2VkIGxpc3QnKTtcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2UucHV0KEJMT0NLRURfTlVNQkVSU19JRCwgd2l0aG91dChudW1iZXJzLCBudW1iZXIpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRCbG9ja2VkVXVpZHMoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQoQkxPQ0tFRF9VVUlEU19JRCwgbmV3IEFycmF5PHN0cmluZz4oKSk7XG4gIH1cblxuICBwdWJsaWMgaXNVdWlkQmxvY2tlZCh1dWlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRCbG9ja2VkVXVpZHMoKS5pbmNsdWRlcyh1dWlkKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBhZGRCbG9ja2VkVXVpZCh1dWlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB1dWlkcyA9IHRoaXMuZ2V0QmxvY2tlZFV1aWRzKCk7XG4gICAgaWYgKHV1aWRzLmluY2x1ZGVzKHV1aWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9nLmluZm8oJ2FkZGluZycsIHV1aWQsICd0byBibG9ja2VkIGxpc3QnKTtcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2UucHV0KEJMT0NLRURfVVVJRFNfSUQsIHV1aWRzLmNvbmNhdCh1dWlkKSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVtb3ZlQmxvY2tlZFV1aWQodXVpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgbnVtYmVycyA9IHRoaXMuZ2V0QmxvY2tlZFV1aWRzKCk7XG4gICAgaWYgKCFudW1iZXJzLmluY2x1ZGVzKHV1aWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9nLmluZm8oJ3JlbW92aW5nJywgdXVpZCwgJ2Zyb20gYmxvY2tlZCBsaXN0Jyk7XG4gICAgYXdhaXQgdGhpcy5zdG9yYWdlLnB1dChCTE9DS0VEX1VVSURTX0lELCB3aXRob3V0KG51bWJlcnMsIHV1aWQpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRCbG9ja2VkR3JvdXBzKCk6IEFycmF5PHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0KEJMT0NLRURfR1JPVVBTX0lELCBuZXcgQXJyYXk8c3RyaW5nPigpKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0dyb3VwQmxvY2tlZChncm91cElkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRCbG9ja2VkR3JvdXBzKCkuaW5jbHVkZXMoZ3JvdXBJZCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgYWRkQmxvY2tlZEdyb3VwKGdyb3VwSWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGdyb3VwSWRzID0gdGhpcy5nZXRCbG9ja2VkR3JvdXBzKCk7XG4gICAgaWYgKGdyb3VwSWRzLmluY2x1ZGVzKGdyb3VwSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9nLmluZm8oYGFkZGluZyBncm91cCgke2dyb3VwSWR9KSB0byBibG9ja2VkIGxpc3RgKTtcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2UucHV0KEJMT0NLRURfR1JPVVBTX0lELCBncm91cElkcy5jb25jYXQoZ3JvdXBJZCkpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlbW92ZUJsb2NrZWRHcm91cChncm91cElkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBncm91cElkcyA9IHRoaXMuZ2V0QmxvY2tlZEdyb3VwcygpO1xuICAgIGlmICghZ3JvdXBJZHMuaW5jbHVkZXMoZ3JvdXBJZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsb2cuaW5mbyhgcmVtb3ZpbmcgZ3JvdXAoJHtncm91cElkfSBmcm9tIGJsb2NrZWQgbGlzdGApO1xuICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5wdXQoQkxPQ0tFRF9HUk9VUFNfSUQsIHdpdGhvdXQoZ3JvdXBJZHMsIGdyb3VwSWQpKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUF3QjtBQUd4QixVQUFxQjtBQUVyQixNQUFNLHFCQUFxQjtBQUMzQixNQUFNLG1CQUFtQjtBQUN6QixNQUFNLG9CQUFvQjtBQUVuQixNQUFNLFFBQVE7QUFBQSxFQUNuQixZQUE2QixTQUEyQjtBQUEzQjtBQUFBLEVBQTRCO0FBQUEsRUFFbEQsb0JBQW1DO0FBQ3hDLFdBQU8sS0FBSyxRQUFRLElBQUksb0JBQW9CLElBQUksTUFBYyxDQUFDO0FBQUEsRUFDakU7QUFBQSxFQUVPLFVBQVUsUUFBeUI7QUFDeEMsV0FBTyxLQUFLLGtCQUFrQixFQUFFLFNBQVMsTUFBTTtBQUFBLEVBQ2pEO0FBQUEsUUFFYSxpQkFBaUIsUUFBK0I7QUFDM0QsVUFBTSxVQUFVLEtBQUssa0JBQWtCO0FBQ3ZDLFFBQUksUUFBUSxTQUFTLE1BQU0sR0FBRztBQUM1QjtBQUFBLElBQ0Y7QUFFQSxRQUFJLEtBQUssVUFBVSxRQUFRLGlCQUFpQjtBQUM1QyxVQUFNLEtBQUssUUFBUSxJQUFJLG9CQUFvQixRQUFRLE9BQU8sTUFBTSxDQUFDO0FBQUEsRUFDbkU7QUFBQSxRQUVhLG9CQUFvQixRQUErQjtBQUM5RCxVQUFNLFVBQVUsS0FBSyxrQkFBa0I7QUFDdkMsUUFBSSxDQUFDLFFBQVEsU0FBUyxNQUFNLEdBQUc7QUFDN0I7QUFBQSxJQUNGO0FBRUEsUUFBSSxLQUFLLFlBQVksUUFBUSxtQkFBbUI7QUFDaEQsVUFBTSxLQUFLLFFBQVEsSUFBSSxvQkFBb0IsMkJBQVEsU0FBUyxNQUFNLENBQUM7QUFBQSxFQUNyRTtBQUFBLEVBRU8sa0JBQWlDO0FBQ3RDLFdBQU8sS0FBSyxRQUFRLElBQUksa0JBQWtCLElBQUksTUFBYyxDQUFDO0FBQUEsRUFDL0Q7QUFBQSxFQUVPLGNBQWMsTUFBdUI7QUFDMUMsV0FBTyxLQUFLLGdCQUFnQixFQUFFLFNBQVMsSUFBSTtBQUFBLEVBQzdDO0FBQUEsUUFFYSxlQUFlLE1BQTZCO0FBQ3ZELFVBQU0sUUFBUSxLQUFLLGdCQUFnQjtBQUNuQyxRQUFJLE1BQU0sU0FBUyxJQUFJLEdBQUc7QUFDeEI7QUFBQSxJQUNGO0FBRUEsUUFBSSxLQUFLLFVBQVUsTUFBTSxpQkFBaUI7QUFDMUMsVUFBTSxLQUFLLFFBQVEsSUFBSSxrQkFBa0IsTUFBTSxPQUFPLElBQUksQ0FBQztBQUFBLEVBQzdEO0FBQUEsUUFFYSxrQkFBa0IsTUFBNkI7QUFDMUQsVUFBTSxVQUFVLEtBQUssZ0JBQWdCO0FBQ3JDLFFBQUksQ0FBQyxRQUFRLFNBQVMsSUFBSSxHQUFHO0FBQzNCO0FBQUEsSUFDRjtBQUVBLFFBQUksS0FBSyxZQUFZLE1BQU0sbUJBQW1CO0FBQzlDLFVBQU0sS0FBSyxRQUFRLElBQUksa0JBQWtCLDJCQUFRLFNBQVMsSUFBSSxDQUFDO0FBQUEsRUFDakU7QUFBQSxFQUVPLG1CQUFrQztBQUN2QyxXQUFPLEtBQUssUUFBUSxJQUFJLG1CQUFtQixJQUFJLE1BQWMsQ0FBQztBQUFBLEVBQ2hFO0FBQUEsRUFFTyxlQUFlLFNBQTBCO0FBQzlDLFdBQU8sS0FBSyxpQkFBaUIsRUFBRSxTQUFTLE9BQU87QUFBQSxFQUNqRDtBQUFBLFFBRWEsZ0JBQWdCLFNBQWdDO0FBQzNELFVBQU0sV0FBVyxLQUFLLGlCQUFpQjtBQUN2QyxRQUFJLFNBQVMsU0FBUyxPQUFPLEdBQUc7QUFDOUI7QUFBQSxJQUNGO0FBRUEsUUFBSSxLQUFLLGdCQUFnQiwwQkFBMEI7QUFDbkQsVUFBTSxLQUFLLFFBQVEsSUFBSSxtQkFBbUIsU0FBUyxPQUFPLE9BQU8sQ0FBQztBQUFBLEVBQ3BFO0FBQUEsUUFFYSxtQkFBbUIsU0FBZ0M7QUFDOUQsVUFBTSxXQUFXLEtBQUssaUJBQWlCO0FBQ3ZDLFFBQUksQ0FBQyxTQUFTLFNBQVMsT0FBTyxHQUFHO0FBQy9CO0FBQUEsSUFDRjtBQUVBLFFBQUksS0FBSyxrQkFBa0IsMkJBQTJCO0FBQ3RELFVBQU0sS0FBSyxRQUFRLElBQUksbUJBQW1CLDJCQUFRLFVBQVUsT0FBTyxDQUFDO0FBQUEsRUFDdEU7QUFDRjtBQXRGTyIsCiAgIm5hbWVzIjogW10KfQo=
