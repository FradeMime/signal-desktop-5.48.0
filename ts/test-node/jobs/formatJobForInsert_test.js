var import_chai = require("chai");
var import_formatJobForInsert = require("../../jobs/formatJobForInsert");
describe("formatJobForInsert", () => {
  it("removes non-essential properties", () => {
    const input = {
      id: "abc123",
      timestamp: 1234,
      queueType: "test queue",
      data: { foo: "bar" },
      extra: "ignored",
      alsoIgnored: true
    };
    const output = (0, import_formatJobForInsert.formatJobForInsert)(input);
    import_chai.assert.deepEqual(output, {
      id: "abc123",
      timestamp: 1234,
      queueType: "test queue",
      data: { foo: "bar" }
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZm9ybWF0Sm9iRm9ySW5zZXJ0X3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGZvcm1hdEpvYkZvckluc2VydCB9IGZyb20gJy4uLy4uL2pvYnMvZm9ybWF0Sm9iRm9ySW5zZXJ0JztcblxuZGVzY3JpYmUoJ2Zvcm1hdEpvYkZvckluc2VydCcsICgpID0+IHtcbiAgaXQoJ3JlbW92ZXMgbm9uLWVzc2VudGlhbCBwcm9wZXJ0aWVzJywgKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0ge1xuICAgICAgaWQ6ICdhYmMxMjMnLFxuICAgICAgdGltZXN0YW1wOiAxMjM0LFxuICAgICAgcXVldWVUeXBlOiAndGVzdCBxdWV1ZScsXG4gICAgICBkYXRhOiB7IGZvbzogJ2JhcicgfSxcbiAgICAgIGV4dHJhOiAnaWdub3JlZCcsXG4gICAgICBhbHNvSWdub3JlZDogdHJ1ZSxcbiAgICB9O1xuICAgIGNvbnN0IG91dHB1dCA9IGZvcm1hdEpvYkZvckluc2VydChpbnB1dCk7XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsKG91dHB1dCwge1xuICAgICAgaWQ6ICdhYmMxMjMnLFxuICAgICAgdGltZXN0YW1wOiAxMjM0LFxuICAgICAgcXVldWVUeXBlOiAndGVzdCBxdWV1ZScsXG4gICAgICBkYXRhOiB7IGZvbzogJ2JhcicgfSxcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICJBQUdBLGtCQUF1QjtBQUV2QixnQ0FBbUM7QUFFbkMsU0FBUyxzQkFBc0IsTUFBTTtBQUNuQyxLQUFHLG9DQUFvQyxNQUFNO0FBQzNDLFVBQU0sUUFBUTtBQUFBLE1BQ1osSUFBSTtBQUFBLE1BQ0osV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsTUFBTSxFQUFFLEtBQUssTUFBTTtBQUFBLE1BQ25CLE9BQU87QUFBQSxNQUNQLGFBQWE7QUFBQSxJQUNmO0FBQ0EsVUFBTSxTQUFTLGtEQUFtQixLQUFLO0FBRXZDLHVCQUFPLFVBQVUsUUFBUTtBQUFBLE1BQ3ZCLElBQUk7QUFBQSxNQUNKLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLE1BQU0sRUFBRSxLQUFLLE1BQU07QUFBQSxJQUNyQixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
