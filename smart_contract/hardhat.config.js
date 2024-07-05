// require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-waffle')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks:{
    ganache:{
      url:"HTTP://127.0.0.1:7545",
      accounts:['0x27e427865ede079fb30f2b14811ec3c79ff3b88958173c19f07485aeccabd3d2'],
    }
  }
};
