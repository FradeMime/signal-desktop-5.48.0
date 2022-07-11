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
var CustomizingPreferredReactionsModal_exports = {};
__export(CustomizingPreferredReactionsModal_exports, {
  SmartCustomizingPreferredReactionsModal: () => SmartCustomizingPreferredReactionsModal
});
module.exports = __toCommonJS(CustomizingPreferredReactionsModal_exports);
var React = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_preferredReactions = require("../ducks/preferredReactions");
var import_items = require("../ducks/items");
var import_user = require("../selectors/user");
var import_items2 = require("../selectors/items");
var import_emojis = require("../selectors/emojis");
var import_preferredReactions2 = require("../selectors/preferredReactions");
var import_CustomizingPreferredReactionsModal = require("../../components/CustomizingPreferredReactionsModal");
function SmartCustomizingPreferredReactionsModal() {
  const preferredReactionsActions = (0, import_preferredReactions.useActions)();
  const { onSetSkinTone } = (0, import_items.useActions)();
  const i18n = (0, import_react_redux.useSelector)(import_user.getIntl);
  const customizeModalState = (0, import_react_redux.useSelector)((state) => (0, import_preferredReactions2.getCustomizeModalState)(state));
  const recentEmojis = (0, import_emojis.useRecentEmojis)();
  const skinTone = (0, import_react_redux.useSelector)((state) => (0, import_items2.getEmojiSkinTone)(state));
  if (!customizeModalState) {
    throw new Error("<SmartCustomizingPreferredReactionsModal> requires a modal");
  }
  return /* @__PURE__ */ React.createElement(import_CustomizingPreferredReactionsModal.CustomizingPreferredReactionsModal, {
    i18n,
    onSetSkinTone,
    recentEmojis,
    skinTone,
    ...preferredReactionsActions,
    ...customizeModalState
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartCustomizingPreferredReactionsModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ3VzdG9taXppbmdQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IHVzZUFjdGlvbnMgYXMgdXNlUHJlZmVycmVkUmVhY3Rpb25zQWN0aW9ucyB9IGZyb20gJy4uL2R1Y2tzL3ByZWZlcnJlZFJlYWN0aW9ucyc7XG5pbXBvcnQgeyB1c2VBY3Rpb25zIGFzIHVzZUl0ZW1zQWN0aW9ucyB9IGZyb20gJy4uL2R1Y2tzL2l0ZW1zJztcbmltcG9ydCB7IGdldEludGwgfSBmcm9tICcuLi9zZWxlY3RvcnMvdXNlcic7XG5pbXBvcnQgeyBnZXRFbW9qaVNraW5Ub25lIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2l0ZW1zJztcbmltcG9ydCB7IHVzZVJlY2VudEVtb2ppcyB9IGZyb20gJy4uL3NlbGVjdG9ycy9lbW9qaXMnO1xuaW1wb3J0IHsgZ2V0Q3VzdG9taXplTW9kYWxTdGF0ZSB9IGZyb20gJy4uL3NlbGVjdG9ycy9wcmVmZXJyZWRSZWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBDdXN0b21pemluZ1ByZWZlcnJlZFJlYWN0aW9uc01vZGFsIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DdXN0b21pemluZ1ByZWZlcnJlZFJlYWN0aW9uc01vZGFsJztcblxuZXhwb3J0IGZ1bmN0aW9uIFNtYXJ0Q3VzdG9taXppbmdQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbCgpOiBKU1guRWxlbWVudCB7XG4gIGNvbnN0IHByZWZlcnJlZFJlYWN0aW9uc0FjdGlvbnMgPSB1c2VQcmVmZXJyZWRSZWFjdGlvbnNBY3Rpb25zKCk7XG4gIGNvbnN0IHsgb25TZXRTa2luVG9uZSB9ID0gdXNlSXRlbXNBY3Rpb25zKCk7XG5cbiAgY29uc3QgaTE4biA9IHVzZVNlbGVjdG9yPFN0YXRlVHlwZSwgTG9jYWxpemVyVHlwZT4oZ2V0SW50bCk7XG5cbiAgY29uc3QgY3VzdG9taXplTW9kYWxTdGF0ZSA9IHVzZVNlbGVjdG9yPFxuICAgIFN0YXRlVHlwZSxcbiAgICBSZXR1cm5UeXBlPHR5cGVvZiBnZXRDdXN0b21pemVNb2RhbFN0YXRlPlxuICA+KHN0YXRlID0+IGdldEN1c3RvbWl6ZU1vZGFsU3RhdGUoc3RhdGUpKTtcblxuICBjb25zdCByZWNlbnRFbW9qaXMgPSB1c2VSZWNlbnRFbW9qaXMoKTtcblxuICBjb25zdCBza2luVG9uZSA9IHVzZVNlbGVjdG9yPFN0YXRlVHlwZSwgbnVtYmVyPihzdGF0ZSA9PlxuICAgIGdldEVtb2ppU2tpblRvbmUoc3RhdGUpXG4gICk7XG5cbiAgaWYgKCFjdXN0b21pemVNb2RhbFN0YXRlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJzxTbWFydEN1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zTW9kYWw+IHJlcXVpcmVzIGEgbW9kYWwnXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPEN1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zTW9kYWxcbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBvblNldFNraW5Ub25lPXtvblNldFNraW5Ub25lfVxuICAgICAgcmVjZW50RW1vamlzPXtyZWNlbnRFbW9qaXN9XG4gICAgICBza2luVG9uZT17c2tpblRvbmV9XG4gICAgICB7Li4ucHJlZmVycmVkUmVhY3Rpb25zQWN0aW9uc31cbiAgICAgIHsuLi5jdXN0b21pemVNb2RhbFN0YXRlfVxuICAgIC8+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIseUJBQTRCO0FBSTVCLGdDQUEyRDtBQUMzRCxtQkFBOEM7QUFDOUMsa0JBQXdCO0FBQ3hCLG9CQUFpQztBQUNqQyxvQkFBZ0M7QUFDaEMsaUNBQXVDO0FBRXZDLGdEQUFtRDtBQUU1QyxtREFBZ0U7QUFDckUsUUFBTSw0QkFBNEIsMENBQTZCO0FBQy9ELFFBQU0sRUFBRSxrQkFBa0IsNkJBQWdCO0FBRTFDLFFBQU0sT0FBTyxvQ0FBc0MsbUJBQU87QUFFMUQsUUFBTSxzQkFBc0Isb0NBRzFCLFdBQVMsdURBQXVCLEtBQUssQ0FBQztBQUV4QyxRQUFNLGVBQWUsbUNBQWdCO0FBRXJDLFFBQU0sV0FBVyxvQ0FBK0IsV0FDOUMsb0NBQWlCLEtBQUssQ0FDeEI7QUFFQSxNQUFJLENBQUMscUJBQXFCO0FBQ3hCLFVBQU0sSUFBSSxNQUNSLDREQUNGO0FBQUEsRUFDRjtBQUVBLFNBQ0Usb0NBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsT0FDSTtBQUFBLE9BQ0E7QUFBQSxHQUNOO0FBRUo7QUFqQ2dCIiwKICAibmFtZXMiOiBbXQp9Cg==
