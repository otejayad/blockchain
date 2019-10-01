var Gamble = artifacts.require("./Gamble.sol");

module.exports = function(deployer) {
  deployer.deploy(Gamble);
};
