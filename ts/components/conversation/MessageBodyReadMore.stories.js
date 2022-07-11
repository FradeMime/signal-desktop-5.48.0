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
var MessageBodyReadMore_stories_exports = {};
__export(MessageBodyReadMore_stories_exports, {
  ExcessiveAmountsOfCake: () => ExcessiveAmountsOfCake,
  LeafyNotBuffered: () => LeafyNotBuffered,
  Links: () => Links,
  LongText: () => LongText,
  LongText100More: () => LongText100More,
  LotsOfCakeWithSomeCherriesOnTop: () => LotsOfCakeWithSomeCherriesOnTop,
  default: () => MessageBodyReadMore_stories_default
});
module.exports = __toCommonJS(MessageBodyReadMore_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_MessageBodyReadMore = require("./MessageBodyReadMore");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var MessageBodyReadMore_stories_default = {
  title: "Components/Conversation/MessageBodyReadMore"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  bodyRanges: overrideProps.bodyRanges,
  direction: "incoming",
  displayLimit: overrideProps.displayLimit,
  i18n,
  id: "some-id",
  messageExpanded: (0, import_addon_actions.action)("messageExpanded"),
  text: (0, import_addon_knobs.text)("text", overrideProps.text || "")
}), "createProps");
function MessageBodyReadMoreTest({
  text: messageBodyText
}) {
  const [displayLimit, setDisplayLimit] = (0, import_react.useState)();
  return /* @__PURE__ */ import_react.default.createElement(import_MessageBodyReadMore.MessageBodyReadMore, {
    ...createProps({ text: messageBodyText }),
    displayLimit,
    messageExpanded: (_, newDisplayLimit) => setDisplayLimit(newDisplayLimit)
  });
}
const LongText100More = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(MessageBodyReadMoreTest, {
  text: `${"test ".repeat(160)}${"extra ".repeat(10)}`
}), "LongText100More");
LongText100More.story = {
  name: "Long text + 100 more"
};
const LotsOfCakeWithSomeCherriesOnTop = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(MessageBodyReadMoreTest, {
  text: `x${"\u{1F370}".repeat(399)}${"\u{1F352}".repeat(100)}`
}), "LotsOfCakeWithSomeCherriesOnTop");
LotsOfCakeWithSomeCherriesOnTop.story = {
  name: "Lots of cake with some cherries on top"
};
const LeafyNotBuffered = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(MessageBodyReadMoreTest, {
  text: `x${"\u{1F33F}".repeat(450)}`
}), "LeafyNotBuffered");
LeafyNotBuffered.story = {
  name: "Leafy not buffered"
};
const Links = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(MessageBodyReadMoreTest, {
  text: `${"test ".repeat(176)}https://www.signal.org`
}), "Links");
const ExcessiveAmountsOfCake = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(MessageBodyReadMoreTest, {
  text: `x${"\u{1F370}".repeat(2e4)}`
}), "ExcessiveAmountsOfCake");
ExcessiveAmountsOfCake.story = {
  name: "Excessive amounts of cake"
};
const LongText = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(MessageBodyReadMoreTest, {
  text: `
      SCENE I. Rome. A street.
      Enter FLAVIUS, MARULLUS, and certain Commoners
      FLAVIUS
      Hence! home, you idle creatures get you home:
      Is this a holiday? what! know you not,
      Being mechanical, you ought not walk
      Upon a labouring day without the sign
      Of your profession? Speak, what trade art thou?
      First Commoner
      Why, sir, a carpenter.
      MARULLUS
      Where is thy leather apron and thy rule?
      What dost thou with thy best apparel on?
      You, sir, what trade are you?
      Second Commoner
      Truly, sir, in respect of a fine workman, I am but,
      as you would say, a cobbler.
      MARULLUS
      But what trade art thou? answer me directly.
      Second Commoner
      A trade, sir, that, I hope, I may use with a safe
      conscience; which is, indeed, sir, a mender of bad soles.
      MARULLUS
      What trade, thou knave? thou naughty knave, what trade?
      Second Commoner
      Nay, I beseech you, sir, be not out with me: yet,
      if you be out, sir, I can mend you.
      MARULLUS
      What meanest thou by that? mend me, thou saucy fellow!
      Second Commoner
      Why, sir, cobble you.
      FLAVIUS
      Thou art a cobbler, art thou?
      Second Commoner
      Truly, sir, all that I live by is with the awl: I
      meddle with no tradesman's matters, nor women's
      matters, but with awl. I am, indeed, sir, a surgeon
      to old shoes; when they are in great danger, I
      recover them. As proper men as ever trod upon
      neat's leather have gone upon my handiwork.
      FLAVIUS
      But wherefore art not in thy shop today?
      Why dost thou lead these men about the streets?
      Second Commoner
      Truly, sir, to wear out their shoes, to get myself
      into more work. But, indeed, sir, we make holiday,
      to see Caesar and to rejoice in his triumph.
      MARULLUS
      Wherefore rejoice? What conquest brings he home?
      What tributaries follow him to Rome,
      To grace in captive bonds his chariot-wheels?
      You blocks, you stones, you worse than senseless things!
      O you hard hearts, you cruel men of Rome,
      Knew you not Pompey? Many a time and oft
      Have you climb'd up to walls and battlements,
      To towers and windows, yea, to chimney-tops,
      Your infants in your arms, and there have sat
      The livelong day, with patient expectation,
      To see great Pompey pass the streets of Rome:
      And when you saw his chariot but appear,
      Have you not made an universal shout,
      That Tiber trembled underneath her banks,
      To hear the replication of your sounds
      Made in her concave shores?
      And do you now put on your best attire?
      And do you now cull out a holiday?
      And do you now strew flowers in his way
      That comes in triumph over Pompey's blood? Be gone!
      Run to your houses, fall upon your knees,
      Pray to the gods to intermit the plague
      That needs must light on this ingratitude.
      FLAVIUS
      Go, go, good countrymen, and, for this fault,
      Assemble all the poor men of your sort;
      Draw them to Tiber banks, and weep your tears
      Into the channel, till the lowest stream
      Do kiss the most exalted shores of all.
      Exeunt all the Commoners
      See whether their basest metal be not moved;
      They vanish tongue-tied in their guiltiness.
      Go you down that way towards the Capitol;
      This way will I
      disrobe the images,
      If you do find them deck'd with ceremonies.
      MARULLUS
      May we do so?
      You know it is the feast of Lupercal.
      FLAVIUS
      It is no matter; let no images
      Be hung with Caesar's trophies. I'll about,
      And drive away the vulgar from the streets:
      So do you too, where you perceive them thick.
      These growing feathers pluck'd from Caesar's wing
      Will make him fly an ordinary pitch,
      Who else would soar above the view of men
      And keep us all in servile fearfulness.
      `
}), "LongText");
LongText.story = {
  name: "Long text"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExcessiveAmountsOfCake,
  LeafyNotBuffered,
  Links,
  LongText,
  LongText100More,
  LotsOfCakeWithSomeCherriesOnTop
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZUJvZHlSZWFkTW9yZS5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcbmltcG9ydCB7IHRleHQgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vTWVzc2FnZUJvZHlSZWFkTW9yZSc7XG5pbXBvcnQgeyBNZXNzYWdlQm9keVJlYWRNb3JlIH0gZnJvbSAnLi9NZXNzYWdlQm9keVJlYWRNb3JlJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vTWVzc2FnZUJvZHlSZWFkTW9yZScsXG59O1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzPiA9IHt9KTogUHJvcHMgPT4gKHtcbiAgYm9keVJhbmdlczogb3ZlcnJpZGVQcm9wcy5ib2R5UmFuZ2VzLFxuICBkaXJlY3Rpb246ICdpbmNvbWluZycsXG4gIGRpc3BsYXlMaW1pdDogb3ZlcnJpZGVQcm9wcy5kaXNwbGF5TGltaXQsXG4gIGkxOG4sXG4gIGlkOiAnc29tZS1pZCcsXG4gIG1lc3NhZ2VFeHBhbmRlZDogYWN0aW9uKCdtZXNzYWdlRXhwYW5kZWQnKSxcbiAgdGV4dDogdGV4dCgndGV4dCcsIG92ZXJyaWRlUHJvcHMudGV4dCB8fCAnJyksXG59KTtcblxuZnVuY3Rpb24gTWVzc2FnZUJvZHlSZWFkTW9yZVRlc3Qoe1xuICB0ZXh0OiBtZXNzYWdlQm9keVRleHQsXG59OiB7XG4gIHRleHQ6IHN0cmluZztcbn0pOiBKU1guRWxlbWVudCB7XG4gIGNvbnN0IFtkaXNwbGF5TGltaXQsIHNldERpc3BsYXlMaW1pdF0gPSB1c2VTdGF0ZTxudW1iZXIgfCB1bmRlZmluZWQ+KCk7XG5cbiAgcmV0dXJuIChcbiAgICA8TWVzc2FnZUJvZHlSZWFkTW9yZVxuICAgICAgey4uLmNyZWF0ZVByb3BzKHsgdGV4dDogbWVzc2FnZUJvZHlUZXh0IH0pfVxuICAgICAgZGlzcGxheUxpbWl0PXtkaXNwbGF5TGltaXR9XG4gICAgICBtZXNzYWdlRXhwYW5kZWQ9eyhfLCBuZXdEaXNwbGF5TGltaXQpID0+IHNldERpc3BsYXlMaW1pdChuZXdEaXNwbGF5TGltaXQpfVxuICAgIC8+XG4gICk7XG59XG5cbmV4cG9ydCBjb25zdCBMb25nVGV4dDEwME1vcmUgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TWVzc2FnZUJvZHlSZWFkTW9yZVRlc3RcbiAgICB0ZXh0PXtgJHsndGVzdCAnLnJlcGVhdCgxNjApfSR7J2V4dHJhICcucmVwZWF0KDEwKX1gfVxuICAvPlxuKTtcblxuTG9uZ1RleHQxMDBNb3JlLnN0b3J5ID0ge1xuICBuYW1lOiAnTG9uZyB0ZXh0ICsgMTAwIG1vcmUnLFxufTtcblxuZXhwb3J0IGNvbnN0IExvdHNPZkNha2VXaXRoU29tZUNoZXJyaWVzT25Ub3AgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TWVzc2FnZUJvZHlSZWFkTW9yZVRlc3QgdGV4dD17YHgkeydcdUQ4M0NcdURGNzAnLnJlcGVhdCgzOTkpfSR7J1x1RDgzQ1x1REY1MicucmVwZWF0KDEwMCl9YH0gLz5cbik7XG5cbkxvdHNPZkNha2VXaXRoU29tZUNoZXJyaWVzT25Ub3Auc3RvcnkgPSB7XG4gIG5hbWU6ICdMb3RzIG9mIGNha2Ugd2l0aCBzb21lIGNoZXJyaWVzIG9uIHRvcCcsXG59O1xuXG5leHBvcnQgY29uc3QgTGVhZnlOb3RCdWZmZXJlZCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxNZXNzYWdlQm9keVJlYWRNb3JlVGVzdCB0ZXh0PXtgeCR7J1x1RDgzQ1x1REYzRicucmVwZWF0KDQ1MCl9YH0gLz5cbik7XG5cbkxlYWZ5Tm90QnVmZmVyZWQuc3RvcnkgPSB7XG4gIG5hbWU6ICdMZWFmeSBub3QgYnVmZmVyZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IExpbmtzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPE1lc3NhZ2VCb2R5UmVhZE1vcmVUZXN0XG4gICAgdGV4dD17YCR7J3Rlc3QgJy5yZXBlYXQoMTc2KX1odHRwczovL3d3dy5zaWduYWwub3JnYH1cbiAgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBFeGNlc3NpdmVBbW91bnRzT2ZDYWtlID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPE1lc3NhZ2VCb2R5UmVhZE1vcmVUZXN0IHRleHQ9e2B4JHsnXHVEODNDXHVERjcwJy5yZXBlYXQoMjAwMDApfWB9IC8+XG4pO1xuXG5FeGNlc3NpdmVBbW91bnRzT2ZDYWtlLnN0b3J5ID0ge1xuICBuYW1lOiAnRXhjZXNzaXZlIGFtb3VudHMgb2YgY2FrZScsXG59O1xuXG5leHBvcnQgY29uc3QgTG9uZ1RleHQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TWVzc2FnZUJvZHlSZWFkTW9yZVRlc3RcbiAgICB0ZXh0PXtgXG4gICAgICBTQ0VORSBJLiBSb21lLiBBIHN0cmVldC5cbiAgICAgIEVudGVyIEZMQVZJVVMsIE1BUlVMTFVTLCBhbmQgY2VydGFpbiBDb21tb25lcnNcbiAgICAgIEZMQVZJVVNcbiAgICAgIEhlbmNlISBob21lLCB5b3UgaWRsZSBjcmVhdHVyZXMgZ2V0IHlvdSBob21lOlxuICAgICAgSXMgdGhpcyBhIGhvbGlkYXk/IHdoYXQhIGtub3cgeW91IG5vdCxcbiAgICAgIEJlaW5nIG1lY2hhbmljYWwsIHlvdSBvdWdodCBub3Qgd2Fsa1xuICAgICAgVXBvbiBhIGxhYm91cmluZyBkYXkgd2l0aG91dCB0aGUgc2lnblxuICAgICAgT2YgeW91ciBwcm9mZXNzaW9uPyBTcGVhaywgd2hhdCB0cmFkZSBhcnQgdGhvdT9cbiAgICAgIEZpcnN0IENvbW1vbmVyXG4gICAgICBXaHksIHNpciwgYSBjYXJwZW50ZXIuXG4gICAgICBNQVJVTExVU1xuICAgICAgV2hlcmUgaXMgdGh5IGxlYXRoZXIgYXByb24gYW5kIHRoeSBydWxlP1xuICAgICAgV2hhdCBkb3N0IHRob3Ugd2l0aCB0aHkgYmVzdCBhcHBhcmVsIG9uP1xuICAgICAgWW91LCBzaXIsIHdoYXQgdHJhZGUgYXJlIHlvdT9cbiAgICAgIFNlY29uZCBDb21tb25lclxuICAgICAgVHJ1bHksIHNpciwgaW4gcmVzcGVjdCBvZiBhIGZpbmUgd29ya21hbiwgSSBhbSBidXQsXG4gICAgICBhcyB5b3Ugd291bGQgc2F5LCBhIGNvYmJsZXIuXG4gICAgICBNQVJVTExVU1xuICAgICAgQnV0IHdoYXQgdHJhZGUgYXJ0IHRob3U/IGFuc3dlciBtZSBkaXJlY3RseS5cbiAgICAgIFNlY29uZCBDb21tb25lclxuICAgICAgQSB0cmFkZSwgc2lyLCB0aGF0LCBJIGhvcGUsIEkgbWF5IHVzZSB3aXRoIGEgc2FmZVxuICAgICAgY29uc2NpZW5jZTsgd2hpY2ggaXMsIGluZGVlZCwgc2lyLCBhIG1lbmRlciBvZiBiYWQgc29sZXMuXG4gICAgICBNQVJVTExVU1xuICAgICAgV2hhdCB0cmFkZSwgdGhvdSBrbmF2ZT8gdGhvdSBuYXVnaHR5IGtuYXZlLCB3aGF0IHRyYWRlP1xuICAgICAgU2Vjb25kIENvbW1vbmVyXG4gICAgICBOYXksIEkgYmVzZWVjaCB5b3UsIHNpciwgYmUgbm90IG91dCB3aXRoIG1lOiB5ZXQsXG4gICAgICBpZiB5b3UgYmUgb3V0LCBzaXIsIEkgY2FuIG1lbmQgeW91LlxuICAgICAgTUFSVUxMVVNcbiAgICAgIFdoYXQgbWVhbmVzdCB0aG91IGJ5IHRoYXQ/IG1lbmQgbWUsIHRob3Ugc2F1Y3kgZmVsbG93IVxuICAgICAgU2Vjb25kIENvbW1vbmVyXG4gICAgICBXaHksIHNpciwgY29iYmxlIHlvdS5cbiAgICAgIEZMQVZJVVNcbiAgICAgIFRob3UgYXJ0IGEgY29iYmxlciwgYXJ0IHRob3U/XG4gICAgICBTZWNvbmQgQ29tbW9uZXJcbiAgICAgIFRydWx5LCBzaXIsIGFsbCB0aGF0IEkgbGl2ZSBieSBpcyB3aXRoIHRoZSBhd2w6IElcbiAgICAgIG1lZGRsZSB3aXRoIG5vIHRyYWRlc21hbidzIG1hdHRlcnMsIG5vciB3b21lbidzXG4gICAgICBtYXR0ZXJzLCBidXQgd2l0aCBhd2wuIEkgYW0sIGluZGVlZCwgc2lyLCBhIHN1cmdlb25cbiAgICAgIHRvIG9sZCBzaG9lczsgd2hlbiB0aGV5IGFyZSBpbiBncmVhdCBkYW5nZXIsIElcbiAgICAgIHJlY292ZXIgdGhlbS4gQXMgcHJvcGVyIG1lbiBhcyBldmVyIHRyb2QgdXBvblxuICAgICAgbmVhdCdzIGxlYXRoZXIgaGF2ZSBnb25lIHVwb24gbXkgaGFuZGl3b3JrLlxuICAgICAgRkxBVklVU1xuICAgICAgQnV0IHdoZXJlZm9yZSBhcnQgbm90IGluIHRoeSBzaG9wIHRvZGF5P1xuICAgICAgV2h5IGRvc3QgdGhvdSBsZWFkIHRoZXNlIG1lbiBhYm91dCB0aGUgc3RyZWV0cz9cbiAgICAgIFNlY29uZCBDb21tb25lclxuICAgICAgVHJ1bHksIHNpciwgdG8gd2VhciBvdXQgdGhlaXIgc2hvZXMsIHRvIGdldCBteXNlbGZcbiAgICAgIGludG8gbW9yZSB3b3JrLiBCdXQsIGluZGVlZCwgc2lyLCB3ZSBtYWtlIGhvbGlkYXksXG4gICAgICB0byBzZWUgQ2Flc2FyIGFuZCB0byByZWpvaWNlIGluIGhpcyB0cml1bXBoLlxuICAgICAgTUFSVUxMVVNcbiAgICAgIFdoZXJlZm9yZSByZWpvaWNlPyBXaGF0IGNvbnF1ZXN0IGJyaW5ncyBoZSBob21lP1xuICAgICAgV2hhdCB0cmlidXRhcmllcyBmb2xsb3cgaGltIHRvIFJvbWUsXG4gICAgICBUbyBncmFjZSBpbiBjYXB0aXZlIGJvbmRzIGhpcyBjaGFyaW90LXdoZWVscz9cbiAgICAgIFlvdSBibG9ja3MsIHlvdSBzdG9uZXMsIHlvdSB3b3JzZSB0aGFuIHNlbnNlbGVzcyB0aGluZ3MhXG4gICAgICBPIHlvdSBoYXJkIGhlYXJ0cywgeW91IGNydWVsIG1lbiBvZiBSb21lLFxuICAgICAgS25ldyB5b3Ugbm90IFBvbXBleT8gTWFueSBhIHRpbWUgYW5kIG9mdFxuICAgICAgSGF2ZSB5b3UgY2xpbWInZCB1cCB0byB3YWxscyBhbmQgYmF0dGxlbWVudHMsXG4gICAgICBUbyB0b3dlcnMgYW5kIHdpbmRvd3MsIHllYSwgdG8gY2hpbW5leS10b3BzLFxuICAgICAgWW91ciBpbmZhbnRzIGluIHlvdXIgYXJtcywgYW5kIHRoZXJlIGhhdmUgc2F0XG4gICAgICBUaGUgbGl2ZWxvbmcgZGF5LCB3aXRoIHBhdGllbnQgZXhwZWN0YXRpb24sXG4gICAgICBUbyBzZWUgZ3JlYXQgUG9tcGV5IHBhc3MgdGhlIHN0cmVldHMgb2YgUm9tZTpcbiAgICAgIEFuZCB3aGVuIHlvdSBzYXcgaGlzIGNoYXJpb3QgYnV0IGFwcGVhcixcbiAgICAgIEhhdmUgeW91IG5vdCBtYWRlIGFuIHVuaXZlcnNhbCBzaG91dCxcbiAgICAgIFRoYXQgVGliZXIgdHJlbWJsZWQgdW5kZXJuZWF0aCBoZXIgYmFua3MsXG4gICAgICBUbyBoZWFyIHRoZSByZXBsaWNhdGlvbiBvZiB5b3VyIHNvdW5kc1xuICAgICAgTWFkZSBpbiBoZXIgY29uY2F2ZSBzaG9yZXM/XG4gICAgICBBbmQgZG8geW91IG5vdyBwdXQgb24geW91ciBiZXN0IGF0dGlyZT9cbiAgICAgIEFuZCBkbyB5b3Ugbm93IGN1bGwgb3V0IGEgaG9saWRheT9cbiAgICAgIEFuZCBkbyB5b3Ugbm93IHN0cmV3IGZsb3dlcnMgaW4gaGlzIHdheVxuICAgICAgVGhhdCBjb21lcyBpbiB0cml1bXBoIG92ZXIgUG9tcGV5J3MgYmxvb2Q/IEJlIGdvbmUhXG4gICAgICBSdW4gdG8geW91ciBob3VzZXMsIGZhbGwgdXBvbiB5b3VyIGtuZWVzLFxuICAgICAgUHJheSB0byB0aGUgZ29kcyB0byBpbnRlcm1pdCB0aGUgcGxhZ3VlXG4gICAgICBUaGF0IG5lZWRzIG11c3QgbGlnaHQgb24gdGhpcyBpbmdyYXRpdHVkZS5cbiAgICAgIEZMQVZJVVNcbiAgICAgIEdvLCBnbywgZ29vZCBjb3VudHJ5bWVuLCBhbmQsIGZvciB0aGlzIGZhdWx0LFxuICAgICAgQXNzZW1ibGUgYWxsIHRoZSBwb29yIG1lbiBvZiB5b3VyIHNvcnQ7XG4gICAgICBEcmF3IHRoZW0gdG8gVGliZXIgYmFua3MsIGFuZCB3ZWVwIHlvdXIgdGVhcnNcbiAgICAgIEludG8gdGhlIGNoYW5uZWwsIHRpbGwgdGhlIGxvd2VzdCBzdHJlYW1cbiAgICAgIERvIGtpc3MgdGhlIG1vc3QgZXhhbHRlZCBzaG9yZXMgb2YgYWxsLlxuICAgICAgRXhldW50IGFsbCB0aGUgQ29tbW9uZXJzXG4gICAgICBTZWUgd2hldGhlciB0aGVpciBiYXNlc3QgbWV0YWwgYmUgbm90IG1vdmVkO1xuICAgICAgVGhleSB2YW5pc2ggdG9uZ3VlLXRpZWQgaW4gdGhlaXIgZ3VpbHRpbmVzcy5cbiAgICAgIEdvIHlvdSBkb3duIHRoYXQgd2F5IHRvd2FyZHMgdGhlIENhcGl0b2w7XG4gICAgICBUaGlzIHdheSB3aWxsIElcbiAgICAgIGRpc3JvYmUgdGhlIGltYWdlcyxcbiAgICAgIElmIHlvdSBkbyBmaW5kIHRoZW0gZGVjaydkIHdpdGggY2VyZW1vbmllcy5cbiAgICAgIE1BUlVMTFVTXG4gICAgICBNYXkgd2UgZG8gc28/XG4gICAgICBZb3Uga25vdyBpdCBpcyB0aGUgZmVhc3Qgb2YgTHVwZXJjYWwuXG4gICAgICBGTEFWSVVTXG4gICAgICBJdCBpcyBubyBtYXR0ZXI7IGxldCBubyBpbWFnZXNcbiAgICAgIEJlIGh1bmcgd2l0aCBDYWVzYXIncyB0cm9waGllcy4gSSdsbCBhYm91dCxcbiAgICAgIEFuZCBkcml2ZSBhd2F5IHRoZSB2dWxnYXIgZnJvbSB0aGUgc3RyZWV0czpcbiAgICAgIFNvIGRvIHlvdSB0b28sIHdoZXJlIHlvdSBwZXJjZWl2ZSB0aGVtIHRoaWNrLlxuICAgICAgVGhlc2UgZ3Jvd2luZyBmZWF0aGVycyBwbHVjaydkIGZyb20gQ2Flc2FyJ3Mgd2luZ1xuICAgICAgV2lsbCBtYWtlIGhpbSBmbHkgYW4gb3JkaW5hcnkgcGl0Y2gsXG4gICAgICBXaG8gZWxzZSB3b3VsZCBzb2FyIGFib3ZlIHRoZSB2aWV3IG9mIG1lblxuICAgICAgQW5kIGtlZXAgdXMgYWxsIGluIHNlcnZpbGUgZmVhcmZ1bG5lc3MuXG4gICAgICBgfVxuICAvPlxuKTtcblxuTG9uZ1RleHQuc3RvcnkgPSB7XG4gIG5hbWU6ICdMb25nIHRleHQnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBZ0M7QUFFaEMsMkJBQXVCO0FBQ3ZCLHlCQUFxQjtBQUdyQixpQ0FBb0M7QUFDcEMsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLHNDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLGNBQWMsd0JBQUMsZ0JBQWdDLENBQUMsTUFBYztBQUFBLEVBQ2xFLFlBQVksY0FBYztBQUFBLEVBQzFCLFdBQVc7QUFBQSxFQUNYLGNBQWMsY0FBYztBQUFBLEVBQzVCO0FBQUEsRUFDQSxJQUFJO0FBQUEsRUFDSixpQkFBaUIsaUNBQU8saUJBQWlCO0FBQUEsRUFDekMsTUFBTSw2QkFBSyxRQUFRLGNBQWMsUUFBUSxFQUFFO0FBQzdDLElBUm9CO0FBVXBCLGlDQUFpQztBQUFBLEVBQy9CLE1BQU07QUFBQSxHQUdRO0FBQ2QsUUFBTSxDQUFDLGNBQWMsbUJBQW1CLDJCQUE2QjtBQUVyRSxTQUNFLG1EQUFDO0FBQUEsT0FDSyxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUFBLElBQ3pDO0FBQUEsSUFDQSxpQkFBaUIsQ0FBQyxHQUFHLG9CQUFvQixnQkFBZ0IsZUFBZTtBQUFBLEdBQzFFO0FBRUo7QUFkUyxBQWdCRixNQUFNLGtCQUFrQiw2QkFDN0IsbURBQUM7QUFBQSxFQUNDLE1BQU0sR0FBRyxRQUFRLE9BQU8sR0FBRyxJQUFJLFNBQVMsT0FBTyxFQUFFO0FBQUEsQ0FDbkQsR0FINkI7QUFNL0IsZ0JBQWdCLFFBQVE7QUFBQSxFQUN0QixNQUFNO0FBQ1I7QUFFTyxNQUFNLGtDQUFrQyw2QkFDN0MsbURBQUM7QUFBQSxFQUF3QixNQUFNLElBQUksWUFBSyxPQUFPLEdBQUcsSUFBSSxZQUFLLE9BQU8sR0FBRztBQUFBLENBQUssR0FEN0I7QUFJL0MsZ0NBQWdDLFFBQVE7QUFBQSxFQUN0QyxNQUFNO0FBQ1I7QUFFTyxNQUFNLG1CQUFtQiw2QkFDOUIsbURBQUM7QUFBQSxFQUF3QixNQUFNLElBQUksWUFBSyxPQUFPLEdBQUc7QUFBQSxDQUFLLEdBRHpCO0FBSWhDLGlCQUFpQixRQUFRO0FBQUEsRUFDdkIsTUFBTTtBQUNSO0FBRU8sTUFBTSxRQUFRLDZCQUNuQixtREFBQztBQUFBLEVBQ0MsTUFBTSxHQUFHLFFBQVEsT0FBTyxHQUFHO0FBQUEsQ0FDN0IsR0FIbUI7QUFNZCxNQUFNLHlCQUF5Qiw2QkFDcEMsbURBQUM7QUFBQSxFQUF3QixNQUFNLElBQUksWUFBSyxPQUFPLEdBQUs7QUFBQSxDQUFLLEdBRHJCO0FBSXRDLHVCQUF1QixRQUFRO0FBQUEsRUFDN0IsTUFBTTtBQUNSO0FBRU8sTUFBTSxXQUFXLDZCQUN0QixtREFBQztBQUFBLEVBQ0MsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FrR1IsR0FwR3NCO0FBdUd4QixTQUFTLFFBQVE7QUFBQSxFQUNmLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
