var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var sinon = __toESM(require("sinon"));
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_getMuteOptions = require("../../util/getMuteOptions");
describe("getMuteOptions", () => {
  const HOUR = 36e5;
  const DAY = HOUR * 24;
  const WEEK = DAY * 7;
  const EXPECTED_DEFAULT_OPTIONS = [
    {
      name: "Mute for one hour",
      value: HOUR
    },
    {
      name: "Mute for eight hours",
      value: HOUR * 8
    },
    {
      name: "Mute for one day",
      value: DAY
    },
    {
      name: "Mute for one week",
      value: WEEK
    },
    {
      name: "Mute always",
      value: Number.MAX_SAFE_INTEGER
    }
  ];
  const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
  describe("when not muted", () => {
    it("returns the 5 default options", () => {
      import_chai.assert.deepStrictEqual((0, import_getMuteOptions.getMuteOptions)(void 0, i18n), EXPECTED_DEFAULT_OPTIONS);
    });
  });
  describe("when muted", () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
      sandbox.useFakeTimers({
        now: new Date(2e3, 3, 20, 12, 0, 0)
      });
    });
    afterEach(() => {
      sandbox.restore();
    });
    it('returns a current mute label, an "Unmute" option, and then the 5 default options', () => {
      import_chai.assert.deepStrictEqual((0, import_getMuteOptions.getMuteOptions)(new Date(2e3, 3, 20, 18, 30, 0).valueOf(), i18n), [
        {
          disabled: true,
          name: "Muted until 6:30 PM",
          value: -1
        },
        {
          name: "Unmute",
          value: 0
        },
        ...EXPECTED_DEFAULT_OPTIONS
      ]);
    });
    it("renders the current mute label with a date if it's on a different day", () => {
      import_chai.assert.deepStrictEqual((0, import_getMuteOptions.getMuteOptions)(new Date(2e3, 3, 21, 18, 30, 0).valueOf(), i18n)[0], {
        disabled: true,
        name: "Muted until 04/21/2000, 6:30 PM",
        value: -1
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0TXV0ZU9wdGlvbnNfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5pbXBvcnQgeyBnZXRNdXRlT3B0aW9ucyB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0TXV0ZU9wdGlvbnMnO1xuXG5kZXNjcmliZSgnZ2V0TXV0ZU9wdGlvbnMnLCAoKSA9PiB7XG4gIGNvbnN0IEhPVVIgPSAzNjAwMDAwO1xuICBjb25zdCBEQVkgPSBIT1VSICogMjQ7XG4gIGNvbnN0IFdFRUsgPSBEQVkgKiA3O1xuICBjb25zdCBFWFBFQ1RFRF9ERUZBVUxUX09QVElPTlMgPSBbXG4gICAge1xuICAgICAgbmFtZTogJ011dGUgZm9yIG9uZSBob3VyJyxcbiAgICAgIHZhbHVlOiBIT1VSLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ011dGUgZm9yIGVpZ2h0IGhvdXJzJyxcbiAgICAgIHZhbHVlOiBIT1VSICogOCxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdNdXRlIGZvciBvbmUgZGF5JyxcbiAgICAgIHZhbHVlOiBEQVksXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnTXV0ZSBmb3Igb25lIHdlZWsnLFxuICAgICAgdmFsdWU6IFdFRUssXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnTXV0ZSBhbHdheXMnLFxuICAgICAgdmFsdWU6IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLFxuICAgIH0sXG4gIF07XG5cbiAgY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuICBkZXNjcmliZSgnd2hlbiBub3QgbXV0ZWQnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgdGhlIDUgZGVmYXVsdCBvcHRpb25zJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChcbiAgICAgICAgZ2V0TXV0ZU9wdGlvbnModW5kZWZpbmVkLCBpMThuKSxcbiAgICAgICAgRVhQRUNURURfREVGQVVMVF9PUFRJT05TXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnd2hlbiBtdXRlZCcsICgpID0+IHtcbiAgICBsZXQgc2FuZGJveDogc2lub24uU2lub25TYW5kYm94O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBzYW5kYm94ID0gc2lub24uY3JlYXRlU2FuZGJveCgpO1xuICAgICAgc2FuZGJveC51c2VGYWtlVGltZXJzKHtcbiAgICAgICAgbm93OiBuZXcgRGF0ZSgyMDAwLCAzLCAyMCwgMTIsIDAsIDApLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgc2FuZGJveC5yZXN0b3JlKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhIGN1cnJlbnQgbXV0ZSBsYWJlbCwgYW4gXCJVbm11dGVcIiBvcHRpb24sIGFuZCB0aGVuIHRoZSA1IGRlZmF1bHQgb3B0aW9ucycsICgpID0+IHtcbiAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoXG4gICAgICAgIGdldE11dGVPcHRpb25zKG5ldyBEYXRlKDIwMDAsIDMsIDIwLCAxOCwgMzAsIDApLnZhbHVlT2YoKSwgaTE4biksXG4gICAgICAgIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIG5hbWU6ICdNdXRlZCB1bnRpbCA2OjMwIFBNJyxcbiAgICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdVbm11dGUnLFxuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAuLi5FWFBFQ1RFRF9ERUZBVUxUX09QVElPTlMsXG4gICAgICAgIF1cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdChcInJlbmRlcnMgdGhlIGN1cnJlbnQgbXV0ZSBsYWJlbCB3aXRoIGEgZGF0ZSBpZiBpdCdzIG9uIGEgZGlmZmVyZW50IGRheVwiLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKFxuICAgICAgICBnZXRNdXRlT3B0aW9ucyhuZXcgRGF0ZSgyMDAwLCAzLCAyMSwgMTgsIDMwLCAwKS52YWx1ZU9mKCksIGkxOG4pWzBdLFxuICAgICAgICB7XG4gICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgbmFtZTogJ011dGVkIHVudGlsIDA0LzIxLzIwMDAsIDY6MzAgUE0nLFxuICAgICAgICAgIHZhbHVlOiAtMSxcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUN2QixZQUF1QjtBQUN2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBRXZCLDRCQUErQjtBQUUvQixTQUFTLGtCQUFrQixNQUFNO0FBQy9CLFFBQU0sT0FBTztBQUNiLFFBQU0sTUFBTSxPQUFPO0FBQ25CLFFBQU0sT0FBTyxNQUFNO0FBQ25CLFFBQU0sMkJBQTJCO0FBQUEsSUFDL0I7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxJQUNUO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTyxPQUFPO0FBQUEsSUFDaEI7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxJQUNUO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTyxPQUFPO0FBQUEsSUFDaEI7QUFBQSxFQUNGO0FBRUEsUUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsV0FBUyxrQkFBa0IsTUFBTTtBQUMvQixPQUFHLGlDQUFpQyxNQUFNO0FBQ3hDLHlCQUFPLGdCQUNMLDBDQUFlLFFBQVcsSUFBSSxHQUM5Qix3QkFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFdBQVMsY0FBYyxNQUFNO0FBQzNCLFFBQUk7QUFFSixlQUFXLE1BQU07QUFDZixnQkFBVSxNQUFNLGNBQWM7QUFDOUIsY0FBUSxjQUFjO0FBQUEsUUFDcEIsS0FBSyxJQUFJLEtBQUssS0FBTSxHQUFHLElBQUksSUFBSSxHQUFHLENBQUM7QUFBQSxNQUNyQyxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsY0FBVSxNQUFNO0FBQ2QsY0FBUSxRQUFRO0FBQUEsSUFDbEIsQ0FBQztBQUVELE9BQUcsb0ZBQW9GLE1BQU07QUFDM0YseUJBQU8sZ0JBQ0wsMENBQWUsSUFBSSxLQUFLLEtBQU0sR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsUUFBUSxHQUFHLElBQUksR0FDL0Q7QUFBQSxRQUNFO0FBQUEsVUFDRSxVQUFVO0FBQUEsVUFDVixNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsUUFDVDtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxRQUNUO0FBQUEsUUFDQSxHQUFHO0FBQUEsTUFDTCxDQUNGO0FBQUEsSUFDRixDQUFDO0FBRUQsT0FBRyx5RUFBeUUsTUFBTTtBQUNoRix5QkFBTyxnQkFDTCwwQ0FBZSxJQUFJLEtBQUssS0FBTSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRSxRQUFRLEdBQUcsSUFBSSxFQUFFLElBQ2pFO0FBQUEsUUFDRSxVQUFVO0FBQUEsUUFDVixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsTUFDVCxDQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
