const WebSocket = require('ws');
const Stream = require('./stream');

const Aggregate = function(uri, id, version) {
  this.id = id;
  this.stream = new Stream(new WebSocket(`ws://${uri}/events`), id);
  this.eventFactory = require('./event-factory')(id, version);
};
Aggregate.prototype.getVersion = function() {
  return this.eventFactory.version();
};
Aggregate.prototype.attach = function(handler) {
  return this.stream.attach(handler);
};
Aggregate.prototype.dispatch = function(data) {
  return this.stream.dispatch(this.eventFactory.get(data));
};

module.exports = (url) => (id, version = 0) => new Aggregate(url, id, version);
