import {Frame} from './frame.js';

const blotter = (conn, frame) => {
  const object = [{'sqn' : 0, 'symbol' : 'ni1609', 'qty' : 1, 'pnl' : 87.0}];
  conn.send(Frame.messageFrame(frame.headers['destination'], object).toString());
};

export {blotter};
