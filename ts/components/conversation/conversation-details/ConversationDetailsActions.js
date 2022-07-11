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
var ConversationDetailsActions_exports = {};
__export(ConversationDetailsActions_exports, {
  ConversationDetailsActions: () => ConversationDetailsActions
});
module.exports = __toCommonJS(ConversationDetailsActions_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_ConfirmationDialog = require("../../ConfirmationDialog");
var import_Tooltip = require("../../Tooltip");
var import_PanelRow = require("./PanelRow");
var import_PanelSection = require("./PanelSection");
var import_ConversationDetailsIcon = require("./ConversationDetailsIcon");
const ConversationDetailsActions = /* @__PURE__ */ __name(({
  cannotLeaveBecauseYouAreLastAdmin,
  conversationTitle,
  i18n,
  isBlocked,
  isGroup,
  left,
  onBlock,
  onLeave,
  onUnblock
}) => {
  const [confirmLeave, gLeave] = (0, import_react.useState)(false);
  const [confirmGroupBlock, gGroupBlock] = (0, import_react.useState)(false);
  const [confirmGroupUnblock, gGroupUnblock] = (0, import_react.useState)(false);
  const [confirmDirectBlock, gDirectBlock] = (0, import_react.useState)(false);
  const [confirmDirectUnblock, gDirectUnblock] = (0, import_react.useState)(false);
  let leaveGroupNode;
  if (isGroup && !left) {
    leaveGroupNode = /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
      disabled: cannotLeaveBecauseYouAreLastAdmin,
      onClick: () => gLeave(true),
      icon: /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
        ariaLabel: i18n("ConversationDetailsActions--leave-group"),
        disabled: cannotLeaveBecauseYouAreLastAdmin,
        icon: import_ConversationDetailsIcon.IconType.leave
      }),
      label: /* @__PURE__ */ import_react.default.createElement("div", {
        className: (0, import_classnames.default)("ConversationDetails__leave-group", cannotLeaveBecauseYouAreLastAdmin && "ConversationDetails__leave-group--disabled")
      }, i18n("ConversationDetailsActions--leave-group"))
    });
    if (cannotLeaveBecauseYouAreLastAdmin) {
      leaveGroupNode = /* @__PURE__ */ import_react.default.createElement(import_Tooltip.Tooltip, {
        content: i18n("ConversationDetailsActions--leave-group-must-choose-new-admin"),
        direction: import_Tooltip.TooltipPlacement.Top
      }, leaveGroupNode);
    }
  }
  let blockNode;
  if (isGroup && !isBlocked) {
    blockNode = /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
      disabled: cannotLeaveBecauseYouAreLastAdmin,
      onClick: () => gGroupBlock(true),
      icon: /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
        ariaLabel: i18n("ConversationDetailsActions--block-group"),
        icon: import_ConversationDetailsIcon.IconType.block
      }),
      label: /* @__PURE__ */ import_react.default.createElement("div", {
        className: "ConversationDetails__block-group"
      }, i18n("ConversationDetailsActions--block-group"))
    });
  } else if (isGroup && isBlocked) {
    blockNode = /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
      onClick: () => gGroupUnblock(true),
      icon: /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
        ariaLabel: i18n("ConversationDetailsActions--unblock-group"),
        icon: import_ConversationDetailsIcon.IconType.unblock
      }),
      label: /* @__PURE__ */ import_react.default.createElement("div", {
        className: "ConversationDetails__unblock-group"
      }, i18n("ConversationDetailsActions--unblock-group"))
    });
  } else {
    const label = isBlocked ? i18n("MessageRequests--unblock") : i18n("MessageRequests--block");
    blockNode = /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
      onClick: () => isBlocked ? gDirectUnblock(true) : gDirectBlock(true),
      icon: /* @__PURE__ */ import_react.default.createElement(import_ConversationDetailsIcon.ConversationDetailsIcon, {
        ariaLabel: label,
        icon: isBlocked ? import_ConversationDetailsIcon.IconType.unblock : import_ConversationDetailsIcon.IconType.block
      }),
      label: /* @__PURE__ */ import_react.default.createElement("div", {
        className: isBlocked ? "ConversationDetails__unblock-group" : "ConversationDetails__block-group"
      }, label)
    });
  }
  if (cannotLeaveBecauseYouAreLastAdmin) {
    blockNode = /* @__PURE__ */ import_react.default.createElement(import_Tooltip.Tooltip, {
      content: i18n("ConversationDetailsActions--leave-group-must-choose-new-admin"),
      direction: import_Tooltip.TooltipPlacement.Top
    }, blockNode);
  }
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_PanelSection.PanelSection, null, leaveGroupNode, blockNode), confirmLeave && /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    actions: [
      {
        text: i18n("ConversationDetailsActions--leave-group-modal-confirm"),
        action: onLeave,
        style: "affirmative"
      }
    ],
    i18n,
    onClose: () => gLeave(false),
    title: i18n("ConversationDetailsActions--leave-group-modal-title")
  }, i18n("ConversationDetailsActions--leave-group-modal-content")), confirmGroupBlock && /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    actions: [
      {
        text: i18n("ConversationDetailsActions--block-group-modal-confirm"),
        action: onBlock,
        style: "affirmative"
      }
    ],
    i18n,
    onClose: () => gGroupBlock(false),
    title: i18n("ConversationDetailsActions--block-group-modal-title", [
      conversationTitle
    ])
  }, i18n("ConversationDetailsActions--block-group-modal-content")), confirmGroupUnblock && /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    actions: [
      {
        text: i18n("ConversationDetailsActions--unblock-group-modal-confirm"),
        action: onUnblock,
        style: "affirmative"
      }
    ],
    i18n,
    onClose: () => gGroupUnblock(false),
    title: i18n("ConversationDetailsActions--unblock-group-modal-title", [
      conversationTitle
    ])
  }, i18n("ConversationDetailsActions--unblock-group-modal-content")), confirmDirectBlock && /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    actions: [
      {
        text: i18n("MessageRequests--block"),
        action: onBlock,
        style: "affirmative"
      }
    ],
    i18n,
    onClose: () => gDirectBlock(false),
    title: i18n("MessageRequests--block-direct-confirm-title", [
      conversationTitle
    ])
  }, i18n("MessageRequests--block-direct-confirm-body")), confirmDirectUnblock && /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    actions: [
      {
        text: i18n("MessageRequests--unblock"),
        action: onUnblock,
        style: "affirmative"
      }
    ],
    i18n,
    onClose: () => gDirectUnblock(false),
    title: i18n("MessageRequests--unblock-direct-confirm-title", [
      conversationTitle
    ])
  }, i18n("MessageRequests--unblock-direct-confirm-body")));
}, "ConversationDetailsActions");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationDetailsActions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uRGV0YWlsc0FjdGlvbnMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgQ29uZmlybWF0aW9uRGlhbG9nIH0gZnJvbSAnLi4vLi4vQ29uZmlybWF0aW9uRGlhbG9nJztcbmltcG9ydCB7IFRvb2x0aXAsIFRvb2x0aXBQbGFjZW1lbnQgfSBmcm9tICcuLi8uLi9Ub29sdGlwJztcblxuaW1wb3J0IHsgUGFuZWxSb3cgfSBmcm9tICcuL1BhbmVsUm93JztcbmltcG9ydCB7IFBhbmVsU2VjdGlvbiB9IGZyb20gJy4vUGFuZWxTZWN0aW9uJztcbmltcG9ydCB7IENvbnZlcnNhdGlvbkRldGFpbHNJY29uLCBJY29uVHlwZSB9IGZyb20gJy4vQ29udmVyc2F0aW9uRGV0YWlsc0ljb24nO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgY2Fubm90TGVhdmVCZWNhdXNlWW91QXJlTGFzdEFkbWluOiBib29sZWFuO1xuICBjb252ZXJzYXRpb25UaXRsZTogc3RyaW5nO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBpc0Jsb2NrZWQ6IGJvb2xlYW47XG4gIGlzR3JvdXA6IGJvb2xlYW47XG4gIGxlZnQ6IGJvb2xlYW47XG4gIG9uQmxvY2s6ICgpID0+IHZvaWQ7XG4gIG9uTGVhdmU6ICgpID0+IHZvaWQ7XG4gIG9uVW5ibG9jazogKCkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBjb25zdCBDb252ZXJzYXRpb25EZXRhaWxzQWN0aW9uczogUmVhY3QuQ29tcG9uZW50VHlwZTxQcm9wcz4gPSAoe1xuICBjYW5ub3RMZWF2ZUJlY2F1c2VZb3VBcmVMYXN0QWRtaW4sXG4gIGNvbnZlcnNhdGlvblRpdGxlLFxuICBpMThuLFxuICBpc0Jsb2NrZWQsXG4gIGlzR3JvdXAsXG4gIGxlZnQsXG4gIG9uQmxvY2ssXG4gIG9uTGVhdmUsXG4gIG9uVW5ibG9jayxcbn0pID0+IHtcbiAgY29uc3QgW2NvbmZpcm1MZWF2ZSwgZ0xlYXZlXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW2NvbmZpcm1Hcm91cEJsb2NrLCBnR3JvdXBCbG9ja10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFtjb25maXJtR3JvdXBVbmJsb2NrLCBnR3JvdXBVbmJsb2NrXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW2NvbmZpcm1EaXJlY3RCbG9jaywgZ0RpcmVjdEJsb2NrXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW2NvbmZpcm1EaXJlY3RVbmJsb2NrLCBnRGlyZWN0VW5ibG9ja10gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG5cbiAgbGV0IGxlYXZlR3JvdXBOb2RlOiBSZWFjdE5vZGU7XG4gIGlmIChpc0dyb3VwICYmICFsZWZ0KSB7XG4gICAgbGVhdmVHcm91cE5vZGUgPSAoXG4gICAgICA8UGFuZWxSb3dcbiAgICAgICAgZGlzYWJsZWQ9e2Nhbm5vdExlYXZlQmVjYXVzZVlvdUFyZUxhc3RBZG1pbn1cbiAgICAgICAgb25DbGljaz17KCkgPT4gZ0xlYXZlKHRydWUpfVxuICAgICAgICBpY29uPXtcbiAgICAgICAgICA8Q29udmVyc2F0aW9uRGV0YWlsc0ljb25cbiAgICAgICAgICAgIGFyaWFMYWJlbD17aTE4bignQ29udmVyc2F0aW9uRGV0YWlsc0FjdGlvbnMtLWxlYXZlLWdyb3VwJyl9XG4gICAgICAgICAgICBkaXNhYmxlZD17Y2Fubm90TGVhdmVCZWNhdXNlWW91QXJlTGFzdEFkbWlufVxuICAgICAgICAgICAgaWNvbj17SWNvblR5cGUubGVhdmV9XG4gICAgICAgICAgLz5cbiAgICAgICAgfVxuICAgICAgICBsYWJlbD17XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAnQ29udmVyc2F0aW9uRGV0YWlsc19fbGVhdmUtZ3JvdXAnLFxuICAgICAgICAgICAgICBjYW5ub3RMZWF2ZUJlY2F1c2VZb3VBcmVMYXN0QWRtaW4gJiZcbiAgICAgICAgICAgICAgICAnQ29udmVyc2F0aW9uRGV0YWlsc19fbGVhdmUtZ3JvdXAtLWRpc2FibGVkJ1xuICAgICAgICAgICAgKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aTE4bignQ29udmVyc2F0aW9uRGV0YWlsc0FjdGlvbnMtLWxlYXZlLWdyb3VwJyl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgIC8+XG4gICAgKTtcbiAgICBpZiAoY2Fubm90TGVhdmVCZWNhdXNlWW91QXJlTGFzdEFkbWluKSB7XG4gICAgICBsZWF2ZUdyb3VwTm9kZSA9IChcbiAgICAgICAgPFRvb2x0aXBcbiAgICAgICAgICBjb250ZW50PXtpMThuKFxuICAgICAgICAgICAgJ0NvbnZlcnNhdGlvbkRldGFpbHNBY3Rpb25zLS1sZWF2ZS1ncm91cC1tdXN0LWNob29zZS1uZXctYWRtaW4nXG4gICAgICAgICAgKX1cbiAgICAgICAgICBkaXJlY3Rpb249e1Rvb2x0aXBQbGFjZW1lbnQuVG9wfVxuICAgICAgICA+XG4gICAgICAgICAge2xlYXZlR3JvdXBOb2RlfVxuICAgICAgICA8L1Rvb2x0aXA+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGxldCBibG9ja05vZGU6IFJlYWN0Tm9kZTtcbiAgaWYgKGlzR3JvdXAgJiYgIWlzQmxvY2tlZCkge1xuICAgIGJsb2NrTm9kZSA9IChcbiAgICAgIDxQYW5lbFJvd1xuICAgICAgICBkaXNhYmxlZD17Y2Fubm90TGVhdmVCZWNhdXNlWW91QXJlTGFzdEFkbWlufVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBnR3JvdXBCbG9jayh0cnVlKX1cbiAgICAgICAgaWNvbj17XG4gICAgICAgICAgPENvbnZlcnNhdGlvbkRldGFpbHNJY29uXG4gICAgICAgICAgICBhcmlhTGFiZWw9e2kxOG4oJ0NvbnZlcnNhdGlvbkRldGFpbHNBY3Rpb25zLS1ibG9jay1ncm91cCcpfVxuICAgICAgICAgICAgaWNvbj17SWNvblR5cGUuYmxvY2t9XG4gICAgICAgICAgLz5cbiAgICAgICAgfVxuICAgICAgICBsYWJlbD17XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb252ZXJzYXRpb25EZXRhaWxzX19ibG9jay1ncm91cFwiPlxuICAgICAgICAgICAge2kxOG4oJ0NvbnZlcnNhdGlvbkRldGFpbHNBY3Rpb25zLS1ibG9jay1ncm91cCcpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAvPlxuICAgICk7XG4gIH0gZWxzZSBpZiAoaXNHcm91cCAmJiBpc0Jsb2NrZWQpIHtcbiAgICBibG9ja05vZGUgPSAoXG4gICAgICA8UGFuZWxSb3dcbiAgICAgICAgb25DbGljaz17KCkgPT4gZ0dyb3VwVW5ibG9jayh0cnVlKX1cbiAgICAgICAgaWNvbj17XG4gICAgICAgICAgPENvbnZlcnNhdGlvbkRldGFpbHNJY29uXG4gICAgICAgICAgICBhcmlhTGFiZWw9e2kxOG4oJ0NvbnZlcnNhdGlvbkRldGFpbHNBY3Rpb25zLS11bmJsb2NrLWdyb3VwJyl9XG4gICAgICAgICAgICBpY29uPXtJY29uVHlwZS51bmJsb2NrfVxuICAgICAgICAgIC8+XG4gICAgICAgIH1cbiAgICAgICAgbGFiZWw9e1xuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29udmVyc2F0aW9uRGV0YWlsc19fdW5ibG9jay1ncm91cFwiPlxuICAgICAgICAgICAge2kxOG4oJ0NvbnZlcnNhdGlvbkRldGFpbHNBY3Rpb25zLS11bmJsb2NrLWdyb3VwJyl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBsYWJlbCA9IGlzQmxvY2tlZFxuICAgICAgPyBpMThuKCdNZXNzYWdlUmVxdWVzdHMtLXVuYmxvY2snKVxuICAgICAgOiBpMThuKCdNZXNzYWdlUmVxdWVzdHMtLWJsb2NrJyk7XG4gICAgYmxvY2tOb2RlID0gKFxuICAgICAgPFBhbmVsUm93XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IChpc0Jsb2NrZWQgPyBnRGlyZWN0VW5ibG9jayh0cnVlKSA6IGdEaXJlY3RCbG9jayh0cnVlKSl9XG4gICAgICAgIGljb249e1xuICAgICAgICAgIDxDb252ZXJzYXRpb25EZXRhaWxzSWNvblxuICAgICAgICAgICAgYXJpYUxhYmVsPXtsYWJlbH1cbiAgICAgICAgICAgIGljb249e2lzQmxvY2tlZCA/IEljb25UeXBlLnVuYmxvY2sgOiBJY29uVHlwZS5ibG9ja31cbiAgICAgICAgICAvPlxuICAgICAgICB9XG4gICAgICAgIGxhYmVsPXtcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgICAgICBpc0Jsb2NrZWRcbiAgICAgICAgICAgICAgICA/ICdDb252ZXJzYXRpb25EZXRhaWxzX191bmJsb2NrLWdyb3VwJ1xuICAgICAgICAgICAgICAgIDogJ0NvbnZlcnNhdGlvbkRldGFpbHNfX2Jsb2NrLWdyb3VwJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgaWYgKGNhbm5vdExlYXZlQmVjYXVzZVlvdUFyZUxhc3RBZG1pbikge1xuICAgIGJsb2NrTm9kZSA9IChcbiAgICAgIDxUb29sdGlwXG4gICAgICAgIGNvbnRlbnQ9e2kxOG4oXG4gICAgICAgICAgJ0NvbnZlcnNhdGlvbkRldGFpbHNBY3Rpb25zLS1sZWF2ZS1ncm91cC1tdXN0LWNob29zZS1uZXctYWRtaW4nXG4gICAgICAgICl9XG4gICAgICAgIGRpcmVjdGlvbj17VG9vbHRpcFBsYWNlbWVudC5Ub3B9XG4gICAgICA+XG4gICAgICAgIHtibG9ja05vZGV9XG4gICAgICA8L1Rvb2x0aXA+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxQYW5lbFNlY3Rpb24+XG4gICAgICAgIHtsZWF2ZUdyb3VwTm9kZX1cbiAgICAgICAge2Jsb2NrTm9kZX1cbiAgICAgIDwvUGFuZWxTZWN0aW9uPlxuICAgICAge2NvbmZpcm1MZWF2ZSAmJiAoXG4gICAgICAgIDxDb25maXJtYXRpb25EaWFsb2dcbiAgICAgICAgICBhY3Rpb25zPXtbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IGkxOG4oXG4gICAgICAgICAgICAgICAgJ0NvbnZlcnNhdGlvbkRldGFpbHNBY3Rpb25zLS1sZWF2ZS1ncm91cC1tb2RhbC1jb25maXJtJ1xuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBhY3Rpb246IG9uTGVhdmUsXG4gICAgICAgICAgICAgIHN0eWxlOiAnYWZmaXJtYXRpdmUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gZ0xlYXZlKGZhbHNlKX1cbiAgICAgICAgICB0aXRsZT17aTE4bignQ29udmVyc2F0aW9uRGV0YWlsc0FjdGlvbnMtLWxlYXZlLWdyb3VwLW1vZGFsLXRpdGxlJyl9XG4gICAgICAgID5cbiAgICAgICAgICB7aTE4bignQ29udmVyc2F0aW9uRGV0YWlsc0FjdGlvbnMtLWxlYXZlLWdyb3VwLW1vZGFsLWNvbnRlbnQnKX1cbiAgICAgICAgPC9Db25maXJtYXRpb25EaWFsb2c+XG4gICAgICApfVxuXG4gICAgICB7Y29uZmlybUdyb3VwQmxvY2sgJiYgKFxuICAgICAgICA8Q29uZmlybWF0aW9uRGlhbG9nXG4gICAgICAgICAgYWN0aW9ucz17W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiBpMThuKFxuICAgICAgICAgICAgICAgICdDb252ZXJzYXRpb25EZXRhaWxzQWN0aW9ucy0tYmxvY2stZ3JvdXAtbW9kYWwtY29uZmlybSdcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgYWN0aW9uOiBvbkJsb2NrLFxuICAgICAgICAgICAgICBzdHlsZTogJ2FmZmlybWF0aXZlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXX1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IGdHcm91cEJsb2NrKGZhbHNlKX1cbiAgICAgICAgICB0aXRsZT17aTE4bignQ29udmVyc2F0aW9uRGV0YWlsc0FjdGlvbnMtLWJsb2NrLWdyb3VwLW1vZGFsLXRpdGxlJywgW1xuICAgICAgICAgICAgY29udmVyc2F0aW9uVGl0bGUsXG4gICAgICAgICAgXSl9XG4gICAgICAgID5cbiAgICAgICAgICB7aTE4bignQ29udmVyc2F0aW9uRGV0YWlsc0FjdGlvbnMtLWJsb2NrLWdyb3VwLW1vZGFsLWNvbnRlbnQnKX1cbiAgICAgICAgPC9Db25maXJtYXRpb25EaWFsb2c+XG4gICAgICApfVxuICAgICAge2NvbmZpcm1Hcm91cFVuYmxvY2sgJiYgKFxuICAgICAgICA8Q29uZmlybWF0aW9uRGlhbG9nXG4gICAgICAgICAgYWN0aW9ucz17W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiBpMThuKFxuICAgICAgICAgICAgICAgICdDb252ZXJzYXRpb25EZXRhaWxzQWN0aW9ucy0tdW5ibG9jay1ncm91cC1tb2RhbC1jb25maXJtJ1xuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBhY3Rpb246IG9uVW5ibG9jayxcbiAgICAgICAgICAgICAgc3R5bGU6ICdhZmZpcm1hdGl2ZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF19XG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBnR3JvdXBVbmJsb2NrKGZhbHNlKX1cbiAgICAgICAgICB0aXRsZT17aTE4bignQ29udmVyc2F0aW9uRGV0YWlsc0FjdGlvbnMtLXVuYmxvY2stZ3JvdXAtbW9kYWwtdGl0bGUnLCBbXG4gICAgICAgICAgICBjb252ZXJzYXRpb25UaXRsZSxcbiAgICAgICAgICBdKX1cbiAgICAgICAgPlxuICAgICAgICAgIHtpMThuKCdDb252ZXJzYXRpb25EZXRhaWxzQWN0aW9ucy0tdW5ibG9jay1ncm91cC1tb2RhbC1jb250ZW50Jyl9XG4gICAgICAgIDwvQ29uZmlybWF0aW9uRGlhbG9nPlxuICAgICAgKX1cblxuICAgICAge2NvbmZpcm1EaXJlY3RCbG9jayAmJiAoXG4gICAgICAgIDxDb25maXJtYXRpb25EaWFsb2dcbiAgICAgICAgICBhY3Rpb25zPXtbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6IGkxOG4oJ01lc3NhZ2VSZXF1ZXN0cy0tYmxvY2snKSxcbiAgICAgICAgICAgICAgYWN0aW9uOiBvbkJsb2NrLFxuICAgICAgICAgICAgICBzdHlsZTogJ2FmZmlybWF0aXZlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXX1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IGdEaXJlY3RCbG9jayhmYWxzZSl9XG4gICAgICAgICAgdGl0bGU9e2kxOG4oJ01lc3NhZ2VSZXF1ZXN0cy0tYmxvY2stZGlyZWN0LWNvbmZpcm0tdGl0bGUnLCBbXG4gICAgICAgICAgICBjb252ZXJzYXRpb25UaXRsZSxcbiAgICAgICAgICBdKX1cbiAgICAgICAgPlxuICAgICAgICAgIHtpMThuKCdNZXNzYWdlUmVxdWVzdHMtLWJsb2NrLWRpcmVjdC1jb25maXJtLWJvZHknKX1cbiAgICAgICAgPC9Db25maXJtYXRpb25EaWFsb2c+XG4gICAgICApfVxuICAgICAge2NvbmZpcm1EaXJlY3RVbmJsb2NrICYmIChcbiAgICAgICAgPENvbmZpcm1hdGlvbkRpYWxvZ1xuICAgICAgICAgIGFjdGlvbnM9e1tcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogaTE4bignTWVzc2FnZVJlcXVlc3RzLS11bmJsb2NrJyksXG4gICAgICAgICAgICAgIGFjdGlvbjogb25VbmJsb2NrLFxuICAgICAgICAgICAgICBzdHlsZTogJ2FmZmlybWF0aXZlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXX1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IGdEaXJlY3RVbmJsb2NrKGZhbHNlKX1cbiAgICAgICAgICB0aXRsZT17aTE4bignTWVzc2FnZVJlcXVlc3RzLS11bmJsb2NrLWRpcmVjdC1jb25maXJtLXRpdGxlJywgW1xuICAgICAgICAgICAgY29udmVyc2F0aW9uVGl0bGUsXG4gICAgICAgICAgXSl9XG4gICAgICAgID5cbiAgICAgICAgICB7aTE4bignTWVzc2FnZVJlcXVlc3RzLS11bmJsb2NrLWRpcmVjdC1jb25maXJtLWJvZHknKX1cbiAgICAgICAgPC9Db25maXJtYXRpb25EaWFsb2c+XG4gICAgICApfVxuICAgIDwvPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBZ0M7QUFDaEMsd0JBQXVCO0FBR3ZCLGdDQUFtQztBQUNuQyxxQkFBMEM7QUFFMUMsc0JBQXlCO0FBQ3pCLDBCQUE2QjtBQUM3QixxQ0FBa0Q7QUFjM0MsTUFBTSw2QkFBeUQsd0JBQUM7QUFBQSxFQUNyRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDSTtBQUNKLFFBQU0sQ0FBQyxjQUFjLFVBQVUsMkJBQWtCLEtBQUs7QUFDdEQsUUFBTSxDQUFDLG1CQUFtQixlQUFlLDJCQUFrQixLQUFLO0FBQ2hFLFFBQU0sQ0FBQyxxQkFBcUIsaUJBQWlCLDJCQUFrQixLQUFLO0FBQ3BFLFFBQU0sQ0FBQyxvQkFBb0IsZ0JBQWdCLDJCQUFrQixLQUFLO0FBQ2xFLFFBQU0sQ0FBQyxzQkFBc0Isa0JBQWtCLDJCQUFrQixLQUFLO0FBRXRFLE1BQUk7QUFDSixNQUFJLFdBQVcsQ0FBQyxNQUFNO0FBQ3BCLHFCQUNFLG1EQUFDO0FBQUEsTUFDQyxVQUFVO0FBQUEsTUFDVixTQUFTLE1BQU0sT0FBTyxJQUFJO0FBQUEsTUFDMUIsTUFDRSxtREFBQztBQUFBLFFBQ0MsV0FBVyxLQUFLLHlDQUF5QztBQUFBLFFBQ3pELFVBQVU7QUFBQSxRQUNWLE1BQU0sd0NBQVM7QUFBQSxPQUNqQjtBQUFBLE1BRUYsT0FDRSxtREFBQztBQUFBLFFBQ0MsV0FBVywrQkFDVCxvQ0FDQSxxQ0FDRSw0Q0FDSjtBQUFBLFNBRUMsS0FBSyx5Q0FBeUMsQ0FDakQ7QUFBQSxLQUVKO0FBRUYsUUFBSSxtQ0FBbUM7QUFDckMsdUJBQ0UsbURBQUM7QUFBQSxRQUNDLFNBQVMsS0FDUCwrREFDRjtBQUFBLFFBQ0EsV0FBVyxnQ0FBaUI7QUFBQSxTQUUzQixjQUNIO0FBQUEsSUFFSjtBQUFBLEVBQ0Y7QUFFQSxNQUFJO0FBQ0osTUFBSSxXQUFXLENBQUMsV0FBVztBQUN6QixnQkFDRSxtREFBQztBQUFBLE1BQ0MsVUFBVTtBQUFBLE1BQ1YsU0FBUyxNQUFNLFlBQVksSUFBSTtBQUFBLE1BQy9CLE1BQ0UsbURBQUM7QUFBQSxRQUNDLFdBQVcsS0FBSyx5Q0FBeUM7QUFBQSxRQUN6RCxNQUFNLHdDQUFTO0FBQUEsT0FDakI7QUFBQSxNQUVGLE9BQ0UsbURBQUM7QUFBQSxRQUFJLFdBQVU7QUFBQSxTQUNaLEtBQUsseUNBQXlDLENBQ2pEO0FBQUEsS0FFSjtBQUFBLEVBRUosV0FBVyxXQUFXLFdBQVc7QUFDL0IsZ0JBQ0UsbURBQUM7QUFBQSxNQUNDLFNBQVMsTUFBTSxjQUFjLElBQUk7QUFBQSxNQUNqQyxNQUNFLG1EQUFDO0FBQUEsUUFDQyxXQUFXLEtBQUssMkNBQTJDO0FBQUEsUUFDM0QsTUFBTSx3Q0FBUztBQUFBLE9BQ2pCO0FBQUEsTUFFRixPQUNFLG1EQUFDO0FBQUEsUUFBSSxXQUFVO0FBQUEsU0FDWixLQUFLLDJDQUEyQyxDQUNuRDtBQUFBLEtBRUo7QUFBQSxFQUVKLE9BQU87QUFDTCxVQUFNLFFBQVEsWUFDVixLQUFLLDBCQUEwQixJQUMvQixLQUFLLHdCQUF3QjtBQUNqQyxnQkFDRSxtREFBQztBQUFBLE1BQ0MsU0FBUyxNQUFPLFlBQVksZUFBZSxJQUFJLElBQUksYUFBYSxJQUFJO0FBQUEsTUFDcEUsTUFDRSxtREFBQztBQUFBLFFBQ0MsV0FBVztBQUFBLFFBQ1gsTUFBTSxZQUFZLHdDQUFTLFVBQVUsd0NBQVM7QUFBQSxPQUNoRDtBQUFBLE1BRUYsT0FDRSxtREFBQztBQUFBLFFBQ0MsV0FDRSxZQUNJLHVDQUNBO0FBQUEsU0FHTCxLQUNIO0FBQUEsS0FFSjtBQUFBLEVBRUo7QUFFQSxNQUFJLG1DQUFtQztBQUNyQyxnQkFDRSxtREFBQztBQUFBLE1BQ0MsU0FBUyxLQUNQLCtEQUNGO0FBQUEsTUFDQSxXQUFXLGdDQUFpQjtBQUFBLE9BRTNCLFNBQ0g7QUFBQSxFQUVKO0FBRUEsU0FDRSx3RkFDRSxtREFBQyx3Q0FDRSxnQkFDQSxTQUNILEdBQ0MsZ0JBQ0MsbURBQUM7QUFBQSxJQUNDLFNBQVM7QUFBQSxNQUNQO0FBQUEsUUFDRSxNQUFNLEtBQ0osdURBQ0Y7QUFBQSxRQUNBLFFBQVE7QUFBQSxRQUNSLE9BQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxJQUNBLFNBQVMsTUFBTSxPQUFPLEtBQUs7QUFBQSxJQUMzQixPQUFPLEtBQUsscURBQXFEO0FBQUEsS0FFaEUsS0FBSyx1REFBdUQsQ0FDL0QsR0FHRCxxQkFDQyxtREFBQztBQUFBLElBQ0MsU0FBUztBQUFBLE1BQ1A7QUFBQSxRQUNFLE1BQU0sS0FDSix1REFDRjtBQUFBLFFBQ0EsUUFBUTtBQUFBLFFBQ1IsT0FBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLElBQ0EsU0FBUyxNQUFNLFlBQVksS0FBSztBQUFBLElBQ2hDLE9BQU8sS0FBSyx1REFBdUQ7QUFBQSxNQUNqRTtBQUFBLElBQ0YsQ0FBQztBQUFBLEtBRUEsS0FBSyx1REFBdUQsQ0FDL0QsR0FFRCx1QkFDQyxtREFBQztBQUFBLElBQ0MsU0FBUztBQUFBLE1BQ1A7QUFBQSxRQUNFLE1BQU0sS0FDSix5REFDRjtBQUFBLFFBQ0EsUUFBUTtBQUFBLFFBQ1IsT0FBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLElBQ0EsU0FBUyxNQUFNLGNBQWMsS0FBSztBQUFBLElBQ2xDLE9BQU8sS0FBSyx5REFBeUQ7QUFBQSxNQUNuRTtBQUFBLElBQ0YsQ0FBQztBQUFBLEtBRUEsS0FBSyx5REFBeUQsQ0FDakUsR0FHRCxzQkFDQyxtREFBQztBQUFBLElBQ0MsU0FBUztBQUFBLE1BQ1A7QUFBQSxRQUNFLE1BQU0sS0FBSyx3QkFBd0I7QUFBQSxRQUNuQyxRQUFRO0FBQUEsUUFDUixPQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsSUFDQSxTQUFTLE1BQU0sYUFBYSxLQUFLO0FBQUEsSUFDakMsT0FBTyxLQUFLLCtDQUErQztBQUFBLE1BQ3pEO0FBQUEsSUFDRixDQUFDO0FBQUEsS0FFQSxLQUFLLDRDQUE0QyxDQUNwRCxHQUVELHdCQUNDLG1EQUFDO0FBQUEsSUFDQyxTQUFTO0FBQUEsTUFDUDtBQUFBLFFBQ0UsTUFBTSxLQUFLLDBCQUEwQjtBQUFBLFFBQ3JDLFFBQVE7QUFBQSxRQUNSLE9BQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxJQUNBLFNBQVMsTUFBTSxlQUFlLEtBQUs7QUFBQSxJQUNuQyxPQUFPLEtBQUssaURBQWlEO0FBQUEsTUFDM0Q7QUFBQSxJQUNGLENBQUM7QUFBQSxLQUVBLEtBQUssOENBQThDLENBQ3RELENBRUo7QUFFSixHQTlPc0U7IiwKICAibmFtZXMiOiBbXQp9Cg==
