var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = process.env.REACT_APP_MNEMONIC;

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*" // Match any network id
        },
        rinkeby: {
            provider: function () {
                return new HDWalletProvider(mnemonic, process.env.REACT_APP_RINKEBY_INFURA_API);
            },
            network_id: process.env.REACT_APP_TRUFFLE_NETWORK_ID,
            gas: process.env.REACT_APP_TRUFFLE_GAS,
            gasPrice: process.env.REACT_APP_TRUFFLE_GAS_PRICE,
        },
        solc: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
};