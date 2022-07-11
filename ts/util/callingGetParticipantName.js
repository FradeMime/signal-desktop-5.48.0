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
var callingGetParticipantName_exports = {};
__export(callingGetParticipantName_exports, {
  getParticipantName: () => getParticipantName
});
module.exports = __toCommonJS(callingGetParticipantName_exports);
function getParticipantName(participant) {
  return participant.firstName || participant.title;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getParticipantName
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2FsbGluZ0dldFBhcnRpY2lwYW50TmFtZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcnRpY2lwYW50TmFtZShcbiAgcGFydGljaXBhbnQ6IFJlYWRvbmx5PFBpY2s8Q29udmVyc2F0aW9uVHlwZSwgJ2ZpcnN0TmFtZScgfCAndGl0bGUnPj5cbik6IHN0cmluZyB7XG4gIHJldHVybiBwYXJ0aWNpcGFudC5maXJzdE5hbWUgfHwgcGFydGljaXBhbnQudGl0bGU7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS08sNEJBQ0wsYUFDUTtBQUNSLFNBQU8sWUFBWSxhQUFhLFlBQVk7QUFDOUM7QUFKZ0IiLAogICJuYW1lcyI6IFtdCn0K
