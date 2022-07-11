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
var AttachmentDownloads_exports = {};
__export(AttachmentDownloads_exports, {
  addJob: () => addJob,
  start: () => start,
  stop: () => stop
});
module.exports = __toCommonJS(AttachmentDownloads_exports);
var import_lodash = require("lodash");
var import_uuid = require("uuid");
var import_Client = __toESM(require("../sql/Client"));
var durations = __toESM(require("../util/durations"));
var import_clearTimeoutIfNecessary = require("../util/clearTimeoutIfNecessary");
var import_assert = require("../util/assert");
var import_downloadAttachment = require("../util/downloadAttachment");
var Bytes = __toESM(require("../Bytes"));
var Errors = __toESM(require("../types/errors"));
var log = __toESM(require("../logging/log"));
const {
  getMessageById,
  getAttachmentDownloadJobById,
  getNextAttachmentDownloadJobs,
  removeAttachmentDownloadJob,
  resetAttachmentDownloadPending,
  saveAttachmentDownloadJob,
  saveMessage,
  setAttachmentDownloadJobPending
} = import_Client.default;
const MAX_ATTACHMENT_JOB_PARALLELISM = 3;
const TICK_INTERVAL = durations.MINUTE;
const RETRY_BACKOFF = {
  1: 30 * durations.SECOND,
  2: 30 * durations.MINUTE,
  3: 6 * durations.HOUR
};
let enabled = false;
let timeout;
let logger;
const _activeAttachmentDownloadJobs = {};
async function start(options) {
  ({ logger } = options);
  if (!logger) {
    throw new Error("attachment_downloads/start: logger must be provided!");
  }
  logger.info("attachment_downloads/start: enabling");
  enabled = true;
  await resetAttachmentDownloadPending();
  _tick();
}
async function stop() {
  if (logger) {
    logger.info("attachment_downloads/stop: disabling");
  }
  enabled = false;
  (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(timeout);
  timeout = null;
}
async function addJob(attachment, job) {
  if (!attachment) {
    throw new Error("attachments_download/addJob: attachment is required");
  }
  const { messageId, type, index } = job;
  if (!messageId) {
    throw new Error("attachments_download/addJob: job.messageId is required");
  }
  if (!type) {
    throw new Error("attachments_download/addJob: job.type is required");
  }
  if (!(0, import_lodash.isNumber)(index)) {
    throw new Error("attachments_download/addJob: index must be a number");
  }
  if (attachment.downloadJobId) {
    let existingJob = await getAttachmentDownloadJobById(attachment.downloadJobId);
    if (existingJob) {
      existingJob = { ...existingJob, attempts: 0 };
      if (_activeAttachmentDownloadJobs[existingJob.id]) {
        logger.info(`attachment_downloads/addJob: ${existingJob.id} already running`);
      } else {
        logger.info(`attachment_downloads/addJob: restarting existing job ${existingJob.id}`);
        _activeAttachmentDownloadJobs[existingJob.id] = _runJob(existingJob);
      }
      return {
        ...attachment,
        pending: true
      };
    }
  }
  const id = (0, import_uuid.v4)();
  const timestamp = Date.now();
  const toSave = {
    ...job,
    id,
    attachment,
    timestamp,
    pending: 0,
    attempts: 0
  };
  await saveAttachmentDownloadJob(toSave);
  _maybeStartJob();
  return {
    ...attachment,
    pending: true,
    downloadJobId: id
  };
}
async function _tick() {
  (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(timeout);
  timeout = null;
  _maybeStartJob();
  timeout = setTimeout(_tick, TICK_INTERVAL);
}
async function _maybeStartJob() {
  if (!enabled) {
    logger.info("attachment_downloads/_maybeStartJob: not enabled, returning");
    return;
  }
  const jobCount = getActiveJobCount();
  const limit = MAX_ATTACHMENT_JOB_PARALLELISM - jobCount;
  if (limit <= 0) {
    logger.info("attachment_downloads/_maybeStartJob: reached active job limit, waiting");
    return;
  }
  const nextJobs = await getNextAttachmentDownloadJobs(limit);
  if (nextJobs.length <= 0) {
    logger.info("attachment_downloads/_maybeStartJob: no attachment jobs to run");
    return;
  }
  const secondJobCount = getActiveJobCount();
  const needed = MAX_ATTACHMENT_JOB_PARALLELISM - secondJobCount;
  if (needed <= 0) {
    logger.info("attachment_downloads/_maybeStartJob: reached active job limit after db query, waiting");
    return;
  }
  const jobs = nextJobs.slice(0, Math.min(needed, nextJobs.length));
  logger.info(`attachment_downloads/_maybeStartJob: starting ${jobs.length} jobs`);
  for (let i = 0, max = jobs.length; i < max; i += 1) {
    const job = jobs[i];
    const existing = _activeAttachmentDownloadJobs[job.id];
    if (existing) {
      logger.warn(`_maybeStartJob: Job ${job.id} is already running`);
    } else {
      _activeAttachmentDownloadJobs[job.id] = _runJob(job);
    }
  }
}
async function _runJob(job) {
  if (!job) {
    log.warn("attachment_downloads/_runJob: Job was missing!");
    return;
  }
  const { id, messageId, attachment, type, index, attempts } = job;
  let message;
  try {
    if (!job || !attachment || !messageId) {
      throw new Error(`_runJob: Key information required for job was missing. Job id: ${id}`);
    }
    logger.info(`attachment_downloads/_runJob(${id}): starting`);
    const pending = true;
    await setAttachmentDownloadJobPending(id, pending);
    message = window.MessageController.getById(messageId);
    if (!message) {
      const messageAttributes = await getMessageById(messageId);
      if (!messageAttributes) {
        logger.error(`attachment_downloads/_runJob(${id}): Source message not found, deleting job`);
        await _finishJob(null, id);
        return;
      }
      (0, import_assert.strictAssert)(messageId === messageAttributes.id, "message id mismatch");
      message = window.MessageController.register(messageId, messageAttributes);
    }
    await _addAttachmentToMessage(message, { ...attachment, pending: true }, { type, index });
    const downloaded = await (0, import_downloadAttachment.downloadAttachment)(attachment);
    if (!downloaded) {
      logger.warn(`attachment_downloads/_runJob(${id}): Got 404 from server for CDN ${attachment.cdnNumber}, marking attachment ${attachment.cdnId || attachment.cdnKey} from message ${message.idForLogging()} as permanent error`);
      await _addAttachmentToMessage(message, _markAttachmentAsPermanentError(attachment), { type, index });
      await _finishJob(message, id);
      return;
    }
    const upgradedAttachment = await window.Signal.Migrations.processNewAttachment(downloaded);
    await _addAttachmentToMessage(message, (0, import_lodash.omit)(upgradedAttachment, "error"), {
      type,
      index
    });
    await _finishJob(message, id);
  } catch (error) {
    const logId = message ? message.idForLogging() : id || "<no id>";
    const currentAttempt = (attempts || 0) + 1;
    if (currentAttempt >= 3) {
      logger.error(`attachment_downloads/runJob(${id}): ${currentAttempt} failed attempts, marking attachment from message ${logId} as error:`, Errors.toLogFormat(error));
      try {
        await _addAttachmentToMessage(message, _markAttachmentAsTransientError(attachment), { type, index });
      } finally {
        await _finishJob(message, id);
      }
      return;
    }
    logger.error(`attachment_downloads/_runJob(${id}): Failed to download attachment type ${type} for message ${logId}, attempt ${currentAttempt}:`, Errors.toLogFormat(error));
    try {
      await _addAttachmentToMessage(message, {
        ...attachment,
        downloadJobId: id
      }, { type, index });
      if (message) {
        await saveMessage(message.attributes, {
          ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
        });
      }
      const failedJob = {
        ...job,
        pending: 0,
        attempts: currentAttempt,
        timestamp: Date.now() + (RETRY_BACKOFF[currentAttempt] || RETRY_BACKOFF[3])
      };
      await saveAttachmentDownloadJob(failedJob);
    } finally {
      delete _activeAttachmentDownloadJobs[id];
      _maybeStartJob();
    }
  }
}
async function _finishJob(message, id) {
  if (message) {
    logger.info(`attachment_downloads/_finishJob for job id: ${id}`);
    await saveMessage(message.attributes, {
      ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
    });
  }
  await removeAttachmentDownloadJob(id);
  delete _activeAttachmentDownloadJobs[id];
  _maybeStartJob();
}
function getActiveJobCount() {
  return Object.keys(_activeAttachmentDownloadJobs).length;
}
function _markAttachmentAsPermanentError(attachment) {
  return {
    ...(0, import_lodash.omit)(attachment, ["key", "digest", "id"]),
    error: true
  };
}
function _markAttachmentAsTransientError(attachment) {
  return { ...attachment, error: true };
}
async function _addAttachmentToMessage(message, attachment, { type, index }) {
  if (!message) {
    return;
  }
  const logPrefix = `${message.idForLogging()} (type: ${type}, index: ${index})`;
  if (type === "long-message") {
    if (!attachment.path) {
      message.set({
        bodyAttachment: attachment
      });
      return;
    }
    try {
      const { data } = await window.Signal.Migrations.loadAttachmentData(attachment);
      message.set({
        body: Bytes.toString(data),
        bodyAttachment: void 0
      });
    } finally {
      if (attachment.path) {
        window.Signal.Migrations.deleteAttachmentData(attachment.path);
      }
    }
    return;
  }
  if (type === "attachment") {
    const attachments = message.get("attachments");
    if (!attachments || attachments.length <= index) {
      throw new Error(`_addAttachmentToMessage: attachments didn't exist or ${index} was too large`);
    }
    _checkOldAttachment(attachments, index.toString(), logPrefix);
    const newAttachments = [...attachments];
    newAttachments[index] = attachment;
    message.set({ attachments: newAttachments });
    return;
  }
  if (type === "preview") {
    const preview = message.get("preview");
    if (!preview || preview.length <= index) {
      throw new Error(`_addAttachmentToMessage: preview didn't exist or ${index} was too large`);
    }
    const item = preview[index];
    if (!item) {
      throw new Error(`_addAttachmentToMessage: preview ${index} was falsey`);
    }
    _checkOldAttachment(item, "image", logPrefix);
    const newPreview = [...preview];
    newPreview[index] = {
      ...preview[index],
      image: attachment
    };
    message.set({ preview: newPreview });
    return;
  }
  if (type === "contact") {
    const contact = message.get("contact");
    if (!contact || contact.length <= index) {
      throw new Error(`_addAttachmentToMessage: contact didn't exist or ${index} was too large`);
    }
    const item = contact[index];
    if (item && item.avatar && item.avatar.avatar) {
      _checkOldAttachment(item.avatar, "avatar", logPrefix);
      const newContact = [...contact];
      newContact[index] = {
        ...item,
        avatar: {
          ...item.avatar,
          avatar: attachment
        }
      };
      message.set({ contact: newContact });
    } else {
      logger.warn(`_addAttachmentToMessage: Couldn't update contact with avatar attachment for message ${message.idForLogging()}`);
    }
    return;
  }
  if (type === "quote") {
    const quote = message.get("quote");
    if (!quote) {
      throw new Error("_addAttachmentToMessage: quote didn't exist");
    }
    const { attachments } = quote;
    if (!attachments || attachments.length <= index) {
      throw new Error(`_addAttachmentToMessage: quote attachments didn't exist or ${index} was too large`);
    }
    const item = attachments[index];
    if (!item) {
      throw new Error(`_addAttachmentToMessage: quote attachment ${index} was falsey`);
    }
    _checkOldAttachment(item, "thumbnail", logPrefix);
    const newAttachments = [...attachments];
    newAttachments[index] = {
      ...attachments[index],
      thumbnail: attachment
    };
    const newQuote = {
      ...quote,
      attachments: newAttachments
    };
    message.set({ quote: newQuote });
    return;
  }
  if (type === "sticker") {
    const sticker = message.get("sticker");
    if (!sticker) {
      throw new Error("_addAttachmentToMessage: sticker didn't exist");
    }
    message.set({
      sticker: {
        ...sticker,
        data: attachment
      }
    });
    return;
  }
  throw new Error(`_addAttachmentToMessage: Unknown job type ${type} for message ${message.idForLogging()}`);
}
function _checkOldAttachment(object, key, logPrefix) {
  const oldAttachment = object[key];
  if (oldAttachment && oldAttachment.path) {
    logger.error(`_checkOldAttachment: ${logPrefix} - old attachment already had path, not replacing`);
    throw new Error("_checkOldAttachment: old attachment already had path, not replacing");
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addJob,
  start,
  stop
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXR0YWNobWVudERvd25sb2Fkcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGlzTnVtYmVyLCBvbWl0IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHY0IGFzIGdldEd1aWQgfSBmcm9tICd1dWlkJztcblxuaW1wb3J0IGRhdGFJbnRlcmZhY2UgZnJvbSAnLi4vc3FsL0NsaWVudCc7XG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0IHsgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkgfSBmcm9tICcuLi91dGlsL2NsZWFyVGltZW91dElmTmVjZXNzYXJ5JztcbmltcG9ydCB7IHN0cmljdEFzc2VydCB9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7IGRvd25sb2FkQXR0YWNobWVudCB9IGZyb20gJy4uL3V0aWwvZG93bmxvYWRBdHRhY2htZW50JztcbmltcG9ydCAqIGFzIEJ5dGVzIGZyb20gJy4uL0J5dGVzJztcbmltcG9ydCB0eXBlIHtcbiAgQXR0YWNobWVudERvd25sb2FkSm9iVHlwZSxcbiAgQXR0YWNobWVudERvd25sb2FkSm9iVHlwZVR5cGUsXG59IGZyb20gJy4uL3NxbC9JbnRlcmZhY2UnO1xuXG5pbXBvcnQgdHlwZSB7IE1lc3NhZ2VNb2RlbCB9IGZyb20gJy4uL21vZGVscy9tZXNzYWdlcyc7XG5pbXBvcnQgdHlwZSB7IEF0dGFjaG1lbnRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi4vdHlwZXMvZXJyb3JzJztcbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uL3R5cGVzL0xvZ2dpbmcnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcblxuY29uc3Qge1xuICBnZXRNZXNzYWdlQnlJZCxcbiAgZ2V0QXR0YWNobWVudERvd25sb2FkSm9iQnlJZCxcbiAgZ2V0TmV4dEF0dGFjaG1lbnREb3dubG9hZEpvYnMsXG4gIHJlbW92ZUF0dGFjaG1lbnREb3dubG9hZEpvYixcbiAgcmVzZXRBdHRhY2htZW50RG93bmxvYWRQZW5kaW5nLFxuICBzYXZlQXR0YWNobWVudERvd25sb2FkSm9iLFxuICBzYXZlTWVzc2FnZSxcbiAgc2V0QXR0YWNobWVudERvd25sb2FkSm9iUGVuZGluZyxcbn0gPSBkYXRhSW50ZXJmYWNlO1xuXG5jb25zdCBNQVhfQVRUQUNITUVOVF9KT0JfUEFSQUxMRUxJU00gPSAzO1xuXG5jb25zdCBUSUNLX0lOVEVSVkFMID0gZHVyYXRpb25zLk1JTlVURTtcblxuY29uc3QgUkVUUllfQkFDS09GRjogUmVjb3JkPG51bWJlciwgbnVtYmVyPiA9IHtcbiAgMTogMzAgKiBkdXJhdGlvbnMuU0VDT05ELFxuICAyOiAzMCAqIGR1cmF0aW9ucy5NSU5VVEUsXG4gIDM6IDYgKiBkdXJhdGlvbnMuSE9VUixcbn07XG5cbmxldCBlbmFibGVkID0gZmFsc2U7XG5sZXQgdGltZW91dDogTm9kZUpTLlRpbWVvdXQgfCBudWxsO1xubGV0IGxvZ2dlcjogTG9nZ2VyVHlwZTtcbmNvbnN0IF9hY3RpdmVBdHRhY2htZW50RG93bmxvYWRKb2JzOiBSZWNvcmQ8c3RyaW5nLCBQcm9taXNlPHZvaWQ+IHwgdW5kZWZpbmVkPiA9XG4gIHt9O1xuXG50eXBlIFN0YXJ0T3B0aW9uc1R5cGUgPSB7XG4gIGxvZ2dlcjogTG9nZ2VyVHlwZTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFydChvcHRpb25zOiBTdGFydE9wdGlvbnNUeXBlKTogUHJvbWlzZTx2b2lkPiB7XG4gICh7IGxvZ2dlciB9ID0gb3B0aW9ucyk7XG4gIGlmICghbG9nZ2VyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdhdHRhY2htZW50X2Rvd25sb2Fkcy9zdGFydDogbG9nZ2VyIG11c3QgYmUgcHJvdmlkZWQhJyk7XG4gIH1cblxuICBsb2dnZXIuaW5mbygnYXR0YWNobWVudF9kb3dubG9hZHMvc3RhcnQ6IGVuYWJsaW5nJyk7XG4gIGVuYWJsZWQgPSB0cnVlO1xuICBhd2FpdCByZXNldEF0dGFjaG1lbnREb3dubG9hZFBlbmRpbmcoKTtcblxuICBfdGljaygpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RvcCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgLy8gSWYgYC5zdGFydCgpYCB3YXNuJ3QgY2FsbGVkIC0gdGhlIGBsb2dnZXJgIGlzIGB1bmRlZmluZWRgXG4gIGlmIChsb2dnZXIpIHtcbiAgICBsb2dnZXIuaW5mbygnYXR0YWNobWVudF9kb3dubG9hZHMvc3RvcDogZGlzYWJsaW5nJyk7XG4gIH1cbiAgZW5hYmxlZCA9IGZhbHNlO1xuICBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSh0aW1lb3V0KTtcbiAgdGltZW91dCA9IG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRKb2IoXG4gIGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlLFxuICBqb2I6IHsgbWVzc2FnZUlkOiBzdHJpbmc7IHR5cGU6IEF0dGFjaG1lbnREb3dubG9hZEpvYlR5cGVUeXBlOyBpbmRleDogbnVtYmVyIH1cbik6IFByb21pc2U8QXR0YWNobWVudFR5cGU+IHtcbiAgaWYgKCFhdHRhY2htZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdhdHRhY2htZW50c19kb3dubG9hZC9hZGRKb2I6IGF0dGFjaG1lbnQgaXMgcmVxdWlyZWQnKTtcbiAgfVxuXG4gIGNvbnN0IHsgbWVzc2FnZUlkLCB0eXBlLCBpbmRleCB9ID0gam9iO1xuICBpZiAoIW1lc3NhZ2VJZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignYXR0YWNobWVudHNfZG93bmxvYWQvYWRkSm9iOiBqb2IubWVzc2FnZUlkIGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgaWYgKCF0eXBlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdhdHRhY2htZW50c19kb3dubG9hZC9hZGRKb2I6IGpvYi50eXBlIGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgaWYgKCFpc051bWJlcihpbmRleCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0dGFjaG1lbnRzX2Rvd25sb2FkL2FkZEpvYjogaW5kZXggbXVzdCBiZSBhIG51bWJlcicpO1xuICB9XG5cbiAgaWYgKGF0dGFjaG1lbnQuZG93bmxvYWRKb2JJZCkge1xuICAgIGxldCBleGlzdGluZ0pvYiA9IGF3YWl0IGdldEF0dGFjaG1lbnREb3dubG9hZEpvYkJ5SWQoXG4gICAgICBhdHRhY2htZW50LmRvd25sb2FkSm9iSWRcbiAgICApO1xuICAgIGlmIChleGlzdGluZ0pvYikge1xuICAgICAgLy8gUmVzZXQgam9iIGF0dGVtcHRzIHRocm91Z2ggdXNlcidzIGV4cGxpY2l0IGFjdGlvblxuICAgICAgZXhpc3RpbmdKb2IgPSB7IC4uLmV4aXN0aW5nSm9iLCBhdHRlbXB0czogMCB9O1xuXG4gICAgICBpZiAoX2FjdGl2ZUF0dGFjaG1lbnREb3dubG9hZEpvYnNbZXhpc3RpbmdKb2IuaWRdKSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKFxuICAgICAgICAgIGBhdHRhY2htZW50X2Rvd25sb2Fkcy9hZGRKb2I6ICR7ZXhpc3RpbmdKb2IuaWR9IGFscmVhZHkgcnVubmluZ2BcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZ2dlci5pbmZvKFxuICAgICAgICAgIGBhdHRhY2htZW50X2Rvd25sb2Fkcy9hZGRKb2I6IHJlc3RhcnRpbmcgZXhpc3Rpbmcgam9iICR7ZXhpc3RpbmdKb2IuaWR9YFxuICAgICAgICApO1xuICAgICAgICBfYWN0aXZlQXR0YWNobWVudERvd25sb2FkSm9ic1tleGlzdGluZ0pvYi5pZF0gPSBfcnVuSm9iKGV4aXN0aW5nSm9iKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYXR0YWNobWVudCxcbiAgICAgICAgcGVuZGluZzogdHJ1ZSxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaWQgPSBnZXRHdWlkKCk7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gIGNvbnN0IHRvU2F2ZTogQXR0YWNobWVudERvd25sb2FkSm9iVHlwZSA9IHtcbiAgICAuLi5qb2IsXG4gICAgaWQsXG4gICAgYXR0YWNobWVudCxcbiAgICB0aW1lc3RhbXAsXG4gICAgcGVuZGluZzogMCxcbiAgICBhdHRlbXB0czogMCxcbiAgfTtcblxuICBhd2FpdCBzYXZlQXR0YWNobWVudERvd25sb2FkSm9iKHRvU2F2ZSk7XG5cbiAgX21heWJlU3RhcnRKb2IoKTtcblxuICByZXR1cm4ge1xuICAgIC4uLmF0dGFjaG1lbnQsXG4gICAgcGVuZGluZzogdHJ1ZSxcbiAgICBkb3dubG9hZEpvYklkOiBpZCxcbiAgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX3RpY2soKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNsZWFyVGltZW91dElmTmVjZXNzYXJ5KHRpbWVvdXQpO1xuICB0aW1lb3V0ID0gbnVsbDtcblxuICBfbWF5YmVTdGFydEpvYigpO1xuICB0aW1lb3V0ID0gc2V0VGltZW91dChfdGljaywgVElDS19JTlRFUlZBTCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9tYXliZVN0YXJ0Sm9iKCk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoIWVuYWJsZWQpIHtcbiAgICBsb2dnZXIuaW5mbygnYXR0YWNobWVudF9kb3dubG9hZHMvX21heWJlU3RhcnRKb2I6IG5vdCBlbmFibGVkLCByZXR1cm5pbmcnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBqb2JDb3VudCA9IGdldEFjdGl2ZUpvYkNvdW50KCk7XG4gIGNvbnN0IGxpbWl0ID0gTUFYX0FUVEFDSE1FTlRfSk9CX1BBUkFMTEVMSVNNIC0gam9iQ291bnQ7XG4gIGlmIChsaW1pdCA8PSAwKSB7XG4gICAgbG9nZ2VyLmluZm8oXG4gICAgICAnYXR0YWNobWVudF9kb3dubG9hZHMvX21heWJlU3RhcnRKb2I6IHJlYWNoZWQgYWN0aXZlIGpvYiBsaW1pdCwgd2FpdGluZydcbiAgICApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IG5leHRKb2JzID0gYXdhaXQgZ2V0TmV4dEF0dGFjaG1lbnREb3dubG9hZEpvYnMobGltaXQpO1xuICBpZiAobmV4dEpvYnMubGVuZ3RoIDw9IDApIHtcbiAgICBsb2dnZXIuaW5mbyhcbiAgICAgICdhdHRhY2htZW50X2Rvd25sb2Fkcy9fbWF5YmVTdGFydEpvYjogbm8gYXR0YWNobWVudCBqb2JzIHRvIHJ1bidcbiAgICApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFRvIHByZXZlbnQgdGhlIHJhY2UgY29uZGl0aW9uIGNhdXNlZCBieSB0d28gcGFyYWxsZWwgZGF0YWJhc2UgY2FsbHMsIGVhY2hlZCBraWNrZWRcbiAgLy8gICBvZmYgYmVjYXVzZSB0aGUgam9iQ291bnQgd2Fzbid0IGF0IHRoZSBtYXguXG4gIGNvbnN0IHNlY29uZEpvYkNvdW50ID0gZ2V0QWN0aXZlSm9iQ291bnQoKTtcbiAgY29uc3QgbmVlZGVkID0gTUFYX0FUVEFDSE1FTlRfSk9CX1BBUkFMTEVMSVNNIC0gc2Vjb25kSm9iQ291bnQ7XG4gIGlmIChuZWVkZWQgPD0gMCkge1xuICAgIGxvZ2dlci5pbmZvKFxuICAgICAgJ2F0dGFjaG1lbnRfZG93bmxvYWRzL19tYXliZVN0YXJ0Sm9iOiByZWFjaGVkIGFjdGl2ZSBqb2IgbGltaXQgYWZ0ZXIgJyArXG4gICAgICAgICdkYiBxdWVyeSwgd2FpdGluZydcbiAgICApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGpvYnMgPSBuZXh0Sm9icy5zbGljZSgwLCBNYXRoLm1pbihuZWVkZWQsIG5leHRKb2JzLmxlbmd0aCkpO1xuXG4gIGxvZ2dlci5pbmZvKFxuICAgIGBhdHRhY2htZW50X2Rvd25sb2Fkcy9fbWF5YmVTdGFydEpvYjogc3RhcnRpbmcgJHtqb2JzLmxlbmd0aH0gam9ic2BcbiAgKTtcblxuICBmb3IgKGxldCBpID0gMCwgbWF4ID0gam9icy5sZW5ndGg7IGkgPCBtYXg7IGkgKz0gMSkge1xuICAgIGNvbnN0IGpvYiA9IGpvYnNbaV07XG4gICAgY29uc3QgZXhpc3RpbmcgPSBfYWN0aXZlQXR0YWNobWVudERvd25sb2FkSm9ic1tqb2IuaWRdO1xuICAgIGlmIChleGlzdGluZykge1xuICAgICAgbG9nZ2VyLndhcm4oYF9tYXliZVN0YXJ0Sm9iOiBKb2IgJHtqb2IuaWR9IGlzIGFscmVhZHkgcnVubmluZ2ApO1xuICAgIH0gZWxzZSB7XG4gICAgICBfYWN0aXZlQXR0YWNobWVudERvd25sb2FkSm9ic1tqb2IuaWRdID0gX3J1bkpvYihqb2IpO1xuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBfcnVuSm9iKGpvYj86IEF0dGFjaG1lbnREb3dubG9hZEpvYlR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCFqb2IpIHtcbiAgICBsb2cud2FybignYXR0YWNobWVudF9kb3dubG9hZHMvX3J1bkpvYjogSm9iIHdhcyBtaXNzaW5nIScpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHsgaWQsIG1lc3NhZ2VJZCwgYXR0YWNobWVudCwgdHlwZSwgaW5kZXgsIGF0dGVtcHRzIH0gPSBqb2I7XG4gIGxldCBtZXNzYWdlO1xuXG4gIHRyeSB7XG4gICAgaWYgKCFqb2IgfHwgIWF0dGFjaG1lbnQgfHwgIW1lc3NhZ2VJZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgX3J1bkpvYjogS2V5IGluZm9ybWF0aW9uIHJlcXVpcmVkIGZvciBqb2Igd2FzIG1pc3NpbmcuIEpvYiBpZDogJHtpZH1gXG4gICAgICApO1xuICAgIH1cblxuICAgIGxvZ2dlci5pbmZvKGBhdHRhY2htZW50X2Rvd25sb2Fkcy9fcnVuSm9iKCR7aWR9KTogc3RhcnRpbmdgKTtcblxuICAgIGNvbnN0IHBlbmRpbmcgPSB0cnVlO1xuICAgIGF3YWl0IHNldEF0dGFjaG1lbnREb3dubG9hZEpvYlBlbmRpbmcoaWQsIHBlbmRpbmcpO1xuXG4gICAgbWVzc2FnZSA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5nZXRCeUlkKG1lc3NhZ2VJZCk7XG4gICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICBjb25zdCBtZXNzYWdlQXR0cmlidXRlcyA9IGF3YWl0IGdldE1lc3NhZ2VCeUlkKG1lc3NhZ2VJZCk7XG4gICAgICBpZiAoIW1lc3NhZ2VBdHRyaWJ1dGVzKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgICBgYXR0YWNobWVudF9kb3dubG9hZHMvX3J1bkpvYigke2lkfSk6IGAgK1xuICAgICAgICAgICAgJ1NvdXJjZSBtZXNzYWdlIG5vdCBmb3VuZCwgZGVsZXRpbmcgam9iJ1xuICAgICAgICApO1xuICAgICAgICBhd2FpdCBfZmluaXNoSm9iKG51bGwsIGlkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzdHJpY3RBc3NlcnQobWVzc2FnZUlkID09PSBtZXNzYWdlQXR0cmlidXRlcy5pZCwgJ21lc3NhZ2UgaWQgbWlzbWF0Y2gnKTtcbiAgICAgIG1lc3NhZ2UgPSB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIucmVnaXN0ZXIobWVzc2FnZUlkLCBtZXNzYWdlQXR0cmlidXRlcyk7XG4gICAgfVxuXG4gICAgYXdhaXQgX2FkZEF0dGFjaG1lbnRUb01lc3NhZ2UoXG4gICAgICBtZXNzYWdlLFxuICAgICAgeyAuLi5hdHRhY2htZW50LCBwZW5kaW5nOiB0cnVlIH0sXG4gICAgICB7IHR5cGUsIGluZGV4IH1cbiAgICApO1xuXG4gICAgY29uc3QgZG93bmxvYWRlZCA9IGF3YWl0IGRvd25sb2FkQXR0YWNobWVudChhdHRhY2htZW50KTtcblxuICAgIGlmICghZG93bmxvYWRlZCkge1xuICAgICAgbG9nZ2VyLndhcm4oXG4gICAgICAgIGBhdHRhY2htZW50X2Rvd25sb2Fkcy9fcnVuSm9iKCR7aWR9KTogR290IDQwNCBmcm9tIHNlcnZlciBmb3IgQ0ROICR7XG4gICAgICAgICAgYXR0YWNobWVudC5jZG5OdW1iZXJcbiAgICAgICAgfSwgbWFya2luZyBhdHRhY2htZW50ICR7XG4gICAgICAgICAgYXR0YWNobWVudC5jZG5JZCB8fCBhdHRhY2htZW50LmNkbktleVxuICAgICAgICB9IGZyb20gbWVzc2FnZSAke21lc3NhZ2UuaWRGb3JMb2dnaW5nKCl9IGFzIHBlcm1hbmVudCBlcnJvcmBcbiAgICAgICk7XG5cbiAgICAgIGF3YWl0IF9hZGRBdHRhY2htZW50VG9NZXNzYWdlKFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBfbWFya0F0dGFjaG1lbnRBc1Blcm1hbmVudEVycm9yKGF0dGFjaG1lbnQpLFxuICAgICAgICB7IHR5cGUsIGluZGV4IH1cbiAgICAgICk7XG4gICAgICBhd2FpdCBfZmluaXNoSm9iKG1lc3NhZ2UsIGlkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB1cGdyYWRlZEF0dGFjaG1lbnQgPVxuICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5NaWdyYXRpb25zLnByb2Nlc3NOZXdBdHRhY2htZW50KGRvd25sb2FkZWQpO1xuXG4gICAgYXdhaXQgX2FkZEF0dGFjaG1lbnRUb01lc3NhZ2UobWVzc2FnZSwgb21pdCh1cGdyYWRlZEF0dGFjaG1lbnQsICdlcnJvcicpLCB7XG4gICAgICB0eXBlLFxuICAgICAgaW5kZXgsXG4gICAgfSk7XG5cbiAgICBhd2FpdCBfZmluaXNoSm9iKG1lc3NhZ2UsIGlkKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zdCBsb2dJZCA9IG1lc3NhZ2UgPyBtZXNzYWdlLmlkRm9yTG9nZ2luZygpIDogaWQgfHwgJzxubyBpZD4nO1xuICAgIGNvbnN0IGN1cnJlbnRBdHRlbXB0ID0gKGF0dGVtcHRzIHx8IDApICsgMTtcblxuICAgIGlmIChjdXJyZW50QXR0ZW1wdCA+PSAzKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoXG4gICAgICAgIGBhdHRhY2htZW50X2Rvd25sb2Fkcy9ydW5Kb2IoJHtpZH0pOiAke2N1cnJlbnRBdHRlbXB0fSBmYWlsZWQgYCArXG4gICAgICAgICAgYGF0dGVtcHRzLCBtYXJraW5nIGF0dGFjaG1lbnQgZnJvbSBtZXNzYWdlICR7bG9nSWR9IGFzIGAgK1xuICAgICAgICAgICdlcnJvcjonLFxuICAgICAgICBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpXG4gICAgICApO1xuXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBfYWRkQXR0YWNobWVudFRvTWVzc2FnZShcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIF9tYXJrQXR0YWNobWVudEFzVHJhbnNpZW50RXJyb3IoYXR0YWNobWVudCksXG4gICAgICAgICAgeyB0eXBlLCBpbmRleCB9XG4gICAgICAgICk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBhd2FpdCBfZmluaXNoSm9iKG1lc3NhZ2UsIGlkKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZ2dlci5lcnJvcihcbiAgICAgIGBhdHRhY2htZW50X2Rvd25sb2Fkcy9fcnVuSm9iKCR7aWR9KTogRmFpbGVkIHRvIGRvd25sb2FkIGF0dGFjaG1lbnQgYCArXG4gICAgICAgIGB0eXBlICR7dHlwZX0gZm9yIG1lc3NhZ2UgJHtsb2dJZH0sIGF0dGVtcHQgJHtjdXJyZW50QXR0ZW1wdH06YCxcbiAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICApO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIFJlbW92ZSBgcGVuZGluZ2AgZmxhZyBmcm9tIHRoZSBhdHRhY2htZW50LlxuICAgICAgYXdhaXQgX2FkZEF0dGFjaG1lbnRUb01lc3NhZ2UoXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIHtcbiAgICAgICAgICAuLi5hdHRhY2htZW50LFxuICAgICAgICAgIGRvd25sb2FkSm9iSWQ6IGlkLFxuICAgICAgICB9LFxuICAgICAgICB7IHR5cGUsIGluZGV4IH1cbiAgICAgICk7XG4gICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICBhd2FpdCBzYXZlTWVzc2FnZShtZXNzYWdlLmF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICBvdXJVdWlkOiB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmFpbGVkSm9iID0ge1xuICAgICAgICAuLi5qb2IsXG4gICAgICAgIHBlbmRpbmc6IDAsXG4gICAgICAgIGF0dGVtcHRzOiBjdXJyZW50QXR0ZW1wdCxcbiAgICAgICAgdGltZXN0YW1wOlxuICAgICAgICAgIERhdGUubm93KCkgKyAoUkVUUllfQkFDS09GRltjdXJyZW50QXR0ZW1wdF0gfHwgUkVUUllfQkFDS09GRlszXSksXG4gICAgICB9O1xuXG4gICAgICBhd2FpdCBzYXZlQXR0YWNobWVudERvd25sb2FkSm9iKGZhaWxlZEpvYik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGRlbGV0ZSBfYWN0aXZlQXR0YWNobWVudERvd25sb2FkSm9ic1tpZF07XG4gICAgICBfbWF5YmVTdGFydEpvYigpO1xuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBfZmluaXNoSm9iKFxuICBtZXNzYWdlOiBNZXNzYWdlTW9kZWwgfCBudWxsIHwgdW5kZWZpbmVkLFxuICBpZDogc3RyaW5nXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKG1lc3NhZ2UpIHtcbiAgICBsb2dnZXIuaW5mbyhgYXR0YWNobWVudF9kb3dubG9hZHMvX2ZpbmlzaEpvYiBmb3Igam9iIGlkOiAke2lkfWApO1xuICAgIGF3YWl0IHNhdmVNZXNzYWdlKG1lc3NhZ2UuYXR0cmlidXRlcywge1xuICAgICAgb3VyVXVpZDogd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCkudG9TdHJpbmcoKSxcbiAgICB9KTtcbiAgfVxuXG4gIGF3YWl0IHJlbW92ZUF0dGFjaG1lbnREb3dubG9hZEpvYihpZCk7XG4gIGRlbGV0ZSBfYWN0aXZlQXR0YWNobWVudERvd25sb2FkSm9ic1tpZF07XG4gIF9tYXliZVN0YXJ0Sm9iKCk7XG59XG5cbmZ1bmN0aW9uIGdldEFjdGl2ZUpvYkNvdW50KCk6IG51bWJlciB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhfYWN0aXZlQXR0YWNobWVudERvd25sb2FkSm9icykubGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBfbWFya0F0dGFjaG1lbnRBc1Blcm1hbmVudEVycm9yKFxuICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZVxuKTogQXR0YWNobWVudFR5cGUge1xuICByZXR1cm4ge1xuICAgIC4uLm9taXQoYXR0YWNobWVudCwgWydrZXknLCAnZGlnZXN0JywgJ2lkJ10pLFxuICAgIGVycm9yOiB0cnVlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBfbWFya0F0dGFjaG1lbnRBc1RyYW5zaWVudEVycm9yKFxuICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZVxuKTogQXR0YWNobWVudFR5cGUge1xuICByZXR1cm4geyAuLi5hdHRhY2htZW50LCBlcnJvcjogdHJ1ZSB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiBfYWRkQXR0YWNobWVudFRvTWVzc2FnZShcbiAgbWVzc2FnZTogTWVzc2FnZU1vZGVsIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgYXR0YWNobWVudDogQXR0YWNobWVudFR5cGUsXG4gIHsgdHlwZSwgaW5kZXggfTogeyB0eXBlOiBBdHRhY2htZW50RG93bmxvYWRKb2JUeXBlVHlwZTsgaW5kZXg6IG51bWJlciB9XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCFtZXNzYWdlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgbG9nUHJlZml4ID0gYCR7bWVzc2FnZS5pZEZvckxvZ2dpbmcoKX0gKHR5cGU6ICR7dHlwZX0sIGluZGV4OiAke2luZGV4fSlgO1xuXG4gIGlmICh0eXBlID09PSAnbG9uZy1tZXNzYWdlJykge1xuICAgIC8vIEF0dGFjaG1lbnQgd2Fzbid0IGRvd25sb2FkZWQgeWV0LlxuICAgIGlmICghYXR0YWNobWVudC5wYXRoKSB7XG4gICAgICBtZXNzYWdlLnNldCh7XG4gICAgICAgIGJvZHlBdHRhY2htZW50OiBhdHRhY2htZW50LFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgd2luZG93LlNpZ25hbC5NaWdyYXRpb25zLmxvYWRBdHRhY2htZW50RGF0YShcbiAgICAgICAgYXR0YWNobWVudFxuICAgICAgKTtcbiAgICAgIG1lc3NhZ2Uuc2V0KHtcbiAgICAgICAgYm9keTogQnl0ZXMudG9TdHJpbmcoZGF0YSksXG4gICAgICAgIGJvZHlBdHRhY2htZW50OiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKGF0dGFjaG1lbnQucGF0aCkge1xuICAgICAgICB3aW5kb3cuU2lnbmFsLk1pZ3JhdGlvbnMuZGVsZXRlQXR0YWNobWVudERhdGEoYXR0YWNobWVudC5wYXRoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHR5cGUgPT09ICdhdHRhY2htZW50Jykge1xuICAgIGNvbnN0IGF0dGFjaG1lbnRzID0gbWVzc2FnZS5nZXQoJ2F0dGFjaG1lbnRzJyk7XG4gICAgaWYgKCFhdHRhY2htZW50cyB8fCBhdHRhY2htZW50cy5sZW5ndGggPD0gaW5kZXgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYF9hZGRBdHRhY2htZW50VG9NZXNzYWdlOiBhdHRhY2htZW50cyBkaWRuJ3QgZXhpc3Qgb3IgJHtpbmRleH0gd2FzIHRvbyBsYXJnZWBcbiAgICAgICk7XG4gICAgfVxuICAgIF9jaGVja09sZEF0dGFjaG1lbnQoYXR0YWNobWVudHMsIGluZGV4LnRvU3RyaW5nKCksIGxvZ1ByZWZpeCk7XG5cbiAgICBjb25zdCBuZXdBdHRhY2htZW50cyA9IFsuLi5hdHRhY2htZW50c107XG4gICAgbmV3QXR0YWNobWVudHNbaW5kZXhdID0gYXR0YWNobWVudDtcblxuICAgIG1lc3NhZ2Uuc2V0KHsgYXR0YWNobWVudHM6IG5ld0F0dGFjaG1lbnRzIH0pO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHR5cGUgPT09ICdwcmV2aWV3Jykge1xuICAgIGNvbnN0IHByZXZpZXcgPSBtZXNzYWdlLmdldCgncHJldmlldycpO1xuICAgIGlmICghcHJldmlldyB8fCBwcmV2aWV3Lmxlbmd0aCA8PSBpbmRleCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgX2FkZEF0dGFjaG1lbnRUb01lc3NhZ2U6IHByZXZpZXcgZGlkbid0IGV4aXN0IG9yICR7aW5kZXh9IHdhcyB0b28gbGFyZ2VgXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBpdGVtID0gcHJldmlld1tpbmRleF07XG4gICAgaWYgKCFpdGVtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYF9hZGRBdHRhY2htZW50VG9NZXNzYWdlOiBwcmV2aWV3ICR7aW5kZXh9IHdhcyBmYWxzZXlgKTtcbiAgICB9XG5cbiAgICBfY2hlY2tPbGRBdHRhY2htZW50KGl0ZW0sICdpbWFnZScsIGxvZ1ByZWZpeCk7XG5cbiAgICBjb25zdCBuZXdQcmV2aWV3ID0gWy4uLnByZXZpZXddO1xuICAgIG5ld1ByZXZpZXdbaW5kZXhdID0ge1xuICAgICAgLi4ucHJldmlld1tpbmRleF0sXG4gICAgICBpbWFnZTogYXR0YWNobWVudCxcbiAgICB9O1xuXG4gICAgbWVzc2FnZS5zZXQoeyBwcmV2aWV3OiBuZXdQcmV2aWV3IH0pO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHR5cGUgPT09ICdjb250YWN0Jykge1xuICAgIGNvbnN0IGNvbnRhY3QgPSBtZXNzYWdlLmdldCgnY29udGFjdCcpO1xuICAgIGlmICghY29udGFjdCB8fCBjb250YWN0Lmxlbmd0aCA8PSBpbmRleCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgX2FkZEF0dGFjaG1lbnRUb01lc3NhZ2U6IGNvbnRhY3QgZGlkbid0IGV4aXN0IG9yICR7aW5kZXh9IHdhcyB0b28gbGFyZ2VgXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBpdGVtID0gY29udGFjdFtpbmRleF07XG4gICAgaWYgKGl0ZW0gJiYgaXRlbS5hdmF0YXIgJiYgaXRlbS5hdmF0YXIuYXZhdGFyKSB7XG4gICAgICBfY2hlY2tPbGRBdHRhY2htZW50KGl0ZW0uYXZhdGFyLCAnYXZhdGFyJywgbG9nUHJlZml4KTtcblxuICAgICAgY29uc3QgbmV3Q29udGFjdCA9IFsuLi5jb250YWN0XTtcbiAgICAgIG5ld0NvbnRhY3RbaW5kZXhdID0ge1xuICAgICAgICAuLi5pdGVtLFxuICAgICAgICBhdmF0YXI6IHtcbiAgICAgICAgICAuLi5pdGVtLmF2YXRhcixcbiAgICAgICAgICBhdmF0YXI6IGF0dGFjaG1lbnQsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBtZXNzYWdlLnNldCh7IGNvbnRhY3Q6IG5ld0NvbnRhY3QgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci53YXJuKFxuICAgICAgICBgX2FkZEF0dGFjaG1lbnRUb01lc3NhZ2U6IENvdWxkbid0IHVwZGF0ZSBjb250YWN0IHdpdGggYXZhdGFyIGF0dGFjaG1lbnQgZm9yIG1lc3NhZ2UgJHttZXNzYWdlLmlkRm9yTG9nZ2luZygpfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHR5cGUgPT09ICdxdW90ZScpIHtcbiAgICBjb25zdCBxdW90ZSA9IG1lc3NhZ2UuZ2V0KCdxdW90ZScpO1xuICAgIGlmICghcXVvdGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIl9hZGRBdHRhY2htZW50VG9NZXNzYWdlOiBxdW90ZSBkaWRuJ3QgZXhpc3RcIik7XG4gICAgfVxuICAgIGNvbnN0IHsgYXR0YWNobWVudHMgfSA9IHF1b3RlO1xuICAgIGlmICghYXR0YWNobWVudHMgfHwgYXR0YWNobWVudHMubGVuZ3RoIDw9IGluZGV4KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBfYWRkQXR0YWNobWVudFRvTWVzc2FnZTogcXVvdGUgYXR0YWNobWVudHMgZGlkbid0IGV4aXN0IG9yICR7aW5kZXh9IHdhcyB0b28gbGFyZ2VgXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW0gPSBhdHRhY2htZW50c1tpbmRleF07XG4gICAgaWYgKCFpdGVtKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBfYWRkQXR0YWNobWVudFRvTWVzc2FnZTogcXVvdGUgYXR0YWNobWVudCAke2luZGV4fSB3YXMgZmFsc2V5YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBfY2hlY2tPbGRBdHRhY2htZW50KGl0ZW0sICd0aHVtYm5haWwnLCBsb2dQcmVmaXgpO1xuXG4gICAgY29uc3QgbmV3QXR0YWNobWVudHMgPSBbLi4uYXR0YWNobWVudHNdO1xuICAgIG5ld0F0dGFjaG1lbnRzW2luZGV4XSA9IHtcbiAgICAgIC4uLmF0dGFjaG1lbnRzW2luZGV4XSxcbiAgICAgIHRodW1ibmFpbDogYXR0YWNobWVudCxcbiAgICB9O1xuXG4gICAgY29uc3QgbmV3UXVvdGUgPSB7XG4gICAgICAuLi5xdW90ZSxcbiAgICAgIGF0dGFjaG1lbnRzOiBuZXdBdHRhY2htZW50cyxcbiAgICB9O1xuXG4gICAgbWVzc2FnZS5zZXQoeyBxdW90ZTogbmV3UXVvdGUgfSk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodHlwZSA9PT0gJ3N0aWNrZXInKSB7XG4gICAgY29uc3Qgc3RpY2tlciA9IG1lc3NhZ2UuZ2V0KCdzdGlja2VyJyk7XG4gICAgaWYgKCFzdGlja2VyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJfYWRkQXR0YWNobWVudFRvTWVzc2FnZTogc3RpY2tlciBkaWRuJ3QgZXhpc3RcIik7XG4gICAgfVxuXG4gICAgbWVzc2FnZS5zZXQoe1xuICAgICAgc3RpY2tlcjoge1xuICAgICAgICAuLi5zdGlja2VyLFxuICAgICAgICBkYXRhOiBhdHRhY2htZW50LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgYF9hZGRBdHRhY2htZW50VG9NZXNzYWdlOiBVbmtub3duIGpvYiB0eXBlICR7dHlwZX0gZm9yIG1lc3NhZ2UgJHttZXNzYWdlLmlkRm9yTG9nZ2luZygpfWBcbiAgKTtcbn1cblxuZnVuY3Rpb24gX2NoZWNrT2xkQXR0YWNobWVudChcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgb2JqZWN0OiBhbnksXG4gIGtleTogc3RyaW5nLFxuICBsb2dQcmVmaXg6IHN0cmluZ1xuKTogdm9pZCB7XG4gIGNvbnN0IG9sZEF0dGFjaG1lbnQgPSBvYmplY3Rba2V5XTtcbiAgaWYgKG9sZEF0dGFjaG1lbnQgJiYgb2xkQXR0YWNobWVudC5wYXRoKSB7XG4gICAgbG9nZ2VyLmVycm9yKFxuICAgICAgYF9jaGVja09sZEF0dGFjaG1lbnQ6ICR7bG9nUHJlZml4fSAtIG9sZCBhdHRhY2htZW50IGFscmVhZHkgaGFkIHBhdGgsIG5vdCByZXBsYWNpbmdgXG4gICAgKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnX2NoZWNrT2xkQXR0YWNobWVudDogb2xkIGF0dGFjaG1lbnQgYWxyZWFkeSBoYWQgcGF0aCwgbm90IHJlcGxhY2luZydcbiAgICApO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUErQjtBQUMvQixrQkFBOEI7QUFFOUIsb0JBQTBCO0FBQzFCLGdCQUEyQjtBQUMzQixxQ0FBd0M7QUFDeEMsb0JBQTZCO0FBQzdCLGdDQUFtQztBQUNuQyxZQUF1QjtBQVF2QixhQUF3QjtBQUV4QixVQUFxQjtBQUVyQixNQUFNO0FBQUEsRUFDSjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxJQUNFO0FBRUosTUFBTSxpQ0FBaUM7QUFFdkMsTUFBTSxnQkFBZ0IsVUFBVTtBQUVoQyxNQUFNLGdCQUF3QztBQUFBLEVBQzVDLEdBQUcsS0FBSyxVQUFVO0FBQUEsRUFDbEIsR0FBRyxLQUFLLFVBQVU7QUFBQSxFQUNsQixHQUFHLElBQUksVUFBVTtBQUNuQjtBQUVBLElBQUksVUFBVTtBQUNkLElBQUk7QUFDSixJQUFJO0FBQ0osTUFBTSxnQ0FDSixDQUFDO0FBTUgscUJBQTRCLFNBQTBDO0FBQ3BFLEVBQUMsR0FBRSxPQUFPLElBQUk7QUFDZCxNQUFJLENBQUMsUUFBUTtBQUNYLFVBQU0sSUFBSSxNQUFNLHNEQUFzRDtBQUFBLEVBQ3hFO0FBRUEsU0FBTyxLQUFLLHNDQUFzQztBQUNsRCxZQUFVO0FBQ1YsUUFBTSwrQkFBK0I7QUFFckMsUUFBTTtBQUNSO0FBWHNCLEFBYXRCLHNCQUE0QztBQUUxQyxNQUFJLFFBQVE7QUFDVixXQUFPLEtBQUssc0NBQXNDO0FBQUEsRUFDcEQ7QUFDQSxZQUFVO0FBQ1YsOERBQXdCLE9BQU87QUFDL0IsWUFBVTtBQUNaO0FBUnNCLEFBVXRCLHNCQUNFLFlBQ0EsS0FDeUI7QUFDekIsTUFBSSxDQUFDLFlBQVk7QUFDZixVQUFNLElBQUksTUFBTSxxREFBcUQ7QUFBQSxFQUN2RTtBQUVBLFFBQU0sRUFBRSxXQUFXLE1BQU0sVUFBVTtBQUNuQyxNQUFJLENBQUMsV0FBVztBQUNkLFVBQU0sSUFBSSxNQUFNLHdEQUF3RDtBQUFBLEVBQzFFO0FBQ0EsTUFBSSxDQUFDLE1BQU07QUFDVCxVQUFNLElBQUksTUFBTSxtREFBbUQ7QUFBQSxFQUNyRTtBQUNBLE1BQUksQ0FBQyw0QkFBUyxLQUFLLEdBQUc7QUFDcEIsVUFBTSxJQUFJLE1BQU0scURBQXFEO0FBQUEsRUFDdkU7QUFFQSxNQUFJLFdBQVcsZUFBZTtBQUM1QixRQUFJLGNBQWMsTUFBTSw2QkFDdEIsV0FBVyxhQUNiO0FBQ0EsUUFBSSxhQUFhO0FBRWYsb0JBQWMsS0FBSyxhQUFhLFVBQVUsRUFBRTtBQUU1QyxVQUFJLDhCQUE4QixZQUFZLEtBQUs7QUFDakQsZUFBTyxLQUNMLGdDQUFnQyxZQUFZLG9CQUM5QztBQUFBLE1BQ0YsT0FBTztBQUNMLGVBQU8sS0FDTCx3REFBd0QsWUFBWSxJQUN0RTtBQUNBLHNDQUE4QixZQUFZLE1BQU0sUUFBUSxXQUFXO0FBQUEsTUFDckU7QUFFQSxhQUFPO0FBQUEsV0FDRjtBQUFBLFFBQ0gsU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFFBQU0sS0FBSyxvQkFBUTtBQUNuQixRQUFNLFlBQVksS0FBSyxJQUFJO0FBQzNCLFFBQU0sU0FBb0M7QUFBQSxPQUNyQztBQUFBLElBQ0g7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLEVBQ1o7QUFFQSxRQUFNLDBCQUEwQixNQUFNO0FBRXRDLGlCQUFlO0FBRWYsU0FBTztBQUFBLE9BQ0Y7QUFBQSxJQUNILFNBQVM7QUFBQSxJQUNULGVBQWU7QUFBQSxFQUNqQjtBQUNGO0FBakVzQixBQW1FdEIsdUJBQXNDO0FBQ3BDLDhEQUF3QixPQUFPO0FBQy9CLFlBQVU7QUFFVixpQkFBZTtBQUNmLFlBQVUsV0FBVyxPQUFPLGFBQWE7QUFDM0M7QUFOZSxBQVFmLGdDQUErQztBQUM3QyxNQUFJLENBQUMsU0FBUztBQUNaLFdBQU8sS0FBSyw2REFBNkQ7QUFDekU7QUFBQSxFQUNGO0FBRUEsUUFBTSxXQUFXLGtCQUFrQjtBQUNuQyxRQUFNLFFBQVEsaUNBQWlDO0FBQy9DLE1BQUksU0FBUyxHQUFHO0FBQ2QsV0FBTyxLQUNMLHdFQUNGO0FBQ0E7QUFBQSxFQUNGO0FBRUEsUUFBTSxXQUFXLE1BQU0sOEJBQThCLEtBQUs7QUFDMUQsTUFBSSxTQUFTLFVBQVUsR0FBRztBQUN4QixXQUFPLEtBQ0wsZ0VBQ0Y7QUFDQTtBQUFBLEVBQ0Y7QUFJQSxRQUFNLGlCQUFpQixrQkFBa0I7QUFDekMsUUFBTSxTQUFTLGlDQUFpQztBQUNoRCxNQUFJLFVBQVUsR0FBRztBQUNmLFdBQU8sS0FDTCx1RkFFRjtBQUNBO0FBQUEsRUFDRjtBQUVBLFFBQU0sT0FBTyxTQUFTLE1BQU0sR0FBRyxLQUFLLElBQUksUUFBUSxTQUFTLE1BQU0sQ0FBQztBQUVoRSxTQUFPLEtBQ0wsaURBQWlELEtBQUssYUFDeEQ7QUFFQSxXQUFTLElBQUksR0FBRyxNQUFNLEtBQUssUUFBUSxJQUFJLEtBQUssS0FBSyxHQUFHO0FBQ2xELFVBQU0sTUFBTSxLQUFLO0FBQ2pCLFVBQU0sV0FBVyw4QkFBOEIsSUFBSTtBQUNuRCxRQUFJLFVBQVU7QUFDWixhQUFPLEtBQUssdUJBQXVCLElBQUksdUJBQXVCO0FBQUEsSUFDaEUsT0FBTztBQUNMLG9DQUE4QixJQUFJLE1BQU0sUUFBUSxHQUFHO0FBQUEsSUFDckQ7QUFBQSxFQUNGO0FBQ0Y7QUFsRGUsQUFvRGYsdUJBQXVCLEtBQWdEO0FBQ3JFLE1BQUksQ0FBQyxLQUFLO0FBQ1IsUUFBSSxLQUFLLGdEQUFnRDtBQUN6RDtBQUFBLEVBQ0Y7QUFFQSxRQUFNLEVBQUUsSUFBSSxXQUFXLFlBQVksTUFBTSxPQUFPLGFBQWE7QUFDN0QsTUFBSTtBQUVKLE1BQUk7QUFDRixRQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXO0FBQ3JDLFlBQU0sSUFBSSxNQUNSLGtFQUFrRSxJQUNwRTtBQUFBLElBQ0Y7QUFFQSxXQUFPLEtBQUssZ0NBQWdDLGVBQWU7QUFFM0QsVUFBTSxVQUFVO0FBQ2hCLFVBQU0sZ0NBQWdDLElBQUksT0FBTztBQUVqRCxjQUFVLE9BQU8sa0JBQWtCLFFBQVEsU0FBUztBQUNwRCxRQUFJLENBQUMsU0FBUztBQUNaLFlBQU0sb0JBQW9CLE1BQU0sZUFBZSxTQUFTO0FBQ3hELFVBQUksQ0FBQyxtQkFBbUI7QUFDdEIsZUFBTyxNQUNMLGdDQUFnQyw2Q0FFbEM7QUFDQSxjQUFNLFdBQVcsTUFBTSxFQUFFO0FBQ3pCO0FBQUEsTUFDRjtBQUVBLHNDQUFhLGNBQWMsa0JBQWtCLElBQUkscUJBQXFCO0FBQ3RFLGdCQUFVLE9BQU8sa0JBQWtCLFNBQVMsV0FBVyxpQkFBaUI7QUFBQSxJQUMxRTtBQUVBLFVBQU0sd0JBQ0osU0FDQSxLQUFLLFlBQVksU0FBUyxLQUFLLEdBQy9CLEVBQUUsTUFBTSxNQUFNLENBQ2hCO0FBRUEsVUFBTSxhQUFhLE1BQU0sa0RBQW1CLFVBQVU7QUFFdEQsUUFBSSxDQUFDLFlBQVk7QUFDZixhQUFPLEtBQ0wsZ0NBQWdDLG9DQUM5QixXQUFXLGlDQUVYLFdBQVcsU0FBUyxXQUFXLHVCQUNoQixRQUFRLGFBQWEsc0JBQ3hDO0FBRUEsWUFBTSx3QkFDSixTQUNBLGdDQUFnQyxVQUFVLEdBQzFDLEVBQUUsTUFBTSxNQUFNLENBQ2hCO0FBQ0EsWUFBTSxXQUFXLFNBQVMsRUFBRTtBQUM1QjtBQUFBLElBQ0Y7QUFFQSxVQUFNLHFCQUNKLE1BQU0sT0FBTyxPQUFPLFdBQVcscUJBQXFCLFVBQVU7QUFFaEUsVUFBTSx3QkFBd0IsU0FBUyx3QkFBSyxvQkFBb0IsT0FBTyxHQUFHO0FBQUEsTUFDeEU7QUFBQSxNQUNBO0FBQUEsSUFDRixDQUFDO0FBRUQsVUFBTSxXQUFXLFNBQVMsRUFBRTtBQUFBLEVBQzlCLFNBQVMsT0FBUDtBQUNBLFVBQU0sUUFBUSxVQUFVLFFBQVEsYUFBYSxJQUFJLE1BQU07QUFDdkQsVUFBTSxpQkFBa0IsYUFBWSxLQUFLO0FBRXpDLFFBQUksa0JBQWtCLEdBQUc7QUFDdkIsYUFBTyxNQUNMLCtCQUErQixRQUFRLG1FQUNRLG1CQUUvQyxPQUFPLFlBQVksS0FBSyxDQUMxQjtBQUVBLFVBQUk7QUFDRixjQUFNLHdCQUNKLFNBQ0EsZ0NBQWdDLFVBQVUsR0FDMUMsRUFBRSxNQUFNLE1BQU0sQ0FDaEI7QUFBQSxNQUNGLFVBQUU7QUFDQSxjQUFNLFdBQVcsU0FBUyxFQUFFO0FBQUEsTUFDOUI7QUFFQTtBQUFBLElBQ0Y7QUFFQSxXQUFPLE1BQ0wsZ0NBQWdDLDJDQUN0QixvQkFBb0Isa0JBQWtCLG1CQUNoRCxPQUFPLFlBQVksS0FBSyxDQUMxQjtBQUVBLFFBQUk7QUFFRixZQUFNLHdCQUNKLFNBQ0E7QUFBQSxXQUNLO0FBQUEsUUFDSCxlQUFlO0FBQUEsTUFDakIsR0FDQSxFQUFFLE1BQU0sTUFBTSxDQUNoQjtBQUNBLFVBQUksU0FBUztBQUNYLGNBQU0sWUFBWSxRQUFRLFlBQVk7QUFBQSxVQUNwQyxTQUFTLE9BQU8sV0FBVyxRQUFRLEtBQUssZUFBZSxFQUFFLFNBQVM7QUFBQSxRQUNwRSxDQUFDO0FBQUEsTUFDSDtBQUVBLFlBQU0sWUFBWTtBQUFBLFdBQ2I7QUFBQSxRQUNILFNBQVM7QUFBQSxRQUNULFVBQVU7QUFBQSxRQUNWLFdBQ0UsS0FBSyxJQUFJLElBQUssZUFBYyxtQkFBbUIsY0FBYztBQUFBLE1BQ2pFO0FBRUEsWUFBTSwwQkFBMEIsU0FBUztBQUFBLElBQzNDLFVBQUU7QUFDQSxhQUFPLDhCQUE4QjtBQUNyQyxxQkFBZTtBQUFBLElBQ2pCO0FBQUEsRUFDRjtBQUNGO0FBckllLEFBdUlmLDBCQUNFLFNBQ0EsSUFDZTtBQUNmLE1BQUksU0FBUztBQUNYLFdBQU8sS0FBSywrQ0FBK0MsSUFBSTtBQUMvRCxVQUFNLFlBQVksUUFBUSxZQUFZO0FBQUEsTUFDcEMsU0FBUyxPQUFPLFdBQVcsUUFBUSxLQUFLLGVBQWUsRUFBRSxTQUFTO0FBQUEsSUFDcEUsQ0FBQztBQUFBLEVBQ0g7QUFFQSxRQUFNLDRCQUE0QixFQUFFO0FBQ3BDLFNBQU8sOEJBQThCO0FBQ3JDLGlCQUFlO0FBQ2pCO0FBZGUsQUFnQmYsNkJBQXFDO0FBQ25DLFNBQU8sT0FBTyxLQUFLLDZCQUE2QixFQUFFO0FBQ3BEO0FBRlMsQUFJVCx5Q0FDRSxZQUNnQjtBQUNoQixTQUFPO0FBQUEsT0FDRix3QkFBSyxZQUFZLENBQUMsT0FBTyxVQUFVLElBQUksQ0FBQztBQUFBLElBQzNDLE9BQU87QUFBQSxFQUNUO0FBQ0Y7QUFQUyxBQVNULHlDQUNFLFlBQ2dCO0FBQ2hCLFNBQU8sS0FBSyxZQUFZLE9BQU8sS0FBSztBQUN0QztBQUpTLEFBTVQsdUNBQ0UsU0FDQSxZQUNBLEVBQUUsTUFBTSxTQUNPO0FBQ2YsTUFBSSxDQUFDLFNBQVM7QUFDWjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLFlBQVksR0FBRyxRQUFRLGFBQWEsWUFBWSxnQkFBZ0I7QUFFdEUsTUFBSSxTQUFTLGdCQUFnQjtBQUUzQixRQUFJLENBQUMsV0FBVyxNQUFNO0FBQ3BCLGNBQVEsSUFBSTtBQUFBLFFBQ1YsZ0JBQWdCO0FBQUEsTUFDbEIsQ0FBQztBQUNEO0FBQUEsSUFDRjtBQUVBLFFBQUk7QUFDRixZQUFNLEVBQUUsU0FBUyxNQUFNLE9BQU8sT0FBTyxXQUFXLG1CQUM5QyxVQUNGO0FBQ0EsY0FBUSxJQUFJO0FBQUEsUUFDVixNQUFNLE1BQU0sU0FBUyxJQUFJO0FBQUEsUUFDekIsZ0JBQWdCO0FBQUEsTUFDbEIsQ0FBQztBQUFBLElBQ0gsVUFBRTtBQUNBLFVBQUksV0FBVyxNQUFNO0FBQ25CLGVBQU8sT0FBTyxXQUFXLHFCQUFxQixXQUFXLElBQUk7QUFBQSxNQUMvRDtBQUFBLElBQ0Y7QUFDQTtBQUFBLEVBQ0Y7QUFFQSxNQUFJLFNBQVMsY0FBYztBQUN6QixVQUFNLGNBQWMsUUFBUSxJQUFJLGFBQWE7QUFDN0MsUUFBSSxDQUFDLGVBQWUsWUFBWSxVQUFVLE9BQU87QUFDL0MsWUFBTSxJQUFJLE1BQ1Isd0RBQXdELHFCQUMxRDtBQUFBLElBQ0Y7QUFDQSx3QkFBb0IsYUFBYSxNQUFNLFNBQVMsR0FBRyxTQUFTO0FBRTVELFVBQU0saUJBQWlCLENBQUMsR0FBRyxXQUFXO0FBQ3RDLG1CQUFlLFNBQVM7QUFFeEIsWUFBUSxJQUFJLEVBQUUsYUFBYSxlQUFlLENBQUM7QUFFM0M7QUFBQSxFQUNGO0FBRUEsTUFBSSxTQUFTLFdBQVc7QUFDdEIsVUFBTSxVQUFVLFFBQVEsSUFBSSxTQUFTO0FBQ3JDLFFBQUksQ0FBQyxXQUFXLFFBQVEsVUFBVSxPQUFPO0FBQ3ZDLFlBQU0sSUFBSSxNQUNSLG9EQUFvRCxxQkFDdEQ7QUFBQSxJQUNGO0FBQ0EsVUFBTSxPQUFPLFFBQVE7QUFDckIsUUFBSSxDQUFDLE1BQU07QUFDVCxZQUFNLElBQUksTUFBTSxvQ0FBb0Msa0JBQWtCO0FBQUEsSUFDeEU7QUFFQSx3QkFBb0IsTUFBTSxTQUFTLFNBQVM7QUFFNUMsVUFBTSxhQUFhLENBQUMsR0FBRyxPQUFPO0FBQzlCLGVBQVcsU0FBUztBQUFBLFNBQ2YsUUFBUTtBQUFBLE1BQ1gsT0FBTztBQUFBLElBQ1Q7QUFFQSxZQUFRLElBQUksRUFBRSxTQUFTLFdBQVcsQ0FBQztBQUVuQztBQUFBLEVBQ0Y7QUFFQSxNQUFJLFNBQVMsV0FBVztBQUN0QixVQUFNLFVBQVUsUUFBUSxJQUFJLFNBQVM7QUFDckMsUUFBSSxDQUFDLFdBQVcsUUFBUSxVQUFVLE9BQU87QUFDdkMsWUFBTSxJQUFJLE1BQ1Isb0RBQW9ELHFCQUN0RDtBQUFBLElBQ0Y7QUFDQSxVQUFNLE9BQU8sUUFBUTtBQUNyQixRQUFJLFFBQVEsS0FBSyxVQUFVLEtBQUssT0FBTyxRQUFRO0FBQzdDLDBCQUFvQixLQUFLLFFBQVEsVUFBVSxTQUFTO0FBRXBELFlBQU0sYUFBYSxDQUFDLEdBQUcsT0FBTztBQUM5QixpQkFBVyxTQUFTO0FBQUEsV0FDZjtBQUFBLFFBQ0gsUUFBUTtBQUFBLGFBQ0gsS0FBSztBQUFBLFVBQ1IsUUFBUTtBQUFBLFFBQ1Y7QUFBQSxNQUNGO0FBRUEsY0FBUSxJQUFJLEVBQUUsU0FBUyxXQUFXLENBQUM7QUFBQSxJQUNyQyxPQUFPO0FBQ0wsYUFBTyxLQUNMLHVGQUF1RixRQUFRLGFBQWEsR0FDOUc7QUFBQSxJQUNGO0FBRUE7QUFBQSxFQUNGO0FBRUEsTUFBSSxTQUFTLFNBQVM7QUFDcEIsVUFBTSxRQUFRLFFBQVEsSUFBSSxPQUFPO0FBQ2pDLFFBQUksQ0FBQyxPQUFPO0FBQ1YsWUFBTSxJQUFJLE1BQU0sNkNBQTZDO0FBQUEsSUFDL0Q7QUFDQSxVQUFNLEVBQUUsZ0JBQWdCO0FBQ3hCLFFBQUksQ0FBQyxlQUFlLFlBQVksVUFBVSxPQUFPO0FBQy9DLFlBQU0sSUFBSSxNQUNSLDhEQUE4RCxxQkFDaEU7QUFBQSxJQUNGO0FBRUEsVUFBTSxPQUFPLFlBQVk7QUFDekIsUUFBSSxDQUFDLE1BQU07QUFDVCxZQUFNLElBQUksTUFDUiw2Q0FBNkMsa0JBQy9DO0FBQUEsSUFDRjtBQUVBLHdCQUFvQixNQUFNLGFBQWEsU0FBUztBQUVoRCxVQUFNLGlCQUFpQixDQUFDLEdBQUcsV0FBVztBQUN0QyxtQkFBZSxTQUFTO0FBQUEsU0FDbkIsWUFBWTtBQUFBLE1BQ2YsV0FBVztBQUFBLElBQ2I7QUFFQSxVQUFNLFdBQVc7QUFBQSxTQUNaO0FBQUEsTUFDSCxhQUFhO0FBQUEsSUFDZjtBQUVBLFlBQVEsSUFBSSxFQUFFLE9BQU8sU0FBUyxDQUFDO0FBRS9CO0FBQUEsRUFDRjtBQUVBLE1BQUksU0FBUyxXQUFXO0FBQ3RCLFVBQU0sVUFBVSxRQUFRLElBQUksU0FBUztBQUNyQyxRQUFJLENBQUMsU0FBUztBQUNaLFlBQU0sSUFBSSxNQUFNLCtDQUErQztBQUFBLElBQ2pFO0FBRUEsWUFBUSxJQUFJO0FBQUEsTUFDVixTQUFTO0FBQUEsV0FDSjtBQUFBLFFBQ0gsTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGLENBQUM7QUFDRDtBQUFBLEVBQ0Y7QUFFQSxRQUFNLElBQUksTUFDUiw2Q0FBNkMsb0JBQW9CLFFBQVEsYUFBYSxHQUN4RjtBQUNGO0FBbktlLEFBcUtmLDZCQUVFLFFBQ0EsS0FDQSxXQUNNO0FBQ04sUUFBTSxnQkFBZ0IsT0FBTztBQUM3QixNQUFJLGlCQUFpQixjQUFjLE1BQU07QUFDdkMsV0FBTyxNQUNMLHdCQUF3Qiw0REFDMUI7QUFDQSxVQUFNLElBQUksTUFDUixxRUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQWZTIiwKICAibmFtZXMiOiBbXQp9Cg==
