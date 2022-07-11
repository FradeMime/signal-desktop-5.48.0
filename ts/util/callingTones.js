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
var callingTones_exports = {};
__export(callingTones_exports, {
  callingTones: () => callingTones
});
module.exports = __toCommonJS(callingTones_exports);
var import_p_queue = __toESM(require("p-queue"));
var import_Sound = require("./Sound");
const ringtoneEventQueue = new import_p_queue.default({
  concurrency: 1,
  timeout: 1e3 * 60 * 2,
  throwOnTimeout: true
});
class CallingTones {
  async playEndCall() {
    const canPlayTone = window.Events.getCallRingtoneNotification();
    if (!canPlayTone) {
      return;
    }
    const tone = new import_Sound.Sound({
      src: "sounds/navigation-cancel.ogg"
    });
    await tone.play();
  }
  async playRingtone() {
    await ringtoneEventQueue.add(async () => {
      if (this.ringtone) {
        this.ringtone.stop();
        this.ringtone = void 0;
      }
      const canPlayTone = window.Events.getCallRingtoneNotification();
      if (!canPlayTone) {
        return;
      }
      this.ringtone = new import_Sound.Sound({
        loop: true,
        src: "sounds/ringtone_minimal.ogg"
      });
      await this.ringtone.play();
    });
  }
  async stopRingtone() {
    await ringtoneEventQueue.add(async () => {
      if (this.ringtone) {
        this.ringtone.stop();
        this.ringtone = void 0;
      }
    });
  }
  async someonePresenting() {
    const canPlayTone = window.Events.getCallRingtoneNotification();
    if (!canPlayTone) {
      return;
    }
    const tone = new import_Sound.Sound({
      src: "sounds/navigation_selection-complete-celebration.ogg"
    });
    await tone.play();
  }
}
const callingTones = new CallingTones();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  callingTones
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2FsbGluZ1RvbmVzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFBRdWV1ZSBmcm9tICdwLXF1ZXVlJztcbmltcG9ydCB7IFNvdW5kIH0gZnJvbSAnLi9Tb3VuZCc7XG5cbmNvbnN0IHJpbmd0b25lRXZlbnRRdWV1ZSA9IG5ldyBQUXVldWUoe1xuICBjb25jdXJyZW5jeTogMSxcbiAgdGltZW91dDogMTAwMCAqIDYwICogMixcbiAgdGhyb3dPblRpbWVvdXQ6IHRydWUsXG59KTtcblxuY2xhc3MgQ2FsbGluZ1RvbmVzIHtcbiAgcHJpdmF0ZSByaW5ndG9uZT86IFNvdW5kO1xuXG4gIGFzeW5jIHBsYXlFbmRDYWxsKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGNhblBsYXlUb25lID0gd2luZG93LkV2ZW50cy5nZXRDYWxsUmluZ3RvbmVOb3RpZmljYXRpb24oKTtcbiAgICBpZiAoIWNhblBsYXlUb25lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdG9uZSA9IG5ldyBTb3VuZCh7XG4gICAgICBzcmM6ICdzb3VuZHMvbmF2aWdhdGlvbi1jYW5jZWwub2dnJyxcbiAgICB9KTtcbiAgICBhd2FpdCB0b25lLnBsYXkoKTtcbiAgfVxuXG4gIGFzeW5jIHBsYXlSaW5ndG9uZSgpIHtcbiAgICBhd2FpdCByaW5ndG9uZUV2ZW50UXVldWUuYWRkKGFzeW5jICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnJpbmd0b25lKSB7XG4gICAgICAgIHRoaXMucmluZ3RvbmUuc3RvcCgpO1xuICAgICAgICB0aGlzLnJpbmd0b25lID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjYW5QbGF5VG9uZSA9IHdpbmRvdy5FdmVudHMuZ2V0Q2FsbFJpbmd0b25lTm90aWZpY2F0aW9uKCk7XG4gICAgICBpZiAoIWNhblBsYXlUb25lKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yaW5ndG9uZSA9IG5ldyBTb3VuZCh7XG4gICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgIHNyYzogJ3NvdW5kcy9yaW5ndG9uZV9taW5pbWFsLm9nZycsXG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgdGhpcy5yaW5ndG9uZS5wbGF5KCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBzdG9wUmluZ3RvbmUoKSB7XG4gICAgYXdhaXQgcmluZ3RvbmVFdmVudFF1ZXVlLmFkZChhc3luYyAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5yaW5ndG9uZSkge1xuICAgICAgICB0aGlzLnJpbmd0b25lLnN0b3AoKTtcbiAgICAgICAgdGhpcy5yaW5ndG9uZSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHNvbWVvbmVQcmVzZW50aW5nKCkge1xuICAgIGNvbnN0IGNhblBsYXlUb25lID0gd2luZG93LkV2ZW50cy5nZXRDYWxsUmluZ3RvbmVOb3RpZmljYXRpb24oKTtcbiAgICBpZiAoIWNhblBsYXlUb25lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdG9uZSA9IG5ldyBTb3VuZCh7XG4gICAgICBzcmM6ICdzb3VuZHMvbmF2aWdhdGlvbl9zZWxlY3Rpb24tY29tcGxldGUtY2VsZWJyYXRpb24ub2dnJyxcbiAgICB9KTtcblxuICAgIGF3YWl0IHRvbmUucGxheSgpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBjYWxsaW5nVG9uZXMgPSBuZXcgQ2FsbGluZ1RvbmVzKCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EscUJBQW1CO0FBQ25CLG1CQUFzQjtBQUV0QixNQUFNLHFCQUFxQixJQUFJLHVCQUFPO0FBQUEsRUFDcEMsYUFBYTtBQUFBLEVBQ2IsU0FBUyxNQUFPLEtBQUs7QUFBQSxFQUNyQixnQkFBZ0I7QUFDbEIsQ0FBQztBQUVELE1BQU0sYUFBYTtBQUFBLFFBR1gsY0FBNkI7QUFDakMsVUFBTSxjQUFjLE9BQU8sT0FBTyw0QkFBNEI7QUFDOUQsUUFBSSxDQUFDLGFBQWE7QUFDaEI7QUFBQSxJQUNGO0FBRUEsVUFBTSxPQUFPLElBQUksbUJBQU07QUFBQSxNQUNyQixLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQ0QsVUFBTSxLQUFLLEtBQUs7QUFBQSxFQUNsQjtBQUFBLFFBRU0sZUFBZTtBQUNuQixVQUFNLG1CQUFtQixJQUFJLFlBQVk7QUFDdkMsVUFBSSxLQUFLLFVBQVU7QUFDakIsYUFBSyxTQUFTLEtBQUs7QUFDbkIsYUFBSyxXQUFXO0FBQUEsTUFDbEI7QUFFQSxZQUFNLGNBQWMsT0FBTyxPQUFPLDRCQUE0QjtBQUM5RCxVQUFJLENBQUMsYUFBYTtBQUNoQjtBQUFBLE1BQ0Y7QUFFQSxXQUFLLFdBQVcsSUFBSSxtQkFBTTtBQUFBLFFBQ3hCLE1BQU07QUFBQSxRQUNOLEtBQUs7QUFBQSxNQUNQLENBQUM7QUFFRCxZQUFNLEtBQUssU0FBUyxLQUFLO0FBQUEsSUFDM0IsQ0FBQztBQUFBLEVBQ0g7QUFBQSxRQUVNLGVBQWU7QUFDbkIsVUFBTSxtQkFBbUIsSUFBSSxZQUFZO0FBQ3ZDLFVBQUksS0FBSyxVQUFVO0FBQ2pCLGFBQUssU0FBUyxLQUFLO0FBQ25CLGFBQUssV0FBVztBQUFBLE1BQ2xCO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLFFBRU0sb0JBQW9CO0FBQ3hCLFVBQU0sY0FBYyxPQUFPLE9BQU8sNEJBQTRCO0FBQzlELFFBQUksQ0FBQyxhQUFhO0FBQ2hCO0FBQUEsSUFDRjtBQUVBLFVBQU0sT0FBTyxJQUFJLG1CQUFNO0FBQUEsTUFDckIsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUVELFVBQU0sS0FBSyxLQUFLO0FBQUEsRUFDbEI7QUFDRjtBQXpEQSxBQTJETyxNQUFNLGVBQWUsSUFBSSxhQUFhOyIsCiAgIm5hbWVzIjogW10KfQo=
