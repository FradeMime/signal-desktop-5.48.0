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
var areAllErrorsUnregistered_exports = {};
__export(areAllErrorsUnregistered_exports, {
  areAllErrorsUnregistered: () => areAllErrorsUnregistered
});
module.exports = __toCommonJS(areAllErrorsUnregistered_exports);
var import_Errors = require("../../textsecure/Errors");
var import_whatTypeOfConversation = require("../../util/whatTypeOfConversation");
function areAllErrorsUnregistered(conversation, error) {
  return Boolean((0, import_whatTypeOfConversation.isGroup)(conversation) && error instanceof import_Errors.SendMessageProtoError && error.errors?.every((item) => item instanceof import_Errors.UnregisteredUserError));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  areAllErrorsUnregistered
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXJlQWxsRXJyb3JzVW5yZWdpc3RlcmVkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGUgfSBmcm9tICcuLi8uLi9tb2RlbC10eXBlcy5kJztcbmltcG9ydCB7XG4gIFNlbmRNZXNzYWdlUHJvdG9FcnJvcixcbiAgVW5yZWdpc3RlcmVkVXNlckVycm9yLFxufSBmcm9tICcuLi8uLi90ZXh0c2VjdXJlL0Vycm9ycyc7XG5pbXBvcnQgeyBpc0dyb3VwIH0gZnJvbSAnLi4vLi4vdXRpbC93aGF0VHlwZU9mQ29udmVyc2F0aW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFyZUFsbEVycm9yc1VucmVnaXN0ZXJlZChcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZSxcbiAgZXJyb3I6IHVua25vd25cbik6IGVycm9yIGlzIFNlbmRNZXNzYWdlUHJvdG9FcnJvciB7XG4gIHJldHVybiBCb29sZWFuKFxuICAgIGlzR3JvdXAoY29udmVyc2F0aW9uKSAmJlxuICAgICAgZXJyb3IgaW5zdGFuY2VvZiBTZW5kTWVzc2FnZVByb3RvRXJyb3IgJiZcbiAgICAgIGVycm9yLmVycm9ycz8uZXZlcnkoaXRlbSA9PiBpdGVtIGluc3RhbmNlb2YgVW5yZWdpc3RlcmVkVXNlckVycm9yKVxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG9CQUdPO0FBQ1Asb0NBQXdCO0FBRWpCLGtDQUNMLGNBQ0EsT0FDZ0M7QUFDaEMsU0FBTyxRQUNMLDJDQUFRLFlBQVksS0FDbEIsaUJBQWlCLHVDQUNqQixNQUFNLFFBQVEsTUFBTSxVQUFRLGdCQUFnQixtQ0FBcUIsQ0FDckU7QUFDRjtBQVRnQiIsCiAgIm5hbWVzIjogW10KfQo=
