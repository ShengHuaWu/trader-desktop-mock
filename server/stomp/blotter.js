import {Frame} from './frame.js';

class Blotter {
  // Initializers
  constructor(conn, destination) {
    this.conn = conn;
    this.destination = destination;
  }

  send() {
    const object = [{'sqn' : 0, 'symbol' : 'ni1609', 'qty' : 1, 'pnl' : 87.0}];
    this.conn.send(Frame.messageFrame(this.destination, object).toString());
  }
}

export {Blotter};
