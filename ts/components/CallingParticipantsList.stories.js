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
var CallingParticipantsList_stories_exports = {};
__export(CallingParticipantsList_stories_exports, {
  ManyParticipants: () => ManyParticipants,
  NoOne: () => NoOne,
  Overflow: () => Overflow,
  SoloCall: () => SoloCall,
  default: () => CallingParticipantsList_stories_default
});
module.exports = __toCommonJS(CallingParticipantsList_stories_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_actions = require("@storybook/addon-actions");
var import_CallingParticipantsList = require("./CallingParticipantsList");
var import_Colors = require("../types/Colors");
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
function createParticipant(participantProps) {
  return {
    demuxId: 2,
    hasRemoteAudio: Boolean(participantProps.hasRemoteAudio),
    hasRemoteVideo: Boolean(participantProps.hasRemoteVideo),
    presenting: Boolean(participantProps.presenting),
    sharingScreen: Boolean(participantProps.sharingScreen),
    videoAspectRatio: 1.3,
    ...(0, import_getDefaultConversation.getDefaultConversationWithUuid)({
      avatarPath: participantProps.avatarPath,
      color: (0, import_lodash.sample)(import_Colors.AvatarColors),
      isBlocked: Boolean(participantProps.isBlocked),
      name: participantProps.name,
      profileName: participantProps.title,
      title: String(participantProps.title)
    })
  };
}
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  onClose: (0, import_addon_actions.action)("on-close"),
  ourUuid: "cf085e6a-e70b-41ec-a310-c198248af13f",
  participants: overrideProps.participants || []
}), "createProps");
var CallingParticipantsList_stories_default = {
  title: "Components/CallingParticipantsList"
};
const NoOne = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_CallingParticipantsList.CallingParticipantsList, {
    ...props
  });
}, "NoOne");
NoOne.story = {
  name: "No one"
};
const SoloCall = /* @__PURE__ */ __name(() => {
  const props = createProps({
    participants: [
      createParticipant({
        title: "Bardock"
      })
    ]
  });
  return /* @__PURE__ */ React.createElement(import_CallingParticipantsList.CallingParticipantsList, {
    ...props
  });
}, "SoloCall");
const ManyParticipants = /* @__PURE__ */ __name(() => {
  const props = createProps({
    participants: [
      createParticipant({
        title: "Son Goku"
      }),
      createParticipant({
        hasRemoteAudio: true,
        presenting: true,
        name: "Rage Trunks",
        title: "Rage Trunks"
      }),
      createParticipant({
        hasRemoteAudio: true,
        title: "Prince Vegeta"
      }),
      createParticipant({
        hasRemoteAudio: true,
        hasRemoteVideo: true,
        name: "Goku Black",
        title: "Goku Black"
      }),
      createParticipant({
        title: "Supreme Kai Zamasu"
      })
    ]
  });
  return /* @__PURE__ */ React.createElement(import_CallingParticipantsList.CallingParticipantsList, {
    ...props
  });
}, "ManyParticipants");
const Overflow = /* @__PURE__ */ __name(() => {
  const props = createProps({
    participants: Array(50).fill(null).map(() => createParticipant({ title: "Kirby" }))
  });
  return /* @__PURE__ */ React.createElement(import_CallingParticipantsList.CallingParticipantsList, {
    ...props
  });
}, "Overflow");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ManyParticipants,
  NoOne,
  Overflow,
  SoloCall
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ1BhcnRpY2lwYW50c0xpc3Quc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzYW1wbGUgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL0NhbGxpbmdQYXJ0aWNpcGFudHNMaXN0JztcbmltcG9ydCB7IENhbGxpbmdQYXJ0aWNpcGFudHNMaXN0IH0gZnJvbSAnLi9DYWxsaW5nUGFydGljaXBhbnRzTGlzdCc7XG5pbXBvcnQgeyBBdmF0YXJDb2xvcnMgfSBmcm9tICcuLi90eXBlcy9Db2xvcnMnO1xuaW1wb3J0IHR5cGUgeyBHcm91cENhbGxSZW1vdGVQYXJ0aWNpcGFudFR5cGUgfSBmcm9tICcuLi90eXBlcy9DYWxsaW5nJztcbmltcG9ydCB7IGdldERlZmF1bHRDb252ZXJzYXRpb25XaXRoVXVpZCB9IGZyb20gJy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVBhcnRpY2lwYW50KFxuICBwYXJ0aWNpcGFudFByb3BzOiBQYXJ0aWFsPEdyb3VwQ2FsbFJlbW90ZVBhcnRpY2lwYW50VHlwZT5cbik6IEdyb3VwQ2FsbFJlbW90ZVBhcnRpY2lwYW50VHlwZSB7XG4gIHJldHVybiB7XG4gICAgZGVtdXhJZDogMixcbiAgICBoYXNSZW1vdGVBdWRpbzogQm9vbGVhbihwYXJ0aWNpcGFudFByb3BzLmhhc1JlbW90ZUF1ZGlvKSxcbiAgICBoYXNSZW1vdGVWaWRlbzogQm9vbGVhbihwYXJ0aWNpcGFudFByb3BzLmhhc1JlbW90ZVZpZGVvKSxcbiAgICBwcmVzZW50aW5nOiBCb29sZWFuKHBhcnRpY2lwYW50UHJvcHMucHJlc2VudGluZyksXG4gICAgc2hhcmluZ1NjcmVlbjogQm9vbGVhbihwYXJ0aWNpcGFudFByb3BzLnNoYXJpbmdTY3JlZW4pLFxuICAgIHZpZGVvQXNwZWN0UmF0aW86IDEuMyxcbiAgICAuLi5nZXREZWZhdWx0Q29udmVyc2F0aW9uV2l0aFV1aWQoe1xuICAgICAgYXZhdGFyUGF0aDogcGFydGljaXBhbnRQcm9wcy5hdmF0YXJQYXRoLFxuICAgICAgY29sb3I6IHNhbXBsZShBdmF0YXJDb2xvcnMpLFxuICAgICAgaXNCbG9ja2VkOiBCb29sZWFuKHBhcnRpY2lwYW50UHJvcHMuaXNCbG9ja2VkKSxcbiAgICAgIG5hbWU6IHBhcnRpY2lwYW50UHJvcHMubmFtZSxcbiAgICAgIHByb2ZpbGVOYW1lOiBwYXJ0aWNpcGFudFByb3BzLnRpdGxlLFxuICAgICAgdGl0bGU6IFN0cmluZyhwYXJ0aWNpcGFudFByb3BzLnRpdGxlKSxcbiAgICB9KSxcbiAgfTtcbn1cblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wc1R5cGU+ID0ge30pOiBQcm9wc1R5cGUgPT4gKHtcbiAgaTE4bixcbiAgb25DbG9zZTogYWN0aW9uKCdvbi1jbG9zZScpLFxuICBvdXJVdWlkOiAnY2YwODVlNmEtZTcwYi00MWVjLWEzMTAtYzE5ODI0OGFmMTNmJyxcbiAgcGFydGljaXBhbnRzOiBvdmVycmlkZVByb3BzLnBhcnRpY2lwYW50cyB8fCBbXSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9DYWxsaW5nUGFydGljaXBhbnRzTGlzdCcsXG59O1xuXG5leHBvcnQgY29uc3QgTm9PbmUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKCk7XG4gIHJldHVybiA8Q2FsbGluZ1BhcnRpY2lwYW50c0xpc3Qgey4uLnByb3BzfSAvPjtcbn07XG5cbk5vT25lLnN0b3J5ID0ge1xuICBuYW1lOiAnTm8gb25lJyxcbn07XG5cbmV4cG9ydCBjb25zdCBTb2xvQ2FsbCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHBhcnRpY2lwYW50czogW1xuICAgICAgY3JlYXRlUGFydGljaXBhbnQoe1xuICAgICAgICB0aXRsZTogJ0JhcmRvY2snLFxuICAgICAgfSksXG4gICAgXSxcbiAgfSk7XG4gIHJldHVybiA8Q2FsbGluZ1BhcnRpY2lwYW50c0xpc3Qgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBNYW55UGFydGljaXBhbnRzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgcGFydGljaXBhbnRzOiBbXG4gICAgICBjcmVhdGVQYXJ0aWNpcGFudCh7XG4gICAgICAgIHRpdGxlOiAnU29uIEdva3UnLFxuICAgICAgfSksXG4gICAgICBjcmVhdGVQYXJ0aWNpcGFudCh7XG4gICAgICAgIGhhc1JlbW90ZUF1ZGlvOiB0cnVlLFxuICAgICAgICBwcmVzZW50aW5nOiB0cnVlLFxuICAgICAgICBuYW1lOiAnUmFnZSBUcnVua3MnLFxuICAgICAgICB0aXRsZTogJ1JhZ2UgVHJ1bmtzJyxcbiAgICAgIH0pLFxuICAgICAgY3JlYXRlUGFydGljaXBhbnQoe1xuICAgICAgICBoYXNSZW1vdGVBdWRpbzogdHJ1ZSxcbiAgICAgICAgdGl0bGU6ICdQcmluY2UgVmVnZXRhJyxcbiAgICAgIH0pLFxuICAgICAgY3JlYXRlUGFydGljaXBhbnQoe1xuICAgICAgICBoYXNSZW1vdGVBdWRpbzogdHJ1ZSxcbiAgICAgICAgaGFzUmVtb3RlVmlkZW86IHRydWUsXG4gICAgICAgIG5hbWU6ICdHb2t1IEJsYWNrJyxcbiAgICAgICAgdGl0bGU6ICdHb2t1IEJsYWNrJyxcbiAgICAgIH0pLFxuICAgICAgY3JlYXRlUGFydGljaXBhbnQoe1xuICAgICAgICB0aXRsZTogJ1N1cHJlbWUgS2FpIFphbWFzdScsXG4gICAgICB9KSxcbiAgICBdLFxuICB9KTtcbiAgcmV0dXJuIDxDYWxsaW5nUGFydGljaXBhbnRzTGlzdCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE92ZXJmbG93ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgcGFydGljaXBhbnRzOiBBcnJheSg1MClcbiAgICAgIC5maWxsKG51bGwpXG4gICAgICAubWFwKCgpID0+IGNyZWF0ZVBhcnRpY2lwYW50KHsgdGl0bGU6ICdLaXJieScgfSkpLFxuICB9KTtcbiAgcmV0dXJuIDxDYWxsaW5nUGFydGljaXBhbnRzTGlzdCB7Li4ucHJvcHN9IC8+O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLG9CQUF1QjtBQUN2QiwyQkFBdUI7QUFHdkIscUNBQXdDO0FBQ3hDLG9CQUE2QjtBQUU3QixvQ0FBK0M7QUFDL0MsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QywyQkFDRSxrQkFDZ0M7QUFDaEMsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLElBQ1QsZ0JBQWdCLFFBQVEsaUJBQWlCLGNBQWM7QUFBQSxJQUN2RCxnQkFBZ0IsUUFBUSxpQkFBaUIsY0FBYztBQUFBLElBQ3ZELFlBQVksUUFBUSxpQkFBaUIsVUFBVTtBQUFBLElBQy9DLGVBQWUsUUFBUSxpQkFBaUIsYUFBYTtBQUFBLElBQ3JELGtCQUFrQjtBQUFBLE9BQ2Ysa0VBQStCO0FBQUEsTUFDaEMsWUFBWSxpQkFBaUI7QUFBQSxNQUM3QixPQUFPLDBCQUFPLDBCQUFZO0FBQUEsTUFDMUIsV0FBVyxRQUFRLGlCQUFpQixTQUFTO0FBQUEsTUFDN0MsTUFBTSxpQkFBaUI7QUFBQSxNQUN2QixhQUFhLGlCQUFpQjtBQUFBLE1BQzlCLE9BQU8sT0FBTyxpQkFBaUIsS0FBSztBQUFBLElBQ3RDLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUFuQlMsQUFxQlQsTUFBTSxjQUFjLHdCQUFDLGdCQUFvQyxDQUFDLE1BQWtCO0FBQUEsRUFDMUU7QUFBQSxFQUNBLFNBQVMsaUNBQU8sVUFBVTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxFQUNULGNBQWMsY0FBYyxnQkFBZ0IsQ0FBQztBQUMvQyxJQUxvQjtBQU9wQixJQUFPLDBDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLFFBQVEsNkJBQW1CO0FBQ3RDLFFBQU0sUUFBUSxZQUFZO0FBQzFCLFNBQU8sb0NBQUM7QUFBQSxPQUE0QjtBQUFBLEdBQU87QUFDN0MsR0FIcUI7QUFLckIsTUFBTSxRQUFRO0FBQUEsRUFDWixNQUFNO0FBQ1I7QUFFTyxNQUFNLFdBQVcsNkJBQW1CO0FBQ3pDLFFBQU0sUUFBUSxZQUFZO0FBQUEsSUFDeEIsY0FBYztBQUFBLE1BQ1osa0JBQWtCO0FBQUEsUUFDaEIsT0FBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGLENBQUM7QUFDRCxTQUFPLG9DQUFDO0FBQUEsT0FBNEI7QUFBQSxHQUFPO0FBQzdDLEdBVHdCO0FBV2pCLE1BQU0sbUJBQW1CLDZCQUFtQjtBQUNqRCxRQUFNLFFBQVEsWUFBWTtBQUFBLElBQ3hCLGNBQWM7QUFBQSxNQUNaLGtCQUFrQjtBQUFBLFFBQ2hCLE9BQU87QUFBQSxNQUNULENBQUM7QUFBQSxNQUNELGtCQUFrQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLFlBQVk7QUFBQSxRQUNaLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxNQUNULENBQUM7QUFBQSxNQUNELGtCQUFrQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLE9BQU87QUFBQSxNQUNULENBQUM7QUFBQSxNQUNELGtCQUFrQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxNQUNULENBQUM7QUFBQSxNQUNELGtCQUFrQjtBQUFBLFFBQ2hCLE9BQU87QUFBQSxNQUNULENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRixDQUFDO0FBQ0QsU0FBTyxvQ0FBQztBQUFBLE9BQTRCO0FBQUEsR0FBTztBQUM3QyxHQTVCZ0M7QUE4QnpCLE1BQU0sV0FBVyw2QkFBbUI7QUFDekMsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixjQUFjLE1BQU0sRUFBRSxFQUNuQixLQUFLLElBQUksRUFDVCxJQUFJLE1BQU0sa0JBQWtCLEVBQUUsT0FBTyxRQUFRLENBQUMsQ0FBQztBQUFBLEVBQ3BELENBQUM7QUFDRCxTQUFPLG9DQUFDO0FBQUEsT0FBNEI7QUFBQSxHQUFPO0FBQzdDLEdBUHdCOyIsCiAgIm5hbWVzIjogW10KfQo=
