var import_chai = require("chai");
var import_UUID = require("../../types/UUID");
var import_groups = require("../../groups");
describe("group message merging", () => {
  const defaultMessage = {
    id: import_UUID.UUID.generate().toString(),
    conversationId: import_UUID.UUID.generate().toString(),
    timestamp: Date.now(),
    sent_at: Date.now(),
    received_at: Date.now()
  };
  const uuid = import_UUID.UUID.generate().toString();
  describe("_isGroupChangeMessageBounceable", () => {
    it("should return true for admin approval add", () => {
      import_chai.assert.isTrue((0, import_groups._isGroupChangeMessageBounceable)({
        ...defaultMessage,
        type: "group-v2-change",
        groupV2Change: {
          details: [
            {
              type: "admin-approval-add-one",
              uuid
            }
          ]
        }
      }));
    });
    it("should return true for bounce message", () => {
      import_chai.assert.isTrue((0, import_groups._isGroupChangeMessageBounceable)({
        ...defaultMessage,
        type: "group-v2-change",
        groupV2Change: {
          details: [
            {
              type: "admin-approval-bounce",
              times: 1,
              isApprovalPending: true,
              uuid
            }
          ]
        }
      }));
    });
    it("should return false otherwise", () => {
      import_chai.assert.isFalse((0, import_groups._isGroupChangeMessageBounceable)({
        ...defaultMessage,
        type: "group-v2-change",
        groupV2Change: {
          details: [
            {
              type: "admin-approval-remove-one",
              uuid
            }
          ]
        }
      }));
    });
  });
  describe("_mergeGroupChangeMessages", () => {
    const add = {
      ...defaultMessage,
      type: "group-v2-change",
      groupV2Change: {
        details: [
          {
            type: "admin-approval-add-one",
            uuid
          }
        ]
      }
    };
    const remove = {
      ...defaultMessage,
      type: "group-v2-change",
      groupV2Change: {
        details: [
          {
            type: "admin-approval-remove-one",
            uuid
          }
        ]
      }
    };
    const addOther = {
      ...defaultMessage,
      type: "group-v2-change",
      groupV2Change: {
        details: [
          {
            type: "admin-approval-add-one",
            uuid: import_UUID.UUID.generate().toString()
          }
        ]
      }
    };
    const removeOther = {
      ...defaultMessage,
      type: "group-v2-change",
      groupV2Change: {
        details: [
          {
            type: "admin-approval-remove-one",
            uuid: import_UUID.UUID.generate().toString()
          }
        ]
      }
    };
    const bounce = {
      ...defaultMessage,
      type: "group-v2-change",
      groupV2Change: {
        details: [
          {
            type: "admin-approval-bounce",
            times: 1,
            isApprovalPending: false,
            uuid
          }
        ]
      }
    };
    const bounceAndAdd = {
      ...defaultMessage,
      type: "group-v2-change",
      groupV2Change: {
        details: [
          {
            type: "admin-approval-bounce",
            times: 1,
            isApprovalPending: true,
            uuid
          }
        ]
      }
    };
    it("should merge add with remove if uuid matches", () => {
      import_chai.assert.deepStrictEqual((0, import_groups._mergeGroupChangeMessages)(add, remove)?.groupV2Change?.details, [
        {
          isApprovalPending: false,
          times: 1,
          type: "admin-approval-bounce",
          uuid
        }
      ]);
    });
    it("should not merge add with remove if uuid does not match", () => {
      import_chai.assert.isUndefined((0, import_groups._mergeGroupChangeMessages)(add, removeOther));
    });
    it("should merge bounce with add if uuid matches", () => {
      import_chai.assert.deepStrictEqual((0, import_groups._mergeGroupChangeMessages)(bounce, add)?.groupV2Change?.details, [
        {
          isApprovalPending: true,
          times: 1,
          type: "admin-approval-bounce",
          uuid
        }
      ]);
    });
    it("should merge bounce and add with remove if uuid matches", () => {
      import_chai.assert.deepStrictEqual((0, import_groups._mergeGroupChangeMessages)(bounceAndAdd, remove)?.groupV2Change?.details, [
        {
          isApprovalPending: false,
          times: 2,
          type: "admin-approval-bounce",
          uuid
        }
      ]);
    });
    it("should not merge bounce with add if uuid does not match", () => {
      import_chai.assert.isUndefined((0, import_groups._mergeGroupChangeMessages)(bounce, addOther));
    });
    it("should not merge bounce and add with add", () => {
      import_chai.assert.isUndefined((0, import_groups._mergeGroupChangeMessages)(bounceAndAdd, add));
    });
    it("should not merge bounce and add with remove if uuid does not match", () => {
      import_chai.assert.isUndefined((0, import_groups._mergeGroupChangeMessages)(bounceAndAdd, removeOther));
    });
    it("should not merge bounce with remove", () => {
      import_chai.assert.isUndefined((0, import_groups._mergeGroupChangeMessages)(bounce, remove));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWVzc2FnZV9tZXJnZV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQge1xuICBfaXNHcm91cENoYW5nZU1lc3NhZ2VCb3VuY2VhYmxlLFxuICBfbWVyZ2VHcm91cENoYW5nZU1lc3NhZ2VzLFxufSBmcm9tICcuLi8uLi9ncm91cHMnO1xuXG5kZXNjcmliZSgnZ3JvdXAgbWVzc2FnZSBtZXJnaW5nJywgKCkgPT4ge1xuICBjb25zdCBkZWZhdWx0TWVzc2FnZSA9IHtcbiAgICBpZDogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG4gICAgY29udmVyc2F0aW9uSWQ6IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpLFxuICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICBzZW50X2F0OiBEYXRlLm5vdygpLFxuICAgIHJlY2VpdmVkX2F0OiBEYXRlLm5vdygpLFxuICB9O1xuICBjb25zdCB1dWlkID0gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG5cbiAgZGVzY3JpYmUoJ19pc0dyb3VwQ2hhbmdlTWVzc2FnZUJvdW5jZWFibGUnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBmb3IgYWRtaW4gYXBwcm92YWwgYWRkJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgX2lzR3JvdXBDaGFuZ2VNZXNzYWdlQm91bmNlYWJsZSh7XG4gICAgICAgICAgLi4uZGVmYXVsdE1lc3NhZ2UsXG4gICAgICAgICAgdHlwZTogJ2dyb3VwLXYyLWNoYW5nZScsXG4gICAgICAgICAgZ3JvdXBWMkNoYW5nZToge1xuICAgICAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2FkbWluLWFwcHJvdmFsLWFkZC1vbmUnLFxuICAgICAgICAgICAgICAgIHV1aWQsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBmb3IgYm91bmNlIG1lc3NhZ2UnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBfaXNHcm91cENoYW5nZU1lc3NhZ2VCb3VuY2VhYmxlKHtcbiAgICAgICAgICAuLi5kZWZhdWx0TWVzc2FnZSxcbiAgICAgICAgICB0eXBlOiAnZ3JvdXAtdjItY2hhbmdlJyxcbiAgICAgICAgICBncm91cFYyQ2hhbmdlOiB7XG4gICAgICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYWRtaW4tYXBwcm92YWwtYm91bmNlJyxcbiAgICAgICAgICAgICAgICB0aW1lczogMSxcbiAgICAgICAgICAgICAgICBpc0FwcHJvdmFsUGVuZGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICB1dWlkLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIG90aGVyd2lzZScsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICBfaXNHcm91cENoYW5nZU1lc3NhZ2VCb3VuY2VhYmxlKHtcbiAgICAgICAgICAuLi5kZWZhdWx0TWVzc2FnZSxcbiAgICAgICAgICB0eXBlOiAnZ3JvdXAtdjItY2hhbmdlJyxcbiAgICAgICAgICBncm91cFYyQ2hhbmdlOiB7XG4gICAgICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYWRtaW4tYXBwcm92YWwtcmVtb3ZlLW9uZScsXG4gICAgICAgICAgICAgICAgdXVpZCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdfbWVyZ2VHcm91cENoYW5nZU1lc3NhZ2VzJywgKCkgPT4ge1xuICAgIGNvbnN0IGFkZCA9IHtcbiAgICAgIC4uLmRlZmF1bHRNZXNzYWdlLFxuICAgICAgdHlwZTogJ2dyb3VwLXYyLWNoYW5nZScgYXMgY29uc3QsXG4gICAgICBncm91cFYyQ2hhbmdlOiB7XG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnYWRtaW4tYXBwcm92YWwtYWRkLW9uZScgYXMgY29uc3QsXG4gICAgICAgICAgICB1dWlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH07XG4gICAgY29uc3QgcmVtb3ZlID0ge1xuICAgICAgLi4uZGVmYXVsdE1lc3NhZ2UsXG4gICAgICB0eXBlOiAnZ3JvdXAtdjItY2hhbmdlJyBhcyBjb25zdCxcbiAgICAgIGdyb3VwVjJDaGFuZ2U6IHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhZG1pbi1hcHByb3ZhbC1yZW1vdmUtb25lJyBhcyBjb25zdCxcbiAgICAgICAgICAgIHV1aWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCBhZGRPdGhlciA9IHtcbiAgICAgIC4uLmRlZmF1bHRNZXNzYWdlLFxuICAgICAgdHlwZTogJ2dyb3VwLXYyLWNoYW5nZScgYXMgY29uc3QsXG4gICAgICBncm91cFYyQ2hhbmdlOiB7XG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnYWRtaW4tYXBwcm92YWwtYWRkLW9uZScgYXMgY29uc3QsXG4gICAgICAgICAgICB1dWlkOiBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnN0IHJlbW92ZU90aGVyID0ge1xuICAgICAgLi4uZGVmYXVsdE1lc3NhZ2UsXG4gICAgICB0eXBlOiAnZ3JvdXAtdjItY2hhbmdlJyBhcyBjb25zdCxcbiAgICAgIGdyb3VwVjJDaGFuZ2U6IHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhZG1pbi1hcHByb3ZhbC1yZW1vdmUtb25lJyBhcyBjb25zdCxcbiAgICAgICAgICAgIHV1aWQ6IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH07XG4gICAgY29uc3QgYm91bmNlID0ge1xuICAgICAgLi4uZGVmYXVsdE1lc3NhZ2UsXG4gICAgICB0eXBlOiAnZ3JvdXAtdjItY2hhbmdlJyBhcyBjb25zdCxcbiAgICAgIGdyb3VwVjJDaGFuZ2U6IHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhZG1pbi1hcHByb3ZhbC1ib3VuY2UnIGFzIGNvbnN0LFxuICAgICAgICAgICAgdGltZXM6IDEsXG4gICAgICAgICAgICBpc0FwcHJvdmFsUGVuZGluZzogZmFsc2UsXG4gICAgICAgICAgICB1dWlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH07XG4gICAgY29uc3QgYm91bmNlQW5kQWRkID0ge1xuICAgICAgLi4uZGVmYXVsdE1lc3NhZ2UsXG4gICAgICB0eXBlOiAnZ3JvdXAtdjItY2hhbmdlJyBhcyBjb25zdCxcbiAgICAgIGdyb3VwVjJDaGFuZ2U6IHtcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhZG1pbi1hcHByb3ZhbC1ib3VuY2UnIGFzIGNvbnN0LFxuICAgICAgICAgICAgdGltZXM6IDEsXG4gICAgICAgICAgICBpc0FwcHJvdmFsUGVuZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIHV1aWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGl0KCdzaG91bGQgbWVyZ2UgYWRkIHdpdGggcmVtb3ZlIGlmIHV1aWQgbWF0Y2hlcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoXG4gICAgICAgIF9tZXJnZUdyb3VwQ2hhbmdlTWVzc2FnZXMoYWRkLCByZW1vdmUpPy5ncm91cFYyQ2hhbmdlPy5kZXRhaWxzLFxuICAgICAgICBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaXNBcHByb3ZhbFBlbmRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgdGltZXM6IDEsXG4gICAgICAgICAgICB0eXBlOiAnYWRtaW4tYXBwcm92YWwtYm91bmNlJyxcbiAgICAgICAgICAgIHV1aWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IG1lcmdlIGFkZCB3aXRoIHJlbW92ZSBpZiB1dWlkIGRvZXMgbm90IG1hdGNoJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKF9tZXJnZUdyb3VwQ2hhbmdlTWVzc2FnZXMoYWRkLCByZW1vdmVPdGhlcikpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBtZXJnZSBib3VuY2Ugd2l0aCBhZGQgaWYgdXVpZCBtYXRjaGVzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChcbiAgICAgICAgX21lcmdlR3JvdXBDaGFuZ2VNZXNzYWdlcyhib3VuY2UsIGFkZCk/Lmdyb3VwVjJDaGFuZ2U/LmRldGFpbHMsXG4gICAgICAgIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpc0FwcHJvdmFsUGVuZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIHRpbWVzOiAxLFxuICAgICAgICAgICAgdHlwZTogJ2FkbWluLWFwcHJvdmFsLWJvdW5jZScsXG4gICAgICAgICAgICB1dWlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIF1cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG1lcmdlIGJvdW5jZSBhbmQgYWRkIHdpdGggcmVtb3ZlIGlmIHV1aWQgbWF0Y2hlcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoXG4gICAgICAgIF9tZXJnZUdyb3VwQ2hhbmdlTWVzc2FnZXMoYm91bmNlQW5kQWRkLCByZW1vdmUpPy5ncm91cFYyQ2hhbmdlPy5kZXRhaWxzLFxuICAgICAgICBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaXNBcHByb3ZhbFBlbmRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgdGltZXM6IDIsXG4gICAgICAgICAgICB0eXBlOiAnYWRtaW4tYXBwcm92YWwtYm91bmNlJyxcbiAgICAgICAgICAgIHV1aWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IG1lcmdlIGJvdW5jZSB3aXRoIGFkZCBpZiB1dWlkIGRvZXMgbm90IG1hdGNoJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKF9tZXJnZUdyb3VwQ2hhbmdlTWVzc2FnZXMoYm91bmNlLCBhZGRPdGhlcikpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgbWVyZ2UgYm91bmNlIGFuZCBhZGQgd2l0aCBhZGQnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoX21lcmdlR3JvdXBDaGFuZ2VNZXNzYWdlcyhib3VuY2VBbmRBZGQsIGFkZCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgbWVyZ2UgYm91bmNlIGFuZCBhZGQgd2l0aCByZW1vdmUgaWYgdXVpZCBkb2VzIG5vdCBtYXRjaCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChfbWVyZ2VHcm91cENoYW5nZU1lc3NhZ2VzKGJvdW5jZUFuZEFkZCwgcmVtb3ZlT3RoZXIpKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IG1lcmdlIGJvdW5jZSB3aXRoIHJlbW92ZScsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChfbWVyZ2VHcm91cENoYW5nZU1lc3NhZ2VzKGJvdW5jZSwgcmVtb3ZlKSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIsa0JBQXFCO0FBQ3JCLG9CQUdPO0FBRVAsU0FBUyx5QkFBeUIsTUFBTTtBQUN0QyxRQUFNLGlCQUFpQjtBQUFBLElBQ3JCLElBQUksaUJBQUssU0FBUyxFQUFFLFNBQVM7QUFBQSxJQUM3QixnQkFBZ0IsaUJBQUssU0FBUyxFQUFFLFNBQVM7QUFBQSxJQUN6QyxXQUFXLEtBQUssSUFBSTtBQUFBLElBQ3BCLFNBQVMsS0FBSyxJQUFJO0FBQUEsSUFDbEIsYUFBYSxLQUFLLElBQUk7QUFBQSxFQUN4QjtBQUNBLFFBQU0sT0FBTyxpQkFBSyxTQUFTLEVBQUUsU0FBUztBQUV0QyxXQUFTLG1DQUFtQyxNQUFNO0FBQ2hELE9BQUcsNkNBQTZDLE1BQU07QUFDcEQseUJBQU8sT0FDTCxtREFBZ0M7QUFBQSxXQUMzQjtBQUFBLFFBQ0gsTUFBTTtBQUFBLFFBQ04sZUFBZTtBQUFBLFVBQ2IsU0FBUztBQUFBLFlBQ1A7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDLENBQ0g7QUFBQSxJQUNGLENBQUM7QUFFRCxPQUFHLHlDQUF5QyxNQUFNO0FBQ2hELHlCQUFPLE9BQ0wsbURBQWdDO0FBQUEsV0FDM0I7QUFBQSxRQUNI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
