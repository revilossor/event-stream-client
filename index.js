// client exposes thing for listening to all messages... a stream
// client exposes thing for initialising an aggregate from a version ( default 0 ) to  a version ( default latest )
//   aggregate syncs events with stream
//   aggregate exposes listener prop for incoming messages to aggregate
//   aggregate exposes function for dispatching events to stream
const WebSocket = require('ws');
const Stream = require('./src/stream');

const Client = function(uri) {
  this.init(uri);
};

Client.prototype.init = function(uri) {
  const socket = new WebSocket(`ws://${uri}/events`);
  this.getStream = aggregates => new Stream(socket, aggregates);
  const allMessages = this.getStream([]);
  this.attach = handler => allMessages.attach(handler);
};

module.exports = Client;
