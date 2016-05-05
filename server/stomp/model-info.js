import {Frame} from './frame.js';

class ModelInfo {
  // Initializers
  constructor(conn, destination) {
    this.conn = conn;
    this.destination = destination;
  }

  send() {
    const object = {'eid' : 5566, 'modelId' : 52, 'modelName' : 'laphone model'};
    this.conn.send(Frame.messageFrame(this.destination, object));
  }
}

export {ModelInfo};
