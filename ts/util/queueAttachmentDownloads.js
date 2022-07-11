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
var queueAttachmentDownloads_exports = {};
__export(queueAttachmentDownloads_exports, {
  queueAttachmentDownloads: () => queueAttachmentDownloads
});
module.exports = __toCommonJS(queueAttachmentDownloads_exports);
var import_lodash = require("lodash");
var AttachmentDownloads = __toESM(require("../messageModifiers/AttachmentDownloads"));
var log = __toESM(require("../logging/log"));
var import_MIME = require("../types/MIME");
var import_idForLogging = require("./idForLogging");
var import_Stickers = require("../types/Stickers");
var import_Client = __toESM(require("../sql/Client"));
async function queueAttachmentDownloads(message) {
  const attachmentsToQueue = message.attachments || [];
  const messageId = message.id;
  const idForLogging = (0, import_idForLogging.getMessageIdForLogging)(message);
  let count = 0;
  let bodyAttachment;
  log.info(`Queueing ${attachmentsToQueue.length} attachment downloads for message ${idForLogging}`);
  const [longMessageAttachments, normalAttachments] = (0, import_lodash.partition)(attachmentsToQueue, (attachment) => (0, import_MIME.isLongMessage)(attachment.contentType));
  if (longMessageAttachments.length > 1) {
    log.error(`Received more than one long message attachment in message ${idForLogging}`);
  }
  log.info(`Queueing ${longMessageAttachments.length} long message attachment downloads for message ${idForLogging}`);
  if (longMessageAttachments.length > 0) {
    count += 1;
    [bodyAttachment] = longMessageAttachments;
  }
  if (!bodyAttachment && message.bodyAttachment) {
    count += 1;
    bodyAttachment = message.bodyAttachment;
  }
  if (bodyAttachment) {
    await AttachmentDownloads.addJob(bodyAttachment, {
      messageId,
      type: "long-message",
      index: 0
    });
  }
  log.info(`Queueing ${normalAttachments.length} normal attachment downloads for message ${idForLogging}`);
  const attachments = await Promise.all(normalAttachments.map((attachment, index) => {
    if (!attachment) {
      return attachment;
    }
    if (attachment.path || attachment.textAttachment) {
      log.info(`Normal attachment already downloaded for message ${idForLogging}`);
      return attachment;
    }
    count += 1;
    return AttachmentDownloads.addJob(attachment, {
      messageId,
      type: "attachment",
      index
    });
  }));
  const previewsToQueue = message.preview || [];
  log.info(`Queueing ${previewsToQueue.length} preview attachment downloads for message ${idForLogging}`);
  const preview = await Promise.all(previewsToQueue.map(async (item, index) => {
    if (!item.image) {
      return item;
    }
    if (item.image.path) {
      log.info(`Preview attachment already downloaded for message ${idForLogging}`);
      return item;
    }
    count += 1;
    return {
      ...item,
      image: await AttachmentDownloads.addJob(item.image, {
        messageId,
        type: "preview",
        index
      })
    };
  }));
  const contactsToQueue = message.contact || [];
  log.info(`Queueing ${contactsToQueue.length} contact attachment downloads for message ${idForLogging}`);
  const contact = await Promise.all(contactsToQueue.map(async (item, index) => {
    if (!item.avatar || !item.avatar.avatar) {
      return item;
    }
    if (item.avatar.avatar.path) {
      log.info(`Contact attachment already downloaded for message ${idForLogging}`);
      return item;
    }
    count += 1;
    return {
      ...item,
      avatar: {
        ...item.avatar,
        avatar: await AttachmentDownloads.addJob(item.avatar.avatar, {
          messageId,
          type: "contact",
          index
        })
      }
    };
  }));
  let { quote } = message;
  const quoteAttachmentsToQueue = quote && quote.attachments ? quote.attachments : [];
  log.info(`Queueing ${quoteAttachmentsToQueue.length} quote attachment downloads for message ${idForLogging}`);
  if (quote && quoteAttachmentsToQueue.length > 0) {
    quote = {
      ...quote,
      attachments: await Promise.all((quote?.attachments || []).map(async (item, index) => {
        if (!item.thumbnail) {
          return item;
        }
        if (item.thumbnail.path) {
          log.info(`Quote attachment already downloaded for message ${idForLogging}`);
          return item;
        }
        count += 1;
        return {
          ...item,
          thumbnail: await AttachmentDownloads.addJob(item.thumbnail, {
            messageId,
            type: "quote",
            index
          })
        };
      }))
    };
  }
  let { sticker } = message;
  if (sticker && sticker.data && sticker.data.path) {
    log.info(`Sticker attachment already downloaded for message ${idForLogging}`);
  } else if (sticker) {
    log.info(`Queueing sticker download for message ${idForLogging}`);
    count += 1;
    const { packId, stickerId, packKey } = sticker;
    const status = (0, import_Stickers.getStickerPackStatus)(packId);
    let data;
    if (status && (status === "downloaded" || status === "installed")) {
      try {
        data = await (0, import_Stickers.copyStickerToAttachments)(packId, stickerId);
      } catch (error) {
        log.error(`Problem copying sticker (${packId}, ${stickerId}) to attachments:`, error && error.stack ? error.stack : error);
      }
    }
    if (!data && sticker.data) {
      data = await AttachmentDownloads.addJob(sticker.data, {
        messageId,
        type: "sticker",
        index: 0
      });
    }
    if (!status) {
      (0, import_Stickers.savePackMetadata)(packId, packKey, { messageId });
    } else {
      await import_Client.default.addStickerPackReference(messageId, packId);
    }
    if (!data) {
      throw new Error("queueAttachmentDownloads: Failed to fetch sticker data");
    }
    sticker = {
      ...sticker,
      packId,
      data
    };
  }
  log.info(`Queued ${count} total attachment downloads for message ${idForLogging}`);
  if (count <= 0) {
    return;
  }
  return {
    bodyAttachment,
    attachments,
    preview,
    contact,
    quote,
    sticker
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  queueAttachmentDownloads
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicXVldWVBdHRhY2htZW50RG93bmxvYWRzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgcGFydGl0aW9uIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIEF0dGFjaG1lbnREb3dubG9hZHMgZnJvbSAnLi4vbWVzc2FnZU1vZGlmaWVycy9BdHRhY2htZW50RG93bmxvYWRzJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgeyBpc0xvbmdNZXNzYWdlIH0gZnJvbSAnLi4vdHlwZXMvTUlNRSc7XG5pbXBvcnQgeyBnZXRNZXNzYWdlSWRGb3JMb2dnaW5nIH0gZnJvbSAnLi9pZEZvckxvZ2dpbmcnO1xuaW1wb3J0IHtcbiAgY29weVN0aWNrZXJUb0F0dGFjaG1lbnRzLFxuICBzYXZlUGFja01ldGFkYXRhLFxuICBnZXRTdGlja2VyUGFja1N0YXR1cyxcbn0gZnJvbSAnLi4vdHlwZXMvU3RpY2tlcnMnO1xuaW1wb3J0IGRhdGFJbnRlcmZhY2UgZnJvbSAnLi4vc3FsL0NsaWVudCc7XG5cbmltcG9ydCB0eXBlIHsgQXR0YWNobWVudFR5cGUgfSBmcm9tICcuLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB0eXBlIHsgRW1iZWRkZWRDb250YWN0VHlwZSB9IGZyb20gJy4uL3R5cGVzL0VtYmVkZGVkQ29udGFjdCc7XG5pbXBvcnQgdHlwZSB7XG4gIE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSxcbiAgUXVvdGVkTWVzc2FnZVR5cGUsXG59IGZyb20gJy4uL21vZGVsLXR5cGVzLmQnO1xuaW1wb3J0IHR5cGUgeyBTdGlja2VyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1N0aWNrZXJzJztcbmltcG9ydCB0eXBlIHsgTGlua1ByZXZpZXdUeXBlIH0gZnJvbSAnLi4vdHlwZXMvbWVzc2FnZS9MaW5rUHJldmlld3MnO1xuXG50eXBlIFJldHVyblR5cGUgPSB7XG4gIGJvZHlBdHRhY2htZW50PzogQXR0YWNobWVudFR5cGU7XG4gIGF0dGFjaG1lbnRzOiBBcnJheTxBdHRhY2htZW50VHlwZT47XG4gIHByZXZpZXc6IEFycmF5PExpbmtQcmV2aWV3VHlwZT47XG4gIGNvbnRhY3Q6IEFycmF5PEVtYmVkZGVkQ29udGFjdFR5cGU+O1xuICBxdW90ZT86IFF1b3RlZE1lc3NhZ2VUeXBlO1xuICBzdGlja2VyPzogU3RpY2tlclR5cGU7XG59O1xuXG4vLyBSZWNlaXZlIGxvZ2ljXG4vLyBOT1RFOiBJZiB5b3UncmUgY2hhbmdpbmcgYW55IGxvZ2ljIGluIHRoaXMgZnVuY3Rpb24gdGhhdCBkZWFscyB3aXRoIHRoZVxuLy8gY291bnQgdGhlbiB5b3UnbGwgYWxzbyBoYXZlIHRvIG1vZGlmeSAuL2hhc0F0dGFjaG1lbnRzRG93bmxvYWRzXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcXVldWVBdHRhY2htZW50RG93bmxvYWRzKFxuICBtZXNzYWdlOiBNZXNzYWdlQXR0cmlidXRlc1R5cGVcbik6IFByb21pc2U8UmV0dXJuVHlwZSB8IHVuZGVmaW5lZD4ge1xuICBjb25zdCBhdHRhY2htZW50c1RvUXVldWUgPSBtZXNzYWdlLmF0dGFjaG1lbnRzIHx8IFtdO1xuICBjb25zdCBtZXNzYWdlSWQgPSBtZXNzYWdlLmlkO1xuICBjb25zdCBpZEZvckxvZ2dpbmcgPSBnZXRNZXNzYWdlSWRGb3JMb2dnaW5nKG1lc3NhZ2UpO1xuXG4gIGxldCBjb3VudCA9IDA7XG4gIGxldCBib2R5QXR0YWNobWVudDtcblxuICBsb2cuaW5mbyhcbiAgICBgUXVldWVpbmcgJHthdHRhY2htZW50c1RvUXVldWUubGVuZ3RofSBhdHRhY2htZW50IGRvd25sb2FkcyBmb3IgbWVzc2FnZSAke2lkRm9yTG9nZ2luZ31gXG4gICk7XG5cbiAgY29uc3QgW2xvbmdNZXNzYWdlQXR0YWNobWVudHMsIG5vcm1hbEF0dGFjaG1lbnRzXSA9IHBhcnRpdGlvbihcbiAgICBhdHRhY2htZW50c1RvUXVldWUsXG4gICAgYXR0YWNobWVudCA9PiBpc0xvbmdNZXNzYWdlKGF0dGFjaG1lbnQuY29udGVudFR5cGUpXG4gICk7XG5cbiAgaWYgKGxvbmdNZXNzYWdlQXR0YWNobWVudHMubGVuZ3RoID4gMSkge1xuICAgIGxvZy5lcnJvcihcbiAgICAgIGBSZWNlaXZlZCBtb3JlIHRoYW4gb25lIGxvbmcgbWVzc2FnZSBhdHRhY2htZW50IGluIG1lc3NhZ2UgJHtpZEZvckxvZ2dpbmd9YFxuICAgICk7XG4gIH1cblxuICBsb2cuaW5mbyhcbiAgICBgUXVldWVpbmcgJHtsb25nTWVzc2FnZUF0dGFjaG1lbnRzLmxlbmd0aH0gbG9uZyBtZXNzYWdlIGF0dGFjaG1lbnQgZG93bmxvYWRzIGZvciBtZXNzYWdlICR7aWRGb3JMb2dnaW5nfWBcbiAgKTtcblxuICBpZiAobG9uZ01lc3NhZ2VBdHRhY2htZW50cy5sZW5ndGggPiAwKSB7XG4gICAgY291bnQgKz0gMTtcbiAgICBbYm9keUF0dGFjaG1lbnRdID0gbG9uZ01lc3NhZ2VBdHRhY2htZW50cztcbiAgfVxuICBpZiAoIWJvZHlBdHRhY2htZW50ICYmIG1lc3NhZ2UuYm9keUF0dGFjaG1lbnQpIHtcbiAgICBjb3VudCArPSAxO1xuICAgIGJvZHlBdHRhY2htZW50ID0gbWVzc2FnZS5ib2R5QXR0YWNobWVudDtcbiAgfVxuXG4gIGlmIChib2R5QXR0YWNobWVudCkge1xuICAgIGF3YWl0IEF0dGFjaG1lbnREb3dubG9hZHMuYWRkSm9iKGJvZHlBdHRhY2htZW50LCB7XG4gICAgICBtZXNzYWdlSWQsXG4gICAgICB0eXBlOiAnbG9uZy1tZXNzYWdlJyxcbiAgICAgIGluZGV4OiAwLFxuICAgIH0pO1xuICB9XG5cbiAgbG9nLmluZm8oXG4gICAgYFF1ZXVlaW5nICR7bm9ybWFsQXR0YWNobWVudHMubGVuZ3RofSBub3JtYWwgYXR0YWNobWVudCBkb3dubG9hZHMgZm9yIG1lc3NhZ2UgJHtpZEZvckxvZ2dpbmd9YFxuICApO1xuICBjb25zdCBhdHRhY2htZW50cyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgIG5vcm1hbEF0dGFjaG1lbnRzLm1hcCgoYXR0YWNobWVudCwgaW5kZXgpID0+IHtcbiAgICAgIGlmICghYXR0YWNobWVudCkge1xuICAgICAgICByZXR1cm4gYXR0YWNobWVudDtcbiAgICAgIH1cbiAgICAgIC8vIFdlJ3ZlIGFscmVhZHkgZG93bmxvYWRlZCB0aGlzIVxuICAgICAgaWYgKGF0dGFjaG1lbnQucGF0aCB8fCBhdHRhY2htZW50LnRleHRBdHRhY2htZW50KSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIGBOb3JtYWwgYXR0YWNobWVudCBhbHJlYWR5IGRvd25sb2FkZWQgZm9yIG1lc3NhZ2UgJHtpZEZvckxvZ2dpbmd9YFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gYXR0YWNobWVudDtcbiAgICAgIH1cblxuICAgICAgY291bnQgKz0gMTtcblxuICAgICAgcmV0dXJuIEF0dGFjaG1lbnREb3dubG9hZHMuYWRkSm9iKGF0dGFjaG1lbnQsIHtcbiAgICAgICAgbWVzc2FnZUlkLFxuICAgICAgICB0eXBlOiAnYXR0YWNobWVudCcsXG4gICAgICAgIGluZGV4LFxuICAgICAgfSk7XG4gICAgfSlcbiAgKTtcblxuICBjb25zdCBwcmV2aWV3c1RvUXVldWUgPSBtZXNzYWdlLnByZXZpZXcgfHwgW107XG4gIGxvZy5pbmZvKFxuICAgIGBRdWV1ZWluZyAke3ByZXZpZXdzVG9RdWV1ZS5sZW5ndGh9IHByZXZpZXcgYXR0YWNobWVudCBkb3dubG9hZHMgZm9yIG1lc3NhZ2UgJHtpZEZvckxvZ2dpbmd9YFxuICApO1xuICBjb25zdCBwcmV2aWV3ID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgcHJldmlld3NUb1F1ZXVlLm1hcChhc3luYyAoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGlmICghaXRlbS5pbWFnZSkge1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH1cbiAgICAgIC8vIFdlJ3ZlIGFscmVhZHkgZG93bmxvYWRlZCB0aGlzIVxuICAgICAgaWYgKGl0ZW0uaW1hZ2UucGF0aCkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICBgUHJldmlldyBhdHRhY2htZW50IGFscmVhZHkgZG93bmxvYWRlZCBmb3IgbWVzc2FnZSAke2lkRm9yTG9nZ2luZ31gXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfVxuXG4gICAgICBjb3VudCArPSAxO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgaW1hZ2U6IGF3YWl0IEF0dGFjaG1lbnREb3dubG9hZHMuYWRkSm9iKGl0ZW0uaW1hZ2UsIHtcbiAgICAgICAgICBtZXNzYWdlSWQsXG4gICAgICAgICAgdHlwZTogJ3ByZXZpZXcnLFxuICAgICAgICAgIGluZGV4LFxuICAgICAgICB9KSxcbiAgICAgIH07XG4gICAgfSlcbiAgKTtcblxuICBjb25zdCBjb250YWN0c1RvUXVldWUgPSBtZXNzYWdlLmNvbnRhY3QgfHwgW107XG4gIGxvZy5pbmZvKFxuICAgIGBRdWV1ZWluZyAke2NvbnRhY3RzVG9RdWV1ZS5sZW5ndGh9IGNvbnRhY3QgYXR0YWNobWVudCBkb3dubG9hZHMgZm9yIG1lc3NhZ2UgJHtpZEZvckxvZ2dpbmd9YFxuICApO1xuICBjb25zdCBjb250YWN0ID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgY29udGFjdHNUb1F1ZXVlLm1hcChhc3luYyAoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGlmICghaXRlbS5hdmF0YXIgfHwgIWl0ZW0uYXZhdGFyLmF2YXRhcikge1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH1cbiAgICAgIC8vIFdlJ3ZlIGFscmVhZHkgZG93bmxvYWRlZCB0aGlzIVxuICAgICAgaWYgKGl0ZW0uYXZhdGFyLmF2YXRhci5wYXRoKSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIGBDb250YWN0IGF0dGFjaG1lbnQgYWxyZWFkeSBkb3dubG9hZGVkIGZvciBtZXNzYWdlICR7aWRGb3JMb2dnaW5nfWBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9XG5cbiAgICAgIGNvdW50ICs9IDE7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5pdGVtLFxuICAgICAgICBhdmF0YXI6IHtcbiAgICAgICAgICAuLi5pdGVtLmF2YXRhcixcbiAgICAgICAgICBhdmF0YXI6IGF3YWl0IEF0dGFjaG1lbnREb3dubG9hZHMuYWRkSm9iKGl0ZW0uYXZhdGFyLmF2YXRhciwge1xuICAgICAgICAgICAgbWVzc2FnZUlkLFxuICAgICAgICAgICAgdHlwZTogJ2NvbnRhY3QnLFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgfSksXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0pXG4gICk7XG5cbiAgbGV0IHsgcXVvdGUgfSA9IG1lc3NhZ2U7XG4gIGNvbnN0IHF1b3RlQXR0YWNobWVudHNUb1F1ZXVlID1cbiAgICBxdW90ZSAmJiBxdW90ZS5hdHRhY2htZW50cyA/IHF1b3RlLmF0dGFjaG1lbnRzIDogW107XG4gIGxvZy5pbmZvKFxuICAgIGBRdWV1ZWluZyAke3F1b3RlQXR0YWNobWVudHNUb1F1ZXVlLmxlbmd0aH0gcXVvdGUgYXR0YWNobWVudCBkb3dubG9hZHMgZm9yIG1lc3NhZ2UgJHtpZEZvckxvZ2dpbmd9YFxuICApO1xuICBpZiAocXVvdGUgJiYgcXVvdGVBdHRhY2htZW50c1RvUXVldWUubGVuZ3RoID4gMCkge1xuICAgIHF1b3RlID0ge1xuICAgICAgLi4ucXVvdGUsXG4gICAgICBhdHRhY2htZW50czogYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIChxdW90ZT8uYXR0YWNobWVudHMgfHwgW10pLm1hcChhc3luYyAoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAoIWl0ZW0udGh1bWJuYWlsKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gV2UndmUgYWxyZWFkeSBkb3dubG9hZGVkIHRoaXMhXG4gICAgICAgICAgaWYgKGl0ZW0udGh1bWJuYWlsLnBhdGgpIHtcbiAgICAgICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICAgICBgUXVvdGUgYXR0YWNobWVudCBhbHJlYWR5IGRvd25sb2FkZWQgZm9yIG1lc3NhZ2UgJHtpZEZvckxvZ2dpbmd9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvdW50ICs9IDE7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgICB0aHVtYm5haWw6IGF3YWl0IEF0dGFjaG1lbnREb3dubG9hZHMuYWRkSm9iKGl0ZW0udGh1bWJuYWlsLCB7XG4gICAgICAgICAgICAgIG1lc3NhZ2VJZCxcbiAgICAgICAgICAgICAgdHlwZTogJ3F1b3RlJyxcbiAgICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICB9O1xuICAgICAgICB9KVxuICAgICAgKSxcbiAgICB9O1xuICB9XG5cbiAgbGV0IHsgc3RpY2tlciB9ID0gbWVzc2FnZTtcbiAgaWYgKHN0aWNrZXIgJiYgc3RpY2tlci5kYXRhICYmIHN0aWNrZXIuZGF0YS5wYXRoKSB7XG4gICAgbG9nLmluZm8oXG4gICAgICBgU3RpY2tlciBhdHRhY2htZW50IGFscmVhZHkgZG93bmxvYWRlZCBmb3IgbWVzc2FnZSAke2lkRm9yTG9nZ2luZ31gXG4gICAgKTtcbiAgfSBlbHNlIGlmIChzdGlja2VyKSB7XG4gICAgbG9nLmluZm8oYFF1ZXVlaW5nIHN0aWNrZXIgZG93bmxvYWQgZm9yIG1lc3NhZ2UgJHtpZEZvckxvZ2dpbmd9YCk7XG4gICAgY291bnQgKz0gMTtcbiAgICBjb25zdCB7IHBhY2tJZCwgc3RpY2tlcklkLCBwYWNrS2V5IH0gPSBzdGlja2VyO1xuXG4gICAgY29uc3Qgc3RhdHVzID0gZ2V0U3RpY2tlclBhY2tTdGF0dXMocGFja0lkKTtcbiAgICBsZXQgZGF0YTogQXR0YWNobWVudFR5cGUgfCB1bmRlZmluZWQ7XG5cbiAgICBpZiAoc3RhdHVzICYmIChzdGF0dXMgPT09ICdkb3dubG9hZGVkJyB8fCBzdGF0dXMgPT09ICdpbnN0YWxsZWQnKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IGF3YWl0IGNvcHlTdGlja2VyVG9BdHRhY2htZW50cyhwYWNrSWQsIHN0aWNrZXJJZCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgYFByb2JsZW0gY29weWluZyBzdGlja2VyICgke3BhY2tJZH0sICR7c3RpY2tlcklkfSkgdG8gYXR0YWNobWVudHM6YCxcbiAgICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFkYXRhICYmIHN0aWNrZXIuZGF0YSkge1xuICAgICAgZGF0YSA9IGF3YWl0IEF0dGFjaG1lbnREb3dubG9hZHMuYWRkSm9iKHN0aWNrZXIuZGF0YSwge1xuICAgICAgICBtZXNzYWdlSWQsXG4gICAgICAgIHR5cGU6ICdzdGlja2VyJyxcbiAgICAgICAgaW5kZXg6IDAsXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgIC8vIFNhdmUgdGhlIHBhY2tJZC9wYWNrS2V5IGZvciBmdXR1cmUgZG93bmxvYWQvaW5zdGFsbFxuICAgICAgc2F2ZVBhY2tNZXRhZGF0YShwYWNrSWQsIHBhY2tLZXksIHsgbWVzc2FnZUlkIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBkYXRhSW50ZXJmYWNlLmFkZFN0aWNrZXJQYWNrUmVmZXJlbmNlKG1lc3NhZ2VJZCwgcGFja0lkKTtcbiAgICB9XG5cbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigncXVldWVBdHRhY2htZW50RG93bmxvYWRzOiBGYWlsZWQgdG8gZmV0Y2ggc3RpY2tlciBkYXRhJyk7XG4gICAgfVxuXG4gICAgc3RpY2tlciA9IHtcbiAgICAgIC4uLnN0aWNrZXIsXG4gICAgICBwYWNrSWQsXG4gICAgICBkYXRhLFxuICAgIH07XG4gIH1cblxuICBsb2cuaW5mbyhcbiAgICBgUXVldWVkICR7Y291bnR9IHRvdGFsIGF0dGFjaG1lbnQgZG93bmxvYWRzIGZvciBtZXNzYWdlICR7aWRGb3JMb2dnaW5nfWBcbiAgKTtcblxuICBpZiAoY291bnQgPD0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYm9keUF0dGFjaG1lbnQsXG4gICAgYXR0YWNobWVudHMsXG4gICAgcHJldmlldyxcbiAgICBjb250YWN0LFxuICAgIHF1b3RlLFxuICAgIHN0aWNrZXIsXG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQTBCO0FBQzFCLDBCQUFxQztBQUNyQyxVQUFxQjtBQUNyQixrQkFBOEI7QUFDOUIsMEJBQXVDO0FBQ3ZDLHNCQUlPO0FBQ1Asb0JBQTBCO0FBdUIxQix3Q0FDRSxTQUNpQztBQUNqQyxRQUFNLHFCQUFxQixRQUFRLGVBQWUsQ0FBQztBQUNuRCxRQUFNLFlBQVksUUFBUTtBQUMxQixRQUFNLGVBQWUsZ0RBQXVCLE9BQU87QUFFbkQsTUFBSSxRQUFRO0FBQ1osTUFBSTtBQUVKLE1BQUksS0FDRixZQUFZLG1CQUFtQiwyQ0FBMkMsY0FDNUU7QUFFQSxRQUFNLENBQUMsd0JBQXdCLHFCQUFxQiw2QkFDbEQsb0JBQ0EsZ0JBQWMsK0JBQWMsV0FBVyxXQUFXLENBQ3BEO0FBRUEsTUFBSSx1QkFBdUIsU0FBUyxHQUFHO0FBQ3JDLFFBQUksTUFDRiw2REFBNkQsY0FDL0Q7QUFBQSxFQUNGO0FBRUEsTUFBSSxLQUNGLFlBQVksdUJBQXVC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QW1ELGNBQ3JEO0FBQ0EsaUJBQU87QUFBQSxRQUNUO0FBRUEsaUJBQVM7QUFDVCxlQUFPO0FBQUEsYUFDRjtBQUFBLFVBQ0gsV0FBVyxNQUFNLG9CQUFvQixPQUFPLEtBQUssV0FBVztBQUFBLFlBQzFEO0FBQUEsWUFDQSxNQUFNO0FBQUEsWUFDTjtBQUFBLFVBQ0YsQ0FBQztBQUFBLFFBQ0g7QUFBQSxNQUNGLENBQUMsQ0FDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsTUFBSSxFQUFFLFlBQVk7QUFDbEIsTUFBSSxXQUFXLFFBQVEsUUFBUSxRQUFRLEtBQUssTUFBTTtBQUNoRCxRQUFJLEtBQ0YscURBQXFELGNBQ3ZEO0FBQUEsRUFDRixXQUFXLFNBQVM7QUFDbEIsUUFBSSxLQUFLLHlDQUF5QyxjQUFjO0FBQ2hFLGFBQVM7QUFDVCxVQUFNLEVBQUUsUUFBUSxXQUFXLFlBQVk7QUFFdkMsVUFBTSxTQUFTLDBDQUFxQixNQUFNO0FBQzFDLFFBQUk7QUFFSixRQUFJLFVBQVcsWUFBVyxnQkFBZ0IsV0FBVyxjQUFjO0FBQ2pFLFVBQUk7QUFDRixlQUFPLE1BQU0sOENBQXlCLFFBQVEsU0FBUztBQUFBLE1BQ3pELFNBQVMsT0FBUDtBQUNBLFlBQUksTUFDRiw0QkFBNEIsV0FBVyw4QkFDdkMsU0FBUyxNQUFNLFFBQVEsTUFBTSxRQUFRLEtBQ3ZDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxRQUFJLENBQUMsUUFBUSxRQUFRLE1BQU07QUFDekIsYUFBTyxNQUFNLG9CQUFvQixPQUFPLFFBQVEsTUFBTTtBQUFBLFFBQ3BEO0FBQUEsUUFDQSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsTUFDVCxDQUFDO0FBQUEsSUFDSDtBQUNBLFFBQUksQ0FBQyxRQUFRO0FBRVgsNENBQWlCLFFBQVEsU0FBUyxFQUFFLFVBQVUsQ0FBQztBQUFBLElBQ2pELE9BQU87QUFDTCxZQUFNLHNCQUFjLHdCQUF3QixXQUFXLE1BQU07QUFBQSxJQUMvRDtBQUVBLFFBQUksQ0FBQyxNQUFNO0FBQ1QsWUFBTSxJQUFJLE1BQU0sd0RBQXdEO0FBQUEsSUFDMUU7QUFFQSxjQUFVO0FBQUEsU0FDTDtBQUFBLE1BQ0g7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxNQUFJLEtBQ0YsVUFBVSxnREFBZ0QsY0FDNUQ7QUFFQSxNQUFJLFNBQVMsR0FBRztBQUNkO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7QUF6T3NCIiwKICAibmFtZXMiOiBbXQp9Cg==
