import {server as WebsocketServer} from 'websocket';
import {Frame} from './frame.js';
import {ModelInfo} from './model-info.js';
import {Blotter} from './blotter.js';
import {modelInfoDestination, blotterDestination} from '../../constants.js';

class StompServer {
  // Initializers
  constructor(server) {
    const wsServer = new WebsocketServer({ httpServer: server, path: '/traderdesktop' });
    wsServer.on('request', (req) => {
      const conn = req.accept(null, req.origin);
      let routers = {};
      routers[modelInfoDestination] = new ModelInfo(conn, modelInfoDestination);
      routers[blotterDestination] = new Blotter(conn, blotterDestination);
      conn.send('o');

      conn.on('message', (message) => {
        if (message.type !== 'utf8') {
          return;
        }

        const frame = Frame.parseMessage(message);
        if (frame.command === 'CONNECT') {
          conn.send(Frame.connectedFrame().toString());
        } else if (frame.command === 'SUBSCRIBE') {
          const destination = frame.headers['destination'];
          routers[destination].send();
        }
      });

      conn.on('close', (reasonCode, description) => {
        console.log('disconnected');
      });
    });
  }
}

export {StompServer};
