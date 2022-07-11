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
var groupMemberNameCollisions_exports = {};
__export(groupMemberNameCollisions_exports, {
  dehydrateCollisionsWithConversations: () => dehydrateCollisionsWithConversations,
  getCollisionsFromMemberships: () => getCollisionsFromMemberships,
  hasUnacknowledgedCollisions: () => hasUnacknowledgedCollisions,
  invertIdsByTitle: () => invertIdsByTitle
});
module.exports = __toCommonJS(groupMemberNameCollisions_exports);
var import_lodash = require("lodash");
var import_iterables = require("./iterables");
var import_getOwn = require("./getOwn");
var import_isConversationNameKnown = require("./isConversationNameKnown");
var import_isInSystemContacts = require("./isInSystemContacts");
const dehydrateCollisionsWithConversations = /* @__PURE__ */ __name((withConversations) => (0, import_lodash.mapValues)(withConversations, (conversations) => conversations.map((c) => c.id)), "dehydrateCollisionsWithConversations");
function getCollisionsFromMemberships(memberships) {
  const members = (0, import_iterables.map)(memberships, (membership) => membership.member);
  const candidateMembers = (0, import_iterables.filter)(members, (member) => !member.isMe && (0, import_isConversationNameKnown.isConversationNameKnown)(member));
  const groupedByTitle = (0, import_iterables.groupBy)(candidateMembers, (member) => member.title);
  return (0, import_lodash.pickBy)(groupedByTitle, (group) => group.length >= 2 && !group.every((person) => (0, import_isInSystemContacts.isInSystemContacts)(person)));
}
const hasUnacknowledgedCollisions = /* @__PURE__ */ __name((previous, current) => Object.entries(current).some(([title, currentIds]) => {
  const previousIds = new Set((0, import_getOwn.getOwn)(previous, title) || []);
  return currentIds.some((currentId) => !previousIds.has(currentId));
}), "hasUnacknowledgedCollisions");
const invertIdsByTitle = /* @__PURE__ */ __name((idsByTitle) => {
  const result = /* @__PURE__ */ Object.create(null);
  Object.entries(idsByTitle).forEach(([title, ids]) => {
    ids.forEach((id) => {
      result[id] = title;
    });
  });
  return result;
}, "invertIdsByTitle");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dehydrateCollisionsWithConversations,
  getCollisionsFromMemberships,
  hasUnacknowledgedCollisions,
  invertIdsByTitle
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ3JvdXBNZW1iZXJOYW1lQ29sbGlzaW9ucy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBtYXBWYWx1ZXMsIHBpY2tCeSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBncm91cEJ5LCBtYXAsIGZpbHRlciB9IGZyb20gJy4vaXRlcmFibGVzJztcbmltcG9ydCB7IGdldE93biB9IGZyb20gJy4vZ2V0T3duJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgaXNDb252ZXJzYXRpb25OYW1lS25vd24gfSBmcm9tICcuL2lzQ29udmVyc2F0aW9uTmFtZUtub3duJztcbmltcG9ydCB7IGlzSW5TeXN0ZW1Db250YWN0cyB9IGZyb20gJy4vaXNJblN5c3RlbUNvbnRhY3RzJztcblxuZXhwb3J0IHR5cGUgR3JvdXBOYW1lQ29sbGlzaW9uc1dpdGhJZHNCeVRpdGxlID0gUmVjb3JkPHN0cmluZywgQXJyYXk8c3RyaW5nPj47XG5leHBvcnQgdHlwZSBHcm91cE5hbWVDb2xsaXNpb25zV2l0aENvbnZlcnNhdGlvbnNCeVRpdGxlID0gUmVjb3JkPFxuICBzdHJpbmcsXG4gIEFycmF5PENvbnZlcnNhdGlvblR5cGU+XG4+O1xuZXhwb3J0IHR5cGUgR3JvdXBOYW1lQ29sbGlzaW9uc1dpdGhUaXRsZXNCeUlkID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcblxuZXhwb3J0IGNvbnN0IGRlaHlkcmF0ZUNvbGxpc2lvbnNXaXRoQ29udmVyc2F0aW9ucyA9IChcbiAgd2l0aENvbnZlcnNhdGlvbnM6IFJlYWRvbmx5PEdyb3VwTmFtZUNvbGxpc2lvbnNXaXRoQ29udmVyc2F0aW9uc0J5VGl0bGU+XG4pOiBHcm91cE5hbWVDb2xsaXNpb25zV2l0aElkc0J5VGl0bGUgPT5cbiAgbWFwVmFsdWVzKHdpdGhDb252ZXJzYXRpb25zLCBjb252ZXJzYXRpb25zID0+IGNvbnZlcnNhdGlvbnMubWFwKGMgPT4gYy5pZCkpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29sbGlzaW9uc0Zyb21NZW1iZXJzaGlwcyhcbiAgbWVtYmVyc2hpcHM6IEl0ZXJhYmxlPHsgbWVtYmVyOiBDb252ZXJzYXRpb25UeXBlIH0+XG4pOiBHcm91cE5hbWVDb2xsaXNpb25zV2l0aENvbnZlcnNhdGlvbnNCeVRpdGxlIHtcbiAgY29uc3QgbWVtYmVycyA9IG1hcChtZW1iZXJzaGlwcywgbWVtYmVyc2hpcCA9PiBtZW1iZXJzaGlwLm1lbWJlcik7XG4gIGNvbnN0IGNhbmRpZGF0ZU1lbWJlcnMgPSBmaWx0ZXIoXG4gICAgbWVtYmVycyxcbiAgICBtZW1iZXIgPT4gIW1lbWJlci5pc01lICYmIGlzQ29udmVyc2F0aW9uTmFtZUtub3duKG1lbWJlcilcbiAgKTtcbiAgY29uc3QgZ3JvdXBlZEJ5VGl0bGUgPSBncm91cEJ5KGNhbmRpZGF0ZU1lbWJlcnMsIG1lbWJlciA9PiBtZW1iZXIudGl0bGUpO1xuICAvLyBUaGlzIGNhc3QgaXMgaGVyZSBiZWNhdXNlIGBwaWNrQnlgIHJldHVybnMgYSBgUGFydGlhbGAsIHdoaWNoIGlzIGluY29tcGF0aWJsZSB3aXRoXG4gIC8vICAgYFJlY29yZGAuIFtUaGlzIGRlbW9uc3RhdGVzIHRoZSBwcm9ibGVtXVswXSwgYnV0IEkgZG9uJ3QgYmVsaWV2ZSBpdCdzIGFuIGFjdHVhbFxuICAvLyAgIGlzc3VlIGluIHRoZSBjb2RlLlxuICAvL1xuICAvLyBBbHRlcm5hdGl2ZWx5LCB3ZSBjb3VsZCBmaWx0ZXIgdW5kZWZpbmVkIGtleXMgb3Igc29tZXRoaW5nIGxpa2UgdGhhdC5cbiAgLy9cbiAgLy8gWzBdOiBodHRwczovL3d3dy50eXBlc2NyaXB0bGFuZy5vcmcvcGxheT8jY29kZS9DNFR3RGdwZ0JBWWc5bktCZUtBRkFoZ0oyQVMzUUd3QjRBbENBWXprd0JOQ0JuWVRIQU93SE1BYUtKZ1Z3RnNBakNKZ0I4UWdOd0FvQ2szcFFBWmdDNVlDWkZBRGVVQUJZNUZBVmlnQmZDZU5DUW9BSVN3clNGYW5RYk4yblhnT0VTcE12b291WVZzMFVBXG4gIHJldHVybiBwaWNrQnkoXG4gICAgZ3JvdXBlZEJ5VGl0bGUsXG4gICAgZ3JvdXAgPT5cbiAgICAgIGdyb3VwLmxlbmd0aCA+PSAyICYmICFncm91cC5ldmVyeShwZXJzb24gPT4gaXNJblN5c3RlbUNvbnRhY3RzKHBlcnNvbikpXG4gICkgYXMgdW5rbm93biBhcyBHcm91cE5hbWVDb2xsaXNpb25zV2l0aENvbnZlcnNhdGlvbnNCeVRpdGxlO1xufVxuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSB1c2VyIHNob3VsZCBzZWUgYSBncm91cCBtZW1iZXIgbmFtZSBjb2xsaXNpb24gd2FybmluZywgYW5kXG4gKiBgZmFsc2VgIG90aGVyd2lzZS4gVXNlcnMgc2hvdWxkIHNlZSB0aGVzZSB3YXJuaW5ncyBpZiBhbnkgY29sbGlzaW9ucyBhcHBlYXIgdGhhdCB0aGV5XG4gKiBoYXZlbid0IGRpc21pc3NlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc1VuYWNrbm93bGVkZ2VkQ29sbGlzaW9ucyA9IChcbiAgcHJldmlvdXM6IFJlYWRvbmx5PEdyb3VwTmFtZUNvbGxpc2lvbnNXaXRoSWRzQnlUaXRsZT4sXG4gIGN1cnJlbnQ6IFJlYWRvbmx5PEdyb3VwTmFtZUNvbGxpc2lvbnNXaXRoSWRzQnlUaXRsZT5cbik6IGJvb2xlYW4gPT5cbiAgT2JqZWN0LmVudHJpZXMoY3VycmVudCkuc29tZSgoW3RpdGxlLCBjdXJyZW50SWRzXSkgPT4ge1xuICAgIGNvbnN0IHByZXZpb3VzSWRzID0gbmV3IFNldChnZXRPd24ocHJldmlvdXMsIHRpdGxlKSB8fCBbXSk7XG4gICAgcmV0dXJuIGN1cnJlbnRJZHMuc29tZShjdXJyZW50SWQgPT4gIXByZXZpb3VzSWRzLmhhcyhjdXJyZW50SWQpKTtcbiAgfSk7XG5cbmV4cG9ydCBjb25zdCBpbnZlcnRJZHNCeVRpdGxlID0gKFxuICBpZHNCeVRpdGxlOiBSZWFkb25seTxHcm91cE5hbWVDb2xsaXNpb25zV2l0aElkc0J5VGl0bGU+XG4pOiBHcm91cE5hbWVDb2xsaXNpb25zV2l0aFRpdGxlc0J5SWQgPT4ge1xuICBjb25zdCByZXN1bHQ6IEdyb3VwTmFtZUNvbGxpc2lvbnNXaXRoVGl0bGVzQnlJZCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIE9iamVjdC5lbnRyaWVzKGlkc0J5VGl0bGUpLmZvckVhY2goKFt0aXRsZSwgaWRzXSkgPT4ge1xuICAgIGlkcy5mb3JFYWNoKGlkID0+IHtcbiAgICAgIHJlc3VsdFtpZF0gPSB0aXRsZTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUFrQztBQUNsQyx1QkFBcUM7QUFDckMsb0JBQXVCO0FBRXZCLHFDQUF3QztBQUN4QyxnQ0FBbUM7QUFTNUIsTUFBTSx1Q0FBdUMsd0JBQ2xELHNCQUVBLDZCQUFVLG1CQUFtQixtQkFBaUIsY0FBYyxJQUFJLE9BQUssRUFBRSxFQUFFLENBQUMsR0FIeEI7QUFLN0Msc0NBQ0wsYUFDNkM7QUFDN0MsUUFBTSxVQUFVLDBCQUFJLGFBQWEsZ0JBQWMsV0FBVyxNQUFNO0FBQ2hFLFFBQU0sbUJBQW1CLDZCQUN2QixTQUNBLFlBQVUsQ0FBQyxPQUFPLFFBQVEsNERBQXdCLE1BQU0sQ0FDMUQ7QUFDQSxRQUFNLGlCQUFpQiw4QkFBUSxrQkFBa0IsWUFBVSxPQUFPLEtBQUs7QUFRdkUsU0FBTywwQkFDTCxnQkFDQSxXQUNFLE1BQU0sVUFBVSxLQUFLLENBQUMsTUFBTSxNQUFNLFlBQVUsa0RBQW1CLE1BQU0sQ0FBQyxDQUMxRTtBQUNGO0FBckJnQixBQTRCVCxNQUFNLDhCQUE4Qix3QkFDekMsVUFDQSxZQUVBLE9BQU8sUUFBUSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsT0FBTyxnQkFBZ0I7QUFDcEQsUUFBTSxjQUFjLElBQUksSUFBSSwwQkFBTyxVQUFVLEtBQUssS0FBSyxDQUFDLENBQUM7QUFDekQsU0FBTyxXQUFXLEtBQUssZUFBYSxDQUFDLFlBQVksSUFBSSxTQUFTLENBQUM7QUFDakUsQ0FBQyxHQVB3QztBQVNwQyxNQUFNLG1CQUFtQix3QkFDOUIsZUFDc0M7QUFDdEMsUUFBTSxTQUE0Qyx1QkFBTyxPQUFPLElBQUk7QUFDcEUsU0FBTyxRQUFRLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxPQUFPLFNBQVM7QUFDbkQsUUFBSSxRQUFRLFFBQU07QUFDaEIsYUFBTyxNQUFNO0FBQUEsSUFDZixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0QsU0FBTztBQUNULEdBVmdDOyIsCiAgIm5hbWVzIjogW10KfQo=
