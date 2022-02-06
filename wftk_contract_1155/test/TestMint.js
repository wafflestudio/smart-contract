const WFTKContract = artifacts.require("WaffleToken");
const truffleAssert = require('truffle-assertions');
const { default: Web3 } = require('web3');
 
contract('WFTKContract', (accounts) => {
  
  
  it("check base token numbers", async ()=> {
    const instance = await WFTKContract.deployed();
    let takens = await instance.showTaken.call();
    
    let counter = 0;
    let expected_number = 5;

    for(var v of takens) {
        if(v) counter++;
    }
    
    //console.log(counter);
    
    assert.equal(counter,expected_number);
    
  });

  it("check mint numbers", async ()=> {
    const instance = await WFTKContract.deployed();
    
    instance.claimRandomWaffle.send("first_name",[],{from: accounts[0], value: web3.utils.fromWei(0.1,"ether")});
    
    let takens = await instance.showTaken.call();
    
    let counter = 0;
    let expected_number = 5+1;

    for(var v of takens) {
        if(v) counter++;
    }

    //console.log(counter);

    assert.equal(counter,expected_number);
  });


  it("check revert", async ()=> {
    const instance = await WFTKContract.deployed();
    
    truffleAssert.reverts(
        instance.claimRandomWaffle.send("first_name",[],{from: accounts[0], value: web3.utils.fromWei(0.0001,"ether")})
    );
    
  });

});