var import_chai = require("chai");
describe("Whisper.View", () => {
  it("renders a template with render_attributes", () => {
    const ViewClass = window.Whisper.View.extend({
      template: "<div>{{ variable }}</div>",
      render_attributes: {
        variable: "value"
      }
    });
    const view = new ViewClass();
    view.render();
    import_chai.assert.strictEqual(view.$el.html(), "<div>value</div>");
  });
  it("renders a template with no render_attributes", () => {
    const ViewClass = window.Whisper.View.extend({
      template: "<div>static text</div>"
    });
    const view = new ViewClass();
    view.render();
    import_chai.assert.strictEqual(view.$el.html(), "<div>static text</div>");
  });
  it("renders a template function with render_attributes function", () => {
    const ViewClass = window.Whisper.View.extend({
      template() {
        return "<div>{{ variable }}</div>";
      },
      render_attributes() {
        return { variable: "value" };
      }
    });
    const view = new ViewClass();
    view.render();
    import_chai.assert.strictEqual(view.$el.html(), "<div>value</div>");
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid2hpc3Blcl92aWV3X3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE1LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuZGVzY3JpYmUoJ1doaXNwZXIuVmlldycsICgpID0+IHtcbiAgaXQoJ3JlbmRlcnMgYSB0ZW1wbGF0ZSB3aXRoIHJlbmRlcl9hdHRyaWJ1dGVzJywgKCkgPT4ge1xuICAgIGNvbnN0IFZpZXdDbGFzcyA9IHdpbmRvdy5XaGlzcGVyLlZpZXcuZXh0ZW5kKHtcbiAgICAgIHRlbXBsYXRlOiAnPGRpdj57eyB2YXJpYWJsZSB9fTwvZGl2PicsXG4gICAgICByZW5kZXJfYXR0cmlidXRlczoge1xuICAgICAgICB2YXJpYWJsZTogJ3ZhbHVlJyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCB2aWV3ID0gbmV3IFZpZXdDbGFzcygpO1xuICAgIHZpZXcucmVuZGVyKCk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHZpZXcuJGVsLmh0bWwoKSwgJzxkaXY+dmFsdWU8L2Rpdj4nKTtcbiAgfSk7XG4gIGl0KCdyZW5kZXJzIGEgdGVtcGxhdGUgd2l0aCBubyByZW5kZXJfYXR0cmlidXRlcycsICgpID0+IHtcbiAgICBjb25zdCBWaWV3Q2xhc3MgPSB3aW5kb3cuV2hpc3Blci5WaWV3LmV4dGVuZCh7XG4gICAgICB0ZW1wbGF0ZTogJzxkaXY+c3RhdGljIHRleHQ8L2Rpdj4nLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdmlldyA9IG5ldyBWaWV3Q2xhc3MoKTtcbiAgICB2aWV3LnJlbmRlcigpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbCh2aWV3LiRlbC5odG1sKCksICc8ZGl2PnN0YXRpYyB0ZXh0PC9kaXY+Jyk7XG4gIH0pO1xuICBpdCgncmVuZGVycyBhIHRlbXBsYXRlIGZ1bmN0aW9uIHdpdGggcmVuZGVyX2F0dHJpYnV0ZXMgZnVuY3Rpb24nLCAoKSA9PiB7XG4gICAgY29uc3QgVmlld0NsYXNzID0gd2luZG93LldoaXNwZXIuVmlldy5leHRlbmQoe1xuICAgICAgdGVtcGxhdGUoKSB7XG4gICAgICAgIHJldHVybiAnPGRpdj57eyB2YXJpYWJsZSB9fTwvZGl2Pic7XG4gICAgICB9LFxuICAgICAgcmVuZGVyX2F0dHJpYnV0ZXMoKSB7XG4gICAgICAgIHJldHVybiB7IHZhcmlhYmxlOiAndmFsdWUnIH07XG4gICAgICB9LFxuICAgIH0pO1xuICAgIGNvbnN0IHZpZXcgPSBuZXcgVmlld0NsYXNzKCk7XG4gICAgdmlldy5yZW5kZXIoKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwodmlldy4kZWwuaHRtbCgpLCAnPGRpdj52YWx1ZTwvZGl2PicpO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLFNBQVMsZ0JBQWdCLE1BQU07QUFDN0IsS0FBRyw2Q0FBNkMsTUFBTTtBQUNwRCxVQUFNLFlBQVksT0FBTyxRQUFRLEtBQUssT0FBTztBQUFBLE1BQzNDLFVBQVU7QUFBQSxNQUNWLG1CQUFtQjtBQUFBLFFBQ2pCLFVBQVU7QUFBQSxNQUNaO0FBQUEsSUFDRixDQUFDO0FBRUQsVUFBTSxPQUFPLElBQUksVUFBVTtBQUMzQixTQUFLLE9BQU87QUFDWix1QkFBTyxZQUFZLEtBQUssSUFBSSxLQUFLLEdBQUcsa0JBQWtCO0FBQUEsRUFDeEQsQ0FBQztBQUNELEtBQUcsZ0RBQWdELE1BQU07QUFDdkQsVUFBTSxZQUFZLE9BQU8sUUFBUSxLQUFLLE9BQU87QUFBQSxNQUMzQyxVQUFVO0FBQUEsSUFDWixDQUFDO0FBRUQsVUFBTSxPQUFPLElBQUksVUFBVTtBQUMzQixTQUFLLE9BQU87QUFDWix1QkFBTyxZQUFZLEtBQUssSUFBSSxLQUFLLEdBQUcsd0JBQXdCO0FBQUEsRUFDOUQsQ0FBQztBQUNELEtBQUcsK0RBQStELE1BQU07QUFDdEUsVUFBTSxZQUFZLE9BQU8sUUFBUSxLQUFLLE9BQU87QUFBQSxNQUMzQyxXQUFXO0FBQ1QsZUFBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLG9CQUFvQjtBQUNsQixlQUFPLEVBQUUsVUFBVSxRQUFRO0FBQUEsTUFDN0I7QUFBQSxJQUNGLENBQUM7QUFDRCxVQUFNLE9BQU8sSUFBSSxVQUFVO0FBQzNCLFNBQUssT0FBTztBQUNaLHVCQUFPLFlBQVksS0FBSyxJQUFJLEtBQUssR0FBRyxrQkFBa0I7QUFBQSxFQUN4RCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
