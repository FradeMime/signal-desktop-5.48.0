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
var ReactionViewer_stories_exports = {};
__export(ReactionViewer_stories_exports, {
  AllReactions: () => AllReactions,
  PickedMissingReaction: () => PickedMissingReaction,
  PickedReaction: () => PickedReaction,
  ReactionSkinTones: () => ReactionSkinTones,
  default: () => ReactionViewer_stories_default
});
module.exports = __toCommonJS(ReactionViewer_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_ReactionViewer = require("./ReactionViewer");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_getDefaultConversation = require("../../test-both/helpers/getDefaultConversation");
var import_Util = require("../../types/Util");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ReactionViewer_stories_default = {
  title: "Components/Conversation/ReactionViewer"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  getPreferredBadge: () => void 0,
  i18n,
  onClose: (0, import_addon_actions.action)("onClose"),
  pickedReaction: overrideProps.pickedReaction,
  reactions: overrideProps.reactions || [],
  style: overrideProps.style,
  theme: import_Util.ThemeType.light
}), "createProps");
const AllReactions = /* @__PURE__ */ __name(() => {
  const props = createProps({
    reactions: [
      {
        emoji: "\u2764\uFE0F",
        timestamp: 1,
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "+14155552671",
          phoneNumber: "+14155552671",
          profileName: "Ameila Briggs",
          title: "Amelia"
        })
      },
      {
        emoji: "\u2764\uFE0F",
        timestamp: 2,
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "+14155552672",
          name: "Adam Burrel",
          title: "Adam"
        })
      },
      {
        emoji: "\u2764\uFE0F",
        timestamp: 3,
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "+14155552673",
          name: "Rick Owens",
          title: "Rick"
        })
      },
      {
        emoji: "\u2764\uFE0F",
        timestamp: 4,
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "+14155552674",
          name: "Bojack Horseman",
          title: "Bojack"
        })
      },
      {
        emoji: "\u{1F44D}",
        timestamp: 9,
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "+14155552678",
          phoneNumber: "+14155552678",
          profileName: "Adam Burrel",
          title: "Adam"
        })
      },
      {
        emoji: "\u{1F44E}",
        timestamp: 10,
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "+14155552673",
          name: "Rick Owens",
          title: "Rick"
        })
      },
      {
        emoji: "\u{1F602}",
        timestamp: 11,
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "+14155552674",
          name: "Bojack Horseman",
          title: "Bojack"
        })
      },
      {
        emoji: "\u{1F62E}",
        timestamp: 12,
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "+14155552675",
          name: "Cayce Pollard",
          title: "Cayce"
        })
      },
      {
        emoji: "\u{1F622}",
        timestamp: 13,
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "+14155552676",
          name: "Foo McBarrington",
          title: "Foo"
        })
      },
      {
        emoji: "\u{1F621}",
        timestamp: 14,
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "+14155552676",
          name: "Foo McBarrington",
          title: "Foo"
        })
      }
    ]
  });
  return /* @__PURE__ */ React.createElement(import_ReactionViewer.ReactionViewer, {
    ...props
  });
}, "AllReactions");
const PickedReaction = /* @__PURE__ */ __name(() => {
  const props = createProps({
    pickedReaction: "\u2764\uFE0F",
    reactions: [
      {
        emoji: "\u2764\uFE0F",
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "+14155552671",
          name: "Amelia Briggs",
          isMe: true,
          title: "Amelia"
        }),
        timestamp: Date.now()
      },
      {
        emoji: "\u{1F44D}",
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "+14155552671",
          phoneNumber: "+14155552671",
          profileName: "Joel Ferrari",
          title: "Joel"
        }),
        timestamp: Date.now()
      }
    ]
  });
  return /* @__PURE__ */ React.createElement(import_ReactionViewer.ReactionViewer, {
    ...props
  });
}, "PickedReaction");
const PickedMissingReaction = /* @__PURE__ */ __name(() => {
  const props = createProps({
    pickedReaction: "\u{1F621}",
    reactions: [
      {
        emoji: "\u2764\uFE0F",
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "+14155552671",
          name: "Amelia Briggs",
          isMe: true,
          title: "Amelia"
        }),
        timestamp: Date.now()
      },
      {
        emoji: "\u{1F44D}",
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          id: "+14155552671",
          phoneNumber: "+14155552671",
          profileName: "Joel Ferrari",
          title: "Joel"
        }),
        timestamp: Date.now()
      }
    ]
  });
  return /* @__PURE__ */ React.createElement(import_ReactionViewer.ReactionViewer, {
    ...props
  });
}, "PickedMissingReaction");
const skinTones = [
  "\u{1F3FB}",
  "\u{1F3FC}",
  "\u{1F3FD}",
  "\u{1F3FE}",
  "\u{1F3FF}"
];
const thumbsUpHands = skinTones.map((skinTone) => `\u{1F44D}${skinTone}`);
const okHands = skinTones.map((skinTone) => `\u{1F44C}${skinTone}`).reverse();
const createReaction = /* @__PURE__ */ __name((emoji, name, timestamp = Date.now()) => ({
  emoji,
  from: (0, import_getDefaultConversation.getDefaultConversation)({
    id: "+14155552671",
    name,
    title: name
  }),
  timestamp
}), "createReaction");
const ReactionSkinTones = /* @__PURE__ */ __name(() => {
  const props = createProps({
    pickedReaction: "\u{1F621}",
    reactions: [
      ...thumbsUpHands.map((emoji, n) => createReaction(emoji, `Thumbs Up ${n + 1}`, Date.now() + n * 1e3)),
      ...okHands.map((emoji, n) => createReaction(emoji, `Ok Hand ${n + 1}`, Date.now() + n * 1e3))
    ]
  });
  return /* @__PURE__ */ React.createElement(import_ReactionViewer.ReactionViewer, {
    ...props
  });
}, "ReactionSkinTones");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AllReactions,
  PickedMissingReaction,
  PickedReaction,
  ReactionSkinTones
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUmVhY3Rpb25WaWV3ZXIuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL1JlYWN0aW9uVmlld2VyJztcbmltcG9ydCB7IFJlYWN0aW9uVmlld2VyIH0gZnJvbSAnLi9SZWFjdGlvblZpZXdlcic7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7IGdldERlZmF1bHRDb252ZXJzYXRpb24gfSBmcm9tICcuLi8uLi90ZXN0LWJvdGgvaGVscGVycy9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcbmltcG9ydCB7IFRoZW1lVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vUmVhY3Rpb25WaWV3ZXInLFxufTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wcz4gPSB7fSk6IFByb3BzID0+ICh7XG4gIGdldFByZWZlcnJlZEJhZGdlOiAoKSA9PiB1bmRlZmluZWQsXG4gIGkxOG4sXG4gIG9uQ2xvc2U6IGFjdGlvbignb25DbG9zZScpLFxuICBwaWNrZWRSZWFjdGlvbjogb3ZlcnJpZGVQcm9wcy5waWNrZWRSZWFjdGlvbixcbiAgcmVhY3Rpb25zOiBvdmVycmlkZVByb3BzLnJlYWN0aW9ucyB8fCBbXSxcbiAgc3R5bGU6IG92ZXJyaWRlUHJvcHMuc3R5bGUsXG4gIHRoZW1lOiBUaGVtZVR5cGUubGlnaHQsXG59KTtcblxuZXhwb3J0IGNvbnN0IEFsbFJlYWN0aW9ucyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIHJlYWN0aW9uczogW1xuICAgICAge1xuICAgICAgICBlbW9qaTogJ1x1Mjc2NFx1RkUwRicsXG4gICAgICAgIHRpbWVzdGFtcDogMSxcbiAgICAgICAgZnJvbTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgaWQ6ICcrMTQxNTU1NTI2NzEnLFxuICAgICAgICAgIHBob25lTnVtYmVyOiAnKzE0MTU1NTUyNjcxJyxcbiAgICAgICAgICBwcm9maWxlTmFtZTogJ0FtZWlsYSBCcmlnZ3MnLFxuICAgICAgICAgIHRpdGxlOiAnQW1lbGlhJyxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBlbW9qaTogJ1x1Mjc2NFx1RkUwRicsXG4gICAgICAgIHRpbWVzdGFtcDogMixcbiAgICAgICAgZnJvbTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgaWQ6ICcrMTQxNTU1NTI2NzInLFxuICAgICAgICAgIG5hbWU6ICdBZGFtIEJ1cnJlbCcsXG4gICAgICAgICAgdGl0bGU6ICdBZGFtJyxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBlbW9qaTogJ1x1Mjc2NFx1RkUwRicsXG4gICAgICAgIHRpbWVzdGFtcDogMyxcbiAgICAgICAgZnJvbTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgaWQ6ICcrMTQxNTU1NTI2NzMnLFxuICAgICAgICAgIG5hbWU6ICdSaWNrIE93ZW5zJyxcbiAgICAgICAgICB0aXRsZTogJ1JpY2snLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGVtb2ppOiAnXHUyNzY0XHVGRTBGJyxcbiAgICAgICAgdGltZXN0YW1wOiA0LFxuICAgICAgICBmcm9tOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICBpZDogJysxNDE1NTU1MjY3NCcsXG4gICAgICAgICAgbmFtZTogJ0JvamFjayBIb3JzZW1hbicsXG4gICAgICAgICAgdGl0bGU6ICdCb2phY2snLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGVtb2ppOiAnXHVEODNEXHVEQzREJyxcbiAgICAgICAgdGltZXN0YW1wOiA5LFxuICAgICAgICBmcm9tOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICBpZDogJysxNDE1NTU1MjY3OCcsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6ICcrMTQxNTU1NTI2NzgnLFxuICAgICAgICAgIHByb2ZpbGVOYW1lOiAnQWRhbSBCdXJyZWwnLFxuICAgICAgICAgIHRpdGxlOiAnQWRhbScsXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZW1vamk6ICdcdUQ4M0RcdURDNEUnLFxuICAgICAgICB0aW1lc3RhbXA6IDEwLFxuICAgICAgICBmcm9tOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICBpZDogJysxNDE1NTU1MjY3MycsXG4gICAgICAgICAgbmFtZTogJ1JpY2sgT3dlbnMnLFxuICAgICAgICAgIHRpdGxlOiAnUmljaycsXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZW1vamk6ICdcdUQ4M0RcdURFMDInLFxuICAgICAgICB0aW1lc3RhbXA6IDExLFxuICAgICAgICBmcm9tOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICBpZDogJysxNDE1NTU1MjY3NCcsXG4gICAgICAgICAgbmFtZTogJ0JvamFjayBIb3JzZW1hbicsXG4gICAgICAgICAgdGl0bGU6ICdCb2phY2snLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGVtb2ppOiAnXHVEODNEXHVERTJFJyxcbiAgICAgICAgdGltZXN0YW1wOiAxMixcbiAgICAgICAgZnJvbTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgaWQ6ICcrMTQxNTU1NTI2NzUnLFxuICAgICAgICAgIG5hbWU6ICdDYXljZSBQb2xsYXJkJyxcbiAgICAgICAgICB0aXRsZTogJ0NheWNlJyxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBlbW9qaTogJ1x1RDgzRFx1REUyMicsXG4gICAgICAgIHRpbWVzdGFtcDogMTMsXG4gICAgICAgIGZyb206IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIGlkOiAnKzE0MTU1NTUyNjc2JyxcbiAgICAgICAgICBuYW1lOiAnRm9vIE1jQmFycmluZ3RvbicsXG4gICAgICAgICAgdGl0bGU6ICdGb28nLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGVtb2ppOiAnXHVEODNEXHVERTIxJyxcbiAgICAgICAgdGltZXN0YW1wOiAxNCxcbiAgICAgICAgZnJvbTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgaWQ6ICcrMTQxNTU1NTI2NzYnLFxuICAgICAgICAgIG5hbWU6ICdGb28gTWNCYXJyaW5ndG9uJyxcbiAgICAgICAgICB0aXRsZTogJ0ZvbycsXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICBdLFxuICB9KTtcbiAgcmV0dXJuIDxSZWFjdGlvblZpZXdlciB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IFBpY2tlZFJlYWN0aW9uID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgcGlja2VkUmVhY3Rpb246ICdcdTI3NjRcdUZFMEYnLFxuICAgIHJlYWN0aW9uczogW1xuICAgICAge1xuICAgICAgICBlbW9qaTogJ1x1Mjc2NFx1RkUwRicsXG4gICAgICAgIGZyb206IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIGlkOiAnKzE0MTU1NTUyNjcxJyxcbiAgICAgICAgICBuYW1lOiAnQW1lbGlhIEJyaWdncycsXG4gICAgICAgICAgaXNNZTogdHJ1ZSxcbiAgICAgICAgICB0aXRsZTogJ0FtZWxpYScsXG4gICAgICAgIH0pLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBlbW9qaTogJ1x1RDgzRFx1REM0RCcsXG4gICAgICAgIGZyb206IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIGlkOiAnKzE0MTU1NTUyNjcxJyxcbiAgICAgICAgICBwaG9uZU51bWJlcjogJysxNDE1NTU1MjY3MScsXG4gICAgICAgICAgcHJvZmlsZU5hbWU6ICdKb2VsIEZlcnJhcmknLFxuICAgICAgICAgIHRpdGxlOiAnSm9lbCcsXG4gICAgICAgIH0pLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICB9LFxuICAgIF0sXG4gIH0pO1xuICByZXR1cm4gPFJlYWN0aW9uVmlld2VyIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgUGlja2VkTWlzc2luZ1JlYWN0aW9uID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgcGlja2VkUmVhY3Rpb246ICdcdUQ4M0RcdURFMjEnLFxuICAgIHJlYWN0aW9uczogW1xuICAgICAge1xuICAgICAgICBlbW9qaTogJ1x1Mjc2NFx1RkUwRicsXG4gICAgICAgIGZyb206IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIGlkOiAnKzE0MTU1NTUyNjcxJyxcbiAgICAgICAgICBuYW1lOiAnQW1lbGlhIEJyaWdncycsXG4gICAgICAgICAgaXNNZTogdHJ1ZSxcbiAgICAgICAgICB0aXRsZTogJ0FtZWxpYScsXG4gICAgICAgIH0pLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBlbW9qaTogJ1x1RDgzRFx1REM0RCcsXG4gICAgICAgIGZyb206IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIGlkOiAnKzE0MTU1NTUyNjcxJyxcbiAgICAgICAgICBwaG9uZU51bWJlcjogJysxNDE1NTU1MjY3MScsXG4gICAgICAgICAgcHJvZmlsZU5hbWU6ICdKb2VsIEZlcnJhcmknLFxuICAgICAgICAgIHRpdGxlOiAnSm9lbCcsXG4gICAgICAgIH0pLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICB9LFxuICAgIF0sXG4gIH0pO1xuICByZXR1cm4gPFJlYWN0aW9uVmlld2VyIHsuLi5wcm9wc30gLz47XG59O1xuXG5jb25zdCBza2luVG9uZXMgPSBbXG4gICdcXHV7MUYzRkJ9JyxcbiAgJ1xcdXsxRjNGQ30nLFxuICAnXFx1ezFGM0ZEfScsXG4gICdcXHV7MUYzRkV9JyxcbiAgJ1xcdXsxRjNGRn0nLFxuXTtcbmNvbnN0IHRodW1ic1VwSGFuZHMgPSBza2luVG9uZXMubWFwKHNraW5Ub25lID0+IGBcdUQ4M0RcdURDNEQke3NraW5Ub25lfWApO1xuY29uc3Qgb2tIYW5kcyA9IHNraW5Ub25lcy5tYXAoc2tpblRvbmUgPT4gYFx1RDgzRFx1REM0QyR7c2tpblRvbmV9YCkucmV2ZXJzZSgpO1xuXG5jb25zdCBjcmVhdGVSZWFjdGlvbiA9IChcbiAgZW1vamk6IHN0cmluZyxcbiAgbmFtZTogc3RyaW5nLFxuICB0aW1lc3RhbXAgPSBEYXRlLm5vdygpXG4pID0+ICh7XG4gIGVtb2ppLFxuICBmcm9tOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICBpZDogJysxNDE1NTU1MjY3MScsXG4gICAgbmFtZSxcbiAgICB0aXRsZTogbmFtZSxcbiAgfSksXG4gIHRpbWVzdGFtcCxcbn0pO1xuXG5leHBvcnQgY29uc3QgUmVhY3Rpb25Ta2luVG9uZXMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBwaWNrZWRSZWFjdGlvbjogJ1x1RDgzRFx1REUyMScsXG4gICAgcmVhY3Rpb25zOiBbXG4gICAgICAuLi50aHVtYnNVcEhhbmRzLm1hcCgoZW1vamksIG4pID0+XG4gICAgICAgIGNyZWF0ZVJlYWN0aW9uKGVtb2ppLCBgVGh1bWJzIFVwICR7biArIDF9YCwgRGF0ZS5ub3coKSArIG4gKiAxMDAwKVxuICAgICAgKSxcbiAgICAgIC4uLm9rSGFuZHMubWFwKChlbW9qaSwgbikgPT5cbiAgICAgICAgY3JlYXRlUmVhY3Rpb24oZW1vamksIGBPayBIYW5kICR7biArIDF9YCwgRGF0ZS5ub3coKSArIG4gKiAxMDAwKVxuICAgICAgKSxcbiAgICBdLFxuICB9KTtcbiAgcmV0dXJuIDxSZWFjdGlvblZpZXdlciB7Li4ucHJvcHN9IC8+O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLDJCQUF1QjtBQUd2Qiw0QkFBK0I7QUFDL0IsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUN2QixvQ0FBdUM7QUFDdkMsa0JBQTBCO0FBRTFCLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8saUNBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0sY0FBYyx3QkFBQyxnQkFBZ0MsQ0FBQyxNQUFjO0FBQUEsRUFDbEUsbUJBQW1CLE1BQU07QUFBQSxFQUN6QjtBQUFBLEVBQ0EsU0FBUyxpQ0FBTyxTQUFTO0FBQUEsRUFDekIsZ0JBQWdCLGNBQWM7QUFBQSxFQUM5QixXQUFXLGNBQWMsYUFBYSxDQUFDO0FBQUEsRUFDdkMsT0FB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
