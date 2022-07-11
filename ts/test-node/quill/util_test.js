var import_chai = require("chai");
var import_util = require("../../quill/util");
describe("getDeltaToRemoveStaleMentions", () => {
  const memberUuids = ["abcdef", "ghijkl"];
  describe("given text", () => {
    it("retains the text", () => {
      const originalOps = [
        {
          insert: "whoa, nobody here"
        }
      ];
      const { ops } = (0, import_util.getDeltaToRemoveStaleMentions)(originalOps, memberUuids);
      import_chai.assert.deepEqual(ops, [{ retain: 17 }]);
    });
  });
  describe("given stale and valid mentions", () => {
    it("retains the valid and replaces the stale", () => {
      const originalOps = [
        {
          insert: {
            mention: { uuid: "12345", title: "Klaus" }
          }
        },
        { insert: { mention: { uuid: "abcdef", title: "Werner" } } }
      ];
      const { ops } = (0, import_util.getDeltaToRemoveStaleMentions)(originalOps, memberUuids);
      import_chai.assert.deepEqual(ops, [
        { delete: 1 },
        { insert: "@Klaus" },
        { retain: 1 }
      ]);
    });
  });
  describe("given emoji embeds", () => {
    it("retains the embeds", () => {
      const originalOps = [
        {
          insert: {
            emoji: "\u{1F602}"
          }
        },
        {
          insert: {
            emoji: "\u{1F34B}"
          }
        }
      ];
      const { ops } = (0, import_util.getDeltaToRemoveStaleMentions)(originalOps, memberUuids);
      import_chai.assert.deepEqual(ops, [{ retain: 1 }, { retain: 1 }]);
    });
  });
  describe("given other ops", () => {
    it("passes them through", () => {
      const originalOps = [
        {
          delete: 5
        }
      ];
      const { ops } = (0, import_util.getDeltaToRemoveStaleMentions)(originalOps, memberUuids);
      import_chai.assert.deepEqual(ops, originalOps);
    });
  });
});
describe("getTextAndMentionsFromOps", () => {
  describe("given only text", () => {
    it("returns only text trimmed", () => {
      const ops = [{ insert: " The " }, { insert: " text \n" }];
      const [resultText, resultMentions] = (0, import_util.getTextAndMentionsFromOps)(ops);
      import_chai.assert.equal(resultText, "The  text");
      import_chai.assert.equal(resultMentions.length, 0);
    });
    it("returns trimmed of trailing newlines", () => {
      const ops = [{ insert: " The\ntext\n\n\n" }];
      const [resultText, resultMentions] = (0, import_util.getTextAndMentionsFromOps)(ops);
      import_chai.assert.equal(resultText, "The\ntext");
      import_chai.assert.equal(resultMentions.length, 0);
    });
  });
  describe("given text, emoji, and mentions", () => {
    it("returns the trimmed text with placeholders and mentions", () => {
      const ops = [
        {
          insert: {
            emoji: "\u{1F602}"
          }
        },
        {
          insert: " wow, funny, "
        },
        {
          insert: {
            mention: {
              uuid: "abcdef",
              title: "@fred"
            }
          }
        }
      ];
      const [resultText, resultMentions] = (0, import_util.getTextAndMentionsFromOps)(ops);
      import_chai.assert.equal(resultText, "\u{1F602} wow, funny, \uFFFC");
      import_chai.assert.deepEqual(resultMentions, [
        {
          length: 1,
          mentionUuid: "abcdef",
          replacementText: "@fred",
          start: 15
        }
      ]);
    });
  });
  describe("given only mentions", () => {
    it("returns the trimmed text with placeholders and mentions", () => {
      const ops = [
        {
          insert: {
            mention: {
              uuid: "abcdef",
              title: "@fred"
            }
          }
        }
      ];
      const [resultText, resultMentions] = (0, import_util.getTextAndMentionsFromOps)(ops);
      import_chai.assert.equal(resultText, "\uFFFC");
      import_chai.assert.deepEqual(resultMentions, [
        {
          length: 1,
          mentionUuid: "abcdef",
          replacementText: "@fred",
          start: 0
        }
      ]);
    });
    it("does not trim newlines padding mentions", () => {
      const ops = [
        { insert: "test \n" },
        {
          insert: {
            mention: {
              uuid: "abcdef",
              title: "@fred"
            }
          }
        },
        { insert: "\n test" }
      ];
      const [resultText, resultMentions] = (0, import_util.getTextAndMentionsFromOps)(ops);
      import_chai.assert.equal(resultText, "test \n\uFFFC\n test");
      import_chai.assert.deepEqual(resultMentions, [
        {
          length: 1,
          mentionUuid: "abcdef",
          replacementText: "@fred",
          start: 6
        }
      ]);
    });
  });
});
describe("getDeltaToRestartMention", () => {
  describe("given text and emoji", () => {
    it("returns the correct retains, a delete, and an @", () => {
      const originalOps = [
        {
          insert: {
            emoji: "\u{1F602}"
          }
        },
        {
          insert: {
            mention: {
              uuid: "ghijkl",
              title: "@sam"
            }
          }
        },
        {
          insert: " wow, funny, "
        },
        {
          insert: {
            mention: {
              uuid: "abcdef",
              title: "@fred"
            }
          }
        }
      ];
      const { ops } = (0, import_util.getDeltaToRestartMention)(originalOps);
      import_chai.assert.deepEqual(ops, [
        {
          retain: 1
        },
        {
          retain: 1
        },
        {
          retain: 13
        },
        {
          retain: 1
        },
        {
          delete: 1
        },
        {
          insert: "@"
        }
      ]);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXRpbF90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQge1xuICBnZXREZWx0YVRvUmVtb3ZlU3RhbGVNZW50aW9ucyxcbiAgZ2V0VGV4dEFuZE1lbnRpb25zRnJvbU9wcyxcbiAgZ2V0RGVsdGFUb1Jlc3RhcnRNZW50aW9uLFxufSBmcm9tICcuLi8uLi9xdWlsbC91dGlsJztcblxuZGVzY3JpYmUoJ2dldERlbHRhVG9SZW1vdmVTdGFsZU1lbnRpb25zJywgKCkgPT4ge1xuICBjb25zdCBtZW1iZXJVdWlkcyA9IFsnYWJjZGVmJywgJ2doaWprbCddO1xuXG4gIGRlc2NyaWJlKCdnaXZlbiB0ZXh0JywgKCkgPT4ge1xuICAgIGl0KCdyZXRhaW5zIHRoZSB0ZXh0JywgKCkgPT4ge1xuICAgICAgY29uc3Qgb3JpZ2luYWxPcHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBpbnNlcnQ6ICd3aG9hLCBub2JvZHkgaGVyZScsXG4gICAgICAgIH0sXG4gICAgICBdO1xuXG4gICAgICBjb25zdCB7IG9wcyB9ID0gZ2V0RGVsdGFUb1JlbW92ZVN0YWxlTWVudGlvbnMob3JpZ2luYWxPcHMsIG1lbWJlclV1aWRzKTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChvcHMsIFt7IHJldGFpbjogMTcgfV0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2l2ZW4gc3RhbGUgYW5kIHZhbGlkIG1lbnRpb25zJywgKCkgPT4ge1xuICAgIGl0KCdyZXRhaW5zIHRoZSB2YWxpZCBhbmQgcmVwbGFjZXMgdGhlIHN0YWxlJywgKCkgPT4ge1xuICAgICAgY29uc3Qgb3JpZ2luYWxPcHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBpbnNlcnQ6IHtcbiAgICAgICAgICAgIG1lbnRpb246IHsgdXVpZDogJzEyMzQ1JywgdGl0bGU6ICdLbGF1cycgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7IGluc2VydDogeyBtZW50aW9uOiB7IHV1aWQ6ICdhYmNkZWYnLCB0aXRsZTogJ1dlcm5lcicgfSB9IH0sXG4gICAgICBdO1xuXG4gICAgICBjb25zdCB7IG9wcyB9ID0gZ2V0RGVsdGFUb1JlbW92ZVN0YWxlTWVudGlvbnMob3JpZ2luYWxPcHMsIG1lbWJlclV1aWRzKTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChvcHMsIFtcbiAgICAgICAgeyBkZWxldGU6IDEgfSxcbiAgICAgICAgeyBpbnNlcnQ6ICdAS2xhdXMnIH0sXG4gICAgICAgIHsgcmV0YWluOiAxIH0sXG4gICAgICBdKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dpdmVuIGVtb2ppIGVtYmVkcycsICgpID0+IHtcbiAgICBpdCgncmV0YWlucyB0aGUgZW1iZWRzJywgKCkgPT4ge1xuICAgICAgY29uc3Qgb3JpZ2luYWxPcHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBpbnNlcnQ6IHtcbiAgICAgICAgICAgIGVtb2ppOiAnXHVEODNEXHVERTAyJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaW5zZXJ0OiB7XG4gICAgICAgICAgICBlbW9qaTogJ1x1RDgzQ1x1REY0QicsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF07XG5cbiAgICAgIGNvbnN0IHsgb3BzIH0gPSBnZXREZWx0YVRvUmVtb3ZlU3RhbGVNZW50aW9ucyhvcmlnaW5hbE9wcywgbWVtYmVyVXVpZHMpO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKG9wcywgW3sgcmV0YWluOiAxIH0sIHsgcmV0YWluOiAxIH1dKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dpdmVuIG90aGVyIG9wcycsICgpID0+IHtcbiAgICBpdCgncGFzc2VzIHRoZW0gdGhyb3VnaCcsICgpID0+IHtcbiAgICAgIGNvbnN0IG9yaWdpbmFsT3BzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgZGVsZXRlOiA1LFxuICAgICAgICB9LFxuICAgICAgXTtcblxuICAgICAgY29uc3QgeyBvcHMgfSA9IGdldERlbHRhVG9SZW1vdmVTdGFsZU1lbnRpb25zKG9yaWdpbmFsT3BzLCBtZW1iZXJVdWlkcyk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwob3BzLCBvcmlnaW5hbE9wcyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdnZXRUZXh0QW5kTWVudGlvbnNGcm9tT3BzJywgKCkgPT4ge1xuICBkZXNjcmliZSgnZ2l2ZW4gb25seSB0ZXh0JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIG9ubHkgdGV4dCB0cmltbWVkJywgKCkgPT4ge1xuICAgICAgY29uc3Qgb3BzID0gW3sgaW5zZXJ0OiAnIFRoZSAnIH0sIHsgaW5zZXJ0OiAnIHRleHQgXFxuJyB9XTtcbiAgICAgIGNvbnN0IFtyZXN1bHRUZXh0LCByZXN1bHRNZW50aW9uc10gPSBnZXRUZXh0QW5kTWVudGlvbnNGcm9tT3BzKG9wcyk7XG4gICAgICBhc3NlcnQuZXF1YWwocmVzdWx0VGV4dCwgJ1RoZSAgdGV4dCcpO1xuICAgICAgYXNzZXJ0LmVxdWFsKHJlc3VsdE1lbnRpb25zLmxlbmd0aCwgMCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cmltbWVkIG9mIHRyYWlsaW5nIG5ld2xpbmVzJywgKCkgPT4ge1xuICAgICAgY29uc3Qgb3BzID0gW3sgaW5zZXJ0OiAnIFRoZVxcbnRleHRcXG5cXG5cXG4nIH1dO1xuICAgICAgY29uc3QgW3Jlc3VsdFRleHQsIHJlc3VsdE1lbnRpb25zXSA9IGdldFRleHRBbmRNZW50aW9uc0Zyb21PcHMob3BzKTtcbiAgICAgIGFzc2VydC5lcXVhbChyZXN1bHRUZXh0LCAnVGhlXFxudGV4dCcpO1xuICAgICAgYXNzZXJ0LmVxdWFsKHJlc3VsdE1lbnRpb25zLmxlbmd0aCwgMCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnaXZlbiB0ZXh0LCBlbW9qaSwgYW5kIG1lbnRpb25zJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRoZSB0cmltbWVkIHRleHQgd2l0aCBwbGFjZWhvbGRlcnMgYW5kIG1lbnRpb25zJywgKCkgPT4ge1xuICAgICAgY29uc3Qgb3BzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgaW5zZXJ0OiB7XG4gICAgICAgICAgICBlbW9qaTogJ1x1RDgzRFx1REUwMicsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGluc2VydDogJyB3b3csIGZ1bm55LCAnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaW5zZXJ0OiB7XG4gICAgICAgICAgICBtZW50aW9uOiB7XG4gICAgICAgICAgICAgIHV1aWQ6ICdhYmNkZWYnLFxuICAgICAgICAgICAgICB0aXRsZTogJ0BmcmVkJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF07XG4gICAgICBjb25zdCBbcmVzdWx0VGV4dCwgcmVzdWx0TWVudGlvbnNdID0gZ2V0VGV4dEFuZE1lbnRpb25zRnJvbU9wcyhvcHMpO1xuICAgICAgYXNzZXJ0LmVxdWFsKHJlc3VsdFRleHQsICdcdUQ4M0RcdURFMDIgd293LCBmdW5ueSwgXFx1RkZGQycpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHRNZW50aW9ucywgW1xuICAgICAgICB7XG4gICAgICAgICAgbGVuZ3RoOiAxLFxuICAgICAgICAgIG1lbnRpb25VdWlkOiAnYWJjZGVmJyxcbiAgICAgICAgICByZXBsYWNlbWVudFRleHQ6ICdAZnJlZCcsXG4gICAgICAgICAgc3RhcnQ6IDE1LFxuICAgICAgICB9LFxuICAgICAgXSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnaXZlbiBvbmx5IG1lbnRpb25zJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRoZSB0cmltbWVkIHRleHQgd2l0aCBwbGFjZWhvbGRlcnMgYW5kIG1lbnRpb25zJywgKCkgPT4ge1xuICAgICAgY29uc3Qgb3BzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgaW5zZXJ0OiB7XG4gICAgICAgICAgICBtZW50aW9uOiB7XG4gICAgICAgICAgICAgIHV1aWQ6ICdhYmNkZWYnLFxuICAgICAgICAgICAgICB0aXRsZTogJ0BmcmVkJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF07XG4gICAgICBjb25zdCBbcmVzdWx0VGV4dCwgcmVzdWx0TWVudGlvbnNdID0gZ2V0VGV4dEFuZE1lbnRpb25zRnJvbU9wcyhvcHMpO1xuICAgICAgYXNzZXJ0LmVxdWFsKHJlc3VsdFRleHQsICdcXHVGRkZDJyk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdE1lbnRpb25zLCBbXG4gICAgICAgIHtcbiAgICAgICAgICBsZW5ndGg6IDEsXG4gICAgICAgICAgbWVudGlvblV1aWQ6ICdhYmNkZWYnLFxuICAgICAgICAgIHJlcGxhY2VtZW50VGV4dDogJ0BmcmVkJyxcbiAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgfSxcbiAgICAgIF0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2RvZXMgbm90IHRyaW0gbmV3bGluZXMgcGFkZGluZyBtZW50aW9ucycsICgpID0+IHtcbiAgICAgIGNvbnN0IG9wcyA9IFtcbiAgICAgICAgeyBpbnNlcnQ6ICd0ZXN0IFxcbicgfSxcbiAgICAgICAge1xuICAgICAgICAgIGluc2VydDoge1xuICAgICAgICAgICAgbWVudGlvbjoge1xuICAgICAgICAgICAgICB1dWlkOiAnYWJjZGVmJyxcbiAgICAgICAgICAgICAgdGl0bGU6ICdAZnJlZCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgaW5zZXJ0OiAnXFxuIHRlc3QnIH0sXG4gICAgICBdO1xuICAgICAgY29uc3QgW3Jlc3VsdFRleHQsIHJlc3VsdE1lbnRpb25zXSA9IGdldFRleHRBbmRNZW50aW9uc0Zyb21PcHMob3BzKTtcbiAgICAgIGFzc2VydC5lcXVhbChyZXN1bHRUZXh0LCAndGVzdCBcXG5cXHVGRkZDXFxuIHRlc3QnKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0TWVudGlvbnMsIFtcbiAgICAgICAge1xuICAgICAgICAgIGxlbmd0aDogMSxcbiAgICAgICAgICBtZW50aW9uVXVpZDogJ2FiY2RlZicsXG4gICAgICAgICAgcmVwbGFjZW1lbnRUZXh0OiAnQGZyZWQnLFxuICAgICAgICAgIHN0YXJ0OiA2LFxuICAgICAgICB9LFxuICAgICAgXSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdnZXREZWx0YVRvUmVzdGFydE1lbnRpb24nLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdnaXZlbiB0ZXh0IGFuZCBlbW9qaScsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB0aGUgY29ycmVjdCByZXRhaW5zLCBhIGRlbGV0ZSwgYW5kIGFuIEAnLCAoKSA9PiB7XG4gICAgICBjb25zdCBvcmlnaW5hbE9wcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIGluc2VydDoge1xuICAgICAgICAgICAgZW1vamk6ICdcdUQ4M0RcdURFMDInLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpbnNlcnQ6IHtcbiAgICAgICAgICAgIG1lbnRpb246IHtcbiAgICAgICAgICAgICAgdXVpZDogJ2doaWprbCcsXG4gICAgICAgICAgICAgIHRpdGxlOiAnQHNhbScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpbnNlcnQ6ICcgd293LCBmdW5ueSwgJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGluc2VydDoge1xuICAgICAgICAgICAgbWVudGlvbjoge1xuICAgICAgICAgICAgICB1dWlkOiAnYWJjZGVmJyxcbiAgICAgICAgICAgICAgdGl0bGU6ICdAZnJlZCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdO1xuXG4gICAgICBjb25zdCB7IG9wcyB9ID0gZ2V0RGVsdGFUb1Jlc3RhcnRNZW50aW9uKG9yaWdpbmFsT3BzKTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChvcHMsIFtcbiAgICAgICAge1xuICAgICAgICAgIHJldGFpbjogMSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHJldGFpbjogMSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHJldGFpbjogMTMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICByZXRhaW46IDEsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBkZWxldGU6IDEsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpbnNlcnQ6ICdAJyxcbiAgICAgICAgfSxcbiAgICAgIF0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLGtCQUlPO0FBRVAsU0FBUyxpQ0FBaUMsTUFBTTtBQUM5QyxRQUFNLGNBQWMsQ0FBQyxVQUFVLFFBQVE7QUFFdkMsV0FBUyxjQUFjLE1BQU07QUFDM0IsT0FBRyxvQkFBb0IsTUFBTTtBQUMzQixZQUFNLGNBQWM7QUFBQSxRQUNsQjtBQUFBLFVBQ0UsUUFBUTtBQUFBLFFBQ1Y7QUFBQSxNQUNGO0FBRUEsWUFBTSxFQUFFLFFBQVEsK0NBQThCLGFBQWEsV0FBVztBQUV0RSx5QkFBTyxVQUFVLEtBQUssQ0FBQyxFQUFFLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFBQSxJQUN4QyxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUyxrQ0FBa0Ms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
