import express from 'express';
import bodyParser from 'body-parser'
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

export {app}; // The "{}" is necessary.
