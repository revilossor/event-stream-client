const Stream = function(socket, aggregates) {
  this.handlers = [];
  socket.on('message', (data) => {
    data = JSON.parse(data.toString());
    if(aggregates.includes(data.aggregateId) || aggregates.length === 0) {
      this.handlers.forEach(handler => handler.call(null, data));
    }
  });
};
Stream.prototype.attach = function(handler) {
  this.handlers.push(handler);
};
Stream.prototype.dispatch = function(data) {
  console.log('[Stream::dispatch] ' + data);
};

module.exports = Stream;
