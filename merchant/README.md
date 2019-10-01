
# Merchant - DAPP Tutorial (REVAMPED & MODERNIZED)
This project uses ReactJS, Es6, & Webpack to construct a simple Ethereum based buying & selling 
transactions

## Getting Started
```
$ npm install
$ npm install -g webpack webpack-cli
$ npm run start
```
Merchant is a solidity based smart contract that allows buying and selling of items. The internals have
lists of buyers, sellers, and items. When items are added, the item list is updated. When items are 
bought, the list also is updated. At the same time the total amount of money owned by buyers and
sellers are updated when there is a transaction.

The setup has the following main files:
- Merchant.sol under /contract is the smart contract in solidity
- App.js under /src/js is reactjs front end for interaction with the smart contract. App.js works with both 
  Table.js and Table2.js
- merchant.js under /test is the test that is run with 'truffle test' command to verify the validity of
  the functions in Merchant.sol, including the failures resulting in 'revert'
- Need to run the following : 
   a. truffle compile --all
   b. set up ganache ethereum network
   c. run metamask on the chrome browser 
   d. truffle migrate --reset
   e. npm run start ( make sure we run 'npm install' and 'npm install -g webpack webpack-cli' )