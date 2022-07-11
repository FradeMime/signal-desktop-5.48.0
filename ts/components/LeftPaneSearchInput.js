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
var LeftPaneSearchInput_exports = {};
__export(LeftPaneSearchInput_exports, {
  LeftPaneSearchInput: () => LeftPaneSearchInput
});
module.exports = __toCommonJS(LeftPaneSearchInput_exports);
var import_react = __toESM(require("react"));
var import_Avatar = require("./Avatar");
var import_SearchInput = require("./SearchInput");
var import_usePrevious = require("../hooks/usePrevious");
const LeftPaneSearchInput = /* @__PURE__ */ __name(({
  clearConversationSearch,
  clearSearch,
  disabled,
  i18n,
  searchConversation,
  searchTerm,
  startSearchCounter,
  updateSearchTerm,
  showConversation,
  onEnterKeyDown
}) => {
  const inputRef = (0, import_react.useRef)(null);
  const prevSearchConversationId = (0, import_usePrevious.usePrevious)(void 0, searchConversation?.id);
  const prevSearchCounter = (0, import_usePrevious.usePrevious)(startSearchCounter, startSearchCounter);
  (0, import_react.useEffect)(() => {
    if (searchConversation && searchConversation.id !== prevSearchConversationId) {
      inputRef.current?.focus();
    }
    if (startSearchCounter !== prevSearchCounter) {
      inputRef.current?.select();
    }
  }, [
    prevSearchConversationId,
    prevSearchCounter,
    searchConversation,
    startSearchCounter
  ]);
  const changeValue = /* @__PURE__ */ __name((nextSearchTerm) => {
    if (!nextSearchTerm) {
      if (searchConversation) {
        clearConversationSearch();
      } else {
        clearSearch();
      }
      return;
    }
    if (updateSearchTerm) {
      updateSearchTerm(nextSearchTerm);
    }
  }, "changeValue");
  const clearAndFocus = /* @__PURE__ */ __name(() => {
    clearSearch();
    inputRef.current?.focus();
  }, "clearAndFocus");
  const label = i18n(searchConversation ? "searchIn" : "search");
  return /* @__PURE__ */ import_react.default.createElement(import_SearchInput.SearchInput, {
    disabled,
    label,
    hasSearchIcon: !searchConversation,
    i18n,
    moduleClassName: "LeftPaneSearchInput",
    onBlur: () => {
      if (!searchConversation && !searchTerm) {
        clearSearch();
      }
    },
    onKeyDown: (event) => {
      if (onEnterKeyDown && event.key === "Enter") {
        onEnterKeyDown(clearSearch, showConversation);
        event.preventDefault();
        event.stopPropagation();
      }
    },
    onChange: (event) => {
      changeValue(event.currentTarget.value);
    },
    onClear: () => {
      if (searchConversation && searchTerm) {
        changeValue("");
      } else {
        clearAndFocus();
      }
    },
    ref: inputRef,
    placeholder: label,
    value: searchTerm
  }, searchConversation && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "LeftPaneSearchInput__in-conversation-pill",
    onClick: () => {
      inputRef.current?.focus();
    }
  }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
    acceptedMessageRequest: searchConversation.acceptedMessageRequest,
    avatarPath: searchConversation.avatarPath,
    badge: void 0,
    color: searchConversation.color,
    conversationType: searchConversation.type,
    i18n,
    isMe: searchConversation.isMe,
    noteToSelf: searchConversation.isMe,
    sharedGroupNames: searchConversation.sharedGroupNames,
    size: import_Avatar.AvatarSize.SIXTEEN,
    title: searchConversation.title,
    unblurredAvatarPath: searchConversation.unblurredAvatarPath
  }), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("clearSearch"),
    className: "LeftPaneSearchInput__in-conversation-pill__x-button",
    onClick: clearAndFocus,
    type: "button"
  })));
}, "LeftPaneSearchInput");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LeftPaneSearchInput
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGVmdFBhbmVTZWFyY2hJbnB1dC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdHlwZSB7XG4gIENvbnZlcnNhdGlvblR5cGUsXG4gIFNob3dDb252ZXJzYXRpb25UeXBlLFxufSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgQXZhdGFyLCBBdmF0YXJTaXplIH0gZnJvbSAnLi9BdmF0YXInO1xuaW1wb3J0IHsgU2VhcmNoSW5wdXQgfSBmcm9tICcuL1NlYXJjaElucHV0JztcbmltcG9ydCB7IHVzZVByZXZpb3VzIH0gZnJvbSAnLi4vaG9va3MvdXNlUHJldmlvdXMnO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgY2xlYXJDb252ZXJzYXRpb25TZWFyY2g6ICgpID0+IHZvaWQ7XG4gIGNsZWFyU2VhcmNoOiAoKSA9PiB2b2lkO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIHNlYXJjaENvbnZlcnNhdGlvbj86IENvbnZlcnNhdGlvblR5cGU7XG4gIHNlYXJjaFRlcm06IHN0cmluZztcbiAgc3RhcnRTZWFyY2hDb3VudGVyOiBudW1iZXI7XG4gIHVwZGF0ZVNlYXJjaFRlcm06IChzZWFyY2hUZXJtOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNob3dDb252ZXJzYXRpb246IFNob3dDb252ZXJzYXRpb25UeXBlO1xuICBvbkVudGVyS2V5RG93bj86IChcbiAgICBjbGVhclNlYXJjaDogKCkgPT4gdm9pZCxcbiAgICBzaG93Q29udmVyc2F0aW9uOiBTaG93Q29udmVyc2F0aW9uVHlwZVxuICApID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgTGVmdFBhbmVTZWFyY2hJbnB1dCA9ICh7XG4gIGNsZWFyQ29udmVyc2F0aW9uU2VhcmNoLFxuICBjbGVhclNlYXJjaCxcbiAgZGlzYWJsZWQsXG4gIGkxOG4sXG4gIHNlYXJjaENvbnZlcnNhdGlvbixcbiAgc2VhcmNoVGVybSxcbiAgc3RhcnRTZWFyY2hDb3VudGVyLFxuICB1cGRhdGVTZWFyY2hUZXJtLFxuICBzaG93Q29udmVyc2F0aW9uLFxuICBvbkVudGVyS2V5RG93bixcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgaW5wdXRSZWYgPSB1c2VSZWY8bnVsbCB8IEhUTUxJbnB1dEVsZW1lbnQ+KG51bGwpO1xuXG4gIGNvbnN0IHByZXZTZWFyY2hDb252ZXJzYXRpb25JZCA9IHVzZVByZXZpb3VzKFxuICAgIHVuZGVmaW5lZCxcbiAgICBzZWFyY2hDb252ZXJzYXRpb24/LmlkXG4gICk7XG4gIGNvbnN0IHByZXZTZWFyY2hDb3VudGVyID0gdXNlUHJldmlvdXMoc3RhcnRTZWFyY2hDb3VudGVyLCBzdGFydFNlYXJjaENvdW50ZXIpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gV2hlbiB1c2VyIGNob29zZXMgdG8gc2VhcmNoIGluIGEgZ2l2ZW4gY29udmVyc2F0aW9uIHdlIGZvY3VzIHRoZSBmaWVsZCBmb3IgdGhlbVxuICAgIGlmIChcbiAgICAgIHNlYXJjaENvbnZlcnNhdGlvbiAmJlxuICAgICAgc2VhcmNoQ29udmVyc2F0aW9uLmlkICE9PSBwcmV2U2VhcmNoQ29udmVyc2F0aW9uSWRcbiAgICApIHtcbiAgICAgIGlucHV0UmVmLmN1cnJlbnQ/LmZvY3VzKCk7XG4gICAgfVxuICAgIC8vIFdoZW4gdXNlciBjaG9vc2VzIHRvIHN0YXJ0IGEgbmV3IHNlYXJjaCwgd2UgZm9jdXMgdGhlIGZpZWxkXG4gICAgaWYgKHN0YXJ0U2VhcmNoQ291bnRlciAhPT0gcHJldlNlYXJjaENvdW50ZXIpIHtcbiAgICAgIGlucHV0UmVmLmN1cnJlbnQ/LnNlbGVjdCgpO1xuICAgIH1cbiAgfSwgW1xuICAgIHByZXZTZWFyY2hDb252ZXJzYXRpb25JZCxcbiAgICBwcmV2U2VhcmNoQ291bnRlcixcbiAgICBzZWFyY2hDb252ZXJzYXRpb24sXG4gICAgc3RhcnRTZWFyY2hDb3VudGVyLFxuICBdKTtcblxuICBjb25zdCBjaGFuZ2VWYWx1ZSA9IChuZXh0U2VhcmNoVGVybTogc3RyaW5nKSA9PiB7XG4gICAgaWYgKCFuZXh0U2VhcmNoVGVybSkge1xuICAgICAgaWYgKHNlYXJjaENvbnZlcnNhdGlvbikge1xuICAgICAgICBjbGVhckNvbnZlcnNhdGlvblNlYXJjaCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xlYXJTZWFyY2goKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh1cGRhdGVTZWFyY2hUZXJtKSB7XG4gICAgICB1cGRhdGVTZWFyY2hUZXJtKG5leHRTZWFyY2hUZXJtKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2xlYXJBbmRGb2N1cyA9ICgpID0+IHtcbiAgICBjbGVhclNlYXJjaCgpO1xuICAgIGlucHV0UmVmLmN1cnJlbnQ/LmZvY3VzKCk7XG4gIH07XG5cbiAgY29uc3QgbGFiZWwgPSBpMThuKHNlYXJjaENvbnZlcnNhdGlvbiA/ICdzZWFyY2hJbicgOiAnc2VhcmNoJyk7XG5cbiAgcmV0dXJuIChcbiAgICA8U2VhcmNoSW5wdXRcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIGhhc1NlYXJjaEljb249eyFzZWFyY2hDb252ZXJzYXRpb259XG4gICAgICBpMThuPXtpMThufVxuICAgICAgbW9kdWxlQ2xhc3NOYW1lPVwiTGVmdFBhbmVTZWFyY2hJbnB1dFwiXG4gICAgICBvbkJsdXI9eygpID0+IHtcbiAgICAgICAgaWYgKCFzZWFyY2hDb252ZXJzYXRpb24gJiYgIXNlYXJjaFRlcm0pIHtcbiAgICAgICAgICBjbGVhclNlYXJjaCgpO1xuICAgICAgICB9XG4gICAgICB9fVxuICAgICAgb25LZXlEb3duPXtldmVudCA9PiB7XG4gICAgICAgIGlmIChvbkVudGVyS2V5RG93biAmJiBldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICBvbkVudGVyS2V5RG93bihjbGVhclNlYXJjaCwgc2hvd0NvbnZlcnNhdGlvbik7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICAgIG9uQ2hhbmdlPXtldmVudCA9PiB7XG4gICAgICAgIGNoYW5nZVZhbHVlKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpO1xuICAgICAgfX1cbiAgICAgIG9uQ2xlYXI9eygpID0+IHtcbiAgICAgICAgaWYgKHNlYXJjaENvbnZlcnNhdGlvbiAmJiBzZWFyY2hUZXJtKSB7XG4gICAgICAgICAgY2hhbmdlVmFsdWUoJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNsZWFyQW5kRm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICAgIHJlZj17aW5wdXRSZWZ9XG4gICAgICBwbGFjZWhvbGRlcj17bGFiZWx9XG4gICAgICB2YWx1ZT17c2VhcmNoVGVybX1cbiAgICA+XG4gICAgICB7c2VhcmNoQ29udmVyc2F0aW9uICYmIChcbiAgICAgICAgLy8gQ2xpY2tpbmcgdGhlIG5vbi1YIHBhcnQgb2YgdGhlIHBpbGwgc2hvdWxkIGZvY3VzIHRoZSBpbnB1dCBidXQgaGF2ZSBhIG5vcm1hbFxuICAgICAgICAvLyAgIGN1cnNvci4gVGhpcyBlZmZlY3RpdmVseSBzaW11bGF0ZXMgYHBvaW50ZXItZXZlbnRzOiBub25lYCB3aGlsZSBzdGlsbFxuICAgICAgICAvLyAgIGxldHRpbmcgdXMgY2hhbmdlIHRoZSBjdXJzb3IuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzLCBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnNcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cIkxlZnRQYW5lU2VhcmNoSW5wdXRfX2luLWNvbnZlcnNhdGlvbi1waWxsXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBpbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8QXZhdGFyXG4gICAgICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXtzZWFyY2hDb252ZXJzYXRpb24uYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdH1cbiAgICAgICAgICAgIGF2YXRhclBhdGg9e3NlYXJjaENvbnZlcnNhdGlvbi5hdmF0YXJQYXRofVxuICAgICAgICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgICAgIGNvbG9yPXtzZWFyY2hDb252ZXJzYXRpb24uY29sb3J9XG4gICAgICAgICAgICBjb252ZXJzYXRpb25UeXBlPXtzZWFyY2hDb252ZXJzYXRpb24udHlwZX1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBpc01lPXtzZWFyY2hDb252ZXJzYXRpb24uaXNNZX1cbiAgICAgICAgICAgIG5vdGVUb1NlbGY9e3NlYXJjaENvbnZlcnNhdGlvbi5pc01lfVxuICAgICAgICAgICAgc2hhcmVkR3JvdXBOYW1lcz17c2VhcmNoQ29udmVyc2F0aW9uLnNoYXJlZEdyb3VwTmFtZXN9XG4gICAgICAgICAgICBzaXplPXtBdmF0YXJTaXplLlNJWFRFRU59XG4gICAgICAgICAgICB0aXRsZT17c2VhcmNoQ29udmVyc2F0aW9uLnRpdGxlfVxuICAgICAgICAgICAgdW5ibHVycmVkQXZhdGFyUGF0aD17c2VhcmNoQ29udmVyc2F0aW9uLnVuYmx1cnJlZEF2YXRhclBhdGh9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdjbGVhclNlYXJjaCcpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiTGVmdFBhbmVTZWFyY2hJbnB1dF9faW4tY29udmVyc2F0aW9uLXBpbGxfX3gtYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2NsZWFyQW5kRm9jdXN9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9TZWFyY2hJbnB1dD5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQXlDO0FBTXpDLG9CQUFtQztBQUNuQyx5QkFBNEI7QUFDNUIseUJBQTRCO0FBa0JyQixNQUFNLHNCQUFzQix3QkFBQztBQUFBLEVBQ2xDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDNEI7QUFDNUIsUUFBTSxXQUFXLHlCQUFnQyxJQUFJO0FBRXJELFFBQU0sMkJBQTJCLG9DQUMvQixRQUNBLG9CQUFvQixFQUN0QjtBQUNBLFFBQU0sb0JBQW9CLG9DQUFZLG9CQUFvQixrQkFBa0I7QUFFNUUsOEJBQVUsTUFBTTtBQUVkLFFBQ0Usc0JBQ0EsbUJBQW1CLE9BQU8sMEJBQzFCO0FBQ0EsZUFBUyxTQUFTLE1BQU07QUFBQSxJQUMxQjtBQUVBLFFBQUksdUJBQXVCLG1CQUFtQjtBQUM1QyxlQUFTLFNBQVMsT0FBTztBQUFBLElBQzNCO0FBQUEsRUFDRixHQUFHO0FBQUEsSUFDRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sY0FBYyx3QkFBQyxtQkFBMkI7QUFDOUMsUUFBSSxDQUFDLGdCQUFnQjtBQUNuQixVQUFJLG9CQUFvQjtBQUN0QixnQ0FBd0I7QUFBQSxNQUMxQixPQUFPO0FBQ0wsb0JBQVk7QUFBQSxNQUNkO0FBRUE7QUFBQSxJQUNGO0FBRUEsUUFBSSxrQkFBa0I7QUFDcEIsdUJBQWlCLGNBQWM7QUFBQSxJQUNqQztBQUFBLEVBQ0YsR0Fkb0I7QUFnQnBCLFFBQU0sZ0JBQWdCLDZCQUFNO0FBQzFCLGdCQUFZO0FBQ1osYUFBUyxTQUFTLE1BQU07QUFBQSxFQUMxQixHQUhzQjtBQUt0QixRQUFNLFFBQVEsS0FBSyxxQkFBcUIsYUFBYSxRQUFRO0FBRTdELFNBQ0UsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0EsZUFBZSxDQUFDO0FBQUEsSUFDaEI7QUFBQSxJQUNBLGlCQUFnQjtBQUFBLElBQ2hCLFFBQVEsTUFBTTtBQUNaLFVBQUksQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZO0FBQ3RDLG9CQUFZO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFdBQVcsV0FBUztBQUNsQixVQUFJLGtCQUFrQixNQUFNLFFBQVEsU0FBUztBQUMzQyx1QkFBZSxhQUFhLGdCQUFnQjtBQUM1QyxjQUFNLGVBQWU7QUFDckIsY0FBTSxnQkFBZ0I7QUFBQSxNQUN4QjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFVBQVUsV0FBUztBQUNqQixrQkFBWSxNQUFNLGNBQWMsS0FBSztBQUFBLElBQ3ZDO0FBQUEsSUFDQSxTQUFTLE1BQU07QUFDYixVQUFJLHNCQUFzQixZQUFZO0FBQ3BDLG9CQUFZLEVBQUU7QUFBQSxNQUNoQixPQUFPO0FBQ0wsc0JBQWM7QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxJQUNMLGFBQWE7QUFBQSxJQUNiLE9BQU87QUFBQSxLQUVOLHNCQU1DLG1EQUFDO0FBQUEsSUFDQyxXQUFVO0FBQUEsSUFDVixTQUFTLE1BQU07QUFDYixlQUFTLFNBQVMsTUFBTTtBQUFBLElBQzFCO0FBQUEsS0FFQSxtREFBQztBQUFBLElBQ0Msd0JBQXdCLG1CQUFtQjtBQUFBLElBQzNDLFlBQVksbUJBQW1CO0FBQUEsSUFDL0IsT0FBTztBQUFBLElBQ1AsT0FBTyxtQkFBbUI7QUFBQSxJQUMxQixrQkFBa0IsbUJBQW1CO0FBQUEsSUFDckM7QUFBQSxJQUNBLE1BQU0sbUJBQW1CO0FBQUEsSUFDekIsWUFBWSxtQkFBbUI7QUFBQSxJQUMvQixrQkFBa0IsbUJBQW1CO0FBQUEsSUFDckMsTUFBTSx5QkFBVztBQUFBLElBQ2pCLE9BQU8sbUJBQW1CO0FBQUEsSUFDMUIscUJBQXFCLG1CQUFtQjtBQUFBLEdBQzFDLEdBQ0EsbURBQUM7QUFBQSxJQUNDLGNBQVksS0FBSyxhQUFhO0FBQUEsSUFDOUIsV0FBVTtBQUFBLElBQ1YsU0FBUztBQUFBLElBQ1QsTUFBSztBQUFBLEdBQ1AsQ0FDRixDQUVKO0FBRUosR0FuSW1DOyIsCiAgIm5hbWVzIjogW10KfQo=
