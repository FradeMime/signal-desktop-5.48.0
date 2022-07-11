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
var getStickerPacks_exports = {};
__export(getStickerPacks_exports, {
  Stickers: () => Stickers,
  blessedPacks: () => blessedPacks,
  createPack: () => createPack,
  installedPacks: () => installedPacks,
  knownPacks: () => knownPacks,
  receivedPacks: () => receivedPacks
});
module.exports = __toCommonJS(getStickerPacks_exports);
const createPack = /* @__PURE__ */ __name((props, sticker) => ({
  id: "",
  title: props.id ? `${props.id} title` : "title",
  key: "",
  author: "",
  isBlessed: false,
  lastUsed: 0,
  status: "known",
  cover: sticker,
  stickerCount: 101,
  stickers: sticker ? Array(101).fill(0).map((_, id) => ({ ...sticker, id })) : [],
  ...props
}), "createPack");
const Stickers = {
  kitten1: {
    id: 1,
    url: "/fixtures/kitten-1-64-64.jpg",
    packId: "kitten1",
    emoji: ""
  },
  kitten2: {
    id: 2,
    url: "/fixtures/kitten-2-64-64.jpg",
    packId: "kitten2",
    emoji: ""
  },
  kitten3: {
    id: 3,
    url: "/fixtures/kitten-3-64-64.jpg",
    packId: "kitten3",
    emoji: ""
  },
  abe: {
    id: 4,
    url: "/fixtures/512x515-thumbs-up-lincoln.webp",
    packId: "abe",
    emoji: ""
  },
  wide: {
    id: 5,
    url: "/fixtures/1000x50-green.jpeg",
    packId: "wide",
    emoji: ""
  },
  tall: {
    id: 6,
    url: "/fixtures/50x1000-teal.jpeg",
    packId: "tall",
    emoji: ""
  }
};
const receivedPacks = [
  createPack({ id: "abe", status: "downloaded" }, Stickers.abe),
  createPack({ id: "kitten3", status: "downloaded" }, Stickers.kitten3)
];
const installedPacks = [
  createPack({ id: "kitten1", status: "installed" }, Stickers.kitten1),
  createPack({ id: "kitten2", status: "installed" }, Stickers.kitten2),
  createPack({ id: "kitten3", status: "installed" }, Stickers.kitten3)
];
const blessedPacks = [
  createPack({ id: "wide", status: "downloaded", isBlessed: true }, Stickers.wide),
  createPack({ id: "tall", status: "downloaded", isBlessed: true }, Stickers.tall)
];
const knownPacks = [
  createPack({ id: "kitten1", status: "known" }, Stickers.kitten1),
  createPack({ id: "kitten2", status: "known" }, Stickers.kitten2)
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Stickers,
  blessedPacks,
  createPack,
  installedPacks,
  knownPacks,
  receivedPacks
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0U3RpY2tlclBhY2tzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgU3RpY2tlclBhY2tUeXBlLCBTdGlja2VyVHlwZSB9IGZyb20gJy4uLy4uL3N0YXRlL2R1Y2tzL3N0aWNrZXJzJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBhY2sgPSAoXG4gIHByb3BzOiBQYXJ0aWFsPFN0aWNrZXJQYWNrVHlwZT4sXG4gIHN0aWNrZXI/OiBTdGlja2VyVHlwZVxuKTogU3RpY2tlclBhY2tUeXBlID0+ICh7XG4gIGlkOiAnJyxcbiAgdGl0bGU6IHByb3BzLmlkID8gYCR7cHJvcHMuaWR9IHRpdGxlYCA6ICd0aXRsZScsXG4gIGtleTogJycsXG4gIGF1dGhvcjogJycsXG4gIGlzQmxlc3NlZDogZmFsc2UsXG4gIGxhc3RVc2VkOiAwLFxuICBzdGF0dXM6ICdrbm93bicsXG4gIGNvdmVyOiBzdGlja2VyLFxuICBzdGlja2VyQ291bnQ6IDEwMSxcbiAgc3RpY2tlcnM6IHN0aWNrZXJcbiAgICA/IEFycmF5KDEwMSlcbiAgICAgICAgLmZpbGwoMClcbiAgICAgICAgLm1hcCgoXywgaWQpID0+ICh7IC4uLnN0aWNrZXIsIGlkIH0pKVxuICAgIDogW10sXG4gIC4uLnByb3BzLFxufSk7XG5cbmV4cG9ydCBjb25zdCBTdGlja2VyczogUmVjb3JkPHN0cmluZywgU3RpY2tlclR5cGU+ID0ge1xuICBraXR0ZW4xOiB7XG4gICAgaWQ6IDEsXG4gICAgdXJsOiAnL2ZpeHR1cmVzL2tpdHRlbi0xLTY0LTY0LmpwZycsXG4gICAgcGFja0lkOiAna2l0dGVuMScsXG4gICAgZW1vamk6ICcnLFxuICB9LFxuXG4gIGtpdHRlbjI6IHtcbiAgICBpZDogMixcbiAgICB1cmw6ICcvZml4dHVyZXMva2l0dGVuLTItNjQtNjQuanBnJyxcbiAgICBwYWNrSWQ6ICdraXR0ZW4yJyxcbiAgICBlbW9qaTogJycsXG4gIH0sXG5cbiAga2l0dGVuMzoge1xuICAgIGlkOiAzLFxuICAgIHVybDogJy9maXh0dXJlcy9raXR0ZW4tMy02NC02NC5qcGcnLFxuICAgIHBhY2tJZDogJ2tpdHRlbjMnLFxuICAgIGVtb2ppOiAnJyxcbiAgfSxcblxuICBhYmU6IHtcbiAgICBpZDogNCxcbiAgICB1cmw6ICcvZml4dHVyZXMvNTEyeDUxNS10aHVtYnMtdXAtbGluY29sbi53ZWJwJyxcbiAgICBwYWNrSWQ6ICdhYmUnLFxuICAgIGVtb2ppOiAnJyxcbiAgfSxcblxuICB3aWRlOiB7XG4gICAgaWQ6IDUsXG4gICAgdXJsOiAnL2ZpeHR1cmVzLzEwMDB4NTAtZ3JlZW4uanBlZycsXG4gICAgcGFja0lkOiAnd2lkZScsXG4gICAgZW1vamk6ICcnLFxuICB9LFxuXG4gIHRhbGw6IHtcbiAgICBpZDogNixcbiAgICB1cmw6ICcvZml4dHVyZXMvNTB4MTAwMC10ZWFsLmpwZWcnLFxuICAgIHBhY2tJZDogJ3RhbGwnLFxuICAgIGVtb2ppOiAnJyxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCByZWNlaXZlZFBhY2tzID0gW1xuICBjcmVhdGVQYWNrKHsgaWQ6ICdhYmUnLCBzdGF0dXM6ICdkb3dubG9hZGVkJyB9LCBTdGlja2Vycy5hYmUpLFxuICBjcmVhdGVQYWNrKHsgaWQ6ICdraXR0ZW4zJywgc3RhdHVzOiAnZG93bmxvYWRlZCcgfSwgU3RpY2tlcnMua2l0dGVuMyksXG5dO1xuXG5leHBvcnQgY29uc3QgaW5zdGFsbGVkUGFja3MgPSBbXG4gIGNyZWF0ZVBhY2soeyBpZDogJ2tpdHRlbjEnLCBzdGF0dXM6ICdpbnN0YWxsZWQnIH0sIFN0aWNrZXJzLmtpdHRlbjEpLFxuICBjcmVhdGVQYWNrKHsgaWQ6ICdraXR0ZW4yJywgc3RhdHVzOiAnaW5zdGFsbGVkJyB9LCBTdGlja2Vycy5raXR0ZW4yKSxcbiAgY3JlYXRlUGFjayh7IGlkOiAna2l0dGVuMycsIHN0YXR1czogJ2luc3RhbGxlZCcgfSwgU3RpY2tlcnMua2l0dGVuMyksXG5dO1xuXG5leHBvcnQgY29uc3QgYmxlc3NlZFBhY2tzID0gW1xuICBjcmVhdGVQYWNrKFxuICAgIHsgaWQ6ICd3aWRlJywgc3RhdHVzOiAnZG93bmxvYWRlZCcsIGlzQmxlc3NlZDogdHJ1ZSB9LFxuICAgIFN0aWNrZXJzLndpZGVcbiAgKSxcbiAgY3JlYXRlUGFjayhcbiAgICB7IGlkOiAndGFsbCcsIHN0YXR1czogJ2Rvd25sb2FkZWQnLCBpc0JsZXNzZWQ6IHRydWUgfSxcbiAgICBTdGlja2Vycy50YWxsXG4gICksXG5dO1xuXG5leHBvcnQgY29uc3Qga25vd25QYWNrcyA9IFtcbiAgY3JlYXRlUGFjayh7IGlkOiAna2l0dGVuMScsIHN0YXR1czogJ2tub3duJyB9LCBTdGlja2Vycy5raXR0ZW4xKSxcbiAgY3JlYXRlUGFjayh7IGlkOiAna2l0dGVuMicsIHN0YXR1czogJ2tub3duJyB9LCBTdGlja2Vycy5raXR0ZW4yKSxcbl07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtPLE1BQU0sYUFBYSx3QkFDeEIsT0FDQSxZQUNxQjtBQUFBLEVBQ3JCLElBQUk7QUFBQSxFQUNKLE9BQU8sTUFBTSxLQUFLLEdBQUcsTUFBTSxhQUFhO0FBQUEsRUFDeEMsS0FBSztBQUFBLEVBQ0wsUUFBUTtBQUFBLEVBQ1IsV0FBVztBQUFBLEVBQ1gsVUFBVTtBQUFBLEVBQ1YsUUFBUTtBQUFBLEVBQ1IsT0FBTztBQUFBLEVBQ1AsY0FBYztBQUFBLEVBQ2QsVUFBVSxVQUNOLE1BQU0sR0FBRyxFQUNOLEtBQUssQ0FBQyxFQUNOLElBQUksQ0FBQyxHQUFHLE9BQVEsTUFBSyxTQUFTLEdBQUcsRUFBRSxJQUN0QyxDQUFDO0FBQUEsS0FDRjtBQUNMLElBbkIwQjtBQXFCbkIsTUFBTSxXQUF3QztBQUFBLEVBQ25ELFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLEtBQUs7QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixLQUFLO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixPQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVBLEtBQUs7QUFBQSxJQUNILElBQUk7QUFBQSxJQUNKLEtBQUs7QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFFQSxNQUFNO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixLQUFLO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixPQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsTUFBTTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLEVBQ1Q7QUFDRjtBQUVPLE1BQU0sZ0JBQWdCO0FBQUEsRUFDM0IsV0FBVyxFQUFFLElBQUksT0FBTyxRQUFRLGFBQWEsR0FBRyxTQUFTLEdBQUc7QUFBQSxFQUM1RCxXQUFXLEVBQUUsSUFBSSxXQUFXLFFBQVEsYUFBYSxHQUFHLFNBQVMsT0FBTztBQUN0RTtBQUVPLE1BQU0saUJBQWlCO0FBQUEsRUFDNUIsV0FBVyxFQUFFLElBQUksV0FBVyxRQUFRLFlBQVksR0FBRyxTQUFTLE9BQU87QUFBQSxFQUNuRSxXQUFXLEVBQUUsSUFBSSxXQUFXLFFBQVEsWUFBWSxHQUFHLFNBQVMsT0FBTztBQUFBLEVBQ25FLFdBQVcsRUFBRSxJQUFJLFdBQVcsUUFBUSxZQUFZLEdBQUcsU0FBUyxPQUFPO0FBQ3JFO0FBRU8sTUFBTSxlQUFlO0FBQUEsRUFDMUIsV0FDRSxFQUFFLElBQUksUUFBUSxRQUFRLGNBQWMsV0FBVyxLQUFLLEdBQ3BELFNBQVMsSUFDWDtBQUFBLEVBQ0EsV0FDRSxFQUFFLElBQUksUUFBUSxRQUFRLGNBQWMsV0FBVyxLQUFLLEdBQ3BELFNBQVMsSUFDWDtBQUNGO0FBRU8sTUFBTSxhQUFhO0FBQUEsRUFDeEIsV0FBVyxFQUFFLElBQUksV0FBVyxRQUFRLFFBQVEsR0FBRyxTQUFTLE9BQU87QUFBQSxFQUMvRCxXQUFXLEVBQUUsSUFBSSxXQUFXLFFBQVEsUUFBUSxHQUFHLFNBQVMsT0FBTztBQUNqRTsiLAogICJuYW1lcyI6IFtdCn0K
