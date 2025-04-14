const WebSocket = require('ws');

describe("WebSocket Server", () => {
  let ws;

  beforeAll(() => {
    ws = new WebSocket('ws://localhost:5000'); // Ensure the server is running
  });

  afterAll(() => {
    ws.close();
  });

  test("should connect to WebSocket", (done) => {
    ws.on('open', () => {
      expect(ws.readyState).toBe(WebSocket.OPEN);
      done();
    });
  });

  test("should receive message from server", (done) => {
    ws.on('message', (data) => {
      expect(data).toBe('Connected to WebSocket');
      done();
    });
  });
});
