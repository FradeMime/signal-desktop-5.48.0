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
var callingMessageToProto_exports = {};
__export(callingMessageToProto_exports, {
  callingMessageToProto: () => callingMessageToProto
});
module.exports = __toCommonJS(callingMessageToProto_exports);
var import_ringrtc = require("ringrtc");
var import_protobuf = require("../protobuf");
var log = __toESM(require("../logging/log"));
var import_missingCaseError = require("./missingCaseError");
function callingMessageToProto({
  offer,
  answer,
  iceCandidates,
  legacyHangup,
  busy,
  hangup,
  supportsMultiRing,
  destinationDeviceId,
  opaque
}, urgency) {
  let opaqueField;
  if (opaque) {
    opaqueField = {
      ...opaque,
      data: bufferToProto(opaque.data)
    };
  }
  if (urgency !== void 0) {
    opaqueField = {
      ...opaqueField ?? {},
      urgency: urgencyToProto(urgency)
    };
  }
  return {
    offer: offer ? {
      ...offer,
      type: offer.type,
      opaque: bufferToProto(offer.opaque)
    } : void 0,
    answer: answer ? {
      ...answer,
      opaque: bufferToProto(answer.opaque)
    } : void 0,
    iceCandidates: iceCandidates ? iceCandidates.map((candidate) => {
      return {
        ...candidate,
        opaque: bufferToProto(candidate.opaque)
      };
    }) : void 0,
    legacyHangup: legacyHangup ? {
      ...legacyHangup,
      type: legacyHangup.type
    } : void 0,
    busy,
    hangup: hangup ? {
      ...hangup,
      type: hangup.type
    } : void 0,
    supportsMultiRing,
    destinationDeviceId,
    opaque: opaqueField
  };
}
function bufferToProto(value) {
  if (!value) {
    return void 0;
  }
  if (value instanceof Uint8Array) {
    return value;
  }
  return new Uint8Array(value.toArrayBuffer());
}
function urgencyToProto(urgency) {
  switch (urgency) {
    case import_ringrtc.CallMessageUrgency.Droppable:
      return import_protobuf.SignalService.CallingMessage.Opaque.Urgency.DROPPABLE;
    case import_ringrtc.CallMessageUrgency.HandleImmediately:
      return import_protobuf.SignalService.CallingMessage.Opaque.Urgency.HANDLE_IMMEDIATELY;
    default:
      log.error((0, import_missingCaseError.missingCaseError)(urgency));
      return import_protobuf.SignalService.CallingMessage.Opaque.Urgency.DROPPABLE;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  callingMessageToProto
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2FsbGluZ01lc3NhZ2VUb1Byb3RvLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgQ2FsbGluZ01lc3NhZ2UgfSBmcm9tICdyaW5ncnRjJztcbmltcG9ydCB7IENhbGxNZXNzYWdlVXJnZW5jeSB9IGZyb20gJ3JpbmdydGMnO1xuaW1wb3J0IHsgU2lnbmFsU2VydmljZSBhcyBQcm90byB9IGZyb20gJy4uL3Byb3RvYnVmJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi9taXNzaW5nQ2FzZUVycm9yJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGxpbmdNZXNzYWdlVG9Qcm90byhcbiAge1xuICAgIG9mZmVyLFxuICAgIGFuc3dlcixcbiAgICBpY2VDYW5kaWRhdGVzLFxuICAgIGxlZ2FjeUhhbmd1cCxcbiAgICBidXN5LFxuICAgIGhhbmd1cCxcbiAgICBzdXBwb3J0c011bHRpUmluZyxcbiAgICBkZXN0aW5hdGlvbkRldmljZUlkLFxuICAgIG9wYXF1ZSxcbiAgfTogQ2FsbGluZ01lc3NhZ2UsXG4gIHVyZ2VuY3k/OiBDYWxsTWVzc2FnZVVyZ2VuY3lcbik6IFByb3RvLklDYWxsaW5nTWVzc2FnZSB7XG4gIGxldCBvcGFxdWVGaWVsZDogdW5kZWZpbmVkIHwgUHJvdG8uQ2FsbGluZ01lc3NhZ2UuSU9wYXF1ZTtcbiAgaWYgKG9wYXF1ZSkge1xuICAgIG9wYXF1ZUZpZWxkID0ge1xuICAgICAgLi4ub3BhcXVlLFxuICAgICAgZGF0YTogYnVmZmVyVG9Qcm90byhvcGFxdWUuZGF0YSksXG4gICAgfTtcbiAgfVxuICBpZiAodXJnZW5jeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgb3BhcXVlRmllbGQgPSB7XG4gICAgICAuLi4ob3BhcXVlRmllbGQgPz8ge30pLFxuICAgICAgdXJnZW5jeTogdXJnZW5jeVRvUHJvdG8odXJnZW5jeSksXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgb2ZmZXI6IG9mZmVyXG4gICAgICA/IHtcbiAgICAgICAgICAuLi5vZmZlcixcbiAgICAgICAgICB0eXBlOiBvZmZlci50eXBlIGFzIG51bWJlcixcbiAgICAgICAgICBvcGFxdWU6IGJ1ZmZlclRvUHJvdG8ob2ZmZXIub3BhcXVlKSxcbiAgICAgICAgfVxuICAgICAgOiB1bmRlZmluZWQsXG4gICAgYW5zd2VyOiBhbnN3ZXJcbiAgICAgID8ge1xuICAgICAgICAgIC4uLmFuc3dlcixcbiAgICAgICAgICBvcGFxdWU6IGJ1ZmZlclRvUHJvdG8oYW5zd2VyLm9wYXF1ZSksXG4gICAgICAgIH1cbiAgICAgIDogdW5kZWZpbmVkLFxuICAgIGljZUNhbmRpZGF0ZXM6IGljZUNhbmRpZGF0ZXNcbiAgICAgID8gaWNlQ2FuZGlkYXRlcy5tYXAoY2FuZGlkYXRlID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uY2FuZGlkYXRlLFxuICAgICAgICAgICAgb3BhcXVlOiBidWZmZXJUb1Byb3RvKGNhbmRpZGF0ZS5vcGFxdWUpLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgICA6IHVuZGVmaW5lZCxcbiAgICBsZWdhY3lIYW5ndXA6IGxlZ2FjeUhhbmd1cFxuICAgICAgPyB7XG4gICAgICAgICAgLi4ubGVnYWN5SGFuZ3VwLFxuICAgICAgICAgIHR5cGU6IGxlZ2FjeUhhbmd1cC50eXBlIGFzIG51bWJlcixcbiAgICAgICAgfVxuICAgICAgOiB1bmRlZmluZWQsXG4gICAgYnVzeSxcbiAgICBoYW5ndXA6IGhhbmd1cFxuICAgICAgPyB7XG4gICAgICAgICAgLi4uaGFuZ3VwLFxuICAgICAgICAgIHR5cGU6IGhhbmd1cC50eXBlIGFzIG51bWJlcixcbiAgICAgICAgfVxuICAgICAgOiB1bmRlZmluZWQsXG4gICAgc3VwcG9ydHNNdWx0aVJpbmcsXG4gICAgZGVzdGluYXRpb25EZXZpY2VJZCxcbiAgICBvcGFxdWU6IG9wYXF1ZUZpZWxkLFxuICB9O1xufVxuXG5mdW5jdGlvbiBidWZmZXJUb1Byb3RvKFxuICB2YWx1ZTogQnVmZmVyIHwgeyB0b0FycmF5QnVmZmVyKCk6IEFycmF5QnVmZmVyIH0gfCB1bmRlZmluZWRcbik6IFVpbnQ4QXJyYXkgfCB1bmRlZmluZWQge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHZhbHVlLnRvQXJyYXlCdWZmZXIoKSk7XG59XG5cbmZ1bmN0aW9uIHVyZ2VuY3lUb1Byb3RvKFxuICB1cmdlbmN5OiBDYWxsTWVzc2FnZVVyZ2VuY3lcbik6IFByb3RvLkNhbGxpbmdNZXNzYWdlLk9wYXF1ZS5VcmdlbmN5IHtcbiAgc3dpdGNoICh1cmdlbmN5KSB7XG4gICAgY2FzZSBDYWxsTWVzc2FnZVVyZ2VuY3kuRHJvcHBhYmxlOlxuICAgICAgcmV0dXJuIFByb3RvLkNhbGxpbmdNZXNzYWdlLk9wYXF1ZS5VcmdlbmN5LkRST1BQQUJMRTtcbiAgICBjYXNlIENhbGxNZXNzYWdlVXJnZW5jeS5IYW5kbGVJbW1lZGlhdGVseTpcbiAgICAgIHJldHVybiBQcm90by5DYWxsaW5nTWVzc2FnZS5PcGFxdWUuVXJnZW5jeS5IQU5ETEVfSU1NRURJQVRFTFk7XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZy5lcnJvcihtaXNzaW5nQ2FzZUVycm9yKHVyZ2VuY3kpKTtcbiAgICAgIHJldHVybiBQcm90by5DYWxsaW5nTWVzc2FnZS5PcGFxdWUuVXJnZW5jeS5EUk9QUEFCTEU7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxxQkFBbUM7QUFDbkMsc0JBQXVDO0FBQ3ZDLFVBQXFCO0FBQ3JCLDhCQUFpQztBQUUxQiwrQkFDTDtBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBRUYsU0FDdUI7QUFDdkIsTUFBSTtBQUNKLE1BQUksUUFBUTtBQUNWLGtCQUFjO0FBQUEsU0FDVDtBQUFBLE1BQ0gsTUFBTSxjQUFjLE9BQU8sSUFBSTtBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUNBLE1BQUksWUFBWSxRQUFXO0FBQ3pCLGtCQUFjO0FBQUEsU0FDUixlQUFlLENBQUM7QUFBQSxNQUNwQixTQUFTLGVBQWUsT0FBTztBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFBQSxJQUNMLE9BQU8sUUFDSDtBQUFBLFNBQ0s7QUFBQSxNQUNILE1BQU0sTUFBTTtBQUFBLE1BQ1osUUFBUSxjQUFjLE1BQU0sTUFBTTtBQUFBLElBQ3BDLElBQ0E7QUFBQSxJQUNKLFFBQVEsU0FDSjtBQUFBLFNBQ0s7QUFBQSxNQUNILFFBQVEsY0FBYyxPQUFPLE1BQU07QUFBQSxJQUNyQyxJQUNBO0FBQUEsSUFDSixlQUFlLGdCQUNYLGNBQWMsSUFBSSxlQUFhO0FBQzdCLGFBQU87QUFBQSxXQUNGO0FBQUEsUUFDSCxRQUFRLGNBQWMsVUFBVSxNQUFNO0FBQUEsTUFDeEM7QUFBQSxJQUNGLENBQUMsSUFDRDtBQUFBLElBQ0osY0FBYyxlQUNWO0FBQUEsU0FDSztBQUFBLE1BQ0gsTUFBTSxhQUFhO0FBQUEsSUFDckIsSUFDQTtBQUFBLElBQ0o7QUFBQSxJQUNBLFFBQVEsU0FDSjtBQUFBLFNBQ0s7QUFBQSxNQUNILE1BQU0sT0FBTztBQUFBLElBQ2YsSUFDQTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQSxRQUFRO0FBQUEsRUFDVjtBQUNGO0FBbkVnQixBQXFFaEIsdUJBQ0UsT0FDd0I7QUFDeEIsTUFBSSxDQUFDLE9BQU87QUFDVixXQUFPO0FBQUEsRUFDVDtBQUNBLE1BQUksaUJBQWlCLFlBQVk7QUFDL0IsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPLElBQUksV0FBVyxNQUFNLGNBQWMsQ0FBQztBQUM3QztBQVhTLEFBYVQsd0JBQ0UsU0FDcUM7QUFDckMsVUFBUTtBQUFBLFNBQ0Qsa0NBQW1CO0FBQ3RCLGFBQU8sOEJBQU0sZUFBZSxPQUFPLFFBQVE7QUFBQSxTQUN4QyxrQ0FBbUI7QUFDdEIsYUFBTyw4QkFBTSxlQUFlLE9BQU8sUUFBUTtBQUFBO0FBRTNDLFVBQUksTUFBTSw4Q0FBaUIsT0FBTyxDQUFDO0FBQ25DLGFBQU8sOEJBQU0sZUFBZSxPQUFPLFFBQVE7QUFBQTtBQUVqRDtBQVpTIiwKICAibmFtZXMiOiBbXQp9Cg==
