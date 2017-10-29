const Client = require('./index');

const test = new Client('localhost:3000');

//test.attach(console.dir);

var ag_poop = test.getAggregate('test1');
// ag_poop.attach((data) => {
//   console.log('ag_poop - got data ' + JSON.stringify(data));
// });
setInterval(() => {
  ag_poop.dispatch({ an: 'event_ag_poop' });
}, 3000);

var ag_poop2 = test.getAggregate('test1');
ag_poop2.attach((data) => {
  console.log('another - got data ' + JSON.stringify(data));
});
// setInterval(() => {
//   ag_poop2.dispatch({ an: 'event_ag_poop2' });
// }, 3000);
