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
var handleAttachmentsProcessing_exports = {};
__export(handleAttachmentsProcessing_exports, {
  handleAttachmentsProcessing: () => handleAttachmentsProcessing
});
module.exports = __toCommonJS(handleAttachmentsProcessing_exports);
var import_processAttachment = require("./processAttachment");
var import_AttachmentToastType = require("../types/AttachmentToastType");
var log = __toESM(require("../logging/log"));
async function handleAttachmentsProcessing({
  addAttachment,
  addPendingAttachment,
  conversationId,
  draftAttachments,
  files,
  onShowToast,
  removeAttachment
}) {
  if (!files.length) {
    return;
  }
  const nextDraftAttachments = [...draftAttachments];
  const filesToProcess = [];
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    const processingResult = (0, import_processAttachment.preProcessAttachment)(file, nextDraftAttachments);
    if (processingResult) {
      onShowToast(processingResult);
    } else {
      const pendingAttachment = (0, import_processAttachment.getPendingAttachment)(file);
      if (pendingAttachment) {
        addPendingAttachment(conversationId, pendingAttachment);
        filesToProcess.push(file);
        nextDraftAttachments.push(pendingAttachment);
      }
    }
  }
  await Promise.all(filesToProcess.map(async (file) => {
    try {
      const attachment = await (0, import_processAttachment.processAttachment)(file);
      if (!attachment) {
        removeAttachment(conversationId, file.path);
        return;
      }
      addAttachment(conversationId, attachment);
    } catch (err) {
      log.error("handleAttachmentsProcessing: failed to process attachment:", err.stack);
      removeAttachment(conversationId, file.path);
      onShowToast(import_AttachmentToastType.AttachmentToastType.ToastUnableToLoadAttachment);
    }
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleAttachmentsProcessing
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaGFuZGxlQXR0YWNobWVudHNQcm9jZXNzaW5nLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7XG4gIGdldFBlbmRpbmdBdHRhY2htZW50LFxuICBwcmVQcm9jZXNzQXR0YWNobWVudCxcbiAgcHJvY2Vzc0F0dGFjaG1lbnQsXG59IGZyb20gJy4vcHJvY2Vzc0F0dGFjaG1lbnQnO1xuaW1wb3J0IHR5cGUge1xuICBBdHRhY2htZW50RHJhZnRUeXBlLFxuICBJbk1lbW9yeUF0dGFjaG1lbnREcmFmdFR5cGUsXG59IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHsgQXR0YWNobWVudFRvYXN0VHlwZSB9IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnRUb2FzdFR5cGUnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcblxuZXhwb3J0IHR5cGUgQWRkQXR0YWNobWVudEFjdGlvblR5cGUgPSAoXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIGF0dGFjaG1lbnQ6IEluTWVtb3J5QXR0YWNobWVudERyYWZ0VHlwZVxuKSA9PiB1bmtub3duO1xuZXhwb3J0IHR5cGUgQWRkUGVuZGluZ0F0dGFjaG1lbnRBY3Rpb25UeXBlID0gKFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICBwZW5kaW5nQXR0YWNobWVudDogQXR0YWNobWVudERyYWZ0VHlwZVxuKSA9PiB1bmtub3duO1xuZXhwb3J0IHR5cGUgUmVtb3ZlQXR0YWNobWVudEFjdGlvblR5cGUgPSAoXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIGZpbGVQYXRoOiBzdHJpbmdcbikgPT4gdW5rbm93bjtcblxuZXhwb3J0IHR5cGUgSGFuZGxlQXR0YWNobWVudHNQcm9jZXNzaW5nQXJnc1R5cGUgPSB7XG4gIGFkZEF0dGFjaG1lbnQ6IEFkZEF0dGFjaG1lbnRBY3Rpb25UeXBlO1xuICBhZGRQZW5kaW5nQXR0YWNobWVudDogQWRkUGVuZGluZ0F0dGFjaG1lbnRBY3Rpb25UeXBlO1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICBkcmFmdEF0dGFjaG1lbnRzOiBSZWFkb25seUFycmF5PEF0dGFjaG1lbnREcmFmdFR5cGU+O1xuICBmaWxlczogUmVhZG9ubHlBcnJheTxGaWxlPjtcbiAgb25TaG93VG9hc3Q6ICh0b2FzdFR5cGU6IEF0dGFjaG1lbnRUb2FzdFR5cGUpID0+IHVua25vd247XG4gIHJlbW92ZUF0dGFjaG1lbnQ6IFJlbW92ZUF0dGFjaG1lbnRBY3Rpb25UeXBlO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUF0dGFjaG1lbnRzUHJvY2Vzc2luZyh7XG4gIGFkZEF0dGFjaG1lbnQsXG4gIGFkZFBlbmRpbmdBdHRhY2htZW50LFxuICBjb252ZXJzYXRpb25JZCxcbiAgZHJhZnRBdHRhY2htZW50cyxcbiAgZmlsZXMsXG4gIG9uU2hvd1RvYXN0LFxuICByZW1vdmVBdHRhY2htZW50LFxufTogSGFuZGxlQXR0YWNobWVudHNQcm9jZXNzaW5nQXJnc1R5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCFmaWxlcy5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBuZXh0RHJhZnRBdHRhY2htZW50cyA9IFsuLi5kcmFmdEF0dGFjaG1lbnRzXTtcbiAgY29uc3QgZmlsZXNUb1Byb2Nlc3M6IEFycmF5PEZpbGU+ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBmaWxlID0gZmlsZXNbaV07XG4gICAgY29uc3QgcHJvY2Vzc2luZ1Jlc3VsdCA9IHByZVByb2Nlc3NBdHRhY2htZW50KGZpbGUsIG5leHREcmFmdEF0dGFjaG1lbnRzKTtcbiAgICBpZiAocHJvY2Vzc2luZ1Jlc3VsdCkge1xuICAgICAgb25TaG93VG9hc3QocHJvY2Vzc2luZ1Jlc3VsdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBlbmRpbmdBdHRhY2htZW50ID0gZ2V0UGVuZGluZ0F0dGFjaG1lbnQoZmlsZSk7XG4gICAgICBpZiAocGVuZGluZ0F0dGFjaG1lbnQpIHtcbiAgICAgICAgYWRkUGVuZGluZ0F0dGFjaG1lbnQoY29udmVyc2F0aW9uSWQsIHBlbmRpbmdBdHRhY2htZW50KTtcbiAgICAgICAgZmlsZXNUb1Byb2Nlc3MucHVzaChmaWxlKTtcbiAgICAgICAgLy8gd2Uga2VlcCBhIHJ1bm5pbmcgY291bnQgb2YgdGhlIGRyYWZ0IGF0dGFjaG1lbnRzIHNvIHdlIGNhbiBzaG93IGFcbiAgICAgICAgLy8gdG9hc3QgaW4gY2FzZSB3ZSBhZGQgdG9vIG1hbnkgYXR0YWNobWVudHMgYXQgb25jZVxuICAgICAgICBuZXh0RHJhZnRBdHRhY2htZW50cy5wdXNoKHBlbmRpbmdBdHRhY2htZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICBmaWxlc1RvUHJvY2Vzcy5tYXAoYXN5bmMgZmlsZSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBhdHRhY2htZW50ID0gYXdhaXQgcHJvY2Vzc0F0dGFjaG1lbnQoZmlsZSk7XG4gICAgICAgIGlmICghYXR0YWNobWVudCkge1xuICAgICAgICAgIHJlbW92ZUF0dGFjaG1lbnQoY29udmVyc2F0aW9uSWQsIGZpbGUucGF0aCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGFkZEF0dGFjaG1lbnQoY29udmVyc2F0aW9uSWQsIGF0dGFjaG1lbnQpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAnaGFuZGxlQXR0YWNobWVudHNQcm9jZXNzaW5nOiBmYWlsZWQgdG8gcHJvY2VzcyBhdHRhY2htZW50OicsXG4gICAgICAgICAgZXJyLnN0YWNrXG4gICAgICAgICk7XG4gICAgICAgIHJlbW92ZUF0dGFjaG1lbnQoY29udmVyc2F0aW9uSWQsIGZpbGUucGF0aCk7XG4gICAgICAgIG9uU2hvd1RvYXN0KEF0dGFjaG1lbnRUb2FzdFR5cGUuVG9hc3RVbmFibGVUb0xvYWRBdHRhY2htZW50KTtcbiAgICAgIH1cbiAgICB9KVxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLCtCQUlPO0FBS1AsaUNBQW9DO0FBQ3BDLFVBQXFCO0FBeUJyQiwyQ0FBa0Q7QUFBQSxFQUNoRDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBQ3FEO0FBQ3JELE1BQUksQ0FBQyxNQUFNLFFBQVE7QUFDakI7QUFBQSxFQUNGO0FBRUEsUUFBTSx1QkFBdUIsQ0FBQyxHQUFHLGdCQUFnQjtBQUNqRCxRQUFNLGlCQUE4QixDQUFDO0FBQ3JDLFdBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUssR0FBRztBQUN4QyxVQUFNLE9BQU8sTUFBTTtBQUNuQixVQUFNLG1CQUFtQixtREFBcUIsTUFBTSxvQkFBb0I7QUFDeEUsUUFBSSxrQkFBa0I7QUFDcEIsa0JBQVksZ0JBQWdCO0FBQUEsSUFDOUIsT0FBTztBQUNMLFlBQU0sb0JBQW9CLG1EQUFxQixJQUFJO0FBQ25ELFVBQUksbUJBQW1CO0FBQ3JCLDZCQUFxQixnQkFBZ0IsaUJBQWlCO0FBQ3RELHVCQUFlLEtBQUssSUFBSTtBQUd4Qiw2QkFBcUIsS0FBSyxpQkFBaUI7QUFBQSxNQUM3QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxRQUFRLElBQ1osZUFBZSxJQUFJLE9BQU0sU0FBUTtBQUMvQixRQUFJO0FBQ0YsWUFBTSxhQUFhLE1BQU0sZ0RBQWtCLElBQUk7QUFDL0MsVUFBSSxDQUFDLFlBQVk7QUFDZix5QkFBaUIsZ0JBQWdCLEtBQUssSUFBSTtBQUMxQztBQUFBLE1BQ0Y7QUFDQSxvQkFBYyxnQkFBZ0IsVUFBVTtBQUFBLElBQzFDLFNBQVMsS0FBUDtBQUNBLFVBQUksTUFDRiw4REFDQSxJQUFJLEtBQ047QUFDQSx1QkFBaUIsZ0JBQWdCLEtBQUssSUFBSTtBQUMxQyxrQkFBWSwrQ0FBb0IsMkJBQTJCO0FBQUEsSUFDN0Q7QUFBQSxFQUNGLENBQUMsQ0FDSDtBQUNGO0FBbkRzQiIsCiAgIm5hbWVzIjogW10KfQo=
