const WebSocket = require('ws');
const Stream = require('./src/stream');

const Client = function(uri) {
  this.init(uri);
};

Client.prototype.init = function(uri) {
  const socket = new WebSocket(`ws://${uri}/events`);
  const stream = new Stream(socket);
  this.attach = handler => stream.attach(handler);
  this.getAggregate = require('./src/aggregate-factory')(uri);
};

module.exports = Client;
