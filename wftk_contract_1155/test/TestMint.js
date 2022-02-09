const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WafffleToken contract", function () {
  
  describe("Deploying", function() {
    
    let WaffleToken;
    let hardhatToken;
    let owner;

    beforeEach(async function () {
      // Get the ContractFactory and Signers here.
      WaffleToken = await ethers.getContractFactory("WaffleToken");
      [owner] = await ethers.getSigners();
  
      // To deploy our contract, we just have to call Token.deploy() and await
      // for it to be deployed(), which happens once its transaction has been
      // mined.
      hardhatToken = await WaffleToken.deploy("");
    });

    it("Should set the right owner", async function () {

      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Deployment should create 5 tokens", async function () {

      let taken = await hardhatToken.showTaken.call(); 
  
      let waffle_counter = 0;
  
      for(var v of taken){
        if(v)waffle_counter++;
      }

      let correct_base_number = 5;
  
      expect(waffle_counter).to.equal(correct_base_number);
    });

    it("Initial 5 token's name checking", async function() {

      let taken = await hardhatToken.showTaken.call(); 
  
      let counter = 0;
      
      let name_map = new Set();

      for(var i=0;i<5;i++){
        let cur_name = "waffle NFT #"+String(i);
        name_map.add(cur_name);
      }

      //console.log(name_map);

      for(var v of taken){
        if(v){
          //console.log(counter);
 
          let waffle_metadata = await hardhatToken.idToWaffle(counter);
          
          let waffle_token_name = waffle_metadata['name'];

          //console.log(waffle_token_name);
          
          expect(name_map.has(waffle_token_name)).to.equal(true);
          
          name_map.delete(waffle_token_name);
        }
        counter++;
      }

    });

    it("check initial token's owner", async function(){

      let taken = await hardhatToken.showTaken.call(); 
  
      let counter = 0;
      
      for(var v of taken){
        if(v){
          //console.log(counter);
          let waffle_token_owner_address = await hardhatToken.waffleToOwner(counter);
          
          expect(waffle_token_owner_address).to.equal(owner.address);
        }
        counter++;
      }
    });

  });

  describe("Minting",function() {

    let WaffleToken;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;
  
    beforeEach(async function () {
      // Get the ContractFactory and Signers here.
      WaffleToken = await ethers.getContractFactory("WaffleToken");
      [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  
      // To deploy our contract, we just have to call Token.deploy() and await
      // for it to be deployed(), which happens once its transaction has been
      // mined.
      hardhatToken = await WaffleToken.deploy("");
    });

    it("minting new token",async function() {

      const options = {value: ethers.utils.parseEther("1.0")};

      await hardhatToken.claimRandomWaffle("New Waffle",[],options);
      
      let taken = await hardhatToken.showTaken.call(); 
  
      let waffle_counter = 0;
  
      for(var v of taken){
        if(v)waffle_counter++;
      }

      let correct_base_number = 5;
      
      expect(waffle_counter).to.equal(correct_base_number+1);
    });

    it("transfer owner to other",async function() {
      
      var basic_ids = new Array();

      let taken = await hardhatToken.showTaken.call(); 
  
      let waffle_counter = 0;
  
      for(var v of taken){
        if(v){
          basic_ids.push(waffle_counter);
        }
        waffle_counter++;
      }

      //console.log(basic_ids);

      await hardhatToken.safeTransferFrom(owner.address,addr1.address,basic_ids[0],1,[]);

      for(var i=0;i<5;i++){
        let waffle_token_transferred_owner_address = await hardhatToken.waffleToOwner(basic_ids[i]);
        console.log(waffle_token_transferred_owner_address);
      }

      //expect(waffle_token_transferred_owner_address).to.equal(addr1.address);
    });

  });
  
  
});