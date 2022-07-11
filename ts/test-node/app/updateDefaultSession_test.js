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
var sinon = __toESM(require("sinon"));
var import_electron = require("electron");
var import_uuid = require("uuid");
var import_updateDefaultSession = require("../../../app/updateDefaultSession");
describe("updateDefaultSession", () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it("sets the spellcheck URL", () => {
    const sesh = import_electron.session.fromPartition((0, import_uuid.v4)());
    const stub = sandbox.stub(sesh, "setSpellCheckerDictionaryDownloadURL");
    (0, import_updateDefaultSession.updateDefaultSession)(sesh);
    sinon.assert.calledOnce(stub);
    sinon.assert.calledWith(stub, `https://updates.signal.org/desktop/hunspell_dictionaries/${process.versions.electron}/`);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXBkYXRlRGVmYXVsdFNlc3Npb25fdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgeyBzZXNzaW9uIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuXG5pbXBvcnQgeyB1cGRhdGVEZWZhdWx0U2Vzc2lvbiB9IGZyb20gJy4uLy4uLy4uL2FwcC91cGRhdGVEZWZhdWx0U2Vzc2lvbic7XG5cbmRlc2NyaWJlKCd1cGRhdGVEZWZhdWx0U2Vzc2lvbicsICgpID0+IHtcbiAgbGV0IHNhbmRib3g6IHNpbm9uLlNpbm9uU2FuZGJveDtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBzYW5kYm94ID0gc2lub24uY3JlYXRlU2FuZGJveCgpO1xuICB9KTtcblxuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIHNhbmRib3gucmVzdG9yZSgpO1xuICB9KTtcblxuICBpdCgnc2V0cyB0aGUgc3BlbGxjaGVjayBVUkwnLCAoKSA9PiB7XG4gICAgY29uc3Qgc2VzaCA9IHNlc3Npb24uZnJvbVBhcnRpdGlvbih1dWlkKCkpO1xuICAgIGNvbnN0IHN0dWIgPSBzYW5kYm94LnN0dWIoc2VzaCwgJ3NldFNwZWxsQ2hlY2tlckRpY3Rpb25hcnlEb3dubG9hZFVSTCcpO1xuXG4gICAgdXBkYXRlRGVmYXVsdFNlc3Npb24oc2VzaCk7XG5cbiAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShzdHViKTtcbiAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChcbiAgICAgIHN0dWIsXG4gICAgICBgaHR0cHM6Ly91cGRhdGVzLnNpZ25hbC5vcmcvZGVza3RvcC9odW5zcGVsbF9kaWN0aW9uYXJpZXMvJHtwcm9jZXNzLnZlcnNpb25zLmVsZWN0cm9ufS9gXG4gICAgKTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7OztBQUdBLFlBQXVCO0FBQ3ZCLHNCQUF3QjtBQUN4QixrQkFBMkI7QUFFM0Isa0NBQXFDO0FBRXJDLFNBQVMsd0JBQXdCLE1BQU07QUFDckMsTUFBSTtBQUVKLGFBQVcsTUFBTTtBQUNmLGNBQVUsTUFBTSxjQUFjO0FBQUEsRUFDaEMsQ0FBQztBQUVELFlBQVUsTUFBTTtBQUNkLFlBQVEsUUFBUTtBQUFBLEVBQ2xCLENBQUM7QUFFRCxLQUFHLDJCQUEyQixNQUFNO0FBQ2xDLFVBQU0sT0FBTyx3QkFBUSxjQUFjLG9CQUFLLENBQUM7QUFDekMsVUFBTSxPQUFPLFFBQVEsS0FBSyxNQUFNLHNDQUFzQztBQUV0RSwwREFBcUIsSUFBSTtBQUV6QixVQUFNLE9BQU8sV0FBVyxJQUFJO0FBQzVCLFVBQU0sT0FBTyxXQUNYLE1BQ0EsNERBQTRELFFBQVEsU0FBUyxXQUMvRTtBQUFBLEVBQ0YsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
