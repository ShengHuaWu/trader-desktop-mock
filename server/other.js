import express from 'express';

const other = express.Router();

other.get('/brokers', (req, res) => {
  res.status(200).json([ 'HT', 'JR', 'QQ', 'TEST' ]);
});

export {other};
