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
var ContactsParser_exports = {};
__export(ContactsParser_exports, {
  ContactBuffer: () => ContactBuffer,
  GroupBuffer: () => GroupBuffer
});
module.exports = __toCommonJS(ContactsParser_exports);
var import_wrap = __toESM(require("../protobuf/wrap"));
var import_protobuf = require("../protobuf");
var import_normalizeUuid = require("../util/normalizeUuid");
var log = __toESM(require("../logging/log"));
const Avatar = import_protobuf.SignalService.ContactDetails.IAvatar;
const { Reader } = import_wrap.default;
class ParserBase {
  constructor(bytes, decoder) {
    this.decoder = decoder;
    this.reader = new Reader(bytes);
  }
  decodeDelimited() {
    if (this.reader.pos === this.reader.len) {
      return void 0;
    }
    try {
      const proto = this.decoder.decodeDelimited(this.reader);
      if (!proto) {
        return void 0;
      }
      if (!proto.avatar) {
        return {
          ...proto,
          avatar: null
        };
      }
      const attachmentLen = proto.avatar.length ?? 0;
      const avatarData = this.reader.buf.slice(this.reader.pos, this.reader.pos + attachmentLen);
      this.reader.skip(attachmentLen);
      return {
        ...proto,
        avatar: {
          ...proto.avatar,
          data: avatarData
        }
      };
    } catch (error) {
      log.error("ProtoParser.next error:", error && error.stack ? error.stack : error);
      return void 0;
    }
  }
}
class GroupBuffer extends ParserBase {
  constructor(arrayBuffer) {
    super(arrayBuffer, import_protobuf.SignalService.GroupDetails);
  }
  next() {
    const proto = this.decodeDelimited();
    if (!proto) {
      return void 0;
    }
    if (!proto.members) {
      return proto;
    }
    return {
      ...proto,
      members: proto.members.map((member, i) => {
        if (!member.uuid) {
          return member;
        }
        return {
          ...member,
          uuid: (0, import_normalizeUuid.normalizeUuid)(member.uuid, `GroupBuffer.member[${i}].uuid`)
        };
      })
    };
  }
}
class ContactBuffer extends ParserBase {
  constructor(arrayBuffer) {
    super(arrayBuffer, import_protobuf.SignalService.ContactDetails);
  }
  next() {
    const proto = this.decodeDelimited();
    if (!proto) {
      return void 0;
    }
    if (!proto.uuid) {
      return proto;
    }
    const { verified } = proto;
    return {
      ...proto,
      verified: verified && verified.destinationUuid ? {
        ...verified,
        destinationUuid: (0, import_normalizeUuid.normalizeUuid)(verified.destinationUuid, "ContactBuffer.verified.destinationUuid")
      } : verified,
      uuid: (0, import_normalizeUuid.normalizeUuid)(proto.uuid, "ContactBuffer.uuid")
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContactBuffer,
  GroupBuffer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdHNQYXJzZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cblxuaW1wb3J0IHByb3RvYnVmIGZyb20gJy4uL3Byb3RvYnVmL3dyYXAnO1xuXG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vcHJvdG9idWYnO1xuaW1wb3J0IHsgbm9ybWFsaXplVXVpZCB9IGZyb20gJy4uL3V0aWwvbm9ybWFsaXplVXVpZCc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuXG5pbXBvcnQgQXZhdGFyID0gUHJvdG8uQ29udGFjdERldGFpbHMuSUF2YXRhcjtcblxuY29uc3QgeyBSZWFkZXIgfSA9IHByb3RvYnVmO1xuXG50eXBlIE9wdGlvbmFsQXZhdGFyID0geyBhdmF0YXI/OiBBdmF0YXIgfCBudWxsIH07XG5cbnR5cGUgRGVjb2RlckJhc2U8TWVzc2FnZSBleHRlbmRzIE9wdGlvbmFsQXZhdGFyPiA9IHtcbiAgZGVjb2RlRGVsaW1pdGVkKHJlYWRlcjogcHJvdG9idWYuUmVhZGVyKTogTWVzc2FnZSB8IHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VXaXRoQXZhdGFyPE1lc3NhZ2UgZXh0ZW5kcyBPcHRpb25hbEF2YXRhcj4gPSBPbWl0PFxuICBNZXNzYWdlLFxuICAnYXZhdGFyJ1xuPiAmIHtcbiAgYXZhdGFyPzogKEF2YXRhciAmIHsgZGF0YTogVWludDhBcnJheSB9KSB8IG51bGw7XG59O1xuXG5leHBvcnQgdHlwZSBNb2RpZmllZEdyb3VwRGV0YWlscyA9IE1lc3NhZ2VXaXRoQXZhdGFyPFByb3RvLkdyb3VwRGV0YWlscz47XG5cbmV4cG9ydCB0eXBlIE1vZGlmaWVkQ29udGFjdERldGFpbHMgPSBNZXNzYWdlV2l0aEF2YXRhcjxQcm90by5Db250YWN0RGV0YWlscz47XG5cbmNsYXNzIFBhcnNlckJhc2U8XG4gIE1lc3NhZ2UgZXh0ZW5kcyBPcHRpb25hbEF2YXRhcixcbiAgRGVjb2RlciBleHRlbmRzIERlY29kZXJCYXNlPE1lc3NhZ2U+XG4+IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHJlYWRlcjogcHJvdG9idWYuUmVhZGVyO1xuXG4gIGNvbnN0cnVjdG9yKGJ5dGVzOiBVaW50OEFycmF5LCBwcml2YXRlIHJlYWRvbmx5IGRlY29kZXI6IERlY29kZXIpIHtcbiAgICB0aGlzLnJlYWRlciA9IG5ldyBSZWFkZXIoYnl0ZXMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRlY29kZURlbGltaXRlZCgpOiBNZXNzYWdlV2l0aEF2YXRhcjxNZXNzYWdlPiB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMucmVhZGVyLnBvcyA9PT0gdGhpcy5yZWFkZXIubGVuKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkOyAvLyBlb2ZcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcHJvdG8gPSB0aGlzLmRlY29kZXIuZGVjb2RlRGVsaW1pdGVkKHRoaXMucmVhZGVyKTtcblxuICAgICAgaWYgKCFwcm90bykge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXByb3RvLmF2YXRhcikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnByb3RvLFxuICAgICAgICAgIGF2YXRhcjogbnVsbCxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYXR0YWNobWVudExlbiA9IHByb3RvLmF2YXRhci5sZW5ndGggPz8gMDtcbiAgICAgIGNvbnN0IGF2YXRhckRhdGEgPSB0aGlzLnJlYWRlci5idWYuc2xpY2UoXG4gICAgICAgIHRoaXMucmVhZGVyLnBvcyxcbiAgICAgICAgdGhpcy5yZWFkZXIucG9zICsgYXR0YWNobWVudExlblxuICAgICAgKTtcbiAgICAgIHRoaXMucmVhZGVyLnNraXAoYXR0YWNobWVudExlbik7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnByb3RvLFxuXG4gICAgICAgIGF2YXRhcjoge1xuICAgICAgICAgIC4uLnByb3RvLmF2YXRhcixcblxuICAgICAgICAgIGRhdGE6IGF2YXRhckRhdGEsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgICdQcm90b1BhcnNlci5uZXh0IGVycm9yOicsXG4gICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHcm91cEJ1ZmZlciBleHRlbmRzIFBhcnNlckJhc2U8XG4gIFByb3RvLkdyb3VwRGV0YWlscyxcbiAgdHlwZW9mIFByb3RvLkdyb3VwRGV0YWlsc1xuPiB7XG4gIGNvbnN0cnVjdG9yKGFycmF5QnVmZmVyOiBVaW50OEFycmF5KSB7XG4gICAgc3VwZXIoYXJyYXlCdWZmZXIsIFByb3RvLkdyb3VwRGV0YWlscyk7XG4gIH1cblxuICBwdWJsaWMgbmV4dCgpOiBNb2RpZmllZEdyb3VwRGV0YWlscyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcHJvdG8gPSB0aGlzLmRlY29kZURlbGltaXRlZCgpO1xuICAgIGlmICghcHJvdG8pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKCFwcm90by5tZW1iZXJzKSB7XG4gICAgICByZXR1cm4gcHJvdG87XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAuLi5wcm90byxcbiAgICAgIG1lbWJlcnM6IHByb3RvLm1lbWJlcnMubWFwKChtZW1iZXIsIGkpID0+IHtcbiAgICAgICAgaWYgKCFtZW1iZXIudXVpZCkge1xuICAgICAgICAgIHJldHVybiBtZW1iZXI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLm1lbWJlcixcbiAgICAgICAgICB1dWlkOiBub3JtYWxpemVVdWlkKG1lbWJlci51dWlkLCBgR3JvdXBCdWZmZXIubWVtYmVyWyR7aX1dLnV1aWRgKSxcbiAgICAgICAgfTtcbiAgICAgIH0pLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbnRhY3RCdWZmZXIgZXh0ZW5kcyBQYXJzZXJCYXNlPFxuICBQcm90by5Db250YWN0RGV0YWlscyxcbiAgdHlwZW9mIFByb3RvLkNvbnRhY3REZXRhaWxzXG4+IHtcbiAgY29uc3RydWN0b3IoYXJyYXlCdWZmZXI6IFVpbnQ4QXJyYXkpIHtcbiAgICBzdXBlcihhcnJheUJ1ZmZlciwgUHJvdG8uQ29udGFjdERldGFpbHMpO1xuICB9XG5cbiAgcHVibGljIG5leHQoKTogTW9kaWZpZWRDb250YWN0RGV0YWlscyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcHJvdG8gPSB0aGlzLmRlY29kZURlbGltaXRlZCgpO1xuICAgIGlmICghcHJvdG8pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKCFwcm90by51dWlkKSB7XG4gICAgICByZXR1cm4gcHJvdG87XG4gICAgfVxuXG4gICAgY29uc3QgeyB2ZXJpZmllZCB9ID0gcHJvdG87XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4ucHJvdG8sXG5cbiAgICAgIHZlcmlmaWVkOlxuICAgICAgICB2ZXJpZmllZCAmJiB2ZXJpZmllZC5kZXN0aW5hdGlvblV1aWRcbiAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgLi4udmVyaWZpZWQsXG5cbiAgICAgICAgICAgICAgZGVzdGluYXRpb25VdWlkOiBub3JtYWxpemVVdWlkKFxuICAgICAgICAgICAgICAgIHZlcmlmaWVkLmRlc3RpbmF0aW9uVXVpZCxcbiAgICAgICAgICAgICAgICAnQ29udGFjdEJ1ZmZlci52ZXJpZmllZC5kZXN0aW5hdGlvblV1aWQnXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICB9XG4gICAgICAgICAgOiB2ZXJpZmllZCxcblxuICAgICAgdXVpZDogbm9ybWFsaXplVXVpZChwcm90by51dWlkLCAnQ29udGFjdEJ1ZmZlci51dWlkJyksXG4gICAgfTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0Esa0JBQXFCO0FBRXJCLHNCQUF1QztBQUN2QywyQkFBOEI7QUFDOUIsVUFBcUI7QUFFckIsTUFBTyxTQUFTLDhCQUFNLGVBQWU7QUFFckMsTUFBTSxFQUFFLFdBQVc7QUFtQm5CLE1BQU0sV0FHSjtBQUFBLEVBR0EsWUFBWSxPQUFvQyxTQUFrQjtBQUFsQjtBQUM5QyxTQUFLLFNBQVMsSUFBSSxPQUFPLEtBQUs7QUFBQSxFQUNoQztBQUFBLEVBRVUsa0JBQTBEO0FBQ2xFLFFBQUksS0FBSyxPQUFPLFFBQVEsS0FBSyxPQUFPLEtBQUs7QUFDdkMsYUFBTztBQUFBLElBQ1Q7QUFFQSxRQUFJO0FBQ0YsWUFBTSxRQUFRLEtBQUssUUFBUSxnQkFBZ0IsS0FBSyxNQUFNO0FBRXRELFVBQUksQ0FBQyxPQUFPO0FBQ1YsZUFBTztBQUFBLE1BQ1Q7QUFFQSxVQUFJLENBQUMsTUFBTSxRQUFRO0FBQ2pCLGVBQU87QUFBQSxhQUNGO0FBQUEsVUFDSCxRQUFRO0FBQUEsUUFDVjtBQUFBLE1BQ0Y7QUFFQSxZQUFNLGdCQUFnQixNQUFNLE9BQU8sVUFBVTtBQUM3QyxZQUFNLGFBQWEsS0FBSyxPQUFPLElBQUksTUFDakMsS0FBSyxPQUFPLEtBQ1osS0FBSyxPQUFPLE1BQU0sYUFDcEI7QUFDQSxXQUFLLE9BQU8sS0FBSyxhQUFhO0FBRTlCLGFBQU87QUFBQSxXQUNGO0FBQUEsUUFFSCxRQUFRO0FBQUEsYUFDSCxNQUFNO0FBQUEsVUFFVCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLFNBQVMsT0FBUDtBQUNBLFVBQUksTUFDRiwyQkFDQSxTQUFTLE1BQU0sUUFBUSxNQUFNLFFBQVEsS0FDdkM7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFDRjtBQXJEQSxBQXVETyxNQUFNLG9CQUFvQixXQUcvQjtBQUFBLEVBQ0EsWUFBWSxhQUF5QjtBQUNuQyxVQUFNLGFBQWEsOEJBQU0sWUFBWTtBQUFBLEVBQ3ZDO0FBQUEsRUFFTyxPQUF5QztBQUM5QyxVQUFNLFFBQVEsS0FBSyxnQkFBZ0I7QUFDbkMsUUFBSSxDQUFDLE9BQU87QUFDVixhQUFPO0FBQUEsSUFDVDtBQUVBLFFBQUksQ0FBQyxNQUFNLFNBQVM7QUFDbEIsYUFBTztBQUFBLElBQ1Q7QUFDQSxXQUFPO0FBQUEsU0FDRjtBQUFBLE1BQ0gsU0FBUyxNQUFNLFFBQVEsSUFBSSxDQUFDLFFBQVEsTUFBTTtBQUN4QyxZQUFJLENBQUMsT0FBTyxNQUFNO0FBQ2hCLGlCQUFPO0FBQUEsUUFDVDtBQUVBLGVBQU87QUFBQSxhQUNGO0FBQUEsVUFDSCxNQUFNLHdDQUFjLE9BQU8sTUFBTSxzQkFBc0IsU0FBUztBQUFBLFFBQ2xFO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRjtBQS9CTyxBQWlDQSxNQUFNLHNCQUFzQixXQUdqQztBQUFBLEVBQ0EsWUFBWSxhQUF5QjtBQUNuQyxVQUFNLGFBQWEsOEJBQU0sY0FBYztBQUFBLEVBQ3pDO0FBQUEsRUFFTyxPQUEyQztBQUNoRCxVQUFNLFFBQVEsS0FBSyxnQkFBZ0I7QUFDbkMsUUFBSSxDQUFDLE9BQU87QUFDVixhQUFPO0FBQUEsSUFDVDtBQUVBLFFBQUksQ0FBQyxNQUFNLE1BQU07QUFDZixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sRUFBRSxhQUFhO0FBRXJCLFdBQU87QUFBQSxTQUNGO0FBQUEsTUFFSCxVQUNFLFlBQVksU0FBUyxrQkFDakI7QUFBQSxXQUNLO0FBQUEsUUFFSCxpQkFBaUIsd0NBQ2YsU0FBUyxpQkFDVCx3Q0FDRjtBQUFBLE1BQ0YsSUFDQTtBQUFBLE1BRU4sTUFBTSx3Q0FBYyxNQUFNLE1BQU0sb0JBQW9CO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0Y7QUF0Q08iLAogICJuYW1lcyI6IFtdCn0K
