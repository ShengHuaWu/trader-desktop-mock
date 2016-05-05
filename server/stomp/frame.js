const lineFeed = '\n';
const nullChar = '\0';

class Frame {
  // Initializers
  constructor(command, object) {
    this.command = command;
    this.headers = {};
    this.bodyObject = object;
  }

  // Class Methods
  static parseMessage(message) {
    let frame = new Frame();
    // Get command
    let components = message.utf8Data.slice(2, -2).split('\\n'); // Use \\n instead of \n.
    frame.command = components.shift();

    // Get headers
    components.filter((component) => {
      return component.indexOf(':') > -1
    }).map((filteredComponent) => {
      const parts = filteredComponent.split(':');
      frame.headers[parts[0]] = parts[1].replace(/\\/g, '');
    });

    return frame;
  }

  static connectedFrame() {
    let frame = new Frame('CONNECTED');
    frame.headers['heart-beat'] = '0.0';
    frame.headers['version'] = '1.1';
    return frame;
  }

  static messageFrame(destination, object) {
    let frame = new Frame('MESSAGE', object);
    frame.headers['destination'] = destination;
    frame.headers['subscription'] = 'sub-0';
    frame.headers['message-id'] = '1234';
    frame.headers['content-length'] = '0';
    return frame;
  }

  // Instance Methods
  toString() {
    let string = this.command + lineFeed;
    for (let key in this.headers) {
      string += key + ':' + this.headers[key] + lineFeed;
    }
    string += lineFeed + JSON.stringify(this.bodyObject) + lineFeed + nullChar;
    return `a${JSON.stringify([string])}`;
  }
}

export {Frame};
