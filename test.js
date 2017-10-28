const Client = require('./index');

const test = new Client('localhost:3000');

const streamOne = test.getStream(['one', 'two']);
//const streamTwo = test.getStream('two');

streamOne.attach((data) => {
  console.log('streamOne - got data ' + JSON.stringify(data));
});

// streamTwo.attach((data) => {
//   console.log('streamTwo - got data ' + JSON.stringify(data));
// });
