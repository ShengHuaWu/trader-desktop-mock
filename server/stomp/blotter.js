import {Frame} from './frame.js';

const blotter = (conn, destination) => {
  const object = [{'sqn' : 0, 'symbol' : 'ni1609', 'qty' : 1, 'pnl' : 87.0}];
  conn.send(Frame.messageFrame(destination, object).toString());
};

export {blotter};
