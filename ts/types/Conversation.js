var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Conversation_exports = {};
__export(Conversation_exports, {
  deleteExternalFiles: () => deleteExternalFiles,
  maybeUpdateAvatar: () => maybeUpdateAvatar,
  maybeUpdateProfileAvatar: () => maybeUpdateProfileAvatar
});
module.exports = __toCommonJS(Conversation_exports);
var import_Crypto = require("../Crypto");
function buildAvatarUpdater({ field }) {
  return async (conversation, data, {
    deleteAttachmentData,
    doesAttachmentExist,
    writeNewAttachmentData
  }) => {
    if (!conversation) {
      return conversation;
    }
    const avatar = conversation[field];
    const newHash = (0, import_Crypto.computeHash)(data);
    if (!avatar || !avatar.hash) {
      return {
        ...conversation,
        [field]: {
          hash: newHash,
          path: await writeNewAttachmentData(data)
        }
      };
    }
    const { hash, path } = avatar;
    const exists = await doesAttachmentExist(path);
    if (!exists) {
      window.SignalContext.log.warn(`Conversation.buildAvatarUpdater: attachment ${path} did not exist`);
    }
    if (exists && hash === newHash) {
      return conversation;
    }
    await deleteAttachmentData(path);
    return {
      ...conversation,
      [field]: {
        hash: newHash,
        path: await writeNewAttachmentData(data)
      }
    };
  };
}
const maybeUpdateAvatar = buildAvatarUpdater({ field: "avatar" });
const maybeUpdateProfileAvatar = buildAvatarUpdater({
  field: "profileAvatar"
});
async function deleteExternalFiles(conversation, {
  deleteAttachmentData
}) {
  if (!conversation) {
    return;
  }
  const { avatar, profileAvatar } = conversation;
  if (avatar && avatar.path) {
    await deleteAttachmentData(avatar.path);
  }
  if (profileAvatar && profileAvatar.path) {
    await deleteAttachmentData(profileAvatar.path);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteExternalFiles,
  maybeUpdateAvatar,
  maybeUpdateProfileAvatar
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgY29tcHV0ZUhhc2ggfSBmcm9tICcuLi9DcnlwdG8nO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZSB9IGZyb20gJy4uL21vZGVsLXR5cGVzLmQnO1xuXG5leHBvcnQgdHlwZSBCdWlsZEF2YXRhclVwZGF0ZXJPcHRpb25zID0gUmVhZG9ubHk8e1xuICBkZWxldGVBdHRhY2htZW50RGF0YTogKHBhdGg6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPjtcbiAgZG9lc0F0dGFjaG1lbnRFeGlzdDogKHBhdGg6IHN0cmluZykgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgd3JpdGVOZXdBdHRhY2htZW50RGF0YTogKGRhdGE6IFVpbnQ4QXJyYXkpID0+IFByb21pc2U8c3RyaW5nPjtcbn0+O1xuXG5mdW5jdGlvbiBidWlsZEF2YXRhclVwZGF0ZXIoeyBmaWVsZCB9OiB7IGZpZWxkOiAnYXZhdGFyJyB8ICdwcm9maWxlQXZhdGFyJyB9KSB7XG4gIHJldHVybiBhc3luYyAoXG4gICAgY29udmVyc2F0aW9uOiBSZWFkb25seTxDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZT4sXG4gICAgZGF0YTogVWludDhBcnJheSxcbiAgICB7XG4gICAgICBkZWxldGVBdHRhY2htZW50RGF0YSxcbiAgICAgIGRvZXNBdHRhY2htZW50RXhpc3QsXG4gICAgICB3cml0ZU5ld0F0dGFjaG1lbnREYXRhLFxuICAgIH06IEJ1aWxkQXZhdGFyVXBkYXRlck9wdGlvbnNcbiAgKTogUHJvbWlzZTxDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZT4gPT4ge1xuICAgIGlmICghY29udmVyc2F0aW9uKSB7XG4gICAgICByZXR1cm4gY29udmVyc2F0aW9uO1xuICAgIH1cblxuICAgIGNvbnN0IGF2YXRhciA9IGNvbnZlcnNhdGlvbltmaWVsZF07XG5cbiAgICBjb25zdCBuZXdIYXNoID0gY29tcHV0ZUhhc2goZGF0YSk7XG5cbiAgICBpZiAoIWF2YXRhciB8fCAhYXZhdGFyLmhhc2gpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmNvbnZlcnNhdGlvbixcbiAgICAgICAgW2ZpZWxkXToge1xuICAgICAgICAgIGhhc2g6IG5ld0hhc2gsXG4gICAgICAgICAgcGF0aDogYXdhaXQgd3JpdGVOZXdBdHRhY2htZW50RGF0YShkYXRhKSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgeyBoYXNoLCBwYXRoIH0gPSBhdmF0YXI7XG4gICAgY29uc3QgZXhpc3RzID0gYXdhaXQgZG9lc0F0dGFjaG1lbnRFeGlzdChwYXRoKTtcbiAgICBpZiAoIWV4aXN0cykge1xuICAgICAgd2luZG93LlNpZ25hbENvbnRleHQubG9nLndhcm4oXG4gICAgICAgIGBDb252ZXJzYXRpb24uYnVpbGRBdmF0YXJVcGRhdGVyOiBhdHRhY2htZW50ICR7cGF0aH0gZGlkIG5vdCBleGlzdGBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGV4aXN0cyAmJiBoYXNoID09PSBuZXdIYXNoKSB7XG4gICAgICByZXR1cm4gY29udmVyc2F0aW9uO1xuICAgIH1cblxuICAgIGF3YWl0IGRlbGV0ZUF0dGFjaG1lbnREYXRhKHBhdGgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmNvbnZlcnNhdGlvbixcbiAgICAgIFtmaWVsZF06IHtcbiAgICAgICAgaGFzaDogbmV3SGFzaCxcbiAgICAgICAgcGF0aDogYXdhaXQgd3JpdGVOZXdBdHRhY2htZW50RGF0YShkYXRhKSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IG1heWJlVXBkYXRlQXZhdGFyID0gYnVpbGRBdmF0YXJVcGRhdGVyKHsgZmllbGQ6ICdhdmF0YXInIH0pO1xuZXhwb3J0IGNvbnN0IG1heWJlVXBkYXRlUHJvZmlsZUF2YXRhciA9IGJ1aWxkQXZhdGFyVXBkYXRlcih7XG4gIGZpZWxkOiAncHJvZmlsZUF2YXRhcicsXG59KTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUV4dGVybmFsRmlsZXMoXG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGUsXG4gIHtcbiAgICBkZWxldGVBdHRhY2htZW50RGF0YSxcbiAgfTogUGljazxCdWlsZEF2YXRhclVwZGF0ZXJPcHRpb25zLCAnZGVsZXRlQXR0YWNobWVudERhdGEnPlxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmICghY29udmVyc2F0aW9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgeyBhdmF0YXIsIHByb2ZpbGVBdmF0YXIgfSA9IGNvbnZlcnNhdGlvbjtcblxuICBpZiAoYXZhdGFyICYmIGF2YXRhci5wYXRoKSB7XG4gICAgYXdhaXQgZGVsZXRlQXR0YWNobWVudERhdGEoYXZhdGFyLnBhdGgpO1xuICB9XG5cbiAgaWYgKHByb2ZpbGVBdmF0YXIgJiYgcHJvZmlsZUF2YXRhci5wYXRoKSB7XG4gICAgYXdhaXQgZGVsZXRlQXR0YWNobWVudERhdGEocHJvZmlsZUF2YXRhci5wYXRoKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBNEI7QUFTNUIsNEJBQTRCLEVBQUUsU0FBZ0Q7QUFDNUUsU0FBTyxPQUNMLGNBQ0EsTUFDQTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLFFBRXNDO0FBQ3hDLFFBQUksQ0FBQyxjQUFjO0FBQ2pCLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxTQUFTLGFBQWE7QUFFNUIsVUFBTSxVQUFVLCtCQUFZLElBQUk7QUFFaEMsUUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLE1BQU07QUFDM0IsYUFBTztBQUFBLFdBQ0Y7QUFBQSxTQUNGLFFBQVE7QUFBQSxVQUNQLE1BQU07QUFBQSxVQUNOLE1BQU0sTUFBTSx1QkFBdUIsSUFBSTtBQUFBLFFBQ3pDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxVQUFNLEVBQUUsTUFBTSxTQUFTO0FBQ3ZCLFVBQU0sU0FBUyxNQUFNLG9CQUFvQixJQUFJO0FBQzdDLFFBQUksQ0FBQyxRQUFRO0FBQ1gsYUFBTyxjQUFjLElBQUksS0FDdkIsK0NBQStDLG9CQUNqRDtBQUFBLElBQ0Y7QUFFQSxRQUFJLFVBQVUsU0FBUyxTQUFTO0FBQzlCLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxxQkFBcUIsSUFBSTtBQUUvQixXQUFPO0FBQUEsU0FDRjtBQUFBLE9BQ0YsUUFBUTtBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sTUFBTSxNQUFNLHVCQUF1QixJQUFJO0FBQUEsTUFDekM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBbERTLEFBb0RGLE1BQU0sb0JBQW9CLG1CQUFtQixFQUFFLE9BQU8sU0FBUyxDQUFDO0FBQ2hFLE1BQU0sMkJBQTJCLG1CQUFtQjtBQUFBLEVBQ3pELE9BQU87QUFDVCxDQUFDO0FBRUQsbUNBQ0UsY0FDQTtBQUFBLEVBQ0U7QUFBQSxHQUVhO0FBQ2YsTUFBSSxDQUFDLGNBQWM7QUFDakI7QUFBQSxFQUNGO0FBRUEsUUFBTSxFQUFFLFFBQVEsa0JBQWtCO0FBRWxDLE1BQUksVUFBVSxPQUFPLE1BQU07QUFDekIsVUFBTSxxQkFBcUIsT0FBTyxJQUFJO0FBQUEsRUFDeEM7QUFFQSxNQUFJLGlCQUFpQixjQUFjLE1BQU07QUFDdkMsVUFBTSxxQkFBcUIsY0FBYyxJQUFJO0FBQUEsRUFDL0M7QUFDRjtBQW5Cc0IiLAogICJuYW1lcyI6IFtdCn0K
