var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var ReactionPicker_exports = {};
__export(ReactionPicker_exports, {
  SmartReactionPicker: () => SmartReactionPicker
});
module.exports = __toCommonJS(ReactionPicker_exports);
var React = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_preferredReactions = require("../ducks/preferredReactions");
var import_items = require("../ducks/items");
var import_user = require("../selectors/user");
var import_items2 = require("../selectors/items");
var import_ReactionPicker = require("../../components/conversation/ReactionPicker");
const SmartReactionPicker = React.forwardRef((props, ref) => {
  const { openCustomizePreferredReactionsModal } = (0, import_preferredReactions.useActions)();
  const { onSetSkinTone } = (0, import_items.useActions)();
  const i18n = (0, import_react_redux.useSelector)(import_user.getIntl);
  const preferredReactionEmoji = (0, import_react_redux.useSelector)(import_items2.getPreferredReactionEmoji);
  return /* @__PURE__ */ React.createElement(import_ReactionPicker.ReactionPicker, {
    i18n,
    onSetSkinTone,
    openCustomizePreferredReactionsModal,
    preferredReactionEmoji,
    ref,
    ...props
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartReactionPicker
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUmVhY3Rpb25QaWNrZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHsgdXNlQWN0aW9ucyBhcyB1c2VQcmVmZXJyZWRSZWFjdGlvbnNBY3Rpb25zIH0gZnJvbSAnLi4vZHVja3MvcHJlZmVycmVkUmVhY3Rpb25zJztcbmltcG9ydCB7IHVzZUFjdGlvbnMgYXMgdXNlSXRlbXNBY3Rpb25zIH0gZnJvbSAnLi4vZHVja3MvaXRlbXMnO1xuXG5pbXBvcnQgeyBnZXRJbnRsIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3VzZXInO1xuaW1wb3J0IHsgZ2V0UHJlZmVycmVkUmVhY3Rpb25FbW9qaSB9IGZyb20gJy4uL3NlbGVjdG9ycy9pdGVtcyc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL1JlYWN0aW9uUGlja2VyJztcbmltcG9ydCB7IFJlYWN0aW9uUGlja2VyIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vUmVhY3Rpb25QaWNrZXInO1xuXG50eXBlIEV4dGVybmFsUHJvcHMgPSBPbWl0PFxuICBQcm9wcyxcbiAgfCAnaTE4bidcbiAgfCAnb25TZXRTa2luVG9uZSdcbiAgfCAnb3BlbkN1c3RvbWl6ZVByZWZlcnJlZFJlYWN0aW9uc01vZGFsJ1xuICB8ICdwcmVmZXJyZWRSZWFjdGlvbkVtb2ppJ1xuICB8ICdzZWxlY3Rpb25TdHlsZSdcbiAgfCAnc2tpblRvbmUnXG4+O1xuXG5leHBvcnQgY29uc3QgU21hcnRSZWFjdGlvblBpY2tlciA9IFJlYWN0LmZvcndhcmRSZWY8XG4gIEhUTUxEaXZFbGVtZW50LFxuICBFeHRlcm5hbFByb3BzXG4+KChwcm9wcywgcmVmKSA9PiB7XG4gIGNvbnN0IHsgb3BlbkN1c3RvbWl6ZVByZWZlcnJlZFJlYWN0aW9uc01vZGFsIH0gPVxuICAgIHVzZVByZWZlcnJlZFJlYWN0aW9uc0FjdGlvbnMoKTtcbiAgY29uc3QgeyBvblNldFNraW5Ub25lIH0gPSB1c2VJdGVtc0FjdGlvbnMoKTtcblxuICBjb25zdCBpMThuID0gdXNlU2VsZWN0b3I8U3RhdGVUeXBlLCBMb2NhbGl6ZXJUeXBlPihnZXRJbnRsKTtcblxuICBjb25zdCBwcmVmZXJyZWRSZWFjdGlvbkVtb2ppID0gdXNlU2VsZWN0b3I8U3RhdGVUeXBlLCBBcnJheTxzdHJpbmc+PihcbiAgICBnZXRQcmVmZXJyZWRSZWFjdGlvbkVtb2ppXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8UmVhY3Rpb25QaWNrZXJcbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBvblNldFNraW5Ub25lPXtvblNldFNraW5Ub25lfVxuICAgICAgb3BlbkN1c3RvbWl6ZVByZWZlcnJlZFJlYWN0aW9uc01vZGFsPXtcbiAgICAgICAgb3BlbkN1c3RvbWl6ZVByZWZlcnJlZFJlYWN0aW9uc01vZGFsXG4gICAgICB9XG4gICAgICBwcmVmZXJyZWRSZWFjdGlvbkVtb2ppPXtwcmVmZXJyZWRSZWFjdGlvbkVtb2ppfVxuICAgICAgcmVmPXtyZWZ9XG4gICAgICB7Li4ucHJvcHN9XG4gICAgLz5cbiAgKTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIseUJBQTRCO0FBRTVCLGdDQUEyRDtBQUMzRCxtQkFBOEM7QUFFOUMsa0JBQXdCO0FBQ3hCLG9CQUEwQztBQUkxQyw0QkFBK0I7QUFZeEIsTUFBTSxzQkFBc0IsTUFBTSxXQUd2QyxDQUFDLE9BQU8sUUFBUTtBQUNoQixRQUFNLEVBQUUseUNBQ04sMENBQTZCO0FBQy9CLFFBQU0sRUFBRSxrQkFBa0IsNkJBQWdCO0FBRTFDLFFBQU0sT0FBTyxvQ0FBc0MsbUJBQU87QUFFMUQsUUFBTSx5QkFBeUIsb0NBQzdCLHVDQUNGO0FBRUEsU0FDRSxvQ0FBQztBQUFBLElBQ0M7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBR0E7QUFBQSxJQUNBO0FBQUEsT0FDSTtBQUFBLEdBQ047QUFFSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
