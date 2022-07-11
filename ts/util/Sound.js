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
var Sound_exports = {};
__export(Sound_exports, {
  Sound: () => Sound
});
module.exports = __toCommonJS(Sound_exports);
var log = __toESM(require("../logging/log"));
const _Sound = class {
  constructor(options) {
    this.context = new AudioContext();
    this.loop = Boolean(options.loop);
    this.src = options.src;
  }
  async play() {
    if (!_Sound.sounds.has(this.src)) {
      try {
        const buffer = await _Sound.loadSoundFile(this.src);
        const decodedBuffer = await this.context.decodeAudioData(buffer);
        _Sound.sounds.set(this.src, decodedBuffer);
      } catch (err) {
        log.error(`Sound error: ${err}`);
        return;
      }
    }
    const soundBuffer = _Sound.sounds.get(this.src);
    const soundNode = this.context.createBufferSource();
    soundNode.buffer = soundBuffer;
    const volumeNode = this.context.createGain();
    soundNode.connect(volumeNode);
    volumeNode.connect(this.context.destination);
    soundNode.loop = this.loop;
    soundNode.start(0, 0);
    this.node = soundNode;
  }
  stop() {
    if (this.node) {
      this.node.stop(0);
      this.node = void 0;
    }
  }
  static async loadSoundFile(src) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", src, true);
    xhr.responseType = "arraybuffer";
    return new Promise((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
          return;
        }
        reject(new Error(`Request failed: ${xhr.statusText}`));
      };
      xhr.onerror = () => {
        reject(new Error(`Request failed, most likely file not found: ${src}`));
      };
      xhr.send();
    });
  }
};
let Sound = _Sound;
Sound.sounds = /* @__PURE__ */ new Map();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Sound
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU291bmQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcblxuZXhwb3J0IHR5cGUgU291bmRPcHRzID0ge1xuICBsb29wPzogYm9vbGVhbjtcbiAgc3JjOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY2xhc3MgU291bmQge1xuICBzdGF0aWMgc291bmRzID0gbmV3IE1hcCgpO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGxvb3A6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBub2RlPzogQXVkaW9CdWZmZXJTb3VyY2VOb2RlO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgc3JjOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogU291bmRPcHRzKSB7XG4gICAgdGhpcy5sb29wID0gQm9vbGVhbihvcHRpb25zLmxvb3ApO1xuICAgIHRoaXMuc3JjID0gb3B0aW9ucy5zcmM7XG4gIH1cblxuICBhc3luYyBwbGF5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghU291bmQuc291bmRzLmhhcyh0aGlzLnNyYykpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IFNvdW5kLmxvYWRTb3VuZEZpbGUodGhpcy5zcmMpO1xuICAgICAgICBjb25zdCBkZWNvZGVkQnVmZmVyID0gYXdhaXQgdGhpcy5jb250ZXh0LmRlY29kZUF1ZGlvRGF0YShidWZmZXIpO1xuICAgICAgICBTb3VuZC5zb3VuZHMuc2V0KHRoaXMuc3JjLCBkZWNvZGVkQnVmZmVyKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2cuZXJyb3IoYFNvdW5kIGVycm9yOiAke2Vycn1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNvdW5kQnVmZmVyID0gU291bmQuc291bmRzLmdldCh0aGlzLnNyYyk7XG5cbiAgICBjb25zdCBzb3VuZE5vZGUgPSB0aGlzLmNvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgc291bmROb2RlLmJ1ZmZlciA9IHNvdW5kQnVmZmVyO1xuXG4gICAgY29uc3Qgdm9sdW1lTm9kZSA9IHRoaXMuY29udGV4dC5jcmVhdGVHYWluKCk7XG4gICAgc291bmROb2RlLmNvbm5lY3Qodm9sdW1lTm9kZSk7XG4gICAgdm9sdW1lTm9kZS5jb25uZWN0KHRoaXMuY29udGV4dC5kZXN0aW5hdGlvbik7XG5cbiAgICBzb3VuZE5vZGUubG9vcCA9IHRoaXMubG9vcDtcblxuICAgIHNvdW5kTm9kZS5zdGFydCgwLCAwKTtcblxuICAgIHRoaXMubm9kZSA9IHNvdW5kTm9kZTtcbiAgfVxuXG4gIHN0b3AoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubm9kZSkge1xuICAgICAgdGhpcy5ub2RlLnN0b3AoMCk7XG4gICAgICB0aGlzLm5vZGUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIGxvYWRTb3VuZEZpbGUoc3JjOiBzdHJpbmcpOiBQcm9taXNlPEFycmF5QnVmZmVyPiB7XG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICB4aHIub3BlbignR0VUJywgc3JjLCB0cnVlKTtcbiAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB4aHIub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFJlcXVlc3QgZmFpbGVkOiAke3hoci5zdGF0dXNUZXh0fWApKTtcbiAgICAgIH07XG4gICAgICB4aHIub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgUmVxdWVzdCBmYWlsZWQsIG1vc3QgbGlrZWx5IGZpbGUgbm90IGZvdW5kOiAke3NyY31gKSk7XG4gICAgICB9O1xuICAgICAgeGhyLnNlbmQoKTtcbiAgICB9KTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFVBQXFCO0FBT2QscUJBQVk7QUFBQSxFQVdqQixZQUFZLFNBQW9CO0FBUmYsbUJBQVUsSUFBSSxhQUFhO0FBUzFDLFNBQUssT0FBTyxRQUFRLFFBQVEsSUFBSTtBQUNoQyxTQUFLLE1BQU0sUUFBUTtBQUFBLEVBQ3JCO0FBQUEsUUFFTSxPQUFzQjtBQUMxQixRQUFJLENBQUMsT0FBTSxPQUFPLElBQUksS0FBSyxHQUFHLEdBQUc7QUFDL0IsVUFBSTtBQUNGLGNBQU0sU0FBUyxNQUFNLE9BQU0sY0FBYyxLQUFLLEdBQUc7QUFDakQsY0FBTSxnQkFBZ0IsTUFBTSxLQUFLLFFBQVEsZ0JBQWdCLE1BQU07QUFDL0QsZUFBTSxPQUFPLElBQUksS0FBSyxLQUFLLGFBQWE7QUFBQSxNQUMxQyxTQUFTLEtBQVA7QUFDQSxZQUFJLE1BQU0sZ0JBQWdCLEtBQUs7QUFDL0I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVBLFVBQU0sY0FBYyxPQUFNLE9BQU8sSUFBSSxLQUFLLEdBQUc7QUFFN0MsVUFBTSxZQUFZLEtBQUssUUFBUSxtQkFBbUI7QUFDbEQsY0FBVSxTQUFTO0FBRW5CLFVBQU0sYUFBYSxLQUFLLFFBQVEsV0FBVztBQUMzQyxjQUFVLFFBQVEsVUFBVTtBQUM1QixlQUFXLFFBQVEsS0FBSyxRQUFRLFdBQVc7QUFFM0MsY0FBVSxPQUFPLEtBQUs7QUFFdEIsY0FBVSxNQUFNLEdBQUcsQ0FBQztBQUVwQixTQUFLLE9BQU87QUFBQSxFQUNkO0FBQUEsRUFFQSxPQUFhO0FBQ1gsUUFBSSxLQUFLLE1BQU07QUFDYixXQUFLLEtBQUssS0FBSyxDQUFDO0FBQ2hCLFdBQUssT0FBTztBQUFBLElBQ2Q7QUFBQSxFQUNGO0FBQUEsZUFFYSxjQUFjLEtBQW1DO0FBQzVELFVBQU0sTUFBTSxJQUFJLGVBQWU7QUFFL0IsUUFBSSxLQUFLLE9BQU8sS0FBSyxJQUFJO0FBQ3pCLFFBQUksZUFBZTtBQUVuQixXQUFPLElBQUksUUFBUSxDQUFDLFNBQVMsV0FBVztBQUN0QyxVQUFJLFNBQVMsTUFBTTtBQUNqQixZQUFJLElBQUksV0FBVyxLQUFLO0FBQ3RCLGtCQUFRLElBQUksUUFBUTtBQUNwQjtBQUFBLFFBQ0Y7QUFFQSxlQUFPLElBQUksTUFBTSxtQkFBbUIsSUFBSSxZQUFZLENBQUM7QUFBQSxNQUN2RDtBQUNBLFVBQUksVUFBVSxNQUFNO0FBQ2xCLGVBQU8sSUFBSSxNQUFNLCtDQUErQyxLQUFLLENBQUM7QUFBQSxNQUN4RTtBQUNBLFVBQUksS0FBSztBQUFBLElBQ1gsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQXhFTztBQUNFLEFBREYsTUFDRSxTQUFTLG9CQUFJLElBQUk7IiwKICAibmFtZXMiOiBbXQp9Cg==
