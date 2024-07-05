// var Authentication = artifacts.require("Authentication");

// module.exports = function(deployer) {
//   deployer.deploy(Authentication);
// };

var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
