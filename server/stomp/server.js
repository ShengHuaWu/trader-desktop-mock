import {server as WebsocketServer} from 'websocket';
import {Frame} from './frame.js';
import {accountId, engineId, modelId} from '../../constants.js';

class StompServer {
  // Initializers
  constructor(server) {
    const wsServer = new WebsocketServer({ httpServer: server, path: '/traderdesktop' });
    wsServer.on('request', (req) => {
      var conn = req.accept(null, req.origin);
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
          if (destination === `/account/modelinfo/${accountId}`) {
            const object = {'eid' : 5566, 'modelId' : 52, 'modelName' : 'laphone model'};
            conn.send(Frame.messageFrame(destination, object).toString());
          } else if (destination === `/engine/blotter/${engineId}/${modelId}`) {
            const object = [{'sqn' : 0, 'symbol' : 'ni1609', 'qty' : 1, 'pnl' : 87.0}];
            conn.send(Frame.messageFrame(destination, object).toString());
          }
        }
      });

      conn.on('close', (reasonCode, description) => {
        console.log('disconnected');
      });
    });
  }  
}

export {StompServer};
