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
var ConfirmAdditionsModal_exports = {};
__export(ConfirmAdditionsModal_exports, {
  ConfirmAdditionsModal: () => ConfirmAdditionsModal
});
module.exports = __toCommonJS(ConfirmAdditionsModal_exports);
var import_react = __toESM(require("react"));
var import_assert = require("../../../../util/assert");
var import_ModalHost = require("../../../ModalHost");
var import_Button = require("../../../Button");
var import_Spinner = require("../../../Spinner");
var import_util = require("../util");
var import_Intl = require("../../../Intl");
var import_Emojify = require("../../Emojify");
var import_ContactName = require("../../ContactName");
const ConfirmAdditionsModal = /* @__PURE__ */ __name(({
  groupTitle,
  i18n,
  makeRequest,
  onClose,
  requestState,
  selectedContacts
}) => {
  const firstContact = selectedContacts[0];
  (0, import_assert.assert)(firstContact, "Expected at least one conversation to be selected but none were picked");
  const groupTitleNode = /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
    text: groupTitle
  });
  let headerText;
  if (selectedContacts.length === 1) {
    headerText = /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      i18n,
      id: "AddGroupMembersModal--confirm-title--one",
      components: {
        person: /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
          title: firstContact.title
        }),
        group: groupTitleNode
      }
    });
  } else {
    headerText = /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      i18n,
      id: "AddGroupMembersModal--confirm-title--many",
      components: {
        count: selectedContacts.length.toString(),
        group: groupTitleNode
      }
    });
  }
  let buttonContents;
  if (requestState === import_util.RequestState.Active) {
    buttonContents = /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
      size: "20px",
      svgSize: "small",
      direction: "on-avatar"
    });
  } else if (selectedContacts.length === 1) {
    buttonContents = i18n("AddGroupMembersModal--confirm-button--one");
  } else {
    buttonContents = i18n("AddGroupMembersModal--confirm-button--many");
  }
  return /* @__PURE__ */ import_react.default.createElement(import_ModalHost.ModalHost, {
    onClose
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-AddGroupMembersModal module-AddGroupMembersModal--confirm-adds"
  }, /* @__PURE__ */ import_react.default.createElement("h1", {
    className: "module-AddGroupMembersModal__header"
  }, headerText), requestState === import_util.RequestState.InactiveWithError && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-AddGroupMembersModal__error-message"
  }, i18n("updateGroupAttributes__error-message")), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-AddGroupMembersModal__button-container"
  }, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: onClose,
    variant: import_Button.ButtonVariant.Secondary
  }, i18n("cancel")), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    disabled: requestState === import_util.RequestState.Active,
    onClick: makeRequest,
    variant: import_Button.ButtonVariant.Primary
  }, buttonContents))));
}, "ConfirmAdditionsModal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConfirmAdditionsModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29uZmlybUFkZGl0aW9uc01vZGFsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEZ1bmN0aW9uQ29tcG9uZW50LCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7IE1vZGFsSG9zdCB9IGZyb20gJy4uLy4uLy4uL01vZGFsSG9zdCc7XG5pbXBvcnQgeyBCdXR0b24sIEJ1dHRvblZhcmlhbnQgfSBmcm9tICcuLi8uLi8uLi9CdXR0b24nO1xuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJy4uLy4uLy4uL1NwaW5uZXInO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBSZXF1ZXN0U3RhdGUgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7IEludGwgfSBmcm9tICcuLi8uLi8uLi9JbnRsJztcbmltcG9ydCB7IEVtb2ppZnkgfSBmcm9tICcuLi8uLi9FbW9qaWZ5JztcbmltcG9ydCB7IENvbnRhY3ROYW1lIH0gZnJvbSAnLi4vLi4vQ29udGFjdE5hbWUnO1xuXG5leHBvcnQgdHlwZSBTdGF0ZVByb3BzVHlwZSA9IHtcbiAgZ3JvdXBUaXRsZTogc3RyaW5nO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBtYWtlUmVxdWVzdDogKCkgPT4gdm9pZDtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgcmVxdWVzdFN0YXRlOiBSZXF1ZXN0U3RhdGU7XG4gIHNlbGVjdGVkQ29udGFjdHM6IFJlYWRvbmx5QXJyYXk8Q29udmVyc2F0aW9uVHlwZT47XG59O1xuXG50eXBlIFByb3BzVHlwZSA9IFN0YXRlUHJvcHNUeXBlO1xuXG5leHBvcnQgY29uc3QgQ29uZmlybUFkZGl0aW9uc01vZGFsOiBGdW5jdGlvbkNvbXBvbmVudDxQcm9wc1R5cGU+ID0gKHtcbiAgZ3JvdXBUaXRsZSxcbiAgaTE4bixcbiAgbWFrZVJlcXVlc3QsXG4gIG9uQ2xvc2UsXG4gIHJlcXVlc3RTdGF0ZSxcbiAgc2VsZWN0ZWRDb250YWN0cyxcbn0pID0+IHtcbiAgY29uc3QgZmlyc3RDb250YWN0ID0gc2VsZWN0ZWRDb250YWN0c1swXTtcbiAgYXNzZXJ0KFxuICAgIGZpcnN0Q29udGFjdCxcbiAgICAnRXhwZWN0ZWQgYXQgbGVhc3Qgb25lIGNvbnZlcnNhdGlvbiB0byBiZSBzZWxlY3RlZCBidXQgbm9uZSB3ZXJlIHBpY2tlZCdcbiAgKTtcblxuICBjb25zdCBncm91cFRpdGxlTm9kZTogSlNYLkVsZW1lbnQgPSA8RW1vamlmeSB0ZXh0PXtncm91cFRpdGxlfSAvPjtcblxuICBsZXQgaGVhZGVyVGV4dDogUmVhY3ROb2RlO1xuICBpZiAoc2VsZWN0ZWRDb250YWN0cy5sZW5ndGggPT09IDEpIHtcbiAgICBoZWFkZXJUZXh0ID0gKFxuICAgICAgPEludGxcbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgaWQ9XCJBZGRHcm91cE1lbWJlcnNNb2RhbC0tY29uZmlybS10aXRsZS0tb25lXCJcbiAgICAgICAgY29tcG9uZW50cz17e1xuICAgICAgICAgIHBlcnNvbjogPENvbnRhY3ROYW1lIHRpdGxlPXtmaXJzdENvbnRhY3QudGl0bGV9IC8+LFxuICAgICAgICAgIGdyb3VwOiBncm91cFRpdGxlTm9kZSxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBoZWFkZXJUZXh0ID0gKFxuICAgICAgPEludGxcbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgaWQ9XCJBZGRHcm91cE1lbWJlcnNNb2RhbC0tY29uZmlybS10aXRsZS0tbWFueVwiXG4gICAgICAgIGNvbXBvbmVudHM9e3tcbiAgICAgICAgICBjb3VudDogc2VsZWN0ZWRDb250YWN0cy5sZW5ndGgudG9TdHJpbmcoKSxcbiAgICAgICAgICBncm91cDogZ3JvdXBUaXRsZU5vZGUsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBsZXQgYnV0dG9uQ29udGVudHM6IFJlYWN0Tm9kZTtcbiAgaWYgKHJlcXVlc3RTdGF0ZSA9PT0gUmVxdWVzdFN0YXRlLkFjdGl2ZSkge1xuICAgIGJ1dHRvbkNvbnRlbnRzID0gKFxuICAgICAgPFNwaW5uZXIgc2l6ZT1cIjIwcHhcIiBzdmdTaXplPVwic21hbGxcIiBkaXJlY3Rpb249XCJvbi1hdmF0YXJcIiAvPlxuICAgICk7XG4gIH0gZWxzZSBpZiAoc2VsZWN0ZWRDb250YWN0cy5sZW5ndGggPT09IDEpIHtcbiAgICBidXR0b25Db250ZW50cyA9IGkxOG4oJ0FkZEdyb3VwTWVtYmVyc01vZGFsLS1jb25maXJtLWJ1dHRvbi0tb25lJyk7XG4gIH0gZWxzZSB7XG4gICAgYnV0dG9uQ29udGVudHMgPSBpMThuKCdBZGRHcm91cE1lbWJlcnNNb2RhbC0tY29uZmlybS1idXR0b24tLW1hbnknKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPE1vZGFsSG9zdCBvbkNsb3NlPXtvbkNsb3NlfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUFkZEdyb3VwTWVtYmVyc01vZGFsIG1vZHVsZS1BZGRHcm91cE1lbWJlcnNNb2RhbC0tY29uZmlybS1hZGRzXCI+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJtb2R1bGUtQWRkR3JvdXBNZW1iZXJzTW9kYWxfX2hlYWRlclwiPntoZWFkZXJUZXh0fTwvaDE+XG4gICAgICAgIHtyZXF1ZXN0U3RhdGUgPT09IFJlcXVlc3RTdGF0ZS5JbmFjdGl2ZVdpdGhFcnJvciAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtQWRkR3JvdXBNZW1iZXJzTW9kYWxfX2Vycm9yLW1lc3NhZ2VcIj5cbiAgICAgICAgICAgIHtpMThuKCd1cGRhdGVHcm91cEF0dHJpYnV0ZXNfX2Vycm9yLW1lc3NhZ2UnKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtQWRkR3JvdXBNZW1iZXJzTW9kYWxfX2J1dHRvbi1jb250YWluZXJcIj5cbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uQ2xvc2V9IHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuU2Vjb25kYXJ5fT5cbiAgICAgICAgICAgIHtpMThuKCdjYW5jZWwnKX1cbiAgICAgICAgICA8L0J1dHRvbj5cblxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGRpc2FibGVkPXtyZXF1ZXN0U3RhdGUgPT09IFJlcXVlc3RTdGF0ZS5BY3RpdmV9XG4gICAgICAgICAgICBvbkNsaWNrPXttYWtlUmVxdWVzdH1cbiAgICAgICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuUHJpbWFyeX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7YnV0dG9uQ29udGVudHN9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9Nb2RhbEhvc3Q+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUdsQixvQkFBdUI7QUFDdkIsdUJBQTBCO0FBQzFCLG9CQUFzQztBQUN0QyxxQkFBd0I7QUFFeEIsa0JBQTZCO0FBQzdCLGtCQUFxQjtBQUNyQixxQkFBd0I7QUFDeEIseUJBQTRCO0FBYXJCLE1BQU0sd0JBQXNELHdCQUFDO0FBQUEsRUFDbEU7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQ0k7QUFDSixRQUFNLGVBQWUsaUJBQWlCO0FBQ3RDLDRCQUNFLGNBQ0Esd0VBQ0Y7QUFFQSxRQUFNLGlCQUE4QixtREFBQztBQUFBLElBQVEsTUFBTTtBQUFBLEdBQVk7QUFFL0QsTUFBSTtBQUNKLE1BQUksaUJBQWlCLFdBQVcsR0FBRztBQUNqQyxpQkFDRSxtREFBQztBQUFBLE1BQ0M7QUFBQSxNQUNBLElBQUc7QUFBQSxNQUNILFlBQVk7QUFBQSxRQUNWLFFBQVEsbURBQUM7QUFBQSxVQUFZLE9BQU8sYUFBYTtBQUFBLFNBQU87QUFBQSxRQUNoRCxPQUFPO0FBQUEsTUFDVDtBQUFBLEtBQ0Y7QUFBQSxFQUVKLE9BQU87QUFDTCxpQkFDRSxtREFBQztBQUFBLE1BQ0M7QUFBQSxNQUNBLElBQUc7QUFBQSxNQUNILFlBQVk7QUFBQSxRQUNWLE9BQU8saUJBQWlCLE9BQU8sU0FBUztBQUFBLFFBQ3hDLE9BQU87QUFBQSxNQUNUO0FBQUEsS0FDRjtBQUFBLEVBRUo7QUFFQSxNQUFJO0FBQ0osTUFBSSxpQkFBaUIseUJBQWEsUUFBUTtBQUN4QyxxQkFDRSxtREFBQztBQUFBLE1BQVEsTUFBSztBQUFBLE1BQU8sU0FBUTtBQUFBLE1BQVEsV0FBVTtBQUFBLEtBQVk7QUFBQSxFQUUvRCxXQUFXLGlCQUFpQixXQUFXLEdBQUc7QUFDeEMscUJBQWlCLEtBQUssMkNBQTJDO0FBQUEsRUFDbkUsT0FBTztBQUNMLHFCQUFpQixLQUFLLDRDQUE0QztBQUFBLEVBQ3BFO0FBRUEsU0FDRSxtREFBQztBQUFBLElBQVU7QUFBQSxLQUNULG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQUcsV0FBVTtBQUFBLEtBQXVDLFVBQVcsR0FDL0QsaUJBQWlCLHlCQUFhLHFCQUM3QixtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ1osS0FBSyxzQ0FBc0MsQ0FDOUMsR0FFRixtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQ2IsbURBQUM7QUFBQSxJQUFPLFNBQVM7QUFBQSxJQUFTLFNBQVMsNEJBQWM7QUFBQSxLQUM5QyxLQUFLLFFBQVEsQ0FDaEIsR0FFQSxtREFBQztBQUFBLElBQ0MsVUFBVSxpQkFBaUIseUJBQWE7QUFBQSxJQUN4QyxTQUFTO0FBQUEsSUFDVCxTQUFTLDRCQUFjO0FBQUEsS0FFdEIsY0FDSCxDQUNGLENBQ0YsQ0FDRjtBQUVKLEdBN0VtRTsiLAogICJuYW1lcyI6IFtdCn0K
