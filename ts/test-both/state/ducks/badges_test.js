var import_chai = require("chai");
var import_getFakeBadge = require("../../helpers/getFakeBadge");
var import_iterables = require("../../../util/iterables");
var import_BadgeImageTheme = require("../../../badges/BadgeImageTheme");
var import_badges = require("../../../state/ducks/badges");
describe("both/state/ducks/badges", () => {
  describe("badgeImageFileDownloaded", () => {
    const { badgeImageFileDownloaded } = import_badges.actions;
    it("does nothing if the URL isn't in the list of badges", () => {
      const state = {
        byId: { foo: (0, import_getFakeBadge.getFakeBadge)({ id: "foo" }) }
      };
      const action = badgeImageFileDownloaded("https://foo.example.com/image.svg", "/path/to/file.svg");
      const result = (0, import_badges.reducer)(state, action);
      import_chai.assert.deepStrictEqual(result, state);
    });
    it("updates all badge image files with matching URLs", () => {
      const state = {
        byId: {
          badge1: {
            ...(0, import_getFakeBadge.getFakeBadge)({ id: "badge1" }),
            images: [
              ...Array(3).fill((0, import_iterables.zipObject)(Object.values(import_BadgeImageTheme.BadgeImageTheme), (0, import_iterables.repeat)({ url: "https://example.com/a.svg" }))),
              {
                [import_BadgeImageTheme.BadgeImageTheme.Transparent]: {
                  url: "https://example.com/b.svg"
                }
              }
            ]
          },
          badge2: (0, import_getFakeBadge.getFakeBadge)({ id: "badge2" }),
          badge3: {
            ...(0, import_getFakeBadge.getFakeBadge)({ id: "badge3" }),
            images: Array(4).fill({
              [import_BadgeImageTheme.BadgeImageTheme.Dark]: {
                localPath: "to be overridden",
                url: "https://example.com/a.svg"
              },
              [import_BadgeImageTheme.BadgeImageTheme.Light]: {
                localPath: "to be overridden",
                url: "https://example.com/a.svg"
              },
              [import_BadgeImageTheme.BadgeImageTheme.Transparent]: {
                localPath: "/path/should/be/unchanged",
                url: "https://example.com/b.svg"
              }
            })
          }
        }
      };
      const action = badgeImageFileDownloaded("https://example.com/a.svg", "/path/to/file.svg");
      const result = (0, import_badges.reducer)(state, action);
      import_chai.assert.deepStrictEqual(result.byId.badge1?.images, [
        ...Array(3).fill((0, import_iterables.zipObject)(Object.values(import_BadgeImageTheme.BadgeImageTheme), (0, import_iterables.repeat)({
          localPath: "/path/to/file.svg",
          url: "https://example.com/a.svg"
        }))),
        {
          [import_BadgeImageTheme.BadgeImageTheme.Transparent]: {
            url: "https://example.com/b.svg"
          }
        }
      ]);
      import_chai.assert.deepStrictEqual(result.byId.badge2, (0, import_getFakeBadge.getFakeBadge)({ id: "badge2" }));
      import_chai.assert.deepStrictEqual(result.byId.badge3?.images, Array(4).fill({
        [import_BadgeImageTheme.BadgeImageTheme.Dark]: {
          localPath: "/path/to/file.svg",
          url: "https://example.com/a.svg"
        },
        [import_BadgeImageTheme.BadgeImageTheme.Light]: {
          localPath: "/path/to/file.svg",
          url: "https://example.com/a.svg"
        },
        [import_BadgeImageTheme.BadgeImageTheme.Transparent]: {
          localPath: "/path/should/be/unchanged",
          url: "https://example.com/b.svg"
        }
      }));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYmFkZ2VzX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGdldEZha2VCYWRnZSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvZ2V0RmFrZUJhZGdlJztcbmltcG9ydCB7IHJlcGVhdCwgemlwT2JqZWN0IH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9pdGVyYWJsZXMnO1xuaW1wb3J0IHsgQmFkZ2VJbWFnZVRoZW1lIH0gZnJvbSAnLi4vLi4vLi4vYmFkZ2VzL0JhZGdlSW1hZ2VUaGVtZSc7XG5cbmltcG9ydCB0eXBlIHsgQmFkZ2VzU3RhdGVUeXBlIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvZHVja3MvYmFkZ2VzJztcbmltcG9ydCB7IGFjdGlvbnMsIHJlZHVjZXIgfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9kdWNrcy9iYWRnZXMnO1xuXG5kZXNjcmliZSgnYm90aC9zdGF0ZS9kdWNrcy9iYWRnZXMnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdiYWRnZUltYWdlRmlsZURvd25sb2FkZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgeyBiYWRnZUltYWdlRmlsZURvd25sb2FkZWQgfSA9IGFjdGlvbnM7XG5cbiAgICBpdChcImRvZXMgbm90aGluZyBpZiB0aGUgVVJMIGlzbid0IGluIHRoZSBsaXN0IG9mIGJhZGdlc1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZTogQmFkZ2VzU3RhdGVUeXBlID0ge1xuICAgICAgICBieUlkOiB7IGZvbzogZ2V0RmFrZUJhZGdlKHsgaWQ6ICdmb28nIH0pIH0sXG4gICAgICB9O1xuICAgICAgY29uc3QgYWN0aW9uID0gYmFkZ2VJbWFnZUZpbGVEb3dubG9hZGVkKFxuICAgICAgICAnaHR0cHM6Ly9mb28uZXhhbXBsZS5jb20vaW1hZ2Uuc3ZnJyxcbiAgICAgICAgJy9wYXRoL3RvL2ZpbGUuc3ZnJ1xuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwocmVzdWx0LCBzdGF0ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgndXBkYXRlcyBhbGwgYmFkZ2UgaW1hZ2UgZmlsZXMgd2l0aCBtYXRjaGluZyBVUkxzJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGU6IEJhZGdlc1N0YXRlVHlwZSA9IHtcbiAgICAgICAgYnlJZDoge1xuICAgICAgICAgIGJhZGdlMToge1xuICAgICAgICAgICAgLi4uZ2V0RmFrZUJhZGdlKHsgaWQ6ICdiYWRnZTEnIH0pLFxuICAgICAgICAgICAgaW1hZ2VzOiBbXG4gICAgICAgICAgICAgIC4uLkFycmF5KDMpLmZpbGwoXG4gICAgICAgICAgICAgICAgemlwT2JqZWN0KFxuICAgICAgICAgICAgICAgICAgT2JqZWN0LnZhbHVlcyhCYWRnZUltYWdlVGhlbWUpLFxuICAgICAgICAgICAgICAgICAgcmVwZWF0KHsgdXJsOiAnaHR0cHM6Ly9leGFtcGxlLmNvbS9hLnN2ZycgfSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBbQmFkZ2VJbWFnZVRoZW1lLlRyYW5zcGFyZW50XToge1xuICAgICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9leGFtcGxlLmNvbS9iLnN2ZycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBiYWRnZTI6IGdldEZha2VCYWRnZSh7IGlkOiAnYmFkZ2UyJyB9KSxcbiAgICAgICAgICBiYWRnZTM6IHtcbiAgICAgICAgICAgIC4uLmdldEZha2VCYWRnZSh7IGlkOiAnYmFkZ2UzJyB9KSxcbiAgICAgICAgICAgIGltYWdlczogQXJyYXkoNCkuZmlsbCh7XG4gICAgICAgICAgICAgIFtCYWRnZUltYWdlVGhlbWUuRGFya106IHtcbiAgICAgICAgICAgICAgICBsb2NhbFBhdGg6ICd0byBiZSBvdmVycmlkZGVuJyxcbiAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2V4YW1wbGUuY29tL2Euc3ZnJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW0JhZGdlSW1hZ2VUaGVtZS5MaWdodF06IHtcbiAgICAgICAgICAgICAgICBsb2NhbFBhdGg6ICd0byBiZSBvdmVycmlkZGVuJyxcbiAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2V4YW1wbGUuY29tL2Euc3ZnJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgW0JhZGdlSW1hZ2VUaGVtZS5UcmFuc3BhcmVudF06IHtcbiAgICAgICAgICAgICAgICBsb2NhbFBhdGg6ICcvcGF0aC9zaG91bGQvYmUvdW5jaGFuZ2VkJyxcbiAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2V4YW1wbGUuY29tL2Iuc3ZnJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgY29uc3QgYWN0aW9uID0gYmFkZ2VJbWFnZUZpbGVEb3dubG9hZGVkKFxuICAgICAgICAnaHR0cHM6Ly9leGFtcGxlLmNvbS9hLnN2ZycsXG4gICAgICAgICcvcGF0aC90by9maWxlLnN2ZydcbiAgICAgICk7XG4gICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHJlc3VsdC5ieUlkLmJhZGdlMT8uaW1hZ2VzLCBbXG4gICAgICAgIC4uLkFycmF5KDMpLmZpbGwoXG4gICAgICAgICAgemlwT2JqZWN0KFxuICAgICAgICAgICAgT2JqZWN0LnZhbHVlcyhCYWRnZUltYWdlVGhlbWUpLFxuICAgICAgICAgICAgcmVwZWF0KHtcbiAgICAgICAgICAgICAgbG9jYWxQYXRoOiAnL3BhdGgvdG8vZmlsZS5zdmcnLFxuICAgICAgICAgICAgICB1cmw6ICdodHRwczovL2V4YW1wbGUuY29tL2Euc3ZnJyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICB7XG4gICAgICAgICAgW0JhZGdlSW1hZ2VUaGVtZS5UcmFuc3BhcmVudF06IHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZXhhbXBsZS5jb20vYi5zdmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdKTtcbiAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoXG4gICAgICAgIHJlc3VsdC5ieUlkLmJhZGdlMixcbiAgICAgICAgZ2V0RmFrZUJhZGdlKHsgaWQ6ICdiYWRnZTInIH0pXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChcbiAgICAgICAgcmVzdWx0LmJ5SWQuYmFkZ2UzPy5pbWFnZXMsXG4gICAgICAgIEFycmF5KDQpLmZpbGwoe1xuICAgICAgICAgIFtCYWRnZUltYWdlVGhlbWUuRGFya106IHtcbiAgICAgICAgICAgIGxvY2FsUGF0aDogJy9wYXRoL3RvL2ZpbGUuc3ZnJyxcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZXhhbXBsZS5jb20vYS5zdmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgW0JhZGdlSW1hZ2VUaGVtZS5MaWdodF06IHtcbiAgICAgICAgICAgIGxvY2FsUGF0aDogJy9wYXRoL3RvL2ZpbGUuc3ZnJyxcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vZXhhbXBsZS5jb20vYS5zdmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgW0JhZGdlSW1hZ2VUaGVtZS5UcmFuc3BhcmVudF06IHtcbiAgICAgICAgICAgIGxvY2FsUGF0aDogJy9wYXRoL3Nob3VsZC9iZS91bmNoYW5nZWQnLFxuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9leGFtcGxlLmNvbS9iLnN2ZycsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIsMEJBQTZCO0FBQzdCLHVCQUFrQztBQUNsQyw2QkFBZ0M7QUFHaEMsb0JBQWlDO0FBRWpDLFNBQVMsMkJBQTJCLE1BQU07QUFDeEMsV0FBUyw0QkFBNEIsTUFBTTtBQUN6QyxVQUFNLEVBQUUsNkJBQTZCO0FBRXJDLE9BQUcsdURBQXVELE1BQU07QUFDOUQsWUFBTSxRQUF5QjtBQUFBLFFBQzdCLE1BQU0sRUFBRSxLQUFLLHNDQUFhLEVBQUUsSUFBSSxNQUFNLENBQUMsRUFBRTtBQUFBLE1BQzNDO0FBQ0EsWUFBTSxTQUFTLHlCQUNiLHFDQUNBLG1CQUNGO0FBQ0EsWUFBTSxTQUFTLDJCQUFRLE9BQU8sTUFBTTtBQUVwQyx5QkFBTyxnQkFBZ0IsUUFBUSxLQUFLO0FBQUEsSUFDdEMsQ0FBQztBQUVELE9BQUcsb0RBQW9ELE1BQU07QUFDM0QsWUFBTSxRQUF5QjtBQUFBLFFBQzdCLE1BQU07QUFBQSxVQUNKLFFBQVE7QUFBQSxlQUNILHNDQUFhLEVBQUUsSUFBSSxTQUFTLENBQUM7QUFBQSxZQUNoQyxRQUFRO0FBQUEsY0FDTixHQUFHLE1BQU0sQ0FBQyxFQUFFLEtBQ1YsZ0NBQ0UsT0FBTyxPQUFPLHNDQUFlLEdBQzdCLDZCQUFPLEVBQUUsS0FBSyw0QkFBNEIsQ0FBQyxDQUM3QyxDQUNGO0FBQUEsY0FDQTtBQUFBLGlCQUNHLHVDQUFnQixjQUFjO0FBQUEsa0JBQzdCLEtBQUs7QUFBQSxnQkFDUDtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0EsUUFBUSxzQ0FBYSxFQUFFLElBQUksU0FBUyxDQUFDO0FBQUEsVUFDckMsUUFBUTtBQUFBLGVBQ0gsc0NBQWEsRUFBRSxJQUFJLFNBQVMsQ0FBQztBQUFBLFlBQ2hDLFFBQVEsTUFBTSxDQUFDLEVBQUUsS0FBSztBQUFBLGVBQ25CLHVDQUFnQixPQUFPO0FBQUEsZ0JBQ3RCLFdBQVc7QUFBQSxnQkFDWCxLQUFLO0FBQUEsY0FDUDtBQUFBLGVBQ0MsdUNBQWdCLFFBQVE7QUFBQSxnQkFDdkIsV0FBVztBQUFBLGdCQUNYLEtBQUs7QUFBQSxjQUNQO0FBQUEsZUFDQyx1Q0FBZ0IsY0FBYztBQUFBLGdCQUM3QixXQUFXO0FBQUEsZ0JBQ1gsS0FBSztBQUFBLGNBQ1A7QUFBQSxZQUNGLENBQUM7QUFBQSxVQUNIO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFDQSxZQUFNLFNBQVMseUJBQ2IsNkJBQ0EsbUJBQ0Y7QUFDQSxZQUFNLFNBQVMsMkJBQVEsT0FBTyxNQUFNO0FBRXBDLHlCQUFPLGdCQUFnQixPQUFPLEtBQUssUUFBUSxRQUFRO0FBQUEsUUFDakQsR0FBRyxNQUFNLENBQUMsRUFBRSxLQUNWLGdDQUNFLE9BQU8sT0FBTyxzQ0FBZSxHQUM3Qiw2QkFBTztBQUFBLFVBQ0wsV0FBVztBQUFBLFVBQ1gsS0FBSztBQUFBLFFBQ1AsQ0FBQyxDQUNILENBQ0Y7QUFBQSxRQUNBO0FBQUEsV0FDRyx1Q0FBZ0IsY0FBYztBQUFBLFlBQzdCLEtBQUs7QUFBQSxVQUNQO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUNELHlCQUFPLGdCQUNMLE9BQU8sS0FBSyxRQUNaLHNDQUFhLEVBQUUsSUFBSSxTQUFTLENBQUMsQ0FDL0I7QUFDQSx5QkFBTyxnQkFDTCxPQUFPLEtBQUssUUFBUSxRQUNwQixNQUFNLENBQUMsRUFBRSxLQUFLO0FBQUEsU0FDWCx1Q0FBZ0IsT0FBTztBQUFBLFVBQ3RCLFdBQVc7QUFBQSxVQUNYLEtBQUs7QUFBQSxRQUNQO0FBQUEsU0FDQyx1Q0FBZ0IsUUFBUTtBQUFBLFVBQ3ZCLFdBQVc7QUFBQSxVQUNYLEtBQUs7QUFBQSxRQUNQO0FBQUEsU0FDQyx1Q0FBZ0IsY0FBYztBQUFBLFVBQzdCLFdBQVc7QUFBQSxVQUNYLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRixDQUFDLENBQ0g7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNILENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
