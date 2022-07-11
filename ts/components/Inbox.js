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
var Inbox_exports = {};
__export(Inbox_exports, {
  Inbox: () => Inbox
});
module.exports = __toCommonJS(Inbox_exports);
var import_react = __toESM(require("react"));
var log = __toESM(require("../logging/log"));
var import_durations = require("../util/durations");
var import_SafetyNumberChangeDialog = require("./SafetyNumberChangeDialog");
var import_ToastStickerPackInstallFailed = require("./ToastStickerPackInstallFailed");
var import_WhatsNewLink = require("./WhatsNewLink");
var import_showToast = require("../util/showToast");
var import_assert = require("../util/assert");
const Inbox = /* @__PURE__ */ __name(({
  cancelConversationVerification,
  conversationsStoppingSend,
  hasInitialLoadCompleted,
  getPreferredBadge,
  i18n,
  isCustomizingPreferredReactions,
  renderCustomizingPreferredReactionsModal,
  renderLeftPane,
  renderSafetyNumber,
  selectedConversationId,
  selectedMessage,
  showConversation,
  showWhatsNewModal,
  theme,
  verifyConversationsStoppingSend
}) => {
  const [loadingMessageCount, setLoadingMessageCount] = (0, import_react.useState)(0);
  const [internalHasInitialLoadCompleted, setInternalHasInitialLoadCompleted] = (0, import_react.useState)(hasInitialLoadCompleted);
  const conversationMountRef = (0, import_react.useRef)(null);
  const conversationViewRef = (0, import_react.useRef)(null);
  const [prevConversation, setPrevConversation] = (0, import_react.useState)();
  (0, import_react.useEffect)(() => {
    if (!selectedConversationId) {
      return;
    }
    const conversation = window.ConversationController.get(selectedConversationId);
    (0, import_assert.strictAssert)(conversation, "Conversation must be found");
    conversation.setMarkedUnread(false);
    if (!prevConversation || prevConversation.id !== selectedConversationId) {
      const viewMountNode = document.createElement("div");
      conversationMountRef.current?.appendChild(viewMountNode);
      if (prevConversation) {
        prevConversation.trigger("unload", "opened another conversation");
      }
      conversationViewRef.current?.remove();
      const view = new window.Whisper.ConversationView({
        el: viewMountNode,
        model: conversation
      });
      conversationViewRef.current = view;
      setPrevConversation(conversation);
      conversation.trigger("opened", selectedMessage);
    } else if (selectedMessage) {
      conversation.trigger("scroll-to-message", selectedMessage);
    }
    window.dispatchEvent(new Event("resize"));
  }, [prevConversation, selectedConversationId, selectedMessage]);
  (0, import_react.useEffect)(() => {
    if (prevConversation && !selectedConversationId) {
      setPrevConversation(void 0);
    }
  }, [prevConversation, selectedConversationId]);
  (0, import_react.useEffect)(() => {
    function refreshConversation({
      newId,
      oldId
    }) {
      if (prevConversation && prevConversation.get("id") === oldId) {
        showConversation({ conversationId: newId });
      }
    }
    function unload() {
      if (!prevConversation) {
        return;
      }
      prevConversation.trigger("unload", "force unload requested");
    }
    function onShowConversation(id, messageId) {
      showConversation({ conversationId: id, messageId });
    }
    function packInstallFailed() {
      (0, import_showToast.showToast)(import_ToastStickerPackInstallFailed.ToastStickerPackInstallFailed);
    }
    window.Whisper.events.on("loadingProgress", setLoadingMessageCount);
    window.Whisper.events.on("pack-install-failed", packInstallFailed);
    window.Whisper.events.on("refreshConversation", refreshConversation);
    window.Whisper.events.on("setupAsNewDevice", unload);
    window.Whisper.events.on("showConversation", onShowConversation);
    return () => {
      window.Whisper.events.off("loadingProgress", setLoadingMessageCount);
      window.Whisper.events.off("pack-install-failed", packInstallFailed);
      window.Whisper.events.off("refreshConversation", refreshConversation);
      window.Whisper.events.off("setupAsNewDevice", unload);
      window.Whisper.events.off("showConversation", onShowConversation);
    };
  }, [prevConversation, showConversation]);
  (0, import_react.useEffect)(() => {
    if (internalHasInitialLoadCompleted) {
      return;
    }
    const interval = setInterval(() => {
      const status = window.getSocketStatus();
      switch (status) {
        case "CONNECTING":
          break;
        case "OPEN":
          clearInterval(interval);
          break;
        case "CLOSING":
        case "CLOSED":
          clearInterval(interval);
          setInternalHasInitialLoadCompleted(true);
          break;
        default:
          log.warn(`startConnectionListener: Found unexpected socket status ${status}; setting load to done manually.`);
          setInternalHasInitialLoadCompleted(true);
          break;
      }
    }, import_durations.SECOND);
    return () => {
      clearInterval(interval);
    };
  }, [internalHasInitialLoadCompleted]);
  (0, import_react.useEffect)(() => {
    setInternalHasInitialLoadCompleted(hasInitialLoadCompleted);
  }, [hasInitialLoadCompleted]);
  if (!internalHasInitialLoadCompleted) {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "app-loading-screen"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-title-bar-drag-area"
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "content"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-splash-screen__logo module-img--150"
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "container"
    }, /* @__PURE__ */ import_react.default.createElement("span", {
      className: "dot"
    }), /* @__PURE__ */ import_react.default.createElement("span", {
      className: "dot"
    }), /* @__PURE__ */ import_react.default.createElement("span", {
      className: "dot"
    })), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "message"
    }, loadingMessageCount ? i18n("loadingMessages", [String(loadingMessageCount)]) : i18n("loading"))));
  }
  let activeModal;
  if (conversationsStoppingSend.length) {
    activeModal = /* @__PURE__ */ import_react.default.createElement(import_SafetyNumberChangeDialog.SafetyNumberChangeDialog, {
      confirmText: i18n("safetyNumberChangeDialog__pending-messages"),
      contacts: conversationsStoppingSend,
      getPreferredBadge,
      i18n,
      onCancel: cancelConversationVerification,
      onConfirm: verifyConversationsStoppingSend,
      renderSafetyNumber,
      theme
    });
  }
  if (!activeModal && isCustomizingPreferredReactions) {
    activeModal = renderCustomizingPreferredReactionsModal();
  }
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Inbox"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-title-bar-drag-area"
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "left-pane-wrapper"
  }, renderLeftPane()), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "conversation-stack"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    id: "toast"
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "conversation",
    ref: conversationMountRef
  }), !prevConversation && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "no-conversation-open"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-splash-screen__logo module-img--128 module-logo-blue"
  }), /* @__PURE__ */ import_react.default.createElement("h3", null, i18n("welcomeToSignal")), /* @__PURE__ */ import_react.default.createElement("p", {
    className: "whats-new-placeholder"
  }, /* @__PURE__ */ import_react.default.createElement(import_WhatsNewLink.WhatsNewLink, {
    i18n,
    showWhatsNewModal
  }))))), activeModal);
}, "Inbox");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Inbox
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW5ib3gudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25Nb2RlbCB9IGZyb20gJy4uL21vZGVscy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHtcbiAgQ29udmVyc2F0aW9uVHlwZSxcbiAgU2hvd0NvbnZlcnNhdGlvblR5cGUsXG59IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25WaWV3IH0gZnJvbSAnLi4vdmlld3MvY29udmVyc2F0aW9uX3ZpZXcnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlLCBUaGVtZVR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgUHJlZmVycmVkQmFkZ2VTZWxlY3RvclR5cGUgfSBmcm9tICcuLi9zdGF0ZS9zZWxlY3RvcnMvYmFkZ2VzJztcbmltcG9ydCB0eXBlIHsgU2FmZXR5TnVtYmVyUHJvcHMgfSBmcm9tICcuL1NhZmV0eU51bWJlckNoYW5nZURpYWxvZyc7XG5cbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgeyBTRUNPTkQgfSBmcm9tICcuLi91dGlsL2R1cmF0aW9ucyc7XG5pbXBvcnQgeyBTYWZldHlOdW1iZXJDaGFuZ2VEaWFsb2cgfSBmcm9tICcuL1NhZmV0eU51bWJlckNoYW5nZURpYWxvZyc7XG5pbXBvcnQgeyBUb2FzdFN0aWNrZXJQYWNrSW5zdGFsbEZhaWxlZCB9IGZyb20gJy4vVG9hc3RTdGlja2VyUGFja0luc3RhbGxGYWlsZWQnO1xuaW1wb3J0IHsgV2hhdHNOZXdMaW5rIH0gZnJvbSAnLi9XaGF0c05ld0xpbmsnO1xuaW1wb3J0IHsgc2hvd1RvYXN0IH0gZnJvbSAnLi4vdXRpbC9zaG93VG9hc3QnO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGNhbmNlbENvbnZlcnNhdGlvblZlcmlmaWNhdGlvbjogKCkgPT4gdm9pZDtcbiAgY29udmVyc2F0aW9uc1N0b3BwaW5nU2VuZDogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT47XG4gIGhhc0luaXRpYWxMb2FkQ29tcGxldGVkOiBib29sZWFuO1xuICBnZXRQcmVmZXJyZWRCYWRnZTogUHJlZmVycmVkQmFkZ2VTZWxlY3RvclR5cGU7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIGlzQ3VzdG9taXppbmdQcmVmZXJyZWRSZWFjdGlvbnM6IGJvb2xlYW47XG4gIHJlbmRlckN1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zTW9kYWw6ICgpID0+IEpTWC5FbGVtZW50O1xuICByZW5kZXJMZWZ0UGFuZTogKCkgPT4gSlNYLkVsZW1lbnQ7XG4gIHJlbmRlclNhZmV0eU51bWJlcjogKHByb3BzOiBTYWZldHlOdW1iZXJQcm9wcykgPT4gSlNYLkVsZW1lbnQ7XG4gIHNlbGVjdGVkQ29udmVyc2F0aW9uSWQ/OiBzdHJpbmc7XG4gIHNlbGVjdGVkTWVzc2FnZT86IHN0cmluZztcbiAgc2hvd0NvbnZlcnNhdGlvbjogU2hvd0NvbnZlcnNhdGlvblR5cGU7XG4gIHNob3dXaGF0c05ld01vZGFsOiAoKSA9PiB1bmtub3duO1xuICB0aGVtZTogVGhlbWVUeXBlO1xuICB2ZXJpZnlDb252ZXJzYXRpb25zU3RvcHBpbmdTZW5kOiAoKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGNvbnN0IEluYm94ID0gKHtcbiAgY2FuY2VsQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uLFxuICBjb252ZXJzYXRpb25zU3RvcHBpbmdTZW5kLFxuICBoYXNJbml0aWFsTG9hZENvbXBsZXRlZCxcbiAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gIGkxOG4sXG4gIGlzQ3VzdG9taXppbmdQcmVmZXJyZWRSZWFjdGlvbnMsXG4gIHJlbmRlckN1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zTW9kYWwsXG4gIHJlbmRlckxlZnRQYW5lLFxuICByZW5kZXJTYWZldHlOdW1iZXIsXG4gIHNlbGVjdGVkQ29udmVyc2F0aW9uSWQsXG4gIHNlbGVjdGVkTWVzc2FnZSxcbiAgc2hvd0NvbnZlcnNhdGlvbixcbiAgc2hvd1doYXRzTmV3TW9kYWwsXG4gIHRoZW1lLFxuICB2ZXJpZnlDb252ZXJzYXRpb25zU3RvcHBpbmdTZW5kLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBbbG9hZGluZ01lc3NhZ2VDb3VudCwgc2V0TG9hZGluZ01lc3NhZ2VDb3VudF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2ludGVybmFsSGFzSW5pdGlhbExvYWRDb21wbGV0ZWQsIHNldEludGVybmFsSGFzSW5pdGlhbExvYWRDb21wbGV0ZWRdID1cbiAgICB1c2VTdGF0ZShoYXNJbml0aWFsTG9hZENvbXBsZXRlZCk7XG5cbiAgY29uc3QgY29udmVyc2F0aW9uTW91bnRSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgY29udmVyc2F0aW9uVmlld1JlZiA9IHVzZVJlZjxDb252ZXJzYXRpb25WaWV3IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgW3ByZXZDb252ZXJzYXRpb24sIHNldFByZXZDb252ZXJzYXRpb25dID0gdXNlU3RhdGU8XG4gICAgQ29udmVyc2F0aW9uTW9kZWwgfCB1bmRlZmluZWRcbiAgPigpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFzZWxlY3RlZENvbnZlcnNhdGlvbklkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KFxuICAgICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZFxuICAgICk7XG4gICAgc3RyaWN0QXNzZXJ0KGNvbnZlcnNhdGlvbiwgJ0NvbnZlcnNhdGlvbiBtdXN0IGJlIGZvdW5kJyk7XG5cbiAgICBjb252ZXJzYXRpb24uc2V0TWFya2VkVW5yZWFkKGZhbHNlKTtcblxuICAgIGlmICghcHJldkNvbnZlcnNhdGlvbiB8fCBwcmV2Q29udmVyc2F0aW9uLmlkICE9PSBzZWxlY3RlZENvbnZlcnNhdGlvbklkKSB7XG4gICAgICAvLyBXZSBjcmVhdGUgYSBtb3VudCBwb2ludCBiZWNhdXNlIHdoZW4gY2FsbGluZyAucmVtb3ZlKCkgb24gdGhlIEJhY2tib25lXG4gICAgICAvLyB2aWV3IGl0J2xsIGFsc28gcmVtb3ZlIHRoZSBtb3VudCBwb2ludCBhbG9uZyB3aXRoIGl0LlxuICAgICAgY29uc3Qgdmlld01vdW50Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29udmVyc2F0aW9uTW91bnRSZWYuY3VycmVudD8uYXBwZW5kQ2hpbGQodmlld01vdW50Tm9kZSk7XG5cbiAgICAgIC8vIE1ha2Ugc3VyZSB0byB1bmxvYWQgdGhlIHByZXZpb3VzIGNvbnZlcnNhdGlvbiBhbG9uZyB3aXRoIGNhbGxpbmdcbiAgICAgIC8vIEJhY2tib25lJ3MgcmVtb3ZlIHNvIHRoYXQgaXQgaXMgdGFrZW4gb3V0IG9mIHRoZSBET00uXG4gICAgICBpZiAocHJldkNvbnZlcnNhdGlvbikge1xuICAgICAgICBwcmV2Q29udmVyc2F0aW9uLnRyaWdnZXIoJ3VubG9hZCcsICdvcGVuZWQgYW5vdGhlciBjb252ZXJzYXRpb24nKTtcbiAgICAgIH1cbiAgICAgIGNvbnZlcnNhdGlvblZpZXdSZWYuY3VycmVudD8ucmVtb3ZlKCk7XG5cbiAgICAgIC8vIENhbid0IGltcG9ydCBDb252ZXJzYXRpb25WaWV3IGRpcmVjdGx5IGJlY2F1c2UgY29udmVyc2F0aW9uX3ZpZXdcbiAgICAgIC8vIG5lZWRzIGFjY2VzcyB0byB3aW5kb3cuU2lnbmFsIGZpcnN0LlxuICAgICAgY29uc3QgdmlldyA9IG5ldyB3aW5kb3cuV2hpc3Blci5Db252ZXJzYXRpb25WaWV3KHtcbiAgICAgICAgZWw6IHZpZXdNb3VudE5vZGUsXG4gICAgICAgIG1vZGVsOiBjb252ZXJzYXRpb24sXG4gICAgICB9KTtcbiAgICAgIGNvbnZlcnNhdGlvblZpZXdSZWYuY3VycmVudCA9IHZpZXc7XG5cbiAgICAgIHNldFByZXZDb252ZXJzYXRpb24oY29udmVyc2F0aW9uKTtcblxuICAgICAgY29udmVyc2F0aW9uLnRyaWdnZXIoJ29wZW5lZCcsIHNlbGVjdGVkTWVzc2FnZSk7XG4gICAgfSBlbHNlIGlmIChzZWxlY3RlZE1lc3NhZ2UpIHtcbiAgICAgIGNvbnZlcnNhdGlvbi50cmlnZ2VyKCdzY3JvbGwtdG8tbWVzc2FnZScsIHNlbGVjdGVkTWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHBvcHBlcnMgYXJlIHBvc2l0aW9uZWQgcHJvcGVybHlcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3Jlc2l6ZScpKTtcbiAgfSwgW3ByZXZDb252ZXJzYXRpb24sIHNlbGVjdGVkQ29udmVyc2F0aW9uSWQsIHNlbGVjdGVkTWVzc2FnZV0pO1xuXG4gIC8vIFdoZW5ldmVyIHRoZSBzZWxlY3RlZENvbnZlcnNhdGlvbklkIGlzIGNsZWFyZWQgd2Ugc2hvdWxkIGFsc28gZW5zdXJlXG4gIC8vIHRoYXQgcHJldkNvbnZlcnNhdGlvbiBpcyBjbGVhcmVkIHRvby5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocHJldkNvbnZlcnNhdGlvbiAmJiAhc2VsZWN0ZWRDb252ZXJzYXRpb25JZCkge1xuICAgICAgc2V0UHJldkNvbnZlcnNhdGlvbih1bmRlZmluZWQpO1xuICAgIH1cbiAgfSwgW3ByZXZDb252ZXJzYXRpb24sIHNlbGVjdGVkQ29udmVyc2F0aW9uSWRdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGZ1bmN0aW9uIHJlZnJlc2hDb252ZXJzYXRpb24oe1xuICAgICAgbmV3SWQsXG4gICAgICBvbGRJZCxcbiAgICB9OiB7XG4gICAgICBuZXdJZDogc3RyaW5nO1xuICAgICAgb2xkSWQ6IHN0cmluZztcbiAgICB9KSB7XG4gICAgICBpZiAocHJldkNvbnZlcnNhdGlvbiAmJiBwcmV2Q29udmVyc2F0aW9uLmdldCgnaWQnKSA9PT0gb2xkSWQpIHtcbiAgICAgICAgc2hvd0NvbnZlcnNhdGlvbih7IGNvbnZlcnNhdGlvbklkOiBuZXdJZCB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDbG9zZSBjdXJyZW50IG9wZW5lZCBjb252ZXJzYXRpb24gdG8gcmVsb2FkIHRoZSBncm91cCBpbmZvcm1hdGlvbiBvbmNlXG4gICAgLy8gbGlua2VkLlxuICAgIGZ1bmN0aW9uIHVubG9hZCgpIHtcbiAgICAgIGlmICghcHJldkNvbnZlcnNhdGlvbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBwcmV2Q29udmVyc2F0aW9uLnRyaWdnZXIoJ3VubG9hZCcsICdmb3JjZSB1bmxvYWQgcmVxdWVzdGVkJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25TaG93Q29udmVyc2F0aW9uKGlkOiBzdHJpbmcsIG1lc3NhZ2VJZD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgc2hvd0NvbnZlcnNhdGlvbih7IGNvbnZlcnNhdGlvbklkOiBpZCwgbWVzc2FnZUlkIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhY2tJbnN0YWxsRmFpbGVkKCkge1xuICAgICAgc2hvd1RvYXN0KFRvYXN0U3RpY2tlclBhY2tJbnN0YWxsRmFpbGVkKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuV2hpc3Blci5ldmVudHMub24oJ2xvYWRpbmdQcm9ncmVzcycsIHNldExvYWRpbmdNZXNzYWdlQ291bnQpO1xuICAgIHdpbmRvdy5XaGlzcGVyLmV2ZW50cy5vbigncGFjay1pbnN0YWxsLWZhaWxlZCcsIHBhY2tJbnN0YWxsRmFpbGVkKTtcbiAgICB3aW5kb3cuV2hpc3Blci5ldmVudHMub24oJ3JlZnJlc2hDb252ZXJzYXRpb24nLCByZWZyZXNoQ29udmVyc2F0aW9uKTtcbiAgICB3aW5kb3cuV2hpc3Blci5ldmVudHMub24oJ3NldHVwQXNOZXdEZXZpY2UnLCB1bmxvYWQpO1xuICAgIHdpbmRvdy5XaGlzcGVyLmV2ZW50cy5vbignc2hvd0NvbnZlcnNhdGlvbicsIG9uU2hvd0NvbnZlcnNhdGlvbik7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LldoaXNwZXIuZXZlbnRzLm9mZignbG9hZGluZ1Byb2dyZXNzJywgc2V0TG9hZGluZ01lc3NhZ2VDb3VudCk7XG4gICAgICB3aW5kb3cuV2hpc3Blci5ldmVudHMub2ZmKCdwYWNrLWluc3RhbGwtZmFpbGVkJywgcGFja0luc3RhbGxGYWlsZWQpO1xuICAgICAgd2luZG93LldoaXNwZXIuZXZlbnRzLm9mZigncmVmcmVzaENvbnZlcnNhdGlvbicsIHJlZnJlc2hDb252ZXJzYXRpb24pO1xuICAgICAgd2luZG93LldoaXNwZXIuZXZlbnRzLm9mZignc2V0dXBBc05ld0RldmljZScsIHVubG9hZCk7XG4gICAgICB3aW5kb3cuV2hpc3Blci5ldmVudHMub2ZmKCdzaG93Q29udmVyc2F0aW9uJywgb25TaG93Q29udmVyc2F0aW9uKTtcbiAgICB9O1xuICB9LCBbcHJldkNvbnZlcnNhdGlvbiwgc2hvd0NvbnZlcnNhdGlvbl0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGludGVybmFsSGFzSW5pdGlhbExvYWRDb21wbGV0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXR1cyA9IHdpbmRvdy5nZXRTb2NrZXRTdGF0dXMoKTtcbiAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgICAgIGNhc2UgJ0NPTk5FQ1RJTkcnOlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdPUEVOJzpcbiAgICAgICAgICAvLyBpZiB3ZSd2ZSBjb25uZWN0ZWQsIHdlIGNhbiB3YWl0IGZvciByZWFsIGVtcHR5IGV2ZW50XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0NMT1NJTkcnOlxuICAgICAgICBjYXNlICdDTE9TRUQnOlxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIC8vIGlmIHdlIGZhaWxlZCB0byBjb25uZWN0LCB3ZSBwcmV0ZW5kIHdlIGxvYWRlZFxuICAgICAgICAgIHNldEludGVybmFsSGFzSW5pdGlhbExvYWRDb21wbGV0ZWQodHJ1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgICBgc3RhcnRDb25uZWN0aW9uTGlzdGVuZXI6IEZvdW5kIHVuZXhwZWN0ZWQgc29ja2V0IHN0YXR1cyAke3N0YXR1c307IHNldHRpbmcgbG9hZCB0byBkb25lIG1hbnVhbGx5LmBcbiAgICAgICAgICApO1xuICAgICAgICAgIHNldEludGVybmFsSGFzSW5pdGlhbExvYWRDb21wbGV0ZWQodHJ1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSwgU0VDT05EKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICB9O1xuICB9LCBbaW50ZXJuYWxIYXNJbml0aWFsTG9hZENvbXBsZXRlZF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0SW50ZXJuYWxIYXNJbml0aWFsTG9hZENvbXBsZXRlZChoYXNJbml0aWFsTG9hZENvbXBsZXRlZCk7XG4gIH0sIFtoYXNJbml0aWFsTG9hZENvbXBsZXRlZF0pO1xuXG4gIGlmICghaW50ZXJuYWxIYXNJbml0aWFsTG9hZENvbXBsZXRlZCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcC1sb2FkaW5nLXNjcmVlblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS10aXRsZS1iYXItZHJhZy1hcmVhXCIgLz5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1zcGxhc2gtc2NyZWVuX19sb2dvIG1vZHVsZS1pbWctLTE1MFwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImRvdFwiIC8+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJkb3RcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZG90XCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lc3NhZ2VcIj5cbiAgICAgICAgICAgIHtsb2FkaW5nTWVzc2FnZUNvdW50XG4gICAgICAgICAgICAgID8gaTE4bignbG9hZGluZ01lc3NhZ2VzJywgW1N0cmluZyhsb2FkaW5nTWVzc2FnZUNvdW50KV0pXG4gICAgICAgICAgICAgIDogaTE4bignbG9hZGluZycpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBsZXQgYWN0aXZlTW9kYWw6IFJlYWN0Tm9kZTtcbiAgaWYgKGNvbnZlcnNhdGlvbnNTdG9wcGluZ1NlbmQubGVuZ3RoKSB7XG4gICAgYWN0aXZlTW9kYWwgPSAoXG4gICAgICA8U2FmZXR5TnVtYmVyQ2hhbmdlRGlhbG9nXG4gICAgICAgIGNvbmZpcm1UZXh0PXtpMThuKCdzYWZldHlOdW1iZXJDaGFuZ2VEaWFsb2dfX3BlbmRpbmctbWVzc2FnZXMnKX1cbiAgICAgICAgY29udGFjdHM9e2NvbnZlcnNhdGlvbnNTdG9wcGluZ1NlbmR9XG4gICAgICAgIGdldFByZWZlcnJlZEJhZGdlPXtnZXRQcmVmZXJyZWRCYWRnZX1cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgb25DYW5jZWw9e2NhbmNlbENvbnZlcnNhdGlvblZlcmlmaWNhdGlvbn1cbiAgICAgICAgb25Db25maXJtPXt2ZXJpZnlDb252ZXJzYXRpb25zU3RvcHBpbmdTZW5kfVxuICAgICAgICByZW5kZXJTYWZldHlOdW1iZXI9e3JlbmRlclNhZmV0eU51bWJlcn1cbiAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgLz5cbiAgICApO1xuICB9XG4gIGlmICghYWN0aXZlTW9kYWwgJiYgaXNDdXN0b21pemluZ1ByZWZlcnJlZFJlYWN0aW9ucykge1xuICAgIGFjdGl2ZU1vZGFsID0gcmVuZGVyQ3VzdG9taXppbmdQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbCgpO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJJbmJveFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS10aXRsZS1iYXItZHJhZy1hcmVhXCIgLz5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxlZnQtcGFuZS13cmFwcGVyXCI+e3JlbmRlckxlZnRQYW5lKCl9PC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb252ZXJzYXRpb24tc3RhY2tcIj5cbiAgICAgICAgICA8ZGl2IGlkPVwidG9hc3RcIiAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udmVyc2F0aW9uXCIgcmVmPXtjb252ZXJzYXRpb25Nb3VudFJlZn0gLz5cbiAgICAgICAgICB7IXByZXZDb252ZXJzYXRpb24gJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuby1jb252ZXJzYXRpb24tb3BlblwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1zcGxhc2gtc2NyZWVuX19sb2dvIG1vZHVsZS1pbWctLTEyOCBtb2R1bGUtbG9nby1ibHVlXCIgLz5cbiAgICAgICAgICAgICAgPGgzPntpMThuKCd3ZWxjb21lVG9TaWduYWwnKX08L2gzPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ3aGF0cy1uZXctcGxhY2Vob2xkZXJcIj5cbiAgICAgICAgICAgICAgICA8V2hhdHNOZXdMaW5rXG4gICAgICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICAgICAgc2hvd1doYXRzTmV3TW9kYWw9e3Nob3dXaGF0c05ld01vZGFsfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICB7YWN0aXZlTW9kYWx9XG4gICAgPC8+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFtRDtBQVluRCxVQUFxQjtBQUNyQix1QkFBdUI7QUFDdkIsc0NBQXlDO0FBQ3pDLDJDQUE4QztBQUM5QywwQkFBNkI7QUFDN0IsdUJBQTBCO0FBQzFCLG9CQUE2QjtBQW9CdEIsTUFBTSxRQUFRLHdCQUFDO0FBQUEsRUFDcEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQzRCO0FBQzVCLFFBQU0sQ0FBQyxxQkFBcUIsMEJBQTBCLDJCQUFTLENBQUM7QUFDaEUsUUFBTSxDQUFDLGlDQUFpQyxzQ0FDdEMsMkJB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
