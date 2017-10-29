const WebSocket = require('ws');
const Stream = require('./stream');
const request = require('graphql-request');
const query = `query getEvents($selector: EventSelector!) {
  getEvents(selector: $selector){ data version aggregateId }
}`;

const Aggregate = function(uri, aggregateId, version) {
  this.stream = new Stream(new WebSocket(`ws://${uri}/events`), aggregateId);
  const graphQLClient = new request.GraphQLClient(`http://${uri}/query`);
  graphQLClient.request(query, { selector: { aggregateId, version } }).then((events) => {
    this.events = events.getEvents;
    this.eventFactory = require('./event-factory')(aggregateId, this.events.length);
  });
};
Aggregate.prototype.getVersion = function() {
  return this.events.length();
};
Aggregate.prototype.attach = function(handler) {      // TODO pass generic handler???
  return this.stream.attach(handler);
};
Aggregate.prototype.dispatch = function(data) {
  const event = this.eventFactory(data);
  this.events.push(event);
  console.dir(this.events);
  return this.stream.dispatch(event);
};

module.exports = (url) => (aggregateId, version = 0) => new Aggregate(url, aggregateId, version);
