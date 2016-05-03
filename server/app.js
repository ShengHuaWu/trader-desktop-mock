import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import {server as WebsocketServer} from 'websocket';
import {auth} from './routers/auth.js';
import {symbols} from './routers/symbols.js';
import {engines} from './routers/engines.js';
import {accounts} from './routers/accounts.js';
import {models} from './routers/models.js';
import {commands} from './routers/commands.js';
import {order} from './routers/order.js';
import {other} from './routers/other.js';
import {Frame} from './stomp/frame.js';

const app = express();

// Parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Insert response http header in middleware
app.use('/trader/desktop', (req, res, next) => {
  res.set('Content-Type', 'application/json');
  next();
});

// Set routers
app.use('/trader/desktop/auth', auth);
app.use('/trader/desktop/symbols', symbols);
app.use('/trader/desktop/engines', engines);
app.use('/trader/desktop/accounts', accounts);
app.use('/trader/desktop/models', models);
app.use('/trader/desktop/commands', commands);
app.use('/trader/desktop/order', order);
app.use('/trader/desktop', other);

// Error Handling
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

const server = http.createServer(app);
server.listen(3000, ()=> {
  console.log('Listening on port 3000');
});

// Websocket
const wsServer = new WebsocketServer({ httpServer: server, path: '/traderdesktop' });
wsServer.on('request', (req) => {
  var conn = req.accept(null, req.origin);
  conn.send('o');

  conn.on('message', (message) => {
    if (message.type === 'utf8') {
      const frame = Frame.parseMessage(message);
      if (frame.command === 'CONNECT') {
        conn.send(Frame.connectedFrame().toString());
      } else if (frame.command === 'SUBSCRIBE') {
        const destination = frame.headers['destination'];
        if (destination === '/account/modelinfo/laphone') {
          const object = {'eid' : 5566, 'modelId' : 52, 'modelName' : 'laphone model'};
          conn.send(Frame.messageFrame(destination, object));
        }
      }
    }
  });

  conn.on('close', (reasonCode, description) => {
    console.log('disconnected');
  });
});
