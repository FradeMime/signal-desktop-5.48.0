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
var Bytes_exports = {};
__export(Bytes_exports, {
  Bytes: () => Bytes
});
module.exports = __toCommonJS(Bytes_exports);
var import_buffer = require("buffer");
class Bytes {
  fromBase64(value) {
    return import_buffer.Buffer.from(value, "base64");
  }
  fromHex(value) {
    return import_buffer.Buffer.from(value, "hex");
  }
  fromBinary(value) {
    return import_buffer.Buffer.from(value, "binary");
  }
  fromString(value) {
    return import_buffer.Buffer.from(value);
  }
  toBase64(data) {
    return import_buffer.Buffer.from(data).toString("base64");
  }
  toHex(data) {
    return import_buffer.Buffer.from(data).toString("hex");
  }
  toBinary(data) {
    return import_buffer.Buffer.from(data).toString("binary");
  }
  toString(data) {
    return import_buffer.Buffer.from(data).toString();
  }
  byteLength(value) {
    return import_buffer.Buffer.byteLength(value);
  }
  concatenate(list) {
    return import_buffer.Buffer.concat(list);
  }
  isEmpty(data) {
    if (!data) {
      return true;
    }
    return data.length === 0;
  }
  isNotEmpty(data) {
    return !this.isEmpty(data);
  }
  areEqual(a, b) {
    if (!a || !b) {
      return !a && !b;
    }
    return import_buffer.Buffer.compare(a, b) === 0;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Bytes
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQnl0ZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSAnYnVmZmVyJztcblxuZXhwb3J0IGNsYXNzIEJ5dGVzIHtcbiAgcHVibGljIGZyb21CYXNlNjQodmFsdWU6IHN0cmluZyk6IFVpbnQ4QXJyYXkge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbSh2YWx1ZSwgJ2Jhc2U2NCcpO1xuICB9XG5cbiAgcHVibGljIGZyb21IZXgodmFsdWU6IHN0cmluZyk6IFVpbnQ4QXJyYXkge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbSh2YWx1ZSwgJ2hleCcpO1xuICB9XG5cbiAgLy8gVE9ETyhpbmR1dG55KTogZGVwcmVjYXRlIGl0XG4gIHB1YmxpYyBmcm9tQmluYXJ5KHZhbHVlOiBzdHJpbmcpOiBVaW50OEFycmF5IHtcbiAgICByZXR1cm4gQnVmZmVyLmZyb20odmFsdWUsICdiaW5hcnknKTtcbiAgfVxuXG4gIHB1YmxpYyBmcm9tU3RyaW5nKHZhbHVlOiBzdHJpbmcpOiBVaW50OEFycmF5IHtcbiAgICByZXR1cm4gQnVmZmVyLmZyb20odmFsdWUpO1xuICB9XG5cbiAgcHVibGljIHRvQmFzZTY0KGRhdGE6IFVpbnQ4QXJyYXkpOiBzdHJpbmcge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbShkYXRhKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gIH1cblxuICBwdWJsaWMgdG9IZXgoZGF0YTogVWludDhBcnJheSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKGRhdGEpLnRvU3RyaW5nKCdoZXgnKTtcbiAgfVxuXG4gIC8vIFRPRE8oaW5kdXRueSk6IGRlcHJlY2F0ZSBpdFxuICBwdWJsaWMgdG9CaW5hcnkoZGF0YTogVWludDhBcnJheSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKGRhdGEpLnRvU3RyaW5nKCdiaW5hcnknKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZyhkYXRhOiBVaW50OEFycmF5KTogc3RyaW5nIHtcbiAgICByZXR1cm4gQnVmZmVyLmZyb20oZGF0YSkudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHB1YmxpYyBieXRlTGVuZ3RoKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIHJldHVybiBCdWZmZXIuYnl0ZUxlbmd0aCh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgY29uY2F0ZW5hdGUobGlzdDogUmVhZG9ubHlBcnJheTxVaW50OEFycmF5Pik6IFVpbnQ4QXJyYXkge1xuICAgIHJldHVybiBCdWZmZXIuY29uY2F0KGxpc3QpO1xuICB9XG5cbiAgcHVibGljIGlzRW1wdHkoZGF0YTogVWludDhBcnJheSB8IG51bGwgfCB1bmRlZmluZWQpOiBib29sZWFuIHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YS5sZW5ndGggPT09IDA7XG4gIH1cblxuICBwdWJsaWMgaXNOb3RFbXB0eShkYXRhOiBVaW50OEFycmF5IHwgbnVsbCB8IHVuZGVmaW5lZCk6IGRhdGEgaXMgVWludDhBcnJheSB7XG4gICAgcmV0dXJuICF0aGlzLmlzRW1wdHkoZGF0YSk7XG4gIH1cblxuICBwdWJsaWMgYXJlRXF1YWwoXG4gICAgYTogVWludDhBcnJheSB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgYjogVWludDhBcnJheSB8IG51bGwgfCB1bmRlZmluZWRcbiAgKTogYm9vbGVhbiB7XG4gICAgaWYgKCFhIHx8ICFiKSB7XG4gICAgICByZXR1cm4gIWEgJiYgIWI7XG4gICAgfVxuXG4gICAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKGEsIGIpID09PSAwO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXVCO0FBRWhCLE1BQU0sTUFBTTtBQUFBLEVBQ1YsV0FBVyxPQUEyQjtBQUMzQyxXQUFPLHFCQUFPLEtBQUssT0FBTyxRQUFRO0FBQUEsRUFDcEM7QUFBQSxFQUVPLFFBQVEsT0FBMkI7QUFDeEMsV0FBTyxxQkFBTyxLQUFLLE9BQU8sS0FBSztBQUFBLEVBQ2pDO0FBQUEsRUFHTyxXQUFXLE9BQTJCO0FBQzNDLFdBQU8scUJBQU8sS0FBSyxPQUFPLFFBQVE7QUFBQSxFQUNwQztBQUFBLEVBRU8sV0FBVyxPQUEyQjtBQUMzQyxXQUFPLHFCQUFPLEtBQUssS0FBSztBQUFBLEVBQzFCO0FBQUEsRUFFTyxTQUFTLE1BQTBCO0FBQ3hDLFdBQU8scUJBQU8sS0FBSyxJQUFJLEVBQUUsU0FBUyxRQUFRO0FBQUEsRUFDNUM7QUFBQSxFQUVPLE1BQU0sTUFBMEI7QUFDckMsV0FBTyxxQkFBTyxLQUFLLElBQUksRUFBRSxTQUFTLEtBQUs7QUFBQSxFQUN6QztBQUFBLEVBR08sU0FBUyxNQUEwQjtBQUN4QyxXQUFPLHFCQUFPLEtBQUssSUFBSSxFQUFFLFNBQVMsUUFBUTtBQUFBLEVBQzVDO0FBQUEsRUFFTyxTQUFTLE1BQTBCO0FBQ3hDLFdBQU8scUJBQU8sS0FBSyxJQUFJLEVBQUUsU0FBUztBQUFBLEVBQ3BDO0FBQUEsRUFFTyxXQUFXLE9BQXVCO0FBQ3ZDLFdBQU8scUJBQU8sV0FBVyxLQUFLO0FBQUEsRUFDaEM7QUFBQSxFQUVPLFlBQVksTUFBNkM7QUFDOUQsV0FBTyxxQkFBTyxPQUFPLElBQUk7QUFBQSxFQUMzQjtBQUFBLEVBRU8sUUFBUSxNQUE4QztBQUMzRCxRQUFJLENBQUMsTUFBTTtBQUNULGFBQU87QUFBQSxJQUNUO0FBQ0EsV0FBTyxLQUFLLFdBQVc7QUFBQSxFQUN6QjtBQUFBLEVBRU8sV0FBVyxNQUF5RDtBQUN6RSxXQUFPLENBQUMsS0FBSyxRQUFRLElBQUk7QUFBQSxFQUMzQjtBQUFBLEVBRU8sU0FDTCxHQUNBLEdBQ1M7QUFDVCxRQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7QUFDWixhQUFPLENBQUMsS0FBSyxDQUFDO0FBQUEsSUFDaEI7QUFFQSxXQUFPLHFCQUFPLFFBQVEsR0FBRyxDQUFDLE1BQU07QUFBQSxFQUNsQztBQUNGO0FBaEVPIiwKICAibmFtZXMiOiBbXQp9Cg==
