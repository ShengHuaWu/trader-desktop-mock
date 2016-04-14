import express from 'express';

const router = express.Router();

// Auth
router.post('/auth/login', (req, res) => {
  if (req.body.id === 'laphone' && req.body.pass === 'laphone') {
    res.status(200).json({'accountId' : req.body.id});
  } else {
    res.status(401).json({'errorcd' : 1, 'errormsg' : 'You are NOT Laphone.'});
  }
});

router.post('/auth/logout', (req, res) => {
  res.status(200).end();
});

router.get('/auth/islogin', (req, res) => {
  res.status(200).end();
});

// Symbols
router.get('/symbols/fuzzyquery', (req, res) => {
  if (req.query.symbol === 'cu') {
    res.status(200).json(['cu1611', 'cu1606', 'cu1517']);
  } else {
    res.status(200).json([]);
  }
});

// Engines
router.get('/engines/cpuusage', (req, res) => {
  const engines = [
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

// Accounts
router.get('/accounts/info', (req, res) => {
  const info = {
      'traderAccount' : 'laphone',
      'traderPass' : 'laphone',
      'traderName' : 'laphone',
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

router.get('/accounts/marginusage', (req, res) => {
  const info = {
      'accountId' : 'laphone',
      'marginUsage' : 0
  };
  res.status(200).json(info);
});

router.get('/accounts/isacceptable', (req, res) => {
  if (req.query.accountId === 'laphone') {
    res.status(406).end();
  } else {
    res.status(200).end();
  }
});

router.get('/accounts/pnl', (req, res) => {
  const pnl = {
    'accountId' : 'laphone',
    'floatingPnl' : 0,
    'closePnl' : 0,
    'commission' : 0
  };
  res.status(200).json(pnl);
});

// Models
router.get('/models', (req, res) => {
  const models = {
    'trade-model-1.0.Laphone.jar': [
      'LaphoneModel2',
      'LaphoneM1',
    ],
    'trade-model-0.2m.Laphone.jar' : [
      'LaphoneModel'
    ]
  };
  res.status(200).json(models);
});

router.get('/models/symbols', (req, res) => {
  if (req.query.eid === '5566' && req.query.modelId === '47') {
    res.status(200).json(['cu1611', 'cu1606', 'cu1517']);
  } else {
    res.status(200).json([]);
  }
});

router.get('/models/pnl', (req, res) => {
  if (req.query.eid === '5566' && req.query.modelId === '47') {
    const pnl = {
      'modelId' : '47',
      'floatingPnl' : 0,
      'closePnl' : 0,
      'commission' : 0
    };
    res.status(200).json(pnl);
  } else {
    res.status(200).json({});
  }
});

router.get('/models/blotter', (req, res) => {
  if (req.query.eid === '5566' && req.query.modelId === '47') {
    const blotters = [
      {
        'sqn' : 'abc',
        'symbol' : 'cu1606',
        'qty' : 1,
        'pnl' : 55,
        'holdtime' : 20070,
        'entry' : {
          'side' : 0,
          'price' : 55,
          'time' : 1453169288000
        },
        'exit' : {
          'side' : 1,
          'price' : 66,
          'time' : 1453169288000
        }
      },
      {
        'sqn' : 'abc',
        'symbol' : 'cu1606',
        'qty' : 1,
        'pnl' : 55,
        'holdtime' : 20070,
        'entry' : {
          'side' : 0,
          'price' : 55,
          'time' : 1453169288000
        },
        'exit' : {
          'side' : 1,
          'price' : 66,
          'time' : 1453169288000
        }
      }
    ];
    res.status(200).json(blotters);
  } else {
    res.status(200).json([]);
  }
});

router.get('/models/configs', (req, res) => {
  const configs = {
    'models' : [
      {
        'modelName' : 'LaphoneModel2',
        'id' : '430'
      },
      {
        'modelName' : 'LaphoneM1',
        'id' : '431'
      },
      {
        'modelName' : 'LaphoneModel',
        'id' : '377'
      }
    ],
    'classes' : [
      {
        'fileName' : 'trade-model-1.0.Laphone.jar',
        'classes' : [
          'com.nogle.models.breakthrough.BreakthroughStrategyBuilder',
          'com.nogle.models.ZincModelBuilder',
          'com.nogle.models.HYNi2ModelBuilder'
        ]
      }
    ]
  };
  res.status(200).json(configs);
});

router.get('/models/config/isacceptable', (req, res) => {
  const name = req.query.modelName;
  if (name === 'LaphoneModel2' || name === 'LaphoneM1' || name === 'LaphoneModel') {
    res.status(406).end();
  } else {
    res.status(200).end();
  }
});

export {router};
