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
var ChatColorPicker_exports = {};
__export(ChatColorPicker_exports, {
  ChatColorPicker: () => ChatColorPicker
});
module.exports = __toCommonJS(ChatColorPicker_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_react_contextmenu = require("react-contextmenu");
var import_ConfirmationDialog = require("./ConfirmationDialog");
var import_CustomColorEditor = require("./CustomColorEditor");
var import_Modal = require("./Modal");
var import_Colors = require("../types/Colors");
var import_SampleMessageBubbles = require("./SampleMessageBubbles");
var import_PanelRow = require("./conversation/conversation-details/PanelRow");
var import_getCustomColorStyle = require("../util/getCustomColorStyle");
var import_useRestoreFocus = require("../hooks/useRestoreFocus");
const ChatColorPicker = /* @__PURE__ */ __name(({
  addCustomColor,
  colorSelected,
  conversationId,
  customColors = {},
  editCustomColor,
  getConversationsWithCustomColor,
  i18n,
  isGlobal = false,
  removeCustomColor,
  removeCustomColorOnConversations,
  resetAllChatColors,
  resetDefaultChatColor,
  selectedColor = import_Colors.ConversationColors[0],
  selectedCustomColor,
  setGlobalDefaultConversationColor
}) => {
  const [confirmResetAll, setConfirmResetAll] = (0, import_react.useState)(false);
  const [confirmResetWhat, setConfirmResetWhat] = (0, import_react.useState)(false);
  const [customColorToEdit, setCustomColorToEdit] = (0, import_react.useState)(void 0);
  const [focusRef] = (0, import_useRestoreFocus.useDelayedRestoreFocus)();
  const onSelectColor = /* @__PURE__ */ __name((conversationColor, customColorData) => {
    if (conversationId) {
      colorSelected({
        conversationId,
        conversationColor,
        customColorData
      });
    } else {
      setGlobalDefaultConversationColor(conversationColor, customColorData);
    }
  }, "onSelectColor");
  const renderCustomColorEditorWrapper = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(CustomColorEditorWrapper, {
    customColorToEdit,
    i18n,
    onClose: () => setCustomColorToEdit(void 0),
    onSave: (color) => {
      if (customColorToEdit?.id) {
        editCustomColor(customColorToEdit.id, color);
        onSelectColor("custom", {
          id: customColorToEdit.id,
          value: color
        });
      } else {
        addCustomColor(color, conversationId);
      }
    }
  }), "renderCustomColorEditorWrapper");
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ChatColorPicker__container"
  }, customColorToEdit ? renderCustomColorEditorWrapper() : null, confirmResetWhat ? /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    actions: [
      {
        action: resetDefaultChatColor,
        style: "affirmative",
        text: i18n("ChatColorPicker__confirm-reset-default")
      },
      {
        action: () => {
          resetDefaultChatColor();
          resetAllChatColors();
        },
        style: "affirmative",
        text: i18n("ChatColorPicker__resetAll")
      }
    ],
    i18n,
    onClose: () => {
      setConfirmResetWhat(false);
    },
    title: i18n("ChatColorPicker__resetDefault")
  }, i18n("ChatColorPicker__confirm-reset-message")) : null, confirmResetAll ? /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    actions: [
      {
        action: resetAllChatColors,
        style: "affirmative",
        text: i18n("ChatColorPicker__confirm-reset")
      }
    ],
    i18n,
    onClose: () => {
      setConfirmResetAll(false);
    },
    title: i18n("ChatColorPicker__resetAll")
  }, i18n("ChatColorPicker__confirm-reset-message")) : null, /* @__PURE__ */ import_react.default.createElement(import_SampleMessageBubbles.SampleMessageBubbles, {
    backgroundStyle: (0, import_getCustomColorStyle.getCustomColorStyle)(selectedCustomColor.value),
    color: selectedColor,
    i18n
  }), /* @__PURE__ */ import_react.default.createElement("hr", null), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "ChatColorPicker__bubbles"
  }, import_Colors.ConversationColors.map((color, i) => /* @__PURE__ */ import_react.default.createElement("div", {
    "aria-label": color,
    className: (0, import_classnames.default)(`ChatColorPicker__bubble ChatColorPicker__bubble--${color}`, {
      "ChatColorPicker__bubble--selected": color === selectedColor
    }),
    key: color,
    onClick: () => onSelectColor(color),
    onKeyDown: (ev) => {
      if (ev.key === "Enter") {
        onSelectColor(color);
      }
    },
    role: "button",
    tabIndex: 0,
    ref: i === 0 ? focusRef : void 0
  })), Object.keys(customColors).map((colorId) => {
    const colorValues = customColors[colorId];
    return /* @__PURE__ */ import_react.default.createElement(CustomColorBubble, {
      color: colorValues,
      colorId,
      getConversationsWithCustomColor,
      key: colorId,
      i18n,
      isSelected: colorId === selectedCustomColor.id,
      onChoose: () => {
        onSelectColor("custom", {
          id: colorId,
          value: colorValues
        });
      },
      onDelete: () => {
        removeCustomColor(colorId);
        removeCustomColorOnConversations(colorId);
      },
      onDupe: () => {
        addCustomColor(colorValues, conversationId);
      },
      onEdit: () => {
        setCustomColorToEdit({ id: colorId, value: colorValues });
      }
    });
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    "aria-label": i18n("ChatColorPicker__custom-color--label"),
    className: "ChatColorPicker__bubble ChatColorPicker__bubble--custom",
    onClick: () => setCustomColorToEdit({ id: void 0, value: void 0 }),
    onKeyDown: (ev) => {
      if (ev.key === "Enter") {
        setCustomColorToEdit({ id: void 0, value: void 0 });
      }
    },
    role: "button",
    tabIndex: 0
  }, /* @__PURE__ */ import_react.default.createElement("i", {
    className: "ChatColorPicker__add-icon"
  }))), /* @__PURE__ */ import_react.default.createElement("hr", null), conversationId ? /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    label: i18n("ChatColorPicker__reset"),
    onClick: () => {
      colorSelected({ conversationId });
    }
  }) : null, /* @__PURE__ */ import_react.default.createElement(import_PanelRow.PanelRow, {
    label: i18n("ChatColorPicker__resetAll"),
    onClick: () => {
      if (isGlobal) {
        setConfirmResetWhat(true);
      } else {
        setConfirmResetAll(true);
      }
    }
  }));
}, "ChatColorPicker");
const CustomColorBubble = /* @__PURE__ */ __name(({
  color,
  colorId,
  getConversationsWithCustomColor,
  i18n,
  isSelected,
  onDelete,
  onDupe,
  onEdit,
  onChoose
}) => {
  const menuRef = (0, import_react.useRef)(null);
  const [confirmDeleteCount, setConfirmDeleteCount] = (0, import_react.useState)(void 0);
  const handleClick = /* @__PURE__ */ __name((ev) => {
    if (!isSelected) {
      onChoose();
      return;
    }
    if (menuRef && menuRef.current) {
      menuRef.current.handleContextClick(ev);
    }
  }, "handleClick");
  const bubble = /* @__PURE__ */ import_react.default.createElement("div", {
    "aria-label": colorId,
    className: (0, import_classnames.default)({
      ChatColorPicker__bubble: true,
      "ChatColorPicker__bubble--custom-selected": isSelected,
      "ChatColorPicker__bubble--selected": isSelected
    }),
    onClick: handleClick,
    onKeyDown: (ev) => {
      if (ev.key === "Enter") {
        handleClick(ev);
      }
    },
    role: "button",
    tabIndex: 0,
    style: {
      ...(0, import_getCustomColorStyle.getCustomColorStyle)(color)
    }
  });
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, confirmDeleteCount ? /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    actions: [
      {
        action: onDelete,
        style: "negative",
        text: i18n("ChatColorPicker__context--delete")
      }
    ],
    i18n,
    onClose: () => {
      setConfirmDeleteCount(void 0);
    },
    title: i18n("ChatColorPicker__delete--title")
  }, i18n("ChatColorPicker__delete--message", [
    String(confirmDeleteCount)
  ])) : null, isSelected ? /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.ContextMenuTrigger, {
    id: colorId,
    ref: menuRef
  }, bubble) : bubble, /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.ContextMenu, {
    id: colorId
  }, /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
    attributes: {
      className: "ChatColorPicker__context--edit"
    },
    onClick: (event) => {
      event.stopPropagation();
      event.preventDefault();
      onEdit();
    }
  }, i18n("ChatColorPicker__context--edit")), /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
    attributes: {
      className: "ChatColorPicker__context--duplicate"
    },
    onClick: (event) => {
      event.stopPropagation();
      event.preventDefault();
      onDupe();
    }
  }, i18n("ChatColorPicker__context--duplicate")), /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
    attributes: {
      className: "ChatColorPicker__context--delete"
    },
    onClick: async (event) => {
      event.stopPropagation();
      event.preventDefault();
      const conversations = await getConversationsWithCustomColor(colorId);
      if (!conversations.length) {
        onDelete();
      } else {
        setConfirmDeleteCount(conversations.length);
      }
    }
  }, i18n("ChatColorPicker__context--delete"))));
}, "CustomColorBubble");
const CustomColorEditorWrapper = /* @__PURE__ */ __name(({
  customColorToEdit,
  i18n,
  onClose,
  onSave
}) => {
  const editor = /* @__PURE__ */ import_react.default.createElement(import_CustomColorEditor.CustomColorEditor, {
    customColor: customColorToEdit?.value,
    i18n,
    onClose,
    onSave
  });
  return /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
    hasXButton: true,
    i18n,
    moduleClassName: "ChatColorPicker__modal",
    noMouseClose: true,
    onClose,
    title: i18n("CustomColorEditor__title")
  }, editor);
}, "CustomColorEditorWrapper");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChatColorPicker
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2hhdENvbG9yUGlja2VyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEtleWJvYXJkRXZlbnQsIE1vdXNlRXZlbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgQ29udGV4dE1lbnUsIENvbnRleHRNZW51VHJpZ2dlciwgTWVudUl0ZW0gfSBmcm9tICdyZWFjdC1jb250ZXh0bWVudSc7XG5pbXBvcnQgeyBDb25maXJtYXRpb25EaWFsb2cgfSBmcm9tICcuL0NvbmZpcm1hdGlvbkRpYWxvZyc7XG5pbXBvcnQgeyBDdXN0b21Db2xvckVkaXRvciB9IGZyb20gJy4vQ3VzdG9tQ29sb3JFZGl0b3InO1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuL01vZGFsJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uQ29sb3JUeXBlLCBDdXN0b21Db2xvclR5cGUgfSBmcm9tICcuLi90eXBlcy9Db2xvcnMnO1xuaW1wb3J0IHsgQ29udmVyc2F0aW9uQ29sb3JzIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBTYW1wbGVNZXNzYWdlQnViYmxlcyB9IGZyb20gJy4vU2FtcGxlTWVzc2FnZUJ1YmJsZXMnO1xuaW1wb3J0IHsgUGFuZWxSb3cgfSBmcm9tICcuL2NvbnZlcnNhdGlvbi9jb252ZXJzYXRpb24tZGV0YWlscy9QYW5lbFJvdyc7XG5pbXBvcnQgeyBnZXRDdXN0b21Db2xvclN0eWxlIH0gZnJvbSAnLi4vdXRpbC9nZXRDdXN0b21Db2xvclN0eWxlJztcblxuaW1wb3J0IHsgdXNlRGVsYXllZFJlc3RvcmVGb2N1cyB9IGZyb20gJy4uL2hvb2tzL3VzZVJlc3RvcmVGb2N1cyc7XG5cbnR5cGUgQ3VzdG9tQ29sb3JEYXRhVHlwZSA9IHtcbiAgaWQ/OiBzdHJpbmc7XG4gIHZhbHVlPzogQ3VzdG9tQ29sb3JUeXBlO1xufTtcblxuZXhwb3J0IHR5cGUgUHJvcHNEYXRhVHlwZSA9IHtcbiAgY29udmVyc2F0aW9uSWQ/OiBzdHJpbmc7XG4gIGN1c3RvbUNvbG9ycz86IFJlY29yZDxzdHJpbmcsIEN1c3RvbUNvbG9yVHlwZT47XG4gIGdldENvbnZlcnNhdGlvbnNXaXRoQ3VzdG9tQ29sb3I6IChcbiAgICBjb2xvcklkOiBzdHJpbmdcbiAgKSA9PiBQcm9taXNlPEFycmF5PENvbnZlcnNhdGlvblR5cGU+PjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNHbG9iYWw/OiBib29sZWFuO1xuICBzZWxlY3RlZENvbG9yPzogQ29udmVyc2F0aW9uQ29sb3JUeXBlO1xuICBzZWxlY3RlZEN1c3RvbUNvbG9yOiBDdXN0b21Db2xvckRhdGFUeXBlO1xufTtcblxudHlwZSBQcm9wc0FjdGlvblR5cGUgPSB7XG4gIGFkZEN1c3RvbUNvbG9yOiAoY29sb3I6IEN1c3RvbUNvbG9yVHlwZSwgY29udmVyc2F0aW9uSWQ/OiBzdHJpbmcpID0+IHVua25vd247XG4gIGNvbG9yU2VsZWN0ZWQ6IChwYXlsb2FkOiB7XG4gICAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgICBjb252ZXJzYXRpb25Db2xvcj86IENvbnZlcnNhdGlvbkNvbG9yVHlwZTtcbiAgICBjdXN0b21Db2xvckRhdGE/OiB7XG4gICAgICBpZDogc3RyaW5nO1xuICAgICAgdmFsdWU6IEN1c3RvbUNvbG9yVHlwZTtcbiAgICB9O1xuICB9KSA9PiB1bmtub3duO1xuICBlZGl0Q3VzdG9tQ29sb3I6IChjb2xvcklkOiBzdHJpbmcsIGNvbG9yOiBDdXN0b21Db2xvclR5cGUpID0+IHVua25vd247XG4gIHJlbW92ZUN1c3RvbUNvbG9yOiAoY29sb3JJZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICByZW1vdmVDdXN0b21Db2xvck9uQ29udmVyc2F0aW9uczogKGNvbG9ySWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgcmVzZXRBbGxDaGF0Q29sb3JzOiAoKSA9PiB1bmtub3duO1xuICByZXNldERlZmF1bHRDaGF0Q29sb3I6ICgpID0+IHVua25vd247XG4gIHNldEdsb2JhbERlZmF1bHRDb252ZXJzYXRpb25Db2xvcjogKFxuICAgIGNvbG9yOiBDb252ZXJzYXRpb25Db2xvclR5cGUsXG4gICAgY3VzdG9tQ29sb3JEYXRhPzoge1xuICAgICAgaWQ6IHN0cmluZztcbiAgICAgIHZhbHVlOiBDdXN0b21Db2xvclR5cGU7XG4gICAgfVxuICApID0+IHVua25vd247XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSBQcm9wc0RhdGFUeXBlICYgUHJvcHNBY3Rpb25UeXBlO1xuXG5leHBvcnQgY29uc3QgQ2hhdENvbG9yUGlja2VyID0gKHtcbiAgYWRkQ3VzdG9tQ29sb3IsXG4gIGNvbG9yU2VsZWN0ZWQsXG4gIGNvbnZlcnNhdGlvbklkLFxuICBjdXN0b21Db2xvcnMgPSB7fSxcbiAgZWRpdEN1c3RvbUNvbG9yLFxuICBnZXRDb252ZXJzYXRpb25zV2l0aEN1c3RvbUNvbG9yLFxuICBpMThuLFxuICBpc0dsb2JhbCA9IGZhbHNlLFxuICByZW1vdmVDdXN0b21Db2xvcixcbiAgcmVtb3ZlQ3VzdG9tQ29sb3JPbkNvbnZlcnNhdGlvbnMsXG4gIHJlc2V0QWxsQ2hhdENvbG9ycyxcbiAgcmVzZXREZWZhdWx0Q2hhdENvbG9yLFxuICBzZWxlY3RlZENvbG9yID0gQ29udmVyc2F0aW9uQ29sb3JzWzBdLFxuICBzZWxlY3RlZEN1c3RvbUNvbG9yLFxuICBzZXRHbG9iYWxEZWZhdWx0Q29udmVyc2F0aW9uQ29sb3IsXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IFtjb25maXJtUmVzZXRBbGwsIHNldENvbmZpcm1SZXNldEFsbF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtjb25maXJtUmVzZXRXaGF0LCBzZXRDb25maXJtUmVzZXRXaGF0XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2N1c3RvbUNvbG9yVG9FZGl0LCBzZXRDdXN0b21Db2xvclRvRWRpdF0gPSB1c2VTdGF0ZTxcbiAgICBDdXN0b21Db2xvckRhdGFUeXBlIHwgdW5kZWZpbmVkXG4gID4odW5kZWZpbmVkKTtcblxuICBjb25zdCBbZm9jdXNSZWZdID0gdXNlRGVsYXllZFJlc3RvcmVGb2N1cygpO1xuXG4gIGNvbnN0IG9uU2VsZWN0Q29sb3IgPSAoXG4gICAgY29udmVyc2F0aW9uQ29sb3I6IENvbnZlcnNhdGlvbkNvbG9yVHlwZSxcbiAgICBjdXN0b21Db2xvckRhdGE/OiB7IGlkOiBzdHJpbmc7IHZhbHVlOiBDdXN0b21Db2xvclR5cGUgfVxuICApOiB2b2lkID0+IHtcbiAgICBpZiAoY29udmVyc2F0aW9uSWQpIHtcbiAgICAgIGNvbG9yU2VsZWN0ZWQoe1xuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgY29udmVyc2F0aW9uQ29sb3IsXG4gICAgICAgIGN1c3RvbUNvbG9yRGF0YSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRHbG9iYWxEZWZhdWx0Q29udmVyc2F0aW9uQ29sb3IoY29udmVyc2F0aW9uQ29sb3IsIGN1c3RvbUNvbG9yRGF0YSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlbmRlckN1c3RvbUNvbG9yRWRpdG9yV3JhcHBlciA9ICgpID0+IChcbiAgICA8Q3VzdG9tQ29sb3JFZGl0b3JXcmFwcGVyXG4gICAgICBjdXN0b21Db2xvclRvRWRpdD17Y3VzdG9tQ29sb3JUb0VkaXR9XG4gICAgICBpMThuPXtpMThufVxuICAgICAgb25DbG9zZT17KCkgPT4gc2V0Q3VzdG9tQ29sb3JUb0VkaXQodW5kZWZpbmVkKX1cbiAgICAgIG9uU2F2ZT17KGNvbG9yOiBDdXN0b21Db2xvclR5cGUpID0+IHtcbiAgICAgICAgaWYgKGN1c3RvbUNvbG9yVG9FZGl0Py5pZCkge1xuICAgICAgICAgIGVkaXRDdXN0b21Db2xvcihjdXN0b21Db2xvclRvRWRpdC5pZCwgY29sb3IpO1xuICAgICAgICAgIG9uU2VsZWN0Q29sb3IoJ2N1c3RvbScsIHtcbiAgICAgICAgICAgIGlkOiBjdXN0b21Db2xvclRvRWRpdC5pZCxcbiAgICAgICAgICAgIHZhbHVlOiBjb2xvcixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhZGRDdXN0b21Db2xvcihjb2xvciwgY29udmVyc2F0aW9uSWQpO1xuICAgICAgICB9XG4gICAgICB9fVxuICAgIC8+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIkNoYXRDb2xvclBpY2tlcl9fY29udGFpbmVyXCI+XG4gICAgICB7Y3VzdG9tQ29sb3JUb0VkaXQgPyByZW5kZXJDdXN0b21Db2xvckVkaXRvcldyYXBwZXIoKSA6IG51bGx9XG4gICAgICB7Y29uZmlybVJlc2V0V2hhdCA/IChcbiAgICAgICAgPENvbmZpcm1hdGlvbkRpYWxvZ1xuICAgICAgICAgIGFjdGlvbnM9e1tcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYWN0aW9uOiByZXNldERlZmF1bHRDaGF0Q29sb3IsXG4gICAgICAgICAgICAgIHN0eWxlOiAnYWZmaXJtYXRpdmUnLFxuICAgICAgICAgICAgICB0ZXh0OiBpMThuKCdDaGF0Q29sb3JQaWNrZXJfX2NvbmZpcm0tcmVzZXQtZGVmYXVsdCcpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzZXREZWZhdWx0Q2hhdENvbG9yKCk7XG4gICAgICAgICAgICAgICAgcmVzZXRBbGxDaGF0Q29sb3JzKCk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHN0eWxlOiAnYWZmaXJtYXRpdmUnLFxuICAgICAgICAgICAgICB0ZXh0OiBpMThuKCdDaGF0Q29sb3JQaWNrZXJfX3Jlc2V0QWxsJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF19XG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiB7XG4gICAgICAgICAgICBzZXRDb25maXJtUmVzZXRXaGF0KGZhbHNlKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHRpdGxlPXtpMThuKCdDaGF0Q29sb3JQaWNrZXJfX3Jlc2V0RGVmYXVsdCcpfVxuICAgICAgICA+XG4gICAgICAgICAge2kxOG4oJ0NoYXRDb2xvclBpY2tlcl9fY29uZmlybS1yZXNldC1tZXNzYWdlJyl9XG4gICAgICAgIDwvQ29uZmlybWF0aW9uRGlhbG9nPlxuICAgICAgKSA6IG51bGx9XG4gICAgICB7Y29uZmlybVJlc2V0QWxsID8gKFxuICAgICAgICA8Q29uZmlybWF0aW9uRGlhbG9nXG4gICAgICAgICAgYWN0aW9ucz17W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhY3Rpb246IHJlc2V0QWxsQ2hhdENvbG9ycyxcbiAgICAgICAgICAgICAgc3R5bGU6ICdhZmZpcm1hdGl2ZScsXG4gICAgICAgICAgICAgIHRleHQ6IGkxOG4oJ0NoYXRDb2xvclBpY2tlcl9fY29uZmlybS1yZXNldCcpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4ge1xuICAgICAgICAgICAgc2V0Q29uZmlybVJlc2V0QWxsKGZhbHNlKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHRpdGxlPXtpMThuKCdDaGF0Q29sb3JQaWNrZXJfX3Jlc2V0QWxsJyl9XG4gICAgICAgID5cbiAgICAgICAgICB7aTE4bignQ2hhdENvbG9yUGlja2VyX19jb25maXJtLXJlc2V0LW1lc3NhZ2UnKX1cbiAgICAgICAgPC9Db25maXJtYXRpb25EaWFsb2c+XG4gICAgICApIDogbnVsbH1cbiAgICAgIDxTYW1wbGVNZXNzYWdlQnViYmxlc1xuICAgICAgICBiYWNrZ3JvdW5kU3R5bGU9e2dldEN1c3RvbUNvbG9yU3R5bGUoc2VsZWN0ZWRDdXN0b21Db2xvci52YWx1ZSl9XG4gICAgICAgIGNvbG9yPXtzZWxlY3RlZENvbG9yfVxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgLz5cbiAgICAgIDxociAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJDaGF0Q29sb3JQaWNrZXJfX2J1YmJsZXNcIj5cbiAgICAgICAge0NvbnZlcnNhdGlvbkNvbG9ycy5tYXAoKGNvbG9yLCBpKSA9PiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgYXJpYS1sYWJlbD17Y29sb3J9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgIGBDaGF0Q29sb3JQaWNrZXJfX2J1YmJsZSBDaGF0Q29sb3JQaWNrZXJfX2J1YmJsZS0tJHtjb2xvcn1gLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJ0NoYXRDb2xvclBpY2tlcl9fYnViYmxlLS1zZWxlY3RlZCc6IGNvbG9yID09PSBzZWxlY3RlZENvbG9yLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAga2V5PXtjb2xvcn1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uU2VsZWN0Q29sb3IoY29sb3IpfVxuICAgICAgICAgICAgb25LZXlEb3duPXsoZXY6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGV2LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgIG9uU2VsZWN0Q29sb3IoY29sb3IpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgICAgIHJlZj17aSA9PT0gMCA/IGZvY3VzUmVmIDogdW5kZWZpbmVkfVxuICAgICAgICAgIC8+XG4gICAgICAgICkpfVxuICAgICAgICB7T2JqZWN0LmtleXMoY3VzdG9tQ29sb3JzKS5tYXAoY29sb3JJZCA9PiB7XG4gICAgICAgICAgY29uc3QgY29sb3JWYWx1ZXMgPSBjdXN0b21Db2xvcnNbY29sb3JJZF07XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDdXN0b21Db2xvckJ1YmJsZVxuICAgICAgICAgICAgICBjb2xvcj17Y29sb3JWYWx1ZXN9XG4gICAgICAgICAgICAgIGNvbG9ySWQ9e2NvbG9ySWR9XG4gICAgICAgICAgICAgIGdldENvbnZlcnNhdGlvbnNXaXRoQ3VzdG9tQ29sb3I9e2dldENvbnZlcnNhdGlvbnNXaXRoQ3VzdG9tQ29sb3J9XG4gICAgICAgICAgICAgIGtleT17Y29sb3JJZH1cbiAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgaXNTZWxlY3RlZD17Y29sb3JJZCA9PT0gc2VsZWN0ZWRDdXN0b21Db2xvci5pZH1cbiAgICAgICAgICAgICAgb25DaG9vc2U9eygpID0+IHtcbiAgICAgICAgICAgICAgICBvblNlbGVjdENvbG9yKCdjdXN0b20nLCB7XG4gICAgICAgICAgICAgICAgICBpZDogY29sb3JJZCxcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBjb2xvclZhbHVlcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgb25EZWxldGU9eygpID0+IHtcbiAgICAgICAgICAgICAgICByZW1vdmVDdXN0b21Db2xvcihjb2xvcklkKTtcbiAgICAgICAgICAgICAgICByZW1vdmVDdXN0b21Db2xvck9uQ29udmVyc2F0aW9ucyhjb2xvcklkKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgb25EdXBlPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgYWRkQ3VzdG9tQ29sb3IoY29sb3JWYWx1ZXMsIGNvbnZlcnNhdGlvbklkKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgb25FZGl0PXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0Q3VzdG9tQ29sb3JUb0VkaXQoeyBpZDogY29sb3JJZCwgdmFsdWU6IGNvbG9yVmFsdWVzIH0pO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ0NoYXRDb2xvclBpY2tlcl9fY3VzdG9tLWNvbG9yLS1sYWJlbCcpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cIkNoYXRDb2xvclBpY2tlcl9fYnViYmxlIENoYXRDb2xvclBpY2tlcl9fYnViYmxlLS1jdXN0b21cIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICBzZXRDdXN0b21Db2xvclRvRWRpdCh7IGlkOiB1bmRlZmluZWQsIHZhbHVlOiB1bmRlZmluZWQgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgb25LZXlEb3duPXsoZXY6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldi5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgc2V0Q3VzdG9tQ29sb3JUb0VkaXQoeyBpZDogdW5kZWZpbmVkLCB2YWx1ZTogdW5kZWZpbmVkIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH19XG4gICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgID5cbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJDaGF0Q29sb3JQaWNrZXJfX2FkZC1pY29uXCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxociAvPlxuICAgICAge2NvbnZlcnNhdGlvbklkID8gKFxuICAgICAgICA8UGFuZWxSb3dcbiAgICAgICAgICBsYWJlbD17aTE4bignQ2hhdENvbG9yUGlja2VyX19yZXNldCcpfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIGNvbG9yU2VsZWN0ZWQoeyBjb252ZXJzYXRpb25JZCB9KTtcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgICA8UGFuZWxSb3dcbiAgICAgICAgbGFiZWw9e2kxOG4oJ0NoYXRDb2xvclBpY2tlcl9fcmVzZXRBbGwnKX1cbiAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgIGlmIChpc0dsb2JhbCkge1xuICAgICAgICAgICAgc2V0Q29uZmlybVJlc2V0V2hhdCh0cnVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0Q29uZmlybVJlc2V0QWxsKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG50eXBlIEN1c3RvbUNvbG9yQnViYmxlUHJvcHNUeXBlID0ge1xuICBjb2xvcjogQ3VzdG9tQ29sb3JUeXBlO1xuICBjb2xvcklkOiBzdHJpbmc7XG4gIGdldENvbnZlcnNhdGlvbnNXaXRoQ3VzdG9tQ29sb3I6IChcbiAgICBjb2xvcklkOiBzdHJpbmdcbiAgKSA9PiBQcm9taXNlPEFycmF5PENvbnZlcnNhdGlvblR5cGU+PjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNTZWxlY3RlZDogYm9vbGVhbjtcbiAgb25EZWxldGU6ICgpID0+IHVua25vd247XG4gIG9uRHVwZTogKCkgPT4gdW5rbm93bjtcbiAgb25FZGl0OiAoKSA9PiB1bmtub3duO1xuICBvbkNob29zZTogKCkgPT4gdW5rbm93bjtcbn07XG5cbmNvbnN0IEN1c3RvbUNvbG9yQnViYmxlID0gKHtcbiAgY29sb3IsXG4gIGNvbG9ySWQsXG4gIGdldENvbnZlcnNhdGlvbnNXaXRoQ3VzdG9tQ29sb3IsXG4gIGkxOG4sXG4gIGlzU2VsZWN0ZWQsXG4gIG9uRGVsZXRlLFxuICBvbkR1cGUsXG4gIG9uRWRpdCxcbiAgb25DaG9vc2UsXG59OiBDdXN0b21Db2xvckJ1YmJsZVByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgY29uc3QgbWVudVJlZiA9IHVzZVJlZjxhbnkgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2NvbmZpcm1EZWxldGVDb3VudCwgc2V0Q29uZmlybURlbGV0ZUNvdW50XSA9IHVzZVN0YXRlPFxuICAgIG51bWJlciB8IHVuZGVmaW5lZFxuICA+KHVuZGVmaW5lZCk7XG5cbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoZXY6IEtleWJvYXJkRXZlbnQgfCBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKCFpc1NlbGVjdGVkKSB7XG4gICAgICBvbkNob29zZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChtZW51UmVmICYmIG1lbnVSZWYuY3VycmVudCkge1xuICAgICAgbWVudVJlZi5jdXJyZW50LmhhbmRsZUNvbnRleHRDbGljayhldik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGJ1YmJsZSA9IChcbiAgICA8ZGl2XG4gICAgICBhcmlhLWxhYmVsPXtjb2xvcklkfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHtcbiAgICAgICAgQ2hhdENvbG9yUGlja2VyX19idWJibGU6IHRydWUsXG4gICAgICAgICdDaGF0Q29sb3JQaWNrZXJfX2J1YmJsZS0tY3VzdG9tLXNlbGVjdGVkJzogaXNTZWxlY3RlZCxcbiAgICAgICAgJ0NoYXRDb2xvclBpY2tlcl9fYnViYmxlLS1zZWxlY3RlZCc6IGlzU2VsZWN0ZWQsXG4gICAgICB9KX1cbiAgICAgIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfVxuICAgICAgb25LZXlEb3duPXsoZXY6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgIGhhbmRsZUNsaWNrKGV2KTtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICBzdHlsZT17e1xuICAgICAgICAuLi5nZXRDdXN0b21Db2xvclN0eWxlKGNvbG9yKSxcbiAgICAgIH19XG4gICAgLz5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7Y29uZmlybURlbGV0ZUNvdW50ID8gKFxuICAgICAgICA8Q29uZmlybWF0aW9uRGlhbG9nXG4gICAgICAgICAgYWN0aW9ucz17W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhY3Rpb246IG9uRGVsZXRlLFxuICAgICAgICAgICAgICBzdHlsZTogJ25lZ2F0aXZlJyxcbiAgICAgICAgICAgICAgdGV4dDogaTE4bignQ2hhdENvbG9yUGlja2VyX19jb250ZXh0LS1kZWxldGUnKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXX1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIG9uQ2xvc2U9eygpID0+IHtcbiAgICAgICAgICAgIHNldENvbmZpcm1EZWxldGVDb3VudCh1bmRlZmluZWQpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdGl0bGU9e2kxOG4oJ0NoYXRDb2xvclBpY2tlcl9fZGVsZXRlLS10aXRsZScpfVxuICAgICAgICA+XG4gICAgICAgICAge2kxOG4oJ0NoYXRDb2xvclBpY2tlcl9fZGVsZXRlLS1tZXNzYWdlJywgW1xuICAgICAgICAgICAgU3RyaW5nKGNvbmZpcm1EZWxldGVDb3VudCksXG4gICAgICAgICAgXSl9XG4gICAgICAgIDwvQ29uZmlybWF0aW9uRGlhbG9nPlxuICAgICAgKSA6IG51bGx9XG4gICAgICB7aXNTZWxlY3RlZCA/IChcbiAgICAgICAgPENvbnRleHRNZW51VHJpZ2dlciBpZD17Y29sb3JJZH0gcmVmPXttZW51UmVmfT5cbiAgICAgICAgICB7YnViYmxlfVxuICAgICAgICA8L0NvbnRleHRNZW51VHJpZ2dlcj5cbiAgICAgICkgOiAoXG4gICAgICAgIGJ1YmJsZVxuICAgICAgKX1cbiAgICAgIDxDb250ZXh0TWVudSBpZD17Y29sb3JJZH0+XG4gICAgICAgIDxNZW51SXRlbVxuICAgICAgICAgIGF0dHJpYnV0ZXM9e3tcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ0NoYXRDb2xvclBpY2tlcl9fY29udGV4dC0tZWRpdCcsXG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgb25FZGl0KCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHtpMThuKCdDaGF0Q29sb3JQaWNrZXJfX2NvbnRleHQtLWVkaXQnKX1cbiAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgICAgPE1lbnVJdGVtXG4gICAgICAgICAgYXR0cmlidXRlcz17e1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ2hhdENvbG9yUGlja2VyX19jb250ZXh0LS1kdXBsaWNhdGUnLFxuICAgICAgICAgIH19XG4gICAgICAgICAgb25DbGljaz17KGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG9uRHVwZSgpO1xuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICB7aTE4bignQ2hhdENvbG9yUGlja2VyX19jb250ZXh0LS1kdXBsaWNhdGUnKX1cbiAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgICAgPE1lbnVJdGVtXG4gICAgICAgICAgYXR0cmlidXRlcz17e1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ2hhdENvbG9yUGlja2VyX19jb250ZXh0LS1kZWxldGUnLFxuICAgICAgICAgIH19XG4gICAgICAgICAgb25DbGljaz17YXN5bmMgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbnMgPSBhd2FpdCBnZXRDb252ZXJzYXRpb25zV2l0aEN1c3RvbUNvbG9yKFxuICAgICAgICAgICAgICBjb2xvcklkXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKCFjb252ZXJzYXRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICBvbkRlbGV0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2V0Q29uZmlybURlbGV0ZUNvdW50KGNvbnZlcnNhdGlvbnMubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAge2kxOG4oJ0NoYXRDb2xvclBpY2tlcl9fY29udGV4dC0tZGVsZXRlJyl9XG4gICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICA8L0NvbnRleHRNZW51PlxuICAgIDwvPlxuICApO1xufTtcblxudHlwZSBDdXN0b21Db2xvckVkaXRvcldyYXBwZXJQcm9wc1R5cGUgPSB7XG4gIGN1c3RvbUNvbG9yVG9FZGl0PzogQ3VzdG9tQ29sb3JEYXRhVHlwZTtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb25DbG9zZTogKCkgPT4gdW5rbm93bjtcbiAgb25TYXZlOiAoY29sb3I6IEN1c3RvbUNvbG9yVHlwZSkgPT4gdW5rbm93bjtcbn07XG5cbmNvbnN0IEN1c3RvbUNvbG9yRWRpdG9yV3JhcHBlciA9ICh7XG4gIGN1c3RvbUNvbG9yVG9FZGl0LFxuICBpMThuLFxuICBvbkNsb3NlLFxuICBvblNhdmUsXG59OiBDdXN0b21Db2xvckVkaXRvcldyYXBwZXJQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGVkaXRvciA9IChcbiAgICA8Q3VzdG9tQ29sb3JFZGl0b3JcbiAgICAgIGN1c3RvbUNvbG9yPXtjdXN0b21Db2xvclRvRWRpdD8udmFsdWV9XG4gICAgICBpMThuPXtpMThufVxuICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICAgIG9uU2F2ZT17b25TYXZlfVxuICAgIC8+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8TW9kYWxcbiAgICAgIGhhc1hCdXR0b25cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBtb2R1bGVDbGFzc05hbWU9XCJDaGF0Q29sb3JQaWNrZXJfX21vZGFsXCJcbiAgICAgIG5vTW91c2VDbG9zZVxuICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICAgIHRpdGxlPXtpMThuKCdDdXN0b21Db2xvckVkaXRvcl9fdGl0bGUnKX1cbiAgICA+XG4gICAgICB7ZWRpdG9yfVxuICAgIDwvTW9kYWw+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUF3QztBQUN4Qyx3QkFBdUI7QUFDdkIsK0JBQTBEO0FBQzFELGdDQUFtQztBQUNuQywrQkFBa0M7QUFDbEMsbUJBQXNCO0FBRXRCLG9CQUFtQztBQUduQyxrQ0FBcUM7QUFDckMsc0JBQXlCO0FBQ3pCLGlDQUFvQztBQUVwQyw2QkFBdUM7QUE2Q2hDLE1BQU0sa0JBQWtCLHdCQUFDO0FBQUEsRUFDOUI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsZUFBZSxDQUFDO0FBQUEsRUFDaEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsV0FBVztB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
