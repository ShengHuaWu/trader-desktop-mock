import express from 'express';
import {accountId} from '../../constants.js';

const accounts = express.Router();

accounts.get('/info', (req, res) => {
  const info = {
      'traderAccount' : accountId,
      'traderPass' : accountId,
      'traderName' : accountId,
      'balance' : 150000.0,
      'pnl' : 0.0,
      'margin' : 20000.0,
      'guarantee' : 0.0,
      'accountStatus' : 0,
      'lockChain' : 0,
      'currency' : 'USD',
      'createTime' : 1426738582000,
      'lastLogin' : 1426738582000,
      'lastUpdate' : 1426738582000,
      'swap' : 0.0
  };
  res.status(200).json(info);
});

accounts.get('/marginusage', (req, res) => {
  res.status(200).json({ 'accountId' : accountId, 'marginUsage' : 0 });
});

accounts.get('/isacceptable', (req, res) => {
  if (req.query.accountId === accountId) {
    res.status(406).end();
  } else {
    res.status(200).end();
  }
});

accounts.get('/pnl', (req, res) => {
  const pnl = {
    'accountId' : accountId,
    'floatingPnl' : 0,
    'closePnl' : 0,
    'commission' : 0
  };
  res.status(200).json(pnl);
});

export {accounts};
