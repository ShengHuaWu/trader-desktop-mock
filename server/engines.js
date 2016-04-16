import express from 'express';

const engines = express.Router();

engines.get('/cpuusage', (req, res) => {
  const engines = [
    {
      'eid' : '5566',
      'cpuusage' : 97,
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

export {engines};
