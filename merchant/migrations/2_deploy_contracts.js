var Merchant = artifacts.require("./Merchant.sol");

module.exports = function(deployer) {
  deployer.deploy(Merchant);
};
