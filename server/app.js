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
      let components = message.utf8Data.slice(2, -2).split('\\n'); // Use \\n instead of \n.
      const command = components.shift();
      console.log(command);
      if (command === 'CONNECT') {
        const frame = JSON.stringify(['CONNECTED\nheart-beat:0,0\nversion:1.1\n\n\0'])
        conn.send(`a${frame}`);
      } else if (command === 'SUBSCRIBE') {
        var headers = {};
        components.filter((component) => {
          return component.indexOf(':') > -1
        }).map((filteredComponent) => {
          const parts = filteredComponent.split(':');
          headers[parts[0]] = parts[1];
        });
        const destination = headers['destination'].replace(/\\/g, '');
        if (destination === '/account/modelinfo/laphone') {
          const bodyString = JSON.stringify({'eid' : 5566, 'modelId' : 52, 'modelName' : 'laphone model'});
          const message = `MESSAGE\ndestination:/account/modelinfo/laphone\nsubscription:sub-0\nmessage-id:1234\ncontent-lebgth:0\n\n${bodyString}\n\0`;
          const frame = JSON.stringify([message]);
          conn.send(`a${frame}`);
        }
      }
    }
  });

  conn.on('close', (reasonCode, description) => {
    console.log('disconnected');
  });
});
