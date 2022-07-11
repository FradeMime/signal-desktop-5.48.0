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
var GroupCallRemoteParticipants_exports = {};
__export(GroupCallRemoteParticipants_exports, {
  GroupCallRemoteParticipants: () => GroupCallRemoteParticipants
});
module.exports = __toCommonJS(GroupCallRemoteParticipants_exports);
var import_react = __toESM(require("react"));
var import_react_measure = __toESM(require("react-measure"));
var import_lodash = require("lodash");
var import_GroupCallRemoteParticipant = require("./GroupCallRemoteParticipant");
var import_GroupCallOverflowArea = require("./GroupCallOverflowArea");
var import_useGetCallingFrameBuffer = require("../calling/useGetCallingFrameBuffer");
var import_usePageVisibility = require("../hooks/usePageVisibility");
var import_useDevicePixelRatio = require("../hooks/useDevicePixelRatio");
var import_nonRenderedRemoteParticipant = require("../util/ringrtc/nonRenderedRemoteParticipant");
var import_missingCaseError = require("../util/missingCaseError");
var import_durations = require("../util/durations");
var import_iterables = require("../util/iterables");
var setUtil = __toESM(require("../util/setUtil"));
var log = __toESM(require("../logging/log"));
var import_constants = require("../calling/constants");
const MIN_RENDERED_HEIGHT = 180;
const PARTICIPANT_MARGIN = 10;
const TIME_TO_STOP_REQUESTING_VIDEO_WHEN_PAGE_INVISIBLE = 20 * import_durations.SECOND;
const VIDEO_REQUEST_SCALAR = 0.75;
var VideoRequestMode = /* @__PURE__ */ ((VideoRequestMode2) => {
  VideoRequestMode2["Normal"] = "Normal";
  VideoRequestMode2["LowResolution"] = "LowResolution";
  VideoRequestMode2["NoVideo"] = "NoVideo";
  return VideoRequestMode2;
})(VideoRequestMode || {});
const GroupCallRemoteParticipants = /* @__PURE__ */ __name(({
  getGroupCallVideoFrameSource,
  i18n,
  isInSpeakerView,
  remoteParticipants,
  setGroupCallVideoRequest,
  remoteAudioLevels
}) => {
  const [containerDimensions, setContainerDimensions] = (0, import_react.useState)({
    width: 0,
    height: 0
  });
  const [gridDimensions, setGridDimensions] = (0, import_react.useState)({
    width: 0,
    height: 0
  });
  const devicePixelRatio = (0, import_useDevicePixelRatio.useDevicePixelRatio)();
  const getFrameBuffer = (0, import_useGetCallingFrameBuffer.useGetCallingFrameBuffer)();
  const { invisibleDemuxIds, onParticipantVisibilityChanged } = useInvisibleParticipants(remoteParticipants);
  const maxRowCount = Math.min(remoteParticipants.length, Math.floor(containerDimensions.height / (MIN_RENDERED_HEIGHT + PARTICIPANT_MARGIN)));
  const sortedParticipants = (0, import_react.useMemo)(() => remoteParticipants.concat().sort((a, b) => Number(b.presenting || 0) - Number(a.presenting || 0) || (b.speakerTime || -Infinity) - (a.speakerTime || -Infinity)), [remoteParticipants]);
  const gridParticipants = (0, import_react.useMemo)(() => {
    if (!sortedParticipants.length) {
      return [];
    }
    const candidateParticipants = isInSpeakerView ? [sortedParticipants[0]] : sortedParticipants;
    const maxTotalWidth = maxRowCount * containerDimensions.width;
    let totalWidth = 0;
    return (0, import_lodash.takeWhile)(candidateParticipants, (remoteParticipant) => {
      totalWidth += remoteParticipant.videoAspectRatio * MIN_RENDERED_HEIGHT;
      return totalWidth < maxTotalWidth;
    }).sort(stableParticipantComparator);
  }, [
    containerDimensions.width,
    isInSpeakerView,
    maxRowCount,
    sortedParticipants
  ]);
  const overflowedParticipants = (0, import_react.useMemo)(() => sortedParticipants.slice(gridParticipants.length).sort(stableParticipantComparator), [sortedParticipants, gridParticipants.length]);
  const gridArrangement = (0, import_react.useMemo)(() => {
    let bestArrangement = {
      scalar: -1,
      rows: []
    };
    if (!gridParticipants.length) {
      return bestArrangement;
    }
    for (let rowCount = 1; rowCount <= maxRowCount; rowCount += 1) {
      const numberOfParticipantsInRow = Math.ceil(gridParticipants.length / rowCount);
      const rows = (0, import_lodash.chunk)(gridParticipants, numberOfParticipantsInRow);
      const widestRow = (0, import_lodash.maxBy)(rows, totalRemoteParticipantWidthAtMinHeight);
      if (!widestRow) {
        log.error("Unable to find the widest row, which should be impossible");
        continue;
      }
      const widthScalar = (gridDimensions.width - (widestRow.length + 1) * PARTICIPANT_MARGIN) / totalRemoteParticipantWidthAtMinHeight(widestRow);
      const heightScalar = (gridDimensions.height - (rowCount + 1) * PARTICIPANT_MARGIN) / (rowCount * MIN_RENDERED_HEIGHT);
      const scalar = Math.min(widthScalar, heightScalar);
      if (scalar > bestArrangement.scalar) {
        bestArrangement = { scalar, rows };
      }
    }
    return bestArrangement;
  }, [
    gridParticipants,
    maxRowCount,
    gridDimensions.width,
    gridDimensions.height
  ]);
  const gridParticipantHeight = Math.floor(gridArrangement.scalar * MIN_RENDERED_HEIGHT);
  const gridParticipantHeightWithMargin = gridParticipantHeight + PARTICIPANT_MARGIN;
  const gridTotalRowHeightWithMargin = gridParticipantHeightWithMargin * gridArrangement.rows.length;
  const gridTopOffset = Math.floor((gridDimensions.height - gridTotalRowHeightWithMargin) / 2);
  const rowElements = gridArrangement.rows.map((remoteParticipantsInRow, index) => {
    const top = gridTopOffset + index * gridParticipantHeightWithMargin;
    const totalRowWidthWithoutMargins = totalRemoteParticipantWidthAtMinHeight(remoteParticipantsInRow) * gridArrangement.scalar;
    const totalRowWidth = totalRowWidthWithoutMargins + PARTICIPANT_MARGIN * (remoteParticipantsInRow.length - 1);
    const leftOffset = Math.floor((gridDimensions.width - totalRowWidth) / 2);
    let rowWidthSoFar = 0;
    return remoteParticipantsInRow.map((remoteParticipant) => {
      const { demuxId, videoAspectRatio } = remoteParticipant;
      const audioLevel = remoteAudioLevels.get(demuxId) ?? 0;
      const renderedWidth = Math.floor(videoAspectRatio * gridParticipantHeight);
      const left = rowWidthSoFar + leftOffset;
      rowWidthSoFar += renderedWidth + PARTICIPANT_MARGIN;
      return /* @__PURE__ */ import_react.default.createElement(import_GroupCallRemoteParticipant.GroupCallRemoteParticipant, {
        key: demuxId,
        getFrameBuffer,
        getGroupCallVideoFrameSource,
        height: gridParticipantHeight,
        i18n,
        audioLevel,
        left,
        remoteParticipant,
        top,
        width: renderedWidth
      });
    });
  });
  const videoRequestMode = useVideoRequestMode();
  (0, import_react.useEffect)(() => {
    log.info(`Group call now using ${videoRequestMode} video request mode`);
  }, [videoRequestMode]);
  (0, import_react.useEffect)(() => {
    let videoRequest;
    switch (videoRequestMode) {
      case "Normal" /* Normal */:
        videoRequest = [
          ...gridParticipants.map((participant) => {
            let scalar;
            if (participant.sharingScreen) {
              scalar = Math.max(devicePixelRatio, 1);
            } else {
              scalar = VIDEO_REQUEST_SCALAR;
            }
            return {
              demuxId: participant.demuxId,
              width: (0, import_lodash.clamp)(Math.floor(gridParticipantHeight * participant.videoAspectRatio * scalar), 1, import_constants.MAX_FRAME_WIDTH),
              height: (0, import_lodash.clamp)(Math.floor(gridParticipantHeight * scalar), 1, import_constants.MAX_FRAME_HEIGHT)
            };
          }),
          ...overflowedParticipants.map((participant) => {
            if (invisibleDemuxIds.has(participant.demuxId)) {
              return (0, import_nonRenderedRemoteParticipant.nonRenderedRemoteParticipant)(participant);
            }
            return {
              demuxId: participant.demuxId,
              width: (0, import_lodash.clamp)(Math.floor(import_GroupCallOverflowArea.OVERFLOW_PARTICIPANT_WIDTH * VIDEO_REQUEST_SCALAR), 1, import_constants.MAX_FRAME_WIDTH),
              height: (0, import_lodash.clamp)(Math.floor(import_GroupCallOverflowArea.OVERFLOW_PARTICIPANT_WIDTH / participant.videoAspectRatio * VIDEO_REQUEST_SCALAR), 1, import_constants.MAX_FRAME_HEIGHT)
            };
          })
        ];
        break;
      case "LowResolution" /* LowResolution */:
        videoRequest = remoteParticipants.map((participant) => participant.hasRemoteVideo ? {
          demuxId: participant.demuxId,
          width: 1,
          height: 1
        } : (0, import_nonRenderedRemoteParticipant.nonRenderedRemoteParticipant)(participant));
        break;
      case "NoVideo" /* NoVideo */:
        videoRequest = remoteParticipants.map(import_nonRenderedRemoteParticipant.nonRenderedRemoteParticipant);
        break;
      default:
        log.error((0, import_missingCaseError.missingCaseError)(videoRequestMode));
        videoRequest = remoteParticipants.map(import_nonRenderedRemoteParticipant.nonRenderedRemoteParticipant);
        break;
    }
    setGroupCallVideoRequest(videoRequest);
  }, [
    devicePixelRatio,
    gridParticipantHeight,
    gridParticipants,
    invisibleDemuxIds,
    overflowedParticipants,
    remoteParticipants,
    setGroupCallVideoRequest,
    videoRequestMode
  ]);
  return /* @__PURE__ */ import_react.default.createElement(import_react_measure.default, {
    bounds: true,
    onResize: ({ bounds }) => {
      if (!bounds) {
        log.error("We should be measuring the bounds");
        return;
      }
      setContainerDimensions(bounds);
    }
  }, (containerMeasure) => /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ongoing-call__participants",
    ref: containerMeasure.measureRef
  }, /* @__PURE__ */ import_react.default.createElement(import_react_measure.default, {
    bounds: true,
    onResize: ({ bounds }) => {
      if (!bounds) {
        log.error("We should be measuring the bounds");
        return;
      }
      setGridDimensions(bounds);
    }
  }, (gridMeasure) => /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ongoing-call__participants__grid",
    ref: gridMeasure.measureRef
  }, (0, import_lodash.flatten)(rowElements))), /* @__PURE__ */ import_react.default.createElement(import_GroupCallOverflowArea.GroupCallOverflowArea, {
    getFrameBuffer,
    getGroupCallVideoFrameSource,
    i18n,
    onParticipantVisibilityChanged,
    overflowedParticipants,
    remoteAudioLevels
  })));
}, "GroupCallRemoteParticipants");
function pickDifferentSet(a, b) {
  return a.size === b.size ? a : b;
}
function useInvisibleParticipants(remoteParticipants) {
  const [invisibleDemuxIds, setInvisibleDemuxIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
  const onParticipantVisibilityChanged = (0, import_react.useCallback)((demuxId, isVisible) => {
    setInvisibleDemuxIds((oldInvisibleDemuxIds) => {
      const toggled = setUtil.toggle(oldInvisibleDemuxIds, demuxId, !isVisible);
      return pickDifferentSet(oldInvisibleDemuxIds, toggled);
    });
  }, []);
  (0, import_react.useEffect)(() => {
    log.info(`Invisible demux IDs changed to [${(0, import_iterables.join)(invisibleDemuxIds, ",")}]`);
  }, [invisibleDemuxIds]);
  (0, import_react.useEffect)(() => {
    const remoteParticipantDemuxIds = new Set(remoteParticipants.map((r) => r.demuxId));
    setInvisibleDemuxIds((oldInvisibleDemuxIds) => {
      const staleIds = (0, import_iterables.filter)(oldInvisibleDemuxIds, (id) => !remoteParticipantDemuxIds.has(id));
      const withoutStaleIds = setUtil.remove(oldInvisibleDemuxIds, ...staleIds);
      return pickDifferentSet(oldInvisibleDemuxIds, withoutStaleIds);
    });
  }, [remoteParticipants]);
  return {
    invisibleDemuxIds,
    onParticipantVisibilityChanged
  };
}
function useVideoRequestMode() {
  const isPageVisible = (0, import_usePageVisibility.usePageVisibility)();
  const [result, setResult] = (0, import_react.useState)(isPageVisible ? "Normal" /* Normal */ : "LowResolution" /* LowResolution */);
  (0, import_react.useEffect)(() => {
    if (isPageVisible) {
      setResult("Normal" /* Normal */);
      return import_lodash.noop;
    }
    setResult("LowResolution" /* LowResolution */);
    const timeout = setTimeout(() => {
      setResult("NoVideo" /* NoVideo */);
    }, TIME_TO_STOP_REQUESTING_VIDEO_WHEN_PAGE_INVISIBLE);
    return () => {
      clearTimeout(timeout);
    };
  }, [isPageVisible]);
  return result;
}
function totalRemoteParticipantWidthAtMinHeight(remoteParticipants) {
  return remoteParticipants.reduce((result, { videoAspectRatio }) => result + videoAspectRatio * MIN_RENDERED_HEIGHT, 0);
}
function stableParticipantComparator(a, b) {
  return a.demuxId - b.demuxId;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupCallRemoteParticipants
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBDYWxsUmVtb3RlUGFydGljaXBhbnRzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlU3RhdGUsIHVzZU1lbW8sIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBNZWFzdXJlIGZyb20gJ3JlYWN0LW1lYXN1cmUnO1xuaW1wb3J0IHsgdGFrZVdoaWxlLCBjbGFtcCwgY2h1bmssIG1heEJ5LCBmbGF0dGVuLCBub29wIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB0eXBlIHsgVmlkZW9GcmFtZVNvdXJjZSB9IGZyb20gJ3JpbmdydGMnO1xuaW1wb3J0IHsgR3JvdXBDYWxsUmVtb3RlUGFydGljaXBhbnQgfSBmcm9tICcuL0dyb3VwQ2FsbFJlbW90ZVBhcnRpY2lwYW50JztcbmltcG9ydCB7XG4gIEdyb3VwQ2FsbE92ZXJmbG93QXJlYSxcbiAgT1ZFUkZMT1dfUEFSVElDSVBBTlRfV0lEVEgsXG59IGZyb20gJy4vR3JvdXBDYWxsT3ZlcmZsb3dBcmVhJztcbmltcG9ydCB0eXBlIHtcbiAgR3JvdXBDYWxsUmVtb3RlUGFydGljaXBhbnRUeXBlLFxuICBHcm91cENhbGxWaWRlb1JlcXVlc3QsXG59IGZyb20gJy4uL3R5cGVzL0NhbGxpbmcnO1xuaW1wb3J0IHsgdXNlR2V0Q2FsbGluZ0ZyYW1lQnVmZmVyIH0gZnJvbSAnLi4vY2FsbGluZy91c2VHZXRDYWxsaW5nRnJhbWVCdWZmZXInO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyB1c2VQYWdlVmlzaWJpbGl0eSB9IGZyb20gJy4uL2hvb2tzL3VzZVBhZ2VWaXNpYmlsaXR5JztcbmltcG9ydCB7IHVzZURldmljZVBpeGVsUmF0aW8gfSBmcm9tICcuLi9ob29rcy91c2VEZXZpY2VQaXhlbFJhdGlvJztcbmltcG9ydCB7IG5vblJlbmRlcmVkUmVtb3RlUGFydGljaXBhbnQgfSBmcm9tICcuLi91dGlsL3JpbmdydGMvbm9uUmVuZGVyZWRSZW1vdGVQYXJ0aWNpcGFudCc7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcbmltcG9ydCB7IFNFQ09ORCB9IGZyb20gJy4uL3V0aWwvZHVyYXRpb25zJztcbmltcG9ydCB7IGZpbHRlciwgam9pbiB9IGZyb20gJy4uL3V0aWwvaXRlcmFibGVzJztcbmltcG9ydCAqIGFzIHNldFV0aWwgZnJvbSAnLi4vdXRpbC9zZXRVdGlsJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgeyBNQVhfRlJBTUVfSEVJR0hULCBNQVhfRlJBTUVfV0lEVEggfSBmcm9tICcuLi9jYWxsaW5nL2NvbnN0YW50cyc7XG5cbmNvbnN0IE1JTl9SRU5ERVJFRF9IRUlHSFQgPSAxODA7XG5jb25zdCBQQVJUSUNJUEFOVF9NQVJHSU4gPSAxMDtcbmNvbnN0IFRJTUVfVE9fU1RPUF9SRVFVRVNUSU5HX1ZJREVPX1dIRU5fUEFHRV9JTlZJU0lCTEUgPSAyMCAqIFNFQ09ORDtcblxuLy8gV2Ugc2NhbGUgb3VyIHZpZGVvIHJlcXVlc3RzIGRvd24gZm9yIHBlcmZvcm1hbmNlLiBUaGlzIG51bWJlciBpcyBzb21ld2hhdCBhcmJpdHJhcnkuXG5jb25zdCBWSURFT19SRVFVRVNUX1NDQUxBUiA9IDAuNzU7XG5cbnR5cGUgRGltZW5zaW9ucyA9IHtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG59O1xuXG50eXBlIEdyaWRBcnJhbmdlbWVudCA9IHtcbiAgcm93czogQXJyYXk8QXJyYXk8R3JvdXBDYWxsUmVtb3RlUGFydGljaXBhbnRUeXBlPj47XG4gIHNjYWxhcjogbnVtYmVyO1xufTtcblxudHlwZSBQcm9wc1R5cGUgPSB7XG4gIGdldEdyb3VwQ2FsbFZpZGVvRnJhbWVTb3VyY2U6IChkZW11eElkOiBudW1iZXIpID0+IFZpZGVvRnJhbWVTb3VyY2U7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIGlzSW5TcGVha2VyVmlldzogYm9vbGVhbjtcbiAgcmVtb3RlUGFydGljaXBhbnRzOiBSZWFkb25seUFycmF5PEdyb3VwQ2FsbFJlbW90ZVBhcnRpY2lwYW50VHlwZT47XG4gIHNldEdyb3VwQ2FsbFZpZGVvUmVxdWVzdDogKF86IEFycmF5PEdyb3VwQ2FsbFZpZGVvUmVxdWVzdD4pID0+IHZvaWQ7XG4gIHJlbW90ZUF1ZGlvTGV2ZWxzOiBNYXA8bnVtYmVyLCBudW1iZXI+O1xufTtcblxuZW51bSBWaWRlb1JlcXVlc3RNb2RlIHtcbiAgTm9ybWFsID0gJ05vcm1hbCcsXG4gIExvd1Jlc29sdXRpb24gPSAnTG93UmVzb2x1dGlvbicsXG4gIE5vVmlkZW8gPSAnTm9WaWRlbycsXG59XG5cbi8vIFRoaXMgY29tcG9uZW50IGxheXMgb3V0IGdyb3VwIGNhbGwgcmVtb3RlIHBhcnRpY2lwYW50cy4gSXQgdXNlcyBhIGN1c3RvbSBsYXlvdXRcbi8vICAgYWxnb3JpdGhtIChpbiBvdGhlciB3b3Jkcywgbm90aGluZyB0aGF0IHRoZSBicm93c2VyIHByb3ZpZGVzLCBsaWtlIGZsZXhib3gpIGluXG4vLyAgIG9yZGVyIHRvIGFuaW1hdGUgdGhlIGJveGVzIGFzIHRoZXkgbW92ZSBhcm91bmQsIGFuZCB0byBmaWd1cmUgb3V0IHRoZSByaWdodCBmaXRzLlxuLy9cbi8vIEl0J3Mgd29ydGggbG9va2luZyBhdCB0aGUgVUkgKG9yIGEgZGVzaWduIG9mIGl0KSB0byBnZXQgYW4gaWRlYSBvZiBob3cgaXQgd29ya3MuIFNvbWVcbi8vICAgdGhpbmdzIHRvIG5vdGljZTpcbi8vXG4vLyAqIFBhcnRpY2lwYW50cyBhcmUgYXJyYW5nZWQgaW4gMCBvciBtb3JlIHJvd3MuXG4vLyAqIEVhY2ggcm93IGlzIHRoZSBzYW1lIGhlaWdodCwgYnV0IGVhY2ggcGFydGljaXBhbnQgbWF5IGhhdmUgYSBkaWZmZXJlbnQgd2lkdGguXG4vLyAqIEl0J3MgcG9zc2libGUsIG9uIHNtYWxsIHNjcmVlbnMgd2l0aCBsb3RzIG9mIHBhcnRpY2lwYW50cywgdG8gaGF2ZSBwYXJ0aWNpcGFudHNcbi8vICAgcmVtb3ZlZCBmcm9tIHRoZSBncmlkLiBUaGlzIGlzIGJlY2F1c2UgcGFydGljaXBhbnRzIGhhdmUgYSBtaW5pbXVtIHJlbmRlcmVkIGhlaWdodC5cbi8vXG4vLyBUaGVyZSBzaG91bGQgYmUgbW9yZSBzcGVjaWZpYyBjb21tZW50cyB0aHJvdWdob3V0LCBidXQgdGhlIGhpZ2gtbGV2ZWwgc3RlcHMgYXJlOlxuLy9cbi8vIDEuIEZpZ3VyZSBvdXQgdGhlIG1heGltdW0gbnVtYmVyIG9mIHBvc3NpYmxlIHJvd3MgdGhhdCBjb3VsZCBmaXQgb24gdGhlIHNjcmVlbjsgdGhpcyBpc1xuLy8gICAgYG1heFJvd0NvdW50YC5cbi8vIDIuIFNwbGl0IHRoZSBwYXJ0aWNpcGFudHMgaW50byB0d28gZ3JvdXBzOiBvbmVzIGluIHRoZSBtYWluIGdyaWQgYW5kIG9uZXMgaW4gdGhlXG4vLyAgICBvdmVyZmxvdyBhcmVhLiBUaGUgZ3JpZCBzaG91bGQgcHJpb3JpdGl6ZSBwYXJ0aWNpcGFudHMgd2hvIGhhdmUgcmVjZW50bHkgc3Bva2VuLlxuLy8gMy4gRm9yIGVhY2ggcG9zc2libGUgbnVtYmVyIG9mIHJvd3MgKHN0YXJ0aW5nIGF0IDAgYW5kIGVuZGluZyBhdCBgbWF4Um93Q291bnRgKSxcbi8vICAgIGRpc3RyaWJ1dGUgcGFydGljaXBhbnRzIGFjcm9zcyB0aGUgcm93cyBhdCB0aGUgbWluaW11bSBoZWlnaHQuIFRoZW4gZmluZCB0aGVcbi8vICAgIFwic2NhbGFyXCI6IGhvdyBtdWNoIGNhbiB3ZSBzY2FsZSB0aGVzZSBib3hlcyB1cCB3aGlsZSBzdGlsbCBmaXR0aW5nIHRoZW0gb24gdGhlXG4vLyAgICBzY3JlZW4/IFRoZSBiaWdnZXN0IHNjYWxhciB3aW5zIGFzIHRoZSBcImJlc3QgYXJyYW5nZW1lbnRcIi5cbi8vIDQuIExheSBvdXQgdGhpcyBhcnJhbmdlbWVudCBvbiB0aGUgc2NyZWVuLlxuZXhwb3J0IGNvbnN0IEdyb3VwQ2FsbFJlbW90ZVBhcnRpY2lwYW50czogUmVhY3QuRkM8UHJvcHNUeXBlPiA9ICh7XG4gIGdldEdyb3VwQ2FsbFZpZGVvRnJhbWVTb3VyY2UsXG4gIGkxOG4sXG4gIGlzSW5TcGVha2VyVmlldyxcbiAgcmVtb3RlUGFydGljaXBhbnRzLFxuICBzZXRHcm91cENhbGxWaWRlb1JlcXVlc3QsXG4gIHJlbW90ZUF1ZGlvTGV2ZWxzLFxufSkgPT4ge1xuICBjb25zdCBbY29udGFpbmVyRGltZW5zaW9ucywgc2V0Q29udGFpbmVyRGltZW5zaW9uc10gPSB1c2VTdGF0ZTxEaW1lbnNpb25zPih7XG4gICAgd2lkdGg6IDAsXG4gICAgaGVpZ2h0OiAwLFxuICB9KTtcbiAgY29uc3QgW2dyaWREaW1lbnNpb25zLCBzZXRHcmlkRGltZW5zaW9uc10gPSB1c2VTdGF0ZTxEaW1lbnNpb25zPih7XG4gICAgd2lkdGg6IDAsXG4gICAgaGVpZ2h0OiAwLFxuICB9KTtcblxuICBjb25zdCBkZXZpY2VQaXhlbFJhdGlvID0gdXNlRGV2aWNlUGl4ZWxSYXRpbygpO1xuXG4gIGNvbnN0IGdldEZyYW1lQnVmZmVyID0gdXNlR2V0Q2FsbGluZ0ZyYW1lQnVmZmVyKCk7XG5cbiAgY29uc3QgeyBpbnZpc2libGVEZW11eElkcywgb25QYXJ0aWNpcGFudFZpc2liaWxpdHlDaGFuZ2VkIH0gPVxuICAgIHVzZUludmlzaWJsZVBhcnRpY2lwYW50cyhyZW1vdGVQYXJ0aWNpcGFudHMpO1xuXG4gIC8vIDEuIEZpZ3VyZSBvdXQgdGhlIG1heGltdW0gbnVtYmVyIG9mIHBvc3NpYmxlIHJvd3MgdGhhdCBjb3VsZCBmaXQgb24gdGhlIHNjcmVlbi5cbiAgLy9cbiAgLy8gV2UgY2hvb3NlIHRoZSBzbWFsbGVyIG9mIHRoZXNlIHR3byBvcHRpb25zOlxuICAvL1xuICAvLyAtIFRoZSBudW1iZXIgb2YgcGFydGljaXBhbnRzLCB3aGljaCBtZWFucyB0aGVyZSdkIGJlIG9uZSBwYXJ0aWNpcGFudCBwZXIgcm93LlxuICAvLyAtIFRoZSBudW1iZXIgb2YgcG9zc2libGUgcm93cyBpbiB0aGUgY29udGFpbmVyLCBhc3N1bWluZyBhbGwgcGFydGljaXBhbnRzIHdlcmVcbiAgLy8gICByZW5kZXJlZCBhdCBtaW5pbXVtIGhlaWdodC4gRG9lc24ndCByZWx5IG9uIHRoZSBudW1iZXIgb2YgcGFydGljaXBhbnRzXHUyMDE0aXQncyBzb21lXG4gIC8vICAgc2ltcGxlIGRpdmlzaW9uLlxuICAvL1xuICAvLyBDb3VsZCBiZSAwIGlmIChhKSB0aGVyZSBhcmUgbm8gcGFydGljaXBhbnRzIChiKSB0aGUgY29udGFpbmVyJ3MgaGVpZ2h0IGlzIHNtYWxsLlxuICBjb25zdCBtYXhSb3dDb3VudCA9IE1hdGgubWluKFxuICAgIHJlbW90ZVBhcnRpY2lwYW50cy5sZW5ndGgsXG4gICAgTWF0aC5mbG9vcihcbiAgICAgIGNvbnRhaW5lckRpbWVuc2lvbnMuaGVpZ2h0IC8gKE1JTl9SRU5ERVJFRF9IRUlHSFQgKyBQQVJUSUNJUEFOVF9NQVJHSU4pXG4gICAgKVxuICApO1xuXG4gIC8vIDIuIFNwbGl0IHBhcnRpY2lwYW50cyBpbnRvIHR3byBncm91cHM6IG9uZXMgaW4gdGhlIG1haW4gZ3JpZCBhbmQgb25lcyBpbiB0aGUgb3ZlcmZsb3dcbiAgLy8gICBzaWRlYmFyLlxuICAvL1xuICAvLyBXZSBzdGFydCBieSBzb3J0aW5nIGJ5IGBwcmVzZW50aW5nYCBmaXJzdCBzaW5jZSBwcmVzZW50ZXJzIHNob3VsZCBiZSBvbiB0aGUgbWFpbiBncmlkXG4gIC8vICAgdGhlbiB3ZSBzb3J0IGJ5IGBzcGVha2VyVGltZWAgc28gdGhhdCB0aGUgbW9zdCByZWNlbnQgc3BlYWtlcnMgYXJlIG5leHQgaW5cbiAgLy8gICBsaW5lIGZvciB0aGUgbWFpbiBncmlkLiBUaGVuIHdlIHNwbGl0IHRoZSBsaXN0IGluIHR3bzogb25lIGZvciB0aGUgZ3JpZCBhbmQgb25lIGZvclxuICAvLyAgIHRoZSBvdmVyZmxvdyBhcmVhLlxuICAvL1xuICAvLyBPbmNlIHdlJ3ZlIHNvcnRlZCBwYXJ0aWNpcGFudHMgaW50byB0aGVpciByZXNwZWN0aXZlIGdyb3Vwcywgd2Ugc29ydCB0aGVtIG9uXG4gIC8vICAgc29tZXRoaW5nIHN0YWJsZSAodGhlIGBkZW11eElkYCwgYnV0IHdlIGNvdWxkIGNob29zZSBzb21ldGhpbmcgZWxzZSkgc28gdGhhdCBwZW9wbGVcbiAgLy8gICBkb24ndCBqdW1wIGFyb3VuZCB3aXRoaW4gdGhlIGdyb3VwLlxuICAvL1xuICAvLyBUaGVzZSBhcmUgcHJpbWFyaWx5IG1lbW9pemVkIGZvciBjbGFyaXR5LCBub3QgcGVyZm9ybWFuY2UuXG4gIGNvbnN0IHNvcnRlZFBhcnRpY2lwYW50czogQXJyYXk8R3JvdXBDYWxsUmVtb3RlUGFydGljaXBhbnRUeXBlPiA9IHVzZU1lbW8oXG4gICAgKCkgPT5cbiAgICAgIHJlbW90ZVBhcnRpY2lwYW50c1xuICAgICAgICAuY29uY2F0KClcbiAgICAgICAgLnNvcnQoXG4gICAgICAgICAgKGEsIGIpID0+XG4gICAgICAgICAgICBOdW1iZXIoYi5wcmVzZW50aW5nIHx8IDApIC0gTnVtYmVyKGEucHJlc2VudGluZyB8fCAwKSB8fFxuICAgICAgICAgICAgKGIuc3BlYWtlclRpbWUgfHwgLUluZmluaXR5KSAtIChhLnNwZWFrZXJUaW1lIHx8IC1JbmZpbml0eSlcbiAgICAgICAgKSxcbiAgICBbcmVtb3RlUGFydGljaXBhbnRzXVxuICApO1xuICBjb25zdCBncmlkUGFydGljaXBhbnRzOiBBcnJheTxHcm91cENhbGxSZW1vdGVQYXJ0aWNpcGFudFR5cGU+ID1cbiAgICB1c2VNZW1vKCgpID0+IHtcbiAgICAgIGlmICghc29ydGVkUGFydGljaXBhbnRzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNhbmRpZGF0ZVBhcnRpY2lwYW50cyA9IGlzSW5TcGVha2VyVmlld1xuICAgICAgICA/IFtzb3J0ZWRQYXJ0aWNpcGFudHNbMF1dXG4gICAgICAgIDogc29ydGVkUGFydGljaXBhbnRzO1xuXG4gICAgICAvLyBJbWFnaW5lIHRoYXQgd2UgbGFpZCBvdXQgYWxsIG9mIHRoZSByb3dzIGVuZC10by1lbmQuIFRoYXQncyB0aGUgbWF4aW11bSB0b3RhbFxuICAgICAgLy8gICB3aWR0aC4gU28gaWYgdGhlcmUgd2VyZSA1IHJvd3MgYW5kIHRoZSBjb250YWluZXIgd2FzIDEwMHB4IHdpZGUsIHRoZW4gd2UgY2FuJ3RcbiAgICAgIC8vICAgcG9zc2libHkgZml0IG1vcmUgdGhhbiA1MDBweCBvZiBwYXJ0aWNpcGFudHMuXG4gICAgICBjb25zdCBtYXhUb3RhbFdpZHRoID0gbWF4Um93Q291bnQgKiBjb250YWluZXJEaW1lbnNpb25zLndpZHRoO1xuXG4gICAgICAvLyBXZSBkbyB0aGUgc2FtZSB0aGluZyBmb3IgcGFydGljaXBhbnRzLCBcImxheWluZyB0aGVtIG91dCBlbmQtdG8tZW5kXCIgdW50aWwgdGhleVxuICAgICAgLy8gICBleGNlZWQgdGhlIG1heGltdW0gdG90YWwgd2lkdGguXG4gICAgICBsZXQgdG90YWxXaWR0aCA9IDA7XG4gICAgICByZXR1cm4gdGFrZVdoaWxlKGNhbmRpZGF0ZVBhcnRpY2lwYW50cywgcmVtb3RlUGFydGljaXBhbnQgPT4ge1xuICAgICAgICB0b3RhbFdpZHRoICs9IHJlbW90ZVBhcnRpY2lwYW50LnZpZGVvQXNwZWN0UmF0aW8gKiBNSU5fUkVOREVSRURfSEVJR0hUO1xuICAgICAgICByZXR1cm4gdG90YWxXaWR0aCA8IG1heFRvdGFsV2lkdGg7XG4gICAgICB9KS5zb3J0KHN0YWJsZVBhcnRpY2lwYW50Q29tcGFyYXRvcik7XG4gICAgfSwgW1xuICAgICAgY29udGFpbmVyRGltZW5zaW9ucy53aWR0aCxcbiAgICAgIGlzSW5TcGVha2VyVmlldyxcbiAgICAgIG1heFJvd0NvdW50LFxuICAgICAgc29ydGVkUGFydGljaXBhbnRzLFxuICAgIF0pO1xuICBjb25zdCBvdmVyZmxvd2VkUGFydGljaXBhbnRzOiBBcnJheTxHcm91cENhbGxSZW1vdGVQYXJ0aWNpcGFudFR5cGU+ID0gdXNlTWVtbyhcbiAgICAoKSA9PlxuICAgICAgc29ydGVkUGFydGljaXBhbnRzXG4gICAgICAgIC5zbGljZShncmlkUGFydGljaXBhbnRzLmxlbmd0aClcbiAgICAgICAgLnNvcnQoc3RhYmxlUGFydGljaXBhbnRDb21wYXJhdG9yKSxcbiAgICBbc29ydGVkUGFydGljaXBhbnRzLCBncmlkUGFydGljaXBhbnRzLmxlbmd0aF1cbiAgKTtcblxuICAvLyAzLiBGb3IgZWFjaCBwb3NzaWJsZSBudW1iZXIgb2Ygcm93cyAoc3RhcnRpbmcgYXQgMCBhbmQgZW5kaW5nIGF0IGBtYXhSb3dDb3VudGApLFxuICAvLyAgIGRpc3RyaWJ1dGUgcGFydGljaXBhbnRzIGFjcm9zcyB0aGUgcm93cyBhdCB0aGUgbWluaW11bSBoZWlnaHQuIFRoZW4gZmluZCB0aGVcbiAgLy8gICBcInNjYWxhclwiOiBob3cgbXVjaCBjYW4gd2Ugc2NhbGUgdGhlc2UgYm94ZXMgdXAgd2hpbGUgc3RpbGwgZml0dGluZyB0aGVtIG9uIHRoZVxuICAvLyAgIHNjcmVlbj8gVGhlIGJpZ2dlc3Qgc2NhbGFyIHdpbnMgYXMgdGhlIFwiYmVzdCBhcnJhbmdlbWVudFwiLlxuICBjb25zdCBncmlkQXJyYW5nZW1lbnQ6IEdyaWRBcnJhbmdlbWVudCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGxldCBiZXN0QXJyYW5nZW1lbnQ6IEdyaWRBcnJhbmdlbWVudCA9IHtcbiAgICAgIHNjYWxhcjogLTEsXG4gICAgICByb3dzOiBbXSxcbiAgICB9O1xuXG4gICAgaWYgKCFncmlkUGFydGljaXBhbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGJlc3RBcnJhbmdlbWVudDtcbiAgICB9XG5cbiAgICBmb3IgKGxldCByb3dDb3VudCA9IDE7IHJvd0NvdW50IDw9IG1heFJvd0NvdW50OyByb3dDb3VudCArPSAxKSB7XG4gICAgICAvLyBXZSBkbyBzb21ldGhpbmcgcHJldHR5IG5hXHUwMEVGdmUgaGVyZSBhbmQgY2h1bmsgdGhlIGdyaWQncyBwYXJ0aWNpcGFudHMgaW50byByb3dzLlxuICAgICAgLy8gICBGb3IgZXhhbXBsZSwgaWYgdGhlcmUgd2VyZSAxMiBncmlkIHBhcnRpY2lwYW50cyBhbmQgYHJvd0NvdW50ID09PSAzYCwgdGhlcmVcbiAgICAgIC8vICAgd291bGQgYmUgNCBwYXJ0aWNpcGFudHMgcGVyIHJvdy5cbiAgICAgIC8vXG4gICAgICAvLyBUaGlzIG5hXHUwMEVGdmUgY2h1bmtpbmcgaXMgc3Vib3B0aW1hbCBpbiB0ZXJtcyBvZiBhYnNvbHV0ZSBiZXN0IGZpdCwgYnV0IGl0IGlzIG11Y2hcbiAgICAgIC8vICAgZmFzdGVyIGFuZCBzaW1wbGVyIHRoYW4gdHJ5aW5nIHRvIGRvIHRoaXMgcGVyZmVjdGx5LiBJbiBwcmFjdGljZSwgdGhpcyB3b3Jrc1xuICAgICAgLy8gICBmaW5lIGluIHRoZSBVSSBmcm9tIG91ciB0ZXN0aW5nLlxuICAgICAgY29uc3QgbnVtYmVyT2ZQYXJ0aWNpcGFudHNJblJvdyA9IE1hdGguY2VpbChcbiAgICAgICAgZ3JpZFBhcnRpY2lwYW50cy5sZW5ndGggLyByb3dDb3VudFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJvd3MgPSBjaHVuayhncmlkUGFydGljaXBhbnRzLCBudW1iZXJPZlBhcnRpY2lwYW50c0luUm93KTtcblxuICAgICAgLy8gV2UgbmVlZCB0byBmaW5kIHRoZSBzY2FsYXIgZm9yIHRoaXMgYXJyYW5nZW1lbnQuIEltYWdpbmUgdGhhdCB3ZSBoYXZlIHRoZXNlXG4gICAgICAvLyAgIHBhcnRpY2lwYW50cyBhdCB0aGUgbWluaW11bSBoZWlnaHRzLCBhbmQgd2Ugd2FudCB0byBzY2FsZSBldmVyeXRoaW5nIHVwIHVudGlsXG4gICAgICAvLyAgIGl0J3MgYWJvdXQgdG8gb3ZlcmZsb3cuXG4gICAgICAvL1xuICAgICAgLy8gV2UgZG9uJ3Qgd2FudCBpdCB0byBvdmVyZmxvdyBob3Jpem9udGFsbHkgb3IgdmVydGljYWxseSwgc28gd2UgY2FsY3VsYXRlIGFcbiAgICAgIC8vICAgXCJ3aWR0aCBzY2FsYXJcIiBhbmQgXCJoZWlnaHQgc2NhbGFyXCIgYW5kIGNob29zZSB0aGUgc21hbGxlciBvZiB0aGUgdHdvLiAoQ2hvb3NpbmdcbiAgICAgIC8vICAgdGhlIExBUkdFUiBvZiB0aGUgdHdvIGNvdWxkIGNhdXNlIG92ZXJmbG93LilcbiAgICAgIGNvbnN0IHdpZGVzdFJvdyA9IG1heEJ5KHJvd3MsIHRvdGFsUmVtb3RlUGFydGljaXBhbnRXaWR0aEF0TWluSGVpZ2h0KTtcbiAgICAgIGlmICghd2lkZXN0Um93KSB7XG4gICAgICAgIGxvZy5lcnJvcignVW5hYmxlIHRvIGZpbmQgdGhlIHdpZGVzdCByb3csIHdoaWNoIHNob3VsZCBiZSBpbXBvc3NpYmxlJyk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY29uc3Qgd2lkdGhTY2FsYXIgPVxuICAgICAgICAoZ3JpZERpbWVuc2lvbnMud2lkdGggLSAod2lkZXN0Um93Lmxlbmd0aCArIDEpICogUEFSVElDSVBBTlRfTUFSR0lOKSAvXG4gICAgICAgIHRvdGFsUmVtb3RlUGFydGljaXBhbnRXaWR0aEF0TWluSGVpZ2h0KHdpZGVzdFJvdyk7XG4gICAgICBjb25zdCBoZWlnaHRTY2FsYXIgPVxuICAgICAgICAoZ3JpZERpbWVuc2lvbnMuaGVpZ2h0IC0gKHJvd0NvdW50ICsgMSkgKiBQQVJUSUNJUEFOVF9NQVJHSU4pIC9cbiAgICAgICAgKHJvd0NvdW50ICogTUlOX1JFTkRFUkVEX0hFSUdIVCk7XG4gICAgICBjb25zdCBzY2FsYXIgPSBNYXRoLm1pbih3aWR0aFNjYWxhciwgaGVpZ2h0U2NhbGFyKTtcblxuICAgICAgLy8gSWYgdGhpcyBzY2FsYXIgaXMgdGhlIGJlc3Qgb25lIHNvIGZhciwgd2UgdXNlIHRoYXQuXG4gICAgICBpZiAoc2NhbGFyID4gYmVzdEFycmFuZ2VtZW50LnNjYWxhcikge1xuICAgICAgICBiZXN0QXJyYW5nZW1lbnQgPSB7IHNjYWxhciwgcm93cyB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBiZXN0QXJyYW5nZW1lbnQ7XG4gIH0sIFtcbiAgICBncmlkUGFydGljaXBhbnRzLFxuICAgIG1heFJvd0NvdW50LFxuICAgIGdyaWREaW1lbnNpb25zLndpZHRoLFxuICAgIGdyaWREaW1lbnNpb25zLmhlaWdodCxcbiAgXSk7XG5cbiAgLy8gNC4gTGF5IG91dCB0aGlzIGFycmFuZ2VtZW50IG9uIHRoZSBzY3JlZW4uXG4gIGNvbnN0IGdyaWRQYXJ0aWNpcGFudEhlaWdodCA9IE1hdGguZmxvb3IoXG4gICAgZ3JpZEFycmFuZ2VtZW50LnNjYWxhciAqIE1JTl9SRU5ERVJFRF9IRUlHSFRcbiAgKTtcbiAgY29uc3QgZ3JpZFBhcnRpY2lwYW50SGVpZ2h0V2l0aE1hcmdpbiA9XG4gICAgZ3JpZFBhcnRpY2lwYW50SGVpZ2h0ICsgUEFSVElDSVBBTlRfTUFSR0lOO1xuICBjb25zdCBncmlkVG90YWxSb3dIZWlnaHRXaXRoTWFyZ2luID1cbiAgICBncmlkUGFydGljaXBhbnRIZWlnaHRXaXRoTWFyZ2luICogZ3JpZEFycmFuZ2VtZW50LnJvd3MubGVuZ3RoO1xuICBjb25zdCBncmlkVG9wT2Zmc2V0ID0gTWF0aC5mbG9vcihcbiAgICAoZ3JpZERpbWVuc2lvbnMuaGVpZ2h0IC0gZ3JpZFRvdGFsUm93SGVpZ2h0V2l0aE1hcmdpbikgLyAyXG4gICk7XG5cbiAgY29uc3Qgcm93RWxlbWVudHM6IEFycmF5PEFycmF5PEpTWC5FbGVtZW50Pj4gPSBncmlkQXJyYW5nZW1lbnQucm93cy5tYXAoXG4gICAgKHJlbW90ZVBhcnRpY2lwYW50c0luUm93LCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgdG9wID0gZ3JpZFRvcE9mZnNldCArIGluZGV4ICogZ3JpZFBhcnRpY2lwYW50SGVpZ2h0V2l0aE1hcmdpbjtcblxuICAgICAgY29uc3QgdG90YWxSb3dXaWR0aFdpdGhvdXRNYXJnaW5zID1cbiAgICAgICAgdG90YWxSZW1vdGVQYXJ0aWNpcGFudFdpZHRoQXRNaW5IZWlnaHQocmVtb3RlUGFydGljaXBhbnRzSW5Sb3cpICpcbiAgICAgICAgZ3JpZEFycmFuZ2VtZW50LnNjYWxhcjtcbiAgICAgIGNvbnN0IHRvdGFsUm93V2lkdGggPVxuICAgICAgICB0b3RhbFJvd1dpZHRoV2l0aG91dE1hcmdpbnMgK1xuICAgICAgICBQQVJUSUNJUEFOVF9NQVJHSU4gKiAocmVtb3RlUGFydGljaXBhbnRzSW5Sb3cubGVuZ3RoIC0gMSk7XG4gICAgICBjb25zdCBsZWZ0T2Zmc2V0ID0gTWF0aC5mbG9vcigoZ3JpZERpbWVuc2lvbnMud2lkdGggLSB0b3RhbFJvd1dpZHRoKSAvIDIpO1xuXG4gICAgICBsZXQgcm93V2lkdGhTb0ZhciA9IDA7XG4gICAgICByZXR1cm4gcmVtb3RlUGFydGljaXBhbnRzSW5Sb3cubWFwKHJlbW90ZVBhcnRpY2lwYW50ID0+IHtcbiAgICAgICAgY29uc3QgeyBkZW11eElkLCB2aWRlb0FzcGVjdFJhdGlvIH0gPSByZW1vdGVQYXJ0aWNpcGFudDtcblxuICAgICAgICBjb25zdCBhdWRpb0xldmVsID0gcmVtb3RlQXVkaW9MZXZlbHMuZ2V0KGRlbXV4SWQpID8/IDA7XG5cbiAgICAgICAgY29uc3QgcmVuZGVyZWRXaWR0aCA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgdmlkZW9Bc3BlY3RSYXRpbyAqIGdyaWRQYXJ0aWNpcGFudEhlaWdodFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBsZWZ0ID0gcm93V2lkdGhTb0ZhciArIGxlZnRPZmZzZXQ7XG5cbiAgICAgICAgcm93V2lkdGhTb0ZhciArPSByZW5kZXJlZFdpZHRoICsgUEFSVElDSVBBTlRfTUFSR0lOO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPEdyb3VwQ2FsbFJlbW90ZVBhcnRpY2lwYW50XG4gICAgICAgICAgICBrZXk9e2RlbXV4SWR9XG4gICAgICAgICAgICBnZXRGcmFtZUJ1ZmZlcj17Z2V0RnJhbWVCdWZmZXJ9XG4gICAgICAgICAgICBnZXRHcm91cENhbGxWaWRlb0ZyYW1lU291cmNlPXtnZXRHcm91cENhbGxWaWRlb0ZyYW1lU291cmNlfVxuICAgICAgICAgICAgaGVpZ2h0PXtncmlkUGFydGljaXBhbnRIZWlnaHR9XG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgYXVkaW9MZXZlbD17YXVkaW9MZXZlbH1cbiAgICAgICAgICAgIGxlZnQ9e2xlZnR9XG4gICAgICAgICAgICByZW1vdGVQYXJ0aWNpcGFudD17cmVtb3RlUGFydGljaXBhbnR9XG4gICAgICAgICAgICB0b3A9e3RvcH1cbiAgICAgICAgICAgIHdpZHRoPXtyZW5kZXJlZFdpZHRofVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG4gICk7XG5cbiAgY29uc3QgdmlkZW9SZXF1ZXN0TW9kZSA9IHVzZVZpZGVvUmVxdWVzdE1vZGUoKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2cuaW5mbyhgR3JvdXAgY2FsbCBub3cgdXNpbmcgJHt2aWRlb1JlcXVlc3RNb2RlfSB2aWRlbyByZXF1ZXN0IG1vZGVgKTtcbiAgfSwgW3ZpZGVvUmVxdWVzdE1vZGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCB2aWRlb1JlcXVlc3Q6IEFycmF5PEdyb3VwQ2FsbFZpZGVvUmVxdWVzdD47XG5cbiAgICBzd2l0Y2ggKHZpZGVvUmVxdWVzdE1vZGUpIHtcbiAgICAgIGNhc2UgVmlkZW9SZXF1ZXN0TW9kZS5Ob3JtYWw6XG4gICAgICAgIHZpZGVvUmVxdWVzdCA9IFtcbiAgICAgICAgICAuLi5ncmlkUGFydGljaXBhbnRzLm1hcChwYXJ0aWNpcGFudCA9PiB7XG4gICAgICAgICAgICBsZXQgc2NhbGFyOiBudW1iZXI7XG4gICAgICAgICAgICBpZiAocGFydGljaXBhbnQuc2hhcmluZ1NjcmVlbikge1xuICAgICAgICAgICAgICAvLyBXZSB3YW50IGJlc3QtcmVzb2x1dGlvbiB2aWRlbyBpZiBzb21lb25lIGlzIHNoYXJpbmcgdGhlaXIgc2NyZWVuLlxuICAgICAgICAgICAgICBzY2FsYXIgPSBNYXRoLm1heChkZXZpY2VQaXhlbFJhdGlvLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNjYWxhciA9IFZJREVPX1JFUVVFU1RfU0NBTEFSO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgZGVtdXhJZDogcGFydGljaXBhbnQuZGVtdXhJZCxcbiAgICAgICAgICAgICAgd2lkdGg6IGNsYW1wKFxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgICBncmlkUGFydGljaXBhbnRIZWlnaHQgKiBwYXJ0aWNpcGFudC52aWRlb0FzcGVjdFJhdGlvICogc2NhbGFyXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgIE1BWF9GUkFNRV9XSURUSFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBoZWlnaHQ6IGNsYW1wKFxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoZ3JpZFBhcnRpY2lwYW50SGVpZ2h0ICogc2NhbGFyKSxcbiAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgIE1BWF9GUkFNRV9IRUlHSFRcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSksXG4gICAgICAgICAgLi4ub3ZlcmZsb3dlZFBhcnRpY2lwYW50cy5tYXAocGFydGljaXBhbnQgPT4ge1xuICAgICAgICAgICAgaWYgKGludmlzaWJsZURlbXV4SWRzLmhhcyhwYXJ0aWNpcGFudC5kZW11eElkKSkge1xuICAgICAgICAgICAgICByZXR1cm4gbm9uUmVuZGVyZWRSZW1vdGVQYXJ0aWNpcGFudChwYXJ0aWNpcGFudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGRlbXV4SWQ6IHBhcnRpY2lwYW50LmRlbXV4SWQsXG4gICAgICAgICAgICAgIHdpZHRoOiBjbGFtcChcbiAgICAgICAgICAgICAgICBNYXRoLmZsb29yKE9WRVJGTE9XX1BBUlRJQ0lQQU5UX1dJRFRIICogVklERU9fUkVRVUVTVF9TQ0FMQVIpLFxuICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgTUFYX0ZSQU1FX1dJRFRIXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIGhlaWdodDogY2xhbXAoXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgICAgIChPVkVSRkxPV19QQVJUSUNJUEFOVF9XSURUSCAvIHBhcnRpY2lwYW50LnZpZGVvQXNwZWN0UmF0aW8pICpcbiAgICAgICAgICAgICAgICAgICAgVklERU9fUkVRVUVTVF9TQ0FMQVJcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgTUFYX0ZSQU1FX0hFSUdIVFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFZpZGVvUmVxdWVzdE1vZGUuTG93UmVzb2x1dGlvbjpcbiAgICAgICAgdmlkZW9SZXF1ZXN0ID0gcmVtb3RlUGFydGljaXBhbnRzLm1hcChwYXJ0aWNpcGFudCA9PlxuICAgICAgICAgIHBhcnRpY2lwYW50Lmhhc1JlbW90ZVZpZGVvXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBkZW11eElkOiBwYXJ0aWNpcGFudC5kZW11eElkLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBub25SZW5kZXJlZFJlbW90ZVBhcnRpY2lwYW50KHBhcnRpY2lwYW50KVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVmlkZW9SZXF1ZXN0TW9kZS5Ob1ZpZGVvOlxuICAgICAgICB2aWRlb1JlcXVlc3QgPSByZW1vdGVQYXJ0aWNpcGFudHMubWFwKG5vblJlbmRlcmVkUmVtb3RlUGFydGljaXBhbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZy5lcnJvcihtaXNzaW5nQ2FzZUVycm9yKHZpZGVvUmVxdWVzdE1vZGUpKTtcbiAgICAgICAgdmlkZW9SZXF1ZXN0ID0gcmVtb3RlUGFydGljaXBhbnRzLm1hcChub25SZW5kZXJlZFJlbW90ZVBhcnRpY2lwYW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc2V0R3JvdXBDYWxsVmlkZW9SZXF1ZXN0KHZpZGVvUmVxdWVzdCk7XG4gIH0sIFtcbiAgICBkZXZpY2VQaXhlbFJhdGlvLFxuICAgIGdyaWRQYXJ0aWNpcGFudEhlaWdodCxcbiAgICBncmlkUGFydGljaXBhbnRzLFxuICAgIGludmlzaWJsZURlbXV4SWRzLFxuICAgIG92ZXJmbG93ZWRQYXJ0aWNpcGFudHMsXG4gICAgcmVtb3RlUGFydGljaXBhbnRzLFxuICAgIHNldEdyb3VwQ2FsbFZpZGVvUmVxdWVzdCxcbiAgICB2aWRlb1JlcXVlc3RNb2RlLFxuICBdKTtcblxuICByZXR1cm4gKFxuICAgIDxNZWFzdXJlXG4gICAgICBib3VuZHNcbiAgICAgIG9uUmVzaXplPXsoeyBib3VuZHMgfSkgPT4ge1xuICAgICAgICBpZiAoIWJvdW5kcykge1xuICAgICAgICAgIGxvZy5lcnJvcignV2Ugc2hvdWxkIGJlIG1lYXN1cmluZyB0aGUgYm91bmRzJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNldENvbnRhaW5lckRpbWVuc2lvbnMoYm91bmRzKTtcbiAgICAgIH19XG4gICAgPlxuICAgICAge2NvbnRhaW5lck1lYXN1cmUgPT4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLW9uZ29pbmctY2FsbF9fcGFydGljaXBhbnRzXCJcbiAgICAgICAgICByZWY9e2NvbnRhaW5lck1lYXN1cmUubWVhc3VyZVJlZn1cbiAgICAgICAgPlxuICAgICAgICAgIDxNZWFzdXJlXG4gICAgICAgICAgICBib3VuZHNcbiAgICAgICAgICAgIG9uUmVzaXplPXsoeyBib3VuZHMgfSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWJvdW5kcykge1xuICAgICAgICAgICAgICAgIGxvZy5lcnJvcignV2Ugc2hvdWxkIGJlIG1lYXN1cmluZyB0aGUgYm91bmRzJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldEdyaWREaW1lbnNpb25zKGJvdW5kcyk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtncmlkTWVhc3VyZSA9PiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtb25nb2luZy1jYWxsX19wYXJ0aWNpcGFudHNfX2dyaWRcIlxuICAgICAgICAgICAgICAgIHJlZj17Z3JpZE1lYXN1cmUubWVhc3VyZVJlZn1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtmbGF0dGVuKHJvd0VsZW1lbnRzKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvTWVhc3VyZT5cblxuICAgICAgICAgIDxHcm91cENhbGxPdmVyZmxvd0FyZWFcbiAgICAgICAgICAgIGdldEZyYW1lQnVmZmVyPXtnZXRGcmFtZUJ1ZmZlcn1cbiAgICAgICAgICAgIGdldEdyb3VwQ2FsbFZpZGVvRnJhbWVTb3VyY2U9e2dldEdyb3VwQ2FsbFZpZGVvRnJhbWVTb3VyY2V9XG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgb25QYXJ0aWNpcGFudFZpc2liaWxpdHlDaGFuZ2VkPXtvblBhcnRpY2lwYW50VmlzaWJpbGl0eUNoYW5nZWR9XG4gICAgICAgICAgICBvdmVyZmxvd2VkUGFydGljaXBhbnRzPXtvdmVyZmxvd2VkUGFydGljaXBhbnRzfVxuICAgICAgICAgICAgcmVtb3RlQXVkaW9MZXZlbHM9e3JlbW90ZUF1ZGlvTGV2ZWxzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L01lYXN1cmU+XG4gICk7XG59O1xuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIG9ubHkgbWVhbnQgZm9yIHVzZSB3aXRoIGB1c2VJbnZpc2libGVQYXJ0aWNpcGFudHNgLiBJdCBoZWxwcyBhdm9pZFxuLy8gICByZXR1cm5pbmcgbmV3IHNldCBpbnN0YW5jZXMgd2hlbiB0aGUgdW5kZXJseWluZyB2YWx1ZXMgYXJlIGVxdWFsLlxuZnVuY3Rpb24gcGlja0RpZmZlcmVudFNldDxUPihhOiBSZWFkb25seTxTZXQ8VD4+LCBiOiBSZWFkb25seTxTZXQ8VD4+KTogU2V0PFQ+IHtcbiAgcmV0dXJuIGEuc2l6ZSA9PT0gYi5zaXplID8gYSA6IGI7XG59XG5cbmZ1bmN0aW9uIHVzZUludmlzaWJsZVBhcnRpY2lwYW50cyhcbiAgcmVtb3RlUGFydGljaXBhbnRzOiBSZWFkb25seUFycmF5PEdyb3VwQ2FsbFJlbW90ZVBhcnRpY2lwYW50VHlwZT5cbik6IFJlYWRvbmx5PHtcbiAgaW52aXNpYmxlRGVtdXhJZHM6IFNldDxudW1iZXI+O1xuICBvblBhcnRpY2lwYW50VmlzaWJpbGl0eUNoYW5nZWQ6IChkZW11eElkOiBudW1iZXIsIGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbn0+IHtcbiAgY29uc3QgW2ludmlzaWJsZURlbXV4SWRzLCBzZXRJbnZpc2libGVEZW11eElkc10gPSB1c2VTdGF0ZShuZXcgU2V0PG51bWJlcj4oKSk7XG5cbiAgY29uc3Qgb25QYXJ0aWNpcGFudFZpc2liaWxpdHlDaGFuZ2VkID0gdXNlQ2FsbGJhY2soXG4gICAgKGRlbXV4SWQ6IG51bWJlciwgaXNWaXNpYmxlOiBib29sZWFuKSA9PiB7XG4gICAgICBzZXRJbnZpc2libGVEZW11eElkcyhvbGRJbnZpc2libGVEZW11eElkcyA9PiB7XG4gICAgICAgIGNvbnN0IHRvZ2dsZWQgPSBzZXRVdGlsLnRvZ2dsZShcbiAgICAgICAgICBvbGRJbnZpc2libGVEZW11eElkcyxcbiAgICAgICAgICBkZW11eElkLFxuICAgICAgICAgICFpc1Zpc2libGVcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHBpY2tEaWZmZXJlbnRTZXQob2xkSW52aXNpYmxlRGVtdXhJZHMsIHRvZ2dsZWQpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBbXVxuICApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbG9nLmluZm8oXG4gICAgICBgSW52aXNpYmxlIGRlbXV4IElEcyBjaGFuZ2VkIHRvIFske2pvaW4oaW52aXNpYmxlRGVtdXhJZHMsICcsJyl9XWBcbiAgICApO1xuICB9LCBbaW52aXNpYmxlRGVtdXhJZHNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHJlbW90ZVBhcnRpY2lwYW50RGVtdXhJZHMgPSBuZXcgU2V0PG51bWJlcj4oXG4gICAgICByZW1vdGVQYXJ0aWNpcGFudHMubWFwKHIgPT4gci5kZW11eElkKVxuICAgICk7XG4gICAgc2V0SW52aXNpYmxlRGVtdXhJZHMob2xkSW52aXNpYmxlRGVtdXhJZHMgPT4ge1xuICAgICAgY29uc3Qgc3RhbGVJZHMgPSBmaWx0ZXIoXG4gICAgICAgIG9sZEludmlzaWJsZURlbXV4SWRzLFxuICAgICAgICBpZCA9PiAhcmVtb3RlUGFydGljaXBhbnREZW11eElkcy5oYXMoaWQpXG4gICAgICApO1xuICAgICAgY29uc3Qgd2l0aG91dFN0YWxlSWRzID0gc2V0VXRpbC5yZW1vdmUob2xkSW52aXNpYmxlRGVtdXhJZHMsIC4uLnN0YWxlSWRzKTtcbiAgICAgIHJldHVybiBwaWNrRGlmZmVyZW50U2V0KG9sZEludmlzaWJsZURlbXV4SWRzLCB3aXRob3V0U3RhbGVJZHMpO1xuICAgIH0pO1xuICB9LCBbcmVtb3RlUGFydGljaXBhbnRzXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBpbnZpc2libGVEZW11eElkcyxcbiAgICBvblBhcnRpY2lwYW50VmlzaWJpbGl0eUNoYW5nZWQsXG4gIH07XG59XG5cbmZ1bmN0aW9uIHVzZVZpZGVvUmVxdWVzdE1vZGUoKTogVmlkZW9SZXF1ZXN0TW9kZSB7XG4gIGNvbnN0IGlzUGFnZVZpc2libGUgPSB1c2VQYWdlVmlzaWJpbGl0eSgpO1xuXG4gIGNvbnN0IFtyZXN1bHQsIHNldFJlc3VsdF0gPSB1c2VTdGF0ZTxWaWRlb1JlcXVlc3RNb2RlPihcbiAgICBpc1BhZ2VWaXNpYmxlID8gVmlkZW9SZXF1ZXN0TW9kZS5Ob3JtYWwgOiBWaWRlb1JlcXVlc3RNb2RlLkxvd1Jlc29sdXRpb25cbiAgKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc1BhZ2VWaXNpYmxlKSB7XG4gICAgICBzZXRSZXN1bHQoVmlkZW9SZXF1ZXN0TW9kZS5Ob3JtYWwpO1xuICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfVxuXG4gICAgc2V0UmVzdWx0KFZpZGVvUmVxdWVzdE1vZGUuTG93UmVzb2x1dGlvbik7XG5cbiAgICBjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRSZXN1bHQoVmlkZW9SZXF1ZXN0TW9kZS5Ob1ZpZGVvKTtcbiAgICB9LCBUSU1FX1RPX1NUT1BfUkVRVUVTVElOR19WSURFT19XSEVOX1BBR0VfSU5WSVNJQkxFKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgfTtcbiAgfSwgW2lzUGFnZVZpc2libGVdKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiB0b3RhbFJlbW90ZVBhcnRpY2lwYW50V2lkdGhBdE1pbkhlaWdodChcbiAgcmVtb3RlUGFydGljaXBhbnRzOiBSZWFkb25seUFycmF5PEdyb3VwQ2FsbFJlbW90ZVBhcnRpY2lwYW50VHlwZT5cbik6IG51bWJlciB7XG4gIHJldHVybiByZW1vdGVQYXJ0aWNpcGFudHMucmVkdWNlKFxuICAgIChyZXN1bHQsIHsgdmlkZW9Bc3BlY3RSYXRpbyB9KSA9PlxuICAgICAgcmVzdWx0ICsgdmlkZW9Bc3BlY3RSYXRpbyAqIE1JTl9SRU5ERVJFRF9IRUlHSFQsXG4gICAgMFxuICApO1xufVxuXG5mdW5jdGlvbiBzdGFibGVQYXJ0aWNpcGFudENvbXBhcmF0b3IoXG4gIGE6IFJlYWRvbmx5PHsgZGVtdXhJZDogbnVtYmVyIH0+LFxuICBiOiBSZWFkb25seTx7IGRlbXV4SWQ6IG51bWJlciB9PlxuKTogbnVtYmVyIHtcbiAgcmV0dXJuIGEuZGVtdXhJZCAtIGIuZGVtdXhJZDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBaUU7QUFDakUsMkJBQW9CO0FBQ3BCLG9CQUE4RDtBQUU5RCx3Q0FBMkM7QUFDM0MsbUNBR087QUFLUCxzQ0FBeUM7QUFFekMsK0JBQWtDO0FBQ2xDLGlDQUFvQztBQUNwQywwQ0FBNkM7QUFDN0MsOEJBQWlDO0FBQ2pDLHVCQUF1QjtBQUN2Qix1QkFBNkI7QUFDN0IsY0FBeUI7QUFDekIsVUFBcUI7QUFDckIsdUJBQWtEO0FBRWxELE1BQU0sc0JBQXNCO0FBQzVCLE1BQU0scUJBQXFCO0FBQzNCLE1BQU0sb0RBQW9ELEtBQUs7QUFHL0QsTUFBTSx1QkFBdUI7QUFxQjdCLElBQUssbUJBQUwsa0JBQUssc0JBQUw7QUFDRSxnQ0FBUztBQUNULHVDQUFnQjtBQUNoQixpQ0FBVTtBQUhQO0FBQUE7QUE2QkUsTUFBTSw4QkFBbUQsd0JBQUM7QUFBQSxFQUMvRDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFD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
