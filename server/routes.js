import express from 'express';

const router = express.Router();

router.post('/auth/login', (req, res) => {
  if (req.body.id === 'laphone' && req.body.pass === 'laphone') {
    res.status(200).json({'accountId' : req.body.id});
  } else {
    res.status(401).json({'errorcd' : 1, 'errormsg' : 'You are NOT Laphone.'});
  }
});

router.get('/symbols/fuzzyquery', (req, res) => {
  if (req.query.symbol === 'cu') {
    res.status(200).json(['cu1611', 'cu1606', 'cu1517']);
  } else {
    res.status(200).json([]);
  }
});

router.get('/engines/cpuusage', (req, res) => {
  let engines = [
    {
      'eid' : '5566',
      'cpuusage' : 99,
      'running' : true
    },
    {
      'eid' : '7788',
      'cpuusage' : -1,
      'msg' : 'Never run'
    }
  ];
  res.status(200).json(engines);
});

export {router};
