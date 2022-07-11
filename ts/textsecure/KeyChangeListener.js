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
var KeyChangeListener_exports = {};
__export(KeyChangeListener_exports, {
  init: () => init
});
module.exports = __toCommonJS(KeyChangeListener_exports);
function init(signalProtocolStore) {
  signalProtocolStore.on("keychange", async (uuid) => {
    const conversation = await window.ConversationController.getOrCreateAndWait(uuid.toString(), "private");
    conversation.addKeyChange(uuid);
    const groups = await window.ConversationController.getAllGroupsInvolvingUuid(uuid);
    for (const group of groups) {
      group.addKeyChange(uuid);
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  init
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiS2V5Q2hhbmdlTGlzdGVuZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE3LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFVVSUQgfSBmcm9tICcuLi90eXBlcy9VVUlEJztcbmltcG9ydCB0eXBlIHsgU2lnbmFsUHJvdG9jb2xTdG9yZSB9IGZyb20gJy4uL1NpZ25hbFByb3RvY29sU3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdChzaWduYWxQcm90b2NvbFN0b3JlOiBTaWduYWxQcm90b2NvbFN0b3JlKTogdm9pZCB7XG4gIHNpZ25hbFByb3RvY29sU3RvcmUub24oJ2tleWNoYW5nZScsIGFzeW5jICh1dWlkOiBVVUlEKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gYXdhaXQgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3JDcmVhdGVBbmRXYWl0KFxuICAgICAgdXVpZC50b1N0cmluZygpLFxuICAgICAgJ3ByaXZhdGUnXG4gICAgKTtcbiAgICBjb252ZXJzYXRpb24uYWRkS2V5Q2hhbmdlKHV1aWQpO1xuXG4gICAgY29uc3QgZ3JvdXBzID1cbiAgICAgIGF3YWl0IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldEFsbEdyb3Vwc0ludm9sdmluZ1V1aWQodXVpZCk7XG4gICAgZm9yIChjb25zdCBncm91cCBvZiBncm91cHMpIHtcbiAgICAgIGdyb3VwLmFkZEtleUNoYW5nZSh1dWlkKTtcbiAgICB9XG4gIH0pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1PLGNBQWMscUJBQWdEO0FBQ25FLHNCQUFvQixHQUFHLGFBQWEsT0FBTyxTQUE4QjtBQUN2RSxVQUFNLGVBQWUsTUFBTSxPQUFPLHVCQUF1QixtQkFDdkQsS0FBSyxTQUFTLEdBQ2QsU0FDRjtBQUNBLGlCQUFhLGFBQWEsSUFBSTtBQUU5QixVQUFNLFNBQ0osTUFBTSxPQUFPLHVCQUF1QiwwQkFBMEIsSUFBSTtBQUNwRSxlQUFXLFNBQVMsUUFBUTtBQUMxQixZQUFNLGFBQWEsSUFBSTtBQUFBLElBQ3pCO0FBQUEsRUFDRixDQUFDO0FBQ0g7QUFkZ0IiLAogICJuYW1lcyI6IFtdCn0K
