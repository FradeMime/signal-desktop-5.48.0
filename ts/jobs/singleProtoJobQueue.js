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
var singleProtoJobQueue_exports = {};
__export(singleProtoJobQueue_exports, {
  SingleProtoJobQueue: () => SingleProtoJobQueue,
  singleProtoJobQueue: () => singleProtoJobQueue
});
module.exports = __toCommonJS(singleProtoJobQueue_exports);
var import_p_queue = __toESM(require("p-queue"));
var Bytes = __toESM(require("../Bytes"));
var import_exponentialBackoff = require("../util/exponentialBackoff");
var import_JobQueue = require("./JobQueue");
var import_JobQueueDatabaseStore = require("./JobQueueDatabaseStore");
var import_durations = require("../util/durations");
var import_commonShouldJobContinue = require("./helpers/commonShouldJobContinue");
var import_protobuf = require("../protobuf");
var import_handleMessageSend = require("../util/handleMessageSend");
var import_getSendOptions = require("../util/getSendOptions");
var import_SendMessage = require("../textsecure/SendMessage");
var import_handleMultipleSendErrors = require("./helpers/handleMultipleSendErrors");
var import_isConversationUnregistered = require("../util/isConversationUnregistered");
var import_isConversationAccepted = require("../util/isConversationAccepted");
const MAX_RETRY_TIME = import_durations.DAY;
const MAX_PARALLEL_JOBS = 5;
const MAX_ATTEMPTS = (0, import_exponentialBackoff.exponentialBackoffMaxAttempts)(MAX_RETRY_TIME);
class SingleProtoJobQueue extends import_JobQueue.JobQueue {
  constructor() {
    super(...arguments);
    this.parallelQueue = new import_p_queue.default({ concurrency: MAX_PARALLEL_JOBS });
  }
  getInMemoryQueue(_parsedJob) {
    return this.parallelQueue;
  }
  parseData(data) {
    return import_SendMessage.singleProtoJobDataSchema.parse(data);
  }
  async run({
    data,
    timestamp
  }, { attempt, log }) {
    const timeRemaining = timestamp + MAX_RETRY_TIME - Date.now();
    const isFinalAttempt = attempt >= MAX_ATTEMPTS;
    const shouldContinue = await (0, import_commonShouldJobContinue.commonShouldJobContinue)({
      attempt,
      log,
      timeRemaining,
      skipWait: false
    });
    if (!shouldContinue) {
      return;
    }
    const {
      contentHint,
      identifier,
      isSyncMessage,
      messageIds = [],
      protoBase64,
      type
    } = data;
    log.info(`starting ${type} send to ${identifier} with timestamp ${timestamp}`);
    const conversation = window.ConversationController.get(identifier);
    if (!conversation) {
      throw new Error(`Failed to get conversation for identifier ${identifier}`);
    }
    if (!(0, import_isConversationAccepted.isConversationAccepted)(conversation.attributes)) {
      log.info(`conversation ${conversation.idForLogging()} is not accepted; refusing to send`);
      return;
    }
    if ((0, import_isConversationUnregistered.isConversationUnregistered)(conversation.attributes)) {
      log.info(`conversation ${conversation.idForLogging()} is unregistered; refusing to send`);
      return;
    }
    if (conversation.isBlocked()) {
      log.info(`conversation ${conversation.idForLogging()} is blocked; refusing to send`);
      return;
    }
    const proto = import_protobuf.SignalService.Content.decode(Bytes.fromBase64(protoBase64));
    const options = await (0, import_getSendOptions.getSendOptions)(conversation.attributes, {
      syncMessage: isSyncMessage
    });
    const { messaging } = window.textsecure;
    if (!messaging) {
      throw new Error("messaging is not available!");
    }
    try {
      await (0, import_handleMessageSend.handleMessageSend)(messaging.sendIndividualProto({
        contentHint,
        identifier,
        options,
        proto,
        timestamp
      }), { messageIds, sendType: type });
    } catch (error) {
      await (0, import_handleMultipleSendErrors.handleMultipleSendErrors)({
        errors: (0, import_handleMultipleSendErrors.maybeExpandErrors)(error),
        isFinalAttempt,
        log,
        timeRemaining,
        toThrow: error
      });
    }
  }
}
const singleProtoJobQueue = new SingleProtoJobQueue({
  maxAttempts: MAX_ATTEMPTS,
  queueType: "single proto",
  store: import_JobQueueDatabaseStore.jobQueueDatabaseStore
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SingleProtoJobQueue,
  singleProtoJobQueue
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2luZ2xlUHJvdG9Kb2JRdWV1ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUFF1ZXVlIGZyb20gJ3AtcXVldWUnO1xuXG5pbXBvcnQgKiBhcyBCeXRlcyBmcm9tICcuLi9CeXRlcyc7XG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi90eXBlcy9Mb2dnaW5nJztcbmltcG9ydCB7IGV4cG9uZW50aWFsQmFja29mZk1heEF0dGVtcHRzIH0gZnJvbSAnLi4vdXRpbC9leHBvbmVudGlhbEJhY2tvZmYnO1xuaW1wb3J0IHR5cGUgeyBQYXJzZWRKb2IgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IEpvYlF1ZXVlIH0gZnJvbSAnLi9Kb2JRdWV1ZSc7XG5pbXBvcnQgeyBqb2JRdWV1ZURhdGFiYXNlU3RvcmUgfSBmcm9tICcuL0pvYlF1ZXVlRGF0YWJhc2VTdG9yZSc7XG5pbXBvcnQgeyBEQVkgfSBmcm9tICcuLi91dGlsL2R1cmF0aW9ucyc7XG5pbXBvcnQgeyBjb21tb25TaG91bGRKb2JDb250aW51ZSB9IGZyb20gJy4vaGVscGVycy9jb21tb25TaG91bGRKb2JDb250aW51ZSc7XG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vcHJvdG9idWYnO1xuaW1wb3J0IHsgaGFuZGxlTWVzc2FnZVNlbmQgfSBmcm9tICcuLi91dGlsL2hhbmRsZU1lc3NhZ2VTZW5kJztcbmltcG9ydCB7IGdldFNlbmRPcHRpb25zIH0gZnJvbSAnLi4vdXRpbC9nZXRTZW5kT3B0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFNpbmdsZVByb3RvSm9iRGF0YSB9IGZyb20gJy4uL3RleHRzZWN1cmUvU2VuZE1lc3NhZ2UnO1xuaW1wb3J0IHsgc2luZ2xlUHJvdG9Kb2JEYXRhU2NoZW1hIH0gZnJvbSAnLi4vdGV4dHNlY3VyZS9TZW5kTWVzc2FnZSc7XG5pbXBvcnQge1xuICBoYW5kbGVNdWx0aXBsZVNlbmRFcnJvcnMsXG4gIG1heWJlRXhwYW5kRXJyb3JzLFxufSBmcm9tICcuL2hlbHBlcnMvaGFuZGxlTXVsdGlwbGVTZW5kRXJyb3JzJztcbmltcG9ydCB7IGlzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkIH0gZnJvbSAnLi4vdXRpbC9pc0NvbnZlcnNhdGlvblVucmVnaXN0ZXJlZCc7XG5pbXBvcnQgeyBpc0NvbnZlcnNhdGlvbkFjY2VwdGVkIH0gZnJvbSAnLi4vdXRpbC9pc0NvbnZlcnNhdGlvbkFjY2VwdGVkJztcblxuY29uc3QgTUFYX1JFVFJZX1RJTUUgPSBEQVk7XG5jb25zdCBNQVhfUEFSQUxMRUxfSk9CUyA9IDU7XG5jb25zdCBNQVhfQVRURU1QVFMgPSBleHBvbmVudGlhbEJhY2tvZmZNYXhBdHRlbXB0cyhNQVhfUkVUUllfVElNRSk7XG5cbmV4cG9ydCBjbGFzcyBTaW5nbGVQcm90b0pvYlF1ZXVlIGV4dGVuZHMgSm9iUXVldWU8U2luZ2xlUHJvdG9Kb2JEYXRhPiB7XG4gIHByaXZhdGUgcGFyYWxsZWxRdWV1ZSA9IG5ldyBQUXVldWUoeyBjb25jdXJyZW5jeTogTUFYX1BBUkFMTEVMX0pPQlMgfSk7XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGdldEluTWVtb3J5UXVldWUoXG4gICAgX3BhcnNlZEpvYjogUGFyc2VkSm9iPFNpbmdsZVByb3RvSm9iRGF0YT5cbiAgKTogUFF1ZXVlIHtcbiAgICByZXR1cm4gdGhpcy5wYXJhbGxlbFF1ZXVlO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlRGF0YShkYXRhOiB1bmtub3duKTogU2luZ2xlUHJvdG9Kb2JEYXRhIHtcbiAgICByZXR1cm4gc2luZ2xlUHJvdG9Kb2JEYXRhU2NoZW1hLnBhcnNlKGRhdGEpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIHJ1bihcbiAgICB7XG4gICAgICBkYXRhLFxuICAgICAgdGltZXN0YW1wLFxuICAgIH06IFJlYWRvbmx5PHsgZGF0YTogU2luZ2xlUHJvdG9Kb2JEYXRhOyB0aW1lc3RhbXA6IG51bWJlciB9PixcbiAgICB7IGF0dGVtcHQsIGxvZyB9OiBSZWFkb25seTx7IGF0dGVtcHQ6IG51bWJlcjsgbG9nOiBMb2dnZXJUeXBlIH0+XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHRpbWVSZW1haW5pbmcgPSB0aW1lc3RhbXAgKyBNQVhfUkVUUllfVElNRSAtIERhdGUubm93KCk7XG4gICAgY29uc3QgaXNGaW5hbEF0dGVtcHQgPSBhdHRlbXB0ID49IE1BWF9BVFRFTVBUUztcblxuICAgIGNvbnN0IHNob3VsZENvbnRpbnVlID0gYXdhaXQgY29tbW9uU2hvdWxkSm9iQ29udGludWUoe1xuICAgICAgYXR0ZW1wdCxcbiAgICAgIGxvZyxcbiAgICAgIHRpbWVSZW1haW5pbmcsXG4gICAgICBza2lwV2FpdDogZmFsc2UsXG4gICAgfSk7XG4gICAgaWYgKCFzaG91bGRDb250aW51ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRlbnRIaW50LFxuICAgICAgaWRlbnRpZmllcixcbiAgICAgIGlzU3luY01lc3NhZ2UsXG4gICAgICBtZXNzYWdlSWRzID0gW10sXG4gICAgICBwcm90b0Jhc2U2NCxcbiAgICAgIHR5cGUsXG4gICAgfSA9IGRhdGE7XG4gICAgbG9nLmluZm8oXG4gICAgICBgc3RhcnRpbmcgJHt0eXBlfSBzZW5kIHRvICR7aWRlbnRpZmllcn0gd2l0aCB0aW1lc3RhbXAgJHt0aW1lc3RhbXB9YFxuICAgICk7XG5cbiAgICBjb25zdCBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoaWRlbnRpZmllcik7XG4gICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYEZhaWxlZCB0byBnZXQgY29udmVyc2F0aW9uIGZvciBpZGVudGlmaWVyICR7aWRlbnRpZmllcn1gXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghaXNDb252ZXJzYXRpb25BY2NlcHRlZChjb252ZXJzYXRpb24uYXR0cmlidXRlcykpIHtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICBgY29udmVyc2F0aW9uICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfSBpcyBub3QgYWNjZXB0ZWQ7IHJlZnVzaW5nIHRvIHNlbmRgXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNDb252ZXJzYXRpb25VbnJlZ2lzdGVyZWQoY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpKSB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgYGNvbnZlcnNhdGlvbiAke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX0gaXMgdW5yZWdpc3RlcmVkOyByZWZ1c2luZyB0byBzZW5kYFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNvbnZlcnNhdGlvbi5pc0Jsb2NrZWQoKSkge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgIGBjb252ZXJzYXRpb24gJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9IGlzIGJsb2NrZWQ7IHJlZnVzaW5nIHRvIHNlbmRgXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHByb3RvID0gUHJvdG8uQ29udGVudC5kZWNvZGUoQnl0ZXMuZnJvbUJhc2U2NChwcm90b0Jhc2U2NCkpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBhd2FpdCBnZXRTZW5kT3B0aW9ucyhjb252ZXJzYXRpb24uYXR0cmlidXRlcywge1xuICAgICAgc3luY01lc3NhZ2U6IGlzU3luY01lc3NhZ2UsXG4gICAgfSk7XG5cbiAgICBjb25zdCB7IG1lc3NhZ2luZyB9ID0gd2luZG93LnRleHRzZWN1cmU7XG4gICAgaWYgKCFtZXNzYWdpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWVzc2FnaW5nIGlzIG5vdCBhdmFpbGFibGUhJyk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGhhbmRsZU1lc3NhZ2VTZW5kKFxuICAgICAgICBtZXNzYWdpbmcuc2VuZEluZGl2aWR1YWxQcm90byh7XG4gICAgICAgICAgY29udGVudEhpbnQsXG4gICAgICAgICAgaWRlbnRpZmllcixcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgIHByb3RvLFxuICAgICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgfSksXG4gICAgICAgIHsgbWVzc2FnZUlkcywgc2VuZFR5cGU6IHR5cGUgfVxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgYXdhaXQgaGFuZGxlTXVsdGlwbGVTZW5kRXJyb3JzKHtcbiAgICAgICAgZXJyb3JzOiBtYXliZUV4cGFuZEVycm9ycyhlcnJvciksXG4gICAgICAgIGlzRmluYWxBdHRlbXB0LFxuICAgICAgICBsb2csXG4gICAgICAgIHRpbWVSZW1haW5pbmcsXG4gICAgICAgIHRvVGhyb3c6IGVycm9yLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBzaW5nbGVQcm90b0pvYlF1ZXVlID0gbmV3IFNpbmdsZVByb3RvSm9iUXVldWUoe1xuICBtYXhBdHRlbXB0czogTUFYX0FUVEVNUFRTLFxuICBxdWV1ZVR5cGU6ICdzaW5nbGUgcHJvdG8nLFxuICBzdG9yZTogam9iUXVldWVEYXRhYmFzZVN0b3JlLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxxQkFBbUI7QUFFbkIsWUFBdUI7QUFFdkIsZ0NBQThDO0FBRTlDLHNCQUF5QjtBQUN6QixtQ0FBc0M7QUFDdEMsdUJBQW9CO0FBQ3BCLHFDQUF3QztBQUN4QyxzQkFBdUM7QUFDdkMsK0JBQWtDO0FBQ2xDLDRCQUErQjtBQUUvQix5QkFBeUM7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
