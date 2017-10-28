const Stream = function(socket, aggregateId) {
  this.handlers = [];
  this.socket = socket;
  this.aggregateId = aggregateId;
  socket.on('message', (data) => {
    data = JSON.parse(data.toString());
    if(aggregateId === data.aggregateId || !aggregateId) {
      this.handlers.forEach(handler => handler.call(null, data));
    }
  });
};
Stream.prototype.attach = function(handler) {
  this.handlers.push(handler);
};
Stream.prototype.dispatch = function(data) {
  if(this.socket.readyState !== 1) {
    throw new Error('cant dispatch if socket isnt open ( aggregateId "' + this.aggregateId + '")');
  }
  this.socket.send(new Buffer.from(JSON.stringify(data)));
};

module.exports = Stream;
