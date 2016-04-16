import express from 'express';
import {engineId, modelId, configId} from '../constants.js';

const models = express.Router();

models.get('/', (req, res) => {
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

models.get('/symbols', (req, res) => {
  if (req.query.eid == engineId && req.query.modelId == modelId) {
    res.status(200).json([ 'cu1611', 'cu1606', 'cu1517' ]);
  } else {
    res.status(200).json([]);
  }
});

models.get('/pnl', (req, res) => {
  if (req.query.eid == engineId && req.query.modelId == modelId) {
    const pnl = {
      'modelId' : modelId,
      'floatingPnl' : 0,
      'closePnl' : 0,
      'commission' : 0
    };
    res.status(200).json(pnl);
  } else {
    res.status(400).json({ 'errorCode' : 500, 'errorMsg' : 'Query model pnl failed.' });
  }
});

models.get('/blotter', (req, res) => {
  if (req.query.eid == engineId && req.query.modelId == modelId) {
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

models.get('/configs', (req, res) => {
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

models.get('/config/isacceptable', (req, res) => {
  const name = req.query.modelName;
  if (name === 'LaphoneModel2' || name === 'LaphoneM1' || name === 'LaphoneModel') {
    res.status(406).end();
  } else {
    res.status(200).end();
  }
});

models.get('/config', (req, res) => {
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

models.post('/config', (req, res) => {
  if (typeof req.body.strategyName !== 'undefined') {
    res.status(200).end();
  } else {
    res.status(400).json({ 'errorCode' : 602, 'errorMsg' : 'Insert model config failed.' });
  }
});

models.put('/config', (req, res) => {
  if (typeof req.body.id !== 'undefined') {
    res.status(200).end();
  } else {
    res.status(400).json({ 'errorCode' : 603, 'errorMsg' : 'Update model config failed.' });
  }
});

models.delete('/config', (req, res) => {
  if (typeof req.query.id !== 'undefined') {
    res.status(200).end();
  } else {
    res.status(400).json({ 'errorCode' : 604, 'errorMsg' : 'Delete model config failed.' });
  }
});

export {models};
