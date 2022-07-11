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
var audioRecorder_exports = {};
__export(audioRecorder_exports, {
  RecorderClass: () => RecorderClass,
  recorder: () => recorder
});
module.exports = __toCommonJS(audioRecorder_exports);
var import_requestMicrophonePermissions = require("../util/requestMicrophonePermissions");
var log = __toESM(require("../logging/log"));
class RecorderClass {
  clear() {
    this.blob = void 0;
    this.resolve = void 0;
    if (this.source) {
      this.source.disconnect();
      this.source = void 0;
    }
    if (this.recorder) {
      if (this.recorder.isRecording()) {
        this.recorder.cancelRecording();
      }
      this.recorder.worker.terminate();
      this.recorder = void 0;
    }
    this.input = void 0;
    this.stream = void 0;
    if (this.context) {
      this.context.close();
      this.context = void 0;
    }
  }
  async start() {
    const hasMicrophonePermission = await (0, import_requestMicrophonePermissions.requestMicrophonePermissions)(false);
    if (!hasMicrophonePermission) {
      log.info("Recorder/start: Microphone permission was denied, new audio recording not allowed.");
      return false;
    }
    this.clear();
    this.context = new AudioContext();
    this.input = this.context.createGain();
    this.recorder = new window.WebAudioRecorder(this.input, {
      encoding: "mp3",
      workerDir: "js/",
      options: {
        timeLimit: 60 + 3600
      }
    });
    this.recorder.onComplete = this.onComplete.bind(this);
    this.recorder.onError = this.onError.bind(this);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { mandatory: { googAutoGainControl: false } }
      });
      if (!this.context || !this.input) {
        const err = new Error("Recorder/getUserMedia/stream: Missing context or input!");
        this.onError(this.recorder, err);
        throw err;
      }
      this.source = this.context.createMediaStreamSource(stream);
      this.source.connect(this.input);
      this.stream = stream;
    } catch (err) {
      log.error("Recorder.onGetUserMediaError:", err && err.stack ? err.stack : err);
      this.clear();
      throw err;
    }
    if (this.recorder) {
      this.recorder.startRecording();
      return true;
    }
    return false;
  }
  async stop() {
    if (!this.recorder) {
      return;
    }
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
    if (this.blob) {
      return this.blob;
    }
    const promise = new Promise((resolve) => {
      this.resolve = resolve;
    });
    this.recorder.finishRecording();
    return promise;
  }
  onComplete(_recorder, blob) {
    this.blob = blob;
    this.resolve?.(blob);
  }
  onError(_recorder, error) {
    if (!this.recorder) {
      log.warn("Recorder/onError: Called with no recorder");
      return;
    }
    this.clear();
    log.error("Recorder/onError:", error && error.stack ? error.stack : error);
  }
  getBlob() {
    if (!this.blob) {
      throw new Error("no blob found");
    }
    return this.blob;
  }
}
const recorder = new RecorderClass();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RecorderClass,
  recorder
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXVkaW9SZWNvcmRlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTYtMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IHJlcXVlc3RNaWNyb3Bob25lUGVybWlzc2lvbnMgfSBmcm9tICcuLi91dGlsL3JlcXVlc3RNaWNyb3Bob25lUGVybWlzc2lvbnMnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB0eXBlIHsgV2ViQXVkaW9SZWNvcmRlckNsYXNzIH0gZnJvbSAnLi4vd2luZG93LmQnO1xuXG5leHBvcnQgY2xhc3MgUmVjb3JkZXJDbGFzcyB7XG4gIHByaXZhdGUgY29udGV4dD86IEF1ZGlvQ29udGV4dDtcbiAgcHJpdmF0ZSBpbnB1dD86IEdhaW5Ob2RlO1xuICBwcml2YXRlIHJlY29yZGVyPzogV2ViQXVkaW9SZWNvcmRlckNsYXNzO1xuICBwcml2YXRlIHNvdXJjZT86IE1lZGlhU3RyZWFtQXVkaW9Tb3VyY2VOb2RlO1xuICBwcml2YXRlIHN0cmVhbT86IE1lZGlhU3RyZWFtO1xuICBwcml2YXRlIGJsb2I/OiBCbG9iO1xuICBwcml2YXRlIHJlc29sdmU/OiAoYmxvYjogQmxvYikgPT4gdm9pZDtcblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLmJsb2IgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5yZXNvbHZlID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHRoaXMuc291cmNlKSB7XG4gICAgICB0aGlzLnNvdXJjZS5kaXNjb25uZWN0KCk7XG4gICAgICB0aGlzLnNvdXJjZSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZWNvcmRlcikge1xuICAgICAgaWYgKHRoaXMucmVjb3JkZXIuaXNSZWNvcmRpbmcoKSkge1xuICAgICAgICB0aGlzLnJlY29yZGVyLmNhbmNlbFJlY29yZGluZygpO1xuICAgICAgfVxuXG4gICAgICAvLyBSZWFjaCBpbiBhbmQgdGVybWluYXRlIHRoZSB3ZWIgd29ya2VyIHVzZWQgYnkgV2ViQXVkaW9SZWNvcmRlciwgb3RoZXJ3aXNlXG4gICAgICAvLyBpdCBnZXRzIGxlYWtlZCBkdWUgdG8gYSByZWZlcmVuY2UgY3ljbGUgd2l0aCBpdHMgb25tZXNzYWdlIGxpc3RlbmVyXG4gICAgICB0aGlzLnJlY29yZGVyLndvcmtlci50ZXJtaW5hdGUoKTtcbiAgICAgIHRoaXMucmVjb3JkZXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdGhpcy5pbnB1dCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnN0cmVhbSA9IHVuZGVmaW5lZDtcblxuICAgIGlmICh0aGlzLmNvbnRleHQpIHtcbiAgICAgIHRoaXMuY29udGV4dC5jbG9zZSgpO1xuICAgICAgdGhpcy5jb250ZXh0ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHN0YXJ0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGhhc01pY3JvcGhvbmVQZXJtaXNzaW9uID0gYXdhaXQgcmVxdWVzdE1pY3JvcGhvbmVQZXJtaXNzaW9ucyhmYWxzZSk7XG4gICAgaWYgKCFoYXNNaWNyb3Bob25lUGVybWlzc2lvbikge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgICdSZWNvcmRlci9zdGFydDogTWljcm9waG9uZSBwZXJtaXNzaW9uIHdhcyBkZW5pZWQsIG5ldyBhdWRpbyByZWNvcmRpbmcgbm90IGFsbG93ZWQuJ1xuICAgICAgKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmNsZWFyKCk7XG5cbiAgICB0aGlzLmNvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gICAgdGhpcy5pbnB1dCA9IHRoaXMuY29udGV4dC5jcmVhdGVHYWluKCk7XG5cbiAgICB0aGlzLnJlY29yZGVyID0gbmV3IHdpbmRvdy5XZWJBdWRpb1JlY29yZGVyKHRoaXMuaW5wdXQsIHtcbiAgICAgIGVuY29kaW5nOiAnbXAzJyxcbiAgICAgIHdvcmtlckRpcjogJ2pzLycsIC8vIG11c3QgZW5kIHdpdGggc2xhc2hcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgdGltZUxpbWl0OiA2MCArIDM2MDAsIC8vIG9uZSBtaW51dGUgbW9yZSB0aGFuIG91ciBVSS1pbXBvc2VkIGxpbWl0XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMucmVjb3JkZXIub25Db21wbGV0ZSA9IHRoaXMub25Db21wbGV0ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMucmVjb3JkZXIub25FcnJvciA9IHRoaXMub25FcnJvci5iaW5kKHRoaXMpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHtcbiAgICAgICAgLy8gVHlwZVNjcmlwdCBkb2Vzbid0IGtub3cgYWJvdXQgdGhlc2Ugb3B0aW9ucy5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgYXVkaW86IHsgbWFuZGF0b3J5OiB7IGdvb2dBdXRvR2FpbkNvbnRyb2w6IGZhbHNlIH0gfSBhcyBhbnksXG4gICAgICB9KTtcbiAgICAgIGlmICghdGhpcy5jb250ZXh0IHx8ICF0aGlzLmlucHV0KSB7XG4gICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAnUmVjb3JkZXIvZ2V0VXNlck1lZGlhL3N0cmVhbTogTWlzc2luZyBjb250ZXh0IG9yIGlucHV0ISdcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5vbkVycm9yKHRoaXMucmVjb3JkZXIsIGVycik7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICAgIHRoaXMuc291cmNlID0gdGhpcy5jb250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XG4gICAgICB0aGlzLnNvdXJjZS5jb25uZWN0KHRoaXMuaW5wdXQpO1xuICAgICAgdGhpcy5zdHJlYW0gPSBzdHJlYW07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgICdSZWNvcmRlci5vbkdldFVzZXJNZWRpYUVycm9yOicsXG4gICAgICAgIGVyciAmJiBlcnIuc3RhY2sgPyBlcnIuc3RhY2sgOiBlcnJcbiAgICAgICk7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVjb3JkZXIpIHtcbiAgICAgIHRoaXMucmVjb3JkZXIuc3RhcnRSZWNvcmRpbmcoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFzeW5jIHN0b3AoKTogUHJvbWlzZTxCbG9iIHwgdW5kZWZpbmVkPiB7XG4gICAgaWYgKCF0aGlzLnJlY29yZGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RyZWFtKSB7XG4gICAgICB0aGlzLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKHRyYWNrID0+IHRyYWNrLnN0b3AoKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYmxvYikge1xuICAgICAgcmV0dXJuIHRoaXMuYmxvYjtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2U8QmxvYj4ocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLnJlc29sdmUgPSByZXNvbHZlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5yZWNvcmRlci5maW5pc2hSZWNvcmRpbmcoKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgb25Db21wbGV0ZShfcmVjb3JkZXI6IFdlYkF1ZGlvUmVjb3JkZXJDbGFzcywgYmxvYjogQmxvYik6IHZvaWQge1xuICAgIHRoaXMuYmxvYiA9IGJsb2I7XG4gICAgdGhpcy5yZXNvbHZlPy4oYmxvYik7XG4gIH1cblxuICBvbkVycm9yKF9yZWNvcmRlcjogV2ViQXVkaW9SZWNvcmRlckNsYXNzLCBlcnJvcjogRXJyb3IpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmVjb3JkZXIpIHtcbiAgICAgIGxvZy53YXJuKCdSZWNvcmRlci9vbkVycm9yOiBDYWxsZWQgd2l0aCBubyByZWNvcmRlcicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY2xlYXIoKTtcblxuICAgIGxvZy5lcnJvcignUmVjb3JkZXIvb25FcnJvcjonLCBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3IpO1xuICB9XG5cbiAgZ2V0QmxvYigpOiBCbG9iIHtcbiAgICBpZiAoIXRoaXMuYmxvYikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBibG9iIGZvdW5kJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYmxvYjtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVjb3JkZXIgPSBuZXcgUmVjb3JkZXJDbGFzcygpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsMENBQTZDO0FBQzdDLFVBQXFCO0FBR2QsTUFBTSxjQUFjO0FBQUEsRUFTekIsUUFBYztBQUNaLFNBQUssT0FBTztBQUNaLFNBQUssVUFBVTtBQUVmLFFBQUksS0FBSyxRQUFRO0FBQ2YsV0FBSyxPQUFPLFdBQVc7QUFDdkIsV0FBSyxTQUFTO0FBQUEsSUFDaEI7QUFFQSxRQUFJLEtBQUssVUFBVTtBQUNqQixVQUFJLEtBQUssU0FBUyxZQUFZLEdBQUc7QUFDL0IsYUFBSyxTQUFTLGdCQUFnQjtBQUFBLE1BQ2hDO0FBSUEsV0FBSyxTQUFTLE9BQU8sVUFBVTtBQUMvQixXQUFLLFdBQVc7QUFBQSxJQUNsQjtBQUVBLFNBQUssUUFBUTtBQUNiLFNBQUssU0FBUztBQUVkLFFBQUksS0FBSyxTQUFTO0FBQ2hCLFdBQUssUUFB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
