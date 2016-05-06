import {server as WebsocketServer} from 'websocket';
import {Frame} from './frame.js';

class StompServer {
  // Initializers
  constructor(server, path) {
    this.routers = {};
    const wsServer = new WebsocketServer({ httpServer: server, path: path });
    wsServer.on('request', (req) => {
      const conn = req.accept(null, req.origin);
      conn.send('o');

      conn.on('message', (message) => {
        if (message.type !== 'utf8') {
          return;
        }

        const frame = Frame.parseMessage(message);
        if (frame.command === 'CONNECT') {
          conn.send(Frame.connectedFrame().toString());
        } else if (frame.command === 'SUBSCRIBE') {
          this.navigate(conn, frame.headers['destination']);
        }
      });

      conn.on('close', (reasonCode, description) => {
        console.log('disconnected');
      });
    });
  }

  add(destinationPrefix, handler) {
    this.routers[destinationPrefix] = handler;
  }

  navigate(conn, destination) {
    const handler = Object.keys(this.routers).filter((key) => {
      return destination.startsWith(key);
    }).map((key) => {
      return this.routers[key];
    }).shift();

    if (typeof handler == 'function') {
      handler(conn, destination);
    }
  }
}

export {StompServer};
