import express from 'express';
import {engineId, modelId} from '../constants.js';

const commands = express.Router();

commands.get('/', (req, res) => {
  if (req.query.eid == engineId && req.query.modelId == modelId) {
    const commands = [
      {
        'command' : 'fill',
        'usage' : 'abc',
        'desc' : 'xyz'
      }
    ];
    res.status(200).json(commands);
  } else {
    res.status(400).json({ 'errorCode' : 200, 'errorMsg' : 'Query command failed.' });
  }
});

commands.post('/', (req, res) => {
  if (req.body.eid == engineId && req.body.modelId == modelId) {
    res.status(200).end();
  } else {
    res.status(400).json({ 'errorCode' : 201, 'errorMsg' : 'Send command failed.' });
  }
});

commands.post('/models/enable', (req, res) => {
  if (req.body.eid == engineId && req.body.modelId == modelId) {
    res.status(200).end();
  } else {
    res.status(400).json({ 'errorCode' : 101, 'errorMsg' : 'Enable model failed.' });
  }
});

commands.post('/models/disable', (req, res) => {
  if (req.body.eid == engineId && req.body.modelId == modelId) {
    res.status(200).end();
  } else {
    res.status(400).json({ 'errorCode' : 102, 'errorMsg' : 'Disable model failed.' });
  }
});

export {commands};
