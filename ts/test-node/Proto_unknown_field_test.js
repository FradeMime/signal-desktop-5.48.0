var import_chai = require("chai");
var import_protobufjs = require("protobufjs");
const { Partial, Full } = import_protobufjs.Root.fromJSON({
  nested: {
    test: {
      nested: {
        Partial: {
          fields: {
            a: {
              type: "string",
              id: 1
            },
            c: {
              type: "int32",
              id: 3
            }
          }
        },
        Full: {
          fields: {
            a: {
              type: "string",
              id: 1
            },
            b: {
              type: "bool",
              id: 2
            },
            c: {
              type: "int32",
              id: 3
            },
            d: {
              type: "bytes",
              id: 4
            }
          }
        }
      }
    }
  }
}).nested.test;
describe("Proto#__unknownFields", () => {
  it("should encode and decode with unknown fields", () => {
    const full = Full.encode({
      a: "hello",
      b: true,
      c: 42,
      d: Buffer.from("ohai")
    }).finish();
    const partial = Partial.decode(full);
    import_chai.assert.strictEqual(partial.a, "hello");
    import_chai.assert.strictEqual(partial.c, 42);
    import_chai.assert.strictEqual(partial.__unknownFields.length, 2);
    import_chai.assert.strictEqual(Buffer.from(partial.__unknownFields[0]).toString("hex"), "1001");
    import_chai.assert.strictEqual(Buffer.from(partial.__unknownFields[1]).toString("hex"), "22046f686169");
    const encoded = Partial.encode({
      a: partial.a,
      c: partial.c,
      __unknownFields: partial.__unknownFields
    }).finish();
    const decoded = Full.decode(encoded);
    import_chai.assert.strictEqual(decoded.a, "hello");
    import_chai.assert.strictEqual(decoded.b, true);
    import_chai.assert.strictEqual(decoded.c, 42);
    import_chai.assert.strictEqual(Buffer.from(decoded.d).toString(), "ohai");
    const concat = Partial.encode({
      a: partial.a,
      c: partial.c,
      __unknownFields: [Buffer.concat(partial.__unknownFields)]
    }).finish();
    const decodedConcat = Full.decode(concat);
    import_chai.assert.strictEqual(decodedConcat.a, "hello");
    import_chai.assert.isTrue(decodedConcat.b);
    import_chai.assert.strictEqual(decodedConcat.c, 42);
    import_chai.assert.strictEqual(Buffer.from(decodedConcat.d).toString(), "ohai");
  });
  it("should decode unknown fields before reencoding them", () => {
    const full = Full.encode({
      a: "hello",
      b: true,
      c: 42,
      d: Buffer.from("ohai")
    }).finish();
    const partial = Partial.decode(full);
    import_chai.assert.isUndefined(partial.b);
    const encoded = Full.encode({
      ...partial,
      b: false
    }).finish();
    const decoded = Full.decode(encoded);
    import_chai.assert.strictEqual(decoded.a, "hello");
    import_chai.assert.isFalse(decoded.b);
    import_chai.assert.strictEqual(decoded.c, 42);
    import_chai.assert.strictEqual(Buffer.from(decoded.d).toString(), "ohai");
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUHJvdG9fdW5rbm93bl9maWVsZF90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgUm9vdCB9IGZyb20gJ3Byb3RvYnVmanMnO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuY29uc3QgeyBQYXJ0aWFsLCBGdWxsIH0gPSAoUm9vdCBhcyBhbnkpLmZyb21KU09OKHtcbiAgbmVzdGVkOiB7XG4gICAgdGVzdDoge1xuICAgICAgbmVzdGVkOiB7XG4gICAgICAgIFBhcnRpYWw6IHtcbiAgICAgICAgICBmaWVsZHM6IHtcbiAgICAgICAgICAgIGE6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGM6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ2ludDMyJyxcbiAgICAgICAgICAgICAgaWQ6IDMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIEZ1bGw6IHtcbiAgICAgICAgICBmaWVsZHM6IHtcbiAgICAgICAgICAgIGE6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGI6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ2Jvb2wnLFxuICAgICAgICAgICAgICBpZDogMixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjOiB7XG4gICAgICAgICAgICAgIHR5cGU6ICdpbnQzMicsXG4gICAgICAgICAgICAgIGlkOiAzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGQ6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ2J5dGVzJyxcbiAgICAgICAgICAgICAgaWQ6IDQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KS5uZXN0ZWQudGVzdDtcblxuZGVzY3JpYmUoJ1Byb3RvI19fdW5rbm93bkZpZWxkcycsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCBlbmNvZGUgYW5kIGRlY29kZSB3aXRoIHVua25vd24gZmllbGRzJywgKCkgPT4ge1xuICAgIGNvbnN0IGZ1bGwgPSBGdWxsLmVuY29kZSh7XG4gICAgICBhOiAnaGVsbG8nLFxuICAgICAgYjogdHJ1ZSxcbiAgICAgIGM6IDQyLFxuICAgICAgZDogQnVmZmVyLmZyb20oJ29oYWknKSxcbiAgICB9KS5maW5pc2goKTtcblxuICAgIGNvbnN0IHBhcnRpYWwgPSBQYXJ0aWFsLmRlY29kZShmdWxsKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGFydGlhbC5hLCAnaGVsbG8nKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwocGFydGlhbC5jLCA0Mik7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHBhcnRpYWwuX191bmtub3duRmllbGRzLmxlbmd0aCwgMik7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgQnVmZmVyLmZyb20ocGFydGlhbC5fX3Vua25vd25GaWVsZHNbMF0pLnRvU3RyaW5nKCdoZXgnKSxcbiAgICAgICcxMDAxJ1xuICAgICk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgQnVmZmVyLmZyb20ocGFydGlhbC5fX3Vua25vd25GaWVsZHNbMV0pLnRvU3RyaW5nKCdoZXgnKSxcbiAgICAgICcyMjA0NmY2ODYxNjknXG4gICAgKTtcblxuICAgIGNvbnN0IGVuY29kZWQgPSBQYXJ0aWFsLmVuY29kZSh7XG4gICAgICBhOiBwYXJ0aWFsLmEsXG4gICAgICBjOiBwYXJ0aWFsLmMsXG4gICAgICBfX3Vua25vd25GaWVsZHM6IHBhcnRpYWwuX191bmtub3duRmllbGRzLFxuICAgIH0pLmZpbmlzaCgpO1xuICAgIGNvbnN0IGRlY29kZWQgPSBGdWxsLmRlY29kZShlbmNvZGVkKTtcblxuICAgIGFzc2VydC5zdHJpY3RFcXVhbChkZWNvZGVkLmEsICdoZWxsbycpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChkZWNvZGVkLmIsIHRydWUpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChkZWNvZGVkLmMsIDQyKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoQnVmZmVyLmZyb20oZGVjb2RlZC5kKS50b1N0cmluZygpLCAnb2hhaScpO1xuXG4gICAgY29uc3QgY29uY2F0ID0gUGFydGlhbC5lbmNvZGUoe1xuICAgICAgYTogcGFydGlhbC5hLFxuICAgICAgYzogcGFydGlhbC5jLFxuICAgICAgX191bmtub3duRmllbGRzOiBbQnVmZmVyLmNvbmNhdChwYXJ0aWFsLl9fdW5rbm93bkZpZWxkcyldLFxuICAgIH0pLmZpbmlzaCgpO1xuICAgIGNvbnN0IGRlY29kZWRDb25jYXQgPSBGdWxsLmRlY29kZShjb25jYXQpO1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGRlY29kZWRDb25jYXQuYSwgJ2hlbGxvJyk7XG4gICAgYXNzZXJ0LmlzVHJ1ZShkZWNvZGVkQ29uY2F0LmIpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChkZWNvZGVkQ29uY2F0LmMsIDQyKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoQnVmZmVyLmZyb20oZGVjb2RlZENvbmNhdC5kKS50b1N0cmluZygpLCAnb2hhaScpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGRlY29kZSB1bmtub3duIGZpZWxkcyBiZWZvcmUgcmVlbmNvZGluZyB0aGVtJywgKCkgPT4ge1xuICAgIGNvbnN0IGZ1bGwgPSBGdWxsLmVuY29kZSh7XG4gICAgICBhOiAnaGVsbG8nLFxuICAgICAgYjogdHJ1ZSxcbiAgICAgIGM6IDQyLFxuICAgICAgZDogQnVmZmVyLmZyb20oJ29oYWknKSxcbiAgICB9KS5maW5pc2goKTtcblxuICAgIGNvbnN0IHBhcnRpYWwgPSBQYXJ0aWFsLmRlY29kZShmdWxsKTtcbiAgICBhc3NlcnQuaXNVbmRlZmluZWQocGFydGlhbC5iKTtcblxuICAgIGNvbnN0IGVuY29kZWQgPSBGdWxsLmVuY29kZSh7XG4gICAgICAuLi5wYXJ0aWFsLFxuICAgICAgYjogZmFsc2UsXG4gICAgfSkuZmluaXNoKCk7XG4gICAgY29uc3QgZGVjb2RlZCA9IEZ1bGwuZGVjb2RlKGVuY29kZWQpO1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGRlY29kZWQuYSwgJ2hlbGxvJyk7XG4gICAgYXNzZXJ0LmlzRmFsc2UoZGVjb2RlZC5iKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZGVjb2RlZC5jLCA0Mik7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKEJ1ZmZlci5mcm9tKGRlY29kZWQuZCkudG9TdHJpbmcoKSwgJ29oYWknKTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICJBQUdBLGtCQUF1QjtBQUN2Qix3QkFBcUI7QUFHckIsTUFBTSxFQUFFLFNBQVMsU0FBVSx1QkFBYSxTQUFTO0FBQUEsRUFDL0MsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLE1BQ0osUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1AsUUFBUTtBQUFBLFlBQ04sR0FBRztBQUFBLGNBQ0QsTUFBTTtBQUFBLGNBQ04sSUFBSTtBQUFBLFlBQ047QUFBQSxZQUNBLEdBQUc7QUFBQSxjQUNELE1BQU07QUFBQSxjQUNOLElBQUk7QUFBQSxZQUNOO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE1BQU07QUFBQSxVQUNKLFFBQVE7QUFBQSxZQUNOLEdBQUc7QUFBQSxjQUNELE1BQU07QUFBQSxjQUNOLElBQUk7QUFBQSxZQUNOO0FBQUEsWUFDQSxHQUFHO0FBQUEsY0FDRCxNQUFNO0FBQUEsY0FDTixJQUFJO0FB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
