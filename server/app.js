import express from 'express';
import {router} from './routes.js';

let app = express();

app.use('/trader/desktop', router);

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
