// require('babel-register')
// require('babel-polyfill')
require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const private_key = '094558da201a899c606941592dae1788a76d0b73e464b39916c724bc2eb99800'

module.exports = {
  // Configure networks (Localhost, Rinkeby, etc.)
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
    },
    // sepolia:{
    //   provider: () => new HDWalletProvider(
    //     private_key, 
    //     'https://sepolia.infura.io/v3/f4ea41169aa240e9914d8d5a40945d33'
    //   ),
    //   network_id: 11155111, // Sepolia's network id
    // }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  // Configure your compilers
  compilers: {
    solc: {
      version: '0.8.11',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}
