const Client = require('./index');

const test = new Client('localhost:3000');

test.attach((data) => {
  console.log('streamOne - got data ' + JSON.stringify(data));
});

// streamTwo.attach((data) => {
//   console.log('streamTwo - got data ' + JSON.stringify(data));
// });
