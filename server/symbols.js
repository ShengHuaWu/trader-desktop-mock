import express from 'express';

const symbols = express.Router();

symbols.get('/fuzzyquery', (req, res) => {
  if (req.query.symbol === 'cu') {
    res.status(200).json([ 'cu1611', 'cu1606', 'cu1517' ]);
  } else {
    res.status(200).json([]);
  }
});

export {symbols};
