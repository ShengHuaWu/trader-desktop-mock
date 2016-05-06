import {Frame} from './frame.js';
import {engineId, modelId, modelName} from '../../constants.js';

const modelInfo = (conn, destination) => {
  const object = {'eid' : engineId, 'modelId' : modelId, 'modelName' : modelName};
  conn.send(Frame.messageFrame(destination, object));
};

export {modelInfo};
