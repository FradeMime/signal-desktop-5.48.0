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
var AvatarEditor_exports = {};
__export(AvatarEditor_exports, {
  AvatarEditor: () => AvatarEditor
});
module.exports = __toCommonJS(AvatarEditor_exports);
var import_react = __toESM(require("react"));
var import_AvatarIconEditor = require("./AvatarIconEditor");
var import_AvatarModalButtons = require("./AvatarModalButtons");
var import_AvatarPreview = require("./AvatarPreview");
var import_AvatarTextEditor = require("./AvatarTextEditor");
var import_AvatarUploadButton = require("./AvatarUploadButton");
var import_BetterAvatar = require("./BetterAvatar");
var import_avatarDataToBytes = require("../util/avatarDataToBytes");
var import_createAvatarData = require("../util/createAvatarData");
var import_isSameAvatarData = require("../util/isSameAvatarData");
var import_missingCaseError = require("../util/missingCaseError");
var EditMode = /* @__PURE__ */ ((EditMode2) => {
  EditMode2["Main"] = "Main";
  EditMode2["Custom"] = "Custom";
  EditMode2["Text"] = "Text";
  return EditMode2;
})(EditMode || {});
const AvatarEditor = /* @__PURE__ */ __name(({
  avatarColor,
  avatarPath,
  avatarValue,
  conversationId,
  conversationTitle,
  deleteAvatarFromDisk,
  i18n,
  isGroup,
  onCancel,
  onSave,
  userAvatarData,
  replaceAvatar,
  saveAvatarToDisk
}) => {
  const [provisionalSelectedAvatar, setProvisionalSelectedAvatar] = (0, import_react.useState)();
  const [avatarPreview, setAvatarPreview] = (0, import_react.useState)(avatarValue);
  const [initialAvatar, setInitialAvatar] = (0, import_react.useState)(avatarValue);
  const [localAvatarData, setLocalAvatarData] = (0, import_react.useState)(userAvatarData.slice());
  const [pendingClear, setPendingClear] = (0, import_react.useState)(false);
  const [editMode, setEditMode] = (0, import_react.useState)("Main" /* Main */);
  const getSelectedAvatar = (0, import_react.useCallback)((avatarToFind) => localAvatarData.find((avatarData) => (0, import_isSameAvatarData.isSameAvatarData)(avatarData, avatarToFind)), [localAvatarData]);
  const selectedAvatar = getSelectedAvatar(provisionalSelectedAvatar);
  (0, import_react.useEffect)(() => {
    let shouldCancel = false;
    async function cacheAvatars() {
      const newAvatarData = await Promise.all(userAvatarData.map(async (avatarData) => {
        if (avatarData.buffer) {
          return avatarData;
        }
        const buffer = await (0, import_avatarDataToBytes.avatarDataToBytes)(avatarData);
        return {
          ...avatarData,
          buffer
        };
      }));
      if (!shouldCancel) {
        setLocalAvatarData(newAvatarData);
      }
    }
    cacheAvatars();
    return () => {
      shouldCancel = true;
    };
  }, [setLocalAvatarData, userAvatarData]);
  const updateAvatarDataList = (0, import_react.useCallback)((newAvatarData, staleAvatarData) => {
    const existingAvatarData = staleAvatarData ? localAvatarData.filter((avatarData) => avatarData !== staleAvatarData) : localAvatarData;
    if (newAvatarData) {
      setAvatarPreview(newAvatarData.buffer);
      setLocalAvatarData([newAvatarData, ...existingAvatarData]);
      setProvisionalSelectedAvatar(newAvatarData);
    } else {
      setLocalAvatarData(existingAvatarData);
      if ((0, import_isSameAvatarData.isSameAvatarData)(selectedAvatar, staleAvatarData)) {
        setAvatarPreview(void 0);
        setProvisionalSelectedAvatar(void 0);
      }
    }
  }, [
    localAvatarData,
    selectedAvatar,
    setAvatarPreview,
    setLocalAvatarData,
    setProvisionalSelectedAvatar
  ]);
  const handleAvatarLoaded = (0, import_react.useCallback)((avatarBuffer) => {
    setAvatarPreview(avatarBuffer);
    setInitialAvatar(avatarBuffer);
  }, []);
  const hasChanges = initialAvatar !== avatarPreview || Boolean(pendingClear && avatarPath);
  let content;
  if (editMode === "Main" /* Main */) {
    content = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "AvatarEditor__preview"
    }, /* @__PURE__ */ import_react.default.createElement(import_AvatarPreview.AvatarPreview, {
      avatarColor,
      avatarPath: pendingClear ? void 0 : avatarPath,
      avatarValue: avatarPreview,
      conversationTitle,
      i18n,
      isGroup,
      onAvatarLoaded: handleAvatarLoaded,
      onClear: () => {
        setPendingClear(true);
        setAvatarPreview(void 0);
        setProvisionalSelectedAvatar(void 0);
      }
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "AvatarEditor__top-buttons"
    }, /* @__PURE__ */ import_react.default.createElement(import_AvatarUploadButton.AvatarUploadButton, {
      className: "AvatarEditor__button AvatarEditor__button--photo",
      i18n,
      onChange: (newAvatar) => {
        const avatarData = (0, import_createAvatarData.createAvatarData)({
          buffer: newAvatar,
          imagePath: "TMP"
        });
        saveAvatarToDisk(avatarData, conversationId);
        updateAvatarDataList(avatarData);
      }
    }), /* @__PURE__ */ import_react.default.createElement("button", {
      className: "AvatarEditor__button AvatarEditor__button--text",
      onClick: () => {
        setProvisionalSelectedAvatar(void 0);
        setEditMode("Text" /* Text */);
      },
      type: "button"
    }, i18n("text")))), /* @__PURE__ */ import_react.default.createElement("hr", {
      className: "AvatarEditor__divider"
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "AvatarEditor__avatar-selector-title"
    }, i18n("AvatarEditor--choose")), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "AvatarEditor__avatars"
    }, localAvatarData.map((avatarData) => /* @__PURE__ */ import_react.default.createElement(import_BetterAvatar.BetterAvatar, {
      avatarData,
      key: avatarData.id,
      i18n,
      isSelected: (0, import_isSameAvatarData.isSameAvatarData)(avatarData, selectedAvatar),
      onClick: (avatarBuffer) => {
        if ((0, import_isSameAvatarData.isSameAvatarData)(avatarData, selectedAvatar)) {
          if (avatarData.text) {
            setEditMode("Text" /* Text */);
          } else if (avatarData.icon) {
            setEditMode("Custom" /* Custom */);
          }
        } else {
          setAvatarPreview(avatarBuffer);
          setProvisionalSelectedAvatar(avatarData);
        }
      },
      onDelete: () => {
        updateAvatarDataList(void 0, avatarData);
        deleteAvatarFromDisk(avatarData, conversationId);
      }
    }))), /* @__PURE__ */ import_react.default.createElement(import_AvatarModalButtons.AvatarModalButtons, {
      hasChanges,
      i18n,
      onCancel,
      onSave: () => {
        if (selectedAvatar) {
          replaceAvatar(selectedAvatar, selectedAvatar, conversationId);
        }
        onSave(avatarPreview);
      }
    }));
  } else if (editMode === "Text" /* Text */) {
    content = /* @__PURE__ */ import_react.default.createElement(import_AvatarTextEditor.AvatarTextEditor, {
      avatarData: selectedAvatar,
      i18n,
      onCancel: () => {
        setEditMode("Main" /* Main */);
        if (selectedAvatar) {
          return;
        }
        const actualAvatarSelected = localAvatarData.find((avatarData) => avatarData.buffer === avatarPreview);
        if (actualAvatarSelected) {
          setProvisionalSelectedAvatar(actualAvatarSelected);
        }
      },
      onDone: (avatarBuffer, avatarData) => {
        const newAvatarData = {
          ...avatarData,
          buffer: avatarBuffer
        };
        updateAvatarDataList(newAvatarData, selectedAvatar);
        setEditMode("Main" /* Main */);
        replaceAvatar(newAvatarData, selectedAvatar, conversationId);
      }
    });
  } else if (editMode === "Custom" /* Custom */) {
    if (!selectedAvatar) {
      throw new Error("No selected avatar and editMode is custom");
    }
    content = /* @__PURE__ */ import_react.default.createElement(import_AvatarIconEditor.AvatarIconEditor, {
      avatarData: selectedAvatar,
      i18n,
      onClose: (avatarData) => {
        if (avatarData) {
          updateAvatarDataList(avatarData, selectedAvatar);
          replaceAvatar(avatarData, selectedAvatar, conversationId);
        }
        setEditMode("Main" /* Main */);
      }
    });
  } else {
    throw (0, import_missingCaseError.missingCaseError)(editMode);
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "AvatarEditor"
  }, content);
}, "AvatarEditor");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AvatarEditor
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyRWRpdG9yLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgQXZhdGFyQ29sb3JUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB0eXBlIHtcbiAgQXZhdGFyRGF0YVR5cGUsXG4gIERlbGV0ZUF2YXRhckZyb21EaXNrQWN0aW9uVHlwZSxcbiAgUmVwbGFjZUF2YXRhckFjdGlvblR5cGUsXG4gIFNhdmVBdmF0YXJUb0Rpc2tBY3Rpb25UeXBlLFxufSBmcm9tICcuLi90eXBlcy9BdmF0YXInO1xuaW1wb3J0IHsgQXZhdGFySWNvbkVkaXRvciB9IGZyb20gJy4vQXZhdGFySWNvbkVkaXRvcic7XG5pbXBvcnQgeyBBdmF0YXJNb2RhbEJ1dHRvbnMgfSBmcm9tICcuL0F2YXRhck1vZGFsQnV0dG9ucyc7XG5pbXBvcnQgeyBBdmF0YXJQcmV2aWV3IH0gZnJvbSAnLi9BdmF0YXJQcmV2aWV3JztcbmltcG9ydCB7IEF2YXRhclRleHRFZGl0b3IgfSBmcm9tICcuL0F2YXRhclRleHRFZGl0b3InO1xuaW1wb3J0IHsgQXZhdGFyVXBsb2FkQnV0dG9uIH0gZnJvbSAnLi9BdmF0YXJVcGxvYWRCdXR0b24nO1xuaW1wb3J0IHsgQmV0dGVyQXZhdGFyIH0gZnJvbSAnLi9CZXR0ZXJBdmF0YXInO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBhdmF0YXJEYXRhVG9CeXRlcyB9IGZyb20gJy4uL3V0aWwvYXZhdGFyRGF0YVRvQnl0ZXMnO1xuaW1wb3J0IHsgY3JlYXRlQXZhdGFyRGF0YSB9IGZyb20gJy4uL3V0aWwvY3JlYXRlQXZhdGFyRGF0YSc7XG5pbXBvcnQgeyBpc1NhbWVBdmF0YXJEYXRhIH0gZnJvbSAnLi4vdXRpbC9pc1NhbWVBdmF0YXJEYXRhJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGF2YXRhckNvbG9yPzogQXZhdGFyQ29sb3JUeXBlO1xuICBhdmF0YXJQYXRoPzogc3RyaW5nO1xuICBhdmF0YXJWYWx1ZT86IFVpbnQ4QXJyYXk7XG4gIGNvbnZlcnNhdGlvbklkPzogc3RyaW5nO1xuICBjb252ZXJzYXRpb25UaXRsZT86IHN0cmluZztcbiAgZGVsZXRlQXZhdGFyRnJvbURpc2s6IERlbGV0ZUF2YXRhckZyb21EaXNrQWN0aW9uVHlwZTtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNHcm91cD86IGJvb2xlYW47XG4gIG9uQ2FuY2VsOiAoKSA9PiB1bmtub3duO1xuICBvblNhdmU6IChidWZmZXI6IFVpbnQ4QXJyYXkgfCB1bmRlZmluZWQpID0+IHVua25vd247XG4gIHVzZXJBdmF0YXJEYXRhOiBSZWFkb25seUFycmF5PEF2YXRhckRhdGFUeXBlPjtcbiAgcmVwbGFjZUF2YXRhcjogUmVwbGFjZUF2YXRhckFjdGlvblR5cGU7XG4gIHNhdmVBdmF0YXJUb0Rpc2s6IFNhdmVBdmF0YXJUb0Rpc2tBY3Rpb25UeXBlO1xufTtcblxuZW51bSBFZGl0TW9kZSB7XG4gIE1haW4gPSAnTWFpbicsXG4gIEN1c3RvbSA9ICdDdXN0b20nLFxuICBUZXh0ID0gJ1RleHQnLFxufVxuXG5leHBvcnQgY29uc3QgQXZhdGFyRWRpdG9yID0gKHtcbiAgYXZhdGFyQ29sb3IsXG4gIGF2YXRhclBhdGgsXG4gIGF2YXRhclZhbHVlLFxuICBjb252ZXJzYXRpb25JZCxcbiAgY29udmVyc2F0aW9uVGl0bGUsXG4gIGRlbGV0ZUF2YXRhckZyb21EaXNrLFxuICBpMThuLFxuICBpc0dyb3VwLFxuICBvbkNhbmNlbCxcbiAgb25TYXZlLFxuICB1c2VyQXZhdGFyRGF0YSxcbiAgcmVwbGFjZUF2YXRhcixcbiAgc2F2ZUF2YXRhclRvRGlzayxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgW3Byb3Zpc2lvbmFsU2VsZWN0ZWRBdmF0YXIsIHNldFByb3Zpc2lvbmFsU2VsZWN0ZWRBdmF0YXJdID0gdXNlU3RhdGU8XG4gICAgQXZhdGFyRGF0YVR5cGUgfCB1bmRlZmluZWRcbiAgPigpO1xuICBjb25zdCBbYXZhdGFyUHJldmlldywgc2V0QXZhdGFyUHJldmlld10gPSB1c2VTdGF0ZTxVaW50OEFycmF5IHwgdW5kZWZpbmVkPihcbiAgICBhdmF0YXJWYWx1ZVxuICApO1xuICBjb25zdCBbaW5pdGlhbEF2YXRhciwgc2V0SW5pdGlhbEF2YXRhcl0gPSB1c2VTdGF0ZTxVaW50OEFycmF5IHwgdW5kZWZpbmVkPihcbiAgICBhdmF0YXJWYWx1ZVxuICApO1xuICBjb25zdCBbbG9jYWxBdmF0YXJEYXRhLCBzZXRMb2NhbEF2YXRhckRhdGFdID0gdXNlU3RhdGU8QXJyYXk8QXZhdGFyRGF0YVR5cGU+PihcbiAgICB1c2VyQXZhdGFyRGF0YS5zbGljZSgpXG4gICk7XG4gIGNvbnN0IFtwZW5kaW5nQ2xlYXIsIHNldFBlbmRpbmdDbGVhcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgW2VkaXRNb2RlLCBzZXRFZGl0TW9kZV0gPSB1c2VTdGF0ZTxFZGl0TW9kZT4oRWRpdE1vZGUuTWFpbik7XG5cbiAgY29uc3QgZ2V0U2VsZWN0ZWRBdmF0YXIgPSB1c2VDYWxsYmFjayhcbiAgICBhdmF0YXJUb0ZpbmQgPT5cbiAgICAgIGxvY2FsQXZhdGFyRGF0YS5maW5kKGF2YXRhckRhdGEgPT5cbiAgICAgICAgaXNTYW1lQXZhdGFyRGF0YShhdmF0YXJEYXRhLCBhdmF0YXJUb0ZpbmQpXG4gICAgICApLFxuICAgIFtsb2NhbEF2YXRhckRhdGFdXG4gICk7XG5cbiAgY29uc3Qgc2VsZWN0ZWRBdmF0YXIgPSBnZXRTZWxlY3RlZEF2YXRhcihwcm92aXNpb25hbFNlbGVjdGVkQXZhdGFyKTtcblxuICAvLyBDYWNoaW5nIHRoZSBVaW50OEFycmF5IHByb2R1Y2VkIGludG8gYXZhdGFyRGF0YSBhcyBidWZmZXIgYmVjYXVzZVxuICAvLyB0aGF0IGZ1bmN0aW9uIGlzIGEgbGl0dGxlIGV4cGVuc2l2ZSB0byBydW4gYW5kIHNvIHdlIGRvbid0IGZsaWNrZXIgdGhlIFVJLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBzaG91bGRDYW5jZWwgPSBmYWxzZTtcblxuICAgIGFzeW5jIGZ1bmN0aW9uIGNhY2hlQXZhdGFycygpIHtcbiAgICAgIGNvbnN0IG5ld0F2YXRhckRhdGEgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgdXNlckF2YXRhckRhdGEubWFwKGFzeW5jIGF2YXRhckRhdGEgPT4ge1xuICAgICAgICAgIGlmIChhdmF0YXJEYXRhLmJ1ZmZlcikge1xuICAgICAgICAgICAgcmV0dXJuIGF2YXRhckRhdGE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IGF2YXRhckRhdGFUb0J5dGVzKGF2YXRhckRhdGEpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5hdmF0YXJEYXRhLFxuICAgICAgICAgICAgYnVmZmVyLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBpZiAoIXNob3VsZENhbmNlbCkge1xuICAgICAgICBzZXRMb2NhbEF2YXRhckRhdGEobmV3QXZhdGFyRGF0YSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FjaGVBdmF0YXJzKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgc2hvdWxkQ2FuY2VsID0gdHJ1ZTtcbiAgICB9O1xuICB9LCBbc2V0TG9jYWxBdmF0YXJEYXRhLCB1c2VyQXZhdGFyRGF0YV0pO1xuXG4gIC8vIFRoaXMgZnVuY3Rpb24gb3B0aW1pc3RjYWxseSB1cGRhdGVzIHVzZXJBdmF0YXJEYXRhIHNvIHdlIGRvbid0IGhhdmUgdG9cbiAgLy8gd2FpdCBmb3Igc2F2ZUF2YXRhclRvRGlzayB0byBmaW5pc2ggYmVmb3JlIGRpc3BsYXlpbmcgc29tZXRoaW5nIHRvIHRoZVxuICAvLyB1c2VyLiBBcyBhIGJvbnVzIHRoZSBjb21wb25lbnQgZnVsbHkgd29ya3MgaW4gc3Rvcnlib29rIVxuICBjb25zdCB1cGRhdGVBdmF0YXJEYXRhTGlzdCA9IHVzZUNhbGxiYWNrKFxuICAgIChuZXdBdmF0YXJEYXRhPzogQXZhdGFyRGF0YVR5cGUsIHN0YWxlQXZhdGFyRGF0YT86IEF2YXRhckRhdGFUeXBlKSA9PiB7XG4gICAgICBjb25zdCBleGlzdGluZ0F2YXRhckRhdGEgPSBzdGFsZUF2YXRhckRhdGFcbiAgICAgICAgPyBsb2NhbEF2YXRhckRhdGEuZmlsdGVyKGF2YXRhckRhdGEgPT4gYXZhdGFyRGF0YSAhPT0gc3RhbGVBdmF0YXJEYXRhKVxuICAgICAgICA6IGxvY2FsQXZhdGFyRGF0YTtcblxuICAgICAgaWYgKG5ld0F2YXRhckRhdGEpIHtcbiAgICAgICAgc2V0QXZhdGFyUHJldmlldyhuZXdBdmF0YXJEYXRhLmJ1ZmZlcik7XG4gICAgICAgIHNldExvY2FsQXZhdGFyRGF0YShbbmV3QXZhdGFyRGF0YSwgLi4uZXhpc3RpbmdBdmF0YXJEYXRhXSk7XG4gICAgICAgIHNldFByb3Zpc2lvbmFsU2VsZWN0ZWRBdmF0YXIobmV3QXZhdGFyRGF0YSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRMb2NhbEF2YXRhckRhdGEoZXhpc3RpbmdBdmF0YXJEYXRhKTtcbiAgICAgICAgaWYgKGlzU2FtZUF2YXRhckRhdGEoc2VsZWN0ZWRBdmF0YXIsIHN0YWxlQXZhdGFyRGF0YSkpIHtcbiAgICAgICAgICBzZXRBdmF0YXJQcmV2aWV3KHVuZGVmaW5lZCk7XG4gICAgICAgICAgc2V0UHJvdmlzaW9uYWxTZWxlY3RlZEF2YXRhcih1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBbXG4gICAgICBsb2NhbEF2YXRhckRhdGEsXG4gICAgICBzZWxlY3RlZEF2YXRhcixcbiAgICAgIHNldEF2YXRhclByZXZpZXcsXG4gICAgICBzZXRMb2NhbEF2YXRhckRhdGEsXG4gICAgICBzZXRQcm92aXNpb25hbFNlbGVjdGVkQXZhdGFyLFxuICAgIF1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVBdmF0YXJMb2FkZWQgPSB1c2VDYWxsYmFjayhhdmF0YXJCdWZmZXIgPT4ge1xuICAgIHNldEF2YXRhclByZXZpZXcoYXZhdGFyQnVmZmVyKTtcbiAgICBzZXRJbml0aWFsQXZhdGFyKGF2YXRhckJ1ZmZlcik7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYXNDaGFuZ2VzID1cbiAgICBpbml0aWFsQXZhdGFyICE9PSBhdmF0YXJQcmV2aWV3IHx8IEJvb2xlYW4ocGVuZGluZ0NsZWFyICYmIGF2YXRhclBhdGgpO1xuXG4gIGxldCBjb250ZW50OiBKU1guRWxlbWVudCB8IHVuZGVmaW5lZDtcblxuICBpZiAoZWRpdE1vZGUgPT09IEVkaXRNb2RlLk1haW4pIHtcbiAgICBjb250ZW50ID0gKFxuICAgICAgPD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJBdmF0YXJFZGl0b3JfX3ByZXZpZXdcIj5cbiAgICAgICAgICA8QXZhdGFyUHJldmlld1xuICAgICAgICAgICAgYXZhdGFyQ29sb3I9e2F2YXRhckNvbG9yfVxuICAgICAgICAgICAgYXZhdGFyUGF0aD17cGVuZGluZ0NsZWFyID8gdW5kZWZpbmVkIDogYXZhdGFyUGF0aH1cbiAgICAgICAgICAgIGF2YXRhclZhbHVlPXthdmF0YXJQcmV2aWV3fVxuICAgICAgICAgICAgY29udmVyc2F0aW9uVGl0bGU9e2NvbnZlcnNhdGlvblRpdGxlfVxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIGlzR3JvdXA9e2lzR3JvdXB9XG4gICAgICAgICAgICBvbkF2YXRhckxvYWRlZD17aGFuZGxlQXZhdGFyTG9hZGVkfVxuICAgICAgICAgICAgb25DbGVhcj17KCkgPT4ge1xuICAgICAgICAgICAgICBzZXRQZW5kaW5nQ2xlYXIodHJ1ZSk7XG4gICAgICAgICAgICAgIHNldEF2YXRhclByZXZpZXcodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgc2V0UHJvdmlzaW9uYWxTZWxlY3RlZEF2YXRhcih1bmRlZmluZWQpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQXZhdGFyRWRpdG9yX190b3AtYnV0dG9uc1wiPlxuICAgICAgICAgICAgPEF2YXRhclVwbG9hZEJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJBdmF0YXJFZGl0b3JfX2J1dHRvbiBBdmF0YXJFZGl0b3JfX2J1dHRvbi0tcGhvdG9cIlxuICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICBvbkNoYW5nZT17bmV3QXZhdGFyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhdmF0YXJEYXRhID0gY3JlYXRlQXZhdGFyRGF0YSh7XG4gICAgICAgICAgICAgICAgICBidWZmZXI6IG5ld0F2YXRhcixcbiAgICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgc28gdGhhdCB0aGUgbmV3bHkgY3JlYXRlZCBhdmF0YXIgZ2V0cyBhbiBYXG4gICAgICAgICAgICAgICAgICBpbWFnZVBhdGg6ICdUTVAnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNhdmVBdmF0YXJUb0Rpc2soYXZhdGFyRGF0YSwgY29udmVyc2F0aW9uSWQpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZUF2YXRhckRhdGFMaXN0KGF2YXRhckRhdGEpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiQXZhdGFyRWRpdG9yX19idXR0b24gQXZhdGFyRWRpdG9yX19idXR0b24tLXRleHRcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0UHJvdmlzaW9uYWxTZWxlY3RlZEF2YXRhcih1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIHNldEVkaXRNb2RlKEVkaXRNb2RlLlRleHQpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2kxOG4oJ3RleHQnKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGhyIGNsYXNzTmFtZT1cIkF2YXRhckVkaXRvcl9fZGl2aWRlclwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQXZhdGFyRWRpdG9yX19hdmF0YXItc2VsZWN0b3ItdGl0bGVcIj5cbiAgICAgICAgICB7aTE4bignQXZhdGFyRWRpdG9yLS1jaG9vc2UnKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQXZhdGFyRWRpdG9yX19hdmF0YXJzXCI+XG4gICAgICAgICAge2xvY2FsQXZhdGFyRGF0YS5tYXAoYXZhdGFyRGF0YSA9PiAoXG4gICAgICAgICAgICA8QmV0dGVyQXZhdGFyXG4gICAgICAgICAgICAgIGF2YXRhckRhdGE9e2F2YXRhckRhdGF9XG4gICAgICAgICAgICAgIGtleT17YXZhdGFyRGF0YS5pZH1cbiAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgaXNTZWxlY3RlZD17aXNTYW1lQXZhdGFyRGF0YShhdmF0YXJEYXRhLCBzZWxlY3RlZEF2YXRhcil9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2F2YXRhckJ1ZmZlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU2FtZUF2YXRhckRhdGEoYXZhdGFyRGF0YSwgc2VsZWN0ZWRBdmF0YXIpKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoYXZhdGFyRGF0YS50ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEVkaXRNb2RlKEVkaXRNb2RlLlRleHQpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhdmF0YXJEYXRhLmljb24pIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RWRpdE1vZGUoRWRpdE1vZGUuQ3VzdG9tKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgc2V0QXZhdGFyUHJldmlldyhhdmF0YXJCdWZmZXIpO1xuICAgICAgICAgICAgICAgICAgc2V0UHJvdmlzaW9uYWxTZWxlY3RlZEF2YXRhcihhdmF0YXJEYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIG9uRGVsZXRlPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgdXBkYXRlQXZhdGFyRGF0YUxpc3QodW5kZWZpbmVkLCBhdmF0YXJEYXRhKTtcbiAgICAgICAgICAgICAgICBkZWxldGVBdmF0YXJGcm9tRGlzayhhdmF0YXJEYXRhLCBjb252ZXJzYXRpb25JZCk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEF2YXRhck1vZGFsQnV0dG9uc1xuICAgICAgICAgIGhhc0NoYW5nZXM9e2hhc0NoYW5nZXN9XG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBvbkNhbmNlbD17b25DYW5jZWx9XG4gICAgICAgICAgb25TYXZlPXsoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRBdmF0YXIpIHtcbiAgICAgICAgICAgICAgcmVwbGFjZUF2YXRhcihzZWxlY3RlZEF2YXRhciwgc2VsZWN0ZWRBdmF0YXIsIGNvbnZlcnNhdGlvbklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uU2F2ZShhdmF0YXJQcmV2aWV3KTtcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC8+XG4gICAgKTtcbiAgfSBlbHNlIGlmIChlZGl0TW9kZSA9PT0gRWRpdE1vZGUuVGV4dCkge1xuICAgIGNvbnRlbnQgPSAoXG4gICAgICA8QXZhdGFyVGV4dEVkaXRvclxuICAgICAgICBhdmF0YXJEYXRhPXtzZWxlY3RlZEF2YXRhcn1cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgb25DYW5jZWw9eygpID0+IHtcbiAgICAgICAgICBzZXRFZGl0TW9kZShFZGl0TW9kZS5NYWluKTtcbiAgICAgICAgICBpZiAoc2VsZWN0ZWRBdmF0YXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBUaGUgc2VsZWN0ZWQgYXZhdGFyIHdhcyBjbGVhcmVkIHdoZW4gd2UgZW50ZXJlZCB0ZXh0IG1vZGUgc28gd2VcbiAgICAgICAgICAvLyBuZWVkIHRvIGZpbmQgaWYgb25lIGlzIGFjdHVhbGx5IHNlbGVjdGVkIGlmIGl0IG1hdGNoZXMgdGhlIGN1cnJlbnRcbiAgICAgICAgICAvLyBwcmV2aWV3LlxuICAgICAgICAgIGNvbnN0IGFjdHVhbEF2YXRhclNlbGVjdGVkID0gbG9jYWxBdmF0YXJEYXRhLmZpbmQoXG4gICAgICAgICAgICBhdmF0YXJEYXRhID0+IGF2YXRhckRhdGEuYnVmZmVyID09PSBhdmF0YXJQcmV2aWV3XG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoYWN0dWFsQXZhdGFyU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHNldFByb3Zpc2lvbmFsU2VsZWN0ZWRBdmF0YXIoYWN0dWFsQXZhdGFyU2VsZWN0ZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfX1cbiAgICAgICAgb25Eb25lPXsoYXZhdGFyQnVmZmVyLCBhdmF0YXJEYXRhKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmV3QXZhdGFyRGF0YSA9IHtcbiAgICAgICAgICAgIC4uLmF2YXRhckRhdGEsXG4gICAgICAgICAgICBidWZmZXI6IGF2YXRhckJ1ZmZlcixcbiAgICAgICAgICB9O1xuICAgICAgICAgIHVwZGF0ZUF2YXRhckRhdGFMaXN0KG5ld0F2YXRhckRhdGEsIHNlbGVjdGVkQXZhdGFyKTtcbiAgICAgICAgICBzZXRFZGl0TW9kZShFZGl0TW9kZS5NYWluKTtcbiAgICAgICAgICByZXBsYWNlQXZhdGFyKG5ld0F2YXRhckRhdGEsIHNlbGVjdGVkQXZhdGFyLCBjb252ZXJzYXRpb25JZCk7XG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICk7XG4gIH0gZWxzZSBpZiAoZWRpdE1vZGUgPT09IEVkaXRNb2RlLkN1c3RvbSkge1xuICAgIGlmICghc2VsZWN0ZWRBdmF0YXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gc2VsZWN0ZWQgYXZhdGFyIGFuZCBlZGl0TW9kZSBpcyBjdXN0b20nKTtcbiAgICB9XG5cbiAgICBjb250ZW50ID0gKFxuICAgICAgPEF2YXRhckljb25FZGl0b3JcbiAgICAgICAgYXZhdGFyRGF0YT17c2VsZWN0ZWRBdmF0YXJ9XG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIG9uQ2xvc2U9e2F2YXRhckRhdGEgPT4ge1xuICAgICAgICAgIGlmIChhdmF0YXJEYXRhKSB7XG4gICAgICAgICAgICB1cGRhdGVBdmF0YXJEYXRhTGlzdChhdmF0YXJEYXRhLCBzZWxlY3RlZEF2YXRhcik7XG4gICAgICAgICAgICByZXBsYWNlQXZhdGFyKGF2YXRhckRhdGEsIHNlbGVjdGVkQXZhdGFyLCBjb252ZXJzYXRpb25JZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldEVkaXRNb2RlKEVkaXRNb2RlLk1haW4pO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IoZWRpdE1vZGUpO1xuICB9XG5cbiAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiQXZhdGFy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
