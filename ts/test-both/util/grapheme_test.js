var import_chai = require("chai");
var import_grapheme = require("../../util/grapheme");
describe("grapheme utilities", () => {
  describe("getGraphemes", () => {
    it("returns extended graphemes in a string", () => {
      import_chai.assert.deepEqual([...(0, import_grapheme.getGraphemes)("")], []);
      import_chai.assert.deepEqual([...(0, import_grapheme.getGraphemes)("hello")], [..."hello"]);
      import_chai.assert.deepEqual([...(0, import_grapheme.getGraphemes)("Bokm\xE5l")], ["B", "o", "k", "m", "\xE5", "l"]);
      import_chai.assert.deepEqual([...(0, import_grapheme.getGraphemes)("\u{1F4A9}\u{1F4A9}\u{1F4A9}")], ["\u{1F4A9}", "\u{1F4A9}", "\u{1F4A9}"]);
      import_chai.assert.deepEqual([...(0, import_grapheme.getGraphemes)("\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F469}")], ["\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F469}"]);
      import_chai.assert.deepEqual([...(0, import_grapheme.getGraphemes)("\u{1F44C}\u{1F3FD}\u{1F44C}\u{1F3FE}\u{1F44C}\u{1F3FF}")], ["\u{1F44C}\u{1F3FD}", "\u{1F44C}\u{1F3FE}", "\u{1F44C}\u{1F3FF}"]);
      import_chai.assert.deepEqual([...(0, import_grapheme.getGraphemes)("L\u0337\u035D\u0333\u0354\u0332G\u0327\u0335\u035D\u035F\u032E\u032F\u0324\u0329\u0319\u034D\u032C\u031F\u0349\u0339\u0318\u0339\u034D\u0348\u032E\u0326\u0330\u0323O\u0358\u0336\u0334\u0361\u032E\u033B\u032E\u0317!\u0334\u0337\u031F\u0353\u0353")], ["L\u0337\u035D\u0333\u0354\u0332", "G\u0327\u0335\u035D\u035F\u032E\u032F\u0324\u0329\u0319\u034D\u032C\u031F\u0349\u0339\u0318\u0339\u034D\u0348\u032E\u0326\u0330\u0323", "O\u0358\u0336\u0334\u0361\u032E\u033B\u032E\u0317", "!\u0334\u0337\u031F\u0353\u0353"]);
    });
  });
  describe("count", () => {
    it("returns the number of extended graphemes in a string (not necessarily the length)", () => {
      import_chai.assert.strictEqual((0, import_grapheme.count)(""), 0);
      import_chai.assert.strictEqual((0, import_grapheme.count)("boring text"), 11);
      import_chai.assert.strictEqual((0, import_grapheme.count)("Bokm\xE5l"), 6);
      import_chai.assert.strictEqual((0, import_grapheme.count)("\u{1F4A9}\u{1F4A9}\u{1F4A9}"), 3);
      import_chai.assert.strictEqual((0, import_grapheme.count)("\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F469}"), 1);
      import_chai.assert.strictEqual((0, import_grapheme.count)("\u{1F1F9}\u{1F1F9}\u{1F33C}\u{1F1F9}\u{1F1F9}\u{1F33C}\u{1F1F9}\u{1F1F9}"), 5);
      import_chai.assert.strictEqual((0, import_grapheme.count)("\u{1F1F9}\u{1F1F9}"), 1);
      import_chai.assert.strictEqual((0, import_grapheme.count)("\u{1F1F9}\u{1F1F9} "), 2);
      import_chai.assert.strictEqual((0, import_grapheme.count)("\u{1F44C}\u{1F3FD}\u{1F44C}\u{1F3FE}\u{1F44C}\u{1F3FF}"), 3);
      import_chai.assert.strictEqual((0, import_grapheme.count)("\u{1F60D}"), 1);
      import_chai.assert.strictEqual((0, import_grapheme.count)("\u{1F469}\u{1F3FD}"), 1);
      import_chai.assert.strictEqual((0, import_grapheme.count)("\u{1F47E}\u{1F647}\u{1F481}\u{1F645}\u{1F646}\u{1F64B}\u{1F64E}\u{1F64D}"), 8);
      import_chai.assert.strictEqual((0, import_grapheme.count)("\u{1F435}\u{1F648}\u{1F649}\u{1F64A}"), 4);
      import_chai.assert.strictEqual((0, import_grapheme.count)("\u2764\uFE0F\u{1F494}\u{1F48C}\u{1F495}\u{1F49E}\u{1F493}\u{1F497}\u{1F496}\u{1F498}\u{1F49D}\u{1F49F}\u{1F49C}\u{1F49B}\u{1F49A}\u{1F499}"), 15);
      import_chai.assert.strictEqual((0, import_grapheme.count)("\u270B\u{1F3FF}\u{1F4AA}\u{1F3FF}\u{1F450}\u{1F3FF}\u{1F64C}\u{1F3FF}\u{1F44F}\u{1F3FF}\u{1F64F}\u{1F3FF}"), 6);
      import_chai.assert.strictEqual((0, import_grapheme.count)("\u{1F6BE}\u{1F192}\u{1F193}\u{1F195}\u{1F196}\u{1F197}\u{1F199}\u{1F3E7}"), 8);
      import_chai.assert.strictEqual((0, import_grapheme.count)("0\uFE0F\u20E31\uFE0F\u20E32\uFE0F\u20E33\uFE0F\u20E34\uFE0F\u20E35\uFE0F\u20E36\uFE0F\u20E37\uFE0F\u20E38\uFE0F\u20E39\uFE0F\u20E3\u{1F51F}"), 11);
      import_chai.assert.strictEqual((0, import_grapheme.count)("\u{1F1FA}\u{1F1F8}\u{1F1F7}\u{1F1FA}\u{1F1E6}\u{1F1EB}\u{1F1E6}\u{1F1F2}"), 4);
      import_chai.assert.strictEqual((0, import_grapheme.count)("\u{1F1FA}\u{1F1F8}\u{1F1F7}\u{1F1FA}\u{1F1F8} \u{1F1E6}\u{1F1EB}\u{1F1E6}\u{1F1F2}\u{1F1F8}"), 7);
      import_chai.assert.strictEqual((0, import_grapheme.count)("\u{1F1FA}\u{1F1F8}\u{1F1F7}\u{1F1FA}\u{1F1F8}\u{1F1E6}\u{1F1EB}\u{1F1E6}\u{1F1F2}"), 5);
      import_chai.assert.strictEqual((0, import_grapheme.count)("\u{1F1FA}\u{1F1F8}\u{1F1F7}\u{1F1FA}\u{1F1F8}\u{1F1E6}"), 3);
      import_chai.assert.strictEqual((0, import_grapheme.count)("\uFF11\uFF12\uFF13"), 3);
      import_chai.assert.strictEqual((0, import_grapheme.count)("P\u0159\xEDli\u0161 \u017Elu\u0165ou\u010Dk\xFD k\u016F\u0148 \xFAp\u011Bl \u010F\xE1belsk\xE9 \xF3dy."), 39);
      import_chai.assert.strictEqual((0, import_grapheme.count)("Z\u0351\u036B\u0343\u036A\u0302\u036B\u033D\u034F\u0334\u0319\u0324\u031E\u0349\u035A\u032F\u031E\u0320\u034DA\u036B\u0357\u0334\u0362\u0335\u031C\u0330\u0354L\u0368\u0367\u0369\u0358\u0320G\u0311\u0357\u030E\u0305\u035B\u0341\u0334\u033B\u0348\u034D\u0354\u0339O\u0342\u030C\u030C\u0358\u0328\u0335\u0339\u033B\u031D\u0333"), 5);
      import_chai.assert.strictEqual((0, import_grapheme.count)("H\u0489\u0327\u0358\u0360\u0338A\u0362\u035EV\u031B\u031BI\u0334\u0338N\u034F\u0315\u034FG\u0489\u035C\u0335\u034F\u0362 \u0327\u0327\u0341T\u031B\u0358\u0336\u0361R\u0328\u0338\u0340\u0335\u0322O\u0321\u0337U\u0361\u0489B\u0362\u0336\u031B\u035EL\u0362\u0338\u035F\u0338\u0358E\u0341\u0338 \u031B\u0358\u0338\u034FR\u035FE\u0360\u035E\u0340A\u035D\u0338D\u0315\u0358\u0327\u035CI\u0358\u0335\u0489\u035C\u035EN\u0321\u0337\u0322\u0360G\u0358\u0360\u0334 \u035F\u035ET\u034F\u0322\u0361\u0341E\u0340\u0340X\u0315\u0489\u0322\u0340T\u0360\u0322?\u0315\u034F\u0358\u0322\u0362"), 28);
      import_chai.assert.strictEqual((0, import_grapheme.count)("L\u0337\u035D\u0333\u0354\u0332G\u0327\u0335\u035D\u035F\u032E\u032F\u0324\u0329\u0319\u034D\u032C\u031F\u0349\u0339\u0318\u0339\u034D\u0348\u032E\u0326\u0330\u0323O\u0358\u0336\u0334\u0361\u032E\u033B\u032E\u0317!\u0334\u0337\u031F\u0353\u0353"), 4);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ3JhcGhlbWVfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHsgZ2V0R3JhcGhlbWVzLCBjb3VudCB9IGZyb20gJy4uLy4uL3V0aWwvZ3JhcGhlbWUnO1xuXG5kZXNjcmliZSgnZ3JhcGhlbWUgdXRpbGl0aWVzJywgKCkgPT4ge1xuICBkZXNjcmliZSgnZ2V0R3JhcGhlbWVzJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGV4dGVuZGVkIGdyYXBoZW1lcyBpbiBhIHN0cmluZycsICgpID0+IHtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoWy4uLmdldEdyYXBoZW1lcygnJyldLCBbXSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFsuLi5nZXRHcmFwaGVtZXMoJ2hlbGxvJyldLCBbLi4uJ2hlbGxvJ10pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgWy4uLmdldEdyYXBoZW1lcygnQm9rbVx1MDBFNWwnKV0sXG4gICAgICAgIFsnQicsICdvJywgJ2snLCAnbScsICdcdTAwRTUnLCAnbCddXG4gICAgICApO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFsuLi5nZXRHcmFwaGVtZXMoJ1x1RDgzRFx1RENBOVx1RDgzRFx1RENBOVx1RDgzRFx1RENBOScpXSwgWydcdUQ4M0RcdURDQTknLCAnXHVEODNEXHVEQ0E5JywgJ1x1RDgzRFx1RENBOSddKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoWy4uLmdldEdyYXBoZW1lcygnXHVEODNEXHVEQzY5XHUyMDBEXHUyNzY0XHVGRTBGXHUyMDBEXHVEODNEXHVEQzY5JyldLCBbJ1x1RDgzRFx1REM2OVx1MjAwRFx1Mjc2NFx1RkUwRlx1MjAwRFx1RDgzRFx1REM2OSddKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoWy4uLmdldEdyYXBoZW1lcygnXHVEODNEXHVEQzRDXHVEODNDXHVERkZEXHVEODNEXHVEQzRDXHVEODNDXHVERkZFXHVEODNEXHVEQzRDXHVEODNDXHVERkZGJyldLCBbJ1x1RDgzRFx1REM0Q1x1RDgzQ1x1REZGRCcsICdcdUQ4M0RcdURDNENcdUQ4M0NcdURGRkUnLCAnXHVEODNEXHVEQzRDXHVEODNDXHVERkZGJ10pO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFsuLi5nZXRHcmFwaGVtZXMoJ0xcdTAzMzdcdTAzNURcdTAzMzNcdTAzNTRcdTAzMzJHXHUwMzI3XHUwMzM1XHUwMzVEXHUwMzVGXHUwMzJFXHUwMzJGXHUwMzI0XHUwMzI5XHUwMzE5XHUwMzREXHUwMzJDXHUwMzFGXHUwMzQ5XHUwMzM5XHUwMzE4XHUwMzM5XHUwMzREXHUwMzQ4XHUwMzJFXHUwMzI2XHUwMzMwXHUwMzIzT1x1MDM1OFx1MDMzNlx1MDMzNFx1MDM2MVx1MDMyRVx1MDMzQlx1MDMyRVx1MDMxNyFcdTAzMzRcdTAzMzdcdTAzMUZcdTAzNTNcdTAzNTMnKV0sIFsnTFx1MDMzN1x1MDM1RFx1MDMzM1x1MDM1NFx1MDMzMicsICdHXHUwMzI3XHUwMzM1XHUwMzVEXHUwMzVGXHUwMzJFXHUwMzJGXHUwMzI0XHUwMzI5XHUwMzE5XHUwMzREXHUwMzJDXHUwMzFGXHUwMzQ5XHUwMzM5XHUwMzE4XHUwMzM5XHUwMzREXHUwMzQ4XHUwMzJFXHUwMzI2XHUwMzMwXHUwMzIzJywgJ09cdTAzNThcdTAzMzZcdTAzMzRcdTAzNjFcdTAzMkVcdTAzM0JcdTAzMkVcdTAzMTcnLCAnIVx1MDMzNFx1MDMzN1x1MDMxRlx1MDM1M1x1MDM1MyddKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2NvdW50JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRoZSBudW1iZXIgb2YgZXh0ZW5kZWQgZ3JhcGhlbWVzIGluIGEgc3RyaW5nIChub3QgbmVjZXNzYXJpbHkgdGhlIGxlbmd0aCknLCAoKSA9PiB7XG4gICAgICAvLyBUaGVzZSB0ZXN0cyBtb2RpZmllZCBbZnJvbSBpT1NdWzBdLlxuICAgICAgLy8gWzBdOiBodHRwczovL2dpdGh1Yi5jb20vc2lnbmFsYXBwL1NpZ25hbC1pT1MvYmxvYi84MDA5MzAxMTBiMDM4NmE0YzM1MTcxNmMwMDE5NDBhM2U4ZmFjOTQyL1NpZ25hbC90ZXN0L3V0aWwvRGlzcGxheWFibGVUZXh0RmlsdGVyVGVzdC5zd2lmdCNMNDAtTDcxXG5cbiAgICAgIC8vIFBsYWluIHRleHRcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb3VudCgnJyksIDApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvdW50KCdib3JpbmcgdGV4dCcpLCAxMSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY291bnQoJ0Jva21cdTAwRTVsJyksIDYpO1xuXG4gICAgICAvLyBFbW9qaXNcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb3VudCgnXHVEODNEXHVEQ0E5XHVEODNEXHVEQ0E5XHVEODNEXHVEQ0E5JyksIDMpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvdW50KCdcdUQ4M0RcdURDNjlcdTIwMERcdTI3NjRcdUZFMEZcdTIwMERcdUQ4M0RcdURDNjknKSwgMSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY291bnQoJ1x1RDgzQ1x1RERGOVx1RDgzQ1x1RERGOVx1RDgzQ1x1REYzQ1x1RDgzQ1x1RERGOVx1RDgzQ1x1RERGOVx1RDgzQ1x1REYzQ1x1RDgzQ1x1RERGOVx1RDgzQ1x1RERGOScpLCA1KTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb3VudCgnXHVEODNDXHVEREY5XHVEODNDXHVEREY5JyksIDEpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvdW50KCdcdUQ4M0NcdURERjlcdUQ4M0NcdURERjkgJyksIDIpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvdW50KCdcdUQ4M0RcdURDNENcdUQ4M0NcdURGRkRcdUQ4M0RcdURDNENcdUQ4M0NcdURGRkVcdUQ4M0RcdURDNENcdUQ4M0NcdURGRkYnKSwgMyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY291bnQoJ1x1RDgzRFx1REUwRCcpLCAxKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb3VudCgnXHVEODNEXHVEQzY5XHVEODNDXHVERkZEJyksIDEpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvdW50KCdcdUQ4M0RcdURDN0VcdUQ4M0RcdURFNDdcdUQ4M0RcdURDODFcdUQ4M0RcdURFNDVcdUQ4M0RcdURFNDZcdUQ4M0RcdURFNEJcdUQ4M0RcdURFNEVcdUQ4M0RcdURFNEQnKSwgOCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY291bnQoJ1x1RDgzRFx1REMzNVx1RDgzRFx1REU0OFx1RDgzRFx1REU0OVx1RDgzRFx1REU0QScpLCA0KTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb3VudCgnXHUyNzY0XHVGRTBGXHVEODNEXHVEQzk0XHVEODNEXHVEQzhDXHVEODNEXHVEQzk1XHVEODNEXHVEQzlFXHVEODNEXHVEQzkzXHVEODNEXHVEQzk3XHVEODNEXHVEQzk2XHVEODNEXHVEQzk4XHVEODNEXHVEQzlEXHVEODNEXHVEQzlGXHVEODNEXHVEQzlDXHVEODNEXHVEQzlCXHVEODNEXHVEQzlBXHVEODNEXHVEQzk5JyksIDE1KTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb3VudCgnXHUyNzBCXHVEODNDXHVERkZGXHVEODNEXHVEQ0FBXHVEODNDXHVERkZGXHVEODNEXHVEQzUwXHVEODNDXHVERkZGXHVEODNEXHVERTRDXHVEODNDXHVERkZGXHVEODNEXHVEQzRGXHVEODNDXHVERkZGXHVEODNEXHVERTRGXHVEODNDXHVERkZGJyksIDYpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvdW50KCdcdUQ4M0RcdURFQkVcdUQ4M0NcdUREOTJcdUQ4M0NcdUREOTNcdUQ4M0NcdUREOTVcdUQ4M0NcdUREOTZcdUQ4M0NcdUREOTdcdUQ4M0NcdUREOTlcdUQ4M0NcdURGRTcnKSwgOCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY291bnQoJzBcdUZFMEZcdTIwRTMxXHVGRTBGXHUyMEUzMlx1RkUwRlx1MjBFMzNcdUZFMEZcdTIwRTM0XHVGRTBGXHUyMEUzNVx1RkUwRlx1MjBFMzZcdUZFMEZcdTIwRTM3XHVGRTBGXHUyMEUzOFx1RkUwRlx1MjBFMzlcdUZFMEZcdTIwRTNcdUQ4M0RcdUREMUYnKSwgMTEpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvdW50KCdcdUQ4M0NcdURERkFcdUQ4M0NcdURERjhcdUQ4M0NcdURERjdcdUQ4M0NcdURERkFcdUQ4M0NcdURERTZcdUQ4M0NcdURERUJcdUQ4M0NcdURERTZcdUQ4M0NcdURERjInKSwgNCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY291bnQoJ1x1RDgzQ1x1RERGQVx1RDgzQ1x1RERGOFx1RDgzQ1x1RERGN1x1RDgzQ1x1RERGQVx1RDgzQ1x1RERGOCBcdUQ4M0NcdURERTZcdUQ4M0NcdURERUJcdUQ4M0NcdURERTZcdUQ4M0NcdURERjJcdUQ4M0NcdURERjgnKSwgNyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY291bnQoJ1x1RDgzQ1x1RERGQVx1RDgzQ1x1RERGOFx1RDgzQ1x1RERGN1x1RDgzQ1x1RERGQVx1RDgzQ1x1RERGOFx1RDgzQ1x1RERFNlx1RDgzQ1x1RERFQlx1RDgzQ1x1RERFNlx1RDgzQ1x1RERGMicpLCA1KTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb3VudCgnXHVEODNDXHVEREZBXHVEODNDXHVEREY4XHVEODNDXHVEREY3XHVEODNDXHVEREZBXHVEODNDXHVEREY4XHVEODNDXHVEREU2JyksIDMpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvdW50KCdcdUZGMTFcdUZGMTJcdUZGMTMnKSwgMyk7XG5cbiAgICAgIC8vIE5vcm1hbCBkaWFjcml0aWMgdXNhZ2VcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb3VudCgnUFx1MDE1OVx1MDBFRGxpXHUwMTYxIFx1MDE3RWx1XHUwMTY1b3VcdTAxMERrXHUwMEZEIGtcdTAxNkZcdTAxNDggXHUwMEZBcFx1MDExQmwgXHUwMTBGXHUwMEUxYmVsc2tcdTAwRTkgXHUwMEYzZHkuJyksIDM5KTtcblxuICAgICAgLy8gRXhjZXNzaXZlIGRpYWNyaXRpY3NcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChjb3VudCgnWlx1MDM1MVx1MDM2Qlx1MDM0M1x1MDM2QVx1MDMwMlx1MDM2Qlx1MDMzRFx1MDM0Rlx1MDMzNFx1MDMxOVx1MDMyNFx1MDMxRVx1MDM0OVx1MDM1QVx1MDMyRlx1MDMxRVx1MDMyMFx1MDM0REFcdTAzNkJcdTAzNTdcdTAzMzRcdTAzNjJcdTAzMzVcdTAzMUNcdTAzMzBcdTAzNTRMXHUwMzY4XHUwMzY3XHUwMzY5XHUwMzU4XHUwMzIwR1x1MDMxMVx1MDM1N1x1MDMwRVx1MDMwNVx1MDM1Qlx1MDM0MVx1MDMzNFx1MDMzQlx1MDM0OFx1MDM0RFx1MDM1NFx1MDMzOU9cdTAzNDJcdTAzMENcdTAzMENcdTAzNThcdTAzMjhcdTAzMzVcdTAzMzlcdTAzM0JcdTAzMURcdTAzMzMnKSwgNSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoY291bnQoJ0hcdTA0ODlcdTAzMjdcdTAzNThcdTAzNjBcdTAzMzhBXHUwMzYyXHUwMzVFVlx1MDMxQlx1MDMxQklcdTAzMzRcdTAzMzhOXHUwMzRGXHUwMzE1XHUwMzRGR1x1MDQ4OVx1MDM1Q1x1MDMzNVx1MDM0Rlx1MDM2MiBcdTAzMjdcdTAzMjdcdTAzNDFUXHUwMzFCXHUwMzU4XHUwMzM2XHUwMzYxUlx1MDMyOFx1MDMzOFx1MDM0MFx1MDMzNVx1MDMyMk9cdTAzMjFcdTAzMzdVXHUwMzYxXHUwNDg5Qlx1MDM2Mlx1MDMzNlx1MDMxQlx1MDM1RUxcdTAzNjJcdTAzMzhcdTAzNUZcdTAzMzhcdTAzNThFXHUwMzQxXHUwMzM4IFx1MDMxQlx1MDM1OFx1MDMzOFx1MDM0RlJcdTAzNUZFXHUwMzYwXHUwMzVFXHUwMzQwQVx1MDM1RFx1MDMzOERcdTAzMTVcdTAzNThcdTAzMjdcdTAzNUNJXHUwMzU4XHUwMzM1XHUwNDg5XHUwMzVDXHUwMzVFTlx1MDMyMVx1MDMzN1x1MDMyMlx1MDM2MEdcdTAzNThcdTAzNjBcdTAzMzQgXHUwMzVGXHUwMzVFVFx1MDM0Rlx1MDMyMlx1MDM2MVx1MDM0MUVcdTAzNDBcdTAzNDBYXHUwMzE1XHUwNDg5XHUwMzIyXHUwMzQwVFx1MDM2MFx1MDMyMj9cdTAzMTVcdTAzNEZcdTAzNThcdTAzMjJcdTAzNjInKSwgMjgpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNvdW50KCdMXHUwMzM3XHUwMzVEXHUwMzMzXHUwMzU0XHUwMzMyR1x1MDMyN1x1MDMzNVx1MDM1RFx1MDM1Rlx1MDMyRVx1MDMyRlx1MDMyNFx1MDMyOVx1MDMxOVx1MDM0RFx1MDMyQ1x1MDMxRlx1MDM0OVx1MDMzOVx1MDMxOFx1MDMzOVx1MDM0RFx1MDM0OFx1MDMyRVx1MDMyNlx1MDMzMFx1MDMyM09cdTAzNThcdTAzMzZcdTAzMzRcdTAzNjFcdTAzMkVcdTAzM0JcdTAzMkVcdTAzMTchXHUwMzM0XHUwMzM3XHUwMzFGXHUwMzUzXHUwMzUzJyksIDQpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLHNCQUFvQztBQUVwQyxTQUFTLHNCQUFzQixNQUFNO0FBQ25DLFdBQVMsZ0JBQWdCLE1BQU07QUFDN0IsT0FBRywwQ0FBMEMsTUFBTTtBQUNqRCx5QkFBTyxVQUFVLENBQUMsR0FBRyxrQ0FBYSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUMseUJBQU8sVUFBVSxDQUFDLEdBQUcsa0NBQWEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQztBQUN6RCx5QkFBTyxVQUNMLENBQUMsR0FBRyxrQ0FBYSxXQUFRLENBQUMsR0FDMUIsQ0FBQyxLQUFLLEtBQUssS0FBSyxLQUFLLFFBQUssR0FBRyxDQUMvQjtBQUVBLHlCQUFPLFVBQVUsQ0FBQyxHQUFHLGtDQUFhLDZCQUFRLENBQUMsR0FBRyxDQUFDLGFBQU0sYUFBTSxXQUFJLENBQUM7QUFDaEUseUJBQU8sVUFBVSxDQUFDLEdBQUcsa0NBQWEsNENBQVUsQ0FBQyxHQUFHLENBQUMsNENBQVUsQ0FBQztBQUM1RCx5QkFBTyxVQUFVLENBQUMsR0FBRyxrQ0FBYSx3REFBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBUSxzQkFBUSxvQkFBTSxDQUFDO0FBRTVFLHlCQUFPLFVBQVUsQ0FBQyxHQUFHLGtDQUFhLHNQQUE4QyxDQUFDLEdBQUcsQ0FBQyxtQ0FBVSx5SUFBMkIscURBQWEsaUNBQVEsQ0FBQztBQUFBLElBQ2xKLENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLFNBQVMsTUFBTTtBQUN0QixPQUFHLHFGQUFxRixNQUFNO0FBSzVGLHlCQUFPLFlBQVksMkJBQU0sRUFBRSxHQUFHLENBQUM7QUFDL0IseUJBQU8sWUFBWSwyQkFBTSxhQUFhLEdBQUcsRUFBRTtBQUMzQyx5QkFBTyxZQUFZLDJCQUFNLFdBQVEsR0FBRyxDQUFDO0FBR3JDLHlCQUFPLFlBQVksMkJBQU0sNkJBQVEsR0FBRyxDQUFDO0FBQ3JDLHlCQUFPLFlBQVksMkJBQU0sNENBQVUsR0FBRyxDQUFDO0FBQ3ZDLHlCQUFPLFlBQVksMkJBQU0sMEVBQWtCLEdBQUcsQ0FBQztBQUMvQyx5QkFBTyxZQUFZLDJCQUFNLG9CQUFNLEdBQUcsQ0FBQztBQUNuQyx5QkFBTyxZQUFZLDJCQUFNLHFCQUFPLEdBQUcsQ0FBQztBQUNwQyx5QkFBTyxZQUFZLDJCQUFNLHdEQUFjLEdBQUcsQ0FBQztBQUMzQyx5QkFBTyxZQUFZLDJCQUFNLFdBQUksR0FBRyxDQUFDO0FBQ2pDLHlCQUFPLFlBQVksMkJBQU0sb0JBQU0sR0FBRyxDQUFDO0FBQ25DLHlCQUFPLFlBQVksMkJBQU0sMEVBQWtCLEdBQUcsQ0FBQztBQUMvQyx5QkFBTyxZQUFZLDJCQUFNLHNDQUFVLEdBQUcsQ0FBQztBQUN2Qyx5QkFBTyxZQUFZLDJCQUFNLDRJQUFnQyxHQUFHLEVBQUU7QUFDOUQseUJBQU8sWUFBWSwyQkFBTSwyR0FBeUIsR0FBRyxDQUFDO0FBQ3RELHlCQUFPLFlBQVksMkJBQU0sMEVBQWtCLEdBQUcsQ0FBQztBQUMvQyx5QkFBTyxZQUFZLDJCQUFNLDZJQUFrQyxHQUFHLEVBQUU7QUFDaEUseUJBQU8sWUFBWSwyQkFBTSwwRUFBa0IsR0FBRyxDQUFDO0FBQy9DLHlCQUFPLFlBQVksMkJBQU0sNkZBQXVCLEdBQUcsQ0FBQztBQUNwRCx5QkFBTyxZQUFZLDJCQUFNLG1GQUFvQixHQUFHLENBQUM7QUFDakQseUJBQU8sWUFBWSwyQkFBTSx3REFBYyxHQUFHLENBQUM7QUFDM0MseUJBQU8sWUFBWSwyQkFBTSxvQkFBSyxHQUFHLENBQUM7QUFHbEMseUJBQU8sWUFBWSwyQkFBTSx3R0FBeUMsR0FBRyxFQUFFO0FBR3ZFLHlCQUFPLFlBQVksMkJBQU0scVVBQTRELEdBQUcsQ0FBQztBQUN6Rix5QkFBTyxZQUFZLDJCQUFNLGdrQkFBeUgsR0FBRyxFQUFFO0FBQ3ZKLHlCQUFPLFlBQVksMkJBQU0sc1BBQThDLEdBQUcsQ0FBQztBQUFBLElBQzdFLENBQUM7QUFBQSxFQUNILENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
