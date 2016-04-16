import express from 'express';
import {accountId} from '../constants.js';

const auth = express.Router();

auth.post('/login', (req, res) => {
  if (req.body.id === accountId && req.body.pass === accountId) {
    res.status(200).json({ 'accountId' : accountId });
  } else {
    res.status(401).json({ 'errorCode' : 1, 'errorMsg' : 'You are NOT Laphone.' });
  }
});

auth.post('/logout', (req, res) => {
  res.status(200).end();
});

auth.get('/islogin', (req, res) => {
  res.status(200).end();
});

export {auth};
