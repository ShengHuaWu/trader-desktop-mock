import {Frame} from './frame.js';
import {engineId, modelId, modelName} from '../../constants.js';

const modelInfo = (conn, frame) => {
  const object = {'eid' : engineId, 'modelId' : modelId, 'modelName' : modelName};
  conn.send(Frame.messageFrame(frame.headers['destination'], object));
};

export {modelInfo};
