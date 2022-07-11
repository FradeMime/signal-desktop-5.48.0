var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_shims = require("../shims");
var import_react = __toESM(require("react"));
var import_react_dom = __toESM(require("react-dom"));
var import_electron = require("electron");
var import_context = require("../context");
var import_About = require("../../components/About");
import_electron.contextBridge.exposeInMainWorld("SignalContext", {
  ...import_context.SignalContext,
  renderWindow: () => {
    const environmentText = [import_context.SignalContext.getEnvironment()];
    const appInstance = import_context.SignalContext.getAppInstance();
    if (appInstance) {
      environmentText.push(appInstance);
    }
    let platform = "";
    if (process.platform === "darwin") {
      if (process.arch === "arm64") {
        platform = " (M1)";
      } else {
        platform = " (Intel)";
      }
    }
    import_react_dom.default.render(import_react.default.createElement(import_About.About, {
      closeAbout: () => import_context.SignalContext.executeMenuRole("close"),
      environment: `${environmentText.join(" - ")}${platform}`,
      i18n: import_context.SignalContext.i18n,
      version: import_context.SignalContext.getVersion(),
      platform: process.platform,
      isWindows11: import_context.SignalContext.OS.isWindows11(),
      executeMenuRole: import_context.SignalContext.executeMenuRole
    }), document.getElementById("app"));
  }
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJlbG9hZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbi8vIFRoaXMgaGFzIHRvIGJlIHRoZSBmaXJzdCBpbXBvcnQgYmVjYXVzZSBvZiBtb25rZXktcGF0Y2hpbmdcbmltcG9ydCAnLi4vc2hpbXMnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBjb250ZXh0QnJpZGdlIH0gZnJvbSAnZWxlY3Ryb24nO1xuXG5pbXBvcnQgeyBTaWduYWxDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyBBYm91dCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQWJvdXQnO1xuXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdTaWduYWxDb250ZXh0Jywge1xuICAuLi5TaWduYWxDb250ZXh0LFxuICByZW5kZXJXaW5kb3c6ICgpID0+IHtcbiAgICBjb25zdCBlbnZpcm9ubWVudFRleHQ6IEFycmF5PHN0cmluZz4gPSBbU2lnbmFsQ29udGV4dC5nZXRFbnZpcm9ubWVudCgpXTtcblxuICAgIGNvbnN0IGFwcEluc3RhbmNlID0gU2lnbmFsQ29udGV4dC5nZXRBcHBJbnN0YW5jZSgpO1xuICAgIGlmIChhcHBJbnN0YW5jZSkge1xuICAgICAgZW52aXJvbm1lbnRUZXh0LnB1c2goYXBwSW5zdGFuY2UpO1xuICAgIH1cblxuICAgIGxldCBwbGF0Zm9ybSA9ICcnO1xuICAgIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnZGFyd2luJykge1xuICAgICAgaWYgKHByb2Nlc3MuYXJjaCA9PT0gJ2FybTY0Jykge1xuICAgICAgICBwbGF0Zm9ybSA9ICcgKE0xKSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwbGF0Zm9ybSA9ICcgKEludGVsKSc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChBYm91dCwge1xuICAgICAgICBjbG9zZUFib3V0OiAoKSA9PiBTaWduYWxDb250ZXh0LmV4ZWN1dGVNZW51Um9sZSgnY2xvc2UnKSxcbiAgICAgICAgZW52aXJvbm1lbnQ6IGAke2Vudmlyb25tZW50VGV4dC5qb2luKCcgLSAnKX0ke3BsYXRmb3JtfWAsXG4gICAgICAgIGkxOG46IFNpZ25hbENvbnRleHQuaTE4bixcbiAgICAgICAgdmVyc2lvbjogU2lnbmFsQ29udGV4dC5nZXRWZXJzaW9uKCksXG4gICAgICAgIHBsYXRmb3JtOiBwcm9jZXNzLnBsYXRmb3JtLFxuICAgICAgICBpc1dpbmRvd3MxMTogU2lnbmFsQ29udGV4dC5PUy5pc1dpbmRvd3MxMSgpLFxuICAgICAgICBleGVjdXRlTWVudVJvbGU6IFNpZ25hbENvbnRleHQuZXhlY3V0ZU1lbnVSb2xlLFxuICAgICAgfSksXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcbiAgICApO1xuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFJQSxtQkFBTztBQUVQLG1CQUFrQjtBQUNsQix1QkFBcUI7QUFDckIsc0JBQThCO0FBRTlCLHFCQUE4QjtBQUM5QixtQkFBc0I7QUFFdEIsOEJBQWMsa0JBQWtCLGlCQUFpQjtBQUFBLEtBQzVDO0FBQUEsRUFDSCxjQUFjLE1BQU07QUFDbEIsVUFBTSxrQkFBaUMsQ0FBQyw2QkFBYyxlQUFlLENBQUM7QUFFdEUsVUFBTSxjQUFjLDZCQUFjLGVBQWU7QUFDakQsUUFBSSxhQUFhO0FBQ2Ysc0JBQWdCLEtBQUssV0FBVztBQUFBLElBQ2xDO0FBRUEsUUFBSSxXQUFXO0FBQ2YsUUFBSSxRQUFRLGFBQWEsVUFBVTtBQUNqQyxVQUFJLFFBQVEsU0FBUyxTQUFTO0FBQzVCLG1CQUFXO0FBQUEsTUFDYixPQUFPO0FBQ0wsbUJBQVc7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUVBLDZCQUFTLE9BQ1AscUJBQU0sY0FBYyxvQkFBTztBQUFBLE1BQ3pCLFlBQVksTUFBTSw2QkFBYyxnQkFBZ0IsT0FBTztBQUFBLE1BQ3ZELGFBQWEsR0FBRyxnQkFBZ0IsS0FBSyxLQUFLLElBQUk7QUFBQSxNQUM5QyxNQUFNLDZCQUFjO0FBQUEsTUFDcEIsU0FBUyw2QkFBYyxXQUFXO0FBQUEsTUFDbEMsVUFBVSxRQUFRO0FBQUEsTUFDbEIsYUFBYSw2QkFBYyxHQUFHLFlBQVk7QUFBQSxNQUMxQyxpQkFBaUIsNkJBQWM7QUFBQSxJQUNqQyxDQUFDLEdBQ0QsU0FBUyxlQUFlLEtBQUssQ0FDL0I7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
