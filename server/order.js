import express from 'express';
import {engineId, modelId} from '../constants.js';

const order = express.Router();

order.post('/', (req, res) => {
  if (req.body.eid == engineId && req.body.modelId == modelId) {
    res.status(200).end();
  } else {
    res.status(400).json({ 'errorCode' : 800, 'errorMsg' : 'Send order failed.' });
  }
});

export {order};
