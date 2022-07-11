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
var MessageAudio_exports = {};
__export(MessageAudio_exports, {
  MessageAudio: () => MessageAudio
});
module.exports = __toCommonJS(MessageAudio_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_lodash = require("lodash");
var import_assert = require("../../util/assert");
var import_Attachment = require("../../types/Attachment");
var import_missingCaseError = require("../../util/missingCaseError");
var import_MessageMetadata = require("./MessageMetadata");
var log = __toESM(require("../../logging/log"));
var State = /* @__PURE__ */ ((State2) => {
  State2["NotDownloaded"] = "NotDownloaded";
  State2["Pending"] = "Pending";
  State2["Computing"] = "Computing";
  State2["Normal"] = "Normal";
  return State2;
})(State || {});
const CSS_BASE = "module-message__audio-attachment";
const BAR_COUNT = 47;
const BAR_NOT_DOWNLOADED_HEIGHT = 2;
const BAR_MIN_HEIGHT = 4;
const BAR_MAX_HEIGHT = 20;
const REWIND_BAR_COUNT = 2;
const SMALL_INCREMENT = 1;
const BIG_INCREMENT = 5;
const timeToText = /* @__PURE__ */ __name((time) => {
  const hours = Math.floor(time / 3600);
  let minutes = Math.floor(time % 3600 / 60).toString();
  let seconds = Math.floor(time % 60).toString();
  if (hours !== 0 && minutes.length < 2) {
    minutes = `0${minutes}`;
  }
  if (seconds.length < 2) {
    seconds = `0${seconds}`;
  }
  return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
}, "timeToText");
const Button = /* @__PURE__ */ __name((props) => {
  const { i18n, buttonRef, mod, label, onClick } = props;
  const onButtonClick = /* @__PURE__ */ __name((event) => {
    event.stopPropagation();
    event.preventDefault();
    onClick();
  }, "onButtonClick");
  const onButtonKeyDown = /* @__PURE__ */ __name((event) => {
    if (event.key !== "Enter" && event.key !== "Space") {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    onClick();
  }, "onButtonKeyDown");
  return /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    ref: buttonRef,
    className: (0, import_classnames.default)(`${CSS_BASE}__button`, `${CSS_BASE}__button--${mod}`),
    onClick: onButtonClick,
    onKeyDown: onButtonKeyDown,
    tabIndex: 0,
    "aria-label": i18n(label)
  });
}, "Button");
function reducer(state, action) {
  if (action.type === "SET_IS_PLAYING") {
    return {
      ...state,
      isPlaying: action.value,
      lastAriaTime: state.currentTime
    };
  }
  if (action.type === "SET_CURRENT_TIME") {
    return { ...state, currentTime: action.value };
  }
  throw (0, import_missingCaseError.missingCaseError)(action);
}
const MessageAudio = /* @__PURE__ */ __name((props) => {
  const {
    i18n,
    renderingContext,
    attachment,
    collapseMetadata,
    withContentAbove,
    withContentBelow,
    direction,
    expirationLength,
    expirationTimestamp,
    id,
    played,
    showMessageDetail,
    status,
    textPending,
    timestamp,
    buttonRef,
    kickOffAttachmentDownload,
    onCorrupted,
    onFirstPlayed,
    audio,
    computePeaks,
    activeAudioID,
    activeAudioContext,
    setActiveAudioID
  } = props;
  (0, import_assert.assert)(audio !== null, "GlobalAudioContext always provides audio");
  const isActive = activeAudioID === id && activeAudioContext === renderingContext;
  const waveformRef = (0, import_react.useRef)(null);
  const [{ isPlaying, currentTime, lastAriaTime }, dispatch] = (0, import_react.useReducer)(reducer, {
    isPlaying: isActive && !(audio.paused || audio.ended),
    currentTime: isActive ? audio.currentTime : 0,
    lastAriaTime: isActive ? audio.currentTime : 0
  });
  const setIsPlaying = (0, import_react.useCallback)((value) => {
    dispatch({ type: "SET_IS_PLAYING", value });
  }, [dispatch]);
  const setCurrentTime = (0, import_react.useCallback)((value) => {
    dispatch({ type: "SET_CURRENT_TIME", value });
  }, [dispatch]);
  const [duration, setDuration] = (0, import_react.useState)(1e-23);
  const [hasPeaks, setHasPeaks] = (0, import_react.useState)(false);
  const [peaks, setPeaks] = (0, import_react.useState)(new Array(BAR_COUNT).fill(0));
  let state;
  if (attachment.pending) {
    state = "Pending" /* Pending */;
  } else if (!(0, import_Attachment.isDownloaded)(attachment)) {
    state = "NotDownloaded" /* NotDownloaded */;
  } else if (!hasPeaks) {
    state = "Computing" /* Computing */;
  } else {
    state = "Normal" /* Normal */;
  }
  (0, import_react.useEffect)(() => {
    if (state !== "Computing" /* Computing */) {
      return import_lodash.noop;
    }
    log.info("MessageAudio: loading audio and computing waveform");
    let canceled = false;
    (async () => {
      try {
        if (!attachment.url) {
          throw new Error(`Expected attachment url in the MessageAudio with state: ${state}`);
        }
        const { peaks: newPeaks, duration: newDuration } = await computePeaks(attachment.url, BAR_COUNT);
        if (canceled) {
          return;
        }
        setPeaks(newPeaks);
        setHasPeaks(true);
        setDuration(Math.max(newDuration, 1e-23));
      } catch (err) {
        log.error("MessageAudio: computePeaks error, marking as corrupted", err);
        onCorrupted();
      }
    })();
    return () => {
      canceled = true;
    };
  }, [
    attachment,
    computePeaks,
    setDuration,
    setPeaks,
    setHasPeaks,
    onCorrupted,
    state
  ]);
  (0, import_react.useEffect)(() => {
    if (!isActive) {
      log.info("MessageAudio: pausing old owner", id);
      setIsPlaying(false);
      setCurrentTime(0);
      return import_lodash.noop;
    }
    const onTimeUpdate = /* @__PURE__ */ __name(() => {
      setCurrentTime(audio.currentTime);
      if (audio.currentTime > duration) {
        setDuration(audio.currentTime);
      }
    }, "onTimeUpdate");
    const onEnded = /* @__PURE__ */ __name(() => {
      log.info("MessageAudio: ended, changing UI", id);
      setIsPlaying(false);
      setCurrentTime(0);
    }, "onEnded");
    const onLoadedMetadata = /* @__PURE__ */ __name(() => {
      (0, import_assert.assert)(!Number.isNaN(audio.duration), "Audio should have definite duration on `loadedmetadata` event");
      log.info("MessageAudio: `loadedmetadata` event", id);
      audio.currentTime = currentTime;
    }, "onLoadedMetadata");
    const onDurationChange = /* @__PURE__ */ __name(() => {
      log.info("MessageAudio: `durationchange` event", id);
      if (!Number.isNaN(audio.duration)) {
        setDuration(Math.max(audio.duration, 1e-23));
      }
    }, "onDurationChange");
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("durationchange", onDurationChange);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("durationchange", onDurationChange);
    };
  }, [
    id,
    audio,
    isActive,
    currentTime,
    duration,
    setCurrentTime,
    setIsPlaying
  ]);
  (0, import_react.useEffect)(() => {
    if (!isActive) {
      return;
    }
    if (isPlaying) {
      if (!audio.paused) {
        return;
      }
      log.info("MessageAudio: resuming playback for", id);
      audio.currentTime = currentTime;
      audio.play().catch((error) => {
        log.info("MessageAudio: resume error", id, error.stack || error);
      });
    } else {
      log.info("MessageAudio: pausing playback for", id);
      audio.pause();
    }
  }, [id, audio, isActive, isPlaying, currentTime]);
  const toggleIsPlaying = /* @__PURE__ */ __name(() => {
    setIsPlaying(!isPlaying);
    if (!isActive && !isPlaying) {
      log.info("MessageAudio: changing owner", id);
      setActiveAudioID(id, renderingContext);
      if (!audio.paused) {
        audio.pause();
      }
      if (!attachment.url) {
        throw new Error(`Expected attachment url in the MessageAudio with state: ${state}`);
      }
      audio.src = attachment.url;
    }
  }, "toggleIsPlaying");
  (0, import_react.useEffect)(() => {
    if (!played && isPlaying) {
      onFirstPlayed();
    }
  }, [played, isPlaying, onFirstPlayed]);
  const onWaveformClick = /* @__PURE__ */ __name((event) => {
    event.preventDefault();
    event.stopPropagation();
    if (state !== "Normal" /* Normal */) {
      return;
    }
    if (!isPlaying) {
      toggleIsPlaying();
    }
    if (!waveformRef.current) {
      return;
    }
    const boundingRect = waveformRef.current.getBoundingClientRect();
    let progress = (event.pageX - boundingRect.left) / boundingRect.width;
    if (progress <= REWIND_BAR_COUNT / BAR_COUNT) {
      progress = 0;
    }
    if (isPlaying && !Number.isNaN(audio.duration)) {
      audio.currentTime = audio.duration * progress;
    } else {
      setCurrentTime(duration * progress);
    }
  }, "onWaveformClick");
  const onWaveformKeyDown = /* @__PURE__ */ __name((event) => {
    let increment;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      increment = +SMALL_INCREMENT;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      increment = -SMALL_INCREMENT;
    } else if (event.key === "PageUp") {
      increment = +BIG_INCREMENT;
    } else if (event.key === "PageDown") {
      increment = -BIG_INCREMENT;
    } else {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (!isActive) {
      return;
    }
    audio.currentTime = Math.min(Number.isNaN(audio.duration) ? Infinity : audio.duration, Math.max(0, audio.currentTime + increment));
    if (!isPlaying) {
      toggleIsPlaying();
    }
  }, "onWaveformKeyDown");
  const peakPosition = peaks.length * (currentTime / duration);
  const waveform = /* @__PURE__ */ import_react.default.createElement("div", {
    ref: waveformRef,
    className: `${CSS_BASE}__waveform`,
    onClick: onWaveformClick,
    onKeyDown: onWaveformKeyDown,
    tabIndex: 0,
    role: "slider",
    "aria-label": i18n("MessageAudio--slider"),
    "aria-orientation": "horizontal",
    "aria-valuenow": lastAriaTime,
    "aria-valuemin": 0,
    "aria-valuemax": duration,
    "aria-valuetext": timeToText(lastAriaTime)
  }, peaks.map((peak, i) => {
    let height = Math.max(BAR_MIN_HEIGHT, BAR_MAX_HEIGHT * peak);
    if (state !== "Normal" /* Normal */) {
      height = BAR_NOT_DOWNLOADED_HEIGHT;
    }
    const highlight = i < peakPosition;
    if (highlight && i + 1 >= peakPosition) {
      height = BAR_MAX_HEIGHT;
    }
    const key = i;
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)([
        `${CSS_BASE}__waveform__bar`,
        highlight ? `${CSS_BASE}__waveform__bar--active` : null
      ]),
      key,
      style: { height }
    });
  }));
  let button;
  if (state === "Pending" /* Pending */ || state === "Computing" /* Computing */) {
    button = /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)(`${CSS_BASE}__spinner`, `${CSS_BASE}__spinner--pending`),
      title: i18n("MessageAudio--pending")
    });
  } else if (state === "NotDownloaded" /* NotDownloaded */) {
    button = /* @__PURE__ */ import_react.default.createElement(Button, {
      i18n,
      buttonRef,
      mod: "download",
      label: "MessageAudio--download",
      onClick: kickOffAttachmentDownload
    });
  } else {
    button = /* @__PURE__ */ import_react.default.createElement(Button, {
      i18n,
      buttonRef,
      mod: isPlaying ? "pause" : "play",
      label: isPlaying ? "MessageAudio--pause" : "MessageAudio--play",
      onClick: toggleIsPlaying
    });
  }
  const countDown = Math.max(0, duration - currentTime);
  const metadata = /* @__PURE__ */ import_react.default.createElement("div", {
    className: `${CSS_BASE}__metadata`
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    "aria-hidden": "true",
    className: (0, import_classnames.default)(`${CSS_BASE}__countdown`, `${CSS_BASE}__countdown--${played ? "played" : "unplayed"}`)
  }, timeToText(countDown)), !withContentBelow && !collapseMetadata && /* @__PURE__ */ import_react.default.createElement(import_MessageMetadata.MessageMetadata, {
    direction,
    expirationLength,
    expirationTimestamp,
    hasText: withContentBelow,
    i18n,
    id,
    isShowingImage: false,
    isSticker: false,
    isTapToViewExpired: false,
    showMessageDetail,
    status,
    textPending,
    timestamp
  }));
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(CSS_BASE, `${CSS_BASE}--${direction}`, withContentBelow ? `${CSS_BASE}--with-content-below` : null, withContentAbove ? `${CSS_BASE}--with-content-above` : null)
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: `${CSS_BASE}__button-and-waveform`
  }, button, waveform), metadata);
}, "MessageAudio");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessageAudio
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZUF1ZGlvLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwge1xuICB1c2VSZWYsXG4gIHVzZUVmZmVjdCxcbiAgdXNlU3RhdGUsXG4gIHVzZVJlZHVjZXIsXG4gIHVzZUNhbGxiYWNrLFxufSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgQXR0YWNobWVudFR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB7IGlzRG93bmxvYWRlZCB9IGZyb20gJy4uLy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHsgbWlzc2luZ0Nhc2VFcnJvciB9IGZyb20gJy4uLy4uL3V0aWwvbWlzc2luZ0Nhc2VFcnJvcic7XG5pbXBvcnQgdHlwZSB7IERpcmVjdGlvblR5cGUsIE1lc3NhZ2VTdGF0dXNUeXBlIH0gZnJvbSAnLi9NZXNzYWdlJztcblxuaW1wb3J0IHR5cGUgeyBDb21wdXRlUGVha3NSZXN1bHQgfSBmcm9tICcuLi9HbG9iYWxBdWRpb0NvbnRleHQnO1xuaW1wb3J0IHsgTWVzc2FnZU1ldGFkYXRhIH0gZnJvbSAnLi9NZXNzYWdlTWV0YWRhdGEnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uLy4uL2xvZ2dpbmcvbG9nJztcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSB7XG4gIHJlbmRlcmluZ0NvbnRleHQ6IHN0cmluZztcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgYXR0YWNobWVudDogQXR0YWNobWVudFR5cGU7XG4gIGNvbGxhcHNlTWV0YWRhdGE6IGJvb2xlYW47XG4gIHdpdGhDb250ZW50QWJvdmU6IGJvb2xlYW47XG4gIHdpdGhDb250ZW50QmVsb3c6IGJvb2xlYW47XG5cbiAgLy8gTWVzc2FnZSBwcm9wZXJ0aWVzLiBNYW55IGFyZSBuZWVkZWQgZm9yIHJlbmRlcmluZyBtZXRhZGF0YVxuICBkaXJlY3Rpb246IERpcmVjdGlvblR5cGU7XG4gIGV4cGlyYXRpb25MZW5ndGg/OiBudW1iZXI7XG4gIGV4cGlyYXRpb25UaW1lc3RhbXA/OiBudW1iZXI7XG4gIGlkOiBzdHJpbmc7XG4gIHBsYXllZDogYm9vbGVhbjtcbiAgc2hvd01lc3NhZ2VEZXRhaWw6IChpZDogc3RyaW5nKSA9PiB2b2lkO1xuICBzdGF0dXM/OiBNZXNzYWdlU3RhdHVzVHlwZTtcbiAgdGV4dFBlbmRpbmc/OiBib29sZWFuO1xuICB0aW1lc3RhbXA6IG51bWJlcjtcblxuICAvLyBTZWU6IEdsb2JhbEF1ZGlvQ29udGV4dC50c3hcbiAgYXVkaW86IEhUTUxBdWRpb0VsZW1lbnQ7XG5cbiAgYnV0dG9uUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEJ1dHRvbkVsZW1lbnQ+O1xuICBraWNrT2ZmQXR0YWNobWVudERvd25sb2FkKCk6IHZvaWQ7XG4gIG9uQ29ycnVwdGVkKCk6IHZvaWQ7XG4gIG9uRmlyc3RQbGF5ZWQoKTogdm9pZDtcblxuICBjb21wdXRlUGVha3ModXJsOiBzdHJpbmcsIGJhckNvdW50OiBudW1iZXIpOiBQcm9taXNlPENvbXB1dGVQZWFrc1Jlc3VsdD47XG4gIGFjdGl2ZUF1ZGlvSUQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgYWN0aXZlQXVkaW9Db250ZXh0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHNldEFjdGl2ZUF1ZGlvSUQ6IChpZDogc3RyaW5nIHwgdW5kZWZpbmVkLCBjb250ZXh0OiBzdHJpbmcpID0+IHZvaWQ7XG59O1xuXG50eXBlIEJ1dHRvblByb3BzID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBidXR0b25SZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MQnV0dG9uRWxlbWVudD47XG5cbiAgbW9kOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIG9uQ2xpY2s6ICgpID0+IHZvaWQ7XG59O1xuXG5lbnVtIFN0YXRlIHtcbiAgTm90RG93bmxvYWRlZCA9ICdOb3REb3dubG9hZGVkJyxcbiAgUGVuZGluZyA9ICdQZW5kaW5nJyxcbiAgQ29tcHV0aW5nID0gJ0NvbXB1dGluZycsXG4gIE5vcm1hbCA9ICdOb3JtYWwnLFxufVxuXG4vLyBDb25zdGFudHNcblxuY29uc3QgQ1NTX0JBU0UgPSAnbW9kdWxlLW1lc3NhZ2VfX2F1ZGlvLWF0dGFjaG1lbnQnO1xuY29uc3QgQkFSX0NPVU5UID0gNDc7XG5jb25zdCBCQVJfTk9UX0RPV05MT0FERURfSEVJR0hUID0gMjtcbmNvbnN0IEJBUl9NSU5fSEVJR0hUID0gNDtcbmNvbnN0IEJBUl9NQVhfSEVJR0hUID0gMjA7XG5cbmNvbnN0IFJFV0lORF9CQVJfQ09VTlQgPSAyO1xuXG4vLyBJbmNyZW1lbnRzIGZvciBrZXlib2FyZCBhdWRpbyBzZWVrIChpbiBzZWNvbmRzKVxuY29uc3QgU01BTExfSU5DUkVNRU5UID0gMTtcbmNvbnN0IEJJR19JTkNSRU1FTlQgPSA1O1xuXG4vLyBVdGlsc1xuXG5jb25zdCB0aW1lVG9UZXh0ID0gKHRpbWU6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcih0aW1lIC8gMzYwMCk7XG4gIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigodGltZSAlIDM2MDApIC8gNjApLnRvU3RyaW5nKCk7XG4gIGxldCBzZWNvbmRzID0gTWF0aC5mbG9vcih0aW1lICUgNjApLnRvU3RyaW5nKCk7XG5cbiAgaWYgKGhvdXJzICE9PSAwICYmIG1pbnV0ZXMubGVuZ3RoIDwgMikge1xuICAgIG1pbnV0ZXMgPSBgMCR7bWludXRlc31gO1xuICB9XG5cbiAgaWYgKHNlY29uZHMubGVuZ3RoIDwgMikge1xuICAgIHNlY29uZHMgPSBgMCR7c2Vjb25kc31gO1xuICB9XG5cbiAgcmV0dXJuIGhvdXJzID8gYCR7aG91cnN9OiR7bWludXRlc306JHtzZWNvbmRzfWAgOiBgJHttaW51dGVzfToke3NlY29uZHN9YDtcbn07XG5cbmNvbnN0IEJ1dHRvbjogUmVhY3QuRkM8QnV0dG9uUHJvcHM+ID0gcHJvcHMgPT4ge1xuICBjb25zdCB7IGkxOG4sIGJ1dHRvblJlZiwgbW9kLCBsYWJlbCwgb25DbGljayB9ID0gcHJvcHM7XG4gIC8vIENsaWNraW5nIGJ1dHRvbiB0b2dnbGUgcGxheWJhY2tcbiAgY29uc3Qgb25CdXR0b25DbGljayA9IChldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBvbkNsaWNrKCk7XG4gIH07XG5cbiAgLy8gS2V5Ym9hcmQgcGxheWJhY2sgdG9nZ2xlXG4gIGNvbnN0IG9uQnV0dG9uS2V5RG93biA9IChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgIGlmIChldmVudC5rZXkgIT09ICdFbnRlcicgJiYgZXZlbnQua2V5ICE9PSAnU3BhY2UnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBvbkNsaWNrKCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIHJlZj17YnV0dG9uUmVmfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICBgJHtDU1NfQkFTRX1fX2J1dHRvbmAsXG4gICAgICAgIGAke0NTU19CQVNFfV9fYnV0dG9uLS0ke21vZH1gXG4gICAgICApfVxuICAgICAgb25DbGljaz17b25CdXR0b25DbGlja31cbiAgICAgIG9uS2V5RG93bj17b25CdXR0b25LZXlEb3dufVxuICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICBhcmlhLWxhYmVsPXtpMThuKGxhYmVsKX1cbiAgICAvPlxuICApO1xufTtcblxudHlwZSBTdGF0ZVR5cGUgPSBSZWFkb25seTx7XG4gIGlzUGxheWluZzogYm9vbGVhbjtcbiAgY3VycmVudFRpbWU6IG51bWJlcjtcbiAgbGFzdEFyaWFUaW1lOiBudW1iZXI7XG59PjtcblxudHlwZSBBY3Rpb25UeXBlID0gUmVhZG9ubHk8XG4gIHwge1xuICAgICAgdHlwZTogJ1NFVF9JU19QTEFZSU5HJztcbiAgICAgIHZhbHVlOiBib29sZWFuO1xuICAgIH1cbiAgfCB7XG4gICAgICB0eXBlOiAnU0VUX0NVUlJFTlRfVElNRSc7XG4gICAgICB2YWx1ZTogbnVtYmVyO1xuICAgIH1cbj47XG5cbmZ1bmN0aW9uIHJlZHVjZXIoc3RhdGU6IFN0YXRlVHlwZSwgYWN0aW9uOiBBY3Rpb25UeXBlKTogU3RhdGVUeXBlIHtcbiAgaWYgKGFjdGlvbi50eXBlID09PSAnU0VUX0lTX1BMQVlJTkcnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgaXNQbGF5aW5nOiBhY3Rpb24udmFsdWUsXG4gICAgICBsYXN0QXJpYVRpbWU6IHN0YXRlLmN1cnJlbnRUaW1lLFxuICAgIH07XG4gIH1cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnU0VUX0NVUlJFTlRfVElNRScpIHtcbiAgICByZXR1cm4geyAuLi5zdGF0ZSwgY3VycmVudFRpbWU6IGFjdGlvbi52YWx1ZSB9O1xuICB9XG4gIHRocm93IG1pc3NpbmdDYXNlRXJyb3IoYWN0aW9uKTtcbn1cblxuLyoqXG4gKiBEaXNwbGF5IG1lc3NhZ2UgYXVkaW8gYXR0YWNobWVudCBhbG9uZyB3aXRoIGl0cyB3YXZlZm9ybSwgZHVyYXRpb24sIGFuZFxuICogdG9nZ2xlIFBsYXkvUGF1c2UgYnV0dG9uLlxuICpcbiAqIEEgZ2xvYmFsIGF1ZGlvIHBsYXllciBpcyB1c2VkIGZvciBwbGF5YmFjayBhbmQgYWNjZXNzIGlzIG1hbmFnZWQgYnkgdGhlXG4gKiBgYWN0aXZlQXVkaW9JRGAgYW5kIGBhY3RpdmVBdWRpb0NvbnRleHRgIHByb3BlcnRpZXMuIFdoZW5ldmVyIGJvdGhcbiAqIGBhY3RpdmVBdWRpb0lEYCBhbmQgYGFjdGl2ZUF1ZGlvQ29udGV4dGAgYXJlIGVxdWFsIHRvIGBpZGAgYW5kIGBjb250ZXh0YFxuICogcmVzcGVjdGl2ZWx5IHRoZSBpbnN0YW5jZSBvZiB0aGUgYE1lc3NhZ2VBdWRpb2AgYXNzdW1lcyB0aGUgb3duZXJzaGlwIG9mIHRoZVxuICogYEF1ZGlvYCBpbnN0YW5jZSBhbmQgZnVsbHkgbWFuYWdlcyBpdC5cbiAqXG4gKiBgY29udGV4dGAgaXMgcmVxdWlyZWQgZm9yIGRpc3BsYXlpbmcgc2VwYXJhdGUgTWVzc2FnZUF1ZGlvIGluc3RhbmNlcyBpblxuICogTWVzc2FnZURldGFpbHMgYW5kIE1lc3NhZ2UgUmVhY3QgY29tcG9uZW50cy5cbiAqL1xuZXhwb3J0IGNvbnN0IE1lc3NhZ2VBdWRpbzogUmVhY3QuRkM8UHJvcHM+ID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICBjb25zdCB7XG4gICAgaTE4bixcbiAgICByZW5kZXJpbmdDb250ZXh0LFxuICAgIGF0dGFjaG1lbnQsXG4gICAgY29sbGFwc2VNZXRhZGF0YSxcbiAgICB3aXRoQ29udGVudEFib3ZlLFxuICAgIHdpdGhDb250ZW50QmVsb3csXG5cbiAgICBkaXJlY3Rpb24sXG4gICAgZXhwaXJhdGlvbkxlbmd0aCxcbiAgICBleHBpcmF0aW9uVGltZXN0YW1wLFxuICAgIGlkLFxuICAgIHBsYXllZCxcbiAgICBzaG93TWVzc2FnZURldGFpbCxcbiAgICBzdGF0dXMsXG4gICAgdGV4dFBlbmRpbmcsXG4gICAgdGltZXN0YW1wLFxuXG4gICAgYnV0dG9uUmVmLFxuICAgIGtpY2tPZmZBdHRhY2htZW50RG93bmxvYWQsXG4gICAgb25Db3JydXB0ZWQsXG4gICAgb25GaXJzdFBsYXllZCxcblxuICAgIGF1ZGlvLFxuICAgIGNvbXB1dGVQZWFrcyxcblxuICAgIGFjdGl2ZUF1ZGlvSUQsXG4gICAgYWN0aXZlQXVkaW9Db250ZXh0LFxuICAgIHNldEFjdGl2ZUF1ZGlvSUQsXG4gIH0gPSBwcm9wcztcblxuICBhc3NlcnQoYXVkaW8gIT09IG51bGwsICdHbG9iYWxBdWRpb0NvbnRleHQgYWx3YXlzIHByb3ZpZGVzIGF1ZGlvJyk7XG5cbiAgY29uc3QgaXNBY3RpdmUgPVxuICAgIGFjdGl2ZUF1ZGlvSUQgPT09IGlkICYmIGFjdGl2ZUF1ZGlvQ29udGV4dCA9PT0gcmVuZGVyaW5nQ29udGV4dDtcblxuICBjb25zdCB3YXZlZm9ybVJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbeyBpc1BsYXlpbmcsIGN1cnJlbnRUaW1lLCBsYXN0QXJpYVRpbWUgfSwgZGlzcGF0Y2hdID0gdXNlUmVkdWNlcihcbiAgICByZWR1Y2VyLFxuICAgIHtcbiAgICAgIGlzUGxheWluZzogaXNBY3RpdmUgJiYgIShhdWRpby5wYXVzZWQgfHwgYXVkaW8uZW5kZWQpLFxuICAgICAgY3VycmVudFRpbWU6IGlzQWN0aXZlID8gYXVkaW8uY3VycmVudFRpbWUgOiAwLFxuICAgICAgbGFzdEFyaWFUaW1lOiBpc0FjdGl2ZSA/IGF1ZGlvLmN1cnJlbnRUaW1lIDogMCxcbiAgICB9XG4gICk7XG5cbiAgY29uc3Qgc2V0SXNQbGF5aW5nID0gdXNlQ2FsbGJhY2soXG4gICAgKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgICBkaXNwYXRjaCh7IHR5cGU6ICdTRVRfSVNfUExBWUlORycsIHZhbHVlIH0pO1xuICAgIH0sXG4gICAgW2Rpc3BhdGNoXVxuICApO1xuXG4gIGNvbnN0IHNldEN1cnJlbnRUaW1lID0gdXNlQ2FsbGJhY2soXG4gICAgKHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ1NFVF9DVVJSRU5UX1RJTUUnLCB2YWx1ZSB9KTtcbiAgICB9LFxuICAgIFtkaXNwYXRjaF1cbiAgKTtcblxuICAvLyBOT1RFOiBBdm9pZCBkaXZpc2lvbiBieSB6ZXJvXG4gIGNvbnN0IFtkdXJhdGlvbiwgc2V0RHVyYXRpb25dID0gdXNlU3RhdGUoMWUtMjMpO1xuXG4gIGNvbnN0IFtoYXNQZWFrcywgc2V0SGFzUGVha3NdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGVha3MsIHNldFBlYWtzXSA9IHVzZVN0YXRlPFJlYWRvbmx5QXJyYXk8bnVtYmVyPj4oXG4gICAgbmV3IEFycmF5KEJBUl9DT1VOVCkuZmlsbCgwKVxuICApO1xuXG4gIGxldCBzdGF0ZTogU3RhdGU7XG5cbiAgaWYgKGF0dGFjaG1lbnQucGVuZGluZykge1xuICAgIHN0YXRlID0gU3RhdGUuUGVuZGluZztcbiAgfSBlbHNlIGlmICghaXNEb3dubG9hZGVkKGF0dGFjaG1lbnQpKSB7XG4gICAgc3RhdGUgPSBTdGF0ZS5Ob3REb3dubG9hZGVkO1xuICB9IGVsc2UgaWYgKCFoYXNQZWFrcykge1xuICAgIHN0YXRlID0gU3RhdGUuQ29tcHV0aW5nO1xuICB9IGVsc2Uge1xuICAgIHN0YXRlID0gU3RhdGUuTm9ybWFsO1xuICB9XG5cbiAgLy8gVGhpcyBlZmZlY3QgbG9hZHMgYXVkaW8gZmlsZSBhbmQgY29tcHV0ZXMgaXRzIFJNUyBwZWFrIGZvciBkaXNwbGF5aW5nIHRoZVxuICAvLyB3YXZlZm9ybS5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoc3RhdGUgIT09IFN0YXRlLkNvbXB1dGluZykge1xuICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfVxuXG4gICAgbG9nLmluZm8oJ01lc3NhZ2VBdWRpbzogbG9hZGluZyBhdWRpbyBhbmQgY29tcHV0aW5nIHdhdmVmb3JtJyk7XG5cbiAgICBsZXQgY2FuY2VsZWQgPSBmYWxzZTtcblxuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIWF0dGFjaG1lbnQudXJsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ0V4cGVjdGVkIGF0dGFjaG1lbnQgdXJsIGluIHRoZSBNZXNzYWdlQXVkaW8gd2l0aCAnICtcbiAgICAgICAgICAgICAgYHN0YXRlOiAke3N0YXRlfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBwZWFrczogbmV3UGVha3MsIGR1cmF0aW9uOiBuZXdEdXJhdGlvbiB9ID0gYXdhaXQgY29tcHV0ZVBlYWtzKFxuICAgICAgICAgIGF0dGFjaG1lbnQudXJsLFxuICAgICAgICAgIEJBUl9DT1VOVFxuICAgICAgICApO1xuICAgICAgICBpZiAoY2FuY2VsZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0UGVha3MobmV3UGVha3MpO1xuICAgICAgICBzZXRIYXNQZWFrcyh0cnVlKTtcbiAgICAgICAgc2V0RHVyYXRpb24oTWF0aC5tYXgobmV3RHVyYXRpb24sIDFlLTIzKSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICdNZXNzYWdlQXVkaW86IGNvbXB1dGVQZWFrcyBlcnJvciwgbWFya2luZyBhcyBjb3JydXB0ZWQnLFxuICAgICAgICAgIGVyclxuICAgICAgICApO1xuXG4gICAgICAgIG9uQ29ycnVwdGVkKCk7XG4gICAgICB9XG4gICAgfSkoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjYW5jZWxlZCA9IHRydWU7XG4gICAgfTtcbiAgfSwgW1xuICAgIGF0dGFjaG1lbnQsXG4gICAgY29tcHV0ZVBlYWtzLFxuICAgIHNldER1cmF0aW9uLFxuICAgIHNldFBlYWtzLFxuICAgIHNldEhhc1BlYWtzLFxuICAgIG9uQ29ycnVwdGVkLFxuICAgIHN0YXRlLFxuICBdKTtcblxuICAvLyBUaGlzIGVmZmVjdCBhdHRhY2hlcy9kZXRhY2hlcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIGdsb2JhbCA8YXVkaW8vPlxuICAvLyBpbnN0YW5jZSB0aGF0IHdlIHJldXNlIGZyb20gdGhlIEdsb2JhbEF1ZGlvQ29udGV4dC5cbiAgLy9cbiAgLy8gQXVkaW8gcGxheWJhY2sgY2hhbmdlcyBgYXVkaW8uY3VycmVudFRpbWVgIHNvIHdlIGhhdmUgdG8gcHJvcGFnYXRlIHRoaXNcbiAgLy8gdG8gdGhlIHdhdmVmb3JtIFVJLlxuICAvL1xuICAvLyBXaGVuIGF1ZGlvIGVuZHMgLSB3ZSBoYXZlIHRvIGNoYW5nZSBzdGF0ZSBhbmQgcmVzZXQgdGhlIHBvc2l0aW9uIG9mIHRoZVxuICAvLyB3YXZlZm9ybS5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBPd25lciBvZiBBdWRpbyBpbnN0YW5jZSBjaGFuZ2VkXG4gICAgaWYgKCFpc0FjdGl2ZSkge1xuICAgICAgbG9nLmluZm8oJ01lc3NhZ2VBdWRpbzogcGF1c2luZyBvbGQgb3duZXInLCBpZCk7XG4gICAgICBzZXRJc1BsYXlpbmcoZmFsc2UpO1xuICAgICAgc2V0Q3VycmVudFRpbWUoMCk7XG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9XG5cbiAgICBjb25zdCBvblRpbWVVcGRhdGUgPSAoKSA9PiB7XG4gICAgICBzZXRDdXJyZW50VGltZShhdWRpby5jdXJyZW50VGltZSk7XG4gICAgICBpZiAoYXVkaW8uY3VycmVudFRpbWUgPiBkdXJhdGlvbikge1xuICAgICAgICBzZXREdXJhdGlvbihhdWRpby5jdXJyZW50VGltZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uRW5kZWQgPSAoKSA9PiB7XG4gICAgICBsb2cuaW5mbygnTWVzc2FnZUF1ZGlvOiBlbmRlZCwgY2hhbmdpbmcgVUknLCBpZCk7XG4gICAgICBzZXRJc1BsYXlpbmcoZmFsc2UpO1xuICAgICAgc2V0Q3VycmVudFRpbWUoMCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uTG9hZGVkTWV0YWRhdGEgPSAoKSA9PiB7XG4gICAgICBhc3NlcnQoXG4gICAgICAgICFOdW1iZXIuaXNOYU4oYXVkaW8uZHVyYXRpb24pLFxuICAgICAgICAnQXVkaW8gc2hvdWxkIGhhdmUgZGVmaW5pdGUgZHVyYXRpb24gb24gYGxvYWRlZG1ldGFkYXRhYCBldmVudCdcbiAgICAgICk7XG5cbiAgICAgIGxvZy5pbmZvKCdNZXNzYWdlQXVkaW86IGBsb2FkZWRtZXRhZGF0YWAgZXZlbnQnLCBpZCk7XG5cbiAgICAgIC8vIFN5bmMtdXAgYXVkaW8ncyB0aW1lIGluIGNhc2UgaWYgPGF1ZGlvLz4gbG9hZGVkIGl0cyBzb3VyY2UgYWZ0ZXJcbiAgICAgIC8vIHVzZXIgY2xpY2tlZCBvbiB3YXZlZm9ybVxuICAgICAgYXVkaW8uY3VycmVudFRpbWUgPSBjdXJyZW50VGltZTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25EdXJhdGlvbkNoYW5nZSA9ICgpID0+IHtcbiAgICAgIGxvZy5pbmZvKCdNZXNzYWdlQXVkaW86IGBkdXJhdGlvbmNoYW5nZWAgZXZlbnQnLCBpZCk7XG5cbiAgICAgIGlmICghTnVtYmVyLmlzTmFOKGF1ZGlvLmR1cmF0aW9uKSkge1xuICAgICAgICBzZXREdXJhdGlvbihNYXRoLm1heChhdWRpby5kdXJhdGlvbiwgMWUtMjMpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIG9uVGltZVVwZGF0ZSk7XG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBvbkVuZGVkKTtcbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIG9uTG9hZGVkTWV0YWRhdGEpO1xuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2R1cmF0aW9uY2hhbmdlJywgb25EdXJhdGlvbkNoYW5nZSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYXVkaW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIG9uVGltZVVwZGF0ZSk7XG4gICAgICBhdWRpby5yZW1vdmVFdmVudExpc3RlbmVyKCdlbmRlZCcsIG9uRW5kZWQpO1xuICAgICAgYXVkaW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBvbkxvYWRlZE1ldGFkYXRhKTtcbiAgICAgIGF1ZGlvLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2R1cmF0aW9uY2hhbmdlJywgb25EdXJhdGlvbkNoYW5nZSk7XG4gICAgfTtcbiAgfSwgW1xuICAgIGlkLFxuICAgIGF1ZGlvLFxuICAgIGlzQWN0aXZlLFxuICAgIGN1cnJlbnRUaW1lLFxuICAgIGR1cmF0aW9uLFxuICAgIHNldEN1cnJlbnRUaW1lLFxuICAgIHNldElzUGxheWluZyxcbiAgXSk7XG5cbiAgLy8gVGhpcyBlZmZlY3QgZGV0ZWN0cyBgaXNQbGF5aW5nYCBjaGFuZ2VzIGFuZCBzdGFydHMvcGF1c2VzIHBsYXliYWNrIHdoZW5cbiAgLy8gbmVlZGVkICgra2VlcHMgd2F2ZWZvcm0gcG9zaXRpb24gYW5kIGF1ZGlvIHBvc2l0aW9uIGluIHN5bmMpLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNBY3RpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNQbGF5aW5nKSB7XG4gICAgICBpZiAoIWF1ZGlvLnBhdXNlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxvZy5pbmZvKCdNZXNzYWdlQXVkaW86IHJlc3VtaW5nIHBsYXliYWNrIGZvcicsIGlkKTtcbiAgICAgIGF1ZGlvLmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWU7XG4gICAgICBhdWRpby5wbGF5KCkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBsb2cuaW5mbygnTWVzc2FnZUF1ZGlvOiByZXN1bWUgZXJyb3InLCBpZCwgZXJyb3Iuc3RhY2sgfHwgZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy5pbmZvKCdNZXNzYWdlQXVkaW86IHBhdXNpbmcgcGxheWJhY2sgZm9yJywgaWQpO1xuICAgICAgYXVkaW8ucGF1c2UoKTtcbiAgICB9XG4gIH0sIFtpZCwgYXVkaW8sIGlzQWN0aXZlLCBpc1BsYXlpbmcsIGN1cnJlbnRUaW1lXSk7XG5cbiAgY29uc3QgdG9nZ2xlSXNQbGF5aW5nID0gKCkgPT4ge1xuICAgIHNldElzUGxheWluZyghaXNQbGF5aW5nKTtcblxuICAgIGlmICghaXNBY3RpdmUgJiYgIWlzUGxheWluZykge1xuICAgICAgbG9nLmluZm8oJ01lc3NhZ2VBdWRpbzogY2hhbmdpbmcgb3duZXInLCBpZCk7XG4gICAgICBzZXRBY3RpdmVBdWRpb0lEKGlkLCByZW5kZXJpbmdDb250ZXh0KTtcblxuICAgICAgLy8gUGF1c2Ugb2xkIGF1ZGlvXG4gICAgICBpZiAoIWF1ZGlvLnBhdXNlZCkge1xuICAgICAgICBhdWRpby5wYXVzZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWF0dGFjaG1lbnQudXJsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnRXhwZWN0ZWQgYXR0YWNobWVudCB1cmwgaW4gdGhlIE1lc3NhZ2VBdWRpbyB3aXRoICcgK1xuICAgICAgICAgICAgYHN0YXRlOiAke3N0YXRlfWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGF1ZGlvLnNyYyA9IGF0dGFjaG1lbnQudXJsO1xuICAgIH1cbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghcGxheWVkICYmIGlzUGxheWluZykge1xuICAgICAgb25GaXJzdFBsYXllZCgpO1xuICAgIH1cbiAgfSwgW3BsYXllZCwgaXNQbGF5aW5nLCBvbkZpcnN0UGxheWVkXSk7XG5cbiAgLy8gQ2xpY2tpbmcgd2F2ZWZvcm0gbW92ZXMgcGxheWJhY2sgaGVhZCBwb3NpdGlvbiBhbmQgc3RhcnRzIHBsYXliYWNrLlxuICBjb25zdCBvbldhdmVmb3JtQ2xpY2sgPSAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKHN0YXRlICE9PSBTdGF0ZS5Ob3JtYWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWlzUGxheWluZykge1xuICAgICAgdG9nZ2xlSXNQbGF5aW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKCF3YXZlZm9ybVJlZi5jdXJyZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYm91bmRpbmdSZWN0ID0gd2F2ZWZvcm1SZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgcHJvZ3Jlc3MgPSAoZXZlbnQucGFnZVggLSBib3VuZGluZ1JlY3QubGVmdCkgLyBib3VuZGluZ1JlY3Qud2lkdGg7XG5cbiAgICBpZiAocHJvZ3Jlc3MgPD0gUkVXSU5EX0JBUl9DT1VOVCAvIEJBUl9DT1VOVCkge1xuICAgICAgcHJvZ3Jlc3MgPSAwO1xuICAgIH1cblxuICAgIGlmIChpc1BsYXlpbmcgJiYgIU51bWJlci5pc05hTihhdWRpby5kdXJhdGlvbikpIHtcbiAgICAgIGF1ZGlvLmN1cnJlbnRUaW1lID0gYXVkaW8uZHVyYXRpb24gKiBwcm9ncmVzcztcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0Q3VycmVudFRpbWUoZHVyYXRpb24gKiBwcm9ncmVzcyk7XG4gICAgfVxuICB9O1xuXG4gIC8vIEtleWJvYXJkIG5hdmlnYXRpb24gZm9yIHdhdmVmb3JtLiBQcmVzc2luZyBrZXlzIG1vdmVzIHBsYXliYWNrIGhlYWRcbiAgLy8gZm9yd2FyZC9iYWNrd2FyZHMuXG4gIGNvbnN0IG9uV2F2ZWZvcm1LZXlEb3duID0gKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgbGV0IGluY3JlbWVudDogbnVtYmVyO1xuICAgIGlmIChldmVudC5rZXkgPT09ICdBcnJvd1JpZ2h0JyB8fCBldmVudC5rZXkgPT09ICdBcnJvd1VwJykge1xuICAgICAgaW5jcmVtZW50ID0gK1NNQUxMX0lOQ1JFTUVOVDtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ0Fycm93TGVmdCcgfHwgZXZlbnQua2V5ID09PSAnQXJyb3dEb3duJykge1xuICAgICAgaW5jcmVtZW50ID0gLVNNQUxMX0lOQ1JFTUVOVDtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ1BhZ2VVcCcpIHtcbiAgICAgIGluY3JlbWVudCA9ICtCSUdfSU5DUkVNRU5UO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnUGFnZURvd24nKSB7XG4gICAgICBpbmNyZW1lbnQgPSAtQklHX0lOQ1JFTUVOVDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV2UgZG9uJ3QgaGFuZGxlIG90aGVyIGtleXNcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgLy8gVGhlcmUgaXMgbm8gYXVkaW8gdG8gcmV3aW5kXG4gICAgaWYgKCFpc0FjdGl2ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF1ZGlvLmN1cnJlbnRUaW1lID0gTWF0aC5taW4oXG4gICAgICBOdW1iZXIuaXNOYU4oYXVkaW8uZHVyYXRpb24pID8gSW5maW5pdHkgOiBhdWRpby5kdXJhdGlvbixcbiAgICAgIE1hdGgubWF4KDAsIGF1ZGlvLmN1cnJlbnRUaW1lICsgaW5jcmVtZW50KVxuICAgICk7XG5cbiAgICBpZiAoIWlzUGxheWluZykge1xuICAgICAgdG9nZ2xlSXNQbGF5aW5nKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBlYWtQb3NpdGlvbiA9IHBlYWtzLmxlbmd0aCAqIChjdXJyZW50VGltZSAvIGR1cmF0aW9uKTtcblxuICBjb25zdCB3YXZlZm9ybSA9IChcbiAgICA8ZGl2XG4gICAgICByZWY9e3dhdmVmb3JtUmVmfVxuICAgICAgY2xhc3NOYW1lPXtgJHtDU1NfQkFTRX1fX3dhdmVmb3JtYH1cbiAgICAgIG9uQ2xpY2s9e29uV2F2ZWZvcm1DbGlja31cbiAgICAgIG9uS2V5RG93bj17b25XYXZlZm9ybUtleURvd259XG4gICAgICB0YWJJbmRleD17MH1cbiAgICAgIHJvbGU9XCJzbGlkZXJcIlxuICAgICAgYXJpYS1sYWJlbD17aTE4bignTWVzc2FnZUF1ZGlvLS1zbGlkZXInKX1cbiAgICAgIGFyaWEtb3JpZW50YXRpb249XCJob3Jpem9udGFsXCJcbiAgICAgIGFyaWEtdmFsdWVub3c9e2xhc3RBcmlhVGltZX1cbiAgICAgIGFyaWEtdmFsdWVtaW49ezB9XG4gICAgICBhcmlhLXZhbHVlbWF4PXtkdXJhdGlvbn1cbiAgICAgIGFyaWEtdmFsdWV0ZXh0PXt0aW1lVG9UZXh0KGxhc3RBcmlhVGltZSl9XG4gICAgPlxuICAgICAge3BlYWtzLm1hcCgocGVhaywgaSkgPT4ge1xuICAgICAgICBsZXQgaGVpZ2h0ID0gTWF0aC5tYXgoQkFSX01JTl9IRUlHSFQsIEJBUl9NQVhfSEVJR0hUICogcGVhayk7XG4gICAgICAgIGlmIChzdGF0ZSAhPT0gU3RhdGUuTm9ybWFsKSB7XG4gICAgICAgICAgaGVpZ2h0ID0gQkFSX05PVF9ET1dOTE9BREVEX0hFSUdIVDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGhpZ2hsaWdodCA9IGkgPCBwZWFrUG9zaXRpb247XG5cbiAgICAgICAgLy8gVXNlIG1heGltdW0gaGVpZ2h0IGZvciBjdXJyZW50IGF1ZGlvIHBvc2l0aW9uXG4gICAgICAgIGlmIChoaWdobGlnaHQgJiYgaSArIDEgPj0gcGVha1Bvc2l0aW9uKSB7XG4gICAgICAgICAgaGVpZ2h0ID0gQkFSX01BWF9IRUlHSFQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBrZXkgPSBpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFtcbiAgICAgICAgICAgICAgYCR7Q1NTX0JBU0V9X193YXZlZm9ybV9fYmFyYCxcbiAgICAgICAgICAgICAgaGlnaGxpZ2h0ID8gYCR7Q1NTX0JBU0V9X193YXZlZm9ybV9fYmFyLS1hY3RpdmVgIDogbnVsbCxcbiAgICAgICAgICAgIF0pfVxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBzdHlsZT17eyBoZWlnaHQgfX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfSl9XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgbGV0IGJ1dHRvbjogUmVhY3QuUmVhY3RFbGVtZW50O1xuICBpZiAoc3RhdGUgPT09IFN0YXRlLlBlbmRpbmcgfHwgc3RhdGUgPT09IFN0YXRlLkNvbXB1dGluZykge1xuICAgIC8vIE5vdCByZWFsbHkgYSBidXR0b24sIGJ1dCB3aG8gY2FyZXM/XG4gICAgYnV0dG9uID0gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgYCR7Q1NTX0JBU0V9X19zcGlubmVyYCxcbiAgICAgICAgICBgJHtDU1NfQkFTRX1fX3NwaW5uZXItLXBlbmRpbmdgXG4gICAgICAgICl9XG4gICAgICAgIHRpdGxlPXtpMThuKCdNZXNzYWdlQXVkaW8tLXBlbmRpbmcnKX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gU3RhdGUuTm90RG93bmxvYWRlZCkge1xuICAgIGJ1dHRvbiA9IChcbiAgICAgIDxCdXR0b25cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgYnV0dG9uUmVmPXtidXR0b25SZWZ9XG4gICAgICAgIG1vZD1cImRvd25sb2FkXCJcbiAgICAgICAgbGFiZWw9XCJNZXNzYWdlQXVkaW8tLWRvd25sb2FkXCJcbiAgICAgICAgb25DbGljaz17a2lja09mZkF0dGFjaG1lbnREb3dubG9hZH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBTdGF0ZS5Ob3JtYWxcbiAgICBidXR0b24gPSAoXG4gICAgICA8QnV0dG9uXG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIGJ1dHRvblJlZj17YnV0dG9uUmVmfVxuICAgICAgICBtb2Q9e2lzUGxheWluZyA/ICdwYXVzZScgOiAncGxheSd9XG4gICAgICAgIGxhYmVsPXtpc1BsYXlpbmcgPyAnTWVzc2FnZUF1ZGlvLS1wYXVzZScgOiAnTWVzc2FnZUF1ZGlvLS1wbGF5J31cbiAgICAgICAgb25DbGljaz17dG9nZ2xlSXNQbGF5aW5nfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgY29uc3QgY291bnREb3duID0gTWF0aC5tYXgoMCwgZHVyYXRpb24gLSBjdXJyZW50VGltZSk7XG5cbiAgY29uc3QgbWV0YWRhdGEgPSAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2Ake0NTU19CQVNFfV9fbWV0YWRhdGFgfT5cbiAgICAgIDxkaXZcbiAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgIGAke0NTU19CQVNFfV9fY291bnRkb3duYCxcbiAgICAgICAgICBgJHtDU1NfQkFTRX1fX2NvdW50ZG93bi0tJHtwbGF5ZWQgPyAncGxheWVkJyA6ICd1bnBsYXllZCd9YFxuICAgICAgICApfVxuICAgICAgPlxuICAgICAgICB7dGltZVRvVGV4dChjb3VudERvd24pfVxuICAgICAgPC9kaXY+XG4gICAgICB7IXdpdGhDb250ZW50QmVsb3cgJiYgIWNvbGxhcHNlTWV0YWRhdGEgJiYgKFxuICAgICAgICA8TWVzc2FnZU1ldGFkYXRhXG4gICAgICAgICAgZGlyZWN0aW9uPXtkaXJlY3Rpb259XG4gICAgICAgICAgZXhwaXJhdGlvbkxlbmd0aD17ZXhwaXJhdGlvbkxlbmd0aH1cbiAgICAgICAgICBleHBpcmF0aW9uVGltZXN0YW1wPXtleHBpcmF0aW9uVGltZXN0YW1wfVxuICAgICAgICAgIGhhc1RleHQ9e3dpdGhDb250ZW50QmVsb3d9XG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBpZD17aWR9XG4gICAgICAgICAgaXNTaG93aW5nSW1hZ2U9e2ZhbHNlfVxuICAgICAgICAgIGlzU3RpY2tlcj17ZmFsc2V9XG4gICAgICAgICAgaXNUYXBUb1ZpZXdFeHBpcmVkPXtmYWxzZX1cbiAgICAgICAgICBzaG93TWVzc2FnZURldGFpbD17c2hvd01lc3NhZ2VEZXRhaWx9XG4gICAgICAgICAgc3RhdHVzPXtzdGF0dXN9XG4gICAgICAgICAgdGV4dFBlbmRpbmc9e3RleHRQZW5kaW5nfVxuICAgICAgICAgIHRpbWVzdGFtcD17dGltZXN0YW1wfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgQ1NTX0JBU0UsXG4gICAgICAgIGAke0NTU19CQVNFfS0tJHtkaXJlY3Rpb259YCxcbiAgICAgICAgd2l0aENvbnRlbnRCZWxvdyA/IGAke0NTU19CQVNFfS0td2l0aC1jb250ZW50LWJlbG93YCA6IG51bGwsXG4gICAgICAgIHdpdGhDb250ZW50QWJvdmUgPyBgJHtDU1NfQkFTRX0tLXdpdGgtY29udGVudC1hYm92ZWAgOiBudWxsXG4gICAgICApfVxuICAgID5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtDU1NfQkFTRX1fX2J1dHRvbi1hbmQtd2F2ZWZvcm1gfT5cbiAgICAgICAge2J1dHRvbn1cbiAgICAgICAge3dhdmVmb3JtfVxuICAgICAgPC9kaXY+XG4gICAgICB7bWV0YWRhdGF9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQU1PO0FBQ1Asd0JBQXVCO0FBQ3ZCLG9CQUFxQjtBQUVyQixvQkFBdUI7QUFHdkIsd0JBQTZCO0FBQzdCLDhCQUFpQztBQUlqQyw2QkFBZ0M7QUFDaEMsVUFBcUI7QUE0Q3JCLElBQUssUUFBTCxrQkFBSyxXQUFMO0FBQ0UsNEJBQWdCO0FBQ2hCLHNCQUFVO0FBQ1Ysd0JBQVk7QUFD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
