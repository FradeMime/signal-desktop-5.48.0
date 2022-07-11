var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_preload = require("../../ts/util/preload");
var import_context = require("../../ts/windows/context");
const getThemeSetting = (0, import_preload.createSetting)("themeSetting");
async function resolveTheme() {
  const theme = await getThemeSetting.getValue() || "system";
  if (theme === "system") {
    return import_context.SignalContext.nativeThemeListener.getSystemTheme();
  }
  return theme;
}
async function applyTheme() {
  window.document.body.classList.remove("dark-theme");
  window.document.body.classList.remove("light-theme");
  window.document.body.classList.add(`${await resolveTheme()}-theme`);
}
window.addEventListener("DOMContentLoaded", applyTheme);
import_context.SignalContext.nativeThemeListener.subscribe(() => applyTheme());
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGhhc2U0LXRoZW1lLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNyZWF0ZVNldHRpbmcgfSBmcm9tICcuLi8uLi90cy91dGlsL3ByZWxvYWQnO1xuaW1wb3J0IHsgU2lnbmFsQ29udGV4dCB9IGZyb20gJy4uLy4uL3RzL3dpbmRvd3MvY29udGV4dCc7XG5cbmNvbnN0IGdldFRoZW1lU2V0dGluZyA9IGNyZWF0ZVNldHRpbmcoJ3RoZW1lU2V0dGluZycpO1xuXG5hc3luYyBmdW5jdGlvbiByZXNvbHZlVGhlbWUoKSB7XG4gIGNvbnN0IHRoZW1lID0gKGF3YWl0IGdldFRoZW1lU2V0dGluZy5nZXRWYWx1ZSgpKSB8fCAnc3lzdGVtJztcbiAgaWYgKHRoZW1lID09PSAnc3lzdGVtJykge1xuICAgIHJldHVybiBTaWduYWxDb250ZXh0Lm5hdGl2ZVRoZW1lTGlzdGVuZXIuZ2V0U3lzdGVtVGhlbWUoKTtcbiAgfVxuICByZXR1cm4gdGhlbWU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFwcGx5VGhlbWUoKSB7XG4gIHdpbmRvdy5kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2RhcmstdGhlbWUnKTtcbiAgd2luZG93LmRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbGlnaHQtdGhlbWUnKTtcbiAgd2luZG93LmRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChgJHthd2FpdCByZXNvbHZlVGhlbWUoKX0tdGhlbWVgKTtcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBhcHBseVRoZW1lKTtcblxuU2lnbmFsQ29udGV4dC5uYXRpdmVUaGVtZUxpc3RlbmVyLnN1YnNjcmliZSgoKSA9PiBhcHBseVRoZW1lKCkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFHQSxxQkFBOEI7QUFDOUIscUJBQThCO0FBRTlCLE1BQU0sa0JBQWtCLGtDQUFjLGNBQWM7QUFFcEQsOEJBQThCO0FBQzVCLFFBQU0sUUFBUyxNQUFNLGdCQUFnQixTQUFTLEtBQU07QUFDcEQsTUFBSSxVQUFVLFVBQVU7QUFDdEIsV0FBTyw2QkFBYyxvQkFBb0IsZUFBZTtBQUFBLEVBQzFEO0FBQ0EsU0FBTztBQUNUO0FBTmUsQUFRZiw0QkFBNEI7QUFDMUIsU0FBTyxTQUFTLEtBQUssVUFBVSxPQUFPLFlBQVk7QUFDbEQsU0FBTyxTQUFTLEtBQUssVUFBVSxPQUFPLGFBQWE7QUFDbkQsU0FBTyxTQUFTLEtBQUssVUFBVSxJQUFJLEdBQUcsTUFBTSxhQUFhLFNBQVM7QUFDcEU7QUFKZSxBQU1mLE9BQU8saUJBQWlCLG9CQUFvQixVQUFVO0FBRXRELDZCQUFjLG9CQUFvQixVQUFVLE1BQU0sV0FBVyxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=