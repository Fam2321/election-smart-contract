const Web3 = require("web3");
const fs = require('fs-extra');
const HDWalletProvider = require('truffle-hdwallet-provider');


let web3;
console.log(process.env.DEPLOY)
if(process.env.DEPLOY === "RINKEBY"){
    const provider = new HDWalletProvider('message market minimum camp rent ask wasp prosper staff breeze enroll veteran', 'https://rinkeby.infura.io/v3/5d064da2ae534d87bdfbb32caa5803eb');
    web3 = new Web3(provider)
}else{
    web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('http://localhost:7545'));
}


const vote = require("./build/Vote.json");
const VoteFactory = require("./build/VoteFactory.json");
const deploy = async () => {
    accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    let campaignFactory = await
        new web3.eth.Contract(JSON.parse(VoteFactory.interface))
            .deploy({
                data: '0x' + VoteFactory.bytecode,
                arguments: []
            }).send({
                from: accounts[0],
                gas: '3000000'
            });
    console.log('VoteFactory deployed to', campaignFactory.options.address);
};
deploy();
