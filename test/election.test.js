const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/VoteFactory.json');
const compiledVote = require('../ethereum/build/Vote.json');

let accounts;
let factory;
let voteAddress;
let vote;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();
	
	factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
		.deploy({ data: compiledFactory.bytecode })
		.send({ from: accounts[0], gas: '3000000' });
		
	// await factory.methods.createVote('a','b',["0x7465737400000000000000000000000000000000000000000000000000000000","x7465737400000000000000000000000000000000000000000000000000000001","x7465737400000000000000000000000000000000000000000000000000000002"]).send({
	// 	from: accounts[0],
	// 	gas: '1000000'
	// });

	
	// const addresses = await factory.methods.getDeployedVotes().call();
	// voteAddress = addresses[0].addr;
	// console
	// console.log("Create New Vote ::",addresses);
	// //the same as above.
	// //[campaignAddress] = await factory.methods.getDeployedCampaigns().call();
	// vote = await new web3.eth.Contract(
	// 	JSON.parse(compiledVote.interface),
	// 	voteAddress
	// );
	// console.log("Factory addr",factory.options.address);
	// console.log("vote addr",vote.options.address);
});

describe('Election', () => {
	it('create vote', async () => {
		await factory.methods.createVote('test','test test',["0x7465737400000000000000000000000000000000000000000000000000000000","0x7465737400000000000000000000000000000000000000000000000000000001","0x7465737400000000000000000000000000000000000000000000000000000002"]).send({
				from: accounts[0],
				gas: '3000000'
		});
		const address = await factory.methods.getDeployedVotes().call();
		voteAddress = address[0].addr
		console.log("Create New Vote :: ",address)

		vote = await new web3.eth.Contract(
			JSON.parse(compiledVote.interface),
			voteAddress
		)
		console.log("Factory addr :: ",factory.options.address);
	    console.log("vote addr :: ",vote.options.address);
	})
	it('deploys a factory and a vote', () => {
        assert.ok(factory.options.address);
        assert.ok(vote.options.address);
	});
	it('manager is voteAddress', async() => {
		const manager = await vote.methods.manager().call();
		console.log("Manager :: ",manager)
        assert.equal(accounts[0],manager);
	});
	it('Can not vote when close vote', async() => {
		let complete = true;
		
		
	});
});