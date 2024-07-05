// var SimpleStorage = artifacts.require("./SimpleStorage.sol");
// var Authentitation = artifacts.require("./Authentitation.sol")

// module.exports = function(deployer) {
//   deployer.deploy(SimpleStorage);
//   deployer.deploy(Authentitation);
// };
var Authentication = artifacts.require("./Authentication.sol");

module.exports = function(deployer) {
  deployer.deploy(Authentication);
};
