var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_chai = require("chai");
var Bytes = __toESM(require("../../Bytes"));
var import_sessionTranslation = require("../../util/sessionTranslation");
const getRecordCopy = /* @__PURE__ */ __name((record) => JSON.parse(JSON.stringify(record)), "getRecordCopy");
describe("sessionTranslation", () => {
  let ourData;
  beforeEach(() => {
    ourData = {
      identityKeyPublic: Bytes.fromBase64("Baioqfzc/5JD6b+GNqapPouf6eHK7xr9ynLJHnvl+444"),
      registrationId: 3554
    };
  });
  it("Throws if given an empty object", () => {
    const record = {};
    import_chai.assert.throws(() => (0, import_sessionTranslation.sessionRecordToProtobuf)(record, ourData), "toProtobuf: Record had no sessions!");
  });
  it("Generates expected protobuf with minimal record", () => {
    const record = {
      sessions: {
        "W\x87\xBF\x93\0l\xC8\ny\xAA\xFCmB0j\x84.\xDB\xA3\xB3-s\x81\xC4\x8D(O_M": {
          registrationId: 4243,
          currentRatchet: {
            rootKey: "\xCB5/\xFC\x9C\xDA\x9AgXe\xFB\xFA\x97\0\xFC\xB6\xBBo5\x83\x97\xAD\xA5\xD0\xFF\xAB",
            lastRemoteEphemeralKey: "\n7mT\x85b!\xE8\xCD\x07m4g\xB3\x91\xFC\x9CIY\x8C\xEA\x8D\b\xCF\xCEPs",
            previousCounter: 2,
            ephemeralKeyPair: {
              privKey: '\xE4\x97\xE3\xC5\xAB\xAA\x8A\xE0\xF8\xED)\x88\xE1\xC1"\x8CsJM.\xA8\xA1r\x9D(N\f9\xD4\b',
              pubKey: "+4\x96\xAB1\0l *\xE3K\xE7n\xBA\xD6\xF3\xB3\xEDTS\x9F&\x8C{\xF9 \xCD\x82>1"
            }
          },
          indexInfo: {
            remoteIdentityKey: "\xA8\xA8\xA9\xFC\xCF\xE4\x90\xFAo\xE1\x8D\xA9\xEAO\xA2\xE7\xFAxr\xBB\xC6\xBFr\x9C\xB2G\x9E\xF9i\x81T@",
            closed: -1,
            baseKey: "W\x87\xBF\x93\0l\xC8\ny\xAA\xFCmB0j\x84.\xDB\xA3\xB3-s\x81\xC4\x8D(O_M",
            baseKeyType: 2
          },
          oldRatchetList: [],
          "\n7mT\x85b!\xE8\xCD\x07m4g\xB3\x91\xFC\x9CIY\x8C\xEA\x8D\b\xCF\xCEPs": {
            messageKeys: {
              "0": "\xCEg\xF3\xAF\x912\xE0v\xF1\x91X_\xF5\x96\xC7\0\xF6l4J>\x8C\xD0\xCF{`-\xDC5\xA6",
              "4": 'c\xBF<\xB5\xE2\xBCX\xB5\x83!\xD9\xAF\xB5\xAE[\x97n<\x9E\xEC\xEE\xFAco\xE5\xA9n"l]\xD0'
            },
            chainKey: {
              counter: 5,
              key: "Z{\xF2\xD98\xD8\xB3A\xDDdSZ\x86k\n\xC3\x97\xF4\xA1\x1B[Y\xD2\xC2\xB6\x83a\xB0<"
            },
            chainType: 2
          },
          "+4\x96\xAB1\0l *\xE3K\xE7n\xBA\xD6\xF3\xB3\xEDTS\x9F&\x8C{\xF9 \xCD\x82>1": {
            messageKeys: {},
            chainKey: {
              counter: -1,
              key: "\xE8B?7\xAF\xA8\x07\x8F}:\x93?\x90\xB9$\\\xEB~\xAA\0gM0\xD5\x98'\xA3"
            },
            chainType: 1
          }
        }
      },
      version: "v1"
    };
    const expected = {
      currentSession: {
        sessionVersion: 3,
        localIdentityPublic: "Baioqfzc/5JD6b+GNqapPouf6eHK7xr9ynLJHnvl+444",
        remoteIdentityPublic: "BaioqfzP5JD6b+GNqepPouf6eHK7xr9ynLJHnvlpgVRA",
        rootKey: "ywM1L/yc2ppnA1hl+/oQlwD8Ara7bzUcg5etpQTQ/6s=",
        previousCounter: 3,
        senderChain: {
          senderRatchetKey: "BSsTNJarMQATbCAq40vnbrrW87PtVFOfJox7+SDNgj4x",
          senderRatchetKeyPrivate: "5JfjxauqiuD47SmI4QXBIoxzSk0uqKEScp0oTgw51Ag=",
          chainKey: {
            index: 0,
            key: "6EI/Nw+vHhCoB499OpM/kLkQJFzrfqoAZ00w1ZgnowU="
          }
        },
        receiverChains: [
          {
            senderRatchetKey: "BQo3HG1UhWIh6A7NBxZtNGezBZH8nElZjOqNCBHPzlBz",
            chainKey: {
              index: 6,
              key: "Wnvy2TjYs0HdZFNahmsKw5cc9KEbW1nSwraDFmGwBDw="
            },
            messageKeys: [
              {
                index: 1,
                cipherKey: "xVreEbT7Vtrxs85JyGBj6Y+UWftQz4H72F5kWV4cxqM=",
                iv: "TcRanSxZVWbuIq0xDRGnEw==",
                macKey: "5fW9aIKXhtwWp/5alNJUIXInZbztf2ywzQSpYrXoQ3A="
              },
              {
                index: 5,
                cipherKey: "A99HjM4pUugsQ5+2v48FGTGEhZPoW6wzW9MqSc11QQ4=",
                iv: "bE8Ei2Rkaoz4SKRwdG4+tQ==",
                macKey: "TOTdbAf0bCHOzcQ3lBaIm3yqmpEqvvldD0qTuDFmkAI="
              }
            ]
          }
        ],
        remoteRegistrationId: 4243,
        localRegistrationId: 3554,
        aliceBaseKey: "BVeHv5MAbMgKeaoO/G1CMBdqhC7bo7Mtc4EWxI0oT19N"
      }
    };
    const recordCopy = getRecordCopy(record);
    const actual = (0, import_sessionTranslation.sessionRecordToProtobuf)(record, ourData);
    import_chai.assert.deepEqual(expected, actual.toJSON());
    import_chai.assert.deepEqual(record, recordCopy);
  });
  it("Generates expected protobuf with many old receiver chains", () => {
    const record = {
      sessions: {
        "W\x87\xBF\x93\0l\xC8\ny\xAA\xFCmB0j\x84.\xDB\xA3\xB3-s\x81\xC4\x8D(O_M": {
          registrationId: 4243,
          currentRatchet: {
            rootKey: "\xCB5/\xFC\x9C\xDA\x9AgXe\xFB\xFA\x97\0\xFC\xB6\xBBo5\x83\x97\xAD\xA5\xD0\xFF\xAB",
            lastRemoteEphemeralKey: "\n7mT\x85b!\xE8\xCD\x07m4g\xB3\x91\xFC\x9CIY\x8C\xEA\x8D\b\xCF\xCEPs",
            previousCounter: 2,
            ephemeralKeyPair: {
              privKey: '\xE4\x97\xE3\xC5\xAB\xAA\x8A\xE0\xF8\xED)\x88\xE1\xC1"\x8CsJM.\xA8\xA1r\x9D(N\f9\xD4\b',
              pubKey: "+4\x96\xAB1\0l *\xE3K\xE7n\xBA\xD6\xF3\xB3\xEDTS\x9F&\x8C{\xF9 \xCD\x82>1"
            }
          },
          indexInfo: {
            remoteIdentityKey: "\xA8\xA8\xA9\xFC\xCF\xE4\x90\xFAo\xE1\x8D\xA9\xEAO\xA2\xE7\xFAxr\xBB\xC6\xBFr\x9C\xB2G\x9E\xF9i\x81T@",
            closed: -1,
            baseKey: "W\x87\xBF\x93\0l\xC8\ny\xAA\xFCmB0j\x84.\xDB\xA3\xB3-s\x81\xC4\x8D(O_M",
            baseKeyType: 2
          },
          oldRatchetList: [
            {
              added: 1605579954962,
              ephemeralKey: "0\xBB\xAD\n\xA8\xCAA\x91\xE4\xA2\xC7\xB4d9}%\xEE}\xCE\xA9Tc}8\x80\xBCn\\"
            },
            {
              added: 1605580408250,
              ephemeralKey: "^\xC4\n\xF2\x9B\xC0\xA2\0\xADA\\6+\xD3\xF7&\xD7$\xB8\xAC\xD1\xD4|<qS\xD6\xD9h"
            },
            {
              added: 1605581155167,
              ephemeralKey: "<\xE5)\x9CQ\xE0F\xEEl29\x9D\xD8\x83\x97 \xDD$\xB7;\x84ud\xDFI\x8F|f"
            },
            {
              added: 1605638524556,
              ephemeralKey: "\xAFj\xF5\xB1\xE30w\xDBP\xD0\xC2S\xCF\xB4;\xB7&\xC2%\xBA\xAF\xB0\x93\x7F\xDD\xD9\xFE\xEA\xF98F"
            },
            {
              added: 1606761719753,
              ephemeralKey: "\x9B\xCE(\xF0>\x91x\x82\x83\xC4\xC8?\xFEv~\xEDkx \xE2\xAC.\xF0o\x99\xF2Dg\xDF.\r"
            },
            {
              added: 1606766530935,
              ephemeralKey: "@\x9E\xBDM\x86,\xE0\b\xF3\xF3\x99\x85}\xA8`i\xBF\0\xA9I\xF4G\x94:\xD9{\xF3 "
            },
            {
              added: 1608326293655,
              ephemeralKey: "\xB5\xD2?\xC8\xA2+\xD1R\xF7\xE7?3\x9AD\xBA\x83\\@0\x8B\x86\xAE+-\x7F\b\x8E\x8Fr	"
            },
            {
              added: 1609871105317,
              ephemeralKey: '\x84\xB1@\xEDN"\xCDHS{$\x8F\xEF\x94[\xD1\\*;>P\0HNa\xF9)'
            },
            {
              added: 1611707063523,
              ephemeralKey: "\xDEg\x94\xC5k\xE9\x83\x97\xA1\xFF\xFBNX\xC8(9\xA4\x92w\x98\xAE/\xD8\xB9Ri\x8BJI"
            },
            {
              added: 1612211156372,
              ephemeralKey: ":[\xDBO\x88\x96pd\xAF \xC2\xD9\xE7O\xDE\x87w{}\xFD\bw\x969\xC0\xDF\x9D=\x93Z"
            }
          ],
          "0\xBB\xAD\n\xA8\xCAA\x91\xE4\xA2\xC7\xB4d9}%\xEE}\xCE\xA9Tc}8\x80\xBCn\\": {
            messageKeys: {},
            chainKey: {
              counter: 0
            },
            chainType: 2
          },
          "^\xC4\n\xF2\x9B\xC0\xA2\0\xADA\\6+\xD3\xF7&\xD7$\xB8\xAC\xD1\xD4|<qS\xD6\xD9h": {
            messageKeys: {},
            chainKey: {
              counter: 2
            },
            chainType: 2
          },
          "<\xE5)\x9CQ\xE0F\xEEl29\x9D\xD8\x83\x97 \xDD$\xB7;\x84ud\xDFI\x8F|f": {
            messageKeys: {},
            chainKey: {
              counter: 1
            },
            chainType: 2
          },
          "\xAFj\xF5\xB1\xE30w\xDBP\xD0\xC2S\xCF\xB4;\xB7&\xC2%\xBA\xAF\xB0\x93\x7F\xDD\xD9\xFE\xEA\xF98F": {
            messageKeys: {
              "0": "A/{\xB4{\xD7f(\xE8a\xF8y\\D\xBE\0\xC3H\xC0\xC1\xE2\xF4$\xE3\x9F3\x92\xC4\xF6\xB0\xD9",
              "1": "\xCC\x82\xB6\x8CFT}dw8\xC6\xFD\xAA7\xBB\xDA\xD3*'\xD4\x9A\xBB7\x8A\xA3\xF1D\xE1\x82",
              "2": "\xCE\xEF\xA8\xC1\xD5\xCEk\xFD\xE8\xC8\x88\xF7,\xBC\xEE\x90\xFB5%\xD3U\x9C\xA46_\xF5\xA2\xE4]"
            },
            chainKey: {
              counter: 3
            },
            chainType: 2
          },
          "\x9B\xCE(\xF0>\x91x\x82\x83\xC4\xC8?\xFEv~\xEDkx \xE2\xAC.\xF0o\x99\xF2Dg\xDF.\r": {
            messageKeys: {
              "4": "\xA9}j\x9B\xBF\x8A\xBCq	\x8A\xA5\x94\x8D\xC1\x94\xF1: \xF7\xDEr\x83\xF1\xFB\xD4\xB5\x9D%\xC6"
            },
            chainKey: {
              counter: 6
            },
            chainType: 2
          },
          "@\x9E\xBDM\x86,\xE0\b\xF3\xF3\x99\x85}\xA8`i\xBF\0\xA9I\xF4G\x94:\xD9{\xF3 ": {
            messageKeys: {},
            chainKey: {
              counter: 0
            },
            chainType: 2
          },
          "\xB5\xD2?\xC8\xA2+\xD1R\xF7\xE7?3\x9AD\xBA\x83\\@0\x8B\x86\xAE+-\x7F\b\x8E\x8Fr	": {
            messageKeys: {},
            chainKey: {
              counter: 2
            },
            chainType: 2
          },
          '\x84\xB1@\xEDN"\xCDHS{$\x8F\xEF\x94[\xD1\\*;>P\0HNa\xF9)': {
            messageKeys: {
              "0": "1k\xCF\xED+\xAB<\xBA\x82\b'V\xCC!\xD7\xBC\xABP\xC3[\xFC\xE1y;l\x81'\x83\x80\x80\x8E",
              "2": "\xF67%L-\x85Wm)\x86\x9B\xA3\xE4\xE4\xEDN\xF4.\xD48\x85\xC3\xC94r\x9D\xB4\xF3^2",
              "3": "\xA8\xBF\xA6\x9B7T]\x93\xE04:x\xBFY\xC9\xC0\x1B\xE2jr\xB8\xBB\xA4\xA2\x7F0,*",
              "5": "\x99\xA5\xB7q\x93\x7Fg\xF34\xFE\xAE\x88U4F\x7Fl\xA9\b\x8C\xE4\xF4\x85\xBB\xCA\xC7\xC6\x8E["
            },
            chainKey: {
              counter: 5
            },
            chainType: 2
          },
          "\xDEg\x94\xC5k\xE9\x83\x97\xA1\xFF\xFBNX\xC8(9\xA4\x92w\x98\xAE/\xD8\xB9Ri\x8BJI": {
            messageKeys: {
              "0": "]'8\x8EW\xC4\x07\x85n\x98\xBA\xAD\xD6{\xFF7]\xF4\xE4\xC4!\xE9\vtA@\xB0b\xA2)r",
              "2": "\xAD\xC4fG\xC7j\xD6x\xC5\xF6:\xD7R\xD4i)M\xA9IE+\xA8`\xFEK\xE1\x97;\xA3\xDB\xBD",
              "3": "\xA6\xD5h\xFD\xF8`\x80\xD6\x93P\xE9Ps;\vE}\xA8\xBF\x96\xF5u\xAA\xF8\xE52(\xD7G",
              "9": "\xCF^\x97<\x91\xD5\xFA\xCC\x83i\xB4;\xEFt\xBC\xD1?\xEFl\xE3\xE0\xC6\xB8\x838\x93/m"
            },
            chainKey: {
              counter: 11
            },
            chainType: 2
          },
          ":[\xDBO\x88\x96pd\xAF \xC2\xD9\xE7O\xDE\x87w{}\xFD\bw\x969\xC0\xDF\x9D=\x93Z": {
            messageKeys: {
              "0": '!5\\W~\x8F|\xAFoa2V\x9E8\xCF\xA1d}\x1B8^Q\xD6fv\xD5"\x8B'
            },
            chainKey: {
              counter: 1
            },
            chainType: 2
          },
          "\n7mT\x85b!\xE8\xCD\x07m4g\xB3\x91\xFC\x9CIY\x8C\xEA\x8D\b\xCF\xCEPs": {
            messageKeys: {
              "0": "\xCEg\xF3\xAF\x912\xE0v\xF1\x91X_\xF5\x96\xC7\0\xF6l4J>\x8C\xD0\xCF{`-\xDC5\xA6",
              "4": 'c\xBF<\xB5\xE2\xBCX\xB5\x83!\xD9\xAF\xB5\xAE[\x97n<\x9E\xEC\xEE\xFAco\xE5\xA9n"l]\xD0'
            },
            chainKey: {
              counter: 5,
              key: "Z{\xF2\xD98\xD8\xB3A\xDDdSZ\x86k\n\xC3\x97\xF4\xA1\x1B[Y\xD2\xC2\xB6\x83a\xB0<"
            },
            chainType: 2
          },
          "+4\x96\xAB1\0l *\xE3K\xE7n\xBA\xD6\xF3\xB3\xEDTS\x9F&\x8C{\xF9 \xCD\x82>1": {
            messageKeys: {},
            chainKey: {
              counter: -1,
              key: "\xE8B?7\xAF\xA8\x07\x8F}:\x93?\x90\xB9$\\\xEB~\xAA\0gM0\xD5\x98'\xA3"
            },
            chainType: 1
          }
        }
      },
      version: "v1"
    };
    const expected = {
      currentSession: {
        sessionVersion: 3,
        localIdentityPublic: "Baioqfzc/5JD6b+GNqapPouf6eHK7xr9ynLJHnvl+444",
        remoteIdentityPublic: "BaioqfzP5JD6b+GNqepPouf6eHK7xr9ynLJHnvlpgVRA",
        rootKey: "ywM1L/yc2ppnA1hl+/oQlwD8Ara7bzUcg5etpQTQ/6s=",
        previousCounter: 3,
        senderChain: {
          senderRatchetKey: "BSsTNJarMQATbCAq40vnbrrW87PtVFOfJox7+SDNgj4x",
          senderRatchetKeyPrivate: "5JfjxauqiuD47SmI4QXBIoxzSk0uqKEScp0oTgw51Ag=",
          chainKey: {
            index: 0,
            key: "6EI/Nw+vHhCoB499OpM/kLkQJFzrfqoAZ00w1ZgnowU="
          }
        },
        receiverChains: [
          {
            senderRatchetKey: "BQo3HG1UhWIh6A7NBxZtNGezBZH8nElZjOqNCBHPzlBz",
            chainKey: {
              index: 6,
              key: "Wnvy2TjYs0HdZFNahmsKw5cc9KEbW1nSwraDFmGwBDw="
            },
            messageKeys: [
              {
                index: 1,
                cipherKey: "xVreEbT7Vtrxs85JyGBj6Y+UWftQz4H72F5kWV4cxqM=",
                iv: "TcRanSxZVWbuIq0xDRGnEw==",
                macKey: "5fW9aIKXhtwWp/5alNJUIXInZbztf2ywzQSpYrXoQ3A="
              },
              {
                index: 5,
                cipherKey: "A99HjM4pUugsQ5+2v48FGTGEhZPoW6wzW9MqSc11QQ4=",
                iv: "bE8Ei2Rkaoz4SKRwdG4+tQ==",
                macKey: "TOTdbAf0bCHOzcQ3lBaIm3yqmpEqvvldD0qTuDFmkAI="
              }
            ]
          },
          {
            senderRatchetKey: "BTpb20+IlnBkryDC2ecQT96Hd3t9/Qh3ljnA3509kxRa",
            chainKey: {
              index: 2
            },
            messageKeys: [
              {
                index: 1,
                cipherKey: "aAbSz5jOagUTgQKo3aqExcl8hyZANrY+HvrLc/OgoQI=",
                iv: "JcyLzw0fL67Kd4tfGJ2OUQ==",
                macKey: "dt+RXeaeIx+ASrKSk7D4guwTE1IUYl3LiLG9aI4sZm8="
              }
            ]
          },
          {
            senderRatchetKey: "Bd5nlMVr6YMBE5eh//tOWMgoOQakkneYri/YuVJpi0pJ",
            chainKey: {
              index: 12
            },
            messageKeys: [
              {
                index: 1,
                cipherKey: "pjcY/7MoRGtGHwNN/E8KqoKCx/5mdKp0VCmrmkBAj+M=",
                iv: "eBpAEoDj94NsI0vsf+4Hrw==",
                macKey: "P7Jz2KkOXC7B0mLkz7JaU/d0vdaYZjAfuKJ86xXB19U="
              },
              {
                index: 3,
                cipherKey: "EGDj0sc/1TMtSycYDCrpZdl6UCzCzDuMwlAvVVAs2OQ=",
                iv: "A+1OA9M2Z8gGlARtA231RA==",
                macKey: "oQ/PQxJDD52qrkShSy6hD3fASEfhWnlmY3qsSPuOY/o="
              },
              {
                index: 4,
                cipherKey: "WM3UUILGdECXjO8jZbBVYrPAnzRM8RdiU+PSAyHUT5U=",
                iv: "CWuQIuIyGqApA6MQgnDR5Q==",
                macKey: "hg+/xrOKFzn2eK1BnJ5C+ERsFgaWAOaBxQTc4q3b/g8="
              },
              {
                index: 10,
                cipherKey: "T0cBaGAseFz+s2njVr4sqbFf1pUH5PoPvdMBoizIT+Y=",
                iv: "hkT2kqgqhlORAjBI7ZDsig==",
                macKey: "uE/Dd4WSQWkYNRgolcQtOd+HpaHP5wGogMzErkZj+AQ="
              }
            ]
          },
          {
            senderRatchetKey: "BYSxQO1OIs0ZSFN7JI/vF5Rb0VwaKjs+UAAfDkhOYfkp",
            chainKey: {
              index: 6
            },
            messageKeys: [
              {
                index: 1,
                cipherKey: "ni6XhRCoLFud2Zk1zoel4he8znDG/t+TWVBASO35GlQ=",
                iv: "rKy/sxLmQ4j2DSxbDZTO5A==",
                macKey: "MKxs29AmNOnp6zZOsIbrmSqcVXYJL01kuvIaqwjRNvQ="
              },
              {
                index: 3,
                cipherKey: "Pp7GOD72vfjvb3qx7qm1YVoZKPqnyXC2uqCt89ZA/yc=",
                iv: "NuDf5iM0lD/o0YzjHZo4mA==",
                macKey: "JkBZiaxmwFr1xh/zzTQE6mlUIVJmSIrqSIQVlaoTz7M="
              },
              {
                index: 4,
                cipherKey: "zORWRvJEUe2F4UnBwe2YRqPS4GzUFE1lWptcqMzWf2U=",
                iv: "Og7jF9JJhiLtPD8W2OgTnw==",
                macKey: "Lxbcl9fL9x5Javtdz7tOV7Bbr8ar3rWxSIsi1Focv9w="
              },
              {
                index: 6,
                cipherKey: "T/TZNw04+ZfB0s2ltOT9qbzRPnCFn7VvxqHHAvORFx0=",
                iv: "DpOAK77ErIr2QFTsRnfOew==",
                macKey: "k/fxafepBiA0dQOTpohL+EKm2+1jpFwRigVWt02U/Jg="
              }
            ]
          },
          {
            senderRatchetKey: "BbXSFD/IoivRUvfnPzOaRLqDXEAwi4YEristfwiOj3IJ",
            chainKey: {
              index: 3
            }
          },
          {
            senderRatchetKey: "BRRAnr1NhizgCPPzmYV9qGBpvwCpSQH0Rx+UOtl78wUg",
            chainKey: {
              index: 1
            }
          },
          {
            senderRatchetKey: "BZvOKPA+kXiCg8TIP/52fu1reCDirC7wb5nyRGce3y4N",
            chainKey: {
              index: 7
            },
            messageKeys: [
              {
                index: 5,
                cipherKey: "PB44plPzHam/o2LZnyjo8HLRuAvp3uE6ixO5+GUCUsA=",
                iv: "JBbgRb10X/dDsn0GKg69dA==",
                macKey: "jKV1Rmlb0HATZHndLDIMONPgOXqT3kwE1QEstxXVe+o="
              }
            ]
          },
          {
            senderRatchetKey: "Ba9q9bHjMHfbUNDCU8+0O7cmEcIluq+wk3/d2f7q+ThG",
            chainKey: {
              index: 4
            },
            messageKeys: [
              {
                index: 1,
                cipherKey: "4buOJSqRFIpWwo4pXYwQTCTxas4+amBLpZ/CuEWXbPg=",
                iv: "9uD8ECO/fxtK28OvlCFXuQ==",
                macKey: "LI0ZSdX7k+cd5bTgs6XEYYIWY+2cxhWI97vAGFpoZIc="
              },
              {
                index: 2,
                cipherKey: "oNbFxcy2eebUQhoD+NLf12fgkXzhn4EU0Pgqn1bVKOs=",
                iv: "o1mm4rCN6Q0J1hA7I5jjgA==",
                macKey: "dfHB14sCIdun+RaKnAoyaQPC6qRDMewjqOIDZGmn3Es="
              },
              {
                index: 3,
                cipherKey: "/aU3zX2IdA91GAcB+7H57yzRe+6CgZ61tlW4M/rkCJI=",
                iv: "v8VJF467QDD1ZCr1JD8pbQ==",
                macKey: "MjK5iYjhZtQTJ4Eu3+qGOdYxn0G23EGRtTcusbzy9OA="
              }
            ]
          },
          {
            senderRatchetKey: "BTwX5SmcUeBG7mwyOZ3YgxyXIN0ktzuEdWTfBUmPfGYG",
            chainKey: {
              index: 2
            }
          },
          {
            senderRatchetKey: "BV7ECvKbwKIAD61BXDYr0xr3JtckuKzR1Hw8cVPWGtlo",
            chainKey: {
              index: 3
            }
          },
          {
            senderRatchetKey: "BTC7rQqoykGR5Aaix7RkAhI5fSXufc6pVGN9OIC8EW5c",
            chainKey: {
              index: 1
            }
          }
        ],
        remoteRegistrationId: 4243,
        localRegistrationId: 3554,
        aliceBaseKey: "BVeHv5MAbMgKeaoO/G1CMBdqhC7bo7Mtc4EWxI0oT19N"
      }
    };
    const recordCopy = getRecordCopy(record);
    const actual = (0, import_sessionTranslation.sessionRecordToProtobuf)(record, ourData);
    import_chai.assert.deepEqual(expected, actual.toJSON());
    import_chai.assert.deepEqual(record, recordCopy);
  });
  it("Generates expected protobuf with pending prekey", () => {
    const record = {
      sessions: {
        "W\x87\xBF\x93\0l\xC8\ny\xAA\xFCmB0j\x84.\xDB\xA3\xB3-s\x81\xC4\x8D(O_M": {
          registrationId: 4243,
          currentRatchet: {
            rootKey: "\xCB5/\xFC\x9C\xDA\x9AgXe\xFB\xFA\x97\0\xFC\xB6\xBBo5\x83\x97\xAD\xA5\xD0\xFF\xAB",
            lastRemoteEphemeralKey: "\n7mT\x85b!\xE8\xCD\x07m4g\xB3\x91\xFC\x9CIY\x8C\xEA\x8D\b\xCF\xCEPs",
            previousCounter: 2,
            ephemeralKeyPair: {
              privKey: '\xE4\x97\xE3\xC5\xAB\xAA\x8A\xE0\xF8\xED)\x88\xE1\xC1"\x8CsJM.\xA8\xA1r\x9D(N\f9\xD4\b',
              pubKey: "+4\x96\xAB1\0l *\xE3K\xE7n\xBA\xD6\xF3\xB3\xEDTS\x9F&\x8C{\xF9 \xCD\x82>1"
            }
          },
          indexInfo: {
            remoteIdentityKey: "\xA8\xA8\xA9\xFC\xCF\xE4\x90\xFAo\xE1\x8D\xA9\xEAO\xA2\xE7\xFAxr\xBB\xC6\xBFr\x9C\xB2G\x9E\xF9i\x81T@",
            closed: -1,
            baseKey: "W\x87\xBF\x93\0l\xC8\ny\xAA\xFCmB0j\x84.\xDB\xA3\xB3-s\x81\xC4\x8D(O_M",
            baseKeyType: 2
          },
          pendingPreKey: {
            baseKey: "ui\xA9\xFC\xCF\xE4\x90\xFAo\xE1\x8D\xA9\xEAO\xA2\xE7\xFAxr\xBB\xC6\xBFr\x9C\xB2G\x9E\xF9i\x81T@",
            signedKeyId: 38,
            preKeyId: 2
          },
          oldRatchetList: [],
          "\n7mT\x85b!\xE8\xCD\x07m4g\xB3\x91\xFC\x9CIY\x8C\xEA\x8D\b\xCF\xCEPs": {
            messageKeys: {
              "0": "\xCEg\xF3\xAF\x912\xE0v\xF1\x91X_\xF5\x96\xC7\0\xF6l4J>\x8C\xD0\xCF{`-\xDC5\xA6",
              "4": 'c\xBF<\xB5\xE2\xBCX\xB5\x83!\xD9\xAF\xB5\xAE[\x97n<\x9E\xEC\xEE\xFAco\xE5\xA9n"l]\xD0'
            },
            chainKey: {
              counter: 5,
              key: "Z{\xF2\xD98\xD8\xB3A\xDDdSZ\x86k\n\xC3\x97\xF4\xA1\x1B[Y\xD2\xC2\xB6\x83a\xB0<"
            },
            chainType: 2
          },
          "+4\x96\xAB1\0l *\xE3K\xE7n\xBA\xD6\xF3\xB3\xEDTS\x9F&\x8C{\xF9 \xCD\x82>1": {
            messageKeys: {},
            chainKey: {
              counter: -1,
              key: "\xE8B?7\xAF\xA8\x07\x8F}:\x93?\x90\xB9$\\\xEB~\xAA\0gM0\xD5\x98'\xA3"
            },
            chainType: 1
          }
        }
      },
      version: "v1"
    };
    const expected = {
      currentSession: {
        sessionVersion: 3,
        localIdentityPublic: "Baioqfzc/5JD6b+GNqapPouf6eHK7xr9ynLJHnvl+444",
        remoteIdentityPublic: "BaioqfzP5JD6b+GNqepPouf6eHK7xr9ynLJHnvlpgVRA",
        rootKey: "ywM1L/yc2ppnA1hl+/oQlwD8Ara7bzUcg5etpQTQ/6s=",
        previousCounter: 3,
        senderChain: {
          senderRatchetKey: "BSsTNJarMQATbCAq40vnbrrW87PtVFOfJox7+SDNgj4x",
          senderRatchetKeyPrivate: "5JfjxauqiuD47SmI4QXBIoxzSk0uqKEScp0oTgw51Ag=",
          chainKey: {
            index: 0,
            key: "6EI/Nw+vHhCoB499OpM/kLkQJFzrfqoAZ00w1ZgnowU="
          }
        },
        receiverChains: [
          {
            senderRatchetKey: "BQo3HG1UhWIh6A7NBxZtNGezBZH8nElZjOqNCBHPzlBz",
            chainKey: {
              index: 6,
              key: "Wnvy2TjYs0HdZFNahmsKw5cc9KEbW1nSwraDFmGwBDw="
            },
            messageKeys: [
              {
                index: 1,
                cipherKey: "xVreEbT7Vtrxs85JyGBj6Y+UWftQz4H72F5kWV4cxqM=",
                iv: "TcRanSxZVWbuIq0xDRGnEw==",
                macKey: "5fW9aIKXhtwWp/5alNJUIXInZbztf2ywzQSpYrXoQ3A="
              },
              {
                index: 5,
                cipherKey: "A99HjM4pUugsQ5+2v48FGTGEhZPoW6wzW9MqSc11QQ4=",
                iv: "bE8Ei2Rkaoz4SKRwdG4+tQ==",
                macKey: "TOTdbAf0bCHOzcQ3lBaIm3yqmpEqvvldD0qTuDFmkAI="
              }
            ]
          }
        ],
        pendingPreKey: {
          preKeyId: 2,
          baseKey: "BXVpqfzP5JD6b+GNqepPouf6eHK7xr9ynLJHnvlpgVRA",
          signedPreKeyId: 38
        },
        remoteRegistrationId: 4243,
        localRegistrationId: 3554,
        aliceBaseKey: "BVeHv5MAbMgKeaoO/G1CMBdqhC7bo7Mtc4EWxI0oT19N"
      }
    };
    const recordCopy = getRecordCopy(record);
    const actual = (0, import_sessionTranslation.sessionRecordToProtobuf)(record, ourData);
    import_chai.assert.deepEqual(expected, actual.toJSON());
    import_chai.assert.deepEqual(record, recordCopy);
  });
  it("Generates expected protobuf with multiple sessions", () => {
    const record = {
      sessions: {
        "W\x87\xBF\x93\0l\xC8\ny\xAA\xFCmB0j\x84.\xDB\xA3\xB3-s\x81\xC4\x8D(O_M": {
          registrationId: 4243,
          currentRatchet: {
            rootKey: "\xCB5/\xFC\x9C\xDA\x9AgXe\xFB\xFA\x97\0\xFC\xB6\xBBo5\x83\x97\xAD\xA5\xD0\xFF\xAB",
            lastRemoteEphemeralKey: "\n7mT\x85b!\xE8\xCD\x07m4g\xB3\x91\xFC\x9CIY\x8C\xEA\x8D\b\xCF\xCEPs",
            previousCounter: 2,
            ephemeralKeyPair: {
              privKey: '\xE4\x97\xE3\xC5\xAB\xAA\x8A\xE0\xF8\xED)\x88\xE1\xC1"\x8CsJM.\xA8\xA1r\x9D(N\f9\xD4\b',
              pubKey: "+4\x96\xAB1\0l *\xE3K\xE7n\xBA\xD6\xF3\xB3\xEDTS\x9F&\x8C{\xF9 \xCD\x82>1"
            }
          },
          indexInfo: {
            remoteIdentityKey: "\xA8\xA8\xA9\xFC\xCF\xE4\x90\xFAo\xE1\x8D\xA9\xEAO\xA2\xE7\xFAxr\xBB\xC6\xBFr\x9C\xB2G\x9E\xF9i\x81T@",
            closed: -1,
            baseKey: "W\x87\xBF\x93\0l\xC8\ny\xAA\xFCmB0j\x84.\xDB\xA3\xB3-s\x81\xC4\x8D(O_M",
            baseKeyType: 2
          },
          oldRatchetList: [],
          "\n7mT\x85b!\xE8\xCD\x07m4g\xB3\x91\xFC\x9CIY\x8C\xEA\x8D\b\xCF\xCEPs": {
            messageKeys: {
              "0": "\xCEg\xF3\xAF\x912\xE0v\xF1\x91X_\xF5\x96\xC7\0\xF6l4J>\x8C\xD0\xCF{`-\xDC5\xA6",
              "4": 'c\xBF<\xB5\xE2\xBCX\xB5\x83!\xD9\xAF\xB5\xAE[\x97n<\x9E\xEC\xEE\xFAco\xE5\xA9n"l]\xD0'
            },
            chainKey: {
              counter: 5,
              key: "Z{\xF2\xD98\xD8\xB3A\xDDdSZ\x86k\n\xC3\x97\xF4\xA1\x1B[Y\xD2\xC2\xB6\x83a\xB0<"
            },
            chainType: 2
          },
          "+4\x96\xAB1\0l *\xE3K\xE7n\xBA\xD6\xF3\xB3\xEDTS\x9F&\x8C{\xF9 \xCD\x82>1": {
            messageKeys: {},
            chainKey: {
              counter: -1,
              key: "\xE8B?7\xAF\xA8\x07\x8F}:\x93?\x90\xB9$\\\xEB~\xAA\0gM0\xD5\x98'\xA3"
            },
            chainType: 1
          }
        },
        "BD\xBFZ\0l\xC8\ny\xAA\xFCmB0j\x84.\xDB\xA3\xB3-s\x81\xC4\x8D(O_M": {
          registrationId: 3432,
          currentRatchet: {
            rootKey: "\xCB5/\xFC\x9C\xDA\x9AgXe\xFB\xFA\x97\0\xFC\xB6\xBBo5\x83\x97\xAD\xA5\xD0\xFF\xAB",
            lastRemoteEphemeralKey: "\n7mT\x85b!\xE8\xCD\x07m4g\xB3\x91\xFC\x9CIY\x8C\xEA\x8D\b\xCF\xCEPs",
            previousCounter: 2,
            ephemeralKeyPair: {
              privKey: '\xE4\x97\xE3\xC5\xAB\xAA\x8A\xE0\xF8\xED)\x88\xE1\xC1"\x8CsJM.\xA8\xA1r\x9D(N\f9\xD4\b',
              pubKey: "+4\x96\xAB1\0l *\xE3K\xE7n\xBA\xD6\xF3\xB3\xEDTS\x9F&\x8C{\xF9 \xCD\x82>1"
            }
          },
          indexInfo: {
            remoteIdentityKey: "\xA8\xA8\xA9\xFC\xCF\xE4\x90\xFAo\xE1\x8D\xA9\xEAO\xA2\xE7\xFAxr\xBB\xC6\xBFr\x9C\xB2G\x9E\xF9i\x81T@",
            closed: 1605579954962,
            baseKey: "BD\xBFZ\0l\xC8\ny\xAA\xFCmB0j\x84.\xDB\xA3\xB3-s\x81\xC4\x8D(O_M",
            baseKeyType: 2
          },
          oldRatchetList: [],
          "\n7mT\x85b!\xE8\xCD\x07m4g\xB3\x91\xFC\x9CIY\x8C\xEA\x8D\b\xCF\xCEPs": {
            messageKeys: {
              "2": "\xCEg\xF3\xAF\x912\xE0v\xF1\x91X_\xF5\x96\xC7\0\xF6l4J>\x8C\xD0\xCF{`-\xDC5\xA6",
              "3": 'c\xBF<\xB5\xE2\xBCX\xB5\x83!\xD9\xAF\xB5\xAE[\x97n<\x9E\xEC\xEE\xFAco\xE5\xA9n"l]\xD0'
            },
            chainKey: {
              counter: 5,
              key: "Z{\xF2\xD98\xD8\xB3A\xDDdSZ\x86k\n\xC3\x97\xF4\xA1\x1B[Y\xD2\xC2\xB6\x83a\xB0<"
            },
            chainType: 2
          },
          "+4\x96\xAB1\0l *\xE3K\xE7n\xBA\xD6\xF3\xB3\xEDTS\x9F&\x8C{\xF9 \xCD\x82>1": {
            messageKeys: {},
            chainKey: {
              counter: -1,
              key: "\xE8B?7\xAF\xA8\x07\x8F}:\x93?\x90\xB9$\\\xEB~\xAA\0gM0\xD5\x98'\xA3"
            },
            chainType: 1
          }
        },
        "AN\xBFC\0l\xC8\ny\xAA\xFCmB0j\x84.\xDB\xA3\xB3-s\x81\xC4\x8D(O_M": {
          registrationId: 2312,
          currentRatchet: {
            rootKey: "\xCB5/\xFC\x9C\xDA\x9AgXe\xFB\xFA\x97\0\xFC\xB6\xBBo5\x83\x97\xAD\xA5\xD0\xFF\xAB",
            lastRemoteEphemeralKey: "\n7mT\x85b!\xE8\xCD\x07m4g\xB3\x91\xFC\x9CIY\x8C\xEA\x8D\b\xCF\xCEPs",
            previousCounter: 2,
            ephemeralKeyPair: {
              privKey: '\xE4\x97\xE3\xC5\xAB\xAA\x8A\xE0\xF8\xED)\x88\xE1\xC1"\x8CsJM.\xA8\xA1r\x9D(N\f9\xD4\b',
              pubKey: "+4\x96\xAB1\0l *\xE3K\xE7n\xBA\xD6\xF3\xB3\xEDTS\x9F&\x8C{\xF9 \xCD\x82>1"
            }
          },
          indexInfo: {
            remoteIdentityKey: "\xA8\xA8\xA9\xFC\xCF\xE4\x90\xFAo\xE1\x8D\xA9\xEAO\xA2\xE7\xFAxr\xBB\xC6\xBFr\x9C\xB2G\x9E\xF9i\x81T@",
            closed: 1605580407e3,
            baseKey: "AN\xBFC\0l\xC8\ny\xAA\xFCmB0j\x84.\xDB\xA3\xB3-s\x81\xC4\x8D(O_M",
            baseKeyType: 2
          },
          oldRatchetList: [],
          "\n7mT\x85b!\xE8\xCD\x07m4g\xB3\x91\xFC\x9CIY\x8C\xEA\x8D\b\xCF\xCEPs": {
            messageKeys: {
              "1": "\xCEg\xF3\xAF\x912\xE0v\xF1\x91X_\xF5\x96\xC7\0\xF6l4J>\x8C\xD0\xCF{`-\xDC5\xA6",
              "5": 'c\xBF<\xB5\xE2\xBCX\xB5\x83!\xD9\xAF\xB5\xAE[\x97n<\x9E\xEC\xEE\xFAco\xE5\xA9n"l]\xD0'
            },
            chainKey: {
              counter: 5,
              key: "Z{\xF2\xD98\xD8\xB3A\xDDdSZ\x86k\n\xC3\x97\xF4\xA1\x1B[Y\xD2\xC2\xB6\x83a\xB0<"
            },
            chainType: 2
          },
          "+4\x96\xAB1\0l *\xE3K\xE7n\xBA\xD6\xF3\xB3\xEDTS\x9F&\x8C{\xF9 \xCD\x82>1": {
            messageKeys: {},
            chainKey: {
              counter: -1,
              key: "\xE8B?7\xAF\xA8\x07\x8F}:\x93?\x90\xB9$\\\xEB~\xAA\0gM0\xD5\x98'\xA3"
            },
            chainType: 1
          }
        }
      },
      version: "v1"
    };
    const expected = {
      currentSession: {
        sessionVersion: 3,
        localIdentityPublic: "Baioqfzc/5JD6b+GNqapPouf6eHK7xr9ynLJHnvl+444",
        remoteIdentityPublic: "BaioqfzP5JD6b+GNqepPouf6eHK7xr9ynLJHnvlpgVRA",
        rootKey: "ywM1L/yc2ppnA1hl+/oQlwD8Ara7bzUcg5etpQTQ/6s=",
        previousCounter: 3,
        senderChain: {
          senderRatchetKey: "BSsTNJarMQATbCAq40vnbrrW87PtVFOfJox7+SDNgj4x",
          senderRatchetKeyPrivate: "5JfjxauqiuD47SmI4QXBIoxzSk0uqKEScp0oTgw51Ag=",
          chainKey: {
            index: 0,
            key: "6EI/Nw+vHhCoB499OpM/kLkQJFzrfqoAZ00w1ZgnowU="
          }
        },
        receiverChains: [
          {
            senderRatchetKey: "BQo3HG1UhWIh6A7NBxZtNGezBZH8nElZjOqNCBHPzlBz",
            chainKey: {
              index: 6,
              key: "Wnvy2TjYs0HdZFNahmsKw5cc9KEbW1nSwraDFmGwBDw="
            },
            messageKeys: [
              {
                index: 1,
                cipherKey: "xVreEbT7Vtrxs85JyGBj6Y+UWftQz4H72F5kWV4cxqM=",
                iv: "TcRanSxZVWbuIq0xDRGnEw==",
                macKey: "5fW9aIKXhtwWp/5alNJUIXInZbztf2ywzQSpYrXoQ3A="
              },
              {
                index: 5,
                cipherKey: "A99HjM4pUugsQ5+2v48FGTGEhZPoW6wzW9MqSc11QQ4=",
                iv: "bE8Ei2Rkaoz4SKRwdG4+tQ==",
                macKey: "TOTdbAf0bCHOzcQ3lBaIm3yqmpEqvvldD0qTuDFmkAI="
              }
            ]
          }
        ],
        remoteRegistrationId: 4243,
        localRegistrationId: 3554,
        aliceBaseKey: "BVeHv5MAbMgKeaoO/G1CMBdqhC7bo7Mtc4EWxI0oT19N"
      },
      previousSessions: [
        {
          sessionVersion: 3,
          localIdentityPublic: "Baioqfzc/5JD6b+GNqapPouf6eHK7xr9ynLJHnvl+444",
          remoteIdentityPublic: "BaioqfzP5JD6b+GNqepPouf6eHK7xr9ynLJHnvlpgVRA",
          rootKey: "ywM1L/yc2ppnA1hl+/oQlwD8Ara7bzUcg5etpQTQ/6s=",
          previousCounter: 3,
          senderChain: {
            senderRatchetKey: "BSsTNJarMQATbCAq40vnbrrW87PtVFOfJox7+SDNgj4x",
            senderRatchetKeyPrivate: "5JfjxauqiuD47SmI4QXBIoxzSk0uqKEScp0oTgw51Ag=",
            chainKey: {
              index: 0,
              key: "6EI/Nw+vHhCoB499OpM/kLkQJFzrfqoAZ00w1ZgnowU="
            }
          },
          receiverChains: [
            {
              senderRatchetKey: "BQo3HG1UhWIh6A7NBxZtNGezBZH8nElZjOqNCBHPzlBz",
              chainKey: {
                index: 6,
                key: "Wnvy2TjYs0HdZFNahmsKw5cc9KEbW1nSwraDFmGwBDw="
              },
              messageKeys: [
                {
                  index: 2,
                  cipherKey: "xVreEbT7Vtrxs85JyGBj6Y+UWftQz4H72F5kWV4cxqM=",
                  iv: "TcRanSxZVWbuIq0xDRGnEw==",
                  macKey: "5fW9aIKXhtwWp/5alNJUIXInZbztf2ywzQSpYrXoQ3A="
                },
                {
                  index: 6,
                  cipherKey: "A99HjM4pUugsQ5+2v48FGTGEhZPoW6wzW9MqSc11QQ4=",
                  iv: "bE8Ei2Rkaoz4SKRwdG4+tQ==",
                  macKey: "TOTdbAf0bCHOzcQ3lBaIm3yqmpEqvvldD0qTuDFmkAI="
                }
              ]
            }
          ],
          remoteRegistrationId: 2312,
          localRegistrationId: 3554,
          aliceBaseKey: "BUFOv0MAbMgKeaoO/G1CMBdqhC7bo7Mtc4EWxI0oT19N"
        },
        {
          sessionVersion: 3,
          localIdentityPublic: "Baioqfzc/5JD6b+GNqapPouf6eHK7xr9ynLJHnvl+444",
          remoteIdentityPublic: "BaioqfzP5JD6b+GNqepPouf6eHK7xr9ynLJHnvlpgVRA",
          rootKey: "ywM1L/yc2ppnA1hl+/oQlwD8Ara7bzUcg5etpQTQ/6s=",
          previousCounter: 3,
          senderChain: {
            senderRatchetKey: "BSsTNJarMQATbCAq40vnbrrW87PtVFOfJox7+SDNgj4x",
            senderRatchetKeyPrivate: "5JfjxauqiuD47SmI4QXBIoxzSk0uqKEScp0oTgw51Ag=",
            chainKey: {
              index: 0,
              key: "6EI/Nw+vHhCoB499OpM/kLkQJFzrfqoAZ00w1ZgnowU="
            }
          },
          receiverChains: [
            {
              senderRatchetKey: "BQo3HG1UhWIh6A7NBxZtNGezBZH8nElZjOqNCBHPzlBz",
              chainKey: {
                index: 6,
                key: "Wnvy2TjYs0HdZFNahmsKw5cc9KEbW1nSwraDFmGwBDw="
              },
              messageKeys: [
                {
                  index: 3,
                  cipherKey: "xVreEbT7Vtrxs85JyGBj6Y+UWftQz4H72F5kWV4cxqM=",
                  iv: "TcRanSxZVWbuIq0xDRGnEw==",
                  macKey: "5fW9aIKXhtwWp/5alNJUIXInZbztf2ywzQSpYrXoQ3A="
                },
                {
                  index: 4,
                  cipherKey: "A99HjM4pUugsQ5+2v48FGTGEhZPoW6wzW9MqSc11QQ4=",
                  iv: "bE8Ei2Rkaoz4SKRwdG4+tQ==",
                  macKey: "TOTdbAf0bCHOzcQ3lBaIm3yqmpEqvvldD0qTuDFmkAI="
                }
              ]
            }
          ],
          remoteRegistrationId: 3432,
          localRegistrationId: 3554,
          aliceBaseKey: "BUJEv1oAbMgKeaoO/G1CMBdqhC7bo7Mtc4EWxI0oT19N"
        }
      ]
    };
    const recordCopy = getRecordCopy(record);
    const actual = (0, import_sessionTranslation.sessionRecordToProtobuf)(record, ourData);
    import_chai.assert.deepEqual(expected, actual.toJSON());
    import_chai.assert.deepEqual(record, recordCopy);
  });
  it("Generates expected protobuf with just-initialized session", () => {
    const record = {
      sessions: {
        "5>=eV\xB9\xDB\x89n\xBE\x8D\xAF\x97#\xDF\xB6_=.N\xEE\xA5%\x85-]\xF9_\n": {
          registrationId: 3188,
          currentRatchet: {
            rootKey: "\x1B1\x9F6\x8C\xCA\xE6\xF0\xCA\xA8\xBE>}\xDA\xA9\x88\xC4H\xB8sN\x9D\xD3:\x88\xC8F\xB9\xB3Q\xD6i",
            lastRemoteEphemeralKey: "K\xC6\\\xFB\xAB\xD1\xDA\xFBU\xB1i\xFA\x7Fi\x88\xC3]\xBC\xE5U\xE0\xAF\xF2\xC9~&",
            previousCounter: 0,
            ephemeralKeyPair: {
              privKey: " -&	]$P\xF9'y\x85\xEF\xCB\xEEE\xD1+\xE9a\x86\xAA\xB1 :wM",
              pubKey: '\xA6\xE7\x9C\xF2\xC6\xE5{\x97\xD81\xB4\xE8n\x82\x9En\x95\xC7(\xDBK\xA98P\x8F\xCB"h'
            }
          },
          indexInfo: {
            remoteIdentityKey: "\x81\xDA\xE4\x8D\xA7\xD7d\x98\xE2\xB0\x88u\xA7\xF5`E\xCBTe%H\xA2!&\xD98c\x88z*",
            closed: -1,
            baseKey: "5>=eV\xB9\xDB\x89n\xBE\x8D\xAF\x97#\xDF\xB6_=.N\xEE\xA5%\x85-]\xF9_\n",
            baseKeyType: 1
          },
          oldRatchetList: [],
          '\xA6\xE7\x9C\xF2\xC6\xE5{\x97\xD81\xB4\xE8n\x82\x9En\x95\xC7(\xDBK\xA98P\x8F\xCB"h': {
            messageKeys: {},
            chainKey: {
              counter: 0,
              key: "\xB6^Do/j\xEE\x7FU\xE8\xAB\x88\xAA\x8Cxn\xF5\x8D\xC6\xF2}\xD0\xF3*\xE4\xC7\xCA\xC2\0"
            },
            chainType: 1
          },
          pendingPreKey: {
            signedKeyId: 2995,
            baseKey: "5>=eV\xB9\xDB\x89n\xBE\x8D\xAF\x97#\xDF\xB6_=.N\xEE\xA5%\x85-]\xF9_\n",
            preKeyId: 386
          }
        }
      },
      version: "v1"
    };
    const expected = {
      currentSession: {
        aliceBaseKey: "BTU+PWVWuRnbiW6+ja+XI9+2Xz0TLk7uGqUlhS1d+V8K",
        localIdentityPublic: "Baioqfzc/5JD6b+GNqapPouf6eHK7xr9ynLJHnvl+444",
        localRegistrationId: 3554,
        pendingPreKey: {
          baseKey: "BTU+PWVWuRnbiW6+ja+XI9+2Xz0TLk7uGqUlhS1d+V8K",
          preKeyId: 386,
          signedPreKeyId: 2995
        },
        previousCounter: 1,
        remoteIdentityPublic: "BRmB2uSNpwbXZJjisIh1p/VgRctUZSVIoiEm2ThjiHoq",
        remoteRegistrationId: 3188,
        rootKey: "GzGfNozK5vDKqL4+fdqpiMRIuHNOndM6iMhGubNR1mk=",
        senderChain: {
          chainKey: {
            index: 1,
            key: "tl5Eby9q7n8PVeiriKoRjHhu9Y0RxvJ90PMq5MfKwgA="
          },
          senderRatchetKey: "BRSm55wC8hrG5Rp7l9gxtOhugp5ulcco20upOFCPyyJo",
          senderRatchetKeyPrivate: "IC0mCV0kFVAf+Q4cHid5hR7vy+5F0SvpYYaqsSA6d00="
        },
        sessionVersion: 3
      }
    };
    const recordCopy = getRecordCopy(record);
    const actual = (0, import_sessionTranslation.sessionRecordToProtobuf)(record, ourData);
    import_chai.assert.deepEqual(expected, actual.toJSON());
    import_chai.assert.deepEqual(record, recordCopy);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2Vzc2lvblRyYW5zbGF0aW9uX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0ICogYXMgQnl0ZXMgZnJvbSAnLi4vLi4vQnl0ZXMnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbFVzZXJEYXRhVHlwZSB9IGZyb20gJy4uLy4uL3V0aWwvc2Vzc2lvblRyYW5zbGF0aW9uJztcbmltcG9ydCB7IHNlc3Npb25SZWNvcmRUb1Byb3RvYnVmIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXNzaW9uVHJhbnNsYXRpb24nO1xuXG5jb25zdCBnZXRSZWNvcmRDb3B5ID0gKHJlY29yZDogYW55KTogYW55ID0+IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVjb3JkKSk7XG5cbmRlc2NyaWJlKCdzZXNzaW9uVHJhbnNsYXRpb24nLCAoKSA9PiB7XG4gIGxldCBvdXJEYXRhOiBMb2NhbFVzZXJEYXRhVHlwZTtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBvdXJEYXRhID0ge1xuICAgICAgaWRlbnRpdHlLZXlQdWJsaWM6IEJ5dGVzLmZyb21CYXNlNjQoXG4gICAgICAgICdCYWlvcWZ6Yy81SkQ2YitHTnFhcFBvdWY2ZUhLN3hyOXluTEpIbnZsKzQ0NCdcbiAgICAgICksXG4gICAgICByZWdpc3RyYXRpb25JZDogMzU1NCxcbiAgICB9O1xuICB9KTtcblxuICBpdCgnVGhyb3dzIGlmIGdpdmVuIGFuIGVtcHR5IG9iamVjdCcsICgpID0+IHtcbiAgICBjb25zdCByZWNvcmQ6IGFueSA9IHt9O1xuICAgIGFzc2VydC50aHJvd3MoXG4gICAgICAoKSA9PiBzZXNzaW9uUmVjb3JkVG9Qcm90b2J1ZihyZWNvcmQsIG91ckRhdGEpLFxuICAgICAgJ3RvUHJvdG9idWY6IFJlY29yZCBoYWQgbm8gc2Vzc2lvbnMhJ1xuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdHZW5lcmF0ZXMgZXhwZWN0ZWQgcHJvdG9idWYgd2l0aCBtaW5pbWFsIHJlY29yZCcsICgpID0+IHtcbiAgICBjb25zdCByZWNvcmQ6IGFueSA9IHtcbiAgICAgIHNlc3Npb25zOiB7XG4gICAgICAgICdcXHUwMDA1V1x1MDA4N1x1MDBCRlx1MDA5M1xcdTAwMDBsXHUwMEM4XFxueVx1MDBBQVxcdTAwMGVcdTAwRkNtQjBcXHUwMDE3alx1MDA4NC5cdTAwREJcdTAwQTNcdTAwQjMtc1x1MDA4MVxcdTAwMTZcdTAwQzRcdTAwOEQoT19NJzoge1xuICAgICAgICAgIHJlZ2lzdHJhdGlvbklkOiA0MjQzLFxuICAgICAgICAgIGN1cnJlbnRSYXRjaGV0OiB7XG4gICAgICAgICAgICByb290S2V5OlxuICAgICAgICAgICAgICAnXHUwMENCXFx1MDAwMzUvXHUwMEZDXHUwMDlDXHUwMERBXHUwMDlBZ1xcdTAwMDNYZVx1MDBGQlx1MDBGQVxcdTAwMTBcdTAwOTdcXHUwMDAwXHUwMEZDXFx1MDAwMlx1MDBCNlx1MDBCQm81XFx1MDAxY1x1MDA4M1x1MDA5N1x1MDBBRFx1MDBBNVxcdTAwMDRcdTAwRDBcdTAwRkZcdTAwQUInLFxuICAgICAgICAgICAgbGFzdFJlbW90ZUVwaGVtZXJhbEtleTpcbiAgICAgICAgICAgICAgJ1xcdTAwMDVcXG43XFx1MDAxY21UXHUwMDg1YiFcdTAwRThcXHUwMDBlXHUwMENEXFx1MDAwN1xcdTAwMTZtNGdcdTAwQjNcXHUwMDA1XHUwMDkxXHUwMEZDXHUwMDlDSVlcdTAwOENcdTAwRUFcdTAwOERcXGJcXHUwMDExXHUwMENGXHUwMENFUHMnLFxuICAgICAgICAgICAgcHJldmlvdXNDb3VudGVyOiAyLFxuICAgICAgICAgICAgZXBoZW1lcmFsS2V5UGFpcjoge1xuICAgICAgICAgICAgICBwcml2S2V5OiAnXHUwMEU0XHUwMDk3XHUwMEUzXHUwMEM1XHUwMEFCXHUwMEFBXHUwMDhBXHUwMEUwXHUwMEY4XHUwMEVEKVx1MDA4OFx1MDBFMVxcdTAwMDVcdTAwQzFcIlx1MDA4Q3NKTS5cdTAwQThcdTAwQTFcXHUwMDEyclx1MDA5RChOXFxmOVx1MDBENFxcYicsXG4gICAgICAgICAgICAgIHB1YktleTogJ1xcdTAwMDUrXFx1MDAxMzRcdTAwOTZcdTAwQUIxXFx1MDAwMFxcdTAwMTNsICpcdTAwRTNLXHUwMEU3blx1MDBCQVx1MDBENlx1MDBGM1x1MDBCM1x1MDBFRFRTXHUwMDlGJlx1MDA4Q3tcdTAwRjkgXHUwMENEXHUwMDgyPjEnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluZGV4SW5mbzoge1xuICAgICAgICAgICAgcmVtb3RlSWRlbnRpdHlLZXk6ICdcXHUwMDA1XHUwMEE4XHUwMEE4XHUwMEE5XHUwMEZDXHUwMENGXHUwMEU0XHUwMDkwXHUwMEZBb1x1MDBFMVx1MDA4RFx1MDBBOVx1MDBFQU9cdTAwQTJcdTAwRTdcdTAwRkF4clx1MDBCQlx1MDBDNlx1MDBCRnJcdTAwOUNcdTAwQjJHXHUwMDlFXHUwMEY5aVx1MDA4MVRAJyxcbiAgICAgICAgICAgIGNsb3NlZDogLTEsXG4gICAgICAgICAgICBiYXNlS2V5OiAnXFx1MDAwNVdcdTAwODdcdTAwQkZcdTAwOTNcXHUwMDAwbFx1MDBDOFxcbnlcdTAwQUFcXHUwMDBlXHUwMEZDbUIwXFx1MDAxN2pcdTAwODQuXHUwMERCXHUwMEEzXHUwMEIzLXNcdTAwODFcXHUwMDE2XHUwMEM0XHUwMDhEKE9fTScsXG4gICAgICAgICAgICBiYXNlS2V5VHlwZTogMixcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9sZFJhdGNoZXRMaXN0OiBbXSxcbiAgICAgICAgICAnXFx1MDAwNVxcbjdcXHUwMDFjbVRcdTAwODViIVx1MDBFOFxcdTAwMGVcdTAwQ0RcXHUwMDA3XFx1MDAxNm00Z1x1MDBCM1xcdTAwMDVcdTAwOTFcdTAwRkNcdTAwOUNJWVx1MDA4Q1x1MDBFQVx1MDA4RFxcYlxcdTAwMTFcdTAwQ0ZcdTAwQ0VQcyc6IHtcbiAgICAgICAgICAgIG1lc3NhZ2VLZXlzOiB7XG4gICAgICAgICAgICAgICcwJzogJ1x1MDBDRWdcdTAwRjNcdTAwQUZcdTAwOTEyXHUwMEUwdlx1MDBGMVx1MDA5MVhfXHUwMEY1XFx1MDAxNFx1MDA5Nlx1MDBDN1xcdTAwMDBcdTAwRjZsXFx1MDAxZjRKPlx1MDA4Q1x1MDBEMFx1MDBDRntgLVx1MDBEQzVcdTAwQTYnLFxuICAgICAgICAgICAgICAnNCc6ICdjXHUwMEJGPFx1MDBCNVx1MDBFMlx1MDBCQ1hcdTAwQjVcdTAwODMhXHUwMEQ5XHUwMEFGXHUwMEI1XHUwMEFFW1x1MDA5N248XHUwMDlFXHUwMEVDXHUwMEVFXHUwMEZBY29cdTAwRTVcdTAwQTluXFx1MDAxM1wibF1cdTAwRDAnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYWluS2V5OiB7XG4gICAgICAgICAgICAgIGNvdW50ZXI6IDUsXG4gICAgICAgICAgICAgIGtleTogJ1p7XHUwMEYyXHUwMEQ5OFx1MDBEOFx1MDBCM0FcdTAwRERkU1pcdTAwODZrXFxuXHUwMEMzXHUwMDk3XFx1MDAxY1x1MDBGNFx1MDBBMVxcdTAwMWJbWVx1MDBEMlx1MDBDMlx1MDBCNlx1MDA4M1xcdTAwMTZhXHUwMEIwXFx1MDAwNDwnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYWluVHlwZTogMixcbiAgICAgICAgICB9LFxuICAgICAgICAgICdcXHUwMDA1K1xcdTAwMTM0XHUwMDk2XHUwMEFCMVxcdTAwMDBcXHUwMDEzbCAqXHUwMEUzS1x1MDBFN25cdTAwQkFcdTAwRDZcdTAwRjNcdTAwQjNcdTAwRURUU1x1MDA5RiZcdTAwOEN7XHUwMEY5IFx1MDBDRFx1MDA4Mj4xJzoge1xuICAgICAgICAgICAgbWVzc2FnZUtleXM6IHt9LFxuICAgICAgICAgICAgY2hhaW5LZXk6IHtcbiAgICAgICAgICAgICAgY291bnRlcjogLTEsXG4gICAgICAgICAgICAgIGtleTogXCJcdTAwRThCPzdcXHUwMDBmXHUwMEFGXFx1MDAxZVxcdTAwMTBcdTAwQThcXHUwMDA3XHUwMDhGfTpcdTAwOTM/XHUwMDkwXHUwMEI5XFx1MDAxMCRcXFxcXHUwMEVCflx1MDBBQVxcdTAwMDBnTTBcdTAwRDVcdTAwOTgnXHUwMEEzXFx1MDAwNVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYWluVHlwZTogMSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHZlcnNpb246ICd2MScsXG4gICAgfTtcblxuICAgIGNvbnN0IGV4cGVjdGVkID0ge1xuICAgICAgY3VycmVudFNlc3Npb246IHtcbiAgICAgICAgc2Vzc2lvblZlcnNpb246IDMsXG4gICAgICAgIGxvY2FsSWRlbnRpdHlQdWJsaWM6ICdCYWlvcWZ6Yy81SkQ2YitHTnFhcFBvdWY2ZUhLN3hyOXluTEpIbnZsKzQ0NCcsXG4gICAgICAgIHJlbW90ZUlkZW50aXR5UHVibGljOiAnQmFpb3FmelA1SkQ2YitHTnFlcFBvdWY2ZUhLN3hyOXluTEpIbnZscGdWUkEnLFxuICAgICAgICByb290S2V5OiAneXdNMUwveWMycHBuQTFobCsvb1Fsd0Q4QXJhN2J6VWNnNWV0cFFUUS82cz0nLFxuICAgICAgICBwcmV2aW91c0NvdW50ZXI6IDMsXG4gICAgICAgIHNlbmRlckNoYWluOiB7XG4gICAgICAgICAgc2VuZGVyUmF0Y2hldEtleTogJ0JTc1ROSmFyTVFBVGJDQXE0MHZuYnJyVzg3UHRWRk9mSm94NytTRE5najR4JyxcbiAgICAgICAgICBzZW5kZXJSYXRjaGV0S2V5UHJpdmF0ZTpcbiAgICAgICAgICAgICc1SmZqeGF1cWl1RDQ3U21JNFFYQklveHpTazB1cUtFU2NwMG9UZ3c1MUFnPScsXG4gICAgICAgICAgY2hhaW5LZXk6IHtcbiAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAga2V5OiAnNkVJL053K3ZIaENvQjQ5OU9wTS9rTGtRSkZ6cmZxb0FaMDB3MVpnbm93VT0nLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHJlY2VpdmVyQ2hhaW5zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2VuZGVyUmF0Y2hldEtleTogJ0JRbzNIRzFVaFdJaDZBN05CeFp0TkdlekJaSDhuRWxaak9xTkNCSFB6bEJ6JyxcbiAgICAgICAgICAgIGNoYWluS2V5OiB7XG4gICAgICAgICAgICAgIGluZGV4OiA2LFxuICAgICAgICAgICAgICBrZXk6ICdXbnZ5MlRqWXMwSGRaRk5haG1zS3c1Y2M5S0ViVzFuU3dyYURGbUd3QkR3PScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWVzc2FnZUtleXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGluZGV4OiAxLFxuICAgICAgICAgICAgICAgIGNpcGhlcktleTogJ3hWcmVFYlQ3VnRyeHM4NUp5R0JqNlkrVVdmdFF6NEg3MkY1a1dWNGN4cU09JyxcbiAgICAgICAgICAgICAgICBpdjogJ1RjUmFuU3haVldidUlxMHhEUkduRXc9PScsXG4gICAgICAgICAgICAgICAgbWFjS2V5OiAnNWZXOWFJS1hodHdXcC81YWxOSlVJWEluWmJ6dGYyeXd6UVNwWXJYb1EzQT0nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5kZXg6IDUsXG4gICAgICAgICAgICAgICAgY2lwaGVyS2V5OiAnQTk5SGpNNHBVdWdzUTUrMnY0OEZHVEdFaFpQb1c2d3pXOU1xU2MxMVFRND0nLFxuICAgICAgICAgICAgICAgIGl2OiAnYkU4RWkyUmthb3o0U0tSd2RHNCt0UT09JyxcbiAgICAgICAgICAgICAgICBtYWNLZXk6ICdUT1RkYkFmMGJDSE96Y1EzbEJhSW0zeXFtcEVxdnZsZEQwcVR1REZta0FJPScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHJlbW90ZVJlZ2lzdHJhdGlvbklkOiA0MjQzLFxuICAgICAgICBsb2NhbFJlZ2lzdHJhdGlvbklkOiAzNTU0LFxuICAgICAgICBhbGljZUJhc2VLZXk6ICdCVmVIdjVNQWJNZ0tlYW9PL0cxQ01CZHFoQzdibzdNdGM0RVd4STBvVDE5TicsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCByZWNvcmRDb3B5ID0gZ2V0UmVjb3JkQ29weShyZWNvcmQpO1xuXG4gICAgY29uc3QgYWN0dWFsID0gc2Vzc2lvblJlY29yZFRvUHJvdG9idWYocmVjb3JkLCBvdXJEYXRhKTtcblxuICAgIGFzc2VydC5kZWVwRXF1YWwoZXhwZWN0ZWQsIGFjdHVhbC50b0pTT04oKSk7XG5cbiAgICAvLyBXZSB3YW50IHRvIGVuc3VyZSB0aGF0IGNvbnZlcnNpb24gZG9lc24ndCBtb2RpZnkgaW5jb21pbmcgZGF0YVxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVjb3JkLCByZWNvcmRDb3B5KTtcbiAgfSk7XG5cbiAgaXQoJ0dlbmVyYXRlcyBleHBlY3RlZCBwcm90b2J1ZiB3aXRoIG1hbnkgb2xkIHJlY2VpdmVyIGNoYWlucycsICgpID0+IHtcbiAgICBjb25zdCByZWNvcmQ6IGFueSA9IHtcbiAgICAgIHNlc3Npb25zOiB7XG4gICAgICAgICdcXHUwMDA1V1x1MDA4N1x1MDBCRlx1MDA5M1xcdTAwMDBsXHUwMEM4XFxueVx1MDBBQVxcdTAwMGVcdTAwRkNtQjBcXHUwMDE3alx1MDA4NC5cdTAwREJcdTAwQTNcdTAwQjMtc1x1MDA4MVxcdTAwMTZcdTAwQzRcdTAwOEQoT19NJzoge1xuICAgICAgICAgIHJlZ2lzdHJhdGlvbklkOiA0MjQzLFxuICAgICAgICAgIGN1cnJlbnRSYXRjaGV0OiB7XG4gICAgICAgICAgICByb290S2V5OlxuICAgICAgICAgICAgICAnXHUwMENCXFx1MDAwMzUvXHUwMEZDXHUwMDlDXHUwMERBXHUwMDlBZ1xcdTAwMDNYZVx1MDBGQlx1MDBGQVxcdTAwMTBcdTAwOTdcXHUwMDAwXHUwMEZDXFx1MDAwMlx1MDBCNlx1MDBCQm81XFx1MDAxY1x1MDA4M1x1MDA5N1x1MDBBRFx1MDBBNVxcdTAwMDRcdTAwRDBcdTAwRkZcdTAwQUInLFxuICAgICAgICAgICAgbGFzdFJlbW90ZUVwaGVtZXJhbEtleTpcbiAgICAgICAgICAgICAgJ1xcdTAwMDVcXG43XFx1MDAxY21UXHUwMDg1YiFcdTAwRThcXHUwMDBlXHUwMENEXFx1MDAwN1xcdTAwMTZtNGdcdTAwQjNcXHUwMDA1XHUwMDkxXHUwMEZDXHUwMDlDSVlcdTAwOENcdTAwRUFcdTAwOERcXGJcXHUwMDExXHUwMENGXHUwMENFUHMnLFxuICAgICAgICAgICAgcHJldmlvdXNDb3VudGVyOiAyLFxuICAgICAgICAgICAgZXBoZW1lcmFsS2V5UGFpcjoge1xuICAgICAgICAgICAgICBwcml2S2V5OiAnXHUwMEU0XHUwMDk3XHUwMEUzXHUwMEM1XHUwMEFCXHUwMEFBXHUwMDhBXHUwMEUwXHUwMEY4XHUwMEVEKVx1MDA4OFx1MDBFMVxcdTAwMDVcdTAwQzFcIlx1MDA4Q3NKTS5cdTAwQThcdTAwQTFcXHUwMDEyclx1MDA5RChOXFxmOVx1MDBENFxcYicsXG4gICAgICAgICAgICAgIHB1YktleTogJ1xcdTAwMDUrXFx1MDAxMzRcdTAwOTZcdTAwQUIxXFx1MDAwMFxcdTAwMTNsICpcdTAwRTNLXHUwMEU3blx1MDBCQVx1MDBENlx1MDBGM1x1MDBCM1x1MDBFRFRTXHUwMDlGJlx1MDA4Q3tcdTAwRjkgXHUwMENEXHUwMDgyPjEnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluZGV4SW5mbzoge1xuICAgICAgICAgICAgcmVtb3RlSWRlbnRpdHlLZXk6ICdcXHUwMDA1XHUwMEE4XHUwMEE4XHUwMEE5XHUwMEZDXHUwMENGXHUwMEU0XHUwMDkwXHUwMEZBb1x1MDBFMVx1MDA4RFx1MDBBOVx1MDBFQU9cdTAwQTJcdTAwRTdcdTAwRkF4clx1MDBCQlx1MDBDNlx1MDBCRnJcdTAwOUNcdTAwQjJHXHUwMDlFXHUwMEY5aVx1MDA4MVRAJyxcbiAgICAgICAgICAgIGNsb3NlZDogLTEsXG4gICAgICAgICAgICBiYXNlS2V5OiAnXFx1MDAwNVdcdTAwODdcdTAwQkZcdTAwOTNcXHUwMDAwbFx1MDBDOFxcbnlcdTAwQUFcXHUwMDBlXHUwMEZDbUIwXFx1MDAxN2pcdTAwODQuXHUwMERCXHUwMEEzXHUwMEIzLXNcdTAwODFcXHUwMDE2XHUwMEM0XHUwMDhEKE9fTScsXG4gICAgICAgICAgICBiYXNlS2V5VHlwZTogMixcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9sZFJhdGNoZXRMaXN0OiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGFkZGVkOiAxNjA1NTc5OTU0OTYyLFxuICAgICAgICAgICAgICBlcGhlbWVyYWxLZXk6XG4gICAgICAgICAgICAgICAgJ1xcdTAwMDUwXHUwMEJCXHUwMEFEXFxuXHUwMEE4XHUwMENBQVx1MDA5MVx1MDBFNFxcdTAwMDZcdTAwQTJcdTAwQzdcdTAwQjRkXFx1MDAwMlxcdTAwMTI5fSVcdTAwRUV9XHUwMENFXHUwMEE5VGN9OFx1MDA4MFx1MDBCQ1xcdTAwMTFuXFxcXCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhZGRlZDogMTYwNTU4MDQwODI1MCxcbiAgICAgICAgICAgICAgZXBoZW1lcmFsS2V5OlxuICAgICAgICAgICAgICAgICdcXHUwMDA1Xlx1MDBDNFxcblx1MDBGMlx1MDA5Qlx1MDBDMFx1MDBBMlxcdTAwMDBcXHUwMDBmXHUwMEFEQVxcXFw2K1x1MDBEM1xcdTAwMWFcdTAwRjcmXHUwMEQ3JFx1MDBCOFx1MDBBQ1x1MDBEMVx1MDBENHw8cVNcdTAwRDZcXHUwMDFhXHUwMEQ5aCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhZGRlZDogMTYwNTU4MTE1NTE2NyxcbiAgICAgICAgICAgICAgZXBoZW1lcmFsS2V5OlxuICAgICAgICAgICAgICAgICdcXHUwMDA1PFxcdTAwMTdcdTAwRTUpXHUwMDlDUVx1MDBFMEZcdTAwRUVsMjlcdTAwOURcdTAwRDhcdTAwODNcXHUwMDFjXHUwMDk3IFx1MDBERCRcdTAwQjc7XHUwMDg0dWRcdTAwREZcXHUwMDA1SVx1MDA4RnxmXFx1MDAwNicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhZGRlZDogMTYwNTYzODUyNDU1NixcbiAgICAgICAgICAgICAgZXBoZW1lcmFsS2V5OiAnXFx1MDAwNVx1MDBBRmpcdTAwRjVcdTAwQjFcdTAwRTMwd1x1MDBEQlBcdTAwRDBcdTAwQzJTXHUwMENGXHUwMEI0O1x1MDBCNyZcXHUwMDExXHUwMEMyJVx1MDBCQVx1MDBBRlx1MDBCMFx1MDA5M1x1MDA3Rlx1MDBERFx1MDBEOVx1MDBGRVx1MDBFQVx1MDBGOThGJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGFkZGVkOiAxNjA2NzYxNzE5NzUzLFxuICAgICAgICAgICAgICBlcGhlbWVyYWxLZXk6ICdcXHUwMDA1XHUwMDlCXHUwMENFKFx1MDBGMD5cdTAwOTF4XHUwMDgyXHUwMDgzXHUwMEM0XHUwMEM4P1x1MDBGRXZ+XHUwMEVEa3ggXHUwMEUyXHUwMEFDLlx1MDBGMG9cdTAwOTlcdTAwRjJEZ1xcdTAwMWVcdTAwREYuXFxyJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGFkZGVkOiAxNjA2NzY2NTMwOTM1LFxuICAgICAgICAgICAgICBlcGhlbWVyYWxLZXk6XG4gICAgICAgICAgICAgICAgJ1xcdTAwMDVcXHUwMDE0QFx1MDA5RVx1MDBCRE1cdTAwODYsXHUwMEUwXFxiXHUwMEYzXHUwMEYzXHUwMDk5XHUwMDg1fVx1MDBBOGBpXHUwMEJGXFx1MDAwMFx1MDBBOUlcXHUwMDAxXHUwMEY0R1xcdTAwMWZcdTAwOTQ6XHUwMEQ5e1x1MDBGM1xcdTAwMDUgJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGFkZGVkOiAxNjA4MzI2MjkzNjU1LFxuICAgICAgICAgICAgICBlcGhlbWVyYWxLZXk6ICdcXHUwMDA1XHUwMEI1XHUwMEQyXFx1MDAxND9cdTAwQzhcdTAwQTIrXHUwMEQxUlx1MDBGN1x1MDBFNz8zXHUwMDlBRFx1MDBCQVx1MDA4M1xcXFxAMFx1MDA4Qlx1MDA4NlxcdTAwMDRcdTAwQUUrLVx1MDA3RlxcYlx1MDA4RVx1MDA4RnJcXHQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYWRkZWQ6IDE2MDk4NzExMDUzMTcsXG4gICAgICAgICAgICAgIGVwaGVtZXJhbEtleTpcbiAgICAgICAgICAgICAgICAnXFx1MDAwNVx1MDA4NFx1MDBCMUBcdTAwRUROXCJcdTAwQ0RcXHUwMDE5SFN7JFx1MDA4Rlx1MDBFRlxcdTAwMTdcdTAwOTRbXHUwMEQxXFxcXFxcdTAwMWEqOz5QXFx1MDAwMFxcdTAwMWZcXHUwMDBlSE5hXHUwMEY5KScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhZGRlZDogMTYxMTcwNzA2MzUyMyxcbiAgICAgICAgICAgICAgZXBoZW1lcmFsS2V5OiAnXFx1MDAwNVx1MDBERWdcdTAwOTRcdTAwQzVrXHUwMEU5XHUwMDgzXFx1MDAwMVxcdTAwMTNcdTAwOTdcdTAwQTFcdTAwRkZcdTAwRkJOWFx1MDBDOCg5XFx1MDAwNlx1MDBBNFx1MDA5MndcdTAwOThcdTAwQUUvXHUwMEQ4XHUwMEI5UmlcdTAwOEJKSScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhZGRlZDogMTYxMjIxMTE1NjM3MixcbiAgICAgICAgICAgICAgZXBoZW1lcmFsS2V5OiAnXFx1MDAwNTpbXHUwMERCT1x1MDA4OFx1MDA5NnBkXHUwMEFGIFx1MDBDMlx1MDBEOVx1MDBFN1xcdTAwMTBPXHUwMERFXHUwMDg3d3t9XHUwMEZEXFxid1x1MDA5NjlcdTAwQzBcdTAwREZcdTAwOUQ9XHUwMDkzXFx1MDAxNFonLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgICdcXHUwMDA1MFx1MDBCQlx1MDBBRFxcblx1MDBBOFx1MDBDQUFcdTAwOTFcdTAwRTRcXHUwMDA2XHUwMEEyXHUwMEM3XHUwMEI0ZFxcdTAwMDJcXHUwMDEyOX0lXHUwMEVFfVx1MDBDRVx1MDBBOVRjfThcdTAwODBcdTAwQkNcXHUwMDExblxcXFwnOiB7XG4gICAgICAgICAgICBtZXNzYWdlS2V5czoge30sXG4gICAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgICBjb3VudGVyOiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYWluVHlwZTogMixcbiAgICAgICAgICB9LFxuICAgICAgICAgICdcXHUwMDA1Xlx1MDBDNFxcblx1MDBGMlx1MDA5Qlx1MDBDMFx1MDBBMlxcdTAwMDBcXHUwMDBmXHUwMEFEQVxcXFw2K1x1MDBEM1xcdTAwMWFcdTAwRjcmXHUwMEQ3JFx1MDBCOFx1MDBBQ1x1MDBEMVx1MDBENHw8cVNcdTAwRDZcXHUwMDFhXHUwMEQ5aCc6IHtcbiAgICAgICAgICAgIG1lc3NhZ2VLZXlzOiB7fSxcbiAgICAgICAgICAgIGNoYWluS2V5OiB7XG4gICAgICAgICAgICAgIGNvdW50ZXI6IDIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhaW5UeXBlOiAyLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ1xcdTAwMDU8XFx1MDAxN1x1MDBFNSlcdTAwOUNRXHUwMEUwRlx1MDBFRWwyOVx1MDA5RFx1MDBEOFx1MDA4M1xcdTAwMWNcdTAwOTcgXHUwMEREJFx1MDBCNztcdTAwODR1ZFx1MDBERlxcdTAwMDVJXHUwMDhGfGZcXHUwMDA2Jzoge1xuICAgICAgICAgICAgbWVzc2FnZUtleXM6IHt9LFxuICAgICAgICAgICAgY2hhaW5LZXk6IHtcbiAgICAgICAgICAgICAgY291bnRlcjogMSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFpblR5cGU6IDIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnXFx1MDAwNVx1MDBBRmpcdTAwRjVcdTAwQjFcdTAwRTMwd1x1MDBEQlBcdTAwRDBcdTAwQzJTXHUwMENGXHUwMEI0O1x1MDBCNyZcXHUwMDExXHUwMEMyJVx1MDBCQVx1MDBBRlx1MDBCMFx1MDA5M1x1MDA3Rlx1MDBERFx1MDBEOVx1MDBGRVx1MDBFQVx1MDBGOThGJzoge1xuICAgICAgICAgICAgbWVzc2FnZUtleXM6IHtcbiAgICAgICAgICAgICAgJzAnOiAnQS97XHUwMEI0e1x1MDBEN2YoXHUwMEU4YVx1MDBGOHlcXFxcRFx1MDBCRVxcdTAwMDBcdTAwQzNIXHUwMEMwXHUwMEMxXHUwMEUyXHUwMEY0JFx1MDBFM1x1MDA5RlxcdTAwMWQzXHUwMDkyXHUwMEM0XHUwMEY2XHUwMEIwXHUwMEQ5JyxcbiAgICAgICAgICAgICAgJzEnOiBcIlx1MDBDQ1x1MDA4Mlx1MDBCNlx1MDA4Q0ZUfWR3OFx1MDBDNlx1MDBGRFx1MDBBQTdcdTAwQkJcdTAwREFcdTAwRDNcXHUwMDBmKidcdTAwRDRcdTAwOUFcdTAwQkI3XHUwMDhBXHUwMEEzXFx1MDAxOFxcdTAwMTJcdTAwRjFEXHUwMEUxXHUwMDgyXCIsXG4gICAgICAgICAgICAgICcyJzogJ1x1MDBDRVx1MDBFRlxcdTAwMTNcdTAwQThcdTAwQzFcdTAwRDVcdTAwQ0VrXFx1MDAwZVx1MDBGRFx1MDBFOFx1MDBDOFx1MDA4OFx1MDBGNyxcdTAwQkNcdTAwRUVcdTAwOTBcdTAwRkI1JVx1MDBEM1VcdTAwOUNcdTAwQTQ2X1x1MDBGNVx1MDBBMlxcdTAwMTlcdTAwRTRdJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgICBjb3VudGVyOiAzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYWluVHlwZTogMixcbiAgICAgICAgICB9LFxuICAgICAgICAgICdcXHUwMDA1XHUwMDlCXHUwMENFKFx1MDBGMD5cdTAwOTF4XHUwMDgyXHUwMDgzXHUwMEM0XHUwMEM4P1x1MDBGRXZ+XHUwMEVEa3ggXHUwMEUyXHUwMEFDLlx1MDBGMG9cdTAwOTlcdTAwRjJEZ1xcdTAwMWVcdTAwREYuXFxyJzoge1xuICAgICAgICAgICAgbWVzc2FnZUtleXM6IHtcbiAgICAgICAgICAgICAgJzQnOiAnXHUwMEE5fWpcdTAwOUJcdTAwQkZcdTAwOEFcdTAwQkNcXHUwMDE0cVxcdFx1MDA4QVx1MDBBNVx1MDA5NFx1MDA4RFx1MDBDMVx1MDA5NFx1MDBGMVxcdTAwMDM6IFx1MDBGN1x1MDBERXJcdTAwODNcdTAwRjFcdTAwRkJcdTAwRDRcdTAwQjVcdTAwOUQlXHUwMEM2XFx1MDAxYScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhaW5LZXk6IHtcbiAgICAgICAgICAgICAgY291bnRlcjogNixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFpblR5cGU6IDIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnXFx1MDAwNVxcdTAwMTRAXHUwMDlFXHUwMEJETVx1MDA4NixcdTAwRTBcXGJcdTAwRjNcdTAwRjNcdTAwOTlcdTAwODV9XHUwMEE4YGlcdTAwQkZcXHUwMDAwXHUwMEE5SVxcdTAwMDFcdTAwRjRHXFx1MDAxZlx1MDA5NDpcdTAwRDl7XHUwMEYzXFx1MDAwNSAnOiB7XG4gICAgICAgICAgICBtZXNzYWdlS2V5czoge30sXG4gICAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgICBjb3VudGVyOiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYWluVHlwZTogMixcbiAgICAgICAgICB9LFxuICAgICAgICAgICdcXHUwMDA1XHUwMEI1XHUwMEQyXFx1MDAxND9cdTAwQzhcdTAwQTIrXHUwMEQxUlx1MDBGN1x1MDBFNz8zXHUwMDlBRFx1MDBCQVx1MDA4M1xcXFxAMFx1MDA4Qlx1MDA4NlxcdTAwMDRcdTAwQUUrLVx1MDA3RlxcYlx1MDA4RVx1MDA4RnJcXHQnOiB7XG4gICAgICAgICAgICBtZXNzYWdlS2V5czoge30sXG4gICAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgICBjb3VudGVyOiAyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYWluVHlwZTogMixcbiAgICAgICAgICB9LFxuICAgICAgICAgICdcXHUwMDA1XHUwMDg0XHUwMEIxQFx1MDBFRE5cIlx1MDBDRFxcdTAwMTlIU3skXHUwMDhGXHUwMEVGXFx1MDAxN1x1MDA5NFtcdTAwRDFcXFxcXFx1MDAxYSo7PlBcXHUwMDAwXFx1MDAxZlxcdTAwMGVITmFcdTAwRjkpJzpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbWVzc2FnZUtleXM6IHtcbiAgICAgICAgICAgICAgICAnMCc6IFwiMWtcdTAwQ0ZcXHUwMDFjXHUwMEVEK1x1MDBBQjxcdTAwQkFcdTAwODJcXGInVlx1MDBDQyFcdTAwRDdcdTAwQkNcdTAwQUJQXHUwMEMzW1x1MDBGQ1x1MDBFMXk7bFx1MDA4MSdcdTAwODNcdTAwODBcdTAwODBcdTAwOEVcIixcbiAgICAgICAgICAgICAgICAnMic6ICdcdTAwRjZcXHUwMDA0NyVMLVx1MDA4NVdtKVx1MDA4Nlx1MDA5QlxcdTAwMWRcdTAwQTNcdTAwRTRcdTAwRTRcdTAwRUROXHUwMEY0Llx1MDBENDhcdTAwODVcdTAwQzNcdTAwQzk0clx1MDA5RFx1MDBCNFx1MDBGM14yJyxcbiAgICAgICAgICAgICAgICAnMyc6ICdcdTAwQThcdTAwQkZcdTAwQTZcdTAwOUI3VF1cXHUwMDFjXFx1MDAxY1x1MDA5M1x1MDBFMDQ6eFxcdTAwMTlcdTAwQkZcXHUwMDAyWVx1MDBDOVx1MDBDMFxcdTAwMWJcdTAwRTJqclx1MDBCOFx1MDBCQlx1MDBBNFx1MDBBMlx1MDA3RjAsKicsXG4gICAgICAgICAgICAgICAgJzUnOiAnXHUwMDk5XHUwMEE1XFx1MDAwNlx1MDBCN3FcdTAwOTNcdTAwN0ZnXHUwMEYzNFx1MDBGRVxcdTAwMTFcdTAwQUVcdTAwODhVNEZcdTAwN0ZcXHUwMDFjbFx1MDBBOVxcYlx1MDA4Q1x1MDBFNFx1MDBGNFx1MDA4NVx1MDBCQlx1MDBDQVx1MDBDN1x1MDBDNlx1MDA4RVsnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgICAgIGNvdW50ZXI6IDUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGNoYWluVHlwZTogMixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgJ1xcdTAwMDVcdTAwREVnXHUwMDk0XHUwMEM1a1x1MDBFOVx1MDA4M1xcdTAwMDFcXHUwMDEzXHUwMDk3XHUwMEExXHUwMEZGXHUwMEZCTlhcdTAwQzgoOVxcdTAwMDZcdTAwQTRcdTAwOTJ3XHUwMDk4XHUwMEFFL1x1MDBEOFx1MDBCOVJpXHUwMDhCSkknOiB7XG4gICAgICAgICAgICBtZXNzYWdlS2V5czoge1xuICAgICAgICAgICAgICAnMCc6IFwiXSc4XHUwMDhFV1x1MDBDNFxcdTAwMDdcdTAwODVuXHUwMDk4XHUwMEJBXHUwMEFEXHUwMEQ2e1x1MDBGRjddXHUwMEY0XHUwMEU0XHUwMEM0IVx1MDBFOVxcdTAwMGJ0QUBcdTAwQjBiXHUwMEEyKVxcdTAwMWFyXCIsXG4gICAgICAgICAgICAgICcyJzogJ1x1MDBBRFx1MDBDNGZHXHUwMEM3alx1MDBENnhcdTAwQzVcdTAwRjY6XHUwMEQ3Ulx1MDBENGkpTVxcdTAwMTlcdTAwQTlJRStcdTAwQThgXHUwMEZFS1x1MDBFMVx1MDA5NztcdTAwQTNcdTAwREJcdTAwQkQnLFxuICAgICAgICAgICAgICAnMyc6ICdcdTAwQTZcdTAwRDVoXHUwMEZEXHUwMEY4YFx1MDA4MFx1MDBENlx1MDA5M1BcdTAwRTlQcztcXHUwMDFlXFx1MDAwYkV9XHUwMEE4XHUwMEJGXHUwMDk2XHUwMEY1XFx1MDAwM3VcdTAwQUFcdTAwRjhcdTAwRTVcXHUwMDA2MihcdTAwRDdHJyxcbiAgICAgICAgICAgICAgJzknOiAnXHUwMENGXlx1MDA5NzxcdTAwOTFcdTAwRDVcdTAwRkFcdTAwQ0NcdTAwODNcXHUwMDAxaVx1MDBCNDtcdTAwRUZ0XHUwMEJDXFx1MDAxYVx1MDBEMT9cdTAwRUZcXHUwMDE0bFx1MDBFM1x1MDBFMFx1MDBDNlx1MDBCOFx1MDA4M1xcdTAwMWE4XHUwMDkzL20nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYWluS2V5OiB7XG4gICAgICAgICAgICAgIGNvdW50ZXI6IDExLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYWluVHlwZTogMixcbiAgICAgICAgICB9LFxuICAgICAgICAgICdcXHUwMDA1OltcdTAwREJPXHUwMDg4XHUwMDk2cGRcdTAwQUYgXHUwMEMyXHUwMEQ5XHUwMEU3XFx1MDAxME9cdTAwREVcdTAwODd3e31cdTAwRkRcXGJ3XHUwMDk2OVx1MDBDMFx1MDBERlx1MDA5RD1cdTAwOTNcXHUwMDE0Wic6IHtcbiAgICAgICAgICAgIG1lc3NhZ2VLZXlzOiB7XG4gICAgICAgICAgICAgICcwJzogJyFcXHUwMDExNVxcXFxXflx1MDA4RnxcdTAwQUZvYTJcXHUwMDFlXFx1MDAwNFZcdTAwOUU4XHUwMENGXHUwMEExZH1cXHUwMDFiXFx1MDAxYTheUVx1MDBENmZ2XHUwMEQ1XCJcdTAwOEInLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYWluS2V5OiB7XG4gICAgICAgICAgICAgIGNvdW50ZXI6IDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhaW5UeXBlOiAyLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ1xcdTAwMDVcXG43XFx1MDAxY21UXHUwMDg1YiFcdTAwRThcXHUwMDBlXHUwMENEXFx1MDAwN1xcdTAwMTZtNGdcdTAwQjNcXHUwMDA1XHUwMDkxXHUwMEZDXHUwMDlDSVlcdTAwOENcdTAwRUFcdTAwOERcXGJcXHUwMDExXHUwMENGXHUwMENFUHMnOiB7XG4gICAgICAgICAgICBtZXNzYWdlS2V5czoge1xuICAgICAgICAgICAgICAnMCc6ICdcdTAwQ0VnXHUwMEYzXHUwMEFGXHUwMDkxMlx1MDBFMHZcdTAwRjFcdTAwOTFYX1x1MDBGNVxcdTAwMTRcdTAwOTZcdTAwQzdcXHUwMDAwXHUwMEY2bFxcdTAwMWY0Sj5cdTAwOENcdTAwRDBcdTAwQ0Z7YC1cdTAwREM1XHUwMEE2JyxcbiAgICAgICAgICAgICAgJzQnOiAnY1x1MDBCRjxcdTAwQjVcdTAwRTJcdTAwQkNYXHUwMEI1XHUwMDgzIVx1MDBEOVx1MDBBRlx1MDBCNVx1MDBBRVtcdTAwOTduPFx1MDA5RVx1MDBFQ1x1MDBFRVx1MDBGQWNvXHUwMEU1XHUwMEE5blxcdTAwMTNcImxdXHUwMEQwJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgICBjb3VudGVyOiA1LFxuICAgICAgICAgICAgICBrZXk6ICdae1x1MDBGMlx1MDBEOThcdTAwRDhcdTAwQjNBXHUwMEREZFNaXHUwMDg2a1xcblx1MDBDM1x1MDA5N1xcdTAwMWNcdTAwRjRcdTAwQTFcXHUwMDFiW1lcdTAwRDJcdTAwQzJcdTAwQjZcdTAwODNcXHUwMDE2YVx1MDBCMFxcdTAwMDQ8JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFpblR5cGU6IDIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnXFx1MDAwNStcXHUwMDEzNFx1MDA5Nlx1MDBBQjFcXHUwMDAwXFx1MDAxM2wgKlx1MDBFM0tcdTAwRTduXHUwMEJBXHUwMEQ2XHUwMEYzXHUwMEIzXHUwMEVEVFNcdTAwOUYmXHUwMDhDe1x1MDBGOSBcdTAwQ0RcdTAwODI+MSc6IHtcbiAgICAgICAgICAgIG1lc3NhZ2VLZXlzOiB7fSxcbiAgICAgICAgICAgIGNoYWluS2V5OiB7XG4gICAgICAgICAgICAgIGNvdW50ZXI6IC0xLFxuICAgICAgICAgICAgICBrZXk6IFwiXHUwMEU4Qj83XFx1MDAwZlx1MDBBRlxcdTAwMWVcXHUwMDEwXHUwMEE4XFx1MDAwN1x1MDA4Rn06XHUwMDkzP1x1MDA5MFx1MDBCOVxcdTAwMTAkXFxcXFx1MDBFQn5cdTAwQUFcXHUwMDAwZ00wXHUwMEQ1XHUwMDk4J1x1MDBBM1xcdTAwMDVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFpblR5cGU6IDEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB2ZXJzaW9uOiAndjEnLFxuICAgIH07XG5cbiAgICBjb25zdCBleHBlY3RlZCA9IHtcbiAgICAgIGN1cnJlbnRTZXNzaW9uOiB7XG4gICAgICAgIHNlc3Npb25WZXJzaW9uOiAzLFxuICAgICAgICBsb2NhbElkZW50aXR5UHVibGljOiAnQmFpb3FmemMvNUpENmIrR05xYXBQb3VmNmVISzd4cjl5bkxKSG52bCs0NDQnLFxuICAgICAgICByZW1vdGVJZGVudGl0eVB1YmxpYzogJ0JhaW9xZnpQNUpENmIrR05xZXBQb3VmNmVISzd4cjl5bkxKSG52bHBnVlJBJyxcbiAgICAgICAgcm9vdEtleTogJ3l3TTFML3ljMnBwbkExaGwrL29RbHdEOEFyYTdielVjZzVldHBRVFEvNnM9JyxcbiAgICAgICAgcHJldmlvdXNDb3VudGVyOiAzLFxuICAgICAgICBzZW5kZXJDaGFpbjoge1xuICAgICAgICAgIHNlbmRlclJhdGNoZXRLZXk6ICdCU3NUTkphck1RQVRiQ0FxNDB2bmJyclc4N1B0VkZPZkpveDcrU0ROZ2o0eCcsXG4gICAgICAgICAgc2VuZGVyUmF0Y2hldEtleVByaXZhdGU6XG4gICAgICAgICAgICAnNUpmanhhdXFpdUQ0N1NtSTRRWEJJb3h6U2swdXFLRVNjcDBvVGd3NTFBZz0nLFxuICAgICAgICAgIGNoYWluS2V5OiB7XG4gICAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgICAgIGtleTogJzZFSS9Odyt2SGhDb0I0OTlPcE0va0xrUUpGenJmcW9BWjAwdzFaZ25vd1U9JyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICByZWNlaXZlckNoYWluczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNlbmRlclJhdGNoZXRLZXk6ICdCUW8zSEcxVWhXSWg2QTdOQnhadE5HZXpCWkg4bkVsWmpPcU5DQkhQemxCeicsXG4gICAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgICBpbmRleDogNixcbiAgICAgICAgICAgICAga2V5OiAnV252eTJUallzMEhkWkZOYWhtc0t3NWNjOUtFYlcxblN3cmFERm1Hd0JEdz0nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1lc3NhZ2VLZXlzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbmRleDogMSxcbiAgICAgICAgICAgICAgICBjaXBoZXJLZXk6ICd4VnJlRWJUN1Z0cnhzODVKeUdCajZZK1VXZnRRejRINzJGNWtXVjRjeHFNPScsXG4gICAgICAgICAgICAgICAgaXY6ICdUY1JhblN4WlZXYnVJcTB4RFJHbkV3PT0nLFxuICAgICAgICAgICAgICAgIG1hY0tleTogJzVmVzlhSUtYaHR3V3AvNWFsTkpVSVhJblpienRmMnl3elFTcFlyWG9RM0E9JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGluZGV4OiA1LFxuICAgICAgICAgICAgICAgIGNpcGhlcktleTogJ0E5OUhqTTRwVXVnc1E1KzJ2NDhGR1RHRWhaUG9XNnd6VzlNcVNjMTFRUTQ9JyxcbiAgICAgICAgICAgICAgICBpdjogJ2JFOEVpMlJrYW96NFNLUndkRzQrdFE9PScsXG4gICAgICAgICAgICAgICAgbWFjS2V5OiAnVE9UZGJBZjBiQ0hPemNRM2xCYUltM3lxbXBFcXZ2bGREMHFUdURGbWtBST0nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNlbmRlclJhdGNoZXRLZXk6ICdCVHBiMjArSWxuQmtyeURDMmVjUVQ5NkhkM3Q5L1FoM2xqbkEzNTA5a3hSYScsXG4gICAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgICBpbmRleDogMixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtZXNzYWdlS2V5czogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5kZXg6IDEsXG4gICAgICAgICAgICAgICAgY2lwaGVyS2V5OiAnYUFiU3o1ak9hZ1VUZ1FLbzNhcUV4Y2w4aHlaQU5yWStIdnJMYy9PZ29RST0nLFxuICAgICAgICAgICAgICAgIGl2OiAnSmN5THp3MGZMNjdLZDR0ZkdKMk9VUT09JyxcbiAgICAgICAgICAgICAgICBtYWNLZXk6ICdkdCtSWGVhZUl4K0FTcktTazdENGd1d1RFMUlVWWwzTGlMRzlhSTRzWm04PScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2VuZGVyUmF0Y2hldEtleTogJ0JkNW5sTVZyNllNQkU1ZWgvL3RPV01nb09RYWtrbmVZcmkvWXVWSnBpMHBKJyxcbiAgICAgICAgICAgIGNoYWluS2V5OiB7XG4gICAgICAgICAgICAgIGluZGV4OiAxMixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtZXNzYWdlS2V5czogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5kZXg6IDEsXG4gICAgICAgICAgICAgICAgY2lwaGVyS2V5OiAncGpjWS83TW9SR3RHSHdOTi9FOEtxb0tDeC81bWRLcDBWQ21ybWtCQWorTT0nLFxuICAgICAgICAgICAgICAgIGl2OiAnZUJwQUVvRGo5NE5zSTB2c2YrNEhydz09JyxcbiAgICAgICAgICAgICAgICBtYWNLZXk6ICdQN0p6MktrT1hDN0IwbUxrejdKYVUvZDB2ZGFZWmpBZnVLSjg2eFhCMTlVPScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbmRleDogMyxcbiAgICAgICAgICAgICAgICBjaXBoZXJLZXk6ICdFR0RqMHNjLzFUTXRTeWNZRENycFpkbDZVQ3pDekR1TXdsQXZWVkFzMk9RPScsXG4gICAgICAgICAgICAgICAgaXY6ICdBKzFPQTlNMlo4Z0dsQVJ0QTIzMVJBPT0nLFxuICAgICAgICAgICAgICAgIG1hY0tleTogJ29RL1BReEpERDUycXJrU2hTeTZoRDNmQVNFZmhXbmxtWTNxc1NQdU9ZL289JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGluZGV4OiA0LFxuICAgICAgICAgICAgICAgIGNpcGhlcktleTogJ1dNM1VVSUxHZEVDWGpPOGpaYkJWWXJQQW56Uk04UmRpVStQU0F5SFVUNVU9JyxcbiAgICAgICAgICAgICAgICBpdjogJ0NXdVFJdUl5R3FBcEE2TVFnbkRSNVE9PScsXG4gICAgICAgICAgICAgICAgbWFjS2V5OiAnaGcrL3hyT0tGem4yZUsxQm5KNUMrRVJzRmdhV0FPYUJ4UVRjNHEzYi9nOD0nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5kZXg6IDEwLFxuICAgICAgICAgICAgICAgIGNpcGhlcktleTogJ1QwY0JhR0FzZUZ6K3MybmpWcjRzcWJGZjFwVUg1UG9QdmRNQm9peklUK1k9JyxcbiAgICAgICAgICAgICAgICBpdjogJ2hrVDJrcWdxaGxPUkFqQkk3WkRzaWc9PScsXG4gICAgICAgICAgICAgICAgbWFjS2V5OiAndUUvRGQ0V1NRV2tZTlJnb2xjUXRPZCtIcGFIUDV3R29nTXpFcmtaaitBUT0nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNlbmRlclJhdGNoZXRLZXk6ICdCWVN4UU8xT0lzMFpTRk43SkkvdkY1UmIwVndhS2pzK1VBQWZEa2hPWWZrcCcsXG4gICAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgICBpbmRleDogNixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtZXNzYWdlS2V5czogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5kZXg6IDEsXG4gICAgICAgICAgICAgICAgY2lwaGVyS2V5OiAnbmk2WGhSQ29MRnVkMlprMXpvZWw0aGU4em5ERy90K1RXVkJBU08zNUdsUT0nLFxuICAgICAgICAgICAgICAgIGl2OiAnckt5L3N4TG1RNGoyRFN4YkRaVE81QT09JyxcbiAgICAgICAgICAgICAgICBtYWNLZXk6ICdNS3hzMjlBbU5PbnA2elpPc0licm1TcWNWWFlKTDAxa3V2SWFxd2pSTnZRPScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbmRleDogMyxcbiAgICAgICAgICAgICAgICBjaXBoZXJLZXk6ICdQcDdHT0Q3MnZmanZiM3F4N3FtMVlWb1pLUHFueVhDMnVxQ3Q4OVpBL3ljPScsXG4gICAgICAgICAgICAgICAgaXY6ICdOdURmNWlNMGxEL28wWXpqSFpvNG1BPT0nLFxuICAgICAgICAgICAgICAgIG1hY0tleTogJ0prQlppYXhtd0ZyMXhoL3p6VFFFNm1sVUlWSm1TSXJxU0lRVmxhb1R6N009JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGluZGV4OiA0LFxuICAgICAgICAgICAgICAgIGNpcGhlcktleTogJ3pPUldSdkpFVWUyRjRVbkJ3ZTJZUnFQUzRHelVGRTFsV3B0Y3FNeldmMlU9JyxcbiAgICAgICAgICAgICAgICBpdjogJ09nN2pGOUpKaGlMdFBEOFcyT2dUbnc9PScsXG4gICAgICAgICAgICAgICAgbWFjS2V5OiAnTHhiY2w5Zkw5eDVKYXZ0ZHo3dE9WN0JicjhhcjNyV3hTSXNpMUZvY3Y5dz0nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5kZXg6IDYsXG4gICAgICAgICAgICAgICAgY2lwaGVyS2V5OiAnVC9UWk53MDQrWmZCMHMybHRPVDlxYnpSUG5DRm43VnZ4cUhIQXZPUkZ4MD0nLFxuICAgICAgICAgICAgICAgIGl2OiAnRHBPQUs3N0VySXIyUUZUc1JuZk9ldz09JyxcbiAgICAgICAgICAgICAgICBtYWNLZXk6ICdrL2Z4YWZlcEJpQTBkUU9UcG9oTCtFS20yKzFqcEZ3UmlnVld0MDJVL0pnPScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2VuZGVyUmF0Y2hldEtleTogJ0JiWFNGRC9Jb2l2UlV2Zm5Qek9hUkxxRFhFQXdpNFlFcmlzdGZ3aU9qM0lKJyxcbiAgICAgICAgICAgIGNoYWluS2V5OiB7XG4gICAgICAgICAgICAgIGluZGV4OiAzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNlbmRlclJhdGNoZXRLZXk6ICdCUlJBbnIxTmhpemdDUFB6bVlWOXFHQnB2d0NwU1FIMFJ4K1VPdGw3OHdVZycsXG4gICAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgICBpbmRleDogMSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZW5kZXJSYXRjaGV0S2V5OiAnQlp2T0tQQStrWGlDZzhUSVAvNTJmdTFyZUNEaXJDN3diNW55UkdjZTN5NE4nLFxuICAgICAgICAgICAgY2hhaW5LZXk6IHtcbiAgICAgICAgICAgICAgaW5kZXg6IDcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWVzc2FnZUtleXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGluZGV4OiA1LFxuICAgICAgICAgICAgICAgIGNpcGhlcktleTogJ1BCNDRwbFB6SGFtL28yTFpueWpvOEhMUnVBdnAzdUU2aXhPNStHVUNVc0E9JyxcbiAgICAgICAgICAgICAgICBpdjogJ0pCYmdSYjEwWC9kRHNuMEdLZzY5ZEE9PScsXG4gICAgICAgICAgICAgICAgbWFjS2V5OiAnaktWMVJtbGIwSEFUWkhuZExESU1PTlBnT1hxVDNrd0UxUUVzdHhYVmUrbz0nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNlbmRlclJhdGNoZXRLZXk6ICdCYTlxOWJIak1IZmJVTkRDVTgrME83Y21FY0lsdXErd2szL2QyZjdxK1RoRycsXG4gICAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgICBpbmRleDogNCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtZXNzYWdlS2V5czogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5kZXg6IDEsXG4gICAgICAgICAgICAgICAgY2lwaGVyS2V5OiAnNGJ1T0pTcVJGSXBXd280cFhZd1FUQ1R4YXM0K2FtQkxwWi9DdUVXWGJQZz0nLFxuICAgICAgICAgICAgICAgIGl2OiAnOXVEOEVDTy9meHRLMjhPdmxDRlh1UT09JyxcbiAgICAgICAgICAgICAgICBtYWNLZXk6ICdMSTBaU2RYN2srY2Q1YlRnczZYRVlZSVdZKzJjeGhXSTk3dkFHRnBvWkljPScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbmRleDogMixcbiAgICAgICAgICAgICAgICBjaXBoZXJLZXk6ICdvTmJGeGN5MmVlYlVRaG9EK05MZjEyZmdrWHpobjRFVTBQZ3FuMWJWS09zPScsXG4gICAgICAgICAgICAgICAgaXY6ICdvMW1tNHJDTjZRMEoxaEE3STVqamdBPT0nLFxuICAgICAgICAgICAgICAgIG1hY0tleTogJ2RmSEIxNHNDSWR1bitSYUtuQW95YVFQQzZxUkRNZXdqcU9JRFpHbW4zRXM9JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGluZGV4OiAzLFxuICAgICAgICAgICAgICAgIGNpcGhlcktleTogJy9hVTN6WDJJZEE5MUdBY0IrN0g1N3l6UmUrNkNnWjYxdGxXNE0vcmtDSkk9JyxcbiAgICAgICAgICAgICAgICBpdjogJ3Y4VkpGNDY3UUREMVpDcjFKRDhwYlE9PScsXG4gICAgICAgICAgICAgICAgbWFjS2V5OiAnTWpLNWlZamhadFFUSjRFdTMrcUdPZFl4bjBHMjNFR1J0VGN1c2J6eTlPQT0nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNlbmRlclJhdGNoZXRLZXk6ICdCVHdYNVNtY1VlQkc3bXd5T1ozWWd4eVhJTjBrdHp1RWRXVGZCVW1QZkdZRycsXG4gICAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgICBpbmRleDogMixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzZW5kZXJSYXRjaGV0S2V5OiAnQlY3RUN2S2J3S0lBRDYxQlhEWXIweHIzSnRja3VLelIxSHc4Y1ZQV0d0bG8nLFxuICAgICAgICAgICAgY2hhaW5LZXk6IHtcbiAgICAgICAgICAgICAgaW5kZXg6IDMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2VuZGVyUmF0Y2hldEtleTogJ0JUQzdyUXFveWtHUjVBYWl4N1JrQWhJNWZTWHVmYzZwVkdOOU9JQzhFVzVjJyxcbiAgICAgICAgICAgIGNoYWluS2V5OiB7XG4gICAgICAgICAgICAgIGluZGV4OiAxLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICByZW1vdGVSZWdpc3RyYXRpb25JZDogNDI0MyxcbiAgICAgICAgbG9jYWxSZWdpc3RyYXRpb25JZDogMzU1NCxcbiAgICAgICAgYWxpY2VCYXNlS2V5OiAnQlZlSHY1TUFiTWdLZWFvTy9HMUNNQmRxaEM3Ym83TXRjNEVXeEkwb1QxOU4nLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgcmVjb3JkQ29weSA9IGdldFJlY29yZENvcHkocmVjb3JkKTtcblxuICAgIGNvbnN0IGFjdHVhbCA9IHNlc3Npb25SZWNvcmRUb1Byb3RvYnVmKHJlY29yZCwgb3VyRGF0YSk7XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsKGV4cGVjdGVkLCBhY3R1YWwudG9KU09OKCkpO1xuXG4gICAgLy8gV2Ugd2FudCB0byBlbnN1cmUgdGhhdCBjb252ZXJzaW9uIGRvZXNuJ3QgbW9kaWZ5IGluY29taW5nIGRhdGFcbiAgICBhc3NlcnQuZGVlcEVxdWFsKHJlY29yZCwgcmVjb3JkQ29weSk7XG4gIH0pO1xuXG4gIGl0KCdHZW5lcmF0ZXMgZXhwZWN0ZWQgcHJvdG9idWYgd2l0aCBwZW5kaW5nIHByZWtleScsICgpID0+IHtcbiAgICBjb25zdCByZWNvcmQ6IGFueSA9IHtcbiAgICAgIHNlc3Npb25zOiB7XG4gICAgICAgICdcXHUwMDA1V1x1MDA4N1x1MDBCRlx1MDA5M1xcdTAwMDBsXHUwMEM4XFxueVx1MDBBQVxcdTAwMGVcdTAwRkNtQjBcXHUwMDE3alx1MDA4NC5cdTAwREJcdTAwQTNcdTAwQjMtc1x1MDA4MVxcdTAwMTZcdTAwQzRcdTAwOEQoT19NJzoge1xuICAgICAgICAgIHJlZ2lzdHJhdGlvbklkOiA0MjQzLFxuICAgICAgICAgIGN1cnJlbnRSYXRjaGV0OiB7XG4gICAgICAgICAgICByb290S2V5OlxuICAgICAgICAgICAgICAnXHUwMENCXFx1MDAwMzUvXHUwMEZDXHUwMDlDXHUwMERBXHUwMDlBZ1xcdTAwMDNYZVx1MDBGQlx1MDBGQVxcdTAwMTBcdTAwOTdcXHUwMDAwXHUwMEZDXFx1MDAwMlx1MDBCNlx1MDBCQm81XFx1MDAxY1x1MDA4M1x1MDA5N1x1MDBBRFx1MDBBNVxcdTAwMDRcdTAwRDBcdTAwRkZcdTAwQUInLFxuICAgICAgICAgICAgbGFzdFJlbW90ZUVwaGVtZXJhbEtleTpcbiAgICAgICAgICAgICAgJ1xcdTAwMDVcXG43XFx1MDAxY21UXHUwMDg1YiFcdTAwRThcXHUwMDBlXHUwMENEXFx1MDAwN1xcdTAwMTZtNGdcdTAwQjNcXHUwMDA1XHUwMDkxXHUwMEZDXHUwMDlDSVlcdTAwOENcdTAwRUFcdTAwOERcXGJcXHUwMDExXHUwMENGXHUwMENFUHMnLFxuICAgICAgICAgICAgcHJldmlvdXNDb3VudGVyOiAyLFxuICAgICAgICAgICAgZXBoZW1lcmFsS2V5UGFpcjoge1xuICAgICAgICAgICAgICBwcml2S2V5OiAnXHUwMEU0XHUwMDk3XHUwMEUzXHUwMEM1XHUwMEFCXHUwMEFBXHUwMDhBXHUwMEUwXHUwMEY4XHUwMEVEKVx1MDA4OFx1MDBFMVxcdTAwMDVcdTAwQzFcIlx1MDA4Q3NKTS5cdTAwQThcdTAwQTFcXHUwMDEyclx1MDA5RChOXFxmOVx1MDBENFxcYicsXG4gICAgICAgICAgICAgIHB1YktleTogJ1xcdTAwMDUrXFx1MDAxMzRcdTAwOTZcdTAwQUIxXFx1MDAwMFxcdTAwMTNsICpcdTAwRTNLXHUwMEU3blx1MDBCQVx1MDBENlx1MDBGM1x1MDBCM1x1MDBFRFRTXHUwMDlGJlx1MDA4Q3tcdTAwRjkgXHUwMENEXHUwMDgyPjEnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluZGV4SW5mbzoge1xuICAgICAgICAgICAgcmVtb3RlSWRlbnRpdHlLZXk6ICdcXHUwMDA1XHUwMEE4XHUwMEE4XHUwMEE5XHUwMEZDXHUwMENGXHUwMEU0XHUwMDkwXHUwMEZBb1x1MDBFMVx1MDA4RFx1MDBBOVx1MDBFQU9cdTAwQTJcdTAwRTdcdTAwRkF4clx1MDBCQlx1MDBDNlx1MDBCRnJcdTAwOUNcdTAwQjJHXHUwMDlFXHUwMEY5aVx1MDA4MVRAJyxcbiAgICAgICAgICAgIGNsb3NlZDogLTEsXG4gICAgICAgICAgICBiYXNlS2V5OiAnXFx1MDAwNVdcdTAwODdcdTAwQkZcdTAwOTNcXHUwMDAwbFx1MDBDOFxcbnlcdTAwQUFcXHUwMDBlXHUwMEZDbUIwXFx1MDAxN2pcdTAwODQuXHUwMERCXHUwMEEzXHUwMEIzLXNcdTAwODFcXHUwMDE2XHUwMEM0XHUwMDhEKE9fTScsXG4gICAgICAgICAgICBiYXNlS2V5VHlwZTogMixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBlbmRpbmdQcmVLZXk6IHtcbiAgICAgICAgICAgIGJhc2VLZXk6ICdcXHUwMDA1dWlcdTAwQTlcdTAwRkNcdTAwQ0ZcdTAwRTRcdTAwOTBcdTAwRkFvXHUwMEUxXHUwMDhEXHUwMEE5XHUwMEVBT1x1MDBBMlx1MDBFN1x1MDBGQXhyXHUwMEJCXHUwMEM2XHUwMEJGclx1MDA5Q1x1MDBCMkdcdTAwOUVcdTAwRjlpXHUwMDgxVEAnLFxuICAgICAgICAgICAgc2lnbmVkS2V5SWQ6IDM4LFxuICAgICAgICAgICAgcHJlS2V5SWQ6IDIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbGRSYXRjaGV0TGlzdDogW10sXG4gICAgICAgICAgJ1xcdTAwMDVcXG43XFx1MDAxY21UXHUwMDg1YiFcdTAwRThcXHUwMDBlXHUwMENEXFx1MDAwN1xcdTAwMTZtNGdcdTAwQjNcXHUwMDA1XHUwMDkxXHUwMEZDXHUwMDlDSVlcdTAwOENcdTAwRUFcdTAwOERcXGJcXHUwMDExXHUwMENGXHUwMENFUHMnOiB7XG4gICAgICAgICAgICBtZXNzYWdlS2V5czoge1xuICAgICAgICAgICAgICAnMCc6ICdcdTAwQ0VnXHUwMEYzXHUwMEFGXHUwMDkxMlx1MDBFMHZcdTAwRjFcdTAwOTFYX1x1MDBGNVxcdTAwMTRcdTAwOTZcdTAwQzdcXHUwMDAwXHUwMEY2bFxcdTAwMWY0Sj5cdTAwOENcdTAwRDBcdTAwQ0Z7YC1cdTAwREM1XHUwMEE2JyxcbiAgICAgICAgICAgICAgJzQnOiAnY1x1MDBCRjxcdTAwQjVcdTAwRTJcdTAwQkNYXHUwMEI1XHUwMDgzIVx1MDBEOVx1MDBBRlx1MDBCNVx1MDBBRVtcdTAwOTduPFx1MDA5RVx1MDBFQ1x1MDBFRVx1MDBGQWNvXHUwMEU1XHUwMEE5blxcdTAwMTNcImxdXHUwMEQwJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgICBjb3VudGVyOiA1LFxuICAgICAgICAgICAgICBrZXk6ICdae1x1MDBGMlx1MDBEOThcdTAwRDhcdTAwQjNBXHUwMEREZFNaXHUwMDg2a1xcblx1MDBDM1x1MDA5N1xcdTAwMWNcdTAwRjRcdTAwQTFcXHUwMDFiW1lcdTAwRDJcdTAwQzJcdTAwQjZcdTAwODNcXHUwMDE2YVx1MDBCMFxcdTAwMDQ8JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFpblR5cGU6IDIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnXFx1MDAwNStcXHUwMDEzNFx1MDA5Nlx1MDBBQjFcXHUwMDAwXFx1MDAxM2wgKlx1MDBFM0tcdTAwRTduXHUwMEJBXHUwMEQ2XHUwMEYzXHUwMEIzXHUwMEVEVFNcdTAwOUYmXHUwMDhDe1x1MDBGOSBcdTAwQ0RcdTAwODI+MSc6IHtcbiAgICAgICAgICAgIG1lc3NhZ2VLZXlzOiB7fSxcbiAgICAgICAgICAgIGNoYWluS2V5OiB7XG4gICAgICAgICAgICAgIGNvdW50ZXI6IC0xLFxuICAgICAgICAgICAgICBrZXk6IFwiXHUwMEU4Qj83XFx1MDAwZlx1MDBBRlxcdTAwMWVcXHUwMDEwXHUwMEE4XFx1MDAwN1x1MDA4Rn06XHUwMDkzP1x1MDA5MFx1MDBCOVxcdTAwMTAkXFxcXFx1MDBFQn5cdTAwQUFcXHUwMDAwZ00wXHUwMEQ1XHUwMDk4J1x1MDBBM1xcdTAwMDVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFpblR5cGU6IDEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB2ZXJzaW9uOiAndjEnLFxuICAgIH07XG5cbiAgICBjb25zdCBleHBlY3RlZCA9IHtcbiAgICAgIGN1cnJlbnRTZXNzaW9uOiB7XG4gICAgICAgIHNlc3Npb25WZXJzaW9uOiAzLFxuICAgICAgICBsb2NhbElkZW50aXR5UHVibGljOiAnQmFpb3FmemMvNUpENmIrR05xYXBQb3VmNmVISzd4cjl5bkxKSG52bCs0NDQnLFxuICAgICAgICByZW1vdGVJZGVudGl0eVB1YmxpYzogJ0JhaW9xZnpQNUpENmIrR05xZXBQb3VmNmVISzd4cjl5bkxKSG52bHBnVlJBJyxcbiAgICAgICAgcm9vdEtleTogJ3l3TTFML3ljMnBwbkExaGwrL29RbHdEOEFyYTdielVjZzVldHBRVFEvNnM9JyxcbiAgICAgICAgcHJldmlvdXNDb3VudGVyOiAzLFxuICAgICAgICBzZW5kZXJDaGFpbjoge1xuICAgICAgICAgIHNlbmRlclJhdGNoZXRLZXk6ICdCU3NUTkphck1RQVRiQ0FxNDB2bmJyclc4N1B0VkZPZkpveDcrU0ROZ2o0eCcsXG4gICAgICAgICAgc2VuZGVyUmF0Y2hldEtleVByaXZhdGU6XG4gICAgICAgICAgICAnNUpmanhhdXFpdUQ0N1NtSTRRWEJJb3h6U2swdXFLRVNjcDBvVGd3NTFBZz0nLFxuICAgICAgICAgIGNoYWluS2V5OiB7XG4gICAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgICAgIGtleTogJzZFSS9Odyt2SGhDb0I0OTlPcE0va0xrUUpGenJmcW9BWjAwdzFaZ25vd1U9JyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICByZWNlaXZlckNoYWluczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNlbmRlclJhdGNoZXRLZXk6ICdCUW8zSEcxVWhXSWg2QTdOQnhadE5HZXpCWkg4bkVsWmpPcU5DQkhQemxCeicsXG4gICAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgICBpbmRleDogNixcbiAgICAgICAgICAgICAga2V5OiAnV252eTJUallzMEhkWkZOYWhtc0t3NWNjOUtFYlcxblN3cmFERm1Hd0JEdz0nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1lc3NhZ2VLZXlzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbmRleDogMSxcbiAgICAgICAgICAgICAgICBjaXBoZXJLZXk6ICd4VnJlRWJUN1Z0cnhzODVKeUdCajZZK1VXZnRRejRINzJGNWtXVjRjeHFNPScsXG4gICAgICAgICAgICAgICAgaXY6ICdUY1JhblN4WlZXYnVJcTB4RFJHbkV3PT0nLFxuICAgICAgICAgICAgICAgIG1hY0tleTogJzVmVzlhSUtYaHR3V3AvNWFsTkpVSVhJblpienRmMnl3elFTcFlyWG9RM0E9JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGluZGV4OiA1LFxuICAgICAgICAgICAgICAgIGNpcGhlcktleTogJ0E5OUhqTTRwVXVnc1E1KzJ2NDhGR1RHRWhaUG9XNnd6VzlNcVNjMTFRUTQ9JyxcbiAgICAgICAgICAgICAgICBpdjogJ2JFOEVpMlJrYW96NFNLUndkRzQrdFE9PScsXG4gICAgICAgICAgICAgICAgbWFjS2V5OiAnVE9UZGJBZjBiQ0hPemNRM2xCYUltM3lxbXBFcXZ2bGREMHFUdURGbWtBST0nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBwZW5kaW5nUHJlS2V5OiB7XG4gICAgICAgICAgcHJlS2V5SWQ6IDIsXG4gICAgICAgICAgYmFzZUtleTogJ0JYVnBxZnpQNUpENmIrR05xZXBQb3VmNmVISzd4cjl5bkxKSG52bHBnVlJBJyxcbiAgICAgICAgICBzaWduZWRQcmVLZXlJZDogMzgsXG4gICAgICAgIH0sXG4gICAgICAgIHJlbW90ZVJlZ2lzdHJhdGlvbklkOiA0MjQzLFxuICAgICAgICBsb2NhbFJlZ2lzdHJhdGlvbklkOiAzNTU0LFxuICAgICAgICBhbGljZUJhc2VLZXk6ICdCVmVIdjVNQWJNZ0tlYW9PL0cxQ01CZHFoQzdibzdNdGM0RVd4STBvVDE5TicsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCByZWNvcmRDb3B5ID0gZ2V0UmVjb3JkQ29weShyZWNvcmQpO1xuXG4gICAgY29uc3QgYWN0dWFsID0gc2Vzc2lvblJlY29yZFRvUHJvdG9idWYocmVjb3JkLCBvdXJEYXRhKTtcblxuICAgIGFzc2VydC5kZWVwRXF1YWwoZXhwZWN0ZWQsIGFjdHVhbC50b0pTT04oKSk7XG5cbiAgICAvLyBXZSB3YW50IHRvIGVuc3VyZSB0aGF0IGNvbnZlcnNpb24gZG9lc24ndCBtb2RpZnkgaW5jb21pbmcgZGF0YVxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVjb3JkLCByZWNvcmRDb3B5KTtcbiAgfSk7XG5cbiAgaXQoJ0dlbmVyYXRlcyBleHBlY3RlZCBwcm90b2J1ZiB3aXRoIG11bHRpcGxlIHNlc3Npb25zJywgKCkgPT4ge1xuICAgIGNvbnN0IHJlY29yZDogYW55ID0ge1xuICAgICAgc2Vzc2lvbnM6IHtcbiAgICAgICAgJ1xcdTAwMDVXXHUwMDg3XHUwMEJGXHUwMDkzXFx1MDAwMGxcdTAwQzhcXG55XHUwMEFBXFx1MDAwZVx1MDBGQ21CMFxcdTAwMTdqXHUwMDg0Llx1MDBEQlx1MDBBM1x1MDBCMy1zXHUwMDgxXFx1MDAxNlx1MDBDNFx1MDA4RChPX00nOiB7XG4gICAgICAgICAgcmVnaXN0cmF0aW9uSWQ6IDQyNDMsXG4gICAgICAgICAgY3VycmVudFJhdGNoZXQ6IHtcbiAgICAgICAgICAgIHJvb3RLZXk6XG4gICAgICAgICAgICAgICdcdTAwQ0JcXHUwMDAzNS9cdTAwRkNcdTAwOUNcdTAwREFcdTAwOUFnXFx1MDAwM1hlXHUwMEZCXHUwMEZBXFx1MDAxMFx1MDA5N1xcdTAwMDBcdTAwRkNcXHUwMDAyXHUwMEI2XHUwMEJCbzVcXHUwMDFjXHUwMDgzXHUwMDk3XHUwMEFEXHUwMEE1XFx1MDAwNFx1MDBEMFx1MDBGRlx1MDBBQicsXG4gICAgICAgICAgICBsYXN0UmVtb3RlRXBoZW1lcmFsS2V5OlxuICAgICAgICAgICAgICAnXFx1MDAwNVxcbjdcXHUwMDFjbVRcdTAwODViIVx1MDBFOFxcdTAwMGVcdTAwQ0RcXHUwMDA3XFx1MDAxNm00Z1x1MDBCM1xcdTAwMDVcdTAwOTFcdTAwRkNcdTAwOUNJWVx1MDA4Q1x1MDBFQVx1MDA4RFxcYlxcdTAwMTFcdTAwQ0ZcdTAwQ0VQcycsXG4gICAgICAgICAgICBwcmV2aW91c0NvdW50ZXI6IDIsXG4gICAgICAgICAgICBlcGhlbWVyYWxLZXlQYWlyOiB7XG4gICAgICAgICAgICAgIHByaXZLZXk6ICdcdTAwRTRcdTAwOTdcdTAwRTNcdTAwQzVcdTAwQUJcdTAwQUFcdTAwOEFcdTAwRTBcdTAwRjhcdTAwRUQpXHUwMDg4XHUwMEUxXFx1MDAwNVx1MDBDMVwiXHUwMDhDc0pNLlx1MDBBOFx1MDBBMVxcdTAwMTJyXHUwMDlEKE5cXGY5XHUwMEQ0XFxiJyxcbiAgICAgICAgICAgICAgcHViS2V5OiAnXFx1MDAwNStcXHUwMDEzNFx1MDA5Nlx1MDBBQjFcXHUwMDAwXFx1MDAxM2wgKlx1MDBFM0tcdTAwRTduXHUwMEJBXHUwMEQ2XHUwMEYzXHUwMEIzXHUwMEVEVFNcdTAwOUYmXHUwMDhDe1x1MDBGOSBcdTAwQ0RcdTAwODI+MScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaW5kZXhJbmZvOiB7XG4gICAgICAgICAgICByZW1vdGVJZGVudGl0eUtleTogJ1xcdTAwMDVcdTAwQThcdTAwQThcdTAwQTlcdTAwRkNcdTAwQ0ZcdTAwRTRcdTAwOTBcdTAwRkFvXHUwMEUxXHUwMDhEXHUwMEE5XHUwMEVBT1x1MDBBMlx1MDBFN1x1MDBGQXhyXHUwMEJCXHUwMEM2XHUwMEJGclx1MDA5Q1x1MDBCMkdcdTAwOUVcdTAwRjlpXHUwMDgxVEAnLFxuICAgICAgICAgICAgY2xvc2VkOiAtMSxcbiAgICAgICAgICAgIGJhc2VLZXk6ICdcXHUwMDA1V1x1MDA4N1x1MDBCRlx1MDA5M1xcdTAwMDBsXHUwMEM4XFxueVx1MDBBQVxcdTAwMGVcdTAwRkNtQjBcXHUwMDE3alx1MDA4NC5cdTAwREJcdTAwQTNcdTAwQjMtc1x1MDA4MVxcdTAwMTZcdTAwQzRcdTAwOEQoT19NJyxcbiAgICAgICAgICAgIGJhc2VLZXlUeXBlOiAyLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb2xkUmF0Y2hldExpc3Q6IFtdLFxuICAgICAgICAgICdcXHUwMDA1XFxuN1xcdTAwMWNtVFx1MDA4NWIhXHUwMEU4XFx1MDAwZVx1MDBDRFxcdTAwMDdcXHUwMDE2bTRnXHUwMEIzXFx1MDAwNVx1MDA5MVx1MDBGQ1x1MDA5Q0lZXHUwMDhDXHUwMEVBXHUwMDhEXFxiXFx1MDAxMVx1MDBDRlx1MDBDRVBzJzoge1xuICAgICAgICAgICAgbWVzc2FnZUtleXM6IHtcbiAgICAgICAgICAgICAgJzAnOiAnXHUwMENFZ1x1MDBGM1x1MDBBRlx1MDA5MTJcdTAwRTB2XHUwMEYxXHUwMDkxWF9cdTAwRjVcXHUwMDE0XHUwMDk2XHUwMEM3XFx1MDAwMFx1MDBGNmxcXHUwMDFmNEo+XHUwMDhDXHUwMEQwXHUwMENGe2AtXHUwMERDNVx1MDBBNicsXG4gICAgICAgICAgICAgICc0JzogJ2NcdTAwQkY8XHUwMEI1XHUwMEUyXHUwMEJDWFx1MDBCNVx1MDA4MyFcdTAwRDlcdTAwQUZcdTAwQjVcdTAwQUVbXHUwMDk3bjxcdTAwOUVcdTAwRUNcdTAwRUVcdTAwRkFjb1x1MDBFNVx1MDBBOW5cXHUwMDEzXCJsXVx1MDBEMCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhaW5LZXk6IHtcbiAgICAgICAgICAgICAgY291bnRlcjogNSxcbiAgICAgICAgICAgICAga2V5OiAnWntcdTAwRjJcdTAwRDk4XHUwMEQ4XHUwMEIzQVx1MDBERGRTWlx1MDA4NmtcXG5cdTAwQzNcdTAwOTdcXHUwMDFjXHUwMEY0XHUwMEExXFx1MDAxYltZXHUwMEQyXHUwMEMyXHUwMEI2XHUwMDgzXFx1MDAxNmFcdTAwQjBcXHUwMDA0PCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhaW5UeXBlOiAyLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ1xcdTAwMDUrXFx1MDAxMzRcdTAwOTZcdTAwQUIxXFx1MDAwMFxcdTAwMTNsICpcdTAwRTNLXHUwMEU3blx1MDBCQVx1MDBENlx1MDBGM1x1MDBCM1x1MDBFRFRTXHUwMDlGJlx1MDA4Q3tcdTAwRjkgXHUwMENEXHUwMDgyPjEnOiB7XG4gICAgICAgICAgICBtZXNzYWdlS2V5czoge30sXG4gICAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgICBjb3VudGVyOiAtMSxcbiAgICAgICAgICAgICAga2V5OiBcIlx1MDBFOEI/N1xcdTAwMGZcdTAwQUZcXHUwMDFlXFx1MDAxMFx1MDBBOFxcdTAwMDdcdTAwOEZ9Olx1MDA5Mz9cdTAwOTBcdTAwQjlcXHUwMDEwJFxcXFxcdTAwRUJ+XHUwMEFBXFx1MDAwMGdNMFx1MDBENVx1MDA5OCdcdTAwQTNcXHUwMDA1XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhaW5UeXBlOiAxLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgICdcXHUwMDA1QkRcdTAwQkZaXFx1MDAwMGxcdTAwQzhcXG55XHUwMEFBXFx1MDAwZVx1MDBGQ21CMFxcdTAwMTdqXHUwMDg0Llx1MDBEQlx1MDBBM1x1MDBCMy1zXHUwMDgxXFx1MDAxNlx1MDBDNFx1MDA4RChPX00nOiB7XG4gICAgICAgICAgcmVnaXN0cmF0aW9uSWQ6IDM0MzIsXG4gICAgICAgICAgY3VycmVudFJhdGNoZXQ6IHtcbiAgICAgICAgICAgIHJvb3RLZXk6XG4gICAgICAgICAgICAgICdcdTAwQ0JcXHUwMDAzNS9cdTAwRkNcdTAwOUNcdTAwREFcdTAwOUFnXFx1MDAwM1hlXHUwMEZCXHUwMEZBXFx1MDAxMFx1MDA5N1xcdTAwMDBcdTAwRkNcXHUwMDAyXHUwMEI2XHUwMEJCbzVcXHUwMDFjXHUwMDgzXHUwMDk3XHUwMEFEXHUwMEE1XFx1MDAwNFx1MDBEMFx1MDBGRlx1MDBBQicsXG4gICAgICAgICAgICBsYXN0UmVtb3RlRXBoZW1lcmFsS2V5OlxuICAgICAgICAgICAgICAnXFx1MDAwNVxcbjdcXHUwMDFjbVRcdTAwODViIVx1MDBFOFxcdTAwMGVcdTAwQ0RcXHUwMDA3XFx1MDAxNm00Z1x1MDBCM1xcdTAwMDVcdTAwOTFcdTAwRkNcdTAwOUNJWVx1MDA4Q1x1MDBFQVx1MDA4RFxcYlxcdTAwMTFcdTAwQ0ZcdTAwQ0VQcycsXG4gICAgICAgICAgICBwcmV2aW91c0NvdW50ZXI6IDIsXG4gICAgICAgICAgICBlcGhlbWVyYWxLZXlQYWlyOiB7XG4gICAgICAgICAgICAgIHByaXZLZXk6ICdcdTAwRTRcdTAwOTdcdTAwRTNcdTAwQzVcdTAwQUJcdTAwQUFcdTAwOEFcdTAwRTBcdTAwRjhcdTAwRUQpXHUwMDg4XHUwMEUxXFx1MDAwNVx1MDBDMVwiXHUwMDhDc0pNLlx1MDBBOFx1MDBBMVxcdTAwMTJyXHUwMDlEKE5cXGY5XHUwMEQ0XFxiJyxcbiAgICAgICAgICAgICAgcHViS2V5OiAnXFx1MDAwNStcXHUwMDEzNFx1MDA5Nlx1MDBBQjFcXHUwMDAwXFx1MDAxM2wgKlx1MDBFM0tcdTAwRTduXHUwMEJBXHUwMEQ2XHUwMEYzXHUwMEIzXHUwMEVEVFNcdTAwOUYmXHUwMDhDe1x1MDBGOSBcdTAwQ0RcdTAwODI+MScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaW5kZXhJbmZvOiB7XG4gICAgICAgICAgICByZW1vdGVJZGVudGl0eUtleTogJ1xcdTAwMDVcdTAwQThcdTAwQThcdTAwQTlcdTAwRkNcdTAwQ0ZcdTAwRTRcdTAwOTBcdTAwRkFvXHUwMEUxXHUwMDhEXHUwMEE5XHUwMEVBT1x1MDBBMlx1MDBFN1x1MDBGQXhyXHUwMEJCXHUwMEM2XHUwMEJGclx1MDA5Q1x1MDBCMkdcdTAwOUVcdTAwRjlpXHUwMDgxVEAnLFxuICAgICAgICAgICAgY2xvc2VkOiAxNjA1NTc5OTU0OTYyLFxuICAgICAgICAgICAgYmFzZUtleTogJ1xcdTAwMDVCRFx1MDBCRlpcXHUwMDAwbFx1MDBDOFxcbnlcdTAwQUFcXHUwMDBlXHUwMEZDbUIwXFx1MDAxN2pcdTAwODQuXHUwMERCXHUwMEEzXHUwMEIzLXNcdTAwODFcXHUwMDE2XHUwMEM0XHUwMDhEKE9fTScsXG4gICAgICAgICAgICBiYXNlS2V5VHlwZTogMixcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9sZFJhdGNoZXRMaXN0OiBbXSxcbiAgICAgICAgICAnXFx1MDAwNVxcbjdcXHUwMDFjbVRcdTAwODViIVx1MDBFOFxcdTAwMGVcdTAwQ0RcXHUwMDA3XFx1MDAxNm00Z1x1MDBCM1xcdTAwMDVcdTAwOTFcdTAwRkNcdTAwOUNJWVx1MDA4Q1x1MDBFQVx1MDA4RFxcYlxcdTAwMTFcdTAwQ0ZcdTAwQ0VQcyc6IHtcbiAgICAgICAgICAgIG1lc3NhZ2VLZXlzOiB7XG4gICAgICAgICAgICAgICcyJzogJ1x1MDBDRWdcdTAwRjNcdTAwQUZcdTAwOTEyXHUwMEUwdlx1MDBGMVx1MDA5MVhfXHUwMEY1XFx1MDAxNFx1MDA5Nlx1MDBDN1xcdTAwMDBcdTAwRjZsXFx1MDAxZjRKPlx1MDA4Q1x1MDBEMFx1MDBDRntgLVx1MDBEQzVcdTAwQTYnLFxuICAgICAgICAgICAgICAnMyc6ICdjXHUwMEJGPFx1MDBCNVx1MDBFMlx1MDBCQ1hcdTAwQjVcdTAwODMhXHUwMEQ5XHUwMEFGXHUwMEI1XHUwMEFFW1x1MDA5N248XHUwMDlFXHUwMEVDXHUwMEVFXHUwMEZBY29cdTAwRTVcdTAwQTluXFx1MDAxM1wibF1cdTAwRDAnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYWluS2V5OiB7XG4gICAgICAgICAgICAgIGNvdW50ZXI6IDUsXG4gICAgICAgICAgICAgIGtleTogJ1p7XHUwMEYyXHUwMEQ5OFx1MDBEOFx1MDBCM0FcdTAwRERkU1pcdTAwODZrXFxuXHUwMEMzXHUwMDk3XFx1MDAxY1x1MDBGNFx1MDBBMVxcdTAwMWJbWVx1MDBEMlx1MDBDMlx1MDBCNlx1MDA4M1xcdTAwMTZhXHUwMEIwXFx1MDAwNDwnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYWluVHlwZTogMixcbiAgICAgICAgICB9LFxuICAgICAgICAgICdcXHUwMDA1K1xcdTAwMTM0XHUwMDk2XHUwMEFCMVxcdTAwMDBcXHUwMDEzbCAqXHUwMEUzS1x1MDBFN25cdTAwQkFcdTAwRDZcdTAwRjNcdTAwQjNcdTAwRURUU1x1MDA5RiZcdTAwOEN7XHUwMEY5IFx1MDBDRFx1MDA4Mj4xJzoge1xuICAgICAgICAgICAgbWVzc2FnZUtleXM6IHt9LFxuICAgICAgICAgICAgY2hhaW5LZXk6IHtcbiAgICAgICAgICAgICAgY291bnRlcjogLTEsXG4gICAgICAgICAgICAgIGtleTogXCJcdTAwRThCPzdcXHUwMDBmXHUwMEFGXFx1MDAxZVxcdTAwMTBcdTAwQThcXHUwMDA3XHUwMDhGfTpcdTAwOTM/XHUwMDkwXHUwMEI5XFx1MDAxMCRcXFxcXHUwMEVCflx1MDBBQVxcdTAwMDBnTTBcdTAwRDVcdTAwOTgnXHUwMEEzXFx1MDAwNVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYWluVHlwZTogMSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICAnXFx1MDAwNUFOXHUwMEJGQ1xcdTAwMDBsXHUwMEM4XFxueVx1MDBBQVxcdTAwMGVcdTAwRkNtQjBcXHUwMDE3alx1MDA4NC5cdTAwREJcdTAwQTNcdTAwQjMtc1x1MDA4MVxcdTAwMTZcdTAwQzRcdTAwOEQoT19NJzoge1xuICAgICAgICAgIHJlZ2lzdHJhdGlvbklkOiAyMzEyLFxuICAgICAgICAgIGN1cnJlbnRSYXRjaGV0OiB7XG4gICAgICAgICAgICByb290S2V5OlxuICAgICAgICAgICAgICAnXHUwMENCXFx1MDAwMzUvXHUwMEZDXHUwMDlDXHUwMERBXHUwMDlBZ1xcdTAwMDNYZVx1MDBGQlx1MDBGQVxcdTAwMTBcdTAwOTdcXHUwMDAwXHUwMEZDXFx1MDAwMlx1MDBCNlx1MDBCQm81XFx1MDAxY1x1MDA4M1x1MDA5N1x1MDBBRFx1MDBBNVxcdTAwMDRcdTAwRDBcdTAwRkZcdTAwQUInLFxuICAgICAgICAgICAgbGFzdFJlbW90ZUVwaGVtZXJhbEtleTpcbiAgICAgICAgICAgICAgJ1xcdTAwMDVcXG43XFx1MDAxY21UXHUwMDg1YiFcdTAwRThcXHUwMDBlXHUwMENEXFx1MDAwN1xcdTAwMTZtNGdcdTAwQjNcXHUwMDA1XHUwMDkxXHUwMEZDXHUwMDlDSVlcdTAwOENcdTAwRUFcdTAwOERcXGJcXHUwMDExXHUwMENGXHUwMENFUHMnLFxuICAgICAgICAgICAgcHJldmlvdXNDb3VudGVyOiAyLFxuICAgICAgICAgICAgZXBoZW1lcmFsS2V5UGFpcjoge1xuICAgICAgICAgICAgICBwcml2S2V5OiAnXHUwMEU0XHUwMDk3XHUwMEUzXHUwMEM1XHUwMEFCXHUwMEFBXHUwMDhBXHUwMEUwXHUwMEY4XHUwMEVEKVx1MDA4OFx1MDBFMVxcdTAwMDVcdTAwQzFcIlx1MDA4Q3NKTS5cdTAwQThcdTAwQTFcXHUwMDEyclx1MDA5RChOXFxmOVx1MDBENFxcYicsXG4gICAgICAgICAgICAgIHB1YktleTogJ1xcdTAwMDUrXFx1MDAxMzRcdTAwOTZcdTAwQUIxXFx1MDAwMFxcdTAwMTNsICpcdTAwRTNLXHUwMEU3blx1MDBCQVx1MDBENlx1MDBGM1x1MDBCM1x1MDBFRFRTXHUwMDlGJlx1MDA4Q3tcdTAwRjkgXHUwMENEXHUwMDgyPjEnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGluZGV4SW5mbzoge1xuICAgICAgICAgICAgcmVtb3RlSWRlbnRpdHlLZXk6ICdcXHUwMDA1XHUwMEE4XHUwMEE4XHUwMEE5XHUwMEZDXHUwMENGXHUwMEU0XHUwMDkwXHUwMEZBb1x1MDBFMVx1MDA4RFx1MDBBOVx1MDBFQU9cdTAwQTJcdTAwRTdcdTAwRkF4clx1MDBCQlx1MDBDNlx1MDBCRnJcdTAwOUNcdTAwQjJHXHUwMDlFXHUwMEY5aVx1MDA4MVRAJyxcbiAgICAgICAgICAgIGNsb3NlZDogMTYwNTU4MDQwNzAwMCxcbiAgICAgICAgICAgIGJhc2VLZXk6ICdcXHUwMDA1QU5cdTAwQkZDXFx1MDAwMGxcdTAwQzhcXG55XHUwMEFBXFx1MDAwZVx1MDBGQ21CMFxcdTAwMTdqXHUwMDg0Llx1MDBEQlx1MDBBM1x1MDBCMy1zXHUwMDgxXFx1MDAxNlx1MDBDNFx1MDA4RChPX00nLFxuICAgICAgICAgICAgYmFzZUtleVR5cGU6IDIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbGRSYXRjaGV0TGlzdDogW10sXG4gICAgICAgICAgJ1xcdTAwMDVcXG43XFx1MDAxY21UXHUwMDg1YiFcdTAwRThcXHUwMDBlXHUwMENEXFx1MDAwN1xcdTAwMTZtNGdcdTAwQjNcXHUwMDA1XHUwMDkxXHUwMEZDXHUwMDlDSVlcdTAwOENcdTAwRUFcdTAwOERcXGJcXHUwMDExXHUwMENGXHUwMENFUHMnOiB7XG4gICAgICAgICAgICBtZXNzYWdlS2V5czoge1xuICAgICAgICAgICAgICAnMSc6ICdcdTAwQ0VnXHUwMEYzXHUwMEFGXHUwMDkxMlx1MDBFMHZcdTAwRjFcdTAwOTFYX1x1MDBGNVxcdTAwMTRcdTAwOTZcdTAwQzdcXHUwMDAwXHUwMEY2bFxcdTAwMWY0Sj5cdTAwOENcdTAwRDBcdTAwQ0Z7YC1cdTAwREM1XHUwMEE2JyxcbiAgICAgICAgICAgICAgJzUnOiAnY1x1MDBCRjxcdTAwQjVcdTAwRTJcdTAwQkNYXHUwMEI1XHUwMDgzIVx1MDBEOVx1MDBBRlx1MDBCNVx1MDBBRVtcdTAwOTduPFx1MDA5RVx1MDBFQ1x1MDBFRVx1MDBGQWNvXHUwMEU1XHUwMEE5blxcdTAwMTNcImxdXHUwMEQwJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgICBjb3VudGVyOiA1LFxuICAgICAgICAgICAgICBrZXk6ICdae1x1MDBGMlx1MDBEOThcdTAwRDhcdTAwQjNBXHUwMEREZFNaXHUwMDg2a1xcblx1MDBDM1x1MDA5N1xcdTAwMWNcdTAwRjRcdTAwQTFcXHUwMDFiW1lcdTAwRDJcdTAwQzJcdTAwQjZcdTAwODNcXHUwMDE2YVx1MDBCMFxcdTAwMDQ8JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFpblR5cGU6IDIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnXFx1MDAwNStcXHUwMDEzNFx1MDA5Nlx1MDBBQjFcXHUwMDAwXFx1MDAxM2wgKlx1MDBFM0tcdTAwRTduXHUwMEJBXHUwMEQ2XHUwMEYzXHUwMEIzXHUwMEVEVFNcdTAwOUYmXHUwMDhDe1x1MDBGOSBcdTAwQ0RcdTAwODI+MSc6IHtcbiAgICAgICAgICAgIG1lc3NhZ2VLZXlzOiB7fSxcbiAgICAgICAgICAgIGNoYWluS2V5OiB7XG4gICAgICAgICAgICAgIGNvdW50ZXI6IC0xLFxuICAgICAgICAgICAgICBrZXk6IFwiXHUwMEU4Qj83XFx1MDAwZlx1MDBBRlxcdTAwMWVcXHUwMDEwXHUwMEE4XFx1MDAwN1x1MDA4Rn06XHUwMDkzP1x1MDA5MFx1MDBCOVxcdTAwMTAkXFxcXFx1MDBFQn5cdTAwQUFcXHUwMDAwZ00wXHUwMEQ1XHUwMDk4J1x1MDBBM1xcdTAwMDVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGFpblR5cGU6IDEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB2ZXJzaW9uOiAndjEnLFxuICAgIH07XG5cbiAgICBjb25zdCBleHBlY3RlZCA9IHtcbiAgICAgIGN1cnJlbnRTZXNzaW9uOiB7XG4gICAgICAgIHNlc3Npb25WZXJzaW9uOiAzLFxuICAgICAgICBsb2NhbElkZW50aXR5UHVibGljOiAnQmFpb3FmemMvNUpENmIrR05xYXBQb3VmNmVISzd4cjl5bkxKSG52bCs0NDQnLFxuICAgICAgICByZW1vdGVJZGVudGl0eVB1YmxpYzogJ0JhaW9xZnpQNUpENmIrR05xZXBQb3VmNmVISzd4cjl5bkxKSG52bHBnVlJBJyxcbiAgICAgICAgcm9vdEtleTogJ3l3TTFML3ljMnBwbkExaGwrL29RbHdEOEFyYTdielVjZzVldHBRVFEvNnM9JyxcbiAgICAgICAgcHJldmlvdXNDb3VudGVyOiAzLFxuICAgICAgICBzZW5kZXJDaGFpbjoge1xuICAgICAgICAgIHNlbmRlclJhdGNoZXRLZXk6ICdCU3NUTkphck1RQVRiQ0FxNDB2bmJyclc4N1B0VkZPZkpveDcrU0ROZ2o0eCcsXG4gICAgICAgICAgc2VuZGVyUmF0Y2hldEtleVByaXZhdGU6XG4gICAgICAgICAgICAnNUpmanhhdXFpdUQ0N1NtSTRRWEJJb3h6U2swdXFLRVNjcDBvVGd3NTFBZz0nLFxuICAgICAgICAgIGNoYWluS2V5OiB7XG4gICAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgICAgIGtleTogJzZFSS9Odyt2SGhDb0I0OTlPcE0va0xrUUpGenJmcW9BWjAwdzFaZ25vd1U9JyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICByZWNlaXZlckNoYWluczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNlbmRlclJhdGNoZXRLZXk6ICdCUW8zSEcxVWhXSWg2QTdOQnhadE5HZXpCWkg4bkVsWmpPcU5DQkhQemxCeicsXG4gICAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgICBpbmRleDogNixcbiAgICAgICAgICAgICAga2V5OiAnV252eTJUallzMEhkWkZOYWhtc0t3NWNjOUtFYlcxblN3cmFERm1Hd0JEdz0nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1lc3NhZ2VLZXlzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbmRleDogMSxcbiAgICAgICAgICAgICAgICBjaXBoZXJLZXk6ICd4VnJlRWJUN1Z0cnhzODVKeUdCajZZK1VXZnRRejRINzJGNWtXVjRjeHFNPScsXG4gICAgICAgICAgICAgICAgaXY6ICdUY1JhblN4WlZXYnVJcTB4RFJHbkV3PT0nLFxuICAgICAgICAgICAgICAgIG1hY0tleTogJzVmVzlhSUtYaHR3V3AvNWFsTkpVSVhJblpienRmMnl3elFTcFlyWG9RM0E9JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGluZGV4OiA1LFxuICAgICAgICAgICAgICAgIGNpcGhlcktleTogJ0E5OUhqTTRwVXVnc1E1KzJ2NDhGR1RHRWhaUG9XNnd6VzlNcVNjMTFRUTQ9JyxcbiAgICAgICAgICAgICAgICBpdjogJ2JFOEVpMlJrYW96NFNLUndkRzQrdFE9PScsXG4gICAgICAgICAgICAgICAgbWFjS2V5OiAnVE9UZGJBZjBiQ0hPemNRM2xCYUltM3lxbXBFcXZ2bGREMHFUdURGbWtBST0nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICByZW1vdGVSZWdpc3RyYXRpb25JZDogNDI0MyxcbiAgICAgICAgbG9jYWxSZWdpc3RyYXRpb25JZDogMzU1NCxcbiAgICAgICAgYWxpY2VCYXNlS2V5OiAnQlZlSHY1TUFiTWdLZWFvTy9HMUNNQmRxaEM3Ym83TXRjNEVXeEkwb1QxOU4nLFxuICAgICAgfSxcbiAgICAgIHByZXZpb3VzU2Vzc2lvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHNlc3Npb25WZXJzaW9uOiAzLFxuICAgICAgICAgIGxvY2FsSWRlbnRpdHlQdWJsaWM6ICdCYWlvcWZ6Yy81SkQ2YitHTnFhcFBvdWY2ZUhLN3hyOXluTEpIbnZsKzQ0NCcsXG4gICAgICAgICAgcmVtb3RlSWRlbnRpdHlQdWJsaWM6ICdCYWlvcWZ6UDVKRDZiK0dOcWVwUG91ZjZlSEs3eHI5eW5MSkhudmxwZ1ZSQScsXG4gICAgICAgICAgcm9vdEtleTogJ3l3TTFML3ljMnBwbkExaGwrL29RbHdEOEFyYTdielVjZzVldHBRVFEvNnM9JyxcbiAgICAgICAgICBwcmV2aW91c0NvdW50ZXI6IDMsXG4gICAgICAgICAgc2VuZGVyQ2hhaW46IHtcbiAgICAgICAgICAgIHNlbmRlclJhdGNoZXRLZXk6ICdCU3NUTkphck1RQVRiQ0FxNDB2bmJyclc4N1B0VkZPZkpveDcrU0ROZ2o0eCcsXG4gICAgICAgICAgICBzZW5kZXJSYXRjaGV0S2V5UHJpdmF0ZTpcbiAgICAgICAgICAgICAgJzVKZmp4YXVxaXVENDdTbUk0UVhCSW94elNrMHVxS0VTY3Awb1RndzUxQWc9JyxcbiAgICAgICAgICAgIGNoYWluS2V5OiB7XG4gICAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAgICBrZXk6ICc2RUkvTncrdkhoQ29CNDk5T3BNL2tMa1FKRnpyZnFvQVowMHcxWmdub3dVPScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVjZWl2ZXJDaGFpbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc2VuZGVyUmF0Y2hldEtleTogJ0JRbzNIRzFVaFdJaDZBN05CeFp0TkdlekJaSDhuRWxaak9xTkNCSFB6bEJ6JyxcbiAgICAgICAgICAgICAgY2hhaW5LZXk6IHtcbiAgICAgICAgICAgICAgICBpbmRleDogNixcbiAgICAgICAgICAgICAgICBrZXk6ICdXbnZ5MlRqWXMwSGRaRk5haG1zS3c1Y2M5S0ViVzFuU3dyYURGbUd3QkR3PScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG1lc3NhZ2VLZXlzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgaW5kZXg6IDIsXG4gICAgICAgICAgICAgICAgICBjaXBoZXJLZXk6ICd4VnJlRWJUN1Z0cnhzODVKeUdCajZZK1VXZnRRejRINzJGNWtXVjRjeHFNPScsXG4gICAgICAgICAgICAgICAgICBpdjogJ1RjUmFuU3haVldidUlxMHhEUkduRXc9PScsXG4gICAgICAgICAgICAgICAgICBtYWNLZXk6ICc1Zlc5YUlLWGh0d1dwLzVhbE5KVUlYSW5aYnp0ZjJ5d3pRU3BZclhvUTNBPScsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBpbmRleDogNixcbiAgICAgICAgICAgICAgICAgIGNpcGhlcktleTogJ0E5OUhqTTRwVXVnc1E1KzJ2NDhGR1RHRWhaUG9XNnd6VzlNcVNjMTFRUTQ9JyxcbiAgICAgICAgICAgICAgICAgIGl2OiAnYkU4RWkyUmthb3o0U0tSd2RHNCt0UT09JyxcbiAgICAgICAgICAgICAgICAgIG1hY0tleTogJ1RPVGRiQWYwYkNIT3pjUTNsQmFJbTN5cW1wRXF2dmxkRDBxVHVERm1rQUk9JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHJlbW90ZVJlZ2lzdHJhdGlvbklkOiAyMzEyLFxuICAgICAgICAgIGxvY2FsUmVnaXN0cmF0aW9uSWQ6IDM1NTQsXG4gICAgICAgICAgYWxpY2VCYXNlS2V5OiAnQlVGT3YwTUFiTWdLZWFvTy9HMUNNQmRxaEM3Ym83TXRjNEVXeEkwb1QxOU4nLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc2Vzc2lvblZlcnNpb246IDMsXG4gICAgICAgICAgbG9jYWxJZGVudGl0eVB1YmxpYzogJ0JhaW9xZnpjLzVKRDZiK0dOcWFwUG91ZjZlSEs3eHI5eW5MSkhudmwrNDQ0JyxcbiAgICAgICAgICByZW1vdGVJZGVudGl0eVB1YmxpYzogJ0JhaW9xZnpQNUpENmIrR05xZXBQb3VmNmVISzd4cjl5bkxKSG52bHBnVlJBJyxcbiAgICAgICAgICByb290S2V5OiAneXdNMUwveWMycHBuQTFobCsvb1Fsd0Q4QXJhN2J6VWNnNWV0cFFUUS82cz0nLFxuICAgICAgICAgIHByZXZpb3VzQ291bnRlcjogMyxcbiAgICAgICAgICBzZW5kZXJDaGFpbjoge1xuICAgICAgICAgICAgc2VuZGVyUmF0Y2hldEtleTogJ0JTc1ROSmFyTVFBVGJDQXE0MHZuYnJyVzg3UHRWRk9mSm94NytTRE5najR4JyxcbiAgICAgICAgICAgIHNlbmRlclJhdGNoZXRLZXlQcml2YXRlOlxuICAgICAgICAgICAgICAnNUpmanhhdXFpdUQ0N1NtSTRRWEJJb3h6U2swdXFLRVNjcDBvVGd3NTFBZz0nLFxuICAgICAgICAgICAgY2hhaW5LZXk6IHtcbiAgICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICAgIGtleTogJzZFSS9Odyt2SGhDb0I0OTlPcE0va0xrUUpGenJmcW9BWjAwdzFaZ25vd1U9JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZWNlaXZlckNoYWluczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzZW5kZXJSYXRjaGV0S2V5OiAnQlFvM0hHMVVoV0loNkE3TkJ4WnROR2V6QlpIOG5FbFpqT3FOQ0JIUHpsQnonLFxuICAgICAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgICAgIGluZGV4OiA2LFxuICAgICAgICAgICAgICAgIGtleTogJ1dudnkyVGpZczBIZFpGTmFobXNLdzVjYzlLRWJXMW5Td3JhREZtR3dCRHc9JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbWVzc2FnZUtleXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBpbmRleDogMyxcbiAgICAgICAgICAgICAgICAgIGNpcGhlcktleTogJ3hWcmVFYlQ3VnRyeHM4NUp5R0JqNlkrVVdmdFF6NEg3MkY1a1dWNGN4cU09JyxcbiAgICAgICAgICAgICAgICAgIGl2OiAnVGNSYW5TeFpWV2J1SXEweERSR25Fdz09JyxcbiAgICAgICAgICAgICAgICAgIG1hY0tleTogJzVmVzlhSUtYaHR3V3AvNWFsTkpVSVhJblpienRmMnl3elFTcFlyWG9RM0E9JyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGluZGV4OiA0LFxuICAgICAgICAgICAgICAgICAgY2lwaGVyS2V5OiAnQTk5SGpNNHBVdWdzUTUrMnY0OEZHVEdFaFpQb1c2d3pXOU1xU2MxMVFRND0nLFxuICAgICAgICAgICAgICAgICAgaXY6ICdiRThFaTJSa2FvejRTS1J3ZEc0K3RRPT0nLFxuICAgICAgICAgICAgICAgICAgbWFjS2V5OiAnVE9UZGJBZjBiQ0hPemNRM2xCYUltM3lxbXBFcXZ2bGREMHFUdURGbWtBST0nLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgcmVtb3RlUmVnaXN0cmF0aW9uSWQ6IDM0MzIsXG4gICAgICAgICAgbG9jYWxSZWdpc3RyYXRpb25JZDogMzU1NCxcbiAgICAgICAgICBhbGljZUJhc2VLZXk6ICdCVUpFdjFvQWJNZ0tlYW9PL0cxQ01CZHFoQzdibzdNdGM0RVd4STBvVDE5TicsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG5cbiAgICBjb25zdCByZWNvcmRDb3B5ID0gZ2V0UmVjb3JkQ29weShyZWNvcmQpO1xuXG4gICAgY29uc3QgYWN0dWFsID0gc2Vzc2lvblJlY29yZFRvUHJvdG9idWYocmVjb3JkLCBvdXJEYXRhKTtcblxuICAgIGFzc2VydC5kZWVwRXF1YWwoZXhwZWN0ZWQsIGFjdHVhbC50b0pTT04oKSk7XG5cbiAgICAvLyBXZSB3YW50IHRvIGVuc3VyZSB0aGF0IGNvbnZlcnNpb24gZG9lc24ndCBtb2RpZnkgaW5jb21pbmcgZGF0YVxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVjb3JkLCByZWNvcmRDb3B5KTtcbiAgfSk7XG5cbiAgaXQoJ0dlbmVyYXRlcyBleHBlY3RlZCBwcm90b2J1ZiB3aXRoIGp1c3QtaW5pdGlhbGl6ZWQgc2Vzc2lvbicsICgpID0+IHtcbiAgICBjb25zdCByZWNvcmQ6IGFueSA9IHtcbiAgICAgIHNlc3Npb25zOiB7XG4gICAgICAgICdcXHUwMDA1NT49ZVZcdTAwQjlcXHUwMDE5XHUwMERCXHUwMDg5blx1MDBCRVx1MDA4RFx1MDBBRlx1MDA5NyNcdTAwREZcdTAwQjZfPVxcdTAwMTMuTlx1MDBFRVxcdTAwMWFcdTAwQTUlXHUwMDg1LV1cdTAwRjlfXFxuJzoge1xuICAgICAgICAgIHJlZ2lzdHJhdGlvbklkOiAzMTg4LFxuICAgICAgICAgIGN1cnJlbnRSYXRjaGV0OiB7XG4gICAgICAgICAgICByb290S2V5OiAnXFx1MDAxYjFcdTAwOUY2XHUwMDhDXHUwMENBXHUwMEU2XHUwMEYwXHUwMENBXHUwMEE4XHUwMEJFPn1cdTAwREFcdTAwQTlcdTAwODhcdTAwQzRIXHUwMEI4c05cdTAwOURcdTAwRDM6XHUwMDg4XHUwMEM4Rlx1MDBCOVx1MDBCM1FcdTAwRDZpJyxcbiAgICAgICAgICAgIGxhc3RSZW1vdGVFcGhlbWVyYWxLZXk6XG4gICAgICAgICAgICAgICdcXHUwMDA1S1x1MDBDNlxcXFxcdTAwRkJcdTAwQUJcXHUwMDAzXHUwMEQxXFx1MDAwNVx1MDBEQVx1MDBGQlVcdTAwQjFpXHUwMEZBXHUwMDdGXFx1MDAxMmlcdTAwODhcdTAwQzNcXHUwMDExXVx1MDBCQ1x1MDBFNVVcdTAwRTBcXHUwMDFmXHUwMEFGXHUwMEYyXHUwMEM5fiZcXHUwMDAzJyxcbiAgICAgICAgICAgIHByZXZpb3VzQ291bnRlcjogMCxcbiAgICAgICAgICAgIGVwaGVtZXJhbEtleVBhaXI6IHtcbiAgICAgICAgICAgICAgcHJpdktleTpcbiAgICAgICAgICAgICAgICBcIiAtJlxcdF0kXFx1MDAxNVBcXHUwMDFmXHUwMEY5XFx1MDAwZVxcdTAwMWNcXHUwMDFlJ3lcdTAwODVcXHUwMDFlXHUwMEVGXHUwMENCXHUwMEVFRVx1MDBEMStcdTAwRTlhXHUwMDg2XHUwMEFBXHUwMEIxIDp3TVwiLFxuICAgICAgICAgICAgICBwdWJLZXk6ICdcXHUwMDA1XFx1MDAxNFx1MDBBNlx1MDBFN1x1MDA5Q1xcdTAwMDJcdTAwRjJcXHUwMDFhXHUwMEM2XHUwMEU1XFx1MDAxYXtcdTAwOTdcdTAwRDgxXHUwMEI0XHUwMEU4blx1MDA4Mlx1MDA5RW5cdTAwOTVcdTAwQzcoXHUwMERCS1x1MDBBOThQXHUwMDhGXHUwMENCXCJoJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBpbmRleEluZm86IHtcbiAgICAgICAgICAgIHJlbW90ZUlkZW50aXR5S2V5OiAnXFx1MDAwNVxcdTAwMTlcdTAwODFcdTAwREFcdTAwRTRcdTAwOERcdTAwQTdcXHUwMDA2XHUwMEQ3ZFx1MDA5OFx1MDBFMlx1MDBCMFx1MDA4OHVcdTAwQTdcdTAwRjVgRVx1MDBDQlRlJUhcdTAwQTIhJlx1MDBEOThjXHUwMDg4eionLFxuICAgICAgICAgICAgY2xvc2VkOiAtMSxcbiAgICAgICAgICAgIGJhc2VLZXk6ICdcXHUwMDA1NT49ZVZcdTAwQjlcXHUwMDE5XHUwMERCXHUwMDg5blx1MDBCRVx1MDA4RFx1MDBBRlx1MDA5NyNcdTAwREZcdTAwQjZfPVxcdTAwMTMuTlx1MDBFRVxcdTAwMWFcdTAwQTUlXHUwMDg1LV1cdTAwRjlfXFxuJyxcbiAgICAgICAgICAgIGJhc2VLZXlUeXBlOiAxLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb2xkUmF0Y2hldExpc3Q6IFtdLFxuICAgICAgICAgICdcXHUwMDA1XFx1MDAxNFx1MDBBNlx1MDBFN1x1MDA5Q1xcdTAwMDJcdTAwRjJcXHUwMDFhXHUwMEM2XHUwMEU1XFx1MDAxYXtcdTAwOTdcdTAwRDgxXHUwMEI0XHUwMEU4blx1MDA4Mlx1MDA5RW5cdTAwOTVcdTAwQzcoXHUwMERCS1x1MDBBOThQXHUwMDhGXHUwMENCXCJoJzoge1xuICAgICAgICAgICAgbWVzc2FnZUtleXM6IHt9LFxuICAgICAgICAgICAgY2hhaW5LZXk6IHtcbiAgICAgICAgICAgICAgY291bnRlcjogMCxcbiAgICAgICAgICAgICAga2V5OiAnXHUwMEI2XkRvL2pcdTAwRUVcdTAwN0ZcXHUwMDBmVVx1MDBFOFx1MDBBQlx1MDA4OFx1MDBBQVxcdTAwMTFcdTAwOEN4blx1MDBGNVx1MDA4RFxcdTAwMTFcdTAwQzZcdTAwRjJ9XHUwMEQwXHUwMEYzKlx1MDBFNFx1MDBDN1x1MDBDQVx1MDBDMlxcdTAwMDAnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYWluVHlwZTogMSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBlbmRpbmdQcmVLZXk6IHtcbiAgICAgICAgICAgIHNpZ25lZEtleUlkOiAyOTk1LFxuICAgICAgICAgICAgYmFzZUtleTogJ1xcdTAwMDU1Pj1lVlx1MDBCOVxcdTAwMTlcdTAwREJcdTAwODluXHUwMEJFXHUwMDhEXHUwMEFGXHUwMDk3I1x1MDBERlx1MDBCNl89XFx1MDAxMy5OXHUwMEVFXFx1MDAxYVx1MDBBNSVcdTAwODUtXVx1MDBGOV9cXG4nLFxuICAgICAgICAgICAgcHJlS2V5SWQ6IDM4NixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHZlcnNpb246ICd2MScsXG4gICAgfTtcblxuICAgIGNvbnN0IGV4cGVjdGVkID0ge1xuICAgICAgY3VycmVudFNlc3Npb246IHtcbiAgICAgICAgYWxpY2VCYXNlS2V5OiAnQlRVK1BXVld1Um5iaVc2K2phK1hJOSsyWHowVExrN3VHcVVsaFMxZCtWOEsnLFxuICAgICAgICBsb2NhbElkZW50aXR5UHVibGljOiAnQmFpb3FmemMvNUpENmIrR05xYXBQb3VmNmVISzd4cjl5bkxKSG52bCs0NDQnLFxuICAgICAgICBsb2NhbFJlZ2lzdHJhdGlvbklkOiAzNTU0LFxuICAgICAgICBwZW5kaW5nUHJlS2V5OiB7XG4gICAgICAgICAgYmFzZUtleTogJ0JUVStQV1ZXdVJuYmlXNitqYStYSTkrMlh6MFRMazd1R3FVbGhTMWQrVjhLJyxcbiAgICAgICAgICBwcmVLZXlJZDogMzg2LFxuICAgICAgICAgIHNpZ25lZFByZUtleUlkOiAyOTk1LFxuICAgICAgICB9LFxuICAgICAgICBwcmV2aW91c0NvdW50ZXI6IDEsXG4gICAgICAgIHJlbW90ZUlkZW50aXR5UHVibGljOiAnQlJtQjJ1U05wd2JYWkpqaXNJaDFwL1ZnUmN0VVpTVklvaUVtMlRoamlIb3EnLFxuICAgICAgICByZW1vdGVSZWdpc3RyYXRpb25JZDogMzE4OCxcbiAgICAgICAgcm9vdEtleTogJ0d6R2ZOb3pLNXZES3FMNCtmZHFwaU1SSXVITk9uZE02aU1oR3ViTlIxbWs9JyxcbiAgICAgICAgc2VuZGVyQ2hhaW46IHtcbiAgICAgICAgICBjaGFpbktleToge1xuICAgICAgICAgICAgaW5kZXg6IDEsXG4gICAgICAgICAgICBrZXk6ICd0bDVFYnk5cTduOFBWZWlyaUtvUmpIaHU5WTBSeHZKOTBQTXE1TWZLd2dBPScsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZW5kZXJSYXRjaGV0S2V5OiAnQlJTbTU1d0M4aHJHNVJwN2w5Z3h0T2h1Z3A1dWxjY28yMHVwT0ZDUHl5Sm8nLFxuICAgICAgICAgIHNlbmRlclJhdGNoZXRLZXlQcml2YXRlOlxuICAgICAgICAgICAgJ0lDMG1DVjBrRlZBZitRNGNIaWQ1aFI3dnkrNUYwU3ZwWVlhcXNTQTZkMDA9JyxcbiAgICAgICAgfSxcbiAgICAgICAgc2Vzc2lvblZlcnNpb246IDMsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCByZWNvcmRDb3B5ID0gZ2V0UmVjb3JkQ29weShyZWNvcmQpO1xuXG4gICAgY29uc3QgYWN0dWFsID0gc2Vzc2lvblJlY29yZFRvUHJvdG9idWYocmVjb3JkLCBvdXJEYXRhKTtcblxuICAgIGFzc2VydC5kZWVwRXF1YWwoZXhwZWN0ZWQsIGFjdHVhbC50b0pTT04oKSk7XG5cbiAgICAvLyBXZSB3YW50IHRvIGVuc3VyZSB0aGF0IGNvbnZlcnNpb24gZG9lc24ndCBtb2RpZnkgaW5jb21pbmcgZGF0YVxuICAgIGFzc2VydC5kZWVwRXF1YWwocmVjb3JkLCByZWNvcmRDb3B5KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQSxrQkFBdUI7QUFFdkIsWUFBdUI7QUFFdkIsZ0NBQXdDO0FBRXhDLE1BQU0sZ0JBQWdCLHdCQUFDLFdBQXFCLEtBQUssTUFBTSxLQUFLLFVBQVUsTUFBTSxDQUFDLEdBQXZEO0FBRXRCLFNBQVMsc0JBQXNCLE1BQU07QUFDbkMsTUFBSTtBQUVKLGFBQVcsTUFBTTtBQUNmLGNBQVU7QUFBQSxNQUNSLG1CQUFtQixNQUFNLFdBQ3ZCLDhDQUNGO0FBQUEsTUFDQSxnQkFBZ0I7QUFBQSxJQUNsQjtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsbUNBQW1DLE1BQU07QUFDMUMsVUFBTSxTQUFjLENBQUM7QUFDckIsdUJBQU8sT0FDTCxNQUFNLHVEQUF3QixRQUFRLE9BQU8sR0FDN0MscUNBQ0Y7QUFBQSxFQUNGLENBQUM7QUFFRCxLQUFHLG1EQUFtRCxNQUFNO0FBQzFELFVBQU0sU0FBYztBQUFBLE1BQ2xCLFVBQVU7QUFBQSxRQUNSLDhFQUErRDtBQUFBLFVBQzdELGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFlBQ2QsU0FDRTtBQUFBLFlBQ0Ysd0JBQ0U7QUFBQSxZQUNGLGlCQUFpQjtBQUFBLFlBQ2pCLGtCQUFr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NkRBQTZELE1BQU07QUFDcEUsVUFBTSxTQUFjO0FBQUEsTUFDbEIsVUFBVTtBQUFBLFFBQ1IsNkVBQTBEO0FBQUEsVUFDeEQsZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsWUFDZCxTQUFTO0FBQUEsWUFDVCx3QkFDRTtBQUFBLFlBQ0YsaUJBQWlCO0FBQUEsWUFDakIsa0JBQWtCO0FBQUEsY0FDaEIsU0FDRTtBQUFBLGNBQ0YsUUFBUTtBQUFBLFlBQ1Y7QUFBQSxVQUNGO0FBQUEsVUFDQSxXQUFXO0FBQUEsWUFDVCxtQkFBbUI7QUFBQSxZQUNuQixRQUFRO0FBQUEsWUFDUixTQUFTO0FBQUEsWUFDVCxhQUFhO0FBQUEsVUFDZjtBQUFBLFVBQ0EsZ0JBQWdCLENBQUM7QUFBQSxVQUNqQiwyRkFBOEQ7QUFBQSxZQUM1RCxhQUFhLENBQUM7QUFBQSxZQUNkLFVBQVU7QUFBQSxjQUNSLFNBQVM7QUFBQSxjQUNULEtBQUs7QUFBQSxZQUNQO0FBQUEsWUFDQSxXQUFXO0FBQUEsVUFDYjtBQUFBLFVBQ0EsZUFBZTtBQUFBLFlBQ2IsYUFBYTtBQUFBLFlBQ2IsU0FBUztBQUFBLFlBQ1QsVUFBVTtBQUFBLFVBQ1o7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsU0FBUztBQUFBLElBQ1g7QUFFQSxVQUFNLFdBQVc7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLFFBQ2QsY0FBYztBQUFBLFFBQ2QscUJBQXFCO0FBQUEsUUFDckIscUJBQXFCO0FBQUEsUUFDckIsZUFBZTtBQUFBLFVBQ2IsU0FBUztBQUFBLFVBQ1QsVUFBVTtBQUFBLFVBQ1YsZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxRQUNBLGlCQUFpQjtBQUFBLFFBQ2pCLHNCQUFzQjtBQUFBLFFBQ3RCLHNCQUFzQjtBQUFBLFFBQ3RCLFNBQVM7QUFBQSxRQUNULGFBQWE7QUFBQSxVQUNYLFVBQVU7QUFBQSxZQUNSLE9BQU87QUFBQSxZQUNQLEtBQUs7QUFBQSxVQUNQO0FBQUEsVUFDQSxrQkFBa0I7QUFBQSxVQUNsQix5QkFDRTtBQUFBLFFBQ0o7QUFBQSxRQUNBLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUVBLFVBQU0sYUFBYSxjQUFjLE1BQU07QUFFdkMsVUFBTSxTQUFTLHVEQUF3QixRQUFRLE9BQU87QUFFdEQsdUJBQU8sVUFBVSxVQUFVLE9BQU8sT0FBTyxDQUFDO0FBRzFDLHVCQUFPLFVBQVUsUUFBUSxVQUFVO0FBQUEsRUFDckMsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
