import express from 'express';

const router = express.Router();

const accountId = 'laphone';
const engineId = '5566';
const modelId = '55';
const configId = '484';

// Auth
router.post('/auth/login', (req, res) => {
  if (req.body.id === accountId && req.body.pass === accountId) {
    res.status(200).json({ 'accountId' : req.body.id });
  } else {
    res.status(401).json({ 'errorCode' : 1, 'errorMsg' : 'You are NOT Laphone.' });
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
    res.status(200).json([ 'cu1611', 'cu1606', 'cu1517' ]);
  } else {
    res.status(200).json([]);
  }
});

// Engines
router.get('/engines/cpuusage', (req, res) => {
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

// Accounts
router.get('/accounts/info', (req, res) => {
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

router.get('/accounts/marginusage', (req, res) => {
  res.status(200).json({ 'accountId' : accountId, 'marginUsage' : 0 });
});

router.get('/accounts/isacceptable', (req, res) => {
  if (req.query.accountId === accountId) {
    res.status(406).end();
  } else {
    res.status(200).end();
  }
});

router.get('/accounts/pnl', (req, res) => {
  const pnl = {
    'accountId' : accountId,
    'floatingPnl' : 0,
    'closePnl' : 0,
    'commission' : 0
  };
  res.status(200).json(pnl);
});

// Models
router.get('/models', (req, res) => {
  const models = {
    'trade-model-1.0.jar': [
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
  if (req.query.eid === engineId && req.query.modelId === modelId) {
    res.status(200).json([ 'cu1611', 'cu1606', 'cu1517' ]);
  } else {
    res.status(200).json([]);
  }
});

router.get('/models/pnl', (req, res) => {
  if (req.query.eid === engineId && req.query.modelId === modelId) {
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
  if (req.query.eid === engineId && req.query.modelId === modelId) {
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
        'fileName' : 'trade-model-1.0.jar',
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

router.get('/models/config', (req, res) => {
  if (req.query.id === configId) {
    const config = {
      'id' : configId,
      'strategyName' : 'RegressionTestingModel',
      'fileName' : 'trade-model-1.0.jar',
      'strategyFullPath' : 'com.nogle.models.RegressionTestingModelBuilder',
      'closingOffset' : 55.0,
      'maxPositionPerSide' : 66.0,
      'maxOrderQuantity' : 55,
      'maxOrdersPerSide' : 66,
      'minOrderQuantity' : 55,
      'maxCrossTicks' : 66.0,
      'subsequentOrderDelay' : 55.0,
      'minCancelDelay' : 66.0,
      'Schedule' : ["11:00:00-12:00:00"],
      'Contrast' : [
        {
          'name' : 'abc',
          'value' : 'cu@SHFE'
        }
      ]
    };
    res.status(200).json(config);
  } else {
    res.status(404).end();
  }
});

router.post('/models/config', (req, res) => {
  if (typeof req.body.strategyName !== 'undefined') {
    res.status(200).end();
  } else {
    res.status(400).json({ 'errorCode' : 602, 'errorMsg' : 'Insert model config failed.' });
  }
});

router.put('/models/config', (req, res) => {
  if (typeof req.body.id !== 'undefined') {
    res.status(200).end();
  } else {
    res.status(400).json({ 'errorCode' : 603, 'errorMsg' : 'Update model config failed.' });
  }
});

router.delete('/models/config', (req, res) => {
  if (typeof req.query.id !== 'undefined') {
    res.status(200).end();
  } else {
    res.status(400).json({ 'errorCode' : 604, 'errorMsg' : 'Delete model config failed.' });
  }
});

// Commands
router.get('/commands', (req, res) => {
  if (req.query.eid === engineId && req.query.modelId === modelId) {
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

router.post('/commands', (req, res) => {
  if (typeof req.body.eid === engineId && req.body.modelId === modelId) {
    res.status(200).end();
  } else {
    res.status(400).json({ 'errorCode' : 201, 'errorMsg' : 'Send command failed.' });
  }
});

router.post('/commands/models/enable', (req, res) => {
  if (typeof req.body.eid === engineId && req.body.modelId === modelId) {
    res.status(200).end();
  } else {
    res.status(400).json({ 'errorCode' : 101, 'errorMsg' : 'Enable model failed.' });
  }
});

router.post('/commands/models/disable', (req, res) => {
  if (typeof req.body.eid === engineId && req.body.modelId === modelId) {
    res.status(200).end();
  } else {
    res.status(400).json({ 'errorCode' : 102, 'errorMsg' : 'Disable model failed.' });
  }
});

// Order
router.post('/order', (req, res) => {
  if (typeof req.body.eid === engineId && req.body.modelId === modelId) {
    res.status(200).end();
  } else {
    res.status(400).json({ 'errorCode' : 800, 'errorMsg' : 'Send order failed.' });
  }
});

// Other
router.get('/brokers', (req, res) => {
  res.status(200).json([ 'HT', 'JR', 'QQ', 'TEST' ]);
});

export {router};
