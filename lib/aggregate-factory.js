const WebSocket = require('ws');
const Stream = require('./stream');
const request = require('graphql-request');
const query = `query getEvents($selector: EventSelector!) {
  getEvents(selector: $selector){ data version aggregateId }
}`;

const Aggregate = function(uri, aggregateId) {
  this.stream = new Stream(new WebSocket(`ws://${uri}/events`), aggregateId);
  this.id = aggregateId;
  this.uri = uri;
};
Aggregate.prototype.getVersion = function() {
  return this.events.length;    // TODO -1??
};
Aggregate.prototype.init = function(handler, version = 0) {
  return new Promise((resolve, reject) => {
    const graphQLClient = new request.GraphQLClient(`http://${this.uri}/query`);
    graphQLClient.request(query, { selector: {
      aggregateId: this.id,
      version
    } }).then((events) => {
      this.events = events.getEvents;
      this.events.forEach(event => handler.call(null, event));
      this.handler = handler;
      this.stream.attach(handler);
      this.eventFactory = require('./event-factory')(this.id, this.events.length);
      resolve();
    }).catch(console.dir);
  });
};
Aggregate.prototype.dispatch = function(data) {
  const event = this.eventFactory(data);
  this.events.push(event);
  this.handler.call(null, event);
  return this.stream.dispatch(event);
};

module.exports = (url) => (aggregateId) => new Aggregate(url, aggregateId);
