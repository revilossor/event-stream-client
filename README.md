## client in event sourcing

use it like this:

```
const Client = require('./index');

const client = new Client('localhost:3000');

const account = client.getAggregate('bank_account');

let accountBalance = 0;

account.init((event) => {
  console.log('got event : ' + JSON.stringify(event));
  accountBalance += event.data.deltaBalance;
  console.log('balance is now ' + accountBalance);
}).then(() => {
  console.log('account init complete');
  setInterval(() => {
    account.dispatch({ deltaBalance: -10 + Math.round(Math.random() * 20) });
  }, 1000);
});
```
