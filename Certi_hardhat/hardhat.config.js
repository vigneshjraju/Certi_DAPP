require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {

  defaultNetwork:"sepolia",

  solidity: "0.8.28",

  networks:{
    localhost:{
      url:"http://127.0.0.1:8545/"
    },

    hoodi:{
      url:`https://eth-hoodi.g.alchemy.com/v2/${process.env.HOODI_KEY}`,
      accounts:[`${process.env.PRIVATE_KEY}`]
    },

    sepolia:{
      url:`https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_KEY}`,
      accounts:[`${process.env.SPRIVATE_KEY}`]
    },

  }

};
