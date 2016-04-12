import express from 'express';

let router = express.Router();

router.get('/symbols/fuzzyquery', (req, res) => {
  res.writeHeader(200, {'Content-Type' : 'application/json'});
  if (req.query.symbol === 'cu') {
    let json = JSON.stringify(['cu1611', 'cu1606', 'cu1517']);
    res.end(json);
  } else {
    res.end(JSON.stringify([]));
  }
});

router.get('/engines/cpuusage', (req, res) => {
  res.writeHeader(200, {'Content-Type' : 'application/json'});
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
  let json = JSON.stringify(engines);
  res.end(json);
});

export default router;
