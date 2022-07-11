var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_user = require("../../../state/ducks/user");
var import_user2 = require("../../../state/selectors/user");
describe("both/state/selectors/user", () => {
  function getRootState(overrides) {
    return {
      user: {
        ...(0, import_user.getEmptyState)(),
        ...overrides
      }
    };
  }
  describe("#getIsAlpha", () => {
    it("returns false for beta", () => {
      const state = getRootState({ version: "1.23.4-beta.5" });
      import_chai.assert.isFalse((0, import_user2.getIsAlpha)(state));
    });
    it("returns false for production", () => {
      const state = getRootState({ version: "1.23.4" });
      import_chai.assert.isFalse((0, import_user2.getIsAlpha)(state));
    });
    it("returns true for alpha", () => {
      const state = getRootState({ version: "1.23.4-alpha.987" });
      import_chai.assert.isTrue((0, import_user2.getIsAlpha)(state));
    });
  });
  describe("#getIsBeta", () => {
    it("returns false for alpha", () => {
      const state = getRootState({ version: "1.23.4-alpha.987" });
      import_chai.assert.isFalse((0, import_user2.getIsBeta)(state));
    });
    it("returns false for production", () => {
      const state = getRootState({ version: "1.23.4" });
      import_chai.assert.isFalse((0, import_user2.getIsBeta)(state));
    });
    it("returns true for beta", () => {
      const state = getRootState({ version: "1.23.4-beta.5" });
      import_chai.assert.isTrue((0, import_user2.getIsBeta)(state));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlcl90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL3JlZHVjZXInO1xuaW1wb3J0IHR5cGUgeyBVc2VyU3RhdGVUeXBlIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvZHVja3MvdXNlcic7XG5pbXBvcnQgeyBnZXRFbXB0eVN0YXRlIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvZHVja3MvdXNlcic7XG5cbmltcG9ydCB7IGdldElzQWxwaGEsIGdldElzQmV0YSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL3NlbGVjdG9ycy91c2VyJztcblxuZGVzY3JpYmUoJ2JvdGgvc3RhdGUvc2VsZWN0b3JzL3VzZXInLCAoKSA9PiB7XG4gIGZ1bmN0aW9uIGdldFJvb3RTdGF0ZShcbiAgICBvdmVycmlkZXM6IFJlYWRvbmx5PFBhcnRpYWw8VXNlclN0YXRlVHlwZT4+XG4gICk6IFN0YXRlVHlwZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAuLi5vdmVycmlkZXMsXG4gICAgICB9LFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICB9IGFzIGFueTtcbiAgfVxuXG4gIGRlc2NyaWJlKCcjZ2V0SXNBbHBoYScsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgYmV0YScsICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gZ2V0Um9vdFN0YXRlKHsgdmVyc2lvbjogJzEuMjMuNC1iZXRhLjUnIH0pO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoZ2V0SXNBbHBoYShzdGF0ZSkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIHByb2R1Y3Rpb24nLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGdldFJvb3RTdGF0ZSh7IHZlcnNpb246ICcxLjIzLjQnIH0pO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoZ2V0SXNBbHBoYShzdGF0ZSkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgYWxwaGEnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGdldFJvb3RTdGF0ZSh7IHZlcnNpb246ICcxLjIzLjQtYWxwaGEuOTg3JyB9KTtcbiAgICAgIGFzc2VydC5pc1RydWUoZ2V0SXNBbHBoYShzdGF0ZSkpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2dldElzQmV0YScsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgYWxwaGEnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGdldFJvb3RTdGF0ZSh7IHZlcnNpb246ICcxLjIzLjQtYWxwaGEuOTg3JyB9KTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGdldElzQmV0YShzdGF0ZSkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIHByb2R1Y3Rpb24nLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGdldFJvb3RTdGF0ZSh7IHZlcnNpb246ICcxLjIzLjQnIH0pO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoZ2V0SXNCZXRhKHN0YXRlKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGZvciBiZXRhJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSBnZXRSb290U3RhdGUoeyB2ZXJzaW9uOiAnMS4yMy40LWJldGEuNScgfSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKGdldElzQmV0YShzdGF0ZSkpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFHQSxrQkFBdUI7QUFJdkIsa0JBQThCO0FBRTlCLG1CQUFzQztBQUV0QyxTQUFTLDZCQUE2QixNQUFNO0FBQzFDLHdCQUNFLFdBQ1c7QUFDWCxXQUFPO0FBQUEsTUFDTCxNQUFNO0FBQUEsV0FDRCwrQkFBYztBQUFBLFdBQ2Q7QUFBQSxNQUNMO0FBQUEsSUFFRjtBQUFBLEVBQ0Y7QUFWUyxBQVlULFdBQVMsZUFBZSxNQUFNO0FBQzVCLE9BQUcsMEJBQTBCLE1BQU07QUFDakMsWUFBTSxRQUFRLGFBQWEsRUFBRSxTQUFTLGdCQUFnQixDQUFDO0FBQ3ZELHlCQUFPLFFBQVEsNkJBQVcsS0FBSyxDQUFDO0FBQUEsSUFDbEMsQ0FBQztBQUVELE9BQUcsZ0NBQWdDLE1BQU07QUFDdkMsWUFBTSxRQUFRLGFBQWEsRUFBRSxTQUFTLFNBQVMsQ0FBQztBQUNoRCx5QkFBTyxRQUFRLDZCQUFXLEtBQUssQ0FBQztBQUFBLElBQ2xDLENBQUM7QUFFRCxPQUFHLDBCQUEwQixNQUFNO0FBQ2pDLFlBQU0sUUFBUSxhQUFhLEVBQUUsU0FBUyxtQkFBbUIsQ0FBQztBQUMxRCx5QkFBTyxPQUFPLDZCQUFXLEtBQUssQ0FBQztBQUFBLElBQ2pDLENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLGNBQWMsTUFBTTtBQUMzQixPQUFHLDJCQUEyQixNQUFNO0FBQ2xDLFlBQU0sUUFBUSxhQUFhLEVBQUUsU0FBUyxtQkFBbUIsQ0FBQztBQUMxRCx5QkFBTyxRQUFRLDRCQUFVLEtBQUssQ0FBQztBQUFBLElBQ2pDLENBQUM7QUFFRCxPQUFHLGdDQUFnQyxNQUFNO0FBQ3ZDLFlBQU0sUUFBUSxhQUFhLEVBQUUsU0FBUyxTQUFTLENBQUM7QUFDaEQseUJBQU8sUUFBUSw0QkFBVSxLQUFLLENBQUM7QUFBQSxJQUNqQyxDQUFDO0FBRUQsT0FBRyx5QkFBeUIsTUFBTTtBQUNoQyxZQUFNLFFBQVEsYUFBYSxFQUFFLFNBQVMsZ0JBQWdCLENBQUM7QUFDdkQseUJBQU8sT0FBTyw0QkFBVSxLQUFLLENBQUM7QUFBQSxJQUNoQyxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
