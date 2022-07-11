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
var ContactSpoofingReviewDialog_exports = {};
__export(ContactSpoofingReviewDialog_exports, {
  SmartContactSpoofingReviewDialog: () => SmartContactSpoofingReviewDialog
});
module.exports = __toCommonJS(ContactSpoofingReviewDialog_exports);
var React = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_ContactSpoofingReviewDialog = require("../../components/conversation/ContactSpoofingReviewDialog");
var import_conversations = require("../selectors/conversations");
var import_contactSpoofing = require("../../util/contactSpoofing");
const SmartContactSpoofingReviewDialog = /* @__PURE__ */ __name((props) => {
  const { type } = props;
  const getConversation = (0, import_react_redux.useSelector)(import_conversations.getConversationSelector);
  if (type === import_contactSpoofing.ContactSpoofingType.MultipleGroupMembersWithSameTitle) {
    return /* @__PURE__ */ React.createElement(import_ContactSpoofingReviewDialog.ContactSpoofingReviewDialog, {
      ...props,
      group: getConversation(props.groupConversationId)
    });
  }
  return /* @__PURE__ */ React.createElement(import_ContactSpoofingReviewDialog.ContactSpoofingReviewDialog, {
    ...props
  });
}, "SmartContactSpoofingReviewDialog");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartContactSpoofingReviewDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIGFzIERvd25zdHJlYW1Qcm9wc1R5cGUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbnZlcnNhdGlvbi9Db250YWN0U3Bvb2ZpbmdSZXZpZXdEaWFsb2cnO1xuaW1wb3J0IHsgQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nJztcblxuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IEdldENvbnZlcnNhdGlvbkJ5SWRUeXBlIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0Q29udmVyc2F0aW9uU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBDb250YWN0U3Bvb2ZpbmdUeXBlIH0gZnJvbSAnLi4vLi4vdXRpbC9jb250YWN0U3Bvb2ZpbmcnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSBPbWl0PERvd25zdHJlYW1Qcm9wc1R5cGUsICd0eXBlJz4gJlxuICAoXG4gICAgfCB7XG4gICAgICAgIHR5cGU6IENvbnRhY3RTcG9vZmluZ1R5cGUuRGlyZWN0Q29udmVyc2F0aW9uV2l0aFNhbWVUaXRsZTtcbiAgICAgICAgcG9zc2libHlVbnNhZmVDb252ZXJzYXRpb246IENvbnZlcnNhdGlvblR5cGU7XG4gICAgICAgIHNhZmVDb252ZXJzYXRpb246IENvbnZlcnNhdGlvblR5cGU7XG4gICAgICB9XG4gICAgfCB7XG4gICAgICAgIHR5cGU6IENvbnRhY3RTcG9vZmluZ1R5cGUuTXVsdGlwbGVHcm91cE1lbWJlcnNXaXRoU2FtZVRpdGxlO1xuICAgICAgICBncm91cENvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gICAgICAgIGNvbGxpc2lvbkluZm9CeVRpdGxlOiBSZWNvcmQ8XG4gICAgICAgICAgc3RyaW5nLFxuICAgICAgICAgIEFycmF5PHtcbiAgICAgICAgICAgIG9sZE5hbWU/OiBzdHJpbmc7XG4gICAgICAgICAgICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvblR5cGU7XG4gICAgICAgICAgfT5cbiAgICAgICAgPjtcbiAgICAgIH1cbiAgKTtcblxuZXhwb3J0IGNvbnN0IFNtYXJ0Q29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nOiBSZWFjdC5Db21wb25lbnRUeXBlPFxuICBQcm9wc1R5cGVcbj4gPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHsgdHlwZSB9ID0gcHJvcHM7XG5cbiAgY29uc3QgZ2V0Q29udmVyc2F0aW9uID0gdXNlU2VsZWN0b3I8U3RhdGVUeXBlLCBHZXRDb252ZXJzYXRpb25CeUlkVHlwZT4oXG4gICAgZ2V0Q29udmVyc2F0aW9uU2VsZWN0b3JcbiAgKTtcblxuICBpZiAodHlwZSA9PT0gQ29udGFjdFNwb29maW5nVHlwZS5NdWx0aXBsZUdyb3VwTWVtYmVyc1dpdGhTYW1lVGl0bGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZ1xuICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgIGdyb3VwPXtnZXRDb252ZXJzYXRpb24ocHJvcHMuZ3JvdXBDb252ZXJzYXRpb25JZCl9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gPENvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZyB7Li4ucHJvcHN9IC8+O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2Qix5QkFBNEI7QUFJNUIseUNBQTRDO0FBSTVDLDJCQUF3QztBQUN4Qyw2QkFBb0M7QUFzQjdCLE1BQU0sbUNBRVQsa0NBQVM7QUFDWCxRQUFNLEVBQUUsU0FBUztBQUVqQixRQUFNLGtCQUFrQixvQ0FDdEIsNENBQ0Y7QUFFQSxNQUFJLFNBQVMsMkNBQW9CLG1DQUFtQztBQUNsRSxXQUNFLG9DQUFDO0FBQUEsU0FDSztBQUFBLE1BQ0osT0FBTyxnQkFBZ0IsTUFBTSxtQkFBbUI7QUFBQSxLQUNsRDtBQUFBLEVBRUo7QUFFQSxTQUFPLG9DQUFDO0FBQUEsT0FBZ0M7QUFBQSxHQUFPO0FBQ2pELEdBakJJOyIsCiAgIm5hbWVzIjogW10KfQo=
