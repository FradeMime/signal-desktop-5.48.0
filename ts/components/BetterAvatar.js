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
var BetterAvatar_exports = {};
__export(BetterAvatar_exports, {
  BetterAvatar: () => BetterAvatar
});
module.exports = __toCommonJS(BetterAvatar_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_BetterAvatarBubble = require("./BetterAvatarBubble");
var import_Spinner = require("./Spinner");
var import_avatarDataToBytes = require("../util/avatarDataToBytes");
const BetterAvatar = /* @__PURE__ */ __name(({
  avatarData,
  i18n,
  isSelected,
  onClick,
  onDelete,
  size = 48
}) => {
  const [avatarBuffer, setAvatarBuffer] = (0, import_react.useState)(avatarData.buffer);
  const [avatarURL, setAvatarURL] = (0, import_react.useState)(void 0);
  (0, import_react.useEffect)(() => {
    let shouldCancel = false;
    async function makeAvatar() {
      const buffer = await (0, import_avatarDataToBytes.avatarDataToBytes)(avatarData);
      if (!shouldCancel) {
        setAvatarBuffer(buffer);
      }
    }
    if (avatarBuffer) {
      return import_lodash.noop;
    }
    makeAvatar();
    return () => {
      shouldCancel = true;
    };
  }, [avatarBuffer, avatarData]);
  (0, import_react.useEffect)(() => {
    if (avatarBuffer) {
      const url = URL.createObjectURL(new Blob([avatarBuffer]));
      setAvatarURL(url);
    }
  }, [avatarBuffer]);
  (0, import_react.useEffect)(() => {
    return () => {
      if (avatarURL) {
        URL.revokeObjectURL(avatarURL);
      }
    };
  }, [avatarURL]);
  const isEditable = Boolean(avatarData.color);
  const handleDelete = !avatarData.icon ? (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    onDelete();
  } : void 0;
  return /* @__PURE__ */ import_react.default.createElement(import_BetterAvatarBubble.BetterAvatarBubble, {
    i18n,
    isSelected,
    onDelete: handleDelete,
    onSelect: () => {
      onClick(avatarBuffer);
    },
    style: {
      backgroundImage: avatarURL ? `url(${avatarURL})` : void 0,
      backgroundSize: size,
      height: size + 8,
      width: size + 8
    }
  }, isEditable && isSelected && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "BetterAvatarBubble--editable"
  }), !avatarURL && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-Avatar__spinner-container"
  }, /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
    size: `${size - 8}px`,
    svgSize: "small",
    direction: "on-avatar"
  })));
}, "BetterAvatar");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BetterAvatar
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQmV0dGVyQXZhdGFyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IE1vdXNlRXZlbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHR5cGUgeyBBdmF0YXJEYXRhVHlwZSB9IGZyb20gJy4uL3R5cGVzL0F2YXRhcic7XG5pbXBvcnQgeyBCZXR0ZXJBdmF0YXJCdWJibGUgfSBmcm9tICcuL0JldHRlckF2YXRhckJ1YmJsZSc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IFNwaW5uZXIgfSBmcm9tICcuL1NwaW5uZXInO1xuaW1wb3J0IHsgYXZhdGFyRGF0YVRvQnl0ZXMgfSBmcm9tICcuLi91dGlsL2F2YXRhckRhdGFUb0J5dGVzJztcblxudHlwZSBBdmF0YXJTaXplID0gNDggfCA4MDtcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBhdmF0YXJEYXRhOiBBdmF0YXJEYXRhVHlwZTtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNTZWxlY3RlZD86IGJvb2xlYW47XG4gIG9uQ2xpY2s6IChhdmF0YXJCdWZmZXI6IFVpbnQ4QXJyYXkgfCB1bmRlZmluZWQpID0+IHVua25vd247XG4gIG9uRGVsZXRlOiAoKSA9PiB1bmtub3duO1xuICBzaXplPzogQXZhdGFyU2l6ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBCZXR0ZXJBdmF0YXIgPSAoe1xuICBhdmF0YXJEYXRhLFxuICBpMThuLFxuICBpc1NlbGVjdGVkLFxuICBvbkNsaWNrLFxuICBvbkRlbGV0ZSxcbiAgc2l6ZSA9IDQ4LFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBbYXZhdGFyQnVmZmVyLCBzZXRBdmF0YXJCdWZmZXJdID0gdXNlU3RhdGU8VWludDhBcnJheSB8IHVuZGVmaW5lZD4oXG4gICAgYXZhdGFyRGF0YS5idWZmZXJcbiAgKTtcbiAgY29uc3QgW2F2YXRhclVSTCwgc2V0QXZhdGFyVVJMXSA9IHVzZVN0YXRlPHN0cmluZyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBzaG91bGRDYW5jZWwgPSBmYWxzZTtcblxuICAgIGFzeW5jIGZ1bmN0aW9uIG1ha2VBdmF0YXIoKSB7XG4gICAgICBjb25zdCBidWZmZXIgPSBhd2FpdCBhdmF0YXJEYXRhVG9CeXRlcyhhdmF0YXJEYXRhKTtcbiAgICAgIGlmICghc2hvdWxkQ2FuY2VsKSB7XG4gICAgICAgIHNldEF2YXRhckJ1ZmZlcihidWZmZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHdlIGRvbid0IGhhdmUgdGhpcyB3ZSdsbCBnZXQgbG90cyBvZiBmbGFzaGluZyBiZWNhdXNlIGF2YXRhckRhdGFcbiAgICAvLyBjaGFuZ2VzIHRvbyBtdWNoLiBPbmNlIHdlIGhhdmUgYSBidWZmZXIgc2V0IHdlIGRvbid0IG5lZWQgdG8gcmVsb2FkLlxuICAgIGlmIChhdmF0YXJCdWZmZXIpIHtcbiAgICAgIHJldHVybiBub29wO1xuICAgIH1cblxuICAgIG1ha2VBdmF0YXIoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBzaG91bGRDYW5jZWwgPSB0cnVlO1xuICAgIH07XG4gIH0sIFthdmF0YXJCdWZmZXIsIGF2YXRhckRhdGFdKTtcblxuICAvLyBDb252ZXJ0IGF2YXRhcidzIFVpbnQ4QXJyYXkgdG8gYSBVUkwgb2JqZWN0XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGF2YXRhckJ1ZmZlcikge1xuICAgICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbYXZhdGFyQnVmZmVyXSkpO1xuXG4gICAgICBzZXRBdmF0YXJVUkwodXJsKTtcbiAgICB9XG4gIH0sIFthdmF0YXJCdWZmZXJdKTtcblxuICAvLyBDbGVhbiB1cCBhbnkgcmVtYWluaW5nIG9iamVjdCBVUkxzXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChhdmF0YXJVUkwpIHtcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChhdmF0YXJVUkwpO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFthdmF0YXJVUkxdKTtcblxuICBjb25zdCBpc0VkaXRhYmxlID0gQm9vbGVhbihhdmF0YXJEYXRhLmNvbG9yKTtcbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gIWF2YXRhckRhdGEuaWNvblxuICAgID8gKGV2OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBvbkRlbGV0ZSgpO1xuICAgICAgfVxuICAgIDogdW5kZWZpbmVkO1xuXG4gIHJldHVybiAoXG4gICAgPEJldHRlckF2YXRhckJ1YmJsZVxuICAgICAgaTE4bj17aTE4bn1cbiAgICAgIGlzU2VsZWN0ZWQ9e2lzU2VsZWN0ZWR9XG4gICAgICBvbkRlbGV0ZT17aGFuZGxlRGVsZXRlfVxuICAgICAgb25TZWxlY3Q9eygpID0+IHtcbiAgICAgICAgb25DbGljayhhdmF0YXJCdWZmZXIpO1xuICAgICAgfX1cbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogYXZhdGFyVVJMID8gYHVybCgke2F2YXRhclVSTH0pYCA6IHVuZGVmaW5lZCxcbiAgICAgICAgYmFja2dyb3VuZFNpemU6IHNpemUsXG4gICAgICAgIC8vICs4IHNvIHRoYXQgdGhlIHNpemUgaXMgdGhlIGFjdHVhbCBzaXplIHdlIHdhbnQsIDggaXMgdGhlIGludmlzaWJsZVxuICAgICAgICAvLyBwYWRkaW5nIGFyb3VuZCB0aGUgYnViYmxlIHRvIG1ha2Ugcm9vbSBmb3IgdGhlIHNlbGVjdGlvbiBib3JkZXJcbiAgICAgICAgaGVpZ2h0OiBzaXplICsgOCxcbiAgICAgICAgd2lkdGg6IHNpemUgKyA4LFxuICAgICAgfX1cbiAgICA+XG4gICAgICB7aXNFZGl0YWJsZSAmJiBpc1NlbGVjdGVkICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJCZXR0ZXJBdmF0YXJCdWJibGUtLWVkaXRhYmxlXCIgLz5cbiAgICAgICl9XG4gICAgICB7IWF2YXRhclVSTCAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLUF2YXRhcl9fc3Bpbm5lci1jb250YWluZXJcIj5cbiAgICAgICAgICA8U3Bpbm5lclxuICAgICAgICAgICAgc2l6ZT17YCR7c2l6ZSAtIDh9cHhgfVxuICAgICAgICAgICAgc3ZnU2l6ZT1cInNtYWxsXCJcbiAgICAgICAgICAgIGRpcmVjdGlvbj1cIm9uLWF2YXRhclwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvQmV0dGVyQXZhdGFyQnViYmxlPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBMkM7QUFDM0Msb0JBQXFCO0FBRXJCLGdDQUFtQztBQUVuQyxxQkFBd0I7QUFDeEIsK0JBQWtDO0FBYTNCLE1BQU0sZUFBZSx3QkFBQztBQUFBLEVBQzNCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsT0FBTztBQUFBLE1BQ3FCO0FBQzVCLFFBQU0sQ0FBQyxjQUFjLG1CQUFtQiwyQkFDdEMsV0FBVyxNQUNiO0FBQ0EsUUFBTSxDQUFDLFdBQVcsZ0JBQWdCLDJCQUE2QixNQUFTO0FBRXhFLDhCQUFVLE1BQU07QUFDZCxRQUFJLGVBQWU7QUFFbkIsZ0NBQTRCO0FBQzFCLFlBQU0sU0FBUyxNQUFNLGdEQUFrQixVQUFVO0FBQ2pELFVBQUksQ0FBQyxjQUFjO0FBQ2pCLHdCQUFnQixNQUFNO0FBQUEsTUFDeEI7QUFBQSxJQUNGO0FBTGUsQUFTZixRQUFJLGNBQWM7QUFDaEIsYUFBTztBQUFBLElBQ1Q7QUFFQSxlQUFXO0FBRVgsV0FBTyxNQUFNO0FBQ1gscUJBQWU7QUFBQSxJQUNqQjtBQUFBLEVBQ0YsR0FBRyxDQUFDLGNBQWMsVUFBVSxDQUFDO0FBRzdCLDhCQUFVLE1BQU07QUFDZCxRQUFJLGNBQWM7QUFDaEIsWUFBTSxNQUFNLElBQUksZ0JBQWdCLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRXhELG1CQUFhLEdBQUc7QUFBQSxJQUNsQjtBQUFBLEVBQ0YsR0FBRyxDQUFDLFlBQVksQ0FBQztBQUdqQiw4QkFBVSxNQUFNO0FBQ2QsV0FBTyxNQUFNO0FBQ1gsVUFBSSxXQUFXO0FBQ2IsWUFBSSxnQkFBZ0IsU0FBUztBQUFBLE1BQy9CO0FBQUEsSUFDRjtBQUFBLEVBQ0YsR0FBRyxDQUFDLFNBQVMsQ0FBQztBQUVkLFFBQU0sYUFBYSxRQUFRLFdBQVcsS0FBSztBQUMzQyxRQUFNLGVBQWUsQ0FBQyxXQUFXLE9BQzdCLENBQUMsT0FBbUI7QUFDbEIsT0FBRyxlQUFlO0FBQ2xCLE9BQUcsZ0JBQWdCO0FBQ25CLGFBQVM7QUFBQSxFQUNYLElBQ0E7QUFFSixTQUNFLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0E7QUFBQSxJQUNBLFVBQVU7QUFBQSxJQUNWLFVBQVUsTUFBTTtBQUNkLGNBQVEsWUFBWTtBQUFBLElBQ3RCO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxpQkFBaUIsWUFBWSxPQUFPLGVBQWU7QUFBQSxNQUNuRCxnQkFBZ0I7QUFBQSxNQUdoQixRQUFRLE9BQU87QUFBQSxNQUNmLE9BQU8sT0FBTztBQUFBLElBQ2hCO0FBQUEsS0FFQyxjQUFjLGNBQ2IsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxHQUErQixHQUUvQyxDQUFDLGFBQ0EsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFDQyxNQUFNLEdBQUcsT0FBTztBQUFBLElBQ2hCLFNBQVE7QUFBQSxJQUNSLFdBQVU7QUFBQSxHQUNaLENBQ0YsQ0FFSjtBQUVKLEdBOUY0QjsiLAogICJuYW1lcyI6IFtdCn0K
