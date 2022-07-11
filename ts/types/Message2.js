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
var Message2_exports = {};
__export(Message2_exports, {
  CURRENT_SCHEMA_VERSION: () => CURRENT_SCHEMA_VERSION,
  GROUP: () => GROUP,
  PRIVATE: () => PRIVATE,
  VERSION_NEEDED_FOR_DISPLAY: () => VERSION_NEEDED_FOR_DISPLAY,
  _mapAttachments: () => _mapAttachments,
  _mapContact: () => _mapContact,
  _mapPreviewAttachments: () => _mapPreviewAttachments,
  _mapQuotedAttachments: () => _mapQuotedAttachments,
  _withSchemaVersion: () => _withSchemaVersion,
  createAttachmentDataWriter: () => createAttachmentDataWriter,
  createAttachmentLoader: () => createAttachmentLoader,
  deleteAllExternalFiles: () => deleteAllExternalFiles,
  hasExpiration: () => import_Message.hasExpiration,
  initializeSchemaVersion: () => initializeSchemaVersion,
  isValid: () => isValid,
  loadContactData: () => loadContactData,
  loadPreviewData: () => loadPreviewData,
  loadQuoteData: () => loadQuoteData,
  loadStickerData: () => loadStickerData,
  processNewAttachment: () => processNewAttachment,
  processNewSticker: () => processNewSticker,
  upgradeSchema: () => upgradeSchema
});
module.exports = __toCommonJS(Message2_exports);
var import_lodash = require("lodash");
var Contact = __toESM(require("./EmbeddedContact"));
var import_Attachment = require("./Attachment");
var Errors = __toESM(require("./errors"));
var SchemaVersion = __toESM(require("./SchemaVersion"));
var import_initializeAttachmentMetadata = require("./message/initializeAttachmentMetadata");
var import_Message = require("./Message");
const GROUP = "group";
const PRIVATE = "private";
const INITIAL_SCHEMA_VERSION = 0;
const isValid = /* @__PURE__ */ __name((_message) => true, "isValid");
const initializeSchemaVersion = /* @__PURE__ */ __name(({
  message,
  logger
}) => {
  const isInitialized = SchemaVersion.isValid(message.schemaVersion) && message.schemaVersion >= 1;
  if (isInitialized) {
    return message;
  }
  const firstAttachment = message?.attachments?.[0];
  if (!firstAttachment) {
    return { ...message, schemaVersion: INITIAL_SCHEMA_VERSION };
  }
  const inheritedSchemaVersion = SchemaVersion.isValid(firstAttachment.schemaVersion) ? firstAttachment.schemaVersion : INITIAL_SCHEMA_VERSION;
  const messageWithInitialSchema = {
    ...message,
    schemaVersion: inheritedSchemaVersion,
    attachments: message?.attachments?.map((attachment) => (0, import_Attachment.removeSchemaVersion)({ attachment, logger })) || []
  };
  return messageWithInitialSchema;
}, "initializeSchemaVersion");
const _withSchemaVersion = /* @__PURE__ */ __name(({
  schemaVersion,
  upgrade
}) => {
  if (!SchemaVersion.isValid(schemaVersion)) {
    throw new TypeError("_withSchemaVersion: schemaVersion is invalid");
  }
  if (!(0, import_lodash.isFunction)(upgrade)) {
    throw new TypeError("_withSchemaVersion: upgrade must be a function");
  }
  return async (message, context) => {
    if (!context || !(0, import_lodash.isObject)(context.logger)) {
      throw new TypeError("_withSchemaVersion: context must have logger object");
    }
    const { logger } = context;
    if (!isValid(message)) {
      logger.error("Message._withSchemaVersion: Invalid input message:", message);
      return message;
    }
    const isAlreadyUpgraded = (message.schemaVersion || 0) >= schemaVersion;
    if (isAlreadyUpgraded) {
      return message;
    }
    const expectedVersion = schemaVersion - 1;
    const hasExpectedVersion = message.schemaVersion === expectedVersion;
    if (!hasExpectedVersion) {
      logger.warn("WARNING: Message._withSchemaVersion: Unexpected version:", `Expected message to have version ${expectedVersion},`, `but got ${message.schemaVersion}.`);
      return message;
    }
    let upgradedMessage;
    try {
      upgradedMessage = await upgrade(message, context);
    } catch (error) {
      logger.error(`Message._withSchemaVersion: error updating message ${message.id}:`, Errors.toLogFormat(error));
      return message;
    }
    if (!isValid(upgradedMessage)) {
      logger.error("Message._withSchemaVersion: Invalid upgraded message:", upgradedMessage);
      return message;
    }
    return { ...upgradedMessage, schemaVersion };
  };
}, "_withSchemaVersion");
const _mapAttachments = /* @__PURE__ */ __name((upgradeAttachment) => async (message, context) => {
  const upgradeWithContext = /* @__PURE__ */ __name((attachment) => upgradeAttachment(attachment, context, message), "upgradeWithContext");
  const attachments = await Promise.all((message.attachments || []).map(upgradeWithContext));
  return { ...message, attachments };
}, "_mapAttachments");
const _mapContact = /* @__PURE__ */ __name((upgradeContact) => async (message, context) => {
  const contextWithMessage = { ...context, message };
  const upgradeWithContext = /* @__PURE__ */ __name((contact2) => upgradeContact(contact2, contextWithMessage), "upgradeWithContext");
  const contact = await Promise.all((message.contact || []).map(upgradeWithContext));
  return { ...message, contact };
}, "_mapContact");
const _mapQuotedAttachments = /* @__PURE__ */ __name((upgradeAttachment) => async (message, context) => {
  if (!message.quote) {
    return message;
  }
  if (!context || !(0, import_lodash.isObject)(context.logger)) {
    throw new Error("_mapQuotedAttachments: context must have logger object");
  }
  const upgradeWithContext = /* @__PURE__ */ __name(async (attachment) => {
    const { thumbnail } = attachment;
    if (!thumbnail) {
      return attachment;
    }
    const upgradedThumbnail = await upgradeAttachment(thumbnail, context, message);
    return { ...attachment, thumbnail: upgradedThumbnail };
  }, "upgradeWithContext");
  const quotedAttachments = message.quote && message.quote.attachments || [];
  const attachments = await Promise.all(quotedAttachments.map(upgradeWithContext));
  return { ...message, quote: { ...message.quote, attachments } };
}, "_mapQuotedAttachments");
const _mapPreviewAttachments = /* @__PURE__ */ __name((upgradeAttachment) => async (message, context) => {
  if (!message.preview) {
    return message;
  }
  if (!context || !(0, import_lodash.isObject)(context.logger)) {
    throw new Error("_mapPreviewAttachments: context must have logger object");
  }
  const upgradeWithContext = /* @__PURE__ */ __name(async (preview2) => {
    const { image } = preview2;
    if (!image) {
      return preview2;
    }
    const upgradedImage = await upgradeAttachment(image, context, message);
    return { ...preview2, image: upgradedImage };
  }, "upgradeWithContext");
  const preview = await Promise.all((message.preview || []).map(upgradeWithContext));
  return { ...message, preview };
}, "_mapPreviewAttachments");
const toVersion0 = /* @__PURE__ */ __name(async (message, context) => initializeSchemaVersion({ message, logger: context.logger }), "toVersion0");
const toVersion1 = _withSchemaVersion({
  schemaVersion: 1,
  upgrade: _mapAttachments(import_Attachment.autoOrientJPEG)
});
const toVersion2 = _withSchemaVersion({
  schemaVersion: 2,
  upgrade: _mapAttachments(import_Attachment.replaceUnicodeOrderOverrides)
});
const toVersion3 = _withSchemaVersion({
  schemaVersion: 3,
  upgrade: _mapAttachments(import_Attachment.migrateDataToFileSystem)
});
const toVersion4 = _withSchemaVersion({
  schemaVersion: 4,
  upgrade: _mapQuotedAttachments(import_Attachment.migrateDataToFileSystem)
});
const toVersion5 = _withSchemaVersion({
  schemaVersion: 5,
  upgrade: import_initializeAttachmentMetadata.initializeAttachmentMetadata
});
const toVersion6 = _withSchemaVersion({
  schemaVersion: 6,
  upgrade: _mapContact(Contact.parseAndWriteAvatar(import_Attachment.migrateDataToFileSystem))
});
const toVersion7 = _withSchemaVersion({
  schemaVersion: 7,
  upgrade: import_initializeAttachmentMetadata.initializeAttachmentMetadata
});
const toVersion8 = _withSchemaVersion({
  schemaVersion: 8,
  upgrade: _mapAttachments(import_Attachment.captureDimensionsAndScreenshot)
});
const toVersion9 = _withSchemaVersion({
  schemaVersion: 9,
  upgrade: _mapAttachments(import_Attachment.replaceUnicodeV2)
});
const toVersion10 = _withSchemaVersion({
  schemaVersion: 10,
  upgrade: async (message, context) => {
    const processPreviews = _mapPreviewAttachments(import_Attachment.migrateDataToFileSystem);
    const processSticker = /* @__PURE__ */ __name(async (stickerMessage, stickerContext) => {
      const { sticker } = stickerMessage;
      if (!sticker || !sticker.data || !sticker.data.data) {
        return stickerMessage;
      }
      return {
        ...stickerMessage,
        sticker: {
          ...sticker,
          data: await (0, import_Attachment.migrateDataToFileSystem)(sticker.data, stickerContext)
        }
      };
    }, "processSticker");
    const previewProcessed = await processPreviews(message, context);
    const stickerProcessed = await processSticker(previewProcessed, context);
    return stickerProcessed;
  }
});
const VERSIONS = [
  toVersion0,
  toVersion1,
  toVersion2,
  toVersion3,
  toVersion4,
  toVersion5,
  toVersion6,
  toVersion7,
  toVersion8,
  toVersion9,
  toVersion10
];
const CURRENT_SCHEMA_VERSION = VERSIONS.length - 1;
const VERSION_NEEDED_FOR_DISPLAY = 9;
const upgradeSchema = /* @__PURE__ */ __name(async (rawMessage, {
  writeNewAttachmentData,
  getRegionCode,
  getAbsoluteAttachmentPath,
  getAbsoluteStickerPath,
  makeObjectUrl,
  revokeObjectUrl,
  getImageDimensions,
  makeImageThumbnail,
  makeVideoScreenshot,
  writeNewStickerData,
  logger,
  maxVersion = CURRENT_SCHEMA_VERSION
}) => {
  if (!(0, import_lodash.isFunction)(writeNewAttachmentData)) {
    throw new TypeError("context.writeNewAttachmentData is required");
  }
  if (!(0, import_lodash.isFunction)(getRegionCode)) {
    throw new TypeError("context.getRegionCode is required");
  }
  if (!(0, import_lodash.isFunction)(getAbsoluteAttachmentPath)) {
    throw new TypeError("context.getAbsoluteAttachmentPath is required");
  }
  if (!(0, import_lodash.isFunction)(makeObjectUrl)) {
    throw new TypeError("context.makeObjectUrl is required");
  }
  if (!(0, import_lodash.isFunction)(revokeObjectUrl)) {
    throw new TypeError("context.revokeObjectUrl is required");
  }
  if (!(0, import_lodash.isFunction)(getImageDimensions)) {
    throw new TypeError("context.getImageDimensions is required");
  }
  if (!(0, import_lodash.isFunction)(makeImageThumbnail)) {
    throw new TypeError("context.makeImageThumbnail is required");
  }
  if (!(0, import_lodash.isFunction)(makeVideoScreenshot)) {
    throw new TypeError("context.makeVideoScreenshot is required");
  }
  if (!(0, import_lodash.isObject)(logger)) {
    throw new TypeError("context.logger is required");
  }
  if (!(0, import_lodash.isFunction)(getAbsoluteStickerPath)) {
    throw new TypeError("context.getAbsoluteStickerPath is required");
  }
  if (!(0, import_lodash.isFunction)(writeNewStickerData)) {
    throw new TypeError("context.writeNewStickerData is required");
  }
  let message = rawMessage;
  for (let index = 0, max = VERSIONS.length; index < max; index += 1) {
    if (maxVersion < index) {
      break;
    }
    const currentVersion = VERSIONS[index];
    message = await currentVersion(message, {
      writeNewAttachmentData,
      getAbsoluteAttachmentPath,
      makeObjectUrl,
      revokeObjectUrl,
      getImageDimensions,
      makeImageThumbnail,
      makeVideoScreenshot,
      logger,
      getAbsoluteStickerPath,
      getRegionCode,
      writeNewStickerData
    });
  }
  return message;
}, "upgradeSchema");
const processNewAttachment = /* @__PURE__ */ __name(async (attachment, {
  writeNewAttachmentData,
  getAbsoluteAttachmentPath,
  makeObjectUrl,
  revokeObjectUrl,
  getImageDimensions,
  makeImageThumbnail,
  makeVideoScreenshot,
  logger
}) => {
  if (!(0, import_lodash.isFunction)(writeNewAttachmentData)) {
    throw new TypeError("context.writeNewAttachmentData is required");
  }
  if (!(0, import_lodash.isFunction)(getAbsoluteAttachmentPath)) {
    throw new TypeError("context.getAbsoluteAttachmentPath is required");
  }
  if (!(0, import_lodash.isFunction)(makeObjectUrl)) {
    throw new TypeError("context.makeObjectUrl is required");
  }
  if (!(0, import_lodash.isFunction)(revokeObjectUrl)) {
    throw new TypeError("context.revokeObjectUrl is required");
  }
  if (!(0, import_lodash.isFunction)(getImageDimensions)) {
    throw new TypeError("context.getImageDimensions is required");
  }
  if (!(0, import_lodash.isFunction)(makeImageThumbnail)) {
    throw new TypeError("context.makeImageThumbnail is required");
  }
  if (!(0, import_lodash.isFunction)(makeVideoScreenshot)) {
    throw new TypeError("context.makeVideoScreenshot is required");
  }
  if (!(0, import_lodash.isObject)(logger)) {
    throw new TypeError("context.logger is required");
  }
  const rotatedAttachment = await (0, import_Attachment.autoOrientJPEG)(attachment, void 0, {
    isIncoming: true
  });
  const onDiskAttachment = await (0, import_Attachment.migrateDataToFileSystem)(rotatedAttachment, {
    writeNewAttachmentData
  });
  const finalAttachment = await (0, import_Attachment.captureDimensionsAndScreenshot)(onDiskAttachment, {
    writeNewAttachmentData,
    getAbsoluteAttachmentPath,
    makeObjectUrl,
    revokeObjectUrl,
    getImageDimensions,
    makeImageThumbnail,
    makeVideoScreenshot,
    logger
  });
  return finalAttachment;
}, "processNewAttachment");
const processNewSticker = /* @__PURE__ */ __name(async (stickerData, {
  writeNewStickerData,
  getAbsoluteStickerPath,
  getImageDimensions,
  logger
}) => {
  if (!(0, import_lodash.isFunction)(writeNewStickerData)) {
    throw new TypeError("context.writeNewStickerData is required");
  }
  if (!(0, import_lodash.isFunction)(getAbsoluteStickerPath)) {
    throw new TypeError("context.getAbsoluteStickerPath is required");
  }
  if (!(0, import_lodash.isFunction)(getImageDimensions)) {
    throw new TypeError("context.getImageDimensions is required");
  }
  if (!(0, import_lodash.isObject)(logger)) {
    throw new TypeError("context.logger is required");
  }
  const path = await writeNewStickerData(stickerData);
  const absolutePath = await getAbsoluteStickerPath(path);
  const { width, height } = await getImageDimensions({
    objectUrl: absolutePath,
    logger
  });
  return {
    path,
    width,
    height
  };
}, "processNewSticker");
const createAttachmentLoader = /* @__PURE__ */ __name((loadAttachmentData) => {
  if (!(0, import_lodash.isFunction)(loadAttachmentData)) {
    throw new TypeError("createAttachmentLoader: loadAttachmentData is required");
  }
  return async (message) => ({
    ...message,
    attachments: await Promise.all((message.attachments || []).map(loadAttachmentData))
  });
}, "createAttachmentLoader");
const loadQuoteData = /* @__PURE__ */ __name((loadAttachmentData) => {
  if (!(0, import_lodash.isFunction)(loadAttachmentData)) {
    throw new TypeError("loadQuoteData: loadAttachmentData is required");
  }
  return async (quote) => {
    if (!quote) {
      return null;
    }
    return {
      ...quote,
      attachments: await Promise.all((quote.attachments || []).map(async (attachment) => {
        const { thumbnail } = attachment;
        if (!thumbnail || !thumbnail.path) {
          return attachment;
        }
        return {
          ...attachment,
          thumbnail: await loadAttachmentData(thumbnail)
        };
      }))
    };
  };
}, "loadQuoteData");
const loadContactData = /* @__PURE__ */ __name((loadAttachmentData) => {
  if (!(0, import_lodash.isFunction)(loadAttachmentData)) {
    throw new TypeError("loadContactData: loadAttachmentData is required");
  }
  return async (contact) => {
    if (!contact) {
      return void 0;
    }
    return Promise.all(contact.map(async (item) => {
      if (!item || !item.avatar || !item.avatar.avatar || !item.avatar.avatar.path) {
        return item;
      }
      return {
        ...item,
        avatar: {
          ...item.avatar,
          avatar: {
            ...item.avatar.avatar,
            ...await loadAttachmentData(item.avatar.avatar)
          }
        }
      };
    }));
  };
}, "loadContactData");
const loadPreviewData = /* @__PURE__ */ __name((loadAttachmentData) => {
  if (!(0, import_lodash.isFunction)(loadAttachmentData)) {
    throw new TypeError("loadPreviewData: loadAttachmentData is required");
  }
  return async (preview) => {
    if (!preview || !preview.length) {
      return [];
    }
    return Promise.all(preview.map(async (item) => {
      if (!item.image) {
        return item;
      }
      return {
        ...item,
        image: await loadAttachmentData(item.image)
      };
    }));
  };
}, "loadPreviewData");
const loadStickerData = /* @__PURE__ */ __name((loadAttachmentData) => {
  if (!(0, import_lodash.isFunction)(loadAttachmentData)) {
    throw new TypeError("loadStickerData: loadAttachmentData is required");
  }
  return async (sticker) => {
    if (!sticker || !sticker.data) {
      return void 0;
    }
    return {
      ...sticker,
      data: await loadAttachmentData(sticker.data)
    };
  };
}, "loadStickerData");
const deleteAllExternalFiles = /* @__PURE__ */ __name(({
  deleteAttachmentData,
  deleteOnDisk
}) => {
  if (!(0, import_lodash.isFunction)(deleteAttachmentData)) {
    throw new TypeError("deleteAllExternalFiles: deleteAttachmentData must be a function");
  }
  if (!(0, import_lodash.isFunction)(deleteOnDisk)) {
    throw new TypeError("deleteAllExternalFiles: deleteOnDisk must be a function");
  }
  return async (message) => {
    const { attachments, quote, contact, preview, sticker } = message;
    if (attachments && attachments.length) {
      await Promise.all(attachments.map(deleteAttachmentData));
    }
    if (quote && quote.attachments && quote.attachments.length) {
      await Promise.all(quote.attachments.map(async (attachment) => {
        const { thumbnail } = attachment;
        if (thumbnail && thumbnail.path && !thumbnail.copied) {
          await deleteOnDisk(thumbnail.path);
        }
      }));
    }
    if (contact && contact.length) {
      await Promise.all(contact.map(async (item) => {
        const { avatar } = item;
        if (avatar && avatar.avatar && avatar.avatar.path) {
          await deleteOnDisk(avatar.avatar.path);
        }
      }));
    }
    if (preview && preview.length) {
      await Promise.all(preview.map(async (item) => {
        const { image } = item;
        if (image && image.path) {
          await deleteOnDisk(image.path);
        }
      }));
    }
    if (sticker && sticker.data && sticker.data.path) {
      await deleteOnDisk(sticker.data.path);
      if (sticker.data.thumbnail && sticker.data.thumbnail.path) {
        await deleteOnDisk(sticker.data.thumbnail.path);
      }
    }
  };
}, "deleteAllExternalFiles");
const createAttachmentDataWriter = /* @__PURE__ */ __name(({
  writeExistingAttachmentData,
  logger
}) => {
  if (!(0, import_lodash.isFunction)(writeExistingAttachmentData)) {
    throw new TypeError("createAttachmentDataWriter: writeExistingAttachmentData must be a function");
  }
  if (!(0, import_lodash.isObject)(logger)) {
    throw new TypeError("createAttachmentDataWriter: logger must be an object");
  }
  return async (rawMessage) => {
    if (!isValid(rawMessage)) {
      throw new TypeError("'rawMessage' is not valid");
    }
    const message = initializeSchemaVersion({
      message: rawMessage,
      logger
    });
    const { attachments, quote, contact, preview } = message;
    const hasFilesToWrite = quote && quote.attachments && quote.attachments.length > 0 || attachments && attachments.length > 0 || contact && contact.length > 0 || preview && preview.length > 0;
    if (!hasFilesToWrite) {
      return message;
    }
    const lastVersionWithAttachmentDataInMemory = 2;
    const willAttachmentsGoToFileSystemOnUpgrade = (message.schemaVersion || 0) <= lastVersionWithAttachmentDataInMemory;
    if (willAttachmentsGoToFileSystemOnUpgrade) {
      return message;
    }
    (attachments || []).forEach((attachment) => {
      if (!(0, import_Attachment.hasData)(attachment)) {
        throw new TypeError("'attachment.data' is required during message import");
      }
      if (!(0, import_lodash.isString)(attachment.path)) {
        throw new TypeError("'attachment.path' is required during message import");
      }
    });
    const writeQuoteAttachment = /* @__PURE__ */ __name(async (attachment) => {
      const { thumbnail } = attachment;
      if (!thumbnail) {
        return attachment;
      }
      const { data, path } = thumbnail;
      if (!data || !path) {
        logger.warn("quote attachment had neither data nor path.", "id:", message.id, "source:", message.source);
        return attachment;
      }
      await writeExistingAttachmentData(thumbnail);
      return {
        ...attachment,
        thumbnail: (0, import_lodash.omit)(thumbnail, ["data"])
      };
    }, "writeQuoteAttachment");
    const writeContactAvatar = /* @__PURE__ */ __name(async (messageContact) => {
      const { avatar } = messageContact;
      if (!avatar) {
        return messageContact;
      }
      if (avatar && !avatar.avatar) {
        return (0, import_lodash.omit)(messageContact, ["avatar"]);
      }
      await writeExistingAttachmentData(avatar.avatar);
      return {
        ...messageContact,
        avatar: { ...avatar, avatar: (0, import_lodash.omit)(avatar.avatar, ["data"]) }
      };
    }, "writeContactAvatar");
    const writePreviewImage = /* @__PURE__ */ __name(async (item) => {
      const { image } = item;
      if (!image) {
        return (0, import_lodash.omit)(item, ["image"]);
      }
      await writeExistingAttachmentData(image);
      return { ...item, image: (0, import_lodash.omit)(image, ["data"]) };
    }, "writePreviewImage");
    const messageWithoutAttachmentData = {
      ...message,
      ...quote ? {
        quote: {
          ...quote,
          attachments: await Promise.all((quote?.attachments || []).map(writeQuoteAttachment))
        }
      } : void 0,
      contact: await Promise.all((contact || []).map(writeContactAvatar)),
      preview: await Promise.all((preview || []).map(writePreviewImage)),
      attachments: await Promise.all((attachments || []).map(async (attachment) => {
        await writeExistingAttachmentData(attachment);
        if (attachment.screenshot && attachment.screenshot.data) {
          await writeExistingAttachmentData(attachment.screenshot);
        }
        if (attachment.thumbnail && attachment.thumbnail.data) {
          await writeExistingAttachmentData(attachment.thumbnail);
        }
        return {
          ...(0, import_lodash.omit)(attachment, ["data"]),
          ...attachment.thumbnail ? { thumbnail: (0, import_lodash.omit)(attachment.thumbnail, ["data"]) } : null,
          ...attachment.screenshot ? { screenshot: (0, import_lodash.omit)(attachment.screenshot, ["data"]) } : null
        };
      }))
    };
    return messageWithoutAttachmentData;
  };
}, "createAttachmentDataWriter");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CURRENT_SCHEMA_VERSION,
  GROUP,
  PRIVATE,
  VERSION_NEEDED_FOR_DISPLAY,
  _mapAttachments,
  _mapContact,
  _mapPreviewAttachments,
  _mapQuotedAttachments,
  _withSchemaVersion,
  createAttachmentDataWriter,
  createAttachmentLoader,
  deleteAllExternalFiles,
  hasExpiration,
  initializeSchemaVersion,
  isValid,
  loadContactData,
  loadPreviewData,
  loadQuoteData,
  loadStickerData,
  processNewAttachment,
  processNewSticker,
  upgradeSchema
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZTIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBpc0Z1bmN0aW9uLCBpc09iamVjdCwgaXNTdHJpbmcsIG9taXQgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgKiBhcyBDb250YWN0IGZyb20gJy4vRW1iZWRkZWRDb250YWN0JztcbmltcG9ydCB0eXBlIHsgQXR0YWNobWVudFR5cGUsIEF0dGFjaG1lbnRXaXRoSHlkcmF0ZWREYXRhIH0gZnJvbSAnLi9BdHRhY2htZW50JztcbmltcG9ydCB7XG4gIGF1dG9PcmllbnRKUEVHLFxuICBjYXB0dXJlRGltZW5zaW9uc0FuZFNjcmVlbnNob3QsXG4gIGhhc0RhdGEsXG4gIG1pZ3JhdGVEYXRhVG9GaWxlU3lzdGVtLFxuICByZW1vdmVTY2hlbWFWZXJzaW9uLFxuICByZXBsYWNlVW5pY29kZU9yZGVyT3ZlcnJpZGVzLFxuICByZXBsYWNlVW5pY29kZVYyLFxufSBmcm9tICcuL0F0dGFjaG1lbnQnO1xuaW1wb3J0ICogYXMgRXJyb3JzIGZyb20gJy4vZXJyb3JzJztcbmltcG9ydCAqIGFzIFNjaGVtYVZlcnNpb24gZnJvbSAnLi9TY2hlbWFWZXJzaW9uJztcbmltcG9ydCB7IGluaXRpYWxpemVBdHRhY2htZW50TWV0YWRhdGEgfSBmcm9tICcuL21lc3NhZ2UvaW5pdGlhbGl6ZUF0dGFjaG1lbnRNZXRhZGF0YSc7XG5cbmltcG9ydCB0eXBlICogYXMgTUlNRSBmcm9tICcuL01JTUUnO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi9Mb2dnaW5nJztcbmltcG9ydCB0eXBlIHsgRW1iZWRkZWRDb250YWN0VHlwZSB9IGZyb20gJy4vRW1iZWRkZWRDb250YWN0JztcblxuaW1wb3J0IHR5cGUge1xuICBNZXNzYWdlQXR0cmlidXRlc1R5cGUsXG4gIFF1b3RlZE1lc3NhZ2VUeXBlLFxufSBmcm9tICcuLi9tb2RlbC10eXBlcy5kJztcbmltcG9ydCB0eXBlIHsgTGlua1ByZXZpZXdUeXBlIH0gZnJvbSAnLi9tZXNzYWdlL0xpbmtQcmV2aWV3cyc7XG5pbXBvcnQgdHlwZSB7IFN0aWNrZXJUeXBlLCBTdGlja2VyV2l0aEh5ZHJhdGVkRGF0YSB9IGZyb20gJy4vU3RpY2tlcnMnO1xuXG5leHBvcnQgeyBoYXNFeHBpcmF0aW9uIH0gZnJvbSAnLi9NZXNzYWdlJztcblxuZXhwb3J0IGNvbnN0IEdST1VQID0gJ2dyb3VwJztcbmV4cG9ydCBjb25zdCBQUklWQVRFID0gJ3ByaXZhdGUnO1xuXG5leHBvcnQgdHlwZSBDb250ZXh0VHlwZSA9IHtcbiAgZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aDogKHBhdGg6IHN0cmluZykgPT4gc3RyaW5nO1xuICBnZXRBYnNvbHV0ZVN0aWNrZXJQYXRoOiAocGF0aDogc3RyaW5nKSA9PiBzdHJpbmc7XG4gIGdldEltYWdlRGltZW5zaW9uczogKHBhcmFtczoge1xuICAgIG9iamVjdFVybDogc3RyaW5nO1xuICAgIGxvZ2dlcjogTG9nZ2VyVHlwZTtcbiAgfSkgPT4gUHJvbWlzZTx7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbiAgfT47XG4gIGdldFJlZ2lvbkNvZGU6ICgpID0+IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlO1xuICBtYWtlSW1hZ2VUaHVtYm5haWw6IChwYXJhbXM6IHtcbiAgICBzaXplOiBudW1iZXI7XG4gICAgb2JqZWN0VXJsOiBzdHJpbmc7XG4gICAgY29udGVudFR5cGU6IE1JTUUuTUlNRVR5cGU7XG4gICAgbG9nZ2VyOiBMb2dnZXJUeXBlO1xuICB9KSA9PiBQcm9taXNlPEJsb2I+O1xuICBtYWtlT2JqZWN0VXJsOiAoXG4gICAgZGF0YTogVWludDhBcnJheSB8IEFycmF5QnVmZmVyLFxuICAgIGNvbnRlbnRUeXBlOiBNSU1FLk1JTUVUeXBlXG4gICkgPT4gc3RyaW5nO1xuICBtYWtlVmlkZW9TY3JlZW5zaG90OiAocGFyYW1zOiB7XG4gICAgb2JqZWN0VXJsOiBzdHJpbmc7XG4gICAgY29udGVudFR5cGU6IE1JTUUuTUlNRVR5cGU7XG4gICAgbG9nZ2VyOiBMb2dnZXJUeXBlO1xuICB9KSA9PiBQcm9taXNlPEJsb2I+O1xuICBtYXhWZXJzaW9uPzogbnVtYmVyO1xuICByZXZva2VPYmplY3RVcmw6IChvYmplY3RVcmw6IHN0cmluZykgPT4gdm9pZDtcbiAgd3JpdGVOZXdBdHRhY2htZW50RGF0YTogKGRhdGE6IFVpbnQ4QXJyYXkpID0+IFByb21pc2U8c3RyaW5nPjtcbiAgd3JpdGVOZXdTdGlja2VyRGF0YTogKGRhdGE6IFVpbnQ4QXJyYXkpID0+IFByb21pc2U8c3RyaW5nPjtcbn07XG5cbnR5cGUgV3JpdGVFeGlzdGluZ0F0dGFjaG1lbnREYXRhVHlwZSA9IChcbiAgYXR0YWNobWVudDogUGljazxBdHRhY2htZW50VHlwZSwgJ2RhdGEnIHwgJ3BhdGgnPlxuKSA9PiBQcm9taXNlPHN0cmluZz47XG5cbmV4cG9ydCB0eXBlIENvbnRleHRXaXRoTWVzc2FnZVR5cGUgPSBDb250ZXh0VHlwZSAmIHtcbiAgbWVzc2FnZTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlO1xufTtcblxuLy8gU2NoZW1hIHZlcnNpb24gaGlzdG9yeVxuLy9cbi8vIFZlcnNpb24gMFxuLy8gICAtIFNjaGVtYSBpbml0aWFsaXplZFxuLy8gVmVyc2lvbiAxXG4vLyAgIC0gQXR0YWNobWVudHM6IEF1dG8tb3JpZW50IEpQRUcgYXR0YWNobWVudHMgdXNpbmcgRVhJRiBgT3JpZW50YXRpb25gIGRhdGEuXG4vLyAgICAgTi5CLiBUaGUgcHJvY2VzcyBvZiBhdXRvLW9yaWVudCBmb3IgSlBFR3Mgc3RyaXBzIChsb3NlcykgYWxsIGV4aXN0aW5nXG4vLyAgICAgRVhJRiBtZXRhZGF0YSBpbXByb3ZpbmcgcHJpdmFjeSwgZS5nLiBnZW9sb2NhdGlvbiwgY2FtZXJhIG1ha2UsIGV0Yy5cbi8vIFZlcnNpb24gMlxuLy8gICAtIEF0dGFjaG1lbnRzOiBTYW5pdGl6ZSBVbmljb2RlIG9yZGVyIG92ZXJyaWRlIGNoYXJhY3RlcnMuXG4vLyBWZXJzaW9uIDNcbi8vICAgLSBBdHRhY2htZW50czogV3JpdGUgYXR0YWNobWVudCBkYXRhIHRvIGRpc2sgYW5kIHN0b3JlIHJlbGF0aXZlIHBhdGggdG8gaXQuXG4vLyBWZXJzaW9uIDRcbi8vICAgLSBRdW90ZXM6IFdyaXRlIHRodW1ibmFpbCBkYXRhIHRvIGRpc2sgYW5kIHN0b3JlIHJlbGF0aXZlIHBhdGggdG8gaXQuXG4vLyBWZXJzaW9uIDUgKGRlcHJlY2F0ZWQpXG4vLyAgIC0gQXR0YWNobWVudHM6IFRyYWNrIG51bWJlciBhbmQga2luZCBvZiBhdHRhY2htZW50cyBmb3IgbWVkaWEgZ2FsbGVyeVxuLy8gICAgIC0gYGhhc0F0dGFjaG1lbnRzPzogMSB8IDBgXG4vLyAgICAgLSBgaGFzVmlzdWFsTWVkaWFBdHRhY2htZW50cz86IDEgfCB1bmRlZmluZWRgIChmb3IgbWVkaWEgZ2FsbGVyeSBcdTIwMThNZWRpYVx1MjAxOSB2aWV3KVxuLy8gICAgIC0gYGhhc0ZpbGVBdHRhY2htZW50cz86IDEgfCB1bmRlZmluZWRgIChmb3IgbWVkaWEgZ2FsbGVyeSBcdTIwMThEb2N1bWVudHNcdTIwMTkgdmlldylcbi8vICAgLSBJTVBPUlRBTlQ6IFZlcnNpb24gNyBjaGFuZ2VzIHRoZSBjbGFzc2lmaWNhdGlvbiBvZiB2aXN1YWwgbWVkaWEgYW5kIGZpbGVzLlxuLy8gICAgIFRoZXJlZm9yZSB2ZXJzaW9uIDUgaXMgY29uc2lkZXJlZCBkZXByZWNhdGVkLiBGb3IgYW4gZWFzaWVyIGltcGxlbWVudGF0aW9uLFxuLy8gICAgIG5ldyBmaWxlcyBoYXZlIHRoZSBzYW1lIGNsYXNzaWZpY2F0aW9uIGluIHZlcnNpb24gNSBhcyBpbiB2ZXJzaW9uIDcuXG4vLyBWZXJzaW9uIDZcbi8vICAgLSBDb250YWN0OiBXcml0ZSBjb250YWN0IGF2YXRhciB0byBkaXNrLCBlbnN1cmUgY29udGFjdCBkYXRhIGlzIHdlbGwtZm9ybWVkXG4vLyBWZXJzaW9uIDcgKHN1cGVyc2VkZXMgYXR0YWNobWVudCBjbGFzc2lmaWNhdGlvbiBpbiB2ZXJzaW9uIDUpXG4vLyAgIC0gQXR0YWNobWVudHM6IFVwZGF0ZSBjbGFzc2lmaWNhdGlvbiBmb3I6XG4vLyAgICAgLSBgaGFzVmlzdWFsTWVkaWFBdHRhY2htZW50c2A6IEluY2x1ZGUgYWxsIGltYWdlcyBhbmQgdmlkZW8gcmVnYXJkbGVzcyBvZlxuLy8gICAgICAgd2hldGhlciBDaHJvbWl1bSBjYW4gcmVuZGVyIGl0IG9yIG5vdC5cbi8vICAgICAtIGBoYXNGaWxlQXR0YWNobWVudHNgOiBFeGNsdWRlIHZvaWNlIG1lc3NhZ2VzLlxuLy8gVmVyc2lvbiA4XG4vLyAgIC0gQXR0YWNobWVudHM6IENhcHR1cmUgdmlkZW8vaW1hZ2UgZGltZW5zaW9ucyBhbmQgdGh1bWJuYWlscywgYXMgd2VsbCBhcyBhXG4vLyAgICAgICBmdWxsLXNpemUgc2NyZWVuc2hvdCBmb3IgdmlkZW8uXG4vLyBWZXJzaW9uIDlcbi8vICAgLSBBdHRhY2htZW50czogRXhwYW5kIHRoZSBzZXQgb2YgdW5pY29kZSBjaGFyYWN0ZXJzIHdlIGZpbHRlciBvdXQgb2Zcbi8vICAgICBhdHRhY2htZW50IGZpbGVuYW1lc1xuLy8gVmVyc2lvbiAxMFxuLy8gICAtIFByZXZpZXc6IEEgbmV3IHR5cGUgb2YgYXR0YWNobWVudCBjYW4gYmUgaW5jbHVkZWQgaW4gYSBtZXNzYWdlLlxuXG5jb25zdCBJTklUSUFMX1NDSEVNQV9WRVJTSU9OID0gMDtcblxuLy8gUGxhY2Vob2xkZXIgdW50aWwgd2UgaGF2ZSBzdHJvbmdlciBwcmVjb25kaXRpb25zOlxuZXhwb3J0IGNvbnN0IGlzVmFsaWQgPSAoX21lc3NhZ2U6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSk6IGJvb2xlYW4gPT4gdHJ1ZTtcblxuLy8gU2NoZW1hXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVNjaGVtYVZlcnNpb24gPSAoe1xuICBtZXNzYWdlLFxuICBsb2dnZXIsXG59OiB7XG4gIG1lc3NhZ2U6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZTtcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlO1xufSk6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9PiB7XG4gIGNvbnN0IGlzSW5pdGlhbGl6ZWQgPVxuICAgIFNjaGVtYVZlcnNpb24uaXNWYWxpZChtZXNzYWdlLnNjaGVtYVZlcnNpb24pICYmIG1lc3NhZ2Uuc2NoZW1hVmVyc2lvbiA+PSAxO1xuICBpZiAoaXNJbml0aWFsaXplZCkge1xuICAgIHJldHVybiBtZXNzYWdlO1xuICB9XG5cbiAgY29uc3QgZmlyc3RBdHRhY2htZW50ID0gbWVzc2FnZT8uYXR0YWNobWVudHM/LlswXTtcbiAgaWYgKCFmaXJzdEF0dGFjaG1lbnQpIHtcbiAgICByZXR1cm4geyAuLi5tZXNzYWdlLCBzY2hlbWFWZXJzaW9uOiBJTklUSUFMX1NDSEVNQV9WRVJTSU9OIH07XG4gIH1cblxuICAvLyBBbGwgYXR0YWNobWVudHMgc2hvdWxkIGhhdmUgdGhlIHNhbWUgc2NoZW1hIHZlcnNpb24sIHNvIHdlIGp1c3QgcGlja1xuICAvLyB0aGUgZmlyc3Qgb25lOlxuICBjb25zdCBpbmhlcml0ZWRTY2hlbWFWZXJzaW9uID0gU2NoZW1hVmVyc2lvbi5pc1ZhbGlkKFxuICAgIGZpcnN0QXR0YWNobWVudC5zY2hlbWFWZXJzaW9uXG4gIClcbiAgICA/IGZpcnN0QXR0YWNobWVudC5zY2hlbWFWZXJzaW9uXG4gICAgOiBJTklUSUFMX1NDSEVNQV9WRVJTSU9OO1xuICBjb25zdCBtZXNzYWdlV2l0aEluaXRpYWxTY2hlbWEgPSB7XG4gICAgLi4ubWVzc2FnZSxcbiAgICBzY2hlbWFWZXJzaW9uOiBpbmhlcml0ZWRTY2hlbWFWZXJzaW9uLFxuICAgIGF0dGFjaG1lbnRzOlxuICAgICAgbWVzc2FnZT8uYXR0YWNobWVudHM/Lm1hcChhdHRhY2htZW50ID0+XG4gICAgICAgIHJlbW92ZVNjaGVtYVZlcnNpb24oeyBhdHRhY2htZW50LCBsb2dnZXIgfSlcbiAgICAgICkgfHwgW10sXG4gIH07XG5cbiAgcmV0dXJuIG1lc3NhZ2VXaXRoSW5pdGlhbFNjaGVtYTtcbn07XG5cbi8vIE1pZGRsZXdhcmVcbi8vIHR5cGUgVXBncmFkZVN0ZXAgPSAoTWVzc2FnZSwgQ29udGV4dCkgLT4gUHJvbWlzZSBNZXNzYWdlXG5cbi8vIFNjaGVtYVZlcnNpb24gLT4gVXBncmFkZVN0ZXAgLT4gVXBncmFkZVN0ZXBcbmV4cG9ydCBjb25zdCBfd2l0aFNjaGVtYVZlcnNpb24gPSAoe1xuICBzY2hlbWFWZXJzaW9uLFxuICB1cGdyYWRlLFxufToge1xuICBzY2hlbWFWZXJzaW9uOiBudW1iZXI7XG4gIHVwZ3JhZGU6IChcbiAgICBtZXNzYWdlOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUsXG4gICAgY29udGV4dDogQ29udGV4dFR5cGVcbiAgKSA9PiBQcm9taXNlPE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZT47XG59KTogKChcbiAgbWVzc2FnZTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlLFxuICBjb250ZXh0OiBDb250ZXh0VHlwZVxuKSA9PiBQcm9taXNlPE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZT4pID0+IHtcbiAgaWYgKCFTY2hlbWFWZXJzaW9uLmlzVmFsaWQoc2NoZW1hVmVyc2lvbikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdfd2l0aFNjaGVtYVZlcnNpb246IHNjaGVtYVZlcnNpb24gaXMgaW52YWxpZCcpO1xuICB9XG4gIGlmICghaXNGdW5jdGlvbih1cGdyYWRlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ193aXRoU2NoZW1hVmVyc2lvbjogdXBncmFkZSBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIHJldHVybiBhc3luYyAobWVzc2FnZTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlLCBjb250ZXh0OiBDb250ZXh0VHlwZSkgPT4ge1xuICAgIGlmICghY29udGV4dCB8fCAhaXNPYmplY3QoY29udGV4dC5sb2dnZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnX3dpdGhTY2hlbWFWZXJzaW9uOiBjb250ZXh0IG11c3QgaGF2ZSBsb2dnZXIgb2JqZWN0J1xuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgeyBsb2dnZXIgfSA9IGNvbnRleHQ7XG5cbiAgICBpZiAoIWlzVmFsaWQobWVzc2FnZSkpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgJ01lc3NhZ2UuX3dpdGhTY2hlbWFWZXJzaW9uOiBJbnZhbGlkIGlucHV0IG1lc3NhZ2U6JyxcbiAgICAgICAgbWVzc2FnZVxuICAgICAgKTtcbiAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH1cblxuICAgIGNvbnN0IGlzQWxyZWFkeVVwZ3JhZGVkID0gKG1lc3NhZ2Uuc2NoZW1hVmVyc2lvbiB8fCAwKSA+PSBzY2hlbWFWZXJzaW9uO1xuICAgIGlmIChpc0FscmVhZHlVcGdyYWRlZCkge1xuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfVxuXG4gICAgY29uc3QgZXhwZWN0ZWRWZXJzaW9uID0gc2NoZW1hVmVyc2lvbiAtIDE7XG4gICAgY29uc3QgaGFzRXhwZWN0ZWRWZXJzaW9uID0gbWVzc2FnZS5zY2hlbWFWZXJzaW9uID09PSBleHBlY3RlZFZlcnNpb247XG4gICAgaWYgKCFoYXNFeHBlY3RlZFZlcnNpb24pIHtcbiAgICAgIGxvZ2dlci53YXJuKFxuICAgICAgICAnV0FSTklORzogTWVzc2FnZS5fd2l0aFNjaGVtYVZlcnNpb246IFVuZXhwZWN0ZWQgdmVyc2lvbjonLFxuICAgICAgICBgRXhwZWN0ZWQgbWVzc2FnZSB0byBoYXZlIHZlcnNpb24gJHtleHBlY3RlZFZlcnNpb259LGAsXG4gICAgICAgIGBidXQgZ290ICR7bWVzc2FnZS5zY2hlbWFWZXJzaW9ufS5gXG4gICAgICApO1xuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfVxuXG4gICAgbGV0IHVwZ3JhZGVkTWVzc2FnZTtcbiAgICB0cnkge1xuICAgICAgdXBncmFkZWRNZXNzYWdlID0gYXdhaXQgdXBncmFkZShtZXNzYWdlLCBjb250ZXh0KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyLmVycm9yKFxuICAgICAgICBgTWVzc2FnZS5fd2l0aFNjaGVtYVZlcnNpb246IGVycm9yIHVwZGF0aW5nIG1lc3NhZ2UgJHttZXNzYWdlLmlkfTpgLFxuICAgICAgICBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpXG4gICAgICApO1xuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfVxuXG4gICAgaWYgKCFpc1ZhbGlkKHVwZ3JhZGVkTWVzc2FnZSkpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgJ01lc3NhZ2UuX3dpdGhTY2hlbWFWZXJzaW9uOiBJbnZhbGlkIHVwZ3JhZGVkIG1lc3NhZ2U6JyxcbiAgICAgICAgdXBncmFkZWRNZXNzYWdlXG4gICAgICApO1xuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgLi4udXBncmFkZWRNZXNzYWdlLCBzY2hlbWFWZXJzaW9uIH07XG4gIH07XG59O1xuXG4vLyBQdWJsaWMgQVBJXG4vLyAgICAgIF9tYXBBdHRhY2htZW50cyA6OiAoQXR0YWNobWVudCAtPiBQcm9taXNlIEF0dGFjaG1lbnQpIC0+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAoTWVzc2FnZSwgQ29udGV4dCkgLT5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgIFByb21pc2UgTWVzc2FnZVxuZXhwb3J0IHR5cGUgVXBncmFkZUF0dGFjaG1lbnRUeXBlID0gKFxuICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZSxcbiAgY29udGV4dDogQ29udGV4dFR5cGUsXG4gIG1lc3NhZ2U6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZVxuKSA9PiBQcm9taXNlPEF0dGFjaG1lbnRUeXBlPjtcblxuZXhwb3J0IGNvbnN0IF9tYXBBdHRhY2htZW50cyA9XG4gICh1cGdyYWRlQXR0YWNobWVudDogVXBncmFkZUF0dGFjaG1lbnRUeXBlKSA9PlxuICBhc3luYyAoXG4gICAgbWVzc2FnZTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlLFxuICAgIGNvbnRleHQ6IENvbnRleHRUeXBlXG4gICk6IFByb21pc2U8TWVzc2FnZUF0dHJpYnV0ZXNUeXBlPiA9PiB7XG4gICAgY29uc3QgdXBncmFkZVdpdGhDb250ZXh0ID0gKGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlKSA9PlxuICAgICAgdXBncmFkZUF0dGFjaG1lbnQoYXR0YWNobWVudCwgY29udGV4dCwgbWVzc2FnZSk7XG4gICAgY29uc3QgYXR0YWNobWVudHMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIChtZXNzYWdlLmF0dGFjaG1lbnRzIHx8IFtdKS5tYXAodXBncmFkZVdpdGhDb250ZXh0KVxuICAgICk7XG4gICAgcmV0dXJuIHsgLi4ubWVzc2FnZSwgYXR0YWNobWVudHMgfTtcbiAgfTtcblxuLy8gUHVibGljIEFQSVxuLy8gICAgICBfbWFwQ29udGFjdCA6OiAoQ29udGFjdCAtPiBQcm9taXNlIENvbnRhY3QpIC0+XG4vLyAgICAgICAgICAgICAgICAgICAgIChNZXNzYWdlLCBDb250ZXh0KSAtPlxuLy8gICAgICAgICAgICAgICAgICAgICBQcm9taXNlIE1lc3NhZ2VcblxuZXhwb3J0IHR5cGUgVXBncmFkZUNvbnRhY3RUeXBlID0gKFxuICBjb250YWN0OiBFbWJlZGRlZENvbnRhY3RUeXBlLFxuICBjb250ZXh0V2l0aE1lc3NhZ2U6IENvbnRleHRXaXRoTWVzc2FnZVR5cGVcbikgPT4gUHJvbWlzZTxFbWJlZGRlZENvbnRhY3RUeXBlPjtcbmV4cG9ydCBjb25zdCBfbWFwQ29udGFjdCA9XG4gICh1cGdyYWRlQ29udGFjdDogVXBncmFkZUNvbnRhY3RUeXBlKSA9PlxuICBhc3luYyAoXG4gICAgbWVzc2FnZTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlLFxuICAgIGNvbnRleHQ6IENvbnRleHRUeXBlXG4gICk6IFByb21pc2U8TWVzc2FnZUF0dHJpYnV0ZXNUeXBlPiA9PiB7XG4gICAgY29uc3QgY29udGV4dFdpdGhNZXNzYWdlID0geyAuLi5jb250ZXh0LCBtZXNzYWdlIH07XG4gICAgY29uc3QgdXBncmFkZVdpdGhDb250ZXh0ID0gKGNvbnRhY3Q6IEVtYmVkZGVkQ29udGFjdFR5cGUpID0+XG4gICAgICB1cGdyYWRlQ29udGFjdChjb250YWN0LCBjb250ZXh0V2l0aE1lc3NhZ2UpO1xuICAgIGNvbnN0IGNvbnRhY3QgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIChtZXNzYWdlLmNvbnRhY3QgfHwgW10pLm1hcCh1cGdyYWRlV2l0aENvbnRleHQpXG4gICAgKTtcbiAgICByZXR1cm4geyAuLi5tZXNzYWdlLCBjb250YWN0IH07XG4gIH07XG5cbi8vICAgICAgX21hcFF1b3RlZEF0dGFjaG1lbnRzIDo6IChRdW90ZWRBdHRhY2htZW50IC0+IFByb21pc2UgUXVvdGVkQXR0YWNobWVudCkgLT5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChNZXNzYWdlLCBDb250ZXh0KSAtPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZSBNZXNzYWdlXG5leHBvcnQgY29uc3QgX21hcFF1b3RlZEF0dGFjaG1lbnRzID1cbiAgKHVwZ3JhZGVBdHRhY2htZW50OiBVcGdyYWRlQXR0YWNobWVudFR5cGUpID0+XG4gIGFzeW5jIChcbiAgICBtZXNzYWdlOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUsXG4gICAgY29udGV4dDogQ29udGV4dFR5cGVcbiAgKTogUHJvbWlzZTxNZXNzYWdlQXR0cmlidXRlc1R5cGU+ID0+IHtcbiAgICBpZiAoIW1lc3NhZ2UucXVvdGUpIHtcbiAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH1cbiAgICBpZiAoIWNvbnRleHQgfHwgIWlzT2JqZWN0KGNvbnRleHQubG9nZ2VyKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdfbWFwUXVvdGVkQXR0YWNobWVudHM6IGNvbnRleHQgbXVzdCBoYXZlIGxvZ2dlciBvYmplY3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCB1cGdyYWRlV2l0aENvbnRleHQgPSBhc3luYyAoXG4gICAgICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZVxuICAgICk6IFByb21pc2U8QXR0YWNobWVudFR5cGU+ID0+IHtcbiAgICAgIGNvbnN0IHsgdGh1bWJuYWlsIH0gPSBhdHRhY2htZW50O1xuICAgICAgaWYgKCF0aHVtYm5haWwpIHtcbiAgICAgICAgcmV0dXJuIGF0dGFjaG1lbnQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVwZ3JhZGVkVGh1bWJuYWlsID0gYXdhaXQgdXBncmFkZUF0dGFjaG1lbnQoXG4gICAgICAgIHRodW1ibmFpbCBhcyBBdHRhY2htZW50VHlwZSxcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgbWVzc2FnZVxuICAgICAgKTtcbiAgICAgIHJldHVybiB7IC4uLmF0dGFjaG1lbnQsIHRodW1ibmFpbDogdXBncmFkZWRUaHVtYm5haWwgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgcXVvdGVkQXR0YWNobWVudHMgPVxuICAgICAgKG1lc3NhZ2UucXVvdGUgJiYgbWVzc2FnZS5xdW90ZS5hdHRhY2htZW50cykgfHwgW107XG5cbiAgICBjb25zdCBhdHRhY2htZW50cyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgcXVvdGVkQXR0YWNobWVudHMubWFwKHVwZ3JhZGVXaXRoQ29udGV4dClcbiAgICApO1xuICAgIHJldHVybiB7IC4uLm1lc3NhZ2UsIHF1b3RlOiB7IC4uLm1lc3NhZ2UucXVvdGUsIGF0dGFjaG1lbnRzIH0gfTtcbiAgfTtcblxuLy8gICAgICBfbWFwUHJldmlld0F0dGFjaG1lbnRzIDo6IChQcmV2aWV3QXR0YWNobWVudCAtPiBQcm9taXNlIFByZXZpZXdBdHRhY2htZW50KSAtPlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKE1lc3NhZ2UsIENvbnRleHQpIC0+XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlIE1lc3NhZ2VcbmV4cG9ydCBjb25zdCBfbWFwUHJldmlld0F0dGFjaG1lbnRzID1cbiAgKHVwZ3JhZGVBdHRhY2htZW50OiBVcGdyYWRlQXR0YWNobWVudFR5cGUpID0+XG4gIGFzeW5jIChcbiAgICBtZXNzYWdlOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUsXG4gICAgY29udGV4dDogQ29udGV4dFR5cGVcbiAgKTogUHJvbWlzZTxNZXNzYWdlQXR0cmlidXRlc1R5cGU+ID0+IHtcbiAgICBpZiAoIW1lc3NhZ2UucHJldmlldykge1xuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfVxuICAgIGlmICghY29udGV4dCB8fCAhaXNPYmplY3QoY29udGV4dC5sb2dnZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdfbWFwUHJldmlld0F0dGFjaG1lbnRzOiBjb250ZXh0IG11c3QgaGF2ZSBsb2dnZXIgb2JqZWN0J1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCB1cGdyYWRlV2l0aENvbnRleHQgPSBhc3luYyAocHJldmlldzogTGlua1ByZXZpZXdUeXBlKSA9PiB7XG4gICAgICBjb25zdCB7IGltYWdlIH0gPSBwcmV2aWV3O1xuICAgICAgaWYgKCFpbWFnZSkge1xuICAgICAgICByZXR1cm4gcHJldmlldztcbiAgICAgIH1cblxuICAgICAgY29uc3QgdXBncmFkZWRJbWFnZSA9IGF3YWl0IHVwZ3JhZGVBdHRhY2htZW50KGltYWdlLCBjb250ZXh0LCBtZXNzYWdlKTtcbiAgICAgIHJldHVybiB7IC4uLnByZXZpZXcsIGltYWdlOiB1cGdyYWRlZEltYWdlIH07XG4gICAgfTtcblxuICAgIGNvbnN0IHByZXZpZXcgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIChtZXNzYWdlLnByZXZpZXcgfHwgW10pLm1hcCh1cGdyYWRlV2l0aENvbnRleHQpXG4gICAgKTtcbiAgICByZXR1cm4geyAuLi5tZXNzYWdlLCBwcmV2aWV3IH07XG4gIH07XG5cbmNvbnN0IHRvVmVyc2lvbjAgPSBhc3luYyAoXG4gIG1lc3NhZ2U6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSxcbiAgY29udGV4dDogQ29udGV4dFR5cGVcbikgPT4gaW5pdGlhbGl6ZVNjaGVtYVZlcnNpb24oeyBtZXNzYWdlLCBsb2dnZXI6IGNvbnRleHQubG9nZ2VyIH0pO1xuY29uc3QgdG9WZXJzaW9uMSA9IF93aXRoU2NoZW1hVmVyc2lvbih7XG4gIHNjaGVtYVZlcnNpb246IDEsXG4gIHVwZ3JhZGU6IF9tYXBBdHRhY2htZW50cyhhdXRvT3JpZW50SlBFRyksXG59KTtcbmNvbnN0IHRvVmVyc2lvbjIgPSBfd2l0aFNjaGVtYVZlcnNpb24oe1xuICBzY2hlbWFWZXJzaW9uOiAyLFxuICB1cGdyYWRlOiBfbWFwQXR0YWNobWVudHMocmVwbGFjZVVuaWNvZGVPcmRlck92ZXJyaWRlcyksXG59KTtcbmNvbnN0IHRvVmVyc2lvbjMgPSBfd2l0aFNjaGVtYVZlcnNpb24oe1xuICBzY2hlbWFWZXJzaW9uOiAzLFxuICB1cGdyYWRlOiBfbWFwQXR0YWNobWVudHMobWlncmF0ZURhdGFUb0ZpbGVTeXN0ZW0pLFxufSk7XG5jb25zdCB0b1ZlcnNpb240ID0gX3dpdGhTY2hlbWFWZXJzaW9uKHtcbiAgc2NoZW1hVmVyc2lvbjogNCxcbiAgdXBncmFkZTogX21hcFF1b3RlZEF0dGFjaG1lbnRzKG1pZ3JhdGVEYXRhVG9GaWxlU3lzdGVtKSxcbn0pO1xuY29uc3QgdG9WZXJzaW9uNSA9IF93aXRoU2NoZW1hVmVyc2lvbih7XG4gIHNjaGVtYVZlcnNpb246IDUsXG4gIHVwZ3JhZGU6IGluaXRpYWxpemVBdHRhY2htZW50TWV0YWRhdGEsXG59KTtcbmNvbnN0IHRvVmVyc2lvbjYgPSBfd2l0aFNjaGVtYVZlcnNpb24oe1xuICBzY2hlbWFWZXJzaW9uOiA2LFxuICB1cGdyYWRlOiBfbWFwQ29udGFjdChDb250YWN0LnBhcnNlQW5kV3JpdGVBdmF0YXIobWlncmF0ZURhdGFUb0ZpbGVTeXN0ZW0pKSxcbn0pO1xuLy8gSU1QT1JUQU5UOiBXZVx1MjAxOXZlIHVwZGF0ZWQgb3VyIGRlZmluaXRpb24gb2YgYGluaXRpYWxpemVBdHRhY2htZW50TWV0YWRhdGFgLCBzb1xuLy8gd2UgbmVlZCB0byBydW4gaXQgYWdhaW4gb24gZXhpc3RpbmcgaXRlbXMgdGhhdCBoYXZlIHByZXZpb3VzbHkgYmVlbiBpbmNvcnJlY3RseVxuLy8gY2xhc3NpZmllZDpcbmNvbnN0IHRvVmVyc2lvbjcgPSBfd2l0aFNjaGVtYVZlcnNpb24oe1xuICBzY2hlbWFWZXJzaW9uOiA3LFxuICB1cGdyYWRlOiBpbml0aWFsaXplQXR0YWNobWVudE1ldGFkYXRhLFxufSk7XG5cbmNvbnN0IHRvVmVyc2lvbjggPSBfd2l0aFNjaGVtYVZlcnNpb24oe1xuICBzY2hlbWFWZXJzaW9uOiA4LFxuICB1cGdyYWRlOiBfbWFwQXR0YWNobWVudHMoY2FwdHVyZURpbWVuc2lvbnNBbmRTY3JlZW5zaG90KSxcbn0pO1xuXG5jb25zdCB0b1ZlcnNpb245ID0gX3dpdGhTY2hlbWFWZXJzaW9uKHtcbiAgc2NoZW1hVmVyc2lvbjogOSxcbiAgdXBncmFkZTogX21hcEF0dGFjaG1lbnRzKHJlcGxhY2VVbmljb2RlVjIpLFxufSk7XG5jb25zdCB0b1ZlcnNpb24xMCA9IF93aXRoU2NoZW1hVmVyc2lvbih7XG4gIHNjaGVtYVZlcnNpb246IDEwLFxuICB1cGdyYWRlOiBhc3luYyAobWVzc2FnZSwgY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHByb2Nlc3NQcmV2aWV3cyA9IF9tYXBQcmV2aWV3QXR0YWNobWVudHMobWlncmF0ZURhdGFUb0ZpbGVTeXN0ZW0pO1xuICAgIGNvbnN0IHByb2Nlc3NTdGlja2VyID0gYXN5bmMgKFxuICAgICAgc3RpY2tlck1lc3NhZ2U6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSxcbiAgICAgIHN0aWNrZXJDb250ZXh0OiBDb250ZXh0VHlwZVxuICAgICk6IFByb21pc2U8TWVzc2FnZUF0dHJpYnV0ZXNUeXBlPiA9PiB7XG4gICAgICBjb25zdCB7IHN0aWNrZXIgfSA9IHN0aWNrZXJNZXNzYWdlO1xuICAgICAgaWYgKCFzdGlja2VyIHx8ICFzdGlja2VyLmRhdGEgfHwgIXN0aWNrZXIuZGF0YS5kYXRhKSB7XG4gICAgICAgIHJldHVybiBzdGlja2VyTWVzc2FnZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RpY2tlck1lc3NhZ2UsXG4gICAgICAgIHN0aWNrZXI6IHtcbiAgICAgICAgICAuLi5zdGlja2VyLFxuICAgICAgICAgIGRhdGE6IGF3YWl0IG1pZ3JhdGVEYXRhVG9GaWxlU3lzdGVtKHN0aWNrZXIuZGF0YSwgc3RpY2tlckNvbnRleHQpLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgcHJldmlld1Byb2Nlc3NlZCA9IGF3YWl0IHByb2Nlc3NQcmV2aWV3cyhtZXNzYWdlLCBjb250ZXh0KTtcbiAgICBjb25zdCBzdGlja2VyUHJvY2Vzc2VkID0gYXdhaXQgcHJvY2Vzc1N0aWNrZXIocHJldmlld1Byb2Nlc3NlZCwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gc3RpY2tlclByb2Nlc3NlZDtcbiAgfSxcbn0pO1xuXG5jb25zdCBWRVJTSU9OUyA9IFtcbiAgdG9WZXJzaW9uMCxcbiAgdG9WZXJzaW9uMSxcbiAgdG9WZXJzaW9uMixcbiAgdG9WZXJzaW9uMyxcbiAgdG9WZXJzaW9uNCxcbiAgdG9WZXJzaW9uNSxcbiAgdG9WZXJzaW9uNixcbiAgdG9WZXJzaW9uNyxcbiAgdG9WZXJzaW9uOCxcbiAgdG9WZXJzaW9uOSxcbiAgdG9WZXJzaW9uMTAsXG5dO1xuZXhwb3J0IGNvbnN0IENVUlJFTlRfU0NIRU1BX1ZFUlNJT04gPSBWRVJTSU9OUy5sZW5ndGggLSAxO1xuXG4vLyBXZSBuZWVkIGRpbWVuc2lvbnMgYW5kIHNjcmVlbnNob3RzIGZvciBpbWFnZXMgZm9yIHByb3BlciBkaXNwbGF5XG5leHBvcnQgY29uc3QgVkVSU0lPTl9ORUVERURfRk9SX0RJU1BMQVkgPSA5O1xuXG4vLyBVcGdyYWRlU3RlcFxuZXhwb3J0IGNvbnN0IHVwZ3JhZGVTY2hlbWEgPSBhc3luYyAoXG4gIHJhd01lc3NhZ2U6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSxcbiAge1xuICAgIHdyaXRlTmV3QXR0YWNobWVudERhdGEsXG4gICAgZ2V0UmVnaW9uQ29kZSxcbiAgICBnZXRBYnNvbHV0ZUF0dGFjaG1lbnRQYXRoLFxuICAgIGdldEFic29sdXRlU3RpY2tlclBhdGgsXG4gICAgbWFrZU9iamVjdFVybCxcbiAgICByZXZva2VPYmplY3RVcmwsXG4gICAgZ2V0SW1hZ2VEaW1lbnNpb25zLFxuICAgIG1ha2VJbWFnZVRodW1ibmFpbCxcbiAgICBtYWtlVmlkZW9TY3JlZW5zaG90LFxuICAgIHdyaXRlTmV3U3RpY2tlckRhdGEsXG4gICAgbG9nZ2VyLFxuICAgIG1heFZlcnNpb24gPSBDVVJSRU5UX1NDSEVNQV9WRVJTSU9OLFxuICB9OiBDb250ZXh0VHlwZVxuKTogUHJvbWlzZTxNZXNzYWdlQXR0cmlidXRlc1R5cGU+ID0+IHtcbiAgaWYgKCFpc0Z1bmN0aW9uKHdyaXRlTmV3QXR0YWNobWVudERhdGEpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY29udGV4dC53cml0ZU5ld0F0dGFjaG1lbnREYXRhIGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgaWYgKCFpc0Z1bmN0aW9uKGdldFJlZ2lvbkNvZGUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY29udGV4dC5nZXRSZWdpb25Db2RlIGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgaWYgKCFpc0Z1bmN0aW9uKGdldEFic29sdXRlQXR0YWNobWVudFBhdGgpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY29udGV4dC5nZXRBYnNvbHV0ZUF0dGFjaG1lbnRQYXRoIGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgaWYgKCFpc0Z1bmN0aW9uKG1ha2VPYmplY3RVcmwpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY29udGV4dC5tYWtlT2JqZWN0VXJsIGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgaWYgKCFpc0Z1bmN0aW9uKHJldm9rZU9iamVjdFVybCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjb250ZXh0LnJldm9rZU9iamVjdFVybCBpcyByZXF1aXJlZCcpO1xuICB9XG4gIGlmICghaXNGdW5jdGlvbihnZXRJbWFnZURpbWVuc2lvbnMpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY29udGV4dC5nZXRJbWFnZURpbWVuc2lvbnMgaXMgcmVxdWlyZWQnKTtcbiAgfVxuICBpZiAoIWlzRnVuY3Rpb24obWFrZUltYWdlVGh1bWJuYWlsKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvbnRleHQubWFrZUltYWdlVGh1bWJuYWlsIGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgaWYgKCFpc0Z1bmN0aW9uKG1ha2VWaWRlb1NjcmVlbnNob3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY29udGV4dC5tYWtlVmlkZW9TY3JlZW5zaG90IGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgaWYgKCFpc09iamVjdChsb2dnZXIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY29udGV4dC5sb2dnZXIgaXMgcmVxdWlyZWQnKTtcbiAgfVxuICBpZiAoIWlzRnVuY3Rpb24oZ2V0QWJzb2x1dGVTdGlja2VyUGF0aCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjb250ZXh0LmdldEFic29sdXRlU3RpY2tlclBhdGggaXMgcmVxdWlyZWQnKTtcbiAgfVxuICBpZiAoIWlzRnVuY3Rpb24od3JpdGVOZXdTdGlja2VyRGF0YSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjb250ZXh0LndyaXRlTmV3U3RpY2tlckRhdGEgaXMgcmVxdWlyZWQnKTtcbiAgfVxuXG4gIGxldCBtZXNzYWdlID0gcmF3TWVzc2FnZTtcbiAgZm9yIChsZXQgaW5kZXggPSAwLCBtYXggPSBWRVJTSU9OUy5sZW5ndGg7IGluZGV4IDwgbWF4OyBpbmRleCArPSAxKSB7XG4gICAgaWYgKG1heFZlcnNpb24gPCBpbmRleCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudFZlcnNpb24gPSBWRVJTSU9OU1tpbmRleF07XG4gICAgLy8gV2UgcmVhbGx5IGRvIHdhbnQgdGhpcyBpbnRyYS1sb29wIGF3YWl0IGJlY2F1c2UgdGhpcyBpcyBhIGNoYWluZWQgYXN5bmMgYWN0aW9uLFxuICAgIC8vICAgZWFjaCBzdGVwIGRlcGVuZGVudCBvbiB0aGUgcHJldmlvdXNcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgIG1lc3NhZ2UgPSBhd2FpdCBjdXJyZW50VmVyc2lvbihtZXNzYWdlLCB7XG4gICAgICB3cml0ZU5ld0F0dGFjaG1lbnREYXRhLFxuICAgICAgZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aCxcbiAgICAgIG1ha2VPYmplY3RVcmwsXG4gICAgICByZXZva2VPYmplY3RVcmwsXG4gICAgICBnZXRJbWFnZURpbWVuc2lvbnMsXG4gICAgICBtYWtlSW1hZ2VUaHVtYm5haWwsXG4gICAgICBtYWtlVmlkZW9TY3JlZW5zaG90LFxuICAgICAgbG9nZ2VyLFxuICAgICAgZ2V0QWJzb2x1dGVTdGlja2VyUGF0aCxcbiAgICAgIGdldFJlZ2lvbkNvZGUsXG4gICAgICB3cml0ZU5ld1N0aWNrZXJEYXRhLFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIG1lc3NhZ2U7XG59O1xuXG4vLyBSdW5zIG9uIGF0dGFjaG1lbnRzIG91dHNpZGUgb2YgdGhlIHNjaGVtYSB1cGdyYWRlIHByb2Nlc3MsIHNpbmNlIGF0dGFjaG1lbnRzIGFyZVxuLy8gICBkb3dubG9hZGVkIG91dCBvZiBiYW5kLlxuZXhwb3J0IGNvbnN0IHByb2Nlc3NOZXdBdHRhY2htZW50ID0gYXN5bmMgKFxuICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZSxcbiAge1xuICAgIHdyaXRlTmV3QXR0YWNobWVudERhdGEsXG4gICAgZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aCxcbiAgICBtYWtlT2JqZWN0VXJsLFxuICAgIHJldm9rZU9iamVjdFVybCxcbiAgICBnZXRJbWFnZURpbWVuc2lvbnMsXG4gICAgbWFrZUltYWdlVGh1bWJuYWlsLFxuICAgIG1ha2VWaWRlb1NjcmVlbnNob3QsXG4gICAgbG9nZ2VyLFxuICB9OiBQaWNrPFxuICAgIENvbnRleHRUeXBlLFxuICAgIHwgJ3dyaXRlTmV3QXR0YWNobWVudERhdGEnXG4gICAgfCAnZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aCdcbiAgICB8ICdtYWtlT2JqZWN0VXJsJ1xuICAgIHwgJ3Jldm9rZU9iamVjdFVybCdcbiAgICB8ICdnZXRJbWFnZURpbWVuc2lvbnMnXG4gICAgfCAnbWFrZUltYWdlVGh1bWJuYWlsJ1xuICAgIHwgJ21ha2VWaWRlb1NjcmVlbnNob3QnXG4gICAgfCAnbG9nZ2VyJ1xuICA+XG4pOiBQcm9taXNlPEF0dGFjaG1lbnRUeXBlPiA9PiB7XG4gIGlmICghaXNGdW5jdGlvbih3cml0ZU5ld0F0dGFjaG1lbnREYXRhKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvbnRleHQud3JpdGVOZXdBdHRhY2htZW50RGF0YSBpcyByZXF1aXJlZCcpO1xuICB9XG4gIGlmICghaXNGdW5jdGlvbihnZXRBYnNvbHV0ZUF0dGFjaG1lbnRQYXRoKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvbnRleHQuZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aCBpcyByZXF1aXJlZCcpO1xuICB9XG4gIGlmICghaXNGdW5jdGlvbihtYWtlT2JqZWN0VXJsKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvbnRleHQubWFrZU9iamVjdFVybCBpcyByZXF1aXJlZCcpO1xuICB9XG4gIGlmICghaXNGdW5jdGlvbihyZXZva2VPYmplY3RVcmwpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY29udGV4dC5yZXZva2VPYmplY3RVcmwgaXMgcmVxdWlyZWQnKTtcbiAgfVxuICBpZiAoIWlzRnVuY3Rpb24oZ2V0SW1hZ2VEaW1lbnNpb25zKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvbnRleHQuZ2V0SW1hZ2VEaW1lbnNpb25zIGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgaWYgKCFpc0Z1bmN0aW9uKG1ha2VJbWFnZVRodW1ibmFpbCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjb250ZXh0Lm1ha2VJbWFnZVRodW1ibmFpbCBpcyByZXF1aXJlZCcpO1xuICB9XG4gIGlmICghaXNGdW5jdGlvbihtYWtlVmlkZW9TY3JlZW5zaG90KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvbnRleHQubWFrZVZpZGVvU2NyZWVuc2hvdCBpcyByZXF1aXJlZCcpO1xuICB9XG4gIGlmICghaXNPYmplY3QobG9nZ2VyKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvbnRleHQubG9nZ2VyIGlzIHJlcXVpcmVkJyk7XG4gIH1cblxuICBjb25zdCByb3RhdGVkQXR0YWNobWVudCA9IGF3YWl0IGF1dG9PcmllbnRKUEVHKGF0dGFjaG1lbnQsIHVuZGVmaW5lZCwge1xuICAgIGlzSW5jb21pbmc6IHRydWUsXG4gIH0pO1xuICBjb25zdCBvbkRpc2tBdHRhY2htZW50ID0gYXdhaXQgbWlncmF0ZURhdGFUb0ZpbGVTeXN0ZW0ocm90YXRlZEF0dGFjaG1lbnQsIHtcbiAgICB3cml0ZU5ld0F0dGFjaG1lbnREYXRhLFxuICB9KTtcbiAgY29uc3QgZmluYWxBdHRhY2htZW50ID0gYXdhaXQgY2FwdHVyZURpbWVuc2lvbnNBbmRTY3JlZW5zaG90KFxuICAgIG9uRGlza0F0dGFjaG1lbnQsXG4gICAge1xuICAgICAgd3JpdGVOZXdBdHRhY2htZW50RGF0YSxcbiAgICAgIGdldEFic29sdXRlQXR0YWNobWVudFBhdGgsXG4gICAgICBtYWtlT2JqZWN0VXJsLFxuICAgICAgcmV2b2tlT2JqZWN0VXJsLFxuICAgICAgZ2V0SW1hZ2VEaW1lbnNpb25zLFxuICAgICAgbWFrZUltYWdlVGh1bWJuYWlsLFxuICAgICAgbWFrZVZpZGVvU2NyZWVuc2hvdCxcbiAgICAgIGxvZ2dlcixcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIGZpbmFsQXR0YWNobWVudDtcbn07XG5cbmV4cG9ydCBjb25zdCBwcm9jZXNzTmV3U3RpY2tlciA9IGFzeW5jIChcbiAgc3RpY2tlckRhdGE6IFVpbnQ4QXJyYXksXG4gIHtcbiAgICB3cml0ZU5ld1N0aWNrZXJEYXRhLFxuICAgIGdldEFic29sdXRlU3RpY2tlclBhdGgsXG4gICAgZ2V0SW1hZ2VEaW1lbnNpb25zLFxuICAgIGxvZ2dlcixcbiAgfTogUGljazxcbiAgICBDb250ZXh0VHlwZSxcbiAgICB8ICd3cml0ZU5ld1N0aWNrZXJEYXRhJ1xuICAgIHwgJ2dldEFic29sdXRlU3RpY2tlclBhdGgnXG4gICAgfCAnZ2V0SW1hZ2VEaW1lbnNpb25zJ1xuICAgIHwgJ2xvZ2dlcidcbiAgPlxuKTogUHJvbWlzZTx7IHBhdGg6IHN0cmluZzsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXIgfT4gPT4ge1xuICBpZiAoIWlzRnVuY3Rpb24od3JpdGVOZXdTdGlja2VyRGF0YSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjb250ZXh0LndyaXRlTmV3U3RpY2tlckRhdGEgaXMgcmVxdWlyZWQnKTtcbiAgfVxuICBpZiAoIWlzRnVuY3Rpb24oZ2V0QWJzb2x1dGVTdGlja2VyUGF0aCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjb250ZXh0LmdldEFic29sdXRlU3RpY2tlclBhdGggaXMgcmVxdWlyZWQnKTtcbiAgfVxuICBpZiAoIWlzRnVuY3Rpb24oZ2V0SW1hZ2VEaW1lbnNpb25zKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvbnRleHQuZ2V0SW1hZ2VEaW1lbnNpb25zIGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgaWYgKCFpc09iamVjdChsb2dnZXIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY29udGV4dC5sb2dnZXIgaXMgcmVxdWlyZWQnKTtcbiAgfVxuXG4gIGNvbnN0IHBhdGggPSBhd2FpdCB3cml0ZU5ld1N0aWNrZXJEYXRhKHN0aWNrZXJEYXRhKTtcbiAgY29uc3QgYWJzb2x1dGVQYXRoID0gYXdhaXQgZ2V0QWJzb2x1dGVTdGlja2VyUGF0aChwYXRoKTtcblxuICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGF3YWl0IGdldEltYWdlRGltZW5zaW9ucyh7XG4gICAgb2JqZWN0VXJsOiBhYnNvbHV0ZVBhdGgsXG4gICAgbG9nZ2VyLFxuICB9KTtcblxuICByZXR1cm4ge1xuICAgIHBhdGgsXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICB9O1xufTtcblxudHlwZSBMb2FkQXR0YWNobWVudFR5cGUgPSAoXG4gIGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlXG4pID0+IFByb21pc2U8QXR0YWNobWVudFdpdGhIeWRyYXRlZERhdGE+O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQXR0YWNobWVudExvYWRlciA9IChcbiAgbG9hZEF0dGFjaG1lbnREYXRhOiBMb2FkQXR0YWNobWVudFR5cGVcbik6ICgobWVzc2FnZTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlKSA9PiBQcm9taXNlPE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZT4pID0+IHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxvYWRBdHRhY2htZW50RGF0YSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ2NyZWF0ZUF0dGFjaG1lbnRMb2FkZXI6IGxvYWRBdHRhY2htZW50RGF0YSBpcyByZXF1aXJlZCdcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGFzeW5jIChcbiAgICBtZXNzYWdlOiBNZXNzYWdlQXR0cmlidXRlc1R5cGVcbiAgKTogUHJvbWlzZTxNZXNzYWdlQXR0cmlidXRlc1R5cGU+ID0+ICh7XG4gICAgLi4ubWVzc2FnZSxcbiAgICBhdHRhY2htZW50czogYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAobWVzc2FnZS5hdHRhY2htZW50cyB8fCBbXSkubWFwKGxvYWRBdHRhY2htZW50RGF0YSlcbiAgICApLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBsb2FkUXVvdGVEYXRhID0gKFxuICBsb2FkQXR0YWNobWVudERhdGE6IExvYWRBdHRhY2htZW50VHlwZVxuKTogKChcbiAgcXVvdGU6IFF1b3RlZE1lc3NhZ2VUeXBlIHwgdW5kZWZpbmVkIHwgbnVsbFxuKSA9PiBQcm9taXNlPFF1b3RlZE1lc3NhZ2VUeXBlIHwgbnVsbD4pID0+IHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxvYWRBdHRhY2htZW50RGF0YSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdsb2FkUXVvdGVEYXRhOiBsb2FkQXR0YWNobWVudERhdGEgaXMgcmVxdWlyZWQnKTtcbiAgfVxuXG4gIHJldHVybiBhc3luYyAoXG4gICAgcXVvdGU6IFF1b3RlZE1lc3NhZ2VUeXBlIHwgdW5kZWZpbmVkIHwgbnVsbFxuICApOiBQcm9taXNlPFF1b3RlZE1lc3NhZ2VUeXBlIHwgbnVsbD4gPT4ge1xuICAgIGlmICghcXVvdGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5xdW90ZSxcbiAgICAgIGF0dGFjaG1lbnRzOiBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgKHF1b3RlLmF0dGFjaG1lbnRzIHx8IFtdKS5tYXAoYXN5bmMgYXR0YWNobWVudCA9PiB7XG4gICAgICAgICAgY29uc3QgeyB0aHVtYm5haWwgfSA9IGF0dGFjaG1lbnQ7XG5cbiAgICAgICAgICBpZiAoIXRodW1ibmFpbCB8fCAhdGh1bWJuYWlsLnBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBhdHRhY2htZW50O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5hdHRhY2htZW50LFxuICAgICAgICAgICAgdGh1bWJuYWlsOiBhd2FpdCBsb2FkQXR0YWNobWVudERhdGEodGh1bWJuYWlsKSxcbiAgICAgICAgICB9O1xuICAgICAgICB9KVxuICAgICAgKSxcbiAgICB9O1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGxvYWRDb250YWN0RGF0YSA9IChcbiAgbG9hZEF0dGFjaG1lbnREYXRhOiBMb2FkQXR0YWNobWVudFR5cGVcbik6ICgoXG4gIGNvbnRhY3Q6IEFycmF5PEVtYmVkZGVkQ29udGFjdFR5cGU+IHwgdW5kZWZpbmVkXG4pID0+IFByb21pc2U8QXJyYXk8RW1iZWRkZWRDb250YWN0VHlwZT4gfCB1bmRlZmluZWQ+KSA9PiB7XG4gIGlmICghaXNGdW5jdGlvbihsb2FkQXR0YWNobWVudERhdGEpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbG9hZENvbnRhY3REYXRhOiBsb2FkQXR0YWNobWVudERhdGEgaXMgcmVxdWlyZWQnKTtcbiAgfVxuXG4gIHJldHVybiBhc3luYyAoXG4gICAgY29udGFjdDogQXJyYXk8RW1iZWRkZWRDb250YWN0VHlwZT4gfCB1bmRlZmluZWRcbiAgKTogUHJvbWlzZTxBcnJheTxFbWJlZGRlZENvbnRhY3RUeXBlPiB8IHVuZGVmaW5lZD4gPT4ge1xuICAgIGlmICghY29udGFjdCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICBjb250YWN0Lm1hcChcbiAgICAgICAgYXN5bmMgKGl0ZW06IEVtYmVkZGVkQ29udGFjdFR5cGUpOiBQcm9taXNlPEVtYmVkZGVkQ29udGFjdFR5cGU+ID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhaXRlbSB8fFxuICAgICAgICAgICAgIWl0ZW0uYXZhdGFyIHx8XG4gICAgICAgICAgICAhaXRlbS5hdmF0YXIuYXZhdGFyIHx8XG4gICAgICAgICAgICAhaXRlbS5hdmF0YXIuYXZhdGFyLnBhdGhcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5pdGVtLFxuICAgICAgICAgICAgYXZhdGFyOiB7XG4gICAgICAgICAgICAgIC4uLml0ZW0uYXZhdGFyLFxuICAgICAgICAgICAgICBhdmF0YXI6IHtcbiAgICAgICAgICAgICAgICAuLi5pdGVtLmF2YXRhci5hdmF0YXIsXG4gICAgICAgICAgICAgICAgLi4uKGF3YWl0IGxvYWRBdHRhY2htZW50RGF0YShpdGVtLmF2YXRhci5hdmF0YXIpKSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgbG9hZFByZXZpZXdEYXRhID0gKFxuICBsb2FkQXR0YWNobWVudERhdGE6IExvYWRBdHRhY2htZW50VHlwZVxuKTogKChcbiAgcHJldmlldzogQXJyYXk8TGlua1ByZXZpZXdUeXBlPiB8IHVuZGVmaW5lZFxuKSA9PiBQcm9taXNlPEFycmF5PExpbmtQcmV2aWV3VHlwZT4+KSA9PiB7XG4gIGlmICghaXNGdW5jdGlvbihsb2FkQXR0YWNobWVudERhdGEpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbG9hZFByZXZpZXdEYXRhOiBsb2FkQXR0YWNobWVudERhdGEgaXMgcmVxdWlyZWQnKTtcbiAgfVxuXG4gIHJldHVybiBhc3luYyAocHJldmlldzogQXJyYXk8TGlua1ByZXZpZXdUeXBlPiB8IHVuZGVmaW5lZCkgPT4ge1xuICAgIGlmICghcHJldmlldyB8fCAhcHJldmlldy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICBwcmV2aWV3Lm1hcChhc3luYyBpdGVtID0+IHtcbiAgICAgICAgaWYgKCFpdGVtLmltYWdlKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgaW1hZ2U6IGF3YWl0IGxvYWRBdHRhY2htZW50RGF0YShpdGVtLmltYWdlKSxcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBsb2FkU3RpY2tlckRhdGEgPSAoXG4gIGxvYWRBdHRhY2htZW50RGF0YTogTG9hZEF0dGFjaG1lbnRUeXBlXG4pOiAoKFxuICBzdGlja2VyOiBTdGlja2VyVHlwZSB8IHVuZGVmaW5lZFxuKSA9PiBQcm9taXNlPFN0aWNrZXJXaXRoSHlkcmF0ZWREYXRhIHwgdW5kZWZpbmVkPikgPT4ge1xuICBpZiAoIWlzRnVuY3Rpb24obG9hZEF0dGFjaG1lbnREYXRhKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2xvYWRTdGlja2VyRGF0YTogbG9hZEF0dGFjaG1lbnREYXRhIGlzIHJlcXVpcmVkJyk7XG4gIH1cblxuICByZXR1cm4gYXN5bmMgKHN0aWNrZXI6IFN0aWNrZXJUeXBlIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgaWYgKCFzdGlja2VyIHx8ICFzdGlja2VyLmRhdGEpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0aWNrZXIsXG4gICAgICBkYXRhOiBhd2FpdCBsb2FkQXR0YWNobWVudERhdGEoc3RpY2tlci5kYXRhKSxcbiAgICB9O1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZUFsbEV4dGVybmFsRmlsZXMgPSAoe1xuICBkZWxldGVBdHRhY2htZW50RGF0YSxcbiAgZGVsZXRlT25EaXNrLFxufToge1xuICBkZWxldGVBdHRhY2htZW50RGF0YTogKGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBkZWxldGVPbkRpc2s6IChwYXRoOiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD47XG59KTogKChtZXNzYWdlOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUpID0+IFByb21pc2U8dm9pZD4pID0+IHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGRlbGV0ZUF0dGFjaG1lbnREYXRhKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnZGVsZXRlQWxsRXh0ZXJuYWxGaWxlczogZGVsZXRlQXR0YWNobWVudERhdGEgbXVzdCBiZSBhIGZ1bmN0aW9uJ1xuICAgICk7XG4gIH1cblxuICBpZiAoIWlzRnVuY3Rpb24oZGVsZXRlT25EaXNrKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnZGVsZXRlQWxsRXh0ZXJuYWxGaWxlczogZGVsZXRlT25EaXNrIG11c3QgYmUgYSBmdW5jdGlvbidcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGFzeW5jIChtZXNzYWdlOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUpID0+IHtcbiAgICBjb25zdCB7IGF0dGFjaG1lbnRzLCBxdW90ZSwgY29udGFjdCwgcHJldmlldywgc3RpY2tlciB9ID0gbWVzc2FnZTtcblxuICAgIGlmIChhdHRhY2htZW50cyAmJiBhdHRhY2htZW50cy5sZW5ndGgpIHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGF0dGFjaG1lbnRzLm1hcChkZWxldGVBdHRhY2htZW50RGF0YSkpO1xuICAgIH1cblxuICAgIGlmIChxdW90ZSAmJiBxdW90ZS5hdHRhY2htZW50cyAmJiBxdW90ZS5hdHRhY2htZW50cy5sZW5ndGgpIHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBxdW90ZS5hdHRhY2htZW50cy5tYXAoYXN5bmMgYXR0YWNobWVudCA9PiB7XG4gICAgICAgICAgY29uc3QgeyB0aHVtYm5haWwgfSA9IGF0dGFjaG1lbnQ7XG5cbiAgICAgICAgICAvLyBUbyBwcmV2ZW50IHNwb29maW5nLCB3ZSBjb3B5IHRoZSBvcmlnaW5hbCBpbWFnZSBmcm9tIHRoZSBxdW90ZWQgbWVzc2FnZS5cbiAgICAgICAgICAvLyAgIElmIHNvLCBpdCB3aWxsIGhhdmUgYSAnY29waWVkJyBmaWVsZC4gV2UgZG9uJ3Qgd2FudCB0byBkZWxldGUgaXQgaWYgaXQgaGFzXG4gICAgICAgICAgLy8gICB0aGF0IGZpZWxkIHNldCB0byB0cnVlLlxuICAgICAgICAgIGlmICh0aHVtYm5haWwgJiYgdGh1bWJuYWlsLnBhdGggJiYgIXRodW1ibmFpbC5jb3BpZWQpIHtcbiAgICAgICAgICAgIGF3YWl0IGRlbGV0ZU9uRGlzayh0aHVtYm5haWwucGF0aCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoY29udGFjdCAmJiBjb250YWN0Lmxlbmd0aCkge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGNvbnRhY3QubWFwKGFzeW5jIGl0ZW0gPT4ge1xuICAgICAgICAgIGNvbnN0IHsgYXZhdGFyIH0gPSBpdGVtO1xuXG4gICAgICAgICAgaWYgKGF2YXRhciAmJiBhdmF0YXIuYXZhdGFyICYmIGF2YXRhci5hdmF0YXIucGF0aCkge1xuICAgICAgICAgICAgYXdhaXQgZGVsZXRlT25EaXNrKGF2YXRhci5hdmF0YXIucGF0aCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAocHJldmlldyAmJiBwcmV2aWV3Lmxlbmd0aCkge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIHByZXZpZXcubWFwKGFzeW5jIGl0ZW0gPT4ge1xuICAgICAgICAgIGNvbnN0IHsgaW1hZ2UgfSA9IGl0ZW07XG5cbiAgICAgICAgICBpZiAoaW1hZ2UgJiYgaW1hZ2UucGF0aCkge1xuICAgICAgICAgICAgYXdhaXQgZGVsZXRlT25EaXNrKGltYWdlLnBhdGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHN0aWNrZXIgJiYgc3RpY2tlci5kYXRhICYmIHN0aWNrZXIuZGF0YS5wYXRoKSB7XG4gICAgICBhd2FpdCBkZWxldGVPbkRpc2soc3RpY2tlci5kYXRhLnBhdGgpO1xuXG4gICAgICBpZiAoc3RpY2tlci5kYXRhLnRodW1ibmFpbCAmJiBzdGlja2VyLmRhdGEudGh1bWJuYWlsLnBhdGgpIHtcbiAgICAgICAgYXdhaXQgZGVsZXRlT25EaXNrKHN0aWNrZXIuZGF0YS50aHVtYm5haWwucGF0aCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcblxuLy8gICAgICBjcmVhdGVBdHRhY2htZW50RGF0YVdyaXRlciA6OiAoUmVsYXRpdmVQYXRoIC0+IElPIFVuaXQpXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1lc3NhZ2UgLT5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSU8gKFByb21pc2UgTWVzc2FnZSlcbmV4cG9ydCBjb25zdCBjcmVhdGVBdHRhY2htZW50RGF0YVdyaXRlciA9ICh7XG4gIHdyaXRlRXhpc3RpbmdBdHRhY2htZW50RGF0YSxcbiAgbG9nZ2VyLFxufToge1xuICB3cml0ZUV4aXN0aW5nQXR0YWNobWVudERhdGE6IFdyaXRlRXhpc3RpbmdBdHRhY2htZW50RGF0YVR5cGU7XG4gIGxvZ2dlcjogTG9nZ2VyVHlwZTtcbn0pOiAoKG1lc3NhZ2U6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSkgPT4gUHJvbWlzZTxNZXNzYWdlQXR0cmlidXRlc1R5cGU+KSA9PiB7XG4gIGlmICghaXNGdW5jdGlvbih3cml0ZUV4aXN0aW5nQXR0YWNobWVudERhdGEpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdjcmVhdGVBdHRhY2htZW50RGF0YVdyaXRlcjogd3JpdGVFeGlzdGluZ0F0dGFjaG1lbnREYXRhIG11c3QgYmUgYSBmdW5jdGlvbidcbiAgICApO1xuICB9XG4gIGlmICghaXNPYmplY3QobG9nZ2VyKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NyZWF0ZUF0dGFjaG1lbnREYXRhV3JpdGVyOiBsb2dnZXIgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIHJldHVybiBhc3luYyAoXG4gICAgcmF3TWVzc2FnZTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlXG4gICk6IFByb21pc2U8TWVzc2FnZUF0dHJpYnV0ZXNUeXBlPiA9PiB7XG4gICAgaWYgKCFpc1ZhbGlkKHJhd01lc3NhZ2UpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ3Jhd01lc3NhZ2UnIGlzIG5vdCB2YWxpZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlID0gaW5pdGlhbGl6ZVNjaGVtYVZlcnNpb24oe1xuICAgICAgbWVzc2FnZTogcmF3TWVzc2FnZSxcbiAgICAgIGxvZ2dlcixcbiAgICB9KTtcblxuICAgIGNvbnN0IHsgYXR0YWNobWVudHMsIHF1b3RlLCBjb250YWN0LCBwcmV2aWV3IH0gPSBtZXNzYWdlO1xuICAgIGNvbnN0IGhhc0ZpbGVzVG9Xcml0ZSA9XG4gICAgICAocXVvdGUgJiYgcXVvdGUuYXR0YWNobWVudHMgJiYgcXVvdGUuYXR0YWNobWVudHMubGVuZ3RoID4gMCkgfHxcbiAgICAgIChhdHRhY2htZW50cyAmJiBhdHRhY2htZW50cy5sZW5ndGggPiAwKSB8fFxuICAgICAgKGNvbnRhY3QgJiYgY29udGFjdC5sZW5ndGggPiAwKSB8fFxuICAgICAgKHByZXZpZXcgJiYgcHJldmlldy5sZW5ndGggPiAwKTtcblxuICAgIGlmICghaGFzRmlsZXNUb1dyaXRlKSB7XG4gICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9XG5cbiAgICBjb25zdCBsYXN0VmVyc2lvbldpdGhBdHRhY2htZW50RGF0YUluTWVtb3J5ID0gMjtcbiAgICBjb25zdCB3aWxsQXR0YWNobWVudHNHb1RvRmlsZVN5c3RlbU9uVXBncmFkZSA9XG4gICAgICAobWVzc2FnZS5zY2hlbWFWZXJzaW9uIHx8IDApIDw9IGxhc3RWZXJzaW9uV2l0aEF0dGFjaG1lbnREYXRhSW5NZW1vcnk7XG4gICAgaWYgKHdpbGxBdHRhY2htZW50c0dvVG9GaWxlU3lzdGVtT25VcGdyYWRlKSB7XG4gICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9XG5cbiAgICAoYXR0YWNobWVudHMgfHwgW10pLmZvckVhY2goYXR0YWNobWVudCA9PiB7XG4gICAgICBpZiAoIWhhc0RhdGEoYXR0YWNobWVudCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIidhdHRhY2htZW50LmRhdGEnIGlzIHJlcXVpcmVkIGR1cmluZyBtZXNzYWdlIGltcG9ydFwiXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNTdHJpbmcoYXR0YWNobWVudC5wYXRoKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiJ2F0dGFjaG1lbnQucGF0aCcgaXMgcmVxdWlyZWQgZHVyaW5nIG1lc3NhZ2UgaW1wb3J0XCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHdyaXRlUXVvdGVBdHRhY2htZW50ID0gYXN5bmMgKGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlKSA9PiB7XG4gICAgICBjb25zdCB7IHRodW1ibmFpbCB9ID0gYXR0YWNobWVudDtcbiAgICAgIGlmICghdGh1bWJuYWlsKSB7XG4gICAgICAgIHJldHVybiBhdHRhY2htZW50O1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IGRhdGEsIHBhdGggfSA9IHRodW1ibmFpbDtcblxuICAgICAgLy8gd2Ugd2FudCB0byBiZSBidWxsZXRwcm9vZiB0byBhdHRhY2htZW50cyB3aXRob3V0IGRhdGFcbiAgICAgIGlmICghZGF0YSB8fCAhcGF0aCkge1xuICAgICAgICBsb2dnZXIud2FybihcbiAgICAgICAgICAncXVvdGUgYXR0YWNobWVudCBoYWQgbmVpdGhlciBkYXRhIG5vciBwYXRoLicsXG4gICAgICAgICAgJ2lkOicsXG4gICAgICAgICAgbWVzc2FnZS5pZCxcbiAgICAgICAgICAnc291cmNlOicsXG4gICAgICAgICAgbWVzc2FnZS5zb3VyY2VcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGF0dGFjaG1lbnQ7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHdyaXRlRXhpc3RpbmdBdHRhY2htZW50RGF0YSh0aHVtYm5haWwpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYXR0YWNobWVudCxcbiAgICAgICAgdGh1bWJuYWlsOiBvbWl0KHRodW1ibmFpbCwgWydkYXRhJ10pLFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3Qgd3JpdGVDb250YWN0QXZhdGFyID0gYXN5bmMgKFxuICAgICAgbWVzc2FnZUNvbnRhY3Q6IEVtYmVkZGVkQ29udGFjdFR5cGVcbiAgICApOiBQcm9taXNlPEVtYmVkZGVkQ29udGFjdFR5cGU+ID0+IHtcbiAgICAgIGNvbnN0IHsgYXZhdGFyIH0gPSBtZXNzYWdlQ29udGFjdDtcbiAgICAgIGlmICghYXZhdGFyKSB7XG4gICAgICAgIHJldHVybiBtZXNzYWdlQ29udGFjdDtcbiAgICAgIH1cblxuICAgICAgaWYgKGF2YXRhciAmJiAhYXZhdGFyLmF2YXRhcikge1xuICAgICAgICByZXR1cm4gb21pdChtZXNzYWdlQ29udGFjdCwgWydhdmF0YXInXSk7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHdyaXRlRXhpc3RpbmdBdHRhY2htZW50RGF0YShhdmF0YXIuYXZhdGFyKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ubWVzc2FnZUNvbnRhY3QsXG4gICAgICAgIGF2YXRhcjogeyAuLi5hdmF0YXIsIGF2YXRhcjogb21pdChhdmF0YXIuYXZhdGFyLCBbJ2RhdGEnXSkgfSxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IHdyaXRlUHJldmlld0ltYWdlID0gYXN5bmMgKFxuICAgICAgaXRlbTogTGlua1ByZXZpZXdUeXBlXG4gICAgKTogUHJvbWlzZTxMaW5rUHJldmlld1R5cGU+ID0+IHtcbiAgICAgIGNvbnN0IHsgaW1hZ2UgfSA9IGl0ZW07XG4gICAgICBpZiAoIWltYWdlKSB7XG4gICAgICAgIHJldHVybiBvbWl0KGl0ZW0sIFsnaW1hZ2UnXSk7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHdyaXRlRXhpc3RpbmdBdHRhY2htZW50RGF0YShpbWFnZSk7XG5cbiAgICAgIHJldHVybiB7IC4uLml0ZW0sIGltYWdlOiBvbWl0KGltYWdlLCBbJ2RhdGEnXSkgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgbWVzc2FnZVdpdGhvdXRBdHRhY2htZW50RGF0YSA9IHtcbiAgICAgIC4uLm1lc3NhZ2UsXG4gICAgICAuLi4ocXVvdGVcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBxdW90ZToge1xuICAgICAgICAgICAgICAuLi5xdW90ZSxcbiAgICAgICAgICAgICAgYXR0YWNobWVudHM6IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAgICAgICAgIChxdW90ZT8uYXR0YWNobWVudHMgfHwgW10pLm1hcCh3cml0ZVF1b3RlQXR0YWNobWVudClcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZCksXG4gICAgICBjb250YWN0OiBhd2FpdCBQcm9taXNlLmFsbCgoY29udGFjdCB8fCBbXSkubWFwKHdyaXRlQ29udGFjdEF2YXRhcikpLFxuICAgICAgcHJldmlldzogYXdhaXQgUHJvbWlzZS5hbGwoKHByZXZpZXcgfHwgW10pLm1hcCh3cml0ZVByZXZpZXdJbWFnZSkpLFxuICAgICAgYXR0YWNobWVudHM6IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAoYXR0YWNobWVudHMgfHwgW10pLm1hcChhc3luYyBhdHRhY2htZW50ID0+IHtcbiAgICAgICAgICBhd2FpdCB3cml0ZUV4aXN0aW5nQXR0YWNobWVudERhdGEoYXR0YWNobWVudCk7XG5cbiAgICAgICAgICBpZiAoYXR0YWNobWVudC5zY3JlZW5zaG90ICYmIGF0dGFjaG1lbnQuc2NyZWVuc2hvdC5kYXRhKSB7XG4gICAgICAgICAgICBhd2FpdCB3cml0ZUV4aXN0aW5nQXR0YWNobWVudERhdGEoYXR0YWNobWVudC5zY3JlZW5zaG90KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGF0dGFjaG1lbnQudGh1bWJuYWlsICYmIGF0dGFjaG1lbnQudGh1bWJuYWlsLmRhdGEpIHtcbiAgICAgICAgICAgIGF3YWl0IHdyaXRlRXhpc3RpbmdBdHRhY2htZW50RGF0YShhdHRhY2htZW50LnRodW1ibmFpbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLm9taXQoYXR0YWNobWVudCwgWydkYXRhJ10pLFxuICAgICAgICAgICAgLi4uKGF0dGFjaG1lbnQudGh1bWJuYWlsXG4gICAgICAgICAgICAgID8geyB0aHVtYm5haWw6IG9taXQoYXR0YWNobWVudC50aHVtYm5haWwsIFsnZGF0YSddKSB9XG4gICAgICAgICAgICAgIDogbnVsbCksXG4gICAgICAgICAgICAuLi4oYXR0YWNobWVudC5zY3JlZW5zaG90XG4gICAgICAgICAgICAgID8geyBzY3JlZW5zaG90OiBvbWl0KGF0dGFjaG1lbnQuc2NyZWVuc2hvdCwgWydkYXRhJ10pIH1cbiAgICAgICAgICAgICAgOiBudWxsKSxcbiAgICAgICAgICB9O1xuICAgICAgICB9KVxuICAgICAgKSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIG1lc3NhZ2VXaXRob3V0QXR0YWNobWVudERhdGE7XG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUFxRDtBQUVyRCxjQUF5QjtBQUV6Qix3QkFRTztBQUNQLGFBQXdCO0FBQ3hCLG9CQUErQjtBQUMvQiwwQ0FBNkM7QUFhN0MscUJBQThCO0FBRXZCLE1BQU0sUUFBUTtBQUNkLE1BQU0s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
