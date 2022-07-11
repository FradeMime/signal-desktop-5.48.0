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
var AddGroupMembersModal_exports = {};
__export(AddGroupMembersModal_exports, {
  AddGroupMembersModal: () => AddGroupMembersModal
});
module.exports = __toCommonJS(AddGroupMembersModal_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_AddGroupMemberErrorDialog = require("../../AddGroupMemberErrorDialog");
var import_limits = require("../../../groups/limits");
var import_toggleSelectedContactForGroupAddition = require("../../../groups/toggleSelectedContactForGroupAddition");
var import_missingCaseError = require("../../../util/missingCaseError");
var Stage = /* @__PURE__ */ ((Stage2) => {
  Stage2[Stage2["ChoosingContacts"] = 0] = "ChoosingContacts";
  Stage2[Stage2["ConfirmingAdds"] = 1] = "ConfirmingAdds";
  return Stage2;
})(Stage || {});
var ActionType = /* @__PURE__ */ ((ActionType2) => {
  ActionType2[ActionType2["CloseMaximumGroupSizeModal"] = 0] = "CloseMaximumGroupSizeModal";
  ActionType2[ActionType2["CloseRecommendedMaximumGroupSizeModal"] = 1] = "CloseRecommendedMaximumGroupSizeModal";
  ActionType2[ActionType2["ConfirmAdds"] = 2] = "ConfirmAdds";
  ActionType2[ActionType2["RemoveSelectedContact"] = 3] = "RemoveSelectedContact";
  ActionType2[ActionType2["ReturnToContactChooser"] = 4] = "ReturnToContactChooser";
  ActionType2[ActionType2["ToggleSelectedContact"] = 5] = "ToggleSelectedContact";
  ActionType2[ActionType2["UpdateSearchTerm"] = 6] = "UpdateSearchTerm";
  return ActionType2;
})(ActionType || {});
function reducer(state, action) {
  switch (action.type) {
    case 0 /* CloseMaximumGroupSizeModal */:
      return {
        ...state,
        maximumGroupSizeModalState: import_toggleSelectedContactForGroupAddition.OneTimeModalState.Shown
      };
    case 1 /* CloseRecommendedMaximumGroupSizeModal */:
      return {
        ...state,
        recommendedGroupSizeModalState: import_toggleSelectedContactForGroupAddition.OneTimeModalState.Shown
      };
    case 2 /* ConfirmAdds */:
      return {
        ...state,
        stage: 1 /* ConfirmingAdds */
      };
    case 4 /* ReturnToContactChooser */:
      return {
        ...state,
        stage: 0 /* ChoosingContacts */
      };
    case 3 /* RemoveSelectedContact */:
      return {
        ...state,
        selectedConversationIds: (0, import_lodash.without)(state.selectedConversationIds, action.conversationId)
      };
    case 5 /* ToggleSelectedContact */:
      return {
        ...state,
        ...(0, import_toggleSelectedContactForGroupAddition.toggleSelectedContactForGroupAddition)(action.conversationId, {
          maxGroupSize: getMaximumNumberOfContacts(),
          maxRecommendedGroupSize: getRecommendedMaximumNumberOfContacts(),
          maximumGroupSizeModalState: state.maximumGroupSizeModalState,
          numberOfContactsAlreadyInGroup: action.numberOfContactsAlreadyInGroup,
          recommendedGroupSizeModalState: state.recommendedGroupSizeModalState,
          selectedConversationIds: state.selectedConversationIds
        })
      };
    case 6 /* UpdateSearchTerm */:
      return {
        ...state,
        searchTerm: action.searchTerm
      };
    default:
      throw (0, import_missingCaseError.missingCaseError)(action);
  }
}
const AddGroupMembersModal = /* @__PURE__ */ __name(({
  clearRequestError,
  conversationIdsAlreadyInGroup,
  groupTitle,
  i18n,
  onClose,
  makeRequest,
  requestState,
  renderChooseGroupMembersModal,
  renderConfirmAdditionsModal
}) => {
  const maxGroupSize = getMaximumNumberOfContacts();
  const maxRecommendedGroupSize = getRecommendedMaximumNumberOfContacts();
  const numberOfContactsAlreadyInGroup = conversationIdsAlreadyInGroup.size;
  const isGroupAlreadyFull = numberOfContactsAlreadyInGroup >= maxGroupSize;
  const isGroupAlreadyOverRecommendedMaximum = numberOfContactsAlreadyInGroup >= maxRecommendedGroupSize;
  const [
    {
      maximumGroupSizeModalState,
      recommendedGroupSizeModalState,
      searchTerm,
      selectedConversationIds,
      stage
    },
    dispatch
  ] = (0, import_react.useReducer)(reducer, {
    maximumGroupSizeModalState: isGroupAlreadyFull ? import_toggleSelectedContactForGroupAddition.OneTimeModalState.Showing : import_toggleSelectedContactForGroupAddition.OneTimeModalState.NeverShown,
    recommendedGroupSizeModalState: isGroupAlreadyOverRecommendedMaximum ? import_toggleSelectedContactForGroupAddition.OneTimeModalState.Shown : import_toggleSelectedContactForGroupAddition.OneTimeModalState.NeverShown,
    searchTerm: "",
    selectedConversationIds: [],
    stage: 0 /* ChoosingContacts */
  });
  if (maximumGroupSizeModalState === import_toggleSelectedContactForGroupAddition.OneTimeModalState.Showing) {
    return /* @__PURE__ */ import_react.default.createElement(import_AddGroupMemberErrorDialog.AddGroupMemberErrorDialog, {
      i18n,
      maximumNumberOfContacts: maxGroupSize,
      mode: import_AddGroupMemberErrorDialog.AddGroupMemberErrorDialogMode.MaximumGroupSize,
      onClose: () => {
        dispatch({ type: 0 /* CloseMaximumGroupSizeModal */ });
      }
    });
  }
  if (recommendedGroupSizeModalState === import_toggleSelectedContactForGroupAddition.OneTimeModalState.Showing) {
    return /* @__PURE__ */ import_react.default.createElement(import_AddGroupMemberErrorDialog.AddGroupMemberErrorDialog, {
      i18n,
      mode: import_AddGroupMemberErrorDialog.AddGroupMemberErrorDialogMode.RecommendedMaximumGroupSize,
      onClose: () => {
        dispatch({
          type: 1 /* CloseRecommendedMaximumGroupSizeModal */
        });
      },
      recommendedMaximumNumberOfContacts: maxRecommendedGroupSize
    });
  }
  switch (stage) {
    case 0 /* ChoosingContacts */: {
      const confirmAdds = /* @__PURE__ */ __name(() => {
        dispatch({ type: 2 /* ConfirmAdds */ });
      }, "confirmAdds");
      const removeSelectedContact = /* @__PURE__ */ __name((conversationId) => {
        dispatch({
          type: 3 /* RemoveSelectedContact */,
          conversationId
        });
      }, "removeSelectedContact");
      const setSearchTerm = /* @__PURE__ */ __name((term) => {
        dispatch({
          type: 6 /* UpdateSearchTerm */,
          searchTerm: term
        });
      }, "setSearchTerm");
      const toggleSelectedContact = /* @__PURE__ */ __name((conversationId) => {
        dispatch({
          type: 5 /* ToggleSelectedContact */,
          conversationId,
          numberOfContactsAlreadyInGroup
        });
      }, "toggleSelectedContact");
      return renderChooseGroupMembersModal({
        confirmAdds,
        selectedConversationIds,
        conversationIdsAlreadyInGroup,
        maxGroupSize,
        onClose,
        removeSelectedContact,
        searchTerm,
        setSearchTerm,
        toggleSelectedContact
      });
    }
    case 1 /* ConfirmingAdds */: {
      const onCloseConfirmationDialog = /* @__PURE__ */ __name(() => {
        dispatch({ type: 4 /* ReturnToContactChooser */ });
        clearRequestError();
      }, "onCloseConfirmationDialog");
      return renderConfirmAdditionsModal({
        groupTitle,
        makeRequest: () => {
          makeRequest(selectedConversationIds);
        },
        onClose: onCloseConfirmationDialog,
        requestState,
        selectedConversationIds
      });
    }
    default:
      throw (0, import_missingCaseError.missingCaseError)(stage);
  }
}, "AddGroupMembersModal");
function getRecommendedMaximumNumberOfContacts() {
  return (0, import_limits.getGroupSizeRecommendedLimit)(151);
}
function getMaximumNumberOfContacts() {
  return (0, import_limits.getGroupSizeHardLimit)(1001);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddGroupMembersModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQWRkR3JvdXBNZW1iZXJzTW9kYWwudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VSZWR1Y2VyIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgd2l0aG91dCB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHtcbiAgQWRkR3JvdXBNZW1iZXJFcnJvckRpYWxvZyxcbiAgQWRkR3JvdXBNZW1iZXJFcnJvckRpYWxvZ01vZGUsXG59IGZyb20gJy4uLy4uL0FkZEdyb3VwTWVtYmVyRXJyb3JEaWFsb2cnO1xuaW1wb3J0IHR5cGUgeyBTbWFydENob29zZUdyb3VwTWVtYmVyc01vZGFsUHJvcHNUeXBlIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvc21hcnQvQ2hvb3NlR3JvdXBNZW1iZXJzTW9kYWwnO1xuaW1wb3J0IHR5cGUgeyBTbWFydENvbmZpcm1BZGRpdGlvbnNNb2RhbFByb3BzVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL3NtYXJ0L0NvbmZpcm1BZGRpdGlvbnNNb2RhbCc7XG5pbXBvcnQge1xuICBnZXRHcm91cFNpemVSZWNvbW1lbmRlZExpbWl0LFxuICBnZXRHcm91cFNpemVIYXJkTGltaXQsXG59IGZyb20gJy4uLy4uLy4uL2dyb3Vwcy9saW1pdHMnO1xuaW1wb3J0IHtcbiAgdG9nZ2xlU2VsZWN0ZWRDb250YWN0Rm9yR3JvdXBBZGRpdGlvbixcbiAgT25lVGltZU1vZGFsU3RhdGUsXG59IGZyb20gJy4uLy4uLy4uL2dyb3Vwcy90b2dnbGVTZWxlY3RlZENvbnRhY3RGb3JHcm91cEFkZGl0aW9uJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi8uLi8uLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHR5cGUgeyBSZXF1ZXN0U3RhdGUgfSBmcm9tICcuL3V0aWwnO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgY2xlYXJSZXF1ZXN0RXJyb3I6ICgpID0+IHZvaWQ7XG4gIGNvbnZlcnNhdGlvbklkc0FscmVhZHlJbkdyb3VwOiBTZXQ8c3RyaW5nPjtcbiAgZ3JvdXBUaXRsZTogc3RyaW5nO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBtYWtlUmVxdWVzdDogKGNvbnZlcnNhdGlvbklkczogUmVhZG9ubHlBcnJheTxzdHJpbmc+KSA9PiBQcm9taXNlPHZvaWQ+O1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICByZXF1ZXN0U3RhdGU6IFJlcXVlc3RTdGF0ZTtcblxuICByZW5kZXJDaG9vc2VHcm91cE1lbWJlcnNNb2RhbDogKFxuICAgIHByb3BzOiBTbWFydENob29zZUdyb3VwTWVtYmVyc01vZGFsUHJvcHNUeXBlXG4gICkgPT4gSlNYLkVsZW1lbnQ7XG4gIHJlbmRlckNvbmZpcm1BZGRpdGlvbnNNb2RhbDogKFxuICAgIHByb3BzOiBTbWFydENvbmZpcm1BZGRpdGlvbnNNb2RhbFByb3BzVHlwZVxuICApID0+IEpTWC5FbGVtZW50O1xufTtcblxuZW51bSBTdGFnZSB7XG4gIENob29zaW5nQ29udGFjdHMsXG4gIENvbmZpcm1pbmdBZGRzLFxufVxuXG50eXBlIFN0YXRlVHlwZSA9IHtcbiAgbWF4aW11bUdyb3VwU2l6ZU1vZGFsU3RhdGU6IE9uZVRpbWVNb2RhbFN0YXRlO1xuICByZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsU3RhdGU6IE9uZVRpbWVNb2RhbFN0YXRlO1xuICBzZWFyY2hUZXJtOiBzdHJpbmc7XG4gIHNlbGVjdGVkQ29udmVyc2F0aW9uSWRzOiBBcnJheTxzdHJpbmc+O1xuICBzdGFnZTogU3RhZ2U7XG59O1xuXG5lbnVtIEFjdGlvblR5cGUge1xuICBDbG9zZU1heGltdW1Hcm91cFNpemVNb2RhbCxcbiAgQ2xvc2VSZWNvbW1lbmRlZE1heGltdW1Hcm91cFNpemVNb2RhbCxcbiAgQ29uZmlybUFkZHMsXG4gIFJlbW92ZVNlbGVjdGVkQ29udGFjdCxcbiAgUmV0dXJuVG9Db250YWN0Q2hvb3NlcixcbiAgVG9nZ2xlU2VsZWN0ZWRDb250YWN0LFxuICBVcGRhdGVTZWFyY2hUZXJtLFxufVxuXG50eXBlIEFjdGlvbiA9XG4gIHwgeyB0eXBlOiBBY3Rpb25UeXBlLkNsb3NlTWF4aW11bUdyb3VwU2l6ZU1vZGFsIH1cbiAgfCB7IHR5cGU6IEFjdGlvblR5cGUuQ2xvc2VSZWNvbW1lbmRlZE1heGltdW1Hcm91cFNpemVNb2RhbCB9XG4gIHwgeyB0eXBlOiBBY3Rpb25UeXBlLkNvbmZpcm1BZGRzIH1cbiAgfCB7IHR5cGU6IEFjdGlvblR5cGUuUmV0dXJuVG9Db250YWN0Q2hvb3NlciB9XG4gIHwgeyB0eXBlOiBBY3Rpb25UeXBlLlJlbW92ZVNlbGVjdGVkQ29udGFjdDsgY29udmVyc2F0aW9uSWQ6IHN0cmluZyB9XG4gIHwge1xuICAgICAgdHlwZTogQWN0aW9uVHlwZS5Ub2dnbGVTZWxlY3RlZENvbnRhY3Q7XG4gICAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICAgICAgbnVtYmVyT2ZDb250YWN0c0FscmVhZHlJbkdyb3VwOiBudW1iZXI7XG4gICAgfVxuICB8IHsgdHlwZTogQWN0aW9uVHlwZS5VcGRhdGVTZWFyY2hUZXJtOyBzZWFyY2hUZXJtOiBzdHJpbmcgfTtcblxuLy8gYDxDb252ZXJzYXRpb25EZXRhaWxzPmAgaXNuJ3QgY3VycmVudGx5IGhvb2tlZCB1cCB0byBSZWR1eCwgYnV0IHRoYXQncyBub3QgZGVzaXJhYmxlIGluXG4vLyAgIHRoZSBsb25nIHRlcm0gKHNlZSBERVNLVE9QLTEyNjApLiBGb3Igbm93LCB0aGlzIGNvbXBvbmVudCBoYXMgaW50ZXJuYWwgc3RhdGUgd2l0aCBhXG4vLyAgIHJlZHVjZXIuIEhvcGVmdWxseSwgdGhpcyB3aWxsIG1ha2UgdGhpbmdzIGVhc2llciB0byBwb3J0IHRvIFJlZHV4IGluIHRoZSBmdXR1cmUuXG5mdW5jdGlvbiByZWR1Y2VyKFxuICBzdGF0ZTogUmVhZG9ubHk8U3RhdGVUeXBlPixcbiAgYWN0aW9uOiBSZWFkb25seTxBY3Rpb24+XG4pOiBTdGF0ZVR5cGUge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBY3Rpb25UeXBlLkNsb3NlTWF4aW11bUdyb3VwU2l6ZU1vZGFsOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIG1heGltdW1Hcm91cFNpemVNb2RhbFN0YXRlOiBPbmVUaW1lTW9kYWxTdGF0ZS5TaG93bixcbiAgICAgIH07XG4gICAgY2FzZSBBY3Rpb25UeXBlLkNsb3NlUmVjb21tZW5kZWRNYXhpbXVtR3JvdXBTaXplTW9kYWw6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcmVjb21tZW5kZWRHcm91cFNpemVNb2RhbFN0YXRlOiBPbmVUaW1lTW9kYWxTdGF0ZS5TaG93bixcbiAgICAgIH07XG4gICAgY2FzZSBBY3Rpb25UeXBlLkNvbmZpcm1BZGRzOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHN0YWdlOiBTdGFnZS5Db25maXJtaW5nQWRkcyxcbiAgICAgIH07XG4gICAgY2FzZSBBY3Rpb25UeXBlLlJldHVyblRvQ29udGFjdENob29zZXI6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgc3RhZ2U6IFN0YWdlLkNob29zaW5nQ29udGFjdHMsXG4gICAgICB9O1xuICAgIGNhc2UgQWN0aW9uVHlwZS5SZW1vdmVTZWxlY3RlZENvbnRhY3Q6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZHM6IHdpdGhvdXQoXG4gICAgICAgICAgc3RhdGUuc2VsZWN0ZWRDb252ZXJzYXRpb25JZHMsXG4gICAgICAgICAgYWN0aW9uLmNvbnZlcnNhdGlvbklkXG4gICAgICAgICksXG4gICAgICB9O1xuICAgIGNhc2UgQWN0aW9uVHlwZS5Ub2dnbGVTZWxlY3RlZENvbnRhY3Q6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgLi4udG9nZ2xlU2VsZWN0ZWRDb250YWN0Rm9yR3JvdXBBZGRpdGlvbihhY3Rpb24uY29udmVyc2F0aW9uSWQsIHtcbiAgICAgICAgICBtYXhHcm91cFNpemU6IGdldE1heGltdW1OdW1iZXJPZkNvbnRhY3RzKCksXG4gICAgICAgICAgbWF4UmVjb21tZW5kZWRHcm91cFNpemU6IGdldFJlY29tbWVuZGVkTWF4aW11bU51bWJlck9mQ29udGFjdHMoKSxcbiAgICAgICAgICBtYXhpbXVtR3JvdXBTaXplTW9kYWxTdGF0ZTogc3RhdGUubWF4aW11bUdyb3VwU2l6ZU1vZGFsU3RhdGUsXG4gICAgICAgICAgbnVtYmVyT2ZDb250YWN0c0FscmVhZHlJbkdyb3VwOiBhY3Rpb24ubnVtYmVyT2ZDb250YWN0c0FscmVhZHlJbkdyb3VwLFxuICAgICAgICAgIHJlY29tbWVuZGVkR3JvdXBTaXplTW9kYWxTdGF0ZTogc3RhdGUucmVjb21tZW5kZWRHcm91cFNpemVNb2RhbFN0YXRlLFxuICAgICAgICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWRzOiBzdGF0ZS5zZWxlY3RlZENvbnZlcnNhdGlvbklkcyxcbiAgICAgICAgfSksXG4gICAgICB9O1xuICAgIGNhc2UgQWN0aW9uVHlwZS5VcGRhdGVTZWFyY2hUZXJtOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHNlYXJjaFRlcm06IGFjdGlvbi5zZWFyY2hUZXJtLFxuICAgICAgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihhY3Rpb24pO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBBZGRHcm91cE1lbWJlcnNNb2RhbDogRnVuY3Rpb25Db21wb25lbnQ8UHJvcHNUeXBlPiA9ICh7XG4gIGNsZWFyUmVxdWVzdEVycm9yLFxuICBjb252ZXJzYXRpb25JZHNBbHJlYWR5SW5Hcm91cCxcbiAgZ3JvdXBUaXRsZSxcbiAgaTE4bixcbiAgb25DbG9zZSxcbiAgbWFrZVJlcXVlc3QsXG4gIHJlcXVlc3RTdGF0ZSxcbiAgcmVuZGVyQ2hvb3NlR3JvdXBNZW1iZXJzTW9kYWwsXG4gIHJlbmRlckNvbmZpcm1BZGRpdGlvbnNNb2RhbCxcbn0pID0+IHtcbiAgY29uc3QgbWF4R3JvdXBTaXplID0gZ2V0TWF4aW11bU51bWJlck9mQ29udGFjdHMoKTtcbiAgY29uc3QgbWF4UmVjb21tZW5kZWRHcm91cFNpemUgPSBnZXRSZWNvbW1lbmRlZE1heGltdW1OdW1iZXJPZkNvbnRhY3RzKCk7XG5cbiAgY29uc3QgbnVtYmVyT2ZDb250YWN0c0FscmVhZHlJbkdyb3VwID0gY29udmVyc2F0aW9uSWRzQWxyZWFkeUluR3JvdXAuc2l6ZTtcbiAgY29uc3QgaXNHcm91cEFscmVhZHlGdWxsID0gbnVtYmVyT2ZDb250YWN0c0FscmVhZHlJbkdyb3VwID49IG1heEdyb3VwU2l6ZTtcbiAgY29uc3QgaXNHcm91cEFscmVhZHlPdmVyUmVjb21tZW5kZWRNYXhpbXVtID1cbiAgICBudW1iZXJPZkNvbnRhY3RzQWxyZWFkeUluR3JvdXAgPj0gbWF4UmVjb21tZW5kZWRHcm91cFNpemU7XG5cbiAgY29uc3QgW1xuICAgIHtcbiAgICAgIG1heGltdW1Hcm91cFNpemVNb2RhbFN0YXRlLFxuICAgICAgcmVjb21tZW5kZWRHcm91cFNpemVNb2RhbFN0YXRlLFxuICAgICAgc2VhcmNoVGVybSxcbiAgICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWRzLFxuICAgICAgc3RhZ2UsXG4gICAgfSxcbiAgICBkaXNwYXRjaCxcbiAgXSA9IHVzZVJlZHVjZXIocmVkdWNlciwge1xuICAgIG1heGltdW1Hcm91cFNpemVNb2RhbFN0YXRlOiBpc0dyb3VwQWxyZWFkeUZ1bGxcbiAgICAgID8gT25lVGltZU1vZGFsU3RhdGUuU2hvd2luZ1xuICAgICAgOiBPbmVUaW1lTW9kYWxTdGF0ZS5OZXZlclNob3duLFxuICAgIHJlY29tbWVuZGVkR3JvdXBTaXplTW9kYWxTdGF0ZTogaXNHcm91cEFscmVhZHlPdmVyUmVjb21tZW5kZWRNYXhpbXVtXG4gICAgICA/IE9uZVRpbWVNb2RhbFN0YXRlLlNob3duXG4gICAgICA6IE9uZVRpbWVNb2RhbFN0YXRlLk5ldmVyU2hvd24sXG4gICAgc2VhcmNoVGVybTogJycsXG4gICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZHM6IFtdLFxuICAgIHN0YWdlOiBTdGFnZS5DaG9vc2luZ0NvbnRhY3RzLFxuICB9KTtcblxuICBpZiAobWF4aW11bUdyb3VwU2l6ZU1vZGFsU3RhdGUgPT09IE9uZVRpbWVNb2RhbFN0YXRlLlNob3dpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEFkZEdyb3VwTWVtYmVyRXJyb3JEaWFsb2dcbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgbWF4aW11bU51bWJlck9mQ29udGFjdHM9e21heEdyb3VwU2l6ZX1cbiAgICAgICAgbW9kZT17QWRkR3JvdXBNZW1iZXJFcnJvckRpYWxvZ01vZGUuTWF4aW11bUdyb3VwU2l6ZX1cbiAgICAgICAgb25DbG9zZT17KCkgPT4ge1xuICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogQWN0aW9uVHlwZS5DbG9zZU1heGltdW1Hcm91cFNpemVNb2RhbCB9KTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIGlmIChyZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsU3RhdGUgPT09IE9uZVRpbWVNb2RhbFN0YXRlLlNob3dpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEFkZEdyb3VwTWVtYmVyRXJyb3JEaWFsb2dcbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgbW9kZT17QWRkR3JvdXBNZW1iZXJFcnJvckRpYWxvZ01vZGUuUmVjb21tZW5kZWRNYXhpbXVtR3JvdXBTaXplfVxuICAgICAgICBvbkNsb3NlPXsoKSA9PiB7XG4gICAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogQWN0aW9uVHlwZS5DbG9zZVJlY29tbWVuZGVkTWF4aW11bUdyb3VwU2l6ZU1vZGFsLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9fVxuICAgICAgICByZWNvbW1lbmRlZE1heGltdW1OdW1iZXJPZkNvbnRhY3RzPXttYXhSZWNvbW1lbmRlZEdyb3VwU2l6ZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIHN3aXRjaCAoc3RhZ2UpIHtcbiAgICBjYXNlIFN0YWdlLkNob29zaW5nQ29udGFjdHM6IHtcbiAgICAgIC8vIFNlZSBub3RlIGFib3ZlOiB0aGVzZSB3aWxsIHNvb24gYmVjb21lIFJlZHV4IGFjdGlvbnMuXG4gICAgICBjb25zdCBjb25maXJtQWRkcyA9ICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlLkNvbmZpcm1BZGRzIH0pO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlbW92ZVNlbGVjdGVkQ29udGFjdCA9IChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICB0eXBlOiBBY3Rpb25UeXBlLlJlbW92ZVNlbGVjdGVkQ29udGFjdCxcbiAgICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgY29uc3Qgc2V0U2VhcmNoVGVybSA9ICh0ZXJtOiBzdHJpbmcpID0+IHtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgIHR5cGU6IEFjdGlvblR5cGUuVXBkYXRlU2VhcmNoVGVybSxcbiAgICAgICAgICBzZWFyY2hUZXJtOiB0ZXJtLFxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBjb25zdCB0b2dnbGVTZWxlY3RlZENvbnRhY3QgPSAoY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4ge1xuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgdHlwZTogQWN0aW9uVHlwZS5Ub2dnbGVTZWxlY3RlZENvbnRhY3QsXG4gICAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgICAgbnVtYmVyT2ZDb250YWN0c0FscmVhZHlJbkdyb3VwLFxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiByZW5kZXJDaG9vc2VHcm91cE1lbWJlcnNNb2RhbCh7XG4gICAgICAgIGNvbmZpcm1BZGRzLFxuICAgICAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkcyxcbiAgICAgICAgY29udmVyc2F0aW9uSWRzQWxyZWFkeUluR3JvdXAsXG4gICAgICAgIG1heEdyb3VwU2l6ZSxcbiAgICAgICAgb25DbG9zZSxcbiAgICAgICAgcmVtb3ZlU2VsZWN0ZWRDb250YWN0LFxuICAgICAgICBzZWFyY2hUZXJtLFxuICAgICAgICBzZXRTZWFyY2hUZXJtLFxuICAgICAgICB0b2dnbGVTZWxlY3RlZENvbnRhY3QsXG4gICAgICB9KTtcbiAgICB9XG4gICAgY2FzZSBTdGFnZS5Db25maXJtaW5nQWRkczoge1xuICAgICAgY29uc3Qgb25DbG9zZUNvbmZpcm1hdGlvbkRpYWxvZyA9ICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlLlJldHVyblRvQ29udGFjdENob29zZXIgfSk7XG4gICAgICAgIGNsZWFyUmVxdWVzdEVycm9yKCk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcmVuZGVyQ29uZmlybUFkZGl0aW9uc01vZGFsKHtcbiAgICAgICAgZ3JvdXBUaXRsZSxcbiAgICAgICAgbWFrZVJlcXVlc3Q6ICgpID0+IHtcbiAgICAgICAgICBtYWtlUmVxdWVzdChzZWxlY3RlZENvbnZlcnNhdGlvbklkcyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ2xvc2U6IG9uQ2xvc2VDb25maXJtYXRpb25EaWFsb2csXG4gICAgICAgIHJlcXVlc3RTdGF0ZSxcbiAgICAgICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZHMsXG4gICAgICB9KTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3Ioc3RhZ2UpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBnZXRSZWNvbW1lbmRlZE1heGltdW1OdW1iZXJPZkNvbnRhY3RzKCk6IG51bWJlciB7XG4gIHJldHVybiBnZXRHcm91cFNpemVSZWNvbW1lbmRlZExpbWl0KDE1MSk7XG59XG5cbmZ1bmN0aW9uIGdldE1heGltdW1OdW1iZXJPZkNvbnRhY3RzKCk6IG51bWJlciB7XG4gIHJldHVybiBnZXRHcm91cFNpemVIYXJkTGltaXQoMTAwMSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWtDO0FBQ2xDLG9CQUF3QjtBQUd4Qix1Q0FHTztBQUdQLG9CQUdPO0FBQ1AsbURBR087QUFDUCw4QkFBaUM7QUFvQmpDLElBQUssUUFBTCxrQkFBSyxXQUFMO0FBQ0U7QUFDQTtBQUZHO0FBQUE7QUFhTCxJQUFLLGFBQUwsa0JBQUssZ0JBQUw7QUFDRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBHO0FBQUE7QUEwQkwsaUJBQ0UsT0FDQSxRQUNXO0FBQ1gsVUFBUSxPQUFPO0FBQUEsU0FDUjtBQUNILGFBQU87QUFBQSxXQUNGO0FBQUEsUUFDSCw0QkFBNEIsK0RBQWtCO0FBQUEsTUFDaEQ7QUFBQSxTQUNHO0FBQ0gsYUFBTztBQUFBLFdBQ0Y7QUFBQSxRQUNILGdDQUFnQywrREFBa0I7QUFBQSxNQUNwRDtBQUFBLFNBQ0c7QUFDSCxhQUFPO0FBQUEsV0FDRjtBQUFBLFFBQ0gsT0FBTztBQUFBLE1BQ1Q7QUFBQSxTQUNHO0FBQ0gsYUFBTztBQUFBLFdBQ0Y7QUFBQSxRQUNILE9BQU87QUFBQSxNQUNUO0FBQUEsU0FDRztBQUNILGFBQU87QUFBQSxXQUNG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
