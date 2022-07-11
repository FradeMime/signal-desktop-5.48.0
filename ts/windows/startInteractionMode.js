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
var startInteractionMode_exports = {};
__export(startInteractionMode_exports, {
  startInteractionMode: () => startInteractionMode
});
module.exports = __toCommonJS(startInteractionMode_exports);
let initialized = false;
let interactionMode = "mouse";
function startInteractionMode() {
  if (initialized) {
    return;
  }
  initialized = true;
  document.body.classList.add("mouse-mode");
  window.enterKeyboardMode = () => {
    if (interactionMode === "keyboard") {
      return;
    }
    interactionMode = "keyboard";
    document.body.classList.add("keyboard-mode");
    document.body.classList.remove("mouse-mode");
    const clearSelectedMessage = window.reduxActions?.conversations?.clearSelectedMessage;
    if (clearSelectedMessage) {
      clearSelectedMessage();
    }
    const userChanged = window.reduxActions?.user?.userChanged;
    if (userChanged) {
      userChanged({ interactionMode });
    }
  };
  window.enterMouseMode = () => {
    if (interactionMode === "mouse") {
      return;
    }
    interactionMode = "mouse";
    document.body.classList.add("mouse-mode");
    document.body.classList.remove("keyboard-mode");
    const clearSelectedMessage = window.reduxActions?.conversations?.clearSelectedMessage;
    if (clearSelectedMessage) {
      clearSelectedMessage();
    }
    const userChanged = window.reduxActions?.user?.userChanged;
    if (userChanged) {
      userChanged({ interactionMode });
    }
  };
  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      window.enterKeyboardMode();
    }
  }, true);
  document.addEventListener("wheel", window.enterMouseMode, true);
  document.addEventListener("mousedown", window.enterMouseMode, true);
  window.getInteractionMode = () => interactionMode;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  startInteractionMode
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RhcnRJbnRlcmFjdGlvbk1vZGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxubGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG5sZXQgaW50ZXJhY3Rpb25Nb2RlOiAnbW91c2UnIHwgJ2tleWJvYXJkJyA9ICdtb3VzZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydEludGVyYWN0aW9uTW9kZSgpOiB2b2lkIHtcbiAgaWYgKGluaXRpYWxpemVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGluaXRpYWxpemVkID0gdHJ1ZTtcblxuICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ21vdXNlLW1vZGUnKTtcblxuICB3aW5kb3cuZW50ZXJLZXlib2FyZE1vZGUgPSAoKSA9PiB7XG4gICAgaWYgKGludGVyYWN0aW9uTW9kZSA9PT0gJ2tleWJvYXJkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGludGVyYWN0aW9uTW9kZSA9ICdrZXlib2FyZCc7XG5cbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2tleWJvYXJkLW1vZGUnKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ21vdXNlLW1vZGUnKTtcblxuICAgIGNvbnN0IGNsZWFyU2VsZWN0ZWRNZXNzYWdlID1cbiAgICAgIHdpbmRvdy5yZWR1eEFjdGlvbnM/LmNvbnZlcnNhdGlvbnM/LmNsZWFyU2VsZWN0ZWRNZXNzYWdlO1xuICAgIGlmIChjbGVhclNlbGVjdGVkTWVzc2FnZSkge1xuICAgICAgY2xlYXJTZWxlY3RlZE1lc3NhZ2UoKTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VyQ2hhbmdlZCA9IHdpbmRvdy5yZWR1eEFjdGlvbnM/LnVzZXI/LnVzZXJDaGFuZ2VkO1xuICAgIGlmICh1c2VyQ2hhbmdlZCkge1xuICAgICAgdXNlckNoYW5nZWQoeyBpbnRlcmFjdGlvbk1vZGUgfSk7XG4gICAgfVxuICB9O1xuICB3aW5kb3cuZW50ZXJNb3VzZU1vZGUgPSAoKSA9PiB7XG4gICAgaWYgKGludGVyYWN0aW9uTW9kZSA9PT0gJ21vdXNlJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGludGVyYWN0aW9uTW9kZSA9ICdtb3VzZSc7XG5cbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ21vdXNlLW1vZGUnKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2tleWJvYXJkLW1vZGUnKTtcblxuICAgIGNvbnN0IGNsZWFyU2VsZWN0ZWRNZXNzYWdlID1cbiAgICAgIHdpbmRvdy5yZWR1eEFjdGlvbnM/LmNvbnZlcnNhdGlvbnM/LmNsZWFyU2VsZWN0ZWRNZXNzYWdlO1xuICAgIGlmIChjbGVhclNlbGVjdGVkTWVzc2FnZSkge1xuICAgICAgY2xlYXJTZWxlY3RlZE1lc3NhZ2UoKTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VyQ2hhbmdlZCA9IHdpbmRvdy5yZWR1eEFjdGlvbnM/LnVzZXI/LnVzZXJDaGFuZ2VkO1xuICAgIGlmICh1c2VyQ2hhbmdlZCkge1xuICAgICAgdXNlckNoYW5nZWQoeyBpbnRlcmFjdGlvbk1vZGUgfSk7XG4gICAgfVxuICB9O1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgJ2tleWRvd24nLFxuICAgIGV2ZW50ID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09ICdUYWInKSB7XG4gICAgICAgIHdpbmRvdy5lbnRlcktleWJvYXJkTW9kZSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgdHJ1ZVxuICApO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHdpbmRvdy5lbnRlck1vdXNlTW9kZSwgdHJ1ZSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHdpbmRvdy5lbnRlck1vdXNlTW9kZSwgdHJ1ZSk7XG5cbiAgd2luZG93LmdldEludGVyYWN0aW9uTW9kZSA9ICgpID0+IGludGVyYWN0aW9uTW9kZTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxJQUFJLGNBQWM7QUFDbEIsSUFBSSxrQkFBd0M7QUFFckMsZ0NBQXNDO0FBQzNDLE1BQUksYUFBYTtBQUNmO0FBQUEsRUFDRjtBQUNBLGdCQUFjO0FBRWQsV0FBUyxLQUFLLFVBQVUsSUFBSSxZQUFZO0FBRXhDLFNBQU8sb0JBQW9CLE1BQU07QUFDL0IsUUFBSSxvQkFBb0IsWUFBWTtBQUNsQztBQUFBLElBQ0Y7QUFFQSxzQkFBa0I7QUFFbEIsYUFBUyxLQUFLLFVBQVUsSUFBSSxlQUFlO0FBQzNDLGFBQVMsS0FBSyxVQUFVLE9BQU8sWUFBWTtBQUUzQyxVQUFNLHVCQUNKLE9BQU8sY0FBYyxlQUFlO0FBQ3RDLFFBQUksc0JBQXNCO0FBQ3hCLDJCQUFxQjtBQUFBLElBQ3ZCO0FBRUEsVUFBTSxjQUFjLE9BQU8sY0FBYyxNQUFNO0FBQy9DLFFBQUksYUFBYTtBQUNmLGtCQUFZLEVBQUUsZ0JBQWdCLENBQUM7QUFBQSxJQUNqQztBQUFBLEVBQ0Y7QUFDQSxTQUFPLGlCQUFpQixNQUFNO0FBQzVCLFFBQUksb0JBQW9CLFNBQVM7QUFDL0I7QUFBQSxJQUNGO0FBRUEsc0JBQWtCO0FBRWxCLGFBQVMsS0FBSyxVQUFVLElBQUksWUFBWTtBQUN4QyxhQUFTLEtBQUssVUFBVSxPQUFPLGVBQWU7QUFFOUMsVUFBTSx1QkFDSixPQUFPLGNBQWMsZUFBZTtBQUN0QyxRQUFJLHNCQUFzQjtBQUN4QiwyQkFBcUI7QUFBQSxJQUN2QjtBQUVBLFVBQU0sY0FBYyxPQUFPLGNBQWMsTUFBTTtBQUMvQyxRQUFJLGFBQWE7QUFDZixrQkFBWSxFQUFFLGdCQUFnQixDQUFDO0FBQUEsSUFDakM7QUFBQSxFQUNGO0FBRUEsV0FBUyxpQkFDUCxXQUNBLFdBQVM7QUFDUCxRQUFJLE1BQU0sUUFBUSxPQUFPO0FBQ3ZCLGFBQU8sa0JBQWtCO0FBQUEsSUFDM0I7QUFBQSxFQUNGLEdBQ0EsSUFDRjtBQUNBLFdBQVMsaUJBQWlCLFNBQVMsT0FBTyxnQkFBZ0IsSUFBSTtBQUM5RCxXQUFTLGlCQUFpQixhQUFhLE9BQU8sZ0JBQWdCLElBQUk7QUFFbEUsU0FBTyxxQkFBcUIsTUFBTTtBQUNwQztBQWhFZ0IiLAogICJuYW1lcyI6IFtdCn0K
