
# Gamble - DAPP Tutorial (REVAMPED & MODERNIZED)
This project uses ReactJS, Es6, & Webpack to construct a simple Ethereum based betting/gambling setup

## Getting Started
```
$ npm install
$ npm install -g webpack webpack-cli
$ npm run start
```
Gamble is a solidity based smart contract that allows simple betting. The internals have
list of players and the dealer. The odds should be adjusted 
continuously as more people place bets but for simplicity we keep it fixed at 1.90. In the perfectly
balanced system the odds would have been 2.0. Here we set it below so the dealer will make money
assuming the players betting odd & even are about the same.

The contract allows adding players, placing bets, and running the betting. At the end of the run
the amount of money of the players and the dealer are updated.

The setup has the following main files:
- Gamble.sol under /contract is the smart contract in solidity
- App.js under /src/js is reactjs front end for interaction with the smart contract. App.js works with  
  Table.js
- gamble.js under /test is the test that is run with 'truffle test' command to check the individual
  functions of Gamble.sol
- Need to run the following : 
   a. truffle compile --all
   b. set up ganache ethereum network
   c. run metamask on the chrome browser 
   d. truffle migrate --reset
   e. npm run start ( make sure we run 'npm install' and 'npm install -g webpack webpack-cli' )