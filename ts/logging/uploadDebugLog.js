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
var uploadDebugLog_exports = {};
__export(uploadDebugLog_exports, {
  upload: () => upload
});
module.exports = __toCommonJS(uploadDebugLog_exports);
var import_zod = require("zod");
var import_form_data = __toESM(require("form-data"));
var import_got = __toESM(require("got"));
var import_zlib = require("zlib");
var import_pify = __toESM(require("pify"));
var import_getUserAgent = require("../util/getUserAgent");
var import_url = require("../util/url");
var durations = __toESM(require("../util/durations"));
const BASE_URL = "https://debuglogs.org";
const UPLOAD_TIMEOUT = { request: durations.MINUTE };
const tokenBodySchema = import_zod.z.object({
  fields: import_zod.z.record(import_zod.z.unknown()),
  url: import_zod.z.string()
}).nonstrict();
const parseTokenBody = /* @__PURE__ */ __name((rawBody) => {
  const body = tokenBodySchema.parse(rawBody);
  const parsedUrl = (0, import_url.maybeParseUrl)(body.url);
  if (!parsedUrl) {
    throw new Error("Token body's URL was not a valid URL");
  }
  if (parsedUrl.protocol !== "https:") {
    throw new Error("Token body's URL was not HTTPS");
  }
  return body;
}, "parseTokenBody");
const upload = /* @__PURE__ */ __name(async ({
  content,
  appVersion,
  logger,
  extension = "gz",
  contentType = "application/gzip",
  compress = true,
  prefix
}) => {
  const headers = { "User-Agent": (0, import_getUserAgent.getUserAgent)(appVersion) };
  const formUrl = new URL(BASE_URL);
  if (prefix !== void 0) {
    formUrl.searchParams.set("prefix", prefix);
  }
  const signedForm = await import_got.default.get(formUrl.toString(), {
    responseType: "json",
    headers,
    timeout: UPLOAD_TIMEOUT
  });
  const { fields, url } = parseTokenBody(signedForm.body);
  const uploadKey = `${fields.key}.${extension}`;
  const form = new import_form_data.default();
  form.append("key", uploadKey);
  Object.entries(fields).filter(([key]) => key !== "key").forEach(([key, value]) => {
    form.append(key, value);
  });
  const contentBuffer = compress ? await (0, import_pify.default)(import_zlib.gzip)(Buffer.from(content)) : Buffer.from(content);
  form.append("Content-Type", contentType);
  form.append("file", contentBuffer, {
    contentType,
    filename: `signal-desktop-debug-log-${appVersion}.txt.gz`
  });
  logger.info("Debug log upload starting...");
  try {
    const { statusCode, body } = await import_got.default.post(url, {
      headers,
      body: form,
      timeout: UPLOAD_TIMEOUT
    });
    if (statusCode !== 204) {
      throw new Error(`Failed to upload to S3, got status ${statusCode}, body '${body}'`);
    }
  } catch (error) {
    const response = error.response;
    throw new Error(`Got threw on upload to S3, got status ${response?.statusCode}, body '${response?.body}'  `);
  }
  logger.info("Debug log upload complete.");
  return `${BASE_URL}/${uploadKey}`;
}, "upload");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  upload
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXBsb2FkRGVidWdMb2cudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFJlc3BvbnNlIH0gZnJvbSAnZ290JztcbmltcG9ydCB7IHogfSBmcm9tICd6b2QnO1xuaW1wb3J0IEZvcm1EYXRhIGZyb20gJ2Zvcm0tZGF0YSc7XG5pbXBvcnQgZ290IGZyb20gJ2dvdCc7XG5pbXBvcnQgeyBnemlwIH0gZnJvbSAnemxpYic7XG5pbXBvcnQgcGlmeSBmcm9tICdwaWZ5JztcbmltcG9ydCB7IGdldFVzZXJBZ2VudCB9IGZyb20gJy4uL3V0aWwvZ2V0VXNlckFnZW50JztcbmltcG9ydCB7IG1heWJlUGFyc2VVcmwgfSBmcm9tICcuLi91dGlsL3VybCc7XG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvTG9nZ2luZyc7XG5cbmNvbnN0IEJBU0VfVVJMID0gJ2h0dHBzOi8vZGVidWdsb2dzLm9yZyc7XG5cbmNvbnN0IFVQTE9BRF9USU1FT1VUID0geyByZXF1ZXN0OiBkdXJhdGlvbnMuTUlOVVRFIH07XG5cbmNvbnN0IHRva2VuQm9keVNjaGVtYSA9IHpcbiAgLm9iamVjdCh7XG4gICAgZmllbGRzOiB6LnJlY29yZCh6LnVua25vd24oKSksXG4gICAgdXJsOiB6LnN0cmluZygpLFxuICB9KVxuICAubm9uc3RyaWN0KCk7XG5cbmNvbnN0IHBhcnNlVG9rZW5Cb2R5ID0gKFxuICByYXdCb2R5OiB1bmtub3duXG4pOiB7IGZpZWxkczogUmVjb3JkPHN0cmluZywgdW5rbm93bj47IHVybDogc3RyaW5nIH0gPT4ge1xuICBjb25zdCBib2R5ID0gdG9rZW5Cb2R5U2NoZW1hLnBhcnNlKHJhd0JvZHkpO1xuXG4gIGNvbnN0IHBhcnNlZFVybCA9IG1heWJlUGFyc2VVcmwoYm9keS51cmwpO1xuICBpZiAoIXBhcnNlZFVybCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRva2VuIGJvZHkncyBVUkwgd2FzIG5vdCBhIHZhbGlkIFVSTFwiKTtcbiAgfVxuICBpZiAocGFyc2VkVXJsLnByb3RvY29sICE9PSAnaHR0cHM6Jykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRva2VuIGJvZHkncyBVUkwgd2FzIG5vdCBIVFRQU1wiKTtcbiAgfVxuXG4gIHJldHVybiBib2R5O1xufTtcblxuZXhwb3J0IHR5cGUgVXBsb2FkT3B0aW9uc1R5cGUgPSBSZWFkb25seTx7XG4gIGNvbnRlbnQ6IHN0cmluZyB8IEJ1ZmZlciB8IFVpbnQ4QXJyYXk7XG4gIGFwcFZlcnNpb246IHN0cmluZztcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlO1xuICBleHRlbnNpb24/OiBzdHJpbmc7XG4gIGNvbnRlbnRUeXBlPzogc3RyaW5nO1xuICBjb21wcmVzcz86IGJvb2xlYW47XG4gIHByZWZpeD86IHN0cmluZztcbn0+O1xuXG5leHBvcnQgY29uc3QgdXBsb2FkID0gYXN5bmMgKHtcbiAgY29udGVudCxcbiAgYXBwVmVyc2lvbixcbiAgbG9nZ2VyLFxuICBleHRlbnNpb24gPSAnZ3onLFxuICBjb250ZW50VHlwZSA9ICdhcHBsaWNhdGlvbi9nemlwJyxcbiAgY29tcHJlc3MgPSB0cnVlLFxuICBwcmVmaXgsXG59OiBVcGxvYWRPcHRpb25zVHlwZSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIGNvbnN0IGhlYWRlcnMgPSB7ICdVc2VyLUFnZW50JzogZ2V0VXNlckFnZW50KGFwcFZlcnNpb24pIH07XG5cbiAgY29uc3QgZm9ybVVybCA9IG5ldyBVUkwoQkFTRV9VUkwpO1xuXG4gIGlmIChwcmVmaXggIT09IHVuZGVmaW5lZCkge1xuICAgIGZvcm1Vcmwuc2VhcmNoUGFyYW1zLnNldCgncHJlZml4JywgcHJlZml4KTtcbiAgfVxuXG4gIGNvbnN0IHNpZ25lZEZvcm0gPSBhd2FpdCBnb3QuZ2V0KGZvcm1VcmwudG9TdHJpbmcoKSwge1xuICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgIGhlYWRlcnMsXG4gICAgdGltZW91dDogVVBMT0FEX1RJTUVPVVQsXG4gIH0pO1xuICBjb25zdCB7IGZpZWxkcywgdXJsIH0gPSBwYXJzZVRva2VuQm9keShzaWduZWRGb3JtLmJvZHkpO1xuXG4gIGNvbnN0IHVwbG9hZEtleSA9IGAke2ZpZWxkcy5rZXl9LiR7ZXh0ZW5zaW9ufWA7XG5cbiAgY29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuICAvLyBUaGUgQVBJIGV4cGVjdHMgYGtleWAgdG8gYmUgdGhlIGZpcnN0IGZpZWxkOlxuICBmb3JtLmFwcGVuZCgna2V5JywgdXBsb2FkS2V5KTtcbiAgT2JqZWN0LmVudHJpZXMoZmllbGRzKVxuICAgIC5maWx0ZXIoKFtrZXldKSA9PiBrZXkgIT09ICdrZXknKVxuICAgIC5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgIGZvcm0uYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgIH0pO1xuXG4gIGNvbnN0IGNvbnRlbnRCdWZmZXIgPSBjb21wcmVzc1xuICAgID8gYXdhaXQgcGlmeShnemlwKShCdWZmZXIuZnJvbShjb250ZW50KSlcbiAgICA6IEJ1ZmZlci5mcm9tKGNvbnRlbnQpO1xuICBmb3JtLmFwcGVuZCgnQ29udGVudC1UeXBlJywgY29udGVudFR5cGUpO1xuICBmb3JtLmFwcGVuZCgnZmlsZScsIGNvbnRlbnRCdWZmZXIsIHtcbiAgICBjb250ZW50VHlwZSxcbiAgICBmaWxlbmFtZTogYHNpZ25hbC1kZXNrdG9wLWRlYnVnLWxvZy0ke2FwcFZlcnNpb259LnR4dC5nemAsXG4gIH0pO1xuXG4gIGxvZ2dlci5pbmZvKCdEZWJ1ZyBsb2cgdXBsb2FkIHN0YXJ0aW5nLi4uJyk7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBzdGF0dXNDb2RlLCBib2R5IH0gPSBhd2FpdCBnb3QucG9zdCh1cmwsIHtcbiAgICAgIGhlYWRlcnMsXG4gICAgICBib2R5OiBmb3JtLFxuICAgICAgdGltZW91dDogVVBMT0FEX1RJTUVPVVQsXG4gICAgfSk7XG4gICAgaWYgKHN0YXR1c0NvZGUgIT09IDIwNCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgRmFpbGVkIHRvIHVwbG9hZCB0byBTMywgZ290IHN0YXR1cyAke3N0YXR1c0NvZGV9LCBib2R5ICcke2JvZHl9J2BcbiAgICAgICk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gZXJyb3IucmVzcG9uc2UgYXMgUmVzcG9uc2U8c3RyaW5nPjtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgR290IHRocmV3IG9uIHVwbG9hZCB0byBTMywgZ290IHN0YXR1cyAke3Jlc3BvbnNlPy5zdGF0dXNDb2RlfSwgYm9keSAnJHtyZXNwb25zZT8uYm9keX0nICBgXG4gICAgKTtcbiAgfVxuICBsb2dnZXIuaW5mbygnRGVidWcgbG9nIHVwbG9hZCBjb21wbGV0ZS4nKTtcblxuICByZXR1cm4gYCR7QkFTRV9VUkx9LyR7dXBsb2FkS2V5fWA7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLGlCQUFrQjtBQUNsQix1QkFBcUI7QUFDckIsaUJBQWdCO0FBQ2hCLGtCQUFxQjtBQUNyQixrQkFBaUI7QUFDakIsMEJBQTZCO0FBQzdCLGlCQUE4QjtBQUM5QixnQkFBMkI7QUFHM0IsTUFBTSxXQUFXO0FBRWpCLE1BQU0saUJBQWlCLEVBQUUsU0FBUyxVQUFVLE9BQU87QUFFbkQsTUFBTSxrQkFBa0IsYUFDckIsT0FBTztBQUFBLEVBQ04sUUFBUSxhQUFFLE9BQU8sYUFBRSxRQUFRLENBQUM7QUFBQSxFQUM1QixLQUFLLGFBQUUsT0FBTztBQUNoQixDQUFDLEVBQ0EsVUFBVTtBQUViLE1BQU0saUJBQWlCLHdCQUNyQixZQUNxRDtBQUNyRCxRQUFNLE9BQU8sZ0JBQWdCLE1BQU0sT0FBTztBQUUxQyxRQUFNLFlBQVksOEJBQWMsS0FBSyxHQUFHO0FBQ3hDLE1BQUksQ0FBQyxXQUFXO0FBQ2QsVUFBTSxJQUFJLE1BQU0sc0NBQXNDO0FBQUEsRUFDeEQ7QUFDQSxNQUFJLFVBQVUsYUFBYSxVQUFVO0FBQ25DLFVBQU0sSUFBSSxNQUFNLGdDQUFnQztBQUFBLEVBQ2xEO0FBRUEsU0FBTztBQUNULEdBZHVCO0FBMEJoQixNQUFNLFNBQVMsOEJBQU87QUFBQSxFQUMzQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxZQUFZO0FBQUEsRUFDWixjQUFjO0FBQUEsRUFDZCxXQUFXO0FBQUEsRUFDWDtBQUFBLE1BQ3dDO0FBQ3hDLFFBQU0sVUFBVSxFQUFFLGNBQWMsc0NBQWEsVUFBVSxFQUFFO0FBRXpELFFBQU0sVUFBVSxJQUFJLElBQUksUUFBUTtBQUVoQyxNQUFJLFdBQVcsUUFBVztBQUN4QixZQUFRLGFBQWEsSUFBSSxVQUFVLE1BQU07QUFBQSxFQUMzQztBQUVBLFFBQU0sYUFBYSxNQUFNLG1CQUFJLElBQUksUUFBUSxTQUFTLEdBQUc7QUFBQSxJQUNuRCxjQUFjO0FBQUEsSUFDZDtBQUFBLElBQ0EsU0FBUztBQUFBLEVBQ1gsQ0FBQztBQUNELFFBQU0sRUFBRSxRQUFRLFFBQVEsZUFBZSxXQUFXLElBQUk7QUFFdEQsUUFBTSxZQUFZLEdBQUcsT0FBTyxPQUFPO0FBRW5DLFFBQU0sT0FBTyxJQUFJLHlCQUFTO0FBRTFCLE9BQUssT0FBTyxPQUFPLFNBQVM7QUFDNUIsU0FBTyxRQUFRLE1BQU0sRUFDbEIsT0FBTyxDQUFDLENBQUMsU0FBUyxRQUFRLEtBQUssRUFDL0IsUUFBUSxDQUFDLENBQUMsS0FBSyxXQUFXO0FBQ3pCLFNBQUssT0FBTyxLQUFLLEtBQUs7QUFBQSxFQUN4QixDQUFDO0FBRUgsUUFBTSxnQkFBZ0IsV0FDbEIsTUFBTSx5QkFBSyxnQkFBSSxFQUFFLE9BQU8sS0FBSyxPQUFPLENBQUMsSUFDckMsT0FBTyxLQUFLLE9BQU87QUFDdkIsT0FBSyxPQUFPLGdCQUFnQixXQUFXO0FBQ3ZDLE9BQUssT0FBTyxRQUFRLGVBQWU7QUFBQSxJQUNqQztBQUFBLElBQ0EsVUFBVSw0QkFBNEI7QUFBQSxFQUN4QyxDQUFDO0FBRUQsU0FBTyxLQUFLLDhCQUE4QjtBQUMxQyxNQUFJO0FBQ0YsVUFBTSxFQUFFLFlBQVksU0FBUyxNQUFNLG1CQUFJLEtBQUssS0FBSztBQUFBLE1BQy9DO0FBQUEsTUFDQSxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDWCxDQUFDO0FBQ0QsUUFBSSxlQUFlLEtBQUs7QUFDdEIsWUFBTSxJQUFJLE1BQ1Isc0NBQXNDLHFCQUFxQixPQUM3RDtBQUFBLElBQ0Y7QUFBQSxFQUNGLFNBQVMsT0FBUDtBQUNBLFVBQU0sV0FBVyxNQUFNO0FBQ3ZCLFVBQU0sSUFBSSxNQUNSLHlDQUF5QyxVQUFVLHFCQUFxQixVQUFVLFNBQ3BGO0FBQUEsRUFDRjtBQUNBLFNBQU8sS0FBSyw0QkFBNEI7QUFFeEMsU0FBTyxHQUFHLFlBQVk7QUFDeEIsR0FqRXNCOyIsCiAgIm5hbWVzIjogW10KfQo=
