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
var findBestMatchingDevice_exports = {};
__export(findBestMatchingDevice_exports, {
  findBestMatchingAudioDeviceIndex: () => findBestMatchingAudioDeviceIndex,
  findBestMatchingCameraId: () => findBestMatchingCameraId
});
module.exports = __toCommonJS(findBestMatchingDevice_exports);
var import_audioDeviceModule = require("./audioDeviceModule");
function findBestMatchingAudioDeviceIndex({
  available,
  preferred,
  previousAudioDeviceModule,
  currentAudioDeviceModule
}) {
  if (!preferred) {
    return available.length > 0 ? 0 : void 0;
  }
  if (currentAudioDeviceModule === import_audioDeviceModule.AudioDeviceModule.WindowsAdm2 && preferred.index === 0 || previousAudioDeviceModule === import_audioDeviceModule.AudioDeviceModule.WindowsAdm2 && preferred.index === 1 && available.length >= 2) {
    return preferred.index;
  }
  if (preferred.uniqueId) {
    const idMatchIndex = available.findIndex((d) => d.uniqueId === preferred.uniqueId);
    if (idMatchIndex !== -1) {
      return idMatchIndex;
    }
  }
  const nameMatchIndex = available.findIndex((d) => d.name === preferred.name);
  if (nameMatchIndex !== -1) {
    return nameMatchIndex;
  }
  return available.length > 0 ? 0 : void 0;
}
function findBestMatchingCameraId(available, preferred) {
  const matchingId = available.filter((d) => d.deviceId === preferred);
  const nonInfrared = available.filter((d) => !d.label.includes("IR Camera"));
  if (matchingId.length > 0) {
    return matchingId[0].deviceId;
  }
  if (nonInfrared.length > 0) {
    return nonInfrared[0].deviceId;
  }
  return void 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findBestMatchingAudioDeviceIndex,
  findBestMatchingCameraId
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZmluZEJlc3RNYXRjaGluZ0RldmljZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEF1ZGlvRGV2aWNlIH0gZnJvbSAncmluZ3J0Yyc7XG5pbXBvcnQgeyBBdWRpb0RldmljZU1vZHVsZSB9IGZyb20gJy4vYXVkaW9EZXZpY2VNb2R1bGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZmluZEJlc3RNYXRjaGluZ0F1ZGlvRGV2aWNlSW5kZXgoe1xuICBhdmFpbGFibGUsXG4gIHByZWZlcnJlZCxcbiAgcHJldmlvdXNBdWRpb0RldmljZU1vZHVsZSxcbiAgY3VycmVudEF1ZGlvRGV2aWNlTW9kdWxlLFxufTogUmVhZG9ubHk8e1xuICBhdmFpbGFibGU6IFJlYWRvbmx5QXJyYXk8QXVkaW9EZXZpY2U+O1xuICBwcmVmZXJyZWQ6IHVuZGVmaW5lZCB8IEF1ZGlvRGV2aWNlO1xuICBwcmV2aW91c0F1ZGlvRGV2aWNlTW9kdWxlOiBBdWRpb0RldmljZU1vZHVsZTtcbiAgY3VycmVudEF1ZGlvRGV2aWNlTW9kdWxlOiBBdWRpb0RldmljZU1vZHVsZTtcbn0+KTogdW5kZWZpbmVkIHwgbnVtYmVyIHtcbiAgaWYgKCFwcmVmZXJyZWQpIHtcbiAgICByZXR1cm4gYXZhaWxhYmxlLmxlbmd0aCA+IDAgPyAwIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKFxuICAgIChjdXJyZW50QXVkaW9EZXZpY2VNb2R1bGUgPT09IEF1ZGlvRGV2aWNlTW9kdWxlLldpbmRvd3NBZG0yICYmXG4gICAgICBwcmVmZXJyZWQuaW5kZXggPT09IDApIHx8XG4gICAgKHByZXZpb3VzQXVkaW9EZXZpY2VNb2R1bGUgPT09IEF1ZGlvRGV2aWNlTW9kdWxlLldpbmRvd3NBZG0yICYmXG4gICAgICBwcmVmZXJyZWQuaW5kZXggPT09IDEgJiZcbiAgICAgIGF2YWlsYWJsZS5sZW5ndGggPj0gMilcbiAgKSB7XG4gICAgcmV0dXJuIHByZWZlcnJlZC5pbmRleDtcbiAgfVxuXG4gIGlmIChwcmVmZXJyZWQudW5pcXVlSWQpIHtcbiAgICBjb25zdCBpZE1hdGNoSW5kZXggPSBhdmFpbGFibGUuZmluZEluZGV4KFxuICAgICAgZCA9PiBkLnVuaXF1ZUlkID09PSBwcmVmZXJyZWQudW5pcXVlSWRcbiAgICApO1xuICAgIGlmIChpZE1hdGNoSW5kZXggIT09IC0xKSB7XG4gICAgICByZXR1cm4gaWRNYXRjaEluZGV4O1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG5hbWVNYXRjaEluZGV4ID0gYXZhaWxhYmxlLmZpbmRJbmRleChkID0+IGQubmFtZSA9PT0gcHJlZmVycmVkLm5hbWUpO1xuICBpZiAobmFtZU1hdGNoSW5kZXggIT09IC0xKSB7XG4gICAgcmV0dXJuIG5hbWVNYXRjaEluZGV4O1xuICB9XG5cbiAgcmV0dXJuIGF2YWlsYWJsZS5sZW5ndGggPiAwID8gMCA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRCZXN0TWF0Y2hpbmdDYW1lcmFJZChcbiAgYXZhaWxhYmxlOiBSZWFkb25seUFycmF5PE1lZGlhRGV2aWNlSW5mbz4sXG4gIHByZWZlcnJlZD86IHN0cmluZ1xuKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgY29uc3QgbWF0Y2hpbmdJZCA9IGF2YWlsYWJsZS5maWx0ZXIoZCA9PiBkLmRldmljZUlkID09PSBwcmVmZXJyZWQpO1xuICBjb25zdCBub25JbmZyYXJlZCA9IGF2YWlsYWJsZS5maWx0ZXIoZCA9PiAhZC5sYWJlbC5pbmNsdWRlcygnSVIgQ2FtZXJhJykpO1xuXG4gIC8vIEJ5IGRlZmF1bHQsIHBpY2sgdGhlIGZpcnN0IG5vbi1JUiBjYW1lcmEgKGJ1dCBhbGxvdyB0aGUgdXNlciB0byBwaWNrIHRoZVxuICAvLyBpbmZyYXJlZCBpZiB0aGV5IHNvIGRlc2lyZSlcbiAgaWYgKG1hdGNoaW5nSWQubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBtYXRjaGluZ0lkWzBdLmRldmljZUlkO1xuICB9XG4gIGlmIChub25JbmZyYXJlZC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIG5vbkluZnJhcmVkWzBdLmRldmljZUlkO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLCtCQUFrQztBQUUzQiwwQ0FBMEM7QUFBQSxFQUMvQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBTXNCO0FBQ3RCLE1BQUksQ0FBQyxXQUFXO0FBQ2QsV0FBTyxVQUFVLFNBQVMsSUFBSSxJQUFJO0FBQUEsRUFDcEM7QUFFQSxNQUNHLDZCQUE2QiwyQ0FBa0IsZUFDOUMsVUFBVSxVQUFVLEtBQ3JCLDhCQUE4QiwyQ0FBa0IsZUFDL0MsVUFBVSxVQUFVLEtBQ3BCLFVBQVUsVUFBVSxHQUN0QjtBQUNBLFdBQU8sVUFBVTtBQUFBLEVBQ25CO0FBRUEsTUFBSSxVQUFVLFVBQVU7QUFDdEIsVUFBTSxlQUFlLFVBQVUsVUFDN0IsT0FBSyxFQUFFLGFBQWEsVUFBVSxRQUNoQztBQUNBLFFBQUksaUJBQWlCLElBQUk7QUFDdkIsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBRUEsUUFBTSxpQkFBaUIsVUFBVSxVQUFVLE9BQUssRUFBRSxTQUFTLFVBQVUsSUFBSTtBQUN6RSxNQUFJLG1CQUFtQixJQUFJO0FBQ3pCLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FBTyxVQUFVLFNBQVMsSUFBSSxJQUFJO0FBQ3BDO0FBeENnQixBQTBDVCxrQ0FDTCxXQUNBLFdBQ29CO0FBQ3BCLFFBQU0sYUFBYSxVQUFVLE9BQU8sT0FBSyxFQUFFLGFBQWEsU0FBUztBQUNqRSxRQUFNLGNBQWMsVUFBVSxPQUFPLE9BQUssQ0FBQyxFQUFFLE1BQU0sU0FBUyxXQUFXLENBQUM7QUFJeEUsTUFBSSxXQUFXLFNBQVMsR0FBRztBQUN6QixXQUFPLFdBQVcsR0FBRztBQUFBLEVBQ3ZCO0FBQ0EsTUFBSSxZQUFZLFNBQVMsR0FBRztBQUMxQixXQUFPLFlBQVksR0FBRztBQUFBLEVBQ3hCO0FBRUEsU0FBTztBQUNUO0FBakJnQiIsCiAgIm5hbWVzIjogW10KfQo=
