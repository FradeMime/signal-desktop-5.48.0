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
var gv2_banned_members_exports = {};
__export(gv2_banned_members_exports, {
  default: () => updateToSchemaVersion53
});
module.exports = __toCommonJS(gv2_banned_members_exports);
var import_util = require("../util");
function updateToSchemaVersion53(currentVersion, db, logger) {
  if (currentVersion >= 53) {
    return;
  }
  const updateConversationStmt = db.prepare(`
      UPDATE conversations SET
        json = json_patch(json, $jsonPatch)
      WHERE id = $id;
    `);
  const upgradeConversation = /* @__PURE__ */ __name((convo) => {
    const legacy = convo;
    const logId = `(${legacy.id}) groupv2(${legacy.groupId})`;
    if (!legacy.bannedMembersV2?.length) {
      return false;
    }
    const jsonPatch = {
      bannedMembersV2: legacy.bannedMembersV2.map((uuid) => ({
        uuid,
        timestamp: 0
      }))
    };
    logger.info(`updateToSchemaVersion53: Updating ${logId} with ${legacy.bannedMembersV2.length} banned members`);
    updateConversationStmt.run({
      id: legacy.id,
      jsonPatch: JSON.stringify(jsonPatch)
    });
    return true;
  }, "upgradeConversation");
  db.transaction(() => {
    const allConversations = db.prepare(`
          SELECT json, profileLastFetchedAt
          FROM conversations
          WHERE type = 'group'
          ORDER BY id ASC;
        `).all().map(({ json }) => (0, import_util.jsonToObject)(json));
    logger.info(`updateToSchemaVersion53: About to iterate through ${allConversations.length} conversations`);
    let updated = 0;
    for (const convo of allConversations) {
      updated += upgradeConversation(convo) ? 1 : 0;
    }
    logger.info(`updateToSchemaVersion53: Updated ${updated} conversations`);
    db.pragma("user_version = 53");
  })();
  logger.info("updateToSchemaVersion53: success!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiNTMtZ3YyLWJhbm5lZC1tZW1iZXJzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRGF0YWJhc2UgfSBmcm9tICdiZXR0ZXItc3FsaXRlMyc7XG5cbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0xvZ2dpbmcnO1xuaW1wb3J0IHR5cGUgeyBVVUlEU3RyaW5nVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHsganNvblRvT2JqZWN0IH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgdHlwZSB7IEVtcHR5UXVlcnkgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL0ludGVyZmFjZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjUzKFxuICBjdXJyZW50VmVyc2lvbjogbnVtYmVyLFxuICBkYjogRGF0YWJhc2UsXG4gIGxvZ2dlcjogTG9nZ2VyVHlwZVxuKTogdm9pZCB7XG4gIGlmIChjdXJyZW50VmVyc2lvbiA+PSA1Mykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHR5cGUgTGVnYWN5Q29udmVyc2F0aW9uVHlwZSA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGdyb3VwSWQ6IHN0cmluZztcbiAgICBiYW5uZWRNZW1iZXJzVjI/OiBBcnJheTxVVUlEU3RyaW5nVHlwZT47XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlQ29udmVyc2F0aW9uU3RtdCA9IGRiLnByZXBhcmUoXG4gICAgYFxuICAgICAgVVBEQVRFIGNvbnZlcnNhdGlvbnMgU0VUXG4gICAgICAgIGpzb24gPSBqc29uX3BhdGNoKGpzb24sICRqc29uUGF0Y2gpXG4gICAgICBXSEVSRSBpZCA9ICRpZDtcbiAgICBgXG4gICk7XG5cbiAgY29uc3QgdXBncmFkZUNvbnZlcnNhdGlvbiA9IChjb252bzogQ29udmVyc2F0aW9uVHlwZSk6IGJvb2xlYW4gPT4ge1xuICAgIGNvbnN0IGxlZ2FjeSA9IGNvbnZvIGFzIHVua25vd24gYXMgTGVnYWN5Q29udmVyc2F0aW9uVHlwZTtcblxuICAgIGNvbnN0IGxvZ0lkID0gYCgke2xlZ2FjeS5pZH0pIGdyb3VwdjIoJHtsZWdhY3kuZ3JvdXBJZH0pYDtcblxuICAgIGlmICghbGVnYWN5LmJhbm5lZE1lbWJlcnNWMj8ubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QganNvblBhdGNoOiBQaWNrPENvbnZlcnNhdGlvblR5cGUsICdiYW5uZWRNZW1iZXJzVjInPiA9IHtcbiAgICAgIGJhbm5lZE1lbWJlcnNWMjogbGVnYWN5LmJhbm5lZE1lbWJlcnNWMi5tYXAodXVpZCA9PiAoe1xuICAgICAgICB1dWlkLFxuICAgICAgICB0aW1lc3RhbXA6IDAsXG4gICAgICB9KSksXG4gICAgfTtcblxuICAgIGxvZ2dlci5pbmZvKFxuICAgICAgYHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjUzOiBVcGRhdGluZyAke2xvZ0lkfSB3aXRoIGAgK1xuICAgICAgICBgJHtsZWdhY3kuYmFubmVkTWVtYmVyc1YyLmxlbmd0aH0gYmFubmVkIG1lbWJlcnNgXG4gICAgKTtcblxuICAgIHVwZGF0ZUNvbnZlcnNhdGlvblN0bXQucnVuKHtcbiAgICAgIGlkOiBsZWdhY3kuaWQsXG4gICAgICBqc29uUGF0Y2g6IEpTT04uc3RyaW5naWZ5KGpzb25QYXRjaCksXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgY29uc3QgYWxsQ29udmVyc2F0aW9ucyA9IGRiXG4gICAgICAucHJlcGFyZTxFbXB0eVF1ZXJ5PihcbiAgICAgICAgYFxuICAgICAgICAgIFNFTEVDVCBqc29uLCBwcm9maWxlTGFzdEZldGNoZWRBdFxuICAgICAgICAgIEZST00gY29udmVyc2F0aW9uc1xuICAgICAgICAgIFdIRVJFIHR5cGUgPSAnZ3JvdXAnXG4gICAgICAgICAgT1JERVIgQlkgaWQgQVNDO1xuICAgICAgICBgXG4gICAgICApXG4gICAgICAuYWxsKClcbiAgICAgIC5tYXAoKHsganNvbiB9KSA9PiBqc29uVG9PYmplY3Q8Q29udmVyc2F0aW9uVHlwZT4oanNvbikpO1xuXG4gICAgbG9nZ2VyLmluZm8oXG4gICAgICAndXBkYXRlVG9TY2hlbWFWZXJzaW9uNTM6IEFib3V0IHRvIGl0ZXJhdGUgdGhyb3VnaCAnICtcbiAgICAgICAgYCR7YWxsQ29udmVyc2F0aW9ucy5sZW5ndGh9IGNvbnZlcnNhdGlvbnNgXG4gICAgKTtcblxuICAgIGxldCB1cGRhdGVkID0gMDtcbiAgICBmb3IgKGNvbnN0IGNvbnZvIG9mIGFsbENvbnZlcnNhdGlvbnMpIHtcbiAgICAgIHVwZGF0ZWQgKz0gdXBncmFkZUNvbnZlcnNhdGlvbihjb252bykgPyAxIDogMDtcbiAgICB9XG5cbiAgICBsb2dnZXIuaW5mbyhgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNTM6IFVwZGF0ZWQgJHt1cGRhdGVkfSBjb252ZXJzYXRpb25zYCk7XG5cbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDUzJyk7XG4gIH0pKCk7XG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb241Mzogc3VjY2VzcyEnKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQSxrQkFBNkI7QUFJZCxpQ0FDYixnQkFDQSxJQUNBLFFBQ007QUFDTixNQUFJLGtCQUFrQixJQUFJO0FBQ3hCO0FBQUEsRUFDRjtBQVFBLFFBQU0seUJBQXlCLEdBQUcsUUFDaEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUtGO0FBRUEsUUFBTSxzQkFBc0Isd0JBQUMsVUFBcUM7QUFDaEUsVUFBTSxTQUFTO0FBRWYsVUFBTSxRQUFRLElBQUksT0FBTyxlQUFlLE9BQU87QUFFL0MsUUFBSSxDQUFDLE9BQU8saUJBQWlCLFFBQVE7QUFDbkMsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLFlBQXVEO0FBQUEsTUFDM0QsaUJBQWlCLE9BQU8sZ0JBQWdCLElBQUksVUFBUztBQUFBLFFBQ25EO0FBQUEsUUFDQSxXQUFXO0FBQUEsTUFDYixFQUFFO0FBQUEsSUFDSjtBQUVBLFdBQU8sS0FDTCxxQ0FBcUMsY0FDaEMsT0FBTyxnQkFBZ0IsdUJBQzlCO0FBRUEsMkJBQXVCLElBQUk7QUFBQSxNQUN6QixJQUFJLE9BQU87QUFBQSxNQUNYLFdBQVcsS0FBSyxVQUFVLFNBQVM7QUFBQSxJQUNyQyxDQUFDO0FBRUQsV0FBTztBQUFBLEVBQ1QsR0EzQjRCO0FBNkI1QixLQUFHLFlBQVksTUFBTTtBQUNuQixVQUFNLG1CQUFtQixHQUN0QixRQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQU1GLEVBQ0MsSUFBSSxFQUNKLElBQUksQ0FBQyxFQUFFLFdBQVcsOEJBQStCLElBQUksQ0FBQztBQUV6RCxXQUFPLEtBQ0wscURBQ0ssaUJBQWlCLHNCQUN4QjtBQUVBLFFBQUksVUFBVTtBQUNkLGVBQVcsU0FBUyxrQkFBa0I7QUFDcEMsaUJBQVcsb0JBQW9CLEtBQUssSUFBSSxJQUFJO0FBQUEsSUFDOUM7QUFFQSxXQUFPLEtBQUssb0NBQW9DLHVCQUF1QjtBQUV2RSxPQUFHLE9BQU8sbUJBQW1CO0FBQUEsRUFDL0IsQ0FBQyxFQUFFO0FBQ0gsU0FBTyxLQUFLLG1DQUFtQztBQUNqRDtBQWhGd0IiLAogICJuYW1lcyI6IFtdCn0K
